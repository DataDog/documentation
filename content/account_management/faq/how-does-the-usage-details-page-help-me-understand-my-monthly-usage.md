---
title: How does the usage details page help me understand my monthly usage?
kind: faq
customnav: accountmanagementnav
---


## How do I access the Usage Details page to view how my usage is trending?

Admin users can access this page by navigating to 'Plan & Usage,' then 'Usage,' as seen below. (Only available to paying customers)
{{< img src="account_management/faq/usage_image.png" alt="usage_image" responsive="true" >}}

## How does the Usage Details page help me?

The Usage Details page serves two purposes:

Provides transparency into your overall hourly usage for the current and previous month
Insights into your top 500 custom metrics (Avg./hour & Max./hour)

## What data can I gain access to on the usage details page?

There are three tables you can access on this page. The top visualization is a table containing two tabs that will display either ‘Hourly Usage’ or 'Infastructure Host Types'. The bottom visualization is a table that will give more specific information on custom metric usage. The explanations for these different tables/visualizations are explained below:

* APM Hosts: Shows the total number of hosts using APM during the hour.
* Infra. Hosts: Shows the total number of infrastructure hosts reporting during a given hour. This is the sum of all Agent hosts, APM hosts, AWS/GCP/Azure hosts (if applicable)  per hour
* Containers: Shows the total number of containers reporting via the Docker integration during the hour.
* Custom Metrics: Shows the total number of custom metrics per hour. For an explanation of how we define a custom metric, please see the [dedicated article](/getting_started/custom_metrics)
{{< img src="account_management/faq/metric_usage_list.png" alt="metric_usage_list" responsive="true" >}}

In the ‘Top 500 Custom Metrics’ table, we provide 2 columns - average custom metrics per hour and max. custom metrics per hour. This table shows data for the current month up to 3 days ago. 
{{< img src="account_management/faq/old_metric_list_usage.png" alt="old_metric_list_usage" responsive="true" >}}

Finally, it is worth noting that you can also download all of these reports by clicking the ‘Download as CSV’ link in the upper right corner. 
