---
title: Dogshell - ターミナル/シェルから Datadog API をすばやく使用
kind: ガイド
aliases:
  - /ja/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
---
`dogshell` というラッパーを使用して、ターミナル/シェルから Datadog API を使用できます。

## セットアップ

Dogshell には、公式にサポートされた [datadogpy Python ライブラリ][1]が付属しており、[DogStatsD][2] から Datadog にデータを送信するためによく使用されます。[インストール方法については、こちらを参照してください][3]。

このライブラリをインストールすると、ターミナル/シェルで `dog` コマンドを使用できるようになりますが、その際に「初期化」が必要です。このコマンドに API キーとアプリケーションキーを提供することで、アカウントとの間でデータを送受信できるようになります。初めて `dog` コマンドを実行しようとすると、初期化が必要と認識され、2 つのステップからなるプロセスが実行されます。

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
What is your api key? (Get it here: https://app.datadoghq.com/account/settings#api)
```

API キーを貼り付け、次に進みます。

```text
What is your application key? (Generate one here: https://app.datadoghq.com/account/settings#api)
```

アプリケーションキーを貼り付けます。以下のように終了します。

```text
Wrote ~/.dogrc.
```

これで、ターミナル/シェルから `dog` コマンドですばやく Datadog API を使用できるように設定が完了しました。`dog` コマンドの詳細なヘルプと情報については、`dog -h` を実行してください。

(ファイルを多くのサーバーにプログラムでプッシュして、どのサーバーからも `dog` コマンドを実行できるようにするために) `.dogrc` ファイルを自分で作成する場合、ファイルのコンテンツは以下のようになっている必要があります。

```text
[Connection]
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
```

## Dogshell コマンド

リファレンスは、[Dogshell のコードを参照してください][4]。Dogshell をインストールして初期化したら、以下のコマンドに `-h` オプションを追加すると、それぞれの Dogshell の使用方法を表示できます。

* `dog metric`
* `dog event`
* `dog status_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

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

{{< img src="developers/faq/dogshell_test.png" alt="dogshell_test"  >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /ja/developers/metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell