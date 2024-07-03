---
description: Learn how Pipelines are modeled and what execution types are supported
  by CI Visibility.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Learn about Pipeline Visibility
title: Pipeline Data Model And Execution Types
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

このガイドでは、CI Visibility でパイプライン実行をプログラムで設定する方法を説明し、CI Visibility がサポートするパイプライン実行のタイプを定義します。

このガイドは、[公開 CI Visibility Pipelines API][3] を使用して作成されたパイプラインに適用されます。他の CI プロバイダとのインテグレーションは異なる場合があります。

## データモデル

Pipeline executions are modeled as traces, similar to an [APM distributed trace][1], where spans represent the execution of different parts of the pipeline. The CI Visibility data model for representing pipeline executions consists of four levels:

| レベル名 | 説明 |
| ---------- | ----------- |
| パイプライン (必須)  | 他のすべてのレベルを子として含む、最上位のルートスパン。パイプラインの開始から終了までの全体的な実行を表します。CI プロバイダーによっては、このレベルを `build` や `workflow` と呼ぶこともあります。 |
| ステージ      | Serves as a grouping of jobs under a user-defined name. Some CI providers do not have this level. |
| ジョブ        | コマンドが実行される最小の作業単位。このレベルのタスクはすべて 1 つのノードで実行する必要があります。 |
| 手順       | CI プロバイダーによっては、このレベルはシェルスクリプトやジョブ内で実行されるアクションを表します。 |

パイプライン、ステージ、ジョブ、ステップが終了すると、実行データが Datadog に送信されます。Pipeline Visibility を設定するには、[サポートされている CI プロバイダー][2]のリストを参照してください。CI プロバイダーまたはワークフローがサポートされていない場合は、[公開 API エンドポイント][3]を使用してパイプラインの実行データを CI Visibility に送信できます。

{{< img src="ci/ci-pipeline-execution.png" alt="パイプライン実行トレースの例" style="width:100%;">}}

Stages, jobs, and steps are expected to have the exact same pipeline name as their parent pipeline. In the case of a mismatch, some pipelines may be missing stage, job, and step information. For example, missing jobs in the job summary tables.

### パイプライン固有 ID

All pipeline executions within a level must have an unique identifier. For example, a pipeline and a job may have the same unique ID, but not two pipelines.

When sending repeated IDs with different timestamps, the user interface may exhibit undesirable behavior. For example, flame graphs may display span tags from a different pipeline execution. If duplicate IDs with the same timestamps are sent, only the values of the last pipeline execution received are stored.

## パイプライン実行タイプ

### 通常の実行

パイプラインの通常の実行は、以下のフローに従います。

{{< img src="ci/pipeline-normal-execution-flow.png" alt="通常のパイプライン実行の描写" style="width:100%;">}}

プロバイダーによっては、いくつかのレベルが欠落している場合があります。例えば、ステージは存在しないかもしれませんし、ジョブは並行して実行されるかもしれませんし、順番に実行されるかもしれません。

各コンポーネントの完了後、実行を表すために必要な全てのデータを含むペイロードを Datadog に送信する必要があります。Datadog はこのデータを処理し、パイプラインイベントとして保存し、[CI Visibility][2] に表示します。パイプラインの実行は Datadog に送信する前に終了する必要があります。

### 完全なリトライ

Full retries of a pipeline must have different pipeline unique IDs. 

In the public API endpoint, you can populate the `previous_attempt` field to link to previous retries. Retries are treated as separate pipeline executions in Datadog, and the start and end time should only encompass that retry.

### 部分的なリトライ

パイプライン内のジョブのサブセットをリトライする場合は、新しいパイプライン固有 ID を持つ新しいパイプラインイベントを送信する必要があります。新しいジョブのペイロードは、新しいパイプライン固有 ID にリンクされていなければなりません。前回のリトライとリンクさせるには、`previous_attempt` フィールドを追加します。

Partial retries are treated as separate pipelines as well. The start and end time must not include the time of the original retry. For a partial retry, do not send payloads for jobs that ran in the previous attempt. Also, set the `partial_retry` field to `true` on partial retries to exclude them from aggregation when calculating run times.

例えば、`P` という名前のパイプラインには `J1`、`J2`、`J3` という 3 つのジョブがあり、順次実行されます。`P` の最初の実行では、`J1` と `J2` のみが実行され、`J2` は失敗します。

したがって、合計 3 つのペイロードを送信する必要があります。

1. `J1` のジョブペイロード。ID は `J1_1`、パイプライン ID は `P_1`。
2. `J2` のジョブペイロード。ID は `J2_1`、パイプライン ID は `P_1`。
3. `P` のパイプラインペイロード。ID は `P_1`。

`J2` から始まるパイプラインの部分的なリトライがあり、残りのジョブがすべて成功したとします。

さらに 3 つのペイロードを送信する必要があります。

1. `J2` のジョブペイロード。ID は `J2_2`、パイプライン ID は `P_2`。
2. `J3` のジョブペイロード。ID は `J3_1`、パイプライン ID は `P_2`。
3. `P` のパイプラインペイロード。ID は `P_2`。

The actual values of the IDs are not important. What matters is that they are correctly modified based on the pipeline run as specified above.

### ブロッ クされたパイプライン

パイプラインが手動介入を必要とするために無期限にブロックされる場合、パイプラインがブロッ クされた状態になるとすぐにパイプラインイベントペイロードを送信しなければなりません。パイプラインのステータスは `blocked` に設定されていなければなりません。

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="ブロックされたパイプライン実行の流れ" style="width:100%;">}}

The remaining pipeline data must be sent in separate payloads with a different pipeline unique ID. In the second pipeline, you can set `is_resumed` to `true` to signal that the execution was resumed from a blocked pipeline.

### ダウンストリームパイプライン

パイプラインが他のパイプラインの子としてトリガーされた場合、`parent_pipeline` フィールドには親パイプラインの詳細を入力する必要があります。

### 手動パイプライン

パイプラインが手動でトリガーされる場合、`is_manual` フィールドを true に設定する必要があります。

## Git 情報

Providing Git information of the commit that triggered the pipeline execution is strongly encouraged. Pipeline executions without Git information don't appear on the [Recent Code Changes page][4]. At a minimum, the repository URL, commit SHA, and author email are required. For more information, see the [public API endpoint specification][3].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/continuous_integration/pipelines/#setup
[3]: /ja/api/latest/ci-visibility-pipelines/#send-pipeline-event
[4]: https://app.datadoghq.com/ci/commits