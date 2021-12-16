---
title: Flaky Test Management
kind: guide
aliases: /continuous_integration/guides/find_flaky_tests/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

_Flaky tests_ are tests that exhibit both a passing and failing status across multiple test runs for the same commit. If you commit some code and run it through CI, and a test fails, and you run it through CI again and the test passes, that test is unreliable as proof of quality code.

Flaky tests introduce risk and unpredictability into your CI system and into your end product. When people have to remember which tests are flaky, they lose trust in their test results, and a tremendous amount of time and resources are wasted on pipeline retries.

Go to the Test Service page to see the _Flaky Tests_ table for a given test service and branch. You can see all of the tests that are flaky in the time frame you have selected.

{{< img src="ci/flaky-test-management.png" alt="Flaky Tests table on the Test Service page" style="width:100%;">}}

The app helps you prioritize flaky tests by providing the following information about them:

* **Average duration**: The average time the test takes to run.
* **First and Last flaked**: The date and commit SHAs for when the test first and most recently exhibited flaky behavior.
* **Occurrences**: The number of commits in which the test exhibited flaky behavior.
* **Failure Rate**: The percentage of test runs that have failed for this test since it first flaked.
* **Trend**: A visualization that indicates whether a flaky test was fixed or it is still actively flaking.

Once you identify a flaky test you want to fix, click on the test to see links to view the most recent failed test run or the first flaky test run.

## Remediation

If a flaky test has not failed in the past 30 days, it is automatically removed from the table. You can also manually remove a flaky test by clicking on the trash icon that appears when you hover over the test row. It is added again if it re-exhibits flaky behavior.

## Watch for new flaky tests

1. On the Tests page, select the **Branches** view.

2. Filter the table to see branches, services, or commits of interest to you.

3. Look at the **New Flaky** column to see the number of new flaky tests that were introduced by the latest commit. These are tests that exhibit flaky behavior and didn’t previously exist in the Flaky Tests table.

