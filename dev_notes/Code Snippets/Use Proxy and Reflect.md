``` Typescript
function makeWatchedObject(obj: any) {
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

// ---cut---

const person = makeWatchedObject({
    firstName: "John",
    lastName: "Doe",
    age: 26,
});

// makeWatchedObject has added `on` to the anonymous Object

person.on("firstName", (newValue: any) => {
    console.log(`firstName was changed to ${newValue}!`);
});

person.firstName = 'John'
```

