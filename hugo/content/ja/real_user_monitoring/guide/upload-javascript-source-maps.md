---
description: JavaScript ソースマップをアップロードすることで、可読性の高いスタックトレースによる Error Tracking と、縮小化されたコードのデバッグを向上できます。
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: ドキュメント
  text: Error Tracking を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エクスプローラーで Error Tracking データを視覚化する
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: ラーニングセンター
  text: JavaScript Web Applications の RUM を使用してエラーを追跡する
- link: https://www.datadoghq.com/blog/a-practical-guide-to-react-error-monitoring/
  tag: ブログ
  text: React エラーモニタリングの実践ガイド
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
  tag: ソースコード
  text: ソースマップのコマンドリファレンス
title: JavaScript ソースマップのアップロード
---
## 概要 {#overview}

フロントエンドの JavaScript ソースコードが縮小化されている場合は、スタックトレースの難読化を解除するために、Datadog にソースマップをアップロードします。任意のエラーについて、ファイルパス、行番号、関連するスタックトレースの各フレームのコードスニペットにアクセスすることができます。Datadog は、スタックフレームをリポジトリ内のソースコードにリンクすることもできます。

<div class="alert alert-info"><ul><li> <a href="/error_tracking/">Error Tracking</a>、<a href="/real_user_monitoring/">Real User Monitoring (RUM)</a>、および <a href="/logs/log_collection/javascript/">Browser Logs Collection</a> から収集されたエラーのみが縮小化を解除できます。</li><li>ビルドプロセスの一部としてソースマップのアップロードを自動化するには、<a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps">ビルドプラグイン: ソースマップ</a>を参照してください。</li></ul></div>

## コードのインスツルメンテーション {#instrument-your-code}

ソースコードを縮小するときに、`sourcesContent` 属性に関連するソースコードを直接含むソースマップを生成するように JavaScript バンドラーを構成します。

<div class="alert alert-danger">
各ソースマップのサイズと関連する縮小化されたファイルのサイズの合計が <b>500 MB</b> の制限を超えないようにしてください。
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

**注**: TypeScript を使用している場合は、`tsconfig.json` ファイル内で `compilerOptions.sourceMap` を `true` に設定します。

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel は、ビルドコマンドを実行すると、デフォルトでソースマップを生成します: `parcel build <entry file>`。

{{% /tab %}}
{{% tab "Vite" %}}

`build.sourcemap` ファイル内で `vite.config.js` オプションを構成することにより、ソースマップを生成できます。

構成サンプルを参照してください。

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true, // generates .js.map files
    minify: 'terser', // or 'esbuild'
  }
})
```

**注**: TypeScript を使用している場合は、`tsconfig.json` ファイル内で `compilerOptions.sourceMap` が `true` に設定されていることを確認してください。

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

<div class="alert alert-danger">
もしも、 <code>javascript.364758.min.js</code> および <code>javascript.364758.js.map</code> のファイルサイズの合計が <b>500 MB</b> の制限を超える場合は、バンドラーを構成してソースコードを複数の小さなチャンクに分割するようにし、サイズを削減します。詳細については、<a href="https://webpack.js.org/guides/code-splitting/">WebpackJS によるコード分割</a>を参照してください。
</div>

## ソースマップをアップロードする {#upload-your-source-maps}

ソースマップをアップロードするには、Debug ID (推奨) またはサービスとバージョンのいずれかの照合方法を選択します。Debug ID を使用すると、複数マイクロフロントエンド間でのソースマップ解決が可能になります。

{{< tabs >}}
{{% tab "Debug ID (推奨)" %}}

Debug ID は、バンドル URL、サービス、またはリリースバージョンに依存せずに、JavaScript バンドルとそのソースマップを関連付けます。

以下のアップロード方法のいずれかを選択します。

#### Datadog ビルドプラグイン {#datadog-build-plugins}

Datadog ビルドプラグインは、ビルド中に Debug ID を埋め込み、ソースマップを直接アップロードできます。`datadog-ci` を別途インストールまたは実行する必要はありません。

Debug ID のサポートには、[Datadog ビルドプラグインバージョン 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) 以降が必要です。

ビルドプラグインで Debug ID のインジェクションとソースマップのアップロードを有効にします。

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  sourcemaps: {
    debugId: true,
    upload: true,
  },
});
```

プラグインは、対応する JavaScript バンドルに埋め込まれた Debug ID を使用して、各ソースマップをアップロードします。

この例では Webpack を使用します。ほかのサポートされているバンドラーのインストールおよび構成手順については、「[Datadog ビルドプラグイン][8]」を参照してください。

#### `datadog-ci`{#datadog-ci}

Debug ID のサポートには、[`@datadog/datadog-ci` バージョン 5.24.0](https://github.com/DataDog/datadog-ci/releases/tag/v5.24.0) 以降が必要です。

1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (最新バージョンを使用していることを確認してください)。
2. [専用の Datadog API キーを作成][6]し、`DD_API_KEY` という名前の環境変数としてエクスポートします。
3. US1 以外のサイトの場合は、[Datadog サイト][7]を指定して `DD_SITE` をエクスポートし、CLI を構成します。
4. ビルド後に Debug ID を埋め込みます。

   ```bash
   datadog-ci sourcemaps inject /path/to/dist
   ```

5. ソースマップと対応する JavaScript バンドルをアップロードします。

   ```bash
   datadog-ci sourcemaps upload /path/to/dist --debug-id
   ```

`--service`、`--release-version`、または `--minified-path-prefix` を `--debug-id` と一緒に渡さないでください。

`inject` コマンドは、JavaScript バンドルとソースマップをその場で変更します。ビルドの実行後で、かつ SRI ハッシュ、圧縮済みアセット、署名、チェックサムマニフェストといった、バイト列に依存する成果物を生成する前に実行してください。アップロードするものと同じ変更済みアーティファクトをデプロイします。

[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ja/getting_started/site/
[8]: /ja/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/

{{% /tab %}}
{{% tab "サービスとバージョン" %}}

サービスとバージョンを使用してソースマップをアップロードするには、`datadog-ci sourcemaps upload` コマンドを実行するステップを CI パイプラインに追加します。このコマンドは `dist` ディレクトリおよびそのサブディレクトリをスキャンし、関連する縮小化されたファイルとともにソースマップを自動的にアップロードします。

{{< site-region region="us" >}}
1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (最新バージョンを使用していることを確認してください)。
2. [専用の Datadog API キーを作成][1]し、`DD_API_KEY` という名前の環境変数としてエクスポートします。
3. アプリケーションで、1 サービスにつき 1 回、以下のコマンドを実行します。

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,gov2,ap1,ap2,uk1" >}}
1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (最新バージョンを使用していることを確認してください)。
2. [専用の Datadog API キーを作成][1]し、`DD_API_KEY` という名前の環境変数としてエクスポートします。
3. CLI を構成して {{<region-param key="dd_site_name">}} サイトにファイルをアップロードできるようにするため、`export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} および `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}という 2 つの環境変数をエクスポートします。
4. アプリケーションで、1 サービスにつき 1 回、以下のコマンドを実行します。
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

CI のパフォーマンスに対するオーバーヘッドを最小限に抑えるため、CLI は短時間 (通常数秒) で必要なだけのソースマップをアップロードできるように最適化されています。

**注**: バージョンに変更がない場合、ソースマップを再アップロードしても既存のものはオーバーライドされません。

`--service` および `--release-version` パラメーターは、Error Tracking イベント、RUM イベント、およびブラウザログの `service` および `version` タグと一致する必要があります。これらのタグの設定方法についての詳細は、[Browser SDK 初期化ドキュメント][2]または[Browser ログ収集ドキュメント][3]を参照してください。

<div class="alert alert-info">アプリケーションで複数のサービスを定義している場合、アプリケーション全体のソースマップのセットが 1 つであっても、サービスの数だけ CI コマンドを実行します。</div>

例の `dist` ディレクトリに対してコマンドを実行することで、Datadog はサーバーまたは CDN が JavaScript ファイルを `https://hostname.com/static/js/javascript.364758.min.js` および `https://hostname.com/static/js/subdirectory/javascript.464388.min.js` で配信することを期待しています。

`.js.map` 拡張子を持つソースマップのみが、スタックトレースを正しく縮小化解除するために機能します。`.mjs.map` のようなほかの拡張子を持つソースマップも受け入れられますが、スタックトレースは縮小化解除されません。

<div class="alert alert-info">異なるサブドメインから同じ JavaScript ソースファイルを提供する場合、関連するソースマップを一度アップロードし、完全な URL の代わりに絶対プレフィックスパスを使用することで複数のサブドメインで動作するようにしてください。例えば、 <code>/static/js</code> ではなく <code>https://hostname.com/static/js</code>を指定します。</div>

[2]: /ja/real_user_monitoring/application_monitoring/browser/setup/#initialization-parameters
[3]: /ja/logs/log_collection/javascript/#initialization-parameters

{{% /tab %}}
{{< /tabs >}}

[{{< ui >}}Explore RUM Debug Symbols{{< /ui >}}][5] ページで、アップロードされたすべてのシンボルを確認してソースマップを管理します。

### スタックフレームをソースコードにリンクする {#link-stack-frames-to-your-source-code}

Git 作業ディレクトリ内で `datadog-ci sourcemaps upload` を実行すると、Datadog はリポジトリメタデータを収集します。`datadog-ci` コマンドは、リポジトリの URL、現在のコミットハッシュ、およびソースマップに関連するリポジトリ内のファイルパスのリストを収集します。Git メタデータ収集の詳細については、[datadog-ci ドキュメント][4]を参照してください。

Datadog は、縮小化解除されたスタックフレームにソースコードへのリンクを表示します。

## Debug ID アップロードをトラブルシューティングする{#troubleshooting-debug-id-uploads}

### ローカルソースマップを検査する{#inspect-local-source-maps}

特定の Debug ID のローカルソースマップを見つけるには、以下を実行します。

```bash
datadog-ci sourcemaps find /path/to/dist --debug-id 12345678-1234-1234-1234-123456789abc
```

Debug ID を含まないソースマップを見つけるには、以下を実行します。

```bash
datadog-ci sourcemaps find /path/to/dist --missing-debug-id
```

`find` コマンドは、ローカルの `*.js.map` ファイルのみを検査します。Datadog がアーティファクトを受信したかどうかは確認しません。

## エラーを簡単にトラブルシューティングする {#troubleshoot-errors-with-ease}

ファイルパスと行番号にアクセスできない場合、縮小化されたスタックトレースはコードベースのトラブルシューティングには役立ちません。また、コードスニペットは縮小化されており (つまり、変換されたコードが 1 行の長い形式になっています)、トラブルシューティングがより困難になります。

次の例では、縮小化されたスタックトレースを表示しています。

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Error Tracking 縮小化スタックトレース" >}}

一方、縮小化解除されたスタックトレースは、迅速でシームレスなトラブルシューティングに必要なすべてのコンテキストを提供します。ソースコードに関連するスタックフレームについて、Datadog はリポジトリへの直接リンクも生成します。

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Error Tracking 縮小化解除スタックトレース" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: https://app.datadoghq.com/source-code/setup/rum