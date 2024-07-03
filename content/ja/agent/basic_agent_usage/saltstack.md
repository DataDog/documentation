---
dependencies:
- https://github.com/DataDog/datadog-formula/blob/main/README.md
title: SaltStack
---
Datadog SaltStack Formula は、Datadog Agent および Agent ベースのインテグレーション (チェック) のインストールに使用する計算式です。SaltStack Formula について詳しくは、[Salt 計算式のインストールと使用方法][1]を参照してください。

## セットアップ

### 要件

Datadog SaltStack Formula は、Debian および RedHat ベースのシステムにのみインストールできます。

### インストール

以下の手順で、Datadog Formula を `base` Salt 環境に追加します。別の Salt 環境に追加する場合は、参照先の `base` を お使いの Salt 環境名に変更してください。

#### オプション 1

[Datadog Formula][6] を、Salt マスターコンフィギュレーションファイル (デフォルト: `/etc/salt/master`) 内の `gitfs_remotes` オプションを使用して Salt マスターノードのベース環境にインストールします。

```text
fileserver_backend:
  - roots # デフォルトで有効。次のステップで定義するローカルの Salt ファイルを使用できることが必須
  - gitfs # gitfs_remotes を使用できるよう、gitfs をファイルサーバーのバックエンドとして追加

gitfs_remotes:
  - https://github.com/DataDog/datadog-formula.git:
    - saltenv:
      - base:
        - ref: 3.0 # 必要に応じて計算式のバージョンを固定
```

次に、Salt マスターサービスを再起動してコンフィギュレーションの変更を適用します。

```shell
systemctl restart salt-master
# または
service salt-master restart
```

#### オプション 2

または、Salt マスターノードで Datadog Formula を複製します。

```shell
mkdir -p /srv/formulas && cd /srv/formulas
git clone https://github.com/DataDog/datadog-formula.git
```

次に、複製した Formula をベース環境に追加します。お使いの Salt マスターコンフィギュレーションファイル (デフォルト: `/etc/salt/master`) の `file_roots` 下に追加してください。

```text
file_roots:
  base:
    - /srv/salt/
    - /srv/formulas/datadog-formula/
```

### デプロイ

ホスト上で Datadog Agent をデプロイするには:

1. Datadog Formula をトップファイル (デフォルト: `/srv/salt/top.sls`) に追加します。

    ```text
    base:
      '*':
        - datadog
    ```

2. ピラーディレクトリ (デフォルト: `/srv/pillar/`) 内に `datadog.sls` を作成します。以下を追加して [Datadog API キー][2]を更新します。

    ```
    datadog:
      config:
        api_key: <YOUR_DD_API_KEY>
      install_settings:
        agent_version: <AGENT7_VERSION>
    ```

3. トップのピラーファイル (デフォルト: `/srv/pillar/top.sls`) に `datadog.sls` を追加します。

    ```text
    base:
      '*':
        - datadog
    ```

### 構成

計算式のコンフィギュレーションはピラーファイルの `datadog` キー内に記述する必要があります。これには `config`、 `install_settings`、`checks` の 3 つが含まれます。

#### 構成

`config` の下に、ミニオンの Agent コンフィギュレーションファイル (Agent v6 および v7 の場合は `datadog.yaml`、Agent v5 の場合は `datadog.conf`) に書き込むためのコンフィギュレーションオプションを追加します。

インストールされている Agent のバージョンに応じてそれぞれオプションを設定します。

- Agent v6 & v7: Agent のコンフィギュレーションファイルでサポートされているすべてのオプションを使用できます。
- Agent v5: `api_key` オプションのみサポートされます。

以下の例では、Datadog API キーと Datadog サイトを `datadoghq.eu` に設定しています (Agent v6 & v7 で利用可能) 。

```text
  datadog:
    config:
      api_key: <DD_API_キー>
      site: datadoghq.eu
```

#### インストール設定

`install_settings` 下で、Agent のインストールオプションを構成します。

- `agent_version`: インストールする Agent のバージョンです (デフォルトは最新の Agent v7 となります) 。

以下の例では Agent v6.14.1 のインストールを行います。

```text
  datadog:
    install_settings:
      agent_version: 6.14.1
```

#### チェック

ホストに Agent インテグレーションを追加するには、`checks` 変数とチェックの名前を合わせてキーとして使用します。各チェックに 2 つのオプションが存在します。

| オプション    | 説明                                                                                                                                                             |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `config`  | チェックのコンフィギュレーションファイルに書き込むためのコンフィギュレーションオプションを追加します。<br>Agent v6 & v7: <confd_path>/<check>.d/conf.yaml`<br>Agent v5: `<confd_path>/<check>.yaml` |
| `version` | Agent v6 & v7 環境でインストールするチェックのバージョン (デフォルトは Agent にバンドルされたバージョンとなります) 。                                                                |
| `third_party` | Agent v6 と v7（バージョン v6.21.0/v7.21.0 以降のみ）の場合、インストールするインテグレーションがサードパーティインテグレーションであることを示すブール値。`version` オプションとペアで使用する必要があります。                                                                |

以下は `/srv/pillar` ディレクトリを監視する[ディレクトリ][3]インテグレーション の v1.4.0 を使用した例です。

```text
datadog:
  config:
    api_key: <DD_API_キー>
  install_settings:
    agent_version: <AGENT7_バージョン>
  checks:
    directory:
      config:
        instances:
          - directory: "/srv/pillar"
            name: "pillars"
      version: 1.4.0
```

以下は、「サードパーティインテグレーション」と名付けられたサンプルのサードパーティインテグレーションの v1.0.0 を使用した例です。

```
datadog:
  config:
    api_key: <YOUR_DD_API_KEY>
  install_settings:
    agent_version: <AGENT7_VERSION>
  checks:
    third-party-integration:
      config:
        instances:
          - some_config: "some value"
      version: 1.0.0
      third_party: true
```

##### Logs

ログ収集を有効にするには、メインのコンフィギュレーションで `logs_enabled` を `true` に設定します。
```text
datadog:
  config:
    logs_enabled: true
```

ログを Datadog に送信するには、チェック（インテグレーションにログを設定する既存のチェックまたはカスタムログ収集を設定するカスタムチェック）で `logs` キーを使用します。以下の例では、`system_logs` という名前のカスタムチェックを使用します。

このチェックの `config:` キーのコンテンツは、`/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml` ファイル（この例では `/etc/datadog-agent/conf.d/system_logs.d/conf.yaml`）に書き込まれます。

収集するログの一覧を作成するには、カスタムログ収集のコンフィギュレーションファイルの `conf.yaml` への入力と同じ要領で、`config` セクションに入力します（公式ドキュメントの[カスタムログ収集](https://docs.datadoghq.com/agent/logs/?tab=tailfiles#カスタムログ収集) のセクションを参照）。

例えば、`/var/log/syslog` および `/var/log/auth.log` からログを収集するには、コンフィギュレーションは以下のようになります。

```text
datadog:
[...]
  checks:
    system_logs:
      config:
        logs:
          - type: file
            path: "/var/log/syslog"
            service: "system"
          - type: file
            path: "/var/log/auth.log"
            service: "system"
```


## 状態

Salt Formula には Salt の状態が事前に記述されています。Datadog Formula で利用可能な状態は以下の通りです。

| 状態               | 説明                                                                                             |
|---------------------|---------------------------------------------------------------------------------------------------------|
| `datadog`           | Datadog Agent サービスをインストール、構成、起動します。                                             |
| `datadog.install`   | Datadog Agent の適切なリポジトリとインストールを構成します。                                             |
| `datadog.config`    | Datadog Agent、およびピラーデータを使用したインテグレーション ([pillar.example][4] を参照) を構成します。              |
| `datadog.service`   | Agent およびチェック用のコンフィギュレーションファイルの変更を監視する Datadog Agent サービスを実行します。 |
| `datadog.uninstall` | サービスを停止して Datadog Agent をアンインストールします。                                                     |

**注**: `datadog.config` を使用して別のマシンで異なるチェックのインスタンスを構成する場合は、Salt マスターコンフィギュレーションまたは Salt ミニオンコンフィギュレーション (マスターなしの場合) の [pillar_merge_lists][5] を必ず `True` に設定してください。

[1]: http://docs.saltstack.com/en/latest/topics/development/conventions/formulas.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ja/integrations/directory/
[4]: https://github.com/DataDog/datadog-formula/blob/master/pillar.example
[5]: https://docs.saltstack.com/en/latest/ref/configuration/master.html#pillar-merge-lists
[6]: https://github.com/DataDog/datadog-formula