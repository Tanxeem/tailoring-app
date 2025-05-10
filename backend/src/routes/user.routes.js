import express from 'express';
import validate from '../middlewares/validator.middleware.js';
import { changePasswordValidator, userLoginValidator, userRegistrationValidator } from '../validators/user.validators.js';
import { isAdmin, isLoggedIn } from '../middlewares/auth.middleware.js';
import { allUsers, getUser, logIn, logOut, removeUser, signUp, updatePassword, updateUser } from '../controllers/user.controllers.js';

const userRoutes = express.Router();

userRoutes.post('/create-user', validate(userRegistrationValidator), signUp)
userRoutes.post('/login', validate(userLoginValidator), logIn)
userRoutes.post('/logout', isLoggedIn, logOut)
userRoutes.get('/allusers',isLoggedIn, allUsers)
userRoutes.get('/me',isLoggedIn, getUser)
userRoutes.delete('/remove/:id',isLoggedIn,isAdmin, removeUser)
userRoutes.patch('/update/:id',isLoggedIn,isAdmin, updateUser)
userRoutes.put('/updatepassword/:id',isLoggedIn,isAdmin, validate(changePasswordValidator), updatePassword)


export default userRoutes;