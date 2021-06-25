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
    - link: '/synthetics/settings/'
      tag: 'Documentation'
      text: 'Configure advanced Synthetic Monitoring settings'
    - link: '/api/v1/synthetics/#create-a-test'
      tag: 'API Docs'
      text: 'Create a Synthetic test programmatically'

---

## Create an API test

[API tests][1] **monitor your API endpoints** and **alert you** when they become too slow or fail. These tests verify that your applications are responding to requests and meeting any conditions you define, such as **response time**, **HTTP status code**, and **header or body contents**.

The example below demonstrates the creation of an API test to ensure that your website is up and is providing responses in a given period of time.

### Configure the request

1. In the Datadog application, hover over **[UX Monitoring][2]** in the left hand menu and select **Synthetic Test**.
2. In the top right corner, click the **New Test** button.
3. Select **API test**.
4. Define your API request:

    - Select your request type.
    - Add the URL of the endpoint you want to monitor. If you don’t know what to start with, you can use `https://www.shopist.io/`, a test web application.
    - You can select **Advanced Options** to use custom request headers, authentication credentials, body content, or cookies.
    - You can set environment tags such as `env:prod` and `app:shopist` and additional tags on your test. Tags allow you to stay organized and quickly find test you're interested in on the homepage.
    - Click **Test URL**.

{{< img src="getting_started/synthetics/api-test-config.png" alt="API test configuration"  style="width:60%;">}}

#### Define assertions

Datadog automatically populates basic assertions about your endpoint's response. Assertions define the alert condition and are customizable. 

In this example, three default assertions populate after the URL is tested:

{{< img src="getting_started/synthetics/assertions-example.png" alt="Browser test failure"  style="width:90%;">}}

To add a custom assertion, click anywhere in the response preview or click **New Assertion**.

{{< img src="getting_started/synthetics/api-test-configuration.gif" alt="Browser test failure"  style="width:90%;">}}

#### Select locations 

Select one or more **Managed Locations** or **Private Locations** to run your test from.

Your managed locations often include public-facing websites and endpoints. To test internal applications or simulate user behavior in discrete geographic regions, select **Private Locations** instead.

For more information, see [Getting Started with Private Locations][6].

#### Specify test frequency

Select the frequency of your test runs.

#### Define alert conditions

You can specify the number of failures per location before the location is considered failed:

```text
Retry x time before location is marked as failed
```

After a location fails, retries immediately run.

**Note**: By default, the wait time for a failed test to retry is 300ms. You can configure the interval with the [Synthetics API][3].

To receive alerts when your endpoint goes down for three minutes on two different locations, set up an alerting condition such as:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

#### Notify your team

Add an alert name to the **Monitor Name** field and write a message for the alert. You can tag other teams, specify which service and team members receive the alert notifications, and use [integrations][4] such as Slack, PagerDuty, and webhooks.

You can set time for your alert notification to re-notify if the alert has not been resolved and define the priority of the alert, ranging from **P5 (Info)** to **P1 (Critical)**.

When you're ready to run your test, click **Save Test**. 

## Create a multistep API test

Multistep API tests chain multiple HTTP requests together, allowing you to configure API tests on complex backend systems. 

### Configure the test

When you create a multistep API test, you can chain a sequence of HTTP requests and create variables from the request response data in **Define steps**. 

1. In the Datadog application, hover over **[UX Monitoring][2]** in the left hand menu and select **Synthetic Test**.
2. In the top right corner, click the **New Test** button.
3. Select **Multistep API test**.
4. Define your multistep API request like you would with an API test.
5. In **Define steps**, click **Create Your First Step**. 

    - Add a name to your test HTTP request step.
    - Specify the URL you want to query. 
    -  Select **Advanced Options** to add request options, request body, certificates, and proxies.
    - Click **Test URL**. 
    - Optionally, add new assertions, enable execution parameters, and extract variables from the response content.
    - Click **Save Step**.

6. Click **Add Another Step** to add another step. You can create up to ten steps. 
7. Configure the rest of your test conditions including test frequency, alerting conditions, and alert message.

When you're ready to create your test, click **Save Test**. 

For more information, see [Multistep API Tests][7].

## Test results

The API test and multistep API test detail pages display an overview of the test configuration, the global uptime associated with the tested endpoint by location, graphs about response time and network timings, and a list of test results and events.

To troubleshoot a failed test, scroll down to **Test Results** and click on a failing test result. Review failed assertions and response details such as status code, response time, and associated headers and body to diagnose the issue.

{{< img src="getting_started/synthetics/api-test-failure.png" alt="API test failure"  style="width:90%;">}}

With Datadog's [APM integration with Synthetic Monitoring][5], access the root cause of a failed test run by looking at the trace generated from the test run in the **Traces** tab.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /api/v1/synthetics/#create-or-clone-a-test
[4]: /integrations/
[5]: /synthetics/apm/
[6]: /getting_started/synthetics/private_location
[7]: /synthetics/multistep
