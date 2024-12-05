---
aliases:
- /ja/logs/log_configuration/sensitive_data_detection
- /ja/account_management/org_settings/sensitive_data_detection
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: データ関連リスクの低減
- link: /sensitive_data_scanner/regular_expression_syntax
  tag: ドキュメント
  text: カスタムスキャンルールのための正規表現構文
- link: /sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
  tag: ドキュメント
  text: カスタムルール作成のベストプラクティス
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: ブログ
  text: 機密データスキャナーを使用して、機密データの問題を大規模に発見、トリアージ、そして修復する
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: ブログ
  text: Datadog の機密データスキャナーで最新のデータコンプライアンス戦略を構築する
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: ブログ
  text: 機密データ管理のベストプラクティス
- link: https://www.datadoghq.com/blog/data-security/
  tag: ブログ
  text: Data Security でクラウドデータストア内の機密データを発見
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: ブログ
  text: HIPAA 要件の対象となる企業が Datadog で機密データを管理する方法
title: Sensitive Data Scanner
---

## 概要

クレジットカード番号、銀行コード、API キーなどの機密データは、アプリケーションログ、APM スパン、RUM イベントで意図せずに公開されることが多く、組織が財務リスクやプライバシーリスクにさらされる可能性があります。

機密データスキャナーは、ストリームベースのパターンマッチングサービスで、機密データの特定、タグ付け、オプションでマスキングやハッシュ化に使用されます。セキュリティおよびコンプライアンスチームは、機密データスキャナーを新たな防御策として導入し、機密データの漏洩防止とコンプライアンス違反リスクの抑制に役立てることができます。

機密データスキャナーを使用するためには、まずスキャングループを設定してスキャン対象のデータを定義し、次にスキャンルールを設定してデータ内でマッチングさせる機密情報を決定します。

このドキュメントでは、以下について説明します。

- Sensitive Data Scanner の表示と設定に必要な権限。
- 機密データのスキャンのセットアップ。
- すぐに使えるダッシュボードを使用。

**注**: PCI 準拠の Datadog 組織のセットアップに関する情報については、[PCI DSS 準拠][1]を参照してください。

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="12 個のアクティブなスキャングループのうち 6 個が表示されている機密データスキャナーページ" style="width:90%;">}}

## 機密データスキャナーの設定


機密データをマスキングできる場所は 2 つあります。

**クラウド:**

- **Sensitive Data Scanner in the Cloud** では、Datadog バックエンドにログを送信します。この方法では、ログがマスキングされる前にプレミスを離れます。組織ごとに複数のスキャングループを持つことができ、カスタムスキャンルールを作成できます。タグで機密データをマスキングすることも可能です。

**環境:**

{{< callout url="https://www.datadoghq.com/private-beta/sensitive-data-scanner-using-agent-in-your-premises/" >}}
Datadog Agent の Sensitive Data Scanner サポートはベータ版です。参加するには、<strong>Request Access</strong> をクリックしてください。
{{< /callout >}}

- **Sensitive Data Scanner using the Agent** では、ログを Datadog バックエンドに送信する前に Datadog がログをマスキングし、マスキングされていないログはプレミス外に出る必要がなくなります。この方法では、組織ごとに 1 つのスキャングループに制限され、定義済みのライブラリルールしか使用できません。

**Observability Pipelines を使用:**

Observability Pipelines で[パイプラインをセットアップ][2]するとき、[Sensitive Data Scanner プロセッサ][3]を追加して、環境を離れる前にログ内の機密データをマスキングします。詳細については、[Observability Pipelines][4] を参照してください。

### 前提条件

{{< tabs >}}
{{% tab "クラウド" %}}
デフォルトでは、Datadog 管理者ロールを持つユーザーは、スキャンルールを表示および設定するためのアクセス権を持っています。他のユーザーにアクセスを許可するには、**Compliance** で `data_scanner_read` または `data_scanner_write` の権限をカスタムロールに付与します。ロールと権限のセットアップ方法の詳細については、[アクセス制御][3]を参照してください。

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="データスキャナーの読み取り権限と書き込み権限が表示されているコンプライアンス権限セクション" style="width:80%;">}}

[1]: /ja/account_management/rbac/permissions/#compliance
[2]: /ja/account_management/rbac/
{{% /tab %}}
{{% tab "Agent の使用" %}}

1. 適切な権限を付与します。デフォルトでは、Datadog 管理者ロールを持つユーザーは、スキャンルールを表示および設定するためのアクセス権を持っています。他のユーザーにアクセスを許可するには、**Compliance** で `data_scanner_read` または `data_scanner_write` の権限をカスタムロールに付与します。ロールと権限のセットアップ方法の詳細については、[アクセス制御][3]を参照してください。

    {{< img src="sensitive_data_scanner/read_write_permissions.png" alt="データスキャナーの読み取り権限と書き込み権限が表示されているコンプライアンス権限セクション" style="width:80%;">}}
2. [リモート構成を有効にする][3]手順に従ってください。
3. Datadog Agent v7.54 以降をインストールします。

[1]: /ja/account_management/rbac/permissions/#compliance
[2]: /ja/account_management/rbac/
[3]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
{{% /tab %}}
{{< /tabs >}}

### スキャングループの追加

{{< tabs >}}
{{% tab "クラウド" %}}
スキャングループは、スキャンするデータを決定します。これは、クエリフィルターと、ログ、APM、RUM、イベントのスキャンを有効にするためのトグルのセットで構成されます。クエリフィルターの詳細については、[ログ検索構文][1]のドキュメントを参照してください。

Terraform については、[Datadog Sensitive Data Scanner グループ][2]のリソースを参照してください。

スキャングループをセットアップするには、以下の手順を実行します。

1. [Sensitive Data Scanner][3] 構成ページに移動します。
1. **Add scanning group** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Group** を選択します。
1. スキャンしたいデータのクエリーフィルターを入力します。フィルタリングされたスパンをプレビューするには、一番上の **APM Spans** をクリックします。フィルタリングされたログを表示するには、**Logs** をクリックします。
1. グループの名前と説明を入力します。
1. トグルボタンをクリックし、希望する製品 (例: ログ、APM スパン、RUM イベント、Datadog イベント) で機密データスキャナーを有効にします。
1. **Create** をクリックします。

[1]: /ja/logs/explorer/search_syntax/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "Agent の使用" %}}
<div class="alert alert-warning"><strong>注</strong>: Sensitive Data Scanner using the Agent は、1 つの組織につき 1 つのスキャングループのみをサポートします。</div>

スキャングループは、スキャンするログを決定します。ホストタグに基づいて適格な Agent に一致させるクエリフィルターで構成されます。

スキャングループをセットアップするには、以下の手順を実行します。

1. [Sensitive Data Scanner using the Agent][1] の構成ページに移動します。
1. **Add scanning group** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Group** を選択します。
1. スキャンするデータのクエリフィルターを入力します。Agent の一致にはホストレベルのタグのみを使用できます。最下部には、タグに一致する Agent の総数を含む、一致して対象となる Agent の数が表示されます。
1. グループの名前と説明を入力します。
1. **Save** をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}

デフォルトでは、新しく作成されたスキャングループは無効になっています。スキャングループを有効にするには、右側の対応するトグルをクリックします。

### スキャンルールの追加

{{< tabs >}}
{{% tab "クラウド" %}}
スキャンルールは、スキャングループで定義されたデータ内のどの機密情報をマッチングさせるかを決定します。Datadog のスキャンルールライブラリから事前定義されたスキャンルールを追加するか、正規表現パターンを使って独自のルールを作成することができます。データは、処理の中で取り込みが行われる際にスキャンされます。ログの場合、これはインデックス化やその他のルーティング関連の決定の前にスキャンが行われることを意味します。

Terraform については、[Datadog Sensitive Data Scanner ルール][1]のリソースを参照してください。

スキャンルールを追加するには、以下の手順を実行します。

1. [Sensitive Data Scanner][2] 構成ページに移動します。
1. スキャンルールを追加する対象のスキャングループをクリックします。
1. **Add Scanning Rule** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Rule** を選択します。
1. ライブラリルールを追加するか、カスタムスキャンルールを作成するかを選択します。

{{< collapse-content title="ライブラリルールからスキャンルールを追加" level="p" >}}

スキャンルールライブラリには、メールアドレスやクレジットカード番号、API キー、認証トークンなどの一般的なパターンを検出するための、あらかじめ定義されたルールが含まれています。

1. このルールをスキャングループ内で作成していない場合は、スキャングループを選択します。
1. **Add library rules to the scanning group** (スキャングループにライブラリルールを追加する) セクションで、使用したいライブラリルールを選択します。
{{% sds-scanning-rule %}}
1. **Add Rules** をクリックします。

#### 他のキーワードを追加

すぐに使えるスキャンルールを追加した後、各ルールを個別に編集して、キーワード辞書に他のキーワードを追加できます。

1. [Sensitive Data Scanner][2] 構成ページに移動します。
1. 編集したいルールがあるスキャングループをクリックします。
1. ルールにカーソルを合わせ、鉛筆アイコンをクリックします。
1. デフォルトでは、推奨キーワードが使用されます。他のキーワードを追加するには、**Use recommended keywords** をトグルし、キーワードをリストに追加します。また、これらのキーワードがマッチした値から指定された文字数以内に存在するよう条件を設定することも可能です。デフォルトでは、キーワードはマッチした値の前に 30 文字以内に配置されている必要があります。
1. **Update** をクリックします。

{{< /collapse-content >}}
{{< collapse-content title="カスタムスキャンルールを追加する" level="p" >}}
正規表現パターンを使用して機密データをスキャンするカスタムスキャンルールを作成できます。

1. このルールをスキャングループ内で作成していない場合は、スキャングループを選択します。
1. **Define match conditions** セクションで、**Define the regex** フィールドにイベントに対してマッチングに使用する正規表現パターンを指定します。**Add sample data** フィールドにサンプルデータを入力して、正規表現パターンが有効であることを確認します。
    機密データスキャナーは Perl 互換正規表現 (PCRE) をサポートしていますが、以下のパターンはサポートされていません。
    - 後方参照、およびサブマッチ文字列のキャプチャ (ルックアラウンド)
    - 任意のゼロ幅マッチ
    - サブルーチン参照および再帰的パターン
    - 条件付きパターン
    - バックトラック制御動詞
    - `\C` "シングルバイト" ディレクティブ (UTF-8 の文字列を分割)
    - `\R` 改行コードのマッチ
    - `\K` マッチの開始位置のリセットディレクティブ
    - コールアウトおよび埋め込みコード
    - アトミックグループおよび絶対最大量指定子
1. **Create keyword dictionary** では、正規表現条件とマッチする際の検出精度を高めるためにキーワードを追加します。例えば、16 桁の Visa クレジットカード番号をスキャンする場合、`visa`、`credit`、`card` などのキーワードを追加できます。また、これらのキーワードがマッチした値から指定された文字数以内に存在するよう条件を設定することも可能です。デフォルトでは、キーワードはマッチした値の前に 30 文字以内に配置されている必要があります。
{{% sds-scanning-rule %}}
1. **Add Rule** をクリックします。
{{< /collapse-content >}} 

**注**:

- 追加または更新するルールは、ルールが定義された後に Datadog に送られるデータにのみ影響します。
- 機密データスキャナーは、Datadog Agent で直接定義するルールには影響しません。
- ルールが追加されたら、スキャングループのトグルが有効になっていることを確認してスキャンを開始します。

機密データの問題をトリアージするための [Summary][4] ページの使い方について、詳しくは[機密データの問題を調査する][3]を参照してください。


[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[2]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[3]: /ja/sensitive_data_scanner/investigate_sensitive_data_issues/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
{{% /tab %}}
{{% tab "Agent の使用" %}}

スキャンルールは、スキャングループによって定義されたデータ内のどの機密情報を対象にするかを決定します。Datadog Agent は、ログが Datadog プラットフォームに送信される前に、ログ収集中にローカル環境でデータをスキャンします。

<div class="alert alert-warning"><strong>注</strong>: Sensitive Data Scanner using the Agent は、Datadog のスキャンルールライブラリから定義済みのスキャンルールのみをサポートします。スキャンルールの総数は 20 個に制限されています。</div>

スキャンルールを追加するには、以下の手順を実行します。

1. [Sensitive Data Scanner using the Agent][1] の構成ページに移動します。
1. **Add Scanning Rule** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Rule** を選択します。
1. **Add library rules to the scanning group** セクションで、使用するライブラリルールを選択します。既存のライブラリルールを検索するには、**Filter library rules** 入力を使用します。ルール名の横には、各ルールの定義済みタグのリストがあります。
1. **Define rule target and action** セクションで、一致した機密情報に対して実行するアクションを選択します。**注**: マスキング、部分的なマスキング、およびハッシュ化はすべて不可逆アクションです。
    - **Redact**: 一致するすべての値を **Replacement text** フィールドで指定したテキストに置換します。
    - **Partially Redact**: 一致するすべてのデータの指定した部分を置換します。**Redact** セクションでは、編集する文字数と、一致するデータのどの部分を編集するかを指定します。
    - **Hash**: 一致するすべてのデータを一意の識別子に置換します。マッチの UTF-8 バイトは FarmHash の 64 ビットフィンガープリントでハッシュされます。
1. オプションとして、指定された正規表現パターンに一致する値を含むイベントに関連付ける追加タグを追加します。Datadog は、デフォルトで `sensitive_data` および `sensitive_data_category` のタグを追加します。これらのタグは、検索、ダッシュボード、およびモニターで使用できます。タグを利用して機密情報を含むログへのアクセス権を決定する方法については、[機密データを含むログへのアクセス制御](#control-access-to-logs-with-sensitive-data)を参照してください。
1. **Save** をクリックします。

**注**:

- 追加または更新するルールは、ルールが定義された後に Datadog に送られるデータにのみ影響します。
- ルールが追加されたら、スキャングループのトグルが有効になっていることを確認してスキャンを開始します。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}

#### 除外されるネームスペース

Datadog プラットフォームが機能上必要とする予約キーワードがあります。これらの単語がスキャンされるログ内にある場合、一致した単語の後の 30 文字は無視され、マスキングされません。例えば、ログの `date` という単語の後に来るのは通常イベントのタイムスタンプです。もしタイムスタンプが誤ってマスキングされると、ログの処理に問題が生じ、後でクエリを実行することができなくなります。そのため、除外されるネームスペースの動作は、製品機能にとって重要な情報が意図せずにマスキングされるのを防ぐためのものです。

除外されるネームスペースは以下のとおりです。

- `host`
- `hostname`
- `syslog.hostname`
- `service`
- `status`
- `env`
- `dd.trace_id`
- `trace_id`
- `trace id`
- `dd.span_id`
- `span_id`
- `span id`
- `@timestamp`
- `timestamp`
- `_timestamp`
- `Timestamp`
- `date`
- `published_date`
- `syslog.timestamp`
- `error.fingerprint`
- `x-datadog-parent-id`

### スキャンルールの編集

{{< tabs >}}
{{% tab "クラウド" %}}

1. [Sensitive Data Scanner][1] 構成ページに移動します。
1. 編集するスキャンルールにカーソルを合わせ、**Edit** (鉛筆) アイコンをクリックします。

   **Define match conditions** セクションには、カスタムルールに記述した正規表現、または選択したライブラリスキャンルールの説明が、一致した機密情報の例と共に表示されます。
1. ルールがデータに一致することを確認するには、**Add sample data** セクションにサンプルを提供します。ルールがサンプルデータに一致すると、入力フィールドの横に緑色の **Match** ラベルが表示されます。
1. **Create keyword dictionary** では、検出精度を向上させるためのキーワードを追加できます。例えば、16 桁の Visa クレジットカード番号をスキャンする場合、`visa`、`credit`、`card` のようなキーワードを追加できます。
1. キーワードが一致する前に出現しなければならない文字数を選択します。デフォルトでは、キーワードは一致する前の 30 文字以内に出現する必要があります。
1. オプションとして、**Define rule target and action** で、ルールに一致する値を含むイベントに関連付けるタグを編集します。Datadog では、検索、ダッシュボード、およびモニターで使用できる `sensitive_data` および `sensitive_data_category` のタグの使用を推奨しています。タグを利用して機密データを含むログへのアクセス権を決定する方法については、[機密データを含むログへのアクセス制御](#control-access-to-logs-with-sensitive-data)を参照してください。
1. **Set priority level** では、ビジネスニーズに基づいて値を選択します。
1. **Update** をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "Agent の使用" %}}

1. [Sensitive Data Scanner using the Agent][1] の構成ページに移動します。
1. 編集するスキャンルールにカーソルを合わせ、**Edit** (鉛筆) アイコンをクリックします。

   **Define match conditions** セクションには、選択したライブラリスキャンルールの説明が、一致した機密情報の例と共に表示されます。
1. **Create keyword dictionary** では、検出精度を向上させるためのキーワードを追加できます。例えば、16 桁の Visa クレジットカード番号をスキャンする場合、`visa`、`credit`、`card` のようなキーワードを追加できます。
1. キーワードが一致する前に出現しなければならない文字数を選択します。デフォルトでは、キーワードは一致する前の 30 文字以内に出現する必要があります。
1. **Save** をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}


### 機密データを含むログへのアクセス制御

機密データを含むログへのアクセスを制御するには、Sensitive Data Scanner によって追加されたタグを使用して、ロールベースアクセス制御 (RBAC) によるクエリを構築します。保持期間が過ぎてデータが古くなるまで、特定の個人やチームへのアクセスを制限できます。詳細については、[ログのための RBAC のセットアップ方法][5]を参照してください。

### タグ内の機密データをマスキングする

{{< tabs >}}
{{% tab "クラウド" %}}
タグに含まれる機密データをマスキングするには、タグを属性に[リマップ][1] し、その属性をマスキングする必要があります。リマッパープロセッサで `Preserve source attribute` のチェックを外し、リマップ中にタグが保持されないようにします。

タグを属性にリマップするには:

1. [ログパイプライン][2]に移動します。
2. **Add Processor** をクリックします。
3. プロセッサーの種類のドロップダウンメニューで **Remapper** を選択します。
4. プロセッサーに名前を付けます。
5. **Tag key(s)** を選択します。
6. タグキーを入力します。
7. タグキーをリマップする属性の名前を入力します。
8. **Preserve source attribute** を無効にします。
9. **Create** をクリックします。

属性をマスキングするには

1. [スキャングループ][3]に移動します。
2. **Add Scanning Rule** をクリックします。
3. 使用したいライブラリルールにチェックを入れます。
4. **Scan entire event or portion of it** (イベント全体またはその一部をスキャンする)で **Specific Attributes** を選択します。
5. 予め作成しておいた属性の名前を入力し、スキャンの対象に指定します。
6. マッチングした場合のアクションを選択します。
7. オプションで、タグを追加します。
8. **Add Rules** をクリックします。

[1]: /ja/logs/log_configuration/processors/?tab=ui#remapper
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "Agent の使用" %}}
この関数は Sensitive Data Scanner using the Agent では使用できません。
{{% /tab %}}
{{< /tabs >}}

## Cloud Storage のスキャン

{{< callout header="プレビューにご参加ください！" url="https://www.datadoghq.com/private-beta/data-security" >}}
Amazon S3 バケットおよび RDS インスタンスのスキャンサポートは現在プレビュー中です。参加をご希望の方は、<strong>Request Access</strong> をクリックしてください。
{{< /callout >}}

[Sensitive Data Scanner][6] を有効にしている場合、Amazon S3 バケットや RDS インスタンス内の機密データをカタログ化し、分類することができます。

Sensitive Data Scanner は、クラウド環境に[エージェントレススキャナー][8]をデプロイして機密データをスキャンします。これらのスキャンインスタンスは、[Remote Configuration][9] を通じてすべての S3 バケットと RDS インスタンスのリストを取得し、CSV や JSON などのテキストファイルや、各データストア内のテーブルを時間をかけてスキャンするように設定されています。Sensitive Data Scanner は、[全ルールライブラリ][11]を活用して一致を検出します。一致が見つかると、その場所がスキャンインスタンスから Datadog に送信されます。データストアとそのファイルはお客様の環境内でのみ読み取られ、機密データが Datadog に送信されることはありません。

Cloud Storage は、機密データの一致を表示するだけでなく、[Cloud Security Management][7] によって検出された、機密データストアに影響を与えるセキュリティ問題も表示します。問題をクリックすると、Cloud Security Management 内でトリアージと修正を続けることができます。

## すぐに使えるダッシュボード

Sensitive Data Scanner が有効になると、機密データの発見を要約した[すぐに使えるダッシュボード][10]がアカウントに自動的にインストールされます。このダッシュボードにアクセスするには、**Dashboards > Dashboards List** に移動し、"Sensitive Data Scanner Overview" を検索します。

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview ダッシュボード" style="width:80%;">}}

## Sensitive Data Scanner を無効にする

Sensitive Data Scanner を完全にオフにするには、各スキャングループのトグルを **off** に設定して無効化します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_security/pci_compliance/
[2]: /ja/observability_pipelines/set_up_pipelines/
[3]: /ja/observability_pipelines/processors/#sensitive-data-scanner
[4]: /ja/observability_pipelines/
[5]: /ja/logs/guide/logs-rbac/
[6]: /ja/sensitive_data_scanner/
[7]: /ja/security/cloud_security_management
[8]: /ja/security/cloud_security_management/setup/agentless_scanning
[9]: /ja/agent/remote_config
[10]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[11]: /ja/sensitive_data_scanner/library_rules/