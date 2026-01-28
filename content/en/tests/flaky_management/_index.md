---
title: Flaky Tests Management
description: Track, triage, and manage flaky tests.
further_reading:
- link: "/continuous_integration/tests/"
  tag: "Documentation"
  text: "Learn about Test Optimization"
- link: "/tests/flaky_tests/"
  tag: "Documentation"
  text: "Learn about working with flaky tests"
- link: "https://www.datadoghq.com/knowledge-center/flaky-tests/"
  tag: "Knowledge Center"
  text: "Flaky Tests Overview"
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Test Optimization is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

The [Flaky Tests Management][1] page provides a centralized view to track, triage, and remediate flaky tests across your organization. You can view every test's status along with key impact metrics like number of pipeline failures, CI time wasted, and failure rate.

From this UI, you can act on flaky tests to mitigate their impact. Quarantine or disable problematic tests to keep known flakes from breaking builds, and create cases and Jira issues to track work toward fixes.

{{< img src="tests/flaky_management.png" alt="Overview of the Flaky Tests Management UI" style="width:100%;" >}}

## Change a flaky test's status

Use the status drop-down to change how a flaky test is handled in your CI pipeline. This can help reduce CI noise while retaining traceability and control. Available statuses are:

| Status    | Description |
| ----------- | ----------- |
| **Active** | The test is known to be flaky and is running in CI. |
| **Quarantined** | Keep the test running in the background, but failures don't affect CI status or break pipelines. This is useful for isolating flaky tests without blocking merges. Datadog tags test run events with `@test.test_management.is_quarantined:true` when quarantined. |
| **Disabled** | Skip the test entirely in CI. Use this when a test is no longer relevant or needs to be temporarily removed from the pipeline. Datadog tags test run events with `@test.test_management.is_disabled:true` when disabled. |
| **Fixed** | The test has passed consistently and is no longer flaky. If supported, use the [remediation flow](#confirm-fixes-for-flaky-tests) to confirm the fix and automatically apply this status after it is merged into the default branch. |

<div class="alert alert-info">Status actions have minimum version requirements for each programming language's instrumentation library. See <a href="#compatibility">Compatibility</a> for details.</div>

## Configure policies to automate the flaky test lifecycle

Configure automated Flaky Test Policies to govern how flaky tests are handled in each repository. For example, a test that flakes in the default branch can automatically be quarantined, and later disabled if it remains unfixed after 30 days.

1. Click the **Policies** button at the upper right of the Flaky Management page. You can also navigate to [**Flaky Test Policies**][13] in Software Delivery settings.
2. Search for and select the repository you want to configure. This opens the **Edit Policies** flyout.
    {{< img src="tests/flaky-policies-2.png" alt="Flaky Test Policies page with the Edit Policies flyout open to configure a policy" style="width:100%;" >}}

3. Use the toggles to enable specific automated actions, and use automation rules to further customize how tests get quarantined, disabled, or retried:
   <table>
     <thead>
       <tr>
         <th>Action</th>
         <th>Description</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>Quarantine</strong></td>
         <td>
           <p>Toggle to allow flaky tests to be quarantined for this repository.</p>
           <p>Customize automation rules based on:</p>
           <ul>
             <li><strong>Time</strong>: Quarantine a test if its status is <code>Active</code> for a specified number of days. The rule is triggered every day at 12:15 UTC.</li>
             <li><strong>Branch</strong>: Quarantine an <code>Active</code> test if it flakes in one or more specified branches.</li>
             <li><strong>Failure rate</strong>: Quarantine an <code>Active</code> test if its failure rate over the last 7 days is greater or equal to the specified threshold. The rule is triggered every 15 minutes.</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td><strong>Disable</strong></td>
         <td>
           <p>Toggle to allow flaky tests to be disabled for this repository. You may want to do this after quarantining or to protect specific branches from flakiness.</p>
           <p>Customize automation rules based on:</p>
           <ul>
             <li><strong>Status and time</strong>: Disable a test if it has a specified status for a specified number of days. The rule is triggered every day at 12:30 UTC.</li>
             <li><strong>Branch</strong>: Disable an <code>Active</code> or <code>Quarantined</code> test if it flakes in one or more specified branches.</li>
             <li><strong>Failure rate</strong>: Disable an <code>Active</code> or <code>Quarantined</code> test if its failure rate over the last 7 days is greater or equal to the specified threshold. The rule is triggered every 15 minutes.</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td><strong>Attempt&nbsp;to&nbsp;Fix</strong></td>
         <td>When you attempt to fix a flaky test, automatically retry the test a specified number of times on the commit containing the fix.</td>
       </tr>
       <tr>
         <td><strong>Fixed</strong></td>
         <td>If a flaky test no longer flakes for 30 days, it is automatically moved to Fixed status. This automation is default behavior and can't be customized.</td>
       </tr>
     </tbody>
   </table>

## Track evolution of flaky tests

Track the evolution of the number of flaky tests with the `test_optimization.test_management.flaky_tests` out-of-the-box metric. The metric is enriched with the tags below to help you investigate the counts in more detail.

- `repository_id`
- `test_service`
- `branch`
- `flaky_status`
- `test_codeowners`
- `flaky_category`

The `branch` tag only exists when the test has flaked in the default branch of the repository during the last 30 days. This helps you discard flaky tests that have only exhibited flakiness in feature branches, as these may not be relevant. You can configure the default branch of your repositories under [Repository Settings][2].

## Investigate a flaky test

For more information about a specific flaky test, use these options in the actions menu at the end of each row:

- **View Last Failed Test Run**: Open the side panel with the details of the test's most recent failed run.
- **View related test executions**: Open the [Test Optimization Explorer][3] populated with all of the test's recent runs.

## Create cases for flaky tests

For any flaky test, you can create a case and use [Case Management][4] to track any work toward remediation. Click the **Create Case** button or use the actions menu at the end of the row.

## Confirm fixes for flaky tests

When you fix a flaky test, Test Optimization's remediation flow can confirm the fix by retrying the test multiple times. To enable the remediation flow:

1. For the test you are fixing, click **Link commit to Flaky Test fix** in the Flaky Tests Management UI.
1. Copy the unique flaky test key that is displayed (for example, `DD_ABC123`).
1. Include the test key in your Git commit title or message for the fix (for example, `git commit -m "DD_ABC123"`).
1. When Datadog detects the test key in your commit, it automatically triggers the remediation flow for that test:
    - Retries any tests you're attempting to fix 20 times (or the number of retries you specified in your [Flaky Test Policies configuration](#configure-policies-to-automate-the-flaky-test-lifecycle)).
      - Tags every retry with `@test.test_management.is_attempt_to_fix:true` in test run events.
    - Runs tests even if they are marked as `Disabled`.
    - If all retries pass, marks the fix as **in progress** in the Flaky Tests Management UI, associates it with the branch used for the fix, and waits for that branch to be merged.
      - Tags the last test retry with `@test.test_management.attempt_to_fix_passed:true` in test run events.
      - Starts a 14-day [grace period](#grace-period-mechanism) to give time for the fix to propagate everywhere in the repository.
    - If any retry fails, keeps the test's current status (`Active`, `Quarantined`, or `Disabled`).
      - Tags the last test retry with `@test.test_management.attempt_to_fix_passed:false` in test run events.

### Track fixes that are in progress

After a successful remediation run, Flaky Tests Management tracks the branch containing the fix and displays a **Fix in progress** indicator until the fix reaches the repository's default branch. When the associated pull request merges, the test automatically moves to `Fixed` and the indicator is removed. If the fix is pushed directly to the default branch, the test is marked `Fixed` immediately.

Requirements and limitations:
- Source Code Integration must be configured for a supported SCM provider (GitHub, GitLab, or Azure DevOps) so Datadog can receive pull request merge webhooks. See [Source Code Integration setup][17].
- Renaming or deleting the feature branch after the remediation run prevents Datadog from detecting the merge.
- Branches with fixes older than three months stop being monitored; rerun the remediation flow to refresh tracking.
- If your SCM provider isn't supported or Source Code Integration isn't set up, Datadog cannot detect merges automatically. Manually transition the test to `Fixed` after the fix is deployed.

### Grace period mechanism

After you fix a flaky test, it can take time for the fix to propagate to all branches, which can cause the test to keep flaking in stale branches. A grace period mechanism prevents flaky tests from appearing on stale branches after the fix is applied.

A 14-day grace period applies to every flaky test with a successful fix after using the [remediation flow](#confirm-fixes-for-flaky-tests). During this period, Datadog checks if the commit where the test run contains the fix:
- If the fix is not present in the commit and the test was **Active** or **Quarantined**, Datadog treats the test as **Quarantined**.
- If the test was **Disabled**, Datadog treats the test as **Disabled**.
This method avoids unnecessary CI failures and saves developer time.

If a test inside the grace period flakes and the commit doesn't contain the fix, Datadog tags the test run event with `@test.test_management.flaky_fix_missing:true`.

## AI-powered flaky test fixes

{{< callout url="http://datadoghq.com/product-preview/bits-ai-dev-agent" >}}
Bits AI Dev Agent is in Preview. To sign up, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

Bits AI Dev Agent can automatically diagnose and fix flaky tests that have been detected by Test Optimization. When a flaky test is identified, Bits AI analyzes the test failure patterns and generates production-ready fixes that can be submitted as GitHub pull requests.

{{< img src="tests/bits_ai_flaky_test_fixes.png" alt="Bits AI Dev Agent displaying a proposed fix for a flaky test" style="width:100%;" >}}

### Setup

To enable AI-powered flaky test fixes, enable Bits AI Dev Agent for Test Optimization by following the setup instructions in the [Bits AI Dev Agent documentation][16]. Bits AI Dev Agent automatically create fixes for flaky tests detected by Test Optimization.

<div class="alert alert-info">A flaky test must have at least one failed execution that includes both <code>@error.message</code> and <code>@test.source.file</code> tags to be eligible for a fix. Generating a fix may take some time.</div>

## AI-powered flaky test categorization

Flaky Tests Management uses AI to automatically assign a root cause category to each flaky test based on execution patterns and error signals. This helps you filter, triage, and prioritize flaky tests more effectively.

<div class="alert alert-info">A test must have at least one failed execution that includes both <code>@error.message</code> and <code>@error.stack</code> tags to be eligible for categorization. If the test was recently detected, categorization may take several minutes to complete.</div>

### Categories

| Category                | Description |
|-------------------------|-------------|
| **Concurrency**         | Test that invokes multiple threads interacting in an unsafe or unanticipated manner. Flakiness is caused by, for example, race conditions resulting from implicit assumptions about the ordering of execution, leading to deadlocks in certain test runs. |
| **Randomness**          | Test uses the result of a random data generator. If the test does not account for all possible cases, then the test may fail intermittently, e.g., only when the result of a random number generator is zero. |
| **Floating Point**      | Test uses the result of a floating-point operation. Floating-point operations can suffer from precision over- and under-flows, non-associative addition, etc., which—if not properly accounted for—can result in inconsistent outcomes (e.g., comparing a floating-point result to an exact real value in an assertion). |
| **Unordered Collection**| Test assumes a particular iteration order for an unordered-collection object. Since no order is specified, tests that assume a fixed order will likely be flaky for various reasons (e.g., collection-class implementation). |
| **Too Restrictive Range**| Test whose assertions accept only part of the valid output range. It intermittently fails on unhandled corner cases. |
| **Timeout**             | Test fails due to time limitations, either at the individual test level or as part of a suite. This includes tests that exceed their execution time limit (e.g., single test or the whole suite) and fail intermittently due to varying execution times. |
| **Order Dependency**    | Test depends on a shared value or resource modified by another test. Changing the test-run order can break those dependencies and produce inconsistent outcomes. |
| **Resource Leak**       | Test improperly handles an external resource (e.g., failing to release memory). Subsequent tests that reuse the resource may become flaky. |
| **Asynchronous Wait**   | Test makes an asynchronous call or waits for elements to load/render and does not explicitly wait for completion (often using a fixed delay). If the call or rendering takes longer than the delay, the test fails. |
| **IO**                  | Test is flaky due to its handling of input/output—for example, failing when disk space runs out during a write. |
| **Network**             | Test depends on network availability (e.g., querying a server). If the network is unavailable or congested, the test may fail. |
| **Time**                | Test relies on system time and may be flaky due to precision or timezone discrepancies (e.g., failing when midnight passes in UTC). |
| **Environment Dependency** | Test depends on specific OS, library versions, or hardware. It may pass on one environment but fail on another, especially in cloud-CI environments where machines vary nondeterministically. |
| **Unknown**             | Test is flaky for an unknown reason. |

## Receive notifications

Set up notifications to track changes to your flaky tests. Whenever a user or a policy changes the state of a flaky test, a message is sent to your selected recipients. You can send notifications to email addresses or Slack channels (see the [Datadog Slack integration][5]), and route messages based on test code owners. If no code owners are specified, all selected recipients are notified of all flaky test changes in the repository. Configure notification for each repository from the  [**Flaky Test Policies**][13] page in Software Delivery settings.

Notifications are not sent immediately; they are batched every few minutes to reduce noise.

{{< img src="tests/flaky_management_notifications_settings.png" alt="Notifications settings UI" style="width:100%;" >}}

## Compatibility

To use Flaky Tests Management features, you must use Datadog's native instrumentation for your test framework. The table below outlines the minimum versions of each Datadog tracing library required to quarantine, disable, and attempt to fix flaky tests. Click a language name for setup information:

| Language        | Quarantine & Disable          | Attempt to fix               |
| --------------- | ----------------------------- | ---------------------------- |
| [.NET][6]       | 3.13.0+                       | 3.23.0+                      |
| [Go][7]         | 1.73.0+ (Orchestrion v1.3.0+) | 2.2.2+ (Orchestrion v1.6.0+) |
| [Java][8]       | 1.47.0+                       | 1.52.0+                      |
| [JavaScript][9] | 5.80.0+                       | 5.74.0+                      |
| [Python][10]    | 3.3.0+                        | 3.8.0+                       |
| [Ruby][11]      | 1.13.0+                       | 1.17.0+                      |
| [Swift][12]     | 2.6.1+                        | 2.6.1+                       |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/flaky
[2]: https://app.datadoghq.com/source-code/repositories
[3]: /tests/explorer
[4]: /incident_response/case_management
[5]: /integrations/slack/?tab=datadogforslack
[6]: /tests/setup/dotnet/
[7]: /tests/setup/go/
[8]: /tests/setup/java/
[9]: /tests/setup/javascript/
[10]: /tests/setup/python/
[11]: /tests/setup/ruby/
[12]: /tests/setup/swift/
[13]: https://app.datadoghq.com/ci/settings/test-optimization/flaky-test-management
[16]: /bits_ai/bits_ai_dev_agent/
[17]: /integrations/guide/source-code-integration/
