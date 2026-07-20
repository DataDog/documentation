---
app_id: sigsci
app_uuid: edc9a664-24f1-45ee-88ad-04e5da064f51
assets:
  dashboards:
    sigsci: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: sigsci.agent.signal
      metadata_path: metadata.csv
      prefix: sigsci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10037
    source_type_name: Signal Sciences
  monitors:
    Firewall is blocking a high number of requests: assets/monitors/excessiveblockedHTTP.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Signal Sciences
  sales_email: info@signalsciences.com
  support_email: info@signalsciences.com
categories:
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sigsci/README.md
display_on_public_website: true
draft: false
git_integration_title: sigsci
integration_id: sigsci
integration_title: Signal Sciences
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sigsci
public_title: Signal Sciences
short_description: Signal Sciences에서 수집한 데이터로 이상 징후 파악 및 공격 차단
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 카테고리::보안
  - 제공::통합
  configuration: README.md#Setup
  description: Signal Sciences에서 수집한 데이터로 이상 징후 파악 및 공격 차단
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.signalsciences.com/blog/
  support: README.md#Support
  title: Signal Sciences
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

Signal Sciences 메트릭과 이벤트를 Datadog으로 보내 애플리케이션, API, 마이크로서비스에 대한 실시간 공격과 악용을 모니터링하고 Signal Sciences가 예상대로 작동하고 트래픽을 검사하는지 확인하세요.

![image-datadog-sigsci-dashboard][1]

![image-datadog-sigsci-security][2]

Signal Sciences에서 메트릭과 이벤트를 실시간으로 가져와 다음을 수행할 수 있습니다.

- 다음과 관련된 WAF 메트릭을 볼 수 있습니다.

  - 총 요청 수
  - 잠재적 공격의 주요 유형
  - 명령 실행
  - SQL 삽입
  - 크로스 사이트 스크립팅
  - 경로 스캐닝
  - 비정상적인 트래픽
  - 알 수 없는 소스
  - 서버 400/500 오류

- 다음 활동 중에서 Signal Sciences가 차단하거나 악의적인 것으로 간주한 IP를 볼 수 있습니다.

  - OWASP 주입 공격
  - 애플리케이션 DoS
  - 무차별 공격
  - 애플리케이션 악용 및 오용
  - 요청 비율 제한
  - 계정 탈취
  - 악성 봇
  - 가상 패치

- Signal Sciences 에이전트 상태에 대한 알림을 확인하세요

## 설정

Signal Sciences-Datadog 통합을 사용하려면 Signal Sciences 고객이어야 합니다. Signal Sciences에 대한 자세한 정보는 <https://www.signalsciences.com>에서 확인하세요.

### 구성

#### 메트릭 수집

1. [Signal Sciences 에이전트][3]를 설치합니다.

2. DogStatsD를 사용하도록 Signal Sciences 에이전트를 구성합니다.

    각 에이전트의 agent.config 파일에 다음 줄을 추가합니다.

   ```shell
   statsd-type = "dogstatsd"
   ```

    이 작업이 완료되면 에이전트의 StatsD 클라이언트에서 태그 지정이 활성화되고, `sigsci.agent.signal.<SIGNAL_TYPE>`와 같은 메트릭이 `sigsci.agent.signal`로 전송되며, `signal_type:<SIGNAL_TYPE>`로 태그가 지정됩니다.

    _예:_`sigsci.agent.signal.http404` => `signal_type:http404`로 태그가 지정된 `sigsci.agent.signal`

    Kubernetes를 사용하여 Datadog Agent를 실행하는 경우 [Kubernetes DogStatsD 문서][4]에 설명된 대로 DogStatsD 비로컬 트래픽을 활성화해야 합니다.

3. SigSci 에이전트를 구성하여 Datadog Agent로 메트릭을 전송합니다.

    각 에이전트의 `agent.config` 파일에 다음 줄을 추가합니다.

   ```shell
   statsd-address="<DATADOG_AGENT_HOSTNAME>:<DATADOG_AGENT_PORT>"
   ```

4. 버튼을 클릭해 통합을 설치합니다.

5. Datadog에서 "Signal Sciences - Overview" 대시보드가 생성되어 메트릭 캡처를 시작하는지 확인합니다.

#### 이벤트 수집

1. Datadog 내에서 [API 키를 생성합니다][5].

2. [ignal Sciences Dashboard][6]의 Site 탐색 표시줄에서 Manage > Integrations을 클릭하고 Datadog Event 통합 옆에 있는 Add를 클릭합니다.

3. _API Key_ 필드에 API Key를 입력합니다.

4. _Add_를 클릭합니다.

자세한 내용은 [Datadog Signal Sciences 통합][7]을 참고하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "sigsci" >}}


### 이벤트

IP 주소가 Signal Sciences에서 플래그로 표시될 때 이벤트가 생성되어 [Datadog Event Stream][9]으로 전송됩니다.

### 서비스 점검

Signal Sciences 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Signal Sciences 블로그][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-security.png
[3]: https://docs.signalsciences.net/install-guides/
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/dogstatsd/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://dashboard.signalsciences.net
[7]: https://docs.signalsciences.net/integrations/datadog/
[8]: https://github.com/DataDog/integrations-extras/blob/master/sigsci/metadata.csv
[9]: https://docs.datadoghq.com/ko/events/
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.signalsciences.com/blog/