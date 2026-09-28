---
description: Agent 기반, 인증 기반 및 라이브러리 통합을 사용하여 인프라의 메트릭과 로그를 통합하세요.
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: 학습 센터
  text: Integrations 소개
- link: https://learn.datadoghq.com/courses/getting-started-integrations
  tag: 학습 센터
  text: Integrations 시작하기
- link: /integrations/
  tag: 설명서
  text: Datadog 통합 목록 보기
- link: https://www.datadoghq.com/blog/1k-integrations-milestone/
  tag: 블로그
  text: 'Datadog 관측 가능성 확장: 1,000개 이상의 통합'
title: Integrations 소개
---
## 개요 {#overview}

통합 사용에 관한 가이드입니다. 새 통합 구축에 대한 정보는 [새 통합 생성하기][1] 페이지를 참조하세요.

크게 보았을 때, 통합이란 일반적으로 개별 검토하는 요소에서 통합형 시스템을 구축하는 것을 말합니다. Datadog에서는 통합을 이용하여 인프라스트럭처에서 모든 메트릭과 로그를 수집하여 통합형 시스템을 전체적으로 파악할 수 있습니다. 각각의 요소는 물론, 개별 요소가 전체에 어떻게 영향을 주는지도 확인할 수 있습니다.

**참조**: 프로젝트에 대한 메트릭 수집은 가능한 한 개발 프로세스 초기에 시작하는 것이 바람직하지만, 어느 스테이지에서든 시작할 수 있습니다.

Datadog은 크게 3종류의 주요 통합 유형을 지원합니다.

- **Agent 기반** 통합은 Datadog Agent와 함께 설치되며, `check`라는 Python 클래스 메서드를 사용하여 수집할 메트릭을 정의합니다.
- **인증(크롤러) 기반** 통합은 API를 통해 메트릭을 가져오는 데 필요한 자격 증명을 제공하는 [Datadog][2]에서 설정합니다. 여기에는 [Slack][3], [AWS][4], [Azure][5], [PagerDuty][6]와 같은 자주 사용되는 통합이 포함됩니다.
- **라이브러리** 통합은 [Datadog API][7]를 사용하여 [Node.js][8] 또는 [Python][9]과 같이 작성된 언어에 따라 애플리케이션을 모니터링할 수 있도록 합니다.

고유한 인하우스 시스템에서 메트릭을 정의하고 Datadog으로 메트릭을 전송하는 [사용자 지정 검사][10]를 구성할 수도 있습니다.

## 통합 설정하기{#setting-up-an-integration}

Datadog Agent 패키지에는 [통합 코어][11]에 있는 Datadog 공식 지원 통합이 포함되어 있습니다. 이러한 통합을 사용하려면 Datadog Agent를 다운로드하세요. 커뮤니티 기반 통합은 [integrations extras][12]에 있습니다. 이러한 통합을 설치하거나 관리하는 방법에 대한 자세한 내용은 [통합 관리 가이드][14]를 참조하세요.

### 권한 {#permissions}

Integrations 타일과 상호 작용하려면 Integrations Manage 권한이 필요합니다. 자세한 내용은 [RBAC 역할][45]을 참조하세요.

### API 및 애플리케이션 키 {#api-and-application-keys}

[Datadog Agent를 설치][15]하려면 [API 키][16]가 필요합니다. Agent가 이미 다운로드된 경우 `datadog.yaml` 파일에 API 키를 설정해야 합니다. 메트릭 및 이벤트 제출 외에 대부분의 추가 Datadog 기능을 사용하려면 [애플리케이션 키][16]가 필요합니다. [API 설정 페이지][17]에서 계정 API 및 애플리케이션 키를 관리할 수 있습니다.

### 설치 {#installation}

크롤러 또는 라이브러리 기반 통합으로 연결하려면 [Integrations 페이지][18]의 해당 공급자로 이동하여 연결 방법에 대한 구체적인 지침을 확인하세요. 기타 지원되는 통합의 경우 [Datadog Agent][15]를 설치하세요. 대부분의 통합은 컨테이너화된 Agent인 [Docker][19] 및 [Kubernetes][20]에서 지원됩니다. Agent를 다운로드한 후 [Integrations 페이지][18]로 이동하여 개별 통합에 대한 구체적인 구성 지침을 확인하세요.

### Agent 통합 구성하기 {#configuring-agent-integrations}

<div class="alert alert-info"><a href="/agent/fleet_automation/configure_integrations/">Fleet Automation</a>을 사용하면 각 호스트에서 <code>conf.yaml</code> 파일을 편집하는 대신 중앙 UI 및 API에서 원격으로 Agent 통합을 구성할 수 있습니다. 자동 탐지된 서비스를 검색하고, 태그 또는 호스트 필터별로 호스트의 하위 집합에 구성의 범위를 지정하며, 한 번의 액션으로 일치하는 모든 Agent에 배포합니다. 이를 위해서는 Linux 또는 Windows VM에서 Remote Configuration 및 Agent 버전 7.76 이상이 필요합니다.</div>

대부분의 구성 파라미터는 [개별 통합][18]에 따라 다릅니다. Agent 구성 디렉터리의 루트에 있는 `conf.d` 폴더로 이동하여 Agent 통합을 구성합니다. 각 통합에는 `<INTEGRATION_NAME>.d` 폴더가 있으며, 이 폴더에는 `conf.yaml.example` 파일이 포함되어 있습니다. 이 예시 파일에는 특정 통합에 사용할 수 있는 모든 구성 옵션이 나열되어 있습니다.

특정 통합을 활성화하는 방법은 다음과 같습니다.

1. `conf.yaml.example` 파일(해당 `<INTEGRATION_NAME>.d` 폴더 내)의 이름을 `conf.yaml`로 변경합니다.
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

동일한 Agent 검사에서 여러 Apache 인스턴스를 모니터링하려면 `instances` 섹션에 추가 인스턴스를 추가하세요.

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### 수집 간격 {#collection-interval}

모든 Datadog 표준 통합의 기본 수집 간격은 15초입니다. 수집 간격을 변경하려면 `min_collection_interval` 파라미터를 사용하세요. 자세한 내용은 [수집 간격 업데이트하기][24]를 참조하세요.

### 태깅 {#tagging}

태그 설정은 많은 소스에서 Datadog에 들어오는 데이터를 필터링 및 집계하는 핵심 부분입니다. 태그 설정에 대한 자세한 내용은 [태그 시작하기][25]를 참조하세요.

`datadog.yaml` 파일에서 태그를 정의하면 모든 통합 데이터에 태그가 적용됩니다. `datadog.yaml`에서 태그를 정의하면 모든 새 통합에 해당 태그가 파생됩니다.

예를 들어, 독립적인 개별 시스템을 모니터링하기 위해 [Agent 설정][26]을 할 때는 설정(config) 파일에서 `service`를 설정하는 것을 권장합니다.

환경을 더욱 원활하게 통합하기 위해 Agent에서 `env` 태그를 설정하는 방법도 권장합니다. 자세한 내용은 [Unified Service Tagging][27]을 참조하세요.

#### 검사별 태그 구성 {#per-check-tag-configuration}
전역 Agent 수준 설정을 재정의하여 개별 검사에 대한 태그 동작을 사용자 지정할 수 있습니다.

1. **Autodiscovery 태그 비활성화하기**

    기본적으로 통합에서 보고하는 메트릭에는 환경에서 자동으로 탐지된 태그가 포함됩니다. 예를 들어, 컨테이너 내부에서 실행되는 Redis 검사에서 보고하는 메트릭에는 `image_name`과 같이 컨테이너와 관련된 태그가 포함됩니다. `ignore_autodiscovery_tags` 파라미터를 `true`로 설정하여 이 동작을 비활성화할 수 있습니다.

1. **통합 검사별 태그 카디널리티 설정하기**

    `check_tag_cardinality` 파라미터를 사용하여 검사별로 태그 카디널리티 수준(low, orchestrator, high)을 정의할 수 있습니다. 이는 Agent 구성에 정의된 전역 태그 카디널리티 설정을 재정의합니다.

```yaml
init_config:
# Ignores tags coming from autodiscovery
ignore_autodiscovery_tags: true

# Override global tag cardinality setting
check_tag_cardinality: low

# Rest of the config here
```

컨테이너화된 환경의 경우 [Kubernetes Autodiscovery 주석][47]을 통해서도 해당 파라미터를 설정할 수 있습니다.

### 유효성 검사 {#validation}

Agent 및 통합 설정을 검증하려면 [Agent의 `status` 하위 명령을 실행][28]하고, Checks 섹션에서 새로운 설정을 확인하세요.

## 다중 통합 설치하기 {#installing-multiple-integrations}

둘 이상의 통합을 설치하려면 해당 `<INTEGRATIONS>.d` 폴더의 새 `conf.yaml` 파일에 구성 정보를 추가하면 됩니다. `conf.yaml.example` 파일에서 새 통합에 필요한 파라미터를 찾아 새 `conf.yaml` 파일에 추가한 다음, 동일한 단계를 따라 구성을 검증하세요.

## 자동 탐지된 통합 {#autodetected-integrations}

[프로세스 수집][29]을 설정하면 Datadog이 호스트에서 실행 중인 기술을 자동으로 탐지합니다. 이를 통해 해당 기술을 모니터링하는 데 도움이 되는 Datadog 통합을 식별할 수 있습니다. 이렇게 자동 탐지된 통합은 [통합 검색][2]에 표시됩니다.

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="자동 탐지된 통합" >}}

각 통합은 네 가지 상태 유형 중 하나에 해당합니다.

- {{< ui >}}Detected{{< /ui >}}: 기술이 호스트에서 실행 중이지만 통합이 설치 또는 구성되지 않아 부분적인 메트릭만 수집되고 있습니다. 전체 범위를 보장하려면 통합을 구성하세요. 자동 탐지된 기술을 실행 중인 호스트 목록을 찾으려면 통합 타일을 열고 {{< ui >}}Hosts{{< /ui >}} 탭을 선택합니다.
- {{< ui >}}Installed{{< /ui >}}: 이 통합은 호스트에 설치 및 구성됩니다.
- {{< ui >}}Available{{< /ui >}}: {{< ui >}}Installed{{< /ui >}} 및 {{< ui >}}Detected{{< /ui >}} 범주에 속하지 않는 모든 통합입니다.
- {{< ui >}}Missing Data{{< /ui >}}: 지난 24시간 동안 통합 메트릭이 탐지되지 않았습니다. 

## 보안 정책 {#security-practices}

Datadog에서 사용자 데이터를 처리하는 방법이나 기타 보안 관련 문제를 자세히 알아보려면 [보안 가이드][30]를 참조하시기 바랍니다.

## 세분화된 액세스 제어 {#granular-access-control}
기본적으로 통합 리소스(계정, 서비스, 웹훅)에 대한 액세스는 제한되지 않습니다. 세분화된 액세스 제어를 사용하여 통합 리소스 수준에서 사용자, 팀, 역할 또는 전체 조직의 동작을 제한할 수 있습니다.

**참고**: 제한된 액세스 옵션은 통합이 세분화된 액세스 제어를 지원하는 경우에만 표시됩니다. 통합에 대해 세분화된 액세스 제어가 지원되는지 확인하려면 해당 [통합 설명서][46]를 검토하시기 바랍니다.
{{< img src="getting_started/integrations/GRACE integration-account-modal.png" alt="세분화된 액세스 제어" style="width:70%;" >}}

1. 통합 조회 시 {{< ui >}}Configure{{< /ui >}} 탭으로 이동하여 세분화된 액세스 제어를 적용할 리소스(계정, 서비스, 웹훅)를 찾습니다. 
2.  {{< ui >}}Set Permissions{{< /ui >}}를 클릭합니다.
3. 기본적으로 조직 내 모든 사람이 전체 액세스 권한을 가집니다. {{< ui >}}Restrict Access{{< /ui >}}를 클릭합니다. 
4. 대화 상자가 업데이트되며 조직 내 구성원은 기본적으로 {{< ui >}}Viewer{{< /ui >}} 액세스 권한을 갖는 것으로 표시됩니다.
5. 드롭다운을 사용하여 모니터를 편집할 수 있는 하나 이상의 팀, 역할 또는 사용자를 선택합니다.
    **참고**: 개별 리소스를 편집하려면 [통합 관리][45] 권한도 필요합니다.  
6.  {{< ui >}}Add{{< /ui >}}를 클릭합니다.
7. 대화 상자가 업데이트되어 업데이트된 권한이 표시됩니다.
8.  {{< ui >}}Save{{< /ui >}}를 클릭합니다. 통합 페이지가 업데이트된 권한으로 자동 새로고침됩니다. 

**참고:** 리소스에 대한 편집 권한을 유지하려면 저장하기 전에 자신이 속한 역할 또는 팀을 최소 하나 이상 포함해야 합니다.

액세스가 제한된 통합 리소스를 다시 모든 사용자가 접근할 수 있도록 하려면 다음 단계를 따르세요.

1. 통합 조회 시 {{< ui >}}Configure{{< /ui >}} 탭으로 이동하여 일반 액세스 권한을 복원할 리소스(계정, 서비스, 웹훅)를 찾습니다.
2.  {{< ui >}}Set Permissions{{< /ui >}}를 클릭합니다.
3.  {{< ui >}}Restore Full Access{{< /ui >}}를 클릭합니다.
4.  {{< ui >}}Save{{< /ui >}}를 클릭합니다. 통합 페이지가 업데이트된 권한으로 자동 새로고침됩니다. 

## 다음 단계는? {#whats-next}

첫 번째 통합 설정이 완료되면 애플리케이션을 통해 Datadog으로 전송되는 [모든 메트릭을 조사][31]합니다. 또한 해당 메트릭을 활용하여 [대시보드][32]와 [경고][33]를 설정하고 데이터를 모니터링할 수 있습니다.

Datadog의 [로그 관리][34], [APM][35], [Synthetic Monitoring][36] 솔루션도 참조하세요.

## 문제 해결하기 {#troubleshooting}

통합 문제를 해결하는 첫 번째 단계는 코드 편집기의 플러그인을 사용하거나, 다양한 온라인 도구 중 하나를 사용하여 YAML이 유효한지 확인하는 것입니다. 다음 단계로는 모든 [Agent 문제 해결][37] 단계를 수행하세요.

계속 문제가 발생한다면 [Datadog 지원팀][38]에 문의하세요.

## 주요 용어 {#key-terms}

`conf.yaml`
: [Agent 구성 디렉터리][39] 루트의 `conf.d/<INTEGRATION_NAME>.d` 폴더에 `conf.yaml`을 생성합니다. 이 파일을 사용하여 통합을 시스템에 연결하고 설정도 구성하세요.

사용자 지정 검사
: 모니터링하려는 고유한 시스템이 있거나 통합을 통해 이미 전송된 메트릭을 확장하려는 경우, [사용자 지정 검사][10]를 구성하여 메트릭을 정의하고 Datadog으로 보낼 수 있습니다. 그러나 일반적으로 사용 가능한 애플리케이션, 공개 서비스 또는 오픈 소스 프로젝트를 모니터링하려는데 통합이 존재하지 않는 경우, 사용자 지정 검사 대신 [새 통합 구축][1]을 고려하세요.

`datadog.yaml`
: Agent 전체가 자체 통합 및 시스템과 상호 작용하는 방식을 정의하는 기본 구성 파일입니다. 이 파일을 사용하여 API 키, 프록시, 호스트 태그 및 기타 전역 설정을 업데이트하세요.

이벤트
: 이벤트는 시스템에 관한 정보 메시지로, [이벤트 탐색기][40]에서 사용하여 해당 이벤트에 대한 모니터링을 설정할 수 있습니다.

인스턴스
: 모니터링 대상의 인스턴스는 `conf.yaml` 파일에 정의 및 매핑됩니다. 예를 들어, [`http_check` 통합][41]에서는 가동 시간과 가동 중지를 모니터링하는 HTTP 엔드포인트 인스턴스와 관련된 이름을 정의합니다. 동일한 통합 내에서 **여러 인스턴스**를 모니터링할 수 있으며, `conf.yaml` 파일에 모든 인스턴스를 정의하여 수행합니다.

`<INTEGRATION_NAME>.d`
: 구성이 복잡한 경우 여러 `YAML` 파일로 나누어 `<INTEGRATION_NAME>.d` 폴더에 모두 저장해 구성을 정의할 수 있습니다. Agent는 `<INTEGRATION_NAME>.d` 폴더에 있는 모든 유효한 `YAML` 파일을 로드합니다.

로깅
: 모니터링 대상 시스템에 로그가 있는 경우, [Log Management 솔루션][34]을 사용하여 Datadog으로 보낼 로그를 사용자 설정할 수 있습니다.

`metadata.csv`
: 각 통합을 통해 수집된 메트릭을 목록으로 만들고 저장하는 파일입니다.

메트릭
: 각 통합을 통해 시스템에서 수집되는 항목의 목록입니다. 각 통합에 대한 메트릭은 해당 통합의 `metadata.csv` 파일과 통합 문서 페이지의 **수집된 데이터** 표에서 확인할 수 있습니다. 해당 표에서 *\<unit\>으로 표시*와 함께 나열된 메트릭은 이미 통합 메타데이터에 단위가 정의되어 있습니다. 이 표기법이 없는 메트릭은 기본적으로 설정된 단위가 없으므로 [메트릭 요약][48] 페이지에서 수동으로 구성해야 합니다. 메트릭에 대한 자세한 내용은 [메트릭][42] 개발자 페이지를 참조하세요. [사용자 지정 메트릭][43]을 설정할 수도 있으므로 통합에서 기본적으로 메트릭을 제공하지 않는 경우 일반적으로 추가할 수 있습니다.

파라미터
: `conf.yaml` 파일의 파라미터를 사용하여 통합 데이터 소스와 Agent 간의 액세스를 제어하세요. 개별 통합 `conf.yaml.example` 파일에는 필수 및 선택 파라미터가 모두 나열되어 있습니다.

서비스 검사
: 서비스 검사는 서비스의 가동 시간 상태를 추적하는 데 사용되는 모니터링 유형입니다. 자세한 내용은 [서비스 검사 가이드][44]를 참조하세요.

태깅
: [태그][25]는 메트릭에 사용자 지정 설정을 추가하여 가장 유용한 방식으로 필터링하고 시각화할 수 있도록 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/extend/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /ko/integrations/slack/
[4]: /ko/integrations/amazon_web_services/
[5]: /ko/integrations/azure/
[6]: /ko/integrations/pagerduty/
[7]: /ko/api/
[8]: /ko/integrations/node/
[9]: /ko/integrations/python/
[10]: /ko/extend/custom_checks/write_agent_check/
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
[22]: /ko/extend/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /ko/extend/custom_checks/write_agent_check/#updating-the-collection-interval
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
[46]: /ko/integrations/
[47]: /ko/containers/kubernetes/integrations/#tag-cardinality
[48]: https://app.datadoghq.com/metric/summary