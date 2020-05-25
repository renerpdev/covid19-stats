import _ from 'lodash';
import CountriesJson from '../assets/countries.json';

const getCountryCode = (countryName: string) => {
  const country = _.find(
    CountriesJson,
    (e) => e.name.toLowerCase().indexOf(countryName.toLowerCase()) >= 0
  );
  return !_.isNil(country) ? country.code : null;
};

const getImgUrl = (name: string) => {
  const code = getCountryCode(name);
  return code ? `https://www.countryflags.io/${code}/flat/48.png` : '';
};

const formatCountryName = (name: string) => {
  return name.replace(/[-]/g, ' ');
};

export default {
  getImgUrl,
  getCountryCode,
  formatCountryName,
};
