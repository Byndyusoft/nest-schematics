import { strings } from '@angular-devkit/core';
import {
    apply, chain,
    mergeWith,
    move,
    Rule, SchematicContext,
    template, Tree,
    url,
} from '@angular-devkit/schematics';

import {normalize} from 'path';
import {AppOptions} from "./index.schema";

export function main(options: AppOptions): Rule {

    return chain([
        /**
         * Функция-обработчик, которая будет вызываться при выполнении генератора.
         * @param tree Дерево файлов проекта.
         * @param context Контекст выполнения генератора.
         * @returns Возвращает дерево файлов проекта с добавленным компонентом.
         */
        (tree: Tree, context: SchematicContext) => {
            // Сначала копируем шаблон.
            const templateSource = apply(url('./files'), [
                template({
                    ...strings,
                    ...options,
                }),
                move(normalize('./'))
            ]);
            // Возвращаем модифицированное дерево файлов.
            return mergeWith(templateSource)(tree, context);
        }
    ]);


}
