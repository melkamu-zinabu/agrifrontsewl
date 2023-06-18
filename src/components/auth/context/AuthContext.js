import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

// user: {
//   id: action.payload.id,
//   name: action.payload.name,
//   email: action.payload.email
// }
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

 useEffect(() => {
   

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
        // update the auth context
        dispatch({ type: 'LOGIN', payload: user }) 
      console.log(user);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }
}, []);


  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}