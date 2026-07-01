---
title: Data Streams Monitoring for Azure Serverless
further_reading:
    - link: '/data_streams/manual_instrumentation/'
      tag: 'Documentation'
      text: 'Manual Instrumentation'
    - link: '/serverless/'
      tag: 'Documentation'
      text: 'Serverless Monitoring'
---

Data Streams Monitoring supports tracing event-driven pipelines where Azure Functions communicate through Azure Service Bus.

| | Azure Service Bus |
|---|---|
| .NET | Manual |

## Prerequisites

Install [serverless monitoring][2] on your Azure Functions.

| Language | Minimum library version |
|---|---|
| .NET | [`Datadog.Serverless.Compat` 1.6.0] |

## Setup

{{< tabs >}}
{{% tab ".NET" %}}

### Azure Service Bus

.NET Azure Functions automatically instrument Azure Service Bus when publishing a message. Set the following environment variables on your Azure Function to enable data streams monitoring. More details are available in the [Azure Service Bus documentation][3]:

```yaml
environment:
  DD_DATA_STREAMS_ENABLED: "true"
  DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
  AZURE_EXPERIMENTAL_ENABLE_ACTIVITY_SOURCE: "true"
  DD_TRACE_OTEL_ENABLED: "true"
```

If you are **consuming** a message from Azure Service Bus using Azure Functions you will need to manually extract the DSM context.

```dotnet
[Function("ServiceBusConsumeTest")]
public void Run([ServiceBusTrigger(ServiceBusConfiguration.QueueName, Connection = ServiceBusConfiguration.ConnectionName)] ServiceBusReceivedMessage message)
{
    // Reads dd-pathway-ctx-base64 from ApplicationProperties and registers the DSM consume checkpoint.
    _ = new SpanContextExtractor().ExtractIncludingDsm(message.ApplicationProperties,
        static (properties, key) =>
        {
            if (!properties.TryGetValue(key, out var value) || value is null)
            {
                return [];
            }

            return value switch
            {
                string s => [s],
                IEnumerable<string> values => values,
                _ => [value.ToString() ?? string.Empty]
            };
        },
        "servicebus",
        ServiceBusConfiguration.QueueName
    );

    _logger.LogInformation(
        "Consumed Service Bus message {MessageId} from {QueueName}",
        message.MessageId,
        ServiceBusConfiguration.QueueName);
}
```

[3]: /data_streams/setup/technologies/azure_service_bus/

{{% /tab %}}

{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_streams/manual_instrumentation/
[2]: /serverless/azure_functions/?tab=dotnet