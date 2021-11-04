# INSTALLATION

```
npm install unikorn.db
// or
yarn add unikorn.db
```

---

# HOW TO USE MODULE

````javascript
const {DataBase} = require('unikorn.db');
const db = new DataBase(
    'database',
    {
        backUp: {
            active: true,
            timeInterval: 1, // minute
        }
    }
);
````

# METHODS
``get, set, has, push, removeArray, getAll, delete, deleteAll, add, subtract, type``

---

# HOW TO USE METHODS

```json
{
  "test": "test",
  "obj": {
    "test": "test1"
  },
  "array": [
    "test",
    "test2",
    "test3"
  ],
  "count": 12,
  "active": false
}
```

#### get Method
```javascript
db.get('test'); // Output: 'test'
// or
db.get('obj.test'); // Output: 'test1'
```

##### set Method
```javascript
db.set('name', 'Yusuf'); // Output: 'Yusuf'
// or
db.set('user.name', 'Yusuf'); // Output: {name: 'Yusuf'}
```

#### has Method
```javascript
db.has('asd'); // Output: false
// or
db.has('test'); // Output: true
```

#### push Method
```javascript
db.push('arr', 'test'); // Output: {arr: ['test']}
// or
db.push('db.numbers', [1, 2, 3]); // Output: {db: {numbers: [1, 2, 3]}}
// or
db.push('arr', {name: 'Yusuf'}); // Output: {arr: [{name: Yusuf}]}
```

#### removeArray Method
```javascript
db.removeArray('array', 'test2'); // Output: {array: ['test', 'test3']}
```

#### getAll Method
```javascript
db.getAll(); // Output: Returns all data.
```

#### deleteAll Method
```javascript
db.deleteAll(); // Output: {}
```

#### delete Method
```javascript
db.delete('obj', 'test'); // Output: {obj: {}}
// or
db.delete('test'); // Deleted
```

#### add Method
```javascript
db.add('count', 18); // Output: 30
// or
db.add('newCount', 12); // Output: 12
```

### subtract Method
```javascript
db.subtract('count', 2); // Output: 10
```

#### type Method
```javascript
db.type('count'); // Output: number
// or
db.type('array'); // Output: array
// or
db.type('test'); // Output: string
// or
db.type('obj'); // Output: object
// or
db.type('active'); // Output: boolean
```

