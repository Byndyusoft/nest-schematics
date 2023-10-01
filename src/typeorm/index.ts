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

import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  strings,
  template,
  url,
} from "@angular-devkit/schematics";
import { NodeDependencyType } from "@schematics/angular/utility/dependencies";

import {
  addDefaultYarnTasks,
  addPackageJsonDependencies,
  addPackageJsonScripts,
} from "../utils";

import { TypeormOptions } from "./options";

export const main = (options: TypeormOptions): Rule => {
  return chain([
    applyPatches(options),
    copyFiles(options),
    addDefaultYarnTasks("./"),
  ]);
};

const applyPatches = (options: TypeormOptions): Rule => {
  return (tree) => {
    addPackageJsonScripts(
      tree,
      "./package.json",
      {
        name: "start:migrator",
        value: "yarn packages/migrator run start",
      },
      {
        name: "start:migrator:prod",
        value: "yarn packages/migrator run start:prod",
      },
    );

    addPackageJsonDependencies(
      tree,
      "./packages/app/package.json",
      {
        type: NodeDependencyType.Default,
        name: "@nestjs/typeorm",
        version: "9.0.1",
      },
      {
        type: NodeDependencyType.Default,
        name: "typeorm",
        version: "0.3.12",
      },
      {
        type: NodeDependencyType.Default,
        name: "pg",
        version: "8.10.0",
      },
      {
        type: NodeDependencyType.Dev,
        name: "@types/pg",
        version: "8.6.6",
      },
      {
        type: NodeDependencyType.Default,
        name: options.entitiesName,
        version: "workspace:*",
      },
    );

    return tree;
  };
};

const copyFiles = (options: TypeormOptions): Rule => {
  return (tree, context) => {
    const source = apply(url("./files"), [
      template({
        ...strings,
        ...options,
      }),
      move("./"),
    ]);

    return mergeWith(source, MergeStrategy.Overwrite)(tree, context);
  };
};
