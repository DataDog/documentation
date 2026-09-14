---
aliases:
- /ja/account_management/org_settings/sensitive_data_detection
- /ja/sensitive_data_scanner/
description: Sensitive Data Scannerを使用すると、Datadogのログ、APMスパン、RUMイベント、Agent Observabilityトレース、イベント、およびAmazon
  S3バケット全体で、PII、認証情報、クレジットカード番号などの機密データを検出、分類し、必要に応じてマスクできます。
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: ドキュメント
  text: テレメトリデータ用のSensitive Data Scannerをセットアップする
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: ドキュメント
  text: クラウドストレージ用のSensitive Data Scannerをセットアップする
- link: coterm
  tag: ドキュメント
  text: CoTerm：ローカルおよびリモートシステムでのターミナルセッションと機密アクティビティを監視する
- link: /data_security/
  tag: ドキュメント
  text: データ関連リスクの低減
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: ブログ
  text: Sensitive Data Scannerを使用して、機密データの問題を大規模に検出、トリアージし、修正できます。
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: ブログ
  text: DatadogのSensitive Data Scannerで最新のデータコンプライアンス戦略を構築する
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: ブログ
  text: 機密データ管理のベストプラクティス
- link: https://www.datadoghq.com/blog/data-security/
  tag: ブログ
  text: Data Securityを使用してクラウドデータストア内の機密データを検出する
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: ブログ
  text: HIPAA要件の対象となる企業がDatadogで機密データを管理する方法
- link: https://www.datadoghq.com/blog/sds-dlp-for-financial-service-companies/
  tag: ブログ
  text: 金融サービス企業がDatadogで機密データを検出、分類、管理する方法
- link: https://www.datadoghq.com/blog/sds-for-insurance-companies/
  tag: ブログ
  text: 保険会社がDatadogで機密データのリスクを検出、分類し、対処する方法
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: ブログ
  text: Datadog LLM ObservabilityでStrands Agentsのワークフローを可視化する
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability PipelinesでMSSPのログ収集と集約を簡素化する
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: ブログ
  text: Datadog Cloud Securityでグローバルなフレームワーク全体にわたってコンプライアンスを拡張する
title: Sensitive Data Scanner
---
## 概要 {#overview}

クレジットカード番号、APIキー、IPアドレス、個人識別情報（PII）などの機密データは、意図せず漏洩することが多く、組織がセキュリティやコンプライアンスのリスクにさらされる可能性があります。機密データは以下に含まれている可能性があります。
 
- APMスパン
- コードリポジトリ
- イベント管理からのイベント
- Agent Observabilityトレース
- RUMイベント
- テレメトリデータ（アプリケーションログなど）

エンジニアリングチームがワークロードをクラウドに移行する際、機密データが意図せずクラウドストレージリソースに移動してしまう可能性があります。DatadogのSensitive Data Scannerは、機密データの検出、分類、およびオプションでのマスクを行うことで、機密データの漏洩を防ぎ、コンプライアンス違反のリスクを制限するのに役立ちます。

**注**: DatadogのツールとポリシーはPCI v4.0に準拠しています。詳細については、[PCI DSSコンプライアンス][1]を参照してください。

## サポートされているデータソース {#supported-data-sources}

Sensitive Data Scannerは、テレメトリデータ（ログ、APMスパン、RUMイベント、イベント）、Agent Observabilityトレース、クラウドストレージ、コードリポジトリをスキャンします。

一致した機密データに適用できるアクションは、データソースによって異なります。次の表は、各テレメトリソースおよびAgent Observabilityでサポートされているマスクアクションを示しています。

| アクション           | ログ | APM | RUM | イベント | Agent Observability |
|------------------|------|-----|-----|--------|---------------------|
| マスク           | はい  | はい | はい | はい    | はい                 |
| 部分マスク | はい  | はい | はい | はい    | はい                 |
| ハッシュ化             | はい  | はい | はい | はい    | はい                 |
| マスク             | はい  | はい | はい | いいえ     | いいえ                  |

<div class="alert alert-info">クラウドストレージおよびコードリポジトリ（シークレットスキャン）の場合、Sensitive Data Scannerは機密データを検出できますが、マスクアクションを適用することはできません。</div>

### テレメトリーデータ {#telemetry-data}

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="5つの異なる機密情報が検出されました。そのうち2つは優先度が高く、1つは中程度、2つは情報レベルです。" style="width:100%;" >}}

Sensitive Data Scannerは、[クラウド内](#in-the-cloud)または[お客様の環境内](#in-your-environment)のデータをスキャンできます。

#### クラウド内  {#in-the-cloud}

クラウド上のSensitive Data Scannerを使用する場合、ログとイベントをDatadogバックエンドに送信するため、データはマスクされる前に環境外へ送信されます。ログとイベントは処理中にDatadogバックエンドでスキャンおよびマスクされるため、機密データはイベントがインデックス化されDatadog UIに表示される前にマスクされます。

スキャンおよびマスク可能なデータは以下の通りです。

- **ログ**: ログメッセージや属性値を含む、すべての構造化および非構造化ログコンテンツ
- **APM**: スパン属性値のみ
- **RUM**: イベント属性値のみ
- **イベント**: イベント属性値のみ

オプションで、各製品のサンプリングレートを10%から99%の間で設定できます。これは、機密情報のスキャン対象となるデータ量を削減することで、利用開始時のコスト管理に役立ちます。

各[スキャンルール][17]について、一致した機密データに対して以下のいずれかのアクションを適用できます。

- **マスク**: 一致したデータ全体を、`[sensitive_data]`のように選択した単一のトークンに置き換えます。
- **部分マスク**: 一致するすべての値の特定の箇所を置き換えます。
- **ハッシュ化**: 一致したデータ全体を、不可逆な一意の識別子に置き換えます。
- **マスク** (ログ、APMスパン、RUMイベントで利用可能): 一致するすべての値をマスクします。`Data Scanner Unmask`権限を持つユーザーは、Datadogでこのデータをマスク解除して表示できます。詳細については、[マスクアクション][16]を参照してください。

**注**：サンプリングされたデータをスキャンする場合、スキャン対象のデータをマスクするアクションを選択することはできません。

Sensitive Data Scannerを使用するには、スキャン対象のデータを定義するスキャングループを設定し、データ内で一致させる機密情報を決定するスキャンルールを設定します。スキャンルールについては、以下のことができます。
- Datadogの[スキャンルールライブラリ][2]から定義済みのスキャンルールを追加します。これらのルールは、メールアドレス、クレジットカード番号、APIキー、認証トークン、ネットワークおよびデバイス情報などの一般的なパターンを検出します。
- [正規表現パターンを使用して独自のルールを作成します][3]。

設定の詳細については、[テレメトリデータ用のSensitive Data Scannerの設定][4]を参照してください。

#### 環境内 {#in-your-environment}

[Observability Pipelines][5]を使用して環境内のログを収集および処理し、そのデータをダウンストリームのインテグレーションにルーティングします。Observability Pipelinesでパイプラインを設定する際、[Sensitive Data Scannerプロセッサ][6]を追加することで、ログが組織外に送信される前に機密データをマスキングできます。メールアドレス、クレジットカード番号、APIキー、認証トークン、IPアドレスなど、ルールライブラリから定義済みのスキャンルールを追加できます。正規表現パターンを使用して独自のルールを作成することもできます。

詳細については、[パイプラインの設定][7]を参照してください。

### Agent Observability {#agent-observability}

Sensitive Data Scannerは、LLMアプリケーションの入出力を含む[Agent Observability][20]トレースをスキャンできます。これにより、プロンプト、補完、LLMワークフローのメタデータにおいて、PII、APIキー、独自の機密情報などが公開されるのを防ぐことができます。

Agent Observabilityのスキャンでは、テレメトリデータスキャンとは異なる管理構成モデルが使用されます。Agent Observabilityのスキャンには以下が含まれます。

- **1つの管理スキャングループ**：[Agent Observability設定ページ][18]に初めてアクセスすると、組織のデフォルトのスキャングループが自動的に作成されます。追加のスキャングループを作成したり、管理グループを削除したりすることはできません。
- **カスタマイズ可能なルール**：既存のルールを変更したり、不要なルールを無効にしたり、カスタムスキャンルールを追加して追加の機密データパターンを検出したりできます。

各スキャンルールについて、一致した機密データに対して以下のいずれかのアクションを適用できます。

- **マスク**: 一致したデータ全体を、選択した単一のトークン（例：`[sensitive_data]`）に置き換えます。
- **Partially redact**: すべての一致する値の特定の部分を置き換えます。
- **Hash**: 一致したデータ全体を、不可逆な一意の識別子に置き換えます。

Agent Observabilityデータのスキャンを設定するには、Sensitive Data Scanner設定の[Agent Observability 設定ページ][18]にアクセスします。Agent Observabilityの詳細については、[Agent Observability ドキュメント][20]を参照してください。

### クラウドストレージ {#cloud-storage}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="Findingsページのデータストアセクション（Amazon S3の検出結果3件）" style="width:100%;" >}}

Sensitive Data Scannerが有効になっている場合、Amazon S3バケット内の機密データをカタログ化および分類できます。**注**: Sensitive Data Scannerは、クラウドストレージリソース内の機密データをマスクしません。

Sensitive Data Scannerは、クラウド環境に[Agentless scanners][8]をデプロイすることで機密データをスキャンします。これらのスキャンインスタンスは、[Remote Configuration][9]を通じてすべてのS3バケットのリストを取得し、CSVやJSONなどのテキストファイルを時間をかけてスキャンするように指示が設定されています。

Sensitive Data Scannerは、[entire rules library][10]を活用して一致を見つけます。一致が見つかると、その場所がスキャンインスタンスによってDatadogに送信されます。**注**: データストアとそのファイルは環境内でのみ読み取られます。スキャンされた機密データがDatadogに送信されることはありません。

Sensitive Data Scannerは、機密データの一致を表示するだけでなく、機密データストアに影響を与える[Cloud Security][11]が検出したセキュリティ問題も表示します。問題をクリックすると、Cloud Security内でトリアージと修復を継続できます。

設定の詳細については、[Set up Sensitive Data Scanner for Cloud Storage][12]を参照してください。

### コードリポジトリ {#code-repositories}

Datadog [Secret Scanning][21]は、コードリポジトリをスキャンして、ソースコード内で公開されているシークレットを検出します。Secret Scanningは、Sensitive Data Scannerによって動作し、SDSライブラリの[Secrets and credentials category][19]のすべてのルールを使用して一致を検出します。

Secret Scanningは、テレメトリデータスキャンとは異なり、CI/CDパイプライン内またはホスト型スキャン（GitHub、Azure DevOps、GitLabがサポート）を用いてDatadog内で直接動作します。コード内でシークレットが検出されると、検出結果がCode Securityインターフェースに表示されます。

設定の詳細については、[Secret Scanning documentation][21]を参照してください。

## 主な機能 {#key-capabilities}

### 機密データの検出結果を調査する {#investigate-sensitive-data-findings}

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="ルールごとにグループ化されたSensitive Data Scannerの検出結果エクスプローラーで、US Passport Scannerルールが展開され、重大な検出結果、一致数、週次トレンドチャートが表示されています。" style="width:100%;" >}}

「Findings」ページ[13]を使用して、スキャンルールによって特定された機密データの検出結果の詳細を確認できます。これらの詳細には以下が含まれます。

- 一致を検出した特定のスキャンルール。これにより、必要に応じてどのルールを変更すべきかを判断できます。
- 検出が発生したスキャングループ。これにより、漏洩の被害範囲を判断できます。
- 検出に関連付けられたイベント数。これにより、範囲と深刻度を評価するのに役立ちます。
- 検出に関連付けられたイベントのグラフ。これにより、検出がいつ開始され、どのように進行したかを特定するのに役立ちます。
- 検出に対して作成された関連ケース。

「Findings」ページを使用して機密データのトリアージを行う方法の詳細については、[Investigate Sensitive Data Findings][14]を参照してください。

### 機密データの傾向を確認します。{#review-sensitive-data-trends}

{{<img src="sensitive_data_scanner/sdslight.png" alt="「Sensitive Data Scanner」概要ダッシュボード" style="width:80%;">}}

「Sensitive Data Scanner」を有効にすると、機密データの検出結果をまとめた「標準ダッシュボード」[15]がアカウントに自動的にインストールされます。このダッシュボードにアクセスするには、{{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Dashboards List{{< /ui >}}に移動し、「Sensitive Data Scanner Overview」を検索してください。

## さらに読む{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_security/pci_compliance/
[2]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: /ja/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /ja/security/sensitive_data_scanner/setup/telemetry_data/
[5]: /ja/observability_pipelines/
[6]: /ja/observability_pipelines/processors/sensitive_data_scanner
[7]: /ja/observability_pipelines/configuration/set_up_pipelines/
[8]: /ja/security/cloud_security_management/setup/agentless_scanning
[9]: /ja/remote_configuration
[10]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[11]: /ja/security/cloud_security_management
[12]: /ja/security/sensitive_data_scanner/setup/cloud_storage/
[13]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[14]: /ja/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[15]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[16]: /ja/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action
[17]: /ja/security/sensitive_data_scanner/scanning_rules/
[18]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[19]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[20]: /ja/llm_observability/
[21]: /ja/security/code_security/secret_scanning/