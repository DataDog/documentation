---
title: Getting Started with Browser Tests
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/course/view.php?id=39'
      tag: 'Learning Center'
      text: 'Introduction to Synthetic Tests'
    - link: '/synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Learn more about browser tests'
    - link: '/getting_started/synthetics/private_location'
      tag: 'Documentation'
      text: 'Learn about private locations'
    - link: '/synthetics/browser_tests/#subtests'
      tag: 'Documentation'
      text: 'Create a browser subtest'
    - link: '/synthetics/settings/'
      tag: 'Documentation'
      text: 'Configure advanced Synthetic Monitoring settings'
      
---

## Create a browser test

[Browser tests][1] are scenarios that Datadog executes on your web applications. You can configure periodic intervals to run tests from multiple locations and devices. These tests verify that your applications are responding to requests and users can perform business transactions as expected.

The example below demonstrates the creation of a browser test, which maps a user's journey from adding an item to a cart to successfully checking out. 

{{< img src="getting_started/synthetics/browser-test.png" alt="Browser test"  style="width:90%;" >}}

Datadog records every test execution as a **Test Result**.

### Configure your test details

1. In the Datadog application, hover over **[UX Monitoring][2]** in the left hand menu and select **Synthetic Test**.
2. In the top right corner, click the **New Test** button.
3. Select **Browser Test**.
4. Define your browser test:

    - Add the URL of the website you want to monitor. If you don’t know what to start with, you can use `https://www.shopist.io`, a test web application.
    - You can select **Advanced Options** to use custom request headers, authentication credentials, proxy URLs, or cookies. 
    - You can set environment tags such as `env:prod` and `app:shopist` and additional tags on your test. Tags allow you to stay organized and quickly find tests you're interested in on the homepage.
    - Choose the browsers and devices you want to test with. 

#### Select locations

Select one or more **Managed Locations** or **Private Locations** to run your test from.

Your managed locations often include public-facing websites and endpoints. To test internal applications or simulate user behavior in discrete geographic regions, select **Private Locations** instead.

For more information, see [Getting Started with Private Locations][10].

#### Specify test frequency

Select the frequency of your test runs.

#### Define alert conditions

Select the circumstances in which you want a test to send notification alerts.

You can specify the number of failures per browser and device before the test is considered failed:

```text
Retry 1 time after 300 ms in case of failure
```

**Note**: By default, the wait time for a failed test to retry is 300ms. You can configure this interval with the [Synthetics API][3].

To avoid being alerted on network blips that might happen on specific locations, set up an alerting condition such as:

```text
An alert is triggered if your test fails for 0 minutes from any 3 of 13 locations
```

#### Notify your team

Add an alert name to the **Monitor Name** field and write a message for the alert. You can tag other teams, specify which service and team members receive the alert notifications, and use [integrations][4] such as Slack, PagerDuty, and webhooks.

You can set time for your alert notification to re-notify if the alert has not been resolved and define the priority of the alert, ranging from **P5 (Info)** to **P1 (Critical)**.

When you're ready to run your test, click **Save Details & Record Test**.

{{< img src="getting_started/synthetics/configured-browser-test.gif" alt="Configured browser test"  style="width:90%;">}}

### Create recording

Once your test configuration has saved, Datadog prompts you to download and install the [Datadog test recorder][5] extension. You can run browser tests on Google Chrome, Microsoft Edge, and Firefox. 

To begin recording your test steps, click **Start Recording**. 

You can navigate through your page in the iframe to the right of the recording button. By selecting a div, image, or any area of your page, Datadog records and creates your steps in the browser test. For more information, see [Browser Test Steps][7].

To end recording your test steps, click **Stop Recording**.

The example below demonstrates how to map a user journey from adding an item to a cart to successfully checking out:

1. Navigate to one of the furniture sections on the example website such as **Chairs** and select **Add to cart**.
2. Click on **Cart** and **Checkout**.
3. Under **Add New**, select **Assertion** and click **“Test that some text is present on the active page”**.
4. To confirm the words “Thank you!” appear after checking out, enter `Thank you!` in the **Value** field.
5. Press **Save & Quit**.

To ensure your browser test ends up on the expected page and identifies the expected element, the final step must be an **Assertion**.

{{< img src="getting_started/synthetics/record-test.gif" alt="Record test steps"  style="width:90%;">}}

**Note**: The example website regularly throws an error causing it to intentionally fail. When you include your email address in the **Notify your team** field, you will receive an email notification when the test fails.

## Sample results

The Browser Test details page displays an overview of your test configuration, the global uptime, graphs about time-to-interactive and test duration, sample successful and failed results, and a list of test results. 

You can compare the latest failed test run with a recent successful run by selecting view sample **Successful Result** or **Failed Result**. Each result displays screenshots, actions, and the duration of each test step.

## Test results

You can wait for your test to generate results in **Test Results** or click **Run test now** on the top right to trigger results quickly.

To troubleshoot a failed test, scroll down to **Test Results** and click on a failed test result. Review screenshots, core web vitals, potential errors, resources, and traces for each step to diagnose the issue. 

When you look at screenshots leading up to the failed step, you can identify the root cause of the failure more easily. Click on resources, errors, and traces that appear next to the duration graph to access **Errors & Warnings**, **Resources**, and **Traces**. 

**Errors and Warnings** display JavaScript and network errors, **Resources** display the resource providing this status, and **Traces** map the entirety of the request in seconds. 

In the example below, the test failed as the result of a server timeout.

{{< img src="getting_started/synthetics/browser-test-failure.png" alt="Browser test failure"  style="width:100%;">}}

The resource, `https://api.shopist.io/checkout.json`, posted a status and the target source of this issue is a controller linked to checkout.

With Datadog's [APM integration with Synthetic Monitoring][8], you can access the root cause of a failed test run with a trace generated from the test run. 

To link browser test results with APM, whitelist the URLs you want to add to the APM integration headers. 

For wildcards, use `*`. For example, `https://*.datadoghq.com/*`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /api/v1/synthetics/#create-or-clone-a-test
[4]: /integrations/
[5]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://www.google.com/chrome/
[7]: /synthetics/browser_tests/#actions
[8]: /synthetics/apm/
[9]: /synthetics/
[10]: /getting_started/synthetics/private_location
