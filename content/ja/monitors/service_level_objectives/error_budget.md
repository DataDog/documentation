---
title: エラーバジェットモニター
kind: ドキュメント
description: モニターを使用してサービスレベル目標 (SLO) を定義する
---
<div class="alert alert-warning">
この機能はオープンベータ版です。この機能へのアクセスリクエストやフィードバックは、<a href="mailto:slo-help@datadoghq.com">slo-help@datadoghq.com</a> までメールでお寄せください。
</div>

## 概要

SLO エラーバジェットモニターは、しきい値に基づきお客様の SLO エラーバジェットの一定の割合が消費されると通知を送信します。例えば、7 日間のターゲット期間のエラーバジェットの 75% が消費されたらアラートを作成し、50% が消費されたら警告を発します (任意)。


**注:** エラーバジェットモニターは[メトリクスベースの SLO][1] でのみご利用可能です。


## モニターの作成

1. [SLO ステータスページ][2]に移動します。
2. 新しいメトリクスベースの SLO を作成するか、既存の SLO を編集したら、‘Save and Set Alert’ ボタンをクリックします。また、既存の SLO の場合、サイドパネルの SLO 詳細で “Enable Alerts” リンクをクリックすると、アラートのコンフィギュレーションに直接移動できます。
3. 過去の `target` 日数において、エラーバジェットの消費割合が `threshold` を超えるとアラートをトリガーするタイミングを設定します
。
4. **Say what's happening** セクションと **Notify your team** セクションに、[通知情報][3]を追加します。
5. SLO コンフィギュレーションページで ‘Save and Set Alert’ ボタンをクリックします。

**注:** `New Condition` ボタンをクリックすると、任意の警告条件が追加されます。警告のしきい値はアラートのしきい値よりも低く設定する必要があります。

{{< img src="monitors/service_level_objectives/error_budget_alert.png" alt="エラーバジェットアラートの設定">}}

### API および Terraform

[モニターの作成 API エンドポイント][4]を使用して、SLO エラーバジェットモニターを作成できます。下記は、SLO のエラーバジェットが 75% より多く消費された場合にアラートを発する SLO モニターのクエリ例です。

```
error_budget("slo_id").over("time_window") > 75
```

さらに、SLO エラーバジェットモニターは [Terraform の datadog_monitor リソース][5]を使用して作成することも可能です。以下は、上記の例と同じクエリを用いてメトリクスベースの SLO 向けにエラーバジェットモニターを構成する `.tf` の例です。

**注:** SLO エラーバジェットモニターは Terraform プロバイダーの v2.7.0 以前およびプロバイダーの v2.13.0 以降でのみサポートされています。v2.7.0 と v2.13.0 の間のバージョンはサポートされていません。

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Error Budget Alert Example"
    type  = "slo alert"

    query = <<EOT
    error_budget("slo_id").over("time_window") > 75 
    EOT

    message = "Example monitor message"
    thresholds = {
      critical = 75
    }
    tags = ["foo:bar", "baz"]
}
```

`slo_id` をメトリクスベースの SLO の ID (英数字) に置き換えてエラーバジェットモニターを構成し、メトリクスベースの SLO を構成するために使用するターゲットに応じて、`time_window` を `7d`、`30d`、`90d` のいずれか 1 つに置き換えます。

## ベータ版の制限

- アラート設定はメトリクスベースの SLO でのみご利用可能です。
- SLO モニターのアラートステータスは、SLO 詳細パネルの **Alerts** タブで確認できます。
- UI では SLO (ターゲット + タイムウィンドウ) ごとに 1 つのアラートしか設定できませんが、API または Terraform を使用した場合は SLO ごとに複数のアラートを設定できます。

[1]: /ja/monitors/service_level_objectives/metric/
[2]: https://app.datadoghq.com/slo
[3]: /ja/monitors/notifications/
[4]: /ja/api/v1/monitors/#create-a-monitor
[5]: https://www.terraform.io/docs/providers/datadog/r/monitor.html