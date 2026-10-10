---
title: Dual Ship Logs from Splunk to Datadog BYOC Logs
description: "Dual ship logs from Splunk Heavy Forwarders to BYOC Logs "
aliases:
  - /byoc-logs/guides/migrate_from_splunk_heavy_forwarders/
further_reading:
- link: "/byoc-logs/install/"
  tag: "Documentation"
  text: "Install BYOC Logs"
- link: "/byoc-logs/guides/send_otel_logs_observability_pipelines/"
  tag: "Documentation"
  text: "Send OpenTelemetry Logs with Observability Pipelines"
- link: "/observability_pipelines/sources/splunk_tcp/"
  tag: "Documentation"
  text: "Splunk Heavy or Universal Forwarders (TCP) Source"
- link: "/observability_pipelines/destinations/datadog_byoc_logs/"
  tag: "Documentation"
  text: "Datadog BYOC Logs Destination"
- link: "/byoc-logs/operate/search_logs/"
  tag: "Documentation"
  text: "Search BYOC Logs"
---

## Overview

This guide walks through dual shipping application logs to Splunk and Datadog BYOC (Bring Your Own Cloud) Logs while keeping your existing Splunk forwarders in place. 

While deploying the OpenTelemetry (OTel) Collector or Datadog Agent is the recommended long-term collection architecture (see [Send OpenTelemetry Logs with Observability Pipelines](/byoc-logs/guides/send_otel_logs_observability_pipelines/)), replacing collection agents across enterprise infrastructure requires time and cross-team coordination. Dual shipping through your existing Splunk forwarders allows you to evaluate and adopt BYOC Logs without modifying application hosts or deploying new collectors immediately.

During dual shipping, you can run both systems in parallel to validate search queries, dashboards, and retention policies in BYOC Logs without impacting your production Splunk deployment.

### Why use a Splunk Heavy Forwarder?

Splunk Universal Forwarders (UFs) are lightweight agents that stream binary "cooked" data over the proprietary Splunk-to-Splunk (S2S) protocol to indexers on port `9997`. By default, a Universal Forwarder does not parse events. Line breaking, multiline aggregation, and index-time transforms run downstream on an indexer or Heavy Forwarder.

A Universal Forwarder can run some parsing processors locally with `force_local_processing = true` in `inputs.conf` (the linebreaker, aggregator, and regexreplacement processors), but this approach still cannot serialize events to JSON or fan out a copy to a second destination. The setting also increases CPU and memory consumption on the forwarder, and Splunk recommends against it unless advised.

Forwarding logs to BYOC Logs requires two operations that a full Splunk Enterprise instance (a Heavy Forwarder) provides:

- **Serialize events to structured JSON (`INGEST_EVAL` with `json_object()`)**: Packaging the log body and Splunk metadata (`host`, `source`, `sourcetype`, `index`, `_time`) into a JSON envelope requires index-time eval transforms that run in the indexing pipeline, which Universal Forwarders do not execute.
- **Clone and route an independent event stream (`CLONE_SOURCETYPE`)**: In fan-out architectures (Option B), duplicating an event into separate streams for Splunk and Observability Pipelines requires routing transforms that run only on a Heavy Forwarder or indexer.

A Heavy Forwarder therefore acts as a parsing and translation tier:

1. The Heavy Forwarder receives cooked Splunk-to-Splunk data from Universal Forwarders.
2. The Heavy Forwarder parses and stitches multiline events (such as Java stack traces or JSON payloads) into single logical events.
3. The Heavy Forwarder packages the log body and Splunk metadata (`host`, `source`, `sourcetype`, `index`, `_time`) into a JSON envelope.
4. The Heavy Forwarder streams newline-delimited raw JSON over TCP (port `9998`) to the Observability Pipelines Worker (OPW).
5. The Observability Pipelines Worker parses the JSON, maps fields to standard Datadog attributes, and forwards the logs to the BYOC Logs engine intake.

This guide focuses on forwarding live log traffic. It does not cover historical Splunk bucket re-indexing, search knowledge object conversion, or dashboard conversion.

---



## Architecture and topologies

Depending on your existing Splunk architecture and risk requirements, choose between two deployment topologies:


| Criteria                      | Option A: Universal Forwarder dual ships                                                                            | Option B: Heavy Forwarder fans out                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Best suited when**          | Your environment does not use Heavy Forwarders, or you want zero operational risk to your existing Splunk indexers. | You already have an existing Heavy Forwarder tier routing all log traffic.                                     |
| **Configuration changes**     | Universal Forwarder `outputs.conf`, plus a new dedicated Heavy Forwarder tier.                                      | Heavy Forwarder `props.conf`, `transforms.conf`, and `outputs.conf`. No changes on Universal Forwarders.       |
| **Failure isolation**         | Isolated. A failure in the Heavy Forwarder or BYOC Logs path cannot block the primary Splunk path.                  | Shared. Heavy Forwarder resource limits or unhandled queue backpressure can impact both destinations.          |
| **Network egress**            | Doubles network egress from application servers running Universal Forwarders.                                       | Egress from application servers remains 1x. Outbound network traffic increases only from the Heavy Forwarders. |
| **Configuration walkthrough** | [Jump to Option A walkthrough](#option-a-walkthrough-universal-forwarder-dual-ships)                                | [Jump to Option B walkthrough](#option-b-walkthrough-heavy-forwarder-fans-out)                                 |




### Option A — Universal Forwarder dual ships

The Universal Forwarder sends two cooked Splunk-to-Splunk streams simultaneously: the primary stream to your existing Splunk indexers, and a secondary stream to a dedicated Heavy Forwarder tier. The Heavy Forwarder processes and serializes only the secondary stream destined for BYOC Logs.

{{< img src="/cloudprem/guides/splunk-migration/splunk-to-byoc-option-a.png" alt="Diagram showing the Universal Forwarder sending logs to Splunk indexers and to a Heavy Forwarder that sends logs to BYOC Logs through Observability Pipelines" style="width:100%;" >}}

### Option B — Heavy Forwarder fans out

The Universal Forwarder continues sending to your existing Heavy Forwarder tier. After the Heavy Forwarder reconstructs the complete multiline event, it clones the event. The original event continues to Splunk indexers or Splunk Cloud, and the cloned event is serialized into JSON and forwarded to Observability Pipelines.

{{< img src="/cloudprem/guides/splunk-migration/splunk-to-byoc-option-b.png" alt="Diagram showing the Heavy Forwarder sending logs to Splunk Cloud and BYOC Logs through Observability Pipelines" style="width:100%;" >}}

---



## Network and protocol requirements

Configure network connectivity and firewall rules between components according to the following matrix:


| Source                         | Destination                    | Port   | Protocol         | Payload format                                            |
| ------------------------------ | ------------------------------ | ------ | ---------------- | --------------------------------------------------------- |
| Universal Forwarder            | Splunk Indexers                | `9997` | TCP (Splunk S2S) | Binary cooked data with Splunk ACK and TLS                |
| Universal Forwarder            | Heavy Forwarder                | `9997` | TCP (Splunk S2S) | Binary cooked data with Splunk ACK and TLS                |
| Heavy Forwarder                | Observability Pipelines Worker | `9998` | Raw TCP          | Streaming newline-delimited JSON (`sendCookedData=false`) |
| Observability Pipelines Worker | BYOC Logs Engine               | `7280` | HTTP / REST      | HTTP POST to `/api/v2/logs`                               |


The raw TCP connection from the Heavy Forwarder to Observability Pipelines does not implement the Splunk indexer acknowledgement protocol. Set `useACK = false` on the Heavy Forwarder raw output group and configure queue policies to manage backpressure.

---



## Prerequisites

- A running [BYOC Logs deployment](/byoc-logs/install/).
- Access to [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
- Administrative access to the Universal Forwarders and Heavy Forwarders configured for dual shipping.
- Network routing and security groups configured according to the port matrix above.
- Helm v3 installed for deploying the Observability Pipelines Worker.

---



## Step 1: Create the Observability Pipeline

Create a pipeline in Observability Pipelines that receives raw JSON streams from the Heavy Forwarder and routes them to BYOC Logs:

1. In Datadog, navigate to [Observability Pipelines][2].
2. Create a new logs pipeline.
3. Add a [Splunk Heavy or Universal Forwarders (TCP) source][3].
4. Set the source address to `0.0.0.0:9998`.
5. Add a **Remap** processor immediately after the source with the following Vector Remap Language (VRL) script:
  ```vrl
   # Parse the JSON envelope emitted by the Splunk Heavy Forwarder
   . = parse_json!(.message)

   # Map Splunk metadata to Datadog standard attributes
   if exists(.md_orig_host) {
       .host = .md_orig_host
   }
   if exists(.spl_sourcetype) {
       .service = .spl_sourcetype
   }
   .ddsource = "splunk"

   # Preserve the original event timestamp from Splunk _time (epoch seconds)
   if exists(.md_orig_time) {
       .timestamp = to_timestamp!(to_int!(.md_orig_time))
   }
  ```
   The remap processor unpacks the JSON envelope created by the Heavy Forwarder. After parsing, `.message` contains the intact multiline application event, and original Splunk fields (`.spl_index`, `.spl_sourcetype`, `.md_orig_host`, `.md_orig_source`, and `.md_orig_time`) are available as structured attributes.
6. Add a [Datadog BYOC Logs destination][4].
7. Save the pipeline and record the generated **Pipeline ID**.

---



## Step 2: Deploy the Observability Pipelines Worker

Deploy the Observability Pipelines Worker in the same network or Kubernetes cluster as your BYOC Logs deployment.

Use the following Helm command to install the Worker:

```shell
helm upgrade --install opw datadog/observability-pipelines-worker \
  --set datadog.apiKey=<DATADOG_API_KEY> \
  --set datadog.site=<DATADOG_SITE> \
  --set datadog.pipelineId=<PIPELINE_ID> \
  --set env[0].name=DD_OP_SOURCE_SPLUNK_TCP_ADDRESS,env[0].value='0.0.0.0:9998' \
  --set env[1].name=DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL,env[1].value='http://<BYOC_LOGS_ENDPOINT>:7280' \
  --set service.ports[0].name=splunk-tcp,service.ports[0].protocol=TCP,service.ports[0].port=9998,service.ports[0].targetPort=9998
```

Replace:

- `<DATADOG_API_KEY>`: Your Datadog API key.
- `<DATADOG_SITE>`: Your Datadog site (for example, `datadoghq.com` or `datadoghq.eu`).
- `<PIPELINE_ID>`: The Pipeline ID obtained in Step 1.
- `<BYOC_LOGS_ENDPOINT>`: The hostname or cluster-internal service URL for your BYOC Logs intake service. The URL must include port `7280`.

Expose the Worker service so that Splunk Heavy Forwarders can reach it on port `9998`.

---



## Option A walkthrough: Universal Forwarder dual ships

In Option A, the Universal Forwarder sends a second cooked stream to a dedicated Heavy Forwarder. The Heavy Forwarder processes and serializes only the secondary stream destined for BYOC Logs.

### Configuration layout

Manage the configuration through a dedicated Splunk app:

```text
Universal Forwarder
$SPLUNK_HOME/etc/apps/byoc_dual_ship_uf/local/
├── inputs.conf
├── outputs.conf
└── props.conf              # Required if multiple active Heavy Forwarders are configured

Heavy Forwarder
$SPLUNK_HOME/etc/apps/byoc_dual_ship_hf/local/
├── inputs.conf
├── outputs.conf
├── props.conf
└── transforms.conf
```



### 1. Universal Forwarder input (`inputs.conf`)

The Universal Forwarder monitors the log file and attaches metadata:

```ini
[monitor:///var/log/acme/orders.log]
disabled = 0
host = app-01
index = orders
sourcetype = acme:orders
```



### 2. Universal Forwarder outputs (`outputs.conf`)

Add the Heavy Forwarder group to `defaultGroup` alongside your existing Splunk indexers. Both groups receive cooked Splunk-to-Splunk data:

```ini
[tcpout]
defaultGroup = splunk_indexers,byoc_hf
indexAndForward = false

[tcpout:splunk_indexers]
server = <splunk-indexer-1>:9997,<splunk-indexer-2>:9997
sendCookedData = true
# Retain existing TLS, ACK, queue, and load-balancing settings.

[tcpout:byoc_hf]
server = <byoc-heavy-forwarder-1>:9997
sendCookedData = true
forceTimebasedAutoLB = false
# Non-blocking cloning protects the primary Splunk path if the HF is unavailable
blockOnCloning = false
```

**Key parameters**:

- `blockOnCloning = false`: Prevents an unavailable or slow Heavy Forwarder from blocking the Universal Forwarder. The forwarder drops events from the secondary queue instead of blocking log delivery to your production Splunk indexers.
- `forceTimebasedAutoLB = false`: Prevents mid-event receiver switching on multiline logs.



#### Handling multiple active Heavy Forwarders

If the `byoc_hf` group contains multiple active receivers, time-based load balancing can switch connections in the middle of a multiline event. Add an `EVENT_BREAKER` rule to the Universal Forwarder's `props.conf` to switch receivers only at event boundaries:

```ini
[acme:orders]
EVENT_BREAKER_ENABLE = true
EVENT_BREAKER = ([\r\n]+)(?=\d{4}-\d{2}-\d{2}\s)
```



### 3. Heavy Forwarder listener (`inputs.conf`)

On the Heavy Forwarder, configure a standard cooked Splunk-to-Splunk listener:

```ini
[splunktcp://9997]
disabled = 0
```

Apply your organization's TLS settings and firewall rules to restrict inbound connections to authorized Universal Forwarders.

### 4. Heavy Forwarder multiline parsing (`props.conf`)

The Heavy Forwarder reconstructs continuation lines into a single logical event before serialization:

```ini
[acme:orders]
SHOULD_LINEMERGE = true
BREAK_ONLY_BEFORE = ^\d{4}-\d{2}-\d{2}\s
TIME_PREFIX = ^
TIME_FORMAT = %Y-%m-%d %H:%M:%S.%3N %z
MAX_TIMESTAMP_LOOKAHEAD = 30
TRUNCATE = 0
TRANSFORMS-byoc = encode_acme_orders_for_byoc
```

Setting `TRUNCATE = 0` removes line length limits so large stack traces are not split prematurely.

### 5. Heavy Forwarder JSON serialization (`transforms.conf`)

In `transforms.conf`, use `json_object()` to package the reconstructed `_raw` text and metadata into a JSON string:

```ini
[encode_acme_orders_for_byoc]
INGEST_EVAL = queue=if(match(_raw, "^[\\x00-\\x20]*$"), "nullQueue", queue), _raw=json_object("message", _raw, "md_orig_host", host, "md_orig_source", source, "spl_sourcetype", "acme:orders", "spl_index", index, "md_orig_time", _time)
```

**What this evaluation does**:

- Discards empty or whitespace-only records by routing them to `nullQueue`.
- Packages the complete multiline `_raw` log into the `message` field.
- Preserves the original `host`, `source`, `sourcetype`, and `index`.
- Captures the original Splunk event time (`_time`) as `md_orig_time` to preserve event timestamps after network transit.

The resulting JSON record sent across the wire:

```json
{
  "message": "2026-09-01 14:00:00.123 +0000 ERROR order_id=demo-123 checkout failed\njava.lang.IllegalStateException: payment gateway timeout\n\tat com.acme.checkout.PaymentService.charge(PaymentService.java:42)",
  "md_orig_host": "app-01",
  "md_orig_source": "/var/log/acme/orders.log",
  "spl_sourcetype": "acme:orders",
  "spl_index": "orders",
  "md_orig_time": 1788271200.123
}
```



### 6. Heavy Forwarder raw TCP output (`outputs.conf`)

Configure the Heavy Forwarder to send raw JSON to the Observability Pipelines Worker:

```ini
[tcpout]
defaultGroup = byoc_logs
indexAndForward = false
forwardedindex.filter.disable = true

[tcpout:byoc_logs]
server = <op-worker>:9998
sendCookedData = false
compressed = false
useACK = false
maxQueueSize = 50MB
dropEventsOnQueueFull = 100
```

**Required settings**:

- `sendCookedData = false`: Transmits plain JSON text instead of binary S2S framing.
- `compressed = false`: Disables Splunk wire compression so Observability Pipelines can read the TCP stream directly.
- `useACK = false`: Observability Pipelines does not implement Splunk indexer acknowledgement.
- `dropEventsOnQueueFull = 100`: If Observability Pipelines is temporarily unreachable and the 50 MB in-memory queue fills up, old events are dropped to prevent the Heavy Forwarder from running out of memory.

---



## Option B walkthrough: Heavy Forwarder fans out

In Option B, Universal Forwarders continue sending to your existing Heavy Forwarder tier without configuration changes. The Heavy Forwarder stitches multiline events, then creates an unchanged copy for Splunk and a serialized clone for Observability Pipelines.

### 1. Universal Forwarder configuration

Universal Forwarders require no modifications. They send cooked data to the Heavy Forwarder as usual:

```ini
[tcpout:heavy_forwarder]
server = <heavy-forwarder-1>:9997
sendCookedData = true
```



### 2. Heavy Forwarder multiline parsing and cloning (`props.conf`)

In `props.conf`, reconstruct the multiline event, then clone the event for BYOC Logs:

```ini
[acme:orders]
SHOULD_LINEMERGE = true
BREAK_ONLY_BEFORE = ^\d{4}-\d{2}-\d{2}\s
TIME_PREFIX = ^
TIME_FORMAT = %Y-%m-%d %H:%M:%S.%3N %z
MAX_TIMESTAMP_LOOKAHEAD = 30
TRUNCATE = 0
TRANSFORMS-byoc-clone = clone_acme_orders_for_byoc

[byoc_clone_acme_orders]
TRANSFORMS-byoc = route_acme_orders_clone_to_byoc, encode_acme_orders_clone_for_byoc
```



### 3. Heavy Forwarder cloning and routing transforms (`transforms.conf`)

In `transforms.conf`, define the clone operation, output routing, and JSON serialization:

```ini
[clone_acme_orders_for_byoc]
REGEX = .
FORMAT = byoc_clone::true
WRITE_META = true
CLONE_SOURCETYPE = byoc_clone_acme_orders

[route_acme_orders_clone_to_byoc]
REGEX = .
DEST_KEY = _TCP_ROUTING
FORMAT = opw_raw

[encode_acme_orders_clone_for_byoc]
INGEST_EVAL = queue=if(match(_raw, "^[\\x00-\\x20]*$"), "nullQueue", queue), _raw=json_object("message", _raw, "md_orig_host", host, "md_orig_source", source, "spl_sourcetype", "acme:orders", "spl_index", index, "md_orig_time", _time)
```

**How cloning works**:

- `CLONE_SOURCETYPE` creates a duplicate event in memory after multiline merging has completed.
- The original event keeps the `acme:orders` sourcetype and continues to Splunk indexers.
- The cloned event receives the `byoc_clone_acme_orders` sourcetype.
- `_TCP_ROUTING = opw_raw` directs the cloned event exclusively to the Observability Pipelines output group.



### 4. Heavy Forwarder outputs (`outputs.conf`)

Route the original events to Splunk and cloned events to Observability Pipelines:

```ini
[tcpout]
defaultGroup = splunk_indexers
indexAndForward = false
forwardedindex.filter.disable = true

[tcpout:splunk_indexers]
server = <splunk-indexer-1>:9997,<splunk-indexer-2>:9997
sendCookedData = true
# Retain existing TLS, ACK, and queue settings.

[tcpout:opw_raw]
server = <op-worker>:9998
sendCookedData = false
compressed = false
useACK = false
maxQueueSize = 50MB
dropEventsOnQueueFull = 100
```

---



## Validation and verification

Verify end-to-end log flow before expanding dual shipping to additional sourcetypes or forwarder groups:

### 1. Test network connectivity

From the Heavy Forwarder host, verify that the Observability Pipelines Worker is reachable on port `9998`:

```shell
nc -zv <op-worker> 9998
```

You can test manual event submission using netcat:

```shell
echo '{"message":"canary test event","md_orig_host":"test-host","spl_sourcetype":"acme:orders","spl_index":"orders","md_orig_time":1788271200}' | nc <op-worker> 9998
```



### 2. Verify Worker intake

Check the Observability Pipelines Worker pod logs for successful connections and event processing:

```shell
kubectl logs -l app=observability-pipelines-worker --tail=100
```



### 3. Inspect logs in Datadog

1. In Datadog, navigate to the [Log Explorer][5].
2. In the left facet panel under {{< ui >}}BYOC INDEXES{{< /ui >}}, select your BYOC Logs index.
3. Search for logs using attributes from the configured sourcetype:
  ```text
   service:acme:orders
  ```
4. Verify:
  - Multiline stack traces appear as a single event with formatted line breaks.
  - Host and source tags reflect the original values.
  - Timestamps match the original event timestamp (`_time`).

---



## Production best practices and edge cases



### Handling large events and TCP framing

A TCP packet is a stream segment, not an application message boundary. Large events can span multiple TCP packets:

- In Splunk `props.conf`, set `TRUNCATE = 0` (or a known upper limit such as `250000`) to prevent line truncation.
- Set `MAX_EVENTS` sufficiently high if individual multiline records contain thousands of lines.
- Do not add explicit newline characters (`\n`) to `_raw` in `INGEST_EVAL`. Splunk raw `tcpout` appends the record delimiter automatically.
- Check intermediate load balancers (such as AWS NLB or ALB) for connection idle timeouts or request size limits.
- On the Observability Pipelines Worker, use the `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` environment variable if you need to enforce a maximum allowable frame size.



### Capacity planning for Heavy Forwarders

Option B (HF fan-out) increases CPU and memory consumption on the Heavy Forwarder tier because of in-memory cloning and JSON encoding:

- Provision at least 20% to 30% additional CPU headroom on Heavy Forwarders when enabling `CLONE_SOURCETYPE`.
- Benchmark Heavy Forwarder throughput with production traffic before dual shipping latency-sensitive sourcetypes.

---



## Troubleshooting



### Multiline logs appear as separate events in BYOC Logs

- The Heavy Forwarder did not apply the line-merging rule. Verify that `SHOULD_LINEMERGE = true` and `BREAK_ONLY_BEFORE` are present in `props.conf`.
- For Option B, verify that `clone_acme_orders_for_byoc` is invoked in `TRANSFORMS` after line merging, rather than before.



### Events reach Observability Pipelines but do not appear in BYOC Logs

- Check the Observability Pipelines Worker logs for VRL parsing failures:
  ```shell
  kubectl logs -l app=observability-pipelines-worker | grep -i "error"
  ```
- Confirm that `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL` specifies port `7280` (for example, `http://byoc-logs-indexer:7280`).
- Confirm that network policies and firewalls permit outbound HTTP traffic from the Worker to the BYOC Logs cluster.



### Splunk Heavy Forwarder memory usage grows unexpectedly

- If the Observability Pipelines Worker endpoint is unreachable, the raw TCP queue can fill up.
- Verify that `maxQueueSize` and `dropEventsOnQueueFull` are configured on the `[tcpout:opw_raw]` or `[tcpout:byoc_logs]` stanza.

---



## Splunk configuration references

- `props.conf` [reference](https://help.splunk.com/en/data-management/splunk-enterprise-admin-manual/9.4/configuration-file-reference/9.4.6-configuration-file-reference/props.conf)
- `outputs.conf` [reference](https://help.splunk.com/en/data-management/splunk-enterprise-admin-manual/9.4/configuration-file-reference/9.4.7-configuration-file-reference/outputs.conf)
- `transforms.conf` [reference](https://help.splunk.com/en/data-management/splunk-enterprise-admin-manual/9.4/configuration-file-reference/9.4.7-configuration-file-reference/transforms.conf)
- [Configure event line breaking](https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/10.2/configure-event-processing/configure-event-line-breaking)
- [Forward data to third-party systems](https://help.splunk.com/en/splunk-enterprise/forward-and-process-data/forwarding-and-receiving-data/9.4/perform-advanced-configuration/forward-data-to-third-party-systems)

---



## Further reading

{{< partial name="whats-next/whats-next.html" >}}
