export default class DataSource {
  static BASE_URL = 'https://idn-area.herokuapp.com';

  /**
   * Make a sort query.
   * @param {string} sortBy Sort the province by its `code` or `name`.
   * @param {string} sortOrder `asc` or `desc`.
   * @returns The sort query.
   */
  static makeSortQuery(sortBy, sortOrder) {
    return `?sortBy=${sortBy}&sortOrder=${sortOrder}`;
  }

  static async getProvinces(sortBy = 'code', sortOrder = 'asc') {
    const res = await fetch(`${this.BASE_URL}/provinces${DataSource.makeSortQuery(sortBy, sortOrder)}`);
    if (!res.ok) {
      return Promise.reject(new Error('Failed to get provinces'));
    }
    return res.json();
  }
}
