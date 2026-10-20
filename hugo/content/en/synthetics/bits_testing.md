---
title: Bits Testing
description: Use Bits Testing, an AI agent that explores your application to map critical user journeys and generate covering Synthetic tests.
further_reading:
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
- link: "/synthetics/guide/rum-to-synthetics/"
  tag: "Documentation"
  text: "Generate Synthetic Tests From Session Replay"
- link: "https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products"
  tag: "Pricing"
  text: "Synthetic Monitoring pricing"
---

## Overview

Bits Testing is an AI agent that explores your application to map its most critical user journeys. It recommends ways to increase test coverage, and it can generate the Synthetic tests needed to close coverage gaps.

## Access Bits Testing

Open Bits Testing from Synthetic Monitoring & Testing using any of the following:

- **Bits Testing** in the Synthetic Monitoring & Testing top navigation.
- `Cmd+K` on macOS or `Ctrl+K` on Windows, then search for Bits Testing.
- **Bits Testing** in the side navigation menu, under **Digital Experience > Synthetic Monitoring & Testing**.
- {{< ui >}}Generate a Test With Bits Testing{{< /ui >}} in a session replay's details panel. See [Generate a test from a session replay][10].

## Trigger a Bits Testing job

1. On the Bits Testing page, describe the coverage you want in plain language, or select a suggested prompt. For example, ask Bits Testing to increase coverage generally, or to focus on specific features.
1. Confirm the starting URL. Leave {{< ui >}}Restrict Discovery to the start URL domain{{< /ui >}} enabled to keep Bits Testing from following links to a different domain. Turn it off if your application's sign-in flow redirects off-site and back.
1. Select a location to run the Bits Testing job from:
   - A managed location: Frankfurt (GCP: `gcp:europe-west3`), N. Virginia (AWS: `aws:us-east-1`), Ohio (AWS: `aws:us-east-2`), or Virginia (Azure: `azure:eastus`).
   - A [private location][5] running remote execution. See [Run Bits Testing from a private location](#run-bits-testing-from-a-private-location).
1. Optionally, select a [profile](#profiles).
1. Select a review mode:
   - {{< ui >}}Ask about every action{{< /ui >}}: Pauses before a sensitive action that changes real data, until you approve or deny it. See [Approve or deny sensitive actions](#approve-or-deny-sensitive-actions).
   - {{< ui >}}Auto-approve actions{{< /ui >}}: Never pauses. Use only in test environments.
1. Click {{< ui >}}Start Discovery{{< /ui >}}, or {{< ui >}}Start Discovery Without a Profile{{< /ui >}} if you didn't select a profile.

If your application is behind bot protection or a WAF, see [Troubleshooting](#troubleshooting).

{{< img src="synthetics/bits_testing/start_discovery.png" alt="The Bits Testing job configuration panel with a starting URL, location, profile, and review mode selectors." style="width:80%;" >}}

### Run Bits Testing from a private location

Select a private location to run Discovery against an internal application that only your private network can reach. Bits Testing reaches the application using remote execution. Your private location opens a short-lived tunnel to the application. The Bits Testing job itself runs on Datadog-managed infrastructure, not inside your environment.

Remote execution requires private location worker `v1.74.0` or later. Pull the latest image from the [private location worker page on Docker Hub][9]. Workers on earlier versions keep running but can't be selected for Bits Testing.

Enable remote execution on the private location:

- **New private locations**: In the [creation wizard's][11] "Configure your private location" step, leave the remote execution toggle in its default, off position.
- **Existing private locations**: Upgrade the worker image, then set `disableRemoteExecution` to `false` in the location's [configuration file][12] and redeploy the workers.

The location picker shows each private location's remote execution status when you select it.

Job results list the private location you selected as the job's location.

## Profiles

A profile stores context that Bits Testing uses while interacting with your application, such as login credentials.

To create a profile:

1. Open the {{< ui >}}Profile{{< /ui >}} dropdown menu and select {{< ui >}}\+ New Profile{{< /ui >}}.
1. Name the profile.
1. Add one or more variables. For each variable, set:
   - **Usage**: The variable's purpose, for example, `username` or `password`.
   - **Value**: Either a typed value, or an existing [Global Variable][3].
1. Click {{< ui >}}Create Profile{{< /ui >}}.

The new profile is automatically selected for the current job. Saved profiles can be reused in later Bits Testing jobs without redefining their variables.

{{< img src="synthetics/bits_testing/bits_testing_agent_profile_modal.png" alt="The New Profile modal for creating a profile, with fields for name, variable usage, and value." style="width:100%;" >}}

## Review results

Review a Bits Testing job while it's in progress, as it pauses for approval, or after it completes.

### Discovery in progress

Bits Testing explores your application starting from the URL you provide. At each new page it encounters, it determines a set of actions to try, and it repeats this process as it moves through your application. Click a job under {{< ui >}}My Jobs{{< /ui >}} to view it while it's in progress or after it completes.

{{< img src="synthetics/bits_testing/bits_testing_in_progress.png" alt="A Bits Testing job in progress, exploring an application from its starting URL." style="width:100%;" >}}

### Approve or deny sensitive actions

When review mode is set to {{< ui >}}Ask about every action{{< /ui >}}, Bits Testing pauses before a sensitive action. It displays an {{< ui >}}Approval needed{{< /ui >}} card describing the action and why it needs review.

- Click {{< ui >}}Approve{{< /ui >}} to let Bits Testing continue down that path.
- Click {{< ui >}}Deny{{< /ui >}} to skip the action. Bits Testing stops exploring that branch, marks it as denied in the map, and continues exploring other paths.
- If you don't respond before the approval expires, Bits Testing treats it like a denial and stops exploring that branch.

{{< img src="synthetics/bits_testing/bits_testing_approval_needed.png" alt="Four Approval needed cards for two product review actions, a profile edit, and a sign-up action, each with an explanation and Approve and Deny buttons." style="width:100%;" >}}

{{< img src="synthetics/bits_testing/bits_testing_action_denied.png" alt="The exploration map after an action is denied, showing the branch marked as denied and no longer explored." style="width:100%;" >}}

### Inspect an explored action

Click any node in the map to open a detail panel for that step. The panel shows:

- **Action**: The action Bits Testing took.
- **Page**: The URL where the action occurred.
- **Reasoning**: Why Bits Testing chose this action.
- **Step**: The specific interaction performed. For example, the action **Add product to cart** might correspond to the step **Click Add to cart button**.

Use the panel's navigation controls to move between the screenshots captured during the job.

{{< img src="synthetics/bits_testing/bits_testing_step_detail.png" alt="A step detail panel showing a screenshot, the action taken, the page URL, the agent's reasoning, and the step performed." style="width:90%;" >}}

After a job completes, Bits Testing updates the map to distinguish two kinds of paths:

- **Exploration path**: Every page and action Bits Testing tried while exploring your application.
- **Path to generated journey**: The specific sequence of actions that produced a test suite.

If a job doesn't complete successfully, the map shows the error that stopped it.

{{< img src="synthetics/bits_testing/bits_testing_results_graph.png" alt="A completed Bits Testing exploration map showing the branches explored and the journeys found." style="width:100%;" >}}

## Generated test suites

Click a green journey card to open the AI-generated test suite for that journey. A test suite can include:

- **[Browser tests][6]** that replay the interactions a user takes to complete the journey, with assertions along the way.
- **[HTTP tests][7]** that validate the endpoints the journey calls to retrieve data.
- **[Network path tests][8]** that check the hosts powering the journey are reachable.

Each test in the suite includes a free sample test run. Review the suite and either:

- Click {{< ui >}}Ignore{{< /ui >}} if the suite isn't relevant, and optionally share feedback about why.
- Click {{< ui >}}Start Testing{{< /ui >}} to add the suite's tests to your account.

After you start testing a suite, each test becomes a regular Synthetic test that you can edit or delete. By default, generated tests run every 5 minutes from the location you selected for the Bits Testing job.

{{< img src="synthetics/bits_testing/bits_testing_generated_suite.png" alt="A generated test suite with Browser, HTTP, and Network Path tests, showing a passed run's details." style="width:100%;" >}}

## Supported locations

Bits Testing runs from the managed locations in [Trigger a Bits Testing job](#trigger-a-bits-testing-job), or from a private location using remote execution. Browser, HTTP, and network path tests generated by Bits Testing support the same locations as any other Synthetic test, including [private locations][5].

## Troubleshooting

### Bot protection or a WAF blocks Bits Testing

If your application sits behind bot protection or a web application firewall (WAF), allow the IPs listed under `synthetics` in the [Datadog IP ranges][2] with your provider. To run Bits Testing from a single location, you can allow only that location's IP range instead. See [Trigger a Bits Testing job](#trigger-a-bits-testing-job) for the locations Bits Testing can run from.

Run Bits Testing from a [private location](#run-bits-testing-from-a-private-location) instead of a managed location. Traffic then reaches your application from inside your own network, so bot protection or a WAF that blocks public cloud traffic doesn't block Bits Testing.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /api/latest/ip-ranges/list-ip-ranges/
[3]: /synthetics/platform/settings/#global-variables
[5]: /synthetics/platform/private_locations/
[6]: /synthetics/browser_tests/
[7]: /synthetics/api_tests/http_tests
[8]: /synthetics/network_path_tests/
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: /synthetics/guide/rum-to-synthetics/#generate-a-test-from-a-session-replay
[11]: /synthetics/platform/private_locations/#create-your-private-location
[12]: /synthetics/platform/private_locations/configuration/
