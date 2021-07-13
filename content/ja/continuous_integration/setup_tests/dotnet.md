---
title: .NET テスト
kind: documentation
further_reading:
  - link: /continuous_integration/explore_tests
    tag: ドキュメント
    text: テスト結果とパフォーマンスを調べる
  - link: /continuous_integration/troubleshooting/
    tag: ドキュメント
    text: トラブルシューティング CI
---
## 互換性

サポートされている .NET バージョン:
* .NET Core 2.1+
* .NET Core 3.0+
* .NET 5.0+

サポートされているテストフレームワーク:
* xUnit 2.2+
* NUnit 3.0+
* MsTest V2 14+ (試験運用)

サポートされている CI プロバイダー:
* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## 前提条件

[Datadog Agent をインストールして、テストデータを収集します][1]。

## トレースのインストール

`dd-trace` コマンドをマシンにグローバルにインストールするには、次のコマンドを実行します。

{{< code-block lang="bash" >}}
dotnet tool install -g dd-trace
{{< /code-block >}}

または、以前のバージョンのツールを使用している場合は、次のコマンドを実行してツールを更新します。

{{< code-block lang="bash" >}}
dotnet tool update -g dd-trace
{{< /code-block >}}

## テストのインスツルメンテーション

テストスイートをインスツルメントするには、テストコマンドの前に `dd-trace` を付けます。例:

{{< code-block lang="bash" >}}
dd-trace dotnet test
{{< /code-block >}}

すべてのテストは自動的にインスツルメントされます。

### コンフィギュレーション設定

コマンドライン引数または環境変数を使用して、CLI のデフォルトコンフィギュレーションを変更できます。コンフィギュレーション設定の完全なリストについては、以下を実行してください。

{{< code-block lang="bash" >}}
dd-trace --help
{{< /code-block >}}

次のリストは、主要なコンフィギュレーション設定のデフォルト値を示しています。


`--set-ci`
: すべての CI パイプラインの clr プロファイラー環境変数を設定します。<br/>
**デフォルト**: `false`

`--dd-env`
: 統合サービスタグ付けの環境名。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `(empty)`

`--dd-service`
: 統合サービスタグ付けのサービス名。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `(ProcessName)` 

`--dd-version` 
: 統合サービスタグ付けのバージョン。 <br/>
**環境変数**: `DD_VERSION`<br/>
**デフォルト**: `(empty)`

`--agent-url` 
: Datadog トレース Agent URL. <br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

さらに、すべての [Datadog トレーサーコンフィギュレーション][2]オプションをテストフェーズで使用できます。

たとえば、カスタム Agent URL とカスタムサービス名を使用してテストスイートを実行するには、次のようにします。

{{< code-block lang="bash" >}}
dd-trace --agent-url=http://agent:8126 --dd-service=my-app dotnet test
{{< /code-block >}}

### アプリケーションへのパラメーターの受け渡し

アプリケーションがコマンドライン引数を予期している場合は、パラメーターの衝突を避けるために、ターゲットアプリケーションの前に `--` 区切り文字を使用してください。

次の例は、環境として `ci` を使用してコマンド `dotnet test --framework netcoreapp3.1` をインスツルメントする方法を示しています。

{{< code-block lang="bash" >}}
dd-trace --dd-env=ci -- dotnet test --framework netcoreapp3.1
{{< /code-block >}}

### MsTest V2 フレームワークのインスツルメント

MsTest V2 フレームワークのサポートは、インスツルメンテーションの実験的な方法に依存しているため、デフォルトで無効になっています (一部のサードパーティライブラリのインスツルメンテーションが欠落している可能性があります)。これを有効にするには、`dd-trace dotnet test` コマンドを実行する前に次の環境変数を設定します。

{{< code-block lang="bash" >}}
DD_TRACE_CALLTARGET_ENABLED=true
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration