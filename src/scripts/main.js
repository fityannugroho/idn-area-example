import $ from 'jquery';
import '../components/form-select.js';
import DataSource from './data-source.js';

const main = () => {
  const FIRST_ELEMENT = 0;
  const LOAD_PROVINCE_OPTIONS_EVENT = 'load-province-options';
  const LOAD_REGENCY_OPTIONS_EVENT = 'load-regency-options';
  const LOAD_DISTRICT_OPTIONS_EVENT = 'load-district-options';
  const LOAD_VILLAGE_OPTIONS_EVENT = 'load-village-options';

  const loadVillageOptions = async (district) => {
    $(document).trigger(LOAD_VILLAGE_OPTIONS_EVENT);
  };

  const loadDistrictOptions = async (regency) => {
    $(document).trigger(LOAD_DISTRICT_OPTIONS_EVENT);

    try {
      const formSelectDistrict = $('form-select#district').get(FIRST_ELEMENT);
      const districtsInRegency = await DataSource.getDistrictsByRegency(regency.code, 'name');

      formSelectDistrict
        .setDisabled(false)
        .setOptions(districtsInRegency)
        .setOptionValueKey('name')
        .setOnOptionClicked(loadVillageOptions)
        .setEmptyOption('Select a district')
        .render();
    } catch (error) {
      // TODO: Set error in district options.
      console.error(error);
    }
  };

  const loadRegencyOptions = async (province) => {
    $(document).trigger(LOAD_REGENCY_OPTIONS_EVENT);

    try {
      const formSelectRegency = $('form-select#regency').get(FIRST_ELEMENT);
      const regenciesInProvince = await DataSource.getRegenciesByProvince(province.code, 'name');

      formSelectRegency
        .setDisabled(false)
        .setOptions(regenciesInProvince)
        .setOptionValueKey('name')
        .setOnOptionClicked(loadDistrictOptions)
        .setEmptyOption('Select a regency')
        .render();
    } catch (error) {
      // TODO: Set error in regency options.
      console.error(error);
    }
  };

  const loadProvinceOptions = async () => {
    $(document).trigger(LOAD_PROVINCE_OPTIONS_EVENT);

    try {
      const formSelectProvince = $('form-select#province').get(FIRST_ELEMENT);
      const provinces = await DataSource.getProvinces('name');

      formSelectProvince
        .setDisabled(false)
        .setOptions(provinces)
        .setOptionValueKey('name')
        .setOnOptionClicked(loadRegencyOptions)
        .setEmptyOption('Select a province')
        .render();
    } catch (error) {
      // TODO: Set error in province options.
      console.error(error);
    }
  };

  // -------- Event Handler --------
  $(document).on(LOAD_REGENCY_OPTIONS_EVENT, () => {
    // Reset the regency, district, and village options.
    $('form-select#regency').get(FIRST_ELEMENT).resetOptions();
    $('form-select#district').get(FIRST_ELEMENT).resetOptions();
    $('form-select#village').get(FIRST_ELEMENT).resetOptions();
  });

  $(document).on(LOAD_DISTRICT_OPTIONS_EVENT, () => {
    // Reset the district and village options.
    $('form-select#district').get(FIRST_ELEMENT).resetOptions();
    $('form-select#village').get(FIRST_ELEMENT).resetOptions();
  });

  $(document).on(LOAD_VILLAGE_OPTIONS_EVENT, () => {
    // Reset the village options.
    $('form-select#village').get(FIRST_ELEMENT).resetOptions();
  });

  // -------- Executor --------
  loadProvinceOptions();
};

export default main;
