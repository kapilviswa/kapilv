! function (n) {
    var i = {};

    function o(e) {
        if (i[e]) return i[e].exports;
        var t = i[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, o), t.l = !0, t.exports
    }
    o.m = n, o.c = i, o.d = function (e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, o.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function (t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) o.d(n, i, function (e) {
                return t[e]
            }.bind(null, i));
        return n
    }, o.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "/", o(o.s = 16)
}([function (o, h, e) {
    (function (n) {
        var i;
        ! function () {
            "use strict";
            var e = function () {
                this.init()
            };
            e.prototype = {
                init: function () {
                    var e = this || g;
                    return e._counter = 1e3, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = "canplaythrough", e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.mobileAutoEnable = !0, e._setup(), e
                },
                volume: function (e) {
                    var t = this || g;
                    if (e = parseFloat(e), t.ctx || d(), void 0 !== e && 0 <= e && e <= 1) {
                        if (t._volume = e, t._muted) return t;
                        t.usingWebAudio && t.masterGain.gain.setValueAtTime(e, g.ctx.currentTime);
                        for (var n = 0; n < t._howls.length; n++)
                            if (!t._howls[n]._webAudio)
                                for (var i = t._howls[n]._getSoundIds(), o = 0; o < i.length; o++) {
                                    var r = t._howls[n]._soundById(i[o]);
                                    r && r._node && (r._node.volume = r._volume * e)
                                }
                        return t
                    }
                    return t._volume
                },
                mute: function (e) {
                    var t = this || g;
                    t.ctx || d(), t._muted = e, t.usingWebAudio && t.masterGain.gain.setValueAtTime(e ? 0 : t._volume, g.ctx.currentTime);
                    for (var n = 0; n < t._howls.length; n++)
                        if (!t._howls[n]._webAudio)
                            for (var i = t._howls[n]._getSoundIds(), o = 0; o < i.length; o++) {
                                var r = t._howls[n]._soundById(i[o]);
                                r && r._node && (r._node.muted = !!e || r._muted)
                            }
                    return t
                },
                unload: function () {
                    for (var e = this || g, t = e._howls.length - 1; 0 <= t; t--) e._howls[t].unload();
                    return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(), e.ctx = null, d()), e
                },
                codecs: function (e) {
                    return (this || g)._codecs[e.replace(/^x-/, "")]
                },
                _setup: function () {
                    var t = this || g;
                    if (t.state = t.ctx && t.ctx.state || "running", t._autoSuspend(), !t.usingWebAudio)
                        if ("undefined" != typeof Audio) try {
                            void 0 === (new Audio).oncanplaythrough && (t._canPlayEvent = "canplay")
                        } catch (e) {
                            t.noAudio = !0
                        } else t.noAudio = !0;
                    try {
                        (new Audio).muted && (t.noAudio = !0)
                    } catch (e) {}
                    return t.noAudio || t._setupCodecs(), t
                },
                _setupCodecs: function () {
                    var t = this || g,
                        e = null;
                    try {
                        e = "undefined" != typeof Audio ? new Audio : null
                    } catch (e) {
                        return t
                    }
                    if (!e || "function" != typeof e.canPlayType) return t;
                    var n = e.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                        i = t._navigator && t._navigator.userAgent.match(/OPR\/([0-6].)/g),
                        o = i && parseInt(i[0].split("/")[1], 10) < 33;
                    return t._codecs = {
                        mp3: !(o || !n && !e.canPlayType("audio/mp3;").replace(/^no$/, "")),
                        mpeg: !!n,
                        opus: !!e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                        ogg: !!e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        oga: !!e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        wav: !!e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                        aac: !!e.canPlayType("audio/aac;").replace(/^no$/, ""),
                        caf: !!e.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                        m4a: !!(e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        mp4: !!(e.canPlayType("audio/x-mp4;") || e.canPlayType("audio/mp4;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        weba: !!e.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                        webm: !!e.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                        dolby: !!e.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                        flac: !!(e.canPlayType("audio/x-flac;") || e.canPlayType("audio/flac;")).replace(/^no$/, "")
                    }, t
                },
                _enableMobileAudio: function () {
                    var n = this || g,
                        e = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi|Chrome/i.test(n._navigator && n._navigator.userAgent);
                    if (!n._mobileEnabled && n.ctx && e) {
                        n._mobileEnabled = !1, n.mobileAutoEnable = !1, n._mobileUnloaded || 44100 === n.ctx.sampleRate || (n._mobileUnloaded = !0, n.unload()), n._scratchBuffer = n.ctx.createBuffer(1, 1, 22050);
                        var i = function (e) {
                            g._autoResume();
                            var t = n.ctx.createBufferSource();
                            t.buffer = n._scratchBuffer, t.connect(n.ctx.destination), void 0 === t.start ? t.noteOn(0) : t.start(0), "function" == typeof n.ctx.resume && n.ctx.resume(), t.onended = function () {
                                t.disconnect(0), n._mobileEnabled = !0, document.removeEventListener("touchstart", i, !0), document.removeEventListener("touchend", i, !0), document.removeEventListener("click", i, !0);
                                for (var e = 0; e < n._howls.length; e++) n._howls[e]._emit("unlock")
                            }
                        };
                        return document.addEventListener("touchstart", i, !0), document.addEventListener("touchend", i, !0), document.addEventListener("click", i, !0), n
                    }
                },
                _autoSuspend: function () {
                    var e = this;
                    if (e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && g.usingWebAudio) {
                        for (var t = 0; t < e._howls.length; t++)
                            if (e._howls[t]._webAudio)
                                for (var n = 0; n < e._howls[t]._sounds.length; n++)
                                    if (!e._howls[t]._sounds[n]._paused) return e;
                        return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(function () {
                            e.autoSuspend && (e._suspendTimer = null, e.state = "suspending", e.ctx.suspend().then(function () {
                                e.state = "suspended", e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume())
                            }))
                        }, 3e4), e
                    }
                },
                _autoResume: function () {
                    var t = this;
                    if (t.ctx && void 0 !== t.ctx.resume && g.usingWebAudio) return "running" === t.state && t._suspendTimer ? (clearTimeout(t._suspendTimer), t._suspendTimer = null) : "suspended" === t.state ? (t.ctx.resume().then(function () {
                        t.state = "running";
                        for (var e = 0; e < t._howls.length; e++) t._howls[e]._emit("resume")
                    }), t._suspendTimer && (clearTimeout(t._suspendTimer), t._suspendTimer = null)) : "suspending" === t.state && (t._resumeAfterSuspend = !0), t
                }
            };
            var g = new e,
                t = function (e) {
                    e.src && 0 !== e.src.length && this.init(e)
                };
            t.prototype = {
                init: function (e) {
                    var t = this;
                    return g.ctx || d(), t._autoplay = e.autoplay || !1, t._format = "string" != typeof e.format ? e.format : [e.format], t._html5 = e.html5 || !1, t._muted = e.mute || !1, t._loop = e.loop || !1, t._pool = e.pool || 5, t._preload = "boolean" != typeof e.preload || e.preload, t._rate = e.rate || 1, t._sprite = e.sprite || {}, t._src = "string" != typeof e.src ? e.src : [e.src], t._volume = void 0 !== e.volume ? e.volume : 1, t._xhrWithCredentials = e.xhrWithCredentials || !1, t._duration = 0, t._state = "unloaded", t._sounds = [], t._endTimers = {}, t._queue = [], t._playLock = !1, t._onend = e.onend ? [{
                        fn: e.onend
                    }] : [], t._onfade = e.onfade ? [{
                        fn: e.onfade
                    }] : [], t._onload = e.onload ? [{
                        fn: e.onload
                    }] : [], t._onloaderror = e.onloaderror ? [{
                        fn: e.onloaderror
                    }] : [], t._onplayerror = e.onplayerror ? [{
                        fn: e.onplayerror
                    }] : [], t._onpause = e.onpause ? [{
                        fn: e.onpause
                    }] : [], t._onplay = e.onplay ? [{
                        fn: e.onplay
                    }] : [], t._onstop = e.onstop ? [{
                        fn: e.onstop
                    }] : [], t._onmute = e.onmute ? [{
                        fn: e.onmute
                    }] : [], t._onvolume = e.onvolume ? [{
                        fn: e.onvolume
                    }] : [], t._onrate = e.onrate ? [{
                        fn: e.onrate
                    }] : [], t._onseek = e.onseek ? [{
                        fn: e.onseek
                    }] : [], t._onunlock = e.onunlock ? [{
                        fn: e.onunlock
                    }] : [], t._onresume = [], t._webAudio = g.usingWebAudio && !t._html5, void 0 !== g.ctx && g.ctx && g.mobileAutoEnable && g._enableMobileAudio(), g._howls.push(t), t._autoplay && t._queue.push({
                        event: "play",
                        action: function () {
                            t.play()
                        }
                    }), t._preload && t.load(), t
                },
                load: function () {
                    var e = this,
                        t = null;
                    if (g.noAudio) e._emit("loaderror", null, "No audio support.");
                    else {
                        "string" == typeof e._src && (e._src = [e._src]);
                        for (var n = 0; n < e._src.length; n++) {
                            var i, o;
                            if (e._format && e._format[n]) i = e._format[n];
                            else {
                                if ("string" != typeof (o = e._src[n])) {
                                    e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                                    continue
                                }(i = /^data:audio\/([^;,]+);/i.exec(o)) || (i = /\.([^.]+)$/.exec(o.split("?", 1)[0])), i && (i = i[1].toLowerCase())
                            }
                            if (i && g.codecs(i)) {
                                t = e._src[n];
                                break
                            }
                        }
                        if (t) return e._src = t, e._state = "loading", "https:" === window.location.protocol && "http:" === t.slice(0, 5) && (e._html5 = !0, e._webAudio = !1), new r(e), e._webAudio && a(e), e;
                        e._emit("loaderror", null, "No codec support for selected audio sources.")
                    }
                },
                play: function (t, n) {
                    var i = this,
                        e = null;
                    if ("number" == typeof t) e = t, t = null;
                    else {
                        if ("string" == typeof t && "loaded" === i._state && !i._sprite[t]) return null;
                        if (void 0 === t) {
                            t = "__default";
                            for (var o = 0, r = 0; r < i._sounds.length; r++) i._sounds[r]._paused && !i._sounds[r]._ended && (o++, e = i._sounds[r]._id);
                            1 === o ? t = null : e = null
                        }
                    }
                    var s = e ? i._soundById(e) : i._inactiveSound();
                    if (!s) return null;
                    if (e && !t && (t = s._sprite || "__default"), "loaded" !== i._state) {
                        s._sprite = t, s._ended = !1;
                        var a = s._id;
                        return i._queue.push({
                            event: "play",
                            action: function () {
                                i.play(a)
                            }
                        }), a
                    }
                    if (e && !s._paused) return n || i._loadQueue("play"), s._id;
                    i._webAudio && g._autoResume();
                    var l = Math.max(0, 0 < s._seek ? s._seek : i._sprite[t][0] / 1e3),
                        c = Math.max(0, (i._sprite[t][0] + i._sprite[t][1]) / 1e3 - l),
                        u = 1e3 * c / Math.abs(s._rate);
                    if (s._paused = !1, s._ended = !1, s._sprite = t, s._seek = l, s._start = i._sprite[t][0] / 1e3, s._stop = (i._sprite[t][0] + i._sprite[t][1]) / 1e3, s._loop = !(!s._loop && !i._sprite[t][2]), !(s._seek >= s._stop)) {
                        var d = s._node;
                        if (i._webAudio) {
                            var h = function () {
                                i._refreshBuffer(s);
                                var e = s._muted || i._muted ? 0 : s._volume;
                                d.gain.setValueAtTime(e, g.ctx.currentTime), s._playStart = g.ctx.currentTime, void 0 === d.bufferSource.start ? s._loop ? d.bufferSource.noteGrainOn(0, l, 86400) : d.bufferSource.noteGrainOn(0, l, c) : s._loop ? d.bufferSource.start(0, l, 86400) : d.bufferSource.start(0, l, c), u !== 1 / 0 && (i._endTimers[s._id] = setTimeout(i._ended.bind(i, s), u)), n || setTimeout(function () {
                                    i._emit("play", s._id)
                                }, 0)
                            };
                            "running" === g.state ? h() : (i.once("resume", h), i._clearTimer(s._id))
                        } else {
                            var p = function () {
                                    d.currentTime = l, d.muted = s._muted || i._muted || g._muted || d.muted, d.volume = s._volume * g.volume(), d.playbackRate = s._rate;
                                    try {
                                        var e = d.play();
                                        if (e && "undefined" != typeof Promise && (e instanceof Promise || "function" == typeof e.then) ? (i._playLock = !0, e.then(function () {
                                                i._playLock = !1, n || i._emit("play", s._id)
                                            }).catch(function () {
                                                i._playLock = !1, i._emit("playerror", s._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.")
                                            })) : n || i._emit("play", s._id), d.playbackRate = s._rate, d.paused) return void i._emit("playerror", s._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                        "__default" !== t || s._loop ? i._endTimers[s._id] = setTimeout(i._ended.bind(i, s), u) : (i._endTimers[s._id] = function () {
                                            i._ended(s), d.removeEventListener("ended", i._endTimers[s._id], !1)
                                        }, d.addEventListener("ended", i._endTimers[s._id], !1))
                                    } catch (e) {
                                        i._emit("playerror", s._id, e)
                                    }
                                },
                                f = window && window.ejecta || !d.readyState && g._navigator.isCocoonJS;
                            if (3 <= d.readyState || f) p();
                            else {
                                var m = function () {
                                    p(), d.removeEventListener(g._canPlayEvent, m, !1)
                                };
                                d.addEventListener(g._canPlayEvent, m, !1), i._clearTimer(s._id)
                            }
                        }
                        return s._id
                    }
                    i._ended(s)
                },
                pause: function (e) {
                    var t = this;
                    if ("loaded" !== t._state || t._playLock) return t._queue.push({
                        event: "pause",
                        action: function () {
                            t.pause(e)
                        }
                    }), t;
                    for (var n = t._getSoundIds(e), i = 0; i < n.length; i++) {
                        t._clearTimer(n[i]);
                        var o = t._soundById(n[i]);
                        if (o && !o._paused && (o._seek = t.seek(n[i]), o._rateSeek = 0, o._paused = !0, t._stopFade(n[i]), o._node))
                            if (t._webAudio) {
                                if (!o._node.bufferSource) continue;
                                void 0 === o._node.bufferSource.stop ? o._node.bufferSource.noteOff(0) : o._node.bufferSource.stop(0), t._cleanBuffer(o._node)
                            } else isNaN(o._node.duration) && o._node.duration !== 1 / 0 || o._node.pause();
                        arguments[1] || t._emit("pause", o ? o._id : null)
                    }
                    return t
                },
                stop: function (e, t) {
                    var n = this;
                    if ("loaded" !== n._state || n._playLock) return n._queue.push({
                        event: "stop",
                        action: function () {
                            n.stop(e)
                        }
                    }), n;
                    for (var i = n._getSoundIds(e), o = 0; o < i.length; o++) {
                        n._clearTimer(i[o]);
                        var r = n._soundById(i[o]);
                        r && (r._seek = r._start || 0, r._rateSeek = 0, r._paused = !0, r._ended = !0, n._stopFade(i[o]), r._node && (n._webAudio ? r._node.bufferSource && (void 0 === r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0), n._cleanBuffer(r._node)) : isNaN(r._node.duration) && r._node.duration !== 1 / 0 || (r._node.currentTime = r._start || 0, r._node.pause())), t || n._emit("stop", r._id))
                    }
                    return n
                },
                mute: function (e, t) {
                    var n = this;
                    if ("loaded" !== n._state || n._playLock) return n._queue.push({
                        event: "mute",
                        action: function () {
                            n.mute(e, t)
                        }
                    }), n;
                    if (void 0 === t) {
                        if ("boolean" != typeof e) return n._muted;
                        n._muted = e
                    }
                    for (var i = n._getSoundIds(t), o = 0; o < i.length; o++) {
                        var r = n._soundById(i[o]);
                        r && (r._muted = e, r._interval && n._stopFade(r._id), n._webAudio && r._node ? r._node.gain.setValueAtTime(e ? 0 : r._volume, g.ctx.currentTime) : r._node && (r._node.muted = !!g._muted || e), n._emit("mute", r._id))
                    }
                    return n
                },
                volume: function () {
                    var e, t, n, i = this,
                        o = arguments;
                    if (0 === o.length) return i._volume;
                    if (1 === o.length || 2 === o.length && void 0 === o[1] ? 0 <= i._getSoundIds().indexOf(o[0]) ? t = parseInt(o[0], 10) : e = parseFloat(o[0]) : 2 <= o.length && (e = parseFloat(o[0]), t = parseInt(o[1], 10)), !(void 0 !== e && 0 <= e && e <= 1)) return (n = t ? i._soundById(t) : i._sounds[0]) ? n._volume : 0;
                    if ("loaded" !== i._state || i._playLock) return i._queue.push({
                        event: "volume",
                        action: function () {
                            i.volume.apply(i, o)
                        }
                    }), i;
                    void 0 === t && (i._volume = e), t = i._getSoundIds(t);
                    for (var r = 0; r < t.length; r++)(n = i._soundById(t[r])) && (n._volume = e, o[2] || i._stopFade(t[r]), i._webAudio && n._node && !n._muted ? n._node.gain.setValueAtTime(e, g.ctx.currentTime) : n._node && !n._muted && (n._node.volume = e * g.volume()), i._emit("volume", n._id));
                    return i
                },
                fade: function (e, t, n, i) {
                    var o = this;
                    if ("loaded" !== o._state || o._playLock) return o._queue.push({
                        event: "fade",
                        action: function () {
                            o.fade(e, t, n, i)
                        }
                    }), o;
                    o.volume(e, i);
                    for (var r = o._getSoundIds(i), s = 0; s < r.length; s++) {
                        var a = o._soundById(r[s]);
                        if (a) {
                            if (i || o._stopFade(r[s]), o._webAudio && !a._muted) {
                                var l = g.ctx.currentTime,
                                    c = l + n / 1e3;
                                a._volume = e, a._node.gain.setValueAtTime(e, l), a._node.gain.linearRampToValueAtTime(t, c)
                            }
                            o._startFadeInterval(a, e, t, n, r[s], void 0 === i)
                        }
                    }
                    return o
                },
                _startFadeInterval: function (t, n, i, o, e, r) {
                    var s = this,
                        a = n,
                        l = i - n,
                        c = Math.abs(l / .01),
                        u = Math.max(4, 0 < c ? o / c : o),
                        d = Date.now();
                    t._fadeTo = i, t._interval = setInterval(function () {
                        var e = (Date.now() - d) / o;
                        d = Date.now(), a += l * e, a = Math.max(0, a), a = Math.min(1, a), a = Math.round(100 * a) / 100, s._webAudio ? t._volume = a : s.volume(a, t._id, !0), r && (s._volume = a), (i < n && a <= i || n < i && i <= a) && (clearInterval(t._interval), t._interval = null, t._fadeTo = null, s.volume(i, t._id), s._emit("fade", t._id))
                    }, u)
                },
                _stopFade: function (e) {
                    var t = this,
                        n = t._soundById(e);
                    return n && n._interval && (t._webAudio && n._node.gain.cancelScheduledValues(g.ctx.currentTime), clearInterval(n._interval), n._interval = null, t.volume(n._fadeTo, e), n._fadeTo = null, t._emit("fade", e)), t
                },
                loop: function () {
                    var e, t, n, i = this,
                        o = arguments;
                    if (0 === o.length) return i._loop;
                    if (1 === o.length) {
                        if ("boolean" != typeof o[0]) return !!(n = i._soundById(parseInt(o[0], 10))) && n._loop;
                        e = o[0], i._loop = e
                    } else 2 === o.length && (e = o[0], t = parseInt(o[1], 10));
                    for (var r = i._getSoundIds(t), s = 0; s < r.length; s++)(n = i._soundById(r[s])) && (n._loop = e, i._webAudio && n._node && n._node.bufferSource && (n._node.bufferSource.loop = e) && (n._node.bufferSource.loopStart = n._start || 0, n._node.bufferSource.loopEnd = n._stop));
                    return i
                },
                rate: function () {
                    var e, t, n, i = this,
                        o = arguments;
                    if (0 === o.length) t = i._sounds[0]._id;
                    else if (1 === o.length) {
                        0 <= i._getSoundIds().indexOf(o[0]) ? t = parseInt(o[0], 10) : e = parseFloat(o[0])
                    } else 2 === o.length && (e = parseFloat(o[0]), t = parseInt(o[1], 10));
                    if ("number" != typeof e) return (n = i._soundById(t)) ? n._rate : i._rate;
                    if ("loaded" !== i._state || i._playLock) return i._queue.push({
                        event: "rate",
                        action: function () {
                            i.rate.apply(i, o)
                        }
                    }), i;
                    void 0 === t && (i._rate = e), t = i._getSoundIds(t);
                    for (var r = 0; r < t.length; r++)
                        if (n = i._soundById(t[r])) {
                            n._rateSeek = i.seek(t[r]), n._playStart = i._webAudio ? g.ctx.currentTime : n._playStart, n._rate = e, i._webAudio && n._node && n._node.bufferSource ? n._node.bufferSource.playbackRate.setValueAtTime(e, g.ctx.currentTime) : n._node && (n._node.playbackRate = e);
                            var s = i.seek(t[r]),
                                a = 1e3 * ((i._sprite[n._sprite][0] + i._sprite[n._sprite][1]) / 1e3 - s) / Math.abs(n._rate);
                            !i._endTimers[t[r]] && n._paused || (i._clearTimer(t[r]), i._endTimers[t[r]] = setTimeout(i._ended.bind(i, n), a)), i._emit("rate", n._id)
                        } return i
                },
                seek: function () {
                    var e, t, n = this,
                        i = arguments;
                    if (0 === i.length) t = n._sounds[0]._id;
                    else if (1 === i.length) {
                        0 <= n._getSoundIds().indexOf(i[0]) ? t = parseInt(i[0], 10) : n._sounds.length && (t = n._sounds[0]._id, e = parseFloat(i[0]))
                    } else 2 === i.length && (e = parseFloat(i[0]), t = parseInt(i[1], 10));
                    if (void 0 === t) return n;
                    if ("loaded" !== n._state || n._playLock) return n._queue.push({
                        event: "seek",
                        action: function () {
                            n.seek.apply(n, i)
                        }
                    }), n;
                    var o = n._soundById(t);
                    if (o) {
                        if (!("number" == typeof e && 0 <= e)) {
                            if (n._webAudio) {
                                var r = n.playing(t) ? g.ctx.currentTime - o._playStart : 0,
                                    s = o._rateSeek ? o._rateSeek - o._seek : 0;
                                return o._seek + (s + r * Math.abs(o._rate))
                            }
                            return o._node.currentTime
                        }
                        var a = n.playing(t);
                        a && n.pause(t, !0), o._seek = e, o._ended = !1, n._clearTimer(t), !n._webAudio && o._node && (o._node.currentTime = e);
                        var l = function () {
                            n._emit("seek", t), a && n.play(t, !0)
                        };
                        if (a && !n._webAudio) {
                            var c = function () {
                                n._playLock ? setTimeout(c, 0) : l()
                            };
                            setTimeout(c, 0)
                        } else l()
                    }
                    return n
                },
                playing: function (e) {
                    if ("number" == typeof e) {
                        var t = this._soundById(e);
                        return !!t && !t._paused
                    }
                    for (var n = 0; n < this._sounds.length; n++)
                        if (!this._sounds[n]._paused) return !0;
                    return !1
                },
                duration: function (e) {
                    var t = this._duration,
                        n = this._soundById(e);
                    return n && (t = this._sprite[n._sprite][1] / 1e3), t
                },
                state: function () {
                    return this._state
                },
                unload: function () {
                    for (var e = this, t = e._sounds, n = 0; n < t.length; n++) {
                        if (t[n]._paused || e.stop(t[n]._id), !e._webAudio) /MSIE |Trident\//.test(g._navigator && g._navigator.userAgent) || (t[n]._node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"), t[n]._node.removeEventListener("error", t[n]._errorFn, !1), t[n]._node.removeEventListener(g._canPlayEvent, t[n]._loadFn, !1);
                        delete t[n]._node, e._clearTimer(t[n]._id)
                    }
                    var i = g._howls.indexOf(e);
                    0 <= i && g._howls.splice(i, 1);
                    var o = !0;
                    for (n = 0; n < g._howls.length; n++)
                        if (g._howls[n]._src === e._src) {
                            o = !1;
                            break
                        } return s && o && delete s[e._src], g.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null
                },
                on: function (e, t, n, i) {
                    var o = this["_on" + e];
                    return "function" == typeof t && o.push(i ? {
                        id: n,
                        fn: t,
                        once: i
                    } : {
                        id: n,
                        fn: t
                    }), this
                },
                off: function (e, t, n) {
                    var i = this,
                        o = i["_on" + e],
                        r = 0;
                    if ("number" == typeof t && (n = t, t = null), t || n)
                        for (r = 0; r < o.length; r++) {
                            var s = n === o[r].id;
                            if (t === o[r].fn && s || !t && s) {
                                o.splice(r, 1);
                                break
                            }
                        } else if (e) i["_on" + e] = [];
                        else {
                            var a = Object.keys(i);
                            for (r = 0; r < a.length; r++) 0 === a[r].indexOf("_on") && Array.isArray(i[a[r]]) && (i[a[r]] = [])
                        } return i
                },
                once: function (e, t, n) {
                    return this.on(e, t, n, 1), this
                },
                _emit: function (e, t, n) {
                    for (var i = this, o = i["_on" + e], r = o.length - 1; 0 <= r; r--) o[r].id && o[r].id !== t && "load" !== e || (setTimeout(function (e) {
                        e.call(this, t, n)
                    }.bind(i, o[r].fn), 0), o[r].once && i.off(e, o[r].fn, o[r].id));
                    return i._loadQueue(e), i
                },
                _loadQueue: function (e) {
                    var t = this;
                    if (0 < t._queue.length) {
                        var n = t._queue[0];
                        n.event === e && (t._queue.shift(), t._loadQueue()), e || n.action()
                    }
                    return t
                },
                _ended: function (e) {
                    var t = this,
                        n = e._sprite;
                    if (!t._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) return setTimeout(t._ended.bind(t, e), 100), t;
                    var i = !(!e._loop && !t._sprite[n][2]);
                    if (t._emit("end", e._id), !t._webAudio && i && t.stop(e._id, !0).play(e._id), t._webAudio && i) {
                        t._emit("play", e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = g.ctx.currentTime;
                        var o = 1e3 * (e._stop - e._start) / Math.abs(e._rate);
                        t._endTimers[e._id] = setTimeout(t._ended.bind(t, e), o)
                    }
                    return t._webAudio && !i && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, t._clearTimer(e._id), t._cleanBuffer(e._node), g._autoSuspend()), t._webAudio || i || t.stop(e._id, !0), t
                },
                _clearTimer: function (e) {
                    var t = this;
                    if (t._endTimers[e]) {
                        if ("function" != typeof t._endTimers[e]) clearTimeout(t._endTimers[e]);
                        else {
                            var n = t._soundById(e);
                            n && n._node && n._node.removeEventListener("ended", t._endTimers[e], !1)
                        }
                        delete t._endTimers[e]
                    }
                    return t
                },
                _soundById: function (e) {
                    for (var t = 0; t < this._sounds.length; t++)
                        if (e === this._sounds[t]._id) return this._sounds[t];
                    return null
                },
                _inactiveSound: function () {
                    var e = this;
                    e._drain();
                    for (var t = 0; t < e._sounds.length; t++)
                        if (e._sounds[t]._ended) return e._sounds[t].reset();
                    return new r(e)
                },
                _drain: function () {
                    var e = this,
                        t = e._pool,
                        n = 0,
                        i = 0;
                    if (!(e._sounds.length < t)) {
                        for (i = 0; i < e._sounds.length; i++) e._sounds[i]._ended && n++;
                        for (i = e._sounds.length - 1; 0 <= i; i--) {
                            if (n <= t) return;
                            e._sounds[i]._ended && (e._webAudio && e._sounds[i]._node && e._sounds[i]._node.disconnect(0), e._sounds.splice(i, 1), n--)
                        }
                    }
                },
                _getSoundIds: function (e) {
                    if (void 0 !== e) return [e];
                    for (var t = [], n = 0; n < this._sounds.length; n++) t.push(this._sounds[n]._id);
                    return t
                },
                _refreshBuffer: function (e) {
                    return e._node.bufferSource = g.ctx.createBufferSource(), e._node.bufferSource.buffer = s[this._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop || 0), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, g.ctx.currentTime), this
                },
                _cleanBuffer: function (e) {
                    if (g._scratchBuffer && e.bufferSource) {
                        e.bufferSource.onended = null, e.bufferSource.disconnect(0);
                        try {
                            e.bufferSource.buffer = g._scratchBuffer
                        } catch (e) {}
                    }
                    return e.bufferSource = null, this
                }
            };
            var r = function (e) {
                this._parent = e, this.init()
            };
            r.prototype = {
                init: function () {
                    var e = this,
                        t = e._parent;
                    return e._muted = t._muted, e._loop = t._loop, e._volume = t._volume, e._rate = t._rate, e._seek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++g._counter, t._sounds.push(e), e.create(), e
                },
                create: function () {
                    var e = this,
                        t = e._parent,
                        n = g._muted || e._muted || e._parent._muted ? 0 : e._volume;
                    return t._webAudio ? (e._node = void 0 === g.ctx.createGain ? g.ctx.createGainNode() : g.ctx.createGain(), e._node.gain.setValueAtTime(n, g.ctx.currentTime), e._node.paused = !0, e._node.connect(g.masterGain)) : (e._node = new Audio, e._errorFn = e._errorListener.bind(e), e._node.addEventListener("error", e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(g._canPlayEvent, e._loadFn, !1), e._node.src = t._src, e._node.preload = "auto", e._node.volume = n * g.volume(), e._node.load()), e
                },
                reset: function () {
                    var e = this,
                        t = e._parent;
                    return e._muted = t._muted, e._loop = t._loop, e._volume = t._volume, e._rate = t._rate, e._seek = 0, e._rateSeek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++g._counter, e
                },
                _errorListener: function () {
                    var e = this;
                    e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener("error", e._errorFn, !1)
                },
                _loadListener: function () {
                    var e = this._parent;
                    e._duration = Math.ceil(10 * this._node.duration) / 10, 0 === Object.keys(e._sprite).length && (e._sprite = {
                        __default: [0, 1e3 * e._duration]
                    }), "loaded" !== e._state && (e._state = "loaded", e._emit("load"), e._loadQueue()), this._node.removeEventListener(g._canPlayEvent, this._loadFn, !1)
                }
            };
            var s = {},
                a = function (t) {
                    var e = t._src;
                    if (s[e]) return t._duration = s[e].duration, void u(t);
                    if (/^data:[^;]+;base64,/.test(e)) {
                        for (var n = atob(e.split(",")[1]), i = new Uint8Array(n.length), o = 0; o < n.length; ++o) i[o] = n.charCodeAt(o);
                        c(i.buffer, t)
                    } else {
                        var r = new XMLHttpRequest;
                        r.open("GET", e, !0), r.withCredentials = t._xhrWithCredentials, r.responseType = "arraybuffer", r.onload = function () {
                            var e = (r.status + "")[0];
                            "0" === e || "2" === e || "3" === e ? c(r.response, t) : t._emit("loaderror", null, "Failed loading audio file with status: " + r.status + ".")
                        }, r.onerror = function () {
                            t._webAudio && (t._html5 = !0, t._webAudio = !1, t._sounds = [], delete s[e], t.load())
                        }, l(r)
                    }
                },
                l = function (t) {
                    try {
                        t.send()
                    } catch (e) {
                        t.onerror()
                    }
                },
                c = function (e, t) {
                    var n = function () {
                            t._emit("loaderror", null, "Decoding audio data failed.")
                        },
                        i = function (e) {
                            e && 0 < t._sounds.length ? (s[t._src] = e, u(t, e)) : n()
                        };
                    "undefined" != typeof Promise && 1 === g.ctx.decodeAudioData.length ? g.ctx.decodeAudioData(e).then(i).catch(n) : g.ctx.decodeAudioData(e, i, n)
                },
                u = function (e, t) {
                    t && !e._duration && (e._duration = t.duration), 0 === Object.keys(e._sprite).length && (e._sprite = {
                        __default: [0, 1e3 * e._duration]
                    }), "loaded" !== e._state && (e._state = "loaded", e._emit("load"), e._loadQueue())
                },
                d = function () {
                    try {
                        "undefined" != typeof AudioContext ? g.ctx = new AudioContext : "undefined" != typeof webkitAudioContext ? g.ctx = new webkitAudioContext : g.usingWebAudio = !1
                    } catch (e) {
                        g.usingWebAudio = !1
                    }
                    var e = /iP(hone|od|ad)/.test(g._navigator && g._navigator.platform),
                        t = g._navigator && g._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                        n = t ? parseInt(t[1], 10) : null;
                    if (e && n && n < 9) {
                        var i = /safari/.test(g._navigator && g._navigator.userAgent.toLowerCase());
                        (g._navigator && g._navigator.standalone && !i || g._navigator && !g._navigator.standalone && !i) && (g.usingWebAudio = !1)
                    }
                    g.usingWebAudio && (g.masterGain = void 0 === g.ctx.createGain ? g.ctx.createGainNode() : g.ctx.createGain(), g.masterGain.gain.setValueAtTime(g._muted ? 0 : 1, g.ctx.currentTime), g.masterGain.connect(g.ctx.destination)), g._setup()
                };
            void 0 === (i = function () {
                return {
                    Howler: g,
                    Howl: t
                }
            }.apply(h, [])) || (o.exports = i), h.Howler = g, h.Howl = t, "undefined" != typeof window ? (window.HowlerGlobal = e, window.Howler = g, window.Howl = t, window.Sound = r) : void 0 !== n && (n.HowlerGlobal = e, n.Howler = g, n.Howl = t, n.Sound = r)
        }(),
        function () {
            "use strict";
            HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function (e) {
                var t = this;
                if (!t.ctx || !t.ctx.listener) return t;
                for (var n = t._howls.length - 1; 0 <= n; n--) t._howls[n].stereo(e);
                return t
            }, HowlerGlobal.prototype.pos = function (e, t, n) {
                var i = this;
                return i.ctx && i.ctx.listener ? (t = "number" != typeof t ? i._pos[1] : t, n = "number" != typeof n ? i._pos[2] : n, "number" != typeof e ? i._pos : (i._pos = [e, t, n], void 0 !== i.ctx.listener.positionX ? (i.ctx.listener.positionX.setTargetAtTime(i._pos[0], Howler.ctx.currentTime, .1), i.ctx.listener.positionY.setTargetAtTime(i._pos[1], Howler.ctx.currentTime, .1), i.ctx.listener.positionZ.setTargetAtTime(i._pos[2], Howler.ctx.currentTime, .1)) : i.ctx.listener.setPosition(i._pos[0], i._pos[1], i._pos[2]), i)) : i
            }, HowlerGlobal.prototype.orientation = function (e, t, n, i, o, r) {
                var s = this;
                if (!s.ctx || !s.ctx.listener) return s;
                var a = s._orientation;
                return t = "number" != typeof t ? a[1] : t, n = "number" != typeof n ? a[2] : n, i = "number" != typeof i ? a[3] : i, o = "number" != typeof o ? a[4] : o, r = "number" != typeof r ? a[5] : r, "number" != typeof e ? a : (s._orientation = [e, t, n, i, o, r], void 0 !== s.ctx.listener.forwardX ? (s.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, .1), s.ctx.listener.forwardY.setTargetAtTime(t, Howler.ctx.currentTime, .1), s.ctx.listener.forwardZ.setTargetAtTime(n, Howler.ctx.currentTime, .1), s.ctx.listener.upX.setTargetAtTime(e, Howler.ctx.currentTime, .1), s.ctx.listener.upY.setTargetAtTime(t, Howler.ctx.currentTime, .1), s.ctx.listener.upZ.setTargetAtTime(n, Howler.ctx.currentTime, .1)) : s.ctx.listener.setOrientation(e, t, n, i, o, r), s)
            }, Howl.prototype.init = function (n) {
                return function (e) {
                    var t = this;
                    return t._orientation = e.orientation || [1, 0, 0], t._stereo = e.stereo || null, t._pos = e.pos || null, t._pannerAttr = {
                        coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : 360,
                        coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : 360,
                        coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : 0,
                        distanceModel: void 0 !== e.distanceModel ? e.distanceModel : "inverse",
                        maxDistance: void 0 !== e.maxDistance ? e.maxDistance : 1e4,
                        panningModel: void 0 !== e.panningModel ? e.panningModel : "HRTF",
                        refDistance: void 0 !== e.refDistance ? e.refDistance : 1,
                        rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : 1
                    }, t._onstereo = e.onstereo ? [{
                        fn: e.onstereo
                    }] : [], t._onpos = e.onpos ? [{
                        fn: e.onpos
                    }] : [], t._onorientation = e.onorientation ? [{
                        fn: e.onorientation
                    }] : [], n.call(this, e)
                }
            }(Howl.prototype.init), Howl.prototype.stereo = function (e, t) {
                var n = this;
                if (!n._webAudio) return n;
                if ("loaded" !== n._state) return n._queue.push({
                    event: "stereo",
                    action: function () {
                        n.stereo(e, t)
                    }
                }), n;
                var i = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
                if (void 0 === t) {
                    if ("number" != typeof e) return n._stereo;
                    n._stereo = e, n._pos = [e, 0, 0]
                }
                for (var o = n._getSoundIds(t), r = 0; r < o.length; r++) {
                    var s = n._soundById(o[r]);
                    if (s) {
                        if ("number" != typeof e) return s._stereo;
                        s._stereo = e, s._pos = [e, 0, 0], s._node && (s._pannerAttr.panningModel = "equalpower", s._panner && s._panner.pan || c(s, i), "spatial" === i ? void 0 !== s._panner.positionX ? (s._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), s._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), s._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : s._panner.setPosition(e, 0, 0) : s._panner.pan.setValueAtTime(e, Howler.ctx.currentTime)), n._emit("stereo", s._id)
                    }
                }
                return n
            }, Howl.prototype.pos = function (e, t, n, i) {
                var o = this;
                if (!o._webAudio) return o;
                if ("loaded" !== o._state) return o._queue.push({
                    event: "pos",
                    action: function () {
                        o.pos(e, t, n, i)
                    }
                }), o;
                if (t = "number" != typeof t ? 0 : t, n = "number" != typeof n ? -.5 : n, void 0 === i) {
                    if ("number" != typeof e) return o._pos;
                    o._pos = [e, t, n]
                }
                for (var r = o._getSoundIds(i), s = 0; s < r.length; s++) {
                    var a = o._soundById(r[s]);
                    if (a) {
                        if ("number" != typeof e) return a._pos;
                        a._pos = [e, t, n], a._node && (a._panner && !a._panner.pan || c(a, "spatial"), void 0 !== a._panner.positionX ? (a._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), a._panner.positionY.setValueAtTime(t, Howler.ctx.currentTime), a._panner.positionZ.setValueAtTime(n, Howler.ctx.currentTime)) : a._panner.setOrientation(e, t, n)), o._emit("pos", a._id)
                    }
                }
                return o
            }, Howl.prototype.orientation = function (e, t, n, i) {
                var o = this;
                if (!o._webAudio) return o;
                if ("loaded" !== o._state) return o._queue.push({
                    event: "orientation",
                    action: function () {
                        o.orientation(e, t, n, i)
                    }
                }), o;
                if (t = "number" != typeof t ? o._orientation[1] : t, n = "number" != typeof n ? o._orientation[2] : n, void 0 === i) {
                    if ("number" != typeof e) return o._orientation;
                    o._orientation = [e, t, n]
                }
                for (var r = o._getSoundIds(i), s = 0; s < r.length; s++) {
                    var a = o._soundById(r[s]);
                    if (a) {
                        if ("number" != typeof e) return a._orientation;
                        a._orientation = [e, t, n], a._node && (a._panner || (a._pos || (a._pos = o._pos || [0, 0, -.5]), c(a, "spatial")), void 0 !== a._panner.orientationX ? (a._panner.orientationX.setValueAtTime(e, Howler.ctx.currentTime), a._panner.orientationY.setValueAtTime(t, Howler.ctx.currentTime), a._panner.orientationZ.setValueAtTime(n, Howler.ctx.currentTime)) : a._panner.setOrientation(e, t, n)), o._emit("orientation", a._id)
                    }
                }
                return o
            }, Howl.prototype.pannerAttr = function () {
                var e, t, n, i = this,
                    o = arguments;
                if (!i._webAudio) return i;
                if (0 === o.length) return i._pannerAttr;
                if (1 === o.length) {
                    if ("object" != typeof o[0]) return (n = i._soundById(parseInt(o[0], 10))) ? n._pannerAttr : i._pannerAttr;
                    e = o[0], void 0 === t && (e.pannerAttr || (e.pannerAttr = {
                        coneInnerAngle: e.coneInnerAngle,
                        coneOuterAngle: e.coneOuterAngle,
                        coneOuterGain: e.coneOuterGain,
                        distanceModel: e.distanceModel,
                        maxDistance: e.maxDistance,
                        refDistance: e.refDistance,
                        rolloffFactor: e.rolloffFactor,
                        panningModel: e.panningModel
                    }), i._pannerAttr = {
                        coneInnerAngle: void 0 !== e.pannerAttr.coneInnerAngle ? e.pannerAttr.coneInnerAngle : i._coneInnerAngle,
                        coneOuterAngle: void 0 !== e.pannerAttr.coneOuterAngle ? e.pannerAttr.coneOuterAngle : i._coneOuterAngle,
                        coneOuterGain: void 0 !== e.pannerAttr.coneOuterGain ? e.pannerAttr.coneOuterGain : i._coneOuterGain,
                        distanceModel: void 0 !== e.pannerAttr.distanceModel ? e.pannerAttr.distanceModel : i._distanceModel,
                        maxDistance: void 0 !== e.pannerAttr.maxDistance ? e.pannerAttr.maxDistance : i._maxDistance,
                        refDistance: void 0 !== e.pannerAttr.refDistance ? e.pannerAttr.refDistance : i._refDistance,
                        rolloffFactor: void 0 !== e.pannerAttr.rolloffFactor ? e.pannerAttr.rolloffFactor : i._rolloffFactor,
                        panningModel: void 0 !== e.pannerAttr.panningModel ? e.pannerAttr.panningModel : i._panningModel
                    })
                } else 2 === o.length && (e = o[0], t = parseInt(o[1], 10));
                for (var r = i._getSoundIds(t), s = 0; s < r.length; s++)
                    if (n = i._soundById(r[s])) {
                        var a = n._pannerAttr;
                        a = {
                            coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : a.coneInnerAngle,
                            coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : a.coneOuterAngle,
                            coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : a.coneOuterGain,
                            distanceModel: void 0 !== e.distanceModel ? e.distanceModel : a.distanceModel,
                            maxDistance: void 0 !== e.maxDistance ? e.maxDistance : a.maxDistance,
                            refDistance: void 0 !== e.refDistance ? e.refDistance : a.refDistance,
                            rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : a.rolloffFactor,
                            panningModel: void 0 !== e.panningModel ? e.panningModel : a.panningModel
                        };
                        var l = n._panner;
                        l ? (l.coneInnerAngle = a.coneInnerAngle, l.coneOuterAngle = a.coneOuterAngle, l.coneOuterGain = a.coneOuterGain, l.distanceModel = a.distanceModel, l.maxDistance = a.maxDistance, l.refDistance = a.refDistance, l.rolloffFactor = a.rolloffFactor, l.panningModel = a.panningModel) : (n._pos || (n._pos = i._pos || [0, 0, -.5]), c(n, "spatial"))
                    } return i
            }, Sound.prototype.init = function (n) {
                return function () {
                    var e = this,
                        t = e._parent;
                    e._orientation = t._orientation, e._stereo = t._stereo, e._pos = t._pos, e._pannerAttr = t._pannerAttr, n.call(this), e._stereo ? t.stereo(e._stereo) : e._pos && t.pos(e._pos[0], e._pos[1], e._pos[2], e._id)
                }
            }(Sound.prototype.init), Sound.prototype.reset = function (n) {
                return function () {
                    var e = this,
                        t = e._parent;
                    return e._orientation = t._orientation, e._stereo = t._stereo, e._pos = t._pos, e._pannerAttr = t._pannerAttr, e._stereo ? t.stereo(e._stereo) : e._pos ? t.pos(e._pos[0], e._pos[1], e._pos[2], e._id) : e._panner && (e._panner.disconnect(0), e._panner = void 0, t._refreshBuffer(e)), n.call(this)
                }
            }(Sound.prototype.reset);
            var c = function (e, t) {
                "spatial" === (t = t || "spatial") ? (e._panner = Howler.ctx.createPanner(), e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle, e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle, e._panner.coneOuterGain = e._pannerAttr.coneOuterGain, e._panner.distanceModel = e._pannerAttr.distanceModel, e._panner.maxDistance = e._pannerAttr.maxDistance, e._panner.refDistance = e._pannerAttr.refDistance, e._panner.rolloffFactor = e._pannerAttr.rolloffFactor, e._panner.panningModel = e._pannerAttr.panningModel, void 0 !== e._panner.positionX ? (e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime), e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime), e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime)) : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]), void 0 !== e._panner.orientationX ? (e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime), e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime), e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime)) : e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2])) : (e._panner = Howler.ctx.createStereoPanner(), e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)), e._panner.connect(e._node), e._paused || e._parent.pause(e._id, !0).play(e._id, !0)
            }
        }()
    }).call(this, e(4))
}, function (n, i, o) {
    var r, s;
    ! function (t, e) {
        r = [o(43)], void 0 === (s = function (e) {
            return function (c, r) {
                "use strict";
                var u = {
                        extend: function (e, t) {
                            for (var n in t) e[n] = t[n];
                            return e
                        },
                        modulo: function (e, t) {
                            return (e % t + t) % t
                        }
                    },
                    n = Array.prototype.slice;
                u.makeArray = function (e) {
                    if (Array.isArray(e)) return e;
                    if (null == e) return [];
                    var t = "object" == typeof e && "number" == typeof e.length;
                    return t ? n.call(e) : [e]
                }, u.removeFrom = function (e, t) {
                    var n = e.indexOf(t); - 1 != n && e.splice(n, 1)
                }, u.getParent = function (e, t) {
                    for (; e.parentNode && e != document.body;)
                        if (e = e.parentNode, r(e, t)) return e
                }, u.getQueryElement = function (e) {
                    return "string" == typeof e ? document.querySelector(e) : e
                }, u.handleEvent = function (e) {
                    var t = "on" + e.type;
                    this[t] && this[t](e)
                }, u.filterFindElements = function (e, i) {
                    e = u.makeArray(e);
                    var o = [];
                    return e.forEach(function (e) {
                        if (e instanceof HTMLElement)
                            if (i) {
                                r(e, i) && o.push(e);
                                for (var t = e.querySelectorAll(i), n = 0; n < t.length; n++) o.push(t[n])
                            } else o.push(e)
                    }), o
                }, u.debounceMethod = function (e, t, i) {
                    i = i || 100;
                    var o = e.prototype[t],
                        r = t + "Timeout";
                    e.prototype[t] = function () {
                        var e = this[r];
                        clearTimeout(e);
                        var t = arguments,
                            n = this;
                        this[r] = setTimeout(function () {
                            o.apply(n, t), delete n[r]
                        }, i)
                    }
                }, u.docReady = function (e) {
                    var t = document.readyState;
                    "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
                }, u.toDashed = function (e) {
                    return e.replace(/(.)([A-Z])/g, function (e, t, n) {
                        return t + "-" + n
                    }).toLowerCase()
                };
                var d = c.console;
                return u.htmlInit = function (a, l) {
                    u.docReady(function () {
                        var e = u.toDashed(l),
                            o = "data-" + e,
                            t = document.querySelectorAll("[" + o + "]"),
                            n = document.querySelectorAll(".js-" + e),
                            i = u.makeArray(t).concat(u.makeArray(n)),
                            r = o + "-options",
                            s = c.jQuery;
                        i.forEach(function (t) {
                            var e, n = t.getAttribute(o) || t.getAttribute(r);
                            try {
                                e = n && JSON.parse(n)
                            } catch (e) {
                                return void(d && d.error("Error parsing " + o + " on " + t.className + ": " + e))
                            }
                            var i = new a(t, e);
                            s && s.data(t, l, i)
                        })
                    })
                }, u
            }(t, e)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (t, n, i) {
    var o, r;
    ! function (s, e) {
        o = [i(6), i(7), i(1), i(44), i(45), i(46)], void 0 === (r = function (e, t, n, i, o, r) {
            return function (i, e, t, a, o, s, n) {
                "use strict";
                var l = i.jQuery,
                    r = i.getComputedStyle,
                    c = i.console;

                function u(e, t) {
                    for (e = a.makeArray(e); e.length;) t.appendChild(e.shift())
                }
                var d = 0,
                    h = {};

                function p(e, t) {
                    var n = a.getQueryElement(e);
                    if (n) {
                        if (this.element = n, this.element.flickityGUID) {
                            var i = h[this.element.flickityGUID];
                            return i.option(t), i
                        }
                        l && (this.$element = l(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(t), this._create()
                    } else c && c.error("Bad element for Flickity: " + (n || e))
                }
                p.defaults = {
                    accessibility: !0,
                    cellAlign: "center",
                    freeScrollFriction: .075,
                    friction: .28,
                    namespaceJQueryEvents: !0,
                    percentPosition: !0,
                    resize: !0,
                    selectedAttraction: .025,
                    setGallerySize: !0
                }, p.createMethods = [];
                var f = p.prototype;
                a.extend(f, e.prototype), f._create = function () {
                    var e = this.guid = ++d;
                    for (var t in this.element.flickityGUID = e, (h[e] = this).selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && i.addEventListener("resize", this), this.options.on) {
                        var n = this.options.on[t];
                        this.on(t, n)
                    }
                    p.createMethods.forEach(function (e) {
                        this[e]()
                    }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
                }, f.option = function (e) {
                    a.extend(this.options, e)
                }, f.activate = function () {
                    if (!this.isActive) {
                        this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
                        var e, t = this._filterFindCellElements(this.element.children);
                        u(t, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
                        var n = this.options.initialIndex;
                        e = this.isInitActivated ? this.selectedIndex : void 0 !== n && this.cells[n] ? n : 0, this.select(e, !1, !0), this.isInitActivated = !0, this.dispatchEvent("ready")
                    }
                }, f._createSlider = function () {
                    var e = document.createElement("div");
                    e.className = "flickity-slider", e.style[this.originSide] = 0, this.slider = e
                }, f._filterFindCellElements = function (e) {
                    return a.filterFindElements(e, this.options.cellSelector)
                }, f.reloadCells = function () {
                    this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
                }, f._makeCells = function (e) {
                    var t = this._filterFindCellElements(e),
                        n = t.map(function (e) {
                            return new o(e, this)
                        }, this);
                    return n
                }, f.getLastCell = function () {
                    return this.cells[this.cells.length - 1]
                }, f.getLastSlide = function () {
                    return this.slides[this.slides.length - 1]
                }, f.positionCells = function () {
                    this._sizeCells(this.cells), this._positionCells(0)
                }, f._positionCells = function (e) {
                    e = e || 0, this.maxCellHeight = e && this.maxCellHeight || 0;
                    var t = 0;
                    if (0 < e) {
                        var n = this.cells[e - 1];
                        t = n.x + n.size.outerWidth
                    }
                    for (var i = this.cells.length, o = e; o < i; o++) {
                        var r = this.cells[o];
                        r.setPosition(t), t += r.size.outerWidth, this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight)
                    }
                    this.slideableWidth = t, this.updateSlides(), this._containSlides(), this.slidesWidth = i ? this.getLastSlide().target - this.slides[0].target : 0
                }, f._sizeCells = function (e) {
                    e.forEach(function (e) {
                        e.getSize()
                    })
                }, f.updateSlides = function () {
                    if (this.slides = [], this.cells.length) {
                        var i = new s(this);
                        this.slides.push(i);
                        var e = "left" == this.originSide,
                            o = e ? "marginRight" : "marginLeft",
                            r = this._getCanCellFit();
                        this.cells.forEach(function (e, t) {
                            if (i.cells.length) {
                                var n = i.outerWidth - i.firstMargin + (e.size.outerWidth - e.size[o]);
                                r.call(this, t, n) || (i.updateTarget(), i = new s(this), this.slides.push(i)), i.addCell(e)
                            } else i.addCell(e)
                        }, this), i.updateTarget(), this.updateSelectedSlide()
                    }
                }, f._getCanCellFit = function () {
                    var e = this.options.groupCells;
                    if (!e) return function () {
                        return !1
                    };
                    if ("number" == typeof e) {
                        var t = parseInt(e, 10);
                        return function (e) {
                            return e % t != 0
                        }
                    }
                    var n = "string" == typeof e && e.match(/^(\d+)%$/),
                        i = n ? parseInt(n[1], 10) / 100 : 1;
                    return function (e, t) {
                        return t <= (this.size.innerWidth + 1) * i
                    }
                }, f._init = f.reposition = function () {
                    this.positionCells(), this.positionSliderAtSelected()
                }, f.getSize = function () {
                    this.size = t(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
                };
                var m = {
                    center: {
                        left: .5,
                        right: .5
                    },
                    left: {
                        left: 0,
                        right: 1
                    },
                    right: {
                        right: 0,
                        left: 1
                    }
                };
                f.setCellAlign = function () {
                    var e = m[this.options.cellAlign];
                    this.cellAlign = e ? e[this.originSide] : this.options.cellAlign
                }, f.setGallerySize = function () {
                    if (this.options.setGallerySize) {
                        var e = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                        this.viewport.style.height = e + "px"
                    }
                }, f._getWrapShiftCells = function () {
                    if (this.options.wrapAround) {
                        this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
                        var e = this.cursorPosition,
                            t = this.cells.length - 1;
                        this.beforeShiftCells = this._getGapCells(e, t, -1), e = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(e, 0, 1)
                    }
                }, f._getGapCells = function (e, t, n) {
                    for (var i = []; 0 < e;) {
                        var o = this.cells[t];
                        if (!o) break;
                        i.push(o), t += n, e -= o.size.outerWidth
                    }
                    return i
                }, f._containSlides = function () {
                    if (this.options.contain && !this.options.wrapAround && this.cells.length) {
                        var e = this.options.rightToLeft,
                            t = e ? "marginRight" : "marginLeft",
                            n = e ? "marginLeft" : "marginRight",
                            i = this.slideableWidth - this.getLastCell().size[n],
                            o = i < this.size.innerWidth,
                            r = this.cursorPosition + this.cells[0].size[t],
                            s = i - this.size.innerWidth * (1 - this.cellAlign);
                        this.slides.forEach(function (e) {
                            e.target = o ? i * this.cellAlign : (e.target = Math.max(e.target, r), Math.min(e.target, s))
                        }, this)
                    }
                }, f.dispatchEvent = function (e, t, n) {
                    var i = t ? [t].concat(n) : n;
                    if (this.emitEvent(e, i), l && this.$element) {
                        var o = e += this.options.namespaceJQueryEvents ? ".flickity" : "";
                        if (t) {
                            var r = l.Event(t);
                            r.type = e, o = r
                        }
                        this.$element.trigger(o, n)
                    }
                }, f.select = function (e, t, n) {
                    if (this.isActive && (e = parseInt(e, 10), this._wrapSelect(e), (this.options.wrapAround || t) && (e = a.modulo(e, this.slides.length)), this.slides[e])) {
                        var i = this.selectedIndex;
                        this.selectedIndex = e, this.updateSelectedSlide(), n ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [e]), e != i && this.dispatchEvent("change", null, [e]), this.dispatchEvent("cellSelect")
                    }
                }, f._wrapSelect = function (e) {
                    var t = this.slides.length;
                    if (!(this.options.wrapAround && 1 < t)) return e;
                    var n = a.modulo(e, t),
                        i = Math.abs(n - this.selectedIndex),
                        o = Math.abs(n + t - this.selectedIndex),
                        r = Math.abs(n - t - this.selectedIndex);
                    !this.isDragSelect && o < i ? e += t : !this.isDragSelect && r < i && (e -= t), e < 0 ? this.x -= this.slideableWidth : t <= e && (this.x += this.slideableWidth)
                }, f.previous = function (e, t) {
                    this.select(this.selectedIndex - 1, e, t)
                }, f.next = function (e, t) {
                    this.select(this.selectedIndex + 1, e, t)
                }, f.updateSelectedSlide = function () {
                    var e = this.slides[this.selectedIndex];
                    e && (this.unselectSelectedSlide(), (this.selectedSlide = e).select(), this.selectedCells = e.cells, this.selectedElements = e.getCellElements(), this.selectedCell = e.cells[0], this.selectedElement = this.selectedElements[0])
                }, f.unselectSelectedSlide = function () {
                    this.selectedSlide && this.selectedSlide.unselect()
                }, f.selectCell = function (e, t, n) {
                    var i = this.queryCell(e);
                    if (i) {
                        var o = this.getCellSlideIndex(i);
                        this.select(o, t, n)
                    }
                }, f.getCellSlideIndex = function (e) {
                    for (var t = 0; t < this.slides.length; t++)
                        if (-1 != this.slides[t].cells.indexOf(e)) return t
                }, f.getCell = function (e) {
                    for (var t = 0; t < this.cells.length; t++) {
                        var n = this.cells[t];
                        if (n.element == e) return n
                    }
                }, f.getCells = function (e) {
                    e = a.makeArray(e);
                    var n = [];
                    return e.forEach(function (e) {
                        var t = this.getCell(e);
                        t && n.push(t)
                    }, this), n
                }, f.getCellElements = function () {
                    return this.cells.map(function (e) {
                        return e.element
                    })
                }, f.getParentCell = function (e) {
                    var t = this.getCell(e);
                    return t || (e = a.getParent(e, ".flickity-slider > *"), this.getCell(e))
                }, f.getAdjacentCellElements = function (e, t) {
                    if (!e) return this.selectedSlide.getCellElements();
                    t = void 0 === t ? this.selectedIndex : t;
                    var n = this.slides.length;
                    if (n <= 1 + 2 * e) return this.getCellElements();
                    for (var i = [], o = t - e; o <= t + e; o++) {
                        var r = this.options.wrapAround ? a.modulo(o, n) : o,
                            s = this.slides[r];
                        s && (i = i.concat(s.getCellElements()))
                    }
                    return i
                }, f.queryCell = function (e) {
                    return "number" == typeof e ? this.cells[e] : ("string" == typeof e && (e = this.element.querySelector(e)), this.getCell(e))
                }, f.uiChange = function () {
                    this.emitEvent("uiChange")
                }, f.childUIPointerDown = function (e) {
                    this.emitEvent("childUIPointerDown", [e])
                }, f.onresize = function () {
                    this.watchCSS(), this.resize()
                }, a.debounceMethod(p, "onresize", 150), f.resize = function () {
                    if (this.isActive) {
                        this.getSize(), this.options.wrapAround && (this.x = a.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
                        var e = this.selectedElements && this.selectedElements[0];
                        this.selectCell(e, !1, !0)
                    }
                }, f.watchCSS = function () {
                    this.options.watchCSS && (-1 != r(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
                }, f.onkeydown = function (e) {
                    var t = document.activeElement && document.activeElement != this.element;
                    if (this.options.accessibility && !t) {
                        var n = p.keyboardHandlers[e.keyCode];
                        n && n.call(this)
                    }
                }, p.keyboardHandlers = {
                    37: function () {
                        var e = this.options.rightToLeft ? "next" : "previous";
                        this.uiChange(), this[e]()
                    },
                    39: function () {
                        var e = this.options.rightToLeft ? "previous" : "next";
                        this.uiChange(), this[e]()
                    }
                }, f.focus = function () {
                    var e = i.pageYOffset;
                    this.element.focus({
                        preventScroll: !0
                    }), i.pageYOffset != e && i.scrollTo(i.pageXOffset, e)
                }, f.deactivate = function () {
                    this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function (e) {
                        e.destroy()
                    }), this.element.removeChild(this.viewport), u(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
                }, f.destroy = function () {
                    this.deactivate(), i.removeEventListener("resize", this), this.emitEvent("destroy"), l && this.$element && l.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete h[this.guid]
                }, a.extend(f, n), p.data = function (e) {
                    var t = (e = a.getQueryElement(e)) && e.flickityGUID;
                    return t && h[t]
                }, a.htmlInit(p, "flickity"), l && l.bridget && l.bridget("flickity", p);
                return p.setJQuery = function (e) {
                    l = e
                }, p.Cell = o, p
            }(s, e, t, n, i, o, r)
        }.apply(n, o)) || (t.exports = r)
    }(window)
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.query = function (e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : document;
        return "string" == typeof e ? t.querySelector(e) : e
    }, t.queryAll = function (e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : document;
        return "string" == typeof e ? Array.prototype.slice.call(t.querySelectorAll(e)) : e
    }
}, function (e, t) {
    var n;
    n = function () {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function () {
        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        return function (e, t, n) {
            return t && i(e.prototype, t), n && i(e, n), e
        }
    }();
    var o = function () {
        function e() {
            ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.link = document.createElement("a")
        }
        return i(e, [{
            key: "setPath",
            value: function (e) {
                this.link.href = e
            }
        }, {
            key: "getPath",
            value: function () {
                var e = this.link.pathname;
                return "/" != e[0] && (e = "/" + e), e
            }
        }, {
            key: "getAddress",
            value: function () {
                var e = this.link.pathname + this.link.search;
                return "/" != e[0] && (e = "/" + e), e
            }
        }, {
            key: "getHash",
            value: function () {
                return this.link.hash
            }
        }]), e
    }();
    t.default = o
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        void 0 === (s = "function" == typeof (r = function () {
            "use strict";

            function e() {}
            var t = e.prototype;
            return t.on = function (e, t) {
                if (e && t) {
                    var n = this._events = this._events || {},
                        i = n[e] = n[e] || [];
                    return -1 == i.indexOf(t) && i.push(t), this
                }
            }, t.once = function (e, t) {
                if (e && t) {
                    this.on(e, t);
                    var n = this._onceEvents = this._onceEvents || {};
                    return (n[e] = n[e] || {})[t] = !0, this
                }
            }, t.off = function (e, t) {
                var n = this._events && this._events[e];
                if (n && n.length) {
                    var i = n.indexOf(t);
                    return -1 != i && n.splice(i, 1), this
                }
            }, t.emitEvent = function (e, t) {
                var n = this._events && this._events[e];
                if (n && n.length) {
                    n = n.slice(0), t = t || [];
                    for (var i = this._onceEvents && this._onceEvents[e], o = 0; o < n.length; o++) {
                        var r = n[o];
                        i && i[r] && (this.off(e, r), delete i[r]), r.apply(this, t)
                    }
                    return this
                }
            }, t.allOff = function () {
                delete this._events, delete this._onceEvents
            }, e
        }) ? r.call(i, o, i, n) : r) || (n.exports = s)
    }("undefined" != typeof window && window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        void 0 === (s = "function" == typeof (r = function () {
            "use strict";

            function v(e) {
                var t = parseFloat(e),
                    n = -1 == e.indexOf("%") && !isNaN(t);
                return n && t
            }
            var n = "undefined" == typeof console ? function () {} : function (e) {},
                y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
                b = y.length;

            function _(e) {
                var t = getComputedStyle(e);
                return t || n("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
            }
            var w, k = !1;

            function E(e) {
                if (function () {
                        if (k) return;
                        k = !0;
                        var e = document.createElement("div");
                        e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
                        var t = document.body || document.documentElement;
                        t.appendChild(e);
                        var n = _(e);
                        w = 200 == Math.round(v(n.width)), E.isBoxSizeOuter = w, t.removeChild(e)
                    }(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                    var t = _(e);
                    if ("none" == t.display) return function () {
                        for (var e = {
                                width: 0,
                                height: 0,
                                innerWidth: 0,
                                innerHeight: 0,
                                outerWidth: 0,
                                outerHeight: 0
                            }, t = 0; t < b; t++) {
                            var n = y[t];
                            e[n] = 0
                        }
                        return e
                    }();
                    var n = {};
                    n.width = e.offsetWidth, n.height = e.offsetHeight;
                    for (var i = n.isBorderBox = "border-box" == t.boxSizing, o = 0; o < b; o++) {
                        var r = y[o],
                            s = t[r],
                            a = parseFloat(s);
                        n[r] = isNaN(a) ? 0 : a
                    }
                    var l = n.paddingLeft + n.paddingRight,
                        c = n.paddingTop + n.paddingBottom,
                        u = n.marginLeft + n.marginRight,
                        d = n.marginTop + n.marginBottom,
                        h = n.borderLeftWidth + n.borderRightWidth,
                        p = n.borderTopWidth + n.borderBottomWidth,
                        f = i && w,
                        m = v(t.width);
                    !1 !== m && (n.width = m + (f ? 0 : l + h));
                    var g = v(t.height);
                    return !1 !== g && (n.height = g + (f ? 0 : c + p)), n.innerWidth = n.width - (l + h), n.innerHeight = n.height - (c + p), n.outerWidth = n.width + u, n.outerHeight = n.height + d, n
                }
            }
            return E
        }) ? r.call(i, o, i, n) : r) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (t, e) {
        r = [o(6)], void 0 === (s = function (e) {
            return function (o, e) {
                "use strict";

                function t() {}
                var n = t.prototype = Object.create(e.prototype);
                n.bindStartEvent = function (e) {
                    this._bindStartEvent(e, !0)
                }, n.unbindStartEvent = function (e) {
                    this._bindStartEvent(e, !1)
                }, n._bindStartEvent = function (e, t) {
                    var n = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener",
                        i = "mousedown";
                    o.PointerEvent ? i = "pointerdown" : "ontouchstart" in o && (i = "touchstart"), e[n](i, this)
                }, n.handleEvent = function (e) {
                    var t = "on" + e.type;
                    this[t] && this[t](e)
                }, n.getTouch = function (e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (n.identifier == this.pointerIdentifier) return n
                    }
                }, n.onmousedown = function (e) {
                    var t = e.button;
                    t && 0 !== t && 1 !== t || this._pointerDown(e, e)
                }, n.ontouchstart = function (e) {
                    this._pointerDown(e, e.changedTouches[0])
                }, n.onpointerdown = function (e) {
                    this._pointerDown(e, e)
                }, n._pointerDown = function (e, t) {
                    e.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== t.pointerId ? t.pointerId : t.identifier, this.pointerDown(e, t))
                }, n.pointerDown = function (e, t) {
                    this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t])
                };
                var i = {
                    mousedown: ["mousemove", "mouseup"],
                    touchstart: ["touchmove", "touchend", "touchcancel"],
                    pointerdown: ["pointermove", "pointerup", "pointercancel"]
                };
                return n._bindPostStartEvents = function (e) {
                    if (e) {
                        var t = i[e.type];
                        t.forEach(function (e) {
                            o.addEventListener(e, this)
                        }, this), this._boundPointerEvents = t
                    }
                }, n._unbindPostStartEvents = function () {
                    this._boundPointerEvents && (this._boundPointerEvents.forEach(function (e) {
                        o.removeEventListener(e, this)
                    }, this), delete this._boundPointerEvents)
                }, n.onmousemove = function (e) {
                    this._pointerMove(e, e)
                }, n.onpointermove = function (e) {
                    e.pointerId == this.pointerIdentifier && this._pointerMove(e, e)
                }, n.ontouchmove = function (e) {
                    var t = this.getTouch(e.changedTouches);
                    t && this._pointerMove(e, t)
                }, n._pointerMove = function (e, t) {
                    this.pointerMove(e, t)
                }, n.pointerMove = function (e, t) {
                    this.emitEvent("pointerMove", [e, t])
                }, n.onmouseup = function (e) {
                    this._pointerUp(e, e)
                }, n.onpointerup = function (e) {
                    e.pointerId == this.pointerIdentifier && this._pointerUp(e, e)
                }, n.ontouchend = function (e) {
                    var t = this.getTouch(e.changedTouches);
                    t && this._pointerUp(e, t)
                }, n._pointerUp = function (e, t) {
                    this._pointerDone(), this.pointerUp(e, t)
                }, n.pointerUp = function (e, t) {
                    this.emitEvent("pointerUp", [e, t])
                }, n._pointerDone = function () {
                    this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone()
                }, n._pointerReset = function () {
                    this.isPointerDown = !1, delete this.pointerIdentifier
                }, n.pointerDone = function () {}, n.onpointercancel = function (e) {
                    e.pointerId == this.pointerIdentifier && this._pointerCancel(e, e)
                }, n.ontouchcancel = function (e) {
                    var t = this.getTouch(e.changedTouches);
                    t && this._pointerCancel(e, t)
                }, n._pointerCancel = function (e, t) {
                    this._pointerDone(), this.pointerCancel(e, t)
                }, n.pointerCancel = function (e, t) {
                    this.emitEvent("pointerCancel", [e, t])
                }, t.getPointerPoint = function (e) {
                    return {
                        x: e.pageX,
                        y: e.pageY
                    }
                }, t
            }(t, e)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (t, e) {
        r = [o(8)], void 0 === (s = function (e) {
            return function (a, l) {
                "use strict";

                function e(e) {
                    this.bindTap(e)
                }
                var t = e.prototype = Object.create(l.prototype);
                return t.bindTap = function (e) {
                    e && (this.unbindTap(), this.tapElement = e, this._bindStartEvent(e, !0))
                }, t.unbindTap = function () {
                    this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
                }, t.pointerUp = function (e, t) {
                    if (!this.isIgnoringMouseUp || "mouseup" != e.type) {
                        var n = l.getPointerPoint(t),
                            i = this.tapElement.getBoundingClientRect(),
                            o = a.pageXOffset,
                            r = a.pageYOffset;
                        if (n.x >= i.left + o && n.x <= i.right + o && n.y >= i.top + r && n.y <= i.bottom + r && this.emitEvent("tap", [e, t]), "mouseup" != e.type) {
                            this.isIgnoringMouseUp = !0;
                            var s = this;
                            setTimeout(function () {
                                delete s.isIgnoringMouseUp
                            }, 400)
                        }
                    }
                }, t.destroy = function () {
                    this.pointerDone(), this.unbindTap()
                }, e
            }(t, e)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (e, t, n) {
    var i = n(18),
        o = n(19),
        r = n(20);
    e.exports = function (e) {
        return i(e) || o(e) || r()
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        },
        r = function () {
            function i(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function (e, t, n) {
                return t && i(e.prototype, t), n && i(e, n), e
            }
        }(),
        s = i(n(21)),
        a = i(n(23)),
        l = i(n(5)),
        c = i(n(24)),
        u = i(n(25)),
        d = i(n(26)),
        h = i(n(27)),
        p = i(n(28)),
        f = i(n(29)),
        m = i(n(30)),
        g = i(n(31)),
        v = i(n(32)),
        y = i(n(33)),
        b = i(n(34)),
        _ = i(n(35)),
        w = i(n(36)),
        k = i(n(37)),
        E = i(n(38)),
        A = i(n(39)),
        T = i(n(40)),
        S = i(n(41)),
        x = i(n(42));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var C = function () {
        function i(e) {
            ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, i);
            var t = {
                cache: !0,
                animationSelector: '[class*="transition-"]',
                elements: ["#swup"],
                pageClassPrefix: "",
                debugMode: !1,
                scroll: !0,
                doScrollingRightAway: !1,
                animateScroll: !0,
                scrollFriction: .3,
                scrollAcceleration: .04,
                preload: !0,
                support: !0,
                plugins: [],
                skipPopStateHandling: function (e) {
                    return !e.state || "swup" != e.state.source
                },
                animateHistoryBrowsing: !1,
                LINK_SELECTOR: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
                FORM_SELECTOR: "form[data-swup-form]"
            };
            this.transition = {};
            var n = o({}, t, e);
            this._handlers = {
                animationInDone: [],
                animationInStart: [],
                animationOutDone: [],
                animationOutStart: [],
                animationSkipped: [],
                clickLink: [],
                contentReplaced: [],
                disabled: [],
                enabled: [],
                hoverLink: [],
                openPageInNewTab: [],
                pageLoaded: [],
                pagePreloaded: [],
                pageRetrievedFromCache: [],
                pageView: [],
                popState: [],
                samePage: [],
                samePageWithHash: [],
                scrollDone: [],
                scrollStart: [],
                serverError: [],
                submitForm: [],
                willReplaceContent: []
            }, this.scrollToElement = null, this.preloadPromise = null, this.options = n, this.plugins = [], this.getUrl = g.default, this.cache = new a.default, this.link = new l.default, this.transitionEndEvent = (0, c.default)(), this.getDataFromHtml = d.default, this.getPage = u.default, this.scrollTo = v.default, this.loadPage = h.default, this.renderPage = p.default, this.createState = f.default, this.triggerEvent = m.default, this.classify = y.default, this.doScrolling = b.default, this.markSwupElements = _.default, this.on = w.default, this.off = k.default, this.updateTransition = E.default, this.preloadPage = A.default, this.preloadPages = T.default, this.usePlugin = S.default, this.log = x.default, this.enable = this.enable, this.destroy = this.destroy, this.options.debugMode && (window.swup = this), this.getUrl(), this.enable()
        }
        return r(i, [{
            key: "enable",
            value: function () {
                var t = this;
                if (this.options.support) {
                    if (!("pushState" in window.history)) return;
                    if (!(0, c.default)()) return;
                    if (this.transitionEndEvent = (0, c.default)(), "undefined" == typeof Promise || -1 === Promise.toString().indexOf("[native code]")) return
                }
                this.delegatedListeners = {}, this.delegatedListeners.click = (0, s.default)(document, this.options.LINK_SELECTOR, "click", this.linkClickHandler.bind(this)), this.delegatedListeners.mouseover = (0, s.default)(document.body, this.options.LINK_SELECTOR, "mouseover", this.linkMouseoverHandler.bind(this)), this.delegatedListeners.formSubmit = (0, s.default)(document, this.options.FORM_SELECTOR, "submit", this.formSubmitHandler.bind(this)), window.addEventListener("popstate", this.popStateHandler.bind(this));
                var e = this.getDataFromHtml(document.documentElement.outerHTML);
                e.url = this.currentUrl, this.options.cache && this.cache.cacheUrl(e, this.options.debugMode), this.markSwupElements(document.documentElement), this.options.plugins.forEach(function (e) {
                    return t.usePlugin(e)
                }), window.history.replaceState(Object.assign({}, window.history.state, {
                    url: window.location.href,
                    random: Math.random(),
                    source: "swup"
                }), document.title, window.location.href), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.triggerEvent("enabled"), document.documentElement.classList.add("swup-enabled"), this.triggerEvent("pageView"), this.preloadPages()
            }
        }, {
            key: "destroy",
            value: function () {
                this.delegatedListeners.click.destroy(), this.delegatedListeners.mouseover.destroy(), window.removeEventListener("popstate", this.popStateHandler.bind(this)), this.cache.empty(), document.querySelectorAll("[data-swup]").forEach(function (e) {
                    delete e.dataset.swup
                }), this.off(), this.triggerEvent("disabled"), document.documentElement.classList.remove("swup-enabled")
            }
        }, {
            key: "linkClickHandler",
            value: function (e) {
                if (e.metaKey) this.triggerEvent("openPageInNewTab", e);
                else if (0 === e.button) {
                    this.triggerEvent("clickLink", e);
                    var t = new l.default;
                    if (e.preventDefault(), t.setPath(e.delegateTarget.href), t.getAddress() == this.currentUrl || "" == t.getAddress())
                        if ("" != t.getHash()) {
                            this.triggerEvent("samePageWithHash", e);
                            var n = document.querySelector(t.getHash());
                            if (null != n) {
                                if (this.options.scroll) {
                                    var i = n.getBoundingClientRect().top + window.pageYOffset;
                                    this.scrollTo(document.body, i)
                                }
                                history.replaceState({
                                    url: t.getAddress() + t.getHash(),
                                    random: Math.random(),
                                    source: "swup"
                                }, document.title, t.getAddress() + t.getHash())
                            }
                        } else this.triggerEvent("samePage", e), this.options.scroll && this.scrollTo(document.body, 0, 1);
                    else {
                        "" != t.getHash() && (this.scrollToElement = t.getHash());
                        var o = e.delegateTarget.dataset.swupTransition;
                        this.loadPage({
                            url: t.getAddress(),
                            customTransition: o
                        }, !1)
                    }
                }
            }
        }, {
            key: "linkMouseoverHandler",
            value: function (r) {
                var s = this;
                if (this.triggerEvent("hoverLink", r), this.options.preload) {
                    var a = new l.default;
                    a.setPath(r.delegateTarget.href), a.getAddress() == this.currentUrl || this.cache.exists(a.getAddress()) || null != this.preloadPromise || (this.preloadPromise = new Promise(function (i, o) {
                        s.getPage({
                            url: a.getAddress()
                        }, function (e, t) {
                            if (500 === t.status) return s.triggerEvent("serverError", r), void o(a.getAddress());
                            var n = s.getDataFromHtml(e, t);
                            null != n ? (n.url = a.getAddress(), s.cache.cacheUrl(n, s.options.debugMode), s.triggerEvent("pagePreloaded", r), i(), s.preloadPromise = null) : o(a.getAddress())
                        })
                    }), this.preloadPromise.route = a.getAddress())
                }
            }
        }, {
            key: "formSubmitHandler",
            value: function (e) {
                if (e.metaKey) this.triggerEvent("openFormSubmitInNewTab", e);
                else {
                    this.triggerEvent("submitForm", e), e.preventDefault();
                    var t = e.target,
                        n = new FormData(t),
                        i = new l.default;
                    if (i.setPath(t.action), "" != i.getHash() && (this.scrollToElement = i.getHash()), "get" != t.method.toLowerCase()) this.cache.remove(i.getAddress()), this.loadPage({
                        url: i.getAddress(),
                        method: t.method,
                        data: n
                    });
                    else {
                        var o = i.getAddress() || window.location.href,
                            r = t.querySelectorAll("input, select"); - 1 == o.indexOf("?") ? o += "?" : o += "&", r.forEach(function (e) {
                            "checkbox" == e.type || "radio" == e.type ? e.checked && (o += encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) + "&") : o += encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) + "&"
                        }), o = o.slice(0, -1), this.cache.remove(o), this.loadPage({
                            url: o
                        })
                    }
                }
            }
        }, {
            key: "popStateHandler",
            value: function (e) {
                var t = new l.default;
                this.options.skipPopStateHandling(e) || (t.setPath(e.state ? e.state.url : window.location.pathname), "" != t.getHash() ? this.scrollToElement = t.getHash() : e.preventDefault(), this.triggerEvent("popState", e), this.loadPage({
                    url: t.getAddress()
                }, e))
            }
        }]), i
    }();
    t.default = C
}, function (e, t, n) {
    "use strict";
    e.exports = {
        name: "swupGaPlugin",
        options: {
            runScripts: !1
        },
        exec: function (e, n) {
            document.addEventListener("swup:contentReplaced", function () {
                if ("function" == typeof window.ga) {
                    var e = document.title,
                        t = window.location.pathname + window.location.search;
                    window.ga("set", "title", e), window.ga("set", "page", t), window.ga("send", "pageview"), n.log("GA pageview (url '" + t + "').")
                }
            })
        }
    }
}, function (n, i, o) {
    var r, s, a;
    ! function (e, t) {
        s = [o(2), o(47), o(49), o(50), o(51), o(52), o(53)], void 0 === (a = "function" == typeof (r = function (e) {
            return e
        }) ? r.apply(i, s) : r) || (n.exports = a)
    }(window)
}, function (n, e, t) {
    (function (He) {
        "object" == typeof navigator && function (e, t) {
            n.exports = function () {
                "use strict";

                function c(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }

                function i(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }

                function e(e, t, n) {
                    return t && i(e.prototype, t), n && i(e, n), e
                }

                function r(e, t, n) {
                    return t in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e
                }

                function m(e, t) {
                    return function (e) {
                        if (Array.isArray(e)) return e
                    }(e) || function (e, t) {
                        var n = [],
                            i = !0,
                            o = !1,
                            r = void 0;
                        try {
                            for (var s, a = e[Symbol.iterator](); !(i = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); i = !0);
                        } catch (e) {
                            o = !0, r = e
                        } finally {
                            try {
                                i || null == a.return || a.return()
                            } finally {
                                if (o) throw r
                            }
                        }
                        return n
                    }(e, t) || function () {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }()
                }
                var t = function (e) {
                        return null != e ? e.constructor : null
                    },
                    n = function (e, t) {
                        return Boolean(e && t && e instanceof t)
                    },
                    o = function (e) {
                        return null == e
                    },
                    s = function (e) {
                        return t(e) === Object
                    },
                    a = function (e) {
                        return t(e) === String
                    },
                    l = function (e) {
                        return Array.isArray(e)
                    },
                    u = function (e) {
                        return n(e, NodeList)
                    },
                    d = function (e) {
                        return o(e) || (a(e) || l(e) || u(e)) && !e.length || s(e) && !Object.keys(e).length
                    },
                    g = {
                        nullOrUndefined: o,
                        object: s,
                        number: function (e) {
                            return t(e) === Number && !Number.isNaN(e)
                        },
                        string: a,
                        boolean: function (e) {
                            return t(e) === Boolean
                        },
                        function: function (e) {
                            return t(e) === Function
                        },
                        array: l,
                        weakMap: function (e) {
                            return n(e, WeakMap)
                        },
                        nodeList: u,
                        element: function (e) {
                            return n(e, Element)
                        },
                        textNode: function (e) {
                            return t(e) === Text
                        },
                        event: function (e) {
                            return n(e, Event)
                        },
                        keyboardEvent: function (e) {
                            return n(e, KeyboardEvent)
                        },
                        cue: function (e) {
                            return n(e, window.TextTrackCue) || n(e, window.VTTCue)
                        },
                        track: function (e) {
                            return n(e, TextTrack) || !o(e) && a(e.kind)
                        },
                        url: function (e) {
                            if (n(e, window.URL)) return !0;
                            if (!a(e)) return !1;
                            var t = e;
                            e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));
                            try {
                                return !d(new URL(t).hostname)
                            } catch (e) {
                                return !1
                            }
                        },
                        empty: d
                    },
                    h = function () {
                        var e = !1;
                        try {
                            var t = Object.defineProperty({}, "passive", {
                                get: function () {
                                    return e = !0, null
                                }
                            });
                            window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
                        } catch (e) {}
                        return e
                    }();

                function p(t, e, n) {
                    var i = this,
                        o = 3 < arguments.length && void 0 !== arguments[3] && arguments[3],
                        r = !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4],
                        s = 5 < arguments.length && void 0 !== arguments[5] && arguments[5];
                    if (t && "addEventListener" in t && !g.empty(e) && g.function(n)) {
                        var a = e.split(" "),
                            l = s;
                        h && (l = {
                            passive: r,
                            capture: s
                        }), a.forEach(function (e) {
                            i && i.eventListeners && o && i.eventListeners.push({
                                element: t,
                                type: e,
                                callback: n,
                                options: l
                            }), t[o ? "addEventListener" : "removeEventListener"](e, n, l)
                        })
                    }
                }

                function f(e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                        n = 2 < arguments.length ? arguments[2] : void 0,
                        i = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3],
                        o = 4 < arguments.length && void 0 !== arguments[4] && arguments[4];
                    p.call(this, e, t, n, !0, i, o)
                }

                function v(e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                        n = 2 < arguments.length ? arguments[2] : void 0,
                        i = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3],
                        o = 4 < arguments.length && void 0 !== arguments[4] && arguments[4];
                    p.call(this, e, t, n, !1, i, o)
                }

                function y(o) {
                    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                        s = 2 < arguments.length ? arguments[2] : void 0,
                        a = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3],
                        l = 4 < arguments.length && void 0 !== arguments[4] && arguments[4];
                    p.call(this, o, r, function e() {
                        v(o, r, e, a, l);
                        for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        s.apply(this, n)
                    }, !0, a, l)
                }

                function b(e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                        n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                        i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
                    if (g.element(e) && !g.empty(t)) {
                        var o = new CustomEvent(t, {
                            bubbles: n,
                            detail: Object.assign({}, i, {
                                plyr: this
                            })
                        });
                        e.dispatchEvent(o)
                    }
                }

                function _(e, r) {
                    var t = e.length ? e : [e];
                    Array.from(t).reverse().forEach(function (e, t) {
                        var n = 0 < t ? r.cloneNode(!0) : r,
                            i = e.parentNode,
                            o = e.nextSibling;
                        n.appendChild(e), o ? i.insertBefore(n, o) : i.appendChild(n)
                    })
                }

                function w(o, e) {
                    g.element(o) && !g.empty(e) && Object.entries(e).filter(function (e) {
                        var t = m(e, 2)[1];
                        return !g.nullOrUndefined(t)
                    }).forEach(function (e) {
                        var t = m(e, 2),
                            n = t[0],
                            i = t[1];
                        return o.setAttribute(n, i)
                    })
                }

                function k(e, t, n) {
                    var i = document.createElement(e);
                    return g.object(t) && w(i, t), g.string(n) && (i.innerText = n), i
                }

                function E(e, t, n, i) {
                    g.element(t) && t.appendChild(k(e, n, i))
                }

                function A(e) {
                    g.nodeList(e) || g.array(e) ? Array.from(e).forEach(A) : g.element(e) && g.element(e.parentNode) && e.parentNode.removeChild(e)
                }

                function T(e) {
                    if (g.element(e))
                        for (var t = e.childNodes.length; 0 < t;) e.removeChild(e.lastChild), t -= 1
                }

                function S(e, t) {
                    return g.element(t) && g.element(t.parentNode) && g.element(e) ? (t.parentNode.replaceChild(e, t), e) : null
                }

                function x(e, t) {
                    if (!g.string(e) || g.empty(e)) return {};
                    var s = {},
                        a = t;
                    return e.split(",").forEach(function (e) {
                        var t = e.trim(),
                            n = t.replace(".", ""),
                            i = t.replace(/[[\]]/g, "").split("="),
                            o = i[0],
                            r = 1 < i.length ? i[1].replace(/["']/g, "") : "";
                        switch (t.charAt(0)) {
                            case ".":
                                g.object(a) && g.string(a.class) && (a.class += " ".concat(n)), s.class = n;
                                break;
                            case "#":
                                s.id = t.replace("#", "");
                                break;
                            case "[":
                                s[o] = r
                        }
                    }), s
                }

                function C(e, t) {
                    if (g.element(e)) {
                        var n = t;
                        g.boolean(n) || (n = !e.hidden), n ? e.setAttribute("hidden", "") : e.removeAttribute("hidden")
                    }
                }

                function P(e, t, n) {
                    if (g.nodeList(e)) return Array.from(e).map(function (e) {
                        return P(e, t, n)
                    });
                    if (g.element(e)) {
                        var i = "toggle";
                        return void 0 !== n && (i = n ? "add" : "remove"), e.classList[i](t), e.classList.contains(t)
                    }
                    return !1
                }

                function D(e, t) {
                    return g.element(e) && e.classList.contains(t)
                }

                function L(e, t) {
                    return function () {
                        return Array.from(document.querySelectorAll(t)).includes(this)
                    }.call(e, t)
                }

                function M(e) {
                    return this.elements.container.querySelectorAll(e)
                }

                function I(e) {
                    return this.elements.container.querySelector(e)
                }

                function O() {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
                        t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                    g.element(e) && (e.focus({
                        preventScroll: !0
                    }), t && P(e, this.config.classNames.tabFocus))
                }
                var H, N, F, R = (H = document.createElement("span"), N = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                }, F = Object.keys(N).find(function (e) {
                    return void 0 !== H.style[e]
                }), !!g.string(F) && N[F]);

                function B(e) {
                    setTimeout(function () {
                        try {
                            C(e, !0), e.offsetHeight, C(e, !1)
                        } catch (e) {}
                    }, 0)
                }
                var q, z = {
                        isIE: !!document.documentMode,
                        isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
                        isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
                        isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
                    },
                    j = {
                        "audio/ogg": "vorbis",
                        "audio/wav": "1",
                        "video/webm": "vp8, vorbis",
                        "video/mp4": "avc1.42E01E, mp4a.40.2",
                        "video/ogg": "theora"
                    },
                    W = {
                        audio: "canPlayType" in document.createElement("audio"),
                        video: "canPlayType" in document.createElement("video"),
                        check: function (e, t, n) {
                            var i = z.isIPhone && n && W.playsinline,
                                o = W[e] || "html5" !== t;
                            return {
                                api: o,
                                ui: o && W.rangeInput && ("video" !== e || !z.isIPhone || i)
                            }
                        },
                        pip: !(z.isIPhone || !g.function(k("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || k("video").disablePictureInPicture)),
                        airplay: g.function(window.WebKitPlaybackTargetAvailabilityEvent),
                        playsinline: "playsInline" in document.createElement("video"),
                        mime: function (e) {
                            var t = m(e.split("/"), 1)[0],
                                n = e;
                            if (!this.isHTML5 || t !== this.type) return !1;
                            Object.keys(j).includes(n) && (n += '; codecs="'.concat(j[e], '"'));
                            try {
                                return Boolean(n && this.media.canPlayType(n).replace(/no/, ""))
                            } catch (e) {
                                return !1
                            }
                        },
                        textTracks: "textTracks" in document.createElement("video"),
                        rangeInput: (q = document.createElement("input"), q.type = "range", "range" === q.type),
                        touch: "ontouchstart" in document.documentElement,
                        transitions: !1 !== R,
                        reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
                    },
                    V = {
                        getSources: function () {
                            var t = this;
                            return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(function (e) {
                                return W.mime.call(t, e.getAttribute("type"))
                            }) : []
                        },
                        getQualityOptions: function () {
                            return V.getSources.call(this).map(function (e) {
                                return Number(e.getAttribute("size"))
                            }).filter(Boolean)
                        },
                        extend: function () {
                            if (this.isHTML5) {
                                var a = this;
                                Object.defineProperty(a.media, "quality", {
                                    get: function () {
                                        var e = V.getSources.call(a).find(function (e) {
                                            return e.getAttribute("src") === a.source
                                        });
                                        return e && Number(e.getAttribute("size"))
                                    },
                                    set: function (t) {
                                        var e = V.getSources.call(a).find(function (e) {
                                            return Number(e.getAttribute("size")) === t
                                        });
                                        if (e) {
                                            var n = a.media,
                                                i = n.currentTime,
                                                o = n.paused,
                                                r = n.preload,
                                                s = n.readyState;
                                            a.media.src = e.getAttribute("src"), ("none" !== r || s) && (a.once("loadedmetadata", function () {
                                                a.currentTime = i, o || a.play()
                                            }), a.media.load()), b.call(a, a.media, "qualitychange", !1, {
                                                quality: t
                                            })
                                        }
                                    }
                                })
                            }
                        },
                        cancelRequests: function () {
                            this.isHTML5 && (A(V.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
                        }
                    };

                function U(n) {
                    return g.array(n) ? n.filter(function (e, t) {
                        return n.indexOf(e) === t
                    }) : n
                }

                function G(e, t) {
                    return t.split(".").reduce(function (e, t) {
                        return e && e[t]
                    }, e)
                }

                function Z() {
                    for (var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length, n = new Array(1 < e ? e - 1 : 0), i = 1; i < e; i++) n[i - 1] = arguments[i];
                    if (!n.length) return t;
                    var o = n.shift();
                    return g.object(o) ? (Object.keys(o).forEach(function (e) {
                        g.object(o[e]) ? (Object.keys(t).includes(e) || Object.assign(t, r({}, e, {})), Z(t[e], o[e])) : Object.assign(t, r({}, e, o[e]))
                    }), Z.apply(void 0, [t].concat(n))) : t
                }

                function X(e) {
                    for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
                    return g.empty(e) ? e : e.toString().replace(/{(\d+)}/g, function (e, t) {
                        return n[t].toString()
                    })
                }

                function Y() {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
                        t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                        n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "";
                    return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"), "g"), n.toString())
                }

                function K() {
                    return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/\w\S*/g, function (e) {
                        return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
                    })
                }

                function $(e) {
                    var t = document.createElement("div");
                    return t.appendChild(e), t.innerHTML
                }
                var Q = {
                        pip: "PIP",
                        airplay: "AirPlay",
                        html5: "HTML5",
                        vimeo: "Vimeo",
                        youtube: "YouTube"
                    },
                    J = function () {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
                            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                        if (g.empty(e) || g.empty(t)) return "";
                        var o = G(t.i18n, e);
                        if (g.empty(o)) return Object.keys(Q).includes(e) ? Q[e] : "";
                        var n = {
                            "{seektime}": t.seekTime,
                            "{title}": t.title
                        };
                        return Object.entries(n).forEach(function (e) {
                            var t = m(e, 2),
                                n = t[0],
                                i = t[1];
                            o = Y(o, n, i)
                        }), o
                    },
                    ee = function () {
                        function i(e) {
                            c(this, i), this.enabled = e.config.storage.enabled, this.key = e.config.storage.key
                        }
                        return e(i, [{
                            key: "get",
                            value: function (e) {
                                if (!i.supported || !this.enabled) return null;
                                var t = window.localStorage.getItem(this.key);
                                if (g.empty(t)) return null;
                                var n = JSON.parse(t);
                                return g.string(e) && e.length ? n[e] : n
                            }
                        }, {
                            key: "set",
                            value: function (e) {
                                if (i.supported && this.enabled && g.object(e)) {
                                    var t = this.get();
                                    g.empty(t) && (t = {}), Z(t, e), window.localStorage.setItem(this.key, JSON.stringify(t))
                                }
                            }
                        }], [{
                            key: "supported",
                            get: function () {
                                try {
                                    return "localStorage" in window && (window.localStorage.setItem("___test", "___test"), window.localStorage.removeItem("___test"), !0)
                                } catch (e) {
                                    return !1
                                }
                            }
                        }]), i
                    }();

                function te(e) {
                    var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "text";
                    return new Promise(function (t, n) {
                        try {
                            var i = new XMLHttpRequest;
                            if (!("withCredentials" in i)) return;
                            i.addEventListener("load", function () {
                                if ("text" === o) try {
                                    t(JSON.parse(i.responseText))
                                } catch (e) {
                                    t(i.responseText)
                                } else t(i.response)
                            }), i.addEventListener("error", function () {
                                throw new Error(i.status)
                            }), i.open("GET", e, !0), i.responseType = o, i.send()
                        } catch (e) {
                            n(e)
                        }
                    })
                }

                function ne(e, t) {
                    if (g.string(e)) {
                        var n = g.string(t),
                            i = function () {
                                return null !== document.getElementById(t)
                            },
                            o = function (e, t) {
                                e.innerHTML = t, n && i() || document.body.insertAdjacentElement("afterbegin", e)
                            };
                        if (!n || !i()) {
                            var r = ee.supported,
                                s = document.createElement("div");
                            if (s.setAttribute("hidden", ""), n && s.setAttribute("id", t), r) {
                                var a = window.localStorage.getItem("".concat("cache", "-").concat(t));
                                if (null !== a) {
                                    var l = JSON.parse(a);
                                    o(s, l.content)
                                }
                            }
                            te(e).then(function (e) {
                                g.empty(e) || (r && window.localStorage.setItem("".concat("cache", "-").concat(t), JSON.stringify({
                                    content: e
                                })), o(s, e))
                            }).catch(function () {})
                        }
                    }
                }
                var ie = function (e) {
                        return parseInt(e / 60 / 60 % 60, 10)
                    },
                    oe = function (e) {
                        return parseInt(e / 60 % 60, 10)
                    },
                    re = function (e) {
                        return parseInt(e % 60, 10)
                    };

                function se() {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                        t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                        n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
                    if (!g.number(e)) return se(null, t, n);
                    var i = function (e) {
                            return "0".concat(e).slice(-2)
                        },
                        o = ie(e),
                        r = oe(e),
                        s = re(e);
                    return o = t || 0 < o ? "".concat(o, ":") : "", "".concat(n && 0 < e ? "-" : "").concat(o).concat(i(r), ":").concat(i(s))
                }
                var ae = {
                    getIconUrl: function () {
                        var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || z.isIE && !window.svg4everybody;
                        return {
                            url: this.config.iconUrl,
                            cors: e
                        }
                    },
                    findElements: function () {
                        try {
                            return this.elements.controls = I.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                                play: M.call(this, this.config.selectors.buttons.play),
                                pause: I.call(this, this.config.selectors.buttons.pause),
                                restart: I.call(this, this.config.selectors.buttons.restart),
                                rewind: I.call(this, this.config.selectors.buttons.rewind),
                                fastForward: I.call(this, this.config.selectors.buttons.fastForward),
                                mute: I.call(this, this.config.selectors.buttons.mute),
                                pip: I.call(this, this.config.selectors.buttons.pip),
                                airplay: I.call(this, this.config.selectors.buttons.airplay),
                                settings: I.call(this, this.config.selectors.buttons.settings),
                                captions: I.call(this, this.config.selectors.buttons.captions),
                                fullscreen: I.call(this, this.config.selectors.buttons.fullscreen)
                            }, this.elements.progress = I.call(this, this.config.selectors.progress), this.elements.inputs = {
                                seek: I.call(this, this.config.selectors.inputs.seek),
                                volume: I.call(this, this.config.selectors.inputs.volume)
                            }, this.elements.display = {
                                buffer: I.call(this, this.config.selectors.display.buffer),
                                currentTime: I.call(this, this.config.selectors.display.currentTime),
                                duration: I.call(this, this.config.selectors.display.duration)
                            }, g.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0
                        } catch (e) {
                            return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
                        }
                    },
                    createIcon: function (e, t) {
                        var n = ae.getIconUrl.call(this),
                            i = "".concat(n.cors ? "" : n.url, "#").concat(this.config.iconPrefix),
                            o = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        w(o, Z(t, {
                            role: "presentation",
                            focusable: "false"
                        }));
                        var r = document.createElementNS("http://www.w3.org/2000/svg", "use"),
                            s = "".concat(i, "-").concat(e);
                        return "href" in r && r.setAttributeNS("http://www.w3.org/1999/xlink", "href", s), r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", s), o.appendChild(r), o
                    },
                    createLabel: function (e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                            n = J(e, this.config);
                        return k("span", Object.assign({}, t, {
                            class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
                        }), n)
                    },
                    createBadge: function (e) {
                        if (g.empty(e)) return null;
                        var t = k("span", {
                            class: this.config.classNames.menu.value
                        });
                        return t.appendChild(k("span", {
                            class: this.config.classNames.menu.badge
                        }, e)), t
                    },
                    createButton: function (e, t) {
                        var n = Object.assign({}, t),
                            i = function () {
                                var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "").toString();
                                return (e = function () {
                                    var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "").toString();
                                    return Y(e = K(e = Y(e = Y(e, "-", " "), "_", " ")), " ", "")
                                }(e)).charAt(0).toLowerCase() + e.slice(1)
                            }(e),
                            o = {
                                element: "button",
                                toggle: !1,
                                label: null,
                                icon: null,
                                labelPressed: null,
                                iconPressed: null
                            };
                        switch (["element", "icon", "label"].forEach(function (e) {
                            Object.keys(n).includes(e) && (o[e] = n[e], delete n[e])
                        }), "button" !== o.element || Object.keys(n).includes("type") || (n.type = "button"), Object.keys(n).includes("class") ? n.class.includes(this.config.classNames.control) || (n.class += " ".concat(this.config.classNames.control)) : n.class = this.config.classNames.control, e) {
                            case "play":
                                o.toggle = !0, o.label = "play", o.labelPressed = "pause", o.icon = "play", o.iconPressed = "pause";
                                break;
                            case "mute":
                                o.toggle = !0, o.label = "mute", o.labelPressed = "unmute", o.icon = "volume", o.iconPressed = "muted";
                                break;
                            case "captions":
                                o.toggle = !0, o.label = "enableCaptions", o.labelPressed = "disableCaptions", o.icon = "captions-off", o.iconPressed = "captions-on";
                                break;
                            case "fullscreen":
                                o.toggle = !0, o.label = "enterFullscreen", o.labelPressed = "exitFullscreen", o.icon = "enter-fullscreen", o.iconPressed = "exit-fullscreen";
                                break;
                            case "play-large":
                                n.class += " ".concat(this.config.classNames.control, "--overlaid"), i = "play", o.label = "play", o.icon = "play";
                                break;
                            default:
                                g.empty(o.label) && (o.label = i), g.empty(o.icon) && (o.icon = e)
                        }
                        var r = k(o.element);
                        return o.toggle ? (r.appendChild(ae.createIcon.call(this, o.iconPressed, {
                            class: "icon--pressed"
                        })), r.appendChild(ae.createIcon.call(this, o.icon, {
                            class: "icon--not-pressed"
                        })), r.appendChild(ae.createLabel.call(this, o.labelPressed, {
                            class: "label--pressed"
                        })), r.appendChild(ae.createLabel.call(this, o.label, {
                            class: "label--not-pressed"
                        }))) : (r.appendChild(ae.createIcon.call(this, o.icon)), r.appendChild(ae.createLabel.call(this, o.label))), Z(n, x(this.config.selectors.buttons[i], n)), w(r, n), "play" === i ? (g.array(this.elements.buttons[i]) || (this.elements.buttons[i] = []), this.elements.buttons[i].push(r)) : this.elements.buttons[i] = r, r
                    },
                    createRange: function (e, t) {
                        var n = k("input", Z(x(this.config.selectors.inputs[e]), {
                            type: "range",
                            min: 0,
                            max: 100,
                            step: .01,
                            value: 0,
                            autocomplete: "off",
                            role: "slider",
                            "aria-label": J(e, this.config),
                            "aria-valuemin": 0,
                            "aria-valuemax": 100,
                            "aria-valuenow": 0
                        }, t));
                        return this.elements.inputs[e] = n, ae.updateRangeFill.call(this, n), n
                    },
                    createProgress: function (e, t) {
                        var n = k("progress", Z(x(this.config.selectors.display[e]), {
                            min: 0,
                            max: 100,
                            value: 0,
                            role: "presentation",
                            "aria-hidden": !0
                        }, t));
                        if ("volume" !== e) {
                            n.appendChild(k("span", null, "0"));
                            var i = {
                                    played: "played",
                                    buffer: "buffered"
                                } [e],
                                o = i ? J(i, this.config) : "";
                            n.innerText = "% ".concat(o.toLowerCase())
                        }
                        return this.elements.display[e] = n
                    },
                    createTime: function (e) {
                        var t = x(this.config.selectors.display[e]),
                            n = k("div", Z(t, {
                                class: "".concat(this.config.classNames.display.time, " ").concat(t.class ? t.class : "").trim(),
                                "aria-label": J(e, this.config)
                            }), "00:00");
                        return this.elements.display[e] = n
                    },
                    bindMenuItemShortcuts: function (i, o) {
                        var r = this;
                        f(i, "keydown keyup", function (e) {
                            if ([32, 38, 39, 40].includes(e.which) && (e.preventDefault(), e.stopPropagation(), "keydown" !== e.type)) {
                                var t, n = L(i, '[role="menuitemradio"]');
                                !n && [32, 39].includes(e.which) ? ae.showMenuPanel.call(r, o, !0) : 32 !== e.which && (40 === e.which || n && 39 === e.which ? (t = i.nextElementSibling, g.element(t) || (t = i.parentNode.firstElementChild)) : (t = i.previousElementSibling, g.element(t) || (t = i.parentNode.lastElementChild)), O.call(r, t, !0))
                            }
                        }, !1), f(i, "keyup", function (e) {
                            13 === e.which && ae.focusFirstMenuItem.call(r, null, !0)
                        })
                    },
                    createMenuItem: function (e) {
                        var t = this,
                            n = e.value,
                            i = e.list,
                            o = e.type,
                            r = e.title,
                            s = e.badge,
                            a = void 0 === s ? null : s,
                            l = e.checked,
                            c = void 0 !== l && l,
                            u = x(this.config.selectors.inputs[o]),
                            d = k("button", Z(u, {
                                type: "button",
                                role: "menuitemradio",
                                class: "".concat(this.config.classNames.control, " ").concat(u.class ? u.class : "").trim(),
                                "aria-checked": c,
                                value: n
                            })),
                            h = k("span");
                        h.innerHTML = r, g.element(a) && h.appendChild(a), d.appendChild(h), Object.defineProperty(d, "checked", {
                            enumerable: !0,
                            get: function () {
                                return "true" === d.getAttribute("aria-checked")
                            },
                            set: function (e) {
                                e && Array.from(d.parentNode.children).filter(function (e) {
                                    return L(e, '[role="menuitemradio"]')
                                }).forEach(function (e) {
                                    return e.setAttribute("aria-checked", "false")
                                }), d.setAttribute("aria-checked", e ? "true" : "false")
                            }
                        }), this.listeners.bind(d, "click keyup", function (e) {
                            if (!g.keyboardEvent(e) || 32 === e.which) {
                                switch (e.preventDefault(), e.stopPropagation(), d.checked = !0, o) {
                                    case "language":
                                        t.currentTrack = Number(n);
                                        break;
                                    case "quality":
                                        t.quality = n;
                                        break;
                                    case "speed":
                                        t.speed = parseFloat(n)
                                }
                                ae.showMenuPanel.call(t, "home", g.keyboardEvent(e))
                            }
                        }, o, !1), ae.bindMenuItemShortcuts.call(this, d, o), i.appendChild(d)
                    },
                    formatTime: function () {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                            t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                        return g.number(e) ? se(e, 0 < ie(this.duration), t) : e
                    },
                    updateTimeDisplay: function () {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
                            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                            n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
                        g.element(e) && g.number(t) && (e.innerText = ae.formatTime(t, n))
                    },
                    updateVolume: function () {
                        this.supported.ui && (g.element(this.elements.inputs.volume) && ae.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), g.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume))
                    },
                    setRange: function (e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
                        g.element(e) && (e.value = t, ae.updateRangeFill.call(this, e))
                    },
                    updateProgress: function (e) {
                        var r = this;
                        if (this.supported.ui && g.event(e)) {
                            var t, n, i = 0;
                            if (e) switch (e.type) {
                                case "timeupdate":
                                case "seeking":
                                case "seeked":
                                    t = this.currentTime, n = this.duration, i = 0 === t || 0 === n || Number.isNaN(t) || Number.isNaN(n) ? 0 : (t / n * 100).toFixed(2), "timeupdate" === e.type && ae.setRange.call(this, this.elements.inputs.seek, i);
                                    break;
                                case "playing":
                                case "progress":
                                    ! function (e, t) {
                                        var n = g.number(t) ? t : 0,
                                            i = g.element(e) ? e : r.elements.display.buffer;
                                        if (g.element(i)) {
                                            i.value = n;
                                            var o = i.getElementsByTagName("span")[0];
                                            g.element(o) && (o.childNodes[0].nodeValue = n)
                                        }
                                    }(this.elements.display.buffer, 100 * this.buffered)
                            }
                        }
                    },
                    updateRangeFill: function (e) {
                        var t = g.event(e) ? e.target : e;
                        if (g.element(t) && "range" === t.getAttribute("type")) {
                            if (L(t, this.config.selectors.inputs.seek)) {
                                t.setAttribute("aria-valuenow", this.currentTime);
                                var n = ae.formatTime(this.currentTime),
                                    i = ae.formatTime(this.duration),
                                    o = J("seekLabel", this.config);
                                t.setAttribute("aria-valuetext", o.replace("{currentTime}", n).replace("{duration}", i))
                            } else if (L(t, this.config.selectors.inputs.volume)) {
                                var r = 100 * t.value;
                                t.setAttribute("aria-valuenow", r), t.setAttribute("aria-valuetext", "".concat(r.toFixed(1), "%"))
                            } else t.setAttribute("aria-valuenow", t.value);
                            z.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%"))
                        }
                    },
                    updateSeekTooltip: function (e) {
                        var t = this;
                        if (this.config.tooltips.seek && g.element(this.elements.inputs.seek) && g.element(this.elements.display.seekTooltip) && 0 !== this.duration) {
                            var n = 0,
                                i = this.elements.progress.getBoundingClientRect(),
                                o = "".concat(this.config.classNames.tooltip, "--visible"),
                                r = function (e) {
                                    P(t.elements.display.seekTooltip, o, e)
                                };
                            if (this.touch) r(!1);
                            else {
                                if (g.event(e)) n = 100 / i.width * (e.pageX - i.left);
                                else {
                                    if (!D(this.elements.display.seekTooltip, o)) return;
                                    n = parseFloat(this.elements.display.seekTooltip.style.left, 10)
                                }
                                n < 0 ? n = 0 : 100 < n && (n = 100), ae.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * n), this.elements.display.seekTooltip.style.left = "".concat(n, "%"), g.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && r("mouseenter" === e.type)
                            }
                        }
                    },
                    timeUpdate: function (e) {
                        var t = !g.element(this.elements.display.duration) && this.config.invertTime;
                        ae.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || ae.updateProgress.call(this, e)
                    },
                    durationUpdate: function () {
                        if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
                            if (this.duration >= Math.pow(2, 32)) return C(this.elements.display.currentTime, !0), void C(this.elements.progress, !0);
                            g.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
                            var e = g.element(this.elements.display.duration);
                            !e && this.config.displayDuration && this.paused && ae.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && ae.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), ae.updateSeekTooltip.call(this)
                        }
                    },
                    toggleMenuButton: function (e, t) {
                        C(this.elements.settings.buttons[e], !t)
                    },
                    updateSetting: function (e, t, n) {
                        var i = this.elements.settings.panels[e],
                            o = null,
                            r = t;
                        if ("captions" === e) o = this.currentTrack;
                        else {
                            if (o = g.empty(n) ? this[e] : n, g.empty(o) && (o = this.config[e].default), !g.empty(this.options[e]) && !this.options[e].includes(o)) return void this.debug.warn("Unsupported value of '".concat(o, "' for ").concat(e));
                            if (!this.config[e].options.includes(o)) return void this.debug.warn("Disabled value of '".concat(o, "' for ").concat(e))
                        }
                        if (g.element(r) || (r = i && i.querySelector('[role="menu"]')), g.element(r)) {
                            this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = ae.getLabel.call(this, e, o);
                            var s = r && r.querySelector('[value="'.concat(o, '"]'));
                            g.element(s) && (s.checked = !0)
                        }
                    },
                    getLabel: function (e, t) {
                        switch (e) {
                            case "speed":
                                return 1 === t ? J("normal", this.config) : "".concat(t, "&times;");
                            case "quality":
                                if (g.number(t)) {
                                    var n = J("qualityLabel.".concat(t), this.config);
                                    return n.length ? n : "".concat(t, "p")
                                }
                                return K(t);
                            case "captions":
                                return ue.getLabel.call(this);
                            default:
                                return null
                        }
                    },
                    setQualityMenu: function (e) {
                        var i = this;
                        if (g.element(this.elements.settings.panels.quality)) {
                            var t = this.elements.settings.panels.quality.querySelector('[role="menu"]');
                            g.array(e) && (this.options.quality = U(e).filter(function (e) {
                                return i.config.quality.options.includes(e)
                            }));
                            var n = !g.empty(this.options.quality) && 1 < this.options.quality.length;
                            ae.toggleMenuButton.call(this, "quality", n), T(t), ae.checkMenu.call(this), n && (this.options.quality.sort(function (e, t) {
                                var n = i.config.quality.options;
                                return n.indexOf(e) > n.indexOf(t) ? 1 : -1
                            }).forEach(function (e) {
                                ae.createMenuItem.call(i, {
                                    value: e,
                                    list: t,
                                    type: "quality",
                                    title: ae.getLabel.call(i, "quality", e),
                                    badge: function (e) {
                                        var t = J("qualityBadge.".concat(e), i.config);
                                        return t.length ? ae.createBadge.call(i, t) : null
                                    }(e)
                                })
                            }), ae.updateSetting.call(this, "quality", t))
                        }
                    },
                    setCaptionsMenu: function () {
                        var n = this;
                        if (g.element(this.elements.settings.panels.captions)) {
                            var i = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
                                e = ue.getTracks.call(this),
                                t = Boolean(e.length);
                            if (ae.toggleMenuButton.call(this, "captions", t), T(i), ae.checkMenu.call(this), t) {
                                var o = e.map(function (e, t) {
                                    return {
                                        value: t,
                                        checked: n.captions.toggled && n.currentTrack === t,
                                        title: ue.getLabel.call(n, e),
                                        badge: e.language && ae.createBadge.call(n, e.language.toUpperCase()),
                                        list: i,
                                        type: "language"
                                    }
                                });
                                o.unshift({
                                    value: -1,
                                    checked: !this.captions.toggled,
                                    title: J("disabled", this.config),
                                    list: i,
                                    type: "language"
                                }), o.forEach(ae.createMenuItem.bind(this)), ae.updateSetting.call(this, "captions", i)
                            }
                        }
                    },
                    setSpeedMenu: function (e) {
                        var t = this;
                        if (g.element(this.elements.settings.panels.speed)) {
                            var n = this.elements.settings.panels.speed.querySelector('[role="menu"]');
                            g.array(e) ? this.options.speed = e : (this.isHTML5 || this.isVimeo) && (this.options.speed = [.5, .75, 1, 1.25, 1.5, 1.75, 2]), this.options.speed = this.options.speed.filter(function (e) {
                                return t.config.speed.options.includes(e)
                            });
                            var i = !g.empty(this.options.speed) && 1 < this.options.speed.length;
                            ae.toggleMenuButton.call(this, "speed", i), T(n), ae.checkMenu.call(this), i && (this.options.speed.forEach(function (e) {
                                ae.createMenuItem.call(t, {
                                    value: e,
                                    list: n,
                                    type: "speed",
                                    title: ae.getLabel.call(t, "speed", e)
                                })
                            }), ae.updateSetting.call(this, "speed", n))
                        }
                    },
                    checkMenu: function () {
                        var e = this.elements.settings.buttons,
                            t = !g.empty(e) && Object.values(e).some(function (e) {
                                return !e.hidden
                            });
                        C(this.elements.settings.menu, !t)
                    },
                    focusFirstMenuItem: function (e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                        if (!this.elements.settings.popup.hidden) {
                            var n = e;
                            g.element(n) || (n = Object.values(this.elements.settings.panels).find(function (e) {
                                return !e.hidden
                            }));
                            var i = n.querySelector('[role^="menuitem"]');
                            O.call(this, i, t)
                        }
                    },
                    toggleMenu: function (e) {
                        var t = this.elements.settings.popup,
                            n = this.elements.buttons.settings;
                        if (g.element(t) && g.element(n)) {
                            var i = t.hidden,
                                o = i;
                            if (g.boolean(e)) o = e;
                            else if (g.keyboardEvent(e) && 27 === e.which) o = !1;
                            else if (g.event(e)) {
                                var r = t.contains(e.target);
                                if (r || !r && e.target !== n && o) return
                            }
                            n.setAttribute("aria-expanded", o), C(t, !o), P(this.elements.container, this.config.classNames.menu.open, o), o && g.keyboardEvent(e) ? ae.focusFirstMenuItem.call(this, null, !0) : o || i || O.call(this, n, g.keyboardEvent(e))
                        }
                    },
                    getMenuSize: function (e) {
                        var t = e.cloneNode(!0);
                        t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
                        var n = t.scrollWidth,
                            i = t.scrollHeight;
                        return A(t), {
                            width: n,
                            height: i
                        }
                    },
                    showMenuPanel: function () {
                        var n = this,
                            e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
                            t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                            i = document.getElementById("plyr-settings-".concat(this.id, "-").concat(e));
                        if (g.element(i)) {
                            var o = i.parentNode,
                                r = Array.from(o.children).find(function (e) {
                                    return !e.hidden
                                });
                            if (W.transitions && !W.reducedMotion) {
                                o.style.width = "".concat(r.scrollWidth, "px"), o.style.height = "".concat(r.scrollHeight, "px");
                                var s = ae.getMenuSize.call(this, i);
                                f.call(this, o, R, function e(t) {
                                    t.target === o && ["width", "height"].includes(t.propertyName) && (o.style.width = "", o.style.height = "", v.call(n, o, R, e))
                                }), o.style.width = "".concat(s.width, "px"), o.style.height = "".concat(s.height, "px")
                            }
                            C(r, !0), C(i, !1), ae.focusFirstMenuItem.call(this, i, t)
                        }
                    },
                    setDownloadLink: function () {
                        var e = this.elements.buttons.download;
                        g.element(e) && e.setAttribute("href", this.download)
                    },
                    create: function (s) {
                        var a = this,
                            e = k("div", x(this.config.selectors.controls.wrapper));
                        if (this.config.controls.includes("restart") && e.appendChild(ae.createButton.call(this, "restart")), this.config.controls.includes("rewind") && e.appendChild(ae.createButton.call(this, "rewind")), this.config.controls.includes("play") && e.appendChild(ae.createButton.call(this, "play")), this.config.controls.includes("fast-forward") && e.appendChild(ae.createButton.call(this, "fast-forward")), this.config.controls.includes("progress")) {
                            var t = k("div", x(this.config.selectors.progress));
                            if (t.appendChild(ae.createRange.call(this, "seek", {
                                    id: "plyr-seek-".concat(s.id)
                                })), t.appendChild(ae.createProgress.call(this, "buffer")), this.config.tooltips.seek) {
                                var n = k("span", {
                                    class: this.config.classNames.tooltip
                                }, "00:00");
                                t.appendChild(n), this.elements.display.seekTooltip = n
                            }
                            this.elements.progress = t, e.appendChild(this.elements.progress)
                        }
                        if (this.config.controls.includes("current-time") && e.appendChild(ae.createTime.call(this, "currentTime")), this.config.controls.includes("duration") && e.appendChild(ae.createTime.call(this, "duration")), this.config.controls.includes("mute") || this.config.controls.includes("volume")) {
                            var i = k("div", {
                                class: "plyr__volume"
                            });
                            if (this.config.controls.includes("mute") && i.appendChild(ae.createButton.call(this, "mute")), this.config.controls.includes("volume")) {
                                var o = {
                                    max: 1,
                                    step: .05,
                                    value: this.config.volume
                                };
                                i.appendChild(ae.createRange.call(this, "volume", Z(o, {
                                    id: "plyr-volume-".concat(s.id)
                                }))), this.elements.volume = i
                            }
                            e.appendChild(i)
                        }
                        if (this.config.controls.includes("captions") && e.appendChild(ae.createButton.call(this, "captions")), this.config.controls.includes("settings") && !g.empty(this.config.settings)) {
                            var r = k("div", {
                                class: "plyr__menu",
                                hidden: ""
                            });
                            r.appendChild(ae.createButton.call(this, "settings", {
                                "aria-haspopup": !0,
                                "aria-controls": "plyr-settings-".concat(s.id),
                                "aria-expanded": !1
                            }));
                            var l = k("div", {
                                    class: "plyr__menu__container",
                                    id: "plyr-settings-".concat(s.id),
                                    hidden: ""
                                }),
                                c = k("div"),
                                u = k("div", {
                                    id: "plyr-settings-".concat(s.id, "-home")
                                }),
                                d = k("div", {
                                    role: "menu"
                                });
                            u.appendChild(d), c.appendChild(u), this.elements.settings.panels.home = u, this.config.settings.forEach(function (e) {
                                var t = k("button", Z(x(a.config.selectors.buttons.settings), {
                                    type: "button",
                                    class: "".concat(a.config.classNames.control, " ").concat(a.config.classNames.control, "--forward"),
                                    role: "menuitem",
                                    "aria-haspopup": !0,
                                    hidden: ""
                                }));
                                ae.bindMenuItemShortcuts.call(a, t, e), f(t, "click", function () {
                                    ae.showMenuPanel.call(a, e, !1)
                                });
                                var n = k("span", null, J(e, a.config)),
                                    i = k("span", {
                                        class: a.config.classNames.menu.value
                                    });
                                i.innerHTML = s[e], n.appendChild(i), t.appendChild(n), d.appendChild(t);
                                var o = k("div", {
                                        id: "plyr-settings-".concat(s.id, "-").concat(e),
                                        hidden: ""
                                    }),
                                    r = k("button", {
                                        type: "button",
                                        class: "".concat(a.config.classNames.control, " ").concat(a.config.classNames.control, "--back")
                                    });
                                r.appendChild(k("span", {
                                    "aria-hidden": !0
                                }, J(e, a.config))), r.appendChild(k("span", {
                                    class: a.config.classNames.hidden
                                }, J("menuBack", a.config))), f(o, "keydown", function (e) {
                                    37 === e.which && (e.preventDefault(), e.stopPropagation(), ae.showMenuPanel.call(a, "home", !0))
                                }, !1), f(r, "click", function () {
                                    ae.showMenuPanel.call(a, "home", !1)
                                }), o.appendChild(r), o.appendChild(k("div", {
                                    role: "menu"
                                })), c.appendChild(o), a.elements.settings.buttons[e] = t, a.elements.settings.panels[e] = o
                            }), l.appendChild(c), r.appendChild(l), e.appendChild(r), this.elements.settings.popup = l, this.elements.settings.menu = r
                        }
                        if (this.config.controls.includes("pip") && W.pip && e.appendChild(ae.createButton.call(this, "pip")), this.config.controls.includes("airplay") && W.airplay && e.appendChild(ae.createButton.call(this, "airplay")), this.config.controls.includes("download")) {
                            var h = {
                                    element: "a",
                                    href: this.download,
                                    target: "_blank"
                                },
                                p = this.config.urls.download;
                            !g.url(p) && this.isEmbed && Z(h, {
                                icon: "logo-".concat(this.provider),
                                label: this.provider
                            }), e.appendChild(ae.createButton.call(this, "download", h))
                        }
                        return this.config.controls.includes("fullscreen") && e.appendChild(ae.createButton.call(this, "fullscreen")), this.config.controls.includes("play-large") && this.elements.container.appendChild(ae.createButton.call(this, "play-large")), this.elements.controls = e, this.isHTML5 && ae.setQualityMenu.call(this, V.getQualityOptions.call(this)), ae.setSpeedMenu.call(this), e
                    },
                    inject: function () {
                        var i = this;
                        if (this.config.loadSprite) {
                            var e = ae.getIconUrl.call(this);
                            e.cors && ne(e.url, "sprite-plyr")
                        }
                        this.id = Math.floor(1e4 * Math.random());
                        var t = null;
                        this.elements.controls = null;
                        var n = {
                                id: this.id,
                                seektime: this.config.seekTime,
                                title: this.config.title
                            },
                            o = !0;
                        g.function(this.config.controls) && (this.config.controls = this.config.controls.call(this.props)), this.config.controls || (this.config.controls = []), g.element(this.config.controls) || g.string(this.config.controls) ? t = this.config.controls : (t = ae.create.call(this, {
                            id: this.id,
                            seektime: this.config.seekTime,
                            speed: this.speed,
                            quality: this.quality,
                            captions: ue.getLabel.call(this)
                        }), o = !1);
                        var r, s = function (e) {
                            var o = e;
                            return Object.entries(n).forEach(function (e) {
                                var t = m(e, 2),
                                    n = t[0],
                                    i = t[1];
                                o = Y(o, "{".concat(n, "}"), i)
                            }), o
                        };
                        if (o && (g.string(this.config.controls) ? t = s(t) : g.element(t) && (t.innerHTML = s(t.innerHTML))), g.string(this.config.selectors.controls.container) && (r = document.querySelector(this.config.selectors.controls.container)), g.element(r) || (r = this.elements.container), r[g.element(t) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", t), g.element(this.elements.controls) || ae.findElements.call(this), !g.empty(this.elements.buttons)) {
                            var a = function (t) {
                                var n = i.config.classNames.controlPressed;
                                Object.defineProperty(t, "pressed", {
                                    enumerable: !0,
                                    get: function () {
                                        return D(t, n)
                                    },
                                    set: function () {
                                        var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                                        P(t, n, e)
                                    }
                                })
                            };
                            Object.values(this.elements.buttons).filter(Boolean).forEach(function (e) {
                                g.array(e) || g.nodeList(e) ? Array.from(e).filter(Boolean).forEach(a) : a(e)
                            })
                        }
                        if (window.navigator.userAgent.includes("Edge") && B(r), this.config.tooltips.controls) {
                            var l = this.config,
                                c = l.classNames,
                                u = l.selectors,
                                d = "".concat(u.controls.wrapper, " ").concat(u.labels, " .").concat(c.hidden),
                                h = M.call(this, d);
                            Array.from(h).forEach(function (e) {
                                P(e, i.config.classNames.hidden, !1), P(e, i.config.classNames.tooltip, !0)
                            })
                        }
                    }
                };

                function le(e) {
                    var t = e;
                    if (!(1 < arguments.length && void 0 !== arguments[1]) || arguments[1]) {
                        var n = document.createElement("a");
                        n.href = t, t = n.href
                    }
                    try {
                        return new URL(t)
                    } catch (e) {
                        return null
                    }
                }

                function ce(e) {
                    var o = new URLSearchParams;
                    return g.object(e) && Object.entries(e).forEach(function (e) {
                        var t = m(e, 2),
                            n = t[0],
                            i = t[1];
                        o.set(n, i)
                    }), o
                }
                var ue = {
                        setup: function () {
                            if (this.supported.ui)
                                if (!this.isVideo || this.isYouTube || this.isHTML5 && !W.textTracks) g.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && ae.setCaptionsMenu.call(this);
                                else {
                                    var e, t;
                                    if (g.element(this.elements.captions) || (this.elements.captions = k("div", x(this.config.selectors.captions)), e = this.elements.captions, t = this.elements.wrapper, g.element(e) && g.element(t) && t.parentNode.insertBefore(e, t.nextSibling)), z.isIE && window.URL) {
                                        var n = this.media.querySelectorAll("track");
                                        Array.from(n).forEach(function (t) {
                                            var e = t.getAttribute("src"),
                                                n = le(e);
                                            null !== n && n.hostname !== window.location.href.hostname && ["http:", "https:"].includes(n.protocol) && te(e, "blob").then(function (e) {
                                                t.setAttribute("src", window.URL.createObjectURL(e))
                                            }).catch(function () {
                                                A(t)
                                            })
                                        })
                                    }
                                    var i = U((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(function (e) {
                                            return e.split("-")[0]
                                        })),
                                        o = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
                                    "auto" === o && (o = m(i, 1)[0]);
                                    var r = this.storage.get("captions");
                                    if (g.boolean(r) || (r = this.config.captions.active), Object.assign(this.captions, {
                                            toggled: !1,
                                            active: r,
                                            language: o,
                                            languages: i
                                        }), this.isHTML5) {
                                        var s = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                                        f.call(this, this.media.textTracks, s, ue.update.bind(this))
                                    }
                                    setTimeout(ue.update.bind(this), 0)
                                }
                        },
                        update: function () {
                            var t = this,
                                e = ue.getTracks.call(this, !0),
                                n = this.captions,
                                i = n.active,
                                o = n.language,
                                r = n.meta,
                                s = n.currentTrackNode,
                                a = Boolean(e.find(function (e) {
                                    return e.language === o
                                }));
                            this.isHTML5 && this.isVideo && e.filter(function (e) {
                                return !r.get(e)
                            }).forEach(function (e) {
                                t.debug.log("Track added", e), r.set(e, {
                                    default: "showing" === e.mode
                                }), e.mode = "hidden", f.call(t, e, "cuechange", function () {
                                    return ue.updateCues.call(t)
                                })
                            }), (a && this.language !== o || !e.includes(s)) && (ue.setLanguage.call(this, o), ue.toggle.call(this, i && a)), P(this.elements.container, this.config.classNames.captions.enabled, !g.empty(e)), (this.config.controls || []).includes("settings") && this.config.settings.includes("captions") && ae.setCaptionsMenu.call(this)
                        },
                        toggle: function (e) {
                            var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
                            if (this.supported.ui) {
                                var n = this.captions.toggled,
                                    i = this.config.classNames.captions.active,
                                    o = g.nullOrUndefined(e) ? !n : e;
                                if (o !== n) {
                                    if (t || (this.captions.active = o, this.storage.set({
                                            captions: o
                                        })), !this.language && o && !t) {
                                        var r = ue.getTracks.call(this),
                                            s = ue.findTrack.call(this, [this.captions.language].concat(function (e) {
                                                return function (e) {
                                                    if (Array.isArray(e)) {
                                                        for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                                                        return n
                                                    }
                                                }(e) || function (e) {
                                                    if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
                                                }(e) || function () {
                                                    throw new TypeError("Invalid attempt to spread non-iterable instance")
                                                }()
                                            }(this.captions.languages)), !0);
                                        return this.captions.language = s.language, void ue.set.call(this, r.indexOf(s))
                                    }
                                    this.elements.buttons.captions && (this.elements.buttons.captions.pressed = o), P(this.elements.container, i, o), this.captions.toggled = o, ae.updateSetting.call(this, "captions"), b.call(this, this.media, o ? "captionsenabled" : "captionsdisabled")
                                }
                            }
                        },
                        set: function (e) {
                            var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
                                n = ue.getTracks.call(this);
                            if (-1 !== e)
                                if (g.number(e))
                                    if (e in n) {
                                        if (this.captions.currentTrack !== e) {
                                            this.captions.currentTrack = e;
                                            var i = n[e],
                                                o = (i || {}).language;
                                            this.captions.currentTrackNode = i, ae.updateSetting.call(this, "captions"), t || (this.captions.language = o, this.storage.set({
                                                language: o
                                            })), this.isVimeo && this.embed.enableTextTrack(o), b.call(this, this.media, "languagechange")
                                        }
                                        ue.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && ue.updateCues.call(this)
                                    } else this.debug.warn("Track not found", e);
                            else this.debug.warn("Invalid caption argument", e);
                            else ue.toggle.call(this, !1, t)
                        },
                        setLanguage: function (e) {
                            var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
                            if (g.string(e)) {
                                var n = e.toLowerCase();
                                this.captions.language = n;
                                var i = ue.getTracks.call(this),
                                    o = ue.findTrack.call(this, [n]);
                                ue.set.call(this, i.indexOf(o), t)
                            } else this.debug.warn("Invalid language argument", e)
                        },
                        getTracks: function () {
                            var t = this,
                                n = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                            return Array.from((this.media || {}).textTracks || []).filter(function (e) {
                                return !t.isHTML5 || n || t.captions.meta.has(e)
                            }).filter(function (e) {
                                return ["captions", "subtitles"].includes(e.kind)
                            })
                        },
                        findTrack: function (e) {
                            var n, t = this,
                                i = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                                o = ue.getTracks.call(this),
                                r = function (e) {
                                    return Number((t.captions.meta.get(e) || {}).default)
                                },
                                s = Array.from(o).sort(function (e, t) {
                                    return r(t) - r(e)
                                });
                            return e.every(function (t) {
                                return !(n = s.find(function (e) {
                                    return e.language === t
                                }))
                            }), n || (i ? s[0] : void 0)
                        },
                        getCurrentTrack: function () {
                            return ue.getTracks.call(this)[this.currentTrack]
                        },
                        getLabel: function (e) {
                            var t = e;
                            return !g.track(t) && W.textTracks && this.captions.toggled && (t = ue.getCurrentTrack.call(this)), g.track(t) ? g.empty(t.label) ? g.empty(t.language) ? J("enabled", this.config) : e.language.toUpperCase() : t.label : J("disabled", this.config)
                        },
                        updateCues: function (e) {
                            if (this.supported.ui)
                                if (g.element(this.elements.captions))
                                    if (g.nullOrUndefined(e) || Array.isArray(e)) {
                                        var t = e;
                                        if (!t) {
                                            var n = ue.getCurrentTrack.call(this);
                                            t = Array.from((n || {}).activeCues || []).map(function (e) {
                                                return e.getCueAsHTML()
                                            }).map($)
                                        }
                                        var i = t.map(function (e) {
                                            return e.trim()
                                        }).join("\n");
                                        if (i !== this.elements.captions.innerHTML) {
                                            T(this.elements.captions);
                                            var o = k("span", x(this.config.selectors.caption));
                                            o.innerHTML = i, this.elements.captions.appendChild(o), b.call(this, this.media, "cuechange")
                                        }
                                    } else this.debug.warn("updateCues: Invalid input", e);
                            else this.debug.warn("No captions element to render to")
                        }
                    },
                    de = {
                        enabled: !0,
                        title: "",
                        debug: !1,
                        autoplay: !1,
                        autopause: !0,
                        playsinline: !0,
                        seekTime: 10,
                        volume: 1,
                        muted: !1,
                        duration: null,
                        displayDuration: !0,
                        invertTime: !0,
                        toggleInvert: !0,
                        ratio: "16:9",
                        clickToPlay: !0,
                        hideControls: !0,
                        resetOnEnd: !1,
                        disableContextMenu: !0,
                        loadSprite: !0,
                        iconPrefix: "plyr",
                        iconUrl: "https://cdn.plyr.io/3.4.7/plyr.svg",
                        blankVideo: "https://cdn.plyr.io/static/blank.mp4",
                        quality: {
                            default: 576,
                            options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
                        },
                        loop: {
                            active: !1
                        },
                        speed: {
                            selected: 1,
                            options: [.5, .75, 1, 1.25, 1.5, 1.75, 2]
                        },
                        keyboard: {
                            focused: !0,
                            global: !1
                        },
                        tooltips: {
                            controls: !1,
                            seek: !0
                        },
                        captions: {
                            active: !1,
                            language: "auto",
                            update: !1
                        },
                        fullscreen: {
                            enabled: !0,
                            fallback: !0,
                            iosNative: !1
                        },
                        storage: {
                            enabled: !0,
                            key: "plyr"
                        },
                        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
                        settings: ["captions", "quality", "speed"],
                        i18n: {
                            restart: "Restart",
                            rewind: "Rewind {seektime}s",
                            play: "Play",
                            pause: "Pause",
                            fastForward: "Forward {seektime}s",
                            seek: "Seek",
                            seekLabel: "{currentTime} of {duration}",
                            played: "Played",
                            buffered: "Buffered",
                            currentTime: "Current time",
                            duration: "Duration",
                            volume: "Volume",
                            mute: "Mute",
                            unmute: "Unmute",
                            enableCaptions: "Enable captions",
                            disableCaptions: "Disable captions",
                            download: "Download",
                            enterFullscreen: "Enter fullscreen",
                            exitFullscreen: "Exit fullscreen",
                            frameTitle: "Player for {title}",
                            captions: "Captions",
                            settings: "Settings",
                            menuBack: "Go back to previous menu",
                            speed: "Speed",
                            normal: "Normal",
                            quality: "Quality",
                            loop: "Loop",
                            start: "Start",
                            end: "End",
                            all: "All",
                            reset: "Reset",
                            disabled: "Disabled",
                            enabled: "Enabled",
                            advertisement: "Ad",
                            qualityBadge: {
                                2160: "4K",
                                1440: "HD",
                                1080: "HD",
                                720: "HD",
                                576: "SD",
                                480: "SD"
                            }
                        },
                        urls: {
                            download: null,
                            vimeo: {
                                sdk: "https://player.vimeo.com/api/player.js",
                                iframe: "https://player.vimeo.com/video/{0}?{1}",
                                api: "https://vimeo.com/api/v2/video/{0}.json"
                            },
                            youtube: {
                                sdk: "https://www.youtube.com/iframe_api",
                                api: "https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet"
                            },
                            googleIMA: {
                                sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
                            }
                        },
                        listeners: {
                            seek: null,
                            play: null,
                            pause: null,
                            restart: null,
                            rewind: null,
                            fastForward: null,
                            mute: null,
                            volume: null,
                            captions: null,
                            download: null,
                            fullscreen: null,
                            pip: null,
                            airplay: null,
                            speed: null,
                            quality: null,
                            loop: null,
                            language: null
                        },
                        events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
                        selectors: {
                            editable: "input, textarea, select, [contenteditable]",
                            container: ".plyr",
                            controls: {
                                container: null,
                                wrapper: ".plyr__controls"
                            },
                            labels: "[data-plyr]",
                            buttons: {
                                play: '[data-plyr="play"]',
                                pause: '[data-plyr="pause"]',
                                restart: '[data-plyr="restart"]',
                                rewind: '[data-plyr="rewind"]',
                                fastForward: '[data-plyr="fast-forward"]',
                                mute: '[data-plyr="mute"]',
                                captions: '[data-plyr="captions"]',
                                download: '[data-plyr="download"]',
                                fullscreen: '[data-plyr="fullscreen"]',
                                pip: '[data-plyr="pip"]',
                                airplay: '[data-plyr="airplay"]',
                                settings: '[data-plyr="settings"]',
                                loop: '[data-plyr="loop"]'
                            },
                            inputs: {
                                seek: '[data-plyr="seek"]',
                                volume: '[data-plyr="volume"]',
                                speed: '[data-plyr="speed"]',
                                language: '[data-plyr="language"]',
                                quality: '[data-plyr="quality"]'
                            },
                            display: {
                                currentTime: ".plyr__time--current",
                                duration: ".plyr__time--duration",
                                buffer: ".plyr__progress__buffer",
                                loop: ".plyr__progress__loop",
                                volume: ".plyr__volume--display"
                            },
                            progress: ".plyr__progress",
                            captions: ".plyr__captions",
                            caption: ".plyr__caption",
                            menu: {
                                quality: ".js-plyr__menu__list--quality"
                            }
                        },
                        classNames: {
                            type: "plyr--{0}",
                            provider: "plyr--{0}",
                            video: "plyr__video-wrapper",
                            embed: "plyr__video-embed",
                            embedContainer: "plyr__video-embed__container",
                            poster: "plyr__poster",
                            posterEnabled: "plyr__poster-enabled",
                            ads: "plyr__ads",
                            control: "plyr__control",
                            controlPressed: "plyr__control--pressed",
                            playing: "plyr--playing",
                            paused: "plyr--paused",
                            stopped: "plyr--stopped",
                            loading: "plyr--loading",
                            hover: "plyr--hover",
                            tooltip: "plyr__tooltip",
                            cues: "plyr__cues",
                            hidden: "plyr__sr-only",
                            hideControls: "plyr--hide-controls",
                            isIos: "plyr--is-ios",
                            isTouch: "plyr--is-touch",
                            uiSupported: "plyr--full-ui",
                            noTransition: "plyr--no-transition",
                            display: {
                                time: "plyr__time"
                            },
                            menu: {
                                value: "plyr__menu__value",
                                badge: "plyr__badge",
                                open: "plyr--menu-open"
                            },
                            captions: {
                                enabled: "plyr--captions-enabled",
                                active: "plyr--captions-active"
                            },
                            fullscreen: {
                                enabled: "plyr--fullscreen-enabled",
                                fallback: "plyr--fullscreen-fallback"
                            },
                            pip: {
                                supported: "plyr--pip-supported",
                                active: "plyr--pip-active"
                            },
                            airplay: {
                                supported: "plyr--airplay-supported",
                                active: "plyr--airplay-active"
                            },
                            tabFocus: "plyr__tab-focus"
                        },
                        attributes: {
                            embed: {
                                provider: "data-plyr-provider",
                                id: "data-plyr-embed-id"
                            }
                        },
                        keys: {
                            google: null
                        },
                        ads: {
                            enabled: !1,
                            publisherId: ""
                        }
                    },
                    he = "picture-in-picture",
                    pe = {
                        html5: "html5",
                        youtube: "youtube",
                        vimeo: "vimeo"
                    },
                    fe = {
                        audio: "audio",
                        video: "video"
                    },
                    me = function () {},
                    ge = function () {
                        function t() {
                            var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                            c(this, t), this.enabled = window.console && e, this.enabled && this.log("Debugging enabled")
                        }
                        return e(t, [{
                            key: "log",
                            get: function () {
                                return this.enabled ? Function.prototype.bind.call(console.log, console) : me
                            }
                        }, {
                            key: "warn",
                            get: function () {
                                return this.enabled ? Function.prototype.bind.call(console.warn, console) : me
                            }
                        }, {
                            key: "error",
                            get: function () {
                                return this.enabled ? Function.prototype.bind.call(console.error, console) : me
                            }
                        }]), t
                    }();

                function ve() {
                    if (this.enabled) {
                        var e = this.player.elements.buttons.fullscreen;
                        g.element(e) && (e.pressed = this.active), b.call(this.player, this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0), z.isIos || function () {
                            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
                                t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                            if (g.element(e)) {
                                var n = M.call(this, "button:not(:disabled), input:not(:disabled), [tabindex]"),
                                    i = n[0],
                                    o = n[n.length - 1];
                                p.call(this, this.elements.container, "keydown", function (e) {
                                    if ("Tab" === e.key && 9 === e.keyCode) {
                                        var t = document.activeElement;
                                        t !== o || e.shiftKey ? t === i && e.shiftKey && (o.focus(), e.preventDefault()) : (i.focus(), e.preventDefault())
                                    }
                                }, t, !1)
                            }
                        }.call(this.player, this.target, this.active)
                    }
                }

                function ye() {
                    var e = this,
                        t = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                    if (t ? this.scrollPosition = {
                            x: window.scrollX || 0,
                            y: window.scrollY || 0
                        } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = t ? "hidden" : "", P(this.target, this.player.config.classNames.fullscreen.fallback, t), z.isIos) {
                        var n = document.head.querySelector('meta[name="viewport"]'),
                            i = "viewport-fit=cover";
                        n || (n = document.createElement("meta")).setAttribute("name", "viewport");
                        var o = g.string(n.content) && n.content.includes(i);
                        t ? (this.cleanupViewport = !o, o || (n.content += ",".concat(i))) : this.cleanupViewport && (n.content = n.content.split(",").filter(function (e) {
                            return e.trim() !== i
                        }).join(",")), setTimeout(function () {
                            return B(e.target)
                        }, 100)
                    }
                    ve.call(this)
                }
                var be = function () {
                    function n(e) {
                        var t = this;
                        c(this, n), this.player = e, this.prefix = n.prefix, this.property = n.property, this.scrollPosition = {
                            x: 0,
                            y: 0
                        }, f.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), function () {
                            ve.call(t)
                        }), f.call(this.player, this.player.elements.container, "dblclick", function (e) {
                            g.element(t.player.elements.controls) && t.player.elements.controls.contains(e.target) || t.toggle()
                        }), this.update()
                    }
                    return e(n, [{
                        key: "update",
                        value: function () {
                            this.enabled ? this.player.debug.log("".concat(n.native ? "Native" : "Fallback", " fullscreen enabled")) : this.player.debug.log("Fullscreen not supported and fallback disabled"), P(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
                        }
                    }, {
                        key: "enter",
                        value: function () {
                            this.enabled && (z.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : n.native ? this.prefix ? g.empty(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen() : ye.call(this, !0))
                        }
                    }, {
                        key: "exit",
                        value: function () {
                            if (this.enabled)
                                if (z.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), this.player.play();
                                else if (n.native)
                                if (this.prefix) {
                                    if (!g.empty(this.prefix)) {
                                        var e = "moz" === this.prefix ? "Cancel" : "Exit";
                                        document["".concat(this.prefix).concat(e).concat(this.property)]()
                                    }
                                } else(document.cancelFullScreen || document.exitFullscreen).call(document);
                            else ye.call(this, !1)
                        }
                    }, {
                        key: "toggle",
                        value: function () {
                            this.active ? this.exit() : this.enter()
                        }
                    }, {
                        key: "enabled",
                        get: function () {
                            return (n.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
                        }
                    }, {
                        key: "active",
                        get: function () {
                            return !!this.enabled && (n.native ? (this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement) === this.target : D(this.target, this.player.config.classNames.fullscreen.fallback))
                        }
                    }, {
                        key: "target",
                        get: function () {
                            return z.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container
                        }
                    }], [{
                        key: "native",
                        get: function () {
                            return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
                        }
                    }, {
                        key: "prefix",
                        get: function () {
                            if (g.function(document.exitFullscreen)) return "";
                            var t = "";
                            return ["webkit", "moz", "ms"].some(function (e) {
                                return !(!g.function(document["".concat(e, "ExitFullscreen")]) && !g.function(document["".concat(e, "CancelFullScreen")]) || (t = e, 0))
                            }), t
                        }
                    }, {
                        key: "property",
                        get: function () {
                            return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
                        }
                    }]), n
                }();

                function _e(o) {
                    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
                    return new Promise(function (e, t) {
                        var n = new Image,
                            i = function () {
                                delete n.onload, delete n.onerror, (n.naturalWidth >= r ? e : t)(n)
                            };
                        Object.assign(n, {
                            onload: i,
                            onerror: i,
                            src: o
                        })
                    })
                }
                var we = {
                        addStyleHook: function () {
                            P(this.elements.container, this.config.selectors.container.replace(".", ""), !0), P(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
                        },
                        toggleNativeControls: function () {
                            0 < arguments.length && void 0 !== arguments[0] && arguments[0] && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
                        },
                        build: function () {
                            var e = this;
                            if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void we.toggleNativeControls.call(this, !0);
                            g.element(this.elements.controls) || (ae.inject.call(this), this.listeners.controls()), we.toggleNativeControls.call(this), this.isHTML5 && ue.setup.call(this), this.volume = null, this.muted = null, this.speed = null, this.loop = null, this.quality = null, ae.updateVolume.call(this), ae.timeUpdate.call(this), we.checkPlaying.call(this), P(this.elements.container, this.config.classNames.pip.supported, W.pip && this.isHTML5 && this.isVideo), P(this.elements.container, this.config.classNames.airplay.supported, W.airplay && this.isHTML5), P(this.elements.container, this.config.classNames.isIos, z.isIos), P(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(function () {
                                b.call(e, e.media, "ready")
                            }, 0), we.setTitle.call(this), this.poster && we.setPoster.call(this, this.poster, !1).catch(function () {}), this.config.duration && ae.durationUpdate.call(this)
                        },
                        setTitle: function () {
                            var t = J("play", this.config);
                            if (g.string(this.config.title) && !g.empty(this.config.title) && (t += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(function (e) {
                                    e.setAttribute("aria-label", t)
                                }), this.isEmbed) {
                                var e = I.call(this, "iframe");
                                if (!g.element(e)) return;
                                var n = g.empty(this.config.title) ? "video" : this.config.title,
                                    i = J("frameTitle", this.config);
                                e.setAttribute("title", i.replace("{title}", n))
                            }
                        },
                        togglePoster: function (e) {
                            P(this.elements.container, this.config.classNames.posterEnabled, e)
                        },
                        setPoster: function (t) {
                            var n = this;
                            return 1 < arguments.length && void 0 !== arguments[1] && !arguments[1] || !this.poster ? (this.media.setAttribute("poster", t), function () {
                                var t = this;
                                return new Promise(function (e) {
                                    return t.ready ? setTimeout(e, 0) : f.call(t, t.elements.container, "ready", e)
                                }).then(function () {})
                            }.call(this).then(function () {
                                return _e(t)
                            }).catch(function (e) {
                                throw t === n.poster && we.togglePoster.call(n, !1), e
                            }).then(function () {
                                if (t !== n.poster) throw new Error("setPoster cancelled by later call to setPoster")
                            }).then(function () {
                                return Object.assign(n.elements.poster.style, {
                                    backgroundImage: "url('".concat(t, "')"),
                                    backgroundSize: ""
                                }), we.togglePoster.call(n, !0), t
                            })) : Promise.reject(new Error("Poster already set"))
                        },
                        checkPlaying: function (e) {
                            var t = this;
                            P(this.elements.container, this.config.classNames.playing, this.playing), P(this.elements.container, this.config.classNames.paused, this.paused), P(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function (e) {
                                e.pressed = t.playing
                            }), g.event(e) && "timeupdate" === e.type || we.toggleControls.call(this)
                        },
                        checkLoading: function (e) {
                            var t = this;
                            this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function () {
                                P(t.elements.container, t.config.classNames.loading, t.loading), we.toggleControls.call(t)
                            }, this.loading ? 250 : 0)
                        },
                        toggleControls: function (e) {
                            var t = this.elements.controls;
                            if (t && this.config.hideControls) {
                                var n = this.touch && this.lastSeekTime + 2e3 > Date.now();
                                this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || n))
                            }
                        }
                    },
                    ke = function () {
                        function t(e) {
                            c(this, t), this.player = e, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this)
                        }
                        return e(t, [{
                            key: "handleKey",
                            value: function (e) {
                                var t = this.player,
                                    n = t.elements,
                                    i = e.keyCode ? e.keyCode : e.which,
                                    o = "keydown" === e.type,
                                    r = o && i === this.lastKey;
                                if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && g.number(i))
                                    if (o) {
                                        var s = document.activeElement;
                                        if (g.element(s)) {
                                            var a = t.config.selectors.editable;
                                            if (s !== n.inputs.seek && L(s, a)) return;
                                            if (32 === e.which && L(s, 'button, [role^="menuitem"]')) return
                                        }
                                        switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(i) && (e.preventDefault(), e.stopPropagation()), i) {
                                            case 48:
                                            case 49:
                                            case 50:
                                            case 51:
                                            case 52:
                                            case 53:
                                            case 54:
                                            case 55:
                                            case 56:
                                            case 57:
                                                r || (t.currentTime = t.duration / 10 * (i - 48));
                                                break;
                                            case 32:
                                            case 75:
                                                r || t.togglePlay();
                                                break;
                                            case 38:
                                                t.increaseVolume(.1);
                                                break;
                                            case 40:
                                                t.decreaseVolume(.1);
                                                break;
                                            case 77:
                                                r || (t.muted = !t.muted);
                                                break;
                                            case 39:
                                                t.forward();
                                                break;
                                            case 37:
                                                t.rewind();
                                                break;
                                            case 70:
                                                t.fullscreen.toggle();
                                                break;
                                            case 67:
                                                r || t.toggleCaptions();
                                                break;
                                            case 76:
                                                t.loop = !t.loop
                                        }!t.fullscreen.enabled && t.fullscreen.active && 27 === i && t.fullscreen.toggle(), this.lastKey = i
                                    } else this.lastKey = null
                            }
                        }, {
                            key: "toggleMenu",
                            value: function (e) {
                                ae.toggleMenu.call(this.player, e)
                            }
                        }, {
                            key: "firstTouch",
                            value: function () {
                                var e = this.player,
                                    t = e.elements;
                                e.touch = !0, P(t.container, e.config.classNames.isTouch, !0)
                            }
                        }, {
                            key: "setTabFocus",
                            value: function (e) {
                                var t = this.player,
                                    n = t.elements;
                                if (clearTimeout(this.focusTimer), "keydown" !== e.type || 9 === e.which) {
                                    "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
                                    var i, o = e.timeStamp - this.lastKeyDown <= 20;
                                    ("focus" !== e.type || o) && (i = t.config.classNames.tabFocus, P(M.call(t, ".".concat(i)), i, !1), this.focusTimer = setTimeout(function () {
                                        var e = document.activeElement;
                                        n.container.contains(e) && P(document.activeElement, t.config.classNames.tabFocus, !0)
                                    }, 10))
                                }
                            }
                        }, {
                            key: "global",
                            value: function () {
                                var e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0],
                                    t = this.player;
                                t.config.keyboard.global && p.call(t, window, "keydown keyup", this.handleKey, e, !1), p.call(t, document.body, "click", this.toggleMenu, e), y.call(t, document.body, "touchstart", this.firstTouch), p.call(t, document.body, "keydown focus blur", this.setTabFocus, e, !1, !0)
                            }
                        }, {
                            key: "container",
                            value: function () {
                                var i = this.player,
                                    o = i.elements;
                                !i.config.keyboard.global && i.config.keyboard.focused && f.call(i, o.container, "keydown keyup", this.handleKey, !1), f.call(i, o.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function (e) {
                                    var t = o.controls;
                                    t && "enterfullscreen" === e.type && (t.pressed = !1, t.hover = !1);
                                    var n = 0;
                                    ["touchstart", "touchmove", "mousemove"].includes(e.type) && (we.toggleControls.call(i, !0), n = i.touch ? 3e3 : 2e3), clearTimeout(i.timers.controls), i.timers.controls = setTimeout(function () {
                                        return we.toggleControls.call(i, !1)
                                    }, n)
                                })
                            }
                        }, {
                            key: "media",
                            value: function () {
                                var i = this.player,
                                    o = i.elements;
                                if (f.call(i, i.media, "timeupdate seeking seeked", function (e) {
                                        return ae.timeUpdate.call(i, e)
                                    }), f.call(i, i.media, "durationchange loadeddata loadedmetadata", function (e) {
                                        return ae.durationUpdate.call(i, e)
                                    }), f.call(i, i.media, "canplay loadeddata", function () {
                                        C(o.volume, !i.hasAudio), C(o.buttons.mute, !i.hasAudio)
                                    }), f.call(i, i.media, "ended", function () {
                                        i.isHTML5 && i.isVideo && i.config.resetOnEnd && i.restart()
                                    }), f.call(i, i.media, "progress playing seeking seeked", function (e) {
                                        return ae.updateProgress.call(i, e)
                                    }), f.call(i, i.media, "volumechange", function (e) {
                                        return ae.updateVolume.call(i, e)
                                    }), f.call(i, i.media, "playing play pause ended emptied timeupdate", function (e) {
                                        return we.checkPlaying.call(i, e)
                                    }), f.call(i, i.media, "waiting canplay seeked playing", function (e) {
                                        return we.checkLoading.call(i, e)
                                    }), f.call(i, i.media, "playing", function () {
                                        i.ads && i.ads.enabled && !i.ads.initialized && i.ads.managerPromise.then(function () {
                                            return i.ads.play()
                                        }).catch(function () {
                                            return i.play()
                                        })
                                    }), i.supported.ui && i.config.clickToPlay && !i.isAudio) {
                                    var t = I.call(i, ".".concat(i.config.classNames.video));
                                    if (!g.element(t)) return;
                                    f.call(i, o.container, "click", function (e) {
                                        ([o.container, t].includes(e.target) || t.contains(e.target)) && (i.touch && i.config.hideControls || (i.ended ? (i.restart(), i.play()) : i.togglePlay()))
                                    })
                                }
                                i.supported.ui && i.config.disableContextMenu && f.call(i, o.wrapper, "contextmenu", function (e) {
                                    e.preventDefault()
                                }, !1), f.call(i, i.media, "volumechange", function () {
                                    i.storage.set({
                                        volume: i.volume,
                                        muted: i.muted
                                    })
                                }), f.call(i, i.media, "ratechange", function () {
                                    ae.updateSetting.call(i, "speed"), i.storage.set({
                                        speed: i.speed
                                    })
                                }), f.call(i, i.media, "qualitychange", function (e) {
                                    ae.updateSetting.call(i, "quality", null, e.detail.quality)
                                }), f.call(i, i.media, "ready qualitychange", function () {
                                    ae.setDownloadLink.call(i)
                                });
                                var e = i.config.events.concat(["keyup", "keydown"]).join(" ");
                                f.call(i, i.media, e, function (e) {
                                    var t = e.detail,
                                        n = void 0 === t ? {} : t;
                                    "error" === e.type && (n = i.media.error), b.call(i, o.container, e.type, !0, n)
                                })
                            }
                        }, {
                            key: "proxy",
                            value: function (e, t, n) {
                                var i = this.player,
                                    o = i.config.listeners[n],
                                    r = !0;
                                g.function(o) && (r = o.call(i, e)), r && g.function(t) && t.call(i, e)
                            }
                        }, {
                            key: "bind",
                            value: function (e, t, n, i) {
                                var o = this,
                                    r = !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4],
                                    s = this.player,
                                    a = s.config.listeners[i],
                                    l = g.function(a);
                                f.call(s, e, t, function (e) {
                                    return o.proxy(e, n, i)
                                }, r && !l)
                            }
                        }, {
                            key: "controls",
                            value: function () {
                                var o = this,
                                    a = this.player,
                                    i = a.elements,
                                    t = z.isIE ? "change" : "input";
                                if (i.buttons.play && Array.from(i.buttons.play).forEach(function (e) {
                                        o.bind(e, "click", a.togglePlay, "play")
                                    }), this.bind(i.buttons.restart, "click", a.restart, "restart"), this.bind(i.buttons.rewind, "click", a.rewind, "rewind"), this.bind(i.buttons.fastForward, "click", a.forward, "fastForward"), this.bind(i.buttons.mute, "click", function () {
                                        a.muted = !a.muted
                                    }, "mute"), this.bind(i.buttons.captions, "click", function () {
                                        return a.toggleCaptions()
                                    }), this.bind(i.buttons.download, "click", function () {
                                        b.call(a, a.media, "download")
                                    }, "download"), this.bind(i.buttons.fullscreen, "click", function () {
                                        a.fullscreen.toggle()
                                    }, "fullscreen"), this.bind(i.buttons.pip, "click", function () {
                                        a.pip = "toggle"
                                    }, "pip"), this.bind(i.buttons.airplay, "click", a.airplay, "airplay"), this.bind(i.buttons.settings, "click", function (e) {
                                        e.stopPropagation(), ae.toggleMenu.call(a, e)
                                    }), this.bind(i.buttons.settings, "keyup", function (e) {
                                        var t = e.which;
                                        [13, 32].includes(t) && (13 !== t ? (e.preventDefault(), e.stopPropagation(), ae.toggleMenu.call(a, e)) : ae.focusFirstMenuItem.call(a, null, !0))
                                    }, null, !1), this.bind(i.settings.menu, "keydown", function (e) {
                                        27 === e.which && ae.toggleMenu.call(a, e)
                                    }), this.bind(i.inputs.seek, "mousedown mousemove", function (e) {
                                        var t = i.progress.getBoundingClientRect(),
                                            n = 100 / t.width * (e.pageX - t.left);
                                        e.currentTarget.setAttribute("seek-value", n)
                                    }), this.bind(i.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function (e) {
                                        var t = e.currentTarget,
                                            n = e.keyCode ? e.keyCode : e.which;
                                        if (!g.keyboardEvent(e) || 39 === n || 37 === n) {
                                            a.lastSeekTime = Date.now();
                                            var i = t.hasAttribute("play-on-seeked"),
                                                o = ["mouseup", "touchend", "keyup"].includes(e.type);
                                            i && o ? (t.removeAttribute("play-on-seeked"), a.play()) : !o && a.playing && (t.setAttribute("play-on-seeked", ""), a.pause())
                                        }
                                    }), z.isIos) {
                                    var e = M.call(a, 'input[type="range"]');
                                    Array.from(e).forEach(function (e) {
                                        return o.bind(e, t, function (e) {
                                            return B(e.target)
                                        })
                                    })
                                }
                                this.bind(i.inputs.seek, t, function (e) {
                                    var t = e.currentTarget,
                                        n = t.getAttribute("seek-value");
                                    g.empty(n) && (n = t.value), t.removeAttribute("seek-value"), a.currentTime = n / t.max * a.duration
                                }, "seek"), this.bind(i.progress, "mouseenter mouseleave mousemove", function (e) {
                                    return ae.updateSeekTooltip.call(a, e)
                                }), z.isWebkit && Array.from(M.call(a, 'input[type="range"]')).forEach(function (e) {
                                    o.bind(e, "input", function (e) {
                                        return ae.updateRangeFill.call(a, e.target)
                                    })
                                }), a.config.toggleInvert && !g.element(i.display.duration) && this.bind(i.display.currentTime, "click", function () {
                                    0 !== a.currentTime && (a.config.invertTime = !a.config.invertTime, ae.timeUpdate.call(a))
                                }), this.bind(i.inputs.volume, t, function (e) {
                                    a.volume = e.target.value
                                }, "volume"), this.bind(i.controls, "mouseenter mouseleave", function (e) {
                                    i.controls.hover = !a.touch && "mouseenter" === e.type
                                }), this.bind(i.controls, "mousedown mouseup touchstart touchend touchcancel", function (e) {
                                    i.controls.pressed = ["mousedown", "touchstart"].includes(e.type)
                                }), this.bind(i.controls, "focusin", function () {
                                    var e = a.config,
                                        t = a.elements,
                                        n = a.timers;
                                    P(t.controls, e.classNames.noTransition, !0), we.toggleControls.call(a, !0), setTimeout(function () {
                                        P(t.controls, e.classNames.noTransition, !1)
                                    }, 0);
                                    var i = o.touch ? 3e3 : 4e3;
                                    clearTimeout(n.controls), n.controls = setTimeout(function () {
                                        return we.toggleControls.call(a, !1)
                                    }, i)
                                }), this.bind(i.inputs.volume, "wheel", function (e) {
                                    var t = e.webkitDirectionInvertedFromDevice,
                                        n = m([e.deltaX, -e.deltaY].map(function (e) {
                                            return t ? -e : e
                                        }), 2),
                                        i = n[0],
                                        o = n[1],
                                        r = Math.sign(Math.abs(i) > Math.abs(o) ? i : o);
                                    a.increaseVolume(r / 50);
                                    var s = a.media.volume;
                                    (1 === r && s < 1 || -1 === r && 0 < s) && e.preventDefault()
                                }, "volume", !1)
                            }
                        }]), t
                    }();
                "undefined" != typeof window ? window : void 0 !== He || "undefined" != typeof self && self;
                var Ee, Ae = (function (e, t) {
                    e.exports = function () {
                        var d = function () {},
                            i = {},
                            c = {},
                            u = {};

                        function h(e, t) {
                            if (e) {
                                var n = u[e];
                                if (c[e] = t, n)
                                    for (; n.length;) n[0](e, t), n.splice(0, 1)
                            }
                        }

                        function p(e, t) {
                            e.call && (e = {
                                success: e
                            }), t.length ? (e.error || d)(t) : (e.success || d)(e)
                        }

                        function f(n, i, o, r) {
                            var s, a, e = document,
                                t = o.async,
                                l = (o.numRetries || 0) + 1,
                                c = o.before || d,
                                u = n.replace(/^(css|img)!/, "");
                            r = r || 0, /(^css!|\.css$)/.test(n) ? (s = !0, (a = e.createElement("link")).rel = "stylesheet", a.href = u) : /(^img!|\.(png|gif|jpg|svg)$)/.test(n) ? (a = e.createElement("img")).src = u : ((a = e.createElement("script")).src = n, a.async = void 0 === t || t), !(a.onload = a.onerror = a.onbeforeload = function (e) {
                                var t = e.type[0];
                                if (s && "hideFocus" in a) try {
                                    a.sheet.cssText.length || (t = "e")
                                } catch (e) {
                                    t = "e"
                                }
                                if ("e" == t && (r += 1) < l) return f(n, i, o, r);
                                i(n, t, e.defaultPrevented)
                            }) !== c(n, a) && e.head.appendChild(a)
                        }

                        function t(e, t, n) {
                            var l, c;
                            if (t && t.trim && (l = t), c = (l ? n : t) || {}, l) {
                                if (l in i) throw "LoadJS";
                                i[l] = !0
                            }! function (e, t, n) {
                                var i, o, r = (e = e.push ? e : [e]).length,
                                    s = r,
                                    a = [];
                                for (i = function (e, t, n) {
                                        if ("e" == t && a.push(e), "b" == t) {
                                            if (!n) return;
                                            a.push(e)
                                        }--r || function (e) {
                                            p(c, e), h(l, e)
                                        }(a)
                                    }, o = 0; o < s; o++) f(e[o], i, n)
                            }(e, 0, c)
                        }
                        return t.ready = function (e, l) {
                            return function (e, t) {
                                e = e.push ? e : [e];
                                var n, i, o, r = [],
                                    s = e.length,
                                    a = s;
                                for (n = function (e, t) {
                                        t.length && r.push(e), --a || function (e) {
                                            p(l, e)
                                        }(r)
                                    }; s--;) i = e[s], (o = c[i]) ? n(i, o) : (u[i] = u[i] || []).push(n)
                            }(e), t
                        }, t.done = function (e) {
                            h(e, [])
                        }, t.reset = function () {
                            i = {}, c = {}, u = {}
                        }, t.isDefined = function (e) {
                            return e in i
                        }, t
                    }()
                }(Ee = {
                    exports: {}
                }), Ee.exports);

                function Te(n) {
                    return new Promise(function (e, t) {
                        Ae(n, {
                            success: e,
                            error: t
                        })
                    })
                }

                function Se(e) {
                    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, b.call(this, this.media, e ? "play" : "pause"))
                }
                var xe = {
                    setup: function () {
                        var t = this;
                        P(this.elements.wrapper, this.config.classNames.embed, !0), xe.setAspectRatio.call(this), g.object(window.Vimeo) ? xe.ready.call(this) : Te(this.config.urls.vimeo.sdk).then(function () {
                            xe.ready.call(t)
                        }).catch(function (e) {
                            t.debug.warn("Vimeo API failed to load", e)
                        })
                    },
                    setAspectRatio: function (e) {
                        var t = m((g.string(e) ? e : this.config.ratio).split(":").map(Number), 2),
                            n = 100 / t[0] * t[1];
                        if (xe.padding = n, this.elements.wrapper.style.paddingBottom = "".concat(n, "%"), this.supported.ui) {
                            var i = (240 - n) / 4.8;
                            this.media.style.transform = "translateY(-".concat(i, "%)")
                        }
                    },
                    ready: function () {
                        var o = this,
                            s = this,
                            e = ce({
                                loop: s.config.loop.active,
                                autoplay: s.autoplay,
                                byline: !1,
                                portrait: !1,
                                title: !1,
                                speed: !0,
                                transparent: 0,
                                gesture: "media",
                                playsinline: !this.config.fullscreen.iosNative
                            }),
                            t = s.media.getAttribute("src");
                        g.empty(t) && (t = s.media.getAttribute(s.config.attributes.embed.id));
                        var n, i = (n = t, g.empty(n) ? null : g.number(Number(n)) ? n : n.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : n),
                            r = k("iframe"),
                            a = X(s.config.urls.vimeo.iframe, i, e);
                        r.setAttribute("src", a), r.setAttribute("allowfullscreen", ""), r.setAttribute("allowtransparency", ""), r.setAttribute("allow", "autoplay");
                        var l = k("div", {
                            poster: s.poster,
                            class: s.config.classNames.embedContainer
                        });
                        l.appendChild(r), s.media = S(l, s.media), te(X(s.config.urls.vimeo.api, i), "json").then(function (e) {
                            if (!g.empty(e)) {
                                var t = new URL(e[0].thumbnail_large);
                                t.pathname = "".concat(t.pathname.split("_")[0], ".jpg"), we.setPoster.call(s, t.href).catch(function () {})
                            }
                        }), s.embed = new window.Vimeo.Player(r, {
                            autopause: s.config.autopause,
                            muted: s.muted
                        }), s.media.paused = !0, s.media.currentTime = 0, s.supported.ui && s.embed.disableTextTrack(), s.media.play = function () {
                            return Se.call(s, !0), s.embed.play()
                        }, s.media.pause = function () {
                            return Se.call(s, !1), s.embed.pause()
                        }, s.media.stop = function () {
                            s.pause(), s.currentTime = 0
                        };
                        var c = s.media.currentTime;
                        Object.defineProperty(s.media, "currentTime", {
                            get: function () {
                                return c
                            },
                            set: function (e) {
                                var t = s.embed,
                                    n = s.media,
                                    i = s.paused,
                                    o = s.volume,
                                    r = i && !t.hasPlayed;
                                n.seeking = !0, b.call(s, n, "seeking"), Promise.resolve(r && t.setVolume(0)).then(function () {
                                    return t.setCurrentTime(e)
                                }).then(function () {
                                    return r && t.pause()
                                }).then(function () {
                                    return r && t.setVolume(o)
                                }).catch(function () {})
                            }
                        });
                        var u = s.config.speed.selected;
                        Object.defineProperty(s.media, "playbackRate", {
                            get: function () {
                                return u
                            },
                            set: function (e) {
                                s.embed.setPlaybackRate(e).then(function () {
                                    u = e, b.call(s, s.media, "ratechange")
                                }).catch(function (e) {
                                    "Error" === e.name && ae.setSpeedMenu.call(s, [])
                                })
                            }
                        });
                        var d = s.config.volume;
                        Object.defineProperty(s.media, "volume", {
                            get: function () {
                                return d
                            },
                            set: function (e) {
                                s.embed.setVolume(e).then(function () {
                                    d = e, b.call(s, s.media, "volumechange")
                                })
                            }
                        });
                        var h = s.config.muted;
                        Object.defineProperty(s.media, "muted", {
                            get: function () {
                                return h
                            },
                            set: function (e) {
                                var t = !!g.boolean(e) && e;
                                s.embed.setVolume(t ? 0 : s.config.volume).then(function () {
                                    h = t, b.call(s, s.media, "volumechange")
                                })
                            }
                        });
                        var p, f = s.config.loop;
                        Object.defineProperty(s.media, "loop", {
                            get: function () {
                                return f
                            },
                            set: function (e) {
                                var t = g.boolean(e) ? e : s.config.loop.active;
                                s.embed.setLoop(t).then(function () {
                                    f = t
                                })
                            }
                        }), s.embed.getVideoUrl().then(function (e) {
                            p = e, ae.setDownloadLink.call(s)
                        }).catch(function (e) {
                            o.debug.warn(e)
                        }), Object.defineProperty(s.media, "currentSrc", {
                            get: function () {
                                return p
                            }
                        }), Object.defineProperty(s.media, "ended", {
                            get: function () {
                                return s.currentTime === s.duration
                            }
                        }), Promise.all([s.embed.getVideoWidth(), s.embed.getVideoHeight()]).then(function (e) {
                            var t, n, i;
                            xe.ratio = (t = e[0], n = e[1], i = function e(t, n) {
                                return 0 === n ? t : e(n, t % n)
                            }(t, n), "".concat(t / i, ":").concat(n / i)), xe.setAspectRatio.call(o, xe.ratio)
                        }), s.embed.setAutopause(s.config.autopause).then(function (e) {
                            s.config.autopause = e
                        }), s.embed.getVideoTitle().then(function (e) {
                            s.config.title = e, we.setTitle.call(o)
                        }), s.embed.getCurrentTime().then(function (e) {
                            c = e, b.call(s, s.media, "timeupdate")
                        }), s.embed.getDuration().then(function (e) {
                            s.media.duration = e, b.call(s, s.media, "durationchange")
                        }), s.embed.getTextTracks().then(function (e) {
                            s.media.textTracks = e, ue.setup.call(s)
                        }), s.embed.on("cuechange", function (e) {
                            var t = e.cues,
                                n = (void 0 === t ? [] : t).map(function (e) {
                                    return t = e.text, n = document.createDocumentFragment(), i = document.createElement("div"), n.appendChild(i), i.innerHTML = t, n.firstChild.innerText;
                                    var t, n, i
                                });
                            ue.updateCues.call(s, n)
                        }), s.embed.on("loaded", function () {
                            s.embed.getPaused().then(function (e) {
                                Se.call(s, !e), e || b.call(s, s.media, "playing")
                            }), g.element(s.embed.element) && s.supported.ui && s.embed.element.setAttribute("tabindex", -1)
                        }), s.embed.on("play", function () {
                            Se.call(s, !0), b.call(s, s.media, "playing")
                        }), s.embed.on("pause", function () {
                            Se.call(s, !1)
                        }), s.embed.on("timeupdate", function (e) {
                            s.media.seeking = !1, c = e.seconds, b.call(s, s.media, "timeupdate")
                        }), s.embed.on("progress", function (e) {
                            s.media.buffered = e.percent, b.call(s, s.media, "progress"), 1 === parseInt(e.percent, 10) && b.call(s, s.media, "canplaythrough"), s.embed.getDuration().then(function (e) {
                                e !== s.media.duration && (s.media.duration = e, b.call(s, s.media, "durationchange"))
                            })
                        }), s.embed.on("seeked", function () {
                            s.media.seeking = !1, b.call(s, s.media, "seeked")
                        }), s.embed.on("ended", function () {
                            s.media.paused = !0, b.call(s, s.media, "ended")
                        }), s.embed.on("error", function (e) {
                            s.media.error = e, b.call(s, s.media, "error")
                        }), s.on("enterfullscreen exitfullscreen", function (e) {
                            var t = s.fullscreen.target;
                            if (t === s.elements.container) {
                                var n = "enterfullscreen" === e.type,
                                    i = m(xe.ratio.split(":").map(Number), 2),
                                    o = i[0] > i[1] ? "width" : "height";
                                t.style[o] = n ? "".concat(xe.padding, "%") : null
                            }
                        }), setTimeout(function () {
                            return we.build.call(s)
                        }, 0)
                    }
                };

                function Ce(e) {
                    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, b.call(this, this.media, e ? "play" : "pause"))
                }
                var Pe, De = {
                        setup: function () {
                            var t = this;
                            P(this.elements.wrapper, this.config.classNames.embed, !0), De.setAspectRatio.call(this), g.object(window.YT) && g.function(window.YT.Player) ? De.ready.call(this) : (Te(this.config.urls.youtube.sdk).catch(function (e) {
                                t.debug.warn("YouTube API failed to load", e)
                            }), window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || [], window.onYouTubeReadyCallbacks.push(function () {
                                De.ready.call(t)
                            }), window.onYouTubeIframeAPIReady = function () {
                                window.onYouTubeReadyCallbacks.forEach(function (e) {
                                    e()
                                })
                            })
                        },
                        getTitle: function (e) {
                            var t = this;
                            if (g.function(this.embed.getVideoData)) {
                                var n = this.embed.getVideoData().title;
                                if (g.empty(n)) return this.config.title = n, void we.setTitle.call(this)
                            }
                            var i = this.config.keys.google;
                            g.string(i) && !g.empty(i) && te(X(this.config.urls.youtube.api, e, i)).then(function (e) {
                                g.object(e) && (t.config.title = e.items[0].snippet.title, we.setTitle.call(t))
                            }).catch(function () {})
                        },
                        setAspectRatio: function () {
                            var e = this.config.ratio.split(":");
                            this.elements.wrapper.style.paddingBottom = "".concat(100 / e[0] * e[1], "%")
                        },
                        ready: function () {
                            var o = this,
                                e = o.media.getAttribute("id");
                            if (g.empty(e) || !e.startsWith("youtube-")) {
                                var t = o.media.getAttribute("src");
                                g.empty(t) && (t = o.media.getAttribute(this.config.attributes.embed.id));
                                var n, i, r = (n = t, g.empty(n) ? null : n.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : n),
                                    s = (i = o.provider, "".concat(i, "-").concat(Math.floor(1e4 * Math.random()))),
                                    a = k("div", {
                                        id: s,
                                        poster: o.poster
                                    });
                                o.media = S(a, o.media);
                                var l = function (e) {
                                    return "https://img.youtube.com/vi/".concat(r, "/").concat(e, "default.jpg")
                                };
                                _e(l("maxres"), 121).catch(function () {
                                    return _e(l("sd"), 121)
                                }).catch(function () {
                                    return _e(l("hq"))
                                }).then(function (e) {
                                    return we.setPoster.call(o, e.src)
                                }).then(function (e) {
                                    e.includes("maxres") || (o.elements.poster.style.backgroundSize = "cover")
                                }).catch(function () {}), o.embed = new window.YT.Player(s, {
                                    videoId: r,
                                    playerVars: {
                                        autoplay: o.config.autoplay ? 1 : 0,
                                        hl: o.config.hl,
                                        controls: o.supported.ui ? 0 : 1,
                                        rel: 0,
                                        showinfo: 0,
                                        iv_load_policy: 3,
                                        modestbranding: 1,
                                        disablekb: 1,
                                        playsinline: 1,
                                        widget_referrer: window ? window.location.href : null,
                                        cc_load_policy: o.captions.active ? 1 : 0,
                                        cc_lang_pref: o.config.captions.language
                                    },
                                    events: {
                                        onError: function (e) {
                                            if (!o.media.error) {
                                                var t = e.data,
                                                    n = {
                                                        2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                                        5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                                        100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                                        101: "The owner of the requested video does not allow it to be played in embedded players.",
                                                        150: "The owner of the requested video does not allow it to be played in embedded players."
                                                    } [t] || "An unknown error occured";
                                                o.media.error = {
                                                    code: t,
                                                    message: n
                                                }, b.call(o, o.media, "error")
                                            }
                                        },
                                        onPlaybackRateChange: function (e) {
                                            var t = e.target;
                                            o.media.playbackRate = t.getPlaybackRate(), b.call(o, o.media, "ratechange")
                                        },
                                        onReady: function (e) {
                                            if (!g.function(o.media.play)) {
                                                var n = e.target;
                                                De.getTitle.call(o, r), o.media.play = function () {
                                                    Ce.call(o, !0), n.playVideo()
                                                }, o.media.pause = function () {
                                                    Ce.call(o, !1), n.pauseVideo()
                                                }, o.media.stop = function () {
                                                    n.stopVideo()
                                                }, o.media.duration = n.getDuration(), o.media.paused = !0, o.media.currentTime = 0, Object.defineProperty(o.media, "currentTime", {
                                                    get: function () {
                                                        return Number(n.getCurrentTime())
                                                    },
                                                    set: function (e) {
                                                        o.paused && !o.embed.hasPlayed && o.embed.mute(), o.media.seeking = !0, b.call(o, o.media, "seeking"), n.seekTo(e)
                                                    }
                                                }), Object.defineProperty(o.media, "playbackRate", {
                                                    get: function () {
                                                        return n.getPlaybackRate()
                                                    },
                                                    set: function (e) {
                                                        n.setPlaybackRate(e)
                                                    }
                                                });
                                                var t = o.config.volume;
                                                Object.defineProperty(o.media, "volume", {
                                                    get: function () {
                                                        return t
                                                    },
                                                    set: function (e) {
                                                        t = e, n.setVolume(100 * t), b.call(o, o.media, "volumechange")
                                                    }
                                                });
                                                var i = o.config.muted;
                                                Object.defineProperty(o.media, "muted", {
                                                    get: function () {
                                                        return i
                                                    },
                                                    set: function (e) {
                                                        var t = g.boolean(e) ? e : i;
                                                        n[(i = t) ? "mute" : "unMute"](), b.call(o, o.media, "volumechange")
                                                    }
                                                }), Object.defineProperty(o.media, "currentSrc", {
                                                    get: function () {
                                                        return n.getVideoUrl()
                                                    }
                                                }), Object.defineProperty(o.media, "ended", {
                                                    get: function () {
                                                        return o.currentTime === o.duration
                                                    }
                                                }), o.options.speed = n.getAvailablePlaybackRates(), o.supported.ui && o.media.setAttribute("tabindex", -1), b.call(o, o.media, "timeupdate"), b.call(o, o.media, "durationchange"), clearInterval(o.timers.buffering), o.timers.buffering = setInterval(function () {
                                                    o.media.buffered = n.getVideoLoadedFraction(), (null === o.media.lastBuffered || o.media.lastBuffered < o.media.buffered) && b.call(o, o.media, "progress"), o.media.lastBuffered = o.media.buffered, 1 === o.media.buffered && (clearInterval(o.timers.buffering), b.call(o, o.media, "canplaythrough"))
                                                }, 200), setTimeout(function () {
                                                    return we.build.call(o)
                                                }, 50)
                                            }
                                        },
                                        onStateChange: function (e) {
                                            var t = e.target;
                                            switch (clearInterval(o.timers.playing), o.media.seeking && [1, 2].includes(e.data) && (o.media.seeking = !1, b.call(o, o.media, "seeked")), e.data) {
                                                case -1:
                                                    b.call(o, o.media, "timeupdate"), o.media.buffered = t.getVideoLoadedFraction(), b.call(o, o.media, "progress");
                                                    break;
                                                case 0:
                                                    Ce.call(o, !1), o.media.loop ? (t.stopVideo(), t.playVideo()) : b.call(o, o.media, "ended");
                                                    break;
                                                case 1:
                                                    o.media.paused && !o.embed.hasPlayed ? o.media.pause() : (Ce.call(o, !0), b.call(o, o.media, "playing"), o.timers.playing = setInterval(function () {
                                                        b.call(o, o.media, "timeupdate")
                                                    }, 50), o.media.duration !== t.getDuration() && (o.media.duration = t.getDuration(), b.call(o, o.media, "durationchange")));
                                                    break;
                                                case 2:
                                                    o.muted || o.embed.unMute(), Ce.call(o, !1)
                                            }
                                            b.call(o, o.elements.container, "statechange", !1, {
                                                code: e.data
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    },
                    Le = {
                        setup: function () {
                            this.media ? (P(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), P(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && P(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = k("div", {
                                class: this.config.classNames.video
                            }), _(this.media, this.elements.wrapper), this.elements.poster = k("div", {
                                class: this.config.classNames.poster
                            }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? V.extend.call(this) : this.isYouTube ? De.setup.call(this) : this.isVimeo && xe.setup.call(this)) : this.debug.warn("No media element found!")
                        }
                    },
                    Me = function () {
                        function t(e) {
                            var n = this;
                            c(this, t), this.player = e, this.publisherId = e.config.ads.publisherId, this.playing = !1, this.initialized = !1, this.elements = {
                                container: null,
                                displayContainer: null
                            }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function (e, t) {
                                n.on("loaded", e), n.on("error", t)
                            }), this.load()
                        }
                        return e(t, [{
                            key: "load",
                            value: function () {
                                var e = this;
                                this.enabled && (g.object(window.google) && g.object(window.google.ima) ? this.ready() : Te(this.player.config.urls.googleIMA.sdk).then(function () {
                                    e.ready()
                                }).catch(function () {
                                    e.trigger("error", new Error("Google IMA SDK failed to load"))
                                }))
                            }
                        }, {
                            key: "ready",
                            value: function () {
                                var e = this;
                                this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function () {
                                    e.clearSafetyTimer("onAdsManagerLoaded()")
                                }), this.listeners(), this.setupIMA()
                            }
                        }, {
                            key: "setupIMA",
                            value: function () {
                                this.elements.container = k("div", {
                                    class: this.player.config.classNames.ads
                                }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container), this.requestAds()
                            }
                        }, {
                            key: "requestAds",
                            value: function () {
                                var t = this,
                                    e = this.player.elements.container;
                                try {
                                    this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (e) {
                                        return t.onAdsManagerLoaded(e)
                                    }, !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
                                        return t.onAdError(e)
                                    }, !1);
                                    var n = new google.ima.AdsRequest;
                                    n.adTagUrl = this.tagUrl, n.linearAdSlotWidth = e.offsetWidth, n.linearAdSlotHeight = e.offsetHeight, n.nonLinearAdSlotWidth = e.offsetWidth, n.nonLinearAdSlotHeight = e.offsetHeight, n.forceNonLinearFullSlot = !1, n.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(n)
                                } catch (t) {
                                    this.onAdError(t)
                                }
                            }
                        }, {
                            key: "pollCountdown",
                            value: function () {
                                var n = this;
                                if (!(0 < arguments.length && void 0 !== arguments[0] && arguments[0])) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
                                this.countdownTimer = setInterval(function () {
                                    var e = se(Math.max(n.manager.getRemainingTime(), 0)),
                                        t = "".concat(J("advertisement", n.player.config), " - ").concat(e);
                                    n.elements.container.setAttribute("data-badge-text", t)
                                }, 100)
                            }
                        }, {
                            key: "onAdsManagerLoaded",
                            value: function (e) {
                                var o = this;
                                if (this.enabled) {
                                    var t = new google.ima.AdsRenderingSettings;
                                    t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, this.manager = e.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), g.empty(this.cuePoints) || this.cuePoints.forEach(function (e) {
                                        if (0 !== e && -1 !== e && e < o.player.duration) {
                                            var t = o.player.elements.progress;
                                            if (g.element(t)) {
                                                var n = 100 / o.player.duration * e,
                                                    i = k("span", {
                                                        class: o.player.config.classNames.cues
                                                    });
                                                i.style.left = "".concat(n.toString(), "%"), t.appendChild(i)
                                            }
                                        }
                                    }), this.manager.setVolume(this.player.volume), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
                                        return o.onAdError(e)
                                    }), Object.keys(google.ima.AdEvent.Type).forEach(function (e) {
                                        o.manager.addEventListener(google.ima.AdEvent.Type[e], function (e) {
                                            return o.onAdEvent(e)
                                        })
                                    }), this.trigger("loaded")
                                }
                            }
                        }, {
                            key: "onAdEvent",
                            value: function (e) {
                                var n = this,
                                    t = this.player.elements.container,
                                    i = e.getAd(),
                                    o = function (e) {
                                        var t = "ads".concat(e.replace(/_/g, "").toLowerCase());
                                        b.call(n.player, n.player.media, t)
                                    };
                                switch (e.type) {
                                    case google.ima.AdEvent.Type.LOADED:
                                        this.trigger("loaded"), o(e.type), this.pollCountdown(!0), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
                                        break;
                                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                                        o(e.type), this.loadAds();
                                        break;
                                    case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                                        o(e.type), this.pauseContent();
                                        break;
                                    case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                                        o(e.type), this.pollCountdown(), this.resumeContent();
                                        break;
                                    case google.ima.AdEvent.Type.STARTED:
                                    case google.ima.AdEvent.Type.MIDPOINT:
                                    case google.ima.AdEvent.Type.COMPLETE:
                                    case google.ima.AdEvent.Type.IMPRESSION:
                                    case google.ima.AdEvent.Type.CLICK:
                                        o(e.type)
                                }
                            }
                        }, {
                            key: "onAdError",
                            value: function (e) {
                                this.cancel(), this.player.debug.warn("Ads error", e)
                            }
                        }, {
                            key: "listeners",
                            value: function () {
                                var i, o = this,
                                    e = this.player.elements.container;
                                this.player.on("ended", function () {
                                    o.loader.contentComplete()
                                }), this.player.on("seeking", function () {
                                    return i = o.player.currentTime
                                }), this.player.on("seeked", function () {
                                    var n = o.player.currentTime;
                                    g.empty(o.cuePoints) || o.cuePoints.forEach(function (e, t) {
                                        i < e && e < n && (o.manager.discardAdBreak(), o.cuePoints.splice(t, 1))
                                    })
                                }), window.addEventListener("resize", function () {
                                    o.manager && o.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL)
                                })
                            }
                        }, {
                            key: "play",
                            value: function () {
                                var t = this,
                                    e = this.player.elements.container;
                                this.managerPromise || this.resumeContent(), this.managerPromise.then(function () {
                                    t.elements.displayContainer.initialize();
                                    try {
                                        t.initialized || (t.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), t.manager.start()), t.initialized = !0
                                    } catch (e) {
                                        t.onAdError(e)
                                    }
                                }).catch(function () {})
                            }
                        }, {
                            key: "resumeContent",
                            value: function () {
                                this.elements.container.style.zIndex = "", this.playing = !1, this.player.currentTime < this.player.duration && this.player.play()
                            }
                        }, {
                            key: "pauseContent",
                            value: function () {
                                this.elements.container.style.zIndex = 3, this.playing = !0, this.player.pause()
                            }
                        }, {
                            key: "cancel",
                            value: function () {
                                this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
                            }
                        }, {
                            key: "loadAds",
                            value: function () {
                                var t = this;
                                this.managerPromise.then(function () {
                                    t.manager && t.manager.destroy(), t.managerPromise = new Promise(function (e) {
                                        t.on("loaded", e), t.player.debug.log(t.manager)
                                    }), t.requestAds()
                                }).catch(function () {})
                            }
                        }, {
                            key: "trigger",
                            value: function (e) {
                                for (var t = this, n = arguments.length, i = new Array(1 < n ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];
                                var r = this.events[e];
                                g.array(r) && r.forEach(function (e) {
                                    g.function(e) && e.apply(t, i)
                                })
                            }
                        }, {
                            key: "on",
                            value: function (e, t) {
                                return g.array(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this
                            }
                        }, {
                            key: "startSafetyTimer",
                            value: function (e, t) {
                                var n = this;
                                this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout(function () {
                                    n.cancel(), n.clearSafetyTimer("startSafetyTimer()")
                                }, e)
                            }
                        }, {
                            key: "clearSafetyTimer",
                            value: function (e) {
                                g.nullOrUndefined(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null)
                            }
                        }, {
                            key: "enabled",
                            get: function () {
                                return this.player.isHTML5 && this.player.isVideo && this.player.config.ads.enabled && !g.empty(this.publisherId)
                            }
                        }, {
                            key: "tagUrl",
                            get: function () {
                                var e = {
                                    AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                                    AV_CHANNELID: "5a0458dc28a06145e4519d21",
                                    AV_URL: window.location.hostname,
                                    cb: Date.now(),
                                    AV_WIDTH: 640,
                                    AV_HEIGHT: 480,
                                    AV_CDIM2: this.publisherId
                                };
                                return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(ce(e))
                            }
                        }]), t
                    }(),
                    Ie = {
                        insertElements: function (t, e) {
                            var n = this;
                            g.string(e) ? E(t, this.media, {
                                src: e
                            }) : g.array(e) && e.forEach(function (e) {
                                E(t, n.media, e)
                            })
                        },
                        change: function (l) {
                            var c = this;
                            G(l, "sources.length") ? (V.cancelRequests.call(this), this.destroy.call(this, function () {
                                c.options.quality = [], A(c.media), c.media = null, g.element(c.elements.container) && c.elements.container.removeAttribute("class");
                                var e = l.sources,
                                    t = l.type,
                                    n = m(e, 1)[0],
                                    i = n.provider,
                                    o = void 0 === i ? pe.html5 : i,
                                    r = n.src,
                                    s = "html5" === o ? t : "div",
                                    a = "html5" === o ? {} : {
                                        src: r
                                    };
                                Object.assign(c, {
                                    provider: o,
                                    type: t,
                                    supported: W.check(t, o, c.config.playsinline),
                                    media: k(s, a)
                                }), c.elements.container.appendChild(c.media), g.boolean(l.autoplay) && (c.config.autoplay = l.autoplay), c.isHTML5 && (c.config.crossorigin && c.media.setAttribute("crossorigin", ""), c.config.autoplay && c.media.setAttribute("autoplay", ""), g.empty(l.poster) || (c.poster = l.poster), c.config.loop.active && c.media.setAttribute("loop", ""), c.config.muted && c.media.setAttribute("muted", ""), c.config.playsinline && c.media.setAttribute("playsinline", "")), we.addStyleHook.call(c), c.isHTML5 && Ie.insertElements.call(c, "source", e), c.config.title = l.title, Le.setup.call(c), c.isHTML5 && Object.keys(l).includes("tracks") && Ie.insertElements.call(c, "track", l.tracks), (c.isHTML5 || c.isEmbed && !c.supported.ui) && we.build.call(c), c.isHTML5 && c.media.load(), c.fullscreen.update()
                            }, !0)) : this.debug.warn("Invalid source format")
                        }
                    },
                    Oe = function () {
                        function l(e, t) {
                            var n = this;
                            if (c(this, l), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = W.touch, this.media = e, g.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || g.nodeList(this.media) || g.array(this.media)) && (this.media = this.media[0]), this.config = Z({}, de, l.defaults, t || {}, function () {
                                    try {
                                        return JSON.parse(n.media.getAttribute("data-plyr-config"))
                                    } catch (e) {
                                        return {}
                                    }
                                }()), this.elements = {
                                    container: null,
                                    captions: null,
                                    buttons: {},
                                    display: {},
                                    progress: {},
                                    inputs: {},
                                    settings: {
                                        popup: null,
                                        menu: null,
                                        panels: {},
                                        buttons: {}
                                    }
                                }, this.captions = {
                                    active: null,
                                    currentTrack: -1,
                                    meta: new WeakMap
                                }, this.fullscreen = {
                                    active: !1
                                }, this.options = {
                                    speed: [],
                                    quality: []
                                }, this.debug = new ge(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", W), !g.nullOrUndefined(this.media) && g.element(this.media))
                                if (this.media.plyr) this.debug.warn("Target already setup");
                                else if (this.config.enabled)
                                if (W.check().api) {
                                    var i = this.media.cloneNode(!0);
                                    i.autoplay = !1, this.elements.original = i;
                                    var o = this.media.tagName.toLowerCase(),
                                        r = null,
                                        s = null;
                                    switch (o) {
                                        case "div":
                                            if (r = this.media.querySelector("iframe"), g.element(r)) {
                                                if (s = le(r.getAttribute("src")), this.provider = function (e) {
                                                        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(e) ? pe.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? pe.vimeo : null
                                                    }(s.toString()), this.elements.container = this.media, this.media = r, this.elements.container.className = "", s.search.length) {
                                                    var a = ["1", "true"];
                                                    a.includes(s.searchParams.get("autoplay")) && (this.config.autoplay = !0), a.includes(s.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = a.includes(s.searchParams.get("playsinline")), this.config.hl = s.searchParams.get("hl")) : this.config.playsinline = !0
                                                }
                                            } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                                            if (g.empty(this.provider) || !Object.keys(pe).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                                            this.type = fe.video;
                                            break;
                                        case "video":
                                        case "audio":
                                            this.type = o, this.provider = pe.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                                            break;
                                        default:
                                            return void this.debug.error("Setup failed: unsupported type")
                                    }
                                    this.supported = W.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new ke(this), this.storage = new ee(this), this.media.plyr = this, g.element(this.elements.container) || (this.elements.container = k("div"), _(this.media, this.elements.container)), we.addStyleHook.call(this), Le.setup.call(this), this.config.debug && f.call(this, this.elements.container, this.config.events.join(" "), function (e) {
                                        n.debug.log("event: ".concat(e.type))
                                    }), (this.isHTML5 || this.isEmbed && !this.supported.ui) && we.build.call(this), this.listeners.container(), this.listeners.global(), this.fullscreen = new be(this), this.config.ads.enabled && (this.ads = new Me(this)), this.config.autoplay && this.play(), this.lastSeekTime = 0) : this.debug.error("Setup failed: no support")
                                } else this.debug.error("Setup failed: no support");
                            else this.debug.error("Setup failed: disabled by config");
                            else this.debug.error("Setup failed: no suitable element passed")
                        }
                        return e(l, [{
                            key: "play",
                            value: function () {
                                return g.function(this.media.play) ? this.media.play() : null
                            }
                        }, {
                            key: "pause",
                            value: function () {
                                this.playing && g.function(this.media.pause) && this.media.pause()
                            }
                        }, {
                            key: "togglePlay",
                            value: function (e) {
                                (g.boolean(e) ? e : !this.playing) ? this.play(): this.pause()
                            }
                        }, {
                            key: "stop",
                            value: function () {
                                this.isHTML5 ? (this.pause(), this.restart()) : g.function(this.media.stop) && this.media.stop()
                            }
                        }, {
                            key: "restart",
                            value: function () {
                                this.currentTime = 0
                            }
                        }, {
                            key: "rewind",
                            value: function (e) {
                                this.currentTime = this.currentTime - (g.number(e) ? e : this.config.seekTime)
                            }
                        }, {
                            key: "forward",
                            value: function (e) {
                                this.currentTime = this.currentTime + (g.number(e) ? e : this.config.seekTime)
                            }
                        }, {
                            key: "increaseVolume",
                            value: function (e) {
                                var t = this.media.muted ? 0 : this.volume;
                                this.volume = t + (g.number(e) ? e : 0)
                            }
                        }, {
                            key: "decreaseVolume",
                            value: function (e) {
                                this.increaseVolume(-e)
                            }
                        }, {
                            key: "toggleCaptions",
                            value: function (e) {
                                ue.toggle.call(this, e, !1)
                            }
                        }, {
                            key: "airplay",
                            value: function () {
                                W.airplay && this.media.webkitShowPlaybackTargetPicker()
                            }
                        }, {
                            key: "toggleControls",
                            value: function (e) {
                                if (!this.supported.ui || this.isAudio) return !1;
                                var t = D(this.elements.container, this.config.classNames.hideControls),
                                    n = void 0 === e ? void 0 : !e,
                                    i = P(this.elements.container, this.config.classNames.hideControls, n);
                                if (i && this.config.controls.includes("settings") && !g.empty(this.config.settings) && ae.toggleMenu.call(this, !1), i !== t) {
                                    var o = i ? "controlshidden" : "controlsshown";
                                    b.call(this, this.media, o)
                                }
                                return !i
                            }
                        }, {
                            key: "on",
                            value: function (e, t) {
                                f.call(this, this.elements.container, e, t)
                            }
                        }, {
                            key: "once",
                            value: function (e, t) {
                                y.call(this, this.elements.container, e, t)
                            }
                        }, {
                            key: "off",
                            value: function (e, t) {
                                v(this.elements.container, e, t)
                            }
                        }, {
                            key: "destroy",
                            value: function (e) {
                                var t = this,
                                    n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                                if (this.ready) {
                                    var i = function () {
                                        document.body.style.overflow = "", t.embed = null, n ? (Object.keys(t.elements).length && (A(t.elements.buttons.play), A(t.elements.captions), A(t.elements.controls), A(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), g.function(e) && e()) : (function () {
                                            this && this.eventListeners && (this.eventListeners.forEach(function (e) {
                                                var t = e.element,
                                                    n = e.type,
                                                    i = e.callback,
                                                    o = e.options;
                                                t.removeEventListener(n, i, o)
                                            }), this.eventListeners = [])
                                        }.call(t), S(t.elements.original, t.elements.container), b.call(t, t.elements.original, "destroyed", !0), g.function(e) && e.call(t.elements.original), t.ready = !1, setTimeout(function () {
                                            t.elements = null, t.media = null
                                        }, 200))
                                    };
                                    this.stop(), this.isHTML5 ? (clearTimeout(this.timers.loading), we.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && g.function(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200))
                                }
                            }
                        }, {
                            key: "supports",
                            value: function (e) {
                                return W.mime.call(this, e)
                            }
                        }, {
                            key: "isHTML5",
                            get: function () {
                                return Boolean(this.provider === pe.html5)
                            }
                        }, {
                            key: "isEmbed",
                            get: function () {
                                return Boolean(this.isYouTube || this.isVimeo)
                            }
                        }, {
                            key: "isYouTube",
                            get: function () {
                                return Boolean(this.provider === pe.youtube)
                            }
                        }, {
                            key: "isVimeo",
                            get: function () {
                                return Boolean(this.provider === pe.vimeo)
                            }
                        }, {
                            key: "isVideo",
                            get: function () {
                                return Boolean(this.type === fe.video)
                            }
                        }, {
                            key: "isAudio",
                            get: function () {
                                return Boolean(this.type === fe.audio)
                            }
                        }, {
                            key: "playing",
                            get: function () {
                                return Boolean(this.ready && !this.paused && !this.ended)
                            }
                        }, {
                            key: "paused",
                            get: function () {
                                return Boolean(this.media.paused)
                            }
                        }, {
                            key: "stopped",
                            get: function () {
                                return Boolean(this.paused && 0 === this.currentTime)
                            }
                        }, {
                            key: "ended",
                            get: function () {
                                return Boolean(this.media.ended)
                            }
                        }, {
                            key: "currentTime",
                            set: function (e) {
                                if (this.duration) {
                                    var t = g.number(e) && 0 < e;
                                    this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"))
                                }
                            },
                            get: function () {
                                return Number(this.media.currentTime)
                            }
                        }, {
                            key: "buffered",
                            get: function () {
                                var e = this.media.buffered;
                                return g.number(e) ? e : e && e.length && 0 < this.duration ? e.end(0) / this.duration : 0
                            }
                        }, {
                            key: "seeking",
                            get: function () {
                                return Boolean(this.media.seeking)
                            }
                        }, {
                            key: "duration",
                            get: function () {
                                var e = parseFloat(this.config.duration),
                                    t = (this.media || {}).duration,
                                    n = g.number(t) && t !== 1 / 0 ? t : 0;
                                return e || n
                            }
                        }, {
                            key: "volume",
                            set: function (e) {
                                var t = e;
                                g.string(t) && (t = Number(t)), g.number(t) || (t = this.storage.get("volume")), g.number(t) || (t = this.config.volume), 1 < t && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !g.empty(e) && this.muted && 0 < t && (this.muted = !1)
                            },
                            get: function () {
                                return Number(this.media.volume)
                            }
                        }, {
                            key: "muted",
                            set: function (e) {
                                var t = e;
                                g.boolean(t) || (t = this.storage.get("muted")), g.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
                            },
                            get: function () {
                                return Boolean(this.media.muted)
                            }
                        }, {
                            key: "hasAudio",
                            get: function () {
                                return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)
                            }
                        }, {
                            key: "speed",
                            set: function (e) {
                                var t = null;
                                g.number(e) && (t = e), g.number(t) || (t = this.storage.get("speed")), g.number(t) || (t = this.config.speed.selected), t < .1 && (t = .1), 2 < t && (t = 2), this.config.speed.options.includes(t) ? (this.config.speed.selected = t, this.media.playbackRate = t) : this.debug.warn("Unsupported speed (".concat(t, ")"))
                            },
                            get: function () {
                                return Number(this.media.playbackRate)
                            }
                        }, {
                            key: "quality",
                            set: function (e) {
                                var t = this.config.quality,
                                    n = this.options.quality;
                                if (n.length) {
                                    var i = [!g.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(g.number),
                                        o = !0;
                                    if (!n.includes(i)) {
                                        var r = function (e, n) {
                                            return g.array(e) && e.length ? e.reduce(function (e, t) {
                                                return Math.abs(t - n) < Math.abs(e - n) ? t : e
                                            }) : null
                                        }(n, i);
                                        this.debug.warn("Unsupported quality option: ".concat(i, ", using ").concat(r, " instead")), i = r, o = !1
                                    }
                                    t.selected = i, this.media.quality = i, o && this.storage.set({
                                        quality: i
                                    })
                                }
                            },
                            get: function () {
                                return this.media.quality
                            }
                        }, {
                            key: "loop",
                            set: function (e) {
                                var t = g.boolean(e) ? e : this.config.loop.active;
                                this.config.loop.active = t, this.media.loop = t
                            },
                            get: function () {
                                return Boolean(this.media.loop)
                            }
                        }, {
                            key: "source",
                            set: function (e) {
                                Ie.change.call(this, e)
                            },
                            get: function () {
                                return this.media.currentSrc
                            }
                        }, {
                            key: "download",
                            get: function () {
                                var e = this.config.urls.download;
                                return g.url(e) ? e : this.source
                            }
                        }, {
                            key: "poster",
                            set: function (e) {
                                this.isVideo ? we.setPoster.call(this, e, !1).catch(function () {}) : this.debug.warn("Poster can only be set for video")
                            },
                            get: function () {
                                return this.isVideo ? this.media.getAttribute("poster") : null
                            }
                        }, {
                            key: "autoplay",
                            set: function (e) {
                                var t = g.boolean(e) ? e : this.config.autoplay;
                                this.config.autoplay = t
                            },
                            get: function () {
                                return Boolean(this.config.autoplay)
                            }
                        }, {
                            key: "currentTrack",
                            set: function (e) {
                                ue.set.call(this, e, !1)
                            },
                            get: function () {
                                var e = this.captions,
                                    t = e.toggled,
                                    n = e.currentTrack;
                                return t ? n : -1
                            }
                        }, {
                            key: "language",
                            set: function (e) {
                                ue.setLanguage.call(this, e, !1)
                            },
                            get: function () {
                                return (ue.getCurrentTrack.call(this) || {}).language
                            }
                        }, {
                            key: "pip",
                            set: function (e) {
                                if (W.pip) {
                                    var t = g.boolean(e) ? e : !this.pip;
                                    g.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? he : "inline"), g.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture())
                                }
                            },
                            get: function () {
                                return W.pip ? g.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === he : null
                            }
                        }], [{
                            key: "supported",
                            value: function (e, t, n) {
                                return W.check(e, t, n)
                            }
                        }, {
                            key: "loadSprite",
                            value: function (e, t) {
                                return ne(e, t)
                            }
                        }, {
                            key: "setup",
                            value: function (e) {
                                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                                    n = null;
                                return g.string(e) ? n = Array.from(document.querySelectorAll(e)) : g.nodeList(e) ? n = Array.from(e) : g.array(e) && (n = e.filter(g.element)), g.empty(n) ? null : n.map(function (e) {
                                    return new l(e, t)
                                })
                            }
                        }]), l
                    }();
                return Oe.defaults = (Pe = de, JSON.parse(JSON.stringify(Pe))), Oe
            }()
        }()
    }).call(this, t(4))
}, function (t, e) {
    function n(e) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function i(e) {
        return "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? t.exports = i = function (e) {
            return n(e)
        } : t.exports = i = function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : n(e)
        }, i(e)
    }
    t.exports = i
}, function (e, t, n) {
    n(17), e.exports = n(62)
}, function (e, t, n) {}, function (e, t) {
    e.exports = function (e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
            return n
        }
    }
}, function (e, t) {
    e.exports = function (e) {
        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
    }
}, function (e, t) {
    e.exports = function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance")
    }
}, function (e, t, n) {
    var s = n(22);
    e.exports = function (e, t, n, i, o) {
        var r = function (t, n, e, i) {
            return function (e) {
                e.delegateTarget = s(e.target, n), e.delegateTarget && i.call(t, e)
            }
        }.apply(this, arguments);
        return e.addEventListener(n, r, o), {
            destroy: function () {
                e.removeEventListener(n, r, o)
            }
        }
    }
}, function (e, t) {
    if ("undefined" != typeof Element && !Element.prototype.matches) {
        var n = Element.prototype;
        n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
    }
    e.exports = function (e, t) {
        for (; e && 9 !== e.nodeType;) {
            if ("function" == typeof e.matches && e.matches(t)) return e;
            e = e.parentNode
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function () {
        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        return function (e, t, n) {
            return t && i(e.prototype, t), n && i(e, n), e
        }
    }();
    var o = function () {
        function e() {
            ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.pages = {}, this.count = 0, this.last = null
        }
        return i(e, [{
            key: "cacheUrl",
            value: function (e, t) {
                this.count++, e.url in this.pages == !1 && (this.pages[e.url] = e), this.last = this.pages[e.url], t && this.displayCache()
            }
        }, {
            key: "getPage",
            value: function (e) {
                return this.pages[e]
            }
        }, {
            key: "displayCache",
            value: function () {
                for (var e in this.pages);
            }
        }, {
            key: "exists",
            value: function (e) {
                return e in this.pages
            }
        }, {
            key: "empty",
            value: function (e) {
                this.pages = {}, this.count = 0, this.last = null
            }
        }, {
            key: "remove",
            value: function (e) {
                delete this.pages[e]
            }
        }]), e
    }();
    t.default = o
}, function (e, t, n) {
    "use strict";
    e.exports = function () {
        var e = document.createElement("div"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t)
            if (void 0 !== e.style[n]) return t[n];
        return !1
    }
}, function (e, t, n) {
    "use strict";
    var r = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
        }
        return e
    };
    e.exports = function (e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = {
                url: window.location.pathname + window.location.search,
                method: "GET",
                data: null
            },
            i = r({}, n, e),
            o = new XMLHttpRequest;
        return o.onreadystatechange = function () {
            4 === o.readyState && (500 !== o.status ? t(o.responseText, o) : t(null, o))
        }, o.open(i.method, i.url, !0), o.setRequestHeader("X-Requested-With", "swup"), o.send(i.data), o
    }
}, function (e, t, n) {
    "use strict";
    var a = n(3);
    e.exports = function (e, t) {
        var n = this,
            i = e.replace("<body", '<div id="swupBody"').replace("</body>", "</div>"),
            o = document.createElement("div");
        o.innerHTML = i;
        for (var r = [], s = 0; s < this.options.elements.length; s++) {
            if (null == o.querySelector(this.options.elements[s])) return null;
            (0, a.queryAll)(this.options.elements[s]).forEach(function (e, t) {
                (0, a.queryAll)(n.options.elements[s], o)[t].dataset.swup = r.length, r.push((0, a.queryAll)(n.options.elements[s], o)[t].outerHTML)
            })
        }
        return {
            title: o.querySelector("title").innerText,
            pageClass: o.querySelector("#swupBody").className,
            originalContent: e,
            blocks: r,
            responseURL: null != t ? t.responseURL : window.location.href
        }
    }
}, function (e, t, n) {
    "use strict";
    var a = n(3),
        l = Array.prototype.forEach;
    e.exports = function (r, e) {
        var s = this;
        this.options.doScrollingRightAway && !this.scrollToElement && this.doScrolling(e);
        var t = [];
        if (null != r.customTransition ? (this.updateTransition(window.location.pathname, r.url, r.customTransition), document.documentElement.classList.add("to-" + this.classify(r.customTransition))) : this.updateTransition(window.location.pathname, r.url), !e || this.options.animateHistoryBrowsing) {
            this.triggerEvent("animationOutStart"), document.documentElement.classList.add("is-changing"), document.documentElement.classList.add("is-leaving"), document.documentElement.classList.add("is-animating"), e && document.documentElement.classList.add("is-popstate"), document.documentElement.classList.add("to-" + this.classify(r.url));
            var n = (0, a.queryAll)(this.options.animationSelector);
            if (l.call(n, function (n) {
                    var e = new Promise(function (t) {
                        n.addEventListener(s.transitionEndEvent, function (e) {
                            n == e.target && t()
                        })
                    });
                    t.push(e)
                }), Promise.all(t).then(function () {
                    s.triggerEvent("animationOutDone")
                }), null != this.scrollToElement) var i = r.url + this.scrollToElement;
            else i = r.url;
            e || this.createState(i)
        } else this.triggerEvent("animationSkipped");
        if (this.cache.exists(r.url)) {
            var o = new Promise(function (e) {
                e()
            });
            this.triggerEvent("pageRetrievedFromCache")
        } else if (this.preloadPromise && this.preloadPromise.route == r.url) o = this.preloadPromise;
        else var o = new Promise(function (i, o) {
            s.getPage(r, function (e, t) {
                if (500 === t.status) return s.triggerEvent("serverError"), void o(r.url);
                var n = s.getDataFromHtml(e, t);
                null != n ? (n.url = r.url, s.cache.cacheUrl(n, s.options.debugMode), s.triggerEvent("pageLoaded"), i()) : o(r.url)
            })
        });
        Promise.all(t.concat([o])).then(function () {
            s.renderPage(s.cache.getPage(r.url), e), s.preloadPromise = null
        }).catch(function (e) {
            s.options.skipPopStateHandling = function () {
                return window.location = e, !0
            }, window.history.go(-1)
        })
    }
}, function (e, t, n) {
    "use strict";
    var a = n(3),
        l = function (e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(5));
    var c = Array.prototype.forEach;
    e.exports = function (e, t) {
        var i = this;
        document.documentElement.classList.remove("is-leaving");
        var n = new l.default;
        n.setPath(e.responseURL), window.location.pathname !== n.getPath() && window.history.replaceState({
            url: n.getPath(),
            random: Math.random(),
            source: "swup"
        }, document.title, n.getPath()), t && !this.options.animateHistoryBrowsing || document.documentElement.classList.add("is-rendering"), this.triggerEvent("willReplaceContent");
        for (var o = 0; o < e.blocks.length; o++) document.body.querySelector('[data-swup="' + o + '"]').outerHTML = e.blocks[o];
        document.title = e.title, !1 !== this.options.pageClassPrefix && document.body.className.split(" ").forEach(function (e) {
            "" != e && e.includes(i.options.pageClassPrefix) && document.body.classList.remove(e)
        }), "" != e.pageClass && e.pageClass.split(" ").forEach(function (e) {
            "" != e && e.includes(i.options.pageClassPrefix) && document.body.classList.add(e)
        }), this.triggerEvent("contentReplaced"), this.triggerEvent("pageView"), this.options.cache || this.cache.empty(this.options.debugMode), setTimeout(function () {
            t && !i.options.animateHistoryBrowsing || (i.triggerEvent("animationInStart"), document.documentElement.classList.remove("is-animating"))
        }, 10), this.options.doScrollingRightAway && !this.scrollToElement || this.doScrolling(t);
        var r = (0, a.queryAll)(this.options.animationSelector),
            s = [];
        c.call(r, function (n) {
            var e = new Promise(function (t) {
                n.addEventListener(i.transitionEndEvent, function (e) {
                    n == e.target && t()
                })
            });
            s.push(e)
        }), this.preloadPages(), t && !this.options.animateHistoryBrowsing || Promise.all(s).then(function () {
            i.triggerEvent("animationInDone"), document.documentElement.className.split(" ").forEach(function (e) {
                (new RegExp("^to-").test(e) || "is-changing" === e || "is-rendering" === e || "is-popstate" === e) && document.documentElement.classList.remove(e)
            })
        }), this.getUrl(), this.scrollToElement = null
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e) {
        window.history.pushState({
            url: e || window.location.href.split(window.location.hostname)[1],
            random: Math.random(),
            source: "swup"
        }, document.getElementsByTagName("title")[0].innerText, e || window.location.href.split(window.location.hostname)[1])
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e, t) {
        this.options.debugMode && t || this.options.debugMode, this._handlers[e].forEach(function (e) {
            try {
                e(t)
            } catch (e) {}
        });
        var n = new CustomEvent("swup:" + e, {
            detail: e
        });
        document.dispatchEvent(n)
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function () {
        this.currentUrl = window.location.pathname + window.location.search
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e, t) {
        var n = this,
            i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this.options.animateScroll,
            o = 1 - this.options.scrollFriction,
            r = this.options.scrollAcceleration,
            s = 0,
            a = 0,
            l = 0,
            c = 0,
            u = 0,
            d = null;
        var h = function e() {
            ! function () {
                var e = c - s;
                p(e * r), s += a *= o
            }();
            f(), 1 === u && s < l || -1 === u && l < s ? d = requestAnimationFrame(e) : (window.scrollTo(0, l), n.triggerEvent("scrollDone"))
        };
        var p = function (e) {
                a += e
            },
            f = function () {
                window.scrollTo(0, s)
            };
        window.addEventListener("mousewheel", function (e) {
            d && (cancelAnimationFrame(d), d = null)
        }, {
            passive: !0
        });
        this.triggerEvent("scrollStart"), 0 == i ? (window.scrollTo(0, t), this.triggerEvent("scrollDone")) : function (e, t) {
            s = function () {
                return document.body.scrollTop || document.documentElement.scrollTop
            }(), c = e + (u = e < s ? -1 : 1), a = 0, s != (l = e) ? h() : n.triggerEvent("scrollDone")
        }(t)
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e) {
        var t = e.toString().toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
        return "/" == t[0] && (t = t.splice(1)), "" == t && (t = "homepage"), t
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e) {
        if (this.options.scroll && (!e || this.options.animateHistoryBrowsing))
            if (null != this.scrollToElement) {
                var t = document.querySelector(this.scrollToElement);
                if (null != t) {
                    var n = t.getBoundingClientRect().top + window.pageYOffset;
                    this.scrollTo(document.body, n)
                }
                this.scrollToElement = null
            } else this.scrollTo(document.body, 0)
    }
}, function (e, t, n) {
    "use strict";
    var s = n(3);
    e.exports = function (n) {
        for (var i = this, o = 0, r = 0; r < this.options.elements.length; r++) null == n.querySelector(this.options.elements[r]) || (0, s.queryAll)(this.options.elements[r]).forEach(function (e, t) {
            (0, s.queryAll)(i.options.elements[r], n)[t].dataset.swup = o, o++
        })
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e, t) {
        this._handlers[e] && this._handlers[e].push(t)
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e, t) {
        var n = this;
        if (null != e)
            if (null != t) {
                if (this._handlers[e] && this._handlers[e].filter(function (e) {
                        return e === t
                    }).length) {
                    var i = this._handlers[e].filter(function (e) {
                            return e === t
                        })[0],
                        o = this._handlers[e].indexOf(i); - 1 < o && this._handlers[e].splice(o, 1)
                }
            } else this._handlers[e] = [];
        else Object.keys(this._handlers).forEach(function (e) {
            n._handlers[e] = []
        })
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e, t, n) {
        "/" == e && (e = "/homepage"), "/" == t && (t = "/homepage"), this.transition = {
            from: e.replace("/", ""),
            to: t.replace("/", "")
        }, n && (this.transition.custom = n)
    }
}, function (e, t, n) {
    "use strict";
    var r = function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }(n(5));
    e.exports = function (e) {
        var i = this,
            o = new r.default;
        o.setPath(e), o.getAddress() == this.currentUrl || this.cache.exists(o.getAddress()) || null != this.preloadPromise || this.getPage({
            url: o.getAddress()
        }, function (e, t) {
            if (500 !== t.status) {
                var n = i.getDataFromHtml(e, t);
                null != n && (n.url = o.getAddress(), i.cache.cacheUrl(n, i.options.debugMode), i.triggerEvent("pagePreloaded"))
            } else i.triggerEvent("serverError")
        })
    }
}, function (e, t, n) {
    "use strict";
    var i = n(3);
    e.exports = function () {
        var t = this;
        this.options.preload && (0, i.queryAll)("[data-swup-preload]").forEach(function (e) {
            t.preloadPage(e.href)
        })
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e, t) {
        var n = this;
        t = Object.assign({}, e.options, t), e.options = t;
        return this.plugins.push(e), e.exec(t, this, function () {
            var e = n.cache.getPage(window.location.pathname + window.location.search),
                t = document.createElement("html");
            return t.innerHTML = e.originalContent, t
        }), this.plugins
    }
}, function (e, t, n) {
    "use strict";
    e.exports = function (e) {
        this.options.debugMode
    }
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        "use strict";
        void 0 === (s = "function" == typeof (r = function () {
            var n = function () {
                var e = window.Element.prototype;
                if (e.matches) return "matches";
                if (e.matchesSelector) return "matchesSelector";
                for (var t = ["webkit", "moz", "ms", "o"], n = 0; n < t.length; n++) {
                    var i = t[n],
                        o = i + "MatchesSelector";
                    if (e[o]) return o
                }
            }();
            return function (e, t) {
                return e[n](t)
            }
        }) ? r.call(i, o, i, n) : r) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        r = [o(7)], void 0 === (s = function (e) {
            return function (e, t) {
                "use strict";

                function n(e, t) {
                    this.element = e, this.parent = t, this.create()
                }
                var i = n.prototype;
                return i.create = function () {
                    this.element.style.position = "absolute", this.element.setAttribute("aria-selected", "false"), this.x = 0, this.shift = 0
                }, i.destroy = function () {
                    this.element.style.position = "";
                    var e = this.parent.originSide;
                    this.element.removeAttribute("aria-selected"), this.element.style[e] = ""
                }, i.getSize = function () {
                    this.size = t(this.element)
                }, i.setPosition = function (e) {
                    this.x = e, this.updateTarget(), this.renderPosition(e)
                }, i.updateTarget = i.setDefaultTarget = function () {
                    var e = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
                    this.target = this.x + this.size[e] + this.size.width * this.parent.cellAlign
                }, i.renderPosition = function (e) {
                    var t = this.parent.originSide;
                    this.element.style[t] = this.parent.getPositionValue(e)
                }, i.wrapShift = function (e) {
                    this.shift = e, this.renderPosition(this.x + this.parent.slideableWidth * e)
                }, i.remove = function () {
                    this.element.parentNode.removeChild(this.element)
                }, n
            }(0, e)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        void 0 === (s = "function" == typeof (r = function () {
            "use strict";

            function e(e) {
                this.parent = e, this.isOriginLeft = "left" == e.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
            }
            var t = e.prototype;
            return t.addCell = function (e) {
                if (this.cells.push(e), this.outerWidth += e.size.outerWidth, this.height = Math.max(e.size.outerHeight, this.height), 1 == this.cells.length) {
                    this.x = e.x;
                    var t = this.isOriginLeft ? "marginLeft" : "marginRight";
                    this.firstMargin = e.size[t]
                }
            }, t.updateTarget = function () {
                var e = this.isOriginLeft ? "marginRight" : "marginLeft",
                    t = this.getLastCell(),
                    n = t ? t.size[e] : 0,
                    i = this.outerWidth - (this.firstMargin + n);
                this.target = this.x + this.firstMargin + i * this.parent.cellAlign
            }, t.getLastCell = function () {
                return this.cells[this.cells.length - 1]
            }, t.select = function () {
                this.changeSelected(!0)
            }, t.unselect = function () {
                this.changeSelected(!1)
            }, t.changeSelected = function (t) {
                var n = t ? "add" : "remove";
                this.cells.forEach(function (e) {
                    e.element.classList[n]("is-selected"), e.element.setAttribute("aria-selected", t.toString())
                })
            }, t.getCellElements = function () {
                return this.cells.map(function (e) {
                    return e.element
                })
            }, e
        }) ? r.call(i, o, i, n) : r) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        r = [o(1)], void 0 === (s = function (e) {
            return function (e, r) {
                "use strict";
                var t = {
                    startAnimation: function () {
                        this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
                    },
                    animate: function () {
                        this.applyDragForce(), this.applySelectedAttraction();
                        var e = this.x;
                        if (this.integratePhysics(), this.positionSlider(), this.settle(e), this.isAnimating) {
                            var t = this;
                            requestAnimationFrame(function () {
                                t.animate()
                            })
                        }
                    }
                };
                return t.positionSlider = function () {
                    var e = this.x;
                    this.options.wrapAround && 1 < this.cells.length && (e = r.modulo(e, this.slideableWidth), e -= this.slideableWidth, this.shiftWrapCells(e)), e += this.cursorPosition, e = this.options.rightToLeft ? -e : e;
                    var t = this.getPositionValue(e);
                    this.slider.style.transform = this.isAnimating ? "translate3d(" + t + ",0,0)" : "translateX(" + t + ")";
                    var n = this.slides[0];
                    if (n) {
                        var i = -this.x - n.target,
                            o = i / this.slidesWidth;
                        this.dispatchEvent("scroll", null, [o, i])
                    }
                }, t.positionSliderAtSelected = function () {
                    this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider())
                }, t.getPositionValue = function (e) {
                    return this.options.percentPosition ? .01 * Math.round(e / this.size.innerWidth * 1e4) + "%" : Math.round(e) + "px"
                }, t.settle = function (e) {
                    this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * e) || this.restingFrames++, 2 < this.restingFrames && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]))
                }, t.shiftWrapCells = function (e) {
                    var t = this.cursorPosition + e;
                    this._shiftCells(this.beforeShiftCells, t, -1);
                    var n = this.size.innerWidth - (e + this.slideableWidth + this.cursorPosition);
                    this._shiftCells(this.afterShiftCells, n, 1)
                }, t._shiftCells = function (e, t, n) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i],
                            r = 0 < t ? n : 0;
                        o.wrapShift(r), t -= o.size.outerWidth
                    }
                }, t._unshiftCells = function (e) {
                    if (e && e.length)
                        for (var t = 0; t < e.length; t++) e[t].wrapShift(0)
                }, t.integratePhysics = function () {
                    this.x += this.velocity, this.velocity *= this.getFrictionFactor()
                }, t.applyForce = function (e) {
                    this.velocity += e
                }, t.getFrictionFactor = function () {
                    return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
                }, t.getRestingPosition = function () {
                    return this.x + this.velocity / (1 - this.getFrictionFactor())
                }, t.applyDragForce = function () {
                    if (this.isDraggable && this.isPointerDown) {
                        var e = this.dragX - this.x - this.velocity;
                        this.applyForce(e)
                    }
                }, t.applySelectedAttraction = function () {
                    if ((!this.isDraggable || !this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                        var e = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                        this.applyForce(e)
                    }
                }, t
            }(0, e)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (t, n, o) {
    var r, s;
    ! function (i, e) {
        r = [o(2), o(48), o(1)], void 0 === (s = function (e, t, n) {
            return function (i, e, t, a) {
                "use strict";
                a.extend(e.defaults, {
                    draggable: ">1",
                    dragThreshold: 3
                }), e.createMethods.push("_createDrag");
                var n = e.prototype;
                a.extend(n, t.prototype), n._touchActionValue = "pan-y";
                var o = "createTouch" in document,
                    r = !1;
                n._createDrag = function () {
                    this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), o && !r && (i.addEventListener("touchmove", function () {}), r = !0)
                }, n.onActivateDrag = function () {
                    this.handles = [this.viewport], this.bindHandles(), this.updateDraggable()
                }, n.onDeactivateDrag = function () {
                    this.unbindHandles(), this.element.classList.remove("is-draggable")
                }, n.updateDraggable = function () {
                    ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
                }, n.bindDrag = function () {
                    this.options.draggable = !0, this.updateDraggable()
                }, n.unbindDrag = function () {
                    this.options.draggable = !1, this.updateDraggable()
                }, n._uiChangeDrag = function () {
                    delete this.isFreeScrolling
                }, n._childUIPointerDownDrag = function (e) {
                    e.preventDefault(), this.pointerDownFocus(e)
                }, n.pointerDown = function (e, t) {
                    if (this.isDraggable) {
                        var n = this.okayPointerDown(e);
                        n && (this._pointerDownPreventDefault(e), this.pointerDownFocus(e), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = l(), i.addEventListener("scroll", this), this._pointerDownDefault(e, t))
                    } else this._pointerDownDefault(e, t)
                }, n._pointerDownDefault = function (e, t) {
                    this.pointerDownPointer = t, this._bindPostStartEvents(e), this.dispatchEvent("pointerDown", e, [t])
                };
                var s = {
                    INPUT: !0,
                    TEXTAREA: !0,
                    SELECT: !0
                };

                function l() {
                    return {
                        x: i.pageXOffset,
                        y: i.pageYOffset
                    }
                }
                return n.pointerDownFocus = function (e) {
                    s[e.target.nodeName] || this.focus()
                }, n._pointerDownPreventDefault = function (e) {
                    var t = "touchstart" == e.type,
                        n = "touch" == e.pointerType,
                        i = s[e.target.nodeName];
                    t || n || i || e.preventDefault()
                }, n.hasDragStarted = function (e) {
                    return Math.abs(e.x) > this.options.dragThreshold
                }, n.pointerUp = function (e, t) {
                    delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", e, [t]), this._dragPointerUp(e, t)
                }, n.pointerDone = function () {
                    i.removeEventListener("scroll", this), delete this.pointerDownScroll
                }, n.dragStart = function (e, t) {
                    this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), i.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [t]))
                }, n.pointerMove = function (e, t) {
                    var n = this._dragPointerMove(e, t);
                    this.dispatchEvent("pointerMove", e, [t, n]), this._dragMove(e, t, n)
                }, n.dragMove = function (e, t, n) {
                    if (this.isDraggable) {
                        e.preventDefault(), this.previousDragX = this.dragX;
                        var i = this.options.rightToLeft ? -1 : 1;
                        this.options.wrapAround && (n.x = n.x % this.slideableWidth);
                        var o = this.dragStartPosition + n.x * i;
                        if (!this.options.wrapAround && this.slides.length) {
                            var r = Math.max(-this.slides[0].target, this.dragStartPosition);
                            o = r < o ? .5 * (o + r) : o;
                            var s = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                            o = o < s ? .5 * (o + s) : o
                        }
                        this.dragX = o, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", e, [t, n])
                    }
                }, n.dragEnd = function (e, t) {
                    if (this.isDraggable) {
                        this.options.freeScroll && (this.isFreeScrolling = !0);
                        var n = this.dragEndRestingSelect();
                        if (this.options.freeScroll && !this.options.wrapAround) {
                            var i = this.getRestingPosition();
                            this.isFreeScrolling = -i > this.slides[0].target && -i < this.getLastSlide().target
                        } else this.options.freeScroll || n != this.selectedIndex || (n += this.dragEndBoostSelect());
                        delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(n), delete this.isDragSelect, this.dispatchEvent("dragEnd", e, [t])
                    }
                }, n.dragEndRestingSelect = function () {
                    var e = this.getRestingPosition(),
                        t = Math.abs(this.getSlideDistance(-e, this.selectedIndex)),
                        n = this._getClosestResting(e, t, 1),
                        i = this._getClosestResting(e, t, -1);
                    return n.distance < i.distance ? n.index : i.index
                }, n._getClosestResting = function (e, t, n) {
                    for (var i = this.selectedIndex, o = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function (e, t) {
                            return e <= t
                        } : function (e, t) {
                            return e < t
                        }; r(t, o) && (i += n, o = t, null !== (t = this.getSlideDistance(-e, i)));) t = Math.abs(t);
                    return {
                        distance: o,
                        index: i - n
                    }
                }, n.getSlideDistance = function (e, t) {
                    var n = this.slides.length,
                        i = this.options.wrapAround && 1 < n,
                        o = i ? a.modulo(t, n) : t,
                        r = this.slides[o];
                    if (!r) return null;
                    var s = i ? this.slideableWidth * Math.floor(t / n) : 0;
                    return e - (r.target + s)
                }, n.dragEndBoostSelect = function () {
                    if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date - this.dragMoveTime) return 0;
                    var e = this.getSlideDistance(-this.dragX, this.selectedIndex),
                        t = this.previousDragX - this.dragX;
                    return 0 < e && 0 < t ? 1 : e < 0 && t < 0 ? -1 : 0
                }, n.staticClick = function (e, t) {
                    var n = this.getParentCell(e.target),
                        i = n && n.element,
                        o = n && this.cells.indexOf(n);
                    this.dispatchEvent("staticClick", e, [t, i, o])
                }, n.onscroll = function () {
                    var e = l(),
                        t = this.pointerDownScroll.x - e.x,
                        n = this.pointerDownScroll.y - e.y;
                    (3 < Math.abs(t) || 3 < Math.abs(n)) && this._pointerDone()
                }, e
            }(i, e, t, n)
        }.apply(n, r)) || (t.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (t, e) {
        r = [o(8)], void 0 === (s = function (e) {
            return function (r, e) {
                "use strict";

                function t() {}
                var n = t.prototype = Object.create(e.prototype);
                n.bindHandles = function () {
                    this._bindHandles(!0)
                }, n.unbindHandles = function () {
                    this._bindHandles(!1)
                }, n._bindHandles = function (e) {
                    for (var t = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", n = e ? this._touchActionValue : "", i = 0; i < this.handles.length; i++) {
                        var o = this.handles[i];
                        this._bindStartEvent(o, e), o[t]("click", this), r.PointerEvent && (o.style.touchAction = n)
                    }
                }, n._touchActionValue = "none", n.pointerDown = function (e, t) {
                    var n = this.okayPointerDown(e);
                    n && (this.pointerDownPointer = t, e.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t]))
                };
                var o = {
                        TEXTAREA: !0,
                        INPUT: !0,
                        SELECT: !0,
                        OPTION: !0
                    },
                    s = {
                        radio: !0,
                        checkbox: !0,
                        button: !0,
                        submit: !0,
                        image: !0,
                        file: !0
                    };
                return n.okayPointerDown = function (e) {
                    var t = o[e.target.nodeName],
                        n = s[e.target.type],
                        i = !t || n;
                    return i || this._pointerReset(), i
                }, n.pointerDownBlur = function () {
                    var e = document.activeElement;
                    e && e.blur && e != document.body && e.blur()
                }, n.pointerMove = function (e, t) {
                    var n = this._dragPointerMove(e, t);
                    this.emitEvent("pointerMove", [e, t, n]), this._dragMove(e, t, n)
                }, n._dragPointerMove = function (e, t) {
                    var n = {
                        x: t.pageX - this.pointerDownPointer.pageX,
                        y: t.pageY - this.pointerDownPointer.pageY
                    };
                    return !this.isDragging && this.hasDragStarted(n) && this._dragStart(e, t), n
                }, n.hasDragStarted = function (e) {
                    return 3 < Math.abs(e.x) || 3 < Math.abs(e.y)
                }, n.pointerUp = function (e, t) {
                    this.emitEvent("pointerUp", [e, t]), this._dragPointerUp(e, t)
                }, n._dragPointerUp = function (e, t) {
                    this.isDragging ? this._dragEnd(e, t) : this._staticClick(e, t)
                }, n._dragStart = function (e, t) {
                    this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(e, t)
                }, n.dragStart = function (e, t) {
                    this.emitEvent("dragStart", [e, t])
                }, n._dragMove = function (e, t, n) {
                    this.isDragging && this.dragMove(e, t, n)
                }, n.dragMove = function (e, t, n) {
                    e.preventDefault(), this.emitEvent("dragMove", [e, t, n])
                }, n._dragEnd = function (e, t) {
                    this.isDragging = !1, setTimeout(function () {
                        delete this.isPreventingClicks
                    }.bind(this)), this.dragEnd(e, t)
                }, n.dragEnd = function (e, t) {
                    this.emitEvent("dragEnd", [e, t])
                }, n.onclick = function (e) {
                    this.isPreventingClicks && e.preventDefault()
                }, n._staticClick = function (e, t) {
                    this.isIgnoringMouseUp && "mouseup" == e.type || (this.staticClick(e, t), "mouseup" != e.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
                        delete this.isIgnoringMouseUp
                    }.bind(this), 400)))
                }, n.staticClick = function (e, t) {
                    this.emitEvent("staticClick", [e, t])
                }, t.getPointerPoint = e.getPointerPoint, t
            }(t, e)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        r = [o(2), o(9), o(1)], void 0 === (s = function (e, t, n) {
            return function (e, t, n, i) {
                "use strict";
                var o = "http://www.w3.org/2000/svg";

                function r(e, t) {
                    this.direction = e, this.parent = t, this._create()
                }(r.prototype = Object.create(n.prototype))._create = function () {
                    this.isEnabled = !0, this.isPrevious = -1 == this.direction;
                    var e = this.parent.options.rightToLeft ? 1 : -1;
                    this.isLeft = this.direction == e;
                    var t = this.element = document.createElement("button");
                    t.className = "flickity-button flickity-prev-next-button", t.className += this.isPrevious ? " previous" : " next", t.setAttribute("type", "button"), this.disable(), t.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
                    var n = this.createSVG();
                    t.appendChild(n), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
                }, r.prototype.activate = function () {
                    this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
                }, r.prototype.deactivate = function () {
                    this.parent.element.removeChild(this.element), n.prototype.destroy.call(this), this.element.removeEventListener("click", this)
                }, r.prototype.createSVG = function () {
                    var e = document.createElementNS(o, "svg");
                    e.setAttribute("class", "flickity-button-icon"), e.setAttribute("viewBox", "0 0 100 100");
                    var t = document.createElementNS(o, "path"),
                        n = function (e) {
                            return "string" != typeof e ? "M " + e.x0 + ",50 L " + e.x1 + "," + (e.y1 + 50) + " L " + e.x2 + "," + (e.y2 + 50) + " L " + e.x3 + ",50  L " + e.x2 + "," + (50 - e.y2) + " L " + e.x1 + "," + (50 - e.y1) + " Z" : e
                        }(this.parent.options.arrowShape);
                    return t.setAttribute("d", n), t.setAttribute("class", "arrow"), this.isLeft || t.setAttribute("transform", "translate(100, 100) rotate(180) "), e.appendChild(t), e
                }, r.prototype.onTap = function () {
                    if (this.isEnabled) {
                        this.parent.uiChange();
                        var e = this.isPrevious ? "previous" : "next";
                        this.parent[e]()
                    }
                }, r.prototype.handleEvent = i.handleEvent, r.prototype.onclick = function (e) {
                    var t = document.activeElement;
                    t && t == this.element && this.onTap(e, e)
                }, r.prototype.enable = function () {
                    this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
                }, r.prototype.disable = function () {
                    this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
                }, r.prototype.update = function () {
                    var e = this.parent.slides;
                    if (this.parent.options.wrapAround && 1 < e.length) this.enable();
                    else {
                        var t = e.length ? e.length - 1 : 0,
                            n = this.isPrevious ? 0 : t,
                            i = this.parent.selectedIndex == n ? "disable" : "enable";
                        this[i]()
                    }
                }, r.prototype.destroy = function () {
                    this.deactivate()
                }, i.extend(t.defaults, {
                    prevNextButtons: !0,
                    arrowShape: {
                        x0: 10,
                        x1: 60,
                        y1: 50,
                        x2: 70,
                        y2: 40,
                        x3: 30
                    }
                }), t.createMethods.push("_createPrevNextButtons");
                var s = t.prototype;
                return s._createPrevNextButtons = function () {
                    this.options.prevNextButtons && (this.prevButton = new r(-1, this), this.nextButton = new r(1, this), this.on("activate", this.activatePrevNextButtons))
                }, s.activatePrevNextButtons = function () {
                    this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
                }, s.deactivatePrevNextButtons = function () {
                    this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
                }, t.PrevNextButton = r, t
            }(0, e, t, n)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        r = [o(2), o(9), o(1)], void 0 === (s = function (e, t, n) {
            return function (e, t, n, i) {
                "use strict";

                function o(e) {
                    this.parent = e, this._create()
                }(o.prototype = new n)._create = function () {
                    this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
                }, o.prototype.activate = function () {
                    this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
                }, o.prototype.deactivate = function () {
                    this.parent.element.removeChild(this.holder), n.prototype.destroy.call(this)
                }, o.prototype.setDots = function () {
                    var e = this.parent.slides.length - this.dots.length;
                    0 < e ? this.addDots(e) : e < 0 && this.removeDots(-e)
                }, o.prototype.addDots = function (e) {
                    for (var t = document.createDocumentFragment(), n = [], i = this.dots.length, o = i + e, r = i; r < o; r++) {
                        var s = document.createElement("li");
                        s.className = "dot", s.setAttribute("aria-label", "Page dot " + (r + 1)), t.appendChild(s), n.push(s)
                    }
                    this.holder.appendChild(t), this.dots = this.dots.concat(n)
                }, o.prototype.removeDots = function (e) {
                    var t = this.dots.splice(this.dots.length - e, e);
                    t.forEach(function (e) {
                        this.holder.removeChild(e)
                    }, this)
                }, o.prototype.updateSelected = function () {
                    this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"))
                }, o.prototype.onTap = function (e) {
                    var t = e.target;
                    if ("LI" == t.nodeName) {
                        this.parent.uiChange();
                        var n = this.dots.indexOf(t);
                        this.parent.select(n)
                    }
                }, o.prototype.destroy = function () {
                    this.deactivate()
                }, t.PageDots = o, i.extend(t.defaults, {
                    pageDots: !0
                }), t.createMethods.push("_createPageDots");
                var r = t.prototype;
                return r._createPageDots = function () {
                    this.options.pageDots && (this.pageDots = new o(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
                }, r.activatePageDots = function () {
                    this.pageDots.activate()
                }, r.updateSelectedPageDots = function () {
                    this.pageDots.updateSelected()
                }, r.updatePageDots = function () {
                    this.pageDots.setDots()
                }, r.deactivatePageDots = function () {
                    this.pageDots.deactivate()
                }, t.PageDots = o, t
            }(0, e, t, n)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        r = [o(6), o(1), o(2)], void 0 === (s = function (e, t, n) {
            return function (e, t, n) {
                "use strict";

                function i(e) {
                    this.parent = e, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this)
                }(i.prototype = Object.create(e.prototype)).play = function () {
                    if ("playing" != this.state) {
                        var e = document.hidden;
                        e ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick())
                    }
                }, i.prototype.tick = function () {
                    if ("playing" == this.state) {
                        var e = this.parent.options.autoPlay;
                        e = "number" == typeof e ? e : 3e3;
                        var t = this;
                        this.clear(), this.timeout = setTimeout(function () {
                            t.parent.next(!0), t.tick()
                        }, e)
                    }
                }, i.prototype.stop = function () {
                    this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange)
                }, i.prototype.clear = function () {
                    clearTimeout(this.timeout)
                }, i.prototype.pause = function () {
                    "playing" == this.state && (this.state = "paused", this.clear())
                }, i.prototype.unpause = function () {
                    "paused" == this.state && this.play()
                }, i.prototype.visibilityChange = function () {
                    var e = document.hidden;
                    this[e ? "pause" : "unpause"]()
                }, i.prototype.visibilityPlay = function () {
                    this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay)
                }, t.extend(n.defaults, {
                    pauseAutoPlayOnHover: !0
                }), n.createMethods.push("_createPlayer");
                var o = n.prototype;
                return o._createPlayer = function () {
                    this.player = new i(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
                }, o.activatePlayer = function () {
                    this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
                }, o.playPlayer = function () {
                    this.player.play()
                }, o.stopPlayer = function () {
                    this.player.stop()
                }, o.pausePlayer = function () {
                    this.player.pause()
                }, o.unpausePlayer = function () {
                    this.player.unpause()
                }, o.deactivatePlayer = function () {
                    this.player.stop(), this.element.removeEventListener("mouseenter", this)
                }, o.onmouseenter = function () {
                    this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
                }, o.onmouseleave = function () {
                    this.player.unpause(), this.element.removeEventListener("mouseleave", this)
                }, n.Player = i, n
            }(e, t, n)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        r = [o(2), o(1)], void 0 === (s = function (e, t) {
            return function (e, t, i) {
                "use strict";
                var n = t.prototype;
                return n.insert = function (e, t) {
                    var n = this._makeCells(e);
                    if (n && n.length) {
                        var i = this.cells.length;
                        t = void 0 === t ? i : t;
                        var o = function (e) {
                                var t = document.createDocumentFragment();
                                return e.forEach(function (e) {
                                    t.appendChild(e.element)
                                }), t
                            }(n),
                            r = t == i;
                        if (r) this.slider.appendChild(o);
                        else {
                            var s = this.cells[t].element;
                            this.slider.insertBefore(o, s)
                        }
                        if (0 === t) this.cells = n.concat(this.cells);
                        else if (r) this.cells = this.cells.concat(n);
                        else {
                            var a = this.cells.splice(t, i - t);
                            this.cells = this.cells.concat(n).concat(a)
                        }
                        this._sizeCells(n), this.cellChange(t, !0)
                    }
                }, n.append = function (e) {
                    this.insert(e, this.cells.length)
                }, n.prepend = function (e) {
                    this.insert(e, 0)
                }, n.remove = function (e) {
                    var t = this.getCells(e);
                    if (t && t.length) {
                        var n = this.cells.length - 1;
                        t.forEach(function (e) {
                            e.remove();
                            var t = this.cells.indexOf(e);
                            n = Math.min(t, n), i.removeFrom(this.cells, e)
                        }, this), this.cellChange(n, !0)
                    }
                }, n.cellSizeChange = function (e) {
                    var t = this.getCell(e);
                    if (t) {
                        t.getSize();
                        var n = this.cells.indexOf(t);
                        this.cellChange(n)
                    }
                }, n.cellChange = function (e, t) {
                    var n = this.selectedElement;
                    this._positionCells(e), this._getWrapShiftCells(), this.setGallerySize();
                    var i = this.getCell(n);
                    i && (this.selectedIndex = this.getCellSlideIndex(i)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [e]), this.select(this.selectedIndex), t && this.positionSliderAtSelected()
                }, t
            }(0, e, t)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (n, i, o) {
    var r, s;
    ! function (e, t) {
        r = [o(2), o(1)], void 0 === (s = function (e, t) {
            return function (e, t, r) {
                "use strict";
                t.createMethods.push("_createLazyload");
                var n = t.prototype;

                function o(e, t) {
                    this.img = e, this.flickity = t, this.load()
                }
                return n._createLazyload = function () {
                    this.on("select", this.lazyLoad)
                }, n.lazyLoad = function () {
                    var e = this.options.lazyLoad;
                    if (e) {
                        var t = "number" == typeof e ? e : 0,
                            n = this.getAdjacentCellElements(t),
                            i = [];
                        n.forEach(function (e) {
                            var t = function (e) {
                                if ("IMG" == e.nodeName) {
                                    var t = e.getAttribute("data-flickity-lazyload"),
                                        n = e.getAttribute("data-flickity-lazyload-src"),
                                        i = e.getAttribute("data-flickity-lazyload-srcset");
                                    if (t || n || i) return [e]
                                }
                                var o = e.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
                                return r.makeArray(o)
                            }(e);
                            i = i.concat(t)
                        }), i.forEach(function (e) {
                            new o(e, this)
                        }, this)
                    }
                }, o.prototype.handleEvent = r.handleEvent, o.prototype.load = function () {
                    this.img.addEventListener("load", this), this.img.addEventListener("error", this);
                    var e = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
                        t = this.img.getAttribute("data-flickity-lazyload-srcset");
                    this.img.src = e, t && this.img.setAttribute("srcset", t), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset")
                }, o.prototype.onload = function (e) {
                    this.complete(e, "flickity-lazyloaded")
                }, o.prototype.onerror = function (e) {
                    this.complete(e, "flickity-lazyerror")
                }, o.prototype.complete = function (e, t) {
                    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
                    var n = this.flickity.getParentCell(this.img),
                        i = n && n.element;
                    this.flickity.cellSizeChange(i), this.img.classList.add(t), this.flickity.dispatchEvent("lazyLoad", e, i)
                }, t.LazyLoader = o, t
            }(0, e, t)
        }.apply(i, r)) || (n.exports = s)
    }(window)
}, function (e, t) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function () {
        return !("undefined" == typeof window || !("ontouchstart" in window || window.DocumentTouch && "undefined" != typeof document && document instanceof window.DocumentTouch)) || !("undefined" == typeof navigator || !navigator.maxTouchPoints && !navigator.msMaxTouchPoints)
    }, e.exports = t.default
}, function (w, e, k) {
    "use strict";
    (function (t) {
        function r(e, t) {
            if (e === t) return 0;
            for (var n = e.length, i = t.length, o = 0, r = Math.min(n, i); o < r; ++o)
                if (e[o] !== t[o]) {
                    n = e[o], i = t[o];
                    break
                } return n < i ? -1 : i < n ? 1 : 0
        }

        function s(e) {
            return t.Buffer && "function" == typeof t.Buffer.isBuffer ? t.Buffer.isBuffer(e) : !(null == e || !e._isBuffer)
        }
        var u = k(56),
            i = Object.prototype.hasOwnProperty,
            d = Array.prototype.slice,
            n = function () {
                return "foo" === function () {}.name
            }();

        function a(e) {
            return Object.prototype.toString.call(e)
        }

        function l(e) {
            return !s(e) && ("function" == typeof t.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : !!e && (e instanceof DataView || !!(e.buffer && e.buffer instanceof ArrayBuffer))))
        }
        var c = w.exports = e,
            o = /\s*function\s+([^\(\s]*)\s*/;

        function h(e) {
            if (u.isFunction(e)) {
                if (n) return e.name;
                var t = e.toString().match(o);
                return t && t[1]
            }
        }

        function p(e, t) {
            return "string" == typeof e ? e.length < t ? e : e.slice(0, t) : e
        }

        function f(e) {
            if (n || !u.isFunction(e)) return u.inspect(e);
            var t = h(e);
            return "[Function" + (t ? ": " + t : "") + "]"
        }

        function m(e, t, n, i, o) {
            throw new c.AssertionError({
                message: n,
                actual: e,
                expected: t,
                operator: i,
                stackStartFunction: o
            })
        }

        function e(e, t) {
            e || m(e, !0, t, "==", c.ok)
        }

        function g(e, t, n, i) {
            if (e === t) return !0;
            if (s(e) && s(t)) return 0 === r(e, t);
            if (u.isDate(e) && u.isDate(t)) return e.getTime() === t.getTime();
            if (u.isRegExp(e) && u.isRegExp(t)) return e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase;
            if (null !== e && "object" == typeof e || null !== t && "object" == typeof t) {
                if (l(e) && l(t) && a(e) === a(t) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === r(new Uint8Array(e.buffer), new Uint8Array(t.buffer));
                if (s(e) !== s(t)) return !1;
                var o = (i = i || {
                    actual: [],
                    expected: []
                }).actual.indexOf(e);
                return -1 !== o && o === i.expected.indexOf(t) || (i.actual.push(e), i.expected.push(t), function (e, t, n, i) {
                    if (null == e || null == t) return !1;
                    if (u.isPrimitive(e) || u.isPrimitive(t)) return e === t;
                    if (n && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return !1;
                    var o = v(e),
                        r = v(t);
                    if (o && !r || !o && r) return !1;
                    if (o) return e = d.call(e), t = d.call(t), g(e, t, n);
                    var s, a, l = _(e),
                        c = _(t);
                    if (l.length !== c.length) return !1;
                    for (l.sort(), c.sort(), a = l.length - 1; 0 <= a; a--)
                        if (l[a] !== c[a]) return !1;
                    for (a = l.length - 1; 0 <= a; a--)
                        if (s = l[a], !g(e[s], t[s], n, i)) return !1;
                    return !0
                }(e, t, n, i))
            }
            return n ? e === t : e == t
        }

        function v(e) {
            return "[object Arguments]" == Object.prototype.toString.call(e)
        }

        function y(e, t) {
            if (!e || !t) return !1;
            if ("[object RegExp]" == Object.prototype.toString.call(t)) return t.test(e);
            try {
                if (e instanceof t) return !0
            } catch (e) {}
            return !Error.isPrototypeOf(t) && !0 === t.call({}, e)
        }

        function b(e, t, n, i) {
            var o;
            if ("function" != typeof t) throw new TypeError('"block" argument must be a function');
            "string" == typeof n && (i = n, n = null), o = function (e) {
                var t;
                try {
                    e()
                } catch (e) {
                    t = e
                }
                return t
            }(t), i = (n && n.name ? " (" + n.name + ")." : ".") + (i ? " " + i : "."), e && !o && m(o, n, "Missing expected exception" + i);
            var r = "string" == typeof i,
                s = !e && o && !n;
            if ((!e && u.isError(o) && r && y(o, n) || s) && m(o, n, "Got unwanted exception" + i), e && o && n && !y(o, n) || !e && o) throw o
        }
        c.AssertionError = function (e) {
            this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = function (e) {
                return p(f(e.actual), 128) + " " + e.operator + " " + p(f(e.expected), 128)
            }(this), this.generatedMessage = !0);
            var t = e.stackStartFunction || m;
            if (Error.captureStackTrace) Error.captureStackTrace(this, t);
            else {
                var n = new Error;
                if (n.stack) {
                    var i = n.stack,
                        o = h(t),
                        r = i.indexOf("\n" + o);
                    if (0 <= r) {
                        var s = i.indexOf("\n", r + 1);
                        i = i.substring(s + 1)
                    }
                    this.stack = i
                }
            }
        }, u.inherits(c.AssertionError, Error), c.fail = m, c.ok = e, c.equal = function (e, t, n) {
            e != t && m(e, t, n, "==", c.equal)
        }, c.notEqual = function (e, t, n) {
            e == t && m(e, t, n, "!=", c.notEqual)
        }, c.deepEqual = function (e, t, n) {
            g(e, t, !1) || m(e, t, n, "deepEqual", c.deepEqual)
        }, c.deepStrictEqual = function (e, t, n) {
            g(e, t, !0) || m(e, t, n, "deepStrictEqual", c.deepStrictEqual)
        }, c.notDeepEqual = function (e, t, n) {
            g(e, t, !1) && m(e, t, n, "notDeepEqual", c.notDeepEqual)
        }, c.notDeepStrictEqual = function e(t, n, i) {
            g(t, n, !0) && m(t, n, i, "notDeepStrictEqual", e)
        }, c.strictEqual = function (e, t, n) {
            e !== t && m(e, t, n, "===", c.strictEqual)
        }, c.notStrictEqual = function (e, t, n) {
            e === t && m(e, t, n, "!==", c.notStrictEqual)
        }, c.throws = function (e, t, n) {
            b(!0, e, t, n)
        }, c.doesNotThrow = function (e, t, n) {
            b(!1, e, t, n)
        }, c.ifError = function (e) {
            if (e) throw e
        };
        var _ = Object.keys || function (e) {
            var t = [];
            for (var n in e) i.call(e, n) && t.push(n);
            return t
        }
    }).call(this, k(4))
}, function (e, S, d) {
    (function (i, o) {
        var a = /%[sdj%]/g;
        S.format = function (e) {
            if (!b(e)) {
                for (var t = [], n = 0; n < arguments.length; n++) t.push(l(arguments[n]));
                return t.join(" ")
            }
            n = 1;
            for (var i = arguments, o = i.length, r = String(e).replace(a, function (e) {
                    if ("%%" === e) return "%";
                    if (o <= n) return e;
                    switch (e) {
                        case "%s":
                            return String(i[n++]);
                        case "%d":
                            return Number(i[n++]);
                        case "%j":
                            try {
                                return JSON.stringify(i[n++])
                            } catch (e) {
                                return "[Circular]"
                            }
                            default:
                                return e
                    }
                }), s = i[n]; n < o; s = i[++n]) v(s) || !c(s) ? r += " " + s : r += " " + l(s);
            return r
        }, S.deprecate = function (e, t) {
            if (_(i.process)) return function () {
                return S.deprecate(e, t).apply(this, arguments)
            };
            if (!0 === o.noDeprecation) return e;
            var n = !1;
            return function () {
                if (!n) {
                    if (o.throwDeprecation) throw new Error(t);
                    o.traceDeprecation, n = !0
                }
                return e.apply(this, arguments)
            }
        };
        var t, n = {};

        function l(e, t) {
            var n = {
                seen: [],
                stylize: s
            };
            return 3 <= arguments.length && (n.depth = arguments[2]), 4 <= arguments.length && (n.colors = arguments[3]), g(t) ? n.showHidden = t : t && S._extend(n, t), _(n.showHidden) && (n.showHidden = !1), _(n.depth) && (n.depth = 2), _(n.colors) && (n.colors = !1), _(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = r), h(n, e, n.depth)
        }

        function r(e, t) {
            var n = l.styles[t];
            return n ? "[" + l.colors[n][0] + "m" + e + "[" + l.colors[n][1] + "m" : e
        }

        function s(e, t) {
            return e
        }

        function h(t, n, i) {
            if (t.customInspect && n && A(n.inspect) && n.inspect !== S.inspect && (!n.constructor || n.constructor.prototype !== n)) {
                var e = n.inspect(i, t);
                return b(e) || (e = h(t, e, i)), e
            }
            var o = function (e, t) {
                if (_(t)) return e.stylize("undefined", "undefined");
                if (b(t)) {
                    var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(n, "string")
                }
                if (y(t)) return e.stylize("" + t, "number");
                if (g(t)) return e.stylize("" + t, "boolean");
                if (v(t)) return e.stylize("null", "null")
            }(t, n);
            if (o) return o;
            var r = Object.keys(n),
                s = function (e) {
                    var n = {};
                    return e.forEach(function (e, t) {
                        n[e] = !0
                    }), n
                }(r);
            if (t.showHidden && (r = Object.getOwnPropertyNames(n)), E(n) && (0 <= r.indexOf("message") || 0 <= r.indexOf("description"))) return p(n);
            if (0 === r.length) {
                if (A(n)) {
                    var a = n.name ? ": " + n.name : "";
                    return t.stylize("[Function" + a + "]", "special")
                }
                if (w(n)) return t.stylize(RegExp.prototype.toString.call(n), "regexp");
                if (k(n)) return t.stylize(Date.prototype.toString.call(n), "date");
                if (E(n)) return p(n)
            }
            var l, c = "",
                u = !1,
                d = ["{", "}"];
            (m(n) && (u = !0, d = ["[", "]"]), A(n)) && (c = " [Function" + (n.name ? ": " + n.name : "") + "]");
            return w(n) && (c = " " + RegExp.prototype.toString.call(n)), k(n) && (c = " " + Date.prototype.toUTCString.call(n)), E(n) && (c = " " + p(n)), 0 !== r.length || u && 0 != n.length ? i < 0 ? w(n) ? t.stylize(RegExp.prototype.toString.call(n), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(n), l = u ? function (t, n, i, o, e) {
                for (var r = [], s = 0, a = n.length; s < a; ++s) T(n, String(s)) ? r.push(f(t, n, i, o, String(s), !0)) : r.push("");
                return e.forEach(function (e) {
                    e.match(/^\d+$/) || r.push(f(t, n, i, o, e, !0))
                }), r
            }(t, n, i, s, r) : r.map(function (e) {
                return f(t, n, i, s, e, u)
            }), t.seen.pop(), function (e, t, n) {
                if (60 < e.reduce(function (e, t) {
                        return 0, 0 <= t.indexOf("\n") && 0, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                    }, 0)) return n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1];
                return n[0] + t + " " + e.join(", ") + " " + n[1]
            }(l, c, d)) : d[0] + c + d[1]
        }

        function p(e) {
            return "[" + Error.prototype.toString.call(e) + "]"
        }

        function f(e, t, n, i, o, r) {
            var s, a, l;
            if ((l = Object.getOwnPropertyDescriptor(t, o) || {
                    value: t[o]
                }).get ? a = l.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : l.set && (a = e.stylize("[Setter]", "special")), T(i, o) || (s = "[" + o + "]"), a || (e.seen.indexOf(l.value) < 0 ? -1 < (a = v(n) ? h(e, l.value, null) : h(e, l.value, n - 1)).indexOf("\n") && (a = r ? a.split("\n").map(function (e) {
                    return "  " + e
                }).join("\n").substr(2) : "\n" + a.split("\n").map(function (e) {
                    return "   " + e
                }).join("\n")) : a = e.stylize("[Circular]", "special")), _(s)) {
                if (r && o.match(/^\d+$/)) return a;
                s = (s = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), e.stylize(s, "string"))
            }
            return s + ": " + a
        }

        function m(e) {
            return Array.isArray(e)
        }

        function g(e) {
            return "boolean" == typeof e
        }

        function v(e) {
            return null === e
        }

        function y(e) {
            return "number" == typeof e
        }

        function b(e) {
            return "string" == typeof e
        }

        function _(e) {
            return void 0 === e
        }

        function w(e) {
            return c(e) && "[object RegExp]" === u(e)
        }

        function c(e) {
            return "object" == typeof e && null !== e
        }

        function k(e) {
            return c(e) && "[object Date]" === u(e)
        }

        function E(e) {
            return c(e) && ("[object Error]" === u(e) || e instanceof Error)
        }

        function A(e) {
            return "function" == typeof e
        }

        function u(e) {
            return Object.prototype.toString.call(e)
        }
        S.debuglog = function (e) {
            if (_(t) && (t = o.env.NODE_DEBUG || ""), e = e.toUpperCase(), !n[e])
                if (new RegExp("\\b" + e + "\\b", "i").test(t)) {
                    o.pid;
                    n[e] = function () {
                        S.format.apply(S, arguments)
                    }
                } else n[e] = function () {};
            return n[e]
        }, (S.inspect = l).colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39]
        }, l.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            null: "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        }, S.isArray = m, S.isBoolean = g, S.isNull = v, S.isNullOrUndefined = function (e) {
            return null == e
        }, S.isNumber = y, S.isString = b, S.isSymbol = function (e) {
            return "symbol" == typeof e
        }, S.isUndefined = _, S.isRegExp = w, S.isObject = c, S.isDate = k, S.isError = E, S.isFunction = A, S.isPrimitive = function (e) {
            return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
        }, S.isBuffer = d(58);

        function T(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        S.log = function () {}, S.inherits = d(59), S._extend = function (e, t) {
            if (!t || !c(t)) return e;
            for (var n = Object.keys(t), i = n.length; i--;) e[n[i]] = t[n[i]];
            return e
        }
    }).call(this, d(4), d(57))
}, function (e, t) {
    var n, i, o = e.exports = {};

    function r() {
        throw new Error("setTimeout has not been defined")
    }

    function s() {
        throw new Error("clearTimeout has not been defined")
    }

    function a(t) {
        if (n === setTimeout) return setTimeout(t, 0);
        if ((n === r || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
        try {
            return n(t, 0)
        } catch (e) {
            try {
                return n.call(null, t, 0)
            } catch (e) {
                return n.call(this, t, 0)
            }
        }
    }! function () {
        try {
            n = "function" == typeof setTimeout ? setTimeout : r
        } catch (e) {
            n = r
        }
        try {
            i = "function" == typeof clearTimeout ? clearTimeout : s
        } catch (e) {
            i = s
        }
    }();
    var l, c = [],
        u = !1,
        d = -1;

    function h() {
        u && l && (u = !1, l.length ? c = l.concat(c) : d = -1, c.length && p())
    }

    function p() {
        if (!u) {
            var e = a(h);
            u = !0;
            for (var t = c.length; t;) {
                for (l = c, c = []; ++d < t;) l && l[d].run();
                d = -1, t = c.length
            }
            l = null, u = !1,
                function (t) {
                    if (i === clearTimeout) return clearTimeout(t);
                    if ((i === s || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t);
                    try {
                        i(t)
                    } catch (e) {
                        try {
                            return i.call(null, t)
                        } catch (e) {
                            return i.call(this, t)
                        }
                    }
                }(e)
        }
    }

    function f(e, t) {
        this.fun = e, this.array = t
    }

    function m() {}
    o.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (1 < arguments.length)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        c.push(new f(e, t)), 1 !== c.length || u || a(p)
    }, f.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = m, o.addListener = m, o.once = m, o.off = m, o.removeListener = m, o.removeAllListeners = m, o.emit = m, o.prependListener = m, o.prependOnceListener = m, o.listeners = function (e) {
        return []
    }, o.binding = function (e) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function () {
        return "/"
    }, o.chdir = function (e) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function () {
        return 0
    }
}, function (e, t) {
    e.exports = function (e) {
        return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
    }
}, function (e, t) {
    "function" == typeof Object.create ? e.exports = function (e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : e.exports = function (e, t) {
        e.super_ = t;
        var n = function () {};
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
    }
}, function (i, e, t) {
    ! function (e, t) {
        var n = function (a, O) {
            "use strict";
            if (!O.getElementsByClassName) return;
            var H, N, F = O.documentElement,
                l = a.Date,
                i = a.HTMLPictureElement,
                c = "addEventListener",
                R = "getAttribute",
                B = a[c],
                q = a.setTimeout,
                u = a.requestAnimationFrame || q,
                z = a.requestIdleCallback,
                j = /^picture$/i,
                o = ["load", "error", "lazyincluded", "_lazyloaded"],
                n = {},
                W = Array.prototype.forEach,
                V = function (e, t) {
                    return n[t] || (n[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), n[t].test(e[R]("class") || "") && n[t]
                },
                U = function (e, t) {
                    V(e, t) || e.setAttribute("class", (e[R]("class") || "").trim() + " " + t)
                },
                G = function (e, t) {
                    var n;
                    (n = V(e, t)) && e.setAttribute("class", (e[R]("class") || "").replace(n, " "))
                },
                Z = function (t, n, e) {
                    var i = e ? c : "removeEventListener";
                    e && Z(t, n), o.forEach(function (e) {
                        t[i](e, n)
                    })
                },
                X = function (e, t, n, i, o) {
                    var r = O.createEvent("Event");
                    return n || (n = {}), n.instance = H, r.initEvent(t, !i, !o), r.detail = n, e.dispatchEvent(r), r
                },
                Y = function (e, t) {
                    var n;
                    !i && (n = a.picturefill || N.pf) ? (t && t.src && !e[R]("srcset") && e.setAttribute("srcset", t.src), n({
                        reevaluate: !0,
                        elements: [e]
                    })) : t && t.src && (e.src = t.src)
                },
                K = function (e, t) {
                    return (getComputedStyle(e, null) || {})[t]
                },
                s = function (e, t, n) {
                    for (n = n || e.offsetWidth; n < N.minSize && t && !e._lazysizesWidth;) n = t.offsetWidth, t = t.parentNode;
                    return n
                },
                $ = function () {
                    var n, i, t = [],
                        o = [],
                        r = t,
                        s = function () {
                            var e = r;
                            for (r = t.length ? o : t, i = !(n = !0); e.length;) e.shift()();
                            n = !1
                        },
                        e = function (e, t) {
                            n && !t ? e.apply(this, arguments) : (r.push(e), i || (i = !0, (O.hidden ? q : u)(s)))
                        };
                    return e._lsFlush = s, e
                }(),
                Q = function (n, e) {
                    return e ? function () {
                        $(n)
                    } : function () {
                        var e = this,
                            t = arguments;
                        $(function () {
                            n.apply(e, t)
                        })
                    }
                },
                J = function (e) {
                    var t, n, i = function () {
                            t = null, e()
                        },
                        o = function () {
                            var e = l.now() - n;
                            e < 99 ? q(o, 99 - e) : (z || i)(i)
                        };
                    return function () {
                        n = l.now(), t || (t = q(o, 99))
                    }
                };
            ! function () {
                var e, t = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                for (e in N = a.lazySizesConfig || a.lazysizesConfig || {}, t) e in N || (N[e] = t[e]);
                a.lazySizesConfig = N, q(function () {
                    N.init && r()
                })
            }();
            var e = function () {
                    var u, d, h, p, t, f, m, g, v, y, b, _, w, k, r = /^img$/i,
                        E = /^iframe$/i,
                        A = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent),
                        T = 0,
                        S = 0,
                        x = -1,
                        C = function (e) {
                            S--, e && e.target && Z(e.target, C), (!e || S < 0 || !e.target) && (S = 0)
                        },
                        P = function (e, t) {
                            var n, i = e,
                                o = "hidden" == K(O.body, "visibility") || "hidden" != K(e.parentNode, "visibility") && "hidden" != K(e, "visibility");
                            for (g -= t, b += t, v -= t, y += t; o && (i = i.offsetParent) && i != O.body && i != F;)(o = 0 < (K(i, "opacity") || 1)) && "visible" != K(i, "overflow") && (n = i.getBoundingClientRect(), o = y > n.left && v < n.right && b > n.top - 1 && g < n.bottom + 1);
                            return o
                        },
                        e = function () {
                            var e, t, n, i, o, r, s, a, l, c = H.elements;
                            if ((p = N.loadMode) && S < 8 && (e = c.length)) {
                                t = 0, x++, null == w && ("expand" in N || (N.expand = 500 < F.clientHeight && 500 < F.clientWidth ? 500 : 370), _ = N.expand, w = _ * N.expFactor), T < w && S < 1 && 2 < x && 2 < p && !O.hidden ? (T = w, x = 0) : T = 1 < p && 1 < x && S < 6 ? _ : 0;
                                for (; t < e; t++)
                                    if (c[t] && !c[t]._lazyRace)
                                        if (A)
                                            if ((a = c[t][R]("data-expand")) && (r = 1 * a) || (r = T), l !== r && (f = innerWidth + r * k, m = innerHeight + r, s = -1 * r, l = r), n = c[t].getBoundingClientRect(), (b = n.bottom) >= s && (g = n.top) <= m && (y = n.right) >= s * k && (v = n.left) <= f && (b || y || v || g) && (N.loadHidden || "hidden" != K(c[t], "visibility")) && (d && S < 3 && !a && (p < 3 || x < 4) || P(c[t], r))) {
                                                if (I(c[t]), o = !0, 9 < S) break
                                            } else !o && d && !i && S < 4 && x < 4 && 2 < p && (u[0] || N.preloadAfterLoad) && (u[0] || !a && (b || y || v || g || "auto" != c[t][R](N.sizesAttr))) && (i = u[0] || c[t]);
                                else I(c[t]);
                                i && !o && I(i)
                            }
                        },
                        n = function (e) {
                            var n, i = 0,
                                o = N.throttleDelay,
                                r = N.ricTimeout,
                                t = function () {
                                    n = !1, i = l.now(), e()
                                },
                                s = z && 49 < r ? function () {
                                    z(t, {
                                        timeout: r
                                    }), r !== N.ricTimeout && (r = N.ricTimeout)
                                } : Q(function () {
                                    q(t)
                                }, !0);
                            return function (e) {
                                var t;
                                (e = !0 === e) && (r = 33), n || (n = !0, (t = o - (l.now() - i)) < 0 && (t = 0), e || t < 9 ? s() : q(s, t))
                            }
                        }(e),
                        D = function (e) {
                            U(e.target, N.loadedClass), G(e.target, N.loadingClass), Z(e.target, L), X(e.target, "lazyloaded")
                        },
                        i = Q(D),
                        L = function (e) {
                            i({
                                target: e.target
                            })
                        },
                        M = function (e) {
                            var t, n = e[R](N.srcsetAttr);
                            (t = N.customMedia[e[R]("data-media") || e[R]("media")]) && e.setAttribute("media", t), n && e.setAttribute("srcset", n)
                        },
                        s = Q(function (e, t, n, i, o) {
                            var r, s, a, l, c, u;
                            (c = X(e, "lazybeforeunveil", t)).defaultPrevented || (i && (n ? U(e, N.autosizesClass) : e.setAttribute("sizes", i)), s = e[R](N.srcsetAttr), r = e[R](N.srcAttr), o && (a = e.parentNode, l = a && j.test(a.nodeName || "")), u = t.firesLoad || "src" in e && (s || r || l), c = {
                                target: e
                            }, u && (Z(e, C, !0), clearTimeout(h), h = q(C, 2500), U(e, N.loadingClass), Z(e, L, !0)), l && W.call(a.getElementsByTagName("source"), M), s ? e.setAttribute("srcset", s) : r && !l && (E.test(e.nodeName) ? function (t, n) {
                                try {
                                    t.contentWindow.location.replace(n)
                                } catch (e) {
                                    t.src = n
                                }
                            }(e, r) : e.src = r), o && (s || l) && Y(e, {
                                src: r
                            })), e._lazyRace && delete e._lazyRace, G(e, N.lazyClass), $(function () {
                                (!u || e.complete && 1 < e.naturalWidth) && (u ? C(c) : S--, D(c))
                            }, !0)
                        }),
                        I = function (e) {
                            var t, n = r.test(e.nodeName),
                                i = n && (e[R](N.sizesAttr) || e[R]("sizes")),
                                o = "auto" == i;
                            (!o && d || !n || !e[R]("src") && !e.srcset || e.complete || V(e, N.errorClass) || !V(e, N.lazyClass)) && (t = X(e, "lazyunveilread").detail, o && ee.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, S++, s(e, t, o, i, n))
                        },
                        o = function () {
                            if (!d)
                                if (l.now() - t < 999) q(o, 999);
                                else {
                                    var e = J(function () {
                                        N.loadMode = 3, n()
                                    });
                                    d = !0, N.loadMode = 3, n(), B("scroll", function () {
                                        3 == N.loadMode && (N.loadMode = 2), e()
                                    }, !0)
                                }
                        };
                    return {
                        _: function () {
                            t = l.now(), H.elements = O.getElementsByClassName(N.lazyClass), u = O.getElementsByClassName(N.lazyClass + " " + N.preloadClass), k = N.hFac, B("scroll", n, !0), B("resize", n, !0), a.MutationObserver ? new MutationObserver(n).observe(F, {
                                childList: !0,
                                subtree: !0,
                                attributes: !0
                            }) : (F[c]("DOMNodeInserted", n, !0), F[c]("DOMAttrModified", n, !0), setInterval(n, 999)), B("hashchange", n, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function (e) {
                                O[c](e, n, !0)
                            }), /d$|^c/.test(O.readyState) ? o() : (B("load", o), O[c]("DOMContentLoaded", n), q(o, 2e4)), H.elements.length ? (e(), $._lsFlush()) : n()
                        },
                        checkElems: n,
                        unveil: I
                    }
                }(),
                ee = function () {
                    var n, r = Q(function (e, t, n, i) {
                            var o, r, s;
                            if (e._lazysizesWidth = i, i += "px", e.setAttribute("sizes", i), j.test(t.nodeName || ""))
                                for (o = t.getElementsByTagName("source"), r = 0, s = o.length; r < s; r++) o[r].setAttribute("sizes", i);
                            n.detail.dataAttr || Y(e, n.detail)
                        }),
                        i = function (e, t, n) {
                            var i, o = e.parentNode;
                            o && (n = s(e, o, n), (i = X(e, "lazybeforesizes", {
                                width: n,
                                dataAttr: !!t
                            })).defaultPrevented || (n = i.detail.width) && n !== e._lazysizesWidth && r(e, o, i, n))
                        },
                        e = J(function () {
                            var e, t = n.length;
                            if (t)
                                for (e = 0; e < t; e++) i(n[e])
                        });
                    return {
                        _: function () {
                            n = O.getElementsByClassName(N.autosizesClass), B("resize", e)
                        },
                        checkElems: e,
                        updateElem: i
                    }
                }(),
                r = function () {
                    r.i || (r.i = !0, ee._(), e._())
                };
            return H = {
                cfg: N,
                autoSizer: ee,
                loader: e,
                init: r,
                uP: Y,
                aC: U,
                rC: G,
                hC: V,
                fire: X,
                gW: s,
                rAF: $
            }
        }(e, e.document);
        e.lazySizes = n, i.exports && (i.exports = n)
    }(window)
}, function (e, t) {
    (function () {
        var i, t, n, l, o, r = function (e, t) {
                return function () {
                    return e.apply(t, arguments)
                }
            },
            s = [].indexOf || function (e) {
                for (var t = 0, n = this.length; t < n; t++)
                    if (t in this && this[t] === e) return t;
                return -1
            };
        t = function () {
            function e() {}
            return e.prototype.extend = function (e, t) {
                var n, i;
                for (n in t) i = t[n], null == e[n] && (e[n] = i);
                return e
            }, e.prototype.isMobile = function (e) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
            }, e.prototype.createEvent = function (e, t, n, i) {
                var o;
                return null == t && (t = !1), null == n && (n = !1), null == i && (i = null), null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(e, t, n, i) : null != document.createEventObject ? (o = document.createEventObject()).eventType = e : o.eventName = e, o
            }, e.prototype.emitEvent = function (e, t) {
                return null != e.dispatchEvent ? e.dispatchEvent(t) : t in (null != e) ? e[t]() : "on" + t in (null != e) ? e["on" + t]() : void 0
            }, e.prototype.addEvent = function (e, t, n) {
                return null != e.addEventListener ? e.addEventListener(t, n, !1) : null != e.attachEvent ? e.attachEvent("on" + t, n) : e[t] = n
            }, e.prototype.removeEvent = function (e, t, n) {
                return null != e.removeEventListener ? e.removeEventListener(t, n, !1) : null != e.detachEvent ? e.detachEvent("on" + t, n) : delete e[t]
            }, e.prototype.innerHeight = function () {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
            }, e
        }(), n = this.WeakMap || this.MozWeakMap || (n = function () {
            function e() {
                this.keys = [], this.values = []
            }
            return e.prototype.get = function (e) {
                var t, n, i, o;
                for (t = n = 0, i = (o = this.keys).length; n < i; t = ++n)
                    if (o[t] === e) return this.values[t]
            }, e.prototype.set = function (e, t) {
                var n, i, o, r;
                for (n = i = 0, o = (r = this.keys).length; i < o; n = ++i)
                    if (r[n] === e) return void(this.values[n] = t);
                return this.keys.push(e), this.values.push(t)
            }, e
        }()), i = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (i = function () {
            function e() {
                "undefined" != typeof console && console, "undefined" != typeof console && console
            }
            return e.notSupported = !0, e.prototype.observe = function () {}, e
        }()), l = this.getComputedStyle || function (n, e) {
            return this.getPropertyValue = function (e) {
                var t;
                return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, function (e, t) {
                    return t.toUpperCase()
                }), (null != (t = n.currentStyle) ? t[e] : void 0) || null
            }, this
        }, o = /(\-([a-z]){1})/g, this.WOW = function () {
            function e(e) {
                null == e && (e = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(e, this.defaults), null != e.scrollContainer && (this.config.scrollContainer = document.querySelector(e.scrollContainer)), this.animationNameCache = new n, this.wowEvent = this.util().createEvent(this.config.boxClass)
            }
            return e.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null,
                scrollContainer: null
            }, e.prototype.init = function () {
                var e;
                return this.element = window.document.documentElement, "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, e.prototype.start = function () {
                var o, e, t, n;
                if (this.stopped = !1, this.boxes = function () {
                        var e, t, n, i;
                        for (i = [], e = 0, t = (n = this.element.querySelectorAll("." + this.config.boxClass)).length; e < t; e++) o = n[e], i.push(o);
                        return i
                    }.call(this), this.all = function () {
                        var e, t, n, i;
                        for (i = [], e = 0, t = (n = this.boxes).length; e < t; e++) o = n[e], i.push(o);
                        return i
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (e = 0, t = (n = this.boxes).length; e < t; e++) o = n[e], this.applyStyle(o, !0);
                if (this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) return new i(function (s) {
                    return function (e) {
                        var t, n, o, r, i;
                        for (i = [], t = 0, n = e.length; t < n; t++) r = e[t], i.push(function () {
                            var e, t, n, i;
                            for (i = [], e = 0, t = (n = r.addedNodes || []).length; e < t; e++) o = n[e], i.push(this.doSync(o));
                            return i
                        }.call(s));
                        return i
                    }
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                })
            }, e.prototype.stop = function () {
                if (this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval) return clearInterval(this.interval)
            }, e.prototype.sync = function (e) {
                if (i.notSupported) return this.doSync(this.element)
            }, e.prototype.doSync = function (e) {
                var t, n, i, o, r;
                if (null == e && (e = this.element), 1 === e.nodeType) {
                    for (r = [], n = 0, i = (o = (e = e.parentNode || e).querySelectorAll("." + this.config.boxClass)).length; n < i; n++) t = o[n], s.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                    return r
                }
            }, e.prototype.show = function (e) {
                return this.applyStyle(e), e.className = e.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(e), this.util().emitEvent(e, this.wowEvent), this.util().addEvent(e, "animationend", this.resetAnimation), this.util().addEvent(e, "oanimationend", this.resetAnimation), this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation), e
            }, e.prototype.applyStyle = function (t, n) {
                var i, o, r;
                return o = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), r = t.getAttribute("data-wow-iteration"), this.animate(function (e) {
                    return function () {
                        return e.customStyle(t, n, o, i, r)
                    }
                }(this))
            }, e.prototype.animate = function () {
                return "requestAnimationFrame" in window ? function (e) {
                    return window.requestAnimationFrame(e)
                } : function (e) {
                    return e()
                }
            }(), e.prototype.resetStyle = function () {
                var e, t, n, i, o;
                for (o = [], t = 0, n = (i = this.boxes).length; t < n; t++) e = i[t], o.push(e.style.visibility = "visible");
                return o
            }, e.prototype.resetAnimation = function (e) {
                var t;
                if (0 <= e.type.toLowerCase().indexOf("animationend")) return (t = e.target || e.srcElement).className = t.className.replace(this.config.animateClass, "").trim()
            }, e.prototype.customStyle = function (e, t, n, i, o) {
                return t && this.cacheAnimationName(e), e.style.visibility = t ? "hidden" : "visible", n && this.vendorSet(e.style, {
                    animationDuration: n
                }), i && this.vendorSet(e.style, {
                    animationDelay: i
                }), o && this.vendorSet(e.style, {
                    animationIterationCount: o
                }), this.vendorSet(e.style, {
                    animationName: t ? "none" : this.cachedAnimationName(e)
                }), e
            }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (o, e) {
                var r, t, s, a;
                for (r in t = [], e) s = e[r], o["" + r] = s, t.push(function () {
                    var e, t, n, i;
                    for (i = [], e = 0, t = (n = this.vendors).length; e < t; e++) a = n[e], i.push(o["" + a + r.charAt(0).toUpperCase() + r.substr(1)] = s);
                    return i
                }.call(this));
                return t
            }, e.prototype.vendorCSS = function (e, t) {
                var n, i, o, r, s, a;
                for (r = (s = l(e)).getPropertyCSSValue(t), n = 0, i = (o = this.vendors).length; n < i; n++) a = o[n], r = r || s.getPropertyCSSValue("-" + a + "-" + t);
                return r
            }, e.prototype.animationName = function (t) {
                var n;
                try {
                    n = this.vendorCSS(t, "animation-name").cssText
                } catch (e) {
                    n = l(t).getPropertyValue("animation-name")
                }
                return "none" === n ? "" : n
            }, e.prototype.cacheAnimationName = function (e) {
                return this.animationNameCache.set(e, this.animationName(e))
            }, e.prototype.cachedAnimationName = function (e) {
                return this.animationNameCache.get(e)
            }, e.prototype.scrollHandler = function () {
                return this.scrolled = !0
            }, e.prototype.scrollCallback = function () {
                var o;
                if (this.scrolled && (this.scrolled = !1, this.boxes = function () {
                        var e, t, n, i;
                        for (i = [], e = 0, t = (n = this.boxes).length; e < t; e++)(o = n[e]) && (this.isVisible(o) ? this.show(o) : i.push(o));
                        return i
                    }.call(this), !this.boxes.length && !this.config.live)) return this.stop()
            }, e.prototype.offsetTop = function (e) {
                for (var t; void 0 === e.offsetTop;) e = e.parentNode;
                for (t = e.offsetTop; e = e.offsetParent;) t += e.offsetTop;
                return t
            }, e.prototype.isVisible = function (e) {
                var t, n, i, o, r;
                return n = e.getAttribute("data-wow-offset") || this.config.offset, o = (r = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, t = (i = this.offsetTop(e)) + e.clientHeight, i <= o && r <= t
            }, e.prototype.util = function () {
                return null != this._util ? this._util : this._util = new t
            }, e.prototype.disabled = function () {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, e
        }()
    }).call(this)
}, function (e, t, n) {
    "use strict";
    n.r(t);
    var i = n(10),
        a = n.n(i),
        o = n(11),
        r = n.n(o),
        s = n(12),
        l = n.n(s),
        c = n(13),
        u = n.n(c),
        d = function () {
            function i(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function (e, t, n) {
                return t && i(e.prototype, t), n && i(e, n), e
            }
        }(),
        w = function (e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        },
        h = function () {
            var e = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'],
                s = function () {
                    function _(e) {
                        var t = e.targetModal,
                            n = e.triggers,
                            i = void 0 === n ? [] : n,
                            o = e.onShow,
                            r = void 0 === o ? function () {} : o,
                            s = e.onClose,
                            a = void 0 === s ? function () {} : s,
                            l = e.openTrigger,
                            c = void 0 === l ? "data-micromodal-trigger" : l,
                            u = e.closeTrigger,
                            d = void 0 === u ? "data-micromodal-close" : u,
                            h = e.disableScroll,
                            p = void 0 !== h && h,
                            f = e.disableFocus,
                            m = void 0 !== f && f,
                            g = e.awaitCloseAnimation,
                            v = void 0 !== g && g,
                            y = e.debugMode,
                            b = void 0 !== y && y;
                        (function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        })(this, _), this.modal = document.getElementById(t), this.config = {
                            debugMode: b,
                            disableScroll: p,
                            openTrigger: c,
                            closeTrigger: d,
                            onShow: r,
                            onClose: a,
                            awaitCloseAnimation: v,
                            disableFocus: m
                        }, 0 < i.length && this.registerTriggers.apply(this, w(i)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this)
                    }
                    return d(_, [{
                        key: "registerTriggers",
                        value: function () {
                            for (var t = this, e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                            n.forEach(function (e) {
                                e.addEventListener("click", function () {
                                    return t.showModal()
                                })
                            })
                        }
                    }, {
                        key: "showModal",
                        value: function () {
                            this.activeElement = document.activeElement, this.modal.setAttribute("aria-hidden", "false"), this.modal.classList.add("is-open"), this.setFocusToFirstNode(), this.scrollBehaviour("disable"), this.addEventListeners(), this.config.onShow(this.modal)
                        }
                    }, {
                        key: "closeModal",
                        value: function () {
                            var t = this.modal;
                            this.modal.setAttribute("aria-hidden", "true"), this.removeEventListeners(), this.scrollBehaviour("enable"), this.activeElement.focus(), this.config.onClose(this.modal), this.config.awaitCloseAnimation ? this.modal.addEventListener("animationend", function e() {
                                t.classList.remove("is-open"), t.removeEventListener("animationend", e, !1)
                            }, !1) : t.classList.remove("is-open")
                        }
                    }, {
                        key: "scrollBehaviour",
                        value: function (e) {
                            if (this.config.disableScroll) {
                                var t = document.querySelector("body");
                                switch (e) {
                                    case "enable":
                                        Object.assign(t.style, {
                                            overflow: "initial",
                                            height: "initial"
                                        });
                                        break;
                                    case "disable":
                                        Object.assign(t.style, {
                                            overflow: "hidden",
                                            height: "100vh"
                                        })
                                }
                            }
                        }
                    }, {
                        key: "addEventListeners",
                        value: function () {
                            this.modal.addEventListener("touchstart", this.onClick), this.modal.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onKeydown)
                        }
                    }, {
                        key: "removeEventListeners",
                        value: function () {
                            this.modal.removeEventListener("touchstart", this.onClick), this.modal.removeEventListener("click", this.onClick), document.removeEventListener("keydown", this.onKeydown)
                        }
                    }, {
                        key: "onClick",
                        value: function (e) {
                            e.target.hasAttribute(this.config.closeTrigger) && (this.closeModal(), e.preventDefault())
                        }
                    }, {
                        key: "onKeydown",
                        value: function (e) {
                            27 === e.keyCode && this.closeModal(e), 9 === e.keyCode && this.maintainFocus(e)
                        }
                    }, {
                        key: "getFocusableNodes",
                        value: function () {
                            var t = this.modal.querySelectorAll(e);
                            return Object.keys(t).map(function (e) {
                                return t[e]
                            })
                        }
                    }, {
                        key: "setFocusToFirstNode",
                        value: function () {
                            if (!this.config.disableFocus) {
                                var e = this.getFocusableNodes();
                                e.length && e[0].focus()
                            }
                        }
                    }, {
                        key: "maintainFocus",
                        value: function (e) {
                            var t = this.getFocusableNodes();
                            if (this.modal.contains(document.activeElement)) {
                                var n = t.indexOf(document.activeElement);
                                e.shiftKey && 0 === n && (t[t.length - 1].focus(), e.preventDefault()), e.shiftKey || n !== t.length - 1 || (t[0].focus(), e.preventDefault())
                            } else t[0].focus()
                        }
                    }]), _
                }(),
                i = null,
                a = function (e) {
                    if (!document.getElementById(e)) return !1
                };
            return {
                init: function (e) {
                    var t = Object.assign({}, {
                            openTrigger: "data-micromodal-trigger"
                        }, e),
                        n = [].concat(w(document.querySelectorAll("[" + t.openTrigger + "]"))),
                        i = function (e, n) {
                            var i = [];
                            return e.forEach(function (e) {
                                var t = e.attributes[n].value;
                                void 0 === i[t] && (i[t] = []), i[t].push(e)
                            }), i
                        }(n, t.openTrigger);
                    if (!0 !== t.debugMode || !1 !== function (e, t) {
                            if (function (e) {
                                    e.length
                                }(e), !t) return !0;
                            for (var n in t) a(n);
                            return !0
                        }(n, i))
                        for (var o in i) {
                            var r = i[o];
                            t.targetModal = o, t.triggers = [].concat(w(r)), new s(t)
                        }
                },
                show: function (e, t) {
                    var n = t || {};
                    n.targetModal = e, !0 === n.debugMode && !1 === a(e) || (i = new s(n)).showModal()
                },
                close: function () {
                    i.closeModal()
                }
            }
        }(),
        p = n(14),
        f = n.n(p);
    var m = n(15),
        g = n.n(m),
        W = n(0),
        V = n(54);

    function U(e, t) {
        return Math.floor(Math.random() * (t - e + 1) + e)
    }
    n(55).strictEqual(g()(V()), "boolean"), V() && document.body.classList.add("has-touch");
    var v = function () {
            var s, n, t, e, i, o, r, a, l, c = "staff-",
                u = "note-",
                d = "/assets/sounds/";
            var h = {
                ui: {
                    click: {
                        howl: new W.Howl({
                            src: ["".concat(d, "click.mp3")]
                        })
                    },
                    ding: {
                        howl: new W.Howl({
                            src: ["".concat(d, "ding.mp3")]
                        })
                    }
                }
            };
            var p, f = 0,
                m = !1,
                g = !1;

            function v() {
                "true" !== s.dataset.enabled && (s.dataset.enabled = "true", function () {
                    h = Object.assign({
                        instruments: [{
                            name: "Piano",
                            staffType: "normal",
                            howl: new W.Howl({
                                src: ["".concat(d, "piano.mp3")],
                                sprite: {
                                    A3: [0, 3776.2131519274376],
                                    Asharp3: [5e3, 4848.390022675737],
                                    B3: [11e3, 5923.968253968254],
                                    C3: [18e3, 4685.034013605442],
                                    C4: [24e3, 6752.970521541951],
                                    Csharp3: [32e3, 5236.213151927437],
                                    Csharp4: [39e3, 4604.285714285716],
                                    D3: [45e3, 4814.603174603179],
                                    D4: [51e3, 5732.607709750568],
                                    Dsharp3: [58e3, 5294.943310657593],
                                    Dsharp4: [65e3, 4705.011337868484],
                                    E3: [71e3, 4688.752834467124],
                                    E4: [77e3, 4537.25623582767],
                                    F3: [83e3, 3645.7369614512486],
                                    Fsharp3: [88e3, 4553.219954648526],
                                    G3: [94e3, 4056.712018140587],
                                    Gsharp3: [1e5, 3850.2040816326544]
                                }
                            })
                        }, {
                            name: "Harp",
                            staffType: "normal",
                            howl: new W.Howl({
                                src: ["".concat(d, "harp.mp3")],
                                sprite: {
                                    A3: [0, 12151.768707482994],
                                    Asharp3: [14e3, 12141.70068027211],
                                    B3: [28e3, 7021.3378684807285],
                                    C3: [37e3, 10906.64399092971],
                                    C4: [49e3, 7013.015873015874],
                                    Csharp3: [58e3, 10908.888888888896],
                                    Csharp4: [7e4, 7e3],
                                    D3: [78e3, 10893.67346938775],
                                    D4: [9e4, 6654.648526077097],
                                    Dsharp3: [98e3, 10879.977324263038],
                                    Dsharp4: [11e4, 6651.292517006808],
                                    E3: [118e3, 10858.526077097507],
                                    E4: [13e4, 6641.383219954661],
                                    F3: [138e3, 10847.2335600907],
                                    Fsharp3: [15e4, 10835.170068027197],
                                    G3: [162e3, 12151.904761904774],
                                    Gsharp3: [176e3, 12164.671201814059]
                                }
                            })
                        }, {
                            name: "Xylophone",
                            staffType: "normal",
                            howl: new W.Howl({
                                src: ["".concat(d, "xylophone.mp3")],
                                sprite: {
                                    A3: [0, 898.2993197278911],
                                    Asharp3: [2e3, 820.4535147392291],
                                    B3: [4e3, 791.5873015873016],
                                    C3: [6e3, 1268.27664399093],
                                    C4: [9e3, 811.2244897959187],
                                    Csharp3: [11e3, 1346.417233560091],
                                    Csharp4: [14e3, 780.6349206349204],
                                    D3: [16e3, 1340.7256235827667],
                                    D4: [19e3, 784.0136054421762],
                                    Dsharp3: [21e3, 1418.8662131519259],
                                    Dsharp4: [24e3, 828.3673469387764],
                                    E3: [26e3, 1311.3605442176884],
                                    E4: [29e3, 781.3832199546482],
                                    F3: [31e3, 1234.0816326530585],
                                    Fsharp3: [34e3, 1279.7732426303837],
                                    G3: [37e3, 830.7936507936518],
                                    Gsharp3: [39e3, 862.6077097505699]
                                }
                            })
                        }, {
                            name: "Banjo",
                            staffType: "normal",
                            howl: new W.Howl({
                                src: ["".concat(d, "banjo.mp3")],
                                sprite: {
                                    A3: [0, 2340.3401360544217],
                                    Asharp3: [4e3, 2356.4172335600906],
                                    B3: [8e3, 2190.181405895691],
                                    C3: [12e3, 2238.2993197278915],
                                    C4: [16e3, 2223.197278911563],
                                    Csharp3: [2e4, 2314.376417233561],
                                    Csharp4: [24e3, 2355.4421768707493],
                                    D3: [28e3, 2359.50113378685],
                                    D4: [32e3, 2356.870748299322],
                                    Dsharp3: [36e3, 2354.943310657596],
                                    Dsharp4: [4e4, 2253.401360544217],
                                    E3: [44e3, 2276.848072562359],
                                    E4: [48e3, 2241.4512471655357],
                                    F3: [52e3, 2358.004535147394],
                                    Fsharp3: [56e3, 2355.1020408163267],
                                    G3: [6e4, 2357.48299319728],
                                    Gsharp3: [64e3, 2234.444444444449]
                                }
                            })
                        }, {
                            name: "Ocarina",
                            staffType: "normal",
                            howl: new W.Howl({
                                src: ["".concat(d, "ocarina.mp3")],
                                sprite: {
                                    A3: [0, 195.37414965986395],
                                    Asharp3: [2e3, 183.33333333333312],
                                    B3: [4e3, 198.66213151927425],
                                    C3: [6e3, 172.2222222222225],
                                    C4: [8e3, 190.3628117913829],
                                    Csharp3: [1e4, 183.0158730158722],
                                    Csharp4: [12e3, 201.9501133786843],
                                    D3: [14e3, 188.5260770975048],
                                    D4: [16e3, 193.96825396825434],
                                    Dsharp3: [18e3, 203.85487528344726],
                                    Dsharp4: [2e4, 182.9251700680281],
                                    E3: [22e3, 210.61224489795904],
                                    E4: [24e3, 180.38548752834416],
                                    F3: [26e3, 200.13605442176896],
                                    Fsharp3: [28e3, 204.3990929705224],
                                    G3: [3e4, 205.39682539682502],
                                    Gsharp3: [32e3, 192.58503401360372]
                                }
                            })
                        }, {
                            name: "Drag",
                            staffType: "drag",
                            howl: new W.Howl({
                                src: ["".concat(d, "rupaul.mp3")],
                                sprite: {
                                    A3: [0, 2972.154195011338],
                                    Asharp3: [4e3, 743.0385487528346],
                                    B3: [6e3, 2229.1156462585027],
                                    C3: [1e4, 5201.269841269841],
                                    C4: [17e3, 2972.1541950113383],
                                    Csharp3: [21e3, 2229.1156462585027],
                                    Csharp4: [25e3, 5944.308390022677],
                                    D3: [32e3, 2229.1156462585063],
                                    D4: [36e3, 1486.077097505671],
                                    Dsharp3: [39e3, 2229.1156462585063],
                                    Dsharp4: [43e3, 743.0385487528355],
                                    E3: [45e3, 1486.077097505671],
                                    E4: [48e3, 1486.077097505671],
                                    F3: [51e3, 1486.077097505671],
                                    Fsharp3: [54e3, 2229.1156462585063],
                                    G3: [58e3, 1486.077097505671],
                                    Gsharp3: [61e3, 1486.077097505671]
                                }
                            })
                        }, {
                            name: "Butts",
                            staffType: "butts",
                            howl: new W.Howl({
                                src: ["".concat(d, "farts.mp3")],
                                sprite: {
                                    A3: [0, 1255.1927437641723],
                                    Asharp3: [3e3, 1780.9977324263039],
                                    B3: [6e3, 1825.8956916099773],
                                    C3: [9e3, 2e3],
                                    C4: [12e3, 325.9410430838994],
                                    Csharp3: [14e3, 2e3],
                                    Csharp4: [17e3, 768.4807256235829],
                                    D3: [19e3, 550.0226757369617],
                                    D4: [21e3, 322.44897959183663],
                                    Dsharp3: [23e3, 880.9070294784576],
                                    Dsharp4: [25e3, 2207.6870748299307],
                                    E3: [29e3, 1815.5102040816332],
                                    E4: [32e3, 2511.4512471655316],
                                    F3: [36e3, 1556.1904761904727],
                                    Fsharp3: [39e3, 297.43764172335574],
                                    G3: [41e3, 506.9160997732425],
                                    Gsharp3: [43e3, 393.33333333333087]
                                }
                            })
                        }, {
                            name: "Super Mario World",
                            staffType: "mario",
                            howl: new W.Howl({
                                src: ["".concat(d, "mario.mp3")],
                                sprite: {
                                    A3: [0, 433.78684807256235],
                                    Asharp3: [2e3, 489.25170068027234],
                                    B3: [4e3, 571.8367346938775],
                                    C3: [6e3, 653.9229024943314],
                                    C4: [8e3, 395.8276643990928],
                                    Csharp3: [1e4, 987.6643990929708],
                                    Csharp4: [12e3, 332.92517006802666],
                                    D3: [14e3, 337.86848072562316],
                                    D4: [16e3, 651.3832199546492],
                                    Dsharp3: [18e3, 1592.9251700680284],
                                    Dsharp4: [21e3, 474.8299319727885],
                                    E3: [23e3, 244.89795918367463],
                                    E4: [25e3, 826.2131519274369],
                                    F3: [27e3, 658.5487528344664],
                                    Fsharp3: [29e3, 660.1814058956918],
                                    G3: [31e3, 109.75056689342466],
                                    Gsharp3: [33e3, 822.3129251700669]
                                }
                            })
                        }]
                    }, h);
                    for (var e = 0; e < h.ui.length; e++) h.ui[e].howl.load();
                    for (var t = 0; t < h.instruments.length; t++) h.instruments[e].howl.load();
                    l = h.instruments.length - 1
                }(), b(A))
            }

            function y() {
                "false" !== s.dataset.enabled && (s.dataset.enabled = "false", function () {
                    for (var e = 0; e < h.ui.length; e++) h.ui[e].howl.unload();
                    for (var t = 0; t < h.instruments.length; t++) h.instruments[e].howl.unload()
                }())
            }

            function b(t) {
                s.dataset.loading = "true";
                var n, e = U(30, 50),
                    i = U(5, 30),
                    o = e,
                    r = 1;
                setTimeout(function e() {
                    w(), r++, 700 <= o ? (h.ui.ding.howl.play(), s.dataset.loading = "false", clearTimeout(n), t && t()) : (o *= 1.3, r <= i && (o *= .8), n = setTimeout(e, o))
                }, o)
            }

            function _(e) {
                l < e ? e = 0 : e < 0 && (e = l), f = e,
                    function () {
                        Array.from(t).forEach(function (e) {
                            e.style.display = "none"
                        }), t[f].style.display = "block"
                    }()
            }

            function w() {
                _(f + 1), h.ui.click.howl.play()
            }

            function k() {
                _(f - 1), h.ui.click.howl.play()
            }

            function E() {
                Array.from(i).forEach(function (e) {
                    e.style.display = "none"
                })
            }

            function A() {
                V() || Array.from(o).forEach(function (e, t) {
                    setTimeout(function () {
                        e.classList.add("visible")
                    }, 30 * t)
                })
            }

            function T() {
                Array.from(o).forEach(function (e) {
                    e.classList.add("fadeout"), setTimeout(function () {
                        e.classList.remove("visible")
                    }, 2e3)
                })
            }

            function S(e) {
                var t = document.getElementById(e);
                t.classList.contains("pressed") || (t.classList.add("pressed"), P(e), function (e) {
                    clearTimeout(p), E();
                    var t = h.instruments[f].staffType,
                        n = "." + (c + t) + " ." + u + e;
                    s.querySelector(n).style.display = "block", p = setTimeout(function () {
                        E()
                    }, 5e3)
                }(e))
            }

            function x(e) {
                document.getElementById(e).classList.remove("pressed")
            }

            function C() {
                Array.from(n).forEach(function (e) {
                    e.classList.remove("pressed")
                })
            }

            function P(e) {
                h.instruments[f].howl.play(e)
            }
            var D = function (e) {
                    e.preventDefault(), w()
                },
                L = function (e) {
                    e.preventDefault(), k()
                },
                M = function (e) {
                    e.preventDefault(), b()
                },
                I = function (e) {
                    e.preventDefault(), T(), m = !0, S(this.id)
                },
                O = function (e) {
                    e.preventDefault(), m && S(this.id)
                },
                H = function (e) {
                    e.preventDefault(), x(this.id)
                },
                N = function (e) {
                    e.preventDefault(), T(), g = !0, S(this.id)
                },
                F = function (e) {
                    e.preventDefault(), g && S(this.id)
                },
                R = function (e) {
                    var t = e.originalEvent.touches[0];
                    ! function (r, s) {
                        Array.from(n).forEach(function (e) {
                            var t = e.offset().left,
                                n = e.offset().top - window.scrollTop(),
                                i = e.offset().left + e[0].getBoundingClientRect().width,
                                o = e.offset().top + e[0].getBoundingClientRect().height;
                            t <= r && r <= i && n <= s && s <= o && (C(), P(e[0].id), e.classList.add("pressed"))
                        })
                    }(t.clientX, t.clientY)
                },
                B = function () {
                    m = !1, C()
                },
                q = function () {
                    g = !1, C()
                },
                z = function (e) {
                    if ("false" === s.dataset.loading) switch (T(), e.key) {
                        case "ArrowLeft":
                            e.preventDefault(), k();
                            break;
                        case "ArrowRight":
                            e.preventDefault(), w();
                            break;
                        case "a":
                        case "A":
                            e.preventDefault(), S("C3");
                            break;
                        case "w":
                        case "W":
                            e.preventDefault(), S("Csharp3");
                            break;
                        case "s":
                        case "S":
                            e.preventDefault(), S("D3");
                            break;
                        case "e":
                        case "E":
                            e.preventDefault(), S("Dsharp3");
                            break;
                        case "d":
                        case "D":
                            e.preventDefault(), S("E3");
                            break;
                        case "f":
                        case "F":
                            e.preventDefault(), S("F3");
                            break;
                        case "t":
                        case "T":
                            e.preventDefault(), S("Fsharp3");
                            break;
                        case "g":
                        case "G":
                            e.preventDefault(), S("G3");
                            break;
                        case "y":
                        case "Y":
                            e.preventDefault(), S("Gsharp3");
                            break;
                        case "h":
                        case "H":
                            e.preventDefault(), S("A3");
                            break;
                        case "u":
                        case "U":
                            e.preventDefault(), S("Asharp3");
                            break;
                        case "j":
                        case "J":
                            e.preventDefault(), S("B3");
                            break;
                        case "k":
                        case "K":
                            e.preventDefault(), S("C4");
                            break;
                        case "o":
                        case "O":
                            e.preventDefault(), S("Csharp4");
                            break;
                        case "l":
                        case "L":
                            e.preventDefault(), S("D4");
                            break;
                        case "p":
                        case "P":
                            e.preventDefault(), S("Dsharp4");
                            break;
                        case ";":
                        case ":":
                            e.preventDefault(), S("E4")
                    }
                },
                j = function (e) {
                    switch (e.key) {
                        case "a":
                        case "A":
                            x("C3");
                            break;
                        case "w":
                        case "W":
                            x("Csharp3");
                            break;
                        case "s":
                        case "S":
                            x("D3");
                            break;
                        case "e":
                        case "E":
                            x("Dsharp3");
                            break;
                        case "d":
                        case "D":
                            x("E3");
                            break;
                        case "f":
                        case "F":
                            x("F3");
                            break;
                        case "t":
                        case "T":
                            x("Fsharp3");
                            break;
                        case "g":
                        case "G":
                            x("G3");
                            break;
                        case "y":
                        case "Y":
                            x("Gsharp3");
                            break;
                        case "h":
                        case "H":
                            x("A3");
                            break;
                        case "u":
                        case "U":
                            x("Asharp3");
                            break;
                        case "j":
                        case "J":
                            x("B3");
                            break;
                        case "k":
                        case "K":
                            x("C4");
                            break;
                        case "o":
                        case "O":
                            x("Csharp4");
                            break;
                        case "l":
                        case "L":
                            x("D4");
                            break;
                        case "p":
                        case "P":
                            x("Dsharp4");
                            break;
                        case ";":
                        case ":":
                            x("E4")
                    }
                };
            return {
                init: function () {
                    ! function () {
                        s = document.getElementById("synth"), n = s.querySelectorAll(".synth-key"), t = s.querySelectorAll(".instrument"), e = s.querySelector(".synth-instrument"), i = s.querySelectorAll(".notehead"), o = s.querySelectorAll(".key-letter"), r = s.querySelector(".instrument-prev"), a = s.querySelector(".instrument-next")
                    }()
                },
                start: function () {
                    v(),
                        function () {
                            r.addEventListener("click", L), a.addEventListener("click", D), s.addEventListener("mouseup", B), s.addEventListener("touchend", q), Array.from(n).forEach(function (e) {
                                e.addEventListener("mousedown", I), e.addEventListener("mouseenter", O), e.addEventListener("mouseout", H), e.addEventListener("touchstart", N), e.addEventListener("touchenter", F), e.addEventListener("touchmove", R)
                            }), e.addEventListener("click", M), document.addEventListener("keydown", z), document.addEventListener("keyup", j)
                        }()
                },
                stop: function () {
                    y(),
                        function () {
                            r.removeEventListener("click", L), a.removeEventListener("click", D), s.addEventListener("mouseup", B), s.removeEventListener("touchend", q), Array.from(n).forEach(function (e) {
                                e.removeEventListener("mousedown", I), e.removeEventListener("mouseenter", O), e.removeEventListener("mouseout", H), e.removeEventListener("touchstart", N), e.removeEventListener("touchenter", F), e.removeEventListener("touchmove", R)
                            }), e.removeEventListener("click", M), document.removeEventListener("keydown", z), document.removeEventListener("keyup", j)
                        }()
                }
            }
        }(),
        y = function () {
            var r;
            return {
                init: function () {
                    ! function () {
                        var e, t, n = (new Date).getFullYear();
                        e = n % 4 == 0 && n % 100 != 0 || n % 400 == 0 ? "Well, " + n + " is a leap year, so I guess that makes it 366." : "All 365 days of " + n + ". Every one.";
                        var i = new Date,
                            o = new Date(n, 11, 31);
                        t = Math.ceil((o.getTime() - i.getTime()) / 864e5), r = [
                            ["???: AAAAAHHHHHH!!!", 3e3],
                            ["Something heavy shatters.", 1500, "italic"],
                            ["You hear a muffled curse and the footsteps of someone approaching.", 2500, "italic"],
                            ["???: ...Who’s there?", 2500],
                            ["A door creaks open, revealing a grisled old man with an unkempt beard.", 2500, "italic"],
                            ["His robe is tattered and matted with cat hair.", 3e3, "italic"],
                            ["OLD MAN: You startled me.", 2500],
                            ["OLD MAN: I don’t get visitors often.", 3e3],
                            ["OLD MAN: You must’ve come a long way.", 2500],
                            ["Corkscrewing his pinky finger in his ear, he dislodges a wad of earwax.", 2500, "italic"],
                            ["OLD MAN: I suppose I should introduce myself.", 4e3],
                            ["He brushes cat hair off his robe.", 2e3, "italic"],
                            ["OLD MAN: I’m the man behind the console.", 3e3],
                            ["OLD MAN: You can call me THE WIZARD.", 2e3],
                            ["He does halfhearted jazz hands.", 3e3, "italic"],
                            ["THE WIZARD: Sorry I’m not really dressed for the occasion.", 3e3],
                            ["THE WIZARD: See, you caught me in the middle of work.", 3e3],
                            ["THE WIZARD: I make this website run.", 3e3],
                            ["THE WIZARD: Day and night!", 2e3],
                            ["THE WIZARD: 24 hours a day, 365 days a year.", 2e3],
                            ["THE WIZARD: " + e, 1500],
                            ["THE WIZARD: " + (1 < t ? "Only " + t + " days left..." : "Today’s the last day. Hallelujah!"), 2e3],
                            ["THE WIZARD: Not that anyone’s counting.", 1e3],
                            ["THE WIZARD: Yep. That’s my job.", 1e3],
                            ["THE WIZARD: Everything look ok?", 3e3],
                            ["THE WIZARD: Buttons working?", 1500],
                            ["THE WIZARD: Images loading?", 1200],
                            ["THE WIZARD: Animations animating?", 1e3],
                            ["THE WIZARD: No typos?", 1e3],
                            ["THE WIZARD: No glitches?", 1e3],
                            ["THE WIZARD: No rogue orcs?", 1e3],
                            ["THE WIZARD: ...", 1e3],
                            ["THE WIZARD: Those orcs are a real headache, I tell ya.", 3e3],
                            ["THE WIZARD: If you find anything, would you please let me know?", 2500],
                            ["THE WIZARD: My master is rather... particular.", 2400],
                            ["THE WIZARD: He likes to keep things tidy.", 3e3],
                            ["THE WIZARD: I take mail at this address: thewizard@kyledecker.me", 2e3],
                            ["THE WIZARD: I mean...", 2e3],
                            ["THE WIZARD: ...you don’t have to only write about business.", 4e3],
                            ["THE WIZARD: An old wizard gets lonely.", 6e3],
                            ["THE WIZARD: .", 2e3],
                            ["THE WIZARD: ..", 2e3],
                            ["THE WIZARD: ...", 2e3],
                            ["THE WIZARD: ....", 2e3],
                            ["THE WIZARD: .....you come ‘round these parts much?", 1e3],
                            ["THE WIZARD: Uh, hm, never mind. Just thinking to myself.", 6e3],
                            ["THE WIZARD: Anyways.", 3e3],
                            ["THE WIZARD: Thanks for coming by.", 1500],
                            ["THE WIZARD: You probably have things to do.", 2e3],
                            ["THE WIZARD: Me?", 3e3],
                            ["THE WIZARD: I’ve gotta keep putting the ‘fun’ in ‘functions’!!!", 3e3],
                            ["He expels a loud, forced laugh at his own joke.", 2e3, "italic"],
                            ["He smiles awkwardly.", 6e3, "italic"],
                            ["THE WIZARD vanishes in a puff of smoke without saying goodbye.", 5e3, "italic"],
                            ["The smoke leaves behind a sour odor.", 5e3, "italic"],
                            ["...yup, he’s really gone.", 12e3, "italic"],
                            ["This smell sure is lingering.", 8e3, "italic"],
                            ["THE WIZARD, UNSEEN: What are you still doing here, kid?!", 3e4],
                            ["THE WIZARD: Get off the computer! Go live your life!", 2e3]
                        ]
                    }();
                    var e = /./,
                        t = !1;
                    e.toString = function () {
                        t = !0
                    }, t && function () {
                        for (var n = 0, e = function (e) {
                                var t = r[e][1];
                                setTimeout(function () {
                                    r[e][0], r[e][2]
                                }, n += t)
                            }, t = 0; t < r.length; t++) e(t)
                    }()
                }
            }
        }(),
        b = (n(60), n(61)),
        _ = new r.a({
            plugins: [l.a],
            elements: ["#swup", "#header"],
            scroll: !0,
            animateScroll: !1
        });

    function k() {
        document.cookie = "darkmode = on;  expires = Fri, 31 Dec 9999 23:59:59 GMT", document.body.setAttribute("data-darkmode", "true")
    }

    function E() {
        document.cookie = "darkmode = off;  expires = Fri, 31 Dec 9999 23:59:59 GMT", document.body.setAttribute("data-darkmode", "false")
    }

    function A(e) {
        e.preventDefault();
        var t = this,
            n = new FormData(t),
            i = t.action + ".json",
            o = t.querySelector("#password"),
            r = t.querySelector(".message"),
            s = new XMLHttpRequest;
        s.open("POST", i, !0), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), s.send(n), s.onload = function () {
            if (200 === s.status) {
                var e = JSON.parse(s.responseText);
                !1 === e.success ? (r.innerHTML = e.message, o.blur(), t.classList.add("error"), t.classList.remove("try-again"), t.offsetWidth, t.classList.add("try-again"), setTimeout(function () {
                    o.value = ""
                }, 250), setTimeout(function () {
                    o.focus()
                }, 800)) : !0 === e.success && (r.innerHTML = e.message, o.disabled = !0, t.classList.remove("error", "try-again"), t.classList.add("success"), setTimeout(function () {
                    window.location.reload()
                }, 3e3))
            }
        }
    }! function () {
        "on" === function (e) {
            for (var t = e + "=", n = decodeURIComponent(document.cookie).split(";"), i = 0; i < n.length; i++) {
                for (var o = n[i];
                    " " === o.charAt(0);) o = o.substring(1);
                if (0 === o.indexOf(t)) return o.substring(t.length, o.length)
            }
            return ""
        }("darkmode") ? k(): E()
    }(), document.getElementById("darkmode").addEventListener("click", function () {
        "true" === document.body.getAttribute("data-darkmode") ? E() : k()
    }), document.addEventListener("DOMContentLoaded", function (e) {
        function t() {
            for (var e = document.getElementsByTagName("a"), t = 0; t < e.length; t++) {
                var n = e[t];
                n.getAttribute("href") && n.hostname !== window.location.hostname && (n.target = "_blank")
            }
            if (window.gtag("config", "UA-36543481-1", {
                    page_title: document.title,
                    page_path: window.location.pathname + window.location.search
                }), null !== document.querySelector("#synth") && (v.init(), document.querySelector("#synth-start").addEventListener("click", function () {
                    v.start()
                }), _.on("animationOutStart", function () {
                    v.stop()
                })), null !== document.querySelector(".carousel")) {
                var o = new u.a(".carousel", {
                    wrapAround: !0,
                    selectedAttraction: .04,
                    friction: .35,
                    prevNextButtons: !1
                });
                o.on("staticClick", function (e, t, n, i) {
                    n && o.selectCell(n, !0, !1)
                }), _.on("willReplaceContent", function () {
                    o.destroy()
                })
            }
            var i, r;
            (null !== document.querySelector(".icon-table") && document.querySelector(".table-background-toggle").addEventListener("click", function () {
                document.querySelector(".icon-table").setAttribute("data-color", document.querySelector(".table-background-toggle input:checked").value)
            }), null !== document.querySelector(".annotations")) && new b.WOW({
                boxClass: "annotation",
                offset: 60,
                live: !1
            }).init();
            null !== document.querySelector(".garbled") && (document.querySelectorAll(".garbled").forEach(function (n) {
                r = setTimeout(function e() {
                    var t = a()(n.innerHTML);
                    i = Math.floor(2200 * Math.random() + 1e3), n.innerHTML = function (e) {
                        var t, n, i;
                        return n = Math.floor(Math.random() * e.length), i = Math.floor(Math.random() * e.length), t = e[n], e[n] = e[i], e[i] = t, e.join("")
                    }(t), r = setTimeout(e, i)
                }, i)
            }), _.on("willReplaceContent", function () {
                clearTimeout(r)
            }));
            if (null !== document.getElementById("protected")) {
                var s = document.getElementById("protected");
                s.addEventListener("submit", A, !1), _.on("willReplaceContent", function () {
                    s.removeEventListener("submit", A)
                })
            }
            null !== document.querySelector(".js-player") && Array.from(document.querySelectorAll(".js-player")).map(function (e) {
                return new f.a(e, {
                    controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "airplay", "fullscreen"]
                })
            }).forEach(function (e) {
                e.on("play", function () {
                    this.classList.add("plyr--init-play")
                })
            })
        }! function () {
            t(), h.init({
                onShow: function () {
                    document.body.setAttribute("data-noscroll", "")
                },
                onClose: function () {
                    document.body.removeAttribute("data-noscroll")
                },
                awaitCloseAnimation: !0
            }), y.init()
        }(), document.addEventListener("swup:contentReplaced", function () {
            t()
        })
    })
}]);
//# sourceMappingURL=bundle.js.map