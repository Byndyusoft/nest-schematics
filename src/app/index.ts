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

import path from "path";

import { strings } from "@angular-devkit/core";
import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  template,
  url,
} from "@angular-devkit/schematics";

import { addDefaultYarnTasks } from "../utils";

import { AppOptions } from "./options";

export const main = (options: AppOptions): Rule => {
  const targetDirectory = path.join("./", options.name);

  return chain([
    copyFiles(options, targetDirectory),
    addDefaultYarnTasks(targetDirectory),
  ]);
};

const copyFiles = (options: AppOptions, targetDirectory: string): Rule => {
  return (tree, context) => {
    const source = apply(url("./files"), [
      template({
        ...strings,
        ...options,
      }),
      move(targetDirectory),
    ]);

    return mergeWith(source)(tree, context);
  };
};
