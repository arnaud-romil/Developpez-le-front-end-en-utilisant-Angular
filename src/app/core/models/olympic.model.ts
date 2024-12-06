import { IParticipation } from "./participation.model";

export interface IOlympic {
    id: number;
    country: string;
    participations: IParticipation[];
}
