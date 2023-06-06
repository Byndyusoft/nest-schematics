import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  mergeWith,
  move,
  chain,
} from "@angular-devkit/schematics";
import {
  NodeDependencyType,
  addPackageJsonDependency,
} from "@schematics/angular/utility/dependencies";

import { normalize } from "path";
import { spawnSync } from "child_process";

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
      const pkgPath = "./packages/app/package.json";

      addPackageJsonDependency(
        tree,
        {
          type: NodeDependencyType.Default,
          name: "@nestjs/typeorm",
          version: "8.1.4",
          overwrite: true,
        },
        pkgPath,
      );

      addPackageJsonDependency(
        tree,
        {
          type: NodeDependencyType.Default,
          name: "ᐸEntitiesᐳ",
          version: "workspace:*",
          overwrite: true,
        },
        pkgPath,
      );

      spawnSync("yarn", ["install"]);

      return tree;
    },
  ]);
}
