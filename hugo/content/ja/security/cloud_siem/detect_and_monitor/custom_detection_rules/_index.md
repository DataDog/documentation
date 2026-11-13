---
aliases:
- /ja/security_platform/detection_rules/cloud_siem
- /ja/security_platform/detection_rules/security_monitoring
- /ja/security_platform/detection_rules/create_a_new_rule
- /ja/security_platform/cloud_siem/log_detection_rules/
- /ja/cloud_siem/detection_rules/security_monitoring/
- /ja/security/detection_rules/cloud_siem/
- /ja/security/detection_rules/security_monitoring
- /ja/security/detection_rules/create_a_new_rule
- /ja/security/cloud_siem/log_detection_rules/
- /ja/security/cloud_siem/detection_rules/
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/
  tag: ドキュメント
  text: カスタム検出ルールを作成する
- link: /cloud_siem/default_rules/
  tag: ドキュメント
  text: デフォルトの Cloud SIEM 検出ルールの構成
- link: /cloud_siem/explorer/
  tag: ドキュメント
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: https://www.datadoghq.com/blog/detect-unauthorized-third-parties-aws/
  tag: ブログ
  text: AWS アカウントの不正な第三者を検出する
- link: https://www.datadoghq.com/blog/anomaly-detection-rules-datadog/
  tag: ブログ
  text: 異常検出ルールによるセキュリティ脅威の検出
- link: /security/notifications/variables/
  tag: ドキュメント
  text: セキュリティ通知変数について
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: ブログ
  text: Datadog Cloud SIEM で Cloudflare Zero Trust を監視
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM で 1Password をモニターする
- link: https://www.datadoghq.com/blog/content-anomaly-detection-cloud-siem/
  tag: ブログ
  text: Cloud SIEMのコンテンツ異常検知を使用して、スパイクや新しい値だけでなく、それ以外の異常も検知します。
- link: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
  tag: ラーニングセンター
  text: カスタム Cloud SIEM 検出ルールを作成する
title: カスタム検出ルール
type: documentation
---
## 概要{#overview}

すぐに使える検出ルールは脅威シナリオの大半をカバーしていますが、特定のユースケースに合わせてカスタム検出ルールを作成することもできます。カスタムルールの作成方法については、[ルールの作成][1]を参照してください。

{{< img src="security/security_monitoring/detection_rules/custom_detection_rules_ui.png" alt="作成可能な検出タイプと方法を示すルール作成ページ" style="width:100%;" >}}

## ルールタイプ {#rule-types}

以下のタイプのカスタム検出ルールを作成できます。

- リアルタイムルール: 受信ログを継続的に監視および分析します。
- スケジュールルール: 事前にスケジュールされた間隔で実行され、ログデータを分析します。
- ヒストリカルジョブ: 過去のログに対して検出を実行し、検出をバックテストします。

## 検出方法 {#detection-methods}

カスタム検出ルールまたはヒストリカルジョブを作成する際、以下の検出方法を利用できます。

- しきい値: クエリ数が指定されたケース（しきい値以上 (`a > N`) またはしきい値以下 (`a < N` または `a <= 0`) のケースを含む）を満たしたときに検知します。
- 新しい値: 属性が全く新しい値に変更されたときに検知します。
- 異常: 動作が過去のベースラインから逸脱したときに検知します。
- [コンテンツ異常][6]: イベントのコンテンツが過去のベースラインと比較して異常である場合に検知します。
- [不可能な移動][7]: ユーザーアクティビティログで不可能な速度が検知された場合に検知します。
- サードパーティ: サードパーティのセキュリティログをシグナルにマッピングし、ログ属性に基づいて重大度を設定します。
- シグナル相関: 複数のシグナルを組み合わせて新しいシグナルを生成し、より複雑なユースケースでアラートを出せるようにして、アラート疲れを軽減します。

## Reference Tableに基づくログのフィルター {#filter-logs-based-on-reference-tables}

<div class="alert alert-warning">1,000,000行を超えるReference Tableは、イベントのフィルターには使用できません。Reference Tableの作成および管理方法の詳細については、<a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Reference Tableを使用したカスタムメタデータの追加</a>を参照してください。 </div>

Reference Tableを使用すると、メタデータとログを組み合わせて、アプリケーションの問題を解決するための詳細な情報を得ることができます。ルールのクエリを定義する際、Reference Tableに基づいたクエリフィルターを追加して、ルックアップクエリを実行できます。この機能の作成および管理の詳細については、[Reference Tables][10]ガイドを参照してください。

次の例では、製品情報を含むReference Tableを使用して、ログのフィルタリングとエンリッチメントを行っています。

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="Reference Tableの検索オプションが強調表示されたログ検出ルールクエリの編集画面" style="width:100%;" >}}

## ユニットテスト {#unit-testing}

ユニットテストを使用してサンプルログに対してルールをテストし、検出ルールが期待どおりに機能していることを確認します。これは、まだ発生していないイベントの検出ルールを作成する場合など、そのイベントの実際のログがない場合に役立ちます。例：`login_attempt`フィールドを含むログがあり、`login_attempt:failed`を含むログを検出したいが、`login_attempt:success`を含むログしかない場合。ルールをテストするには、`login_attempt:success`を含むログをコピーし、`login_attempt`フィールドを`failed`に変更してサンプルログを作成します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/
[2]: https://app.datadoghq.com/security/siem/rules
[3]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/threshold/
[4]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/new_value/
[5]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/anomaly/
[6]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/
[7]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/
[8]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/third_party/
[10]: /ja/integrations/guide/reference-tables/