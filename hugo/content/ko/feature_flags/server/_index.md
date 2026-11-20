---
description: 서버 측 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: /remote_configuration/
  tag: 설명서
  text: Remote Configuration
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
- link: /feature_flags/implementation_patterns/serverless/
  tag: 설명서
  text: 서버리스 환경 및 Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: 개념
  text: 서버 SDK 구성 소스
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
title: 서버 측 Feature Flags
---
## 개요 {#overview}

서버 측 애플리케이션을 위한 Datadog Feature Flags를 사용하면 기능 가용성을 원격으로 제어하고, 실험을 실행하며, 새로운 기능을 안심하고 출시할 수 있습니다. 서버 측 SDK는 플래그 구성을 수신하고 로컬에서 플래그를 평가합니다. 일부 SDK는 구성 전달 또는 텔레메트리를 위해 Datadog 트레이서를 사용합니다.

Datadog Feature Flags는 Feature Flags API를 위한 공급업체 중립적 오픈 소스 사양인 [OpenFeature 표준](https://openfeature.dev/docs/reference/intro/)을 기반으로 구축되었습니다. 공급자, 평가 컨텍스트, 후크와 같은 OpenFeature 개념을 처음 접하는 경우 [OpenFeature 개념 문서](https://openfeature.dev/docs/category/concepts)를 참조하세요.

## 구성 전달 {#configuration-delivery}

Agentless [구성 전달][8]은 이를 지원하는 서버 SDK 버전의 기본값입니다. SDK는 HTTPS를 통해 Datadog 관리 CDN에서 직접 플래그 구성을 가져온 다음 로컬에서 플래그를 평가합니다. 플래그 구성을 위해 Datadog Agent는 필요하지 않습니다.

기본 소스는 모든 트레이서 설치에 대해 Feature Flags 트래픽을 활성화하지 않습니다. Agentless 폴링은 애플리케이션 코드가 Datadog OpenFeature 공급자를 초기화하거나 액세스할 때만 시작됩니다. `remote_config`를 명시적으로 선택하면 Feature Flags Remote Configuration 구독이 활성화됩니다. 두 소스를 통한 요청 모두 서버 Feature Flags 요금 청구에 포함됩니다.

| SDK | 최소 Agentless 버전 |
|---|---|
| Java `dd-openfeature` 및 `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

Java CDN 전달에는 `dd-openfeature` 및 `dd-java-agent`가 필요합니다. Feature Flags 구성에는 Datadog Agent가 필요하지 않습니다.

<div class="alert alert-warning">초기 Node.js Agentless 릴리스는 구성 전달 및 로컬 플래그 평가만 지원합니다. 평가 메트릭이나 노출 이벤트를 내보내지 않습니다. Java 및 Python Agentless 전달은 구성 소스만 변경합니다. Java와 Python은 지원되는 Datadog Agent나 Serverless 텔레메트리 경로 없이는 이러한 신호를 내보내지 않습니다.</div>

Agentless 전달은 나열된 SDK 및 버전에서 사용할 수 있습니다. 기타 서버 SDK는 Agent Remote Configuration을 사용합니다.

## 언어 선택 {#choose-a-language}

SDK별 설정 지침을 보려면 언어 또는 프레임워크를 선택하세요.

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

Serverless 런타임의 경우, 에이전트 없는 설정, 버전 요구 사항 및 초기 텔레메트리 제한 사항에 대해서는 [Serverless 환경][5]을 참조하세요.

## 전제 조건 {#prerequisites}

요구 사항은 선택한 SDK 및 구성 소스에 따라 다릅니다. 표준 요구 사항은 다음과 같습니다.

- SDK 페이지에 나열된 언어별 트레이서 또는 OpenFeature 공급자 버전
- Datadog [API 키][2]

Java CDN 전달은 애플리케이션 프로세스에 Java 에이전트가 필요합니다. APM 트레이싱이나 별도의 Datadog Agent 서비스는 필요하지 않습니다.

소스별 필수 요구 사항은 다음과 같습니다.

| 소스 | 필수 요구 사항 |
|---|---|
| `agentless` (지원되는 경우 기본값) | 애플리케이션 프로세스에서 `DD_API_KEY`, `DD_SITE` 및 `DD_ENV`를 구성하세요. Feature Flags 구성을 위해 Agent는 필요하지 않습니다. |
| `remote_config` | Remote Configuration이 활성화된 Datadog Agent 7.55 이상, 에이전트에 구성된 API 키, [{{< ui >}}Organization Settings{{< /ui >}}][3]에서 조직에 대해 활성화된 Remote Configuration이 필요합니다. Java는 호환되는 `dd-openfeature` 및 `dd-java-agent` 버전도 필요합니다. |

## Agentless 구성 {#agentless-configuration}

[지원되는 SDK 버전](#configuration-delivery)에서 애플리케이션 프로세스를 구성하세요.

{{< code-block lang="bash" >}}
# Required for direct configuration delivery
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Feature Flags 활성화 또는 소스 설정이 필요하지 않습니다. 종속성 버전 및 언어별 초기화에 대해서는 [Java Feature Flags][10], [Node.js Feature Flags][9] 또는 [Python Feature Flags][11]를 참조하세요. 공급자를 초기화하거나 액세스하면 CDN 폴링이 시작되지만, 트레이서 설치 및 초기화만으로는 시작되지 않습니다.

## Agent Remote Configuration {#agent-remote-configuration}

Java, Node.js 및 Python의 경우, 에이전트 관리형 전달을 유지하려면 소스를 명시적으로 설정하세요.

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Remote Configuration은 Agent 7.47.0 이상에서 기본적으로 활성화되어 있습니다. 에이전트에서 Remote Configuration이 비활성화된 경우, `DD_REMOTE_CONFIGURATION_ENABLED=true`를 설정하거나 `datadog.yaml`에 `remote_configuration.enabled: true`를 추가하여 다시 활성화하세요.

배포 환경 전반에 걸친 자세한 설정 지침은 [Remote Configuration 설명서][1]를 참조하세요.

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`를 사용하는 기존 Java, Node.js 및 Python 구현은 마이그레이션 기간 동안 Remote Configuration으로 유지됩니다. 해당 설정은 더 이상 사용되지 않습니다. Remote Configuration을 명시적으로 유지하거나 Agentless 전달로 이동하려면 [레거시 공급자 설정에서 마이그레이션][7]을 참조하세요.

### Remote Configuration 폴링 간격 {#remote-configuration-polling-interval}

Agent는 구성 가능한 간격으로 Datadog에 구성 업데이트를 폴링합니다.

{{< code-block lang="bash" >}}
# Optional: Configure the Agent polling interval (default: 60s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=10s
{{< /code-block >}}

## 고급 애플리케이션 구성 {#advanced-application-configuration}

표준 Datadog 환경 변수로 애플리케이션을 구성하세요. 이는 모든 서버 측 SDK에서 공통적으로 사용됩니다.

{{< code-block lang="bash" >}}
# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>

# Optional: Disable Feature Flags and both delivery paths
# DD_FEATURE_FLAGS_ENABLED=false

# Optional: Enable flag evaluation metrics
# See "Set Up Server-Side Flag Evaluation Metrics" documentation
{{< /code-block >}}

<div class="alert alert-info">위에 나열된 Java, Node.js 및 Python 버전에서 <code>DD_FEATURE_FLAGS_ENABLED</code> 기본값은 <code>true</code>이므로 설정할 필요가 없습니다. 이를 <code>false</code> (으)로 설정하면 공급자, CDN 폴링 및 Feature Flags Remote Configuration 구독이 비활성화됩니다. 기타 서버 SDK는 해당 언어 페이지에 문서화된 활성화 설정을 계속 사용합니다.</div>

이를 지원하는 SDK 및 전달 모드의 경우, <a href="/feature_flags/guide/server_flag_evaluation_metrics/">서버 측 Feature Flags 평가 메트릭 설정</a>을 참조하여 <code>feature_flag.evaluations</code> 메트릭을 활성화하세요. 초기 Node.js Agentless 릴리스는 평가 메트릭이나 노출 이벤트를 내보내지 않습니다. Java 및 Python이 이러한 신호를 내보내려면 지원되는 Datadog Agent 또는 Serverless 텔레메트리 경로가 필요합니다. 사용 가능한 그래프 작성에 대한 자세한 내용은 <a href="/feature_flags/concepts/flag_graphs/">Feature Flag 그래프</a>를 참조하세요. 필터링 및 실험을 위해 Feature Flags 평가 데이터를 APM 트레이스에 첨부하려면 <a href="/feature_flags/guide/apm_trace_enrichment/">Feature Flags에 대한 APM 트레이스 보강 설정</a>을 참조하세요.

## 인메모리 공급자로 테스트 {#testing-with-in-memory-providers}

Datadog은 다음과 같은 테스트 접근 방식을 지원합니다.

- **통합 테스트**: `DatadogProvider`를 전용 테스트 환경으로 지정하고 Datadog UI에서 플래그 값을 제어합니다. 이는 실제 공급자와 선택된 구성 소스를 엔드투엔드로 실행합니다.
- **단위 테스트**: `DatadogProvider`를 OpenFeature 표준 `InMemoryProvider`(해당 언어에서 인메모리 공급자를 사용할 수 없는 경우, 이에 상응하는 테스트 스텁)으로 교체하고 테스트 코드에서 플래그 값을 직접 설정합니다. 이렇게 하면 테스트가 외부 환경과 격리되고 오프라인 상태로 유지됩니다.

이 섹션에서는 인메모리 접근 방식을 다룹니다. OpenFeature API는 런타임에 공급자를 교체할 수 있도록 설계되었으므로 애플리케이션 코드는 변경되지 않으며, 테스트 설정 중에 등록된 공급자만 변경됩니다.

일반적인 테스트는 다음 패턴을 따릅니다.

1. 테스트 설정에서 플래그 키와 변형의 맵을 빌드합니다.
2. OpenFeature API를 통해 해당 맵으로 `InMemoryProvider`를 등록합니다.
3. 테스트 중인 단위에서 OpenFeature 클라이언트를 호출합니다. `InMemoryProvider`는 테스트 설정에서 구성된 플래그 할당을 반환합니다.
4. 테스트 종료 시 공급자를 재설정하여 테스트 간 상태 누출을 방지합니다.

구체적인 테스트 예시는 해당 언어의 SDK 페이지(이 페이지 상단에서 선택)를 참조하세요.

## 컨텍스트 속성 요구 사항 {#context-attribute-requirements}

<div class="alert alert-warning">
평가 컨텍스트 속성은 중첩되지 않은 원시 값(문자열, 숫자, 부울)이어야 합니다. 중첩된 객체와 배열은 <strong>지원되지 않으며</strong> 이를 사용하면 노출 이벤트가 별도 경고 없이 폐기됩니다.
</div>

평가 컨텍스트에서 평면 속성을 사용하세요.

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID,
  companyId: req.session?.companyID,
  tier: 'enterprise'
};

const value = client.getBooleanValue('my-flag', false, evaluationContext);
{{< /code-block >}}

중첩된 객체와 배열을 피하세요.

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: req.session?.userID,
  company: { id: req.session?.companyID },  // nested object - NOT SUPPORTED
  roles: ['admin', 'user']                   // array - NOT SUPPORTED
};
{{< /code-block >}}

## 추가 자료 {#further-reading}

백분율 기반 롤아웃 및 결정론적 버킷팅에 대해서는 [트래픽 분할 및 무작위화](/feature_flags/concepts/traffic_splitting/)를 참조하세요.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/remote_configuration
[2]: /ko/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /ko/tracing/guide/#tutorials-enabling-tracing
[5]: /ko/feature_flags/implementation_patterns/serverless/
[7]: /ko/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /ko/feature_flags/concepts/configuration_sources/
[9]: /ko/feature_flags/server/nodejs/
[10]: /ko/feature_flags/server/java/
[11]: /ko/feature_flags/server/python/