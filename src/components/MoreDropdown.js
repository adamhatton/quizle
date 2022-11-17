import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/MoreDropdown.module.css'

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

function MoreDropdown({item}) {
  return (
    <Dropdown className='ml-auto pt-1' drop='left'>
        <Dropdown.Toggle as={ThreeDots} />

        <Dropdown.Menu className='text-right'>
            <Dropdown.Item 
              aria-label="edit"
            >
              Edit {item}
              <i className='fas fa-marker'></i>
            </Dropdown.Item>
            <Dropdown.Item
              aria-label="delete"
            >
              Delete {item}
              <i className='fas fa-trash'></i>
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default MoreDropdown