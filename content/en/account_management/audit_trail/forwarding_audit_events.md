---
title: Forwarding Audit Events to Custom Destinations
description: Forward audit events from Datadog to custom destinations like Splunk, Elasticsearch, and HTTP endpoints for compliance and security monitoring.
disable_toc: false
further_reading:
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Learn more about Audit Trail"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Audit Event Forwarding is not available in the US1-FED site.
</div>
{{% /site-region %}}

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
<div class="alert alert-danger">
Audit Event Forwarding is in Preview.
</div>
{{% /site-region %}}

## Overview

Audit Event Forwarding allows you to send audit events from Datadog to custom destinations like Splunk, Elasticsearch, and HTTP endpoints. Audit events are forwarded in JSON format. You can add up to three destinations for each Datadog org.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="The Custom Destinations section showing an active Login-Event-to-SIEM destination with 10.4 MB of estimated audit events volume in the last 24 hours and @action:login as query to filter." >}}

**Note**: Only Datadog users with the `audit_trail_write` permission can create, edit, or delete custom destinations for forwarding audit events.

## Set up audit event forwarding to custom destinations

1. Add webhook IPs from the [IP ranges list][1] to the allowlist if necessary.
2. Navigate to [Audit Trail Settings][2].
3. Click **Add Destination** in the **Audit Event Forwarding** section.
4. Enter the query to filter your audit events for forwarding. For example, add `@action:login` as the query to filter if you only want to forward login events to your SIEM or custom destination. See [Search Syntax][3] for more information.
5. Select the **Destination Type**.

{{< tabs >}}
{{% tab "HTTP" %}}

6. Enter a name for the destination.
7. In the **Define endpoint** field, enter the endpoint to which you want to send the logs. The endpoint must start with `https://`.
    - For example, if you want to send logs to Sumo Logic, follow their [Configure HTTP Source for Logs and Metrics documentation][1] to get the HTTP Source Address URL to send data to their collector. Enter the HTTP Source Address URL in the **Define endpoint** field.
8. In the **Configure Authentication** section, select one of the following authentication types and provide the relevant details:
    - Basic Authentication: Provide the username and password for the account to which you want to send logs.
    - Request Header: Provide the header name and value. For example, if you use the Authorization header and the username for the account to which you want to send logs is `myaccount` and the password is `mypassword`:
        - Enter `Authorization` for the **Header Name**.
        - The header value is in the format of `Basic username:password`, where `username:password` is encoded in base64. For this example, the header value is `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`. 
  9. Click **Save**.

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. Enter a name for the destination.
7. In the **Configure Destination** section, enter the endpoint to which you want to send the logs. The endpoint must start with `https://`. For example, enter `https://<your_account>.splunkcloud.com:8088`. **Note**: `/services/collector/event` is automatically appended to the endpoint.
8. In the **Configure Authentication** section, enter the Splunk HEC token. See [Set up and use HTTP Event Collector][1] for more information about the Splunk HEC token.
9. Click **Save**.

**Note**: The [indexer acknowledgment][2] needs to be disabled.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. Enter a name for the destination.
7. In the **Configure Destination** section, enter the following details:

   a. The endpoint to which you want to send the logs. The endpoint must start with `https://`. An example endpoint for Elasticsearch: `https://<your_account>.us-central1.gcp.cloud.es.io`.

   b. The name of the destination index where you want to send the logs.
   
   c. Optionally, select the index rotation for how often you want to create a new index: `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, or `Every Month`. The default is `No Rotation`.

8. In the **Configure Authentication** section, enter the username and password for your Elasticsearch account.
9. Click **Save**.

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

<div class="alert alert-info">Log forwarding to Microsoft Sentinel is in Preview.</div>

6. Enter a name for the destination.
7. Authentication for the Microsoft Sentinel Forwarder requires configuring an App Registration through the Datadog Azure Integration.
8. In the **Configure Destination** section, enter the following details:
  | Setting                   | Description                                                                                                          | Example                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Logs Ingestion Endpoint** | Enter the endpoint on the Data Collection Endpoint (DCE) where logs are sent. This is labeled "Logs Ingestion" on the DCE Overview page. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| **Immutable ID**           | Specify the immutable ID of the Data Collection Rule (DCR) where logging routes are defined, as found on the DCR Overview page as "Immutable Id".  **Note**: Ensure the Monitoring Metrics Publisher role is assigned in the DCR IAM settings. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| **Stream Declaration Name**| Provide the name of the target Stream Declaration found in the Resource JSON of the DCR under `streamDeclarations`.  | `Custom-MyTable`                                          |

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /logs/explorer/search_syntax/
