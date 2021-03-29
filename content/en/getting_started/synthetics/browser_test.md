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
    - link: '/synthetics/browser_tests/#subtests'
      tag: 'Documentation'
      text: 'Create a browser subtest'
    - link: '/synthetics/settings/'
      tag: 'Documentation'
      text: 'Configure advanced Synthetic Monitoring settings'
---

## Create a browser test

[Browser tests][1] are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, and from multiple devices. These tests **verify both that your applications are up and responding to requests**, and that key business transactions can be performed by users as expected.

In this example, a browser test is configured to map a user's journey from adding an item to cart to successful checkout. Each test execution is recorded in Datadog as a **Test Result**.

{{< img src="getting_started/synthetics/browser-test.png" alt="Browser test"  style="width:90%;" >}}

## Configure your test

1. In the Datadog application, hover over **[UX Monitoring][2]** in the left hand menu and select **Synthetic Test**.
2. In the top right corner, click the **New Test** button.
3. Select **Browser Test**.
4. Define the configuration of your browser test:

    - **Starting URL**: Add the URL of the website you’re interested in monitoring. If you don’t know what to start with, you can use `https://www.shopist.io` as a test web application.
    - **Name**: Name the test.
    - **Tags**: You can set tags such as `env:prod` and `app:shopist` on your test. Tags help to keep things organized and allow you to quickly find the tests you're interested in on the homepage.
    - **Browsers & Devices**: Choose the devices and browsers you want to use for testing. In this example, the test is only run from **Chrome** and on **Large Laptops**.
    - **Locations**: Choose one of the **Managed Locations** to run your test from. In this example, the test is run in **Americas and Europe**.
    - **Specify a test frequency**: Select how often you would like the test to run.
    - **Alert Conditions**: Set alert conditions to determine the circumstances under which you want a test to send a notification alert.

        - To avoid being alerted on network blips that might happen on specific locations, this test is configured as:

        ```text
        An alert is triggered if your test fails for 0 minutes from any 3 of 13 locations
        ```

        - To ensure that a test execution is only considered a failure after two failed test runs, specify how many times you want your test to be re-run before being considered a failure:

        ```text
        Retry 1 time before location is marked as failed
        ```

         **Note**: By default, there is a 300ms wait before retrying a test that failed. This interval can be configured via the [API][3].

    - **Notify**: Write an alert message and specify which email addresses should be notified when the alert is triggered. No additional set up is required to start receiving alert emails from Datadog. You can also use [integrations][4], such as Slack, PagerDuty, webhooks, etc., to receive alert notifications.
    - Click **Save & Edit Recording**.

{{< img src="getting_started/synthetics/configured-browser-test.gif" alt="Configured browser test"  style="width:90%;">}}

## Record your test steps

Once the test configuration is saved, Datadog will prompt you to download the [Datadog test recorder][5] extension. Browser tests can be only recorded on **[Google Chrome][6]**. Download and install the extension.

Once this extension is installed, begin recording your test steps by clicking the **Start Recording** button. Navigate your page in the iframe to the right of the recording options. When you select a div, image, or any area of your page, the steps are recorded and used to create steps within the browser test. Learn more about each step in the [browser test steps doc][7].

For example, to record test steps that map a user's journey from adding an item to cart to successful checkout:

1. Navigate to one of the furniture sections, for instance **Chairs**, and select **Add to cart**.
2. Click on **Cart**, click **Checkout**.
3. Manually add the **Assertion** “Test text is present on the active page” to confirm the words “Thank you” are on the page.

   **Note**: Your final browser test step must be an **assertion**. This will ensure your test ended up on an expected page and found the expected element.

4. Save the test.

{{< img src="getting_started/synthetics/record-test.gif" alt="Record test steps"  style="width:90%;">}}

**Note**: the website used in this example regularly throws an error causing it to intentionally fail. If you set your email address in the message box, you should consequently receive a notification email when the test failure occurs.

## Test results

The browser test details page includes details about your test configuration, test uptime, historical graphs for response time and time to interactive for the first page, sample successful and failed results, and a list of test results corresponding to the selected timeframe. Each individual test result includes screenshots, core web vitals, potential errors, resources, and traces for each step.

Wait for your test to generate several test results or hit `Run test now` to trigger them more quickly. Then look for a failed test result under **Test Results** or in your mailbox. You can start your troubleshooting by looking at the screenshots to try to understand what went wrong. Don't forget to look at screenshots of steps that happened before the failed step as these often contain the root cause of the failure.

The **Errors & Warnings** tab provides a list of Javascript and network errors, the **Resources** tab locates the resource providing this status, and the **Traces** tab maps the entirety of the request in seconds. This test failed as the result of a server timeout. The resource, `https://api.shopist.io/checkout.json`, posted the status ,and the targeted source of the problem is a controller linked to checkout. You have now successfully found the route of the problem.

{{< img src="getting_started/synthetics/browser-test-failure.png" alt="Browser test failure"  style="width:100%;">}}

The **Traces** tab is accessible with Datadog [APM integration with Synthetic Monitoring][8]. Once configured, it allows you to go from a test run that failed to the root cause of the issue by looking at the trace generated by that test run. To link browser test results with APM, whitelist the URLs you want the APM integration headers added to. Use `*` for wildcards: `https://*.datadoghq.com/*`

{{< whatsnext desc="After you set up your first browser test:">}}
{{< nextlink href="https://learn.datadoghq.com/course/view.php?id=39" tag="Learning Center" >}}Introduction to Synthetic Tests{{< /nextlink >}}
{{< nextlink href="/synthetics/browser_tests" tag="Documentation" >}}Learn more about browser tests{{< /nextlink >}}
{{< nextlink href="/synthetics/browser_tests/#subtests" tag="Documentation" >}}Create a browser subtest{{< /nextlink >}}
{{< nextlink href="/synthetics/settings/" tag="Documentation" >}}Configure advanced Synthetic Monitoring settings{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /api/v1/synthetics/#create-or-clone-a-test
[4]: /integrations/
[5]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://www.google.com/chrome/
[7]: /synthetics/browser_tests/#actions
[8]: /synthetics/apm/
