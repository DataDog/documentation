---
description: ブラウザ、iOS、および Android アプリケーション向けにRUM SDK の設定をリモートで構成します。
further_reading:
- link: /real_user_monitoring/
  tag: ドキュメント
  text: Real User Monitoring
title: RUM Remote Configuration
---
## 概要 {#overview}

アプリケーションの進化に伴い、RUM SDK が収集するデータやその収集頻度を調整する必要が生じる場合があります。RUM Remote Configuration を使用すると、アプリケーションの新しいバージョンをデプロイすることなく、サポートされているブラウザ、iOS、および Android SDK の設定を Datadog から更新できます。

{{< img src="/real_user_monitoring/remote_configuration/rum_remote_configuration_menu.png" alt="SDK 構成ページには、Remote Configuration で利用可能なブラウザ RUM の設定が一覧表示されています。" >}}

## 前提条件 {#prerequisites}

[Remote Configuration][2] は組織で有効にする必要があり、以下の RUM SDK バージョンが必要です。

- ブラウザ SDK バージョン 7.13.0 以降
- iOS SDK バージョン 3.17.0 以降
- Android SDK バージョン 3.14.1 以降

<div class="alert alert-danger">ネットワークやプロキシで許可リストを使用している場合は、ご使用のアプリケーションに対して <code>*.browser-intake-&lt;DC_REGION&gt;-datadoghq.com</code> を追加してください。このエントリは、RUM データの取り込みと SDK の Remote Configuration リクエストの両方に対応しています。これらは、 <code>sdk-configuration.</code> サブドメインを使用します。ブラウザアプリケーションの場合は、このドメインをコンテンツセキュリティポリシーにも追加してください。
<br><br>このドメインがブロックされている場合、SDK はリモート設定を取得できず、代わりにローカル構成を使用し続けます。その際、エラーが表示されることはありません。</div>

## 仕組み {#how-it-works}

各 RUM アプリケーションには、SDK がリモート設定を取得するために使用する Remote Configuration ID があります。

SDK の初期化時に、アプリケーションはキャッシュされたリモート設定を適用します。キャッシュされた設定がない場合は、アプリケーションで定義された設定が使用されます。SDK はバックグラウンドで更新をチェックし、変更を次回の初期化のために保存します。チェックに失敗した場合、SDK は既存のキャッシュを保持するか、ローカル設定の使用を継続します。このチェックによって、SDK の初期化が遅延したり、RUM イベントの収集が中断したりすることはありません。

<div class="alert alert-danger">公開されたリモート設定は、アプリケーション内の対応する設定を上書きします。リモートで有効にしていない設定では、引き続きローカルの値が使用されます。Datadog から管理する設定のみを有効にしてください。</div>

Remote Configuration は、その ID で初期化されたすべてのユーザーとセッションに適用されます。個々のユーザーやセッションを対象にすることはできません。ID を変更した場合、SDK はそれを新しい構成として扱い、以前の ID でキャッシュされた設定は使用しません。

<div class="alert alert-warning">SDK は、パブリック CDN (コンテンツ配信ネットワーク) エンドポイントから Remote Configuration の設定を取得します。構成値には機密情報や個人情報を含めないでください。</div>

## 権限{#permissions}

Remote Configuration は、RUM アプリケーションと同じ権限を使用します。構成を有効化、編集、または公開するには、`RUM Apps Write` 権限が必要です。詳細については、[Real User Monitoring 権限][1]を参照してください。

## セットアップ{#setup}

アプリケーションのリモート設定を構成するには、次のようにします。

1. サポートされている RUM SDK を新しいアプリケーションにインストールするか、既存のアプリケーションの SDK を更新します。
2. [{{< ui >}}RUM{{< /ui >}}] > [{{< ui >}}Manage Applications{{< /ui >}}] (アプリケーション) に移動し、アプリケーションを選択して、[{{< ui >}}SDK Configuration{{< /ui >}}] (SDK 構成) をクリックします。
3. Remote Configuration を有効にして、Remote Configuration ID を生成します。
   **注**：Datadog は構成をドラフトとして保存するため、公開するまでその値が既存の SDK 設定を上書きすることはありません。
4. Remote Configuration ID を SDK の初期化に追加します。

   {{< tabs >}}
   {{% tab "ブラウザ" %}}

   `remoteConfiguration`既存の `datadogRum.init()` 呼び出しにオブジェクトを追加します。

   ```javascript
   remoteConfiguration: {
       id: '<REMOTE_CONFIGURATION_ID>',
   },
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}

   `remoteConfiguration` を `Datadog.Configuration` に追加します。

   ```swift
   remoteConfiguration: .init(id: "<REMOTE_CONFIGURATION_ID>")
   ```

   {{% /tab %}}
   {{% tab "Android" %}}

   `Configuration.Builder` で `setRemoteConfigurationId()` を呼び出します。

   ```kotlin
   .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
   ```

   {{% /tab %}}
   {{< /tabs >}}
 
5. 「[Remote Configuration で SDK 設定を変更する](#change-sdk-settings-with-remote-configuration)」セクションの説明に従って設定を更新します。
6. 構成を公開して、有効な設定を適用します。

## Remote Configuration で SDK 設定を変更する {#change-sdk-settings-with-remote-configuration}

Remote Configuration は、デフォルトでは SDK 設定を上書きしません。設定をリモートで管理するには、Datadog でその上書きを明示的に有効にしてから、値を構成します。上書きが有効になっていない設定では、引き続き SDK で構成された値が使用されます。

1. リモートで管理する設定の上書きを有効にします。「[構成可能な設定](#configurable-settings)」セクションに記載されている、ご使用のプラットフォームの設定から選択します。

   <div class="alert alert-danger">一部の設定では、iOS および Android SDK で対応するモジュールがインポートされている必要があります。アプリケーションでこれらのモジュールをインポートしていない場合、Remote Configuration は、Session Replay、分散型トレーシング、またはプロファイリングに対して機能しません。</div>

2. 状態を選択するか、サンプリングレートを変更するか、データを追加して設定を構成します。
3. 変更を保存します。

## 構成可能な設定 {#configurable-settings}

{{< tabs >}}
{{% tab "ブラウザ" %}}

**サンプリングレート**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Session Replay sample rate (Session Replay のサンプリングレート) | `rum.sessionReplaySampleRate` |
| Trace sample rate (トレースのサンプリングレート) | `rum.traceSampleRate` |
| Profiling sample rate (プロファイリングのサンプリングレート) | `profiling.sampleRate` |

**プライバシー**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Default privacy level (デフォルトのプライバシーレベル) | `rum.defaultPrivacyLevel` |
| Privacy for action names (アクション名のプライバシー) | `rum.enablePrivacyForActionName` |

**イベント追跡**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Track anonymous users (匿名ユーザーの追跡) | `rum.trackAnonymousUser` |
| Track user interactions (ユーザーインタラクションの追跡) | `rum.trackUserInteractions` |
| Track resources (リソースの追跡) | `rum.trackResources` |
| Track long tasks (長時間タスクの追跡) | `rum.trackLongTasks` |
| Track sessions across subdomains (サブドメイン間でのセッション追跡) | `rum.trackSessionAcrossSubdomains` |

**アプリ属性**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Action name attribute (アクション名属性) | `rum.actionNameAttribute` |
| Trace context injection (トレースコンテキストの注入) | `rum.traceContextInjection` |
| Allowed tracing URLs (許可されたトレース URL) | `rum.allowedTracingUrls` |
| Allowed tracking origins (許可された追跡オリジン) | `rum.allowedTrackingOrigins` |

{{% /tab %}}
{{% tab "iOS" %}}

**サンプリングレート**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Session Replay sample rate | `sessionReplay.sampleRate` |
| Continuous profiling sample rate (継続的プロファイリングのサンプリングレート) | `profiling.continuousSampleRate` |
| App launch profiling sample rate (アプリ起動プロファイリングのサンプリングレート) | `profiling.applicationLaunchSampleRate` |
| Trace sample rate | `trace.sampleRate` |

**プライバシー**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Text and input privacy (テキストと入力のプライバシー) | `sessionReplay.textAndInputPrivacy` |
| Image privacy (画像のプライバシー) | `sessionReplay.imagePrivacy` |
| Touch privacy (タッチのプライバシー) | `sessionReplay.touchPrivacy` |

**イベント追跡**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Track anonymous users | `rum.trackAnonymousUser` |
| Track user interactions | `rum.trackUserInteractions` |
| Track resources | `rum.trackResources` |
| Track background events (バックグラウンドイベントの追跡) | `rum.trackBackgroundEvents` |
| Track frustration signals (フラストレーションシグナルの追跡) | `rum.trackFrustrations` |
| Track long tasks | `rum.longTask.enabled` |
| Long task threshold (長時間タスクのしきい値) | `rum.longTask.threshold` |
| Vitals update frequency (バイタル更新頻度) | `rum.vitalsUpdateFrequency` |
| Track slow frames (低速フレームの追跡) | `rum.trackSlowFrames` |
| Track app hangs (アプリハングの追跡) | `rum.appHang.enabled` |
| App hang threshold (アプリハングのしきい値) | `rum.appHang.threshold` |
| Track watchdog terminations (Watchdog 終了の追跡) | `rum.trackWatchdogTerminations` |
| Track memory warnings (メモリ警告の追跡) | `rum.trackMemoryWarnings` |

**アプリ属性**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Trace context injection | `trace.traceContextInjection` |
| Allowed tracing URLs | `trace.tracedHosts` |

{{% /tab %}}
{{% tab "Android" %}}

**サンプリングレート**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Profiling sample rate | `rum.profilingSampleRate` |
| Session Replay sample rate | `sessionReplay.sampleRate` |
| Continuous profiling sample rate | `profiling.continuousSampleRate` |
| App launch profiling sample rate | `profiling.applicationLaunchSampleRate` |
| Trace sample rate | `trace.sampleRate` |

**プライバシー**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Text and input privacy | `sessionReplay.textAndInputPrivacy` |
| Image privacy | `sessionReplay.imagePrivacy` |
| Touch privacy | `sessionReplay.touchPrivacy` |

**イベント追跡**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Track anonymous users | `rum.trackAnonymousUser` |
| Track user interactions | `rum.trackUserInteractions` |
| Track background events | `rum.trackBackgroundEvents` |
| Track frustration signals | `rum.trackFrustrations` |
| Track long tasks | `rum.longTask.enabled` |
| Long task threshold | `rum.longTask.threshold` |
| Vitals update frequency | `rum.vitalsUpdateFrequency` |
| Track slow frames | `rum.trackSlowFrames` |
| Crash reporting (クラッシュレポート) | `rum.crashReportsEnabled` |
| Track non-fatal ANRs (致命的でない ANR の追跡) | `rum.trackNonFatalAnrs` |

**アプリ属性**

| UI ラベル | パラメーター名 |
|----------|----------------|
| Trace context injection | `trace.traceContextInjection` |
| Allowed tracing URLs | `trace.tracedHosts` |

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/#real-user-monitoring
[2]: /ja/remote_configuration/