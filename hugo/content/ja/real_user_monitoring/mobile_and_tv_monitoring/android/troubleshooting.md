---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/android
description: Android Monitoring の問題をトラブル シューティングする方法を学びます。
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android ソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: リアルユーザーモニタリングについて
title: Android SDK の問題のトラブル シューティング
---

## 概要

Datadog RUM で予期せぬ動作が発生した場合、このガイドを使用して問題を迅速に解決してください。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。

## Datadog RUM が初期化されているかどうか確認
ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

```kotlin
if (Datadog.isInitialized()) {
    // ご使用のコード
}
```

## デバッグ
アプリケーションを書く際、`setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。

```kotlin
Datadog.setVerbosity(Log.INFO)
```

## 2.0.0 への移行

SDK v1 を使用していた場合、バージョン `2.0.0` でいくつかの変更点があります。詳細は[移行ガイド][2]を参照してください。

## "Deobfuscation failed" warning

スタックトレースの難読化解除に失敗した場合、警告が表示されることがあります。スタックトレースがもともと難読化されていない場合は、この警告は無視してかまいません。そうでない場合は、[RUM Debug Symbols ページ][3]でアップロード済みのマッピング ファイルをすべて確認してください。[RUM Debug Symbols を用いた難読化スタックトレースの調査][4]も併せてご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/MIGRATION.MD
[3]: https://app.datadoghq.com/source-code/setup/rum
[4]: /ja/real_user_monitoring/guide/debug-symbols