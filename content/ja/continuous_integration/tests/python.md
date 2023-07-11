---
aliases:
- /ja/continuous_integration/setup_tests/python
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: コンテナ内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: Python テスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">Python のテストインスツルメンテーションはベータ版です。
</div>

## 互換性

サポートされている Python インタープリター:
* Python >= 2.7 および >= 3.5

サポートされているテストフレームワーク:
* pytest >= 3.0.0
  * Python 2 を使用する場合は pytest < 5

## 報告方法の構成

Datadog にテスト結果を報告するには、Datadog Python ライブラリを構成する必要があります。

{{< tabs >}}

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

Jenkins や自己管理型の GitLab CI などのオンプレミスの CI プロバイダー上でテストを実行している場合は、[Agent のインストール手順][1]に従って各ワーカーノードに Datadog Agent をインストールします。これは、テスト結果が基盤となるホストのメトリクスに自動的にリンクされるため、推奨されるオプションです。

Kubernetes エグゼキューターを使用している場合、Datadog は [Datadog Admission Controller][2] を使用することをお勧めします。これにより、ビルドポッドの環境変数が自動的に設定されてローカルの Datadog Agent と通信します。

Kubernetes を使用していない場合、または [Datadog Admission Controller][2] を使用できない場合で、CI プロバイダーがコンテナベースのエクゼキュータを使用している場合は、トレーサーを実行するビルドコンテナ内の環境変数 `DD_TRACE_AGENT_URL` (デフォルトは `http://localhost:8126`) を、そのコンテナ内からアクセス可能なエンドポイントに設定します。_ビルドコンテナ内で `localhost` を使用すると、コンテナ自体を参照し、基盤となるワーカーノードや Container Agent が動作しているコンテナを参照しないことに注意してください_。

`DD_TRACE_AGENT_URL` は、プロトコルとポート (例えば、`http://localhost:8126`) を含み、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` よりも優先され、CI Visibility のために Datadog Agent の URL を構成するために推奨される構成パラメーターです。

それでも Datadog Agent への接続に問題がある場合は、[Agentless Mode](?tab=cloudciprovideragentless#configuring-reporting-method) を使用してください。**注**: この方法を使用すると、テストとインフラストラクチャーメトリクスの相関がなくなります。

[1]: /ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "クラウド CI プロバイダー (エージェントレス)" %}}

### クラウドの CI プロバイダーを使用する

GitHub Actions や CircleCI など、基底のワーカーノードにアクセスできないクラウドの CI プロバイダーを使用している場合は、コンテナ内の Datadog Agent をビルドサービスとして実行します。このメソッドは、各ワーカーノードへの Datadog Agent のインストールというオプションがない場合に、コンテナベースのエグゼキューターを使用するオンプレミス CI プロバイダーでも使用できます。

単純な結果フォワーダーとして機能するコンテナとして Datadog Agent を実行するには、Docker イメージ `gcr.io/datadoghq/agent:latest` と次の環境変数を使用します。

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][1]。<br/>
**デフォルト**: (なし)

さらに、データを送信する [Datadog サイト][2]を構成します。

`DD_SITE`
: 結果をアップロードする Datadog サイト。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
{{% /tab %}}

{{< /tabs >}}


## Python トレーサーのインストール

次のコマンドを実行して、Python トレーサーをインストールします。

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

詳細については、[Python トレーサーのインストールドキュメント][4]を参照してください。

## テストのインスツルメンテーション

`pytest` テストのインスツルメンテーションを有効にするには、`pytest` の実行時に `--ddtrace` オプションを追加し、`DD_SERVICE` 環境変数でテスト対象のサービスまたはライブラリの名前を、`DD_ENV` 環境変数でテストが実行されている環境を指定します (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`)。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

もし、残りの APM インテグレーションも有効にして flamegraph でより多くの情報を取得したい場合は、`--ddtrace-patch-all` オプションを追加します。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

### テストにカスタムタグを追加する

テストの引数に `ddspan` と宣言することで、テストにカスタムタグを追加することができます。

```python
from ddtrace import tracer

# テストの引数として `ddspan` を宣言します
def test_simple_case(ddspan):
    # タグを設定します
    ddspan.set_tag("test_owner", "my_team")
    # テストは正常に続きます
    # ...
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、Python カスタムインスツルメンテーションドキュメントの[タグの追加][5]セクションを参照してください。

## コンフィギュレーション設定

以下は、コードか、または環境変数を使用した、トレーサーで使用できる最も重要なコンフィギュレーション設定のリストです。

`ddtrace.config.service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `pytest`<br/>
**例**: `my-python-app`

`ddtrace.config.env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

次の環境変数を使用して、Datadog Agent の場所を構成できます。

`DD_TRACE_AGENT_URL`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][6]オプションも使用できます。

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

## 収集した情報

CI Visibility を有効にすると、プロジェクトから以下のデータが収集されます。

* テストの名前と時間。
* CI プロバイダーが設定する事前定義された環境変数。
* Git のコミット履歴。ハッシュ、メッセージ、作成者情報、変更されたファイル (ファイルの内容は含まず) が含まれます。
* CODEOWNERS ファイルからの情報。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/tracing/trace_collection/dd_libraries/python/
[5]: /ja/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[6]: /ja/tracing/trace_collection/library_config/python/?tab=containers#configuration