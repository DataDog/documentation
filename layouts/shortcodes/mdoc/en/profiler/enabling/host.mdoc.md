<!--
Host Profiler profiler setup — self-contained.
Branches on $mode: bundled (Datadog Agent) or standalone (OTel, no Agent).
-->

Host profiling collects CPU and memory profiles at the OS level, across all processes — regardless of language or runtime.

Select the mode that matches your infrastructure:

- **Bundled**: the host profiler runs with the Datadog Agent, which collects and forwards profiles to Datadog. Choose this if you already run the Agent or are willing to deploy it.
- **Standalone**: the host profiler exports profiles through OpenTelemetry with no Datadog Agent required. Choose this if your stack is fully OTel-based (Helm charts or the OTel Operator).

{% if equals($mode, "bundled") %}

## Bundled Mode

The host profiler runs alongside the Datadog Agent. The Agent collects profiles and forwards them to Datadog.

Use this mode if you already deploy the Datadog Agent, or if you are willing to add it to your infrastructure.

<!-- TODO: add bundled setup steps -->

{% /if %}

{% if equals($mode, "standalone") %}

## Standalone Mode

The host profiler runs without a Datadog Agent, exporting profile data over OpenTelemetry.

Use this mode if your infrastructure is fully OTel-based (Helm charts or the OTel Operator) and you prefer not to introduce the Datadog Agent.

<!-- TODO: add standalone setup steps -->

{% /if %}
