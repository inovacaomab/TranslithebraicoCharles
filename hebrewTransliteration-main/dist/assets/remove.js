(() => {
  // src/assets/js/wizard.js
  var Wizard = class {
    /**
     *
     * @param {HTMLCollection} HTMLCollection
     * @param {string} onClass - css class to control if panel is visible
     * @param {string} offClass - css class to control if panel is not visible
     * @param {{btn: HTMLButtonElement, text: string}} prevBtn
     * @param {{btn: HTMLButtonElement, text: string, initText?: string}} nextBtn
     * @param {{btn: HTMLButtonElement, text: string}} finalBtn
     */
    constructor(HTMLCollection, onClass, offClass, prevBtn2, nextBtn2, finalBtn2) {
      this.steps = HTMLCollection;
      this.index = 0;
      this.onClass = onClass;
      this.offClass = offClass;
      this.prevBtn = prevBtn2;
      this.nextBtn = nextBtn2;
      this.finalBtn = finalBtn2;
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

  // node_modules/havarotjs/dist/esm/utils/regularExpressions.js
  var clusterSplitGroup = /(?=[\u{05BE}\u{05C3}\u{05C6}\u{05D0}-\u{05F2}\u{2000}-\u{206F}\u{2E00}-\u{2E7F}'!"#$%&()*+,-.\/:;<=>?@\[\]^_`\{|\}~])/u;
  var consonants = /[\u{05D0}-\u{05F2}]/u;
  var dagesh = /[\u{05BC}]/u;
  var hebChars = /[\u{0590}-\u{05FF}\u{FB1D}-\u{FB4F}]/u;
  var ligatures = /[\u{05C1}-\u{05C2}]/u;
  var meteg = /\u{05BD}/u;
  var punctuation = /[\u{05BE}\u{05C0}\u{05C3}\u{05C6}]/u;
  var rafe = /\u{05BF}/u;
  var splitGroup = /(\S*\u{05BE}(?=\S*\u{05BE})|\S*\u{05BE}(?!\S*\u{05BE})|\S*-(?!\S*-)|\S*-(?=\S*-)|\S*\s*)/u;
  var sheva = /\u{05B0}/u;
  var taamim = /[\u{0591}-\u{05AE}]/u;
  var vowels = /[\u{05B1}-\u{05BB}\u{05C7}]/u;
  var jerusalemTest = new RegExp(`(?<vowel>[\u05B8\u05B7])(?<hiriq>\u05B4)(?<taamimMatch>${taamim.source}|\u05BD)(?<mem>\u05DD.*)$`, "u");

  // node_modules/havarotjs/dist/esm/utils/removeTaamim.js
  var removeTaamim = (word) => {
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

  // node_modules/havarotjs/dist/esm/utils/holemWaw.js
  var findMatches = (word, regx, cb) => {
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
  var holemWaw = (word, options) => {
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

  // node_modules/havarotjs/dist/esm/utils/charMap.js
  var taamimCharToNameMap = {
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
  var isCharKeyOfTaamimNameToCharMap = (char) => {
    return char in taamimCharToNameMap;
  };
  var taamimNameToCharMap = {
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
  var vowelCharToNameMap = {
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
  var isCharKeyOfVowelNameToCharMap = (char) => {
    return char in vowelCharToNameMap;
  };
  var vowelNameToCharMap = {
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
  var consonantCharToNameMap = {
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
  var isCharKeyOfConsonantNameToCharMap = (char) => {
    return char in consonantCharToNameMap;
  };
  var consonantNameToCharMap = {
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
  var charToNameMap = {
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
  var isCharKeyOfCharToNameMap = (char) => {
    return char in charToNameMap;
  };
  var nameToCharMap = {
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

  // node_modules/havarotjs/dist/esm/char.js
  var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Char_text;
  var _Char_cluster;
  var _Char_sequencePosition;
  var Char = class _Char {
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

  // node_modules/havarotjs/dist/esm/node.js
  var Node = class {
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

  // node_modules/havarotjs/dist/esm/cluster.js
  var __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Cluster_consonantsCache;
  var _Cluster_consonantNameCache;
  var _Cluster_original;
  var _Cluster_sequenced;
  var _Cluster_syllable;
  var _Cluster_taamimCache;
  var _Cluster_vowelsCache;
  var _Cluster_vowelNamesCache;
  var _Cluster_taamimNamesCache;
  var Cluster = class _Cluster extends Node {
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

  // node_modules/havarotjs/dist/esm/utils/sequence.js
  var sequence = (text) => {
    const splits = /(?=[\u{05C0}\u{05D0}-\u{05F2}])/u;
    const hiriqPatah = /\u{5B4}\u{5B7}/u;
    const hiriqQamets = /\u{5B4}\u{5B8}/u;
    if (hiriqPatah.test(text))
      text = text.replace(hiriqPatah, "\u05B7\u05B4");
    else if (hiriqQamets.test(text))
      text = text.replace(hiriqQamets, "\u05B8\u05B4");
    return text.split(splits).map((word) => new Cluster(word)).map((cluster) => cluster.chars);
  };

  // node_modules/havarotjs/dist/esm/utils/qametsQatan.js
  var snippets = [
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
  var wholeWords = [
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
  var sequenceSnippets = (arr) => {
    return arr.map((snippet) => sequence(snippet.normalize("NFKD")).flat().reduce((a, c) => a + c.text, ""));
  };
  var snippetsRegx = sequenceSnippets(snippets);
  var wholeWordsRegx = sequenceSnippets(wholeWords);
  var convertsQametsQatan = (word) => {
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

  // node_modules/havarotjs/dist/esm/syllable.js
  var __classPrivateFieldSet3 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Syllable_cachedStructure;
  var _Syllable_cachedStructureWithGemination;
  var _Syllable_clusters;
  var _Syllable_isClosed;
  var _Syllable_isAccented;
  var _Syllable_isFinal;
  var _Syllable_vowelsCache;
  var _Syllable_vowelNamesCache;
  var _Syllable_word;
  var sylVowelCharToNameMap = {
    ...vowelCharToNameMap,
    /* eslint-disable  @typescript-eslint/naming-convention */
    "\u05B0": "SHEVA",
    "\u05D5\u05BC": "SHUREQ"
  };
  var sylVowelNameToCharMap = {
    ...vowelNameToCharMap,
    /* eslint-disable  @typescript-eslint/naming-convention */
    SHEVA: "\u05B0",
    SHUREQ: "\u05D5\u05BC"
  };
  var Syllable = class _Syllable extends Node {
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

  // node_modules/havarotjs/dist/esm/utils/divineName.js
  var nonChars = /[^\u{05D0}-\u{05F4}]/gu;
  var isDivineName = (text) => {
    return text.replace(nonChars, "") === "\u05D9\u05D4\u05D5\u05D4";
  };
  var hasDivineName = (text) => {
    return /יהוה/.test(text.replace(nonChars, ""));
  };

  // node_modules/havarotjs/dist/esm/utils/syllabifier.js
  var createNewSyllable = (result, syl, isClosed) => {
    isClosed = isClosed || false;
    const syllable = new Syllable(syl, { isClosed });
    result.push(syllable);
    return [];
  };
  var groupFinal = (arr, vowelsRgx = vowels) => {
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
  var groupShevas = (arr, options) => {
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
  var groupMaters = (arr, strict = true) => {
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
  var groupShureqs = (arr, strict = true) => {
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
  var groupClusters = (arr, options) => {
    const rev = arr.reverse();
    const finalGrouped = groupFinal(rev);
    const shevasGrouped = groupShevas(finalGrouped, options);
    const shureqGroups = groupShureqs(shevasGrouped, options.strict);
    const matersGroups = groupMaters(shureqGroups, options.strict);
    const result = matersGroups.reverse();
    return result;
  };
  var setIsClosed = (syllable, index, arr) => {
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
  var setIsAccented = (syllable) => {
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
  var clusterPos = (cluster, i) => {
    return { cluster, pos: i };
  };
  var reinsertLatin = (syls, latin) => {
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
  var syllabify = (clusters, options, isWordInConstruct) => {
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

  // node_modules/havarotjs/dist/esm/word.js
  var __classPrivateFieldSet4 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Word_text;
  var Word = class extends Node {
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

  // node_modules/havarotjs/dist/esm/text.js
  var __classPrivateFieldSet5 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet5 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Text_original;
  var Text = class {
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

  // node_modules/hebrew-transliteration/dist/esm/hebCharsTrans.js
  var transliterateMap = {
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

  // node_modules/hebrew-transliteration/dist/esm/rules.js
  var taamim2 = /[\u{0590}-\u{05AF}\u{05BD}\u{05BF}]/gu;
  var mapChars = (schema) => (input2) => {
    return [...input2].map((char) => char in transliterateMap ? schema[transliterateMap[char]] : char).join("");
  };
  var replaceWithRegex = (input2, regex, replaceValue) => input2.replace(regex, replaceValue);
  var replaceAndTransliterate = (input2, regex, replaceValue, schema) => {
    const sylSeq = replaceWithRegex(input2, regex, replaceValue);
    return [...sylSeq].map(mapChars(schema)).join("");
  };
  var isDageshChazaq = (cluster, schema) => {
    if (!schema.DAGESH_CHAZAQ) {
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
  var getDageshChazaqVal = (input2, dagesh2, isChazaq) => {
    if (!isChazaq) {
      return input2;
    }
    if (typeof dagesh2 === "boolean") {
      return input2.repeat(2);
    }
    return input2 + dagesh2;
  };
  var getDivineName = (str, schema) => {
    const begn = str[0];
    const end = str[str.length - 1];
    const divineName = schema.DIVINE_NAME_ELOHIM && /\u{05B4}/u.test(str) ? schema.DIVINE_NAME_ELOHIM : schema.DIVINE_NAME;
    return `${hebChars.test(begn) ? "" : begn}${divineName}${hebChars.test(end) ? "" : end}`;
  };
  var materFeatures = (syl, schema) => {
    const mater = syl.clusters.filter((c) => c.isMater)[0];
    const prev = mater.prev instanceof Cluster ? mater.prev : null;
    const materText = mater.text;
    const prevText = (prev?.text || "").replace(taamim2, "");
    let noMaterText = syl.clusters.filter((c) => !c.isMater).map((c) => consonantFeatures(c.text.replace(taamim2, ""), syl, c, schema)).join("");
    const hasMaqaf = mater.text.includes("\u05BE");
    noMaterText = hasMaqaf ? noMaterText.concat("\u05BE") : noMaterText;
    if (/י/.test(materText)) {
      if (/\u{05B4}/u.test(prevText)) {
        return replaceWithRegex(noMaterText, /\u{05B4}/u, schema.HIRIQ_YOD);
      }
      if (/\u{05B5}/u.test(prevText)) {
        return replaceWithRegex(noMaterText, /\u{05B5}/u, schema.TSERE_YOD);
      }
      if (/\u{05B6}/u.test(prevText)) {
        return replaceWithRegex(noMaterText, /\u{05B6}/u, schema.SEGOL_YOD);
      }
    }
    if (/ו/u.test(materText)) {
      if (/\u{05B9}/u.test(prevText)) {
        return replaceWithRegex(noMaterText, /\u{05B9}/u, schema.HOLAM_VAV);
      }
    }
    if (/ה/.test(materText)) {
      if (/\u{05B8}/u.test(prevText)) {
        return replaceWithRegex(noMaterText, /\u{05B8}/u, schema.QAMATS_HE);
      }
      if (/\u{05B6}/u.test(prevText)) {
        return replaceWithRegex(noMaterText, /\u{05B6}/u, schema.SEGOL_HE);
      }
      if (/\u{05B5}/u.test(prevText)) {
        return replaceWithRegex(noMaterText, /\u{05B5}/u, schema.TSERE_HE);
      }
    }
    return materText;
  };
  var joinSyllableChars = (syl, sylChars, schema) => {
    const isInConstruct = syl.word?.isInConstruct;
    if (isInConstruct) {
      return sylChars.map(mapChars(schema)).join("");
    }
    if (!syl.isAccented) {
      return sylChars.map(mapChars(schema)).join("");
    }
    const isOnlyPunctuation = syl.clusters.map((c) => c.isPunctuation).every((c) => c);
    if (isOnlyPunctuation) {
      return sylChars.map(mapChars(schema)).join("");
    }
    if (schema.STRESS_MARKER) {
      const exclude = schema.STRESS_MARKER?.exclude ?? "never";
      if (exclude === "single" && !syl.prev && !syl.next) {
        return sylChars.map(mapChars(schema)).join("");
      }
      if (exclude === "final" && !syl.next) {
        return sylChars.map(mapChars(schema)).join("");
      }
      const location = schema.STRESS_MARKER.location;
      const mark = schema.STRESS_MARKER.mark;
      if (syl.text.includes(mark)) {
        return sylChars.map(mapChars(schema)).join("");
      }
      if (location === "before-syllable") {
        const isDoubled = syl.clusters.map((c) => isDageshChazaq(c, schema)).includes(true);
        if (isDoubled) {
          const chars = sylChars.map(mapChars(schema)).join("");
          const [first, ...rest] = chars;
          return `${first}${mark}${rest.join("")}`;
        }
        return `${mark}${sylChars.map(mapChars(schema)).join("")}`;
      }
      if (location === "after-syllable") {
        return `${sylChars.map(mapChars(schema)).join("")}${mark}`;
      }
      const vowels3 = [
        schema.PATAH,
        schema.HATAF_PATAH,
        schema.QAMATS,
        schema.HATAF_QAMATS,
        schema.SEGOL,
        schema.HATAF_SEGOL,
        schema.TSERE,
        schema.HIRIQ,
        schema.HOLAM,
        schema.QAMATS_QATAN,
        schema.QUBUTS,
        schema.QAMATS_HE,
        schema.SEGOL_HE,
        schema.TSERE_HE,
        schema.HIRIQ_YOD,
        schema.TSERE_YOD,
        schema.SEGOL_YOD,
        schema.HOLAM_VAV,
        schema.SHUREQ
      ].sort((a, b) => b.length - a.length);
      const vowelRgx = new RegExp(`${vowels3.join("|")}`);
      const str = sylChars.map(mapChars(schema)).join("");
      const match = str.match(vowelRgx);
      if (location === "before-vowel") {
        return match?.length ? str.replace(match[0], `${mark}${match[0]}`) : str;
      }
      return match?.length ? str.replace(match[0], `${match[0]}${mark}`) : str;
    }
    return sylChars.map(mapChars(schema)).join("");
  };
  var consonantFeatures = (clusterText, syl, cluster, schema) => {
    if (schema.ADDITIONAL_FEATURES?.length) {
      const seqs = schema.ADDITIONAL_FEATURES;
      for (const seq of seqs) {
        const heb = new RegExp(seq.HEBREW, "u");
        if (seq.FEATURE === "cluster" && heb.test(clusterText)) {
          const transliteration = seq.TRANSLITERATION;
          const passThrough = seq.PASS_THROUGH ?? true;
          if (typeof transliteration === "string") {
            return replaceAndTransliterate(clusterText, heb, transliteration, schema);
          }
          if (!passThrough) {
            return transliteration(cluster, seq.HEBREW, schema);
          }
          clusterText = transliteration(cluster, seq.HEBREW, schema);
        }
      }
    }
    clusterText = cluster.hasSheva && syl.isClosed ? clusterText.replace(/\u{05B0}/u, "") : clusterText;
    if (/ה\u{05BC}$/mu.test(clusterText)) {
      return replaceWithRegex(clusterText, /ה\u{05BC}/u, schema.HE);
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
    const isDageshChazq = isDageshChazaq(cluster, schema);
    if (schema.BET_DAGESH && /ב\u{05BC}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /ב\u{05BC}/u, getDageshChazaqVal(schema.BET_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (schema.GIMEL_DAGESH && /ג\u{05BC}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /ג\u{05BC}/u, getDageshChazaqVal(schema.GIMEL_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (schema.DALET_DAGESH && /ד\u{05BC}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /ד\u{05BC}/u, getDageshChazaqVal(schema.DALET_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (schema.KAF_DAGESH && /כ\u{05BC}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /כ\u{05BC}/u, getDageshChazaqVal(schema.KAF_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (schema.KAF_DAGESH && /ך\u{05BC}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /ך\u{05BC}/u, getDageshChazaqVal(schema.KAF_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (schema.PE_DAGESH && /פ\u{05BC}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /פ\u{05BC}/u, getDageshChazaqVal(schema.PE_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (schema.TAV_DAGESH && /ת\u{05BC}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /ת\u{05BC}/u, getDageshChazaqVal(schema.TAV_DAGESH, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (/ש\u{05C1}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /ש\u{05C1}/u, getDageshChazaqVal(schema.SHIN, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (/ש\u{05C2}/u.test(clusterText)) {
      return replaceWithRegex(clusterText, /ש\u{05C2}/u, getDageshChazaqVal(schema.SIN, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (isDageshChazq) {
      const consonant = cluster.chars[0].text;
      const consonantDagesh = new RegExp(consonant + "\u05BC", "u");
      return replaceWithRegex(clusterText, consonantDagesh, getDageshChazaqVal(consonant, schema.DAGESH_CHAZAQ, isDageshChazq));
    }
    if (cluster.isShureq) {
      return clusterText.replace("\u05D5\u05BC", schema.SHUREQ);
    }
    return clusterText;
  };
  var copySyllable = (newText, old) => {
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
  var sylRules = (syl, schema) => {
    const sylTxt = syl.text.replace(taamim2, "");
    if (schema.ADDITIONAL_FEATURES?.length) {
      const seqs = schema.ADDITIONAL_FEATURES;
      for (const seq of seqs) {
        const heb = new RegExp(seq.HEBREW, "u");
        if (seq.FEATURE === "syllable" && heb.test(sylTxt)) {
          const transliteration = seq.TRANSLITERATION;
          const passThrough = seq.PASS_THROUGH ?? true;
          if (typeof transliteration === "string") {
            return replaceAndTransliterate(sylTxt, heb, transliteration, schema);
          }
          if (!passThrough) {
            return transliteration(syl, seq.HEBREW, schema);
          }
          const newText = transliteration(syl, seq.HEBREW, schema);
          if (newText !== sylTxt) {
            syl = copySyllable(newText, syl);
          }
        }
      }
    }
    const mSSuffix = /\u{05B8}\u{05D9}\u{05D5}/u;
    if (syl.isFinal && mSSuffix.test(sylTxt)) {
      const sufxSyl = replaceWithRegex(sylTxt, mSSuffix, schema.MS_SUFX);
      return joinSyllableChars(syl, [...sufxSyl], schema);
    }
    const hasMater = syl.clusters.map((c) => c.isMater).includes(true);
    if (hasMater) {
      const materSyl = materFeatures(syl, schema);
      return joinSyllableChars(syl, [...materSyl], schema);
    }
    const returnTxt = syl.clusters.map((cluster) => {
      const clusterText = cluster.text.replace(taamim2, "");
      return consonantFeatures(clusterText, syl, cluster, schema);
    });
    return joinSyllableChars(syl, returnTxt, schema).replace(taamim2, "");
  };
  var wordRules = (word, schema) => {
    if (word.isDivineName) {
      return getDivineName(word.text, schema);
    }
    if (word.hasDivineName) {
      return `${sylRules(word.syllables[0], schema)}-${getDivineName(word.text, schema)}`;
    }
    if (word.isNotHebrew) {
      return word.text;
    }
    const text = word.text.replace(taamim2, "");
    if (schema.ADDITIONAL_FEATURES?.length) {
      const seqs = schema.ADDITIONAL_FEATURES;
      for (const seq of seqs) {
        const heb = new RegExp(seq.HEBREW, "u");
        if (seq.FEATURE === "word" && heb.test(text)) {
          const transliteration = seq.TRANSLITERATION;
          const passThrough = seq.PASS_THROUGH ?? true;
          if (typeof transliteration === "string") {
            return replaceAndTransliterate(text, heb, transliteration, schema);
          }
          if (!passThrough) {
            return transliteration(word, seq.HEBREW, schema);
          }
          return new Word(transliteration(word, seq.HEBREW, schema), schema);
        }
      }
      return word;
    }
    return word;
  };

  // node_modules/hebrew-transliteration/dist/esm/schema.js
  var Schema = class {
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
    constructor(schema) {
      this.VOCAL_SHEVA = schema.VOCAL_SHEVA, this.HATAF_SEGOL = schema.HATAF_SEGOL, this.HATAF_PATAH = schema.HATAF_PATAH, this.HATAF_QAMATS = schema.HATAF_QAMATS, this.HIRIQ = schema.HIRIQ, this.TSERE = schema.TSERE, this.SEGOL = schema.SEGOL, this.PATAH = schema.PATAH, this.QAMATS = schema.QAMATS, this.HOLAM = schema.HOLAM, this.HOLAM_HASER = schema.HOLAM_HASER, this.QUBUTS = schema.QUBUTS, this.DAGESH = schema.DAGESH, this.DAGESH_CHAZAQ = schema.DAGESH_CHAZAQ, this.MAQAF = schema.MAQAF, this.PASEQ = schema.PASEQ, this.SOF_PASUQ = schema.SOF_PASUQ, this.QAMATS_QATAN = schema.QAMATS_QATAN, this.FURTIVE_PATAH = schema.FURTIVE_PATAH, this.HIRIQ_YOD = schema.HIRIQ_YOD, this.TSERE_YOD = schema.TSERE_YOD, this.SEGOL_YOD = schema.SEGOL_YOD, this.SHUREQ = schema.SHUREQ, this.HOLAM_VAV = schema.HOLAM_VAV, this.QAMATS_HE = schema.QAMATS_HE, this.SEGOL_HE = schema.SEGOL_HE, this.TSERE_HE = schema.TSERE_HE, this.MS_SUFX = schema.MS_SUFX, this.ALEF = schema.ALEF, this.BET_DAGESH = schema.BET_DAGESH, this.BET = schema.BET, this.GIMEL = schema.GIMEL, this.GIMEL_DAGESH = schema.GIMEL_DAGESH, this.DALET = schema.DALET, this.DALET_DAGESH = schema.DALET_DAGESH, this.HE = schema.HE, this.VAV = schema.VAV, this.ZAYIN = schema.ZAYIN, this.HET = schema.HET, this.TET = schema.TET, this.YOD = schema.YOD, this.FINAL_KAF = schema.FINAL_KAF, this.KAF = schema.KAF, this.KAF_DAGESH = schema.KAF_DAGESH, this.LAMED = schema.LAMED, this.FINAL_MEM = schema.FINAL_MEM, this.MEM = schema.MEM, this.FINAL_NUN = schema.FINAL_NUN, this.NUN = schema.NUN, this.SAMEKH = schema.SAMEKH, this.AYIN = schema.AYIN, this.FINAL_PE = schema.FINAL_PE, this.PE = schema.PE, this.PE_DAGESH = schema.PE_DAGESH, this.FINAL_TSADI = schema.FINAL_TSADI, this.TSADI = schema.TSADI, this.QOF = schema.QOF, this.RESH = schema.RESH, this.SHIN = schema.SHIN, this.SIN = schema.SIN, this.TAV = schema.TAV, this.TAV_DAGESH = schema.TAV_DAGESH, this.DIVINE_NAME = schema.DIVINE_NAME, this.DIVINE_NAME_ELOHIM = schema.DIVINE_NAME_ELOHIM, this.SYLLABLE_SEPARATOR = schema.SYLLABLE_SEPARATOR, this.ADDITIONAL_FEATURES = schema.ADDITIONAL_FEATURES, this.STRESS_MARKER = schema.STRESS_MARKER, this.longVowels = schema.longVowels, this.qametsQatan = schema.qametsQatan, this.sqnmlvy = schema.sqnmlvy, this.shevaAfterMeteg = schema.shevaAfterMeteg, this.shevaWithMeteg = schema.shevaWithMeteg, this.wawShureq = schema.wawShureq, this.article = schema.article, this.allowNoNiqqud = schema.allowNoNiqqud, this.strict = schema.strict, this.holemHaser = schema.holemHaser;
    }
  };
  var SBL = class extends Schema {
    constructor(schema) {
      super({
        VOCAL_SHEVA: schema.VOCAL_SHEVA ?? "\u01DD",
        HATAF_SEGOL: schema.HATAF_SEGOL ?? "\u0115",
        HATAF_PATAH: schema.HATAF_PATAH ?? "\u0103",
        HATAF_QAMATS: schema.HATAF_QAMATS ?? "\u014F",
        HIRIQ: schema.HIRIQ ?? "i",
        TSERE: schema.TSERE ?? "\u0113",
        SEGOL: schema.SEGOL ?? "e",
        PATAH: schema.PATAH ?? "a",
        QAMATS: schema.QAMATS ?? "\u0101",
        HOLAM: schema.HOLAM ?? "\u014D",
        HOLAM_HASER: schema.HOLAM_HASER ?? "\u014D",
        QUBUTS: schema.QUBUTS ?? "\u016B",
        DAGESH: schema.DAGESH ?? "",
        DAGESH_CHAZAQ: schema.DAGESH_CHAZAQ ?? true,
        MAQAF: schema.MAQAF ?? "-",
        PASEQ: schema.PASEQ ?? "",
        SOF_PASUQ: schema.SOF_PASUQ ?? "",
        QAMATS_QATAN: schema.QAMATS_QATAN ?? "o",
        FURTIVE_PATAH: schema.FURTIVE_PATAH ?? "a",
        HIRIQ_YOD: schema.HIRIQ_YOD ?? "\xEE",
        TSERE_YOD: schema.TSERE_YOD ?? "\xEA",
        SEGOL_YOD: schema.SEGOL_YOD ?? "\xEA",
        SHUREQ: schema.SHUREQ ?? "\xFB",
        HOLAM_VAV: schema.HOLAM_VAV ?? "\xF4",
        QAMATS_HE: schema.QAMATS_HE ?? "\xE2",
        SEGOL_HE: schema.SEGOL_HE ?? "\xEA",
        TSERE_HE: schema.TSERE_HE ?? "\xEA",
        MS_SUFX: schema.MS_SUFX ?? "\u0101yw",
        ALEF: schema.ALEF ?? "\u02BE",
        BET: schema.BET ?? "b",
        BET_DAGESH: schema.BET_DAGESH ?? void 0,
        GIMEL: schema.GIMEL ?? "g",
        GIMEL_DAGESH: schema.GIMEL_DAGESH ?? void 0,
        DALET: schema.DALET ?? "d",
        DALET_DAGESH: schema.DALET_DAGESH ?? void 0,
        HE: schema.HE ?? "h",
        VAV: schema.VAV ?? "w",
        ZAYIN: schema.ZAYIN ?? "z",
        HET: schema.HET ?? "\u1E25",
        TET: schema.TET ?? "\u1E6D",
        YOD: schema.YOD ?? "y",
        FINAL_KAF: schema.FINAL_KAF ?? "k",
        KAF: schema.KAF ?? "k",
        KAF_DAGESH: schema.KAF_DAGESH ?? void 0,
        LAMED: schema.LAMED ?? "l",
        FINAL_MEM: schema.FINAL_MEM ?? "m",
        MEM: schema.MEM ?? "m",
        FINAL_NUN: schema.FINAL_NUN ?? "n",
        NUN: schema.NUN ?? "n",
        SAMEKH: schema.SAMEKH ?? "s",
        AYIN: schema.AYIN ?? "\u02BF",
        FINAL_PE: schema.FINAL_PE ?? "p",
        PE: schema.PE ?? "p",
        PE_DAGESH: schema.PE_DAGESH ?? void 0,
        FINAL_TSADI: schema.FINAL_TSADI ?? "\u1E63",
        TSADI: schema.TSADI ?? "\u1E63",
        QOF: schema.QOF ?? "q",
        RESH: schema.RESH ?? "r",
        SHIN: schema.SHIN ?? "\u0161",
        SIN: schema.SIN ?? "\u015B",
        TAV: schema.TAV ?? "t",
        TAV_DAGESH: schema.TAV_DAGESH ?? void 0,
        DIVINE_NAME: schema.DIVINE_NAME ?? "yhwh",
        DIVINE_NAME_ELOHIM: schema.DIVINE_NAME_ELOHIM ?? void 0,
        SYLLABLE_SEPARATOR: schema.SYLLABLE_SEPARATOR ?? void 0,
        ADDITIONAL_FEATURES: schema.ADDITIONAL_FEATURES ?? void 0,
        STRESS_MARKER: schema.STRESS_MARKER ?? void 0,
        longVowels: schema.longVowels ?? true,
        qametsQatan: schema.qametsQatan ?? true,
        shevaAfterMeteg: schema.shevaAfterMeteg ?? true,
        shevaWithMeteg: schema.shevaWithMeteg ?? false,
        sqnmlvy: schema.sqnmlvy ?? true,
        wawShureq: schema.wawShureq ?? true,
        article: schema.article ?? true,
        allowNoNiqqud: schema.allowNoNiqqud ?? true,
        strict: schema.strict ?? false,
        holemHaser: schema.holemHaser || "remove"
      });
    }
  };

  // node_modules/hebrew-transliteration/dist/esm/transliterate.js
  var getSylOpts = (schema) => {
    const options = {};
    if ("longVowels" in schema)
      options.longVowels = schema.longVowels;
    if ("qametsQatan" in schema)
      options.qametsQatan = schema.qametsQatan;
    if ("sqnmlvy" in schema)
      options.shevaAfterMeteg = schema.shevaAfterMeteg;
    if ("sqnmlvy" in schema)
      options.sqnmlvy = schema.sqnmlvy;
    if ("wawShureq" in schema)
      options.wawShureq = schema.wawShureq;
    if ("article" in schema)
      options.article = schema.article;
    if ("allowNoNiqqud" in schema)
      options.allowNoNiqqud = schema.allowNoNiqqud;
    if ("strict" in schema)
      options.strict = schema.strict;
    return options;
  };
  var transliterate = (text, schema) => {
    const transSchema = schema instanceof Schema ? schema : new SBL(schema ?? {});
    const newText = text instanceof Text ? text : new Text(text, getSylOpts(transSchema ?? {}));
    return newText.words.map((word) => {
      let transliteration = wordRules(word, transSchema);
      if (transliteration instanceof Word) {
        transliteration = transliteration.syllables.map((s) => sylRules(s, transSchema)).join(transSchema.SYLLABLE_SEPARATOR ?? "");
      }
      return `${transliteration}${word.whiteSpaceAfter ?? ""}`;
    }).join("");
  };

  // node_modules/hebrew-transliteration/dist/esm/sequence.js
  var vowels2 = /[\u{05B0}-\u{05BC}\u{05C7}]/u;
  var sequence2 = (text, qametsQatan = false) => {
    return vowels2.test(text) ? new Text(text, { qametsQatan }).text : text;
  };

  // node_modules/hebrew-transliteration/dist/esm/remove.js
  var removeMap = {
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
  var accents = {
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
  var points = {
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
  var punctuation2 = {
    MAQAF: true,
    PASEQ: true,
    SOF_PASUQ: true,
    NUN_HAFUKHA: true,
    PUNC_GERESH: true,
    PUNC_GERSHAYIM: true
  };
  var marks = {
    MASORA_CIRCLE: true,
    UPPER_DOT: true,
    LOWER_DOT: true
  };
  var all = {
    ...accents,
    ...points,
    ...punctuation2,
    ...marks
  };
  var remove = (text, options = { ...accents, METEG: true, RAFE: true }) => {
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

  // src/assets/js/wrapper.js
  var Wrapper = class {
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
    async fetchTransliteration(text, schema) {
      try {
        const resp = await fetch("/api/transliterate", {
          method: "POST",
          body: JSON.stringify({
            text,
            schema
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
    async transliterate(text, schema) {
      try {
        if (!this.supportsRegex) {
          return await this.fetchTransliteration(text, schema);
        }
        return transliterate(text, schema);
      } catch (error) {
        this.postError(error, text, schema);
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

  // src/assets/js/feedback.js
  var feedbackFormInit = () => {
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

  // src/assets/js/spinner.js
  var Spinner = class {
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

  // src/assets/js/remove.js
  feedbackFormInit();
  var defaultOpions = {
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
    ZINOR: true,
    METEG: true,
    RAFE: true,
    SOF_PASUQ: true,
    PUNC_GERESH: false,
    PUNC_GERSHAYIM: false
  };
  var wrapper = new Wrapper();
  var loadingSpinner = new Spinner(
    /** @type {Element} */
    document.querySelector("#spinner"),
    /** @type {Element} */
    document.querySelector("#btn-txt")
  );
  var steps = (
    /** @type {HTMLDivElement} */
    document.querySelector("#remove-modal #modal-cards").children
  );
  var nextBtn = (
    /** @type {HTMLButtonElement} */
    document.querySelector("#next-btn")
  );
  var prevBtn = (
    /** @type {HTMLButtonElement} */
    document.querySelector("#prev-btn")
  );
  var finalBtn = (
    /** @type {HTMLButtonElement} */
    document.querySelector("#final-btn")
  );
  var wizard = new Wizard(
    steps,
    "d-block",
    "d-none",
    { btn: prevBtn, text: "Previous" },
    { btn: nextBtn, text: "Next" },
    { btn: finalBtn, text: "Done" }
  );
  wizard.init();
  function checkKey(e) {
    if (
      /** @type {HTMLDivElement} */
      document.querySelector("#remove-modal").offsetTop !== 0
    )
      return;
    e = e || window.event;
    if (e.keyCode == "37") wizard.prevWindow();
    if (e.keyCode == "39") wizard.nextWindow();
  }
  document.onkeydown = checkKey;
  var input = (
    /** @type {HTMLTextAreaElement} */
    document.querySelector("#input")
  );
  var output = (
    /** @type {HTMLTextAreaElement} */
    document.querySelector("#output")
  );
  var actionBtn = (
    /** @type {HTMLButtonElement} */
    document.querySelector("#action-btn")
  );
  var selectAllInputs = Array.from(
    /** @type {NodeListOf<HTMLInputElement>} */
    document.querySelectorAll("[id^='select-all-']")
  );
  function getOptions() {
    return Array.from(
      /** @type {NodeListOf<HTMLInputElement>} */
      document.querySelectorAll("input.option")
    ).map((e) => ({
      [e.id]: e.checked
    })).reduce((a, c) => ({ ...a, ...c }), {});
  }
  function setOptions(options) {
    Array.from(
      /** @type {NodeListOf<HTMLInputElement>} */
      document.querySelectorAll("input.option")
    ).forEach((input2) => {
      if (options[input2.id]) {
        input2.checked = options[input2.id];
      }
    });
  }
  function getLocalStorageOptions() {
    const ls = localStorage.getItem("REMOVE_OPTIONS");
    if (!ls) return null;
    return JSON.parse(ls);
  }
  function setLocalStorageOptions(vals) {
    localStorage.setItem(`REMOVE_OPTIONS`, JSON.stringify(vals));
  }
  actionBtn.addEventListener("click", async () => {
    try {
      const options = getOptions();
      if (!wrapper.supportsRegexLookAheadLookBehind()) loadingSpinner.toggleSpinnerOn();
      output.value = await wrapper.remove(input.value || input.placeholder, options);
      if (!wrapper.supportsRegexLookAheadLookBehind()) loadingSpinner.toggleSpinnerOff();
      setLocalStorageOptions(options);
    } catch (error) {
      console.log(error);
      output.value = error.message ?? "Hmmm...it seems something went wrong";
    }
  });
  selectAllInputs.forEach((input2, index) => {
    input2.addEventListener("input", () => {
      const val = input2.checked;
      document.querySelectorAll(`#step-${index + 1}-form input`).forEach((input3) => input3.checked = val);
    });
  });
  if (!wrapper.supportsRegex) {
    document.querySelector("#browser-alert").hidden = false;
  }
  setOptions(getLocalStorageOptions() || defaultOpions);
})();
