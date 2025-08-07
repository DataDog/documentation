---
aliases:
- /ja/real_user_monitoring/error_tracking/unity
code_lang: unity
code_lang_weight: 50
description: Unity のエラーを Error Tracking で追跡する方法を学習します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: ソース コード
  text: dd-sdk-unity ソース コード
- link: real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: Error Tracking について
title: Unity クラッシュ レポートおよび Error Tracking
type: multi-code-lang
---
## 概要

Crash Reporting と Error Tracking を有効化すると、Real User Monitoring と組み合わせて包括的なクラッシュ レポートとエラーの傾向を取得できます。

クラッシュ レポートは [**Error Tracking**][1] に表示されます。

## セットアップ

まだ Datadog Unity SDK を設定していない場合は、[アプリ内セットアップ手順][2] に従うか、[Flutter セットアップ ドキュメント][3] を参照してください。

### Unity ログからキャッチされていない例外を転送

Unity は、キャッチされていないすべての例外を `Debug.LogException` を使用してロガーに転送します。これらの例外を Datadog に報告するには、Datadog のプロジェクト設定で「Forward Unity Logs」オプションを選択します。

### ネイティブ クラッシュ レポート

ネイティブ クラッシュ レポートは、すべての Datadog Unity SDK プロジェクトで有効になっています。

アプリケーションで致命的なクラッシュが発生した場合、Datadog Unity SDK はアプリケーションが再起動した *後に* クラッシュ レポートを Datadog にアップロードします。非致命的なエラーや例外については、Datadog Unity SDK がこれらのエラーを他の RUM データとともにアップロードします。

## 難読化解除およびシンボル化されたスタック トレースを取得

マッピング ファイルは、スタック トレースの難読化解除およびシンボル化に使用され、エラーのデバッグを支援します。生成された一意のビルド ID を使用して、Datadog は正しいスタック トレースを対応するマッピング ファイルと自動的に照合します。これにより、マッピング ファイルがいつアップロードされたか (プレプロダクション ビルドまたはプロダクション ビルド) に関係なく、Datadog で報告されたクラッシュやエラーをレビューする際に効率的な QA プロセスに必要な正しい情報が利用可能になります。

### IL2CPP におけるファイルおよび行のマッピング

IL2CPP バックエンド (iOS のデフォルト) を使用する場合、Unity の C# スタック トレースにはファイル情報や行情報が含まれていません。この情報は、C# スタック トレースがネイティブ スタックにマッピングされていることを前提に、ネイティブ シンボル ファイルと IL2CPP マッピング ファイルから取得できます。有効化するには、Unity プロジェクト設定の Datadog セクションで「Perform Native Stack Mapping」オプションを選択し、以下に説明するようにシンボル ファイルと IL2CPP マッピング ファイルをアップロードしてください。

**注**: このオプションを選択していても、Native Stack Mapping が有効になるのは開発モードではないビルドのみです。

### Datadog へ シンボル ファイルをアップロードする

ネイティブ クラッシュ レポートは生の形式で収集され、ほとんどがメモリ アドレスのみを含みます。これらのアドレスを判読可能なシンボル情報に変換するには、アプリケーションのビルド プロセスで生成される iOS の `.dSYM` ファイル、NDK の `.so` ファイル、Android Proguard Mapping ファイル、または IL2CPP Mapping ファイルを Datadog へ アップロードする必要があります。

[@datadog/datadog-ci][4] コマンド ライン ツールを使用すると、必要なファイル (dSYM、so、Android Proguard Mapping、IL2CPP Mapping ファイル) を 1 つのコマンドでまとめてアップロードできます。

まず、上記の手順に従って `datadog-ci` ツールをインストールし、プロジェクトのルートに `datadog-ci.json` ファイルを作成して、API キーと (任意で) Datadog サイトを記述します。
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // datadoghq.com を使用している場合は省略可能
}
```

このファイルには API キーが含まれるため、バージョン管理には追加しないでください。

代わりに、`DATADOG_API_KEY` と `DATADOG_SITE` の環境変数を設定することもできます。

次に、以下のコマンドを実行して、クラッシュ レポートのシンボリケーションと難読化解除に必要なファイルをすべてアップロードできます。
```sh
# ビルド出力ディレクトリから
datadog-ci unity-symbols upload --ios
```

Android の場合、APK を直接ビルドするのではなく、Android プロジェクトをエクスポートして、そのエクスポートされたプロジェクトでビルドしてください。次に、エクスポート済みプロジェクトのディレクトリで datadog-ci を実行できます。
```sh
# エクスポート済みプロジェクト ディレクトリから
datadog-ci unity-symbols upload --android
```

**注**: ビルド ID が変更されていない場合、ソース マップを再アップロードしても既存のファイルは上書きされません。

利用可能なオプションの一覧については、`datadog-ci` の [Unity Symbols ドキュメント][5] を参照してください。

### アップロード済みのシンボル ファイルの一覧

すべてのアップロード済みシンボルを確認するには、[RUM Debug Symbols][6] ページを参照してください。

## 制限

{{< site-region region="us,us3,us5,eu,gov" >}}
ソース マップと dSYM ファイルは、それぞれ **500** MB に制限されています。
{{< /site-region >}}
{{< site-region region="ap1" >}}
ソース マップと dSYM ファイルは、それぞれ **500** MB に制限されています。
{{< /site-region >}}

## 実装をテストする

Unity Crash Reporting と Error Tracking の設定を検証するには、アプリケーションでエラーを発生させ、そのエラーが Datadog に表示されることを確認します。

1. 開発ビルドで実行していないことを確認してください。Unity のビルド設定で "Development Build" ボックスのチェックを外します。
2. アプリケーションをシミュレータ、エミュレータ、または実機で実行します。iOS で実行している場合は、デバッガがアタッチされていないことを確認してください。デバッガが接続されたままだと、Datadog SDK より先に Xcode がクラッシュを捕捉してしまいます。
3. エラーやクラッシュを含むコードを実行します。例:

   ```cs
   void ThrowError() {
    throw new Exception("My Exception")
   }
   ```

4. クラッシュを伴わない難読化されたエラー レポートの場合は、[**Error Tracking**][1] でシンボリケーションと難読化解除を確認できます。
5. クラッシュの場合は、クラッシュ発生後にアプリケーションを再起動し、Unity SDK が [**Error Tracking**][1] にクラッシュ レポートをアップロードするのを待ちます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/unity#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/unity-symbols
[6]: https://app.datadoghq.com/source-code/setup/rum