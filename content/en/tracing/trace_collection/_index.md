---
title: Sending Traces to Datadog
kind: documentation
description: "Get Started with Datadog APM"
aliases:
    - /tracing/setup
    - /tracing/send_traces/
    - /tracing/setup/
    - /tracing/environments/
    - /tracing/setup/environment
    - /tracing/setup/first_class_dimensions
    - /tracing/getting_further/first_class_dimensions/
    - /agent/apm/
    - /tracing/setup_overview/
further_reading:
- link: "tracing/trace_collection/compatibility"
  tag: "Documentation"
  text: "Compatibility requirements"
---

To configure your application to send traces to Datadog:

## Step 1 - Configure the Datadog Agent for APM

<div class="alert alert-info"><strong>Beta</strong>: You can enable APM when installing the Agent with  <a href="/tracing/trace_collection/single-step-apm">Single Step APM Instrumentation</a>. Run a one-line install command to automatically enable APM and instrument all of your services on the Linux host, VM, or container. After that, you're ready to <a href="/tracing/services">start exploring</a>!</div>

If you don't use Single Step APM Instrumentation, APM-specific configurations are required on both the Tracer and Agent to ensure that traces can be received from certain environment types, such as containerized or serverless. Ensure you have followed instructions for both components. 

### Install and configure the Agent

Install and configure the Datadog Agent to receive traces from your instrumented application. By default, the Datadog Agent is configured to receive traces in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. The trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable. For example:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   Similarly, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist, then stats are sent to `http://localhost:8125`.

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.

[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for several other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Service][4].

For other environments, see the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}

## Step 2 - Instrument your application 

When you add the Datadog tracing library to your code, it instruments the service and sends traces to the Datadog Agent. The Agent then sends the traces to the Datadog backend to be displayed in the UI.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="The APM pipeline">}}

Depending on the programming language and infrastructure you use, you have the following options to instrument your application:

- [Auto-instrument your application](#option-1---auto-instrument-your-application)
- [Manually instrument your application](#option-2---manually-instrument-your-application)
- [Auto-instrument your application from the Datadog UI](#option-3---auto-instrument-your-application-from-the-datadog-ui)

### Option 1 - Auto-instrument your application

For Kubernetes, hosts, and containers, you can auto-instrument your application by injecting the tracing library into your application. For more information and instructions, read [Injecting Libraries Locally][2].

- For Kubernetes, you can inject the library into applications written in Java, Python, Ruby (Beta), Node.js, and .NET.
- **Beta**: For Linux hosts and containers, you can inject the library into applications written in Java, Python, Node.js, and .NET.

### Option 2 - Manually instrument your application

For setup instructions, select your language:

{{< partial name="apm/apm-languages.html" >}}

To instrument an application written in a language that does not have official library support, see the list of [community tracing libraries][1].


### Option 3 - Auto-instrument your application from the Datadog UI

<div class="alert alert-info">This feature is in private beta.</a></div>

For Kubernetes, you can inject the Java, Python, and Node.js tracing libraries from the Datadog UI. 

For more information and instructions, read [Injecting Libraries Remotely][3].

## APM setup tutorials

The following tutorials guide you through setting up distributed tracing for a sample application on various infrastructure scenarios, with both automatic and custom instrumentation, using the direct method ([Option 2](#option-2---manually-instrument-your-application)):

{{< whatsnext desc="Choose your language and environment:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Python Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Python Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing for a Python Application in a Container and an Agent on a Host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Java Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Java Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing for a Java Application in a Container and an Agent on a Host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Enabling Tracing for a Java Application on GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Enabling Tracing for a Java Application on AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Enabling Tracing for a Java Application in Amazon ECS with EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Enabling Tracing for a Java Application in Amazon ECS with Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Enabling Tracing for a Java Application with the Admission Controller{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Go Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Go Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Enabling Tracing for a Go Application in Amazon ECS with EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Enabling Tracing for a Go Application in Amazon ECS with Fargate{{< /nextlink >}}

{{< /whatsnext >}}
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/community/libraries/#apm-tracing-client-libraries
[2]: /tracing/trace_collection/library_injection_local/
[3]: /tracing/trace_collection/library_injection_remote/
[4]: /tracing/trace_collection/dd_libraries/
