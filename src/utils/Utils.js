import { axiosReq } from "../api/axiosDefaults";
import Entertainment from '../assets/entertainment.png';
import General from '../assets/general.png';
import Music from '../assets/music.png';
import Sport from '../assets/sport.png';

/* fetchMoreData taken from Code Institute 'Moments' walkthrough project */
// Gets next set of resources for use with InfiniteScroll component
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
    } catch (err) {}
  };

  // Return the image to use in a QuizTile
  export const setImageSource = (quizCategory) => {
    switch (quizCategory) {
      case 'sport': 
        return Sport
      case 'music':
        return Music
      case 'entertainment':
        return Entertainment
      case 'general':
        return General
      default:
        return General
    }
  }

  // Return the alt text to use in a QuizTile
  export const setImageAlt = (quizCategory) => {
    switch (quizCategory) {
      case 'sport': 
        return 'A simple icon of a football pitch'
      case 'music':
        return 'A simple icon of a pair of headphones'
      case 'entertainment':
        return "A simple icon of a director's clapperboard"
      case 'general':
        return 'A simple icon of a question mark'
      default:
        return 'A simple icon of a question mark'
    }
  }