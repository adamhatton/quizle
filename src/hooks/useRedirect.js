import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

/* Redirect users from pages they shouldn't access based on their login status.
Taken from Code Institute 'Moments' walkthrough project */
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        if (userAuthStatus === 'loggedIn') {
          history.push('/');
        }
      } catch(err) {
        if (userAuthStatus === 'loggedOut') {
          history.push('/');
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};