---
aliases:
- /ja/getting_started/tracing/distributed-tracing
description: アプリケーションパフォーマンスモニタリング (APM) を設定して、ボトルネックを特定し、問題をトラブルシューティングし、Datadog
  にトレースを送信します。
further_reading:
- link: /tracing/
  tag: ドキュメント
  text: APM 機能の詳細
- link: /tracing/metrics/runtime_metrics/
  tag: ドキュメント
  text: ランタイムメトリクスの有効化
- link: /tracing/guide/#enabling-tracing-tutorials
  tag: ガイド
  text: トレースを有効にするための様々な方法のチュートリアル
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: ラーニングセンター
  text: Application Performance Monitoring の紹介
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: APM の理解を深めるためのインタラクティブセッションに参加しましょう
title: APM トレーシングの概要
---
## 概要 {#overview}

Datadog Application Performance Monitoring (APM) は、アプリケーションを詳細に可視化することで、パフォーマンスのボトルネックを特定し、問題をトラブルシューティングし、サービスを最適化することを可能にします。

このガイドでは、APM の始め方と最初のトレースを Datadog に送信する方法を説明します。

1. Datadog APM をセットアップして、Datadog にトレースを送信します。
1. アプリケーションを実行してデータを生成します。
1. 収集したデータを Datadog で確認します。

## 前提条件 {#prerequisites}

このガイドの手順を実行するには、以下の準備が必要です。

1. [Datadog アカウントの作成][1]をまだ行っていない場合は、作成します。
1. [Datadog API キー][2]を検索または作成します。
1. Linux ホストまたは VM を起動します。

## アプリケーションの作成 {#create-an-application}

Datadog で観測するアプリケーションを作成するには

1. Linux ホストまたは VM 上で、`hello.py` という名前の Python アプリケーションを新規作成します。例えば、`nano hello.py` とします。
1. 以下のコードを `hello.py` に追加します。

    {{< code-block lang="python" filename="hello.py" collapsible="true" disable_copy="false" >}}
  from flask import Flask
  import random

  app = Flask(__name__)
  
  quotes = [
      "Strive not to be a success, but rather to be of value. - Albert Einstein",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ]
  
  @app.route('/')
  def index():
      quote = random.choice(quotes)+"\n"
      return quote
  
  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5050)
  {{< /code-block >}}

## Datadog APM を設定する {#set-up-datadog-apm}

アプリケーションのコードやデプロイプロセスを変更せずに Datadog APM を設定するには、Single Step APM Instrumentation を使用します。あるいは、[Datadog トレーシング][8]ライブラリを使用して APM を設定することもできます。


1. インストールコマンドを実行します。

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=python:4 DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```
 
    Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][2], `<YOUR_DD_SITE>` with your [Datadog site][7], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `development`).

1. ホストまたは VM のサービスを再起動します。
1. Agent が実行されていることを確認します。

    ```shell
   sudo datadog-agent status
   ```

この方法では、Datadog Agent を自動的にインストールし、Datadog APM を有効にし、実行時にアプリケーションをインスツルメントします。

## アプリケーションの実行 {#run-the-application}

Datadog APM を Single Step Instrumentation でセットアップすると、Datadog は実行時にアプリケーションを自動的にインスツルメントします。

`hello.py`を実行するには:

1. カレントディレクトリに Python 仮想環境を作成します。

   ```shell
   python3 -m venv ./venv
   ```

1. `venv` 仮想環境をアクティブにします。

   ```shell
   source ./venv/bin/activate
   ```

1. `pip` と `flask` をインストールします。

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. サービス名を設定して `hello.py` を実行します。

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## アプリケーションのテスト {#test-the-application}

Datadog にトレースを送信するアプリケーションをテストします。

1. 新しいコマンドプロンプトで以下を実行します。

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. ランダムな引用が返されることを確認します。
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

`curl` コマンドを実行するたびに、新しいトレースが Datadog に送信されます。

## Datadog でトレースを調べる {#explore-traces-in-datadog}

1. Datadog の [**APM** > **Services**][3] に移動します。`hello` という名前の Python サービスが表示されるはずです。

   {{< img src="/getting_started/apm/service-catalog.png" alt="Software Catalog に新しい Python サービスが表示されます。" style="width:100%;" >}}

1. サービスを選択して、レイテンシー、スループット、エラー率などのパフォーマンスメトリクスを表示します。
1. [**APM** > **Traces**][4] に移動します。`hello` サービスのトレースが表示されるはずです。

   {{< img src="/getting_started/apm/trace-explorer.png" alt="Trace Explorer に hello サービスのトレースが表示されます。" style="width:100%;" >}}

1. トレースを選択すると、パフォーマンスのボトルネックを特定するのに役立つフレームグラフを含む詳細が表示されます。

## 高度な APM セットアップ {#advanced-apm-setup}

ここまでの間、Single Step インスツルメンテーションを使用して、Datadog によって `hello.py` アプリケーションが自動的にインスツルメンテーションされるようにしました。このアプローチは、コードに手を加えたりライブラリを手動でインストールしたりせずに、一般的なライブラリや言語全体で重要なトレースをキャプチャしたい場合に推奨されます。

しかし、カスタムコードからトレースを収集する必要がある場合や、より細かい制御が必要な場合は、[カスタムインスツルメンテーション][6]を追加することができます。

これを説明するために、Datadog Python SDK を `hello.py` にインポートし、カスタムスパンとスパンタグを作成します。

カスタムインスツルメンテーションを追加するには

1. Datadog SDK をインストールします。

   ```shell
   pip install ddtrace
   ```

1. ハイライトした行を `hello.py` のコードに追加して、カスタムスパンタグ `get_quote` とカスタムスパンタグ `quote` を作成します。

   {{< highlight python "hl_lines=3 15 17" >}}
    from flask import Flask
    import random
    from ddtrace import tracer

    app = Flask(__name__)

    quotes = [
        "Strive not to be a success, but rather to be of value. - Albert Einstein",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ]

    @app.route('/')
    def index():
        with tracer.trace("get_quote") as span:
            quote = random.choice(quotes)+"\n"
            span.set_tag("quote", quote)
            return quote

    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5050)
   {{< /highlight >}}

1. 先ほどの仮想環境で `hello.py` を実行します。
   ```shell
   ddtrace-run python hello.py
   ```
1. 別のコマンドプロンプトでいくつかの `curl` コマンドを実行します。
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Datadog の [**APM** > **Traces**][4] に移動します。
1.  **hello** トレースを選択します。
1. フレームグラフで新しいカスタム `get_quote` スパンを見つけ、その上にカーソルを合わせます。

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="get_quote カスタムスパンがフレームグラフに表示されます。カーソルを合わせると、quote スパンタグが表示されます。" style="width:100%;" >}}

1. カスタム `quote` スパンタグが **Info** タブに表示されていることに注目してください。

## 次のステップ{#whats-next}

トレーシングを設定し、アプリケーションが Datadog にデータを送信した後、追加の APM 機能を確認します。

### Software Catalog {#software-catalog}

[Software Catalog][9] は、所有権メタデータ、パフォーマンスインサイト、セキュリティ分析、およびコスト配分を 1 か所に統合し、サービスの統合ビューを提供します。タグ、注釈、または `service.datadog.yaml` ファイルを使用して[サービスメタデータ][10]を構成し、所有権情報、ランブック、およびドキュメントリンクでサービスを充実させます。

### トレースの取り込みと保存 {#trace-ingestion-and-retention}

[取り込みのコントロール][11]と[保持フィルター][12]を構成することで、コストを管理し、データ量を制御します。ingestion controls により、Datadog Agent または SDK レベルでサンプリングレートをカスタマイズでき、retention filters は検索および分析のためにインデックスされるスパンを決定します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /ja/tracing/glossary/#instrumentation
[6]: /ja/tracing/trace_collection/custom_instrumentation/
[7]: /ja/getting_started/site/
[8]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /ja/internal_developer_portal/software_catalog/
[10]: /ja/internal_developer_portal/software_catalog/entity_model/
[11]: /ja/tracing/trace_pipeline/ingestion_controls/
[12]: /ja/tracing/trace_pipeline/trace_retention/