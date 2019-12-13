## Overview
Datadog Synthetics offers two different ways to monitor your applications: API tests to monitor the uptime of your API endpoints and browser tests to check key user journeys. Your tests can be run either from managed locations or from private locations. Synthetics helps you ensure uptime, identify regional issues, and make sure key web transactions can be performed on your application.

{{< img src="synthetics/synthetics_home_page.png" alt="Synthetics home page" responsive="true">}}

By unifying Synthetics with your metrics, traces, and logs, Datadog allows you to observe how all your systems are performing, as experienced by your users. The [Synthetics][1] homepage details all of this information to give you real-time status updates, response times, and uptimes.

This guide shows you how to set up your first Synthetics test with Datadog. Follow the sections below to configure an API test, browser test, or private location for internal-facing apps or private URLs.

## Prerequisites

Browser tests can be only recorded from **[Google Chrome][2]**. Datadog will prompt you to download the Datadog Record Test extension during the creation of the test. You can also [download this extension directly from the Chrome Web Store][3].

## Create a Datadog account

If you haven't already, create a [Datadog account][4].

## Configure your first test

### Create an API test

[API tests][5] help you monitor your API endpoints and alert you when they are failing or too slow. These checks verify that your applications are responding to requests and meet any conditions you define, such as response time, HTTP status code, and header or body contents. Use the [Datadog API][6] to see the full list.

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
5. **Locations**: Select which Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][2]. You can also set up a [Private Location](#set-up-a-private-location) to run a Synthetics API test on a private endpoint not accessible from the public internet.
6. **How often should Datadog run the test?** Set the interval for how often the test will run. Intervals are available between every one minute to once per week.
7. Click on **Test URL** to try out the request configuration. You will see a response preview show up on the right side of your screen.

[1]: /synthetics
[2]: /api/?lang=bash#get-available-locations
{{% /tab %}}

{{% tab "SSL Test" %}}

{{< img src="synthetics/api_tests/make-ssl-request.png" alt="Make SSL Request" responsive="true" style="width:80%;" >}}

1. **Choose request type**: `SSL`
2. Specify the `Host` and the SSL `Port`. By default, the port is set to _443_.
3. **Name**: The name of your API test.
4. **Select your tags**: Select the tags attached to your API test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the [Synthetics page][1].
5. **Locations**: Select which Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][2]. You can also set up a [Private Location](#set-up-a-private-location) to run a Synthetics API test on a private endpoint not accessible from the public internet.
6. **How often should Datadog run the test?** Set the interval for how often the test will run. Intervals are available between once every minute to once per week.
7. Click on **Test Connection** to try out the request configuration. You should see a response preview show up on the right side of your screen.
[1]: /synthetics
[2]: /api/?lang=bash#get-available-locations
{{% /tab %}}

{{< /tabs >}}

#### Assertions

Once the URL is tested, a response preview will populate in a panel to the right of the configuration options. If the test fails, you can [review the error][7].

This panel shows the request as well as the response preview of your API call. It also automates the creation of assertions on the status code, content-type header, and response time of the request.

You can create custom assertions: in the Headers section of this panel's response preview, click on any header to auto-populate a header assertion. It is also possible to manually add [assertions][8] on body, header, response type, or status code by clicking on New Assertion.

For example, set an assertion on status code being a 200, and select the server listed in the response preview header. This will send you a notification when there is a server error on the server that's assimilated with your API endpoint.

#### Alert conditions

Alert conditions determine the circumstances under which you want a test to send a notification alert. You can decide to be alerted after a specific amount of downtime and/or when failures are happening on a specific number of locations. To configure, set the pre-populated input areas in the given alert condition:

`An alert is triggered if your test fails for x minutes from any x of x locations.`

By default, Synthetics tests do not retry after a failed result for a given location. If you want a location to be considered failed only after a certain number of retries, pre-populate the given alert condition:

`Retry x times before location is marked as failed.`

Configure the `minutes`, `locations`, and `retry` time and an alert will automatically generate when these conditions are met.

#### Set assertions and alert conditions

To create an alert condition using custom assertions:

{{< tabs >}}
{{% tab "HTTP Test" %}}
1. In the **Headers** section of this panel, click on any header to auto-populate an alert condition under *Make a request* in the test configuration options. You can also manually add an [assertion][1], such as `body`, `header`, `response type`, or `status code` to create customized alert conditions.

2. Enter a message associated with the alert condition and who the message should be sent to. Use `@` to tag people in the body of the message and select, from the dropdown list, who to send the alert to. You can also type in an email address in this location to send to any team or member that is not listed.

    **Note**: You can use [webhooks][2] in a message body. The webhook will send a payload to alert your services when an alert is triggered. To use a webhook in an alert message, add `@webhook-*name_of_the_webhook` in the message body to trigger the webhook. For example: `{{location.name}} is down! @webhook-servicename`

3. Click the **Save test** button. Your test is now populated in its own page, which includes details on properties, history, and test results.

An **API test** homepage will automatically populate after save. This page includes property information, historical graphs for response time and uptime, and all events and test results. Click on any test result for more information such as test details, assertions, and response details.

**Notes for HTTP Tests**:

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered if:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes, **AND**
* At one moment during the last *X* minutes, at least *n* locations were in failure

The uptime bar is displayed differently on your test result: location uptime is displayed on a per-evaluation basis (whether the last test was up or down). Total uptime is displayed based on the configured alert conditions. Notifications sent are based on the total uptime bar.

You can decide the number of retries needed to consider a location as *failed* before sending a notification alert. By default, Synthetics tests do not retry after a failed result for a given location.

{{< img src="synthetics/retry-test.png" alt="Fast Retry" responsive="true" style="width:80%;">}}

To create a fast retry for location failures, configure an alert to trigger if a test fails in at least one location and set the test to retry one or more times before it is marked as failed.


[1]: /synthetics/api_tests/?tab=httptest#assertions
[2]: /integrations/webhooks
{{% /tab %}}
{{% tab "SSL Test" %}}

1. In the **Headers** section of this panel, click on any header to auto-populate an alert condition under *Make a request* in the test configuration options. You can also manually add an [assertion][1], such as `body`, `header`, `response type`, or `status code` to create customized alert conditions.

2. Enter an message associated with the alert condition and who the message should be sent to. Use `@` to tag people in the body of the message and select, from the dropdown list, who to send the alert to. You can also type in an email address in this location to send to any team or member that is not listed.

    **Note**: You can use [webhooks][2] in a message body. The webhook will send a payload to alert your services when an alert is triggered. To use a webhook in an alert message, add `@webhook-*name_of_the_webhook` in the message body to trigger the webhook. For example: `{{location.name}} is down! @webhook-servicename`

3. Click the **Save test** button. Your test is now populated in its own page, which includes details on properties, history, and test results.

An **API test** homepage will automatically populate after save. This page includes property information, historical graphs for response time and uptime, and all events and test results. Click on any test result for more information such as test details, assertions, and response details. 

**Notes for SSL Tests**: If one of the assertions defined fails for a given location, an alert is triggered. Two default assertions are created: certificate is valid and certificate expires in more than x days. Custom assertions can be created on `certificate expires in more than x days & on property`. There are no alert conditions for SSL.


[1]: /synthetics/api_tests/?tab=httptest#assertions
[2]: /integrations/webhooks
{{% /tab %}}
{{< /tabs >}}

### Create a browser test

[Browser tests][9] are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, and from multiple devices. These checks verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

To create a browser test:

1. In the Datadog application, hover over **UX Monitoring** in the left hand menu and select *Synthetics Test*. 
2. In the top right corner, click the *New Test* button. 
3. Select *Browser Test*. 
4. Define the configuration of your browser test:

    1. **Starting URL**: Set the URL from which your browser test starts the scenario.
        * Advanced Options (optional): Set custom request headers, cookies, or authenticate through Basic Auth.
            * Headers: Defined headers override the default browser headers. For example, set the User Agent in the header to [identify Datadog scripts][10].
            * Authentication: Authenticate through HTTP Basic Authentication with a username and a password.
            * Cookies: Defined cookies are added to the default browser cookies. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

    2. **Name**: Set the name of your browser test.
    3. **Select your tags**: Select the tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the Synthetics page.
    4. **Devices**: Select which devices to run your check on. Available devices are `Laptop Large`, `Tablet`, and `Mobile Small`.
    5. **Locations**: Select which Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][6]. You can also set up a [Private Location][11] to run a Synthetics Browser test on a private URL not accessible from the public internet.
    6. **How often should Datadog run the test?** Set the interval for how often the test will run. Intervals are available between every 15 minutes to once per week. [Contact support][12] to enable additional frequencies for your test.
    7. **Alert conditions**: Set the conditions that need to be met (`minutes`, `locations`, and `retry`) to trigger an alert.
    8. **Notify your team**: Enter an message associated with the alert condition and who the alert should be sent to. Use `@` to tag people in the body of the message and select, from the dropdown list, who to send the alert to. You can also type in an email address in this location to send to any team or member that is not listed.
    9. Once you've input all required fields, click the **Save Details & Record Test** button.

#### Record a test with variables and assertions

Tests can be only recorded from **[Google Chrome][2]**. To record your test, download the [Datadog Record Test extension for Google Chrome][3].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test" responsive="true" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issues in the displayed window within Datadog's interface.

    **Note**: you can open a pop up in incognito mode by clicking **Open In A Pop Up** + `Shift`. This is particularly useful to record login workflows as the incognito mode will allow you to record your test without any cached browser data.

2. Click on **Start recording** to begin recording your browser test. Navigate on your page in the iframe on the right of the page, or in the pop up you just opened.
3. Your actions are recorded and used to create steps within your browser test scenario. You can record the uploading of files as an action, though this is limited to 10 files, with a limit of 5MB each.
4. Use the actions available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/browser_test_step.png" alt="Browser Test steps" responsive="true" style="width:75%;">}}

    **Note**: **Your last browser test step must be an Assertion**, this will ensure your test ended up on the expected page and found the expected element. This will allow your test to use a different set of keys to perform the recorded journey and confirm it landed on the expected element although some changes on the UI might have happened since the test was first recorded.

5. Click the **Variables** button under *Add New*. Select `Pattern`, `Element`, `Global Variable`, or `Email` from the dropdown menu. For example, select `Email` and Datadog will create a special email variable that allows you to test that an email was sent by the browser test and received by one of our dedicated email servers.

    **Note**: Email assertions require the use of an email variable. For example, if you want to check that a body contains a specific name, create an email variable as noted above and add it to your assertion.

6. Use the email variable as an input step in a test to trigger an email.

    {{< img src="synthetics/testing-variable.png" alt="Browser Test steps" responsive="true" style="width:100%;">}}

7. Click the **Assertion** button under *Add New*. Select an assertion, such as `Test that an email was received`.
    
    [Assertions][13] allow you to check whether an element, some content, or some text is available on the current page. With assertions, you can check the URL of a page or verify that a specific email was sent. For example, you can create an assertion that checks whether an email was sent and whether specific values (string, number, regex) are present within the email subject or body. You first need to create an email variable to be able to use the email assertion. 
    
8. Select the subject condition and click **Use variable**. Select the email variable you created. This assigns the email variable you created to the assertion. Select the body condition and click **Use variable**. Select the email variable you created.
9. Once you have finished your Scenario, click on **Save and Launch Test**.

    {{< img src="synthetics/browser_tests/context-panel.gif" alt="Context panel" responsive="true" style="width:100%;">}}

A **browser test** homepage will automatically populate after save. This page includes property information, historical graphs for response time and uptime, sample results, and all events and test results. Sample results include errors, resources, and traces. To review this information, click on the `error`, `resources`, or `traces` button located next to the sample result action.

### Set up a private location

[Private locations][11] allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetics location. 

To create a private location:

1. In the Datadog app, hover over **UX Monitoring** and select *Settings* -> *Private Locations*. Create a new private location:

    {{< img src="synthetics/private_locations/create_private_location.png" alt="create a private locations" responsive="true" style="width:100%;">}}

2. Fill out the Location Details and click **Save and Generate** to generate the configuration file associated with your private location on your worker.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen.
    **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

3. Launch your worker as a standalone container using the Docker run command provided and the previously created configuration file:

    ```
    docker run --init --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    To scale a private location:
      * Change the `concurrency` parameter value to allow more parallel tests from one worker.
      * Add or remove workers on your host. It is possible to add several workers for one private location with one single configuration file. Each worker would then request `N` tests to run depending on its number of free slots and when worker 1 is processing tests, worker 2 requests the following tests, etc.

4. To pull test configurations and push test results, the private location worker needs access to one of the Datadog API endpoints:

    * For the Datadog US site: `api.datadoghq.com/api/`.
    * For the Datadog EU site: `api.datadoghq.eu/api/`.

    Check if the endpoint corresponding to your Datadog Site is available from the host running the worker:

    * For the Datadog US site: `curl https://api.datadoghq.com`.
    * For the Datadog EU site:   `curl https://api.datadoghq.eu`.
    
**Note**: You must allow outbound traffic on port `443` because test configurations are pulled and test results are pushed via HTTPS.

5. If your private location reports correctly to Datadog, you will see the corresponding health status displayed if the private location polled your endpoint less than 5 seconds before loading the settings or create test pages:

  * In your private locations list, in the Settings section:

    {{< img src="synthetics/private_locations/private_location_pill.png" alt="private locations pills" responsive="true" style="width:100%;">}}

  * In the form when creating a test, below the private locations section:

    {{< img src="synthetics/private_locations/private_locations_in_list.png" alt="Private locations in list" responsive="true" style="width:75%;">}}

6. You should now be able to use your new private location as any other Datadog managed locations for your [Synthetics API tests][5].

## Next Steps

{{< whatsnext desc="After you set up your first Synthetics test:">}}
    {{< nextlink href="/synthetics/apm/" tag="Documentation" >}}Learn about APM integration with Synthetics{{< /nextlink >}}
    {{< nextlink href="/synthetics/browser_tests/#subtests" tag="Documentation" >}}Create a browser subtest{{< /nextlink >}}
    {{< nextlink href="/synthetics/settings/" tag="Documentation" >}}Configure advance Synthetics settings{{< /nextlink >}}

{{< /whatsnext >}}


[1]: https://app.datadoghq.com/synthetics/list
[2]: https://www.google.com/chrome/
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: https://www.datadoghq.com/
[5]: /synthetics/api_tests
[6]: /api/?lang=bash#create-a-test
[7]: /synthetics/api_tests/?tab=httptest#test-failure
[8]: /synthetics/api_tests/?tab=httptest#assertions
[9]: /synthetics/browser_tests
[10]: /synthetics/identify_synthetics_bots
[11]: /synthetics/private_locations
[12]: /help
[13]: /synthetics/browser_tests/#assertion
