---
description: フォームを作成して入力を収集し、回答を分析し、自動化をトリガーします。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: ブログ
  text: Datadog Forms を使用して、エンジニアリング組織全体でフィードバックを行動に変える
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: ブログ
  text: Datadog Forms と Sheets を使用して、開発者のフィードバックをオペレーションに関するインサイトに変える
title: フォーム
---
## 概要{#overview}

Datadog Forms を使用すると、Datadog 内で入力を収集し、回答を分析して、自動化をトリガーできます。フォームとその回答は組織全体で共有できるため、チームでデータを収集、分析できます。

フォームの活用方法の例:
- 定義済みのテンプレートからサービスを構築する。
- Internal Developer Portal (IDP) でエンジニアリングに関するフィードバックを調査する。
- 従業員のフォーム回答から直接、セキュリティ、プラットフォーム、または IT チーム向けのサービスおよび [作業項目][1] を作成する。

## フォームの作成 {#create-a-form}

[Forms][2] ページで [{{< ui >}}New Form{{< /ui >}}] (フォームの新規作成) をクリックし、作成方法を選択します。

{{< tabs >}}
{{% tab "AI を使用した作成" %}}
1. {{< ui >}}Create with AI{{< /ui >}}] (AI を使用して作成) を選択し、[{{< ui >}}Continue{{< /ui >}}] (続行) をクリックします。[Bits Chat][100] でフォームエディターが開きます。
1. [Bits Chat] パネルで、作成したいフォームについて説明します。
1. [{{< ui >}}Publish{{< /ui >}}] (公開) または [{{< ui >}}Publish Changes{{< /ui >}}] (変更を公開) をクリックして、回答者がフォームを利用できるようにします。

Bits Chat には、Forms エディター以外にも、Datadog のどこからでもフォームの作成を依頼できます。[MCP を使用したフォームの作成と管理](#create-and-manage-forms-with-mcp)を参照してください。

[100]: /ja/bits_ai/bits_chat/

{{% /tab %}}

{{% tab "空白のフォーム" %}}
1. [{{< ui >}}Start with a blank form{{< /ui >}}] (空白のフォームで始める) を選択し、[{{< ui >}}Continue{{< /ui >}}] (続行) をクリックします。
1. フォームに名前を付け、必要に応じて説明とテーマの色を追加します。{{< ui >}}Continue{{< /ui >}} をクリックします。
1. コンポーネントを追加するには、[{{< ui >}}Add Component{{< /ui >}}] (コンポーネントを追加) をクリックするか、[{{< ui >}}Fields{{< /ui >}}] (フィールド) パネルでプラス **+** アイコンをクリックします。すべてのコンポーネントタイプとそのオプションのリストについては、[フォームのコンポーネント][3] を参照してください。
1. [{{< ui >}}Publish{{< /ui >}}] (公開) または [{{< ui >}}Publish Changes{{< /ui >}}] (変更を公開) をクリックして、回答者がフォームを利用できるようにします。

[3]: /ja/actions/forms/components/

{{% /tab %}}

{{% tab "ブループリント" %}}
ブループリントは一般的なユースケース向けのスターターフォームであり、質問サンプルが事前に読み込まれています。一部のブループリントには、事前に構成された自動化が組み込まれています。利用可能なブループリントには、Developer Experience Survey、IDP Feedback、Work Management Service Request、Report an Incident、Bug Report、On-Call Escalation、Post-Incident Review などがあります。

1. {{< ui >}}Create from blueprint{{< /ui >}} を選択して、利用可能なテンプレートを参照します。
1. ブループリントを選択して、{{< ui >}}Continue{{< /ui >}} をクリックします。
1. フォームに名前を付け、必要に応じて説明とテーマの色を追加します。{{< ui >}}Continue{{< /ui >}} をクリックします。
1. フォームをさらにカスタマイズするには、[フォームのコンポーネント][3] を参照してください。
1. [{{< ui >}}Publish{{< /ui >}}] (公開) または [{{< ui >}}Publish Changes{{< /ui >}}] (変更を公開) をクリックして、回答者がフォームを利用できるようにします。


[3]: /ja/actions/forms/components/
{{% /tab %}}

{{% tab "インポート" %}}
PDF または JSON ファイルから既存のフォームをインポートできます。

1. {{< ui >}}Import a form{{< /ui >}} を選択します。インポートダイアログが開きます。
1. ソースを選択し、プロンプトに従います。
1. フォームに名前を付け、必要に応じて説明とテーマの色を追加します。{{< ui >}}Continue{{< /ui >}} をクリックします。
1. フォームをさらにカスタマイズするには、[フォームのコンポーネント][3] を参照してください。
1. [{{< ui >}}Publish{{< /ui >}}] (公開) または [{{< ui >}}Publish Changes{{< /ui >}}] (変更を公開) をクリックして、回答者がフォームを利用できるようにします。


[3]: /ja/actions/forms/components/
{{% /tab %}}
{{< /tabs >}}

フォームをプレビューまたは共有するには、次のようにします。
1. {{< ui >}}Preview{{< /ui >}} をクリックして、回答者に表示されるフォームを確認します。
1. [{{< ui >}}Share{{< /ui >}}] (共有) をクリックして、フォームのリンクをコピーするか、共有オプションを構成します。

## 開始ページと終了ページのカスタマイズ {#customize-start-and-end-pages}

フォームには、最初の質問の前に表示される開始ページと、回答者がフォームを送信した後に表示される終了ページを含めることができます。両方のページのタイトルとメッセージをカスタマイズします。デフォルトでは、フォームには開始ページは含まれず、終了ページには一般的な完了メッセージが表示されます。

開始ページまたは終了ページを追加またはカスタマイズするには、次のようにします。
1. [Forms][2] ページでフォームをクリックしてます。エディターでそのフォームが開きます。
1. {{< ui >}}Pages{{< /ui >}} パネルで、{{< ui >}}Start Page{{< /ui >}} または {{< ui >}}End Page{{< /ui >}} をクリックします。開始ページがない場合は、プラス **+** アイコンをクリックして追加します。
1. タイトルとメッセージを編集します。
1. {{< ui >}}Publish{{< /ui >}} または {{< ui >}}Publish Changes{{< /ui >}} をクリックして変更を適用します。

## フォーム設定 {#form-settings}

[Forms][2] ページでフォームをクリックします。エディターでそのフォームが開きます。以下の設定にアクセスするため、エディターのヘッダーで、歯車 <i class="icon-cog-2"></i> アイコンをクリックします。

| 設定 | 説明 |
|---------|-------------|
| Accepting Responses (回答の受け入れ) | フォームを有効または無効に設定します。無効にすると、フォームは新しい回答を受け付けません。特定の日にフォームを自動的に終了するために、終了日を設定することもできます。公開済みのフォームでのみ利用可能です。|
| Anonymous Responses (匿名回答) | 有効にすると、回答者のメールアドレスは保存されません。|
| Manage Permissions (権限の管理) | フォームを表示、編集できるユーザーと、送信された回答を表示できるユーザーを構成します。[アクセスの管理](#manage-access)を参照してください。|
| Clone Form (フォームの複製) | フォームのコピーを作成します。|
| Import Form (フォームのインポート) | PDF または JSON ファイルから現在のフォームにフィールドをインポートします。|
| フォームのエクスポート (JSON) | フォームを JSON ファイルとしてダウンロードします。|

回答の管理の詳細については、[フォームの回答][4] を参照してください。

## フォームの共有 {#share-a-form}

フォームの共有を構成するには、次のようにします
1. [Forms][2] ページでフォームをクリックします。
1. [{{< ui >}}Share{{< /ui >}}] (共有) をクリックします。

利用可能な共有オプションは次のとおりです。

{{% collapse-content title="Share within Datadog (Datadog 内で共有)" level="h3" expanded=false %}}
Datadog オーガニゼーション内のユーザーやチームとフォームを共有します。

個々のユーザーやチームを受信者として追加します。[{{< ui >}}Notify added teammates{{< /ui >}}] (追加したチームメートに通知) を有効にして通知を送信し、必要に応じてカスタムメッセージを追加します。チームには構成済みの Slack チャンネルまたはメールで通知し、個々のユーザーにはメールで通知します。

[{{< ui >}}Add to Dashboard{{< /ui >}}] (ダッシュボードに追加) で、ドロップダウンを使用してフォームを既存のダッシュボードに追加するか、ダッシュボードを作成します。

[Self-Service Actions][5] カタログにフォームを表示するには、[{{< ui >}}Add to IDP Self-Service Actions{{< /ui >}}] (IDP Self-Service Actions に追加) トグルを有効にします。これは、オーガニゼーション内の他のメンバーがツールを見つけて利用できるように、プラットフォームチームやインフラストラクチャーチームがツールを公開する中央の場所です。
{{% /collapse-content %}}

{{% collapse-content title="外部ユーザーとの共有" level="h3" expanded=false %}}
Datadog オーガニゼーション外のユーザーとフォームを共有します。各共有オプションのアクセス有効期限を構成し、設定や有効期限が異なる複数の共有構成を作成できます。

利用可能なオプションは次のとおりです。

- **Specific individuals (特定の個人)**: メールアドレスで受信者を追加します。たとえば、`alice@example.com` や `bob@example.com` などです。
- **Company domain (会社ドメイン)**: 特定のメールドメイン内のすべてのユーザーと共有します。たとえば、`*@yourcompany.com` などです。
- **Anyone with a link (リンクを知っている全員)**: メールアドレスの確認後に誰でもフォームにアクセスできるリンクを生成します。
{{% /collapse-content %}}

外部共有を一時停止または削除するには、[{{< ui >}}Share{{< /ui >}}] (共有) をクリックし、次に [{{< ui >}}Edit{{< /ui >}}] (編集) をクリックして、[{{< ui >}}Pause Sharing{{< /ui >}}] (共有を一時停止) または [{{< ui >}}Delete Sharing{{< /ui >}}] (共有を削除) を選択します。

共有リンクのフィールドにデータを事前に入力して、回答が入力された状態で回答者が開始できるようにするには、[フォームフィールドの事前入力][15] を参照してください。

## ダッシュボードへのフォームの追加{#add-a-form-to-a-dashboard}

フォームエディターからダッシュボードにフォームを追加するには、次のようにします。
1. [Forms][2] ページでフォームをクリックしてます。エディターでそのフォームが開きます。
1. [{{< ui >}}Share{{< /ui >}}] (共有) ドロップダウンをクリックし、[{{< ui >}}Share within Datadog{{< /ui >}}] (Datadog と共有) を選択します。
1. [{{< ui >}}Add to Dashboard{{< /ui >}}] (ダッシュっボードに追加) で、既存のダッシュボードを選択するか、新規に作成してから [{{< ui >}}Add{{< /ui >}}] (追加) をクリックします。

ダッシュボードで直接フォームをダッシュボードに追加することもできます。
1. [ダッシュボード][6] に移動します。
1. [**Add Widgets**] (ウィジェットを追加) をクリックしてサイドパネルを開きます。
1. [**Apps**] (アプリ) タブをクリックします。
1. [**Form Widget**] (フォームウィジェット) を選択します。
1. フォームを選択して [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

## 自動化の追加{#add-automation}

フォームの作成後に、フォームの送信時に自動的にトリガーされる [アクション][7] または [ワークフローブループリント][8] を追加できます。
1. [Forms][2] ページでフォームをクリックします。
1. フォームの上部にある [{{< ui >}}Automation{{< /ui >}}] (自動化) を選択します。
1. アクションまたはブループリントを選択します。
1. アクションまたはブループリントがワークフローキャンバスで開き、[編集][9] できます。
1. [{{< ui >}}Create{{< /ui >}}] (作成) をクリックします。

**注**: フォームによってトリガーされる自動化は、[Workflow Automation][10] の下に表示されます。

## MCP を使用したフォームの作成と管理{#create-and-manage-forms-with-mcp}

外部 AI エージェントを [Datadog MCP Server][11] に接続して、フォームとその回答を作成、更新、公開、および読み取ります。[MCP Server に接続][12] する際に、`forms` ツールセット (または `all`) を有効にします。Datadog のどこからでも [Bits Chat][13] にフォームの作成を依頼することもできます。利用可能なすべてのツールのリストについては、Datadog MCP Server ツールリファレンスの [Forms][14] を参照してください。

## アクセスの管理{#manage-access}

デフォルトでは、フォームにアクセスできるのはそのフォームの作成者のみです。フォームの権限を変更するには、次のようにします。
1. [Forms][2] ページでフォームをクリックしてます。エディターでそのフォームが開きます。
1. エディターヘッダーで歯車 <i class="icon-cog-2"></i> アイコンをクリックします。
1. [{{< ui >}}Manage Permissions{{< /ui >}}] (権限の管理) をクリックします。モーダルが開き、2 つのセクションが表示されます。
   - **Form Access (フォームアクセス)**: フォームを表示および編集できるユーザーを制御します。
   - **Response Access (回答アクセス)**: 送信された回答を表示できるユーザーを制御します。このセクションは、フォームが最初の送信を受け取った後にのみ利用可能になります。

## 参考資料 {#further-reading}

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