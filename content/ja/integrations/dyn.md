---
categories:
- network
- metrics
- oracle
dependencies: []
description: ゾーン変更を監視し、ゾーンまたはレコード別に秒単位でクエリを追跡。
doc_link: https://docs.datadoghq.com/integrations/dyn/
draft: false
git_integration_title: dyn
has_logo: true
integration_id: ''
integration_title: Dyn
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: dyn
public_title: Datadog-Dyn インテグレーション
short_description: ゾーン変更を監視し、ゾーンまたはレコード別に秒単位でクエリを追跡。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/dyn/dyn_overview.png" alt="Dyn 概要" popup="true">}}

## 概要

<div class="alert alert-warning">
Oracle Cloud Infrastructure は 2016 年に Dyn を買収し、Dyn の製品とサービスを Oracle Cloud Infrastructure プラットフォームにインテグレーションしました。サービスの移行については、<a href="https://www.oracle.com/corporate/acquisitions/dyn/technologies/migrate-your-services/" target="_blank">Dyn サービスの Oracle Cloud Infrastructure への移行</a>を参照してください。
</div>


最先端のグラフやイベントを使用してゾーンを監視します。

- ゾーンが更新されたときに行われる変更を追跡します。
- 最先端のグラフ作成ツールを利用してゾーンまたはレコードタイプ別の QPS を分析します。

## 計画と使用

### ブラウザトラブルシューティング

Dyn で `datadog` 読み取り専用ユーザーをまだ作成していない場合は、[Dyn にログイン][1]し、以下の手順を実行します。

1. ユーザー名とパスワードを選択します。 
   {{< img src="integrations/dyn/create_dyn_user.png" alt="dyn ユーザーを作成" style="width:75%;" popup="true">}}

2. **READONLY** ユーザーグループを選択します。
   {{< img src="integrations/dyn/choose_dyn_group.png" alt="dyn グループを選択" style="width:75%;" popup="true">}}

3. **Add New User** をクリックします。

Datadog 読み取り専用ユーザーを作成し、次の手順を行います。

1. インテグレーションタイルを使用して Datadog [Dyn インテグレーション][2]を構成:
   {{< img src="integrations/dyn/dyn_integration.png" alt="Dyn インテグレーション" style="width:75%;" popup="true">}}

2. イベントと `dyn.changes` メトリクスを収集するゾーン (_Zone notes_) を選択します。<br>

{{< img src="integrations/dyn/dyn_zone.png" alt="Dyn ゾーン" style="width:75%;" popup="true">}}

デフォルトでは、すべてのゾーンの Dyn `QPS` メトリクスが収集されます。

<div class="alert alert-info">
Dyn インテグレーションでは、IP ACL を無効にする必要があります。
</div>

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "dyn" >}}


**注**: `dyn.qps` メトリクスは、現在の時刻から約 90 分後に Datadog で使用できるようになります。

### ヘルプ

Dyn インテグレーションには、イベントは含まれません。

### ヘルプ

Dyn インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://manage.dynect.net/login
[2]: https://app.datadoghq.com/integrations/dyn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/dyn/dyn_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/