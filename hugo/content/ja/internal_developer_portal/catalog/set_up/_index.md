---
aliases:
- /ja/software_catalog/set_up
- /ja/tracing/software_catalog/guides/validating-service-definition
- /ja/software_catalog/guides/validating-service-definition
- /ja/tracing/service_catalog/guides/validating-service-definition
- /ja/service_catalog/guides/validating-service-definition
- /ja/service_catalog/use_cases/validating_service_definition
- /ja/software_catalog/use_cases/validating_service_definition
- /ja/software_catalog/customize/
- /ja/software_catalog/manage_entries/
- /ja/software_catalog/enrich_default_catalog/
- /ja/service_catalog/manage_entries/
- /ja/service_catalog/enrich_default_catalog/
- /ja/service_catalog/customize/
- /ja/software_catalog/best-practices
- /ja/software_catalog/guides/best-practices
- /ja/service_catalog/guides/best-practices
- /ja/service_catalog/use_cases/best_practices
- /ja/software_catalog/use_cases/best_practices
- /ja/software_catalog/navigating
- /ja/tracing/software_catalog/browsing
- /ja/software_catalog/browsing
- /ja/tracing/service_catalog/browsing
- /ja/service_catalog/browsing
- /ja/service_catalog/navigating
- /ja/software_catalog/manage
- /ja/tracing/software_catalog/investigating
- /ja/software_catalog/investigating/
- /ja/tracing/software_catalog/guides/understanding-service-configuration
- /ja/software_catalog/guides/understanding-service-configuration/
- /ja/tracing/service_catalog/investigating
- /ja/service_catalog/investigating/
- /ja/tracing/service_catalog/guides/understanding-service-configuration
- /ja/service_catalog/guides/understanding-service-configuration/
- /ja/api_catalog/add_metadata
- /ja/api_catalog/owners_and_tags
- /ja/service_catalog/manage
- /ja/internal_developer_portal/software_catalog/set_up
description: Datadog テレメトリからエンティティを検出する、エンティティ定義を手動で作成する、または Backstage や ServiceNow
  などのサードパーティソースからインポートすることにより、カタログにデータを入力します。
further_reading:
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: ブログ
  text: サービス定義 JSON スキーマによる Service Catalog エントリの管理
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: ブログ
  text: 簡素化された Service Catalog 設定によりサービスにタグやメタデータを簡単に追加する
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: ブログ
  text: 私は GitHub Actions を Datadog の Service Catalog に使っています。あなたもそうするべきですよ
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: ブログ
  text: Datadog Service Catalog を使ったエンドツーエンドのサービス所有権管理のベストプラクティス
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: ラーニングセンター
  text: カタログによるサービスの管理
title: カタログのセットアップ
---
## 概要{#overview}

カタログエンティティは、Kubernetes スタイルの YAML 構成ファイルである[エンティティ定義][1]により定義されます。

カタログにデータを入力するには、以下の方法があります。
- Datadog Application Performance Monitoring (APM)、Universal Service Monitoring (USM)、Real User Monitoring (RUM)、インフラストラクチャーメトリクス、またはログをセットアップすると、エンティティデータがカタログに自動的にフィードされます。
- エンティティ定義を手動または自動化によって作成します。
- サードパーティから既存のエンティティ定義をインポートします。

## Datadog からエンティティを自動的に検出する{#automatically-discover-entities-from-datadog}

デフォルトでは、APM、USM、RUM から検出されたエントリがカタログに自動的に入力されます。ログなど、他の Datadog テレメトリからエントリを手動でインポートすることもできます。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum" >}}APM、USM、RUM から検出する{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/discover_entities#import-entities-from-infrastructure-and-logs" >}}インフラストラクチャーおよびログからインポートする{{< /nextlink >}}
{{< /whatsnext >}}

### APM{#apm}

Datadog SDK または OpenTelemetry を使用してアプリケーションコードをインスツルメンテーションすると、アプリケーションはトレースを出力し、サンプリングされていないトレースメトリクスを生成します。これらのトレースとメトリクスは、IDP のエンティティ検出および依存関係マッピング機能の入力になります。インスツルメンテーションの選択 (Datadog Agent のバージョン、SDK のバージョン、カスタムインスツルメンテーションやサービスオーバーライドを使用するかどうかなど) は、依存関係マッピングの品質と精度に影響します。詳細については、「[APM、USM、RUM からの検出][5]」を参照してください。

### USM{#usm}

USM は、ゴールデンシグナルメトリクス (リクエスト数、エラー数、処理時間など) を検出し、eBPF に基づいてアプリケーションの依存関係をマッピングします。アプリケーションコードのインスツルメンテーションは必要ありません。

### RUM{#rum}

RUM は、ページパフォーマンス、エラー、セッションイベント、ビューなどのフロントエンドのユーザーエクスペリエンスデータを提供します。RUM アプリケーションがある場合、それらはコンポーネントセレクターの **Frontend Apps** としてカタログに表示されます。

### その他の Datadog テレメトリ{#other-datadog-telemetries}

ログ、ホストメトリクス、コンテナメトリクス、ネットワークメトリクス、プロセスメトリクスなどの Datadog テレメトリから識別されるエンティティをインポートすることもできます。

[**エンティティのインポート**][10]を使用してデータソースを選択すると、Datadog はそのソースをクエリし、有効な `DD_SERVICE` タグを検索します。エンティティには `kind:service` 属性がマークされます。

**注**: これを実行するのは、`DD_SERVICE` タグが適切に管理されており、無関係または不正確なタグ値が含まれていない場合のみにしてください。

## エンティティを作成する{#create-entities}

エンティティ YAML ファイルで定義される[エンティティ定義][1] は、カタログの信頼できる情報源です。以下が可能です。
- Datadog を使用してエンティティ定義を手動で作成する。
- 定義を GitHub または GitLab リポジトリに保存し、[ソースコード統合][6]を設定して定義を IDP と同期する。ファイルに加えられた変更は、数分以内に Datadog に反映されます。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/create_entities#through-the-datadog-ui" >}}Datadog UI を使用して作成する{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/create_entities#through-automation" >}}コード自動化を使用して作成する{{< /nextlink >}}
{{< /whatsnext >}}

**注**: エンティティをそのテレメトリに自動的に関連付けるには、定義内の `name` フィールドがテレメトリデータのプライマリ識別子と正確に一致している必要があります。ほとんどのサービスでは、これは Datadog の unified service tagging で定義されている `service` タグです。[`kind:datastore`][7]、[`kind:queue`][8]、およびその他の [`entity types`][9] の例を参照してください。

## エンティティをインポートする{#import-entities}

Backstage または ServiceNow CMDB でソフトウェアインベントリを管理している場合は、これらのインベントリを Datadog のカタログに同期できます。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage" >}}Backstage からインポートする{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow" >}}ServiceNow からインポートする{{< /nextlink >}}
{{< /whatsnext >}}

### Backstage{#backstage}

Backstage エンティティを Datadog の IDP に取り込むには、次の 2 つの方法があります。
1. [Datadog の Backstage プラグイン][11]をインストールする。
1. Datadog API、Terraform、または Datadog の GitHub インテグレーションを使用して、エンティティ記述子ファイルを Backstage から IDP にインポートする。

### ServiceNow{#servicenow}

ServiceNow CI テーブルに対する定期的なクエリを設定することで、ServiceNow CMDB インベントリを Datadog のカタログと同期します。

## エンティティ所有権を定義する{#define-entity-ownership}

エンティティをチームにリンクすることで、Datadog 製品全体でのチームベースのフィルタリングを有効にし、適切な所有者に通知をルーティングし、Scorecards やキャンペーンを通じて説明責任を促進します。詳細については、[カタログエンティティの所有権の定義][12]を参照してください。

## 構成の完全性を検証する{#verify-configuration-completeness}

トレーシング、ロギング、コードプロファイリングなどの監視のベストプラクティスに従うことは、インシデントのトリアージ中に必要なすべてのデータを確実に取得する上で役立ちます。カタログは、これらの推奨設定に対する自動チェックを提供します。

エンティティの構成の完全性を確認するには、[カタログ][2]でエンティティをクリックし、[**Setup Guidance**] (セットアップガイダンス) タブを見つけます。

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="[Setup Guidance] タブが強調表示されたカタログ。" >}}

[Setup Guidance] テーブルは、必ずしも個々の製品の請求を反映するものではなく、現在調査中のエンティティのアクティビティを反映するものです。たとえば、インフラストラクチャー監視を実行しているホストやコンテナがあっても、サービスが長期間インフラストラクチャー メトリクスを出力しない場合や、`Infrastructure Monitoring` に `Not Detected` が指定されている場合です。

## ロールベースアクセスおよび権限を構成する{#configure-role-based-access-and-permissions}

一般的な情報は、[ロールベースアクセスコントロール][3]および[ロール権限][4]を参照してください。

### 読み取り権限{#read-permission}

カタログの読み取り権限により、ユーザーはカタログデータを読み取ることができ、以下の機能が有効になります。
- カタログ一覧表示
- Discover UI
- サービス定義エンドポイント: `/api/v2/services/definition/<service_name>`

**Datadog Read Only Role** および **Datadog Standard Role** の場合、この権限はデフォルトで有効になっています。

### 書き込み権限{#write-permission}

カタログの書き込み権限により、ユーザーはカタログデータを変更できます。書き込み権限は、以下の機能に必要です。
-  `POST /api/v2/services/definitions` エンドポイントを使用したサービス定義の挿入または更新
-  `DELETE /api/v2/services/definition/<service_name>` エンドポイントを使用したサービス定義の削除
- Discover Services UI でのオンボーディングプロセスの完了
- UI でのサービスメタデータの更新

**Datadog Admin Role** および **Datadog Standard Role** の場合、この権限はデフォルトで有効になっています。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/internal_developer_portal/catalog/entity_model
[2]: https://app.datadoghq.com/software
[3]: /ja/account_management/rbac
[4]: /ja/account_management/rbac/permissions
[5]: /ja/internal_developer_portal/catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[6]: /ja/integrations/guide/source-code-integration/
[7]: /ja/internal_developer_portal/catalog/entity_model/native_entities/?tab=datastore#datastore-peer-tags
[8]: /ja/internal_developer_portal/catalog/entity_model/native_entities/?tab=queue#datastore-peer-tags
[9]: /ja/internal_developer_portal/catalog/entity_model?tab=v30
[10]: https://app.datadoghq.com/software/settings/get-started
[11]: https://www.npmjs.com/package/@datadog/backstage-plugin-datadog-entity-sync-backend
[12]: /ja/internal_developer_portal/catalog/set_up/ownership