function escapeHtml(e) {
    return e && (e = e.replace(/>/g, "&gt;"), e = e.replace(/</g, "&lt;")), e
}

function getRegex(e) {
    var t = e.map(function(e) {
            return 1 === e.token.length ? e.token : ""
        }).join(),
        a = new RegExp("[^" + t + "]"),
        n = /(^|\n)&gt;&gt;&gt;([\s\S]*$)/,
        s = /(^|\n)&gt;(([^\n]*)(\n&gt;[^\n]*)*)/g,
        i = /\r?\n\r?\n\r?/g,
        o = /\r?\n\r?/g,
        l = /(&lt;https?:\/\/(.*?)(|)?(.*?)?&gt;)/gi,
        r = /(&lt;mailto:)([\da-z\.-]+)\@([a-z0-9\.]{2,6})([\/\w \.-]*)(\|)?([\da-z\.-]+)?\.?([a-z\.]{2,6})?(&gt;)?/gi,
        d = /(!\[)(.*?)(\]\()(https?:\/\/(.*?)+)(\))/gi;
    return {
        nonTokensChars: a,
        multilineQuote: n,
        singleLineQuote: s,
        blockquoteTags: /<\/?blockquote>/gi,
        doubleLineBreak: i,
        singleLineBreak: o,
        url: l,
        email: r,
        image: d
    }
}

function escapeRegExp(e) {
    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
}

function rgbToHsl(e, t, a) {
    e /= 255, t /= 255, a /= 255;
    var n, s, i = Math.max(e, t, a),
        o = Math.min(e, t, a),
        l = (i + o) / 2;
    if (i == o) n = s = 0;
    else {
        var r = i - o;
        switch (s = l > .5 ? r / (2 - i - o) : r / (i + o), i) {
            case e:
                n = (t - a) / r + (t < a ? 6 : 0);
                break;
            case t:
                n = (a - e) / r + 2;
                break;
            case a:
                n = (e - t) / r + 4
        }
        n /= 6
    }
    return {
        h: n,
        s: s,
        l: l
    }
}

function getTokens() {
    var e = [{
        name: "pre",
        token: "```",
        elementName: "pre",
        multiline: !0,
        plainContent: !0
    }, {
        name: "code",
        token: "`",
        elementName: "code",
        ignoreAfter: !0,
        plainContent: !0
    }, {
        name: "bold",
        token: "*",
        elementName: "b",
        requireNonTokens: !0,
        spaceWrapIgnored: !0
    }, {
        name: "italics",
        token: "_",
        elementName: "em",
        requireNonTokens: !0
    }, {
        name: "strikethrough",
        token: "~",
        elementName: "s",
        requireNonTokens: !0,
        spaceWrapIgnored: !0
    }];
    return e.forEach(function(e) {
        if (!e.regex) {
            var t = '(^|[\\s\\?\\.,\\-!\\^;:{(\\[%$#+="])',
                a = e.multiline ? "([\\s\\S]*?)?" : "(.*?\\S *)?",
                n = e.ignoreAfter ? "" : "(?=$|\\s|[\\?\\.,'\\-!\\^;:})\\]%$~{\\[<#+=\"])",
                s = escapeRegExp(e.token),
                i = t + s + a + s + n;
            e.regex = new RegExp(i, "g")
        }
    }), e
}(function() {
    "use strict";

    function e(e) {
        return e = String(e), e.charAt(0).toUpperCase() + e.slice(1)
    }

    function t(e, t, a) {
        var s = {
            6.4: "10",
            6.3: "8.1",
            6.2: "8",
            6.1: "7",
            "6.0": "Vista",
            5.2: "XP 64-bit",
            5.1: "XP",
            5.01: "2000 SP1",
            "5.0": "2000",
            "4.0": "NT",
            "4.90": "ME"
        };
        return t && a && /^Win/i.test(e) && (s = s[/[\d.]+$/.exec(e)]) && (e = "Windows " + s), e = String(e), t && a && (e = e.replace(RegExp(t, "i"), a)), e = n(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").split(" on ")[0])
    }

    function a(e, t) {
        var a = -1,
            n = e ? e.length : 0;
        if ("number" == typeof n && n > -1 && k >= n)
            for (; ++a < n;) t(e[a], a, e);
        else s(e, t)
    }

    function n(t) {
        return t = d(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : e(t)
    }

    function s(e, t) {
        for (var a in e) v.call(e, a) && t(e[a], a, e)
    }

    function i(t) {
        return null == t ? e(t) : w.call(t).slice(8, -1)
    }

    function o(e, t) {
        var a = null != e ? typeof e[t] : "number";
        return !(/^(?:boolean|number|string|undefined)$/.test(a) || "object" == a && !e[t])
    }

    function l(e) {
        return String(e).replace(/([ -])(?!$)/g, "$1?")
    }

    function r(e, t) {
        var n = null;
        return a(e, function(a, s) {
            n = t(n, a, s, e)
        }), n
    }

    function d(e) {
        return String(e).replace(/^ +| +$/g, "")
    }

    function c(e) {
        function a(t) {
            return r(t, function(t, a) {
                return t || RegExp("\\b" + (a.pattern || l(a)) + "\\b", "i").exec(e) && (a.label || a)
            })
        }

        function u(t) {
            return r(t, function(t, a, n) {
                return t || (a[K] || a[/^[a-z]+(?: +[a-z]+\b)*/i.exec(K)] || RegExp("\\b" + l(n) + "(?:\\b|\\w*\\d)", "i").exec(e)) && n
            })
        }

        function p(t) {
            return r(t, function(t, a) {
                return t || RegExp("\\b" + (a.pattern || l(a)) + "\\b", "i").exec(e) && (a.label || a)
            })
        }

        function _(a) {
            return r(a, function(a, n) {
                var s = n.pattern || l(n);
                return !a && (a = RegExp("\\b" + s + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (a = t(a, s, n.label || n)), a
            })
        }

        function f(t) {
            return r(t, function(t, a) {
                var s = a.pattern || l(a);
                return !t && (t = RegExp("\\b" + s + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + s + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(a.label && !RegExp(s, "i").test(a.label) ? a.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), a = a.label || a, t = n(t[0].replace(RegExp(s, "i"), a).replace(RegExp("; *(?:" + a + "[_-])?", "i"), " ").replace(RegExp("(" + a + ")[-_.]?(\\w)", "i"), "$1 $2"))), t
            })
        }

        function k(t) {
            return r(t, function(t, a) {
                return t || (RegExp(a + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null
            })
        }

        function b() {
            return this.description || ""
        }
        var v = m,
            x = e && "object" == typeof e && "String" != i(e);
        x && (v = e, e = null);
        var E = v.navigator || {},
            B = E.userAgent || "";
        e || (e = B);
        var I, T, M = x || y == g,
            S = x ? !!E.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(w.toString()),
            L = "Object",
            q = x ? L : "ScriptBridgingProxyObject",
            C = x ? L : "Environment",
            H = x && v.java ? "JavaPackage" : i(v.java),
            O = x ? L : "RuntimeObject",
            P = /\bJava/.test(H) && v.java,
            A = P && i(v.environment) == C,
            j = P ? "a" : "\u03b1",
            N = P ? "b" : "\u03b2",
            z = v.document || {},
            R = v.operamini || v.opera,
            F = h.test(F = x && R ? R["[[Class]]"] : i(R)) ? F : R = null,
            W = e,
            U = [],
            D = null,
            $ = e == B,
            X = $ && R && "function" == typeof R.version && R.version(),
            G = a(["Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            V = p(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", {
                label: "SRWare Iron",
                pattern: "Iron"
            }, "K-Meleon", "Konqueror", "Lunascape", "Maxthon", "Midori", "Nook Browser", "PhantomJS", "Raven", "Rekonq", "RockMelt", "SeaMonkey", {
                label: "Silk",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Sleipnir", "SlimBrowser", "Sunrise", "Swiftfox", "WebPositive", "Opera Mini", {
                label: "Opera Mini",
                pattern: "OPiOS"
            }, "Opera", {
                label: "Opera",
                pattern: "OPR"
            }, "Chrome", {
                label: "Chrome Mobile",
                pattern: "(?:CriOS|CrMo)"
            }, {
                label: "Firefox",
                pattern: "(?:Firefox|Minefield)"
            }, {
                label: "IE",
                pattern: "IEMobile"
            }, {
                label: "IE",
                pattern: "MSIE"
            }, "Safari"]),
            K = f([{
                label: "BlackBerry",
                pattern: "BB10"
            }, "BlackBerry", {
                label: "Galaxy S",
                pattern: "GT-I9000"
            }, {
                label: "Galaxy S2",
                pattern: "GT-I9100"
            }, {
                label: "Galaxy S3",
                pattern: "GT-I9300"
            }, {
                label: "Galaxy S4",
                pattern: "GT-I9500"
            }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                label: "Kindle Fire",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Nook", "PlayBook", "PlayStation 4", "PlayStation 3", "PlayStation Vita", "TouchPad", "Transformer", {
                label: "Wii U",
                pattern: "WiiU"
            }, "Wii", "Xbox One", {
                label: "Xbox 360",
                pattern: "Xbox"
            }, "Xoom"]),
            Y = u({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    "PlayStation 4": 1,
                    "PlayStation 3": 1,
                    "PlayStation Vita": 1
                }
            }),
            J = _(["Windows Phone ", "Android", "CentOS", "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        if (G && (G = [G]), Y && !K && (K = f([Y])), (I = /\bGoogle TV\b/.exec(K)) && (K = I[0]), /\bSimulator\b/i.test(e) && (K = (K ? K + " " : "") + "Simulator"), "Opera Mini" == V && /\bOPiOS\b/.test(e) && U.push("running in Turbo/Uncompressed mode"), /^iP/.test(K) ? (V || (V = "Safari"), J = "iOS" + ((I = / OS ([\d_]+)/i.exec(e)) ? " " + I[1].replace(/_/g, ".") : "")) : "Konqueror" != V || /buntu/i.test(J) ? Y && "Google" != Y && (/Chrome/.test(V) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(K)) ? (V = "Android Browser", J = /\bAndroid\b/.test(J) ? J : "Android") : (!V || (I = !/\bMinefield\b|\(Android;/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(V))) && (V && !K && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(I + "/") + 8)) && (V = null), (I = K || Y || J) && (K || Y || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(J)) && (V = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(J) ? J : I) + " Browser")) : J = "Kubuntu", (I = /\((Mobile|Tablet).*?Firefox\b/i.exec(e)) && I[1] && (J = "Firefox OS", K || (K = I[1])), X || (X = k(["(?:Cloud9|CriOS|CrMo|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))", "Version", l(V), "(?:Firefox|Minefield|NetFront)"])), "iCab" == G && parseFloat(X) > 3 ? G = ["WebKit"] : "Trident" != G && (I = /\bOpera\b/.test(V) && (/\bOPR\b/.test(e) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(e) && "WebKit" || !G && /\bMSIE\b/i.test(e) && ("Mac OS" == J ? "Tasman" : "Trident")) ? G = [I] : /\bPlayStation\b(?! Vita\b)/i.test(V) && "WebKit" == G && (G = ["NetFront"]), "IE" == V && (I = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (V += " Mobile", J = "Windows Phone " + (/\+$/.test(I) ? I : I + ".x"), U.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (V = "IE Mobile", J = "Windows Phone 8+", U.unshift("desktop mode"), X || (X = (/\brv:([\d.]+)/.exec(e) || 0)[1])) : "IE" != V && "Trident" == G && (I = /\brv:([\d.]+)/.exec(e)) ? (/\bWPDesktop\b/i.test(e) || (V && U.push("identifying as " + V + (X ? " " + X : "")), V = "IE"), X = I[1]) : "Chrome" != V && "IE" == V || !(I = /\bEdge\/([\d.]+)/.exec(e)) || (V = "IE", X = I[1], G = ["Trident"], U.unshift("slaaskPlatform preview")), $) {
            if (o(v, "global"))
                if (P && (I = P.lang.System, W = I.getProperty("os.arch"), J = J || I.getProperty("os.name") + " " + I.getProperty("os.version")), M && o(v, "system") && (I = [v.system])[0]) {
                    J || (J = I[0].os || null);
                    try {
                        I[1] = v.require("ringo/engine").version, X = I[1].join("."), V = "RingoJS"
                    } catch (e) {
                        I[0].global.system == v.system && (V = "Narwhal")
                    }
                } else "object" == typeof v.process && (I = v.process) ? (V = "Node.js", W = I.arch, J = I.slaaskPlatform, X = /[\d.]+/.exec(I.version)[0]) : A && (V = "Rhino");
            else i(I = v.runtime) == q ? (V = "Adobe AIR", J = I.flash.system.Capabilities.os) : i(I = v.phantom) == O ? (V = "PhantomJS", X = (I = I.version || null) && I.major + "." + I.minor + "." + I.patch) : "number" == typeof z.documentMode && (I = /\bTrident\/(\d+)/i.exec(e)) && (X = [X, z.documentMode], (I = +I[1] + 4) != X[1] && (U.push("IE " + X[1] + " mode"), G && (G[1] = ""), X[1] = I), X = "IE" == V ? String(X[1].toFixed(1)) : X[0]);
            J = J && n(J)
        }
        X && (I = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(X) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + ($ && E.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (D = /b/i.test(I) ? "beta" : "alpha", X = X.replace(RegExp(I + "\\+?$"), "") + ("beta" == D ? N : j) + (/\d+\+?/.exec(I) || "")), "Fennec" == V || "Firefox" == V && /\b(?:Android|Firefox OS)\b/.test(J) ? V = "Firefox Mobile" : "Maxthon" == V && X ? X = X.replace(/\.[\d.]+/, ".x") : "Silk" == V ? (/\bMobi/i.test(e) || (J = "Android", U.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && U.unshift("accelerated")) : /\bXbox\b/i.test(K) ? (J = null, "Xbox 360" == K && /\bIEMobile\b/.test(e) && U.unshift("mobile mode")) : !/^(?:Chrome|IE|Opera)$/.test(V) && (!V || K || /Browser|Mobi/.test(V)) || "Windows CE" != J && !/Mobi/i.test(e) ? "IE" == V && $ && null === v.external ? U.unshift("slaaskPlatform preview") : (/\bBlackBerry\b/.test(K) || /\bBB10\b/.test(e)) && (I = (RegExp(K.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || X) ? (I = [I, /BB10/.test(e)], J = (I[1] ? (K = null, Y = "BlackBerry") : "Device Software") + " " + I[0], X = null) : this != s && "Wii" != K && ($ && R || /Opera/.test(V) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == V && /\bOS X (?:\d+\.){2,}/.test(J) || "IE" == V && (J && !/^Win/.test(J) && X > 5.5 || /\bWindows XP\b/.test(J) && X > 8 || 8 == X && !/\bTrident\b/.test(e))) && !h.test(I = c.call(s, e.replace(h, "") + ";")) && I.name && (I = "ing as " + I.name + ((I = I.version) ? " " + I : ""), h.test(V) ? (/\bIE\b/.test(I) && "Mac OS" == J && (J = null), I = "identify" + I) : (I = "mask" + I, V = F ? n(F.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(I) && (J = null), $ || (X = null)), G = ["Presto"], U.push(I)) : V += " Mobile", (I = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (I = [parseFloat(I.replace(/\.(\d)$/, ".0$1")), I], "Safari" == V && "+" == I[1].slice(-1) ? (V = "WebKit Nightly", D = "alpha", X = I[1].slice(0, -1)) : (X == I[1] || X == (I[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1])) && (X = null), I[1] = (/\bChrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == I[0] && 537.36 == I[2] && parseFloat(I[1]) >= 28 && "IE" != V && (G = ["Blink"]), $ && (S || I[1]) ? (G && (G[1] = "like Chrome"), I = I[1] || (I = I[0], 530 > I ? 1 : 532 > I ? 2 : 532.05 > I ? 3 : 533 > I ? 4 : 534.03 > I ? 5 : 534.07 > I ? 6 : 534.1 > I ? 7 : 534.13 > I ? 8 : 534.16 > I ? 9 : 534.24 > I ? 10 : 534.3 > I ? 11 : 535.01 > I ? 12 : 535.02 > I ? "13+" : 535.07 > I ? 15 : 535.11 > I ? 16 : 535.19 > I ? 17 : 536.05 > I ? 18 : 536.1 > I ? 19 : 537.01 > I ? 20 : 537.11 > I ? "21+" : 537.13 > I ? 23 : 537.18 > I ? 24 : 537.24 > I ? 25 : 537.36 > I ? 26 : "Blink" != G ? "27" : "28")) : (G && (G[1] = "like Safari"), I = I[0], I = 400 > I ? 1 : 500 > I ? 2 : 526 > I ? 3 : 533 > I ? 4 : 534 > I ? "4+" : 535 > I ? 5 : 537 > I ? 6 : 538 > I ? 7 : 601 > I ? 8 : "8"), G && (G[1] += " " + (I += "number" == typeof I ? ".x" : /[.+]/.test(I) ? "" : "+")), "Safari" == V && (!X || parseInt(X) > 45) && (X = I)), "Opera" == V && (I = /\bzbov|zvav$/.exec(J)) ? (V += " ", U.unshift("desktop mode"), "zvav" == I ? (V += "Mini", X = null) : V += "Mobile", J = J.replace(RegExp(" *" + I + "$"), "")) : "Safari" == V && /\bChrome\b/.exec(G && G[1]) && (U.unshift("desktop mode"), V = "Chrome Mobile", X = null, /\bOS X\b/.test(J) ? (Y = "Apple", J = "iOS 4.3+") : J = null), X && 0 == X.indexOf(I = /[\d.]+$/.exec(J)) && e.indexOf("/" + I + "-") > -1 && (J = d(J.replace(I, ""))), G && !/\b(?:Avant|Nook)\b/.test(V) && (/Browser|Lunascape|Maxthon/.test(V) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(V) && G[1]) && (I = G[G.length - 1]) && U.push(I), U.length && (U = ["(" + U.join("; ") + ")"]), Y && K && K.indexOf(Y) < 0 && U.push("on " + Y), K && U.push((/^on /.test(U[U.length - 1]) ? "" : "on ") + K), J && (I = / ([\d.+]+)$/.exec(J), T = I && "/" == J.charAt(J.length - I[0].length - 1), J = {
            architecture: 32,
            family: I && !T ? J.replace(I[0], "") : J,
            version: I ? I[1] : null,
            toString: function() {
                var e = this.version;
                return this.family + (e && !T ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
            }
        }), (I = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(W)) && !/\bi686\b/i.test(W) && (J && (J.architecture = 64, J.family = J.family.replace(RegExp(" *" + I), "")), V && (/\bWOW64\b/i.test(e) || $ && /\w(?:86|32)$/.test(E.cpuClass || E.slaaskPlatform) && !/\bWin64; x64\b/i.test(e)) && U.unshift("32-bit")), e || (e = null);
        var Q = {};
        return Q.description = e, Q.layout = G && G[0], Q.manufacturer = Y, Q.name = V, Q.prerelease = D, Q.product = K, Q.ua = e, Q.version = V && X, Q.os = J || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        }, Q.parse = c, Q.toString = b, Q.version && U.unshift(X), Q.name && U.unshift(V), J && V && (J != String(J).split(" ")[0] || J != V.split(" ")[0] && !K) && U.push(K ? "(" + J + ")" : "on " + J), U.length && (Q.description = U.join(" ")), Q
    }
    var u = {
            "function": !0,
            object: !0
        },
        m = u[typeof window] && window || this,
        g = m,
        p = u[typeof exports] && exports,
        _ = u[typeof module] && module && !module.nodeType && module,
        f = p && _ && "object" == typeof global && global;
    !f || f.global !== f && f.window !== f && f.self !== f || (m = f);
    var k = Math.pow(2, 53) - 1,
        h = /\bOpera/,
        y = this,
        b = Object.prototype,
        v = b.hasOwnProperty,
        w = b.toString;
    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return c()
    }) : p && _ ? s(c(), function(e, t) {
        p[t] = e
    }) : m.slaaskPlatform = c()
}).call(this);
var lightMarkdown = {},
    tokens = getTokens(),
    slaaskRegex = getRegex(tokens),
    plainToken = "\u20aa\u20aaPLaiN\u20aa\u20aa",
    slaaskMarkdownOptions = {},
    flavors = {
        slack: {
            bold: !0,
            italics: !0,
            strikethrough: !0,
            pre: !0,
            code: !0,
            longQuote: !0,
            quote: !0,
            autoLink: !0,
            autoEmail: !0,
            autoImage: !0,
            paragraph: !0,
            lineBreaks: !0
        },
        skype: {
            bold: !0,
            italics: !0,
            strikethrough: !0,
            pre: !1,
            code: !1,
            longQuote: !1,
            quote: !1,
            autoLink: !0,
            paragraph: !1,
            lineBreaks: !0
        }
    };
lightMarkdown.setOption = function(e, t) {
    return slaaskMarkdownOptions[e] = !!t, this
}, lightMarkdown.getOption = function(e) {
    return slaaskMarkdownOptions[e]
}, lightMarkdown.setFlavor = function(e) {
    var t = flavors[e];
    if (t)
        for (var a in t) t.hasOwnProperty(a) && (slaaskMarkdownOptions[a] = t[a]);
    return this
}, lightMarkdown.toHtml = function(e, t) {
    e = escapeHtml(e);
    var a = [];
    if (tokens.forEach(function(t) {
            slaaskMarkdownOptions[t.name] && (e = e.replace(t.regex, function(e, n, s) {
                if (!s || t.requireNonTokens && !slaaskRegex.nonTokensChars.test(s) || 1 === t.token.length && (s[0] === t.token || s.slice(-1) === t.token) || t.spaceWrapIgnored && " " === s[0] && " " === s.slice(-1)) return e;
                if ("function" == typeof t.processContent && (s = t.processContent(s)), t.plainContent) {
                    var i = a.push(s) - 1;
                    s = plainToken + i
                }
                return n + "<" + t.elementName + ">" + s + "</" + t.elementName + ">"
            }))
        }), slaaskMarkdownOptions.longQuote && (e = e.replace(slaaskRegex.multilineQuote, function(e, t, a) {
            return "&gt;&gt;&gt;" === e ? e : (a = a.replace(/^([\s]*)(&gt;)*/, function(e, t, a) {
                return a ? e : ""
            }), "<pre>" + a + "</pre>")
        })), slaaskMarkdownOptions.quote && (e = e.replace(slaaskRegex.singleLineQuote, function(e, t, a) {
            return "&gt;" === e ? e : (a = a.replace(/\n&gt;/g, "\n"), "<pre>" + a + "</pre>")
        })), slaaskMarkdownOptions.autoLink && (e = e.replace(slaaskRegex.url, function(e) {
            return e = e.replace("&lt;", ""), e = e.replace("&gt;", ""), e.indexOf("|") != -1 && "" != e.substring(e.indexOf("|") + 1, e.length) ? (match1 = e.substring(0, e.indexOf("|")), match2 = e.substring(e.indexOf("|") + 1, e.length), match1.indexOf("https://files.slack.com") == -1 ? '<a href="' + match1 + '" target="_blank">' + match2 + "</a>" : _slaask.getScreenSize() > 780 && "undefined" == typeof t ? '<a href="' + _slaask.getCdnUrl() + "/proxy/images?url=" + match1 + "&token=" + _slaask.getApiKey() + "&title=" + match2 + '" target="_blank" class="embedly-card" data-card-controls="0" data-card-key="a61ceacdd662457fa5189966e6fa04fa" data-card-align="left">Loading...</a>' : '<a href="' + _slaask.getCdnUrl() + "/proxy/images?url=" + match1 + "&token=" + _slaask.getApiKey() + "&title=" + match2 + '" target="_blank">' + match2 + "</a>") : e.indexOf("https://files.slack.com") == -1 ? _slaask.getScreenSize() > 780 && "undefined" == typeof t ? '<a href="' + e + '" target="_blank" class="embedly-card" data-card-controls="0" data-card-key="a61ceacdd662457fa5189966e6fa04fa" data-card-align="left">Loading...</a>' : '<a href="' + e + '" target="_blank">' + e + "</a>" : _slaask.getScreenSize() > 780 && "undefined" == typeof t ? '<div class="slaask-link-container"><a href="' + _slaask.getCdnUrl() + "/proxy/images?url=" + e + "&token=" + _slaask.getApiKey() + "&title=" + e + '" target="_blank" class="embedly-card" data-card-controls="0" data-card-key="a61ceacdd662457fa5189966e6fa04fa" data-card-align="left">Loading...</a></div>' : '<a href="' + _slaask.getCdnUrl() + "/proxy/images?url=" + e + "&token=" + _slaask.getApiKey() + "&title=" + e + '" target="_blank">' + e + "</a>"
        })), slaaskMarkdownOptions.autoEmail && (e = e.replace(slaaskRegex.email, function(e) {
            return e = e.replace("&lt;", ""), e = e.replace("&gt;", ""), '<a href="' + e + '" target="_blank">' + e.replace("mailto:", "") + "</a>"
        })), slaaskMarkdownOptions.autoImage && (e = e.replace(slaaskRegex.image, function(e, a, n, s, i) {
            return i.indexOf("https://files.slack.com") == -1 ? i.indexOf("https://slack-files.com") == -1 ? _slaask.getScreenSize() > 780 && "undefined" == typeof t ? '<a href="' + i + '" target="_blank" data-card-type="image" class="embedly-card" data-card-controls="0" data-card-key="a61ceacdd662457fa5189966e6fa04fa" data-card-align="left">' + n + "</a>" : '<a href="' + i + '" target="_blank"><img onload="_slaask.scrollToBottom()" src="' + i + '"/></a>' : '<a href="' + i + '" target="_blank" class="embedly-card" data-card-controls="0" data-card-key="a61ceacdd662457fa5189966e6fa04fa" data-card-align="left">Loading...</a>' : _slaask.getScreenSize() > 780 && "undefined" == typeof t ? '<a href="' + _slaask.getCdnUrl() + "/proxy/images?url=" + i + "&token=" + _slaask.getApiKey() + '" target="_blank" class="embedly-card" data-card-type="image" data-card-controls="0" data-card-key="a61ceacdd662457fa5189966e6fa04fa" data-card-align="left">' + n + "</a>" : '<a href="' + _slaask.getCdnUrl() + "/proxy/images?url=" + i + "&token=" + _slaask.getApiKey() + '" target="_blank"><img onload="_slaask.scrollToBottom()" src="' + _slaask.getCdnUrl() + "/proxy/images?url=" + i + "&token=" + _slaask.getApiKey() + '"/></a>'
        })), slaaskMarkdownOptions.paragraph) {
        for (var n, s = []; n = slaaskRegex.doubleLineBreak.exec(e);) s.push({
            start: n.index,
            length: n[0].length
        });
        for (; n = slaaskRegex.blockquoteTags.exec(e);) s.push({
            start: n.index,
            length: n[0].length,
            suffix: n[0]
        });
        s.push({
            start: e.length,
            length: 0
        }), s.sort(function(e, t) {
            return e.start - t.start
        });
        var i = "",
            o = 0;
        s.forEach(function(t) {
            var a = "",
                n = e.substring(o, t.start);
            n && (a = "<p>" + n + "</p>"), t.suffix && (a += t.suffix), i += a, o = t.start + t.length
        }), e = i
    }
    return slaaskMarkdownOptions.lineBreaks && (e = e.replace(slaaskRegex.singleLineBreak, "<br/>")), a.forEach(function(t, a) {
        e = e.replace(plainToken + a, t)
    }), e
}, lightMarkdown.setFlavor("slack");
var slaaskApp = function() {
        var e = 1488296415,
            t = "default";
        if ("debug" == t) var n = document.location.origin,
            s = document.location.origin;
        else var n = "https://slaask.com",
            s = "https://cdn.slaask.com";
        var o = function(e, t) {
                try {
                    return localStorage.setItem(e, t)
                } catch (e) {
                    return null
                }
            },
            l = function(e) {
                try {
                    return localStorage.getItem(e)
                } catch (e) {
                    return null
                }
            },
            r = null,
            d = 0,
            c = null,
            u = [],
            m = [],
            g = [],
            p = [],
            _ = 0,
            f = !1,
            k = 0,
            h = 0,
            y = 0,
            b = "",
            v = "one",
            w = "",
            x = 0,
            E = 0,
            B = 0,
            I = 0,
            T = 0,
            M = !1,
            S = !1,
            L = !1,
            q = !1,
            C = null,
            H = null,
            O = null;
        if (null == l("slaask-widget-opened")) {
            o("slaask-widget-opened", !1);
            var P = !1
        } else var P = "true" == l("slaask-widget-opened");
        if (null == l("slaask-widget-typed-text")) var A = "";
        else var A = l("slaask-widget-typed-text");
        var j = !1,
            N = !1,
            z = !1,
            R = !0,
            F = !0,
            W = !0,
            U = document.title,
            D = navigator.userAgent.indexOf("MSIE") != -1 || navigator.appVersion.indexOf("Trident/") > 0,
            $ = "",
            X = "web",
            G = "",
            d = "",
            V = "",
            K = "",
            Y = "",
            J = "",
            Q = "",
            Z = "",
            ee = "",
            te = "",
            ae = 0,
            ne = null,
            se = null,
            ie = {
                "<3": "heart",
                ":o)": "monkey_face",
                ":*": "kiss",
                ":-*": "kiss",
                "</3": "broken_heart",
                ":slightly_smiling_face:": "simple_smile",
                "=)": "simple_smile",
                "=-)": "simple_smile",
                "C:": "simple_smile",
                "c:": "simple_smile",
                ":D": "smile",
                ":-D": "smile",
                ":>": "laughing",
                ":->": "laughing",
                ";)": "wink",
                ";-)": "wink",
                ":)": "simple_smile",
                "(:": "simple_smile",
                ":-)": "simple_smile",
                "8)": "sunglasses",
                ":|": "neutral_face",
                ":-|": "neutral_face",
                ":\\": "confused",
                ":-\\": "confused",
                ":/": "confused",
                ":-/": "confused",
                ":p": "stuck_out_tongue",
                ":-p": "stuck_out_tongue",
                ":P": "stuck_out_tongue",
                ":-P": "stuck_out_tongue",
                ":b": "stuck_out_tongue",
                ":-b": "stuck_out_tongue",
                ";p": "stuck_out_tongue_winking_eye",
                ";-p": "stuck_out_tongue_winking_eye",
                ";b": "stuck_out_tongue_winking_eye",
                ";-b": "stuck_out_tongue_winking_eye",
                ";P": "stuck_out_tongue_winking_eye",
                ";-P": "stuck_out_tongue_winking_eye",
                "):": "disappointed",
                ":(": "disappointed",
                ":-(": "disappointed",
                ">:(": "angry",
                ">:-(": "angry",
                ":'(": "cry",
                "D:": "anguished",
                ":o": "open_mouth",
                ":-o": "open_mouth"
            };
        this.init = function(e, t, a) {
            return N ? {
                success: !1,
                error: "Already initialized"
            } : /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent) ? {
                success: !1,
                error: "Slaask is disabled for search crawlers"
            } : (this.initWithOptions(t), Se("Initialization"), N = !0, api_key = e, G = le(), Nt("/api/initialize_widget", {
                key: api_key,
                language: navigator.language,
                guest_token: G
            }, me), void("undefined" != typeof a && a(G)))
        }, this.initWithOptions = function(e) {
            "undefined" != typeof e && (r = e, z = "undefined" != typeof e.debug && e.debug, G = "undefined" != typeof e.visitor_token && e.visitor_token, R = "undefined" == typeof e.display_bubble || e.display_bubble, "undefined" != typeof e.cdn_url && (s = e.cdn_url), "undefined" != typeof e.custom_url && (n = e.custom_url, s = e.custom_url), "undefined" != typeof e.user_group_id && (x = e.user_group_id), "undefined" != typeof e.force_cache_last && (F = e.force_cache_last), "undefined" != typeof e.cookies_on_subdomains && (W = e.cookies_on_subdomains), "undefined" != typeof e.source && (X = e.source))
        }, this.on = function(e, t) {
            document.addEventListener("slaask." + e, function(e) {
                t({
                    event: e.type,
                    detail: e.detail
                })
            })
        }, this.auth = function(e) {
            "undefined" != typeof e ? (G = e, last_message_id = 0, de("slaask-token-" + api_key, G, 730)) : G = de("slaask-token-" + api_key, ce(), 730), document.getElementById("slaask-widget-container").innerHTML = '<ul id="conversation-list" class="slaask-messages"></ul>', vt(null, greeting_message, support_name, null, support_img), je(it)
        }, this.identify = function(e, t) {
            "" == t.email && (t.email = null), C = {
                display_name: e,
                more: t
            }
        }, this.message = function(e, t, a, n) {
            dt(null, e, t, a, n), Ut(t)
        }, this.surveys = function() {
            aa()
        }, this.survey = function(e) {
            "undefined" != typeof e && (I = e - 1, aa())
        }, this.show = function(e, t) {
            "undefined" == typeof t && (t = !1), is_iPhone && (previously_scrolled_top = document.body.scrollTop, Le(document.getElementsByTagName("body")[0], "slaask-fixed")), unread_messages = 0, Le("messages-counter", "slaask-hidden"), document.getElementById("messages-counter").getElementsByTagName("li")[0] = 1, document.getElementById("messages-counter").getElementsByTagName("li")[1] = 2, $t(0), Dt(), document.getElementById("slaask-button-image").style["background-image"] = 'url("' + message_displayed_image + '")', !P || t ? ("undefined" != typeof e && "undefined" != typeof e.by ? Jt("slaask.open", {
                by: e.by
            }) : Jt("slaask.open", {
                by: "new_message"
            }), "undefined" != typeof e && "undefined" != typeof e.message && et(e.message), Le("slaask-button", "slaask-opened"), Le("slaask-message", "slaask-hidden"), mini_widget && qe("slaask-gradient", "slaask-hidden"), qe("slaask-widget", "slaask-hidden"), setTimeout(function() {
                Le("slaask-widget", "slaask-widget-loaded")
            }, 1e3), o("slaask-widget-opened", !0), P = !0, At()) : "undefined" != typeof e && "undefined" != typeof e.message && et(e.message), available ? (screen_width >= 780 && document.getElementById("slaask-input").focus(), document.getElementById("slaask-prechat-question-input") && document.getElementById("slaask-prechat-question-input").focus(), Ze()) : document.getElementById("slaask-email-input") && (C && C.more && null != C.more.email ? (document.getElementById("slaask-email-input").value = C.more.email, document.getElementById("slaask-offline-message-input").focus()) : document.getElementById("slaask-email-input").focus())
        }, this.hide = function(e) {
            P && (is_iPhone && (qe(document.getElementsByTagName("body")[0], "slaask-fixed"), document.body.scrollTop = previously_scrolled_top), screen_width >= 780 && document.getElementById("slaask-input").blur(), Dt(), Le("slaask-widget", "slaask-hidden"), mini_widget && Le("slaask-gradient", "slaask-hidden"), qe("slaask-widget", "slaask-widget-loaded"), qe("slaask-button", "slaask-opened"), "undefined" != typeof e && "undefined" != typeof e.by ? Jt("slaask.close", {
                by: e.by
            }) : Jt("slaask.close", {
                by: "new_message"
            }), o("slaask-widget-opened", !1), P = !1)
        }, this.updateVisitorInfos = function(e, t) {
            default_infos = {
                key: api_key,
                token: G,
                user_infos: C,
                current_page: window.location.href
            };
            for (var a in e) default_infos[a] = e[a];
            "undefined" == typeof t && (t = Re), Nt("/api/update_visitor", default_infos, t)
        }, this.sendMessageToSlack = function(e, t) {
            send_data = {
                key: api_key,
                token: G,
                message: e,
                user_group_id: y,
                no_database_saving: !0
            }, "undefined" == typeof t && (t = Re), Nt("/api/publish", send_data, t)
        }, this.parseMessageHtml = function(e, t) {
            return null == e ? "" : (e = Rt(e), e = Ft(e), e = lightMarkdown.toHtml(e, t), e = Wt(e), Xt(e))
        }, this.getApiKey = function() {
            return api_key
        }, this.getCdnUrl = function() {
            return s
        }, this.getScreenSize = function() {
            return screen_width
        }, this.getScreenHeight = function() {
            return screen_height
        }, this.createScriptTag = function(e) {
            var t = document.createElement("script");
            return t.src = e, document.getElementsByTagName("head")[0].appendChild(t), t
        }, this.scrollToBottom = function() {
            var e = document.getElementById("slaask-widget-container");
            e.scrollTop = e.scrollHeight
        };
        var oe = function() {
                var e = re("slaask-message-" + api_key);
                return "" == e && (de("slaask-message-" + api_key, ce(), 1), !0)
            },
            le = function() {
                var e = re("slaask-token-" + api_key);
                return "" != e ? e : de("slaask-token-" + api_key, ce(), 730)
            },
            re = function(e) {
                for (var t = e + "=", a = document.cookie.split(";"), n = 0; n < a.length; n++) {
                    for (var s = a[n];
                        " " == s.charAt(0);) s = s.substring(1);
                    if (0 == s.indexOf(t)) return s.substring(t.length, s.length)
                }
                return ""
            },
            de = function(e, t, a) {
                var n = new Date;
                n.setTime(n.getTime() + 24 * a * 60 * 60 * 1e3);
                var s = "expires=" + n.toUTCString();
                if (W) {
                    for (var i = document.domain.split("."), o = 0; o < i.length - 1;) domain = i.slice(-1 - ++o).join("."), Se("Cookie created on " + domain), document.cookie = e + "=" + t + "; domain=" + domain + "; path=/; " + s;
                    Se("Cookie created on " + document.domain), document.cookie = e + "=" + t + "; domain=" + document.domain + "; path=/; " + s
                } else Se("Cookie created on " + document.domain), document.cookie = e + "=" + t + "; path=/; " + s;
                return t
            },
            ce = function() {
                return first = Math.random().toString(36).substr(2), second = Math.random().toString(36).substr(2), first + second
            },
            ue = function(e, t) {
                "undefined" != typeof t && ge(t), errored || (hide_on_mobile || 1 != available && "hidden" == offline_mode ? je(function(e) {
                    S = e.already_registered, d = e.id, Ne()
                }) : 0 == d ? (He(), "undefined" == typeof Pusher ? Oe(function() {
                    "undefined" == typeof embedly ? Pe(pe) : pe()
                }) : "undefined" == typeof embedly ? Pe(pe) : pe()) : pe())
            },
            me = function(a) {
                if (a.success)
                    if (a.config.version != e)
                        if (F) {
                            Se("Cached version, forcing new version");
                            var n = document.createElement("script");
                            "debug" == t ? n.src = s + "/chat_debug.js?v=" + a.config.version : n.src = s + "/chat.js?v=" + a.config.version, n.type = "text/javascript", n.async = "true", n.onload = n.onreadystatechange = function() {
                                var e = this.readyState;
                                if (!e || "complete" == e || "loaded" == e) try {
                                    var t = new slaaskApp;
                                    if (C) {
                                        var a = C.display_name;
                                        delete C.display_name, t.identify(a, C)
                                    }
                                    r ? (r.force_cache_last = !1, t.init(api_key, r)) : t.init(api_key, {
                                        force_cache_last: !1
                                    })
                                } catch (e) {
                                    Se(e)
                                }
                            };
                            var i = document.getElementsByTagName("script")[0];
                            i.parentNode.insertBefore(n, i)
                        } else Se("Invalid version");
                else {
                    try {
                        slaaskFavicon = new Favico({
                            bgColor: "#fc576b",
                            animation: "none"
                        })
                    } catch (e) {}
                    a.config.source != X && Nt("/api/update_source", {
                        api_key: api_key,
                        source: X
                    }, Re), slaaskPresenceChannel = null, slaaskPusher = null, members_count = 0, unread_messages = 0, errored = !1, last_messages_hash = [], direction = a.config.direction, window_title = a.config.window_title, window_color = a.config.window_color, title_color = a.config.title_color, chat_color = "#FFFFFF", guest_chat_color = a.config.chat_color, chat_text_color = "#444444", alert_background_color = a.config.alert_background_color, alert_text_color = a.config.alert_text_color, guest_chat_text_color = a.config.chat_text_color, support_img = a.config.support_img, message_displayed_image = a.config.message_displayed_image, $ = a.config.api_ws_token, support_name = a.config.displayed_name, greeting_message = a.config.online_greetings, offline_greeting_message = a.config.offline_greetings, button_size = a.config.button_size, time_before_message = a.config.time_before_message, time_showing_message = a.config.time_showing_message, plan = a.config.plan, client_ip = a.config.ip, available = a.config.available, offline_mode = a.config.offline_mode;
                    var o = window,
                        l = document,
                        d = l.documentElement,
                        c = l.getElementsByTagName("body")[0],
                        u = o.innerWidth || d.clientWidth || c.clientWidth,
                        p = o.innerHeight || d.clientHeight || c.clientHeight;
                    screen_width = u, screen_height = p, a.config.hide_on_mobile ? hide_on_mobile = screen_width < 780 : hide_on_mobile = !1, hide_slaask_button = a.config.hide_slaask_button, a.config.show_welcome_message ? show_welcome_message = screen_width > 780 : show_welcome_message = !1, screen_width < 780 || "native" == t ? mini_widget = !1 : mini_widget = a.config.mini_widget, is_iPhone = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, previously_scrolled_top = null, state = null, online_input_content = a.config.online_input_content, message_sending_text = a.config.message_sending_text, message_delivered_text = a.config.message_delivered_text, online_submit_content = a.config.online_submit_content, offline_email_content = a.config.offline_email_content, offline_message_content = a.config.offline_message_content, offline_object_content = a.config.offline_object_content, offline_submit_content = a.config.offline_submit_content, offline_submit_another_content = a.config.offline_submit_another_content, offline_submit_thanks = a.config.offline_submit_thanks, online_submit_color = a.config.online_submit_color, online_submit_background = a.config.online_submit_background, offline_submit_color = a.config.offline_submit_color, offline_submit_background = a.config.offline_submit_background, offline_email_address = a.config.offline_email_address, geoloc_method = a.config.geoloc_method, m = a.config.user_groups, g = a.config.analytics_keys, widget_users = a.config.widget_users, k = a.config.faqs_count, email_asking = a.config.email_asking, email_asking_time = a.config.email_asking_time, email_asking_time_in_conv = a.config.email_asking_time_in_conv, email_asking_content = a.config.email_asking_content, email_asking_content_with_email = a.config.email_asking_content_with_email, email_placeholder_content = a.config.email_placeholder_content, email_submit_content = a.config.email_submit_content, file_sharing_activated = a.config.file_sharing_activated, whitelabel_html = a.config.whitelabel_html, group_asking_title = a.config.group_asking_title, title_changing_text = a.config.title_changing_text, audio_ring = new Audio(s + a.config.audio_ring_url), widget_left = a.config.widget_left, K = a.config.bot_name, Y = a.config.bot_image, J = a.config.bot_success_text, Q = a.config.bot_oops_text, Z = a.config.bot_email_text, ee = a.config.bot_email_button, te = a.config.bot_input_text, screenshot_question_declined = a.config.screenshot_question_declined, screenshot_user_not_triggered = a.config.screenshot_user_not_triggered, screenshot_user_triggered = a.config.screenshot_user_triggered, uploading_screenshot = a.config.uploading_screenshot, uploading = a.config.uploading, email_not_valid = a.config.email_not_valid, screenshot_question = a.config.screenshot_question, pattern_image = a.config.pattern_image, start_with_faq = a.config.start_with_faq, bot_start_button = a.config.bot_start_button, bot_live_start = a.config.bot_live_start, closed_conversation_text = a.config.closed_conversation_text, yes_button_value = a.config.yes_button_value, no_button_value = a.config.no_button_value, log_out_button = a.config.log_out_button, ticketing_system_names = a.config.ticketing_system_names, survey_end_text = a.config.survey_end_text, busy_message = a.config.busy_message, pending_waiting_time_text = a.config.pending_waiting_time_text, pending_wait_button_text = a.config.pending_wait_button_text, pending_faq_button_text = a.config.pending_faq_button_text, pending_email_button_text = a.config.pending_email_button_text, pending_ok_button_text = a.config.pending_ok_button_text, faq_try_again = a.config.faq_try_again, pending_introduce = a.config.pending_introduce, pending_introduce_faq = a.config.pending_introduce_faq, ue()
                } else errored = !0, a.message ? console.log("Slaask API Error: " + a.message) : console.log("Slaask API Error: " + a.config)
            },
            ge = function(e) {
                "undefined" != typeof e.hide_header && (L = e.hide_header)
            },
            pe = function() {
                if (document.body) var e = 0;
                else var e = 2e3;
                setTimeout(function() {
                    Ae(), je(it), we(), file_sharing_activated && xe(), _e()
                }, e)
            },
            _e = function() {
                file_sharing_activated && (document.getElementById("slaask-send-input-trigger").addEventListener("click", function() {
                    return fe(), Le("slaask-send-input-trigger", "slaask-hidden"), qe("slaask-paperclip", "slaask-hidden"), !1
                }), document.getElementById("slaask-send-input-trigger").addEventListener("click", function() {
                    return document.getElementById("slaask-file-input").focus(), !1
                }), document.getElementById("slaask-file-input").addEventListener("change", function(e) {
                    if (file = e.target.files[0], file) {
                        var t = new FileReader,
                            a = this.value.split("\\").pop();
                        t.onload = function(e) {
                            var t = e.target.result,
                                n = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2),
                                s = {
                                    key: api_key,
                                    guest_id: d,
                                    file_data: btoa(t),
                                    filename: a,
                                    user_group_id: y,
                                    message_hash: n
                                };
                            Nt("/api/upload_file", s, Re), ct(uploading + " :cloud: :\n`" + a + "`", "", n)
                        }, t.readAsBinaryString(file)
                    }
                }));
                document.getElementById("slaask-input").addEventListener("change", function() {
                    o("slaask-widget-typed-text", document.getElementById("slaask-input").value)
                }), document.getElementById("slaask-form").addEventListener("keyup", function() {
                    "" != document.getElementById("slaask-input").value ? Je() : Qe()
                }), document.getElementById("slaask-form").addEventListener("keydown", function(e) {
                    13 != e.which || e.shiftKey || (e.preventDefault(), fe())
                })
            },
            fe = function() {
                if (document.getElementById("slaask-input").style.height = "40px", document.getElementById("slaask-widget-footer").style.height = "62px", document.getElementById("slaask-emoji-container").style.bottom = "94px", document.getElementById("slaask-widget-container").style.bottom = "94px", message = document.getElementById("slaask-input").value, message.length > 0) {
                    if (c = null, "online" == state || "online:pending:chat" == state) {
                        if (message_hash = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2), message = Gt(message), "undefined" == typeof e) var e = null;
                        send_data = {
                            key: api_key,
                            token: G,
                            message: message,
                            user_group_id: y,
                            message_hash: message_hash,
                            trigger: e
                        }, C && C.more && null != C.more.avatar && (send_data.avatar = C.more.avatar), last_messages_hash.push(message_hash), slaaskPresenceChannel.trigger("client-new_message", send_data), Nt("/api/publish", send_data, Fe), Dt(), se = message, email_asking && ke(), ct(message, message_sending_text, message_hash)
                    } else De("faq") ? (ma(message), va(), jt("slaask-message-offline"), ct(message)) : (C && C.more && null != C.more.email ? (document.getElementById("slaask-email-input").value = C.more.email, document.getElementById("slaask-offline-message-input").focus()) : document.getElementById("slaask-email-input").focus(), document.getElementById("slaask-offline-message-input").value = message);
                    et(""), Jt("slaask.sent_message", {
                        message: message,
                        from: d
                    })
                } else screen_width >= 780 && document.getElementById("slaask-input").focus()
            },
            ke = function() {
                clearTimeout(H), q = !0;
                var e = O ? email_asking_time_in_conv : email_asking_time;
                e > 0 && (H = setTimeout(function() {
                    if (q) {
                        var t = {
                            key: api_key,
                            token: G
                        };
                        Nt("/api/check_away", t, function(t) {
                            t.away && he(e)
                        })
                    }
                }, e))
            },
            he = function(e) {
                if (should_ask = !(C && C.more && null != C.more.email), should_ask) {
                    email_question_html = "<p>" + _slaask.parseMessageHtml(email_asking_content) + '</p><form id="slaask-not-answering-email"><input id="slaask-not-answering-email-input" class="slaask-input slaask-input-survey" placeholder="' + email_placeholder_content.replace(/\"/g, "&quot;").replace(/\'/g, "&#39;") + '" type="email" value="" required="required"/><input type="submit" class="slaask-btn" id="slaask-rating-sutmit" value="' + email_submit_content.replace(/\"/g, "&quot;").replace(/\'/g, "&#39;") + '"/></form>', ea(email_question_html, "slaask-email-asking-question", !0), At();
                    var t = {
                        key: api_key,
                        token: G,
                        text: Ft(Rt(email_asking_content)),
                        email_asked: !0,
                        asking_time: e
                    };
                    Nt("/api/away_warning", t, Re), document.getElementById("slaask-not-answering-email").addEventListener("submit", function(e) {
                        e.preventDefault();
                        var t = document.getElementById("slaask-not-answering-email-input").value,
                            a = {
                                key: api_key,
                                token: G,
                                attr: "email",
                                value: t,
                                email_asked: !0
                            };
                        C || (C = {}), C.more || (C.more = {}), C.more.email = t, Jt("slaask.email_captured", {}), Nt("/api/update_visitor_email", a, Re), document.getElementById("slaask-not-answering-email").innerHTML = "", ct(t)
                    })
                } else if (email_asking_content_with_email) {
                    vt(null, email_asking_content_with_email, K, null, Y), At();
                    var t = {
                        key: api_key,
                        token: G,
                        text: Ft(Rt(email_asking_content_with_email)),
                        email_asked: !1,
                        asking_time: O ? email_asking_time_in_conv : email_asking_time
                    };
                    Nt("/api/away_warning", t, Re)
                }
            },
            ye = function(e, t, a) {
                var n = "<p>" + screenshot_question + '</p><form><input type="button" class="slaask-btn" value="' + yes_button_value + '"/><input type="button" class="slaask-btn" value="' + no_button_value + '"/><input type="hidden" value="" name="response"/></form>',
                    s = Math.random().toString(36).substr(2);
                vt(s, n, t, !1, a, !1);
                var i = document.getElementById("slaask-message-" + s);
                At();
                for (var o = i.getElementsByTagName("form")[0].getElementsByClassName("slaask-btn"), l = 0; l < o.length; l++) o[l].addEventListener("click", function() {
                    i.getElementsByTagName("form")[0].response.value = this.getAttribute("value"), i.getElementsByTagName("form")[0].dispatchEvent(new Event("submit"))
                });
                Et(), i.getElementsByTagName("form")[0].addEventListener("submit", function(n) {
                    if (n.preventDefault(), this.response.value == yes_button_value) be(!1, e, t, a);
                    else {
                        var s = {
                            key: api_key,
                            guest_id: d,
                            file_data: null,
                            user_group_id: y
                        };
                        Nt("/api/upload_html", s, Re), vt(Math.random().toString(36).substr(2), screenshot_question_declined, t, !1, a, !1)
                    }
                    return i.getElementsByTagName("form")[0].style.display = "none", !1
                })
            },
            be = function(e, t, a, n) {
                for (var s = document.getElementsByTagName("html")[0].outerHTML, i = [], o = document.getElementsByTagName("canvas"), l = 0; l < o.length; l++) i.push(o[l].toDataURL());
                scrolls = {};
                var r = function(e, t) {
                    t.top = e.scrollTop, t.left = e.scrollLeft, t.children = [];
                    for (var a = 0; a < e.children.length; a++) "SCRIPT" != e.children[a].tagName && (t.children.push({}), r(e.children[a], t.children[t.children.length - 1]))
                };
                r(document.body, scrolls);
                for (var c = [], u = document.getElementsByTagName("iframe"), l = 0; l < u.length; l++) try {
                    var m;
                    u[l].contentDocument ? m = u[l].contentDocument : u[l].contentWindow && (m = u[l].contentWindow.document);
                    for (var g = [], o = m.getElementsByTagName("canvas"), p = 0; p < o.length; p++) g.push(o[p].toDataURL());
                    if (m.doctype) var _ = "<!DOCTYPE " + m.doctype.name + (m.doctype.publicId ? ' PUBLIC "' + m.doctype.publicId + '"' : "") + (!m.doctype.publicId && m.doctype.systemId ? " SYSTEM" : "") + (m.doctype.systemId ? ' "' + m.doctype.systemId + '"' : "") + ">";
                    else var _ = "";
                    c.push({
                        html: m.getElementsByTagName("html")[0].outerHTML,
                        src: m.location.href,
                        doctype: _,
                        canvases_data: g
                    })
                } catch (e) {
                    c.push({
                        html: null,
                        src: u[l].getAttribute("src"),
                        doctype: null,
                        canvases_data: null
                    })
                }
                var f = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
                if (document.doctype) var k = "<!DOCTYPE " + document.doctype.name + (document.doctype.publicId ? ' PUBLIC "' + document.doctype.publicId + '"' : "") + (!document.doctype.publicId && document.doctype.systemId ? " SYSTEM" : "") + (document.doctype.systemId ? ' "' + document.doctype.systemId + '"' : "") + ">";
                else var k = "";
                var h = document.getElementsByTagName("base")[0];
                h = h ? h.getAttribute("href") : document.location.href;
                for (var b = "", l = 0; l < document.styleSheets.length; l++) {
                    var v = document.styleSheets[l];
                    if (v.cssRules)
                        for (var p = 0; p < v.cssRules.length; p++) b += v.cssRules[p].cssText
                }
                var w = {
                    key: api_key,
                    guest_id: d,
                    doctype: k,
                    show_widget: t,
                    user_triggered: e,
                    url: h,
                    window_width: window.innerWidth,
                    window_height: window.innerHeight,
                    file_data: s,
                    scrolls: scrolls,
                    css: b,
                    canvases_data: i,
                    iframes_data: c,
                    filename: "Screenshot" + (new Date).getTime() + ".html",
                    user_group_id: y,
                    message_hash: f
                };
                if (Nt("/api/upload_html", w, Re), e) var x = screenshot_user_triggered;
                else var x = screenshot_user_not_triggered;
                vt(Math.random().toString(36).substr(2), x, a || K, !1, n || Y, !1), ct(uploading_screenshot + " :cloud:", "", f)
            },
            ve = function() {
                offline_email_address && document.getElementById("slaask-offline-form").addEventListener("submit", function(e) {
                    e.preventDefault(), email = document.getElementById("slaask-email-input").value, document.getElementById("slaask-offline-ticketing_system-input") ? ticketing_system = document.getElementById("slaask-offline-ticketing_system-input").value : ticketing_system = null, message = document.getElementById("slaask-offline-message-input").value, email.length > 0 && message.length > 0 && (/^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) ? (send_data = {
                        key: api_key,
                        guest_id: d,
                        email: email,
                        message: message,
                        ticketing_system_key: ticketing_system
                    }, Nt("/api/send_email", send_data, Re), jt("slaask-message-offline"), jt(Lt("oops-faq")), offline_submit_thanks && (c = null, wt('<div><div><i style="color:' + chat_text_color + '!important">' + K + "</i></div><div><p>" + offline_submit_thanks + '</p><div id="slaask-open-email-form" class="slaask-btn">' + offline_submit_another_content + "</div>", "re-slaask-open-email-form", Y), document.getElementById("slaask-open-email-form").addEventListener("click", function() {
                        jt("re-slaask-open-email-form"), offline_email_address && (It(), ve())
                    }))) : (document.getElementById("slaask-offline-form-error").innerHTML = email + " " + email_not_valid, document.getElementById("slaask-email-input").focus()))
                })
            },
            we = function() {
                var e = document.getElementById("slaask-open-widget");
                null != e && e.addEventListener("click", function(e) {
                    e.preventDefault(), _slaask.show({
                        by: "external_link",
                        message: this.dataset.message
                    })
                });
                var t = document.getElementsByClassName("slaask-open-widget");
                if (t.length > 0)
                    for (var a = 0; a < t.length; a++) t[a].addEventListener("click", function(e) {
                        e.preventDefault(), _slaask.show({
                            by: "external_link",
                            message: this.dataset.message
                        })
                    });
                document.getElementById("slaask-button").addEventListener("click", function() {
                    Ce("slaask-button", "slaask-opened") ? _slaask.hide({
                        by: "button_click"
                    }) : _slaask.show({
                        by: "button_click"
                    })
                }), document.getElementById("slaask-message-input").addEventListener("click", function() {
                    trigger && Ma(), _slaask.show({
                        by: "message_click"
                    })
                }), document.getElementById("slaask-message-text-title").addEventListener("click", function() {
                    trigger && Ma(), _slaask.show({
                        by: "message_click"
                    })
                }), document.getElementById("slaask-message-text-content").addEventListener("click", function() {
                    trigger && Ma(), _slaask.show({
                        by: "message_click"
                    })
                }), document.getElementById("slaask-widget-header-cross").addEventListener("click", function() {
                    _slaask.hide({
                        by: "cross_click"
                    }), Dt()
                }), document.getElementById("slaask-alert-cancel").addEventListener("click", function(e) {
                    e.preventDefault(), Le("slaask-alert", "slaask-hidden"), Le("slaask-alert-overlay", "slaask-hidden")
                }), document.getElementById("slaask-widget").addEventListener("click", function(e) {
                    Dt(), file_sharing_activated && "slaask-paperclip" != e.target.id && Ie(), "slaask-emoji-button" != e.target.id && Me()
                }), file_sharing_activated && document.getElementById("slaask-paperclip").addEventListener("click", function() {
                    Me(), Ce("slaask-file-menu", "slaask-opened") ? Ie() : Be()
                }), document.getElementById("slaask-emoji-button").addEventListener("click", function() {
                    Ce("slaask-emoji-container", "slaask-hidden") ? Te() : Me()
                }), document.getElementById("slaask-message-header-cross").addEventListener("click", function() {
                    Le("slaask-message", "slaask-hidden"), document.getElementById("slaask-button-image").style["background-image"] = 'url("' + message_displayed_image + '")', Dt()
                }), input = document.getElementById("slaask-input"), input && (autosize(input), input.addEventListener("autosize:resized", function() {
                    var e = window.getComputedStyle(this, null),
                        t = Math.round(parseFloat(e.height)) + 22;
                    Math.round(parseFloat(this.style.height)) > 138 && (this.style.height = "138px", t = 160), document.getElementById("slaask-widget-footer").style.height = t + "px", document.getElementById("slaask-widget-container").style.bottom = 96 + (Math.round(parseFloat(e.height)) - 40) + "px", document.getElementById("slaask-emoji-container").style.bottom = 96 + (Math.round(parseFloat(e.height)) - 40) + "px", At()
                }))
            },
            xe = function() {
                Ee("file", "upload-file.svg", "Send file", function() {
                    document.getElementById("slaask-file-input").click()
                }, '<input class="slaask-file-input" id="slaask-file-input" type="file">'), Ee("screenshot", "upload-screenshot.svg", "Send screenshot", function() {
                    be(!0, document.location.hostname.indexOf("slaask.com") != -1)
                })
            },
            Ee = function(e, t, a, n, i) {
                void 0 === i && (i = "");
                var o = document.getElementById("slaask-file-btns");
                o.insertAdjacentHTML("beforeEnd", '<div id="slaask-file-btn-' + e + '" class="slaask-file-btn"><img src="' + s + "/" + t + '" alt="' + a + '" /><span class="slaask-file-btn-name">' + a + "</span>" + i + "</div>"), document.getElementById("slaask-file-btn-" + e).onclick = n
            },
            Be = function() {
                Le("slaask-file-menu", "slaask-opened")
            },
            Ie = function() {
                qe("slaask-file-menu", "slaask-opened")
            },
            Te = function() {
                qe("slaask-emoji-container", "slaask-hidden")
            },
            Me = function() {
                Le("slaask-emoji-container", "slaask-hidden")
            },
            Se = function(e) {
                z && console.log("Slaask - " + (new Date).toISOString() + " - " + e)
            },
            Le = function(e, t) {
                var a;
                a = "string" == typeof e ? document.getElementById(e) : e, null != a && (qe(a, t), a.className += " " + t)
            },
            qe = function(e, t) {
                var a;
                if (a = "string" == typeof e ? document.getElementById(e) : e, null != a) {
                    var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                    a.className = a.className.replace(n, " ")
                }
            },
            Ce = function(e, t) {
                var a;
                a = "string" == typeof e ? document.getElementById(e) : e;
                var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                return n.test(a.className)
            },
            He = function() {
                var t = document.createElement("link");
                t.href = s + "/chat.min.css?t=" + e, t.type = "text/css", t.rel = "stylesheet", document.getElementsByTagName("head")[0].appendChild(t)
            },
            Oe = function(e) {
                var t = this,
                    a = _slaask.createScriptTag("https://js.pusher.com/3.2/pusher.min.js");
                a.onload = function() {
                    e(t)
                }
            },
            Pe = function(e) {
                var t = this,
                    a = _slaask.createScriptTag("https://cdn.embedly.com/widgets/platform.js");
                a.onload = function() {
                    embedly("on", "card.rendered", function(e) {
                        setTimeout(function() {
                            At()
                        }, 500), document.getElementById("slaask-alert").style["margin-top"] = "-" + Math.round(parseFloat(document.getElementById("slaask-alert").offsetHeight / 2)) + "px";
                        var t;
                        e.contentDocument ? t = e.contentDocument : e.contentWindow && (t = e.contentWindow.document);
                        var a;
                        a = Ce(e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, "odd") ? guest_chat_text_color : chat_text_color;
                        for (var n = t.getElementsByTagName("a"), s = 0; s < n.length; s++) n[s].style.color = a;
                        for (var i = t.getElementsByTagName("p"), s = 0; s < i.length; s++) i[s].style.color = a
                    }), e(t)
                }
            },
            Ae = function() {
                var e = document.getElementById("slaask-box");
                if (null != e && e.remove(), available) var t = "slaask-online";
                else var t = "slaask-offline";
                document.body.insertAdjacentHTML("beforeend", '<div id="slaask-button" class="slaask-button ' + t + '-button" style="font-size: ' + button_size + 'px;"><ul id="messages-counter" class="slaask-hidden"><li id="messages-counter-first">1</li><li id="messages-counter-last">2</li></ul><div id="slaask-button-image" class="slaask-button-image" style="background-image: url(\'' + message_displayed_image + '\');"></div><div id="slaask-button-cross" class="slaask-button-cross" style="background-color:' + window_color + ';">' + Kt(title_color, 48) + "</div></div>"), widget_left && Le("slaask-button", "slaask-left"), document.body.insertAdjacentHTML("beforeend", '<div class="slaask-gradient slaask-hidden" id="slaask-gradient"></div>'), widget_left && Le("slaask-gradient", "slaask-left");
                var a = screen_width < 460 ? "bottom: " + (button_size + 60) + "px;" : "",
                    n = widget_left ? "left" : "right";
                if (document.body.insertAdjacentHTML("beforeend", '<div id="slaask-message" class="slaask-message slaask-hidden" style="' + n + ": " + (button_size + 60) + "px;" + a + '"><div id="slaask-message-content" class="slaask-message-content"><div id="slaask-message-text" class="slaask-message-text"><b id="slaask-message-text-title">' + support_name + '</b><div id="slaask-message-header-cross" class="slaask-message-header-cross">' + Kt("#444444", 12) + '</div><br><div id="slaask-message-text-content" class="slaask-message-text-content">' + _slaask.parseMessageHtml(greeting_message) + '</div></div></div><div class="slaask-message-input"><input type="text" id="slaask-message-input" class="slaask-input" placeholder="' + online_input_content + '" ></input></div><div class="slaask-message-carret-container"><div class="slaask-message-carret"></div></div></div>'), widget_left && Le("slaask-message", "slaask-left"), document.body.insertAdjacentHTML("beforeend", '<div id="slaask-alert-overlay" class="slaask-alert-overlay slaask-hidden"></div><div id="slaask-alert" class="slaask-alert slaask-hidden"><div id="slaask-alert-header" class="slaask-alert-header" style="color: ' + title_color + "!important; background-color: " + window_color + '!important;"></div><div id="slaask-alert-content" class="slaask-alert-content" style="max-height: ' + (_slaask.getScreenHeight() - 200) + 'px;"><div id="slaask-alert-title" class="slaask-alert-title"></div><div id="slaask-alert-content-box" class="slaask-alert-content-box-box "></div><div id="slaask-alert-input-box" class="slaask-alert-input-box slaask-hidden"><input type="email" required="required" class="slaask-alert-input" id="slaask-alert-input"/><br><input type="text" class="slaask-alert-input-firstname slaask-hidden" id="slaask-alert-input-firstname" placeholder="Firstname"/><input type="text" class="slaask-alert-input-lastname slaask-hidden" id="slaask-alert-input-lastname" placeholder="Lastname"/></div></div><div id="slaask-alert-cta" class="slaask-alert-cta"><a id="slaask-alert-cancel" class="cancel" href="#">Cancel</a><a id="slaask-alert-cta-button" href="#">Click here!</a></div></div>'), document.body.insertAdjacentHTML("beforeend", '<div id="slaask-topbar" class="slaask-topbar slaask-hidden"><div id="slaask-topbar-close-button" class="slaask-topbar-close-button"></div><div class="slaask-topbar-content"><div id="slaask-topbar-text" class="slaask-topbar-text">We just launched an amazing new product!</div><div class="slaask-topbar-form" id="slaask-topbar-form"><button id="slaask-topbar-button" class="slaask-topbar-button">Take me there</button></div></div><div class="slaask-topbar-branding"></div></div>'), "rtl" == direction && (t += " rtl"), available) var i = "",
                    o = online_input_content;
                else var i = "slaask-search-input",
                    o = te;
                if (file_sharing_activated) var l = '<div id="slaask-file-menu" class="slaask-file-menu slaask-closed"><div id="slaask-file-btns" class="slaask-file-btns"></div><div class="ctext-wrap-bottom"></div><div class="ctext-wrap-bottom-border"></div></div><div class="slaask-file-input-trigger" style="background-image: url(' + s + '/upload-icon.svg);" id="slaask-paperclip"></div>';
                else var l = "";
                var r = '<div class="slaask-file-input-trigger slaask-hidden" style="background-image: url(' + s + '/send.png);" id="slaask-send-input-trigger"></div>';
                hide_slaask_button && (document.getElementById("slaask-button").className += " slaask-hidden", document.getElementById("slaask-message").className += " slaask-hidden");
                var d = "";
                mini_widget && (d += "bottom: " + (Math.min(button_size, 80) + 40) + "px;"), pattern_image ? slaask_widget_container_style = '  style="background-image: url(' + pattern_image + '); background-repeat: repeat;"' : slaask_widget_container_style = "", document.body.insertAdjacentHTML("beforeend", '<div id="slaask-tooltip" class="slaask-tooltip slaask-hidden"><div class="slaask-tooltip-wrapper"><div id="slaask-tooltip-bottom-arrow-inner" class="slaask-tooltip-bottom-arrow-inner slaask-hidden"><span></span><span></span></div><div id="slaask-tooltip-right-arrow-inner" class="slaask-tooltip-right-arrow-inner slaask-hidden"><span></span><span></span></div><div id="slaask-tooltip-left-arrow-inner" class="slaask-tooltip-left-arrow-inner slaask-hidden"><span></span><span></span></div><div class="slaask-tooltip-container"><div id="slaask-tooltip-header-cross" class="slaask-message-header-cross">' + Kt("#d3d3d3", 12) + '</div><div id="slaask-tooltip-title" class="slaask-tooltip-title"></div><div id="slaask-tooltip-content" class="slaask-tooltip-content"></div><div class="slaask-tooltip-powered-by">' + whitelabel_html + '</div></div><div id="slaask-tooltip-top-arrow-inner" class="slaask-tooltip-top-arrow-inner slaask-hidden"><span></span><span></span></div></div></div>');
                var c = parseInt(guest_chat_color.substring(1, 3), 16),
                    u = parseInt(guest_chat_color.substring(3, 5), 16),
                    m = parseInt(guest_chat_color.substring(5, 7), 16),
                    g = rgbToHsl(c, u, m),
                    p = "#4138ec";
                g.s > .3 && g.l > .25 && g.l < .75 && (p = guest_chat_color), document.body.insertAdjacentHTML("beforeend", '<div id="slaask-widget" class="slaask-widget slaask-hidden ' + t + '" style="' + d + '"><style class="embedly-css"> @font-face{font-family:Brandon;font-weight:100;src:url(https://cdn.slaask.com/fonts/Brandon-100.otf)}@font-face{font-family:Brandon;font-weight:300;src:url(https://cdn.slaask.com/fonts/Brandon-300.otf)}@font-face{font-family:Brandon;font-style:normal;src:url(https://cdn.slaask.com/fonts/Brandon-normal.otf)}@font-face{font-family:Brandon;font-weight:500;src:url(https://cdn.slaask.com/fonts/Brandon-500.otf)}@font-face{font-family:Brandon;font-weight:600;src:url(https://cdn.slaask.com/fonts/Brandon-600.otf)}@font-face{font-family:Brandon;font-weight:700;src:url(https://cdn.slaask.com/fonts/Brandon-700.otf)}@font-face{font-family:Brandon;font-weight:800;src:url(https://cdn.slaask.com/fonts/Brandon-500.otf)}@font-face{font-family:Brandon;font-weight:700;src:url(https://cdn.slaask.com/fonts/Brandon-500.otf)} #cards * { font-family:Brandon,Helvetica Neue,Helvetica,Arial,sans-serif!important } #cards.no-branding .card a { color: #444 } #cards.no-branding .card a.action { color: #444 } #cards.no-branding .card {font-family: \'Helvetica Neue,Helvetica,Arial,sans-serif\', sans-serif;} #cards.no-branding .card {color: #444} #cards.no-branding .hdr{display: none;}#cards.no-branding .article .art-bd-img {max-height: 128px;}#cards.no-branding .article .art-bd{margin-bottom: 6px}</style><style>.slaask-messages li.odd .ctext-wrap p { color:' + guest_chat_text_color + "!important }.slaask-messages li.odd .ctext-wrap p a { color:" + guest_chat_text_color + "!important }.slaask-messages li .ctext-wrap p a:hover,.slaask-messages li .ctext-wrap p a:active{color:" + p + '}</style><div id="slaask-widget-header" class="slaask-widget-header" style="background-color: ' + window_color + '!important;"><div class="slaask-widget-header-title" id="slaask-widget-header-title" style="color: ' + title_color + '!important">' + window_title + '</div><div id="slaask-widget-header-cross" class="slaask-widget-header-cross">' + Kt(title_color, 16) + '</div></div><div id="slaask-widget-notify-container" style="background-color: ' + window_color + '; border-top: 1px solid #FFF" class="slaask-widget-notify-container slaask-hidden"><div class="slaask-widget-notify-title" id="slaask-widget-notify-title"><span class="slaask-widget-notify-title-span-online" id="slaask-widget-notify-title-span" style="color: ' + title_color + '">Online users: Loading...</span><span class="slaask-widget-notify-leave" id="slaask-widget-notify-leave" style="color: ' + title_color + '">' + log_out_button + '</span></div></div><div class="slaask-hidden slaask-widget-notify-container slaask-widget-notify-alert-container" id="slaask-widget-notify-alert-container" style="background: ' + title_color + '!important;"><div class="slaask-widget-notify-title" style="text-align:center"><span class="slaask-widget-notify-title-span" style="background: ' + alert_background_color + "!important; color: " + alert_text_color + '!important" id="slaask-widget-notify-alert-title-span">Bla bla bla</span></div></div><div id="slaask-widget-container" class="slaask-widget-container"' + slaask_widget_container_style + '><ul id="conversation-list" class="slaask-messages"></ul></div><div id="slaask-emoji-container" class="slaask-emoji-container slaask-hidden"><div class="slaask-emoji-image"><img src="' + s + '/emoji/sunglasses.png" title="sunglasses" alt=":sunglasses:"></div><div class="slaask-emoji-image"><img src="' + s + '/emoji/smile.png" title="smile" alt=":smile:"></div><div class="slaask-emoji-image"><img src="' + s + '/emoji/simple_smile.png" title="simple_smile" alt=":simple_smile:"></div><div class="slaask-emoji-image"><img src="' + s + '/emoji/stuck_out_tongue.png" title="stuck_out_tongue" alt=":stuck_out_tongue:"></div><div class="slaask-emoji-image"><img src="' + s + '/emoji/disappointed.png" title="disappointed" alt=":disappointed:"></div><div class="slaask-emoji-image"><img src="' + s + '/emoji/thumbsdown.png" title="thumbsdown" alt=":thumbsdown:"></div><div class="slaask-emoji-image"><img src="' + s + '/emoji/thumbsup.png" title="thumbsup" alt=":thumbsup:"></div><div class="slaask-emoji-image"><img src="' + s + '/emoji/heart.png" title="heart" alt=":heart:"></div></div><div id="slaask-widget-footer" class="slaask-widget-footer"><form autocomplete="off" class="slaask-form" id="slaask-form"><textarea id="slaask-input" class="slaask-input ' + i + '" value="" placeholder="' + o + '" />' + A + '</textarea><div class="slaask-file-top-right"><div class="slaask-emoji-button slaask-file-input-trigger" style="right: 28px; background-image: url(' + s + '/emoji-icon.svg);" id="slaask-emoji-button"></div>' + l + r + '</div></form><div id="slaask-whitelabel" class="slaask-whitelabel">' + whitelabel_html + "</div></div></div>");
                for (var _ = document.getElementsByClassName("slaask-emoji-image"), f = 0; f < _.length; f++) _[f].addEventListener("click", function() {
                    var e = document.getElementById("slaask-input").value;
                    "" == e ? (document.getElementById("slaask-input").value = ":" + this.getElementsByTagName("img")[0].title + ":", fe()) : document.getElementById("slaask-input").value = e + " :" + this.getElementsByTagName("img")[0].title + ":"
                }, !1);
                mini_widget && (Le("slaask-widget", "slaask-mini"), Le("slaask-button", "slaask-mini")), widget_left && Le("slaask-widget", "slaask-left")
            },
            je = function(e) {
                send_data = {
                    key: api_key,
                    token: G,
                    ip: client_ip,
                    user_infos: C,
                    current_page: window.location.href,
                    language: navigator.language
                }, Nt("/api/send_logs", send_data, e)
            },
            Ne = function() {
                S ? send_data = {
                    key: api_key,
                    guest_id: d,
                    current_page: window.location.href,
                    user_infos: C
                } : ("undefined" == typeof slaaskPlatform ? (platform_name = "Unknown", browser_name = "Unknown") : (platform_name = slaaskPlatform.os.family + " (" + slaaskPlatform.os.version + ")", browser_name = slaaskPlatform.name + " (" + slaaskPlatform.version + ")"), send_data = {
                    key: api_key,
                    guest_id: d,
                    latitude: E,
                    longitude: B,
                    language: navigator.language,
                    current_page: window.location.href,
                    platform: platform_name,
                    browser: browser_name,
                    user_infos: C,
                    referrer: document.referrer,
                    timezone_offset: (new Date).getTimezoneOffset()
                }), Nt("/api/send_infos", send_data, ze)
            },
            ze = function(e) {
                C = e.user_infos
            },
            Re = function() {},
            Fe = function(e) {
                if (slaaskPresenceChannel.trigger("client-availability_callback", e), available = e.available, document.getElementById("conversation-data-" + e.message_hash) && mt(message_delivered_text, e.message_hash), e.available) conversation_closed = !1, last_message_id = e.message_id, document.getElementById("conversation-data-" + e.message_hash) && (document.getElementById("conversation-data-" + e.message_hash).id = "conversation-data-" + e.message_id), e.pending && !De("pending") ? (ae = e.waiting_time, $e("ask"), clearTimeout(H)) : "online:pending:chat" == state && (ae = e.waiting_time, clearTimeout(H), Ge());
                else if (st("online") || !st("offline")) {
                    offline_email_address || Bt(), Ue("offline"), st("offline") && (It(), ve());
                    var t = document.getElementById("slaask-offline-message-input");
                    t && (t.value = se)
                } else Ue("offline:faq"), ma(se), va(), jt("slaask-message-offline")
            },
            We = function(e) {
                e && available ? $e(e) : Ue(available ? st("online") && conversation_closed ? "online:faq" : "online" : st("offline") ? "offline:faq" : "offline")
            },
            Ue = function(e) {
                if (/^online:pending/.test(e)) $e(e.split(":")[2]);
                else {
                    Ye();
                    var t = function() {
                            available = !0, qe("slaask-widget", "slaask-offline"), bt(), Ze()
                        },
                        a = function() {
                            return available = !1, res = null, Le("slaask-widget", "slaask-offline"), st("offline") ? (bt(), res = "offline:faq") : (yt(), offline_email_address && (It(), ve()), res = "offline"), clearTimeout(H), _slaask.scrollToBottom(), res
                        };
                    switch (newStateSplit = e.split(":"), "offline:faq" != e || st("offline") || (e = newStateSplit[0]), "online:faq" != e || st("online") || (e = newStateSplit[0]), e) {
                        case "online":
                            t(), m.length > 1 && null == y ? setTimeout(function() {
                                pt()
                            }, 100) : ("many" == v ? _t() : manual_messages_activated || (m.length > 1 ? kt() : (yt(), document.getElementById("slaask-message-greeting_message").getElementsByClassName("slaask-message-body")[0].innerHTML = "<p>" + document.getElementById("slaask-message-greeting_message").getElementsByTagName("p")[0].innerHTML + '</p><div class="slaask-btn slaask-groups-item-click" id="bot-start-button-now">' + bot_start_button + "</div>", document.getElementById("bot-start-button-now").addEventListener("click", function() {
                                bt(), jt("bot-start-button-now"), kt()
                            }))), conversation_closed && setTimeout(function() {
                                Zt()
                            }, 100)), state = e;
                            break;
                        case "offline":
                            state = a();
                            break;
                        case "online:faq":
                            t(), state = e;
                            break;
                        case "offline:faq":
                            state = a()
                    }
                    Se("State change: " + state)
                }
            },
            De = function(e) {
                var t = new RegExp("(^|:)" + e + "(:|$)");
                return t.test(state)
            },
            $e = function(e) {
                switch (available = !0, clearTimeout(H), e) {
                    case "ask":
                        offline_email_address ? (yt(), St("", _slaask.parseMessageHtml(busy_message) + '<div></div><div id="slaask-pending-choices" class="slaask-mandatory-buttons"><button id="slaask-btn-pending-wait" class="slaask-btn">' + pending_wait_button_text + '</button><button id="slaask-btn-pending-email" class="slaask-btn">' + pending_email_button_text + "</button></div>", busy_message, !1), document.getElementById("slaask-btn-pending-email").addEventListener("click", function() {
                            jt("slaask-pending-choices"), $e("email")
                        }), document.getElementById("slaask-btn-pending-wait").addEventListener("click", function() {
                            jt("slaask-pending-choices"), bt(), Ge(!0), St("", pending_introduce, ""), $e("chat")
                        }), _slaask.scrollToBottom(), state = "online:pending:ask") : (state = null, $e("chat"));
                        break;
                    case "chat":
                        state || (St("", busy_message), Ge(), St("", pending_introduce, "")), state = "online:pending:chat";
                        break;
                    case "faq":
                        bt(), state ? c = null : (St("", busy_message), Ge()), St("pending-introduce-faq", pending_introduce_faq, ""), state = "online:pending:faq";
                        break;
                    case "email":
                        yt(), nt(), Ye(), tt("email"), It(), ve(), state = "online:pending:email";
                        break;
                    case "over":
                        jt("pending-choices"), jt("pending-time"), jt("slaask-btn-pending-faq"), nt(), Ue("online");
                        break;
                    case "close":
                        jt("pending-choices"), jt("pending-time"), jt("slaask-btn-pending-faq"), nt(), Ue("online"), tt("faq"), 0 == h && setTimeout(function() {
                            _slaask.hide()
                        }, 2e3)
                }
                Xe(), Se("State change: " + state)
            },
            Xe = function() {
                if (De("pending")) {
                    var e = {
                        key: api_key,
                        token: G,
                        pending_state: state.split(":")[2]
                    };
                    Nt("/api/update_pending_state", e, Re)
                }
            },
            Ge = function(e) {
                jt(Lt("pending-time")), c = null, waiting_time_str = pending_waiting_time_text.replace(/\{\{time\}\}/g, '<span id="slaask-waiting-time">' + Math.max(parseInt(ae / 60), 1) + "</span>"), waiting_time_closed_str = pending_waiting_time_text.replace(/\{\{time\}\}/g, Math.max(parseInt(ae / 60), 1));
                var t = "<div>" + waiting_time_str + "</div>";
                !e && st("offline") && (t += '<button id="slaask-btn-pending-faq" class="slaask-btn">' + pending_faq_button_text + "</button>"), St("pending-time", t, waiting_time_closed_str, !1), Ve(), document.getElementById("slaask-btn-pending-faq") && document.getElementById("slaask-btn-pending-faq").addEventListener("click", function() {
                    jt(Lt("pending-time")), $e("faq")
                })
            },
            Ve = function() {
                ne && Ye(), ne = setInterval(Ke, 3e4)
            },
            Ke = function() {
                var e = {
                    key: api_key,
                    token: G
                };
                Nt("/api/get_waiting_time", e, function(e) {
                    ae = e.waiting_time;
                    var t = document.getElementById("slaask-waiting-time");
                    t && (t.innerHTML = Math.max(parseInt(ae / 60), 1))
                })
            },
            Ye = function() {
                ne && (clearInterval(ne), ne = null)
            },
            Je = function() {
                qe("slaask-send-input-trigger", "slaask-hidden"), file_sharing_activated && Le("slaask-paperclip", "slaask-hidden")
            },
            Qe = function() {
                Le("slaask-send-input-trigger", "slaask-hidden"), file_sharing_activated && qe("slaask-paperclip", "slaask-hidden")
            },
            Ze = function() {
                var e = document.createEvent("Event");
                e.initEvent("autosize:update", !0, !1), document.getElementById("slaask-input").dispatchEvent(e)
            },
            et = function(e) {
                document.getElementById("slaask-input").value = e, o("slaask-widget-typed-text", e), Ze()
            },
            tt = function(e) {
                var t = {
                    key: api_key,
                    token: G,
                    reason: e
                };
                Nt("/api/close_conversation", t, Re), nt(), conversation_closed = !0, Ht(closed_conversation_text), _slaask.scrollToBottom()
            },
            at = function() {
                conversation_closed || (conversation_closed = !0, Ht(closed_conversation_text), _slaask.scrollToBottom())
            },
            nt = function() {
                for (var e = document.getElementsByClassName("slaask-mandatory-buttons"), t = 0; t < e.length; t++) jt(e[t])
            },
            st = function(e) {
                if (0 == k) return !1;
                switch (e) {
                    case "offline":
                        return 0 == start_with_faq || 1 == start_with_faq;
                    case "online":
                        return 1 == start_with_faq
                }
                return !1
            },
            it = function(e) {
                d = e.id, conversation_closed = e.closed, $ = e.token, guest_name = e.name, E = e.latitude, B = e.longitude, S = e.already_registered, p = e.surveys, u = e.prechat_questions, h = e.surveys.length, _ = e.prechat_questions.length, prechat_questions_final_message = e.prechat_questions_final_message, trigger = e.trigger, M = e.email_asked, last_message_id = 0, O = e.conversation_answered, ae = e.waiting_time, conversation_started_at = e.conversation_started_at, manual_messages_activated = e.manual_messages_activated, 0 == x ? (y = e.user_group_id, b = e.user_group_name, v = e.user_group_kind, w = e.user_group_alert_message) : y = x, manual_messages_activated && rt();
                var t = !1;
                if (available) {
                    for (a = e.messages, i = 0; i < e.messages.length; i++) message = e.messages[i], !t && new Date(message.created_at).getTime() >= new Date(conversation_started_at).getTime() - 1e3 && (ot(!0), t = !0), "notification" == message.type ? Ht(message.text) : "me" == message.name ? (last_message_id = message.id, ct(message.text, "", message.id)) : vt(message.id, message.text, message.name, message.action_link, message.image);
                    t || "many" == v || ot(e.messages.length > 0)
                } else ot();
                j = !0, Jt("slaask.ready", {
                    online: available
                }), "true" == l("slaask-widget-opened") && _slaask.show(void 0, !0), window.location.hash.indexOf("slaask-verify-widget") > -1 && Nt("/api/verify_widget_presence", {
                    api_key: api_key
                }, Re), window.location.hash.indexOf("chat-open") > -1 ? _slaask.show() : trigger && conversation_closed && (available || trigger.offline_activated) ? wa() : available && R && show_welcome_message && oe() && setTimeout(function() {
                    P || (lt(), setTimeout(function() {
                        Le("slaask-message", "slaask-hidden")
                    }, time_showing_message))
                }, time_before_message), We(e.pending_state), "browser" == geoloc_method && 0 == E ? navigator.geolocation.getCurrentPosition(function(e) {
                    E = e.coords.latitude, B = e.coords.longitude, Ne()
                }) : Ne()
            },
            ot = function(e) {
                if (available) {
                    var t = st("online") ? K : support_name,
                        a = st("online") ? Y : support_img;
                    e && "many" != v && Ht(closed_conversation_text), vt("greeting_message", greeting_message, t, !1, a)
                } else Bt()
            },
            lt = function() {
                qe("slaask-message", "slaask-hidden"), 0 == unread_messages ? (qe("messages-counter", "slaask-hidden"), document.getElementById("messages-counter").getElementsByTagName("li")[0].innerHTML = 1, document.getElementById("messages-counter").getElementsByTagName("li")[1].innerHTML = 2, unread_messages += 1) : (Le("messages-counter", "update-count"), unread_messages += 1, setTimeout(function() {
                    document.getElementById("messages-counter").getElementsByTagName("li")[0].innerHTML = unread_messages
                }, 150), setTimeout(function() {
                    qe("messages-counter", "update-count")
                }, 200), setTimeout(function() {
                    document.getElementById("messages-counter").getElementsByTagName("li")[1].innerHTML = unread_messages + 1
                }, 230)), $t(unread_messages)
            },
            rt = function(e) {
                available && (slaaskPusher = new Pusher("816687ac49782d3ed5d1", {
                    encrypted: !0,
                    authEndpoint: n + "/api/renew_websocket_token"
                }), "undefined" == typeof e ? (socket_name = " ", slaaskChannel = slaaskPusher.subscribe(api_key + "-" + $), slaaskPresenceChannel = slaaskPusher.subscribe("presence-" + api_key + "-" + $)) : (socket_name = " Many-To-Many ", slaaskChannel = slaaskPusher.subscribe(api_key + "-" + e), slaaskPresenceChannel = slaaskPusher.subscribe("presence-" + api_key + "-" + e)), slaaskChannel.bind("pusher:subscription_succeeded", function() {
                    Se("Client connected to the" + socket_name + "socket server.")
                }), slaaskPresenceChannel.bind("pusher:subscription_succeeded", function() {
                    Se("Client connected to the" + socket_name + "presence server."), members_count = slaaskPresenceChannel.members.count, members_count > 1 ? need_s = "s" : need_s = "", document.getElementById("slaask-widget-notify-title-span").innerHTML = "Online user" + need_s + ": " + members_count
                }), slaaskChannel.bind("new_message", function(t) {
                    q = !1, De("pending") && $e("over"), O = !0, e && last_messages_hash.indexOf(t.message_hash) != -1 || (Ut(t.name), jt("slaask-email-asking-question"), dt(t.message_id, t.text, t.name, t.action_link, t.picture, t.from_description))
                }), slaaskPresenceChannel.bind("client-availability_callback", function(e) {
                    Fe(e)
                }), slaaskPresenceChannel.bind("pusher:member_added", function() {
                    members_count += 1, members_count > 1 ? need_s = "s" : need_s = "", document.getElementById("slaask-widget-notify-title-span").innerHTML = "Online user" + need_s + ": " + members_count
                }), slaaskPresenceChannel.bind("pusher:member_removed", function() {
                    members_count -= 1, members_count > 1 ? need_s = "s" : need_s = "", document.getElementById("slaask-widget-notify-title-span").innerHTML = "Online user" + need_s + ": " + members_count
                }), slaaskChannel.bind("edited_message", function(e) {
                    document.getElementById("slaask-message-" + e.message_id).getElementsByClassName("slaask-message-body")[0].innerHTML = _slaask.parseMessageHtml(e.text)
                }), slaaskChannel.bind("deleted_message", function(e) {
                    document.getElementById("slaask-message-" + e.message_id).remove()
                }), slaaskChannel.bind("redirection", function(e) {
                    q = !1, Pt(e.url, e.target)
                }), slaaskChannel.bind("notification", function(e) {
                    switch (Et(), q = !1, e.sub_type) {
                        case "end_conversation":
                            at(), aa();
                            break;
                        case "start_survey":
                            aa();
                            break;
                        case "many_alert":
                            Ea(e.text);
                            break;
                        case "stop_many_alert":
                            Ba();
                            break;
                        case "ask":
                            switch (prechat_question = e, f = !0, prechat_question.attr) {
                                case "email":
                                    type = "email";
                                    break;
                                default:
                                    type = "text"
                            }
                            prechat_question_html = "<p>" + _slaask.parseMessageHtml(prechat_question.question) + '</p><form id="slaask-ask-form"><input id="slaask-ask-input" class="slaask-input slaask-input-survey" placeholder="' + prechat_question.attr.replace("_", " ") + '" type="' + type + '" value="" required="required"/><input type="submit" class="slaask-btn" id="slaask-rating-sutmit" value="That\'s my ' + prechat_question.attr.replace("_", " ") + '"/></form>', document.getElementById("slaask-ask-container") && document.getElementById("slaask-ask-container").parentElement.removeChild(document.getElementById("slaask-ask-container")), ea(prechat_question_html, "slaask-ask-container", !1, prechat_question.name, prechat_question.picture), document.getElementById("slaask-ask-form").addEventListener("submit", function(e) {
                                e.preventDefault();
                                var t = document.getElementById("slaask-ask-input").value,
                                    a = {
                                        key: api_key,
                                        token: G,
                                        attr: prechat_question.attr,
                                        value: t,
                                        email_asked: !1
                                    };
                                C || (C = {}), C.more || (C.more = {}), C.more[prechat_question.attr] = t, Nt("/api/update_visitor_email", a, Re), jt("slaask-ask-container"), ct(t)
                            }), document.getElementById("slaask-ask-input").focus(), Jt("slaask.recieved_prechat_question", {
                                message: prechat_question.title
                            }), At();
                            break;
                        default:
                            Ht(e.text)
                    }
                }), slaaskChannel.bind("user_typing", function(e) {
                    q = !1, last_typing_at = (new Date).getTime(), document.getElementById("user-typing") || xt(e.name, e.image), setTimeout(function() {
                        last_typing_at < (new Date).getTime() - 4500 && Et()
                    }, 5e3)
                }), slaaskChannel.bind("message_read", function(e) {
                    mt("Delivered and seen.", e.message_id)
                }), slaaskChannel.bind("file_uploaded", function(e) {
                    gt(e.text, e.message_hash)
                }), slaaskChannel.bind("screenshot_request", function(e) {
                    ye(e.show_widget, e.name, e.picture)
                }))
            },
            dt = function(e, t, a, n, s, i) {
                Vt(), Jt("slaask.recieved_message", {
                    message: t,
                    from: a
                }), vt(e, t, a, n, s, void 0, i), At()
            },
            ct = function(e, t, a) {
                c = null, "undefined" == typeof t && (t = ""), "undefined" == typeof a && (a = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)), document.getElementById("conversation-list").insertAdjacentHTML("beforeend", '<li class="odd"><div class="conversation-text"><div id="message-content-' + a + '" class="ctext-wrap" style="background-color: ' + guest_chat_color + "!important; color: " + guest_chat_text_color + '!important">' + _slaask.parseMessageHtml(ut(e)) + '<div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before" style="border-left-color:' + guest_chat_color + '!important"></div></div><div id="conversation-data-' + a + '" class="conversation-data">' + t + "</div></div></li>"), screen_width >= 780 && document.getElementById("slaask-input").focus(), At()
            },
            ut = function(e) {
                var t = !1;
                return e.match(/(https?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))(\??(.*?)+)(&\S+)?/gi) && (t = !0, match = e.match(/(https?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))(\??(.*?)+)(&\S+)?/gi)[0], ">" == match[match.length - 1] && (match = match.slice(0, -1)), e = "![attachment](" + match + ")"), t || (e = e.replace(/https?:\/\/(\S+)/gi, function(e) {
                    return "<" + e + ">"
                })), e.replace(/(\S+)\@(\S+)\.(\S+)/gi, function(e) {
                    return "<mailto:" + e + ">"
                })
            },
            mt = function(e, t) {
                var a = document.getElementById("conversation-data-" + last_message_id);
                0 != last_message_id && last_message_id != t && a && (a.innerHTML = ""), new_message_status = document.getElementById("conversation-data-" + t), new_message_status && (new_message_status.innerHTML = e)
            },
            gt = function(e, t) {
                document.getElementById("message-content-" + t).innerHTML = _slaask.parseMessageHtml(ut(e))
            },
            pt = function() {
                if (yt(), null == document.getElementById("slaask-groups-box")) {
                    for (app = this, userGroupsHtml = "", t = 0; t < m.length; t++) userGroupsHtml += '<div data-kind="' + m[t].kind + '" data-alert="' + m[t].alert + '" id="user-group-' + m[t].id + '" class="slaask-btn slaask-groups-item-click">' + m[t].name + "</div>";
                    "#ffffff" == chat_color ? hover_color = "#E01765" : hover_color = chat_color, ea("<p>" + group_asking_title + "</p>" + userGroupsHtml, "slaask-groups-box", st("start_with_faq"));
                    for (var e = document.getElementsByClassName("slaask-groups-item-click"), t = 0; t < e.length; t++) e[t].addEventListener("click", function() {
                        y = parseInt(this.id.replace("user-group-", "")), v = this.dataset.kind, w = this.dataset.alert, b = this.innerHTML, Le("slaask-groups-box", "slaask-hidden"), _t(), manual_messages_activated || "many" == v || kt(), bt(), At(), Zt()
                    }, !1)
                } else qe("slaask-groups-box", "slaask-hidden");
                At()
            },
            _t = function() {
                "many" == v && (send_data = {
                    key: api_key,
                    token: G,
                    message: " ",
                    no_message: !0,
                    user_group_id: y,
                    no_database_saving: !0
                }, Nt("/api/publish", send_data, Re), document.getElementById("slaask-widget-notify-leave").removeEventListener("click", ft), document.getElementById("slaask-widget-notify-leave").removeEventListener("click", ht), document.getElementById("slaask-widget-notify-leave").addEventListener("click", ft), null != w && "null" != w && Ea(w), document.getElementById("slaask-widget-header-title").innerHTML = b, slaaskPusher && slaaskPusher.disconnect(), rt(y), Le("slaask-widget-container", "slaask-widget-container-with-notify"), Le("slaask-input", "hide-paperclip"), qe("slaask-widget-notify-container", "slaask-hidden"), At())
            },
            ft = function() {
                "many" == v && (send_data = {
                    key: api_key,
                    token: G,
                    message: " ",
                    no_message: !0,
                    user_group_id: null,
                    no_database_saving: !0
                }, v = "one", Nt("/api/publish", send_data, Re), slaaskPusher.disconnect(), manual_messages_activated && rt(), document.getElementById("slaask-widget-header-title").innerHTML = window_title, qe("slaask-widget-container", "slaask-widget-container-with-notify"), qe("slaask-input", "hide-paperclip"), Le("slaask-widget-notify-container", "slaask-hidden"), Le("slaask-widget-notify-alert-container", "slaask-hidden"), At(), pt(), document.getElementById("conversation-list").appendChild(document.getElementById("slaask-groups-box")))
            },
            kt = function() {
                rt(), Le("slaask-widget-container", "slaask-widget-container-with-notify"), qe("slaask-widget-notify-container", "slaask-hidden"), Le("slaask-widget-notify-title-span", "slaask-hidden"), document.getElementById("slaask-widget-notify-leave").removeEventListener("click", ft), document.getElementById("slaask-widget-notify-leave").removeEventListener("click", ht), document.getElementById("slaask-widget-notify-leave").addEventListener("click", ht)
            },
            ht = function() {
                tt("leave"), slaaskPusher.disconnect(), qe("slaask-widget-container", "slaask-widget-container-with-notify"), Le("slaask-widget-notify-container", "slaask-hidden"), qe("slaask-widget-notify-title-span", "slaask-hidden"), m.length > 1 ? (pt(), document.getElementById("conversation-list").appendChild(document.getElementById("slaask-groups-box"))) : (document.getElementById("slaask-message-greeting_message").remove(), ot(), yt(), document.getElementById("slaask-message-greeting_message").getElementsByClassName("slaask-message-body")[0].innerHTML = "<p>" + document.getElementById("slaask-message-greeting_message").getElementsByTagName("p")[0].innerHTML + '</p><div class="slaask-btn slaask-groups-item-click" id="bot-start-button-now">' + bot_start_button + "</div>", document.getElementById("bot-start-button-now").addEventListener("click", function() {
                    bt(), jt("bot-start-button-now"), kt()
                })), At()
            },
            yt = function() {
                Le("slaask-widget-footer", "slaask-reduced-footer"), Le("slaask-widget-container", "slaask-widget-container-without-footer"), document.getElementById("slaask-input").style.height = "", document.getElementById("slaask-widget-footer").style.height = "", document.getElementById("slaask-widget-container").style.bottom = ""
            },
            bt = function() {
                qe("slaask-widget-footer", "slaask-reduced-footer"), qe("slaask-widget-container", "slaask-widget-container-without-footer"), setTimeout(Ze, 200), At(), screen_width >= 780 && document.getElementById("slaask-input").focus()
            },
            vt = function(e, t, a, n, s, i, o, l) {
                return "" == t || ("undefined" == typeof a && (a = support_name), "undefined" == typeof s && (s = support_img), "undefined" == typeof n && (n = !1), Et(), messageHtml = Tt(e, t, a, n, s, i, o), c = a, available && m.length > 1 && (conversation_closed || null == y) && document.getElementById("slaask-groups-box") && !Ce("slaask-groups-box", "slaask-hidden") ? document.getElementById("slaask-groups-box").insertAdjacentHTML("beforebegin", messageHtml) : document.getElementById("conversation-list").insertAdjacentHTML("beforeend", messageHtml), void("" != l && (P ? _slaask.show() : j && (Ct(l || t, a, s), document.getElementById("slaask-button-image").style["background-image"] = 'url("' + s + '")', lt()))))
            },
            wt = function(e, t, a) {
                a ? img = Y : img = support_img, messageHtml = '<li id="' + t + '"><div class="chat-avatar"><img onerror="onerror=null;src=\'' + support_img + '\';" src="' + img + '" alt="Slaask picture"></div><div class="conversation-text"><div class="ctext-wrap" style="background-color: ' + chat_color + '!important"><div style="color:' + chat_text_color + '!important">' + e + '</div><div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before" style="border-right-color: ' + chat_color + '!important"></div></div></div></li>', document.getElementById("conversation-list").insertAdjacentHTML("beforeend", messageHtml), P ? _slaask.show() : j && (Ct(e), lt()), At()
            },
            xt = function(e, t) {
                document.getElementById("conversation-list").insertAdjacentHTML("beforeend", '<li id="user-typing"><div class="chat-avatar"><img  onerror="onerror=null;src=\'' + support_img + '\';" src="' + t + '" alt="Slaask picture"></div><div class="conversation-text"><div class="ctext-wrap slaask-dots" style="background-color: ' + chat_color + '!important"><style>.slaask-dot{background-color: ' + chat_text_color + '!important}</style><span class="slaask-dot slaask-dot1"></span><span class="slaask-dot slaask-dot2"></span><span class="slaask-dot slaask-dot3"></span><div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before" style="border-right-color: ' + chat_color + '!important"></div></div></div></li>'), At()
            },
            Et = function() {
                jt("user-typing")
            },
            Bt = function() {
                messageHtml = Mt(), document.getElementById("conversation-list").insertAdjacentHTML("beforeend", messageHtml)
            },
            It = function() {
                offline_email_address && (messageHtml = qt(K, Y), document.getElementById("conversation-list").insertAdjacentHTML("beforeend", messageHtml), At(), C && C.more && null != C.more.email ? (document.getElementById("slaask-email-input").value = C.more.email, document.getElementById("slaask-offline-message-input").focus()) : document.getElementById("slaask-email-input").focus())
            },
            Tt = function(e, t, a, n, s, i, o) {
                return "undefined" == typeof n && (n = !1), "undefined" == typeof a && (a = support_name), "undefined" == typeof s && (s = support_img), "undefined" != typeof i && i !== !0 || (t = _slaask.parseMessageHtml(t)), c == a ? li_class = "slaask-small-message" : li_class = "", o = o ? '<span class="description">, ' + o + "</span>" : "", '<li id="slaask-message-' + e + '" class="' + li_class + '"><div class="chat-avatar"><img  onerror="onerror=null;src=\'' + support_img + '\';" src="' + s + '" alt="Slaask picture"></div><div class="conversation-text"><div class="ctext-wrap" style="background-color: ' + chat_color + '!important"><div><i style="color:' + chat_text_color + '!important">' + a + "</i>" + o + '</div><div class="slaask-message-body" style="color:' + chat_text_color + '!important">' + t + "</div>" + Ot(n) + '<div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before" style="border-right-color: ' + chat_color + '!important"></div></div></div></li>'
            },
            Mt = function() {
                var e = Y,
                    t = K;
                if (available) var a = greeting_message;
                else var a = offline_greeting_message;
                return '<li id="slaask-message-greeting_message"><div class="chat-avatar"><img onerror="onerror=null;src=\'' + support_img + '\';" src="' + e + '" alt="Slaask picture"></div><div class="conversation-text"><div class="ctext-wrap" style="background-color: ' + chat_color + '!important"><div><i style="color:' + chat_text_color + '!important">' + t + '</i></div><div style="color:' + chat_text_color + '!important">' + _slaask.parseMessageHtml(a) + '</div><div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before" style="border-right-color: ' + chat_color + '!important"></div></div></div></li>'
            },
            St = function(e, t, a, n) {
                var s = e || Math.random().toString(36).substr(2);
                vt(s, t, K, !1, Y, n, null, a);
                var i = document.getElementById("slaask-message-" + s);
                return i.scrollIntoView(), i
            },
            Lt = function(e) {
                return document.getElementById("slaask-message-" + e)
            },
            qt = function(e, t) {
                if ("undefined" == typeof e && (e = support_name), "undefined" == typeof t && (t = support_img), ticketing_system_names == [] || null == ticketing_system_names) ticketing_system_html = "";
                else {
                    ticketing_system_options = "";
                    for (var a = 0; a < ticketing_system_names.length; a++) ticketing_system_options += '<option value="' + ticketing_system_names[a].id + '">' + ticketing_system_names[a].name + "</option>";
                    "" == ticketing_system_options ? ticketing_system_html = "" : ticketing_system_html = '<div><select id="slaask-offline-ticketing_system-input" class="chat-input slaask-input-offline">' + ticketing_system_options + "</select></div>"
                }
                return '<li id="slaask-message-offline"><div class="chat-avatar"><img  onerror="onerror=null;src=\'' + support_img + '\';" src="' + t + '" alt="Slaask picture"></div><div class="conversation-text"><div class="ctext-wrap" style="background-color: ' + chat_color + '!important"><div><i style="color:' + chat_text_color + '!important">' + e + '</i></div><div id="slaask-offline-form-container"><form id="slaask-offline-form" class="slaask-offline-form"><input id="slaask-email-input" class="chat-input slaask-input-offline" placeholder="' + offline_email_content + '" type="email" required="required"><div id="slaask-offline-form-error" class="slaask-offline-form-error"></div>' + ticketing_system_html + '<textarea id="slaask-offline-message-input" class="chat-input slaask-input-offline" placeholder="' + offline_message_content + '" type="text" required="required"></textarea><input style="background: ' + offline_submit_background + "!important; color: " + offline_submit_color + '!important" class="slaask-btn" type="submit" value="' + offline_submit_content + '"></form></div><div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before" style="border-right-color: ' + chat_color + '!important"></div></div></div></div></li>'
            },
            Ct = function(e, t, a) {
                "undefined" == typeof action_link && (action_link = !1), "undefined" == typeof t && (t = support_name), "undefined" == typeof a && (a = support_img), document.getElementById("slaask-message-text-title").innerHTML = t, document.getElementById("slaask-message-text-content").innerHTML = _slaask.parseMessageHtml(e)
            },
            Ht = function(e) {
                c = null, document.getElementById("conversation-list").insertAdjacentHTML("beforeend", '<li><hr><p class="slaask-notification">' + e + "</p><hr></li>")
            },
            Ot = function(e) {
                return e && "" != e.link && "" != e.text ? '<a class="slaask-btn" href="' + e.link + '" target="_blank">' + e.text + "</a>" : ""
            },
            Pt = function(e, t) {
                var a = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
                    n = new RegExp(a);
                e.indexOf("|") != -1 && (e = e.substring(0, e.indexOf("|"))), e.match(n) ? "blank" == t ? window.open(e) : window.location = e : (e = "http://" + e, e.match(n) && ("blank" == t ? window.open(e) : window.location = e))
            },
            At = function() {
                var e = document.getElementById("slaask-widget-container");
                e.scrollTop = e.scrollHeight
            },
            jt = function(e) {
                "string" == typeof e ? element = document.getElementById(e) : element = e, element && (element.nextSibling ? element.nextSibling && !Ce(element, "slaask-small-message") && Ce(element.nextSibling, "slaask-small-message") && qe(element.nextSibling, "slaask-small-message") : c = null, element.parentElement.removeChild(element))
            },
            Nt = function(e, t, a) {
                var s = zt(a, this);
                s.open("POST", n + e, !0), s.setRequestHeader("Content-Type", "application/json"), s.send(JSON.stringify(t))
            },
            zt = function(e, t) {
                var a;
                try {
                    a = new XMLHttpRequest
                } catch (e) {
                    try {
                        a = new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (e) {
                        try {
                            a = new ActiveXObject("Microsoft.XMLHTTP")
                        } catch (e) {
                            return null
                        }
                    }
                }
                return a.onreadystatechange = function() {
                    if (4 == a.readyState) try {
                        e(JSON.parse(a.responseText), t)
                    } catch (e) {
                        return null
                    }
                }, a
            },
            Rt = function(e) {
                return reg = /[a-z0-9_\-+=.]+@[a-z0-9\-]+(\.[a-z0-9-]+)\|[a-z0-9_\-+=.]+@[a-z0-9\-]+(\.[a-z0-9-]+)/gi, e.replace(reg, function(e) {
                    return e.substring(0, e.indexOf("|"))
                })
            },
            Ft = function(e) {
                return reg = /{{(.*?)}}/gi, e.replace(reg, function(e) {
                    return e = e.replace("{{", ""), e = e.replace("}}", ""), matches = e.split("||"), 1 == matches.length ? replace_text = "" : replace_text = matches[1], C ? "name" == matches[0] ? C.display_name ? C.display_name.split("-#")[0] : replace_text : C.more && "undefined" != typeof C.more[matches[0]] ? C.more[matches[0]] : replace_text : replace_text
                })
            },
            Wt = function(e) {
                return reg = /&lt;\@\S*&gt;/gi, e.replace(reg, function(e) {
                    e = e.replace("&lt;", ""), e = e.replace("&gt;", ""), e = e.replace("@", "");
                    var t = widget_users.filter(function(t) {
                        return t.uid === e
                    });
                    return 0 == t.length ? "" : '&nbsp;<img class="slaask-user-small-image" width="16px" height="16px" src="' + t[0].image + '"/> ' + t[0].name
                })
            },
            Ut = function(e) {
                Dt(), from_title = e || support_name;
                V = setInterval(function() {
                    document.title == U ? document.title = from_title + " " + title_changing_text : document.title = U
                }, 2e3)
            },
            Dt = function() {
                clearInterval(V), document.title = U
            },
            $t = function(e) {
                try {
                    0 == e ? slaaskFavicon.reset() : slaaskFavicon.badge(e)
                } catch (e) {}
            },
            Xt = function(e) {
                return _slaask.emojiParser(e, s + "/emoji", {
                    classes: "slaask-emoji"
                })
            },
            Gt = function(e) {
                for (var t in ie) e = e.trim() == t ? ":" + ie[t] + ":" : e.replace(" " + t, " :" + ie[t] + ":");
                return e
            },
            Vt = function() {
                try {
                    audio_ring.play()
                } catch (e) {}
            },
            Kt = function(e, t) {
                var a = "";
                return e && (a = ' fill="' + e + '"'), '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + t + 'px" height="' + t + 'px" viewBox="0 0 300 300" xml:space="preserve" ' + a + '><rect x="0" y="0" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 29 300)" width="40" height="382"></rect><rect x="0" y="0" transform="matrix(0.7071 -0.7071 0.7071 0.7071 1 29)" width="40" height="382"></rect></svg>'
            },
            Yt = function(e) {
                return e.toString().toLowerCase().replace(/[_-]/g, " ").replace(".", " ").replace(/(?:^|\s)\S/g, function(e) {
                    return e.toUpperCase()
                })
            },
            Jt = function(e, t) {
                Qt(e, t);
                try {
                    if (D) Se("Events are not triggered on Internet Explorer 6, 7, 8, 9, 10 and 11.");
                    else {
                        Se('Event "' + e + '" trigerred ' + JSON.stringify({
                            detail: t
                        }));
                        var a = new CustomEvent(e, {
                            detail: t
                        });
                        document.dispatchEvent(a)
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            Qt = function(e, t) {
                if ("slaask.ready" != e) {
                    e = e.replace(".", ".widget.");
                    for (var a = 0; a < g.length; a++) switch (g[a].name) {
                        case "Mixpanel":
                            mixpanel.init(g[a].key), C && C.more && null != C.more.id ? mixpanel.identify(C.more.id) : C && C.more && null != C.more.user_id ? mixpanel.identify(C.more.user_id) : mixpanel.identify(G), mixpanel.track(e, t);
                            break;
                        case "Google Analytics":
                            try {
                                ga("send", "event", "Slaask", e, Yt(e.replace(".", " ")).split(" ").join(""))
                            } catch (e) {
                                console.log(e)
                            }
                            break;
                        case "Facebook Pixel":
                            try {
                                fbq(["track", Yt(e.replace(".", " ")).split(" ").join(""), {}])
                            } catch (e) {
                                console.log(e)
                            }
                    }
                }
            },
            Zt = function(e) {
                if (_ > 0) {
                    if (yt(), T >= _) return default_infos = {
                        key: api_key,
                        token: G,
                        user_infos: C
                    }, Nt("/api/update_visitor", default_infos, Re), bt(), f ? _slaask.message(prechat_questions_final_message) : start_with_faq && conversation_closed && vt("introduce-live", bot_live_start, K, !1, Y), Jt("slaask.ended_prechat_questions", {}), null;
                    var t = e || u[T];
                    if ("name" == t.kind ? should_ask = !(C && null != C.display_name) : should_ask = !(C && C.more && null != C.more[t.attr]), should_ask) {
                        switch (f = !0, t.kind) {
                            case "name":
                                type = "text";
                                break;
                            case "open":
                                type = "text";
                                break;
                            case "email":
                                type = "email"
                        }
                        prechat_question_html = "<p>" + _slaask.parseMessageHtml(t.label) + '</p><form id="slaask-prechat-question-form-' + t.id + '"><input id="slaask-prechat-question-input" class="slaask-input slaask-input-survey" placeholder="' + t.question_placeholder + '" type="' + type + '" value="" required="required"/><span id="slaask-prechat-question-form-' + t.id + '-error" class="slaask-error-span"></span><input type="submit" class="slaask-btn" id="slaask-rating-sutmit" value="' + t.submit_text + '"/></form>', ea(prechat_question_html), ta(t), document.getElementById("slaask-prechat-question-input").focus(), Jt("slaask.recieved_prechat_question", {
                            message: t.title
                        }), At(), T += 1
                    } else T += 1, Zt()
                } else st("online") && conversation_closed && vt("introduce-live", bot_live_start, K, !1, Y), De("online") && !De("pending") && bt()
            },
            ea = function(e, t, a, n, s) {
                var i = document.createElement("li");
                if ("undefined" != typeof t && (i.id = t), a) var o = K,
                    l = Y;
                else var o = support_name,
                    l = support_img;
                return n && (o = n), s && (l = s), i.innerHTML = '<div class="chat-avatar"><img onerror="onerror=null;src=\'' + support_img + '\';" src="' + l + '" alt="Slaask picture"></div><div class="conversation-text"><div class="ctext-wrap" style="background-color: ' + chat_color + '!important"><div><i style="color:' + chat_text_color + '!important">' + o + '</i></div><div style="color:' + chat_text_color + '!important">' + e + '</div><div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before" style="border-right-color: ' + chat_color + '!important"></div></div></div>', document.getElementById("conversation-list").appendChild(i), i
            },
            ta = function(e) {
                document.getElementById("slaask-prechat-question-form-" + e.id).addEventListener("submit", function(t) {
                    t.preventDefault(), response = document.getElementById("slaask-prechat-question-input").value, "" != response && (C || (C = {
                        more: {}
                    }), "name" == e.kind ? C.display_name = response : C.more[e.attr] = response, "name" == e.kind && response.length > 254 ? (document.getElementById("slaask-prechat-question-form-" + e.id + "-error").innerHTML = "<b>Your name is too long</b>", document.getElementById("slaask-prechat-question-input").value = "", document.getElementById("slaask-prechat-question-input").focus()) : (document.getElementById("slaask-prechat-question-form-" + e.id).innerHTML = "", ct(response), Zt()))
                })
            },
            aa = function() {
                if (h > 0 && "online:pending:email" != state) {
                    if (I >= h) {
                        var e = Math.random().toString(36).substr(2);
                        return vt(e, survey_end_text, K, !1, Y, !0), At(), Jt("slaask.ended_survey", {}), null
                    }
                    switch (survey = p[I], survey.kind) {
                        case "yesno":
                            na(survey), sa(survey);
                            break;
                        case "open":
                            la(survey), ia(survey);
                            break;
                        case "rating":
                            ra(survey), oa(survey)
                    }
                    Vt(), Jt("slaask.recieved_survey", {
                        message: survey.title
                    }), At(), _slaask.show({
                        by: "recieved_survey"
                    }), I += 1
                }
            },
            na = function(e) {
                yesnoHtml = "<p>" + e.question + '</p><div id="slaask-yesno"><a class="slaask-btn slaask-btn-yes" id="slaask-yesno-yes">' + e.yes_content + '</a><a class="slaask-btn slaask-btn-no" id="slaask-yesno-no">' + e.no_content + "</a></div>", da(yesnoHtml)
            },
            sa = function(e) {
                document.getElementById("slaask-yesno-yes").addEventListener("click", function() {
                    send_data = {
                        key: api_key,
                        guest_id: d,
                        survey_id: e.id,
                        response: "yes"
                    }, document.getElementById("slaask-yesno").innerHTML = "", Nt("/api/complete_survey", send_data, ca)
                }), document.getElementById("slaask-yesno-no").addEventListener("click", function() {
                    send_data = {
                        key: api_key,
                        guest_id: d,
                        survey_id: e.id,
                        response: "no"
                    }, document.getElementById("slaask-yesno").innerHTML = "", Nt("/api/complete_survey", send_data, ca)
                })
            },
            ia = function(e) {
                document.getElementById("slaask-open-survey-form").addEventListener("submit", function(t) {
                    t.preventDefault(), response = document.getElementById("slaask-open-survey-input").value, send_data = {
                        key: api_key,
                        guest_id: d,
                        survey_id: e.id,
                        response: response
                    }, document.getElementById("slaask-open-survey-form").innerHTML = "", Nt("/api/complete_survey", send_data, ca)
                })
            },
            oa = function(e) {
                document.getElementById("slaask-rating-survey-form").addEventListener("submit", function(t) {
                    t.preventDefault();
                    for (var a = document.getElementsByName("slaask-rating-survey-input"), n = 0, s = a.length; n < s; n++)
                        if (a[n].checked) {
                            send_data = {
                                key: api_key,
                                guest_id: d,
                                survey_id: e.id,
                                response: a[n].value
                            }, document.getElementById("slaask-rating-survey-form").innerHTML = "", Nt("/api/complete_survey", send_data, ua);
                            break
                        }
                })
            },
            la = function(e) {
                yesnoHtml = "<p>" + e.question + '</p><form id="slaask-open-survey-form"><input id="slaask-open-survey-input" class="slaask-input slaask-input-survey" placeholder="' + e.open_ended_placeholder + '" type="text" value=""/><input type="submit" class="slaask-btn" id="slaask-rating-sutmit" value="' + e.rating_submit_content + '"/></form>', da(yesnoHtml)
            },
            ra = function(e) {
                yesnoHtml = "<p>" + e.question + '</p><form id="slaask-rating-survey-form"><section class="slaask-rating" id="slaask-rate"><input id="rate_5" name="slaask-rating-survey-input" type="radio" value="5" /><label for="rate_5" title="Five"> &#9733;</label><input checked="checked" id="rate_4" name="slaask-rating-survey-input" type="radio" value="4" /><label for="rate_4" title="Four"> &#9733;</label><input id="rate_3" name="slaask-rating-survey-input" type="radio" value="3" /><label for="rate_3" title="Three"> &#9733;</label><input id="rate_2" name="slaask-rating-survey-input" type="radio" value="2" /><label for="rate_2" title="Two"> &#9733;</label><input id="rate_1" name="slaask-rating-survey-input" type="radio" value="1" /><label for="rate_1" title="One"> &#9733;</label></section><input type="submit" class="slaask-btn" id="slaask-rating-sutmit" value="' + e.rating_submit_content + '"/></form>', da(yesnoHtml)
            },
            da = function(e) {
                messageHtml = '<li id="slaask-message-' + survey.id + '"><div class="chat-avatar"><img  onerror="onerror=null;src=\'' + support_img + '\';" src="' + Y + '" alt="Slaask picture"></div><div class="conversation-text"><div class="ctext-wrap" style="background-color: ' + chat_color + '!important"><div><i style="color:' + chat_text_color + '!important">' + K + '</i></div><div style="color:' + chat_text_color + '!important">' + e + '</div><div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before" style="border-right-color: ' + chat_color + '!important"></div></div></div></li>', document.getElementById("conversation-list").insertAdjacentHTML("beforeend", messageHtml)
            },
            ca = function(e) {
                "" == !e.response && ct(e.response), aa()
            },
            ua = function(e) {
                likes = parseInt(e.response), likes_html = "";
                for (var t = 0; t < likes; t++) likes_html += '<label for="" title="Like" class="saved"> &#9733;</label>';
                document.getElementById("conversation-list").insertAdjacentHTML("beforeend", '<li class="odd"><div class="conversation-text"><div class="ctext-wrap"><div id="slaask-rate">' + likes_html + '</div><div class="ctext-wrap-before-border"></div><div class="ctext-wrap-before"></div></div></div></li>'), aa(), At()
            },
            ma = function(e) {
                Nt("/api/faq", {
                    key: api_key,
                    query: e,
                    token: G,
                    language: navigator.language
                }, _a)
            },
            pa = function(e) {
                Nt("/api/single_faq", {
                    key: api_key,
                    id: e,
                    token: G
                }, function(e) {
                    wt('<div class="faq-content"><h4>' + e.title + "</h4>" + e.content + '<br/><div><div class="slaask-mandatory-buttons">' + ("online:pending:faq" == state ? "" : '<i style="color:' + chat_text_color + '!important"><div>' + Z + "</i></div>") + ya(!0) + "</div></div></div>", "slaask-faq-content", Y), "online:pending:faq" == state && Ge(!0), document.getElementById("slaask-faq-content").scrollIntoView(), document.getElementById("slaask-widget-container").scrollTop -= 10, ba()
                })
            },
            _a = function(e) {
                if (userFaqsHtml = "", "[object Object]" == Object.prototype.toString.call(e)) St(null, e.answer);
                else if (e.length > 0) {
                    for (a = 0; a < e.length; a++) userFaqsHtml += '<div id="faq-link-' + e[a].objectID + '" class="slaask-faqs-item slaask-btn">' + e[a].title + "</div>";
                    St("faqs", "<style>.slaask-faqs-item:hover{color:" + chat_text_color + ";}</style>" + _slaask.parseMessageHtml(J) + userFaqsHtml, J, !1);
                    for (var t = document.getElementsByClassName("slaask-faqs-item"), a = 0; a < t.length; a++) t[a].addEventListener("click", function() {
                        pa(parseInt(this.id.replace("faq-link-", ""))), va(!0)
                    }, !1);
                    "online:pending:faq" == state ? Ge(!0) : fa(), Lt("faqs").scrollIntoView()
                } else St("oops-faq", _slaask.parseMessageHtml(Q) + (De("pending:faq") ? "" : ya()), Q, !1), De("pending:faq") ? (ha(!1), Ge(!0)) : ba()
            },
            fa = function() {
                var e = '<div id="slaask-open-email-form" class="slaask-btn">' + (De("online") ? bot_start_button : ee) + "</div>";
                St("emails-faqs", _slaask.parseMessageHtml(Z) + e, "", !1), document.getElementById("slaask-open-email-form").addEventListener("click", ka, !1)
            },
            ka = function() {
                va(), De("pending:faq") ? (va(), $e("close")) : De("online:faq") ? Ue("online") : offline_email_address && (It(), ve())
            },
            ha = function(e) {
                for (var t = document.getElementsByClassName("slaask-mandatory-buttons"), a = 0; a < t.length; a++) jt(t[a]);
                bt(), e && St("pending-introduce-faq", pending_introduce_faq)
            },
            ya = function(e) {
                var t = "";
                return t = De("online:pending:faq") ? pending_ok_button_text : De("online:faq") ? bot_start_button : ee, e ? '<div id="slaask-open-email-form" class="slaask-btn">' + t + '</div><div id="slaask-faq-try-again" class="slaask-btn">' + faq_try_again + "</div>" : '<div id="slaask-faq-try-again" class="slaask-btn">' + faq_try_again + '</div><div id="slaask-open-email-form" class="slaask-btn">' + t + "</div>"
            },
            ba = function() {
                document.getElementById("slaask-open-email-form") && document.getElementById("slaask-open-email-form").addEventListener("click", ka, !1), document.getElementById("slaask-faq-try-again").addEventListener("click", ha, !1), yt()
            },
            va = function(e) {
                jt(Lt("oops-faq")), jt(Lt("emails-faqs")), jt(Lt("faqs")), jt(Lt("pending-introduce-faq")), e || jt("slaask-faq-content")
            },
            wa = function() {
                trigger.time < 2e3 && "topbar" == trigger.kind && (trigger.time = 2e3), setTimeout(function() {
                    if ("alert" == trigger.kind || "alert_email" == trigger.kind) Ia(trigger);
                    else if ("tooltip" == trigger.kind) xa(trigger);
                    else if ("topbar" == trigger.kind) Ta(trigger);
                    else if (trigger.replace_greetings && jt("slaask-message-greeting_message"), trigger.random_user) {
                        var e = widget_users[Math.floor(Math.random() * widget_users.length)];
                        _slaask.message(trigger.message, e.name, null, e.image)
                    } else _slaask.message(trigger.message)
                }, trigger.time)
            },
            xa = function(e) {
                var t = document.getElementById(e.element_id);
                if (t) {
                    var a = t.getBoundingClientRect(),
                        n = a.top + window.scrollY,
                        s = a.left + window.scrollX,
                        i = s + a.width,
                        o = n + a.height;
                    switch (qe("slaask-tooltip-" + e.side + "-arrow-inner", "slaask-hidden"), document.getElementById("slaask-tooltip-title").innerHTML = Xt(Ft(e.name)), document.getElementById("slaask-tooltip-content").innerHTML = _slaask.parseMessageHtml(e.message, !0), qe("slaask-tooltip", "slaask-hidden"), e.side) {
                        case "top":
                            document.getElementById("slaask-tooltip").style.top = n - Math.round(parseFloat(document.getElementById("slaask-tooltip").offsetHeight)) + "px", document.getElementById("slaask-tooltip").style.left = s + a.width / 2 - document.getElementById("slaask-tooltip").offsetWidth / 2 + "px";
                            break;
                        case "bottom":
                            document.getElementById("slaask-tooltip").style.top = o + "px", document.getElementById("slaask-tooltip").style.left = s + a.width / 2 - document.getElementById("slaask-tooltip").offsetWidth / 2 + "px";
                            break;
                        case "left":
                            document.getElementById("slaask-tooltip").style.top = n - document.getElementById("slaask-tooltip").offsetHeight / 2 + a.height / 2 + "px", document.getElementById("slaask-tooltip").style.left = s - document.getElementById("slaask-tooltip").offsetWidth - 15 + "px";
                            break;
                        case "right":
                            document.getElementById("slaask-tooltip").style.top = n - document.getElementById("slaask-tooltip").offsetHeight / 2 + a.height / 2 + "px", document.getElementById("slaask-tooltip").style.left = i + 15 + "px"
                    }
                    var l = [];
                    for (l.push(t); t.parentNode;) l.unshift(t.parentNode), t = t.parentNode;
                    for (var r = l.length - 1; r >= 0; r--) "undefined" != typeof l[r].style && "fixed" == window.getComputedStyle(l[r]).getPropertyValue("position") && (document.getElementById("slaask-tooltip").style.position = "fixed");
                    document.getElementById("slaask-tooltip-header-cross").addEventListener("click", function(e) {
                        e.preventDefault(), Le("slaask-tooltip", "slaask-hidden")
                    })
                }
            },
            Ea = function(e) {
                qe("slaask-widget-notify-alert-container", "slaask-hidden"), document.getElementById("slaask-widget-notify-alert-title-span").innerHTML = _slaask.parseMessageHtml(e), P || (Ct(e), lt())
            },
            Ba = function() {
                Le("slaask-widget-notify-alert-container", "slaask-hidden"), document.getElementById("slaask-widget-notify-alert-title-span").innerHTML = ""
            },
            Ia = function(e) {
                return !("alert_email" != e.kind || !C || !C.more || null == C.more.email) || (qe("slaask-alert", "slaask-hidden"), qe("slaask-alert-overlay", "slaask-hidden"), document.getElementById("slaask-alert-title").innerHTML = Xt(Ft(e.name)), document.getElementById("slaask-alert-content-box").innerHTML = _slaask.parseMessageHtml(e.message, !0), document.getElementById("slaask-alert-cancel").innerHTML = e.cancel_text, null == e.cta_text || "" == e.cta_text ? Le("slaask-alert-cta-button", "slaask-hidden") : document.getElementById("slaask-alert-cta-button").innerHTML = Xt(e.cta_text), "alert_email" == e.kind ? (Le("slaask-alert", "slaask-alert-email"), qe("slaask-alert-input-box", "slaask-hidden"), document.getElementById("slaask-alert-input").placeholder = e.input_placeholder, e.ask_firstname && (qe("slaask-alert-input-firstname", "slaask-hidden"), qe("slaask-alert-input-lastname", "slaask-hidden"), document.getElementById("slaask-alert-input-firstname").placeholder = e.firstname_placeholder, document.getElementById("slaask-alert-input-lastname").placeholder = e.lastname_placeholder), document.getElementById("slaask-alert-cta-button").addEventListener("click", function(t) {
                    if (t.preventDefault(), Le("slaask-alert", "slaask-hidden"), Le("slaask-alert-overlay", "slaask-hidden"), email_value = document.getElementById("slaask-alert-input").value, e.ask_firstname && (firstname_value = document.getElementById("slaask-alert-input-firstname").value, lastname_value = document.getElementById("slaask-alert-input-lastname").value, firstname_value && "" != firstname_value || lastname_value && "" != lastname_value)) {
                        var a = {
                            key: api_key,
                            token: G,
                            attr: "name",
                            value: firstname_value + " " + lastname_value,
                            email_asked: !1,
                            no_message: !0
                        };
                        Nt("/api/update_visitor_email", a, Re)
                    }
                    if (email_value && "" != email_value) {
                        var a = {
                            key: api_key,
                            token: G,
                            attr: "email",
                            value: email_value,
                            email_asked: !0,
                            no_message: !0
                        };
                        C || (C = {}), C.more || (C.more = {}), C.more.email = email_value, Jt("slaask.email_captured", {}), Nt("/api/update_visitor_email", a, Re)
                    }
                })) : document.getElementById("slaask-alert-cta-button").addEventListener("click", function(t) {
                    if (t.preventDefault(), Le("slaask-alert", "slaask-hidden"), Le("slaask-alert-overlay", "slaask-hidden"), null != e.cta_action && "" != e.cta_action)
                        if (Ma(), e.blank) {
                            var a = window.open(e.cta_action, "_blank");
                            a.focus()
                        } else window.location = e.cta_action
                }), void(document.getElementById("slaask-alert").style["margin-top"] = "-" + Math.round(parseFloat(document.getElementById("slaask-alert").offsetHeight / 2)) + "px"))
            },
            Ta = function(e) {
                for (var t = document.body.getElementsByTagName("*"), a = t.length, n = document.getElementsByTagName("html")[0], s = 0; s < a; s++) "fixed" == window.getComputedStyle(t[s], null).getPropertyValue("position") && (/slaask/g.test(t[s].id) || (Le(t[s], "slaask-moved-for-topbar"), t[s].style.top = parseInt(window.getComputedStyle(t[s], null).getPropertyValue("top")) + 54 + "px"));
                Le(n, "slaask-moved-for-topbar"), n.style.top = parseInt(window.getComputedStyle(n, null).getPropertyValue("top")) + 54 + "px", qe("slaask-topbar", "slaask-hidden"), null == e.cta_text || "" == e.cta_text ? Le("slaask-topbar-form", "slaask-hidden") : qe("slaask-topbar-form", "slaask-hidden"), document.getElementById("slaask-topbar-button").innerHTML = e.cta_text, document.getElementById("slaask-topbar").style["background-color"] = e.color, document.getElementById("slaask-topbar-button").style.color = e.color, document.getElementById("slaask-topbar-text").innerHTML = _slaask.parseMessageHtml(e.message, !0), document.getElementById("slaask-topbar-close-button").addEventListener("click", function(e) {
                    e.preventDefault();
                    for (var s = 0; s < a; s++) "fixed" == window.getComputedStyle(t[s], null).getPropertyValue("position") && (/slaask/g.test(t[s].id) || (qe(t[s], "slaask-moved-for-topbar"), t[s].style.top = parseInt(window.getComputedStyle(t[s], null).getPropertyValue("top")) - 54 + "px"));
                    n.style.top = parseInt(window.getComputedStyle(n, null).getPropertyValue("top")) - 54 + "px", qe(n, "slaask-moved-for-topbar"), Le("slaask-topbar", "slaask-hidden")
                }), document.getElementById("slaask-topbar-button").addEventListener("click", function(s) {
                    s.preventDefault();
                    for (var i = 0; i < a; i++) "fixed" == window.getComputedStyle(t[i], null).getPropertyValue("position") && (/slaask/g.test(t[i].id) || (qe(t[i], "slaask-moved-for-topbar"), t[i].style.top = parseInt(window.getComputedStyle(t[i], null).getPropertyValue("top")) - 54 + "px"));
                    if (n.style.top = parseInt(window.getComputedStyle(n, null).getPropertyValue("top")) - 54 + "px", qe(n, "slaask-moved-for-topbar"), Le("slaask-topbar", "slaask-hidden"), null != e.cta_action && "" != e.cta_action)
                        if (Ma(), e.blank) {
                            var o = window.open(e.cta_action, "_blank");
                            o.focus()
                        } else if (e.blank) {
                        var o = window.open(e.cta_action, "_blank");
                        o.focus()
                    } else window.location = e.cta_action
                }), document.getElementById("slaask-alert").style["margin-top"] = "-" + Math.round(parseFloat(document.getElementById("slaask-alert").offsetHeight / 2)) + "px"
            },
            Ma = function() {
                Nt("/api/click_trigger", {
                    key: api_key,
                    guest_id: d,
                    trigger_id: trigger.id
                }, Re)
            };
        this.emojiParser = function(e, t, a) {
            var n, s;
            return null == a && (a = {}), s = La(a.list), "function" == typeof a ? a = {
                parser: a
            } : (null == a.attributes && (a.attributes = {
                title: function(e, t, a) {
                    return null != a ? "" + a + " (" + t + ")" : t
                },
                alt: function(e) {
                    return e
                }
            }), null == a.parser && (a.parser = function(e, t, a, n) {
                var s, i, o, l;
                i = '<img class="' + a + '" src="' + t + "/" + encodeURIComponent(e[1]) + '.png" ', l = n.attributes;
                for (s in l) o = l[s], i += "" + s + '="' + o.apply(n, e) + '" ';
                return i + "/>"
            })), n = null != a.classes ? a.classes : "emoji", e.replace(/\:([a-z0-9_+-]+)(?:\[((?:[^\]]|\][^:])*\]?)\])?\:/g, function(i, o, l) {
                var r = n;
                return s.indexOf(o) === -1 ? i.indexOf("skin-tone") === -1 ? i : "" : (e == "<p>" + i + "</p>" && (r += "-big"), a.parser([i, o, l], t, r, a))
            })
        };
        var Sa = void 0,
            La = function(e) {
                return Sa = e || Sa || ["+1", "-1", "100", "1234", "8ball", "a", "ab", "abc", "abcd", "accept", "aerial_tramway", "airplane", "alarm_clock", "alien", "ambulance", "anchor", "angel", "anger", "angry", "anguished", "ant", "apple", "aquarius", "aries", "arrow_backward", "arrow_double_down", "arrow_double_up", "arrow_down", "arrow_down_small", "arrow_forward", "arrow_heading_down", "arrow_heading_up", "arrow_left", "arrow_lower_left", "arrow_lower_right", "arrow_right", "arrow_right_hook", "arrow_up", "arrow_up_down", "arrow_up_small", "arrow_upper_left", "arrow_upper_right", "arrows_clockwise", "arrows_counterclockwise", "art", "articulated_lorry", "astonished", "atm", "b", "baby", "baby_bottle", "baby_chick", "baby_symbol", "baggage_claim", "balloon", "ballot_box_with_check", "bamboo", "banana", "bangbang", "bank", "bar_chart", "barber", "baseball", "basketball", "bath", "bathtub", "battery", "bear", "bee", "beer", "beers", "beetle", "beginner", "bell", "bento", "bicyclist", "bike", "bikini", "bird", "birthday", "black_circle", "black_joker", "black_nib", "black_square", "black_square_button", "blossom", "blowfish", "blue_book", "blue_car", "blue_heart", "blush", "boar", "boat", "bomb", "book", "bookmark", "bookmark_tabs", "books", "boom", "boot", "bouquet", "bow", "bowling", "bowtie", "boy", "bread", "bride_with_veil", "bridge_at_night", "briefcase", "broken_heart", "bug", "bulb", "bullettrain_front", "bullettrain_side", "bus", "busstop", "bust_in_silhouette", "busts_in_silhouette", "cactus", "cake", "calendar", "calling", "camel", "camera", "cancer", "candy", "capital_abcd", "capricorn", "car", "card_index", "carousel_horse", "cat", "cat2", "cd", "chart", "chart_with_downwards_trend", "chart_with_upwards_trend", "checkered_flag", "cherries", "cherry_blossom", "chestnut", "chicken", "children_crossing", "chocolate_bar", "christmas_tree", "church", "cinema", "circus_tent", "city_sunrise", "city_sunset", "cl", "clap", "clapper", "clipboard", "clock1", "clock10", "clock1030", "clock11", "clock1130", "clock12", "clock1230", "clock130", "clock2", "clock230", "clock3", "clock330", "clock4", "clock430", "clock5", "clock530", "clock6", "clock630", "clock7", "clock730", "clock8", "clock830", "clock9", "clock930", "closed_book", "closed_lock_with_key", "closed_umbrella", "cloud", "clubs", "cn", "cocktail", "coffee", "cold_sweat", "collision", "computer", "confetti_ball", "confounded", "confused", "congratulations", "construction", "construction_worker", "convenience_store", "cookie", "cool", "cop", "copyright", "corn", "couple", "couple_with_heart", "couplekiss", "cow", "cow2", "credit_card", "crocodile", "crossed_flags", "crown", "cry", "crying_cat_face", "crystal_ball", "cupid", "curly_loop", "currency_exchange", "curry", "custard", "customs", "cyclone", "dancer", "dancers", "dango", "dart", "dash", "date", "de", "deciduous_tree", "department_store", "diamond_shape_with_a_dot_inside", "diamonds", "disappointed", "disappointed_relieved", "dizzy", "dizzy_face", "do_not_litter", "dog", "dog2", "dollar", "dolls", "dolphin", "donut", "door", "doughnut", "dragon", "dragon_face", "dress", "dromedary_camel", "droplet", "dvd", "e-mail", "ear", "ear_of_rice", "earth_africa", "earth_americas", "earth_asia", "egg", "eggplant", "eight", "eight_pointed_black_star", "eight_spoked_asterisk", "electric_plug", "elephant", "email", "end", "envelope", "es", "euro", "european_castle", "european_post_office", "evergreen_tree", "exclamation", "expressionless", "eyeglasses", "eyes", "facepunch", "factory", "fallen_leaf", "family", "fast_forward", "fax", "fearful", "feelsgood", "feet", "ferris_wheel", "file_folder", "finnadie", "fire", "fire_engine", "fireworks", "first_quarter_moon", "first_quarter_moon_with_face", "fish", "fish_cake", "fishing_pole_and_fish", "fist", "five", "flags", "flashlight", "floppy_disk", "flower_playing_cards", "flushed", "foggy", "football", "fork_and_knife", "fountain", "four", "four_leaf_clover", "fr", "free", "fried_shrimp", "fries", "frog", "frowning", "fu", "fuelpump", "full_moon", "full_moon_with_face", "game_die", "gb", "gem", "gemini", "ghost", "gift", "gift_heart", "girl", "globe_with_meridians", "goat", "goberserk", "godmode", "golf", "grapes", "green_apple", "green_book", "green_heart", "grey_exclamation", "grey_question", "grimacing", "grin", "grinning", "guardsman", "guitar", "gun", "haircut", "hamburger", "hammer", "hamster", "hand", "handbag", "hankey", "hash", "hatched_chick", "hatching_chick", "headphones", "hear_no_evil", "heart", "heart_decoration", "heart_eyes", "heart_eyes_cat", "heartbeat", "heartpulse", "hearts", "heavy_check_mark", "heavy_division_sign", "heavy_dollar_sign", "heavy_exclamation_mark", "heavy_minus_sign", "heavy_multiplication_x", "heavy_plus_sign", "helicopter", "herb", "hibiscus", "high_brightness", "high_heel", "hocho", "honey_pot", "honeybee", "horse", "horse_racing", "hospital", "hotel", "hotsprings", "hourglass", "hourglass_flowing_sand", "house", "house_with_garden", "hurtrealbad", "hushed", "ice_cream", "icecream", "id", "ideograph_advantage", "imp", "inbox_tray", "incoming_envelope", "information_desk_person", "information_source", "innocent", "interrobang", "iphone", "it", "izakaya_lantern", "jack_o_lantern", "japan", "japanese_castle", "japanese_goblin", "japanese_ogre", "jeans", "joy", "joy_cat", "jp", "key", "keycap_ten", "kimono", "kiss", "kissing", "kissing_cat", "kissing_closed_eyes", "kissing_face", "kissing_heart", "kissing_smiling_eyes", "koala", "koko", "kr", "large_blue_circle", "large_blue_diamond", "large_orange_diamond", "last_quarter_moon", "last_quarter_moon_with_face", "laughing", "leaves", "ledger", "left_luggage", "left_right_arrow", "leftwards_arrow_with_hook", "lemon", "leo", "leopard", "libra", "light_rail", "link", "lips", "lipstick", "lock", "lock_with_ink_pen", "lollipop", "loop", "loudspeaker", "love_hotel", "love_letter", "low_brightness", "m", "mag", "mag_right", "mahjong", "mailbox", "mailbox_closed", "mailbox_with_mail", "mailbox_with_no_mail", "man", "man_with_gua_pi_mao", "man_with_turban", "mans_shoe", "maple_leaf", "mask", "massage", "meat_on_bone", "mega", "melon", "memo", "mens", "metal", "metro", "microphone", "microscope", "milky_way", "minibus", "minidisc", "mobile_phone_off", "money_with_wings", "moneybag", "monkey", "monkey_face", "monorail", "moon", "mortar_board", "mount_fuji", "mountain_bicyclist", "mountain_cableway", "mountain_railway", "mouse", "mouse2", "movie_camera", "moyai", "muscle", "mushroom", "musical_keyboard", "musical_note", "musical_score", "mute", "nail_care", "name_badge", "neckbeard", "necktie", "negative_squared_cross_mark", "neutral_face", "new", "new_moon", "new_moon_with_face", "newspaper", "ng", "nine", "no_bell", "no_bicycles", "no_entry", "no_entry_sign", "no_good", "no_mobile_phones", "no_mouth", "no_pedestrians", "no_smoking", "non-potable_water", "nose", "notebook", "notebook_with_decorative_cover", "notes", "nut_and_bolt", "o", "o2", "ocean", "octocat", "octopus", "oden", "office", "ok", "ok_hand", "ok_woman", "older_man", "older_woman", "on", "oncoming_automobile", "oncoming_bus", "oncoming_police_car", "oncoming_taxi", "one", "open_file_folder", "open_hands", "open_mouth", "ophiuchus", "orange_book", "outbox_tray", "ox", "page_facing_up", "page_with_curl", "pager", "palm_tree", "panda_face", "paperclip", "parking", "part_alternation_mark", "partly_sunny", "passport_control", "paw_prints", "peach", "pear", "pencil", "pencil2", "penguin", "pensive", "performing_arts", "persevere", "person_frowning", "person_with_blond_hair", "person_with_pouting_face", "phone", "pig", "pig2", "pig_nose", "pill", "pineapple", "pisces", "pizza", "plus1", "point_down", "point_left", "point_right", "point_up", "point_up_2", "police_car", "poodle", "poop", "post_office", "postal_horn", "postbox", "potable_water", "pouch", "poultry_leg", "pound", "pouting_cat", "pray", "princess", "punch", "purple_heart", "purse", "pushpin", "put_litter_in_its_place", "question", "rabbit", "rabbit2", "racehorse", "radio", "radio_button", "rage", "rage1", "rage2", "rage3", "rage4", "railway_car", "rainbow", "raised_hand", "raised_hands", "raising_hand", "ram", "ramen", "rat", "recycle", "red_car", "red_circle", "registered", "relaxed", "relieved", "repeat", "repeat_one", "restroom", "revolving_hearts", "rewind", "ribbon", "rice", "rice_ball", "rice_cracker", "rice_scene", "ring", "rocket", "roller_coaster", "rooster", "rose", "rotating_light", "round_pushpin", "rowboat", "ru", "rugby_football", "runner", "running", "running_shirt_with_sash", "sa", "sagittarius", "sailboat", "sake", "sandal", "santa", "satellite", "satisfied", "saxophone", "school", "school_satchel", "scissors", "scorpius", "scream", "scream_cat", "scroll", "seat", "secret", "see_no_evil", "seedling", "seven", "shaved_ice", "sheep", "shell", "ship", "shipit", "shirt", "shit", "shoe", "shower", "signal_strength", "six", "six_pointed_star", "ski", "skull", "sleeping", "sleepy", "slot_machine", "small_blue_diamond", "small_orange_diamond", "small_red_triangle", "small_red_triangle_down", "smile", "simple_smile", "slightly_smiling_face", "smile_cat", "smiley", "smiley_cat", "smiling_imp", "smirk", "smirk_cat", "smoking", "snail", "snake", "snowboarder", "snowflake", "snowman", "sob", "soccer", "soon", "sos", "sound", "space_invader", "spades", "spaghetti", "sparkler", "sparkles", "sparkling_heart", "speak_no_evil", "speaker", "speech_balloon", "speedboat", "squirrel", "star", "star2", "stars", "station", "statue_of_liberty", "steam_locomotive", "stew", "straight_ruler", "strawberry", "stuck_out_tongue", "stuck_out_tongue_closed_eyes", "stuck_out_tongue_winking_eye", "sun_with_face", "sunflower", "sunglasses", "sunny", "sunrise", "sunrise_over_mountains", "surfer", "sushi", "suspect", "suspension_railway", "sweat", "sweat_drops", "sweat_smile", "sweet_potato", "swimmer", "symbols", "syringe", "tada", "tanabata_tree", "tangerine", "taurus", "taxi", "tea", "telephone", "telephone_receiver", "telescope", "tennis", "tent", "thought_balloon", "three", "thumbsdown", "thumbsup", "ticket", "tiger", "tiger2", "tired_face", "tm", "toilet", "tokyo_tower", "tomato", "tongue", "top", "tophat", "tractor", "traffic_light", "train", "train2", "tram", "triangular_flag_on_post", "triangular_ruler", "trident", "triumph", "trolleybus", "trollface", "trophy", "tropical_drink", "tropical_fish", "truck", "trumpet", "tshirt", "tulip", "turtle", "tv", "twisted_rightwards_arrows", "two", "two_hearts", "two_men_holding_hands", "two_women_holding_hands", "u5272", "u5408", "u55b6", "u6307", "u6708", "u6709", "u6e80", "u7121", "u7533", "u7981", "u7a7a", "uk", "umbrella", "unamused", "underage", "unlock", "up", "us", "v", "vertical_traffic_light", "vhs", "vibration_mode", "video_camera", "video_game", "violin", "virgo", "volcano", "vs", "walking", "waning_crescent_moon", "waning_gibbous_moon", "warning", "watch", "water_buffalo", "watermelon", "wave", "wavy_dash", "waxing_crescent_moon", "waxing_gibbous_moon", "wc", "weary", "wedding", "whale", "whale2", "wheelchair", "white_check_mark", "white_circle", "white_flower", "white_large_square", "white_square_button", "wind_chime", "wine_glass", "wink", "wolf", "woman", "womans_clothes", "womans_hat", "womens", "worried", "wrench", "x", "yellow_heart", "yen", "yum", "zap", "zero", "zzz"]
            }
    },
    _slaask = _slaask || new slaaskApp;
window.autosize || ! function(e, t) {
    if ("function" == typeof define && define.amd) define(["exports", "module"], t);
    else if ("undefined" != typeof exports && "undefined" != typeof module) t(exports, module);
    else {
        var a = {
            exports: {}
        };
        t(a.exports, a), e.autosize = a.exports
    }
}(this, function(e, t) {
    "use strict";

    function a(e) {
        function t() {
            var t = window.getComputedStyle(e, null);
            "vertical" === t.resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), r = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(r) && (r = 0), l()
        }

        function a(t) {
            var a = e.style.width;
            e.style.width = "0px", e.offsetWidth, e.style.width = a, e.style.overflowY = t, s()
        }

        function n(e) {
            for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                node: e.parentNode,
                scrollTop: e.parentNode.scrollTop
            }), e = e.parentNode;
            return t
        }

        function s() {
            var t = e.style.height,
                a = n(e),
                s = document.documentElement && document.documentElement.scrollTop;
            e.scrollHeight > 40 && (e.style.height = "auto");
            var i = e.scrollHeight + r;
            return 0 === e.scrollHeight ? void(e.style.height = t) : ("" == e.value ? e.style.height = "40px" : e.style.height = i + "px", d = e.clientWidth, a.forEach(function(e) {
                e.node.scrollTop = e.scrollTop
            }), void(s && (document.documentElement.scrollTop = s)))
        }

        function l() {
            s();
            var t = window.getComputedStyle(e, null),
                n = Math.round(parseFloat(t.height)),
                i = Math.round(parseFloat(e.style.height));
            if (n !== i ? "visible" !== t.overflowY && a("visible") : "hidden" !== t.overflowY && a("hidden"), c !== n) {
                c = n;
                var l = o("autosize:resized");
                e.dispatchEvent(l)
            }
        }
        if (e && e.nodeName && "TEXTAREA" === e.nodeName && !i.has(e)) {
            var r = null,
                d = e.clientWidth,
                c = null,
                u = function() {
                    e.clientWidth !== d && l()
                },
                m = function(t) {
                    window.removeEventListener("resize", u, !1), e.removeEventListener("input", l, !1), e.removeEventListener("keyup", l, !1), e.removeEventListener("autosize:destroy", m, !1), e.removeEventListener("autosize:update", l, !1), i["delete"](e), Object.keys(t).forEach(function(a) {
                        e.style[a] = t[a]
                    })
                }.bind(e, {
                    height: e.style.height,
                    resize: e.style.resize,
                    overflowY: e.style.overflowY,
                    overflowX: e.style.overflowX,
                    wordWrap: e.style.wordWrap
                });
            e.addEventListener("autosize:destroy", m, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", l, !1), window.addEventListener("resize", u, !1), e.addEventListener("input", l, !1), e.addEventListener("autosize:update", l, !1), i.add(e), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", t()
        }
    }

    function n(e) {
        if (e && e.nodeName && "TEXTAREA" === e.nodeName) {
            var t = o("autosize:destroy");
            e.dispatchEvent(t)
        }
    }

    function s(e) {
        if (e && e.nodeName && "TEXTAREA" === e.nodeName) {
            var t = o("autosize:update");
            e.dispatchEvent(t)
        }
    }
    var i = "function" == typeof Set ? new Set : function() {
            var e = [];
            return {
                has: function(t) {
                    return Boolean(e.indexOf(t) > -1)
                },
                add: function(t) {
                    e.push(t)
                },
                "delete": function(t) {
                    e.splice(e.indexOf(t), 1)
                }
            }
        }(),
        o = function(e) {
            return new Event(e)
        };
    try {
        new Event("test")
    } catch (e) {
        o = function(e) {
            var t = document.createEvent("Event");
            return t.initEvent(e, !0, !1), t
        }
    }
    var l = null;
    "undefined" == typeof window || "function" != typeof window.getComputedStyle ? (l = function(e) {
        return e
    }, l.destroy = function(e) {
        return e
    }, l.update = function(e) {
        return e
    }) : (l = function(e, t) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], function(e) {
            return a(e, t)
        }), e
    }, l.destroy = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], n), e
    }, l.update = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], s), e
    }), t.exports = l
}), window.mixpanel || ! function(e, t) {
    if (!t.__SV) {
        var a, n, s, i;
        window.mixpanel = t, t._i = [], t.init = function(e, a, n) {
            function o(e, t) {
                var a = t.split(".");
                2 == a.length && (e = e[a[0]], t = a[1]), e[t] = function() {
                    e.push([t].concat(Array.prototype.slice.call(arguments, 0)))
                }
            }
            var l = t;
            for ("undefined" != typeof n ? l = t[n] = [] : n = "mixpanel", l.people = l.people || [], l.toString = function(e) {
                    var t = "mixpanel";
                    return "mixpanel" !== n && (t += "." + n), e || (t += " (stub)"), t
                }, l.people.toString = function() {
                    return l.toString(1) + ".people (stub)"
                }, s = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" "), i = 0; i < s.length; i++) o(l, s[i]);
            t._i.push([e, a, n])
        }, t.__SV = 1.2, a = e.createElement("script"), a.type = "text/javascript", a.async = !0, a.src = "undefined" != typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === e.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js", n = e.getElementsByTagName("script")[0], n.parentNode.insertBefore(a, n)
    }
}(document, window.mixpanel || []), ! function() {
    var e = function(e) {
        "use strict";

        function t(e) {
            if (e.paused || e.ended || f) return !1;
            try {
                c.clearRect(0, 0, r, l), c.drawImage(e, 0, 0, r, l)
            } catch (e) {}
            y = setTimeout(function() {
                t(e)
            }, C.duration), q.setIcon(d)
        }

        function a(e) {
            var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            e = e.replace(t, function(e, t, a, n) {
                return t + t + a + a + n + n
            });
            var a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
            return !!a && {
                r: parseInt(a[1], 16),
                g: parseInt(a[2], 16),
                b: parseInt(a[3], 16)
            }
        }

        function n(e, t) {
            var a, n = {};
            for (a in e) n[a] = e[a];
            for (a in t) n[a] = t[a];
            return n
        }

        function s() {
            return b.hidden || b.msHidden || b.webkitHidden || b.mozHidden
        }
        e = e ? e : {};
        var i, o, l, r, d, c, u, m, g, p, _, f, k, h, y, b, v = {
            bgColor: "#d00",
            textColor: "#fff",
            fontFamily: "sans-serif",
            fontStyle: "bold",
            type: "circle",
            position: "down",
            animation: "slide",
            elementId: !1,
            dataUrl: !1,
            win: window
        };
        k = {}, k.ff = "undefined" != typeof InstallTrigger, k.chrome = !!window.chrome, k.opera = !!window.opera || navigator.userAgent.indexOf("Opera") >= 0, k.ie = !1, k.safari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0, k.supported = k.chrome || k.ff || k.opera;
        var w = [];
        _ = function() {}, m = f = !1;
        var x = function() {
                i = n(v, e), i.bgColor = a(i.bgColor), i.textColor = a(i.textColor), i.position = i.position.toLowerCase(), i.animation = C.types["" + i.animation] ? i.animation : v.animation, b = i.win.document;
                var t = i.position.indexOf("up") > -1,
                    s = i.position.indexOf("left") > -1;
                if (t || s)
                    for (var m = 0; m < C.types["" + i.animation].length; m++) {
                        var g = C.types["" + i.animation][m];
                        t && (g.y = g.y < .6 ? g.y - .4 : g.y - 2 * g.y + (1 - g.w)), s && (g.x = g.x < .6 ? g.x - .4 : g.x - 2 * g.x + (1 - g.h)), C.types["" + i.animation][m] = g
                    }
                i.type = B["" + i.type] ? i.type : v.type, o = q.getIcon(), d = document.createElement("canvas"), u = document.createElement("img"), o.hasAttribute("href") ? (u.setAttribute("crossOrigin", "anonymous"), u.onload = function() {
                    l = u.height > 0 ? u.height : 32, r = u.width > 0 ? u.width : 32, d.height = l, d.width = r, c = d.getContext("2d"), E.ready()
                }, u.setAttribute("src", o.getAttribute("href"))) : (u.onload = function() {
                    l = 32, r = 32, u.height = l, u.width = r, d.height = l, d.width = r, c = d.getContext("2d"), E.ready()
                }, u.setAttribute("src", ""))
            },
            E = {};
        E.ready = function() {
            m = !0, E.reset(), _()
        }, E.reset = function() {
            m && (w = [], g = !1, p = !1, c.clearRect(0, 0, r, l), c.drawImage(u, 0, 0, r, l), q.setIcon(d), window.clearTimeout(h), window.clearTimeout(y))
        }, E.start = function() {
            if (m && !p) {
                var e = function() {
                    g = w[0], p = !1, w.length > 0 && (w.shift(), E.start())
                };
                if (w.length > 0) {
                    p = !0;
                    var t = function() {
                        ["type", "animation", "bgColor", "textColor", "fontFamily", "fontStyle"].forEach(function(e) {
                            e in w[0].options && (i[e] = w[0].options[e])
                        }), C.run(w[0].options, function() {
                            e()
                        }, !1)
                    };
                    g ? C.run(g.options, function() {
                        t()
                    }, !0) : t()
                }
            }
        };
        var B = {},
            I = function(e) {
                return e.n = "number" == typeof e.n ? Math.abs(0 | e.n) : e.n, e.x = r * e.x, e.y = l * e.y, e.w = r * e.w, e.h = l * e.h, e.len = ("" + e.n).length, e
            };
        B.circle = function(e) {
            e = I(e);
            var t = !1;
            2 === e.len ? (e.x = e.x - .4 * e.w, e.w = 1.4 * e.w, t = !0) : e.len >= 3 && (e.x = e.x - .65 * e.w, e.w = 1.65 * e.w, t = !0), c.clearRect(0, 0, r, l), c.drawImage(u, 0, 0, r, l), c.beginPath(), c.font = i.fontStyle + " " + Math.floor(e.h * (e.n > 99 ? .85 : 1)) + "px " + i.fontFamily, c.textAlign = "center", t ? (c.moveTo(e.x + e.w / 2, e.y), c.lineTo(e.x + e.w - e.h / 2, e.y), c.quadraticCurveTo(e.x + e.w, e.y, e.x + e.w, e.y + e.h / 2), c.lineTo(e.x + e.w, e.y + e.h - e.h / 2), c.quadraticCurveTo(e.x + e.w, e.y + e.h, e.x + e.w - e.h / 2, e.y + e.h), c.lineTo(e.x + e.h / 2, e.y + e.h), c.quadraticCurveTo(e.x, e.y + e.h, e.x, e.y + e.h - e.h / 2), c.lineTo(e.x, e.y + e.h / 2), c.quadraticCurveTo(e.x, e.y, e.x + e.h / 2, e.y)) : c.arc(e.x + e.w / 2, e.y + e.h / 2, e.h / 2, 0, 2 * Math.PI), c.fillStyle = "rgba(" + i.bgColor.r + "," + i.bgColor.g + "," + i.bgColor.b + "," + e.o + ")", c.fill(), c.closePath(), c.beginPath(), c.stroke(), c.fillStyle = "rgba(" + i.textColor.r + "," + i.textColor.g + "," + i.textColor.b + "," + e.o + ")", "number" == typeof e.n && e.n > 999 ? c.fillText((e.n > 9999 ? 9 : Math.floor(e.n / 1e3)) + "k+", Math.floor(e.x + e.w / 2), Math.floor(e.y + e.h - .2 * e.h)) : c.fillText(e.n, Math.floor(e.x + e.w / 2), Math.floor(e.y + e.h - .15 * e.h)), c.closePath()
        }, B.rectangle = function(e) {
            e = I(e);
            var t = !1;
            2 === e.len ? (e.x = e.x - .4 * e.w, e.w = 1.4 * e.w, t = !0) : e.len >= 3 && (e.x = e.x - .65 * e.w, e.w = 1.65 * e.w, t = !0), c.clearRect(0, 0, r, l), c.drawImage(u, 0, 0, r, l), c.beginPath(), c.font = i.fontStyle + " " + Math.floor(e.h * (e.n > 99 ? .9 : 1)) + "px " + i.fontFamily, c.textAlign = "center", c.fillStyle = "rgba(" + i.bgColor.r + "," + i.bgColor.g + "," + i.bgColor.b + "," + e.o + ")", c.fillRect(e.x, e.y, e.w, e.h), c.fillStyle = "rgba(" + i.textColor.r + "," + i.textColor.g + "," + i.textColor.b + "," + e.o + ")", "number" == typeof e.n && e.n > 999 ? c.fillText((e.n > 9999 ? 9 : Math.floor(e.n / 1e3)) + "k+", Math.floor(e.x + e.w / 2), Math.floor(e.y + e.h - .2 * e.h)) : c.fillText(e.n, Math.floor(e.x + e.w / 2), Math.floor(e.y + e.h - .15 * e.h)), c.closePath()
        };
        var T = function(e, t) {
                t = ("string" == typeof t ? {
                    animation: t
                } : t) || {}, _ = function() {
                    try {
                        if ("number" == typeof e ? e > 0 : "" !== e) {
                            var n = {
                                type: "badge",
                                options: {
                                    n: e
                                }
                            };
                            if ("animation" in t && C.types["" + t.animation] && (n.options.animation = "" + t.animation), "type" in t && B["" + t.type] && (n.options.type = "" + t.type), ["bgColor", "textColor"].forEach(function(e) {
                                    e in t && (n.options[e] = a(t[e]))
                                }), ["fontStyle", "fontFamily"].forEach(function(e) {
                                    e in t && (n.options[e] = t[e])
                                }), w.push(n), w.length > 100) throw new Error("Too many badges requests in queue.");
                            E.start()
                        } else E.reset()
                    } catch (e) {
                        throw new Error("Error setting badge. Message: " + e.message)
                    }
                }, m && _()
            },
            M = function(e) {
                _ = function() {
                    try {
                        var t = e.width,
                            a = e.height,
                            n = document.createElement("img"),
                            s = a / l > t / r ? t / r : a / l;
                        n.setAttribute("crossOrigin", "anonymous"), n.onload = function() {
                            c.clearRect(0, 0, r, l), c.drawImage(n, 0, 0, r, l), q.setIcon(d)
                        }, n.setAttribute("src", e.getAttribute("src")), n.height = a / s, n.width = t / s
                    } catch (e) {
                        throw new Error("Error setting image. Message: " + e.message)
                    }
                }, m && _()
            },
            S = function(e) {
                _ = function() {
                    try {
                        if ("stop" === e) return f = !0, E.reset(), void(f = !1);
                        e.addEventListener("play", function() {
                            t(this)
                        }, !1)
                    } catch (e) {
                        throw new Error("Error setting video. Message: " + e.message)
                    }
                }, m && _()
            },
            L = function(e) {
                if (window.URL && window.URL.createObjectURL || (window.URL = window.URL || {}, window.URL.createObjectURL = function(e) {
                        return e
                    }), k.supported) {
                    var a = !1;
                    navigator.getUserMedia = navigator.getUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia, _ = function() {
                        try {
                            if ("stop" === e) return f = !0, E.reset(), void(f = !1);
                            a = document.createElement("video"), a.width = r, a.height = l, navigator.getUserMedia({
                                video: !0,
                                audio: !1
                            }, function(e) {
                                a.src = URL.createObjectURL(e), a.play(), t(a)
                            }, function() {})
                        } catch (e) {
                            throw new Error("Error setting webcam. Message: " + e.message)
                        }
                    }, m && _()
                }
            },
            q = {};
        q.getIcon = function() {
            var e = !1,
                t = function() {
                    for (var e = b.getElementsByTagName("head")[0].getElementsByTagName("link"), t = e.length, a = t - 1; a >= 0; a--)
                        if (/(^|\s)icon(\s|$)/i.test(e[a].getAttribute("rel"))) return e[a];
                    return !1
                };
            return i.element ? e = i.element : i.elementId ? (e = b.getElementById(i.elementId), e.setAttribute("href", e.getAttribute("src"))) : (e = t(), e === !1 && (e = b.createElement("link"), e.setAttribute("rel", "icon"), b.getElementsByTagName("head")[0].appendChild(e))), e.setAttribute("type", "image/png"), e
        }, q.setIcon = function(e) {
            var t = e.toDataURL("image/png");
            if (i.dataUrl && i.dataUrl(t), i.element) i.element.setAttribute("href", t), i.element.setAttribute("src", t);
            else if (i.elementId) {
                var a = b.getElementById(i.elementId);
                a.setAttribute("href", t), a.setAttribute("src", t)
            } else if (k.ff || k.opera) {
                var n = o;
                o = b.createElement("link"), k.opera && o.setAttribute("rel", "icon"), o.setAttribute("rel", "icon"), o.setAttribute("type", "image/png"), b.getElementsByTagName("head")[0].appendChild(o), o.setAttribute("href", t), n.parentNode && n.parentNode.removeChild(n)
            } else o.setAttribute("href", t)
        };
        var C = {};
        return C.duration = 40, C.types = {}, C.types.fade = [{
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: 0
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .1
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .2
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .3
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .4
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .5
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .6
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .7
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .8
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: .9
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: 1
        }], C.types.none = [{
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: 1
        }], C.types.pop = [{
            x: 1,
            y: 1,
            w: 0,
            h: 0,
            o: 1
        }, {
            x: .9,
            y: .9,
            w: .1,
            h: .1,
            o: 1
        }, {
            x: .8,
            y: .8,
            w: .2,
            h: .2,
            o: 1
        }, {
            x: .7,
            y: .7,
            w: .3,
            h: .3,
            o: 1
        }, {
            x: .6,
            y: .6,
            w: .4,
            h: .4,
            o: 1
        }, {
            x: .5,
            y: .5,
            w: .5,
            h: .5,
            o: 1
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: 1
        }], C.types.popFade = [{
            x: .75,
            y: .75,
            w: 0,
            h: 0,
            o: 0
        }, {
            x: .65,
            y: .65,
            w: .1,
            h: .1,
            o: .2
        }, {
            x: .6,
            y: .6,
            w: .2,
            h: .2,
            o: .4
        }, {
            x: .55,
            y: .55,
            w: .3,
            h: .3,
            o: .6
        }, {
            x: .5,
            y: .5,
            w: .4,
            h: .4,
            o: .8
        }, {
            x: .45,
            y: .45,
            w: .5,
            h: .5,
            o: .9
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: 1
        }], C.types.slide = [{
            x: .4,
            y: 1,
            w: .6,
            h: .6,
            o: 1
        }, {
            x: .4,
            y: .9,
            w: .6,
            h: .6,
            o: 1
        }, {
            x: .4,
            y: .9,
            w: .6,
            h: .6,
            o: 1
        }, {
            x: .4,
            y: .8,
            w: .6,
            h: .6,
            o: 1
        }, {
            x: .4,
            y: .7,
            w: .6,
            h: .6,
            o: 1
        }, {
            x: .4,
            y: .6,
            w: .6,
            h: .6,
            o: 1
        }, {
            x: .4,
            y: .5,
            w: .6,
            h: .6,
            o: 1
        }, {
            x: .4,
            y: .4,
            w: .6,
            h: .6,
            o: 1
        }], C.run = function(e, t, a, o) {
            var l = C.types[s() ? "none" : i.animation];
            return o = a === !0 ? "undefined" != typeof o ? o : l.length - 1 : "undefined" != typeof o ? o : 0, t = t ? t : function() {}, o < l.length && o >= 0 ? (B[i.type](n(e, l[o])), h = setTimeout(function() {
                a ? o -= 1 : o += 1, C.run(e, t, a, o)
            }, C.duration), void q.setIcon(d)) : void t()
        }, x(), {
            badge: T,
            video: S,
            image: M,
            webcam: L,
            reset: E.reset,
            browser: {
                supported: k.supported
            }
        }
    };
    "undefined" != typeof define && define.amd ? define([], function() {
        return e
    }) : "undefined" != typeof module && module.exports ? module.exports = e : this.Favico = e
}();