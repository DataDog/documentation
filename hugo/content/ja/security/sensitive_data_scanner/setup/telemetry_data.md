---
aliases:
- /ja/sensitive_data_scanner/setup/telemetry_data
- /ja/security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /ja/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /ja/security/sensitive_data_scanner/guide/redact_uuids_in_logs/
- /ja/security/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: ドキュメント
  text: すぐに使えるライブラリルールについて
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: ドキュメント
  text: カスタムルールの作成について
title: テレメトリデータ
---
## 概要 {#overview}

クラウド上の Sensitive Data Scanner は、アプリケーションログ、APM イベント、RUM イベント、Event Management のイベントなど、テレメトリデータをスキャンします。スキャンおよびマスキングの対象となるデータは次のとおりです。

- **ログ**: ログメッセージや属性値など、構造化・非構造化を含むすべてのログ内容
- **APM**: スパンの属性値のみ
- **RUM**: イベントの属性値のみ
- **イベント**: イベントの属性値のみ

オプションで、各製品のサンプリングレートを 10% から 99% の間で設定できます。これにより、機密情報のスキャン対象となるデータ量が減少し、開始時のコスト管理に役立ちます。

スキャンルールごとに、一致した機密データに次のいずれかのアクションを適用できます。

- **Redact**: 一致したデータ全体を `[sensitive_data]` などの選択した単一のトークンで置き換えます。
- **Partially redact**: 一致するすべての値の特定の部分を置き換えます。
- **Hash**: 一致したデータ全体を非可逆の一意の識別子で置き換えます。
- **Mask** (ログにのみ利用可能): 一致するすべての値を難読化します。`Data Scanner Unmask` の権限を持つユーザーは、このデータを Datadog で難読化解除 (マスク解除) して表示できます。詳細については、[マスクアクション](#mask-action)を参照してください。

**注**:
- : サンプリングデータをスキャンするときは、スキャンするデータを難読化するアクションは選択できません。
- Sensitive Data Scanner は、整数、浮動小数点数、および倍数をスキャンしません。数値が文字列形式の場合、その文字列がスキャンされます。

ログやイベントを Datadog バックエンドに送信するため、マスキングが行われる前にデータは環境外へ出ます。ログやイベントは処理中に Datadog バックエンドでスキャンおよびマスキングされるため、機密データはイベントがインデックスされ、Datadog UI に表示される前にマスキングされます。

マスキングされる前にデータが環境外に出ないようにするには、[Observability Pipelines][12] および [Sensitive Data Scanner プロセッサー][13]を使用して、機密データをスキャンおよびマスキングします。パイプラインとそのコンポーネントの設定方法については、[パイプラインをセットアップ][14]を参照してください。

クラウド上で Sensitive Data Scanner を使用するには、スキャングループを設定してスキャン対象のデータを定義し、次にスキャンルールを追加してデータ内でマッチングさせる機密情報を決定します。

このドキュメントでは、以下について説明します。

- Sensitive Data Scanner の表示と設定に必要な[権限](#permissions)。
- [スキャングループの追加](#add-a-scanning-group)
- [スキャンルールの追加](#add-scanning-rules)
- [機密データを含むログへのアクセスを制御する方法](#control-access-to-logs-with-sensitive-data)
- [タグ内の機密データをマスキングする方法](#redact-sensitive-data-in-tags)

## セットアップ {#setup}

### 権限 {#permissions}

デフォルトでは、Datadog 管理者ロールを持つユーザーは、スキャンルールを表示および設定するためのアクセス権を持っています。他のユーザーにアクセスを許可するには、[Compliance][1] で `data_scanner_read` または `data_scanner_write` の権限をカスタムロールに付与します。ロールと権限のセットアップ方法の詳細については、[Access Control][2] を参照してください。

スキャンルールが**マスク**アクション (ログでのみ利用可能) を使用して一致する機密データを処理する場合、`data_scanner_unmask` の権限を持つユーザーは、Datadog でデータのマスキングを解除して表示できます。**注**: Datadog は、すべての漏洩した資格情報に対応し、ローテーションする計画がない限り、資格情報に対して**マスク**アクションを使用することを推奨しません。詳細については、[マスクアクション](#mask-action)を参照してください。

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="データスキャナーの読み取り権限と書き込み権限が表示されているコンプライアンス権限セクション" style="width:80%;">}}

### スキャングループの追加 {#add-a-scanning-group}

スキャングループは、スキャンするデータを決定します。これは、クエリフィルター、ログ、APM、RUM、およびイベントのスキャンを有効にするためのボタンのセット、各プロダクトのサンプリングレートを 10% から 99% の間で設定するオプションで構成されています。クエリフィルターの詳細については、[ログ検索構文][3]のドキュメントを参照してください。

Terraform については、[Datadog Sensitive Data Scanner グループ][4]のリソースを参照してください。

スキャングループをセットアップするには、以下の手順を実行します。

1. [Sensitive Data Scanner][5] 設定ページに移動します。
1. **スキャングループの追加**をクリックします。または、ページ右上にある**追加**ドロップダウンメニューをクリックし、**スキャングループの追加**を選択します。
1. スキャンしたいデータのクエリフィルターを入力します。上部で **APM スパン**をクリックして、フィルタリングされたスパンをプレビューします。**ログ**をクリックして、フィルタリングされたログを表示します。
1. グループの名前と説明を入力します。
1. オプションボタンをクリックして、希望するプロダクト (例: ログ、APM スパン、RUM イベント、Datadog イベント) に対して Sensitive Data Scanner を有効にします。
1. オプションで、希望するプロダクトのサンプリングレートを 10-99% に設定します。サンプリングが有効なグループにスキャンルールを追加すると、スキャン対象のデータをマスキングするアクションを選択できなくなります。一致するデータをマスキングするには、グループクエリフィルターに一致するすべてのデータをスキャンするように設定する必要があります。
1. **作成**をクリックします。

デフォルトでは、新しく作成されたスキャングループは無効になっています。スキャングループを有効にするには、右側の対応するトグルをクリックします。

### スキャンルールの追加 {#add-scanning-rules}

スキャンルールは、スキャングループで定義されたデータ内のどの機密情報をマッチングさせるかを決定します。Datadog のスキャンルールライブラリから事前定義されたスキャンルールを追加するか、正規表現 (regex) パターンを使って独自のルールを作成することができます。データは、処理の中で取り込みが行われる際にスキャンされます。ログの場合、これはインデックス化やその他のルーティング関連の決定の前にスキャンが行われることを意味します。

可能な限り、Datadog のすぐに使えるライブラリルールを使用してください。これらのルールは、メールアドレス、クレジットカード番号、API キー、認可トークン、ネットワークおよびデバイス情報など、一般的なパターンを検出する、あらかじめ定義されたルールです。各ルールには、マッチング精度を向上させるためにキーワード辞書の推奨キーワードがあります。[独自のキーワードを追加する](#add-custom-keywords)こともできます。

Terraform については、[Datadog Sensitive Data Scanner ルール][6]のリソースを参照してください。


スキャンルールを追加するには、以下の手順を実行します。

1. [Sensitive Data Scanner][5] 設定ページに移動します。
1. スキャンルールを追加する対象のスキャングループをクリックします。
1. **スキャンルールの追加**をクリックします。または、ページ右上にある**追加**ドロップダウンメニューをクリックし、**スキャンルールの追加**を選択します。
1. ライブラリルールを追加するか、カスタムスキャンルールを作成するかを選択します。

{{% collapse-content title="ライブラリルールの追加" level="p" id="add-library-rules" %}}

スキャンルールライブラリには、メールアドレスやクレジットカード番号、API キー、認証トークンなどの一般的なパターンを検出するための、あらかじめ定義されたルールが含まれています。

1. このルールをスキャングループ内で作成していない場合は、スキャングループを選択します。
1. **優先度**ドロップダウンメニューで、ビジネスニーズに基づいてルールの優先度を選択します。
1. **ライブラリルールの追加**セクションで、使用したいライブラリルールを選択します。
{{% sds-scanning-rule %}}
1. **ルールの追加**をクリックします。

#### カスタムキーワードの追加 {#add-custom-keywords}

ライブラリルールが追加されると、[推奨キーワード][15]がデフォルトで使用されます。ライブラリルールを追加した後、各ルールを個別に編集し、キーワード辞書にキーワードを追加したりキーワード辞書から削除したりできます。例えば、16 桁の Visa クレジットカード番号をスキャンする場合、`visa`、`credit`、`card` のようなキーワードを追加できます。

1. [Sensitive Data Scanner][5] 設定ページに移動します。
1. 編集したいルールがあるスキャングループをクリックします。
1. ルールにカーソルを合わせ、鉛筆アイコンをクリックします。
1.  **マッチ条件**セクションで、**カスタムキーワード**をクリックします。
    - キーワードを追加するには、キーワードを入力し、プラスアイコンをクリックしてキーワードをリストに追加します。
    - キーワードを削除するには、削除したいキーワードの横にある **X** をクリックします。
    - これらのキーワードがマッチした値から指定された文字数以内に存在するよう条件を設定することも可能です。デフォルトでは、キーワードはマッチした値の前に 30 文字以内に配置されている必要があります。
    - 構造化イベントの場合、キーワードはイベントパス内の属性名にもマッチします。属性名に含まれる `-`、`_`、`.` などの区切り文字は単語の境界としてカウントされるため、キーワード `card` は `card_number` または `card-type` という名前の属性にマッチします。文字数制限は属性名のマッチングには適用されません。
    - **注**: 1 つのルールに 20 個以上のキーワードを設定することはできません。
1. **イベントデータを入力するか貼り付けてルールをテストする**セクションで、ルールを評価するためのイベントデータを追加し、マッチ条件を絞り込むためにキーワードを追加します。
1. **更新**をクリックします。

#### 抑制の追加 {#add-suppressions}

{{% sds-suppressions %}}

{{% /collapse-content %}}
{{% collapse-content title="カスタムルールの追加" level="p" id="add-custom-rule"%}}
正規表現パターンを使用して機密データをスキャンするカスタムスキャンルールを作成できます。

1. このルールをスキャングループ内で作成していない場合は、スキャングループを選択します。
1. ルールの名前を入力します。
1. **優先度**ドロップダウンメニューで、ビジネスニーズに基づいてルールの優先度を選択します。
1. (任意) ルールの説明を入力します。
1. **マッチ条件**セクションで、**正規表現パターン**フィールドのイベントとマッチングするために使用する正規表現パターンを指定します。できるだけ正確な正規表現パターンを定義します。一般的なパターンは、より多くの誤検知を引き起こすからです。<br>
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
1. 正規表現条件とのマッチング時に**ノイズを低減するために周囲のマッチコンテキスト内のキーワードをチェック**し、検出精度を向上させるためのキーワードを追加します。例えば、16 桁の Visa クレジットカード番号をスキャンする場合、`visa`、`credit`、`card` のようなキーワードを追加できます。
    - キーワードを追加するには、キーワードを入力し、プラスアイコンをクリックしてキーワードをリストに追加します。
    - キーワードを削除するには、削除したいキーワードの横にある **X** をクリックします。
    - これらのキーワードがマッチした値から指定された文字数以内に存在するよう条件を設定することも可能です。デフォルトでは、キーワードはマッチした値の前に 30 文字以内に配置されている必要があります。
    - 構造化イベントの場合、キーワードはイベントパス内の属性名にもマッチします。属性名に含まれる `-`、`_`、`.` などの区切り文字は単語の境界としてカウントされるため、キーワード `card` は `card_number` または `card-type` という名前の属性にマッチします。文字数制限は属性名のマッチングには適用されません。
      **注**: 1 つのルールに 20 個以上のキーワードを設定することはできません。
{{% sds-suppressions %}}
1. **イベントデータを入力するか貼り付けてルールをテストする**セクションで、ルールを評価するためのイベントデータを追加し、マッチ条件を絞り込むためにキーワードを追加します。
{{% sds-scanning-rule %}}
1. **ルールを追加**をクリックします。

{{% /collapse-content %}}

**注**:

- 追加または更新するルールは、ルールが定義された後に Datadog に送られるデータにのみ影響します。
- Sensitive Data Scanner は、Datadog Agent で直接定義するルールには影響しません。
- ルールが追加されたら、スキャングループのトグルが有効になっていることを確認してスキャンを開始します。
- サンプリングが有効なスキャングループにルールを追加すると、**Redact**、**Partially redact**、または **Hash** アクションを選択できなくなります。完全にマスキングするには、スキャングループ設定でサンプリングを無効にします。

[検出結果][8]ページを使用して機密データをトリアージする方法の詳細については、[機密データの検出結果を調査する][7]を参照してください。

#### 除外されるネームスペース {#excluded-namespaces}

Datadog プラットフォームが機能上必要とする予約キーワードがあります。これらの単語がスキャンされるログ内にある場合、一致した単語の後の 30 文字は無視され、マスキングされません。例えば、ログの `date` という単語の後に来るのは通常イベントのタイムスタンプです。もしタイムスタンプが誤ってマスキングされると、ログの処理に問題が生じ、後でクエリを実行することができなくなります。そのため、除外されるネームスペースの動作は、製品機能にとって重要な情報が意図せずにマスキングされるのを防ぐためのものです。

除外されるネームスペースは以下のとおりです。

{{% tabs %}}
{{% tab "ログ" %}}

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

{{% /tab %}}
{{% tab "スパン" %}}

- `metrics._dd.`
- `metrics.dd.`
- `metrics._dd1.`
- `metrics.otel.trace_id`
- `metrics.otlp.`
- `metrics._sampling_priority_v1`
- `metrics._sample_rate`
- `meta._dd.`
- `meta.api.endpoint.`
- `meta.dd.`
- `meta_struct.dd.`
- `meta_struct._dd.`
- `meta_struct.api.endpoint.`
- `meta_struct.appsec.`
- `meta_struct.threat_intel.results.`
- `meta.otel.trace_id`
- `meta.otel.library.`
- `meta.otlp.`
- `trace_id`
- `span_id`
- `start`
- `timestamp`
- `end`
- `duration`
- `parent_id`
- `type`
- `resource`
- `resource_hash`
- `ingest_size_in_bytes`
- `ingestion_reason`
- `error`
- `flags`
- `status`
- `chunk_id`
- `host`
- `host_id`
- `hostname`
- `env`
- `service`
- `operation_name`
- `name`
- `version`
- `meta._dd.error_tracking`
- `meta.error.fingerprint`
- `meta.issue`

{{% /tab %}}
{{% tab "RUM" %}}

- `application.id`
- `session.id`
- `session.initial_view.id`
- `session.last_view.id`
- `view.id`
- `action.id`
- `resource.id`
- `geo`
- `error.fingerprint`
- `error.binary_images.uuid`
- `issue`
- `_dd.trace_id`
- `_dd.span_id`
- `_dd.usage_attribution_tag_names`
- `_dd.error.unminified_frames`
- `_dd.error.threads`

{{% /tab %}}
{{% /tabs %}}

#### リスク受容データを無視するために特定のマッチを抑制する {#suppress-specific-matches-to-ignore-risk-accepted-data}

抑制を使用して、運用上安全と考えられる機密データの一致を無視します (例: 内部メールドメインやプライベート IP 範囲)。

**注**:
- 抑制されたマッチは、マスキングもハッシュ化もされません。
- 抑制されたマッチは、検出結果ページ、ダッシュボード、アラート、およびその他のレポートワークフローから除外されます。
- 抑制はスキャングループ内のルールごとに定義されます。

#### 特定の属性をスキャンまたは除外する {#scan-or-exclude-specific-attributes}

マッチをより正確にするために、次のいずれかを行うこともできます。

- イベント全体をスキャンしますが、特定の属性がスキャンされないように除外します。例えば、物理的な住所のような個人を特定できる情報 (PII) をスキャンしている場合、`ip_address` のような属性を除外することを検討できるかもしれません。
- スキャンされるデータスコープを狭めるために、特定の属性をスキャンします。例えば、物理的な住所をスキャンしている場合、`street` や `city` のような特定の属性を選択できます。

**注**: 属性名を指定する際に、属性パスに `@` プレフィックスを使用しないでください。例えば、`@function.request.body.password` の代わりに `function.request.body.password` を使用します。検索クエリや Datadog の他の部分で使用される `@` プレフィックスは、このフィールドではサポートされていません。

### スキャンルールの編集 {#edit-scanning-rules}

スキャンルールを編集するには

1. [Sensitive Data Scanner][5] 設定ページに移動します。
1. 編集するスキャンルールにカーソルを合わせ、**Edit** (鉛筆) アイコンをクリックします。
1. ルールに対して希望する変更を行います。編集しているルールのタイプに応じて、[ライブラリルールの追加](#add-library-rules)または[カスタムルールの追加](#add-custom-rule)を参照して各設定セクションの詳細を確認できます。
1. **更新**をクリックします。

## 機密データを含むログへのアクセス制御 {#control-access-to-logs-with-sensitive-data}

機密データを含むログへのアクセスを制御するには、Sensitive Data Scanner によって追加されたタグを使用して、ロールベースアクセス制御 (RBAC) によるクエリを構築します。保持期間が過ぎてデータが古くなるまで、特定の個人やチームへのアクセスを制限できます。詳細については、[ログのための RBAC のセットアップ方法][9]を参照してください。

### アクションをマスキングする {#mask-action}

{{% sds-mask-action %}}

## タグ内の機密データをマスキングする {#redact-sensitive-data-in-tags}

タグ内の機密データをマスキングするには、タグを属性に[リマップ][10]してから属性をマスキングする必要があります。リマッパープロセッサーの `Preserve source attribute` のチェックを外して、リマッピング中にタグが保持されないようにします。

タグを属性にリマップするには

1. [ログパイプライン][11] に移動します。
2.  **プロセッサーを追加**をクリックします。
3. プロセッサーの種類のドロップダウンメニューで**リマッパー**を選択します。
4. プロセッサーに名前を付けます。
5. **タグキー**を選択します。
6. タグキーを入力します。
7. タグキーをリマップする属性の名前を入力します。
8. **ソース属性を保持する**を無効にします。
9. **作成**をクリックします。

属性をマスキングするには

1. [スキャングループ][5]に移動します。
2. **スキャンルールの追加**をクリックします。
3. 使用したいライブラリルールをチェックします。
4. **イベント全体またはその一部をスキャンする**で**特定の属性**を選択します。
5. あらかじめ作成しておいた属性の名前を入力し、スキャンの対象に指定します。**注**: 属性パスに `@` プレフィックスを使用しないでください。例えば、`@function.request.body.password` の代わりに `function.request.body.password` を使用します。
6. マッチングした場合のアクションを選択します。
7. オプションで、タグを追加します。
8. **ルールの追加**をクリックします。

## ログのリハイドレート {#log-rehydration}

アーカイブからログをリハイドレートする際、Sensitive Data Scanner はそれらのログを再スキャンしません。代わりに、Datadog がアーカイブに書き込まれた通りにログを復元します。

アーカイブが [Datadog タグ][16]を含むように構成されており、Sensitive Data Scanner によってログが初めて取り込まれて処理された際にタグが追加されている場合は、それらのタグを使用してリハイドレートされたログが以前に機密データを含んでいたかどうかを特定できます。これにより、`sensitive_data:<rule_tag_name>` のようなクエリを使用してリハイドレートされたログをフィルタリングできます。

マッチした機密データのメタデータはアーカイブされたログに保存されないため、それらのログがリハイドレートされる際に機密データのマッチは強調表示されません。アーカイブ形式には、元のログペイロードと保持されたタグのみが含まれます。検出された値を視覚的に強調表示するために Datadog UI で Sensitive Data Scanner が使用する位置情報は含まれていません。

リハイドレートされたログでできること:

- アーカイブにタグが含まれている場合、スキャンルールに以前マッチしたログをフィルタリングします。
- 機密データを含む過去のイベントを調査します。

リハイドレートされたログで**できない**こと:

- UI 内でインライン強調表示された機密データのマッチを表示: マスク、削除、一部削除、またはハッシュがマッチ時のアクションとして選択された場合でも、マッチは依然として隠された状態のままです。
- 遡及的スキャンをトリガー: Sensitive Data Scanner はリハイドレートされたログを再スキャンしません。

## Sensitive Data Scanner を無効にする {#disable-sensitive-data-scanner}

Sensitive Data Scanner を完全にオフにするには、各スキャングループのトグルを**オフ**に設定して無効化します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/#compliance
[2]: /ja/account_management/rbac/
[3]: /ja/logs/explorer/search_syntax/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[5]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[7]: /ja/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[8]: https://app.datadoghq.com/sensitive-data-scanner/telemetry
[9]: /ja/logs/guide/logs-rbac/
[10]: /ja/logs/log_configuration/processors/remapper/
[11]: https://app.datadoghq.com/logs/pipelines
[12]: /ja/observability_pipelines/
[13]: /ja/observability_pipelines/processors/sensitive_data_scanner/
[14]: /ja/observability_pipelines/configuration/set_up_pipelines/
[15]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[16]: /ja/logs/log_configuration/archives/?tab=awss3#datadog-tags