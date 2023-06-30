---
title: Setup Observability Pipelines in your Splunk Environment
kind: documentation
aliases:
  - /integrations/observability_pipelines/splunk
code_lang: splunk
type: multi-code-lang
code_lang_weight: 50
further_reading:
  - link: "/observability_pipelines/working_with_data/"
    tag: "Documentation"
    text: "Working with data using Observability Pipelines"
  - link: /observability_pipelines/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
  - link: "https://dtdg.co/d22op"
    tag: "Learning Center"
    text: "Safe and Secure Local Processing with Observability Pipelines"
---

{{< callout url="#" btn_hidden="true" header="Limited Protocol Support" >}}
  Observability Pipelines only supports Splunk's HTTP Event Collector (HEC) protocol at this time.
{{< /callout >}}

## Overview

The [Observability Pipelines Worker][1] can collect, process, and route logs and metrics from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale.

This guide walks you through deploying the Worker in your common tools cluster and configuring Splunk to send logs through the Worker, to dual-write to Datadog.

{{< img src="observability_pipelines/guide/splunk/setup.png" alt="A diagram of a couple of Splunk Heavy Forwarders sending their data through the Observability Pipelines aggregator." >}}

## Assumptions
* You are using an HTTP Event Collector (HEC) compatible Splunk collector, such as the Heavy Forwarder.
* You have administrative access to the Splunk Forwarders and Index.
* You have administrative access to the clusters where the Observability Pipelines Worker is going to be deployed.
* You have a common tools or security cluster for your environment to which all other clusters are connected.

## Prerequisites
Before installing, make sure you have:

* A valid [Datadog API key][2].
* A Pipeline ID.

You can generate both of these in [Observability Pipelines][3].

You will also need a Splunk index to send logs to.

### Provider-specific requirements

## Installing the Observability Pipelines Worker

## Load balancing

## Buffering

## Working with data

## Processing logs

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
