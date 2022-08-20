---
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: ドキュメント
  text: サービス定義 API
kind: documentation
title: サービスカタログの設定
---

## 概要

Service Catalog ページで、**Registered** の欄に緑色のチェックマークがついていれば、該当のサービスがカタログに登録されており、API を使って[サービス定義を更新][1]することができます。

## すでに APM データを送信しているサービスの場合

Datadog APM にトレースデータを送信するサービスは、自動的にサービスカタログに登録されます。登録するまでは、カーソルを合わせるとグレーのチェックマークが表示されます。

サービスを登録し、所有者情報、ランブックなどの関連リンク、ソースコードリポジトリへのリンクを追加するには、[サービス定義の更新][1]を行ってください。

[Service Catalog > Get Started][2] から、API で投稿するための有効な JSON を作成するためのヘルプを得ることができます。

## カタログにポストしたい他のすべてのサービスの場合

関心があるサービス、API、カスタムライブラリがカタログページに掲載されていない場合

1. [Get Started][2] に移動します。

2. **Register Services** フォームでは、Service Catalog API のエンドポイントにポストできる JSON を生成することができます。`dd-service` フィールドにサービス名を入力します。所有権、ソース、その他のサービス情報を、Service Definition スキーマに入力します。詳細については、[GitHub の JSON スキーマの全容][3]を参照してください。

3. 生成された JSON をコピーするために、**Copy** ボタンをクリックします。これを [Service Definition API][1] を使って `POST` API 呼び出しの `body` として送信します。


## 他の Datadog テレメトリーデータで報告されているサービスを発見する

<div class="alert alert-warning">これはベータ版の機能です。</div>

インフラストラクチャーメトリクスなど、既存の Datadog テレメトリーを通じて他のサービスを検出するには、**Discover Services** タブに移動し、そこにある指示に従ってください。ディスカバリーは、`DD_SERVICE` [統合サービスタグ付け規則][4]を使用して、Datadog の組織にデータを送信するサービスを探します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/service_catalog/service_definition_api/
[2]: https://app.datadoghq.com/services/setup
[3]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[4]: /ja/getting_started/tagging/unified_service_tagging