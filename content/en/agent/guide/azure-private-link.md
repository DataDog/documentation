---
title: Connect to Datadog over Azure Private Link
---

{{% site-region region="us,us5,eu,gov,ap1" %}}
<div class="alert alert-warning">This feature is not supported for the selected Datadog site.</div>
{{% /site-region %}}

{{% site-region region="us3" %}}
[Azure Private Link][1] allows you to send telemetry to Datadog without using the public internet.

Datadog exposes some of its data intake services as [Azure Private Link services][2].

You can configure Azure Private Link to expose a private IP address for each Datadog intake service; this IP address routes traffic to the Datadog backend. You can then configure an Azure [Private DNS Zone][3] to override the DNS names corresponding to the products for each endpoint that is consumed.

## Setup

### Connect an endpoint

1. In the Azure portal, go to **Private Link**.
2. On the left navigation menu, select **Private endpoints**.
3. Select **Create**.
4. On the **Create a private endpoint** > **Basics** page, configure the following:
   - Under **Project details**, select the **Subscription** and **Resource group** from which production resources should access Private Link.
   - Under **Instance details**, enter a **Name** (for example, `datadog-api-private-link`) and select your **Region**.

   Select **Next: Resource** to continue.
5. On the **Create a private endpoint** > **Resource** page, configure the following:
   - For **Connection method**, select **Connect to an Azure resource by resource ID or alias**.
   - For **Resource ID or alias**, enter the Private Link service name that corresponds to the Datadog intake service that you want to use. You can find this service name in the [table of published services](#published-services).
   - Optionally, for **Request message**, you can enter your email address (associated with a Datadog account). This helps Datadog identify your request and reach out to you if necessary.

   Select **Next: Virtual Network** to continue.
6. On the **Create a private endpoint** > **Virtual Network** page, configure the following:
   - Under **Networking**, select the **Virtual network** and **Subnet** where the endpoint should live. Typically, this is located in the same network as the compute resources that need to access the private endpoint.
   - Under **Private DNS integration**, select **No**.

   Select **Next: Tags** to continue.
7. On the **Create a private endpoint** > **Tags** page, you can optionally set tags. Select **Next**.
8. On the **Review + create** page, review your configuration settings. Then, select **Create**.
9. After your private endpoint is created, find it in the list. Take note of this endpoint's **Private IP**, as this is used in the next section.

### Create a Private DNS zone
1. In the Azure portal, go to **Private DNS zones**.
2. Select **Create**.
3. On the **Create Private DNS zone** > **Basics** page, configure the following:
   - Under **Project details**, select the **Subscription** and **Resource group** from which production resources should access the private endpoint.
   - Under **Instance details**, for **Name**, enter the _private DNS name_ that corresponds to the Datadog intake service that you want to use. You can find this service name in the [table of published services](#published-services).

   Select **Review create**.
4. Review your configuration settings. Then, select **Create**.
5. After the Private DNS zone is created, select it from the list.
6. In the panel that opens, select **+ Record set**.
7. In the **Add record set** panel, configure the following:
   - For **Name**, enter `*`.
   - For **Type**, select **A - Address record**.
   - For **IP address**, enter the IP address you noted at the end of the previous section.
   
   Select **OK** to finish.

## Published services

| Datadog intake service | Private Link service name | Private DNS name |
| --- | --- | --- |
| Logs (Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| Logs (User HTTP Intake) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| Metrics | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `metrics.agent.us3.datadoghq.com` |
| Containers  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| Process | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| Profiling | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| Traces | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `trace.agent.us3.datadoghq.com` |
| Remote Configuration | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Database Monitoring | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone
{{% /site-region %}}