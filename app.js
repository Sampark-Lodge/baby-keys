// ===== ANIMAL MAP (A-Z) =====
const ANIMALS = {
    a:'🐊',b:'🐻',c:'🐱',d:'🐶',e:'🐘',f:'🐸',g:'🦒',h:'🦔',i:'🦎',j:'🐙',
    k:'🐨',l:'🦁',m:'🐵',n:'🦑',o:'🦉',p:'🐧',q:'🦆',r:'🐰',s:'🐍',t:'🐯',
    u:'🦄',v:'🦅',w:'🐋',x:'🦊',y:'🐃',z:'🦓'
};

// ===== COLOR THEMES =====
const THEMES = {
    rainbow: {
        bg: 'radial-gradient(ellipse at 50% 80%, #0a0a2e 0%, #000 70%)',
        star: 'rgba(255,255,255,', bubbles: [
            {bg:'radial-gradient(circle at 30% 30%,#ff6666,#cc0000)',glow:'rgba(255,50,50,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ffaa44,#ee7700)',glow:'rgba(255,160,40,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ffff55,#cccc00)',glow:'rgba(255,255,50,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#55ff55,#00bb00)',glow:'rgba(50,220,50,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#55ddff,#0099dd)',glow:'rgba(50,200,255,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#aa66ff,#7722cc)',glow:'rgba(150,80,255,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ff66bb,#dd2288)',glow:'rgba(255,80,170,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ff8855,#dd5500)',glow:'rgba(255,120,60,0.6)'},
    ]},
    ocean: {
        bg: 'radial-gradient(ellipse at 50% 90%, #001a33 0%, #000 70%)',
        star: 'rgba(150,220,255,', bubbles: [
            {bg:'radial-gradient(circle at 30% 30%,#00e5ff,#0088aa)',glow:'rgba(0,229,255,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#00bfff,#0066aa)',glow:'rgba(0,191,255,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#66ffee,#00bbaa)',glow:'rgba(100,255,230,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#4488ff,#0044cc)',glow:'rgba(68,136,255,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#88ffff,#00cccc)',glow:'rgba(130,255,255,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#aaddff,#4499dd)',glow:'rgba(170,220,255,0.6)'},
    ]},
    candy: {
        bg: 'radial-gradient(ellipse at 50% 80%, #1a0022 0%, #000 70%)',
        star: 'rgba(255,180,255,', bubbles: [
            {bg:'radial-gradient(circle at 30% 30%,#ff77bb,#dd1177)',glow:'rgba(255,100,170,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#dd88ff,#9933dd)',glow:'rgba(200,120,255,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ff55aa,#cc0066)',glow:'rgba(255,70,160,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ff99dd,#ee55aa)',glow:'rgba(255,150,220,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#cc77ff,#8822cc)',glow:'rgba(190,110,255,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ffaaee,#ee66cc)',glow:'rgba(255,170,235,0.6)'},
    ]},
    forest: {
        bg: 'radial-gradient(ellipse at 50% 90%, #0a1a00 0%, #000 70%)',
        star: 'rgba(180,255,180,', bubbles: [
            {bg:'radial-gradient(circle at 30% 30%,#55ee55,#11aa11)',glow:'rgba(60,230,60,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ffdd44,#ccaa00)',glow:'rgba(255,220,50,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#44dd88,#11aa55)',glow:'rgba(60,220,130,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ff9933,#cc6600)',glow:'rgba(255,150,40,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#88ff44,#55cc00)',glow:'rgba(130,255,50,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#aaee33,#77bb00)',glow:'rgba(170,230,40,0.6)'},
    ]},
    sunshine: {
        bg: 'radial-gradient(ellipse at 50% 80%, #1a1100 0%, #000 70%)',
        star: 'rgba(255,240,180,', bubbles: [
            {bg:'radial-gradient(circle at 30% 30%,#ffdd00,#ccaa00)',glow:'rgba(255,220,0,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ff8833,#dd5500)',glow:'rgba(255,130,40,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ffee55,#ddcc00)',glow:'rgba(255,235,60,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ff6644,#cc3311)',glow:'rgba(255,90,50,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ffcc33,#dd9900)',glow:'rgba(255,200,40,0.6)'},
            {bg:'radial-gradient(circle at 30% 30%,#ffaa00,#cc7700)',glow:'rgba(255,170,0,0.6)'},
    ]}
};

// ===== AUDIO ENGINE (Pentatonic — always sounds sweet) =====
class SweetAudio {
    constructor() { this.ctx = null; this.ready = false;
        this.notes = [261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.51];
    }
    init() { if(this.ready)return; this.ctx = new(window.AudioContext||window.webkitAudioContext)(); this.ready=true; }
    play(freq) {
        if(!this.ready) return;
        const f = freq || this.notes[Math.floor(Math.random()*this.notes.length)];
        const now = this.ctx.currentTime;
        const o1 = this.ctx.createOscillator(); o1.type='sine'; o1.frequency.setValueAtTime(f,now);
        const o2 = this.ctx.createOscillator(); o2.type='triangle'; o2.frequency.setValueAtTime(f*2,now);
        const g1 = this.ctx.createGain(); g1.gain.setValueAtTime(0,now);
        g1.gain.linearRampToValueAtTime(0.22,now+0.02); g1.gain.exponentialRampToValueAtTime(0.001,now+1.2);
        const g2 = this.ctx.createGain(); g2.gain.setValueAtTime(0,now);
        g2.gain.linearRampToValueAtTime(0.07,now+0.02); g2.gain.exponentialRampToValueAtTime(0.001,now+0.8);
        o1.connect(g1); o2.connect(g2); g1.connect(this.ctx.destination); g2.connect(this.ctx.destination);
        o1.start(now); o1.stop(now+1.5); o2.start(now); o2.stop(now+1);
    }
    playPop() {
        if(!this.ready) return; const now=this.ctx.currentTime;
        const o=this.ctx.createOscillator(); o.type='sine';
        o.frequency.setValueAtTime(600,now); o.frequency.exponentialRampToValueAtTime(100,now+0.15);
        const g=this.ctx.createGain(); g.gain.setValueAtTime(0.3,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.15);
        o.connect(g); g.connect(this.ctx.destination); o.start(now); o.stop(now+0.2);
    }
    playCelebrate() {
        if(!this.ready) return;
        [0,150,300].forEach(d => setTimeout(()=>this.play(this.notes[9+Math.floor(Math.random()*4)]),d));
    }
}

// ===== TWINKLING STARS =====
class StarField {
    constructor(canvas) {
        this.canvas=canvas; this.c=canvas.getContext('2d'); this.stars=[]; this.colorBase='rgba(255,255,255,';
        this.resize(); for(let i=0;i<80;i++) this.stars.push({
            x:Math.random()*innerWidth, y:Math.random()*innerHeight,
            r:Math.random()*2.2+0.5, speed:Math.random()*0.012+0.004, phase:Math.random()*Math.PI*2
        });
        addEventListener('resize',()=>this.resize());
    }
    resize(){ this.canvas.width=innerWidth; this.canvas.height=innerHeight; }
    draw(t){
        this.c.clearRect(0,0,this.canvas.width,this.canvas.height);
        for(const s of this.stars){
            const tw=0.35+0.65*Math.sin(t*s.speed+s.phase);
            this.c.beginPath(); this.c.arc(s.x,s.y,s.r,0,Math.PI*2);
            this.c.fillStyle=this.colorBase+(tw*0.8).toFixed(2)+')'; this.c.fill();
        }
    }
}

// ===== STATS (localStorage) =====
class Stats {
    constructor() { this.data = JSON.parse(localStorage.getItem('babykeys_stats')||'null') || {
        totalBubbles:0, poppedBubbles:0, sessions:0, playTimeMs:0, keys:{}
    }; this.sessionStart=null; }
    save(){ localStorage.setItem('babykeys_stats',JSON.stringify(this.data)); }
    startSession(){ this.data.sessions++; this.sessionStart=Date.now(); this.save(); }
    recordKey(k){ const u=k.toUpperCase(); this.data.keys[u]=(this.data.keys[u]||0)+1; this.data.totalBubbles++; this.save(); }
    recordPop(){ this.data.poppedBubbles++; this.save(); }
    getPlayTime(){ return this.data.playTimeMs + (this.sessionStart ? Date.now()-this.sessionStart : 0); }
    updateTime(){ if(this.sessionStart){ this.data.playTimeMs += Date.now()-this.sessionStart; this.sessionStart=Date.now(); } this.save(); }
    reset(){ this.data={totalBubbles:0,poppedBubbles:0,sessions:0,playTimeMs:0,keys:{}}; this.save(); }
    topKeys(n=10){ return Object.entries(this.data.keys).sort((a,b)=>b[1]-a[1]).slice(0,n); }
}

// ===== SPEECH =====
function speakLetter(key) {
    if(!('speechSynthesis' in window)) return;
    const text = key.length===1 ? key.toUpperCase() : key;
    const u = new SpeechSynthesisUtterance(text);
    u.rate=0.8; u.pitch=1.3; u.volume=0.7;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
}

// ===== DOM =====
const audio = new SweetAudio();
const stats = new Stats();
const container = document.getElementById('bubble-container');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const unlockHint = document.getElementById('unlock-hint');
const bgCanvas = document.getElementById('bg-canvas');
const appEl = document.getElementById('app');
const counterEl = document.getElementById('bubble-counter');
const counterNum = document.getElementById('counter-num');
const modeBadge = document.getElementById('mode-badge');
const promptDisplay = document.getElementById('prompt-display');
const dashboard = document.getElementById('parent-dashboard');
const celebration = document.getElementById('celebration');
const starField = new StarField(bgCanvas);

let started=false, escPresses=[], currentTheme='rainbow', currentMode='free';
let bubbleCount=0, alphabetIndex=0, numberIndex=0;
const MAX_BUBBLES=35;
const ALPHABET='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// ===== ANIMATION LOOP =====
(function loop(t){ starField.draw(t); requestAnimationFrame(loop); })(0);

// ===== THEME BUTTONS =====
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.theme-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentTheme = btn.dataset.theme;
    });
});

// ===== MODE BUTTONS =====
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
    });
});

// ===== FULLSCREEN =====
function goFS() {
    const el=document.documentElement;
    (el.requestFullscreen||el.webkitRequestFullscreen||el.msRequestFullscreen).call(el).catch(()=>{});
}

// ===== START =====
startBtn.addEventListener('click', e => {
    e.stopPropagation();
    if(started) return;
    started=true;
    audio.init();
    stats.startSession();
    const theme=THEMES[currentTheme];
    appEl.style.background=theme.bg;
    starField.colorBase=theme.star;
    startScreen.classList.add('hidden');
    counterEl.classList.add('visible');
    // Mode badge
    const modeNames={free:'🎉 Free Play',alphabet:'🔤 ABC Mode',numbers:'🔢 123 Mode'};
    modeBadge.textContent=modeNames[currentMode];
    modeBadge.classList.add('visible');
    // Init prompt
    if(currentMode==='alphabet'){ alphabetIndex=0; promptDisplay.textContent=ALPHABET[0]; }
    else if(currentMode==='numbers'){ numberIndex=0; promptDisplay.textContent='0'; }
    goFS();
});

// ===== KEY SYMBOLS =====
function keySymbol(k) {
    const m={' ':'␣',Enter:'↵',Backspace:'⌫',Tab:'⇥',Shift:'⇧',Control:'⌃',Alt:'⌥',
        Meta:'⌘',CapsLock:'⇪',Escape:'⎋',ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→'};
    return m[k]||k.substring(0,3);
}

// ===== SPARKLES =====
function sparkles(cx,cy,color) {
    for(let i=0;i<8;i++){
        const s=document.createElement('div'); s.className='sparkle';
        const a=Math.random()*Math.PI*2, d=35+Math.random()*55;
        s.style.cssText=`left:${cx}px;top:${cy}px;background:${color};--sx:${Math.cos(a)*d}px;--sy:${Math.sin(a)*d}px`;
        container.appendChild(s); setTimeout(()=>s.remove(),800);
    }
}

// ===== CONFETTI =====
function confetti() {
    const colors=['#ff4444','#ffaa00','#00e676','#00bfff','#ff66bb','#aa66ff','#ffff55'];
    for(let i=0;i<30;i++){
        const c=document.createElement('div'); c.className='confetti';
        c.style.cssText=`left:${Math.random()*100}%;top:-10px;background:${colors[i%colors.length]};
            width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;
            --fall-y:${300+Math.random()*400}px;--fall-x:${(Math.random()-0.5)*200}px;
            --fall-rot:${Math.random()*1080}deg;animation-delay:${Math.random()*0.3}s`;
        celebration.appendChild(c); setTimeout(()=>c.remove(),2000);
    }
}

// ===== SPAWN BUBBLE =====
function spawnBubble(key) {
    const bubbles=container.querySelectorAll('.bubble');
    if(bubbles.length>MAX_BUBBLES) bubbles[0].remove();
    const theme=THEMES[currentTheme];
    const color=theme.bubbles[Math.floor(Math.random()*theme.bubbles.length)];
    const size=90+Math.random()*60;
    const x=Math.random()*(innerWidth-size), y=innerHeight-size-Math.random()*180;
    const dur=3.5+Math.random()*2, rot=(Math.random()-0.5)*40;
    const display=key.length===1?key.toUpperCase():keySymbol(key);
    const animal=key.length===1?ANIMALS[key.toLowerCase()]||'':'';
    const animalSize=size*0.22;

    const bubble=document.createElement('div');
    bubble.className='bubble';
    bubble.style.cssText=`left:${x}px;top:${y}px;width:${size}px;height:${size}px;
        --bubble-bg:${color.bg};--bubble-glow:${color.glow};--rise-duration:${dur}s;
        --rotate-end:${rot}deg;--letter-size:${size*0.35}px;--animal-size:${animalSize}px`;
    bubble.innerHTML=`<div class="bubble-inner">
        <span class="bubble-letter">${display}</span>
        ${animal?`<span class="bubble-animal">${animal}</span>`:''}
    </div>`;

    // Pop on click
    bubble.addEventListener('click', e => {
        e.stopPropagation();
        bubble.classList.add('popping');
        audio.playPop();
        stats.recordPop();
        const r=bubble.getBoundingClientRect();
        sparkles(r.left+r.width/2, r.top+r.height/2, color.glow);
        setTimeout(()=>bubble.remove(),350);
    });

    container.appendChild(bubble);
    sparkles(x+size/2, y+size/2, color.glow);
    setTimeout(()=>{ if(bubble.parentNode) bubble.remove(); }, dur*1000+100);

    // Update counter & stats
    bubbleCount++;
    counterNum.textContent=bubbleCount;
    stats.recordKey(key);
}

// ===== MODE LOGIC =====
function handleMode(key) {
    if(currentMode==='alphabet') {
        const expected=ALPHABET[alphabetIndex];
        if(key.toUpperCase()===expected) {
            alphabetIndex++;
            promptDisplay.classList.add('correct');
            setTimeout(()=>promptDisplay.classList.remove('correct'),500);
            if(alphabetIndex>=ALPHABET.length) {
                alphabetIndex=0; confetti(); audio.playCelebrate();
            }
            promptDisplay.textContent=ALPHABET[alphabetIndex];
        }
    } else if(currentMode==='numbers') {
        const expected=String(numberIndex);
        if(key===expected) {
            numberIndex++;
            promptDisplay.classList.add('correct');
            setTimeout(()=>promptDisplay.classList.remove('correct'),500);
            if(numberIndex>9) {
                numberIndex=0; confetti(); audio.playCelebrate();
            }
            promptDisplay.textContent=String(numberIndex);
        }
    }
}

// ===== KEYBOARD =====
document.addEventListener('keydown', e => {
    if(!started) return;
    if(e.key==='Escape') {
        const now=Date.now();
        escPresses.push(now);
        escPresses=escPresses.filter(t=>now-t<1500);
        if(escPresses.length>=3) {
            if(document.exitFullscreen) document.exitFullscreen();
            escPresses=[]; return;
        }
        unlockHint.classList.add('show');
        setTimeout(()=>unlockHint.classList.remove('show'),2000);
    }
    e.preventDefault(); e.stopPropagation();
    spawnBubble(e.key);
    audio.play();
    speakLetter(e.key);
    handleMode(e.key);
});
document.addEventListener('keyup', e=>{ if(started) e.preventDefault(); });
document.addEventListener('keypress', e=>{ if(started) e.preventDefault(); });
document.addEventListener('contextmenu', e=>e.preventDefault());

// Re-enter fullscreen
document.addEventListener('fullscreenchange', ()=>{
    if(!document.fullscreenElement && started) setTimeout(goFS,500);
});

// Click/touch = bubbles
document.addEventListener('click', e=>{ if(!started)return; spawnBubble('🖱'); audio.play(); });
document.addEventListener('touchstart', e=>{
    if(!started)return; e.preventDefault(); spawnBubble('👆'); audio.play();
},{passive:false});

// ===== PARENT DASHBOARD — long-press lock icon 3s =====
let lockTimer=null;
const lockEl=document.getElementById('lock-indicator');
lockEl.addEventListener('mousedown', ()=>{
    lockTimer=setTimeout(openDashboard,3000);
});
lockEl.addEventListener('mouseup', ()=>clearTimeout(lockTimer));
lockEl.addEventListener('mouseleave', ()=>clearTimeout(lockTimer));
lockEl.addEventListener('touchstart', e=>{
    e.preventDefault(); e.stopPropagation();
    lockTimer=setTimeout(openDashboard,3000);
},{passive:false});
lockEl.addEventListener('touchend', e=>{ e.stopPropagation(); clearTimeout(lockTimer); });

function openDashboard() {
    stats.updateTime();
    const ms=stats.getPlayTime();
    const min=Math.floor(ms/60000), sec=Math.floor((ms%60000)/1000);
    document.getElementById('stat-playtime').textContent=`${min}:${String(sec).padStart(2,'0')}`;
    document.getElementById('stat-bubbles').textContent=stats.data.totalBubbles;
    document.getElementById('stat-popped').textContent=stats.data.poppedBubbles;
    document.getElementById('stat-sessions').textContent=stats.data.sessions;
    // Key chart
    const chart=document.getElementById('key-chart');
    chart.innerHTML='';
    const top=stats.topKeys(12);
    const maxVal=top.length?top[0][1]:1;
    top.forEach(([k,v])=>{
        const bar=document.createElement('div'); bar.className='key-bar';
        bar.innerHTML=`<span class="key-bar-label">${k}</span>
            <div class="key-bar-fill" style="width:${Math.max(4,v/maxVal*80)}px"></div>
            <span class="key-bar-count">${v}</span>`;
        chart.appendChild(bar);
    });
    dashboard.classList.remove('hidden');
}

document.getElementById('dash-close').addEventListener('click', e=>{
    e.stopPropagation(); dashboard.classList.add('hidden');
});
document.getElementById('dash-exit-fs').addEventListener('click', e=>{
    e.stopPropagation(); dashboard.classList.add('hidden');
    if(document.exitFullscreen) document.exitFullscreen();
    started=false; startScreen.classList.remove('hidden');
    counterEl.classList.remove('visible'); modeBadge.classList.remove('visible');
    promptDisplay.textContent='';
});
document.getElementById('dash-reset').addEventListener('click', e=>{
    e.stopPropagation(); stats.reset(); openDashboard();
});
