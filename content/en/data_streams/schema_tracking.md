---
title: Schema Tracking
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

<div class="alert alert-info">Schema tracking is in <b>beta</b> for Java services using Protobuf and Avro.</div>

Data Streams Monitoring provides visibility into schemas used by producers and consumers, and how schema issues impact downstream services. You can track new schemas added, schemas with errors, and schema evolutions to manage schema migrations and identify issues.

Changing a schema produced by a service without updating the consumer can lead to the consumer struggling to process payloads, blocking further data flow downstream. Understanding schema changes ensures data compatibility between producers and consumers, and ultimately prevents issues.

## Prerequisites

You must have [Data Streams Monitoring installed][1] on your Java producer and consumer services.

Schema tracking requires a recent version of [dd-trace-java][2]:
- For Protobuf tracking: use tracer v1.34.0+
- For Avro tracking: use tracer v1.36.0+

## View schemas

### Schema list

In the [schema list][3], you can view all schemas used across your pipelines. 

{{< img src="data_streams/schema_list.png" alt="List view of three schemas" style="width:100%;" >}}

For each schema, the table shows the following:
- Type
- Name
- First and last seen
- Produce rate, consume rate, and error rate in the selected time frame
- All producers and consumers of the schema
- Consumer lag: the max Kafka lag for all consumers of a specific schema

Selecting a schema from the list displays the throughput of the schema by service, errors by service, and the full schema.

{{< img src="data_streams/schema_panel.png" alt="Schema list view with an open side panel showing detailed information about one schema" style="width:100%;" >}}

Use the following steps to view detailed information about a schema:
1. Navigate to [Data Streams Monitoring][4].
1. Click the **Schemas** tab.
1. Select the time frame.
1. Use the quick filters to filter for new schemas (first seen within the last 3 hours), schemas with high error rates, or active schemas.
1. Select a schema. A side panel opens with detailed information for that schema.

### At the service level

For each service you track in Data Streams Monitoring, you can see information about the schemas that it uses.

To view schema information at the service level:
1. Navigate to [Data Streams Monitoring][4].
1. Ensure the **Explore** tab is selected.
1. Click on a service. The service detail side panel appears.
1. Select the **Schemas** tab.

On the schemas tab, you can:
- View input throughput by schema.
- View a list of all schemas detected within the selected time frame, along with when it was first and last seen, its type (input or output schema), error rate, and throughput.
- Expand a schema to view all of its fields.

[1]: /data_streams/java/
[2]: https://github.com/DataDog/dd-trace-java
[3]: https://app.datadoghq.com/data-streams/schemas
[4]: https://app.datadoghq.com/data-streams/
