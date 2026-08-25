---
title: Goal-Based Testing
description: Verify that users can complete a goal in your application with prompted, non-deterministic, agentic Synthetic tests.
private: true
further_reading:
- link: "/synthetics/bits_testing/"
  tag: "Documentation"
  text: "Bits Testing"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Browser Testing"
- link: "/synthetics/test_suites/"
  tag: "Documentation"
  text: "Test Suites"
- link: "https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products"
  tag: "Pricing"
  text: "Synthetic Monitoring pricing"
---

{{< beta-callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Goal-Based Testing is in Preview. Request access to join the waiting list.
{{< /beta-callout >}}

## Overview

Goal-Based Testing is a Synthetic test type that uses prompted, non-deterministic, agentic testing to check that a user can reach a specific goal in your application. It's well suited to testing AI features and to validating critical user journeys that shouldn't require ongoing test maintenance.

Unlike a browser test, a Goal-Based test doesn't follow a fixed, recorded set of steps. Instead, an agent explores your application, trying multiple paths toward the goal you describe.

## Create a Goal-Based test

You can create a Goal-Based test in two ways:

- Let [Bits Testing][1] generate one automatically as part of a journey's test suite.
- Create one manually by clicking {{< ui >}}New Test{{< /ui >}} and selecting Goal-Based test.

{{< img src="synthetics/goal_based_testing/goal_based_test_type_selection.png" alt="The New Synthetics Test dialog with Goal-Based Test selected" style="width:50%;" >}}

When creating a Goal-Based test manually, provide:

- A **starting URL** for the application under test.
- A **goal**, written as a prompt in plain language (for example, "Ask the support chatbot for a product recommendation").
- A **location** to run the test from. See [supported locations](#supported-locations).
- Optionally, an [Agent Profile][2] to reuse variables such as login credentials.

{{< img src="synthetics/goal_based_testing/goal_based_test_creation.png" alt="The New Goal-Based Test panel with starting URL and goal fields" style="width:60%;" >}}

### Supported locations

Goal-Based tests run only from the Datadog managed locations listed in [Run Bits Testing][4].

For pricing, see [Bits Testing billing][3].

## How Goal-Based Testing evaluates a run

After you start a Goal-Based test, the agent explores your application from the starting URL, branching across the different paths a user might take toward the goal.

When the run finishes, the test reports a **Pass** result if one of the explored branches reached the goal. It reports a **Fail** result if no branch reached the goal or the agent ran into an error. Alongside the result, Goal-Based Testing shows:

- A summary explaining the rationale behind the Pass or Fail result.
- Step-by-step navigation through the actions the agent took, so you can review exactly what it tried.

{{< img src="synthetics/goal_based_testing/goal_based_test_run_result.png" alt="A failed Goal-Based test run showing the explored paths, a rationale for the failure, and the final screenshot" style="width:100%;" >}}

## Schedule and edit a test

After the first run completes, click the {{< ui >}}Edit test{{< /ui >}} icon to:

- Schedule the test to run on a recurring basis.
- Edit the test name.
- Add tags.
- Change the selected Agent Profile.

{{< img src="synthetics/goal_based_testing/goal_based_test_schedule.png" alt="The Scheduling step of the Goal-Based test creation wizard, with recurrence interval options" style="width:80%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/bits_testing/
[2]: /synthetics/bits_testing/#agent-profiles
[3]: /synthetics/bits_testing/#billing
[4]: /synthetics/bits_testing/#run-bits-testing
