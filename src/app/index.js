"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
function main(options) {
    return (0, schematics_1.chain)([
        /**
         * Функция-обработчик, которая будет вызываться при выполнении генератора.
         * @param tree Дерево файлов проекта.
         * @param context Контекст выполнения генератора.
         * @returns Возвращает дерево файлов проекта с добавленным компонентом.
         */
        (tree, context) => {
            // Сначала копируем шаблон.
            const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
                (0, schematics_1.template)({
                    ...core_1.strings,
                    ...options,
                }),
                (0, schematics_1.move)((0, path_1.normalize)('./'))
            ]);
            // Возвращаем модифицированное дерево файлов.
            return (0, schematics_1.mergeWith)(templateSource)(tree, context);
        }
    ]);
}
exports.main = main;
//# sourceMappingURL=index.js.map