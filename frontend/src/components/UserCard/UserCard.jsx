import React from 'react'

const UserCard = ({image, fullName, role}) => {
  return (
    <div className='flex'>
      <img src={image} className=''/>
      <div>
        <p>{fullName}</p>
        <p>{role}</p>
      </div>
    </div>
  )
}

export default UserCard
