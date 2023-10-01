import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";

import { UserDto } from "<%= dtosName %>";

export interface ICreateUserCommandOptions {
  readonly payload: {
    readonly name: string;
    readonly email: string;
  };
}

@Injectable()
export class CreateUserCommand {
  public constructor(private readonly tracingService: TracingService) {}

  public execute(options: ICreateUserCommandOptions): Promise<UserDto> {
    return this.tracingService.traceAsyncFunction(
      CreateUserCommand.name,
      () => {
        const user: UserDto = {
          userId: "1",
          name: options.payload.name,
          email: options.payload.email,
          userVersion: 1,
        };

        return Promise.resolve(user);
      },
    );
  }
}
