---
title: Trace Proxy Services
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Like any traditionally application, LLM applications can be implemented across multiple different microservices. With LLM Observability, if one of these services is a LLM proxy or gateway service, you can trace the LLM calls made by individual LLM applications in a complete end-to-end trace.

## Enabling LLM Observability for a proxy or gateway service

To enable LLM Observability for a proxy or gateway service that might be called from several different ML applications, you can enable LLM Observability without specifying an ML application name. In its place, specify the service name. This can be used to [filter out spans in LLM observability specific to the proxy or gateway service](#observing-llm-gateway-and-proxy-services).

{{< tabs >}}
{{% tab "Python" %}}

```python
# proxy.py
from ddtrace.llmobs import LLMObs

LLMObs.enable(service="chat-proxy")

# proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// proxy.js
const tracer = require('dd-trace').init({
  llmobs: true,
  service: "chat-proxy"
});
const llmobs = tracer.llmobs;

// proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{< /tabs >}}


In your specific applications that orchestrate the ML applications that make calls to the proxy or gateway service, enable LLM Observability with the ML application name:

{{< tabs >}}
{{% tab "Python" %}}

```python
# application.py
from ddtrace.llmobs import LLMObs
LLMObs.enable(ml_app="my-ml-app")

import requests

if __name__ == "__main__":
    with LLMObs.workflow(name="run-chat"):
      # other application-specific logic - RAG steps, parsing, etc.

      response = requests.post("http://localhost:8080/chat", json={
        # data to pass to the proxy service
      })


      # other application-specific logic handling the response
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// application.js
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: 'my-ml-app'
  }
});
const llmobs = tracer.llmobs;

const axios = require('axios');

async function main () {
  llmobs.trace({ name: 'run-chat', kind: 'workflow' }, async () => {
    // other application-specific logic - RAG steps, parsing, etc.

    // wrap the proxy call in a task span
    const response = await axios.post('http://localhost:8080/chat', {
      // data to pass to the proxy service
    });

    // other application-specific logic handling the response
  });
}

main();
```

{{% /tab %}}
{{< /tabs >}}

When making requests to the proxy or gateway service, the LLM Observability SDKs automatically propagate the ML application name from the original LLM application. The propagated ML application name takes precedence over the ML application name specified in the proxy or gateway service.

## Observing LLM gateway and proxy services

### All requests to the proxy or gateway service

To view all requests to the proxy service as top-level spans, wrap the entrypoint of the proxy service endpoint in a `workflow` span:

{{< tabs >}}
{{% tab "Python" %}}

```python
# proxy.py
from ddtrace.llmobs import LLMObs

LLMObs.enable(service="chat-proxy")

@app.route('/chat')
def chat():
    with LLMObs.workflow(name="chat-proxy-entrypoint"):
        # proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// proxy.js
const tracer = require('dd-trace').init({
  llmobs: true,
  service: "chat-proxy"
});
const llmobs = tracer.llmobs;

app.post('/chat', async (req, res) => {
  await llmobs.trace({ name: 'chat-proxy-entrypoint', kind: 'workflow' }, async () => {
    // proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
    res.send("Hello, world!");
  });
});
```

{{% /tab %}}
{{< /tabs >}}

All requests to the proxy service can now be viewed as top-level spans within the LLM trace view:

1. In the LLM trace view, view `All Applications` from the top-left dropdown.
2. Switch to the `All Spans` view in the top-right dropdown.
3. Filter the list by the `service` tag and the workflow name.

{{< img src="llm_observability/all-spans-with-service-and-span-name.png" alt="View all spans from all ML applications with the service and workflow name tags" style="width:100%;" >}}

The workflow span name can also be filtered by a facet on the left hand side of the trace view:

{{< img src="llm_observability/span-name-facet-for-proxy-service-monitoring.png" alt="Select the workflow span name from the facet on the left hand side of the trace view" style="width:50%;" >}}

### All LLM calls made within the proxy or gateway service

To instead monitor only the LLM calls made within a proxy or gateway service, filter by `llm` spans in the trace view:

{{< img src="llm_observability/all-spans-with-service-and-span-kind.png" alt="View all spans from all ML applications with the service tags and the LLM span kind" style="width:100%;" >}}

This can also be done by filtering the span kind facet on the left hand side of the trace view:

{{< img src="llm_observability/span-kind-facet-for-proxy-service-monitoring.png" alt="Select the LLM span kind facet from the left hand side of the trace view" style="width:50%;" >}}

### Filtering by a specific ML application and observing patterns and trends

Both processes described in the filtering by [top-level calls to the proxy service](#all-llm-calls-made-within-the-proxy-or-gateway-service) and [LLM calls made within the proxy or gateway service](#all-llm-calls-made-within-the-proxy-or-gateway-service) can also be applied to a specific ML application to view its interaction with the proxy or gateway service.

1. In the top-left dropdown, select the ML application of interest.
2. To see all traces for the ML application, switch from the `All Spans` view to the `Traces` view in the top-right dropdown.
3. To see a timeseries of traces for the ML application, switch from a `List` view to a `Timeseries` view in the Traces view while maintaining the `All Span` filter in the top-right dropdown.

{{< img src="llm_observability/timeseries-view-for-proxy-services.png" alt="Switch from a List view to a Timeseries view in the Traces view while maintaining the All Span filter" style="width:100%;" >}}

## Observing end-to-end usage of LLM applications making calls to a proxy or gateway service

To observe the complete end-to-end usage of an LLM application that makes calls to a proxy or gateway service, you can filter for traces with that ML application name:

1. In the LLM trace view, select the ML application name of interest from the top-left dropdown.
2. Switch to the `Traces` view in the top-right dropdown.