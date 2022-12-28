const AuthHeader={headers: {"Authorization" : `Bearer ${localStorage.getItem('auth-token')}`} }

export default AuthHeader