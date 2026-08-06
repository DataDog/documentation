---
aliases:
- /ja/quality_gates/setup/
description: Datadog で PR Gate ルールを設定する方法を説明します。
further_reading:
- link: /pr_gates
  tag: ドキュメント
  text: PR Gates について学ぶ
title: PR Gate ルールを設定する
---

## 概要

Datadog PR Gates を使用する場合は、[**PR Gate Rules**][1] ページで 1 つ以上のルールを定義できます。

{{< img src="pr_gates/rules_list_3.png" alt="Datadog の PR Gates ページ" style="width:100%" >}}

PR Gates は、品質基準を満たすコードのみがデプロイされることを保証し、品質保証プロセスを自動化して、ソフトウェアの信頼性を高めます。

## ルールの作成

Datadog で PR Gates ルールを作成するには、次の手順を実行します。

1. [**Software Delivery** > **PR Gates** > **PR Gate Rules**][1] に移動し、**New Rule** をクリックします。

1. **Select your source** でルール タイプを選択します。
   - 静的コード解析
   - ソフトウェア構成分析
   - コードカバレッジ
   - Infrastructure as Code スキャン

1. **Define condition** で、ルールが失敗し、関連するパイプラインも失敗する条件を設定します。各ルール タイプには独自の条件オプションがあり、ルール タイプを選択すると既存のデフォルト条件設定を使用できます。

1. **Define scope** で、ルールの評価対象となるリポジトリを設定します。
   - **All repositories**: 各ルール タイプの対象として設定されたすべてのリポジトリを評価します。
   - **Selected repositories**: 指定したリポジトリのみを評価します。指定したリポジトリのみを評価する場合は `IN` を、指定したリポジトリ_以外の_ すべての設定済みリポジトリを評価する場合は `NOT IN` を使用します。

   次の例は、プルリクエストに深刻度 `Critical` 以上のコード脆弱性違反が 1 つでも含まれている場合に失敗する静的コード解析ルールを示しています。このルールは、静的コード解析の対象として設定されたすべてのリポジトリを評価します。

   {{< img src="pr_gates/setup/static_analysis_3.png" alt="すべてのリポジトリに対して実行され、PR に `Critical` 以上の静的コード解析のコード脆弱性違反が 1 つでも含まれる場合に失敗する静的解析ルール" style="width:100%" >}}

1. **Preview checks** で、プルリクエストに追加されるステータス チェックをプレビューするために、CI プロバイダーを選択します。チェックが失敗したときにパイプラインをブロックするように設定するには、ステータス チェックを _required_ にするためのプロバイダーの手順に従ってください。

   - [GitHub][2]
   - [Azure DevOps][3]

   ノン ブロッキング ルールは、新しいルールを導入し、ブロッキングに変更する前にその動作を確認したい場合に役立ちます。

1. **Create Rule** をクリックします。

### PR チェックの管理

PR Gates は、評価対象となったルール タイプごとに、[GitHub][4] または [Azure DevOps][5] のプルリクエストに PR チェックを自動作成します。このチェックには、失敗の理由や Datadog で一致したイベントなど、ルール評価に関する追加情報が含まれます。

<div class="alert alert-info"><strong>注</strong>: プルリクエストの UI でチェックを再実行しても、対応する PR Gates ルールは再実行されません。</div>

PR Gates が PR チェックを作成できるようにするには、ご利用の SCM プロバイダーに対応するインテグレーションをインストールする必要があります。インテグレーションがインストールされていない場合は、[GitHub][6] または [Azure DevOps Source Code][7] のインテグレーション ドキュメントに従ってセットアップしてください。

## ルールの管理

PR Gates ルールを編集または削除するには、[**PR Gates Rules**][1] リスト上の該当するルールにカーソルを合わせ、**Edit** または **Delete** アイコンをクリックします。

{{< img src="pr_gates/setup/delete_3.png" alt="PR Gates ルールの編集、複製、削除" style="width:100%;">}}

## 権限

`quality_gate_rules_write` 権限を持つユーザーのみが PR Gate ルールを作成および編集できます。`quality_gate_rules_read` 権限を持つユーザーは PR Gate ルールを閲覧できます。

詳細は [RBAC 権限ドキュメント][8]を参照してください。

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[3]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[5]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops
[6]: /ja/integrations/github/
[7]: /ja/integrations/azure-devops-source-code/
[8]: /ja/account_management/rbac/permissions