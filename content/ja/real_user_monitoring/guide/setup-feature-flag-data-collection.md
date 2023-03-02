---
aliases:
- /ja/real_user_monitoring/guide/getting-started-feature-flags/
beta: true
description: RUM をセットアップして機能フラグデータをキャプチャし、Datadog でパフォーマンスを分析する方法をご紹介します。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーで RUM データを視覚化する
kind: ガイド
title: RUM の機能フラグデータの概要
---

{{< callout url="#" btn_hidden="true" >}}
RUM の機能フラグデータ収集は非公開ベータ版です。アクセスをリクエストするには、サポート (support@datadoghq.com) までご連絡ください。
{{< /callout >}}

## 概要
機能フラグデータにより、どのユーザーに特定の機能が表示されているか、導入した変更がユーザー体験に影響を与えているか、パフォーマンスに悪影響を与えているかを判断できるため、ユーザー体験やパフォーマンス監視の可視性が高まります。

RUM データを機能フラグデータでリッチ化することにより、意図せずにバグやパフォーマンスの低下を引き起こすことなく、その機能が正常に起動することを確信することができます。この追加的な洞察により、機能のリリースとパフォーマンスを関連付け、問題を特定のリリースにピンポイントで特定し、より迅速にトラブルシューティングを行うことができます。

## セットアップ
機能フラグの追跡は、RUM ブラウザ SDK で利用可能です。開始するには、[RUM ブラウザモニタリング][1]をセットアップします。ブラウザ RUM SDK バージョン >= 4.25.0 が必要です。

機能フラグデータの収集は、[カスタム機能フラグ管理ソリューション](#custom-feature-flag-management)、またはインテグレーションパートナーのいずれかを使用して開始することができます。

現在、以下とのインテグレーションをサポートしています。
- [LaunchDarkly](#launchdarkly-integration)
- [Split](#split-integration)
- [Flagsmith](#flagsmith-integration)

### カスタム機能フラグ管理

{{< tabs >}}
{{% tab "npm" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   // Initialize Datadog Browser SDK
   datadogRum.init({
     ...
     enableExperimentalFeatures: ["feature_flags"],
     ...
   });
   ```

2. 機能フラグが評価されるたびに、以下の関数を追加して、機能フラグの情報を RUM に送信します

   ```javascript
   datadogRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "CDN async" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```html
   <script>
     (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
     })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
     DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
     })
   </script>
   ```

2. 機能フラグが評価されるたびに、以下の関数を追加して、機能フラグの情報を RUM に送信します。

   ```javascript
   datadogRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "CDN sync" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```html
   <script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
   <script>
     window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   </script>
   ```

2. 機能フラグが評価されるたびに、以下の関数を追加して、機能フラグの情報を RUM に送信します。

   ```javascript
   datadogRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### LaunchDarkly インテグレーション

{{< tabs >}}
{{% tab "npm" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   // Initialize Datadog Browser SDK
   datadogRum.init({
     ...
     enableExperimentalFeatures: ["feature_flags"],
     ...
   });
   ```

2. LaunchDarkly の SDK を初期化し、以下に示すコードのスニペットを使用して、Datadog へのインスペクターレポート機能フラグ評価を作成します。

   LaunchDarkly の SDK の初期化については、[LaunchDarkly の JavaScript SDK ドキュメント][1]をご確認ください。

   ```javascript
   const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
     inspectors: [
       {
         type: "flag-used",
         name: "dd-inspector",
         method: (key: string, detail: LDClient.LDEvaluationDetail) => {
           datadogRum.addFeatureFlagEvaluation(key, detail.value);
         },
       },
     ],
   });
   ```


[1]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
{{% /tab %}}
{{% tab "CDN async" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```html
   <script>
     (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
     })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
     DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
     })
   </script>
   ```

2. LaunchDarkly の SDK を初期化し、以下に示すコードのスニペットを使用して、Datadog へのインスペクターレポート機能フラグ評価を作成します。

   LaunchDarkly の SDK の初期化については、[LaunchDarkly の JavaScript SDK ドキュメント][1]をご確認ください。

   ```javascript
   const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
     inspectors: [
       {
         type: "flag-used",
         name: "dd-inspector",
         method: (key: string, detail: LDClient.LDEvaluationDetail) => {
           datadogRum.addFeatureFlagEvaluation(key, detail.value);
         },
       },
     ],
   });
   ```


[1]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
{{% /tab %}}
{{% tab "CDN sync" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```html
   <script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
   <script>
     window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   </script>
   ```

2. LaunchDarkly の SDK を初期化し、以下に示すコードのスニペットを使用して、Datadog へのインスペクターレポート機能フラグ評価を作成します。

   LaunchDarkly の SDK の初期化については、[LaunchDarkly の JavaScript SDK ドキュメント][1]をご確認ください。

   ```javascript
   const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
     inspectors: [
       {
         type: "flag-used",
         name: "dd-inspector",
         method: (key: string, detail: LDClient.LDEvaluationDetail) => {
           datadogRum.addFeatureFlagEvaluation(key, detail.value);
         },
       },
     ],
   });
   ```


[1]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
{{% /tab %}}
{{< /tabs >}}


### Split インテグレーション

{{< tabs >}}
{{% tab "npm" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   // Initialize Datadog Browser SDK
   datadogRum.init({
     ...
     enableExperimentalFeatures: ["feature_flags"],
     ...
   });
   ```

2. Split の SDK を初期化し、次のコードのスニペットを使用して Datadog に機能フラグの評価を報告するインプレッションリスナーを作成します

   Split の SDK の初期化については、[Split の JavaScript SDK ドキュメント][1]をご確認ください。

   ```javascript
   const factory = SplitFactory({
       core: {
         authorizationKey: "<APP_KEY>",
         key: "<USER_ID>",
       },
       impressionListener: {
         logImpression(impressionData) {              
             datadogRum
                 .addFeatureFlagEvaluation(
                      impressionData.impression.feature,
                      impressionData.impression.treatment
                 );
        },
     },
   });

   const client = factory.client();
   ```


[1]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{% tab "CDN async" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```html
   <script>
     (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
     })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
     DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
     })
   </script>
   ```

2. Split の SDK を初期化し、以下に示すコードのスニペットを使用して、Datadog へのインスペクターレポート機能フラグ評価を作成します。

   Split の SDK の初期化については、[Split の JavaScript SDK ドキュメント][1]をご確認ください。

   ```javascript
   const factory = SplitFactory({
       core: {
         authorizationKey: "<APP_KEY>",
         key: "<USER_ID>",
       },
       impressionListener: {
         logImpression(impressionData) {              
             datadogRum
                 .addFeatureFlagEvaluation(
                      impressionData.impression.feature,
                      impressionData.impression.treatment
                 );
        },
     },
   });

   const client = factory.client();
   ```


[1]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{% tab "CDN sync" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```html
   <script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
   <script>
     window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   </script>
   ```

2. Split の SDK を初期化し、以下に示すコードのスニペットを使用して、Datadog へのインスペクターレポート機能フラグ評価を作成します。

   Split の SDK の初期化については、[Split の JavaScript SDK ドキュメント][1]をご確認ください。

   ```javascript
   const factory = SplitFactory({
       core: {
         authorizationKey: "<APP_KEY>",
         key: "<USER_ID>",
       },
       impressionListener: {
         logImpression(impressionData) {              
             datadogRum
                 .addFeatureFlagEvaluation(
                      impressionData.impression.feature,
                      impressionData.impression.treatment
                 );
        },
     },
   });

   const client = factory.client();
   ```


[1]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{< /tabs >}}


### Flagsmith インテグレーション

{{< tabs >}}
{{% tab "npm" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   // Initialize Datadog Browser SDK
   datadogRum.init({
     ...
     enableExperimentalFeatures: ["feature_flags"],
     ...
   });
   ```

2. Flagsmith の SDK に `datadogRum` オプションを付けて初期化すると、以下に示すコードのスニペットを使用して Datadog に機能フラグの評価を報告することができるようになります。

   オプションとして、`datadogRum.setUser()` を介して Flagsmith の特徴が Datadog に送信されるようにクライアントを構成することができます。Flagsmith の SDK の初期化についての詳細は、[Flagsmith の JavaScript SDK ドキュメント][1]を参照してください。

   ```javascript
    // Initialize the Flagsmith SDK
    flagsmith.init({
        datadogRum: {
            client: datadogRum,
            trackTraits: true,
        },
        ...
    })
   ```


[1]: https://docs.flagsmith.com/clients/javascript
{{% /tab %}}
{{% tab "CDN async" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```html
   <script>
     (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
     })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
     DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
     })
   </script>
   ```

2. Flagsmith の SDK に `datadogRum` オプションを付けて初期化すると、以下に示すコードのスニペットを使用して Datadog に機能フラグの評価を報告することができるようになります。

   オプションとして、`datadogRum.setUser()` を介して Flagsmith の特徴が Datadog に送信されるようにクライアントを構成することができます。Flagsmith の SDK の初期化についての詳細は、[Flagsmith の JavaScript SDK ドキュメント][1]を参照してください。

   ```javascript
    // Initialize the Flagsmith SDK
    flagsmith.init({
        datadogRum: {
            client: datadogRum,
            trackTraits: true,
        },
        ...
    })
   ```


[1]: https://docs.flagsmith.com/clients/javascript
{{% /tab %}}
{{% tab "CDN sync" %}}

1. 機能フラグデータの収集を開始するには、RUM SDK を初期化し、` ["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。

   ```html
   <script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
   <script>
     window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   </script>
   ```

2. Flagsmith の SDK に `datadogRum` オプションを付けて初期化すると、以下に示すコードのスニペットを使用して Datadog に機能フラグの評価を報告することができるようになります。

   オプションとして、`datadogRum.setUser()` を介して Flagsmith の特徴が Datadog に送信されるようにクライアントを構成することができます。Flagsmith の SDK の初期化についての詳細は、[Flagsmith の JavaScript SDK ドキュメント][1]を参照してください。

   ```javascript
    // Initialize the Flagsmith SDK
    flagsmith.init({
        datadogRum: {
            client: datadogRum,
            trackTraits: true,
        },
        ...
    })
   ```


[1]: https://docs.flagsmith.com/clients/javascript
{{% /tab %}}
{{< /tabs >}}

## RUM で機能フラグのパフォーマンスを分析する

機能フラグは、RUM のセッション、ビュー、およびエラーのコンテキストにリストとして表示されます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="RUM エクスプローラーの属性の機能フラグリスト" style="width:75%;">}}

### RUM エクスプローラーを使用した機能フラグの検索
[RUM エクスプローラー][2]で RUM が収集したすべてのデータを検索し、機能フラグの傾向を把握したり、より大きな文脈でパターンを分析したり、[ダッシュボード][3]や[モニター][4]にエクスポートしたりすることが可能です。RUM エクスプローラーでは、`@feature_flags.{flag_name}` 属性でセッション、ビュー、またはエラーを検索することができます。

#### セッション
**Sessions** を `@feature_flags.{flag_name}` 属性でフィルタリングすると、指定した時間枠で機能フラグが評価されたすべてのセッションを見つけることができます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="RUM エクスプローラーでの機能フラグのセッション検索" style="width:75%;">}}

#### ビュー
**Views** を `@feature_flags.{flag_name}` 属性でフィルタリングすると、指定した時間枠で機能フラグが評価された特定のビューを見つけることができます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="RUM エクスプローラーでの機能フラグのビュー検索" style="width:75%;">}}

#### エラー
**Errors** を `@feature_flags.{flag_name}` 属性でフィルタリングすると、指定した時間枠で機能フラグが評価されたビューで発生したすべてのエラーを見つけることができます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="RUM エクスプローラーでの機能フラグのエラー検索" style="width:75%;">}}

### 機能フラグのデータが期待通りに反映されないのはなぜですか？
機能フラグは、それが評価されるイベントのコンテキストに表示されます。つまり、機能フラグのコードロジックが実行されるビューに表示されるはずです。

コードの構成や機能フラグの設定によっては、予期せぬ機能フラグがイベントのコンテキストに表示されることがあります。

例えば、機能フラグがどの**ビュー**で評価されているかを確認するには、RUM エクスプローラーを使用して同様のクエリを行うことができます。


{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="RUM エクスプローラーでの機能フラグのビュー検索" style="width:75%;">}}


機能フラグが無関係なビューで評価されている理由の例をいくつか紹介しますので、調査の参考にしてください。

- 実行されるたびに機能フラグを評価する、複数のページに表示される共通のリアクトコンポーネント。
- 機能フラグを評価したコンポーネントが、URL の変更前/変更後にレンダリングされるルーティングの問題。

調査を行う際、機能フラグに関連する `View Name` のデータをスコープすることも可能です。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser#setup
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ja/dashboards/
[4]: /ja/monitors/#create-monitors