import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from 'react-router-dom';
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

export const MoreDropdown = ({item, handleEdit, handleDelete}) => {
  return (
    <Dropdown className='ml-auto pt-1' drop='left'>
        <Dropdown.Toggle as={ThreeDots} />

        <Dropdown.Menu className='text-right'>
            <Dropdown.Item
              onClick={handleEdit} 
              aria-label="edit"
            >
              Edit {item}
              <i className='fas fa-marker'></i>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleDelete}
              aria-label="delete"
            >
              Delete {item}
              <i className='fas fa-trash'></i>
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className='text-right'>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          Edit Profile
          <i className='fas fa-marker'></i>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          Change Username
          <i className="fas fa-user-circle"></i>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          Change Password
          <i className="fas fa-lock-open"></i>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}