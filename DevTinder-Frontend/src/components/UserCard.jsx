import React from 'react'

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  // console.log(user, "inside the userCARD component")
  return (
    <div className="card bg-base-200 w-96 shadow-sm max-h-[600px] overflow-hidden">
      <figure className="h-90 overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age && gender && `Age: ${age}  Gender: ${gender}`}</p>
        <p>{about}</p>
        <div className="card-actions justify-center my-4 gap-6">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Send Request</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
