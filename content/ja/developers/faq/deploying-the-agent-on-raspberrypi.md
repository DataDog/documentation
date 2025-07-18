---
kind: faq
title: Agent を RaspberryPI にデプロイする
---

**Raspbian を使用する場合**

1. ローカルキャッシュの更新から始めます

    ```shell
    sudo apt-get update
    ```

2. その後、`sysstat` をインストールします。

    ```text
    sudo apt-get install sysstat
    ```

3. Datadog の [Agent インストール画面に移動][1]し、"from source" を選択します
4. インストールコマンドを実行します。

    ```shell
    DD_API_KEY=<YOUR-API-KEY> sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
    ```

**注**: Raspberry PI のモデルによっては、インストールに最大 30 分かかる場合があります。

インストール成功後の出力例:

![RaspberryPI のインストール](https://raw.githubusercontent.com/DataDog/documentation/master/static/images/developers/faq/rasberypi_install.png)

Agent はフォアグラウンドで実行されます。一部のユーザーは、次のように Agent のために `systemd` サービスを作成することに利点を見出します。

```text
#/etc/systemd/system/datadog.service

[Unit]
Description=Datadog Agent

[Service]
ExecStart=/path/to/.datadog-agent/bin/agent

[Install]
WantedBy=multi-user.target
```

次に、以下を実行します。

```shell
systemctl daemon-reload
sudo systemctl enable datadog
systemctl start datadog
```

Datadog Agent は、インストールコマンドを実行した作業ディレクトリにインストールされます (例: `/home/pi/.datadog-agent/`)。

Raspberry PI デバイスから取り込まれるメトリクスの例:

![RaspberryPI ダッシュボード](https://raw.githubusercontent.com/DataDog/documentation/master/static/images/developers/faq/rasberry_dashboard.png)

**注**: Datadog は Raspbian を正式にサポートしていません。

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=source