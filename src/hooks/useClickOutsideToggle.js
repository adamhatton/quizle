import { useEffect, useRef, useState } from 'react';

/* Collapse the referenced component when clicking on something else.
Taken from Code Institute 'Moments' walkthrough project */
const useClickOutsideToggle = () => {
  const ref = useRef(null);

  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)){
        setExpanded(false);
      }
    };
  
    document.addEventListener('mouseup', handleClickOutside);
  
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;