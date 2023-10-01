/*
 * Copyright 2023 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Rule, TaskId } from "@angular-devkit/schematics";
import { newTask } from "schematics-task";

export interface ShellTaskCommand {
  readonly command: string;
  readonly args: readonly string[];
}

export const addShellTasks = (
  cwd: string,
  ...commands: readonly ShellTaskCommand[]
): Rule => {
  return (tree, context) => {
    const taskIds: TaskId[] = [];

    for (const { command, args } of commands) {
      const taskId = context.addTask(
        newTask(async () => {
          context.logger.info(`${command} ${args.join(" ")}`);

          const { execa } = await import("execa");
          await execa(command, args, {
            cwd,
            env: {
              NODE_OPTIONS: undefined, // clear NODE_OPTIONS from extra loaders
            },
            stdio: "inherit",
          });
        }),
        taskIds,
      );

      taskIds.push(taskId);
    }

    return tree;
  };
};
