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

<div class="alert alert-info">Are you interested in testing applications that sit behind MFA? Read <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">our dedicated guide </a> and <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">send us feedback</a> to help us work on the systems that matter the most to your teams.</div>

## Test configuration

Define the configuration of your browser test.

1. **Starting URL**: The URL from which your browser test starts the scenario.
2. **Advanced Options** (optional): Set specific options to your browser test:

  {{< tabs >}}

  {{% tab "Request Options" %}}

  * **Headers**: Define headers to add to or override the default browser headers. For example, set the User Agent in the header to [identify Datadog scripts][1].
  * **Authentication**: Authenticate through HTTP Basic, Digest or NTLM with a username and a password. Credentials added to the HTTP Auth fields are used on every step of your browser test.
  * **Cookies**: Define cookies to add to the default browser cookies. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.
  * **Proxy URL**: URL of the proxy the requests should go through (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
  
**Note:** These request options are set at every test execution and apply to every step of your browser test at execution time, not recording time. If you need these options to be active to record following steps, you can manually apply these options on the page you are recording from and then create subsequent steps for your test.

[1]: /synthetics/guide/identify_synthetics_bots/?tab=apitests
  {{% /tab %}}

  {{% tab "Privacy" %}}

  * **Do not capture any screenshots for this test**: Select this option to prevent any screenshot from being taken for all your test steps. This option is also available as an [advanced option][1] at the individual step level. This is helpful to ensure no sensitive data gets featured in your test results. Use mindfully as it can make failure troubleshooting more difficult. Read more about security recommendations [here][2].


[1]: /synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /security/synthetics
  {{% /tab %}}

  {{< /tabs >}}

3. **Name**: The name of your browser test.
4. **Select your tags**: The tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the Synthetic tests page.
5. **Browsers & Devices**: The browsers (`Chrome`, `Firefox`, `Edge`) and devices (`Laptop Large`, `Tablet`, `Mobile Small`) to run your test on. 
6. **Locations**: The Datadog managed locations to run your test from. Many AWS locations from around the world are available for each site. You can also set up [private locations][1] to run your browser test from custom locations or from inside private networks. See a full list of locations in the [Datadog app][2] or use the [API][3]. {{< site-region region="gov" >}}**Note**: The West US (AWS GovCloud) location is supported on the Datadog for Government site.{{< /site-region >}}
7. **How often should Datadog run the test?** Intervals are available between every five minutes to once per week. The one minute frequency is available [upon request][4].

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

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Browser test alerting rule"  >}}

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

{{< img src="synthetics/browser_tests/browser_check_record_test2.png" alt="Browser test record test" width="80%" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window. This is useful if your application does not support being opened in an iframe or if you want to avoid sizing issues at recording. You can also open the pop in **Incognito mode** to start recording your test from a fresh browser free from already logged-in sessions, cookies from your existing browser, and more.
2. Optionally, enable Datadog to automatically collect RUM data and step recordings from your browser test. For more information, see [Explore RUM & Session Replay](#explore-rum--session-replay). 
3. Click on **Start recording** to begin recording your browser test.
4. As you click on your application going through the user journey you want to monitor, your actions are automatically recorded and used to create [steps][12] within your browser test scenario on the left.
5. In addition to the automatically recorded steps, you can also use the [steps][12] available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/manual_steps.png" alt="Browser Test steps" style="width:80%;">}}

    **Note**: You should always make sure to **end your browser test with an [assertion][13]** to confirm the journey executed by the browser test resulted in the expected state.
6. Once you have finished your scenario, click **Save and Launch Test**.

### Explore RUM & Session Replay

<div class="alert alert-info">If you don’t have Real User Monitoring, you can access RUM, Session Replay, Error Tracking, and additional performance data from your Synthetic browser test runs.</div>

In your browser test recording, click **Collect Real User Monitoring Data on** above the **Start Recording** button and select an application to collect data on. After saving your recording and test configuration, RUM gathers test data and generates session recordings.

Navigate to your [list of browser tests][14] and click on a sample test run. 

#### Synthetics to RUM Explorer

The step details side panel appears with `This Synthetic test generated data in Real User Monitoring` and includes the session ID and the **Go to the View in RUM** button. 

To see this test step's errors, resources, and performance data in the [RUM Explorer][15], click **Go to the View in RUM**. Alternatively, click the **Replay Session** button or **View all sessions in RUM** to explore available session replays captured in your browser test.

#### RUM Explorer to Synthetics

The session panel appears with `This event was generated by a Synthetic test run` and includes the test ID and the **View Synthetic Test Result** button. 

To navigate back to Synthetics and your test's results, click **View Synthetic Test Result**.

For more information, see [RUM & Synthetics][15].

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][16] can create, edit, and delete Synthetic browser tests. To get create, edit, and delete access to Synthetic browser tests, upgrade your user to one of those two [default roles][16].

If you have access to the [custom role feature][17], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

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
[14]: https://app.datadoghq.com/synthetics/tests?query=type%3A%28browser%29
[15]: /real_user_monitoring/explorer/
[16]: /account_management/rbac/
[17]: /account_management/rbac#custom-roles
