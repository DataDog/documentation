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

Browser checks are scenarios executed by Datadog on your web application at configurable periodic intervals, from multiple locations around the world, on multiple devices. These checks verify not only that your applications are up and responding to requests, but that any conditions defined in your scenarios are met.

## Configuration

### Test details

Define the configuration of our Browser check.

{{< img src="synthetics/browser_check/browser_check_configuration.png" alt="Uptime check make request" responsive="true" style="width:80%;">}}

1. Give your Browser Check a name. 
2. Enter the Start URL, this is URL on which your Browser Check starts its scenario.
3. Define on which device to run your check, available devices are: `Laptop Large`, `Tablet`, and `Mobile Small`.
4. Pick-up locations to run the test from, available locations are:
    * Frankfurt (Request made from an AWS Datacenter)
    * Tokyo (Request made from an AWS Datacenter)
5. Choose a Check frequency between 1 run/ 5 min to 1 run/week:

    {{< img src="synthetics/browser_check/check_frequency.png" alt="Uptime check make request" responsive="true" style="width:80%;">}}

### Notifications

A notification is sent if at least one step of the Browser Check scenario is failing, to configure your notifications:

{{< img src="synthetics/browser_check/browser_check_notification.png" alt="Uptime check make request" responsive="true" style="width:80%;">}}

1. Select users and/or [services][1] to send the notifications to.
2. Enter a **message** for the Uptime Check. This field allows standard [Markdown formatting][2]. Notifications message include the **message** defined in this section and information about which assertion failed and why.
3. Click **Save Details and Record Test** to save your Browser Check and start to record your test.

## Record test

**Test can be only recorded from [Google Chrome][3]. To record your test, download the [Datadog Record Test extension for Google Chrome][4].**

{{< img src="synthetics/browser_check/browser_check_record_test.png" alt="Uptime check make request" responsive="true" >}}

1. Optional - Select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issue in the displayed window within Datadog.
2. Click on **Start recording** to begin the recording of your Browser Check.
3. Your Browser Check then records all your interactions and use them to create steps within your Browser Check Scenario.
4. Optional - use the Actions available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_check/browser_check_assertions.png" alt="Uptime check make request" responsive="true" style="width:80%;">}}

5. Once you have finished your Scenario, click on **Save and Launch Test**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/#cat-notification
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: https://www.google.com/chrome
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder-sta/bfgpghinhlklmedgkkpnhphfgdliceel
