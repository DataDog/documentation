---
title: Sensitive Data Scanner
aliases:
    - /logs/log_configuration/sensitive_data_detection
    - /account_management/org_settings/sensitive_data_detection
further_reading:
    - link: /data_security/
      tag: Documentation
      text: Reducing data related risks
    - link: /sensitive_data_scanner/regular_expression_syntax
      tag: Documentation
      text: Regular expression syntax for custom scanning rules
    - link: "https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/"
      tag: Blog
      text: Discover, triage, and remediate sensitive data issues at scale with Sensitive Data Scanner
    - link: "https://www.datadoghq.com/blog/sensitive-data-scanner/"
      tag: Blog
      text: Build a modern data compliance strategy with Datadog's Sensitive Data Scanner
    - link: "https://www.datadoghq.com/blog/sensitive-data-management-best-practices/"
      tag: Blog
      text: Best practices for sensitive data management
---

## 概要

クレジットカード番号、銀行コード、API キーなどの機密データは、アプリケーションログ、APM スパン、RUM イベントで意図せずに公開されることが多く、組織が財務リスクやプライバシーリスクにさらされる可能性があります。

機密データスキャナーは、ストリームベースのパターンマッチングサービスで、機密データの特定、タグ付け、オプションで秘匿化やハッシュ化に使用されます。セキュリティおよびコンプライアンスチームは、機密データスキャナーを新たな防御策として導入し、機密データの漏洩防止とコンプライアンス違反リスクの抑制に役立てることができます。

機密データスキャナーを使用するためには、まずスキャングループを設定してスキャン対象のデータを定義し、次にスキャンルールを設定してデータ内でマッチングさせる機密情報を決定します。

このドキュメントでは、以下について説明します。

- The permissions required to view and set up Sensitive Data Scanner.
- Setting up scanning for sensitive data.
- Using the out-of-the-box dashboard.

**注**: PCI 準拠の Datadog 組織のセットアップに関する情報については、[PCI DSS 準拠][1]を参照してください。

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="12 個のアクティブなスキャングループのうち 6 個が表示されている機密データスキャナーページ" style="width:90%;">}}

## 機密データスキャナーの設定


There are two locations where you can redact your sensitive data:

**In the cloud:**

- With **Sensitive Data Scanner in the Cloud**, you submit your logs in the Datadog backend. In this method, logs leave your premises before they are redacted. You can have multiple scanning groups per organization, and you can create custom scanning rules. You can also redact sensitive data in tags.

**In your environment:**

{{< callout url="https://www.datadoghq.com/private-beta/sensitive-data-scanner-using-agent-in-your-premises/" >}}
  Sensitive Data Scanner using the Agent is in private beta. To request access, fill out this form.
{{< /callout >}}

- With **Sensitive Data Scanner using the Agent**, Datadog redacts your logs before submitting them to the Datadog backend, and unredacted logs never need to leave your premises. With this method, you are limited to one scanning group per organization, and you can use only predefined library rules.

- Another way to redact your sensitive data in your environment before shipping to your downstream destinations is by using [Observability Pipelines][14].

### 前提条件

{{< tabs >}}
{{% tab "In the Cloud" %}}
By default, users with the Datadog Admin role have access to view and set up scanning rules. To allow other users access, grant the `data_scanner_read` or `data_scanner_write` permissions under [Compliance][1] to a custom role. See [Access Control][2] for details on how to set up roles and permissions.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="The compliance permissions sections showing data scanner read and writer permissions" style="width:80%;">}}

[1]: /account_management/rbac/permissions/#compliance
[2]: /account_management/rbac/
{{% /tab %}}
{{% tab "Using the Agent" %}}

1. Grant appropriate permissions. By default, users with the Datadog Admin role have access to view and set up scanning rules. To allow other users access, grant the `data_scanner_read` or `data_scanner_write` permissions under [Compliance][1] to a custom role. See [Access Control][2] for details on how to set up roles and permissions.

    {{< img src="sensitive_data_scanner/read_write_permissions.png" alt="The compliance permissions sections showing data scanner read and writer permissions" style="width:80%;">}}
2. Follow the steps to [enable remote configuration][3].
3. Install the Datadog Agent v7.54 or newer.

[1]: /account_management/rbac/permissions/#compliance
[2]: /account_management/rbac/
[3]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
{{% /tab %}}
{{< /tabs >}}

### スキャングループの追加

{{< tabs >}}
{{% tab "In the Cloud" %}}
A scanning group determines what data to scan. It consists of a query filter and a set of toggles to enable scanning for logs, APM, RUM, and events. See the [Log Search Syntax][2] documentation to learn more about query filters.

For Terraform, see the [Datadog Sensitive Data Scanner group][3] resource.

To set up a scanning group, perform the following steps:

1. Navigate to the [Sensitive Data Scanner][1] configuration page.
1. **Add scanning group** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Group** を選択します。
1. スキャンしたいデータのクエリーフィルターを入力します。フィルタリングされたスパンをプレビューするには、一番上の **APM Spans** をクリックします。フィルタリングされたログを表示するには、**Logs** をクリックします。
1. グループの名前と説明を入力します。
1. トグルボタンをクリックし、希望する製品 (例: ログ、APM スパン、RUM イベント、Datadog イベント) で機密データスキャナーを有効にします。
1. **Create** をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[2]: /logs/explorer/search_syntax/
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
{{% /tab %}}
{{% tab "Using the Agent" %}}
<div class="alert alert-warning"><strong>Note</strong>: Sensitive Data Scanner using the Agent supports only one scanning group per organization.</div>

A scanning group determines what logs to scan. It consists of a query filter to match eligible agents based on host tags.

To set up a scanning group, perform the following steps:

1. Navigate to the [Sensitive Data Scanner using the Agent][1] configuration page.
1. **Add scanning group** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Group** を選択します。
1. Enter a query filter for the data you want to scan. You can use only host-level tags for matching agents. At the bottom, the number of matching and eligible agents is displayed, including the total number out of all agents that match the tag.
1. グループの名前と説明を入力します。
1. **Save** をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
[2]: /logs/explorer/search_syntax/
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
{{% /tab %}}
{{< /tabs >}}

By default, a newly-created scanning group is disabled. To enable a scanning group, click the corresponding toggle on the right side.

### スキャンルールの追加

{{< tabs >}}
{{% tab "In the Cloud" %}}
A scanning rule determines what sensitive information to match within the data defined by a scanning group. You can add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules using regex patterns. The data is scanned at ingestion time during processing. For logs, this means the scan is done before indexing and other routing decisions.

For Terraform, see the [Datadog Sensitive Data Scanner rule][2] resource.

To add scanning rules, perform the following steps:

1. Navigate to the [Sensitive Data Scanner][1] configuration page.
1. スキャンルールを追加する対象のスキャングループをクリックします。
1. **Add Scanning Rule** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Rule** を選択します。
1. ライブラリルールを追加するか、カスタムスキャンルールを作成するかを選択します。

{{< collapse-content title="Add scanning rule from the library rules" level="p" >}}

スキャンルールライブラリには、メールアドレスやクレジットカード番号、API キー、認証トークンなどの一般的なパターンを検出するための、あらかじめ定義されたルールが含まれています。

1. **Add library rules to the scanning group** (スキャングループにライブラリルールを追加する) セクションで、使用したいライブラリルールを選択します。
1. **Define rule target and action** (ルールの対象とアクションを定義する) セクションでは、スキャンする対象が **Entire Event** (イベント全体) か **Specific Attributes** (特定の属性) かを選択します。
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned.
    - If you are scanning specific attributes, specify which attributes you want to scan.
{{% sds-scanning-rule %}}
1. **Add Rules** をクリックします。

{{< /collapse-content >}} 
{{< collapse-content title="Add a custom scanning rule" level="p" >}}
You can create custom scanning rules using regex patterns to scan for sensitive data.

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
{{< /collapse-content >}} 

**注**:

- Any rules that you add or update affect only data coming into Datadog after the rule was defined.
- 機密データスキャナーは、Datadog Agent で直接定義するルールには影響しません。
- After rules are added, ensure that the toggles for your scanning groups are enabled to begin scanning.

See [Investigate Sensitive Data Issues][3] for details on how to use the [Summary][4] page to triage your sensitive data issues.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[3]: /sensitive_data_scanner/investigate_sensitive_data_issues/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary

{{% /tab %}}
{{% tab "Using the Agent" %}}

A scanning rule determines what sensitive information to match within the data defined by a scanning group. The Datadog Agent scans your data in your local environment during log collection, before logs are sent to the Datadog platform.

<div class="alert alert-warning"><strong>Note</strong>: Sensitive Data Scanner using the Agent supports only predefined scanning rules from Datadog's Scanning Rule Library. The total number of scanning rules is limited to 20.</div>

To add scanning rules, perform the following steps:

1. Navigate to the [Sensitive Data Scanner using the Agent][1] configuration page.
1. **Add Scanning Rule** をクリックします。または、ページ右上にある **Add** ドロップダウンメニューをクリックし、**Add Scanning Rule** を選択します。
1. In the **Add library rules to the scanning group** section, select the library rules you want to use. Use the **Filter library rules** input to search existing library rules. Next to the rule name you can find the list of predefined tags for each rule.
1. In the **Define rule target and action** section, select the action that you want to take for the matched sensitive information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - **Redact**: 一致するすべての値を **Replacement text** フィールドで指定したテキストに置換します。
    - **Partially Redact**: 一致するすべてのデータの指定した部分を置換します。**Redact** セクションでは、編集する文字数と、一致するデータのどの部分を編集するかを指定します。
    - **Hash**: 一致するすべてのデータを一意の識別子に置換します。マッチの UTF-8 バイトは FarmHash の 64 ビットフィンガープリントでハッシュされます。
1. Optionally, add additional tags you want to associate with events where the values match the specified regex pattern. Datadog adds `sensitive_data` and `sensitive_data_category` tags by default. These tags can then be used in searches, dashboards, and monitors. See [Control access to logs with sensitive data](#control-access-to-logs-with-sensitive-data) for information on how to use tags to determine who can access logs containing sensitive information.
1. **Save** をクリックします。

**注**:

- Any rules that you add or update affect only data coming into Datadog after the rule was defined.
- After rules are added, ensure that the toggles for your scanning groups are enabled to begin scanning.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
{{% /tab %}}
{{< /tabs >}}

### Edit scanning rules

{{< tabs >}}
{{% tab "In the Cloud" %}}

1. Navigate to the [Sensitive Data Scanner][1] configuration page.
1. Hover over the scanning rule you want to edit and click the **Edit** (pencil) icon.

   The **Define match conditions** section shows either the regular expression you wrote for your custom rule or an explanation of the library scanning rule you chose along with examples of matched sensitive information.
1. To make sure that a rule matches your data, you can provide a sample in the **Add sample data** section. If the rule finds matches in the sample data, a green **Match** label appears next to the input field.
1. Under **Create keyword dictionary**, you can add keywords to refine detection accuracy. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`.
1. Choose the number of characters before a match that the keyword must appear in. By default, keywords must be within 30 characters before a match.
1. Optionally, under **Define rule target and action**, edit the tags that you want to associate with events where the values match the rule. Datadog recommends using `sensitive_data` and `sensitive_data_category` tags, which can be used in searches, dashboards, and monitors. See [Control access to logs with sensitive data](#control-access-to-logs-with-sensitive-data) for information on how to use tags to determine who can access logs that contain sensitive data.
1. For **Set priority level**, choose a value based on your business needs.
1. **Update** をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "Using the Agent" %}}

1. Navigate to the [Sensitive Data Scanner using the Agent][1] configuration page.
1. Hover over the scanning rule you want to edit and click the **Edit** (pencil) icon.

   The **Define match conditions** section shows an explanation of the library scanning rule you chose along with examples of matched sensitive information.
1. Under **Create keyword dictionary**, you can add keywords to refine detection accuracy. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`.
1. Choose the number of characters before a match that the keyword must appear in. By default, keywords must be within 30 characters before a match.
1. **Save** をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}


### 機密データを含むログへのアクセス制御

機密データを含むログにアクセスできるユーザーを制御するには、機密データスキャナーによって追加されたタグを使用して、ロールベースのアクセス制御 (RBAC) の付いたクエリを作成します。保持期間後にデータが期限切れになるまで、特定の個人またはチームにアクセスを限定できます。詳しくは、[ログ用に RBAC を設定する方法][10]を参照してください。

### タグ内の機密データの秘匿化

{{< tabs >}}
{{% tab "In the Cloud" %}}
To redact sensitive data contained in tags, you must [remap][2] the tag to an attribute and then redact the attribute. Uncheck `Preserve source attribute` in the remapper processor so that the tag is not preserved during the remapping.

タグを属性にリマップするには:

1. Navigate to your [log pipeline][3].
2. **Add Processor** をクリックします。
3. プロセッサーの種類のドロップダウンメニューで **Remapper** を選択します。
4. プロセッサーに名前を付けます。
5. **Tag key(s)** を選択します。
6. タグキーを入力します。
7. タグキーをリマップする属性の名前を入力します。
8. **Preserve source attribute** を無効にします。
9. **Create** をクリックします。

属性を秘匿化するには:

1. Navigate to your [scanning group][1].
2. **Add Scanning Rule** をクリックします。
3. 使用したいライブラリルールにチェックを入れます。
4. **Scan entire event or portion of it** (イベント全体またはその一部をスキャンする)で **Specific Attributes** を選択します。
5. 予め作成しておいた属性の名前を入力し、スキャンの対象に指定します。
6. マッチングした場合のアクションを選択します。
7. Optionally, add tags.
8. **Add Rules** をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[2]: /logs/log_configuration/processors/?tab=ui#remapper
[3]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "Using the Agent" %}}
This functionality is not available for Sensitive Data Scanner using the Agent.
{{% /tab %}}
{{< /tabs >}}

## データセキュリティ

<div class="alert alert-warning">Data Security is in private beta. To enroll in the private beta, <a href="https://www.datadoghq.com/private-beta/data-security">sign up here</a>.</div>

If you have [Sensitive Data Scanner][8] and [Cloud Security Management][16] enabled, you can use Data Security to locate sensitive data and fix security issues impacting AWS S3 buckets and RDS instances.

Data Security scans for sensitive data by deploying [Agentless scanners][17] in your cloud environments. These scanning instances retrieve a list of all S3 buckets and RDS instances through [Remote Configuration][18], and have set instructions to scan text files—such as CSVs and JSONs—and tables in every datastore over time. Data Security leverages rules provided by Sensitive Data Scanner to find matches. When a match is found, the location of the match is sent to Datadog by the scanning instance. Datastores and their files are only read in your environment—no sensitive data is sent back to Datadog.

Along with displaying sensitive data matches, Data Security surfaces any security issues detected by Cloud Security Management affecting the sensitive datastores. You can click any issue to continue triage and remediation within Cloud Security Management.

## すぐに使えるダッシュボード

When Sensitive Data Scanner is enabled, an [out-of-the-box dashboard][13] summarizing sensitive data findings is automatically installed in your account. To access this dashboard, go to **Dashboards > Dashboards List** and search for "Sensitive Data Scanner Overview".

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

## Disable Sensitive Data Scanner

To turn off Sensitive Data Scanner entirely, set the toggle to **off** for each Scanning Group so that they are disabled.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_security/pci_compliance/
[2]: /account_management/rbac/permissions/#compliance
[3]: /account_management/rbac/
[4]: /logs/explorer/search_syntax/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[8]: /sensitive_data_scanner/investigate_sensitive_data_issues/
[9]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[10]: /logs/guide/logs-rbac/
[11]: /logs/log_configuration/processors/?tab=ui#remapper
[12]: https://app.datadoghq.com/logs/pipelines
[13]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[14]: /observability_pipelines/sensitive_data_redaction/
[16]: /security/cloud_security_management
[17]: /security/cloud_security_management/setup/agentless_scanning
[18]: /agent/remote_config
