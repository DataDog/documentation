---
title: Installing the trace Agent from source

aliases:
  - /tracing/faq/trace-agent-from-source/
---

## Install from source

1. Install `Go 1.11+`. For more information, see the steps on the [official Go website][1].
2. Clone the [Datadog Agent repo][2].
3. Run this command in the root of the `datadog-agent` repository:
    ```bash
    go install ./cmd/trace-agent
    ```

4. Run the Agent using `trace-agent` (assuming the path `$GOPATH/bin` is in your system's `$PATH`).

### Troubleshooting

Check the Agent output or logs (`/var/log/datadog/trace-agent.log` on Linux) to ensure that traces seem correct
and that they are reaching the Datadog API.

[1]: https://golang.org/dl
[2]: https://github.com/DataDog/datadog-agent
