---
code_lang: aws-fargate
type: multi-code-lang
code_lang_weight: 60
title: Set up App and API Protection for Go on AWS Fargate
further_reading:
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

## Prerequisites

- AWS Fargate environment
- Go application containerized with Docker
- AWS CLI configured with appropriate permissions
- Your Datadog API key
- One of the latest two versions of [Go][1] installed (following the [Official Release Policy][2])
- Your service framework and tools are [compatible][3] with Datadog Application and API Protection

## 1. Installing the Datadog Agent

Install the Datadog Agent in your Fargate task definition:

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_API_KEY>"
        },
        {
          "name": "DD_APM_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_NON_LOCAL_TRAFFIC",
          "value": "true"
        }
      ]
    }
  ]
}
```

## 2. Enabling App and API Protection monitoring

### Building your application with Orchestrion

To enable App and API Protection for Go, you need to compile your application with [Orchestrion][4], Datadog's compile-time instrumentation tool.

Update your Dockerfile to install Orchestrion and build your application:

```dockerfile
FROM golang:1.23 AS builder

# Install Orchestrion
RUN go install github.com/DataDog/orchestrion@latest

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

# Register Orchestrion as a Go module
RUN orchestrion pin

COPY . .

# Build with Orchestrion using the appsec tag
RUN orchestrion go build -tags=appsec -o myapp .

FROM gcr.io/distroless/base-debian12

# If building without CGO, ensure glibc libraries are available
# COPY --from=builder /lib/x86_64-linux-gnu/libc.so.6 /lib/x86_64-linux-gnu/
# COPY --from=builder /lib/x86_64-linux-gnu/libpthread.so.0 /lib/x86_64-linux-gnu/
# COPY --from=builder /lib/x86_64-linux-gnu/libdl.so.2 /lib/x86_64-linux-gnu/

COPY --from=builder /app/myapp /myapp
CMD ["/myapp"]
```

{{% collapse-content title="APM Tracing Enabled" level="h3" %}}

Update your task definition to include the Go application container with App and API Protection configuration:

```json
{
  "containerDefinitions": [
    {
      "name": "your-go-app",
      "image": "your-go-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h3" %}}

To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Update your task definition to include the Go application container with App and API Protection configuration with APM tracing disabled:

```json
{
  "containerDefinitions": [
    {
      "name": "your-go-app",
      "image": "your-go-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_TRACING_ENABLED",
          "value": "false"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

## 3. Run your application

Deploy your Fargate task with the updated configuration:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

## 4. Verify your setup

To verify that App and API Protection is working correctly, send known attack patterns to your application. For example, trigger the [Security Scanner Detected][5] rule by running a file that contains the following curl script:

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

A few minutes after you enable your application and exercise it, threat information appears in the [Application Trace and Signals Explorer][6] in Datadog.

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Go application, see the [Go App and API Protection troubleshooting guide][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://go.dev/
[2]: https://go.dev/doc/devel/release#policy
[3]: /security/application_security/setup/compatibility/go/
[4]: https://datadoghq.dev/orchestrion
[5]: /security/default_rules/security-scan-detected/
[6]: https://app.datadoghq.com/security/appsec
[7]: /security/application_security/setup/go/troubleshooting
