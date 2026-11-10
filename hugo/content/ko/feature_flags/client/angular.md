---
description: Angular 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: https://openfeature.dev/docs/reference/sdks/client/web/angular/
  tag: OpenFeature
  text: OpenFeature Angular SDK
- link: /real_user_monitoring/application_monitoring/browser/
  tag: 설명서
  text: 브라우저 모니터링
title: Angular Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 Angular 애플리케이션을 계측하는 방법을 설명합니다. Datadog Feature Flags는 앱의 기능 가용성을 원격으로 제어하고, 안전하게 실험하며, 새로운 경험을 안심하고 제공할 수 있는 통합된 방법을 제공합니다.

Angular용 Datadog Feature Flags SDK는 Feature Flag 관리를 위한 개방형 표준인 [OpenFeature][1]를 기반으로 구축되었습니다. 이 가이드에서는 SDK를 설치하고, Datadog 공급자를 구성하며, 구조적 지시문이나 FeatureFlagService를 통해 Angular 컴포넌트에서 플래그를 평가하는 방법을 설명합니다.

## 요구 사항 {#requirements}

* **Angular** 버전 16 이상
* **ECMAScript 2015 호환 웹 브라우저**(Chrome, Edge, Firefox 등)

## 설치 {#installation}

선호하는 패키지 관리자를 사용하여 Datadog OpenFeature 공급자와 OpenFeature Angular SDK를 설치합니다.

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/angular-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/angular-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/angular-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 공급자 초기화 {#initialize-the-provider}

Datadog 자격 증명이 포함된 `DatadogProvider` 인스턴스를 생성합니다. 실시간 브라우저 Feature Flags 구성을 위해서는 `applicationId`, `clientToken`, `site` 및 `env`가 필요합니다. 클라이언트 토큰을 생성하려면 [클라이언트 토큰][2]을 참조하세요.

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">브라우저 Feature Flags는 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>{{< /site-region >}}

```typescript
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  // Required
  // applicationId is a unique identifier to distinguish multiple frontend applications.
  // This should match the app ID you provide to your RUM SDK.
  applicationId: '<APPLICATION_ID>',
  // Required
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});
```

## 모듈 구성 {#configure-the-module}

Angular 모듈에서 `OpenFeatureModule`을 가져오고, `forRoot` 메서드를 사용하여 구성합니다. 이렇게 하면 애플리케이션 전체에서 Feature Flags를 사용할 수 있습니다.

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

평가 컨텍스트를 사용하여 플래그 평가가 누구 또는 무엇에 적용되는지 정의합니다. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 사용자 또는 세션 정보가 포함됩니다. 타겟팅 규칙에서 이러한 속성을 참조하여 각 변형을 표시할 대상을 제어하세요.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같은 단일한 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

<div class="alert alert-info">해당 <code>targetingKey</code> 항목은 백분율 기반 타겟팅의 무작위화 대상으로 사용됩니다. 플래그가 대상의 백분율(예: 50%)을 타겟팅할 때, <code>targetingKey</code> 는 사용자가 어떤 '버킷'에 속하는지 결정합니다. 사용자의 <code>targetingKey</code> 항목이 동일한 경우 주어진 플래그에 대해 항상 동일한 변형을 받습니다.</div>

### 정적 객체 사용 {#using-a-static-object}

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenFeatureModule } from '@openfeature/angular-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

@NgModule({
  imports: [
    CommonModule,
    OpenFeatureModule.forRoot({
      provider: provider,
      context: {
        targetingKey: 'user-123',
        user_id: '123',
        user_role: 'admin',
        email: 'user@example.com',
      },
    }),
  ],
});

export class AppModule {}
```

### 팩토리 함수 사용 {#using-a-factory-function}

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenFeatureModule, EvaluationContext } from '@openfeature/angular-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

@NgModule({
  imports: [
    CommonModule,
    OpenFeatureModule.forRoot({
      provider: provider,
      context: (): EvaluationContext => {
        // Load context from your service, localStorage, or other source
        // This is a placeholder - implement based on your application's needs
        return loadContextFromLocalStorage();
      },
    }),
  ],
});

export class AppModule {}
```

### 평가 컨텍스트 업데이트 {#update-the-evaluation-context}

초기화 후 평가 컨텍스트를 업데이트(예: 사용자가 로그인할 때)하려면`OpenFeature.setContext()`를 사용하세요.

{{< code-block lang="typescript" >}}
import { OpenFeature } from '@openfeature/angular-sdk';

await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## 플래그 평가 {#evaluate-flags}

OpenFeature Angular SDK는 Feature Flags를 사용하는 두 가지 주요 방식을 제공합니다.

1. **구조적 지시문** - 템플릿 기반 조건부 렌더링 목적
2. **FeatureFlagService** - **Observables** 또는 **Signals**를 통한 프로그래밍 방식 액세스 목적

### 불리언 플래그 {#boolean-flags}

켜짐/꺼짐 또는 참/거짓 조건에는 불리언 플래그를 사용하세요.

{{< tabs >}}
{{% tab "구조적 지시문" %}}
{{< code-block lang="html" >}}
<div
  *booleanFeatureFlag="'isFeatureEnabled'; default: true; domain: 'userDomain'; else: booleanFeatureElse; initializing: booleanFeatureInitializing; reconciling: booleanFeatureReconciling"
>
  This is shown when the feature flag is enabled.
</div>
<ng-template #booleanFeatureElse> This is shown when the feature flag is disabled. </ng-template>
<ng-template #booleanFeatureInitializing> This is shown when the feature flag is initializing. </ng-template>
<ng-template #booleanFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Observables" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div *ngIf="(isFeatureEnabled$ | async)?.value">
      Feature is enabled! Reason: {{ (isFeatureEnabled$ | async)?.reason }}
    </div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  isFeatureEnabled$ = this.flagService.getBooleanDetails('my-feature', false);
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "신호" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div *ngIf="isFeatureEnabled()?.value">
      Feature is enabled! Reason: {{ isFeatureEnabled()?.reason }}
    </div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  isFeatureEnabled = toSignal(this.flagService.getBooleanDetails('my-feature', false));
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### String 플래그 {#string-flags}

문자열 플래그를 사용하여 여러 변형 또는 구성 문자열 중에서 선택합니다.

{{< tabs >}}
{{% tab "구조적 지시문" %}}
{{< code-block lang="html" >}}
<div
  *stringFeatureFlag="'themeColor'; value: 'dark'; default: 'light'; domain: 'userDomain'; else: stringFeatureElse; initializing: stringFeatureInitializing; reconciling: stringFeatureReconciling"
>
  This is shown when the feature flag matches the specified theme color.
</div>
<ng-template #stringFeatureElse> This is shown when the feature flag does not match the specified theme color. </ng-template>
<ng-template #stringFeatureInitializing> This is shown when the feature flag is initializing. </ng-template>
<ng-template #stringFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Observables" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>Theme: {{ (currentTheme$ | async)?.value }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  currentTheme$ = this.flagService.getStringDetails('theme', 'light');
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "신호" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div>Theme: {{ currentTheme()?.value }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  currentTheme = toSignal(this.flagService.getStringDetails('theme', 'light'));
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 숫자 플래그 {#number-flags}

제한, 백분율 또는 승수와 같은 숫자 값에는 숫자 플래그를 사용하세요.

{{< tabs >}}
{{% tab "구조적 지시문" %}}
{{< code-block lang="html" >}}
<div
  *numberFeatureFlag="'discountRate'; value: 10; default: 5; domain: 'userDomain'; else: numberFeatureElse; initializing: numberFeatureInitializing; reconciling: numberFeatureReconciling"
>
  This is shown when the feature flag matches the specified discount rate.
</div>
<ng-template #numberFeatureElse> This is shown when the feature flag does not match the specified discount rate. </ng-template>
<ng-template #numberFeatureInitializing> This is shown when the feature flag is initializing. </ng-template>
<ng-template #numberFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Observables" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>Max items: {{ (maxItems$ | async)?.value }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  maxItems$ = this.flagService.getNumberDetails('max-items', 10);
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "신호" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div>Max items: {{ maxItems()?.value }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  maxItems = toSignal(this.flagService.getNumberDetails('max-items', 10));
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 객체 플래그 {#object-flags}

구조화된 구성 데이터에는 객체 플래그를 사용하세요.

{{< tabs >}}
{{% tab "구조적 지시문" %}}
{{< code-block lang="html" >}}
<div
  *objectFeatureFlag="'userConfig'; value: { theme: 'dark' }; default: { theme: 'light' }; domain: 'userDomain'; else: objectFeatureElse; initializing: objectFeatureInitializing; reconciling: objectFeatureReconciling"
>
  This is shown when the feature flag matches the specified user configuration.
</div>
<ng-template #objectFeatureElse>
  This is shown when the feature flag does not match the specified user configuration.
</ng-template>
<ng-template #objectFeatureInitializing> This is shown when the feature flag is initializing. </ng-template>
<ng-template #objectFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Observables" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>Timeout: {{ (config$ | async)?.value?.timeout }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  config$ = this.flagService.getObjectDetails<{ timeout: number }>('api-config', { timeout: 5000 });
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "신호" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div>Timeout: {{ config()?.value?.timeout }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  config = toSignal(this.flagService.getObjectDetails<{ timeout: number }>('api-config', { timeout: 5000 }));
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 추가 옵션 {#additional-options}

#### 자동 재렌더링 비활성화 {#disable-automatic-re-rendering}

기본적으로 지시문은 플래그 값 또는 컨텍스트가 변경될 때 재렌더링됩니다. 이 동작을 비활성화할 수 있습니다.

{{< code-block lang="html" >}}
<div
  *booleanFeatureFlag="'isFeatureEnabled'; default: true; updateOnContextChanged: false; updateOnConfigurationChanged: false;"
>
  This is shown when the feature flag is enabled.
</div>
{{< /code-block >}}

서비스 메서드는 자동 업데이트를 제어하는 옵션을 허용합니다.

{{< code-block lang="typescript" >}}
const flag$ = this.flagService.getBooleanDetails('my-flag', false, 'my-domain', {
  updateOnConfigurationChanged: false, // default: true
  updateOnContextChanged: false, // default: true
});
{{< /code-block >}}

#### 평가 세부 정보 사용 {#consume-evaluation-details}

템플릿에서 평가 세부 정보에 액세스할 수 있습니다.

{{< code-block lang="html" >}}
<div
  *stringFeatureFlag="'themeColor'; value: 'dark'; default: 'light'; else: stringFeatureElse; let value; let details = evaluationDetails"
>
  It was a match! The theme color is {{ value }} because of {{ details.reason }}
</div>
<ng-template #stringFeatureElse let-value let-details="evaluationDetails">
  It was no match! The theme color is {{ value }} because of {{ details.reason }}
</ng-template>
{{< /code-block >}}

예상 플래그 값이 생략되면 템플릿이 항상 렌더링됩니다. 이는 조건부 렌더링 없이 플래그 값이나 세부 정보만을 렌더링하는 데 사용할 수 있습니다.

{{< code-block lang="html" >}}
<div *stringFeatureFlag="'themeColor'; default: 'light'; let value;">
  The theme color is {{ value }}.
</div>
{{< /code-block >}}

서비스 사용 시 세부 정보 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div *ngIf="details()?.value">
      Feature is enabled! Variant: {{ details()?.variant }}, Reason: {{ details()?.reason }}
    </div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  details = toSignal(this.flagService.getBooleanDetails('my-feature', false));

  // Access the details
  // details().value       // Evaluated value (true or false)
  // details().variant     // Variant name, if applicable
  // details().reason      // Why this value was chosen
  // details().errorCode   // Error code, if evaluation failed
}
{{< /code-block >}}

## 브라우저 공급자 옵션 구성 {#configure-browser-provider-options}

Angular 공급자는 다음과 같은 선택적 설정을 지원하는 Datadog 브라우저 공급자를 사용합니다.

| 옵션 | 기본값 | 사용 |
| --- | --- | --- |
| `enableExposureLogging` | `true` | 노출 이벤트를 노출 수집기로 전송합니다. |
| `enableFlagEvaluationTracking` | `true` | 집계된 평가 텔레메트리를 전송합니다. |
| `enableRumFeatureFlagTracking` | `true` | 브라우저 RUM을 사용할 수 있는 경우 RUM 이벤트에 플래그 평가를 추가합니다. 이 옵션을 활성화하면 RUM 청구 이벤트 수가 증가할 수 있습니다. |
| `flagEvaluationTrackingInterval` | `10000`ms | 평가 텔레메트리를 위한 플러시 간격입니다. |
| `initialFlagsConfiguration` | 설정되지 않음 | 가져오기에 실패할 경우 대체 수단으로 컨텍스트와 일치하는 사전 계산 데이터를 제공합니다. [초기 사전 계산 대체 데이터][3]를 참조하세요. |
| `flaggingProxy` | 설정되지 않음 | `site` 대신 프록시를 통해 플래그를 가져옵니다. |
| `customHeaders` | 설정되지 않음 | 플래그 가져오기 요청에 헤더를 추가합니다. |
| `overwriteRequestHeaders` | `false` | 기본 요청 헤더를 `customHeaders`로 바꿉니다. |

`DatadogProvider`는 여전히 Angular 애플리케이션에 권장되는 브라우저 공급자입니다. 애플리케이션 자체의 구성 전달 또는 컨텍스트 변경 전반의 로컬 규칙 평가에 대해서는 [브라우저 규칙 기반 평가][4]를 참조하세요. 이 고급 설정을 사용하려면 명시적인 구성 새로 고침과 추적 수명 주기 관리가 필요합니다.

## 테스트 {#testing}

실제 `DatadogProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `TypedInMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. `TypedInMemoryProvider`는 Angular Feature Flags용으로 이미 설치된 `@openfeature/web-sdk`에서 내보냅니다.

{{< code-block lang="typescript" >}}
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { FeatureFlagService, OpenFeatureModule } from '@openfeature/angular-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
};

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      OpenFeatureModule.forRoot({
        provider: new TypedInMemoryProvider(flags),
        context: { targetingKey: 'test-user' },
      }),
    ],
  }).compileComponents();
});

afterEach(() => {
  TestBed.resetTestingModule();
});

it('uses in-memory flag values', async () => {
  const flagService = TestBed.inject(FeatureFlagService);
  const details = await firstValueFrom(flagService.getBooleanDetails('new_checkout_button', false));

  expect(details.value).toBe(true);
});
{{< /code-block >}}

Web SDK 플래그 형태에는 `variants`, `defaultVariant` 및 `disabled`가 필요합니다. 서비스를 주입하거나 플래그를 읽는 컴포넌트를 렌더링하기 전에 인메모리 공급자를 등록합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/sdks/client/web/angular/
[2]: /ko/account_management/api-app-keys/#client-tokens
[3]: /ko/feature_flags/client/javascript/#supply-initial-precomputed-fallback-data
[4]: /ko/feature_flags/implementation_patterns/browser_rules_based_evaluation/