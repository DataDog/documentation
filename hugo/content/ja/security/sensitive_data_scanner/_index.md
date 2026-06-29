---
aliases:
- /ja/account_management/org_settings/sensitive_data_detection
- /ja/sensitive_data_scanner/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: ドキュメント
  text: テレメトリーデータ用に Sensitive Data Scanner をセットアップする
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: ドキュメント
  text: クラウドストレージ用に Sensitive Data Scanner をセットアップする
- link: coterm
  tag: ドキュメント
  text: 'CoTerm: ローカルおよびリモートシステム上のターミナルセッションと機密アクティビティを監視する'
- link: /data_security/
  tag: ドキュメント
  text: データ関連リスクの低減
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: ブログ
  text: Sensitive Data Scanner で、機密データの問題を大規模に発見し、トリアージし、修復する
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: ブログ
  text: Datadog の Sensitive Data Scanner で最新のデータコンプライアンス戦略を構築する
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: ブログ
  text: 機密データ管理のベストプラクティス
- link: https://www.datadoghq.com/blog/data-security/
  tag: ブログ
  text: Data Security でクラウドデータストア内の機密データを発見
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: ブログ
  text: HIPAA 要件の対象となる企業が Datadog で機密データを管理する方法
- link: https://www.datadoghq.com/blog/sds-dlp-for-financial-service-companies/
  tag: ブログ
  text: 金融サービス企業が Datadog を使って機密データを検出、分類、および管理する方法
- link: https://www.datadoghq.com/blog/sds-for-insurance-companies/
  tag: ブログ
  text: 保険会社が Datadog を使って機密データのリスクを検出、分類、および対処する方法
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: ブログ
  text: Datadog LLM Observability を使用して Strands Agents のワークフローを可視化する
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability Pipelines で MSSP のログ収集と集計を簡素化する
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: ブログ
  text: Datadog Cloud Security でグローバルなフレームワーク全体にコンプライアンスを拡張
title: Sensitive Data Scanner
---
## 概要 {#overview}

クレジットカード番号、API キー、IP アドレス、個人を特定できる情報 (PII) などの機密データは、意図せず漏洩してしまうことが多く、組織にセキュリティおよびコンプライアンス上のリスクをもたらす可能性があります。機密データは次のものに含まれていることがあります。
 
- APM スパン
- コードリポジトリ
- Event Management からのイベント
- LLM Observability トレース
- RUM イベント
- アプリケーションログなどのテレメトリーデータ

また、エンジニアリングチームがワークロードをクラウドへ移行する際に、機密データを意図せずクラウドストレージへ移動してしまうこともあります。Datadog の Sensitive Data Scanner を使用すれば、機密データを検出・分類し、必要に応じてマスキングすることで、機密データの漏洩やコンプライアンス違反のリスクを抑えることができます。

**注**: Datadog のツールとポリシーは PCI v4.0 に準拠しています。詳細については、[PCI DSS 準拠][1]を参照してください。

## テレメトリーデータをスキャンする {#scan-telemetry-data}

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="5 件の異なる機密情報が検出され、2 件がクリティカル優先度、1 件がミディアム優先度、2 件が情報レベル" style="width:100%;" >}}

Sensitive Data Scanner は、[クラウド上](#in-the-cloud)または[環境内](#in-your-environment)でデータをスキャンできます。

### クラウド上 {#in-the-cloud}

クラウド上で Sensitive Data Scanner を使用する場合、ログやイベントを Datadog バックエンドに送信するため、マスキングが行われる前にデータは環境外へ出ます。ログやイベントは処理中に Datadog バックエンドでスキャンおよびマスキングされるため、機密データはイベントがインデックスされ、Datadog UI に表示される前にマスキングされます。

スキャンおよびマスキングの対象となるデータは次のとおりです。

- **ログ**: ログメッセージや属性値など、構造化・非構造化を含むすべてのログ内容
- **APM**: スパンの属性値のみ
- **RUM**: イベントの属性値のみ
- **イベント**: イベントの属性値のみ

オプションで、各製品のサンプリングレートを 10% から 99% の間で設定できます。これにより、機密情報のスキャン対象となるデータ量が減少し、開始時のコスト管理に役立ちます。

[スキャンルール][17]ごとに、一致した機密データに次のいずれかのアクションを適用できます。

- **Redact**: 一致したデータ全体を `[sensitive_data]` などの選択した単一のトークンで置き換えます。
- **Partially redact**: 一致するすべての値の特定の部分を置き換えます。
- **Hash**: 一致したデータ全体を非可逆の一意の識別子で置き換えます。
- **Mask** (ログにのみ利用可能): 一致するすべての値を難読化します。`Data Scanner Unmask` の権限を持つユーザーは、このデータを Datadog で難読化解除（マスク解除）して表示できます。詳細については、[マスクアクション][16]を参照してください。

**注**: サンプリングデータをスキャンするときは、スキャンするデータを難読化するアクションは選択できません。

Sensitive Data Scanner を使用するためには、まずスキャングループを設定してスキャン対象のデータを定義し、次にスキャンルールを設定してデータ内でマッチングさせる機密情報を決定します。スキャンルールについて、次のことが可能です。
- Datadog の [Scanning Rule Library][2] にあるあらかじめ定義されたスキャンルールを追加する(メールアドレス、クレジットカード番号、API キー、認可トークン、ネットワーク・デバイス情報など、一般的なパターンを検出)。
- [独自の正規表現パターン (regex) を使って独自ルールを作成][3]する。

設定手順の詳細は、[テレメトリーデータ用に Sensitive Data Scanner をセットアップする][4]を参照してください。

### 環境内で {#in-your-environment}

[Observability Pipelines][5] を使用して、環境内でログを収集および処理し、そのデータを下流のインテグレーションにルーティングします。Observability Pipelines でパイプラインを設定するときに、[Sensitive Data Scanner プロセッサ][6]を追加することで、ログが環境外へ出る前に機密データをマスキングします。メールアドレス、クレジットカード番号、API キー、認可トークン、IP アドレスなどのあらかじめ定義されたスキャンルールをルールライブラリから利用できるほか、正規表現パターンを用いて独自にルールを作成することも可能です。

詳細は[パイプラインのセットアップ][7]を参照してください。

## LLM Observability データをスキャンする {#scan-llm-observability-data}

Sensitive Data Scanner は、LLM アプリケーションの入力と出力を含む [Datadog LLM Observability][20] のトレースをスキャンできます。これにより、プロンプト、完了、および LLM ワークフローメタデータにおいて、PII、API キー、機密情報などの機密データが露出するのを防ぐことができます。

LLM Observability スキャンは、テレメトリーデータスキャンとは別の管理された構成モデルを使用します。LLM Observability スキャンには次のものがあります。

- **1 つの管理されたスキャングループ**: 最初に [LLM Observability の設定ページ][18]にアクセスすると、組織のデフォルトのスキャングループが自動的に作成されます。追加のスキャングループを作成したり、管理されたグループを削除したりすることはできません。
- **カスタマイズ可能なルール**: 既存のルールを変更したり、不要なルールを無効にしたり、追加の機密データパターンを検出するためのカスタムスキャンルールを追加したりできます。

スキャンルールごとに、一致した機密データに次のいずれかのアクションを適用できます。

- **Redact**: 一致したデータ全体を `[sensitive_data]` などの選択した単一のトークンで置き換えます。
- **Partially redact**: 一致するすべての値の特定の部分を置き換えます。
- **Hash**: 一致したデータ全体を非可逆の一意の識別子で置き換えます。

LLM Observability データのスキャンを構成するには、Sensitive Data Scanner の設定で [LLM Observability の設定ページ][18]に移動します。LLM Observability の詳細については、[LLM Observability のドキュメント][20]を参照してください。

## クラウドストレージをスキャンする {#scan-cloud-storage}

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  Amazon S3 バケットおよび RDS インスタンスのスキャンのサポートはプレビュー版です。登録するには、<strong>Request Access</strong> をクリックしてください。
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="検出結果ページのデータストアのセクションに 3 件の Amazon S3 が表示" style="width:100%;" >}}

Sensitive Data Scanner が有効になっている場合、Amazon S3 バケットにある機密データをカタログ化して分類できます。**注**: Sensitive Data Scanner は、クラウドストレージリソース内の機密データをマスキングしません。

Sensitive Data Scanner は、[エージェントレススキャナー][8]をクラウド環境にデプロイして機密データをスキャンします。これらのスキャニングインスタンスは、[Remote Configuration][9] を通じてすべての S3 バケットのリストを取得し、CSV や JSON などのテキストファイルを時間をかけてスキャンするように設定されています。

Sensitive Data Scanner は、[全ルールライブラリ][10]を活用してマッチを検出します。マッチが見つかると、その場所情報がスキャニングインスタンスによって Datadog に送信されます。**注**: データストアとそのファイルはお客様の環境内でのみ読み取られ、スキャンされた機密データ自体が Datadog に送信されることはありません。

さらに Sensitive Data Scanner は、[Cloud Security][11] が検出した該当データストアのセキュリティ問題も表示します。問題をクリックすると、Cloud Security でトリアージと修正を続行できます。

設定手順の詳細は、[クラウドストレージ用に Sensitive Data Scanner をセットアップする][12]を参照してください。

## コードリポジトリをスキャンする {#scan-code-repositories}

Datadog の [Secret Scanning][21] は、コードリポジトリをスキャンしてソースコード内の漏洩したシークレットを検出します。Secret Scanning は Sensitive Data Scanner によって動作し、SDS ライブラリの[シークレットと資格情報カテゴリ][19]のすべてのルールを使用してマッチを検出します。

テレメトリデータのスキャンとは異なり、Secret Scanning は CI/CD パイプライン内で動作するほか、Datadog 内でホスト型スキャン (GitHub、Azure DevOps、GitLab をサポート) を用いて直接動作します。コード内でシークレットが検出されると、結果が Code Security インターフェイスに表示されます。

セットアップの詳細については、[Secret Scanning のドキュメント][21]を参照してください。

## 機密データの検出結果を調査する {#investigate-sensitive-data-findings}

{{< img src="sensitive_data_scanner/findings_20251014.png" alt="検出結果ページの概要に検出された機密データの優先度別の内訳を表示" style="width:100%;" >}}

[検出結果ページ][13]を使用して、スキャンルールによって特定された機密データの検出の詳細を確認できます。これらの詳細には次のものが含まれます。

- マッチを検出した具体的なスキャンルール (必要に応じてルールを修正する手がかりとなる)
- 検出が確認されたスキャングループ (リークの影響範囲を特定するのに役立つ)
- 検出に関連するイベントの数 (規模や重大度を把握するのに役立つ)
- 検出に関連するイベントのグラフ (検出がいつ始まり、どのように進行したかを把握するのに役立つ)
- 検出に対して作成された関連ケース

検出結果ページを使用して機密データをトリアージする方法の詳細については、[機密データの検出結果を調査する][14]を参照してください。

## 機密データの傾向を確認する {#review-sensitive-data-trends}

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner の概要ダッシュボード" style="width:80%;">}}

Sensitive Data Scanner を有効にすると、機密データの発見事項をまとめたすぐに使える[ダッシュボード][15]がアカウントに自動的にインストールされます。このダッシュボードにアクセスするには、**Dashboards** > **Dashboards List** に移動し、"Sensitive Data Scanner Overview" を検索します。

## 参考資料 {#further-reading}

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