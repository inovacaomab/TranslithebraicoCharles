(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/havarotjs/dist/esm/utils/regularExpressions.js
  var clusterSplitGroup, consonants, dagesh, hebChars, ligatures, meteg, punctuation, rafe, splitGroup, sheva, taamim, vowels, jerusalemTest;
  var init_regularExpressions = __esm({
    "node_modules/havarotjs/dist/esm/utils/regularExpressions.js"() {
      clusterSplitGroup = /(?=[\u{05BE}\u{05C3}\u{05C6}\u{05D0}-\u{05F2}\u{2000}-\u{206F}\u{2E00}-\u{2E7F}'!"#$%&()*+,-.\/:;<=>?@\[\]^_`\{|\}~])/u;
      consonants = /[\u{05D0}-\u{05F2}]/u;
      dagesh = /[\u{05BC}]/u;
      hebChars = /[\u{0590}-\u{05FF}\u{FB1D}-\u{FB4F}]/u;
      ligatures = /[\u{05C1}-\u{05C2}]/u;
      meteg = /\u{05BD}/u;
      punctuation = /[\u{05BE}\u{05C0}\u{05C3}\u{05C6}]/u;
      rafe = /\u{05BF}/u;
      splitGroup = /(\S*\u{05BE}(?=\S*\u{05BE})|\S*\u{05BE}(?!\S*\u{05BE})|\S*-(?!\S*-)|\S*-(?=\S*-)|\S*\s*)/u;
      sheva = /\u{05B0}/u;
      taamim = /[\u{0591}-\u{05AE}]/u;
      vowels = /[\u{05B1}-\u{05BB}\u{05C7}]/u;
      jerusalemTest = new RegExp(`(?<vowel>[\u05B8\u05B7])(?<hiriq>\u05B4)(?<taamimMatch>${taamim.source}|\u05BD)(?<mem>\u05DD.*)$`, "u");
    }
  });

  // node_modules/havarotjs/dist/esm/utils/removeTaamim.js
  var removeTaamim;
  var init_removeTaamim = __esm({
    "node_modules/havarotjs/dist/esm/utils/removeTaamim.js"() {
      init_regularExpressions();
      removeTaamim = (word) => {
        const globalTaamim = new RegExp(taamim.source, "gu");
        let noTaamim = "";
        const charPos = [];
        for (const [index, element] of [...word].entries()) {
          if (!globalTaamim.test(element)) {
            noTaamim += element;
            charPos.push(index);
          }
        }
        return [noTaamim, charPos];
      };
    }
  });

  // node_modules/havarotjs/dist/esm/utils/holemWaw.js
  var findMatches, holemWaw;
  var init_holemWaw = __esm({
    "node_modules/havarotjs/dist/esm/utils/holemWaw.js"() {
      init_regularExpressions();
      init_removeTaamim();
      findMatches = (word, regx, cb) => {
        regx.lastIndex = 0;
        const [noTaamim, charPos] = removeTaamim(word);
        const matches = noTaamim.matchAll(regx);
        if (!matches) {
          return word;
        }
        for (const match of matches) {
          const start = charPos[match.index];
          const end = charPos[match[0].length] + start;
          word = cb(word, start, end);
        }
        regx.lastIndex = 0;
        return word;
      };
      holemWaw = (word, options) => {
        const wawRegX = /\u{05D5}/u;
        const holemRegx = /\u{05B9}/u;
        const holemHaser = /\u{05BA}/u;
        const wawHolemRegX = /\u{05D5}\u{05B9}/u;
        const vowels3 = /[\u{05B0}-\u{05BB}\u{05C7}]/u;
        const vavHolemMale = new RegExp("(?<!" + vowels3.source + ")" + wawHolemRegX.source, "gu");
        const vavHolemHaser = new RegExp("(?<=" + vowels3.source + ")" + wawRegX.source + taamim.source + "?" + holemRegx.source, "gu");
        if (options.holemHaser === "remove" && holemHaser.test(word)) {
          word = word.replace(holemHaser, "\u05B9");
        }
        if (!wawRegX.test(word) || !holemRegx.test(word) || !wawHolemRegX.test(word)) {
          return word;
        }
        word = vavHolemMale.test(word) ? findMatches(word, vavHolemMale, () => {
          return word.replaceAll(vavHolemMale, "\u05B9\u05D5");
        }) : word;
        word = options.holemHaser === "update" && vavHolemHaser.test(removeTaamim(word)[0]) ? findMatches(word, vavHolemHaser, (w) => {
          const vavTaamHolem = new RegExp(`${wawRegX.source}(${taamim.source})?${holemRegx.source}`, "gu");
          return w.replace(vavTaamHolem, "\u05D5\u05BA$1");
        }) : word;
        return word;
      };
    }
  });

  // node_modules/havarotjs/dist/esm/utils/charMap.js
  var taamimCharToNameMap, isCharKeyOfTaamimNameToCharMap, taamimNameToCharMap, vowelCharToNameMap, isCharKeyOfVowelNameToCharMap, vowelNameToCharMap, consonantCharToNameMap, isCharKeyOfConsonantNameToCharMap, consonantNameToCharMap, charToNameMap, isCharKeyOfCharToNameMap, nameToCharMap;
  var init_charMap = __esm({
    "node_modules/havarotjs/dist/esm/utils/charMap.js"() {
      taamimCharToNameMap = {
        "\u0591": "ETNAHTA",
        "\u0592": "SEGOL_ACCENT",
        "\u0593": "SHALSHELET",
        "\u0594": "ZAQEF_QATAN",
        "\u0595": "ZAQEF_GADOL",
        "\u0596": "TIPEHA",
        "\u0597": "REVIA",
        "\u0598": "ZARQA",
        "\u0599": "PASHTA",
        "\u059A": "YETIV",
        "\u059B": "TEVIR",
        "\u059C": "GERESH",
        "\u059D": "GERESH_MUQDAM",
        "\u059E": "GERSHAYIM",
        "\u059F": "QARNEY_PARA",
        "\u05A0": "TELISHA_GEDOLA",
        "\u05A1": "PAZER",
        "\u05A2": "ATNAH_HAFUKH",
        "\u05A3": "MUNAH",
        "\u05A4": "MAHAPAKH",
        "\u05A5": "MERKHA",
        "\u05A6": "MERKHA_KEFULA",
        "\u05A7": "DARGA",
        "\u05A8": "QADMA",
        "\u05A9": "TELISHA_QETANA",
        "\u05AA": "YERAH_BEN_YOMO",
        "\u05AB": "OLE",
        "\u05AC": "ILUY",
        "\u05AD": "DEHI",
        "\u05AE": "ZINOR"
      };
      isCharKeyOfTaamimNameToCharMap = (char) => {
        return char in taamimCharToNameMap;
      };
      taamimNameToCharMap = {
        ETNAHTA: "\u0591",
        SEGOL_ACCENT: "\u0592",
        SHALSHELET: "\u0593",
        ZAQEF_QATAN: "\u0594",
        ZAQEF_GADOL: "\u0595",
        TIPEHA: "\u0596",
        REVIA: "\u0597",
        ZARQA: "\u0598",
        PASHTA: "\u0599",
        YETIV: "\u059A",
        TEVIR: "\u059B",
        GERESH: "\u059C",
        GERESH_MUQDAM: "\u059D",
        GERSHAYIM: "\u059E",
        QARNEY_PARA: "\u059F",
        TELISHA_GEDOLA: "\u05A0",
        PAZER: "\u05A1",
        ATNAH_HAFUKH: "\u05A2",
        MUNAH: "\u05A3",
        MAHAPAKH: "\u05A4",
        MERKHA: "\u05A5",
        MERKHA_KEFULA: "\u05A6",
        DARGA: "\u05A7",
        QADMA: "\u05A8",
        TELISHA_QETANA: "\u05A9",
        YERAH_BEN_YOMO: "\u05AA",
        OLE: "\u05AB",
        ILUY: "\u05AC",
        DEHI: "\u05AD",
        ZINOR: "\u05AE"
      };
      vowelCharToNameMap = {
        "\u05B1": "HATAF_SEGOL",
        "\u05B2": "HATAF_PATAH",
        "\u05B3": "HATAF_QAMATS",
        "\u05B4": "HIRIQ",
        "\u05B5": "TSERE",
        "\u05B6": "SEGOL",
        "\u05B7": "PATAH",
        "\u05B8": "QAMATS",
        "\u05B9": "HOLAM",
        "\u05BA": "HOLAM_HASER",
        "\u05BB": "QUBUTS",
        "\u05C7": "QAMATS_QATAN"
      };
      isCharKeyOfVowelNameToCharMap = (char) => {
        return char in vowelCharToNameMap;
      };
      vowelNameToCharMap = {
        HATAF_SEGOL: "\u05B1",
        HATAF_PATAH: "\u05B2",
        HATAF_QAMATS: "\u05B3",
        HIRIQ: "\u05B4",
        TSERE: "\u05B5",
        SEGOL: "\u05B6",
        PATAH: "\u05B7",
        QAMATS: "\u05B8",
        HOLAM: "\u05B9",
        HOLAM_HASER: "\u05BA",
        QUBUTS: "\u05BB",
        QAMATS_QATAN: "\u05C7"
      };
      consonantCharToNameMap = {
        "\u05D0": "ALEF",
        "\u05D1": "BET",
        "\u05D2": "GIMEL",
        "\u05D3": "DALET",
        "\u05D4": "HE",
        "\u05D5": "VAV",
        "\u05D6": "ZAYIN",
        "\u05D7": "HET",
        "\u05D8": "TET",
        "\u05D9": "YOD",
        "\u05DA": "FINAL_KAF",
        "\u05DB": "KAF",
        "\u05DC": "LAMED",
        "\u05DD": "FINAL_MEM",
        "\u05DE": "MEM",
        "\u05DF": "FINAL_NUN",
        "\u05E0": "NUN",
        "\u05E1": "SAMEKH",
        "\u05E2": "AYIN",
        "\u05E3": "FINAL_PE",
        "\u05E4": "PE",
        "\u05E5": "FINAL_TSADI",
        "\u05E6": "TSADI",
        "\u05E7": "QOF",
        "\u05E8": "RESH",
        "\u05E9": "SHIN",
        "\u05EA": "TAV"
      };
      isCharKeyOfConsonantNameToCharMap = (char) => {
        return char in consonantCharToNameMap;
      };
      consonantNameToCharMap = {
        ALEF: "\u05D0",
        BET: "\u05D1",
        GIMEL: "\u05D2",
        DALET: "\u05D3",
        HE: "\u05D4",
        VAV: "\u05D5",
        ZAYIN: "\u05D6",
        HET: "\u05D7",
        TET: "\u05D8",
        YOD: "\u05D9",
        FINAL_KAF: "\u05DA",
        KAF: "\u05DB",
        LAMED: "\u05DC",
        FINAL_MEM: "\u05DD",
        MEM: "\u05DE",
        FINAL_NUN: "\u05DF",
        NUN: "\u05E0",
        SAMEKH: "\u05E1",
        AYIN: "\u05E2",
        FINAL_PE: "\u05E3",
        PE: "\u05E4",
        FINAL_TSADI: "\u05E5",
        TSADI: "\u05E6",
        QOF: "\u05E7",
        RESH: "\u05E8",
        SHIN: "\u05E9",
        TAV: "\u05EA"
      };
      charToNameMap = {
        ...taamimCharToNameMap,
        ...vowelCharToNameMap,
        ...consonantCharToNameMap,
        // ------
        // SHEVA
        // ------
        "\u05B0": "SHEVA",
        // ------
        // DAGESH & RAFE
        // ------
        "\u05BC": "DAGESH",
        "\u05BF": "RAFE",
        // ------
        // PUNCTUATION
        // ------
        "\u05BE": "MAQAF",
        "\u05C0": "PASEQ",
        "\u05C3": "SOF_PASUQ",
        "\u05C6": "NUN_HAFUKHA",
        "\u05F3": "GERESH_PUNCTUATION",
        "\u05F4": "GERSHAYIM_PUNCTUATION",
        // ------
        // LIGATURES
        // ------
        "\u05C1": "SHIN_DOT",
        "\u05C2": "SIN_DOT",
        // ------
        // MARKS
        // ------
        "\u05AF": "MASORA_CIRCLE",
        "\u05C4": "UPPER_DOT",
        "\u05C5": "LOWER_DOT",
        // ------
        // YOD TRIANGLE
        // ------
        "\u05EF": "YOD_TRIANGLE",
        // ------
        // YIDDISH
        // ------
        "\u05F0": "DOUBLE_VAV",
        "\u05F1": "VAV_YOD",
        "\u05F2": "DOUBLE_YOD"
      };
      isCharKeyOfCharToNameMap = (char) => {
        return char in charToNameMap;
      };
      nameToCharMap = {
        ...taamimNameToCharMap,
        ...vowelNameToCharMap,
        ...consonantNameToCharMap,
        // ------
        // SHEVA
        // ------
        SHEVA: "\u05B0",
        // ------
        // DAGESH & RAFE
        // ------
        DAGESH: "\u05BC",
        RAFE: "\u05BF",
        // ------
        // PUNCTUATION
        // ------
        MAQAF: "\u05BE",
        PASEQ: "\u05C0",
        SOF_PASUQ: "\u05C3",
        NUN_HAFUKHA: "\u05C6",
        GERESH_PUNCTUATION: "\u05F3",
        GERSHAYIM_PUNCTUATION: "\u05F4",
        // ------
        // LIGATURES
        // ------
        SHIN_DOT: "\u05C1",
        SIN_DOT: "\u05C2",
        // ------
        // MARKS
        // ------
        MASORA_CIRCLE: "\u05AF",
        UPPER_DOT: "\u05C4",
        LOWER_DOT: "\u05C5",
        // ------
        // YOD TRIANGLE
        // ------
        YOD_TRIANGLE: "\u05EF",
        // ------
        // YIDDISH
        // ------
        DOUBLE_VAV: "\u05F0",
        VAV_YOD: "\u05F1",
        DOUBLE_YOD: "\u05F2"
      };
    }
  });

  // node_modules/havarotjs/dist/esm/char.js
  var __classPrivateFieldSet, __classPrivateFieldGet, _Char_text, _Char_cluster, _Char_sequencePosition, Char;
  var init_char = __esm({
    "node_modules/havarotjs/dist/esm/char.js"() {
      init_charMap();
      init_regularExpressions();
      __classPrivateFieldSet = function(receiver, state, value, kind, f2) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldGet = function(receiver, state, kind, f2) {
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
      };
      Char = class _Char {
        constructor(char) {
          _Char_text.set(this, void 0);
          _Char_cluster.set(this, null);
          _Char_sequencePosition.set(this, void 0);
          this.isCharKeyOfCharToNameMap = isCharKeyOfCharToNameMap;
          __classPrivateFieldSet(this, _Char_text, char, "f");
          __classPrivateFieldSet(this, _Char_sequencePosition, this.findPos(), "f");
        }
        findPos() {
          const char = this.text;
          if (_Char.consonants.test(char)) {
            return 0;
          }
          if (_Char.ligatures.test(char)) {
            return 1;
          }
          if (_Char.dagesh.test(char)) {
            return 2;
          }
          if (_Char.rafe.test(char)) {
            return 2;
          }
          if (_Char.vowels.test(char)) {
            return 3;
          }
          if (_Char.sheva.test(char)) {
            return 3;
          }
          if (_Char.taamim.test(char)) {
            return 4;
          }
          if (_Char.meteg.test(char)) {
            return 4;
          }
          return 10;
        }
        static get consonants() {
          return consonants;
        }
        static get dagesh() {
          return dagesh;
        }
        static get ligatures() {
          return ligatures;
        }
        static get meteg() {
          return meteg;
        }
        static get rafe() {
          return rafe;
        }
        static get sheva() {
          return sheva;
        }
        static get taamim() {
          return taamim;
        }
        static get vowels() {
          return vowels;
        }
        /**
         * The parent `Cluster` of the `Char`, if any.
         *
         * ```typescript
         * const text: Text = new Text("דָּבָר");
         * const firstChar = text.chars[0];
         * firstChar.text;
         * // "ד"
         * firstChar.cluster?.text;
         * // "דָּ"
         * ```
         */
        get cluster() {
          return __classPrivateFieldGet(this, _Char_cluster, "f");
        }
        set cluster(cluster) {
          __classPrivateFieldSet(this, _Char_cluster, cluster, "f");
        }
        isCharacterName(name) {
          if (!nameToCharMap[name]) {
            throw new Error(`${name} is not a valid value`);
          }
          const match = __classPrivateFieldGet(this, _Char_text, "f").match(nameToCharMap[name]);
          return !!match;
        }
        /**
         * Returns `true` if the `Char` is a consonant
         *
         * ```typescript
         * const text: Text = new Text("אֱלֹהִ֑ים");
         * text.chars[0].isConsonant;
         * // true
         * ```
         */
        get isConsonant() {
          return _Char.consonants.test(__classPrivateFieldGet(this, _Char_text, "f"));
        }
        /**
         * Returns `true` if the `Char` is a ligature
         *
         * ```typescript
         * const text: Text = new Text("שָׁלֽוֹם");
         * text.chars[1].isLigature;
         * // true
         * ```
         */
        get isLigature() {
          return _Char.ligatures.test(__classPrivateFieldGet(this, _Char_text, "f"));
        }
        /**
         * Returns `true` if the `Char` is a dagesh
         *
         * ```typescript
         * const text: Text = new Text("בּ");
         * text.chars[1].isDagesh;
         * // true
         */
        get isDagesh() {
          return _Char.dagesh.test(__classPrivateFieldGet(this, _Char_text, "f"));
        }
        /**
         * Returns `true` if the `Char` is a rafe
         *
         * ```typescript
         * const text: Text = new Text("בֿ");
         * text.chars[1].isRafe;
         * // true
         * ```
         */
        get isRafe() {
          return _Char.rafe.test(__classPrivateFieldGet(this, _Char_text, "f"));
        }
        /**
         * Returns `true` if the `Char` is a sheva
         * ```typescript
         * const text: Text = new Text("בְ");
         * text.chars[1].isSheva;
         * // true
         * ```
         */
        get isSheva() {
          return _Char.sheva.test(__classPrivateFieldGet(this, _Char_text, "f"));
        }
        /**
         * Returns `true` if the `Char` is a sheva
         *
         *
         * ```typescript
         * const text: Text = new Text("בֺ");
         * text.chars[1].isVowel;
         * // true
         * ```
         */
        get isVowel() {
          return _Char.vowels.test(__classPrivateFieldGet(this, _Char_text, "f"));
        }
        /**
         * Returns `true` if the `Char` is a taamim
         *
         * ```typescript
         * const text: Text = new Text("בֺ֨");
         * text.chars[2].isTaamim;
         * // true
         * ```
         */
        get isTaamim() {
          return _Char.taamim.test(__classPrivateFieldGet(this, _Char_text, "f"));
        }
        /**
         * Returns `true` if the `Char` is not a Hebrew character
         *
         * ```typescript
         * const text: Text = new Text("a");
         * text.chars[0].isNotHebrew;
         * // true
         * ```
         */
        get isNotHebrew() {
          return this.sequencePosition === 10;
        }
        /**
         * Returns the name of the character
         *
         * ```typescript
         * const text: Text = new Text("אֱלֹהִ֑ים");
         * text.chars[0].characterName;
         * // "ALEF"
         * ```
         */
        get characterName() {
          const text = __classPrivateFieldGet(this, _Char_text, "f");
          if (this.isCharKeyOfCharToNameMap(text)) {
            return charToNameMap[text];
          }
          return null;
        }
        /**
         * @returns a number used for sequencing
         *
         * - consonants = 0
         * - ligatures = 1
         * - dagesh or rafe = 2
         * - niqqud (i.e vowels) = 3
         * - taamim (i.e. accents) = 4
         *
         * ```typescript
         * const text: Text = new Text("אֱלֹהִ֑ים");
         * text.chars[0].sequencePosition; // the aleph
         * // 0
         * text.chars[1].sequencePosition; // the segol
         * // 3
         * ```
         */
        get sequencePosition() {
          return __classPrivateFieldGet(this, _Char_sequencePosition, "f");
        }
        /**
         * @returns the text of the Char
         *
         * ```typescript
         * const text: Text = new Text("אֱלֹהִ֑ים");
         * text.chars[0].text;
         * // "א"
         * ```
         */
        get text() {
          return __classPrivateFieldGet(this, _Char_text, "f");
        }
      };
      _Char_text = /* @__PURE__ */ new WeakMap(), _Char_cluster = /* @__PURE__ */ new WeakMap(), _Char_sequencePosition = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/havarotjs/dist/esm/node.js
  var Node2;
  var init_node = __esm({
    "node_modules/havarotjs/dist/esm/node.js"() {
      Node2 = class {
        constructor() {
          this.value = null;
          this.next = null;
          this.prev = null;
        }
        set children(arr) {
          const head = arr[0];
          const remainder = arr.slice(1);
          this.child = head;
          head.siblings = remainder;
        }
        set siblings(arr) {
          const len = arr.length;
          for (let index = 0; index < len; index++) {
            const curr = arr[index];
            const nxt = arr[index + 1] || null;
            const prv = arr[index - 1] || this;
            curr.prev = prv;
            prv.next = curr;
            curr.next = nxt;
          }
        }
        get siblings() {
          let curr = this.next;
          const res = [];
          while (curr) {
            res.push(curr);
            curr = curr.next;
          }
          return res;
        }
      };
    }
  });

  // node_modules/havarotjs/dist/esm/cluster.js
  var __classPrivateFieldSet2, __classPrivateFieldGet2, _Cluster_consonantsCache, _Cluster_consonantNameCache, _Cluster_original, _Cluster_sequenced, _Cluster_syllable, _Cluster_taamimCache, _Cluster_vowelsCache, _Cluster_vowelNamesCache, _Cluster_taamimNamesCache, Cluster;
  var init_cluster = __esm({
    "node_modules/havarotjs/dist/esm/cluster.js"() {
      init_char();
      init_node();
      init_charMap();
      init_regularExpressions();
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f2) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f2) {
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
      };
      Cluster = class _Cluster extends Node2 {
        /**
         * Creates a new cluster
         *
         * @param cluster - the original cluster
         * @param noSequence - whether to sequence the cluster
         *
         * @example
         * ```ts
         * const str = "הָ";
         * const cluster = new Cluster(str);
         * cluster.text;
         * // "הָ"
         * ```
         */
        constructor(cluster, noSequence = false) {
          super();
          _Cluster_consonantsCache.set(this, null);
          _Cluster_consonantNameCache.set(this, null);
          _Cluster_original.set(this, void 0);
          _Cluster_sequenced.set(this, void 0);
          _Cluster_syllable.set(this, null);
          _Cluster_taamimCache.set(this, null);
          _Cluster_vowelsCache.set(this, null);
          _Cluster_vowelNamesCache.set(this, null);
          _Cluster_taamimNamesCache.set(this, null);
          this.isCharKeyOfConsonantNameToCharMap = isCharKeyOfConsonantNameToCharMap;
          this.isCharKeyOfTaamimNameToCharMap = isCharKeyOfTaamimNameToCharMap;
          this.isCharKeyOfVowelNameToCharMap = isCharKeyOfVowelNameToCharMap;
          this.value = this;
          __classPrivateFieldSet2(this, _Cluster_original, cluster, "f");
          __classPrivateFieldSet2(this, _Cluster_sequenced, this.sequence(noSequence), "f");
          __classPrivateFieldGet2(this, _Cluster_sequenced, "f").forEach((char) => char.cluster = this);
        }
        sequence(noSequence = false) {
          const chars = [...this.original].map((char) => new Char(char));
          return noSequence ? chars : chars.sort((a, b) => a.sequencePosition - b.sequencePosition);
        }
        get hasMetegCharacter() {
          return _Cluster.meteg.test(this.text);
        }
        static get meteg() {
          return meteg;
        }
        /**
         * Gets all the {@link Char | characters} in the Cluster
         *
         * @returns an array of sequenced Char objects
         *
         * @example
         * ```ts
         * const text = new Text("הֲבָרֹות");
         * text.clusters[0].chars;
         * // [
         * //  Char { original: "ה" },
         * //  Char { original: "ֲ " },   i.e. \u{05B2} (does not print well)
         * // ]
         * ```
         */
        get chars() {
          return __classPrivateFieldGet2(this, _Cluster_sequenced, "f");
        }
        /**
         * Gets all the consonant characters in the cluster
         *
         * @returns an array of the consonant characters in the cluster
         *
         * @example
         * ```ts
         * const text = new Text("הֲבָרֹות");
         * text.clusters[0].consonants;
         * // ["ה"]
         * ```
         *
         * @warning
         * This can only every return one consonant, as a `Cluster` is defined by having only one consonant.
         * Though it is impossible to have two consonants in a cluster, this api is meant for consistency with `vowels` and `taamim`
         */
        get consonants() {
          if (__classPrivateFieldGet2(this, _Cluster_consonantsCache, "f")) {
            return __classPrivateFieldGet2(this, _Cluster_consonantsCache, "f");
          }
          const consonants2 = this.chars.reduce((a, char) => {
            const text = char.text;
            if (char.isConsonant && this.isCharKeyOfConsonantNameToCharMap(text)) {
              a.push(text);
            }
            return a;
          }, []);
          return __classPrivateFieldSet2(this, _Cluster_consonantsCache, consonants2, "f");
        }
        /**
         * Gets all consonant names in the cluster.
         *
         * @returns an array of the consonant names in the cluster
         *
         * @example
         * ```ts
         * const text = new Text("הֲבָרֹות");
         * text.clusters[0].consonantNames;
         * // ["HE"]
         * ```
         *
         * @warning
         * This can only every return one consonant, as a `Cluster` is defined by having only one consonant.
         * Though it is impossible to have two consonants in a cluster, this api is meant for consistency with `vowelNames` and `taamimNames`
         */
        get consonantNames() {
          if (__classPrivateFieldGet2(this, _Cluster_consonantNameCache, "f")) {
            return __classPrivateFieldGet2(this, _Cluster_consonantNameCache, "f");
          }
          const consonantNames = this.chars.reduce((a, char) => {
            const text = char.text;
            if (char.isConsonant && this.isCharKeyOfConsonantNameToCharMap(text)) {
              a.push(charToNameMap[text]);
            }
            return a;
          }, []);
          return __classPrivateFieldSet2(this, _Cluster_consonantNameCache, consonantNames, "f");
        }
        /**
         * Checks if the cluster contains the consonant character of the name passed in
         *
         * @returns a boolean indicating if the cluster contains the consonant character of the name passed in
         *
         * @example
         * ```ts
         * const text = new Text("הֲבָרֹות");
         * text.clusters[0].hasConsonantName("HE");
         * // true
         * text.clusters[0].hasConsonantName("BET");
         * // false
         * ```
         */
        hasConsonantName(name) {
          if (!consonantNameToCharMap[name]) {
            throw new Error(`${name} is not a valid value`);
          }
          return this.consonantNames.includes(name);
        }
        /**
         * Checks if the cluster contains a half-vowel
         *
         * @returns a boolean indicating if the cluster contains a half-vowel
         *
         * @example
         * ```ts
         * const text = new Text("הֲבָרֹות");
         * text.clusters[0].hasHalfVowel;
         * // true
         * text.clusters[1].hasHalfVowel;
         * // false
         * ```
         *
         * @description
         * The following characters are considered half-vowels:
         * - \u{05B1} HATAF SEGOL
         * - \u{05B2} HATAF PATAH
         * - \u{05B3} HATAF QAMATS
         */
        get hasHalfVowel() {
          return /[\u{05B1}-\u{05B3}]/u.test(this.text);
        }
        /**
         * Checks if the cluster contains a long vowel
         *
         * @returns a boolean indicating if the cluster contains a long vowel
         *
         * @example
         * ```ts
         * const text = new Text("הֲבָרֹות");
         * text.clusters[0].hasLongVowel;
         * // false
         * text.clusters[1].hasLongVowel;
         * // true
         * ```
         *
         * @description
         * The following characters are considered long vowels:
         * - \u{05B5} TSERE
         * - \u{05B8} QAMATS
         * - \u{05B9} HOLAM
         * - \u{05BA} HOLAM HASER FOR VAV
         */
        get hasLongVowel() {
          return /[\u{05B5}\u{05B8}\u{05B9}\u{05BA}]/u.test(this.text);
        }
        /**
         * Checks if the cluster contains a _meteg_
         *
         * @returns a boolean indicating if the cluster contains a _meteg_
         *
         * @deprecated use `hasMeteg`
         *
         * ```typescript
         * const text: Text = new Text("נַפְשִֽׁי׃");
         * text.clusters[2].hasMetheg;
         * // true
         * ```
         *
         * @description
         * Checks if the following character is present and a _sof pasuq_ does not follow it:
         * - \u{05BD} METEG
         */
        get hasMetheg() {
          return this.hasMeteg;
        }
        /**
         * Checks if the cluster contains a _meteg_
         *
         * @returns a boolean indicating if the cluster contains a _meteg_
         *
         * ```ts
         * const text = new Text("נַפְשִֽׁי׃");
         * text.clusters[2].hasMetheg;
         * // truw
         * ```
         *
         * @description
         * Checks if the following character is present and a _sof pasuq_ does not follow it:
         * - \u{05BD} METEG
         */
        get hasMeteg() {
          if (!this.hasMetegCharacter) {
            return false;
          }
          let next = this.next;
          while (next) {
            if (next instanceof _Cluster) {
              const nextText = next.text;
              const sofPassuq = /\u{05C3}/u;
              if (_Cluster.meteg.test(nextText)) {
                return true;
              }
              if (sofPassuq.test(nextText)) {
                return false;
              }
              next = next.next;
            }
          }
          return true;
        }
        /**
         * Checks if the cluster contains a sheva
         *
         * @returns a boolean indicating if the cluster contains a sheva
         *
         * @example
         * ```ts
         * const text = new Text("מַלְכָּה");
         * text.clusters[0].hasSheva;
         * // false
         * text.clusters[1].hasSheva;
         * // true
         * ```
         *
         * @description
         * Checks if the following character is present:
         * - \u{05B0} SHEVA
         */
        get hasSheva() {
          return /\u{05B0}/u.test(this.text);
        }
        /**
         * Checks if the cluster contains a sheva
         *
         * @returns a boolean indicating if the cluster contains a sheva
         *
         * @deprecated now use `hasSheva`
         *
         * ```ts
         * const text = new Text("מַלְכָּה");
         * text.clusters[0].hasSheva;
         * // false
         * text.clusters[1].hasSheva;
         * // true
         * ```
         *
         * @description
         * Checks if the following character is present:
         * - \u{05B0} SHEVA
         */
        get hasShewa() {
          return this.hasSheva;
        }
        /**
         * Checks if the cluster contains a short vowel
         *
         * @returns a boolean indicating if the cluster contains a short vowel
         *
         * @example
         * ```ts
         * const text = new Text("מַלְכָּה");
         * text.clusters[0].hasShortVowel;
         * // true
         * text.clusters[2].hasShortVowel;
         * // false
         * ```
         *
         * @description
         * The following characters are considered short vowels:
         * - \u{05B4} HIRIQ
         * - \u{05B6} SEGOL
         * - \u{05B7} PATAH
         * - \u{05BB} QUBUTS
         * - \u{05C7} QAMATS QATAN
         */
        get hasShortVowel() {
          return /[\u{05B4}\u{05B6}\u{05B7}\u{05BB}\u{05C7}]/u.test(this.text);
        }
        /**
         * Checks if the cluster contains a _silluq_
         *
         * @returns a boolean indicating if the cluster contains a _silluq_
         *
         * @example
         * ```ts
         * const text = new Text("הָאָֽרֶץ׃");
         * text.clusters[2].hasSilluq;
         * // true
         * ```
         *
         * @description
         * Checks if the following character is present and a _sof pasuq_ follows it:
         * - \u{05BD} METEG
         */
        get hasSilluq() {
          if (this.hasMetegCharacter && !this.hasMeteg) {
            return true;
          }
          return false;
        }
        /**
         * Checks if the cluster contains a taamim character
         *
         * @returns a boolean indicating if the cluster contains a taamim character
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.clusters[0].hasTaamName("TIPEHA");
         * // true
         * ```
         *
         * @description
         * Note: it only checks according to the character name, not its semantic meaning.
         * E.g. "כֵֽן׃" would be `true` when checking for `"METEG"`, not silluq
         */
        hasTaamName(name) {
          if (!taamimNameToCharMap[name]) {
            throw new Error(`${name} is not a valid value`);
          }
          return this.taamimNames.includes(name);
        }
        /**
         * Checks if the cluster contains a taamim character
         *
         * @returns a boolean indicating if the cluster contains a taamim character
         *
         * @example
         * ```ts
         * const text = new Text("אֱלֹהִ֑ים");
         * text.clusters[0].hasTaamim;
         * // false
         * text.clusters[2].hasTaamim;
         * // true
         * ```
         *
         * @description
         * The following characters are considered taamim:
         * - \u{0591}-\u{05AF}\u{05BF}\u{05C0}\u{05C3}-\u{05C6}\u{05F3}\u{05F4}
         */
        get hasTaamim() {
          return taamim.test(this.text);
        }
        /**
         * Checks if the cluster contains any vowel character
         *
         * @returns a boolean indicating if the cluster contains any vowel character
         *
         * @example
         * ```ts
         * const text = new Text("הֲבָרֹות");
         * text.clusters[0].hasVowel;
         * // true
         * text.clusters[4].hasVowel;
         * // false
         * ```
         *
         * @description
         * According to {@page Syllabification}, a sheva is a vowel and serves as the nucleus of a syllable.
         * Because `Cluster` is concerned with orthography, a sheva is **not** a vowel character.
         */
        get hasVowel() {
          return this.hasLongVowel || this.hasShortVowel || this.hasHalfVowel;
        }
        /**
         * Checks if the cluster contains the vowel character of the name passed in
         *
         * @returns a boolean indicating if the cluster contains the vowel character of the name passed in
         *
         * @example
         * ```ts
         * const text = new Text("הַיְחָבְרְךָ");
         * text.clusters[0].hasVowelName("PATAH");
         * // true
         * text.clusters[0].hasVowelName("HIRIQ");
         * // false
         * ```
         *
         * @description
         * According to {@page Syllabification}, a sheva is a vowel and serves as the nucleus of a syllable.
         * Because `Cluster` is concerned with orthography, a sheva is **not** a vowel character.
         */
        hasVowelName(name) {
          if (!vowelNameToCharMap[name]) {
            throw new Error(`${name} is not a valid value`);
          }
          return this.vowelNames.includes(name);
        }
        /**
         * Checks if the cluster is a _mater_ letter
         *
         * @returns a boolean indicating if the cluster is a _mater_ letter
         *
         * @example
         * ```ts
         * const text = new Text("סוּסָה");
         * text.clusters[1].isMater; // the shureq
         * // false
         * text.clusters[3].isMater; // the heh
         * // true
         * ```
         *
         * @description
         *
         * Returns `true` if `Cluster.hasVowel`, `Cluster.hasSheva`, `Cluster.isShureq`, and `Cluster.next.isShureq` are all `false` and `Cluster.text` contains a:
         * - `ה` preceded by a qamets, tsere, or segol
         * - `ו` preceded by a holem
         * - `י` preceded by a hiriq, tsere, or segol
         *
         * There are potentially other instances when a consonant may be a _mater_ (e.g. a silent aleph), but these are the most common.
         * Though a shureq is a _mater_ letter, it is also a vowel itself, and thus separate from `isMater`.
         */
        get isMater() {
          const nxtIsShureq = this.next instanceof _Cluster ? this.next.isShureq : false;
          if (!this.hasVowel && !this.isShureq && !this.hasSheva && !nxtIsShureq) {
            const text = this.text;
            const prevText = this.prev instanceof _Cluster ? this.prev.text : "";
            const maters = /[היו](?!\u{05BC})/u;
            if (!maters.test(text)) {
              return false;
            }
            if (/ה/.test(text) && /\u{05B8}|\u{05B6}|\u{05B5}/u.test(prevText)) {
              return true;
            }
            if (/ו/.test(text) && /\u{05B9}/u.test(prevText)) {
              return true;
            }
            if (/י/.test(text) && /\u{05B4}|\u{05B5}|\u{05B6}/u.test(prevText)) {
              return true;
            }
          }
          return false;
        }
        /**
         * Checks if the Cluster does not have Hebrew chars
         *
         * @returns a boolean indicating if the Cluster does not have Hebrew chars
         *
         * ```ts
         * * const text = new Text("(לְעֹלָם)");
         * text.clusters[0].isNotHebrew;
         * // true
         * ```
         */
        get isNotHebrew() {
          return !hebChars.test(this.text);
        }
        /**
         * Checks if the Cluster has any punctuation characters
         *
         * @returns a boolean indicating if the Cluster has any punctuation characters
         *
         * @example
         * ```ts
         * const text = new Text("הָאָֽרֶץ׃");
         * text.clusters[3].isPunctuation;
         * // true
         * ```
         *
         * @description
         * These are all the Hebrew characters of the category PUNCTUATION
         * - \u{05BE} HEBREW PUNCTUATION MAQAF ־
         * - \u{05C0} HEBREW PUNCTUATION PASEQ ׀
         * - \u{05C3} HEBREW PUNCTUATION SOF PASUQ ׃
         * - \u{05C6} HEBREW PUNCTUATION NUN HAFUKHA ׆
         */
        get isPunctuation() {
          const punctuationOnly = new RegExp(`^${punctuation.source}+$`, "u");
          return punctuationOnly.test(this.text);
        }
        /**
         * Checks if the Cluster is a shureq
         *
         * @returns a boolean indicating if the Cluster is a shureq
         *
         *
         * ```ts
         * const text = new Text("קוּם");
         * text.clusters[0].isShureq;
         * // false
         * text.clusters[1].isShureq;
         * // true
         * ```
         *
         * @description
         * Returns `true` if `Cluster.hasVowel`, `Cluster.hasSheva`, and `Cluster.prev.hasVowel` are all `false` and `Cluster.text` is a vav followed by a dagesh (e.g. `וּ`)
         * A shureq is a vowel itself, but contains no vowel characters (hence why `hasVowel` cannot be `true`).
         * This allows for easier syllabification.
         */
        get isShureq() {
          const shureq = /\u{05D5}\u{05BC}/u;
          const prvHasVowel = this.prev?.value?.hasVowel ?? false;
          return !this.hasVowel && !this.hasSheva && !prvHasVowel ? shureq.test(this.text) : false;
        }
        /**
         * Checks if the Cluster is a taam
         *
         * @returns a boolean indicating if the Cluster is a taam
         *
         * @example
         * ```ts
         * const text = new Text("הָאָֽרֶץ׃");
         * text.clusters[3].isTaam;
         * // true
         * ```
         *
         * @description
         * This is an alias for `isPunctuation`.
         * Returns `true` is the Cluster is any of the following characters:
         * - \u{05BE} HEBREW PUNCTUATION MAQAF ־
         * - \u{05C0} HEBREW PUNCTUATION PASEQ ׀
         * - \u{05C3} HEBREW PUNCTUATION SOF PASUQ ׃
         * - \u{05C6} HEBREW PUNCTUATION NUN HAFUKHA ׆
         *
         */
        get isTaam() {
          return this.isPunctuation;
        }
        /**
         * The original string passed
         *
         * @returns the original string passed
         *
         * @description
         * The original string passed to the constructor that has not been normalized or sequenced. See {@link text}
         */
        get original() {
          return __classPrivateFieldGet2(this, _Cluster_original, "f");
        }
        /**
         * The parent `Syllable` of the cluster
         *
         * ```ts
         * const text = new Text("דָּבָר");
         * const lastCluster: Cluster = text.clusters[2];
         * lastCluster.text;
         * // "ר"
         * lastCluster.syllable.text;
         * // "בָר"
         * ```
         *
         * @description
         * If created via the `Text` class, there should always be a syllable.
         */
        get syllable() {
          return __classPrivateFieldGet2(this, _Cluster_syllable, "f");
        }
        /**
         * Sets the parent `Syllable` of the cluster
         *
         */
        set syllable(syllable) {
          __classPrivateFieldSet2(this, _Cluster_syllable, syllable, "f");
        }
        /**
         * Gets all the taamim characters in the cluster
         *
         * @returns an array of taamim characters in the cluster
         *
         * ```ts
         * const text = new Text("אֱלֹהֶ֑֔יךָ");
         * text.clusters[2].taamim;
         * // ["֑", "֔"]
         * ```
         */
        get taamim() {
          if (__classPrivateFieldGet2(this, _Cluster_taamimCache, "f")) {
            return __classPrivateFieldGet2(this, _Cluster_taamimCache, "f");
          }
          const taamimChars = this.chars.reduce((a, char) => {
            if (char.isTaamim && this.isCharKeyOfTaamimNameToCharMap(char.text)) {
              a.push(char.text);
            }
            return a;
          }, []);
          return __classPrivateFieldSet2(this, _Cluster_taamimCache, taamimChars, "f");
        }
        /**
         * Gets all the names of the taamim characters in the cluster
         *
         * @returns an array of names of taamim characters in the cluster
         *
         * ```ts
         * const text = new Text("אֱלֹהֶ֑֔יךָ");
         * text.clusters[2].taam;
         * // ['ETNAHTA', 'ZAQEF_QATAN' ]
         * ```
         */
        get taamimNames() {
          if (__classPrivateFieldGet2(this, _Cluster_taamimNamesCache, "f")) {
            return __classPrivateFieldGet2(this, _Cluster_taamimNamesCache, "f");
          }
          const taaminNames = this.chars.reduce((a, char) => {
            const text = char.text;
            if (char.isTaamim && this.isCharKeyOfTaamimNameToCharMap(text)) {
              a.push(charToNameMap[text]);
            }
            return a;
          }, []);
          return __classPrivateFieldSet2(this, _Cluster_taamimNamesCache, taaminNames, "f");
        }
        /**
         * Gets text of the cluster
         *
         * @returns the text of the cluster that has been built up from the .text of its constituent `Char`s
         *
         * @example
         * ```ts
         * const text = new Text("הֲבָרֹות");
         * const clusters = text.clusters.map((cluster) => cluster.text);
         * // [
         * //  "הֲ",
         * //  "בָ",
         * //  "רֹ",
         * //  "ו",
         * //  "ת"
         * // ]
         * ```
         *
         * @description
         * The text has been normalized and sequenced — see {@link original} for text passed in the constructor.
         */
        get text() {
          return this.chars.reduce((init, char) => init + char.text, "");
        }
        /**
         * Gets all the names of the vowel characters in the cluster
         *
         * @returns an array of names of vowel characters in the cluster
         *
         * @example
         * ```ts
         * const text = new Text("הַֽ֭יְחָבְרְךָ");
         * text.clusters[0].vowelNames;
         * // ['PATAH']
         * ```
         *
         * @description
         * It is exceedingly rare to find more than one vowel character in a cluster.
         * According to {@page Syllabification}, a sheva is a vowel and serves as the nucleus of a syllable.
         * Because `Cluster` is concerned with orthography, a sheva is **not** a vowel character
         */
        get vowelNames() {
          if (__classPrivateFieldGet2(this, _Cluster_vowelNamesCache, "f")) {
            return __classPrivateFieldGet2(this, _Cluster_vowelNamesCache, "f");
          }
          const vowelNames = this.chars.reduce((a, char) => {
            if (char.isVowel && this.isCharKeyOfVowelNameToCharMap(char.text)) {
              a.push(charToNameMap[char.text]);
            }
            return a;
          }, []);
          return __classPrivateFieldSet2(this, _Cluster_vowelNamesCache, vowelNames, "f");
        }
        /**
         * Gets all the vowel characters in the cluster
         *
         * @returns an array of vowel characters in the cluster
         *
         * @example
         * ```ts
         * const text = new Text("הַֽ֭יְחָבְרְךָ");
         * text.clusters[0].vowel;
         * // "\u{05B7}"
         * text.clusters[3].vowel;
         * // null
         * ```
         *
         * @description
         * It is exceedingly rare to find more than one vowel character in a cluster.
         * According to {@page Syllabification}, a sheva is a vowel and serves as the nucleus of a syllable.
         * Because `Cluster` is concerned with orthography, a sheva is **not** a vowel character
         */
        get vowels() {
          if (__classPrivateFieldGet2(this, _Cluster_vowelsCache, "f")) {
            return __classPrivateFieldGet2(this, _Cluster_vowelsCache, "f");
          }
          const vowels3 = this.chars.reduce((a, char) => {
            const text = char.text;
            if (char.isVowel && this.isCharKeyOfVowelNameToCharMap(text)) {
              a.push(text);
            }
            return a;
          }, []);
          return __classPrivateFieldSet2(this, _Cluster_vowelsCache, vowels3, "f");
        }
      };
      _Cluster_consonantsCache = /* @__PURE__ */ new WeakMap(), _Cluster_consonantNameCache = /* @__PURE__ */ new WeakMap(), _Cluster_original = /* @__PURE__ */ new WeakMap(), _Cluster_sequenced = /* @__PURE__ */ new WeakMap(), _Cluster_syllable = /* @__PURE__ */ new WeakMap(), _Cluster_taamimCache = /* @__PURE__ */ new WeakMap(), _Cluster_vowelsCache = /* @__PURE__ */ new WeakMap(), _Cluster_vowelNamesCache = /* @__PURE__ */ new WeakMap(), _Cluster_taamimNamesCache = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/havarotjs/dist/esm/utils/sequence.js
  var sequence;
  var init_sequence = __esm({
    "node_modules/havarotjs/dist/esm/utils/sequence.js"() {
      init_cluster();
      sequence = (text) => {
        const splits = /(?=[\u{05C0}\u{05D0}-\u{05F2}])/u;
        const hiriqPatah = /\u{5B4}\u{5B7}/u;
        const hiriqQamets = /\u{5B4}\u{5B8}/u;
        if (hiriqPatah.test(text))
          text = text.replace(hiriqPatah, "\u05B7\u05B4");
        else if (hiriqQamets.test(text))
          text = text.replace(hiriqQamets, "\u05B8\u05B4");
        return text.split(splits).map((word) => new Cluster(word)).map((cluster) => cluster.chars);
      };
    }
  });

  // node_modules/havarotjs/dist/esm/utils/qametsQatan.js
  var snippets, wholeWords, sequenceSnippets, snippetsRegx, wholeWordsRegx, convertsQametsQatan;
  var init_qametsQatan = __esm({
    "node_modules/havarotjs/dist/esm/utils/qametsQatan.js"() {
      init_removeTaamim();
      init_sequence();
      snippets = [
        "\u05D0\u05B8\u05D1\u05B0\u05D3\u05B7\u05DF",
        "\u05D0\u05B8\u05D1\u05B0\u05E0",
        "\u05D0\u05B8\u05D6\u05B0\u05E0",
        "\u05D0\u05B8\u05DB\u05B0\u05DC",
        "\u05D0\u05B8\u05E0\u05B4\u05D9\u05BC",
        "\u05D0\u05B8\u05E4\u05B0\u05E0",
        "\u05D0\u05B8\u05E8\u05B0\u05D7",
        "\u05D0\u05B8\u05E8\u05B0\u05DB\u05BC",
        "\u05D0\u05B8\u05E9\u05B0\u05C1\u05E8",
        "\u05D1\u05B8\u05D0\u05B0\u05E9\u05C1",
        "\u05D1\u05B8\u05E9\u05B0\u05C1\u05EA\u05BC",
        "\u05D1\u05B8\u05BC\u05E9\u05B0\u05C1\u05EA\u05BC",
        "\u05D2\u05B8\u05D1\u05B0\u05D4",
        "\u05D2\u05B8\u05BC\u05D1\u05B0\u05D4",
        "\u05D2\u05B8\u05D3\u05B0\u05DC",
        "\u05D2\u05B8\u05BC\u05D3\u05B0\u05DC",
        "\u05D2\u05BC\u05B8\u05DC\u05B0\u05D9",
        // partial Goliath
        "\u05D2\u05B8\u05E8\u05B0\u05E0",
        "\u05D2\u05B8\u05BC\u05E8\u05B0\u05E0",
        "\u05D3\u05B8\u05BC\u05DB\u05B0\u05D9",
        "\u05D3\u05B8\u05BC\u05E8\u05B0\u05D1\u05B8\u05BD\u05DF",
        "\u05D7\u05B8\u05D3\u05B0\u05E9\u05C1",
        "\u05D7\u05B8\u05DB\u05B0\u05DE",
        "\u05D7\u05B8\u05DC\u05B0\u05D9\u05BD\u05D5\u05B9",
        "\u05D7\u05B8\u05DC\u05B0\u05D9\u05B9\u05D5",
        "\u05D7\u05B8\u05E4\u05B0\u05E0",
        "\u05D7\u05B8\u05E4\u05B0\u05E9\u05B4\u05C1\u05D9",
        "\u05D7\u05B8\u05E4\u05B0\u05E9\u05B4\u05C1\u05D9\u05EA",
        "\u05D7\u05B8\u05E8\u05B0\u05D1",
        "\u05D7\u05B8\u05E8\u05B0\u05E0\u05B6\u05E4\u05B6\u05E8",
        "\u05D7\u05B8\u05E8\u05B0\u05E4\u05BC",
        "\u05D7\u05B8\u05E9\u05B0\u05C1\u05DB\u05BC",
        "\u05D9\u05B8\u05E4\u05B0\u05D9",
        "\u05D9\u05B8\u05E9\u05B0\u05C1\u05E8",
        "\u05DE\u05B8\u05E8\u05B0\u05D3\u05B0\u05BC\u05DB\u05B7\u05D9",
        "\u05DE\u05B8\u05EA\u05B0\u05E0",
        "\u05E1\u05B8\u05DC\u05B0\u05EA\u05BC",
        "\u05E2\u05B8\u05D6\u05BC",
        "\u05E2\u05B8\u05DE\u05B0\u05E8\u05B4\u05D9",
        "\u05E2\u05B8\u05E0\u05B0\u05D9",
        "\u05E2\u05B8\u05E4\u05B0\u05E0\u05B4\u05D9",
        "\u05E2\u05B8\u05E4\u05B0\u05E8",
        "\u05E2\u05B8\u05E8\u05B0\u05DC",
        "\u05E2\u05B8\u05E8\u05B0\u05E4\u05BC",
        "\u05E2\u05B8\u05E9\u05B0\u05C1\u05E8",
        "\u05E6\u05B8\u05E8\u05B0\u05DB\u05BC",
        "\u05E7\u05B8\u05D3\u05B0\u05E7",
        "\u05E7\u05B8\u05D3\u05B0\u05E9\u05C1",
        "\u05E7\u05B8\u05E8\u05B0\u05D1\u05BC",
        "\u05E7\u05B8\u05E8\u05B0\u05D7",
        "\u05E8\u05B8\u05D2\u05B0\u05D6",
        "\u05E8\u05B8\u05D7\u05B0\u05D1\u05BC",
        "\u05E9\u05B8\u05C1\u05E8\u05B0\u05E9\u05C1",
        "\u05E9\u05B8\u05C1\u05E8\u05B8\u05E9\u05C1",
        "\u05EA\u05B8\u05BC\u05DB\u05B0\u05E0\u05B4\u05D9\u05EA"
      ];
      wholeWords = [
        // nouns
        "\u05D7\u05B8\u05E7\u05BE",
        "(\u05DE\u05B4)?\u05DB\u05B8\u05BC\u05DC\u05BE",
        // kol w/ maqqef optionally preceded by mem
        "(\u05D5\u05BC\u05D1\u05B0|\u05D5\u05B0|\u05D1\u05BC\u05B0|\u05DC\u05B0)?\u05DB\u05B8\u05DC\u05BE",
        // kol w/ maqqef optionally preceded by shureq + bet, waw, bet, or lamed
        "^(\u05DE\u05B4)?\u05DB\u05B8\u05BC\u05DC ?$",
        // kol w/o maqqef optionally preceded by mem
        "^(\u05D5\u05BC\u05D1\u05B0|\u05D5\u05B0|\u05D1\u05BC\u05B0|\u05DC\u05B0)?\u05DB\u05B8\u05DC ?$",
        // kol w/o maqqef optionally preceded by shureq + bet, waw, bet, or lamed
        "\u05DE\u05B8\u05E8\u05BE",
        "\u05E2\u05B8\u05EA\u05B0\u05E0\u05B4\u05D9\u05D0\u05B5\u05DC",
        "\u05E8\u05B8\u05D1\u05BE",
        "\u05EA\u05B8\u05DD\u05BE",
        "\u05EA\u05B8\u05BC\u05DD\u05BE",
        // verbs
        "\u05D7\u05B8\u05E0\u05B5\u05BC\u05E0\u05B4\u05D9",
        "\u05D5\u05B7\u05D9\u05B8\u05BC\u05DE\u05B8\u05EA",
        "\u05D5\u05B7\u05D9\u05B8\u05BC\u05E0\u05B8\u05E1",
        "\u05D5\u05B7\u05D9\u05B8\u05BC\u05E7\u05B8\u05DD",
        "\u05D5\u05B7\u05D9\u05B8\u05BC\u05E8\u05B8\u05DD",
        "\u05D5\u05B7\u05D9\u05B8\u05BC\u05E9\u05B8\u05C1\u05D1",
        "\u05D5\u05B7\u05EA\u05B8\u05BC\u05DE\u05B8\u05EA",
        "\u05D5\u05B7\u05EA\u05B8\u05BC\u05E7\u05B8\u05DD",
        "\u05D5\u05B7\u05EA\u05B8\u05BC\u05E9\u05B8\u05C1\u05D1"
      ];
      sequenceSnippets = (arr) => {
        return arr.map((snippet) => sequence(snippet.normalize("NFKD")).flat().reduce((a, c) => a + c.text, ""));
      };
      snippetsRegx = sequenceSnippets(snippets);
      wholeWordsRegx = sequenceSnippets(wholeWords);
      convertsQametsQatan = (word) => {
        const qametsReg = /\u{05B8}/u;
        const qametsQatReg = /\u{05C7}/u;
        const hatefQamRef = /\u{05B3}/u;
        if (!qametsReg.test(word) || qametsQatReg.test(word)) {
          return word;
        }
        if (hatefQamRef.test(word)) {
          const hatefPos = word.indexOf("\u05B3");
          const qamPos = word.indexOf("\u05B8");
          if (qamPos !== -1 && qamPos < hatefPos) {
            return word.substring(0, qamPos) + "\u05C7" + word.substring(qamPos + 1);
          }
        }
        const [noTaamim, charPos] = removeTaamim(word);
        for (const wholeWord of wholeWordsRegx) {
          const regEx = new RegExp(wholeWord);
          const match = noTaamim.match(regEx);
          if (!match) {
            continue;
          } else {
            const lastQam = word.lastIndexOf("\u05B8");
            return word.substring(0, lastQam) + "\u05C7" + word.substring(lastQam + 1);
          }
        }
        for (const snippet of snippetsRegx) {
          const regEx = new RegExp(snippet);
          const match = noTaamim.match(regEx);
          if (!match) {
            continue;
          } else {
            const start = charPos[match.index];
            const end = charPos[match[0].length] + start;
            const matched = word.substring(start, end);
            const withQQatan = matched.split(qametsReg).join("\u05C7");
            word = word.split(matched).join(withQQatan);
            return word;
          }
        }
        return word;
      };
    }
  });

  // node_modules/havarotjs/dist/esm/syllable.js
  var __classPrivateFieldSet3, __classPrivateFieldGet3, _Syllable_cachedStructure, _Syllable_cachedStructureWithGemination, _Syllable_clusters, _Syllable_isClosed, _Syllable_isAccented, _Syllable_isFinal, _Syllable_vowelsCache, _Syllable_vowelNamesCache, _Syllable_word, sylVowelCharToNameMap, sylVowelNameToCharMap, Syllable;
  var init_syllable = __esm({
    "node_modules/havarotjs/dist/esm/syllable.js"() {
      init_node();
      init_charMap();
      init_removeTaamim();
      __classPrivateFieldSet3 = function(receiver, state, value, kind, f2) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldGet3 = function(receiver, state, kind, f2) {
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
      };
      sylVowelCharToNameMap = {
        ...vowelCharToNameMap,
        /* eslint-disable  @typescript-eslint/naming-convention */
        "\u05B0": "SHEVA",
        "\u05D5\u05BC": "SHUREQ"
      };
      sylVowelNameToCharMap = {
        ...vowelNameToCharMap,
        /* eslint-disable  @typescript-eslint/naming-convention */
        SHEVA: "\u05B0",
        SHUREQ: "\u05D5\u05BC"
      };
      Syllable = class _Syllable extends Node2 {
        /**
         * Creates a new Syllable
         *
         * @param clusters an array of {@link Cluster}
         * @param options optional parameters
         *
         * @example
         * ```ts
         * new Syllable([new Cluster("אָ"), new Cluster("ב")]);
         * ```
         *
         * @description
         * See the {@page Syllabification} page for how a syllable is determined.
         * Currently, the Divine Name (e.g. יהוה), non-Hebrew text, and Hebrew punctuation (e.g. _passeq_, _nun hafucha_) are treated as a _single syllable_ because these do not follow the rules of Hebrew syllabification.
         */
        constructor(clusters, { isClosed = false, isAccented = false, isFinal = false } = {}) {
          super();
          _Syllable_cachedStructure.set(this, null);
          _Syllable_cachedStructureWithGemination.set(this, null);
          _Syllable_clusters.set(this, void 0);
          _Syllable_isClosed.set(this, void 0);
          _Syllable_isAccented.set(this, void 0);
          _Syllable_isFinal.set(this, void 0);
          _Syllable_vowelsCache.set(this, null);
          _Syllable_vowelNamesCache.set(this, null);
          _Syllable_word.set(this, null);
          this.value = this;
          __classPrivateFieldSet3(this, _Syllable_clusters, clusters, "f");
          __classPrivateFieldSet3(this, _Syllable_isClosed, isClosed, "f");
          __classPrivateFieldSet3(this, _Syllable_isAccented, isAccented, "f");
          __classPrivateFieldSet3(this, _Syllable_isFinal, isFinal, "f");
        }
        isCharKeyOfSyllableVowelCharToNameMap(char) {
          return char in sylVowelCharToNameMap;
        }
        /**
         * Gets all the {@link Char | characters} in the Syllable
         *
         * @returns a one dimensional array of {@link Char | characters}
         *
         * @example
         * ```ts
         * const text = new Text("וַיִּקְרָ֨א");
         * text.syllables[2].chars;
         * // [
         * //    Char { original: "ר" },
         * //    Char { original: "ָ" },
         * //    Char { original: "" }, i.e. \u{05A8} (does not print well)
         * //    Char { original: "א" }
         * //  ]
         * ```
         */
        get chars() {
          return this.clusters.map((cluster) => cluster.chars).flat();
        }
        /**
         * Gets all the {@link Cluster | clusters} in the Syllable
         *
         * @returns a one dimensional array of {@link Cluster | clusters}
         *
         * ```ts
         * const text = new Text("וַיִּקְרָ֨א");
         * text.syllables[1].clusters;
         * // [
         * //    Cluster { original: "יִּ" },
         * //    Cluster { original: "קְ" }
         * //  ]
         * ```
         */
        get clusters() {
          return __classPrivateFieldGet3(this, _Syllable_clusters, "f");
        }
        /**
         * Gets the coda of the syllable - see {@link structure}
         *
         * @returns the coda of the syllable as a string, including any taamim and ignoring gemination of the following syllable - see {@link codaWithGemination}
         *
         * @example
         * ```ts
         * const text = new Text("יָ֥ם");
         * text.syllables[0].coda;
         * // "ם"
         * ```
         */
        get coda() {
          return this.structure()[2];
        }
        /**
         * Gets the coda of the syllable, including gemination of the following syllable - see {@link structure}
         *
         * @returns the coda of the syllable as a string, including any taamim and including gemination of the following syllable - see {@link structure}
         *
         * @example
         * ```ts
         * const text = new Text("מַדּ֥וּעַ");
         * text.syllables[0].codaWithGemination;
         * // "דּ"
         * text.syllables[0].coda // without gemination
         * // ""
         * ```
         */
        get codaWithGemination() {
          return this.structure(true)[2];
        }
        /**
         * Gets the consonant _characters_ of the syllable
         *
         * @returns a one dimensional array of consonant characters
         *
         * @example
         * ```ts
         * const text = new Text("רְ֭שָׁעִים");
         * text.syllables[2].consonants;
         * // ["ע", "י", "ם"]
         * ```
         *
         * @description
         * This returns a one dimensional array of consonant characters, even if the characters are not phonemic consonants,
         * meaning even maters are returned as consonant characters. See the {@link structure} method if you need the consonants with phonemic value.
         *
         *
         */
        get consonants() {
          return this.clusters.map((cluster) => cluster.consonants).flat();
        }
        /**
         * Gets the names of the consonant _characters_ of the syllable
         *
         * @returns a one dimensional array of consonant character names
         *
         * @example
         * ```ts
         * const text = new Text("רְ֭שָׁעִים");
         * text.syllables[2].consonantNames;
         * // ["AYIN", "YOD", "FINAL_MEM"]
         * ```
         *
         * @description
         * This returns a one dimensional array of consonant names, even if the characters are not phonemic consonants,
         * meaning even the name of maters are returned. See the {@link structure} method if you need the consonants with phonemic value.
         */
        get consonantNames() {
          return this.clusters.map((cluster) => cluster.consonantNames).flat();
        }
        /**
         * Checks if the syllable contains the consonant _character_ matching the name passed in
         *
         * @returns a boolean indicating if the syllable contains the consonant _character_ matching the name passed in
         *
         * @example
         * ```ts
         * const text = new Text("רְ֭שָׁעִים");
         * text.syllables[2].hasConsonantName("AYIN");
         * // true
         * text.syllables[2].hasConsonantName("YOD");
         * // false
         * ```
         *
         * @description
         * This checks if the syllable contains the given consonant name, even if the character is not a phonemic consonant.
         */
        hasConsonantName(name) {
          if (!consonantNameToCharMap[name]) {
            throw new Error(`${name} is not a valid value`);
          }
          return this.consonantNames.includes(name);
        }
        /**
         * Checks if the syllable contains the vowel character of the name passed in
         *
         * @returns a boolean indicating if the syllable contains the vowel character of the name passed in
         *
         * @example
         * ```ts
         * const text = new Text("הַיְחָבְרְךָ");
         * text.syllables[0].hasVowelName("PATAH");
         * // true
         *
         * // test for vocal sheva
         * text.syllables[1].hasVowelName("SHEVA");
         * // true
         *
         * // test for silent sheva
         * text.syllables[2].hasVowelName("SHEVA");
         * // false
         * ```
         *
         * @description
         * This returns a boolean if the vowel character is present, even for most mater lectionis (e.g. in a holam vav construction, "HOLAM" would return true)
         * The only exception is a shureq, because there is no vowel character for a shureq.
         * According to {@page Syllabification}, a sheva is a vowel and serves as the nucleus of a syllable.
         * Unlike `Cluster`, a `Syllable` is concerned with linguistics, so a sheva **is** a vowel character.
         * It returns `true` for "SHEVA" only when the sheva is the vowel (i.e. a vocal sheva or sheva na').
         */
        hasVowelName(name) {
          if (!sylVowelNameToCharMap[name]) {
            throw new Error(`${name} is not a valid value`);
          }
          return this.vowelNames.includes(name);
        }
        /**
         * Checks if the syllable contains the taamim character of the name passed in
         *
         * @returns a boolean indicating if the syllable contains the taamim character of the name passed in
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.syllables[1].hasTaamName("TIPEHA");
         * // true
         * ```
         *
         * @description
         * Note: it only checks according to the character name, not its semantic meaning.
         * E.g. "כֵֽן׃" would be `true` when checking for `"METEG"`, not silluq
         */
        hasTaamName(name) {
          if (!taamimNameToCharMap[name]) {
            throw new Error(`${name} is not a valid value`);
          }
          return this.taamimNames.includes(name);
        }
        /**
         * Checks if the Syllable is accented
         *
         * @returns true if Syllable is accented
         *
         * @example
         * ```ts
         * const text = new Text("וַיִּקְרָ֨א"); // note the taam over the ר
         * text.syllables[0].isAccented; // i.e. "וַ"
         * // false
         * text.syllables[2].isAccented; // i.e. "רָ֨א"
         * // true
         * ```
         *
         * @description
         * An accented syllable receives stress, and is typically indicated by the presence of a taam character
         */
        get isAccented() {
          return __classPrivateFieldGet3(this, _Syllable_isAccented, "f");
        }
        /**
         * Sets whether the Syllable is accented
         *
         * @param accented a boolean indicating if the Syllable is accented
         *
         */
        set isAccented(accented) {
          __classPrivateFieldSet3(this, _Syllable_isAccented, accented, "f");
        }
        /**
         * Checks if the Syllable is closed
         *
         * @returns true if Syllable is closed
         *
         * @example
         * ```ts
         * const text = new Text("וַיִּקְרָ֨א");
         * text.syllables[0].isClosed; // i.e. "וַ"
         * // true
         * text.syllables[2].isClosed; // i.e. "רָ֨א"
         * // false
         * ```
         *
         * @description
         * A closed syllable in Hebrew is a CVC or CVCC type, a mater letter does not close a syllable
         */
        get isClosed() {
          return __classPrivateFieldGet3(this, _Syllable_isClosed, "f");
        }
        /**
         * Sets whether the Syllable is closed
         *
         * @param closed a boolean for whether the Syllable is closed
         *
         */
        set isClosed(closed) {
          __classPrivateFieldSet3(this, _Syllable_isClosed, closed, "f");
        }
        /**
         * Checks if the Syllable is the final syllable in a word
         *
         * @returns true if Syllable is final
         *
         * @example
         * ```ts
         * const text = new Text("וַיִּקְרָ֨א");
         * text.syllables[0].isFinal; // i.e. "וַ"
         * // false
         * text.syllables[2].isFinal; // i.e. "רָ֨א"
         * // true
         * ```
         */
        get isFinal() {
          return __classPrivateFieldGet3(this, _Syllable_isFinal, "f");
        }
        /**
         * Sets whether the Syllable is the final syllable in a word
         *
         * @param final a boolean for whether the Syllable is the final Syallble
         */
        set isFinal(final) {
          __classPrivateFieldSet3(this, _Syllable_isFinal, final, "f");
        }
        /**
         * Returns the nucleus of the syllable - see {@link structure}
         *
         * @returns the nucleus of the syllable as a string, including any taamim - see {@link structure}
         *
         * @example
         * ```ts
         * const text = new Text("יָ֥ם");
         * text.syllables[0].nucleus;
         * // "\u{05B8}\u{05A5}""
         * ```
         * @description
         * The nucleus is the vowel of the syllable - present in every syllable and containing its {@link vowel} (with any materes lecticonis) or a shureq.
         */
        get nucleus() {
          return this.structure()[1];
        }
        /**
         * Returns the onset of the syllable - see {@link structure}
         *
         * @returns the onset of the syllable as a string - see {@link structure}
         *
         * @example
         * ```ts
         * const text = new Text("יָ֥ם");
         * text.syllables[0].onset;
         * // "י"
         * ```
         * @description
         * The onset is any initial consonant of the syllable - present in every syllable except those containing a except word-initial shureq or a furtive patah.
         */
        get onset() {
          return this.structure()[0];
        }
        /**
         * Returns the structure of the syllable
         *
         * @returns the structure of the Syllable, i.e. the syllable's onset, nucleus, and coda.
         *
         * @param withGemination If this argument is `true`, include gemination of the next syllable's onset in this syllable's coda.
         *
         * ```ts
         * const text = new Text("מַדּוּעַ");
         * text.syllables.map(s => s.structure(true));
         * // [
         * //   [ 'מ', 'ַ', 'דּ' ],
         * //   [ 'דּ', 'וּ', '' ], NOTE: the dalet is the onset, but rendering can sometimes causes the blank string to appear to be first
         * //   [ '', 'ַ', 'ע' ]
         * // ]
         * ```
         *
         * @description
         * - The onset is any initial consonant of the syllable - present in every syllable except those containing a except word-initial shureq or a furtive patah.
         * - The nucleus is the vowel of the syllable - present in every syllable and containing its {@link vowel} (with any materes lecticonis) or a shureq.
         * - The coda is all final consonants of the syllable - not including any matres lecticonis, and including the onset of the subsequent syllable if the subsequent syllable is geminated and the `withGemination` argument is `true`.
         */
        structure(withGemination = false) {
          if (withGemination && __classPrivateFieldGet3(this, _Syllable_cachedStructureWithGemination, "f")) {
            return __classPrivateFieldGet3(this, _Syllable_cachedStructureWithGemination, "f");
          }
          if (!withGemination && __classPrivateFieldGet3(this, _Syllable_cachedStructure, "f")) {
            return __classPrivateFieldGet3(this, _Syllable_cachedStructure, "f");
          }
          const heClusters = this.clusters.filter((c) => !c.isNotHebrew);
          if (heClusters.length === 0) {
            const structure2 = ["", "", ""];
            __classPrivateFieldSet3(this, _Syllable_cachedStructure, structure2, "f");
            __classPrivateFieldSet3(this, _Syllable_cachedStructureWithGemination, structure2, "f");
            return structure2;
          }
          const first = heClusters[0];
          if (first.isShureq) {
            const structure2 = [
              "",
              first.text,
              heClusters.slice(1).map((c) => c.text).join("")
            ];
            __classPrivateFieldSet3(this, _Syllable_cachedStructure, structure2, "f");
            __classPrivateFieldSet3(this, _Syllable_cachedStructureWithGemination, structure2, "f");
            return structure2;
          }
          if (this.isFinal && !this.isClosed) {
            const matchFurtive = this.text.match(/(\u{05D7}|\u{05E2}|\u{05D4}\u{05BC})(\u{05B7})(\u{05C3})?$/mu);
            if (matchFurtive) {
              const structure2 = ["", matchFurtive[2], matchFurtive[1] + (matchFurtive[3] || "")];
              __classPrivateFieldSet3(this, _Syllable_cachedStructure, structure2, "f");
              __classPrivateFieldSet3(this, _Syllable_cachedStructureWithGemination, structure2, "f");
              return structure2;
            }
          }
          let [onset, nucleus, coda] = ["", "", ""];
          let i = 0;
          for (; i < first.chars.length && (first.chars[i].sequencePosition < 3 || first.chars[i].text === "\u05BD"); i++) {
            onset += first.chars[i].text;
          }
          for (; i < first.chars.length && [3, 4].includes(first.chars[i].sequencePosition); i++) {
            nucleus += first.chars[i].text;
          }
          for (; i < first.chars.length; i++) {
            coda += first.chars[i].text;
          }
          let clusters_processed = 1;
          if (coda.length === 0 && heClusters.length > 1 && (heClusters[1].isShureq || heClusters[1].isMater)) {
            nucleus += heClusters[1].text;
            clusters_processed++;
          }
          coda += heClusters.slice(clusters_processed).map((c) => c.text).join("");
          if (withGemination && coda.length === 0 && !/\u{05B0}/u.test(nucleus)) {
            if (this.next instanceof _Syllable) {
              const nextOnset = this.next.onset;
              if (/\u{05BC}/u.test(nextOnset)) {
                coda = nextOnset;
              }
            }
          }
          const structure = [onset, nucleus, coda];
          if (withGemination) {
            __classPrivateFieldSet3(this, _Syllable_cachedStructureWithGemination, structure, "f");
          } else {
            __classPrivateFieldSet3(this, _Syllable_cachedStructure, structure, "f");
          }
          return structure;
        }
        /**
         * Gets all the taamim characters in the Syllable
         *
         * @returns a one dimensional array of taamim characters in the syllable
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.syllables[1].taamim;
         * // ["\u{596}"]
         * ```
         */
        get taamim() {
          return this.clusters.map((c) => c.taamim).flat();
        }
        /**
         * Gets all the taamim names in the Syllable
         *
         * @returns a one dimensional array of taamim names in the syllable
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.syllables[1].taamimNames;
         * // ["TIPEHA"]
         * ```
         */
        get taamimNames() {
          return this.clusters.map((c) => c.taamimNames).flat();
        }
        /**
         * The text of the syllable
         *
         * @returns the sequenced and normalized text of the syllable
         *
         * @example
         * ```ts
         * const text = new Text("וַיִּקְרָ֨א");
         * text.syllables.map((syl) => syl.text);
         * //  [
         * //    "וַ"
         * //    "יִּקְ"
         * //    "רָ֨א"
         * //  ]
         * ```
         *
         * @description
         * This returns a string that has been built up from the .text of its constituent Clusters.
         */
        get text() {
          return this.clusters.map((c) => c.text).join("");
        }
        /**
         * Gets the names of the vowel characters in the syllable
         *
         * @returns an array of names of vowel characters in the syllable
         *
         * ```ts
         * const text = new Text("מִתָּ֑͏ַ֜חַת");
         * text.syllables[1].vowelNames;
         * // ["QAMATS", "PATAH"]
         * ```
         *
         * @description
         * This returns an array of names of vowel characters in the syllable, but not for mater lectionis (e.g. a holam vav would return the HOLAM, not the vav).
         * The only exception is a shureq, which returns "SHUREQ" because there is no vowel character for a shureq.
         * It is very uncommon to have multiple vowel characters in a syllable.
         * According to {@page Syllabification}, a sheva is a vowel and serves as the nucleus of a syllable.
         * Unlike `Cluster`, a `Syllable` is concerned with linguistics, so a sheva **is** a vowel character.
         */
        get vowelNames() {
          if (__classPrivateFieldGet3(this, _Syllable_vowelNamesCache, "f")) {
            return __classPrivateFieldGet3(this, _Syllable_vowelNamesCache, "f");
          }
          const vowelNames = this.vowels.reduce((a, vowel) => {
            if (sylVowelCharToNameMap[vowel]) {
              a.push(sylVowelCharToNameMap[vowel]);
            }
            return a;
          }, []).flat();
          return __classPrivateFieldSet3(this, _Syllable_vowelNamesCache, vowelNames, "f");
        }
        /**
         * Gets the vowel characters of the syllable
         *
         * @returns an array of vowel characters in the syllable
         *
         * @example
         * ```ts
         * const text = new Text("מִתָּ֑͏ַ֜חַת");
         * text.syllables[1].vowels;
         * // ["\u{05B8}", "\u{05B7}"]
         * ```
         *
         * @description
         * This returns a single vowel character, even for most mater lectionis (e.g. a holam vav would return the holam, not the vav).
         * The only exception is a shureq, which returns the vav and the dagesh because there is no vowel character for a shureq.
         * It is very uncommon to have multiple vowel characters in a syllable.
         * According to {@page Syllabification}, a sheva is a vowel and serves as the nucleus of a syllable.
         * Unlike `Cluster`, a `Syllable` is concerned with linguistics, so a sheva **is** a vowel character
         */
        get vowels() {
          if (__classPrivateFieldGet3(this, _Syllable_vowelsCache, "f")) {
            return __classPrivateFieldGet3(this, _Syllable_vowelsCache, "f");
          }
          const nucleus = this.nucleus;
          const noTaamim = removeTaamim(nucleus)[0];
          const shureq = sylVowelNameToCharMap.SHUREQ;
          const shureqPresentation = "\uFB35";
          const vowels3 = noTaamim.replace(shureq, shureqPresentation).split("").reduce((a, v) => {
            if (this.isCharKeyOfSyllableVowelCharToNameMap(v)) {
              a.push(v);
            }
            if (v === shureqPresentation) {
              a.push(shureq);
            }
            return a;
          }, []);
          return __classPrivateFieldSet3(this, _Syllable_vowelsCache, vowels3, "f");
        }
        /**
         * Gets the `Word` to which the syllable belongs
         *
         * @returns the `Word` to which the syllable belongs
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.syllables[0].word;
         * // Word {
         * //   text: "הָאָ֖רֶץ"
         * // }
         * ```
         */
        get word() {
          return __classPrivateFieldGet3(this, _Syllable_word, "f");
        }
        /**
         * Sets the `Word` to which the syllable belongs
         *
         * @param word - the `Word` to which the syllable belongs
         */
        set word(word) {
          __classPrivateFieldSet3(this, _Syllable_word, word, "f");
        }
      };
      _Syllable_cachedStructure = /* @__PURE__ */ new WeakMap(), _Syllable_cachedStructureWithGemination = /* @__PURE__ */ new WeakMap(), _Syllable_clusters = /* @__PURE__ */ new WeakMap(), _Syllable_isClosed = /* @__PURE__ */ new WeakMap(), _Syllable_isAccented = /* @__PURE__ */ new WeakMap(), _Syllable_isFinal = /* @__PURE__ */ new WeakMap(), _Syllable_vowelsCache = /* @__PURE__ */ new WeakMap(), _Syllable_vowelNamesCache = /* @__PURE__ */ new WeakMap(), _Syllable_word = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/havarotjs/dist/esm/utils/divineName.js
  var nonChars, isDivineName, hasDivineName;
  var init_divineName = __esm({
    "node_modules/havarotjs/dist/esm/utils/divineName.js"() {
      nonChars = /[^\u{05D0}-\u{05F4}]/gu;
      isDivineName = (text) => {
        return text.replace(nonChars, "") === "\u05D9\u05D4\u05D5\u05D4";
      };
      hasDivineName = (text) => {
        return /יהוה/.test(text.replace(nonChars, ""));
      };
    }
  });

  // node_modules/havarotjs/dist/esm/utils/syllabifier.js
  var createNewSyllable, groupFinal, groupShevas, groupMaters, groupShureqs, groupClusters, setIsClosed, setIsAccented, clusterPos, reinsertLatin, syllabify;
  var init_syllabifier = __esm({
    "node_modules/havarotjs/dist/esm/utils/syllabifier.js"() {
      init_cluster();
      init_syllable();
      init_regularExpressions();
      createNewSyllable = (result, syl, isClosed) => {
        isClosed = isClosed || false;
        const syllable = new Syllable(syl, { isClosed });
        result.push(syllable);
        return [];
      };
      groupFinal = (arr, vowelsRgx = vowels) => {
        const len = arr.length;
        let i = 0;
        const syl = [];
        let result = [];
        let vowelPresent = false;
        let finalCluster = arr[i];
        syl.unshift(finalCluster);
        if (finalCluster.isPunctuation && arr[i + 1]) {
          i++;
          finalCluster = arr[i];
          syl.unshift(finalCluster);
        }
        if (finalCluster.hasVowel) {
          vowelPresent = true;
          i++;
        } else if (finalCluster.isShureq) {
          i++;
          if (i <= len && arr[i]) {
            syl.unshift(arr[i]);
          }
          vowelPresent = true;
          i++;
        } else {
          i++;
        }
        while (!vowelPresent) {
          const nxt = arr[i];
          const curr = nxt ? nxt : false;
          if (!curr) {
            break;
          }
          syl.unshift(curr);
          if (curr.isShureq) {
            i++;
            if (arr[i])
              syl.unshift(arr[i]);
            vowelPresent = true;
          } else {
            const clusterHasVowel = "hasVowel" in curr ? curr.hasVowel : true;
            vowelPresent = clusterHasVowel || curr.isShureq;
          }
          i++;
          if (i > len) {
            break;
          }
        }
        const finalChar = finalCluster.chars.filter((c) => c.sequencePosition !== 4).at(-1)?.text || "";
        const hasFinalVowel = vowelsRgx.test(finalChar);
        const isClosed = !finalCluster.isShureq && !finalCluster.isMater && // if final cluster is an aleph, then the syllable is open (e.g. בָּרָ֣א)
        // unless the preceding cluster has a sheva (e.g. וַיַּ֧רְא)
        (!/\u{05D0}/u.test(finalCluster.text) || finalCluster?.prev?.value?.hasSheva) && // if the final cluster is an he but without a mappiq, then the syllable is open
        // this applies even to cases where the he is not a mater (e.g. פֹּ֖ה)
        !/\u{05D4}(?!\u{05bc})/u.test(finalCluster.text) && !hasFinalVowel;
        const finalSyllable = new Syllable(syl, { isClosed });
        const remainder = arr.slice(i);
        result = remainder.length ? remainder : [];
        result.unshift(finalSyllable);
        return result;
      };
      groupShevas = (arr, options) => {
        let shevaPresent = false;
        let syl = [];
        const result = [];
        const len = arr.length;
        const shevaNewSyllable = createNewSyllable.bind(groupShevas, result);
        for (let index = 0; index < len; index++) {
          const cluster = arr[index];
          if (cluster instanceof Syllable) {
            result.push(cluster);
            continue;
          }
          const clusterHasSheva = cluster.hasSheva;
          if (shevaPresent && clusterHasSheva) {
            syl = shevaNewSyllable(syl);
            syl.unshift(cluster);
            continue;
          }
          if (clusterHasSheva && cluster.hasMeteg && options.shevaWithMeteg) {
            syl.unshift(cluster);
            syl = shevaNewSyllable(syl);
            continue;
          }
          const consonant = cluster.chars[0].text;
          const prevConsonant = arr[index - 1]?.chars[0].text || "";
          const nextClusterVowel = arr[index + 1];
          if (!shevaPresent && clusterHasSheva && (consonant !== prevConsonant || nextClusterVowel instanceof Cluster && nextClusterVowel.hasShortVowel)) {
            shevaPresent = true;
            syl.unshift(cluster);
            continue;
          }
          if (shevaPresent && clusterHasSheva) {
            syl = shevaNewSyllable(syl);
            syl.unshift(cluster);
            continue;
          }
          if (shevaPresent && cluster.hasShortVowel) {
            if (options.shevaAfterMeteg && cluster.hasMeteg) {
              syl = shevaNewSyllable(syl);
              syl.unshift(cluster);
              continue;
            }
            const dageshRegx = /\u{05BC}/u;
            const prev = syl[0].text;
            const sqnmlvy = /[שסצקנמלוי]/;
            const wawConsecutive = /וַ/;
            if (dageshRegx.test(prev)) {
              syl = shevaNewSyllable(syl);
            } else if ((options.sqnmlvy || options.shevaAfterMeteg && cluster.hasMeteg) && sqnmlvy.test(prev) && wawConsecutive.test(cluster.text)) {
              syl = shevaNewSyllable(syl);
              result.push(new Syllable([cluster]));
              shevaPresent = false;
              continue;
            } else if (options.article && /[ילמ]/.test(prev) && /הַ/.test(cluster.text)) {
              syl = shevaNewSyllable(syl);
              result.push(new Syllable([cluster]));
              shevaPresent = false;
              continue;
            }
            syl.unshift(cluster);
            syl = shevaNewSyllable(syl, true);
            shevaPresent = false;
            continue;
          }
          if (shevaPresent && cluster.hasLongVowel) {
            if (options.longVowels || cluster.hasMeteg && options.shevaAfterMeteg) {
              syl = shevaNewSyllable(syl);
              result.push(cluster);
              shevaPresent = false;
            } else {
              syl.unshift(cluster);
              syl = shevaNewSyllable(syl, true);
              shevaPresent = false;
            }
            continue;
          }
          if (shevaPresent && cluster.isShureq) {
            if (!options.wawShureq && (!options.shevaAfterMeteg || !cluster.hasMeteg) && len - 1 === index) {
              syl.unshift(cluster);
              syl = shevaNewSyllable(syl, true);
            } else {
              syl = shevaNewSyllable(syl);
              result.push(cluster);
              shevaPresent = false;
            }
            continue;
          }
          if (shevaPresent && cluster.isMater && options.longVowels) {
            syl = shevaNewSyllable(syl);
            result.push(cluster);
            shevaPresent = false;
            continue;
          }
          if (shevaPresent && !cluster.hasVowel) {
            syl.unshift(cluster);
            continue;
          }
          result.push(cluster);
        }
        if (syl.length) {
          shevaNewSyllable(syl);
        }
        return result;
      };
      groupMaters = (arr, strict = true) => {
        const len = arr.length;
        let syl = [];
        const result = [];
        const materNewSyllable = createNewSyllable.bind(groupMaters, result);
        for (let index = 0; index < len; index++) {
          const cluster = arr[index];
          if (cluster instanceof Syllable) {
            result.push(cluster);
            continue;
          }
          if (cluster.isMater) {
            syl.unshift(cluster);
            const nxt = arr[index + 1];
            if (!nxt && strict) {
              const word = arr.map((i) => i.text).join("");
              throw new Error(`The cluster ${cluster.text} is a mater, but nothing precedes it in ${word}`);
            }
            if (nxt instanceof Syllable) {
              const word = arr.map((i) => i.text).join("");
              if (strict) {
                throw new Error(`Syllable ${nxt.text} should not precede a Cluster with a Mater in ${word}`);
              } else {
                syl.unshift(...nxt.clusters);
              }
            } else {
              syl.unshift(nxt);
            }
            syl = materNewSyllable(syl);
            index++;
          } else if (!cluster.hasVowel && /א/.test(cluster.text)) {
            syl.unshift(cluster);
            const nxt = arr[index + 1];
            if (!nxt && strict) {
              const word = arr.map((i) => i.text).join("");
              throw new Error(`The cluster ${cluster.text} is a quiesced alef, but nothing precedes it in ${word}`);
            }
            if (nxt instanceof Syllable) {
              result.push(cluster);
              continue;
            }
            if (nxt)
              syl.unshift(nxt);
            syl = materNewSyllable(syl);
            index++;
          } else {
            result.push(cluster);
          }
        }
        return result;
      };
      groupShureqs = (arr, strict = true) => {
        const len = arr.length;
        let syl = [];
        const result = [];
        const shureqNewSyllable = createNewSyllable.bind(groupShureqs, result);
        for (let index = 0; index < len; index++) {
          const cluster = arr[index];
          if (cluster instanceof Syllable) {
            result.push(cluster);
            continue;
          }
          if (cluster.isShureq) {
            syl.unshift(cluster);
            const nxt = arr[index + 1];
            if (strict && nxt instanceof Syllable) {
              const word = arr.map((i) => i.text).join("");
              throw new Error(`Syllable ${nxt.text} should not precede a Cluster with a Shureq in ${word}`);
            }
            if (nxt)
              syl.unshift(nxt);
            syl = shureqNewSyllable(syl);
            index++;
          } else {
            result.push(cluster);
          }
        }
        return result;
      };
      groupClusters = (arr, options) => {
        const rev = arr.reverse();
        const finalGrouped = groupFinal(rev);
        const shevasGrouped = groupShevas(finalGrouped, options);
        const shureqGroups = groupShureqs(shevasGrouped, options.strict);
        const matersGroups = groupMaters(shureqGroups, options.strict);
        const result = matersGroups.reverse();
        return result;
      };
      setIsClosed = (syllable, index, arr) => {
        if (index === arr.length - 1) {
          return;
        }
        if (!syllable.isClosed) {
          const dageshRegx = /\u{05BC}/u;
          const hasShortVowel = !!syllable.clusters.filter((cluster) => cluster.hasShortVowel).length;
          const hasNoVowel = hasShortVowel || !!(syllable.clusters.filter((cluster) => !cluster.hasVowel).length - 1);
          const prev = arr[index + 1];
          const prevDagesh = dageshRegx.test(prev.clusters[0].text);
          syllable.isClosed = (hasShortVowel || hasNoVowel) && prevDagesh;
        }
      };
      setIsAccented = (syllable) => {
        if (syllable.isAccented) {
          return;
        }
        const jerusalemFinal = /\u{5B4}\u{05DD}/u;
        const jerusalemPrev = /ל[\u{5B8}\u{5B7}]/u;
        let prev = syllable.prev?.value;
        if (jerusalemFinal.test(syllable.text) && prev && jerusalemPrev.test(prev.text)) {
          prev.isAccented = true;
          return;
        }
        const segolta = /\u{0592}/u;
        if (segolta.test(syllable.text)) {
          if (syllable.isFinal && prev) {
            while (prev) {
              if (segolta.test(prev.text)) {
                prev.isAccented = true;
                return;
              }
              prev = prev?.prev?.value ?? null;
            }
          }
          syllable.isAccented = true;
          return;
        }
        const zarqa = /\u{05AE}/u;
        if (zarqa.test(syllable.text)) {
          const zarqaHelper = /\u{0598}/u;
          if (syllable.isFinal && prev) {
            while (prev) {
              if (zarqaHelper.test(prev.text)) {
                prev.isAccented = true;
                return;
              }
              prev = prev?.prev?.value ?? null;
            }
          }
        }
        const sinnorit = /\u{0598}/u;
        if (sinnorit.test(syllable.text)) {
          syllable.isAccented = false;
          return;
        }
        const pashta = /\u{0599}/u;
        const sylText = syllable.text;
        if (syllable.isFinal && pashta.test(sylText)) {
          const qadma = /\u{05A8}/u;
          while (prev) {
            if (pashta.test(prev.text) || qadma.test(prev.text)) {
              return;
            }
            prev = prev?.prev?.value ?? null;
          }
        }
        const telishaQetana = /\u{05A9}/u;
        if (telishaQetana.test(syllable.text)) {
          while (prev) {
            if (telishaQetana.test(prev.text)) {
              prev.isAccented = true;
              return;
            }
            prev = prev?.prev?.value ?? null;
          }
          syllable.isAccented = true;
          return;
        }
        const teslishaGedola = /\u{05A0}/u;
        if (teslishaGedola.test(syllable.text)) {
          let next = syllable.next?.value;
          while (next) {
            if (teslishaGedola.test(next.text)) {
              next.isAccented = true;
              return;
            }
            next = next?.next?.value ?? null;
          }
          syllable.isAccented = true;
          return;
        }
        const ole = /\u{05AB}/u;
        if (ole.test(syllable.text)) {
          const yored = /\u{05A5}/u;
          let next = syllable.next?.value;
          while (next) {
            if (yored.test(next.text)) {
              next.isAccented = true;
              syllable.isAccented = false;
              return;
            }
            next = next?.next?.value ?? null;
          }
          syllable.isAccented = true;
          return;
        }
        const dechi = /\u{05AD}/u;
        if (dechi.test(syllable.text)) {
          let next = syllable.next?.value;
          while (next) {
            if (!next?.next) {
              next.isAccented = true;
              return;
            }
            next = next?.next?.value ?? null;
          }
        }
        const gereshMuqdam = /\u{059D}/u;
        if (gereshMuqdam.test(syllable.text)) {
          syllable.isAccented = false;
          return;
        }
        const isAccented = syllable.clusters.filter((cluster) => cluster.hasTaamim || cluster.hasSilluq ? true : false).length ? true : false;
        syllable.isAccented = isAccented;
      };
      clusterPos = (cluster, i) => {
        return { cluster, pos: i };
      };
      reinsertLatin = (syls, latin) => {
        const numOfSyls = syls.length;
        for (let index = 0; index < latin.length; index++) {
          const group = latin[index];
          const partial = [];
          if (group.pos === 0) {
            partial.push(group.cluster);
            while (index + 1 < latin.length && latin[index + 1].pos === group.pos + 1) {
              partial.push(latin[index + 1].cluster);
              index++;
            }
            const firstSyl = syls[0];
            syls[0] = new Syllable([...partial, ...firstSyl.clusters], {
              isAccented: firstSyl.isAccented,
              isClosed: firstSyl.isClosed,
              isFinal: firstSyl.isFinal
            });
          } else {
            const lastSyl = syls[numOfSyls - 1];
            while (index < latin.length) {
              partial.push(latin[index].cluster);
              index++;
            }
            syls[numOfSyls - 1] = new Syllable([...lastSyl.clusters, ...partial], {
              isAccented: lastSyl.isAccented,
              isClosed: lastSyl.isClosed,
              isFinal: lastSyl.isFinal
            });
          }
        }
        return syls;
      };
      syllabify = (clusters, options, isWordInConstruct) => {
        const removeLatin = clusters.filter((cluster) => !cluster.isNotHebrew);
        const latinClusters = clusters.map(clusterPos).filter((c) => c.cluster.isNotHebrew);
        const groupedClusters = groupClusters(removeLatin, options);
        const syllables = groupedClusters.map((group) => group instanceof Syllable ? group : new Syllable([group]));
        const [first, ...rest] = syllables;
        first.siblings = rest;
        syllables[syllables.length - 1].isFinal = true;
        syllables.forEach(setIsClosed);
        syllables.forEach(setIsAccented);
        if (!syllables.map((s) => s.isAccented).includes(true) && !isWordInConstruct) {
          syllables[syllables.length - 1].isAccented = true;
        }
        syllables.forEach((s) => s.clusters.forEach((c) => c.syllable = s));
        return latinClusters.length ? reinsertLatin(syllables, latinClusters) : syllables;
      };
    }
  });

  // node_modules/havarotjs/dist/esm/word.js
  var __classPrivateFieldSet4, __classPrivateFieldGet4, _Word_text, Word;
  var init_word = __esm({
    "node_modules/havarotjs/dist/esm/word.js"() {
      init_cluster();
      init_node();
      init_syllable();
      init_divineName();
      init_regularExpressions();
      init_syllabifier();
      __classPrivateFieldSet4 = function(receiver, state, value, kind, f2) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldGet4 = function(receiver, state, kind, f2) {
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
      };
      Word = class extends Node2 {
        constructor(text, sylOpts) {
          super();
          _Word_text.set(this, void 0);
          this.makeClusters = (word) => {
            const match = word.match(jerusalemTest);
            if (match?.groups) {
              const captured = match[0];
              const { hiriq, vowel, taamimMatch, mem } = match.groups;
              const partial = word.replace(captured, `${vowel}${taamimMatch}`);
              return [...partial.split(clusterSplitGroup), `${hiriq}${mem}`].map((group) => {
                if (group === `${hiriq}${mem}`) {
                  return new Cluster(group, true);
                }
                return new Cluster(group);
              });
            }
            return word.split(clusterSplitGroup).map((group) => new Cluster(group));
          };
          this.value = this;
          __classPrivateFieldSet4(this, _Word_text, text, "f");
          const startMatch = text.match(/^\s*/g);
          const endMatch = text.match(/\s*$/g);
          this.whiteSpaceBefore = startMatch ? startMatch[0] : null;
          this.whiteSpaceAfter = endMatch ? endMatch[0] : null;
          this.sylOpts = sylOpts;
        }
        /**
         * Gets all the {@link Char | characters} in the Word
         *
         * @returns a one dimensional array of Chars
         *
         * @example
         * ```ts
         * const text = new Text("אֵיפֹה־אַתָּה מֹשֶה");
         * text.words[0].chars;
         * // [
         * //    Char { original: "א" },
         * //    Char { original: "ֵ" }, (tsere)
         * //    Char { original: "פ" },
         * //    Char { original: "ֹ" }, (holem)
         * //    Char { original: "ה"},
         * //    Char { original: "־" }
         * //  ]
         * ```
         */
        get chars() {
          return this.clusters.map((cluster) => cluster.chars).flat();
        }
        /**
         * Gets all the {@link Cluster | clusters} in the Word
         *
         * @returns a one dimensional array of Clusters
         *
         * @example
         * ```ts
         * const text = new Text("אֵיפֹה־אַתָּה מֹשֶה");
         * text.words[0].clusters;
         * // [
         * //    Cluster { original: "אֵ" },
         * //    Cluster { original: "י" },
         * //    Cluster { original: "פֹ" },
         * //    Cluster { original: "ה־" }
         * //  ]
         * ```
         */
        get clusters() {
          const clusters = this.makeClusters(this.text);
          const firstCluster = clusters[0];
          const remainder = clusters.slice(1);
          firstCluster.siblings = remainder;
          return clusters;
        }
        /**
         * Gets all the consonant characters in the Word
         *
         * @returns a one dimensional array of all the consonant characters in the Word
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.words[0].consonants;
         * // ["ה", "א", "ר", "ץ"]
         * ```
         */
        get consonants() {
          return this.clusters.map((cluster) => cluster.consonants).flat();
        }
        /**
         * Gets all the consonant character names in the Word
         *
         * @returns a one dimensional array of all the consonant character names in the Word
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.words[0].consonantNames;
         * // ["HE", "ALEF", "RESH", "FINAL_TSADI"]
         * ```
         */
        get consonantNames() {
          return this.clusters.map((cluster) => cluster.consonantNames).flat();
        }
        /**
         * Checks if the word contains the consonant character of the name passed in
         *
         * @returns a boolean indicating if the word contains the consonant character of the name passed in
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.words[0].hasConsonantName("HE");
         * // true
         * text.words[0].hasConsonantName("MEM");
         * // false
         * ```
         *
         * @description
         * This checks if the syllable contains the given consonant name, even if the character is not a phonemic consonant (i.e a mater).
         */
        hasConsonantName(name) {
          return this.clusters.some((cluster) => cluster.hasConsonantName(name));
        }
        /**
         * Checks if the word has a form of the Divine Name (i.e the tetragrammaton)
         *
         * @returns a boolean indicating if the word has a form of the Divine Name
         *
         * @example
         * ```ts
         * const text = new Text("בַּֽיהוָ֔ה");
         * text.words[0].hasDivineName;
         * // true
         * ```
         */
        get hasDivineName() {
          return hasDivineName(this.text);
        }
        /**
         * Checks if the word contains the taamim character of the name passed in
         *
         * @returns a boolean indicating if the word contains the taamim character of the name passed in
         *
         * @example
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.word[0].hasTaamName("TIPEHA");
         * // true
         * ```
         *
         * @description
         * Note: it only checks according to the character name, not its semantic meaning.
         * E.g. "כֵֽן׃" would be `true` when checking for `"METEG"`, not silluq
         */
        hasTaamName(name) {
          return this.syllables.some((syllable) => syllable.hasTaamName(name));
        }
        /**
         * Checks if the word contains the vowel character of the name passed in
         *
         * @returns a boolean indicating if the word contains the vowel character of the name passed in
         *
         * @example
         * ```ts
         * const text = new Text("הַיְחָבְרְךָ")'
         * text.word[0].hasVowelName("PATAH");
         * // true
         *
         * // test for vocal sheva
         * text.word[0].hasVowelName("SHEVA");
         * // true
         *
         * // test for silent sheva
         * text.word[0].hasVowelName("SHUREQ");
         * // false
         * ```
         *
         * @description
         * This returns a boolean if the vowel character is present, even for most mater lectionis (e.g. in a holam vav construction, "HOLAM" would return true)
         * The only exception is a shureq, because there is no vowel character for a shureq.
         * According to {@page Syllabification}, a sheva is a vowel and serves as the nucleus of a syllable.
         * It returns `true` for "SHEVA" only when the sheva is the vowel (i.e. a vocal sheva or sheva na').
         */
        hasVowelName(name) {
          return this.syllables.some((syllable) => syllable.hasVowelName(name));
        }
        /**
         * Checks if the text is a form of the Divine Name (i.e the tetragrammaton)
         *
         * @returns a boolean indicating if the text is a form of the Divine Name
         *
         * @example
         * ```ts
         * const text = new Text("יְהוָה");
         * text.words[0].isDivineName;
         * // true
         * ```
         */
        get isDivineName() {
          return isDivineName(this.text);
        }
        /**
         * Checks if the Word contains non-Hebrew characters
         *
         * @returns a boolean indicating if the Word contains non-Hebrew characters
         *
         * @example
         * ```ts
         * const text = new Text("Hi!");
         * text.words[0].isNotHebrew;
         * // true
         * ```
         *
         * @description
         * If the word contains non-Hebrew characters, it is not considered Hebrew because syllabification is likely not correct.
         */
        get isNotHebrew() {
          return !this.clusters.map((c) => c.isNotHebrew).includes(false);
        }
        /**
         * Checks if the Word is in a construct state
         *
         * @returns a boolean indicating if the Word is in a construct state
         *
         * @example
         * ```ts
         * const text = new Text("בֶּן־אָדָ֕ם");
         * text.words[0].isInConstruct;
         * // true
         * ```
         *
         * @description
         * The construct state is indicated by the presence of a maqqef (U+05BE) character
         */
        get isInConstruct() {
          return this.text.includes("\u05BE");
        }
        /**
         * Gets all the {@link Syllable | syllables} in the Word
         *
         * @returns a one dimensional array of Syllables
         *
         * ```ts
         * const text = new Text("אֵיפֹה־אַתָּה מֹשֶה");
         * text.words[0].syllables;
         * // [
         * //    Syllable { original: "אֵי" },
         * //    Syllable { original: "פֹה־" }
         * //  ]
         * ```
         */
        get syllables() {
          if (/\w/.test(this.text) || this.isDivineName || this.isNotHebrew) {
            const syl = new Syllable(this.clusters);
            syl.word = this;
            return [syl];
          }
          const syllables = syllabify(this.clusters, this.sylOpts, this.isInConstruct);
          syllables.forEach((syl) => syl.word = this);
          return syllables;
        }
        /**
         * Gets all the taamim characters in the Word
         *
         * @returns a one dimensional array of all the taamim characters in the Word
         *
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.words[0].taamim;
         * // ["\u{596}"];
         * ```
         */
        get taamim() {
          return this.syllables.map((syl) => syl.taamim).flat();
        }
        /**
         * Gets all the taamim names in the Word
         *
         * @returns a one dimensional array of all the taamim names in the Word
         *
         * ```ts
         * const text = new Text("הָאָ֖רֶץ");
         * text.words[0].taamimNames;
         * // ["TIPEHA"];
         * ```
         */
        get taamimNames() {
          return this.syllables.map((syl) => syl.taamimNames).flat();
        }
        /**
         * Gets the text of the Word
         *
         * @returns the word's text trimmed of any whitespace characters
         *
         * ```ts
         * const text = new Text("אֵיפֹה־אַתָּה מֹשֶה");
         * const words = text.words.map((word) => word.text);
         * words;
         * // [
         * //    "אֵיפֹה־",
         * //    "אַתָּה",
         * //    "מֹשֶׁה"
         * //  ]
         * ```
         */
        get text() {
          return __classPrivateFieldGet4(this, _Word_text, "f").trim();
        }
        /**
         * Gets all the vowel names in the Word
         *
         * @returns an array of all the vowel names in the Word
         *
         * ```ts
         * const text = new Text("אֵיפֹה־אַתָּה מֹשֶה");
         * text.words[0].vowelNames;
         * // ["HOLAM", "SEGOL"];
         * ```
         */
        get vowelNames() {
          return this.syllables.map((syl) => syl.vowelNames).flat();
        }
        /**
         * Gets all the vowel characters in the Word
         *
         * @returns an array of all the vowel characters in the Word
         *
         * ```ts
         * const text = new Text("אֵיפֹה־אַתָּה מֹשֶה");
         * text.words[0].vowels;
         * // ["\u{5B9}", "\u{5B6}"];
         * ```
         */
        get vowels() {
          return this.syllables.map((syl) => syl.vowels).flat();
        }
      };
      _Word_text = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/havarotjs/dist/esm/text.js
  var __classPrivateFieldSet5, __classPrivateFieldGet5, _Text_original, Text;
  var init_text = __esm({
    "node_modules/havarotjs/dist/esm/text.js"() {
      init_holemWaw();
      init_qametsQatan();
      init_regularExpressions();
      init_sequence();
      init_word();
      __classPrivateFieldSet5 = function(receiver, state, value, kind, f2) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldGet5 = function(receiver, state, kind, f2) {
        if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
      };
      Text = class {
        /**
         * `Text` requires an input string,
         * and has optional arguments for syllabification,
         * which can be read about in the {@page Syllabification} page
         *
         * @param text input string
         * @param options syllabification options
         */
        constructor(text, options = {}) {
          _Text_original.set(this, void 0);
          this.options = this.setOptions(options);
          __classPrivateFieldSet5(this, _Text_original, this.options.allowNoNiqqud ? text : this.validateInput(text), "f");
        }
        validateInput(text) {
          const niqqud = /[\u{05B0}-\u{05BC}\u{05C7}]/u;
          if (!niqqud.test(text)) {
            throw new Error("Text must contain niqqud");
          }
          return text;
        }
        validateOptions(options) {
          const validOpts = [
            "allowNoNiqqud",
            "article",
            "holemHaser",
            "longVowels",
            "qametsQatan",
            "shevaAfterMeteg",
            "shevaWithMeteg",
            "sqnmlvy",
            "strict",
            "wawShureq"
          ];
          for (const [k, v] of Object.entries(options)) {
            if (!validOpts.includes(k)) {
              throw new Error(`${k} is not a valid option`);
            }
            if (k === "holemHaser" && !["update", "preserve", "remove"].includes(String(v))) {
              throw new Error(`The value ${String(v)} is not a valid option for ${k}`);
            }
            if (typeof v !== "boolean" && k !== "holemHaser") {
              throw new Error(`The value ${String(v)} is not a valid option for ${k}`);
            }
          }
          return options;
        }
        setOptions(options) {
          const validOpts = this.validateOptions(options);
          return {
            allowNoNiqqud: validOpts.allowNoNiqqud ?? false,
            article: validOpts.article ?? true,
            holemHaser: validOpts.holemHaser ?? "preserve",
            longVowels: validOpts.longVowels ?? true,
            qametsQatan: validOpts.qametsQatan ?? true,
            shevaAfterMeteg: validOpts.shevaAfterMeteg ?? true,
            shevaWithMeteg: validOpts.shevaWithMeteg ?? true,
            sqnmlvy: validOpts.sqnmlvy ?? true,
            strict: validOpts.strict ?? true,
            wawShureq: validOpts.wawShureq ?? true
          };
        }
        get normalized() {
          return this.original.normalize("NFKD");
        }
        get sanitized() {
          const text = this.normalized.trim();
          const sequencedChar = sequence(text).flat();
          const sequencedText = sequencedChar.reduce((a, c) => a + c.text, "");
          const textArr = sequencedText.split(splitGroup).filter((group) => group);
          const mapQQatan = this.options.qametsQatan ? textArr.map(convertsQametsQatan) : textArr;
          const mapHolemWaw = mapQQatan.map((w) => holemWaw(w, this.options));
          return mapHolemWaw.join("");
        }
        /**
         * @returns the original string passed
         *
         * ```typescript
         * const text: Text = new Text("הֲבָרֹות");
         * text.original;
         * // "הֲבָרֹות"
         * ```
         */
        get original() {
          return __classPrivateFieldGet5(this, _Text_original, "f");
        }
        /**
         * @returns a string that has been decomposed, sequenced, qamets qatan patterns converted to the appropriate unicode character (U+05C7), and holem-waw sequences corrected
         *
         * ```typescript
         * import { Text } from "havarotjs";
         * const text: Text = new Text("וַתָּשָׁב");
         * text.text;
         * // וַתָּשׇׁב
         * ```
         */
        get text() {
          return this.words.reduce((a, c) => `${a}${c.text}${c.whiteSpaceAfter ?? ""}`, "");
        }
        /**
         * @returns a one dimensional array of Words
         *
         * ```typescript
         * const text: Text = new Text("הֲבָרֹות");
         * text.words;
         * // [Word { original: "הֲבָרֹות" }]
         * ```
         */
        get words() {
          const split = this.sanitized.split(splitGroup);
          const groups = split.filter((group) => group);
          const words = groups.map((word) => new Word(word, this.options));
          const [first, ...rest] = words;
          first.siblings = rest;
          return words;
        }
        /**
         * @returns a one dimensional array of Syllables
         *
         * ```typescript
         * const text: Text = new Text("הֲבָרֹות");
         * text.syllables;
         * // [
         * //    Syllable { original: "הֲ" },
         * //    Syllable { original: "בָ" },
         * //    Syllable { original: "רֹות" }
         * //  ]
         * ```
         */
        get syllables() {
          return this.words.map((word) => word.syllables).flat();
        }
        /**
         * @returns a one dimensional array of Clusters
         *
         * ```typescript
         * const text: Text = new Text("יָד");
         * text.clusters;
         * // [
         * //    Cluster { original: "יָ" },
         * //    Cluster { original: "ד" }
         * //  ]
         * ```
         */
        get clusters() {
          return this.syllables.map((syllable) => syllable.clusters).flat();
        }
        /**
         * @returns a one dimensional array of Chars
         *
         * ```typescript
         * const text: Text = new Text("יָד");
         * text.chars;
         * //  [
         * //    Char { original: "י" },
         * //    Char { original: "ָ" },
         * //    Char { original: "ד" }
         * //  ]
         * ```
         */
        get chars() {
          return this.clusters.map((cluster) => cluster.chars).flat();
        }
      };
      _Text_original = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/havarotjs/dist/esm/index.js
  var init_esm = __esm({
    "node_modules/havarotjs/dist/esm/index.js"() {
      init_text();
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/hebCharsTrans.js
  var transliterateMap;
  var init_hebCharsTrans = __esm({
    "node_modules/hebrew-transliteration/dist/esm/hebCharsTrans.js"() {
      transliterateMap = {
        //   niqqud
        "\u05B0": "VOCAL_SHEVA",
        // HEBREW POINT SHEVA (U+05B0)
        "\u05B1": "HATAF_SEGOL",
        // HEBREW POINT HATAF SEGOL (U+05B1)
        "\u05B2": "HATAF_PATAH",
        // HEBREW POINT HATAF PATAH (U+05B2)
        "\u05B3": "HATAF_QAMATS",
        // HEBREW POINT HATAF QAMATS (U+05B3)
        "\u05B4": "HIRIQ",
        // HEBREW POINT HIRIQ (U+05B4)
        "\u05B5": "TSERE",
        // HEBREW POINT TSERE (U+05B5)
        "\u05B6": "SEGOL",
        // HEBREW POINT SEGOL (U+05B6)
        "\u05B7": "PATAH",
        // HEBREW POINT PATAH (U+05B7)
        "\u05B8": "QAMATS",
        // HEBREW POINT QAMATS (U+05B8)
        "\u05B9": "HOLAM",
        // HEBREW POINT HOLAM (U+05B9)
        "\u05BA": "HOLAM",
        // HEBREW POINT HOLAM HASER FOR VAV (U+05BA)
        "\u05BB": "QUBUTS",
        // HEBREW POINT QUBUTS (U+05BB)
        "\u05BC": "DAGESH",
        // HEBREW POINT DAGESH OR MAPIQ (U+05BC)
        //  "\u{05BD}": "", // HEBREW POINT METEG (U+05BD)
        "\u05BE": "MAQAF",
        // HEBREW PUNCTUATION MAQAF (U+05BE)
        "\u05C0": "PASEQ",
        // HEBREW PUNCTUATION PASEQ (U+05C0)
        "\u05C3": "SOF_PASUQ",
        // HEBREW PUNCTUATION SOF PASUQ (U+05C3)
        "\u05C7": "QAMATS_QATAN",
        // HEBREW POINT QAMATS QATAN (U+05C7)
        //   consonants
        \u05D0: "ALEF",
        // HEBREW LETTER ALEF (U+05D0)
        \u05D1: "BET",
        // HEBREW LETTER BET (U+05D1)
        \u05D2: "GIMEL",
        // HEBREW LETTER GIMEL (U+05D2)
        \u05D3: "DALET",
        // HEBREW LETTER DALET (U+05D3)
        \u05D4: "HE",
        // HEBREW LETTER HE (U+05D4)
        \u05D5: "VAV",
        // HEBREW LETTER VAV (U+05D5)
        \u05D6: "ZAYIN",
        // HEBREW LETTER ZAYIN (U+05D6)
        \u05D7: "HET",
        // HEBREW LETTER HET (U+05D7)
        \u05D8: "TET",
        // HEBREW LETTER TET (U+05D8)
        \u05D9: "YOD",
        // HEBREW LETTER YOD (U+05D9)
        \u05DA: "FINAL_KAF",
        // HEBREW LETTER FINAL KAF (U+05DA)
        \u05DB: "KAF",
        // HEBREW LETTER KAF (U+05DB)
        \u05DC: "LAMED",
        // HEBREW LETTER LAMED (U+05DC)
        \u05DD: "FINAL_MEM",
        // HEBREW LETTER FINAL MEM (U+05DD)
        \u05DE: "MEM",
        // HEBREW LETTER MEM (U+05DE)
        \u05DF: "FINAL_NUN",
        // HEBREW LETTER FINAL NUN (U+05DF)
        \u05E0: "NUN",
        // HEBREW LETTER NUN (U+05E0)
        \u05E1: "SAMEKH",
        // HEBREW LETTER SAMEKH (U+05E1)
        \u05E2: "AYIN",
        // HEBREW LETTER AYIN (U+05E2)
        \u05E3: "FINAL_PE",
        // HEBREW LETTER FINAL PE (U+05E3)
        \u05E4: "PE",
        // HEBREW LETTER PE (U+05E4)
        \u05E5: "FINAL_TSADI",
        // HEBREW LETTER FINAL TSADI (U+05E5)
        \u05E6: "TSADI",
        // HEBREW LETTER TSADI (U+05E6)
        \u05E7: "QOF",
        // HEBREW LETTER QOF (U+05E7)
        \u05E8: "RESH",
        // HEBREW LETTER RESH (U+05E8)
        \u05E9: "SHIN",
        // HEBREW LETTER SHIN (U+05E9)
        \u05EA: "TAV"
        // HEBREW LETTER TAV (U+05EA)
        // "\u{05EF}": "", // HEBREW YOD TRIANGLE (U+05EF)
        // װ: "", // HEBREW LIGATURE YIDDISH DOUBLE VAV (U+05F0)
        // ױ: "", // HEBREW LIGATURE YIDDISH VAV YOD (U+05F1)
        // ײ: "" // HEBREW LIGATURE YIDDISH DOUBLE YOD (U+05F2)
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/rules.js
  var taamim2, mapChars, replaceWithRegex, replaceAndTransliterate, isDageshChazaq, getDageshChazaqVal, getDivineName, materFeatures, joinSyllableChars, consonantFeatures, copySyllable, sylRules, wordRules;
  var init_rules = __esm({
    "node_modules/hebrew-transliteration/dist/esm/rules.js"() {
      init_cluster();
      init_syllable();
      init_word();
      init_regularExpressions();
      init_hebCharsTrans();
      taamim2 = /[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]/gu;
      mapChars = (schema2) => (input) => {
        return [...input].map((char) => char in transliterateMap ? schema2[transliterateMap[char]] : char).join("");
      };
      replaceWithRegex = (input, regex, replaceValue) => input.replace(regex, replaceValue);
      replaceAndTransliterate = (input, regex, replaceValue, schema2) => {
        const sylSeq = replaceWithRegex(input, regex, replaceValue);
        return [...sylSeq].map(mapChars(schema2)).join("");
      };
      isDageshChazaq = (cluster, schema2) => {
        if (!schema2.DAGESH_CHAZAQ) {
          return false;
        }
        if (cluster.isShureq) {
          return false;
        }
        if (!/\u{05BC}/u.test(cluster.text)) {
          return false;
        }
        const prevWord = cluster.syllable?.word?.prev?.value;
        if (prevWord && prevWord?.isInConstruct && !prevWord.syllables[prevWord.syllables.length - 1].isClosed) {
          return true;
        }
        const prevSyllable = cluster.syllable?.prev;
        if (!prevSyllable) {
          return false;
        }
        const prevCoda = prevSyllable.value?.codaWithGemination;
        if (!prevCoda) {
          return false;
        }
        return prevCoda === cluster.syllable?.onset;
      };
      getDageshChazaqVal = (input, dagesh2, isChazaq) => {
        if (!isChazaq) {
          return input;
        }
        if (typeof dagesh2 === "boolean") {
          return input.repeat(2);
        }
        return input + dagesh2;
      };
      getDivineName = (str, schema2) => {
        const begn = str[0];
        const end = str[str.length - 1];
        const divineName = schema2.DIVINE_NAME_ELOHIM && /\u{05B4}/u.test(str) ? schema2.DIVINE_NAME_ELOHIM : schema2.DIVINE_NAME;
        return `${hebChars.test(begn) ? "" : begn}${divineName}${hebChars.test(end) ? "" : end}`;
      };
      materFeatures = (syl, schema2) => {
        const mater = syl.clusters.filter((c) => c.isMater)[0];
        const prev = mater.prev instanceof Cluster ? mater.prev : null;
        const materText = mater.text;
        const prevText = (prev?.text || "").replace(taamim2, "");
        let noMaterText = syl.clusters.filter((c) => !c.isMater).map((c) => consonantFeatures(c.text.replace(taamim2, ""), syl, c, schema2)).join("");
        const hasMaqaf = mater.text.includes("\u05BE");
        noMaterText = hasMaqaf ? noMaterText.concat("\u05BE") : noMaterText;
        if (/י/.test(materText)) {
          if (/\u{05B4}/u.test(prevText)) {
            return replaceWithRegex(noMaterText, /\u{05B4}/u, schema2.HIRIQ_YOD);
          }
          if (/\u{05B5}/u.test(prevText)) {
            return replaceWithRegex(noMaterText, /\u{05B5}/u, schema2.TSERE_YOD);
          }
          if (/\u{05B6}/u.test(prevText)) {
            return replaceWithRegex(noMaterText, /\u{05B6}/u, schema2.SEGOL_YOD);
          }
        }
        if (/ו/u.test(materText)) {
          if (/\u{05B9}/u.test(prevText)) {
            return replaceWithRegex(noMaterText, /\u{05B9}/u, schema2.HOLAM_VAV);
          }
        }
        if (/ה/.test(materText)) {
          if (/\u{05B8}/u.test(prevText)) {
            return replaceWithRegex(noMaterText, /\u{05B8}/u, schema2.QAMATS_HE);
          }
          if (/\u{05B6}/u.test(prevText)) {
            return replaceWithRegex(noMaterText, /\u{05B6}/u, schema2.SEGOL_HE);
          }
          if (/\u{05B5}/u.test(prevText)) {
            return replaceWithRegex(noMaterText, /\u{05B5}/u, schema2.TSERE_HE);
          }
        }
        return materText;
      };
      joinSyllableChars = (syl, sylChars, schema2) => {
        const isInConstruct = syl.word?.isInConstruct;
        if (isInConstruct) {
          return sylChars.map(mapChars(schema2)).join("");
        }
        if (!syl.isAccented) {
          return sylChars.map(mapChars(schema2)).join("");
        }
        const isOnlyPunctuation = syl.clusters.map((c) => c.isPunctuation).every((c) => c);
        if (isOnlyPunctuation) {
          return sylChars.map(mapChars(schema2)).join("");
        }
        if (schema2.STRESS_MARKER) {
          const exclude = schema2.STRESS_MARKER?.exclude ?? "never";
          if (exclude === "single" && !syl.prev && !syl.next) {
            return sylChars.map(mapChars(schema2)).join("");
          }
          if (exclude === "final" && !syl.next) {
            return sylChars.map(mapChars(schema2)).join("");
          }
          const location = schema2.STRESS_MARKER.location;
          const mark = schema2.STRESS_MARKER.mark;
          if (syl.text.includes(mark)) {
            return sylChars.map(mapChars(schema2)).join("");
          }
          if (location === "before-syllable") {
            const isDoubled = syl.clusters.map((c) => isDageshChazaq(c, schema2)).includes(true);
            if (isDoubled) {
              const chars = sylChars.map(mapChars(schema2)).join("");
              const [first, ...rest] = chars;
              return `${first}${mark}${rest.join("")}`;
            }
            return `${mark}${sylChars.map(mapChars(schema2)).join("")}`;
          }
          if (location === "after-syllable") {
            return `${sylChars.map(mapChars(schema2)).join("")}${mark}`;
          }
          const vowels3 = [
            schema2.PATAH,
            schema2.HATAF_PATAH,
            schema2.QAMATS,
            schema2.HATAF_QAMATS,
            schema2.SEGOL,
            schema2.HATAF_SEGOL,
            schema2.TSERE,
            schema2.HIRIQ,
            schema2.HOLAM,
            schema2.QAMATS_QATAN,
            schema2.QUBUTS,
            schema2.QAMATS_HE,
            schema2.SEGOL_HE,
            schema2.TSERE_HE,
            schema2.HIRIQ_YOD,
            schema2.TSERE_YOD,
            schema2.SEGOL_YOD,
            schema2.HOLAM_VAV,
            schema2.SHUREQ
          ].sort((a, b) => b.length - a.length);
          const vowelRgx = new RegExp(`${vowels3.join("|")}`);
          const str = sylChars.map(mapChars(schema2)).join("");
          const match = str.match(vowelRgx);
          if (location === "before-vowel") {
            return match?.length ? str.replace(match[0], `${mark}${match[0]}`) : str;
          }
          return match?.length ? str.replace(match[0], `${match[0]}${mark}`) : str;
        }
        return sylChars.map(mapChars(schema2)).join("");
      };
      consonantFeatures = (clusterText, syl, cluster, schema2) => {
        if (schema2.ADDITIONAL_FEATURES?.length) {
          const seqs = schema2.ADDITIONAL_FEATURES;
          for (const seq of seqs) {
            const heb2 = new RegExp(seq.HEBREW, "u");
            if (seq.FEATURE === "cluster" && heb2.test(clusterText)) {
              const transliteration = seq.TRANSLITERATION;
              const passThrough = seq.PASS_THROUGH ?? true;
              if (typeof transliteration === "string") {
                return replaceAndTransliterate(clusterText, heb2, transliteration, schema2);
              }
              if (!passThrough) {
                return transliteration(cluster, seq.HEBREW, schema2);
              }
              clusterText = transliteration(cluster, seq.HEBREW, schema2);
            }
          }
        }
        clusterText = cluster.hasSheva && syl.isClosed ? clusterText.replace(/\u{05B0}/u, "") : clusterText;
        if (/ה\u{05BC}$/mu.test(clusterText)) {
          return replaceWithRegex(clusterText, /ה\u{05BC}/u, schema2.HE);
        }
        if (syl.isFinal && !syl.isClosed) {
          const furtiveChet = /\u{05D7}\u{05B7}$/mu;
          if (furtiveChet.test(clusterText)) {
            return replaceWithRegex(clusterText, furtiveChet, "\u05B7\u05D7");
          }
          const furtiveAyin = /\u{05E2}\u{05B7}$/mu;
          if (furtiveAyin.test(clusterText)) {
            return replaceWithRegex(clusterText, furtiveAyin, "\u05B7\u05E2");
          }
          const furtiveHe = /\u{05D4}\u{05BC}\u{05B7}$/mu;
          if (furtiveHe.test(clusterText)) {
            return replaceWithRegex(clusterText, furtiveHe, "\u05B7\u05D4\u05BC");
          }
        }
        const isDageshChazq = isDageshChazaq(cluster, schema2);
        if (schema2.BET_DAGESH && /ב\u{05BC}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /ב\u{05BC}/u, getDageshChazaqVal(schema2.BET_DAGESH, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (schema2.GIMEL_DAGESH && /ג\u{05BC}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /ג\u{05BC}/u, getDageshChazaqVal(schema2.GIMEL_DAGESH, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (schema2.DALET_DAGESH && /ד\u{05BC}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /ד\u{05BC}/u, getDageshChazaqVal(schema2.DALET_DAGESH, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (schema2.KAF_DAGESH && /כ\u{05BC}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /כ\u{05BC}/u, getDageshChazaqVal(schema2.KAF_DAGESH, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (schema2.KAF_DAGESH && /ך\u{05BC}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /ך\u{05BC}/u, getDageshChazaqVal(schema2.KAF_DAGESH, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (schema2.PE_DAGESH && /פ\u{05BC}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /פ\u{05BC}/u, getDageshChazaqVal(schema2.PE_DAGESH, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (schema2.TAV_DAGESH && /ת\u{05BC}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /ת\u{05BC}/u, getDageshChazaqVal(schema2.TAV_DAGESH, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (/ש\u{05C1}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /ש\u{05C1}/u, getDageshChazaqVal(schema2.SHIN, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (/ש\u{05C2}/u.test(clusterText)) {
          return replaceWithRegex(clusterText, /ש\u{05C2}/u, getDageshChazaqVal(schema2.SIN, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (isDageshChazq) {
          const consonant = cluster.chars[0].text;
          const consonantDagesh = new RegExp(consonant + "\u05BC", "u");
          return replaceWithRegex(clusterText, consonantDagesh, getDageshChazaqVal(consonant, schema2.DAGESH_CHAZAQ, isDageshChazq));
        }
        if (cluster.isShureq) {
          return clusterText.replace("\u05D5\u05BC", schema2.SHUREQ);
        }
        return clusterText;
      };
      copySyllable = (newText, old) => {
        const newClusters = newText.split(clusterSplitGroup).map((clusterString) => new Cluster(clusterString, true));
        const oldClusters = old.clusters;
        if (newClusters.length === oldClusters.length) {
          newClusters.forEach((c, i) => (c.prev = oldClusters[i]?.prev ?? null, c.next = oldClusters[i]?.next ?? null));
        } else {
          for (let i = 0; i < newClusters.length; i++) {
            const c = newClusters[i];
            if (oldClusters[i]?.text[0] === c?.text[0]) {
              c.prev = oldClusters[i]?.prev ?? null;
              c.next = oldClusters[i]?.next ?? null;
            } else {
              c.prev = oldClusters[i]?.prev ?? null;
              c.next = oldClusters[i + 1]?.next ?? null;
              i++;
            }
          }
        }
        const newSyl = new Syllable(newClusters, {
          isClosed: old.isClosed,
          isAccented: old.isAccented,
          isFinal: old.isFinal
        });
        newClusters.forEach((c) => c.syllable = newSyl);
        newSyl.prev = old.prev;
        newSyl.next = old.next;
        newSyl.word = old.word;
        return newSyl;
      };
      sylRules = (syl, schema2) => {
        const sylTxt = syl.text.replace(taamim2, "");
        if (schema2.ADDITIONAL_FEATURES?.length) {
          const seqs = schema2.ADDITIONAL_FEATURES;
          for (const seq of seqs) {
            const heb2 = new RegExp(seq.HEBREW, "u");
            if (seq.FEATURE === "syllable" && heb2.test(sylTxt)) {
              const transliteration = seq.TRANSLITERATION;
              const passThrough = seq.PASS_THROUGH ?? true;
              if (typeof transliteration === "string") {
                return replaceAndTransliterate(sylTxt, heb2, transliteration, schema2);
              }
              if (!passThrough) {
                return transliteration(syl, seq.HEBREW, schema2);
              }
              const newText = transliteration(syl, seq.HEBREW, schema2);
              if (newText !== sylTxt) {
                syl = copySyllable(newText, syl);
              }
            }
          }
        }
        const mSSuffix = /\u{05B8}\u{05D9}\u{05D5}/u;
        if (syl.isFinal && mSSuffix.test(sylTxt)) {
          const sufxSyl = replaceWithRegex(sylTxt, mSSuffix, schema2.MS_SUFX);
          return joinSyllableChars(syl, [...sufxSyl], schema2);
        }
        const hasMater = syl.clusters.map((c) => c.isMater).includes(true);
        if (hasMater) {
          const materSyl = materFeatures(syl, schema2);
          return joinSyllableChars(syl, [...materSyl], schema2);
        }
        const returnTxt = syl.clusters.map((cluster) => {
          const clusterText = cluster.text.replace(taamim2, "");
          return consonantFeatures(clusterText, syl, cluster, schema2);
        });
        return joinSyllableChars(syl, returnTxt, schema2).replace(taamim2, "");
      };
      wordRules = (word, schema2) => {
        if (word.isDivineName) {
          return getDivineName(word.text, schema2);
        }
        if (word.hasDivineName) {
          return `${sylRules(word.syllables[0], schema2)}-${getDivineName(word.text, schema2)}`;
        }
        if (word.isNotHebrew) {
          return word.text;
        }
        const text = word.text.replace(taamim2, "");
        if (schema2.ADDITIONAL_FEATURES?.length) {
          const seqs = schema2.ADDITIONAL_FEATURES;
          for (const seq of seqs) {
            const heb2 = new RegExp(seq.HEBREW, "u");
            if (seq.FEATURE === "word" && heb2.test(text)) {
              const transliteration = seq.TRANSLITERATION;
              const passThrough = seq.PASS_THROUGH ?? true;
              if (typeof transliteration === "string") {
                return replaceAndTransliterate(text, heb2, transliteration, schema2);
              }
              if (!passThrough) {
                return transliteration(word, seq.HEBREW, schema2);
              }
              return new Word(transliteration(word, seq.HEBREW, schema2), schema2);
            }
          }
          return word;
        }
        return word;
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schema.js
  var Schema, SBL;
  var init_schema = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schema.js"() {
      Schema = class {
        /**
         * HEBREW POINT SHEVA (U+05B0) ְ◌
         * @example
         * 'ǝ'
         */
        VOCAL_SHEVA;
        /**
         * HEBREW POINT HATAF SEGOL (U+05B1) ֱ◌
         * @example
         * 'ĕ'
         */
        HATAF_SEGOL;
        /**
         * HEBREW POINT HATAF PATAH (U+05B2) ֲ◌
         * @example
         * 'ă'
         */
        HATAF_PATAH;
        /**
         * HEBREW POINT HATAF QAMATS (U+05B3) ֳ◌
         * @example
         * 'ŏ'
         */
        HATAF_QAMATS;
        /**
         * HEBREW POINT HIRIQ (U+05B4) ִ◌
         * @example
         * 'i'
         */
        HIRIQ;
        /**
         * HEBREW POINT TSERE (U+05B5) ֵ◌
         * @example
         * 'ē'
         */
        TSERE;
        /**
         * HEBREW POINT SEGOL (U+05B6) ֶ◌
         * @example
         * 'e'
         */
        SEGOL;
        /**
         * HEBREW POINT PATAH (U+05B7) ַ◌
         * @example
         * 'a'
         */
        PATAH;
        /**
         * HEBREW POINT QAMATS (U+05B8) ָ◌
         * @example
         * 'ā'
         */
        QAMATS;
        /**
         * HEBREW POINT HOLAM (U+05B9) ֹ◌
         * @example
         * 'ō'
         */
        HOLAM;
        /**
         * HEBREW POINT HOLAM (U+05BA) ֹ◌
         * @example
         * 'ō'
         */
        HOLAM_HASER;
        /**
         * HEBREW POINT QUBUTS (U+05BB) ֻ◌
         * @example
         * 'u'
         */
        QUBUTS;
        /**
         * HEBREW POINT DAGESH OR MAPIQ (U+05BC) ּ◌
         * @description typically, this will be a blank string
         * @example
         * ''
         */
        DAGESH;
        /**
         * HEBREW POINT DAGESH OR MAPIQ (U+05BC) ּ◌
         *
         * @description A string or boolean that if true, repeats the consonant with the dagesh.
         *
         * @example string
         *
         * ```js
         * transliterate('שַׁבָּת', { DAGESH_CHAZAQ: "\u0301" });
         * // 'šab́āt'
         * ```
         *
         * @example boolean
         * ```js
         * transliterate('שַׁבָּת', { DAGESH_CHAZAQ: true });
         * // 'šabbāt'
         * ```
         */
        DAGESH_CHAZAQ;
        /**
         * HEBREW PUNCTUATION MAQAF (U+05BE) ־◌
         * @example
         * '-'
         */
        MAQAF;
        /**
         * HEBREW PUNCTUATION PASEQ (U+05C0) ׀ ◌
         * @description if a blank string, two spaces will occur between words
         * @example
         * '|' or ''
         * @example
         * ```js
         * transliterate('כְּשֶׁ֣בֶת ׀ הַמֶּ֣לֶךְ', { PASEQ: '' });
         * // 'kǝšebet  hammelek'
         * ```
         */
        PASEQ;
        /**
         * HEBREW PUNCTUATION SOF PASUQ (U+05C3) ׃◌
         * @example
         * '' or '.'
         */
        SOF_PASUQ;
        /**
         * HEBREW POINT QAMATS QATAN (U+05C7) ׇ◌
         * @example
         * 'o'
         */
        QAMATS_QATAN;
        /**
         * HEBREW POINT PATAH (U+05B7) ◌ַ
         * @example
         * 'a'
         */
        FURTIVE_PATAH;
        /**
         * HEBREW POINT HIRIQ (U+05B4) and YOD (U+05D9) י◌ִ
         * @example
         * 'î'
         */
        HIRIQ_YOD;
        /**
         * HEBREW POINT TSERE (U+05B5) and YOD (U+05D9) י◌ֵ
         * @example
         * 'ê'
         */
        TSERE_YOD;
        /**
         * HEBREW POINT SEGOL (U+05B6) and YOD (U+05D9) י◌ֶ
         * @example
         * 'ê'
         */
        SEGOL_YOD;
        /**
         * HEBREW LETTER VAV (U+05D5) and DAGESH (U+05BC) וּ
         * @example
         * 'û'
         */
        SHUREQ;
        /**
         * HEBREW LETTER HOLAM (U+05B9) and VAV (U+05D5) ֹו◌
         * @example
         * 'ô'
         */
        HOLAM_VAV;
        /**
         * HEBREW POINT QAMATS (U+05B8) and HE (U+05D4) ה◌ָ
         * @example
         * 'â'
         */
        QAMATS_HE;
        /**
         * HEBREW POINT SEGOL (U+05B6) and HE (U+05D4) ה◌ֶ
         * @example
         * 'ê'
         */
        SEGOL_HE;
        /**
         * HEBREW POINT TSERE (U+05B5) and HE (U+05D4) ה◌ֵ
         * @example
         * 'ê'
         */
        TSERE_HE;
        /**
         * HEBREW LETTER QAMATS (U+05B8) and YOD (U+05D9) and VAV (U+05D5) יו◌ָ
         * @example
         * 'āyw'
         */
        MS_SUFX;
        /**
         * HEBREW LETTER ALEF (U+05D0) א
         * @example
         * 'ʾ'
         */
        ALEF;
        /**
         * HEBREW LETTER BET (U+05D1) ב
         * @example
         * 'b' or 'v'
         */
        BET;
        /**
         * HEBREW LETTER BET (U+05D1) and DAGESH (U+05BC) ּב
         * @description
         * the letter bet with a dagesh kal
         * @description
         * use when need to distinguish between spirantized forms
         * @example
         * 'b'
         */
        BET_DAGESH;
        /**
         * HEBREW LETTER GIMEL (U+05D2) ג
         * @example
         * 'g'
         */
        GIMEL;
        /**
         * HEBREW LETTER GIMEL (U+05D2) and DAGESH (U+05BC) גּ
         * @description
         * the letter gimel with a dagesh kal
         * @description
         * use when need to distinguish between spirantized forms
         * @example
         * 'g'
         */
        GIMEL_DAGESH;
        /**
         * HEBREW LETTER DALET (U+05D3) ד
         * @example
         * 'd'
         */
        DALET;
        /**
         * HEBREW LETTER DALET (U+05D3) and DAGESH (U+05BC) דּ
         * @description
         * the letter dalet with a dagesh kal
         * @description
         * use when need to distinguish between spirantized forms
         * @example
         * 'd'
         */
        DALET_DAGESH;
        /**
         * HEBREW LETTER HE (U+05D4) ה
         * @example
         * 'h'
         */
        HE;
        /**
         * HEBREW LETTER VAV (U+05D5) ו
         * @example
         * 'w'
         */
        VAV;
        /**
         * HEBREW LETTER ZAYIN (U+05D6) ז
         * @example
         * 'z'
         */
        ZAYIN;
        /**
         * HEBREW LETTER HET (U+05D7) ח
         * @example
         * 'ḥ'
         */
        HET;
        /**
         * HEBREW LETTER TET (U+05D8) ט
         * @example
         * 'ṭ'
         */
        TET;
        /**
         * HEBREW LETTER YOD (U+05D9) י
         * @example
         * 'y'
         */
        YOD;
        /**
         * HEBREW LETTER FINAL KAF (U+05DA) ך
         * @example
         * 'k' or 'kh'
         */
        FINAL_KAF;
        /**
         * HEBREW LETTER KAF (U+05DB) כ
         * @example
         * 'k' or 'kh'
         */
        KAF;
        /**
         * HEBREW LETTER KAF (U+05DB) and DAGESH (U+05BC) כּ
         * @description
         * the letter kaf with a dagesh kal
         * @description
         * use when need to distinguish between spirantized forms
         * @example
         * 'k'
         */
        KAF_DAGESH;
        /**
         * HEBREW LETTER LAMED (U+05DC) ל
         * @example
         * 'l'
         */
        LAMED;
        /**
         * HEBREW LETTER FINAL MEM (U+05DD) ם
         * @example
         * 'm'
         */
        FINAL_MEM;
        /**
         * HEBREW LETTER MEM (U+05DE) מ
         * @example
         * 'm'
         */
        MEM;
        /**
         * HEBREW LETTER FINAL NUN (U+05DF) ן
         * @example
         * 'n'
         */
        FINAL_NUN;
        /**
         * HEBREW LETTER NUN (U+05E0) נ
         * @example
         * 'n'
         */
        NUN;
        /**
         * HEBREW LETTER SAMEKH (U+05E1) ס
         * @example
         * 's'
         */
        SAMEKH;
        /**
         * HEBREW LETTER AYIN (U+05E2) ע
         * @example
         * 'ʿ'
         */
        AYIN;
        /**
         * HEBREW LETTER FINAL PE (U+05E3) ף
         * @example
         * 'p' or 'f'
         */
        FINAL_PE;
        /**
         * HEBREW LETTER PE (U+05E4) פ
         * @example
         * 'p' or 'f'
         */
        PE;
        /**
         * HEBREW LETTER  PE (U+05E4) and DAGESH (U+05BC) פּ
         * @description
         * the letter pe with a dagesh kal
         * @description
         * use when need to distinguish between spirantized forms
         * @example
         * 'p'
         */
        PE_DAGESH;
        /**
         * HEBREW LETTER FINAL TSADI (U+05E5) ץ
         * @example
         * 'ṣ'
         */
        FINAL_TSADI;
        /**
         * HEBREW LETTER TSADI (U+05E6) צ
         * @example
         * 'ṣ'
         */
        TSADI;
        /**
         * HEBREW LETTER QOF (U+05E7) ק
         * @example
         * 'q'
         */
        QOF;
        /**
         * HEBREW LETTER RESH (U+05E8) ר
         * @example
         * 'r'
         */
        RESH;
        /**
         * HEBREW LETTER SHIN (U+05E9) and SHIN DOT (U+05C1) שׁ
         * @example
         * 'š'
         */
        SHIN;
        /**
         * HEBREW LETTER SHIN (U+05E9) and SIN DOT (U+05C2) שׁ
         * @example
         * 'ś'
         */
        SIN;
        /**
         * HEBREW LETTER TAV (U+05EA) ת
         * @example
         * 't' or 'th'
         */
        TAV;
        /**
         * HEBREW LETTER TAV (U+05EA) and DAGESH (U+05BC) תּ
         * @description
         * the letter tav with a dagesh kal
         * @description
         * use when need to distinguish between spirantized forms
         * @example
         * 't'
         */
        TAV_DAGESH;
        /**
         * define additional sequences of characters
         *
         * ⚠️ there may be unpredictable results
         *
         * @example
         * [{
         *   FEATURE: 'cluster',
         *   HEBREW: 'זּ',
         *   TRANSLITERATION: 'tz'
         * }]
         */
        ADDITIONAL_FEATURES;
        /**
         * the full form of the divine name - יהוה
         * @example
         * 'yhwh'
         */
        DIVINE_NAME;
        /**
         * the full form of the divine name pointed as 'elohim
         *
         * @description
         * matches on the forms:
         * - יֱהֹוִה
         * - יֱהוִה
         * - יְהֹוִה
         * - יְהוִה
         *
         * If undefined, defaults to `DIVINE_NAME`
         *
         * @example
         * 'ʾelōhim'
         */
        DIVINE_NAME_ELOHIM;
        /**
         * a syllable separator, usually an empty string
         *  @example
         * '' or '-'
         * @example
         * ```js
         * transliterate('הָאָֽרֶץ', { SYLLABLE_SEPARATOR: '-' });
         * // 'hā-ʾā-reṣ'
         * ```
         */
        SYLLABLE_SEPARATOR;
        /**
         * a mark for indentifying the stressed syllable
         *
         * @description
         * taamim are needed in the Hebrew text to correctly identify stress
         *  @example
         * 'ˈ' or '\u0341'
         * @example
         * ```js
         * transliterate('מֶ֣לֶךְ', {
         *   STRESS_MARKER: {
         *     location: 'after-vowel',
         *     mark: '\u0301'
         *    }
         * });
         * // 'mélek'
         * ```
         */
        STRESS_MARKER;
        allowNoNiqqud;
        article;
        holemHaser;
        longVowels;
        qametsQatan;
        shevaAfterMeteg;
        shevaWithMeteg;
        sqnmlvy;
        strict;
        wawShureq;
        constructor(schema2) {
          this.VOCAL_SHEVA = schema2.VOCAL_SHEVA, this.HATAF_SEGOL = schema2.HATAF_SEGOL, this.HATAF_PATAH = schema2.HATAF_PATAH, this.HATAF_QAMATS = schema2.HATAF_QAMATS, this.HIRIQ = schema2.HIRIQ, this.TSERE = schema2.TSERE, this.SEGOL = schema2.SEGOL, this.PATAH = schema2.PATAH, this.QAMATS = schema2.QAMATS, this.HOLAM = schema2.HOLAM, this.HOLAM_HASER = schema2.HOLAM_HASER, this.QUBUTS = schema2.QUBUTS, this.DAGESH = schema2.DAGESH, this.DAGESH_CHAZAQ = schema2.DAGESH_CHAZAQ, this.MAQAF = schema2.MAQAF, this.PASEQ = schema2.PASEQ, this.SOF_PASUQ = schema2.SOF_PASUQ, this.QAMATS_QATAN = schema2.QAMATS_QATAN, this.FURTIVE_PATAH = schema2.FURTIVE_PATAH, this.HIRIQ_YOD = schema2.HIRIQ_YOD, this.TSERE_YOD = schema2.TSERE_YOD, this.SEGOL_YOD = schema2.SEGOL_YOD, this.SHUREQ = schema2.SHUREQ, this.HOLAM_VAV = schema2.HOLAM_VAV, this.QAMATS_HE = schema2.QAMATS_HE, this.SEGOL_HE = schema2.SEGOL_HE, this.TSERE_HE = schema2.TSERE_HE, this.MS_SUFX = schema2.MS_SUFX, this.ALEF = schema2.ALEF, this.BET_DAGESH = schema2.BET_DAGESH, this.BET = schema2.BET, this.GIMEL = schema2.GIMEL, this.GIMEL_DAGESH = schema2.GIMEL_DAGESH, this.DALET = schema2.DALET, this.DALET_DAGESH = schema2.DALET_DAGESH, this.HE = schema2.HE, this.VAV = schema2.VAV, this.ZAYIN = schema2.ZAYIN, this.HET = schema2.HET, this.TET = schema2.TET, this.YOD = schema2.YOD, this.FINAL_KAF = schema2.FINAL_KAF, this.KAF = schema2.KAF, this.KAF_DAGESH = schema2.KAF_DAGESH, this.LAMED = schema2.LAMED, this.FINAL_MEM = schema2.FINAL_MEM, this.MEM = schema2.MEM, this.FINAL_NUN = schema2.FINAL_NUN, this.NUN = schema2.NUN, this.SAMEKH = schema2.SAMEKH, this.AYIN = schema2.AYIN, this.FINAL_PE = schema2.FINAL_PE, this.PE = schema2.PE, this.PE_DAGESH = schema2.PE_DAGESH, this.FINAL_TSADI = schema2.FINAL_TSADI, this.TSADI = schema2.TSADI, this.QOF = schema2.QOF, this.RESH = schema2.RESH, this.SHIN = schema2.SHIN, this.SIN = schema2.SIN, this.TAV = schema2.TAV, this.TAV_DAGESH = schema2.TAV_DAGESH, this.DIVINE_NAME = schema2.DIVINE_NAME, this.DIVINE_NAME_ELOHIM = schema2.DIVINE_NAME_ELOHIM, this.SYLLABLE_SEPARATOR = schema2.SYLLABLE_SEPARATOR, this.ADDITIONAL_FEATURES = schema2.ADDITIONAL_FEATURES, this.STRESS_MARKER = schema2.STRESS_MARKER, this.longVowels = schema2.longVowels, this.qametsQatan = schema2.qametsQatan, this.sqnmlvy = schema2.sqnmlvy, this.shevaAfterMeteg = schema2.shevaAfterMeteg, this.shevaWithMeteg = schema2.shevaWithMeteg, this.wawShureq = schema2.wawShureq, this.article = schema2.article, this.allowNoNiqqud = schema2.allowNoNiqqud, this.strict = schema2.strict, this.holemHaser = schema2.holemHaser;
        }
      };
      SBL = class extends Schema {
        constructor(schema2) {
          super({
            VOCAL_SHEVA: schema2.VOCAL_SHEVA ?? "\u01DD",
            HATAF_SEGOL: schema2.HATAF_SEGOL ?? "\u0115",
            HATAF_PATAH: schema2.HATAF_PATAH ?? "\u0103",
            HATAF_QAMATS: schema2.HATAF_QAMATS ?? "\u014F",
            HIRIQ: schema2.HIRIQ ?? "i",
            TSERE: schema2.TSERE ?? "\u0113",
            SEGOL: schema2.SEGOL ?? "e",
            PATAH: schema2.PATAH ?? "a",
            QAMATS: schema2.QAMATS ?? "\u0101",
            HOLAM: schema2.HOLAM ?? "\u014D",
            HOLAM_HASER: schema2.HOLAM_HASER ?? "\u014D",
            QUBUTS: schema2.QUBUTS ?? "\u016B",
            DAGESH: schema2.DAGESH ?? "",
            DAGESH_CHAZAQ: schema2.DAGESH_CHAZAQ ?? true,
            MAQAF: schema2.MAQAF ?? "-",
            PASEQ: schema2.PASEQ ?? "",
            SOF_PASUQ: schema2.SOF_PASUQ ?? "",
            QAMATS_QATAN: schema2.QAMATS_QATAN ?? "o",
            FURTIVE_PATAH: schema2.FURTIVE_PATAH ?? "a",
            HIRIQ_YOD: schema2.HIRIQ_YOD ?? "\xEE",
            TSERE_YOD: schema2.TSERE_YOD ?? "\xEA",
            SEGOL_YOD: schema2.SEGOL_YOD ?? "\xEA",
            SHUREQ: schema2.SHUREQ ?? "\xFB",
            HOLAM_VAV: schema2.HOLAM_VAV ?? "\xF4",
            QAMATS_HE: schema2.QAMATS_HE ?? "\xE2",
            SEGOL_HE: schema2.SEGOL_HE ?? "\xEA",
            TSERE_HE: schema2.TSERE_HE ?? "\xEA",
            MS_SUFX: schema2.MS_SUFX ?? "\u0101yw",
            ALEF: schema2.ALEF ?? "\u02BE",
            BET: schema2.BET ?? "b",
            BET_DAGESH: schema2.BET_DAGESH ?? void 0,
            GIMEL: schema2.GIMEL ?? "g",
            GIMEL_DAGESH: schema2.GIMEL_DAGESH ?? void 0,
            DALET: schema2.DALET ?? "d",
            DALET_DAGESH: schema2.DALET_DAGESH ?? void 0,
            HE: schema2.HE ?? "h",
            VAV: schema2.VAV ?? "w",
            ZAYIN: schema2.ZAYIN ?? "z",
            HET: schema2.HET ?? "\u1E25",
            TET: schema2.TET ?? "\u1E6D",
            YOD: schema2.YOD ?? "y",
            FINAL_KAF: schema2.FINAL_KAF ?? "k",
            KAF: schema2.KAF ?? "k",
            KAF_DAGESH: schema2.KAF_DAGESH ?? void 0,
            LAMED: schema2.LAMED ?? "l",
            FINAL_MEM: schema2.FINAL_MEM ?? "m",
            MEM: schema2.MEM ?? "m",
            FINAL_NUN: schema2.FINAL_NUN ?? "n",
            NUN: schema2.NUN ?? "n",
            SAMEKH: schema2.SAMEKH ?? "s",
            AYIN: schema2.AYIN ?? "\u02BF",
            FINAL_PE: schema2.FINAL_PE ?? "p",
            PE: schema2.PE ?? "p",
            PE_DAGESH: schema2.PE_DAGESH ?? void 0,
            FINAL_TSADI: schema2.FINAL_TSADI ?? "\u1E63",
            TSADI: schema2.TSADI ?? "\u1E63",
            QOF: schema2.QOF ?? "q",
            RESH: schema2.RESH ?? "r",
            SHIN: schema2.SHIN ?? "\u0161",
            SIN: schema2.SIN ?? "\u015B",
            TAV: schema2.TAV ?? "t",
            TAV_DAGESH: schema2.TAV_DAGESH ?? void 0,
            DIVINE_NAME: schema2.DIVINE_NAME ?? "yhwh",
            DIVINE_NAME_ELOHIM: schema2.DIVINE_NAME_ELOHIM ?? void 0,
            SYLLABLE_SEPARATOR: schema2.SYLLABLE_SEPARATOR ?? void 0,
            ADDITIONAL_FEATURES: schema2.ADDITIONAL_FEATURES ?? void 0,
            STRESS_MARKER: schema2.STRESS_MARKER ?? void 0,
            longVowels: schema2.longVowels ?? true,
            qametsQatan: schema2.qametsQatan ?? true,
            shevaAfterMeteg: schema2.shevaAfterMeteg ?? true,
            shevaWithMeteg: schema2.shevaWithMeteg ?? false,
            sqnmlvy: schema2.sqnmlvy ?? true,
            wawShureq: schema2.wawShureq ?? true,
            article: schema2.article ?? true,
            allowNoNiqqud: schema2.allowNoNiqqud ?? true,
            strict: schema2.strict ?? false,
            holemHaser: schema2.holemHaser || "remove"
          });
        }
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/transliterate.js
  var getSylOpts, transliterate;
  var init_transliterate = __esm({
    "node_modules/hebrew-transliteration/dist/esm/transliterate.js"() {
      init_rules();
      init_schema();
      init_esm();
      init_word();
      getSylOpts = (schema2) => {
        const options = {};
        if ("longVowels" in schema2)
          options.longVowels = schema2.longVowels;
        if ("qametsQatan" in schema2)
          options.qametsQatan = schema2.qametsQatan;
        if ("sqnmlvy" in schema2)
          options.shevaAfterMeteg = schema2.shevaAfterMeteg;
        if ("sqnmlvy" in schema2)
          options.sqnmlvy = schema2.sqnmlvy;
        if ("wawShureq" in schema2)
          options.wawShureq = schema2.wawShureq;
        if ("article" in schema2)
          options.article = schema2.article;
        if ("allowNoNiqqud" in schema2)
          options.allowNoNiqqud = schema2.allowNoNiqqud;
        if ("strict" in schema2)
          options.strict = schema2.strict;
        return options;
      };
      transliterate = (text, schema2) => {
        const transSchema = schema2 instanceof Schema ? schema2 : new SBL(schema2 ?? {});
        const newText = text instanceof Text ? text : new Text(text, getSylOpts(transSchema ?? {}));
        return newText.words.map((word) => {
          let transliteration = wordRules(word, transSchema);
          if (transliteration instanceof Word) {
            transliteration = transliteration.syllables.map((s) => sylRules(s, transSchema)).join(transSchema.SYLLABLE_SEPARATOR ?? "");
          }
          return `${transliteration}${word.whiteSpaceAfter ?? ""}`;
        }).join("");
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/sequence.js
  var vowels2, sequence2;
  var init_sequence2 = __esm({
    "node_modules/hebrew-transliteration/dist/esm/sequence.js"() {
      init_esm();
      vowels2 = /[\u{05B0}-\u{05BC}\u{05C7}]/u;
      sequence2 = (text, qametsQatan = false) => {
        return vowels2.test(text) ? new Text(text, { qametsQatan }).text : text;
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/remove.js
  var removeMap, accents, points, punctuation2, marks, all, remove;
  var init_remove = __esm({
    "node_modules/hebrew-transliteration/dist/esm/remove.js"() {
      init_sequence2();
      removeMap = {
        // accents //
        ETNAHTA: "\u0591",
        // U+0591 HEBREW ACCENT ETNAHTA
        SEGOLTA: "\u0592",
        // U+0592 HEBREW ACCENT SEGOL
        SHALSHELET: "\u0593",
        // U+0593 HEBREW ACCENT SHALSHELET
        ZAQEF_QATAN: "\u0594",
        // U+0594 HEBREW ACCENT ZAQEF QATAN
        ZAQEF_GADOL: "\u0595",
        // U+0595 HEBREW ACCENT ZAQEF GADOL
        TIPEHA: "\u0596",
        // U+0596 HEBREW ACCENT TIPEHA
        REVIA: "\u0597",
        // U+0597 HEBREW ACCENT REVIA
        ZARQA: "\u0598",
        // U+0598 HEBREW ACCENT ZARQA
        PASHTA: "\u0599",
        // U+0599 HEBREW ACCENT PASHTA
        YETIV: "\u059A",
        // U+059A HEBREW ACCENT YETIV
        TEVIR: "\u059B",
        // U+059B HEBREW ACCENT TEVIR
        GERESH: "\u059C",
        // U+059C HEBREW ACCENT GERESH
        GERESH_MUQDAM: "\u059D",
        // U+059D HEBREW ACCENT GERESH MUQDAM
        GERSHAYIM: "\u059E",
        // U+059E HEBREW ACCENT GERSHAYIM
        QARNEY_PARA: "\u059F",
        // U+059F HEBREW ACCENT QARNEY PARA
        TELISHA_GEDOLA: "\u05A0",
        // U+05A0 HEBREW ACCENT TELISHA GEDOLA
        PAZER: "\u05A1",
        // U+05A1 HEBREW ACCENT PAZER
        ATNAH_HAFUKH: "\u05A2",
        // U+05A2 HEBREW ACCENT ATNAH HAFUKH
        MUNAH: "\u05A3",
        // U+05A3 HEBREW ACCENT MUNAH
        MAHAPAKH: "\u05A4",
        // U+05A4 HEBREW ACCENT MAHAPAKH
        MERKHA: "\u05A5",
        // U+05A5 HEBREW ACCENT MERKHA
        MERKHA_KEFULA: "\u05A6",
        // U+05A6 HEBREW ACCENT MERKHA KEFULA
        DARGA: "\u05A7",
        // U+05A7 HEBREW ACCENT DARGA
        QADMA: "\u05A8",
        // U+05A8 HEBREW ACCENT QADMA
        TELISHA_QETANA: "\u05A9",
        // U+05A9 HEBREW ACCENT TELISHA QETANA
        YERAH_BEN_YOMO: "\u05AA",
        // U+05AA HEBREW ACCENT YERAH BEN YOMO
        OLE: "\u05AB",
        // U+05AB HEBREW ACCENT OLE
        ILUY: "\u05AC",
        // U+05AC HEBREW ACCENT ILUY
        DEHI: "\u05AD",
        // U+05AD HEBREW ACCENT DEHI
        ZINOR: "\u05AE",
        // U+05AE HEBREW ACCENT ZINOR
        // points //
        SHEVA: "\u05B0",
        // HEBREW POINT SHEVA
        HATAF_SEGOL: "\u05B1",
        // HEBREW POINT HATAF SEGOL
        HATAF_PATAH: "\u05B2",
        // HEBREW POINT HATAF PATAH
        HATAF_QAMATS: "\u05B3",
        // HEBREW POINT HATAF QAMATS
        HIRIQ: "\u05B4",
        // HEBREW POINT HIRIQ
        TSERE: "\u05B5",
        // HEBREW POINT TSERE
        SEGOL: "\u05B6",
        // HEBREW POINT SEGOL
        PATAH: "\u05B7",
        // HEBREW POINT PATAH
        QAMATS: "\u05B8",
        // HEBREW POINT QAMATS
        HOLAM: "\u05B9",
        // HEBREW POINT HOLAM
        // below is not needed because sequnce() does not output this
        // HOLAM_HASER_FOR_VAV: "\u{05BA}", // HEBREW POINT HOLAM HASER FOR VAV
        QUBUTS: "\u05BB",
        // HEBREW POINT QUBUTS
        DAGESH: "\u05BC",
        // HEBREW POINT DAGESH OR MAPIQ
        METEG: "\u05BD",
        // HEBREW POINT METEG
        RAFE: "\u05BF",
        // HEBREW POINT RAFE
        SHIN_DOT: "\u05C1",
        // HEBREW POINT SHIN DOT
        SIN_DOT: "\u05C2",
        // HEBREW POINT SIN DOT
        QAMATS_QATAN: "\u05C7",
        // HEBREW POINT QAMATS QATAN
        MAQAF: "\u05BE",
        // HEBREW PUNCTUATION MAQAF
        PASEQ: "\u05C0",
        // HEBREW PUNCTUATION PASEQ
        SOF_PASUQ: "\u05C3",
        // HEBREW PUNCTUATION SOF_PASUQ
        NUN_HAFUKHA: "\u05C6",
        // HEBREW PUNCTUATION NUN_HAFUKHA
        // the punctuation geresh/gereshayim is different then the accent ones
        PUNC_GERESH: "\u05F3",
        // HEBREW PUNCTUATION GERESH
        PUNC_GERSHAYIM: "\u05F4",
        // HEBREW PUNCTUATION GERSHAYIM
        MASORA_CIRCLE: "\u05AF",
        // U+MASORA CIRCLE HEBREW MARK 05AF,
        UPPER_DOT: "\u05C4",
        // U+UPPER DOT HEBREW MARK 05C4,
        LOWER_DOT: "\u05C5"
        // U+LOWER DOT HEBREW MARK 05C5];
      };
      accents = {
        ETNAHTA: true,
        SEGOLTA: true,
        SHALSHELET: true,
        ZAQEF_QATAN: true,
        ZAQEF_GADOL: true,
        TIPEHA: true,
        REVIA: true,
        ZARQA: true,
        PASHTA: true,
        YETIV: true,
        TEVIR: true,
        GERESH: true,
        GERESH_MUQDAM: true,
        GERSHAYIM: true,
        QARNEY_PARA: true,
        TELISHA_GEDOLA: true,
        PAZER: true,
        ATNAH_HAFUKH: true,
        MUNAH: true,
        MAHAPAKH: true,
        MERKHA: true,
        MERKHA_KEFULA: true,
        DARGA: true,
        QADMA: true,
        TELISHA_QETANA: true,
        YERAH_BEN_YOMO: true,
        OLE: true,
        ILUY: true,
        DEHI: true,
        ZINOR: true
      };
      points = {
        SHEVA: true,
        HATAF_SEGOL: true,
        HATAF_PATAH: true,
        HATAF_QAMATS: true,
        HIRIQ: true,
        TSERE: true,
        SEGOL: true,
        PATAH: true,
        QAMATS: true,
        HOLAM: true,
        QUBUTS: true,
        DAGESH: true,
        SHIN_DOT: true,
        SIN_DOT: true,
        METEG: true,
        RAFE: true,
        QAMATS_QATAN: true
      };
      punctuation2 = {
        MAQAF: true,
        PASEQ: true,
        SOF_PASUQ: true,
        NUN_HAFUKHA: true,
        PUNC_GERESH: true,
        PUNC_GERSHAYIM: true
      };
      marks = {
        MASORA_CIRCLE: true,
        UPPER_DOT: true,
        LOWER_DOT: true
      };
      all = {
        ...accents,
        ...points,
        ...punctuation2,
        ...marks
      };
      remove = (text, options = { ...accents, METEG: true, RAFE: true }) => {
        const keys = Object.keys(options).filter((k) => k in options ? options[k] : false);
        const sequenced = sequence2(text);
        return keys.reduce((a, c) => {
          const key = removeMap[c] ?? null;
          if (key) {
            const replacement = key === "\u05BE" ? " " : "";
            return a.replace(new RegExp(key, "gu"), replacement);
          }
          return a;
        }, sequenced);
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/index.js
  var init_esm2 = __esm({
    "node_modules/hebrew-transliteration/dist/esm/index.js"() {
      init_esm();
      init_transliterate();
      init_sequence2();
      init_remove();
      init_schema();
    }
  });

  // src/assets/js/wrapper.js
  var Wrapper;
  var init_wrapper = __esm({
    "src/assets/js/wrapper.js"() {
      init_esm2();
      Wrapper = class {
        constructor() {
          this.supportsRegex = this.supportsRegexLookAheadLookBehind();
        }
        /**
         * check if regex lookahead and lookbehind supported
         *
         * @returns {boolean}
         */
        supportsRegexLookAheadLookBehind() {
          try {
            return "hibyehihi".replace(new RegExp("(?<=hi)hi", "g"), "hello").replace(new RegExp("hi(?!bye)", "g"), "hey") === "hibyeheyhello";
          } catch (error) {
            return false;
          }
        }
        /**
         * posts errors to the /api/error route
         *
         * @param {any} error
         * @param {string} text
         * @param {{[k:string]: any}} options
         */
        postError(error, text, options) {
          fetch("/api/error", {
            method: "POST",
            body: JSON.stringify({
              text,
              error: error?.message || error,
              path: window.location.pathname,
              options: JSON.stringify(options),
              browser: navigator.userAgent
            })
          });
        }
        /**
         * gets transliteration from Netlify function
         *
         * @param {string} text
         * @param {Schema} schema
         * @returns {Promise<string>} a transliterated string
         */
        async fetchTransliteration(text, schema2) {
          try {
            const resp = await fetch("/api/transliterate", {
              method: "POST",
              body: JSON.stringify({
                text,
                schema: schema2
              })
            });
            if (!resp.ok) throw await resp.json();
            const json = await resp.json();
            return json.transliteration;
          } catch (error) {
            throw error;
          }
        }
        /**
         * gets text from Netlify function
         *
         * @param {string} text
         * @param {{[x: string]: boolean}} options
         * @returns {Promise<string>} a string with options removed
         */
        async fetchRemove(text, options) {
          try {
            const resp = await fetch("/api/remove", {
              method: "POST",
              body: JSON.stringify({
                text,
                options
              })
            });
            if (!resp.ok) throw await resp.json();
            const json = await resp.json();
            return json.text;
          } catch (error) {
            throw error;
          }
        }
        /**
         * wrapper around the `transliterate()` function
         *
         * @param {string} text
         * @param {Schema} schema
         * @returns {Promise<string>} a transliterated string
         */
        async transliterate(text, schema2) {
          try {
            if (!this.supportsRegex) {
              return await this.fetchTransliteration(text, schema2);
            }
            return transliterate(text, schema2);
          } catch (error) {
            this.postError(error, text, schema2);
            throw error;
          }
        }
        /**
         * a wrapper around the `remove()` function
         *
         * @param {string} text
         * @param {{[x: string]: boolean}} options
         */
        async remove(text, options) {
          try {
            if (!this.supportsRegex) {
              return await this.fetchRemove(text, options);
            }
            return remove(text, options);
          } catch (error) {
            this.postError(error, text, options);
            throw error;
          }
        }
      };
    }
  });

  // src/assets/js/wizard.js
  var Wizard;
  var init_wizard = __esm({
    "src/assets/js/wizard.js"() {
      Wizard = class {
        /**
         *
         * @param {HTMLCollection} HTMLCollection
         * @param {string} onClass - css class to control if panel is visible
         * @param {string} offClass - css class to control if panel is not visible
         * @param {{btn: HTMLButtonElement, text: string}} prevBtn
         * @param {{btn: HTMLButtonElement, text: string, initText?: string}} nextBtn
         * @param {{btn: HTMLButtonElement, text: string}} finalBtn
         */
        constructor(HTMLCollection, onClass, offClass, prevBtn, nextBtn, finalBtn) {
          this.steps = HTMLCollection;
          this.index = 0;
          this.onClass = onClass;
          this.offClass = offClass;
          this.prevBtn = prevBtn;
          this.nextBtn = nextBtn;
          this.finalBtn = finalBtn;
        }
        previous() {
          return this.steps[this.index - 1] ?? null;
        }
        current() {
          return this.steps[this.index];
        }
        next() {
          return this.steps[this.index + 1] ?? null;
        }
        /**
         *
         * @param {Element} step
         */
        turnOn(step) {
          step.classList.toggle(this.offClass);
          step.classList.toggle(this.onClass);
        }
        /**
         *
         * @param {Element} step
         */
        turnOff(step) {
          step.classList.toggle(this.onClass);
          step.classList.toggle(this.offClass);
        }
        increaseStep() {
          if (this.next()) {
            this.turnOff(this.current());
            this.turnOn(this.next());
            this.index = this.index + 1;
            return true;
          }
          return false;
        }
        decreaseStep() {
          if (this.previous()) {
            this.turnOff(this.current());
            this.turnOn(this.previous());
            this.index = this.index - 1;
            return true;
          }
          return false;
        }
        reset() {
          this.turnOff(this.current());
          this.index = 0;
          this.turnOn(this.steps[this.index]);
        }
        prevWindow = () => {
          if (!this.previous()) return;
          if (!this.next()) {
            this.turnOff(this.finalBtn.btn);
            this.turnOn(this.nextBtn.btn);
          }
          this.decreaseStep();
          if (!this.previous()) {
            this.turnOn(this.prevBtn.btn);
          }
          if (this.index) {
            this.prevBtn.btn.innerText = this.prevBtn.text;
          }
          if (!this.index) {
            this.nextBtn.btn.innerText = this.nextBtn.initText ?? this.nextBtn.text;
          }
        };
        nextWindow = () => {
          if (!this.next()) return;
          if (!this.previous()) {
            this.turnOn(this.prevBtn.btn);
          }
          this.increaseStep();
          if (this.index) {
            this.nextBtn.btn.innerText = this.nextBtn.text;
          }
          if (!this.next()) {
            this.turnOff(this.nextBtn.btn);
            this.turnOn(this.finalBtn.btn);
          }
        };
        resetModalWindow = () => {
          this.reset();
          if (this.next()) {
            this.turnOn(this.nextBtn.btn);
            this.turnOff(this.finalBtn.btn);
            this.turnOff(this.prevBtn.btn);
          }
        };
        init() {
          this.nextBtn.btn.addEventListener("click", this.nextWindow);
          this.prevBtn.btn.addEventListener("click", this.prevWindow);
          this.finalBtn.btn.addEventListener("click", this.resetModalWindow);
          if (!this.next()) {
            this.turnOff(this.nextBtn.btn);
            this.turnOn(this.finalBtn.btn);
          }
        }
      };
    }
  });

  // src/assets/js/feedback.js
  var feedbackFormInit;
  var init_feedback = __esm({
    "src/assets/js/feedback.js"() {
      feedbackFormInit = () => {
        const feedbackForm = (
          /** @type {HTMLFormElement} */
          document.querySelector("#feedback-modal form")
        );
        feedbackForm.addEventListener("submit", (e) => {
          e.preventDefault();
          if (!e.target) throw new Error("No event target");
          const form = (
            /** @type {HTMLFormElement} */
            e.target
          );
          const formData = new FormData(form);
          fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData))
          }).then(() => alert("Form successfully submitted")).then(() => {
            const url = new URL(window.location);
            window.location = url.origin + url.pathname + "#";
          }).catch((error) => alert(error));
        });
      };
    }
  });

  // src/_data/sbl-academic.json
  var sbl_academic_default;
  var init_sbl_academic = __esm({
    "src/_data/sbl-academic.json"() {
      sbl_academic_default = {
        VOCAL_SHEVA: "\u01DD",
        HATAF_SEGOL: "\u0115",
        HATAF_PATAH: "\u0103",
        HATAF_QAMATS: "\u014F",
        HIRIQ: "i",
        TSERE: "\u0113",
        SEGOL: "e",
        PATAH: "a",
        QAMATS: "\u0101",
        HOLAM: "\u014D",
        QUBUTS: "\u016B",
        DAGESH: "",
        DAGESH_CHAZAQ: true,
        MAQAF: "-",
        PASEQ: "",
        SOF_PASUQ: "",
        QAMATS_QATAN: "o",
        FURTIVE_PATAH: "a",
        HIRIQ_YOD: "\xEE",
        TSERE_YOD: "\xEA",
        SEGOL_YOD: "\xEA",
        SHUREQ: "\xFB",
        HOLAM_VAV: "\xF4",
        QAMATS_HE: "\xE2",
        SEGOL_HE: "\xEA",
        TSERE_HE: "\xEA",
        MS_SUFX: "\u0101yw",
        ALEF: "\u02BE",
        BET: "b",
        BET_DAGESH: null,
        GIMEL: "g",
        GIMEL_DAGESH: null,
        DALET: "d",
        DALET_DAGESH: null,
        HE: "h",
        VAV: "w",
        ZAYIN: "z",
        HET: "\u1E25",
        TET: "\u1E6D",
        YOD: "y",
        FINAL_KAF: "k",
        KAF: "k",
        KAF_DAGESH: null,
        LAMED: "l",
        FINAL_MEM: "m",
        MEM: "m",
        FINAL_NUN: "n",
        NUN: "n",
        SAMEKH: "s",
        AYIN: "\u02BF",
        FINAL_PE: "p",
        PE: "p",
        PE_DAGESH: null,
        FINAL_TSADI: "\u1E63",
        TSADI: "\u1E63",
        QOF: "q",
        RESH: "r",
        SHIN: "\u0161",
        SIN: "\u015B",
        TAV: "t",
        TAV_DAGESH: null,
        DIVINE_NAME: "yhwh",
        SYLLABLE_SEPARATOR: null,
        ADDITIONAL_FEATURES: null,
        STRESS_MARKER: null,
        longVowels: true,
        qametsQatan: true,
        sqnmlvy: true,
        wawShureq: true,
        article: true
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/brillAcademic.js
  var brillAcademic;
  var init_brillAcademic = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/brillAcademic.js"() {
      brillAcademic = {
        VOCAL_SHEVA: "\u1D49",
        HATAF_SEGOL: "\u0119",
        HATAF_PATAH: "\u1D43",
        HATAF_QAMATS: "\u1D52",
        HIRIQ: "\u012B",
        TSERE: "\u0113",
        SEGOL: "\u0119",
        PATAH: "a",
        QAMATS: "\u0101",
        HOLAM: "\u014D",
        HOLAM_HASER: "\u014D",
        QUBUTS: "\u016B",
        DAGESH: "",
        DAGESH_CHAZAQ: true,
        MAQAF: "-",
        PASEQ: "",
        SOF_PASUQ: "",
        QAMATS_QATAN: "\u014F",
        FURTIVE_PATAH: "a",
        HIRIQ_YOD: "\xEE",
        TSERE_YOD: "\xEA",
        SEGOL_YOD: "\xEA",
        SHUREQ: "\xFB",
        HOLAM_VAV: "\xF4",
        QAMATS_HE: "\xE2",
        SEGOL_HE: "\u0119\u0304",
        TSERE_HE: "\u0113h",
        MS_SUFX: "\u0101yw",
        ALEF: "\u02BE",
        BET_DAGESH: "b",
        BET: "\u1E07",
        GIMEL: "\u1E21",
        GIMEL_DAGESH: "g",
        DALET: "\u1E0F",
        DALET_DAGESH: "d",
        HE: "h",
        VAV: "w",
        ZAYIN: "z",
        HET: "\u1E25",
        TET: "\u1E6D",
        YOD: "y",
        FINAL_KAF: "\u1E35",
        KAF: "\u1E35",
        KAF_DAGESH: "k",
        LAMED: "l",
        FINAL_MEM: "m",
        MEM: "m",
        FINAL_NUN: "n",
        NUN: "n",
        SAMEKH: "s",
        AYIN: "\u02BF",
        FINAL_PE: "p\u0304",
        PE: "p\u0304",
        PE_DAGESH: "p",
        FINAL_TSADI: "\u1E63",
        TSADI: "\u1E63",
        QOF: "q",
        RESH: "r",
        SHIN: "\u0161",
        SIN: "\u015B",
        TAV: "\u1E6F",
        TAV_DAGESH: "t",
        DIVINE_NAME: "yhwh",
        SYLLABLE_SEPARATOR: "",
        longVowels: true,
        qametsQatan: true,
        sqnmlvy: true,
        shevaAfterMeteg: true,
        wawShureq: true,
        article: true,
        allowNoNiqqud: true,
        strict: false,
        holemHaser: "remove"
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/brillSimple.js
  var brillSimple;
  var init_brillSimple = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/brillSimple.js"() {
      brillSimple = {
        VOCAL_SHEVA: "\u1D49",
        HATAF_SEGOL: "e",
        HATAF_PATAH: "a",
        HATAF_QAMATS: "o",
        HIRIQ: "i",
        TSERE: "e",
        SEGOL: "e",
        PATAH: "a",
        QAMATS: "a",
        HOLAM: "o",
        HOLAM_HASER: "o",
        QUBUTS: "u",
        DAGESH: "",
        DAGESH_CHAZAQ: true,
        MAQAF: "-",
        PASEQ: "",
        SOF_PASUQ: "",
        QAMATS_QATAN: "o",
        FURTIVE_PATAH: "a",
        HIRIQ_YOD: "i",
        TSERE_YOD: "ei",
        SEGOL_YOD: "e",
        SHUREQ: "u",
        HOLAM_VAV: "o",
        QAMATS_HE: "a",
        SEGOL_HE: "e",
        TSERE_HE: "e",
        MS_SUFX: "ayw",
        ALEF: "\u2019",
        BET_DAGESH: "b",
        BET: "v",
        GIMEL: "g",
        GIMEL_DAGESH: "g",
        DALET: "d",
        DALET_DAGESH: "d",
        HE: "h",
        VAV: "v",
        ZAYIN: "z",
        HET: "\u1E25",
        TET: "t",
        YOD: "y",
        FINAL_KAF: "kh",
        KAF: "kh",
        KAF_DAGESH: "k",
        LAMED: "l",
        FINAL_MEM: "m",
        MEM: "m",
        FINAL_NUN: "n",
        NUN: "n",
        SAMEKH: "s",
        AYIN: "\u2018",
        FINAL_PE: "f",
        PE: "f",
        PE_DAGESH: "p",
        FINAL_TSADI: "tz",
        TSADI: "tz",
        QOF: "q",
        RESH: "r",
        SHIN: "sh",
        SIN: "s",
        TAV: "t",
        TAV_DAGESH: "t",
        DIVINE_NAME: "yhwh",
        longVowels: true,
        qametsQatan: true,
        shevaAfterMeteg: true,
        sqnmlvy: true,
        wawShureq: true,
        article: true,
        allowNoNiqqud: true,
        strict: false,
        holemHaser: "remove"
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/sblAcademicSpirantization.js
  var sblAcademicSpirantization;
  var init_sblAcademicSpirantization = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/sblAcademicSpirantization.js"() {
      sblAcademicSpirantization = {
        VOCAL_SHEVA: "\u01DD",
        HATAF_SEGOL: "\u0115",
        HATAF_PATAH: "\u0103",
        HATAF_QAMATS: "\u014F",
        HIRIQ: "i",
        TSERE: "\u0113",
        SEGOL: "e",
        PATAH: "a",
        QAMATS: "\u0101",
        HOLAM: "\u014D",
        HOLAM_HASER: "\u014D",
        QUBUTS: "\u016B",
        DAGESH: "",
        DAGESH_CHAZAQ: true,
        MAQAF: "-",
        PASEQ: "",
        SOF_PASUQ: "",
        QAMATS_QATAN: "o",
        FURTIVE_PATAH: "a",
        HIRIQ_YOD: "\xEE",
        TSERE_YOD: "\xEA",
        SEGOL_YOD: "\xEA",
        SHUREQ: "\xFB",
        HOLAM_VAV: "\xF4",
        QAMATS_HE: "\xE2",
        SEGOL_HE: "\xEA",
        TSERE_HE: "\xEA",
        MS_SUFX: "\u0101yw",
        ALEF: "\u02BE",
        BET: "b\u0331",
        BET_DAGESH: "b",
        GIMEL: "g\u0331",
        GIMEL_DAGESH: "g",
        DALET: "d\u0331",
        DALET_DAGESH: "d",
        HE: "h",
        VAV: "w",
        ZAYIN: "z",
        HET: "\u1E25",
        TET: "\u1E6D",
        YOD: "y",
        FINAL_KAF: "k\u0331",
        KAF: "k\u0331",
        KAF_DAGESH: "k",
        LAMED: "l",
        FINAL_MEM: "m",
        MEM: "m",
        FINAL_NUN: "n",
        NUN: "n",
        SAMEKH: "s",
        AYIN: "\u02BF",
        FINAL_PE: "p\u0331",
        PE: "p\u0331",
        PE_DAGESH: "p",
        FINAL_TSADI: "\u1E63",
        TSADI: "\u1E63",
        QOF: "q",
        RESH: "r",
        SHIN: "\u0161",
        SIN: "\u015B",
        TAV: "t\u0331",
        TAV_DAGESH: "t",
        DIVINE_NAME: "yhwh",
        longVowels: true,
        qametsQatan: true,
        shevaAfterMeteg: true,
        sqnmlvy: true,
        wawShureq: true,
        article: true,
        allowNoNiqqud: true,
        strict: false,
        holemHaser: "remove"
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/sblSimple.js
  var sblSimple;
  var init_sblSimple = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/sblSimple.js"() {
      sblSimple = {
        ALEF: "",
        BET: "v",
        BET_DAGESH: "b",
        GIMEL: "g",
        DALET: "d",
        HE: "h",
        VAV: "v",
        ZAYIN: "z",
        HET: "kh",
        TET: "t",
        YOD: "y",
        KAF: "kh",
        KAF_DAGESH: "k",
        FINAL_KAF: "kh",
        LAMED: "l",
        MEM: "m",
        FINAL_MEM: "m",
        NUN: "n",
        FINAL_NUN: "n",
        SAMEKH: "s",
        AYIN: "",
        PE: "f",
        PE_DAGESH: "p",
        FINAL_PE: "f",
        TSADI: "ts",
        FINAL_TSADI: "ts",
        QOF: "q",
        RESH: "r",
        SIN: "s",
        SHIN: "sh",
        TAV: "t",
        DAGESH: "",
        DAGESH_CHAZAQ: true,
        VOCAL_SHEVA: "e",
        PATAH: "a",
        HATAF_PATAH: "a",
        QAMATS: "a",
        HATAF_QAMATS: "o",
        SEGOL: "e",
        HATAF_SEGOL: "e",
        TSERE: "e",
        HIRIQ: "i",
        HOLAM: "o",
        HOLAM_HASER: "o",
        QUBUTS: "u",
        QAMATS_HE: "ah",
        SEGOL_HE: "eh",
        TSERE_HE: "eh",
        SEGOL_YOD: "e",
        HIRIQ_YOD: "i",
        TSERE_YOD: "e",
        FURTIVE_PATAH: "a",
        QAMATS_QATAN: "o",
        HOLAM_VAV: "o",
        SHUREQ: "u",
        MS_SUFX: "ayw",
        PASEQ: "",
        SOF_PASUQ: "",
        MAQAF: "-",
        DIVINE_NAME: "yhwh",
        ADDITIONAL_FEATURES: [
          {
            FEATURE: "cluster",
            HEBREW: "\u05E9\u05C1\u05BC",
            TRANSLITERATION: "sh"
          },
          {
            FEATURE: "cluster",
            HEBREW: "\u05E6\u05BC",
            TRANSLITERATION: "ts"
          }
        ],
        longVowels: true,
        shevaAfterMeteg: true,
        sqnmlvy: true,
        qametsQatan: true,
        wawShureq: true,
        article: true,
        allowNoNiqqud: true,
        strict: false,
        holemHaser: "remove"
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/michiganClaremont.js
  var michiganClaremont;
  var init_michiganClaremont = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/michiganClaremont.js"() {
      michiganClaremont = {
        VOCAL_SHEVA: ":",
        HATAF_SEGOL: ":E",
        HATAF_PATAH: ":A",
        HATAF_QAMATS: ":F",
        HIRIQ: "I",
        TSERE: '"',
        SEGOL: "E",
        PATAH: "A",
        QAMATS: "F",
        HOLAM: "O",
        HOLAM_HASER: "O",
        QUBUTS: "U",
        DAGESH: "",
        DAGESH_CHAZAQ: true,
        MAQAF: "-",
        PASEQ: "",
        SOF_PASUQ: "",
        QAMATS_QATAN: "F",
        FURTIVE_PATAH: "A",
        HIRIQ_YOD: "I",
        TSERE_YOD: '"',
        SEGOL_YOD: "E",
        SHUREQ: "W.",
        HOLAM_VAV: "OW",
        QAMATS_HE: "F",
        SEGOL_HE: "E",
        TSERE_HE: '"',
        MS_SUFX: "FYW",
        ALEF: ")",
        BET: "B",
        GIMEL: "G",
        DALET: "D",
        HE: "H",
        VAV: "W",
        ZAYIN: "Z",
        HET: "X",
        TET: "+",
        YOD: "Y",
        FINAL_KAF: "K",
        KAF: "K",
        LAMED: "L",
        FINAL_MEM: "M",
        MEM: "M",
        FINAL_NUN: "N",
        NUN: "N",
        SAMEKH: "S",
        AYIN: "(",
        FINAL_PE: "P",
        PE: "P",
        FINAL_TSADI: "C",
        TSADI: "C",
        QOF: "Q",
        RESH: "R",
        SHIN: "$",
        SIN: "&",
        TAV: "T",
        DIVINE_NAME: "YHWH",
        longVowels: true,
        qametsQatan: false,
        shevaAfterMeteg: true,
        sqnmlvy: false,
        wawShureq: true,
        article: false,
        allowNoNiqqud: true,
        strict: false,
        holemHaser: "remove"
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/romaniote.js
  var romaniote;
  var init_romaniote = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/romaniote.js"() {
      romaniote = {
        ALEF: "",
        BET: "\u03B2",
        BET_DAGESH: "\u03BC\u03C0",
        GIMEL: "\u03B3",
        GIMEL_DAGESH: "\u03B3\u03BA",
        DALET: "\u03B4",
        DALET_DAGESH: "\u03BD\u03C4",
        HE: "",
        VAV: "\u03B2",
        ZAYIN: "\u03B6",
        HET: "\u03C7",
        TET: "\u03C4",
        YOD: "\u03B3\u03B9",
        KAF: "\u03C7",
        KAF_DAGESH: "\u03BA",
        FINAL_KAF: "\u03C7",
        LAMED: "\u03BB",
        MEM: "\u03BC",
        FINAL_MEM: "\u03BC",
        NUN: "\u03BD",
        FINAL_NUN: "\u03BD",
        SAMEKH: "\u03C3",
        AYIN: "",
        PE: "\u03C6",
        PE_DAGESH: "\u03C0",
        FINAL_PE: "\u03C6",
        TSADI: "\u03C4\u03C3",
        FINAL_TSADI: "\u03C4\u03C2",
        QOF: "\u03BA",
        RESH: "\u03C1",
        SIN: "\u03C3",
        SHIN: "\u03C3\u03C3",
        TAV: "\u03B8",
        TAV_DAGESH: "\u03C4",
        DAGESH: "",
        DAGESH_CHAZAQ: false,
        VOCAL_SHEVA: "\u03B5",
        PATAH: "\u03B1",
        HATAF_PATAH: "\u03B1",
        QAMATS: "\u03B1",
        HATAF_QAMATS: "\u03BF",
        SEGOL: "\u03B5",
        HATAF_SEGOL: "\u03B5",
        TSERE: "\u03B5",
        HIRIQ: "\u03B9",
        HOLAM: "\u03C9",
        HOLAM_HASER: "\u03C9",
        QUBUTS: "\u03BF\u03C5",
        QAMATS_HE: "\u03B1",
        SEGOL_HE: "\u03B5",
        TSERE_HE: "\u03B5",
        SEGOL_YOD: "\u03B5",
        HIRIQ_YOD: "\u03B9",
        TSERE_YOD: "\u03B5",
        FURTIVE_PATAH: "a",
        QAMATS_QATAN: "\u03BF",
        HOLAM_VAV: "\u03C9",
        SHUREQ: "\u03BF\u03C5",
        MS_SUFX: "\u03AC\u03B2",
        PASEQ: "",
        SOF_PASUQ: "",
        MAQAF: "-",
        DIVINE_NAME: "\u0391\u03B4\u03C9\u03BD\u03AC\u03B7",
        ADDITIONAL_FEATURES: [
          {
            FEATURE: "cluster",
            HEBREW: "\u05D6\u05BC",
            TRANSLITERATION: "\u03C4\u03B6"
          },
          {
            FEATURE: "cluster",
            // final shin or samekh
            HEBREW: /(\u{05E9}\u{05C2}|\u{05E9}|\u{05E1})$/u,
            TRANSLITERATION: "\u03C2"
          },
          {
            FEATURE: "syllable",
            // final sin
            HEBREW: /\u{05E9}\u{05C1}$/u,
            TRANSLITERATION: (syllable, hebrew) => {
              if (syllable.isFinal) {
                return syllable.text.replace(hebrew, "\u03C3\u03C2");
              }
              return syllable.text;
            }
          },
          {
            FEATURE: "syllable",
            // patach or qamats yod
            HEBREW: /(?<patachYod>[\u{05B7}\u{05B8}][\u{0590}-\u{05AF}\u{05BD}\u{05BF}]?\u{05D9}[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]?)(?<maqqaf>\u{05BE}?)/u,
            TRANSLITERATION: (syllable, hebrew) => {
              const match = syllable.text.match(hebrew);
              const groups = match?.groups;
              if (!groups) {
                return syllable.text;
              }
              const { patachYod } = groups;
              return syllable.text.replace(patachYod, "\u03B1\u03B7");
            }
          },
          {
            FEATURE: "cluster",
            // consonantal yod with hiriq as vowel
            HEBREW: /(\u{05D9}\u{05B4})/u,
            TRANSLITERATION: "\u03B3\u03B9"
          },
          {
            FEATURE: "syllable",
            // tsere yod
            HEBREW: /(?<tsereYod>\u{05B5}[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]?\u{05D9}[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]?)(?<maqqaf>\u{05BE}?)$/u,
            TRANSLITERATION: (syllable, hebrew) => {
              const match = syllable.text.match(hebrew);
              const groups = match?.groups;
              if (!groups) {
                return syllable.text;
              }
              const { tsereYod } = groups;
              if (syllable.isFinal) {
                return syllable.text.replace(tsereYod, "\u03B1\u03B9\u0301");
              }
              return syllable.text.replace(tsereYod, "\u03B5");
            }
          },
          {
            FEATURE: "syllable",
            // hiriq yod
            HEBREW: /(?<hiriqYod>\u{05B4}[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]?\u{05D9}[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]?)(?<maqqaf>\u{05BE}?)$/u,
            TRANSLITERATION: (syllable, hebrew) => {
              const match = syllable.text.match(hebrew);
              const groups = match?.groups;
              if (!groups) {
                return syllable.text;
              }
              const { hiriqYod } = groups;
              if (syllable.isFinal) {
                const finalHiriqYod = syllable.isAccented ? "\u03AE" : "\u03B7";
                return syllable.text.replace(hiriqYod, finalHiriqYod);
              }
              return syllable.isAccented ? syllable.text.replace(hiriqYod, "\u03AF") : syllable.text.replace(hiriqYod, "\u03B9");
            }
          },
          {
            FEATURE: "syllable",
            // masculine plural marker
            HEBREW: /(\u{05B4}[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]?\u{05D9}\u{05DD})/u,
            TRANSLITERATION: (syllable, hebrew) => {
              return syllable.text.replace(hebrew, "\u03B5\u03B9\u0301\u03BC");
            }
          }
        ],
        STRESS_MARKER: {
          mark: "\u0301",
          location: "after-vowel",
          exclude: "single"
        },
        longVowels: true,
        shevaAfterMeteg: true,
        sqnmlvy: true,
        qametsQatan: true,
        wawShureq: true,
        article: true,
        allowNoNiqqud: true,
        strict: false,
        holemHaser: "remove"
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/jss.js
  var jss;
  var init_jss = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/jss.js"() {
      jss = {
        VOCAL_SHEVA: "\u01DD",
        HATAF_SEGOL: "\u025B\u0306",
        HATAF_PATAH: "\u0103",
        HATAF_QAMATS: "\xE5\u0306",
        HIRIQ: "i",
        TSERE: "\u0113",
        SEGOL: "\u025B",
        PATAH: "a",
        QAMATS: "\xE5\u0304",
        HOLAM: "\u014D",
        HOLAM_HASER: "\u014D",
        QUBUTS: "u",
        DAGESH: "",
        DAGESH_CHAZAQ: true,
        MAQAF: " ",
        PASEQ: "",
        SOF_PASUQ: "",
        QAMATS_QATAN: "\xE5",
        FURTIVE_PATAH: "a",
        HIRIQ_YOD: "\u012B",
        TSERE_YOD: "\u0113",
        SEGOL_YOD: "\u025B",
        SHUREQ: "\u016B",
        HOLAM_VAV: "\u014D",
        QAMATS_HE: "\xE5\u0304",
        SEGOL_HE: "\u025B",
        TSERE_HE: "\u0113",
        MS_SUFX: "\xE5\u0304yw",
        ALEF: "\u02BE",
        BET_DAGESH: "b",
        BET: "b\u0331",
        GIMEL: "g\u0304",
        GIMEL_DAGESH: "g",
        DALET: "d\u0331",
        DALET_DAGESH: "d",
        HE: "h",
        VAV: "w",
        ZAYIN: "z",
        HET: "\u1E25",
        TET: "\u1E6D",
        YOD: "y",
        FINAL_KAF: "k\u0331",
        KAF: "k\u0331",
        KAF_DAGESH: "k",
        LAMED: "l",
        FINAL_MEM: "m",
        MEM: "m",
        FINAL_NUN: "n",
        NUN: "n",
        SAMEKH: "s",
        AYIN: "\u02BF",
        FINAL_PE: "p\u0304",
        PE: "p\u0304",
        PE_DAGESH: "p",
        FINAL_TSADI: "\u1E63",
        TSADI: "\u1E63",
        QOF: "q",
        RESH: "r",
        SHIN: "\u0161",
        SIN: "\u015B",
        TAV: "t\u0331",
        TAV_DAGESH: "t",
        DIVINE_NAME: "yhwh",
        ADDITIONAL_FEATURES: [
          {
            FEATURE: "syllable",
            // if the syllable contains a qamets qatan character
            HEBREW: /\u{05C7}/,
            TRANSLITERATION: (syllable) => {
              const next = syllable?.next?.value?.text;
              if (next && next.includes("\u05B3")) {
                return syllable.text.replace("\u05C7", "\u05B8");
              }
              return syllable.text;
            }
          }
        ],
        longVowels: true,
        qametsQatan: true,
        sqnmlvy: true,
        wawShureq: true,
        article: true,
        allowNoNiqqud: true,
        strict: false,
        holemHaser: "remove",
        shevaAfterMeteg: true
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/tiberian.js
  var tiberian;
  var init_tiberian = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/tiberian.js"() {
      tiberian = {
        VOCAL_SHEVA: "a",
        HATAF_SEGOL: "\u025B",
        HATAF_PATAH: "a",
        HATAF_QAMATS: "\u0254",
        HIRIQ: "i",
        TSERE: "e",
        SEGOL: "\u025B",
        PATAH: "a",
        QAMATS: "\u0254",
        HOLAM: "o",
        HOLAM_HASER: "o",
        QUBUTS: "u",
        DAGESH: "",
        DAGESH_CHAZAQ: true,
        MAQAF: "-",
        PASEQ: "",
        SOF_PASUQ: "",
        QAMATS_QATAN: "\u0254",
        FURTIVE_PATAH: "a",
        HIRIQ_YOD: "i\u02D0",
        TSERE_YOD: "e\u02D0",
        SEGOL_YOD: "\u025B\u02D0",
        SHUREQ: "u\u02D0",
        HOLAM_VAV: "o\u02D0",
        QAMATS_HE: "\u0254\u02D0",
        SEGOL_HE: "\u025B\u02D0",
        TSERE_HE: "e\u02D0",
        MS_SUFX: "\u0254w",
        ALEF: "\u0294",
        BET: "v",
        BET_DAGESH: "b",
        GIMEL: "\u0281",
        GIMEL_DAGESH: "g",
        DALET: "\xF0",
        DALET_DAGESH: "d",
        HE: "h",
        VAV: "v",
        ZAYIN: "z",
        HET: "\u0127",
        TET: "t\u02C1",
        YOD: "j",
        FINAL_KAF: "\u03C7",
        KAF: "\u03C7",
        KAF_DAGESH: "k\u02B0",
        LAMED: "l",
        FINAL_MEM: "m",
        MEM: "m",
        FINAL_NUN: "n",
        NUN: "n",
        SAMEKH: "s",
        AYIN: "\u0295",
        FINAL_PE: "f",
        PE: "f",
        PE_DAGESH: "p\u02B0",
        FINAL_TSADI: "s\u02C1",
        TSADI: "s\u02C1",
        QOF: "q\u031F",
        RESH: "\u0280\u031F",
        SHIN: "\u0283",
        SIN: "s",
        TAV: "\u03B8",
        TAV_DAGESH: "t\u02B0",
        DIVINE_NAME: "\u0294a\xF0o\u02D0\u02C8n\u0254\u02D0\u0254j",
        DIVINE_NAME_ELOHIM: "\u0294\u025Blo\u02D0\u02C8hi\u02D0im",
        STRESS_MARKER: { location: "before-syllable", mark: "\u02C8" },
        ADDITIONAL_FEATURES: [
          {
            FEATURE: "cluster",
            HEBREW: "\u05D9\u05BC",
            TRANSLITERATION: (cluster, hebrew) => {
              return cluster.text.replace(hebrew, "\u025F\u025F");
            }
          },
          {
            FEATURE: "cluster",
            HEBREW: /תּ(?!\u{05B0})/u,
            TRANSLITERATION: (cluster, _, schema2) => {
              if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
                return cluster.text;
              }
              const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
              if (!prevCoda?.includes("\u05EA")) {
                return cluster.text;
              }
              const noAspiration = schema2["TAV_DAGESH"]?.replace("\u02B0", "") ?? "";
              return cluster.text.replace("\u05EA\u05BC", `${noAspiration + schema2["TAV_DAGESH"]}`);
            }
          },
          {
            FEATURE: "cluster",
            HEBREW: /פ(?!\u{05b0})/u,
            TRANSLITERATION: (cluster, _, schema2) => {
              if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
                return cluster.text;
              }
              const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
              if (!prevCoda?.includes("\u05E4")) {
                return cluster.text;
              }
              const noAspiration = schema2["PE_DAGESH"]?.replace("\u02B0", "") ?? "";
              return cluster.text.replace("\u05E4\u05BC", `${noAspiration + schema2["PE_DAGESH"]}`);
            }
          },
          {
            FEATURE: "cluster",
            HEBREW: /טּ(?!\u{05b0})/u,
            TRANSLITERATION: (cluster, _, schema2) => {
              if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
                return cluster.text;
              }
              const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
              if (!prevCoda?.includes("\u05D8")) {
                return cluster.text;
              }
              const noPharyngealization = schema2["TET"]?.replace("\u02C1", "") ?? "";
              return cluster.text.replace("\u05D8", `${noPharyngealization + schema2["TET"]}`);
            }
          },
          {
            FEATURE: "cluster",
            HEBREW: /צּ(?!\u{05b0})/u,
            TRANSLITERATION: (cluster, _, schema2) => {
              if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
                return cluster.text;
              }
              const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
              if (!prevCoda?.includes("\u05E6")) {
                return cluster.text;
              }
              const noPharyngealization = schema2["TSADI"]?.replace("\u02C1", "") ?? "";
              return cluster.text.replace("\u05E6", `${noPharyngealization + schema2["TSADI"]}`);
            }
          },
          {
            FEATURE: "cluster",
            HEBREW: /(כּ|ךּ)(?!\u{05b0})/u,
            TRANSLITERATION: (cluster, _, schema2) => {
              if (!cluster.prev || cluster.prev.value?.isNotHebrew) {
                return cluster.text;
              }
              const prevCoda = cluster.syllable?.prev?.value?.codaWithGemination;
              if (!prevCoda?.includes("\u05DB") && !prevCoda?.includes("\u05DA")) {
                return cluster.text;
              }
              const noAspiration = schema2["KAF_DAGESH"]?.replace("\u02B0", "") ?? "";
              return cluster.text.replace(/כּ|ךּ/u, `${noAspiration + schema2["KAF_DAGESH"]}`);
            }
          },
          {
            FEATURE: "cluster",
            HEBREW: "\u05D0(?![\u05B1-\u05BB\u05C7])",
            TRANSLITERATION: (cluster) => {
              const next = cluster.next?.value;
              if (next && next.isShureq) {
                return cluster.text;
              }
              return "";
            }
          },
          {
            FEATURE: "cluster",
            HEBREW: "\u05D0\u05BC",
            TRANSLITERATION: (cluster) => {
              return cluster.text.replace("\u05BC", "");
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: /ר/u,
            TRANSLITERATION: (syllable) => {
              const alveolars = /[דזצתטסלנ]|שׂ/;
              const cluster = syllable.clusters.filter((c) => c.text.includes("\u05E8"))[0];
              const prevCluster = cluster.prev?.value;
              const currentSyllable = cluster?.syllable;
              const [onset, _, coda] = currentSyllable ? currentSyllable.structure(true) : ["", "", ""];
              if (prevCluster && alveolars.test(prevCluster.text)) {
                if (onset.includes("\u05E8") && !prevCluster.hasVowel) {
                  return syllable.text.replace("\u05E8", "r\u02C1");
                }
                if (coda.includes("\u05E8") && prevCluster.hasVowel) {
                  return syllable.text.replace("\u05E8", "r\u02C1");
                }
              }
              const nextCluster = cluster.next?.value;
              const lamedAndNun = /[לנן]/;
              if (nextCluster && lamedAndNun.test(nextCluster.text)) {
                if (onset.includes("\u05E8") && !cluster.hasVowel) {
                  return syllable.text.replace("\u05E8", "r\u02C1");
                }
                if (coda.includes("\u05E8") && cluster.hasSheva) {
                  return syllable.text.replace("\u05E8", "r\u02C1");
                }
              }
              return syllable.text;
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: "\u05D7\u05B7\u05C3?$",
            PASS_THROUGH: true,
            TRANSLITERATION: (syllable, _hebrew, schema2) => {
              const prevText = syllable.prev?.value?.text || "";
              if (syllable.isFinal && prevText) {
                if (/[יו]/.test(prevText)) {
                  const glide = /ו/.test(prevText) ? "w" : "j";
                  return glide + schema2["PATAH"] + schema2["HET"];
                }
                return schema2["PATAH"] + schema2["HET"];
              }
              return syllable.text;
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: "\u05E2\u05B7\u05C3?$",
            PASS_THROUGH: true,
            TRANSLITERATION: (syllable, _hebrew, schema2) => {
              const prevText = syllable.prev?.value?.text;
              if (syllable.isFinal && prevText) {
                if (/[יו]/.test(prevText)) {
                  const glide = /ו/.test(prevText) ? "w" : "j";
                  return glide + schema2["PATAH"] + schema2["AYIN"];
                }
                return schema2["PATAH"] + schema2["AYIN"];
              }
              return syllable.text;
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: "\u05D4\u05BC\u05B7\u05C3?$",
            PASS_THROUGH: true,
            TRANSLITERATION: (syllable, _hebrew, schema2) => {
              const prevText = syllable.prev?.value?.text;
              if (syllable.isFinal && prevText) {
                if (/[יו]/.test(prevText)) {
                  const glide = /ו/.test(prevText) ? "w" : "j";
                  return glide + schema2["PATAH"] + schema2["HE"];
                }
                return schema2["PATAH"] + schema2["HE"];
              }
              return syllable.text;
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: /וּ(?![\u{05B4}-\u{05BB}])/u,
            TRANSLITERATION: (syllable, _, schema2) => {
              if (!syllable.prev && syllable.clusters[0].isShureq) {
                const text = syllable.text;
                const hasMeteg = syllable.clusters.map((c) => c.hasMeteg).includes(true);
                const secondaryAccent = hasMeteg ? "\u02CC" : "";
                const halfLengthMarker = hasMeteg ? "\u02D1" : "";
                return text.replace("\u05D5\u05BC", `${secondaryAccent}wu${halfLengthMarker}`);
              }
              if (syllable.isAccented && syllable.isClosed) {
                const noLength = schema2["SHUREQ"].replace("\u02D0", "");
                return syllable.text.replace("\u05D5\u05BC", schema2["SHUREQ"] + noLength);
              }
              return syllable.text;
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: /[\u{05B4}-\u{05BB}\u{05C7}]/u,
            TRANSLITERATION: (syllable, _, schema2) => {
              const vowelName = syllable.vowelNames[0];
              const vowel = syllable.vowels[0];
              if (!vowel || !vowelName) {
                return syllable.text;
              }
              if (vowelName === "SHEVA") {
                throw new Error(`Syllable ${syllable.text} has a sheva as vowel, should not have matched`);
              }
              const hasHalfVowel = syllable.clusters.map((c) => c.hasHalfVowel).includes(true);
              if (hasHalfVowel) {
                throw new Error(`Syllable ${syllable.text} has a hataf as vowel, should not have matched`);
              }
              const [onset, _nuclues, coda] = syllable.structure(true);
              function determinePatachRealization(vowelChar) {
                if (vowelName !== "PATAH" && vowelName !== "HATAF_PATAH") {
                  return vowelChar;
                }
                const pharyngealized = /rˁ|ט|צ|ץ/;
                if (pharyngealized.test(onset) || pharyngealized.test(coda)) {
                  return "\u0251";
                }
                const nextSyllable = syllable.next?.value;
                const nextOnset = nextSyllable?.onset;
                const alveolars = /[דזצתטסלנ]|שׂ/;
                if (nextOnset === "\u05E8" && alveolars.test(coda)) {
                  return "\u0251";
                }
                return vowelChar;
              }
              const noMaterText = syllable.clusters.filter((c) => !c.isMater).map((c) => c.text).join("").replace(/(\u{05B9}.{1})\u{05D4}(?!\u{05BC})/u, "$1");
              const hasMaters = syllable.clusters.map((c) => c.isMater).includes(true);
              const lengthMarker = "\u02D0";
              const halfLengthMarker = "\u02D1";
              const hasMeteg = syllable.clusters.map((c) => c.hasMeteg).includes(true);
              if (hasMeteg) {
                const hasLongVowel = syllable.clusters.map((c) => c.hasLongVowel).includes(true);
                const firstConsonant = noMaterText[0];
                return noMaterText.replace(firstConsonant, `\u02CC${firstConsonant}`).replace(vowel, `${determinePatachRealization(vowel)}${hasLongVowel ? lengthMarker : halfLengthMarker}`);
              }
              const isClosed = syllable.isClosed;
              const isAccented = syllable.isAccented;
              if (isAccented && isClosed) {
                const syllableSeparator = schema2["SYLLABLE_SEPARATOR"] || "";
                const vowelRealization = determinePatachRealization(vowel);
                return noMaterText.replace(vowel, `${vowelRealization + lengthMarker + syllableSeparator + vowelRealization}`);
              }
              const longerVowels = ["HOLAM", "TSERE", "QAMATS"];
              if (!isAccented && isClosed && !syllable.isFinal && longerVowels.includes(vowelName)) {
                const syllableSeparator = schema2["SYLLABLE_SEPARATOR"] || "";
                const vowelRealization = determinePatachRealization(vowel);
                return noMaterText.replace(vowel, `${vowelRealization + lengthMarker + syllableSeparator + vowelRealization}`);
              }
              if (isAccented || !isAccented && !isClosed) {
                return noMaterText.replace(vowel, `${determinePatachRealization(vowel) + lengthMarker}`);
              }
              if (!hasMaters && !isClosed && !isAccented) {
                return noMaterText.replace(vowel, `${determinePatachRealization(vowel)}`);
              }
              return syllable.text.replace(vowel, `${determinePatachRealization(vowel)}`);
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: /[\u{05B1}-\u{05B3}]/u,
            TRANSLITERATION: (syllable) => {
              const vowelName = syllable.vowelNames[0];
              const vowel = syllable.vowels[0];
              if (!vowel || !vowelName) {
                return syllable.text;
              }
              if (vowelName === "SHEVA") {
                throw new Error(`Syllable ${syllable.text} has a sheva as vowel, should not have matched`);
              }
              const hasNonHalfVowels = syllable.clusters.map((c) => c.hasShortVowel || c.hasLongVowel).includes(true);
              if (hasNonHalfVowels) {
                throw new Error(`Syllable ${syllable.text} does not have a hataf vowel, should not have matched`);
              }
              const [onset, _nuclues, coda] = syllable.structure(true);
              function determinePatachRealization(vowelChar) {
                if (vowelName !== "HATAF_PATAH") {
                  return vowelChar;
                }
                const pharyngealized = /rˁ|ט|צ|ץ/;
                if (pharyngealized.test(onset) || pharyngealized.test(coda)) {
                  return "\u0251";
                }
                const nextSyllable = syllable.next?.value;
                const nextOnset = nextSyllable?.onset;
                const alveolars = /[דזצתטסלנ]|שׂ/;
                if (nextOnset === "\u05E8" && alveolars.test(coda)) {
                  return "\u0251";
                }
                if (nextOnset && /[צץט]/.test(nextOnset)) {
                  return "\u0251";
                }
                return vowelChar;
              }
              return syllable.text.replace(vowel, `${determinePatachRealization(vowel)}`);
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: /(?<!.*([\u{05B4}-\u{05BB}\u{05C7}]|\u{05D5}\u{05BC}).*)\u{05B0}/u,
            TRANSLITERATION: (syllable, _hebrew, schema2) => {
              const nextSyllable = syllable.next?.value;
              if (!nextSyllable)
                return syllable.text;
              const nextSylFirstCluster = nextSyllable.clusters[0].text;
              if (!nextSylFirstCluster)
                return syllable.text;
              const [onset, _, coda] = syllable.structure(true);
              function isBackUnrounded() {
                const pharyngealized = /rˁ|ט|צ|ץ/;
                if (pharyngealized.test(onset) || pharyngealized.test(coda)) {
                  return true;
                }
                const nextSyllable2 = syllable.next?.value;
                if (!nextSyllable2) {
                  return false;
                }
                const nextOnset = nextSyllable2.onset;
                if (pharyngealized.test(nextOnset)) {
                  return true;
                }
                return false;
              }
              function transliterateShevaAsVowel(vowel) {
                const hasMeteg = syllable.clusters.map((c) => c.hasMeteg).includes(true);
                const secondaryAccent = hasMeteg ? "\u02CC" : "";
                const halfLengthMarker = hasMeteg ? "\u02D1" : "";
                const newVowel = vowel.replace("\u02D0", "") + halfLengthMarker;
                return secondaryAccent + syllable.text.replace(/\u{05B0}/u, newVowel);
              }
              const isGuttural = /[אהחע]/.test(nextSylFirstCluster);
              if (!isGuttural) {
                return transliterateShevaAsVowel(isBackUnrounded() ? "\u0251" : schema2["PATAH"]);
              }
              const nextVowel = nextSyllable.vowelNames[0];
              if (!nextVowel) {
                throw new Error(`Syllable ${syllable.text} has a sheva as a vowel, but the next syllable ${nextSylFirstCluster} does not have a vowel`);
              }
              if (nextVowel === "SHEVA") {
                throw new Error(`Syllable ${syllable.text} has a sheva as a vowel, but the next syllable ${nextSylFirstCluster} also has a sheva as a vowel`);
              }
              return transliterateShevaAsVowel(schema2[nextVowel]);
            }
          },
          {
            FEATURE: "syllable",
            HEBREW: /\u{5B4}ם/u,
            TRANSLITERATION: (syl, heb2) => {
              return syl.text.replace(heb2, "jim");
            }
          },
          {
            FEATURE: "word",
            HEBREW: /(וְ)?יִשָּׂשכָר/,
            PASS_THROUGH: true,
            TRANSLITERATION: (word, heb2) => {
              const taamim3 = /[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]/gu;
              const text = word.text.replace(taamim3, "");
              const match = text.match(heb2);
              const vav = match && match[1] ? match[1] : "";
              const issachar = "jiss\u0254\u02D0\u02C8\u03C7\u0254\u02D0\u0254\u0280\u031F";
              return `${vav}${issachar}`;
            }
          }
        ],
        allowNoNiqqud: false,
        article: false,
        holemHaser: "remove",
        longVowels: false,
        qametsQatan: true,
        shevaAfterMeteg: false,
        shevaWithMeteg: true,
        sqnmlvy: false,
        strict: true,
        wawShureq: false
      };
    }
  });

  // node_modules/hebrew-transliteration/dist/esm/schemas/index.js
  var init_schemas = __esm({
    "node_modules/hebrew-transliteration/dist/esm/schemas/index.js"() {
      init_brillAcademic();
      init_brillSimple();
      init_sblAcademicSpirantization();
      init_sblSimple();
      init_michiganClaremont();
      init_romaniote();
      init_jss();
      init_tiberian();
    }
  });

  // src/assets/js/spinner.js
  var Spinner;
  var init_spinner = __esm({
    "src/assets/js/spinner.js"() {
      Spinner = class {
        /**
         *
         * @param {Element} element
         * @param {Element} text
         */
        constructor(spinner, text) {
          this.spinner = spinner;
          this.text = text;
        }
        toggleSpinnerOn() {
          this.text.classList.toggle("invisible");
          this.spinner.classList.toggle("d-none");
        }
        toggleSpinnerOff() {
          this.spinner.classList.toggle("d-none");
          this.text.classList.toggle("invisible");
        }
      };
    }
  });

  // node_modules/toastify-js/src/toastify.js
  var require_toastify = __commonJS({
    "node_modules/toastify-js/src/toastify.js"(exports, module) {
      (function(root, factory) {
        if (typeof module === "object" && module.exports) {
          module.exports = factory();
        } else {
          root.Toastify = factory();
        }
      })(exports, function(global) {
        var Toastify = function(options) {
          return new Toastify.lib.init(options);
        }, version = "1.12.0";
        Toastify.defaults = {
          oldestFirst: true,
          text: "Toastify is awesome!",
          node: void 0,
          duration: 3e3,
          selector: void 0,
          callback: function() {
          },
          destination: void 0,
          newWindow: false,
          close: false,
          gravity: "toastify-top",
          positionLeft: false,
          position: "",
          backgroundColor: "",
          avatar: "",
          className: "",
          stopOnFocus: true,
          onClick: function(event = null) {
          },
          offset: { x: 0, y: 0 },
          escapeMarkup: true,
          ariaLive: "polite",
          style: { background: "" }
        };
        Toastify.lib = Toastify.prototype = {
          toastify: version,
          constructor: Toastify,
          // Initializing the object with required parameters
          init: function(options) {
            if (!options) {
              options = {};
            }
            this.options = {};
            this.toastElement = null;
            this.options.text = options.text || Toastify.defaults.text;
            this.options.node = options.node || Toastify.defaults.node;
            this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration;
            this.options.selector = options.selector || Toastify.defaults.selector;
            this.options.callback = options.callback || Toastify.defaults.callback;
            this.options.destination = options.destination || Toastify.defaults.destination;
            this.options.newWindow = options.newWindow || Toastify.defaults.newWindow;
            this.options.close = options.close || Toastify.defaults.close;
            this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity;
            this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft;
            this.options.position = options.position || Toastify.defaults.position;
            this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor;
            this.options.avatar = options.avatar || Toastify.defaults.avatar;
            this.options.className = options.className || Toastify.defaults.className;
            this.options.stopOnFocus = options.stopOnFocus === void 0 ? Toastify.defaults.stopOnFocus : options.stopOnFocus;
            this.options.onClick = options.onClick || Toastify.defaults.onClick;
            this.options.offset = options.offset || Toastify.defaults.offset;
            this.options.escapeMarkup = options.escapeMarkup !== void 0 ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
            this.options.ariaLive = options.ariaLive || Toastify.defaults.ariaLive;
            this.options.style = options.style || Toastify.defaults.style;
            if (options.backgroundColor) {
              this.options.style.background = options.backgroundColor;
            }
            return this;
          },
          // Building the DOM element
          buildToast: function() {
            if (!this.options) {
              throw "Toastify is not initialized";
            }
            var divElement = document.createElement("div");
            divElement.className = "toastify on " + this.options.className;
            if (!!this.options.position) {
              divElement.className += " toastify-" + this.options.position;
            } else {
              if (this.options.positionLeft === true) {
                divElement.className += " toastify-left";
                console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.");
              } else {
                divElement.className += " toastify-right";
              }
            }
            divElement.className += " " + this.options.gravity;
            if (this.options.backgroundColor) {
              console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
            }
            for (var property in this.options.style) {
              divElement.style[property] = this.options.style[property];
            }
            if (this.options.ariaLive) {
              divElement.setAttribute("aria-live", this.options.ariaLive);
            }
            if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
              divElement.appendChild(this.options.node);
            } else {
              if (this.options.escapeMarkup) {
                divElement.innerText = this.options.text;
              } else {
                divElement.innerHTML = this.options.text;
              }
              if (this.options.avatar !== "") {
                var avatarElement = document.createElement("img");
                avatarElement.src = this.options.avatar;
                avatarElement.className = "toastify-avatar";
                if (this.options.position == "left" || this.options.positionLeft === true) {
                  divElement.appendChild(avatarElement);
                } else {
                  divElement.insertAdjacentElement("afterbegin", avatarElement);
                }
              }
            }
            if (this.options.close === true) {
              var closeElement = document.createElement("button");
              closeElement.type = "button";
              closeElement.setAttribute("aria-label", "Close");
              closeElement.className = "toast-close";
              closeElement.innerHTML = "&#10006;";
              closeElement.addEventListener(
                "click",
                function(event) {
                  event.stopPropagation();
                  this.removeElement(this.toastElement);
                  window.clearTimeout(this.toastElement.timeOutValue);
                }.bind(this)
              );
              var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
              if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
                divElement.insertAdjacentElement("afterbegin", closeElement);
              } else {
                divElement.appendChild(closeElement);
              }
            }
            if (this.options.stopOnFocus && this.options.duration > 0) {
              var self = this;
              divElement.addEventListener(
                "mouseover",
                function(event) {
                  window.clearTimeout(divElement.timeOutValue);
                }
              );
              divElement.addEventListener(
                "mouseleave",
                function() {
                  divElement.timeOutValue = window.setTimeout(
                    function() {
                      self.removeElement(divElement);
                    },
                    self.options.duration
                  );
                }
              );
            }
            if (typeof this.options.destination !== "undefined") {
              divElement.addEventListener(
                "click",
                function(event) {
                  event.stopPropagation();
                  if (this.options.newWindow === true) {
                    window.open(this.options.destination, "_blank");
                  } else {
                    window.location = this.options.destination;
                  }
                }.bind(this)
              );
            }
            if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
              divElement.addEventListener(
                "click",
                function(event) {
                  event.stopPropagation();
                  this.options.onClick(event);
                }.bind(this)
              );
            }
            if (typeof this.options.offset === "object") {
              var x = getAxisOffsetAValue("x", this.options);
              var y = getAxisOffsetAValue("y", this.options);
              var xOffset = this.options.position == "left" ? x : "-" + x;
              var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;
              divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";
            }
            return divElement;
          },
          // Displaying the toast
          showToast: function() {
            this.toastElement = this.buildToast();
            var rootElement;
            if (typeof this.options.selector === "string") {
              rootElement = document.getElementById(this.options.selector);
            } else if (this.options.selector instanceof HTMLElement || typeof ShadowRoot !== "undefined" && this.options.selector instanceof ShadowRoot) {
              rootElement = this.options.selector;
            } else {
              rootElement = document.body;
            }
            if (!rootElement) {
              throw "Root element is not defined";
            }
            var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
            rootElement.insertBefore(this.toastElement, elementToInsert);
            Toastify.reposition();
            if (this.options.duration > 0) {
              this.toastElement.timeOutValue = window.setTimeout(
                function() {
                  this.removeElement(this.toastElement);
                }.bind(this),
                this.options.duration
              );
            }
            return this;
          },
          hideToast: function() {
            if (this.toastElement.timeOutValue) {
              clearTimeout(this.toastElement.timeOutValue);
            }
            this.removeElement(this.toastElement);
          },
          // Removing the element from the DOM
          removeElement: function(toastElement) {
            toastElement.className = toastElement.className.replace(" on", "");
            window.setTimeout(
              function() {
                if (this.options.node && this.options.node.parentNode) {
                  this.options.node.parentNode.removeChild(this.options.node);
                }
                if (toastElement.parentNode) {
                  toastElement.parentNode.removeChild(toastElement);
                }
                this.options.callback.call(toastElement);
                Toastify.reposition();
              }.bind(this),
              400
            );
          }
        };
        Toastify.reposition = function() {
          var topLeftOffsetSize = {
            top: 15,
            bottom: 15
          };
          var topRightOffsetSize = {
            top: 15,
            bottom: 15
          };
          var offsetSize = {
            top: 15,
            bottom: 15
          };
          var allToasts = document.getElementsByClassName("toastify");
          var classUsed;
          for (var i = 0; i < allToasts.length; i++) {
            if (containsClass(allToasts[i], "toastify-top") === true) {
              classUsed = "toastify-top";
            } else {
              classUsed = "toastify-bottom";
            }
            var height = allToasts[i].offsetHeight;
            classUsed = classUsed.substr(9, classUsed.length - 1);
            var offset = 15;
            var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if (width <= 360) {
              allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";
              offsetSize[classUsed] += height + offset;
            } else {
              if (containsClass(allToasts[i], "toastify-left") === true) {
                allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";
                topLeftOffsetSize[classUsed] += height + offset;
              } else {
                allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";
                topRightOffsetSize[classUsed] += height + offset;
              }
            }
          }
          return this;
        };
        function getAxisOffsetAValue(axis, options) {
          if (options.offset[axis]) {
            if (isNaN(options.offset[axis])) {
              return options.offset[axis];
            } else {
              return options.offset[axis] + "px";
            }
          }
          return "0px";
        }
        function containsClass(elem, yourClass) {
          if (!elem || typeof yourClass !== "string") {
            return false;
          } else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) {
            return true;
          } else {
            return false;
          }
        }
        Toastify.lib.init.prototype = Toastify.lib;
        return Toastify;
      });
    }
  });

  // src/assets/js/transliterate.js
  var require_transliterate = __commonJS({
    "src/assets/js/transliterate.js"(exports, module) {
      init_wrapper();
      init_esm2();
      init_wizard();
      init_feedback();
      init_sbl_academic();
      init_schemas();
      init_spinner();
      var import_toastify_js = __toESM(require_toastify());
      feedbackFormInit();
      function addAdditonalFeature(parent, hebrew = "", transliteration = "", feature = "") {
        const additionalFeature = `
    <!-- HEBREW -->
    <div class="col-3 mr-5">
      <label for="HEBREW">Hebrew</label>
      <div class="d-flex align-items-center"><input type="text" class="form-control HEBREW" name="HEBREW">
      </div>
    </div>
    <!-- TRANSLITERATION -->
    <div class="col-5 mr-5">
      <label for="TRANSLITERATION">Transliteration</label>
      <div class="d-flex align-items-center"><input type="text" class="form-control TRANSLITERATION" name="TRANSLITERATION">
      </div>
    </div>
    <!-- FEATURE -->
    <div class="col-4">
      <label for="FEATURE">Feature</label>
      <select name="FEATURE" class="form-control FEATURE">
        <option value="">...</option>
        <option value="cluster">cluster</option>
        <option value="syllable">syllable</option>
        <option value="word">word</option>
      </select>
    </div>
`;
        const el2 = document.createElement("div");
        el2.classList.add("d-flex", "align-items-center", "mb-10", "ADDITIONAL_FEATURE");
        el2.innerHTML = additionalFeature.trim();
        parent.appendChild(el2);
        el2.querySelector(".HEBREW").value = hebrew || "";
        el2.querySelector(".HEBREW").dataset.regex = false;
        if (typeof hebrew !== "string") {
          el2.querySelector(".HEBREW").dataset.regex = true;
          el2.querySelector(".HEBREW").disabled = true;
        }
        el2.querySelector(".TRANSLITERATION").disabled = typeof transliteration === "function";
        el2.querySelector(".TRANSLITERATION").value = transliteration || "";
        el2.querySelector(".FEATURE").value = feature || "";
      }
      function updateInput(input2, val) {
        const type = input2?.type || void 0;
        switch (type) {
          case "checkbox":
            input2.checked = val;
            break;
          case "text":
            input2.value = val || "";
          default:
            break;
        }
      }
      function populateSchemaModal(schema2, prop2) {
        try {
          if (prop2 === "STRESS_MARKER" && schema2[prop2]) {
            document.querySelector(`#${prop2}  #location`).value = schema2[prop2]["location"];
            updateInput(document.querySelector(`#${prop2}  #mark`), schema2[prop2]["mark"]);
            return;
          }
          if (prop2 === "ADDITIONAL_FEATURES" && schema2[prop2] && schema2[prop2].length) {
            schema2[prop2].forEach((f2) => {
              addAdditonalFeature(
                document.querySelector(`#${prop2}`),
                f2["HEBREW"],
                f2["TRANSLITERATION"],
                f2["FEATURE"]
              );
            });
            return;
          }
          const input2 = document.querySelector(`#${prop2}`);
          updateInput(input2, schema2[prop2]);
        } catch (error) {
          console.error(error);
        }
      }
      function getInputVal(input2) {
        const type = input2?.type || void 0;
        switch (type) {
          case "checkbox":
            return input2.checked;
          case "text":
            return input2.value;
          default:
            return void 0;
        }
      }
      function sanitizeRegexString(inputString) {
        const regex = inputString.split("/");
        const flags = regex.pop();
        const pattern = regex.filter(Boolean).join("/");
        return new RegExp(pattern, flags);
      }
      function getSchemaModalVals(schemaProps) {
        return schemaProps.reduce((schema, prop) => {
          if (prop === "STRESS_MARKER") {
            schema["STRESS_MARKER"] = {
              location: document.querySelector(`#${prop}  #location`).value,
              mark: document.querySelector(`#${prop}  #mark`).value
            };
            return schema;
          }
          if (prop === "ADDITIONAL_FEATURES") {
            schema["ADDITIONAL_FEATURES"] = [
              ...document.querySelectorAll(`#${prop} .ADDITIONAL_FEATURE`)
            ].map((el) => {
              return {
                HEBREW: JSON.parse(el.querySelector(".HEBREW").dataset.regex) ? sanitizeRegexString(el.querySelector(".HEBREW").value) : el.querySelector(".HEBREW").value,
                TRANSLITERATION: el.querySelector(".TRANSLITERATION").disabled ? eval(el.querySelector(".TRANSLITERATION").value) : el.querySelector(".TRANSLITERATION").value,
                FEATURE: el.querySelector(".FEATURE").value
              };
            });
            return schema;
          }
          schema[prop] = getInputVal(document.querySelector(`#${prop}`));
          return schema;
        }, {});
      }
      function clearSchemaModalVals(schemaProps3) {
        schemaProps3.forEach((prop2) => {
          if (prop2 === "STRESS_MARKER") {
            document.querySelector(`#${prop2}  #location`).value = "";
            updateInput(document.querySelector(`#${prop2}  #mark`), false);
          }
          if (prop2 === "ADDITIONAL_FEATURES") {
            document.querySelector(`#${prop2}`).innerHTML = "";
          }
          const input2 = document.querySelector(`#${prop2}`);
          updateInput(input2, "");
        });
      }
      function downloadSchema(schema2) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(
          new Blob([JSON.stringify(schema2, null, 2)], {
            type: "text/json"
          })
        );
        const date = (/* @__PURE__ */ new Date()).toLocaleDateString().replaceAll("/", "-");
        a.setAttribute("download", `schema-${date}.json`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      function checkIfExpired() {
        const hasExpiration = localStorage.getItem("expires") ? JSON.parse(localStorage.getItem("expires")) : false;
        if (!hasExpiration) {
          return true;
        }
        const now = /* @__PURE__ */ new Date();
        const nintetyDaysAgo = now.setDate(now.getDate() - 90);
        return nintetyDaysAgo > hasExpiration;
      }
      function setExpiry() {
        const expires = localStorage.getItem("expires");
        if (expires && !checkIfExpired()) {
          return;
        }
        const now = /* @__PURE__ */ new Date();
        const ninetyDaysFromNow = now.setDate(now.getDate() + 90);
        localStorage.setItem("expires", ninetyDaysFromNow);
      }
      function checkLocalStorage(props2) {
        const isExpired = checkIfExpired();
        if (isExpired) {
          return false;
        }
        return props2.map((p) => localStorage.getItem(p)).filter((e) => e).length ? true : false;
      }
      function schemaFromLocalStorage(props) {
        return props.reduce((schema, prop) => {
          if (prop === "STRESS_MARKER") {
            const stressMarker = JSON.parse(localStorage.getItem(prop));
            schema[prop] = {
              location: stressMarker["location"],
              mark: stressMarker["mark"]
            };
            return schema;
          }
          if (prop === "ADDITIONAL_FEATURES") {
            const addFeatures = JSON.parse(localStorage.getItem(prop));
            schema[prop] = addFeatures.map((f) => {
              const heb = f["HEBREW"];
              return {
                HEBREW: heb.charAt(0) === "/" && heb.charAt(heb.length - 1) ? new RegExp(sanitizeRegexString(heb)) : heb,
                TRANSLITERATION: eval(f["TRANSLITERATION"]),
                FEATURE: f["FEATURE"]
              };
            });
            return schema;
          }
          schema[prop] = localStorage.getItem(prop);
          return schema;
        }, {});
      }
      function loadSchema(props2) {
        if (checkLocalStorage(props2)) {
          document.querySelector("#last-visit").hidden = false;
          props2.forEach((p) => populateSchemaModal(schemaFromLocalStorage(props2), p));
          schemaSelect.value = localStorage.getItem("schemaSelect");
          return;
        }
        const academic = new Schema(sbl_academic_default);
        props2.forEach((p) => populateSchemaModal(academic, p));
        schemaSelect.value = "sblAcademic";
      }
      function setSchemaLocalStorage(schema2) {
        const props2 = Object.keys(schema2);
        props2.forEach((p) => {
          if (p === "ADDITIONAL_FEATURES") {
            const addFeatures2 = schema2[p].map((f2) => {
              return {
                HEBREW: f2["HEBREW"].toString(),
                TRANSLITERATION: f2["TRANSLITERATION"].toString(),
                FEATURE: f2["FEATURE"]
              };
            });
            localStorage.setItem(p, JSON.stringify(addFeatures2));
            return;
          }
          if (p === "STRESS_MARKER") {
            const stressMarker = schema2[p];
            localStorage.setItem(
              p,
              JSON.stringify({
                location: stressMarker["location"],
                mark: stressMarker["mark"]
              })
            );
            return;
          }
          localStorage.setItem(p, schema2[p]);
        });
        setExpiry();
      }
      function checkLocalStoragePlaceholder(schemaName) {
        return !localStorage.getItem("hebrewPlaceholderText") || localStorage.getItem("hebrewPlaceholderText") !== input.placeholder || !localStorage.getItem(schemaName);
      }
      async function getPlaceHolder(inputVal, schema2, schemaName = "") {
        if (checkLocalStoragePlaceholder(schemaName)) {
          const transliteration = await wrapper.transliterate(inputVal, schema2);
          localStorage.setItem("hebrewPlaceholderText", inputVal);
          localStorage.setItem(schemaName, transliteration);
          return transliteration;
        }
        return localStorage.getItem(schemaName);
      }
      async function fileToJSON(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
          fileReader.onerror = (error) => reject(error);
          fileReader.readAsText(file);
        });
      }
      var input = document.querySelector("#input");
      var output = document.querySelector("#output");
      var actionBtn = document.querySelector("#action-btn");
      var schemaSteps = document.querySelector("#schema-modal #modal-cards").children;
      var schemaNextBtn = document.querySelector("#schema-modal #next-btn");
      var schemaPrevBtn = document.querySelector("#schema-modal #prev-btn");
      var schemaFinalBtn = document.querySelector("#schema-modal #final-btn");
      var additionalFeatureBtn = document.querySelector("#additional-feature-btn");
      var schemaSelect = document.querySelector("#select-schema");
      var downloadSchemaBtn = document.querySelector("#download-schema");
      var schemaInput = document.querySelector("#schema-input");
      var wizard = new Wizard(
        schemaSteps,
        "d-block",
        "d-none",
        { btn: schemaPrevBtn, text: "Previous" },
        { btn: schemaNextBtn, text: "Next", initText: "Customize" },
        { btn: schemaFinalBtn, text: "Done" }
      );
      wizard.init();
      var tipsSteps = document.querySelector("#tips-modal #modal-cards").children;
      var tipsNextBtn = document.querySelector("#tips-modal #next-btn");
      var tipsPrevBtn = document.querySelector("#tips-modal #prev-btn");
      var tipsFinalBtn = document.querySelector("#tips-modal #final-btn");
      var tipsWizard = new Wizard(
        tipsSteps,
        "d-block",
        "d-none",
        { btn: tipsPrevBtn, text: "Previous" },
        { btn: tipsNextBtn, text: "Next" },
        { btn: tipsFinalBtn, text: "Done" }
      );
      tipsWizard.init();
      var wrapper = new Wrapper();
      var loadingSpinner = new Spinner(
        document.querySelector("#spinner"),
        document.querySelector("#btn-txt")
      );
      function checkKey(e) {
        if (document.querySelector("#schema-modal").offsetTop !== 0) return;
        if (document.activeElement.tagName === "INPUT") return;
        e = e || window.event;
        if (e.keyCode == "37") wizard.prevWindow();
        if (e.keyCode == "39") wizard.nextWindow();
      }
      document.onkeydown = checkKey;
      function sendGAEvent(action, value = null) {
        gtag("event", action, {
          event_category: "User Engagement",
          event_label: "Transliterate_Button",
          value
        });
      }
      function createToastButton(id) {
        const div = document.createElement("div");
        div.classList.add("toast-btn-wrapper", "m-auto");
        const button = document.createElement("button");
        button.classList.add("btn", "btn-secondary", "btn-sm");
        button.textContent = "Don't remind me again";
        button.id = id;
        div.appendChild(button);
        return div;
      }
      function createToastElement(message, id) {
        const div = document.createElement("div");
        div.classList.add("d-flex", "flex-column");
        const p = document.createElement("p");
        p.classList.add("m-0");
        p.textContent = message;
        div.appendChild(p);
        div.appendChild(createToastButton(id));
        return div;
      }
      actionBtn.addEventListener("click", async () => {
        sendGAEvent("Click");
        try {
          const schema2 = getSchemaModalVals(schemaProps2);
          if (!wrapper.supportsRegexLookAheadLookBehind()) {
            loadingSpinner.toggleSpinnerOn();
          }
          output.value = await wrapper.transliterate(input.value || input.placeholder, schema2);
          sendGAEvent("Click success", 1);
          if (!wrapper.supportsRegexLookAheadLookBehind()) {
            loadingSpinner.toggleSpinnerOff();
          }
          setSchemaLocalStorage(schema2);
          localStorage.setItem("schemaSelect", schemaSelect.value);
          const toastOptions = {
            gravity: "top",
            position: "center",
            className: "toast",
            duration: 2e3,
            style: {
              // background: "linear-gradient(to right, #7370af 70%, #af7398)",
              background: "#7370af",
              marginTop: "25vh",
              borderRadius: "4px",
              padding: "20px"
            }
          };
          const vowels3 = /[\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7]/;
          const noVowelsDisabledKey = "noVowelsDisabled";
          const noVowelsDisabled = localStorage.getItem(noVowelsDisabledKey) === "true";
          if (!vowels3.test(input.value) && !noVowelsDisabled) {
            const noVowelsBtnId = "no-vowels";
            const toast = (0, import_toastify_js.default)({
              ...toastOptions,
              node: createToastElement("Include vowel marks to ensure accuracy", noVowelsBtnId),
              onClick: function(e) {
                if (e.target.id === noVowelsBtnId) {
                  localStorage.setItem(noVowelsDisabledKey, true);
                  toast.hideToast();
                }
              }
            });
            toast.showToast();
          }
          const cantillation = /[\u0591-\u05AE\u05BD\u05C3-\u05C5]/;
          const noCantillationKey = "noCantillationDisabled";
          const noCantillationDisabled = localStorage.getItem(noCantillationKey) === "true";
          if (!cantillation.test(input.value) && !noCantillationDisabled) {
            const noCantillationBtnId = "no-cantillation";
            const toast = (0, import_toastify_js.default)({
              ...toastOptions,
              node: createToastElement(
                "Include cantillation marks to ensure accuracy",
                noCantillationBtnId
              ),
              onClick: function(event) {
                if (event.target.id === noCantillationBtnId) {
                  localStorage.setItem(noCantillationKey, true);
                  toast.hideToast();
                }
              }
            });
            toast.showToast();
          }
        } catch (error) {
          output.value = "Hmmm...it seems something went wrong. Check the Tips button for best practices.";
          console.error(error);
          sendGAEvent("Click error", 0);
        }
      });
      schemaSelect.addEventListener("change", async (e) => {
        clearSchemaModalVals(schemaProps2);
        switch (e.target.value) {
          case "sblSimple":
            schemaProps2.forEach((p) => populateSchemaModal(sblSimple, p));
            output.placeholder = !output.value ? await getPlaceHolder(input.placeholder, getSchemaModalVals(schemaProps2), "sblGeneral") : "";
            break;
          case "sblAcademic":
            schemaProps2.forEach((p) => populateSchemaModal(sbl_academic_default, p));
            output.placeholder = !output.value ? await getPlaceHolder(input.placeholder, getSchemaModalVals(schemaProps2), "sblAcademic") : "";
            break;
          case "sblAcademicSpirantization":
            schemaProps2.forEach((p) => populateSchemaModal(new Schema(sblAcademicSpirantization), p));
            output.placeholder = !output.value ? await getPlaceHolder(
              input.placeholder,
              getSchemaModalVals(schemaProps2),
              "sblAcademicSpirantization"
            ) : "";
            break;
          case "brillAcademic":
            schemaProps2.forEach((p) => populateSchemaModal(brillAcademic, p));
            output.placeholder = !output.value ? await getPlaceHolder(input.placeholder, getSchemaModalVals(schemaProps2), "brillAcademic") : "";
            break;
          case "brillSimple":
            schemaProps2.forEach((p) => populateSchemaModal(brillSimple, p));
            output.placeholder = !output.value ? await getPlaceHolder(input.placeholder, getSchemaModalVals(schemaProps2), "brillSimple") : "";
            break;
          case "michiganClaremont":
            schemaProps2.forEach((p) => populateSchemaModal(michiganClaremont, p));
            output.placeholder = !output.value ? await getPlaceHolder(
              input.placeholder,
              getSchemaModalVals(schemaProps2),
              "michiganClaremont"
            ) : "";
            break;
          case "romaniote":
            schemaProps2.forEach((p) => populateSchemaModal(romaniote, p));
            output.placeholder = !output.value ? await getPlaceHolder(input.placeholder, getSchemaModalVals(schemaProps2), "romaniote") : "";
            break;
          case "jss":
            schemaProps2.forEach((p) => populateSchemaModal(jss, p));
            output.placeholder = !output.value ? await getPlaceHolder(input.placeholder, getSchemaModalVals(schemaProps2), "jss") : "";
            break;
          case "tiberian":
            schemaProps2.forEach((p) => populateSchemaModal(tiberian, p));
            output.placeholder = !output.value ? await getPlaceHolder(input.placeholder, getSchemaModalVals(schemaProps2), "tiberian") : "";
            break;
          default:
            break;
        }
      });
      downloadSchemaBtn.addEventListener("click", () => downloadSchema(getSchemaModalVals(schemaProps2)));
      additionalFeatureBtn.addEventListener(
        "click",
        () => addAdditonalFeature(document.querySelector("#ADDITIONAL_FEATURES"))
      );
      schemaInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (file) {
          const customSchema = await fileToJSON(file);
          Object.keys(customSchema).forEach((p) => populateSchemaModal(customSchema, p));
          output.placeholder = !output.value ? await wrapper.transliterate(input.placeholder, getSchemaModalVals(schemaProps2)) : "";
        }
      });
      var main = async (schemaProps3) => {
        try {
          loadSchema(schemaProps3);
          if (!wrapper.supportsRegex) {
            document.querySelector("#browser-alert").hidden = false;
          }
          output.placeholder = !output.value ? await getPlaceHolder(input.placeholder, getSchemaModalVals(schemaProps3), schemaSelect.value) : "";
        } catch (error) {
          console.error(error);
        }
      };
      var schemaProps2 = Object.keys(new Schema(sbl_academic_default));
      main(schemaProps2);
    }
  });
  require_transliterate();
})();
/*! Bundled license information:

toastify-js/src/toastify.js:
  (*!
   * Toastify js 1.12.0
   * https://github.com/apvarun/toastify-js
   * @license MIT licensed
   *
   * Copyright (C) 2018 Varun A P
   *)
*/
