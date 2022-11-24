import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/Utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/* CurrentUser context provider, CurrentUser custom context hook, and
axios interceptor code taken from Code Institute 'Moments' walkthrough project */ 
export const CurrentUserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // Get current user and set currentUser context
  const handleMount = async () => {
    try {
      const {data} = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
      } catch(err){
        console.log(err);
      }
  };
    
  useEffect(() => {
    handleMount();
  }, []);

  // Axios interceptors
  useMemo(() => {
    /* Request interceptor. Attempt token refresh before making post 
    request, if refresh fails then set user to Null */
    axiosReq.interceptors.request.use(
      async(config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    /* Response interceptor. Attempt token refresh if 401 error received, 
    if refresh fails then set user to Null */
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401){
          try{
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch(err){
            setCurrentUser(prevCurrentUser => {
              if (prevCurrentUser){
                history.push('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return(
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
          {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};