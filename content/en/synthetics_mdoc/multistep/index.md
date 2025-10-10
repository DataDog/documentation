---
title: Multistep API Testing
description: Chain requests to monitor sophisticated transactions on your key services.
breadcrumbs: Docs > Synthetic Testing and Monitoring > Multistep API Testing
sourceUrl: https://docs.datadoghq.com/synthetics/multistep/index.html
---

# Multistep API Testing

## Overview{% #overview %}

Multistep API tests allow you to chain several [API tests](https://docs.datadoghq.com/synthetics/api_tests/) at once to proactively monitor and ensure that the sophisticated journeys on your key services are available at anytime, and from anywhere. If you want to perform single requests to your services, use [API tests](https://docs.datadoghq.com/synthetics/api_tests/).

You can accomplish the following:

- Execute HTTP requests on API endpoints requiring authentication (for example, through a token)
- Monitor key business transactions at the API level
- Simulate end-to-end mobile application journeys

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/multistep_tests/multistep_test_steps.34cc8e3452a5f865cff19fca9e38c67d.png?auto=format"
   alt="Multiple test steps in a multistep API test" /%}

If one of your services starts answering more slowly, or in an unexpected way (for example, unexpected response body or status code), your test can [**alert your team**](https://docs.datadoghq.com/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor), [**block your CI pipeline**](https://docs.datadoghq.com/synthetics/cicd_integrations), or even [**roll back the faulty deployment**](https://docs.datadoghq.com/synthetics/cicd_integrations).

Multistep API tests can run from Datadog managed and [private locations](https://docs.datadoghq.com/synthetics/private_locations), allowing **full coverage of your systems**, both external and internal.

## Configuration{% #configuration %}

### Name and tag your test{% #name-and-tag-your-test %}

1. Name your Multistep API test.
1. Add `env` and other tags to your Multistep API test. You can use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page](https://docs.datadoghq.com/synthetics/search/#search-for-tests).

### Select locations{% #select-locations %}

Select the **Locations** for your Multistep API test. Multistep API tests can run from both managed and [private locations](https://docs.datadoghq.com/synthetics/private_locations) depending on your preference for running the test from outside or inside your network.

Datadog's out-of-the-box managed locations allow you to test public-facing websites and endpoints from regions where your customers are located.

**AWS**:

| Americas            | Asia Pacific | EMEA      |
| ------------------- | ------------ | --------- |
| Canada Central      | Hong Kong    | Bahrain   |
| Northern California | Jakarta      | Cape Town |
| Northern Virginia   | Mumbai       | Frankfurt |
| Ohio                | Osaka        | Ireland   |
| Oregon              | Seoul        | London    |
| São Paulo           | Singapore    | Milan     |
| Sydney              | Paris        |
| Tokyo               | Stockholm    |

**GCP**:

| Americas    | Asia Pacific | EMEA      |
| ----------- | ------------ | --------- |
| Dallas      | Tokyo        | Frankfurt |
| Los Angeles |
| Oregon      |
| Virginia    |

**Azure**:

| Region   | Location |
| -------- | -------- |
| Americas | Virginia |

The Datadog for Government site (US1-FED) uses the following managed location:

| Region   | Location |
| -------- | -------- |
| Americas | US-West  |

### Define steps{% #define-steps %}

To create an API request step, click **Create Your First Step**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/api_tests/ms_create_request.a85831b55df8212d2d1041917d38e875.png?auto=format"
   alt="Create your Multistep API test requests" /%}

By default, you can create up to 10 test steps. To increase this limit, contact [Datadog Support](https://docs.datadoghq.com/help/).

#### Define the request{% #define-the-request %}

1. **Name** your step.

1. Choose a request type:

   {% tab title="HTTP" %}
See the [HTTP Tests documentation](https://docs.datadoghq.com/synthetics/api_tests/http_tests/) to create an HTTP request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.
   {% /tab %}

   {% tab title="gRPC" %}
See the [gRPC Tests documentation](https://docs.datadoghq.com/synthetics/api_tests/grpc_tests/) to create a gRPC request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.
   {% /tab %}

   {% tab title="SSL" %}
See the [SSL Tests documentation](https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/) to create an SSL request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.
   {% /tab %}

   {% tab title="DNS" %}
See the [DNS Tests documentation](https://docs.datadoghq.com/synthetics/api_tests/dns_tests/) to create a DNS request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.
   {% /tab %}

   {% tab title="WebSocket" %}
See the [WebSocket Tests documentation](https://docs.datadoghq.com/synthetics/api_tests/websocket_tests/) to create a WebSocket request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.
   {% /tab %}

   {% tab title="TCP" %}
See the [TCP Tests documentation](https://docs.datadoghq.com/synthetics/api_tests/tcp_tests/) to create a TCP request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.
   {% /tab %}

   {% tab title="UDP" %}
See the [UDP Tests documentation](https://docs.datadoghq.com/synthetics/api_tests/udp_tests/) to create a UDP request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.
   {% /tab %}

   {% tab title="ICMP" %}
See the [ICMP Tests documentation](https://docs.datadoghq.com/synthetics/api_tests/icmp_tests/) to create an ICMP request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.
   {% /tab %}

### Add execution settings{% #add-execution-settings %}

Under **Execution Settings**, the following options are available:

#### Step success:{% #step-success %}

Click **If step succeeds, continue to next step** to let your test proceed with subsequent steps after successful steps.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/multistep_tests/multistep_test_success.d047150e0e49323d5301c92577bcc264.png?auto=format"
   alt="Screenshot of execution settings showing step success options continue to next step" /%}

Click **If step succeeds, exit test and mark it as passed** to exit the test after a successful step completion. This prevents running unnecessary steps and avoids marking the test as failed.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/multistep_tests/multistep_execution_settings.d03cee654d272321176bb375f10b87aa.png?auto=format"
   alt="Screenshot of execution settings showing step success exit and mark as passed" /%}

#### Step failure{% #step-failure %}

Click **If step fails, continue to next step** to proceed with subsequent steps after step failure. This can be useful for clean-up tasks when you want subsequent steps to proceed. For example, a test may create a resource, perform several actions on that resource, and end with the deletion of that resource.

In case one of the intermediary steps fail, you want to have this setting enabled on every intermediary step to ensure that the resource is deleted at the end of the test and that no false positives are created.

The test generates an alert if an endpoint does not answer as expected. Your test can trigger retries X times after Y ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/multistep_tests/step_failure.824e569f5ad94c89eee93d76d836825a.png?auto=format"
   alt="Screenshot of execution settings showing step failure" /%}

#### Extract variables from the response{% #extract-variables-from-the-response %}

Optionally, extract variables from the response of your API request by parsing its response headers or body. The value of the variable updates each time the API request step runs.

To start parsing a variable, click **Extract a variable from response content**:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores and must have at least three characters.

1. Decide whether to extract your variable from the response headers or from the response body.

   - Extract the value from **response header**: use the full response header of your API request as the variable value, or parse it with a [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
   - Extract the value from **response body**: use the full response body of your API request as the variable value or parse it with a [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), a [`JSONPath`](https://restfulapi.net/json-jsonpath/), or a [`XPath`](https://www.w3schools.com/xml/xpath_syntax.asp).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/api_tests/ms_extract_variable.7445d9372877f792e2a9ac5e61a24bf2.png?auto=format"
   alt="Extract variables from API requests in Multistep API test" /%}

You can extract up to ten variables per test step. Once created, this variable can be used in the following steps of your multistep API test. For more information, see Use variables.

### Specify test frequency{% #specify-test-frequency %}

Multistep API tests can run:

- **On a schedule** to ensure your most important endpoints are always accessible to your users. Select the frequency you want Datadog to run your multistep API test.
- [**Within your CI/CD pipelines**](https://docs.datadoghq.com/synthetics/cicd_integrations) to start shipping without fearing faulty code might impact your customers' experience.
- **On-demand** to run your tests whenever makes the most sense for your teams.

### Define alert conditions{% #define-alert-conditions %}

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting rule{% #alerting-rule %}

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

- At least one location was in failure (at least one assertion failed) during the last *X* minutes;
- At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry{% #fast-retry %}

Your test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Configure the test monitor{% #configure-the-test-monitor %}

A notification is sent by your test based on the alerting conditions previously defined. Use this section to define how and what to message your team.

1. [Similar to how you configure monitors](https://docs.datadoghq.com/monitors/notify/?tab=is_alert#configure-notifications-and-automations), select **users and/or services** that should receive notifications either by adding an `@notification` to the message or by searching for team members and connected integrations with the dropdown menu.

1. Enter the notification **message** for your test or use pre-filled monitor messages. This field allows standard [Markdown formatting](http://daringfireball.net/projects/markdown/syntax) and supports the following [conditional variables](https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#conditional-variables):

| Conditional Variable | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `{{#is_alert}}`      | Show when the test alerts.                           |
| `{{^is_alert}}`      | Show unless the test alerts.                         |
| `{{#is_recovery}}`   | Show when the test recovers from alert.              |
| `{{^is_recovery}}`   | Show unless the test recovers from alert.            |
| `{{#is_renotify}}`   | Show when the monitor renotifies.                    |
| `{{^is_renotify}}`   | Show unless the monitor renotifies.                  |
| `{{#is_priority}}`   | Show when the monitor matches priority (P1 to P5).   |
| `{{^is_priority}}`   | Show unless the monitor matches priority (P1 to P5). |

Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.

Click **Save & Start Recording** to save your test configuration and monitor.

For more information, see [Synthetic Monitoring notifications](https://docs.datadoghq.com/synthetics/notifications/).

### Create local variables{% #create-local-variables %}

To create a local variable, click **+ All steps > Variables**. You can select one of the following available builtins to add to your variable string:

{% dl %}

{% dt %}
{{ numeric(n) }}
{% /dt %}

{% dd %}
Generates a numeric string with `n` digits.
{% /dd %}

{% dt %}
{{ alphabetic(n) }}
{% /dt %}

{% dd %}
Generates an alphabetic string with `n` letters.
{% /dd %}

{% dt %}
{{ alphanumeric(n) }}
{% /dt %}

{% dd %}
Generates an alphanumeric string with `n` characters.
{% /dd %}

{% dt %}
{{ date(n unit, format) }}
{% /dt %}

{% dd %}
Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.
{% /dd %}

{% dt %}
{{ timestamp(n, unit) }}
{% /dt %}

{% dd %}
Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at +/- `n` units.
{% /dd %}

{% dt %}
{{ uuid }}
{% /dt %}

{% dd %}
Generates a version 4 universally unique identifier (UUID).
{% /dd %}

{% dt %}
{{ public-id }}
{% /dt %}

{% dd %}
Injects the Public ID of your test.
{% /dd %}

{% dt %}
{{ result-id }}
{% /dt %}

{% dd %}
Injects the Result ID of your test run.
{% /dd %}

{% /dl %}

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.

### Extract variables{% #extract-variables %}

In addition to creating local variables, you can extract variables from any step of your multistep API test and re-inject the values in subsequent steps.

### Use variables{% #use-variables %}

You can use the [global variables defined in the `Settings`](https://docs.datadoghq.com/synthetics/settings/#global-variables) and the locally defined variables in the URL, advanced options, and assertions of your API tests.

To display your list of variables, type `{{` in your desired field.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/api_tests/use_variable.mp4" /%}

### Subtests{% #subtests %}

Multistep API tests support subtests, allowing you to reuse existing Multistep API tests or extract steps into reusable components. You can nest subtests up to two levels deep.

To use an existing Multistep API test as a subtest, click **Subtest**, go to the **From Existing Test** tab, and select a Multistep API test from the dropdown menu.

To convert steps from your current Multistep API test into a subtest, click on the **Extract From Steps** tab, select the recorded steps you want to extract, and click **Convert to Subtest**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/multistep_tests/subtest.47b51557b58cfab9a2978dec37de4c71.png?auto=format"
   alt="UI for adding a subtest to a Multistep API test" /%}

To override a subtest variable in a Multistep API test, define it in the parent test using the same name. A variable always uses the first value assigned to it.

If you don't need to run a subtest independently, you can pause it. It still runs as part of the Multistep API test but is not executed on its own.

**Note:** Only Multistep API tests can be added as subtests. Using [API tests](https://docs.datadoghq.com/synthetics/api_tests/) as subtests is not supported.

## Test failure{% #test-failure %}

A test is considered `FAILED` if a step does not satisfy one or several assertions or if a step's request prematurely failed. In some cases, the test can indeed fail without being able to test the assertions against the endpoint, these reasons include:

{% dl %}

{% dt %}
`CONNREFUSED`
{% /dt %}

{% dd %}
No connection could be made because the target machine actively refused it.
{% /dd %}

{% dt %}
`CONNRESET`
{% /dt %}

{% dd %}
The connection was abruptly closed by the remote server. Possible causes include the webserver encountering an error or crashing while responding, or loss of connectivity of the webserver.
{% /dd %}

{% dt %}
`DNS`
{% /dt %}

{% dd %}
DNS entry not found for the test URL. Possible causes include a misconfigured test URL or a wrong configuration in your DNS entries.
{% /dd %}

{% dt %}
`INVALID_REQUEST`
{% /dt %}

{% dd %}
The configuration of the test is invalid (for example, a typo in the URL).
{% /dd %}

{% dt %}
`SSL`
{% /dt %}

{% dd %}
The SSL connection couldn't be performed. [See the dedicated error page for more information](https://docs.datadoghq.com/synthetics/api_tests/http_tests?tab=requestoptions#test-failure).
{% /dd %}

{% dt %}
`TIMEOUT`
{% /dt %}

{% dd %}
The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
- `TIMEOUT: The request couldn't be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60s). For each request only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
- `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the request and assertions duration hit the maximum duration (30 minutes).

{% /dd %}

{% /dl %}

For HTTP steps, see [common HTTP step failures](https://docs.datadoghq.com/synthetics/api_tests/http_tests?tab=requestoptions#test-failure). For gRPC steps, see [common gRPC step failures](https://docs.datadoghq.com/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure).

## Permissions{% #permissions %}

By default, only users with the [Datadog Admin and Datadog Standard roles](https://docs.datadoghq.com/account_management/rbac/) can create, edit, and delete Synthetic multistep API tests. To get create, edit, and delete access to Synthetic multistep API tests, upgrade your user to one of those two [default roles](https://docs.datadoghq.com/account_management/rbac/).

If you are using the [custom role feature](https://docs.datadoghq.com/account_management/rbac#custom-roles), add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions for Synthetic Monitoring.

### Restrict access{% #restrict-access %}

Access restriction is available for customers using [custom roles](https://docs.datadoghq.com/account_management/rbac/#create-a-custom-role) on their accounts.

You can restrict access to a multistep API test based on the roles in your organization. When creating a multistep API test, choose which roles (in addition to your user) can read and write your test.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/settings/restrict_access_1.6edb38b6a78d79f2c91c2087c9fc5a3a.png?auto=format"
   alt="Set permissions for your test" /%}

## Further Reading{% #further-reading %}

- [Monitor your workflows with Datadog multistep API tests](https://www.datadoghq.com/blog/monitor-apis-with-datadog/)
- [Version History for Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/version_history/)
- [Run Multistep API tests on internal endpoints](https://docs.datadoghq.com/synthetics/private_locations)
- [Learn about Synthetic test monitors](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors)
- [Create and manage Synthetic Multistep API Tests with Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test)
