---
title: OpenLineage
description: "Connect OpenLineage to Datadog to capture lineage from custom systems and orchestrators."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability'
  - link: '/data_observability/integrations/openlineage/datadog_agent_for_openlineage'
    tag: 'Documentation'
    text: 'Set up Datadog Agent for OpenLineage Proxy'
---

## Overview

Lineage in Datadog Data Observability is built on [OpenLineage][1], the open source standard for collecting and analyzing data lineage. OpenLineage is especially helpful when you need to:

- Capture lineage from systems Datadog doesn't integrate with natively, such as in-house tools
- Emit lineage events for jobs or orchestrators where building a native Datadog integration would be difficult

Replace the hostname in the examples with the relevant [Datadog site][2] for your organization. You can find your Datadog site by [following these instructions][3]. This example uses `datadoghq.com`.

**Note**: If you wish to configure the Datadog Agent to proxy OpenLineage events, see [Set up Datadog Agent for OpenLineage Proxy][4].

You can send [OpenLineage events][1] to Datadog in three ways:
- [Direct HTTP with curl](#option-1-direct-http-with-curl)
- [OpenLineage Python client (HTTP transport)](#option-2-openlineage-python-client-http-transport)
- [OpenLineage Python client (Datadog transport)](#option-3-openlineage-python-client-datadog-transport)

## Option 1: Direct HTTP with curl

Send a raw [OpenLineage RunEvent][5] as JSON to Datadog's intake endpoint.

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2023-01-01T00:00:00Z",
        "eventType": "START",
        "run": { "runId": "123e4567-e89b-12d3-a456-426614174000" },
        "job": { "namespace": "default", "name": "test-job" },
        "producer": "your-producer-id"
      }'
```

## Option 2: OpenLineage Python client (HTTP transport)

Use the [OpenLineage Python client][6] with a manually specified HTTP transport.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient, OpenLineageClientOptions
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run

client = OpenLineageClient(
    url="https://data-obs-intake.datadoghq.com",
    options=OpenLineageClientOptions(api_key="<DD_API_KEY>")
)

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(namespace="default", name="test-job"),
    producer="your-producer-id"
)

client.emit(event)
```

## Option 3: OpenLineage Python client (Datadog transport)

In OpenLineage 1.37.0+, use the [Datadog transport][7] for automatic configuration and optimized event delivery.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.transport.datadog import DatadogConfig, DatadogTransport

config = DatadogConfig(
    apiKey="your-datadog-api-key",
    site="datadoghq.com"  # Change if using a different Datadog site
)

client = OpenLineageClient(transport=DatadogTransport(config))

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(namespace="default", name="test-job"),
    producer="your-producer-id"
)

client.emit(event)
```

<div class="alert alert-info">For Option 3, you can skip <code>DatadogConfig</code> by using environment variables:

```shell
export DD_API_KEY=your-datadog-api-key
export DD_SITE=datadoghq.com
export OPENLINEAGE__TRANSPORT__TYPE=datadog
```

```python
client = OpenLineageClient.from_environment()
```
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/
[2]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[3]: /getting_started/site/#access-the-datadog-site
[4]: /data_observability/integrations/openlineage/datadog_agent_for_openlineage
[5]: https://openlineage.io/docs/spec/run-cycle/
[6]: https://openlineage.io/docs/client/python
[7]: https://openlineage.io/docs/client/python#datadog-transport
