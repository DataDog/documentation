---
title: Serverless Monitoring Guides
kind: guide
private: true
disable_toc: true
cascade:
    algolia:
        rank: 20
        category: Guide
        subcategory: Serverless Monitoring Guides
---

## General serverless guides

{{< whatsnext desc="Best practices for monitoring your serverless applications" >}}
    {{< nextlink href="/serverless/guide/connect_invoking_resources" >}}Deeper visibility into resources invoking Lambda functions{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_warnings" >}}Serverless Warnings{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tagging" >}}Serverless Tagging{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/agent_configuration" >}}Agent Configuration{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/opentelemetry" >}}Serverless and OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Azure App Service and Container Apps" >}}
    {{< nextlink href="/serverless/guide/azure_app_service_linux_sidecar" >}}Instrumenting Linux containers on Azure App Service using Azure Sidecar{{< /nextlink >}}
{{< /whatsnext >}}

## Install using the Datadog Forwarder

{{< whatsnext desc="Installation instructions for applications previously set up to be monitored using the Datadog Forwarder" >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_node" >}}Instrumenting Node.js Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_python" >}}Instrumenting Python Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_java" >}}Instrumenting Java Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_go" >}}Instrumenting Go Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_dotnet" >}}Instrumenting .NET Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/extension_motivation" >}}Deciding to migrate to the Datadog Lambda Extension{{< /nextlink >}}
{{< /whatsnext >}}

## Troubleshoot your installation

{{< whatsnext desc="Common installation issues and tips for troubleshooting" >}}
    {{< nextlink href="/serverless/troubleshooting" >}}Troubleshooting Serverless Monitoring{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tracing_and_webpack" >}}Node.js Lambda Tracing and Webpack Compatibility{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_package_too_large" >}}Troubleshooting Serverless Package Too Large Errors{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/handler_wrapper" >}}Wrap Your Lambda Handler in Code{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/layer_not_authorized" >}}Troubleshooting Layer Not Authorized Errors{{< /nextlink >}}
{{< /whatsnext >}}
