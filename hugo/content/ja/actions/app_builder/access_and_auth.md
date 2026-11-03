---
aliases:
- /ja/service_management/app_builder/auth
- /ja/actions/app_builder/auth
description: App Builder へのアクセスと認証
title: アクセスと認証
---
アプリとそのコンポーネントへのアクセスや認証を制御するツールがいくつかあります。

## アプリの実行アイデンティティ {#app-execution-identity}

公開されたアプリは、その作成者の Datadog ユーザー ID、またはアプリに関連付けられたサービスアカウントを使用して実行されます。作成者は、{{< ui >}}All Apps{{< /ui >}} ビューと {{< ui >}}App Properties{{< /ui >}} の両方に表示されます。

編集モードでは、アプリは現在の編集者として実行されます。

### サービスアカウントの使用 {#use-a-service-account}

サービスアカウントをアプリに関連付けて、実行時にアプリのIDとして機能させることができます。サービスアカウントは次のことができます。
- 実行時にアプリクエリで定義されたコネクションを解決する
- アプリ実行のアイデンティティを提供する
- アプリの[監査証跡][7]のアイデンティティを提供する

アプリのサービスアカウントを作成するには、Datadog Admin ロール、または {{< ui >}}Service Account Write{{< /ui >}} 権限を持つカスタムロールのいずれかが必要です。作成するサービスアカウントは、ユーザーのロールと権限を引き継ぎます。サービスアカウントと権限の詳細については、[サービスアカウント][2]または[ロールベースのアクセス制御][3]を参照してください。

#### サービスアカウントとして実行するためのアプリの構成 {#configure-your-app-to-run-as-a-service-account}

1. 歯車 ({{< ui >}}Settings{{< /ui >}}) アイコンをクリックします。
1. {{< ui >}}Manage app identity{{< /ui >}} をクリックします。
1. {{< ui >}}Run as Service Account{{< /ui >}} を選択します。
1. サービスアカウントユーザーのロールを選択するか、既存のサービスアカウントを選択します。
1. {{< ui >}}Save{{< /ui >}} をクリックして、サービスアカウントを保存し、変更を適用します。

アプリを実行すると、サービスアカウントユーザーがアプリクエリで定義されたコネクションを解決します。そのため、サービスアカウントユーザーには `connections_resolve` 権限が必要です。Datadog Admin ロールおよび Datadog Standard ロールには、`connections_resolve` 権限が含まれています。

#### サービスアカウントの詳細表示 {#view-service-account-details}

1. 歯車 ({{< ui >}}Settings{{< /ui >}}) アイコンをクリックします。
1. {{< ui >}}Manage app identity{{< /ui >}} を選択します。
1. *Run As* の横にあるサービスアカウントをクリックします。

#### アプリに関連付けられたサービスアカウントの削除 {#remove-a-service-account-associated-with-an-app}

1. 歯車 ({{< ui >}}Settings{{< /ui >}}) アイコンをクリックします。
1. {{< ui >}}Manage app identity{{< /ui >}} を選択します。
1. {{< ui >}}Remove service account{{< /ui >}} をクリックします。

## アクションの資格情報 {#action-credentials}

アプリの[アクション][1]は外部ソフトウェアシステムと接続するため、対応するインテグレーションに対して Datadog アカウントを認証する必要がある場合があります。アプリを正常に実行できるのは、認証を必要とするすべてのアクションが Datadog アカウントのアイデンティティを確認できる場合のみです。

アクションは、次の方法で認証することができます。
- インテグレーションタイルで構成された資格情報および権限
- コネクションの資格情報

デフォルトでは、公開されたアプリの閲覧者は、そのアプリのコネクションにアクセスする必要はありません。代わりに、アクションはアプリの作成者のアイデンティティを使用します。これにより、任意の閲覧者のアイデンティティを使用してアプリが機密性の高い操作を実行することを防ぎ、共有を簡素化し、セキュリティを向上させます。
資格情報の構成については、[コネクション][8]を参照してください。App Builder は、Action Catalog と各インテグレーションのコネクション資格情報を [Datadog Workflow Automation][9] と共有します。

## アプリの権限 {#app-permissions}

デフォルト:
- アプリがドラフト状態の間、アプリにアクセスできるユーザーは作成者のみです。
- アプリの公開後、作成者は {{< ui >}}Editor{{< /ui >}} アクセスを維持し、作成者の Datadog 組織内のその他のユーザーにはアプリへの {{< ui >}}Viewer{{< /ui >}} アクセスが付与されます。

アクセス制御を使用して、ドラフトまたは公開済みのアプリへのアクセス範囲を拡張できます。

### 権限とアクセス制御 {#permissions-and-access-control}

[ロールベースのアクセス制御 (RBAC)][3] を使用して、アプリやコネクションへのアクセスを制御します。

アプリに適用される大まかな権限には、以下のようなものがあります。

{{< ui >}}Apps View{{< /ui >}}
: アプリの表示と実行。Datadog Standard および Admin ロールには、デフォルトで App Builder への表示アクセス権があります。

{{< ui >}}Apps Write{{< /ui >}}
: 新規および既存のアプリの作成と編集。Datadog Standard および Admin ロールには、デフォルトで App Builder への書き込みアクセス権があります。

{{< ui >}}Connections Read{{< /ui >}}
: 利用可能なコネクションの一覧表示と表示。Datadog Read Only、Standard、および Admin ロールには、デフォルトでコネクションへの読み取りアクセス権があります。

### 特定のアプリへのアクセスの制限 {#restrict-access-to-a-specific-app}

各アプリに権限を設定して、アプリの変更を制限します。

App Builder では、各アプリについて以下の権限が提供されます。

{{< ui >}}Viewer{{< /ui >}}
: アプリの実行と表示

{{< ui >}}Contributor{{< /ui >}}
: アプリの編集、実行、および表示

{{< ui >}}Editor{{< /ui >}}
: アプリの編集、実行、表示、公開、および削除。

アプリへのアクセスを制限するには、アプリキャンバスで以下の手順を実行します。
1. アクセスを制限したいアプリの詳細編集ビューに移動します。
1. アプリエディターで、歯車 ({{< ui >}}Settings{{< /ui >}}) アイコンをクリックします。
1. ドロップダウンから {{< ui >}}Permissions{{< /ui >}} を選択します。
1. {{< ui >}}Restrict Access{{< /ui >}} を選択します。
1. ドロップダウンメニューからロールを選択します。{{< ui >}}Add{{< /ui >}} をクリックします。選択したロールがダイアログボックスの下部に入力されます。
1. ロール名の横にある、ドロップダウンメニューから必要な権限を選択します。
1. ロールからアクセスを削除したい場合は、ロール名の右側にあるゴミ箱のアイコンをクリックします。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

### API または Terraform を使用したアプリへのアクセス制限 {#restrict-app-access-using-the-api-or-terraform}

[Restriction Policy API][10] または Terraform を使用する場合、ユーザーまたはサービスアカウントは自身のアクセスレベルを下げることはできません。これは、自身がロックアウトされるのを防ぐために [Granular Access][4] によって強制される意図的な動作です。

呼び出し元のユーザーまたはサービスアカウントから `editor` アクセス権を移行するには、

1. 現在のユーザーまたはサービスアカウントを `editor` に維持したまま、新しいプリンシパルを `editor` として追加します。

   ```terraform
   bindings {
       principals = ["user:<SERVICE_ACCOUNT_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["team:<TEAM_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["org:<ORG_UUID>"]
       relation   = "viewer"
   }
   ```

1. **別の** API キーまたは管理者アカウント (降格対象以外) を使用して、元のユーザーまたはサービスアカウントのバインディングを削除します。

   ```terraform
   bindings {
       principals = ["team:<TEAM_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["org:<ORG_UUID>"]
       relation   = "viewer"
   }
   ```

### 特定のコネクションへのアクセスの制限 {#restrict-access-to-a-specific-connection}

個々のコネクションに権限を設定して、その使用や変更を制限します。App Builder では、各コネクションに次の権限が用意されています。

{{< ui >}}Viewer{{< /ui >}}
: コネクションの表示

{{< ui >}}Resolver{{< /ui >}}
: コネクションの解決と表示

{{< ui >}}Editor{{< /ui >}}
: コネクションの編集、解決、および表示

デフォルトでは、コネクションの作成者のみに {{< ui >}}Editor{{< /ui >}} アクセス権が付与されます。作成者は、追加のユーザー、ロール、またはチームにアクセス権を付与できます。

**注**: コネクションを解決する権限には、ステップに割り当てられたコネクションオブジェクトを取得し、それに関連付けられたシークレットを取得する権限が含まれます。

特定のコネクションの権限を変更するには、以下の手順に従います。

1. [App Builder ページ][5]に移動します。
1. {{< ui >}}Connections{{< /ui >}} タブをクリックします。コネクションの一覧が表示されます。
1. 詳細な権限を設定するコネクションにカーソルを合わせます。右側に {{< ui >}}Edit{{< /ui >}}、{{< ui >}}Permissions{{< /ui >}}、および {{< ui >}}Delete{{< /ui >}} アイコンが表示されます。
1. 南京錠 ({{< ui >}}Permissions{{< /ui >}}) アイコンをクリックします。
1. {{< ui >}}Restrict Access{{< /ui >}} を選択します。
1. ドロップダウンメニューからロールを選択し、{{< ui >}}Add{{< /ui >}} をクリックします。選択したロールがダイアログボックスの下部に入力されます。
1. ロール名の横にあるドロップダウンメニューから、目的の権限を選択します。
1. ロールからアクセスを削除したい場合は、ロール名の右側にあるゴミ箱のアイコンをクリックします。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][6] の **#app-builder** チャンネルにご参加ください。

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /ja/account_management/org_settings/service_accounts#permissions
[3]: /ja/account_management/rbac/?tab=datadogapplication#role-based-access-control
[4]: /ja/account_management/rbac/granular_access
[5]: https://app.datadoghq.com/app-builder/
[6]: https://chat.datadoghq.com/
[7]: /ja/account_management/audit_trail/#overview
[8]: /ja/actions/connections/
[9]: /ja/actions/workflows/
[10]: /ja/api/latest/restriction-policies/