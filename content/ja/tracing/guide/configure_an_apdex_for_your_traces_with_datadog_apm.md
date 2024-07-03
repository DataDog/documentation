---
aliases:
- /ja/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
- /ja/tracing/getting_further/configure_an_apdex_for_your_traces_with_datadog_apm
kind: documentation
title: Configure Apdex score by service
---
{{< jqmath-vanilla >}}

[Apdex][1] (Application Performance Index) is an open standard developed by an alliance of companies that defines a standardized method to report, benchmark, and track application performance. Based on user experience satisfaction by measuring the response time of web applications and services, its role is to counterbalance response time average and percentiles which can be misleading when there are extreme data points.

## Definition

Apdex is a numerical measure of user satisfaction with the performance of enterprise web applications. It converts many measurements into one number on a uniform scale on the [0;1] interval:

* 0 = no users satisfied
* 1 = all users satisfied

To define your Apdex, you need to be an administrator of your Datadog account. First define a time threshold—**T**—separating satisfactory response times from unsatisfactory response times from your web application or service. With one threshold you can then define three categories:

* Satisfied requests have a response time below **T**.
* Tolerated requests have a response time equal to or above **T** and below or equal to **4T**.
* Frustrated requests have a response time above **4T** or returns an error.

Once the threshold is defined and your requests are categorized, the Apdex is defined as:

$$\bo\text"Apdex"=({\bo\text"Satisfied"\text" requests" + {{\bo\text"Tolerated"\text" requests"}
 / 2}})/{\bo\text"Total"\text" requests"} $$

Selecting the correct threshold is important because the Frustrated requests are 4 times slower than "normal". If T=3 the user waits 3 seconds for a page to load but does not tolerate waiting 12 seconds.

Apdex thresholds must be set by administrators, per service, before Apdex scores calculated.

## Set your Apdex for your traces

To visualize your web application or service Apdex: 

1. On the [Service Catalog][3], click into a web service. On the upper right-hand graph, select Apdex instead of Latency. If you don't see this option, check that you have clicked into a web service:

   {{< img src="tracing/faq/apdex_selection.png" alt="Apdex Selection" >}}

2. Use the pencil icon on the top left of your widget to configure your Apdex (you must be an administrator to see this icon):

   {{< img src="tracing/faq/apdex_edit.png" alt="Apdex Edit" >}}

3. Enter your threshold directly to visualize your request distribution:

   {{< img src="tracing/faq/apdex_update.png" alt="Apdex Update" >}}

4. Save your widget to follow your Apdex evolution over time:

   {{< img src="tracing/faq/apm_save.png" alt="Apdex Save" >}}

## Display your Apdex on the Service Catalog

To display Apdex scores on the [Service Catalog][2], select it in the configuration menu on the upper right corner of the page:

{{< img src="tracing/faq/apdex_service_list.png" alt="Apdex Service Catalog" >}}

[1]: https://www.apdex.org/
[2]: https://app.datadoghq.com/services
[3]: https://app.datadoghq.com/services?query=type%3Aweb