import type { UserGetPayload } from "../../../../../generated/prisma/models";

export type UserWithRoles = UserGetPayload<{
  include: {
    roles: true;
  };
}>;
