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

import { Rule } from "@angular-devkit/schematics";

import { addShellTasks } from "./addShellTasks";

export const addDefaultYarnTasks = (cwd: string): Rule => {
  return addShellTasks(
    cwd,
    {
      command: "yarn",
      args: ["install"],
    },
    {
      command: "yarn",
      args: ["run", "build"],
    },
    {
      command: "yarn",
      args: ["run", "lint:fix"],
    },
  );
};
