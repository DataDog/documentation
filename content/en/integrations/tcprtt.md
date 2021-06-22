---
integration_title: TCP RTT
name: tcp_rtt
kind: integration
newhlevel: true
is_public: true
public_title: Datadog-TCP RTT Integration
short_description: 'Monitor TCP connectivity to remote hosts.'
categories:
    - network
ddtype: check
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/tcprtt.md']
integration_id: "tcp-rtt"
---

## Overview

The TCP RTT check reports on roundtrip times between the Agent's host and any host it is communicating with. This check is passive and only reports RTT times for packets being sent and received from outside the check. The check itself does not send any packets.

This check is only shipped with the 64-bit DEB and RPM Datadog Agent v5 packages. For other versions of the Agent, see the [Datadog/go-metro usage][1] for instructions on how to build the go-metro binary.

## Setup

### Installation

The check uses timestamps provided by the PCAP library to compute the time between any outgoing packet and the corresponding TCP acknowledgement. As such, PCAP must be installed and configured.

Debian-based systems should use one of the following:

```text
$ sudo apt-get install libcap
$ sudo apt-get install libcap2-bin
```

Redhat-based systems should use one of these:

```text
$ sudo yum install libcap
$ sudo yum install compat-libcap1
```

Finally, configure PCAP:

```text
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### Configuration

Edit `go-metro.d/conf.yaml`, in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample go-metro.d/conf.yaml][3] for all available configuration options.

The following example retrieves the TCP RTT times for `app.datadoghq.com` and `192.168.0.22`:

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

### Validation

To validate that the check is running correctly, you should see `system.net.tcp.rtt` metrics showing in the Datadog interface. Also, if you run `sudo /etc/init.d/datadog-agent status`, you should see something similar to the following:

```shell
datadog-agent.service - "Datadog Agent"
  Loaded: loaded (/lib/...datadog-agent.service; enabled; vendor preset: enabled)
  Active: active (running) since Thu 2016-03-31 20:35:27 UTC; 42min ago
 Process: 10016 ExecStop=/opt/.../supervisorctl -c /etc/dd-....conf shutdown (code=exited, status=0/SUCCESS)
 Process: 10021 ExecStart=/opt/.../start_agent.sh (code=exited, status=0/SUCCESS)
Main PID: 10025 (supervisord)
  CGroup: /system.slice/datadog-agent.service
          ├─10025 /opt/datadog-...python /opt/datadog-agent/bin/supervisord -c /etc/dd-agent/supervisor.conf
          ├─10043 /opt/datadog-...python /opt/datadog-agent/agent/dogstatsd.py --use-local-forwarder
          ├─10044 /opt/datadog-agent/bin/go-metro -cfg=/etc/dd-agent/conf.d/go-metro.yaml
          ├─10046 /opt/datadog-.../python /opt/datadog-agent/agent/ddagent.py
          └─10047 /opt/datadog-.../python /opt/datadog-agent/agent/agent.py foreground --use-local-forwarder
```

If the TCP RTT check has started you should see something similar to the go-metro line above.

This is a passive check, so unless there are packets actively being sent to the hosts mentioned in the yaml file, the metrics will not be reported.

## Data Collected

### Metrics

{{< get-metrics-from-git "system" "system.net.tcp.rtt" >}}

[1]: https://github.com/DataDog/go-metro#usage
[2]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/datadog_checks/go-metro/data/conf.yaml.example
