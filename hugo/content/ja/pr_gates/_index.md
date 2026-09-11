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
description: PR Gates の使い方を学び、チームが本番に到達できるコードを制御できるようにします。
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリース ノート
  text: 最新の Software Delivery のリリースをご確認ください。 (App ログインが必要)
- link: https://www.datadoghq.com/blog/datadog-quality-gates/
  tag: ブログ
  text: Datadog Quality Gates でコードの信頼性を高める
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: ブログ
  text: Datadog Monitors を GitHub Actions のデプロイの品質ゲートとして使用する
- link: https://www.datadoghq.com/blog/datadog-flaky-tests/
  tag: ブログ
  text: '不安定なテスト: 隠れたコストと不安定な挙動への対処法'
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: ブログ
  text: Datadog IaC Security でクラウドの設定ミスが本番に到達するのを防止する
is_beta: false
title: PR Gates
---

## 概要

PR Gates は、基準未満のコードを含むプル リクエストがマージされるのをブロックするルールを構成して、ソフトウェアのセキュリティと品質を制御できるようにします。基準未満のコードを含むプル リクエストをマージできないようにすることで、最終的に本番にデプロイされるコードが高い組織標準に準拠し、インシデントを削減し、望ましくない挙動を最小限に抑えられます。

{{< img src="pr_gates/setup/sca_3.png" alt="リポジトリで重大度 Critical または High のライブラリの脆弱性が検出された場合に失敗をトリガーする SCA ルール。" style="width:100%" >}}

PR Gates でできること:

* Datadog のデータを使用してプル リクエストをブロックするルールを作成し、基準を満たすコードだけがマージされるようにします。
* 組織に、基準未満のコード変更が本番に到達するのを防ぐ手段を提供します。
* 厳密な適用とカスタマイズ可能なルールにより、コードのセキュリティと品質を継続的に向上させます。

PR Gates のルールは次のカテゴリに対して構成できます:

| ソース タイプ     | 条件タイプ |
| --- | ----------- |
| [**静的コード解析**][1] | - コードの脆弱性<br/> - コード品質の違反 |
| [**ソフトウェア コンポジション解析**][2] | - ライブラリの脆弱性<br/> - ライブラリのライセンス違反 |
| [**コード カバレッジ**][3] | - 合計のコード カバレッジ<br/> - パッチ コード カバレッジ |
| [**Infrastructure as Code スキャン**][4] | - IaC の脆弱性 |

PR Gates のルールを作成すると、Datadog は [GitHub 連携][5] または [Azure DevOps Source Code 連携][6] を使用して、プル リクエストに対するチェックを自動的に作成します。適用を開始する準備ができたら、GitHub または Azure DevOps でそれらのチェックを Required に設定してください。

<div class="alert alert-warning">
  公開リポジトリのプル リクエスト、またはソース ブランチとは別のリポジトリのブランチを宛先ブランチとしてターゲットにするプル リクエスト (つまり、フォークしたリポジトリからメイン リポジトリへのマージ) では、PR Gates はサポートされていません。
</div>

## ルール タイプ

PR Gates は次のルール タイプを提供します:

{{< tabs >}}
{{% tab "静的コード解析 (SAST)" %}}

プル リクエストが、特定の重大度のコードの脆弱性またはコード品質の違反を 1 件以上導入する場合に、コードのマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/static_analysis_3.png" alt="リポジトリに重大度 error レベルの新しいコード品質の違反が 1 件以上含まれると失敗する PR Gate ルール" style="width:80%" >}}

{{% /tab %}}
{{% tab "ソフトウェア コンポジション解析 (SCA)" %}}

プル リクエストが、特定の重大度のライブラリの脆弱性を 1 件以上、または禁止されたライセンスのライブラリを 1 件以上導入する場合に、コードのマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/sca_3.png" alt="リポジトリに重大度 Critical または High のライブラリの脆弱性が 1 件以上含まれると失敗する PR Gate ルール" style="width:80%" >}}

{{% /tab %}}
{{% tab "コード カバレッジ" %}}
プル リクエストによって、リポジトリ全体のコード カバレッジが特定のパーセンテージを下回る場合、またはパッチのカバレッジが特定のしきい値を下回る場合に、コードのマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/code_coverage.png" alt="リポジトリに重大度 Critical または High のライブラリの脆弱性が 1 件以上含まれると失敗する PR Gate ルール" style="width:80%" >}}

{{% /tab %}}

{{% tab "Infrastructure as Code スキャン" %}}
プル リクエストが、特定の重大度の Infrastructure as Code (IaC) の脆弱性を 1 件以上導入する場合に、コードのマージをブロックするルールを作成できます。

{{< img src="pr_gates/setup/iac.png" alt="リポジトリに重大度 Critical または High のライブラリの脆弱性が 1 件以上含まれると失敗する PR Gate ルール" style="width:80%" >}}

{{% /tab %}}
{{< /tabs >}}

PR Gate ルールを作成するには、[セットアップ ドキュメント][7] を参照してください。

## ルールの管理

[**PR Gates Rules**][8] ページで PR Gates のルールを管理および更新できます。プロジェクトの要件とリスク許容度に基づいて、セキュリティと品質のプラクティスを改善できます。

組織で定義されたすべてのルールを確認できます。

{{< img src="pr_gates/rules_list_3.png" alt="Datadog の PR Gate ルールの一覧" style="width:100%" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/static_analysis
[2]: /ja/security/code_security/software_composition_analysis
[3]: /ja/code_coverage/
[4]: /ja/security/code_security/iac_security/
[5]: /ja/integrations/github/
[6]: /ja/integrations/azure_devops_source_code/
[7]: /ja/pr_gates/setup/
[8]: https://app.datadoghq.com/ci/pr-gates