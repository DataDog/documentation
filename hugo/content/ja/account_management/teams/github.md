---
description: ネストされた Teams を含め、組織の GitHub Teams 構造に基づいて、Datadog Teams の自動プロビジョニング機能を有効にします。Datadog
  で GitHub を Teams データのソースとして使用できるようにします。
further_reading:
- link: /integrations/github/
  tag: ドキュメント
  text: GitHub インテグレーション
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: ブログ
  text: Datadog Teams の GitHub インテグレーションを使用して、サービスの所有権を最新の状態に保ちます。
title: GitHub を使用して Datadog Teams をプロビジョニングします。
---
## 概要{#overview}

GitHub Teams を Datadog Teams にリンクして、Datadog Teams が自動的にプロビジョニングされるようにします。以下の機能が利用可能です。
- GitHub Teams 構成に基づいて Datadog Teams を作成する。
- Datadog と GitHub の間で Teams のメンバーシップの同期を取る。各ユーザーが自分の Datadog アカウントを GitHub に接続する必要があります。

Datadog は、GitHub Teams のスラッグと Datadog Teams の [ハンドル][1] の完全一致マッチングを実行することにより、既存の Teams をリンクします。その一致判定では大文字と小文字が区別されず、空白の違いも無視されます。

GitHub Teams に階層構造がある場合、Datadog はプロビジョニング中に同じ構造を複製します。

**注:** Datadog において、サブチームの制限は親チームと同等か、それよりも厳しいものでなければなりません。たとえば、親チームが [招待のみ][2] の場合、サブチームを [オープン][2] することはできません。

Datadog が実行するのは GitHub のチームの読み取りのみです。Datadog が GitHub のチームを変更したり作成したり削除したりすることはありません。

## 前提条件 {#prerequisites}

### GitHub インテグレーション {#github-integration}
Datadog 組織が GitHub 組織に [接続][3] されていることを確認します。GitHub インテグレーションには、チームデータを読み取るための `members_read` 権限が必要です。

<div class="alert alert-info">GitHub Enterprise Cloud および GitHub Enterprise Server のお客様にサポートが提供されます。ただし、エンタープライズ管理のチーム (複数の組織にわたって GitHub エンタープライズレベルで管理されるチーム) はサポートされていません。Datadog の中にプロビジョニングできるのは、組織レベルの GitHub チームのみです。</div>

### 権限 {#permissions}
- チームをリンクしたり作成したりするには、Datadog ユーザーに `teams_manage` 権限が必要です。
- チームメンバーシップを管理するには、Datadog ユーザーに `user_access_manage` 権限が必要です。

## セットアップ {#setup}

### GitHub のチームを Datadog Teams に接続する{#connect-github-teams-to-datadog-teams}
1. [Teams][4] に移動します。
1. 右上の {{< ui >}}GitHub Connections{{< /ui >}} をクリックします。
1. インポートのタイプ、同期メンバー、ケイデンスのオプションを選択して、接続を構成します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

### Datadog Teams を表示します。{#view-datadog-teams}
1. [GitHub Connections][5] に移動します。
1. 作成され、リンクされた Datadog チームのリストが空の場合は、{{< ui >}}Refresh{{< /ui >}} をクリックします。
1. 必要に応じて、Datadog Teams を手動で更新し、目的の状態にします。

### ユーザー設定 {#user-configuration}

管理者が GitHub からのチームプロビジョニングを有効にすると、チーム詳細ページに通知が表示されます。この通知によりユーザーは、{{< ui >}}Log in to GitHub{{< /ui >}} の後、OAuth を介して Datadog のアカウントを GitHub のアカウントに接続するように求められます。

{{< img src="account_management/teams/github/connect-to-github-v2.png" alt="[Log in to GitHub] (GitHub にログイン) ボタンのある [Not Connected to GitHub] (GitHub に接続されていません) ボックス" style="width:60%;">}}

Datadog と GitHub の間の接続を確立するには、各ユーザーが手動で GitHub アカウントを Datadog にリンクする必要があります。この動作は、GitHub の OAuth およびユーザープライバシーポリシーにより必須になっています。

ユーザーがアカウントをリンクすると、Datadog は、そのユーザーをメンバーとして含む GitHub チームに対応する Datadog Teams にそのユーザーを追加します。

たとえば、ユーザー B が GitHub のチーム A のメンバーであるとします。Datadog で以下のようになります。
1. 管理者が Datadog Teams のプロビジョニングと GitHub からのユーザー同期を有効にする。
1. Datadog でチーム A が作成されます。この時点では空です。
1. ユーザー B に、{{< ui >}}Log in to GitHub{{< /ui >}}を促す通知が表示され、ユーザー B がそれに従います。
1. ユーザー B が Datadog のチーム A の中にプロビジョニングされます。

## チームの削除{#deleting-teams}

GitHub チームを削除しても、それに対応する Datadog チームは削除されません。その代わり、Datadog は以下の処理を実行します。
- Datadog チームから同期しているメンバーすべてを削除します。
- Datadog チームと、削除された GitHub チームの間のコネクションを削除します。
- 同期された階層リンク (親子関係) をすべて GitHub から削除します。

Datadog チーム自体は残り、引き続き独立して管理が可能です。

### 例 {#example}
1. GitHub の中にチーム A が存在しており、Datadog と同期した状態になっています (自動作成か手動リンクのいずれか)。
1. GitHub でチーム A が削除されます。
1. Datadog において、チーム A と同期しているメンバー、GitHub コネクション、および階層リンクが削除されます。
1. チーム A は Datadog の中に残り、独立して管理が可能です。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/teams/#team-handle
[2]: /ja/account_management/teams/manage/#team-modification-permissions
[3]: /ja/integrations/github/#connect-github-teams-to-datadog-teams
[4]: https://app.datadoghq.com/organization-settings/teams
[5]: https://app.datadoghq.com/organization-settings/teams/github-connections?github-connections__view=synced