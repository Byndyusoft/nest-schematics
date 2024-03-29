import { makeDtoFactory } from "@byndyusoft/dto-factory";
import _ from "lodash";

import { CreateUserDto } from "<%= dtosName %>";

import { userDtoFactory } from "../common";

export const createUserDtoFactory = makeDtoFactory<CreateUserDto>(() =>
  _.omit(userDtoFactory.build(), "userId", "userVersion"),
);
