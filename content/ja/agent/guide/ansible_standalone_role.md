---
dependencies:
- https://github.com/DataDog/ansible-datadog/blob/main/README.md
title: Set up Ansible Using a Standalone Datadog Role
---
Datadog Agent Ansible ロールは、Datadog Agent とインテグレーションをインストールおよび構成します。

## Ansible ロールと Ansible コレクション

Datadog Agent Ansible ロールは、2 つの異なるチャンネルで利用できます。

* As part of the Datadog collection, accessible under the [datadog.dd](https://galaxy.ansible.com/ui/repo/published/datadog/dd/) name on Ansible Galaxy (recommended).
* As a standalone role, accessible under the [datadog.datadog](https://galaxy.ansible.com/ui/repo/published/datadog/dd/content/role/agent/) name on Ansible Galaxy (legacy).

ロールのバージョン `4` とコレクションのバージョン `5` は、デフォルトで Datadog Agent v7 をインストールします。

## セットアップ

このドキュメントのインストール手順は、スタンドアロンの Datadog ロールのインストールを説明しています。Datadog コレクションのインストール手順については、[コレクションの README ファイル](https://github.com/ansible-collections/Datadog/blob/main/README.md)を参照してください。構成変数は、スタンドアロンのロールとコレクションからアクセスされるロールの両方で同じです。

### 要件

- Ansible v2.6 以上。
- Debian と RHEL ベースの Linux ディストリビューション、macOS および Windows のほとんどをサポートしていること。
- Ansible 2.10+ で Windows ホストを管理する場合、`ansible.windows` コレクションをインストールする必要があります。

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- When using with Ansible 2.10+ to manage openSUSE/SLES hosts, requires the `community.general` collection to be installed:

  ```shell
  ansible-galaxy collection install community.general
  ```

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

The API key is required and its absence causes the role to fail. If you want to provide it through another way, outside of Ansible's control, specify a placeholder key and substitute the key at a later point.

## ロールの変数

These variables provide additional configuration during the installation of the Datadog Agent. They should be specified in the `vars` section of your playbook.

| 変数                                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog_api_key`                           | Your Datadog API key. **This variable is mandatory starting from 4.21**.|
| `datadog_site`                              | Agent データの送信先である Datadog インテークのサイト。デフォルトでは `datadoghq.com` ですが、`datadoghq.eu` に設定すると、EU サイトにデータが送信されます。このオプションは、バージョン 6.6.0 以上の Agent でのみ使用可能です。|
| `datadog_agent_flavor`                      | RPI 上の IOT インストールに対するデフォルトの Debian / RedHat パッケージをオーバーライドします。デフォルトが "datadog-agent" の場合、RPI には "datadog-iot-agent" を使用します。|
| `datadog_agent_version`                     | インストールする Agent のバージョンを固定します（例: `7.16.0`）。設定は任意ですが、推奨されています。`datadog_agent_version` を使用する場合、`datadog_agent_major_version` の設定は不要です。|
| `datadog_agent_major_version`               | インストールする Agent のメジャーバージョン。5、6、または 7（デフォルト）を設定できます。`datadog_agent_version` を設定している場合はそれが優先されますが、そうでなければ、指定されたメジャーバージョンの中で最新のバージョンがインストールされます。`datadog_agent_version` を使用する場合、`datadog_agent_major_version` の設定は不要です。|
| `datadog_checks`                            | Agent チェックのために追加する YAML コンフィギュレーション。<br> - Agent v6 および v7 では `/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml` <br> - Agent v5 では `/etc/dd-agent/conf.d`|
| `datadog_disable_untracked_checks`          | `datadog_checks` および `datadog_additional_checks` に存在しないすべてのチェックを削除するには `true` に設定します。|
| `datadog_additional_checks`                 | `datadog_disable_untracked_checks` が `true` に設定されている場合に削除されない、その他のチェックの一覧。|
| `datadog_disable_default_checks`            | すべてのデフォルトチェックを削除するには、`true` に設定します。|
| `datadog_config`                            | Datadog Agent の構成を設定します。このロールは、[オペレーティングシステムに基づいた正しい場所](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)に構成を書き込みます。構成オプションの完全なリストは、[datadog-agent GitHub リポジトリにある `datadog.yaml` テンプレートファイル](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml)を参照してください。|
| `datadog_config_ex`                         | （任意）`/etc/dd-agent/datadog.conf` に追加する INI セクション（Agent v5 のみ）。|
| `datadog_apt_repo`                          | デフォルトの Datadog `apt` リポジトリをオーバーライドします。リポジトリのメタデータが Datadog の署名キーで署名されている場合は、`signed-by` オプションを使用してください: `deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://yourrepo`|
| `datadog_apt_cache_valid_time`              | デフォルトの apt キャッシュの有効期限を上書きします（デフォルトでは 1 時間）。|
| `datadog_apt_key_url_new`                   | Datadog `apt` キーを取得する場所をオーバーライドします (非推奨の `datadog_apt_key_url` 変数は、ロールから削除されて期限切れとなったキーを参照します)。URL は通常、 キー `382E94DE`、`F14F620E`、`C0962C7D` を含む GPG 鍵束となります。|
| `datadog_yum_repo_config_enabled`           | Set to `false` to prevent the configuration of a Datadog `yum` repository (defaults to `true`). WARNING: it deactivates the automatic update of GPG keys.|
| `datadog_yum_repo`                          | デフォルトの Datadog `yum` レポジトリを上書きします。|
| `datadog_yum_repo_proxy`                    | Set a proxy URL to use in the Datadog `yum` repo configuration.|
| `datadog_yum_repo_proxy_username`           | Set a proxy username to use in the Datadog `yum` repo configuration.|
| `datadog_yum_repo_proxy_password`           | Set a proxy password to use in the Datadog `yum` repo configuration.|
| `datadog_yum_repo_gpgcheck`                 | デフォルトの `repo_gpgcheck` 値 (空白) をオーバーライドします。値が空白、かつカスタム `datadog_yum_repo` が使用されておらずシステムが RHEL/CentOS 8.1 でない場合 (dnf の[バグ](https://bugzilla.redhat.com/show_bug.cgi?id=1792506)の関係)、値は動的に `yes` に設定されます。そうでない場合は `no` が設定されます。**注**: Agent 5 では、repodata 署名認証は常にオフになっています。|
| `datadog_yum_gpgcheck`                      | デフォルトの `gpgcheck` の値 (`yes`) を上書き - パッケージ GPG 署名証明をオフにするには `no` を使用します。|
| `datadog_yum_gpgkey`                        | **バージョン 4.18.0 で削除済み** Agent v5 および v6 (6.13 以下) のパッケージの検証に使用される Datadog `yum` キー (キー ID  `4172A230`) へのデフォルト URL を上書きします。|
| `datadog_yum_gpgkey_e09422b3`               | Agent 6.14 以上のパッケージの検証に使用される Datadog `yum` キー（キー ID : `E09422B3`）へのデフォルト URL を上書きします。|
| `datadog_yum_gpgkey_e09422b3_sha256sum`     | `datadog_yum_gpgkey_e09422b3` キーの、デフォルトのチェックサムを上書きします。|
| `datadog_zypper_repo`                       | デフォルトの Datadog `zypper` レポジトリを上書きします。|
| `datadog_zypper_repo_gpgcheck`              | デフォルトの `repo_gpgcheck` 値 (空白) をオーバーライドします。値が空白、かつカスタム `datadog_zypper_repo` が使用されていない場合、値は動的に `yes` に設定されます。そうでない場合は `no` が設定されます。**注**: Agent 5 では、repodata 署名認証は常にオフになっています。|
| `datadog_zypper_gpgcheck`                   | デフォルトの `gpgcheck` の値 (`yes`) を上書き - パッケージ GPG 署名証明をオフにするには `no` を使用します。|
| `datadog_zypper_gpgkey`                     | **バージョン 4.18.0 で削除済み** Agent v5 および v6 (6.13 以下) のパッケージの検証に使用される Datadog `zypper` キー (キー ID  `4172A230`) へのデフォルト URL を上書きします。|
| `datadog_zypper_gpgkey_sha256sum`           | **バージョン 4.18.0 で削除済み** `datadog_zypper_gpgkey` キーの、デフォルトのチェックサムを上書きします。|
| `datadog_zypper_gpgkey_e09422b3`            | Agent 6.14 以上のパッケージの検証に使用される Datadog `zypper` キー（キー ID : `E09422B3`）へのデフォルト URL を上書きします。|
| `datadog_zypper_gpgkey_e09422b3_sha256sum`  | `datadog_zypper_gpgkey_e09422b3` キーの、デフォルトのチェックサムを上書きします。|
| `datadog_agent_allow_downgrade`             | Agent のダウングレードを許可する場合は `yes` に設定します (使用には注意が必要です。詳細は `defaults/main.yml` を参照してください)。**注**: Windows プラットフォームではダウングレードはサポートされていません。|
| `datadog_enabled`                           | `false` に設定すると、`datadog-agent` のサービスが開始されなくなります（デフォルトでは `true`）。|
| `datadog_additional_groups`                 | `datadog_user` に追加するグループのリスト、またはグループをコンマで区切ったリストの文字列（Linux のみ）。|
| `datadog_windows_ddagentuser_name`          | 作成または使用する Windows ユーザーの名前。`<domain>\<user>` の形式で指定します（Windows のみ）。|
| `datadog_windows_ddagentuser_password`      | ユーザーの作成、あるいはサービスの登録に使用するパスワード（Windows のみ）。|
| `datadog_apply_windows_614_fix`             | `datadog_windows_614_fix_script_url` で参照されるファイルをダウンロードして適用するかどうか (Windowsのみ)。詳しくは https://dtdg.co/win-614-fix を参照してください。Datadog Agent 6.14.\* が動作していないホストでは、`false` に設定することができます。|
| `datadog_macos_user`                        | Agent を実行するユーザー名。ユーザーは存在しなければならず、自動的に作成されることはありません。デフォルトは `ansible_user` (macOS のみ) です。|
| `datadog_macos_download_url`                | DMG インストーラーのダウンロード元 URL をオーバーライドします (macOS のみ)。|
| `datadog_apm_instrumentation_enabled`       | Configure APM instrumentation. Possible values are: <br/> - `host`: Both the Agent and your services are running on a host. <br/> - `docker`: The Agent and your services are running in separate Docker containers on the same host.<br/>- `all`: Supports all the previous scenarios for `host` and `docker` at the same time.|
| `datadog_apm_instrumentation_libraries`     | List of APM libraries to install if `host` or `docker` injection is enabled (defaults to `["java", "js", "dotnet", "python", "ruby"]`). You can find the available values in [Inject Libraries Locally][24].|
| `datadog_apm_instrumentation_docker_config` | Override Docker APM configuration. Read [configure Docker injection][23] for more details.|
| `datadog_remote_updates`                    | Enable remote installation and updates through the datadog-installer.|

### インテグレーション

Datadog インテグレーション（チェック）を構成するには、`datadog_checks` セクションにエントリを追加します。第 1 レベルのキーにチェックの名前を入力し、値にはコンフィギュレーションファイルに記載する YAML ペイロードを入力します。以下にその例を示します。

To install or remove an integration, refer to the `datadog_integration` [paragraph](#integration-installation)

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

##### カスタム Python チェック

Python チェックをプレイブックに渡すには、以下の構成を使用します。

この構成では、Datadog の[プレイとロール][12]が、[Linux][13] または [Windows][14] のための実際のタスクへの相対ファイルパスとして渡される大きなプレイブックの一部であることが要求されます。

これは Agent v6+ 以降でのみ利用可能です。

キーはチェックディレクトリ `checks.d/{{ item }}.py` に作成されるファイル名である必要があります。

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
    datadog_custom_checks:
      my_custom_check: '../../../custom_checks/my_custom_check.py'
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

詳しくは、Datadog の[オートディスカバリー][3]に関するドキュメントを参照してください。

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

システムプローブは `system_probe_config` 変数の下で構成されます。その下にネストされる変数はすべて、`system_probe_config` セクションの `system-probe.yaml` に書き込まれます。

[ネットワークパフォーマンスモニタリング][7]（NPM）は、 `network_config` 変数の下で構成されます。その下にネストされる変数はすべて、`network_config` セクションの `system-probe.yaml` に書き込まれます。

[Cloud Workload Security][8] は `runtime_security_config` 変数の下で構成されます。その下にネストされる変数はすべて、`runtime_security_config` セクションの `system-probe.yaml` および `security-agent.yaml` に書き込まれます。

[Universal Service Monitoring][17] (USM) は `service_monitoring_config` 変数で構成されます。その下にネストされた変数は `system-probe.yaml` の `service_monitoring_config` セクションに書き込まれます。

[Compliance][18] は `compliance_config` 変数の下で構成されます。その下にネストされる変数はすべて、`compliance_config` セクションの `security-agent.yaml` に書き込まれます。

**Windows をご利用の方へのご注意**: NPM は Agent v6.27+ と v7.27+ で Windows 上でサポートされています。NPM はオプションコンポーネントとして出荷され、Agent のインストールまたはアップグレード時に `network_config.enabled` が true に設定された場合にのみインストールされます。このため、Agent を同時にアップグレードしない限り、既存のインストールでは NPM コンポーネントをインストールするために一旦 Agent をアンインストールして再インストールする必要があるかもしれません。

#### 構成サンプル

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
    scrub_args: true
    custom_sensitive_words: ['consul_token','dd_api_key']
system_probe_config:
  sysprobe_socket: /opt/datadog-agent/run/sysprobe.sock
network_config:
  enabled: true
service_monitoring_config:
  enabled: true
runtime_security_config:
  enabled: true
```

**注**: このコンフィギュレーションは Agent 6.24.1 以降および 7.24.1 以降で機能します。それ以前のバージョンの Agent については、[ネットワークパフォーマンスのモニタリング][9]ドキュメントのシステムプローブの有効化方法を参照してください。

Linux の場合、この変更後、インストールした Agent のバージョンが 6.18.0 または 7.18.0 より前の場合は、以下のステップに従います。

1. システムプローブを起動します: `sudo service datadog-agent-sysprobe start` **注**: ご使用のシステムで service ラッパーを使用できない場合は、代わりに次のコマンドを使用してください: `sudo initctl start datadog-agent-sysprobe`。
2. [Agent を再起動します][10]: `sudo service datadog-agent restart`
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

## バージョン

デフォルトでは、Datadog Ansible ロールの現在のメジャーバージョンは、Agent v7 をインストールします。`datadog_agent_version` と `datadog_agent_major_version` の変数を使用すると、インストールされる Agent のバージョンをコントロールできます。

このロールのバージョン v4 以上では、`datadog_agent_version` を使用して Agent のバージョンを固定すると、ロールはサポート対象の OS のバージョン命名スキームに従って、OS ごとに異なるバージョン名を作成します。たとえば以下のようになります。

- Debian および SUSE ベースの場合は `1:7.16.0-1`
- RedHat ベースの場合は `7.16.0-1`
- macOS の場合 `7.16.0-1`
- Windows の場合は `7.16.0`

これにより、ホストが複数の OS で稼働している場合に、バージョンを指定することが可能になります。以下に例を示します。

| 指定された内容                            | インストール     | System                |
|-------------------------------------|--------------|-----------------------|
| `datadog_agent_version: 7.16.0`     | `1:7.16.0-1` | Debian および SUSE ベース |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | RedHat ベース          |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | macOS                 |
| `datadog_agent_version: 7.16.0`     | `7.16.0`     | Windows               |
| `datadog_agent_version: 1:7.16.0-1` | `1:7.16.0-1` | Debian および SUSE ベース |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0-1`   | RedHat ベース          |
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

バージョン 4.9.0 以降は APT キーが https://keys.datadoghq.com から取得されるようになったため、`use_apt_backup_keyserver` 変数は削除されました。

#### Windows

`datadog_windows_download_url` 変数が設定されていない場合は、`datadog_agent_major_version` に対応する Windows 公式 MSI パッケージが使用されます。

| Agent バージョン | デフォルトの Windows MSI パッケージ URL                                                  |
|---------------|----------------------------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi |
| 7             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi |

デフォルトの動作を上書きするには、この変数に空の文字列ではなく、何か別の値を設定してください。

#### macOS

`datadog_macos_download_url` 変数が設定されていない場合は、`datadog_agent_major_version` に対応する macOS 公式 DMG パッケージが使用されます。

| Agent バージョン | macOS DMG パッケージのデフォルトの URL                                |
|---------------|--------------------------------------------------------------|
| 6             | https://install.datadoghq.com/datadog-agent-6-latest.dmg |
| 7             | https://install.datadoghq.com/datadog-agent-7-latest.dmg |

デフォルトの動作を上書きするには、この変数に空の文字列ではなく、何か別の値を設定してください。

### アップグレード

Agent v6 を v7 にアップグレードするには、`datadog_agent_major_version: 7` を使用して最新バージョンをインストールするか、`datadog_agent_version` を設定して Agent v7 のバージョンを指定します。Agent v5 から v6 へのアップグレードと同じ方法を使用してください。

#### インテグレーションのインストール

**Agent v6.8 以上が対象**

Datadog インテグレーションを、バージョンを指定してインストールするには、`datadog_integration` リソースを使用します。Agent は、[コアインテグレーション][19]がすでにインストールされた状態になります。このコマンドは、特定のインテグレーションを、Agent 全体をアップグレードすることなくアップグレードする場合に便利です。詳しくは、[インテグレーション管理][4]を参照してください。

If you want to configure an integration, refer to the `datadog_checks` [paragraph](#integrations)

実行可能アクション:

- `install`: 指定したバージョンのインテグレーションをインストールします。
- `remove`: インテグレーションを削除します。

##### サードパーティとのインテグレーション

[Datadog コミュニティ][20]と [Datadog Marketplace][15] インテグレーションは `datadog_integration` リソースでインストールできます。**注**: これらのインテグレーションは「サードパーティ」とみなされるため、`third_party: true` を設定する必要があります。次の例を参照してください。

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

以下の例では、データを Datadog US（デフォルト）に送信し、ログや NPM を有効にし、いくつかのチェックを構成します。

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

        #ログ収集は Agent 6 および 7 で可能
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
    # datadog_integration is available on Agent 6.8+
    datadog_integration:
      datadog-elastic:
        action: install
        version: 1.11.0
      datadog-postgres:
        action: remove
    network_config:
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

Windows では `become: yes` オプションを削除して、ロールの失敗を回避します。以下に、サンプルのプレイブックを Windows ホストで動作させるための方法を 2 つ説明します。

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

### アンインストール

Windows では、Ansible のロール内で以下のコードを使用することで、Agent をアンインストールすることが可能です。

```yml
- name: Check If Datadog Agent is installed
  win_shell: |
    (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
  register: agent_installed_result
- name: Set Datadog Agent installed fact
  set_fact:
    agent_installed: "{{ agent_installed_result.stdout | trim }}"
- name: Uninstall the Datadog Agent
  win_package:
    product_id: "{{ agent_installed }}"
    state: absent
  when: agent_installed != ""
```

## トラブルシューティング

### Debian stretch

**注:** この情報はバージョン 4.9.0 以前のロールに適用されます。4.9.0 以降、`apt_key` モジュールはロールで使用されなくなりました。

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
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### CentOS 6/7 と Python 3 インタプリター、Ansible 2.10.x またはそれ以下

CentOS ベースのホストに Agent をインストールするためにこのロールで使用される `yum` Python モジュールは、Ansible 2.10.x 以下を使用する場合のみ Python 2 で利用可能です。そのような場合は、代わりに `dnf` パッケージマネージャーを使用する必要があります。

ただし、CentOS 8 以前の CentOS ベースのホストでは、`dnf` および `dnf` Python モジュールはデフォルトではインストールされません。このため、Python 3 インタプリターを使用する場合、Agent をインストールすることができません。

このロールは、CentOS / RHEL < 8 に Agent をインストールする際に、Ansible 2.11+ または Python 2 インタプリターが必要であることを示すために、この状況が検出されると早期に失敗します。

この早期の障害検出を回避するには（たとえば、`dnf` と `python3-dnf` パッケージがホストで利用可能な場合）、`datadog_ignore_old_centos_python3_error` 変数を `true` に設定します。

### Windows

Agent バージョン `6.14.0` と `6.14.1` には、Windows における重大なバグが存在するため、これらのバージョンのインストールはブロックされています（このロールのバージョン `3.3.0` 以降）。

**注:** Windows で `datadog_agent_version` を `6.14.0` または `6.14.1` に設定すると、Ansible がエラーになります。`6.14.2` 以降を使用してください。

**Windows で 6.14.0 または 6.14.1** からアップグレードするには、以下の手順に従ってください。

1. 現在の `datadog.datadog` Ansible ロールを最新バージョンにアップグレードします（`3.3.0` 以降）。
2. `datadog_agent_version` を `6.14.2` 以降に設定します（デフォルトでは最新バージョン）。

詳しくは、[Windows における Datadog Agent 6.14.0 および 6.14.1 のアンインストーラに含まれる重大なバグ][11]を参照してください。

### Ubuntu 20.04 が service_facts で壊れる

Ubuntu 20.04 で `service_facts` モジュールを実行すると、以下のエラーが発生します。

```
localhost | FAILED! => {
    "changed": false,
    "msg": "Malformed output discovered from systemd list-unit-files: accounts-daemon.service                    enabled         enabled      "
}
```

この問題を解決するには、[Ansible を `v2.9.8` 以上にアップデートしてください][16]。

### Missing API key

Starting from role `4.21` the API key is mandatory for the role to proceed.

If you need to install the agent through Ansible but don't want to specify an API key (if you are baking it into a container/VM image for instance) you can:
* Specify a dummy API key and replace it afterward
* Disable managed_config (`datadog_manage_config: false`)

[1]: https://galaxy.ansible.com/Datadog/datadog
[2]: https://github.com/DataDog/ansible-datadog
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery
[4]: https://docs.datadoghq.com/ja/agent/guide/integration-management/
[5]: https://github.com/DataDog/integrations-core
[6]: https://docs.datadoghq.com/ja/infrastructure/process/
[7]: https://docs.datadoghq.com/ja/network_performance_monitoring/
[8]: https://docs.datadoghq.com/ja/security_platform/cloud_workload_security/getting_started/
[9]: https://docs.datadoghq.com/ja/network_performance_monitoring/installation/?tab=agent#setup
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[11]: https://app.datadoghq.com/help/agent_fix
[12]: https://docs.ansible.com/ansible/latest/reference_appendices/playbooks_keywords.html#playbook-keywords
[13]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-linux.yml
[14]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-win.yml
[15]: https://www.datadoghq.com/blog/datadog-marketplace/
[16]: https://github.com/ansible/ansible/blob/stable-2.9/changelogs/CHANGELOG-v2.9.rst#id61
[17]: https://docs.datadoghq.com/ja/tracing/universal_service_monitoring/?tab=configurationfiles#enabling-universal-service-monitoring
[18]: https://docs.datadoghq.com/ja/security/cspm/setup/?tab=docker
[19]: https://github.com/DataDog/integrations-core
[20]: https://github.com/DataDog/integrations-extras
[23]: https://docs.datadoghq.com/ja/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers#configure-docker-injection
[24]: https://docs.datadog.com/tracing/trace_collection/library_injection_local