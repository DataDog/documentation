---
aliases:
- /ja/monitors/service_level_objectives/error_budget/
description: SLO のエラーバジェットの消費を警告するためにモニターを使用する
further_reading:
- link: /service_management/service_level_objectives/
  tag: Documentation
  text: サービスレベル目標の概要
title: エラー予算アラート
---

## 概要

SLO エラーバジェットアラートは閾値に基づき、SLO のエラーバジェットの一定の割合が消費されなかったときに通知します。たとえば、対象とする 7 日間でエラーバジェットの 75% が消費されたらアラート、50% が消費されたら警告（オプション）のように設定します。

**注:** エラーバジェットアラートは、メトリクスモニターの種類（メトリクス、インテグレーション、APM メトリクス、異常検知、予測値、外れ値モニター）のみで構成された[メトリクスベースの SLO][1] または[モニターベースの SLO][2] でのみ利用可能です。

*エラーバジェット*を含む SLO に関する主要な用語の説明については、[サービスレベル目標][3]を参照してください。

{{< img src="service_management/service_level_objectives/error_budget_alert_config.png" alt="エラーバジェットアラートのコンフィギュレーション">}}

## モニターの作成

1. [SLO ステータスページ][4]に移動します。
2. 新しい SLO を作成、または既存のものを編集し、**Save and Set Alert** ボタンをクリックします。既存の SLO の場合は、SLO 詳細のサイドパネルの **Set up Alerts** ボタンをクリックすると、アラートのコンフィギュレーションに直接アクセスできます。
3.  **Step 1: Setting alerting conditions** の **Error Budget**  タブを選択
4. 過去の `target` 日数において、エラーバジェットの消費割合が `threshold` を超えるとアラートをトリガーするタイミングを設定します。
。
4. **Say what's happening** セクションと **Notify your team** セクションに、[通知情報][5]を追加します。
5. SLO コンフィギュレーションページで **Save and Set Alert** ボタンをクリックします。

{{< img src="service_management/service_level_objectives/save_set_alert.png" alt="SLO を保存してエラーバジェットアラートをセットアップ">}}

### API および Terraform

[create-monitor API エンドポイント][6]を使用して、SLO エラーバジェットアラートを作成することができます。以下は、SLO のエラーバジェットの 75% 以上が消費されたときに警告を発する SLO モニターのクエリ例です。*slo_id* をバーンレートアラートを構成する SLO の英数字 ID に置き換え、*time_window* を 7d、30d、または 90d のいずれかに置き換えます (SLO の構成に使用するターゲットによって異なります)。

```
error_budget("slo_id").over("time_window") > 75
```

また、[Terraform の datadog_monitor リソース][7]を使用して SLO エラーバジェットアラートを作成することも可能です。以下は、上記と同じクエリ例を使用して、メトリクスベースの SLO にエラーバジェットアラートを構成する `.tf` の例です。

**プロバイダーバージョン v2.7.0 以前と v2.13.0 以降の場合**

**注:** SLO エラーバジェットアラートは、Terraform プロバイダー v2.7.0 以前および v2.13.0 以降のみでサポートされています。v2.7.0 から v2.13.0 の間のバージョンはサポートされていません。

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Error Budget Alert Example"
    type  = "slo alert"

    query = <<EOT
    error_budget("slo_id").over("time_window") > 75 
    EOT

    message = "Example monitor message"
    monitor_thresholds {
      critical = 75
    }
    tags = ["foo:bar", "baz"]
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/service_management/service_level_objectives/metric/
[2]: /ja/service_management/service_level_objectives/monitor/
[3]: /ja/service_management/service_level_objectives/#key-terminology
[4]: https://app.datadoghq.com/slo
[5]: /ja/monitors/notify/
[6]: /ja/api/v1/monitors/#create-a-monitor
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor