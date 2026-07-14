既存のインストールの場合、構成が `conf.d/oracle-dbm.d/` ディレクトリにあることを確認します。レガシー構成を `conf.d/oracle.d/` ディレクトリから移行する必要があるかもしれません。

次のコマンドを使用して、Oracle インテグレーションをレガシーインテグレーションから新しいインテグレーションに移行します。

```shell
cp /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

レガシーインテグレーションを非アクティブにします。

```shell
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle.d/conf.yaml.bak
```

レガシーインテグレーションを非アクティブにすると、システムメトリクスが 2 回送信されなくなります。

Datadog Agent は外部の Oracle クライアントを必要としないので、新しいパラメーターファイル `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml` から `jdbc_driver_path` 構成パラメーターを削除します。