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
- link: "https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products"
  tag: "Pricing"
  text: "Synthetic Monitoring pricing"
---

{{< beta-callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Bits Testing is in Preview. Request access to join the waiting list.
{{< /beta-callout >}}

## Overview

Bits Testing is an AI agent that explores your application to map its most critical user journeys. It recommends ways to increase test coverage with minimal effort, and it can generate the Synthetic tests needed to close coverage gaps.

Bits Testing also introduces [Goal-Based Testing][1], a Synthetic test type that uses prompted, non-deterministic, agentic testing to check that users can complete a specific goal in your application.

<div class="alert alert-info">Bits Testing and Goal-Based Testing are in Preview. The experience may change as Datadog iterates on customer feedback.</div>

## Prerequisites

If your application sits behind bot blocking or a web application firewall (WAF), allow the IPs listed under `synthetics` in the [Datadog IP ranges][2] with your provider. To run Bits Testing from a single location, you can allow-list only that location's IP range instead. See [supported locations](#run-bits-testing) for the locations Bits Testing can run from.

## Access Bits Testing

Open Bits Testing from Synthetic Monitoring & Testing using any of the following:

- **Bits Testing** in the Synthetic Monitoring & Testing top navigation.
- `cmd+K` (or `ctrl+K`), then search for Bits Testing.
- **Bits Testing** in the side navigation menu, under Digital Experience > Synthetic Monitoring & Testing.

{{< img src="synthetics/bits_testing/bits_testing_nav_and_prompt.png" alt="The Bits Testing entry point in the Synthetic Monitoring & Testing top navigation, and the prompt where you describe what you want to test" style="width:100%;" >}}

## Run Bits Testing

1. Describe the coverage you want in plain English. For example, ask Bits Testing to increase coverage generally, or to focus on specific features.
1. Select a location to run the exploration from:
   - Frankfurt (GCP: `gcp:europe-west3`)
   - N. Virginia (AWS: `aws:us-east-1`)
   - Ohio (AWS: `aws:us-east-2`)
   - Virginia (Azure: `azure:eastus`)
1. Optionally, select an [Agent Profile](#agent-profiles).
1. Click {{< ui >}}Run Now{{< /ui >}}.

{{< img src="synthetics/bits_testing/bits_testing_run_config.png" alt="The Bits Testing run configuration panel with a starting URL, location, and Agent Profile selectors" style="width:100%;" >}}

Bits Testing explores your application starting from the URL you provide. At each new page it encounters, it determines a set of actions to try, and it repeats this process as it moves through your application.

{{< img src="synthetics/bits_testing/bits_testing_exploration_in_progress.png" alt="A Bits Testing run in progress, exploring an application from its starting URL" style="width:100%;" >}}

### Agent Profiles

An Agent Profile stores context that Bits Testing uses while interacting with your application, such as login credentials.

To create an Agent Profile:

1. Open the {{< ui >}}Agent Profile{{< /ui >}} dropdown menu and select {{< ui >}}+ New Profile{{< /ui >}}.
1. Name the profile.
1. Add one or more variables. For each variable, set:
   - **Usage**: The variable's purpose, for example `username` or `password`.
   - **Value**: Either a typed value, or an existing [Global Variable][3].
1. Click {{< ui >}}Create Profile{{< /ui >}}.

{{< img src="synthetics/bits_testing/bits_testing_agent_profile_modal.png" alt="The New Profile modal for creating an Agent Profile, with fields for name, variable usage, and value" style="width:100%;" >}}

The new profile is automatically selected for the current run. Saved Agent Profiles can be reused in later Bits Testing runs without redefining their variables.

## Review results

When a run completes, Bits Testing displays a graph of the branches it explored:

- **Green** branches led to a relevant user journey that Bits Testing can generate a test for.
- **Indigo** branches didn't yield a relevant journey, either because Bits Testing judged the flow as not relevant or inconsistent, or because it encountered an error.

If a run doesn't complete successfully, the graph shows the error that stopped it.

{{< img src="synthetics/bits_testing/bits_testing_results_graph.png" alt="A completed Bits Testing exploration graph showing the branches explored and the journeys found" style="width:100%;" >}}

## Generated test suites

Click a green journey card to open the AI-generated test suite for that journey. A test suite can include:

- **Browser tests** that replay the interactions a user takes to complete the journey, with assertions along the way.
- **HTTP tests** that validate the endpoints the journey calls to retrieve data.
- **Network path tests** that check the hosts powering the journey are reachable.
- **[Goal-Based tests][1]** that validate the journey using non-deterministic, agentic testing.

Each test in the suite includes a free sample test run. Review the suite and either:

- Click {{< ui >}}Ignore{{< /ui >}} if the suite isn't relevant, and optionally share feedback about why.
- Click {{< ui >}}Start Testing{{< /ui >}} to add the suite's tests to your account.

After you start testing a suite, each test becomes a regular Synthetic test that you can edit or delete. By default, generated tests run every 5 minutes from the location you selected for the Bits Testing run.

{{< img src="synthetics/bits_testing/bits_testing_generated_suite.png" alt="A generated test suite with Browser, HTTP, Network Path, and Goal-Based tests, showing a passed run's details" style="width:100%;" >}}

## FAQ

**1. What does Bits Testing cost?**

During the Preview, running Bits Testing and Goal-Based tests is free. Tests you enable from a Bits Testing run are billed as regular Synthetic tests, based on test runs. See [Synthetic Monitoring pricing][4].

**2. Can Bits Testing run from Private Locations?**

Bits Testing and Goal-Based tests run only from the [locations listed above](#run-bits-testing). Tests generated by Bits Testing don't have this restriction: after they're created, they support the same locations as any other Synthetic test, including [Private Locations][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/goal_based_testing/
[2]: https://docs.datadoghq.com/api/latest/ip-ranges/list-ip-ranges/
[3]: /synthetics/platform/settings/#global-variables
[4]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
[5]: /synthetics/platform/private_locations/
