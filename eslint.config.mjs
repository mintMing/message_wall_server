import globals from "globals";
import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-node";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import configPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.{js,mjs,cjs}"],
    },
    {
        languageOptions: {
            ecmaVersion: "latest", // 支持最新的 ECMAScript 特性
            sourceType: "module", // 使用 ECMAScript 模块
            globals: {
                ...globals.node, // 包含 Node.js 全局变量
                jest: true, // 包含 Jest 全局变量
            },
        },
    },
    pluginJs.configs.recommended,
    {
        plugins: {
            import: importPlugin,
            node: nodePlugin,
            promise: promisePlugin,
            security: securityPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            "import/no-unresolved": "error",
            "node/no-unsupported-features/es-syntax": [
                "error",
                { ignores: ["modules"] },
            ],
            "promise/always-return": "error",
            "security/detect-object-injection": "error",
            "no-undef": ["error", { typeof: true }],
            "no-var": "error", // 要求使用 let 或 const 而不是 var
            "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
            "no-unexpected-multiline": "error", // 禁止空余的多行
            "no-useless-escape": "off", // 禁止不必要的转义字符
            semi: ["error", "always"], // 表达式必须加上分号
            ...configPrettier.rules, //  禁用与 Prettier 冲突的规则
            "prettier/prettier": "error", // Prettier 规则优先
            quotes: ["error", "double"], // 必须使用双引号
        },
        ignores: ["node_modules/*"],
    },
];
