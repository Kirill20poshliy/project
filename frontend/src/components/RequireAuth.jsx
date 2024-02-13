import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../store/adminSlice'


export default function RequireAuth({children}) {

    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return(
        token
        ? children
        : <Navigate to='/' state={{from: location}} replace/>
    )

}