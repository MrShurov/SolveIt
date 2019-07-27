export default class ArrayUtils {
  static arrayToMap(array) {
    const map = new Map();
    array.forEach(element => {
      if (map.has(element)) {
        map.set(element, map.get(element) + 1);
      } else {
        map.set(element, 1);
      }
    });
    return map;
  }
}
