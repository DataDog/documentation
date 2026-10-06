---
aliases:
- /ja/security_monitoring/detection_rules/
- /ja/cloud_siem/detection_rules/
- /ja/security_platform/detection_rules/
- /ja/security/security_monitoring/log_detection_rules/
further_reading:
- link: /security/default_rules/#all
  tag: ドキュメント
  text: デフォルトの検出ルールについて
- link: /security/notifications/
  tag: ドキュメント
  text: セキュリティ通知について詳しく説明します
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: ブログ
  text: Datadog でアプリケーションの悪用を検出
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: ブログ
  text: 不可能な旅行検出ルールで不審なログイン行為を検出する
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
title: 検出ルール
---
{{< product-availability >}}

検出ルールは、取り込まれたすべてのログとクラウド構成に適用される条件ロジックを定義します。一定期間内に、ルールで定義されたケースのうち少なくとも 1 つが一致すると、セキュリティシグナルが生成されます。これらのシグナルは [シグナルエクスプローラー][1] で確認できます。

## すぐに使える検出ルール {#out-of-the-box-detection-rules}

Datadog は、攻撃者の手法や潜在的な構成ミスにフラグを付けるための [すぐに使える検出ルール][2] を提供しています。リリースされた新しい検出ルールは、構成に応じて、アカウント、App and API Protection ライブラリ、および Agent に自動的にインポートされます。

すぐに使えるルールは、以下のセキュリティ製品で利用可能です。

- [Cloud SIEM][3] は、ログ検出を使用して、取り込まれたログをリアルタイムで分析します。
- Cloud Security:
    - [Cloud Security Misconfigurations][4] は、クラウド構成およびインフラストラクチャー構成の検出ルールを使用して、クラウド環境の状態をスキャンします。
    - [Cloud Security Identity Risks][6] は、検出ルールを使用して、クラウドインフラストラクチャーにおける IAM ベースのリスクを検出します。
- [Workload Protection][5] は、Datadog Agent と検出ルールを使用して、システムのアクティビティを積極的に監視、評価します。
- [App and API Protection][7] (AAP) は、Datadog [APM][8]、[Datadog Agent][9]、検出ルールを活用し、アプリケーション環境における脅威を検出します。

## MITRE ATT&CK マップ {#mitre-attck-map}

{{< product-availability names="Cloud SIEM,App and API Protection,Workload Protection" >}}

MITRE ATT&CK は、サイバー攻撃者の行動を組織が理解するためのフレームワークです。以下をマッピングします。

- **戦術:** 攻撃の「理由」。全体的な目標 (初期アクセスの獲得、悪意のあるコードの実行、データの窃取など) です。
- **手法:** 攻撃の「方法」。攻撃者が戦術を達成するために実行する具体的なアクション (フィッシングを使用したシステムへの侵入、ソフトウェアの脆弱性の悪用など) です。

MITRE ATT&CK は、戦術と手法をマッピングすることで、セキュリティチームに脅威を伝達し、防御をより適切に準備するための共通の言語を提供します。

MITRE ATT&CK マップを使用するには、次のようにします。

1. [SIEM][16] または [Workload Protection][17] で [Detection Rules] (検出ルール) を開きます。
2. [{{< ui >}}MITRE ATT&CK map{{< /ui >}}] (MITRE ATT&CK マップ) を選択します。
3. フィルター <i class="icon-filter"></i> で 1 つ以上の製品を選択します。
4. マップで以下を確認します。
   - カバレッジの評価: 十分にカバーされている攻撃手法と監視不足の攻撃手法を判断します。
   - ルール作成を優先: カバレッジが低い、またはカバレッジがまったくない手法の検出ルールを作成することに重点を置きます。
   - ルール管理の効率化: 検出ルールを管理、更新し、最新の脅威インテリジェンスに対応していることを確認します。
MITRE ATT&CK マップは SIEM または Workload Protection で利用できますが、フィルターで Application and API Protection を選択することもできます。Application and API Protection は、包括的なセキュリティカバレッジのために MITRE ATT&CK マップに含まれています。

## ベータ検出ルール {#beta-detection-rules}

Datadog の Security Research チームは、すぐに使える新しいセキュリティ検出ルールを継続的に追加しています。インテグレーションやその他の新機能のリリースにより高品質な検出を提供することを目指していますが、多くの場合、ルールを一般公開する前に、大規模な環境での検出パフォーマンスを観察する必要があります。これにより、Datadog の Security Research チームは、当社の基準を満たさない検出の機会を改善または非推奨するための時間を確保できます。

## カスタム検出ルール {#custom-detection-rules}

環境やワークロードに基づいてルールをカスタマイズする必要がある状況が発生する可能性があります。たとえば AAP を使用している場合、事業を展開していない地理的な場所から機密性の高いアクションを実行するユーザーを検出する検出ルールをカスタマイズすることがあります。

[カスタムルールを作成](#create-detection-rules)するには、デフォルトのルールを複製してコピーを編集するか、独自のルールをゼロから作成します。

## 検出ルールの検索とフィルター {#search-and-filter-detection-rules}

Datadog ですぐに使える検出ルールとカスタム検出ルールを確認するには、[[{{< ui >}}Security Settings{{< /ui >}}] (セキュリティ設定)][10] ページに移動します。ルールは製品ごと (App and API Protection、Cloud Security、Cloud SIEM) に個別のページに一覧表示されます。

ルールを検索およびフィルタリングするには、検索ボックスとファセットを使用して値でクエリを実行します。たとえば、特定のルールタイプのルールのみを表示するには、そのルールタイプにカーソルを合わせて `only` を選択します。また、受信した問題を調査およびトリアージする際には、`source` や `severity` などのファセットでフィルタリングすることもできます。

{{< img src="security/default_detection_rules.png" alt="[Configuration] (構成) ページには、デフォルトおよびカスタムの Cloud SIEM 検出ルールが表示されます。" width="100%">}}

## 検出ルールの作成 {#create-detection-rules}

カスタム検出ルールを作成するには、[Detection Rules] (検出ルール) ページの右上隅にある [{{< ui >}}New Rule{{< /ui >}}] (ルールの新規作成) ボタンをクリックします。[既存のデフォルトルールまたはカスタムルールを複製して](#clone-a-rule)、テンプレートとして使用することもできます。

詳しい手順については、以下の記事を参照してください。

- [Cloud SIEM][11]
- [AAP][12]
- [Cloud Security の誤構成][13]
- [Workload Protection][14]

## 検出ルールの管理 {#manage-detection-rules}

検出ルールは Datadog の [SIEM][16] ページまたは [Workload Protection][17] ページで管理できます。以下の手順では、各ページでこれらのアクションを実行する方法を説明しますが、検出ルールをクリックしてサイドパネルで開いた場合にも、これらのオプションを利用できます。

### ルールの有効化・無効化 {#enable-or-disable-rules}

ルールを有効または無効にするには、ルール名の右側にあるスイッチを切り替えます。

また、ルールの一括有効化、無効化も可能です。

1. [{{< ui >}}Select Rules{{< /ui >}}] (ルールを選択) をクリックします。
1. 有効化または無効化したいルールを選択します。
1. [{{< ui >}}Bulk Actions{{< /ui >}}] (一括アクション) ドロップダウンメニューをクリックします。
1. [{{< ui >}}Enable Rules{{< /ui >}}] (ルールを有効化) または [{{< ui >}}Disable Rules{{< /ui >}}] (ルールを無効化) を選択します。

### ルールを編集する {#edit-a-rule}

すぐに使える検出ルールとカスタム検出ルールを編集できます。元のルールを直接編集せずに保持する場合は、[ルールを複製](#clone-a-rule)し、複製したルールに変更を加えてから、[元のルールを無効化](#enable-or-disable-rules)できます。

ルールを編集するには、ルールの縦 3 点メニューをクリックし、[{{< ui >}}Edit default rule{{< /ui >}}] (デフォルトルールを編集) または [{{< ui >}}Edit rule{{< /ui >}}] (ルールを編集) を選択します。

### ルールの複製 {#clone-a-rule}

ルールを複製するには、ルールの縦 3 点メニューをクリックし、[{{< ui >}}Clone rule{{< /ui >}}] (ルールを複製) を選択します。

ルールの複製は、既存のルールを複製して設定を多少変更し、他の検出領域をカバーしたい場合に役立ちます。たとえば、ログ検出ルールを複製し、[{{< ui >}}Threshold{{< /ui >}}] (しきい値) から [{{< ui >}}Anomaly{{< /ui >}}] (異常) に変更することで、同じクエリとトリガーを使用して脅威検出に新しい側面を追加できます。

### ルールを削除する {#delete-a-rule}

ルールを削除するには、ルールの縦 3 点メニューをクリックし、[{{< ui >}}Delete rule{{< /ui >}}] (ルールを削除) を選択します。

ルールを一括削除することもできます。

1. [{{< ui >}}Select Rules{{< /ui >}}] (ルールを選択) をクリックします。
1. 削除するルールを選択します。
1. [{{< ui >}}Bulk Actions{{< /ui >}}] (一括アクション) ドロップダウンメニューをクリックします。
1. [{{< ui >}}Delete Rules{{< /ui >}}] (ルールを削除) を選択します。

### ルールのバージョン履歴の確認 {#see-the-version-history-for-a-rule}

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="GitHub OAuth アクセストークンの侵害のバージョン履歴が表示されています" style="width:80%;" >}}

ルールのバージョン履歴は次の目的で使用します。
- 検出ルールの過去のバージョンを表示し、時間の経過に伴う変更を把握する。
- コラボレーションを改善するため、誰が変更を行ったかを確認する。
- 差分付きのバージョンを比較し、変更内容と影響を分析する。

ルールのバージョン履歴を表示するには、次のようにします。
1. [[Security Settings] (セキュリティ設定)][15] ページに移動します。左側のナビゲーションパネルで、次の操作を行います。
    - AAP: [{{< ui >}}App and API Protection{{< /ui >}}] をクリックし、[{{< ui >}}Detection Rules{{< /ui >}}] (検出ルール) をクリックします。
    - Cloud Security: [{{< ui >}}Cloud Security{{< /ui >}}] をクリックし、[{{< ui >}}Threat Detection Rules{{< /ui >}}] (脅威検出ルール) をクリックします。
    - Cloud SIEM: [{{< ui >}}Cloud SIEM{{< /ui >}}] をクリックし、[{{< ui >}}Detection Rules{{< /ui >}}] (検出ルール) をクリックします。
1. 目的のルールをクリックし、[{{< ui >}}Edit rule{{< /ui >}}] (ルールを編集) をクリックします。
1. ルールエディターで [{{< ui >}}Version History{{< /ui >}}] (バージョン履歴) をクリックして、過去の変更を確認します。
   - 特定のバージョンをクリックすると、行われた変更を確認できます。
   - [{{< ui >}}Open Version Comparison{{< /ui >}}] (バージョン比較を開く) をクリックしてバージョン間の変更内容を確認し、比較する 2 つのバージョンを選択します。比較を同じパネルに表示するには、[{{< ui >}}Unified{{< /ui >}}] (統合) をクリックします。
     - 赤色で強調表示されているデータは、変更または削除されたデータを示します。
     - 緑色で強調表示されているデータは、追加されたデータを示します。

### 編集権限の制限{#restrict-edit-permissions}

{{% security-products/detection-rules-granular-access %}}

### 生成されたシグナルの表示{#view-generated-signals}

[Signals Explorer][1] でルールのセキュリティシグナルを表示するには、縦の 3 点リーダーメニューをクリックして [{{< ui >}}View generated signals{{< /ui >}}] (生成されたシグナルを表示) を選択します。これは、ルールごとに複数のソース間でシグナルを相関付ける場合や、ルールの監査を完了する場合に役立ちます。

### ルールのエクスポート{#export-a-rule}

ルールのコピーをエクスポートするには、ルールをクリックします。サイドパネルでルールが開きます。[{{< ui >}}Export{{< /ui >}}] (エクスポート) をクリックし、[{{< ui >}}Export rule to JSON{{< /ui >}}] (ルールを JSON にエクスポート) または [{{< ui >}}Export rule to Terraform{{< /ui >}}] (ルールを Terraform にエクスポート) を選択します。

ルールを一括エクスポートすることもできます。

1. [{{< ui >}}Select Rules{{< /ui >}}] (ルールを選択) をクリックします。
1. エクスポートするルールを選択します。
1. [{{< ui >}}Bulk Actions{{< /ui >}}] (一括アクション) ドロップダウンメニューをクリックします。
1. [{{< ui >}}Export to JSON{{< /ui >}}] (JSON にエクスポート) または [{{< ui >}}Export to Terraform{{< /ui >}}] (Terraform にエクスポート) を選択します。

## ルール非推奨 {#rule-deprecation}

すべての検出ルールの定期的な監査を行い、高い忠実度のシグナル品質を維持します。非推奨のルールは、改良されたルールに置き換えられます。

ルール非推奨のプロセスは以下の通りです。

- ルールに、非推奨日が記載された警告が表示されます。UI では警告は以下の場所に表示されます。
    - [Signal] (シグナル) サイドパネルの [{{< ui >}}Rule Details{{< /ui >}}] (ルールの詳細) > [{{< ui >}}Playbook{{< /ui >}}] (プレイブック) セクション
    - [Misconfigurations] (誤構成) サイドパネル (Cloud Security Misconfigurations のみ)
    - その特定のルールの [ルールエディター][10]
- ルールが非推奨になった後、そのルールが削除されるまで 15 か月の期間があります。これは、15 か月のシグナル保持期間によるものです。この期間中は、UI で [ルールを複製](#clone-a-rule)することで、ルールを再度有効にできます。
- 一度削除されたルールは、複製して再度有効にすることはできません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: /ja/security/default_rules/
[3]: /ja/security/cloud_siem/
[4]: /ja/security/cloud_security_management/misconfigurations/
[5]: /ja/security/workload_protection/
[6]: /ja/security/cloud_security_management/identity_risks/
[7]: /ja/security/application_security/
[8]: /ja/tracing/
[9]: /ja/agent/
[10]: https://app.datadoghq.com/security/configuration/
[11]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[12]: /ja/security/application_security/policies/custom_rules/
[13]: /ja/security/cloud_security_management/misconfigurations/custom_rules
[14]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-a-custom-detection-rule
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security/siem/rules
[17]: https://app.datadoghq.com/security/workload-protection/detection-rules