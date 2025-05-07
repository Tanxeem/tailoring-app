import express from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { allClients, createMeasurement, removeClient, updateClient } from '../controllers/admin.controllers.js';

const adminRoutes = express.Router();

adminRoutes.post('/create-measurement',isLoggedIn, createMeasurement)
adminRoutes.get('/client-details', isLoggedIn, allClients)
adminRoutes.delete('/remove/:id',isLoggedIn, removeClient)
adminRoutes.put('/update/:id',isLoggedIn, updateClient)


export default adminRoutes;