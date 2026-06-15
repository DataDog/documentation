---
aliases:
- /ja/tracing/software_catalog/setup
- /ja/software_catalog/setup
- /ja/tracing/service_catalog/setup
- /ja/service_catalog/setup
title: Software Catalog をセットアップ
---

Datadog Software Catalog は、サービス、データストア、キュー、フロントエンド アプリケーション、API などのソフトウェア コンポーネントを追跡/管理するための集中レジストリです。チーム、オンコール、ランブック、ソース コード リンクなどのコンポーネント属性は、Kubernetes 形式の YAML 設定ファイルである [エンティティ定義][1] で管理します。

Software Catalog の [自動検出][2] 機能により、Datadog の APM、USM、RUM 製品を利用している既存ユーザーの場合、監視対象のコンポーネントがあらかじめカタログに登録されます。自動登録された Software Catalog を拡張するには、監視対象外のコンポーネントを表すエンティティ定義を作成して追加します。

APM、USM、RUM の利用状況に応じて、次のセットアップ手順のいずれかに進んでください。

## Datadog を初めて使う場合

{{< whatsnext desc=" " >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#build-your-first-software-catalog" >}}最初の Software Catalog を構築する{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#import-entries-from-backstage" >}}Backstage からエントリをインポートする{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#import-entries-from-servicenow" >}}ServiceNow からエントリをインポートする{{< /nextlink >}}
{{< /whatsnext >}}

## 既存の Datadog ユーザー

{{< whatsnext desc=" " >}}
    {{< nextlink href="/software_catalog/set_up/existing_datadog_user#automatic-discovery-with-apm-usm-and-rum" >}}APM、USM、RUM ユーザー{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/existing_datadog_user#discover-infrastructure-and-logs-services" >}}Infrastructure と Logs ユーザー{{< /nextlink >}}
{{< /whatsnext >}}

## ロール ベースのアクセス制御と権限

一般的な情報については、[ロール ベース アクセス制御][2] と [ロール権限][3] を参照してください。
### 読み取り権限

Software Catalog の読み取り権限により、Software Catalog のデータを参照できるようになり、次の機能が利用できます:
- Software Catalog 一覧
- Discover UI
- サービス定義エンドポイント: `/api/v2/services/definition/<service_name>`

この権限は、**Datadog Read Only Role** および **Datadog Standard Role** でデフォルトで有効になっています。

### 書き込み権限

Software Catalog の書き込み権限により、Software Catalog のデータを変更できます。次の機能には書き込み権限が必要です:
- `POST /api/v2/services/definitions` エンドポイントを使ったサービス定義の挿入または更新
- `DELETE /api/v2/services/definition/<service_name>` エンドポイントを使ったサービス定義の削除
- Discover Services UI でオンボーディングプロセスを完了する
- UI でのサービスメタデータの更新

この権限は、**Datadog Admin Role** および **Datadog Standard Role** でデフォルトで有効になっています。

[1]: /ja/software_catalog/service_definitions/
[2]: /ja/software_catalog/set_up/existing_datadog_user/#automatic-discovery-with-apm-usm-and-rum