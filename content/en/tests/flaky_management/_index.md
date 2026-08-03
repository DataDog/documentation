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
- link: "https://learn.datadoghq.com/courses/getting-started-test-optimization"
  tag: "Learning Center"
  text: "Getting Started with Test Optimization"
---

## Overview

The [Flaky Tests Management][1] page provides a centralized view to track, triage, and remediate flaky tests across your organization. You can view every test's state along with key impact metrics like number of pipeline failures, CI time wasted, and failure rate.

From this UI, you can act on flaky tests to mitigate their impact. Quarantine or disable problematic tests to keep known flakes from breaking builds, and create cases and Jira issues to track work toward fixes.

Each flaky test has a stable, unique identifier derived from a hash of the repository ID and the test's fully qualified name. In the Test Optimization Explorer, this is the `@test.fingerprint_fqn` facet. In the [Flaky Tests Management API][18], it is the test's `id`, and you can filter the Search flaky tests endpoint using the `fingerprint_fqn` key. Use this identifier to look up or update a specific test through the API.

{{< img src="tests/flaky_management-2.png" alt="Overview of the Flaky Tests Management UI" style="width:100%;" >}}

## Change a flaky test's state

Use the state drop-down to change how a flaky test is handled in your CI pipeline. This can help reduce CI noise while retaining traceability and control. Available states are:

| State     | Description |
| ----------- | ----------- |
| {{< ui >}}Active{{< /ui >}} | The test is known to be flaky and is running in CI. |
| {{< ui >}}Quarantined{{< /ui >}} | Keep the test running in the background, but failures don't affect CI status or break pipelines. This is useful for isolating flaky tests without blocking merges. Datadog tags test run events with `@test.test_management.is_quarantined:true` when quarantined. |
| {{< ui >}}Disabled{{< /ui >}} | Skip the test entirely in CI. Use this when a test is no longer relevant or needs to be temporarily removed from the pipeline. Datadog tags test run events with `@test.test_management.is_disabled:true` when disabled. |
| {{< ui >}}Fixed{{< /ui >}} | The test has passed consistently and is no longer flaky. If supported, use the [remediation flow](#confirm-fixes-for-flaky-tests) to confirm the fix and automatically apply this state after it is merged into the default branch. |

<div class="alert alert-info">State actions have minimum version requirements for each programming language's instrumentation library. See <a href="#compatibility">Compatibility</a> for details.</div>

## Configure policies to automate the flaky test lifecycle

Configure automated Flaky Test Policies to govern how flaky tests are handled in each repository. For example, a test that flakes in the default branch can automatically be quarantined, and later disabled if it remains unfixed after 30 days.

1. Click the {{< ui >}}Policy Settings{{< /ui >}} button at the upper right of the Flaky Management page. You can also open [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}][13] and click the {{< ui >}}Flaky Test Policies{{< /ui >}} row to configure the default policies for your organization or override them per repository.
2. Search for and select the repository you want to configure. This opens the {{< ui >}}Flaky Test Policies{{< /ui >}} side panel.
    {{< img src="tests/flaky-policies-4.png" alt="Flaky Test Policies page with the Edit Policies flyout open to configure a policy." style="width:100%;" >}}

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
         <td>{{< ui >}}Quarantine{{< /ui >}}</td>
         <td>
           <p>Toggle to allow flaky tests to be quarantined for this repository.</p>
           <p>Customize automation rules based on:</p>
           <ul>
             <li>{{< ui >}}Time{{< /ui >}}: Quarantine a test if its state is <code>Active</code> for a specified number of days. The rule is triggered every day at 12:15 UTC.</li>
             <li>{{< ui >}}Branch{{< /ui >}}: Quarantine an <code>Active</code> test if it flakes in one or more specified branches.</li>
             <li>{{< ui >}}Failure rate{{< /ui >}}: Quarantine an <code>Active</code> test if its failure rate over the last 7 days is greater or equal to the specified threshold. The rule is triggered every 15 minutes.</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td>{{< ui >}}Disable{{< /ui >}}</td>
         <td>
           <p>Toggle to allow flaky tests to be disabled for this repository. You may want to do this after quarantining or to protect specific branches from flakiness.</p>
           <p>Customize automation rules based on:</p>
           <ul>
             <li>{{< ui >}}State and time{{< /ui >}}: Disable a test if it has a specified state for a specified number of days. The rule is triggered every day at 12:30 UTC.</li>
             <li>{{< ui >}}Branch{{< /ui >}}: Disable an <code>Active</code> or <code>Quarantined</code> test if it flakes in one or more specified branches.</li>
             <li>{{< ui >}}Failure rate{{< /ui >}}: Disable an <code>Active</code> or <code>Quarantined</code> test if its failure rate over the last 7 days is greater or equal to the specified threshold. The rule is triggered every 15 minutes.</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td>{{< ui >}}Attempt&nbsp;to&nbsp;Fix{{< /ui >}}</td>
         <td>When you attempt to fix a flaky test, automatically retry the test a specified number of times on the commit containing the fix.</td>
       </tr>
       <tr>
         <td>{{< ui >}}Fixed{{< /ui >}}</td>
         <td>
           <p>If a flaky test no longer flakes for 30 days, it is automatically moved to the Fixed state. This automation is default behavior and can't be customized.</p>
           <p>Before Datadog automatically moves a flaky test to {{< ui >}}Fixed{{< /ui >}}, it checks whether the test may be broken rather than fixed. A broken test is a flaky test whose recent executions all failed, resulting in a 100% failure rate over the last 7 days. Datadog does not automatically mark these tests as fixed, which helps prevent quarantined tests that still fail from breaking CI again.</p>
           <p>Use the {{< ui >}}Broken test{{< /ui >}} facet in the Flaky Tests Management explorer to identify these tests. Filter on <code>broken_test:true</code> to show tests with a 100% failure rate over the last 7 days.</p>
         </td>
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

- {{< ui >}}View Last Failed Test Run{{< /ui >}}: Open the side panel with the details of the test's most recent failed run.
- {{< ui >}}View related test executions{{< /ui >}}: Open the [Test Optimization Explorer][3] populated with all of the test's recent runs.

## Create cases for flaky tests

For any flaky test, you can create a case and use [Case Management][4] to track any work toward remediation. Click the {{< ui >}}Create Case{{< /ui >}} button or use the actions menu at the end of the row.

## Confirm fixes for flaky tests

When you fix a flaky test, Test Optimization's remediation flow can confirm the fix by retrying the test multiple times. To enable the remediation flow:

1. For the test you are fixing, click {{< ui >}}Link commit to Flaky Test fix{{< /ui >}} in the Flaky Tests Management UI.
1. Copy the unique flaky test key that is displayed (for example, `DD_ABC123`).
1. Include the test key in your Git commit title or message for the fix (for example, `git commit -m "DD_ABC123"`).
1. When Datadog detects the test key, it automatically triggers the remediation flow for that test. The key does not need to be in the most recent commit. Datadog also checks recent preceding commits, so the flow still triggers when you push several commits together or when your CI provider reports only the most recent commit. The remediation flow:
    - Retries any tests you're attempting to fix 20 times (or the number of retries you specified in your [Flaky Test Policies configuration](#configure-policies-to-automate-the-flaky-test-lifecycle)).
      - Tags every retry with `@test.test_management.is_attempt_to_fix:true` in test run events.
    - Runs tests even if they are marked as `Disabled`.
    - If all retries pass, marks the fix as {{< ui >}}in progress{{< /ui >}} in the Flaky Tests Management UI, associates it with the branch used for the fix, and waits for that branch to be merged.
      - Tags the last test retry with `@test.test_management.attempt_to_fix_passed:true` in test run events.
      - Starts a 14-day [grace period](#grace-period-mechanism) to give time for the fix to propagate everywhere in the repository.
    - If any retry fails, keeps the test's current state (`Active`, `Quarantined`, or `Disabled`).
      - Tags the last test retry with `@test.test_management.attempt_to_fix_passed:false` in test run events.

### Track fixes that are in progress

After a successful remediation run, Flaky Tests Management tracks the branch containing the fix and displays a {{< ui >}}Fix in progress{{< /ui >}} indicator until the fix reaches the repository's default branch. When the associated pull request merges, the test automatically moves to `Fixed` and the indicator is removed. If the fix is pushed directly to the default branch, the test is marked `Fixed` immediately.

Requirements and limitations:
- Source Code Integration must be configured for a supported SCM provider (GitHub, GitLab, or Azure DevOps) so Datadog can receive pull request merge webhooks. See [Source Code Integration setup][17].
- Renaming or deleting the feature branch after the remediation run prevents Datadog from detecting the merge.
- Branches with fixes older than three months stop being monitored; rerun the remediation flow to refresh tracking.
- If your SCM provider isn't supported or Source Code Integration isn't set up, Datadog cannot detect merges automatically. Manually transition the test to `Fixed` after the fix is deployed.

### Grace period mechanism

After you fix a flaky test, it can take time for the fix to propagate to all branches, which can cause the test to keep flaking in stale branches. A grace period mechanism prevents flaky tests from appearing on stale branches after the fix is applied.

A 14-day grace period applies to every flaky test with a successful fix after using the [remediation flow](#confirm-fixes-for-flaky-tests). During this period, Datadog treats the test based on its status before the grace period started:
- If the test was {{< ui >}}Active{{< /ui >}} or {{< ui >}}Quarantined{{< /ui >}}, Datadog treats the test as {{< ui >}}Quarantined{{< /ui >}}.
- If the test was {{< ui >}}Disabled{{< /ui >}}, Datadog treats the test as {{< ui >}}Disabled{{< /ui >}}.

This method avoids unnecessary CI failures and saves developer time.

## Bits AI-powered flaky test fixes

After Test Optimization detects a flaky test, [Bits Code][16] can automatically diagnose and fix it. Bits Code analyzes the test's failure patterns and generates production-ready code changes. You can then create a GitHub pull request directly from Bits Code's suggestions.

For Bits Code to create a fix, the flaky test must meet the following criteria:
- **Failure rate**: At least 5%
- **Wasted time**: At least 2 hours
- **Failed pipelines**: At least 2 pipelines
- **Branch**: Must have flaked in the default branch
- **Failed executions**: Must have at least 1 failed execution that includes both `@error.message` and `@test.source.file` tags

{{< img src="tests/bits_ai_flaky_test_fixes-2.png" alt="Bits Code displaying a proposed fix for a flaky test" style="width:100%;" >}}

### Setup

To allow Bits Code to suggest flaky test fixes, enable Bits Code for Test Optimization by following the setup instructions in the [Bits Code documentation][16]. Bits Code automatically creates fixes for flaky tests detected by Test Optimization.

After you have enabled Bits Code, when viewing a flaky test, click {{< ui >}}Generate fix{{< /ui >}}.

## AI-powered flaky test categorization

Flaky Tests Management uses AI to automatically assign a root cause category to each flaky test based on execution patterns and error signals. This helps you filter, triage, and prioritize flaky tests more effectively.

<div class="alert alert-info">A test must have at least one failed execution that includes both <code>@error.message</code> and <code>@error.stack</code> tags to be eligible for categorization. If the test was recently detected, categorization may take several minutes to complete.</div>

### Categories

| Category                | Description |
|-------------------------|-------------|
| {{< ui >}}Concurrency{{< /ui >}}         | Test that invokes multiple threads interacting in an unsafe or unanticipated manner. Flakiness is caused by, for example, race conditions resulting from implicit assumptions about the ordering of execution, leading to deadlocks in certain test runs. |
| {{< ui >}}Randomness{{< /ui >}}          | Test uses the result of a random data generator. If the test does not account for all possible cases, then the test may fail intermittently, e.g., only when the result of a random number generator is zero. |
| {{< ui >}}Floating Point{{< /ui >}}      | Test uses the result of a floating-point operation. Floating-point operations can suffer from precision over- and under-flows, non-associative addition, etc., which—if not properly accounted for—can result in inconsistent outcomes (e.g., comparing a floating-point result to an exact real value in an assertion). |
| {{< ui >}}Unordered Collection{{< /ui >}}| Test assumes a particular iteration order for an unordered-collection object. Since no order is specified, tests that assume a fixed order will likely be flaky for various reasons (e.g., collection-class implementation). |
| {{< ui >}}Too Restrictive Range{{< /ui >}}| Test whose assertions accept only part of the valid output range. It intermittently fails on unhandled corner cases. |
| {{< ui >}}Timeout{{< /ui >}}             | Test fails due to time limitations, either at the individual test level or as part of a suite. This includes tests that exceed their execution time limit (e.g., single test or the whole suite) and fail intermittently due to varying execution times. |
| {{< ui >}}Order Dependency{{< /ui >}}    | Test depends on a shared value or resource modified by another test. Changing the test-run order can break those dependencies and produce inconsistent outcomes. |
| {{< ui >}}Resource Leak{{< /ui >}}       | Test improperly handles an external resource (e.g., failing to release memory). Subsequent tests that reuse the resource may become flaky. |
| {{< ui >}}Asynchronous Wait{{< /ui >}}   | Test makes an asynchronous call or waits for elements to load/render and does not explicitly wait for completion (often using a fixed delay). If the call or rendering takes longer than the delay, the test fails. |
| {{< ui >}}IO{{< /ui >}}                  | Test is flaky due to its handling of input/output—for example, failing when disk space runs out during a write. |
| {{< ui >}}Network{{< /ui >}}             | Test depends on network availability (e.g., querying a server). If the network is unavailable or congested, the test may fail. |
| {{< ui >}}Time{{< /ui >}}                | Test relies on system time and may be flaky due to precision or timezone discrepancies (e.g., failing when midnight passes in UTC). |
| {{< ui >}}Environment Dependency{{< /ui >}} | Test depends on specific OS, library versions, or hardware. It may pass on one environment but fail on another, especially in cloud-CI environments where machines vary nondeterministically. |
| {{< ui >}}Unknown{{< /ui >}}             | Test is flaky for an unknown reason. |

## Receive notifications

Set up notifications to track changes to your flaky tests. Notifications are sent when:
- A new flaky test is detected on the default branch of the repository.
- A user or policy changes the state of a flaky test.
- The remediation flow for a flaky test succeeds or fails.

You can send notifications to email addresses or Slack channels (see the [Datadog Slack integration][5]), and route messages based on test code owners. When multiple code owners are specified, a flaky test must be owned by all specified code owners for the notification rule to match. If no code owners are specified, all selected recipients are notified of all flaky test changes in the repository. Configure notifications for each repository from the [{{< ui >}}Flaky Test Policies{{< /ui >}}][13] side panel in CI/CD Optimization settings.

Notifications are bundled over a short period to reduce noise. The weekly digest summary is only sent to notification rules that have code owners configured.

### Notification types

| Notification type | Description |
|---|---|
| {{< ui >}}New flaky test detected{{< /ui >}} | A new flaky test is detected on the default branch of the repository. |
| {{< ui >}}Test quarantined{{< /ui >}} | A test is quarantined by an automated policy rule (time-based, branch-based, or failure rate). |
| {{< ui >}}Test disabled{{< /ui >}} | A test is disabled by an automated policy rule (time-based, branch-based, or failure rate). |
| {{< ui >}}Fix successful{{< /ui >}} | A test passes all retries in the remediation flow and is marked as "fix in progress". |
| {{< ui >}}Fix failed{{< /ui >}} | A test fails during the remediation flow. |
| {{< ui >}}Manual state change{{< /ui >}} | A user manually changes the state of a flaky test. |
| {{< ui >}}Weekly digest summary{{< /ui >}} | **Beta**: A weekly summary sent every Monday, reporting the current state of flaky tests and changes since the previous week, grouped by repository and code owner. Only sent to notification rules that have code owners configured, and can be turned off per rule from the rule's notification settings. |

{{< img src="tests/flaky_management_notifications_settings-3.png" alt="Notifications settings UI." style="width:100%;" >}}

## Compatibility

To use Flaky Tests Management features, you must use Datadog's native instrumentation for your test framework. The table below outlines the minimum versions of each Datadog SDK required to quarantine, disable, and attempt to fix flaky tests. Click a language name for setup information:

| Language        | Quarantine & Disable          | Attempt to fix               |
| --------------- | ----------------------------- | ---------------------------- |
| [.NET][6]       | 3.13.0+                       | 3.23.0+                      |
| [Go][7]         | 1.73.0+ (Orchestrion v1.3.0+) | 2.2.2+ (Orchestrion v1.6.0+) |
| [Java][8]       | 1.47.0+                       | 1.52.0+                      |
| [JavaScript][9] | 5.44.0+                       | 5.59.0+                      |
| [Python][10]    | 3.3.0+                        | 3.8.0+                       |
| [Ruby][11]      | 1.13.0+                       | 1.17.0+                      |
| [Swift][12]     | 2.6.1+                        | 2.6.1+                       |

## Troubleshooting

### Slack notifications are not delivered

If Slack notifications are not being delivered, check that your notification rule uses the `@slack-ACCOUNT-CHANNEL` format.

If you are using `@slack-CHANNEL` (without the account name), the notification is routed to the first configured Slack account. For organizations with multiple Slack workspaces, this may not be the intended workspace.

To find your account name, go to the [Slack integration tile][5] and check the
{{< ui >}}Account Name{{< /ui >}} field for the workspace you want to use.

### Attempt-to-fix remediation does not trigger after linking a fix

After you include the test key (for example, `DD_ABC123`) in a commit, Datadog scans the commit that triggered the test run and up to the 10 most recent commits before it. If the remediation flow does not start, check the following:

- **The key is in an older commit.** Datadog scans only the triggering commit and the 10 most recent commits in its history. If you push more than 10 commits at once, include the key in the triggering commit or one of the 10 most recent commits.
- **The fix was squash-merged.** A squash merge combines the original commits into a single commit, so Datadog reads only the squash commit's message; the individual pre-squash commits are no longer scanned. Most providers include the original commit messages in the squash commit, so a key in any of them is preserved. If your provider omits them, add the key to the squash commit message.
- **The key does not match the expected format.** Use the exact key shown in the Flaky Tests Management UI (for example, `DD_ABC123`) in the commit title or message.

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
[13]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[16]: /bits_ai/bits_code/
[17]: /integrations/guide/source-code-integration/
[18]: /api/latest/test-optimization/
