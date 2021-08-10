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
    - link: '/synthetics/ci'
      tag: 'Documentation'
      text: 'Learn how to trigger Synthetic tests from your CI/CD pipeline'
    - link: '/synthetics/identify_synthetics_bots'
      tag: 'Documentation'
      text: 'Learn how to identify Synthetic bots for API tests'
    - link: '/api/v1/synthetics/#create-a-test'
      tag: 'API Docs'
      text: 'Create a Synthetic test programmatically'

---

## Create a single API test

[API tests][1] **proactively monitor** that your most important services are available at anytime and from anywhere. API tests come in five different subtypes that allow you to launch requests on the **different network layers** of your systems.

The example below demonstrates the creation of an [HTTP test][2], a subtype of [API tests][1]. [HTTP tests][1] **monitor your API endpoints** and **alert you** when they become too slow or fail. These tests verify that your applications are responding to requests and meeting any conditions you define, such as expected **response time**, **HTTP status code**, and **header or body contents**.

### Define request

1. In the Datadog application, hover over **[UX Monitoring][3]** in the left hand menu and select **[Synthetic Tests][3]**.
2. In the top right corner, click the **New Test** button.
3. Select **[New API test][4]**.
4. Select the `HTTP` request type.
5. Define your request:

    - Add the URL of the endpoint you want to monitor. If you don’t know what to start with, you can use `https://www.shopist.io/`, a test web application. Defining the endpoint to test automatically populates the name of your test to `Test on www.shopist.io`. You can change your test name to something else if you want to.
    - You can select **Advanced Options** to use custom request headers, authentication credentials, body content, or cookies.
    - You can set tags such as `env:prod` and `app:shopist` on your test. Tags allow you to keep your test suite organized and quickly find tests you're interested in on the homepage.
    - You can use secure [global variables][5] for any credentials in your API call. You can also create [local variables][6] to inject a dynamically defined timestamp in your request payload. After creating these variables, type `{{` and select a variable to inject the variable in your test options.

6. Click **Test URL** to trigger a sample test run.

{{< img src="getting_started/synthetics/api-test-config-3.png" alt="API test configuration"  style="width:100%;">}}

### Define assertions

Clicking **Test URL** automatically populates basic assertions about your endpoint's response. Assertions define what a successful test run is.

In this example, three default assertions populate after triggering the sample test run:

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="Default assertions"  style="width:100%;">}}

Assertions are fully customizable. To add a custom assertion, click on elements of the response preview or click **New Assertion**. 

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="Example API test configuration"  video="true"  >}}

**Note**: You can also leverage [global][7] and [local][8] variables in your assertions.

### Select locations 

Select one or more **Managed Locations** or **Private Locations** to run your test from.

Managed locations allow you to test public-facing websites and endpoints. To test internal applications or simulate user behavior in discrete geographic regions, select one of your **Private Locations** instead.

For more information on how to set up private locations, see [Getting Started with Private Locations][9].

### Specify test frequency

Select the frequency at which you want your test to execute. 

In addition to running your Synthetic test on a schedule, you can trigger them manually or directly from your CI/CD pipelines. For more information, see [Synthetic CI/CD Testing][10].


### Define alert conditions

You can define alert conditions to ensure your test does not trigger for things like a sporadic network blip, so that you only get alerted in case of real issues with your endpoint.

You can specify the number of consecutive failures that should happen before considering a location failed:

```text
Retry test 2 times after 300 ms in case of failure
```

You can also configure your test to only trigger a notification when your endpoint goes down for a certain amount of time and number of locations. In the below example, the alerting rule is set to send a notification if the test fails for three minutes on two different locations:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Notify your team

Add an alert name to the **Monitor Name** field and write a message for the alert. You can use [integrations][11] such as Slack, PagerDuty, Microsoft Teams, and webhooks to route your alert to specific services and teams.

You can set time for your alert notification to re-notify if the alert has not been resolved and define the priority of the alert, ranging from **P5 (Info)** to **P1 (Critical)**.

When you're ready to run your test, click **Save Test**. 

## Create a multistep API test

[Multistep API tests][12] run HTTP requests in sequence, allowing you to configure [HTTP tests][2] on complex backend systems. 

### Configure the test

When you create a [multistep API test][12], you can define a sequence of HTTP requests and create variables from the response data to re-inject their values in subsequent steps. 

1. In **New Test** > **[Multistep API test][5]**, add a name, select a tag, and select locations for your [Multistep API test][5].
2. In **Define steps**, click **Create Your First Step**. 

    - Add a name to your step such as `Get a cart`.
    - Specify the URL you want to query. If you don’t know what to start with, select `POST` and use `https://api.shopist.io/carts`, a test application.
    - Select **Advanced Options** to add custom request headers, authentication credentials, body content, or cookies.
    - Click **Test URL**. 
    - Optionally, add an assertion based on information in the **Response Body** or click inside the **Response Header**.
    - Optionally, define the execution parameter by enabling the test to continue if the step fails or specifying the number of times to retry the test after a specific amount of milliseconds in case of failure.
    - Optionally, extract variables from the response content by clicking **Extract a variable from response content** and entering a variable name such as `CART_ID`. 

   To extract a variable from the response header:

    - Click inside the **Response Header** to specify which header you want to extract a value from or specify a header such as `location` in the **Header from which to extract value** field.
    - Add a regular expression in the **Parsing Regex** field such as `(?:[^\\/](?!(\\|/)))+$` to extract the location of the cart.

3. Click **Save Variable**.
4. When you're done creating this variable, click **Save Step**.
5. Click **Add Another Step** to add another step. By default, you can create up to ten steps.
    - Add a name to your step such as `Get a product`.
    - For the URL, select `GET` and use `https://api.shopist.io/products.json`.
    - Configure any **Advanced Options** and click **Test URL**.
    - Optionally, add an assertion based on information in the **Response Body** or click inside the **Response Header**.
    - Optionally, define the execution parameter by enabling the test to continue if the step fails or specifying the number of times to retry the test after a specific amount of milliseconds in case of failure.
    - Optionally, extract variables from the response content by clicking **Extract a variable from response content** and entering a variable name such as `PRODUCT_ID`. 
   
   To extract a variable from the response body:

    - Scroll through the **Response Body**, select a query language (JSON Path, XPath 1.0, or Regex) to parse the body content with, and add an expression in the **Parse** or **Path** field. 
    - To automatically generate the JSON path for the variable, click on the response body content such as `$oid:`. 
    - Optionally, you can select **Use Full Response Body**.

6. When you're done creating this variable, click **Save Step**.
7. Click **Add Another Step** to add another step about adding a product into your cart.
    - Add a name to your step such as `Add product to cart`.
    - For the URL, select `POST` and use `https://api.shopist.io/add_item.json`.
    - In the **Request Header** field of **Advanced Options** > **Request Options**, add `content-type` as the name and `application/json` as the value.
    - In the **Request Body** field, insert the following:
        ```
        {
          "cart_item": {
            "product_id": "{{ PRODUCT_ID }}",
            "amount_paid": 500,
            "quantity": 1
          },
          "cart_id": "{{ CART_ID }}"
        } 
        ```

    - Click **Test URL**.
    - Optionally, extract variables from the response content by clicking **Extract a variable from response content** and entering a variable name such as `CHECKOUT_URL`. 
   
   To extract a variable from the response body:   

    - Scroll through the **Response Body**, select **Parse With JSON Path**, and add an expression such as `$.url` in the **Parse JSON** field.  

8. When you're done creating this variable, click **Save Step**.

9. Optionally, type `{{` in the **URL** and a list of extracted and global variables appears. 
    - Select an extracted variable to inject in your test step. You can add your extracted variables in the **Step URL** or in the request header, cookies, and HTTP authentication fields in **Advanced Options** > **Request Options**.  

10. Configure the rest of your test conditions including test frequency, alerting conditions, and alert message.

When you're ready to run your test, click **Save Test**. 

## Test results

The **API test** and **Multistep API test detail** pages display an overview of the test configuration, the global uptime associated with the tested endpoint by location, graphs about response time and network timings, and a list of test results and events.

To troubleshoot a failed test, scroll down to **Test Results** and click on a failing test result. Review failed assertions and response details such as status code, response time, and associated headers and body to diagnose the issue.

{{< img src="getting_started/synthetics/api-test-failure-4.png" alt="API test failure"  style="width:100%;">}}

With Datadog's [APM integration with Synthetic Monitoring][6], access the root cause of a failed test run by looking at the trace generated from the test run in the **Traces** tab.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/api_tests/http_tests
[3]: https://app.datadoghq.com/synthetics/list
[4]: https://app.datadoghq.com/synthetics/create
[5]: https://app.datadoghq.com/synthetics/multi-step/create
[6]: /synthetics/apm/
[7]: /synthetics/settings/#global-variables
[8]: /synthetics/api_tests/http_tests#variables
[9]: /getting_started/synthetics/private_location
[10]: /synthetics/ci
[11]: /integrations/#cat-notification
[12]: /synthetics/multistep
