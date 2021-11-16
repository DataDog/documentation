---
title: トラブルシューティング
kind: documentation
further_reading:
  - link: https://github.com/DataDog/dd-sdk-ios
    tag: Github
    text: dd-sdk-ios ソースコード
  - link: /real_user_monitoring
    tag: ドキュメント
    text: Datadog Real User Monitoring
---
## Datadog SDK が適切に初期化されているかどうか確認

Datadog SDKを構成し、アプリを初回実行した後、Xcode のデバッガコンソールを確認します。SDK はいくつかの一貫性チェックを実装しており、構成ミスがある場合は関連する警告を出力します。

## デバッグ作業
アプリケーションの作成時に、`verbosityLevel` 値を設定することで開発ログを有効にすることができます。設定したレベルと同等以上の優先度を持つ SDK からの関連メッセージが、Xcode のデバッガコンソールに出力されます。

```swift
Datadog.verbosityLevel = .debug
```

すべての処理が完了すると、RUM データのバッチが正しくアップロードされたことを示す以下のような出力が表示されます。
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**推奨:** `DEBUG` コンフィギュレーションで `Datadog.verbosityLevel` を使用し、`RELEASE` で設定を解除してください。　

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]:/ja/real_user_monitoring/ios/advanced_configuration/#initialization-parameters