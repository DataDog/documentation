---
title: Configure Apdex score by service
kind: documentation
aliases:
    - /tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
    - /tracing/getting_further/configure_an_apdex_for_your_traces_with_datadog_apm
---

[Apdex][1] (Application Performance Index) is an open standard developed by an alliance of companies that defines a standardized method to report, benchmark, and track application performance. Based on user experience satisfaction by measuring the response time of web applications and services, its role is to counterbalance response time average and percentiles which can be misleading by some extreme data points

## Definition

Apdex is a numerical measure of user satisfaction with the performance of enterprise applications. It converts many measurements into one number on a uniform scale on the [0;1] interval:

* 0 = no users satisfied
* 1 = all users satisfied

To define your apdex, you need to be an administrator of your Datadog account. To define your apdex you need to first define a time threshold—**T**—separating satisfactory response times from unsatisfactory response times from your application or service. With one threshold you can then define three categories:

* Satisfied requests have a response time below **T**
* Tolerated requests have a response time equal to/above **T** and below/equal to **4T**
* Frustrated requests have a response time above **4T** or returns an error

Once the threshold is defined and your requests are categorized, the apdex is defined as:

{{< img src="tracing/faq/apdex_formula.png" alt="Apdex formula" responsive="true" >}}

Selecting the correct threshold is really important since the Frustrated requests are 4 times slower than "normal". If T=3 you can wait 3 seconds for a page to load by you might not tolerate waiting until 12 seconds.

That's why the default Apdex threshold value used by your Datadog application is 0.5 second But you can change its value directly on your service board.

## Set your Apdex for your traces

To visualize your application/service Apdex, you need to go on your service board, and select Apdex instead of latency:

{{< img src="tracing/faq/apdex_selection.png" alt="Apdex Selection" responsive="true" >}}

You can then use the pencil icon on the top left of your widget to configure your Apdex:

{{< img src="tracing/faq/apdex_edit.png" alt="Apdex Edit" responsive="true" >}}

Enter your threshold directly to visualize your request distribution:

{{< img src="tracing/faq/apdex_update.png" alt="Apdex Update" responsive="true" >}}

You can then save your widget to follow your Apdex evolution over time:

{{< img src="tracing/faq/apm_save.png" alt="Apdex Save" responsive="true" >}}

## Display your Apdex on your service page

To display the Apdex on your [service page][2], select it in the configuration menu on the upper right corner of the page:

{{< img src="tracing/faq/apdex_service_list.png" alt="Apdex Service List" responsive="true" >}}

[1]: http://apdex.org/overview.html
[2]: https://app.datadoghq.com/apm/services
