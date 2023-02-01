---
title: Google Cloud Run
kind: documentation
further_reading:

- link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
  tag: 'Blog'
  text: 'Collect traces, logs, and custom metrics from GCR services'

---

## Overview

Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications. Datadog
provides monitoring and log collection for Cloud Run through the [GCP integration][1]. Datadog also provides a solution,
now in public beta, for instrumenting your Cloud Run applications with a purpose-built Agent to enable tracing, custom
metrics, and direct log collection.

  <div class="alert alert-warning">This feature is in public beta. You can provide feedback through a <a href="https://forms.gle/HSiDGnTPvDvbzDAQA">feedback form</a>, or through your standard support channels. During the beta period, Cloud Run monitoring and APM tracing are available without a direct cost. Existing APM customers may incur increased span ingestion and volume costs. </div>

## Getting started

To deploy a sample application in one click, without the need to
follow the rest of the steps, you can use the Cloud Run Button of [these examples][12].

### Prerequisites

Make sure you have a [Datadog API Key][10] and are using a programming
language [supported by a Datadog tracing library][2].

### Build your container with Datadog instrumentation

Cloud Run requires applications to be packaged in a container. From the application root folder use one
of the following methods.

#### Using Datadog buildpack

[`Pack Buildpacks`][4] provide a convenient way to package your container without using a Dockerfile. This example
will use the GCP container registry
and [Datadog serverless buildpack](https://registry.hub.docker.com/r/datadog/serverless-buildpack).
Build your application by running the following:

   ```shell
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack:beta4 \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```

**Note**: Not compatible with Alpine.

#### Using Dockerfile

Using a Dockerfile to build your container, the following steps are needed:

1. Use the `COPY` instruction to copy the [Datadog `serverless-init` binary][3] into your Docker image.

2. Use the `ENTRYPOINT` instruction to run the `serverless-init` binary as your Docker container is initiated.

3. Use the `CMD` instruction to run your existing application and other required commands as arguments.

You can accomplish those steps by adding the following lines to your Dockerfile. You may need to adjust these examples
depending on your existing Dockerfile setup.

{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}

```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/path/to/your-go-binary"] (adapt this line to your needs)
```

See [Tracing Go Applications][1] for more details. There is also [sample code for a simple Go application][2].


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

Then build the container with

```shell
docker build --tag gcr.io/YOUR_PROJECT/YOUR_APP_NAME .

```

### Push the container image to the registry

Using your GCP container registry:

   ```shell
   docker push gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```

### Deploy to Cloud Run

{{< tabs >}}

{{% tab "Cloud Run web UI" %}}

1. Create a secret with Datadog API key. This can be done
   via [Secret Manager](https://console.cloud.google.com/security/secret-manager) in your GCP console and clicking on
2. **Create secret**. Set a name (for example, `datadog-api-key`) in the **Name** field. Then, paste your Datadog API
   key in the **Secret value** field.

3. Go to [Cloud Run](https://console.cloud.google.com/run) in your GCP console. and click on **Create service**.

4. Select **Deploy one revision from an existing container image**. Choose your previously built image.

5. Select your invocation authentication method.

6. Reference your previously created secret, named `datadog-api-key` in this guide. Go to the **Container, Networking,
   Security** section and select the **Secrets** tab. click on **Reference a secret** and choose the secret you created
   from your Datadog API key. You may need to grant your user access to the secret.

7. Under **Reference method**, select **Exposed as environment variable**.

8. Under the **Environment variables** section, ensure that the name is set to `DD_API_KEY`.

{{% /tab %}}
{{% tab "gcloud CLI" %}}
For testing purpose, the Datadog API key can be exposed as an environment variable. That is unsafe due to its value
being displayed in plaintext. Allowing any external connection to reach the service, this one line command will deploy
the service. It expects `DD_API_KEY` to be set as
environment variable and a service listening to port 80

```shell
gcloud run deploy APP_NAME --image=gcr.io/YOUR_PROJECT/APP_NAME \
  --port=80 \
  --update-env-vars=DD_API_KEY=$(DD_API_KEY) \
  --allow-unauthenticated

```

{{% /tab %}}
{{< /tabs >}}

These are instructions for deploying a Cloud Run service using standard GCP tools. If you have other systems in place
for managing container images, secrets, or deployments, you may use those instead.

### Results

You should be able to see metrics and traces of your Cloud Run application in the Datadog UI!
You can submit custom metrics using a [DogStatsd client][7]. Only `DISTRIBUTION` metrics should be used.

### Logs

If you use [GCP integration][1] your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED`
environment variable to true to capture application logs through the serverless instrumentation.

### Custom metrics
You can submit custom metrics using a [DogStatsD client][7]. For monitoring Cloud Run and other serverless applications, use [distribution][12] metrics.

Distributions provide `avg`, `sum`, `max`, `min`, and `count` aggregations by default. On the Metric Summary page, you can enable percentile aggregations (p50, p75, p90, p95, p99) and also manage tags. To monitor a distribution for a gauge metric type, use `avg` for both the [time and space aggregations][13]. To monitor a distribution for a count metric type, use `sum` for both the time and space aggregations.

### Advanced options and configurations

#### Environment variables

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API Key][10] - **Required**|
| `DD_SITE` | [Datadog site][8] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_SERVICE`      | See [Unified Service Tagging][9].                                       |
| `DD_VERSION`      | See [Unified Service Tagging][9].                                       |
| `DD_ENV`          | See [Unified Service Tagging][9].                                       |
| `DD_SOURCE`       | See [Unified Service Tagging][9].                                       |
| `DD_TAGS`         | See [Unified Service Tagging][9].                                       |

## Troubleshooting

#### SSL

This integration depends on your runtime having a full SSL implementation. If you are using a slim image for Node, you
may need to add the following command to your Dockerfile to include certificates.

```
RUN apt-get update && apt-get install -y ca-certificates
```

#### Buildpack fail with 'Failed to run /bin/build: for Python, an entrypoint must be manually set, either with "GOOGLE_ENTRYPOINT"'

GCP buildpack requires a [Procfile][11] for some languages such as Python.

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
[12]: /metrics/distributions/
[13]: /metrics/#time-and-space-aggregation
[10]: /account_management/api-app-keys/

[11]: https://github.com/GoogleCloudPlatform/buildpack-samples/blob/master/sample-python/Procfile

[12]: https://github.com/DataDog/crpb/tree/main
