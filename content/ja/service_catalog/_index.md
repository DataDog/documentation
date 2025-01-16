---
algolia:
  tags:
  - service catalog
aliases:
- /ja/tracing/faq/service_catalog/
- /ja/tracing/services/services_list/
- /ja/tracing/visualization/services_list/
- /ja/tracing/service_catalog/
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: ドキュメント
  text: Service Definition API によるサービスの登録
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 外部サイト
  text: Terraform によるサービス定義の作成と管理
- link: /tracing/service_catalog/guides/upstream-downstream-dependencies
  tag: ガイド
  text: アクティブインシデント時の上流と下流の依存関係を見る
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: ブログ
  text: サービス定義 JSON スキーマによるサービスカタログエントリーの管理
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を視覚化する
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: ブログ
  text: サービスカタログの設定を簡素化することで、サービスにタグやメタデータを簡単に追加できます
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: ブログ
  text: 私は GitHub Actions を Datadog のサービスカタログに使っています。あなたもそうするべきですよ
- link: https://www.datadoghq.com/blog/shift-left-datadog-service-catalog/
  tag: ブログ
  text: Datadog サービスカタログを活用して、シフトレフト型オブザーバビリティを向上させましょう。
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: ブログ
  text: Datadog サービスカタログを使ったエンドツーエンドのサービス所有権管理のベストプラクティス
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: ブログ
  text: サービスカタログのスキーマバージョン 3.0 で、開発者の体験とコラボレーションを向上
title: Datadog サービスカタログ
---

{{< img src="tracing/service_catalog/service_catalog_updated.mp4" video=true alt="サービスカタログのナビゲーション" style="width:100%;" >}}

## 概要

Datadog [サービスカタログ][1]は、所有権メタデータ、パフォーマンスインサイト、セキュリティ分析、コスト配分などを統合し、サービス全体を一つのビューで提供します。これにより、組織はスケールに応じたエンドツーエンドのサービス所有権を簡単に実現し、リアルタイムのパフォーマンスインサイトを取得し、信頼性やセキュリティリスクを検出・対応し、アプリケーションの依存関係を一元的に管理することができます。

{{< callout url="https://www.datadoghq.com/product-preview/internal-developer-portal/" d_target="#signupModal" btn_hidden="false" header=" 当社の Internal Developer Portal のプレビューにぜひご参加ください！ " >}}
{{< /callout >}}

### ユースケース

#### サービスの発見
- Datadog サービスカタログには、APM、USM、RUM から発見されたすべてのサービスがデフォルトで含まれています。これらの製品を使用している場合、カタログは事前にエントリで満たされています。
- 環境内のさまざまなアプリケーションをインスツルメントすると、それらは自動的にサービスカタログに追加されます。

#### 依存関係のマッピングと管理
- APM、USM、RUM によって収集されたアプリケーションのテレメトリーにより、アップストリームとダウンストリームのすべての依存関係を自動的に文書化し、追跡する。
- コンポーネント間の依存関係を手動で宣言する ([メタデータスキーマ v3.0][8]で利用可能)。
- チーム間およびサービス間のパフォーマンス影響を理解し、評価する。

#### ガバナンスと最適化
- [サービススコアカード][9]を通じて、エンジニアリング担当の幹部社員に、チームやサービス全体のベストプラクティスの概要を提供する。
- サービスの依存関係の中に存在する既知のセキュリティ脆弱性を見つけて修正することで、アプリケーションのリスクを低減する。
- サービスに関連するコストの傾向を把握し、非効率性を特定する。

#### 知識の共有 
- 数多くのリポジトリ、チャンネル、ドキュメントページを探し回ることなく、情報を見つける。
- 新しいチームメンバーのオンボーディング時にランブックや wiki ページの検索時間を短縮する。
- リアルタイムで自動生成されるトポロジーマップを活用して、システムのアーキテクチャを理解する。

#### モニタリングカバー範囲を評価
- 可観測性データを報告していないサービスや、そのデータが監視されていないサービスを検出する。
- [タグ付けのベストプラクティス][6]を促進し、推奨されるセットアップ構成を確認して、[クロステレメトリーインサイト][7]を最適化する。
- SLO、モニター、オーナーシップのないサービスなどの問題を発見する。

#### インシデント発生中のコラボレーションをスムーズに
- 正しい所有者情報とコミュニケーションチャンネルを確立し、モニタリングとトラブルシューティングの詳細へのアクセスを合理化することで、すべての人のオンコール経験を向上させる。
- エンジニアが既に使用している可観測性ツールに、ランブックやドキュメントなどのソリューションやトラブルシューティングツールへのリンクを直接埋め込む。
- 信頼性を高め、上流と下流のサービスや依存関係の所有者を簡単に特定することで、インシデントの復旧をスピードアップする。


## はじめに

{{< whatsnext desc="サービスカタログの提供内容をご確認ください。" >}}
    {{< nextlink href="/service_catalog/navigating/" >}}サービスカタログの操作{{< /nextlink >}}
    {{< nextlink href="/service_catalog/investigating" >}}サービスの調査{{< /nextlink >}}
{{< /whatsnext >}}

## ロールベースアクセスおよび権限

一般的な情報は、[ロールベースアクセスコントロール][2]および[ロール権限][3]を参照してください。
### 読み取り権限

サービスカタログの読み取り権限により、サービスカタログのデータを読み取ることができ、以下の機能が有効になります。
- サービスカタログ一覧
- Discover UI
- サービス定義エンドポイント: `/api/v2/services/definition/<service_name>`

この権限は、**Datadog Read Only Role** および **Datadog Standard Role** でデフォルトで有効になっています。

### 書き込み権限

サービスカタログの書き込み権限は、ユーザーがサービスカタログのデータを変更することを許可します。書き込み権限は、以下の機能に対して必要です。
- `POST /api/v2/services/definitions` エンドポイントを使ったサービス定義の挿入または更新
- `DELETE /api/v2/services/definition/<service_name>` エンドポイントを使ったサービス定義の削除
- Discover Services UI でオンボーディングプロセスを完了する
- UI でのサービスメタデータの更新

この権限は、**Datadog Admin Role** および **Datadog Standard Role** でデフォルトで有効になっています。

{{< site-region region="gov" >}}
## サービスタイプ

アプリケーションによって監視されるすべてのサービスは、タイプに関連付けられています。Datadog は、受信したスパンデータに付けられた `span.type` 属性に基づいて、このタイプを自動的に決定します。このタイプは、Datadog Agent が統合しているアプリケーションやフレームワークの名前を指定します。

たとえば、Flask の公式インテグレーションを使用している場合は、`Type` が "Web" にセットされ、カスタムアプリケーションを監視している場合は、`Type` が "Custom" にセットされます。

サービスのタイプは次のいずれかに設定されます。

*  Cache
*  Custom
*  DB
*  サーバーレス関数
*  Web

 一部のインテグレーションには特定のタイプへのエイリアスが設定されています。たとえば、Postgres、MySQL、Cassandra は「DB」タイプに、Redis および Memcache は「Cache」タイプに対応します。
{{< /site-region >}}
{{< site-region region="ap1,us3,us5,eu,us" >}}
## コンポーネント別にサービスカタログエントリをフィルタリング

サービスカタログに表示されるすべてのエントリは、コンポーネントタイプとして分類されます。

*  サービス
*  データストア
*  キュー
*  RUM アプリケーション
*  外部プロバイダー

{{< img src="tracing/service_catalog/component_selector.png" alt="サービスカタログのコンポーネントセレクター" style="width:30%;" >}}

Datadog は、APM ([peer タグ][10]) で収集したスパン属性だけでなく、USM、DSM、RUM などの他のテレメトリータイプも考慮して、サービスカタログのエントリを自動補完し、関連するコンポーネントタイプを判定します。

**注**: コンポーネントは、`span.type` スパン属性に由来する `type` フィルターよりも優先されます。これは、より信頼性が高く、きめ細かな粒度でさまざまなエンティティタイプを検出できるためです。例えば、`datastore type` ファセットを使用してデータストア技術でフィルタリングできます。

[10]: /ja/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

## データ保持
**サービスリスト**と**サービスページ**のサービスとリソースの統計、およびスパンのサマリーは、最大で 30 日間保持されます。APM トレースメトリクスをカスタムクエリするには、メトリクスエクスプローラーを使用してください。[APM のデータ保持の詳細はこちら][4]。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/account_management/rbac/
[3]: /ja/account_management/rbac/permissions/
[4]: /ja/developers/guide/data-collection-resolution-retention/
[5]: /ja/tracing/service_catalog/adding_metadata#service-definition-schema-v22
[6]: https://www.datadoghq.com/blog/tagging-best-practices/#assign-owners-to-services-with-tags
[7]: /ja/tracing/other_telemetry/
[8]: /ja/service_catalog/add_metadata#metadata-schema-v30-beta
[9]: /ja/service_catalog/scorecards/