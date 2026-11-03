---
description: Python 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
- link: /tracing/trace_collection/dd_libraries/python/
  tag: 설명서
  text: Python 트레이싱
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
- link: /feature_flags/concepts/configuration_sources/
  tag: 개념
  text: 서버 SDK 구성 소스
title: Python Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 Python 애플리케이션을 계측하는 방법을 설명합니다. Python SDK는 Feature Flag 관리를 위한 오픈 표준인 [OpenFeature][1]와 통합됩니다. `ddtrace` 4.14.0부터는 기본적으로 Datadog 관리 CDN에서 직접 Feature Flag 구성을 로드합니다.

이 가이드에서는 SDK를 설치 및 활성화하고, OpenFeature 클라이언트를 생성하며, 애플리케이션에서 Feature Flags를 평가하는 방법을 설명합니다.

<div class="alert alert-warning">Python Agentless 전달은 구성 소스만 변경합니다. 지원되는 Datadog Agent 또는 서버리스 텔레메트리 경로가 없으면 SDK는 평가 메트릭이나 노출 이벤트를 내보내지 않습니다.</div>

## 전제 조건 {#prerequisites}

Python Feature Flags SDK를 설정하기 전에 다음 사항을 확인하세요.

- **Datadog Python SDK** `ddtrace` 버전 4.14.0 이상
- **OpenFeature Python SDK** `openfeature-sdk`: 버전 0.5.0 이상(공급자 이벤트 핸들러를 사용하여 초기화를 대기하는 경우 버전 0.7.0 이상 필요)
- Datadog [API 키][3]
- Datadog 사이트

다음 환경 변수를 설정하세요.

{{< code-block lang="bash" >}}
# Required: Agentless configuration delivery
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" code="true" >}}
export DD_ENV=<YOUR_ENVIRONMENT>

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true

# Recommended: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
{{< /code-block >}}

Feature Flags 활성화 또는 소스 설정이 필요하지 않습니다. 폴링을 시작하려면 [SDK 초기화](#initialize-the-sdk)에 표시된 대로 공급자를 등록하세요. `ddtrace`만 설치하거나 초기화한다고 해서 Feature Flags CDN 트래픽이 생성되지는 않습니다.

필수 트레이서 버전 및 Agent OTLP 설정을 포함하여 `feature_flag.evaluations`를 구성하려면 [서버 측 플래그 평가 메트릭 설정][4]을 참조하세요. 사용 가능한 그래프 작성에 대한 자세한 내용은 [Feature Flag 그래프][5]를 참조하세요.

## 설치 {#installation}

Datadog Python SDK 및 OpenFeature SDK를 설치하세요.

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

또는 `requirements.txt`에 추가하세요.

{{< code-block lang="text" filename="requirements.txt" >}}
ddtrace>=4.14.0
openfeature-sdk>=0.5.0
{{< /code-block >}}

플래그 평가 메트릭을 활성화하는 경우 OpenTelemetry SDK 및 OTLP 내보내기도 설치하세요.

{{< code-block lang="bash" >}}
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-grpc
{{< /code-block >}}

또는 `requirements.txt`에 추가하세요.

{{< code-block lang="text" filename="requirements.txt" >}}
opentelemetry-sdk>=1.41.0
opentelemetry-exporter-otlp-proto-grpc>=1.41.0
{{< /code-block >}}

## SDK 초기화 {#initialize-the-sdk}

Datadog OpenFeature 공급자를 OpenFeature API에 등록하세요. 공급자는 선택된 구성 소스를 시작하고 첫 번째 구성을 위해 최대 10초 동안 대기합니다.

{{< code-block lang="python" >}}
from openfeature import api
from ddtrace.openfeature import DataDogProvider

# Create and register the Datadog provider
provider = DataDogProvider()
api.set_provider(provider)

# Create an OpenFeature client
client = api.get_client()

# Your application code here
{{< /code-block >}}

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

플래그 타겟팅을 위해 사용자 또는 엔티티를 식별하는 평가 컨텍스트를 정의하세요. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 속성이 포함됩니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 부울과 같은 단일한 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",  # Targeting key (typically user ID)
    attributes={
        "email": "user@example.com",
        "country": "US",
        "tier": "premium",
        "age": 25
    }
)
{{< /code-block >}}

타겟팅 키는 일관된 트래픽 분산(비율별 롤아웃)에 사용됩니다. 추가 속성을 사용하면 위 예시의 '미국 사용자에게 활성화(enable for users in the US)' 또는 '프리미엄 등급 사용자에게 활성화(enable for premium tier users)'와 같은 타겟팅 규칙을 설정할 수 있습니다.

## 플래그 평가{#evaluate-flags}

공급자를 설정하고 클라이언트를 생성한 후에는 애플리케이션 전체에서 Feature Flags를 평가할 수 있습니다. 플래그 평가는 로컬에서 빠르게 수행됩니다. SDK는 로컬에 캐시된 구성 데이터를 사용하므로 평가 중에 네트워크 요청이 발생하지 않습니다.

각 Feature Flag는 키(고유 문자열)로 식별되며 예상되는 유형의 값을 반환하는 유형화된 메서드로 평가할 수 있습니다. 각 Feature Flag가 존재하지 않거나 평가할 수 없는 경우, SDK는 제공된 기본값을 반환합니다.

### 부울 플래그 {#boolean-flags}

켜짐/꺼짐 또는 참/거짓 조건을 나타내는 플래그에는 `get_boolean_value`를 사용하세요.

{{< code-block lang="python" >}}
enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

### 문자열 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `get_string_value`를 사용하세요.

{{< code-block lang="python" >}}
theme = client.get_string_value("ui-theme", "light", eval_ctx)

if theme == "dark":
    set_dark_theme()
elif theme == "light":
    set_light_theme()
else:
    set_light_theme()
{{< /code-block >}}

### 숫자 플래그 {#numeric-flags}

숫자 플래그의 경우 `get_integer_value` 또는 `get_float_value`를 사용하세요. 이는 기능이 제한, 백분율 또는 승수와 같은 숫자 매개변수에 의존할 때 적합합니다.

{{< code-block lang="python" >}}
max_items = client.get_integer_value("cart-max-items", 20, eval_ctx)

discount_rate = client.get_float_value("discount-rate", 0.0, eval_ctx)
{{< /code-block >}}

### 개체 플래그 {#object-flags}

구조화된 데이터의 경우 `get_object_value`을 사용하세요. 이는 복잡한 구성이 포함된 딕셔너리를 반환합니다.

{{< code-block lang="python" >}}
config = client.get_object_value("feature-config", {
    "maxRetries": 3,
    "timeout": 30
}, eval_ctx)

max_retries = config.get("maxRetries", 3)
timeout = config.get("timeout", 30)
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

Feature Flag 값 이외의 정보가 필요할 때는 `*_details` 메서드를 사용하세요. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

{{< code-block lang="python" >}}
details = client.get_boolean_details("new-feature", False, eval_ctx)

print(f"Value: {details.value}")
print(f"Variant: {details.variant}")
print(f"Reason: {details.reason}")
print(f"Error Code: {details.error_code}")
print(f"Error Message: {details.error_message}")
{{< /code-block >}}

Feature Flag 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

### 컨텍스트 없는 평가 {#evaluation-without-context}

평가 컨텍스트를 제공하지 않고도 Feature Flags를 평가할 수 있습니다. 이는 사용자별 타겟팅이 필요하지 않은 전역 Feature Flags에 유용합니다.

{{< code-block lang="python" >}}
# Global feature flag - no context needed
maintenance_mode = client.get_boolean_value("maintenance-mode", False)

if maintenance_mode:
    return "Service temporarily unavailable"
{{< /code-block >}}

## 공급자 초기화 대기 {#waiting-for-provider-initialization}

공급자 등록은 선택된 소스가 첫 번째 구성을 전달할 때까지 최대 10초 동안 대기합니다. 구성이 도착하면 공급자는 `PROVIDER_READY`를 내보냅니다. 대기 시간이 초과되면 공급자가 오류 상태인 채로 등록이 완료되며, 구성이 도착할 때까지 평가 시 호출자가 제공한 기본값이 반환됩니다. 이벤트 핸들러를 사용하여 추후 준비 이벤트를 기다리세요.

{{< code-block lang="python" >}}
import threading
from openfeature import api
from openfeature.event import ProviderEvent
from ddtrace.openfeature import DataDogProvider

# Create an event to wait for readiness
ready_event = threading.Event()

def on_ready(event_details):
    ready_event.set()

# Register event handler
api.add_handler(ProviderEvent.PROVIDER_READY, on_ready)

# Set provider
provider = DataDogProvider()
api.set_provider(provider)

# Wait for the provider to be ready if registration timed out
if ready_event.wait(timeout=30):
    print("Provider is ready")
else:
    print("Provider initialization timed out")

# Create client and evaluate flags
client = api.get_client()
{{< /code-block >}}

<div class="alert alert-info">공급자 이벤트 핸들러에는 OpenFeature SDK 0.7.0 이상이 필요합니다. 대부분의 애플리케이션은 기본 10초 초기화 시간 초과를 사용하고 구성을 사용할 수 없는 경우 호출자가 제공한 기본값을 처리할 수 있습니다.</div>

초기화 시간 초과를 변경하려면 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS`를 양수의 밀리초 단위 숫자로 설정하세요.

## 고급 구성 {#advanced-configuration}

소스 선택 및 운영 설정에 대한 표준 참조로 [서버 SDK 구성 소스][6]를 사용하세요.

- 폴링, 요청 시간 초과 및 엔드포인트 설정을 포함하여 [Agentless 전송을 구성][10]
- 고급 테스트, 로컬 개발 또는 운영자가 관리하는 프록시에 대해 [사용자 지정 Agentless 엔드포인트를 사용][7]
- Agent가 관리하는 전송을 유지하기 위해 [Agent Remote Configuration을 사용][9]
- [기존 Remote Configuration 설정을 마이그레이션][8]하고 더 이상 사용되지 않는 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 설정을 제거

Agentless 모드는 플래그 구성만 변경합니다. `feature_flag.evaluations`, 노출 로깅 또는 실험 사용 사례를 구성하거나 활성화하지 않습니다. 이러한 기능을 사용하려면 지원되는 Datadog Agent 또는 서버리스 텔레메트리 경로가 필요합니다.

## 정리 {#cleanup}

애플리케이션이 종료될 때 리소스를 정리하려면 OpenFeature API를 종료하세요.

{{< code-block lang="python" >}}
api.shutdown()
{{< /code-block >}}

## 테스트 {#testing}

실제 Datadog 공급자를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `InMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. `InMemoryProvider`는 `openfeature-sdk`에 번들로 포함되어 있으므로 추가 종속성이 필요하지 않습니다.

OpenFeature API는 글로벌 싱글톤입니다(`openfeature.api.set_provider` 모듈 수준 상태를 변경함). `function` 범위의 pytest 픽스처를 사용하고 테스트가 서로 Feature Flags 상태를 누출하지 않도록 해제 단계에서 `api.shutdown()`을 호출하세요.

{{< code-block lang="python" filename="test_flags.py" >}}
import pytest
from openfeature import api
from openfeature.evaluation_context import EvaluationContext
from openfeature.provider.in_memory_provider import InMemoryProvider, InMemoryFlag


@pytest.fixture
def client():
    flags = {
        "new-checkout-flow": InMemoryFlag(
            default_variant="off",
            variants={"on": True, "off": False},
        ),
        "ui-theme": InMemoryFlag(
            default_variant="light",
            variants={"light": "light", "dark": "dark"},
        ),
    }
    api.set_provider(InMemoryProvider(flags))
    yield api.get_client()
    api.shutdown()


def test_boolean_flag_returns_default_variant(client):
    assert client.get_boolean_value("new-checkout-flow", True) is False


def test_string_flag_with_context(client):
    ctx = EvaluationContext(targeting_key="user-123")
    assert client.get_string_value("ui-theme", "dark", ctx) == "light"


def test_missing_flag_returns_default(client):
    assert client.get_boolean_value("does-not-exist", True) is True
{{< /code-block >}}

`InMemoryFlag`는`default_variant`(문자열 변형 이름) 및`variants`(변형 이름을 형식화된 값에 매핑하는 dict)를 사용합니다. 변형 이름 대신 `default_variant`로 값을 전달하는 것은 흔한 실수입니다. 타겟팅 로직의 경우 플래그와 `EvaluationContext`를 수신하고 선택된 변형을 포함하는 `FlagResolutionDetails` 객체를 반환하는 `context_evaluator` 콜백을 전달하세요.

## 문제 해결 {#troubleshooting}

### Agentless 설정이 작동하지 않음 {#agentless-configuration-not-working}

다음을 확인합니다.

- `ddtrace`은(는) 버전 4.14.0 이상입니다.
- `DD_FEATURE_FLAGS_ENABLED` 가 설정되지 않았거나 `true`로 설정되었습니다.
- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` 가 설정되지 않았거나 `agentless`로 설정되었습니다.
- `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 가 설정되지 않았습니다. 이를 `true`로 설정하면 명시적 소스가 설정되지 않은 마이그레이션 기간 동안 Agent Remote Configuration이 선택됩니다.
- 애플리케이션 코드가 OpenFeature API에 `DataDogProvider`를 등록합니다.
- `DD_API_KEY`, `DD_SITE` 및 `DD_ENV`가 애플리케이션 프로세스에 구성되어 있습니다.
- 애플리케이션이 Datadog 으로 아웃바운드 HTTPS 요청을 보낼 수 있습니다.

`DD_TRACE_DEBUG=true`를 설정한 후, 인증, 시간 초과 또는 'malformed-payload' 메시지가 Feature Flags agentless 엔드포인트에서 발생하는지 확인하세요.

###  Agent Remote Configuration이 작동하지 않음 {#agent-remote-configuration-not-working}

다음을 확인합니다.

- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`가 설정되어 있습니다. 마이그레이션 기간 동안 명시적 소스가 설정되지 않은 경우 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`도 Remote Configuration을 선택합니다.
- Datadog Agent 버전이 7.55 이상입니다.
- 해당 Agent 에 [Remote Configuration][2]이 활성화되어 있습니다.
- Agent가 대상 조직에 대해 유효한 API 키를 가지고 있습니다.
- `DD_SERVICE` 및 `DD_ENV`가 애플리케이션 프로세스에 구성되어 있습니다.
- SDK가 Agent와 통신할 수 있습니다.

[1]: https://openfeature.dev/
[2]: /ko/agent/remote_config/
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /ko/feature_flags/concepts/flag_graphs/
[6]: /ko/feature_flags/concepts/configuration_sources/
[7]: /ko/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /ko/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /ko/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[10]: /ko/feature_flags/concepts/configuration_sources/#configure-agentless-delivery

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}