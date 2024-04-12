export type ClassParam = { new(...args: any[]): any }

export function getClassName(inputClass: ClassParam): string {
    return Reflect.get(inputClass, 'name')
}

export function getBaseClassName(inputClass: ClassParam): string {
    return Reflect.get(Object.getPrototypeOf(inputClass), 'name')
}

/**
 * Sample Usage:
 * const person = makeWatchedObject({
 *   name: 'John',
 *   age: 30
 * });
 * 
 * person.on('name', (value: any) => {
 *   console.log('Name is changed to', value);
 * });
 * 
 * person.name = 'Doe';
 * 
 * *This function watched the object for changes to defined key and triggers a callback when a change is detected.
 */
export function makeWatchedObject(obj: any) {
    const handlers: any = {};
    const watchedObject = new Proxy(obj, {
        get(target, property, receiver) {
            return Reflect.get(target, property, receiver);
        },
        set(target, property, value, receiver) {
            if (handlers[property]) {
                handlers[property].forEach((handler: any) => handler(value));
            }
            return Reflect.set(target, property, value, receiver);
        }
    });

    watchedObject.on = (property: any, handler: any) => {
        if (!handlers[property]) {
            handlers[property] = [];
        }
        handlers[property].push(handler);
    };
    return watchedObject;
}