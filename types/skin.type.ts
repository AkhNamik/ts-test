export interface Exterior {
    title: string;
    css_color: string;
}

export interface Skin {
    id: string;
    name: string;
    image: string;
    price: number;
    exterior?: Exterior;
}

export interface ApiResponse {
    data: Skin[];
}