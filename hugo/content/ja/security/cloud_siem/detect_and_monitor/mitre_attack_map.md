---
aliases:
- /ja/security/cloud_siem/detection_rules/attack_map
- /ja/security/cloud_siem/detection_rules/mitre_attack_map
disable_toc: false
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/
  tag: ドキュメント
  text: カスタム検出ルールを作成する
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: ブログ
  text: Datadog Cloud SIEM MITRE ATT&CK マップを使用して、検出カバレッジを強化するためのギャップを特定する
title: MITRE ATT&CK マップ
---
## 概要{#overview}

<div class="alert alert-danger">MITRE ATT&CK マップは <a href="https://attack.mitre.org/matrices/enterprise/">MITRE ATT&CK Enterprise</a> のみが対象です。</div>

MITRE ATT&CK フレームワークは、特定の脅威モデルや手法を開発するために使用されるナレッジベースです。Cloud SIEM MITRE ATT&CK マップを使用すると、Datadog の標準ルールおよびユーザー作成のカスタム検出ルールと照らし合わせて MITRE ATT&CK フレームワークを調査および可視化できます。MITRE ATT&CK マップは、検出ルールの密度をヒートマップとして表示して、攻撃者の手法を可視化します。セキュリティチームはこのヒートマップを使用して、組織やチームに関連するカバレッジのギャップを評価し、検出ルールの防御機能の改善に優先順位を付けることができます。

## MITRE ATT&CK マップで検出ルールを表示する{#view-detection-rules-in-the-mitre-attck-map}

MITRE ATT&CK フレームワークと照らし合わせて検出ルールを表示するには、次の手順を実行します。
1. [[Detection Rules][1]] ページに移動します。
1. [{{< ui >}}Rules List{{< /ui >}}] の隣にある [{{< ui >}}MITRE ATT&CK Map{{< /ui >}}] ボタンをクリックします。
1. ページの左下にあるサイズ変更ボタンを使って、展開表示と縮小表示を切り替えてください。

マップのデフォルト表示では、アクティブなソースに対する Datadog の標準ルールとカスタムルールのすべてが、攻撃手法ごとに分類されて表示されます。アクティブなソースとは、Cloud SIEM インデックスで検出および分析されたログのソースのことです。

**注**: [Cloud SIEM Legacy][5] の場合、[Security Filters][2] が設定されていない限り、取り込まれたすべてのログが Cloud SIEM によって分析されます。

すべてのソースのマップを表示するには、[{{< ui >}}Visualize{{< /ui >}}] ドロップダウンメニューで [{{< ui >}}All Sources{{< /ui >}}] を選択します。これにより、ログからの脅威の検出に現在使用されていないものを含め、すべての標準ルールが表示されます。

ルール密度ボタンをクリックすると、特定のルール数に基づいてマップを可視化できます。たとえば、[{{< ui >}}High 7+{{< /ui >}}] をクリックすると、7 つ以上のルールが有効になっているタイルのみがマップに表示されます。

### 攻撃手法の情報と関連ルールを表示する{#view-an-attacker-techniques-information-and-related-rules}

手法に関する詳細情報と、その手法を監視するルールを表示するには、次の手順を実行します。

1. [MITRE ATT&CK Map][3] ページで、手法のタイルをクリックします。
1. この手法にカスタムルールを作成する場合は、[{{< ui >}}Create Custom Rule{{< /ui >}}] をクリックしてください。カスタムルールの作成について詳しくは、「[検出ルール][4]」を参照してください。**注**: カスタムルールがアクティブなソース内に表示されるようにするには、検出ルールで適切なソースタグを定義する必要があります。
1. [{{< ui >}}Rules monitoring this Technique{{< /ui >}}] セクションで次のことができます。
	1. 検索クエリを入力して、特定のルールに絞り込む。
  1. 作成日、ルールタイプ、ルール名、ソース、または最も高い重大度で並べ替えます。
  1. この手法に対する非推奨ルールを表示するには、[{{< ui >}}Show deprecated rules{{< /ui >}}] を切り替えます。

### カスタムルールに攻撃者の手法タグと戦術タグを追加する{#add-attacker-technique-and-tactic-tags-to-custom-rules}

カスタムルールがマップに表示されるのは、ルールエディターでルールに正しい MITRE 戦術と手法の両方のタグが付けられている場合のみです。戦術と手法も正しいペアになっていることが必要です。形式とペアが正しくない場合、検索バーを使用してそのルールをフィルタリングしても、ルールはマップに表示されません。

カスタムルールにタグを付けるための形式と、戦術タグおよび手法タグの正しいペアの例を次に示します。

- `tactic:<tactic number>-<tactic name>`
    - 例: `tactic:TA0001-Initial-Access`
- `technique:<technique number>-<technique name>`
    - 例: `technique:T1566-Phishing`

形式について以下の詳細に注意してください。
- タグのプレフィックス (`tactic` または `technique`) は **小文字でなければなりません**
- 手法番号の大文字と小文字は区別されません
    - 例: `TA0001` または `ta0001`
- ダッシュとアンダースコアは交換可能です
    - 例: `technique:T1566-Phishing` または `technique:T1566_Phishing`

**注**: 戦術と手法は、「[MITRE ATT&CK マップ][3]」ページに記載されている MITRE ATT&CK バージョンに基づく必要があります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/rules
[2]: /ja/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/
[3]: https://app.datadoghq.com/security/siem/rules?query=product=siem&sort=date&viz=attck-map
[4]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold
[5]: /ja/security/cloud_siem/guide/determine-cloud-siem-product/