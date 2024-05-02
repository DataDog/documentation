---
title: Getting Started with Dashboards
kind: documentation
further_reading:
  - link: "https://www.datadoghq.com/blog/dashboard-sharing/"
    tag: "Blog"
    text: "Share dashboards securely with anyone outside of your organization"
  - link: "https://www.datadoghq.com/blog/template-variable-associated-values/"
    tag: "Blog"
    text: "Use associated template variables to refine your dashboards"
  - link: "https://learn.datadoghq.com/courses/building-better-dashboards"
    tag: "Learning Center"
    text: "Building Better Dashboards"
  - link: "/dashboards/"
    tag: "Documentation"
    text: "Dashboards basics"
  - link: "/notebooks/"
    tag: "Documentation"
    text: "Tell a story about data with notebooks"
  - link: "/monitors/"
    tag: "Documentation"
    text: "Monitors, SLOs, notifications, downtimes, and incidents"
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session on better visualizations with Dashboards"  
---

## Overview

The key to getting started with dashboards is knowing what kind of questions you ask yourself regularly. What are common issues your customers face? When a problem occurs, what questions help you find a solution? 

Creating a good dashboard is about bringing the answers to these questions to the surface. Also, it is important not to cram all of those thoughts into the same dashboard. Creating separate dashboards to pinpoint different issues can help you quickly find your answers.

This guide gets you started on a path to creating dashboards. These basic dashboards enable team discussion and speed up issue resolution.

## Prerequisites

If you haven't already, create a [Datadog account][1]. Install the Agent on a host, and an integration for something running on that host.

## Plan

Determine the purpose of the dashboard you're creating. A dashboard can help you and your teammates focus on the right work. A _team dashboard_ reminds you what's high priority, what needs attention, and what you're succeeding at. Make a team dashboard (or multiple) with the information that people most frequently need they have to dig for. SLO and SLI details make for an excellent team dashboard.

A dashboard connected to real-time data is a powerful tool for guiding conversations with managers and executives. A good _executive dashboard_ can show that you are working on the most important things, how much a service is costing you, or whether you're progressing toward goals, meeting your SLOs, and scaling effectively. Executive dashboards are most effective when they answer these questions at the highest level and are interconnected to compare and analyze the answer.

Dashboards can also help you track down persistent problems and fix them. _Troubleshooting dashboards_ often start as a scratch pad of things you know, and gradually build as you discover more. For example, start with a graph or widget from another dashboard or view that shows a problem. You can further analyze from there to find your solution.

## Explore out-of-the-box dashboards

Datadog provides many out-of-the-box dashboards for features and integrations. For the infrastructure you monitor, check out the out-of-the-box dashboards that are provided with Datadog:

1. In Datadog, go to the [Dashboards List page][2] and search for the name of an integration you have added. For example, `Redis`, or a feature you use, such as `RUM`. 
2. Browse the search results for dashboards marked *Preset* and see if at least some of the graphs show the answers you're looking for.
3. Explore the links in the out-of-the-box dashboard's title dropdown to find more information about how people are using them.

## Start by reusing other dashboards

A common way to start a dashboard is by encountering a similar dashboard already in use, and adjusting it to suit your needs. If you find a dashboard that answers many of the questions you want your dashboard to answer: 

1. Clone it by opening the dashboard and selecting **Clone dashboard** from the Configuration Actions menu (the Configure button on the right-hand side). This creates an unlinked copy of the dashboard; changes you make in the new copy don't affect the source widget.
  {{< img src="getting_started/dashboards/configure_clone_dashboard.png" alt="Clone dashboard option in the Configuration Actions menu" style="width:100%;" >}}
2. Edit the clone by opening it and clicking **Edit widgets**. 
3. Delete widgets you don't need by selecting **Delete** from the widget's Settings menu.
4. Move things around to suit your needs. Groups and individual widgets can be dragged and dropped into new locations in the dashboard.
5. Copy in widgets you like from other dashboards by hovering over the widget and typing `Command + C` (`Ctrl + C` on Windows). Paste it into your dashboard by opening the dashboard and typing `Command + V` (`Ctrl + V` on Windows).
5. Use the **Export to Dashboard** option provided by many Datadog views for data they show. For example, the Logs Explorer and Log Analytics views have share options to export logs lists and metrics to dashboards.

## Learn more about metrics

Through integrations, Datadog collects [metrics][3] from your infrastructure and applications. The collected metrics are documented in the integration's README files. If you encounter a metric in the [Metrics Explorer][4] or as you're creating a dashboard, and you want to know what the metric is, look it up in the Integrations docs. 

For example, suppose you are looking at a time graph of the metric `aws.s3.first_byte_latency`. Go to the [Data collected][5] section of the Amazon S3 integration README to see its description: `The average per-request time from the complete request being received by a bucket to when the response starts to be returned. Shown as millisecond.`

## Add widgets and refine what they show

After you've selected a few metrics to add to your dashboard, experiment with various [widget types][6], [queries][7], [functions][8], and [aggregation approaches][9], to display the data in ways that best answer the questions you have. 

By specifying Template variables, you can make one dashboard answer questions for a selection of scenarios. For example, you can create a time graph that shows latency metrics for whichever data center geography the user selects from the dashboard's variables dropdown, or for all of them together. For more information, see [Template Variables][10].

You can make graphs easier to read by adjusting Y-axis ranges, colors, or legends, or by adding markers and event overlays. See the [Dashboards documentation][11] for all the ways you can customize and refine [timeseries][12] and [other widgets][6].

For more details and examples of these techniques, sign up for the online learning course [Building Better Dashboards][13].

## Try out other widgets

Timeseries graphs of metrics are useful, but dashboards can contain many types of widgets to communicate important information. Try:

 - **Alert values and Check statuses**: Show big red, yellow, and green numbers to bring attention to successes or problems.
 - **Heatmaps**: Show complex metric-infrastructure relationships across multiple tags with intuitive color-intensity graphs.
   {{< img src="getting_started/dashboards/heatmap_widget.png" alt="Heatmap example" >}}
 - **iFrames, formatted text, and images**: Show any number of website-like details to help explain the dashboard contents and provide additional resources.
 - **Tables**: Show lists of metrics grouped by tag keys.
 - **Top lists**: For example, show which hosts have the least free space, which services are throwing the most errors, or which URLs are returning the most 404s.
 - **Host map**: Show a diagram of, for example, the hosts in your infrastructure with colors that show status of their integrations or services.
 - **Service Level Objectives (SLO)**: Show team performance against goals with an SLO widget, and group it additional widgets that show details for SLI metrics.
 - **Distributions**: Show, for example, a histogram of number of different types of events in a containerized environment, the number of critical errors in each service, website flow (number of users getting to page 2, page 3, page 4), or latency percentile buckets.

See [Widgets][6] for more information and examples of setting up these graphs.

## Organize, link, and analyze

Move graphs around so they create a flow for the work you do or conversations you have around the dashboard. Drag and drop widgets to place them. On screenboards, use Free Text widgets to organize sections under headings. On timeboards, add a Group widget that can contain multiple widgets, and can collapse out of the way when you're viewing the dashboard.

There are two ways to create links from a dashboard to any target URL:

 - Add a Notes and Links widget, which can contain Markdown formatted text, including links. The widget editor includes Markdown formatting tips.
 - Create a Custom link from a widget's Settings (gear) menu. Custom links can interpolate variables and template variables, so that the link changes according to what the user has selected when they click, taking them to exactly the right place for analyzing data or taking corrective action. 
     {{< img src="getting_started/dashboards/opening_custom_link.mp4" alt="Opening a custom link" video=true >}}

## What's next

### Share your dashboards outside of the Datadog site

Click **Configure Public URL** in a dashboard's export menu to create a URL you can share with big screens or people who don't necessarily have a Datadog account. For more information, see [Sharing Dashboards][14].

Integrate with your team communications by using the [Slack integration][15] to import dashboards and other Datadog features, such as monitors and incidents, into a Slack channel.

### Create multiple dashboards quickly

Every dashboard has a JSON representation that you can copy or export from the Settings menu. Each widget on the dashboard also has a JSON definition, which you can see and edit by opening the widget editor (pencil icon) and clicking the JSON tab under **Graph your data**.

Because all widgets and dashboards are represented as JSON, you can programmatically generate them by using the [Dashboards API][16], which is useful if you want to generate a Dashboard every time your team starts a new project or encounters an incident, or formalizes an SLO, for example.

### View Dashboards from the Datadog Mobile App

View your dashboards on your mobile device with the [Datadog Mobile App][17], available on the [Apple App Store][18] and [Google Play Store][19]. 

The mobile app enables you to view and search all of the dashboards that you have access to in your Datadog organization, and filter them using the same template variables used in the Datadog web app.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dashboards on iOS and Android">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /metrics/introduction/
[4]: /metrics/explorer/
[5]: /integrations/amazon_s3/#data-collected
[6]: /dashboards/widgets/
[7]: /dashboards/querying/
[8]: /dashboards/functions/
[9]: /metrics/distributions/
[10]: /dashboards/template_variables/
[11]: /dashboards/
[12]: /dashboards/widgets/timeseries/
[13]: https://learn.datadoghq.com/courses/building-better-dashboards/
[14]: /dashboards/sharing/
[15]: /integrations/slack/
[16]: /api/v1/dashboards/
[17]: /service_management/mobile/
[18]: https://apps.apple.com/app/datadog/id1391380318
[19]: https://play.google.com/store/apps/details?id=com.datadog.app
