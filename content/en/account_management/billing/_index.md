---
title: Billing
kind: documentation
---

## Overview

The billing cycle begins the first of the month regardless of when you sign up. Your first month is prorated based on your actual sign-up date.

Datadog meters the count of hosts and custom metrics hourly. The billable count of hosts is calculated at the end of the month using the maximum count (high-water mark) of the lower 99 percent of usage for those hours. We exclude the top 1% to reduce the impact of spikes in usage on your bill. The billable count of custom metrics is based on the average number of custom metric hours for the month. See your [Usage][1] in Datadog. Billing pages are only accessible to users with the Datadog Admin Role.

### Hosts

A host is any physical or virtual OS instance that you monitor with Datadog. It could be a server, VM, node (in the case of Kubernetes), or App Service Plan instance (in the case of Azure App Services). Hosts can be instances with the Datadog Agent installed plus any AWS EC2s, GCP, Azure, or vSphere VMs monitored with our integrations. Any EC2s or VMs with the Agent installed count as a single instance (no double-billing).

Non-reporting hosts (status `???` in your [Infrastructure list][2]) do not count towards billing. It could take up to 2 hours for these hosts to drop out of the [Infrastructure List][2]. Datadog retains the historical data for these hosts (paid accounts). Metrics can be graphed on a dashboard by knowing the specific host name or tags.

### Containers

It is recommended that containers are monitored with a single containerized Agent per host. This Agent collects both container and host metrics. If you choose to install the Agent directly in each container, each container is counted as a host from a billing perspective.  More details can be found in the [Agent installation][3] documentation.

### Serverless

Datadog bills based on the average number of functions per hour across the month for your accounts. Every hour, Datadog records the number of functions that were executed one or more times and monitored by your Datadog account. At the end of the month, Datadog charges by calculating the average of the hourly number of functions recorded.

Pro and Enterprise plans include 150,000 Indexed Spans and 5 custom metrics per billed function. Billing for serverless APM depends on the total number of [Indexed Spans][4] exceeding the bundled quantity submitted to the Datadog APM service at the end of the month. There are no billable [APM Hosts][4] when using serverless.

**Note** Indexed Spans were formerly known as Analyzed Spans and renamed with the launch of Tracing Without Limits on October 20th, 2020.

For more information, see the [Serverless billing page][5] and the [Datadog Pricing page][6].

### IoT

Datadog meters the count of IoT devices hourly. The billable count of IoT devices is calculated at the end of the month using the maximum count (high-water mark) of the lower 99 percent of usage for those hours, excluding the top 1% to reduce the impact of spikes in usage on your bill.

For more information about IoT billing, see the [Datadog Pricing page][7].

## Invoicing

If you pay by credit card, receipts are available to [Administrators][8] for previous months under [Billing History][9].

If you pay by check or wire, invoices are emailed to the billing email addresses when due. If you need an additional copy, email [Datadog billing][10].

### Billing emails

You can set specific email addresses to receive invoices on the [Plan][11] page under **Manage Billing Emails**:

{{< img src="account_management/billing/billing01.png" alt="Manage Billing Emails" >}}

**Note**: The email address does not need to be a team member within Datadog. For example, you could use `invoices@yourcompany.com`.

## Further Reading

{{< whatsnext desc="Specific billing topics:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Pricing{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_details/" >}}Usage details{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Usage Metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Credit card{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Custom metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Log management{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_distributed_tracing/" >}}APM & Distributed Tracing{{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring FAQ{{< /nextlink >}}
    {{< nextlink href="account_management/billing/profiler/" >}}Continuous Profiler FAQ{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}AWS integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Azure integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Alibaba integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Google Cloud integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}vSphere integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}Usage attribution{{< /nextlink >}}
{{< /whatsnext >}}


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /infrastructure/
[3]: /agent/
[4]: https://docs.datadoghq.com/account_management/billing/pricing/#apm
[5]: https://docs.datadoghq.com/account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/#included_serverless_functions-d
[7]: https://www.datadoghq.com/pricing/
[8]: /account_management/users/default_roles/
[9]: https://app.datadoghq.com/account/billing_history
[10]: mailto:billing@datadoghq.com
[11]: https://app.datadoghq.com/account/billing
