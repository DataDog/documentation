---
further_reading:
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog サービスカタログ
is_beta: true
kind: documentation
title: Datadog API カタログ
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、API カタログはサポートされていません。</div>
{{< /site-region >}}

{{< beta-callout url="" btn_hidden="true">}}
Datadog API カタログはベータ版です。
{{< /beta-callout >}}

{{< img src="tracing/api_catalog/api-catalog-catalog-api-details.png" alt="API カタログに、Checkout という API のエンドポイントのリストと、所有権、サービス、環境、タグ、関連モニターへのリンク、テスト、パフォーマンスデータに関する情報が表示されている様子。" style="width:100%;" >}}

## 概要

API カタログは、すべての API エンドポイントのパフォーマンス、信頼性、所有権を一箇所で確認するための単一のビューとエントリポイントを提供します。社内サービス (プライベート API) や外部ユーザー (一般公開された API) が使用する API の特性に関する最新情報を全社的に確認できる中心的な場所です。

ミッションクリティカルな API によって駆動されるビジネス機能を監視し、API パフォーマンスの期待値を標準化して検証し、パフォーマンスが期待値から逸脱した場合はアラートで通知します。

API カタログにより、チームは次のことが可能になります。
- 重要な API とそれに依存するビジネス機能の高い可用性とアップタイムを提供する。
- API の機能回帰や不安定性の問題を防止する。
- インシデントの迅速なトリアージ。

API カタログは、Datadog 全体からのデータを組み合わせ、特定の方法論に基づいたワークフローを提供することで、異なるソースからの API を一つの統一されたビューで確認および監視することができます。API カタログは次の機能を提供します。

- **自動発見機能** - 公開、非公開、パートナー API を一元管理するインベントリで、ここでは_エンドポイント_が構成の基本単位です。
- Datadog の異なるソースからの** API メタデータの相関と直接リンク**。
- **Last Seen**、**Requests**、**Latency**、**Errors** などの **API エンドポイントメトリクス**を用いて、パフォーマンスの問題を特定し、API の健全性を追跡。
- 定義されたパフォーマンスの期待値やしきい値から逸脱したエンドポイントに対する**アラート**。
- 各エンドポイントに直接関連付けられた API **所有者情報** (チーム、オンコール、通信チャンネル) を利用して、インシデントを迅速に解決し、何か問題が発生した際の連絡先を把握。
- **API モニター、Synthetic テスト、セキュリティシグナル**のカバレッジとステータスに関するビューと、インシデント、トラブルシューティング、脆弱性調査に関する詳細情報への直接アクセス。

<div class="alert alert-info">API カタログの機能の理解には、主要な用語についての背景知識が重要です。詳細については、<a href="/tracing/api_catalog/get_started/#key-terminology">主要な用語</a>を参照してください。</div>

## はじめに

すでに APM を使用してサービスのパフォーマンスを監視している場合、API カタログが、インスツルメンテーションされたサービス内の API とエンドポイントを自動的に検出します。

自動検出されないサービスの API とエンドポイントを追加する方法を含め、詳細については [API カタログの設定][3]を参照してください。

## エンドポイントの確認とカタログ登録

すべてのエンドポイントを見るには API Catalog Explorer ページを使用し、フィルタリングや検索をしたり、ファセットやタイムフレームを利用して、関心のある特定のエンドポイントを見つけます。

エンドポイントには意味のあるタグと所有権情報を追加し、カタログを調査やチーム内コミュニケーションにできるだけ役立てられるようにします。

詳細については、[エンドポイントの確認とカタログ登録][6]をお読みください。

## API の監視

API とエンドポイントの監視を始めるには、フルカタログを利用します。
- パフォーマンスが低下しているエンドポイントを見つけ、修正する。
- 基準と目標に照らし合わせて信頼性を追跡する
- 異常を監視する
- エラーを調査する。
- テストカバレッジを確保する。
- セキュリティギャップを解消する。

詳細については、[API の監視][7]をお読みください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/apis/catalog
[2]: /ja/tracing/service_catalog/
[3]: /ja/tracing/api_catalog/get_started/
[6]: /ja/tracing/api_catalog/explore_and_catalog_apis/
[7]: /ja/tracing/api_catalog/monitor_apis/