import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";
// const baseUrl = "https://fullstackhy-part-3.onrender.com/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export { getAll, createPerson, deletePerson,updatePerson };
