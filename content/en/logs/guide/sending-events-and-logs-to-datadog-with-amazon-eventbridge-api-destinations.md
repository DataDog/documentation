---
title: Sending Events and Logs to Datadog with Amazon EventBridge API Destinations
kind: guide
further_reading:
- link: "https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog"
  tag: "Blog"
  text: "AWS Blog with example API destination use cases"
---

Amazon EventBridge is a serverless event bus that enables you to build event-driven applications. EventBridge can integrate with your AWS services, but the API destinations feature lets you push and pull data from outside of AWS using APIs. This guide gives steps for sending your events and logs from EventBridge to Datadog. You can configure EventBridge to send events or logs.

## Setup

Before you begin, you need a [Datadog account][1], with [an API key][2], and you need access to [Amazon Eventbridge API destinations][3].

### Configuration

1. Follow the steps in the [Amazon Create an API destination docs][4] to add Datadog as an API destination.
    - Use API key Authorization, with `DD-API-KEY` as your key name and your [Datadog API key][2] as the value.
    - For your destination endpoint, input `https://http-intake.logs.datadoghq.com/v1/input` for logs or `https://api.datadoghq.com/api/v1/events` for events, and set `POST` as the HTTP method. For more information about the differences between logs and events, see the [logs section][5], and the [events section][6] of the [Categories of Data docs page][7].
2. Once you've set up the destination, you can now follow the Amazon instructions to [create an EventBridge rule][8], where you set Datadog as your destination.
3. Once you've set up the rule with Datadog as the destination, [upload the objects to an S3 bucket][9] in your account to trigger an event. To trigger a test event, use this AWS CloudShell cmd:

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. Once events and logs are sending, after about five minutes, you will start seeing the data in the Datadog [logs console][10] or [events stream][11], depending on which endpoint you are sending them.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /account_management/api-app-keys/#api-keys
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[5]: /security/#logs
[6]: /security/#events-and-comments
[7]: /security/
[8]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[9]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[10]: https://app.datadoghq.com/logs
[11]: https://app.datadoghq.com/event/stream
