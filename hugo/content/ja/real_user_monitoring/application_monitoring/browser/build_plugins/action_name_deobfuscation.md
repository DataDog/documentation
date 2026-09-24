---
algolia:
  tags:
  - action names
  - build plugins
  - privacy
  - deobfuscation
description: ビルド時に難読化された値を元のテキストにマッピングするプライバシー辞書を生成することで、ミニファイ済みビルドで可読性のあるRUMアクション名を復元します。
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: ドキュメント
  text: ユーザーアクションの追跡
- link: /data_security/real_user_monitoring
  tag: ドキュメント
  text: RUM のデータセキュリティ
- link: https://www.datadoghq.com/blog/rum-build-time-privacy-allowlist/
  tag: ブログ
  text: ビルド時に許可リストを用いて機密データの露出を削減します。
- link: https://github.com/DataDog/build-plugins
  tag: ソースコード
  text: DatadogビルドプラグインのGitHubリポジトリ
title: アクション名の難読化解除
---
## 概要 {#overview}

[`enablePrivacyForActionName`][1] 初期化パラメーターを有効にすると、プライバシー保護のためにアクション名がマスクされます。ミニファイ済みビルドでは、バンドラーがRUMによるアクション名の生成に使用されるDOM要素のテキストや属性を難読化するため、アクション名が読み取れなくなることがあります。

アクション名の難読化解除ビルドプラグインは、ビルド時にソースコードをインストゥルメント化して、難読化された値を元のテキストにマッピングするプライバシー辞書を生成することで、両方の問題に対処します。RUM SDKはこの辞書を使用して、読み取り可能なアクション名を解決します。

## 前提条件 {#prerequisites}

- RUM SDKは`trackUserInteractions: true`および`enablePrivacyForActionName: true`で初期化されています。[すべてのアクション名をマスクする][1] を参照してください。
- Datadogビルドプラグインがインストールされ、バンドラーに登録されています。インストール手順については、[ビルドプラグイン][2] を参照してください。

## 構成 {#configuration}

ビルドプラグインオプションで`rum.privacy`オブジェクトを設定してください。

|  パラメーター |  型 |  必須 |  デフォルト |  説明 |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` |  RegExpまたはStringの配列 |  いいえ |  JS/TSファイル（.js、.ts、.jsx、.tsx、.mjs、.cjs、およびそのバリエーション） |  アクション名の難読化解除のために処理するファイルパターン。|
| `rum.privacy.exclude` |  RegExpまたはStringの配列 |  いいえ | `node_modules`、 `.preval.` ファイル |  除外するファイルパターン。|

##  例 {#example}

デフォルト設定 （すべてのJS/TSファイルを処理し、`node_modules`を除外）の場合：

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {},
      },
    }),
  ],
};
```

カスタムのインクルードおよび除外パターンを使用する場合：

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {
          include: [/\.jsx?$/, /\.tsx?$/],
          exclude: [/\/node_modules\//, /\/test\//],
        },
      },
    }),
  ],
};
```

<div class="alert alert-info">これらの例ではwebpackを使用しています。設定オブジェクトは、サポートされているすべてのバンドラーで同一です。インストール手順については、<a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a>を参照してください。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names
[2]: /ja/real_user_monitoring/application_monitoring/browser/build_plugins/