---
title: Connect to Datadog over GCP Private Service Connect
kind: guide
further_reading:
    - link: '/integrations/google_cloud_platform/'
      tag: 'Documentation'
      text: 'Datadog-Google Cloud Platform Integration'
    - link: '/agent/guide/private-link'
      tag: 'Documentation'
      text: 'Connect to Datadog over AWS PrivateLink'
---

{{% site-region region="us,us3,eu,gov,ap1" %}}
<div class="alert alert-warning">This feature is not supported for the selected Datadog site.</div>
{{% /site-region %}}

{{% site-region region="us5" %}}
## Overview

[Private Service Connect][1] (PSC) allows users to connect directly to Datadog without using the public internet.

Datadog exposes some of its data intake services in Google Cloud Platform as PSC [_published services_][2], as seen in the [table of published services](#published-services). 

A user can configure a GCP PSC endpoint to expose a private IP address for each Datadog intake service; this IP address routes traffic to the Datadog backend. The user then configures a GCP [_Private DNS Zone_][3] to override the DNS names corresponding to the products for each endpoint that is consumed. This guide explains how to set this up.

{{< img src="agent/guide/psc/gcp-psc-overview-1.png" alt="GCP Private Service Connect schema" >}}

## Setup

1. In your GCP console, navigate to **Network services** > **Private Service Connect**.
2. Go to the **Endpoints** section. Click on **Connect endpoint**.
   {{< img src="agent/guide/psc/connect-endpoint.png" alt="GCP Private Service Connect schema" >}}
   
   - Under **Target**, select _Published service_.
   - For **Target service**, enter the _PSC target name_ that corresponds to the Datadog intake service that you want to use. You can find your PSC target name in the [table of published services](#published-services).
   - For **Endpoint name**, enter a unique identifier to use for this endpoint. You can use `datadog-<SERVICE>`. For example: `datadog-metrics`.
   - For **Network** and **Subnetwork**, TK
   - For **IP address**, click the dropdown and select _Create IP address_ to create an internal IP from your subnet dedicated to the endpoint. Select this IP.
   - Check **Enable global access** if you intend to connect the endpoint to virtual machines outside of the `us-central1` region.

   **Note**: Datadog exposes PSC producer endpoints from the `us-central1` region. These endpoints support global access, allowing services to connect from any region. However, the forwarding rule must be created in the `us-central1` region.

3. Click **Add endpoint**. Verify that your status is _Accepted_. Take note of the IP address, as this is required in Step 6.
   {{< img src="agent/guide/psc/connect-endpoint-success.png" alt="GCP Private Service Connect schema" >}}
4. In your GCP console, navigate to **Network services** > **Cloud DNS**.
5. Click on **Create zone**.
   {{< img src="agent/guide/psc/create-a-dns-zone.png" alt="GCP Private Service Connect schema" >}}

   - Under **Zone type**, select _Private_.
   - For **Zone name**, TK
   - For **DNS name**, enter the _private DNS name_ that corresponds to the Datadog intake service that you want to use. You can find your DNS name in the [table of published services](#published-services).
6. Next, create an `A` record that points to the endpoint IP. On the _Zone details_ page of the zone you created, click on **Add record set**.
   {{< img src="agent/guide/psc/create-record-set.png" alt="GCP Private Service Connect schema" >}}

   - For **DNS name**, TK
   - For **Resource record type**, select `A`.
   - Under **IPv4 Address**, enter the IP address that was displayed in Step 3.

### Additional required steps for `agent.us5.datadoghq.com`

To set up DNS for `agent.us5.datadoghq.com`, additional steps are required. This is because
Datadog Agents submit telemetry using a versioned endpoint of the form `<VERSION>-app.agent.us5.com`. 

### Validation

To verify your configuration, SSH into one of your local nodes and run a `dig` command similar to the following:

```shell
> dig +noall +answer metrics.agent.us5.datadoghq.com
```

The response resembles:
```
metrics.agent.us5.datadoghq.com. 300 IN A        10.1.0.4
```

Ensure that the IP address in the response matches the one associated with your PSC target.

## Published services
| Datadog intake service | PSC target name | Private DNS name |
| ---------------------- | --------------- | ---------------- |
| Logs (Agent)           | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-agent-intake-psc` | `agent-http-intake.logs.us5.datadoghq.com` |
| Logs (User HTTP Intake) | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-intake-psc` | `http-intake.logs.us5.datadoghq.com` |
| API | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-api-psc` | `api.us5.datadoghq.com` |
| Metrics | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-metrics-agent-psc` | `metrics.agent.us5.datadoghq.com` |
| Containers | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-orchestrator-psc` | `orchestrator.us5.datadoghq.com` |
| Process | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-process-psc` | `process.us5.datadoghq.com` |
| Profiling | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-http-profile-psc` | `intake.profile.us5.datadoghq.com` |
| Traces | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-trace-edge-psc` | `trace.agent.us5.datadoghq.com` |



[1]: https://cloud.google.com/vpc/docs/private-service-connect
[2]: https://cloud.google.com/vpc/docs/private-service-connect#published-services
[3]: https://cloud.google.com/dns/docs/zones/zones-overview

{{% /site-region %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}