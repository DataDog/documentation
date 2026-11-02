---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ja/workflows
- /ja/service_management/workflows
description: インフラストラクチャーやツール全体のアクションを接続するワークフローを使用して、エンドツーエンドのプロセスをオーケストレーションおよび自動化します。
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: ドキュメント
  text: Workflow Automation を始める
- link: https://learn.datadoghq.com/courses/automating-meaningful-actions
  tag: ラーニングセンター
  text: Datadog Workflow Automation による有意義なアクションの自動化
- link: https://www.datadoghq.com/blog/cloud-siem-cases/
  tag: ブログ
  text: Datadog Cloud SIEM の Case Management を使用して、セキュリティシグナルを構造化された調査に変換します。
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: ブログ
  text: ServiceNow ITSM と Datadog を統合して、Incident Response を迅速化する
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: ブログ
  text: Datadog Forms を使用して、エンジニアリング組織全体でフィードバックを行動に変える
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: ブログ
  text: Automate end-to-end processes and quickly respond to events with Datadog Workflows
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: ブログ
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
- link: https://www.datadoghq.com/blog/soar/
  tag: ブログ
  text: Datadog SOAR ワークフローを使用して、ID 保護、脅威の封じ込め、脅威インテリジェンスを自動化します
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: ブログ
  text: Datadog Workflow Automation を使用して、Azure アプリケーションの問題を迅速に修復します
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: ブログ
  text: Datadog の AI アシスタントを使用して、わずか数分でワークフローとアプリを構築
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: ブログ
  text: Datadog Workflow Automation、Datastore、App Builder を使用して、反復的なタスクを自動化する単一のアプリを作成した方法
- link: https://www.datadoghq.com/blog/datadog-agent-builder/
  tag: ブログ
  text: 'Bits Agent Builder の紹介: アラート対応と修復のためのエージェントワークフローを構築する'
- link: https://www.datadoghq.com/blog/build-datadog-workflows-ai-agents/
  tag: ブログ
  text: Bits Chat または AI エージェントから Datadog ワークフローを構築および実行します。
title: Workflow Automation
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Datadog Workflow Automation を使用して、エンドツーエンドのプロセスをオーケストレーションおよび自動化できます。インフラストラクチャーやツールに接続する[アクション][1]で構成されるワークフローを構築します。これらのアクションはデータ操作や論理演算も実行できるため、分岐、判断、データ操作を含む複雑なフローを構築できます。

## ワークフローアクションの構成 {#configure-workflow-actions}

Datadog Workflow Automation は、HTTP アクションや JavaScript データ演算子などの Workflow 固有のアクションに加え、複数のツールにわたる 2000 以上のアクションを提供します。これらのアクションにより、ワークフローで必要なあらゆるタスクを実行できます。

## ブループリントから始める {#start-with-blueprints}

Datadog は、すぐに使える[ブループリント][2]の形で、あらかじめ構成されたワークフローを提供します。多数のブループリントが、インシデント管理、DevOps、変更管理、セキュリティ、対処に関するプロセスの構築を支援します。

## 重要なタスクを自動化する{#automate-critical-tasks}

モニター、セキュリティシグナル、ダッシュボードからワークフローをトリガーするか、手動でトリガーします。この柔軟性により、システムの健全性に影響を与える問題を認識した時点で、適切なワークフローで対応できます。Datadog Workflow Automation で重要なタスクを自動化することで、解決までの時間を短縮し、エラーの可能性を減らして、システムの稼働を維持できます。

## Workflows Overview ダッシュボード{#workflows-overview-dashboard}

Workflows Overview ダッシュボードでは、Datadog のワークフローと実行の概要を把握できます。ダッシュボードを見つけるには、[ダッシュボードリスト][3]に移動して `Workflows Overview` を検索します。

{{< img src="actions/workflows/workflows-dashboard.png" alt="Workflows Overview ダッシュボード" style="width:100%;" >}}

## 例 {#examples}

以下は、構築可能なワークフローの例です。
- Auto Scaling Group の重要なメトリクスを追跡するモニターがアラート状態になったときに、AWS Auto Scaling Group のスケーリングを自動化します。
- Security Signals で検出する悪意のある IP の調査用ノートブックを自動的に作成し、CloudFlare でこれらの IP をボタンクリックでブロックすることができます。
- システムの健全性を追跡するために使用しているダッシュボードから直接、アプリケーションの安定バージョンにロールバックするワークフローを実行します。
- GitHub にある機能フラグのコンフィギュレーションファイルを自動的に更新し、プルリクエストやマージのプロセスを自動化することで、機能フラグを管理します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][4] の **#workflows** チャンネルにご参加ください。

[1]: /ja/actions/actions_catalog/
[2]: /ja/workflows/build/#build-a-workflow-from-a-blueprint
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://chat.datadoghq.com/