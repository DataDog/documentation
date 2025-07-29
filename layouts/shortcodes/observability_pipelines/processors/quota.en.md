The quota processor measures the logging traffic for logs that match the filter you specify. When the configured daily quota is met inside the 24-hour rolling window, the processor can either keep or drop additional logs, or send them to a storage bucket. For example, you can configure this processor to drop new logs or trigger an alert without dropping logs after the processor has received 10 million events from a certain service in the last 24 hours.

You can also use field-based partitioning, such as `service`, `env`, `status`. Each unique fields uses a separate quota bucket with its own daily quota limit. See [Partition example](#partition-example) for more information.

**Notes**:
- Each Worker can have up to 1000 buckets. If you need to increase the bucket limit, contact your account manager.
- The pipeline uses the name of the quota to identify the quota across multiple Remote Configuration deployments of the Worker.


To set up the quota processor:
1. Enter a name for the quota processor.
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are counted towards the daily limit.
    - Logs that match the quota filter and are within the daily quota are sent to the next step in the pipeline.
    - Logs that do not match the quota filter are sent to the next step of the pipeline.
1. In the **Unit for quota** dropdown menu, select if you want to measure the quota by the number of `Events` or by the `Volume` in bytes.
1. Set the daily quota limit and select the unit of magnitude for your desired quota.
1. Optional, Click **Add Field** if you want to set a quota on a specific service or region field.  
    a. Enter the field name you want to partition by. See the [Partition example](#partition-example) for more information.  
        i. Select the **Ignore when missing** if you want the quota applied only to events that match the partition. See the [Ignore when missing example](#example-for-the-ignore-when-missing-option) for more information.  
        ii. Optional: Click **Overrides** if you want to set different quotas for the partitioned field.  
        - Click **Download as CSV** for an example of how to structure the CSV.  
        - Drag and drop your overrides CSV to upload it. You can also click **Browse** to select the file to upload it. See the [Overrides example](#overrides-example) for more information.  
    b. Click **Add Field** if you want to add another partition.
1. In the **When quota is met** dropdown menu, select if you want to **drop events**, **keep events**, or **send events to overflow destination**, when the quota has been met.
    1. If you select **send events to overflow destination**, an overflow destination is added with the following cloud storage options: **Amazon S3**, **Azure Blob**, and **Google Cloud**.
    1. Select the cloud storage you want to send overflow logs to. See the setup instructions for your cloud storage: [Amazon S3][5002], [Azure Blob Storage][5003], or [Google Cloud Storage][5004].

#### Examples

##### Partition example

Use **Partition by** if you want to set a quota on a specific service or region. For example, if you want to set a quota for 10 events per day and group the events by the `service` field, enter `service` into the **Partition by** field.

##### Example for the "ignore when missing" option

Select **Ignore when missing** if you want the quota applied only to events that match the partition. For example, if the Worker receives the following set of events:

```
{"service":"a", "source":"foo", "message": "..."}
{"service":"b", "source":"bar", "message": "..."}
{"service":"b", "message": "..."}
{"source":"redis", "message": "..."}
{"message": "..."}
```

And the **Ignore when missing** is selected, then the Worker:
- creates a set for logs with `service:a` and `source:foo`
- creates a set for logs with `service:b` and `source:bar`
- ignores the last three events

The quota is applied to the two sets of logs and not to the last three events.

If the **Ignore when missing** is not selected, the quota is applied to all five events.

##### Overrides example

If you are partitioning by `service` and have two services: `a` and `b`, you can use overrides to apply different quotas for them. For example, if you want `service:a` to have a quota limit of 5,000 bytes and `service:b` to have a limit of 50 events, the override rules look like this:

| Service | Type   | Limit |
| ------- | ------ | ----- |
|  `a`    | Bytes  | 5,000 |
|  `b`    | Events | 50    |

[5001]: /monitors/types/metric/?tab=threshold
[5002]: /observability_pipelines/destinations/amazon_s3/
[5003]: /observability_pipelines/destinations/azure_storage/
[5004]: /observability_pipelines/destinations/google_cloud_storage/