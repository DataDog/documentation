---
title: Google Cloud Run
kind: documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
      tag: 'Blog'
      text: 'Collect traces, logs, and custom metrics from GCR services'
---

## Overview
Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Cloud Run through the [GCP integration][1]. Datadog also provides a solution, now in public beta, for instrumenting your Cloud Run applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

  <div class="alert alert-warning">This feature is in public beta. You can provide feedback through a <a href="https://forms.gle/HSiDGnTPvDvbzDAQA">feedback form</a>, or through your standard support channels. During the beta period, Cloud Run monitoring and APM tracing are available without a direct cost. Existing APM customers may incur increased span ingestion and volume costs. </div>

## Tracing and custom metrics
### Build your container

If you are using a Dockerfile to build your application, complete the following:

1. Instrument your application with a [supported Datadog tracing library][2]

2. Use the `COPY` instruction to copy the [Datadog `serverless-init` binary][3] into your Docker image.

3. Use the `ENTRYPOINT` instruction to run the `serverless-init` binary as your Docker container is initiated.

4. Use the `CMD` instruction to run your existing application and other required commands as arguments.

5. Set a `DD_API_KEY` value in your application runtime to complete Agent configuration.

The following are examples of how to complete these three steps. You may need to adjust these examples depending on your existing Dockerfile setup. 


{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
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

See [Tracing Node.js Applications][1] for detailed instructions. [Sample code for a simple Node.js application][2].

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

{{< programming-lang lang="dotnet" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"] (adapt this line to your needs)

```

See [Tracing .NET Applications][1] for detailed instructions. [Sample code for a simple .NET application][2].

[1]: /tracing/trace_collection/dd_libraries/dotnet-core?tab=containers
[2]: https://github.com/DataDog/crpb/tree/main/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"] (adapt this line to your needs)

```

See [Tracing Ruby Applications][1] for detailed instructions. [Sample code for a simple Ruby application][2].

[1]: /tracing/trace_collection/dd_libraries/ruby/
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### Troubleshooting
This integration depends on your runtime having a full SSL implementation. If you are using a slim image for Node, you may need to add the following command to your Dockerfile to include certificates.

```
RUN apt-get update && apt-get install -y ca-certificates
```

#### Build with the Datadog buildpack

1. Use [`pack`][4] to build your application by running the following:
   ```
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack:beta4 \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME

   ```

   **Note**: Not compatible with Alpine.

 2. Push your image to GCP:
    ```
    docker push gcr.io/YOUR_PROJECT/YOUR_APP_NAME
    ```

### Deploy to Cloud Run
Below are instructions for deploying a Cloud Run service using standard GCP tools. If you have other systems in place for managing container images, secrets, or deployments, you may use those instead.

3. Run this command to submit your build to GCP.

   ```
   gcloud builds submit --tag gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```
4. Create a secret from your Datadog API key.
   Go to [Secret Manager][5] in your GCP console and click on **Create secret**.

   Set a name (for example, `datadog-api-key`) in the **Name** field. Then, paste your Datadog API key in the **Secret value** field.
5. Deploy your service.
   Go to [Cloud Run][6] in your GCP console. and click on **Create service**.

   Select **Deploy one revision from an existing container image**. Choose your previously built image.

   Select your authentication method.

   Reference your previously created secret. Go to the **Container, Variables & Secrets, Connections, Security** section and select the **Variables & Secrets** tab.

   Under **Secrets**, click on **Reference a secret** and choose the secret you created from your Datadog API key. You may need to grant your user access to the secret.

   Under **Reference method**, select **Exposed as environment variable**.

   Under the **Environment variables** section, ensure that the name is set to `DD_API_KEY`.

### Custom metrics
You can submit custom metrics using a [DogStatsd client][7].

**Note**: Only `DISTRIBUTION` metrics should be used.

### Advanced options and configurations

#### Environment variables

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API Key][10] - **Required**|
| `DD_SITE` | [Datadog site][8] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_SERVICE` | See [Unified Service Tagging][9]. |
| `DD_VERSION` | See [Unified Service Tagging][9]. |
| `DD_ENV` | See [Unified Service Tagging][9]. |
| `DD_SOURCE` | See [Unified Service Tagging][9]. |
| `DD_TAGS` | See [Unified Service Tagging][9]. |

## Log collection

You can use the [GCP integration][1] to collect logs. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to true to capture application logs through the Agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/google_cloud_platform/#log-collection
[2]: /tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: https://registry.hub.docker.com/r/datadog/serverless-init
[4]: https://buildpacks.io/docs/tools/pack/
[5]: https://console.cloud.google.com/security/secret-manager
[6]: https://console.cloud.google.com/run
[7]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[8]: /getting_started/site/
[9]: /getting_started/tagging/unified_service_tagging/
[10]: /account_management/api-app-keys/#api-keys