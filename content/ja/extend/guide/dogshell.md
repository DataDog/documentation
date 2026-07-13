---
aliases:
- /ja/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /ja/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /ja/developers/guide/dogshell/
description: Terminal または Shell から Datadog の API を使用する
title: Dogshell
---
<div class="alert alert-danger">Dogshell は非推奨となり、<a href="/cli/">Pup CLI</a> に置き換えられました。これは、Datadog API と対話するための包括的な、AI-エージェント対応の CLI です。</div>

コマンドライン ラッパーである Dogshell を使用すると、Datadog API をコマンドラインから操作できます。

## Dogshell をインストール {#install-dogshell}

Dogshell には、公式にサポートされている [`datadogpy` Python ライブラリ][1] が付属しており、[`DogStatsD`][2] を使って Datadog API にデータを送信する際によく利用されます。ライブラリを PIP でインストールするには、次のコマンドを実行してください：

{{< code-block lang="shell" >}}
pip install datadog
{{< /code-block >}}

環境によっては、ライブラリを PATH に追加する必要がある場合があります。代替のインストール手順については、[`datadogpy` GitHub repo][3] を参照してください。

## Dogshell の設定 {#configure-dogshell}

Dogshell は、API キー、アプリケーションキー、Datadog サイトを保存するために `.dogrc` という構成ファイルを使用します。

Dogshell を設定する手順:
1. ホームディレクトリに `.dogrc` ファイルを作成してください：
   {{< code-block lang="shell" >}}
touch ~/.dogrc
{{< /code-block >}}

1. ファイルに以下の内容を追加し、`MY_API_KEY` と `MY_APP_KEY` をそれぞれの API キーとアプリケーションキーに置き換えてください：
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">You can create multiple configuration files if you need to run commands against different environments. Use the <code>--config</code> flag to specify the path to an alternative configuration file.</div>

1. Test the `dogshell` command by posting a test metric:
   {{< code-block lang="shell" >}}
dog metric post test_metric 1
{{< /code-block >}}

## Dogshell commands 

Use the `-h` flag for a full list of the available Dogshell commands:

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

You can append the `-h` option to the following commands to get more information on specific Dogshell usage:

* `dog metric`
* `dog event`
* `dog service_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog dashboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

For additional information, see the [Dogshell code][4].

### Dogshell example 

The following syntax posts a metric to your Datadog account:

{{< code-block lang="shell" disable_copy="true">}}
dog metric post MY_METRIC_NAME METRIC_VALUE --tags "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

For example, the following command sends a metric named `test_dogshell_metric` to your account with a value of `1.0` and the tags `test:one` and `example:one`:

{{< code-block lang="shell" >}}
dog metric post test_dogshell_metric 1.0 --tags "test:one,example:one"
{{< /code-block >}}

After you run the command, search for `test_dogshell_metric` using the [Metrics Explorer][5].

{{< img src="extend/guide/dogshell_test1.png" alt="Metrics Explorer から test_dogshell_metric を観察する" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer