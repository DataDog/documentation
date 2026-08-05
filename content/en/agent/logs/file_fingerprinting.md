---
title: File Fingerprinting for Log Rotation
description: Configure the Datadog Agent to use file content to detect log rotation.
further_reading:
- link: "/agent/logs/"
  tag: "Documentation"
  text: "Host Agent Log Collection"
- link: "/agent/logs/advanced_log_collection/"
  tag: "Documentation"
  text: "Advanced Log Collection Configurations"
- link: "/agent/configuration/agent-commands/#agent-information"
  tag: "Documentation"
  text: "Agent information commands"
algolia:
  tags: ['log rotation', 'file fingerprinting']
---

<div class="alert alert-info">This feature requires Agent version <strong>7.72.0+</strong>. Fingerprint configuration appears in the Agent status output starting with Agent version <strong>7.74.0+</strong>.</div>

## Overview

The Datadog Agent normally uses file metadata to detect when a log file rotates or is truncated. On Windows and network filesystems, file metadata can be delayed or unreliable. This can cause the Agent to miss a rotation or collect the same logs more than once.

File fingerprinting calculates a checksum from lines or bytes near the beginning of a file. The Agent compares the checksum with the previously recorded value to identify a replaced or truncated file.

File fingerprinting is disabled by default. Enable it globally for all file log sources or for an individual source.

## Configure file fingerprinting

Choose content that remains unchanged while the Agent tails a file, but differs between consecutive rotated files.

<div class="alert alert-warning">When fingerprinting is enabled, the Agent does not start tailing a new file until the file contains enough lines or bytes to calculate the configured fingerprint. A large <code>count</code> or <code>count_to_skip</code> value can delay collection for small or low-volume files.</div>

{{< tabs >}}
{{% tab "Global configuration" %}}

To enable fingerprinting for all file log sources, add `fingerprint_config` to the Agent's [main configuration file][1] (`datadog.yaml`):

```yaml
logs_config:
  fingerprint_config:
    fingerprint_strategy: line_checksum
    count: 1
    count_to_skip: 0
    max_bytes: 100000
```

{{% /tab %}}
{{% tab "Integration configuration" %}}

To enable fingerprinting for an individual file log source, add `fingerprint_config` to the source's `conf.yaml` file:

```yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    service: myapp
    source: myapp
    fingerprint_config:
      fingerprint_strategy: line_checksum
      count: 1
      count_to_skip: 0
      max_bytes: 100000
```

An integration configuration overrides the global configuration for that source. Specify all settings required by the selected strategy in the integration configuration.

{{% /tab %}}
{{< /tabs >}}

[Restart the Agent][2] to apply the configuration.

## Choose a fingerprint strategy

The Agent supports the following fingerprint strategies:

| Strategy | Description | Considerations |
|---|---|---|
| `line_checksum` | Calculates a checksum from `count` complete lines after skipping `count_to_skip` lines. | Use for line-delimited text logs. The file must contain the configured number of complete lines before collection starts. |
| `byte_checksum` | Calculates a checksum from `count` bytes after skipping `count_to_skip` bytes. | Use when line boundaries are unreliable or log entries can be large. The file must contain the full configured number of bytes before collection starts. |
| `disabled` | Disables file fingerprinting. | Use in a global or integration configuration. |

### Skip identical headers

If each rotated file starts with the same header, skip the header and fingerprint content that differs between files.

For example, the following configuration skips two header lines and fingerprints the next two lines:

```yaml
fingerprint_config:
  fingerprint_strategy: line_checksum
  count: 2
  count_to_skip: 2
  max_bytes: 100000
```

If the selected lines or bytes are identical in consecutive files, the fingerprint does not indicate that the file rotated. Increase `count` or adjust `count_to_skip` to include content that differs between files.

## Configuration reference

| Setting | Type | Default | Description |
|---|---|---|---|
| `fingerprint_strategy` | String | `disabled` | Fingerprint strategy. Valid values are `line_checksum`, `byte_checksum`, and `disabled`. |
| `count` | Integer | `1` line or `1024` bytes | Number of lines or bytes included in the fingerprint. The Agent selects the global default based on `fingerprint_strategy`. Specify this setting in an integration configuration. |
| `count_to_skip` | Integer | `0` | Number of lines or bytes to skip before calculating the fingerprint. |
| `max_bytes` | Integer | `100000` | Maximum number of bytes the Agent reads when calculating a `line_checksum` fingerprint. This setting does not apply to `byte_checksum`. |

Set `count` to a value greater than zero. Set `count_to_skip` to zero or a positive value. For `line_checksum`, set `max_bytes` high enough to contain the skipped lines and the lines included in the fingerprint.

## Verify the configuration

For Agent version 7.74.0 or later, run the [Agent status command][3]:

```shell
sudo datadog-agent status
```

In the **Logs Agent** section, find the file source and inspect its **Fingerprint Config** entry. The entry shows the active strategy, count, skip count, and `max_bytes` value for `line_checksum`.

## Troubleshooting

### A new file is not collected

Check whether the file contains enough content to calculate the fingerprint:

- For `line_checksum`, the file must contain at least `count_to_skip + count` complete lines within `max_bytes`.
- For `byte_checksum`, the file must contain at least `count_to_skip + count` bytes.

Reduce `count` or `count_to_skip` if the file does not reach the configured threshold. Disable fingerprinting for sources that consistently create files smaller than the threshold.

### A rotation is not detected

Compare the lines or bytes selected from consecutive files. If the content is identical, increase `count` or adjust `count_to_skip` to include content that differs between files.

### The Agent reports an invalid configuration

Check the following settings:

- `fingerprint_strategy` is `line_checksum`, `byte_checksum`, or `disabled`.
- `count` is greater than zero when fingerprinting is enabled.
- `count_to_skip` is zero or greater.
- `max_bytes` is greater than zero when using `line_checksum`.

## Disable file fingerprinting

{{< tabs >}}
{{% tab "Global configuration" %}}

To disable fingerprinting globally, update `datadog.yaml`:

```yaml
logs_config:
  fingerprint_config:
    fingerprint_strategy: disabled
```

{{% /tab %}}
{{% tab "Integration configuration" %}}

To disable fingerprinting for one source when it is enabled globally, update the source's `conf.yaml` file:

```yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    service: myapp
    source: myapp
    fingerprint_config:
      fingerprint_strategy: disabled
```

{{% /tab %}}
{{< /tabs >}}

[Restart the Agent][2] to apply the configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /agent/configuration/agent-commands/#agent-information
