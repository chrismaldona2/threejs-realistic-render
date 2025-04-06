type CallbackFunction = (...args: any[]) => any;
type Callbacks = {
  [namespace: string]: {
    [event: string]: CallbackFunction[];
  };
};

export default class EventEmitter {
  private callbacks: Callbacks;

  constructor() {
    this.callbacks = {} as Callbacks;
    this.callbacks.base = {};
  }

  on(_names: string, callback: CallbackFunction): this | false {
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong names");
      return false;
    }
    if (typeof callback === "undefined") {
      console.warn("wrong callback");
      return false;
    }

    const names = this.resolveNames(_names);
    names.forEach((_name) => {
      const name = this.resolveName(_name);

      if (!(this.callbacks[name.namespace] instanceof Object))
        this.callbacks[name.namespace] = {};

      if (!(this.callbacks[name.namespace][name.value] instanceof Array))
        this.callbacks[name.namespace][name.value] = [];

      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  off(_names: string): this | false {
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong name");
      return false;
    }

    const names = this.resolveNames(_names);
    names.forEach((_name) => {
      const name = this.resolveName(_name);

      if (name.namespace !== "base" && name.value === "") {
        delete this.callbacks[name.namespace];
      } else {
        if (name.namespace === "base") {
          for (const namespace in this.callbacks) {
            if (
              this.callbacks[namespace] instanceof Object &&
              this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete this.callbacks[namespace][name.value];

              if (Object.keys(this.callbacks[namespace]).length === 0) {
                delete this.callbacks[namespace];
              }
            }
          }
        } else if (
          this.callbacks[name.namespace] instanceof Object &&
          this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete this.callbacks[name.namespace][name.value];

          if (Object.keys(this.callbacks[name.namespace]).length === 0) {
            delete this.callbacks[name.namespace];
          }
        }
      }
    });

    return this;
  }

  trigger(_name: string, _args?: any[]): any {
    if (typeof _name === "undefined" || _name === "") {
      console.warn("wrong name");
      return false;
    }

    let finalResult: any = null;
    let result: any = null;
    const args = Array.isArray(_args) ? _args : [];
    let nameArray = this.resolveNames(_name);
    let name = this.resolveName(nameArray[0]);

    if (name.namespace === "base") {
      for (const namespace in this.callbacks) {
        if (
          this.callbacks[namespace] instanceof Object &&
          this.callbacks[namespace][name.value] instanceof Array
        ) {
          this.callbacks[namespace][name.value].forEach((callback) => {
            result = callback.apply(this, args);
            if (typeof finalResult === "undefined") {
              finalResult = result;
            }
          });
        }
      }
    } else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === "") {
        console.warn("wrong name");
        return this;
      }
      this.callbacks[name.namespace][name.value]?.forEach((callback) => {
        result = callback.apply(this, args);
        if (typeof finalResult === "undefined") {
          finalResult = result;
        }
      });
    }
    return finalResult;
  }

  resolveNames(_names: string): string[] {
    let cleaned = _names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
    cleaned = cleaned.replace(/[,/]+/g, " ");
    const names = cleaned.split(" ");
    return names;
  }

  resolveName(name: string): {
    original: string;
    value: string;
    namespace: string;
  } {
    const parts = name.split(".");
    const newName = {
      original: name,
      value: parts[0],
      namespace: "base",
    };
    if (parts.length > 1 && parts[1] !== "") {
      newName.namespace = parts[1];
    }

    return newName;
  }
}
