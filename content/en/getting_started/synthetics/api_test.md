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

<<<<<<< HEAD
[API tests][1] **monitor your API endpoints** and **alert you** when they become too slow or fail. These tests verify that your applications are responding to requests and meeting any conditions you define, such as **response time**, **HTTP status code**, and **header or body contents**.
=======
[API tests][1] help you **monitor your API endpoints and alert** you when they are failing or become too slow. These tests verify that your applications are responding to requests and meet any conditions you define, such as **response time**, **HTTP status code**, and **header or body contents**.
>>>>>>> datadog-api-spec/generated/1041

The example below demonstrates the creation of an API test to ensure that your website is up and is providing responses in a given period of time.

### Configure the request

1. In the Datadog application, hover over **[UX Monitoring][2]** in the left hand menu and select **Synthetic Test**.
2. In the top right corner, click the **New Test** button.
3. Select **API test**.
4. Define your API request:

<<<<<<< HEAD
    - Add the URL of the endpoint you want to monitor. If you don’t know what to start with, you can use `https://www.shopist.io/`, a test web application.
    - You can select **Advanced Options** to use custom request headers, authentication credentials, body content, or cookies.
    - You can set environment tags such as `env:prod` and `app:shopist` and additional tags on your test. Tags allow you to stay organized and quickly find test you're interested in on the homepage.
    - Click **Test URL**.
=======
    - Add the URL of the endpoint you want to monitor. If you don’t know what to start with, you can use `https://www.shopist.io/`, which is a test web application.
    - Select **Advanced Options** to use custom request headers, authentication credentials, body content, or cookies.
    - You can set tags such as `env:prod` and `app:shopist` on your test. Tags help to keep things organized and allow you to quickly find the tests you're interested in on the homepage.
    - Choose from the **Managed Locations** to run your test from.
    - Click the **Test URL** button.
>>>>>>> datadog-api-spec/generated/1041

{{< img src="getting_started/synthetics/api-test-config.png" alt="API test configuration"  style="width:60%;">}}

#### Define assertions

<<<<<<< HEAD
Datadog automatically populates basic assertions about your endpoint's response. Assertions define the alert condition and are customizable. 

In this example, three default assertions populate after the URL is tested:

{{< img src="getting_started/synthetics/assertions-example.png" alt="Browser test failure"  style="width:90%;">}}

To add a custom assertion, click anywhere in the response preview or click **New Assertion**.
=======
After clicking Test URL, basic assertions based on your endpoint's response are automatically populated. Assertions define the alert condition and can be customized. In this example, three default assertions are populated when testing the URL:

{{< img src="getting_started/synthetics/assertions-example.png" alt="Browser test failure"  style="width:90%;">}}

These assertions define the alert condition and can be customized. To add a custom assertion, directly click on the response preview or click the New Assertion button to add an assertion manually (e.g., body contains Shop.ist)
>>>>>>> datadog-api-spec/generated/1041

{{< img src="getting_started/synthetics/api-test-configuration.gif" alt="Browser test failure"  style="width:90%;">}}

#### Select locations 

Select one or more **Managed Locations** or **Private Locations** to run your test from.

Your managed locations often include public-facing websites and endpoints. To test internal applications or simulate user behavior in discrete geographic regions, select **Private Locations** instead.

For more information, see [Getting Started with Private Locations][3].

#### Specify test frequency

Select the frequency of your test runs.

#### Define alert conditions

You can specify the number of failures per location before the location is considered failed:

```text
Retry x time before location is marked as failed
```

After a location fails, retries immediately run.

**Note**: By default, the wait time for a failed test to retry is 300ms. You can configure the interval with the [Synthetics API][4].

To receive alerts when your endpoint goes down for three minutes on two different locations, set up an alerting condition such as:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

**Note**: By default, there is a 300ms wait before retrying a test that failed. This interval can be configured via the [API][4].

Once alert conditions are set, create a message for the alert and specify what services and team members receive the alert notification email and click **Save Test**. You can also use [integrations][5], such as Slack, PagerDuty, webhooks, etc., to receive alert notifications.

### Test results

The API test details page includes details about the test configuration, uptime associated with the tested endpoint, historical graphs for response time and network timings, as well as the list of individual test results and events.

To troubleshoot a failed test, scroll to the Test Results section and click on one of the failing test results. Review the failed assertions and response details such as returned status code, response time, and associated headers and body to diagnose the issue.

{{< img src="getting_started/synthetics/api-test-failure.png" alt="API test failure"  style="width:90%;">}}

Datadog also has an [APM integration with Synthetic Monitoring][6] which allows you to go from a test run that failed to the root cause of the issue by looking at the trace generated by that test run.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<<<<<<< HEAD
=======
>>>>>>> datadog-api-spec/generated/1041
[1]: /synthetics/api_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /getting_started/synthetics/private_location
[4]: /api/v1/synthetics/#create-or-clone-a-test
[5]: /integrations/
[6]: /synthetics/apm/
