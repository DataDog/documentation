# Docs GitHub Actions

This folder is an NPM package set up for authoring GitHub actions in TypeScript.

## New to TypeScript?

TypeScript is a typed programming language that compiles to JavaScript. When you run `npm run build` from this folder, any TypeScript in `src` is compiled into JavaScript files that are stored in the `lib` folder.

See TypeScript's [Get Started documentation][1] for resources tailored to your experience level.

**Key concepts to understand before editing anything in this package:**

- You should not edit the JavaScript in `lib`. It's generated code, so your changes will be overwritten the next time the package is built.
- To edit the JS in `lib`, change the corresponding TS in `src`, and then run `npm run build` from this directory in your terminal to re-generate the contents of the `lib` folder.
- `lib` contains the code that GitHub runs, so any changes to its contents should be checked into version control.
- If the changes you made to `src` are not taking effect on GitHub as you expected, you likely forgot to run `npm run build`, so nothing has changed in `lib`, and from GitHub's perspective, your program is the same as it was before.

## Available actions

### merge_readiness_notification

The [merge_readiness_notification][2] action is intended to be run when the 'Do Not Merge' label has been removed from a PR in the documentation repo. If the label remover is not on the docs team, and if the PR has already been approved by a docs team member, the action makes a call to a Slack webhook to notify team members that a previously approved PR is ready to merge.

Example workflow that uses the `merge_readiness_notification` action:

```yaml
name: Process label removal
on: 
  pull_request:
    types:
      - unlabeled

jobs:
  run-ts-action:
    runs-on: ubuntu-latest
    if: github.event.label.name == 'Do Not Merge'
    name: Process removal of 'Do Not Merge' label
    steps:
      - name: Generate a token
        id: generate-token
        uses: actions/create-github-app-token@v1
        with:
          app-id: ${{ vars.DOCS_GH_APP_ID }}
          private-key: ${{ secrets.DOCS_GH_APP_PRIVATE_KEY }}
      - name: Checkout
        uses: actions/checkout@v4
      - name: Notify Slack if PR is already approved
        uses: ./../../ts_github_actions/merge_readiness_notification
        with: 
          api-token: ${{ steps.generate-token.outputs.token }}
          slack-webhook-url: ${{ secrets.MERGE_READINESS_SLACK_WEBHOOK_URL }}
```

[1]: https://www.typescriptlang.org/docs/#:~:text=TypeScript%20Documentation-,Get%20Started,-Quick%20introductions%20based
[2]: ./merge_readiness_notification/action.yml