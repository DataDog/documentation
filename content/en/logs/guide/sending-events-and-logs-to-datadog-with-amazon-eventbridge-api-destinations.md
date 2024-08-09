---
title: Sending Events and Logs to Datadog with Amazon EventBridge API Destinations

further_reading:
- link: "https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog"
  tag: "Blog"
  text: "AWS Blog with example API destination use cases"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog for Government site does not support Amazon EventBridge.</div>
{{< /site-region >}}

Amazon EventBridge is a serverless event bus that enables you to build event-driven applications. EventBridge can integrate with your AWS services, but the API destinations feature lets you push and pull data from outside of AWS using APIs. This guide gives steps for sending your events and logs from EventBridge to Datadog. For more information about pushing your events from Datadog to EventBridge, [see the EventBridge integration docs][1].

## Setup

Before you begin, you need a [Datadog account][2], with [an API key][3], and you need access to [Amazon Eventbridge API destinations][4].

### Configuration

1. Follow the steps in the [Amazon Create an API destination docs][5] to add Datadog as an API destination.
    - Use API key authorization, with `DD-API-KEY` as your key name and your [Datadog API key][3] as the value.
    - For your destination endpoint, use `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs` for logs and `https://api.{{< region-param key="dd_site" code="true" >}}/api/v1/events` for events, and set `POST` as the HTTP method. For more information about the differences between logs and events, see [Reducing Data Related Risks][8].
    - If you are utilizing the events endpoint, you need to include a `title` and `text` as `body.field` parameters in the API Destination connection. These are required values to `POST` to the events endpoint. For more information, see the [Post an event documentation][9].
2. Once you have set up the destination, see the Amazon documentation to [create an EventBridge rule][10], where you set Datadog as your destination.
3. Once you have set up the rule with Datadog as the destination, trigger an event by posting an event to EventBridge. For more information about pushing events to EventBridge from Datadog, see the [EventBridge integration documentation][1]. For example, to trigger a test event by [uploading the objects to an S3 bucket][11] in your account, use this AWS CloudShell command:

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. Once events and logs are sending, after about five minutes, the data is available in the Datadog [Logs Console][12] or [Events Explorer][13], depending on which endpoint you are sending them to.

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
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[8]: /data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/
