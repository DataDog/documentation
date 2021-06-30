---
title: Getting Started with API Tests
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/course/view.php?id=39'
      tag: 'Learning Center'
      text: 'Introduction to Synthetic Tests'
    - link: '/synthetics/api_tests'
      tag: 'Documentation'
      text: 'Learn more about API tests'
    - link: '/getting_started/synthetics/private_location'
      tag: 'Documentation'
      text: 'Learn about private locations'
    - link: '/synthetics/identify_synthetics_bots'
      tag: 'Documentation'
      text: 'Learn how to identify Synthetic bots for API tests'
    - link: '/api/v1/synthetics/#create-a-test'
      tag: 'API Docs'
      text: 'Create a Synthetic test programmatically'

---

## Create a single API test

[API tests][1] **proactively monitor** that your most important services are available at anytime and from anywhere. API tests come in four different flavors that allow you to launch requests on the **different network layers** of your systems.

The example below demonstrates the creation of an [HTTP test][2], a subtype of [API tests][1]. [HTTP tests][1] **monitor your API endpoints** and **alert you** when they become too slow or fail. These tests verify that your applications are responding to requests and meeting any conditions you define, such as expected **response time**, **HTTP status code**, and **header or body contents**.

1. In the Datadog application, hover over **[UX Monitoring][3]** in the left hand menu and select **[Synthetic Tests][3]**.
2. In the top right corner, click the **New Test** button.
3. Select **[New API test][4]**.

### Define request

1. Select the `HTTP` request type.
2. Add the URL of the endpoint you want to monitor. If you don’t know what to start with, you can use `https://www.shopist.io/`, a test web application. Defining the endpoint to test automatically populates the name of your test to `Test on www.shopist.io`. You can change your test name to something else if you want to.
3. You can select **Advanced Options** to use custom request headers, authentication credentials, body content, or cookies.
4. You can set tags such as `env:prod` and `app:shopist` on your test. Tags allow you to keep your test suite organized and quickly find test you're interested in on the homepage.
5. Click **Test URL** to trigger a sample test run.

{{< img src="getting_started/synthetics/api-test-config-2.jpg" alt="API test configuration"  style="width:60%;">}}

### Define assertions

Clicking **Test URL** automatically populates basic assertions about your endpoint's response. Assertions define what a successful test run is.

In this example, three default assertions populate after triggering the sample test run:

{{< img src="getting_started/synthetics/assertions-example.png" alt="Browser test failure"  style="width:90%;">}}

Assertions are fully customizable. To add a custom assertion, click on elements of the response preview or click **New Assertion**. 

{{< img src="getting_started/synthetics/api-test-configuration-2.gif" alt="Browser test failure"  style="width:90%;">}}

### Select locations 

Select one or more **Managed Locations** or **Private Locations** to run your test from.

Managed locations allow you to test public-facing websites and endpoints. To test internal applications or simulate user behavior in discrete geographic regions, select one of your **Private Locations** instead.

For more information on how to set up private locations, see [Getting Started with Private Locations][5].

### Specify test frequency

Select the frequency of your test runs.

### Define alert conditions

You can define alert conditions to ensure your test does not trigger in case of sporadic network blip and that you only get alerted in case of real issues with your endpoint.

You can specify the number of consecutive failures that should happen before considering a location failed:

```text
Retry test 2 times after 300 ms in case of failure
```

You can also decide to only trigger a notification when your endpoint goes down for a certain amount of time and number of locations. In the below example, we set our alerting rule to send a notification if our test fails for three minutes on two different locations:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Notify your team

Add an alert name to the **Monitor Name** field and write a message for the alert. You can use [integrations][6] such as Slack, PagerDuty, and webhooks to route your alert to specific services and teams.

You can set time for your alert notification to re-notify if the alert has not been resolved and define the priority of the alert, ranging from **P5 (Info)** to **P1 (Critical)**.

When you're ready to run your test, click **Save Test**. 

## Create a multistep API test

[Multistep API tests][7] run HTTP requests in sequence, allowing you to configure [HTTP tests][2] on complex backend systems. 

### Configure the test

When you create a [Multistep API test][7], you can define a sequence of HTTP requests and create variables from the response data to re-inject their values in subsequent steps. 

1. In the Datadog application, hover over **[UX Monitoring][3]** in the left hand menu and select **[Synthetic Tests][3]**.
2. In the top right corner, click the **New Test** button.
3. Select **[Multistep API test][8]**.
4. Name, tag and select locations for your [Multistep API test][8] like you would with a single [API test][1].
5. In **Define steps**, click **Create Your First Step**. 

    - Add a name to your step.
    - Specify the URL you want to query. 
    - Select **Advanced Options** to add custom request headers, authentication credentials, body content, or cookies.
    - Click **Test URL**. 
    - Optionally, add new assertions, define execution parameters, and extract variables from the response content.
    - Click **Save Step**.

6. Click **Add Another Step** to add another step. By default, you can create up to ten steps. 
7. Configure the rest of your test conditions including test frequency, alerting conditions, and alert message.

When you're ready to create your test, click **Save Test**. 

## Test results

The API test and Multistep API test detail pages display an overview of the test configuration, the global uptime associated with the tested endpoint by location, graphs about response time and network timings, and a list of test results and events.

To troubleshoot a failed test, scroll down to **Test Results** and click on a failing test result. Review failed assertions and response details such as status code, response time, and associated headers and body to diagnose the issue.

{{< img src="getting_started/synthetics/api-test-failure.png" alt="API test failure"  style="width:90%;">}}

With Datadog's [APM integration with Synthetic Monitoring][9], access the root cause of a failed test run by looking at the trace generated from the test run in the **Traces** tab.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/api_tests/http_tests
[3]: https://app.datadoghq.com/synthetics/list
[4]: https://app.datadoghq.com/synthetics/create
[5]: /getting_started/synthetics/private_location
[6]: /integrations/#cat-notification
[7]: /synthetics/multistep
[8]: https://app.datadoghq.com/synthetics/multi-step/create
[9]: /synthetics/apm/
