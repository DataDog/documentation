---
title: Azure Container Apps
kind: documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/azure-container-apps/'
      tag: 'Blog'
      text: 'Collect traces, logs, and custom metrics from GCR services'
---

## Overview
Azure Container Apps is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Container Apps through the [Azure integration][1]. Datadog also provides a solution, now in alpha, for instrumenting your Container Apps applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

  <div class="alert alert-warning">This feature is in alpha. You can provide feedback through your standard support channels. During the alpha period, Container Apps monitoring and APM tracing are available without a direct cost. Existing APM customers may incur increased span ingestion and volume costs. </div>

## Tracing and custom metrics
### Build your container

If you are using a Dockerfile to build your application, complete the following:

1. Copy the [Datadog `serverless-init` binary][2] into your Docker image.

2. Use the ENTRYPOINT instruction to run the `serverless-init` binary as your Docker container is initiated.

3. Use the CMD instruction to run your existing application and other required commands as arguments.

The following are examples of how to complete these three steps. You may need to adjust these examples depending on your existing Dockerfile setup.


{{< programming-lang-wrapper langs="go,python,nodejs,java" >}}
{{< programming-lang lang="go" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/path/to/your-go-binary"] (adapt this line to your needs)
```
See [Tracing Go Applications][1] for more details. [Sample code for a simple Go application][2].


[1]: /tracing/setup_overview/setup/go/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/go
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["ddtrace-run", "python", "app.py"] (adapt this line to your needs)
```

See [Tracing Python Applications][1] for detailed instructions. [Sample code for a simple Python application][2].

[1]: /tracing/setup_overview/setup/python/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/python
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"] (adapt this line to your needs)

```

See [Tracing NodeJS Applications][1] for detailed instructions. [Sample code for a simple NodeJS application][2].

[1]: /tracing/setup_overview/setup/nodejs/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/js
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"] (adapt this line to your needs)

```

See [Tracing Java Applications][1] for detailed instructions. [Sample code for a simple Java application][2].

[1]: /tracing/setup_overview/setup/java/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/java
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Advanced options and configurations

#### Environment variables

| Variable | Description |
| -------- | ----------- |
| `DD_SITE` | [Datadog site][3]. |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_SERVICE` | See [Unified Service Tagging][4]. |
| `DD_VERSION` | See [Unified Service Tagging][4]. |
| `DD_ENV` | See [Unified Service Tagging][4]. |
| `DD_SOURCE` | See [Unified Service Tagging][4]. |

## Log collection

You can use the [GCP integration][1] to collect logs. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to true to capture application logs through the Agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure/#log-collection
[2]: https://registry.hub.docker.com/r/datadog/serverless-init
[3]: /getting_started/site/
[4]: /getting_started/tagging/unified_service_tagging/
