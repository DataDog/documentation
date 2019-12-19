## Overview

Datadog Synthetics offers two different ways to monitor your applications: API tests to monitor the uptime of your API endpoints and browser tests to check key user journeys. Your tests can be run either from managed locations or from private locations. Synthetics helps you ensure uptime, identify regional issues, and make sure key web transactions can be performed on your application.

{{< img src="synthetics/synthetics_home_page.png" alt="Synthetics home page" responsive="true">}}

By unifying Synthetics with your metrics, traces, and logs, Datadog allows you to observe how all your systems are performing, as experienced by your users. The [Synthetics][1] homepage details all of this information to give you real-time status updates, response times, and uptimes.

This guide shows you how to set up your first Synthetics tests with Datadog. Follow the sections below to configure an API test, browser test, or private location for internal-facing apps or private URLs.

## Prerequisites

If you haven't already, create a [Datadog account][2].

## Configure your first tests

### Create a browser test

[Browser tests][3] are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, and from multiple devices. These checks verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

In this example, a browser test is configured to map a user's journey from adding an item to cart to successful checkout. If any step during the browser test fails, it throws an error that is recorded in Datadog as a **Test Result**.

{{< img src="getting_started/synthetics/browser-test.png" alt="Browser test" responsive="true" style="width:90%;" >}}

#### Configure your test

1. In the Datadog application, hover over **UX Monitoring** in the left hand menu and select **Synthetics Test**. 
2. In the top right corner, click the **New Test** button. 
3. Select **Browser Test**.
4. Define the configuration of your browser test:
    - Add the URL of the website you’re interested in monitoring. If you don’t know what to start with, you can use https://www.shopist.io/ as a test web application.”
    - Name the test.
    - Set tags to help organize tests.
    - Choose devices and locations for testing. In this example, the test is only run on **Large Laptop** & on **English speaking countries**.
    - Specify a test frequency.
    - Set alert conditions to determine the circumstances under which you want a test to send a notification alert. To avoid being alerted on network blips that might happen on specific locations, this test is configured as:
        `An alert is triggered if your test fails for 0 minutes from any 3 of 13 locations`
        `Retry 1 time before location is marked as failed`
    - Write an alert message and specify who to notify when the alert is triggered.
    - Click **Save & Edit Recording**.

{{< img src="getting_started/synthetics/configured-browser-test.gif" alt="Configured browser test" responsive="true" style="width:90%;">}}

#### Record your test steps

Once the test configuration is saved, Datadog will prompt you to download the [Datadog test recorder][4] extension. Browser tests can be only recorded on **[Google Chrome][5]**. Download and install the extension.

Once this extension is installed, begin recording your test steps by clicking the **Start Recording** button. Navigate your page in the iframe to the right of the recording options. When you select a div, image, or any area of your page, the actions are recorded and used to create steps within the browser test. You can record the uploading of files as an action, though this is limited to 10 files, with a limit of 5MB each. 

For example, to record test steps that map a user's journey from adding an item to cart to successful checkout:

1. Navigate to one of the furniture sections, for instance **Chairs**, and select **Add to cart**.
2. Click on **Cart**, click **Checkout**.
3. Add the **assertion** “Test text is present on the active page” to confirm the words “Thank you” are on the page. 
    **Note**: Your last browser test step must be an **assertion**. This will ensure your test ended up on the expected page and found the expected element. 
4. Save the test.

{{< img src="getting_started/synthetics/record-test.gif" alt="Record test steps" responsive="true" style="width:90%;">}}

**Note**: the website used in this example regularly throws an error causing it to intentionally fail. A notification email will be triggered when the test failure occurs.

#### Test results

A **browser test** homepage will automatically populate after save. This page includes property information, historical graphs for response time and uptime, sample results, and all events and test results. Sample results include errors, resources, and traces.

In this example, the browser test homepage shows that a recent test failed and an alert was received via email. Click on the failed test under **Test Results** or in the email. The failed test step is highlighted with a red `x`. Click the failed test to begin troubleshooting. 

The **Errors & Warnings** tab provides a list of javascript and network errors, the **Resources** tab locates the resource providing this status, and the **Traces** tab maps the entirety of the request in seconds. This test failed as the result of a server timeout. The resource, `https://api.shopist.io/checkout.json`, posted the status and the targeted source of the problem is a controller linked to checkout. You have now successfully found the route of the problem.

{{< img src="getting_started/synthetics/browser-test-failure.png" alt="Browser test failure" responsive="true" style="width:100%;">}}

Datadog also has an [APM integration with Synthetics][6] which allows you to go from a test run that failed to the root cause of the issue by looking at the trace generated by that test run. To link browser test results with APM, whitelist the URLs you want the APM integration headers added to. Use * for wildcards: `https://*.datadoghq.com/*`

Alerts triggered with the APM integration populate under **Test Results**.

## Create an API test

[API tests][7] help you monitor your API endpoints and alert you when they are failing or too slow. These checks verify that your applications are responding to requests and meet any conditions you define, such as response time, HTTP status code, and header or body contents. Use the [Datadog API][8] to see the full list.

In this example, an API test is created to ensure your website is constantly up and providing responses in a specific amount of time.

### Configure the request

1. In the Datadog application, hover over **UX Monitoring** in the left hand menu and select **Synthetics Test**. 
2. In the top right corner, click the **New Test** button. 
3. Select **API test**.
4. Define the configuration of your API test:
    - Add a start URL.
    - Select **Advance Options** to use custom request headers, authentication credentials, body content, or cookies.
    - Add one or two tags, like `prod`, to help organize and filter tests.
    - Select locations for testing.
    - Click the **Test URL** button.

#### Define your alert conditions

Now that the test is completed, if you did not create any [assertions][9], they are automatically populated. API tests require at least one assertion to be monitored by Datadog. An assertion is defined by a parameter, an optional property, a comparator, and a target value.

In this example, three default assertions are populated when testing the URL:
```
When status code is 200
And header content-type is text/html; charset=utf
And response time less than 2000 ms
```

These assertions define the alert condition and can be customized. To add a custom assertion, click on any response header in the response preview. You can also click the **New Assertion** button to add an assertion manually, (e.g., `body` contains `Shop.ist`.)

To configure the manual retry of a test when it fails, set:
```
An alert is triggered if your test fails for x minutes from any x of x locations`
Retry x time before location is marked as failed
```

Once alert conditions are set, create a message for the alert and specify what services and team members to receive the alert notification email and click **Save Test**. You can also use [integrations][10], such as Slack, Pagerduty, webhooks, etc., to receive alert notifications.

{{< img src="getting_started/synthetics/api-test-configuration.gif" alt="Browser test failure" responsive="true" style="width:90%;">}}

### Test results

An **API test** homepage will automatically populate after save. This page includes property information, historical graphs for response time and uptime, sample results, and all events and test results. Sample results include errors, resources, and traces. 

To troubleshoot a failed test, scroll to the Test Results section and click on the **Test Results** tab. Click on the failed test, labeled as `Alert`, to view detailed test results. Review the failed assertions and response details such as returned status code, response time, and associated headers and body to resolve the issue.

{{< img src="getting_started/synthetics/api-test-failure.png" alt="API test failure" responsive="true" style="width:90%;">}}

Datadog also has an [APM integration with Synthetics][6] which allows you to go from a test run that failed to the root cause of the issue by looking at the trace generated by that test run. To link browser test results with APM, whitelist the URLs you want the APM integration headers added to. Use * for wildcards: `https://*.datadoghq.com/*`

Alerts triggered with the APM integration populate under **Test Results**. Click the result link given to review test details and traces.

## Set up your first private location

Private locations allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetics location.

The private location worker is shipped as a Docker container, so it can run on a Linux based OS or Windows OS if the Docker engine is available on your host and can run in Linux containers mode.

By default, every second, your private location worker pulls your test configurations from Datadog’s servers using HTTPS, executes the test depending on the frequency defined in the configuration of the test, and returns the test results to Datadog’s servers.

Once you created a private location, configuring a [Synthetics API test][#configure-the-request] from a private location is completely identical to the one of Datadog managed locations.

To configure a private location:

1. In the Datadog app, hover over **UX Monitoring** and select *Settings* -> *Private Locations*. Create a new private location:

    {{< img src="synthetics/private_locations/create_private_location.png" alt="create a private locations" responsive="true" style="width:100%;">}}

2. Fill out the Location Details and click **Save and Generate** to generate the configuration file associated with your private location on your worker.

3. Copy and paste the first tooltip to create your private location configuration file.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen. **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

3. Launch your worker as a standalone container using the Docker run command provided and the previously created configuration file:

    `docker run --init --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker`

4. If your private location reports correctly to Datadog, you will see the corresponding health status displayed if the private location polled your endpoint less than 5 seconds before loading the settings or create test pages:

  * In your private locations list, in the Settings section:

    {{< img src="synthetics/private_locations/private_location_pill.png" alt="private locations pills" responsive="true" style="width:100%;">}}

  * In the form when creating a test, below the private locations section:

    {{< img src="synthetics/private_locations/private_locations_in_list.png" alt="Private locations in list" responsive="true" style="width:75%;">}}

    You will also see private location logs populating similar to this example:
    ```
    2019-12-17 13:05:03 [info]: 	Fetching 10 messages from queue - 10 slots available 
    2019-12-17 13:05:03 [info]: 	Fetching 10 messages from queue - 10 slots available 
    2019-12-17 13:05:04 [info]: 	Fetching 10 messages from queue - 10 slots available
    ```

6. You are now able to use your new private location as any other Datadog managed locations for your [Synthetics API tests][7]. Create an API test.
7. Select the new private location under **Private Locations**.
8. Click the **Save Test** button.

For a more advanced setup, use the command `docker run --rm datadog/synthetics-private-location-worker --help and check`.

## Next Steps

{{< whatsnext desc="After you set up your first Synthetics test:">}}
    {{< nextlink href="/synthetics/browser_tests" tag="Documentation" >}}Learn more about browser tests{{< /nextlink >}}
    {{< nextlink href="/synthetics/api_tests" tag="Documentation" >}}Learn more about API tests{{< /nextlink >}}
    {{< nextlink href="/synthetics/browser_tests/#subtests" tag="Documentation" >}}Create a browser subtest{{< /nextlink >}}
    {{< nextlink href="/synthetics/settings/" tag="Documentation" >}}Configure advance Synthetics settings{{< /nextlink >}}

{{< /whatsnext >}}


[1]: https://app.datadoghq.com/synthetics/list
[2]: https://www.datadoghq.com/
[3]: /synthetics/browser_tests
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[5]: https://www.google.com/chrome/
[6]: /synthetics/apm/
[7]: /synthetics/api_tests
[8]: /api/?lang=bash#create-a-test
[9]: /synthetics/api_tests/?tab=httptest#assertions
[10]: /integrations
