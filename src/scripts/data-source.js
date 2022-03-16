export default class DataSource {
  static BASE_URL = 'https://idn-area.herokuapp.com';

  static async getProvinces() {
    const res = await fetch(`${this.BASE_URL}/provinces`);
    if (!res.ok) {
      return Promise.reject(new Error('Failed to get provinces'));
    }
    return res.json();
  }
}
