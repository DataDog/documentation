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
* .NET Core >= 2.1 および >= 3.0
* .NET >= 5.0

サポートされているテストフレームワーク:
* xUnit >= 2.2
* NUnit >= 3.0
* MsTest V2 >= 14

## 前提条件

[Datadog Agent をインストールして、テストデータを収集します][1]。

## .NET トレーサーのインストール

`dd-trace` コマンドをマシンにグローバルにインストールまたは更新するには、次のコマンドを実行します。

{{< code-block lang="bash" >}}
dotnet tool update -g dd-trace
{{< /code-block >}}

## テストのインスツルメンテーション

テストスイートをインスツルメントするには、テストコマンドの前に `dd-trace` を付け、テスト中のサービスまたはライブラリの名前を `--dd-service` パラメーターとして指定し、テストが実行されている環境 (たとえば、 開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を `--dd-env` パラメーターとして使用します。例:

{{< code-block lang="bash" >}}
dd-trace --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

すべてのテストは自動的にインスツルメントされます。

## コンフィギュレーション設定

コマンドライン引数または環境変数を使用して、CLI のデフォルトコンフィギュレーションを変更できます。コンフィギュレーション設定の完全なリストについては、以下を実行してください。

{{< code-block lang="bash" >}}
dd-trace --help
{{< /code-block >}}

次のリストは、主要なコンフィギュレーション設定のデフォルト値を示しています。

`--dd-service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: リポジトリ名<br/>
**例**: `my-dotnet-app`

`--dd-env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`--agent-url`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][2]オプションも使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration