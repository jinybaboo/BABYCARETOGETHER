import { useQuery } from "react-query";
import axios from 'axios'


export const getDataExample = async (data:object) => {
  console.log(data)
  const { data:result } = await axios.get(`https://app.orangeboard.kr/v1/corps/screening?page=1&perPage=6`);
  return result;
};



