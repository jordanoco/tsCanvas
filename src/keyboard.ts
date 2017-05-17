/* base keyboard class */
class JTechKeyboard {
    pressedKeys: object;

    /* static list of all the keys and their keyCodes */
    static keys = {
        "a": 65, "b": 66, "c": 67, "d": 68, "e": 69,
        "f": 70, "g": 71, "h": 72, "i": 73, "j": 74,
        "k": 75, "l": 76, "m": 77, "n": 78, "o": 79,
        "p": 80, "q": 81, "r": 82, "s": 83, "t": 84,
        "u": 85, "v": 86, "w": 87, "x": 88, "y": 89,
        "z": 90, "0": 48, "1": 49, "2": 50, "3": 51,
        "4": 52, "5": 53, "6": 54, "7": 55, "8": 56,
        "9": 57, "`": 192, "-": 189, "=": 187, "[": 219,
        "]": 221, ";": 186, "'": 222, ",": 188, ".": 190,
        "/": 191, "\\": 220,

        "shift": 16, "ctrl": 17, "alt": 18, "meta": 19,
        "space": 32, "up": 38, "down": 40, "left": 37,
        "right": 39, "enter": 13, "bspace": 8, "esc": 27,
        "f1": 112, "f2": 113, "f3": 114, "f4": 115, "f5": 116,
        "f6": 117, "f7": 118, "f8": 119, "f9": 120, "f10": 121,
        "f11": 122, "f12": 123, "tab": 9, "del": 46
  }

  /* overridable functions */
  keyDown = (key: string): void => {};
  keyUp = (key: string): void => {};

  constructor(){
    addEventListener('keydown', (e: KeyboardEvent): boolean => {
        if (e.keyCode == 9) 
            e.preventDefault();
        this.pressedKeys[e.keyCode] = true;
        this.keyDown(JTechKeyboard.toKeyChar(e.keyCode));
        return false;
    });

    addEventListener('keyup', (e: KeyboardEvent): boolean => {
        if (e.keyCode == 9) 
            e.preventDefault();
        delete this.pressedKeys[e.keyCode];
        this.keyUp(JTechKeyboard.toKeyChar(e.keyCode));
        return false
    });
  }

  isDown = (key: string): boolean => {
      return (JTechKeyboard.toKeyCode(key) in this.pressedKeys);
  }

  static toKeyCode = (char: string): number => {
      return JTechKeyboard.keys[char];
  }

  static toKeyChar = (keyCode: number): string => {
      for (let char in JTechKeyboard.keys) {
        if (JTechKeyboard.keys[char] == keyCode)
            return char;
      }
  }
}