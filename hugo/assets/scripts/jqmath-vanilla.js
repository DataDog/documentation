/*  jscurry.js:  a JavaScript module for functional programming; requires ECMAScript 3.  These
    definitions are based on Haskell's, but allow side effects, and do not use automatic lazy
    evaluation, compile-time type checking, or automatic Currying.

    We believe that "member functions" are the wrong technique in general for implementing
    function closures or passing functions to polymorphic algorithms.

    Variable suffixes (in this and other modules):
        F:  function
        P ("Possible" or "Pointer"):  undefined and maybe null treated specially
        Q ("Question"):  value effectively converted to a boolean when used
        S:  string
        _:  a (usually non-constant) variable with a large scope
        $:  DOM element(s) or "wrapped set"

    These library modules aim to be small, efficient, compatible with standards, and hopefully
    elegant.  */

/*  Copyright 2016, Mathscribe, Inc.  Released under the MIT license (same as jQuery).
    See e.g. http://jquery.org/license for an explanation of this license.  */

"use strict";

var jsCurry = function () {
    var sliceMF = Array.prototype.slice;	// slice "Member Function"

    // provide a few basic ECMAScript 5 functions if they are missing:
    // Chrome < 7, FF < 4, Opera < 11.6, Safari < 5.1, IE < 9
    if (!Function.prototype.bind) Function.prototype.bind = function (thisArg /* , ... */) {
        var f = this, args0 = sliceMF.call(arguments, 1);
        return function (/* ... */) {
            return f.apply(thisArg, args0.concat(sliceMF.call(arguments, 0)));
        };
    };
    // Chrome < 5, FF < 4, Opera < 10.5, Safari < 5, IE < 9
    if (!Array.isArray) Array.isArray = function (x) {
        return typeof x == 'object' && x !== null &&
            Object.prototype.toString.call(x) === '[object Array]';
    };

    function F(x /* , ... */) {	// F() shorthand notation for some basic operations
        if (typeof x == 'function') return F.curry.apply(undefined, arguments);
        if (arguments.length == 2) {
            var y = arguments[1];
            if (typeof x == 'string') return y[x].bind(y);
            if (typeof y == 'function')
                return (typeof x == 'number' ? F.aritize : F.partial)(x, y);
        }
        arguments.length == 1 || F.err(err_F_1_);
        if (typeof x == 'number' || typeof x == 'string') return F.pToF(x);
        //if (x.nodeType == 1 /* Element */) // requires jQuery 1.4+; e.g. for widget ops
        //	return jQuery.data(x);
        if (x && typeof x == 'object') return F.aToF(x);
        F.err(err_F_2_);
    }

    F.err = function () { if (F.debug) debugger; throw Error('Assertion failed'); };
    // usually argument evaluation intentionally fails, to report its line number

    F.applyF = function (f, args) { return f.apply(undefined, args); }
    F.curry = function (f /* , ... */) { var g = f; arguments[0] = undefined; return g.bind.apply(g, arguments); };
    F._ = {};	// needed since e.g. (0 in [ , 3]) is apparently wrong in e.g. Firefox 3.0
    F.partial = function (a, f) {	// 'a' supplies some arguments to 'f'
        var n = a.length;
        return function (/* ... */) {
            var args = sliceMF.call(arguments, 0);
            for (var i = 0; i < n; i++)
                if (a[i] !== F._) args.splice(i, 0, a[i]);
                else if (args.length == i) args.push(undefined);
            return f.apply(this, args);
        };
    };
    F.o = function (/* ... */) {	// composition of 1 or more functions
        var fs = arguments;
        return function (/* ... */) {
            var n = fs.length, res = fs[--n].apply(undefined, arguments);
            while (n > 0) res = fs[--n](res);
            return res;
        };
    };
    F.oMap = function (f, g) // composition, using F.map(g, <arguments>)
    { return function (/* ... */) { return F.applyF(f, F.map(g, arguments)); }; };
    F.aritize = function (n, f) // for discarding optional trailing arguments
    { return function (/* ... */) { return F.applyF(f, sliceMF.call(arguments, 0, n)); }; };

    F.not = function (x) { return !x; };
    F.defOr = function (xP, y) { return xP !== undefined ? xP : y; };

    /*  The following functions that act on arrays also work on "array-like" objects (with a
        'length' property), including array-like host objects.  The functions may or may not
        skip missing elements.  */

    // A "cmp" function returns 0, < 0, or > 0 for ==, <, or > respectively.
    F.cmpX = function (x, y) { return x - y; };	// for finite numbers, or Dates
    F.cmpLex = function (cmpE, v, w) // "lexicographic order"; cmpE need not return a number
    {
        return F.any(function (e, i) { return i == w.length ? 1 : cmpE(e, w[i]); }, v) ||
            v.length - w.length;
    };
    F.eqTo = function (x, cmpP) {
        if (!cmpP) cmpP = function (y, z) { return y !== z; };
        return F.o(F.not, F(cmpP, x));
    };

    F.pToF = function (p) { return function (obj) { return obj[p]; }; };
    F.aToF = function (obj) { return function (p) { return obj[p]; }; };

    F.slice = function (a, startP, endP) {
        if (startP == null) startP = 0;
        if (Array.isArray(a)) return a.slice(startP, endP);
        var n = a.length;
        startP = startP < 0 ? Math.max(0, n + startP) : Math.min(n, startP);
        endP = endP === undefined ? n : endP < 0 ? Math.max(0, n + endP) : Math.min(n, endP);
        var res = [];
        while (startP < endP) res.push(a[startP++]);
        return res;
    };
    F.concatArgs = F.oMap(F('concat', []),
        function (a) { return Array.isArray(a) ? a : F.slice(a); });
    F.concatMap = function (f, a) { return F.applyF(F.concatArgs, F.map(f, a)); };

    F.findIndex = function (qF, a) {
        var n = a.length;
        for (var i = 0; i < n; i++) if (qF(a[i], i, a)) return i;
        return -1;
    };
    F.elemIndex = function (e, a, cmpP) {
        if (a.indexOf && !cmpP && Array.isArray(a)) return a.indexOf(e);
        return F.findIndex(F.eqTo(e, cmpP), a);
    };
    F.elem = function (e, a, cmpP) { return F.elemIndex(e, a, cmpP) != -1; };
    F.any = function (f, a) /* note result may be non-boolean */ {
        var n = a.length, y = false /* in case n == 0 */;
        for (var i = 0; i < n; i++) {
            y = f(a[i], i, a);
            if (y) return y;
        }
        return y;
    };
    F.iter = function (f, a /* , ... */) {
        if (arguments.length == 2) {	// for speed
            if (a.forEach && Array.isArray(a)) return a.forEach(f);
            var n = a.length;
            for (var i = 0; i < n; i++) f(a[i], i, a);
        } else {
            arguments.length > 2 || F.err(err_iter_);
            var args = sliceMF.call(arguments, 1),
                n = F.applyF(Math.min, F.map(F('length'), args));
            for (var i = 0; i < n; i++) F.applyF(f, F.map(F(i), args).concat(i, args));
        }
    };
    F.map = function (f, a) {
        if (a.map && Array.isArray(a)) return a.map(f);
        var n = a.length, res = new Array(n);
        for (var i = 0; i < n; i++) res[i] = f(a[i], i, a);
        return res;
    };

    F.sum = function (a) {
        var n = a.length, res = 0;
        for (var i = 0; i < n; i++) res += a[i];
        return res;
    };

    return F;
}();
var F; if (F === undefined) F = jsCurry;
//if (typeof module == 'object') module.exports = jsCurry;


/*  jqmath.js:  a JavaScript module for symbolic expressions, e.g. formatted mathematical
    formulas.  This file uses charset UTF-8, and requires jsCurry, and jqmath.css.
    By default, we use Presentation MathML when available, else simple HTML and CSS.
    Expressions may be constructed programmatically, or using a simple TeX-like syntax.
 
    To use symbolic expressions in a web page or problem domain, one must choose a set of
    symbols, ensure they can be viewed by users, and specify precedences for the operator
    symbols.  We use Unicode character numbers for encoding, and fonts for display.  Normally
    standard characters and fonts suffice, but "private use" character numbers and custom fonts
    can be used when necessary.  By default, this module currently uses standard MathML 3
    precedences for operator symbols, except we omit "multiple character operator"s like && or
    <=, and choose a single precedence for each of |, ^, and _.
 
    The algorithm to detect MathML only works after some document.body is defined and available.
    Thus it should probably not be used during document loading.
 
    See http://mathscribe.com/author/jqmath.html for usage documentation and examples, and
    jscurry.js for some coding conventions and goals.  */

/*  Copyright 2017, Mathscribe, Inc.  Released under the MIT license (same as jQuery).
    See e.g. http://jquery.org/license for an explanation of this license.  */

var jqMath = function () {
    var F = jsCurry;

    // Chrome < 38, FF < 25, Opera < 25, Safari < 9, IE6-11
    if (!Math.sign) Math.sign = function (x) {
        x = Number(x);
        return x > 0 ? 1 : x < 0 ? -1 : x /* +0, -0, or NaN */;
    };
    // Chrome < 38, FF < 25, Opera < 25, Safari < 9, IE6-11
    if (!Math.trunc) Math.trunc = function (x) {
        return (x < 0 ? Math.ceil : Math.floor)(x);
    };

    function M(x, y, z) /* any number of arguments */ {
        if (typeof x == 'number') x = String(x);	// e.g. for small integers
        if (typeof x == 'string' || Array.isArray(x)) return M.sToMathE(x, y, z);
        if (x.nodeType == 1 /* Element */ && x.tagName.toLowerCase() == 'math')
            return M.eToMathE(x);
        F.err(err_M_);
    }

    M.getSpecAttrP = function (e, attrName) {
        var attrP = e.getAttributeNode(attrName);
        return attrP && /* for IE6-7: */ attrP.specified !== false ? attrP.value : undefined;
    };
    M.objToAttrs = function (obj) {
        var res = [];
        for (var p in obj) res.push({ name: p, value: obj[p] });
        return res;
    };
    M.setAttrs = function (e, attrsP) /* uses attr.name/value/[specified for IE6-7] */ {
        if (attrsP && attrsP.length == null) attrsP = M.objToAttrs(attrsP);

        F.iter(function (attr) {
            if (attr.specified !== false /* for IE6-7 */)
                e.setAttribute(attr.name, attr.value);
        }, attrsP || []);
        return e;
    };

    M.addClass = function (e, ws) {
        // $(e).addClass(ws) doesn't seem to work for XML elements
        if (typeof e.className != 'undefined') {	// needed for old IE, works for non-XML
            var classes = e.className;
            e.className = (classes ? classes + ' ' : '') + ws;
        } else {	// needed for XML, would work for non-IE
            var classes = e.getAttribute('class');
            e.setAttribute('class', (classes ? classes + ' ' : '') + ws);
        }
        return e;
    };
    M.eToClassesS = function (e) {
        var sP = typeof e.className != 'undefined' ? e.className : e.getAttribute('class');
        return sP || '';
    };
    M.hasClass = function (e, w) {	// works for HTML or XML elements, unlike jQuery e.g. 1.4.3
        return (' ' + M.eToClassesS(e) + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + w + ' ') != -1;
        // we replace /[\n\t]/g to be consistent with jQuery
    };

    M.mathmlNS = "http://www.w3.org/1998/Math/MathML";	// MathML namespace

    function appendMeArgs(e, args /* null/undefined, string, node, or array-like of nodes incl.
                live NodeList */, attrsP) {
        if (args == null) { }
        else if (typeof args == 'string')
            e.appendChild(e.ownerDocument.createTextNode(args));
        else if (args.nodeType) e.appendChild(args);
        else {
            if (args.constructor != Array) args = F.slice(args);	// for live NodeList
            F.iter(function (x) { e.appendChild(x); }, args);
        }
        return M.setAttrs(e, attrsP);
    }

    var fixMathMLQ_ = false;
    (function () {	// M.webkitVersion, M.operaVersion, M.msieVersion, M.mozillaVersion
        var ua = navigator.userAgent.toLowerCase(), match = ua.match(/webkit[ \/](\d+)\.(\d+)/);
        if (match) {
            M.webkitVersion = [Number(match[1]), Number(match[2])];
            fixMathMLQ_ = M.webkitVersion[0] <= 540 /*@@*/;
        } else {
            match = ua.match(/(opera)(?:.*version)?[ \/]([\w.]+)/) ||
                ua.match(/(msie) ([\w.]+)/) ||
                ua.indexOf("compatible") < 0 && ua.match(/(mozilla)(?:.*? rv:([\w.]+))?/);
            if (match) M[match[1] + 'Version'] = match[2] || "0";
        }
    })();
    if (M.msieVersion)
        document.write(
            '<object id=MathPlayer classid="clsid:32F66A20-7614-11D4-BD11-00104BD3F987">',
            '</object><?IMPORT namespace="m" implementation="#MathPlayer" ?>');
    // M.MathPlayer controls whether the IE plugin MathPlayer can be used.
    function checkMathMLAttrs(e) {
        if (M.MathML && !fixMathMLQ_) return e;

        var tagName = e.tagName.toLowerCase(), doc = e.ownerDocument;
        function new1(k) { return doc.createElementNS(M.mathmlNS, k); }
        if (tagName == 'mi') {
            if (!e.getAttribute('mathvariant') && e.firstChild
                && e.firstChild.nodeType == 3 /* Text */)
                e.setAttribute('mathvariant',
                    e.firstChild.data.length == 1 ? 'italic' : 'normal');
        } else if (tagName == 'mo') {
            if (e.childNodes.length == 1 && e.firstChild.nodeType == 3 /* Text */) {
                var s = e.firstChild.data;
                if (/^[\u2061-\u2064]$/.test(s)) M.addClass(e, 'ma-non-marking');
                /*@@ move parse_mxP_tokP fm- operator spacing here!? */
            }
        } else if (tagName == 'mspace') {	//@@ combine with M.newMe 'mspace' clause
            if (M.webkitVersion && M.MathML) {
                e.style.display = 'inline-block';
                e.style.minWidth = e.getAttribute('width') || '0px';
            }
        } else if (tagName == 'menclose') {
            if (M.webkitVersion && M.MathML) M.addClass(e, 'fm-menclose');
        } else if (tagName == 'mmultiscripts') {
            if (M.webkitVersion) {
                var a = F.slice(e.childNodes);	// partly because e.childNodes is dynamic
                if (a.length == 0) throw 'Wrong number of <mmultiscripts> arguments: 0';
                var rowA = [a[0]];
                for (var i = 1; i < a.length; i++) {
                    if (a[i].tagName == 'mprescripts') {
                        rowA.unshift(new1('none'));
                        continue;
                    }
                    if (i + 1 == a.length) throw 'Missing argument in <mmultiscripts>';
                    var a3 = [rowA[0], a[i], a[i + 1]];
                    i++;
                    rowA[0] = new1('msubsup');
                    F.iter(function (arg) { rowA[0].appendChild(arg); }, a3);
                }
                var oldE = e;
                e = appendMeArgs(new1('mrow'), rowA, e.attributes);
                if (oldE.parentNode) oldE.parentNode.replaceChild(e, oldE);
            }
        }

        var colorOpt = e.getAttribute('mathcolor'), hrefOpt = e.getAttribute('href');
        if (colorOpt && e.style) e.style.color = colorOpt;
        if (hrefOpt && (!M.MathML || M.webkitVersion)) {
            var aE = doc.createElement('A'), parentP = e.parentNode, nextP = e.nextSibling;
            aE.appendChild(e);
            aE.href = hrefOpt;
            e = aE;
            if (parentP) parentP.insertBefore(e, nextP);
        }
        return e;
    }
    function newMeNS(tagName, argsP /* for appendMeArgs() */, attrsP, doc)
                /* tries to use the MathML namespace, perhaps with prefix 'm' */ {
        if (!doc) doc = document;

        var e = M.MathPlayer ? doc.createElement('m:' + tagName) :
            doc.createElementNS(M.mathmlNS, tagName);
        return checkMathMLAttrs(appendMeArgs(e, argsP, attrsP));
    }
    // M.MathML controls whether MathML is used.
    (function () {
        if (self.location) {
            var match = location.search.match(/[?&;]mathml=(?:(off|false)|(on|true))\b/i);
            if (match) M.MathML = !match[1];
            else if (M.webkitVersion && F.cmpLex(F.cmpX, M.webkitVersion, [537, 17]) < 0
                || M.operaVersion)
                M.MathML = false;
        }
    })();
    M.canMathML = function () /* requires document.body */ {
        if (M.msieVersion && !M.MathPlayer)
            try {
                new ActiveXObject("MathPlayer.Factory.1");
                if (M.MathPlayer == null) M.MathPlayer = true;
                else if (!M.MathPlayer) return false;	// for Carlisle's MathPlayer 3
            } catch (exc) {
                M.MathPlayer = false;
            }
        if (!M.MathPlayer && typeof document.createElementNS == 'undefined') return false;

        var e1 = newMeNS('math', newMeNS('mn', '1')),
            e2 = newMeNS('math', newMeNS('mfrac', [newMeNS('mn', '1'), newMeNS('mn', '2')])),
            es$ = document.createElement('div');
        // e1.style is set to null in Chrome 25-44 (no MathML support)
        if (typeof e1.style === 'undefined' || e1.style === null) return false;
        e1.setAttribute('display', 'block');
        e2.setAttribute('display', 'block');
        e1.style.visibility = e2.style.visibility = 'hidden';
        es$.appendChild(e1);
        es$.appendChild(e2);
        document.body.appendChild(es$);
        // Could use .bottom-.top instead of .height, but IE6-8 don't get this far anyway
        var res = e2.getBoundingClientRect().height > e1.getBoundingClientRect().height + 2;
        document.body.removeChild(es$);
        return res;
    };

    // fmUp is mid-x to outer top, fmDn is mid-x to outer bottom, both approx. & in parent ems
    function checkVertStretch(up, dn, g, doP) /* non-MathML */ {
        if (g.nodeName.toLowerCase() == 'mo' && g.childNodes.length == 1) {
            var c = g.firstChild, s = c.data;
            if (c.nodeType == 3 /* Text */ && (up > 0.9 || dn > 0.9)
                && (M.prefix_[s] < 25 || M.postfix_[s] < 25
                    || '|\u2016\u221A' /* ‖ &radic; */.indexOf(s) != -1 || doP)) {
                var r = (up + dn) / 1.2, radicQ = s == '\u221A',
                    v = (radicQ ? 0.26 : 0.35) + ((radicQ ? 0.15 : 0.25) - dn) / r;
                g.style.fontSize = r.toFixed(3) + 'em';
                g.style.verticalAlign = v.toFixed(3) + 'em';
                g.fmUp = up;
                g.fmDn = dn;
                g.style.display = 'inline-block';
                g.style.transform = g.style.msTransform = g.style.MozTransform =
                    g.style.WebkitTransform = 'scaleX(0.5)';
            }
        }
    }
    function vertAlignE$(up, dn, fmVert) /* non-MathML */ {
        var e$ = document.createElement('span');
        e$.appendChild(fmVert);
        //JQuery: var e$ = $('<span/>').append(fmVert);
        e$.fmUp = up;
        e$.fmDn = dn;
        e$.style.verticalAlign = (0.5 * (up - dn)).toFixed(3) + 'em';
        return e$;
    }
    M.mtagName = function (e) /* returns 'fmath' for non-MathML 'math' */ {
        if (e.tagName == 'A' && e.childNodes.length == 1) e = e.firstChild;
        return e.getAttribute('mtagname') || e.tagName.toLowerCase().replace(/^m:/, '');
    };
    M.mchilds = function (e) {
        if (e.tagName == 'A' && e.childNodes.length == 1) e = e.firstChild;
        var mSP = e.getAttribute('mtagname');
        while (e.tagName == 'SPAN') e = e.firstChild;
        function span0(g) { g.tagName == 'SPAN' || F.err(err_span0_); return g.firstChild; }
        if (e.tagName == 'TABLE') {
            e = e.firstChild;
            e.tagName == 'TBODY' || F.err(err_mchilds_tbody_);
            if (mSP == 'mtable') return e.childNodes;
            var a = e.childNodes;	// <tr>s for mfrac munder mover munderover
            if (mSP == 'mover') a = [a[1], a[0]];
            else if (mSP == 'munderover') a = [a[1], a[2], a[0]];
            return F.map(function (tr) { return tr.firstChild.firstChild; }, a);
        } else if (e.tagName == 'MROW' && mSP) {
            var a = e.childNodes;
            if (mSP == 'msqrt') return [span0(span0(a[1]))];
            if (mSP == 'mroot') return [span0(span0(a[2])), span0(a[0])];
            mSP == 'mmultiscripts' || F.err(err_mchilds_mrow_);
            var nPrescripts = Number(e.getAttribute('nprescripts'));
            0 <= nPrescripts && nPrescripts < a.length && nPrescripts % 2 == 0 ||
                F.err(err_mchilds_mmultiscripts_);
            var res = [a[nPrescripts]];
            for (var i = nPrescripts + 1; i < a.length; i++) res.push(span0(a[i]));
            if (nPrescripts) {
                res.push(e.ownerDocument.createElement('mprescripts'));
                for (var i = 0; i < nPrescripts; i++) res.push(span0(a[i]));
            }
            return res;
        } else if (F.elem(e.tagName, ['MSUB', 'MSUP', 'MSUBSUP']))
            return F.map(function (c, i) { return i ? span0(c) : c; }, e.childNodes);
        else if (e.tagName == 'MSPACE') return [];
        else return e.childNodes;
    };
    var mtokens_ = ['mn', 'mi', 'mo', 'mtext', 'mspace', 'ms'],
        impMRows_ =
            ['fmath', 'msqrt', 'mtd', 'mstyle', 'merror', 'mpadded', 'mphantom', 'menclose'],
        accentDsByS_ = {	// top and bottom space in ems
            '\xAF' /* ¯ macron */: [0, 0.85], '\u203E' /* ‾ overline */: [0, 0.85],
            '\u02D9' /* ˙ dot above */: [0, 0.75], '\u02C7' /* ˇ caron */: [0, 0.7],
            '^': [0, 0.5], '~': [0, 0.4], '\u2192' /* → rightwards arrow */: [0.25, 0.25],
            '_': [0.7, 0],
            // not accents in MathML 3 operator dictionary:
            '\u2212' /* − */: [0.25, 0.45], '.': [0.6, 0.1]
        };
    M.newMe = function (tagName, argsP /* for appendMeArgs() */, attrsP, docP) {
        if (!docP) {
            if (attrsP && attrsP.nodeType == 9 /* Document */) {
                docP = attrsP;
                attrsP = undefined;
            } else docP = document;
        }
        M.MathML != null || F.err(err_newMe_MathML_);

        if (M.MathML) return newMeNS(tagName, argsP, attrsP, docP);

        if (tagName == 'math') tagName = 'fmath';
        var e$ = appendMeArgs(docP.createElement(tagName.toUpperCase()), argsP),
            a = F.slice(e$.childNodes);	// partly because e$.childNodes is dynamic
        if (F.elem(tagName, impMRows_) && a.length != 1) {
            a = [M.newMe('mrow', a, undefined, docP)];
            e$.childNodes.length == 0 || F.err(err_newMe_imp_mrow_);
            e$.appendChild(a[0]);
        }
        var ups = F.map(function (g) { return Number(g.fmUp || 0.6); }, a),
            dns = F.map(function (g) { return Number(g.fmDn || 0.6); }, a);

        if (tagName == 'fmath' || tagName == 'mn' || tagName == 'mtext'
            || tagName == 'mprescripts' || tagName == 'none') {
        } else if (tagName == 'mstyle' || tagName == 'merror' || tagName == 'mpadded'
            || tagName == 'mphantom' || tagName == 'menclose') {
            if (a[0].fmUp) e$.fmUp = a[0].fmUp;
            if (a[0].fmDn) e$.fmDn = a[0].fmDn;
        } else if (tagName == 'mi') {
            var c = a.length == 1 ? a[0] : {};
            if (c.nodeType == 3 /* Text */ && c.data.length == 1) {
                M.addClass(e$, 'fm-mi-length-1');
                if (c.data == 'f') e$.style.paddingRight = '0.44ex';
                // e.g. on a Mac, unnec. on netrenderer.com 12/20/16
            }
        } else if (tagName == 'mo') {
            var c = a.length == 1 ? a[0] : {};
            if (c.nodeType == 3 /* Text */ && /[\]|([{‖)}]/.test(c.data))
                M.addClass(e$, 'fm-mo-Luc');
        } else if (tagName == 'mspace') {
            var e = M.setAttrs(e$, attrsP);
            attrsP = undefined;
            e.style.marginRight = e.getAttribute('width') || '0px';	// may be negative
            e.style.paddingRight = '0.001em';	// Firefox work-around
            e$.innerHTML = '\u200C' /* &zwnj; */;	// for Safari/Chrome
            e$.style.visibility = 'hidden';	// e.g. for iPad Mobile Safari 4.0.4
        } else if (tagName == 'mrow') {
            var up = F.applyF(Math.max, ups), dn = F.applyF(Math.max, dns);
            if (up > 0.65 || dn > 0.65) {
                e$.fmUp = up;
                e$.fmDn = dn;
                F.iter(F([up, dn, F._, undefined], checkVertStretch), a);
            }
        } else if (tagName == 'mfrac') {
            if (a.length != 2) throw 'Wrong number of <mfrac> arguments: ' + a.length;
            var num$ = docP.createElement('td'), den$ = docP.createElement('td');
            num$.className = 'fm-num-frac fm-inline';
            num$.appendChild(a[0]);
            den$.className = 'fm-den-frac fm-inline';
            den$.appendChild(a[1]);
            //JQuery: num$ = $('<td class="fm-num-frac fm-inline"></td>', docP).append(a[0]),
            //JQuery: den$ = $('<td class="fm-den-frac fm-inline"></td>', docP).append(a[1]);
            var tr1$ = docP.createElement('tr'), tr2$ = docP.createElement('tr'),
                tbody$ = docP.createElement('tbody'), table$ = docP.createElement('table'),
                span$ = docP.createElement('span');
            tr1$.appendChild(den$);
            tr2$.appendChild(num$);
            tbody$.appendChild(tr2$);
            tbody$.appendChild(tr1$);
            table$.appendChild(tbody$);
            span$.appendChild(table$);
            span$.className = 'fm-vert fm-frac';
            e$ = vertAlignE$(ups[0] + dns[0] + 0.03, ups[1] + dns[1] + 0.03, span$);
            //JQuery: e$ = vertAlignE$(ups[0] + dns[0] + 0.03, ups[1] + dns[1] + 0.03,
            //	$('<span class="fm-vert fm-frac"></span>', docP).
            // <span> partly for IE6-7, see www.quirksmode.org/css/display.html
            //		append($('<table/>', docP).
            //			append($('<tbody/>', docP).
            //				append($('<tr/>', docP).append(num$)).
            //				append($('<tr/>', docP).append(den$))))).
            //	attr('mtagname', tagName);
            e$.setAttribute('mtagname', tagName);
        } else if (tagName == 'msqrt' || tagName == 'mroot') {
            if (a.length != (tagName == 'msqrt' ? 1 : 2))
                throw 'Wrong number of <' + tagName + '> arguments: ' + a.length;
            e$ = docP.createElement('mrow');
            e$.setAttribute('mtagname', tagName);
            //JQuery: e$ = $('<mrow/>', docP).attr('mtagname', tagName);
            var t = 0.06 * (ups[0] + dns[0]), up = ups[0] + t + 0.1, dn = dns[0];
            if (tagName == 'mroot') {
                var ht = 0.6 * (ups[1] + dns[1]), d = 0.25 / 0.6 - 0.25;
                if (up > ht) d += up / 0.6 - ups[1];
                else {
                    d += dns[1];
                    up = ht;
                }
                var span$ = docP.createElement('span');
                span$.className = 'fm-root fm-inline';
                span$.appendChild(a[1]);
                span$.style.verticalAlign = d.toFixed(2) + 'em';
                e$.appendChild(span$);
                //JQuery: e$.append($('<span class="fm-root fm-inline"></span>', docP).append(a[1]).
                //		css('verticalAlign', d.toFixed(2)+'em'));
            }
            var mo$ = docP.createElement('mo'), span$ = docP.createElement('span'), y$;
            mo$.innerHTML = '\u221A' /* &radic; */;
            mo$.className = 'fm-radic';
            //JQuery: $('<mo/>', docP).addClass('fm-radic').append('\u221A' /* &radic; */),
            // IE8 doesn't like $('<mo class="fm-radic"></mo>').append(...)
            //JQuery: $('<span class="fm-vert fm-radicand"></span>', docP).append(a[0]).css('borderTopWidth', t.toFixed(3)+'em'));
            span$.appendChild(a[0]);
            span$.className = 'fm-vert fm-radicand';
            span$.style.borderTopWidth = t.toFixed(3) + 'em';
            y$ = vertAlignE$(up, dn, span$);
            checkVertStretch(up, dn, mo$);
            e$.appendChild(mo$);
            e$.appendChild(y$);
            e$.fmUp = up;
            e$.fmDn = dn;
        } else if (tagName == 'msub' || tagName == 'msup' || tagName == 'msubsup'
            || tagName == 'mmultiscripts') {
            if (tagName != 'mmultiscripts' && a.length != (tagName == 'msubsup' ? 3 : 2))
                throw 'Wrong number of <' + tagName + '> arguments: ' + a.length;
            var up = ups[0], dn = dns[0], oddQ = tagName == 'msup',
                dUp = up / 0.71 - 0.6, dDn = dn / 0.71 - 0.6;
            for (var i = 1; i < a.length; i++) {
                if (tagName == 'mmultiscripts') {
                    var w = M.mtagName(a[i]);
                    if (w == 'none') continue;
                    if (w == 'mprescripts') {
                        if (oddQ) throw 'Repeated "mprescripts"';
                        oddQ = true;
                        continue;
                    }
                }
                if (i % 2 == (oddQ ? 0 : 1)) dDn = Math.max(dDn, ups[i]);
                else dUp = Math.max(dUp, dns[i]);
            }
            var preAP = undefined, postA = [], nPrescripts = 0;
            for (var i = 1; i < a.length; i++) {
                if (tagName == 'mmultiscripts') {
                    var w = M.mtagName(a[i]);
                    if (w == 'mprescripts') {
                        preAP = [];
                        nPrescripts = a.length - i - 1;
                        continue;
                    }
                }
                var d = 0.25 / 0.71 - 0.25;
                if (i % 2 == (preAP ? 0 : 1) && tagName != 'msup') {
                    d -= dDn;
                    dn = Math.max(dn, 0.71 * (dDn + dns[i]));
                } else {
                    d += dUp;
                    up = Math.max(up, 0.71 * (dUp + ups[i]));
                }
                var span$ = document.createElement('span');
                span$.className = 'fm-script fm-inline';
                a[i].parentNode.insertBefore(span$, a[i]);
                span$.appendChild(a[i]);
                span$.style.verticalAlign = d.toFixed(2) + 'em';
                //JQuery: $(a[i]).wrap('<span class="fm-script fm-inline"></span>').parent().
                //	css('verticalAlign', d.toFixed(2)+'em');
                if (M.msieVersion && (document.documentMode || M.msieVersion) < 8)
                    a[i].style.zoom = 1;	// to set hasLayout
                if (tagName == 'mmultiscripts') (preAP || postA).push(a[i].parentNode);
            }
            if (tagName == 'mmultiscripts') {
                e$ = document.createElement('mrow');
                var ap = (preAP || []).concat(a[0], postA);
                for (var i = 0; i < ap.length; i++)
                    e$.appendChild(ap[i]);
                e$.setAttribute('mtagname', 'mmultiscripts');
                e$.setAttribute('nprescripts', 'nPrescripts');
                //JQuery: e$ = $('<mrow/>').	// $('<mrow mtagname="mmultiscripts"></mrow>') fails in IE8
                //	append($((preAP || []).concat(a[0], postA))).
                //	attr({ mtagname: 'mmultiscripts', nprescripts: nPrescripts });
            }
            e$.fmUp = up;
            e$.fmDn = dn;
        } else if (tagName == 'munder' || tagName == 'mover' || tagName == 'munderover') {
            if (a.length != (tagName == 'munderover' ? 3 : 2))
                throw 'Wrong number of <' + tagName + '> arguments: ' + a.length;
            var tbody$ = docP.createElement('tbody'), td$, up = 0.85 * ups[0], dn = 0.85 * dns[0];
            if (tagName != 'munder') {
                var overE = a[a.length - 1], accentDsP = undefined;
                td$ = docP.createElement('td');
                td$.appendChild(overE);
                //JQuery: td$ = $('<td/>', docP).append(overE);
                if (overE.nodeName == 'MO' && overE.childNodes.length == 1) {
                    var c = overE.firstChild;
                    if (c.nodeType == 3 /* Text */) accentDsP = accentDsByS_[c.data];
                }
                if (accentDsP) {
                    overE.style.display = 'block';
                    overE.style.marginTop = (- accentDsP[0]).toFixed(2) + 'em';
                    overE.style.marginBottom = (- accentDsP[1]).toFixed(2) + 'em';
                    up += 1.2 - F.sum(accentDsP);
                } else {
                    td$.className = 'fm-script fm-inline';
                    up += 0.71 * (ups[a.length - 1] + dns[a.length - 1]);
                }
                var tr$ = docP.createElement('tr');
                tr$.appendChild(td$);
                tbody$.appendChild(tr$);
                //JQuery: tbody$.append($('<tr/>', docP).append(td$));
            }
            if (a[0].nodeName == 'MI' && a[0].childNodes.length == 1) {
                var c = a[0].firstChild, s = c.data;
                if (c.nodeType == 3 /* Text */ && s.length == 1) {
                    var d = 'acegmnopqrsuvwxyz'.indexOf(s) != -1 ? 0.25 : s == 't' ? 0.15 : 0;
                    if (d) {
                        a[0].style.display = 'block';
                        a[0].style.marginTop = (- d).toFixed(2) + 'em';
                        up -= d;
                    }
                }
            }
            td$ = docP.createElement('td');
            td$.appendChild(a[0]);
            td$.className = 'fm-underover-base';
            //JQuery: td$ = $('<td class="fm-underover-base"></td>', docP).append(a[0]);
            var tr$ = docP.createElement('tr');
            tr$.appendChild(td$);
            tbody$.appendChild(tr$);
            //JQuery: tbody$.append($('<tr/>', docP).append(td$));
            if (tagName != 'mover') {
                td$ = docP.createElement('td');
                td$.appendChild(a[1]);
                td$.className = 'fm-script fm-inline';
                //JQuery: td$ = $('<td class="fm-script fm-inline"></td>', docP).append(a[1]);
                var tr$ = docP.createElement('tr');
                tr$.appendChild(td$);
                tbody$.appendChild(tr$);
                //JQuery: tbody$.append($('<tr/>', docP).append(td$));
                dn += 0.71 * (ups[1] + dns[1]);
            }
            var span$ = docP.createElement('span'), table$ = docP.createElement('table');
            span$.className = 'fm-vert';
            table$.appendChild(tbody$);
            span$.appendChild(table$);
            e$ = vertAlignE$(up, dn, span$);
            e$.setAttribute('mtagname', tagName);
            //JQuery: e$ = vertAlignE$(up, dn, $('<span class="fm-vert"></span>', docP).
            //		append($('<table/>', docP).append(tbody$))).
            //	attr('mtagname', tagName);
        } else if (tagName == 'mtable') {
            var tbody$ = docP.createElement('tbody');
            for (var i = 0; i < a.length; i++)
                tbody$.appendChild(a[i]);
            //JQuery: var tbody$ = $('<tbody/>', docP).append($(a));
            e$ = docP.createElement('span');
            e$.className = 'fm-vert';
            e$.setAttribute('mtagname', 'mtable');
            var table$ = docP.createElement('table');
            table$.appendChild(tbody$);
            e$.appendChild(table$);
            //JQuery: e$ = $('<span class="fm-vert" mtagname="mtable"></span>', docP)
            //	.append($('<table/>', docP).append(tbody$));
            var r = F.sum(ups) + F.sum(dns);
            e$.fmUp = e$.fmDn = 0.5 * r;	// binomScan() may modify
        } else if (tagName == 'mtr') {
            e$ = docP.createElement('tr');
            for (var i = 0; i < a.length; i++)
                e$.appendChild(a[i]);
            e$.className = 'fm-mtr';
            e$.setAttribute('mtagname', 'mtr');
            //JQuery: e$ = $('<tr class="fm-mtr" mtagname="mtr"></tr>', docP).append($(a));
            var up = 0.6, dn = 0.6;
            F.iter(function (e, i) {
                if ((e.getAttribute(M.MathML ? 'rowspan' : 'rowSpan') || 1) == 1) {
                    up = Math.max(up, ups[i]);
                    dn = Math.max(dn, dns[i]);
                }
            }, a);
            e$.fmUp = up + 0.25;
            e$.fmDn = dn + 0.25;
        } else if (tagName == 'mtd') {	// return <td> partly so rowspan/colspan work
            e$ = docP.createElement('td');
            for (var i = 0; i < a.length; i++)
                e$.appendChild(a[i]);
            e$.className = 'fm-mtd';
            e$.setAttribute('mtagname', 'mtd');
            //JQuery: e$ = $('<td class="fm-mtd" mtagname="mtd"></td>', docP).append($(a));
            if (ups[0] > 0.65) e$.fmUp = ups[0];
            if (dns[0] > 0.65) e$.fmDn = dns[0];
            var e = M.setAttrs(e$, attrsP);
            attrsP = undefined;
            var rowspan = e.getAttribute('rowspan'), colspan = e.getAttribute('columnspan');
            if (rowspan) {
                e.setAttribute('rowSpan', rowspan);	// for IE6-7
                if (!M.hasClass(e, 'middle')) M.addClass(e, 'middle');
            }
            if (colspan) e.setAttribute('colSpan', colspan);
        } else if (tagName == 'mfenced') {
            var e = M.setAttrs(e$, attrsP);
            return M.newMe('mrow', M.mfencedToMRowArgs(e), attrsP, docP);
        } else throw 'Unrecognized or unimplemented MathML tagName: ' + tagName;

        return checkMathMLAttrs(M.setAttrs(e$, attrsP));
    };
    M.mfencedToMRowArgs = function (e) {
        e.tagName.toLowerCase() == 'mfenced' || F.err(err_mfencedToMRowArgs_);
        var doc = e.ownerDocument;
        function newMo(s) { return M.newMe('mo', s, undefined, doc); }
        var res = [newMo(F.defOr(M.getSpecAttrP(e, 'open'), '(')),
        newMo(F.defOr(M.getSpecAttrP(e, 'close'), ')'))],
            es = F.slice(e.childNodes);
        if (es.length == 0) return res;
        var inner;
        if (es.length == 1) inner = es[0];
        else {
            var sepsP = F.defOr(M.getSpecAttrP(e, 'separators'), ',').match(/\S/g),
                n = sepsP ? es.length - 1 : 0;
            for (var i = 0; i < n; i++)
                es.splice(2 * i + 1, 0, newMo(sepsP[Math.min(i, sepsP.length - 1)]));
            inner = M.newMe('mrow', es, undefined, doc);
        }
        res.splice(1, 0, inner);
        return res;
    };
    M.spaceMe = function (widthS, docP) /* incl. avoid bad font support for \u2009 &thinsp; */
            /* E.g. in Firefox 3.6.12, the DOM/jQuery don't like '' as a <mi>/<mo>/<mtext> child,
                and also padding doesn't seem to work on e.g. <mn>/<mrow>/<mspace> elements;
                also any kind of unicode space inside an <mo> might be stripped by the browser: */ { return M.newMe('mspace', undefined, { width: widthS }, docP); };
    M.fenceMe = function (me1, leftP, rightP, docP) {
        return M.newMe('mrow',
            [M.newMe('mo', F.defOr(leftP, '('), docP), me1,
            M.newMe('mo', F.defOr(rightP, ')'), docP)],
            docP);
    };
    F.iter(function (tagName) { M[tagName] = F(M.newMe, tagName); },
        ['mn', 'mi', 'mo', 'mtext', 'mspace', 'mrow', 'mfenced', 'mfrac', 'msqrt', 'mroot',
            'msub', 'msup', 'msubsup', 'mmultiscripts', 'mprescripts', 'none',
            'munder', 'mover', 'munderover', 'mtable', 'mtr', 'mtd',
            'mstyle', 'merror', 'mpadded', 'mphantom', 'menclose']);
    M.setMathBlockQ = function (e, blockQ) {
        if (blockQ) {
            e.setAttribute('display', 'block');
            M.addClass(e, 'ma-block');
        } else if (!M.MathML) M.addClass(e, 'fm-inline');
        return e;
    };
    M.math = function (argsP /* for appendMeArgs() */, blockQ, docP) { return M.setMathBlockQ(M.newMe('math', argsP, docP), blockQ); };

    M.eToMathE = function (mathE) /* 'mathE' has been parsed from MathML syntax */ {
        if (M.MathML == null || mathE.tagName.toLowerCase() != 'math') F.err(err_eToMathE_);
        function fixMathMLDeep(nod) {
            if (nod.nodeType != 1 /* Element */) return nod;
            if (!F.elem(nod.tagName, mtokens_)) F.iter(fixMathMLDeep, nod.childNodes);
            return checkMathMLAttrs(nod);
        }
        if (M.MathML && mathE.tagName == 'math')
            return fixMathMLQ_ ? fixMathMLDeep(mathE) : mathE;
        var doc = mathE.ownerDocument;
        function newMeDeep(me) {
            var tagName = me.tagName.toLowerCase(), args = me.childNodes;
            function nodeToMes(nod) {
                // BUG: M.mtext() doesn't exist
                if (nod.nodeType == 3 /* Text */)
                    return /^\s*$/.test(nod.data) ? [] : [M.mtext(nod.data, doc)];
                if (nod.nodeType == 8 /* Comment */) return [];
                me.nodeType == 1 /* Element */ || F.err(err_newMeDeep_);
                return [newMeDeep(nod)];
            }
            if (F.elem(tagName, mtokens_)) {
                if (tagName == 'mo' && args.length == 1 && args[0].nodeType == 3 /* Text */
                    && args[0].data == '-') args = M['-'];
            } else args = F.concatMap(nodeToMes, args);
            var res = M.newMe(tagName, args, me.attributes, doc);
            if (tagName == 'math') M.setMathBlockQ(res, me.getAttribute('display') == 'block');
            return res;
        }
        return newMeDeep(mathE);
    };

    M['-'] = '\u2212';	// &minus; −
    M.trimNumS = function (s) /* trims trailing 0s after decimal point, trailing ., -0 */ {
        return s.replace(/(\d\.\d*?)0+(?!\d)/g, '$1').replace(/(\d)\.(?!\d)/g, '$1').
            replace(/[-\u2212]0(?![.\d])/g, '0');
    };
    M.numS = function (s, trimQ) /* converts a numeric string to jqMath notation */ {
        if (trimQ) s = M.trimNumS(s);
        return s.replace(/Infinity/ig, '\u221E' /* ∞ */).replace(/NaN/ig, '{?}').
            replace(/e(-\d+)/ig, '\xB710^{$1}').replace(/e\+?(\d+)/ig, '\xB710^$1').
            replace(/-/g, M['-']);	// \xB7 is ·
    };

    /*  Like TeX, we use ^ for superscripts, _ for subscripts, {} for grouping, and \ (or `) as
        an escape character.  Spaces and newline characters are ignored.  We also use ↖ (\u2196)
        and ↙ (\u2199) to put limits above and below an operator or expression.  You can
        $.extend() or even replace M.infix_, M.prefix_, M.postfix_, M.macros_, M.macro1s_, and
        M.alias_ as needed.  */
    M.combiningChar_ = '[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]';
    M.surrPair_ = '[\uD800-\uDBFF][\uDC00-\uDFFF]';
    var decComma_, escPat_ = '[\\\\`]([A-Za-z]+|.)';
    M.decimalComma = function (qP) /* whether to allow decimal commas */ {
        if (qP != null) {
            decComma_ = qP;
            var numPat = (qP ? '\\d*,\\d+|' : '') + '\\d+\\.?\\d*|\\.\\d+';
            M.re_ /* .lastIndex set during use */ = RegExp(
                '(' + numPat + ')|' + escPat_ + '|' + M.surrPair_ + '|\\S' + M.combiningChar_ + '*', 'g');
        }
        return decComma_;
    };
    var commaLangs = 'af|an|ar|av|az|ba|be|bg|bs|ca|ce|co|cs|cu|cv|da|de|el|es|et|eu|fi|fo|fr|' +
        'gl|hr|hu|hy|id|is|it|jv|kk|kl|kv|lb|lt|lv|mk|mn|mo|nl|no|os|pl|pt|ro|ru|sc|sk|sq|sr|' +
        'su|sv|tr|tt|ug|uk|vi|yi';
    M.decimalComma(RegExp('^(' + commaLangs + ')\\b', 'i').test(document.documentElement.lang));
    M.infix_ = {	// operator precedences, see http://www.w3.org/TR/MathML3/appendixc.html
        '⊂⃒': 240, '⊃⃒': 240,
        '≪̸': 260, '≫̸': 260, '⪯̸': 260, '⪰̸': 260,
        '∽̱': 265, '≂̸': 265, '≎̸': 265, '≏̸': 265, '≦̸': 265, '≿̸': 265, '⊏̸': 265, '⊐̸': 265, '⧏̸': 265,
        '⧐̸': 265, '⩽̸': 265, '⩾̸': 265, '⪡̸': 265, '⪢̸': 265,

        // if non-MathML and precedence <= 270, then class is 'fm-infix-loose' not 'fm-infix'

        /* '-' is converted to '\u2212' &minus; − */
        '\u2009' /* &thinsp; ' ', currently generates an <mspace> */: 390,

        '' /* no <mo> is generated */: 500 /* not 390 or 850 */

        /* \^ or `^  880 not 780, \_ or `_ 880 not 900 */

        // unescaped ^ _ ↖ (\u2196) ↙ (\u2199) have precedence 999
    };
    // If an infix op is also prefix or postfix, it must use the same precedence in each form.
    // Also, we omit "multiple character operator"s like && or <=.
    M.prefix_ = {};
    // prefix precedence < 25 => thin space not inserted between multi-letter <mi> and it;
    //	(prefix or postfix precedence < 25) and non-MathML => <mo> stretchy;
    //	precedence < 25 => can be a fence

    // can use {|...|} for absolute value

    // + - % and other infix ops can automatically be used as prefix and postfix ops

    // if non-MathML and prefix and 290 <= precedence <= 350, then 'fm-large-op'
    M.postfix_ = {
        // (unquoted) ' is converted to '\u2032' &prime; ′
    };
    function setPrecs(precs, precCharsA) {
        F.iter(function (prec_chars) {
            var prec = prec_chars[0];
            F.iter(function (c) { precs[c] = prec; }, prec_chars[1].split(''));
        }, precCharsA);
    }
    setPrecs(M.infix_, [
        [21, '|'],	// | not 20 or 270
        [30, ';'],
        [40, ',\u2063'],
        [70, '∴∵'],
        [100, ':'],
        [110, '϶'],
        [150, '…⋮⋯⋱'],
        [160, '∋'],
        [170, '⊢⊣⊤⊨⊩⊬⊭⊮⊯'],
        [190, '∨'],
        [200, '∧'],
        [240, '∁∈∉∌⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋'],
        [241, '≤'],
        [242, '≥'],
        [243, '>'],
        [244, '≯'],
        [245, '<'],
        [246, '≮'],
        [247, '≈'],
        [250, '∼≉'],
        [252, '≢'],
        [255, '≠'],
        [260, '=∝∤∥∦≁≃≄≅≆≇≍≔≗≙≚≜≟≡≨≩≪≫≭≰≱≺≻≼≽⊀⊁⊥⊴⊵⋉⋊⋋⋌⋔⋖⋗⋘⋙⋪⋫⋬⋭■□▪▫▭▮▯▰▱△▴▵▶▷▸▹▼▽▾▿◀◁◂◃' +
            '◄◅◆◇◈◉◌◍◎●◖◗◦⧀⧁⧣⧤⧥⧦⧳⪇⪈⪯⪰'],
        [265, '⁄∆∊∍∎∕∗∘∙∟∣∶∷∸∹∺∻∽∾∿≂≊≋≌≎≏≐≑≒≓≕≖≘≝≞≣≦≧≬≲≳≴≵≶≷≸≹≾≿⊌⊍⊎⊏⊐⊑⊒⊓⊔⊚⊛⊜⊝⊦⊧⊪⊫⊰⊱⊲⊳⊶⊷⊹⊺⊻⊼⊽⊾⊿⋄⋆⋇' +
            '⋈⋍⋎⋏⋐⋑⋒⋓⋕⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋰⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿▲❘⦁⦂⦠⦡⦢⦣⦤⦥⦦⦧⦨⦩⦪⦫⦬⦭⦮⦯⦰⦱⦲⦳⦴⦵⦶⦷⦸⦹⦺⦻⦼⦽⦾⦿⧂⧃⧄' +
            '⧅⧆⧇⧈⧉⧊⧋⧌⧍⧎⧏⧐⧑⧒⧓⧔⧕⧖⧗⧘⧙⧛⧜⧝⧞⧠⧡⧢⧧⧨⧩⧪⧫⧬⧭⧮⧰⧱⧲⧵⧶⧷⧸⧹⧺⧻⧾⧿⨝⨞⨟⨠⨡⨢⨣⨤⨥⨦⨧⨨⨩⨪⨫⨬⨭⨮⨰⨱⨲⨳⨴⨵⨶⨷⨸⨹' +
            '⨺⨻⨼⨽⨾⩀⩁⩂⩃⩄⩅⩆⩇⩈⩉⩊⩋⩌⩍⩎⩏⩐⩑⩒⩓⩔⩕⩖⩗⩘⩙⩚⩛⩜⩝⩞⩟⩠⩡⩢⩣⩤⩥⩦⩧⩨⩩⩪⩫⩬⩭⩮⩯⩰⩱⩲⩳⩴⩵⩶⩷⩸⩹⩺⩻⩼⩽⩾⩿⪀⪁⪂⪃⪄⪅⪆⪉⪊⪋⪌⪍⪎⪏' +
            '⪐⪑⪒⪓⪔⪕⪖⪗⪘⪙⪚⪛⪜⪝⪞⪟⪠⪡⪢⪣⪤⪥⪦⪧⪨⪩⪪⪫⪬⪭⪮⪱⪲⪳⪴⪵⪶⪷⪸⪹⪺⪻⪼⪽⪾⪿⫀⫁⫂⫃⫄⫅⫆⫇⫈⫉⫊⫋⫌⫍⫎⫏⫐⫑⫒⫓⫔⫕⫖⫗⫘⫙⫚⫛⫝⫝⫞⫟⫠⫡⫢⫣⫤⫥⫦' +
            '⫧⫨⫩⫪⫫⫬⫭⫮⫯⫰⫱⫲⫳⫴⫵⫶⫷⫸⫹⫺⫻⫽⫾'],
        [270, '←↑→↓↔↕↖↗↘↙↚↛↜↝↞↟↠↡↢↣↤↥↦↧↨↩↪↫↬↭↮↯↰↱↲↳↴↵↶↷↸↹↺↻↼↽↾↿⇀⇁⇂⇃⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑' +
            '⇒⇓⇔⇕⇖⇗⇘⇙⇚⇛⇜⇝⇞⇟⇠⇡⇢⇣⇤⇥⇦⇧⇨⇩⇪⇫⇬⇭⇮⇯⇰⇱⇲⇳⇴⇵⇶⇷⇸⇹⇺⇻⇼⇽⇾⇿⊸⟰⟱⟵⟶⟷⟸⟹⟺⟻⟼⟽⟾⟿⤀⤁⤂⤃⤄' +
            '⤅⤆⤇⤈⤉⤊⤋⤌⤍⤎⤏⤐⤑⤒⤓⤔⤕⤖⤗⤘⤙⤚⤛⤜⤝⤞⤟⤠⤡⤢⤣⤤⤥⤦⤧⤨⤩⤪⤫⤬⤭⤮⤯⤰⤱⤲⤳⤴⤵⤶⤷⤸⤹⤺⤻⤼⤽⤾⤿⥀⥁⥂⥃⥄⥅⥆⥇⥈⥉⥊⥋⥌⥍⥎⥏⥐⥑⥒' +
            '⥓⥔⥕⥖⥗⥘⥙⥚⥛⥜⥝⥞⥟⥠⥡⥢⥣⥤⥥⥦⥧⥨⥩⥪⥫⥬⥭⥮⥯⥰⥱⥲⥳⥴⥵⥶⥷⥸⥹⥺⥻⥼⥽⥾⥿⦙⦚⦛⦜⦝⦞⦟⧟⧯⧴⭅⭆'],
        [275, '+-±−∓∔⊞⊟'],
        [300, '⊕⊖⊘'],
        [340, '≀'],
        [350, '∩∪'],
        [390, '*.×•\u2062⊠⊡⋅⨯⨿'],
        [400, '·'],
        [410, '⊗'],
        [640, '%'],
        [650, '\\∖'],
        [660, '/÷'],
        [710, '⊙'],
        [825, '@'],
        [835, '?'],
        [850, '\u2061'],
        [880, '^_\u2064']]);
    setPrecs(M.prefix_, [
        [10, '‘“'],
        [20, '([{‖⌈⌊❲⟦⟨⟪⟬⟮⦀⦃⦅⦇⦉⦋⦍⦏⦑⦓⦕⦗⧼'],
        [230, '∀∃∄'],
        [290, '∑⨊⨋'],
        [300, '∬∭⨁'],
        [310, '∫∮∯∰∱∲∳⨌⨍⨎⨏⨐⨑⨒⨓⨔⨕⨖⨗⨘⨙⨚⨛⨜'],
        [320, '⋃⨃⨄'],
        [330, '⋀⋁⋂⨀⨂⨅⨆⨇⨈⨉⫼⫿'],
        [350, '∏∐'],
        [670, '∠∡∢'],
        [680, '¬'],
        [740, '∂∇'],
        [845, 'ⅅⅆ√∛∜']]);
    setPrecs(M.postfix_, [
        [10, '’”'],
        [20, ')]}‖⌉⌋❳⟧⟩⟫⟭⟯⦀⦄⦆⦈⦊⦌⦎⦐⦒⦔⦖⦘⧽'],
        [800, '′♭♮♯'],
        [810, '!'],
        [880, '&\'`~¨¯°´¸ˆˇˉˊˋˍ˘˙˚˜˝˷\u0302\u0311‾\u20db\u20dc⎴⎵⏜⏝⏞⏟⏠⏡']]);

    var s_, s_or_mx_a_, s_or_mx_i_, docP_, precAdj_;
    /*  A "tok" (scanner token or similar) here is an [meP, opSP], with at least one != null.
        The meP may be non-atomic.  Thus a tok is either an me, possibly with a precedence given
        by an operator, or else either a meta-operator or "macro1" for building an me.  */

    function newMe_(tagName, argsP, attrsP) { return M.newMe(tagName, argsP, attrsP, docP_); }
    function emptyMe_() { return newMe_('mspace' /* or 'mrow'? */); }

    function scanWord(descP) /* use scanString() instead if any quotes should be stripped */ {
        var re = /\s*([-\w.]*)/g;	//+ could allow all unicode alphabetics
        re.lastIndex = M.re_.lastIndex;
        var match = re.exec(s_);
        if (!match[1]) throw 'Missing ' + (descP || 'word');
        M.re_.lastIndex = re.lastIndex;
        return match[1];
    }
    function scanString(descP) /* scans a word or quoted string */ {
        var re = /\s*(?:(["'])|([-\w.]*))/g;
        re.lastIndex = M.re_.lastIndex;
        var match = re.exec(s_);
        if (match[2]) {
            M.re_.lastIndex = re.lastIndex;
            return match[2];
        }
        if (!match[1]) throw 'Missing ' + (descP || 'string');
        var c = match[1], re2 = RegExp('[^\\`' + c + ']+|[\\`](.|\n)|(' + c + ')', 'g'), res = '';
        re2.lastIndex = re.lastIndex;
        while (true) {
            match = re2.exec(s_);
            if (!match) throw 'Missing closing ' + c;
            if (match[2]) break;
            res += match[1] || match[0];
        }
        M.re_.lastIndex = re2.lastIndex;
        return res;
    }
    function scanMeTok(afterP) {
        var tokP = scanTokP();
        if (!tokP || !tokP[0])
            throw 'Missing expression argument' + (afterP ? ' after ' + afterP : '') +
            ', before position ' + M.re_.lastIndex;
        return tokP;
    }

    function mtokenScan(tagName /* 'mn', 'mi', 'mo', or 'mtext' */) {
        var s = scanString(tagName == 'mtext' ? 'text' : tagName);
        return [newMe_(tagName, s), tagName == 'mo' ? s : null];
    }
    function htmlScan() {
        if (!M.trustHtml) throw '\\html use requires M.trustHtml';
        var h = scanString('html'), doc = docP_ || document, e = doc.createElement('div');
        //JQuery:	e = $('<div/>', docP_ || document).css('display', 'inline-block').html(h)[0];
        e.style.display = 'inline-block';
        e.innerHTML = h;
        if (e.childNodes.length == 1) e = e.childNodes[0];
        return [newMe_('mtext', e), null];
    }
    function spScan() {
        var widthS = scanString('\\sp width');
        return [M.spaceMe(widthS, docP_),
        /^[^-]*[1-9]/.test(widthS) ? '\u2009' /* &thinsp; */ : null];
    }
    function braceScan() {
        var tokP = scanTokP();
        if (tokP && tokP[1] == '↖' && !tokP[0]) {	// grouped op
            var meTokP_tokP = parseEmbel();
            tokP = meTokP_tokP[1] || scanTokP();
            if (!(meTokP_tokP[0] && tokP && tokP[1] == '}' && !tokP[0]))
                throw 'Expected an embellished operator and "}" after "{↖", before position ' +
                M.re_.lastIndex;
            return meTokP_tokP[0];
        }
        var mxP_tokP = parse_mxP_tokP(0, tokP);
        tokP = mxP_tokP[1];
        // if (! tokP) throw 'Missing "}"';
        !tokP || tokP[1] == '}' && !tokP[0] || F.err(err_braceScan_);
        return [mxP_tokP[0] || emptyMe_(), null];
    }
    function attrScan(nameP, mmlOnlyQ) {	// note usually doesn't affect non-MathML rendering
        if (!nameP) nameP = scanWord('attribute name');
        var v = scanString(nameP + ' attribute'), tok = scanMeTok(nameP);
        if (!mmlOnlyQ || M.MathML) tok[0].setAttribute(nameP, v);
        return tok;
    }
    function clScan() {	// note currently ignored by MathPlayer
        var desc = 'CSS class name(s)', ws = scanString(desc), tok = scanMeTok(desc);
        M.addClass(tok[0], ws);
        return tok;
    }
    // see http://www.w3.org/TR/MathML3/chapter3.html#presm.commatt for mathvariant attr
    function mvScan(sP) {
        var s = sP || scanString('mathvariant'), tok = scanMeTok(s), me = tok[0];
        if (!F.elem(M.mtagName(me), ['mi', 'mn', 'mo', 'mtext', 'mspace', 'ms']))
            throw 'Can only apply a mathvariant to a MathML token (atomic) element, at ' +
            'position ' + M.re_.lastIndex;

        me.setAttribute('mathvariant', s);

        if (/bold/.test(s)) M.addClass(me, 'ma-bold');
        else if (s == 'normal' || s == 'italic') M.addClass(me, 'ma-nonbold');

        M.addClass(me, /italic/.test(s) ? 'ma-italic' : 'ma-upright');

        if (/double-struck/.test(s)) M.addClass(me, 'ma-double-struck');
        else if (/fraktur/.test(s)) M.addClass(me, 'ma-fraktur');
        else if (/script/.test(s)) M.addClass(me, 'ma-script');
        else if (/sans-serif/.test(s)) M.addClass(me, 'ma-sans-serif');

        // (monospace, initial, tailed, looped, stretched) currently don't add classes

        return tok;
    }
    function meScan(tagNameP) {
        if (!tagNameP) tagNameP = scanWord('tagName');
        var tok = scanMeTok({ menclose: 'enclose' }[tagNameP] || tagNameP);
        return [newMe_(tagNameP, tok[0]),
        F.elem(tagNameP, ['mstyle', 'mpadded']) ? tok[1] : null];
    }
    function phantomScan(macroS) {
        var tok = scanMeTok(macroS);
        F.iter(function (e) { e.disabled = true; }, tok[0].createElement('input'));
        if (macroS == 'vphantom')
            tok[0] = newMe_('mpadded', tok[0],
                { width: '0', style: 'display: inline-block; width: 0' });
        return [newMe_('mphantom', tok[0]), tok[1]];
    }
    function ovScan() /* overbar */ {
        return [M.menclose(scanMeTok('\\ov')[0], { notation: 'top' }, docP_), null];
    }
    function minsizeScan() {
        var s = scanString('minsize'), tok = scanMeTok('minsize'), me = tok[0];
        if (M.mtagName(me) != 'mo')
            throw 'Can only stretch an operator symbol, before position ' + M.re_.lastIndex;
        if (M.MathML) me.setAttribute('minsize', s);
        else {
            var match = /^(.+)em$/.exec(s);
            if (match) s = match[1];
            var r = Number(s);	// may be NaN, 0, etc.
            if (r > 1) checkVertStretch(0.6 * r, 0.6 * r, me, true);
            else if (!r) me.style.fontSize = s;
        }
        return tok;
    }
    function mrow1Scan() { return [newMe_('mrow', scanMeTok('\\mrowOne')[0]), null]; }
    function binomScan() {
        function mtr1(e) { return newMe_('mtr', newMe_('mtd', e)); }
        var xMe = scanMeTok('\\binom')[0], yMe = scanMeTok('\\binom')[0],
            zMe = newMe_('mtable', F.map(mtr1, [xMe, yMe]));
        M.addClass(zMe, 'ma-binom');
        if (!M.MathML) {
            zMe.fmUp -= 0.41;
            zMe.fmDn -= 0.41;
        }
        return [newMe_('mrow', [newMe_('mo', '('), zMe, newMe_('mo', ')')]), null];
    }
    M.macros_ /* each returns a tokP */ = {
        mn: F(mtokenScan, 'mn'), mi: F(mtokenScan, 'mi'), mo: F(mtokenScan, 'mo'),
        text: F(mtokenScan, 'mtext'), html: htmlScan, sp: spScan,
        attr: attrScan, attrMML: F(attrScan, null, true),
        id: F(attrScan, 'id'), dir: F(attrScan, 'dir'), cl: clScan, mv: mvScan,
        bo: F(mvScan, 'bold'), it: F(mvScan, 'italic'), bi: F(mvScan, 'bold-italic'),
        sc: F(mvScan, 'script'), bs: F(mvScan, 'bold-script'), fr: F(mvScan, 'fraktur'),
        ds: F(mvScan, 'double-struck'), bf: F(mvScan, 'bold-fraktur'),
        mstyle: F(meScan, 'mstyle'), merror: F(meScan, 'merror'), mpadded: F(meScan, 'mpadded'),
        phantom: F(phantomScan, 'phantom'), vphantom: F(phantomScan, 'vphantom'),
        enclose: F(meScan, 'menclose'),
        ov: ovScan, minsize: minsizeScan, mrowOne: mrow1Scan, binom: binomScan
    };

    M.alias_ = {
        '-': M['-'], '\'': '\u2032' /* &prime; */,
        '\u212D': ['C', 'fraktur'], '\u210C': ['H', 'fraktur'], '\u2111': ['I', 'fraktur'],
        '\u211C': ['R', 'fraktur'], '\u2128': ['Z', 'fraktur'],
        '\u212C': ['B', 'script'], '\u2130': ['E', 'script'], '\u2131': ['F', 'script'],
        '\u210B': ['H', 'script'], '\u2110': ['I', 'script'], '\u2112': ['L', 'script'],
        '\u2133': ['M', 'script'], '\u211B': ['R', 'script'], '\u212F': ['e', 'script'],
        '\u210A': ['g', 'script'], /* '\u2113': ['l', 'script'], */ '\u2134': ['o', 'script']
    };
    var spaces_ = { ',': '.17em', ':': '.22em', ';': '.28em', '!': '-.17em' };
    function scanTokP() {
        var match = M.re_.exec(s_);
        while (!match) {
            M.re_.lastIndex = s_.length;
            if (s_or_mx_i_ == s_or_mx_a_.length) return null;
            var g = s_or_mx_a_[s_or_mx_i_++];
            if (typeof g == 'string') {
                M.re_.lastIndex = 0;
                s_ = g;
                match = M.re_.exec(s_);
            } else if (g.nodeType == 1 /* Element */) return [g, null];
            else F.err(err_scanTokP_);
        }
        var s1 = match[2] || match[0], mvP = null;
        if (/^[_^}\u2196\u2199]$/.test(match[0]) || match[2] && M.macro1s_[s1])
            return [null, s1];
        if (match[0] == '{') return braceScan();
        if (match[2] && M.macros_[s1]) return M.macros_[s1]();
        if (match[1]) return [M.newMe('mn', s1, docP_), null];
        if (/^[,:;!]$/.test(match[2])) s1 = '\u2009' /* &thinsp; */;
            /* else if (match[2] == '&') {
                if (M.mozillaVersion && M.MathML && false /* <maligngroup> not supported yet * /)
                    return [M.newMe('maligngroup', undefined, docP_), null];
                s1 = ',';
            } */ else if (match[2] == '/') s1 = '\u2215' /* ∕ */;
        else if (M.alias_[s1] && !match[2]) {
            var t = M.alias_[s1];
            if (typeof t == 'string') s1 = t;
            else {
                s1 = t[0];
                mvP = t[1];	// 'double-struck', 'fraktur', or 'script'
            }
        }
        var opSP = M.infix_[s1] || M.prefix_[s1] || M.postfix_[s1] ? s1 : null, e;
        if (s1 == '\u2009' /* &thinsp; */) // incl. avoid bad font support, incl. in MathML
            e = M.spaceMe(spaces_[match[2] || ','], docP_);
        else if (opSP) {
            if (/^[∛∜]$/.test(s1) && !match[2]) {
                e = newMe_('mn', s1 == '∛' ? '3' : '4');
                return [newMe_('msup', [newMe_('mo', '√'), e]), '√'];
            }
            e = M.newMe('mo', s1, docP_);
            if (/^[∀∃∄∂∇]$/.test(s1)) {	// Firefox work-arounds
                e.setAttribute('lspace', '.11em');
                e.setAttribute('rspace', '.06em');
            } else if (s1 == '!') {
                e.setAttribute('lspace', '.06em');
                e.setAttribute('rspace', '0');
            } else if (s1 == '×' /* '\u00D7' */) {
                e.setAttribute('lspace', '.22em');
                e.setAttribute('rspace', '.22em');
            }
        } else {
            e = M.newMe('mi', s1, docP_);
            if (match[2] && s1.length == 1) {
                e.setAttribute('mathvariant', 'normal');
                M.addClass(e, 'ma-upright');
                if (!M.MathML) e.style.paddingRight = '0';
            } else if (mvP) {
                e.setAttribute('mathvariant', mvP);
                M.addClass(e, 'ma-upright');
                M.addClass(e, 'ma-' + mvP);
            }
            if (/\w\w/.test(s1)) M.addClass(e, 'ma-repel-adj');
        }
        return [e, opSP];
    }

    function parse_mtd_tokP(optQ /* => mtd can be null or an mtr */) {
        var mxP_tokP = parse_mxP_tokP(M.infix_[',']), tokP = mxP_tokP[1] || scanTokP(),
            mxP = mxP_tokP[0];
        if (!mxP) {
            if (optQ && !(tokP && tokP[1] == ',')) return [null, tokP];
            mxP = emptyMe_();
        }
        var w = M.mtagName(mxP);
        if (w != 'mtd' && !(w == 'mtr' && optQ)) mxP = M.newMe('mtd', mxP, docP_);
        return [mxP, tokP];
    }
    function parse_rowspan_tokP() {
        var v = scanString('rowspan'), mtd_tokP = parse_mtd_tokP(), mtd = mtd_tokP[0];
        mtd.setAttribute(M.MathML ? 'rowspan' : 'rowSpan' /* for IE6-7 */, v);
        if (!M.hasClass(mtd, 'middle')) M.addClass(mtd, 'middle');
        return mtd_tokP;
    }
    function parse_colspan_tokP() {
        var v = scanString('colspan'), mtd_tokP = parse_mtd_tokP();
        mtd_tokP[0].setAttribute(M.MathML ? 'columnspan' : 'colSpan', v);
        return mtd_tokP;
    }
    function parse_mtr_tokP(optQ /* => mtr can be null */) {
        var mtds = [];
        while (true) {
            var mtdP_tokP = parse_mtd_tokP(mtds.length == 0), mtdP = mtdP_tokP[0],
                tokP = mtdP_tokP[1] || scanTokP();
            if (mtdP) {
                if (M.mtagName(mtdP) == 'mtr') return [mtdP, tokP];
                mtds.push(mtdP);
            }
            if (!(tokP && tokP[1] == ','))
                return [mtds.length || !optQ || tokP && tokP[1] == ';' ?
                    M.newMe('mtr', mtds, docP_) : null, tokP];
        }
    }
    M.dtableQ = false;	// whether \table defaults to \dtable
    function parse_table_tokP(dtableQ) {
        if (dtableQ === undefined) dtableQ = M.dtableQ;

        var mtrs = [];
        while (true) {
            var mtrP_tokP = parse_mtr_tokP(mtrs.length == 0), mtrP = mtrP_tokP[0],
                tokP = mtrP_tokP[1] || scanTokP();
            if (mtrP) mtrs.push(mtrP);
            if (!(tokP && tokP[1] == ';'))
                return [newMe_('mtable', mtrs, dtableQ ? { displaystyle: true } : undefined),
                    tokP];
        }
    }
    function parse_math_tokP() {
        var mxP_tokP = parse_mxP_tokP(0);
        mxP_tokP[0] = M.newMe('math', mxP_tokP[0], docP_);
        return mxP_tokP;
    }
    /*  An "mx" is an "me" ("eXpression") with no operator precedence (binding power), or one
        whose precedence can be ignored.  */
    M.macro1s_ /* each returns mxP_tokP, so can do precedence-based look-ahead */ = {
        mtd: parse_mtd_tokP, rowspan: parse_rowspan_tokP, colspan: parse_colspan_tokP,
        mtr: parse_mtr_tokP, dtable: F(parse_table_tokP, true),
        ttable: F(parse_table_tokP, false), table: F(parse_table_tokP, undefined),
        math: parse_math_tokP
    };

    var embelWs_ = { '_': 'sub', '^': 'sup', '\u2199': 'under', '\u2196': 'over' };
    function embelKP(op) {
        var wP = embelWs_[op];
        return wP && (wP.length < 4 ? 'ss' : 'uo');
    }
    function parseEmbel(meTokP, tokP) /* checks sub/sup/under/over; returns [meTokP, tokP] */ {
        while (true) {
            if (!tokP) tokP = scanTokP();
            if (!tokP || tokP[0] || !embelWs_[tokP[1]]) {
                if (tokP && !meTokP) {
                    meTokP = tokP;
                    tokP = null;
                    continue;
                }
                return [meTokP, tokP];
            }
            var k = embelKP(tokP[1]),
                parseMxs = function () /* returns 0-2 mxs of kind 'k', by op; sets tokP */ {
                    var mxs = {}, doneQs = {};
                    while (true) {
                        if (!tokP) tokP = scanTokP();
                        if (!tokP || tokP[0]) break;
                        var op = tokP[1];
                        if (embelKP(op) != k || doneQs[op]) break;
                        doneQs[op] = true;
                        tokP = scanTokP();
                        if (tokP && embelKP(tokP[1]) == k && !tokP[0]) continue;
                        var mxP_tokP = parse_mxP_tokP(999, tokP);
                        mxs[op] = mxP_tokP[0];	// null ok
                        tokP = mxP_tokP[1];
                    }
                    return mxs;
                }, mxs = parseMxs();
            if (k == 'uo' || !tokP || (tokP[0] ? meTokP : embelKP(tokP[1]) != 'ss')) {
                if (!meTokP) meTokP = [emptyMe_(), null];
                var w = 'm', a = [meTokP[0]];
                F.iter(function (op) {
                    if (mxs[op]) {
                        w += embelWs_[op];
                        a.push(mxs[op]);
                    }
                }, ['_', '^', '↙', '↖']);
                if (a.length > 1) meTokP = [M.newMe(w, a, docP_), meTokP[1]];
            } else {
                var mxsPA = [mxs];
                while (tokP && !tokP[0] && embelKP(tokP[1]) == 'ss') mxsPA.push(parseMxs());
                if (!meTokP) {
                    if (!tokP || !tokP[0]) meTokP = [emptyMe_(), null];
                    else {
                        meTokP = tokP;
                        tokP = scanTokP();
                        var postA = [];
                        while (tokP && !tokP[0] && embelKP(tokP[1]) == 'ss')
                            postA.push(parseMxs());
                        mxsPA = postA.concat(null, mxsPA);
                    }
                }
                var a = [meTokP[0]];
                F.iter(function (mxsP) {
                    if (!mxsP) a.push(M.newMe('mprescripts', undefined, docP_));
                    else
                        a.push(mxsP['_'] || M.newMe('none', undefined, docP_),
                            mxsP['^'] || M.newMe('none', undefined, docP_));
                }, mxsPA);
                meTokP = [M.newMe('mmultiscripts', a, docP_), meTokP[1]];
            }
        }
    }
    function parse_mxP_tokP(prec, tokP) /* tokP may be non-atomic */ {
        var mx0p = null;
        while (true) {
            if (!tokP) {
                tokP = scanTokP();
                if (!tokP) break;
            }
            var op = tokP[1];	// may be null/undefined
            if (!op
                || mx0p && (tokP[0] ? !(M.infix_[op] || M.postfix_[op]) : M.macro1s_[op])) {
                if (!mx0p) {
                    mx0p = tokP[0];
                    tokP = null;
                } else {
                    if (prec >= precAdj_) break;
                    var mxP_tokP = parse_mxP_tokP(precAdj_, tokP), mx1 = mxP_tokP[0];
                    mx1 || F.err(err_parse_mxP_tokP_1_);
                    var e = M.newMe('mrow', [mx0p, mx1], docP_);
                    if (M.hasClass(mx0p, 'ma-repel-adj') || M.hasClass(mx1, 'ma-repel-adj')) {
                        /* setting padding on mx0p or mx1 doesn't work on e.g. <mn> or <mrow>
                            elements in Firefox 3.6.12 */
                        // Chrome1+, FF3+, Opera7+, Safari1.1+, IE6+
                        if (!(op && tokP[0] && M.prefix_[op] < 25))
                            mx0p.parentNode.insertBefore(M.spaceMe('.17em', docP_), mx0p.nextSibling);
                        // FF48+
                        //mx0p.insertAdjacentElement('afterend', M.spaceMe('.17em', docP_));
                        //JQuery: $(mx0p).after(M.spaceMe('.17em', docP_));
                        M.addClass(e, 'ma-repel-adj');
                    }
                    mx0p = e;
                    tokP = mxP_tokP[1];
                }
            } else {
                var moP = tokP[0];	// could be an embellished <mo> in {↖ }
                if (moP) {
                    var precL = M.infix_[op] || M.postfix_[op];
                    if (precL && prec >= precL) break;
                    var precROpt = M.infix_[op] || !(mx0p && M.postfix_[op]) && M.prefix_[op];
                    if (!M.MathML && !mx0p && 290 <= precROpt && precROpt <= 350) {
                        M.addClass(moP, 'fm-large-op');
                        //JQuery: $(moP).addClass('fm-large-op');
                        //+ omit if fm-inline:
                        moP.fmUp = 0.85 * 1.3 - 0.25;
                        moP.fmDn = 0.35 * 1.3 + 0.25;
                    }
                    var meTok_tokP = parseEmbel(tokP), a = [];
                    meTok_tokP[0] || F.err(err_parse_mxP_tokP_embel_);
                    var extOp = meTok_tokP[0][0];
                    tokP = meTok_tokP[1];
                    if (mx0p) a.push(mx0p);
                    a.push(extOp);
                    if (precROpt) {
                        var mxP_tokP = parse_mxP_tokP(precROpt, tokP);
                        if (mxP_tokP[0]) a.push(mxP_tokP[0]);
                        tokP = mxP_tokP[1];
                        if (precROpt < 25 && !mx0p) {	// check for fences
                            if (!tokP) tokP = scanTokP();
                            if (tokP && tokP[1] && tokP[0]
                                && (M.postfix_[tokP[1]] || M.infix_[tokP[1]]) == precROpt) {
                                // don't parseEmbel() here [after fences]
                                a.push(tokP[0]);
                                tokP = null;
                            }
                        }
                    }
                    if (a.length == 1) mx0p = a[0];
                    else if (op == '/' && mx0p && a.length == 3
                        || op == '\u221A' /* &radic; */ && !mx0p && a.length == 2) {
                        if (op == '\u221A' && M.mtagName(a[0]) == 'msup')
                            mx0p = M.newMe('mroot', [a[1], M.mchilds(a[0])[1]], docP_);
                        else {
                            a.splice(a.length - 2, 1);
                            mx0p = M.newMe(op == '/' ? 'mfrac' : 'msqrt', a, docP_);
                        }
                    } else {
                        var e = M.newMe('mrow', a, docP_);
                        if (op == '\u2009' /* &thinsp; */ || (precL || precROpt) >= precAdj_) {
                        } else {
                            var k = '';
                            if (op == '=') k = 'infix-loose';
                            else if (a.length == 2) {
                                k = mx0p ? 'postfix' : 'prefix';
                                if (M.infix_[op]) k += '-tight';
                                else {
                                    if (/^[∀∃∄∂∇]$/.test(op)) k = 'quantifier';
                                    M.addClass(e, 'ma-repel-adj');
                                }
                            } else if (mx0p) {	// a.length == 3 && not fences
                                k = op == ',' || op == ';' ? 'separator' :
                                    precL <= 270 ? 'infix-loose' : 'infix';
                                if (op == '|' && M.MathML && moP.tagName == 'mo') {
                                    // Firefox work-around
                                    moP.setAttribute('lspace', '.11em');
                                    moP.setAttribute('rspace', '.11em');
                                }
                            }
                            if (!M.MathML && k && !moP.style.fontSize)
                                M.addClass(extOp, 'fm-' + k);
                            //JQuery: $(extOp).addClass('fm-'+k);
                        }
                        mx0p = e;
                    }
                } else if (op == '}') break;
                else if (M.macro1s_[op]) {
                    !mx0p || F.err(err_parse_mxP_tokP_macro_);
                    var mxP_tokP = M.macro1s_[op]();
                    mx0p = mxP_tokP[0];
                    tokP = mxP_tokP[1];
                } else {
                    embelWs_[op] || F.err(err_parse_mxP_tokP_script_);
                    if (prec >= 999) break;
                    var meTok_tokP = parseEmbel(mx0p && [mx0p, null], tokP),
                        meTok = meTok_tokP[0];
                    meTok || F.err(err_parse_mxP_tokP_embel_2_);
                    tokP = meTok_tokP[1];
                    var a = [meTok[0]], opP = meTok[1];
                    if (opP) {
                        var precROpt = M.infix_[opP] || M.prefix_[opP];
                        if (precROpt) {
                            var mxP_tokP = parse_mxP_tokP(precROpt, tokP);
                            if (mxP_tokP[0]) a.push(mxP_tokP[0]);
                            tokP = mxP_tokP[1];
                        }
                    }
                    mx0p = a.length == 1 ? a[0] : M.newMe('mrow', a, docP_);
                }
            }
        }
        return [mx0p, tokP];
    }
    M.sMxAToMe = function (g /* string, mx, or array of strings and mxs */, docP) {
        if (!docP) docP = document;
        M.infix_[''] && M.infix_[','] || F.err(err_sToMe_1_);

        if (M.MathML === undefined) M.MathML = M.canMathML();
        M.re_.lastIndex = 0;
        s_ = '';
        s_or_mx_a_ = Array.isArray(g) ? g : [g];
        s_or_mx_i_ = 0;
        docP_ = docP;
        precAdj_ = M.infix_[''];

        var mxP_tokP = parse_mxP_tokP(0);
        if (mxP_tokP[1])
            throw 'Extra input:  ' + mxP_tokP[1][1] + s_.substring(M.re_.lastIndex) +
            (s_or_mx_i_ < s_or_mx_a_.length ? '...' : '');
        if (M.re_.lastIndex < s_.length || s_or_mx_i_ < s_or_mx_a_.length) F.err(err_sToMe_2_);
        return mxP_tokP[0] || emptyMe_();
    };
    M.sToMathE = function (g, blockQ, docP) /* parses strings and includes MathML subexpression
                elements into an XML 'math' or HTML 'fmath' element */ {
        var res = M.sMxAToMe(g, docP);
        if (!F.elem(M.mtagName(res), ['math', 'fmath'])) res = M.newMe('math', res, docP);
        if (typeof g == 'string') res.setAttribute('alttext', g);
        return M.setMathBlockQ(res, blockQ);
    };

    /*  Like TeX, we use $ or \( \), and $$ or \[ \], to delimit inline and block ("display")
        mathematics, respectively.  Use \$ for an actual $ instead, or \\ for \ if necessary.
        */
    M.$mathQ = true;	// whether $ acts as an (inline) math delimiter
    M.inline$$Q = false;	/* whether $$ $$ or \[ \] in a <p> or <span> should be wrapped in an
            inline-block */
    M.parseMath = function (nod) {
        if (nod.nodeType == 1 /* Element */ && nod.tagName != 'SCRIPT') {
            if (nod.tagName.toUpperCase() == 'MATH') {
                var newE = M.eToMathE(nod);
                if (newE != nod) nod.parentNode.replaceChild(newE, nod);
            } else
                for (var p = nod.firstChild; p;) {
                    var restP = p.nextSibling;	// do before splitting 'p'
                    M.parseMath(p);
                    p = restP;
                }
        } else if (nod.nodeType == 3 /* Text */ && /[$\\]/.test(nod.data) /* for speed */) {
            var doc = nod.ownerDocument, s = nod.data, a = [], t = '',
                re = /\\([$\\])|\$\$?|\\[([]/g;
            while (true) {
                var j = re.lastIndex, m = re.exec(s), k = m ? m.index : s.length;
                if (j < k) t += s.substring(j, k);
                if (m && m[1]) t += m[1];
                else {
                    var i = -1, z;
                    if (m) {
                        z = m[0] == '\\(' ? '\\)' : m[0] == '\\[' ? '\\]' : m[0];
                        if (re.lastIndex < s.length && (m[0] != '$' || M.$mathQ)) {
                            i = s.indexOf(z, re.lastIndex);
                            while (i != -1 && s.charAt(i - 1) == '\\') i = s.indexOf(z, i + 1);
                        }
                        if (i == -1) {
                            t += m[0];
                            continue;
                        }
                    }
                    if (t) {
                        a.push(doc.createTextNode(t));
                        t = '';
                    }
                    if (!m) break;
                    var blockQ = m[0] == '$$' || m[0] == '\\[',
                        e = M.sToMathE(s.substring(re.lastIndex, i), blockQ, doc);
                    if (blockQ && M.inline$$Q && F.elem(nod.parentNode.nodeName, ['P', 'SPAN'])) {
                        var wrap$ = doc.createElement('div');
                        wrap$.appendChild(e);
                        wrap$.style.display = 'inline-block';
                        //JQuery: var wrap$ = $('<div/>', doc).css('display', 'inline-block').append(e);
                        var span$ = doc.createElement('span');
                        span$.appendChild(wrap$);
                        span$.style.whiteSpace = 'nowrap';
                        //JQuery: wrap$ = $('<span/>', doc).css('white-space', 'nowrap').append(wrap$);
                        // so Firefox won't line-break between e and a period/comma/etc.
                        e = span$;
                    }
                    a.push(e);
                    re.lastIndex = i + z.length;
                }
            }
            F.iter(function (x) { nod.parentNode.insertBefore(x, nod); }, a);
            nod.parentNode.removeChild(nod);
        }
    };
    M.parseMathQ = true;

    // https://www.sitepoint.com/jquery-document-ready-plain-javascript/
    function dom_loaded(event) {
        if (M.MathML === undefined) M.MathML = M.canMathML();
        if (M.parseMathQ)
            try {
                M.parseMath(document.body);
            } catch (exc) {
                alert(exc);
            }
    };
    // FF < 4 doesn't have document.readyState
    if (document.readyState === "complete" || (document.readyState && document.readyState !== "loading" && !document.documentElement.doScroll)) {
        dom_loaded();
    } else if (document.addEventListener) {
        // FF < 6 requires useCapture param
        document.addEventListener("DOMContentLoaded", dom_loaded, false);
    } else {
        // IE6-8
        window.attachEvent("onload", dom_loaded);
    }

    //JQuery: Not used??
    //if ($.fn.parseMath == null)
    //	$.fn.parseMath = function() { F.iter(M.parseMath, this); return this; };

    return M;
}();
var M; if (M === undefined) M = jqMath;