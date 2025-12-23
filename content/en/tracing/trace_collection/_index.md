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
2. Add the Datadog tracing SDK to your application.
3. Instrument your application to create spans.

<div class="alert alert-info">
<strong>Simplify your setup!</strong> 
Use <a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a> to complete these steps in one command.
</div>

Instrumenting your application creates spans that are sent to the Datadog Agent, which forwards trace data to the Datadog backend for visualization and analysis.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="The APM pipeline">}}

## Instrumentation model 

<div class="alert alert-info">
If you prefer vendor-neutral instrumentation, see the <a href="https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">OpenTelemetry documentation</a> for using OpenTelemetry API support in Datadog libraries.
</div>

At a high level, {{< tooltip glossary="instrument" >}}ing an application with Datadog APM involves two actions:

1. Adding the Datadog language SDKs to your application.
2. Creating {{< tooltip glossary="span" >}}s to capture observability data.

Datadog language SDKs automatically create spans for supported frameworks and libraries. In many cases, this automatic instrumentation is sufficient. When you need more control, you can add custom instrumentation.


### Adding Datadog language SDKs

Datadog language SDKs can be added to your application in the following ways:

- **Single Step Instrumentation (SSI)**: Automatically installs and loads Datadog language SDKs at runtime.
- **Manual installation**: Install and configure the Datadog language SDKs directly in your application.


### Creating spans

After Datadog language SDKs are available, spans can be created in the following ways:

- **Automatic instrumentation**: Datadog language SDKs automatically create spans to capture essential observability data across common libraries and languages.
- **Custom instrumentation**: Add spans for custom code paths or specialized logic. You can create custom spans in two ways:
  - **Code-based custom instrumentation**: Use the Datadog tracing APIs in your application code.
  - **Dynamic Instrumentation (UI-based custom instrumentation)**: Add spans at runtime using configuration in the Datadog UI, without modifying application code.

## Summary

The following table compares the available ways to install Datadog language SDKs and create spans. In most cases, you install the SDK and rely on automatic instrumentation, then optionally add custom instrumentation if you need more control.

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;">
      <a href="/tracing/trace_collection/automatic_instrumentation/single-step-apm/">
        Single Step Instrumentation
      </a>
    </th>
    <th style="border:1px solid #ccc; font-weight:bold;">
      <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/">
        Manually managed SDKs
      </a>
    </th>
    <th style="border:1px solid #ccc; font-weight:bold;">
      <a href="/tracing/trace_collection/custom_instrumentation/">
        Code-based Custom Instrumentation
      </a>
    </th>
    <th style="border:1px solid #ccc; font-weight:bold;">
      <a href="/tracing/dynamic_instrumentation/">
        Dynamic Instrumentation
      </a>
    </th>
  </tr>

  <!-- Description -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Description</td>
    <td style="border:1px solid #ccc;">
      With a single command, Datadog automatically loads language SDKs to your application processes. You can also control which processes to instrument.
    </td>
    <td style="border:1px solid #ccc;">
      Add Datadog language SDKs to your applications. The SDK handles instrumentation automatically.
    </td>
    <td style="border:1px solid #ccc;">
      Add explicit tracing API calls or span logic in your application code.
    </td>
    <td style="border:1px solid #ccc;">
      Add instrumentation rules in the Datadog UI. Rules are applied dynamically at runtime and do not require code changes.
    </td>
  </tr>

  <!-- Installs SDK -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Installs Datadog language SDKs?</td>
    <td style="border:1px solid #ccc;">Yes (automatic)</td>
    <td style="border:1px solid #ccc;">Yes (manual)</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc;">No</td>
  </tr>

  <!-- Instrumentation behavior -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Instrumentation behavior</td>
    <td style="border:1px solid #ccc;">Automatic</td>
    <td style="border:1px solid #ccc;">Automatic</td>
    <td style="border:1px solid #ccc;">Custom (code-based)</td>
    <td style="border:1px solid #ccc;">Custom (runtime, UI-based)</td>
  </tr>

  <!-- Code changes -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Code changes required</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">No</td>
  </tr>

  <!-- Environment config -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Runtime or environment configuration required</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">No</td>
  </tr>

  <!-- Setup complexity -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Setup complexity</td>
    <td style="border:1px solid #ccc;">Low</td>
    <td style="border:1px solid #ccc;">Medium</td>
    <td style="border:1px solid #ccc;">High</td>
    <td style="border:1px solid #ccc;">Low</td>
  </tr>

  <!-- Best for -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Best for</td>
    <td style="border:1px solid #ccc;">
      SRE, admins, or central teams who want tracing across services without developer involvement.
    </td>
    <td style="border:1px solid #ccc;">
      App dev teams who want to instrument applications individually with granular control over configuration through environment variables.
    </td>
    <td style="border:1px solid #ccc;">
      Teams needing custom logic, specialized spans, or visibility into custom code paths.
    </td>
    <td style="border:1px solid #ccc;">
      Teams wanting to add spans, logs, or metrics to specific code locations at runtime without redeploying or modifying source code. Configuration is managed through the Datadog UI.
    </td>
  </tr>

  <!-- Use cases -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Use cases</td>
    <td colspan="2" style="border:1px solid #ccc;">
      <ul style="margin:0; padding-left:20px;">
        <li>Capturing essential observability data across common libraries and languages with minimal configuration.</li>
        <li>Enabling real-time monitoring with pre-configured settings for immediate insights into application performance.</li>
        <li>Simplifying the observability setup for projects where custom instrumentation is not required.</li>
      </ul>
    </td>
    <td colspan="2" style="border:1px solid #ccc;">
      <ul style="margin:0; padding-left:20px;">
        <li>Collecting observability data from custom code with unique or complex business logic.</li>
        <li>Enriching traces with application-specific metadata.</li>
        <li>Precisely monitoring sequences of operations or user interactions that require fine-grained control.</li>
        <li>Removing unwanted spans from traces.</li>
      </ul>
    </td>
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

