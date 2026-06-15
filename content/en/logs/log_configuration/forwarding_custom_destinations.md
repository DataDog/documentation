---
title: Forwarding Logs to Custom Destinations
further_reading:
- link: "https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/"
  tag: "Blog"
  text: "Route logs to third-party systems with Datadog Log Forwarding"
- link: "/logs/log_collection"
  tag: "Documentation"
  text: "Start collecting your logs"
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Learn about log pipelines"
- link: "/observability_pipelines/"
  tag: "Documentation"
  text: "Forward logs directly from your environment with Observability Pipelines"
- link: "https://www.datadoghq.com/blog/microsoft-sentinel-logs/"
  tag: "Blog"
  text: "Centrally process and govern your logs in Datadog before sending them to Microsoft Sentinel"
- link: "/security/events_forwarding"
  tag: "Documentation"
  text: "Forward security signals, spans, and other event types to custom destinations"
---

## Overview

Log Forwarding allows you to send logs from Datadog to custom destinations like Splunk, Elasticsearch, and HTTP endpoints. This means that you can use [Log Pipelines][1] to centrally collect, process, and standardize your logs in Datadog. Then, send the logs from Datadog to other tools to support individual teams' workflows. You can choose to forward any of the ingested logs, whether or not they are indexed, to custom destinations. Logs are forwarded in JSON format and compressed with GZIP by default.

**Note**: Only Datadog users with the [`logs_write_forwarding_rules`][2] permission can [create][6], [edit][7], and [delete][8] custom destinations for forwarding logs.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="The Log Forwarding page, showing custom destinations highlighted. The list of destinations includes Splunk (filtered by service:logs-processing), HTTP Endpoint (filtered by source:okta OR source:paloalto), and Elasticsearch (filtered by team:acme env:prod)." >}}

If a forwarding attempt fails (for example: if your destination temporarily becomes unavailable), Datadog retries periodically for 2 hours using an exponential backoff strategy. The first attempt is made following a 1-minute delay. For subsequent retries, the delay increases progressively to a maximum of 8-12 minutes (10 minutes with 20% variance).

The following metrics report on logs that have been forwarded successfully, including logs that were sent successfully after retries, as well as logs that were dropped.

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## Set up log forwarding to custom destinations

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Sending logs to a custom destination is outside of the Datadog GovCloud environment, which is outside the control of Datadog. Datadog shall not be responsible for any logs that have left the Datadog GovCloud environment, including without limitation, any obligations or requirements that the user may have related to FedRAMP, DoD Impact Levels, ITAR, export compliance, data residency or similar regulations applicable to such logs.
<br><br>
Due to security protocols for the {{< region-param key="dd_datacenter" >}} site, only port 443 and 8088 are open for log forwarding. To use a different port, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a>.</div>
{{< /site-region >}}

1. Add webhook IPs from the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} to the allowlist.
1. Navigate to [Log Archiving & Forwarding][4].
3. Select {{< ui >}}Custom Destinations{{< /ui >}}.
4. Click {{< ui >}}New Destination{{< /ui >}}.
5. Enter the query to filter your logs for forwarding. See [Search Syntax][5] for more information.
6. Select the {{< ui >}}Destination Type{{< /ui >}}.

{{< img src="logs/log_configuration/forwarding/log-forwarding-gzip-opt-out.png" alt="The destination configuration page, showing the steps to set up a new destination." style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

7. Enter a name for the destination.
8. In the {{< ui >}}Define endpoint{{< /ui >}} field, enter the endpoint to which you want to send the logs. The endpoint must start with `https://`.
    - For example, if you want to send logs to Sumo Logic, follow their [Configure HTTP Source for Logs and Metrics documentation][1] to get the HTTP Source Address URL to send data to their collector. Enter the HTTP Source Address URL in the {{< ui >}}Define endpoint{{< /ui >}} field.
9. (Optional) Disable GZIP compression if your HTTP endpoint does not support compressed payloads.
10. In the {{< ui >}}Configure Authentication{{< /ui >}} section, select one of the following authentication types and provide the relevant details:
  | Authentication Type      | Description                                                                                                              | Example                                                             |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| {{< ui >}}Basic Authentication{{< /ui >}} | Provide the username and password for the account to which you want to send logs.                                        | Username: `myaccount`<br>Password: `mypassword`                       |
| {{< ui >}}Request Header{{< /ui >}}       | Provide the header name and value. Example for Authorization:<br>- Enter `Authorization` for {{< ui >}}Header Name{{< /ui >}}.<br>- Use a header value formatted as `Basic username:password`, encoded in base64. | Header Name: `Authorization`<br>Header Value: `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` |

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

7. Enter a name for the destination.
8. In the {{< ui >}}Configure Destination{{< /ui >}} section, enter the endpoint to which you want to send the logs. The endpoint must start with `https://`. For example, enter `https://<your_account>.splunkcloud.com:8088`.  
    **Note**: `/services/collector/event` is automatically appended to the endpoint.
9. In the {{< ui >}}Configure Authentication{{< /ui >}} section, enter the Splunk HEC token. See [Set up and use HTTP Event Collector][1] for more information about the Splunk HEC token.  
    **Note**: The [indexer acknowledgment][2] needs to be disabled.
10. (Optional) In the {{< ui >}}Configure Sourcetype{{< /ui >}} section, specify the Splunk sourcetype to assign to the forwarded events. See [Why Sourcetype matters][3] for more information about the Splunk Sourcetype. If left unset, the default sourcetype `_json` is used. To send events without any sourcetype, select **Send without sourcetype**.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
[3]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/10.4/configure-source-types/why-source-types-matter
{{% /tab %}}

{{% tab "Elasticsearch" %}}

7. Enter a name for the destination.
8. In the {{< ui >}}Configure Destination{{< /ui >}} section, enter the following details:
  | Setting                        | Description                                                                                                  | Example                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------|
| {{< ui >}}Endpoint{{< /ui >}}                   | Enter the endpoint to which you want to send the logs. The endpoint must start with `https://`.               | `https://<your_account>.us-central1.gcp.cloud.es.io` (Elasticsearch) |
| {{< ui >}}Destination Index Name{{< /ui >}}     | Specify the name of the destination index where you want to send the logs.                                   | `your_index_name`                        |
| {{< ui >}}Index Rotation{{< /ui >}}             | Optionally, select how often to create a new index: `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, `Every Month`. The default is `No Rotation`. | `Every Day`                              |
9. In the {{< ui >}}Configure Authentication{{< /ui >}} section, enter the username and password for your Elasticsearch account.

{{% /tab %}}

{{% tab "Microsoft Sentinel" %}}

7. Enter a name for the destination.
8. Authentication for the Microsoft Sentinel Forwarder requires configuring an App Registration through the Datadog Azure Integration.
9. In the {{< ui >}}Configure Destination{{< /ui >}} section, enter the following details:
  | Setting                   | Description                                                                                                          | Example                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | Enter the endpoint on the Data Collection Endpoint (DCE) where logs are sent. This is labeled "Logs Ingestion" on the DCE Overview page. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | Specify the immutable ID of the Data Collection Rule (DCR) where logging routes are defined, as found on the DCR Overview page as "Immutable Id".  **Note**: Ensure the Monitoring Metrics Publisher role is assigned in the DCR IAM settings. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| Provide the name of the target Stream Declaration found in the Resource JSON of the DCR under `streamDeclarations`.  | `Custom-MyTable`                                          |

{{% /tab %}}

{{% tab "Google SecOps (Chronicle)" %}}

7. Enter a name for the destination.
8. Authentication for the Google Chronicle Forwarder requires using a GCP Service Account with Chronicle write access.
9. In the {{< ui >}}Configure Destination{{< /ui >}} section, enter the following details:
  | Setting                   | Description                                                                                                          | Example                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Customer ID{{< /ui >}} | The Chronicle customer ID provided by Google. | `abcd1234`   |
| {{< ui >}}Regional Endpoint{{< /ui >}}           | The Chronicle ingestion API endpoint URL based on your region.  **Note**: Ensure the Monitoring Metrics Publisher role is assigned in the DCR IAM settings. | `https://us.chronicle.googleapis.com`              |
| {{< ui >}}Namespace{{< /ui >}}| The namespace in which your Chronicle logs should be ingested.  | `default`                                          |

10. In the {{< ui >}}Configure authentication settings{{< /ui >}} section, enter the following details:
  | Setting                   | Description                                                                                                          | Example                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Project ID{{< /ui >}}| The GCP project ID associated with the Chronicle instance.  | `my-gcp-chronicle-project`                                          |
| {{< ui >}}Private Key ID{{< /ui >}}| The ID of the private key from your service account credentials.  | `0123456789abcdef`                                          |
| {{< ui >}}Private Key{{< /ui >}}| The private key from your service account credentials.  | `-----BEGIN PRIVATE KEY-----\nMIIE...`                                          |
| {{< ui >}}Client Email{{< /ui >}}| The email address of the service account.  | `chronicle-writer@my-gcp-chronicle-project.iam.gserviceaccount.com`                                          |
| {{< ui >}}Client ID{{< /ui >}}| The client ID from your service account credentials.  | `123456789012345678901`                                          |

{{% /tab %}}

{{< /tabs >}}

10. In the {{< ui >}}Select Tags to Forward{{< /ui >}} section:
    1. Select whether you want {{< ui >}}All tags{{< /ui >}}, {{< ui >}}No tags{{< /ui >}}, or {{< ui >}}Specific Tags{{< /ui >}} to be included.
    1. Select whether you want to {{< ui >}}Include{{< /ui >}} or {{< ui >}}Exclude specific tags{{< /ui >}}, and specify which tags to include or exclude.
11. Click {{< ui >}}Save{{< /ui >}}.


On the [Log Forwarding][4] page, hover over the status for a destination to see the percentage of logs that matched the filter criteria and have been forwarded in the past hour.

## Edit a destination
1. Navigate to [Log Forwarding][4].
2. Select {{< ui >}}Custom Destinations{{< /ui >}} to view a list of all existing destinations.
3. Click the {{< ui >}}Edit{{< /ui >}} button for the destination you want to edit.
4. Make the changes on the configuration page.
5. Click {{< ui >}}Save{{< /ui >}}.

## Delete a destination
1. Navigate to [Log Forwarding][4].
2. Select {{< ui >}}Custom Destinations{{< /ui >}} to view a list of all existing destinations.
3. Click the {{< ui >}}Delete{{< /ui >}} button for the destination that you want to delete, and click {{< ui >}}Confirm{{< /ui >}}. This removes the destination from the configured list of destinations and logs are no longer forwarded to it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/pipelines/
[2]: /account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /logs/explorer/search_syntax/
[6]: /logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /logs/log_configuration/forwarding_custom_destinations#delete-a-destination
[9]: /security/events_forwarding/
