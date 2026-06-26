---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: blog
  text: Datadog Observability Pipelines によるログの変換と強化
title: プロセッサー
---

## 概要

Observability Pipelines のプロセッサを使用して、ログをパース、構造化、および拡充します。すべてのプロセッサはすべてのテンプレートで使用できます。テンプレート、ソース、および宛先を選択した後、Observability Pipelines UI でプロセッサをセットアップします。これは、パイプラインセットアッププロセスのステップ 5 です。

1. [Observability Pipelines][1] に移動します。
1. テンプレートを選択します。
1. ソースを選択してセットアップします。
1. 宛先を選択してセットアップします。
1. プロセッサをセットアップします。
1. Observability Pipelines Worker をインストールします。
1. パイプラインのモニターを有効にします。

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

#### 詳細については、プロセッサを選択してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="observability_pipelines/processors/add_hostname" >}}ホスト名を追加{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/dedupe" >}}重複排除{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/edit_fields" >}}フィールドの編集{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/enrichment_table" >}}エンリッチメントテーブル{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/filter" >}}フィルター{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/grok_parser" >}}Grok パーサー{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/parse_json" >}}JSON のパース{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/quota" >}}クォータ{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/reduce" >}}リデュース{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/sample" >}}Sample{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/sensitive_data_scanner" >}}Sensitive Data Scanner{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/observability-pipelines

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}