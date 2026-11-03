---
algolia:
  tags:
  - build plugins
  - webpack
  - vite
  - esbuild
  - rollup
  - rspack
  - bundler
description: Datadog ビルドプラグインを JavaScript バンドラーに統合して、ソースマップのアップロード、アクション名の難読化解除、およびその他の
  RUM タスクをビルド時に自動化します。
further_reading:
- link: https://github.com/DataDog/build-plugins
  tag: ソースコード
  text: Datadog ビルドプラグイン GitHub リポジトリ
- link: /real_user_monitoring/application_monitoring/browser/setup/client
  tag: ドキュメント
  text: RUM ブラウザクライアント側のセットアップ
title: ビルドプラグイン
---
## 概要 {#overview}

Datadog ビルドプラグインは JavaScript バンドラーと統合され、ビルドプロセス中に一般的な RUM タスクを自動化します。webpack、Vite、esbuild、Rollup、および Rspack で利用可能です。

ビルドプラグインは RUM ブラウザ SDK を補完するものです。[ブラウザモニタリングのセットアップ][1] で説明されているように、引き続き SDK を設定する必要があります。

## インストール {#installation}

お使いのバンドラー用の Datadog ビルドプラグインパッケージをインストールします。

{{< tabs >}}
{{% tab "Webpack" %}}

```bash
npm install --save-dev @datadog/webpack-plugin
```

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Vite" %}}

```bash
npm install --save-dev @datadog/vite-plugin
```

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "esbuild" %}}

```bash
npm install --save-dev @datadog/esbuild-plugin
```

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "ロールアップ" %}}

```bash
npm install --save-dev @datadog/rollup-plugin
```

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Rspack" %}}

```bash
npm install --save-dev @datadog/rspack-plugin
```

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{< /tabs >}}

## 構成{#configuration}

以下の共有設定オプションは、すべてのプラグインに適用されます。

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| `auth.apiKey` | 文字列 | はい (ソースマップのみ) | なし | Datadog API キー。`DATADOG_API_KEY` 環境変数で設定することもできます。|
| `auth.site` | 文字列 | いいえ | `datadoghq.com` | Datadog サイト。`DATADOG_SITE` または `DD_SITE` 環境変数で設定することもできます。|
| `logLevel` | 文字列 | いいえ | `warn` | ログの冗長性レベル。`debug`、`info`、`warn`、`error`、または `none` のいずれか。|

以下の例は、完全な設定構造を示しています。

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  logLevel: 'warn',
  // Source map uploads by debug ID (see Source Maps plugin page)
  sourcemaps: { /* ... */ },
  // Source map uploads by service and version (see Source Maps plugin page)
  errorTracking: {
    sourcemaps: { /* ... */ },
  },
  // RUM build-time features (see individual plugin pages)
  rum: {
    privacy: { /* ... */ },
    sourceCodeContext: { /* ... */ },
  },
})
```

`sourcemaps` と `errorTracking.sourcemaps` は相互に排他的です。選択したマッチング方法に基づいて、いずれか一方を設定してください。詳細は [ソースマップ][2] を参照してください。

## 利用可能なプラグイン {#available-plugins}

{{< whatsnext desc="個別のビルドプラグインを設定します：" >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps" >}}<u>ソースマップ</u>：ビルド中にソースマップをDatadogへ自動的にアップロードし、難読化解除されたスタックトレースを有効にします。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation" >}}<u>アクション名の難読化解除</u>：縮小されたビルドで読み取り可能なアクション名を復元します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context" >}}<u>ソースコードコンテキスト</u>：Error Tracking のスタックトレース内にソースコードをインラインで表示します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/application_monitoring/browser/setup/
[2]: /ja/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/