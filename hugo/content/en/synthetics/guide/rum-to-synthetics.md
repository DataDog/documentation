---
title: Generate Synthetic Tests From Session Replay

further_reading:
  - link: 'synthetics/bits_testing'
    tag: 'Documentation'
    text: 'Bits Testing'
  - link: 'synthetics/browser_tests'
    tag: 'Documentation'
    text: 'Configure a Browser Test'
  - link: 'real_user_monitoring/application_monitoring/browser'
    tag: 'Documentation'
    text: 'RUM Browser Monitoring'

---

## Overview

[Real User Monitoring (RUM)][1] gives you end-to-end visibility into the real-time activity and experience of individual users. [Synthetic browser tests][2] allow you to observe how your systems and applications are performing using simulated requests and actions from around the globe.

{{< img src="synthetics/guide/rum_to_synthetics/bits_testing_from_replay.png" alt="The Generate a Test With Bits Testing button in a session replay's details panel." style="width:70%" >}}

You can trigger a [Bits Testing][7] job to generate tests based on a session replay's summary.

## Generate a test from a session replay

In the [RUM Explorer][3], filter for sessions with [Session Replay][4] available, then open one with a Session Summary in its details panel. Click {{< ui >}}Generate a Test With Bits Testing{{< /ui >}}.

Bits Testing pre-fills the job's starting URL and goal from the session.

{{< img src="synthetics/guide/rum_to_synthetics/bits_testing_start_discovery.png" alt="The Bits Testing Start Discovery card prefilled with a goal and starting URL generated from a session replay's summary." style="width:100%" >}}

Review the prefilled job, adjust its [location, profile, and review mode][8], and click {{< ui >}}Start Discovery{{< /ui >}}.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /synthetics/browser_tests
[3]: https://app.datadoghq.com/rum/sessions
[4]: /session_replay/
[7]: /synthetics/bits_testing/
[8]: /synthetics/bits_testing/#trigger-a-bits-testing-job