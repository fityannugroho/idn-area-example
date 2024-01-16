/**
 * @type RequestInit
 */
const fetchInit = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const parentCodeQueryKey = {
  regencies: 'provinceCode',
  islands: 'regencyCode',
  districts: 'regencyCode',
  villages: 'districtCode',
};

const baseUrl = 'https://idn-area.up.railway.app';

/**
 * Get the data from the API.
 * @param {'provinces' | 'regencies' | 'districts' | 'villages' | 'islands'} area
 *   The area to get the data from.
 * @param {{
 *   parentCode?: string;
 *   name?: string;
 *   limit?: number;
 *   sortBy?: string;
 *   sortOrder?: 'asc'| 'desc';
 *   page?: number;
 * }} query The query params. The `limit` is 100 by default.
 * @returns
 */
// eslint-disable-next-line import/prefer-default-export
export async function getData(area, query) {
  const url = new URL(`${baseUrl}/${area}`);

  if (query?.parentCode && area !== 'provinces') {
    url.searchParams.append(
      parentCodeQueryKey[area],
      query.parentCode,
    );
  }

  if (query?.name) {
    url.searchParams.append('name', query.name);
  }

  if (query?.sortBy) {
    url.searchParams.append('sortBy', query.sortBy);
  }

  if (query?.page) {
    url.searchParams.append('page', query.page.toString());
  }

  url.searchParams.append('limit', query.limit?.toString() ?? '100');

  const res = await fetch(url, fetchInit);

  if (!res.ok) {
    return Promise.reject(new Error(`Failed to fetch ${area} data`));
  }

  return (await res.json()).data;
}
