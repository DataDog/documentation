---
title: Application Instrumentation
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
    - /tracing/trace_collection/library_injection_remote
    - /tracing/trace_collection/automatic_instrumentation
further_reading:
- link: "tracing/trace_collection/compatibility"
  tag: "Documentation"
  text: "Compatibility requirements"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "APM Terms and Concepts"
- link: "https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/"
  tag: "Architecture Center"
  text: "Instrument your app using the Datadog Operator and Admission Controller"
algolia:
  tags: ['apm automatic instrumentation']
---

## Overview

To get started with Datadog APM, you need to follow these key steps:

1. Install and configure the Datadog Agent.  
2. Instrument your application.

<div class="alert alert-info"><strong>Simplify your setup!</strong> Install the Agent and instrument your application in one step with <a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a>.</div>

Instrumenting your application allows observability data to be sent to the Agent, which then passes data to the Datadog backend to display in the UI.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="The APM pipeline">}}

## Instrumentation types

There are two main approaches to instrument your application: automatic or custom {{< tooltip glossary="instrumentation" >}}.

### Automatic instrumentation

Create {{< tooltip glossary="span" >}}s for your application with minimal manual steps. To automatically instrument your application, you can use either of these options:

- [Single Step Instrumentation][7]: Run a one-line installation command to install the Datadog Agent, enable APM, and instrument all of your services on your Linux host, VM, or container.
- [Datadog libraries][8]: Add Datadog tracing libraries to your application.

#### Use cases

Some situations when you might use automatic instrumentation include:

- Capturing essential observability data across common libraries and languages with minimal configuration.
- Enabling real-time monitoring with pre-configured settings for immediate insights into application performance.
- Simplifying the observability setup for projects where [custom instrumentation][6] is not required.

### Custom instrumentation

Capture observability data from in-house code or complex functions that aren't captured by automatic instrumentation. To custom instrument your application, you can use any of these options:

- [Datadog libraries][9]: Use Datadog tracing libraries to add and customize observability within Datadog.
- [OpenTelemetry APIs][10]: Use OpenTelemetry API support in Datadog libraries to have vendor-neutral instrumentation of your code.
- [Dynamic Instrumentation][11]: Use Dynamic Instrumentation to add custom telemetry at specific code locations from the Datadog UI, without code changes.

#### Use cases

Some situations when you might use custom instrumentation include:

- Collecting observability data from custom code with unique or complex business logic.
- Providing deeper visibility and context into spans, including adding [span tags][12].
- Precisely monitoring specific sequences of operations or user interactions that require fine-grained control.
- Removing unwanted spans from traces.

{{< callout url="https://www.datadoghq.com/product-preview/service-discovery/" btn_hidden="false" header="Service discovery is in Preview">}}
Service discovery provides complete visibility into the current state of application monitoring, highlighting any major gaps or broken traces in your system. 
{{< /callout >}}

## Instrumentation types comparison

<table style="width:100%; border-collapse:collapse; border:1px solid #ccc;">
  <!-- Header group -->
  <tr style="background-color:#efefef;">
    <th style="border:1px solid #ccc; background-color:#e6e6e6;"></th>
    <th colspan="2" style="border:1px solid #ccc; text-align:center; background-color:#e6e6e6; font-weight:bold; text-transform:uppercase;">
      Automatic Instrumentation
    </th>
    <th colspan="2" style="border:1px solid #ccc; text-align:center; background-color:#e6e6e6; font-weight:bold; text-transform:uppercase;">
      Custom Instrumentation
    </th>
  </tr>
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/tracing/trace_collection/automatic_instrumentation/single-step-apm/">Single Step Instrumentation</a></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/">SDK-based Auto Instrumentation</a></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/tracing/trace_collection/custom_instrumentation/">Code-based Custom Instrumentation</a></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/tracing/dynamic_instrumentation/">Dynamic Instrumentation</a><br>(UI-based Custom Instrumentation)</th>
  </tr>

  <!-- Body rows -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Description</td>
    <td style="border:1px solid #ccc;">Automatically install and activate the Datadog tracing library at runtime (no code or SDK setup required).</td>
    <td style="border:1px solid #ccc;">Add Datadog tracing libraries (SDKs) to your code. The SDK handles instrumentation automatically.</td>
    <td style="border:1px solid #ccc;">Add explicit tracing API calls or span logic in your application code.</td>
    <td style="border:1px solid #ccc;">Add instrumentation rules in the Datadog UI (dynamic, runtime; no code changes).</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Code changes required?</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc;">No (aside from adding the SDK)</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">No</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Environment config changes?</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">No</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Set-up complexity</td>
    <td style="border:1px solid #ccc;">Low</td>
    <td style="border:1px solid #ccc;">Medium</td>
    <td style="border:1px solid #ccc;">High</td>
    <td style="border:1px solid #ccc;">Low</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Best for</td>
    <td style="border:1px solid #ccc;">SRE, admins, or central teams who want tracing across services without developer involvement.</td>
    <td style="border:1px solid #ccc;">App dev teams who want to instrument applications individually with granular control over configuration through environment variables.</td>
    <td style="border:1px solid #ccc;">Teams needing custom logic, specialized spans, or visibility into custom code paths.</td>
    <td style="border:1px solid #ccc;">Teams wanting to add spans, logs, or metrics to specific code locations at runtime without redeploying or modifying source code. Configuration is managed through the Datadog UI.</td>
  </tr>
</table>


## APM setup tutorials

The following tutorials guide you through setting up distributed tracing for a sample application on various infrastructure scenarios, with both automatic and custom instrumentation, using the Datadog tracing libraries:

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
[4]: /tracing/trace_collection/dd_libraries/
[5]: /tracing/trace_collection/automatic_instrumentation/
[6]: /tracing/trace_collection/custom_instrumentation/
[7]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
[8]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /tracing/trace_collection/custom_instrumentation/dd_libraries/
[10]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[11]: /tracing/dynamic_instrumentation/