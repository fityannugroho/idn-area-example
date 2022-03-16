import $ from 'jquery';
import '../components/form-select.js';
import DataSource from './data-source.js';

const main = () => {
  const FIRST_ELEMENT = 0;
  const RESET_REGENCY_OPTIONS_EVENT = 'reset-regency-options';
  const RESET_DISTRICT_OPTIONS_EVENT = 'reset-district-options';
  const RESET_VILLAGE_OPTIONS_EVENT = 'reset-village-options';

  const loadDistrictOptions = async (regency) => {
    // TODO: Render the district options.
  };

  const loadRegencyOptions = async (province) => {
    try {
      const formSelectRegency = $('form-select#regency').get(FIRST_ELEMENT);
      const regenciesInProvince = await DataSource.getRegenciesByProvince(province.code);

      formSelectRegency
        .setDisabled(false)
        .setOptions(regenciesInProvince)
        .setOptionValueKey('name')
        .setOnOptionClicked(loadDistrictOptions)
        .setEmptyOption('Select a regency', () => {
          // TODO: Reset the district options.
        })
        .render();
    } catch (error) {
      // TODO: Set error in regency options.
      console.error(error);
    }
  };

  const loadProvinceOptions = async () => {
    try {
      const formSelectProvince = $('form-select#province').get(FIRST_ELEMENT);
      const provinces = await DataSource.getProvinces('name');

      formSelectProvince
        .setDisabled(false)
        .setOptions(provinces)
        .setOptionValueKey('name')
        .setOnOptionClicked(loadRegencyOptions)
        .setEmptyOption('Select a province', () => {
          $(document).trigger(RESET_REGENCY_OPTIONS_EVENT);
        })
        .render();
    } catch (error) {
      // TODO: Set error in province options.
      console.error(error);
    }
  };

  // -------- Event Handler --------
  $(document).on(RESET_REGENCY_OPTIONS_EVENT, () => {
    $('form-select#regency').get(FIRST_ELEMENT).resetOptions();
  });

  $(document).on(RESET_DISTRICT_OPTIONS_EVENT, () => {
    $('form-select#district').get(FIRST_ELEMENT).resetOptions();
  });

  $(document).on(RESET_VILLAGE_OPTIONS_EVENT, () => {
    $('form-select#village').get(FIRST_ELEMENT).resetOptions();
  });

  // -------- Executor --------
  loadProvinceOptions();
};

export default main;
