---
title: Use Custom OpenTelemetry Components with Datadog Agent
private: true
---

By following the instructions, you will be able to build a Datadog Agent image with additional OpenTelemetry (OTel) Components that were NOT included in the Agent. Please refer to [this list](\#bookmark=id.kd8l3iooysu8) for the OTel Components that are already included in the Agent by default.

## Prerequisite

Before you start, you will need the following: 

Required

- Docker is installed on your machine. You can download and install Docker from [here](https://docs.docker.com/engine/install/).  
- Access to github.com, Datadog Agent [code](https://github.com/DataDog/datadog-agent) is available as Open Source Code.   
- The OTel Components you plan to include in the Agent must be consistent with the version of the embedded OTel Collector (e.g. v0.104.0 as of today).

Recommended

- Familiarize with the workflow for [building a custom collector](https://opentelemetry.io/docs/collector/custom-collector/) and [OpenTelemetry Collector Builder (OCB)](https://github.com/open-telemetry/opentelemetry-collector/blob/main/cmd/builder/README.md).  
- Basic understanding of the [Go](https://go.dev/) compilation process and [go modules.](https://go.dev/blog/using-go-modules)

## Step 1: Download the docker file template to prepare for adding the OTel Components that will be included in the Agent image

By completing this step, you should have a docker file in your preferred file location, ready to be used for creating an Agent image to your preference. 

1. Open your terminal and run commands to create a new folder at your preferred file location and cd into it, see an example below

```
mkdir -p agent-with-otel
cd agent-with-otel
```

2. Download the docker file

```
curl -o Dockerfile https://raw.githubusercontent.com/DataDog/datadog-agent/main/Dockerfiles/agent-ot/Dockerfile.byoc 
```

What is the docker file and how it will help you to build a new Agent image:

- The Dockerfile uses FROM ubuntu:24.04 AS builder and FROM datadog/agent-dev:nightly-ot-beta-main-jmx to create a [multi-stage build](https://docs.docker.com/build/building/multi-stage/).  
- It installs Go, Python, and necessary dependencies.  
- It downloads and unpacks the DataDog Agent source code.  
- It creates a virtual environment and installs the required Python packages.  
- It runs invoke collector.generate to generate component files  
- Finally, it builds the OTel agent and copies the resulting binary to the final image.

## Step 2: Create an OpenTelemetry Collector Builder (OCB) manifest for adding OTel Components in the Agent image

By completing this step, you will have an OpenTelemetry Collector Builder (OCB) manifest YAML file that lists all the OTel Components you require to be used with the Agent. 

To add OTel Components to the existing Agent package that are outside of what Agent already provides today (see [the list](\#bookmark=id.kd8l3iooysu8)), start with the [Agent default manifest](https://raw.githubusercontent.com/DataDog/datadog-agent/main/comp/otelcol/collector-contrib/impl/manifest.yaml) as the baseline by following below steps. 

1. Download the Datadog’s default manifest.yaml

```
curl -o manifest.yaml https://raw.githubusercontent.com/DataDog/datadog-agent/main/comp/otelcol/collector-contrib/impl/manifest.yaml
```

2. Customize the Datadog manifest.yaml

Open the \`manifest.yaml\` file downloaded from the previous step and add the additional OTel Component you need in the corresponding component sections (e.g. extensions, exporters, processors, receivers or connectors)

In this example, we will walk you through how you can add [Kafka metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver/README.md) and [JMXreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jmxreceiver/README.md) to the Agent default manifest. You can apply the same steps for any other OTel Components that you would like to add. 

In the receivers section, add [Kafka metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver/README.md), see highlighted yaml example below:

| dist:   module: github.com/DataDog/comp/otelcol/collector-contrib   name: otelcol-contrib   description: Datadog OpenTelemetry Collector   version: 0.104.0   output\_path: ./comp/otelcol/collector-contrib/impl   otelcol\_version: 0.104.0 extensions: \# You will see a list of extensions already included by Datadog  \# Add your desired extensions here exporters: \# You will see a list of exporters already included by Datadog  \# Add your desired exporters here processors: \# You will see a list of processors already included by Datadog  \# Add your desired processors here Receivers:   \- gomod: go.opentelemetry.io/collector/receiver/nopreceiver v0.104.0   \- gomod: go.opentelemetry.io/collector/receiver/otlpreceiver v0.104.0   \- gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/filelogreceiver v0.104.0   \- gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/fluentforwardreceiver v0.104.0   \- gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/hostmetricsreceiver v0.104.0   \- gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/jaegerreceiver v0.104.0   \- gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/prometheusreceiver v0.104.0   \- gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/receivercreator v0.104.0   \- gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/zipkinreceiver v0.104.0 \# adding Kafka metrics receiver to collect Kafka metrics in OTLP format   \- gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/kafkametricsreceiver v0.104.0 connectors: \# You will see a list of connectors already included by Datadog  \# Add your desired connectors here |
| :---- |

* Please ensure to save your changes to the manifest file. 

## Step 3: Build a new Agent image and push the image to your preferred docker repository

1. Build the image

Use Docker to build the new image with the following command:

```
docker build . -t agent-otel --no-cache
```

2. Tag and push the image

Push the image to your preferred docker repository with a preferred image tag defined:

```
docker tag agent-otel <IMAGE-NAME>/<IMAGE-TAG>
docker push <IMAGE-NAME>/<IMAGE-TAG>
```

Replace `<IMAGE-NAME>`  and `<IMAGE-TAG>` with your image name and desired image tag. Note that if the target repository is NOT docker hub, you need to include the repository name. 

3. When you are ready to install Agent with this new image via Helm Chart installation, ensure you set the image tag correctly. 

Below is a sample values file:

```
agents:
  image:
    repository: <YOUR-REPO>
    tag: <IMAGE-TAG>
    doNotCheckTag: true
```

Replace `<YOUR-REPO>` and `<IMAGE-TAG>` with your repository name and desired image tag.

See documentation [here](https://docs.google.com/document/u/0/d/1CSdVx4yVGspc8uJJqE9ZhRm7UIjHSQvOpeZFEQRBkOo/edit) for full installation instructions. 

## Step 4: Test and validation

In this step, we will walk you through how you can create and test an OTel Configuration file with added OTel Components configured. 

1. Create a sample OTel configuration file with the additional components configured for testing purpose  
   

Here is an example with the added  [Kafka metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver/README.md) configured:

| receivers:   otlp:     protocols:       http:         endpoint: "0.0.0.0:4318"       grpc:         endpoint: "0.0.0.0:4317"   kafkametrics:     brokers: "${env:KAFKA\_BROKER\_ADDRESS}"     protocol\_version: 2.0.0     scrapers:       \- brokers       \- topics       \- consumers processors:   batch:     send\_batch\_max\_size: 1000     send\_batch\_size: 100     timeout: 10s exporters:   datadog:     api:       site: ${env:DD\_SITE}       key: ${env:DD\_API\_KEY} connectors:     datadog/connector:         traces:           compute\_top\_level\_by\_span\_kind: true           peer\_tags\_aggregation: true           compute\_stats\_by\_span\_kind: true service:   pipelines:     metrics:       receivers: \[otlp, datadog/connector,kafkametrics \]       processors: \[batch\]       exporters: \[datadog\]     traces:       receivers: \[otlp\]       processors: \[batch\]       exporters: \[datadog/connector\]     traces/2:       receivers: \[datadog/connector\]       processors: \[batch\]       exporters: \[datadog\]     logs:       receivers: \[otlp\]       processors: \[batch\]       exporters: \[datadog\] |
| :---- |

2. Run the agent using the below docker command. If the Agent starts then the build process has been successful. 

```
docker run -it \
  -e DD_API_KEY=XX \
  -e DD_SITE=datadoghq.com \
  -e DD_HOSTNAME=datadog \
  -v $(pwd)/config.yaml:/config.yaml \
  -p 4317:4317 \
  -p 4318:4318 \
  --entrypoint otel-agent \
  agent-otel --config /config.yaml
```

Now you can start using the new image to install the Agent  for accessing Datadog monitoring capabilities enabled by the Agent with the additional OTel capabilities added\! See documentation [here](https://docs.google.com/document/u/0/d/1CSdVx4yVGspc8uJJqE9ZhRm7UIjHSQvOpeZFEQRBkOo/edit) \[link\] for how you can install, and configure the Agent with added Otel Components 

## Troubleshooting

1. If you see the below error Message during the build, please remove awscontainerinsightreceiver from the manifest. It has incompatible libraries and it can’t be included in the build.


```
#0 0.879 go: downloading github.com/tidwall/gjson v1.17.1
#0 0.889 go: downloading code.cloudfoundry.org/go-diodes v0.0.0-20240604201846-c756bfed2ed3
#0 0.916 go: downloading github.com/hashicorp/go-retryablehttp v0.7.5
#0 0.940 go: downloading github.com/tidwall/pretty v1.2.1
#0 88.24 # github.com/opencontainers/runc/libcontainer/cgroups/ebpf
#0 88.24 /go/pkg/mod/github.com/opencontainers/runc@v1.1.12/libcontainer/cgroups/ebpf/ebpf_linux.go:190:3: unknown field Replace in struct literal of type link.RawAttachProgramOptions
#0 89.14 # github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver/internal/k8sapiserver
#0 89.14 /go/pkg/mod/github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver@v0.104.0/internal/k8sapiserver/k8sapiserver.go:47:68: undefined: record.EventRecorderLogger
------
```

2. If you see the below error, please rerun the build command. 

```
ERROR: failed to solve: process "/bin/sh -c . venv/bin/activate && invoke otel-agent.build" did not complete successfully: chown /var/lib/docker/overlay2/r75bx8o94uz6t7yr3ae6gop0b/work/work: no such file or directory
```

3. If you see errors related to space issues, please clean up the docker space.

```
no space left on device
```

Run the below command to clear up the space

```
docker system prune -a 
```