---
aliases:
- /ja/real_user_monitoring/guide/remote-config-launchdarkly/
beta: false
description: Learn how to set up RUM with LaunchDarkly to remotely configure RUM sampling.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualize your RUM data in the RUM Explorer
private: true
title: Remotely configure RUM using LaunchDarkly
---

## 概要
[RUM アプリケーション][1]をインスツルメントする場合、より忠実なデータが必要な進行中のインシデントなどの即時のニーズに基づいて、RUM 初期化構成をリモートで制御することができます。

RUM の初期化構成の変更をデプロイする必要がない代わりに、機能フラグを使用することができます。[LaunchDarkly][2] のような機能フラグ管理会社は、サーバー側で機能フラグを評価するため、コードを再デプロイする必要なく、変更を加えることができます。

## LaunchDarkly でフラグを設定する
LaunchDarkly でフラグを設定するには、まず [SDK の設定][3]のドキュメントに従うことから始めてください。その他の詳細については、LaunchDarkly の[クライアントサイド SDK のドキュメント][4]を参照してください。

LaunchDarkly は多変量フラグをサポートしており、返すバリエーションの数や種類をカスタマイズすることができます。多変量フラグの種類は以下の通りです。

- **文字列フラグ**: 単純な構成値、あるいはコンテンツを渡すためによく使われます。
- **数字フラグ**: 単純な数値の構成値を渡すためによく使われます。
- **JSON フラグ**: 複雑な構成オブジェクトや、構造化されたコンテンツを渡すために使用することができます。

### 機能フラグオプション

このガイドでは、機能フラグを設定して、リモートで RUM の構成を変更する 2 つの方法を説明します。

1. 構成したい**個々のパラメーター**に対応する機能フラグを作成します。
2. **RUM 構成全体**の機能フラグを作成します。

**ヒント**: 最初のオプションを使用して、各パラメーターに個別のフラグを作成すると、RUM 構成をよりきめ細かく制御することができます。RUM 構成全体に対して機能フラグを作成すると、多くの異なるバリエーションが発生し、追跡が難しくなり、開発者がバリエーション間の特定の違いを判断するためのオーバーヘッドが発生する可能性があります。

### 個々のパラメーターオプション

以下の例では、RUM 構成の個々のパラメーターである `sessionSampleRate` に対する機能フラグを作成しています。

1. LaunchDarkly で新しい機能フラグを作成し、名前とキーを指定します。

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-sample-rate-new-flag.png" alt="LaunchDarkly で RUM サンプルレートのフラグを新規作成する" style="width:75%;">}}

2. フラグのバリエーションを指定します。`sessionSampleRate` パラメーターには、数値の値を渡したいので、フラグタイプを Number にし、バリエーションフィールドに値として必要な Sample Rates を追加してください。

   **注:** 必要であれば、複数の異なるフラグのバリエーションを作成することができます。今、必要と思われるすべてのサンプルレートを追加する必要はありません。後でいつでも新しい値のバリエーションを追加することができます。

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-sample-rate-flag-setup.png" alt="LaunchDarkly のサンプルレートのバリアント追加" style="width:75%;">}}

3. デフォルトのルールを設定します。以下の例では、機能フラグがオフのときは "Default Sample Rate"、オンのときは "High Fidelity Sample Rate" が設定されています。

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-flag-targeting-rules.png" alt="LaunchDarkly でデフォルトのルールを設定する" style="width:75%;">}}

### RUM 全体構成オプション

この例では、RUM 構成オブジェクト全体に対する機能フラグが作成されます。

1. LaunchDarkly で新しい機能フラグを作成し、名前とキーを指定します。

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-configuration-new-flag.png" alt="LaunchDarkly で RUM 構成のフラグを新規作成する" style="width:75%;">}}

2. フラグのバリエーションを修正します。[RUM の構成][5]は、Object を渡したいので、フラグタイプを JSON にして、好きな構成を値として追加し、後でコード内で JSON を Object に変更します。

   **注: **必要であれば、複数の異なるフラグのバリエーションを作成することができます。必要と思われるすべての構成を追加する必要はありません。いつでも好きなときに新しい値のバリエーションを追加することができます。

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-configuration-flag-setup.png" alt="LaunchDarkly で RUM 構成にバリアントを追加する" style="width:75%;">}}

3. デフォルトのルールを設定します。機能フラグがオフのときは "Default Configuration"、オンのときは "High Fidelity Configuration" が設定されています。

## RUM 構成に機能フラグを追加する
[上記][7]のように LaunchDarkly をセットアップし、依存関係をインストールし、[LaunchDarkly クライアントを初期化][8]したら、Datadog のコードに機能フラグ評価を追加することが可能です。LaunchDarkly でのフラグ評価については、[こちら][9]を参照してください。

### 個々のパラメーターオプション

個々のパラメーターについて RUM SDK を初期化する前に、まず LaunchDarkly の機能フラグを評価する必要があります。

この例では、以下のコードスニペットのように JS で評価を追加することができます。

```javascript
const RUM_sample_rate = client.variation('rum-sample-rate-configuration', false);
```
そして、これを RUM の初期設定に追加します。

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

### RUM 全体構成オプション

RUM SDK を初期化する前に、まず、LaunchDarkly の機能フラグを評価する必要があります。例えば、JS ではこのような評価を追加します。

```javascript
const RUM_configuration = client.variation('rum-configuration', false);
```

しかし、RUM を初期化するための構成を渡す前に、フラグの JSON 値から Object を作成する必要があります。これを行うと、RUM SDK を初期化することができます。

```javascript
datadogRum.init(RUM_configuration_object)
```

## LaunchDarkly のコントロールを埋め込んで、ダッシュボードで直接 RUM を構成する
If you want to change your RUM configuration directly in your Datadog application, you can embed the LaunchDarkly UI into Datadog and switch your feature flag on/off. The feature flags are set up so you can keep them off, with the default values. When you want to have higher fidelity data, you can turn on your feature flag and the values you set for the ON variation are used for the RUM initialization.

LaunchDarkly's Datadog App integration embeds the feature flag management UI as a dashboard widget. You can use this widget to toggle feature flags without ever leaving Datadog. You can embed the LaunchDarkly widget within a new or existing dashboard that displays key metrics. If there is an incident or spike in errors, you can toggle the feature flag for your RUM configuration from within Datadog to begin sampling more data and ensuring your teams have access to the information they need to address and resolve your issue.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/datadog-launchdarkly-ui-widget.png" alt="Datadog と LaunchDarkly の UI インテグレーションウィジェット" style="width:100%;">}}

If you need to change the values that you originally set for your configuration, you can update your flag within LaunchDarkly at any time. After you save your changes, all new flag evaluations have your updated values.

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser#setup
[2]: https://launchdarkly.com/
[3]: https://docs.launchdarkly.com/home/getting-started/setting-up
[4]: https://docs.launchdarkly.com/sdk/client-side
[5]: /ja/real_user_monitoring/browser#setup
[6]: https://docs.launchdarkly.com/sdk/features/evaluating
[7]: #setting-up-your-flag-in-launchdarkly
[8]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
[9]: https://docs.launchdarkly.com/sdk/features/evaluating