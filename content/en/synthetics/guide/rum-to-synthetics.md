---
title: Generate Synthetic Browser Tests From Session Replay
kind: guide
further_reading:
  - link: 'https://www.datadoghq.com/blog/create-browser-tests-from-datadog-rum-session-replay/'
    tag: 'Blog'
    text: 'Create browser tests directly from Datadog RUM Session Replay'
  - link: 'synthetics/browser_tests'
    tag: 'Documentation'
    text: 'Configure a Browser Test'
  - link: 'real_user_monitoring/browser'
    tag: 'Documentation'
    text: 'RUM Browser Monitoring'

---

## Overview

[Real User Monitoring (RUM)][1] gives you end-to-end visibility into the real-time activity and experience of individual users. [Synthetic browser tests][2] allow you to observe how your systems and applications are performing using simulated requests and actions from around the globe.

{{< img src="synthetics/guide/rum_to_synthetics/generate_test_modal.png" alt="Generate a Browser Test with your Session Replay modal" style="width:70%" >}}

You can create Synthetic browser tests from your session replays in RUM to track performance based on real user behavior.

## Generate a test from a session replay

Navigate to the [RUM Explorer][3] and select a session with an available [Session Replay][4] that you want to create a browser test from. Click **Generate Synthetic Browser Test** above the event timeline. 

{{< img src="synthetics/guide/rum_to_synthetics/test_recording.png" alt="A user session in the RUM Explorer" style="width:100%" >}}

This automatically clones the events captured within a session replay, such as user clicks and page loads, into individual steps for a new browser test. 

For example, in the following screenshot, the generated browser test cloned a user's session on the shopping page, including them navigating to it and clicking the **Add to cart** button. 

{{< img src="synthetics/guide/rum_to_synthetics/example_test.png" alt="Browser test recorder filled automatically with RUM data" style="width:100%" >}}

Further customize your tests and test steps to suit your needs, just as you would for [any other browser test][6]. For example, you can add additional [test steps][5] (such as assertions), adjust the frequency of your test's runs, and customize its notification.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /synthetics/browser_tests
[3]: https://app.datadoghq.com/rum/sessions
[4]: /real_user_monitoring/session_replay/browser/
[5]: /synthetics/browser_tests/actions
[6]: /synthetics/browser_tests/?tab=requestoptions#test-configuration