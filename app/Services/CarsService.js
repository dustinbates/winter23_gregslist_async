import { appState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { sandboxApi } from "./AxiosService.js"

class CarsService {
  async editCar(formData, carId) {
    const res = await sandboxApi.put(`/cars/${carId}`, formData)
    console.log('[edit car]', res.data);
    let oldCarIndex = appState.cars.findIndex(c => c.id == carId)
    appState.cars.splice(oldCarIndex, 1, new Car(res.data))
    appState.emit('cars')
  }

  async removeCar(carId) {
    const res = await sandboxApi.delete('/cars/' + carId)
    console.log('[removing car]', res.data);
    appState.cars = appState.cars.filter(car => car.id != carId)
  }

  async createCar(formData) {
    // NOTE                       VVV post request will create data on our api (hopefully)
    const res = await sandboxApi.post('/cars', formData)
    console.log('[create car]', res.data);
    let actualCar = new Car(res.data)
    appState.cars.push(actualCar)
    appState.emit('cars')
  }


  async getCars() {
    const response = await sandboxApi.get('/cars')
    // NOTE always log the response data
    // console.log('[get cars]', response.data)
    const newArray = response.data.map(car => new Car(car))
    appState.cars = newArray
    // console.log(appState.cars);
  }

}

export const carsService = new CarsService()