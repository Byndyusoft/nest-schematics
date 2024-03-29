import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { faker } from "@faker-js/faker";

import { UserOutboxDto } from "<%= dtosName %>";

import { userDtoFactory } from "./userDtoFactory";

export const userOutboxDtoFactory = makeDtoFactory<UserOutboxDto>(() => ({
  ...userDtoFactory.build(),

  deletedAt: faker.date.soon(),
}));
