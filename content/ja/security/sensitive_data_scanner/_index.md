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
- link: /security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
  tag: ドキュメント
  text: カスタムルール作成のベストプラクティス
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
title: Sensitive Data Scanner
---

## 概要

クレジットカード番号、API キー、IP アドレス、個人を特定できる情報 (PII) などの機密データは、意図せず漏洩してしまうことが多く、組織にセキュリティおよびコンプライアンス上のリスクをもたらす可能性があります。これらの機密データは、アプリケーションログ、APM スパン、RUM イベント、イベント管理などのテレメトリーデータに含まれている場合があります。また、エンジニアリングチームがワークロードをクラウドへ移行する際に、意図せずクラウドストレージへ移動してしまうこともあります。Datadog の Sensitive Data Scanner を使用すれば、機密データを検出・分類し、必要に応じてマスキングすることで、機密データの漏洩やコンプライアンス違反のリスクを抑えることができます。

**注**: PCI 準拠の Datadog 組織のセットアップに関する情報については、[PCI DSS 準拠][1]を参照してください。

## テレメトリーデータをスキャンする

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="5 件の異なる機密情報が検出され、2 件がクリティカル優先度、1 件がミディアム優先度、2 件が情報レベル" style="width:100%;" >}}

Sensitive Data Scanner は、[クラウド上](#in-the-cloud)または[環境内](#in-your-environment)でデータをスキャンできます。

### クラウド上 {#in-the-cloud}

クラウド上で Sensitive Data Scanner を使用する場合、ログやイベントを Datadog バックエンドに送信するため、マスキングが行われる前にデータは環境外へ出ます。ログやイベントは処理中に Datadog バックエンドでスキャンおよびマスキングされるため、機密データはイベントがインデックスされ、Datadog UI に表示される前にマスキングされます。

スキャンおよびマスキングの対象となるデータは以下の通りです:

- ログ: ログメッセージや属性値など、構造化・非構造化を含むすべてのログ内容
- APM: スパンの属性値のみ
- RUM: イベントの属性値のみ
- イベント: イベントの属性値のみ

Sensitive Data Scanner を使用するには、まずスキャン対象のデータを定義するスキャングループを設定し、次にスキャンルールを設定して、どのような機密情報を検出するかを決定します。スキャンルールの設定方法としては:
- Datadog の [Scanning Rule Library][2] にあるあらかじめ定義されたスキャンルールを追加する (メールアドレス、クレジットカード番号、API キー、認可トークン、ネットワーク・デバイス情報など、一般的なパターンを検出)
- [独自の正規表現パターン (regex) を使って独自ルールを作成する][3]

設定手順の詳細は、[テレメトリーデータ用に Sensitive Data Scanner をセットアップする][4]を参照してください。


### 環境内で {#in-your-environment}

[Observability Pipelines][5] を使用して、環境内でログを収集・処理し、最終的にダウンストリームの連携先へデータを送信できます。Observability Pipelines でパイプラインを設定するときに、[Sensitive Data Scanner プロセッサ][6]を追加することで、ログが環境外へ出る前に機密データをマスキングします。メールアドレス、クレジットカード番号、API キー、認可トークン、IP アドレスなどのあらかじめ定義されたスキャンルールライブラリを利用できるほか、正規表現パターンを用いて独自にルールを作成することも可能です。

詳細は[パイプラインのセットアップ][7]を参照してください。

## クラウドストレージをスキャンする

{{< callout header="Limited Availability" url="https://www.datadoghq.com/private-beta/data-security" >}}
Amazon S3 バケットおよび RDS インスタンスのスキャニングサポートは Limited Availability です。利用登録するには、<strong>アクセスリクエスト</strong>をクリックしてください。
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="Summary ページの datastore セクションに表示された Amazon S3 の 3 件の問題" style="width:100%;" >}}

Sensitive Data Scanner が有効になっている場合、Amazon S3 バケットや RDS インスタンスにある機密データをカタログ化して分類できます。**注**: Sensitive Data Scanner は、クラウドストレージリソース内の機密データをマスキングしません。

Sensitive Data Scanner は、[エージェントレススキャナ][8]をクラウド環境にデプロイして機密データをスキャンします。これらのスキャニングインスタンスは、[Remote Configuration][9] を通じてすべての S3 バケットと RDS インスタンスのリストを取得し、CSV や JSON などのテキストファイルや各データストア内のテーブルを、時間をかけてスキャンするように設定されています。

Sensitive Data Scanner は、[全ルールライブラリ][10]を活用してマッチを検出します。マッチが見つかると、その場所情報がスキャニングインスタンスによって Datadog に送信されます。**注**: データストアとそのファイルはお客様の環境内でのみ読み取られ、スキャンされた機密データ自体が Datadog に送信されることはありません。

さらに Sensitive Data Scanner は、[Cloud Security][11] が検出した該当データストアのセキュリティ問題も表示します。問題をクリックすると、Cloud Security でトリアージと修正を続行できます。

設定手順の詳細は、[クラウドストレージ用に Sensitive Data Scanner をセットアップする][12]を参照してください。

## 機密データの問題を調査する

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="優先度ごとに分類された機密情報の概要を示す Summary ページ" style="width:100%;" >}}

[Summary ページ][13]を使用して、スキャンルールによって特定された機密データの問題の詳細を確認できます。これらの詳細には以下が含まれます:

- マッチを検出した具体的なスキャンルール (必要に応じてルールを修正する手がかりとなる)
- 問題が発生したスキャングループ (リークの影響範囲を特定するのに役立つ)
- 問題に関連するイベントの数 (問題の規模や重大度を把握するのに役立つ)
- その問題に関連するイベントのグラフ (問題がいつ始まり、どのように進行したかを把握するのに役立つ)
- その問題に対して作成された関連ケース

Summary ページを使用して機密データの問題をトリアージする方法の詳細は、[機密データの問題を調査する][14]を参照してください。

## 機密データの傾向を確認する

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview ダッシュボード" style="width:80%;">}}

Sensitive Data Scanner が有効になっている場合、機密データの問題を集約した[標準ダッシュボード][15]が自動的にアカウントにインストールされます。このダッシュボードにアクセスするには、**Dashboards** > **Dashboards List** に移動し、「Sensitive Data Scanner Overview」で検索してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_security/pci_compliance/
[2]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: /ja/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /ja/security/sensitive_data_scanner/setup/telemetry_data/
[5]: /ja/observability_pipelines/
[6]: /ja/observability_pipelines/processors/sensitive_data_scanner
[7]: /ja/observability_pipelines/set_up_pipelines/
[8]: /ja/security/cloud_security_management/setup/agentless_scanning
[9]: /ja/agent/remote_config
[10]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[11]: /ja/security/cloud_security_management
[12]: /ja/security/sensitive_data_scanner/setup/cloud_storage/
[13]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[14]: /ja/security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
[15]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner