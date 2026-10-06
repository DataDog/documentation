---
description: Dart および Flutter アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: /real_user_monitoring/application_monitoring/flutter/
  tag: ドキュメント
  text: Flutter モニタリング
- link: https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags
  tag: ソースコード
  text: datadog_flags ソースコード
- link: https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags_flutter
  tag: ソースコード
  text: datadog_flags_flutter ソースコード
title: Dart および Flutter の Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して Dart および Flutter アプリケーションをインスツルメントする方法について説明します。Datadog Feature Flags は、アプリ内の機能の可用性をリモートで制御し、安全に実験を行うための統一された方法を提供します。

Dart 向け Datadog Feature Flags SDK は、ネイティブ Dart パッケージです。これは、Datadog から事前計算された割り当てを取得し、型指定されたフラグ値をローカルで評価し、エクスポージャーとフラグ評価のテレメトリを Datadog に報告します。Flutter アプリケーションは、スタンドアロンの Dart パッケージを直接使用するか、`datadog_flags_flutter` をインストールして `datadog_flutter_plugin` から構成を導出し、正常な評価を RUM に追加することができます。

<div class="alert alert-info">このパッケージは Dart および Flutter 用の OpenFeature 互換 API を提供しますが、OpenFeature Dart SDK 上で構築されているわけではありません。このページの API を直接使用してください。Datadog は、Dart および Flutter 向けの OpenFeature プロバイダーベースのインテグレーションを開発中です。</div>

## インストール {#installation}

Datadog Flutter SDK をすでに使用している Flutter アプリの場合は、`datadog_flags_flutter` をインストールします。

{{< code-block lang="bash" >}}
flutter pub add datadog_flags_flutter
{{< /code-block >}}

`datadog_flags_flutter` には `datadog_flutter_plugin` 3.4.0 以降が必要です。

スタンドアロンの Dart を使用する場合は、`datadog_flags` をインストールします。

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

次に、パブリック API をインポートします。

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';
{{< /code-block >}}
{{% /tab %}}

{{% tab "Flutter 統合" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Flutter 統合セットアップ {#flutter-integrated-setup}

Flutter アプリがすでに `datadog_flutter_plugin` を初期化している場合は、このセットアップを使用します。Datadog SDK を初期化する前に、既存の `DatadogConfiguration` に `DatadogFlagsPluginConfiguration` を追加します。このプラグインは、Flutter SDK 構成から、クライアントトークン、環境、サイト、サービス、バージョン、および RUM アプリケーション ID を取得します。クライアントトークンの作成については、「[クライアントトークン][1]」を参照してください。

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Flutter Feature Flags は、選択された <a href="/getting_started/site">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>{{< /site-region >}}

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

初期化後、プラグインからフラグクライアントを取得し、現在のサブジェクトの評価コンテキストで初期化します。

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

正常な評価は、Datadog Feature Flags テレメトリパイプラインを通じて送信されます。Flutter 統合セットアップでは、バリアントを返す正常な評価も、Feature Flags 評価としてアクティブな RUM ビューに追加されます。

## スタンドアロン Dart セットアップ {#standalone-dart-setup}

`datadog_flutter_plugin` を使用していない場合、または Flutter SDK の初期化とは別に Feature Flags を管理する場合は、このセットアップを使用します。

アプリの起動時に、Datadog Feature Flags を早期に有効にします。ライブ Feature Flags の構成には、`clientToken`、`env`、および `site` が必要です。クライアントトークンの作成については、「[クライアントトークン][1]」を参照してください。

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Dart および Flutter Feature Flags は、選択された <a href="/getting_started/site">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>{{< /site-region >}}

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

`applicationId`、`service`、および `version` はオプションです。これらが存在する場合、SDK はそれらを Feature Flags テレメトリコンテキストに含めます。

Datadog 組織と一致する `DatadogFlagsSite` 値を使用してください。

## クライアントの作成と取得{#create-and-retrieve-a-client}

アプリの起動時に、共有クライアントを一度作成または取得します。

{{< code-block lang="dart" >}}
final flagsClient = DatadogFlags.instance.sharedClient();
{{< /code-block >}}

独立した評価コンテキスト用に、名前付きクライアントを複数作成することもできます。

{{< code-block lang="dart" >}}
final orgFlags = DatadogFlags.instance.sharedClient(name: 'org');
final userFlags = DatadogFlags.instance.sharedClient(name: 'user');
{{< /code-block >}}

クライアントは、それが作成された Dart isolate に対してローカルです。バックグラウンド isolate は、main isolate と `DatadogFlags` の状態や割り当てキャッシュを共有しません。バックグラウンド isolate でフラグを評価する必要がある場合は、`DatadogFlags.instance.enable()` を呼び出し、必要なクライアントを作成して、それらを個別に初期化してください。

## 評価コンテキストを設定する {#set-the-evaluation-context}

`FlagsEvaluationContext` を使用して、フラグの評価が誰または何に適用されるかを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用されるユーザー、組織、セッション、またはデバイス情報が含まれます。クライアントがコンテキストの割り当てを取得できるように、フラグを評価する前に `initialize()` を呼び出します。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

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

`targetingKey` は、パーセンテージのロールアウトのランダム化対象です。同じターゲティングキーを持つユーザーは、特定のフラグに対して常に同じバリアントを受け取ります。

`targetingKey`はオプションです。ユーザー ID や組織 ID が判明する前にコンテキストを初期化した場合、SDK は事前計算割り当てリクエストに対して空の文字列を送信します。

ログアウトしたユーザーとログインしているユーザー、または組織レベルとユーザーレベルのターゲティングなど、評価対象ごとに異なる名前付きクライアントを使用します。

{{< code-block lang="dart" >}}
await orgFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'org-123'),
);

await userFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'user-456'),
);
{{< /code-block >}}

## フラグを評価する {#evaluate-flags}

クライアントが初期化されたら、アプリ全体のフラグ値を読み取ることができます。SDK はローカルにキャッシュされた割り当てデータを使用するため、フラグの評価は_ローカルで、かつ即時_に行われます。型指定された評価中にネットワークリクエストは発生しません。

各評価メソッドには、呼び出し元が提供するデフォルト値が必要です。評価メソッドは、プロバイダーの準備状況、フラグの欠落、または型の不一致に対して例外をスローしません。SDK がデフォルト値を返す場合、評価メソッドは、評価された値、割り当てメタデータ、およびプログラムによるエラーを含む `FlagDetails<T>` 値を返します。

### ブールフラグ {#boolean-flags}

オン/オフや真/偽の条件を表すフラグには、`getBooleanDetails()` を使用します。

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

### 文字列フラグ {#string-flags}

複数のバリアントや構成文字列を選択するフラグには、`getStringDetails()` を使用します。

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

### 整数およびダブルフラグ {#integer-and-double-flags}

制限、パーセンテージ、乗数などの数値フラグには、`getIntegerDetails()` または `getDoubleDetails()` を使用します。

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

### オブジェクトフラグ {#object-flags}

JSON 互換の構造化された構成には、`getObjectDetails()` を使用します。

{{< code-block lang="dart" >}}
final config = flagsClient.getObjectDetails(
  key: 'ui.config',
  defaultValue: const {
    'color': '#00A3FF',
    'fontSize': 14,
  },
);
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

評価された値、バリアント、理由、または評価エラーが必要な場合は、詳細 API を使用します。

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

プロバイダーが使用可能な状態ではない、フラグが見つからない、または割り当て値が型指定された評価メソッドと一致しないために SDK がデフォルト値を返す場合は、`FlagDetails.error` が設定されます。Datadog が正しい詳細を返した場合、その詳細には評価値に加え、`variant` や `reason` などの割り当てメタデータが含まれます。

## 高度な構成 {#advanced-configuration}

`DatadogFlagsConfiguration` は SDK の動作を制御します。

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
: `true` (デフォルト) の場合、SDK は、ログ記録用にマークされた割り当てを持つ正常な評価のエクスポージャーイベントを記録します。エクスポージャーの追跡を無効にするには、`false` に設定します。

`trackEvaluations`
: `true` (デフォルト) の場合、SDK は集計されたフラグ評価テレメトリを記録します。評価の追跡を無効にするには、`false` に設定します。

`initializationTimeout`
: 最初の評価コンテキストが利用可能になるまで待機する最大時間。このタイムアウトは、完全な初期化操作に対して 1 つのウォールクロック予算を使用します。これには、保存された割り当ての読み込み、リクエストのエンコード、割り当ての取得、レスポンスボディの読み取り、JSON のデコード、割り当ての公開、および割り当ての保存が含まれます。これにより HTTP クライアントのタイムアウトは変更されません。

  <br>このタイムアウトは、各クライアントの最初の `initialize()` 呼び出しにのみ適用されます。最初の呼び出しは、操作が失敗した場合や置き換えられた場合でも、タイムアウトを消費します。それ以降の呼び出しには初期化タイマーはありません。デフォルトは 5 秒です。タイムアウトを無効にするには、値を `null`、ゼロ、または負の時間に設定してください。

  タイムアウトが期限切れになると、`initialize()` は `FlagsInitializationTimeoutException` をスローします。割り当て操作は継続され、遅れて正常な結果が公開される場合があります。一致する保存済みの割り当ては引き続き利用可能です。割り当てのない評価は、`FlagEvaluationError.providerNotReady` とともに呼び出し元が提供したデフォルト値を返します。

  Dart は、同期初期化作業と同じ isolate でタイムアウトタイマーを実行します。そのため、同期処理を行うと、観測される待機時間が設定されたタイムアウトよりも長くなる可能性があります。

  <div class="alert alert-info"><code>initializationTimeout</code> は <code>datadog_flags</code> および <code>datadog_flags_flutter</code> 1.1.0 以降で利用可能です。</div>

`evaluationFlushInterval`
: 集計されたフラグ評価テレメトリが Datadog に送信される間隔。許容される値は 1 ～ 60 秒です。デフォルトは 10 秒です。

`store`
: オプションの最後に確認された割り当てストレージ。SDK は、新しいネットワークリクエストが進行中であるか、利用できない場合に、一致する保存済み割り当てを使用できます。

`httpClient`、`customFlagsEndpoint`、`customExposureEndpoint`、および `customEvaluationEndpoint`
: テスト、プロキシ、またはカスタムルーティングのための高度なオーバーライド。

  <br>`enable()` が `datadogConfig` なしで呼び出された場合、SDK はライブプロバイダーを作成しません。評価は `FlagEvaluationError.providerNotReady` とともに呼び出し元が提供したデフォルト値を返します。

  Flutter 統合セットアップの場合は、これらのオプションを `DatadogFlagsPluginConfiguration` を介して渡します。

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
: `true` (デフォルト) の場合、バリアントを返す正常な評価は、Feature Flag 評価としてアクティブな RUM ビューに追加されます。アプリで RUM を使用していない場合、このオプションは無効です。

## 最後に確認された割り当てストレージ {#last-known-assignment-storage}

SDK は `initialize()` が正常に行われた後、割り当てをメモリ内に保持します。SDK インスタンスで最後に確認された割り当てを復元するには、`DatadogFlagsStore` を提供します。

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

保存された割り当ては、その評価コンテキストがアクティブなコンテキストと一致する場合にのみ使用されます。ライブでの取得に成功すると常に、クライアントが最新の割り当て状態に移行され、その状態がストアに書き込まれます。

Dart パッケージが、ディスクの場所を選択することや、Flutter 固有のディスクストアを提供することはありません。Flutter アプリは、選択したアプリストレージメカニズムを使用して `DatadogFlagsStore` を実装できます。

## シャットダウン {#shutdown}

クライアントが不要になったら、`shutdown()` を呼び出します。これにより、クライアントのメモリ内割り当てを消去する前に、保留中のエクスポージャーとフラグ評価のアップロードがクリーンアップされます。

{{< code-block lang="dart" >}}
await flagsClient.shutdown();
{{< /code-block >}}

アプリケーションが Flags SDK を破棄している場合は、`DatadogFlags.instance.disable()` を呼び出します。

{{< code-block lang="dart" >}}
await DatadogFlags.instance.disable();
{{< /code-block >}}

## 完全な例 {#complete-example}

次の例では、SDK を有効にし、評価コンテキストを使用してクライアントを初期化し、ブールフラグを評価します。

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

## テスト {#testing}

実際の `DatadogFlagsClient` を使用して専用の Datadog テスト環境に対してテストを行うか、小さなインターフェイスの背後にアプリケーションコードを分離して、ユニットテストで偽の実装を代わりに使用することができます。このセクションでは、テストを自己完結型かつオフラインで実施できる、偽の実装を使用するアプローチを紹介します。

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

次に、`TestCheckoutFlags` をユニットテストに注入し、`DatadogCheckoutFlags` を本番環境に注入します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/api-app-keys/#client-tokens