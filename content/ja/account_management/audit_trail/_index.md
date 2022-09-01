---
aliases:
- /ja/account_management/audit_logs/
further_reading:
- link: /account_management/audit_trail/events/
  tag: ドキュメント
  text: さまざまな監査証跡のイベントを見る
- link: /account_management/org_settings/
  tag: ドキュメント
  text: オーガニゼーションの設定について
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog Audit Trail で、チーム全体のコンプライアンス、ガバナンス、透明性を構築します
kind: documentation
title: Datadog Audit Trail（監査証跡）
---

## 概要

管理者またはセキュリティチームのメンバーは、[Datadog 監査証跡][1]を使用して組織内で Datadog を使用しているユーザーとそのコンテキストを確認できます。個人として、自身のアクションをストリームで確認することも可能です。

監査証跡内で発生するイベントには、Datadog API に要求されたすべてのリクエストを顧客リクエストに変換する**リクエストイベント**と、**製品特化イベント**の 2 種類があります。

たとえば、**リクエストイベント**を追跡すると、そのイベントに到達する API 呼び出しを確認できます。または、組織または請求担当の管理者の場合は、監査証跡イベントを使用してインフラストラクチャーの状態を変更したユーザーイベントを追跡できます。

この環境では、以下のような製品特有のイベントについて確認する場合に監査証跡が便利です。

  -  ログのボリュームが変化し、毎月の請求額が変化したためインデックスの保持期間が変更されたとき。

  - ダッシュボードまたはモニターが壊れていて修復が必要な場合に、プロセッサまたはパイプラインを変更したユーザーおよびその変更日時を確認する。

  - インデックス化のボリュームが増減し、ログが見つからないまたは請求額が増加したため、除外フィルターを変更したユーザーを確認する。

セキュリティ管理者またはInfoSecチームには、監査証跡イベントはコンプライアンスチェックや Datadog リソースにおける監査証跡（だれがいつ何をしたか）の管理に便利です。たとえば、以下のような監査証跡を管理できます。

- 重要なダッシュボード、モニター、その他の Datadog リソースの更新または削除があった場合の日時と実行者。

- 組織内のユーザーログイン、アカウント、ロール変更。

## セットアップ

Datadog 監査証跡を有効にするには、[オーガニゼーションの設定][2]で *Security* の *Audit Trail Settings* を選択し、**Enable** ボタンをクリックします。

{{< img src="account_management/audit_logs/audit_enable.png" alt="Datadog の監査証跡設定" style="width:100%;">}}

## コンフィギュレーション

### イベントタイプ

イベントタイプとは、監査イベントの集合です。たとえば、Authentication のイベントタイプには認証に関するすべてのイベントが含まれ、Dashboards のイベントタイプにはダッシュボード製品とのインタラクションに関するすべてのイベントが含まれます。イベントタイプを有効にするには、[オーガニゼーションの設定][2]で *Audit Trail Settings* セクションに移動し、関連するイベントタイプのトグルボタンをオンにします。

{{< img src="account_management/audit_logs/audit_toggles.png" alt="Datadog の監査証跡イベントタイプの設定" style="width:50%;">}}

各種イベントの一覧は、[監査証跡イベント][3]を参照してください。

### アーカイブ

アーカイブは、監査証跡のオプション機能です。Amazon S3、Google Cloud Storage、Azure Storage への書き込みと、これらの場所から SIEM システムによりイベントを読み取るためにアーカイブを使用できます。アーカイブ構成を作成または更新してから次にアーカイブのアップロードが試行されるまで、数分かかることがあります。イベントは 15 分ごとにアーカイブにアップロードされるので、**15 分待ってストレージバケットをチェックし**、Datadog アカウントからアーカイブが正常にアップロードされたことを確認してください。

監査証跡のアーカイブを有効にするには、[オーガニゼーションの設定][2]で *Compliance* の *Audit Trail Settings* を選択し、Archiving までスクロールダウンして Store Events のトグルボタンをクリックしてオンにします。

### 保存期間

イベントの保持は、監査証跡のオプション機能です。*Retention* までスクロールし、*Retain Audit Trail Events* のトグルをクリックすると、有効になります。

デフォルトの監査証跡イベント保持期間は 7 日間です。保持期間は 3～90 日間の間で設定できます。

{{< img src="account_management/audit_logs/retention_period.png" alt="Datadog の監査証跡保持期間の設定" style="width:80%;">}}

## 監査イベントの確認

監査イベントを詳しく確認するには、[Audit Trail][1] セクションに移動します。Datadog の[オーガニゼーションの設定][2]からもアクセス可能です。

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="組織設定メニューの監査証跡" style="width:30%;">}}

監査証跡イベントは、[ログエクスプローラー][4]内のログと同様の機能を持っています。

- フィルターを使用して、イベント名（ダッシュボード、モニター、認証など）、認証属性（アクター、API キー ID、ユーザーのメールアドレスなど）、`Status`（`Error`、`Warn`、`Info`）、メソッド（`POST`、`GET`、`DELETE`）およびその他のファセット別に監査証跡イベントを確認。

- イベントを選択してイベント属性タブに移動し、関連する監査証跡イベントを確認。絞り込みまたは検索から除外する特定の属性を選択（`http.method`、`usr.email`、`client.ip` など）。

{{< img src="account_management/audit_logs/attributes.png" alt="組織設定メニューの監査証跡" style="width:50%;">}}

## モニターの作成

監査証跡イベントの特定のタイプや証跡の属性別にモニターを作成するには、[監査証跡モニターに関するドキュメント][5]をご参照ください。例: 特定のユーザーログが発生したときにトリガーするモニターを設定、ダッシュボードが削除されたとき用のモニターを設定など。

## ダッシュボードやグラフの作成

ダッシュボードを使用すると、監査証跡イベントに視覚的なコンテキストを追加できます。監査ダッシュボードを作成するには:

1. Datadog で[新しいダッシュボード][6]を作成します。
2. 視覚化を選択します。監査イベントを[トップリスト][7]、[時系列][8]、[リスト][9]で視覚化することができます。
3. [データのグラフを作成][10]: 編集で、データソースとして *Audit Events* を選択し、クエリを作成します。監査イベントはカウント別に絞り込まれ、ファセット別にグループ化できます。ファセットと上限を選択します。
{{< img src="account_management/audit_logs/audit_graphing.png" alt="監査証跡をデータソースとして設定しデータからグラフを作成" style="width:100%;">}}
4. 表示設定を完了してグラフにタイトルを付けます。*Save* ボタンをクリックしてダッシュボードを作成します。

## すぐに使えるダッシュボード

Datadog 監査証跡には、インデックス保持の変更、ログパイプラインの変更、ダッシュボードの変更など、さまざまな監査イベントを表示する[すぐに使えるダッシュボード][11]が付属しています。このダッシュボードを複製して、監査ニーズに合わせてクエリや視覚化をカスタマイズすることができます。

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="監査証跡ダッシュボード" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: https://app.datadoghq.com/organization-settings/
[3]: /ja/account_management/audit_trail/events/
[4]: /ja/logs/explorer/
[5]: /ja/monitors/create/types/audit_trail/
[6]: /ja/dashboards/
[7]: /ja/dashboards/widgets/top_list/
[8]: /ja/dashboards/widgets/timeseries/
[9]: /ja/dashboards/widgets/list/
[10]: /ja/dashboards/querying/#choose-the-metric-to-graph/
[11]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true