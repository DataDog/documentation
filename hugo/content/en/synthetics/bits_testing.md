---
title: Bits Testing
description: Use Bits Testing, an AI agent that explores your application to map critical user journeys and generate covering Synthetic tests.
private: true
further_reading:
- link: "/synthetics/goal_based_testing/"
  tag: "Documentation"
  text: "Goal-Based Testing"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Browser Testing"
- link: "/synthetics/api_tests/http_tests"
  tag: "Documentation"
  text: "HTTP Tests"
- link: "/synthetics/network_path_tests/"
  tag: "Documentation"
  text: "Network Path Testing"
- link: "/synthetics/test_suites/"
  tag: "Documentation"
  text: "Test Suites"
- link: "/synthetics/platform/settings/#global-variables"
  tag: "Documentation"
  text: "Global Variables"
- link: "/synthetics/platform/private_locations/"
  tag: "Documentation"
  text: "Run Synthetic Tests from Private Locations"
- link: "https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products"
  tag: "Pricing"
  text: "Synthetic Monitoring pricing"
---

{{< callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Bits Testing is in Preview. Request access to join the waiting list.
{{< /callout >}}

## Overview

Bits Testing is an AI agent that explores your application to map its most critical user journeys. It recommends ways to increase test coverage, and it can generate the Synthetic tests needed to close coverage gaps.

Bits Testing can also generate [Goal-Based tests][1]. This Synthetic test type uses prompted, non-deterministic, agentic testing to check that users can complete a specific goal in your application.

## Prerequisites

If your application sits behind bot protection or a web application firewall (WAF), allow the IPs listed under `synthetics` in the [Datadog IP ranges][2] with your provider. To run Bits Testing from a single location, you can allow only that location's IP range instead. See [Run Bits Testing](#run-bits-testing) for the locations Bits Testing can run from.

This allowlisting isn't necessary when you run Bits Testing from a private location, because traffic reaches your application from inside your own network.

## Access Bits Testing

Open Bits Testing from Synthetic Monitoring & Testing using any of the following:

- **Bits Testing** in the Synthetic Monitoring & Testing top navigation.
- `Cmd+K` on macOS or `Ctrl+K` on Windows, then search for Bits Testing.
- **Bits Testing** in the side navigation menu, under **Digital Experience > Synthetic Monitoring & Testing**.

## Run Bits Testing

1. On the Bits Testing page, describe the coverage you want in plain language, or select a suggested prompt. For example, ask Bits Testing to increase coverage generally, or to focus on specific features.
1. Confirm the starting URL. Leave {{< ui >}}Restrict Discovery to the start URL domain{{< /ui >}} enabled to keep Bits Testing from following links to a different domain. Turn it off if your application's sign-in flow redirects off-site and back.
1. Select a location to run the Discovery job from:
   - A managed location: Frankfurt (GCP: `gcp:europe-west3`), N. Virginia (AWS: `aws:us-east-1`), Ohio (AWS: `aws:us-east-2`), or Virginia (Azure: `azure:eastus`).
   - A [private location][5] running remote execution. See [Run Bits Testing from a private location](#run-bits-testing-from-a-private-location).
1. Optionally, select an [Agent Profile](#agent-profiles-optional).
1. Select a review mode:
   - {{< ui >}}Ask about every action{{< /ui >}}: Pauses before a sensitive action, such as a purchase or deletion, until you approve or deny it. See [Approve or deny sensitive actions](#approve-or-deny-sensitive-actions).
   - {{< ui >}}Auto-approve actions{{< /ui >}}: Never pauses. Use only in test environments.
1. Click {{< ui >}}Start Discovery{{< /ui >}}.

{{< img src="synthetics/bits_testing/start_discovery.png" alt="The Bits Testing job configuration panel with a starting URL, location, Agent Profile, and review mode selectors" style="width:80%;" >}}

### Run Bits Testing from a private location

Select a private location to run Discovery against an internal application that only your private network can reach. Bits Testing reaches the application using remote execution. Your private location opens a short-lived tunnel to the application. The Discovery job itself runs on Datadog-managed infrastructure, not inside your environment.

Remote execution requires Private Location `v1.74.0-rc.2` or later. Pull the latest image from the [private location worker page on Docker Hub][9]. Workers on earlier versions keep running but can't be selected for Bits Testing.

In results, the private location you selected stays listed as the location that ran the job.

### Discovery in progress

Bits Testing explores your application starting from the URL you provide. At each new page it encounters, it determines a set of actions to try, and it repeats this process as it moves through your application. Click a job under {{< ui >}}My Jobs{{< /ui >}} to view it while it's in progress or after it completes.

{{< img src="synthetics/bits_testing/bits_testing_in_progress.png" alt="A Bits Testing job in progress, exploring an application from its starting URL" style="width:100%;" >}}

### Approve or deny sensitive actions

When review mode is set to {{< ui >}}Ask about every action{{< /ui >}}, Bits Testing pauses before a sensitive action. It displays an {{< ui >}}Approval needed{{< /ui >}} card describing the action and why it needs review.

- Click {{< ui >}}Approve{{< /ui >}} to let Bits Testing continue down that path.
- Click {{< ui >}}Deny{{< /ui >}} to stop. Bits Testing stops exploring that specific user journey but continues exploring other paths.

{{< img src="synthetics/bits_testing/bits_testing_approval_needed.png" alt="Two Approval needed cards for a sign-up and a profile edit action, each with an explanation and Approve and Deny buttons" style="width:100%;" >}}

A denied action ends that branch of exploration. The map marks the branch as denied and stops exploring it.

{{< img src="synthetics/bits_testing/bits_testing_action_denied.png" alt="The exploration map after an action is denied, showing the branch marked as denied and no longer explored" style="width:100%;" >}}

### Inspect an explored action

Click any node in the map to open a detail panel for that step, including:

- **Action**: The action Bits Testing took.
- **Page**: The URL where the action occurred.
- **Reasoning**: Why Bits Testing chose this action.
- **Step**: The specific interaction performed.

Use the panel's navigation controls to move between the screenshots captured during the job.

{{< img src="synthetics/bits_testing/bits_testing_step_detail.png" alt="A step detail panel showing a screenshot, the action taken, the page URL, the agent's reasoning, and the step performed" style="width:90%;" >}}

## Agent Profiles (Optional)

An Agent Profile stores context that Bits Testing uses while interacting with your application, such as login credentials.

To create an Agent Profile:

1. Open the {{< ui >}}Agent Profile{{< /ui >}} dropdown menu and select {{< ui >}}\+ New Profile{{< /ui >}}.
1. Name the profile.
1. Add one or more variables. For each variable, set:
   - **Usage**: The variable's purpose, for example, `username` or `password`.
   - **Value**: Either a typed value, or an existing [Global Variable][3].
1. Click {{< ui >}}Create Profile{{< /ui >}}.

The new profile is automatically selected for the current job. Saved Agent Profiles can be reused in later Bits Testing jobs without redefining their variables.

{{< img src="synthetics/bits_testing/bits_testing_agent_profile_modal.png" alt="The New Profile modal for creating an Agent Profile, with fields for name, variable usage, and value" style="width:100%;" >}}

## Review results

When a job completes, Bits Testing displays a map of the branches it explored:

- **Successful (green)** branches led to a relevant user journey that Bits Testing can generate a test for.
- **Unsuccessful (indigo)** branches didn't yield a relevant journey, either because Bits Testing judged the flow as not relevant or inconsistent, or because it encountered an error.

If a job doesn't complete successfully, the map shows the error that stopped it.

{{< img src="synthetics/bits_testing/bits_testing_results_graph.png" alt="A completed Bits Testing exploration map showing the branches explored and the journeys found" style="width:100%;" >}}

## Generated test suites

Click a green journey card to open the AI-generated test suite for that journey. A test suite can include:

- **[Browser tests][6]** that replay the interactions a user takes to complete the journey, with assertions along the way.
- **[HTTP tests][7]** that validate the endpoints the journey calls to retrieve data.
- **[Network path tests][8]** that check the hosts powering the journey are reachable.
- **[Goal-Based tests][1]** that validate the journey using non-deterministic, agentic testing.

Each test in the suite includes a free sample test run. Review the suite and either:

- Click {{< ui >}}Ignore{{< /ui >}} if the suite isn't relevant, and optionally share feedback about why.
- Click {{< ui >}}Start Testing{{< /ui >}} to add the suite's tests to your account.

After you start testing a suite, each test becomes a regular Synthetic test that you can edit or delete. By default, generated tests run every 5 minutes from the location you selected for the Bits Testing job.

{{< img src="synthetics/bits_testing/bits_testing_generated_suite.png" alt="A generated test suite with Browser, HTTP, Network Path, and Goal-Based tests, showing a passed run's details" style="width:100%;" >}}

## Billing

During the Preview, running Bits Testing and Goal-Based tests is free. Tests you enable from a Bits Testing job are billed as regular Synthetic tests, based on test runs. See [Synthetic Monitoring pricing][4].

## Supported locations

Bits Testing and Goal-Based tests run from the managed locations in [Run Bits Testing](#run-bits-testing), or from a private location using remote execution. Browser, HTTP, and network path tests generated by Bits Testing don't have this restriction. After they're created, they support the same locations as any other Synthetic test, including [private locations][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/goal_based_testing/
[2]: /api/latest/ip-ranges/list-ip-ranges/
[3]: /synthetics/platform/settings/#global-variables
[4]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
[5]: /synthetics/platform/private_locations/
[6]: /synthetics/browser_tests/
[7]: /synthetics/api_tests/http_tests
[8]: /synthetics/network_path_tests/
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
