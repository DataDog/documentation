---
categories:
- ログの収集
- セキュリティ
dependencies: []
description: Microsoft 365 に接続して組織の監査ログを Datadog のロギングプラットフォームにプル転送。
doc_link: https://docs.datadoghq.com/integrations/microsoft_365/
draft: false
git_integration_title: microsoft_365
has_logo: true
integration_id: ''
integration_title: Microsoft 365
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: microsoft_365
public_title: Datadog-Microsoft 365 インテグレーション
short_description: Microsoft 365 監査ログを Datadog に表示
team: web-integrations
version: '1.0'
---

## 概要

Microsoft 365 と統合して、以下のことができます。

- Datadog のロギング製品を使用して、監査ログを表示、パース
- Microsoft 365 プラットフォームからのイベントにモニターを設定
- Datadog のセキュリティツールスイートを活用してセキュリティ規則を設定

Datadog は、`Audit.General`、`Audit.Exchange`、`Audit.Sharepoint`、`Audit.AzureActiveDirectory`、`DLP.All` など、いくつかのタイプの監査ログを収集します。
<details>
  <summary><strong>クリックすると全リストが表示されます</strong></summary>

[`AirInvestigation`][1]
: Microsoft 365 内の Advanced eDiscovery および Advanced Threat Protection (ATP) 調査に関連します。これらのログには、セキュリティ インシデント、調査、およびアラート、修復ステップ、フォレンジックデータなど、脅威を軽減するために実行したアクションに関する情報が含まれています。

[`Audit.AzureActiveDirectory`][2]
: Microsoft のクラウドベースの ID およびアクセス管理サービスである Azure Active Directory (Azure AD) によって生成されたログを表します。Azure AD のログは、ユーザーのサインインアクティビティ、ディレクトリとグループの管理、アプリケーションのアクセス、およびセキュリティ関連のイベントに関する洞察を提供します。これにより、組織はユーザーアクセスを管理し、潜在的なセキュリティリスクを検出することができます。

[`Audit.Exchange`][3]
: Microsoft Exchange Server によって生成されるログに関連します。Exchange ログには、メールの配信、メールボックスへのアクセス、クライアント接続、および Exchange 環境内の管理アクションに関する情報が含まれています。これは、組織がメール関連の問題を監視し、トラブルシューティングするのに役立ちます。

[`Audit.General`][4]
: ユーザーや管理者のアクティビティ、システム イベント、セキュリティ インシデント、Exchange や SharePoint などの特定のサービスに直接関連しないその他のアクションなど、Microsoft 365 環境内で発生するさまざまなアクティビティやイベントに関する情報が含まれます。

[`Audit.MicrosoftForms`][5]
: アンケート、クイズ、フォームを作成するためのツールである Microsoft Forms によって生成されるログを表します。フォームのログには、フォームの作成、アクセス、回答、およびユーザーのアクティビティに関する情報が含まれます。これは、組織がフォームデータを追跡し、保護するのを支援するものです。

[`Audit.MicrosoftStream`][6]
: Microsoft エコシステム内のビデオ共有プラットフォームである Microsoft Stream によって生成されるログを指します。Stream のログには、ビデオのアップロード、アクセス、共有、およびユーザーのアクティビティに関する情報が含まれています。これは、組織がビデオコンテンツを追跡し、保護するのに役立ちます。

[`Audit.MicrosoftTeams`][7]
: コラボレーションおよびコミュニケーションプラットフォームである Microsoft Teams によって生成されるログを包含します。Teams のログには、ユーザーのアクティビティ、チームとチャンネルの管理、ファイル共有、およびミーティングイベントに関する情報が含まれます。ユーザーのやり取りを監視し、安全なコラボレーションを確保するために組織を支援します。

[`Audit.OneDrive`][8]
: Microsoft のクラウドベースのファイルストレージおよび同期サービスである OneDrive によって生成されるログを指します。OneDrive のログには、ファイルへのアクセス、共有、変更、およびユーザーのアクティビティに関する情報が含まれます。組織がクラウドベースのデータを監視し、保護するのに役立ちます。

[`Audit.PowerBI`][9]
: Microsoft のビジネス分析およびデータ可視化ツールである Power BI によって生成されるログを指します。Power BI のログには、データアクセス、レポート生成、ダッシュボードアクティビティ、ユーザーインタラクションに関する情報が含まれています。組織がビジネスインテリジェンスデータを監視し、保護するのに役立ちます。

[`Audit.Project`][10]
: Microsoft 365 スイート内のプロジェクト管理ツールである Microsoft Project の監査ログを指します。これらのログは、プロジェクトの作成、タスクの更新、リソースの割り当て、権限の変更など、Microsoft Project 内のユーザーアクティビティ、管理アクション、およびシステムイベントに関連するイベントをキャプチャします。

[`Audit.SharePoint`][11]
: Microsoft SharePoint によって生成されるログを指します。SharePoint のログは、ユーザーアクセス、ドキュメントの変更、サイト管理、およびセキュリティ関連のイベントを記録します。これにより、インテグレーションはデータの整合性を維持し、SharePoint サイトとコンテンツを保護することができます。

[`Audit.SkypeForBusiness`][12]
: Skype for Business アクティビティの監査ログを指します。これらのログは、通話詳細記録、会議詳細記録、メッセージングアクティビティ、ユーザー管理やポリシー更新などの管理アクションなど、Skype for Business サービス内のユーザーおよび管理アクションに関連するイベントをキャプチャするものです。

[`Audit.Yammer`][13]
: 企業向けソーシャルネットワーキングプラットフォームである Yammer が生成するログを表します。Yammer のログには、ユーザーアクティビティ、グループおよびコミュニティ管理、コンテンツ共有に関する情報が含まれます。組織が社内のソーシャルネットワークを監視し、保護するのに役立ちます。

[`ComplianceManager`][14]
: Microsoft Compliance Manager ツールに関連するもので、組織が Microsoft 365 のコンプライアンス活動を評価、管理、追跡できるようにするものです。これらのログには、コンプライアンスの評価、タスク、改善アクション、および規制要件を満たすための進捗状況に関する情報が含まれています。

`DLP.All`
: Exchange、SharePoint、OneDrive、Microsoft Teams など、すべての Microsoft 365 サービスにおける DLP ポリシー、検出、アクションに関連するイベントをキャプチャします。これらのログは、ポリシー違反、機密情報の検出、およびコンテンツのブロック、ユーザーまたは管理者への通知など、データを保護するために実行されたアクションに関する洞察を提供します。

[`MicrosoftFlow`][15]
: Microsoft Power Automate サービス (旧称: Microsoft Flow) に関連するもので、さまざまなアプリケーションやサービス間で自動化されたワークフローを作成、管理できるクラウドベースのプラットフォームです。これらのログは、ワークフローの実行、エラー、およびフローの作成、更新、削除などの管理操作に関連するイベントをキャプチャします。

[`Mip`][16]
: 機密データを分類、ラベル付け、保護するためのツールとサービスのスイートである Microsoft Information Protection (MIP) によって生成されるログに関係します。MIP ログは、データの分類、アクセス、および保護イベントに関する洞察を提供します。これにより、組織は機密情報を管理し、保護することができます。

[`MyAnalytics`][17]
: Microsoft MyAnalytics サービスに関連するもので、Microsoft 365 スイート内での個人の作業習慣や生産性傾向に関する洞察を提供します。これらのログには、会議、メール、コラボレーション、集中時間などに費やした時間など、ユーザーのアクティビティに関する情報が含まれています。

[PowerApps`][18]
: Microsoft のローコードアプリケーション開発プラットフォームである Power Apps によって生成されるログを指します。Power Apps のログには、アプリの作成、アクセス、使用、およびユーザーアクティビティに関する情報が含まれています。

[`Quarantine`][19]
: 悪意のあるメールや不要なメールを隔離して確認するために使用されるメール検疫システムによって生成されるログを表します。検疫ログには、隔離されたメール、送信者、受信者の詳細、および実行されたアクションに関する情報が含まれます。メールのセキュリティを管理し、脅威を防ぐために組織を支援します。

[`Rdl`][20]
: SQL Server Reporting Services (SSRS) に関連するもので、サーバーベースのレポートプラットフォームで、さまざまな形式のレポートを作成、公開、管理することができます。Rdl ログソースは、レポートの実行、アクセス、およびレポートの生成、更新、削除などの管理アクションに関連するイベントをキャプチャします。

[`SecurityComplianceCenter`][21]
: Microsoft 365 サービス全体のセキュリティとコンプライアンス機能を管理するための集中型プラットフォームである Microsoft の Security & Compliance Center によって生成されるログに関係します。これらのログは、セキュリティインシデント、ポリシー違反、およびコンプライアンス管理アクティビティに関する洞察を提供します。これにより、組織は安全でコンプライアンスに準拠した IT 環境を維持することができます。

[`SecurityMonitoringEntityReducer`][22]
: Microsoft 365 のセキュリティイベントログとアラート集計アクティビティに関連します。これらのログは、Microsoft 365 環境全体で検出されたセキュリティイベント、異常、および潜在的な脅威に関する洞察を提供します。

[`ThreatIntelligence`][23]
: 新興のセキュリティ脅威に関する情報を収集、分析、共有する脅威インテリジェンスシステムまたはツールによって生成されるログを包含します。脅威インテリジェンスログは、潜在的な脅威、脆弱性、および侵害の指標に関する洞察を提供します。組織がサイバー攻撃からプロアクティブに防御するのに役立ちます。

</details>

## セットアップ

### インストール

[Datadog Microsoft 365 タイル][24]を使用してインテグレーションをインストールします。

**Install a New Tenant** をクリックすると、認証のために Microsoft 365 アカウントにログインするページが開きます。監理者アカウントでログインする必要があります。

オプションとして、この新規設定するテナントのすべてのログにアタッチされるカスタムタグをコンマ区切りで追加できます（例: `environment:prod,team:us`）。このタグは、ログのフィルタリング/分析に使用することが可能です。

**注**: Datadog の監査ログを使用するには、組織の[監査ログが有効][25]である必要があります。

## 収集データ

### ログ管理

Microsoft 365 インテグレーションでは、監査ログごとに 1 つのログイベントが生成されます。収集されたログは、ソース `microsoft-365` でタグ付けされます。

## トラブルシューティング

Datadog のログインテークは、最大過去 18 時間までさかのぼったログイベントのみをサポートします。この期間より前のタイムスタンプのログイベントは破棄されます。

Datadog では、異なる Microsoft エンドポイントが必要となるため、GCC、GCC High、または DoD 環境のテナントに対応していません。

ご不明な点は、[Datadog のサポートチーム][26]までお問い合わせください。

[1]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AAirInvestigation%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[2]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AAzureActiveDirectory%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[3]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AExchange%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[4]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[5]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftForms%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[6]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftStream%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[7]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftTeams%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[8]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AOneDrive%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[9]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3APowerBI%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[10]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AProject%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[11]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASharePoint%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[12]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASkypeForBusiness%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[13]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AYammer%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[14]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AComplianceManager%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[15]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftFlow%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[16]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMip%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[17]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMyAnalytics%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[18]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3APowerApps%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[19]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AQuarantine%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[20]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ARdl%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[21]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASecurityComplianceCenter%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[22]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASecurityMonitoringEntityReducer%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[23]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AThreatIntelligence%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&from_ts=1682522021005&to_ts=1682522921005&live=true
[24]: https://app.datadoghq.com/account/settings#integrations/microsoft_365
[25]: https://docs.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#turn-on-audit-log-search
[26]: https://docs.datadoghq.com/ja/help/