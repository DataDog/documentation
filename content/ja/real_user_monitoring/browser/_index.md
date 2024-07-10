---
aliases:
- /ja/real_user_monitoring/setup
further_reading:
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /logs/log_collection/javascript/
  tag: ドキュメント
  text: Datadog Browser SDK for Logs について
title: RUM ブラウザモニタリング
---

## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのパフォーマンスとユーザージャーニーをリアルタイムで視覚化して分析することができます。イベントを収集するには、RUM ブラウザ SDK をブラウザアプリケーションに追加し、初期化パラメーターを使用して収集するデータの種類を構成します。

ユーザーデータを安全に保つ責任は、Datadog と RUM SDK を活用する開発者の間で共有されます。[責任の共有][1]の詳細はこちらをご覧ください。

## 計画と使用

RUM ブラウザ SDK は、IE11 を含むすべてのモダンなデスクトップおよびモバイルブラウザをサポートしています。詳細については、[ブラウザサポート][2]の表を参照してください。

RUM ブラウザモニタリングを設定するには、RUM アプリケーションを作成します。

1. Datadog で、[**Digital Experience** > **Add an Application** ページ][3]に移動し、JavaScript (JS) アプリケーションタイプを選択します。
   - デフォルトでは、自動ユーザーデータ収集は有効になっています。クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のチェックボックスをオフにします。詳しくは、[RUM ブラウザデータ収集][4]をご覧ください。
   - アプリケーションの名前を入力し、**Generate Client Token** をクリックします。これにより、アプリケーションの `clientToken` と `applicationId` が生成されます。
   - RUM ブラウザ SDK のインストールタイプを選択します。[npm](#npm)、またはホストバージョン ([CDN 非同期](#cdn-async)または [CDN 同期](#cdn-sync)) のいずれかを選択します。
   - [RUM とセッションリプレイ][5]の統合サービスタグ付けを使用するために、アプリケーションの環境名とサービス名を定義します。初期化スニペットで、デプロイされたアプリケーションのバージョン番号を設定します。詳しくは、[タグ付け](#tagging)を参照してください。
   - 収集した総ユーザーセッションのサンプリングレートを設定し、スライダーで収集した総 [Browser RUM & セッションリプレイ][6]セッションのパーセンテージを設定します。Browser RUM & セッションリプレイセッションには、リソースやロングタスク、リプレイ記録が含まれます。ユーザーセッションの総量から収集される Browser RUM & セッションリプレイセッションの割合の構成については、[ブラウザおよび Browser RUM & セッションリプレイサンプリングのセットアップを構成する][7]を参照してください。
   - **Session Replay Enabled** をクリックすると、[セッションリプレイ][8]でリプレイ録画にアクセスできます。
   - ドロップダウンメニューから、セッションリプレイの[プライバシー設定][9]を選択します。
2. 変更をアプリケーションにデプロイします。実行が開始されると、ユーザーのブラウザから Datadog によってイベントが収集されます。
3. [収集したデータ][4]を[ダッシュボード][10]で視覚化したり、[RUM エクスプローラー][11]で検索クエリを作成したりします。
4. (オプション) Web アプリケーションやモバイルアプリケーションからのリクエストを対応するバックエンドのトレースにリンクさせたい場合は、[RUM とトレースを接続する][12]ために `allowedTracingUrls` パラメータで RUM SDK を初期化します。[初期化パラメーター](#initialization-parameters)の完全なリストを参照してください。
5. サイトで Datadog Content Security Policy (CSP) インテグレーションを使用している場合、追加のセットアップ手順については [CSP ドキュメントの RUM セクション][13]を参照してください。

Datadog がデータの受信を開始するまで、アプリケーションは **RUM Applications** ページに `pending` として表示されます。

### 適切なインストール方法の選択

npm (node package manager)
: 最新の Web アプリケーションには、この方法が推奨されます。RUM ブラウザ SDK は、残りのフロントエンド JavaScript コードとともにパッケージ化されます。ページの読み込みパフォーマンスに影響は出ませんが、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。Datadog では、Browser Logs SDK と一致するバージョンを使用することを推奨しています。

CDN 非同期
: この方法は、パフォーマンス目標のある Web アプリケーションに推奨されます。RUM ブラウザ SDK は、CDN から非同期的に読み込まれるため、SDK のダウンロードによるページの読み込みパフォーマンスへの影響を回避できます。ただし、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。

CDN 同期
: この方法は、すべての RUM イベントを収集する場合に推奨されます。RUM ブラウザ SDK は、CDN から同期的に読み込まれるため、最初に SDK を読み込み、すべてのエラー、リソース、ユーザーアクションを収集することができます。この方法は、ページの読み込みパフォーマンスに影響を与える可能性があります。

### account_management

[`@datadog/browser-rum`][14]を `package.json` ファイルに追加したら、次のコマンドを実行して初期化します。

<details open>
  <summary>最新バージョン</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` は組織の Datadog サイトパラメーターを指します
  // https://docs.datadoghq.com/getting_started/site/ を参照してください
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
});
```

</details>

<details>
  <summary><code>v5.0.0</code> より前</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` は組織の Datadog サイトパラメーターを指します
  // https://docs.datadoghq.com/getting_started/site/ を参照してください
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
  <summary><code>v4.30.0</code> より前</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` は組織の Datadog サイトパラメーターを指します
  // https://docs.datadoghq.com/getting_started/site/ を参照してください
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
  trackResources: true,
  trackLongTasks: true,
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
  <summary><code>v4.20.0</code> より前</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` は組織の Datadog サイトパラメーターを指します
  // https://docs.datadoghq.com/getting_started/site/ を参照してください
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
  <summary><code>v4.10.2</code> より前</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` は組織の Datadog サイトパラメーターを指します
  // https://docs.datadoghq.com/getting_started/site/ を参照してください
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  replaySampleRate: 100, // 含まれない場合 - デフォルト 100
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

`trackUserInteractions` パラメーターにより、アプリケーション内のユーザークリックを自動で収集することができます。ページに含まれる**センシティブなデータやプライベートなデータ**が、インタラクションが行われた要素を特定するために含まれる可能性があります。

### CDN 非同期

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグに追加します。**{{<region-param key="dd_site_name">}}** サイトの場合:

<details open>
  <summary>最新バージョン</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v5.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v5.0.0</code> より前</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
     });
    window.DD_RUM.startSessionReplayRecording();
   })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.30.0</code> より前</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.20.0</code> より前</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.10.2</code> より前</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

`trackUserInteractions` パラメーターにより、アプリケーション内のユーザークリックを自動で収集することができます。ページに含まれる**センシティブなデータやプライベートなデータ**が、インタラクションが行われた要素を特定するために含まれる可能性があります。

始めの RUM API 呼び出しは `window.DD_RUM.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

### CDN 同期

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグ（他のスクリプトタグの前にあるタグ）に追加します。同期型のスクリプトタグをより高い位置に含めると、Datadog RUM ですべてのパフォーマンスデータとエラーを収集できます。**{{<region-param key="dd_site_name">}}** サイトの場合:

<details open>
  <summary>最新バージョン</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v5.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v5.0.0</code> より前</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.30.0</code> より前</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.20.0</code> より前</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.10.2</code> より前</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` は組織の Datadog サイトパラメーターを指します
      // https://docs.datadoghq.com/getting_started/site/ を参照してください
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

`trackUserInteractions` パラメーターにより、アプリケーション内のユーザークリックを自動で収集することができます。ページに含まれる**センシティブなデータやプライベートなデータ**が、インタラクションが行われた要素を特定するために含まれる可能性があります。

`window.DD_RUM` チェックは、RUM ブラウザ SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

### TypeScript

型は TypeScript >= 3.8.2 と互換性があります。以前のバージョンの場合は、JavaScript ソースをインポートし、グローバル変数を使用してコンパイルの問題を回避します。

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  ...
})
```

## ブラウザトラブルシューティング

### 初期化パラメーター

追跡を開始するために、初期化コマンドを呼び出します。以下のパラメーターが使用可能です。

`applicationId`
: 必須<br/>
**型**: 文字列<br/>
RUM アプリケーションの ID。

`clientToken`
: 必須<br/>
**型**: 文字列<br/>
[Datadog クライアントトークン][15]。

`site`
: 必須<br/>
**型**: 文字列<br/>
**デフォルト**: `datadoghq.com`<br/>
[組織の Datadog のサイトパラメーター][16]。

`service`
: オプション<br/>
**型**: 文字列<br/>
アプリケーションのサービス名。[タグの構文要件][17]に従います。

`env`
: オプション<br/>
**型**: 文字列<br/>
アプリケーションの環境 (例: prod、pre-prod、staging)。[タグの構文要件][17]に従います。

`version`
: オプション<br/>
**型**: 文字列<br/>
アプリケーションのバージョン。例: 1.2.3、6c44da20、2020.02.13。[タグの構文要件][17]に従います。

`trackingConsent`
: オプション<br/>
**型**: `"granted"` または `"not-granted"`<br/>
**デフォルト**: `"granted"`<br/>
ユーザートラッキングに関する同意の初期状態を設定します。[ユーザートラッキングに関する同意][18]を参照してください。

`trackViewsManually`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false` <br/>
RUM ビューの作成を制御します。[デフォルトの RUM ビュー名をオーバーライドする][19]を参照してください。

`trackUserInteractions`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false` <br/>
[ユーザーアクションの自動収集][20]を有効にします。

`trackResources`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false` <br/>
リソースイベントの収集を可能にします。

`trackLongTasks`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false` <br/>
ロングタスクイベントの収集を可能にします。

`defaultPrivacyLevel`
: オプション<br/>
**型**: 文字列<br/>
**デフォルト**: `mask` <br/>[セッションリプレイのプライバシーオプション][21]を参照してください。

`actionNameAttribute`
: オプション <br/>
**型**: 文字列<br/>
 [アクションに名前を付ける][22]ために使用する独自の属性を指定できます。

`sessionSampleRate`
: オプション<br/>
**型**: 数字<br/>
**デフォルト**: `100`<br/>
追跡するセッションの割合。`100` で全て、`0` でなし。追跡されたセッションのみが RUM イベントを送信します。`sessionSampleRate` の詳細については、[サンプリング構成][7]を参照してください。

`sessionReplaySampleRate`
: オプション<br/>
**型**: 数字<br/>
**デフォルト**: `0`<br/>
[Browser RUM & セッションリプレイ料金][6]の機能を持つ追跡されたセッションの割合。`100` で全て、`0` でなし。`sessionReplaySampleRate` の詳細については、[サンプリング構成][7]を参照してください。

`startSessionReplayRecordingManually`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false`<br/>
セッションリプレイ用にセッションのサンプリングを行う場合、セッションの開始時ではなく、`startSessionReplayRecording()` が呼び出されてから記録を開始します。詳細については、[セッションリプレイの利用][23]を参照してください。

`silentMultipleInit`
: オプション<br/>
**型**: ブール値 <br/>
**デフォルト**: `false`<br/>
RUM ブラウザ SDK がページ上ですでに初期化されている場合、初期化が静かに失敗します。

`proxy`
: オプション<br/>
**型**: 文字列<br/>
オプションのプロキシ URL (例: https://www.proxy.com/path)。詳細については、完全な[プロキシ設定ガイド][24]を参照してください。

`allowedTracingUrls`
: オプション<br/>
**型**: リスト<br/>
トレースヘッダを注入するために使用されるリクエスト URL のリスト。詳細については、[RUM とトレースの接続][12]を参照してください。

`traceSampleRate`
: オプション<br/>
**型**: 数値<br/>
**デフォルト**: `100`<br/>
トレースするリクエストの割合: `100` で全て、`0` でなし。詳細は、[RUM とトレースの接続][12]を参照してください。

`telemetrySampleRate`
: オプション<br/>
**型**: 数値<br/>
**デフォルト**: `20`<br/>
SDK の実行に関するテレメトリーデータ (エラーやデバッグログなど) は、潜在的な問題を検出して解決するために、Datadog に送信されます。このオプションを `0` に設定すると、テレメトリー収集がオプトアウトされます。

`excludedActivityUrls`
: オプション<br/>
**型**: リスト<br/>
ページアクティビティを計算するときに無視されるリクエスト起源のリストです。[ページアクティビティの計算方法][11]を参照してください。

`workerUrl`
: オプション<br/>
**型**: 文字列<br/>
Datadog ブラウザ SDK ワーカー JavaScript ファイルを指す URL。URL は相対でも絶対でも構いませんが、Web アプリケーションと同じオリジンである必要があります。詳細は[コンテンツセキュリティポリシーガイドライン][13]を参照してください。

`compressIntakeRequests`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false`<br/>Datadog インテークに送信されたリクエストを圧縮して、大量のデータを送信する際の帯域幅の使用量を削減します。圧縮は Worker スレッドで行われます。詳細は[コンテンツセキュリティポリシーガイドライン][13]を参照してください。

`storeContextsAcrossPages`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false`<br/>
グローバルコンテキストとユーザーコンテキストを `localStorage` に格納して、ユーザーナビゲーションに沿って保存します。詳細と具体的な制限については[コンテキストのライフサイクル][25]を参照してください。

`allowUntrustedEvents`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false`<br/>
自動化された UI テストなど、[信頼できないイベント][26]のキャプチャを許可します。

Logs Browser SDK を使用している場合、一致するコンフィギュレーションが必要なオプション:

`trackSessionAcrossSubdomains`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false`<br/>
同じサイトのサブドメイン間でセッションを保持します。　

`useSecureSessionCookie`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false`<br/>
安全なセッション Cookie を使用します。これにより、安全でない (HTTPS 以外の) 接続で送信される RUM イベントが無効になります。

`usePartitionedCrossSiteSessionCookie`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false`<br/>
分割された安全なクロスサイトセッション Cookie を使用します。これにより、サイトが別のサイトから読み込まれたときに、RUM ブラウザ SDK を実行できます (iframe)。`useSecureSessionCookie` を意味します。

`useCrossSiteSessionCookie`
: オプション - **非推奨**<br/>
**型**: ブール値<br/>
**デフォルト**:`false`<br/>
`usePartitionedCrossSiteSessionCookie` を参照してください。

`allowFallbackToLocalStorage`
: オプション<br/>
**型**: ブール値<br/>
**デフォルト**: `false`<br/>
クッキーを設定できない場合に `localStorage` を使用できるようにします。これにより、クッキーをサポートしない環境でも RUM ブラウザ SDK を実行できるようになります。典型的な使用例については、[ブラウザ SDK を使用した Electron アプリケーションの監視][27]を参照してください。

### タグ付け

サービスとは、一連のページにマッピングされた、独立したデプロイ可能なコードリポジトリのことです。

- ブラウザアプリケーションがモノリスとして構築されている場合、RUM アプリケーションのサービス名は 1 つです。
- ブラウザアプリケーションが複数のページに対して別々のリポジトリとして構築されている場合、アプリケーションのライフサイクルを通じてデフォルトのサービス名を編集してください。

### 内部コンテキストにアクセスする

Datadog ブラウザ RUM SDK が初期化されると、SDK の内部コンテキストにアクセスすることができます。

以下の属性を調べることができます。

| 属性      | 説明                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | アプリケーションの ID。                                            |
| session_id     | セッションの ID。                                                |
| user_action    | アクション ID を含むオブジェクト (アクションが見つからなかった場合は未定義)。 |
| view           | 現在のビューイベントに関する詳細を含むオブジェクト。           |

詳細については、[RUM ブラウザデータ収集][4]を参照してください。

#### 例

```
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

オプションで `startTime` パラメーターを使用すると、特定の時刻のコンテキストを取得することができます。このパラメーターが省略された場合は、現在のコンテキストが返されます。

```
getInternalContext (startTime?: 'number' | undefined)
```

#### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```

#### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_security/real_user_monitoring/#shared-responsibility
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[3]: https://app.datadoghq.com/rum/list
[4]: /ja/real_user_monitoring/data_collected/
[5]: /ja/getting_started/tagging/using_tags
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[7]: /ja/real_user_monitoring/guide/sampling-browser-plans/
[8]: /ja/real_user_monitoring/session_replay/browser/
[9]: /ja/real_user_monitoring/session_replay/browser/privacy_options
[10]: /ja/real_user_monitoring/platform/dashboards/
[11]: /ja/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[12]: /ja/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[13]: /ja/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[14]: https://www.npmjs.com/package/@datadog/browser-rum
[15]: /ja/account_management/api-app-keys/#client-tokens
[16]: /ja/getting_started/site/
[17]: /ja/getting_started/tagging/#define-tags
[18]: /ja/real_user_monitoring/browser/advanced_configuration/#user-tracking-consent
[19]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[20]: /ja/real_user_monitoring/browser/tracking_user_actions
[21]: /ja/real_user_monitoring/session_replay/privacy_options?tab=maskuserinput
[22]: /ja/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[23]: /ja/real_user_monitoring/session_replay/browser/#usage
[24]: /ja/real_user_monitoring/guide/proxy-rum-data/
[25]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/advanced_configuration#contexts-life-cycle
[26]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[27]: /ja/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk