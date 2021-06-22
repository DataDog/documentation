---
title: Service Check
kind: documentation
aliases:
  - /ja/developers/faq/how-can-i-submit-a-custom-status-check
  - /ja/developers/service_checks/visualize-your-service-check-in-the-datadog-ui
  - /ja/guides/services_checks/
  - /ja/monitors/guide/visualize-your-service-check-in-the-datadog-ui
---
## 概要

サービスチェックでは、Datadog 内でサービスを監視するために、サービスのステータスを特徴付けることができます。すべてのステータスチェックには、次のいずれかのステータスコードが必要です。

| ステータスコード | 説明 |
| ----------- | ----------- |
| `0`         | OK          |
| `1`         | 警告     |
| `2`         | クリティカル    |
| `3`         | Unknown     |

{{< whatsnext desc="Datacheck にサービスチェックを送信する方法は次のとおりです。">}}
    {{< nextlink href="/developers/service_checks/agent_service_checks_submission" >}}カスタム Agent チェックを送信する。{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission" >}}DogStatsD でサービスチェックを送信する。{{< /nextlink >}}
    {{< nextlink href="/api/v1/service-checks/" >}}Datadog API を通じてサービスチェックを送信する。{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog UI でのサービスチェックの視覚化

サービスチェックを視覚化して、Datadog の以下の 3 つのセクションで使用できます。

- [チェック内容のサマリー][1]
- [スクリーンボード][2]
- [カスタムチェックモニター][3]

### チェック内容のサマリー

_Monitors_ タブをクリックし、_Check Summary_ をクリックして、[チェック内容のサマリー][1]ページを表示します。

{{< img src="developers/service_checks/check_summary.png" alt="チェック内容のサマリー"  >}}

これは、インフラストラクチャー全体の前日のチェックとステータス報告のリストです。チェックの 1 つを選択すると、関連付けられたタグごとに個別チェックの数が表示されます。

### スクリーンボード

スクリーンボードの_チェックステータス_ウィジェットを使用して、サービスチェックを視覚化できます。

{{< img src="developers/service_checks/check_status_widget.png" alt="チェックステータスウィジェット"  >}}

_チェックステータス_ウィジェットアイコンをクリックすると、次のポップアップが表示されます。

{{< img src="developers/service_checks/check_widget_config.png" alt="チェックステータス構成"  >}}

このフォームで、以下の設定を行うことができます。

- **Check Name**: サービスチェック名を選択します。
- **Reporting Timeframe**: ステータスを集計するタイムフレームを選択します。
- **Scoping**: 1 つのチェックを選択するか、1 つのタグ値またはタグキーに基づいて報告されるチェックステータスのクラスターを選択します。
- **Widget Title**: ウィジェットのタイトルを設定します。

## カスタムチェックモニター

メトリクスのように経時的にカスタムチェックをグラフ化できなくても、監視することはできます。
_Monitors_ タブ > _new monitor_ に移動し、**Custom Check** セクションを選択します。

{{< img src="developers/service_checks/check_monitor.png" alt="チェックモニター"  >}}

カスタムチェックモニターを構成します。

{{< img src="developers/service_checks/check_monitor_config.png" alt="チェックモニター構成"  >}}

このフォームで、以下の設定を行うことができます。

- **Pick a custom check**: 監視するチェックステータス名を選択します。
- **Pick monitor scope**: モニターのコンテキストを選択します (タグの選択/除外)。
- **Set alert conditions**: シンプルチェックアラートまたはクラスターアラートを選択します。
- **Say what's happening**: 送信する通知を編集します (詳細は [Datadog 通知][4]を参照)。
- **Notify your team**: このモニターを誰に通知するかを選択します。

すぐに使用できる Datadog インテグレーションのサービスチェックモニターは、左側の _Monitors_ タブ > _Integration_ > _Integration status_ タブで設定できます。以下は、HAProxy インテグレーションの例です。

{{< img src="developers/service_checks/haproxy_service_check.mp4" alt="Haproxy サービスチェック" video="true"  >}}

インテグレーションの書き方については、[インテグレーション開発者用ドキュメント][5]を参照してください。

[1]: https://app.datadoghq.com/check/summary
[2]: https://app.datadoghq.com/dashboard
[3]: https://app.datadoghq.com/monitors#create/custom
[4]: /ja/monitors/notifications/
[5]: /ja/developers/integrations/