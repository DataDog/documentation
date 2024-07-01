---
title: Getting Started with Browser Tests
kind: documentation
further_reading:
- link: "https://learn.datadoghq.com/courses/intro-to-synthetic-tests"
  tag: Learning Center
  text: Introduction to Synthetic Tests
- link: /synthetics/browser_tests
  tag: Documentation
  text: Learn more about browser tests
- link: /getting_started/synthetics/private_location
  tag: Documentation
  text: Learn about private locations
- link: /continuous_testing/cicd_integrations
  tag: Documentation
  text: Learn how to trigger Synthetic tests from your CI/CD pipeline
- link: /synthetics/identify_synthetics_bots
  tag: Documentation
  text: Learn how to identify Synthetic bots for API tests
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: Learn about Synthetic test monitors

---

## Overview

[Browser tests][1] are scenarios that Datadog executes on your web applications. You can configure periodic intervals to run tests from multiple locations, devices, and browsers as well as execute them from your CI/CD pipelines. 

{{< img src="getting_started/synthetics/browser-test-overview.png" alt="Overview of a Synthetics Browser Test" style="width:100%;" >}}

These tests verify that your users can perform **key business transactions** on your applications and that they are not negatively impacted by recent code changes.

## Create a browser test

The example below demonstrates the creation of a browser test that maps a user's journey from adding an item to a cart to successfully checking out. 

{{< img src="getting_started/synthetics/browser-test-1.png" alt="Browser test mapping out a user journey" style="width:100%;" >}}
### Configure your test details

1. In the Datadog site, hover over **Digital Experience** in the left hand menu and select **[Tests][2]** (under **Synthetic Monitoring & Testing**).
2. In the top right corner, click **New Test** > **[Browser Test][3]**.
3. Define your browser test:

    - Add the URL of the website you want to monitor. If you don't know what to start with, you can use `https://www.shopist.io`, a test e-commerce web application.
    - Select **Advanced Options** to set custom request options, certificates, authentication credentials, and more. 
      In this example, no specific advanced option is needed.
    - Name your test and set tags to it such as `env:prod` and `app:shopist`. Tags allow you to keep your test suite organized and quickly find tests you're interested in on the homepage.
    - Choose the browsers and devices you want to test with. 

### Select locations

Select one or more **Managed Locations** or **Private Locations** to run your test from.

Managed locations allow you to test public-facing websites and endpoints. To test internal applications or simulate user behavior in discrete geographic regions, use [private locations][4] instead.

The Shopist application is publicly available at `https://www.shopist.io/`, so you can pick any managed locations to execute your test from.

### Specify test frequency

Select the frequency at which you want your test to execute. You can leave the default frequency of 1 hour.

In addition to running your Synthetic test on a schedule, you can trigger them manually or directly from your [CI/CD pipelines][5].

### Define alert conditions

You can define alert conditions to ensure your test does not trigger for things like a sporadic network blip, so that you only get alerted in case of real issues with your application.

You can specify the number of consecutive failures that should happen before considering a location failed:

```text
Retry test 2 times after 300 ms in case of failure
```

You can also configure your test to only trigger a notification when your application goes down for a certain amount of time and number of locations. In the below example, the alerting rule is set to send a notification if the test fails for three minutes on two different locations:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Configure the test monitor

Design your alert message and add an email address you want your test to send alerts to.

{{< img src="getting_started/synthetics/configured-browser-test.mp4" alt="Example browser test configuration" video="true" >}}

You can also use [notifications integrations][6] such as Slack, PagerDuty, Microsoft Teams, and webhooks. In order to trigger a Synthetic alert to these notification tools, you first need to set up the corresponding [integration][7].

When you're ready to save your test configuration and monitor, click **Save & Edit Recording**.

For more information, see [Using Synthetic Test Monitors][8].

## Create recording

Once your test configuration is saved, Datadog prompts you to download and install the [Datadog test recorder][9] Chrome extension. 

Once you have installed the extension, click **Start Recording** to begin recording your test steps.

Navigate through the page in the iframe located on the right of the recorder page. When you select a div, image, or any area of the page, Datadog records and creates the associated step in the browser test. 

To end recording your test steps, click **Stop Recording**.

The example below demonstrates how to map a user journey from adding an item to a cart to successfully checking out in `https://www.shopist.io`:

1. Navigate to one of the furniture sections on the example website such as **Chairs** and select **Add to cart**.
2. Click on **Cart** and **Checkout**.
3. Under **Add New**, select **Assertion** and click **"Test that some text is present on the active page"**.
4. To confirm that the words "Thank you!" appear after checking out, enter `Thank you!` in the **Value** field. 
5. Press **Save & Quit**.

It is important to finish your browser test with an **Assertion** to ensure your application resulted in the expected state after the defined user journey.

{{< img src="getting_started/synthetics/record-test.mp4" alt="Record test steps" video="true" >}}

The example website regularly throws an error causing it to intentionally fail. If you include your email address in the **Configure the monitor for this test** field, you receive an email notification when the test fails and recovers.

## Look at test results

The **Browser Test** details page displays an overview of your test configuration, the global and per location uptime, graphs about time-to-interactive and test duration, sample successful and failed test results, and the list of all test results. Depending on the length of your test, you might have to wait for a few minutes to see the first test results come in.

To troubleshoot a [failed test][10], select a failed test result and review the screenshots leading up to the failed step. You can also review potential **[Errors & Warnings][11]**, **[Resources][12]**, and **[Core Web Vitals][13]** to diagnose the issue. 

In the example below, the test failed as the result of a server timeout.

{{< img src="getting_started/synthetics/browser-test-failure.mp4" alt="Browser test failure" video="true" >}}

Use Datadog's [APM integration with Synthetic Monitoring][14] to view traces generated from your backend by the test runs from the **Traces** tab.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/tests
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /getting_started/synthetics/private_location
[5]: /continuous_testing/cicd_integrations
[6]: /integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: /synthetics/guide/synthetic-test-monitors
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /synthetics/browser_tests/test_results#test-failure
[11]: /synthetics/browser_tests/test_results#errors
[12]: /synthetics/browser_tests/test_results#resources
[13]: /synthetics/browser_tests/test_results#page-performance
[14]: /synthetics/apm/
