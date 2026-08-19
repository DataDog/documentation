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

<div class="alert alert-info">Goal-Based Testing is in Preview. The experience may change as Datadog iterates on customer feedback.</div>

## Create a Goal-Based test

Goal-Based tests are created in either of the following ways:

- Generated automatically by [Bits Testing][1] as part of a journey's test suite.
- Created manually by clicking {{< ui >}}New Test{{< /ui >}} and selecting Goal-Based test.

When creating a Goal-Based test manually, provide:

- A **starting URL** for the application under test.
- A **goal**, written as a prompt in plain English (for example, "Ask the support chatbot for a product recommendation").
- A **location** to run the test from. See [supported locations](#supported-locations).
- Optionally, an [Agent Profile][2] to reuse variables such as login credentials.

{{< img src="synthetics/goal_based_testing/goal_based_test_creation.png" alt="The New Synthetics Test dialog with Goal-Based Test selected, and the New Goal-Based Test panel with starting URL and goal fields" style="width:100%;" >}}

### Supported locations

Goal-Based tests run only from the following cloud locations:

- Frankfurt (GCP: `gcp:europe-west3`)
- N. Virginia (AWS: `aws:us-east-1`)
- Ohio (AWS: `aws:us-east-2`)
- Virginia (Azure: `azure:eastus`)

For pricing and Private Locations details, see the [Bits Testing FAQ][3].

## How it works

After you start a Goal-Based test, the agent explores your application from the starting URL, branching across the different paths a user might take toward the goal.

When the run finishes, the test reports a **Pass** or **Fail** result, based on whether one of the explored branches reached the goal or ran into an error. Alongside the result, Goal-Based Testing shows:

- A summary explaining the rationale behind the Pass or Fail result.
- Step-by-step navigation through the actions the agent took, so you can review exactly what it tried.

{{< img src="synthetics/goal_based_testing/goal_based_test_run_result.png" alt="A failed Goal-Based test run showing the explored paths, a rationale for the failure, and the final screenshot" style="width:100%;" >}}

## Schedule and edit a test

After the first run completes, click the {{< ui >}}Edit test{{< /ui >}} icon to:

- Schedule the test to run on a recurring basis.
- Edit the test name.
- Add tags.
- Change the selected Agent Profile.

{{< img src="synthetics/goal_based_testing/goal_based_test_schedule.png" alt="The Goal-Based test edit page with the user goal and scheduling options" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/bits_testing/
[2]: /synthetics/bits_testing/#agent-profiles
[3]: /synthetics/bits_testing/#faq
