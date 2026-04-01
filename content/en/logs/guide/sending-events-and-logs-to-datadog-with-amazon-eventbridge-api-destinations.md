---
title: Sending Events and Logs to Datadog with Amazon EventBridge API Destinations

further_reading:
- link: "https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog"
  tag: "Blog"
  text: "AWS Blog with example API destination use cases"
- link: "/logs/guide/reduce_data_transfer_fees"
  tag: "Guide"
  text: "How to send logs to Datadog while reducing data transfer fees"
site_support_id: amazon_event_bridge
---

Amazon EventBridge is a serverless event bus that enables you to build event-driven applications. EventBridge can integrate with your AWS services, but the API destinations feature lets you push and pull data from outside of AWS using APIs. This guide gives steps for sending your events and logs from EventBridge to Datadog. For more information about pushing your events from Datadog to EventBridge, [see the EventBridge integration docs][1].

## Setup

Before you begin, you need a [Datadog account][2], with [an API key][3], and you need access to [Amazon Eventbridge API destinations][4].

### Configuration

Ensure you have the correct Datadog Site selected before proceeding with the below steps.

{{% site-region region="us" %}}

{{% collapse-content title="To Send Logs:" level="h4" %}}
1. Follow the steps in the [Amazon Create an API destination doc][5] to add Datadog as an API destination.

a) Set the **API destination endpoint** as `https://{{% region-param key="http_endpoint" code="true" %}}/api/v2/logs`.

b) Set the **HTTP method** as `POST`.

{{< img src="integrations/amazon_event_bridge/eventbridge_logs_api_destination.png" alt="Your image description" style="width:100%;" >}}

c) Choose **Create a new connection**.

{{< img src="integrations/amazon_event_bridge/eventbridge_logs_new_connection.png" alt="Your image description" style="width:100%;" >}}

d) For **Authorization type**, choose **API key**. Set the key name to `DD-API-KEY` and set your [Datadog API key][3] as the value.

{{< img src="integrations/amazon_event_bridge/eventbridge_auth.png" alt="Your image description" style="width:100%;" >}}

2. Once you have set up the API destination, see the Amazon documentation to [create an EventBridge rule][10], where you set Datadog as your destination.

a) Under Select target(s) > Target 1 > Target Types, choose **Eventbridge API destination**.

b) For API Destination, select **Use an existing API destination**.
Choose the API Destination created in Step 1.

{{< img src="integrations/amazon_event_bridge/eventbridge_logs_rule_target.png" alt="Your image description" style="width:100%;" >}}

3. When logs are created that match the EventBridge rule, they will be sent via the API destination to Datadog. 

4. ~5 minutes after logs are sending, the data is available in the Datadog [Logs Console][12].

[1]: /integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-create.html 
[8]: /data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/
[16]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_EventBus.html
[17]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/monitoring-events.html#monitoring-events-sso
{{% /collapse-content %}} 
{{% collapse-content title="To Send Events:" level="h4" %}}
1. Follow the steps in the [Amazon Create an API destination doc][5] to add Datadog as an API destination.

a) Set the **API Destination endpoint** as `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/events`.

b) Set the **HTTP method** as `POST`.

{{< img src="integrations/amazon_event_bridge/eventbridge_events_api_destination.png" alt="Your image description" style="width:100%;" >}}

c) Choose **Create a new connection**.

{{< img src="integrations/amazon_event_bridge/eventbridge_events_new_connection.png" alt="Your image description" style="width:100%;" >}}

d) For **Authorization type**, choose **API key**. Set the key name to `DD-API-KEY` and set your [Datadog API key][3] as the value.

{{< img src="integrations/amazon_event_bridge/eventbridge_auth.png" alt="Your image description" style="width:100%;" >}}

2. Once you have set up the destination, see the Amazon documentation to [create an EventBridge rule][10], where you set Datadog as your destination.

a) Under Select target(s) > Target 1 > Target Types, choose **Eventbridge API destination**.

b) For API Destination, select **Use an existing API destination**.
Choose the API Destination created in Step 1.

{{< img src="integrations/amazon_event_bridge/eventbridge_events_rule_target.png" alt="Your image description" style="width:100%;" >}}


3. Once you have set up the rule with Datadog as the destination, trigger an event by posting an event to EventBridge. For more information about pushing events to EventBridge from Datadog, see the [EventBridge integration documentation][1]. For example, to trigger a test event by [uploading the objects to an S3 bucket][11] in your account, use this AWS CloudShell command:

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. ~5 minutes after events are sending, the data is available in the Datadog [Events Explorer][13].

[1]: /integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-create.html 
[8]: /data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/
[16]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_EventBus.html
[17]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/monitoring-events.html#monitoring-events-sso

{{% /collapse-content %}} 

- For more information about the differences between logs and events, see [Reducing Data Related Risks][8].

[8]: /data_security/#other-sources-of-potentially-sensitive-data/

{{% /site-region %}}

{{% site-region region="us3" %}}
{{% collapse-content title="To Send Logs:" level="h4" %}}
1. Follow the steps in the [Amazon Create an API destination doc][5] to add Datadog as an API destination.

a) Set the **API destination endpoint** as `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs`.

b) Set the **HTTP method** as `POST`.

{{< img src="integrations/amazon_event_bridge/eventbridge_us3_logs_api_destination.png" alt="Your image description" style="width:100%;" >}}

c) Choose **Create a new connection**.

{{< img src="integrations/amazon_event_bridge/eventbridge_logs_new_connection.png" alt="Your image description" style="width:100%;" >}}


d) For **Authorization type**, choose **API key**. Set the key name to `DD-API-KEY` and set your [Datadog API key][3] as the value.

{{< img src="integrations/amazon_event_bridge/eventbridge_auth.png" alt="Your image description" style="width:100%;" >}}

2. Once you have set up the API destination, see the Amazon documentation to [create an EventBridge rule][10], where you set Datadog as your destination.

a) Under Select target(s) > Target 1 > Target Types, choose **Eventbridge API destination**.

b) For API Destination, select **Use an existing API destination**.
Choose the API Destination created in Step 1.

{{< img src="integrations/amazon_event_bridge/eventbridge_us3_logs_rule_target.png" alt="Your image description" style="width:100%;" >}}

3. When logs are created that match the EventBridge rule, they are sent via the API destination to Datadog. 

4. ~5 minutes after logs are sending, the data is available in the Datadog [Logs Console][12].

[1]: /integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-create.html 
[8]: /data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/
[16]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_EventBus.html
[17]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/monitoring-events.html#monitoring-events-sso
{{% /collapse-content %}} 
{{% collapse-content title="To Send Events:" level="h4" %}}
1. Follow the steps in the [Amazon Create an API destination doc][5] to add Datadog as an API destination.

a) Set the **API Destination endpoint** as `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/events`.

b) Set the **HTTP method** as `POST`.

{{< img src="integrations/amazon_event_bridge/eventbridge_us3_events_api_destination.png" alt="Your image description" style="width:100%;" >}}

c) Choose **Create a new connection**.

{{< img src="integrations/amazon_event_bridge/eventbridge_events_new_connection.png" alt="Your image description" style="width:100%;" >}}

d) For **Authorization type**, choose **API key**. Set the key name to `DD-API-KEY` and set your [Datadog API key][3] as the value.

{{< img src="integrations/amazon_event_bridge/eventbridge_auth.png" alt="Your image description" style="width:100%;" >}}

2. Once you have set up the destination, see the Amazon documentation to [create an EventBridge rule][10], where you set Datadog as your destination.

a) Under Select target(s) > Target 1 > Target Types, choose **Eventbridge API destination**.

b) For API Destination, select **Use an existing API destination**.
Choose the API Destination created in Step 1.

{{< img src="integrations/amazon_event_bridge/eventbridge_events_rule_target.png" alt="Your image description" style="width:100%;" >}}


3. Once you have set up the rule with Datadog as the destination, trigger an event by posting an event to EventBridge. For more information about pushing events to EventBridge from Datadog, see the [EventBridge integration documentation][1]. For example, to trigger a test event by [uploading the objects to an S3 bucket][11] in your account, use this AWS CloudShell command:

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. ~5 minutes after events are sending, the data is available in the Datadog [Events Explorer][13].

[1]: /integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-create.html 
[8]: /data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/
[16]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_EventBus.html
[17]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/monitoring-events.html#monitoring-events-sso

{{% /collapse-content %}} 

- For more information about the differences between logs and events, see [Reducing Data Related Risks][8].

[8]: /data_security/#other-sources-of-potentially-sensitive-data/

{{% /site-region %}}

## Troubleshooting

To see more details about the payloads sent to Datadog and to view the response of the API endpoints, set up an Amazon SQS queue:  
1. Create a queue in [Amazon SQS][14].
2. Go to the [EventBridge rule][15] that you created in the [Configuration](#configuration) section.
3. Select the **Targets** tab and click **Edit**.
4. Expand the **Additional settings** section. 
4. In the *Dead-letter queue* section, choose **Select an Amazon SQS queue in the current AWS account to use as the dead-letter queue**.
5. Select the SQS queue that you just created.
6. Update the rule.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-create.html 
[8]: /data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/
[16]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_EventBus.html
[17]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/monitoring-events.html#monitoring-events-sso