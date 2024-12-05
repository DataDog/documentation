---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: 학습 센터
  text: 로그 관리 시작하기
- link: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
  tag: 학습 센터
  text: 로그 처리 자세히 알아보기
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: 학습 센터
  text: 인덱싱된 로그 볼륨 관리 및 모니터링
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: 학습 센터
  text: 로그 파이프라인 구축 및 관리
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: 학습 센터
  text: 기본 통합 파이프라인을 사용하여 로그 처리
- link: /logs/log_collection/
  tag: 문서
  text: 로그 수집 및 통합
- link: /getting_started/tagging/unified_service_tagging
  tag: 문서
  text: 통합 서비스 태깅 설정법 알아보기
- link: https://dtdg.co/fe
  tag: 기초 구축
  text: 인터랙티브 세션에 참여하여 로그 관리를 최적화하세요
title: 로그 시작하기
---

## 개요

Datadog 로그 관리(또는 로그)를 사용하여 서버, 컨테이너, 클라우드 환경, 애플리케이션, 기존 로그 프로세서 및 포워더 등 여러 로깅 소스에서 로그를 수집할 수 있습니다. 기존 로깅에서는 비용 효율을 유지하기 위해 분석하고 유지할 로그를 따로 선정해야 했습니다. Datadog 제한없는 로그 수집(Logging without Limits*)을 이용하면 로그 수집, 프로세싱, 아카이브, 탐색, 모니터링을 로그 제한 없이 수행할 수 있습니다.

이번 페이지에서는 Datadog로 로그 관리를 시작하는 방법을 알려드리겠습니다. 계정이 아직 없다면 [Datadog 계정][1]을 만들어주세요.

## 로깅 소스 설정

로그 관리에서는 로그 익스플로러에서 데이터를 분석하고 탐색하거나 [트레이싱][2] 및 [메트릭][3]을 연동하여 Datadog 전체에서 유용한 데이터를 연결하거나 가져온 로그를 Datadog [Cloud SIEM][4]에서 사용할 수 있습니다. Datadog 내 로그의 라이프사이클은 로깅 소스에서 로그를 가져오는 단계부터 시작합니다.

{{< img src="/getting_started/logs/getting-started-overview.png" alt="다양한 로그 설정 유형">}}

### 서버

서버에서 Datadog으로 로그를 전달하는 데 사용할 수 있는 몇 가지 [통합][5]이 있습니다. 통합은 Agent의 설정 디렉터리 루트에서 `conf.d/` 폴더 내 `conf.yaml` 파일에 있는 로그 설정 블록을 사용하여 서버에서 Datadog으로 로그를 전달합니다.

```yaml
logs:
  - type: file
    path: /path/to/your/integration/access.log
    source: integration_name
    service: integration_name
    sourcecategory: http_web_access
```

서버에서 로그 수집을 시작하는 방법은 다음과 같습니다.

1. Datadog Agent가 준비되지 않았다면 플랫폼에 [Agent][6]를 설치하세요.

    **참조**: 로그를 수집하려면 Datadog Agent v6 이상의 버전이 필요합니다.

2. Datadog Agent의 기본 설정에서는 로그 수집이 **활성화되지 않은 상태**입니다. 로그 수집을 활성화하려면 `datadog.yaml` 파일에서 `logs_enabled`를 `true`로 설정하세요.

    {{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

3. [Datadog Agent][7]를 재시작합니다.

4. 통합 [활성화 절차][8]를 따르거나, Datadog 사이트의 커스텀 파일 로그 수집 절차를 따라 진행합니다.

    **참조**: 커스텀 파일에서 로그를 수집하고 있으며 파일, TCP/UDP, journald, 또는 윈도우즈 이벤트(Windows Events)를 테일링(tailing)하는 예시가 필요한 경우 [커스텀 로그 수집][9]을 참조하세요.

### 컨테이너

Datadog Agent v6 기준으로, Agent는 컨테이너에서 로그를 수집할 수 있습니다. 컨테이너화 서비스마다 Agent 배포 또는 실행 위치, 로그 라우팅 방법에 따라 구체적인 설정법을 안내하니 참조하시기 바랍니다.

예를 들어 [도커(Docker)][10]는 두 가지 유형의 Agent 설치가 가능합니다. 호스트에서 Agent를 도커 환경 외부에 설치하는 방법, 또는 컨테이너화된 버전의 Agent를 도커 환경 내부에 배포하는 방법이 있습니다.

[쿠버네티스(Kubernetes)][11]의 경우에는 Datadog Agent를 쿠버네티스 클러스터 내부에서 실행해야 합니다. 로그 수집은 DaemonSet 스펙, Helm 차트, 또는 Datadog Operator를 사용하여 설정할 수 있습니다.

컨테이너 서비스에서 로그를 수집하려면 [앱 내 안내][12]를 따라주세요.

### 클라우드

AWS, Azure, Google Cloud 등 여러 클라우드 제공업체의 로그를 Datadog으로 전달할 수 있습니다. 각 클라우드 제공업체에는 고유한 구성 지침이 있습니다.

예를 들어 AWS 서비스 로그는 주로 S3 버켓이나 클라우드와치(CloudWatch) 로그 그룹에 저장되는 경우가 많습니다. 이러한 로그를 구독하고 Amazon Kinesis 스트림으로 전송한 다음, 하나 이상의 대상으로 또 전송할 수 있습니다. Datadog는 Amazon Kinesis Delivery 스트림에 기본으로 설정된 전송 대상 중 하나입니다.

클라우드 서비스에서 로그를 수집하려면 [앱 내 안내][13]를 따라주세요.

### 클라이언트

Datadog는 클라우드에서 SDK나 라이브러리를 통한 로그 수집을 허용합니다. 예를 들어 `datadog-logs` SDK를 사용해 자바스크립트(Javascript) 클라이언트에서 Datadog로 로그를 보낼 수 있습니다.

클라이언트에서 로그 수집을 시작하려면 [앱 내 지침][14]을 따르세요.

### 기타

기존 로깅 서비스나 유틸리티(Rsyslog, FluentD, 로그스태시(Logstash) 등)를 사용 중이라면 Datadog에서 플러그인과 로그 전송 옵션을 지원합니다.

통합을 찾을 수 없다면 *other integrations* 상자에 입력하고, 통합을 이용할 수 있을 때 알림을 받아보세요.

클라우드 서비스에서 로그를 수집하려면 [앱 내 안내][15]를 따라주세요.

## 로그 탐색하기

로깅 소스를 설정하면 로그를 [로그 익스플로러][16]에서 살펴볼 수 있습니다. 익스플로러를 이용하면 로그를 필터링, 집계, 시각화할 수 있습니다.

예를 들어 추가로 조사하려는 서비스에서 로그가 유입되는 경우 `service`로 필터링합니다. 추가로 `ERROR`와 같은 `status`를 기준으로 필터링하고 [Group into Patterns][17]를 선택하여 서비스의 어느 부분에서 가장 많은 오류가 기록되는지 확인할 수 있습니다.

{{< img src="/getting_started/logs/error-pattern-2024.png" alt="오류 패턴 기준으로 Log Explorer에서 필터링">}}

가장 상위의 로깅 서비스를 보려면 로그를 `Fields`로 집계하고 **Top List**로 시각화하세요. `info` 또는 `warn` 등의 소스를 선택하고 드롭다운 메뉴에서 **View Logs**를 선택합니다. 사이드 패널에는 오류에 따라 로그가 채워지므로 주의가 필요한 호스트와 서비스를 빠르게 확인할 수 있습니다.

{{< img src="/getting_started/logs/top-list-view-2024.png" alt="Log Explorer에서의 상위 목록">}}

## 다음 단계

로깅 소스를 설정한 후에는 로그 익스플로러에서 로그를 살펴볼 수 있습니다. 또, 로그 관리의 다른 영역 역시 탐색할 수 있습니다.

### 로그 설정

* [속성과 앨리어싱][18]을 설정하여 로그 환경을 통일합니다.
* [파이프라인][19]과 [프로세서][20]로 로그를 처리할 방법을 관리합니다.
* Logging without Limits*는 로그 수집과 인덱싱을 분리하므로 [로그를 구성][21]하고 [인덱싱][22], [보존][23] 또는 [보관][24]할 로그를 선택할 수 있습니다.

### 로그의 상관관계

* [로그와 트레이스를 연결][2]하여 특정 `env`, `service,`나 `version`과 관련된 로그를 정확하게 보여줍니다.
* 이미 Datadog에서 메트릭을 사용 중이라면 [로그와 메트릭의 상관관계를 지정][3]하여 문제의 컨텍스트를 알아볼 수 있습니다.

### 가이드

* [로그 관리 모범 사례][25]
* [Logging without Limits*][26]에 대해 자세히 알아보기
* [RBAC 설정][27]으로 민감한 로그 데이터 관리

## 추가 읽기

{{< partial name="whats-next/whats-next.html" >}}

<br>
*제한없는 로그 수집(Logging without Limits™)은 Datadog, Inc.의 상표입니다.

[1]: https://www.datadoghq.com
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[3]: /ko/logs/guide/correlate-logs-with-metrics/
[4]: /ko/security/cloud_siem/
[5]: /ko/getting_started/integrations/
[6]: /ko/agent/
[7]: https://github.com/DataDog/datadog-agent/blob/main/docs/agent/changes.md#cli
[8]: https://app.datadoghq.com/logs/onboarding/server
[9]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[10]: /ko/agent/docker/log/?tab=containerinstallation
[11]: /ko/agent/kubernetes/log/?tab=daemonset
[12]: https://app.datadoghq.com/logs/onboarding/container
[13]: https://app.datadoghq.com/logs/onboarding/cloud
[14]: https://app.datadoghq.com/logs/onboarding/client
[15]: https://app.datadoghq.com/logs/onboarding/other
[16]: /ko/logs/explorer/
[17]: /ko/logs/explorer/analytics/patterns/
[18]: /ko/logs/log_configuration/attributes_naming_convention/
[19]: /ko/logs/log_configuration/pipelines/
[20]: /ko/logs/log_configuration/processors/
[21]: /ko/logs/log_configuration/
[22]: https://docs.datadoghq.com/ko/logs/log_configuration/indexes
[23]: https://docs.datadoghq.com/ko/logs/log_configuration/flex_logs
[24]: https://docs.datadoghq.com/ko/logs/log_configuration/archives
[25]: /ko/logs/guide/best-practices-for-log-management/
[26]: /ko/logs/guide/getting-started-lwl/
[27]: /ko/logs/guide/logs-rbac/