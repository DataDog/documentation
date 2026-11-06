---
description: Datadog GitHub インテグレーションの代わりに、独自の GitHub アプリと Datadog Actions を接続します。
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: ドキュメント
  text: コネクション
title: GitHub アプリコネクション
---
## 概要{#overview}

Datadog GitHub インテグレーションタイルでアクションを認証する代わりに、独自の GitHub アプリをオンボードする場合は、GitHub アプリコネクションを使用します。

このコネクションにより、Datadog はお客様の GitHubアプリのインストールとして認証を行います。GitHub アプリ ID、インストール ID、および秘密鍵を提供すると、Datadog はこれらの資格情報を使用して短期間有効なアクセストークンを自動的に要求します。このアプローチにより、ワークフローやアプリで使用可能なリポジトリと権限を制御できます。

## GitHub アプリを作成してインストールする{#create-and-install-a-github-app}

アクションに必要な権限を持つ GitHub アプリがすでにインストールされている場合は、[コネクション資格情報の収集](#gather-the-connection-credentials)に進んでください。GitHub アプリ作成オプションの詳細については、GitHub の [Registering a GitHub App][5] ガイドを参照してください。

1. GitHub で、組織の [**Settings**] (設定) > [**Developer settings**] (開発者設定) > [**GitHub Apps**] (GitHub アプリ) に移動します。
1. [**New GitHub App**] (新しい GitHub アプリ) をクリックします。
1. アプリ名とホームページ URL を入力します。
1. [**Webhook**] で、アプリの Webhook を他の目的で使用しない限り、[**Active**] (アクティブ) チェックボックスをオフにします。GitHub アプリコネクションに Webhook は必要ありません。
1. [**Permissions**] (権限) で、リポジトリのコンテンツ、プルリクエスト、問題など、アクションに必要なリソースのみへのアクセス権を付与します。
1. [**Create GitHub App**] (GitHub アプリを作成) をクリックします。
1. アプリの設定ページで、[**Install App**] (アプリをインストール) をクリックします。
1. アプリをインストールする組織を選択し、アプリがすべてのリポジトリにアクセスできるか、選択したリポジトリのみにアクセスできるかを選択します。
1. [**Install**] (インストール) をクリックします。

組織の GitHub アプリポリシーによっては、アプリのインストールに組織所有者の承認が必要になる場合があります。

## コネクション資格情報を収集する{#gather-the-connection-credentials}

GitHub から以下の値を収集します。

- **アプリ ID**: GitHub アプリの設定ページで、ページ上部に表示されている数値のアプリ ID をコピーします。
- **インストール ID**: アプリのインストール設定を開きます。インストール ID は、URL の末尾にある数値です (例: `github.com/organizations/<org>/settings/installations/12345678`)。
- **秘密鍵**: GitHub アプリの設定ページの [**Private keys**] (秘密鍵) で [**Generate a private key**] (秘密鍵を生成する) をクリックします。GitHub が `.pem` ファイルをダウンロードします。このファイルは安全に保管してください。同じ秘密鍵を GitHub から再度ダウンロードすることはできません。

## Datadog でコネクションを作成する{#create-the-connection-in-datadog}

GitHub アプリをセットアップした後、Datadog でコネクションを作成します。

1. [Action Catalog ページ][1] から [{{< ui >}}Connections{{< /ui >}}] (コネクション) タブをクリックします。
1. [{{< ui >}}New Connection{{< /ui >}}] (新しいコネクション) をクリックします。
1. {{< ui >}}GitHub{{< /ui >}} コネクションタイプを選択します。
1. {{< ui >}}GitHub App{{< /ui >}} 資格情報タイプを選択します。
1. コネクション名を入力します。
1. GitHub からコピーしたアプリ ID とインストール ID を入力します。
1. [{{< ui >}}Private Key{{< /ui >}}] フィールドに、`.pem` ファイルの内容全体を貼り付けます。
1. GitHub Enterprise Server を使用している場合は、[{{< ui >}}GitHub Hostname{{< /ui >}}] フィールドにそのホスト名を入力します。`github.com` の場合は、このフィールドを空白のままにします。
1. [{{< ui >}}Create{{< /ui >}}] をクリックします。

コネクションはデフォルトでプライベートになります。他のユーザーがワークフローやアプリでこれを使用できるようにするには、コネクションの権限設定からアクセス権を構成してください。詳細については、[Workflow Automation][2] または [App Builder][3] の「アクセスと認証」を参照してください。

## GitHub アプリの権限を更新する{#update-github-app-permissions}

GitHub アプリのインストール後に権限を追加しても、既存のインストールにはその権限が自動的に付与されません。各組織またはアカウントのアプリのインストール設定を開き、アクションで使用する前に新しい権限を承認してください。

## トラブルシューティング{#troubleshooting}

### アクションが使用する組織またはリポジトリが間違っている{#actions-use-the-wrong-organization-or-repositories}

コネクション内のインストール ID が、想定される組織およびリポジトリのインストールと一致しているかどうかをチェックしてください。インストール ID は、アプリのインストール設定 URL で確認できます。

### アクションが権限エラーを返す{#an-action-returns-a-permission-error}

GitHub アプリに構成された権限と、そのインストールで利用可能なリポジトリをチェックしてください。アプリのインストール後に権限を追加した場合は、インストール設定を開いて新しい権限リクエストを承認してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][4] の **#workflows** または **#app-builder** チャンネルにご参加ください。

[1]: https://app.datadoghq.com/actions/action-catalog
[2]: /ja/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[3]: /ja/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection
[4]: https://chat.datadoghq.com/
[5]: https://docs.github.com/apps/creating-github-apps/registering-a-github-app/registering-a-github-app