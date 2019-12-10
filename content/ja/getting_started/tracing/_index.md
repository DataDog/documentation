---
title: クイックスタートガイド - APM
kind: documentation
further_reading:
  - link: /tracing/visualization/
    tag: ドキュメント
    text: APM の UI を利用する
  - link: 'https://learn.datadoghq.com/enrol/index.php?id=4'
    tag: ラーニングセンター
    text: Docker を使用したアプリケーションパフォーマンス監視
---
## 概要
Datadog の APM (アプリケーションパフォーマンス監視機能) を使用して、バックエンドアプリケーションコードから[トレース][1]を収集できます。このクイックスタートガイドでは、トレースを Datadog に取り込む方法をご説明します。以下の手順に従ってください。

* [Datadog アカウントの作成](#create-a-datadog-account)
* [Agent のインストール](#install-the-agent)
* [APM Agent のセットアップ](#apm-agent-setup)
* [APM アプリケーションのセットアップ](#apm-application-setup)

## Datadog アカウントの作成
[Datadog アカウント][2]をまだ作成していない場合は作成します。

## Agent のインストール
Agent をインストールする前に、以下のコマンドを使用して [Vagrant Ubuntu 16.04 仮想マシン][3]を設定します。Vagrant の詳細については、[Getting Started][4] ペをご参照ください。

```
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

[Datadog API キー][6]を付加した [1 行のインストールコマンド][5]を使用して、Datadog Host Agent をインストールします。

```
DD_API_KEY=<YOUR_DD_API_KEY> bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### 検証
[ステータスコマンド][7]を使用して、Agent が実行されていることを確認します。

```
sudo datadog-agent status
```

数分経過したら、Datadog で [Infrastructure List][8] をチェックして、Agent がアカウントに接続されていることを確認します。

## APM Agent のセットアップ
### APM を有効にする
最新バージョンの Agent v6 では、APM はデフォルトで有効になっています。これは、Agent の[構成ファイル][9]で確認できます。

```
# /etc/datadog-agent/datadog.yaml:
# apm_config:
#   APM Agent を実行するかどうか
#   enabled: true
```

`trace-agent.log` でも確認できます。

```
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-xenial
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### 環境名
(任意) - 以下に示すように、`apm_config` の下で `env` を設定して `datadog.yaml` を更新することで、環境に名前を付けることができます。

```
apm_config:
  enabled: true
  env: hello_world
```

次に、Datadog Agent を[再起動][10]します。

```
sudo service datadog-agent restart
```

## APM アプリケーションのセットアップ
### インストール
アプリケーションを設定する前に、まず Ubuntu VM 上に `pip` をインストールし、次に `flask` と `ddtrace` をインストールします。

```
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

```
ddtrace-run python hello.py
```

次のような出力が表示されます。

```
* Serving Flask app "hello" (lazy loading)
  ...
* Running on http://0.0.0.0:5050/ (Press CTRL+C to quit)
```

### テスト
アプリケーションをテストし、`curl` を使用して Datadog にトレースを送信します。アプリケーションは (上述のように) 実行中のはずです。別のコマンドプロンプトで、以下を実行します。

```
vagrant ssh
curl http://0.0.0.0:5050/
```

以下が出力されます。

```
hello world
```

数分経過すると、Datadog の `flask` サービスの下にトレースが表示されます。[Services ページ][11]または[トレースの一覧][12]をご確認ください。

{{< img src="getting_started/tracing-services-list.png" alt="Tracing Services List" responsive="true">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/#terminology
[2]: https://www.datadoghq.com
[3]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[4]: https://www.vagrantup.com/intro/getting-started/index.html
[5]: https://app.datadoghq.com/account/settings#agent/ubuntu
[6]: https://app.datadoghq.com/account/settings#api
[7]: /ja/agent/guide/agent-commands/#agent-information
[8]: https://app.datadoghq.com/infrastructure
[9]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: /ja/agent/guide/agent-commands/#restart-the-agent
[11]: https://app.datadoghq.com/apm/services
[12]: https://app.datadoghq.com/apm/traces