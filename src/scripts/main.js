import $ from 'jquery';
import '../components/form-select.js';
import DataSource from './data-source.js';

const main = () => {
  const formSelectProvince = $('form-select#province')[0];

  const renderProvinceOptions = (provinces) => {
    formSelectProvince.emptyOption = 'Select a province';
    formSelectProvince.disabled = false;
    formSelectProvince
      .setOptions(provinces)
      .setOptionValueKey('name')
      .setOnOptionClicked((province) => {
        // TODO: Render the regency options.
      })
      .setOnEmptyOptionClicked(() => {
        // TODO: Reset the regency options.
      })
      .render();
  };

  const renderProvinceOptionsError = (message) => {
    // TODO: Set error in province options.
    console.error(message);
  };

  DataSource.getProvinces('name')
    .then(renderProvinceOptions)
    .catch(renderProvinceOptionsError);
};

export default main;
