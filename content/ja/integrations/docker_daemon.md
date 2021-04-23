---
aliases:
  - /ja/integrations/docker
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - ログの収集
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/docker_daemon/README.md'
display_name: Docker
draft: false
git_integration_title: docker_daemon
guid: 08ee2733-0441-4438-8af8-e2f6fb926772
integration_id: docker
integration_title: Docker Daemon
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: docker.
metric_to_check: docker.containers.running
name: docker_daemon
process_signatures:
  - dockerd
  - docker-containerd
  - docker run
  - docker daemon
  - docker-containerd-shim
public_title: Datadog-Docker Daemon インテグレーション
short_description: コンテナのパフォーマンスをその内部で実行中のサービスのパフォーマンスと関連付けます。
support: コア
supported_os:
  - linux
  - mac_os
---
**注**: Docker Daemon チェックのメンテナンスは継続されていますが、**Agent v5** でのみ動作します。

<div class="alert alert-warning">
<b>Agent v6 で Docker インテグレーションを使用するには、下の <a href="#agent-v6">Agent v6 セクション</a>を参照してください。</b>
</div>

![Docker のデフォルトのダッシュボード][1]

## 概要

この Agent チェックを構成して Docker_daemon サービスからリアルタイムにメトリクスを取得することで、以下のことが可能です。

* Docker_daemon の状態を視覚化および監視できます。
* Docker_daemon のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ
### インストール

すべてのコンテナに関する Docker メトリクスを収集するには、ホストごとに **1 つの** Datadog Agent を実行します。各ホストで直接 Agent を実行する方法と、1 つの [docker-dd-agent コンテナ][2]内で実行する方法 (推奨) の 2 つがあります。

どちらのオプションでも、Docker チェックが成功するには、ホストで cgroup メモリ管理が有効になっている必要があります。これを有効にする方法については、[docker-dd-agent リポジトリ][3]を参照してください。

#### ホストのインストール

1. ホストで Docker が実行されていることを確認します。
2. ホスト OS に対応する [Agent のインストール手順][4]に従って、Agent をインストールします。
3. [アプリケーションで Docker インテグレーションタイル][5]を有効にします。
4. `usermod -a -G docker dd-agent` を使用して、Docker グループに Agent ユーザーを追加します。
5. [Agent の conf.d ディレクトリにあるサンプルファイル][6]をコピーして、`docker_daemon.yaml` ファイルを作成します。ホストの Docker が標準インストールの場合は、何も変更しなくてもインテグレーションは動作します。
6. その他のインテグレーションを有効にするには、`docker ps` を使用して、対応するアプリケーションが使用するポートを識別します。
    ![Docker ps コマンド][7]

#### コンテナのインストール

1. ホストで Docker が実行されていることを確認します。
2. [Docker コンテナのインストール手順][8]に従って、以下を実行します。

        docker run -d --name dd-agent \
          -v /var/run/docker.sock:/var/run/docker.sock:ro \
          -v /proc/:/host/proc/:ro \
          -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
          -e API_KEY={YOUR_DD_API_KEY} \
          datadog/docker-dd-agent:latest

上のコマンドで、Docker の `-e` 環境変数フラグを使用して、Datadog Agent に API キーを渡すことができます。そのほかに以下の変数があります。

| **変数**                                                                                      | **説明**                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API_KEY                                                                                           | Datadog API キーを設定します。                                                                                                                                                                                                       |
| DD_HOSTNAME                                                                                       | Agent コンテナの `datadog.conf` ファイル内にホスト名を設定します。この変数が設定されない場合、Agent コンテナは、デフォルトで (`docker info` コマンドで報告される) `Name` フィールドを Agent コンテナホスト名として使用します。  |
| DD_URL                                                                                            | Agent がデータを送信する Datadog インテークサーバー URL を設定します。これは、[Agent をプロキシとして使用する][9]際に役立ちます。                                                                                                              |
| LOG_LEVEL                                                                                         | ログの詳細度を設定します (CRITICAL、ERROR、WARNING、INFO、DEBUG)。たとえば、`-e LOG_LEVEL=DEBUG` は、ログをデバッグモードに設定します。                                                                                                    |
| TAGS                                                                                              | ホストタグをカンマ区切りの文字列として設定します。`-e TAGS="simple-tag, tag-key:tag-value"` のように、シンプルなタグとキー/値形式のタグの両方を使用できます。                                                                           |
| EC2_TAGS                                                                                          | この機能を有効にすると、Agent はスタートアップ時に EC2 API を使用して設定されたカスタムタグを問い合わせたり、キャプチャしたりすることができます。有効にするには、`-e EC2_TAGS=yes` を使用します。この機能には、インスタンスに関連付けられた IAM ロールが必要です。        |
| NON_LOCAL_TRAFFIC                                                                                 | この機能を有効にすると、外部の IP から報告する StatsD が許可されます。有効にするには、`-e NON_LOCAL_TRAFFIC=yes` を使用します。これは、別のコンテナまたはシステムからメトリクスを報告するために使用されます。詳細については、[ネットワーク構成][10]を参照してください。 |
| PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASSWORD                                                | プロキシ構成の詳細を設定します。**注**: 認証パスワードを渡すには `PROXY_PASSWORD` が必要です。名前の変更はできません。詳細については、[Agent プロキシに関するドキュメント][11]を参照してください。                                                                                                                                  |
| SD_BACKEND, SD_CONFIG_BACKEND, SD_BACKEND_HOST, SD_BACKEND_PORT, SD_TEMPLATE_DIR, SD_CONSUL_TOKEN | オートディスカバリーを有効化および構成します。詳細については、[オートディスカバリーのガイド][7]を参照してください。                                                                                                                                   |

**注**: Agent に再起動に対する耐性を持たせるには、`--restart=unless-stopped` を追加します。

#### Agent コンテナを Amazon Linux で実行

Datadog Agent コンテナを Amazon Linux で実行するには、`cgroup` ボリュームマウントロケーションに以下の変更を行います。

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={YOUR API KEY} \
  datadog/docker-dd-agent:latest
```

#### Alpine Linux ベースのコンテナ

標準の Docker イメージは Debian Linux に基づいていますが、Datadog Agent v5.7 では [Alpine Linux][13] ベースのイメージがあります。Alpine Linux イメージは、従来の Debian ベースのイメージに比べてサイズが大幅に小さくなっています。また、Alpine のセキュリティ指向の設計も継承しています。

Alpine Linux イメージを使用するには、バージョンタグに `-alpine` を追加します。たとえば、以下のとおりです。

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={YOUR API KEY} \
  datadog/docker-dd-agent:latest-alpine
```

#### イメージのバージョン管理
Datadog Agent のバージョン 5.5.0 から、Docker イメージのバージョンパターンが新しくなりました。これにより、Agent のバージョンは同じまま、Datadog Agent の Docker イメージに対する変更をリリースできるようになりました。

Docker イメージバージョンは、**X.Y.Z** というパターンです。ここで、**X** は Docker イメージのメジャーバージョン、**Y** はマイナーバージョン、**Z** は Agent のバージョンを表します。

たとえば、Datadog Agent 5.5.0 をバンドルした Docker イメージの最初のバージョンは `10.0.550` です。

#### カスタムコンテナと追加情報

Datadog Agent を使用したカスタム Docker コンテナの構築、Alpine Linux ベースのイメージ、バージョン管理などについては、[Github の docker-dd-agent プロジェクト][2]を参照してください。

### 検証

[Agent の status サブコマンドを実行][14]し、Checks セクションで `docker_daemon` を探します。

## Agent v6

最新の Docker チェックの名前は `docker` です。これは、新しい内部アーキテクチャを利用するために Go で記述されています。バージョン 6.0 以降の Agent は、`docker_daemon` チェックをロードしなくなります。ただし、Agent v5 では引き続き使用でき、メンテナンスも継続されます。以下の非推奨の機能以外のすべての機能は、バージョン >6.0 に移植されます。

  * `url`、`api_version`、および `tags*` オプションは非推奨です。[標準の Docker 環境変数][15]を直接使用することをお勧めします。
  * `ecs_tags`、`performance_tags`、および `container_tags` オプションは非推奨です。関連するタグはそれぞれデフォルトで収集されるようになりました。
  * `docker.container.count` メトリクスを有効にする `collect_container_count` オプションはサポートされません。`docker.containers.running` と `.stopped` を使用してください。

一部のオプションは `docker_daemon.yaml` からメインの `datadog.yaml` に移動しました。

  * `collect_labels_as_tags` は `docker_labels_as_tags` という名前に変更され、カーディナリティの高いタグをサポートします。詳細は、`datadog.yaml.example` を参照してください。
  * `exclude` リストと `include` リストは、`ac_include` と `ac_exclude` という名前に変更されました。Agent のすべてのコンポーネントで一貫性のある絞り込みを行うために、任意のタグの絞り込みは削除されました。サポートされる絞り込みタグは、`image` (イメージ名) と `name` (コンテナ名) だけです。正規表現絞り込みは引き続き使用できます。例については、`datadog.yaml.example` を参照してください。
  * `docker_root` オプションは、`container_cgroup_root` と `container_proc_root` の 2 つのオプションに分割されました。
  * Kubernetes と Openshift で一時停止中のコンテナを除外する `exclude_pause_container` が追加されました (デフォルトは true)。これは、それらが誤って除外リストから漏れることを防ぎます。

その他の変更

  * `TAGS` 環境変数は `DD_TAGS` という名前に変更されました。
  * Docker Hub リポジトリは、[datadog/docker-dd-agent][16] から [datadog/agent][17] に変更されました。

[`import`][18] コマンドは、古い `docker_daemon.yaml` を新しい `docker.yaml` に変換します。また、このコマンドは、必要な設定を `docker_daemon.yaml` から `datadog.yaml` に移動します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "docker_daemon" >}}


### イベント
Docker インテグレーションは以下のイベントを生成します。

* Delete Image
* Die
* エラー
* Fail
* Kill
* Out of memory (oom)
* Pause
* Restart container
* Restart Daemon
* Update

### サービスのチェック

**docker.service_up**:
Agent が Docker デーモンからコンテナのリストを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**docker.container_health**:
このサービスチェックは、Agent v5 でのみ使用できます。コンテナが正常でない場合は `CRITICAL`、健全性が不明な場合は `UNKNOWN`、それ以外の場合は `OK` を返します。

**docker.exit**:
コンテナが 0 以外の終了コードで終了した場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**注**: `docker.exit` を使用するには、[Docker YAML ファイル][20]に `collect_exit_code: true` を追加し、Agent を再起動します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][21]までお問合せください。

## その他の参考資料
* [Compose と Datadog Agent][22]
* [DogStatsD と Docker][23]
* [Docker モニタリングの問題][24] (シリーズ)
* [Docker リソースメトリクスの監視方法][25]
* [Docker メトリクスの収集方法][26]
* [実際に Docker を採用してわかった驚きの 8 つの事実][27]
* [AWS ECS での Docker の監視][28]
* [Datadog の Docker 化][29]
* [Datadog を使用した Docker の監視][30]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/docker.png
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://github.com/DataDog/docker-dd-agent#cgroups
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://app.datadoghq.com/account/settings#integrations/docker
[6]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/integrations-docker-dockerps.png
[8]: https://app.datadoghq.com/account/settings#agent/docker
[9]: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy
[10]: https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration
[11]: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-a-web-proxy-as-proxy
[12]: https://docs.datadoghq.com/ja/agent/autodiscovery
[13]: https://alpinelinux.org
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[15]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[16]: https://hub.docker.com/r/datadog/docker-dd-agent
[17]: https://hub.docker.com/r/datadog/agent
[18]: https://docs.datadoghq.com/ja/agent/#cli
[19]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/metadata.csv
[20]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example#L124
[21]: https://docs.datadoghq.com/ja/help
[22]: https://docs.datadoghq.com/ja/integrations/faq/compose-and-the-datadog-agent
[23]: https://docs.datadoghq.com/ja/integrations/faq/dogstatsd-and-docker
[24]: https://www.datadoghq.com/blog/the-docker-monitoring-problem
[25]: https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics
[26]: https://www.datadoghq.com/blog/how-to-collect-docker-metrics
[27]: https://www.datadoghq.com/docker-adoption
[28]: https://www.datadoghq.com/blog/monitor-docker-on-aws-ecs
[29]: https://www.datadoghq.com/blog/docker-performance-datadog
[30]: https://www.datadoghq.com/blog/monitor-docker-datadog