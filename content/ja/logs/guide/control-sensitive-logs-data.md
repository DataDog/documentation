---
aliases:
- /ja/logs/guide/restrict-access-to-sensitive-data-with-rbac
further_reading:
- link: /logs/guide/logs-rbac/
  tag: Documentation
  text: ログ管理用のロールベースのアクセス制御 (RBAC) を設定する
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: 高度なログの収集を使用してログをフィルタリングおよび編集する
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: オートディスカバリーを使用してログの収集からコンテナを除外する
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog Audit Trail で、チーム全体のコンプライアンス、ガバナンス、透明性を構築します
title: 機密ログデータの管理
---

## 概要

ログには機密データが含まれている可能性があるため、ログの処理方法には特に注意する必要があります。機密データを Datadog に取り込んでいる場合、次のことを検討してください。

- 正当なトラブルシューティングと監査の目的で機密データを含むようにログを意図的に設定した場合は、「ロールベースのアクセス制御」を使用して適切な制限を設定し、Datadog アカウントにアクセスする権利を持つユーザーのみがこのデータにアクセスできるようにします。詳細については、[ログロールベースのアクセス制御 (RBAC) ユーザーズガイド][1]を参照し、組織に合わせて構成する方法を確認してください。
- 機密データのログが意図しないものである場合は、将来の懸念に先制的に対処します。詳細はこのガイド読み進めてください。

すべてのデータを管理することは、特に大規模なコラボレーションプラットフォームにおいては、困難な場合があります。このガイドでは、Datadog に取り込まれる機密データを発見し、管理するためのさまざまなオプションについて説明します。

## センシティブ データ スキャナー

[機密データスキャナー][2]は、ストリームベースのパターンマッチングサービスであり、機密データを識別、タグ付け、およびオプションで編集またはハッシュするために使用できます。この機能により、セキュリティチームとコンプライアンスチームは、機密データが組織の外部に漏洩するのを防ぐための防衛線を導入できます。機密データスキャナーは、[組織設定][3]で利用できます。

機密データを含むログのインデックスを既に作成している場合は、以下の 3 つのステップを実行します。

1. [送信されるデータの範囲を決定する](#determine-the-scope-of-the-data-being-sent)
2. [アップストリームのデータのソースを修正する](#fix-the-source-of-the-data-upstream)
3. [すでに Datadog に送信されたデータを処理する](#handle-data-already-sent-to-and-indexed-in-datadog)

## 送信されるデータのスコープを決定する

### どのログクエリが機密データを定義しますか？

最初に、機密データを説明するクエリを定義します。このクエリは機密データを含む全てのログを返します。

`version:x.y.z source:python status:debug` などのクエリがその期待に一致する可能性があります。より高度な演算子 (ワイルドカードやブール演算子など) が必要な場合は、[ログ検索構文][4]のドキュメントを参照してください。

このガイドでは、そのクエリを**機密性の高いアウトラインクエリ**と呼びます。

### 機密データは Datadog 内のどこにありますか？

ログにある機密データが Datadog プラットフォームに送信されると、それはさまざまな場所に存在する可能性があります。そのため、次の各項目を必ず確認してください (機密データが含まれている可能性が最も高いものから最も低いものの順に)。

* Datadog [インデックス][5]は、インデックスの保持に従ってログが期限切れになるまで、Datadog とともにログが保存される場所です。他の場所ではコンプライアンスの懸念が少ない可能性があるため、Datadog インデックスに注目してください。[インデックスフィルター][6]と[除外フィルター][7]をチェックして、機密データを含むログにインデックスが付けられているかどうかを確認します。

* ログ[アーカイブ][8]は、Datadog が送信したログを保存する場所です。アーカイブフィルターを設定して、アーカイブに機密ログが含まれているかどうかを確認します。

* 集計されたメトリクスを格納する[ログから生成されたメトリクス][9]。このプロセスでは、機密データが破棄されている可能性があります。カスタムメトリクスフィルターをチェックして、機密データを含むログが処理されるかどうかを確認します。

* [ログサンプル][11]が含まれている場合の[ログモニター][10]通知。機密データが送信されていた期間中にトリガーされたモニターを特に確認してください。

* [Live Tail][12]では、組織のユーザーがリアルタイムでログを閲覧できます。ブラウザにキャッシュされた 50 ログを超える永続性はなく、より広範なクエリの場合、結果を極端にサンプリングできます。

## アップストリームのデータのソースを修正する

### 機密データスキャナーを使用したストリーミングログの機密データの編集

すぐに使えるルールやカスタムルールを使って、ログに残っている[他の種類の機密データを特定し、冗長化します][2]。

### 機密ログのインデックス化を停止する

機密データスキャナーを使用していない場合、機密データを含む新しいログを完全にインデックス対象から除外するかどうかを決定します。Datadog ですでにインデックスされた機密データを含むログに対処する必要があります。

* 機密データを含むログを保持するインデックスを検索します。
* インデックスごとに、機密性の高いアウトラインクエリに基づいて除外フィルターを追加します。

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="機密性の高い除外フィルター" style="width:80%;" >}}

### Datadog への機密データの送信を停止する

もし、ある種の機密データが環境から Datadog に取り込まれることが禁止されている場合、ソース収集時にスクラビングルールを追加します。

ロガー自体を変更する方法がある場合、Datadog は、ログ収集に [Datadog Agent][13] を使用する際に、コンプライアンスに敏感なデータがプラットフォームの外部に送信されるのを防ぐためのソリューションを提供します。

* Datadog に送信する前に、ログから[機密データをスクラブ][14]します。
* または、[オートディスカバリー][15]を使い、コンテナのログ収集を細かく制御します。

[Serverless Forwarder][16] にも同様のスクラブ機能があります。

## Datadog にすでに送信されインデックス化されているデータの処理

コンプライアンス要件に従って、次の手順を実行します。すべての手順を実行する必要はないかもしれません。

### 機密ログを Datadog でクエリ不可にする (期限切れになるまで)

この手順により、機密データを含むログ (すでに送信されたログと流入し続ける可能性のあるログの両方) を Datadog (Explorer、Dashboard、Livetail) でクエリできないようにします。

[データアクセスコンフィギュレーションページ][17]と機密性の高いアウトラインクエリを使用して、組織内の全員に適用される[制限][18]を定義します。例えば、上記のクエリは、`version:x.y.z source:python status:debug` です。

**注:** 機密性の高いアウトラインクエリの**否定**を使用すると、一致するログ以外は表示されなくなります。

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="機密データアクセス" style="width:80%;" >}}

### アーカイブにパッチを適用する

機密データを削除するためにアーカイブにパッチを適用する必要がある場合は、Datadog によって生成された[アーカイブの形式][19]を参照してください。

## サポート

特定のコンプライアンスに関するご質問やサポートについては、Datadog の[サポート][20]までご連絡ください。その際、次の情報をご用意ください。

* 機密性の高いアウトラインクエリ。または、時間範囲、サービス、環境などの機密データを定義できるあらゆるもの。
* [機密データスキャナー][21]を使用するかどうか。
* 機密データがまだ Datadog に送信されているかどうか。
* 機密データが (どのインデックスで) インデックス化されているかどうか、またはメトリクスに変換されているかどうか。
* 機密データをクエリ不可にしたかどうか。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/guide/logs-rbac/
[2]: /ja/sensitive_data_scanner/
[3]: /ja/account_management/org_settings/
[4]: /ja/logs/search_syntax/
[5]: /ja/logs/indexes
[6]: /ja/logs/indexes#indexes-filters
[7]: /ja/logs/indexes#exclusion-filters
[8]: /ja/logs/archives
[9]: /ja/logs/logs_to_metrics/
[10]: /ja/monitors/types/log/
[11]: /ja/monitors/types/log/#notifications
[12]: /ja/logs/explorer/live_tail/
[13]: /ja/agent/
[14]: /ja/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[15]: /ja/agent/guide/autodiscovery-management/?tab=containerizedagent
[16]: /ja/serverless/forwarder#log-forwarding-optional
[17]: https://app.datadoghq.com/logs/pipelines/data-access
[18]: /ja/account_management/rbac/permissions/?tab=ui#logs_read_data
[19]: /ja/logs/archives/?tab=awss3#format-of-the-archives
[20]: /ja/help/
[21]: https://www.datadoghq.com/blog/sensitive-data-scanner/