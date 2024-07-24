---
aliases:
- /ko/integrations/tcprtt
categories:
- 네트워크
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/tcp_rtt.md
integration_id: tcp-rtt
integration_title: TCP RTT
is_public: true
custom_kind: 통합
name: tcp_rtt
newhlevel: true
public_title: Datadog-TCP RTT 통합
short_description: 원격 호스트에 대한 TCP 연결을 모니터링합니다.
---

## 개요

TCP RTT 검사는 Agent의 호스트와 Agent가 통신 중인 호스트 간의 왕복 시간을 보고합니다. 이 검사는 수동적이며 검사 외부에서 전송 및 수신되는 패킷의 RTT 시간만 보고합니다. 검사 자체는 패킷을 보내지 않습니다.

이 검사는 64비트 DEB 및 RPM Datadog Agent v5 패키지에만 제공됩니다. 다른 버전의 Agent에 대한 go-metro 바이너리 빌드 방법은 [Datadog/go-metro 사용법][1]을 참조하세요.

## 설정

### 설치

이 검사는 PCAP 라이브러리에서 제공하는 타임스탬프를 사용하여 나가는 패킷과 해당 TCP 승인 사이의 시간을 계산합니다. 따라서 PCAP를 설치하고 설정해야 합니다.

Debian 기반 시스템은 다음 중 하나를 사용해야 합니다:

```text
$ sudo apt-get install libcap
$ sudo apt-get install libcap2-bin
```

Redhat 기반 시스템은 다음 중 하나를 사용해야 합니다.

```text
$ sudo yum install libcap
$ sudo yum install compat-libcap1
```

마지막으로 PCAP를 설정합니다.

```text
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### 설정

[Agent의 설정 디렉터리][2]의 루트에 있는 `conf.d/`폴더에서 `go-metro.d/conf.yaml`을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 go-metro.d/conf.yaml][3]을 참조하세요.

다음 예에서는 `app.datadoghq.com` 및 `192.168.0.22`에 대한 TCP RTT 시간을 검색합니다.

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

### 검증

검사가 올바르게 실행되고 있는지 확인하려면 Datadog 인터페이스에 `system.net.tcp.rtt` 메트릭이 표시되어야 합니다. 또한 `sudo /etc/init.d/datadog-agent status`를 실행하면 다음과 비슷한 내용이 표시됩니다.

```bash
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

TCP RTT 검사가 시작된 경우 위의 go-metro 줄과 유사한 내용이 표시되어야 합니다.

이는 수동적인 검사이므로 yaml 파일에 언급된 호스트에 적극적으로 전송되는 패킷이 없으면 메트릭이 보고되지 않습니다.

## 수집한 데이터

### 메트릭

{{< get-metrics-from-git "system" "system.net.tcp.rtt" >}}

[1]: https://github.com/DataDog/go-metro#usage
[2]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/datadog_checks/go-metro/data/conf.yaml.example