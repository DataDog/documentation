---
aliases:
- /ja/monitors/incident_management/notification_rules
- /ja/monitors/incident_management/incident_settings
description: インシデント管理機能の設定とカスタマイズ
title: インシデント設定
---

## 概要

[インシデント設定][1]を使用して、組織全体のインシデント管理エクスペリエンスのさまざまな面をカスタマイズすることができます。個々の設定は、さまざまなサブセクションに分類され、分割されています。主なカテゴリは、General、Notifications、Remediation です。

## コア

### 一般

インシデント設定の General サブセクションは、組織の深刻度レベルとステータスレベルを定義し、インシデントヘルパーテキストを宣言するために使用します。

{{< img src="service_management/incidents/severity_settings.jpeg" alt="インシデントの重大度レベルの設定" style="width:80%;">}}

重大度レベルの設定を使用して次のことを行います。

1. 最も重要な重大度を `SEV-0` または `SEV-1` として定義します (デフォルトは `SEV-1` です)。
2. 重大度のサブラベルをカスタマイズします (**デフォルト:** Critical、High、Moderate、Low、Minor)。
3. 重大度の説明をカスタマイズします。
4. 最低 3 個、最高 10 個まで、リストの一番下から重大度を追加または削除します。

**注**: 通知ルールで参照されている重大度を削除しようとすると、その決定を確認するプロンプトが表示されます。続行を選択すると、影響を受ける通知ルールは無効となります。重大度の削除または開始重大度の変更によって、[Incident Management Analytics][2] のクエリが自動的に更新されることはありません。

{{< img src="service_management/incidents/status_settings.jpeg" alt="インシデントステータスレベルの設定" style="width:80%;">}}

ステータスレベルの設定を使用して次のことを行います。

1. ステータスの説明をカスタマイズします。
2. オプションの `Completed` ステータスを有効にするかどうかを選択します。

**注**: `Completed` ステータスを削除しても、すでに `Completed` ステータスになっているインシデントは自動的に更新されず、またそれを明示的に参照している [Incident Management Analytics][2] クエリも自動的に更新されません。また、`Completed` ステータスを参照している通知ルールは、そのルールが無効となるため、無効になります。

{{< img src="service_management/incidents/helper_text_settings.jpeg" alt="インシデントヘルパーテキスト設定の宣言" style="width:80%;">}}

Declare Incident Helper Text 設定では、[インシデント作成モーダル][3]で重大度とステータスレベルの説明と一緒に表示されるヘルパーテキストをカスタマイズできます。ヘルパー テキストは Markdown をサポートしており、インデント リスト、テキスト フォーマット、およびインシデント対応者のための他の指示リソースへのハイパーリンクを使用できます。

### プロパティフィールド

{{< img src="service_management/incidents/property_field_settings.jpeg" alt="プロパティフィールドの設定" style="width:80%;">}}

プロパティフィールドは、インシデントにタグを付けることができるメタデータの主要な部分です。これにより、[Homepage][4] でインシデントの特定のサブセットを検索したり、[Incident Management Analytics][2] でより堅牢なクエリを作成したりすることが容易になります。デフォルトのプロパティフィールドは 5 つあります。

1. `Root Cause`
2. `Services`
3. `Teams`
4. `Detection Method`
5. `Summary`

[Datadog APM][5] を設定している場合、`Services` プロパティフィールドは自動的に APM サービス名を利用します。`Services` の値を編集するには、それぞれのフィールドに関連付けたい値を CSV でアップロードしてください。CSV ファイルの先頭行にはフィールド名を、そのすぐ下には希望する値をリストアップしてください。

`Teams` プロパティフィールドは、組織で定義された[チーム][6]から自動的に入力されます。

既存の `key:value` ペア[メトリクスタグ][7]のいずれかを選択することで、設定にプロパティフィールドを追加することができます。このとき、プロパティフィールドのキーは、メトリクスタグのキーの開始ケース (各単語は大文字で、スペースで区切られます) となり、プロパティフィールドの値は、メトリクスタグが報告する値と同じになります。

プロパティフィールドは、インシデント詳細ページの[概要セクション][8]に表示されるフィールドに対応する 3 つのテーブルに整理されています。

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

ドラッグハンドルのアイコンを使ってフィールドをドラッグアンドドロップすることで、任意のプロパティフィールドを別のテーブルに移動したり、同じテーブル内で並び替えたりすることができます。右上の **Preview** ボタンをクリックすると、プロパティフィールドがどのように見えるかをプレビューできます。

#### カスタムプロパティフィールドと必須フィールド

<div class="alert alert-warning">
これはオープンベータ版の機能です。
</div>

5 つのデフォルトフィールドとメトリクスタグに基づくフィールドに加えて、カスタムプロパティフィールドを作成し、インシデントの作成時に必須としてマークすることができます。作成できるカスタムフィールドは 4 種類あります。

1. *Single-Select*: インシデントごとに一度に 1 つの値しか割り当てられないドロップダウンフィールド。値は、UI からインラインで事前定義するか、CSV ファイルを通じて値をアップロードすることができます。
2. *Multi-Select*: インシデントごとに複数の値を割り当てることができるドロップダウンフィールド。値は、UI からインラインで事前定義するか、CSV ファイルを通じて値をアップロードすることができます。
3. *Text Area*: フリーフォームのテキストボックス。値は、レスポンダがインシデントごとに入力します。
4. *Number*: 数字とピリオド 1 つしか入力できないテキストエリア。値は、レスポンダがインシデントごとに入力します。

*Single-Select*、*Multi-Select*、*Number* カスタムフィールドは、インシデントを簡単にフィルタリングするために、[Incident Homepage][4] と [Incident Management Analytics][2] で検索できるファセットとなります。*Number* フィールドは、[ダッシュボード][9]と[ノートブック][10]でグラフ化および可視化できる Incident Management Analytics のメジャーです。

### 対応者タイプ

<div class="alert alert-warning">
これはオープンベータ版の機能です。
</div>

{{< img src="service_management/incidents/responder_types_settings.png" alt="カスタム対応者タイプの作成に特化した設定セクション" style="width:80%;">}}

対応者タイプの設定では、[インシデント対応者に割り当てる][11]カスタムロールを作成し、そのロールがインシデントごとに 1 人または複数人によって保持されることを意図しているかどうかを指定する機能を提供します。このロールは、[ロールベースアクセス制御 (RBAC)][12] システムとは無関係です。対応者タイプは、対応者が、独自のインシデント対応プロセスの定義に基づいて、インシデントでどのような責任を負うかを理解することを可能にします。デフォルトでは、2 つのロールがあります。

1. `Incident Commander` - 対応チームのリーダーを務める責任者
2. `Responder` - インシデントの調査やその根本的な問題の解決に積極的に貢献している人

**注:** `Incident Commander` 対応者タイプは、インシデント設定に表示され、その説明をカスタマイズすることができます。`Incident Commander` は対応者タイプとして削除することはできませんし、`One person role` としての名前やステータスを変更することもできません。`Responder` のロールは、対応者に別のロールが割り当てられていない場合の一般的な予備的ロールであり、インシデント設定に表示されるものではありません。

カスタム対応者タイプを作成するには

1. 表の下にある **+ Add Responder Type** ボタンをクリックします。
2. 新しい対応者タイプに名前を付けます。
3. 対応者タイプが `One person role` か `Multi person role` かを選択します。`One person role` はインシデントごとに 1 人が持つことができ、`Multi person role` はインシデントごとに無制限に持つことができます。
4. 対応者タイプに説明をつけます。この説明は、チームメイトに割り当てるロールを選択するための UI に表示されます。
5. **保存**をクリックします。

### インテグレーション

{{< img src="service_management/incidents/integration_settings.jpeg" alt="インテグレーション設定" style="width:80%;">}}

インテグレーション設定は、Datadog [Slack アプリ][13]のインシデント管理機能を設定するための追加設定を提供します。構成するための設定は 2 つあります。

1. 新しいインシデントごとに Slack チャンネルを自動作成し、それらのチャンネルの名前テンプレートを有効にする
2. インシデント更新チャンネルを有効にする

いずれの設定も、組織の [Slack インテグレーションタイル][14]で設定した任意の Slack ワークスペースを使用するように設定できます。

デフォルトでは、インシデント専用チャンネルは `incident-{public_id}` を名前テンプレートとして使用します。

`incident` のプレフィックスは、*小文字*のアルファベット、数字、ダッシュからなる任意の文字列に変更することができます。Datadog では、Slack のチャンネル名には 80 文字の制限があるため、プレフィックスを短くすることを推奨しています。`{public_id}` 以外に、 `{date_created}` と `{title}` をチャンネル名のテンプレートに変数として追加することができます。

**注:**

- チャンネル名のテンプレートを変更しても、既存のインシデントチャンネルの名前は変更されません。新しい名前テンプレートは、今後にのみ適用されます。
- `{public_id}` のチェックを外した場合、2 つのインシデントでチャンネル名が重複する可能性があります。この場合、Datadog Slack アプリは自動的にチャンネル名の末尾にランダムな小文字または数字を付加し、チャンネル作成プロセスが失敗することを防ぎます。
- `{title}` をチェックすると、インシデントのタイトルが変更された場合、Datadog Slack アプリが自動的にチャンネル名を変更します。

インシデント更新チャンネルは、インシデントが宣言されたり、ステータス、重大度、インシデントコマンダーが変更されるたびに、メッセージを送信します。

## 通知

### メッセージテンプレート

{{< img src="service_management/incidents/message_templates_settings.jpeg" alt="メッセージテンプレートの設定" style="width:80%;">}}

メッセージテンプレートは、動的で再利用可能なメッセージであり、[手動インシデント通知][15]や自動通知ルールで使用することができます。メッセージテンプレートは `{{incident.severity}}` のようなテンプレート変数を利用して、通知が送信されるインシデントから対応する値を動的に注入します。メッセージテンプレートは Markdown をサポートしており、インシデント通知にはテキストフォーマット、テーブル、インデントリスト、ハイパーリンクを含めることができます。多数のメッセージテンプレートをよりよく整理するために、各テンプレートは、作成プロセスでカテゴリを必要とします。

メッセージテンプレートを作成するには

1. **+ New Message Template** ボタンをクリックします
2. テンプレートに名前をつけます
3. 新規または既存のカテゴリに割り当てます
4. テンプレートに件名をつけます (メールの場合)
5. テンプレートのメッセージを書きます
6. **Save** をクリックします。

**注:** メッセージのタイトルと本文の両方でテンプレート変数がサポートされています。

### ルール

{{< img src="service_management/incidents/notification_rules_example.jpeg" alt="通知ルールの例" style="width:80%;">}}

通知ルールを使用すると、インシデントについて特定のステークホルダーが自動的に通知されるシナリオを構成することができます。通知ルールにより、重要なステークホルダーに優先度の高いインシデントを知らせたり、新規インシデントが宣言または更新されたことを外部システムに知らせたり、特定のサービスやチームがインシデントを経験した場合、特定のレスポンダに通知したりすることが可能になります。

**例:** `service:web-store` および `application:purchasing` に対して SEV-1 または SEV-2 のインシデントが宣言されたとき、およびそのインシデントが別のステータスに移行したときにチームのステークホルダーに自動通知する通知ルールを設定します。

新しい通知ルールを構成するには

1. **New Rule** をクリックします。
2. **For incidents matching…** の下に、通知を送信したいインシデントプロパティフィールド `key:value` のペアを選択します。デフォルトでは、これらのフィルターは空であり、通知ルールはあらゆるインシデントに対してトリガーされます。
3. **Notify**: 通知の受信者を選択します。通知は、Datadog の既存の[通知インテグレーション][16]のいずれかに送信することができます。受信者のモバイルデバイスに通知する場合、受信者の名前に **(Mobile Push Notification)** を含むオプションを選択します。このオプションが表示されるには、受信者が [Datadog モバイルアプリ][17]で通知を有効にしている必要があります。
4. **With Template**: 通知ルールを使用したいメッセージテンプレートを選択します。
5. **Renotify on updates to**: どのインシデントプロパティが再通知のトリガーになるかを選択します。選択したプロパティの 1 つまたは複数が変更されると、新しい通知が送信されます。フィルターに既に登録されているプロパティを再通知することはできません (上記のステップ 2 を参照) のでご注意ください。
6. **Save** をクリックします。

通知ルールを管理するために、次の操作を行うことができます。

- *Search* - 通知ルールのリストを受信者で絞り込みます
- *Toggle* - リストの該当するルールの列でボタンを切り替えて、個々の通知ルールを有効/無効にします
- *Copy* - 該当する通知ルールの上にカーソルを合わせ、ルールのトグルボタンの隣にある **Copy** アイコンをクリックします
- *Delete* - 該当する通知ルールの上にカーソルを合わせ、ルールのトグルボタンの隣にある **Delete** アイコンをクリックします

{{< img src="service_management/incidents/notification_rules_list.jpeg" alt="通知ルールリスト" style="width:80%;">}}

## 修復

### Postmortem テンプレート

{{< img src="service_management/incidents/postmortem_template_settings.jpeg" alt="Postmortem テンプレートの設定" style="width:80%;">}}

Postmortem テンプレートは、動的で再利用可能なテンプレートで、インシデントが解決された後にインシデント情報が自動的に入力される [Datadog ノートブック][10]を作成するために使用されます。Postmortem テンプレートは、`{{incident.severity}}` のようなテンプレート変数を利用して、Postmortem が作成されているインシデントから対応する値を動的に注入します。Postmortem テンプレートは Markdown をサポートしており、結果のノートブックにテキストフォーマット、テーブル、インデントされたリスト、ハイパーリンクが含まれます。

Postmortem テンプレートを作成するには

1. **+ New Postmortem Template** ボタンをクリックします
2. テンプレートに名前をつけます
3. テンプレートの内容を書き込みます (利用可能なテンプレート変数はテキストボックスの右側にリストアップされています)。
4. (オプション) テンプレートをデフォルトとして設定します。
5. **Save** をクリックします。

[1]: https://app.datadoghq.com/incidents/settings
[2]: /ja/service_management/incident_management/analytics
[3]: /ja/service_management/incident_management/#from-the-incidents-page
[4]: https://app.datadoghq.com/incidents
[5]: /ja/tracing/
[6]: /ja/account_management/teams/
[7]: /ja/getting_started/tagging/using_tags/?tab=assignment#metrics
[8]: /ja/service_management/incident_management/incident_details/#overview-section
[9]: /ja/dashboards/
[10]: /ja/notebooks/
[11]: /ja/service_management/incident_management/incident_details/#response-team-section
[12]: /ja/account_management/rbac/?tab=datadogapplication#pagetitle
[13]: /ja/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[14]: https://app.datadoghq.com/account/settings#integrations/slack
[15]: /ja/service_management/incident_management/incident_details/#notifications-section
[16]: /ja/monitors/notifications/?tab=is_alert#notify-your-team
[17]: /ja/service_management/mobile/