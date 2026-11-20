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
  text: Application Performance Monitoring(APM)에 대해 알아보기
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
title: Ruby Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 Ruby 애플리케이션을 계측하는 방법을 설명합니다. Ruby SDK는 Feature Flag 관리를 위한 오픈 표준인 [OpenFeature][3]와 통합됩니다. `datadog` 2.46.0 이상에서는 기본적으로 Datadog 관리 CDN에서 직접 플래그 구성을 로드합니다.

구성 전달 또는 로컬 플래그 평가에는 Datadog Agent가 필요하지 않습니다. Agent 관리 전달을 유지하려면 [Agent Remote Configuration](#agent-configuration-delivery)을 선택하세요.

<div class="alert alert-warning">실험 노출 이벤트 및 집계된 EVP(이벤트 플랫폼 프록시) 플래그 평가 이벤트에는 호환되는 Datadog Agent 또는 로컬 텔레메트리 릴레이가 필요합니다. Ruby는 릴레이를 사용할 수 없을 때 직접 이벤트 전달을 지원하지 않습니다. 여기에서 <code>feature_flag.evaluations</code> 메트릭에는 별도로 구성된 OpenTelemetry 내보내기 경로가 필요합니다. <a href="/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry">Feature Flag 텔레메트리 전송</a>을 참조하세요.</div>

## 전제 조건 {#prerequisites}

기본 Agentless 설정을 위해서는 다음이 필요합니다.

- **Datadog Ruby SDK** `datadog` 버전 **2.46.0 이상**
- **Ruby 런타임** 버전 3.1 이상(전체 Datadog Feature Flags OpenFeature 통합을 사용하기 위함)
- **OpenFeature Ruby SDK** `openfeature-sdk` 버전 0.5.1 이상(공급자 후크, 노출 로깅 및 플래그 평가 메트릭 지원을 위함)
- **Datadog [API 키][4] 및 사이트**: API 키와 조직이 호스팅되는 Datadog 사이트
- **서비스 및 환경 구성됨** - Feature Flags는 서비스 및 환경에 따라 타겟팅됩니다.
- **지원되는 운영 체제** - 프로덕션 지원은 [Linux 운영 체제][2]로 제한됩니다. macOS 및 Windows는 기본적으로 프로덕션 타겟으로 지원되지 않지만, 해당 운영 체제에서 실행되는 Dockerized Linux 환경은 지원됩니다. macOS에서의 로컬 개발을 위해 사용 가능한 경우 호환되는 사전 빌드된 네이티브 아티팩트를 사용할 수 있습니다.

<div class="alert alert-info">Datadog Ruby 트레이서는 APM에 대해 이전 Ruby 런타임을 지원합니다. Ruby 2.5를 포함한 이전 Ruby 버전의 애플리케이션은 Datadog APM을 계속 사용할 수 있지만, Ruby 3.1 이상으로 업그레이드하기 전까지는 OpenFeature를 통한 Datadog Feature Flags를 사용할 수 없습니다. 완전한 Feature Flags 텔레메트리를 위해 필요한 공급자 후크 인터페이스를 노출하는 OpenFeature Ruby SDK 버전을 사용하려면 Ruby 3.1 이상이 필요합니다.</div>

## 설치 및 초기화 {#installing-and-initializing}

애플리케이션의 `Gemfile`에 Datadog 트레이서와 OpenFeature SDK를 추가한 다음 `bundle install`을 실행하세요.

```ruby
gem 'datadog', '~> 2.46'
gem 'openfeature-sdk', '>= 0.5.1'
```

### Agentless 구성 {#agentless-configuration}

시작하기 전에 애플리케이션 프로세스에서 다음 환경 변수를 설정하세요.

```bash
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

새 설정의 경우 Feature Flags 활성화 또는 소스 설정이 필요하지 않습니다. OpenFeature에 Datadog 공급자를 등록하여 폴링을 시작하세요. 트레이서를 설치하거나 `Datadog::OpenFeature::Provider.new`를 구성하는 것만으로는 Agentless 구성 요청이 시작되지 않습니다.

### 공급자 초기화 {#initialize-the-provider}

애플리케이션 시작 시 공급자를 초기화하세요.

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

Datadog.configure do |config|
  # Optional: set the first-configuration wait in milliseconds (default: 30000).
  config.feature_flags.initialization_timeout_ms = 30_000
end

begin
  OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
rescue OpenFeature::SDK::ProviderInitializationError => e
  warn "Feature Flags initialization failed: #{e.message}"
end

client = OpenFeature::SDK.build_client
```

`set_provider_and_wait`는 공급자가 첫 번째 유효한 구성을 수신하거나 초기화에 실패할 때까지 실행을 차단합니다. 기본 초기화 제한 시간은 30초입니다. `config.feature_flags.initialization_timeout_ms` 또는 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS`로 구성하세요. OpenFeature 메서드는 `timeout:` 인수를 허용하지 않습니다.

이 예시는 `ProviderInitializationError`를 포착하여 애플리케이션이 호출자가 제공한 기본값으로 계속 실행될 수 있도록 합니다. 일시적인 전달 실패로 인해 초기화 시간이 초과되면 폴링이 계속되며 유효한 구성이 도착하면 공급자가 복구될 수 있습니다. 비차단 초기화에는 대신 `OpenFeature::SDK.set_provider`를 사용하세요. 구성을 사용할 수 있을 때까지 평가는 기본값을 반환합니다.

SDK는 기본적으로 30초마다 폴링하며 5초의 요청 시간 제한을 사용합니다. 유효한 구성을 수신한 후에는 일시적인 전달 오류가 발생해도 해당 구성을 유지합니다. 폴링 및 사용자 지정 엔드포인트 설정은 [Configuration Sources][6]를 참조하세요. Ruby는 상한선 없이 양의 정수 폴링 간격을 허용하지만, 요청 시간 제한은 1~300초 사이여야 합니다.

### Agent 구성 전달 {#agent-configuration-delivery}

Agent 관리형 플래그 전달의 경우, [Remote Configuration][1]이 활성화되어 있고 Agent에 API 키가 구성된 Datadog Agent 7.55 이상을 사용하세요. `datadog` 2.46.0 이상에서는 소스를 명시적으로 선택하세요.

```bash
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

[공급자 초기화](#initialize-the-provider) 섹션의 공급자 초기화 코드를 사용하세요. `remote_config`를 선택하면 애플리케이션이 공급자를 등록하기 전이라도 트레이서가 시작될 때 Feature Flags 구독이 활성화됩니다. 구성 전달을 위한 API 키는 Agent에 있어야 합니다.

2.24.0부터 시작하는 이전 `datadog` 버전은 Agent Remote Configuration에 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` 또는 `config.open_feature.enabled = true`를 사용합니다.

### 기존 설정 마이그레이션 {#migrate-an-existing-setup}

2.46.0 이상에서는 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 및 `config.open_feature.enabled`가 사용 중단 예정입니다. 명시적인 소스가 선택되지 않은 경우, `true`의 레거시 값은 Remote Configuration을 유지하고 `false`는 Feature Flags를 비활성화합니다.

Agentless 전달로 마이그레이션하려면 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`를 설정하고, 위에 설명된 애플리케이션 자격 증명을 구성한 다음, 환경 및 Ruby 구성 모두에서 레거시 설정을 제거하세요. Agent 전달을 유지하려면 레거시 설정을 제거하기 전에 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`를 설정하세요. [기존 Remote Configuration 설정 마이그레이션][7]을 참조하세요.

`DD_FEATURE_FLAGS_ENABLED=false` 선택한 소스에 관계없이 Feature Flags와 두 구성 전달 경로를 모두 비활성화합니다. Feature Flags를 비활성화하려면 레거시 설정 대신 이 설정을 사용하세요.

### 플래그 평가 메트릭 {#flag-evaluation-metrics}

플래그 평가 메트릭은 별도의 OpenTelemetry 파이프라인을 사용합니다. 애플리케이션 번들에 메트릭 젬을 추가하세요.

```ruby
gem 'opentelemetry-metrics-sdk', '>= 0.8.0'
gem 'opentelemetry-exporter-otlp-metrics', '>= 0.4.0'
```

`DD_METRICS_OTEL_ENABLED=true`를 설정하고 [서버 측 플래그 평가 메트릭 설정][5]에 설명된 대로 익스포터를 구성하세요. Agentless 구성을 활성화해도 메트릭 내보내기는 구성되지 않습니다.

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

플래그 타겟팅을 위해 사용자 또는 엔터티를 식별하는 평가 컨텍스트를 정의하세요. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 속성이 포함됩니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같이 중첩되지 않은 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

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

### 불리언 플래그 {#boolean-flags}

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

### 개체 플래그 {#object-flags}

구조화된 데이터에는 `fetch_object_value()`를 사용합니다. 이 메서드는 해시를 반환합니다. 여러 구성 속성이 함께 속할 때 객체 플래그를 사용하세요.

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

Feature Flag 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

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

## 자체 데이터 저장소에 노출 기록 {#record-exposures-in-your-own-data-store}

`Datadog::OpenFeature::ExposureHook`을 사용하여 자체 로그, 데이터 웨어하우스 또는 분석 파이프라인에 노출을 기록하세요. 이 기능은 각 플래그 평가 후 공급자가 Datadog에 사용하는 것과 동일한 노출 결정으로 코드를 호출합니다. Datadog으로 노출 전송을 중지하려면 `DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false`를 설정하세요. 최소 SDK 요구 사항 및 기타 자세한 내용은 [자체 데이터 저장소에 Feature Flag 노출 기록][12]을 참조하세요.

## 테스트 {#testing}

실제 `Datadog::OpenFeature::Provider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `InMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. `InMemoryProvider`는 `openfeature-sdk`와 함께 제공되므로 추가 gem이 필요하지 않습니다.

Ruby SDK의 `InMemoryProvider`는 플래그 키와 값의 일반 해시를 사용하며, 변형 및 타겟팅 규칙은 지원되지 않습니다. OpenFeature 공급자는 프로세스 전역 싱글톤에 설정되므로, 공급자를 교체하는 테스트는 예시 간에 플래그 상태가 누출되지 않도록 해제 단계에서 이를 복원해야 합니다. `around` 후크는 설정, 복원 및 예외 처리를 단일 블록에서 깔끔하게 처리합니다.

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

## JRuby에서 Java SDK 사용{#use-the-java-sdk-on-jruby}

Ruby SDK는 JRuby에서 Feature Flags를 지원하지 않습니다. JRuby에서 Ruby SDK는 로그에 경고를 기록하며 Feature Flags를 활성화하지 않습니다. 대신 [Java SDK][8]를 사용하세요. JRuby는 Java 통합을 통해 Java SDK를 호출합니다.

[Java SDK 호환성 요구 사항][9]에 나온 버전을 사용하세요.

1. `dd-openfeature` JAR 파일, OpenFeature Java SDK JAR 파일 및 해당 종속성을 가져옵니다. 예를 들자면, Maven을 사용하여 파일과 종속성을 디렉터리에 복사할 수 있습니다.
2. 애플리케이션에서 `require`로 JAR 파일을 로드합니다.
3. 구성 소스에 대한 환경 변수를 설정합니다. [서버 SDK 구성 소스][6]를 참조하세요.
4. `dd-java-agent`로 JRuby를 시작합니다. `-J` 옵션을 사용하여 `-javaagent` 옵션을 JVM에 전달합니다.

```shell
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
# Use Agent Remote Configuration. Agentless delivery is the default.
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config

jruby -J-javaagent:/path/to/dd-java-agent.jar app.rb
```

```ruby
require 'java'

# Load the Datadog provider, the OpenFeature SDK, and their dependencies
Dir['/path/to/jars/*.jar'].each { |jar| require jar }

java_import 'dev.openfeature.sdk.OpenFeatureAPI'
java_import 'dev.openfeature.sdk.MutableContext'
java_import 'datadog.trace.api.openfeature.Provider'

# Set the provider. Wait for the first flag configuration.
api = OpenFeatureAPI.getInstance
api.setProviderAndWait(Provider.new)
client = api.getClient('my-app')

context = MutableContext.new('user-123')
context.add('tier', 'premium')

enabled = client.getBooleanValue('checkout.new', false, context)
```

JAR 파일만으로는 플래그 전달을 활성화할 수 없습니다. Datadog 공급자는 `dd-java-agent`의 클래스를 사용합니다. JVM이 `dd-java-agent`를 로드하지 않으면 공급자가 초기화되지 않습니다. 그러면 플래그 평가 시 기본값이 반환됩니다.

공급자 이벤트, 오류 처리 및 평가 방법에 대한 자세한 내용은 [Java SDK][8] 페이지를 참조하세요. JRuby는 동일한 클래스와 메서드를 사용합니다.

## 문제 해결 {#troubleshooting}

애플리케이션이 JRuby에서 실행되는 경우 Java SDK를 사용하세요. [JRuby에서 Java SDK 사용][10]을 참조하세요.

### Agentless 설정이 작동하지 않음 {#agentless-configuration-not-working}

- `datadog` 2.46.0 이상이 설치되어 있고 애플리케이션이 Datadog OpenFeature 공급자를 등록했는지 확인하세요.
- 애플리케이션 프로세스에서 `DD_API_KEY`, `DD_SITE`, `DD_SERVICE`, `DD_ENV`을 확인하세요.
- `DD_FEATURE_FLAGS_ENABLED`가 `false`가 아님을 확인하세요.
- 새 설정의 경우 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE`를 설정하지 않은 상태로 두거나 `agentless`로 설정하세요. 마이그레이션할 때 레거시 활성화 설정을 제거하세요.
- `ufc-server.ff-cdn.<DD_SITE>`로의 아웃바운드 HTTPS를 허용하세요.
- `DD_TRACE_DEBUG=true`를 활성화하고 트레이서 로그에서 인증, 시간 초과 또는 구성 오류가 있는지 확인하세요.

첫 번째 유효한 구성 전에는 평가 시 호출자가 제공한 기본값이 반환됩니다. 초기화가 성공한 후에는 일시적인 전달 오류가 발생하면 마지막으로 유효했던 구성이 유지됩니다.

### Remote Configuration 연결 문제 {#remote-configuration-connection-issues}

- `datadog` 2.46.0 이상에서 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE`가 `remote_config`로 설정되어 있는지 확인하세요.
- Agent와 Ruby 트레이서에서 Remote Configuration이 활성화되어 있는지 확인하세요.
- 애플리케이션이 시작될 때 Datadog Agent를 사용할 수 있었는지 확인하세요. Agent를 사용할 수 있게 된 후에도 문제가 계속되면 애플리케이션을 다시 시작하세요. [Agent 가용성][11]을 참조하세요.
- Agent의 API 키와 애플리케이션의 `DD_SERVICE`, `DD_ENV`를 확인하세요.
- 애플리케이션이 Agent에 연결할 수 있는지 확인하세요. `DD_TRACE_DEBUG=true`를 활성화하고 트레이서 로그에서 Remote Configuration 오류가 있는지 확인하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/remote_config/
[2]: /ko/tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /ko/account_management/api-app-keys/#api-keys
[5]: /ko/feature_flags/guide/server_flag_evaluation_metrics/
[6]: /ko/feature_flags/concepts/configuration_sources/
[7]: /ko/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /ko/feature_flags/server/java/
[9]: /ko/feature_flags/server/java/#compatibility-requirements
[10]: #use-the-java-sdk-on-jruby
[11]: /ko/feature_flags/concepts/configuration_sources/#agent-availability
[12]: /ko/feature_flags/guide/record_exposures_in_your_own_data_store/