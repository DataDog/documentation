---
aliases:
- /ja/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
title: Collect more metrics from the SQL Server integration
---

## 概要

デフォルトでは、SQL Server インテグレーションは、[ドキュメントページに記載されているメトリクス][1]を収集するだけです。しかし、`sqlserver.d/conf.yaml` を[サンプルファイルの構文][2]に従って構成することで、SQL Server インテグレーションから追加のメトリクスを収集できます (これらは “init_config" の下にあります)。

現時点では、Datadog の sqlserver チェックは、[sys.dm_os_performance_counters][3] テーブルからのデータのみをクエリしますが、他のカウンターテーブルから [WMI を使ってメトリクスを公開][4]することが可能です。特定のデータを収集するには、収集したいメトリクスに対応する `counter_name` と、場合によっては `instance_name` を見つけます。[powershell の sqlcmd][5] からアクセスしたら、以下のようなクエリを実行して、SQL Server のそのテーブルで利用できる `count_names` の一覧を取得します。

**注**: 長いリストが返されます。

```text
1> SELECT counter_name, instance_name, cntr_value, cntr_type FROM sys.dm_os_performance_counters;
2> go
```

そこから自分にとって最も興味深い counter_names を選び出し、sqlserver.yaml の "counter_name" オプションでカスタムメトリクスセクションに追加し、"- name:" オプションでメトリクスに適切な名前を付けます (他の sqlserver メトリクスと同様に "sqlserver." で始めるとよいでしょう)。

## 例

CLR Execution、Queued requests、Active requests の各プロパティのメトリクスを収集する場合の `sqlserver.d/conf.yaml` の例は、次のようになります。

```yaml
init_config:

  custom_metrics:

    - name: sqlserver.clr.execution
      counter_name: CLR Execution
    - name: sqlserver.requests.queued
      counter_name: Queued requests
      instance_name: internal
    - name: sqlserver.requests.active
      counter_name: Active requests
      instance_name: internal

instances:
  - host: 127.0.0.1,1433
    username: datadog
    password: *******
    tags:
      - test:sqlserver
```

[1]: /ja/integrations/sqlserver/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://msdn.microsoft.com/en-us/library/ms187743.aspx
[4]: /ja/integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics/
[5]: https://msdn.microsoft.com/en-us/library/ms188247.aspx