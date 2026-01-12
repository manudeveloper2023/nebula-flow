export type AccessValidator = (
  subject: string,
  requiredRoles: string[]
) => Promise<boolean>;
