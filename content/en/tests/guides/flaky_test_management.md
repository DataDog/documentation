---
title: Flaky Test Management
kind: guide
aliases:
- /continuous_integration/guides/find_flaky_tests/
- /continuous_integration/guides/flaky_test_management/
further_reading:
- link: "/continuous_integration/tests/"
  tag: "Documentation"
  text: "Learn about Test Visibility"
- link: "https://www.datadoghq.com/knowledge-center/flaky-tests/"
  tag: "Knowledge Center"
  text: "Flaky Tests Overview" 
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

A [flaky test][1] is a test that exhibit both a passing and failing status across multiple test runs for the same commit. If you commit some code and run it through CI, and a test fails, and you run it through CI again and the test passes, that test is unreliable as proof of quality code.

Flaky tests introduce risk and unpredictability into your CI system and end product. When people have to remember which tests are flaky, they lose trust in their test results, and a tremendous amount of time and resources are wasted on pipeline retries.

For each branch, the list shows the number of new flaky tests introduced by the commit, the number of flaky commits, total test time, and the branch's latest commit details. 

Use the following information to help prioritize flaky tests:

* **Average duration**: The average time the test takes to run.
* **First flaked** and **Last flaked**: The date and commit SHAs for when the test first and most recently exhibited flaky behavior.
* **Commits flaked**: The number of commits in which the test exhibited flaky behavior.
* **Failure rate**: The percentage of test runs that have failed for this test since it first flaked.
* **Trend**: A visualization that indicates whether a flaky test was fixed or it is still actively flaking.

Once you identify a flaky test you want to fix, click on the test to see links to view the most recent failed test run or the first flaky test run.

{{< img src="continuous_integration/flaky_test_options.png" alt="Advanced options for flaky tests" style="width:100%;">}}

If a flaky test has not failed in the past 30 days, it is automatically removed from the table. You can also manually remove a flaky test by clicking on the trash icon that appears when you hover over the test row. It is added again if it re-exhibits flaky behavior.

### New flaky tests

New flaky tests are tests that exhibit flaky behavior and didn't previously exist in the Flaky Tests table for the current branch or default branch of the repository.

<div class="alert alert-info">The table is limited to the 1000 flaky tests with the highest number of commits flaked for the selected time frame.</div>

#### Test Runs page

1. Navigate to the [Test Runs][2] page.
2. In the facets list on the left sidebar, expand the **New Flaky** facet in the **Test** section, and check `true`.
All test runs that exhibited flakey behavior for the first time as per the definition above are displayed.

#### Branches page

1. On the [Tests][3] page, select the **Branches** view.
2. Filter the table to see branches, services, or commits of interest to you.
3. Look at the **New Flaky** column to see the number of new flaky tests introduced by the latest commit as per the definition above.

### Ignore new flaky tests detected by mistake

You can ignore new flaky tests for a particular commit if you determine that those flaky tests were detected by mistake. The tests reappear if the commit exhibits flakiness again.

Click on the **New Flaky** number and then click **Ignore flaky tests**.

{{< img src="ci/ignore-new-flaky-tests.png" alt="Ignore all new flaky tests for a commit" style="width:100%;">}}

### Known flaky failed tests

Known flaky failed tests are tests that have flaky behavior on the current or default branch of the repository.

#### Test Runs page

1. Navigate to the [Test Runs][2] page.
2. In the facets list on the left sidebar, expand the **Known Flaky** facet in the **Test** section, and check `true`.
Failed test runs that were known to be flaky as per the definition above are displayed.

#### Branches page

1. On the [Tests][3] page, select the **Branches** view.
2. Filter the table to see any branches, services, or commits of interest.
3. The **Failed** column contains the number of failed tests and known flaky failed tests in the latest commit.

{{< img src="ci/known-flaky-failed-tests.png" alt="CI Tests Branches view with a branch selected and a text box in the Failed column displaying 1 tests failed and 1 known flaky" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /glossary/#flaky-test
[2]: https://app.datadoghq.com/ci/test-runs
[3]: https://app.datadoghq.com/ci/test-services?view=branches
