---
title: Socket Source
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Socket source to send logs to the Worker over a socket connection (TCP or UDP). Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/socket %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

1. In the **Mode** dropdown menu, select the socket type to use.
1. In the **Framing** dropdown menu, select how to delimit the stream of events.
    <table>
        <colgroup>
            <col style="width:40%">
            <col style="width:60%">
        </colgroup>
        <thead>
            <tr>
                <th>FRAMING METHOD</th>
                <th>DESCRIPTION</th>
            </tr>
        </thead>
        <tr>
            <td><code>newline_delimited</code></td>
            <td>Byte frames are delimited by a newline character.</td>
        </tr>
        <tr>
            <td><code>bytes</code></td>
            <td>Byte frames are passed through as-is according to the underlying I/O boundaries (for example, split between messages or stream segments).</td>
        </tr>
        <tr>
            <td><code>character_delimited</code></td>
            <td>Byte frames are delimited by a chosen character.</td>
        </tr>
        <tr>
            <td><code>chunked_gelf</code></td>
            <td>Byte frames are chunked GELF messages.</td>
        </tr>
        <tr>
            <td><code>octet_counting</code></td>
            <td>Byte frames are delimited according to the octet counting format.</td>
        </tr>
    </table>

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/