---
title: Forwarding Logs to Custom Destinations
kind: documentation
is_beta: true
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
---

<div class="alert alert-warning">
Log forwarding is in limited availability. Fill out this <a href="https://www.datadoghq.com/log-forwarding-limited-availability/">form</a> to request access.
</div>

## Overview

Log Forwarding allows you to send logs from Datadog to custom destinations like Splunk, Elasticsearch, and HTTP endpoints. This means that you can use [Log Pipelines][1] to centrally collect, process, and standardize your logs in Datadog. Then, send the logs from Datadog to other tools to support individual teams' workflows. You can choose to forward any of the ingested logs, whether or not they are indexed, to custom destinations. Logs are forwarded in JSON format and compressed with GZIP.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="The Log Forwarding page, showing custom destinations highlighted. The list of destinations includes Splunk (filtered by service:logs-processing), HTTP Endpoint (filtered by source:okta OR source:paloalto), and Elasticsearch (filtered by team:acme env:prod)." >}}

**Note**: Only Datadog users with the [`logs_write_forwarding_rules`][2] permission can create, edit, or delete custom destinations for forwarding logs.

## Set up log forwarding to custom destinations

1. Navigate to [Log Forwarding][3]. Alternatively, go to **Logs** > **Configuration** and click the **Log Forwarding** tab.
2. Select **Custom Destinations**.
3. Click **New Destination**.
4. Enter the query to filter your logs for forwarding. See [Search Syntax][4] for more information.
5. Select the **Destination Type**.

{{< img src="logs/log_configuration/forwarding/configuration.png" alt="The destination configuration page, showing the steps to set up a new destination." style="width:70%;">}}

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
7. In the **Configure Destination** section, enter the endpoint to which you want to send the logs. The endpoint must start with `https://`. For example, `https://<your_account>.splunkcloud.com:8088`.
8. In the **Configure Authentication** section, enter the Splunk HEC token. See [Set up and use HTTP Event Collector][1] for more information about the Splunk HEC token.
9. Click **Save**.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
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
{{< /tabs >}}

On the [Log Forwarding][3] page, hover over the status for a destination to see the percentage of logs that matched the filter criteria and have been forwarded in the past hour.

## Edit a destination
1. Navigate to [Log Forwarding][3].
2. Select **Custom Destinations** to view a list of all existing destinations.
3. Click the **Edit** button for the destination you want to edit. 
4. Make the changes on the configuration page.
5. Click **Save**.

## Delete a destination
1. Navigate to [Log Forwarding][3].
2. Select **Custom Destinations** to view a list of all existing destinations.
3. Click the **Delete** button for the destination that you want to delete, and click **Confirm**. This removes the destination from the configured list of destinations and logs are no longer forwarded to it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/pipelines/
[2]: /account_management/rbac/permissions/?tab=ui#log-management
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[4]: /logs/explorer/search_syntax/
