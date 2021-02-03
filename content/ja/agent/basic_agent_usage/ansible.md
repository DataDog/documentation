---
dependencies:
  - 'https://github.com/DataDog/ansible-datadog/blob/master/README.md'
kind: ドキュメント
title: Ansible
---
Ansible Datadog のロールは、Datadog Agent とインテグレーションのインストール、および構成を行います。バージョン `4` のロールを使用すると、デフォルトで Datadog Agent v7 がインストールされます。

## セットアップ

### 要件

- Ansible v2.6 以上。
- Debian と RHEL ベースの Linux ディストリビューション、および Windows のほとんどをサポートしていること。

### インストール

[Datadog のロール][1]を Ansible サーバー上で、Ansible Galaxy からインストールします。

```shell
ansible-galaxy install datadog.datadog
```

Datadog Agent をホストにデプロイするには、Datadog のロールと API キーをプレイブックに追加します。

```text
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<DD_API_キー>"
```

#### ロールの変数

| 変数                                   | 説明                                                                                                                                                                                                                                                                                               |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog_api_key`                          | Datadog API キー。                                                                                                                                                                                                                                                                                     |
| `datadog_site`                             | Agent データの送信先である Datadog インテークのサイト。デフォルトでは `datadoghq.com` ですが、`datadoghq.eu` に設定すると、EU サイトにデータが送信されます。このオプションは、バージョン 6.6.0 以上の Agent でのみ使用可能です。                                                                                                          |
| `datadog_agent_flavor`                     | RPI 上の IOT インストールに対するデフォルトの Debian / Redhat パッケージをオーバーライドします。デフォルトが "datadog-agent" の場合、RPI には "datadog-iot-agent" を使用します。                                                                                                                                                                 |  
| `datadog_agent_version`                    | インストールする Agent のバージョンを固定します（例: `7.16.0`）。設定は任意ですが、推奨されています。`datadog_agent_version` を使用する場合、`datadog_agent_major_version` の設定は不要です。**注**: ダウングレードは、Windows プラットフォームではサポートされていません。                                                       |
| `datadog_agent_major_version`              | インストールする Agent のメジャーバージョン。5、6、または 7（デフォルト）を設定できます。`datadog_agent_version` を設定している場合はそれが優先されますが、そうでなければ、指定されたメジャーバージョンの中で最新のバージョンがインストールされます。`datadog_agent_version` を使用する場合、`datadog_agent_major_version` の設定は不要です。 |
| `datadog_checks`                           | Agent チェックのために追加する YAML コンフィギュレーション。<br> - Agent v6 および v7 では `/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml` <br> - Agent v5 では `/etc/dd-agent/conf.d`                                                                                                                            |
| `datadog_disable_untracked_checks` | `datadog_checks` および `datadog_additional_checks` に存在しないすべてのチェックを削除するには `true` に設定します。 |
| `datadog_additional_checks` | `datadog_disable_untracked_checks` が `true` に設定されている場合に削除されない、その他のチェックの一覧。 |
| `datadog_disable_default_checks` | すべてのデフォルトチェックを削除するには、`true` に設定します。 |
| `datadog_config`                           | メインの Agent コンフィギュレーションの設定。<br> - Agent v6 および v7 では `/etc/datadog-agent/datadog.yaml` <br> - Agent v5 では `/etc/dd-agent/datadog.conf`（`[Main]` セクションの下）                                                                                                               |
| `datadog_config_ex`                        | （任意）`/etc/dd-agent/datadog.conf` に追加する INI セクション（Agent v5 のみ）。                                                                                                                                                                                                                      |
| `datadog_apt_repo`                         | デフォルトの Datadog `apt` レポジトリを上書きします。                                                                                                                                                                                                                                                            |
| `datadog_apt_cache_valid_time`             | デフォルトの apt キャッシュの有効期限を上書きします（デフォルトでは 1 時間）。                                                                                                                                                                                                                                      |
| `datadog_apt_key_url_new`                  | Datadog `apt` キーへのデフォルトの URL を上書きします。非推奨の `datadog_apt_key_url` 変数は、ロールから削除された期限切れのキー（キー ID : `382E94DE`）を参照します。                                                                                                                             |
| `datadog_yum_repo`                         | デフォルトの Datadog `yum` レポジトリを上書きします。                                                                                                                                                                                                                                                            |
| `datadog_yum_gpgkey`                       | Agent v5 および v6（6.13 以下）のパッケージの検証に使用される Datadog `yum` キー（キー ID : `4172A230`）へのデフォルト URL を上書きします。                                                                                                                                                                               |
| `datadog_yum_gpgkey_e09422b3`              | Agent 6.14 以上のパッケージの検証に使用される Datadog `yum` キー（キー ID : `E09422B3`）へのデフォルト URL を上書きします。                                                                                                                                                                                               |
| `datadog_yum_gpgkey_e09422b3_sha256sum`    | `datadog_yum_gpgkey_e09422b3` キーの、デフォルトのチェックサムを上書きします。                                                                                                                                                                                                                                   |
| `datadog_zypper_repo`                      | デフォルトの Datadog `zypper` レポジトリを上書きします。                                                                                                                                                                                                                                                         |
| `datadog_zypper_gpgkey`                    | Agent v5 および v6（6.13 以下）のパッケージの検証に使用される Datadog `zypper` キー（キー ID : `4172A230`）へのデフォルト URL を上書きします。                                                                                                                                                                            |
| `datadog_zypper_gpgkey_sha256sum`          | `datadog_zypper_gpgkey` キーの、デフォルトのチェックサムを上書きします。                                                                                                                                                                                                                                         |
| `datadog_zypper_gpgkey_e09422b3`           | Agent 6.14 以上のパッケージの検証に使用される Datadog `zypper` キー（キー ID : `E09422B3`）へのデフォルト URL を上書きします。                                                                                                                                                                                            |
| `datadog_zypper_gpgkey_e09422b3_sha256sum` | `datadog_zypper_gpgkey_e09422b3` キーの、デフォルトのチェックサムを上書きします。                                                                                                                                                                                                                                |
| `datadog_agent_allow_downgrade`            | `yes` に設定すると、apt ベースのプラットフォームで Agent のダウングレードが可能になります（注意事項あり。詳しくは `defaults/main.yml` を確認してください）。**注**: CentOS では、Ansible 2.4 以上でのみ可能になります。                                                                                                                             |
| `use_apt_backup_keyserver`                 | `true` に設定すると、デフォルトではなくバックアップのキーサーバーを使用します。                                                                                                                                                                                                                                     |
| `datadog_enabled`                          | `false` に設定すると、`datadog-agent` のサービスが開始されなくなります（デフォルトでは `true`）。                                                                                                                                                                                                                     |
| `datadog_additional_groups`                | `datadog_user` に追加するグループのリスト、またはグループをコンマで区切ったリストの文字列（Linux のみ）。                                                                                                                                                                                    |
| `datadog_windows_ddagentuser_name`         | 作成または使用する Windows ユーザーの名前。`<domain>\<user>` の形式で指定します（Windows のみ）。                                                                                                                                                                                                                   |
| `datadog_windows_ddagentuser_password`     | ユーザーの作成、あるいはサービスの登録に使用するパスワード（Windows のみ）。                                                                                                                                                                                                                          |

### インテグレーション

Datadog インテグレーション（チェック）を構成するには、`datadog_checks` セクションにエントリを追加します。第 1 レベルのキーにチェックの名前を入力し、値にはコンフィギュレーションファイルに記載する YAML ペイロードを入力します。以下にその例を示します。

#### プロセスチェック

`process` チェックに 2 つのインスタンスを定義するには、以下のコンフィギュレーションを使用します。これにより、それぞれに対応するコンフィギュレーションファイルが作成されます。

* Agent v6 および v7: `/etc/datadog-agent/conf.d/process.d/conf.yaml`
* Agent v5: `/etc/dd-agent/conf.d/process.yaml`

```yml
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

#### カスタムチェック

カスタムチェックを構成するには、以下のコンフィギュレーションを使用します。これにより、それぞれに対応するコンフィギュレーションファイルが作成されます。

- Agent v6 および v7: `/etc/datadog-agent/conf.d/my_custom_check.d/conf.yaml`
- Agent v5: `/etc/dd-agent/conf.d/my_custom_check.yaml`

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
```

#### オートディスカバリー

オートディスカバリーを使用する場合は、YAML での前処理も後処理も必要ありません。つまり、`autodiscovery identifiers` を含むすべての YAML セクションが、完成後のコンフィギュレーションファイルに追加されます。

以下は、**オートディスカバリー**による PostgreSQL チェックを構成する例です。

```yml
    datadog_checks:
      postgres:
        ad_identifiers:
          - db-master
          - db-slave
        init_config:
        instances:
          - host: %%host%%
            port: %%port%%
            username: ユーザー名
            password: パスワード
```

詳しくは、[Datadog のオートディスカバリーに関するドキュメント][3]を参照してください。

### トレーシング

Agent v6 または v7 でトレース収集を有効にするには、以下のコンフィギュレーションを使用します。

```yaml
datadog_config:
  apm_config:
    enabled: true
```

Agent v5 でトレース収集を有効にするには、以下のコンフィギュレーションを使用します。

```yaml
datadog_config:
  apm_enabled: "true" # 文字列であることが必要
```

### ライブプロセス

Agent v6 または v7 で[ライブプロセス][6]収集を有効にするには、以下のコンフィギュレーションを使用します。

```yml
datadog_config:
  process_config:
    enabled: "true" # 型: 文字列
```

`enabled` の値には `"true"`、`"false"`（コンテナ収集のみ）、`"disabled"`（ライブプロセスを完全に無効化）を指定できます。

#### 変数

ライブプロセスには、以下の変数を使用できます。

* `scrub_args`: プロセスのコマンドラインで、機密性の高い引数のスクラビングを有効にします（デフォルトでは `true`）。
* `custom_sensitive_words`: コマンドラインのスクラビング機能が使用する、機密語のデフォルトリストを拡張します。

#### システムプローブ

[ネットワークパフォーマンスモニタリング][7]（NPM）のシステムプローブを、`system_probe_config` 変数の下に構成します。その下にネストされる変数はすべて、`system-probe.yaml` に書き込まれます。

**注**: システムプローブを使用できるのは、Agent v6 以上の Linux のみです。

#### 構成サンプル

```yml
datadog_config:
  process_config:
    enabled: "true" # 型: 文字列
    scrub_args: true
    custom_sensitive_words: ['consul_token','dd_api_key']
system_probe_config:
  enabled: true
  sysprobe_socket: /opt/datadog-agent/run/sysprobe.sock
```

変更が終わったら、以下の手順に従ってください。

1. システムプローブを起動します: `sudo service datadog-agent-sysprobe start` **注**: ご使用のシステムで service ラッパーを使用できない場合は、代わりに次のコマンドを使用してください: `sudo initctl start datadog-agent-sysprobe`。
2. [Agent を再起動します][8]: `sudo service datadog-agent restart`
3. システムプローブがブートから起動されるようにします: `sudo service enable datadog-agent-sysprobe`。

手動でセットアップする場合は、[NPM][9] のドキュメントを参照してください。

#### Agent v5

Agent v5 で[ライブプロセス][6]収集を有効にするには、以下のコンフィギュレーションを使用します。

```yml
datadog_config:
  process_agent_enabled: true
datadog_config_ex:
  process.config:
    scrub_args: true
    custom_sensitive_words: "<最初の語>,<次の語>"
```

### その他のタスク

`pre_tasks` と `post_tasks` のフォルダーを使用して、ユーザー定義のタスクを実行できます。Datadog Ansible ロールにあるタスクの実行前には `pre_tasks` のタスクが、実行後には `post_tasks` のタスクが、必ず実行されます。

サポート対象のプラットフォームでインストールタスクを行うと、`datadog_agent_install` 変数が登録されます。この変数を `post_tasks` で使用することにより、インストールタスクの結果をチェックできます。インストールタスクによって何かがインストールされると、`datadog_agent_install.changed` が `true` にセットされ、それ以外なら（要求したバージョンがすでにインストールされていたなど）`false` がセットされます。

## バージョン

デフォルトでは、Datadog Ansible ロールの現在のメジャーバージョンは、Agent v7 をインストールします。`datadog_agent_version` と `datadog_agent_major_version` の変数を使用すると、インストールされる Agent のバージョンをコントロールできます。

このロールのバージョン v4 以上では、`datadog_agent_version` を使用して Agent のバージョンを固定すると、ロールはサポート対象の OS のバージョン命名スキームに従って、OS ごとに異なるバージョン名を作成します。たとえば以下のようになります。

- Debian および SUSE ベースの場合は `1:7.16.0-1`
- Redhat ベースの場合は `7.16.0-1`
- Windows の場合は `7.16.0`

これにより、ホストが複数の OS で稼働している場合に、バージョンを指定することが可能になります。以下に例を示します。

| 指定された内容                            | インストール     | システム                |
|-------------------------------------|--------------|-----------------------|
| `datadog_agent_version: 7.16.0`     | `1:7.16.0-1` | Debian および SUSE ベース |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | Redhat-based          |
| `datadog_agent_version: 7.16.0`     | `7.16.0`     | Windows               |
| `datadog_agent_version: 1:7.16.0-1` | `1:7.16.0-1` | Debian および SUSE ベース |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0-1`   | Redhat-based          |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0`     | Windows               |

**バージョン**: バージョンを指定しない場合、ロールはエポックに `1` を、リリース番号に `1` を使用します。

**Agent v5（旧バージョン）**:

Datadog Ansible ロールは、Linux のみを対象として、Datadog Agent v5 をサポートしています。Agent v5 をインストールする場合は、`datadog_agent_major_version: 5` を使用することで、Agent v5 の最新バージョンをインストールできます。あるいは、`datadog_agent_version` を設定して、Agent v5 の特定のバージョンをインストールすることもできます。**注**: `datadog_agent5` 変数は非推奨であり、削除されています。

### リポジトリ

#### Linux

`datadog_apt_repo`、`datadog_yum_repo`、`datadog_zypper_repo` の変数が設定されていない場合、`datadog_agent_major_version` に設定されたメジャーバージョンの Datadog 公式リポジトリが使用されます。

| # | デフォルト apt リポジトリ                    | デフォルト yum リポジトリ             | デフォルト zypper リポジトリ               |
|---|-------------------------------------------|------------------------------------|-----------------------------------------|
| 5 | deb https://apt.datadoghq.com stable main | https://yum.datadoghq.com/rpm      | https://yum.datadoghq.com/suse/rpm      |
| 6 | deb https://apt.datadoghq.com stable 6    | https://yum.datadoghq.com/stable/6 | https://yum.datadoghq.com/suse/stable/6 |
| 7 | deb https://apt.datadoghq.com stable 7    | https://yum.datadoghq.com/stable/7 | https://yum.datadoghq.com/suse/stable/7 |

デフォルトの動作を上書きするには、これらの変数に空の文字列ではなく、何か別の値を設定してください。

以下の Agent v5 変数を過去に使用していた場合は、**新**に示す変数を使用し、同時に `datadog_agent_major_version` を `5` に設定するか、または`datadog_agent_version` を使用して Agent v5 のバージョンを指定してください。

| 旧                          | 新                   |
|------------------------------|-----------------------|
| `datadog_agent5_apt_repo`    | `datadog_apt_repo`    |
| `datadog_agent5_yum_repo`    | `datadog_yum_repo`    |
| `datadog_agent5_zypper_repo` | `datadog_zypper_repo` |

#### Windows

`datadog_windows_download_url` 変数が設定されていない場合は、`datadog_agent_major_version` に対応する Windows 公式 MSI パッケージが使用されます。

| # | デフォルトの Windows MSI パッケージ URL                                                  |
|---|----------------------------------------------------------------------------------|
| 6 | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi |
| 7 | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi |

デフォルトの動作を上書きするには、この変数に空の文字列ではなく、何か別の値を設定してください。

### アップグレード

Agent v6 を v7 にアップグレードするには、`datadog_agent_major_version: 7` を使用して最新バージョンをインストールするか、`datadog_agent_version` を設定して Agent v7 のバージョンを指定します。Agent v5 から v6 へのアップグレードと同じ方法を使用してください。

#### インテグレーション

**Agent v6.8 以上が対象**

Datadog インテグレーションを、バージョンを指定してインストールするには、`datadog_integration` リソースを使用します。Agent は、すべてのインテグレーションがすでにインストールされた状態になります。このコマンドは、特定のインテグレーションを、Agent 全体をアップグレードすることなくアップグレードする場合に便利です。詳しくは、[インテグレーション管理][4]を参照してください。

実行可能アクション:

- `install`: 指定したバージョンのインテグレーションをインストールします。
- `remove`: インテグレーションを削除します。

##### 構文

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <アクション>
      version: <インストールするバージョン>
```

サードパーティインテグレーションをインストールするには、`third_party` を true に設定します。

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
      third_party: true
```

##### 例

以下の例は、バージョン `1.11.0` の ElasticSearch インテグレーションをインストールし、`postgres` インテグレーションを削除します。

```yml
 datadog_integration:
   datadog-elastic:
     action: install
     version: 1.11.0
   datadog-postgres:
     action: remove
```

使用可能な Datadog インテグレーションのバージョンを確認するには、[integrations-core リポジトリ][5]にある `CHANGELOG.md` ファイルを参照してください。

### ダウングレード

Agent を以前のバージョンにダウングレードするには、

1. `datadog_agent_version` に、たとえば `5.32.5` などのバージョンを指定します。
2. `datadog_agent_allow_downgrade` に `yes` を設定します。

**注:**

- ダウングレードは、Windows プラットフォームではサポートされません。

## プレイブック

以降では、Datadog Ansible ロールを使用する際の参考になるプレイブックのサンプルをいくつか紹介します。

以下の例は、データを Datadog US（デフォルト）に送信し、ログを有効にして、チェックをいくつか構成します。

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
    datadog_agent_version: "7.16.0"
    datadog_config:
      tags:
        - "<KEY>:<VALUE>"
        - "<KEY>:<VALUE>"
      log_level: INFO
      apm_config:
        enabled: true
      logs_enabled: true  # Agent v6 および v7 で可能
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd' ]
          - name: syslog
            search_string: ['rsyslog' ]
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
      ssh_check:
        init_config:
        instances:
          - host: localhost
            port: 22
            username: root
            password: <YOUR_PASSWORD>
            sftp_check: True
            private_key_file:
            add_missing_keys: True
      nginx:
        init_config:
        instances:
          - nginx_status_url: http://example.com/nginx_status/
            tags:
              - "source:nginx"
              - "instance:foo"
          - nginx_status_url: http://example2.com:1234/nginx_status/
            tags:
              - "source:nginx"
              - "<KEY>:<VALUE>"

        #ログ収集はAgent 6 および 7 で可能
        logs:
          - type: file
            path: /var/log/access.log
            service: myapp
            source: nginx
            sourcecategory: http_web_access
          - type: file
            path: /var/log/error.log
            service: nginx
            source: nginx
            sourcecategory: http_web_access
    # datadog_integration は Agent 6.8 以降で可能
    datadog_integration:
      datadog-elastic:
        action: install
        version: 1.11.0
      datadog-postgres:
        action: remove
    system_probe_config:
      enabled: true
```

### Agent v6

以下の例は、最新の Agent v6 をインストールします。

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_agent_major_version: 6
    datadog_api_key: "<DD_API_キー>"
```

### サイトの設定

デフォルトの `datadoghq.com` 以外のサイトを利用している場合は、`datadog_site` var を適切な URL (例: `datadoghq.eu`, `us3.datadoghq.com`) に設定してください。

以下の例は、データを EU サイトに送信します。

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_site: "datadoghq.eu"
    datadog_api_key: "<DD_API_キー>"
```

### Windows

Windows では、`become: yes` を使用するとロールがエラーになるため、このオプションを削除する必要があります。以下に、サンプルのプレイブックを Windows ホストで動作させるための方法を 2 つ説明します。

#### インベントリファイル

インベントリファイルを使用する方法が推奨されています。インベントリファイル内で、Windows の各ホストに対し、`ansible_become` オプションを `no` に設定してください。

```ini
[servers]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2
windows1 ansible_host=127.0.0.3 ansible_become=no
windows2 ansible_host=127.0.0.4 ansible_become=no
```

すべての Windows ホストに同じコンフィギュレーションを繰り返したくない場合は、ホストをグループ化し、グループレベルで変数を設定してください。

```ini
[linux]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2

[windows]
windows1 ansible_host=127.0.0.3
windows2 ansible_host=127.0.0.4

[windows:vars]
ansible_become=no
```

#### プレイブックファイル

あるいは、プレイブックを**Windows ホストのみで実行する場合は**、プレイブックファイル内で以下を使用してください。

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog }
  vars:
    ...
```

**注**: このコンフィギュレーションは、Linux ホストではエラーになります。プレイブックを Windows ホストでのみ実行する場合に使用するか、そうでない場合は、[インベントリファイルの方法](#inventory-file)を使用してください。

## トラブルシューティング

### Debian stretch

Debian Stretch では、ロールが `apt_key` モジュールを使用する際にシステム依存性を追加しなければ、正しく動作できません。モジュールはその依存性（`dirmngr`）を提供していないため、現在のロールを使用するために、以下のコンフィギュレーションをプレイブックに追加してください。

```yml
---
- hosts: all
  pre_tasks:
    - name: Debian Stretch requires the dirmngr package to use apt_key
      become: yes
      apt:
        name: dirmngr
        state: present

  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<DD_API_キー>"
```

### Windows

Agent バージョン `6.14.0` と `6.14.1` には、Windows における重大なバグが存在するため、これらのバージョンのインストールは現在ブロックされています（このロールのバージョン `3.3.0` 以降）。

**注:** Windows で `datadog_agent_version` を `6.14.0` または `6.14.1` に設定すると、Ansible がエラーになります。`6.14.2` 以降を使用してください。

**Windows で 6.14.0 または 6.14.1** からアップグレードするには、以下の手順に従ってください。

1. 現在の `datadog.datadog` Ansible ロールを最新バージョンにアップグレードします（`3.3.0` 以降）。
2. `datadog_agent_version` を `6.14.2` 以降に設定します（デフォルトでは最新バージョン）。

詳しくは、[Windows における Datadog Agent 6.14.0 および 6.14.1 のアンインストーラに含まれる重大なバグ][10]を参照してください。

[1]: https://galaxy.ansible.com/Datadog/datadog
[2]: https://github.com/DataDog/ansible-datadog
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery
[4]: https://docs.datadoghq.com/ja/agent/guide/integration-management/
[5]: https://github.com/DataDog/integrations-core
[6]: https://docs.datadoghq.com/ja/infrastructure/process/
[7]: https://docs.datadoghq.com/ja/network_performance_monitoring/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[9]: https://docs.datadoghq.com/ja/network_performance_monitoring/installation/?tab=agent#setup
[10]: https://app.datadoghq.com/help/agent_fix