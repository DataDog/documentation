---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: GitHub
  text: Automate end-to-end processes and quickly respond to events with Datadog Workflows
is_beta: true
kind: documentation
title: Workflows
---

{{< callout url="https://forms.gle/VEjerYVQ2QJhauZ57" >}}
  Workflows は公開ベータ版です。フィードバックや質問がある場合は、<a href="/help">Datadog サポート</a>にご連絡ください。
{{< /callout >}}

{{< img src="workflows/hero.jpg" alt="ワークフローの 3 つの目的であるオーケストレーション、自動化、サイロの破壊を示すグラフィック"  >}}

Datadog Workflows は、エンドツーエンドプロセスのオーケストレーションと自動化を可能にします。インフラストラクチャーやツールに接続する[アクション][1]で構成されるワークフローを構築します。これらのアクションは、データおよび論理演算子も実行できるため、分岐、決定、データ演算を含む複雑なフローを構築することができます。

## ワークフローアクションの構成

Datadog Workflows は、HTTP アクションや JavaScript データ演算子などの Workflow 固有のアクションに加え、複数のツールにまたがる 400 以上のアクションを提供します。これらのアクションにより、フローで必要とされるあらゆるタスクを実行することができます。

## ブループリントから始める

Datadog では、あらかじめ構成されたフローをすぐに使える[ブループリント][2]という形で提供しています。数十のブループリントは、インシデント管理、DevOps、変更管理、セキュリティ、および修復に関するプロセスの構築を支援します。

## 重要なタスクの自動化

モニター、セキュリティシグナル、ダッシュボードからワークフローをトリガーすることも、手動でトリガーすることも可能です。この柔軟性により、システムの健全性に影響を与える問題を認識した時点で、適切なワークフローで対応することができます。Datadog Workflows で重要なタスクを自動化すると、解決までの時間が短縮され、エラーの可能性が減少するため、システムを稼働させ続けることができます。

## 例

以下は、構築可能なワークフローの例です。
- Auto Scaling Group の重要なメトリクスを追跡するモニターがアラート状態になったときに、AWS Auto Scaling Group のスケーリングを自動化します。
- Security Signals で検出する悪意のある IP の調査用ノートブックを自動的に作成し、CloudFlare でこれらの IP をボタンクリックでブロックすることができます。
- システムの健全性を追跡するために使用しているダッシュボードから直接、アプリケーションの安定バージョンにロールバックするワークフローを実行します。
- GitHub にある機能フラグのコンフィギュレーションファイルを自動的に更新し、プルリクエストやマージのプロセスを自動化することで、機能フラグを管理します。

Lambda 関数が高いエラーレートを経験したときに再デプロイするように構成されたワークフローを以下のビデオでご覧ください。

{{< wistia 0klmggfhaf>}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/workflows/actions_catalog/
[2]: /ja/workflows/build/#build-a-workflow-from-a-blueprint