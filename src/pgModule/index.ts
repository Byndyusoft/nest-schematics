import { spawnSync } from "child_process";
/* eslint-disable-next-line */
import { normalize } from "path";

import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";
import {
  addPackageJsonDependency,
  NodeDependencyType,
} from "@schematics/angular/utility/dependencies";

export function main(): Rule {
  return chain([
    /**
     * Функция-обработчик, которая будет вызываться при выполнении генератора.
     * @param tree Дерево файлов проекта.
     * @param context Контекст выполнения генератора.
     * @returns Возвращает дерево файлов проекта с добавленным компонентом.
     */
    (tree: Tree, context: SchematicContext) => {
      // Сначала копируем шаблон.
      const templateSource = apply(url("./files"), [move(normalize("./"))]);
      // Возвращаем модифицированное дерево файлов.
      return mergeWith(templateSource)(tree, context);
    },
    // Затем добавляем свойство в package.json.
    (tree: Tree) => {
      const packagePath = "./packages/app/package.json";

      addPackageJsonDependency(
        tree,
        {
          type: NodeDependencyType.Default,
          name: "@nestjs/typeorm",
          version: "8.1.4",
          overwrite: true,
        },
        packagePath,
      );

      addPackageJsonDependency(
        tree,
        {
          type: NodeDependencyType.Default,
          name: "ᐸEntitiesᐳ",
          version: "workspace:*",
          overwrite: true,
        },
        packagePath,
      );

      spawnSync("yarn", ["install"]);

      return tree;
    },
  ]);
}
