import express from 'express';
import validate from '../middlewares/validator.middleware.js';
import { userLoginValidator, userRegistrationValidator } from '../validators/user.validators.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { allUsers, getUser, logIn, logOut, removeUser, signUp, updateUser } from '../controllers/user.controllers.js';

const userRoutes = express.Router();

userRoutes.post('/create-user',validate(userRegistrationValidator), signUp)
userRoutes.post('/login', validate(userLoginValidator), logIn)
userRoutes.post('/logout', isLoggedIn, logOut)
userRoutes.get('/allusers/:id', allUsers)
userRoutes.get('/me',isLoggedIn, getUser)
userRoutes.post('/remove',isLoggedIn, removeUser)
userRoutes.patch('/update/:id',isLoggedIn, updateUser)


export default userRoutes;