---
title: Browser Tests
kind: documentation
description: Simulate and monitor user journeys from specific locations.
aliases:
  - /synthetics/browser_check
  - /synthetics/browser_test
further_reading:
- link: "https://www.datadoghq.com/blog/browser-tests/"
  tag: "Blog"
  text: "User experience monitoring with browser tests"
- link: 'https://learn.datadoghq.com/course/view.php?id=39'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
- link: "/getting_started/synthetics/browser_test"
  tag: "Documentation"
  text: "Getting started with browser tests"
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/synthetics/guide/"
  tag: "Documentation"
  text: "Synthetic Monitoring Guides"
- link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test'
  tag: 'Terraform'
  text: 'Create and manage Synthetic Browser Tests with Terraform'
---

## Overview

Browser tests are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, from multiple browsers, and devices. These tests verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

<div class="alert alert-info">If you are interested in testing applications that sit behind MFA, read <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">the dedicated guide </a> and <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">send feedback</a> to the Synthetic Monitoring team to help improve the systems that matter most to your teams.</div>

## Test configuration

Define the configuration of your browser test.

1. **Starting URL**: The URL from which your browser test starts the scenario.
2. **Advanced Options** (optional): Set specific options for your browser test.

  {{< tabs >}}

  {{% tab "Request Options" %}}

  Select **Disable CORS** to prevent the cross-origin resource sharing (CORS) policy from blocking your test.

  * **Request Headers**: Define headers in the **Name** and **Value** fields to add to or override the default browser headers. For example, you can set the User Agent in the header to [identify Datadog scripts][1].
  * **Cookies**: Define cookies to add to the default browser cookies. Enter one cookie per line, using the syntax of [`Set-Cookie`][2].
  * **HTTP Authentication**: Authenticate through HTTP Basic, Digest, or NTLM with a username and a password. Your credentials are used in every step of your browser test.

  Request options are set at every test execution and apply to every step of your browser test at execution time, not recording time. 
  If you need these options to remain active to record the following steps, manually apply the options on the page you are recording from and create subsequent steps in your test.


[1]: /synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
  {{% /tab %}}

  {{% tab "Certificate" %}}

  Select **Ignore server certificate error** to instruct the test to skip errors in the server certificate. 
  
  * **Client Certificate**: Perform tests on systems that require client certificates by clicking **Upload File** and uploading your certificate file and private key. Only PEM certificates are accepted.
  * **Client Certificate Domains**: Once the certificate files are uploaded, the client certificate applies to the starting URL's domain. To apply the client certificate on another domain, specify the domain in the **Value** field.  

  You can include wildcards in the URL.

  {{% /tab %}}

  {{% tab "Proxy" %}}

  Enter a URL for a proxy you want to send requests through in the **Proxy URL** field as `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.

  You can include [global variables](#use-global-variables) in the URL.

  {{% /tab %}}

  {{% tab "Privacy" %}}

  Select **Do not capture any screenshots for this test** to prevent screenshots from being taken in your test steps. 
  
  This privacy option is available as an [advanced option][1] at the individual test step level and ensures that no sensitive data appears in your test results. 
  
  Preventing the test from taking screenshots makes troubleshooting failures more difficult. For more information, see [Security][2].

[1]: /synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /security/synthetics
  {{% /tab %}}

  {{< /tabs >}}

3. **Name**: The name of your browser test.
4. **Select tags**: The `env` and related tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.
5. **Browsers & Devices**: The browsers (such as `Chrome`, `Firefox`, `Edge`, and `Internet Explorer 11`), and devices (such as `Laptop Large`, `Tablet`, and `Mobile Small`) to run your test on. 
   - For a large laptop device, the dimensions are 1440 x 1100 pixels. 
   - For a tablet device, the dimensions are 768 pixels x 1020 pixels.
   - For a small mobile device, the dimensions are 320 pixels x 550 pixels.  
6. **Select locations**: The Datadog managed locations to run your test from. Many AWS locations from around the world are available for each site. You can also set up [private locations][1] to run your browser test from custom locations or from inside private networks. See a full list of locations in the [Datadog app][2] or use the [API][3]. {{< site-region region="gov" >}}**Note**: The West US (AWS GovCloud) location is supported on the Datadog for Government site.{{< /site-region >}}
7. **Select test frequency**: The intervals vary from every five minutes to once per week. [Contact Support][4] for one-minute frequency.

### Use global variables

You can use the [global variables defined in the **Settings**][5] in the **Starting URL** as well as in the **Advanced Options** of your browser tests. To display your list of variables, type `{{` in the desired field.

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="Using Variables in Browser Tests" video="true" width="80%" >}}

To use global variables in your browser test's recording, navigate to your recorded steps and click **+ Variables** below the **Start Recording** button. Select **Global Variable** from the dropdown menu. 

{{< img src="synthetics/browser_tests/available-global-variables.png" alt="Available Global Variables" style="width:50%;" >}}

Search for available global variables and click **+** to add them to your recording panel. When you are done adding global variables, click **OK**. 

### Define alert conditions

You can customize alert conditions to define the circumstances under which you want a test to send a notification alert.

* An alert is triggered if any assertion fails for `X` minutes from any `n` of `N` locations. This alerting rule allows you to specify for how much time and on how many locations a test needs to fail before triggering the notification.
* Retry `X` times before location is marked as failed. This allows you to define how many consecutive test failures need to happen for a location to be considered as failed. By default, there is a 300ms wait before retrying a test that failed. This interval can be configured with the [API][6].

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Browser test alerting rule" >}}

### Notify your team

A notification is sent according to the set of alerting conditions. To configure your notifications:

1. Enter a **message** for the browser test. This field allows standard [Markdown formatting][7] and supports the following [conditional variables][8]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when monitor alerts                                            |
    | `{{^is_alert}}`            | Show unless monitor alerts                                          |
    | `{{#is_recovery}}`         | Show when monitor recovers from either ALERT   |
    | `{{^is_recovery}}`         | Show unless monitor recovers from either ALERT |

    Notification messages include the **message** defined in this section and information about the failing locations.

2. Choose your [services][9] and/or team members to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.
4. Click **Save Details and Record Test**.

## Record your steps

Tests can be only recorded from [Google Chrome][10]. To record your test, download the [Datadog Record Test extension for Google Chrome][11].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test" width="80%" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window. This is useful if your application does not support being opened in an iframe or if you want to avoid sizing issues at recording. You can also open the pop-up in **Incognito mode** to start recording your test from a fresh browser free from already logged-in sessions, cookies from your existing browser, and more.
2. Optionally, enable Datadog to automatically collect RUM data when running step recordings from your browser test. For more information, see [Explore RUM & Session Replay][12]. 
3. Click **Start Recording** to begin recording your browser test.
4. As you click on your application going through the user journey you want to monitor, your actions are automatically recorded and used to create [steps][13] within your browser test scenario on the left.
5. In addition to the automatically recorded steps, you can also use the [steps][13] available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/manual_steps.png" alt="Browser Test steps" style="width:80%;">}}

    **Note**: You should always make sure to **end your browser test with an [assertion][14]** to confirm the journey executed by the browser test resulted in the expected state.
6. Once you have finished your scenario, click **Save and Launch Test**.

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][15] can create, edit, and delete Synthetic browser tests. To get create, edit, and delete access to Synthetic browser tests, upgrade your user to one of those two [default roles][15].

If you are using the [custom role feature][15], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Access restriction is available for customers using [custom roles][16] on their accounts.

You can restrict access to a browser test based on the roles in your organization. When creating a browser test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations/
[2]: https://app.datadoghq.com/synthetics/browser/create
[3]: /api/latest/synthetics/#get-all-locations-public-and-private
[4]: /help/
[5]: /synthetics/settings/#global-variables
[6]: /api/v1/synthetics/#create-or-clone-a-test
[7]: http://daringfireball.net/projects/markdown/syntax
[8]: /monitors/notify/?tab=is_alert#integrations
[9]: /integrations/#cat-notification
[10]: https://www.google.com/chrome
[11]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[12]: /synthetics/browser_tests/actions/
[13]: /synthetics/browser_tests/actions/#assertion
[14]: /account_management/rbac/
[15]: /account_management/rbac#custom-roles
[16]: /account_management/rbac/#create-a-custom-role
