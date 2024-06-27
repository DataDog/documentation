---
description: Oracle データベースでのデータベースモニタリングの設定
disable_sidebar: true
title: Oracle の設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-info">
このページで説明されている機能はベータ版です。フィードバックやリクエストについては、カスタマーサクセスマネージャーにお問い合わせください。
</div>

## サポートされる Oracle のバージョン、機能、およびアーキテクチャ

- **バージョン**: 11.2、12c、18c、19c、21c
- **デプロイ構成**: セルフマネージド、RDS、RAC、Exadata、Autonomous Database
- **アーキテクチャ**: マルチテナント、non-CDB、RDS のシングルテナント

## 概要

### 前提条件

Database Monitoring for Oracle を構成するには、以下の前提条件を満たす必要があります。

1. Oracle の監視機能をサポートする [Agent バージョン](#recommended-agent-version)をインストールする必要があります。
    - [Agent をインストールする](#install-the-agent)
    - [既存の Agent インストールをアップグレードする](#upgrade-an-existing-agent-installation)
2. Oracle インテグレーションがインストールされている必要があります。
    - [Oracle インテグレーションをインストールする](#install-the-oracle-integration)
    - [既存の Oracle インテグレーションインストールを検証する](#verify-your-existing-oracle-integration)

### セットアップ
上記の前提条件を満たしている場合は、ホスティングタイプのセットアップ手順に従ってください。
{{< partial name="dbm/dbm-setup-oracle" >}}

## 前提条件の詳細

### Agent のインストール

#### ホスト要件

Agent のインストール先については、[DBM セットアップアーキテクチャ][10]のドキュメントを参照してください。

Agent は外部の Oracle クライアントを必要としません。

#### 推奨 Agent バージョン

Datadog では、 以下の Oracle DBM ビルドを推奨しています。この Oracle DBM ビルドには、 実装済みの Oracle 監視機能とバグ修正がすべて含まれているからです。Oracle DBM ビルドは、常に安定した Agent リリースを基盤にしています。

- Linux: `7.48.1~dbm~oracle~1.2-1`
- Windows: `7.48.1-dbm-oracle-1.2-1`
- Docker: `7.48.1-dbm-oracle-1.2`

Datadog Agent の公式リリースをご希望の場合は、少なくともバージョン `7.49.0` までお待ちください。

- Oracle ビルドをインストールするには、[Oracle DBM ビルドのインストール](#oracle-dbm-build-installation)を参照してください。
- 最新の公式リリースをインストールするには、[お使いのプラットフォームの説明][3]に従ってください。

#### Oracle DBM ビルドのインストール

{{< tabs >}}
{{% tab "Linux" %}}

Oracle DBM のビルドは [RHEL][6] と [Ubuntu][7] のそれぞれのリポジトリからダウンロードできます。

`DD_API_KEY` を設定し、以下のコマンドを実行すると、Oracle DBM リリースがインストールされます。例:

```shell
export DD_AGENT_DIST_CHANNEL=beta
export DD_AGENT_MINOR_VERSION="48.1~dbm~oracle~1.2-1"

DD_API_KEY= DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

[6]: https://yum.datadoghq.com/beta/7/x86_64/
[7]: https://apt.datadoghq.com/dists/beta/7/
{{% /tab %}}
{{% tab "Windows" %}}

Oracle DBM のビルドは [Windows ビルドリポジトリ][8]からダウンロードできます。

[Oracle DBM ビルド][4]の MSI ファイルをダウンロードします。

`APIKEY` を設定し、インストーラーをダウンロードしたディレクトリ内のコマンドプロンプトで以下のコマンドを実行します。例:

```shell
start /wait msiexec /qn /i datadog-agent-7.48.1-dbm-oracle-1.2-1.x86_64.msi APIKEY="" SITE="datadoghq.com"
```
[4]: https://s3.amazonaws.com/ddagent-windows-stable/beta/datadog-agent-7.48.1-dbm-oracle-1.2-1.x86_64.msi
[8]: https://ddagent-windows-stable.s3.amazonaws.com/

{{% /tab %}}
{{% tab "Docker" %}}
Oracle DBM イメージは [Docker ビルドリポジトリ][9]にあります。

`DD_API_KEY` を設定し、以下のコマンドを実行すると、Oracle DBM リリースがインストールされます。例:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY="" -e DD_SITE="datadoghq.com" gcr.io/datadoghq/agent:7.48.1-dbm-oracle-1.2
```

[9]: https://hub.docker.com/r/datadog/agent/tags?page=1&name=oracle
{{% /tab %}}
{{< /tabs >}}

### 既存の Agent インストールをアップグレードする

ホスティングタイプのドキュメントに従って、すべての `grant` 権限コマンドを実行します。新機能では、以前に Datadog データベースのユーザーアカウントに付与しなかったシステムビューへのアクセスが必要です。

### Oracle インテグレーションをインストールする

Datadog の Integrations ページで、組織用の [Oracle インテグレーション][2]をインストールしてください。これにより、Oracle データベースのパフォーマンスをモニタリングするために使用できる [Oracle ダッシュボード][5]がアカウントにインストールされます。

### 既存の Oracle インテグレーションを検証する

Oracle インテグレーションを初めてインストールする場合は、この手順を省略できます。

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

上記の前提条件を満たしている場合は、ホスティングタイプの[セットアップ手順](#setup)に従ってください。

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /ja/database_monitoring/architecture/
[15]: /ja/agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /ja/agent/versions/upgrade_to_agent_v7/?tab=linux