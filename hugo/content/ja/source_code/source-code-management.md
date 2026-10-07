---
description: ソースコード管理 (SCM) プロバイダーインテグレーションを通じて Git リポジトリを Datadog に接続します。
further_reading:
- link: /integrations/github/
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: /integrations/gitlab-source-code/
  tag: ドキュメント
  text: GitLab ソースコードインテグレーションについて
- link: /integrations/azure-devops-source-code/
  tag: ドキュメント
  text: Azure DevOps ソースコードインテグレーションについて
- link: /integrations/bitbucket/
  tag: ドキュメント
  text: Bitbucket ソースコードインテグレーションについて
title: ソースコード管理プロバイダー
---
## 概要 {#overview}

ソースコード関連のほとんどの機能を使用するには、Datadog のファーストパーティソースコード管理 (SCM) プロバイダーインテグレーションを通じて Git リポジトリを Datadog に接続する必要があります。リポジトリを接続した後、リポジトリへの繰り返しリクエストを減らし、機能のパフォーマンスをサポートするために、Datadog がリポジトリの内容を最大 7 日間保存する場合があります。

## ソースコード管理プロバイダー {#source-code-management-providers}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">GitLab ソースコードインテグレーションは、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。GovCloud では、ソースコード接続に <a href="/integrations/github/">GitHub インテグレーション</a>を使用してください。</div>
{{< /site-region >}}

Datadog は、以下に記載されている SCM プロバイダーに関する次の機能をサポートしています。各機能の詳細については、[機能][1] を参照してください。

| 機能 | GitHub | GitLab | Azure DevOps | Bitbucket |
|---|---|---|---|---|
| **SaaS インスタンスを接続する** | Yes <br />(GitHub.com および GitHub Enterprise Cloud) | Yes <br />(GitLab.com) | Yes <br />(Azure DevOps Services) | Yes <br />(Bitbucket Cloud Premium) |
| **On-Prem インスタンスを接続する** | Yes <br />(GitHub Enterprise Server) | Yes <br />(GitLab Self-Managed または Dedicated) | No <br />(Azure DevOps Server) | No <br />(Bitbucket Data Center または Server)|
| **コンテキストリンク** | Yes | Yes | Yes | Yes |
| **コードスニペット** | Yes | Yes | Yes | Yes |
| **PR コメント** | Yes | Yes | Yes | Yes |

{{< tabs >}}
{{% tab "GitHub (SaaS & On-Prem)" %}}

<div class="alert alert-info">
GitHub インスタンスのリポジトリは、GitHub.com、GitHub Enterprise Cloud (SaaS)、および GitHub Enterprise Server (On-Prem) でサポートされています。GitHub Enterprise Server の場合、インスタンスはインターネットからアクセス可能でなければなりません。必要に応じて、<a href="https://docs.datadoghq.com/api/latest/ip-ranges/">Datadog の <code>webhooks</code> IP アドレス</a>を許可リストに登録して、Datadog がインスタンスに接続できるようにします。</br>インスタンスが内部/プライベートネットワークでホストされているものの、パブリック DNS エイリアスを通じて公開されている場合 (推奨)、パブリックホスト名を使用してインテグレーションを構成し、<a href="/help">Datadog サポートに連絡</a>して、ホスト名のエイリアスを有効にするためにパブリックホスト名と内部ホスト名の両方を伝えてください。
</div>

[インテグレーションタイル][102] を使用するか、他の Datadog 製品のオンボーディング中に Datadog の [GitHub インテグレーション][101] をインストールして、GitHub リポジトリに接続します。

[101]: https://docs.datadoghq.com/ja/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/

{{% /tab %}}
{{% tab "GitLab (SaaS & On-Prem)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">GitLab ソースコードインテグレーションは、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。GovCloud では、ソースコード接続に <a href="/integrations/github/">GitHub インテグレーション</a>を使用してください。</div>
{{< /site-region >}}

<div class="alert alert-info">
GitLab インスタンスのリポジトリは、GitLab.com (SaaS) と GitLab Self-Managed/Dedicated (On-Prem) の両方でサポートされています。GitLab Self-Managed の場合、インスタンスはインターネットからアクセス可能でなければなりません。必要に応じて、<a href="https://docs.datadoghq.com/api/latest/ip-ranges/">Datadog の <code>webhooks</code> IP アドレス</a>を許可リストに登録して、Datadog がインスタンスに接続できるようにします。</br>インスタンスが内部/プライベートネットワークでホストされているものの、パブリック DNS エイリアスを通じて公開されている場合 (推奨)、パブリックホスト名を使用してインテグレーションを構成し、<a href="/help">Datadog サポートに連絡</a>して、ホスト名のエイリアスを有効にするためにパブリックホスト名と内部ホスト名の両方を伝えてください。
</div>

[インテグレーションタイル][102] を使用するか、他の Datadog 製品のオンボーディング中に Datadog の [GitLab ソースコードインテグレーション][101] をインストールして、GitLab リポジトリに接続します。

[101]: https://docs.datadoghq.com/ja/integrations/gitlab-source-code/
[102]: https://app.datadoghq.com/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "Azure DevOps (SaaS のみ)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Azure DevOps ソースコードインテグレーションは、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。GovCloud では、ソースコード接続に <a href="/integrations/github/">GitHub インテグレーション</a>を使用してください。</div>
{{< /site-region >}}

<div class="alert alert-warning">
Azure DevOps 組織のリポジトリは、Azure DevOps Services (SaaS) でサポートされています。Azure DevOps Server (On-Prem) は<strong>サポートされていません</strong>。
</div>

[インテグレーションタイル][101] を使用するか、他の Datadog 製品のオンボーディング中に Datadog の Azure DevOps ソースコードインテグレーションをインストールして、Azure DevOps リポジトリに接続します。

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{% tab "Bitbucket (SaaS のみ)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Bitbucket Cloud ソースコードインテグレーションは、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。GovCloud では、ソースコード接続に <a href="/integrations/github/">GitHub インテグレーション</a>を使用してください。</div>
{{< /site-region >}}

<div class="alert alert-warning">
Bitbucket ワークスペースのリポジトリは、Bitbucket Cloud (SaaS) でサポートされています。Bitbucket Server および Bitbucket Data Center (On-Prem) は<strong>サポートされていません</strong>。
</div>

[インテグレーションタイル][101] を使用するか、他の Datadog 製品のオンボーディング中に Datadog の [Bitbucket Cloud ソースコードインテグレーション][102] をインストールして、Bitbucket Cloud リポジトリに接続します。

[101]: https://app.datadoghq.com/integrations/bitbucket-source-code/
[102]: /ja/integrations/bitbucket/

{{% /tab %}}
{{% tab "その他の SCM プロバイダー" %}}

<div class="alert alert-danger">
セルフホストインスタンスまたはプライベート URL 上のリポジトリは、標準ではサポートされていません。この機能を有効にするには、<a href="/help">サポートにお問い合わせ</a>ください。
</div>

他の SCM プロバイダーを使用している場合でも、テレメトリとソースコードを手動でリンクさせることができます。そのためには、[`datadog-ci git-metadata upload`][1] コマンドを使用してリポジトリのメタデータをアップロードします。`datadog-ci v2.10.0` 以降が必要です。

Git リポジトリ内で `datadog-ci git-metadata upload` を実行すると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、そして追跡したファイルのパスのリストを受け取ります。

このコマンドは、Datadog と同期する必要があるコミットごとに実行します。

### 検証 {#validation}

データが収集されていることを確認するために、CI パイプラインで `datadog-ci git-metadata upload` を実行します。

以下のような出力が期待できます。

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/source_code/features/