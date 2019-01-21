---
title: Browser Check
kind: documentation
beta: true
description: Simulate and monitor user journeys from specific locations.
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/uptime_check"
  tag: "Documentation"
  text: "Configure an Uptime Check"
---

## Overview

Browser Checks are scenarios executed by Datadog on your web application at configurable periodic intervals, from multiple locations around the world, on multiple devices. These checks verify not only that your applications are up and responding to requests, but that any conditions defined in your scenarios are met.

## Configuration

### Test details

Define the configuration of our Browser Check.

{{< img src="synthetics/browser_check/browser_check_configuration.png" alt="Browser Check make request" responsive="true" style="width:80%;">}}

1. Give your Browser Check a name. 
2. Enter the Start URL. This is URL on which your Browser Check starts its scenario.
3. Define on which device to run your check. Available devices are: `Laptop Large`, `Tablet`, and `Mobile Small`.
4. Pick-up locations to run the test from. Available locations are:
    * Frankfurt (Request made from an AWS Datacenter)
    * Tokyo (Request made from an AWS Datacenter)
5. Choose a Check frequency between "1 run per 5 minute interval" to "1 run per week":

    {{< img src="synthetics/browser_check/check_frequency.png" alt="Check frequency" responsive="true" style="width:80%;">}}

### Notifications

A notification is sent if at least one step of the Browser Check scenario fails. To configure your notifications:

{{< img src="synthetics/browser_check/browser_check_notification.png" alt="Browser check notification" responsive="true" style="width:80%;">}}

1. Select users and/or [services][1] to send the notifications to.
2. Enter a **message** for the Browser Check. This field allows standard [Markdown formatting][2]. Notification messages include the **message** defined in this section and information about which assertion failed and why.
3. Click **Save Details and Record Test** to save your Browser Check.
4. Start to record your test.

## Record test

**Tests can be only recorded from [Google Chrome][3]. To record your test, download the [Datadog Record Test extension for Google Chrome][4].**


{{< img src="synthetics/browser_check/browser_check_record_test.png" alt="Browser check record test" responsive="true" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issues in the displayed window within Datadog interface.
2. Click on **Start recording** to begin recording your Browser Check.
3. Your actions are recorded and used to create steps within your Browser Check Scenario.
4. Optionally, use the Actions available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_check/browser_check_assertions.png" alt="Browser Check assertions" responsive="true" style="width:80%;">}}

5. Once you have finished your Scenario, click on **Save and Launch Test**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/#cat-notification
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: https://www.google.com/chrome
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder-sta/bfgpghinhlklmedgkkpnhphfgdliceel
