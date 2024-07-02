---
"app_id": "go-metro"
"app_uuid": "77c9906a-9579-4014-95c3-42b4536dc17d"
"assets":
  "integration":
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "system.net.tcp.rtt"
      "metadata_path": "metadata.csv"
      "prefix": "system."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "Go-Metro"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "languages"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/go-metro/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "go-metro"
"integration_id": "go-metro"
"integration_title": "Go-Metro"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "go-metro"
"public_title": "Go-Metro"
"short_description": "Passively calculate TCP RTT between hosts"
"supported_os":
- "linux"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::Languages"
  "configuration": "README.md#Setup"
  "description": "Passively calculate TCP RTT between hosts"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Go-Metro"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The TCP RTT check reports on roundtrip times between the host the Agent is running on and any host it is communicating with. This check is passive and only reports RTT times for packets being sent and received from outside the check. The check itself does not send any packets.

This check is only shipped in the 64-bit DEB and RPM Datadog Agent v5 packages. The check is _not_ available with Datadog Agent v6.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying these instructions.

### インストール

The TCP RTT check-also known as [go-metro][2]-is packaged with the Agent, but requires additional system libraries. The check uses timestamps provided by the PCAP library to compute the time between any outgoing packet and the corresponding TCP acknowledgment. As such, PCAP must be installed and configured.

Debian-based systems should use one of the following:

```bash
sudo apt-get install libcap
sudo apt-get install libcap2-bin
```

Redhat-based systems should use one of these:

```bash
sudo yum install libcap
sudo yum install compat-libcap1
```

Finally, configure PCAP:

```bash
sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### 構成

Edit the `go-metro.yaml` file in your agent's `conf.d` directory. See the [sample go-metro.yaml][3] for all available configuration options.
The following is an example file that shows the TCP RTT times for app.datadoghq.com and 192.168.0.22:

```yaml
init_config:
  snaplen: 512
  idle_ttl: 300
  exp_ttl: 60
  statsd_ip: 127.0.0.1
  statsd_port: 8125
  log_to_file: true
  log_level: info
instances:
  - interface: eth0
    tags:
      - env:prod
    ips:
      - 45.33.125.153
    hosts:
      - app.datadoghq.com
```

**Note**: For go-metro to run unprivileged, you need to set `CAP_NET_RAW` capabilities on the binary:
```
# Install required libraries
$ sudo apt-get install libcap  # debian
$ sudo apt-get install libcap2-bin  # debian alternative
$ sudo yum install libcap  # redhat
$ sudo yum install compat-libcap1  # redhat alternative

# Set capabilities
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

Because of different package names for different distributions, if the instructions above don't work for you, issue an `apt-cache search libcap` or `yum search libcap` for a shortlist of packages that provide the binary. Contact [Datadog support][4], if you need assistance.

**Note**: go-metro logs to its own file - found in `/var/log/datadog/go-metro.log`. Additionally, go-metro runs standalone so it does not appear on the Agent's status output.

Finally, because the go-metro binary is only bundled with the 64-bit RPM and DEB distributions of the Datadog Agent, it is only available in those packaged versions, that is go-metro is unavailable with the source install or 32-bit packages.

### Validation

To validate that the check is running correctly, you should see `system.net.tcp.rtt` metrics showing in the Datadog interface. Also, if you [Run the Agent's `status` subcommand][5], you should see something similar to the following:

```text
 datadog-agent.service - "Datadog Agent"
    Loaded: loaded (/lib/...datadog-agent.service; enabled; vendor preset: enabled)
    Active: active (running) since Thu 2016-03-31 20:35:27 UTC; 42min ago
  Process: 10016 ExecStop=/opt/.../supervisorctl -c /etc/dd-....conf shutdown (code=exited, status=0/SUCCESS)
  Process: 10021 ExecStart=/opt/.../start_agent.sh (code=exited, status=0/SUCCESS)
  Main PID: 10025 (supervisord)
    CGroup: /system.slice/datadog-agent.service
            |_10025 /opt/datadog-...python /opt/datadog-agent/bin/supervisord -c /etc/dd-agent/supervisor.conf
            |_10043 /opt/datadog-...python /opt/datadog-agent/agent/dogstatsd.py --use-local-forwarder
            |_10044 /opt/datadog-agent/bin/go-metro -cfg=/etc/dd-agent/conf.d/go-metro.yaml
            |_10046 /opt/datadog-.../python /opt/datadog-agent/agent/ddagent.py
            |_10047 /opt/datadog-.../python /opt/datadog-agent/agent/agent.py foreground --use-local-forwarder
```

If the TCP RTT check has started you should see something similar to the go-metro line above.

**This is a passive check, so unless there are packets actively being sent to the hosts mentioned in the yaml file, the metrics are not reported.**

## 収集データ

### メトリクス
{{< get-metrics-from-git "go-metro" >}}


### イベント

The Go-metro check does not include any events.

### サービスチェック

The Go-metro check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/go-metro
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/conf.yaml.example
[4]: https://docs.datadoghq.com/help/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/go-metro/metadata.csv

