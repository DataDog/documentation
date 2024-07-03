---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Learning Center
  text: Introduction to Synthetic Tests
- link: /api/latest/synthetics/#create-an-api-test
  tag: API
  text: Create an API test programmatically
- link: /synthetics/api_tests
  tag: Documentation
  text: Learn more about single API tests
- link: /synthetics/multistep
  tag: Documentation
  text: Learn more about multistep API tests
- link: /getting_started/synthetics/private_location
  tag: Documentation
  text: Learn about private locations
- link: /continuous_testing/cicd_integrations/
  tag: Documentation
  text: Learn how to trigger Synthetic tests from your CI/CD pipeline
- link: /synthetics/guide/identify_synthetics_bots
  tag: Documentation
  text: Learn how to identify Synthetic bots for API tests
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: Learn about Synthetic test monitors
kind: documentation
title: Getting Started with API Tests
---

## Overview

API tests **proactively monitor** that your **most important services** are available at anytime and from anywhere. [Single API tests][1] come in eight subtypes that allow you to launch requests on the different network layers of your systems (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, and `gRPC`). [Multistep API tests][2] enable you to run API tests in sequence to monitor the uptime of key journeys at the API level.

## Create a single API test

HTTP tests monitor your API endpoints and alert you when response latency is high or fail to meet any conditions you define, such as expected HTTP status code, response headers, or response body content.

{{< img src="getting_started/synthetics/api-test.png" alt="Overview of a Synthetics HTTP Test" style="width:100%;" >}}

The example below demonstrates how to create an [HTTP test][3], a subtype of [single API tests][1].

### Define request

1. In the Datadog site, hover over **Digital Experience** and select **[Tests][4]** (under **Synthetic Monitoring & Testing**).
2. Click **New Test** > **[New API test][5]**.
3. Select the `HTTP` request type.
4. Define your request:

    - Add the URL of the endpoint you want to monitor. If you don't know what to start with, you can use `https://www.shopist.io/`, a test e-commerce web application. Defining the endpoint to test automatically populates the name of your test to `Test on www.shopist.io`. 
    - You can select **Advanced Options** to set custom request options, certificates, authentication credentials, and more.  

      **Note:** You can create secure [global variables][6] to store credentials and create [local variables][7] to generate dynamic timestamps to use in your request payload. After creating these variables, type `{{` in any relevant field and select the variable to inject its value in your test options.  

      In this example, no specific advanced option is needed.
    - You can set tags such as `env:prod` and `app:shopist` on your test. Tags allow you to keep your test suite organized and quickly find tests you're interested in on the homepage.

5. Click **Test URL** to trigger a sample test run.

{{< img src="getting_started/synthetics/api-test-config-3.png" alt="API test configuration" style="width:100%;">}}

### Define assertions

Clicking **Test URL** automatically populates basic assertions about your endpoint's response. Assertions define what a successful test run is.

In this example, three default assertions populate after triggering the sample test run:

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="Default assertions" style="width:100%;">}}

Assertions are fully customizable. To add a custom assertion, click on elements of the response preview such as the headers or click **New Assertion** to define a new assertion from scratch. 

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="Example API test configuration" video="true" >}}

### Select locations 

Select one or more **Managed Locations** or **Private Locations** to run your test from. {{% managed-locations %}}

The Shopist application is publicly available at `https://www.shopist.io/`, so you can pick any managed locations to execute your test from. To test internal applications or simulate user behavior in discrete geographic regions, use [private locations][8] instead.

### Specify test frequency

Select the frequency at which you want your test to execute. You can leave the default frequency of 1 minute.

In addition to running your Synthetic test on a schedule, you can trigger them manually or directly from your [CI/CD pipelines][9]. 

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

### Configure the test monitor

Design your alert message and add any email address you want your test to send alerts to. You can also use [notifications integrations][10] such as Slack, PagerDuty, Microsoft Teams, and webhooks. In order to trigger a Synthetic alert to these notification tools, you first need to set up the corresponding [integration][11].

When you're ready to save your test configuration and monitor, click **Create**. 

## Create a multistep API test

[Multistep API tests][2] allow you to monitor key business transactions at the API level. 

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="Overview of a Mulistep Synthetics API Test" style="width:100%;" >}}

Similar to [API tests][3], multistep API tests alert you when your endpoints become too slow or fail to meet any conditions you defined. You can create variables from individual step responses and re-inject their values in subsequent steps, chaining steps together in a way that mimics the behavior of your application or service.

The example test below demonstrates the creation of a multistep API test that monitors the addition of an item to a cart. This test contains three steps: 

- Getting a cart
- Getting a product
- Adding the product to the cart

If you don't know which API endpoints to create your multistep API test on, use the example endpoints below. 

To create a new multistep API test, click **New Test** > **[Multistep API test][12]**. Add a test name such as `Add product to cart`, include tags, and select locations. 

### Get a cart

1. In **Define steps**, click **Create Your First Step**. 
2. Add a name to your step, for example: `Get a cart`.
3. Specify the HTTP method and the URL you want to query. You can enter `POST` and `https://api.shopist.io/carts`. 
4. Click **Test URL**. This creates a cart item in the Shopist application's backend.
5. Leave the default assertions or modify them.
6. Optionally, define execution parameters. 

    Selecting **Continue with test if this step fails** is helpful to ensure a whole endpoint collection is tested or to ensure the last cleanup step is executed, regardless of previous steps' success or failure. The **Retry** step feature is handy in situations where you know your API endpoint may take some time before responding. 

    In this example, no specific execution parameter is needed. 

7. To create a variable out of the value of the cart ID located at the end of the `location` header:
    - Click **Extract a variable from response content**.
    - Name your variable as `CART_ID`.
    - In the **Response Header,** select `location`.
    - In the **Parsing Regex** field, add a regular expression such as `(?:[^\\/](?!(\\|/)))+$`.

   {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="Extracted variable from response content" style="width:100%;" >}}

8. Click **Save Variable**.
9. When you're done creating this test step, click **Save Step**.

### Get a product

1. In **Define another step**, click **Add Another Step**. By default, you can create up to ten steps.
2. Add a name to your step, for example: `Get a product`.
3. Specify the HTTP method and the URL you want to query. Here, you can add: `GET` and `https://api.shopist.io/products.json`. 
4. Click **Test URL**. This retrieves a list of products available in the Shopist application.
5. Leave the default assertions or modify them.
6. Optionally, define execution parameters. In this example, no specific execution parameter is needed.
7. To create a variable out of the product ID located in the response body:
    - Click **Extract a variable from response content**
    - Name your variable as `PRODUCT_ID`.
    - Click the **Response Body** tab.
    - Click on the `$oid` key of any product to generate a JSON Path such as `$[0].id['$oid']`.
8. Click **Save Variable**.
9. When you're done creating this test step, click **Save Step**.

### Add product to cart

1. Click **Add Another Step** to add the final step, the addition of a product into your cart.
2. Add a name to your step, for example: `Add product to cart`.
3. Specify the HTTP method and the URL you want to query. Here, you can add: `POST` and  `https://api.shopist.io/add_item.json`. 
4. In the **Request Body** tab, choose the `application/json` body type and insert the following:

    {{< code-block lang="java" disable_copy="true" collapsible="true" >}}
    {
      "cart_item": {
        "product_id": "{{ PRODUCT_ID }}",
        "amount_paid": 500,
        "quantity": 1
      },
      "cart_id": "{{ CART_ID }}"
    } 
    {{< /code-block >}}

5. Click **Test URL**. This adds the product you extracted in Step 2 to the cart you created in Step 1 and returns a checkout URL.
6. In **Add assertions (optional)**, click **Response Body** and click the `url` key to have your test assert that the journey finished with a response containing the checkout URL.
7. No execution parameters and variable extractions are needed in this last step.
10. When you're done creating this test step, click **Save Step**.

{{< img src="getting_started/synthetics/defined-steps.png" alt="Created test steps" style="width:100%;" >}}

You can then configure the rest of your test conditions such as test frequency and alerting conditions, and the test monitor. When you're ready to save your test configuration and monitor, click **Create**. 

For more information, see [Using Synthetic Test Monitors][13].

## Look at test results

The **API test** and **Multistep API test detail** pages display an overview of the test configuration, the global uptime associated with the tested endpoints by location, graphs about response time and network timings, and a list of test results and events.

To troubleshoot a failed test, scroll down to **Test Results** and click on a failing test result. Review failed assertions and response details such as status code, response time, and associated headers and body to diagnose the issue.

{{< img src="getting_started/synthetics/api-test-failure-5.png" alt="API test failure" style="width:100%;">}}

With Datadog's [APM integration with Synthetic Monitoring][14], access the root cause of a failed test run by looking at the trace generated from the test run in the **Traces** tab.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/multistep
[3]: /ja/synthetics/api_tests/http_tests
[4]: https://app.datadoghq.com/synthetics/tests
[5]: https://app.datadoghq.com/synthetics/create
[6]: /ja/synthetics/settings/#global-variables
[7]: /ja/synthetics/api_tests/http_tests#variables
[8]: /ja/getting_started/synthetics/private_location
[9]: /ja/synthetics/ci
[10]: /ja/integrations/#cat-notification
[11]: https://app.datadoghq.com/account/settings
[12]: https://app.datadoghq.com/synthetics/multi-step/create
[13]: /ja/synthetics/guide/synthetic-test-monitors
[14]: /ja/synthetics/apm/
[15]: /ja/synthetics/api_tests/grpc_tests