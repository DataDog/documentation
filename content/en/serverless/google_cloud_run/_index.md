---
title: Google Cloud Run
kind: documentation
---

## Overview
Google Cloud Run is [tk]

## Quickstart

To deploy Datadog serverless monitoring on a pre-built demo application, see [Getting Started with Serverless Monitoring (Cloud Run)][1].

## Setup

1. [Build your service](#build-your-service).
2. Create a secret from your Datadog API key. 
   Go to [Secret Manager][2] in your GCP console and click on **Create secret**.

   Set a name (for example, `datadog-api-key`) in the **Name** field. Then, paste your Datadog API key in the **Secret value** field.
3. Deploy your service.
   Go to [Cloud Run][3] in your GCP console. and click on **Create service**.
   
   Select **Deploy one revision from an existing container image**. Choose your previously built image.

   Select your authentication method.

   Reference your previously created secret. Go to the **Container, Variables & Secrets, Connections, Security** section and select the **Variables & Secrets** tab. 

   Under **Secrets**, click on **Reference a secret** and choose the secret you created from your Datadog API key. You may need to grant your user access to the secret. 

   Under **Reference method**, select **Exposed as environment variable**.

   Under the **Environment variables** section, ensure that the name is set to `DD_API_KEY`.

### Build your service

{{< programming-lang-wrapper langs="go,python,nodejs,java" >}}
{{< programming-lang lang="go" >}}
1. Add Datadog instrumentation to your existing service. See [Tracing Go Applications][1] for more information. 

   [Sample code for a simple Go application][2].

2 - Edit your Dockerfile

If you’re using a Dockerfile to build your application, you need the following lines: 

COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node /app/app.js"] (adapt this line to your need)

You can see a full example of a ready-to-use Go Dockerfile here: https://github.com/DataDog/crpb/blob/main/go/Dockerfile

3 - Build and push 

Run this command to submit your build to GCP, once succeeded, your docker image will be ready to use

gcloud builds submit --tag gcr.io/YOUR_PROJECT/YOUR_APP_NAME


[1]: /tracing/setup_overview/setup/go/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/go
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

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
