---
aliases:
- /ja/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /ja/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
description: Terminal または Shell から Datadog の API を使用する
title: Dogshell
---

コマンドライン ラッパーである Dogshell を使用すると、Datadog API をコマンドラインから操作できます。

## Dogshell をインストールする

Dogshell は公式にサポートされている [`datadogpy` Python ライブラリ][1] に同梱されています。このライブラリは [`DogStatsD`][2] を使用して Datadog にデータを送信する際によく利用されます。pip でライブラリをインストールするには、次のコマンドを実行してください:

{{< code-block lang="shell" >}}
pip install datadog
{{< /code-block >}}

環境によっては、ライブラリを PATH に追加する必要があります。その他のインストール手順は [`datadogpy` の GitHub リポジトリ][3] を参照してください。

## Dogshell の設定

Dogshell は `.dogrc` という構成ファイルに API キー、アプリケーション キー、Datadog サイトを保存します。

Dogshell を設定する手順:
1. ホーム ディレクトリに `.dogrc` ファイルを作成します:
   {{< code-block lang="shell" >}}
touch ~/.dogrc
{{< /code-block >}}

1. ファイルに以下の内容を追加し、`MY_API_KEY` と `MY_APP_KEY` をそれぞれのキーに置き換えてください:
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">複数の環境でコマンドを実行する必要がある場合は、複数の構成ファイルを作成できます。<code>--config</code> フラグで別の構成ファイルへのパスを指定してください。</div>

1. テスト用メトリクスをポストして `dogshell` コマンドを確認します:
   {{< code-block lang="shell" >}}
dog metric post test_metric 1
{{< /code-block >}}

## Dogshell コマンド

利用可能な Dogshell コマンドの一覧は `-h` フラグで確認できます:

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

次のコマンドに `-h` オプションを付けると、各 Dogshell コマンドの詳細な使用方法を確認できます:

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

詳細は [Dogshell のコード][4] を参照してください。

### Dogshell の例

次の構文で Datadog アカウントにメトリクスを送信できます:

{{< code-block lang="shell" disable_copy="true">}}
dog metric post MY_METRIC_NAME METRIC_VALUE --tags "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

例として、次のコマンドは `test_dogshell_metric` というメトリクスを値 `1.0`、タグ `test:one` と `example:one` と共に送信します:

{{< code-block lang="shell" >}}
dog metric post test_dogshell_metric 1.0 --tags "test:one,example:one"
{{< /code-block >}}

コマンド実行後、[Metrics Explorer][5] で `test_dogshell_metric` を検索してください。

{{< img src="developers/guide/dogshell_test1.png" alt="Metrics Explorer で test_dogshell_metric を確認している様子" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer