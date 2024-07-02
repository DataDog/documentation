---
title: How Mobile Session Replay Impacts App Performance
description: Performance benchmarking for Mobile Session Replay.
aliases:
further_reading:
    - link: /real_user_monitoring/session_replay/mobile
      tag: Documentation
      text: Mobile Session Replay
    - link: /real_user_monitoring/session_replay/mobile/privacy_options
      tag: Documentation
      text: Mobile Session Replay Privacy Options
    - link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
      tag: Documentation
      text: Setup and Configure Mobile Session Replay
    - link: /real_user_monitoring/session_replay/mobile/troubleshooting
      tag: Documentation
      text: Troubleshoot Mobile Session Replay
    - link: /real_user_monitoring/session_replay
      tag: Documentation
      text: Session Replay
---

## 概要
セッションリプレイは、Datadog SDK コアのバッチ化とスマートアップロードの既存のメカニズムを活用します。これらのメカニズムは、アプリケーションから Datadog サーバーへの効率的で最適化されたデータ転送を可能にします。複数のイベントをまとめてバッチ化し、適切な間隔でインテリジェントにアップロードすることで、セッションリプレイはネットワークと帯域幅の使用への全体的な影響を最小限に抑え、ネットワークリソースの効率的な利用を保証します。

モバイルセッションリプレイ SDK は、アプリケーションのパフォーマンスに影響を与えることなく、シームレスなユーザー体験をサポートします。

## メインスレッド
アプリケーションの現在の画面をキャプチャするシステムは UI Thread で実行されるため、UI の更新が遅延する可能性があります。しかし、Datadog は高度に最適化されたプロセスを使用して、SDK が UI Thread で実行する作業負荷を最小限に抑えています。

画面のキャプチャは 64 ミリ秒から 100 ミリ秒の間 (プラットフォームによって異なります) で行われ、1 回の画面キャプチャにかかる時間は 3 ミリ秒です。収集されたデータの処理はすべてバックグラウンドのスレッドで行われるため、アプリケーションのパフォーマンスに影響を与えません。

## ネットワーク
総アップロード量を最小限に抑えるため、Datadog は高度に最適化されたワイヤーフォーマットを採用しています。その結果、Datadog サーバーに送信されるデータの平均帯域幅使用量は、iOS では約 12 KB/s、Android では 1.22 KB/s となります。イメージレコーディングが有効になっている場合、イメージの多いコンテンツを含むアプリケーションでは、初期ボリュームが若干大きくなる可能性があります。デバイスがネットワークから切断された場合、高帯域幅の接続が再確立されるまで、データはデバイスのディスクストレージにバッファリングされます。

## アプリケーションサイズ
Datadog の SDK は、厳格な標準に従い、サードパーティの依存関係を最小限に抑えることを目指しています。このアプローチにより、SDK は可能な限り多くのネイティブフレームワークコードを活用します。Android では、AAR パッケージの Datadog 独自のコードによって生成されるバイナリサイズは 480 kB です。アプリケーションサイズの影響に関する詳細は[こちら][1]をご覧ください。iOS の場合、エクスポートされる `*.ipa` ファイルのサイズは約 200 kB 大きくなります。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/docs/sdk_performance.md?plain=1#L119