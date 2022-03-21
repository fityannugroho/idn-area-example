import $ from 'jquery';
import '../components/form-select.js';
import '../components/form-radio.js';
import '../components/search-bar.js';
import DataSource from './data-source.js';

const main = () => {
  const FIRST_ELEMENT = 0;
  const LOAD_PROVINCE_OPTIONS_EVENT = 'load-province-options';
  const LOAD_REGENCY_OPTIONS_EVENT = 'load-regency-options';
  const LOAD_DISTRICT_OPTIONS_EVENT = 'load-district-options';
  const LOAD_VILLAGE_OPTIONS_EVENT = 'load-village-options';

  const loadVillageOptions = async (district) => {
    const villageSelect = $('form-select#village').get(FIRST_ELEMENT);
    $(document).trigger(LOAD_VILLAGE_OPTIONS_EVENT);

    try {
      villageSelect
        .resetError()
        .setOptions(await DataSource.getVillagesByDistrict(district.code, 'name'))
        .setOptionValueKey('name')
        .setOnOptionClicked(() => {})
        .setEmptyOption('Select a village')
        .setDisabled(false);
    } catch (error) {
      villageSelect.setError(error.message);
    } finally {
      villageSelect.setOnLoad(false).render();
    }
  };

  const loadDistrictOptions = async (regency) => {
    const districtSelect = $('form-select#district').get(FIRST_ELEMENT);
    $(document).trigger(LOAD_DISTRICT_OPTIONS_EVENT);

    try {
      districtSelect
        .resetError()
        .setOptions(await DataSource.getDistrictsByRegency(regency.code, 'name'))
        .setOptionValueKey('name')
        .setOnOptionClicked(loadVillageOptions)
        .setEmptyOption('Select a district')
        .setDisabled(false);
    } catch (error) {
      districtSelect.setError(error.message);
    } finally {
      districtSelect.setOnLoad(false).render();
    }
  };

  const loadRegencyOptions = async (province) => {
    const regencySelect = $('form-select#regency').get(FIRST_ELEMENT);
    $(document).trigger(LOAD_REGENCY_OPTIONS_EVENT);

    try {
      regencySelect
        .resetError()
        .setOptions(await DataSource.getRegenciesByProvince(province.code, 'name'))
        .setOptionValueKey('name')
        .setOnOptionClicked(loadDistrictOptions)
        .setEmptyOption('Select a regency')
        .setDisabled(false);
    } catch (error) {
      regencySelect.setError(error.message);
    } finally {
      regencySelect.setOnLoad(false).render();
    }
  };

  const loadProvinceOptions = async () => {
    const provinceSelect = $('form-select#province').get(FIRST_ELEMENT);
    $(document).trigger(LOAD_PROVINCE_OPTIONS_EVENT);

    try {
      provinceSelect
        .resetError()
        .setOptions(await DataSource.getProvinces('name'))
        .setOptionValueKey('name')
        .setOnOptionClicked(loadRegencyOptions)
        .setEmptyOption('Select a province')
        .setDisabled(false);
    } catch (error) {
      provinceSelect.setError(error.message);
    } finally {
      provinceSelect.setOnLoad(false).render();
    }
  };

  const onSearchByName = async () => {
    const $searchInput = $('#searchByName');
    const area = $('form-radio[name="searchBy"][checked]').val();
    const nameValue = $searchInput.val();

    if (area !== '' && nameValue.length >= 3) {
      // Show loading spinner.
      $searchInput.get(FIRST_ELEMENT).resetError().setOnLoad().render();

      try {
        const results = await DataSource.getByName(nameValue, area, 'name');
        const $searchResults = $('#searchByNameResult').html('');

        results.forEach((result) => {
          $searchResults.append($('<p>').html(`${result.name} (${result.code})`));
        });
      } catch (error) {
        $searchInput.get(FIRST_ELEMENT).setError(error.message);
      } finally {
        // Disable loading spinner.
        $searchInput.get(FIRST_ELEMENT).setOnLoad(false).render();
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
