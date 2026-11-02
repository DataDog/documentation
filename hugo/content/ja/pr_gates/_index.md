---
aliases:
- /ja/quality_gates/
- /ja/quality_gates/explorer/
- /ja/quality_gates/explorer/search_syntax/
- /ja/quality_gates/explorer/facets/
- /ja/quality_gates/explorer/saved_views/
- /ja/quality_gates/search/
- /ja/quality_gates/guide/
- /ja/quality_gates/guide/understanding_rule_scopes/
- /ja/pr_gates/explorer/
- /ja/pr_gates/explorer/search_syntax/
- /ja/pr_gates/explorer/facets/
- /ja/pr_gates/explorer/saved_views/
- /ja/pr_gates/search/
- /ja/pr_gates/guide/
- /ja/pr_gates/guide/understanding_rule_scopes/
description: 本番環境にデプロイされるコードをチームが管理するために PR ゲートを使用する方法を学びます。
further_reading:
- link: /tests/guides/setup_new_flaky_pr_gate/
  tag: ドキュメント
  text: 新しい不安定なテスト PR ゲートをセットアップする
- link: https://www.datadoghq.com/blog/azure-devops-source-code-integration/
  tag: ブログ
  text: Datadog の Azure DevOps Source Code インテグレーションを使用してコードの問題をより迅速に特定および修正する
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: ブログ
  text: 'ボットよりも先に CI/CD の誤構成を見つける: Datadog IaC Security による GitHub Actions の保護'
- link: https://www.datadoghq.com/blog/datadog-quality-gates/
  tag: ブログ
  text: Datadog Quality Gates を使用してコードの信頼性を向上させる
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: ブログ
  text: GitHub Actions のデプロイに品質ゲートとして Datadog モニターを使用する
- link: https://www.datadoghq.com/blog/datadog-flaky-tests/
  tag: ブログ
  text: '不安定なテスト: その隠れたコストと不安定な挙動への対処方法'
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: ブログ
  text: Datadog IaC Security を使用してクラウドの誤構成が本番環境に影響することを防ぐ
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック(アプリログインが必要です)
is_beta: false
title: PR ゲート
---
## 概要{#overview}

PR ゲートを使用すると、基準を満たさないコードを含むプルリクエストのマージをブロックするルールを構成することで、ソフトウェアのセキュリティと品質を管理できます。基準を満たさないコードを含むプルリクエストのマージを防止することで、最終的に本番環境にデプロイされるコードが組織の高い基準に適合していることを確認し、インシデントを削減し、望ましくない動作を最小限に抑えることができます。

{{< img src="pr_gates/setup/sca_4.png" alt="リポジトリ内にクリティカルまたは高重大度のライブラリ脆弱性が検出された場合に失敗をトリガーする SCA ルール。" style="width:100%" >}}

PR ゲートは [Datadog Monitors][9] と同様に、互換性のある Datadog 製品から出力されたデータと検出結果を取り込み、これらの検出結果に条件を適用して、PR が組織の基準に適合しているかどうかを判断します。開発スピードへの不必要な影響を防ぐため、PR Gates は PR のコード変更によって新しく検出された違反に対してのみブロックを行い、PR とそのブランチが作成される前にリポジトリにすでに存在していた検出結果に対してはブロックを行いません。たとえば、PR ゲートがクリティカル重大度のコード脆弱性でブロックするように構成されている場合、PR ゲートが失敗と判断し、PR をブロックするのは、PR の一部として新しいクリティカルなコード脆弱性が検出された場合だけです。

PR ゲートのルールは、以下のカテゴリーで構成できます。PR ゲートが関連する PR に対してアクションを開始するには、事前に互換性のある製品が対象のリポジトリで実行されている必要があることに注意してください。

| ソースタイプ     | 条件タイプ |
| --- | ----------- |
| [**静的コード解析 (SAST)**][1] | - コードの脆弱性<br/> - コード品質の違反 |
| [**Software Composition Analysis**][2] | - ライブラリの脆弱性<br/> - ライブラリのライセンス違反 |
| [**Code Coverage**][3] | - 全体コードカバレッジ<br/> - パッチコードカバレッジ|
| [**Infrastructure as Code Scanning**][4] | - IaC の脆弱性 |
| [**Secret Scanning**][10] | - リークされたシークレット |
| [**新しい不安定なテスト**][11] | - 新しい不安定なテスト |

PR ゲートルールを作成すると、Datadog は [GitHub][5]、[GitLab Source Code][13]、[Azure DevOps Source Code][6]、または [Bitbucket Cloud Source Code][14] インテグレーションを使用して、プルリクエストに対するチェックを自動的に作成します。PR ゲートを適用するには、適用する準備が整った段階で、GitHub、Azure DevOps、または Bitbucket Cloud でそれらのチェックを必須として設定します。GitLab では、Datadog サービスアカウントをマージリクエストの必須承認者として設定します。「[PR ゲートルールのセットアップ][15]」を参照してください。

PR ゲートでは、絵文字リアクション ([PR コメント][12]と同様) も有効にできます。PR ゲートが設定されている Datadog 製品が結果の到着を待機している間、Datadog は PR の説明に👀のリアクションを投稿します。すべての結果が到着した後は、以下のようになります。
  * すべての結果がポジティブな場合、リアクションは👍に変更されます。
  * 検出結果が少なくとも 1 つある場合、代わりにサマリーコメントに検出結果の詳細が含まれるため、👀のリアクションは削除されます。

<div class="alert alert-warning">
  PR ゲートは、ソースブランチとは異なるリポジトリの宛先ブランチをターゲットとするプルリクエスト (つまり、フォークしたリポジトリからメイン リポジトリへのマージ) ではサポートされません。PR ゲートは、マージキューを使用している GitHub リポジトリでは必須として設定できません。
</div>

## ルールタイプ {#rule-types}

PR ゲートは以下のルールタイプを提供します。

{{< tabs >}}
{{% tab "Static Code Analysis (SAST)" %}}

プルリクエストの変更された行による、特定の重大度の新しいコードの脆弱性やコード品質の違反が 1 つ以上検出された場合に、コード変更のマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/static_analysis_4.png" alt="エラーレベルの重大度を持つ新しいコード品質の違反がリポジトリに 1 つ以上含まれる場合に失敗する PR ゲートルール" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis (SCA)" %}}

プルリクエストの変更された行による、特定の重大度の新しいライブラリの脆弱性が 1 つ以上検出された場合、または禁止されたライセンスの新しいライブラリが 1 つ以上検出された場合に、コード変更のマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/sca_4.png" alt="重大または高重大度のライブラリ脆弱性がリポジトリに 1 つ以上含まれる場合に失敗する PR ゲートルール" style="width:80%" >}}

{{% /tab %}}
{{% tab "Code Coverage" %}}
プルリクエストの変更された行によってリポジトリ全体のコードカバレッジが特定の割合を下回った場合、またはそれらの行のパッチカバレッジが特定のしきい値を下回った場合に、コード変更のマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/code_coverage_2.png" alt="重大または高重大度のライブラリ脆弱性がリポジトリに 1 つ以上含まれる場合に失敗する PR ゲートルール" style="width:80%" >}}

{{% /tab %}}

{{% tab "Infrastructure as Code スキャン" %}}
プルリクエストの変更された行による、特定の重大度の新しい infrastructure as Code (IaC) 脆弱性が 1 つ以上検出された場合に、コード変更のマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/iac_2.png" alt="重大または高重大度のライブラリ脆弱性がリポジトリに 1 つ以上含まれる場合に失敗する PR ゲートルール" style="width:80%" >}}

{{% /tab %}}

{{% tab "Secret Scanning" %}}
プルリクエストの変更された行による、特定の重大度の新しい漏洩したシークレットが 1 つ以上検出された場合に、コード変更のマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/secret_scanning.png" alt="重大または高重大度のシークレット漏洩がリポジトリで検出された場合に失敗する PR ゲートルール" style="width:80%" >}}

{{% /tab %}}

{{% tab "新しい不安定なテスト" %}}
プルリクエストによる 1 つ以上の新しい不安定なテストが検出された場合に、コード変更のマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/flaky_tests.png" alt="プルリクエストによる 1 つ以上の新しい不安定なテストが検出された場合に失敗する PR ゲートルール" style="width:80%" >}}

この PR ゲートを [Early Flake Detection][1] と併用して、新しい不安定なテストを検出します。

[新しい不安定なテストの PR ゲートのセットアップ方法][2]を参照してください。

[1]: /ja/tests/flaky_tests/early_flake_detection
[2]: /ja/tests/guides/setup_new_flaky_pr_gate/
{{% /tab %}}
{{< /tabs >}}

PR ゲートルールを作成するには、[セットアップドキュメント][7]を参照してください。

## ルールの管理 {#manage-rules}

PR ゲートルールは、[[{{< ui >}}PR Gates Rules{{< /ui >}}][8]] ページで管理および更新できます。プロジェクトの要件とリスク許容度に基づいて、セキュリティと品質のプラクティスを改善します。

組織によって定義されたすべてのルールを確認できます。

{{< img src="pr_gates/rules_list_3.png" alt="Datadog の PR ゲートルールリスト" style="width:100%" >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/static_analysis
[2]: /ja/security/code_security/software_composition_analysis
[3]: /ja/code_coverage/
[4]: /ja/security/code_security/iac_security/
[5]: /ja/integrations/github/
[6]: /ja/integrations/azure_devops_source_code/
[7]: /ja/pr_gates/setup/
[8]: https://app.datadoghq.com/ci/pr-gates
[9]: /ja/monitors/
[10]: /ja/security/code_security/secret_scanning/
[11]: /ja/tests/flaky_tests/
[12]: /ja/source_code/features/#pr-comments
[13]: /ja/integrations/gitlab-source-code/
[14]: /ja/integrations/bitbucket-source-code/
[15]: /ja/pr_gates/setup/