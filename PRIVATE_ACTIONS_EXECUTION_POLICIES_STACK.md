# Private Actions / Execution Policies documentation stack

## Status

In progress.

## Project overview

This branch is the integration point for a stack of PRs that add and rewrite the Private Actions
documentation under `hugo/content/en/actions/private_actions/` to cover **Execution Policies**, a
new authorization model for private action runners running in the Datadog Agent.

Each slice below lands as its own PR against this branch, so each is independently reviewable:

1. Rewrite Private Actions Overview for Execution Policies
2. Move Handling Private Action Credentials under Connections
3. Rewrite Set Up in the Datadog Agent, add Execution Policies enrollment
4. Add Set Up a Standalone Private Action Runner
5. Add Enrollment and Ownership
6. Add Authorize Private Actions
7. Add Execution Policies
8. Rewrite Run a Script for Execution Policies
9. Add Private Actions Reference
10. Add Get Started with Private Actions (Execution Policies quickstart)

After all 10 slices are reviewed and merged into this branch, this branch merges into `master` in a
single rollup PR, and this file is removed.
