---
aliases:
- /ja/workflows/connections
- /ja/workflows/setup
- /ja/service_management/workflows/connections
- /ja/service_management/app_builder/connections
description: アクション用コネクション
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: ドキュメント
  text: Workflow Automation を始める
- link: /service_management/app_builder/
  tag: ドキュメント
  text: App Builder ドキュメント
title: 接続
---

アクションは外部のソフトウェアシステムと連携するため、対応するインテグレーションで Datadog アカウントを認証する必要がある場合があります。認証が必要なすべてのアクションが Datadog アカウントの ID を検証できて初めて、アプリやワークフローは正常に実行されます。Datadog に権限を付与する際は、セキュリティのベストプラクティスに従い、アプリまたはワークフローの実行に必要な権限のみを付与していることを確認してください。

アクションの認証方法は次の 2 種類があります:
- インテグレーションタイルで設定された認証情報と権限
- コネクション認証情報

## インテグレーションタイル認証情報

以下の Datadog インテグレーションタイルで設定した認証情報とアカウント認証は、自動的にワークフローやアプリ内の対応するアクションに反映されます:

- GitHub
- Jira
- Microsoft Teams
- Opsgenie
- PagerDuty
- Slack
- Statuspage

[Datadog Integrations][6] の手順に従ってインテグレーションタイルを設定してください。

上記に必要なインテグレーションがない場合は、コネクション認証情報を設定してください。

## コネクション認証情報

コネクションは、インストール済みのインテグレーションを拡張してワークフローのステップ認証を制御できるようにします。[汎用アクション][8]や、インテグレーションタイルで認証が提供されていないアクションを認証するには、コネクション認証情報を使用してください。インテグレーションタイルで認証を行うインテグレーション一覧については、[インテグレーションタイル認証情報](#integration-tile-credentials)を参照してください。コネクション認証情報は、Workflow Automation と App Builder の両方でのみ使用できます。

コネクションは次のようなユースケースをサポートします:
- 必要なインテグレーションが組み込みの接続として提供されていない場合
- カスタムアクションを認証したい場合 (例: HTTP アクションで独自のサービスを利用する) 
- インテグレーションがサポートしていない権限 (AWS の書き込み権限など) が必要な場合
- 特定のワークフローなどに対するアクセスを制限する、きめ細かなアクセス制御が必要な場合

### コネクションのセキュリティに関する考慮事項

コネクションを作成する前に、そのタスクの実行に必要な権限を考慮し、そのタスクを満たすために必要な最小限の権限のみを付与してください。また、このコネクションは実際に使う必要があるユーザーのみに制限するようにしてください。

可能であれば、ワークフローやアプリごとにきめ細かなコネクションを使用することをおすすめします。たとえば、Amazon S3 バケットに書き込むワークフローと、Amazon EC2 インスタンスを終了させるアプリがある場合、同じコネクションを両方で使わずに、スコープを制限した IAM ロールに対応する 2 つのコネクションをそれぞれ作成してください。

## コネクションを扱う

### コネクションを閲覧する

1. [Workflow Automation ページ][2]または [App Builder ページ][14]で **Connections** タブをクリックします。するとコネクションの一覧が表示されます。
1. 一覧の各行をクリックすると、そのコネクションの詳細を閲覧できます。

### コネクションを作成する

コネクションを作成するには、次の情報が必要です:
- 何に接続するか (例: 製品名、URL) 
- どのように認証するか (例: API キー、ユーザー名/パスワード、OAuth) 

コネクションを作成する手順:
1. [Workflow Automation ページ][2]または [App Builder ページ][14]で **Connections** タブをクリックし、コネクションの一覧を開きます。
1. 右上の **New Connection** ボタンをクリックすると、**New Connection** ダイアログボックスが表示されます。
1. アイコンをクリックして、インテグレーションのスキーマを選択します。
1. 必要なフィールドに入力します。<div class="alert alert-info">今後、コネクションをコネクショングループに追加する予定がある場合は、1 つ以上の[識別子タグ](#connection-identifier-tags)を追加してください。</div>
1. **Create** をクリックします。

または、ワークフローやアプリのページからコネクションを追加することも可能です:


{{< tabs >}}
{{% tab "Workflow Automation" %}}
1. [Workflow Automation 一覧][1]に移動します。
1. 認証情報を追加する必要があるアクションを含むワークフローを選択します。ワークフロービルダーが表示されます。
1. ワークフローのビジュアライゼーションで、認証情報を追加したいアクションをクリックします。右側のパネルにアクションの詳細が表示されます。
1. **Configure** タブで **Connection** ドロップダウンを探し、**+** アイコンをクリックします。
1. **New Connection** ダイアログボックスで、コネクションの名前を入力し、必要な認証情報を入力します。
1. **Save** をクリックします。

[1]: https://app.datadoghq.com/workflow
{{% /tab %}}

{{% tab "App Builder" %}}
1. [App Builder のアプリ一覧][1]に移動します。
1. 認証情報を追加する必要があるアクションを含むアプリを選択します。アプリのキャンバスが表示されます。
1. 右上の **Edit** をクリックします。
1. 左側の **Data** セクションにある、認証情報を追加したいアクションをクリックします。左パネルにアクションの詳細が表示されます。
1. **Connection** ドロップダウンを探して **+** アイコンをクリックします。
1. **New Connection** ダイアログボックスで、コネクションの名前を入力し、必要な認証情報を入力します。
1. **Save** をクリックします。

[1]: https://app.datadoghq.com/app-builder
{{% /tab %}}
{{< /tabs >}}

下記は OpenAI 用の **New Connection** ダイアログボックスの例です。コネクションごとに必要な認証情報は異なります。OpenAI では、有効なコネクション名と API トークンが必要です。

{{< img src="service_management/new-connection-2.png" alt="OpenAI コネクション用の New Connection ダイアログボックス" >}}

### コネクションを編集する

1. [Workflow Automation ページ][2]または [App Builder ページ][14]で **Connections** タブをクリックし、コネクションの一覧を開きます。
1. 編集したいコネクションにカーソルを合わせると、右側に **Edit**、**Permissions**、**Delete** アイコンが表示されます。
1. 鉛筆アイコン (**Edit**) をクリックすると、ダイアログボックスが表示されます。
1. 変更したいフィールドを更新します。
1. **Save** をクリックします。

### コネクションを削除する

1. [コネクションの一覧][3]に移動します。
1. 削除したいコネクションにカーソルを合わせると、右側に **Edit**、**Permissions**、**Delete** アイコンが表示されます。
1. ゴミ箱アイコン (**Delete**) をクリックすると、「Are you sure?」というメッセージが表示されます。
1. **Delete** を選択します。

### コネクションの利用を制限する

コネクションの利用制限方法については、[Workflow Automation][4] または [App Builder][15] の「アクセスと認証」をご参照ください。

## HTTP コネクション

任意のサービスに接続する場合は、HTTP コネクションタイプを使用してください。認証オプションやセットアップ方法の詳細は、[HTTP アクション][10]を参照してください。

## コネクションの識別子タグ

コネクションには識別用のタグを付けることができます。これらのタグ付けルールは [Datadog タグ][13]に準拠しますが、以下の追加要件があります:
- 識別子タグは `tag:value` 形式に従う必要があり、コロンを追加で含めることはできません。たとえば `env:staging:east` や `env` は無効です。
- 識別子タグは文字で始まり、その後は以下が使用できます:
    - 英数字
    - アンダースコア (_)
    - ハイフン (-)
    - スラッシュ (/)
    - コロン (:) はちょうど 1 つ
- `default` はコネクションの識別子タグにおける予約済みの値であり、単独のタグキーとしてもタグ値としても使用できません。たとえば `default:yes` や `aws:default` は、いずれもコネクションタグとして無効です。

## コネクショングループ

<div class="alert alert-danger"><strong>注</strong>: コネクショングループは Workflow Automation でのみ利用できます。App Builder では利用できません。</div>

ワークフローが入力に応じて正しいアカウントへ認証できるように、コネクションをグループ化できます。同じグループにまとめるには、同一のインテグレーションである必要があります (例：同じグループに GCP と AWS のコネクションを混在させることはできません) 。

コネクショングループのメンバーは、コネクションの識別子タグを使って定義します。たとえば `account_id` タグを持つ AWS アカウントで構成されたコネクショングループを作成できます。

グループ内の各コネクションは固有の識別子タグセットを持つ必要があり、ワークフローが実行時に正しいコネクションを動的に選択できるようにします。たとえば:
- `connectionA {account_id:123456789}` と `connectionB {account_id:987654321}` は同じグループにまとめられます。
- `connectionA {account_id:123456789}` と `connectionC {account_id:123456789}` はタグの値が重複するため、同じグループにまとめられません。

### コネクショングループを作成する

<div class="alert alert-info"><strong>注</strong>: グループにコネクションを追加するには、そのコネクションに対する<a href="/service_management/workflows/access/#restrict-access-on-a-specific-connection">Resolver 権限</a>が必要です。</div>

コネクショングループを作成する手順:

1. [接続リスト][3]に移動します。
1. 左側で **Groups** をクリックします。
1. **+ New Group** をクリックし、インテグレーションを選択します。
1. グループ名を入力し、グループに含めたいコネクションがすべて持っている最大 3 つの **Identifier Tags** を入力します。
1. **Confirm Group** でチェックボックスを使ってグループのメンバーを選択します。
1. **Next, Confirm Access** をクリックし、グループのアクセスレベルを設定します。
1. **Create** をクリックします。

### コネクショングループを使用する

ワークフローでコネクショングループを使用するには、次の手順を行います:

1. ワークフロー内で、コネクションが必要なアクションを選択します。
1. **Connection** フィールドで、ドロップダウンから **Groups** 内の希望するコネクショングループを選択します。
1. コネクショングループの **Identifiers** に必要な値を入力します。たとえば `env` という識別子タグでグループを定義しており、`prod` と `staging` の 2 つの環境がある場合は、そのいずれかの値 (またはそれに評価される式) を使用できます。
1. ほかの必要なステップの値を入力し、**Save** をクリックしてワークフローを保存します。

**注**: コネクショングループ内のコネクションを使用するには、そのコネクションの [Resolver 権限][12]が必要です。ワークフローが Resolver 権限を持たないコネクションを使用しようとすると、`403 Forbidden` エラーで失敗します。この問題を解決するには、以下のいずれかを行います:
- Resolver 権限を持たないコネクションを参照しないようにワークフローを構成する。
- Resolver 権限を持たないコネクションをコネクショングループから削除する。<div class="alert alert-warning"><strong>注</strong>: 複数のワークフローでコネクショングループを使用している場合、ほかのワークフローが依存しているコネクションを削除すると、そのワークフローが失敗します。</div>

### コネクショングループを更新する

コネクショングループの編集権限があれば、以下の属性を更新できます:
- グループ名
- 識別子タグ (空にすることはできませんが、完全に置き換えることは可能です) 
- コネクション (グループが空になることも可能です) 

### コネクショングループを削除する

コネクショングループを削除するには:

1. 削除したいグループにカーソルを合わせ、**delete (trash can)** アイコンをクリックします。
1. **Delete** をクリックします。

<div class="alert alert-danger"><strong>注</strong>: コネクショングループを削除すると、そのグループを使用しているワークフローに影響します。</div> 

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やご意見がある場合は、[Datadog Community Slack][11] の **#workflows** または **#app-builder** チャンネルにご参加ください。

[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[4]: /ja/service_management/workflows/access/#restrict-connection-use
[6]: /ja/integrations/
[8]: /ja/service_management/workflows/actions/
[9]: https://app.datadoghq.com/workflow
[10]: /ja/actions/connections/http/
[11]: https://datadoghq.slack.com/
[12]: /ja/service_management/workflows/access/#restrict-access-on-a-specific-connection
[13]: /ja/getting_started/tagging/
[14]: https://app.datadoghq.com/app-builder/
[15]: /ja/service_management/app_builder/auth/