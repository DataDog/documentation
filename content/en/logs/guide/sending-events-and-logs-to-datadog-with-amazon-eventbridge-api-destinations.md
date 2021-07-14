---
title: Sending Events and Logs to Datadog with Amazon EventBridge API Destinations
kind: guide
further_reading:
- link: "https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog"
  tag: "Blog"
  text: "AWS Blog with example API destination use cases"
---

Amazon EventBridge is a serverless event bus that enables you to build event-driven applications. EventBridge can integrate with your AWS services, but the API destinations feature lets you push and pull data from outside of AWS using APIs. This guide gives steps for sending your events and logs from EventBridge to Datadog. For more information about pushing your events from Datadog to EventBridge, [see the EventBridge integration docs][1].

## Setup

Before you begin, you need a [Datadog account][2], with [an API key][3], and you need access to [Amazon Eventbridge API destinations][4].

### Configuration

1. Follow the steps in the [Amazon Create an API destination docs][5] to add Datadog as an API destination.
    - Use API key authorization, with `DD-API-KEY` as your key name and your [Datadog API key][3] as the value.
    - For your destination endpoint, use `https://http-intake.logs.datadoghq.com/v1/input` for logs or `https://api.datadoghq.com/api/v1/events` for events, and set `POST` as the HTTP method. For more information about the differences between logs and events, see the [logs section][6], and the [events section][7] of the [Categories of Data docs page][8].
2. Once you've set up the destination, you can now follow the Amazon instructions to [create an EventBridge rule][9], where you set Datadog as your destination.
3. Once you've set up the rule with Datadog as the destination, trigger an event by posting an event to EventBridge. For more information about pushing events to EventBridge from Datadog, see the [EventBridge integration docs][1]. For example, to trigger a test event by [uploading the objects to an S3 bucket][10] in your account, use this AWS CloudShell command:

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. Once events and logs are sending, after about five minutes, the data is available in the Datadog [logs console][11] or [events stream][12], depending on which endpoint you are sending them to.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[6]: /security/#logs
[7]: /security/#events-and-comments
[8]: /security/
[9]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[10]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[11]: https://app.datadoghq.com/logs
[12]: https://app.datadoghq.com/event/stream
