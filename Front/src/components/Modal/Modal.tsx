import { HandleModalType } from "../../pages/Home/HomePage";
import { ModalContainer } from "./style"

type ModalProps = {
    handleModal: HandleModalType;
    title?: string;
    children: React.ReactNode;
  };


export const Modal = ({handleModal, children, title}: ModalProps) => {
  return (
    <ModalContainer>
        <div className="content">
            <div className="titleModal">
                <p><strong>{title}</strong></p>
                <button onClick={handleModal}>X</button>
            </div>
            {children}
        </div>
    </ModalContainer>
  )
}
