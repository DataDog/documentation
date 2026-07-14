---
aliases:
- /ja/integrations/active_directory
app_id: active-directory
categories:
- windows
custom_kind: integration
description: Microsoft Active Directory のメトリクスを収集してグラフ化
integration_version: 4.2.0
media: []
supported_os:
- windows
title: Active Directory
---
## 概要

Microsoft Active Directory からメトリクスを取得し、パフォーマンスの可視化と監視に活用できます。

## セットアップ

### インストール

Agent の Active Directory チェックは [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

ドメイン環境に Datadog Agent をインストールする場合は、[Agent のインストール要件](https://docs.datadoghq.com/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment) を参照してください。

### 設定

#### メトリクスの収集

1. Active Directory のパフォーマンス データを収集するには、[Agent の設定ディレクトリ](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) のルートにある `conf.d/` フォルダ内の `active_directory.d/conf.yaml` を編集します。デフォルト設定では localhost のメトリクスはすでに収集されるはずです。利用可能な設定オプションは、[active_directory.d/conf.yaml のサンプル](https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example) を参照してください。

1. [Agent を再起動する](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

**注**: このチェックはバージョン 1.13.0 以降でメトリクス収集の実装が刷新されており、Python 3 が必要です。Python 3 を利用できないホスト、または従来版のチェックを使いたい場合は、次の [設定 (config)](https://github.com/DataDog/integrations-core/blob/7.33.x/active_directory/datadog_checks/active_directory/data/conf.yaml.example) を参照してください。

### 検証

[Agent の status サブコマンドを実行する](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) と、Checks セクション配下に `active_directory` が表示されていることを確認できます。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **active_directory.dra.inbound.bytes.after_compression** <br>(gauge) | 他サイトのディレクトリ システム エージェント (DSA) から 1 秒あたりに受信する圧縮レプリケーション データの、圧縮後サイズ (バイト)。<br>_表示単位は byte_ |
| **active_directory.dra.inbound.bytes.before_compression** <br>(gauge) | 他サイトの DSA から 1 秒あたりに受信する圧縮レプリケーション データの、圧縮前 (未圧縮) サイズ (バイト)。<br>_表示単位は byte_ |
| **active_directory.dra.inbound.bytes.not_compressed** <br>(gauge) | 送信元で圧縮されていないレプリケーション データの、1 秒あたりの受信サイズ (バイト)。つまり同一サイト内の別 DSA から受信するデータです。<br>_表示単位は byte_ |
| **active_directory.dra.inbound.bytes.total** <br>(gauge) | レプリケーション経由で 1 秒あたりに受信した総バイト数。未圧縮データ (一度も圧縮されない) と圧縮データ (圧縮後) の合計です。<br>_表示単位は byte_ |
| **active_directory.dra.inbound.objects.applied_persec** <br>(gauge) | レプリケーション パートナーから 1 秒あたりに受信し、ローカル ディレクトリ サービスが適用したオブジェクト数。受信しても適用されない変更 (例: 更新がすでに反映済みの場合) は除外されます。このカウンターにより、他サーバーで生成された変更を起点として、このサーバーでどれだけレプリケーション更新が発生しているかを把握できます。<br>_表示単位は object_ |
| **active_directory.dra.inbound.objects.filtered_persec** <br>(gauge) | レプリケーション パートナーから 1 秒あたりに受信したオブジェクトのうち、適用すべき更新が含まれていなかったものの数。<br>_表示単位は object_ |
| **active_directory.dra.inbound.objects.persec** <br>(gauge) | レプリケーション パートナーからの受信レプリケーションで、1 秒あたりに受け取ったオブジェクト数。<br>_表示単位は object_ |
| **active_directory.dra.inbound.objects.remaining** <br>(gauge) | フル同期が完了するまでに残っているオブジェクト数。<br>_表示単位は object_ |
| **active_directory.dra.inbound.objects.remaining_in_packet** <br>(gauge) | 現在のディレクトリ レプリケーションの更新パケットで受信したオブジェクト更新のうち、まだローカル サーバーに適用されていない数。監視対象サーバーが変更を受信しているにもかかわらず、データベースへの反映に時間がかかっているかどうかの判断に使えます。<br>_表示単位は object_ |
| **active_directory.dra.inbound.properties.applied_persec** <br>(gauge) | 照合ロジックの結果として、受信レプリケーション経由で 1 秒あたりに適用されたオブジェクト プロパティ変更の数。|
| **active_directory.dra.inbound.properties.filtered_persec** <br>(gauge) | レプリケーション中に 1 秒あたりに受信したオブジェクト プロパティ変更のうち、すでに反映済みだったものの数。|
| **active_directory.dra.inbound.properties.total_persec** <br>(gauge) | レプリケーション パートナーから 1 秒あたりに受信したオブジェクト プロパティ変更の総数。|
| **active_directory.dra.inbound.values.dns_persec** <br>(gauge) | レプリケーション パートナーから 1 秒あたりに受信したオブジェクト プロパティ値のうち、識別名に属するプロパティの値の数。ほかのオブジェクトを参照するオブジェクトも含まれます。この値が高い場合、受信した変更がデータベースへ適用されるまでに時間がかかる理由の手がかりになります。|
| **active_directory.dra.inbound.values.total_persec** <br>(gauge) | レプリケーション パートナーから 1 秒あたりに受信したオブジェクト プロパティ値の総数。受信オブジェクトには 1 つ以上のプロパティがあり、各プロパティは 0 個以上の値を持ちます。値が 0 の場合は、そのプロパティを削除することを示します。|
| **active_directory.dra.outbound.bytes.after_compression** <br>(gauge) | 他サイトの DSA へ 1 秒あたりに送信する圧縮レプリケーション データの、圧縮後サイズ (バイト)。<br>_表示単位は byte_ |
| **active_directory.dra.outbound.bytes.before_compression** <br>(gauge) | 他サイトの DSA へ 1 秒あたりに送信する圧縮レプリケーション データの、圧縮前 (未圧縮) サイズ (バイト)。<br>_表示単位は byte_ |
| **active_directory.dra.outbound.bytes.not_compressed** <br>(gauge) | 送信元で圧縮されていない送信レプリケーション データの、1 秒あたりの送信サイズ (バイト)。つまり同一サイト内の DSA への送信データです。<br>_表示単位は byte_ |
| **active_directory.dra.outbound.bytes.total** <br>(gauge) | 1 秒あたりに送信した総バイト数。未圧縮データ (一度も圧縮されない) と圧縮データ (圧縮後) の合計です。<br>_表示単位は byte_ |
| **active_directory.dra.outbound.objects.filtered_persec** <br>(gauge) | アウトバウンド レプリケーション パートナーが 1 秒あたりに「更新不要」として確認応答したオブジェクト数。アウトバウンド パートナーがまだ保持していなかったオブジェクトも含まれます。<br>_表示単位は object_ |
| **active_directory.dra.outbound.objects.persec** <br>(gauge) | アウトバウンド レプリケーションを通じて、1 秒あたりにレプリケーション パートナーへ送信したオブジェクト数。<br>_表示単位は object_ |
| **active_directory.dra.outbound.properties.persec** <br>(gauge) | 1 秒あたりに送信したプロパティ数。ソース サーバーがオブジェクトを返しているかどうかを把握できます。場合によってはサーバーが正常に動作せず、オブジェクトをすばやく返せなくなったり、まったく返さなくなったりすることがあります。|
| **active_directory.dra.outbound.values.dns_persec** <br>(gauge) | レプリケーション パートナーへ 1 秒あたりに送信したオブジェクト プロパティ値のうち、識別名 (distinguished name) に属するプロパティの値の数。|
| **active_directory.dra.outbound.values.total_persec** <br>(gauge) | レプリケーション パートナーへ 1 秒あたりに送信したオブジェクト プロパティ値の総数。|
| **active_directory.dra.replication.pending_synchronizations** <br>(gauge) | このサーバーで未処理のままキューに入っているディレクトリ同期の数。レプリケーションの滞留 (backlog) を判断するのに役立ちます。数が大きいほど滞留が多いことを示します。|
| **active_directory.dra.sync_requests_made** <br>(gauge) | コンピューターの最終再起動以降に、レプリケーション パートナーへ送信した同期リクエスト数。<br>_表示単位は request_ |
| **active_directory.ds.threads_in_use** <br>(gauge) | ディレクトリ サービスで現在使用中のスレッド数 (ディレクトリ サービス プロセス内のスレッド数とは異なります)。クライアントによる API 呼び出しを処理しているスレッド数を表し、追加の CPU が有効かどうかを判断する材料になります。<br>_表示単位は thread_ |
| **active_directory.ldap.bind_time** <br>(gauge) | 直近で成功した LDAP バインドが完了するまでの時間 (ミリ秒)。<br>_表示単位は millisecond_ |
| **active_directory.ldap.client_sessions** <br>(gauge) | 接続中の LDAP クライアント セッション数。<br>_表示単位は session_ |
| **active_directory.ldap.searches_persec** <br>(gauge) | LDAP クライアントが 1 秒あたりに実行した検索操作数。|
| **active_directory.ldap.successful_binds_persec** <br>(gauge) | 1 秒あたりに成功した LDAP バインド数。|

### イベント

Active Directory チェックにはイベントは含まれません。

### サービス チェック

Active Directory チェックにはサービス チェックは含まれません。

## トラブルシューティング

お困りの場合は、[Datadog サポート](https://docs.datadoghq.com/help/) までお問い合わせください。