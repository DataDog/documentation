---
description: Angular アプリケーション用に Datadog Feature Flags を設定します。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: https://openfeature.dev/docs/reference/sdks/client/web/angular/
  tag: OpenFeature
  text: OpenFeature Angular SDK
- link: /real_user_monitoring/application_monitoring/browser/
  tag: ドキュメント
  text: ブラウザのモニタリング
title: Angular Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して Angular アプリケーションに機能フラグを組み込む方法について説明します。Datadog Feature Flags は、アプリ内の機能の可用性をリモートで制御し、安全に実験を行い、自信を持って新しいエクスペリエンスを提供するための統一された方法を提供します。

Angular 用 Datadog Feature Flags SDK は、Feature Flag 管理のオープン標準である [OpenFeature][1] 上に構築されています。このガイドでは、SDK のインストール方法、Datadog プロバイダーの構成方法、および構造ディレクティブや FeatureFlagService を使用して Angular コンポーネントでフラグを評価する方法について説明します。

## 要件 {#requirements}

* **Angular** バージョン 16 以降
* **ECMAScript 2015 互換の Web ブラウザ** (Chrome、Edge、Firefox など)

## インストール {#installation}

お好みのパッケージマネージャーを使用して、Datadog OpenFeature プロバイダーと OpenFeature Angular SDK をインストールします。

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

## プロバイダーを初期化する {#initialize-the-provider}

Datadog の資格情報を使用して `DatadogProvider` インスタンスを作成します。ライブ Browser Feature Flags の構成には、`applicationId`、`clientToken`、`site`、および `env` が必要です。クライアントトークンの作成については、[クライアントトークン][2] を参照してください。

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags は、選択された <a href="/getting_started/site">Datadog サイト</a> ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>{{< /site-region >}}

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

## モジュールを構成する {#configure-the-module}

Angular モジュールに `OpenFeatureModule` をインポートし、`forRoot` メソッドを使用して構成します。これにより、アプリケーション全体で Feature Flags が利用可能になります。

## 評価コンテキストを設定する {#set-the-evaluation-context}

評価コンテキストを使用して、フラグの評価が誰または何に適用されるかを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用されるユーザー情報やセッション情報が含まれます。これらの属性をターゲティングルールで参照して、各バリアントを表示する対象を制御します。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

<div class="alert alert-info"> <code>targetingKey</code> は、パーセンテージベースのターゲティングにおけるランダム化の対象として使用されます。フラグが対象のパーセンテージ (例: 50%) をターゲットにする場合、 <code>targetingKey</code> がどの「バケット」に分類されるかを決定します。同じ <code>targetingKey</code> のユーザーは、特定のフラグに対して常に同じバリアントを受け取ります。</div>

### 静的オブジェクトを使用する {#using-a-static-object}

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

### ファクトリ関数を使用する {#using-a-factory-function}

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

### 評価コンテキストを更新する {#update-the-evaluation-context}

初期化後に評価コンテキストを更新するには (ユーザーがログインするときなど)、`OpenFeature.setContext()` を使用します。

{{< code-block lang="typescript" >}}
import { OpenFeature } from '@openfeature/angular-sdk';

await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## フラグを評価する {#evaluate-flags}

OpenFeature Angular SDK には、Feature Flags を操作するための主な方法が 2 つあります。

1. **構造ディレクティブ** - テンプレートベースの条件付きレンダリング用
2. **FeatureFlagService** - **Observables** または **Signals** を使用したプログラムによるアクセス用

### ブールフラグ {#boolean-flags}

オン/オフまたは真/偽の条件には、ブールフラグを使用します。

{{< tabs >}}
{{% tab "構造ディレクティブ" %}}
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

{{% tab "Signals" %}}
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

### 文字列フラグ {#string-flags}

文字列フラグを使用して、複数のバリアントや構成文字列から選択します。

{{< tabs >}}
{{% tab "構造ディレクティブ" %}}
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

{{% tab "Signals" %}}
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

### 数値フラグ {#number-flags}

制限、パーセンテージ、乗数などの数値には、数値フラグを使用します。

{{< tabs >}}
{{% tab "構造ディレクティブ" %}}
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

{{% tab "Signals" %}}
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

### オブジェクトフラグ {#object-flags}

構造化された構成データには、オブジェクトフラグを使用します。

{{< tabs >}}
{{% tab "構造ディレクティブ" %}}
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

{{% tab "Signals" %}}
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

### その他のオプション {#additional-options}

#### 自動再レンダリングを無効にする {#disable-automatic-re-rendering}

デフォルトでは、フラグ値が変更されるかコンテキストが変更されると、ディレクティブは再レンダリングされます。この動作を無効にできます。

{{< code-block lang="html" >}}
<div
  *booleanFeatureFlag="'isFeatureEnabled'; default: true; updateOnContextChanged: false; updateOnConfigurationChanged: false;"
>
  This is shown when the feature flag is enabled.
</div>
{{< /code-block >}}

サービスメソッドも自動更新を制御するためのオプションを受け入れます。

{{< code-block lang="typescript" >}}
const flag$ = this.flagService.getBooleanDetails('my-flag', false, 'my-domain', {
  updateOnConfigurationChanged: false, // default: true
  updateOnContextChanged: false, // default: true
});
{{< /code-block >}}

#### 評価の詳細を使用する {#consume-evaluation-details}

テンプレート内で評価の詳細にアクセスできます。

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

期待されるフラグ値が省略された場合、テンプレートは常にレンダリングされます。これは、条件付きレンダリングを行わずにフラグ値や詳細のみをレンダリングする場合に使用できます。

{{< code-block lang="html" >}}
<div *stringFeatureFlag="'themeColor'; default: 'light'; let value;">
  The theme color is {{ value }}.
</div>
{{< /code-block >}}

サービスを使用する場合、detail メソッドは評価された値と、その評価を説明するメタデータの両方を返します。

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

## ブラウザプロバイダーオプションを構成する {#configure-browser-provider-options}

Angular プロバイダーは Datadog ブラウザプロバイダーを使用しており、これらのオプション設定もサポートしています。

| オプション | デフォルト | 使用 |
| --- | --- | --- |
| `enableExposureLogging` | `true` | エクスポージャーイベントをエクスポージャーインテークに送信します。|
| `enableFlagEvaluationTracking` | `true` | 集計された評価テレメトリを送信します。|
| `enableRumFeatureFlagTracking` | `true` | Browser RUM が利用可能な場合、RUM イベントにフラグ評価を追加します。このオプションを有効にすると、RUM 課金対象のイベント数が増加する可能性があります。|
| `flagEvaluationTrackingInterval` | `10000` ms | 評価テレメトリのフラッシュ間隔。|
| `initialFlagsConfiguration` | unset | 取得に失敗した場合のフォールバックとして、コンテキストに一致する事前計算済みデータを提供します。[初期事前計算済みフォールバックデータ][3]を参照してください。|
| `flaggingProxy` | 未設定 | プロキシ経由でフラグを取得し、`site` の代わりに使用します。|
| `customHeaders` | 未設定 | フラグ取得リクエストにヘッダーを追加します。|
| `overwriteRequestHeaders` | `false` | デフォルトのリクエストヘッダーを `customHeaders` に置き換えます。|

`DatadogProvider` は、Angular アプリケーションに推奨されるブラウザプロバイダーです。アプリケーションが所有する構成の配信や、コンテキストの変更全体にわたるローカルルールの評価については、[ブラウザのルールベース評価][4]を参照してください。この高度な設定では、明示的な構成の更新と追跡ライフサイクルの管理が必要です。

## テスト {#testing}

実際の `DatadogProvider` を使用して専用の Datadog テスト環境に対してテストを行うか、OpenFeature の `TypedInMemoryProvider` に置き換えてテストコード内で Feature Flags の値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。`TypedInMemoryProvider` は、Angular Feature Flags 用にすでにインストールされている `@openfeature/web-sdk` からエクスポートされます。

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

Web SDK のフラグ形状には、`variants`、`defaultVariant`、および `disabled` が必要です。フラグを読み取るサービスを注入したり、フラグを読み取るコンポーネントをレンダリングしたりする前に、インメモリプロバイダーを登録します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/sdks/client/web/angular/
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: /ja/feature_flags/client/javascript/#supply-initial-precomputed-fallback-data
[4]: /ja/feature_flags/implementation_patterns/browser_rules_based_evaluation/