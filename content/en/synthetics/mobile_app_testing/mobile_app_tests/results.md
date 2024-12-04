---
title: Mobile App Testing Results
description: View Synthetic mobile app test results and compare successful or failed sample runs to test runs.
aliases:
- /mobile_testing/mobile_app_tests/results
- /mobile_app_testing/mobile_app_tests/results
further_reading:
- link: "/synthetics/mobile_app_testing/mobile_app_tests/"
  tag: "Documentation"
  text: "Learn about Synthetic mobile tests"
- link: "/service_management/events/explorer"
  tag: "Documentation"
  text: "Learn about the Events Explorer"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}

## Overview

Click on a mobile app test on the [**Synthetic Tests** page][11] to see the Test Details page. The Test Details page contains all the information relating to your test, including test properties, test history, sample runs, and test runs.

{{< img src="mobile_app_testing/test_details.png" alt="The Test Details page" style="width=80%" >}}

Test runs appear in a test details page after a Synthetic mobile app test executes. [Sample results](#sample-results) correlate to the latest passed and failed test executions over a time interval and in a specific number of locations and devices.

## Test properties

In the **Properties** section, you can see the test ID, test creation and edit dates, test priority, environment tag, and additional tags.

**Overview**
: This section describes the Synthetic test details, including the mobile application, version, location, number of devices, test interval, and the number of test steps.

**Monitor**
: This section contains the name of the [Synthetic test's monitor][1] and the configured notification message.

**CI/CD Execution**
: This section contains a dropdown menu to change the [execution rule][2] for this test running as part of a [CI pipeline][3].

## Test history

In the **History** section, you can see the **Global Uptime** graph, which displays the total uptime of all test locations in a given time interval. The global uptime takes into consideration the [alert conditions][4] configured for a test.

{{< img src="mobile_app_testing/history.png" alt="The History graph displays global uptime" style="width=80%" >}}

## Sample results

Mobile app test runs include components such as [screenshots](#screenshots-and-actions) to help troubleshoot your [test failure](#failed-results).

In the **Sample Runs** section, you can examine the latest failed test runs and compare them to recent successful test runs.

### Overview attributes

Status
: The status of your test run (`PASSED` or `FAILED`).

Starting URL
: The URL of your mobile app test scenario.

Steps
: The number of [test steps][10] completed in your sample run.

Duration
: The amount of time it took your test to run.

Location
: The [managed][8] or [private location][9] your test was executed from.

Device
: The type of device your test was executed from.

Run type
: The type of test run (CI, manually triggered, or scheduled).

Records
: Download device logs that have been captured for your test runs to aid in debugging.

### Screenshots and actions

Every executed test step contains a screenshot of the step action, step action name, step ID, and step duration.

{{< img src="mobile_app_testing/screenshot-and-action.png" alt="Screenshots and actions in the Sample Runs section of the test details" style="width=80%" >}}

### XML highlighting 

Results of steps contain the XML representation of the screen being tested, as well as the ability to hover over the screenshot or the XML to highlight specific elements of the app. 
Click an element to view additional attributes:

{{< img src="mobile_app_testing/xml_inspector.png" alt="Screenshot of a test result under the Sample Runs section, showing the XML inspector" style="width=80%" >}}

## Crash reports

View and download crash reports for your iOS and Android devices in the [Results Explorer][12].

{{< tabs >}}
{{% tab "iOS" %}}

In the Results Explorer, filter and search for crash reports with the query `@checkType:mobile @result.result.error:"Your application has crashed during the test." @result.result.device.platform.name:ios` to identify, view, and download crash reports for your iOS devices:

{{< img src="mobile_app_testing/ios_search.png" alt="Screenshot the Results Explorer using filter and search to locate iOS crash results" style="width=80%" >}}

Select a failed test and download the crash report:

{{< img src="mobile_app_testing/ios_crash_report.png" alt="Screenshot of a test result highlighting the ability to download the iOS crash report" style="width=80%" >}}

{{% /tab %}}
{{% tab "Android" %}}

In the Results Explorer, filter and search for crash reports with the query `@checkType:mobile @result.result.error:"Your application has crashed during the test." @result.result.device.platform.name:android` to identify, view, and download crash reports for your Android devices.

{{< img src="mobile_app_testing/android_search.png" alt="Screenshot the Results Explorer using filter and search to locate Android crash results" style="width=80%" >}}

Select a failed test and download the crash report:

{{< img src="mobile_app_testing/andriod_crash_report.png" alt="Screenshot of a test result highlighting the ability to download the Android crash report" style="width=80%" >}}

{{% /tab %}}
{{< /tabs >}}

## Failed results

A test result is considered `FAILED` if it does not satisfy its assertions or if a step failed for another reason. You can troubleshoot failed runs by looking at their screenshots, checking for potential errors at the step level, and looking into resources generated by their steps.

Common mobile app test errors include:

`Element located but it's invisible`
: The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.

`Cannot locate element`
: The element cannot be found in the XML.

## Test events

Alerts from your Synthetic test monitors appear in the **Events** tab under **Test Runs**. To search for alerts from Synthetic tests in the Events Explorer, navigate to [**Events** > **Explorer**][7] and enter `@evt.type:synthetics_alert` in the search query. For more information, see [Using Synthetic Test Monitors][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/guide/synthetic-test-monitors/
[2]: /continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[3]: /continuous_testing/cicd_integrations
[4]: /mobile_app_testing/mobile_app_tests/#scheduling-and-alert
[5]: /synthetics/guide/uptime-percentage-widget/
[6]: /help
[7]: https://app.datadoghq.com/event/explorer
[8]: /getting_started/synthetics/browser_test#select-locations
[9]: /synthetics/private_locations
[10]: /mobile_app_testing/mobile_app_tests/steps
[11]: https://app.datadoghq.com/synthetics/tests
[12]: https://app.datadoghq.com/synthetics/explorer