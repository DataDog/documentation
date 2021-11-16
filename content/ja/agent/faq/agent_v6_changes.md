---
title: Agent v6 の変更点
kind: faq
aliases:
  - /ja/agent/faq/agent-v6-changes
further_reading:
  - link: /agent/versions/upgrade_to_agent_v6/
    tag: Documentation
    text: Datadog Agent v6 へのアップグレード
  - link: /agent/faq/how-datadog-agent-determines-the-hostname/
    tag: Documentation
    text: Datadog が Agent ホスト名を決定する方法
---
## 概要

Datadog Agent v6 には、以前の Agent バージョンと比較して多くの変更が含まれています。変更と非推奨については、以下のセクションで詳しく説明します。

## 機能

Agent v5 の次の機能は、Agent v6 では**使用できません**。

* [Agent をプロキシとして使用する][1]
* [カスタムエミッター][2]
* [Dogstream][3]
* [go-metro][4]
* Graphite サポート

## コンフィギュレーション

以前のバージョンの Agent はコンフィギュレーションファイルを `/etc/dd-agent` に保存していました。Agent v6.0 以降では、コンフィギュレーションファイルは `/etc/datadog-agent` に保存されます。

{{< tabs >}}
{{% tab "Agent" %}}

[Agent のメインコンフィギュレーションファイル][1]は **INI** 形式から **YAML** 形式に移行し、複雑なコンフィギュレーションをサポートし、Agent とチェック全体で一貫したエクスペリエンスを提供します。

Agent v5 `datadog.conf` --> Agent v6 `datadog.yaml`

Agent コンフィギュレーションのパスと形式を切り替えるには、以下の Agent コマンドを使用します。
```bash
sudo -u dd-agent -- datadog-agent import
```

このコマンドは、既存の `datadog.conf` を解析し、サポートされているパラメーターを `datadog.yaml` の新しい形式に変換します。このコマンドは、現在有効になっているチェックのコンフィギュレーションファイルもコピーします。詳細については、[Datadog Agent v6 へのアップグレード][2]を参照してください。

#### オプション

次の Agent コンフィギュレーションオプションは、Agent v6 で変更または削除されました。削除されたコンフィギュレーションオプションは、他のオプションに置き換えられたか、以前のバージョンとは異なる動作をする機能に関連しています。

##### 変更

| 以前の名称               | 変更後の名称                 | 注                                                                                             |
|-----------------------------|------------------------------|---------------------------------------------------------------------------------------------------|
| `proxy_host`                | `proxy`                      | プロキシ設定は、URI のリストとして表現されるようになりました。詳細については、[proxy][3]のドキュメントを参照してください。 |
| `collect_instance_metadata` | `enable_metadata_collection` | メタデータ収集を有効にします。                                                                      |
| `collector_log_file`        | `log_file`                   |                                                                                                   |
| `syslog_host`               | `syslog_uri`                 | Syslog コンフィギュレーションが URI として表現されるようになりました。                                               |
|                             | `syslog_pem`                 | TLS クライアント検証用の Syslog コンフィギュレーションクライアント証明書。                                |
|                             | `syslog_key`                 | TLS クライアント検証用の Syslog コンフィギュレーションクライアント秘密キー。                                |

##### 削除

| 名前                         | 注                                                                                                                 |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `proxy_port`                 | `proxy` に置き換えられました。詳細については、[プロキシ][3]のドキュメントを参照してください。                                                  |
| `proxy_user`                 | `proxy` に置き換えられました。詳細については、[プロキシ][3]のドキュメントを参照してください。                                                  |
| `proxy_password`             | `proxy` に置き換えられました。詳細については、[プロキシ][3]のドキュメントを参照してください。                                                  |
| `proxy_forbid_method_switch` | 廃止                                                                                                              |
| `use_mount`                  | Agent レベルでは非推奨となり、[ディスクチェック][4]に移動しました。                                                       |
| `device_blacklist_re`        | Agent レベルでは非推奨となり、`device_blacklist` として[ディスクチェック][4]に移動しました。                                 |
| `use_curl_http_client`       | 廃止                                                                                                              |
| `exclude_process_args`       | 非推奨の機能                                                                                                    |
| `check_timings`              | 内部統計に置き換えられました                                                                                          |
| `non_local_traffic`          | Dogstatsd の場合は `dogstatsd_non_local_traffic`、トレース Agent の場合は `apm_config.apm_non_local_traffic` に置き換えられました。 |
| `dogstatsd_target`           |                                                                                                                       |
| `dogstreams`                 | 非推奨機能。代わりに[ログ Agent ][5] を使用してください。                                                                  |
| `custom_emitters`            |                                                                                                                       |
| `forwarder_log_file`         | `log_file` に置き換えられました                                                                                              |
| `dogstatsd_log_file`         | `log_file` に置き換えられました                                                                                              |
| `jmxfetch_log_file`          | `log_file` に置き換えられました                                                                                              |
| `syslog_port`                | `syslog_uri` に置き換えられました                                                                                            |
| `check_freq`                 |                                                                                                                       |
| `collect_orchestrator_tags`  | メタデータコレクターに実装されました                                                                                    |
| `utf8_decoding`              |                                                                                                                       |
| `developer_mode`             |                                                                                                                       |
| `use_forwarder`              |                                                                                                                       |
| `autorestart`                |                                                                                                                       |
| `dogstream_log`              | 非推奨機能。代わりに[ログ Agent ][5] を使用してください。                                                                  |
| `use_curl_http_client`       |                                                                                                                       |
| `collect_security_groups`    | 廃止。機能は、[AWS インテグレーション][6]で利用可能です。                                                         |

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/guide/upgrade-to-agent-v6/
[3]: /ja/agent/proxy/
[4]: /ja/integrations/disk/
[5]: /ja/logs/
[6]: /ja/integrations/amazon_web_services/
{{% /tab %}}
{{% tab "チェック" %}}

Agent v6 は、有効な YAML ファイルを `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.d/` にロードします。これにより、複雑なコンフィギュレーションを複数のファイルに分割できます。

たとえば、`http_check` のコンフィギュレーションファイルは以下のようになります。
```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Agent は、`<CHECK_NAME>.d` フォルダー内のサブディレクトリからコンフィギュレーションファイルをロードしません。たとえば、次のコンフィギュレーションはロード**されません**。
```text
/etc/datadog-agent/conf.d/http_check.d/prod.d/
├── backend.yaml
```

[オートディスカバリー][1]テンプレートファイル (`auto_conf.yaml`) もコンフィギュレーションフォルダーに保存されます。以下は `redisdb` チェックコンフィギュレーションフォルダーの例です。
```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

`<CHECK_NAME>.d` フォルダー内の YAML ファイルには、`.yaml` または `.yml` 拡張子が付いている限り、どんな名前でも付けることができます。標準名は `conf.yaml` です。

下位互換性を維持するため、Agent は `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.yaml` の形式でコンフィギュレーションファイルを処理しますが、更新されたレイアウトへの移行を強くおすすめします。

#### コンフィギュレーションオプション

Agent v6 は、チェックの `instance` セクションで次のオプションをサポートしています。

| オプション                    | 説明                                                                                                               |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `min_collection_interval` | デフォルトの 15 秒間隔よりも実行頻度が低いチェックの場合は、別の実行間隔を秒単位で設定します。 |
| `empty_default_hostname`  | `true` に設定されている場合、ホスト名なしでメトリクス、イベント、サービスチェックを送信します。                                           |
| `tags`                    | チェックによって送信されたタグに加えて、カスタムタグを送信します。                                                               |


[1]: /ja/getting_started/agent/autodiscovery/
{{% /tab %}}
{{% tab "環境変数" %}}

Agent v6 で使用される環境変数のほとんどは、以前のバージョンとは**異なります**。[Agent v6 の環境変数][1]のリストを参照してください。

**注**: `DD_TAGS` は同じタグですが、Agent v6 では形式がスペースで区切られています。以前のバージョンはカンマで区切られていました。v6 の例: `DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`

#### プロキシ

v6.4.0 以降の場合、Agent プロキシ設定は次の環境変数でオーバーライドできます。

| 環境変数        | 説明                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | `http` リクエストのプロキシとして使用する URL。                    |
| `DD_PROXY_HTTPS`    | `https` リクエストのプロキシとして使用する URL。                   |
| `DD_PROXY_NO_PROXY` | プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。 |

標準環境変数 (`HTTP_PROXY`、`HTTPS_PROXY`、`NO_PROXY`) は Agent v6 でサポートされていますが、`DD_PROXY_*` 変数を使用することをお勧めします。`DD_PROXY_*` 変数は他のプロキシ変数よりも優先されます。

Agent v6 のプロキシオプションの優先順位は、以前のバージョンとは異なります。

* Agent v6 は、最初に環境変数を使用し、次にコンフィギュレーションファイルを使用します。
* Agent v6 は、コンフィギュレーションファイルの値を環境内の値でオーバーライドします。たとえば、コンフィギュレーションファイルで `proxy.http` と `proxy.https` の両方が設定されていて、環境で `DD_PROXY_HTTPS` のみが設定されている場合、Agent は環境の `https` 値とコンフィギュレーションファイルの `http` 値を使用します。

[1]: /ja/agent/docker/#environment-variables
{{% /tab %}}
{{% tab "ホスト名" %}}

Agent v5 と Agent v6 ではホスト名解決に違いがあります。詳細については、[専用ドキュメント][1]をご覧ください。

[1]: /ja/agent/faq/how-datadog-agent-determines-the-hostname/#agent-versions
{{% /tab %}}
{{< /tabs >}}

## ログ

[Agent ログファイル][5]は引き続き `/var/log/datadog/` (Linux) と `C:\ProgramData\Datadog\logs` (Windows) にあります。

以前のバージョンでは複数のファイル (`collector.log`、`forwarder.log`、`dogstatsd.log` など) にログを記録していました。Agent v6 では単一のログファイル `agent.log` にログを記録します。

## インターフェイス

Agent v6 のコマンドラインインターフェイスは、サブコマンドベースです。利用可能なサブコマンドのリストを確認するには、次を実行します:
```shell
<エージェント_バイナリ> --help
```

サブコマンドを実行するには、Agent バイナリを呼び出す必要があります:
```shell
<エージェントバイナリ> <サブコマンド> <オプション>
```

一部のオプションにはフラグとオプションがあり、`--help` で詳細に説明されています。たとえば、`check` サブコマンドのヘルプを使用するには、次を実行します。
```shell
<エージェント_バイナリ> check --help
```

使用可能なコマンドの完全なリストについては、[Agent のコマンド][6]を参照してください。

### オペレーティングシステムの変更

{{< tabs >}}
{{% tab "Linux" %}}

Linux 上の Agent v6 の主な変更点は次のとおりです。

* Agent の_ライフサイクルコマンド_ (`start`/`stop`/`restart`/`status`) だけは `sudo service`/`sudo initctl`/`sudo systemctl` で実行する必要があります。
* 他のすべてのコマンドは、デフォルトで `datadog-agent` として `PATH` (`/usr/bin`) にある Agent バイナリで呼び出す必要があります。`dd-agent` コマンドは使用できなくなりました。
* `info` サブコマンドは `status` に名前が変更されました。
* Agent v6 には SysV-init スクリプトが付属していません (以前は `/etc/init.d/datadog-agent` にありました)。

#### サービスライフサイクルコマンド

システムで `service` ラッパーコマンドが使用できる場合、ライフサイクルコマンドに変更はありません。
たとえば Ubuntu の場合、_ライフサイクルコマンド_は次のとおりです。

| コマンド                              | 説明                            |
|--------------------------------------|----------------------------------------|
| `sudo service datadog-agent start`   | Agent をサービスとして起動します。          |
| `sudo service datadog-agent stop`    | Agent サービスを停止します。                |
| `sudo service datadog-agent restart` | Agent サービスを再起動します。             |
| `sudo service datadog-agent status`  | Agent サービスのステータスを出力します。 |

ご使用のシステムで `service` ラッパーコマンドを使用できない場合は、以下を使用してください。

* `upstart` ベースのシステムの場合: `sudo start/stop/restart/status datadog-agent`
* `systemd` ベースのシステムの場合: `sudo systemctl start/stop/restart/status datadog-agent`

ディストリビューションがデフォルトで使用する init システムが不明な場合は、以下の表を参照してください。

| ディストリビューション \ init システム      | upstart                   | systemd                   | sysvinit                                  | 注                         |
|---------------------------------|---------------------------|---------------------------|-------------------------------------------|-------------------------------|
| Amazon Linux (<= 2017.09)       | <i class="icon-check-bold"></i> |                           |                                           |                               |
| Amazon Linux 2 (>= 2017.12)     |                           | <i class="icon-check-bold"></i> |                                           |                               |
| CentOS/RHEL 6                   | <i class="icon-check-bold"></i> |                           |                                           |                               |
| CentOS/RHEL 7                   |                           | <i class="icon-check-bold"></i> |                                           |                               |
| Debian 7 (wheezy)               |                           |                           | <i class="icon-check-bold"></i> (Agent v6.6.0+) |                               |
| Debian 8 (jessie) & 9 (stretch) |                           | <i class="icon-check-bold"></i> |                                           |                               |
| SUSE 11                         |                           |                           |                                           | `systemd` がないとサポートされません |
| SUSE 12                         |                           | <i class="icon-check-bold"></i> |                                           |                               |
| Ubuntu < 15.04                  | <i class="icon-check-bold"></i> |                           |                                           |                               |
| Ubuntu >= 15.04                 |                           | <i class="icon-check-bold"></i> |                                           |                               |

#### Agent のコマンド

Agent v6 以降では、他の機能は Agent バイナリ自体によってサブコマンドとして提供されるため、`service`/`systemctl`/`initctl` で呼び出すことはできません。以下にいくつかの例を示します。

| Agent v5 コマンド                                  | Agent v6 コマンド                                       | 注                          |
|---------------------------------------------------|--------------------------------------------------------|--------------------------------|
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | 実行中の Agent のステータスページ |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | フレアの送信                     |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Agent の使用状況を表示する            |
| `sudo -u dd-agent -- dd-agent check <CHECK_NAME>` | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` | チェックの実行                    |

{{% /tab %}}
{{% tab "Windows" %}}

Windows 上の Agent v6 の主な変更点は次のとおりです。

* Agent v5 Windows Agent Manager GUI は、ブラウザベースのクロスプラットフォームマネージャーに置き換えられました。詳細については、[Windows 用 Datadog Agent Manager][1] を参照してください。
* メインの実行可能ファイルは `agent.exe` (以前は `ddagent.exe`) です。
* **Administrator** コマンドプロンプトからコマンドライン `"%PROGRAMFILES%\datadog\datadog agent\embedded\agent.exe" <COMMAND>` を使用してコマンドを実行する必要があります。
* Windows サービスが「自動遅延」として開始されます。起動時に自動的に開始されますが、他のすべてのサービスの後に開始されます。これにより、再起動後のメトリクスのレポートにわずかな遅延が生じます。
* Windows GUI と Windows システムトレイアイコンが個別に実装されるようになりました。詳細については、[Windows 用 Datadog Agent Manager][1] を参照してください。

[1]: /ja/agent/guide/datadog-agent-manager-windows/
{{% /tab %}}
{{% tab "MacOS" %}}

MacOS 上の Agent v6 の主な変更点は次のとおりです。

* _ライフサイクルコマンド_ (以前は `datadog-agent start`/`stop`/`restart`/`status`) は、`com.datadoghq.agent` サービスの `launchctl` コマンドに置き換えられ、ログインユーザーで実行される必要があります。これらのコマンドでは、Datadog Agent systray アプリを使用することもできます。
* 他のすべてのコマンドは、デフォルトで `PATH` (`/usr/local/bin/`) にある `datadog-agent` バイナリで実行できます。
* `info` コマンドは `status` に名前が変更されました。
* コンフィギュレーション GUI は Web ベースのアプリケーションになり、コマンド `datadog-agent launch-gui` を実行するか、systray アプリを使用してアクセスできます。

**変更例**:

| Agent v5 コマンド                   | Agent v6 コマンド                                     | 説明                    |
|------------------------------------|------------------------------------------------------|--------------------------------|
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` または systray アプリ | Agent をサービスとして起動します   |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` または systray アプリ  | Agent サービスを停止します         |
| `datadog-agent restart`            | **run `stop` then `start`** または systray アプリ             | Agent サービスを再起動します      |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` または systray アプリ  | Agent サービスのステータスを出力します |
| `datadog-agent info`               | `datadog-agent status` または Web GUI                    | 実行中の Agent のステータスページ |
| `datadog-agent flare`              | `datadog-agent flare` または Web GUI                     | フレアの送信                     |
| _not implemented_                  | `datadog-agent --help`                               | コマンドの使用方法の表示          |
| `datadog-agent check <チェック名>` | `datadog-agent check <チェック名>`                   | チェックを実行します (変更なし)        |

{{% /tab %}}
{{< /tabs >}}

## 収集 Agent

{{< tabs >}}
{{% tab "APM Agent" %}}

APM Agent は、Linux、MacOS、Windows 用の Agent v6 パッケージにデフォルトで付属しています。

Linux では、APM Agent はデフォルトで有効になっています。他のプラットフォームで有効または Linux で無効にするには、`datadog.yaml` の `apm_config` キーを更新します。
```yaml
apm_config:
  enabled: true
```

Docker イメージの場合、APM Agent はデフォルトで無効になっています。`DD_APM_ENABLED` を `true` に設定して有効にします。デフォルトではすべてのインターフェイスをリッスンします。他のプラットフォームでローカル以外のトラフィックをリッスンする場合は、`DD_APM_NON_LOCAL_TRAFFIC` を `true` に設定します。詳細については、[Docker アプリケーションのトレース][1]を参照してください。

[1]: /ja/agent/docker/apm/
{{% /tab %}}
{{% tab "Process Agent" %}}

Process Agent は、Linux 用の Agent v6 パッケージにのみデフォルトで付属しています。

Process Agent はデフォルトでは有効になっていません。有効にするには、`datadog.yaml` ファイルを次のように更新します。
```yaml
process_config:
  enabled: "true"
```

`enabled` の値は文字列で、以下のオプションがあります。

* `"true"`: プロセス Agent を有効にして、プロセスとコンテナを収集します。
* `"false"`: コンテナがあれば、コンテナのみを収集します (デフォルト)。
* `"disabled"`: Process Agent を実行しません。

{{% /tab %}}
{{< /tabs >}}

## チェック

{{< tabs >}}
{{% tab "Docker" %}}

Agent v6 では、Docker バージョン 1.12.1 以降がサポートされています。

Docker チェックは、Agent の内部アーキテクチャを利用するために Go で書き直されました。したがって、Python バージョン (`docker_daemon`) は非推奨になりました。 

新しいチェックの名前は `docker` です。[Agent インポートコマンド](?tab=agent#configuration)は、レガシーの `docker_daemon.yaml` コンフィギュレーションから設定をインポートします。以下を除くすべての機能が移植されています。

* `url`、`api_version`、`tags*` は非推奨になりました。[標準の Docker 環境変数][1]を使用することをお勧めします。
* `ecs_tags`、`performance_tags`、`container_tags` は非推奨になりました。すべての関連タグはデフォルトで収集されます。
* `docker.container.count` メトリクスを有効にする `collect_container_count` の使用はサポートされません。`docker.containers.running` と `.stopped` を使用してください。

一部のオプションは `docker_daemon.yaml` からメインの `datadog.yaml` に移動しました。

* `collect_labels_as_tags` は `docker_labels_as_tags` に名前が変更され、カーディナリティの高いタグをサポートします。詳細については、[タグの割り当てと抽出][2]を参照してください。
* `exclude` と `include` は `ac_include` と `ac_exclude` に名前が変更されました。Agent のすべてのコンポーネントで絞り込みを一貫させるために、任意のタグでの絞り込みはなくなりました。タグの絞り込みは、`image` (イメージ名) および `name` (コンテナ名) でのみサポートされています。正規表現の絞り込みは引き続き使用できます。詳細については、[コンテナディスカバリー管理][3]を参照してください。
* `docker_root` オプションは、`container_cgroup_root` と `container_proc_root` の 2 つのオプションに分割されました。
* Kubernetes と Openshift で一時停止中のコンテナを除外するために `exclude_pause_container` が追加されました (デフォルトは `true` です)。

[1]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[2]: /ja/agent/docker/tag/
[3]: /ja/agent/guide/autodiscovery-management/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Agent v6 では、Kubernetes バージョン 1.3 以降がサポートされています。

Kubernetes インテグレーションは、以下を組み合わせることによって情報を提供します。

* kubelet からの [kubelet][1] チェックメトリクス。
* API サーバーからの [kubernetes_apiserver][2] チェックイベントとサービスチェック。

[Agent インポートコマンド](?tab=agent#configuration) (v6.2 以降) は、レガシーの `kubernetes.yaml` コンフィギュレーションから設定をインポートします。次のオプションは非推奨になりました。

* API サーバーの認証情報 (`api_server_url`、`apiserver_client_crt`、`apiserver_client_key`、`apiserver_ca_cert`): 代わりに、`kubenetes_kubeconfig_path` を使用して Agent に `kubeconfig` ファイルを提供します。
* `use_histogram`: [Datadog のサポートチーム][3]に問い合わせて、最適な代替案を決めてください。
* `namespaces` と `namespace_name_regexp`: Agent v6 は、使用可能なすべてのネームスペースからメトリクスを収集します。

アップグレードされたロジックでは、Kubernetes バージョン 1.7.6 以降と互換性のある Prometheus メトリクス収集が有効になります。古いバージョンを実行しているか、cadvisor 収集ロジックに戻したい場合は、`cadvisor_port` を `4194` (kubelet が cadvisor を公開するポート) に設定します。

[kubernetes_state][4] チェックは、Agent v5 または Agent v6 で機能します。

#### タグ付け

Agent v5 はすべてのポッドラベルをタグとして自動的に収集しましたが、Agent v6 にはホワイトリストが必要です。これは、`datadog.yaml` の `kubernetes_pod_labels_as_tags` オプションで行われます。詳細については、[タグの割り当てと抽出][5]を参照してください。

次のオプションとタグは非推奨になりました。

* `label_to_tag_prefix` は `kubernetes_pod_labels_as_tags` に置き換えられました。
* `container_alias` タグは収集されません。
* `kube_replicate_controller` は、ポッドがレプリケーションコントローラーによって作成された場合にのみ追加されます。代わりに、関連するクリエイタータグ (`kube_deployment` や `kube_daemon_set` など) を使用してください。

[1]: /ja/integrations/kubelet/
[2]: /ja/integrations/kube_apiserver_metrics/
[3]: /ja/help/
[4]: /ja/agent/kubernetes/
[5]: /ja/agent/kubernetes/tag/#extract-node-labels-as-tags
{{% /tab %}}
{{% tab "JMX" %}}

Agent v6 には JMXFetch が付属していますが、次の変更が加えられています。

#### JMXTerm JAR

Agent v6 には `jmxterm` JAR が付属していません。`jmxterm` をダウンロードして使用するには、[アップストリームプロジェクト][1]を参照してください。

#### トラブルシューティングコマンド

トラブルシューティングのコマンド構文が変更されました。これらのコマンドは v6.2.0 以降で使用できます。以前のバージョンについては、[JMX Agent のトラブルシューティング][2]を参照してください。

| コマンド                                                | 説明                                                                                                                                                     |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo -u dd-agent datadog-agent jmx list matching`     | 1 つ以上のインスタンスコンフィギュレーションに一致する属性をリストします。                                                                                        |
| `sudo -u dd-agent datadog-agent jmx list limited`      | インスタンスコンフィギュレーションの 1 つに一致するが、収集可能なメトリクス数を超えるために収集されない属性をリストします。 |
| `sudo -u dd-agent datadog-agent jmx list collected`    | 現在のインスタンスコンフィギュレーションによって収集される属性をリストします。                                                                                     |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | どのインスタンスコンフィギュレーションにも一致しない属性をリストします。                                                                                           |
| `sudo -u dd-agent datadog-agent jmx list everything`   | JMXFetch でサポートされているタイプのすべての使用可能な属性をリストします。                                                                                           |
| `sudo -u dd-agent datadog-agent jmx collect`           | 現在のコンフィギュレーションに基づいてメトリクスの収集を開始し、コンソールに表示します。                                                            |

**注**: デフォルトでは、これらのコマンドは構成済みのすべての JMX チェックで実行されます。チェックを指定するには、`--checks` フラグを使用します。例:
`sudo datadog-agent jmx list collected --checks tomcat`

[1]: https://github.com/jiaqi/jmxterm
[2]: /ja/integrations/faq/troubleshooting-jmx-integrations/#agent-troubleshooting
{{% /tab %}}
{{% tab "システム" %}}

_Windows Agent のみに影響します_

Windows Agent v5 の場合、`system.mem.pagefile.*` メトリクスは一貫性のない単位を表示します (10^6 でオフ)。

この問題は、Windows Agent v6 で修正されています。ただし、下位互換性のために Agent v5 の不一致は残っています。したがって、Agent v5 から Agent v6 にアップグレードする場合、報告される値 (および関連するモニター) は異なります。

{{% /tab %}}
{{< /tabs >}}

## オートディスカバリー

[オートディスカバリー][7]システムは、Agent v6 用に作り直されました。また、コンテナランタイムとオーケストレーターは分離され、より柔軟になりました。これには、テンプレートの `docker_images` から `ad_identifiers` への移動が含まれます。

{{< tabs >}}
{{% tab "Kubernetes" %}}

Kubernetes を使用する場合、オートディスカバリーは Docker デーモンではなく kubelet から情報を取得します。これにより、Docker ソケットにアクセスしなくてもオートディスカバリーが機能します。また、デフォルトの動作では、ポッドアノテーションからオートディスカバリーテンプレートを取得します。`docker` コンフィギュレーションプロバイダーを有効にしてコンテナラベルを使用し、ポッドが不足しているコンテナでオートディスカバリーが必要な場合は、`kubelet` リスナーを Docker リスナーに置き換えることができます。

ポッドアノテーションで[オートディスカバリーテンプレート][1]を指定する場合、アノテーション名のプレフィックスは `ad.datadoghq.com/` です。以前のアノテーションプレフィックス (`service-discovery.datadoghq.com/`) は Agent v6 でも引き続きサポートされていますが、サポートは将来のバージョンで削除される予定です。

[1]: /ja/agent/kubernetes/integrations/
{{% /tab %}}
{{% tab "Docker" %}}

Docker ラベルの[オートディスカバリーテンプレート][1]は、同じ名前のプレフィックス `com.datadoghq.ad.*` で機能します。

一貫性を保つため、識別子オーバーライドラベルの名前が `com.datadoghq.sd.check.id` から `com.datadoghq.ad.check.id` に変更されました。以前の名前は Agent v6 でも引き続きサポートされていますが、サポートは将来のバージョンで削除される予定です。

[1]: /ja/agent/docker/integrations/
{{% /tab %}}
{{< /tabs >}}

## Python モジュール

Agent v6 では、すべてのチェック関連の Python コードは、`datadog_checks` [ネームスペース][8]からインポートされます。Agent v5 に含まれているほとんどの Python ライブラリは Agent v6 に付属しています。以下が変更されました。

* `util.py` とそれに関連する関数は Agent v6 から削除されました。
* `util.headers(...)` は引き続き Agent v6 に含まれていますが、C および Go に実装されてチェックに渡されます。

**注**: すべての公式インテグレーションは廃止されたモジュールを削除するように更新されたため、これらの変更はカスタムチェックにのみ影響します。

多くの `utils` ディレクトリが Agent v6 から削除されましたが、削除されたコンテンツのほとんどはチェックに直接関係していませんでした。たとえば、flare モジュールは Go で削除され、再実装されましたが、カスタムチェックで誰も使用していなかった可能性があります。詳細については、[開発ドキュメント][9]を参照してください。

{{< tabs >}}
{{% tab "インテグレーション" %}}

Agent v6 は Python チェックを完全にサポートしていますが、公式の Agent v5 インテグレーションの一部は削除または置き換えられています。

* agent_metrics - 削除
* docker_daemon - [Docker チェック](?tab=docker#checks)に置き換えられました
* kubernetes - [Kubernetes チェック](?tab=kubernetes#checks)に置き換えられました

{{% /tab %}}
{{% tab "Check API" %}}

Python チェックの基本クラス (`AgentCheck`) が `datadog_checks.base.checks` からインポートされました。クラス API で削除または変更されたものは多数あります。さらに、各チェックインスタンスは、クラスの独自のインスタンスになりました。したがって、それらの間で状態を共有することはできません。

`AgentCheck` クラスの以下のメソッドは実装されていません。

* `service_metadata`
* `get_service_metadata`
* `generate_historate_func`
* `generate_histogram_func`
* `stop`

メトリクス送信者の関数シグニチャが変更されました。

```python
# 以前のバージョン
gauge(self, metric, value, tags=None, hostname=None, device_name=None, timestamp=None)

# Agent v6
gauge(self, name, value, tags=None, hostname=None, device_name=None)
```

次のメソッドは、`AgentCheck` から完全に削除されました。

* `_roll_up_instance_metadata`
* `instance_count`
* `is_check_enabled`
* `read_config`
* `set_check_version`
* `set_manifest_path`
* `_get_statistic_name_from_method`
* `_collect_internal_stats`
* `_get_internal_profiling_stats`
* `_set_internal_profiling_stats`
* `get_library_versions`
* `get_library_info`
* `from_yaml`
* `get_service_checks`
* `has_warnings`
* `get_metrics`
* `has_events`
* `get_events`

**注**: すべての公式インテグレーションは廃止されたメソッドを削除するように更新されたため、これらの変更はカスタムチェックにのみ影響します。

{{% /tab %}}
{{% tab "カスタムチェック" %}}

#### 優先度

Agent v6 では、[公式チェック][1]はカスタムチェックよりも優先されます (`<AGENT_DIRECTORY>/checks.d` のチェック)。公式チェックと同じ名前のカスタムチェックは無視されます。

Agent v6 でカスタムチェックのセットアップを修正するには、影響を受けるカスタムチェックの名前を新しい未使用の名前に変更し、それに応じて関連する `.yaml` コンフィギュレーションファイルの名前を変更します。

#### 依存関係

カスタムチェックを使用する場合、コードが Agent v6 にバンドルされなくなった Python コードに依存する可能性があります。次のパッケージは、Agent にバンドルされなくなりました。

- backports.ssl-match-hostname
- datadog
- decorator
- future
- futures
- google-apputils
- pycurl
- pyOpenSSL
- python-consul
- python-dateutil
- python-etcd
- python-gflags
- pytz
- PyYAML
- rancher-metadata
- tornado
- uptime
- websocket-client

コードがこれらのパッケージのいずれかに依存している場合は、次のコマンドを実行して、不足しているパッケージをインストールします。

```bash
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

同様に、Agent v5 でカスタムチェックの要件を満たすために PIP パッケージを追加した可能性があります。追加された PIP パッケージに、すでに Agent v5 にバンドルされているパッケージとの内部依存関係がある場合 (上記のリストを参照)、Agent v6 にアップグレードした後、それらの依存関係は失われます。上記の説明に従って、不足している依存関係をインストールします。

[1]: https://github.com/DataDog/integrations-core
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/proxy/#using-the-agent-as-a-proxy
[2]: https://github.com/DataDog/dd-agent/wiki/Using-custom-emitters
[3]: /ja/agent/guide/dogstream/
[4]: /ja/integrations/go-metro/
[5]: /ja/agent/guide/agent-log-files/
[6]: /ja/agent/guide/agent-commands/
[7]: /ja/getting_started/agent/autodiscovery/
[8]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base
[9]: https://github.com/DataDog/datadog-agent/tree/master/docs/dev/checks