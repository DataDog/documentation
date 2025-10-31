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
---

## Overview

Log Forwarding allows you to send logs from Datadog to custom destinations like Splunk, Elasticsearch, and HTTP endpoints. This means that you can use [Log Pipelines][1] to centrally collect, process, and standardize your logs in Datadog. Then, send the logs from Datadog to other tools to support individual teams' workflows. You can choose to forward any of the ingested logs, whether or not they are indexed, to custom destinations. Logs are forwarded in JSON format and compressed with GZIP.

**Note**: Only Datadog users with the [`logs_write_forwarding_rules`][2] permission can [create][6], [edit][7], and [delete][8] custom destinations for forwarding logs.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="The Log Forwarding page, showing custom destinations highlighted. The list of destinations includes Splunk (filtered by service:logs-processing), HTTP Endpoint (filtered by source:okta OR source:paloalto), and Elasticsearch (filtered by team:acme env:prod)." >}}

If a forwarding attempt fails (for example: if your destination temporarily becomes unavailable), Datadog retries periodically for 2 hours using an exponential backoff strategy. The first attempt is made following a 1-minute delay. For subsequent retries, the delay increases progressively to a maximum of 8-12 minutes (10 minutes with 20% variance).

The following metrics report on logs that have been forwarded successfully, including logs that were sent successfully after retries, as well as logs that were dropped.

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## Set up log forwarding to custom destinations

{{< site-region region="gov" >}}
<div class="alert alert-danger">Sending logs to a custom destination is outside of the Datadog GovCloud environment, which is outside the control of Datadog. Datadog shall not be responsible for any logs that have left the Datadog GovCloud environment, including without limitation, any obligations or requirements that the user may have related to FedRAMP, DoD Impact Levels, ITAR, export compliance, data residency or similar regulations applicable to such logs.</div>
{{< /site-region >}}

1. Add webhook IPs from the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} to the allowlist.
1. Navigate to [Log Archiving & Forwarding][4].
3. Select **Custom Destinations**.
4. Click **New Destination**.
5. Enter the query to filter your logs for forwarding. See [Search Syntax][5] for more information.
6. Select the **Destination Type**.

{{< img src="logs/log_configuration/forwarding/log-forwarding-tag-sentinel.png" alt="The destination configuration page, showing the steps to set up a new destination." style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

7. Enter a name for the destination.
8. In the **Define endpoint** field, enter the endpoint to which you want to send the logs. The endpoint must start with `https://`.
    - For example, if you want to send logs to Sumo Logic, follow their [Configure HTTP Source for Logs and Metrics documentation][1] to get the HTTP Source Address URL to send data to their collector. Enter the HTTP Source Address URL in the **Define endpoint** field.
9. In the **Configure Authentication** section, select one of the following authentication types and provide the relevant details:
  | Authentication Type      | Description                                                                                                              | Example                                                             |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| **Basic Authentication** | Provide the username and password for the account to which you want to send logs.                                        | Username: `myaccount`<br>Password: `mypassword`                       |
| **Request Header**       | Provide the header name and value. Example for Authorization:<br>- Enter `Authorization` for **Header Name**.<br>- Use a header value formatted as `Basic username:password`, encoded in base64. | Header Name: `Authorization`<br>Header Value: `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` |

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

7. Enter a name for the destination.
8. In the **Configure Destination** section, enter the endpoint to which you want to send the logs. The endpoint must start with `https://`. For example, enter `https://<your_account>.splunkcloud.com:8088`.  
    **Note**: `/services/collector/event` is automatically appended to the endpoint.
9. In the **Configure Authentication** section, enter the Splunk HEC token. See [Set up and use HTTP Event Collector][1] for more information about the Splunk HEC token.  
    **Note**: The [indexer acknowledgment][2] needs to be disabled.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

7. Enter a name for the destination.
8. In the **Configure Destination** section, enter the following details:
  | Setting                        | Description                                                                                                  | Example                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------|
| **Endpoint**                   | Enter the endpoint to which you want to send the logs. The endpoint must start with `https://`.               | `https://<your_account>.us-central1.gcp.cloud.es.io` (Elasticsearch) |
| **Destination Index Name**     | Specify the name of the destination index where you want to send the logs.                                   | `your_index_name`                        |
| **Index Rotation**             | Optionally, select how often to create a new index: `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, `Every Month`. The default is `No Rotation`. | `Every Day`                              |
9. In the **Configure Authentication** section, enter the username and password for your Elasticsearch account.

{{% /tab %}}

{{% tab "Microsoft Sentinel" %}}

7. Enter a name for the destination.
8. Authentication for the Microsoft Sentinel Forwarder requires configuring an App Registration through the Datadog Azure Integration.
9. In the **Configure Destination** section, enter the following details:
  | Setting                   | Description                                                                                                          | Example                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Logs Ingestion Endpoint** | Enter the endpoint on the Data Collection Endpoint (DCE) where logs are sent. This is labeled "Logs Ingestion" on the DCE Overview page. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| **Immutable ID**           | Specify the immutable ID of the Data Collection Rule (DCR) where logging routes are defined, as found on the DCR Overview page as "Immutable Id".  **Note**: Ensure the Monitoring Metrics Publisher role is assigned in the DCR IAM settings. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| **Stream Declaration Name**| Provide the name of the target Stream Declaration found in the Resource JSON of the DCR under `streamDeclarations`.  | `Custom-MyTable`                                          |

{{% /tab %}}

{{% tab "Google SecOps (Chronicle)" %}}

<div class="alert alert-info">
<b>Preview available</b>: You can send logs to Google SecOps (Chronicle) from Datadog  <a href="https://www.datadoghq.com/product-preview/log-forwarding-to-google-chronicle/">Register for the Preview</a>.
</div>

7. Enter a name for the destination.
8. Authentication for the Google Chronicle Forwarder requires using a GCP Service Account with Chronicle write access.
9. In the **Configure Destination** section, enter the following details:
  | Setting                   | Description                                                                                                          | Example                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Customer ID** | The Chronicle customer ID provided by Google. | `abcd1234`   |
| **Regional Endpoint**           | The Chronicle ingestion API endpoint URL based on your region.  **Note**: Ensure the Monitoring Metrics Publisher role is assigned in the DCR IAM settings. | `https://us.chronicle.googleapis.com`              |
| **Namespace**| The namespace in which your Chronicle logs should be ingested.  | `default`                                          |

10. In the **Configure authentication settings** section, enter the following details:
  | Setting                   | Description                                                                                                          | Example                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Project ID**| The GCP project ID associated with the Chronicle instance.  | `my-gcp-chronicle-project`                                          |
| **Private Key ID**| The ID of the private key from your service account credentials.  | `0123456789abcdef`                                          |
| **Private Key**| The private key from your service account credentials.  | `-----BEGIN PRIVATE KEY-----\nMIIE...`                                          |
| **Client Email**| The email address of the service account.  | `chronicle-writer@my-gcp-chronicle-project.iam.gserviceaccount.com`                                          |
| **Client ID**| The client ID from your service account credentials.  | `123456789012345678901`                                          |

{{% /tab %}}

{{< /tabs >}}

10. In the **Select Tags to Forward** section:
  a. Select whether you want **All tags**, **No tags**, or **Specific Tags** to be included.
  b. Select whether you want to **Include** or **Exclude specific tags**, and specify which tags to include or exclude.
11. Click **Save**.


On the [Log Forwarding][4] page, hover over the status for a destination to see the percentage of logs that matched the filter criteria and have been forwarded in the past hour.

## Edit a destination
1. Navigate to [Log Forwarding][4].
2. Select **Custom Destinations** to view a list of all existing destinations.
3. Click the **Edit** button for the destination you want to edit.
4. Make the changes on the configuration page.
5. Click **Save**.

## Delete a destination
1. Navigate to [Log Forwarding][4].
2. Select **Custom Destinations** to view a list of all existing destinations.
3. Click the **Delete** button for the destination that you want to delete, and click **Confirm**. This removes the destination from the configured list of destinations and logs are no longer forwarded to it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/pipelines/
[2]: /account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /logs/explorer/search_syntax/
[6]: /logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /logs/log_configuration/forwarding_custom_destinations#delete-a-destination
