import axios from 'axios';

export const getAllBankAccounts = async () => {
  const response = await axios('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
  return response.data
}