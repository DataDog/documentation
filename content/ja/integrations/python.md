---
last_modified: 2015/07/06
translation_status: complete
language: ja
title: Datadog-Python Integration
integration_title: Python
kind: integration
doclevel: basic
---

<!-- The Python integration enables you to monitor any custom metric by instrumenting a few lines of code. For instance, you can have a metric that returns the number of page views or the time of any function call. For additional information about the Python integration, please refer to the guide on submitting metrics. For advanced usage, please refer to the documentation in the repository -->

### 概要
{:#int-overview}

Pythonの統合は、数行のコードを計測することにより、任意のカスタムメトリックを監視することができます。たとえば、ページビュー数、または任意の関数呼び出しの時間を返すメトリックを持つことができます。 Pythonの統合の詳細については、提出メトリックにガイドを参照してください。高度な使用方法については、リポジトリ内のドキュメントを参照してください


<!-- 1. To install from pip:

        pip install datadog

2. Start instrumenting your code:

        # Configure the module according to your needs
        from datadog import initialize

        options = {
            'api_key':'api_key',
            'app_key':'app_key'
        }

        initialize(**options)

        # Use Datadog REST API client
        from datadog import api

        title = "Something big happened!"
        text = 'And let me tell you all about it here!'
        tags = ['version:1', 'application:web']

        api.Event.create(title=title, text=text, tags=tags)


        # Use Statsd, a Python client for DogStatsd
        from datadog import statsd

        statsd.increment('whatever')
        statsd.gauge('foo', 42)

        # Or ThreadStats, an alternative tool to collect and flush metrics,using Datadog REST API
        from datadog import ThreadStats
        stats = ThreadStats()
        stats.start()
        stats.increment('home.page.hits')

3. Go to the Metrics explorer page and see that it just works!
 -->

### 設定
{:#configuration}

1. 　pipをコマンドによりパッケージをインストールします:

        pip install datadog

2. 次のようにコードを記述していきます:

        # Configure the module according to your needs
        from datadog import initialize

        options = {
            'api_key':'api_key',
            'app_key':'app_key'
        }

        initialize(**options)

        # Use Datadog REST API client
        from datadog import api

        title = "Something big happened!"
        text = 'And let me tell you all about it here!'
        tags = ['version:1', 'application:web']

        api.Event.create(title=title, text=text, tags=tags)


        # Use Statsd, a Python client for DogStatsd
        from datadog import statsd

        statsd.increment('whatever')
        statsd.gauge('foo', 42)

        # Or ThreadStats, an alternative tool to collect and flush metrics,using Datadog REST API
        from datadog import ThreadStats
        stats = ThreadStats()
        stats.start()
        stats.increment('home.page.hits')

3. DatadogのMetrics explorerのページを表示し、収取しようとしているメトリクスがあるか確認します。
