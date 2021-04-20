---
title: 機密ログデータの管理
kind: ガイド
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
---
## 概要

ログには機密データが含まれている可能性があるため、ログの処理方法には特に注意する必要があります。機密データを Datadog に取り込んでいる場合、次のことを検討してください。

- 正当なトラブルシューティングと監査の目的で機密データを含むようにログを意図的に設定した場合は、「ロールベースのアクセス制御」を使用して適切な制限を設定し、Datadog アカウントにアクセスする権利を持つユーザーのみがこのデータにアクセスできるようにします。詳細については、[ログロールベースのアクセス制御 (RBAC) ユーザーズガイド][1]を参照し、組織に合わせて構成する方法を確認してください。
- 機密データのログが意図しないものである場合は、将来の懸念に先制的に対処します。詳細はこのガイド読み進めてください。

すべてのデータを制御することは、特に大規模で高度なコラボレーションプラットフォームでは困難な場合があります。このガイドでは、コンプライアンスに敏感なデータが Datadog に取り込まれた際に実行すべき 3 つの手順について説明します。

1. [送信されるデータのスコープを決定する](#determine-the-scope-of-the-data-being-sent)
2. [アップストリームのデータのソースを修正する](#fix-the-source-of-the-data-upstream)
3. [Datadog にすでに送信されているデータを処理する](#handle-data-already-sent-to-datadog)

## 送信されるデータのスコープを決定する

### どのログクエリが機密データを定義しますか？

最初に、機密データを説明するクエリを定義します。このクエリは機密データを含む全てのログを返します。

`version:x.y.z source:python status:debug` などのクエリがその期待に一致する可能性があります。より高度な演算子 (ワイルドカードやブール演算子など) が必要な場合は、[ログ検索構文][2]のドキュメントを参照してください。

このガイドでは、そのクエリを**機密性の高いアウトラインクエリ**と呼びます。

{{< img src="logs/guide/sensitive/sensitive_outline_query.png" alt="機密性の高いアウトラインクエリ" style="width:80%;" >}}

### 機密データは Datadog 内のどこにありますか？

ログにある機密データが Datadog プラットフォームに送信されると、それはさまざまな場所に存在する可能性があります。そのため、次の各項目を必ず確認してください (機密データが含まれている可能性が最も高いものから最も低いものの順に)。

* Datadog [インデックス][3]は、インデックスの保持に従ってログが期限切れになるまで、Datadog とともにログが保存される場所です。他の場所ではコンプライアンスの懸念が少ない可能性があるため、Datadog インデックスに注目してください。[インデックスフィルター][4]と[除外フィルター][5]をチェックして、機密データを含むログにインデックスが付けられているかどうかを確認します。

* ログ[アーカイブ][6]は、Datadog が送信したログを保存する場所です。アーカイブフィルターを設定して、アーカイブに機密ログが含まれているかどうかを確認します。

* 集計されたメトリクスを格納する[ログから生成されたメトリクス][7]。このプロセスでは、機密データが破棄されている可能性があります。カスタムメトリクスフィルターをチェックして、機密データを含むログが処理されるかどうかを確認します。

* [ログサンプル][9]が含まれている場合の[ログモニター][8]通知。機密データが送信されていた期間中にトリガーされたモニターを特に確認してください。

* [Livetail][10]では、組織のユーザーがリアルタイムでログを閲覧できます。ブラウザにキャッシュされた 50 ログを超える永続性はなく、より広範なクエリの場合、結果を高度にサンプリングできます。

## アップストリームのデータのソースを修正する

### 機密ログのインデックス化を停止する

これは、追加の機密データが Datadog に送信されないようにするためのオプションの手順です。ただし、Datadog にすでに送信されている機密データには対処する必要があることに注意してください。

* 機密データを保持しているインデックスのうち、ルーティングの影響を受けやすいものを見つけます。
* インデックスごとに、機密性の高いアウトラインクエリに基づいて除外フィルターを追加します。

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="機密性の高い除外フィルター" style="width:80%;" >}}

### Datadog への機密データの送信を停止する

ロガー自体を変更する方法がある場合、Datadog は、ログ収集に [Datadog Agent][11] を使用する際に、コンプライアンスに敏感なデータがプラットフォームの外部に送信されるのを防ぐためのソリューションを提供します。

* Datadog に送信する前に、ログから[機密データをスクラブ][12]します。
* または、[オートディスカバリー][13]を使い、コンテナのログ収集を細かく制御します。

[Serverless Forwarder][14] にも同様のスクラブ機能があります。

## Datadog にすでに送信されているデータを処理する

コンプライアンス要件に従って、次の手順を実行します。すべての手順を実行する必要はないかもしれません。

### 機密ログを Datadog でクエリ不可にする (期限切れになるまで)

この手順により、機密データを含むログ (すでに送信されたログと流入し続ける可能性のあるログの両方) を Datadog (Explorer、Dashboard、Livetail) でクエリできないようにします。

[データアクセスコンフィギュレーションページ][15]と機密性の高いアウトラインクエリを使用して、組織内の全員に適用される[制限][16]を定義します。例えば、上記のクエリは、`version:x.y.z source:python status:debug` です。

**注:** 機密性の高いアウトラインクエリの**否定**を使用すると、一致するログ以外は表示されなくなります。

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="機密データアクセス" style="width:80%;" >}}

### アーカイブにパッチを適用する

機密データを削除するためにアーカイブにパッチを適用する必要がある場合は、Datadog によって生成された[アーカイブの形式][17]を参照してください。

## サポート

特定のコンプライアンスに関するご質問やサポートについては、Datadog の[サポート][18]までご連絡ください。その際、次の情報をご用意ください。

* 機密性の高いアウトラインクエリ。または、時間範囲、サービス、環境などの機密データを定義できるあらゆるもの。
* 機密データがまだ Datadog に送信されているかどうか。
* 機密データが (どのインデックスで) インデックス化されているかどうか、またはメトリクスに変換されているかどうか。
* 機密データをクエリ不可にしたかどうか。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/guide/logs-rbac/
[2]: /ja/logs/search_syntax/
[3]: /ja/logs/indexes
[4]: /ja/logs/indexes#indexes-filters
[5]: /ja/logs/indexes#exclusion-filters
[6]: /ja/logs/archives
[7]: /ja/logs/logs_to_metrics/
[8]: /ja/monitors/monitor_types/log/
[9]: /ja/monitors/monitor_types/log/#notifications
[10]: /ja/logs/explorer/live_tail/
[11]: /ja/agent/
[12]: /ja/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[13]: /ja/agent/guide/autodiscovery-management/?tab=containerizedagent
[14]: /ja/serverless/forwarder#log-forwarding-optional
[15]: https://app.datadoghq.com/logs/pipelines/data-access
[16]: /ja/account_management/rbac/permissions/?tab=ui#logs_read_data
[17]: /ja/logs/archives/?tab=awss3#format-of-the-archives
[18]: /ja/help/