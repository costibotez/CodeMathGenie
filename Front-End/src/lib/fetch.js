import constants from "../constants";

/**
 * makeServerRequest: a generic POST request handler to our backend
 * @param {Object} data JSON data passed to endpoint; stringified into body of request
 * @param {string} endpoint API endpoint to hit, rooted at ${constants.SERVER_URL}/
 * @param {string} method HTTP method to make the request, defaults to post
 */

const makeServerRequest = (data, endpoint, method = "post") => {
  let body = "";

  // if the passed-in data object has at least 1 key, set the body to the stringified data object
  try {
    if (Object.keys(data).length) {
      body = JSON.stringify(data);
    }
  } catch (err) {
    console.log(err);
    return;
  }

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": 'Bearer ' + localStorage.getItem('user')
    },
    body,
  };

  return fetch(`${constants.SERVER_URL}/${endpoint}`, options);
};
/**---------getUserData--------
 * fetches object from server containg information about user at uid
 * includes users' projects in json if includePrograms is true
 * returned json will be of the form
 * {
 *   userdata:{
 *    projects: json of each project
 *          each program is keyed by the program name and its value is a json containing at
 *          two keys. code is the code and language is the language the code is written in
 *    role: role of user
 *   }
 * }
 */
export const getUserData = uid => {
  return makeServerRequest({ uid: uid }, `getUserData/${uid}`);
};
export const getUserDataByName = username => {
  return makeServerRequest({ username: username }, `getUserDataByName/${username}`);
};
export const setUserData = (uid, displayName, email, phoneNumber, photoURL) => {
  return makeServerRequest(
    { uid: uid, name: displayName, email: email, phoneNumber: phoneNumber, photoURL: photoURL },
    `setUserData/${uid}`,
  );
};
export const createProject = (uid = "") => {
  return makeServerRequest("", `createProject/${uid}`);
};
export const saveTempProject = (uid, files, codes, langs, ) => {
  return makeServerRequest({ files: files, codes: codes, langs: langs }, `saveTempProject/${uid}`);
};
export const setProjectPublic = (pid, isPublic) => {
  return makeServerRequest({ isPublic: isPublic }, `setProjectPublic/${pid}`);
};
export const saveHistory = (uid, pid, name, files, codes, langs, isPublic) => {
  return makeServerRequest(
    { projectID: pid, name: name, files: files, codes: codes, langs: langs, isPublic: isPublic },
    `saveHistory/${uid}`,
  );
};
export const getHistoryData = (pid, version) => {
  return makeServerRequest({ projectID: pid, version: version }, `getHistoryData`);
};
export const loadProject = pid => {
  return makeServerRequest({ projectID: pid }, `loadProject`);
};
export const getUsersList = () => {
  return makeServerRequest({}, `getUsersList`);
};
export const setCertainUserData = userData => {
  return makeServerRequest({ userData: userData }, `setCertainUserData`);
};
