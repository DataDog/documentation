---
title: Branches
description: Gain insight into test performance in your repository branches.
aliases:
- /tests/search/
algolia:
   rank: 70
   tags: ['flaky test', 'flaky tests', 'test regression', 'test regressions', 'test service', 'test services']
further_reading:
- link: "/continuous_integration/explorer"
  tag: "Documentation"
  text: "Search and filter test runs"
- link: "/continuous_integration/guides/flaky_test_management"
  tag: "Documentation"
  text: "Learn how to manage flaky tests"
- link: "/tests/repositories"
  tag: "Documentation"
  text: "Gain insight into test performance in your repositories"
---

## Overview

The [Branches][1] view of the Repositories page lists all branches from all repositories and {{< tooltip glossary="test service" >}}s that have reported test results. This tab is useful for seeing the status of tests run on your code branches and troubleshooting test failures.

To filter the list down to only branches that you have committed to, toggle **My Branches** and enter the email address associated with your GitHub account. You can enter multiple email addresses. Edit your address later by clicking **Edit Authors**.

## Test results

For each branch, you can see the test service, the number of failed, passed, and skipped tests, test regressions, total test time, when the commit was last updated, and the avatar of the author of the commit.

Click on a branch to explore the test details page, which includes information about the branch's latest commits, flaky tests, test performance, common error types, and all test runs.

{{< img src="continuous_integration/test_details.png" alt="Test Details page for a single branch" style="width:100%;">}}

## Test regressions

All {{< tooltip glossary="test regression" >}}s are evaluated per commit in an effort to tie performance regressions to specific code changes.

## Investigate for more details

Click on the row to see test suite run details such as test results for the last commit on this branch (or you can switch branches), failing tests and the most common errors, slow tests, flaky tests, and a complete list of test runs over the time frame selected. You can filter this list of test runs by facet to get to the information you want to see most.

Click into one of the test runs to see the test trace as a flame graph or a span list. The _Runs (n)_ list on the left lets you access traces for each retry of the test for the same commit.

## Explore connections to services, resources, logs, and network events

Click the CI provider link to examine the Resource, Service, or Analytics page for the test. You can also find complete tags information and links to related log events and network monitoring events.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-repositories?view=branches