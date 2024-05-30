import { useEffect, useState } from "react"
import { MainLayout } from "../../layout/MainLayout"
import { HomeContainer } from "./style"
import { Vehicle, VehicleResponse } from "../../interface/vehicles.model";
import { Modal } from "../../components/Modal/Modal";
import { ModalAddUser } from "../../components/ModalAddUser/ModalAddUser";
import { TrashIcon } from "../../components/Icon/TrashIcon";
import { Loader } from "../../components/Loader/Loader";
import { formatPatente } from "../../hooks/patentes";


export type HandleModalType = () => void;

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [selledVehicles, setSelledVehicles] = useState<Vehicle[]>([]);

  const callVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getSelled`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: VehicleResponse = await response.json();
      setSelledVehicles(data.result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setSelledVehicles([]);
    }
  }

  useEffect(() => {
    callVehicles();
  }, []);

  const handleModal: HandleModalType = () => {
    setModalStatus(!modalStatus);
  }

  const deleteRegister = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      });
      if(response.status === 200) {
        callVehicles();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <MainLayout>
      {isLoading && <Loader />}
      <HomeContainer>
        <h2>Listado de vehiculos</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam perspiciatis dicta voluptatum cum ratione fugit nesciunt fuga? Iste minus neque voluptas placeat esse cum in atque. Voluptatibus natus quia optio!</p>
        <button className="addVehicle" onClick={handleModal}>Agregar Vehiculo Vendido</button>
        <div className="tableSelledVehicles">
          <table>
            <thead>
              <tr>
                <th>Nombre Vendedor</th>
                <th>Rut Vendedor</th>
                <th>Patente Vehiculo</th>
                <th>Marca Vehiculo</th>
                <th>Modelo Vehiculo</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {selledVehicles.length === 0 ? (
                <tr><td colSpan={6}>No hay vehiculos vendidos</td></tr>
              ) : (
                selledVehicles.map((vehicle: Vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{`${vehicle.vendedor.nombre} ${vehicle.vendedor.apellido}`}</td>
                    <td>{vehicle.vendedor.rut}</td>
                    <td>{formatPatente(vehicle.patente)}</td>
                    <td>{vehicle.marca.nombre}</td>
                    <td>{vehicle.modelo.nombre}</td>
                    <td><div onClick={() => deleteRegister(vehicle.id)}><TrashIcon color="blue"/></div></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>  
        </div>
      </HomeContainer>
      {modalStatus && (
        <Modal handleModal={handleModal} title={"Añadir vehiculo vendido"} >
          <ModalAddUser handleModal={handleModal} refetch={callVehicles} />
        </Modal>
      )}
    </MainLayout>
  )
}
