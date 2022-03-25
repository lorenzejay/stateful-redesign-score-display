import { ReactElement, useState } from "react";
import { useRef } from "react";

type ModalProps = {
  modalName: string | ReactElement;
  children: React.ReactChild;
  bgColor?: string;
  contentWidth?: string;
  contentHeight?: string;
  // openModal: boolean;
  // setOpenModal: (x: boolean) => void;
};
const Modal = ({
  modalName,
  children,
  bgColor,
  contentWidth,
  contentHeight,
}: // openModal,
// setOpenModal,
ModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const closeModal = (e: any) => {
    if (ref.current === e.target) {
      setOpenModal(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={`p-3 rounded-lg text-white text-xl mx-auto`}
        style={{ backgroundColor: bgColor }}
      >
        {modalName}
      </button>
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black z-20 ${
          openModal ? "block" : "hidden"
        } flex `}
        style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        onClick={closeModal}
      >
        <div
          className={`w-full h-full flex items-center justify-center `}
          ref={ref}
        >
          <div
            className={`relative pb-20  m-auto opacity-100 overflow-y-auto p-3 z-20 rounded-md  ${
              contentHeight || "h-3/4"
            } ${contentWidth || "md:w-3/4"} min-w-1/2  `}
          >
            <button
              className="absolute right-1 top-1 outline-none"
              onClick={() => setOpenModal(false)}
            >
              X
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
