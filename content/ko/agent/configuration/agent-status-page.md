---
algolia:
  tags:
  - 상태 페이지
aliases:
- /ko/agent/guide/agent-status-page
further_reading:
- link: /agent/troubleshooting/
  tag: 설명서
  text: 에이전트 트러블슈팅
- link: /agent/configuration/agent-configuration-files/
  tag: 가이드
  text: 에이전트 구성 파일
- link: /agent/configuration/agent-commands/
  tag: 가이드
  text: 에이전트 명령
title: 에이전트 v6 상태 페이지
---

에이전트 v6 상태 페이지에는 에이전트 실행과 관련한 정보가 표시됩니다. 내 환경에 맞는 상태 명령을 확인하려면 [에이전트 명령][1]을 참고하세요. 다음 섹션에서는 상태 페이지 컨텐츠를 자세히 안내합니다.

**참고**: 에이전트 버전에 따라 상태 페이지가 조금씩 다를 수 있습니다.

## 에이전트 버전

에이전트와 관련한 일반 정보는 에이전트 버전에 표시됩니다. 다음 예를 참고하세요.
```text
  Status date: 2019-08-29 18:16:41.526203 UTC
  Agent start: 2019-08-29 18:04:18.060507 UTC
  Pid: 12141
  Go Version: go1.11.5
  Python Version: 2.7.16
  Check Runners: 4
  Log Level: info
```

### 경로

이 섹션에는 Datadog 구성 파일, `conf.d` 디렉터리, `checks.d` 디렉터리 경로가 표시됩니다. 다음 예를 참고하세요.
```text
    Config File: /etc/datadog-agent/datadog.yaml
    conf.d: /etc/datadog-agent/conf.d
    checks.d: /etc/datadog-agent/checks.d
```

### 시계

이 섹션에는 [NTP 오프셋][2]과 시스템 UTC 시간이 표시됩니다. 다음 예를 참고하세요.
```text
    NTP offset: 2.095ms
    System UTC time: 2019-08-29 18:16:41.526203 UTC
```

### 호스트 정보

이 섹션에는 호스트가 실행되는 호스트에 관한 정보가 표시됩니다. 다음 예를 참고하세요.
```text
    bootTime: 2019-08-29 18:01:27.000000 UTC
    kernelVersion: 4.4.0-109-generic
    os: linux
    platform: ubuntu
    platformFamily: debian
    platformVersion: 16.04
    procs: 175
    uptime: 2m53s
    virtualizationRole: guest
    virtualizationSystem: vbox
```

### 호스트 이름

이 섹션에는 에이전트에서 사용된 호스트 이름(아래 예 참고)가 표시됩니다. `hostname`은 백엔드에 보고된 최종 호스트 이름입니다. 더 자세한 정보는 [Datadog에서 에이전트 호스트 이름을 정하는 방법][3]을 참고하세요.

```text
    hostname: ubuntu-xenial
    socket-fqdn: ubuntu-xenial
    socket-hostname: ubuntu-xenial
    hostname provider: os
    unused hostname providers:
      aws: not retrieving hostname from AWS: the host is not an ECS instance, and other providers already retrieve non-default hostnames
      configuration/environment: hostname is empty
      gce: unable to retrieve hostname from GCE: Get http://169.254.169.254/computeMetadata/v1/instance/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

## 컬렉터(Collector)

### 점검 실행

이 섹션에는 실행 중인 점검 인스턴스 목록이 표시됩니다. 다음 예를 참고하세요.

```text
    load
    ----
      Instance ID: load [OK]
      Total Runs: 4
      Metric Samples: Last Run: 6, Total: 24
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 0, Total: 0
      Histogram Buckets: Last Run: 12, Total: 36
      Average Execution Time : 6ms
```

용어 및 설명:

| 용어                   | 설명                                                      |
|------------------------|------------------------------------------------------------------|
| Instance ID            | 인스턴스 ID와 점검 상태                     |
| Total Runs             | 인스턴스가 실행된 총 횟수                  |
| Metric Samples         | 가져온 메트릭 수.                                   |
| Events                 | 트리거된 이벤트 수.                                  |
| Service Checks         | 보고된 서비스 점검 수.                           |
| Histogram Buckets      | 전송된 히스토그램 버킷 수.                            |
| Average Execution Time | 인스턴스를 실행하는 데 걸린 평균 시간.                      |
| Last Run               | 마지막 점검을 실행한 수.                            |
| Total                  | 에이전트가 최근 시작하거나 재시작한 후의 총수. |

### 구성 오류

이 섹션에는 구성 오류와 관련한 점검이 있는지를 표시합니다. 다음 예를 참고하세요.

```text
    test
    ----
      Configuration file contains no valid instances
```

### 로딩 오류

이 섹션에는 로딩 오류와 관련한 점검이 있는지를 표시합니다. 다음 예를 참고하세요.

```text
    test
    ----
      Core Check Loader:
        Check test not found in Catalog

      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so

      Python Check Loader:
        unable to import module 'test': No module named test
```

## JMXFetch

이 섹션에는 점검이 없는 경우에도 초기화되고 실패한 JMX 점검이 표시됩니다. 다음 예를 참고하세요.

```text
  Initialized checks
  ==================
    no checks

  Failed checks
  =============
    no checks
```

## 포워더(Forwarder)

포워더에서는 페이로드를 Datadog로 전송할 때 여러 작업자를 이용합니다.

`the forwarder dropped transactions, there is probably an issue with your network`와 같은 경고가 나타날 경우, 작업자가 모두 사용 중이라는 뜻입니다. 따라서 네트워크 성능을 점검하고 `forwarder_num_workers`와 `forwarder_timeout` 옵션을 조정하세요.

### 트랜잭션

이 섹션에는 포워더에서 만든 트랜잭션을 표시합니다. 다음 예를 참고하세요.

```text
    CheckRunsV1: 2
    Dropped: 0
    DroppedOnInput: 0
    Events: 0
    HostMetadata: 0
    IntakeV1: 2
    Metadata: 0
    Requeued: 0
    Retried: 0
    RetryQueueSize: 0
    Series: 0
    ServiceChecks: 0
    SketchSeries: 0
    Success: 6
    TimeseriesV1: 2
    Errors: 1
```

용어 및 설명:

| 용어           | 설명                                                                  |
|----------------|------------------------------------------------------------------------------|
| Success        | 전송하는 데 성공한 트랜잭션 수.                                |
| Errors         | 전송 실패하여 전송을 재시도한 트랜잭션 수.         |
| RetryQueueSize | 현재 재시도 대기 중인 트랜잭션 수.                    |
| Retried        | 트랜잭션 전송을 재시도한 횟수.                               |
| DroppedOnInput | 작업자가 모두 사용 중이어서 중단된 트랜잭션 수.  |
| Dropped        | 재시도 횟수가 너무 많아 중단된 트랜잭션 수. |

### API 키 상태

이 섹션에는 구성된 API 키 상태를 표시합니다. 다음 예를 참고하세요.

```text
    API key ending with ab123: API Key valid
```

## 엔드포인트

이 섹션에는 Datadog 에이전트에서 사용 중인 엔드포인트 목록이 표시됩니다. 다음 예를 참고하세요.

```text
  https://app.datadoghq.com - API Key ending with:
      - ab123
```

## 로그 에이전트

로그 에이전트가 활성화되어 있는 경우, 이 섹션에 프로세스되고 전송된 로그 정보가 표시됩니다. 다음 예를 참고하세요.

```text
    LogsProcessed: 10
    LogsSent: 10
```

## 집계

이 섹션에는 에이전트 집계와 관련한 정보가 표시됩니다. 다음 예를 참고하세요.

```text
  Checks Metric Sample: 399
  Dogstatsd Metric Sample: 123
  Event: 1
  Events Flushed: 1
  Number Of Flushes: 2
  Series Flushed: 273
  Service Check: 20
  Service Checks Flushed: 20
  Sketches Flushed: 8
  Checks Histogram Bucket Metric Sample: 24
```

용어 및 설명:

| 용어                                         | 설명                                                                                           |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Checks Metric Sample                         | 점검에서 집계로 전송된 총 메트릭 수.                                   |
| Dogstatsd Metric Sample                      | DogStatsD 서버에서 집계로 전송된 총 메트릭 수.                         |
| Event                                        | 집계로 전송된 총 이벤트 수.                                                    |
| Service Check                                | 집계로 보낸 총 서비스 점검 수.                                            |
| Flush                                        | 집계된 메트릭을 Datadog로 전송하기 위해 포워더로 플러시한 횟수.              |
| Sketches Flushed                             | 집계된 분포 메트릭을 Datadog로 전송하기 위해 포워더로 플러시한 횟수. |
| Checks Histogram Bucket Metric Sample        | 점검에서 집계로 전송된 히스토그램 버킷 메트릭 수.                        |

## DogStatsD

이 섹션에는 각 데이터 유형 및 관련된 오류에 따라 DogStatsD 서버에서 수신한 패킷 수가 표시됩니다.

```text
  Event Packets: 0
  Event Parse Errors: 0
  Metric Packets: 122
  Metric Parse Errors: 0
  Service Check Packets: 0
  Service Check Parse Errors: 0
  Udp Bytes: 7,672
  Udp Packet Reading Errors: 0
  Udp Packets: 123
  Uds Bytes: 0
  Uds Origin Detection Errors: 0
  Uds Packet Reading Errors: 0
  Uds Packets: 0
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-commands/#agent-information
[2]: /ko/agent/troubleshooting/ntp/
[3]: /ko/agent/faq/how-datadog-agent-determines-the-hostname/