---
description: Datadog Agent 사용 여부와 관계없이 Serverless 환경에서 Datadog Feature Flags 서버 SDK를
  사용하세요.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: 개념
  text: 서버 SDK 구성 소스
- link: /remote_configuration/
  tag: 설명서
  text: Remote Configuration
- link: /serverless/
  tag: 설명서
  text: Serverless Monitoring
title: Serverless 환경
---
## 개요 {#overview}

Datadog Feature Flags Java, Node.js 및 Python SDK는 Datadog 관리 CDN에서 직접 플래그 구성을 수신할 수 있습니다. 이 _Agentless_ 구성 소스는 플래그 구성에 Datadog Agent가 필요하지 않으므로 온보딩을 간소화합니다. 또한 Datadog Agent에 연결할 수 없는 Serverless 애플리케이션도 지원합니다.

구성이 로드된 후 플래그 평가는 애플리케이션 내에서 로컬로 수행됩니다. SDK는 각 평가마다 네트워크 요청을 수행하지 않습니다.

Agentless 구성 전달은 다음에서 사용할 수 있습니다.

| SDK | 최소 버전 |
|---|---|
| Java `dd-openfeature` 및 `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

Java CDN 전달에는 `dd-openfeature` 및 `dd-java-agent`가 필요합니다. Java 런타임이 `dd-java-agent` JVM 옵션을 사용하여 `-javaagent` 로드를 지원해야 합니다. 이 옵션은 Java 명령에서 전달하거나 `JAVA_TOOL_OPTIONS`를 통해 전달할 수 있습니다.

나열된 버전보다 이전의 다른 서버 SDK 및 버전은 플래그 전달을 위해 Agent Remote Configuration을 필요로 합니다.

<div class="alert alert-warning">초기 Node.js Agentless 릴리스는 구성을 로드하고 로컬에서 플래그를 평가합니다. 평가 메트릭이나 노출 이벤트를 내보내지 않습니다. Java 및 Python Agentless 전달은 구성 소스만 변경합니다. Java와 Python은 지원되는 Datadog Agent나 Serverless 텔레메트리 경로 없이는 이러한 신호를 내보내지 않습니다.</div>

## Agentless 아키텍처 {#agentless-architecture}

Serverless 런타임이 Datadog으로 아웃바운드 HTTPS 요청을 보낼 수 있는 경우 Agentless 전달을 사용하세요. Java의 경우 런타임에서 `-javaagent` JVM 옵션도 설정할 수 있어야 합니다.

1. [지원되는 SDK 버전](#overview)을 사용합니다.
2. Java의 경우 `dd-java-agent`를 `-javaagent` 또는 `JAVA_TOOL_OPTIONS`로 로드합니다. 예시는 [Cloud Run 함수][7] 또는 [Cloud Run 컨테이너][8]에 대한 Java 설정을 참조하세요.
3. Serverless 애플리케이션에서 API 키, Datadog 사이트 및 환경을 구성합니다.

   {{< code-block lang="bash" >}}
   DD_API_KEY=<DATADOG_API_KEY>
   DD_SITE={{< region-param key="dd_site" code="true" >}}
   DD_ENV=<YOUR_ENVIRONMENT>{{< /code-block >}}

4. [Java][6], [Node.js][3] 또는 [Python][9] 설정에 설명된 대로 Datadog OpenFeature 공급자를 초기화하거나 이에 액세스합니다. 이로써 CDN 폴링이 시작됩니다. Feature Flags 활성화 또는 소스 설정이 필요하지 않습니다.
5. `DD_API_KEY`를 Serverless 플랫폼의 보안 관리자에 저장하고 애플리케이션 프로세스에만 노출합니다.

SDK는 기본적으로 30초마다 Datadog 관리 CDN을 폴링하며 변경되지 않은 구성에는 ETag를 사용합니다. 일시적인 오류가 발생하는 동안에는 마지막으로 수락된 구성을 유지합니다. 수락된 구성이 없으면 OpenFeature 평가는 호출자가 제공한 기본값을 반환합니다.

트레이서 설치 및 초기화만으로는 CDN 폴링이 시작되지 않습니다. CDN에 대한 요청은 애플리케이션 코드가 공급자를 활성화한 후에만 서버 Feature Flags 청구에 영향을 미칩니다.

Agentless 모드는 _플래그 구성_에 대한 Datadog Agent 의존성을 제거합니다. 언어별 트레이서 요구 사항은 제거하지 않습니다. 또한 APM 및 Serverless 텔레메트리를 구성하거나 활성화하지 않습니다. Datadog Lambda Extension, `serverless-init`, Agent 사이드카 또는 기타 지원되는 텔레메트리 경로를 독립적으로 사용할 수 있습니다.

## Agent-backed Remote Configuration {#agent-backed-remote-configuration}

기존 Agent Remote Configuration 경로를 명시적으로 사용하도록 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`를 설정하세요.

{{< code-block lang="bash" >}}
# Serverless application
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
{{< /code-block >}}

Java의 경우 호환되는 `dd-openfeature` 및 `dd-java-agent` 버전을 사용하세요. 두 구성 요소 모두 버전 1.65.0 이상을 사용하세요.

Agent를 Remote Configuration 및 API 키로 구성하세요.

{{< code-block lang="bash" >}}
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
{{< /code-block >}}

Serverless 워크로드는 사설 네트워크에서 Agent에 도달할 수 있어야 하며, Agent는 HTTPS를 통해 Datadog에 도달할 수 있어야 합니다. Agent 트레이스 수집을 공개적으로 노출하지 마세요.

`remote_config`를 명시적으로 선택하면 애플리케이션 코드에서 공급자를 초기화하지 않더라도 Feature Flags Remote Configuration 구독이 활성화됩니다. 이러한 요청은 서버 Feature Flags 요금 청구에 포함됩니다.

## 운영 고려 사항 {#operational-considerations}

- **콜드 스타트**: 공급자 초기화를 차단하면 첫 번째 구성을 기다리게 되어 콜드 스타트 지연 시간이 추가될 수 있습니다. 시작 중에 호출자가 제공한 기본값을 반환해도 문제가 없다면 비동기식으로 초기화하세요.
- **아웃바운드 연결**: Agentless 전달을 위해서는 Datadog에서 관리하는 플래그 구성 서비스에 대한 아웃바운드 HTTPS 액세스가 필요합니다.
- **API 키 소유권**: Agentless 모드에서는 애플리케이션이 `DD_API_KEY`를 소유합니다. `remote_config` 모드에서는 Agent가 API 키를 소유합니다.
- **플래그 업데이트**: 전달이 결과적으로 일관성을 유지합니다. 변경 사항을 테스트할 때는 SDK 폴링 간격과 애플리케이션 시작 시간을 고려하세요.
- **마지막으로 알려진 정상 동작**: 구성이 수락된 후에는 일시적인 네트워크 오류나 잘못된 형식의 응답이 이를 대체하지 않습니다.
- **런타임 지원**: Java는 Java 11 이상이 필요합니다. Node.js 및 Python의 경우, 트레이서의 런타임 호환성 요구 사항을 확인하세요.
- **킬 스위치**: `DD_FEATURE_FLAGS_ENABLED`는 기본적으로 `true`입니다. 공급자와 두 구성 전달 경로를 모두 비활성화하려면 이를 `false`로 설정하세요. 그러면 평가가 호출자 제공 기본값을 반환합니다.

Datadog 관리 Agentless 전달은 이러한 버전의 Datadog for Government에서 사용할 수 없습니다. 해당 사이트에서 Agent Remote Configuration을 사용하세요.

배포에서 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`를 사용하는 경우 [레거시 공급자 설정에서 마이그레이션][5]을 참조하세요.

## 환경 참고 사항{#environment-notes}

### AWS Lambda {#aws-lambda}

Java, Node.js 및 Python Lambda 함수는 최소 SDK 버전을 실행하고 HTTPS를 통해 Datadog에 연결할 수 있는 경우 Agentless 구성 전달을 사용할 수 있습니다. Java 함수는 `-javaagent`와 함께 직접 또는 `JAVA_TOOL_OPTIONS`를 통해 `dd-java-agent`를 로드해야 합니다. Java 트레이싱 계층이 이 설정을 제공할 수 있습니다. 플래그 구성을 위해 Datadog Lambda Extension은 필요하지 않습니다.

### Google Cloud Serverless 환경{#google-cloud-serverless-environments}

Java 워크로드는 런타임이 `dd-java-agent`를 로드할 수 있는 경우 Java 11 이상에서 Agentless 구성 전달을 사용할 수 있습니다. [Cloud Run 함수][7] 및 [Cloud Run 컨테이너][8]에 대한 Java 설정은 `JAVA_TOOL_OPTIONS`를 사용하여 `-javaagent`를 설정합니다. Node.js 및 Python 워크로드에는 지원되는 트레이서 런타임이 필요합니다. 모든 런타임에는 아웃바운드 HTTPS 액세스가 필요합니다.

### Azure Functions {#azure-functions}

Java 함수 앱은 런타임이 `dd-java-agent`를 로드할 수 있는 경우 Java 11 이상에서 Agentless 구성 전달을 사용할 수 있습니다. Node.js 및 Python 함수 앱에는 지원되는 트레이서 런타임이 필요합니다. 모든 런타임에는 아웃바운드 HTTPS 액세스가 필요합니다. 외부 Datadog Agent는 `remote_config`가 선택된 경우에만 필요합니다.

### Edge 런타임 {#edge-runtimes}

일부 Edge 런타임은 Feature Flags 공급자에 필요한 Datadog Node.js 트레이서 API를 지원하지 않습니다. Agentless 구성 전달에 의존하기 전에 대상 플랫폼에 대한 트레이서 호환성을 확인하세요.

## 공용 API 및 로컬 평가 {#public-api-and-local-evaluation}

공용 [Feature Flags API][4]는 플래그 및 환경을 관리하기 위한 것입니다. 서버 측 애플리케이션을 위한 요청별 플래그 평가 API가 아닙니다.

플래그를 평가할 목적으로 각 Serverless 호출에서 Datadog API를 쿼리하지 마세요. 정기적으로 플래그 구성을 로드하고 로컬로 평가하는 서버 SDK를 사용하세요.

## 설정 검증 {#validate-your-setup}

프로덕션 환경에서 Feature Flags를 활성화하기 전에 다음을 확인하세요.

1. 애플리케이션이 [최소 지원 SDK 버전](#overview)을 사용하는지 확인합니다. Java 의 경우, JVM 이 `dd-java-agent`를 로드하는지 확인하세요.
2. Agentless 전달의 경우, 애플리케이션에 `DD_API_KEY`, `DD_SITE` 및 `DD_ENV`가 있는지 확인하세요. Agent Remote Configuration의 경우 Agent 에 API 키가 있고 Remote Configuration이 활성화되어 있는지 확인하세요.
3. OpenFeature 공급자를 초기화하고 준비 상태에 도달했는지 확인합니다.
4. Datadog에서 프로덕션 환경이 아닌 플래그를 변경하고 폴링 간격 후에 워크로드가 업데이트된 값을 수신하는지 확인합니다.
5. 콜드 스타트 중에 구성을 사용할 수 없는 경우 애플리케이션이 호출자가 제공한 기본값을 처리하는지 확인합니다.
6. Node.js의 경우, 평가 메트릭이나 노출 데이터를 기반으로 실험 워크플로를 계획하지 않습니다. Java 및 Python의 경우, 이러한 신호를 사용하기 전에 지원되는 Datadog Agent 또는 서버리스 텔레메트리 경로를 구성하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/remote_configuration/
[2]: /ko/feature_flags/server/
[3]: /ko/feature_flags/server/nodejs/
[4]: /ko/api/latest/feature-flags/
[5]: /ko/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[6]: /ko/feature_flags/server/java/
[7]: /ko/serverless/google_cloud_run/functions/java/?tab=maven
[8]: /ko/serverless/google_cloud_run/containers/in_container/java/
[9]: /ko/feature_flags/server/python/