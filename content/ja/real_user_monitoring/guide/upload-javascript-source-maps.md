---
title: Upload JavaScript Source Maps
kind: guide
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentation
  text: Get started with Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualize your Error Tracking data in the Explorer
- link: "https://github.com/DataDog/datadog-ci/tree/457d25821e838db9067dbe376d0f34fb1a197869/src/commands/sourcemaps"
  tag: ソースコード
  text: Sourcemaps command reference
---

## 概要

フロントエンドの JavaScript ソースコードが縮小化されている場合、Datadog にソースマップをアップロードして、異なるスタックトレースの難読化を解除します。任意のエラーについて、関連するスタックトレースの各フレームのファイルパス、行番号、コードスニペットにアクセスすることができます。また、Datadog はスタックフレームをリポジトリ内のソースコードにリンクすることができます。

<div class="alert alert-info"><a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> で収集されたエラー、および<a href="/logs/log_collection/javascript/">ブラウザログ収集</a>のログのみ、縮小化解除が可能です。</div>

## コードのインスツルメンテーション

ソースコードを縮小するときに、`sourcesContent` 属性に関連するソースコードを直接含むソースマップを生成するように JavaScript バンドラーを構成します。

<div class="alert alert-warning">
{{< site-region region="us,us3,us5,eu" >}}
関連する縮小ファイルのサイズを加えた各ソースマップのサイズが、**300** MB の制限を超えないようにしてください。
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
関連する縮小ファイルのサイズを加えた各ソースマップのサイズが、**50** MB の制限を超えないようにしてください。
{{< /site-region >}}
</div>

一般的な JavaScript のバンドルソフトについては、以下の構成を参照してください。

{{< tabs >}}
{{% tab "WebpackJS" %}}

[SourceMapDevToolPlugin][1] という名前の組み込みの Webpack プラグインを使用して、ソースマップを生成できます。

`webpack.config.js` ファイルにある構成例を参照してください。

```javascript
// ...
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[file].map'
    }),
    // ...
  ],
  optimization: {
    minimize: true,
    // ...
  },
  // ...
};
```

**注**: TypeScript を使用している場合は、`tsconfig.json` ファイルで `compilerOptions.sourceMap` を `true` に設定してください。

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel は、ビルドコマンドを実行すると、デフォルトでソースマップを生成します: `parcel build <entry file>`。

{{% /tab %}}
{{< /tabs >}}

アプリケーションをビルドした後、バンドラーは縮小化された JavaScript ファイルを、対応するソースマップと同じ場所に配置したディレクトリ (通常 `dist` という名前) を生成します。

次の例をご覧ください。

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-warning">
{{< site-region region="us,us3,us5,eu" >}}
<code>javascript.364758.min.js</code> と <code>javascript.364758.js.map</code> のファイルサイズの合計が <b>**300** MB</b> の制限を超える場合は、ソースコードを複数の小さなチャンクに分割するようにバントラーを構成することでファイルサイズを減らしてください。詳細については、<a href="https://webpack.js.org/guides/code-splitting/">WebpackJS でのコード分割</a>を参照してください。
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
<code>javascript.364758.min.js</code> と <code>javascript.364758.js.map</code> のファイルサイズの合計が <b>**50** MB</b> の制限を超える場合は、ソースコードを複数の小さなチャンクに分割するようにバントラーを構成することでファイルサイズを減らしてください。詳細については、<a href="https://webpack.js.org/guides/code-splitting/">WebpackJS でのコード分割</a>を参照してください。
{{< /site-region >}}
</div>

## ソースマップのアップロード

ソースマップをアップロードする最良の方法は、CI パイプラインに追加のステップを追加し、[Datadog CLI][1] から専用コマンドを実行することです。`dist` ディレクトリとそのサブディレクトリをスキャンして、関連する縮小ファイルを含むソースマップを自動的にアップロードします。

{{< site-region region="us" >}}
1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (最新バージョンを使用していることを確認してください)。
2. [専用の Datadog API キーを作成][1]し、`DATADOG_API_KEY` という名前の環境変数としてエクスポートします。
3. RUM アプリケーションで、1 サービスにつき 1 回、以下のコマンドを実行します。

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service=my-service \
     --release-version=v35.2395005 \
     --minified-path-prefix=https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,ap1" >}}
1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (最新バージョンを使用していることを確認してください)。
2. [専用の Datadog API キーを作成][1]し、`DATADOG_API_KEY` という名前の環境変数としてエクスポートします。
3. 以下の 2 つの環境変数をエクスポートして、{{<region-param key="dd_site_name">}} サイトにファイルをアップロードするように CLI を構成します: `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} と `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}
4. RUM アプリケーションで、1 サービスにつき 1 回、以下のコマンドを実行します。
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service=my-service \
     --release-version=v35.2395005 \
     --minified-path-prefix=https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

CI のパフォーマンスに対するオーバーヘッドを最小限に抑えるため、CLI は短時間 (通常数秒) で必要なだけのソースマップをアップロードできるように最適化されています。

**注**: バージョンに変更がない場合、ソースマップを再アップロードしても既存のものはオーバーライドされません。

`service` と `--release-version` パラメーターは、RUM イベントとブラウザログの `service` と `version` タグと一致する必要があります。これらのタグを設定する方法の詳細については、[Browser RUM SDK 初期化ドキュメント][2] または[ブラウザログ収集ドキュメント][3]を参照してください。

<div class="alert alert-info">RUM アプリケーションで複数のサービスを定義している場合、RUM アプリケーション全体のソースマップのセットが 1 つであっても、サービスの数だけ CI コマンドを実行します。</div>

サンプルの `dist` ディレクトリに対してコマンドを実行すると、Datadog はサーバーまたは CDN が `https://hostname.com/static/js/javascript.364758.min.js` と `https://hostname.com/static/js/subdirectory/javascript.464388.min.js` に JavaScript ファイルを配信することを期待します。

スタックトレースを正しく非縮小するために機能するのは、拡張子が `.js.map` のソースマップのみです。`.mjs.map` など、他の拡張子のソースマップは許容されますが、スタックトレースを非縮小しません。

<div class="alert alert-info">異なるサブドメインから同じ JavaScript ソースファイルを提供する場合、関連するソースマップを一度アップロードし、完全な URL の代わりに絶対プレフィックスパスを使用することで複数のサブドメインで動作するようにしてください。例えば、<code>https://hostname.com/static/js</code> の代わりに <code>/static/js</code> を指定します。</div>

### スタックフレームをソースコードにリンクする

Git の作業ディレクトリ内で `datadog-ci sourcemaps upload` を実行すると、Datadog はリポジトリのメタデータを収集します。`datadog-ci` コマンドは、リポジトリの URL、現在のコミットハッシュ、そしてソースマップに関連するリポジトリ内のファイルパスのリストを収集します。Git のメタデータ収集の詳細については、[datadog-ci のドキュメント][4]を参照してください。

Datadog は、縮小化を解除されたスタックフレームにソースコードへのリンクを表示します。

## エラーを簡単にトラブルシューティング

ファイルパスと行番号にアクセスできなければ、縮小化されたスタックトレースは、コードベースのトラブルシューティングに役立ちません。また、コードスニペットが縮小化されている (つまり、変換された長いコードが 1 行ある) ので、トラブルシューティングがより困難になります。

次の例では、縮小化されたスタックトレースを表示しています。

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="エラー追跡縮小スタックトレース" >}}

一方、縮小化解除されたスタックトレースは、迅速でシームレスなトラブルシューティングに必要なすべてのコンテキストを提供します。ソースコードに関連するスタックフレームについては、Datadog はリポジトリへの直接リンクも生成します。

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="エラー追跡非縮小スタックトレース" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
[2]: https://docs.datadoghq.com/real_user_monitoring/browser/setup/#initialization-parameters
[3]: https://docs.datadoghq.com/logs/log_collection/javascript/#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#link-errors-with-your-source-code
