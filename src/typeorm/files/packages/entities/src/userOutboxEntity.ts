import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserOutboxDto } from "<%= dtosName %>";

@Entity({
  name: "users_outbox",
})
export class UserOutboxEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id",
  })
  public readonly id!: string;

  @Column({
    type: "jsonb",
    name: "entity",
  })
  public readonly entity!: UserOutboxDto;

  @Column({
    type: "timestamptz",
    name: "timestamp",
  })
  public readonly timestamp!: Date;
}
