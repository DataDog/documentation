---
aliases:
- /ja/security_monitoring/
- /ja/security_platform/cloud_siem/security_home/
- /ja/security_platform/cloud_siem/
- /ja/security/cloud_siem/security_home/
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-cloud-siem
  tag: ラーニングセンター
  text: Cloud SIEM の紹介
- link: https://learn.datadoghq.com/courses/cloud-siem-automated-remediation
  tag: ラーニングセンター
  text: セキュリティワークフローによる脅威の調査と修復の自動化
- link: https://www.datadoghq.com/blog/cloud-siem-cases/
  tag: ブログ
  text: Datadog Cloud SIEM の Case Management を使用して、セキュリティシグナルを構造化された調査に変換する
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: ブログ
  text: Datadog を使用して Google Cloud AI スタックを評価、最適化、保護する
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: ブログ
  text: 'Cloud SIEM の新機能: AI を活用した調査、強化された脅威インテリジェンス、スケーラブルなセキュリティオペレーション'
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability Pipelines で MSSP のログ収集と集計を簡素化する
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: ブログ
  text: 'Datadog Cloud SIEM: セキュリティ運用におけるイノベーションの推進'
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: ブログ
  text: Datadog Case Management で問題をプロアクティブに追跡し、トリアージし、割り当てる
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: ブログ
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
- link: https://www.datadoghq.com/blog/soar/
  tag: ブログ
  text: Datadog SOAR ワークフローを使用して、ID 保護、脅威の封じ込め、脅威インテリジェンスを自動化する
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog Audit Trail で、チーム全体のコンプライアンス、ガバナンス、透明性を構築する
- link: https://www.datadoghq.com/blog/aws-threat-emulation-detection-validation-datadog/
  tag: ブログ
  text: Stratus Red Team と Datadog Cloud SIEM による AWS 脅威のエミュレーションと検出の検証
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM で 1Password を監視する
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: ブログ
  text: クラウド環境に十分なセキュリティカバレッジを構築する
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: ブログ
  text: ネットワークとセキュリティ分析のために DNS ログを監視する
- link: https://www.datadoghq.com/blog/akamai-zero-trust-application-security/
  tag: ブログ
  text: Datadog Cloud SIEM で Akamai Zero Trust と Application Security を監視する
- link: https://www.datadoghq.com/blog/microsoft-365-detections/
  tag: ブログ
  text: 攻撃者が Microsoft 365 サービスを悪用する方法
- link: https://www.datadoghq.com/blog/monitor-security-metrics/
  tag: ブログ
  text: Datadog で組織のセキュリティ体制を監視する
- link: https://www.datadoghq.com/blog/risky-behavior-cloud-environments/
  tag: ブログ
  text: クラウド環境におけるリスクの高い動作を特定する
- link: https://www.datadoghq.com/blog/detect-phishing-activity-amazon-ses/
  tag: ブログ
  text: 'Amazon SES モニタリング: クラウド内のフィッシングキャンペーンを検出する'
- link: https://www.datadoghq.com/blog/detection-as-code-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM を使用して、コードとしての検出を構築、テスト、およびスケールする
title: Cloud SIEM
---
{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Datadog Cloud SIEM と Cloud Security が動的なクラウドスケール環境における組織の脅威検出と調査をどのように向上させるかをご覧ください。
{{< /learning-center-callout >}}

## 概要 {#overview}

Datadog Cloud SIEM (Security Information and Event Management) は、セキュリティデータの分析および相関システムです。これにより、セキュリティ運用チーム全体がセキュリティの問題を表示、検出、調査し、対応できるようになります。Datadog のスケーラブルなプラットフォームを活用し、Cloud SIEM は Datadog Agent と API ベースのインテグレーションを使用して、クラウドおよびオンプレミスシステムの両方からテレメトリを取り込みます。

効果的なセキュリティ対応には、スピード、コンテキスト、インサイト、そして自動化が必要です。Cloud SIEM は、受信データを継続的に分析して脅威を検出し、実用的なセキュリティシグナルを生成し、複数のソース間でそれらを関連付けます。これにより、チームはインシデントを調査し、迅速に対応できるようになります。

チームが最新の攻撃を常に把握できるように、Datadog には脅威リサーチャーのチームも存在します。このチームはクラウドおよびオンプレミスシステム全体のペタバイト規模のテレメトリを分析し、新たな脅威や攻撃者の行動を特定します。最近の調査に関する記事を読むには、[Datadog Security Labs][1] を参照してください。

### セキュリティとオブザーバビリティ {#security-and-observability}

Cloud SIEM は、クラウドおよびオンプレミスの両方のテレメトリをセキュリティワークフローに直接組み込み、調査と対応を加速させます。また、DevOps チームとセキュリティチームを結び付ける共有プラットフォームにより、組織はサイロを解消し、協調的かつ効率的に脅威に対応できます。

### セキュリティデータに対する柔軟なコスト管理 {#flexible-cost-control-for-security-data}

組織の規模が拡大するにつれて、可視性を損なうことなくセキュリティログの取り込みコストを管理することが不可欠です。Cloud SIEM は Datadog Log Management と統合されているため、セキュリティログに適した保持期間とクエリ機能を選択できます。この柔軟性により、コスト効率と脅威検出のニーズのバランスを取ることができます。

以下の利用可能なオプションのいずれかを使用してログを保存します。
- [標準的なインデックス化][6]: 最も高いコンピューティング能力で頻繁にクエリする必要があるログ向け。
- [Flex Logs][7]: 長期的な保持が必要でありながら緊急にクエリする必要があるログ向け。
- [ログアーカイブ][8]: クエリの頻度が低く長期的な保持が必要なログ向け。

### ガイド付きセキュリティデータオンボーディング {#guided-security-data-onboarding}

Cloud SIEM [Content Packs][9] は、セキュリティチーム向けに設計された Datadog integrations の厳選されたセットです。各コンテンツパックには、インテグレーションの構成方法や、検出ルール、すぐに使えるインタラクティブなダッシュボード、パーサー、SOAR ワークフローなど、含まれている機能に関する説明が記載されています。コンテンツパックは、各インテグレーションに固有の実行可能なインサイトを強調し、セキュリティに関する問題の調査を支援します。

### コンテンツパックの正常性モニタリング {#content-pack-health-monitoring}

コンテンツパックを有効にすると、インテグレーションの正常性ステータスが表示され、問題が発生した場合のトラブルシューティング手順が提供されるため、可能な限り迅速に運用を再開できます。

### ログ検索と分析 {#log-search-and-analysis}

ファセットを使用するか、ログ内のフィールドを直接クリックして、ログエクスプローラーで検索を構築します。または、Bits AI と自然言語検索を使用して、重要なセキュリティイベントを見つけます。組み込みのグループ化機能やテーブルルックアップ機能、パターン分析、視覚化機能により、セキュリティチームはデータからセキュリティに関するインサイトを得ることができます。詳細については、[ログエクスプローラー][11]および[ログ検索構文][10]を参照してください。

## 開始する {#get-started}

Datadog アカウントをまだお持ちでない場合は、[無料トライアル][2]にサインアップしてください。Datadog アカウントにログインした後、以下を実行します。

1. [Cloud SIEM][12] に移動します。
1. {{< ui >}}Enable Cloud SIEM{{< /ui >}} をクリックします。
1. オンボーディングの手順に従います。

詳細なセットアップ手順については、[開始ガイド][4]を参照してください。

## Cloud SIEM 概要ページ {#cloud-siem-overview-page}

[Cloud SIEM 概要ページ][3]に移動します。このページを使用して、主要なセキュリティインサイトを表示し、セキュリティアナリスト、セキュリティおよび検出エンジニア、セキュリティオペレーションセンター (SOC) マネージャー向けの一般的なワークフローを実行します。概要ページから、次のことができます。
- 重要なシグナル、オープンケース、および高リスクのエンティティにアクセスします。
- オンボーディングタスクを完了し、コンテンツパックの健全性を確認します。
- 地理的またはインターネットサービスプロバイダー (ISP) 別に上位のシグナルを表示および調査します。
- MITRE ATT&CK 戦術別にシグナルとルールを分析します。
- 検出パフォーマンス (平均検出時間 (MTTD)、誤検出率) を追跡します。
- 最新の [Security Labs][1] の調査およびリリースノートを参照してください。

{{< ui >}}Customize Page{{< /ui >}} をクリックしてモジュールを並べ替えたり非表示にしたりすることで、自分にとって重要な情報を確認できます。

Cloud SIEM 概要ページの各セクションの詳細については、以下を参照してください。

### セキュリティカバレッジ {#security-coverage}

{{< img src="security/security_monitoring/landing/01_security_coverage.png" alt="11 個のアクティブなコンテンツパックと 1 個の破損したコンテンツパック、および Cloud SIEM によって分析されたログの棒グラフが表示されたセキュリティカバレッジセクション" style="width:100%;" >}}

データ処理の問題やカバレッジのギャップを常に把握しておきます。

#### 有効なコンテンツパックとインテグレーション {#enabled-content-packs-and-integrations}

包括的なセキュリティカバレッジを提供するために、重要なカテゴリー全体で有効なコンテンツパックとインテグレーションを表示します。水平バーの各セクションにカーソルを合わせると、各カテゴリーでどのコンテンツパックが有効になっているかを確認できます。

#### コンテンツパックとログの健全性 KPI {#content-pack-and-logs-health-kpis}

コンテンツパックやインテグレーションが警告状態または破損状態になっていないかを確認し、カバレッジのギャップを解決できるようにします。ステータスタイルをクリックして、影響を受けているコンテンツパックを表示します。

#### ログ分析 {#logs-analyzed}

主要なログソース全体のログ記録の傾向を表示し、異常な急増または急落を特定します。下部の凡例をクリックすると、ソースごとの傾向を確認できます。

### 重要なシグナルとケース {#important-signals-and-cases}

{{< img src="security/security_monitoring/landing/02_important_signals_cases.png" alt="" style="width:100%;" >}}

環境内で発生している以下のような重要なイベントを確認します。

#### ルール別にグループ化された最近のオープンシグナル {#recent-open-signals-grouped-by-rule}

ルール名でグループ化されて重大度順に並べ替えられたシグナルを確認し、環境内の最も重要なシグナルの概要を把握します。シグナルまたは重大度ピルをクリックすると、Signal Explorer のフィルタリングされたビューで詳細を確認できます。

#### 最近オープンしたセキュリティケース {#recent-open-security-cases}

[Case Management][5] を使用して、詳細な分析が必要なシグナルを追跡します。環境内のアクティブなセキュリティケースを表示し、ケースをクリックして詳細を確認します。

### エンティティリスク {#entity-risks}

{{< img src="security/security_monitoring/landing/03_entity_risks.png" alt="リスクの高い上位のエンティティ、エンティティタイプ別の内訳、リスク重大度別のエンティティ数が表示されている、Cloud SIEM 概要ページのエンティティリスクセクション。" style="width:100%;" >}}

環境内のリスクの高いエンティティを確認します。

#### リスクの高い上位のエンティティ {#top-risky-entities}

リスクスコアが最も高いエンティティを確認します。エンティティをクリックして詳細を表示し、アクションを実行します。

#### エンティティタイプの内訳 {#entity-type-breakdown}

環境内で最も一般的なエンティティタイプを表示します。円グラフの扇形をクリックして、エンティティのリストをタイプ別にフィルタリングします。

#### エンティティリスクスコアの内訳 {#entities-risk-score-breakdown}

重大度別にエンティティを表示します。重大度タイルをクリックすると、その重大度のエンティティリストを表示できます。

### 脅威マップ {#threat-map}

{{< img src="security/security_monitoring/landing/04_threat_map.png" alt="" style="width:100%;" >}}

環境内のシグナルがどこから生成されているかについてのインサイトを入手します。

#### 国別の上位 IP ディストリビューション {#top-ips-by-country-distribution}

重要なシグナルと重要度の低いシグナルの内訳とともに、どの IP が最も多くのシグナルを生成しているかを確認します。また、マップを使用して国別のシグナルリストを表示することもできます。

#### 国別のシグナル {#signals-by-country}

シグナルの発生元の内訳を表示します。円グラフの扇形をクリックすると、国や州、都道府県でフィルタリングし、予期しない場所からのシグナルを特定できます。

#### ISP プロバイダー別のシグナル {#signals-by-isp-provider}

どの ISP がシグナルを送信しているかを確認します。円グラフの扇形をクリックすると、プロバイダーおよび場所でスコープを絞り込めます。

### セキュリティの概要 {#security-overview}

{{< img src="security/security_monitoring/landing/05_security_overview.png" alt="" style="width:100%;" >}}

すべてのシグナルの概要です。

#### シグナルディストリビューション {#signal-distribution}

セクションの左側では、選択された期間における重大度および傾向別にグループ化されたシグナルを確認できます。
右側では、重大度、ソース、解決状況別のシグナルアクティビティの内訳を確認できます。サンキーダイアグラムのノードをクリックすると、そのノードの特性に合わせてフィルタリングされたシグナルエクスプローラーのシグナルが表示されます。

#### シグナルへの平均応答時間 {#mean-time-to-respond-to-signals}

チームの応答速度に関する KPI を確認できます。重大度タイルをクリックすると、`under review` または `archive` に設定され、選択された重大度にフィルタリングされたシグナルが表示されます。

### MITRE ATT&CK カバレッジ {#mitre-attck-coverage}

{{< img src="security/security_monitoring/landing/06_mitre_coverage.png" alt="" style="width:100%;" >}}

MITRE ATT&CK の戦術およびテクニック別の検出ルールカバレッジとシグナルアクティビティです。

#### 少なくとも 1 つのルールを持つテクニック {#techniques-with-at-least-1-rule}

環境で有効になっている検出ルールによって、どれくらいのテクニックがカバーされているかを確認できます。

#### ルール密度 KPI {#rule-density-kpis}

高密度、中密度、低密度、またはルールがまったくないテクニックがどれくらいあるかを確認できます。タイルをクリックすると、フィルタリングされた MITRE マップが表示されます。

#### 戦術ごとのシグナルビュー {#signals-per-tactic-view}

どの MITRE ATT&CK 戦術がシグナルを生成しているかを確認できます。円グラフの扇形をクリックすると、その戦術でフィルタリングされたシグナルエクスプローラーが表示されます。ドロップダウンをクリックして {{< ui >}}Rules count{{< /ui >}} を選択すると、どの戦術に最も多くのルールがマッピングされているかを確認できます。ルール数で表示されている場合、円グラフの扇形をクリックすると、その戦術でフィルタリングされた検出ルールエクスプローラービューが作成されます。

#### テクニックごとのシグナルビュー {#signals-per-technique-view}

どの MITRE ATT&CK テクニックがシグナルを生成しているかを確認できます。円グラフの扇形をクリックすると、テクニックでフィルタリングされたシグナルエクスプローラーが表示されます。ドロップダウンをクリックして {{< ui >}}Rules count{{< /ui >}} を選択すると、最も多くのルールがマッピングされているテクニックを確認できます。ルール数で表示されている場合、円グラフのセグメントをクリックすると、そのテクニックでフィルタリングされた検出ルールエクスプローラーが表示されます。

### 検出ルールパフォーマンス {#detection-rules-performance}

{{< img src="security/security_monitoring/landing/07_detection_rule_performance.png" alt="" style="width:100%;" >}}

検出ルールパフォーマンスをより深く理解します。このセクションは、Cloud SIEM でシグナルをトリアージする場合に最も効果的です。

#### Cloud SIEM の MTTD KPI {#mttd-kpis-for-cloud-siem}

すべてのシグナルにわたる平均検出時間 (MTTD) を確認します。以下のタイルは、重大、高、中程度のシグナルの MTTD を示しています。タイルをクリックすると、その重大度のシグナルがシグナルエクスプローラーで表示されます。

#### シグナルアクティビティ {#signal-activity}

選択された期間のシグナルの傾向を表示します。棒グラフの下部にある重大度のチェックボックスを選択して重大度別にスコープを絞り込むと、異常な急増または急減を特定する上で役立ちます。

#### 重要なシグナル変化別のルール (1 週間) {#rules-by-important-signal-change-1-week}

前週と比較して重要なシグナルアクティビティが増加したルールを確認します。ルール名をクリックすると、そのルール名でフィルタリングされたシグナルがシグナルエクスプローラーに表示されます。

#### 重大度変化別のシグナル (1 週間) {#signals-by-severity-change-1-week}

すべてのシグナルの重大度が前週と比較してどのように変化したかを表示します。重大度をクリックすると、その重大度のシグナルがシグナルエクスプローラーで表示されます。

#### アーカイブされた理由別の重要なシグナル {#important-signals-by-archived-reason}

アーカイブ理由別にアーカイブされたシグナルの数を確認できます。理由をクリックすると、そのアーカイブ理由でフィルタリングされたシグナルエクスプローラーが表示されます。

#### 真陽性 (悪意がある) としてアーカイブされたルール {#rules-archived-with-true-positive-malicious}

`True Positive: Malicious` としてアーカイブされたルールを確認できます。ルールをクリックすると、シグナルエクスプローラーにシグナルが表示されます。

#### 真陽性 (良性) としてアーカイブされたルール {#rules-archived-with-true-positive-benign}

`True Positive: Benign` としてアーカイブされたルールを確認できます。ルールをクリックすると、シグナルエクスプローラーにシグナルが表示されます。

#### 偽陽性率別のルール {#rules-by-false-positive-rate}

ルールによって生成された全シグナルのうち、偽陽性とマークされたシグナルの割合を計算し、どのルールが最もノイズが多いかを確認できます。ルールをクリックすると、そのルールのシグナルがシグナルエクスプローラーに表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://securitylabs.datadoghq.com/
[2]: https://www.datadoghq.com/product/cloud-siem/
[3]: https://app.datadoghq.com/security/siem/home?
[4]: /ja/getting_started/security/cloud_siem/
[5]: /ja/security/cloud_siem/investigate_security_signals/#case-management
[6]: /ja/logs/log_configuration/indexes
[7]: /ja/logs/log_configuration/flex_logs/
[8]: /ja/logs/log_configuration/archives/
[9]: /ja/security/cloud_siem/content_packs/
[10]: /ja/logs/explorer/search_syntax/
[11]: /ja/logs/explorer/
[12]: https://app.datadoghq.com/security/siem/intro