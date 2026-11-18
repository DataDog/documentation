---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/getting_started/security/cloud_siem/
  tag: ドキュメント
  text: Cloud SIEM の概要
- link: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
  tag: ブログ
  text: AWS CloudTrail ログを監視する際のベストプラクティス
- link: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
  tag: ブログ
  text: 認証ログを監視する際のベストプラクティス
- link: https://www.datadoghq.com/blog/ocsf-common-data-model//
  tag: ブログ
  text: Datadog Cloud SIEM で OCSF 共通データモデルを使用してデータを正規化する
title: 取り込みとエンリッチ
---
## 概要 {#overview}

Cloud SIEM の検出ルールは、ログおよびセキュリティデータを分析し、脅威が検出されたときにセキュリティシグナルを生成します。Cloud SIEM を有効にした後、監視するソースからのログを取り込んでエンリッチするように Datadog を構成します。

## セキュリティデータの取り込み {#ingest-security-data}
データを Datadog に送信する最も簡単な方法は、Cloud SIEM 専用に設計されたインテグレーションである[コンテンツパック][1]を使用することです。各コンテンツパックには、それらのログを取り込むためのインテグレーションの構成手順と、次のような内容の情報が記載されています。

- 検出ルール
- すぐに使えるインタラクティブダッシュボード
- パーサー
- SOAR ワークフロー

[コンテンツパック][1]は、多くの一般的なセキュリティテクノロジーで利用できます。

カスタムログがある場合や、Cloud SIEM の[コンテンツパック][2]ページに一覧表示されていないデータソースがある場合は、Datadog の広範な[インテグレーションライブラリ][3]でそのインテグレーションが利用可能かどうかをチェックしてください。利用できない場合は、それらのログを[カスタムログ][4]として Cloud SIEM に送信して分析できます。

## ログのエンリッチ {#enrich-logs}

### 脅威インテリジェンス {#threat-intelligence}

Datadog は、Cloud SIEM ログ用に組み込みの[脅威インテリジェンス][5]を提供しており、Datadog リファレンステーブルに保存された脅威インテリジェンスの侵害指標 (IoCs) を使用した機能強化や検索もサポートしています。詳細については、[独自の脅威インテリジェンスの持ち込み][6]を参照してください。

### ミュートされたインジケーター {#muted-indicators}

脅威インテリジェンスインジケーターが組織にとって無害である場合は、それをミュートして、Cloud SIEM がログのエンリッチメントおよび IOC エクスプローラーでそれを `benign` として評価するように設定できます。Datadog は、すべての組織に対してミュートされる、既知の無害な指標の読み取り専用リストも保持しています。詳細については、[ミュートされたインジケーター][7]を参照してください。

### オープンサイバーセキュリティフレームワーク (OCSF) {#open-cybersecurity-framework-ocsf}

[オープンサイバーセキュリティフレームワーク (OCSF)][8] は Cloud SIEM に直接統合されているため、受信したセキュリティログは、すぐに使えるパイプラインを通じて OCSF 準拠の属性で自動的にエンリッチされます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/content_packs/
[2]: https://app.datadoghq.com/security/siem/content-packs
[3]: /ja/integrations/
[4]: /ja/logs/log_collection/
[5]: /ja/security/threat_intelligence/#threat-intelligence-sources
[6]: /ja/security/cloud_siem/threat_intelligence#bring-your-own-threat-intelligence
[7]: /ja/security/cloud_siem/ingest_and_enrich/muted_indicators/
[8]: /ja/security/cloud_siem/open_cybersecurity_schema_framework