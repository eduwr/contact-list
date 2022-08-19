export class Container {
  [key: string]: any;

  services = {} as {
    [key: string]: any
  };

  service(name: string, cb: (...args: any) => any){
    Object.defineProperty(this, name, {
      get: () => {
        // eslint-disable-next-line no-prototype-builtins
        if(!this.services.hasOwnProperty(name)){
          this.services[name] = cb(this);
        }

        return this.services[name];
      },
      configurable: true,
      enumerable: true
    });

    return this;
  }
}
