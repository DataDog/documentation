---
aliases:
- /ja/tracing/api_catalog/get_started
- /ja/tracing/api_catalog/
- /ja/api_catalog/
- /ja/api_catalog/endpoint_discovery/
- /ja/software_catalog/endpoints/discover_endpoints
- /ja/service_catalog/endpoints/discover_endpoints
- /ja/service_catalog/endpoints/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: ブログ
  text: Datadog API カタログで API のパフォーマンス、セキュリティ、所有権を管理する
- link: /tracing/software_catalog/
  tag: ドキュメント
  text: Datadog Software Catalog
- link: /synthetics/api_tests/http_tests/
  tag: ドキュメント
  text: Synthetic API テスト
- link: /security/application_security/how-it-works/#api-security
  tag: ドキュメント
  text: AAP API Security
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: ブログ
  text: API セキュリティの主なリスクを軽減
title: Endpoint Observability
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
 Endpoint Observability は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。
</div>
{{% /site-region %}}

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Software Catalog の Endpoints list で、各エンドポイントのパフォーマンス関連情報を確認できる画面。" style="width:100%;" >}}

## 概要

Software Catalog の [Endpoints list][12] には、API エンドポイントについて把握しておくべき情報が集約されています。社内チーム向けでも外部ユーザー向けでも、すべての API を対象に、パフォーマンス、信頼性、オーナーシップを横断して確認できます。これにより、ミッション クリティカルな API 駆動の機能を、あなたと各チームが効率よく監視し、期待するパフォーマンスを満たしていることを確認できます。

## ユース ケース

Endpoints list は Datadog 全体のデータを組み合わせ、ベスト プラクティスに沿ったワークフローを提供します。主に次のことが可能です。

- **API を自動検出**: 公開 API、非公開 API、パートナー API をエンドポイント単位で整理し、漏れのないインベントリとして維持します。
- **相関データをたどる**: エンドポイント起点で Traces, Logs, Metrics へ遷移し、Datadog の各ソースに散らばった情報を横断的に確認できます。
- **パフォーマンスの問題を特定**: *Last Seen*、*Requests*、*Latency*、*Errors* といったメトリクスで API の健全性を追跡します。
- **アラートを受け取る**: 期待するパフォーマンスとしきい値を定義し、条件を満たしたときにアラートが発報されるようにします。
- **オーナーシップ情報を割り当てる**: 各エンドポイントに担当チーム、on-call、コミュニケーション チャンネルの情報を設定し、エラー発生時の連絡先がすぐ分かるようにします。
- **網羅的なカバレッジを確保**: API Monitors, Synthetic Tests, Security Signals の状態を追跡し、調査に必要な詳細情報へ直接アクセスできます。

## はじめに

HTTP サービスを [Datadog APM][8] で監視している場合、エンドポイントは自動的に Endpoints list に表示されます。

### エンドポイントの探索

エンドポイントに関連するプロパティやメトリクスを閲覧し、クエリできます。

詳しくは [エンドポイントの探索][11] を参照してください。

### エンドポイントの監視

API とエンドポイントを管理・監視することで、次のようなことが可能になります。

- パフォーマンスの低いエンドポイントを見つけて修正します。
- 標準や目標に対する信頼性を追跡します。
- 異常がないか監視します。
- エラーを調査します。
- テストの網羅性を確保します。
- セキュリティ上の脆弱性を解消します。

詳しくは [エンドポイントの監視][7] を参照してください。

### エンドポイントへのオーナー割り当て

Add ownership information to endpoints to streamline investigations and team communication.

詳しくは [オーナーの割り当て][6] を参照してください。

### リストへのエンドポイント追加

自動検出されたエンドポイントを API グループに割り当てることで、利用状況の追跡、オーナーシップの定義、監視ポリシーの設定を一元的に行えます。あるいは、OpenAPI または Swagger ファイルをアップロードして、Endpoints list の機能をフルに引き出すこともできます。

詳しくは [エントリの追加][9] を参照してください。

### API へのメタデータの追加

Datadog の UI または API を使用して API にメタデータを追加するか、GitHub インテグレーションや Terraform を通じて自動化されたパイプラインを使用してメタデータを追加できます。

詳しくは、[API へのメタデータの追加][10]を参照してください。

## 重要な用語

| 用語         | 定義                                                                                                                                                                                                                    |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API          | 2 つのアプリケーションが相互に通信するためのプロトコルとツールの集合です。                                                                                                                                                      |
| API エンドポイント | API で定義されたルールを実装するサーバーまたはサービス上のリソースのアドレス (URL) です。多くの場合、HTTP または RESTful インターフェース経由で提供され、リクエストを処理して対応するレスポンスを返します。 |
| パブリック API  | インターネットからアクセスできる、顧客向けの API エンドポイントです。                                                                                                                                                          |
| プライベート API | *内部 API* とも呼ばれます。組織内での利用に限定して設計され、主にバックエンド サービス間の通信に使われる、最も一般的な API の形態です。                                                   |
| パートナー API | *サードパーティ API* とも呼ばれます。別の組織が提供する公開エンドポイント (Stripe, Google, Facebook など) で、あなたの組織がサービス提供のために利用するものです。                                             |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[3]: /ja/api_catalog/explore_apis/
[6]: /ja/software_catalog/manage
[7]: /ja/software_catalog/endpoints/monitor_endpoints/
[8]: /ja/tracing/trace_collection/
[9]: /ja/software_catalog/customize/create_entries
[10]: /ja/software_catalog/service_definitions/#add-metadata-to-endpoints
[11]: /ja/software_catalog/endpoints/explore_endpoints/
[12]: https://app.datadoghq.com/services?selectedComponent=endpoint