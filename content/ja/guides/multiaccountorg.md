---
last_modified: 2017/02/24
translation_status: complete
language: ja
title: Multiple Accounts を設定する
kind: guide
listorder: 18
---

<!-- There are two ways to have multiple accounts have access to the same data. First, you can simply add multiple users to the same team from the [Team Page](https://app.datadoghq.com/account/team). The second is through the use of organizations. Organizations are typically used by Managed Service Providers which have multiple large scale customers which should not have access to each others' data. When a user is added to multiple organizations, they will be able to quickly switch between orgs from the avatar menu in the main menu. -->

一つの Datadog login IDで、複数の Datadog アカウントに渡ってアクセスできるようにするには、二つの方法があります。

1. 既に複数の Datadog アカウントがある場合は、[チーム ページ](https://app.datadoghq.com/account/team) から、複数のユーザを同じチームに追加します。
2. 既存の Datadog login ID で、新たに Datadog アカウントを作成することで、複数の組織に所属させます。この方法は、複数の大規模顧客を持つマネージド サービス プロバイダのように、顧客間で相互にデータのアクセス権があるのは好ましくない場合に使用します。

ユーザが複数の組織に帰属すると、メインメ ニューのアバターメ内のニューから、素早く組織を切り替えることができるようになります。

![Switch Accounts](/static/images/guides-multacct-switchaccts.png)
{:style="width:200px;"}

<!-- ## Teams

### Add New Members

1. To add members to a team, start by visiting the [Team Page][Teampage].
2. Enter the email address of the person you want to add to your team. Click **Invite Users**
  ![Add Member To Team](/static/images/guides-multacct-addtoteam.png)

The new user will receive an email with a link to login. -->

## チーム ページから追加する方法で

### 新メンバーの招待

1. チームにメンバーを追加するには、先ず [Team Page][Teampage] にアクセスします。
2. チームに追加したい人材の E-mail のアドレスを記入し、**Invite Users** をクリックします。

  ![Add Member To Team](/static/images/guides-multacct-addtoteam.png)

招待したメンバーには、login 先が記載された E-mail が送信されます。

<!-- ### Disable Existing Members
***NOTE:** You must be an Admin of the team to disable members*

1. Go to the [Team Page][TeamPage].
2. Hover over the avatar for the user you wish to disable. Choose **Disable** from the menu.

    ![Disable Member](/static/images/guides-multacct-disable.png)
    {: style="width:200px;"}
-->

### 既存メンバーからのアクセスを禁止する

***注:** 既存メンバーからのアクセスを禁止する操作は、管理者権限が必要です。*

1. [Team Page][TeamPage] にアクセスします。
2. アクセスを禁止したいユーザのアバターにカーサーを移動します。ギアのマーク内のメニューから **Disable** を選択します。

    ![Disable Member](/static/images/guides-multacct-disable.png)
    {: style="width:200px;"}


<!--
### Promote Existing Members to Admin
***NOTE:** You must be an Admin of the team to promote members*

1. Go to the [Team Page][TeamPage].
2. Hover over the avatar for the user you wish to disable. Choose **Make Admin** from the menu. -->

### 既存メンバーを管理者に昇格する

***注:** 既存メンバーを管理者に昇格する操作は、管理者権限が必要です。*

1. [Team Page][TeamPage] にアクセスします。
2. 管理者に昇格させたいユーザのアバターにカーサーを移動します。ギアのマーク内のメニューから **Make Admin** を選択します。


<!-- ## Organizations

The Multi-Account Organizations feature must be enabled by support. If this is a feature you need, please contact support at [support@datadoghq.com](mailto:support@datadoghq.com). -->

## 新しい組織を登録する方法で

Multi-Account Organizations の機能は、Datadog のサポートにより有効化するプロセスが必要です。この機能が必要な場合は、[support@datadoghq.com](mailto:support@datadoghq.com) へ、その旨の依頼を送信してください。

<!-- ### Create a New Organization

1. After the feature has been enabled, visit the [New Account Page](https://app.datadoghq.com/account/new_org).
2. Enter the name of the organization you wish to create and click the **Create** button.

    ![Create Org](/static/images/guides-multacct-createorg.png)

A new trial account will be created. If you wish to add this account to your existing billing settings, please contact your sales representative.
 -->

### 新しい Organization の登録

1. 機能が有効になった旨の連絡を受けた後、[New Account Page](https://app.datadoghq.com/account/new_org) にアクセスします。
2. 新しい Organization の名前を入力し、**Create** をクリックします。

    ![Create Org](/static/images/guides-multacct-createorg.png)

新しいトライアルアカウントが、作成されます。新規アカウントの請求を既にある請求口座の中に追加するためには、担当セールスまで連絡してください。


<!-- ### Leave an Organization

1. Go to your [Account Profile page](https://app.datadoghq.com/account/profile).
2. Scroll down to Organizations and click **Leave** next to the org you want to leave.

    ![Leave Org](/static/images/guides-multacct-leaveorg.png)

To add, disable, and promote members, see the instructions above for Teams. -->

### Organization からの退会

1. [Account Profile page](https://app.datadoghq.com/account/profile) にアクセスします。
2. Organizations セクションにスクロールし、退会したい organazaion 名の横の **Leave** をクリックします。

    ![Leave Org](/static/images/guides-multacct-leaveorg.png)

チーム メンバーの追加、アクセス禁止、管理者への昇格については、上記の"チーム ページから追加する方法で"のセクションを参照してください。


[TeamPage]: https://app.datadoghq.com/account/team
