---
title: Gating your GitHub Actions Deployments with Datadog Monitors
description: Learn how to use Datadog monitors to perform quality checks prior to deploying your GitHub applications.
aliases:
  - /continuous_integration/guides/github_gating
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/"
    tag: Blog
    text: Monitor your GitHub Actions workflows with Datadog CI Visibility
  - link: /integrations/guide/source-code-integration
    tag: Documentation
    text: Learn about the GitHub integration
  - link: "https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/"
    tag: Documentation
    text: Enable test summaries on your GitHub pull requests
  - link: "https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/"
    tag: Blog
    text: Detect failed quality checks with GitHub Deployment Protection Rules and Datadog
---

## 概要

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

Datadog は [GitHub Actions Deployment Protection Rules][10] のインテグレーションパートナーであり、エンドカスタマーに高品質のアプリケーションを確実に提供することができます。Datadog のモニターを使用して、GitHub Actions のデプロイメントワークフローに品質監視を強制することができます。

これらの機能は、GitHub Enterprise Cloud で Datadog のすべてのお客様が利用可能で、CI Visibility の利用は必要ありません。

## Deployment Protection Rules を有効にする
アプリケーションのデプロイの品質チェックを Datadog に依存するためには、アプリケーションの Deployment Protection Rules 機能を有効にする必要があります。

### Datadog で新しい GitHub アプリケーションをセットアップする

[これらの手順][1]を参照して、Datadog に自動的に接続される GitHub アプリケーションを作成します。**Deployment Protection Rules** のチェックボックスを忘れずにチェックしてください。

{{< img src="ci/github_gates_new_app.png" alt="Datadog GitHub プルリクエストコメントプレビュー" style="width:100%;">}}

すでに GitHub アプリケーションをセットアップして Datadog に接続している場合、アプリ内の [GitHub インテグレーションタイル][2]に Deployment Protection Rules を有効にするためのリンクがあります。

{{< img src="ci/github_gates_existing_app.png" alt="Datadog GitHub プルリクエストコメントプレビュー" style="width:100%;">}}

### GitHub で Deployment Protection Rules を構成する
1. デプロイの読み取り権限と書き込み権限を有効にします。
2. アクションの読み取り権限を有効にします。
3. アプリケーションの **Subscribe to events** で、**Deployment protection rule** のチェックボックスをクリックします。
4. リポジトリで、**Settings** をクリックします。**Code and Automation** セクションの下にある、**Environments** をクリックします。**Deployment Protection Rules** で、Datadog インテグレーションと連携している GitHub アプリケーションを有効にします。

## デプロイを選別するためのモニターを作成する

[こちらの手順][3]に従って、GitHub Actions のデプロイメント選別に使用する Datadog モニターを作成・構成します。

品質チェックのために複数の別々のモニターを使用することもできますが、Datadog では、1 つのモニターで 2 つ以上のシグナルに基づいてデプロイを選別できることから、[複合条件モニター][4]の使用を推奨しています。詳しくは、[モニターの種類][5]を参照してください。

品質の選別に使用する予定のモニターは、以下のタグで適切にタグ付けする必要があります。
- `git_env` 
- `git_repo` 

`git_repo` タグには、リポジトリのオーナー名を `<OWNER>/<REPO>` 形式で記述する必要があります (`Datadog/my-repo` など)。

ワークフローを実行すると、GitHub Actions が Datadog のモニターにリクエストを送ります。以下に示すモニターの評価結果の 1 つに基づいて、Datadog は GitHub にコメントを返送し、これは GitHub でワークフロー実行内の関連イベントと環境の **Comment** セクションで確認できます。
- デプロイに関連するすべてのモニター (環境タグやリポジトリタグを通して) が `OK` の状態であれば、Datadog はデプロイを承認します。
- デプロイに関連するモニターが `OK` 状態でない場合 (`ALERT`、`WARN`、`NODATA` のいずれか)、Datadog はデプロイを拒否します。

## 品質チェックの例
### アプリケーションパフォーマンス
デプロイ前にアプリケーションのエラー率や平均レイテンシーがしきい値以下であることを確認するために、[APM モニター][7]を使用することができます。

### 環境インフラストラクチャーの健全性
デプロイ前にアプリケーションやサービスの CPU やメモリの使用状況を確認するには、[インテグレーション][8]および[メトリクスモニター][9]をご利用ください。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /integrations/github/
[3]: /monitors/configuration/?tab=thresholdalert
[4]: /monitors/types/composite/ 
[5]: /monitors/types/
[6]: /monitors/settings/
[7]: /monitors/types/apm/?tab=apmmetrics
[8]: /monitors/types/integration/?tab=checkalert 
[9]: /monitors/types/metric/?tab=threshold
[10]: https://github.blog/2023-04-20-announcing-github-actions-deployment-protection-rules-now-in-public-beta/
