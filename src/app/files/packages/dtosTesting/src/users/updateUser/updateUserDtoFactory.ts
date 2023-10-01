import { makeDtoFactory } from "@byndyusoft/dto-factory";

import { UpdateUserDto } from "<%= dtosName %>";

import { createUserDtoFactory } from "../createUser";

export const updateUserDtoFactory = makeDtoFactory<UpdateUserDto>(() =>
  createUserDtoFactory.build(),
);
