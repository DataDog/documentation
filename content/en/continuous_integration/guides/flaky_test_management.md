---
title: Flaky Test Management
kind: guide
aliases:
    - /continuous_integration/guides/find_flaky_tests/
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

<div class="alert alert-info"><strong>Note</strong>: The table is limited to the 1000 flaky tests with the highest number of commits flaked for the selected time frame.</div>

## Remediation

If a flaky test has not failed in the past 30 days, it is automatically removed from the table. You can also manually remove a flaky test by clicking on the trash icon that appears when you hover over the test row. It is added again if it re-exhibits flaky behavior.

## Watch for new flaky tests

These are tests that exhibit flaky behavior and didn't previously exist in the Flaky Tests table for the current branch or default branch of the repository.

### Test Runs page

1. Navigate to the [Test Runs][1] page.
2. In the facets list on the left sidebar, expand the **New Flaky** facet in the **Test** section, and check `true`.
All test runs that exhibited flakey behavior for the first time as per the definition above are displayed.

### Branches page

1. On the [Tests][2] page, select the **Branches** view.
2. Filter the table to see branches, services, or commits of interest to you.
3. Look at the **New Flaky** column to see the number of new flaky tests introduced by the latest commit as per the definition above.

#### Ignore new flaky tests detected by mistake

You can ignore new flaky tests for a particular commit if you determine that those flaky tests were detected by mistake. The tests reappear if the commit exhibits flakiness again.

Click on the **New Flaky** number and then click **Ignore flaky tests**.

{{< img src="ci/ignore-new-flaky-tests.png" alt="Ignore all new flaky tests for a commit" style="width:100%;">}}

## Watch for known flaky failed tests

Known flaky failed tests are tests that have flaky behavior on the current or default branch of the repository.

### Test Runs page

1. Navigate to the [Test Runs][1] page.
2. In the facets list on the left sidebar, expand the **Known Flaky** facet in the **Test** section, and check `true`.
Failed test runs that were known to be flaky as per the definition above are displayed.


### Branches page

1. On the [Tests][2] page, select the **Branches** view.
2. Filter the table to see any branches, services, or commits of interest.
3. The **Failed** column contains the number of failed tests and known flaky failed tests in the latest commit.

{{< img src="ci/known-flaky-failed-tests.png" alt="CI Tests Branches view with a branch selected and a text box in the Failed column displaying 1 tests failed and 1 known flaky" style="width:100%;">}}


## Flaky tests attributes


Test runs that are flaky, new flaky or known flaky contain attributes that can be used to filter queries or create dashboards and monitors.

| Name        | Attribute                   | Description                                                                                                                                                                                                                                                                                                  |
|-------------|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Flaky       | `@test.is_flaky:true`       | The test run has flaked in the commit. Either this test run has failed and there was a previous test run for the same test and commit that passed, or this test run passed and there is a previous failure. This attribute is only present the first time a test is detected flaky in a commit. |
| New Flaky   | `@test.is_new_flaky:true` | The test run has flaked in the commit (according to the "Flaky" definition above) and didn't previously exist in the "Flaky tests" table for the branch of the test run or default branch of the repository. This also means that the test has been added to the "Flaky tests" table. |
| Known Flaky | `@test.is_known_flaky:true`   | The test run has flaked in the commit (according to the "Flaky" definition above) and it was already present on the "Flaky test" table of either the branch of the test run or the default branch of the repository. This means that the test was detected as flaky in the past, and that this failure may not be the result of a change in this commit. |

[1]: https://app.datadoghq.com/ci/test-runs
[2]: https://app.datadoghq.com/ci/test-services
