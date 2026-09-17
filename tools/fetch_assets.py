#!/usr/bin/env python3
"""Download CC-licensed media (animal sounds, background music, object photos) from the
Openverse API and bundle them locally with attribution. Stdlib only."""
import json, os, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = "BabyKeys-EduPlayground/1.0 (offline learning app; asset bundling)"
API = "https://api.openverse.org/v1/{kind}/"

ANIMAL_SOUNDS = {
    "concept-dog": "dog bark", "concept-cat": "cat meow", "concept-cow": "cow moo",
    "concept-horse": "horse neigh", "concept-pig": "pig oink", "concept-sheep": "sheep baa",
    "concept-duck": "duck quack", "concept-rooster": "rooster crow", "concept-frog": "frog croak",
    "concept-lion": "lion roar", "concept-tiger": "tiger growl", "concept-elephant": "elephant trumpet",
    "concept-monkey": "monkey call", "concept-owl": "owl hoot", "concept-bee": "bee buzz",
    "concept-chick": "chick peep",
}
OBJECT_PHOTOS = {
    "concept-apple": "red apple fruit", "concept-banana": "banana fruit", "concept-ball": "soccer ball",
    "concept-car": "toy car", "concept-book": "open book", "concept-cup": "cup mug",
    "concept-shoe": "shoe sneaker", "concept-cookie": "cookie", "concept-truck": "truck",
    "concept-train": "train", "concept-plane": "airplane", "concept-boat": "sailboat",
    "concept-guitar": "guitar", "concept-house": "house", "concept-tree": "green tree",
    "concept-flower": "flower", "concept-balloon": "balloon", "concept-gift": "gift box",
    "concept-teddy": "teddy bear", "concept-drum": "drum",
}

def api_get(kind, params):
    url = API.format(kind=kind) + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
        f.write(r.read())
    return os.path.getsize(dest)

def pick_audio(results):
    # prefer short, playable clips
    playable = [x for x in results if (x.get("filetype") or "").lower() in ("mp3", "wav", "ogg", "oga", "flac")]
    def score(x):
        d = x.get("duration") or 0  # ms
        return abs(d - 2500) if d else 99999
    playable.sort(key=score)
    return playable[0] if playable else (results[0] if results else None)

def fetch_set(kind, mapping, subdir, min_dur=None, max_dur=None, filt=None):
    out_dir = os.path.join(ROOT, "assets", subdir)
    os.makedirs(out_dir, exist_ok=True)
    manifest, credits = {}, []
    for cid, query in mapping.items():
        try:
            data = api_get(kind, {"q": query, "license": "cc0,pdm", "page_size": 8, "peaks": "false"})
            results = data.get("results", [])
            if filt:
                results = [r for r in results if filt(r)] or results
            item = pick_audio(results) if kind == "audio" else (results[0] if results else None)
            if not item or not item.get("url"):
                print(f"  MISS {cid} ({query})"); continue
            ext = (item.get("filetype") or ("mp3" if kind == "audio" else "jpg")).lower()
            if ext == "jpeg": ext = "jpg"
            fname = f"{cid}.{ext}"
            size = download(item["url"], os.path.join(out_dir, fname))
            manifest[cid] = fname
            credits.append({"id": cid, "file": fname, "title": item.get("title"),
                            "creator": item.get("creator"), "license": item.get("license"),
                            "license_version": item.get("license_version"),
                            "source": item.get("foreign_landing_url")})
            print(f"  OK   {cid} -> {fname} ({size} bytes, {item.get('license')})")
            time.sleep(0.4)
        except Exception as e:
            print(f"  ERR  {cid}: {e}")
    with open(os.path.join(out_dir, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    return credits

def fetch_music():
    out_dir = os.path.join(ROOT, "assets", "music")
    os.makedirs(out_dir, exist_ok=True)
    for query in ("gentle lullaby music box", "soft nursery instrumental", "calm kids music"):
        try:
            data = api_get("audio", {"q": query, "license": "cc0,pdm", "page_size": 12, "peaks": "false"})
            longs = [r for r in data.get("results", [])
                     if (r.get("filetype") or "").lower() in ("mp3", "ogg", "oga", "wav")
                     and (r.get("duration") or 0) >= 20000]
            if not longs:
                continue
            item = longs[0]
            ext = (item.get("filetype") or "mp3").lower()
            fname = f"loop.{ext}"
            size = download(item["url"], os.path.join(out_dir, fname))
            manifest = {"loop": fname, "title": item.get("title"), "creator": item.get("creator"),
                        "license": item.get("license"), "license_version": item.get("license_version"),
                        "source": item.get("foreign_landing_url"), "duration_ms": item.get("duration")}
            with open(os.path.join(out_dir, "manifest.json"), "w") as f:
                json.dump(manifest, f, indent=2)
            print(f"  OK   music -> {fname} ({size} bytes, {item.get('duration')}ms, {item.get('license')})")
            return [manifest]
        except Exception as e:
            print(f"  ERR  music ({query}): {e}")
    print("  MISS music")
    return []

if __name__ == "__main__":
    all_credits = []
    print("[1/3] Animal sounds"); all_credits += fetch_set("audio", ANIMAL_SOUNDS, "sounds")
    print("[2/3] Background music"); all_credits += fetch_music()
    print("[3/3] Object photos"); all_credits += fetch_set("images", OBJECT_PHOTOS, "photos")
    with open(os.path.join(ROOT, "assets", "CREDITS.json"), "w") as f:
        json.dump(all_credits, f, indent=2)
    print(f"DONE. {len(all_credits)} credited assets.")
