"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
function main(_options) {
    return (tree) => {
        const { name } = _options;
        tree.visit((path, entry) => {
            if (path.includes('node_modules')) {
                return;
            }
            if (entry && path.includes('package.json')) {
                const content = entry.content.toString('utf-8');
                const json = JSON.parse(content);
                json['author'] = name;
                const newContent = JSON.stringify(json, null, 2);
                tree.overwrite(path, newContent);
            }
        });
        return tree;
    };
}
exports.main = main;
