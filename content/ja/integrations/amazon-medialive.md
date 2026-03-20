---
aliases:
- /ja/integrations/amazon_medialive
app_id: amazon-medialive
categories:
- aws
- metrics
- cloud
custom_kind: integration
description: AWS Elemental MediaLive は、放送品質のライブ ビデオ処理サービスです。
media: []
title: Amazon MediaLive
---
## 概要

AWS Elemental MediaLive は、放送品質のライブ ビデオ処理サービスです。

このインテグレーションを有効にすると、MediaLive のすべてのメトリクスを Datadog で確認できます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS integration タイル](https://app.datadoghq.com/integrations/amazon-web-services) の metric collection で、`MediaLive` が有効になっていることを
   確認します。
1. [Datadog - MediaLive インテグレーション](https://app.datadoghq.com/integrations/amazon-medialive) をインストールします。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.medialive.active_alerts** <br>(gauge) | 現在アクティブなアラートの平均数|
| **aws.medialive.active_outputs** <br>(gauge) | 生成され、送信先へ正常に書き込まれている出力の平均数|
| **aws.medialive.channel_input_error_seconds** <br>(count) | チャネル入力に 1 つ以上の回復不能パケットが含まれていた秒数<br>_単位は second_ |
| **aws.medialive.configured_bitrate** <br>(rate) | 設定された最大ビットレートの平均<br>_単位は bit_ |
| **aws.medialive.configured_bitrate.p90** <br>(rate) | 設定された最大ビットレートの 90 パーセンタイル値<br>_単位は bit_ |
| **aws.medialive.configured_bitrate_available** <br>(gauge) | ネットワーク条件に照らして、デバイスが満たせる設定ビットレートの割合の平均<br>_単位は percent_ |
| **aws.medialive.configured_bitrate_available.p90** <br>(gauge) | ネットワーク条件に照らして、デバイスが満たせる設定ビットレートの割合の 90 パーセンタイル値<br>_単位は percent_ |
| **aws.medialive.encoder_bitrate** <br>(rate) | 実際にエンコードされているビットレートの平均<br>_単位は bit_ |
| **aws.medialive.encoder_bitrate.p90** <br>(rate) | 実際にエンコードされているビットレートの 90 パーセンタイル値<br>_単位は bit_ |
| **aws.medialive.encoder_running** <br>(gauge) | エンコーダーが入力信号を正常に処理しているかどうかを示す指標 (時間平均)|
| **aws.medialive.error_seconds** <br>(count) | 1 つ以上のパケットがドロップされ、回復されなかった秒数<br>_単位は second_ |
| **aws.medialive.fec_column_packets_received** <br>(count) | 両方の FEC ストリーム (ポート 5002 とポート 5004) で受信した FEC column パケット数。0 以外の値は、FEC が機能していることを示します。このメトリクスは、チャネルに FEC を含む RTP 入力がある場合にのみ有用です。<br>_単位は packet_ |
| **aws.medialive.fec_row_packets_received** <br>(count) | 両方の FEC ストリーム (ポート 5002 とポート 5004) で受信した FEC row パケット数。0 以外の値は、FEC が機能していることを示します。このメトリクスは、チャネルに FEC を含む RTP 入力がある場合にのみ有用です。<br>_単位は packet_ |
| **aws.medialive.fill_msec** <br>(gauge) | MediaLive が映像出力をフィル フレームで埋めている現在の継続時間 (フィル期間) の平均。フィル期間は、パイプラインが想定どおりの時間内に入力からコンテンツを受信できなくなった時点で始まります。<br>_単位は millisecond_ |
| **aws.medialive.input_locked** <br>(gauge) | デバイスが入力信号を正常にロックできているかどうかを示します。時間平均の指標値です。|
| **aws.medialive.input_timecodes_present** <br>(gauge) | パイプラインが埋め込みタイムコードを含む入力を受信しているかどうかを示す指標の平均値。埋め込みタイムコードはソースに含まれている場合もあれば、SMPTE-2038 の補助データに含まれている場合もあります。0 (false) は存在しないこと、1 (true) は存在することを示します。|
| **aws.medialive.input_video_frame_rate** <br>(rate) | ソース ビデオの平均フレーム レート。このメトリクスは入力の健全性を把握する指標です。値が安定しない場合は、ソースや MediaLive とアップストリーム システムの間のネットワークに問題がないか確認してください。|
| **aws.medialive.linked_to_stream_endpoint** <br>(gauge) | デバイスが AWS 内のストリーミング エンドポイントに接続されていることを示します (時間平均)。|
| **aws.medialive.network_in** <br>(gauge) | MediaLive への受信トラフィック レートの平均。この値には、MediaLive-push 入力や pull 入力で受信するすべてのトラフィック、pull 入力のアップストリーム システムからの応答、任意の出力に対するダウンストリーム システムからの応答、さらに DNS 名前解決や NTP などのインスタンス トラフィックが含まれます。チャネルが取り込みを行っていないときでも、一定のトラフィックは発生します。|
| **aws.medialive.network_out** <br>(gauge) | MediaLive からの送信トラフィック レートの平均。この値には、メディア出力、pull 入力用の HTTP GET リクエスト、NTP トラフィック、DNS トラフィックなど、MediaLive から送信されるすべてのトラフィックが含まれます。チャネルが出力を配信していないときでも、一定のトラフィックは発生します。|
| **aws.medialive.not_recovered_packets** <br>(count) | 転送中に失われ、エラー訂正でも回復できなかったパケット数<br>_単位は packet_ |
| **aws.medialive.output_4xx_errors** <br>(count) | 出力配信中に送信先から受信した 4xx HTTP エラー数<br>_単位は error_ |
| **aws.medialive.output_5xx_errors** <br>(count) | 出力配信中に送信先から受信した 5xx HTTP エラー数<br>_単位は error_ |
| **aws.medialive.output_audio_level_dbfs** <br>(gauge) | フル スケール基準のデシベル (dBFS) で表した出力音声レベルの平均|
| **aws.medialive.output_audio_level_lkfs** <br>(gauge) | フル スケール基準の K-weighted ラウドネス (LKFS) で表した出力音声レベルの平均|
| **aws.medialive.output_video_frame_rate** <br>(rate) | 出力ビデオの平均フレーム レート|
| **aws.medialive.pipelines_locked** <br>(gauge) | 2 つのパイプラインが互いに同期しているかどうかを示す指標の平均値。このメトリクスは標準チャネルにのみ適用され、そのチャネル内の HLS、MediaPackage、Microsoft Smooth、UDP 出力でのみ有効です。MediaLive は、2 つのパイプラインを同期させるためにパイプライン ロックを使用します。|
| **aws.medialive.primary_input_active** <br>(gauge) | 自動入力フェイルオーバー ペア内のプライマリ入力がアクティブかどうかを示す指標の平均値。値が 1 の場合はプライマリ入力がアクティブで、正常であることを示します。値が 0 の場合は非アクティブです。|
| **aws.medialive.recovered_packets** <br>(count) | 転送中に失われたものの、エラー訂正によって回復されたパケット数<br>_単位は packet_ |
| **aws.medialive.rtp_packets_lost** <br>(count) | 受信伝送で失われた RTP パケット数。ここで「失われた」とは、FEC で回復できなかったパケットを指します。<br>_単位は packet_ |
| **aws.medialive.rtp_packets_received** <br>(count) | RTP 入力で受信した RTP パケット数。この数には、メイン RTP ソース (ポート 5000) と FEC データ (ポート 5002、ポート 5004) が含まれます。<br>_単位は packet_ |
| **aws.medialive.rtp_packets_recovered_via_fec** <br>(count) | FEC によって回復された RTP パケット数<br>_単位は packet_ |
| **aws.medialive.streaming** <br>(gauge) | デバイスが入力信号を MediaLive に正常にストリーミングしていることを示します (時間平均)。|
| **aws.medialive.svq_time** <br>(gauge) | 直近 10 秒間の平均で、MediaLive がリアル タイムで動作を続けられるよう、エンコーダーが画質最適化を抑えてエンコードを高速化していた時間の割合<br>_単位は percent_ |
| **aws.medialive.temperature** <br>(gauge) | デバイス温度の平均 (摂氏)。推奨される動作条件については、デバイスのドキュメントを参照してください。<br>_単位は degree celsius_ |
| **aws.medialive.total_packets** <br>(count) | AWS ストリーミング エンドポイントに正常に配信されたパケットの総数<br>_単位は packet_ |
| **aws.medialive.udp_input_loss_seconds** <br>(count) | チャネルが RTP または MediaConnect 入力のソースからパケットを受信していない秒数 (入力損失期間)。各データ ポイントの値は 0 ～ 10 秒の範囲です。<br>_単位は second_ |
| **aws.medialive.using_hdmi** <br>(gauge) | デバイスで現在選択されている入力が HDMI かどうかを示します。期間内の平均値。|
| **aws.medialive.using_sdi** <br>(gauge) | デバイスで現在選択されている入力が SDI かどうかを示します。期間内の平均値。|
| **aws.medialive.active_alerts.maximum** <br>(gauge) | 現在アクティブなアラートの最大数|
| **aws.medialive.active_alerts.minimum** <br>(gauge) | 現在アクティブなアラートの最小数|
| **aws.medialive.active_outputs.maximum** <br>(gauge) | 生成され、送信先へ正常に書き込まれている出力の最大数|
| **aws.medialive.active_outputs.minimum** <br>(gauge) | 生成され、送信先へ正常に書き込まれている出力の最小数|
| **aws.medialive.encoder_running.maximum** <br>(gauge) | エンコーダーが入力信号を正常に処理しているかどうかを示す指標 (期間内の最大値)。|
| **aws.medialive.encoder_running.minimum** <br>(gauge) | エンコーダーが入力信号を正常に処理しているかどうかを示す指標 (期間内の最小値)。|
| **aws.medialive.fill_msec.maximum** <br>(gauge) | MediaLive が映像出力をフィル フレームで埋めている現在の継続時間 (フィル期間) の最大値。フィル期間は、パイプラインが想定どおりの時間内に入力からコンテンツを受信できなくなった時点で始まります。<br>_単位は millisecond_ |
| **aws.medialive.fill_msec.minimum** <br>(gauge) | MediaLive が映像出力をフィル フレームで埋めている現在の継続時間 (フィル期間) の最小値。フィル期間は、パイプラインが想定どおりの時間内に入力からコンテンツを受信できなくなった時点で始まります。<br>_単位は millisecond_ |
| **aws.medialive.input_locked.maximum** <br>(gauge) | デバイスが入力信号を正常にロックできているかどうかを示します (期間内の指標の最大値)。|
| **aws.medialive.input_locked.minimum** <br>(gauge) | デバイスが入力信号を正常にロックできているかどうかを示します (期間内の指標の最小値)。|
| **aws.medialive.input_timecodes_present.maximum** <br>(gauge) | パイプラインが埋め込みタイム コードを含む入力を受信しているかどうかを示す指標の最大値。埋め込みタイム コードはソースに含まれている場合もあれば、SMPTE-2038 の補助データに含まれている場合もあります。0 (false) は存在しないこと、1 (true) は存在することを示します。|
| **aws.medialive.input_timecodes_present.minimum** <br>(gauge) | パイプラインが埋め込みタイム コードを含む入力を受信しているかどうかを示す指標の最小値。埋め込みタイム コードはソースに含まれている場合もあれば、SMPTE-2038 の補助データに含まれている場合もあります。0 (false) は存在しないこと、1 (true) は存在することを示します。|
| **aws.medialive.input_video_frame_rate.maximum** <br>(rate) | ソース ビデオの最大フレーム レート。このメトリクスは入力の健全性を把握する指標です。値が安定しない場合は、ソースや MediaLive とアップストリーム システムの間のネットワークに問題がないか確認してください。|
| **aws.medialive.input_video_frame_rate.minimum** <br>(rate) | ソース ビデオの最小フレーム レート。このメトリクスは入力の健全性を把握する指標です。値が安定しない場合は、ソースや MediaLive とアップストリーム システムの間のネットワークに問題がないか確認してください。|
| **aws.medialive.linked_to_stream_endpoint.maximum** <br>(gauge) | デバイスが AWS 内のストリーミング エンドポイントに接続されていることを示します (期間内の最大値)。|
| **aws.medialive.linked_to_stream_endpoint.minimum** <br>(gauge) | デバイスが AWS 内のストリーミング エンドポイントに接続されていることを示します (期間内の最小値)。|
| **aws.medialive.network_in.maximum** <br>(gauge) | MediaLive への受信トラフィック レートの最大値。この値には、MediaLive-push 入力や pull 入力で受信するすべてのトラフィック、pull 入力のアップストリーム システムからの応答、任意の出力に対するダウンストリーム システムからの応答、さらに DNS 名前解決や NTP などのインスタンス トラフィックが含まれます。チャネルが取り込みを行っていないときでも、一定のトラフィックは発生します。|
| **aws.medialive.network_in.minimum** <br>(gauge) | MediaLive への受信トラフィック レートの最小値。この値には、MediaLive-push 入力や pull 入力で受信するすべてのトラフィック、pull 入力のアップストリーム システムからの応答、任意の出力に対するダウンストリーム システムからの応答、さらに DNS 名前解決や NTP などのインスタンス トラフィックが含まれます。チャネルが取り込みを行っていないときでも、一定のトラフィックは発生します。|
| **aws.medialive.network_out.maximum** <br>(gauge) | MediaLive からの送信トラフィック レートの最大値。この値には、メディア出力、pull 入力用の HTTP GET リクエスト、NTP トラフィック、DNS トラフィックなど、MediaLive から送信されるすべてのトラフィックが含まれます。チャネルが出力を配信していないときでも、一定のトラフィックは発生します。|
| **aws.medialive.network_out.minimum** <br>(gauge) | MediaLive からの送信トラフィック レートの最小値。この値には、メディア出力、pull 入力用の HTTP GET リクエスト、NTP トラフィック、DNS トラフィックなど、MediaLive から送信されるすべてのトラフィックが含まれます。チャネルが出力を配信していないときでも、一定のトラフィックは発生します。|
| **aws.medialive.output_audio_level_dbfs.maximum** <br>(gauge) | フル スケール基準のデシベル (dBFS) で表した出力音声レベルの最大値|
| **aws.medialive.output_audio_level_dbfs.minimum** <br>(gauge) | フル スケール基準のデシベル (dBFS) で表した出力音声レベルの最小値|
| **aws.medialive.output_audio_level_lkfs.maximum** <br>(gauge) | フル スケール基準の K-weighted ラウドネス (LKFS) で表した出力音声レベルの最大値|
| **aws.medialive.output_audio_level_lkfs.minimum** <br>(gauge) | フル スケール基準の K-weighted ラウドネス (LKFS) で表した出力音声レベルの最小値|
| **aws.medialive.output_video_frame_rate.maximum** <br>(rate) | 出力ビデオの最大フレーム レート|
| **aws.medialive.output_video_frame_rate.minimum** <br>(rate) | 出力ビデオの最小フレーム レート|
| **aws.medialive.pipelines_locked.maximum** <br>(gauge) | 2 つのパイプラインが互いに同期しているかどうかを示す指標の最大値。このメトリクスは標準チャネルにのみ適用され、そのチャネル内の HLS、MediaPackage、Microsoft Smooth、UDP 出力でのみ有効です。MediaLive は、2 つのパイプラインを同期させるためにパイプライン ロックを使用します。|
| **aws.medialive.pipelines_locked.minimum** <br>(gauge) | 2 つのパイプラインが互いに同期しているかどうかを示す指標の最小値。このメトリクスは標準チャネルにのみ適用され、そのチャネル内の HLS、MediaPackage、Microsoft Smooth、UDP 出力でのみ有効です。MediaLive は、2 つのパイプラインを同期させるためにパイプライン ロックを使用します。|
| **aws.medialive.primary_input_active.maximum** <br>(gauge) | 自動入力フェイル オーバー ペア内のプライマリ入力がアクティブかどうかを示す指標の最大値。値が 1 の場合はプライマリ入力がアクティブで、正常であることを示します。値が 0 の場合は非アクティブです。|
| **aws.medialive.primary_input_active.minimum** <br>(gauge) | 自動入力フェイル オーバー ペア内のプライマリ入力がアクティブかどうかを示す指標の最小値。値が 1 の場合はプライマリ入力がアクティブで、正常であることを示します。値が 0 の場合は非アクティブです。|
| **aws.medialive.streaming.maximum** <br>(gauge) | デバイスが入力信号を MediaLive に正常にストリーミングしていることを示します (期間内の最大値)。|
| **aws.medialive.streaming.minimum** <br>(gauge) | デバイスが入力信号を MediaLive に正常にストリーミングしていることを示します (期間内の最小値)。|
| **aws.medialive.temperature.maximum** <br>(gauge) | デバイス温度の最大値 (摂氏)。推奨される動作条件については、デバイスのドキュメントを参照してください。<br>_単位は degree celsius_ |
| **aws.medialive.temperature.minimum** <br>(gauge) | デバイス温度の最小値 (摂氏)。推奨される動作条件については、デバイスのドキュメントを参照してください。<br>_単位は degree celsius_ |
| **aws.medialive.using_hdmi.maximum** <br>(gauge) | デバイスで現在選択されている入力が HDMI かどうかを示します。期間内の最大値。|
| **aws.medialive.using_hdmi.minimum** <br>(gauge) | デバイスで現在選択されている入力が HDMI かどうかを示します。期間内の最小値。|
| **aws.medialive.using_sdi.maximum** <br>(gauge) | デバイスで現在選択されている入力が SDI かどうかを示します。期間内の最大値。|
| **aws.medialive.using_sdi.minimum** <br>(gauge) | デバイスで現在選択されている入力が SDI かどうかを示します。期間内の最小値。|

### イベント

MediaLive インテグレーションにはイベントは含まれません。

### サービス チェック

MediaLive インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。