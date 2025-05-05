import {z} from 'zod';

const userRegistrationValidator = z.object({
    name: z
    .string()
    .min(3, {message: "name must be at least 3 characters long"})
    .max(20, {message: "name must be at most 20 characters long"})
    .max(20)
    .trim(),

    email: z
    .string()
    .email()
    .trim(),

    password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
})

const userLoginValidator = z.object({
    
    email: z
    .string()
    .email()
    .trim(),

    password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
   
})

const changePasswordValidator = z.object({
    password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),

    confirmPassword: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
   
})


export {userRegistrationValidator, userLoginValidator, changePasswordValidator}