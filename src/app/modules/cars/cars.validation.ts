import { z } from 'zod';
import { Features } from './cars.constant';

const CarValidationSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }).max(20, { message: 'Name must be at most 20 characters' }),
    description: z.string().min(5, { message: 'Description must be at least 5 characters' }).max(150, { message: 'Description must be at most 150 characters' }),
    color: z.string().nonempty({ message: 'Color is required' }),
    isElectric: z.boolean(),
    features: z.array(z.enum([...Features] as [string, ...string[]])),
    pricePerHour: z.number().positive({ message: 'Price per hour must be a positive number' }),
    status: z.enum(['available', 'unavailable']).default('available'),
    isDeleted: z.boolean().default(false),
});
const UpdateCarValidationSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }).max(20, { message: 'Name must be at most 20 characters' }).optional(),
    description: z.string().min(5, { message: 'Description must be at least 5 characters' }).max(150, { message: 'Description must be at most 150 characters' }).optional(),
    color: z.string().nonempty({ message: 'Color is required' }).optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.enum([...Features] as [string, ...string[]])).optional(),
    pricePerHour: z.number().positive({ message: 'Price per hour must be a positive number' }).optional(),
    status: z.enum(['available', 'unavailable']).default('available').optional(),
    isDeleted: z.boolean().default(false),
});

export const CarsValidation = {
    CarValidationSchema,
    UpdateCarValidationSchema
}
