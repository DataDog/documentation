---
algolia:
  tags:
  - source maps
  - build plugins
  - error tracking
description: ビルド時に JavaScript ソースマップを Datadog に自動アップロードして、Error Tracking および RUM におけるスタックトレースの難読化を解除します。
further_reading:
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: ドキュメント
  text: JavaScript ソースマップをアップロードする (手動方式)
- link: /real_user_monitoring/error_tracking
  tag: ドキュメント
  text: Error Tracking
- link: https://github.com/DataDog/build-plugins
  tag: ソースコード
  text: Datadog ビルドプラグイン GitHub リポジトリ
title: ソースマップ
---
## 概要 {#overview}

ソースマップビルドプラグインは、ビルド中に JavaScript ソースマップを Datadog に自動アップロードし、[Error Tracking][1] および [RUM][2] におけるスタックトレースの難読化解除を可能にします。これにより、ソースマップアップロードのために `datadog-ci sourcemaps upload` を手動で実行したり CI/CD パイプラインを構成したりする必要がなくなります。

このプラグインはビルドプロセスにフックし、ビルド出力から対応する `.map` ソースマップファイルを持つすべての `.js` ファイルを検出し、Git メタデータと共に Datadog にアップロードします。デバッグ ID またはサービスとバージョンによって、ソースマップをイベントに関連付けることができます。

## 前提条件 {#prerequisites}

- `auth.apiKey` または `DATADOG_API_KEY` 環境変数で設定された Datadog API キー。
- バンドラー設定で有効になっているソースマップ。このプラグインはソースマップをアップロードしますが、生成は行いません。バンドラー固有のソースマップ生成設定については、[JavaScript ソースマップをアップロードする][3] を参照してください。
- デバッグ ID によるアップロードを行う場合は、ビルドプラグインでデバッグ ID のインジェクションを有効にしてください。
- サービスとバージョンによるアップロードを行う場合は、プラグイン構成と一致する `service` および `version` パラメーターを使用して RUM SDK を初期化してください。
- インストールおよびバンドラーに登録されている Datadog ビルドプラグイン。インストール手順については、[ビルドプラグイン][4] を参照してください。

## 構成 {#configuration}

以下の環境変数は、構成値を上書きします。

- `DATADOG_SITE` または `DD_SITE`: インテーク URL の `auth.site` を上書きします。
- `DATADOG_SOURCEMAP_INTAKE_URL`: インテーク URL 全体を直接上書きします。

デバッグ ID またはサービスとバージョンのいずれかのソースマップアップロード照合方法を選択してください。これらのアップロード方法は相互に排他的です。

### Debug ID (推奨) {#debug-id-recommended}

デバッグ ID は、バンドル URL、サービス、またはバージョンに依存することなく、各 JavaScript バンドルとそのソースマップを関連付けます。新しい構成にはこの方法を使用してください。

デバッグ ID のサポートには、[Datadog ビルドプラグインバージョン 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) 以降が必要です。

`sourcemaps` で以下のオプションを構成します。

| パラメーター | タイプ | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| `debugId` | ブール値 | Yes | なし | 各 JavaScript バンドルにデバッグ ID を挿入するには、`true` に設定します。|
| `upload` | ブール値 | Yes (アップロード) | `false` | ビルド中にソースマップをアップロードするには、`true` に設定します。省略した場合、プラグインはデバッグ ID の挿入のみを行います。|
| `bailOnError` | ブール値 | No | `false` | `true` の場合、ソースマップのアップロードエラーが発生するとビルドが失敗します。|
| `dryRun` | ブール値 | No | `false` | `true` の場合、プラグインは Datadog にデータを送信することなくアップロードプロセスを実行します。構成の確認にはこれを使用してください。|
| `maxConcurrency` | 数値 | No | `20` | 同時にアップロードできるソースマップの最大数。|

`debugId` と `upload` を `true` に設定して、ビルド中にデバッグ ID を挿入し、ソースマップをアップロードします。

{{< tabs >}}
{{% tab "Webpack" %}}

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Vite" %}}

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
});
```

{{% /tab %}}
{{% tab "esbuild" %}}

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
});
```

{{% /tab %}}
{{% tab "ロールアップ" %}}

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Rspack" %}}

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{< /tabs >}}

### サービスとバージョン{#service-and-version}

サービスとバージョンの照合を使用してソースマップをアップロードするには、`errorTracking.sourcemaps` オブジェクトを構成します。

| パラメーター | タイプ | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| `service` | 文字列 | Yes | なし | サービス名。RUM SDK の `service` 初期化パラメーターと一致する必要があります。|
| `releaseVersion` | 文字列 | Yes (`metadata.version` が設定されている場合を除く) | なし | リリースバージョン。RUM SDK の `version` 初期化パラメーターと一致する必要があります。|
| `minifiedPathPrefix` | 文字列 | Yes | なし | ミニファイされた JavaScript ファイルが提供される URL またはルート相対パスのプレフィックス。たとえば、`https://example.com/static/` や `/static/` などです。|
| `bailOnError` | ブール値 | No | `false` | `true` の場合、ソースマップのアップロードエラーが発生するとビルドが失敗します。|
| `dryRun` | ブール値 | No | `false` | `true` の場合、プラグインは Datadog にデータを送信することなくアップロードプロセスを実行します。構成の確認にはこれを使用してください。|
| `maxConcurrency` | 数値 | No | `20` | 同時にアップロードできるソースマップの最大数。|

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      errorTracking: {
        sourcemaps: {
          service: 'my-application',
          releaseVersion: '1.0.0',
          minifiedPathPrefix: 'https://example.com/static/',
        },
      },
    }),
  ],
};
```

<div class="alert alert-info">この例ではwebpackを使用します。構成オブジェクトは、サポートされているすべてのバンドラーで同一です。異なるのはインポートとプラグインの関数名のみです。バンドラーのインストール手順については、<a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">ビルドプラグイン</a>を参照してください。</div>

Error Tracking のスタックトレースにインラインソースコードも表示するには、サービスとバージョンのソースマップのアップロードを [ソースコードコンテキスト][5] プラグインと組み合わせて使用してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/error_tracking
[2]: /ja/real_user_monitoring/
[3]: /ja/real_user_monitoring/guide/upload-javascript-source-maps#instrument-your-code
[4]: /ja/real_user_monitoring/application_monitoring/browser/build_plugins/
[5]: /ja/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context