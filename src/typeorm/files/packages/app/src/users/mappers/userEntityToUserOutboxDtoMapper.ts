import { Injectable } from "@nestjs/common";

import { UserOutboxDto } from "<%= dtosName %>";
import { UserEntity } from "<%= entitiesName %>";

@Injectable()
export class UserEntityToUserOutboxDtoMapper {
  public map(value: UserEntity): UserOutboxDto {
    return {
      userId: value.userId,
      name: value.name,
      email: value.email,
      userVersion: value.userVersion,
      deletedAt: value.deletedAt ?? undefined,
    };
  }
}
