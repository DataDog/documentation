---
title: Record terminal sessions and processes with CoTerm
---

CoTerm enables you to record terminal sessions and analyze these recordings in Datadog. Investigating terminal sessions provides context about how system and security incidents were caused and remediated.

For your security, CoTerm uses [Sensitive Data Scanner][2] to detect and obfuscate sensitive data, such as passwords and API keys.

## Setup

1. Install CoTerm:

   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://update.coscreen.org/install-ddcoterm.sh' | bash
   ```

2. Initialize and authenticate CoTerm:

   ```shell
   ddcoterm init
   ```

## Usage

Run `ddcoterm` to manually launch CoTerm and record the entirety of your terminal session.

To record the output of an individual command, use `ddcoterm -- <COMMAND>`.

For example, to record the output of `kubectl`, use:

```shell
ddcoterm -- kubectl
```

This launches CoTerm and runs the `kubectl` process. When the process completes, CoTerm stops recording and sends the captured process data to Datadog.

### Make CoTerm part of your workflow

You can configure CoTerm to automatically record certain commands with `shim`. For example:

```shell
ddcoterm shim kubectl
```

After you run this command, CoTerm records all future invocations of `kubectl`.

### Review terminal sessions in Datadog

You can review your recorded terminal sessions and process data in Datadog:

- **As replays**: Watch [terminal sessions][3] in a video-like player.
- **As events**: In [Event Explorer][4], each recorded command appears as an event.
- **As logs**: In [Log Explorer][5], you can perform full-text searches and queries of terminal sessions as multi-line logs.

### Known limitations

- The maximum duration of a recorded session is approximately 24 hours.
- [Sensitive data redaction][2] may fail if the sensitive data is spread across multiple lines.
- On Linux, `seccomp`-based tracing prevents you from elevating your permissions during a recording.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /sensitive_data_scanner/
[3]: http://app.datadoghq.com/terminal-streams
[4]: http://app.datadoghq.com/event/explorer?query=source%3Acoterm_process_info
[5]: https://app.datadoghq.com/logs?query=service%3Addcoterm
