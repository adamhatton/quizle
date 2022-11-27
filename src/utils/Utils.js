import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";
import Entertainment from '../assets/entertainment.webp';
import General from '../assets/general.webp';
import Music from '../assets/music.webp';
import Sport from '../assets/sport.webp';

/* fetchMoreData taken from Code Institute 'Moments' walkthrough project.
Gets next set of resources for use with InfiniteScroll component */
export const fetchMoreData = async (resource, setResource) => {
    try {
      const { data } = await axiosReq.get(resource.next);
      setResource((prevResource) => ({
        ...prevResource,
        next: data.next,
        results: data.results.reduce((acc, cur) => {
          return acc.some((accResult) => accResult.id === cur.id)
            ? acc
            : [...acc, cur];
        }, prevResource.results),
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  // Return the image to use in a QuizTile
  // Images taken from Pixabay user IO-Images https://pixabay.com/users/io-images-1096650/
  export const setImageSource = (quizCategory) => {
    switch (quizCategory) {
      case 'sport': 
        return Sport;
      case 'music':
        return Music;
      case 'entertainment':
        return Entertainment;
      case 'general':
        return General;
      default:
        return General;
    }
  };

  // Return the alt text to use in a QuizTile
  export const setImageAlt = (quizCategory) => {
    switch (quizCategory) {
      case 'sport': 
        return 'A simple icon of a football pitch';
      case 'music':
        return 'A simple icon of a pair of headphones';
      case 'entertainment':
        return "A simple icon of a director's clapperboard";
      case 'general':
        return 'A simple icon of a question mark';
      default:
        return 'A simple icon of a question mark';
    }
  };

  // Utility functions to ensure token refresh is only requested when necessary
  export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
  };
  
  export const shouldRefreshToken = () => {
    return !!localStorage.getItem('refreshTokenTimestamp');
  };
  
  export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp');
  };