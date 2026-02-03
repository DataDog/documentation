---
title: WebSocket Observability
description: Trace WebSocket connections, messages, and life cycle events in your applications with Datadog APM.
further_reading:
  - link: '/tracing/'
    tag: 'Documentation'
    text: 'Learn about Datadog APM tracing'
  - link: '/tracing/glossary/'
    tag: 'Documentation'
    text: 'APM Terminology and Overview'
---

## Overview

WebSocket observability provides comprehensive tracing for WebSocket connections in your applications. This feature captures the HTTP handshake, incoming and outgoing messages, and connection close events, enabling you to monitor the full life cycle of WebSocket sessions in your traces.

## Requirements

### Tracer versions

The following tracer versions support WebSocket observability out of the box:

| Tracer   | Version    |
|----------|------------|
| Node.js  | `>=5.82.0` |
| Python   | `>=4.3.0`  |
| Java     | `>=1.59.0` |
| PHP      | `>=1.8.0`  |

### Compatible libraries

The following library versions are supported:

| Language | Library             | Version   |
|----------|---------------------|-----------|
| Node.js  | `ws`                | `>=8.0.0` |
| Python   | ASGI                | `>=2.0`   |
| Java     | `javax.websocket`   | `>=1.0`   |
| Java     | `jakarta.websocket` | `>=2.0`   |
| PHP      | `ratchet/pawl`      | `>=0.4`   |
| PHP      | `cboden/ratchet`    | `>=0.4`   |

## How it works

WebSocket observability traces the complete life cycle of a WebSocket session:

1. **HTTP Handshake**: The initial HTTP upgrade request that establishes the WebSocket connection
2. **Incoming Messages**: Messages received by your application
3. **Outgoing Messages**: Messages sent from your application
4. **Connection Close**: When the WebSocket connection is terminated

Each incoming WebSocket message creates a separate trace. Incoming, outgoing, and close spans link back to the original HTTP handshake span using span links. This approach keeps traces manageable while maintaining the relationship between the handshake and all subsequent messages.

### Trace structure

**HTTP Handshake**
- Regular HTTP server or client span
- Terminated when the connection is upgraded (not when the connection closes)
- Tagged with `http.upgraded: websocket`

**Message Spans**
- Each incoming message creates a new trace root with a link to the handshake span
- Each outgoing message creates a span in the current trace context with a link to the handshake span
- Span links use the `dd.kind` attribute to indicate the relationship:
  - `executed_by`: For incoming messages
  - `resuming`: For outgoing messages

**Close Spans**
- Connection close initiated by peer: Creates a new trace root (like incoming messages)
- Connection close initiated locally: Creates a span in the current trace (like outgoing messages)

## Configuration

### Control sampling behavior

Incoming WebSocket message traces inherit the sampling decision from the HTTP handshake trace by default. This helps capture complete WebSocket sessions are captured and prevents incomplete traces.

This sampling decision cannot be applied to all outgoing WebSocket messages. For example, an application may listen for messages on a Kafka queue and send a WebSocket message after one is received. If the Kafka queue consumption is not sampled, the associated WebSocket send is also not sampled.

```sh
# Inherit sampling from handshake (default)
DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING=true

# Sample messages independently
DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING=false
```

Setting this to `false` is useful for low-volume WebSocket applications where you want messages to be sampled even with low sampling rates.

### Separate traces vs single trace

By default, WebSocket messages create separate traces linked to the handshake. For short-lived WebSocket connections, you can keep all messages in a single trace:

```sh
# Create separate traces for each message (default)
DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES=true

# Keep all messages in the handshake trace
DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES=false
```

Use `false` for applications that connect, exchange a few messages, and close the connection immediately.

### Tag session IDs

If your WebSocket library provides a session ID, you can include it in span tags:

```sh
DD_TRACE_WEBSOCKET_TAG_SESSION_ID=true
```

<div class="alert alert-info">Not all WebSocket libraries have a built-in session ID concept. If your library doesn't provide one, this setting has no effect. Tracers do not generate session IDs.</div>

### Disable WebSocket observability

To disable WebSocket tracing, set the environment variable to `false`:

```sh
DD_TRACE_WEBSOCKET_MESSAGES_ENABLED=false
```

## Span tags and metrics

### HTTP handshake span

| Tag Name | Value | Type |
|----------|-------|------|
| `http.upgraded` | `websocket` | meta |
| `websocket.session.id` | Session identifier (if available and tagging enabled) | meta |

### Incoming message spans

**Semantic Conventions**
- **Service**: Same as HTTP handshake span
- **Operation**: `websocket.receive`
- **Resource**: `websocket` followed by the handshake resource name without HTTP method (for example, `websocket /ws`)
- **Span kind**: `consumer`
- **Span type**: `websocket`

**Tags**

| Tag Name | Value | Type |
|----------|-------|------|
| `websocket.message.type` | `text` or `binary` | meta |
| `websocket.session.id` | Session identifier (if available and tagging enabled) | meta |
| `websocket.message.length` | Message size in bytes | metrics |
| `websocket.message.frames` | Number of frames in the message | metrics |
| `websocket.message.receive_time` | Total time in nanoseconds to receive all frames | metrics |
| `websocket.duration.style` | `handler` or `blocking` (see Duration Styles below) | meta |
| `_dd.dm.inherited` | `1` (indicates inherited sampling decision) | metrics |
| `_dd.dm.service` | Service name of the decision maker span | meta |
| `_dd.dm.resource` | Resource name of the decision maker span | meta |

**Duration Styles**
- **handler**: The span measures the lifetime of a handler function that processes the message
- **blocking**: The span measures from when a blocking read completes until the next read begins (for async iterators or blocking loops, only used by Python)

### Outgoing message spans

**Semantic Conventions**
- **Service**: Inherits from parent span or uses default service name
- **Operation**: `websocket.send`
- **Resource**: `websocket` followed by the handshake resource name without HTTP method (for example, `websocket /ws`)
- **Span kind**: `producer`
- **Span type**: `websocket`

**Tags**

| Tag Name | Value | Type |
|----------|-------|------|
| `websocket.message.type` | `text` or `binary` | meta |
| `websocket.session.id` | Session identifier (if available and tagging enabled) | meta |
| `websocket.message.length` | Message size in bytes | metrics |
| `websocket.message.frames` | Number of frames in the message | metrics |
| `websocket.message.send_time` | Total time in nanoseconds to send all frames | metrics |

### Connection close spans

**Semantic Conventions**
- **Service**: Same as HTTP handshake span
- **Operation**: `websocket.close`
- **Resource**: `websocket` followed by the handshake resource name without HTTP method (for example, `websocket /ws`)
- **Span kind**: `consumer` (if closed by peer) or `producer` (if closed locally)
- **Span type**: `websocket`

**Tags**

| Tag Name | Value | Type |
|----------|-------|------|
| `websocket.session.id` | Session identifier (if available and tagging enabled) | meta |
| `websocket.close.code` | WebSocket close status code | meta |
| `websocket.close.reason` | Close reason string (if provided) | meta |
| `_dd.dm.inherited` | `1` (only when closed by peer) | metrics |
| `_dd.dm.service` | Service name of the decision maker span (only when closed by peer) | meta |
| `_dd.dm.resource` | Resource name of the decision maker span (only when closed by peer) | meta |

## Distributed tracing

To support distributed tracing, tools like Datadog inject metadata into messages. For protocols like HTTP or Kafka, this means adding metadata to headers. While the initial WebSocket handshake supports headers, individual message send and receive operations do not. Some libraries support adding arbitrary data (for example, if a message is guaranteed to be a JSON object), but this is not guaranteed across all libraries. For this reason, Datadog does not support adding distributed tracing metadata to WebSocket messages.

However, since tracing information is known during the handshake and each message can be counted, a trace identifier can be inferred by combining a connection identifier with the message counter.

Distributed tracing associates upstream operations with downstream operations. However, other features like baggage propagation are not supported.

## Span pointers

Span pointers connect related WebSocket messages using span links with the following attributes:

| Attribute | Value |
|-----------|-------|
| `link.name` | `span-pointer-down` (outgoing) or `span-pointer-up` (incoming) |
| `dd.kind` | `span-pointer` |
| `ptr.kind` | `websocket` |
| `ptr.dir` | `d` (outgoing) or `u` (incoming) |
| `ptr.hash` | Hash combining trace ID, span ID, and message counter |

The message counter increments separately for sent and received messages, allowing precise correlation between related messages in distributed WebSocket communications.

Within the Datadog trace view interface the span link is clickable, allowing you to jump between individual spans and the handshake.

## Trace statistics

WebSocket spans generate separate trace statistics from HTTP spans due to distinct operation names:

- `websocket.receive`
- `websocket.send`
- `websocket.close`

This separation keeps WebSocket traffic from affecting your existing HTTP metrics and dashboards. The Datadog Agent automatically calculates statistics for these spans based on their `consumer` and `producer` span kinds.

## Best practices

- **Short-lived connections**: Use `DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES=false` for WebSocket connections that exchange only a few messages
- **Long-lived connections**: Keep the default `DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES=true` to prevent traces from becoming too large
- **High-volume applications**: Consider sampling configuration to control trace volume while maintaining visibility
- **Session tracking**: Enable `DD_TRACE_WEBSOCKET_TAG_SESSION_ID=true` if your library provides session IDs for easier debugging

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
