---
description: PHP 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
- link: /tracing/trace_collection/dd_libraries/php/
  tag: 설명서
  text: PHP 트레이싱
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
title: PHP Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 PHP 애플리케이션을 계측하는 방법을 설명합니다. PHP SDK는 Datadog SDK의 Remote Configuration을 사용하여 실시간으로 플래그 업데이트를 수신합니다.

PHP SDK는 두 가지 애플리케이션 API를 제공합니다.

- **Datadog PHP API**: PHP 7 또는 PHP 8 애플리케이션에 `DDTrace\FeatureFlags\Client`를 사용하세요.
- **OpenFeature 어댑터**: [OpenFeature][1] 표준 API를 사용하는 PHP 8 애플리케이션에 `DDTrace\OpenFeature\DataDogProvider`를 사용하세요.

플래그 평가는 로컬에서 수행되므로 빠릅니다. SDK는 로컬에 캐시된 구성 데이터를 사용하므로 평가 중에 네트워크 요청이 발생하지 않습니다.

## 전제 조건 {#prerequisites}

PHP Feature Flags SDK를 설정하기 전에 다음 사항을 확인하세요.

- **Datadog Agent** ([Remote Configuration][2] 활성화됨)
- **Datadog [API 키][3]**가 Agent에 구성됨
- **Datadog PHP SDK** `datadog/dd-trace` 버전 1.21.0 이상
- **지원되는 PHP 런타임**: Datadog PHP API를 사용하는 PHP 7 이상, 또는 OpenFeature 어댑터를 사용하는 PHP 8 이상
- **OpenFeature PHP SDK** `open-feature/sdk` 버전 2.1 이상(OpenFeature 어댑터를 사용하는 경우)

다음 환경 변수를 설정하세요.

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Enable Remote Configuration in the SDK
export DD_REMOTE_CONFIG_ENABLED=true

# Required: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_VERSION=<YOUR_APP_VERSION>

# Required for flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

<div class="alert alert-info"> <code>EXPERIMENTAL_</code> 접두사는 이전 버전과의 호환성을 위해 유지됩니다. 공급자 자체는 안정적입니다.</div>

필수 트레이서 버전 및 Agent OTLP 설정을 포함하여 `feature_flag.evaluations`를 구성하는 방법은 [서버 측 플래그 평가 메트릭 설정][6]을 참조하세요. 사용 가능한 그래프에 대한 자세한 정보는 [Feature Flag 그래프][7]를 참조하세요.

## 설치 {#installation}

Feature Flagging 기능은 Application Performance Monitoring(APM)을 통해 제공됩니다. [Tracing PHP Applications][4]에 따라 Datadog PHP 트레이서를 설치하고 구성하세요.

PHP 8 애플리케이션에서 OpenFeature 어댑터를 사용하는 경우 OpenFeature PHP SDK를 설치하세요.

{{< code-block lang="bash" >}}
composer require open-feature/sdk:^2.1
{{< /code-block >}}

## SDK 초기화 {#initialize-the-sdk}

PHP 런타임 및 애플리케이션 아키텍처에 맞는 API를 선택하세요.

### PHP 7 및 PHP 8: Datadog API {#php-7-and-php-8-datadog-api}

PHP 7 또는 PHP 8 애플리케이션에서 `DDTrace\FeatureFlags\Client`를 직접 사용하세요.

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();
{{< /code-block >}}

### PHP 8: OpenFeature 어댑터 {#php-8-openfeature-adapter}

PHP 8 애플리케이션에서는 Datadog을 OpenFeature 공급자로 등록할 수 있습니다.

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');
{{< /code-block >}}

OpenFeature 공급자는 Remote Configuration이 초기 플래그 구성을 전달할 때까지 기본값을 반환합니다. 비즈니스 로직이 플래그를 평가하기 전에 플래그 구성이 로드될 수 있도록 애플리케이션 시작 초기에 공급자를 초기화하세요.

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

플래그 타겟팅을 위해 사용자 또는 엔티티를 식별하는 평가 컨텍스트를 정의하세요. 타겟팅 키는 백분율 롤아웃과 같은 일관된 트래픽 분산에 사용됩니다. 추가 속성을 사용하면 '미국 사용자에 대해 활성화(enable for users in the US)' 또는 '프리미엄 등급 사용자에 대해 활성화(enable for premium tier users)'와 같은 타겟팅 규칙을 설정할 수 있습니다.

### Datadog API {#datadog-api}

Datadog PHP API의 경우, `targetingKey` 및 `attributes` 키가 포함된 배열로 컨텍스트를 전달하세요.

{{< code-block lang="php" >}}
$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ],
];
{{< /code-block >}}

### OpenFeature 어댑터 {#openfeature-adapter}

OpenFeature 어댑터의 경우, OpenFeature PHP SDK의 `EvaluationContext`를 사용하세요.

{{< code-block lang="php" >}}
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;

$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ])
);
{{< /code-block >}}

<div class="alert alert-warning">평가 컨텍스트 속성은 중첩되지 않은 원시 값(문자열, 숫자, 불리언)이어야 합니다. 중첩된 배열, 객체 및 null 값은 타겟팅 및 노출 보고에서 무시됩니다.</div>

## 플래그 평가{#evaluate-flags}

클라이언트를 설정한 후에는 애플리케이션 전체에서 Feature Flags를 평가할 수 있습니다. 각 플래그는 고유한 문자열 키로 식별되며 예상 유형의 값을 반환하는 타입별 메서드로 평가됩니다. 각 Feature Flag가 존재하지 않거나 평가할 수 없는 경우, SDK는 제공된 기본값을 반환합니다.

### 불리언 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `getBooleanValue`를 사용합니다.

{{< code-block lang="php" >}}
$enabled = $flags->getBooleanValue('new-checkout-flow', false, $context);

if ($enabled) {
    showNewCheckout();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

OpenFeature의 경우:

{{< code-block lang="php" >}}
$enabled = $client->getBooleanValue('new-checkout-flow', false, $context);
{{< /code-block >}}

### 문자열 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `getStringValue`를 사용합니다.

{{< code-block lang="php" >}}
$theme = $flags->getStringValue('ui-theme', 'light', $context);

switch ($theme) {
    case 'dark':
        setDarkTheme();
        break;
    case 'light':
    default:
        setLightTheme();
        break;
}
{{< /code-block >}}

### 숫자 플래그 {#numeric-flags}

숫자 플래그에는 `getIntegerValue` 또는 `getFloatValue`를 사용합니다. 이 메서드는 기능이 제한, 백분율 또는 승수와 같은 숫자 파라미터에 의존할 때 적합합니다.

{{< code-block lang="php" >}}
$maxItems = $flags->getIntegerValue('cart-max-items', 20, $context);

$discountRate = $flags->getFloatValue('discount-rate', 0.0, $context);
{{< /code-block >}}

### 개체 플래그 {#object-flags}

구조화된 데이터에는 `getObjectValue`를 사용합니다. 이는 PHP 배열을 반환합니다.

{{< code-block lang="php" >}}
$config = $flags->getObjectValue('feature-config', [
    'maxRetries' => 3,
    'timeout' => 30,
], $context);

$maxRetries = $config['maxRetries'] ?? 3;
$timeout = $config['timeout'] ?? 30;
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

플래그 값 외에 추가 정보가 필요한 경우 `get<Type>Details` 메서드를 사용하세요. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

{{< code-block lang="php" >}}
$details = $flags->getBooleanDetails('new-feature', false, $context);

printf("Value: %s\n", $details->getValue() ? 'true' : 'false');
printf("Variant: %s\n", $details->getVariant() ?? 'none');
printf("Reason: %s\n", $details->getReason());

if ($details->isError()) {
    printf("Error Code: %s\n", $details->getErrorCode());
    printf("Error Message: %s\n", $details->getErrorMessage());
}
{{< /code-block >}}

Feature Flag 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

## 전체 예제 {#complete-examples}

다음 예제는 초기화, 평가 컨텍스트, 타입별 평가, 평가 세부 정보를 결합합니다.

### PHP 7 및 PHP 8: Datadog API {#php-7-and-php-8-datadog-api-1}

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();

$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'country' => 'US',
        'tier' => 'premium',
    ],
];

$details = $flags->getStringDetails('checkout-copy', 'control', $context);

if ($details->isError()) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $details->getErrorCode(),
        $details->getErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

### PHP 8: OpenFeature 어댑터 {#php-8-openfeature-adapter-1}

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('checkout-service', '1.0.0');
$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'country' => 'US',
        'tier' => 'premium',
    ])
);

$details = $client->getStringDetails('checkout-copy', 'control', $context);
$error = $details->getError();

if ($error !== null) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $error->getResolutionErrorCode()->getValue(),
        $error->getResolutionErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

## 컨텍스트 없는 평가 {#evaluation-without-context}

평가 컨텍스트를 제공하지 않고도 Feature Flags를 평가할 수 있습니다. 이는 사용자별 타겟팅이 필요하지 않은 전역 플래그에 유용합니다.

{{< code-block lang="php" >}}
$maintenanceMode = $flags->getBooleanValue('maintenance-mode', false);

if ($maintenanceMode) {
    http_response_code(503);
    echo 'Service temporarily unavailable';
    return;
}
{{< /code-block >}}

## 테스트 {#testing}

실제 Datadog 공급자를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, 단위 테스트에서 기능 플래그 평가를 테스트 더블로 대체할 수 있습니다.

OpenFeature PHP SDK 2.1에는 내장된 인메모리 공급자가 포함되어 있지 않습니다. 단위 테스트의 경우 기능 플래그 평가를 애플리케이션 인터페이스 뒤로 추상화하고 가짜 구현을 주입하세요.

{{< code-block lang="php" filename="FeatureFlags.php" >}}
<?php

use DDTrace\FeatureFlags\Client;

interface FeatureFlagReader
{
    public function getBooleanValue($flagKey, $defaultValue, array $context = []);
}

final class DatadogFeatureFlagReader implements FeatureFlagReader
{
    private $client;

    public function __construct(Client $client = null)
    {
        $this->client = $client ?: new Client();
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return $this->client->getBooleanValue($flagKey, $defaultValue, $context);
    }
}

final class InMemoryFeatureFlagReader implements FeatureFlagReader
{
    private $flags;

    public function __construct(array $flags)
    {
        $this->flags = $flags;
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return array_key_exists($flagKey, $this->flags)
            ? (bool) $this->flags[$flagKey]
            : $defaultValue;
    }
}
{{< /code-block >}}

테스트 설정에서 가짜 구현을 사용하세요.

{{< code-block lang="php" filename="CheckoutTest.php" >}}
$flags = new InMemoryFeatureFlagReader([
    'new-checkout-flow' => true,
]);

$checkout = new CheckoutService($flags);

self::assertTrue($checkout->usesNewCheckoutFlow('user-123'));
{{< /code-block >}}

## 문제 해결 {#troubleshooting}

### Feature Flags가 항상 기본값을 반환합니다. {#feature-flags-always-return-default-values}

Feature Flags가 예상치 못하게 항상 기본값을 반환하는 경우 다음 사항을 확인하세요.

- 애플리케이션 환경에 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`가 설정되어 있는지 확인하세요.
- Datadog Agent 구성에서 Remote Configuration이 활성화되어 있는지 확인하세요.
- `DD_SERVICE` 및 `DD_ENV`가 설정되어 있고 플래그에 대해 구성된 서비스 및 환경과 일치하는지 확인하세요.
- Datadog PHP SDK 버전에 Feature Flags 지원이 포함되어 있는지 확인하세요.
- PHP 프로세스가 Datadog Agent와 통신할 수 있는지 확인하세요.

### OpenFeature 공급자를 찾을 수 없음 {#openfeature-provider-not-found}

OpenFeature 어댑터는 PHP 8 애플리케이션에서만 사용할 수 있습니다. `DDTrace\OpenFeature\DataDogProvider`를 찾을 수 없는 경우:

- 애플리케이션이 PHP 8 이상에서 실행 중인지 확인하세요.
- `open-feature/sdk`가 Composer를 통해 설치되었는지 확인하세요.
- Datadog PHP 트레이서 버전에 기능 플래그 지원이 포함되어 있는지 확인하세요.

### 타겟팅 규칙이 {#targeting-rules-do-not-match}와 일치하지 않습니다.

타겟팅 규칙이 예상대로 일치하지 않는 경우:

- 평가 중인 사용자, 조직, 세션 또는 엔티티에 대해 일관된 `targetingKey`를 설정하세요.
- Datadog API를 사용할 때 `attributes` 키 아래에 사용자 지정 타겟팅 데이터를 전달하세요.
- 중첩되지 않은 원시 속성만 사용하세요. 중첩된 배열, 객체 및 null 값은 무시됩니다.
- `DD_ENV` 값이 [{{< ui >}}Feature Flag Environments{{< /ui >}}][5]에 표시되는지 확인하세요.

### Datadog에서 플래그 메트릭과 노출 확인 {#verify-flag-metrics-and-exposures-in-datadog}

#### 플래그 평가 메트릭 {#flag-evaluation-metrics}

PHP 트레이서에 `DD_METRICS_OTEL_ENABLED=true`가 설정되면 Datadog에 플래그 평가 횟수가 나타납니다. 각 평가는 플래그 키, 결과 변형, 평가 이유로 태그가 지정된 `feature_flag.evaluations` 카운터 메트릭을 내보냅니다. 이 메트릭이 나타나지 않으면 환경에 `DD_METRICS_OTEL_ENABLED=true`가 설정되어 있는지, 그리고 PHP 트레이서 버전이 플래그 평가 메트릭을 지원하는지 확인하세요. Agent OTLP 수신기 설정 및 문제 해결에 대해서는 [서버 측 플래그 평가 메트릭 설정][6]을 참조하세요.

#### 실험 노출 {#experiment-exposures}

노출은 실험과 관련된 플래그에 대해서만 Datadog에 나타납니다. 실험과 연결되지 않은 표준 기능 플래그는 노출 이벤트를 생성하지 않습니다. 노출이 누락된 경우:

1. Datadog UI에서 플래그가 실험과 연결되어 있는지 확인하세요.
2. Agent의 `DD_API_KEY`가 올바른지, Agent가 이벤트를 수신하고 있는지 확인하세요.
3. 평가 컨텍스트가 중첩되지 않은 원시 속성을 사용하는지 확인하세요. 중첩된 배열, 객체 및 null 값은 노출 보고에서 무시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ko/agent/remote_config/
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/tracing/trace_collection/dd_libraries/php/
[5]: /ko/feature_flags/concepts/environments/
[6]: /ko/feature_flags/guide/server_flag_evaluation_metrics/