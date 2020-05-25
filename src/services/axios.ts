import axios from 'axios';

const METHOD_GET = 'get';
const BASE_URL = 'https://covid-193.p.rapidapi.com/';
const HEADERS = {
  'content-type': 'application/octet-stream',
  'x-rapidapi-host': 'covid-193.p.rapidapi.com',
  'x-rapidapi-key': '6009a1a2e2msh0725eff496f16cfp1ec1bbjsn5c445a9a071d',
};

const req = (endpoint: string): Promise<any> => {
  return axios({
    method: METHOD_GET,
    url: BASE_URL + endpoint,
    headers: HEADERS,
  });
};

const getCountryList = (): Promise<any> => {
  return req('countries');
};

const getCountriesStats = (): Promise<any> => {
  return req('statistics');
};

export default {
  getCountryList,
  getCountriesStats,
};
