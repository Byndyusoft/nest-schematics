import { makeDtoFactory } from "@byndyusoft/dto-factory";
import _ from "lodash";

import { QueryWithUserVersionDto } from "<%= dtosName %>";

import { userDtoFactory } from "./userDtoFactory";

export const queryWithUserVersionDtoFactory =
  makeDtoFactory<QueryWithUserVersionDto>(() =>
    _.pick(userDtoFactory.build(), "userVersion"),
  );
