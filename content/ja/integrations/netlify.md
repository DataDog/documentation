---
categories:
- コラボレーション
- ログの収集
- プロビジョニング
dependencies: []
description: Netlify ログを追跡します。
doc_link: https://docs.datadoghq.com/integrations/netlify/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-netlify-with-datadog/
  tag: ブログ
  text: Datadog で Netlify サイトを監視
git_integration_title: netlify
has_logo: true
integration_id: netlify
integration_title: Netlify
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: netlify
public_title: Datadog-Netlify インテグレーション
short_description: Netlify ログを追跡します。
team: web-integrations
type: ''
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

[Netlify][1] は、顧客が動的で高性能のウェブアプリを構築しデプロイできる Jamstack ウェブ開発プラットフォームです。

Netlify を Datadog と統合すると、以下のことができます。

* [Datadog のログ管理機能][2]を使用して関数およびトラフィックのログを表示、解析
* アプリケーションへのリクエスト数を HTTP ステータスコード別に詳しく確認
* 関数の実行時間を視覚化し、各リクエストの対応するログを確認
* [Datadog Synthetics Monitoring][3] によるフロントエンドのパフォーマンス監視

## 計画と使用

1. [Datadog API キー][4]を生成します。
2. [Netlify ログドレイン][5]を構成してログを Datadog へ送信します。

## リアルユーザーモニタリング

### データセキュリティ

Netlify インテグレーションには、メトリクスは含まれません。

### ヘルプ

Netlify インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

Netlify インテグレーションには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.netlify.com/
[2]: https://docs.datadoghq.com/ja/logs/
[3]: https://docs.datadoghq.com/ja/synthetics/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.netlify.com/monitor-sites/log-drains/
[6]: https://docs.datadoghq.com/ja/help/