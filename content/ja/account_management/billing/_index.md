---
title: 課金
---

## Overview

The billing cycle begins the first of the month (UTC) regardless of when you sign up. Your first month is prorated based on your actual sign-up date.

Datadog は、ホストとカスタムメトリクスの数を毎時間測定します。ホストの課金対象数は、その時間の使用量の下位 99% の最大数 (高水位) を用いて月末に計算されます。Datadog は上位 1% を除外することで、使用量の急上昇が課金に与える影響を軽減します。カスタムメトリクスの課金対象数は、その月のカスタムメトリクスの時間数の平均に基づいて計算されます。Datadog で[使用量][1]を確認できます。請求ページには、Datadog の管理者権限を持つユーザーのみがアクセス可能です。 

### Hosts

ホストとは、Datadog で監視する物理的または仮想の OS インスタンスであり、サーバー、VM、ノード (Kubernetes の場合)、App Service Plan インスタンス (Azure App Service の場合)、または Heroku dyno (Heroku プラットフォームの場合) などが含まれます。ホストには、Datadog Agent がインストールされたインスタンスのほか、Datadog インテグレーションを使用して監視されているすべての Amazon EC2、Google Cloud、Azure、vSphere VM が含まれます。Agent がインストールされている EC2 または VM は、1 つのインスタンスとしてカウントされます (二重課金はされません)。

Non-reporting hosts (status `INACTIVE` in your [Infrastructure list][2]) do not count towards billing. It could take up to 2 hours for these hosts to drop out of the [Infrastructure List][2]. Datadog retains the historical data for these hosts (paid accounts). Metrics can be graphed on a dashboard by knowing the specific host name or tags.

### Containers

It is recommended that containers are monitored with a single containerized Agent per host. This Agent collects both container and host metrics. If you choose to install the Agent directly in each container, each container is counted as a host from a billing perspective. More details can be found in the [Agent installation][3] documentation.

### Serverless

Datadog bills based on the average number of functions per hour across the month for your accounts. Every hour, Datadog records the number of functions that were executed one or more times and monitored by your Datadog account. At the end of the month, Datadog charges by calculating the average of the hourly number of functions recorded. Pro and Enterprise plans include five custom metrics per billable function.

Billing for serverless APM is based on the sum of AWS Lambda invocations connected to APM ingested spans in a given month. You will also be billed for the total number of [indexed spans][4] submitted to the Datadog APM service exceeding the bundled quantity at the end of the month. There are no billable [APM Hosts][4] when using serverless.

For more information, see the [Serverless billing page][5] and the [Datadog Pricing page][6].

### IoT

Datadog は、IoT デバイスの数を毎時間測定します。IoT デバイスの課金対象数は、その時間の使用量の下位 99% の最大数 (高水位) を用いて月末に計算されます。上位 1% を除外することで、使用量の急上昇が課金に与える影響を軽減します。

For more information about IoT billing, see the [Datadog Pricing page][7].

## Plan details

To manage your **Payment Method** and view **Subscription Details**, you must be a Datadog Admin user.

Alternately, roles with Billing Read (`billing_read`) and Billing Edit (`billing_edit`) [permissions][8] can access this data.

### Managing your payment method

The [**Payment Method**][9] section contains details on your payment options. 

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Payment method on the Plan page" style="width:90%;" >}}

**Edit Payment** provides options to manage payment methods. You can edit or remove cards, and request to change your payment method from card to invoice and vice versa. 

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Payment settings on the Plan page" style="width:90%;" >}}

### Managing your billing contact details

You can view your billing contact details on the [**Billing Contact Details**][9] section. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Billing contact details on the Plan page" style="width:90%;" >}}

**Edit Details** to add, edit, or remove your billing address. You can also specify the email addresses where invoices should be sent.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Editing billing contact details on the Plan page" style="width:90%;" >}}

**Note**: The email address does not need to be a team member within Datadog. For example, you could use `invoices@example.com`.

### View your subscription details

The [Subscription Details][9] section includes the quantity, contract price, and on-demand price for all committed products.

{{< img src="/account_management/billing/subscription_details.png" alt="Account Plan & Usage page highlighting Subscription Details section" style="width:90%;" >}}

**Note**: If your billing is managed directly through a Datadog Partner, Subscription Details are not supported.

## Payment

There are two choices for payment method:
- Credit card
- Invoicing (ACH, wire, or check)

### Credit card

If you pay by credit card, receipts are available to [Administrators][10] for previous months under [Billing History][11]. For copies of your invoice, email [Datadog billing][13].

See [Credit Card Billing][12] for more details.

### Invoicing

If you pay by check, ACH, or wire, invoices are emailed to the billing email addresses near the 10th business day of each month. To request an additional copy, email [Datadog billing][13]. Details on where to remit payment can be found on the invoice.

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
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}Usage details{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Usage Metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Credit card{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Custom metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Log management{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (Distributed Tracing & Continuous Profiler){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}AWS integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Azure integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Alibaba integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Google Cloud integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}vSphere integration{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}Usage attribution{{< /nextlink >}}
{{< /whatsnext >}}



[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /ja/infrastructure/
[3]: /ja/agent/
[4]: /ja/account_management/billing/pricing/#apm
[5]: /ja/account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[7]: https://www.datadoghq.com/pricing/
[8]: /ja/account_management/rbac/permissions/#billing-and-usage
[9]: https://app.datadoghq.com/billing/plan
[10]: /ja/account_management/rbac/#datadog-default-roles
[11]: https://app.datadoghq.com/account/billing_history
[12]: /ja/account_management/billing/credit_card/
[13]: mailto:billing@datadoghq.com