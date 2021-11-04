const { DataBase } = require('../src/index');
const db = new DataBase(
    'test',
    {
        backUp: {
            active: false,
            timeInterval: 0.1 // minute
        }
    }
);

describe('should database test', function () {
    it('should set method test', function () {
        db.set('test1', 'test');
        db.set('del', 'test');
        db.set('delete.delete', 'test');

        db.set('test.test', 'test1');
    });

    it('should get method test', function () {
        db.get('test1');

        db.get('test.test');
    });

    it('should delete method test', function () {
        db.delete('delete.delete');

        db.delete('del');
    });

    it('should has method test', function () {
        db.has('test.test');

        db.has('test1');
    });

    it('should add method test', function () {
        db.add('any', 123);

        db.add('a.b', 23);
    });

    it('should subtract method test', function () {
        db.subtract('any', 12);

        db.add('a.b', 13);
    });

    it('should removeArray method test', function () {
        db.removeArray('arr', 'test');
    });

    it('should push method test', function () {
        db.push('arr', 'test');

        db.push('arr', {name: 'test'});
    });

    it('should type method test', function () {
        db.type('arr');
    });

    it('should getAll method test', function () {
        db.getAll();
    });

    it('should deleteAll method test', function () {
        db.deleteAll();
    });
});
