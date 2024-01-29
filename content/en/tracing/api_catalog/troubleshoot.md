---
title: Troubleshooting
kind: documentation
is_beta: true
---

If you experience unexpected behavior with Datadog API Catalog, there are a few common issues this guide may help you resolve. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## I cannot find my endpoints

The API Catalog is based on APM tracing, so the first step is to make sure your services are instrumented [link to apm onboarding]. 
If your service is instrumented and you still can't see the endpoints, there are two options:
Upload OpenAPI file - uploading a spec file to the Catalog page will automatically connect any trace seen in traffic to the matching endpoints. You should expect to see the endpoints in the Explorer page soon after uploading (depending on traffic).
Use the Setup wizard to enable auto discovery for the service - not all instrumentation libraries are supported, so you can use the wizard to see if an upgrade is required, or learn how to add missing tags yourself.

## I uploaded an openAPI file, but i do not see any telemetry

The API Catalog is based on APM tracing, so info from traffic is displayed only when we see traces for the endpoint. After uploading an OpenAPI file, you will see deployment data (Last Seen, environments, etc..) once Datadog ingests a span for the endpoint.

## Why i don't see any data when I create a monitor

The API Catalog is based on APM tracing, so info from traffic is displayed only when we see traces for the endpoint. If you do not see data in the monitor graph, it can be one of two options:
The endpoint has not been used yet (since it was registered/ uploaded thorough OpenAPI)
Traces are sampled at agent side [link to apm sampling docs]


[1]: /help/