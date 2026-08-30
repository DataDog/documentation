---
description: フォームを作成して入力を収集し、回答を分析して、自動化をトリガーします。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: ブログ
  text: Datadog Forms を活用してエンジニアリング組織全体でフィードバックをアクションに変換する
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: ブログ
  text: Datadog Forms と Sheets を使用して、開発者のフィードバックを運用上のインサイトに変える
title: フォーム
---
## 概要{#overview}

Datadog Forms を使用すると、Datadog 内で入力を収集し、回答を分析して、自動化をトリガーできます。フォームとその回答は組織全体で共有できるため、チームでデータを収集して分析できます。

フォームの活用方法:
- 定義済みのテンプレートからサービスを構築します。
- 内部開発者ポータル (IDP) でエンジニアリングに関するフィードバックを収集します。
- 従業員のフォーム回答から直接、セキュリティ、プラットフォーム、または IT チーム向けのサービスリクエストや[作業項目][1]を作成します。

## フォームを作成する {#create-a-form}

[Forms][2] ページで、{{< ui >}}New Form{{< /ui >}} をクリックし、作成方法を選択します。

{{< tabs >}}
{{% tab "AI で作成する" %}}
1. [{{< ui >}}Create with AI{{< /ui >}}] を選択し、[{{< ui >}}Continue{{< /ui >}}] をクリックします。[Bits Chat][100] とともにフォームエディターが開きます。
1. Bits Chat パネルで、作成したいフォームについて説明します。
1. {{< ui >}}Publish{{< /ui >}} または {{< ui >}}Publish Changes{{< /ui >}} をクリックして、回答者がフォームを利用できるようにします。

フォームエディターからだけでなく、Datadog のどこからでも Bits Chat にフォームの作成を依頼できます。[MCP でフォームを作成および管理](#create-and-manage-forms-with-mcp)を参照してください。

[100]: /ja/bits_ai/bits_chat/

{{% /tab %}}

{{% tab "空のフォーム" %}}
1. [{{< ui >}}Start with a blank form{{< /ui >}}] を選択し、[{{< ui >}}Continue{{< /ui >}}] をクリックします。
1. フォームに名前を付け、必要に応じて説明とテーマカラーを追加します。[{{< ui >}}Continue{{< /ui >}}] をクリックします。
1. コンポーネントを追加するには、{{< ui >}}Add Component{{< /ui >}} をクリックするか、{{< ui >}}Fields{{< /ui >}} パネルでプラス **+** アイコンをクリックします。コンポーネントタイプとそのオプションの全リストについては、[フォームコンポーネント][3]を参照してください。
1. {{< ui >}}Publish{{< /ui >}} または {{< ui >}}Publish Changes{{< /ui >}} をクリックして、回答者がフォームを利用できるようにします。

[3]: /ja/actions/forms/components/

{{% /tab %}}

{{% tab "Blueprint" %}}
Blueprints は一般的なユースケース向けのスターターフォームで、サンプルの質問があらかじめ読み込まれています。一部の Blueprints には、あらかじめ構成された自動化が含まれています。利用可能な Blueprints には、開発者エクスペリエンス調査、IDP フィードバック、ワークマネジメントサービスリクエスト、インシデント報告、バグ報告、オンコールエスカレーション、インシデント後のレビューなどがあります。

1. {{< ui >}}Create from blueprint{{< /ui >}} を選択し、利用可能なテンプレートを参照します。
1. Blueprint を選択し、[{{< ui >}}Continue{{< /ui >}}] をクリックします。
1. フォームに名前を付け、必要に応じて説明とテーマカラーを追加します。[{{< ui >}}Continue{{< /ui >}}] をクリックします。
1. フォームをさらにカスタマイズするには、[フォームコンポーネント][3]を参照してください。
1. {{< ui >}}Publish{{< /ui >}} または {{< ui >}}Publish Changes{{< /ui >}} をクリックして、回答者がフォームを利用できるようにします。


[3]: /ja/actions/forms/components/
{{% /tab %}}

{{% tab "インポート" %}}
既存のフォームを PDF または JSON ファイルからインポートできます。

1. {{< ui >}}Import a form{{< /ui >}} を選択します。インポートダイアログが開きます。
1. ソースを選択し、プロンプトに従います。
1. フォームに名前を付け、必要に応じて説明とテーマカラーを追加します。[{{< ui >}}Continue{{< /ui >}}] をクリックします。
1. フォームをさらにカスタマイズするには、[フォームコンポーネント][3]を参照してください。
1. {{< ui >}}Publish{{< /ui >}} または {{< ui >}}Publish Changes{{< /ui >}} をクリックして、回答者がフォームを利用できるようにします。


[3]: /ja/actions/forms/components/
{{% /tab %}}
{{< /tabs >}}

フォームをプレビューまたは共有するには:
1. {{< ui >}}Preview{{< /ui >}} をクリックして、回答者に表示されるフォームを確認します。
1. {{< ui >}}Share{{< /ui >}} をクリックして、フォームのリンクをコピーするか、共有オプションを構成します。

## フォームの設定 {#form-settings}

[Forms][2] ページで、フォームをクリックしてエディターで開きます。エディターのヘッダーで、歯車 <i class="icon-cog-2"></i> アイコンをクリックして、次の設定にアクセスします。

| 設定 | 説明 |
|---------|-------------|
| Accepting Responses | フォームを有効または無効に設定します。無効にすると、フォームは新しい回答を受け付けなくなります。終了日を設定して、特定の日にフォームを自動的に閉じることもできます。公開済みのフォームでのみ利用できます。|
| Anonymous Responses | 有効にすると、回答者のメールアドレスは保存されません。|
| Manage Permissions | フォームの閲覧・編集権限、および送信された回答の閲覧権限を構成します。[アクセスの管理](#manage-access)を参照してください。|
| Clone Form | フォームのコピーを作成します。|
| Import Form | PDF または JSON ファイルから現在のフォームにフィールドをインポートします。|
| Export Form (JSON) | フォームを JSON ファイルとしてダウンロードします。|

回答の管理について詳しくは、[フォームの回答][4]を参照してください。

## フォームの共有 {#share-a-form}

フォームの共有を設定するには、
1. [Forms][2] ページで、フォームをクリックします。
1. [{{< ui >}}Share{{< /ui >}}] をクリックします。

次の共有オプションを利用できます。

{{% collapse-content title="Datadog 内で共有" level="h3" expanded=false %}}
Datadog 組織内のユーザーとフォームを共有します。

{{< ui >}}Add to Dashboard{{< /ui >}} の下で、ドロップダウンからフォームを既存のダッシュボードに追加するか、新しいダッシュボードを作成します。

{{< ui >}}Add to IDP Self-Service Actions{{< /ui >}} トグルをオンにして、[セルフサービスアクション][5]カタログにフォームを表示します。プラットフォームチームやインフラストラクチャーチームが、組織内の他のメンバー向けにツールを公開し、見つけて利用できるようにするための一元的な場所です。
{{% /collapse-content %}}

{{% collapse-content title="外部ユーザーと共有" level="h3" expanded=false %}}
Datadog 組織外のユーザーとフォームを共有します。各共有オプションのアクセス有効期限を設定したり、異なる設定や有効期限を指定した複数の共有構成を作成したりできます。

次のオプションを利用できます。

- **特定の個人**: 個別のメールアドレスで受信者を追加します。例: `alice@example.com` および `bob@example.com`。
- **会社のドメイン**: 特定のメールドメインを持つすべてのユーザーと共有します。例: `*@yourcompany.com`。
- **共有可能なリンク**: Datadog アカウントを持たないユーザーでもフォームにアクセスできるリンクを生成します。
{{% /collapse-content %}}

外部共有を一時停止または削除するには、{{< ui >}}Share{{< /ui >}} をクリックし、{{< ui >}}Edit{{< /ui >}} をクリックして、{{< ui >}}Pause Sharing{{< /ui >}} または {{< ui >}}Delete Sharing{{< /ui >}} を選択します。

共有リンクのフィールドに事前入力して、回答者が一部の回答が入力された状態で開始できるようにする方法については、[フォームフィールドの事前入力][15]を参照してください。

## ダッシュボードにフォームを追加 {#add-a-form-to-a-dashboard}

フォームエディターからダッシュボードにフォームを追加するには、
1. [Forms][2] ページで、フォームをクリックしてエディターで開きます。
1. {{< ui >}}Share{{< /ui >}} ドロップダウンをクリックし、{{< ui >}}Share within Datadog{{< /ui >}} を選択します。
1. {{< ui >}}Add to Dashboard{{< /ui >}} で、既存のダッシュボードを選択するか、新しいダッシュボードを作成して、[{{< ui >}}Add{{< /ui >}}] をクリックします。

ダッシュボードから直接フォームを追加することもできます。
1. [dashboard][6]に移動します。
1. **Add Widgets** をクリックしてサイドパネルを開きます。
1. **Apps** タブをクリックします。
1. **Form Widget** を選択します。
1. フォームを選択し、[{{< ui >}}Save{{< /ui >}}] をクリックします。

## 自動化を追加 {#add-automation}

フォームを作成した後、フォームが送信されると自動的にトリガーされる[アクション][7]または[ワークフロー blueprint][8] を追加できます。
1. [Forms][2] ページで、フォームをクリックします。
1. フォームの上部で、{{< ui >}}Automation{{< /ui >}} を選択します。
1. アクションまたは blueprint を選択します。
1. アクションまたは blueprint がワークフローキャンバスで開き、そこで[編集][9]できます。
1. [{{< ui >}}Create{{< /ui >}}] をクリックします。

**注**: フォームによってトリガーされる自動化は、[Workflow Automation][10] の下に表示されます。

## MCP でフォームを作成および管理{#create-and-manage-forms-with-mcp}

外部 AI エージェントを [Datadog MCP Server][11] に接続して、フォームとその回答を作成、更新、公開、および読み取ります。[MCP Server][12] に接続するときに、`forms` ツールセット (または `all`) を有効にします。Datadog のどこからでも [Bits Chat][13] にフォームの作成を依頼することもできます。利用可能なツールの全リストについては、Datadog MCP Server ツールリファレンスの[フォーム][14]を参照してください。

## アクセスの管理 {#manage-access}

デフォルトでは、フォームの作成者のみがそのフォームにアクセスできます。フォームの権限を変更するには、
1. [Forms][2] ページで、フォームをクリックしてエディターで開きます。
1. エディターのヘッダーで、歯車 <i class="icon-cog-2"></i> アイコンをクリックします。
1. [{{< ui >}}Manage Permissions{{< /ui >}}] をクリックします。モーダルが開き、2 つのセクションが表示されます。
   - **Form Access**: フォームを表示および編集できるユーザーを指定します。
   - **Response Access**: 送信された回答を表示できるユーザーを指定します。このセクションは、フォームが最初の回答を受信した後にのみ利用できます。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/work_management/
[2]: https://app.datadoghq.com/forms
[3]: /ja/actions/forms/components/
[4]: /ja/actions/forms/responses/
[5]: /ja/internal_developer_portal/self_service_actions/
[6]: /ja/dashboards/
[7]: https://app.datadoghq.com/actions/action-catalog/
[8]: https://app.datadoghq.com/workflow/blueprints
[9]: /ja/actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[10]: https://app.datadoghq.com/workflow
[11]: /ja/mcp_server/
[12]: /ja/mcp_server/setup/#toolsets
[13]: /ja/bits_ai/bits_chat/
[14]: /ja/mcp_server/tools/#forms
[15]: /ja/actions/forms/guide/prefill/