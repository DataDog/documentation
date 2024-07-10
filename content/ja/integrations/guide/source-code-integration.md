---
description: APM と統合するソースコードインテグレーションを設定して、テレメトリーをリポジトリとリンクし、CI パイプラインのアーティファクトに git
  情報を埋め込み、GitHub インテグレーションを使用してインラインコードスニペットを生成します。
further_reading:
- link: https://docs.datadoghq.com/integrations/github/
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: https://docs.datadoghq.com/tracing/error_tracking/
  tag: ドキュメント
  text: バックエンドサービスのエラー追跡について
- link: https://docs.datadoghq.com/profiler/
  tag: ドキュメント
  text: Continuous Profiler について
title: Datadog ソースコードインテグレーション
---

## 概要

<div class="alert alert-info">
ソースコードインテグレーションは以下をサポートします:</br></br>言語:<ul><li>Go</li><li>Java</li><li>JavaScript (トランスパイルされた JavaScript はサポートしていません)</li><li>Python</li><li>Ruby</li></ul></br>Git プロバイダー:<ul><li>GitHub</li><li>GitLab</li><li>BitBucket</li><li>Azure DevOps</li></ul></br> セルフホストインスタンスやプライベート URL はサポートされていません。
</div>

Datadog のソースコードインテグレーションは、GitHub、GitLab、Bitbucket、Azure DevOps でホストされている Git リポジトリとテレメトリーを接続することが可能です。[ソースコードインテグレーション][7]を有効にすると、ソースコードの関連行に素早くアクセスして、スタックトレース、スロープロファイル、その他の問題をデバッグすることができます。

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Java RuntimeException のインラインコードスニペットと GitHub でコードを見るためのボタン" style="width:100%;">}}


## セットアップ

Datadog Agent v7.35.0 以降が必要です。

[APM][6] をすでに設定している場合は、[**Integrations** > **Link Source Code**][7] に移動し、バックエンドサービスのソースコードインテグレーションを構成してください。

## アクティブコミットをリンクさせる

デプロイされたアーティファクトに[テレメトリーのタグ付け](#tag-your-telemetry)または [git 情報の埋め込み](#embed-git-information-in-your-artifacts-on-ci)を行うことでアクティブコミットをリンクさせることができます。

### テレメトリーのタグ付け

データを特定のコミットにリンクさせるには、テレメトリーに `git.commit.sha` と `git.repository_url` タグを付けます。`git.repository_url` タグにプロトコルが含まれていないことを確認してください。例えば、リポジトリの URL が `https://github.com/example_repo` である場合、`git.repository_url` タグの値は `github.com/example_repo` となります。

{{< tabs >}}
{{% tab "Docker Runtime" %}}

<div class="alert alert-warning">
この方法は、Docker、または containerd >= 1.5.6 を必要とします。AWS Fargate 上で動作するコンテナには対応していません。
その他のコンテナ設定については、<a href="https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=host#tag-your-telemetry">Host</a> タブを参照してください。
</div>

コンテナでアプリを実行している場合、Datadog はイメージの Docker ラベルから直接ソースコード情報を抽出することができます。ビルド時に、[オープンコンテナスタンダード][1]に従って、git commit SHA とリポジトリ URL を Docker ラベルとして追加します。

```
docker build . \
  -t my-application \
  --label org.opencontainers.image.revision=$(git rev-parse HEAD) \
  --label org.opencontainers.image.source=git-provider.example/me/my-repo
```

[1]: https://github.com/opencontainers/image-spec/blob/859973e32ccae7b7fc76b40b762c9fff6e912f9e/annotations.md#pre-defined-annotation-keys
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes を使用している場合は、[Datadog のタグオートディスカバリー][1]を使用してデプロイされたポッドにポッドアノテーションを付けます。

```
ad.datadoghq.com/tags: '{"git.commit.sha": "<FULL_GIT_COMMIT_SHA>", "git.repository_url": "git-provider.example/me/my-repo"}'
```

`git.commit.sha` と `git.repository_url` はテレメトリーでタグ付けされています。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/tag/?tab=containerizedagent#tag-autodiscovery
{{% /tab %}}
{{% tab "サーバーレス" %}}

Datadog は、[Serverless Monitoring for AWS Lambda 設定][4]に従って、サーバーレスアプリケーションからソースコード情報を直接抽出することができます。

| APM サーバーレスの設定                | 方法の説明                                                                                                                                                                                                          |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Datadog サーバーレスフレームワークプラグイン | Datadog Serverless Plugin][1] を使用してサーバーレスアプリケーションのインスツルメンテーションを行う場合は、serverless-plugin-datadog `version >= 5.18.0` を使用します。                                                                         |
| datadog-cdk-constructs              | サーバーレスアプリケーションのインスツルメンテーションに [Datadog CDK Construct][2] を使用する場合、AWS CDK v1 では datadog-cdk-constructs `version >= 0.8.5`、AWS CDK v2 では datadog-cdk-constructs-v2 `version >= 1.4.0` を使用します。 |
| datadog-ci                          | [Datadog CLI クライアント][3]を使用してサーバーレスアプリケーションのインスツルメンテーションを行う場合は、datadog-ci `version >= 2.4.1` を使用します。CLI ツールは、コードリポジトリと同じディレクトリで実行する必要があります。                        |

[1]: /ja/serverless/libraries_integrations/plugin/
[2]: /ja/serverless/libraries_integrations/cdk/
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /ja/serverless/aws_lambda/configuration/

{{% /tab %}}
{{% tab "Host" %}}

トレース、スパン、プロファイルに `git.commit.sha` と `git.repository_url` というタグを付けるには、環境変数 `DD_TAGS` でトレーサーを構成します。

```
export DD_TAGS="git.commit.sha:<FULL_GIT_COMMIT_SHA>,git.repository_url:git-provider.example/me/my-repo"
./my-application start
```

{{% /tab %}}
{{< /tabs >}}

Datadog はリポジトリの URL、現在のブランチのコミット SHA、追跡されたファイルパスのリストをキャプチャするだけで、ユーザーコードを取り込んだり保存したりすることはありません。

### git 情報を CI のアーティファクトに埋め込む

リポジトリ URL やコミットハッシュなどの git 情報をアーティファクトに埋め込むことができます。[Datadog トレーシングライブラリ][9]はこの情報を使って、アクティブコミットを APM サービスに自動的にリンクさせます。

git 情報の埋め込みに対応している言語を、次の中から 1 つ選択します。

{{< tabs >}}
{{% tab "Go" %}}

Go はバージョン 1.18 からバイナリに[バージョン管理情報を埋め込む][1]ようになりました。

サービスが以下の要件をすべて満たしていることを確認します。

* Go >= 1.18 のバージョンを使用している。
* Datadog Go Tracer >= 1.48.0 のバージョンを使用している。
* アプリケーションは `go.mod` を使ってモジュールとしてビルドされました。モジュールパスはコードリポジトリの URL です。

[1]: https://tip.golang.org/doc/go1.18
{{% /tab %}}
{{< /tabs >}}

## リポジトリの構成

{{< tabs >}}
{{% tab "GitHub" %}}

GitHub SaaS ユーザーの場合、テレメトリーをソースコードにリンクさせるために、Datadog の [GitHub インテグレーション][1]を [GitHub インテグレーションタイル][2]にインストールします。インテグレーションタイルで権限を指定する際、**Contents** に対して Datadog の読み取り権限を有効にしてください。

GitHub とのインテグレーションを設定することで、**エラー追跡**にインラインコードスニペットを表示することができます。詳しくは、[インラインソースコード](#inline-source-code)をご覧ください。

[1]: https://docs.datadoghq.com/ja/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}
{{% tab "その他の Git プロバイダー" %}}

テレメトリーをソースコードにリンクさせるために、Datadog は [`datadog-ci git-metadata upload`][1] コマンドで Git リポジトリから全てのコミット SHA についてメタデータを収集します。

Git リポジトリ内で `datadog-ci git-metadata upload` を実行すると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、そして追跡したファイルのパスのリストを受け取ります。

### 検証

データが収集されていることを確認するために、CI パイプラインで `datadog-ci git-metadata upload` を実行します。

以下のような出力が期待できます。

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:my-org/my-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## 使用方法

### Git プロバイダーへのリンク

{{< tabs >}}
{{% tab "エラー追跡" %}}
トレースは GitHub のソースリポジトリの[エラー追跡][1]で直接アクセスできます。

1. [**APM** > **Error Tracking**][2] の順に移動します。
2. 課題をクリックします。右側に **Issue Details** パネルが表示されます。
3. **Latest Event** の下で、フレームの右側にある **View** ボタンをクリックするか、**View file**、**View Git blame**、**View commit** を選択すると、ソースコード管理ツールにリダイレクトされます。

{{< img src="integrations/guide/source_code_integration/links-to-git-error-full.png" alt="エラー追跡のエラースタックトレースの右側に、3 つのオプション (view file、view blame、view commit) を持つビューリポジトリボタンがあります" style="width:100%;">}}

[1]: /ja/tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

トレースは、[Continuous Profiler][1] で GitHub 上のソースリポジトリに直接アクセスすることができます。

1. [**APM** > **Profile Search**][2] の順に移動します。
2. プロファイルをクリックし、フレームグラフのメソッドにカーソルを合わせます。右側に **More actions** というラベルの付いたケバブアイコンが表示されます。
3. *More actions** > **View in repo** をクリックし、トレースをソースコードリポジトリで開きます。

{{< img src="integrations/guide/source_code_integration/profiler-link-to-git.png" alt="Continuous Profiler から GitHub へのリンク" style="width:100%;">}}

[1]: /ja/profiler/search_profiles/
[2]: https://app.datadoghq.com/profiling/search
{{% /tab %}}
{{< /tabs >}}

### インラインソースコード

GitHub SaaS ユーザーの場合、Datadog の [GitHub インテグレーション][2]をインストールすると、[エラー追跡][8]のスタックトレースに GitHub リポジトリからコードスニペットを直接インラインで表示することができます。インテグレーションタイルで権限を指定する際、**Contents** に対して Datadog の読み取り権限を有効にしてください。

1. [**APM** > **Error Tracking**][1] の順に移動します。
2. 課題をクリックします。右側に **Issue Details** パネルが表示されます。
3. **Connect to Preview** と **Authorize** をクリックして、エラーを含むソースコードスニペットにアクセスします。
4. **Latest Event** の下で、フレームの右側にある **View Code** ボタンをクリックするか、**View file**、**View Git blame**、**View commit** を選択すると、ソースコード管理ツールにリダイレクトされます。

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="スタックトレース内のインラインコードスニペット" style="width:100%;">}}

組織用の GitHub アプリをインストールするには、組織のオーナーであるか、リポジトリの管理者権限が必要です。また、個人の GitHub アカウントに GitHub アプリをインストールすることも可能です。詳しくは、[GitHub Apps & OAuth Apps][3] をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/error-tracking
[2]: https://app.datadoghq.com/integrations/github/
[3]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[5]: /ja/integrations/github/
[6]: /ja/tracing/
[7]: https://app.datadoghq.com/source-code/setup/apm
[8]: /ja/tracing/error_tracking/
[9]: /ja/tracing/trace_collection/dd_libraries/