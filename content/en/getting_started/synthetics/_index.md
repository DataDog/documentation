## Overview
Datadog Synthetics monitors your applications and API endpoints via simulated user requests and browser rendering. Synthetics helps you ensure uptime, identify regional issues, and track application performance. By unifying Synthetics with your metrics, traces, and logs, Datadog allows you to observe how all your systems are performing, as experienced by your users.

{{< img src="synthetics/synthetics_home_page.png" alt="Synthetics home page" responsive="true">}}

This guide shows you how to set up your first Synthetics test with Datadog. Follow the sections below to configure your API, browser test, or private location for internal-facing apps or private URLs.

## Prerequisites

The browser tests can be only recorded from **[Google Chrome][1]**. Datadog will prompt you to download this extension during the creation of the test. You can also download the [Datadog Record Test extension for Google Chrome][2].

## Create a Datadog account

If you haven't already, create a [Datadog account][3].

## Configure your first test

Synthetics offers three different ways to monitor your applications and API endpoints: API test, browser test, and private locations.

### Create an API test

[API tests][4] help you monitor your API endpoints and alert you when they are failing or too slow. These checks verify that your applications are responding to requests and meet any conditions you define, such as response time, HTTP status code, and header or body contents. Use the [Datadog API][5] to see the full list.

To configure an API test:

1. In the Datadog application, hover over **UX Monitoring** in the left hand menu and select **Synthetics Test**. 
2. In the top right corner, click the **New Test** button. 
3. Select **API test**.
4. Define the configuration of your API test.

{{< tabs >}}

{{% tab "HTTP Test" %}}

{{< img src="synthetics/api_tests/make-http-request.png" alt="Make HTTP Request" responsive="true" style="width:80%;" >}}

Define the request you want to be executed by Datadog:

1. **Choose request type**: `HTTP`
2. Choose the **Method** and **URL** to query. Available methods are: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, and `OPTIONS`.
3. **Name**: Set the name of your API test.
4. **Select your tags**: Select the tags attached to your API test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the [Synthetics page][1].
5. **Locations**: Select which Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][2]. You can also set up a [Private Location][3] to run a Synthetics API test on a private endpoint not accessible from the public internet.
6. **How often should Datadog run the test?** Set the interval for how often the test will run. Intervals are available between every one minute to once per week.
7. Click on **Test URL** to try out the request configuration. You should see a response preview show up on the right side of your screen.

[1]: /synthetics
[2]: /api/?lang=bash#get-available-locations
[3]: /synthetics/private_locations
{{% /tab %}}

{{% tab "SSL Test" %}}

{{< img src="synthetics/api_tests/make-ssl-request.png" alt="Make SSL Request" responsive="true" style="width:80%;" >}}

1. **Choose request type**: `SSL`
2. Specify the `Host` and the SSL `Port`. By default, the port is set to _443_.
3. **Name**: The name of your API test.
4. **Select your tags**: Select the tags attached to your API test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the [Synthetics page][1].
5. **Locations**: Select which Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][2]. You can also set up a [Private Location][3] to run a Synthetics API test on a private endpoint not accessible from the public internet.
6. **How often should Datadog run the test?** Set the interval for how often the test will run. Intervals are available between every five minutes to once per week.
7. Click on **Test Connection** to try out the request configuration. You should see a response preview show up on the right side of your screen.
[1]: /synthetics
[2]: /api/?lang=bash#get-available-locations
[3]: /synthetics/private_locations
{{% /tab %}}

{{< /tabs >}}

#### Set alert conditions and assertions

Once the URL is tested, a response preview will populate in a panel to the right of the configuration options. If the test fails, review the error [here][6].

This panel list test response status, headers, and body. It also automates the creation of [alert conditions][7]. Alert conditions determine the circumstances under which you want a test to send a notification alert. 

For example, set an alert condition for specific status codes, such as 4xx and 5xx, and select the server listed in the response preview header. This will send you a notification when there is a client or server error on a server that's assimilated with your API endpoint.

You can also set the alert conditions to retry a test if an assertion fails. To configure, set the pre-populated input areas in the given alert condition:

`An alert is triggered if your test fails for x minutes from any x of x locations. Retry x times before location is marked as failed.`

Configure the minutes, locations, and retry time and an alert will automatically generate when these conditions are met.

**Note**: You can decide the number of retries needed to consider a location as failed before sending a notification alert. By default, Synthetics tests do not retry after a failed result for a given location.

To create an alert condition using custom assertions:

1. In the **Headers** section of this panel, click on any header to auto-populate an alert condition under *Make a request* in the test configuration options. You can also manually add an [assertion][8], such as `body`, `header`, `response type`, or `status code` to create customized alert conditions.

2. Enter an message associated with the alert condition and who the message should be sent to. Use `@` to tag people in the body of the message and select, from the dropdown list, who to send the alert to. You can also type in an email address in this location to send to any team or member that is not listed.

3. Click the **Save test** button. Your test is now populated in its own page, which includes details on properties, history, and test results.

The **Synthetics Tests** page is useful for monitoring changes over time and verifying request anomalies across all of your synthetics tests. You can monitor this as well as events and test results to expedite troubleshooting during downtime. Once you create a few tests, preview all of tests in realtime on this page.

### Create a browser test

[Browser tests][9] are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, and from multiple devices. These checks verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

To create a browser test:

1. In the Datadog application, hover over **UX Monitoring** in the left hand menu and select *Synthetics Test*. 
2. In the top right corner, click the *New Test* button. 
3. Select *Browser Test*. 
4. Define the configuration of your browser test.

1. **Starting URL**: Set the URL from which your browser test starts the scenario.
    * Advanced Options (optional): Set custom request headers, cookies, or authenticate through Basic Auth.
        * Headers: Defined headers override the default browser headers. For example, set the User Agent in the header to [identify Datadog scripts][10].
        * Authentication: Authenticate through HTTP Basic Authentication with a username and a password.
        * Cookies: Defined cookies are added to the default browser cookies. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

2. **Name**: Set the name of your browser test.
3. **Select your tags**: Select the tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the Synthetics page.
4. **Devices**: Select which devices to run your check on. Available devices are `Laptop Large`, `Tablet`, and `Mobile Small`.
5. **Locations**: Select which Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][5]. You can also set up a [Private Location][11] to run a Synthetics Browser test on a private URL not accessible from the public internet.
6. **How often should Datadog run the test?** Set the interval for how often the test will run. Intervals are available between every 15 minutes to once per week. [Contact support][12] to enable additional frequencies for your test.
7. **Alert conditions**: Set the conditions that need to be met (`minutes`, `locations`, and `retry`) for a test to retry if it has failed.
8. **Notify your team**: Enter an message associated with the alert condition and who the alert should be sent to. Use `@` to tag people in the body of the message and select, from the dropdown list, who to send the alert to. You can also type in an email address in this location to send to any team or member that is not listed.
9. Once you've input all required fields, click the *Save Details & Record Test* button.

#### Record a test with variables and assertions

Tests can be only recorded from **[Google Chrome][1]**. To record your test, download the [Datadog Record Test extension for Google Chrome][2].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test" responsive="true" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issues in the displayed window within Datadog's interface.
2. Click on **Start recording** to begin recording your browser test.
3. Your actions are recorded and used to create steps within your browser test scenario. You can record the uploading of files as an action, though this is limited to 10 files, with a limit of 5MB each.
4. Use the actions available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/browser_test_step.png" alt="Browser Test steps" responsive="true" style="width:80%;">}}
**Note**: **Your last browser test step must be an Assertion**, otherwise there is nothing to check.
5. Click the **Variables** button under *Add New*. Select `Pattern`, `Element`, `Global Variable`, or `Email` from the dropdown menu. For example, select `Email` and Datadog will create a special email variable that allows you to test that an email was sent by the UI and received by an email server.
6. Click the **Assertion** button under *Add New*. Select an assertion, such as `Test that an email was received`.
    
    [Assertions][13] allow you to check whether an element, some content, or some text is available on the current page. You can also check whether a specific email was sent. For example, you can create an assertion that checks whether an email was sent and whether specific values (string, number, regex) are present within the email subject or body. This assertion leverages email variables.
7. Select the subject condition and click **Use variable**. Select the email variable you created. This assigns the email variable you created to the assertion. Select the body condition and click **Use variable**. Select the email variable you created.
8. Once you have finished your Scenario, click on **Save and Launch Test**.

The test overview page includes properties, history, sample results, and test results. In the top right corner, choose to **Run Test Now**, **Pause Test**, **Edit Test Details**, **Edit Recording**, **Clone**, or **Delete** a test. Under properties, add tags to keep your tests organized in the [Synthetics list][14]. All additional configuration for your tests occur in this page. To create a new test or preview existing tests, navigate back to [synthetics tests][14].

### Private locations

[Private locations][11] allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetics location. 

To create a private location:

1. In the Datadog app, hover over **UX Monitoring** and select *Settings* -> *Private Locations*. Create a new private location:

    {{< img src="synthetics/private_locations/create_private_location.png" alt="create a private locations" responsive="true" style="width:70%;">}}

2. Fill out the Location Details and click **Save and Generate** to generate the configuration file associated with your private location on your worker.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen.
    **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

3. Launch your worker as a standalone container using the Docker run command provided and the previously created configuration file:

    ```
    docker run --init --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    One worker can process up to 10 tests in parallel by default. To scale a private location:
      * Change the `concurrency` parameter value to allow more parallel tests from one worker.
      * Add or remove workers on your host. It is possible to add several workers for one private location with one single configuration file. Each worker would then request `N` requests depending on its number of free slots and when worker 1 is processing tests, worker 2 requests the following tests, etc.

4. To pull test configurations and push test results, the private location worker needs access to one of the Datadog API endpoints:

    * For the Datadog US site: `api.datadoghq.com/api/`.
    * For the Datadog EU site: `api.datadoghq.eu/api/`.

    Check if the endpoint corresponding to your Datadog Site is available from the host running the worker:

    * For the Datadog US site: `curl https://api.datadoghq.com`.
    * For the Datadog EU site:   `curl https://api.datadoghq.eu`.
    
**Note**: You must allow outbound traffic on port `443` because test configurations are pulled and test results are pushed via HTTPS.

5. If your private location reports correctly to Datadog you should see the corresponding health status displayed if the private location polled your endpoint less than 5 seconds before loading the settings or create test pages:

  * In your private locations list, in the Settings section:

    {{< img src="synthetics/private_locations/private_location_pill.png" alt="private locations pills" responsive="true" style="width:70%;">}}

  * In the form when creating a test, below the Private locations section:

    {{< img src="synthetics/private_locations/private_locations_in_list.png" alt="private locations in list" responsive="true" style="width:70%;">}}

6. You should now be able to use your new private location as any other Datadog managed locations for your [Synthetics API tests][4].

## Next Steps

{{< whatsnext desc="After you set up your first Synthetics test:">}}
    {{< nextlink href="/synthetics/apm/" tag="Documentation" >}}Learn about APM integration with Synthetics{{< /nextlink >}}
    {{< nextlink href="/synthetics/browser_tests/#subtests" tag="Documentation" >}}Create a browser subtest{{< /nextlink >}}
    {{< nextlink href="/synthetics/settings/" tag="Documentation" >}}Configure advance Synthetics settings{{< /nextlink >}}

{{< /whatsnext >}}


[1]: https://www.google.com/chrome/
[2]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[3]: https://www.datadoghq.com/
[4]: /synthetics/api_tests/
[5]: https://docs.datadoghq.com/api/?lang=bash#update-an-index
[6]: /synthetics/api_tests/?tab=httptest#test-failure
[7]: /synthetics/api_tests/?tab=httptest#alert-conditions
[8]: /synthetics/api_tests/?tab=httptest#assertions
[9]: /synthetics/browser_tests/
[10]: /synthetics/identify_synthetics_bots
[11]: /synthetics/private_locations
[12]: /help
[13]: /synthetics/browser_tests/#assertion
[14]: https://app.datadoghq.com/synthetics/list
