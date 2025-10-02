---
title: Mobile App Testing Results
description: >-
  View Synthetic mobile app test results and compare successful or failed sample
  runs to test runs.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Mobile Application Testing and
  Monitoring > Mobile App Testing Results
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/results/index.html
---

# Mobile App Testing Results

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Click on a mobile app test on the [**Synthetic Tests** page](https://app.datadoghq.com/synthetics/tests) to see the Test Details page. The Test Details page contains all the information relating to your test, including test properties, test history, sample runs, and test runs.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_details_2.16637602d50cee1d27ad389284d89fe6.png?auto=format"
   alt="The Mobile App Test Details page" /%}

Test runs appear in a test details page after a Synthetic mobile app test executes. Sample results correlate to the latest passed and failed test executions over a time interval and in a specific number of locations and devices.

## Test properties{% #test-properties %}

In the **Properties** section, you can see the test ID, test creation and edit dates, test priority, environment tag, and additional tags.

{% dl %}

{% dt %}
**Overview**
{% /dt %}

{% dd %}
This section describes the Synthetic test details, including the mobile application, version, location, number of devices, test interval, and the number of test steps.
{% /dd %}

{% dt %}
**Monitor**
{% /dt %}

{% dd %}
This section contains the name of the [Synthetic test's monitor](https://docs.datadoghq.com/monitors/types/synthetic_monitoring/) and the configured notification message.
{% /dd %}

{% dt %}
**CI/CD Execution**
{% /dt %}

{% dd %}
This section contains a dropdown menu to change the [execution rule](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files) for this test running as part of a [CI pipeline](https://docs.datadoghq.com/continuous_testing/cicd_integrations).
{% /dd %}

{% /dl %}

## Test history{% #test-history %}

In the **History** section, you can see the **Global Uptime** graph, which displays the total uptime of all test locations in a given time interval. The global uptime takes into consideration the [alert conditions](https://docs.datadoghq.com/mobile_app_testing/mobile_app_tests/#scheduling-and-alert) configured for a test.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/history.cf500d502baf663bdcf60c21a97b3fe9.png?auto=format"
   alt="The History graph displays global uptime" /%}

## Sample results{% #sample-results %}

Mobile app test runs include components such as screenshots to help troubleshoot your test failure.

In the **Sample Runs** section, you can examine the latest failed test runs and compare them to recent successful test runs.

### Overview attributes{% #overview-attributes %}

{% dl %}

{% dt %}
Status
{% /dt %}

{% dd %}
The status of your test run (`PASSED` or `FAILED`).
{% /dd %}

{% dt %}
Starting URL
{% /dt %}

{% dd %}
The URL of your mobile app test scenario.
{% /dd %}

{% dt %}
Steps
{% /dt %}

{% dd %}
The number of [test steps](https://docs.datadoghq.com/mobile_app_testing/mobile_app_tests/steps) completed in your sample run.
{% /dd %}

{% dt %}
Duration
{% /dt %}

{% dd %}
The amount of time it took your test to run.
{% /dd %}

{% dt %}
Location
{% /dt %}

{% dd %}
The [managed](https://docs.datadoghq.com/getting_started/synthetics/browser_test#select-locations) or [private location](https://docs.datadoghq.com/synthetics/private_locations) your test was executed from.
{% /dd %}

{% dt %}
Device
{% /dt %}

{% dd %}
The type of device your test was executed from.
{% /dd %}

{% dt %}
Run type
{% /dt %}

{% dd %}
The type of test run (CI, manually triggered, or scheduled).
{% /dd %}

{% dt %}
Records
{% /dt %}

{% dd %}
Download device logs that have been captured for your test runs to aid in debugging.
{% /dd %}

{% /dl %}

### Screenshots and actions{% #screenshots-and-actions %}

Every executed test step contains a screenshot of the step action, step action name, step ID, and step duration.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/screenshot-and-action.33ea3d7c74d9b56e427228e459131cb1.png?auto=format"
   alt="Screenshots and actions in the Sample Runs section of the test details" /%}

Screenshots can be disabled by checking "Do not capture screenshot for this step" in the **Advanced Options** section.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/do_not_capture_screenshot.436a72f9badfd7f7f562ee5a22193468.png?auto=format"
   alt="Advanced options for a Mobile app test, highlighting Do not capture screenshot for this step" /%}

### Video replay{% #video-replay %}

Use video replay to diagnose test failures by showing unexpected UI behavior or pop-ups that may have caused the issue. Video replay requires screenshots to be enabled. Disabling screenshots for a step prevents video replay for all test runs.

Click on an individual test run from the [Mobile Application test details page](https://app.datadoghq.com/synthetics/tests) to view detailed information in the side panel, including step duration, pass/fail status, and screenshots. Use the **Video Replay** tab to watch the complete test execution.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/mobile_app_video_replay.mp4" /%}

**Note**: Mobile Application test session replays are not available in RUM.

### XML highlighting{% #xml-highlighting %}

Results of steps contain the XML representation of the screen being tested, as well as the ability to hover over the screenshot or the XML to highlight specific elements of the app. Click an element to view additional attributes:

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/xml_inspector.dcb666b6f80366185d1ce4bb39cd20e6.png?auto=format"
   alt="Screenshot of a test result under the Sample Runs section, showing the XML inspector" /%}

## Crash reports{% #crash-reports %}

View and download crash reports for your iOS and Android devices in the [Results Explorer](https://app.datadoghq.com/synthetics/explorer).

To find specific crash reports, use the following queries in the search bar:

- **iOS**: `@result.failure.code:APPLICATION_CRASH_FAILURE @device.platform.name:ios`
- **Android**: `@result.failure.code:APPLICATION_CRASH_FAILURE @device.platform.name:android`

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/ios_search_2.17ed8c494b1fa73cbc81a3095a6f9f0d.png?auto=format"
   alt="Screenshot the Results Explorer using filter and search to locate iOS crash results" /%}

Click on a failed test to open the side panel and download the crash report in the **Run Details** tab:

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/ios_crash_report_2.34f11d1a709f176c6b3a01123038eaa4.png?auto=format"
   alt="Screenshot of a test result highlighting the ability to download the iOS crash report" /%}

## Failed results{% #failed-results %}

A test result is considered `FAILED` if it does not satisfy its assertions or if a step failed for another reason. You can troubleshoot failed runs by looking at their screenshots, checking for potential errors at the step level, and looking into resources generated by their steps.

Common mobile app test errors include:

{% dl %}

{% dt %}
`Element located but it's invisible`
{% /dt %}

{% dd %}
The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.
{% /dd %}

{% dt %}
`Cannot locate element`
{% /dt %}

{% dd %}
The element cannot be found in the XML.
{% /dd %}

{% /dl %}

## Test events{% #test-events %}

Alerts from your Synthetic test monitors appear in the **Events** tab under **Test Runs**. To search for alerts from Synthetic tests in the Events Explorer, navigate to [**Events** > **Explorer**](https://app.datadoghq.com/event/explorer) and enter `@evt.type:synthetics_alert` in the search query. For more information, see [Using Synthetic Test Monitors](https://docs.datadoghq.com/monitors/types/synthetic_monitoring/).

## Further reading{% #further-reading %}

- [Learn about Synthetic mobile tests](https://docs.datadoghq.com/synthetics/mobile_app_testing/)
- [Learn about the Events Explorer](https://docs.datadoghq.com/service_management/events/explorer)
