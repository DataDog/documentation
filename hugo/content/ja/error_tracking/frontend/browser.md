---
aliases:
- /ja/real_user_monitoring/error_tracking/browser_errors
- /ja/error_tracking/standalone_frontend/browser
further_reading:
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: 学習センター
  text: JavaScript Web Applications の RUM を使用してエラーを追跡する
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps
  tag: ソースコード
  text: datadog-ci ソースコード
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: ドキュメント
  text: JavaScript ソースマップをアップロードする
- link: /real_user_monitoring/guide/upload-webassembly-symbols
  tag: ドキュメント
  text: WebAssembly シンボルをアップロードする
- link: /error_tracking/explorer
  tag: ドキュメント
  text: Error Tracking エクスプローラーについて
title: Browser Error Tracking
---
## 概要{#overview}

[Error Tracking][1] は、Browser SDK によってブラウザから収集されたエラーを処理します。スタックトレースを含む [source][2]、[custom][3]、[report][4]、または [console][4] エラーが収集されるたびに、Error Tracking はそれを処理し、[Error Tracking Explorer][16] で確認できる Issue、つまり類似したエラーのグループとしてまとめます。

## 前提条件{#prerequisites}

[Browser SDK][5] の最新バージョンをダウンロードします。

## セットアップ{#setup}

ブラウザアプリケーションから Datadog に Error Tracking データの送信を開始するには、「[アプリ内のセットアップ手順][6]」に従うか、以下の手順に従ってください。

### ステップ 1 – アプリケーションを作成する{#step-1-create-the-application}

1. Datadog で、[{{< ui >}}Errors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Browser and Mobile{{< /ui >}} > {{< ui >}}Add an Application{{< /ui >}}][6] ページに移動し、[JavaScript (JS)] アプリケーションタイプを選択します。
2. アプリケーション名を入力し、[{{< ui >}}Create Application{{< /ui >}}] をクリックします。これにより、アプリケーションの `clientToken` と `applicationId` が生成されます。

### ステップ 2 – 適切なインストール方法を選択する{#step-2-choose-the-right-installation-method}

Browser SDK のインストールタイプを選択します。

{{< tabs >}}
{{% tab "npm" %}}

最新の Web アプリケーションでは、npm (Node Package Manager) を使用したインストールが推奨されます。Browser SDK は、フロントエンドの JavaScript コードの残りの部分と一緒にパッケージ化されています。それで、ページのロードパフォーマンスには影響しません。ただし、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは、SDK で捕捉できない場合があります。Datadog では、Browser Logs SDK と一致するバージョンの使用を推奨しています。

[`@datadog/browser-rum`][1] を `package.json` ファイルに追加し、次のように初期化します。

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({

   applicationId: '<APP_ID>',
   clientToken: '<CLIENT_TOKEN>',
   service: '<SERVICE>',
   env: '<ENV_NAME>',
   // site: '<SITE>',
   // version: '1.0.0',
   trackUserInteractions: true,
   trackResources: true
});

```

`trackUserInteractions` パラメーターを使用すると、アプリケーション内でのユーザーのクリック操作を自動的に収集できます。操作対象の要素を特定するために、ページに含まれる**機密情報や個人情報**が収集データに含まれる場合があります。

[1]: https://www.npmjs.com/package/@datadog/browser-rum

{{% /tab %}}
{{% tab "CDN 非同期" %}}

パフォーマンス目標がある Web アプリケーションには、CDN 経由での非同期インストールが推奨されます。Browser SDK は Datadog の CDN から非同期でロードされ、SDK のダウンロードがページのロードパフォーマンスに影響を与えることはありません。ただし、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは、SDK で捕捉できない場合があります。

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグに追加します。**{{<region-param key="dd_site_name">}}** [サイト][1]の場合:

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
  })
</script>
```

`trackUserInteractions` パラメーターを使用すると、アプリケーション内でのユーザーのクリック操作を自動的に収集できます。操作対象の要素を特定するために、ページに含まれる**機密情報や個人情報**が収集データに含まれる場合があります。

[1]: /ja/getting_started/site/

{{% /tab %}}
{{% tab "CDN 同期" %}}

すべてのイベントを収集するには、CDN 経由での同期インストールが推奨されます。Browser SDK は Datadog の CDN から同期的にロードされ、最初にロードされること、すべてのエラー、リソース、およびユーザーアクションを収集できることを保証します。この方法はページのロードパフォーマンスに影響を与える可能性があります。

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグ (他の script タグの前) に追加します。script タグを上部に配置し、同期的にロードすることで、Datadog RUM によりすべてのパフォーマンスデータとエラーを収集できるようになります。**{{<region-param key="dd_site_name">}}** [サイト][1]の場合:

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
</script>
```

`trackUserInteractions` パラメーターを使用すると、アプリケーション内でのユーザーのクリック操作を自動的に収集できます。操作対象の要素を特定するために、ページに含まれる**機密情報や個人情報**が収集データに含まれる場合があります。

[1]: /ja/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

#### TypeScript (オプション){#typescript-optional}

TypeScript プロジェクトで SDK を初期化する場合は、以下のコードスニペットを使用してください。型定義は TypeScript 3.8.2 以降と互換性があります。

<div class="alert alert-info">それより前のバージョンの TypeScript を使用している場合は、コンパイル時の問題を避けるため、JavaScript ソースをインポートし、グローバル変数を使用してください。</div>

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  trackUserInteractions: true,
  trackResources: true,
  ...
})
```

### ステップ 3 – 環境と設定を構成する{#step-3-configure-environment-and-settings}

1. [unified service tagging][18] を使用するために、[Environment] フィールドでアプリケーションの環境 (`env`) を定義します。
2. [unified service tagging][18] を使用するために、[Service] フィールドでアプリケーションのサービス (`service`) を定義します。
3. ユーザー入力のプライバシーレベルを設定します。詳細については、「[Session Replay ブラウザのプライバシーオプション][10]」を参照してください。
4. 初期化スニペットで、デプロイするアプリケーションのバージョン番号 (`version`) を設定します。詳細については、「[タグ付け](#tagging-for-error-tracking)」を参照してください。
5. 必要に応じて追加のパラメーターを設定します。利用可能なすべてのオプションについては、以下の」[構成リファレンス](#configuration-reference)」セクションを参照してください。

### ステップ 4 – アプリケーションをデプロイする{#step-4-deploy-your-application}

アプリケーションに変更をデプロイします。デプロイが完了し稼働状態になると、Datadog はユーザーのブラウザからイベントを収集し始めます。

### ステップ 5 – ソースマップと WebAssembly シンボルをアップロードする (オプションですが推奨){#step-5-upload-source-maps-and-webassembly-symbols-optional-but-recommended}

JavaScript のソースマップをアップロードすると、非縮小スタックトレースにアクセスできます。「[ソースマップアップロードガイド][17]」を参照してください。

ブラウザアプリケーションで WebAssembly を使用している場合は、[Browser SDK の WASM プラグインを設定][20]し、[モジュールのデバッグシンボルをアップロード][21]してください。

### ステップ 6 – データを可視化する{#step-6-visualize-your-data}

Browser Error Tracking の基本セットアップが完了したので、アプリケーションではブラウザエラーを収集するようになり、リアルタイムで問題の監視やデバッグを開始できます。

[収集されたデータ][7]を[ダッシュ​​ボード][8]で可視化したり、Error Tracking で検索クエリを作成したりできます。

Datadog がデータの受信を開始するまで、アプリケーションは `pending` ページに {{< ui >}}Applications{{< /ui >}} として表示されます。

### ステップ 7 – エラーとソースコードをリンクする (オプション){#step-7-link-errors-with-your-source-code-optional}

[Datadog CLI][11] では、ソースマップの送信に加えて、コミットハッシュ、リポジトリ URL、コードリポジトリ内の追跡対象ファイルパスのリストといった Git 情報も送信します。

Error Tracking は、この情報を使ってエラーと[ソースコード][15]を関連付けます。これにより、任意のスタックトレースフレームから[GitHub][12]、[GitLab][13]、[Bitbucket][14] 上の該当するコード行へ直接移動できるようになります。

<div class="alert alert-info">スタックフレームからソースコードへのリンク機能は、<a href="https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> バージョン <code>0.12.0</code> 以降で利用可能です。</div>

詳細については、「[Datadog Source Code Integration][15]」を参照してください。

## Error Tracking のためのタグ付け{#tagging-for-error-tracking}

(上記のステップ 3 で設定する) これらのタグは、Error Tracking の機能を強化します。

- `service` と `env` による問題のフィルタリングとファセット
- 同じ `service`/`env` における RUM、Logs、APM とのクロスプロダクト相関
- アップロード時に設定した同じ `service` および `version` による、アップロード済みソースマップの照合

サービスとは、一連のページにマッピングされた、独立したデプロイ可能なコードリポジトリのことです。

- ブラウザアプリケーションがモノリスとして構築されている場合、Datadog アプリケーションのサービス名は 1 つです。
- ブラウザアプリケーションが複数のページに対して別々のリポジトリとして構築されている場合、アプリケーションのライフサイクルを通じてデフォルトのサービス名を適切に編集してください。

詳細については、Datadog での[タグ付け][19]をご覧ください。

## 構成リファレンス{#configuration-reference}

利用可能な構成オプションの全一覧については、「[Browser SDK API リファレンス][9]」を参照してください。

## 次のステップ{#next-steps}

未処理の例外、未処理の Promise 拒否、処理済みの例外、処理済みの Promise 拒否、および Browser SDK が自動的に追跡しないその他のエラーを監視できます。詳細については、「[ブラウザエラーの収集][3]」をご覧ください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/error_tracking/
[2]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/?tab=error#source-errors
[3]: /ja/error_tracking/frontend/collecting_browser_errors/
[4]: /ja/error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/
[8]: /ja/real_user_monitoring/platform/dashboards/errors/
[9]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[10]: /ja/session_replay/privacy_options?platform=browser#mask-action-names
[11]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[12]: https://github.com
[13]: https://about.gitlab.com
[14]: https://bitbucket.org/product
[15]: /ja/integrations/guide/source-code-integration/
[16]: /ja/error_tracking/explorer
[17]: /ja/real_user_monitoring/guide/upload-javascript-source-maps
[18]: /ja/getting_started/tagging/unified_service_tagging/
[19]: /ja/getting_started/tagging/
[20]: /ja/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#configure-webassembly-error-tracking
[21]: /ja/real_user_monitoring/guide/upload-webassembly-symbols/#upload-your-symbols