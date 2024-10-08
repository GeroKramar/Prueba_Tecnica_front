import React from 'react';
import { ModalProps } from '@/app/interfaces';

const Modal: React.FC<ModalProps> = ({ show, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg">
        <h2 className="text-xl mb-4">Crear nuevo personaje</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block font-bold mb-1">
              Estado
            </label>
            <select id="status" className="w-full px-3 py-2 border rounded">
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;