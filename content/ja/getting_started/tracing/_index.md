---
title: トレースの概要
kind: documentation
aliases:
  - /ja/getting_started/tracing/distributed-tracing
further_reading:
  - link: /tracing/setup/
    tag: ドキュメント
    text: アプリケーション言語の選択
  - link: /tracing/visualization/
    tag: ドキュメント
    text: APM の UI を利用する
  - link: 'https://learn.datadoghq.com/enrol/index.php?id=4'
    tag: ラーニングセンター
    text: Docker を使用したアプリケーションパフォーマンス監視
---
## 概要

Datadog の APM (アプリケーションパフォーマンス監視機能、またはトレース) を使用して、バックエンドアプリケーションコードから[トレース][1]を収集できます。このビギナーガイドでは、トレースを Datadog に取り込む方法をご説明します。

**注**: Datadog APM は、多くの言語とフレームワークで使用できます。[アプリケーションのインスツルメンテーション][2]のドキュメントを参照してください。

## Datadog アカウント

[Datadog アカウント][3]をまだ作成していない場合は作成します。

## Datadog Agent

Datadog Agent をインストールする前に、以下のコマンドを使用して [Vagrant Ubuntu 16.04 仮想マシン][4]を設定します。Vagrant の詳細については、[はじめに][5]ページをご参照ください。

```text
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

[Datadog API キー][7]を付加した [1 行のインストールコマンド][6]を使用して、Datadog Host Agent をインストールします。

{{< site-region region="us" >}}

```shell
DD_API_KEY=<DATADOG_API_KEY>  bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.eu" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="ddog-gov.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="us3.datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

{{< /site-region >}}

### 検証

[ステータスコマンド][8]を使用して、Agent が実行されていることを確認します。

```shell
sudo datadog-agent status
```

数分経過したら、Datadog で [Infrastructure List][9] をチェックして、Agent がアカウントに接続されていることを確認します。

## Datadog APM

### アプリ内のドキュメントに従ってください (推奨)

残りのステップを実行し、Datadog アプリ内の[クイックスタート手順][10]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (この場合はホストベースのデプロイメント) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に Continuous Profiler、トレースの 100% の取り込み、およびトレース ID 挿入を有効にします。


### APM を有効にする

最新バージョンの Agent v6 と v7 では、APM はデフォルトで有効化されています。これは、Agent の [`datadog.yaml` コンフィギュレーションファイル][11]で確認できます。

```yaml
# apm_config:
#   APM Agent の実行の有無
#   enabled: true
```

`trace-agent.log` でも確認できます。

```shell
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-xenial
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### 環境名

最高の体験になるよう、環境変数 `DD_ENV` を使用して、サービスのトレーサーを通じて `env` を構成することをお勧めします。

さらに、トレーサーでログの挿入が有効になっている場合、`env` はトレースとログ全体で一貫しています。
これがどのように機能するかについては、[統合サービスタグ付け][12]を参照してください。

または、`datadog.yaml` を更新して環境に名前を付けて、`apm_config` で `env` を設定します。APM の `env` の設定の詳細については、[スコープへのプライマリタグの設定に関するガイド][13]を参照してください。

## APM アプリケーション

### インストール

アプリケーションを設定する前に、まず Ubuntu VM 上に `pip` をインストールし、次に `flask` と `ddtrace` をインストールします。

```shell
sudo apt-get install python-pip
pip install flask
pip install ddtrace
```

### 作成

Ubuntu VM 上に、以下の内容でアプリケーション `hello.py` を作成します。

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'hello world'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
```

### 実行

`ddtrace` を使用して `hello.py` を実行します。`ddtrace` は Datadog でアプリケーションを自動的に計測します。

```shell
export DD_SERVICE=hello
ddtrace-run python hello.py
```

次のような出力が表示されます。

```shell
* Serving Flask app "hello" (lazy loading)
  ...
* Running on http://0.0.0.0:5050/ (Press CTRL+C to quit)
```

### テスト

アプリケーションをテストし、`curl` を使用して Datadog にトレースを送信します。アプリケーションは (上述のように) 実行中のはずです。別のコマンドプロンプトで、以下を実行します。

```text
vagrant ssh
curl http://0.0.0.0:5050/
```

以下が出力されます。

```text
hello world
```

数分経過すると、Datadog の `hello` サービスの下にトレースが表示されます。[サービスページ][14]または[トレースの一覧][15]をご確認ください。

{{< img src="getting_started/tracing-services-list.png" alt="トレースサービス一覧" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/#terminology
[2]: https://docs.datadoghq.com/ja/tracing/setup/
[3]: https://www.datadoghq.com
[4]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[5]: https://www.vagrantup.com/intro/getting-started
[6]: https://app.datadoghq.com/account/settings#agent/ubuntu
[7]: https://app.datadoghq.com/account/settings#api
[8]: /ja/agent/guide/agent-commands/#agent-information
[9]: https://app.datadoghq.com/infrastructure
[10]: https://app.datadoghq.com/apm/docs
[11]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[12]: /ja/getting_started/tagging/unified_service_tagging
[13]: /ja/tracing/guide/setting_primary_tags_to_scope/
[14]: https://app.datadoghq.com/apm/services
[15]: https://app.datadoghq.com/apm/traces