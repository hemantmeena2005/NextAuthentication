import React from 'react'

const UserProfilePage = ({params} : any) => {
  return (
    <div>
        <h1>UserProfile</h1>
        <hr />
        <p className='text-4xl'>profile page  : <span className='text-red-400'>{params.id}</span></p>
    </div>
  )
}

export default UserProfilePage