---
aliases:
- /ja/workflows/access
- /ja/workflows/service_accounts
description: Workflow Automation へのアクセスおよび認証
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentation
  text: インテグレーションについて
- link: /service_management/service_management/workflows/actions_catalog
  tag: Documentation
  text: ワークフローアクションの一覧を見る
kind: documentation
title: アクセス・認証
---

ワークフローとそのコンポーネントへのアクセスや認証を制御するツールがいくつかあります。

## ワークフロー ID

ワークフローは、ワークフローの所有者、またはワークフローに関連するサービスアカウントの ID を使用して実行することができます。デフォルトでは、ワークフローはその作成者の Datadog ユーザー ID を使用します。

### ワークフローの所有権を主張する

<div class="alert alert-info">ワークフローの所有権を主張するには、Datadog のユーザーがワークフローの接続に必要なロールと権限を持っている必要があります。</div>


1. 歯車 (**Settings**) アイコンをクリックします。
1. **Take ownership of workflow** を選択します。このオプションは、ワークフローの所有者でない場合のみ表示されます。
1. ワークフローの所有権を取得するには、**Confirm** をクリックします。

### サービスアカウントを使用する

サービスアカウントは、ワークフローに関連付けられ、ワークフロー実行時の ID として機能することができます。サービスアカウントは、以下のことが可能です。
- ワークフローアクションで定義された接続を、実行時に解決する
- ワークフロー実行のための ID を提供する
- ワークフロー[監査証跡][1]のための ID を提供する

ワークフローのサービスアカウントを作成するには、Datadog の管理者ロール、または **Service Account Write** 権限を持つカスタムロールのいずれかを持っている必要があります。作成したサービスアカウントは、あなたの役割と権限を採用します。サービスアカウントと権限の詳細については、 [サービスアカウント][2]または[ロールベースのアクセス制御][3]を参照してください。

#### サービスアカウントとワークフローの関連付け

[自動トリガーを追加する][4]際に、ワークフローのサービスアカウントを動的に作成することができます。

1. 歯車 (**Settings**) アイコンをクリックします。
1. **Create a service account** をクリックします。
1. サービスアカウントのユーザーのロールを選択します。
1. サービスアカウントを保存するには、**Create** をクリックします。
1. ワークフローを保存して、変更を適用します。 

ワークフローを実行する際、ワークフローアクションで定義された接続をサービスアカウントユーザーが解決します。そのため、サービスアカウントユーザーは `connections_resolve` 権限を必要とします。Datadog Admin Role と Datadog Standard Role は、`connections_resolve` 権限を含んでいます。

#### サービスアカウント詳細の表示

1. 歯車 (**Settings**) アイコンをクリックします。
1. ドロップダウンメニューからサービスアカウントを選択します。

#### ワークフローに関連付けられたサービスアカウントを削除する

1. 歯車 (**Settings**) アイコンをクリックします。
1. ドロップダウンメニューからサービスアカウントを選択します。
1. **Remove service account** をクリックします。

## アクションの資格情報

ワークフローの[アクション][5]は、外部のソフトウェアシステムと接続するため、対応するインテグレーションに対して、Datadog アカウントの認証が必要になる場合があります。ワークフローは、認証を必要とするすべてのワークフローアクションが Datadog アカウントの身元を確認できる場合にのみ、正常に実行することができます。

ワークフローアクションは、2 つの方法で認証することができます。
- インテグレーションタイルで構成された資格情報および権限
- 接続の資格情報

資格情報の構成については、[接続][7]を参照してください。

## ワークフロー権限

[ロールベースのアクセス制御 (RBAC)][3] を使用して、ワークフローと接続へのアクセスを制御します。ワークフローや接続に適用される権限の一覧は、[Datadog のロール権限][10]を参照してください。

### 接続の利用を制限する

各接続に権限を設定して、変更を制限したり、使用を制限したりします。詳細な権限には、**Viewer**、*Resolver**、*Editor** があります。

Viewer
: 表示が可能

Resolver
: 解決と表示が可能

Editor
: 編集、解決、表示が可能

接続の解決には、ステップに割り当てられた接続オブジェクトを取得し、それに関連するシークレットを取得することが含まれます。

特定の接続の権限を変更するには、以下の手順に従います。

1. [Workflow Automation ページ][9]に移動します。
1. 右上の **Connections** をクリックします。接続の一覧が表示されます。
1. 詳細な権限を設定したい接続にカーソルを合わせます。右側に、**Edit**、**Permissions**、**Delete** のアイコンが表示されます。
1. 南京錠 (** Permissions**) のアイコンをクリックします。
1. **Restrict Access** を選択します。
1. ドロップダウンメニューからロールを選択します。**Add** をクリックします。選択したロールがダイアログボックスの下部に表示されます。
1. ロール名の横にある、ドロップダウンメニューから必要な権限を選択します。
1. ロールからアクセスを削除したい場合は、ロール名の右側にあるゴミ箱のアイコンをクリックします。
1. **保存**をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/audit_trail/#overview
[2]: /ja/account_management/org_settings/service_accounts/
[3]: /ja/account_management/rbac/
[4]: /ja/service_management/workflows/trigger/
[5]: /ja/service_management/workflows/actions_catalog/
[6]: /ja/integrations/
[7]: /ja/service_management/workflows/connections/
[8]: /ja/service_management/workflows/actions_catalog/generic_actions/
[9]: https://app.datadoghq.com/workflow
[10]: /ja/account_management/rbac/permissions/#workflows