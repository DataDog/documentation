---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/detection-as-code-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM を使用して、コードとしての検出を構築、テスト、およびスケールする
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: ブログ
  text: Datadog Cloud SIEM MITRE ATT&CK マップを使用して、検出カバレッジを強化するためのギャップを特定する
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: ブログ
  text: クラウド環境に十分なセキュリティカバレッジを構築する
- link: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
  tag: ブログ
  text: Datadog Cloud SIEM でカスタム検出ルールを作成するためのベストプラクティス
- link: https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats
  tag: ラーニングセンター
  text: Cloud SIEM で脅威を検出および調査する
- link: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
  tag: ラーニングセンター
  text: カスタム Cloud SIEM 検出ルールを作成する
title: 検出とモニター
---
## 概要 {#overview}

Datadog テレメトリを監視し、[すぐに使える検出ルール](#out-of-the-box-detection-rules)を使用するか、[カスタムルールを作成](#custom-detection-rules)して脅威を検出します。脅威が検出されると、セキュリティシグナルが生成されます。さらに、[抑制](#suppressions)を追加して検出ルールを調整し、特定の条件下でシグナルが生成されないようにすることができます。これにより、生成されるセキュリティシグナルの精度と関連性を向上させることができます。

{{< img src="security/security_monitoring/detection_rules/detection_rule_side_panel.png" alt="シグナルをトリガーする条件が表示されている検出ルールのサイドパネル" style="width:100%;" >}}

## 検出ルール {#detection-rules}

### すぐに使える検出ルール {#out-of-the-box-detection-rules}

Cloud SIEM では、[すぐに使える検出ルール][1]の広範なリストを提供しています。Cloud SIEM コンテンツパックを有効にして構成すると、すぐに使える検出ルールによって、ログ、Audit Trail イベント、および Event Management イベントの分析が自動的に開始されます。

すぐに使える検出ルールを編集して、以下を行うことができます。

- ルールの名前を変更します。
- クエリを拡張します。元のクエリは編集できませんが、カスタムクエリを追加することは可能です。
- 重大度の設定を {{< ui >}}Set conditions{{< /ui >}} セクション内で変更します。
- プレイブックを変更します。

### カスタム検出ルール {#custom-detection-rules}

すぐに使える検出ルールは脅威シナリオの大半をカバーしていますが、特定のユースケースに合わせてカスタム検出ルールを作成することもできます。カスタム検出ルールでは、ログ検索構文を使用してログクエリを作成および結合することで、監視対象の個々のサービス、アカウント、またはイベントをターゲットにすることができます。また、IP アドレスの位置情報や HTTP リクエストのステータスコードなどの情報を使用して、これらのクエリを強化することもできます。

クエリに一致するログに対して、それが脅威であるかどうか、およびセキュリティシグナルを生成すべきかどうかを判断する条件を設定し、脅威の重大度を示すことができます。セキュリティシグナルは脅威に関する詳細を提供し、カスタマイズ可能なプレイブックを含みます。これには、セキュリティポリシーや修復ステップなどの情報が記載されています。

詳細については、[カスタム検出ルール][2]を参照してください。

### ルール非推奨 {#rule-deprecation}

すぐに使えるすべての検出ルールの定期的な監査を行い、高い忠実度のシグナル品質を維持します。非推奨のルールは、改善されたルールに置き換えられます。

ルール非推奨のプロセスは以下の通りです。

1. ルールに、非推奨日が記載された警告が表示されます。UI では警告は以下の場所に表示されます。
    - シグナルサイドパネルの {{< ui >}}Rule Details{{< /ui >}} > {{< ui >}}Playbook{{< /ui >}} セクション
    - その特定のルールの[ルールエディター][3]
2. ルールが非推奨になった後、そのルールが削除されるまで 15 か月の期間があります。これは、15 か月のシグナル保持期間によるものです。この期間中は、UI で[ルールを複製][3]することで、ルールを再度有効にできます。
3. 一度削除されたルールは、複製して再度有効にすることはできません。

## 抑制 {#suppressions}

セキュリティシグナルはインフラストラクチャーに対する潜在的な脅威を警告しますが、誤検知が生成されることもあります。例えば、アプリケーションの負荷テストによってリクエストが急増した場合、多数のセキュリティシグナルがトリガーされる可能性があります。このようなシナリオで誤検知を減らすため、検出ルールに抑制クエリを定義して、シグナルが生成されないようにすることができます。また、抑制ルールを作成して、複数の検出ルール全体に適用される一般的な抑制条件を設定することもできます。

詳細については、[抑制][4]を参照してください。

## 動的重大度 {#dynamic-severity}

セキュリティシグナルの重大度を、その影響を受けるアセットに基づいて調整できます。重大度レベルのカスタマイズやカスタムタグを適用したり、特定のルールにのみ変更が適用されるようにすることができます。

詳細については、[動的重大度][6]を参照してください。

## MITRE ATT&CK マップ {#mitre-attck-map}

検出ルールを設定した後、Cloud SIEM [MITRE ATT&CK マップ][5]を使用して、MITRE ATT&CK フレームワークに対するルールを調査および可視化し、攻撃者の手法を把握できるようにします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/#cat-cloud-siem-log-detection
[2]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules
[3]: /ja/security/detection_rules/#clone-a-rule
[4]: /ja/security/cloud_siem/detect_and_monitor/suppressions
[5]: /ja/security/cloud_siem/detection_rules/mitre_attack_map/
[6]: /ja/security/cloud_siem/detect_and_monitor/dynamic_severity