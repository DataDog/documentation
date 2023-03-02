---
title: Billing
kind: documentation
---

## Overview

The billing cycle begins the first of the month regardless of when you sign up. Your first month is prorated based on your actual sign-up date.

Datadog meters the count of hosts and custom metrics hourly. The billable count of hosts is calculated at the end of the month using the maximum count (high-water mark) of the lower 99 percent of usage for those hours. Datadog excludes the top 1% to reduce the impact of spikes in usage on your bill. The billable count of custom metrics is based on the average number of custom metric hours for the month. See your [Usage][1] in Datadog. Billing pages are only accessible to users with the Datadog Admin Role.

### Hosts

A host is any physical or virtual OS instance that you monitor with Datadog. It could be a server, VM, node (in the case of Kubernetes), or App Service Plan instance (in the case of Azure App Service). Hosts can be instances with the Datadog Agent installed plus any AWS EC2s, GCP, Azure, or vSphere VMs monitored with Datadog integrations. Any EC2s or VMs with the Agent installed count as a single instance (no double-billing).

Non-reporting hosts (status `???` in your [Infrastructure list][2]) do not count towards billing. It could take up to 2 hours for these hosts to drop out of the [Infrastructure List][2]. Datadog retains the historical data for these hosts (paid accounts). Metrics can be graphed on a dashboard by knowing the specific host name or tags.

### Containers

It is recommended that containers are monitored with a single containerized Agent per host. This Agent collects both container and host metrics. If you choose to install the Agent directly in each container, each container is counted as a host from a billing perspective. More details can be found in the [Agent installation][3] documentation.

### Serverless

Datadog bills based on the average number of functions per hour across the month for your accounts. Every hour, Datadog records the number of functions that were executed one or more times and monitored by your Datadog account. At the end of the month, Datadog charges by calculating the average of the hourly number of functions recorded. Pro and Enterprise plans include five custom metrics per billable function.

Billing for serverless APM is based on the sum of AWS Lambda invocations connected to APM ingested spans in a given month. You will also be billed for the total number of [indexed spans][4] submitted to the Datadog APM service exceeding the bundled quantity at the end of the month. There are no billable [APM Hosts][4] when using serverless.

For more information, see the [Serverless billing page][5] and the [Datadog Pricing page][6].

### IoT

Datadog meters the count of IoT devices hourly. The billable count of IoT devices is calculated at the end of the month using the maximum count (high-water mark) of the lower 99 percent of usage for those hours, excluding the top 1% to reduce the impact of spikes in usage on your bill.

For more information about IoT billing, see the [Datadog Pricing page][7].

## Invoices

There are two choices for payment method:
- Credit card
- Invoicing (ACH, wire, or check)

### Credit card

If you pay by credit card, receipts are available to [Administrators][8] for previous months under [Billing History][9]. For copies of your invoice, email [Datadog billing][10].

See [Credit Card Billing][11] for more details.

### Invoicing

If you pay by check, ACH, or wire, invoices are emailed to the billing email addresses near the 10th business day of each month. If you need an additional copy, email [Datadog billing][10]. Details on where to remit payment can be found on the invoice.

### Managing your payment method

The [**Payment Method**][12] section contains details on your payment options. 

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Payment method on the Plan page" style="width:80%;" >}}

**Edit Payment** provides options to manage payment methods. You can edit or remove cards, and request to change your payment method from card to invoice and vice versa. 

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Payment settings on the Plan page" style="width:80%;" >}}

### Managing your billing contact details

You can view your billing contact details on the [**Billing Contact Details**][12] section. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Billing contact details on the Plan page" style="width:80%;" >}}

Through **Edit Details**, you can add, edit or remove your billing address. You can also set specific email addresses to receive invoices.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Editing billing contact details on the Plan page" style="width:80%;" >}}

**Note**: The email address does not need to be a team member within Datadog. For example, you could use `invoices@yourcompany.com`.

## Contact

| Question or concern                                                                                                                                                                               | Contact                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| Dispute and credit request<br>Usage<br>Payment method change<br>Payment concern<br>General account concerns<br>Update contacts<br>Statement of account<br>Update billing and shipping information | success@datadoghq.com        |
| Invoice copies<br>Time sensitive charge requests<br>Billing breakdown<br>Portal invitation                                                                                                        | billing@datadoghq.com        |
| Payment remittance                                                                                                                                                                                | remittances@datadoghq.com    |
| Purchase order copies                                                                                                                                                                             | purchaseorders@datadoghq.com |

## Further Reading

{{< whatsnext desc="Specific billing topics:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Pricing{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_details/" >}}Usage details{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Usage Metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Credit card{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Custom metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Log management{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (Distributed Tracing & Continuous Profiler){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}RUM & Session Replay{{< /nextlink >}}
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
[4]: /account_management/billing/pricing/#apm
[5]: /account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[7]: https://www.datadoghq.com/pricing/
[8]: /account_management/rbac/#datadog-default-roles
[9]: https://app.datadoghq.com/account/billing_history
[10]: mailto:billing@datadoghq.com
[11]: /account_management/billing/credit_card/
[12]: https://app.datadoghq.com/billing/plan
