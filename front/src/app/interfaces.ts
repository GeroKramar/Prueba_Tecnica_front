export interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
}

export interface ModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}
