---
title: Data Jobs Monitoring
further_reading:
    - link: /data_streams
      tag: Documentation
      text: Data Streams Monitoring

---

{{< img src="data_jobs/overview_062024.png" alt="Datadog Data Jobs Monitoring overview page" style="width:100%;" >}}

Data Jobs Monitoring は、Apache Spark や Databricks のジョブを含むデータ処理ジョブのパフォーマンスと信頼性、さらにその基盤となるインフラストラクチャーの可視性を提供します。Data Jobs Monitoring により、以下のことが可能になります。

- アカウントとワークスペース全体のデータ処理ジョブの健全性とパフォーマンスを追跡する。計算リソースを最も消費しているジョブや非効率なジョブを確認する。
- ジョブが失敗した場合、またはジョブの完了に予想以上に時間がかかる場合にアラートを受け取る。
- ジョブ実行の詳細とスタックトレースを分析する。
- インフラストラクチャーメトリクス、Spark UI からの Spark メトリクス、ログ、クラスター構成を相関付ける。
- 複数の実行を比較することで、トラブルシューティングを容易にし、デプロイメント時のプロビジョニングと構成を最適化する。

## セットアップ

Data Jobs Monitoring は Amazon EMR、Databricks (AWS、Azure、Google Cloud)、Spark on Kubernetes に対応しています。

始めるには、プラットフォームを選択し、インストール手順に従ってください。

{{< partial name="data_jobs/setup-platforms.html" >}}

<br/>

## Data Jobs Monitoring を探る

### 信頼性の低い非効率なジョブを簡単に特定する

クラウドアカウントとワークスペースにまたがるすべてのジョブを表示します。対応が必要な失敗したジョブを特定したり、多くの計算量を使用しているため最適化する必要がある、アイドル CPU が高いジョブを見つけたりできます。

### 問題のあるジョブに関するアラートを受信する

Datadog monitors send alerts when a job fails, or is running beyond its completion time. Browse [monitor templates][1] to monitor data jobs specific to your installed integrations.

### 個々のジョブの分析とトラブルシューティング

ジョブをクリックすると、複数の実行の結果や、失敗した実行のエラーメッセージを確認できます。

{{< img src="data_jobs/djm_job_062024.png" alt="Job Overview page for 'product-insights' Spark Application job" style="width:100%;" >}}

### 個々の実行の分析

実行をクリックするとサイドパネルが開き、各 Spark ジョブとステージに費やされた時間の詳細と、アイドルエグゼキュータ CPU、入出力データ量、シャッフル、ディスク流出などのリソース消費と Spark メトリクスの内訳が表示されます。このパネルから、実行をエクゼキュータやドライバーノードのリソース使用率、ログ、ジョブやクラスターの構成と相関付けることができます。

**Infrastructure** タブでは、実行とインフラストラクチャーのメトリクスを相関付けることができます。

{{< img src="data_jobs/djm_run_infra_062024.png" alt="Data Jobs Monitoring > Run panel, Infrastructure tab" style="width:100%;" >}}

失敗した実行については、**Errors** タブでスタックトレースを確認します。これは、この失敗がどこでどのように発生したかを判断するのに役立ちます。

To determine why a stage is taking a long time to complete, you can use the **Spark Task Metrics** tab to view task-level metrics for a specific Spark stage, so that you can identify data skew. See the distribution of time spent and data consumed by different tasks.

{{< img src="data_jobs/djm_task_metrics.png" alt="Data Jobs Monitoring > Run panel, Spark Task Metrics tab" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/recommended?q=jobs%20&only_installed=true&p=1