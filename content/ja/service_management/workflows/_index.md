---
algolia:
  tags:
  - ワークフロー
  - tracing_otel_inst_java
  - ワークフローの自動化
aliases:
- /ja/workflows
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: ドキュメント
  text: Workflow Automation を始める
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: ブログ
  text: Datadog Workflows でエンドツーエンドプロセスを自動化し、イベントに迅速に対応する
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: ブログ
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: ブログ
  text: Datadog Workflow Automation で Azure アプリケーションの問題を迅速に修復する
kind: documentation
title: ワークフローの自動化
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Workflow Automation はサポートされていません。</div>
{{< /site-region >}}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Datadog Workflow Automation は、エンドツーエンドプロセスのオーケストレーションと自動化を可能にします。インフラストラクチャーやツールに接続する[アクション][1]で構成されるワークフローを構築します。これらのアクションは、データおよび論理演算子も実行できるため、分岐、決定、データ演算を含む複雑なフローを構築することができます。

## ワークフローアクションの構成

Datadog Workflow Automation は、HTTP アクションや JavaScript データ演算子などの Workflow 固有のアクションに加え、複数のツールにまたがる 400 以上のアクションを提供します。これらのアクションにより、フローで必要とされるあらゆるタスクを実行することができます。

## ブループリントから始める

Datadog では、あらかじめ構成されたフローをすぐに使える[ブループリント][2]という形で提供しています。数十のブループリントは、インシデント管理、DevOps、変更管理、セキュリティ、および修復に関するプロセスの構築を支援します。

## 重要なタスクの自動化

モニター、セキュリティシグナル、ダッシュボードからワークフローをトリガーすることも、手動でトリガーすることも可能です。この柔軟性により、システムの健全性に影響を与える問題を認識した時点で、適切なワークフローで対応することができます。Datadog Workflow Automation で重要なタスクを自動化すると、解決までの時間が短縮され、エラーの可能性が減少するため、システムを稼働させ続けることができます。

## Workflows Overview ダッシュボード

Workflows Overview ダッシュボードは、Datadog ワークフローと実行のおおまかな概要を提供します。ダッシュボードを見つけるには、**Dashboards > Dashboards list** に移動し、`Workflows Overview` を検索します。

{{< img src="service_management/workflows/workflows-dashboard.png" alt="Workflows Overview ダッシュボード" style="width:100%;" >}}

## 例

以下は、構築可能なワークフローの例です。
- Auto Scaling Group の重要なメトリクスを追跡するモニターがアラート状態になったときに、AWS Auto Scaling Group のスケーリングを自動化します。
- Security Signals で検出する悪意のある IP の調査用ノートブックを自動的に作成し、CloudFlare でこれらの IP をボタンクリックでブロックすることができます。
- システムの健全性を追跡するために使用しているダッシュボードから直接、アプリケーションの安定バージョンにロールバックするワークフローを実行します。
- GitHub にある機能フラグのコンフィギュレーションファイルを自動的に更新し、プルリクエストやマージのプロセスを自動化することで、機能フラグを管理します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/workflows/actions_catalog/
[2]: /ja/workflows/build/#build-a-workflow-from-a-blueprint