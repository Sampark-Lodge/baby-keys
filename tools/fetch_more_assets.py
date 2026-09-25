#!/usr/bin/env python3
"""Fetch additional CC-licensed animal sounds + object photos from Openverse and MERGE
them into the existing manifests / CREDITS (does not overwrite existing entries)."""
import json, os, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = "BabyKeys-EduPlayground/1.0"

MORE_SOUNDS = {
    "concept-bear": "bear growl", "concept-fox": "fox scream", "concept-penguin": "penguin call",
    "concept-whale": "whale song", "concept-dolphin": "dolphin click", "concept-goat": "goat bleat",
    "concept-parrot": "parrot squawk", "concept-eagle": "eagle screech", "concept-mouse": "mouse squeak",
    "concept-hippo": "hippo grunt",
}
MORE_PHOTOS = {
    "concept-key": "brass key", "concept-clock": "alarm clock", "concept-sun": "bright sun sky",
    "concept-moon": "full moon", "concept-crown": "gold crown", "concept-umbrella": "colorful umbrella",
    "concept-hat": "hat cap", "concept-phone": "smartphone", "concept-camera": "camera",
    "concept-rocket": "rocket", "concept-robot": "toy robot", "concept-gem": "gemstone",
}

def api(kind, params):
    u = "https://api.openverse.org/v1/%s/?%s" % (kind, urllib.parse.urlencode(params))
    return json.load(urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=30))

def dl(url, dest):
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r, open(dest, "wb") as f:
        f.write(r.read())
    return os.path.getsize(dest)

def pick_audio(results):
    playable = [x for x in results if (x.get("filetype") or "").lower() in ("mp3", "wav", "ogg", "oga", "flac")]
    playable.sort(key=lambda x: abs((x.get("duration") or 0) - 2500) if x.get("duration") else 99999)
    return playable[0] if playable else (results[0] if results else None)

def merge(kind, mapping, subdir, lic):
    out_dir = os.path.join(ROOT, "assets", subdir)
    man_path = os.path.join(out_dir, "manifest.json")
    manifest = json.load(open(man_path)) if os.path.exists(man_path) else {}
    credits = json.load(open(os.path.join(ROOT, "assets", "CREDITS.json")))
    for cid, query in mapping.items():
        if cid in manifest:
            print(f"  SKIP {cid} (already present)"); continue
        try:
            data = api(kind, {"q": query, "license": lic, "page_size": 8, "peaks": "false"})
            results = data.get("results", [])
            item = pick_audio(results) if kind == "audio" else (results[0] if results else None)
            if not item or not item.get("url"):
                print(f"  MISS {cid} ({query})"); continue
            ext = (item.get("filetype") or ("mp3" if kind == "audio" else "jpg")).lower()
            if ext == "jpeg": ext = "jpg"
            fname = f"{cid}.{ext}"
            size = dl(item["url"], os.path.join(out_dir, fname))
            manifest[cid] = fname
            credits.append({"id": cid, "file": fname if subdir != "sounds" else fname, "title": item.get("title"),
                            "creator": item.get("creator"), "license": item.get("license"),
                            "license_version": item.get("license_version"), "source": item.get("foreign_landing_url")})
            print(f"  OK   {cid} -> {fname} ({size} bytes, {item.get('license')})")
            time.sleep(0.4)
        except Exception as e:
            print(f"  ERR  {cid}: {e}")
    json.dump(manifest, open(man_path, "w"), indent=2)
    json.dump(credits, open(os.path.join(ROOT, "assets", "CREDITS.json"), "w"), indent=2)

if __name__ == "__main__":
    print("[1/2] More animal sounds"); merge("audio", MORE_SOUNDS, "sounds", "cc0,pdm")
    print("[2/2] More object photos"); merge("images", MORE_PHOTOS, "photos", "cc0,pdm,by")
    s = json.load(open(os.path.join(ROOT, "assets", "sounds", "manifest.json")))
    p = json.load(open(os.path.join(ROOT, "assets", "photos", "manifest.json")))
    print(f"DONE. sounds={len(s)} photos={len(p)}")
