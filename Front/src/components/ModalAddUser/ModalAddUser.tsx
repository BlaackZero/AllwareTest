import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Seller, SellerResponse } from "../../interface/seller.model"
import { Brand, BrandResponse } from "../../interface/brands.model";
import { EnviarButton, FormSection, Labels } from "./style";

type FormValues = {
  rut: string;
  vendedor: number;
  patente: string;
  marca: number;
  modelo: number;
  precio: number;
}

interface ModalAddUserProps {
  handleModal: () => void;
  refetch: () => void;
}

export const ModalAddUser = ({ handleModal, refetch }: ModalAddUserProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

  const CallSellers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}sellers/getSellers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: SellerResponse = await response.json();
      setSellers(data.result)
    } catch (error) {
      console.log(error);
      setSellers([]);
    }
  }

  const CallVehiclesType = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}brands/getModelsBrands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: BrandResponse = await response.json();
      setBrands(data.result);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    CallSellers();
    CallVehiclesType();
  }, [])


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/addVehicle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
        refetch();
        handleModal();
        setIsLoading(false);
      }

    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }

  }

  const handleSelectedSeller = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const seller = sellers.find(seller => seller.id === parseInt(e.target.value));
    if (seller) {
      setValue("rut", seller.rut);
    }
  }

  const handleSelectedBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(parseInt(e.target.value));
  }

  return (
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sapiente modi cum atque eveniet. Nostrum.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <h4>Datos del vendedor:</h4>
          <div className="separador"></div>
          <Labels>
            <label htmlFor="vendedor">
              <p>Nombre Vendedor <span>*</span></p>
              <select {...register("vendedor", { required: true })} onChange={handleSelectedSeller}>
                <option value=''>Seleccione un vendedor</option>
                {sellers.map((seller: Seller) => (
                  <option key={seller.id} value={seller.id}>{seller.nombre} {seller.apellido}</option>
                ))}
              </select>
              {errors.vendedor && <h5>Este campo es requerido</h5>}
            </label>
            <label htmlFor="rut">
              <p>Rut Vendedor <span>*</span></p>
              <input type="text" {...register("rut")} disabled />
            </label>
          </Labels>
        </FormSection>
        <FormSection>
          <div className="separador"></div>
          <h4>Datos del vehiculo</h4>
          <Labels>
            <label htmlFor="patente">
              <p>Patente del vehiculo <span>*</span></p>
              <input
                placeholder="Ej: AB1234"
                minLength={6}
                maxLength={6}
                type="text"
                {...register("patente", { required: true, pattern: /^[a-zA-Z0-9]*$/ })}
              />
              {errors.patente && <h5>Tienes que cumplir con el formato</h5>}
            </label>
            <label htmlFor="marca">
              <p>Marca del vehiculo <span>*</span></p>
              <select {...register("marca", { required: true })} onChange={handleSelectedBrand}>
                <option value=''>Seleccione marca</option>
                {brands.map((brand: Brand) => (
                  <option key={brand.id} value={brand.id}>{brand.nombre}</option>
                ))}
              </select>
              {errors.marca && <h5>Este campo es requerido</h5>}
            </label>
            <label htmlFor="modelo">
              <p>Modelo del vehiculo <span>*</span></p>
              <select {...register("modelo", { required: true })}>
                <option value=''>Seleccione modelo</option>
                {selectedBrand !== null &&
                  brands.find(brand => brand.id === selectedBrand)?.modelos.map(model => (
                    <option key={model.id} value={model.id}>{model.nombre}</option>
                  ))}
              </select>
              {errors.modelo && <h5>Este campo es requerido</h5>}
            </label>
            <label htmlFor="precio">
              <p>Precio del vehiculo <span>*</span></p>
              <input min={1} type="number" {...register("precio", { required: true })} />
              {errors.precio && <h5>Este campo es requerido</h5>}
            </label>
          </Labels>
        </FormSection>
        <EnviarButton className='primary' type='submit' disabled={isLoading}>
          {isLoading ? `Enviado..` : `Enviar`}
        </EnviarButton>
      </form>
    </div>
  )
}
