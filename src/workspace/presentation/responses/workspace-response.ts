export interface WorkspaceResponse {
  id: string;
  name: string;
  description: string | null;
  deletedAt: Date | null;
}
