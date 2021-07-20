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
    - link: '/synthetics/ci'
      tag: 'Documentation'
      text: 'Learn how to trigger Synthetic tests from your CI/CD pipeline'
    - link: '/synthetics/identify_synthetics_bots'
      tag: 'Documentation'
      text: 'Learn how to identify Synthetic bots for API tests'
      
---

## Create a browser test

[Browser tests][1] are scenarios that Datadog executes on your web applications. You can configure periodic intervals to run tests from multiple locations, devices, and browsers as well as execute them from your CI/CD pipelines. These tests verify that your users can perform key business transactions on your applications and that they are not negatively impacted by the most recent code changes.

The example below demonstrates the creation of a browser test that maps a user's journey from adding an item to a cart to successfully checking out. 

{{< img src="getting_started/synthetics/browser-test.png" alt="Browser test"  style="width:100%;" >}}

### Configure your test details

1. In the Datadog application, hover over **[UX Monitoring][2]** in the left hand menu and select **[Synthetic Tests][2]**.
2. In the top right corner, click the **New Test** button.
3. Select **Browser Test**.
4. Define your browser test:

    - Add the URL of the website you want to monitor. If you don’t know what to start with, you can use `https://www.shopist.io`, a test web application.
    - Select **Advanced Options** to use custom request headers, authentication credentials, or cookies. 
    - Name your test and set tags to it such as `env:prod` and `app:shopist`. Tags allow you to keep your test suite organized and quickly find tests you're interested in on the homepage.
    - Choose the browsers and devices you want to test with. 

#### Select locations

Select one or more **Managed Locations** or **Private Locations** to run your test from.

Managed locations allow you to test public-facing applications. To test internal applications or simulate user behavior in discrete geographic regions, select one of your **Private Locations** instead.

For more information on how to set up private locations, see [Getting Started with Private Locations][3].

#### Specify test frequency

Select the frequency at which you want your test to execute. 

In addition to running your Synthetic test on a schedule, you can trigger them directly from your CI/CD pipelines. For more information, see [Synthetic CI/CD Testing][4].


#### Define alert conditions

You can define alert conditions to ensure your test does not trigger for things like a sporadic network blip, so that you only get alerted in case of real issues with your application.

You can specify the number of consecutive failures that should happen before considering a location failed:

```text
Retry test 2 times after 300 ms in case of failure
```

You can also configure your test to only trigger a notification when your application goes down for a certain amount of time and number of locations. In the below example, the alerting rule is set to send a notification if the test fails for three minutes on two different locations:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

#### Notify your team

Add an alert name to the **Monitor Name** field and write a message for the alert. You can use [integrations][5] such as Slack, PagerDuty, and webhooks to route your alert to specific services and teams.

You can set your alert notification to re-notify if the alert has not been resolved and define the priority of the alert, ranging from **P5 (Info)** to **P1 (Critical)**.

{{< img src="getting_started/synthetics/configured-browser-test.mp4" alt="Example browser test configuration" video="true"  >}}

When you're ready to record your test, click **Save Details & Record Test**.

### Create recording

Once your test configuration is saved, Datadog prompts you to download and install the [Datadog test recorder][6] Chrome extension. 

Once you have installed the extension, click **Start Recording** to begin recording your test steps.

Navigate through the page in the iframe located on the right of the recorder page. When you select a div, image, or any area of the page, Datadog records and creates the associated step in the browser test. 

To end recording your test steps, click **Stop Recording**.

The example below demonstrates how to map a user journey from adding an item to a cart to successfully checking out in `https://www.shopist.io`:

1. Navigate to one of the furniture sections on the example website such as **Chairs** and select **Add to cart**.
2. Click on **Cart** and **Checkout**.
3. Under **Add New**, select **Assertion** and click **“Test that some text is present on the active page”**.
4. To confirm that the words “Thank you!” appear after checking out, enter `Thank you!` in the **Value** field. 
5. Press **Save & Quit**.

It is important to finish your browser test with an **Assertion** to ensure your application resulted in the expected state after the defined user journey.

{{< img src="getting_started/synthetics/record-test.mp4" alt="Record test steps"  video="true"  >}}

**Note**: The example website regularly throws an error causing it to intentionally fail. If you include your email address in the **Notify your team** field, you will receive an email notification when the test fails and recovers.

## Test results

The Browser Test details page displays an overview of your test configuration, the global and per location uptime, graphs about time-to-interactive and test duration, sample successful and failed test results, and the list of all test results. Depending on the length of your test, you might have to wait for a few minutes to see the first test results come in.

To troubleshoot a [failed test][7], select a failed test result and review the screenshots leading up to the failed step. You can also review potential **[Errors & Warnings][8]**, **[Resources][9]**, and **[Core Web Vitals][10]** to diagnose the issue. 

In the example below, the test failed as the result of a server timeout.

{{< img src="getting_started/synthetics/browser-test-failure.mp4" alt="Browser test failure"  video="true"  >}}

Use Datadog's [APM integration with Synthetic Monitoring][11] to view traces generated from your backend by the test runs from the **Traces** tab.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /getting_started/synthetics/private_location
[4]: /synthetics/ci
[5]: /integrations/#cat-notification
[6]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[7]: /synthetics/browser_tests/test_results#test-failure
[8]: /synthetics/browser_tests/test_results#errors
[9]: /synthetics/browser_tests/test_results#resources
[10]: /synthetics/browser_tests/test_results#page-performance
[11]: /synthetics/apm/
