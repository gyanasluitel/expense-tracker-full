export interface CreateRoleRequest {
    name: string;
    description: string;
    permissions?: string[]; // Array of permissions as strings
}