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

<div class="alert alert-danger">Only enter the identifiers for the socket address, and if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

1.  Enter the identifier for your socket address. If you leave it blank, the [default](#set-secrets) is used.
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
- Enter the identifier for your socket key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

## Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Socket address identifier:
	- The default identifier is `SOURCE_SOCKET_ADDRESS`.
- Socket TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_SOCKET_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/