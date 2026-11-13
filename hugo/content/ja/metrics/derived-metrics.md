---
description: メトリクスクエリを、ダッシュボード、モニター、SLO、ノートブック全体で再利用可能な新しいメトリクスとして保存します。
further_reading:
- link: https://www.datadoghq.com/blog/auto-smoother-asap/
  tag: ブログ
  text: ノイズの多いメトリクスを自動平滑化し、傾向を明らかにする
title: 派生メトリクス
---
## 概要 {#overview}

派生メトリクスを使用すると、メトリクスクエリを新しいメトリクスとして保存できるため、Datadog でのメトリクスの操作を簡素化および最適化できます。ダッシュボード、モニター、SLO、ノートブック全体で複雑なクエリを繰り返し構築する代わりに、派生メトリクスを一度作成すればすべてのアセットで再利用できます。派生メトリクスの用途:

- **クエリの簡素化**: クエリを一度定義して派生メトリクスとして保存すれば、どこでも再利用できます。
- **エラーの削減と一貫性の向上**: 数式を一元管理してエラーを回避し、チーム全体で統一性を確保します。
- **ワークフローの加速**: コードの変更や新しいメトリクスの送信は不要です。Datadog 内の既存のメトリクスから直接新しいメトリクスを作成できます。
- **制御と監査可能性の向上**: 派生数式を一元管理し、改善します。

**注**: 派生メトリクスはクエリ時に動的に計算され、保存やインデックス作成が行われないため、Custom Metrics としては課金**されません**。

## 派生メトリクスを作成する {#create-a-derived-metric}

派生メトリクスを作成するには、[{{< ui >}}Metrics > Generate Metrics{{< /ui >}}][1]に移動し、{{< ui >}}\+ New Metric{{< /ui >}} をクリックします。

{{< img src="metrics/derived_metrics/generate_metrics_tab.png" alt="Datadog のメトリクス生成タブ" style="width:90%;" >}}

1. 派生メトリクスに `datadog.estimated_usage` で**始まらない**名前を付けます。[カスタムメトリックスの名前を付ける][2]で説明されている形式を使用してください。

2. 基盤となるメトリクスクエリを定義し、必要に応じて数式ボックスを使用し、メトリクス値に対して実行する数学演算を定義します。

   たとえば、Kafka コネクタの全体的な安定性を監視するために、メトリクス `kafka.connect.connector.status.running` と `kafka.connect.connector.status.failed` を使用して、個別のクエリ `a` と `b` を作成できます。次に、数式ボックスに数式 `(a / (a + b)) * 100` を入力します。

   メトリクスクエリの定義方法の詳細については、[メトリクスのクエリ][3]を参照してください。

{{< img src="metrics/derived_metrics/derived_metric_query.png" alt="派生メトリクスを生成するための Datadog メトリクスクエリ" style="width:90%;" >}}

3. {{< ui >}}Create Metric{{< /ui >}} をクリックします。

## 派生メトリクスを更新する {#update-a-derived-metric}

派生メトリクスを更新するには、そのメトリクスにカーソルを合わせ、右側に表示される {{< ui >}}Edit{{< /ui >}} アイコンをクリックします。

**注**: 既存のメトリクスの名前を変更することはできません。代わりに新しいメトリクスを作成してください。

## 派生メトリクスを削除する {#delete-a-derived-metric}

派生メトリクスを削除するには、その派生メトリクスにカーソルを合わせ、右側に表示される {{< ui >}}Delete{{< /ui >}} アイコンをクリックします。

## Terraform で派生メトリクスを管理する {#manage-derived-metrics-with-terraform}

[`datadog_derived_metric` リソース][4]を使用して、Terraform で派生メトリクスの定義を作成、更新、削除します。

開始する前に、[Datadog Terraform プロバイダーを設定][5]してください。アプリケーションキーには、**Metrics Read** (`metrics_read`) および **Manage Tags for Metrics** (`metric_tags_write`) の権限が必要です。詳細については、[API キーとアプリケーションキー][6]を参照してください。

例えば、2 つの CPU メトリクスを組み合わせるには、このリソースを Terraform 設定に追加します。

```hcl
resource "datadog_derived_metric" "cpu_total" {
  name = "custom.cpu.total"
  definition = {
    formula = "a + b"
    queries = [
      {
        name        = "a"
        data_source = "metrics"
        query       = "avg:system.cpu.user{*}"
      },
      {
        name        = "b"
        data_source = "metrics"
        query       = "avg:system.cpu.system{*}"
      },
    ]
  }
}
```

`terraform plan` を実行して変更を確認し、`terraform apply` を実行して派生メトリクスを作成します。

`definition.formula` または `definition.queries` を変更すると、既存の定義が更新されます。`name` を変更すると、派生メトリクスが置き換えられます。

既存の派生メトリクスを管理するには、そのリソース設定を追加し、名前でインポートしてください。

```shell
terraform import datadog_derived_metric.cpu_total "custom.cpu.total"
```

インポート後、`terraform plan` と `terraform apply` を実行して、設定した名前と定義を適用します。最初の適用で既存のメトリクスが更新されます。その後に `name` を変更すると、メトリクスが置き換えられます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/metric/generate-metrics
[2]: /ja/metrics/custom_metrics/#naming-custom-metrics
[3]: /ja/metrics/#querying-metrics
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/derived_metric
[5]: /ja/integrations/terraform/#configuration
[6]: /ja/account_management/api-app-keys/