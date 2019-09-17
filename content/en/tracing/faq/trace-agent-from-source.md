---
title: Installing the trace Agent from source and on Windows
kind: faq
---

## Run on Windows

The Windows trace agent is in beta and some manual steps are required.

On Windows, the trace agent is shipped together with the Datadog Agent 5.19.0 or above.

1. Install the Datadog Agent.
2. Update your config file to include:
    ```
    [Main]
    apm_enabled: yes
    [trace.config]
    log_file = C:\ProgramData\Datadog\logs\trace-agent.log
    ```
3. Restart the datadogagent service:
    ```
    net stop datadogagent
    net start datadogagent
    ```
4. To see the trace agent status, either use the Service tab of the Task Manager, or run:
    ```
    sc.exe query datadog-trace-agent
    ``` 
    Check that the status is "running".

## Install from source

This is beta functionality.

1. Install `Go 1.11+` is installed. For more information, see the steps on the [official website][1].
After cloning the repo, simply run the following command in the root of the `datadog-agent` repository:
2. Clone the [Datadog Agent repo][2]
3. Run this command in the root of the `datadog-agent` repository:
    ```bash
    go install ./cmd/trace-agent
    ```
4. Run the agent using `trace-agent` (considering the path `$GOPATH/bin` is in your system's `$PATH`). 

### Troubleshooting

Check the agent output or logs (`/var/log/datadog/trace-agent.log` on Linux) to ensure that traces seem correct 
and that they are reaching the Datadog API.
[1]: https://golang.org/dl
[2]: 
