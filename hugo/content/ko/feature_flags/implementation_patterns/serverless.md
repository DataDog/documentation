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

다음 표는 각 SDK 버전에서 사용할 수 있는 Feature Flags 기능을 보여줍니다.

| SDK | 최소 버전 | Agentless 구성 및 로컬 평가 | 실험 노출 이벤트 | Event Platform Proxy(EVP) 플래그 평가 이벤트 | 이벤트 전달 |
|---|---|---|---|---|---|
| Java `dd-openfeature` 및 `dd-java-agent` | 1.66.0 | 지원됨 | 지원됨 | 지원됨 | 호환되는 로컬 텔레메트리 릴레이를 사용하는 것이 좋으며, 사용할 수 없는 경우 직접 폴백을 사용하세요 |
| Node.js `dd-trace` | 6.12.0 | 지원됨 | 지원됨 | 지원되지 않음 | 호환되는 로컬 텔레메트리 릴레이를 사용하는 것이 좋으며, 사용할 수 없는 경우 직접 폴백을 사용하세요 |
| Python `ddtrace` | 4.14.0 | 지원됨 | 지원됨 | 지원됨 | 호환되는 로컬 텔레메트리 릴레이 |

Java CDN 전달에는 `dd-openfeature` 및 `dd-java-agent`가 필요합니다. Java 런타임이 `-javaagent` JVM 옵션을 사용하여 `dd-java-agent` 로드를 지원해야 합니다. 이 옵션은 Java 명령에서 전달하거나 `JAVA_TOOL_OPTIONS`를 통해 전달할 수 있습니다.

나열된 버전은 표에 표시된 기능을 제공합니다. 기타 서버 SDK는 플래그 전달을 위해 Agent Remote Configuration을 사용합니다.

Agentless 전달은 플래그 구성 소스만 변경합니다. Feature Flags 이벤트는 호환되는 로컬 텔레메트리 릴레이 또는 지원되는 직접 경로에 대한 별도의 연결을 사용합니다.

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
5. `DD_API_KEY`를 Serverless 플랫폼의 시크릿 관리자에 저장하고 애플리케이션 프로세스에만 노출합니다.

SDK는 기본적으로 30초마다 Datadog 관리 CDN을 폴링하며 변경되지 않은 구성에는 ETag를 사용합니다. 일시적인 오류가 발생하는 동안에는 마지막으로 수락된 구성을 유지합니다. 수락된 구성이 없으면 OpenFeature 평가는 호출자가 제공한 기본값을 반환합니다.

트레이서 설치 및 초기화만으로는 CDN 폴링이 시작되지 않습니다. CDN에 대한 요청은 애플리케이션 코드가 공급자를 활성화한 후에만 서버 Feature Flags 청구에 영향을 미칩니다.

Agentless 모드는 _플래그 구성_에 대한 Datadog Agent 의존성을 제거합니다. 언어별 트레이서 요구 사항은 제거하지 않습니다. 또한 APM 및 Serverless 텔레메트리를 구성하거나 활성화하지 않습니다. Datadog Lambda Extension, `serverless-init`, Agent 사이드카 또는 기타 지원되는 텔레메트리 경로를 독립적으로 사용할 수 있습니다.

## Feature Flags 텔레메트리 전송 {#send-feature-flag-telemetry}

`serverless-init`은 호환되는 로컬 텔레메트리 릴레이 중 하나입니다. 이는 Feature Flags 구성 소스가 아닙니다. CDN에서 구성을 로드하려면 기본 `agentless` 소스를 유지하세요.

`remote_config`를 선택할 때 `serverless-init`을 Datadog Agent의 대체품으로 사용하지 마세요. Agent Remote Configuration에는 Datadog Agent가 필요합니다.

직접 폴백이란 호환되는 로컬 텔레메트리 릴레이를 사용할 수 없을 때 SDK가 인증된 EVP 이벤트를 Datadog으로 전송하는 것을 의미합니다.

다음 동작에 유의하세요.

- 실험 노출 이벤트는 실험과 관련된 플래그에 대해서만 발생합니다.
- Java 및 Python은 EVP 플래그 평가 이벤트를 집계하여 기본적으로 전송합니다.
- EVP 플래그 평가 이벤트 경로만 비활성화하려면 `DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false`를 설정하세요.

`feature_flag.evaluations` 메트릭은 별도의 OpenTelemetry(OTLP) 신호입니다. 포트 8126의 표준 `serverless-init` 연결은 이 메트릭에 대한 OTLP 엔드포인트를 구성하지 않습니다. Agent가 없는 서버리스 환경의 경우, 이 메트릭을 활성화하기 전에 플랫폼에 대한 서버리스 텔레메트리 경로를 구성하세요. [서버 측 플래그 평가 메트릭 설정][10]을 참조하세요.

### serverless-init 구성 {#configure-serverless-init}

1. 플랫폼에 대한 [Serverless Monitoring][11] 설정을 완료하세요. 해당 지침은 지원되는 컨테이너 내부 및 사이드카 구성, 필수 환경 변수, 네트워크 설정을 제공합니다.

1. 다음 Feature Flags 요구 사항을 적용합니다.
   - `serverless-init` 1.9.13 이상을 사용하세요. 이전 버전은 필요한 EVP 경로를 지원하지 않습니다.
   - Agentless CDN 구성 전달을 위해 애플리케이션 환경에 `DD_API_KEY` 및 `DD_SITE`를 유지하세요. 사이드카도 텔레메트리 송신에 해당 항목이 필요합니다.
   - Feature Flags 전용 엔드포인트를 구성하지 마세요. SDK는 Serverless Monitoring 설정에 의해 구성된 표준 트레이서 연결을 사용합니다.
   - Node.js 및 Java는 로컬 EVP 프록시를 찾기 위해 트레이서 URL에서 `GET /info`를 호출합니다. Python은 이 검색 요청 없이 동일한 URL로 지원되는 EVP 이벤트를 보냅니다.

### 텔레메트리 송신 검증 {#verify-telemetry-egress}

1. OpenFeature 공급자를 초기화하고 준비 상태에 도달했는지 확인합니다.
2. 실험과 관련된 플래그를 평가한 다음, 실험이 노출 이벤트를 수신하는지 확인합니다.
3. 로컬 텔레메트리 릴레이를 사용하는 경우, 애플리케이션 및 `serverless-init` 로그에서 포트 8126에 대한 연결 오류를 확인합니다.
4. Java 및 Python의 경우, EVP 플래그 평가 이벤트가 필요할 때 `DD_FLAGGING_EVALUATION_COUNTS_ENABLED`가 `false`로 설정되어 있지 않은지 확인합니다.
5. `feature_flag.evaluations` 메트릭을 사용하는 경우, [서버 측 플래그 평가 메트릭 설정][10]을 통해 별도의 OTLP 경로를 검증합니다.

## Agent-backed Remote Configuration {#agent-backed-remote-configuration}

기존 Agent Remote Configuration 경로를 명시적으로 사용하도록 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`를 설정하세요.

{{< code-block lang="bash" >}}
# Serverless application
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
{{< /code-block >}}

Java의 경우 호환되는 `dd-openfeature` 및 `dd-java-agent` 버전을 사용하세요. 두 구성 요소 모두 버전 1.66.0 이상을 사용하세요.

Agent를 Remote Configuration 및 API 키로 구성하세요.

{{< code-block lang="bash" >}}
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
{{< /code-block >}}

Serverless 워크로드는 프라이빗 네트워크에서 Agent에 도달할 수 있어야 하며, Agent는 HTTPS를 통해 Datadog에 도달할 수 있어야 합니다. Agent 트레이스 수집을 공개적으로 노출하지 마세요.

`remote_config`를 명시적으로 선택하면 애플리케이션 코드에서 공급자를 초기화하지 않더라도 Feature Flags Remote Configuration 구독이 활성화됩니다. 이러한 요청은 서버 Feature Flags 요금 청구에 포함됩니다.

## 운영 고려 사항 {#operational-considerations}

- **콜드 스타트**: 공급자 초기화를 차단하면 첫 번째 구성을 기다리게 되어 콜드 스타트 지연 시간이 추가될 수 있습니다. 시작 중에 호출자가 제공한 기본값을 반환해도 문제가 없다면 비동기식으로 초기화하세요.
- **아웃바운드 연결**: Agentless 전달을 위해서는 Datadog에서 관리하는 플래그 구성 서비스에 대한 아웃바운드 HTTPS 액세스가 필요합니다.
- **API 키 소유권**: Agentless 모드에서는 애플리케이션이 구성을 위해 `DD_API_KEY`를 소유합니다. `serverless-init` 사이드카도 텔레메트리 송신을 위해 키가 필요합니다. `remote_config` 모드에서는 Agent가 API 키를 소유합니다.
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

일부 Edge 런타임은 Feature Flags 공급자에 필요한 Datadog Node.js 트레이서 API를 지원하지 않습니다. Agentless 구성 전달에 의존하기 전에 대상 플랫폼에 대한 트레이서 호환성을 검증하세요.

## 공용 API 및 로컬 평가 {#public-api-and-local-evaluation}

공용 [Feature Flags API][4]는 플래그 및 환경을 관리하기 위한 것입니다. 서버 측 애플리케이션을 위한 요청별 플래그 평가 API가 아닙니다.

플래그를 평가할 목적으로 각 Serverless 호출에서 Datadog API를 쿼리하지 마세요. 정기적으로 플래그 구성을 로드하고 로컬로 평가하는 서버 SDK를 사용하세요.

## 설정 검증 {#validate-your-setup}

프로덕션 환경에서 Feature Flags를 활성화하기 전에 다음을 확인하세요.

1. 애플리케이션이 [최소 지원 SDK 버전](#overview)을 사용하는지 확인합니다. Java의 경우, JVM이 `dd-java-agent`를 로드하는지 확인하세요.
2. Agentless 전달의 경우, 애플리케이션에 `DD_API_KEY`, `DD_SITE` 및 `DD_ENV`가 있는지 확인하세요. Agent Remote Configuration의 경우 Agent에 API 키가 있고 Remote Configuration이 활성화되어 있는지 확인하세요.
3. OpenFeature 공급자를 초기화하고 준비 상태에 도달했는지 확인합니다.
4. Datadog에서 프로덕션 환경이 아닌 플래그를 변경하고 폴링 간격 후에 워크로드가 업데이트된 값을 수신하는지 확인합니다.
5. 콜드 스타트 중에 구성을 사용할 수 없는 경우 애플리케이션이 호출자가 제공한 기본값을 처리하는지 확인합니다.
6. 텔레메트리의 경우, 지원되는 릴레이를 구성하고 각 필수 신호를 검증하세요. `feature_flag.evaluations`에 별도의 OTLP 설정을 사용하세요.

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
[10]: /ko/feature_flags/guide/server_flag_evaluation_metrics/
[11]: /ko/serverless/