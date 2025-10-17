---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/unity
- /ja/real_user_monitoring/mobile_and_tv_monitoring/unity/troubleshooting
description: Unity Monitoring の問題をトラブル シューティングする方法を学びます。
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: ソース コード
  text: dd-sdk-unity のソースコード
- link: https://github.com/DataDog/unity-package
  tag: ソース コード
  text: Unity SDK のパッケージ URL
- link: real_user_monitoring/unity/
  tag: ドキュメント
  text: Unity Monitoring について学ぶ
title: Unity SDK の問題のトラブル シューティング
---

## 概要

Datadog RUM で予期しない動作が発生した場合は、このガイドを使用して問題を解決してください。引き続き問題がある場合は、追加のサポートについて [Datadog サポート][1] にお問い合わせください。

## デバッグを容易にするために sdkVerbosity を設定する

アプリを実行できているにもかかわらず、Datadog サイトで期待どおりのデータが表示されない場合は、初期化の一部として次のコードを追加してみてください:

{{< code-block lang="cs" >}}
DatadogSdk.Instance.SetSdkVerbosity(CoreLoggerLevel.Debug);
{{< /code-block >}}

これにより、SDK が何をしているか、どのようなエラーに遭遇しているかについての追加情報が出力され、お客様と Datadog サポートが問題を絞り込むのに役立つ場合があります。

## SDK がデータを送信しない

<div class="alert alert-info">Datadog は Unity Editor からのデータ送信をサポートしていません。iOS および Android のシミュレーター、エミュレーター、実機からのみ送信をサポートします。</div>

Datadog にデータがまったく表示されない場合:

1. Unity Editor からではなく、iOS または Android のシミュレーター、エミュレーター、または実機でアプリを実行していることを確認してください。
2. 初期化の一部として `TrackingConsent` を設定していることを確認してください。初期化中は追跡の同意が `TrackingConsent.Pending` に設定され、
Datadog が情報を送信する前に `TrackingConsent.Granted` に設定する必要があります。

   {{< code-block lang="cs" >}}
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
{{< /code-block >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help