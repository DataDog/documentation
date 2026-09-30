---
disable_toc: false
title: Terraform によるログとメトリクスの管理
---

## 概要
[Terraform][1] を使用して Datadog API と連携し、ログやメトリクスを管理できます。このガイドでは、ユースケースの例を示し、Terraform レジストリで一般的に使用される Datadog のリソースやデータソースへのリンクを紹介します。

また、既存のリソースを[インポート][2]して Terraform 構成に取り込み、既存のリソースを Terraform の[データソース][3]として参照することもできます。

## Datadog Terraform プロバイダーの設定

まだ設定していない場合は、[Datadog Terraform プロバイダー][4]を構成して、Terraform 構成を介して Datadog API とやり取りできるようにしてください。

## ログコンフィギュレーション

### 複数のインデックスを設定する

[複数のインデックス][5]を設定すると、ログを異なる保持期間や 1 日あたりのクォータ、使用状況の監視、請求などの目的ごとに区分できます。たとえば、特定のログは 7 日間だけ保持すればよい一方、別のログは 30 日間保持する必要がある場合、それぞれを別のインデックスに振り分けます。[包含フィルター][6]と[除外フィルター][7]については、それらのクエリの定義方法をドキュメントで確認してください。取り込まれたログは最初にマッチするインデックスに格納されるため、ユースケースに合わせて[インデックスの順序を設定][8]してください。

### カスタムパイプラインを設定する

ログパイプラインは、ログの内容から情報を抽出し、ファセットとして再利用するための一連の順次プロセッサです。各ログはパイプラインを通過する際に各パイプラインフィルターに照合され、一致した場合、すべてのプロセッサがそのログに適用されます。[カスタムパイプライン][9]を設定してログをパース・強化し、必要に応じて[パイプラインの順序を変更][11]してください。利用可能なプロセッサの詳細については、[Processors のドキュメント][10]をご覧ください。

インテグレーションパイプラインは、特定のソース (例: NGINX のインテグレーション) からログを送信すると自動的にインストールされます。これらのパイプラインは、[ログインテグレーションパイプラインリソース][12]を使用して順序を変更できます。

### 長期保存のための複数のアーカイブを設定する

[Log Archives][13] を設定すると、Amazon S3、Azure Storage、または Google Cloud Storage などのストレージ最適化されたシステムにログを送信し、長期間保管できます。必要に応じて[アーカイブの順序を変更][14]することも可能です。

### 取り込んだログからメトリクスを生成する

[ログベースメトリクス][15]を使用して、取り込んだログからログデータを要約できます。たとえば、クエリにマッチしたログの件数に基づいてカウントメトリクスを生成したり、ログ内の数値 (リクエスト時間など) を対象とした分散メトリクスを生成したりできます。詳細は、[取り込んだログからメトリクスを生成する][16]を参照してください。

## メトリクス構成

メトリクスのメタデータには、メトリクス名や説明、単位などが含まれます。[メトリクスメタデータリソース][17]を使用して、それらの情報を変更できます。

また、タグを利用するとメトリクスに次元を追加し、可視化でのフィルタリングや集約、比較を容易に行えます。[メトリクスタグ構成リソース][18] を使用して、Terraform 上でメトリクスのタグを変更できます。タグの使用方法については、[タグの概要][19]を参照してください。


[1]: https://www.terraform.io/
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /ja/integrations/terraform/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_index
[6]: /ja/logs/log_configuration/indexes/#indexes-filters
[7]: /ja/logs/log_configuration/indexes/#exclusion-filters
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_index_order
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_custom_pipeline
[10]: /ja/logs/log_configuration/processors/?tab=ui
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_pipeline_order
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_integration_pipeline
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_archive
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_archive_order
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_metric
[16]: https://docs.datadoghq.com/ja/logs/log_configuration/logs_to_metrics/
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/metric_metadata
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/metric_tag_configuration
[19]: /ja/getting_started/tagging/