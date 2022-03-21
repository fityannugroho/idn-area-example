import $ from 'jquery';
import '../components/form-select.js';
import '../components/form-radio.js';
import DataSource from './data-source.js';

const main = () => {
  const FIRST_ELEMENT = 0;
  const LOAD_PROVINCE_OPTIONS_EVENT = 'load-province-options';
  const LOAD_REGENCY_OPTIONS_EVENT = 'load-regency-options';
  const LOAD_DISTRICT_OPTIONS_EVENT = 'load-district-options';
  const LOAD_VILLAGE_OPTIONS_EVENT = 'load-village-options';

  const loadVillageOptions = async (district) => {
    $(document).trigger(LOAD_VILLAGE_OPTIONS_EVENT); try {
      $('form-select#village').get(FIRST_ELEMENT)
        .setOptions(await DataSource.getVillagesByDistrict(district.code, 'name'))
        .setOptionValueKey('name')
        .setOnOptionClicked(() => {})
        .setEmptyOption('Select a village')
        .setDisabled(false)
        .setOnLoad(false)
        .render();
    } catch (error) {
      // TODO: Set error in village options.
      console.error(error);
    }
  };

  const loadDistrictOptions = async (regency) => {
    $(document).trigger(LOAD_DISTRICT_OPTIONS_EVENT);
    try {
      $('form-select#district').get(FIRST_ELEMENT)
        .setOptions(await DataSource.getDistrictsByRegency(regency.code, 'name'))
        .setOptionValueKey('name')
        .setOnOptionClicked(loadVillageOptions)
        .setEmptyOption('Select a district')
        .setDisabled(false)
        .setOnLoad(false)
        .render();
    } catch (error) {
      // TODO: Set error in district options.
      console.error(error);
    }
  };

  const loadRegencyOptions = async (province) => {
    $(document).trigger(LOAD_REGENCY_OPTIONS_EVENT);
    try {
      $('form-select#regency').get(FIRST_ELEMENT)
        .setOptions(await DataSource.getRegenciesByProvince(province.code, 'name'))
        .setOptionValueKey('name')
        .setOnOptionClicked(loadDistrictOptions)
        .setEmptyOption('Select a regency')
        .setDisabled(false)
        .setOnLoad(false)
        .render();
    } catch (error) {
      // TODO: Set error in regency options.
      console.error(error);
    }
  };

  const loadProvinceOptions = async () => {
    $(document).trigger(LOAD_PROVINCE_OPTIONS_EVENT);
    try {
      $('form-select#province').get(FIRST_ELEMENT)
        .setOptions(await DataSource.getProvinces('name'))
        .setOptionValueKey('name')
        .setOnOptionClicked(loadRegencyOptions)
        .setEmptyOption('Select a province')
        .setDisabled(false)
        .setOnLoad(false)
        .render();
    } catch (error) {
      // TODO: Set error in province options.
      console.error(error);
    }
  };

  const onSearchByName = async () => {
    const area = $('form-radio[name="searchBy"][checked]').val();
    const nameInput = $('#searchByName').val();

    if (area !== '' && nameInput.length >= 3) {
      try {
        const results = await DataSource.getByName(nameInput, area, 'name');
        const $searchResults = $('#searchByNameResult').html('');

        results.forEach((result) => {
          $searchResults.append($('<p>').html(`${result.name} (${result.code})`));
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // -------- Event Handler --------
  $(document).on(LOAD_PROVINCE_OPTIONS_EVENT, () => {
    $('form-select#province').get(FIRST_ELEMENT).setOnLoad().render();
  });

  $(document).on(LOAD_REGENCY_OPTIONS_EVENT, () => {
    // Reset the regency, district, and village options.
    $('form-select#regency').get(FIRST_ELEMENT).setOnLoad().resetOptions();
    $('form-select#district').get(FIRST_ELEMENT).resetOptions();
    $('form-select#village').get(FIRST_ELEMENT).resetOptions();
  });

  $(document).on(LOAD_DISTRICT_OPTIONS_EVENT, () => {
    // Reset the district and village options.
    $('form-select#district').get(FIRST_ELEMENT).setOnLoad().resetOptions();
    $('form-select#village').get(FIRST_ELEMENT).resetOptions();
  });

  $(document).on(LOAD_VILLAGE_OPTIONS_EVENT, () => {
    // Reset the village options.
    $('form-select#village').get(FIRST_ELEMENT).setOnLoad().resetOptions();
  });

  let timer = null;
  $('#searchByName').on('input', () => {
    clearTimeout(timer);
    timer = setTimeout(onSearchByName, 500);
  });

  // -------- Executor --------
  loadProvinceOptions();
};

export default main;
