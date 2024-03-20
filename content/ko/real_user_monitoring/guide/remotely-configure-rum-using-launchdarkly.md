---
aliases:
- /ko/real_user_monitoring/guide/remote-config-launchdarkly/
beta: false
description: LaunchDarkly를 사용해 RUM을 설치하여 RUM 샘플링을 원격으로 설정하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에서 RUM 데이터 시각화
kind: 가이드
private: true
title: LaunchDarkly를 사용해 RUM 원격 설정
---

## 개요
[RUM 애플리케이션][1]을 계측하는 경우 즉각적인 요구 사항(예: 더 높은 정확도의 데이터가 필요한 진행 중 인시던트)에 따라 RUM 초기화 설정을 원격으로 제어할 수 있습니다.

RUM 초기화 설정에 대한 변경 사항을 배포하는 대신 기능 플래그를 사용할 수 있습니다. [LaunchDarkly][2] 등 기능 플래그 관리 기업은 서버 측의 기능 플래그를 평가하므로 코드를 재배포할 필요 없이 코드를 변경할 수 있도록 해줍니다.

## LaunchDarkly에 플래그 설치
LaunchDarkly에 플래그를 설치하려면, [SDK 설정][3]에 대한 설명서를 따르세요. 자세한 정보는 LaunchDarkly의 [클라이언트 측 SDK 설명서][4]를 참조하세요.

LaunchDarkly는 다변수 플래그를 지원하므로 반환하는 변수 개수와 유형을 커스터마이즈할 수 있습니다. 다변수 플래그 유형에는 다음이 포함됩니다.

- **문자열 플래그**: 단순한 설정 값 또는 짝수 콘텐츠를 통과시키는 데 자주 사용됩니다. 
- **숫자 플래그**: 단순한 숫자 설정 값을 통과시키는 데 자주 사용됩니다.
- **JSON 플래그**:  복잡한 설정 개체 또는 짝수 구조 콘텐츠를 통과시키는 데 사용할 수 있습니다.

### 기능 플래그 옵션

이 가이드는 기능 플래그를 설치하여 RUM 설정을 원격으로 수정할 수 있는 두 가지 방법을 안내합니다.

1. 설정하려는 각 **개별 파라미터**에 대한 기능 플래그를 생성합니다.
2. **전체 RUM 설정**에 대한 기능 플래그를 생성합니다.

**팁**: 첫 번째 옵션을 사용하여 각 파라미터에 대한 개별 플래그를 생성하면 RUM 설정에 대해 더욱 정밀한 제어를 할 수 있습니다. 전체 RUM 설정에 대한 기능 플래그를 생성하면 변수가 많아져 추적하기 어려울 수 있으며 개발자가 변수 간 구체적인 차이를 식별하기 하는 데 오버헤드를 야기할 수 있습니다.

### 개별 파라미터 옵션

아래 예시에서 RUM 설정에 개별 파라미터를 위한 기능 플래그 `sessionSampleRate`이 생성되었습니다.

1. LaunchDarkly에서 새로운 기능 플래그를 생성하고 이름과 키를 제공합니다.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-sample-rate-new-flag.png" alt="LaunchDarkly에서 RUM 샘플 비율에 대해 새로운 플래그 생성" style="width:75%;">}}

2. 플래그 변수를 지정합니다. `sessionSampleRate` 파라미터의 경우, 숫자 값을 통과시키길 원하므로 플래그 유형을 숫자로 지정하고 변수 필드의 값처럼 원하는 샘플 비율을 추가할 수 있습니다.

   **참고:** 원하는 여러 플래그 변수를 생성할 수 있습니다. 필요할지 모르는 설정을 지금 모두 추가하는 것에 대해 걱정하지 마세요. 나중에도 항상 새로운 변수를 추가할 수 있습니다.

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-sample-rate-flag-setup.png" alt="LaunchDarkly에서 샘플 비율에 대한 변수 추가" style="width:75%;">}}

3. 기본 규칙을 설정합니다. 아래 예에서 "기본 샘플 비율"은 기능 플래그가 꺼져 있을 때 설정되고 "고정확도 샘플 비율"은 기능 플래그가 켜져 있을 때 설정됩니다. 

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-flag-targeting-rules.png" alt="LaunchDarkly에서 기본 규칙 설정" style="width:75%;">}}

### 전체 RUM 설정 옵션

이 예에서 전체 RUM 설정 개체에 대한 기능 플래그가 생성되었습니다.

1. LaunchDarkly에서 새로운 기능 플래그를 생성하고 이름과 키를 제공합니다.

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-configuration-new-flag.png" alt="LaunchDarkly에서 RUM 설정에 대해 새로운 플래그 생성" style="width:75%;">}}

2. 플래그 변수를 수정합니다. [RUM 설정][5]의 경우 개체를 통과시키길 원하므로 플래그 유형을 JSON으로 선택합니다. 값과 마찬가지로 원하는 설정을 추가하고 향후 코드에 JSON을 개체로 수정합니다.

   **참고:** 원하는 경우 다양한 플래그 변수를 생성할 수 있습니다. 필요할지 모르는 설정을 지금 모두 추가하는 것에 대해 걱정하지 마세요. 원할 때 항상 돌아와 새로운 변수 값을 추가할 수 있습니다.

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-configuration-flag-setup.png" alt="RUM configuration in LaunchDarkly에서 RUM 설정에 대한 변수 추가" style="width:75%;">}}

3. 기본 규칙을 설정합니다. 기능 플래그가 꺼진 경우 "기본 설정"이 설정합니다. 기능 플래그가 켜진 경우 "고정확도 설정"이 설정됩니다.

## RUM 설정에 기능 플래그 추가하기
[위][7]에 언급된 대로 LaunchDarkly를 설정하고, 종속성을 설치하고 [LaunchDarkly 클라이언트를 초기화하면][8]
)
Datadog 코드에 기능 플래그 평가를 추가할 수 있습니다. [여기][9]에서 플래그 평가에 대한 자세한 정보를 확인할 수 있습니다.

### 개별 파라미터 옵션

개별 파라미터에 대한 RUM SDK를 초기화하기 전, 먼저 LaunchDarkly 기능 플래그를 평가해야 합니다.

이 예애서 아래 코드 스니펫처럼 JS에 평가를 추가할 수 있습니다.

```javascript
const RUM_sample_rate = client.variation('rum-sample-rate-configuration', false);
```
그런 다음 RUM 초기화에 이를 추가합니다.

```javascript
datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  service: 'my-web-application',
  env: 'production',
  version: '1.0.0',
  sessionSampleRate: RUM_sample_rate,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
})
```

### 전체 RUM 설정 옵션

RUM SDK를 초기화하기 전 먼저 LaunchDarkly 기능 플래그를 평가해야 합니다. 예를 들어 JS에서 다음과 같이 평가를 추가할 수 있습니다.

```javascript
const RUM_configuration = client.variation('rum-configuration', false);
```

그러나 설정에서 RUM 초기화를 위해 통과하기 전, 플래그 JSON 값에서 개체를 생성해야 합니다. 이를 완료하면 RUM SDK를 초기화할 수 있습니다.

```javascript
datadogRum.init(RUM_configuration_object)
```

## LaunchDarkly 제어를 포함해 대시보드에서 직접 RUM을 설정할 수 있습니다.
Datadog 애플리케이션에서 직접 RUM 설정을 변경하려면 Datadog에 LaunchDarkly UI를 포함하고 기능 플래그 켜기/끄기를 전환할 수 있습니다. 기능 플래그가 설정되면 기본 값을 사용해 꺼둘 수 있습니다. 고정확도 데이터를 사용하려면 기능 플래그를 켭니다. 그러면 ON 변수에 대해 설정한 값이 RUM 초기화에 사용됩니다.

LaunchDarkly의 Datadog 앱 통합에는 기능 플래그 관리 UI가 대시보드 위젯으로 포함되어 있습니다. 이 위젯을 사용하면 Datadog을 나가지 않고도 기능 플래그를 전환할 수 있습니다. 주요 메트릭을 표시하는 새 대시보드나 기존 대시보드 내에 LaunchDarkly 위젯을 포함할 수 있습니다. 인시던트가 발생하거나 오류가 급증하는 경우 Datadog 내에서 RUM 구성에 대한 기능 플래그를 빠르게 전환하여 더 많은 데이터 샘플링을 시작하고 팀이 문제를 해결하는 데 필요한 정보에 액세스할 수 있도록 할 수 있습니다.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/datadog-launchdarkly-ui-widget.png" alt="Datadog 및 LaunchDarkly UI 통합 위젯" style="width:100%;">}}

설정에 대해 원래 구성한 값을 변경해야 하는 경우 언제든지 LaunchDarkly 내에서 플래그를 업데이트할 수 있습니다. 변경 사항을 저장한 후에는 모든 새 플래그 평가에 업데이트된 값이 적용됩니다.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser#setup
[2]: https://launchdarkly.com/
[3]: https://docs.launchdarkly.com/home/getting-started/setting-up
[4]: https://docs.launchdarkly.com/sdk/client-side
[5]: /ko/real_user_monitoring/browser#setup
[6]: https://docs.launchdarkly.com/sdk/features/evaluating
[7]: #setting-up-your-flag-in-launchdarkly
[8]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
[9]: https://docs.launchdarkly.com/sdk/features/evaluating