---
title: Graphing
kind: documentation
aliases:
    - /guides/graphing
    - /graphing/miscellaneous/metrics_arithmetic
    - /graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
    - /graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
description: Visualize your data to gain insight
further_reading:
- link: "https://learn.datadoghq.com/course/view.php?id=8"
  tag: “Learning Center”
  text: “Building Better Dashboards”
---

Graphs are the window to your monitored systems. You see graphs throughout Datadog, in email notifications, Slack, and other chat clients. You can define graphs for monitoring your infrastructure using metrics, monitors, dashboards, and notebooks.

## Overview

- [Getting started with graphs][1]: Whether using metrics, monitors, dashboards, or notebooks, all graphs have basic functionality in common - start here for best practices for setting up graphs.


- [Dashboards][2]: A dashboard is Datadogs tool that visually tracks, analyzes, and displays key performance metrics to monitor the health of your infrastructure. Learn more about using [Screenboards][3], [Timeboard][4], optimizing those dashboards with [template variables][5], and [sharing your graphs][6] to people outside of your Datadog account.


- [Metrics][7]: When you connect an [integration][8] to Datadog, the integration sends [metrics][9] about your system back to Datadog. Once Datadog receives these metrics, you can build graphs to explore the data. The [Metrics Explorer][10] lets you search for specific metrics and then create graphs based on your search parameters, and the [Metrics Summary][11] shows all of the metrics coming into Datadog.


- [Notebooks][12]: Notebooks combine graphs and text in a linear, cell-based format. They’re designed to help you explore and share stories with your data.


- [Event Stream][13]: The event stream is a display of the most recent events in your infrastructure.


- [infrastructure][14]: The Infrastructure list page shows all hosts monitored by your Datadog application. [Host Maps][15] visualize hosts together on one screen, with metrics made comprehensible via color and shape, and the [container map][16] and [live containers][17] shows you the health of your containers. [Process Monitoring][18] allows for real-time visibility of the most granular elements in a deployment. [Cloud functions][19] are a service that runs your code in response to events and automatically manage the underlying compute resources for you.


- [From the query to the graph][20]: This sections goes through several topics to give you advanced graphing functions: [Algorithms][21], [Arithmetic][22], [Count][23], [Interpolation][24], [Rank][25], [Rate][26], [Regression][27], [Rollup][28], [Smoothing][29], and [Timeshift][30].


- [Graphing with JSON][31]: Use the API to create graphs.


- [Widgets][32]: Find all of the types of monitors you can create with Datadog. 


- [Guides][33]: These are in-depth, step-by-step tutorials for using this functionality.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/getting_started
[2]: /graphing/dashboards
[3]: /graphing/dashboards/screenboard
[4]: /graphing/dashboards/timeboard
[5]: /graphing/dashboards/template_variables
[6]: /graphing/dashboards/shared_graph
[7]: /graphing/metrics
[8]: /getting_started/integrations
[9]: /developers/metrics
[10]: /graphing/metrics/explorer
[11]: /graphing/metrics/summary
[12]: /graphing/notebooks
[13]: /graphing/event_stream
[14]: /graphing/infrastructure
[15]: /graphing/infrastructure/hostmap
[16]: /graphing/infrastructure/containermap
[17]: /graphing/infrastructure/livecontainers
[18]: /graphing/infrastructure/process
[19]: /graphing/infrastructure/cloudfunctions
[20]: /graphing/functions
[21]: /graphing/functions/algorithms
[22]: /graphing/functions/arithmetic
[23]: /graphing/functions/count
[24]: /graphing/functions/interpolation
[25]: /graphing/functions/rank
[26]: /graphing/functions/rate
[27]: /graphing/functions/regression
[28]: /graphing/functions/rollup
[29]: /graphing/functions/smoothing
[30]: /graphing/functions/timeshift
[31]: /graphing/graphing_json
[32]: /graphing/widgets
[33]: /graphing/guide
