---
description: Datadog で Git リポジトリとインラインソースコードへのリンクを設定します。
further_reading:
- link: https://docs.datadoghq.com/integrations/github_apps/
  tag: インテグレーション
  text: GitHub アプリのインテグレーション
kind: ガイド
title: Datadog ソースコードインテグレーション
---

## 概要

ソースコードインテグレーションは、Git とのインテグレーションで、テレメトリ (スタックトレースなど) とソースコードを連携させることができるものです。

{{< img src="integrations/guide/source_code_integration/link-to-github.png" alt="Java RuntimeException のインラインコードスニペットと Github でコードを見るためのボタン" style="width:90%;">}}

GitHub アプリのインテグレーションと組み合わせることで、エラーにインラインコードスニペットを表示することができます。詳しくは、[インラインソースコード](#inline-source-code)をご覧ください。

| インテグレーション名            | スタックトレースリンク | 課題・PR プレビュー | インラインコードスニペット |
|-----------------------------|-------------------|-----------------------|----------------------|
| ソースコード                 | {{< X >}}         | X                     | X                    |
| GitHub アプリ                 | X                 | {{< X >}}             | X                    |
| ソースコードと GitHub アプリ | {{< X >}}         | {{< X >}}             | {{< X >}}            |

## コンフィギュレーション

<div class="alert alert-info">
ソースコードのインテグレーションは、Go とすべての JVM 言語をサポートしています。
<br>
Datadog Agent 7.35.0 以降が必要です。
</div>

テレメトリーデータとソースコードのマッピングを行うには

1. `git.commit.sha` と `git.repository_url` タグをコンテナに追加したり、テレメトリに直接追加したりします。
2. CI パイプラインで [`datadog-ci git-metadata upload`][1] を実行し、git リポジトリのメタデータをアップロードします。
3. オプションで、[GitHub アプリをインストール][2]すると、インラインでソースコードのスニペットを表示することができます。

### テレメトリーのタグ付け

データを特定のコミットにリンクさせるには、テレメトリーに `git.commit.sha` タグを付けます。

{{< tabs >}}
{{% tab "Docker Runtime" %}}

<div class="alert alert-warning">
この方法は、Docker、または containerd >= 1.5.6 が必要です。その他のコンテナのセットアップについては、「その他」のセクションを参照してください。
</div>

コンテナでアプリを実行している場合、Datadog はイメージの Docker ラベルから直接ソースコード情報を抽出することができます。ビルド時に、[オープンコンテナスタンダード][1]に従って、git commit SHA とリポジトリ URL を Docker ラベルとして追加します。

```
docker build . \
  -t my-application \
  --label org.opencontainers.image.revision=$(git rev-parse HEAD) \
  --label org.opencontainers.image.source=https://git-provider.example/me/my-repo
```

[1]: https://github.com/opencontainers/image-spec/blob/859973e32ccae7b7fc76b40b762c9fff6e912f9e/annotations.md#pre-defined-annotation-keys
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes を使用している場合は、[Datadog のタグオートディスカバリー][1]を使用してデプロイされたポッドにポッドアノテーションを付けます。

```
ad.datadoghq.com/tags: '{"git.commit.sha": "<FULL_GIT_COMMIT_SHA>", "git.repository_url": "<REPOSITORY_URL>"}'
```

git commit SHA とリポジトリ URL がテレメトリーに追加されます。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/tag/?tab=containerizedagent#tag-autodiscovery
{{% /tab %}}
{{% tab "その他" %}}

コンテナ化されていない環境やサポートされていない環境では、トレース、スパン、プロファイルに git commit SHA とリポジトリ URL を手動でタグ付けします。

トレース、スパン、プロファイルに `git.commit.sha` と `git.repository_url` というタグを付けるには、環境変数 `DD_TAGS` でトレーサーを構成します。

```
export DD_TAGS="git.commit.sha:<GIT_COMMIT_SHA> git.repository_url=<REPOSITORY_URL>"
./my-application start
```

{{% /tab %}}
{{< /tabs >}}

### git メタデータをアップロードする

テレメトリーをソースコードにリンクさせるために、Datadog は [`datadog-ci git-metadata upload`][1] コマンドで git リポジトリから全てのコミット SHA について情報を収集します。

git リポジトリ内で `datadog-ci git-metadata upload` を実行すると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、そして追跡したファイルのパスのリストを受け取ります。

#### 検証

データが収集されていることを確認するために、CI パイプラインで `datadog-ci git-metadata upload` を実行します。

以下のような出力が期待できます。

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:DataDog/datadog-ci.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

## Git へのリンク

#### スタックトレース

[エラー追跡][3]と APM のエラースパンでは、スタックトレースからリポジトリへのリンクに直接アクセスできます。

1. **APM** > **Error Tracking** の順に移動します。
2. 課題をクリックします。右側に **Issue Details** パネルが表示されます。
3. **Latest available errors** の下にある、フレームにカーソルを合わせます。右側に **View** ボタンが表示され、GitHub に誘導されます。

{{< img src="integrations/guide/github_apps/stacktrace-link-to-git.png" alt="インラインコードスニペット" style="width:90%;">}}

##### インラインソースコード

GitHub SaaS をご利用の方は、Datadog の [GitHub アプリインテグレーション][2]をインストールすると、スタックトレースに GitHub リポジトリからのコードスニペットを直接インライン化することができます。

インテグレーションタイルで権限を指定する際、**Contents** に対する Datadog の読み取り権限を有効にします。

組織用の GitHub アプリをインストールするには、組織のオーナーであるか、リポジトリの管理者権限が必要です。また、個人の GitHub アカウントに GitHub アプリをインストールすることも可能です。

詳しくは、[GitHub アプリと OAuth アプリ][4]をご覧ください。

1. フレームをクリックすると、ソースコードの行を含むコードスニペットが展開されます。
2. **Connect to Preview** と **Authorize** をクリックして、エラーを含むソースコードスニペットにアクセスします。

{{< img src="integrations/guide/github_apps/inline-code-snippet.png" alt="インラインコードスニペット" style="width:90%;">}}

#### Continuous Profiler

[Continuous Profiler][2] では、GitHub 上のソースリポジトリにあるトレースに直接アクセスすることができます。

1. **APM** > **Profile Search** の順に移動します。
2. プロファイルをクリックし、フレームグラフのメソッドにカーソルを合わせます。右側に **More actions** というラベルの付いたケバブアイコンが表示されます。
3. *More actions** > **View in repo** をクリックし、ソースコードリポジトリを開きます。

{{< img src="integrations/guide/github_apps/profiler-link-to-git.png" alt="プロファイラーから git へのリンク" style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[2]: https://app.datadoghq.com/account/settings#integrations/github-apps
[3]: https://app.datadoghq.com/apm/error-tracking
[4]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps