---
title: Anomalies Page
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/monitors"
  tag: "Monitors"
  text: "Create Cost Monitors"
---

## Overview

The Cloud Cost Management Anomalies page is designed to provide you insights about the automated detection of cost anomalies within your infrastructure. Leveraging advanced algorithms and machine learning, Datadog continuously monitors your environment to identify any unexpected spikes or irregularities in usage costs on a daily basis. This proactive approach not only helps you optimize your budget but also ensures that you are promptly alerted to potential issues before they escalate. The page aims to guide you through the process of understanding, investigating, and addressing cost anomalies.

_Note: It's only available for AWS for now, other cloud provider will arrive soon._

## View Cost Anomalies

On this page, you will find a comprehensive list of cost anomalies that have been automatically detected within your infrastructure. Each anomaly is represented by a detailed card, offering the following information:

- The duration of the anomaly and its start time
- The anomalous cost that has been identified
- The specific usage_type contributing to the cost anomaly
- The impacted account
- The actual cost incurred
- A selection of correlated tags for further context
- A graph illustrating the detected anomaly

These cards provide a clear overview of each anomaly, enabling you to quickly assess and address the cost irregularities within your system.

## Take action on anomalies

When you click on an anomaly in the list, a side panel will open, providing you with detailed information related to that anomaly. This includes insights such as the associated service, team, and environment, offering a clearer context of the issue.

Inside the side panel, you'll find a section titled **Next Steps**, guiding you on actionable measures to address and further investigate the anomaly.

## Resolve anomalies

During the anomaly resolution process, you have the opportunity to assess whether the detected anomaly is truly significant. Your input here is essential, as it helps us refine our algorithms and enhance the accuracy of future results.

Once you've made your assessment, you can proceed to "Resolve" the anomaly. This action will guide you to a dedicated section where you can provide a detailed explanation of your decision and the reasons behind the resolution.

Your insights will assist colleagues within your organization in understanding the rationale behind your resolution decision, fostering a shared comprehension and more efficient management of anomalies.

### Investigate

To effectively investigate cost anomalies, consider taking the following actions:

- **View in Explorer / Save to Notebook**: This option allows you to expand the time range and conduct a more refined analysis using the available tags, enabling a deeper dive into the factors contributing to the anomaly.

- **Create Monitor**: Set up a cost monitor to receive alerts and stay informed of future anomalies, empowering you to take proactive measures to manage your budget.

- **JIRA/Case**: Collaborate with your team by using JIRA or our internal Case Management feature for seamless follow-up and resolution of the identified anomalies.

- **Share**: Easily share the URL with colleagues to facilitate collaborative investigation, ensuring all relevant team members have access to the necessary information for effective analysis.


## How anomalies are defined

Not all changes in cost are classified as anomalies, as fluctuations in usage and cost can occur naturally due to various factors such as increased workload, scaling activities, or seasonal variations. An anomaly typically indicates an irregular or unexpected change that deviates significantly from the established usage patterns.

For example:
Many business spin down a part of their infrastructure over the weekend and spin back up on Mondays, that's a cost increase but it shouldn't be flag as an anomaly.

We are using the anomaly detection function to compute those anomalies. Here a link on [how it works][1].

[1]: /dashboards/functions/algorithms/#anomalies