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
- link: /actions/app_builder/
  tag: ドキュメント
  text: App Builder ドキュメント
- link: https://learn.datadoghq.com/courses/automating-meaningful-actions
  tag: ラーニングセンター
  text: Datadog Workflow Automation による有意義なアクションの自動化
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: ラーニングセンター
  text: App Builder を使用したサードパーティインテグレーション向けのセルフサービスアプリの構築
title: コネクション
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">アクション、ワークフロー、およびアプリは、Datadog for Government リージョンの外部にあるサードパーティサービスに顧客データを送信するコネクションを使用する場合があります。顧客責任マトリックスの入手方法や Datadog for Government リージョンに関する詳細情報については、<a href="https://trust.datadoghq.com">Trust Center</a> を参照してください。</div>
{{< /site-region >}}

アクションは外部のソフトウェアシステムと接続するため、対応するインテグレーションに対して Datadog アカウントを認証することが必要な場合があります。アプリやワークフローを正常に実行できるのは、認証を必要とするすべてのアクションが Datadog アカウントの ID を確認できる場合のみです。Datadog に権限を付与する際は、セキュリティのベストプラクティスに従い、アプリやワークフローの実行に必要な権限のみを付与するようにしてください。

アクションは、2 つの方法で認証することができます。
- インテグレーションタイルで構成された資格情報および権限
- コネクションの資格情報

## インテグレーションタイルの資格情報{#integration-tile-credentials}

以下の Datadog インテグレーションタイルで設定した資格情報やアカウント認証は、ワークフローやアプリの対応するアクションに自動的に伝搬されます。

- GitHub
- Jira
- Microsoft Teams
- Opsgenie
- PagerDuty
- Slack
- Statuspage

[Datadog Integrations][6] の説明に従って、インテグレーションタイルを構成します。

設定する必要があるインテグレーションが上記の一覧にない場合は、コネクションの資格情報を設定します。

## コネクションの資格情報{#connection-credentials}

コネクションは、インストール済みのインテグレーションを拡張し、ワークフローのステップの認証を制御できるようにします。コネクションの資格情報を使用して、[一般的なアクション][8]、またはインテグレーションタイルが認証を提供していないアクションを認証します。インテグレーションタイルを使用して認証を行うインテグレーションの一覧については、『[インテグレーションタイルの資格情報](#integration-tile-credentials)』セクションを参照してください。コネクションの資格情報は、Workflow Automation および App Builder 製品内でのみ使用できます。

コネクションは、以下のユースケース例に対応しています。
- 必要なインテグレーションが、ビルトインコネクションでは利用できない場合。
- カスタムアクションを認証したい場合。たとえば、独自のサービスで HTTP アクションを使用する必要がある場合などです。
- AWS の書き込み権限など、インテグレーションでサポートされていない権限が必要な場合。
- ユーザーアクセスを特定のワークフローに制限するなど、きめ細かなアクセス制御を行いたい場合。

### コネクションセキュリティの考慮事項 {#connection-security-considerations}

コネクションを作成する前に、必要なタスクを実行するために必要な権限について検討し、そのタスクを実行するために必要な権限のみをコネクションに付与してください。さらに、コネクションはそれを使用する必要がある人のみに制限する必要があります。

可能な限り、異なるワークフローやアプリに対して、きめ細かなコネクションを使用してください。たとえば、Amazon S3 バケットに書き込むワークフローと、Amazon EC2 インスタンスを終了するアプリがある場合、両方に同じコネクションを使用しないでください。代わりに、それぞれスコープが限定された IAM ロールに対応する 2 つのコネクションを作成してください。

## コネクションの使用 {#work-with-connections}

### コネクションの表示 {#view-connections}

1. [[Workflow Automation] (ワークフローの自動化) ページ][2] または [[App Builder] ページ][14] から、{{< ui >}}Connections{{< /ui >}} タブをクリックしてください。コネクションのリストが開きます。
1. 一行をクリックすると、コネクションの詳細が表示されます。

### コネクションの作成 {#create-a-connection}

コネクションを確立するためには、以下の情報が必要です。
- コネクション先 (製品名、URL など)
- 認証方法 (API キー、ユーザー名/パスワード、OAuth など)

コネクションを作成するには、以下の手順に従います。
1. [[Workflow Automation] (ワークフローの自動化) ページ][2] または [[App Builder] ページ][14] から、{{< ui >}}Connections{{< /ui >}} タブをクリックしてください。コネクションのリストが開きます。
1. 右上の {{< ui >}}New Connection{{< /ui >}} ボタンをクリックします。{{< ui >}}New Connection{{< /ui >}} ダイアログボックスが表示されます。
1. アイコンをクリックして、インテグレーションスキーマを選択します。
1. 適切なフィールドに入力します。<div class="alert alert-info">将来的にコネクションをコネクショングループに追加する場合は、1 つ以上の [識別子タグ](#connection-identifier-tags) を追加してください。</div>
1. {{< ui >}}Create{{< /ui >}} をクリックします。

または、ワークフローページやアプリページからコネクションを追加してください。


{{< tabs >}}
{{% tab "Workflow Automation" %}}
1. [Workflow Automation list][1] に移動します。
1. 資格情報を追加する必要があるアクションを含むワークフローを選択します。ワークフロービルダーが表示されます。
1. ワークフローの視覚化で、資格情報を追加する必要のあるアクションをクリックします。右側のパネルにアクションの詳細が表示されます。
1. {{< ui >}}Configure{{< /ui >}} タブで、{{< ui >}}Connection{{< /ui >}} ドロップダウンを探して、{{< ui >}}\+{{< /ui >}} アイコンをクリックします。
1. {{< ui >}}New Connection{{< /ui >}} ダイアログボックスで、コネクションに名前を付け、必要な認証の詳細を入力します。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

[1]: https://app.datadoghq.com/workflow
{{% /tab %}}

{{% tab "App Builder" %}}
1. [App Builder アプリ一覧][1] に移動します。
1. 資格情報を追加する必要があるアクションを含むアプリを選択します。アプリキャンバスが表示されます。
1. 右上の {{< ui >}}Edit{{< /ui >}} をクリックします。
1. 左側の {{< ui >}}Data{{< /ui >}} で、資格情報を追加する必要のあるアクションをクリックします。左側のパネルには、アクションの詳細が表示されます。
1. {{< ui >}}Connection{{< /ui >}} ドロップダウンを探して、{{< ui >}}\+{{< /ui >}} アイコンをクリックします。
1. {{< ui >}}New Connection{{< /ui >}} ダイアログボックスで、コネクションに名前を付け、必要な認証の詳細を入力します。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

[1]: https://app.datadoghq.com/app-builder
{{% /tab %}}
{{< /tabs >}}

以下の例は、OpenAI コネクションの {{< ui >}}New Connection{{< /ui >}} ダイアログボックスを示しています。コネクションごとに異なる認証情報が必要です。OpenAI コネクションには、有効なコネクション名と API トークンが必要です。

{{< img src="actions/connections/new-connection-2.png" alt="OpenAI コネクションの [New Connection] (新規コネクション) ダイアログボックス" >}}

### コネクションの編集 {#edit-a-connection}

1. [[Workflow Automation] (ワークフローの自動化) ページ][2] または [[App Builder] ページ][14] から、{{< ui >}}Connections{{< /ui >}} タブをクリックしてください。コネクションのリストが開きます。
1. 編集したいコネクションにカーソルを合わせます。右側に {{< ui >}}Edit{{< /ui >}}、{{< ui >}}Permissions{{< /ui >}}、{{< ui >}}Delete{{< /ui >}} アイコンが表示されます。
1. 鉛筆 ({{< ui >}}Edit{{< /ui >}}) アイコンをクリックします。ダイアログボックスが表示されます。
1. 変更したいフィールドを更新します。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

### コネクションの削除 {#delete-a-connection}

1. [コネクションのリスト][3] に移動します。
1. 削除したいコネクションにカーソルを合わせます。右側に {{< ui >}}Edit{{< /ui >}}、{{< ui >}}Permissions{{< /ui >}}、{{< ui >}}Delete{{< /ui >}} アイコンが表示されます。
1. ゴミ箱 ({{< ui >}}Delete{{< /ui >}}) アイコンをクリックします。「よろしいですか？」テキストが表示されます。
1. {{< ui >}}Delete{{< /ui >}} を選択します。

### コネクションの利用を制限する {#restrict-connection-use}

コネクションの利用を制限する方法については、[Workflow Automation][12] または [App Builder][15] の「アクセスと認証」を参照してください。

## HTTP コネクション {#http-connection}

任意のサービスに接続するには、HTTP コネクションタイプを使用してください。認証オプションおよび設定手順については、[HTTP アクション][10] を参照してください。

## コネクション識別子タグ{#connection-identifier-tags}

コネクションに識別子タグを追加できます。コネクションのタグ付けルールは [Datadog タグ][13] に基づいており、さらに以下の追加要件があります。
- 識別子タグは `tag:value` の形式に従う必要があり、追加のコロンは許可されていません。たとえば、識別子タグ `env:staging:east` や `env` は、コネクションタグとして無効な形式です。
- 識別子タグは文字で始まる必要があり、その後に以下を含めることができます。
    - 英数字
    - アンダースコア
    - マイナス
    - スラッシュ
    - ちょうど 1 つのコロン
- `default` は、コネクション識別子タグの予約値です。これは、スタンドアロンのタグキーやタグ値として使用することはできません。たとえば、`default:yes` や `aws:default` はコネクションタグとしては無効です。

## コネクショングループ{#connection-groups}

コネクショングループを作成すると、ワークフローやアプリが指定された入力に基づいて正しいアカウントに対して認証できるようになります。コネクションをグループ化できるのは、同じインテグレーションを共有している場合のみです。(たとえば、GCP コネクションと AWS コネクションを同じグループ内にまとめることはできません)

コネクショングループのメンバーは、コネクションの_識別子タグ_を使用して定義します。たとえば、`account_id`タグを持つ AWS アカウントで構成されるコネクショングループを作成できます。

ワークフローが実行時に正しいコネクションを動的に選択できるように、グループ内の各コネクションは固有の識別子タグセットを持っていることが必要です。たとえば、次のようになります。
- `connectionA {account_id:123456789}` と `connectionB {account_id:987654321}` はグループ化できます。
- `connectionA {account_id:123456789}`と `connectionC {account_id:123456789}` はグループ化できません。グループ内に重複するタグ値が含まれることになるためです。

### コネクショングループを作成する{#create-a-connection-group}

<div class="alert alert-info">コネクションにグループにコネクションを追加できるのは、コネクションに<a href="/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection">リゾルバー権限</a>がある場合のみです。</div>

コネクショングループを作成するには、以下の手順に従います。

1. [コネクションのリスト][3] に移動します。
1. 左側で {{< ui >}}Groups{{< /ui >}} をクリックします。
1. {{< ui >}}+ New Group{{< /ui >}} をクリックし、インテグレーションを選択します。
1. グループ名を入力し、グループに含めたいコネクションがすべて持っている最大 3 つの {{< ui >}}Identifier Tags{{< /ui >}} のセットを入力します。
1. {{< ui >}}Confirm Group{{< /ui >}} でチェックボックスを使ってグループのメンバーを選択します。
1. {{< ui >}}Next, Confirm Access{{< /ui >}} をクリックし、グループの希望するアクセスレベルを選択します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

### コネクショングループを使用する {#use-a-connection-group}

ワークフローでコネクショングループを使用するには、次の手順に従います。

1. ワークフローまたはアプリ内で、コネクションが必要なアクションを選択します。
1. {{< ui >}}Connection{{< /ui >}} フィールドのドロップダウンから {{< ui >}}Groups{{< /ui >}} 内の希望するコネクショングループを選択します。
1. コネクショングループ {{< ui >}}Identifiers{{< /ui >}} に必要な値を入力します。たとえば、コネクショングループが `env` 識別子タグを使用して定義されており、`prod` と `staging` という 2 つの環境がある場合、それらの値のいずれか (またはそれらの値のいずれかに評価される式) を使用できます。
1. その他の必要なステップの値を入力し、{{< ui >}}Save{{< /ui >}} をクリックします。

**注**: グループ内のコネクションを使用できるのは、そのコネクションに対する [リゾルバー権限][12] がある場合のみです。ワークフローまたはアプリがリゾルバー権限のないコネクションを使用しようとすると、`403 Forbidden` エラーが発生して失敗します。この問題を解決するには、次のいずれかを行います。
- リゾルバー権限がないコネクションを指定できないように、ワークフローまたはアプリを設定します。
- リゾルバー権限がないコネクションをコネクショングループから削除します。<div class="alert alert-warning">複数のワークフローまたは複数のアプリでコネクショングループを使用している場合、他のワークフローが依存しているコネクションを削除すると、そのワークフローは失敗します。</div>

### コネクショングループを更新する {#update-a-connection-group}

コネクショングループの編集権限があれば、以下の属性を更新できます。
- グループ名
- 識別子タグ (空にすることはできませんが、完全に置き換えることは可能です)
- コネクション (グループを空にすることも可能です)

### コネクショングループを削除する {#delete-a-connection-group}

コネクショングループを削除するには、以下の手順に従います。

1. 削除したいグループにカーソルを合わせ、{{< ui >}}delete (trash can){{< /ui >}} アイコンをクリックします。
1. {{< ui >}}Delete{{< /ui >}} をクリックします。

<div class="alert alert-danger">コネクショングループを削除すると、そのグループを使用しているすべてのワークフローとアプリに影響が及びます。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][11] の **#workflows** または **#app-builder** チャンネルにご参加ください。

[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[6]: /ja/integrations/
[8]: /ja/actions/workflows/actions/
[9]: https://app.datadoghq.com/workflow
[10]: /ja/actions/connections/http/
[11]: https://chat.datadoghq.com/
[12]: /ja/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[13]: /ja/getting_started/tagging/
[14]: https://app.datadoghq.com/app-builder/
[15]: /ja/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection