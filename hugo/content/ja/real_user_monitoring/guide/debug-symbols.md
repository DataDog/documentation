---
description: RUM でデバッグシンボルを使用して、難読化されたモバイルおよび Web アプリケーションのエラーを調査するために、スタックトレースをデバッグおよび難読化解除します。
title: RUM デバッグシンボルで難読化されたスタックトレースを調査する
---
[RUM Debug Symbols ページ][1]には、特定の種類の RUM アプリケーションに対してアップロードされたすべてのデバッグシンボルが一覧表示されます。このページを使用して、難読化されたスタックトレースを調査できます。

<div class="alert alert-info">ソースコードの解決のためにスタックトレースをサービスおよびバージョンと自動的に関連付けるには、<a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context">Source Code Context ビルドプラグイン</a>を使用してください。</div>

RUM または Error Tracking でスタックトレースが適切に難読化解除されない場合、次のエラーメッセージが表示されます: _このアプリケーションのデバッグシンボルが見つからなかったため、スタックトレースを難読化解除できませんでした。アプリケーションを難読化していない場合は、このメッセージを無視してください。難読化している場合は、デバッグシンボルをアップロードすることで、難読化解除されたスタックトレースを確認できるようになります。アップロードされたすべてのシンボルは、RUM Debug Symbols ページで表示できます。_

{{< img src="real_user_monitoring/guide/debug-symbols/deobfuscation-failed-message.png" alt="難読化解除に失敗しました: このアプリケーションのマップファイルが見つからなかったため、スタックトレースを難読化解除できませんでした。アプリケーションを難読化していない場合は、このメッセージを無視してください。難読化している場合は、マッピングファイルをアップロードすることで、難読化が解除されたスタックトレースを確認できます。アップロードされたすべてのファイルは、RUM Debug Symbols ページで表示できます。" >}}

これは、いくつかの理由で発生する可能性があります。

### スタックトレースが難読化されていない{#the-stack-trace-was-not-obfuscated}

Datadog は、難読化されていないスタックトレース (ローカルテストの実行時や非本番環境用ビルドなどから生成されたもの) を含め、すべてのスタックトレースの難読化解除を試みます。

この警告は無視できます。スタックトレースは既に読み取り可能な状態です。

### このバージョン用のデバッグシンボルがアップロードされていない{#no-debug-symbols-uploaded-for-this-version}

[RUM Debug Symbols ページ][1]を使用して、アプリケーションのデバッグシンボルが存在するかどうかを確認してください。このページは {{< ui >}}type{{< /ui >}} (JavaScript、WebAssembly、Android、iOS、React Native、Flutter) でフィルタリングされます。フィルターを使用して、目的のデバッグシンボルを見つけてください。

アプリケーションのデバッグシンボルがない場合は、デバッグシンボルを[アップロードしてください][2]。

<div class="alert alert-danger">
各デバッグシンボルのサイズが **500 MB** の制限を超えないようにしてください。超えた場合、アップロードは拒否されます。
iOS dSYM の場合、最大 **2 GB** までの個別のファイルがサポートされています。
</div>

### デバッグシンボルのタグが一致しない{#debug-symbol-tags-do-not-match}

Datadog は、デバッグシンボルとスタックトレースを照合するためにさまざまなタグを使用します。これらのタグは、アプリケーションの種類ごとに異なります。

| アプリケーションの種類| マッチングに使用されるタグの組み合わせ|
| ---- | ---- |
| JavaScript| `service`、`version`、`path`|
| WebAssembly| `build_id` |
| Android | v1.13.0 以降: `build_id`<br/> それより前のバージョン: `service`、`version`、`variant`|
| iOS | `uuid` |
| React Native | `service`、`version`、`bundle_name`、`platform`。これらのフィールドで複数のソースマップが一致する場合は、`build_number` が最も高いものを選択|
| Flutter | `service`、`version`、`variant`、`architecture` |

[RUM Debug Symbols ページ][1]には、これらのタグの値が表示されます。不一致が見つかった場合は、正しいタグの組み合わせでデバッグシンボルを再度アップロードしてください。



[1]: https://app.datadoghq.com/source-code/setup/rum
[2]: /ja/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file