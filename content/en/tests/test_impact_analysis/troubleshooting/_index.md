---
title: Test Impact Analysis Troubleshooting
aliases:
- /intelligent_test_runner/troubleshooting
further_reading:
- link: "/intelligent_test_runner"
  tag: "Documentation"
  text: "Learn about Test Impact Analysis"
---

## Overview

This page provides information to help you troubleshot issues with Test Impact Analysis. If you need additional help, contact [Datadog Support][1].

## Test Impact Analysis is not working

[Test Impact Analysis][2] works by analyzing your commit history along with code coverage information about past test runs to determine which tests need to be run and which ones can be safely skipped. A minimum amount of information needs to exist in order for Test Impact Analysis to work correctly:

- `git` executable needs to be available in the host running tests.
- Your repository needs to have a commit history of at least two commits in the past month.
- You need to have collected test code coverage in past commits, which happens on test runs where Test Impact Analysis was enabled.
- Your git clone must contain commit and tree history. Test Impact Analysis tries to unshallow git clones that do not contain history (`git clone --depth=1`), but that might not work on older versions of git. Automatic unshallowing might require additional set up in some CI providers (Harness CI, for example, requires [extra configuration][3] to make sure your pipeline can execute git commands). If your CI job is using shallow git clones, you can change it to use partial git clones by using the following command: `git clone --filter=blob:none`.

Due to these restrictions, the first time you enable Test Impact Analysis, you cannot see any tests skipped and the test execution time may be slower than usual because the code coverage is collected automatically.

Test Impact Analysis only takes into account the commit history and test code coverage information for the past month. Additionally, it does not take into account code coverage information that is generated more than one week after a commit was made.

### Synchronizing a fork through GitHub's UI

[Synchronizing a fork through GitHub's UI][4] causes all tests to be run for the generated synchronization commit.

### Collecting coverages on GitHub Actions CI triggered by pull request events

Tests run in GitHub Actions CI using the [`pull_request` trigger][5] may not be skipped on subsequent commits within the pull request's branch. The trigger introduces changes using a new merge commit that is not considered by Test Impact Analysis.

### Squash and merge your commits

Using [squash and merge][6] to integrate commits into the base branch causes the git history of the feature branch to be lost. As a result, Test Impact Analysis may not skip tests in the base branch that were recently skipped in the feature branch.

## Test Impact Analysis incorrectly skipped a test

Test Impact Analysis performs test impact analysis based on code coverage to determine which tests are impacted by a given commit or set of commits. While this strategy works for the majority of tests, there are known scenarios where Test Impact Analysis could skip a test that should have been run:

- Changes in library dependencies.
- Changes in compiler options.
- Changes in external services.
- Changes to data files in data-driven tests.

If you are authoring a commit that includes any of those cases, you can force-disable test skipping in Test Impact Analysis by adding `ITR:NoSkip` (case insensitive) anywhere in your Git commit message.

### Packages incorrectly detected as third-party

In Python, some packages, such as `sumy` and `sendgrid`, install modules under the `test.*` or `tests.*` package namespace. This can cause tests to be detected as third-party packages if they are located in a folder with the same name. If you use one of those packages, coverage data for tests may be incomplete, which may cause a test to be skipped when it should have been run. To avoid this issue, you can set the `DD_THIRD_PARTY_DETECTION_EXCLUDES` environment variable to a list of such third-party packages (for example, `DD_THIRD_PARTY_DETECTION_EXCLUDES=sumy,sendgrid`). This is a known issue that is scheduled to be resolved in a future version of `dd-trace-py`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tests/test_impact_analysis/
[3]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[5]: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request
[6]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits
