---
algolia:
  tags:
  - service catalog
aliases:
- /ja/tracing/service_catalog/investigating
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: ドキュメント
  text: Service Definition API によるサービスの登録
- link: /tracing/service_catalog/guides/understanding-service-configuration
  tag: ガイド
  text: サービス構成を理解する
- link: /tracing/service_catalog/guides/upstream-downstream-dependencies
  tag: ガイド
  text: アクティブインシデント時の上流と下流の依存関係を見る
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: ブログ
  text: サービス定義 JSON スキーマによるサービスカタログエントリーの管理
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を視覚化する
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: ブログ
  text: サービスカタログの設定を簡素化することで、サービスにタグやメタデータを簡単に追加できます
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: ブログ
  text: 私は GitHub Actions を Datadog のサービスカタログに使っています。あなたもそうするべきですよ
title: Investigate a Service
---

サービスをクリックすると、サイドパネルが開き、2 つのメインセクションに詳細が表示されます。

## ビューごとのサービス詳細

- チームの連絡先、ソースコード、ドキュメントやダッシュボードなどの補足情報へのリンクなど、サービス定義にある**所有権情報**。
- デプロイステータス、SLO、進行中のインシデント、エラー情報などの**信頼性情報**。
- リクエスト、エラー、レイテンシー、ダウンストリームサービスが費やした時間を示す**パフォーマンスグラフ**。
- サービスのライブラリに存在する既知の脆弱性、攻撃の時期や種類、攻撃者の特定、サービスに影響を及ぼすセキュリティの脅威などの**セキュリティ情報**。
- サービスのクラウド費用をリソースタイプ別に分類して示す**コスト情報**。
- サービスに関連する CI パイプラインの平均ビルド期間や成功率など、ソフトウェアデリバリープロセスに関する**本番前の情報**と、CI による静的解析結果。

## インフラストラクチャーの調査
**Performance** タブから、調査対象のサービスを探します。*Infrastructure* 列でこのサービスに関連するリソースをクリックして、**サービスコンテキストマップで表示**します。

{{< img src="tracing/service_catalog/access_service_context_map.png" alt="サービスカタログの Performance タブからサービスコンテキストマップへのアクセスで、Infrastructure 列がハイライト表示されている画像" style="width:90%;" >}}

サービスコンテキストマップは、サービスと関連インフラストラクチャーとの間の関係と依存関係の概要を提供します。このビューを使用して、アップストリームとダウンストリームのサービスおよびインフラストラクチャーを調べ、問題の発生源を分析します。


## 構成の詳細
- サービスのデータを収集できる Datadog 製品の**セットアップの完全性ステータス**。
- ライブラリのインベントリーをダウンロードする機能を含む**使用する外部ライブラリ**。
- YAML による**サービス定義**と、そのサービスのソースコードへのリンク。
- このサービスの上流と下流にあるサービスを表示するインタラクティブなサービスマップ。
- 事前定義済みのダッシュボードと Watchdog 推奨のダッシュボードのリストを表示する**定義済み＆関連ダッシュボード**。
- サービスのスコアと最終評価のタイムスタンプのスナップショットを表示する**サービススコアカード**。
- **ベータ版**: [リモート構成][1]を有効にして最新の Agent を構成した Java と .NET サービス用のアクティブライブラリ構成では、[トレースサンプリングレート][3]を調整し (0.0 から 1.0)、[ログ挿入][2]を有効にしてトレースとログデータを相関させ、このサービスから Datadog に入力されるすべてのトレースに適用する HTTP ヘッダータグを指定することができます。Setup Guidance タブの **Active Library Configuration** の横にある **Edit** をクリックして、これらの設定を変更し、サービスを再起動せずにすぐに適用します。

  {{< img src="tracing/service_catalog/service_details_remote_config.png" alt="Datadog UI でのサービスの構成オプション" style="width:80%;" >}}

**View Related** をクリックし、ドロップダウンメニューからページを選択すると、APM サービスページやこのサービスのサービスマップなど、Datadog の関連ページ、または分散型トレーシング、インフラストラクチャー、ネットワークパフォーマンス、ログ管理、RUM、Continuous Profiler などの関連テレメトリーデータページにナビゲートします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/remote_config/
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[3]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
