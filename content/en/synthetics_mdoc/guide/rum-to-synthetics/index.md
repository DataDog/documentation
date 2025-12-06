---
title: Generate Synthetic Browser Tests From Session Replay
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Generate Synthetic Browser Tests From Session Replay
sourceUrl: https://docs.datadoghq.com/synthetics/guide/rum-to-synthetics/index.html
---

# Generate Synthetic Browser Tests From Session Replay

## Overview{% #overview %}

[Real User Monitoring (RUM)](https://docs.datadoghq.com/real_user_monitoring/) gives you end-to-end visibility into the real-time activity and experience of individual users. [Synthetic browser tests](https://docs.datadoghq.com/synthetics/browser_tests) allow you to observe how your systems and applications are performing using simulated requests and actions from around the globe.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/rum_to_synthetics/generate_test_modal.b6f6a71120b90b019362449f21cb0a57.png?auto=format"
   alt="Generate a Browser Test with your Session Replay modal" /%}

You can create Synthetic browser tests from your session replays in RUM to track performance based on real user behavior.

## Generate a test from a session replay{% #generate-a-test-from-a-session-replay %}

Navigate to the [RUM Explorer](https://app.datadoghq.com/rum/sessions) and select a session with an available [Session Replay](https://docs.datadoghq.com/real_user_monitoring/session_replay/browser/) that you want to create a browser test from. Click **Generate Synthetic Browser Test** above the event timeline.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/rum_to_synthetics/test_recording.ed7b03a0fb0ad806d572f47af62cf3f8.png?auto=format"
   alt="A user session in the RUM Explorer" /%}

This automatically clones the events captured within a session replay, such as user clicks and page loads, into individual steps for a new browser test.

For example, in the following screenshot, the generated browser test cloned a user's session on the shopping page, including them navigating to it and clicking the **Add to cart** button.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/rum_to_synthetics/example_test.0d5f989588f5d011309a5a93198e886c.png?auto=format"
   alt="Browser test recorder filled automatically with RUM data" /%}

Further customize your tests and test steps to suit your needs, just as you would for [any other browser test](https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions#test-configuration). For example, you can add additional [test steps](https://docs.datadoghq.com/synthetics/browser_tests/actions) (such as assertions), adjust the frequency of your test's runs, and customize its notification.

## Further Reading{% #further-reading %}

- [Create browser tests directly from Datadog RUM Session Replay](https://www.datadoghq.com/blog/create-browser-tests-from-datadog-rum-session-replay/)
- [Configure a Browser Test](https://docs.datadoghq.com/synthetics/browser_tests)
- [RUM Browser Monitoring](https://docs.datadoghq.com/real_user_monitoring/browser)
