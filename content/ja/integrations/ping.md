---
app_id: ping
app_uuid: 841c9313-628f-4861-ad0b-2d12c37ee571
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: network.ping.response_time
      metadata_path: metadata.csv
      prefix: network.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10200
    source_type_name: Ping
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: jim.stanton@datadoghq.com
  support_email: jim.stanton@datadoghq.com
categories:
- developer tools
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ping/README.md
display_on_public_website: true
draft: false
git_integration_title: ping
integration_id: ping
integration_title: Ping
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: ping
public_title: Ping
short_description: Monitor connectivity to remote hosts.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor connectivity to remote hosts.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ping
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check uses the system [ping][1] command to test the reachability of a host.
It also optionally measures the round-trip time for messages sent from the check to the destination host.

Ping operates by sending Internet Control Message Protocol (ICMP) echo request packets to the target host and waiting for an ICMP echo reply.

This check uses the system ping command, rather than generating the ICMP echo request itself, as creating an ICMP packet requires a raw socket. Creating raw sockets requires root privileges, which the Agent does not have. The ping command uses the `setuid` access flag to run with elevated privileges, avoiding this issue.

**Note for Windows users**: This check might not work properly if the language for the installed Windows is not set to English.

## セットアップ

The ping check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the ping check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the one following commands to install the Agent integration:

   ```shell
   # Linux
   sudo -u dd-agent -- datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>

   # Windows
   agent.exe integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```
2. Install the `ping` binary in accordance to your OS. For example, run the following command for Ubuntu:
   ```shell
   apt-get install iputils-ping
   ```

3. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `ping.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your ping performance data. See the [sample ping.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

Run the [Agent's status subcommand][7] and look for `ping` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "ping" >}}


### イベント

The Ping check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "ping" >}}


## トラブルシューティング

### `SubprocessOutputEmptyError: get_subprocess_output expected output but had none` Error
While running the Ping integration, you may see an error like the following:

```
      Traceback (most recent call last):
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/base/checks/base.py", line 1006, in run
          self.check(instance)
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/ping/ping.py", line 65, in check
          lines = self._exec_ping(timeout, host)
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/ping/ping.py", line 48, in _exec_ping
          lines, err, retcode = get_subprocess_output(
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/base/utils/subprocess_output.py", line 56, in get_subprocess_output
          out, err, returncode = subprocess_output(cmd_args, raise_on_empty_output, env=env)
      _util.SubprocessOutputEmptyError: get_subprocess_output expected output but had none.
```

Because the Ping integration is not included by default in the Agent, the `ping` binary is also not included with the Agent. You must install the `ping` binary yourself in order to run the integration successfully. 


Need help? Contact [Datadog support][10].


[1]: https://en.wikipedia.org/wiki/Ping_%28networking_utility%29
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ping/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/