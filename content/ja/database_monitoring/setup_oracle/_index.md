---
description: Oracle データベースでのデータベースモニタリングの設定
disable_sidebar: true
is_beta: true
kind: documentation
private: true
title: Oracle の設定
---

{{< site-region region="gov" >}}
データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-info">
このページで説明されている機能は非公開ベータ版です。
</div>

## サポートされる Oracle のバージョン、機能、およびアーキテクチャ

- **バージョン**: 19c と 21c
- **デプロイ構成**: セルフマネージド、RDS、RAC、Exadata
- **アーキテクチャ**: マルチテナント

## 前提条件

### Oracle インテグレーションをインストールする

Datadog の [Integrations][1] ページで、組織用の [Oracle インテグレーション][2]をインストールしてください。これにより、Oracle データベースのパフォーマンスをモニタリングするために使用できる [Oracle ダッシュボード][5]がアカウントにインストールされます。

### Agent の Oracle インテグレーションをアップグレードする

Oracle インテグレーションを初めてインストールする場合は、このステップをスキップできます。すでに Oracle インテグレーションをインストールしている場合は、`conf.d/oracle.d/` ディレクトリにあるレガシー構成を、`conf.d/oracle-dbm.d/` ディレクトリにある新しいインテグレーションパスに移行します。

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

### Agent のインストール

Oracle テレメトリーの収集を開始するには、まず Datadog Agent をインストールします。

Agent はモニタリングデータベースと同じサーバーや同じプラットフォームで実行する必要はなく、推奨される[セットアップアーキテクチャ][10]のいずれかを使用してリモートでインストールすることができます。

Datadog では、[Agent の最新バージョン](#latest-agent-version)に記載されているバージョンをインストールすることを推奨しています。このバージョンには、実装されたすべての Oracle モニタリング機能とバグ修正が含まれています。

Agent の最新バージョンが `7.46.0` のような Datadog Agent 公式リリースの場合は、[公式リリース](#official-release)の手順に従ってください。Agent の最新バージョンが `7.46.0~dbm~oracle~beta~0.32` のようなベータビルドの場合は、[ベータビルド](#beta-build)の指示に従ってください。

#### 公式リリース

[お使いのプラットフォームの説明][3]に従ってください。

#### ベータビルド

##### Linux

RHEL と Ubuntu のベータビルドがあるリポジトリはそれぞれ[こちら][6]と[こちら][7]です。

`DD_API_KEY` を設定し、以下のコマンドを実行すると、ベータリリースがインストールされます。例:

```shell
export DD_AGENT_DIST_CHANNEL=beta
export DD_AGENT_MINOR_VERSION="46.0~dbm~oracle~beta~0.32-1"

DD_API_KEY= DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

##### Windows

Windows のビルドがあるリポジトリは[こちら][8]です。

[ベータビルド][4]の MSI ファイルをダウンロードします。

`APIKEY` を設定し、インストーラーをダウンロードしたディレクトリ内のコマンドプロンプトで以下のコマンドを実行します。例:

```shell
start /wait msiexec /qn /i datadog-agent-7.46.0-dbm-oracle-beta-0.32-1.x86_64.msi APIKEY="" SITE="datadoghq.com"
```

##### Docker

Docker のベータイメージは[こちら][9]にあります。

`DD_API_KEY` を設定し、以下のコマンドを実行すると、ベータリリースがインストールされます。例:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY="" -e DD_SITE="datadoghq.com" gcr.io/datadoghq/agent:7.46.0-dbm-oracle-beta-0.32
```

##### Agent の最新バージョン

以下のベータビルドには、実装された Oracle DBM 機能が含まれています。
- Linux: `7.46.0~dbm~oracle~beta~0.32-1`
- Windows: `7.46.0-dbm-oracle-beta-0.32-1`
- Docker: `7.46.0-dbm-oracle-beta-0.32`

### Oracle クライアント

Agent は外部の Oracle クライアントを必要としません。

### 以前の Agent リリースからのアップグレード

ホスティングタイプのドキュメントに従って、すべての `grant` 権限コマンドを実行します。新機能では、Datadog データベースのユーザーアカウントに付与されていないシステムビューへのアクセスが必要です。

## セットアップ

ホスティングタイプを選択して設定の手順を確認します。

{{< partial name="dbm/dbm-setup-oracle" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://windows-agent.datadoghq.com/beta/datadog-agent-7.46.0-dbm-oracle-beta-0.32-1.x86_64.msi
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[6]: https://yum.datadoghq.com/beta/7/x86_64/
[7]: https://apt.datadoghq.com/dists/beta/7/
[8]: https://windows-agent.datadoghq.com/
[9]: https://hub.docker.com/r/datadog/agent/tags?page=1&name=oracle
[10]: /ja/database_monitoring/architecture/
