import axios from "axios";
import { lensPath, view } from "ramda";

const dataLens = lensPath(["data"]); // Every response in Axios is in the .data node

export default () => {
  /**
   * @function asyncRequest
   * Base setup of Axios HTTP-request
   * @returns {Promise} a HTTP promise
   */
  const asyncRequest = axios.create({
    timeout: 20000
  });

  /**
   * @function getRequest
   * Base setup of HTTP-request Promise of type GET used to
   * make requests towards the composer api.
   * We want to normalize the data structure so from the response we pluck the data
   * (the releveant data from the api-response) and also the headers
   * which is used in the socket-based communication to seperate users.
   * NOTE: The data object which gets passed down to the client uses this data object
   * but gets passed from respective models .then({data}) => data
   * @param {Object} path the requested get path e.g api/v2/customers/email/{email}/token
   * @returns {Promise} a http promise of type GET
   */

  const getRequest = ({ path }) =>
    asyncRequest
      .get(path)
      .then(response => ({
        ...view(dataLens, response)
      }))
      .catch(error => {
        console.error("Det blev en error i getRequest => ", error);
        return error;
      });

  return {
    getRequest
  };
};
