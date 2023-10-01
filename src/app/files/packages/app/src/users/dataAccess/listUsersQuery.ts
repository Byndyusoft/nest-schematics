import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";

import { UserDto } from "<%= dtosName %>";

export interface IListUsersQueryOptions {
  readonly userIds?: string[];
  readonly names?: string[];
  readonly emails?: string[];
  readonly pageSize?: number;
  readonly pageToken?: number;
}

@Injectable()
export class ListUsersQuery {
  public constructor(private readonly tracingService: TracingService) {}

  public ask(options: IListUsersQueryOptions): Promise<UserDto[]> {
    return this.tracingService.traceAsyncFunction(ListUsersQuery.name, () => {
      const users: UserDto[] = [
        {
          userId: "1",
          name: options.names?.[0] ?? "name",
          email: options.emails?.[0] ?? "email",
          userVersion: 1,
        },
      ];

      return Promise.resolve(users);
    });
  }
}
