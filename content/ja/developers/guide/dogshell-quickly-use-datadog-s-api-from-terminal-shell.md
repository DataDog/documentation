---
aliases:
- /ja/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
description: Use Datadog's API from Terminal or Shell
title: Dogshell
---

`dogshell` というラッパーを使用して、ターミナル/シェルから Datadog API を使用できます。

## セットアップ

Dogshell には、公式にサポートされた [datadogpy Python ライブラリ][1]が付属しており、[DogStatsD][2] で Datadog にデータを送信するためによく使用されます。インストール方法については、 [datadogpy GitHub リポジトリ][3]を参照してください。

このライブラリをインストールすると、ターミナル/シェルで `dog` コマンドを使用できるようになりますが、その際に「初期化」が必要です。初期化するには、このコマンドに API キーとアプリケーションキーを提供することで、アカウントとの間でデータを送受信できるようになります。初めて `dog` コマンドを実行しようとすると、初期化が必要と認識され、2 つのステップからなるプロセスが実行されます。

初期化セットアップがトリガーされる `dog` コマンドの例として (古い dog コマンドでも機能します)、以下を実行します。

```text
dog metric post test_metric 1
```

`.dogrc` ファイルがまだ作成されていない (dogshell が初期化されていない) 場合は、以下のような応答が返されます。

```text
~/.dogrc does not exist. Would you like to create it? [Y/n]
```

「Y」を入力します。次の応答があります。

```text
What is your api key? (Get it here: https://app.datadoghq.com/organization-settings/api-keys)
```

API キーを貼り付け、次に進みます。

```text
What is your application key? (Generate one here: https://app.datadoghq.com/organization-settings/api-keys)
```

アプリケーションキーを貼り付けます。以下のように終了します。

```text
Wrote ~/.dogrc.
```

次に、ターミナル/シェルからすばやく Datadog API を使用できるよう `dog` コマンドを使用します。`dog` コマンドの詳細なヘルプと情報については、`dog -h` を実行してください。

もし、自分で `.dogrc` ファイルを書きたい場合は、このファイルの内容は次のようになります。

{{< site-region region="us" >}}
```text
[Connection]
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us3" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us3.datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us5" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us5.datadoghq.com
{{< /site-region >}}
{{< site-region region="eu" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.eu
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ddog-gov.com
```
{{< /site-region >}}
{{< site-region region="ap1" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ap1.datadoghq.com
```
{{< /site-region >}}

これは、プログラム的に多くのサーバーにファイルをプッシュし、どのサーバーからでも `dog` コマンドを実行できるようにしたい場合に便利です。

## Dogshell コマンド

リファレンスは、[Dogshell のコードを参照してください][4]。Dogshell をインストールして初期化したら、以下のコマンドに `-h` オプションを追加すると、それぞれの Dogshell の使用方法を表示できます。

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

**Note**: The `dogshell` command sends data to the Datadog US1 by default. If you need to send data to another site you can do so using the `--api_host` option or by specificying an api_host in your `.dogrc` file.

### 実際の Dogshell

以下を使用して、Datadog アカウントにメトリクスをポストできます。

```text
dog metric post <METRIC_NAME> <METRIC_VALUE> --tags "<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_KEY_2>:<TAG_VALUE_2>"
```

たとえば、次のコマンドは、`test_dogshell_metric` という名前のメトリクスに値 1.0 とタグ `test:one` および `another_test` を指定してアカウントに送信します。

```text
dog metric post test_dogshell_metric 1.0 --tags "test:one,another_test"
```

Dogshell からメトリクスを送信する方法の詳細を表示するには、次のコマンドを実行します。

```text
dog metric post -h
```

{{< img src="developers/faq/dogshell_test.png" alt="dogshell_test" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell