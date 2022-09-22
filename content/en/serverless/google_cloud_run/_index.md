---
title: Google Cloud Run
kind: documentation
---

## Overview
Google Cloud Run is [tk]

## Quickstart

To deploy Datadog serverless monitoring on a pre-built demo application, see [Getting Started with Serverless Monitoring (Cloud Run)][1].

## Setup

2. Add Datadog instrumentation to your existing service.
   {{< programming-lang-wrapper langs="go,python,nodejs,java" >}}
   {{< programming-lang lang="go" >}}
   See [Tracing Go Applications][1] for detailed instructions. [Sample code for a simple Go application][2].

   If you’re using a Dockerfile to build your application, add the following lines:

   ```
   COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
   ENTRYPOINT ["/app/datadog-init"]
   CMD ["/nodejs/bin/node /app/app.js"]
   ```
[1]: /tracing/setup_overview/setup/go/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/go
   {{< /programming-lang >}}
   {{< programming-lang lang="python" >}}
   See [Tracing Python Applications][1] for detailed instructions. [Sample code for a simple Python application][2].

   If you’re using a Dockerfile to build your application, add the following lines:

   ```
   COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
   ENTRYPOINT ["/app/datadog-init"]
   CMD ["ddtrace-run", "python", "app.py"]
   ```
[1]: /tracing/setup_overview/setup/python/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/python
   {{< /programming-lang >}}
   {{< programming-lang lang="nodejs" >}}
   See [Tracing NodeJS Applications][1] for detailed instructions. [Sample code for a simple NodeJS application][2].

   If you’re using a Dockerfile to build your application, add the following lines:

   ```
   COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
   ENTRYPOINT ["/app/datadog-init"]
   ```
[1]: /tracing/setup_overview/setup/nodejs/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/js
   {{< /programming-lang >}}
   {{< programming-lang lang="java" >}}
   See [Tracing Java Applications][1] for detailed instructions. [Sample code for a simple Java application][2].

   If you’re using a Dockerfile to build your application, add the following lines:

   ```
   COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
   ENTRYPOINT ["/app/datadog-init"]
   ```
[1]: /tracing/setup_overview/setup/java/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/java
   {{< /programming-lang >}}
   {{< /programming-lang-wrapper >}}
3. Run this command to submit your build to GCP.

   ```
   gcloud builds submit --tag gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```
4. Create a secret from your Datadog API key. 
   Go to [Secret Manager][2] in your GCP console and click on **Create secret**.

   Set a name (for example, `datadog-api-key`) in the **Name** field. Then, paste your Datadog API key in the **Secret value** field.
5. Deploy your service.
   Go to [Cloud Run][3] in your GCP console. and click on **Create service**.
   
   Select **Deploy one revision from an existing container image**. Choose your previously built image.

   Select your authentication method.

   Reference your previously created secret. Go to the **Container, Variables & Secrets, Connections, Security** section and select the **Variables & Secrets** tab. 

   Under **Secrets**, click on **Reference a secret** and choose the secret you created from your Datadog API key. You may need to grant your user access to the secret. 

   Under **Reference method**, select **Exposed as environment variable**.

   Under the **Environment variables** section, ensure that the name is set to `DD_API_KEY`.


## Advanced options and configurations

### Environment variables

| Variable | Description |
| -------- | ----------- |
| `DD_SITE` | Datadog site. |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_SERVICE` | See Unified Service Tagging. |
| `DD_VERSION` | See Unified Service Tagging. |
| `DD_ENV` | See Unified Service Tagging. |
| `DD_SOURCE` | See Unified Service Tagging. |

### Build with the Datadog buildpack

1. Build your application by running the following:
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

[1]: /getting_started/serverless/gcr
[2]: https://console.cloud.google.com/security/secret-manager
[3]: https://console.cloud.google.com/run
