export default class DataSource {
  static BASE_URL = 'https://idn-area.herokuapp.com';

  static OK_STATUS = 200;

  static BAD_REQUEST_STATUS = 400;

  static NOT_FOUND_STATUS = 404;

  /**
   * Make a sort query.
   * @param {string} sortBy Sort  by its `code` or `name`.
   * @param {string} sortOrder `asc` or `desc`.
   * @returns The sort query.
   */
  static makeSortQuery(sortBy, sortOrder) {
    return `?sortBy=${sortBy}&sortOrder=${sortOrder}`;
  }

  /**
   * Get all provinces
   * @param {string} sortBy Sort the province by its `code` or `name`. The default is `code`.
   * @param {string} sortOrder `asc` or `desc`.
   * @returns The array of province.
   */
  static async getProvinces(sortBy = 'code', sortOrder = 'asc') {
    const res = await fetch(`${this.BASE_URL}/provinces${DataSource.makeSortQuery(sortBy, sortOrder)}`);
    if (!res.ok) {
      return Promise.reject(new Error('Failed to get provinces'));
    }
    return res.json();
  }

  /**
   * Get all regencies in a province.
   * @param {string} provinceCode The province code.
   * @param {string} sortBy Sort the regencies by its `code` or `name`. The default is `code`.
   * @param {string} sortOrder `asc` or `desc`.
   * @returns The array of regency.
   */
  static async getRegenciesByProvince(provinceCode, sortBy = 'code', sortOrder = 'asc') {
    const res = await fetch(`${this.BASE_URL}/provinces/${provinceCode}/regencies${DataSource.makeSortQuery(sortBy, sortOrder)}`);
    const resJson = await res.json();
    if (!res.ok) {
      return Promise.reject(new Error(resJson.message.join(', ')));
    }
    return resJson;
  }

  /**
   * Get all districts in a regency.
   * @param {string} regencyCode The regency code.
   * @param {string} sortBy Sort the districts by its `code` or `name`. The default is `code`.
   * @param {string} sortOrder `asc` or `desc`. The default is `asc`.
   * @returns The array of district.
   */
  static async getDistrictsByRegency(regencyCode, sortBy = 'code', sortOrder = 'asc') {
    const res = await fetch(`${this.BASE_URL}/regencies/${regencyCode}/districts${DataSource.makeSortQuery(sortBy, sortOrder)}`);
    const resJson = await res.json();
    if (!res.ok) {
      return Promise.reject(new Error(resJson.message.join(', ')));
    }
    return resJson;
  }

  /**
   * Get all villages in a district.
   * @param {string} districtCode The district code.
   * @param {string} sortBy Sort the villages by its `code` or `name`. The default is `code`.
   * @param {string} sortOrder `asc` or `desc`. The default is `asc`.
   * @returns The array of villages.
   */
  static async getVillagesByDistrict(districtCode, sortBy = 'code', sortOrder = 'asc') {
    const res = await fetch(`${this.BASE_URL}/districts/${districtCode}/villages${DataSource.makeSortQuery(sortBy, sortOrder)}`);
    const resJson = await res.json();
    if (!res.ok) {
      return Promise.reject(new Error(resJson.message.join(', ')));
    }
    return resJson;
  }
}
