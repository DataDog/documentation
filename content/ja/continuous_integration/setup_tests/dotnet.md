---
further_reading:
- link: /continuous_integration/explore_tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: .NET テスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は使用できません。</div>
{{< /site-region >}}

## 互換性

対応する .NET バージョン:
* .NET Core >= 2.1 と >= 3.0
* .NET >= 5.0

対応するテストフレームワーク:
* xUnit >= 2.2
* NUnit >= 3.0
* MsTest V2 >= 14

## 前提条件

[テストデータを収集するために Datadog Agent をインストールします][1]。

<div class="alert alert-warning">
Agentless モードはベータ版です。この機能を試すには、このページの<a href="/continuous_integration/setup_tests/dotnet#agentless-beta">指示</a>に従ってください。
</div>

## .NET トレーサーのインストール

`dd-trace` コマンドをマシンにグローバルにインストールまたは更新するには、次のコマンドを実行します。

{{< code-block lang="bash" >}}
dotnet tool update -g dd-trace
{{< /code-block >}}

## テストのインスツルメンテーション

テストスイートをインスツルメントするには、テストコマンドの前に `dd-trace ci run` を付け、テスト中のサービスまたはライブラリの名前を `--dd-service` パラメーターとして指定し、テストが実行されている環境 (たとえば、 開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を `--dd-env` パラメーターとして使用します。例:

{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

すべてのテストは自動的にインスツルメントされます。

## コンフィギュレーション設定

コマンドライン引数または環境変数を使用して、CLI のデフォルトコンフィギュレーションを変更できます。コンフィギュレーション設定の完全なリストについては、以下を実行してください。

{{< code-block lang="bash" >}}
dd-trace ci run --help
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

### Git のメタデータを収集する

Datadog は、テスト結果を可視化し、リポジトリ、ブランチ、コミットごとにグループ化するために Git の情報を使用します。Git のメタデータは、CI プロバイダーの環境変数や、プロジェクトパス内のローカルな `.git` フォルダがあれば、そこからテストインスツルメンテーションによって自動的に収集されます。

サポートされていない CI プロバイダーでテストを実行する場合や、`.git` フォルダがない場合は、環境変数を使って Git の情報を手動で設定することができます。これらの環境変数は、自動検出された情報よりも優先されます。Git の情報を提供するために、以下の環境変数を設定します。

`DD_GIT_REPOSITORY_URL`
: コードが格納されているリポジトリの URL。HTTP と SSH の両方の URL に対応しています。<br/>
**例**: `git@github.com:MyCompany/MyApp.git`、`https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: テスト中の Git ブランチ。タグ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `develop`

`DD_GIT_TAG`
: テストされる Git タグ (該当する場合)。ブランチ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: フルコミットハッシュ。<br/>
**例**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: コミットのメッセージ。<br/>
**例**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: コミット作成者名。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: コミット作成者メールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: ISO 8601 形式のコミット作成者の日付。<br/>
**例**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: コミットのコミッター名。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: ISO 8601 形式のコミットのコミッターの日付。<br/>
**例**: `2021-03-12T16:00:28Z`

## カスタムインスツルメンテーション


<div class="alert alert-warning">
  <strong>注:</strong> カスタムインスツルメンテーションの設定は、<code>dd-trace</code> のバージョンに依存します。カスタムインスツルメンテーションを使用するには、<code>dd-trace</code> と <code>Datadog.Trace</code> の NuGet パッケージのバージョンを同期させておく必要があります。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. ツールのバージョンを取得するには、`dd-trace --version` を実行します。
1. 同じバージョンの `Datadog.Trace` [NuGet パッケージ][3]をアプリケーションに追加します。
2. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

カスタムインスツルメンテーションのスパンやタグの追加方法については、[.NET カスタムインスツルメンテーションのドキュメント][4]を参照してください。

## Agentless (ベータ版)

Agent を使用せずにテストスイートをインスツルメントするには、以下の環境変数を構成します。

`DD_CIVISIBILITY_AGENTLESS_ENABLED` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][5]。<br/>
**デフォルト**: `(empty)`

そして、テストコマンドの前に `dd-trace ci run` を付けます。`--dd-service` パラメーターを使用して、サービスやライブラリの名前を指定します。`--dd-env` パラメーターには、テストを実行する環境を指定します (開発者のワークステーションでテストを実行する場合は `local` 、CI プロバイダでテストを実行する場合は `ci` など)。

{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

また、 `--api-key` パラメーターを使用して、[Datadog API キー][5]を提供することも可能です。例:

{{< code-block lang="bash" >}}
dd-trace ci run --api-key <API KEY> --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

`--api-key` を設定すると、自動的に Agentless モードが有効になります。

さらに、どの [Datadog サイト][6]にデータを送信するかを構成します。あなたの Datadog サイトは {{< region-param key="dd_site" >}} です。

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][6]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: /ja/tracing/setup_overview/custom_instrumentation/dotnet/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/getting_started/site/