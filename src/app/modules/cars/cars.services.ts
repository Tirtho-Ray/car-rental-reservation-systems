import { TCars } from './cars.interface';
import { Cars } from './cars.model';

const createCarsIntoDB = async (payload: TCars) => {
  const cars = await Cars.create(payload);
  return cars;
};

const getAllCarsIntoDB = async () =>{
    const cars = await Cars.find();
    return cars;
}
const getSingleCarsIntoDB = async (id:string) =>{
    const cars = await Cars.findById(id);
    return cars;
}
const updateCarIntoDB = async (id: string, payload: Partial<TCars>) => {
    const car = await Cars.findByIdAndUpdate(id, payload, { new: true });
    return car;
  }
  
  const deleteCarIntoDB = async (id: string) => {
    const car = await Cars.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return car;
  };
export const CarsServices = {
  createCarsIntoDB,
  getAllCarsIntoDB,
  getSingleCarsIntoDB,
  updateCarIntoDB,
  deleteCarIntoDB
};
