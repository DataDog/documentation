---
integration_title: Windows Event Log
name: windows_event_log
kind: integration
description: "Collect Windows Events as logs in Datadog"
is_public: true
public_title: Datadog-Windows Event Integration
short_description: "Collect Windows Events as logs in Datadog"
categories:
- log collection
- os & system
doc_link: https://docs.datadoghq.com/integrations/windows_event_log/
supported_os:
- windows
ddtype: check
---

## Overview

Collect Windows Events as logs in Datadog in order to:

* Track system and application events in Datadog.
* Correlate Windows system and application events with the rest of your application.
* Track security events and troubleshoot potential breaches.

## Setup
### Installation 
The Windows Event log check is included in the [Datadog Agent][4] package, so you don't need to install anything else on your server.

### Configuration
#### Log collection

**Available for the Agent v>6.0**

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` configuration file:

    ```
    logs_enabled: true
    ```

2. Edit the file `win32_event_log.d/conf.yaml` in the Agent’s `conf.d/` directory (or in the Datadog Agent Manager) with the channels from which you want to send Windows Events as log. To see the channel list run the following command in a powershell:

    ```
    Get-WinEvent -ListLog *
    ```

    To see the most active ones run the following command:

    ```
    Get-WinEvent -ListLog * | sort RecordCount -Descending
    ```

    Then add the channels in your `win32_event_log.d/conf.yaml` configuration file:

        logs:
          - type: windows_event
            channel_path: <CHANNEL_1>
            source: <CHANNEL_1>
            service: myservice
            sourcecategory: windowsevent

          - type: windows_event
            channel_path: <CHANNEL_2>
            source: <CHANNEL_2>
            service: myservice
            sourcecategory: windowsevent
    
    Edit the `<CHANNEL_X>` parameters with the wanted channel to collect events from. Set the `source` to the channel name to benefit from the integration automatic processing Pipeline setup.

3. [Restart the agent][1]

## Troubleshooting

Need help? Contact [Datadog Support][2].

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog][3].


[1]: /agent/basic_agent_usage/windows/
[2]: /help/
[3]: https://www.datadoghq.com/blog/
[4]: https://app.datadoghq.com/account/settings#agent
