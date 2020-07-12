import getUniqueObjects from './uniqueObjects.utils';

describe('getUniqueObjects', () => {
  it('returns an empty array from an empty array', () => {
    expect(getUniqueObjects([], 'id')).toEqual([]);
  });
  it('returns all the objects from an array of unique objects', () => {
    const arr = [
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
    ];
    expect(getUniqueObjects(arr, 'id')).toEqual(arr);
  });
  it('returns the first unique object from an array', () => {
    const arr = [
      { id: 1, name: 'name1' },
      { id: 1, name: 'name2' },
    ];
    expect(getUniqueObjects(arr, 'id')).toEqual([{ id: 1, name: 'name1' }]);
  });
  it('returns the first unique object (by default key - id) from an array', () => {
    const arr = [
      { id: 1, name: 'name1' },
      { id: 1, name: 'name2' },
    ];
    expect(getUniqueObjects(arr)).toEqual([{ id: 1, name: 'name1' }]);
  });
  it('returns the first unique object (by non-default key) from an array', () => {
    const arr = [
      { id: 1, name: 'name1' },
      { id: 2, name: 'name1' },
    ];
    expect(getUniqueObjects(arr, 'name')).toEqual([{ id: 1, name: 'name1' }]);
  });
  it('returns the unique objects (by default key - id) from the example array', () => {
    const arr = [
      { id: 1, name: 'paint' },
      { id: 2, name: 'bead' },
      { id: 3, name: 'arm' },
      { id: 4, name: 'snakes' },
      { id: 5, name: 'wire' },
      { id: 6, name: 'ducks' },
      { id: 1, name: 'cork' },
      { id: 1, name: 'bed' },
    ];

    const uniqueArr = [
      { id: 1, name: 'paint' },
      { id: 2, name: 'bead' },
      { id: 3, name: 'arm' },
      { id: 4, name: 'snakes' },
      { id: 5, name: 'wire' },
      { id: 6, name: 'ducks' },
    ];

    expect(getUniqueObjects(arr, 'id')).toEqual(uniqueArr);
    expect(getUniqueObjects(arr)).toEqual(uniqueArr);
  });
  it('returns the unique objects (by a non-default key) from the example array', () => {
    const arr = [
      { id: 1, name: 'paint' },
      { id: 2, name: 'bead' },
      { id: 3, name: 'arm' },
      { id: 4, name: 'snakes' },
      { id: 5, name: 'wire' },
      { id: 6, name: 'ducks' },
      { id: 1, name: 'cork' },
      { id: 1, name: 'bed' },
    ];
    expect(getUniqueObjects(arr, 'name')).toEqual(arr);
  });
});
