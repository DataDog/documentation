---
title: Diagnose Funnel Drop-Offs with Session Replay
description: Use Product Analytics and Session Replay together to identify why users drop off in your conversion funnels and verify fixes.
further_reading:
- link: "https://docs.datadoghq.com/real_user_monitoring/session_replay/"
  tag: "Documentation"
  text: "Session Replay"
- link: "https://docs.datadoghq.com/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"

---

## Overview

Conversion funnels show where users drop off, but not always why. The root cause can be a layout issue, a third-party overlay, or a rendering problem on certain devices—issues that don't appear in error logs and are difficult to reproduce without matching exact conditions.

This guide walks through a workflow for diagnosing funnel drop-offs by combining [Product Analytics][1] with [Session Replay][2]. Product Analytics narrows down who is dropping off, while Session Replay shows you exactly what they encountered.

## Spot the drop in Product Analytics

In this example, a funnel in Product Analytics tracks each step of a campaign landing page: landing page, CTA click, flow completion, and conversion.

{{< img src="real_user_monitoring/session_replay/guides/spot-the-drop.png" alt="A funnel chart in Product Analytics showing conversion rate dropping from approximately 60% to 35% over a five-day period at the landing page step" style="width:100%;" >}}

Over the past five days, conversion from the landing page to the CTA step dropped from roughly 60% to 35%. Steps downstream are stable, which isolates the problem: users are leaving the landing page without clicking the button.

## Segment to isolate the affected population

Segment the funnel by device type and region to identify a pattern.

{{< img src="real_user_monitoring/session_replay/guides/shopist-dropoffs.png" alt="A funnel chart segmented by device type showing stable desktop conversion alongside a significant drop-off for mobile and tablet users at the landing page step" style="width:100%;" >}}

Desktop conversion is unchanged. The drop is concentrated among mobile and tablet users in a single EU region. This defines a well-scoped cohort, but the funnel alone cannot explain what those users encountered on the page.

## Watch the affected sessions in Session Replay

From the funnel, navigate directly to Session Replays filtered to the affected cohort. Before watching any replays, check for sessions flagged with dead click and rage click [frustration signals][3]—these hint at where friction may be occurring.

{{< img src="real_user_monitoring/session_replay/guides/affected-sessions.png" alt="A Session Replay on a mobile device showing a furniture retailer landing page where a cookie consent banner overlaps the main call-to-action button" style="width:100%;" >}}

In this example, the replay shows the CTA button hidden beneath a cookie consent banner triggered by a regional privacy regulation. The user reads the page, does not dismiss the banner, sees no clear next step, and leaves. A few additional replays confirm the pattern, and none show errors or performance issues. This is a purely visual problem—invisible to telemetry and impossible to reproduce without matching the exact device and region conditions.

For longer sessions where the root cause is not immediately clear, AI-generated replay summaries can surface key friction points without watching the full replay.

## Share the evidence and verify the fix

Share a replay link timestamped to the exact moment the banner covers the CTA. This gives engineering a concrete, reproducible report instead of a vague conversion drop.

After the fix ships, monitor the same funnel to confirm click-through rates for the affected cohort return to baseline.

## Repeatable workflow for funnel diagnosis

Use this workflow whenever a funnel moves and the cause is not immediately clear:

1. Detect the drop in Product Analytics and identify the affected step.
2. Segment the funnel by device, region, browser, or other attributes to isolate who is affected.
3. Watch Session Replays of the affected cohort.
4. Identify the root cause from what you observe in the sessions.
5. Share the replay with the team responsible for the fix, then verify recovery in the same funnel.

This approach applies across different funnel types:

- **Onboarding**: Users drop off at "connect your first integration." Replays show they encounter a permissions modal they don't understand and close the tab rather than granting access.
- **Checkout**: Completion drops on a specific browser. Replays reveal a payment provider's iframe fails to load, leaving a blank form with no error message.
- **Feature adoption**: A new feature plateaus after launch. Replays show users opening it, hitting an empty state with no guidance, and closing immediately.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /product_analytics/
[2]: /session_replay/
[3]: /real_user_monitoring/frustration_signals/
