---
description: CD Visibility がコード変更を検出する方法をご紹介します。
further_reading:
- link: /continuous_delivery/deployments/
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: デプロイメントをクエリして視覚化する方法
title: コード変更検出
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility はプレビュー版です。アクセスは、すでに登録されている組織に限定されています。
{{< /callout >}}

## 概要 {#overview}

コード変更検出を使用すると、Datadog はデプロイメントの一部として導入されたコミットを特定できます。これは特に以下の場合に役立ちます。
- 特定の変更がどこにデプロイされたかを把握する (`production` 環境に更新がいつ到達したかを追跡するなど)。
- 導入された正確な変更を可視化することで、デプロイメントに関連するインシデントを診断する。これにより、チームは潜在的な根本原因をすばやく特定し、トラブルシューティングを迅速化できます。

デプロイされたコード変更を検出するために、Datadog は現在のデプロイメントコミット SHA と前回のデプロイメントコミット SHA の間で [`git log`][1] を実行します。マージコミットは計算から除外されます。

デプロイされたコード変更は、[Deployment Executions ページ][2] の任意のデプロイメント実行内で確認できます。[{{< ui >}}Code Changes{{< /ui >}}] タブには、考慮された前回のデプロイメントと、その 2 つの間で検出されたコード変更が表示されます。

{{< img src="continuous_delivery/features/code_changes_tab.png" alt="変更検出機能の [Code Changes] タブ" style="width:100%;">}}

さらに、[Recent Code Changes][3] ページの [{{< ui >}}Deployments{{< /ui >}}] カラムには、特定のコミットが含まれるすべてのデプロイメントのサービスおよび環境の詳細が表示されます。このビューを使用すると、コード変更がデプロイされているかどうか、またどこにデプロイされているかをすばやく把握できます。
サービスの値にカーソルを合わせると、サービスが通常デプロイされる場所に基づいて、デプロイメントがすべての期待される環境に到達したかどうかが表示されます。

{{< img src="continuous_delivery/features/recent_code_changes_deployments.png" alt="[Recent Code Changes] ページでのデプロイメントの表示" style="width:100%;">}}

コード変更は、以下の条件を満たすデプロイメントに対してのみ検出されます。
- Catalog にファイルパスの仕様が定義されているサービス (`@deployment.service`) を保持していること (詳細については、[セットアップ手順](#specify-service-file-path-patterns)を参照してください)。
- 環境 (`@deployment.env`) を保持していること。
- リポジトリ URL (`@deployment.git.repository_url`) とコミット SHA (`@deployment.git.commit.sha`) を保持していること。

## セットアップ {#setup}

デプロイメントでコード変更検出を有効にするには、2 つのステップが必要です。
1. [リポジトリのメタデータを Datadog に同期します ](#synchronize-repository-metadata-to-datadog)。
2. [サービス用のソースコードファイルパスを指定します ](#specify-service-file-path-patterns)。

### リポジトリのメタデータを Datadog と同期する {#synchronize-repository-metadata-to-datadog}

<!--
The Following tabs were mostly copied from the Source Code Integration docs until we find a way to document this in a shared page
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> トリガーを実行する GitHub ワークフロー<code>pull_request</code> </a> は GitHub インテグレーションではサポートされていません。
このトリガーを使用している場合は、 <code>pull_request</code> 代替方法を使用してください。
</div>

[GitHub インテグレーション][1] がまだインストールされていない場合は、[GitHub インテグレーションタイル][2] にインストールしてください。

GitHub アプリを構成する際:
1. {{< ui >}}Contents{{< /ui >}} と {{< ui >}}Pull Requests{{< /ui >}} に対して、少なくとも {{< ui >}}Read{{< /ui >}} リポジトリ権限を選択してください。
2. 少なくとも {{< ui >}}Push{{< /ui >}}、{{< ui >}}PullRequest{{< /ui >}}、および {{< ui >}}PullRequestReview{{< /ui >}} の各イベントに登録してください。

セットアップが有効であることを確認するには、[GitHub integration タイル][2] で GitHub アプリを選択し、[{{< ui >}}Datadog Features{{< /ui >}}] テーブルで {{< ui >}}Pull Request Information{{< /ui >}} 機能が有効とマークされていることを確認してください。

[1]: https://docs.datadoghq.com/ja/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}

[アプリ内オンボーディング][1] に従って、GitLab ソースコードインテグレーションをセットアップしてください。

**注**: サービスアカウントの個人アクセストークンのスコープは、少なくとも `read_api` である必要があります。

[1]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
{{% /tab %}}

{{% tab "その他の Git プロバイダー" %}}

[`datadog-ci git-metadata upload`][1] コマンドを使用して、Git リポジトリのメタデータをアップロードできます。
このコマンドが実行されると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、および追跡したファイルのパスのリストを受け取ります。

新しいコミットごとに CI でこのコマンドを実行してください。特定のコミット SHA に対してデプロイが実行される場合、デプロイイベントが送信される**前**に、そのコミットに対して `datadog-ci git-metadata upload` コマンドを必ず実行してください。

<div class="alert alert-danger">
コマンドに対して <code>--no-gitsync</code> オプションを <code>datadog-ci git-metadata upload</code> 指定しないでください。
そのオプションが含まれている場合、コミット情報は Datadog に送信されず、変更は検出されません。
</div>

コマンドの正しいセットアップは、コマンド出力を確認することで検証できます。正しい出力の例を以下に示します。

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### サービスファイルパスのパターンを指定します {#specify-service-file-path-patterns}

デプロイによって導入されたコード変更を正しく理解するには、デプロイ対象の特定のサービスに影響を与えるコミットのみを考慮する必要があります。

これは、[Catalog][5] で、対象のサービスに対して [サービス定義][4] 内のソースコードの glob ファイルパスパターンを指定することで実行できます。

サービス定義にアプリケーションフォルダーへの**完全な** GitHub または GitLab URL が含まれている場合、単一のパスパターンが自動的に使用されます。リンクタイプは **repo** でなければならず、リンク名は "Source" またはサービスの名前 (以下の例では `shopist`) でなければなりません。

リポジトリに単一のサービスが含まれており、すべてのディレクトリをコード変更の対象としたい場合は、このステップをスキップできます。リポジトリから 2 つ以上のサービスをデプロイする場合は、ソースコードパスのパターンを指定する必要があります。

**例 (スキーマバージョン v2.2):**

{{< tabs >}}
{{% tab "GitHub" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```

{{% /tab %}}

{{% tab "GitLab" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```

{{% /tab %}}
{{< /tabs >}}

`shopist` サービスのデプロイに対するコード変更検出では、`src/apps/shopist/**` パス内の変更を含む Git コミットのみが考慮されます。`extensions[datadoghq.com/cd-visibility]` または `extensions[datadoghq.com/dora-metrics]` のいずれかを使用して、より詳細な制御を構成できます。両方の拡張機能が検出された場合は、`extensions[datadoghq.com/cd-visibility]` が使用されます。**例 (スキーマバージョン v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

`shopist` サービスのデプロイに対するコード変更検出では、`src/apps/shopist/**` または `src/libs/utils/**` パス内の変更を含む Git コミットのみが考慮されます。

サービスのソースコードパターンがリンクと拡張機能の両方で定義されている場合、コミットをフィルタリングする際には拡張機能のみが考慮されます。

#### サービスのファイルパスパターンを使用してリポジトリ全体の変更を追跡する {#use-service-file-path-patterns-to-track-changes-across-the-entire-repository}
リポジトリ全体にわたる変更を検出するには、適切なファイルパスパターンを使用してください。たとえば、`"**"` はすべてのファイルに一致します。**例 (スキーマバージョン v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - "**"
```

この場合、`shopist` サービスのデプロイメントにおけるコード変更検出では、リポジトリツリー全体の変更を含む Git コミットが考慮されます。

<div class="alert alert-danger">パターンに完全に一致するか <code>**</code> またはそれで始まる場合は、引用符で囲んでください。これは、 <code>*</code> YAML でアンカー用に予約されているためです。</div>


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/docs/git-log
[2]: https://app.datadoghq.com/ci/deployments/executions
[3]: https://app.datadoghq.com/ci/commits
[4]: /ja/internal_developer_portal/catalog/entity_model/
[5]: /ja/internal_developer_portal/catalog/