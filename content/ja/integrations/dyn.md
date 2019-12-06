---
categories:
  - network
  - web
ddtype: クローラー
dependencies: []
description: ゾーン変更を監視し、ゾーンまたはレコード別に秒単位でクエリを追跡
doc_link: 'https://docs.datadoghq.com/integrations/dyn/'
git_integration_title: dyn
has_logo: true
integration_title: Dyn
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: dyn
public_title: Datadog-Dyn インテグレーション
short_description: ゾーン変更を監視し、ゾーンまたはレコード別に秒単位でクエリを追跡
version: '1.0'
---
{{< img src="integrations/dyn/dyn_overview.png" alt="Dyn Overview" responsive="true" popup="true">}}

## 概要

最先端のグラフやイベントを使用してゾーンを監視します。

* ゾーンが更新されたときに行われる変更を追跡します。
* 最先端のグラフ作成ツールを利用してゾーンまたはレコードタイプ別の QPS を分析します。

## セットアップ
### コンフィグレーション 

Dyn で `datadog` 読み取り専用ユーザーをまだ作成していない場合は、[Dyn にログイン][1]し、以下の手順を実行します。

1. ユーザー名とパスワードを選択します。 
{{< img src="integrations/dyn/create_dyn_user.png" alt="Create dyn user" style="width:75%;" responsive="true" popup="true">}}

2. **READONLY** ユーザーグループを選択します。
{{< img src="integrations/dyn/choose_dyn_group.png" alt="Choose dyn group" style="width:75%;" responsive="true" popup="true">}}

3. **Add New User** をクリックします。

Datadog 読み取り専用ユーザーを作成し、次の手順を行います。

1. Datadog アプリケーションで [Dyn インテグレーション][2]を構成します。
{{< img src="integrations/dyn/dyn_integration.png" alt="Dyn Integration" style="width:75%;" responsive="true" popup="true">}}

2. イベントと `dyn.changes` メトリクスを収集するゾーン (Zone Note) を選択します。<br>

{{< img src="integrations/dyn/dyn_zone.png" alt="Dyn zone" style="width:75%;" responsive="true" popup="true">}}

デフォルトでは、すべてのゾーンの Dyn 「QPS」メトリクスが収集されます。

<div class="alert alert-info">
Dyn インテグレーションでは、IP ACL を無効にする必要があります。
</div>

## 収集データ
### メトリクス
{{< get-metrics-from-git "dyn" >}}


**注**: `dyn.qps` メトリクスは、現在の時刻から約 90 分後に Datadog で使用できるようになります。

### イベント
Dyn インテグレーションには、イベントは含まれません。

### サービスのチェック
Dyn インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://manage.dynect.net/login
[2]: https://app.datadoghq.com/account/settings#integrations/dyn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/dyn/dyn_metadata.csv
[4]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}