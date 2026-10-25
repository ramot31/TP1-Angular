/** Session sauvegardée localement après une connexion réussie. */
export interface AuthenticatedUser {
  id: number;
  email: string;
  token: string;
}
