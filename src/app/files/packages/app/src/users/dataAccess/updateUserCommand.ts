import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";

import { UserDto } from "<%= dtosName %>";

export interface IUpdateUserCommandOptions {
  readonly userId: string;
  readonly userVersion: number;

  readonly payload: {
    readonly name?: string;
    readonly email?: string;
    readonly deletedAt?: Date;
  };
}

@Injectable()
export class UpdateUserCommand {
  public constructor(private readonly tracingService: TracingService) {}

  public execute(options: IUpdateUserCommandOptions): Promise<UserDto> {
    return this.tracingService.traceAsyncFunction(
      UpdateUserCommand.name,
      () => {
        const user: UserDto = {
          userId: options.userId,
          name: options.payload.name ?? `user${options.userId}`,
          email: options.payload.email ?? `user${options.userId}@example.com`,
          userVersion: options.userVersion + 1,
        };

        return Promise.resolve(user);
      },
    );
  }
}
