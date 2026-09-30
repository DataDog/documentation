---
app_id: ibm-mq
app_uuid: d29a1df9-6038-41f5-b017-82bf45f58767
assets:
  dashboards:
    IBM MQ: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_mq.queue.usage
      metadata_path: metadata.csv
      prefix: ibm_mq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10049
    source_type_name: IBM MQ
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 메시지 큐
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_mq/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_mq
integration_id: ibm-mq
integration_title: IBM MQ
integration_version: 6.3.0
is_public: true
manifest_version: 2.0.0
name: ibm_mq
public_title: IBM MQ
short_description: IBM MQ는 메시지 대기열입니다
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - 카테고리::메세지 큐
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: IBM MQ는 메시지 대기열입니다
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog
  support: README.md#Support
  title: IBM MQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 검사는 [IBM MQ][1] 버전 9.1 이상을 모니터링합니다.

## 설정

### 설치

IBM MQ 검사는 [Datadog Agent][2] 패키지에 포함되어 있습니다.

IBM MQ 검사를 사용하려면 [IBM MQ 클라이언트][3] 버전 9.1 이상이 설치되어 있는지 확인하세요(IBM MQ 서버의 호환 가능한 버전이 Agent 호스트에 이미 설치되어 있지 않은 경우). 예를 들어 [9.3 Redistributable client][4]입니다. IBM MQ 검사는 z/OS의 IBM MQ 서버에 대한 연결을 지원하지 않습니다.

#### Linux의 경우

라이브러리 위치를 포함하도록 `LD_LIBRARY_PATH`를 업데이트합니다. 아직 존재하지 않는 경우 해당 환경 변수를 생성합니다.
예를 들어 클라이언트를 `/opt`에 설치한 경우:

```text
export LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH
```

**참고**: Agent v6 이상은 `upstart`, `systemd`, `launchd`를 사용하여 datadog-agent 서비스를 조정합니다. 환경 변수는 다음 기본 위치에 있는 서비스 구성 파일에 추가되어야 할 수도 있습니다.

- Upstart (Linux): `/etc/init/datadog-agent.conf`
- Systemd (Linux): `/lib/systemd/system/datadog-agent.service`
- Launchd (MacOS): `~/Library/LaunchAgents/com.datadoghq.agent.plist`
  - 이는 MacOS SIP가 비활성화된 경우에만 작동합니다(보안 정책에 따라 권장되지 않을 수 있음). 이는 [SIP 제거 `LD_LIBRARY_PATH` 환경 변수][5] 때문입니다.

`systemd` 구성 예:

```yaml
[Unit]
Description="Datadog Agent"
After=network.target
Wants=datadog-agent-trace.service datadog-agent-process.service
StartLimitIntervalSec=10
StartLimitBurst=5

[Service]
Type=simple
PIDFile=/opt/datadog-agent/run/agent.pid
Environment="LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH"
User=dd-agent
Restart=on-failure
ExecStart=/opt/datadog-agent/bin/agent/agent run -p /opt/datadog-agent/run/agent.pid

[Install]
WantedBy=multi-user.target
```

`upstart` 구성 예:

```conf
description "Datadog Agent"

start on started networking
stop on runlevel [!2345]

respawn
respawn limit 10 5
normal exit 0

console log
env DD_LOG_TO_CONSOLE=false
env LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH

setuid dd-agent

script
  exec /opt/datadog-agent/bin/agent/agent start -p /opt/datadog-agent/run/agent.pid
end script

post-stop script
  rm -f /opt/datadog-agent/run/agent.pid
end script
```

`launchd` 구성 예:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <dict>
            <key>SuccessfulExit</key>
            <false/>
        </dict>
        <key>Label</key>
        <string>com.datadoghq.agent</string>
        <key>EnvironmentVariables</key>
        <dict>
            <key>DD_LOG_TO_CONSOLE</key>
            <string>false</string>
            <key>LD_LIBRARY_PATH</key>
            <string>/opt/mqm/lib64:/opt/mqm/lib</string>
        </dict>
        <key>ProgramArguments</key>
        <array>
            <string>/opt/datadog-agent/bin/agent/agent</string>
            <string>run</string>
        </array>
        <key>StandardOutPath</key>
        <string>/var/log/datadog/launchd.log</string>
        <key>StandardErrorPath</key>
        <string>/var/log/datadog/launchd.log</string>
        <key>ExitTimeOut</key>
        <integer>10</integer>
    </dict>
</plist>
```

Agent 업데이트가 있을 때마다 이러한 파일은 지워지며 다시 업데이트해야 합니다.

또는 Linux를 사용하는 경우 MQ 클라이언트가 설치된 후 런타임 링커가 라이브러리를 찾을 수 있는지 확인하세요. 예를 들어 ldconfig를 사용하면 다음과 같습니다.

라이브러리 위치를 ld 구성 파일에 넣습니다.

```shell
sudo sh -c "echo /opt/mqm/lib64 > /etc/ld.so.conf.d/mqm64.conf"
sudo sh -c "echo /opt/mqm/lib > /etc/ld.so.conf.d/mqm.conf"
```

바인딩을 업데이트합니다.

```shell
sudo ldconfig
```

#### Windows의 경우

IBM MQ 데이터 디렉터리에 `mqclient.ini`라는 파일이 있습니다. 일반적으로 `C:\ProgramData\IBM\MQ`입니다.
데이터 디렉터리를 가리키도록 환경 변수 `MQ_FILE_PATH`를 구성합니다.

### 권한 및 인증

IBM MQ에서 권한을 설정하는 방법에는 여러 가지가 있습니다. 설정 방식에 따라 MQ 내에서 읽기 전용 권한 및  `+chg` 권한(선택 사항)이 있는 `datadog` 사용자를 생성합니다. [재설정 대기열 통계][6](`MQCMD_RESET_Q_STATS`)에 대한 메트릭을 수집하려면 `+chg` 권한이 필요합니다. 이러한 메트릭을 수집하지 않으려면 `collect_reset_queue_metrics` 구성을 비활성화할 수 있습니다. 재설정 대기열 통계의 성능 데이터를 수집하면 성능 데이터도 재설정됩니다.

**참고**: "Queue Monitoring"은 MQ 서버에서 활성화되어야 하며 최소한 "Medium"으로 설정되어야 합니다. 이는 MQ UI를 사용하거나 서버 호스트의 `mqsc` 명령을 사용하여 수행할 수 있습니다.

```text
> /opt/mqm/bin/runmqsc
5724-H72 (C) Copyright IBM Corp. 1994, 2018.
Starting MQSC for queue manager datadog.


ALTER QMGR MONQ(MEDIUM) MONCHL(MEDIUM)
     1 : ALTER QMGR MONQ(MEDIUM) MONCHL(MEDIUM)
AMQ8005I: IBM MQ queue manager changed.

       :
One MQSC command read.
No commands have a syntax error.
All valid MQSC commands were processed.
```

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `ibm_mq.d/conf.yaml` 파일을 편집하여 IBM MQ 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 ibm_mq.d/conf.yaml][1]을 참조하세요.
   사용 방법에 따라 다양한 IBM MQ 구성 옵션이 있습니다.

   - `channel`: IBM MQ 채널
   - `queue_manager`: 설정된 대기열 관리자
   - `host`: IBM MQ가 실행 중인 호스트
   - `port`: IBM MQ가 노출한 포트
   - `convert_endianness`: MQ 서버가 AIX 또는 IBM i에서 실행 중인 경우 이 기능을 활성화해야 합니다.

    사용자 이름과 비밀번호 설정을 사용하는 경우 및 `username` 및 `password`를 설정할 수 있습니다. 사용자 이름이 설정되지 않은 경우 Agent 프로세스 소유자(`dd-agent`)가 사용됩니다.

    **참고**: 이 검사는 `queues` 파라미터로 설정한 대기열만 모니터링합니다.

    ```yaml
    queues:
      - APP.QUEUE.1
      - ADMIN.QUEUE.1
    ```

2. [Agent를 재시작합니다][2].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 다음으로, 구성 파일을 적절한 MQ 로그 파일로 지정합니다. MQ 통합 구성 파일 하단에 있는 줄의 주석 처리를 제거하고 적절하게 수정할 수 있습니다.

   ```yaml
     logs:
       - type: file
         path: '/var/mqm/log/<APPNAME>/active/AMQERR01.LOG'
         service: '<APPNAME>'
         source: ibm_mq
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: "\d{2}/\d{2}/\d{4}"
   ```

3. [Agent를 재시작합니다][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_mq/datadog_checks/ibm_mq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_mq`                                                                                                                        |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                                                   |
| `<INSTANCE_CONFIG>`  | `{"channel": "DEV.ADMIN.SVRCONN", "queue_manager": "datadog", "host":"%%host%%", "port":"%%port%%", "queues":["<QUEUE_NAME>"]}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog Agent에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "ibm_mq", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{2}/\d{2}/\d{4}"}}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `ibm_mq`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ibm-mq" >}}


### 이벤트

IBM MQ는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ibm-mq" >}}


## 트러블슈팅

### 재설정 대기열 통계 MQRC_NOT_AUTHORIZED 권한 경고
다음 오류가 나타나는 경우:

```
Warning: Error getting pcf queue reset metrics for SAMPLE.QUEUE.1: MQI Error. Comp: 2, Reason 2035: FAILED: MQRC_NOT_AUTHORIZED
```

이는 `datadog` 사용자에게 재설정 대기열 메트릭을 수집할 `+chg` 권한이 없기 때문입니다. 이 문제를 해결하려면 [`setmqaut`를 사용하여][8] `datadog` 사용자에게 `+chg` 권한을 부여하고 재설정 대기열 메트릭을 수집하거나 `collect_reset_queue_metrics`를 비활성화할 수 있습니다.
```yaml
    collect_reset_queue_metrics: false
```

### 높은 리소스 이용률
IBM MQ 검사는 서버에서 쿼리를 수행합니다. 때때로 이러한 쿼리는 비용이 많이 들고 검사 성능 저하를 일으킬 수 있습니다.

검사를 실행하는 데 시간이 오래 걸리거나 호스트에서 많은 리소스를 소모하는 것으로 확인되면 다음을 시도하여 검사 범위를 잠재적으로 줄일 수 있습니다.

* `auto_discover_queues`를 사용하는 경우 특정 대기열만 검색하려면 `queue_patterns` 또는 `queue_regex`를 사용해 보세요. 이는 시스템이 동적 대기열을 생성할 때 특히 유용합니다.
* `queue_patterns` 또는 `queue_regex`를 사용하여 대기열을 자동 검색하는 경우 _더 적은_ 대기열과 일치하도록 패턴이나 정규식을 강화해 보세요. 
* 채널이 너무 많을 경우 `auto_discover_channels`를 비활성합니다.
* `collect_statistics_metrics`를 비활성화합니다.

### 로그 오류
* `Unpack for type ((67108864,)) not implemented`: 이와 같은 오류가 표시되고 MQ 서버가 IBM OS에서 실행되고 있는 경우 `convert_endianness`를 활성화하고 Agent를 다시 시작하세요.

### 로그 경고
* `Error getting [...]: MQI Error. Comp: 2, Reason 2085: FAILED: MQRC_UNKNOWN_OBJECT_NAME`: 이와 같은 메시지가 표시된다면 존재하지 않는 대기열에서 통합이 메트릭을 수집하려고 하기 때문입니다. 이는 잘못된 구성으로 인해 발생하거나`auto_discover_queues`를 사용하는 경우 통합이 [동적 대기열][9]을 검색할 수 있으며 메트릭을 수집하려고 할 때 대기열이 더 이상 존재하지 않기 때문일 수 있습니다. 이 경우 더 엄격한 `queue_patterns` 또는 `queue_regex`를 제공하여 문제를 완화하거나 경고를 무시할 수 있습니다.


### 기타

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 IBM MQ 메트릭 및 로그 모니터링][11]


[1]: https://www.ibm.com/products/mq
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://www.ibm.com/docs/en/ibm-mq/9.3?topic=roadmap-mq-downloads#mq_downloads_admins__familyraclients__title__1
[4]: https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm~WebSphere&product=ibm/WebSphere/WebSphere+MQ&release=9.3.0.0&platform=All&function=fixid&fixids=*IBM-MQC-Redist-*
[5]: https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/RuntimeProtections/RuntimeProtections.html#//apple_ref/doc/uid/TP40016462-CH3-SW1
[6]: https://www.ibm.com/docs/en/ibm-mq/9.1?topic=formats-reset-queue-statistics
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://www.ibm.com/docs/en/ibm-mq/9.2?topic=reference-setmqaut-grant-revoke-authority
[9]: https://www.ibm.com/docs/en/ibm-mq/9.2?topic=queues-dynamic-model
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog