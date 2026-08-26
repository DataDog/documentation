---
title: Connect to Datadog over Azure Private Link
description: Configure Azure Private Link to send telemetry to Datadog securely without using the public internet, including endpoint setup and DNS configuration.
---

[Azure Private Link][1] allows you to send telemetry to Datadog without using the public internet.

Datadog exposes some of its data intake services as [Azure Private Link services][2].

You can configure Azure Private Link to expose a private IP address for each Datadog intake service; this IP address routes traffic to the Datadog backend. You can then configure an Azure [Private DNS Zone][3] to override the DNS names corresponding to the products for each endpoint that is consumed.

## Setup

### Connect an endpoint

1. In the Azure portal, go to {{< ui >}}Private Link{{< /ui >}}.
2. On the left navigation menu, select {{< ui >}}Private endpoints{{< /ui >}}.
3. Select {{< ui >}}Create{{< /ui >}}.
4. On the {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Basics{{< /ui >}} page, configure the following:
   - Under {{< ui >}}Project details{{< /ui >}}, select the {{< ui >}}Subscription{{< /ui >}} and {{< ui >}}Resource group{{< /ui >}} from which production resources should access Private Link.
   - Under {{< ui >}}Instance details{{< /ui >}}, enter a {{< ui >}}Name{{< /ui >}} (for example, `datadog-api-private-link`) and select your {{< ui >}}Region{{< /ui >}}.

   Select {{< ui >}}Next: Resource{{< /ui >}} to continue.
5. On the {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Resource{{< /ui >}} page, configure the following:
   - For {{< ui >}}Connection method{{< /ui >}}, select {{< ui >}}Connect to an Azure resource by resource ID or alias{{< /ui >}}.
   - For {{< ui >}}Resource ID or alias{{< /ui >}}, enter the Private Link service name that corresponds to the Datadog intake service that you want to use. You can find this service name in the [table of published services](#published-services).
   - Optionally, for {{< ui >}}Request message{{< /ui >}}, you can enter your email address (associated with a Datadog account). This helps Datadog identify your request and reach out to you if necessary.

   Select {{< ui >}}Next: Virtual Network{{< /ui >}} to continue.
6. On the {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Virtual Network{{< /ui >}} page, configure the following:
   - Under {{< ui >}}Networking{{< /ui >}}, select the {{< ui >}}Virtual network{{< /ui >}} and {{< ui >}}Subnet{{< /ui >}} where the endpoint should live. Typically, this is located in the same network as the compute resources that need to access the private endpoint.
   - Under {{< ui >}}Private DNS integration{{< /ui >}}, select {{< ui >}}No{{< /ui >}}.

   Select {{< ui >}}Next: Tags{{< /ui >}} to continue.
7. On the {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Tags{{< /ui >}} page, you can optionally set tags. Select {{< ui >}}Next{{< /ui >}}.
8. On the {{< ui >}}Review + create{{< /ui >}} page, review your configuration settings. Then, select {{< ui >}}Create{{< /ui >}}.
9. After your private endpoint is created, find it in the list. Take note of this endpoint's {{< ui >}}Private IP{{< /ui >}}, as this is used in the next section. The Connection Status field should be Pending.
10. Next, Datadog's approval is necessary and manual. Reach out to Datadog Support and request approval of your private link endpoint, include your endpoint name.
11. After Datadog Support has confirmed that the endpoint is created, confirm that it is fully working. In the Azure portal navigate to {{< ui >}}Home{{< /ui >}} > {{< ui >}}Private Endpoints{{< /ui >}}. Click the endpoint name, and confirm that the Connection Status shows {{< ui >}}Approved{{< /ui >}}. 
12. Navigate to {{< ui >}}Monitoring{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}. Confirm the `Bytes In` and `Bytes Out` metrics are non-zero. These metrics should also be captured by the Datadog Azure Integration as `azure.network_privateendpoints.pe_bytes_[in/out]`.

### Create a Private DNS zone
1. In the Azure portal, go to {{< ui >}}Private DNS zones{{< /ui >}}.
2. Select {{< ui >}}Create{{< /ui >}}.
3. On the {{< ui >}}Create Private DNS zone{{< /ui >}} > {{< ui >}}Basics{{< /ui >}} page, configure the following:
   - Under {{< ui >}}Project details{{< /ui >}}, select the {{< ui >}}Subscription{{< /ui >}} and {{< ui >}}Resource group{{< /ui >}} from which production resources should access the private endpoint.
   - Under {{< ui >}}Instance details{{< /ui >}}, for {{< ui >}}Name{{< /ui >}}, enter the _private DNS name_ that corresponds to the Datadog intake service that you want to use. You can find this service name in the [table of published services](#published-services).

   Select {{< ui >}}Review create{{< /ui >}}.
4. Review your configuration settings. Then, select {{< ui >}}Create{{< /ui >}}.
5. After the Private DNS zone is created, select it from the list.
6. In the panel that opens, select {{< ui >}}+ Record set{{< /ui >}}.
7. In the {{< ui >}}Add record set{{< /ui >}} panel, configure the following:
   - For {{< ui >}}Name{{< /ui >}}, enter `*`.
   - For {{< ui >}}Type{{< /ui >}}, select {{< ui >}}A - Address record{{< /ui >}}.
   - For {{< ui >}}IP address{{< /ui >}}, enter the IP address you noted at the end of the previous section.

   Select {{< ui >}}OK{{< /ui >}} to finish.
### Additional required steps for metrics and traces
Two Datadog Intake Services are subdomains of the `agent.`{{< region-param key="dd_site" code="true" >}} domain. Because of this, the Private DNS zone is slightly different from other intakes.

Create a Private DNS Zone for `agent.`{{< region-param key="dd_site" code="true" >}}, as outlined in the section above. Then add the three records below.

| DNS name | Resource record type | IPv4 address |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | IP address for your metrics endpoint |
| `*`      | A                    | IP address for your metrics endpoint |
| `trace`  | A                    | IP address for your traces endpoint |

**Note**: This zone requires a wildcard (`*`) record that points to the IP address for your metrics endpoint. This is because Datadog Agents submit telemetry using a versioned endpoint in the form (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}).


## Published services

| Datadog intake service | Private Link service name | Private DNS name |
| --- | --- | --- |
| Logs (Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| Logs (OTel Collector with Datadog Exporter) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| Logs (User HTTP Intake) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| Metrics | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Containers  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| Process | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| Profiling | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| Traces | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Remote Configuration | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Database Monitoring | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone
