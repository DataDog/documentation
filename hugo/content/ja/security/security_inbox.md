---
further_reading:
- link: /security/automation_pipelines/security_inbox
  tag: ドキュメント
  text: Security Inbox のルールに追加
- link: /security/automation_pipelines/set_due_date
  tag: ドキュメント
  text: 期日ルールを設定
- link: /security/cloud_security_management
  tag: ドキュメント
  text: Cloud Security について
- link: /security/code_security/
  tag: ドキュメント
  text: Code Security について
- link: /security/application_security/
  tag: ドキュメント
  text: App and API Protection について
- link: /security/default_rules/#all
  tag: ドキュメント
  text: すぐに使える検出ルール
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: ブログ
  text: Datadog Security Inbox によるセキュリティリスクの優先順位付け方法
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Security Inbox
---
{{< product-availability >}}

Security Inbox は、最も重要なセキュリティ検出結果を 1 つにまとめ、対処可能な事柄のリストとして提示します。Datadog の全セキュリティ製品での検出結果 (脆弱性、誤構成、アイデンティティリスク、攻撃経路) を関連付けてコンテキストを取得し、環境のリスクを最も軽減できる対処法を優先順位付きで 1 つのビューでまとめて表示します。

Security Inbox は、次の 3 つの質問に答えます。

- **チームは次に何に取り組むべきか。**検出結果は、重要度、関連するリスク、影響を受けるリソースおよびサービスの数の順に、これらを基にランク付けされます。
- **期限を過ぎているものは何か。**期日ルールによって修復期限が検出結果に付与されるため、組織が確約する SLA (サービスレベル契約) に対する進捗状況を追跡できます。
- **なぜこの検出結果が Inbox に送信されたのか。**すべての検出結果は、Inbox ルールを使用して Inbox に送られます。デフォルトのルールの確認、組織に適合しないルールの無効化、独自のルールの作成を行えます。

{{< img src="security/security_inbox_8.png" alt="Security Inbox には、重要度、トリアージステータス、修復 SLA の概要とともに、優先順位付けされたセキュリティ検出結果が表示されます。" width="100%">}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">Security Inbox にデータを提供する製品の一部は、このサイトでは利用できません ({{< region-param key="dd_site_name" >}})。Code Security の検出結果は Inbox に送信されず、Linear をチケット発行に利用できません。</div>
{{% /site-region %}}

{{% site-region region="gov2" %}}
<div class="alert alert-danger">Security Inbox にデータを提供する製品の一部は、このサイトでは利用できません ({{< region-param key="dd_site_name" >}})。Code Security および App and API Protection の検出結果は Inbox に送信されません。Linear のチケット発行、Datadog Case Management、および担当者管理も利用できません。</div>
{{% /site-region %}}

## Security Inbox に表示される内容 {#what-appears-in-security-inbox}

Inbox ルールは、Security Inbox に送信される検出結果を制御します。Datadog は、Datadog Security Research チームが作成したデフォルトの Inbox ルールを提供しており、これによって、真のリスクを表す可能性が最も高い検出結果が明らかになります。ユーザーは、これらのルールの確認、個々のルールの無効化、独自のルールの追加を行えます。

ルールは順番に評価されます。各検出結果について、Datadog は上から順にルールをチェックし、一致するものが見つかると停止します。一致するルールがない場合、その検出結果は Inbox に表示されません。

Inbox に表示されるルールを確認するには、Security Inbox フィルターバーの [**Customize inbox**] (Inbox のカスタマイズ) をクリックするか、[**Security**] (セキュリティ) > [**Settings**] (設定) > [**[Findings Automation] (検出結果の自動化)**][24] を選択します。

### サポートされている検出結果タイプ {#supported-finding-types}

Inbox ルールは、以下のいずれかの検出結果タイプと照合できます。

| 検出結果タイプ | ソース |
|---|---|
| [誤構成][2] | Cloud Security |
| [アイデンティティリスク][3] | Cloud Security |
| [攻撃経路][1] | Cloud Security |
| [ホストの脆弱性][14] | Cloud Security |
| [コンテナイメージの脆弱性][14] | Cloud Security |
| [ワークロードアクティビティ][15] | Workload Protection |
| [ライブラリの脆弱性][4] | Code Security |
| [静的コードの脆弱性][16] | Code Security |
| [ランタイムコードの脆弱性][5] | Code Security |
| [Infrastructure as Code][17] | Code Security |
| [シークレット][18] | Code Security |
| [API セキュリティ][19] | App and API Protection |

Security Inbox には、ユーザーが読み取り権限を持つ検出結果タイプのみが表示されます。ユーザーのエクスプローラーで開くことができない検出結果は、Inbox には表示されません。

### 検出されたリスク {#detected-risks}

Security Inbox は、検出結果を評価する際に、以下の検出されたリスクを考慮します。

- **公開されている**: 公開されているリソースは、特に脆弱性や誤構成が含まれている場合に、リスクが高くなります。詳細については、「[Datadog がリソースの公開状況を判断する方法][6]」を参照してください。
- **特権アクセス**: 特権アクセスを持つリソースは、攻撃対象領域を拡大させる可能性のある高い権限を付与するため、リスクが高くなります。
- **攻撃を受けている**: 不審なセキュリティアクティビティが確認されているリソースは、リスクが高くなります。過去 15 日間にセキュリティシグナルが検出されたリソースには、[Under Attack] (攻撃を受けている) というフラグが設定されます。
- **エクスプロイトが存在**: 公開エクスプロイトが存在する脆弱性は、リスクが高くなります。公開エクスプロイトの有無は、[cisa.gov][7]、[exploit-db.com][8]、[nvd.nist.gov][9] などのさまざまなエクスプロイトデータベースで確認されます。
- **本番環境**: 本番環境における脆弱性は、リスクが高くなります。環境は、`env` タグと `environment` タグから計算されます。

## Security Inbox の優先順位付けの仕組み {#how-security-inbox-prioritization-works}

Security Inbox は、まず検出結果の重大度を考慮し、次に関連リスクの数、その次に影響を受けるリソースとサービスの数を考慮して、検出結果をランク付けします。

- **重大度 ([Critical] (重大)、[High] (高)、[Medium] (中)、[Low] (低))**: 重大度は、クラウドの誤構成とアイデンティティリスクについては [Datadog Security スコアリングフレームワーク][10]によって決定され、脆弱性については CVSS 3.1 によって決定されます。
- **検出されたリスクの数**: 2 つの検出結果の重大度が同じ場合、検出されたリスクの数が多いほうの検出結果に高い優先度が付与されます。
- **影響を受けるリソースとサービスの数**: 2 つの検出結果の重大度と検出されたリスクの数が同じ場合、影響を受けるリソースとサービスの数が多いほうの検出結果に高い優先度が付与されます。

**注**: 検出結果のタイプ、検出されたリスク、影響を受けるリソースは、優先順位には影響しません。

## 期日に対して修復状況を追跡する {#track-remediation-against-due-dates}

[期日ルール][12]は、重大度とタイプに基づいて検出結果に修復期限を割り当てます。期日が設定されている場合、Security Inbox の上部にある [**Remediation SLA**] (修復 SLA) カードに、その期日に対する進捗状況が報告されます。

| ステータス | 意味 |
|---|---|
| Overdue (期日超過) | 検出結果の修正期日を過ぎています。|
| Due soon (期日が近い) | 7 日以内に検出結果の期日が訪れます。|
| Not due yet (期日ではない) | 検出結果の期日は 8 日以上先です。|

ステータスをクリックすると、該当する検出結果のみが表示されます。フィルターバーの [**Overdue Status**] (期日超過ステータス) でフィルタリングすることもできます。

その他 2 つのカードには、同じ一連の検出結果の要約が示されます。

- **Severity (重大度)**: [Critical] および [High] の検出結果の数。
- **Status (ステータス)**:
  - **Pending triage (トリアージ保留中)**: チケットがなく、担当者も割り当てられていない検出結果の数。
  - **In flight (処理中)**: 少なくとも 1 つのステータスが割り当てられている検出結果の数。

## 検出結果の調査 {#investigate-findings}

### フィルターとグループ化 {#filter-and-group}

フィルターを適用して、チーム、重大度、検出結果タイプ、サービス、リソースなど、検出結果スキーマ内の任意のファセットで Inbox を絞り込みます。ファセットとして提供されていない属性でフィルタリングするには、[**Edit Filters**] (フィルターの編集) メニューにその名前を入力し、カスタムフィルターとして追加します。

[**Group by**] (グループ化) を使用して、最大 2 つのフィールドで検出結果を一度に集計します。Inbox はデフォルトで検出結果のタイトルによってグループ化されており、根本的な問題が同じであるすべての検出結果が 1 つの行にまとめられています。[**Group by**] を [**None**] (なし) に設定すると、1 行に 1 つずつ検出結果が表示されます。

### 列を変更する {#change-the-columns}

テーブルの上にある歯車アイコンをクリックして、列の追加、削除、または並べ替えを行います。デフォルトの列は、検出結果タイプ、タイトル、重大度、リスク、リソース、およびトリアージステータスです。

<div class="alert alert-info">列オプションは、グループ化されていないテーブル、および展開されたグループ内のテーブルで使用できます。グループ化されたビューの外側のテーブルでは使用できません。</div>

### 保存ビュー{#saved-views}

現在のフィルター、グループ化、および列の組み合わせを保存ビューとして保存すると、後でそのビューに戻ることや、チームとビューを共有することができます。保存ビューは、[**Views**] (ビュー) サイドバーに一覧表示されます。

### エクスポート {#export}

テーブルの上にある [**Export**] (エクスポート) をクリックすると、検出結果を他のツールにエクスポートできます。

- **[Export to Sheets] (Sheets にエクスポート)**: 検出結果を [Datadog Sheets][21] に送信して、さらに詳しい調査や報告を行います。
- **[Open in DDSQL Editor] (DDSQL エディターで開く)**: 複雑な集計やカスタム分析を行うために、[DDSQL エディター][22]で同等のクエリを開きます。
- **[Download as CSV] (CSV としてダウンロード)**: 検出結果を CSV ファイルとしてダウンロードします。
- **[Copy as cURL] (cURL としてコピー)**: 同等の API リクエストをクリップボードにコピーします。

## トリアージと修復{#triage-and-remediate}

[**Triage**] (トリアージ) 列には、単一の検出結果に対するアクションが示されます。[**Assign**] (割り当て) をクリックして[担当者][23]を設定するか、[**Add Ticket**] (チケットを追加) をクリックして、テーブルを離れることなくチケットを作成またはリンクします。

複数の検出結果に対して一度にアクションを実行するには、それらを選択して以下を使用します。

- **[Ticketing] (チケット発行)**: 選択した検出結果に対して、Jira の課題、ServiceNow のインシデント、Linear の課題、または Datadog セキュリティケースを作成するか、既存のものをリンク解除します。セットアップおよび双方向同期については、「[チケット連携][20]」を参照してください。
- **[Assignee] (担当者)**: 選択した検出結果の[担当者][23]を設定または設定解除します。
- **[Muting] (ミュート)**: 評価および承認済みの検出結果をミュートします。
- **[Severity]**: 選択した検出結果の重大度を調整します。

一括選択は、グループ化されていないテーブルおよび展開されたグループ内で使用できます。検出結果をクリックするとサイドパネルが開き、その検出タイプに関する詳細な検出内容と修復ガイダンスが表示されます。

## Inbox について報告する {#report-on-your-inbox}

[**Reporting**] (報告) タブには、Security Inbox の傾向を経時的に示すダッシュボードが表示されるため、検出と同程度の速度で修復が行われているかを追跡できます。

## セキュリティコンテキストマップを使用して脆弱性を特定して修復する {#use-the-security-context-map-to-identify-and-mitigate-vulnerabilities}

[攻撃経路](#supported-finding-types)のセキュリティコンテキストマップには、潜在的な侵害箇所を特定して対処するために利用できる、包括的なビューが示されます。このビューには、攻撃者に悪用される可能性がある、相互に関連する誤構成、権限のギャップ、脆弱性が示されます。

主な機能には以下のものがあります。

- **リスク評価**: このマップにより、セキュリティチームは脆弱性や誤構成が及ぼすより広範な影響を評価できます。これには、アクセスパスや権限などのセキュリティポリシーを更新する必要があるかどうかの評価や、露出によるコンプライアンスへの影響 (特に影響範囲内にリスクに晒されている機密データがある場合) の把握が含まれます。
- **即時に対応するための実用的なコンテキスト**: マップにはサービス所有者情報やその他の関連コンテキストが含まれているため、チームは情報に基づいたリアルタイムの意思決定を行うことができます。チームは、ツールを切り替えることなく、統合されたワークフローの実行、セキュリティ問題のリンクの共有、リソースの AWS コンソールビューへのアクセスを行うことで、マップから直接アクションを実行できるため、効率的な修復が可能になります。

{{< img src="security/security_context_map.png" alt="重大な誤構成がある、一般アクセス可能な AWS EC2 インスタンスが示されているセキュリティコンテキストマップ" width="100%">}}

## Security Inbox のカスタマイズ {#customize-security-inbox}

[自動化パイプライン][13]を使用すると、何が Inbox に送信されるか、および各検出結果の修復期限はいつかを構成できます。自動化を使用して、以下のことを行います。

- **デフォルトでキャプチャされない検出結果を再表示する**: カスタムルールを使用してデフォルトルールでは一致しない検出結果を強調し、重要な検出結果が見落とされないようにします。
- **コンプライアンスを強化し、主要なシステム上の懸念に対処する**: 重要度に関係なく、規制コンプライアンスや重要なビジネスシステムに影響を与える懸念事項に対処します。
- **現在のリスクに優先順位を付ける**: インシデント発生後のアイデンティティリスクや業界全体の脆弱性など、差し迫った脅威に集中的に対応します。
- **修復期限を適用する**: 重大度に応じて期限を設定し、チーム全員が期限を過ぎた作業を確認できるようにします。

詳細については、「[Security Inbox のルールに追加][11]」および「[期日ルールを設定][12]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/?category=all#all
[2]: /ja/security/cloud_security_management/misconfigurations/
[3]: /ja/security/cloud_security_management/identity_risks/
[4]: /ja/security/code_security/software_composition_analysis
[5]: /ja/security/code_security/iast
[6]: /ja/security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /ja/security/cloud_security_management/severity_scoring/#cloud-security-severity-scoring-framework
[11]: /ja/security/automation_pipelines/security_inbox
[12]: /ja/security/automation_pipelines/set_due_date
[13]: /ja/security/automation_pipelines/
[14]: /ja/security/cloud_security_management/vulnerabilities/
[15]: /ja/security/workload_protection/
[16]: /ja/security/code_security/static_analysis/
[17]: /ja/security/code_security/iac_security/
[18]: /ja/security/code_security/secret_scanning/
[19]: /ja/security/application_security/api_posture/
[20]: /ja/security/ticketing_integrations/
[21]: /ja/sheets/
[22]: /ja/ddsql_editor/
[23]: /ja/security/assignee_management/
[24]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox