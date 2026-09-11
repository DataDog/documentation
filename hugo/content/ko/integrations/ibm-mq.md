---
aliases:
- /ko/integrations/ibm_mq
app_id: ibm-mq
categories:
- 로그 수집
- 메시지 대기열
- 네트워크
custom_kind: 통합
description: IBM MQ는 메시지 대기열입니다
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog
  tag: 블로그
  text: Datadog으로 IBM MQ 메트릭 및 로그 모니터링
integration_version: 8.3.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: IBM MQ
---
## 개요

본 점검은 [IBM MQ](https://www.ibm.com/products/mq) 버전 9.1 이상을 모니터링합니다.

## 설정

### 설치

IBM MQ 검사는 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.

IBM MQ 검사를 사용하려면 [IBM MQ 클라이언트](https://www.ibm.com/docs/en/ibm-mq/9.3?topic=roadmap-mq-downloads#mq_downloads_admins__familyraclients__title__1) 버전 9.1 이상이 설치되어 있는지 확인하세요(IBM MQ 서버의 호환 가능한 버전이 Agent 호스트에 이미 설치되어 있지 않은 경우). 예를 들어 [9.3 Redistributable client](https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm~WebSphere&product=ibm/WebSphere/WebSphere+MQ&release=9.3.0.0&platform=All&function=fixid&fixids=*IBM-MQC-Redist-*)가 있습니다. 현재 IBM MQ 검사는 z/OS의 IBM MQ 서버 연결을 지원하지 않습니다.

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
  - 이 방법은 MacOS SIP가 비활성화된 경우에만 작동합니다(보안 정책에 따라 권장되지 않을 수 있음). 이는 [SIP 퍼징 `LD_LIBRARY_PATH` 환경 변수](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/RuntimeProtections/RuntimeProtections.html#//apple_ref/doc/uid/TP40016462-CH3-SW1) 때문입니다.

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

IBM MQ에서 권한을 설정하는 방법에는 여러 가지가 있습니다. 설정 방식에 따라 MQ 내에서 읽기 전용 권한 및 `+chg` 권한(옵션)이 있는 `datadog` 사용자를 생성합니다. [재설정 대기열 통계](https://www.ibm.com/docs/en/ibm-mq/9.1?topic=formats-reset-queue-statistics)(`MQCMD_RESET_Q_STATS`) 메트릭을 수집하려면 `+chg` 권한이 필요합니다. 이러한 메트릭을 수집하지 않으려면 구성에서 `collect_reset_queue_metrics`을 비활성화할 수 있습니다. 재설정 대기열 통계의 성능 데이터를 수집하면 성능 데이터도 재설정됩니다.

아래 예시에서 `datadog` 사용자가 명령을 실행하는 데 사용하는 그룹인 `mqclient` 그룹에 대해, 대기열 관리자 `QM1`에 필요한 권한을 설정합니다. 와일드카드를 사용하여 한 번에 여러 대기열에 권한을 부여할 수 있습니다.

```shell
setmqaut -m QM1 -n SYSTEM.ADMIN.COMMAND.QUEUE -t queue -g mqclient +dsp +inq +get +put
setmqaut -m QM1 -n SYSTEM.MQEXPLORER.REPLY.MODEL -t queue -g mqclient +dsp +inq +get +put
```

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

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. IBM MQ 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트에서 `conf.d/` 폴더에 있는 `ibm_mq.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 ibm_mq.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ibm_mq/datadog_checks/ibm_mq/data/conf.yaml.example)을 참고하세요.
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

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 다음으로, 구성 파일을 적절한 MQ 로그 파일로 지정합니다. MQ 통합 구성 파일 하단에 있는 줄의 주석 처리를 제거하고 적절하게 수정할 수 있습니다.

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

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_mq`                                                                                                                        |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                                                   |
| `<INSTANCE_CONFIG>`  | `{"channel": "DEV.ADMIN.SVRCONN", "queue_manager": "datadog", "host":"%%host%%", "port":"%%port%%", "queues":["<QUEUE_NAME>"]}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "ibm_mq", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{2}/\d{2}/\d{4}"}}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `ibm_mq`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **ibm_mq.channel.batch_interval** <br>(gauge) | 이 속성은 전송 대기열에 메시지가 없더라도 채널이 배치를 열어두는 기간입니다(파라미터 식별자: `BATCHINT`).<br>_second로 표시_ |
| **ibm_mq.channel.batch_size** <br>(gauge) | 이 속성은 동기화 포인트를 설정하기 전까지 전송할 수 있는 최대 메시지 수입니다(파라미터 식별자: `BATCHSZ`).<br>_resource로 표시_ |
| **ibm_mq.channel.batches** <br>(gauge) | 이 속성은 완료된 배치의 수를 지정합니다(파라미터 식별자: `MQIACH_BATCHES`).|
| **ibm_mq.channel.buffers_rcvd** <br>(gauge) | 이 속성은 수신된 버퍼 수를 지정합니다(파라미터 식별자: `MQIACH_BUFFERS_RCVD`).<br>_buffer로 표시_ |
| **ibm_mq.channel.buffers_sent** <br>(gauge) | 이 속성은 전송된 버퍼 수를 지정합니다(파라미터 식별자: `MQIACH_BUFFERS_SENT`).<br>_buffer로 표시_ |
| **ibm_mq.channel.bytes_rcvd** <br>(gauge) | 이 속성은 수신된 바이트 수를 지정합니다(파라미터 식별자: `MQIACH_BYTES_RCVD`).<br>_byte로 표시_ |
| **ibm_mq.channel.bytes_sent** <br>(gauge) | 이 속성은 전송된 바이트 수를 지정합니다(파라미터 식별자: `MQIACH_BYTES_SENT`).<br>_byte로 표시_ |
| **ibm_mq.channel.channel_status** <br>(gauge) | 이 속성은 채널 상태를 지정합니다(파라미터 식별자: `MQIACH_CHANNEL_STATUS`).|
| **ibm_mq.channel.channels** <br>(gauge) | 활성 채널 수.<br>_resource로 표시_ |
| **ibm_mq.channel.conn_status** <br>(gauge) | 채널의 연결 상태(파라미터 식별자: `MQIACH_CONNS`).<br>_connection으로 표시_ |
| **ibm_mq.channel.connections_active** <br>(gauge) | 채널당 활성 채널 연결(인스턴스)의 총수.<br>_connection으로 표시_ |
| **ibm_mq.channel.count** <br>(gauge) | 상태별로 합산하여 채널 수를 카운팅합니다. 채널 및 상태 태그별로 필터링하여 알림을 생성합니다.|
| **ibm_mq.channel.current_msgs** <br>(gauge) | 이 속성은 불확실한 메시지 수를 지정합니다(파라미터 식별자: `MQIACH_CURRENT_MSGS`).<br>_message로 표시_ |
| **ibm_mq.channel.disc_interval** <br>(gauge) | 이 속성은 해당 기간 동안 메시지가 도착하지 않을 경우 채널이 종료되는 기간입니다(파라미터 식별자: `DISCINT`).<br>_second로 표시_ |
| **ibm_mq.channel.hb_interval** <br>(gauge) | 이 속성은 전송 대기열에 메시지가 없을 때 송신 MCA에서 전달되는 하트비트 플로 사이의 대략적인 시간을 지정합니다(파라미터 식별자: `HBINT`).<br>_second로 표시_ |
| **ibm_mq.channel.indoubt_status** <br>(gauge) | 이 속성은 채널이 현재 불확실한지 여부를 나타내는 숫자를 지정합니다(파라미터 식별자: `MQIACH_INDOUBT_STATUS`).|
| **ibm_mq.channel.keep_alive_interval** <br>(gauge) | 이 속성은 채널의 타임아웃 값을 지정하는 데 사용됩니다(파라미터 식별자: `KAINT`).<br>_second로 표시_ |
| **ibm_mq.channel.long_retry** <br>(gauge) | 이 속성은 채널이 파트너에게 세션 할당을 시도하는 최대 횟수를 지정합니다(파라미터 식별자: `LONGRTY`).<br>_time으로 표시_ |
| **ibm_mq.channel.long_timer** <br>(gauge) | 이 속성은 긴 재시도 모드(파라미터 식별자: `LONGTMR`) 동안 채널이 연결 설정을 재시도하기 전에 대기하는 대략적인 간격(초)입니다.<br>_second로 표시_. |
| **ibm_mq.channel.max_message_length** <br>(gauge) | 이 속성은 채널에서 전송할 수 있는 메시지의 최대 길이를 지정합니다(파라미터 식별자: `MAXMSGL`).<br>_byte로 표시_ |
| **ibm_mq.channel.mca_status** <br>(gauge) | 이 속성은 MCA 상태를 지정합니다(파라미터 식별자: `MQIACH_MCA_STATUS`). |
| **ibm_mq.channel.mr_count** <br>(gauge) | 이 속성은 채널이 메시지 재전송을 시도하는 횟수를 지정합니다(파라미터 식별자: `MRRTY`).|
| **ibm_mq.channel.mr_interval** <br>(gauge) | 이 속성은 채널이 MQPUT 작업을 재시도하기 전에 경과해야 하는 최소 시간 간격을 지정합니다(파라미터 식별자: `MRTMR`).<br>_second로 표시_ |
| **ibm_mq.channel.msgs** <br>(gauge) | 이 속성은 전송 또는 수신된 메시지 수 또는 처리된 MQI 호출 수를 지정합니다(파라미터 식별자: `MQIACH_MSGS`).<br>_message로 표시_ |
| **ibm_mq.channel.network_priority** <br>(gauge) | 이 속성은 네트워크 연결의 우선순위를 지정합니다. 분산 큐 처리는 사용 가능한 경로가 여러 개 있는 경우 우선순위가 가장 높은 경로를 선택합니다. 값은 0~9 사이여야 하며, 0이 우선순위가 가장 낮습니다(파라미터 식별자: NETPRTY).|
| **ibm_mq.channel.npm_speed** <br>(gauge) | 이 속성은 지속성 메시지가 전송되는 속도를 지정합니다(파라미터 식별자: `NPMSPEED`).|
| **ibm_mq.channel.sharing_conversations** <br>(gauge) | 이 속성은 이 채널과 연결된 채널 인스턴스를 공유할 수 있는 최대 대화 수를 지정합니다(파라미터 식별자: `SHARECNV`).|
| **ibm_mq.channel.short_retry** <br>(gauge) | 이 속성은 발신자 또는 서버 채널이 원격 머신(파라미터 식별자: `MQIACH_SHORT_RETRY`)과의 연결 설정을 시도하는 최대 횟수를 지정합니다.|
| **ibm_mq.channel.short_timer** <br>(gauge) | 이 속성은 채널 개시자가 자동으로 시작하는 발신자 또는 서버 채널의 짧은 재시도 대기 간격을 지정합니다(파라미터 식별자: `MQIACH_SHORT_TIMER`).<br>_second로 표시_ |
| **ibm_mq.channel.ssl_key_resets** <br>(gauge) | 이 값은 비밀 키가 재협상되기 전에 채널에서 송수신되는 암호화되지 않은 총 바이트 수를 나타냅니다(파라미터 식별자: `SSLRSTCNT`).|
| **ibm_mq.queue.backout_threshold** <br>(gauge) | 백아웃 임계값(파라미터 식별자: `MQIA_BACKOUT_THRESHOLD`)입니다. 메시지가 BackoutRequeueName으로 지정된 백아웃 대기열로 전송되기 전까지 메시지를 백아웃할 수 있는 횟수입니다.<br>_resource로 표시_ |
| **ibm_mq.queue.depth_current** <br>(gauge) | 현재 대기열에 있는 메시지 수(파라미터 식별자: `MQIA_CURRENT_Q_DEPTH`).<br>_message로 표시_ |
| **ibm_mq.queue.depth_high_event** <br>(gauge) | 대기열 깊이 상한(파라미터 식별자: `MQIA_Q_DEPTH_HIGH_LIMIT`)입니다. 이 이벤트는 애플리케이션이 메시지를 대기열에 추가했고 이로 인해 대기열의 메시지 수가 대기열 깊이 상한 임계값 이상이 되었음을 나타냅니다.<br>_event로 표시_ |
| **ibm_mq.queue.depth_high_limit** <br>(gauge) | 이 속성은 대기열 상한 이벤트(파라미터 식별자: `MQIA_Q_DEPTH_HIGH_LIMIT`)를 생성하기 전에 대기열 깊이를 비교할 임계값을 지정합니다.<br>_ resource로 표시_ |
| **ibm_mq.queue.depth_low_event** <br>(gauge) | 대기열 깊이 하한(파라미터 식별자: `MQIA_Q_DEPTH_LOW_LIMIT`)입니다. 이 이벤트는 애플리케이션이 대기열에서 메시지를 가져왔고, 이로 인해 대기열의 메시지 수가 대기열 깊이 하한 임계값 이하가 되었음을 나타냅니다.<br>_event로 표시_ |
| **ibm_mq.queue.depth_low_limit** <br>(gauge) | 이 속성은 대기열 깊이 하한을 지정합니다. 이 이벤트는 애플리케이션이 대기열에서 메시지를 가져왔고, 이로 인해 대기열의 메시지 수가 대기열 깊이 하한 임계값 이하가 되었음을 나타냅니다(파라미터 식별자: MQIA_Q_DEPTH_LOW_LIMIT).<br>_item로 표시_ |
| **ibm_mq.queue.depth_max** <br>(gauge) | 최대 대기열 깊이(파라미터 식별자: `MQIA_MAX_Q_DEPTH`). 대기열에 허용되는 최대 메시지 수입니다. 다른 요인으로 인해 대기열이 꽉 찬 것으로 처리될 수 있습니다. 예를 들어, 메시지 저장 공간이 없는 경우 꽉 찬 것으로 표시됩니다.<br>_message로 표시_ |
| **ibm_mq.queue.depth_max_event** <br>(gauge) | Queue Full 이벤트 생성 여부를 제어합니다(파라미터 식별자: `MQIA_Q_DEPTH_MAX_EVENT`).<br>_ event로 표시_ |
| **ibm_mq.queue.depth_percent** <br>(gauge) | 현재 사용 중인 대기열의 백분율입니다.<br>_percent로 표시_ |
| **ibm_mq.queue.harden_get_backout** <br>(gauge) | 백아웃 횟수 강화(영구화) 여부입니다. 메시지 대기열 매니저가 재시작되더라도 백아웃된 메시지의 횟수를 영구 저장(강화)할지 여부를 지정합니다(파라미터 식별자: `MQIA_HARDEN_GET_BACKOUT`).<br>_request로 표시_ |
| **ibm_mq.queue.high_q_depth** <br>(gauge) | 이 속성은 대기열의 최대 메시지 수를 지정합니다(파라미터 식별자: `MQIA_HIGH_Q_DEPTH`).<br>_message로 표시_ |
| **ibm_mq.queue.inhibit_get** <br>(gauge) | 가져오기(Get) 작업 허용 여부(파라미터 식별자: `MQIA_INHIBIT_GET`).<br>_occurrence로 표시_ |
| **ibm_mq.queue.inhibit_put** <br>(gauge) | 이 속성은 추가하기(Put) 작업 허용 여부를 지정합니다(파라미터 식별자: `MQIA_INHIBIT_PUT`).<br>_occurrence로 표시_ |
| **ibm_mq.queue.input_open_option** <br>(gauge) | 이 대기열을 입력용으로 여는 애플리케이션의 기본 공유 옵션을 지정합니다(파라미터 식별자: `MQIA_DEF_INPUT_OPEN_OPTION`).<br>_resource로 표시_ |
| **ibm_mq.queue.last_get_time** <br>(gauge) | 대기열에서 마지막으로 메시지를 가져온 후 경과한 시간(초)<br>_second로 표시_ |
| **ibm_mq.queue.last_put_time** <br>(gauge) | 대기열에 마지막으로 메시지를 추가한 후 경과한 시간(초)<br>_second로 표시_ |
| **ibm_mq.queue.max_channels** <br>(gauge) | 이 속성은 현재 활성화 가능한 최대 채널 수입니다(파라미터 식별자: `MQIA_MAX_CHANNELS`).<br>_connection로 표시_ |
| **ibm_mq.queue.max_message_length** <br>(gauge) | 이 속성은 채널에서 전송할 수 있는 메시지의 최대 길이를 지정합니다(파라미터 식별자: `MQIACH_MAX_MSG_LENGTH`). <br>_resource로 표시_ |
| **ibm_mq.queue.message_delivery_sequence** <br>(gauge) | 가져오기(get) 작업 후 메시지가 반환되는 순서(파라미터 식별자: `MQIA_MSG_DELIVERY_SEQUENCE`).<br>_resource로 표시_ |
| **ibm_mq.queue.msg_deq_count** <br>(count) | 이 속성은 대기열에서 나간 메시지 수를 지정합니다(파라미터 식별자: `MQIA_MSG_DEQ_COUNT`).<br>_message로 표시_ |
| **ibm_mq.queue.msg_enq_count** <br>(count) | 이 속성은 대기열에 들어온 메시지 수를 지정합니다(파라미터 식별자: `MQIA_MSG_ENQ_COUNT`).<br>_message로 표시_ |
| **ibm_mq.queue.oldest_message_age** <br>(gauge) | 대기열에서 가장 오래된 메시지의 경과 시간(초)(파라미터 식별자: `MSGAGE`).<br>_second로 표시_ |
| **ibm_mq.queue.open_input_count** <br>(gauge) | 입력을 위해 대기열이 열려 있는 MQOPEN 호출 수(파라미터 식별자: `MQIA_OPEN_INPUT_COUNT`).<br>_connection로 표시_ |
| **ibm_mq.queue.open_output_count** <br>(gauge) | 출력을 위해 대기열이 열려 있는 MQOPEN 호출 수(파라미터 식별자: `MQIA_OPEN_OUTPUT_COUNT`).<br>_connection으로 표시_ |
| **ibm_mq.queue.persistence** <br>(gauge) | 대기열의 메시지 지속성에 대한 기본값을 지정합니다. 메시지 지속성은 대기열 관리자를 재시작해도 메시지를 보존할지 여부를 결정합니다(파라미터 식별자: `MQIA_DEF_PERSISTENCE`).<br>_resource로 표시_ |
| **ibm_mq.queue.priority** <br>(gauge) | 대기열에 추가한 메시지의 기본 우선 순위를 지정합니다(파라미터 식별자: `MQIA_DEF_PRIORITY`).<br>_resource로 표시_ |
| **ibm_mq.queue.retention_interval** <br>(gauge) | 대기열이 생성된 날짜와 시간에 기반하여 해당 대기열이 필요할 수 있는 시간입니다(파라미터 식별자: `MQIA_RETENTION_INTERVAL`).<br>_hour로 표시_ |
| **ibm_mq.queue.scope** <br>(gauge) | 대기열 정의의 범위입니다. OS/400에서는 AS/400 V4R2 이상용 MQSeries에서 수신할 때 유효합니다. 대기열 정의의 범위가 해당 대기열을 소유한 대기열 관리자 이내로 제한되는지, 아니면 대기열 이름이 셀 디렉터리에 포함되어 셀 내의 모든 대기열 관리자가 이를 식별할 수 있는지 여부를 지정합니다(파라미터 식별자: `MQIA_SCOPE`).<br>_resource로 표시_ |
| **ibm_mq.queue.service_interval** <br>(gauge) | 이 속성은 대기열 서비스 간격의 대상을 지정합니다. 이는 Queue Service Interval High 및 Queue Service Interval OK 이벤트를 생성하기 위한 비교 기준으로 사용됩니다(파라미터 식별자: `MQIA_Q_SERVICE_INTERVAL`).<br>_millisecond로 표시_ |
| **ibm_mq.queue.service_interval_event** <br>(gauge) | Service Interval High 또는 Service Interval OK 이벤트 생성 여부를 제어합니다(파라미터 식별자: `MQIA_Q_SERVICE_INTERVAL_EVENT`).<br>_occurrence로 표시_ |
| **ibm_mq.queue.time_since_reset** <br>(count) | 이 속성은 통계가 재설정된 이후 경과된 시간(초)을 지정합니다(파라미터 식별자: `MQIA_TIME_SINCE_RESET`).<br>_second로 표시_ |
| **ibm_mq.queue.trigger_control** <br>(gauge) | 이 속성은 트리거 메시지를 시작 대기열에 기록할지 여부를 지정합니다(파라미터 식별자: `MQIA_TRIGGER_CONTROL`).<br>_method로 표시_ |
| **ibm_mq.queue.trigger_depth** <br>(gauge) | 이 속성은 시작 대기열에서 트리거 메시지를 발생시키는 메시지 수를 지정합니다(파라미터 식별자: `MQIA_TRIGGER_DEPTH`). <br>_resource로 표시_ |
| **ibm_mq.queue.trigger_message_priority** <br>(gauge) | 트리거에 대한 메시지 우선순위 임계값입니다(파라미터 식별자: `MQIA_TRIGGER_MSG_PRIORITY`). 트리거 이벤트를 발생시키거나 트리거 조건에 포함되기 위해 메시지가 갖추어야 하는 최소 우선순위를 지정합니다. 값은 지원되는 우선순위 범위값(0~9) 내에 있어야 합니다.<br>_resource로 표시_ |
| **ibm_mq.queue.trigger_type** <br>(gauge) | 이 대기열에 도착한 메시지의 결과로 트리거 메시지가 작성되는 조건(파라미터 식별자: `MQIA_TRIGGER_TYPE`).<br>_resource로 표시_ |
| **ibm_mq.queue.type** <br>(gauge) | 별칭이 확인되는 대기열 유형(파라미터 식별자: `MQIA_Q_TYPE`).<br>_resource로 표시_ |
| **ibm_mq.queue.uncommitted_msgs** <br>(gauge) | 커밋되지 않은 메시지의 최대 수를 지정합니다. 이는 가져올 수 있는 메시지 수, 입력할 수 있는 메시지 수, 이 작업 유닛 내에서 생성된 트리거 메시지(파라미터 식별자: `MQIA_MAX_UNCOMMITTED_MSGS`)입니다.<br>_message로 표시_ |
| **ibm_mq.queue.usage** <br>(gauge) | 이 속성은 대기열이 일반 용도인지 또는 원격 메시지 대기열 관리자에게 메시지를 전송하기 위한 용도인지 여부를 나타냅니다(파라미터 식별자: `MQIA_USAGE`).<br>_resource로 표시_ |
| **ibm_mq.queue_manager.dist_lists** <br>(gauge) | 배포 목록 메시지를 대기열에 넣을 수 있는지 여부를 지정합니다(파라미터 식별자: `MQIA_DIST_LISTS`).<br>_resource로 표시_ |
| **ibm_mq.queue_manager.max_msg_list** <br>(gauge) | 채널에서 전송할 수 있는 최대 메시지 길이를 지정합니다. 이 값은 원격 채널의 값과 비교되며 실제 최대값은 두 값 중 가장 낮은 값입니다(파라미터 식별자: `MQIACH_MAX_MSG_LENGTH`).<br>_byte로 표시_ |
| **ibm_mq.stats.channel.avg_batch_size** <br>(gauge) | 채널에서 처리한 배치의 평균 배치 크기(파라미터 식별자: `MQIAMO_AVG_BATCH_SIZE`).<br>_message로 표시_ |
| **ibm_mq.stats.channel.bytes** <br>(count) | 지속성 및 비지속성 메시지에 송수신된 바이트 수입니다(파라미터 식별자: `QCSTNBYT`).<br>_message로 표시_ |
| **ibm_mq.stats.channel.full_batches** <br>(count) | 채널 속성 BATCHSZ 또는 BATCHLIM 값에 도달하였기 때문에 전송된, 채널이 처리한 배치의 수(파라미터 식별자: `MQIAMO_FULL_BATCHES`).<br>_message로 표시_ |
| **ibm_mq.stats.channel.incomplete_batches** <br>(count) | 채널 속성 BATCHSZ 값에 도달하지 않은 상태에서 전송된, 채널이 처리한 배치의 수(파라미터 식별자: `MQIAMO_INCOMPLETE_BATCHES`).<br>_message로 표시_ |
| **ibm_mq.stats.channel.msgs** <br>(count) | 전송 또는 수신된 지속성 및 비지속성 메시지 수(파라미터 식별자: `QCSTNMSG`).<br>_message로 표시_ |
| **ibm_mq.stats.channel.put_retries** <br>(count) | 지정된 기간 동안 메시지 추가하기(Put)에 실패하여 재시도 루프에 들어간 횟수입니다(파라미터 식별자: `MQIAMO_PUT_RETRIES`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.avg_q_time** <br>(gauge) | 지속성 및 비지속성 메시지 모니터링 기간 동안 대기열에서 파괴적 읽기로 가져온 메시지의 평균 레이턴시(마이크로초)(파라미터 식별자: `MQIAMO64_AVG_Q_TIME`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.browse_bytes** <br>(gauge) | 지속성 및 비지속성 메시지의 비파괴적 가져오기 요청으로 읽은 바이트 수(파라미터 식별자: `MQIAMO64_BROWSE_BYTES`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.browse_count** <br>(count) | 지속성 및 비지속성 메시지의 비파괴적 가져오기 요청이 성공한 횟수(파라미터 식별자: `MQIAMO_BROWSES`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.browse_fail_count** <br>(count) | 비파괴적 가져오기 요청이 실패한 횟수(파라미터 식별자: `MQIAMO_BROWSES_FAILED`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.expired_msg_count** <br>(count) | 가져오기 전에 만료되어 폐기된 지속성 및 비지속성 메시지의 수(파라미터 식별자: `MQIAMO_MSGS_EXPIRED`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.get_bytes** <br>(count) | 지속성 및 비지속성 메시지의 파괴적 추가(Put) 요청으로 읽은 바이트 수(파라미터 식별자: `MQIAMO64_GET_BYTES`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.get_count** <br>(count) | 지속성 및 비지속성 메시지의 파괴적 가져오기 요청이 성공한 횟수(파라미터 식별자: `MQIAMO_GETS`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.get_fail_count** <br>(count) | 파괴적 가져오기 요청이 실패한 횟수(파라미터 식별자: `MQIAMO_GETS_FAILED`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.non_queued_msg_count** <br>(count) | 대기열을 우회하여 대기 중인 애플리케이션으로 직접 전송된 메시지 수입니다. 이 숫자는 애플리케이션이 대기한 횟수가 아니라 WebSphere MQ가 대기열을 우회할 수 있었던 횟수를 의미합니다(파라미터 식별자: MQIAMO_MSGS_NOT_QUEUED).<br>_message로 표시_ |
| **ibm_mq.stats.queue.purge_count** <br>(count) | 삭제된 메시지 수(파라미터 식별자: `MQIAMO_MSGS_PURGED`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.put1_count** <br>(count) | MQPUT1 호출을 사용하여 대기열에 성공적으로 추가한 지속성 및 비지속성 메시지의 수입니다(파라미터 식별자: `MQIAMO_PUT1S`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.put1_fail_count** <br>(count) | MQPUT1 호출을 사용하여 메시지를 대기열에 추가하려는 시도가 실패한 횟수입니다(파라미터 식별자: `MQIAMO_PUT1S_FAILED`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.put_bytes** <br>(count) | 지속성 및 비지속성 메시지의 대기열에 추가(Put) 요청으로 작성한 바이트 수(파라미터 식별자: `MQIAMO64_PUT_BYTES`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.put_count** <br>(count) | MQPUT1 요청을 제외하고 대기열에 성공적으로 추가한 지속성 및 비지속성 메시지의 수입니다(파라미터 식별자: `MQIAMO_PUTS`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.put_fail_count** <br>(count) | 메시지를 대기열에 추가하려는 시도가 실패한 횟수입니다(파라미터 식별자: `MQIAMO_PUTS_FAILED`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.q_max_depth** <br>(gauge) | 모니터링 기간 동안의 최대 대기열 깊이(파라미터 식별자: `MQIAMO_Q_MAX_DEPTH`).<br>_message로 표시_ |
| **ibm_mq.stats.queue.q_min_depth** <br>(gauge) | 모니터링 기간 동안의 최소 대기열 깊이(파라미터 식별자: `MQIAMO_Q_MIN_DEPTH`).<br>_message로 표시_ |

### 이벤트

IBM MQ는 이벤트를 포함하지 않습니다.

### 서비스 점검

**ibm_mq.can_connect**

Agent가 어떤 이유로든 MQ 서버에 연결할 수 없는 경우 `CRITICAL`을 반환하거나 구성된 대기열 관리자가 `queue_manager_process` 옵션과 일치하지 않는 경우 `UNKNOWN`을 반환합니다. 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical, unknown_

**ibm_mq.queue_manager**

Agent가 대기열 관리자에서 통계를 가져올 수 없는 경우 `CRITICAL`을 반환하거나 구성된 대기열 관리자가 `queue_manager_process` 옵션과 일치하지 않는 경우 `UNKNOWN`을 반환합니다. 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical, unknown_

**ibm_mq.queue**

Agent가 대기열 통계를 가져올 수 없는 경우 `CRITICAL`을 반환합니다. 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**ibm_mq.channel**

Agent가 채널 통계를 가져올 수 없는 경우 `CRITICAL`을 반환합니다. 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**ibm_mq.channel.status**

상태가 INACTIVE/STOPPED/STOPPING이면 `CRITICAL`을 반환합니다. 상태가 RUNNING이면 `OK`를 반환합니다. 상태가 RUNNING으로 전환될 가능성이 있는 경우 `WARNING`을 반환합니다.

_상태: ok, critical, warning, unknown_

## 트러블슈팅

### 재설정 대기열 통계 MQRC_NOT_AUTHORIZED 권한 경고

다음 오류가 나타나는 경우:

```
Warning: Error getting pcf queue reset metrics for SAMPLE.QUEUE.1: MQI Error. Comp: 2, Reason 2035: FAILED: MQRC_NOT_AUTHORIZED
```

이는 `datadog` 사용자에게 재설정 대기열 메트릭을 수집할 `+chg` 권한이 없기 때문입니다. 이 문제를 해결하려면 [`setmqaut`를 사용하여](https://www.ibm.com/docs/en/ibm-mq/9.2?topic=reference-setmqaut-grant-revoke-authority) `datadog` 사용자에게 `+chg` 권한을 부여하고 재설정 대기열 메트릭을 수집하거나 `collect_reset_queue_metrics`를 비활성화할 수 있습니다.

```yaml
collect_reset_queue_metrics: false
```

### 높은 리소스 이용률

IBM MQ 검사는 서버에서 쿼리를 수행합니다. 때때로 이러한 쿼리는 비용이 많이 들고 검사 성능 저하를 일으킬 수 있습니다.

검사를 실행하는 데 시간이 오래 걸리거나 호스트에서 많은 리소스를 소모하는 것으로 확인되면 다음을 시도하여 검사 범위를 잠재적으로 줄일 수 있습니다.

- `auto_discover_queues`를 사용하는 경우 특정 대기열만 검색하려면 `queue_patterns` 또는 `queue_regex`를 사용해 보세요. 이는 시스템이 동적 대기열을 생성할 때 특히 유용합니다.
- `queue_patterns` 또는 `queue_regex`를 사용하여 대기열을 자동 검색하는 경우 _더 적은_ 대기열과 일치하도록 패턴이나 정규식을 강화해 보세요. 
- 채널이 너무 많을 경우 `auto_discover_channels`를 비활성합니다.
- `collect_statistics_metrics`를 비활성화합니다.

### 로그 오류

- `Unpack for type ((67108864,)) not implemented`: 이와 같은 오류가 표시되고 MQ 서버가 IBM OS에서 실행되고 있는 경우 `convert_endianness`를 활성화하고 Agent를 다시 시작하세요.

### 로그 경고

- `Error getting [...]: MQI Error. Comp: 2, Reason 2085: FAILED: MQRC_UNKNOWN_OBJECT_NAME`: 이와 같은 메시지가 표시된다면 통합이 존재하지 않는 대기열에서 메트릭을 수집하려고 하기 때문입니다. 이는 잘못된 구성으로 인해 발생하거나, `auto_discover_queues`를 사용하는 경우 해당 통합이 [동적 대기열](https://www.ibm.com/docs/en/ibm-mq/9.2?topic=queues-dynamic-model)을 검색할 수 있으며 메트릭을 수집하려고 시도할 때 대기열이 더 이상 존재하지 않기 때문일 수 있습니다. 이 경우 더 엄격한 `queue_patterns` 또는 `queue_regex`를 제공하여 문제를 완화하거나 경고를 무시할 수 있습니다.

### 기타

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 IBM MQ 메트릭 및 로그 모니터링](https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog)