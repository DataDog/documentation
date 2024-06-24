---
title: Intelligent Test Runner Troubleshooting
kind: documentation
further_reading:
- link: "/intelligent_test_runner"
  tag: "Documentation"
  text: "Learn about the Intelligent Test Runner"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Intelligent Test Runner is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

This page provides information to help you troubleshot issues with Intelligent Test Runner. If you need additional help, contact [Datadog Support][1].

## Intelligent Test Runner is not working

[Intelligent Test Runner][2] works by analyzing your commit history along with code coverage information about past test runs to determine which tests need to be run and which ones can be safely skipped. A minimum amount of information needs to exist in order for Intelligent Test Runner to work correctly:

- `git` executable needs to be available in the host running tests.
- Your repository needs to have a commit history of at least two commits in the past month.
- You need to have collected test code coverage in past commits, which happens on test runs where Intelligent Test Runner was enabled.
- Your git clone must contain commit and tree history. Intelligent Test Runner tries to unshallow git clones that do not contain history (`git clone --depth=1`), but that might not work on older versions of git. Automatic unshallowing might require additional set up in some CI providers (Harness CI, for example, requires [extra configuration][3] to make sure your pipeline can execute git commands). If your CI job is using shallow git clones, you can change it to use partial git clones by using the following command: `git clone --filter=blob:none`.
- If you run your tests on GitHub Actions CI avoid using the `pull_request` trigger. In this setup code coverage is reported with the SHA of the merge commit, which is not supported by Intelligent Test Runner and can prevent tests to be skipped.

Due to these restrictions, the first time you enable Intelligent Test Runner, you cannot see any tests skipped and the test execution time may be slower than usual because the code coverage is collected automatically.

Intelligent Test Runner only takes into account the commit history and test code coverage information for the past month. Additionally, it does not take into account code coverage information that is generated more than one week after a commit was made.

There is a limitation when [synchronizing a fork through GitHub's UI][4] which causes all tests to be run for the generated synchronization commit.

## Intelligent Test Runner incorrectly skipped a test

Intelligent Test Runner performs test impact analysis based on code coverage to determine which tests are impacted by a given commit or set of commits. While this strategy works for the majority of tests, there are known scenarios where Intelligent Test Runner could skip a test that should have been run:

- Changes in library dependencies.
- Changes in compiler options.
- Changes in external services.
- Changes to data files in data-driven tests.

If you are authoring a commit that includes any of those cases, you can force-disable test skipping in Intelligent Test Runner by adding `ITR:NoSkip` (case insensitive) anywhere in your Git commit message.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /continuous_integration/intelligent_test_runner/
[3]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
