---
app_id: cri
categories:
- incident-teams
- kubernetes
custom_kind: integration
description: CRI のすべてのメトリクスを Datadog で追跡
integration_version: 1.0.0
media: []
supported_os:
- linux
title: CRI
---
## 概要

このチェックは Container Runtime Interface を監視します

## セットアップ

### インストール

CRI is a core [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) check that needs to be configured in the `datadog.yaml` with the `cri.d/conf.yaml`.

`datadog.yaml` で、Agent が現在の CRI への問い合わせに使用する `cri_socket_path` を構成します (デフォルトのタイムアウトも構成できます)。CRI (`containerd` など) がディスク使用状況メトリクスを報告する場合は、`cri.d/conf.yaml` で、`collect_disk` などのチェックインスタンス設定を構成します。

**注**: コンテナで Agent を使用している場合は、`DD_CRI_SOCKET_PATH` 環境変数を設定すると、デフォルト構成の `CRI` チェックが自動的に有効になります。

#### コンテナへのインストール

コンテナで Agent を使用している場合は、`DD_CRI_SOCKET_PATH` 環境変数を CRI ソケットに設定すると、デフォルト構成の `CRI` インテグレーションが自動的に有効になります。

たとえば、Kubernetes でインテグレーションをインストールするには、daemonset を編集して、CRI ソケットをホストノードから Agent コンテナにマウントし、`DD_CRI_SOCKET_PATH` 環境変数を DaemonSet の mountPath に設定します。

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_ソケットパス
              value: /var/run/crio/crio.sock
          volumeMounts:
            - name: crisocket
              mountPath: /var/run/crio/crio.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/crio/crio.sock
              name: crisocket
            - hostPath:
                path: /var/run
              name: var-run
```

**注:** 問題なくインテグレーションを実行するには、ホストから `/var/run` ディレクトリをマウントする必要があります。

### 設定

1. Edit the `cri.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your crio performance data. See the [sample cri.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.default) for all available configuration options.

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 検証

Run the Agent's [status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) and look for `cri` under the Checks section.

## 収集データ

### メトリクス

CRI collect metrics about the resource usage of your containers running through the CRI.

CPU and memory metrics are collected out of the box and you can additionally collect some disk metrics if they are supported by your CRI (CRI-O doesn't support them).

| | |
| --- | --- |
| **cri.cpu.usage** <br>(gauge) | Cumulative CPU usage (sum across all cores) since object creation<br>_Shown as nanocore_ |
| **cri.disk.inodes** <br>(gauge) | Represents the inodes used by the images<br>_Shown as inode_ |
| **cri.disk.used** <br>(gauge) | Represents the bytes used for images on the filesystem<br>_Shown as byte_ |
| **cri.mem.rss** <br>(gauge) | The amount of working set memory in bytes <br>_Shown as byte_ |
| **cri.uptime** <br>(gauge) | Time since the container was started<br>_Shown as second_ |

### サービス チェック

CRI には、サービスのチェック機能は含まれません。

### イベント

CRI には、イベントは含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。