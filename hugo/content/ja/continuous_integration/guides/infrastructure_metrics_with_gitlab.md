---
description: GitLab Autoscale ジョブ実行とインフラストラクチャーメトリクスを関連付ける方法
further_reading:
- link: /continuous_integration/pipelines/gitlab
  tag: ドキュメント
  text: GitLab パイプラインで CI Visibility を設定する
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: ドキュメント
  text: パイプライン実行を検索および管理する方法
title: Datadog でインフラストラクチャーメトリクスを GitLab ジョブと関連付ける
---

<div class="alert alert-info"><strong>注</strong>: この方法は "Instance" または "Docker Autoscaler" エグゼキュータを使用しているランナーにのみ適用されます。</div>

## 概要

[CI Visibility Explorer][9] で GitLab ジョブをクリックすると、ホスト、システム、ホストタグ、ホストメトリクスなどの情報を含む **Infrastructure** タブにアクセスできます。

{{< img src="continuous_integration/infrastructure_tab.png" alt="ホストとそのシステムに関する情報、および CPU 使用率やロードアベレージなどのホストメトリクスを表示している Infrastructure タブ" style="width:100%;">}}

このガイドでは、GitLab の "Instance" または "Docker Autoscaler" エグゼキュータを使用している場合に、[CI Visibility][1] を利用して GitLab ジョブとインフラストラクチャーメトリクスを関連付ける方法を説明します。

## 前提条件

GitLab ジョブが実行される仮想マシン (VM) に Datadog Agent がインストールされている必要があります。[GitLab インスタンス][2]や [Docker Autoscaler][3] エグゼキュータが実行されている場所ではなく、fleeting プラグインで作成される VM 側です。

## インスタンスに Datadog Agent がインストールされていることを確認する

[AWS Autoscaling Group][4] を使用している場合は、テンプレートで設定されているマシンイメージが [Datadog Agent][5] を起動時に読み込むようにしてください。

このステップが正しく行われているかテストするには、ジョブを実行し、[Infrastructure List ページ][6]にホストが表示されるか確認してください。

AWS を使用している場合、ホスト名が `“i-xxxxx”` の形式であることを確認してください。そうなっていない場合、インスタンスが IMDSv1 に対応しているかを確認してください。詳細は [公式 AWS ドキュメント][7]を参照してください。

AWS Autoscaling Group のテンプレート内でこれを設定できます。Datadog Agent はメタデータサービスのエンドポイントを使用してホスト名を解決します。

## GitLab ジョブの CI Visibility とログ収集を設定する

GitLab ジョブの CI Visibility を設定する手順については、[GitLab パイプラインで Pipeline Visibility を設定する][1]を参照してください。

セットアップが成功しているかテストするには、GitLab パイプラインを実行して [**Executions** ページ][8]に表示されるかを確認します。

ジョブログの収集を有効にする必要があります。パイプライン実行の Logs タブをクリックして、Datadog がログを正しく受信しているか確認できます。

これらの手順を完了すると、GitLab ジョブはインフラストラクチャーメトリクスと関連付けられます。関連付けはパイプライン単位ではなくジョブ単位で行われます。異なるジョブが異なるホスト上で実行される可能性があるためです。**Infrastructure** タブはジョブが終了し、そのジョブのログを Datadog が受信した後に表示されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/pipelines/gitlab
[2]: https://docs.gitlab.com/runner/executors/instance.html
[3]: https://docs.gitlab.com/runner/executors/docker_autoscaler.html
[4]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html
[5]: /ja/agent/
[6]: https://app.datadoghq.com/infrastructure
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: /ja/continuous_integration/explorer/?tab=pipelineexecutions