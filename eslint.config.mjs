// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions:{
            parserOptions:{
                sourceType:'module'
            }
        },
        ignores:["**/node_modules","**/.*","**/dist","**/webpack.config.mjs","**/webpack.common.mjs"]
    }
);