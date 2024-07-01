---
title: How Intelligent Test Runner Works in Datadog
kind: documentation
further_reading:
  - link: "https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/"
    tag: Blog
    text: Streamline CI testing with Datadog Intelligent Test Runner
  - link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
    tag: Blog
    text: Monitor all your CI pipelines with Datadog
  - link: /intelligent_test_runner
    tag: Documentation
    text: Learn about Intelligent Test Runner
  - link: /tests
    tag: Documentation
    text: Learn about Test Visibility
---

## Overview

Intelligent Test Runner is Datadog's test impact analysis solution. Test impact analysis is a technique that has gained popularity over the past few decades. However, it's typically hard and time-consuming to implement. Intelligent Test Runner simplifies this complexity.

Test impact analysis maps each test to the set of code files in your repository that the test uses (per test code coverage). Its goal is to skip tests not affected by the code changes. This leads to a direct reduction in time spent testing in CI.

An extreme example is a pull request that only changes a typo in a README file. For that PR, running all tests doesn't provide any value. On the contrary, flaky tests might make your CI fail, forcing you to retry the pipeline, potentially multiple times, before merging. This is a waste of both developer and CI time. With Intelligent Test Runner, a PR changing a README file would skip all tests.

## What sets it apart

Some test selection solutions don't rely on code coverage data and make up for it by using machine learning. These systems infer which tests are relevant in a probabilistic fashion and might miss tests that were relevant, leading to build failures in your default branch. Machine learning based techniques also typically require longer periods of data collection before they're able to work. Intelligent Test Runner begins working immediately after a baseline of code coverage is gathered.

While other test solutions calculate test impact analysis using code coverage too, they only consider the last commit diff when evaluating which tests to run. As an example, this is a problem with GitHub's pull requests, which only take into account the CI status of the latest commit to allow merging. As a result, you must run all commits through CI or risk skipping tests that should have run.

Intelligent Test Runner leverages per-test code coverage information along with data from [Test Visibility][1] to search previous tests in all relevant past commits. Configuration of Intelligent Test Runner is a one-click operation in most languages, and the results are accurate and more precise than other methods.


## How test selection works

When you enable Intelligent Test Runner, per-test (or per-suite, depending on the framework) code coverage is transparently collected and sent to Datadog.

The Datadog backend uses that information to search through previous test runs to determine if a given test can be skipped. If Datadog has a record of the test passing in a commit where the covered and [tracked files][2] are identical to the current commit, the test is skipped. This is used as evidence that the code change didn't impact the test.

{{< img src="continuous_integration/itr_test_selection_diagram.png" alt="A Venn diagram explaining what makes a test skippable in the test selection process for Intelligent Test Runner" style="width:80%;">}}

The Datadog library then removes tests marked as unskippable in source from the skippable tests list. It then proceeds to run the tests, but directs the test framework to skip those that remain in the skippable test list.

{{< img src="continuous_integration/itr_skipped_test_run.png" alt="A skipped test by Intelligent Test Runner" style="width:80%;">}}

Let's take a look at a specific example:

{{< img src="continuous_integration/itr_example_2.png" alt="A diagram explaining how a pull request with multiple commits to main and feature branches can have different results with tracked files" style="width:80%;">}}

The diagram above shows a developer branch that branches out from `main` and has several commits. On each commit, the CI has been running two tests (A and B) with different results.

- **Commit 1** ran both tests. This commit contained changes that affected the tracked files, and the covered files of both A and B.
- **Commit 2** ran both tests again:
  - Test A has to be run because, although this commit did not affect test A (no changes in tracked files or covered files), there are no previous test runs that passed for Test A. Since Intelligent Test Runner cannot guarantee a passing status if it were run, it doesn't skip it. This time, the test passes, which indicates this is a flaky test.
  - Test B was run both because there is no previous successful test run for this test, and also because commit 2 changes files that affect it.
- **Commit 3** runs all tests because a tracked file was changed.
- **Commit 4** runs all tests:
  - Test A is run because there is no previous test run that meets all criteria: test runs from commits 1 and 3 cannot be used because they failed, and the test run from commit 2 cannot be used because tracked files have been changed since commit 2 until commit 4.
  - Test B is also run because there is no previous test run that meets all criteria: test runs from commit 1 and 2 cannot be used because they failed, and the test run from commit 3 cannot be used because covered files for test B were modified between commits 3 and 4.
- **Commit 5** was able to skip one test:
  - Test A could be skipped thanks to the test run in commit 4. This test run meets all of the necessary criteria: tracked files haven't been changed between commits 4 and 5, neither have the impacted files for test A, and test A passed in commit 4. Therefore, if the test were run it would exercise the same code paths as in commit 4, and it would not provide any new information in the CI. In this case, skipping Test A has two benefits: there's the performance/cost benefit of not running the test as well as the increased reliability of the CI since Test A is flaky.
  - Test B had to run because its covered files changed in commit 5.
- **Commit 6** was able to skip both tests:
  - Test A could be skipped thanks to the test run in commit 4.
  - Test B could be skipped thanks to the test run in commit 5.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/
[2]: /intelligent_test_runner/#tracked-files
