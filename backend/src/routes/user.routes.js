import express from 'express';
import validate from '../middlewares/validator.middleware.js';
import { changePasswordValidator, userLoginValidator, userRegistrationValidator } from '../validators/user.validators.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { allUsers, getUser, logIn, logOut, removeUser, signUp, updatePassword, updateUser } from '../controllers/user.controllers.js';

const userRoutes = express.Router();

userRoutes.post('/create-user',validate(userRegistrationValidator), signUp)
userRoutes.post('/login', validate(userLoginValidator), logIn)
userRoutes.post('/logout', isLoggedIn, logOut)
userRoutes.get('/allusers', allUsers)
userRoutes.get('/me',isLoggedIn, getUser)
userRoutes.delete('/remove/:id',isLoggedIn, removeUser)
userRoutes.patch('/update/:id',isLoggedIn, updateUser)
userRoutes.put('/updatepassword/:id',isLoggedIn, validate(changePasswordValidator), updatePassword)


export default userRoutes;