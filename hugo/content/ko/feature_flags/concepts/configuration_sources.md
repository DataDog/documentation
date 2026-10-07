---
description: Datadog Feature Flags 서버 SDK가 플래그 구성을 수신하는 방법을 알아보세요.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags 설정
- link: /feature_flags/implementation_patterns/serverless/
  tag: 설명서
  text: 서버리스 환경에서 Feature Flags 사용
- link: /remote_configuration/
  tag: 설명서
  text: Remote Configuration 알아보기
title: 서버 SDK 구성 소스
---
Datadog Feature Flags [서버 측 SDK][3]는 플래그 구성에서 플래그를 로컬로 평가합니다. _구성 소스_는 SDK가 해당 구성을 수신하는 방법을 결정하며, OpenFeature 평가 의미 체계는 변경하지 않습니다.

## 구성 소스 선택 {#choose-a-configuration-source}

지원되는 서버 SDK에서 다음 구성 소스 옵션을 사용할 수 있습니다.

`agentless`
: SDK는 HTTPS를 통해 Datadog 관리 CDN에서 주기적으로 플래그 구성을 가져옵니다.
  - 애플리케이션 코드가 Datadog OpenFeature 공급자를 초기화하거나 액세스할 때 폴링이 시작됩니다.
  - 플래그 구성을 위해 Datadog Agent는 필요하지 않습니다.

`remote_config`
: Datadog Agent는 Remote Configuration을 통해 플래그 구성을 수신하고 이를 SDK에 전달합니다.
  - `remote_config`를 선택하면 Feature Flags Remote Configuration 구독이 활성화됩니다.
  - Remote Configuration이 활성화된 Datadog Agent가 필요합니다.

Agentless 전달은 [지원되는 SDK 버전](#use-agentless-delivery)의 기본값입니다. 기타 서버 SDK는 플래그 전달을 위해 [Agent Remote Configuration](#use-agent-remote-configuration)을 사용합니다.

소스를 명시적으로 선택하려는 경우에만 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE`를 설정하세요.

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
{{< /code-block >}}

SDK는 초기화 중에 소스를 한 번 결정합니다. 소스를 변경하려면 애플리케이션을 다시 시작하세요.

## Agentless 전달 사용 {#use-agentless-delivery}

Agentless 전달을 시작하려면 다음 최소 버전 중 하나를 사용하세요.

| SDK | 최소 버전 |
|---|---|
| Java `dd-openfeature` 및 `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

Java CDN 전달에는 `dd-openfeature` 및 `dd-java-agent`가 필요합니다. Feature Flags 구성에는 Datadog Agent가 필요하지 않습니다.

애플리케이션 프로세스에서 API 키, Datadog 사이트 및 환경을 구성하세요.

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

그런 다음 애플리케이션 코드에서 Datadog OpenFeature 공급자를 초기화하거나 액세스하세요. [Java][4], [Node.js][2] 또는 [Python][5] 설정 지침을 참조하세요.

구성 소스 또는 공급자 활성화 설정이 필요하지 않습니다. 폴링은 애플리케이션 코드가 공급자를 초기화하거나 액세스할 때만 시작됩니다. 트레이서를 설치하거나 초기화하는 것만으로는 Feature Flags CDN 트래픽이 생성되지 않습니다.

<div class="alert alert-warning">초기 Node.js Agentless 릴리스는 구성 전달 및 로컬 플래그 평가만 지원합니다. 평가 메트릭이나 노출 이벤트를 내보내지 않습니다. Java 및 Python Agentless 전달은 구성 소스만 변경합니다. Java와 Python은 지원되는 Datadog Agent나 Serverless 텔레메트리 경로 없이는 이러한 신호를 내보내지 않습니다.</div>

### Agentless 전달 구성 {#configure-agentless-delivery}

`DD_SITE`를 조직의 Datadog 사이트로 설정합니다. 이 문서 페이지에서 선택한 사이트의 경우 다음을 사용합니다. {{< region-param key="dd_site" code="true" >}}. Agentless 소스는 다음 운영 설정도 지원합니다.

| 환경 변수 | 기본값 | 설명 |
|---|---|---|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` | Datadog 관리형 엔드포인트 | Agentless 플래그 구성 엔드포인트 또는 기본 URL을 재정의합니다. [사용자 지정 Agentless 엔드포인트 사용](#use-a-custom-agentless-endpoint)을 참조하세요. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` | `30` | 완료된 폴링 시도 사이의 시간을 설정하는 양의 정수입니다. Java는 시도 횟수를 제한하지 않지만, Node.js와 Python은 값을 3600초로 제한합니다. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS` | `5` | 개별 구성 요청에 대한 시간 제한을 설정하는 양의 정수입니다. |

SDK는 백그라운드에서 구성을 가져와 로컬에서 플래그를 평가합니다. 개별 플래그 평가는 네트워크 요청을 수행하지 않습니다. Agentless 소스는 다음을 수행합니다.

- 기본적으로 30초마다 폴링
- 기본적으로 5초의 요청 시간 제한 사용
- ETag를 사용하여 변경되지 않은 구성의 다운로드 방지
- 일시적인 네트워크 또는 페이로드 오류가 발생하는 동안 마지막으로 수락된 구성 유지
- 중복 폴링 방지

Datadog 관리형 CDN은 전 세계적으로 분산된 거점, 네트워크 피어링 및 중복 라우팅을 사용합니다. 따라서 서비스 제공 위치는 대부분의 애플리케이션 워크로드와 지리적으로 가까울 가능성이 높습니다.

`DD_API_KEY`를 시크릿 관리자에 보관하고 플래그 구성을 로드하는 애플리케이션 프로세스에만 노출하세요. Agentless 구성 전달은 HTTPS를 통해 애플리케이션에서 Datadog으로 API 키를 직접 보냅니다.

### 사용자 지정 Agentless 엔드포인트 사용 {#use-a-custom-agentless-endpoint}

Datadog 관리형 엔드포인트는 표준 배포에 권장됩니다. 고급 테스트, 로컬 개발 또는 운영자 관리 프록시의 경우 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL`로 재정의하세요.

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL=http://localhost:8080
{{< /code-block >}}

사용자 지정 URL은 HTTP 또는 HTTPS를 사용해야 합니다. 오리진 또는 루트 경로만 포함된 경우, SDK는 표준 플래그 구성 경로를 추가합니다. 루트가 아닌 경로가 포함된 경우, SDK는 해당 경로를 전체 엔드포인트로 사용합니다.

SDK는 `DD_API_KEY`를 HTTPS를 통해서만 기본 Datadog 관리형 엔드포인트로 보냅니다. Datadog API 키를 사용자 지정 엔드포인트로 전달하지 않습니다. 사용자 지정 엔드포인트는 제어된 로컬 개발을 위해 HTTP를 사용할 수 있습니다. 로컬 개발 환경 외부의 모든 엔드포인트에는 HTTPS를 사용하세요.

사용자 지정 엔드포인트 설정이 유효하지 않은 경우, SDK는 공급자를 비활성화 상태로 유지하고 구성 오류를 기록하며, 평가 시 호출자가 제공한 기본값을 반환합니다.

지원되는 SDK 버전에서는 Datadog for Government에 Datadog 관리형 Agentless 전달을 사용할 수 없습니다. 해당 사이트의 애플리케이션은 Agent Remote Configuration을 사용하지 않는 한 호출자가 제공한 기본값을 계속 사용합니다.

### 기존 Remote Configuration 설정 마이그레이션 {#migrate-an-existing-remote-configuration-setup}

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`를 설정한 기존 고객은 마이그레이션 기간 동안 Remote Configuration을 유지합니다. 이 지원 중단된 설정은 장기적으로 사용할 구성이 아니라 호환성을 위한 브리지입니다.

Agentless 전달을 사용할 준비가 되면 다음 단계를 따르세요.

1. `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`를 설정합니다.
2. Datadog 관리형 엔드포인트의 경우 애플리케이션에서 `DD_API_KEY`, `DD_SITE` 및 `DD_ENV`를 구성합니다.
3. 공급자를 초기화하고 플래그 업데이트를 수신하는지 확인합니다.
4. `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`를 삭제합니다. 마이그레이션이 완료된 후 지원 중단된 설정을 활성화된 상태로 두지 마세요.

Agent Remote Configuration을 일시적으로 유지하려면 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`를 설정한 다음 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`를 삭제하세요. API 키는 Agent에 그대로 유지됩니다.

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false`를 설정한 경우 `DD_FEATURE_FLAGS_ENABLED=false`로 대체하세요.

명시적인 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` 값이 레거시 설정보다 우선합니다. 레거시 설정이 삭제되면 명시적 소스가 없는 애플리케이션은 Agentless 전달을 사용합니다. Agent 전달을 유지하려면 지원 중단된 레거시 설정을 삭제하기 전에 `remote_config`를 명시적으로 설정하세요.

## Agent Remote Configuration 사용 {#use-agent-remote-configuration}

Agent 관리형 전달을 사용하려면 소스를 `remote_config`로 설정하세요.

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Java의 경우 Remote Configuration에는 호환되는 `dd-openfeature` 및 `dd-java-agent` 버전이 필요합니다. 두 구성 요소 모두 버전 1.65.0 이상을 사용하세요.

애플리케이션 프로세스가 아닌 Agent에서 API 키를 구성하세요. Agent에서 Remote Configuration이 비활성화된 경우 다시 활성화하세요. Agent 설정 및 네트워크 요구 사항은 [Remote Configuration][1]을 참조하세요.

## 고급 구성 {#advanced-configuration}

### Feature Flags 활성화 또는 비활성화 {#enable-or-disable-feature-flags}

`DD_FEATURE_FLAGS_ENABLED`는 기본값이 `true`이므로 새 설정에서는 이를 설정할 필요가 없습니다. 공급자와 두 구성 전달 경로를 모두 비활성화하려면 이를 `false`로 설정하세요.

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_ENABLED=false
{{< /code-block >}}

### 활성화 및 청구 {#activation-and-billing}

서버 Feature Flags 청구는 Remote Configuration 또는 CDN을 통해 이루어진 구성 요청을 기준으로 합니다. 트레이서를 설치하는 것만으로는 두 전달 경로가 활성화되지 않습니다.

- 기본 Agentless 소스의 경우, 애플리케이션 코드가 Datadog OpenFeature 공급자를 초기화하거나 액세스할 때만 CDN 폴링이 시작됩니다.
- 명시적으로 `remote_config`를 선택하면 Agent Feature Flags 구독이 시작됩니다. 애플리케이션 코드가 공급자를 초기화할 필요가 없습니다.

### 구성 우선 순위{#configuration-precedence}

| 구성 | 결과 |
|---|---|
| `DD_FEATURE_FLAGS_ENABLED=false` | 다른 설정과 관계없이 공급자와 두 전달 경로를 모두 비활성화합니다. |
| 명시적 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` | CDN 전달을 선택합니다. 애플리케이션 코드가 공급자를 초기화하거나 액세스할 때 폴링이 시작됩니다. |
| 명시적 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` | Agent 전달을 선택하고 Feature Flags Remote Configuration 구독을 활성화합니다. |
| 비어 있거나 공백만 있는 경우 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` | 소스가 설정되지 않은 것으로 간주되며, 레거시 마이그레이션 설정 또는 Agentless 기본값이 적용됩니다. |
| 명시적으로 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=offline`을 설정했거나 기타 지원되지 않는 공백이 아닌 값을 설정한 경우 | 애플리케이션 코드가 공급자에 액세스할 때 안전을 위해 비활성화 상태로 실패합니다. SDK는 CDN 또는 Remote Configuration 전달을 선택하지 않습니다. |
| 소스가 없고 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` | 인 경우 마이그레이션 기간 동안 Remote Configuration을 유지합니다. |
| 소스가 없고 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false` | 인 경우 공급자와 두 전달 경로를 모두 비활성화 상태로 유지합니다. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE`와 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`이 모두 설정되지 않은 경우 | Agentless 전달을 선택합니다. 애플리케이션 코드가 공급자를 초기화하거나 액세스할 때 폴링이 시작됩니다. |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/remote_configuration/
[2]: /ko/feature_flags/server/nodejs/
[3]: /ko/feature_flags/server/
[4]: /ko/feature_flags/server/java/
[5]: /ko/feature_flags/server/python/