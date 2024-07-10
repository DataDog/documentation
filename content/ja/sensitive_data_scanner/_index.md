---
aliases:
- /ja/logs/log_configuration/sensitive_data_detection
- /ja/account_management/org_settings/sensitive_data_detection
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: データ関連リスクの低減
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: ブログ
  text: 機密データスキャナーを使用して、機密データの問題を大規模に発見、トリアージ、そして修復する
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: ブログ
  text: Datadog の機密データスキャナーで最新のデータコンプライアンス戦略を構築する
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: ブログ
  text: 機密データ管理のベストプラクティス
title: ヘルプ
---

## 概要

クレジットカード番号、銀行コード、API キーなどの機密データは、アプリケーションログ、APM スパン、RUM イベントで意図せずに公開されることが多く、組織が財務リスクやプライバシーリスクにさらされる可能性があります。

機密データスキャナーは、ストリームベースのパターンマッチングサービスで、機密データの特定、タグ付け、オプションで秘匿化やハッシュ化に使用されます。セキュリティおよびコンプライアンスチームは、機密データスキャナーを新たな防御策として導入し、機密データの漏洩防止とコンプライアンス違反リスクの抑制に役立てることができます。

機密データスキャナーを使用するためには、まずスキャングループを設定してスキャン対象のデータを定義し、次にスキャンルールを設定してデータ内でマッチングさせる機密情報を決定します。

このドキュメントでは、以下について説明します。

- [機密データスキャナーの表示と設定に必要な権限](#permissions)
- [機密データのスキャンの設定](#set-up-scanning-for-sensitive-data)
- [すぐに使えるダッシュボードの使用](#out-of-the-box-dashboard)

**注**: PCI 準拠の Datadog 組織のセットアップに関する情報については、[PCI DSS 準拠][1]を参照してください。

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="12 個のアクティブなスキャングループのうち 6 個が表示されている機密データスキャナーページ" style="width:90%;">}}

## ヘルプ

デフォルトでは、Datadog 管理者ロールを持つユーザーは、スキャンルールを表示および設定するためのアクセス権を持っています。他のユーザーにアクセスを許可するには、**Compliance** で `data_scanner_read` または `data_scanner_write` の権限をカスタムロールに付与します。ロールと権限のセットアップ方法の詳細については、[アクセス制御][3]を参照してください。

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="データスキャナーの読み取り権限と書き込み権限が表示されているコンプライアンス権限セクション" style="width:55%;">}}


## 機密データスキャナーの設定

このセクションでは、機密データスキャナーを設定するため、以下の内容について説明します。

- [スキャングループの追加](#add-a-scanning-group)
- [スキャンルールの追加](#add-scanning-rules)
- [機密データを含むイベントへのアクセス制御](#control-access-to-events-with-sensitive-data)

また、[タグ内の機密データを秘匿化する](#redact-sensitive-data-in-tags)こともできます。

### スキャングループの追加

スキャングループは、スキャンするデータを決定します。これは、ログ、APM、RUM、およびイベントのスキャンを有効にするためのクエリフィルターとトグルのセットで構成されています。クエリフィルターの詳細については、[ログ検索構文][4]のドキュメントを参照してください。

Terraform に関しては、[Datadog 機密データスキャナーグループ][5]のリソースを参照してください。

スキャングループを設定するには:

1. [機密データスキャナー][6]構成ページに移動します。または、**Organization Settings** > **Sensitive Data Scanner** に移動し、**Configuration** をクリックします。
1. **Add scanning group** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Group** を選択します。
1. スキャンしたいデータのクエリーフィルターを入力します。フィルタリングされたスパンをプレビューするには、一番上の **APM Spans** をクリックします。フィルタリングされたログを表示するには、**Logs** をクリックします。
1. グループの名前と説明を入力します。
1. トグルボタンをクリックし、希望する製品 (例: ログ、APM スパン、RUM イベント、Datadog イベント) で機密データスキャナーを有効にします。
1. **Create** をクリックします。

### スキャンルールの追加

スキャンルールは、スキャングループで定義されたデータ内のどの機密情報をマッチングさせるかを決定します。Datadog のスキャンルールライブラリから事前定義されたスキャンルールを追加するか、正規表現パターンを使って独自のルールを作成することができます。データは、処理の中で取り込みが行われる際にスキャンされます。ログの場合、これはインデックス化やその他のルーティング関連の決定の前にスキャンが行われることを意味します。

Terraform に関しては、[Datadog 機密データスキャナールール][7]のリソースを参照してください。

スキャンルールを追加するには:

1. [機密データスキャナー][6]構成ページに移動します。
1. スキャンルールを追加する対象のスキャングループをクリックします。
1. **Add Scanning Rule** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Rule** を選択します。
1. ライブラリルールを追加するか、カスタムスキャンルールを作成するかを選択します。

{{< tabs >}}
{{% tab "ライブラリルールからスキャンルールを追加する" %}}

スキャンルールライブラリには、メールアドレスやクレジットカード番号、API キー、認証トークンなどの一般的なパターンを検出するための、あらかじめ定義されたルールが含まれています。

1. **Add library rules to the scanning group** (スキャングループにライブラリルールを追加する) セクションで、使用したいライブラリルールを選択します。
1. **Define rule target and action** (ルールの対象とアクションを定義する) セクションでは、スキャンする対象が **Entire Event** (イベント全体) か **Specific Attributes** (特定の属性) かを選択します。
    - イベント全体をスキャンする場合、オプションで特定の属性をスキャン対象から除外することができます。
    - 特定の属性をスキャンする場合は、スキャンする属性を指定します。
{{% sds-scanning-rule %}}
1. **Add Rules** をクリックします。

{{% /tab %}}
{{% tab "カスタムスキャンルールを追加する" %}}

正規表現パターンを使用して機密データをスキャンするカスタムスキャンルールを作成できます。

1. **Define match conditions** (一致条件を定義する) セクションの **Define regex** フィールドで、イベントのマッチングに使用する正規表現パターンを指定します。**Regex tester** フィールドにサンプルデータを入力して、正規表現パターンの有効性を検証します。
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
{{% sds-scanning-rule %}}
1. **Add Rule** をクリックします。

{{% /tab %}}
{{< /tabs >}}

**注**:

- 追加または更新するルールは、ルールが定義された後に Datadog に送られるデータにのみ影響します。
- 機密データスキャナーは、Datadog Agent で直接定義するルールには影響しません。
- 機密データスキャナーを完全にオフにするには、各スキャングループおよびスキャンルールのトグルを **off** に設定して無効化します。

機密データの問題をトリアージするための [Summary][9] ページの使い方について、詳しくは[機密データの問題を調査する][8]を参照してください。

### 機密データを含むログへのアクセス制御

機密データを含むログにアクセスできるユーザーを制御するには、機密データスキャナーによって追加されたタグを使用して、ロールベースのアクセス制御 (RBAC) の付いたクエリを作成します。保持期間後にデータが期限切れになるまで、特定の個人またはチームにアクセスを限定できます。詳しくは、[ログ用に RBAC を設定する方法][10]を参照してください。

### タグ内の機密データの秘匿化

タグに含まれる機密データを秘匿化するには、タグを属性に[リマップ[11]してから、その属性を秘匿化する必要があります。リマッピング中にタグが保存されないように、リマッパープロセッサーで `Preserve source attribute` のチェックを外してください。

タグを属性にリマップするには:

1. [ログパイプライン][12]に移動します。
2. **Add Processor** をクリックします。
3. プロセッサーの種類のドロップダウンメニューで **Remapper** を選択します。
4. プロセッサーに名前を付けます。
5. **Tag key(s)** を選択します。
6. タグキーを入力します。
7. タグキーをリマップする属性の名前を入力します。
8. **Preserve source attribute** を無効にします。
9. **Create** をクリックします。

属性を秘匿化するには:

1. [スキャングループ][6]に移動します。
2. **Add Scanning Rule** をクリックします。
3. 使用したいライブラリルールにチェックを入れます。
4. **Scan entire event or portion of it** (イベント全体またはその一部をスキャンする)で **Specific Attributes** を選択します。
5. 予め作成しておいた属性の名前を入力し、スキャンの対象に指定します。
6. マッチングした場合のアクションを選択します。
7. オプションで、タグを追加します。
8. **Add Rules** をクリックします。

## すぐに使えるダッシュボード

機密データスキャナーを有効にすると、[すぐに使えるダッシュボード][13]が自動的にアカウントにインストールされ、機密データの診断結果の要約を見ることができます。このダッシュボードにアクセスするには、**Dashboards > Dashboards List** に移動し、 `Sensitive Data Scanner Overview` を検索します。

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:70%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_security/pci_compliance/
[2]: /ja/account_management/rbac/permissions/#compliance
[3]: /ja/account_management/rbac/
[4]: /ja/logs/explorer/search_syntax/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[8]: /ja/sensitive_data_scanner/investigate_sensitive_data_issues/
[9]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[10]: /ja/logs/guide/logs-rbac/
[11]: /ja/logs/log_configuration/processors/?tab=ui#remapper
[12]: https://app.datadoghq.com/logs/pipelines
[13]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner