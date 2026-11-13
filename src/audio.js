const sound = {
  ctx: null,
  master: null,
  noise: null,
  muted: false,

  unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.4;
      this.master.connect(this.ctx.destination);
      this.noise = this.createNoiseBuffer();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  toggleMute() {
    this.muted = !this.muted;
    if (this.master) {
      this.master.gain.value = this.muted ? 0 : 0.4;
    }
  },

  createNoiseBuffer() {
    const length = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  },

  envelope(peak, duration, start) {
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(peak, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    gain.connect(this.master);
    return gain;
  },

  noiseBurst(duration, peak, fromHz, toHz) {
    const now = this.ctx.currentTime;
    const source = this.ctx.createBufferSource();
    source.buffer = this.noise;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(fromHz, now);
    filter.frequency.exponentialRampToValueAtTime(toHz, now + duration);
    source.connect(filter).connect(this.envelope(peak, duration, now));
    source.start(now);
    source.stop(now + duration);
  },

  tone(type, fromHz, toHz, duration, peak, delay = 0) {
    const start = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(fromHz, start);
    osc.frequency.exponentialRampToValueAtTime(toHz, start + duration);
    osc.connect(this.envelope(peak, duration, start));
    osc.start(start);
    osc.stop(start + duration);
  },

  shoot() {
    if (!this.ctx) return;
    this.noiseBurst(0.15, 0.5, 2500, 300);
    this.tone('square', 160, 50, 0.12, 0.25);
  },

  hit() {
    if (!this.ctx) return;
    this.noiseBurst(0.7, 1, 1200, 80);
    this.tone('sine', 110, 30, 0.5, 0.8);
  },

  win() {
    if (!this.ctx) return;
    [523, 659, 784, 1047].forEach((hz, i) => {
      this.tone('square', hz, hz, 0.18, 0.2, 0.35 + i * 0.13);
    });
  },
};
