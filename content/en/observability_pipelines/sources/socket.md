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

1.  Enter the identifier for your socket address.
    - **Note**: Only enter the identifier for the address. Do **not** enter the actual address.
    - If left blank, the default is used: `SOURCE_SOCKET_ADDRESS`.
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

### Optional settings

If you selected **TCP** mode, toggle the switch to **Enable TLS**. The following certificate and key files are required for TLS.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your socket key pass.
    - **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
    - If left blank, the default is used: `SOURCE_SOCKET_KEY_PASS`.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/