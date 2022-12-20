const AuthHeader={headers: {"Authorization" : `Bearer ${localStorage.getItem('userAuthToken')}`} }

export default AuthHeader