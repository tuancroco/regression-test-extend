# Visual Regression Test

Please check [Documentation](https://tuyen.blog/optimizely-cms/testing/get-started/) for the instructions.

## Use

1. Install:

   ```bash
   npm i -g regressify
   ```

1. Manual Set up all test and config files in the **visual_tests** folder and place it at the root of the project, or automatically add it using the command:

   ```bash
   npx regressify init
   ```

1. Add to scripts in package.json:

   ```bash
    "ref": "regressify ref",
    "approve": "regressify approve",
    "test": "regressify test"
   ```

1. Use new command aliases:

   | Command                                                | Alias 1 | Alias 2       | Description         |
   | ------------------------------------------------------ | ------- | ------------- | ------------------- |
   | regressify ref -- --test-suite alloy                   | r alloy | ref alloy     |                     |
   | regressify approve -- --test-suite alloy               | a alloy | approve alloy |                     |
   | regressify ref -- --test-suite alloy                   | t alloy | test alloy    |                     |
   | regressify ref -- --test-suite sign-in --requiredLogin | t alloy | test alloy    | Run with login mode |
