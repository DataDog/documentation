---
description: Ruby 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
  tag: 설명서
  text: Ruby 트레이싱
- link: /tracing/
  tag: 설명서
  text: Application Performance Monitoring(APM)이란?
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
title: Ruby Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 Ruby 애플리케이션을 계측하는 방법을 설명합니다. Ruby SDK는 Feature Flag 관리를 위한 개방형 표준인 [OpenFeature][3]와 통합되며, Datadog Ruby 트레이서(`datadog` gem)의 Remote Configuration을 통해 플래그 업데이트를 수신합니다.

## 전제 조건 {#prerequisites}

Ruby Feature Flags SDK를 설정하기 전에 다음 사항을 확인하세요.

- **Datadog Agent** 버전 7.55 이상, [Remote Configuration][1] 활성화됨
- **Datadog [API 키][4]**가 Agent에 구성되어 있음
- **Datadog Go SDK** `datadog` 버전 2.24.0 이상
- **Ruby 런타임** 버전 3.1 이상(전체 Datadog Feature Flags OpenFeature 통합을 사용하기 위함)
- **OpenFeature Ruby SDK** `openfeature-sdk` 버전 0.5.1 이상(공급자 후크, 노출 로깅 및 플래그 평가 메트릭 지원을 위함)
- **OpenTelemetry 메트릭 gem**([플래그 평가 메트릭][5]용): `opentelemetry-metrics-sdk` 버전 0.8.0 이상 및 `opentelemetry-exporter-otlp-metrics` 버전 0.4.0 이상
- **서비스 및 환경 구성됨** - Feature Flags는 서비스 및 환경에 따라 타겟팅됩니다.
- **지원되는 운영 체제** - 프로덕션 지원은 [Linux 운영 체제][2]로 제한됩니다. macOS 및 Windows는 기본적으로 프로덕션 타겟으로 지원되지 않지만, 해당 운영 체제에서 실행되는 Dockerized Linux 환경은 지원됩니다. macOS에서의 로컬 개발을 위해 사용 가능한 경우 호환되는 사전 빌드된 네이티브 아티팩트를 사용할 수 있습니다.

<div class="alert alert-info">Datadog Ruby 트레이서는 APM에 대해 이전 Ruby 런타임을 지원합니다. Ruby 2.5를 포함한 이전 Ruby 버전의 애플리케이션은 Datadog APM을 계속 사용할 수 있지만, Ruby 3.1 이상으로 업그레이드하기 전까지는 OpenFeature를 통한 Datadog Feature Flags를 사용할 수 없습니다. 완전한 Feature Flags 텔레메트리를 위해 필요한 공급자 후크 인터페이스를 노출하는 OpenFeature Ruby SDK 버전을 사용하려면 Ruby 3.1 이상이 필요합니다.</div>

## 설치 및 초기화 {#installing-and-initializing}

Feature Flagging 기능은 Application Performance Monitoring(APM)을 통해 제공됩니다. APM을 Feature Flagging 지원과 함께 애플리케이션에 통합하려면 필요한 gem을 설치하고 OpenFeature 지원을 통해 Remote Configuration을 구성하세요.

```shell
gem install datadog openfeature-sdk
```

플래그 평가 메트릭을 내보내려면 애플리케이션 번들에 OpenTelemetry 메트릭 gem을 추가하세요.

```ruby
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
```

환경 변수를 사용하여 Feature Flags를 활성화할 수 있습니다.

```shell
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
```

<div class="alert alert-info"> <code>EXPERIMENTAL_</code> 접두사는 이전 버전과의 호환성을 위해 유지됩니다. 공급자 자체는 안정적입니다.</div>

<a href="/feature_flags/guide/server_flag_evaluation_metrics/">서버 측 플래그 평가 메트릭 설정</a>을 참조하여 실험적 <code>feature_flag.evaluations</code> 메트릭을 활성화하세요. 사용 가능한 그래프 작성에 대한 자세한 내용은 <a href="/feature_flags/concepts/flag_graphs/">Feature Flag 그래프</a>를 참조하세요.

또는 코드에서 공급자를 활성화하세요.

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

INITIALIZATION_TIMEOUT = 30

# Configure Datadog with feature flagging enabled
Datadog.configure do |config|
  config.remote.enabled = true
  config.remote.boot_timeout_seconds = INITIALIZATION_TIMEOUT
  config.open_feature.enabled = true
end

# Configure OpenFeature SDK with Datadog provider and wait for initialization
OpenFeature::SDK.configure do |config|
  config.set_provider_and_wait(
    Datadog::OpenFeature::Provider.new,
    timeout: INITIALIZATION_TIMEOUT
  )
end

# Create OpenFeature client
client = OpenFeature::SDK.build_client
```

`set_provider_and_wait`을 사용하면 공급자가 완전히 초기화되거나 시간 초과에 도달할 때까지 애플리케이션이 진행되지 않도록 차단됩니다. 이렇게 하면 애플리케이션이 요청 처리를 시작하기 전에 Feature Flags가 준비됩니다. 비차단 초기화를 선호하는 경우 대신 `set_provider`를 사용하세요. 이렇게 하면 Remote Configuration이 백그라운드에서 로드될 때까지 클라이언트가 기본값을 반환합니다.

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

플래그 타겟팅을 위해 사용자 또는 엔티티를 식별하는 평가 컨텍스트를 정의하세요. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 속성이 포함됩니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 부울과 같이 중첩되지 않은 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

```ruby
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',  # Targeting key (typically user ID)
  email: 'user@example.com',
  country: 'US',
  tier: 'premium',
  age: 25
)
```

타겟팅 키는 일관된 트래픽 분산(백분율 롤아웃)에 사용됩니다. 추가 속성을 사용하면 위 예시의 '미국 사용자에 대해 활성화(enable for users in the US)' 또는 '프리미엄 등급 사용자에 대해 활성화(enable for premium tier users)'와 같은 타겟팅 규칙을 설정할 수 있습니다.

## 플래그 평가 {#evaluate-flags}

`OpenFeature` 클라이언트를 생성한 후 앱 전체에서 플래그 값을 읽기 시작할 수 있습니다. 플래그 평가는 로컬에 캐시된 데이터를 사용하므로 플래그를 평가할 때 네트워크 요청이 발생하지 않습니다.

각 플래그는 고유한 문자열 _키_로 식별됩니다. 플래그는 예상되는 유형과 일치하는 값을 반환하는 유형화된 메서드를 사용하여 평가됩니다. 각 플래그가 존재하지 않거나 평가할 수 없는 경우, SDK는 제공된 기본값을 반환합니다.

### 부울 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `fetch_boolean_value()`를 사용합니다.

```ruby
enabled = client.fetch_boolean_value(
  flag_key: 'new-checkout-flow',
  default_value: false,
  evaluation_context: context
)

if enabled
  show_new_checkout
else
  show_legacy_checkout
end
```

### 문자열 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `fetch_string_value()`를 사용합니다.

```ruby
theme = client.fetch_string_value(
  flag_key: 'ui-theme',
  default_value: 'light',
  evaluation_context: context
)

case theme
when 'dark'
  set_dark_theme
when 'light'
  set_light_theme
else
  set_light_theme
end
```

### 숫자 플래그 {#number-flags}

숫자 플래그에는 `fetch_integer_value()` 또는 `fetch_float_value()`를 사용합니다. Ruby는 기본값에 따라 적절한 유형을 반환하는 `fetch_number_value()`도 제공합니다. 이 메서드는 기능이 제한, 백분율 또는 승수와 같은 숫자 파라미터에 의존할 때 적합합니다.

```ruby
max_items = client.fetch_integer_value(
  flag_key: 'cart-max-items',
  default_value: 20,
  evaluation_context: context
)

discount_rate = client.fetch_float_value(
  flag_key: 'discount-rate',
  default_value: 0.0,
  evaluation_context: context
)

# Generic number method (type based on default)
batch_size = client.fetch_number_value(
  flag_key: 'batch-size',
  default_value: 100,  # Returns integer
  evaluation_context: context
)
```

### 객체 플래그 {#object-flags}

구조화된 데이터에는 `fetch_object_value()`를 사용합니다. 이 메서드는 해시를 반환합니다. 객체 플래그는 여러 속성을 함께 제공해야 하는 Remote Configuration 시나리오에 유용합니다.

```ruby
config = client.fetch_object_value(
  flag_key: 'feature-config',
  default_value: {
    'maxRetries' => 3,
    'timeout' => 30
  },
  evaluation_context: context
)

max_retries = config['maxRetries'] || 3
timeout = config['timeout'] || 30
```

### 플래그 평가 세부 정보 {#flag-evaluation-details}

플래그 값 외에 추가 정보가 필요한 경우 `fetch_<type>_details` 메서드를 사용합니다. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

```ruby
details = client.fetch_boolean_details(
  flag_key: 'new-feature',
  default_value: false,
  evaluation_context: context
)

puts "Value: #{details.value}"
puts "Variant: #{details.variant}"
puts "Reason: #{details.reason}"
puts "Error Code: #{details.error_code}"
puts "Error Message: #{details.error_message}"
```

플래그 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

## 컨텍스트 없는 평가 {#evaluation-without-context}

평가 컨텍스트를 제공하지 않고도 플래그를 평가할 수 있습니다. 이는 사용자별 타겟팅이 필요하지 않은 전역 플래그에 유용합니다.

```ruby
# Global feature flag - no context needed
maintenance_mode = client.fetch_boolean_value(
  flag_key: 'maintenance-mode',
  default_value: false
)

if maintenance_mode
  halt 503, { error: 'Service temporarily unavailable' }.to_json
end
```

## 테스트 {#testing}

실제 `Datadog::OpenFeature::Provider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `InMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. `InMemoryProvider`는 `openfeature-sdk`와 함께 제공되므로 추가 gem이 필요하지 않습니다.

Ruby SDK의 `InMemoryProvider`는 플래그 키와 값의 일반 해시를 사용하며, 변형 및 타겟팅 규칙은 지원되지 않습니다. OpenFeature 공급자는 프로세스 전역 싱글톤에 설정되므로, 공급자를 교체하는 테스트는 예제 간에 플래그 상태가 누출되지 않도록 해제 단계에서 이를 복원해야 합니다. `around` 후크는 설정, 복원 및 예외 처리를 단일 블록에서 깔끔하게 처리합니다.

```ruby
# spec/support/feature_flags.rb
require 'open_feature/sdk'
require 'open_feature/sdk/provider/in_memory_provider'

RSpec.configure do |config|
  config.around(:each, :feature_flags) do |example|
    original = OpenFeature::SDK::API.instance.provider
    OpenFeature::SDK.configure do |c|
      c.set_provider(OpenFeature::SDK::Provider::InMemoryProvider.new(
        'new-checkout-flow' => true,
        'ui-theme' => 'dark',
        'discount-rate' => 0.15
      ))
    end
    example.run
  ensure
    OpenFeature::SDK.configure { |c| c.set_provider(original) } if original
  end
end

# spec/checkout_spec.rb
require 'spec_helper'

RSpec.describe Checkout, :feature_flags do
  let(:client) { OpenFeature::SDK.build_client }

  it 'returns the in-memory flag value' do
    expect(client.fetch_boolean_value(flag_key: 'new-checkout-flow', default_value: false)).to be true
  end

  it 'falls back to the default for unknown flags' do
    expect(client.fetch_boolean_value(flag_key: 'does-not-exist', default_value: false)).to be false
  end
end
```

테스트 중에 플래그 상태를 변경하려면 공급자 인스턴스에서 `add_flag(flag_key:, value:)`를 호출하세요. Minitest에도 동일한 패턴이 적용됩니다. `around` 후크를 `setup`/`teardown` 메서드로 교체하세요.

## 문제 해결 {#troubleshooting}

### Feature Flags가 항상 기본값을 반환합니다. {#feature-flags-always-return-default-values}

Feature Flags가 예상치 못하게 항상 기본값을 반환하는 경우 다음 사항을 확인하세요.

- Datadog Agent 구성에서 Remote Configuration이 활성화되어 있는지 확인합니다.
- 서비스와 환경이 구성되어 있는지 확인합니다(`DD_SERVICE` 및 `DD_ENV` 환경 변수 또는 Ruby의 `config.service` 및 `config.env`를 통해).
- Ruby 애플리케이션의 Datadog 구성에 `config.remote.enabled = true` 및 `config.open_feature.enabled = true`가 설정되어 있는지 확인합니다.
- `datadog` gem 버전이 OpenFeature 지원(2.24.0 이상)을 포함하는지 확인합니다.

### Remote Configuration 연결 문제 {#remote-configuration-connection-issues}

Datadog Ruby 트레이서 로그에서 Remote Configuration 상태를 확인합니다.

```ruby
# Enable startup and debug logging
Datadog.configure do |config|
  config.diagnostics.startup_logs.enabled = true
  config.diagnostics.debug = true
  config.remote.enabled = true
  config.open_feature.enabled = true
end
```

다음 메시지를 확인하세요.
- Remote Configuration 워커 시작
- Feature Flags 구성 수신
- OpenFeature 구성 요소 초기화

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/remote_config/
[2]: /ko/tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /ko/account_management/api-app-keys/#api-keys
[5]: /ko/feature_flags/guide/server_flag_evaluation_metrics/