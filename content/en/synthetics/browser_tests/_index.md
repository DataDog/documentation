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
  * **Authentication**: Authenticate through HTTP Basic, Digest or NTLM with a username and a password.
  * **Cookies**: Define cookies to add to the default browser cookies. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.
  * **Proxy URL**: URL of the proxy the requests should go through (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

  {{% /tab %}}

  {{% tab "Privacy" %}}

  * **Do not capture any screenshots for this test**: Select this option to prevent any screenshot from being taken for all your test steps. This option is also available as an [advanced option][1] at the individual step level. This can be helpful to ensure no sensitive data gets featured in your test results. It however needs to be use mindfully as it can make failure troubleshooting way more challenging. You can read more about our security recommendations [here][2].

[1]: /synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /security/synthetics

  {{% /tab %}}

  {{< /tabs >}}

3. **Name**: The name of your browser test.
4. **Select your tags**: The tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the Synthetic tests page.
5. **Browsers & Devices**: The browsers (`Chrome`, `Firefox`) and devices (`Laptop Large`, `Tablet`, `Mobile Small`) to run your test on.
6. **Locations**: The Datadog managed locations to run the test from. Many AWS locations from around the world are available for each site. For the Datadog for Government site, the West US (AWS GovCloud) location is supported. You can also set up [private locations][2] to run your browser test from custom locations or from inside private networks. See a full list of locations in the [Datadog app][13] or use the [API][14].
7. **How often should Datadog run the test?** Intervals are available between every five minutes to once per week. The one minute frequency is available [upon request][3].

### Use global variables

You can use the [global variables defined in the **Settings**][4] in the **Starting URL** as well as in the **Advanced Options** of your browser tests. To display your list of variables, type `{{` in the desired field.

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="Using Variables in Browser Tests" video="true"  width="80%" >}}

### Define alert conditions

You can customize alert conditions to define the circumstances under which you want a test to send a notification alert.

* An alert is triggered if any assertion fails for `X` minutes from any `n` of `N` locations. This alerting rule allows you to specify for how much time and on how many locations a test needs to fail before triggering the notification.
* Retry `X` times before location is marked as failed. This allows you to define how many consecutive test failures need to happen for a location to be considered as failed. By default, there is a 300ms wait before retrying a test that failed. This interval can be configured via the [API][7].

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Browser test alerting rule"  >}}

### Notify your team

A notification is sent according to the set of alerting conditions. To configure your notifications:

1. Enter a **message** for the browser test. This field allows standard [Markdown formatting][8] and supports the following [conditional variables][9]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when monitor alerts                                            |
    | `{{^is_alert}}`            | Show unless monitor alerts                                          |
    | `{{#is_recovery}}`         | Show when monitor recovers from either ALERT   |
    | `{{^is_recovery}}`         | Show unless monitor recovers from either ALERT |

    Notification messages include the **message** defined in this section and information about the failing locations.

2. Choose your [services][10] and/or team members to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.
4. Click **Save Details and Record Test**.

## Record your steps

Tests can be only recorded from **[Google Chrome][11]**. To record your test, download the [Datadog Record Test extension for Google Chrome][12].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test"  >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window. This is useful if your application does not support being opened in an iframe or if you want to avoid sizing issues at recording. You can also open the pop in **Incognito mode** to start recording your test from a fresh browser free from already logged in sessions, cookies from your existing browser, etc.
2. Click on **Start recording** to begin recording your browser test.
3. As you click on your application going through the user journey you want to monitor, your actions are automatically recorded and used to create [steps][13] within your browser test scenario on the left.
4. In addition to the automatically recorded steps, you can also use the [steps][14] available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/manual_steps.png" alt="Browser Test steps"  style="width:80%;">}}

    **Note**: You should always make sure to **end your browser test with an [assertion][12]** to confirm the journey executed by the browser test resulted in the expected state.
5. Once you have finished your scenario, click on **Save and Launch Test**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/identify_synthetics_bots/
[3]: /security/synthetics
[4]: /synthetics/private_locations/
[5]: /help/
[6]: /synthetics/settings/#global-variables
[7]: /api/v1/synthetics/#create-or-clone-a-test
[8]: http://daringfireball.net/projects/markdown/syntax
[9]: /monitors/notifications/?tab=is_alert#integrations
[10]: /integrations/#cat-notification
[11]: https://www.google.com/chrome
[12]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[13]: /synthetics/browser_tests/actions/
[14]: /synthetics/browser_tests/actions#manually-added-steps
[15]: https://app.datadoghq.com/synthetics/browser/create
[16]: /api/latest/synthetics/#get-all-locations-public-and-private
