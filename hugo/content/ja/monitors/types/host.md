---
aliases:
- /ja/monitors/monitor_types/host
- /ja/monitors/create/types/host/
description: 1 つ以上のホストが Datadog にレポートしているかどうかを確認する
further_reading:
- link: /infrastructure/
  tag: ドキュメント
  text: Infrastructure Monitoring
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の構成
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスの参照
title: ホストモニター
---
## 概要 {#overview}

インフラストラクチャーモニタリングは、多くのインテグレーションを通じてクラウドホスト型サーバーやオンプレミスサーバーを含む IT 環境全体を可視化します。ホストモニターを使用して、どのホストがデータを送信しているか、または送信していないかを把握し、継続的な可視性を確保します。

すべての Datadog Agent は、`datadog.agent.up` というサービスチェックを `OK` というステータスでレポートします。ホストモニターを使用することで、1 つ以上のホストにわたってこのチェックを監視できます。

<div class="alert alert-info">AIX 上で従来の Datadog UNIX Agent を実行しているホストは、 <code>datadog.agent.up</code> サービスチェックをレポートしません。このメトリクス <code>datadog.agent.running</code> を使用して、UNIX Agent のアップタイムを監視できます。このメトリクスは、Agent が Datadog にレポートしている場合、 <code>1</code> の値を出力します。AIX 上の Agent 7 は、他のプラットフォーム上の Agent と同様に、 <code>datadog.agent.up</code> サービスチェックをレポートします。</div>

## モニターの作成 {#monitor-creation}

Datadog で[ホストモニター][1]を作成するには、メインナビゲーションを使用します。{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Host{{< /ui >}}。

### 名前またはタグでホストを選択する {#pick-hosts-by-name-or-tag}

ホスト名、タグ、または {{< ui >}}All Monitored Hosts{{< /ui >}} を選択して、監視するホストを選択します。特定のホストを除外する必要がある場合は、2 番目のフィールドにリスト名またはタグを入力します。

- 包含フィールドは `AND` ロジックを使用します。ホストが対象に含まれるには、リストされているすべての名前とタグがホスト上に存在している必要があります。
- 除外フィールドは `OR` ロジックを使用します。リストされた名前またはタグを持つホストはすべて除外されます。

#### 例 {#examples}

| 監視                                                | 包含               | 除外     |
|--------------------------------------------------------|-----------------------|-------------|
| 次のタグを持つすべてのホストを含める: `env:prod`              | `env:prod`            | 空白のままにする |
| 次のタグを持つホストを除くすべてのホストを含める: `env:test` | `All Monitored Hosts` | `env:test`  |

### アラート条件を設定する {#set-alert-conditions}

このセクションでは、{{< ui >}}Check Alert{{< /ui >}} または {{< ui >}}Cluster Alert{{< /ui >}} のいずれかを選択します。

{{< tabs >}}
{{% tab "チェックアラート" %}}

チェックアラートは、ホストが一定時間レポートしなくなった場合に追跡します。チェック実行から時間が経過しすぎている場合は、ホストからのデータ送信に問題がある可能性があります。

データの欠落をチェックするまでの時間を分単位で入力します。デフォルト値は 2 分です。

`datadog.agent.up` が指定した時間を超えて `OK` ステータスをレポートしなくなった場合、アラートがトリガーされます。

{{% /tab %}}
{{% tab "クラスターアラート" %}}

クラスターアラートは、一定割合のホストが指定された時間にわたってレポートしなくなったかどうかを追跡します。

クラスターアラートを設定するには、以下の手順を実行します。

1. タグに基づいてホストをグループ化するかどうかを決定します。{{< ui >}}Ungrouped{{< /ui >}} は、含まれるすべてのホスト全体のステータス割合を計算します。{{< ui >}}Grouped{{< /ui >}} は、グループごとにステータス割合を計算します。
2. アラートと警告のしきい値に使用する割合を選択します。1 つの設定 (アラートまたは警告) のみ必要です。
3. データの欠落をチェックするまでの時間を分単位で入力します。デフォルト値は 2 分です。

`datadog.agent.up` が指定した時間を超えて `OK` ステータスをレポートしなくなり、割合がしきい値に達すると、アラートがトリガーされます。

{{% /tab %}}
{{< /tabs >}}

### 高度なアラート条件 {#advanced-alert-conditions}

高度なアラートオプション (自動解決、新規グループ遅延など) の詳細な手順については、[モニターの構成][2]ページを参照してください。

### 通知 {#notifications}

{{< ui >}}Configure notifications and automations{{< /ui >}}セクションの詳しい説明については、[通知][3]ページを参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/host
[2]: /ja/monitors/configuration/#advanced-alert-conditions
[3]: /ja/monitors/notify/