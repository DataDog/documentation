---
aliases:
- /ko/real_user_monitoring/guide/track-rum-usage-with-attribution-tags/
beta: true
description: 커스텀 속성 태그로 RUM 사용량을 추적하는 방법 알아보기
further_reading:
- link: /account_management/billing/usage_attribution/
  tag: 설명서
  text: 플랜 및 사용량 설정
title: 사용량 속성 태그로 RUM 사용량 추적
---

## 개요

[사용량 속성][1] 페이지는 데이터 사용량 및 사용 유형과 관련된 정보와 기능을 제공합니다. 기본적으로 데이터 사용량은 제품, 조직 또는 태그 키와 같은 더 넓은 범주별로 확인하고 필터링할 수 있습니다. 조직당 최대 3개의 사용량 속성 태그를 정의하고 각 RUM 애플리케이션의 UI에서 직접 관리할 수 있습니다.

이 가이드에서 다음 작업 방법을 설명합니다.

- 사용량 속성 페이지(실제 값의 +/- 20%까지 정확)에서 커스텀 카테고리별로 볼 수 있도록 RUM 사용량 속성을 설정합니다. 이렇게 하면 단일 집계 수치를 보는 대신 다양한 부서, 제품 또는 기타 카테고리의 RUM 세션 및 비용을 추적할 수 있습니다.
- 조직 수준에서 태그 설정을 강제 적용합니다(권장).

이 가이드에서는 부서별 RUM 사용량을 추적하는 방법을 예로 들어 설명합니다.

## RUM 사용량 속성 설정

SDK 수준에서 RUM 사용량 속성 태그를 설정할 수 있습니다.

### 태그 확인

사용량 카테고리는 태그별로 결정됩니다. RUM 사용량 속성을 설정하기 전에 사용량 속성 페이지에서 사용하려는 태그가 설정되어 있는지 확인하세요. **Edit tags**을 클릭한 다음 사용량 확인을 위한 태그를 선택하고 **Save**을 클릭합니다. 이 예에서는 "부서"를 태그로 추가했습니다.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-1.jpeg" alt="Check your tags on the Usage Attribution page" style="width:100%;">}}

**브라우저 세션**에 태그를 설정하려면 [`setGlobalContextProperty`][3] 메서드를 사용하여 세션 시작 시( `datadogRum.init`)를 호출한 직후에 RUM 전역 컨텍스트를 설정합니다. 예를 들어, 마케팅 부서에서 추적할 수 있도록 세션에 태그를 지정하는 방법은 다음과 같습니다.

```javascript
datadogRum.setGlobalContextProperty('department', 'marketing');
```

**모바일 세션** 태그를 설정하려면 [`addAttribute`][5] 방법을 사용합니다. 다음은 예시입니다.

```
//Android
GlobalRumMonitor.get().addAttribute("department", "marketing")

//iOS
RumMonitor.shared().addAttribute(forKey: "department", value: "marketing")
```

**참고**: 몇 가지 태그가 기본적으로 포함되어 있습니다(`service`, `env`, `version`, `application.id`, `application.name`). 그 외에는 위의 방법을 사용하여 전역 컨텍스트를 설정하세요.

이 단계를 배포한 후에는 추가한 태그에 따라 새 RUM 세션이 추적됩니다.

## RUM 사용량 보기
새로 태그가 지정된 세션은 [사용량 속성][1] 페이지에 표시됩니다. Session Replay 세션 및 RUM 세션 열을 사용하여 RUM을 검토하면 부서별 세션 수를 확인할 수 있습니다.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-3.png" alt="부서별 RUM 사용량 보기" style="width:100%;">}}

사용량 정보는 [`GetHourlyUsageAttribution`][5] 엔드포인트를 통해서도 확인할 수 있습니다.

## 조직 수준에서 태그 설정 강제 적용

RUM 애플리케이션에 사용량 속성태그를 적용하여 Datadog 요금 기여도를 추적합니다. 이 설정은 애플리케이션을 계측하거나 다시 계측할 필요 없이 적용 가능합니다. 이 설정이 활성화되면 Datadog에서 RUM 애플리케이션을 생성하거나 업데이트할 때 태그를 설정해야 합니다.

**참고**: 속성 태그가 데이터 수준(SDK에서 수집한 이벤트)과 애플리케이션 수준 모두에 설정된 경우 Datadog는 애플리케이션 수준에서 설정된 정보를 사용합니다.

부모 조직과 자식 조직이 모두 설정이 적용되는 Datadog 환경에서는 각각에 속성 태그를 설정해야 합니다. 예를 들어 상위 조직에 3개의 태그가 필요하고 하위 조직에 2개의 태그가 필요한 경우, 하위 조직은 상위 조직의 태그를 상속하여 하위 조직의 애플리케이션당 총 5개의 태그가 필요합니다(이 예에서는 상위 조직의 애플리케이션에 3개의 태그만 필요).

**참고**: 부모 조직에 태그가 적용되지 않은 경우에도 하위 조직은 여전히 부모 조직에서 태그를 상속받습니다.

1. RUM 설정 쓰기 권한이 있는지 확인합니다.
2. **Digital Experience** > **Real User Monitoring** > **Manage Applications** > **Enforce Usage Attribution**으로 이동합니다.
3. 모든 애플리케이션에 **Enforce tags for usage attribution on all applications** 토글을 클릭합니다. 이 기능을 활성화하면 모든 태그가 설정된 경우에만 앱을 생성하거나 업데이트할 수 있습니다.

   {{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/enforce-usage-attribution-toggle-1.png" alt="애플리케이션 수준에서 사용량 속성 태그 강제 적용 설정 토글" style="width:100%;">}}

   이 설정을 활성화하면 이전에 생성한 앱의 태그 값이 비어 있으므로 값을 수동으로 다시 채워야 합니다.

### RUM 애플리케이션의 사용량 속성 태그 관리
사용량 속성 태그를 적용하고 설정한 후에는 RUM 세션에 태그를 지정할 수 있습니다. 

UI에서 애플리케이션의 사용량 속성 태그를 관리합니다.

1. [RUM 애플리케이션 관리][2] 페이지로 이동합니다.
2. 새 애플리케이션을 생성하거나 업데이트할 때 필요한 태그가 몇 개 추가되었는지 확인할 수 있습니다.
3. **Edit tags**을 클릭하여 [설정된 사용량 속성 태그][6]를 할당합니다.
4. **변경 사항 저장**을 클릭합니다.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/enforce-usage-attribution-tags.png" alt="태그 강제 적용 후 필수 사용량 속성 태그를 추가하라는 프롬프트" style="width:60%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/usage-attribution
[2]: https://app.datadoghq.com/rum/list
[3]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[4]: /ko/api/latest/usage-metering/#get-hourly-usage-attribution-v1
[5]: /ko/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#track-attributes
[6]: /ko/real_user_monitoring/guide/tracking-rum-usage-with-usage-attribution-tags/#check-your-tags