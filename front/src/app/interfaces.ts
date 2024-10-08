export interface Character {
    _id: number;
    name: string;
    image: string;
    status: string;
}

export interface ModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}


export interface CharacterFull {
    _id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    created: string;
  }