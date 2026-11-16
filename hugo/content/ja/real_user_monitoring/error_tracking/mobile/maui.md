---
aliases:
- /ja/real_user_monitoring/error_tracking/maui
- /ja/error_tracking/frontend/mobile/maui/
code_lang: maui
code_lang_weight: 55
description: .NET MAUI アプリケーションに Error Tracking を設定します。
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: Error Tracking を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エクスプローラーで Error Tracking データを視覚化する
title: .NET MAUI のクラッシュレポートと Error Tracking
type: multi-code-lang
---
## 概要 {#overview}

Error Tracking は、.NET MAUI SDK から収集されたエラーを処理します。

.NET MAUI のクラッシュレポートと Error Tracking を有効にすると、包括的なクラッシュレポート、シンボル化されたネイティブ iOS スタックトレース、および iOS と Android 全体にわたるエラートレンドを取得できます。クラッシュレポートは [{{< ui >}}Error Tracking{{< /ui >}}][1] に表示されます。

### C# Error Tracking {#c-error-tracking}

C# Error Trackingは、RUM が有効になるとすぐに自動的に有効になります。追加の構成は必要ありません。SDK は以下をキャプチャします。

- 未処理の C# 例外 (`AppDomain.UnhandledException`)
- 監視されていないタスクの例外 (`TaskScheduler.UnobservedTaskException`)

`DdRum.AddError` を使用して手動でエラーを報告することもできます。

### ネイティブクラッシュレポート (オプション) {#native-crash-reporting-optional}

`NativeCrashReportEnabled` は、ネイティブの iOS または Android コードに起因するクラッシュ (例: iOS での Objective-C/Swift クラッシュ、Android での JNI/Kotlin クラッシュ) もキャプチャする場合に**のみ**必要です。C# Error Tracking はこれがなくても機能します。

ネイティブクラッシュレポートを有効にするには、SDK 構成で `NativeCrashReportEnabled = true` を設定します。

```csharp
.UseDatadog(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    NativeCrashReportEnabled = true,
})
```

{% alert level="info" %}
`NativeCrashReportEnabled = true` の場合、アプリケーションをクラッシュさせる未処理の C# 例外は **2 回**報告されます。1 回は `AppDomain.UnhandledException` によってキャプチャされた C# エラーとして、もう 1 回はプラットフォームのクラッシュレポーターによってキャプチャされたネイティブの iOS または Android クラッシュとして報告されます。これらのイベントは同じ RUM セッションおよびビューを共有するため、エクスプローラーで関連付けることができます。

どちらか一方のみを保持したい場合は、[`ErrorEventMapper`][5] を使用して、ワークフローに合わないコピーを破棄してください (例: `Source` または `Stacktrace` コンテンツでフィルタリング)。
{% /alert %}

## セットアップ {#setup}

まだ .NET MAUI SDK をセットアップしていない場合は、[アプリ内セットアップ手順][2]に従うか、[.NET MAUI セットアップドキュメント][3]を参照してください。

## シンボル化されたスタックトレースを取得する {#get-symbolicated-stack-traces}

ネイティブ iOS クラッシュレポートのメソッド名とクラッシュアドレスを解決するには、アプリの `.dSYM` バンドルを Datadog にアップロードします。シンボル化は、各クラッシュイベント時にサーバー側で行われます。

| スタックトレースの種類 | シンボルファイル | 解決方法 |
|---|---|---|
| ネイティブ iOS クラッシュ (および AOT コンパイルされた C# メソッド名) | `.dSYM` バンドル | Datadog にアップロードされ、各クラッシュイベント時にサーバー側で解決 |

iOS `.dSYM` バンドルは、SDK がアップロードする唯一のシンボルファイルです。Android R8/ProGuard マッピングファイルおよびポータブル PDB ファイルはアップロードされません。[制限事項](#limitations)を参照してください。

### `datadog-ci` でシンボルをアップロードする {#upload-symbols-with-datadog-ci}

`Datadog.Maui` NuGet パッケージには、`dotnet publish` の一部として自動的にシンボルを Datadog にアップロードする MSBuild ターゲットが含まれています。有効にするには、以下の手順を実行します。

#### 1. `datadog-ci` をインストールする {#1-install-datadog-ci}

```bash
npm install -g @datadog/datadog-ci
```

`datadog-ci version` を使用してインストールを検証します。

#### 2. Datadog API キーを設定する {#2-set-your-datadog-api-key}

`dotnet publish` を実行するシェルでキーをエクスポートします。

```bash
export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>
```

CI 環境の場合は、`DATADOG_API_KEY` をランナーの保護された/シークレット環境変数として設定します。キーをソースコントロールにコミットしないでください。

ローカルテストの場合は、キーを MSBuild プロパティ (`-p:DatadogApiKey=...`) として渡すことができますが、**`.csproj`** で `DatadogApiKey` を設定しないでください。そのファイルはチェックインされます。

#### 3. アップロードを有効にする {#3-enable-the-upload}

`DatadogUploadSymbols=true` を `.csproj` の `<PropertyGroup>` エントリとして、または `dotnet publish` コマンドラインで設定します。MSBuild ターゲットは公開後に自動的に実行され、`datadog-ci` が欠落しているか API キーが設定されていない場合は警告なしでスキップされます。

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true
```

`.dSYM` バンドルは、`.app` の隣に生成され、アップロードされます。dSYM はデバイスビルド (`-r ios-arm64`) に対してのみ生成されます。シミュレータービルド (`iossimulator-arm64`) ではアップロードがスキップされます。

### 構成 {#configuration}

すべての構成は、`.csproj` `<PropertyGroup>` または `-p:` を使用した `dotnet publish` コマンドラインのいずれかで、MSBuild プロパティを介して行われます。

| プロパティ | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `DatadogUploadSymbols` | Yes | `false` | 公開後にシンボルアップロードを有効にするには、`true` に設定します。|
| `DatadogServiceName` | No | `$(AssemblyName)` | Datadog でアプリを識別するために使用されるサービス名。実行時に `DdSdkConfiguration` に渡す `Service` と一致する必要があります。|
| `DatadogSite` | No | `datadoghq.com` | アップロードを受信する Datadog サイト (例: `datadoghq.eu`、`us5.datadoghq.com`)。`DdSdkConfiguration` に設定された `Site` の値と一致する必要があります。|
| `DatadogApiKey` | No | — | 直接渡される API キー。設定されていない場合は、代わりに `DATADOG_API_KEY` 環境変数が使用されます。|

```xml
<PropertyGroup>
  <DatadogServiceName>my-maui-app</DatadogServiceName>
  <DatadogSite>datadoghq.eu</DatadogSite>
</PropertyGroup>
```

`dotnet publish` がデフォルトで使用するターミナルロガーは、情報出力を非表示にします。Datadog のアップロードメッセージを確認するには、`-v n -tl:off` を追加してください。

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true -v n -tl:off
```

アップロード後、シンボルの処理には最大 5 分かかります。[{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4] で受信されたことを確認できます。

## 制限事項 {#limitations}

### マネージド C# スタックトレース {#managed-c-stack-traces}

マネージド C# 例外スタックトレースは、メソッド名のみに解決されます。ファイル名と行番号はまだ利用できません。

.NET MAUI リリースビルドは出荷前に C# を AOT コンパイルするため、デバイス上のランタイムはフレームをソースの場所にマッピングできません。
- iOS では、最小限のランタイムは Portable PDB ファイルをまったく読み取ることができません。
- Android では、AOT コンパイルされたフレームは `Unknown Source` を報告します。
これらのフレームを解決するには、アプリの Portable PDB (`.pdb`) とプラットフォームのネイティブデバッグ情報をサーバー側で組み合わせる必要がありますが、これはサポートされていません。Portable PDB ファイルは Datadog にアップロードされず、アプリにバンドルしても、報告されるスタックトレースにファイル情報や行情報は追加されません。

### Android シンボルのアップロード {#android-symbol-upload}

Android ビルドではシンボルのアップロードはサポートされていません。R8/ProGuard `mapping.txt` ファイルはアップロードされないため、Android クラッシュレポート内の難読化された Java/Kotlin フレームは難読化解除されません。Android のクラッシュは引き続き収集および報告されますが、難読化解除のステップのみ利用できません。

### ファイルサイズ {#file-sizing}

dSYM バンドル (iOS) は、それぞれ最大 **2 GB** になる可能性があります。

### コレクション {#collection}

SDK は、以下の動作でクラッシュレポートを処理します。

- クラッシュは SDK が初期化された後にのみ検出できます。`MauiProgram.CreateMauiApp` で可能な限り早く SDK を初期化してください。
- RUM クラッシュは、RUM ビューに関連付ける必要があります。もしクラッシュが、ビューが可視状態になる前 (またはユーザーによってアプリがバックグラウンドに移動された後) に発生した場合、そのクラッシュはミュートされ、報告されません。これを軽減するには、`DdRumConfiguration` で `TrackBackgroundEvents = true` を設定してください。
- サンプリングされたセッションで発生したクラッシュのみが保持されます。

### Android NDK クラッシュシンボル {#android-ndk-crash-symbols}

`NativeCrashReportEnabled = true` の場合、`dd-sdk-android-ndk` によってキャプチャされたネイティブ (C/C++) クラッシュのシンボル化には、ストリップされていない `.so` ファイルが必要です。

MAUI アプリでは、ネイティブの `.so` ファイルは通常、.NET ランタイム (`libmonosgen-2.0.so`、`libmonodroid.so`) および Datadog 独自の NDK ライブラリから提供されます。Datadog はこれらをサーバー側で解決するため、いずれの場合も手動でのアップロードは不要です。カスタムネイティブ C/C++ ライブラリをリリースする場合は、`datadog-ci dsyms upload <path-to-so-directory>` を使用してシンボルを手動でアップロードしてください。

## 実装をテストする {#test-your-implementation}

Crash Reporting と Error Tracking の構成を検証するには、クラッシュを発生させ、Datadog にエラーが表示されることを確認します。

1. 実機またはエミュレーターでアプリケーションを実行します (dSYM は iOS のデバイスビルドでのみ生成されます)。
2. 未処理の例外をスローするコードを実行します。たとえば、以下のとおりです。

   ```csharp
   void OnButtonClicked(object sender, EventArgs e)
   {
       throw new InvalidOperationException("Crash the app");
   }
   ```

3. クラッシュ後、アプリケーションを再起動し、SDK がクラッシュレポートをアップロードするまで待ちます。
4. [{{< ui >}}Error Tracking{{< /ui >}}][1] でイベントを確認します。デバイスビルドからのネイティブ iOS クラッシュの場合、フレームはシンボル化されます。

## トラブルシューティング {#troubleshooting}

**`Skipping symbol upload — datadog-ci is not installed`**
`npm install -g @datadog/datadog-ci` を実行し、`datadog-ci version` で検証します。

**`Skipping symbol upload — DATADOG_API_KEY is not set`**
シェルでキーをエクスポートします。`export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>`。`echo $DATADOG_API_KEY` で検証します。

**`Skipping dSYM upload — file not found`**
dSYM はデバイスビルドに対してのみ生成されます (`-r ios-arm64`)。シミュレータービルドでは dSYM は生成されません。

**公開中に Datadog の出力が表示されない**
ターミナルロガーは情報メッセージを非表示にします。`-v n -tl:off` を `dotnet publish` コマンドに追加します。

**アップロードは完了するが、Datadog にシンボルが表示されない**
シンボルの処理には最大 5 分かかります。[{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4] をチェックしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ja/real_user_monitoring/application_monitoring/maui/setup
[4]: https://app.datadoghq.com/source-code/setup/symbols
[5]: /ja/real_user_monitoring/application_monitoring/maui/advanced_configuration/#modify-or-drop-rum-events