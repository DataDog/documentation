---
description: Dart 및 Flutter 애플리케이션용 Datadog Feature Flags를 설정합니다.
further_reading:
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: /real_user_monitoring/application_monitoring/flutter/
  tag: 설명서
  text: 플러터 모니터링
- link: https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags
  tag: 소스 코드
  text: datadog_flags 소스 코드
- link: https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags_flutter
  tag: 소스 코드
  text: datadog_flags_flutter 소스 코드
title: Dart 및 Flutter Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 Dart 및 Flutter 애플리케이션을 계측하는 방법을 설명합니다. Datadog Feature Flags는 앱의 기능 가용성을 원격으로 제어하고 안전하게 실험할 수 있는 통합된 방법을 제공합니다.

Dart용 Datadog Feature Flags SDK는 네이티브 Dart 패키지입니다. 이 SDK는 Datadog에서 미리 계산된 할당을 가져오고, 로컬에서 타입별 플래그 값을 평가하며, 노출 및 플래그 평가 텔레메트리를 Datadog으로 다시 보고합니다. Flutter 애플리케이션은 독립형 Dart 패키지를 직접 사용하거나 `datadog_flags_flutter`를 설치하여 `datadog_flutter_plugin`에서 구성을 파생하고 RUM에 성공적인 평가를 추가할 수 있습니다.

<div class="alert alert-info">이 패키지는 Dart 및 Flutter용 OpenFeature 호환 API를 제공하지만, OpenFeature Dart SDK를 기반으로 구축되지는 않았습니다. 이 페이지의 API를 직접 사용하세요. Datadog은 Dart 및 Flutter를 위한 OpenFeature 공급자 기반 통합을 개발 중입니다.</div>

## 설치 {#installation}

이미 Datadog Flutter SDK를 사용하는 Flutter 앱의 경우 `datadog_flags_flutter`를 설치하세요.

{{< code-block lang="bash" >}}
flutter pub add datadog_flags_flutter
{{< /code-block >}}

`datadog_flags_flutter`는 `datadog_flutter_plugin` 3.4.0 이상 버전이 필요합니다.

독립형 Dart 사용의 경우 `datadog_flags`를 설치하세요.

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="bash" >}}
dart pub add datadog_flags
{{< /code-block >}}
{{% /tab %}}

{{% tab "Flutter" %}}
{{< code-block lang="bash" >}}
flutter pub add datadog_flags
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

그런 다음 공용 API를 가져오세요.

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';
{{< /code-block >}}
{{% /tab %}}

{{% tab "Flutter 통합" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Flutter 통합 설정 {#flutter-integrated-setup}

Flutter 앱이 이미 `datadog_flutter_plugin`을 초기화하는 경우 이 설정을 사용하세요. Datadog SDK를 초기화하기 전에 기존 `DatadogConfiguration`에 `DatadogFlagsPluginConfiguration`를 추가하세요. 이 플러그인은 Flutter SDK 구성에서 클라이언트 토큰, 환경, 사이트, 서비스, 버전 및 RUM 애플리케이션 ID를 파생합니다. 클라이언트 토큰을 생성하려면 [클라이언트 토큰][1]을 참조하세요.

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Flutter Feature Flags는 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

final configuration = DatadogConfiguration(
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
  site: DatadogSite.{{< region-param key="dd_site_name" code="true" >}},
  service: '<SERVICE_NAME>',
  version: '<APP_VERSION>',
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
  ),
)..addPlugin(
    const DatadogFlagsPluginConfiguration(
      flagsConfiguration: DatadogFlagsConfiguration(
        initializationTimeout: Duration(seconds: 2),
      ),
    ),
  );

await DatadogSdk.instance.initialize(configuration, TrackingConsent.granted);
{{< /code-block >}}

초기화 후 플러그인에서 플래그 클라이언트를 가져와 현재 대상에 대한 평가 컨텍스트로 초기화하세요.

{{< code-block lang="dart" >}}
final flags = DatadogSdk.instance.flags;
if (flags == null) {
  return;
}

final flagsClient = flags.sharedClient();
try {
  await flagsClient.initialize(
    const FlagsEvaluationContext(
      targetingKey: 'user-123',
      attributes: {
        'companyId': 'company-456',
        'plan': 'enterprise',
      },
    ),
  );
} on FlagsInitializationTimeoutException {
  // Continue startup with stored assignments or evaluation defaults.
}
{{< /code-block >}}

성공적인 평가는 Datadog Feature Flags 텔레메트리 파이프라인을 통해 전송됩니다. Flutter 통합 설정을 사용하면 변형을 반환하는 성공적인 평가도 Feature Flags 평가로서 활성 RUM 뷰에 추가됩니다.

## 독립형 Dart 설정 {#standalone-dart-setup}

`datadog_flutter_plugin`을 사용하지 않거나 Flutter SDK 초기화와 독립적으로 Feature Flags를 관리하려는 경우 이 설정을 사용하세요.

앱 시작 초기에 Datadog Feature Flags를 활성화하세요. 실시간 Feature Flags 구성을 위해서는 `clientToken`, `env` 및 `site`가 필요합니다. 클라이언트 토큰을 생성하려면 [클라이언트 토큰][1]을 참조하세요.

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Dart 및 Flutter Feature Flags는 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
final datadogFlags = DatadogFlags.instance;

await datadogFlags.enable(
  configuration: DatadogFlagsConfiguration(
    initializationTimeout: const Duration(seconds: 2),
    datadogConfig: const DatadogFlagsConfig(
      clientToken: '<CLIENT_TOKEN>',
      env: '<ENV_NAME>',
      site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
      applicationId: '<RUM_APPLICATION_ID>',
      service: '<SERVICE_NAME>',
      version: '<APP_VERSION>',
    ),
  ),
);
{{< /code-block >}}

`applicationId`, `service` 및 `version`은 선택 사항입니다. 지정된 경우, SDK는 이를 Feature Flags 텔레메트리 컨텍스트에 포함합니다.

Datadog 조직과 일치하는 `DatadogFlagsSite` 값을 사용하세요.

## 클라이언트 생성 및 가져오기{#create-and-retrieve-a-client}

앱 시작 중에 공유 클라이언트를 한 번 생성하거나 가져오세요.

{{< code-block lang="dart" >}}
final flagsClient = DatadogFlags.instance.sharedClient();
{{< /code-block >}}

독립적인 평가 컨텍스트를 위해 여러 개의 이름이 지정된 클라이언트를 생성할 수도 있습니다.

{{< code-block lang="dart" >}}
final orgFlags = DatadogFlags.instance.sharedClient(name: 'org');
final userFlags = DatadogFlags.instance.sharedClient(name: 'user');
{{< /code-block >}}

클라이언트는 생성된 Dart isolate 내에서만 사용할 수 있습니다. 백그라운드 isolate는 메인 isolate와 `DatadogFlags` 상태 또는 할당 캐시를 공유하지 않습니다. 백그라운드 isolate에서 플래그를 평가해야 하는 경우 `DatadogFlags.instance.enable()`를 호출하고 필요한 클라이언트를 생성한 다음 독립적으로 초기화하세요.

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

`FlagsEvaluationContext`를 사용하여 플래그 평가가 적용되는 사용자나 대상을 정의합니다. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 사용자, 조직, 세션 또는 장치 정보가 포함됩니다. 플래그를 평가하기 전에 클라이언트가 컨텍스트에 대한 할당을 가져올 수 있도록 `initialize()`를 호출하세요.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 부울과 같이 중첩되지 않은 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< code-block lang="dart" >}}
await flagsClient.initialize(
  const FlagsEvaluationContext(
    targetingKey: 'user-123',
    attributes: {
      'companyId': 'company-456',
      'plan': 'enterprise',
      'loggedIn': true,
    },
  ),
);
{{< /code-block >}}

`targetingKey`는 백분율 롤아웃을 위한 무작위화 대상입니다. 동일한 타겟팅 키를 가진 사용자는 특정 플래그에 대해 항상 동일한 변형을 받습니다.

`targetingKey` 는 선택 사항입니다. 사용자 또는 조직 ID를 알기 전에 컨텍스트를 초기화하면 SDK는 사전 계산 할당 요청에 대해 빈 문자열을 보냅니다.

로그아웃 및 로그인한 사용자 또는 조직 수준 및 사용자 수준 타겟팅과 같이 서로 다른 평가 대상에 대해 별도의 이름이 지정된 클라이언트를 사용하세요.

{{< code-block lang="dart" >}}
await orgFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'org-123'),
);

await userFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'user-456'),
);
{{< /code-block >}}

## 플래그 평가 {#evaluate-flags}

클라이언트가 초기화된 후에는 앱 전체에서 플래그 값을 읽을 수 있습니다. SDK가 로컬에 캐시된 할당 데이터를 사용하므로 플래그 평가는 _로컬에서 즉시_ 수행됩니다. 타입별 평가 중에는 네트워크 요청이 발생하지 않습니다.

각 평가 메서드에는 호출자가 제공하는 기본값이 필요합니다. 평가 메서드는 공급자 준비 상태, 누락된 플래그 또는 타입 불일치로 인해 오류를 발생시키지 않습니다. 평가된 값, 할당 메타데이터와 SDK가 기본값을 반환할 때의 프로그래밍 오류가 포함된 `FlagDetails<T>` 값을 반환합니다.

### 불리언 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `getBooleanDetails()`를 사용하세요.

{{< code-block lang="dart" >}}
final details = flagsClient.getBooleanDetails(
  key: 'checkout.enabled',
  defaultValue: false,
);

if (details.error == null && details.value) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### String 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `getStringDetails()`를 사용하세요.

{{< code-block lang="dart" >}}
final details = flagsClient.getStringDetails(
  key: 'ui.theme',
  defaultValue: 'light',
);

if (details.value == 'dark') {
  setDarkTheme();
} else {
  setLightTheme();
}
{{< /code-block >}}

### Integer 및 Double 플래그 {#integer-and-double-flags}

제한, 백분율, 승수와 같은 숫자 플래그에는 `getIntegerDetails()` 또는 `getDoubleDetails()`를 사용하세요.

{{< code-block lang="dart" >}}
final maxItems = flagsClient.getIntegerDetails(
  key: 'cart.items.max',
  defaultValue: 20,
);

final priceMultiplier = flagsClient.getDoubleDetails(
  key: 'pricing.multiplier',
  defaultValue: 1.0,
);
{{< /code-block >}}

### 개체 플래그 {#object-flags}

JSON 호환 구조화된 구성에는 `getObjectDetails()`를 사용하세요.

{{< code-block lang="dart" >}}
final config = flagsClient.getObjectDetails(
  key: 'ui.config',
  defaultValue: const {
    'color': '#00A3FF',
    'fontSize': 14,
  },
);
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

평가된 값, 변형, 이유 또는 평가 오류가 필요할 때는 세부 정보 API를 사용하세요.

{{< code-block lang="dart" >}}
final details = flagsClient.getStringDetails(
  key: 'checkout.copy',
  defaultValue: 'Continue',
);

print(details.value);
print(details.variant);
print(details.reason);
print(details.error?.code);
{{< /code-block >}}

공급자가 준비되지 않았거나, 플래그를 찾을 수 없거나, 할당 값이 타입별 평가 메서드와 일치하지 않아 SDK가 기본값을 반환할 때 `FlagDetails.error`가 설정됩니다. Datadog에서 성공적으로 반환된 세부 정보에는 평가된 값과 `variant` 및 `reason`과 같은 할당 메타데이터가 포함됩니다.

## 고급 구성 {#advanced-configuration}

`DatadogFlagsConfiguration`은 SDK 동작을 제어합니다.

{{< code-block lang="dart" >}}
DatadogFlagsConfiguration(
  datadogConfig: datadogConfig,
  initializationTimeout: const Duration(seconds: 2),
  trackExposures: true,
  trackEvaluations: true,
  evaluationFlushInterval: const Duration(seconds: 10),
  store: myStore,
);
{{< /code-block >}}

`trackExposures`
: `true`인 경우(기본값), SDK는 할당이 로깅 대상으로 표시된 성공적인 평가에 대한 노출 이벤트를 기록합니다. 노출 추적을 비활성화하려면 `false`로 설정하세요.

`trackEvaluations`
: `true`인 경우(기본값), SDK는 집계된 플래그 평가 텔레메트리를 기록합니다. 평가 추적을 비활성화하려면 `false`로 설정하세요.

`initializationTimeout`
: 첫 번째 평가 컨텍스트가 준비될 때까지 기다리는 최대 시간입니다. 제한 시간은 전체 초기화 작업에 하나의 실제 경과 시간 한도를 사용합니다. 여기에는 저장된 할당 로드, 요청 인코딩, 할당 가져오기, 응답 본문 읽기, JSON 디코딩, 할당 게시 및 할당 저장이 포함됩니다. HTTP 클라이언트의 시간 초과에는 영향을 주지 않습니다.

  <br>시간 초과는 각 클라이언트에 대한 첫 번째 `initialize()` 호출에만 적용됩니다. 첫 번째 호출에서는 작업이 실패하거나 다른 작업으로 대체되더라도 시간 초과 시간이 소진됩니다. 이후 호출에는 초기화 타이머가 없습니다. 기본값은 5초입니다. 시간 초과를 비활성화하려면 값을 `null`, 0 또는 음수 시간으로 설정하세요.

  시간 초과가 발생하면 `initialize()`는 `FlagsInitializationTimeoutException`을 발생시킵니다. 할당 작업은 계속되며 나중에 성공 결과를 게시할 수 있습니다. 일치하는 저장된 할당은 계속 사용할 수 있습니다. 할당이 없는 평가는 `FlagEvaluationError.providerNotReady`와 함께 호출자가 제공한 기본값을 반환합니다.

  Dart는 동기식 초기화 작업과 동일한 isolate에서 시간 초과 타이머를 실행합니다. 따라서 동기식 작업으로 인해 실제 대기 시간이 설정된 시간 제한보다 길어질 수 있습니다.

  <div class="alert alert-info"><code>initializationTimeout</code> 를 사용하는 직접 클라이언트 상태 관찰은 <code>datadog_flags</code> 및 <code>datadog_flags_flutter</code> 1.1.0 이상에서 사용 가능합니다.</div>

`evaluationFlushInterval`
: 집계된 플래그 평가 텔레메트리가 Datadog으로 전송되는 간격입니다. 허용되는 값은 1초에서 60초 사이입니다. 기본값은 10초입니다.

`store`
: 마지막으로 확인된 할당을 저장하는 선택적 저장소입니다. SDK는 새로운 네트워크 요청이 진행 중이거나 사용할 수 없을 때 일치하는 저장된 할당을 사용할 수 있습니다.

`httpClient`, `customFlagsEndpoint`, `customExposureEndpoint` 및 `customEvaluationEndpoint`
: 테스트, 프록시 또는 사용자 지정 라우팅을 위한 고급 재정의입니다.

  <br>`enable()`을 `datadogConfig` 없이 호출하면 SDK는 라이브 공급자를 생성하지 않습니다. 평가는 `FlagEvaluationError.providerNotReady`와 함께 호출자가 제공한 기본값을 반환합니다.

  Flutter 통합 설정에서는 `DatadogFlagsPluginConfiguration`을 통해 이러한 옵션을 전달하세요.

  {{< code-block lang="dart" >}}
  final configuration = DatadogConfiguration(
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENV_NAME>',
    site: DatadogSite.{{< region-param key="dd_site_name" code="true" >}},
    rumConfiguration: DatadogRumConfiguration(
      applicationId: '<RUM_APPLICATION_ID>',
    ),
  )..addPlugin(
      const DatadogFlagsPluginConfiguration(
        flagsConfiguration: DatadogFlagsConfiguration(
          initializationTimeout: Duration(seconds: 2),
          trackExposures: true,
          trackEvaluations: true,
        ),
        rumIntegrationEnabled: true,
      ),
    );
  {{< /code-block >}}

`rumIntegrationEnabled`
: `true`(기본값)인 경우, 변형을 반환하는 성공적인 평가는 Feature Flags 평가로 활성 RUM 뷰에 추가됩니다. 앱에서 RUM을 사용하지 않는 경우 이 옵션은 아무런 효과가 없습니다.

## 마지막으로 확인된 할당 저장소 {#last-known-assignment-storage}

SDK는 `initialize()`가 성공한 후 할당을 메모리에 유지합니다. SDK 인스턴스 간에 마지막으로 확인된 할당을 복원하려면 `DatadogFlagsStore`를 제공하세요.

{{< code-block lang="dart" >}}
class MyFlagsStore implements DatadogFlagsStore {
  @override
  Future<FlagsData?> read(String clientName) async {
    // Read and decode persisted FlagsData for this client name.
    return null;
  }

  @override
  Future<void> write(String clientName, FlagsData data) async {
    // Encode and persist successful assignments for this client name.
  }

  @override
  Future<void> delete(String clientName) async {
    // Delete persisted assignments for this client name.
  }
}
{{< /code-block >}}

저장된 할당은 평가 컨텍스트가 활성 컨텍스트와 일치할 때만 사용됩니다. 라이브 가져오기에 성공하면 클라이언트는 항상 최신 할당 상태로 전환되고 해당 상태가 저장소에 다시 저장됩니다.

Dart 패키지는 디스크 위치를 선택하거나 Flutter 전용 디스크 저장소를 제공하지 않습니다. Flutter 앱은 선호하는 앱 저장소 메커니즘을 사용하여 `DatadogFlagsStore`를 구현할 수 있습니다.

## 종료 {#shutdown}

클라이언트가 더 이상 필요하지 않을 때 `shutdown()`을 호출하세요. 이 작업은 클라이언트의 메모리 내 할당을 지우기 전에 보류 중인 노출 및 플래그 평가 업로드를 완료합니다.

{{< code-block lang="dart" >}}
await flagsClient.shutdown();
{{< /code-block >}}

애플리케이션이 플래그 SDK를 종료할 때 `DatadogFlags.instance.disable()`을 호출하세요.

{{< code-block lang="dart" >}}
await DatadogFlags.instance.disable();
{{< /code-block >}}

## 완전한 예 {#complete-example}

다음 예제는 SDK를 활성화하고, 평가 컨텍스트로 클라이언트를 초기화하며, 불리언 플래그를 평가합니다.

{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';

Future<void> initializeFlags() async {
  final datadogFlags = DatadogFlags.instance;

  await datadogFlags.enable(
    configuration: DatadogFlagsConfiguration(
      initializationTimeout: const Duration(seconds: 2),
      datadogConfig: const DatadogFlagsConfig(
        clientToken: '<CLIENT_TOKEN>',
        env: '<ENV_NAME>',
        site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        applicationId: '<RUM_APPLICATION_ID>',
        service: '<SERVICE_NAME>',
        version: '<APP_VERSION>',
      ),
    ),
  );

  final flagsClient = datadogFlags.sharedClient();
  try {
    await flagsClient.initialize(
      const FlagsEvaluationContext(
        targetingKey: 'user-123',
        attributes: {
          'companyId': 'company-456',
          'plan': 'enterprise',
        },
      ),
    );
  } on FlagsInitializationTimeoutException {
    // Continue startup with stored assignments or evaluation defaults.
  }

  final details = flagsClient.getBooleanDetails(
    key: 'checkout.enabled',
    defaultValue: false,
  );

  if (details.error == null && details.value) {
    showNewCheckoutFlow();
  }
}
{{< /code-block >}}

## 테스트 {#testing}

실제 `DatadogFlagsClient`를 사용하여 전용 Datadog 테스트 환경에 대해 테스트하거나, 작은 인터페이스 뒤에 애플리케이션 코드를 격리하고 단위 테스트에서 가짜 구현으로 대체할 수 있습니다. 이 섹션에서는 테스트를 독립적으로 오프라인에서 실행할 수 있는 가짜 구현 방식을 보여줍니다.

{{< code-block lang="dart" >}}
abstract interface class CheckoutFlags {
  bool newCheckoutEnabled();
}

final class DatadogCheckoutFlags implements CheckoutFlags {
  final DatadogFlagsClient client;

  DatadogCheckoutFlags(this.client);

  @override
  bool newCheckoutEnabled() {
    return client
        .getBooleanDetails(
          key: 'checkout.enabled',
          defaultValue: false,
        )
        .value;
  }
}

final class TestCheckoutFlags implements CheckoutFlags {
  @override
  bool newCheckoutEnabled() => true;
}
{{< /code-block >}}

그런 다음 단위 테스트에는 `TestCheckoutFlags`를 주입하고 프로덕션 환경에는 `DatadogCheckoutFlags`를 주입하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/api-app-keys/#client-tokens