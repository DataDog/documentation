---
title: Synthetic Monitoring Troubleshooting
kind: documentation
description: Troubleshoot common Synthetic Monitoring issues.
further_reading:
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your Synthetic tests"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
---

If you experience issues setting up or configuring Datadog Synthetic Monitoring, use this information to begin troubleshooting. If you continue to have trouble, [contact Datadog's support team][1].

## Browser Tests

### Recording

#### My website is not loading in the iframe

After downloading the [Datadog extension][2], you are unable to see your website in the iframe on the right side of your Browser test's recorder and the iframe displays `Your website does not support being loaded through an iframe.`. This could indeed mean that your application has some settings preventing it from being opened in an iframe. If that is the case, try opening your website in a pop up clicking **Open in Popup** to record your journey.

#### My website is not loading in the iframe and I cannot record any steps, even when opening my website in a pop up

After downloading the [Datadog extension][2], you are unable to see your website in the iframe on the right side of your Browser test's recorder. Additionally, you cannot record any steps, regardless of whether you open your website in the iframe or in a pop up:

{{< img src="synthetics/recording_iframe.mp4" alt="Issues recording Browser test steps" video="true"  width="100%" >}}

If that happens, ensure the [Datadog extension][3] has the permissions to read and change data on the intended websites by specifying your website in the `On specific sites` section or by toggling `On all sites`:

{{< img src="synthetics/extension.mp4" alt="Allowing extension to read data on all sites" video="true"  width="100%" >}}


#### I don't see the login page in the recorder. What is happening?

By default, the iframe/pop up of the recorder uses your own browser. This means that if you’re already logged into your application, the iframe/pop up might directly display a post login page, therefore preventing you from recording your login steps without logging out first.

To be able to record your steps without logging out from your application, just leverage the recorder’s **incognito mode**:

{{< img src="synthetics/incognito_mode.mp4" alt="Using Incognito Mode Browser Tests" video="true"  width="100%" >}}

**Opening a pop up in incognito mode** allows you to start your test’s recording from the start URL set in your test configuration with a session completely isolated from your own browser's main session and user data. 

The freshly opened incognito pop up ignores all your previous browser history: cookies, local data, etc. You are consequently automatically logged out from your account and can start recording your login steps as if you were visiting your website for the first time.

### Test Results

#### My Mobile Small or Tablet browser test results keep failing

If your website is using **responsive** techniques, its DOM might differ a lot depending on the device your test is running on. It might use a specific DOM when running from a `Laptop Large`, and have a very different architecture when running from a `Tablet` or a `Mobile Small`.  
This means that the steps you recorded from a `Laptop Large` viewport might not be applicable to the same website accessed from a `Mobile Small`, causing your `Mobile Small` test results to fail:

{{< img src="synthetics/device_failures.png" alt="Mobile Tablet Device Failing" style="width:100%;" >}}

For these types of cases, Datadog recommends creating **separate `Mobile Small` or `Tablet` specific tests** where the recorded steps match the viewport your test is set to at runtime.  
To record steps with a `Mobile Small` or `Tablet` viewport, selecting `Mobile Small` or `Tablet` in the recorder dropdown before hitting the **Start Recording** button.

{{< img src="synthetics/record_device.png" alt="Recording steps on mobile tablet" style="width:100%;" >}}

Additionally, Datadog's test browsers run in **headless**, meaning Browser tests do not support some features. For example, Browser tests do not support `touch` and cannot use `touch` to detect whether the website should appear with its mobile design.

#### My Browser test has a `None or multiple elements detected` step warning

One of your Browser test steps is showing a `None or multiple elements detected` step warning:

{{< img src="synthetics/step_warning.png" alt="User locator step warning" style="width:100%;" >}}

This means that the user locator defined for that step is either targeting several elements, or none of them, consequently preventing the Browser test from knowing which element needs to be interacted with.   
To fix it, go edit your recording, open the advanced options of the step that is having the issue, go to the page the step is testing, and click on `Test`. This highlights the located element or prints an error message. You can then go ahead and fix your user locator to have it match a single element of the page:

{{< img src="synthetics/fix_user_locator.mp4" alt="Fixing User Locator error" video="true"  width="100%" >}}

## API & Browser Tests

### Unauthorized errors

If one of your Synthetic tests is throwing a 401, it most likely means that it is unable to authenticate on the endpoint. You should use the method that you use to authenticate on that endpoint (outside of Datadog) and replicate it when configuring your Synthetic test.

* Is your endpoint using **header-based authentication**?
  * **Basic Authentication**: specify the associated credentials in the **Advanced options** of your [HTTP][4] or [Browser test][5].
  * **Token based authentication**: extract your token with a first [HTTP test][4], create a [global variable][6] by parsing the response of that first test, and re-inject that variable in a second [HTTP][4] or [Browser test][8] requiring the authentication token.
  * **Session based authentication**: add the required headers or cookies in the **Advanced options** of your [HTTP][4] or [Browser test][5].
  
* Is this endpoint using **query parameters for authentication** (e.g. do you need to add a specific API key in your URL parameters?)

* Is this endpoint using **IP-based authentication**? If so, you might need to allow part or all of the [IPs from which Synthetic tests originate][9].

### Forbidden errors

If you observe `403 Forbidden` errors returned by Synthetic tests, it may be the result of your web server blocking or filtering requests that include the `Sec-Datadog` header.  This header is added to each Synthetic request Datadog initiates to identify the source of the traffic and assist Datadog support in identifying the specific test execution.  

Additionally, you might also have to ensure [Datadog Synthetic Monitoring IP ranges][9] are allowed as traffic sources by your firewalls.

### Missing notifications

Synthetic tests by default do not [renotify][10]. This means that if you add your notification handle (email address, Slack handle, etc.) after a transition got generated (e.g., test going into alert or recovering from a previous alert), no notification is sent for that very transition. A notification will be sent for the next transition.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[3]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /synthetics/api_tests/?tab=httptest#make-a-request
[5]: /synthetics/browser_tests/#test-details
[6]: /synthetics/settings/?tab=createfromhttptest#global-variables
[7]: /synthetics/api_tests/?tab=httptest#use-global-variables
[8]: /synthetics/browser_tests/#use-global-variables
[9]: https://ip-ranges.datadoghq.com/synthetics.json
[10]: /synthetics/api_tests/?tab=httptest#notify-your-team
