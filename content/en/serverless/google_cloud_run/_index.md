---
title: Google Cloud Run
kind: documentation
---

## Overview
Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications. 

## Build your container

If you are using a Dockerfile to build your application, complete the following:

1. Copy the [Datadog `serverless-init` binary][1] into your Docker image.

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
   
## Deploy to Cloud Run
Below are instructions for deploying a Cloud Run service using standard GCP tools. If you have other systems in place for managing container images, secrets, or deployments, you may use those instead.

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
| `DD_SITE` | [Datadog site][4]. |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_SERVICE` | See [Unified Service Tagging][5]. |
| `DD_VERSION` | See [Unified Service Tagging][5]. |
| `DD_ENV` | See [Unified Service Tagging][5]. |
| `DD_SOURCE` | See [Unified Service Tagging][5]. |

### Log collection

You can use the [GCP integration][6] to collect logs. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to true to capture application logs through the Agent.


[1]: https://registry.hub.docker.com/r/datadog/serverless-init
[2]: https://console.cloud.google.com/security/secret-manager
[3]: https://console.cloud.google.com/run
[4]: /getting_started/site/
[5]: /getting_started/tagging/unified_service_tagging/
[6]: /integrations/google_cloud_platform/#log-collection
