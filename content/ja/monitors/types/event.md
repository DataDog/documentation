---
aliases:
- /ja/monitors/monitor_types/event
- /ja/monitors/create/types/event/
description: Datadog によって収集されたイベントを監視する
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/manage/status/
  tag: ドキュメント
  text: モニターステータスを確認
title: イベントモニター
---

## 概要

イベントモニターを使用すると、検索クエリと一致するイベントが発生したときにアラートを生成できます。

## モニターの作成

Datadog で[イベントモニター][1]を作成するには、**Monitors** > **New Monitor** > **Event** に移動します。

<div class="alert alert-info"><strong>注</strong>: デフォルトでは、1 アカウントあたり 1000 イベントモニターという制限があります。この制限に引っかかっている場合、<a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">マルチアラート</a>の使用を検討するか、<a href="/help/">サポートにお問い合わせ</a>ください。</div>

### 検索クエリを定義する

検索クエリを定義すると、上部のグラフが更新されます。

1. [イベントエクスプローラーの検索構文][2]を使って検索クエリを作成します。
2. イベント数またはファセットのモニタリングを選択します。
    * **Monitor over an event count**: 検索バーを使用し (任意)、ファセットを選択**しません**。選択されたタイムフレームで Datadog がイベント数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a facet**: ファセットが選択されていると、モニターはファセットのユニークな値のカウントに対してアラートを作成します。
3. アラートのグループ化方法を構成します（任意）:
    * **Simple alert**: すべてのソースをまとめて集計します。集計値が設定条件を満たすと、1 件のアラートを受け取ります。これは、単一のホストから受け取るメトリクスまたは多くのホストからの合計メトリクスを監視する場合に最適です。通知件数を減らしたい場合にこの方法を選択します。
    * **Multi Alert**: グループパラメーターに従い、複数のアラートを各ソースに適用します (最大 1000 件の一致するグループ)。アラートイベントは、設定された条件を満たすと各グループに生成されます。例えば、`host` でグループ化し、各ホストに対して別々のアラートを受信することができます。

### アラートの条件を設定する

* カウントが `above`、`above or equal to`、`below`、または `below or equal to` の時
* `<しきい値の数>`
* 過去 `5 minutes`、`15 minutes`、`1 hour` など、または `custom` に 5 分～48 時間の値を設定します。

**注**: 一部のプロバイダーでは、イベントが**ポスト**されてから実際に開始されるまでにかなりの遅延が生じます。このような場合、Datadog は発生時刻にまでさかのぼってイベントを記録しますが、これにより現在のモニター評価ウィンドウ外のイベントを認識することがあります。評価ウィンドウを広げると時間差が発生する原因を理解しやすくなります。適切なモニター設定の調整についてサポートが必要な場合は、[Datadog のサポートチーム][3]までお問い合わせください。

#### 高度なアラート条件

高度なアラートオプション (自動解決、評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][4]ページを参照してください。

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][5] のページを参照してください。

#### イベントテンプレート変数

イベントモニターには、通知メッセージを入力できる特殊なテンプレート変数があります。

| テンプレート変数          | 定義                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | イベントの ID。                                                           |
| `{{event.title}}`          | イベントのタイトル。                                                        |
| `{{event.text}}`           | イベントのテキスト。                                                         |
| `{{event.host.name}}`      | イベントを生成したホストの名前。                                 |
| `{{event.tags}}`           | イベントに関連したタグのリスト                                          |
| `{{event.tags.<タグ_キー>}}` | イベントに関連した特定のタグキーの値。下記のサンプルを参照してください。 |

##### `key:value` 構文のタグ

次のタグ専用: `env:test`、`env:staging`、`env:prod`。

* `env` はタグキーです。
* `test`、`staging`、`prod` はタグ値です。

テンプレート変数は `{{event.tags.env}}` です。このテンプレート変数を使用した場合の結果は、`test`、`staging`、または `prod` です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/event
[2]: /ja/service_management/events/explorer/#search-syntax
[3]: /ja/help/
[4]: /ja/monitors/configuration/#advanced-alert-conditions
[5]: /ja/monitors/notify/