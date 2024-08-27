---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: 학습 센터
  text: 통합 소개
- link: /integrations/
  tag: 설명서
  text: Datadog 통합 목록 보기
title: 통합 소개
---

## 개요

통합 사용에 대한 가이드입니다. 새 통합 구축에 대한 정보는 [새 통합 생성하기][1] 페이지를 참조하세요.

크게 보았을 때, 통합이란 일반적으로 개별 검토하는 요소에서 통합형 시스템을 구축하는 것을 말합니다. Datadog에서는 통합을 이용하여 인프라스트럭처에서 모든 메트릭과 로그를 수집하여 통합형 시스템을 전체적으로 파악할 수 있습니다. 각각의 요소는 물론, 개별 요소가 전체에 어떻게 영향을 주는지도 확인할 수 있습니다.

**참조**: 프로젝트에 관한 메트릭 수집은 개발 프로세스에서 최대한 빠르게 시작하는 것이 이상적이지만, 어느 단계에서든 시작할 수 있습니다.

Datadog는 크게 3종류의 주요 통합 유형을 지원합니다.

- **Agent 기반** 통합은 Datadog Agent와 함께 설치되며, `check`라고 하는 파이썬(Python) 클래스 메소드를 사용하여 수집하는 메트릭을 정의합니다.
- **인증(크롤러) 기반** 통합은 [Datadog][2]에서 설정됩니다. 이때 API를 사용하여 메트릭을 가져오기 위한 자격 정보를 지정합니다. [Slack][3], [AWS][4], [Azure][5], [PagerDuty][6]를 비롯해 자주 사용되는 통합이 여기에 포함됩니다.
- **라이브러리** 통합에서는 [Datadog API][7]를 사용하여 [Node.js][8]나 [Python][9]을 비롯해 애플리케이션 개발에 쓰인 언어로 애플리케이션을 모니터링할 수 있습니다.

고유한 인하우스 시스템에서 메트릭을 정의하고 Datadog로 메트릭을 전송하는 [커스텀 점검][10]을 구성할 수도 있습니다.

## 통합 설정하기

Datadog Agent 패키지에는 [통합 코어][11]에 Datadog이 공식적으로 지원하는 통합이 포함되어 있습니다. 이러한 통합을 사용하려면 Datadog Agent를 다운로드하세요. 커뮤니티 기반 통합은 [통합 추가][12]에 있습니다. 이러한 통합을 설치하거나 관리하는 방법에 대한 자세한 내용은 [통합 관리 가이드][14]를 참조하세요.

### 권한

통합 타일과 상호 작용하려면 `manage_integrations` 권한이 필요합니다. 자세한 내용은 [RBAC 역할][45]을 참조하세요.

### API와 애플리케이션 키

[Datadog Agent를 설치][15]하려면 [API 키][16]가 필요합니다. Agent가 이미 다운로드된 경우 `datadog.yaml` 파일로 API 키를 설정해주세요. 메트릭과 이벤트 전송을 제외하고, Datadog 기능 대부분을 사용하려면 [애플리케이션 키][16]가 필요합니다. 사용자 계정의 API 키와 애플리케이션 키는 [API 설정 페이지][17]에서 관리할 수 있습니다.

### 설치

크롤러 또는 라이브러리 기반 통합에 접속하고자 하는 경우, [통합 페이지][18]에서 해당하는 제공업체 페이지로 이동하여 구체적인 연결 방법을 알아볼 수 있습니다. 기타 지원되는 통합의 경우에는 [Datadog Agent][15]를 설치하세요. 통합의 대부분은 컨테이너화된 Agent([도커(Docker)][19],[쿠버네티스(Kubernetes)][20])에서 지원됩니다. Agent를 다운로드한 후 [통합 페이지][18]로 이동하여 개별 통합의 구체적인 설정 방법을 확인하시기 바랍니다.

### Agent 통합 설정

대부분의 설정 파라미터는 통합별로 다릅니다. Agent 설정 디렉터리의 루트에 있는 `conf.d` 폴더로 이동하여 Agent 통합을 구성합니다. 통합마다`<INTEGRATION_NAME>.d`라는 이름의 폴더가 있으며, 이 폴더에는 `conf.yaml.example` 파일이 포함되어 있습니다. 이 샘플 파일에는 특정 통합에서 사용 가능한 모든 설정 옵션이 나열되어 있습니다.

특정 통합을 활성화하는 방법은 다음과 같습니다.

1. 해당하는 `<INTEGRATION_NAME>.d` 폴더의 `conf.yaml.example` 파일의 이름을 `conf.yaml`로 재지정합니다.
2. 새로 생성된 설정 파일 내의 필수 파라미터를 환경에 맞는 값으로 업데이트합니다.
3. [Datadog Agent를 재시작합니다][21].

**참조**: 모든 설정 파일은 [@param 스펙][22]에 기재된 형식을 따릅니다.

다음은 [apache 통합][23]에서 메트릭과 로그를 수집하기 위해 필요한 최소 `conf.yaml` 설정 파일의 예시입니다.

```yaml
init_config:
  service: apache

instances:
    - apache_status_url: http://localhost/server-status?auto

logs:
    - type: file
      path: /var/log/apache2/access.log
      source: apache
      sourcecategory: http_web_access
    - type: file
      path: /var/log/apache2/error.log
      source: apache
      sourcecategory: http_web_access
```

동일한 Agent 검사에서 여러 Apache 인스턴스를 모니터링하려면 `instances` 섹션에 인스턴스를 추가합니다.

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### 수집 간격

Datadog 표준 통합에서 기본 수집 간격은 15초입니다. 수집 간격을 변경하려면 파라미터 `min_collection_interval`을 사용하세요. 자세한 정보는 [수집 간격 업데이트][24] 가이드를 참조하시기 바랍니다.

### 태깅

태그 설정은 많은 소스에서 Datadog에 들어오는 데이터를 필터링 및 집계하는데 중요한 부분이 됩니다. 태그 설정에 대한 자세한 내용은 [태그 시작하기][25] 가이드를 참조하세요.

`datadog.yaml` 파일에서 태그를 정의하면 태그는 모든 통합 데이터에 적용됩니다. 즉, `datadog.yaml`에서 태그를 정의하면 모든 새로운 통합에 태그 정보가 그대로 적용됩니다.

예를 들어, 독립적인 개별 시스템을 모니터링하기 위해 [Agent 설정][26]을 할 때는 설정(config) 파일에서 `service`를 설정하시길 권장합니다.

환경을 더욱 원활하게 통합하기 위해 Agent에서 `env` 태그를 설정하는 것도 좋은 방법입니다. 자세한 내용은 [통합형 서비스 태그 설정][27] 가이드를 참조하시기 바랍니다.

기본적으로 통합을 통해 보고되는 메트릭에는 환경에서 자동 탐지된 태그가 포함됩니다. 예를 들어 컨테이너에서 실행되는 Redis 점검에 따라 보고된 메트릭은 `image_name`과 같이 컨테이너를 참조하는 태그를 포함합니다. 이를 비활성화하려면 `ignore_autodiscovery_tags` 파라미터를 `true`로 설정하세요.
```yaml
init_config:

ignore_autodiscovery_tags: true

# 나머지 구성은 여기에
```

### 검증

Agent와 통합 설정을 검증하려면 [Agent의 `status` 하위 명령을 실행][28]하고, 점검 섹션에서 새로운 설정을 찾으세요.

## 다중 통합의 설치

여러 통합을 설치하는 경우에는, 대응하는 `<INTEGRATIONS>.d` 폴더로 새로운 `conf.yaml` 파일에 설정 정보를 추가해야 합니다. `conf.yaml.example` 파일에서 새 통합의 필수 파라미터를 확인하고, 이를 새 `conf.yaml` 파일에 추가한 후 위의 절차에 따라 설정을 검증하세요.

## 자동 탐지된 통합

[프로세스 수집][29]을 설정하면 Datadog는 호스트에서 실행되는 기술을 자동 탐지합니다. 그러면 기술의 모니터링에 도움이 되는 Datadog 통합이 식별됩니다. 자동 탐지된 통합은 [통합 검색][2]에 나타납니다.

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="자동 감지된 통합" >}}

각 통합에는 세 가지 상태 유형 중 하나가 있습니다:

- **Detected**: 호스트에서 기술이 실행되고 있지만 통합이 설치 또는 구성되지 않았으며 일부 메트릭만 수집되고 있습니다. 전체 범위를 포함하도록 통합을 설정하세요. 자동 감지된 기술을 실행 중인 호스트 목록을 찾으려면 통합 타일을 열고 **Hosts** 탭을 선택합니다.
- **Installed**: 이 통합은 호스트에 설치 및 구성됩니다.
- **Available**: **Installed** 및 **Detected** 카테고리에 속하지 않는 모든 통합입니다.

## 보안 정책

Datadog에서 사용자 데이터를 처리하는 방법이나 기타 보안 관련 문제를 자세히 알아보려면 [보안 가이드][30]를 참조하시기 바랍니다.

## 다음 단계

첫 번째 통합 설정이 완료되면 애플리케이션을 통해 Datadog로 전송되는 [모든 메트릭을 조사][31]합니다. 또한 해당 메트릭을 활용하여 [대시보드][32]와 [경고][33]를 설정하고 데이터를 모니터링할 수 있습니다.

또, Datadog의 [로그 관리][34], [APM][35], [모니터링][36] 솔루션도 참조하세요.

## 트러블슈팅

통합과 관련하여 트러블슈팅 시, 먼저 코드 편집기에서 플러그인을 사용하거나 다양한 온라인 도구를 통해 YAML이 유효한지 확인하세요. 다음은 [Agent 트러블슈팅][37] 단계를 실행하는 것입니다.

계속 문제가 발생한다면 [Datadog 지원팀][38]에 문의하세요.

## 주요 용어

`conf.yaml`
: `conf.yaml`을 생성하는 위치는 [Agent의 설정 디렉터리][39]의 루트에 있는 `conf.d/<INTEGRATION_NAME>.d` 폴더입니다. 이 파일을 사용하여 통합과 시스템을 연결하고, 통합 설정을 구성할 수 있습니다.

커스텀 점검
: 고유한 시스템을 모니터링해야 하는 경우나 통합에서 이미 전송된 메트릭을 확장하려는 경우, 메트릭을 정의하여 Datadog로 전송하는 [커스텀 점검][10]을 생성할 수 있습니다. 다만 일반적으로 이용 가능한 애플리케이션, 공용 서비스, 오픈 소스 프로젝트 등을 모니터링하고자 하나 통합이 준비되지 않은 경우라면 커스텀 점검 대신 [새롭게 통합을 구축][1]하는 방안을 고려하시기 바랍니다.

`datadog.yaml`
: Agent 전체가 통합이나 사용자 시스템과 소통하는 방법을 정의하는 주요 설정 파일입니다. 이 파일을 사용하여 API 키, 프록시, 호스트 태그 등의 글로벌 설정을 업데이트할 수 있습니다.

이벤트
: 이벤트는 시스템에 관한 정보 메시지입니다. [이벤트 익스플로러][40]에서 사용하여 이벤트에 대한 모니터링을 설정할 수 있습니다.

인스턴스
: 모니터링 대상이 무엇이든 해당 인스턴스를 `conf.yaml` 파일로 정의하고 매핑하게 됩니다. 예를 들어 [`http_check` 통합][41]의 경우, 업타임이나 다운타임을 모니터링하는 HTTP 엔드포인트의 인스턴스에 관련된 이름을 정의해야 합니다. 동일한 통합으로 **다수의 인스턴스**를 모니터링할 수 있으며, 이러한 모니터링을 원한다면 `conf.yaml` 파일에서 각 인스턴스를 정의하세요.

`<INTEGRATION_NAME>.d`
: 설정이 복잡한 경우, 구성 내용을 여러 `YAML` 파일로 나눈 후, 파일들을 모두 `<INTEGRATION_NAME>.d` 폴더에 저장해 설정을 정의할 수 있습니다. Agent는 `<INTEGRATION_NAME>.d` 폴더 내의 유효한 `YAML` 파일을 모두 불러옵니다.

로그
: 모니터링 대상 시스템에 로그가 있는 경우, [로그 관리 솔루션][34]을 사용하여 Datadog로 보낼 로그를 사용자 설정할 수 있습니다.

`metadata.csv`
: 각 통합을 통해 수집된 메트릭을 목록으로 만들고 저장하는 파일입니다.

메트릭
: 각 통합에 의해 시스템에서 수집되는 항목의 목록입니다. 해당 통합의 `metadata.csv` 파일에서 각 통합에 대한 메트릭을 찾을 수 있습니다. 메트릭에 대한 자세한 내용은 [메트릭][42] 개발자 페이지를 참조하세요. 통합이 기본 메트릭을 제공하지 않는 경우 [커스텀 메트릭][43]을 추가할 수도 있습니다.

파라미터
: `conf.yaml` 파일의 파라미터를 사용하여 통합 데이터 소스와 Agent의 액세스를 제어할 수 있습니다. 각 통합의 `conf.yaml.example` 파일에는 필수 파라미터와 선택형 파라미터가 모두 나열되어 있습니다.

서비스 점검
: 서비스 점검은 서비스 업타임 상태를 추적하기 위해 사용되는 일종의 모니터입니다. 자세한 내용은 [서비스 점검 가이드][44]를 참조하시기 바랍니다.

태그
: [태그][25]를 사용하면 메트릭을 커스텀 설정하여 사용자에게 가장 유용한 형태로 필터링하고 시각화할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /ko/integrations/slack/
[4]: /ko/integrations/amazon_web_services/
[5]: /ko/integrations/azure/
[6]: /ko/integrations/pagerduty/
[7]: /ko/api/
[8]: /ko/integrations/node/
[9]: /ko/integrations/python/
[10]: /ko/developers/custom_checks/write_agent_check/
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[14]: /ko/agent/guide/integration-management/
[15]: https://app.datadoghq.com/account/settings/agent/latest
[16]: /ko/account_management/api-app-keys/
[17]: https://app.datadoghq.com/organization-settings/api-keys
[18]: /ko/integrations/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[20]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[21]: /ko/agent/guide/agent-commands/#restart-the-agent
[22]: /ko/developers/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /ko/developers/custom_checks/write_agent_check/#updating-the-collection-interval
[25]: /ko/getting_started/tagging/
[26]: /ko/getting_started/agent/#setup
[27]: /ko/getting_started/tagging/unified_service_tagging/
[28]: /ko/agent/guide/agent-commands/#agent-status-and-information
[29]: /ko/infrastructure/process/
[30]: /ko/data_security/
[31]: /ko/metrics/explorer/
[32]: /ko/dashboards/
[33]: /ko/monitors/
[34]: /ko/logs/
[35]: /ko/tracing/
[36]: /ko/synthetics/
[37]: /ko/agent/troubleshooting/
[38]: /ko/help/
[39]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[40]: https://app.datadoghq.com/event/explorer
[41]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[42]: /ko/metrics/
[43]: /ko/metrics/custom_metrics/
[44]: /ko/monitors/guide/visualize-your-service-check-in-the-datadog-ui/
[45]: /ko/account_management/rbac/permissions/#integrations