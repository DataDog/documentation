---
title: JavaScript ソースマップのアップロード
kind: ガイド
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentation
  text: エラー追跡を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: エクスプローラーでエラー追跡データを視覚化する
---

## 概要

フロントエンドの JavaScript ソースコードが縮小されている場合は、ソースマップを Datadog にアップロードして、さまざまなスタックトレースを難読化できるようにする必要があります。その後、特定のエラーについて、ファイルパス、行番号、および関連するスタックトレースの各フレームのコードスニペットにアクセスできます。

## コードのインスツルメンテーション
ソースコードを縮小するときに、関連するソースコードを `sourcesContent` 属性に直接含むソースマップを生成するように、JavaScript バンドルを構成する必要があります。一般的な JavaScript バンドルのコンフィギュレーションを以下で確認してください。また、関連する縮小ファイルのサイズで拡張された各ソースマップのサイズが、__上限の 50MB__を越えないようにしてください。よく使用される JavaScript バンドルのコンフィギュレーション例については以下を参照してください。

{{< tabs >}}
{{% tab "WebpackJS" %}}

[SourceMapDevToolPlugin][1] という名前の組み込みの Webpack プラグインを使用して、ソースマップを生成できます。`webpack.config.js` ファイルで構成する方法を以下で確認してください。

```javascript
// ...
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[name].[hash].js.map'
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

**注**: TypeScript を使用している場合は、`tsconfig.json` ファイルを構成するときに、必ず `compilerOptions.sourceMap` を `true` に設定してください。

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel は、ビルドコマンドを実行すると、デフォルトでソースマップを生成します: `parcel build <entry file>`

{{% /tab %}}
{{< /tabs >}}

アプリケーションをビルドした後、バンドラーは、ほとんどの場合 `dist` という名前のディレクトリを生成し、対応するソースマップと同じ場所に縮小された JavaScript ファイルを配置します。以下の例を確認してください。

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-info">例えば、<code>javascript.364758.min.js</code>と<code>javascript.364758.js.map</code>のファイルサイズの合計が <i>50MB の制限値</i>を超えた場合は、バンドラーでソースコードを複数の小さなブロックに分割するよう構成してファイルサイズを縮小してください (<a href="https://webpack.js.org/guides/code-splitting/">WebpackJS での操作方法はこちらを参照してください</a>)。</div>

## ソースマップのアップロード

ソースマップをアップロードする最良の方法は、CI パイプラインに追加のステップを追加し、[Datadog CLI][1] から専用コマンドを実行することです。`dist` ディレクトリとそのサブディレクトリをスキャンして、関連する縮小ファイルを含むソースマップを自動的にアップロードします。フローは次のとおりです。

{{< tabs >}}
{{% tab "US" %}}

1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (必ず最新バージョンを使用してください)。
2. [新しい専用の Datadog API キーを作成][1]し、`DATADOG_API_KEY` という名前の環境変数としてエクスポートします。
3. 次のコマンドを実行します。
```bash
datadog-ci sourcemaps upload /path/to/dist \
    --service=my-service \
    --release-version=v35.2395005 \
    --minified-path-prefix=https://hostname.com/static/js
```


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "EU" %}}

1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (必ず最新バージョンを使用してください)。
2. [新しい専用の Datadog API キーを作成][1]し、`DATADOG_API_KEY` という名前の環境変数としてエクスポートします。
3. 2 つの追加環境変数 `export DATADOG_SITE="datadoghq.eu"` および `export DATADOG_API_HOST="api.datadoghq.eu"` をエクスポートして、EU リージョンにファイルをアップロードするために CLI を構成します。
4. 次のコマンドを実行します。
```bash
datadog-ci sourcemaps upload /path/to/dist \
    --service=my-service \
    --release-version=v35.2395005 \
    --minified-path-prefix=https://hostname.com/static/js
```


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

**注**: CLI は、CI のパフォーマンスのオーバーヘッドを最小限に抑えるために、必要な数のソースマップを非常に短い時間 (通常は数秒) でアップロードするように最適化されています。

このコマンドをサンプルの `dist` ディレクトリ (前のセクションを参照) に対して実行することにより、Datadog はサーバーまたは CDN が `https://hostname.com/static/js/javascript.364758.min.js` および `https://hostname.com/static/js/subdirectory/javascript.464388.min.js` で JavaScript ファイルを配信することを期待します。ユーザーの 1 人のセッションでエラーが発生すると、RUM SDK は即座にそれを収集します。指定されたエラーがこれらの URL の 1 つからダウンロードされ、`version:v35.2395005` および `service:my-service` のタグが付けられたファイルで発生した場合は常に、関連するソースマップを使用してスタックトレースを難読化します (この場合、`javascript.464388.js.map` ファイル)。

**注**: 現在、エラー追跡 UI でスタックトレースを正しく非縮小するために機能するのは、拡張子が `.min.js` のソースマップのみです。他の拡張子 (たとえば、`.mjs` など) が受け入れられているソースマップは、スタックトレースを非縮小しません。

## エラーを簡単にトラブルシューティング

ファイルパスと行番号にアクセスできないため、縮小スタックトレースは役に立ちません。コードベースのどこで何かが起こっているのかを把握するのは簡単ではありません。さらに、コードスニペットは依然として縮小されているため (変換されたコードの 1 行が長い)、トラブルシューティングプロセスがさらに困難になります。縮小スタックトレースの例を以下に示します。

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="エラー追跡縮小スタックトレース"  >}}

それどころか、非縮小スタックトレースは、高速でシームレスなトラブルシューティングに必要なすべてのコンテキストを提供します。

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.gif" alt="エラー追跡非縮小スタックトレース"  >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
