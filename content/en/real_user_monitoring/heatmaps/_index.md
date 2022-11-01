---
title: Heatmaps
kind: documentation
description: Heatmaps are a type of visualization allowing you to see where users click on your website.
further_reading:
- link: '/real_user_monitoring/session_replay/'
  tag: 'Documentation'
  text: 'Session Replay'
---

{{< beta-callout url="https://forms.gle/48wkkRoZfwhn74ycA" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
Heatmaps are in private beta, but you can request access using this form. We'll reach out directly once approved.
{{< /beta-callout >}} 

{{< img src="real_user_monitoring/heatmaps/heatmap.jpeg" alt="An overview of the heatmap functionality." style="width:100%;">}}

A heatmap (or heat map) is a visualization of your user's Session Replay data, where your user's interactions (clicks) are represented by color in the image. Seeing where a user clicks helps you understand if users engage with your page the way you expect and if they are finding all of your call to actions (CTAs) and important buttons. Visualizing these interactions in a heatmap makes it easy to understand complex data at a glance. Taking the insights from heatmaps helps you make UI decisions to optimize your user experience and increase retention.

## Prerequisites

To get started with heatmaps:

- You must be on the latest version of the SDK (v4.20.0 or later)
- Enable [Session Replay][1].
- While heatmaps are in beta, enable the feature flag by adding the following code to the [package.json][2] file in the SDK:

{{< code-block lang="json" filename="block.json">}}
datadogRum.init({
    ...
    enableExperimentalFeatures: ['clickmap']
})
{{< /code-block >}}

### Getting started

On the [heatmap page][3], select your application and view. A heatmap displays the aggregrate of where all users (sessions) clicked on a single view, with the view being a single page within an application. Each session is one user's activity and includes everything they did, including all pages they viewed and all actions they clicked.

To adjust the filters (to look at specific geography, for example), you can add a filter from the panel on the left side.

{{< img src="real_user_monitoring/heatmaps/application-and-view.jpeg" alt="Shows the selector for selecting an application and a view from the options where you have already enabled session replay." style="width:100%;">}}

## Insights

The right panel helps you understand the data in the heatmap:

- The popularity of the selected page in the context of the selected application.
- The total number of unique users viewing the page.
- The actions on the page where a frustration signal occurred.

Below the panel are all actions that occurred on the page, listed by frequency. When you click into an action, you can understand more about that interaction, for example:

- The number of times the user performed the action and where it falls in overall analytics of top actions on a given page.
- If that action had a frustration signal occurring on it (for example, if a user rage clicked on that button), you can view the associated frustration signals as well.

{{< img src="real_user_monitoring/heatmaps/actions.jpeg" alt="Shows an example action and the information you can get about that action." style="width:60%;">}}

### Next steps

After understanding analytics, the next step is to understand the action in the context of other data outside of heatmaps. This might mean pivoting to the [RUM explorer][4] or building a funnel that includes the action in order to [analyze conversion rates][5]. You can also watch associated [session replays][1] to visually see a user performing the action in the context of their overall session.

[1]: /real_user_monitoring/session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: https://app.datadoghq.com/rum/heatmap/view
[4]: /real_user_monitoring/explorer/
[5]: /real_user_monitoring/guide/alerting-with-conversion-rates/

