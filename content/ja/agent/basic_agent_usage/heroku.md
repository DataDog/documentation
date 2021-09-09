---
aliases:
  - /ja/developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
dependencies:
  - 'https://github.com/DataDog/heroku-buildpack-datadog/blob/master/README.md'
kind: documentation
title: Datadog Heroku ビルドパック
---
[Heroku ビルドパック][1]は、Datadog Agent を Heroku dyno にインストールして、システムメトリクス、カスタムアプリケーションメトリクス、トレースを収集します。カスタムアプリケーションメトリクスとトレースを収集するには、[DogStatsD または Datadog APM ライブラリ][2]をアプリケーションに含める必要があります。

## インストール

このガイドでは、Heroku で実行中のアプリケーションがあることを前提としています。アプリケーションを Heroku にデプロイする方法については、Heroku のドキュメントを参照してください。

1. [Datadog API 設定][3]で Datadog API キーをコピーし、次の環境変数へエクスポートします:

 ```shell
 export DD_API_KEY=<YOUR_API_KEY>
 ```

2. アプリケーション名を APPNAME 環境変数へエクスポートします:

```shell
export APPNAME=<YOUR_HEROKU_APP_NAME>
```

3. Datadog ビルドパックをプロジェクトに追加します:

```shell
cd <HEROKU_PROJECT_ROOT_FOLDER>

# Heroku Labs Dyno Metadata を有効にして HEROKU_APP_NAME 環境変数を自動的に設定
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# メトリクスが連続するよう、Datadog でホスト名を appname.dynotype.dynonumber に設定
heroku config:add DD_DYNO_HOST=true

# このビルドパックを追加して Datadog API キーを設定
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# 強制的に再構築して Heroku をデプロイ
git commit --allow-empty -m "Rebuild slug"
git push heroku master
```

完了すると、各 dyno の起動時に Datadog Agent が自動的に起動します。

Datadog Agent は、statsd/dogstatsd のメトリクスおよびイベント用に `8125` でリスニングポートを提供します。トレースは、ポート `8126` で収集されます。

### ビルドパックの順序
[Heroku のドキュメント][4]に記載の通り、リスト内の最後のビルドパックはアプリケーションのプロセスタイプを決定するために使用されます。

apt パッケージをインストールするビルドパック ([heroku-buildpack-apt][5]、[puppeteer-heroku-buildpack][6] など) または `/app` フォルダーを変更するビルドパック ( [heroku-buildpack-monorepo][7] など) は Datadog ビルドパックの**前**に追加される必要があります。たとえば、アプリケーションが `ruby`、`datadog`、`apt` ビルドパックを使用している場合、これは正しい `heroku buildpacks` 出力になります。

```text
1. https://github.com/heroku/heroku-buildpack-apt.git
2. https://github.com/DataDog/heroku-buildpack-datadog.git
3. heroku/ruby
```

## 特定のビルドパックバージョンおよび特定の Datadog Agent バージョンを固定する

Heroku では、常にビルドパックの最新コミットを使用することが推奨されています。ビルドパックのバージョンを固定する必要がある場合は、ビルドパックのリリースタグを指定します。

```
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git#<DATADOG_BUILDPACK_RELEASE>
```

`<DATADOG_BUILDPACK_RELEASE>` を、現在の[ビルドパックリリース][8]に置き換えます。

デフォルトで、ビルドパックはリリース時に Datadog Agent の最新バージョンを固定します。`DD_AGENT_VERSION` の環境変数を設定することで、Agent を以前のバージョンに固定することができます。

## アップグレードとスラグの再コンパイル

このビルドパックをアップグレードするか、特定のビルドパックオプションを変更するには、スラグを再コンパイルする必要があります。

次のオプションでは、スラグの再コンパイルが必要です。

* `DD_AGENT_VERSION`
* `DD_AGENT_MAJOR_VERSION`
* `DD_PYTHON_VERSION`
* `DD_APM_ENABLED`
* `DD_PROCESS_AGENT`

このビルドパックをアップグレードしたり、これらのオプションのいずれか、たとえば `DD_AGENT_VERSION` を変更するには、次の手順が必要です。

```shell
# Agent の新規バージョンを設定
heroku config:set DD_AGENT_VERSION=<NEW_AGENT_VERSION> -a <YOUR_APP_NAME>

# Agent の新バージョンでスラグを再構築:
git commit --allow-empty -m "Rebuild slug"
git push heroku master
```

## コンフィギュレーション

上で示した環境変数のほかにも、いくつか設定できる変数があります。

| 設定                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | *必須。*API キーは、[Datadog API インテグレーション][9]のページにあります。これは、アプリケーションキーではなく *API* キーであることに注意してください。                                                                                                                                                                                                                                                                                                                                                                                |
| `DD_HOSTNAME`              | オプション。**警告**: ホスト名を手動で設定すると、メトリクスの連続性エラーが発生する可能性があります。この変数は設定しないことをお勧めします。dyno のホストはエフェメラルであるため、タグ `dynoname` または `appname` に基づいて監視することをお勧めします。                                                                                                                                                                                                                                                       |
| `DD_DYNO_HOST`             | オプション。dyno 名 (例: `web.1`、`run.1234` など) をホスト名として使用する場合は `true` に設定します。詳細は、以下の[ホスト名のセクション](#hostname)を参照してください。デフォルトは `false` です。                                                                                                                                                                                                                                                                                                                                          |
| `DD_TAGS`                  | *オプション。*追加のタグをスペース区切りの文字列として設定します。 (**注**: ビルドパックバージョン `1.16` 以前ではカンマ区切り文字列になります。下位互換性により、サポート対象となります)。例、`heroku config:set DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`。ビルドパックは、タグ `dyno` を自動的に追加します。タグは dyno 名 (例: web.1) と `dynotype` (dyno タイプ。例: `run`、`web` など) を表します。詳細は、[「タグの概要」][10]を参照してください。                                                                                                                                                             |
| `DD_VERSION`                  | *オプション*: アプリケーションのバージョンを設定。トレースをバージョン別に管理できます。                                                                                                                                          |
| `DD_HISTOGRAM_PERCENTILES` | *オプション。*オプションで、ヒストグラムメトリクスの追加のパーセンタイルを設定します。[パーセンタイルグラフを作成する方法][11]を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                            |
| `DISABLE_DATADOG_AGENT`    | オプション。設定した場合、Datadog Agent は実行されません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DD_APM_ENABLED`           | オプション。トレースの収集はデフォルトで有効になっています。これを `false` に設定すると、トレースの収集が無効になります。このオプションを変更した場合は、スラグを再コンパイルする必要があります。                                                                                                                                                                                                                                                          |
| `DD_PROCESS_AGENT`         | オプション。Datadog Process Agent は、デフォルトでは無効になっています。Process Agent を有効にするには、これを `true` に設定します。このオプションを変更した場合は、スラグを再コンパイルする必要があります。                                                                                                                                                                                                                                                 |
| `DD_SITE`                  | オプション。app.datadoghq.eu サービスを使用する場合は、これを `datadoghq.eu` に設定します。デフォルトは `datadoghq.com` です。                                                                                                                                                                                                                                                                                                                                                                                                               |
| `DD_AGENT_VERSION`         | *オプション。*ビルドパックは、デフォルトで、パッケージリポジトリから入手できる最新バージョンの Datadog Agent をインストールします。この変数を使用すると、Datadog Agent の以前のバージョンをインストールできます (Agent のすべてのバージョンをインストールできるわけではありません)。このオプションは `DD_AGENT_MAJOR_VERSION` よりも優先されます。このオプションを変更するには、スラグを再コンパイルする必要があります。詳細については、[アップグレードとスラグの再コンパイルのセクション](#upgrading-and-slug-recompilation)を確認してください。                                           |
| `DD_AGENT_MAJOR_VERSION`   | *オプション。*ビルドパックは、デフォルトで、パッケージリポジトリから入手できる最新の 6.x バージョンの Datadog Agent をインストールします。最新の 7.x バージョンの Datadog Agent をインストールするには、この変数を `7` に設定します。Agent バージョンと Python バージョンの関係の詳細については、[Python バージョンのセクション](#python-and-agent-versions)を確認してください。このオプションを変更するには、スラグを再コンパイルする必要があります。詳細については、[アップグレードとスラグの再コンパイルのセクション](#upgrading-and-slug-recompilation)を確認してください。     |
| `DD_DISABLE_HOST_METRICS`  | *オプション。* ビルドパックは、デフォルトで、dyno を実行しているホストマシンのシステムメトリクスを報告します。システムメトリクスの収集を無効にするには、これを `true` に設定します。詳細は、以下の[システムメトリクスのセクション](#system-metrics)を参照してください。                                                                                                                                                                                                                                                                                  |
| `DD_PYTHON_VERSION`        | *オプション。*バージョン `6.14.0` 以降の Datadog Agent には、Python バージョン `2` および `3` が付属しています。ビルドパックは、いずれかのバージョンのみを維持します。この変数を `2` または `3` に設定して、Agent が維持する Python バージョンを選択してください。設定しない場合、ビルドパックは `2` を維持します。詳細については、[Python バージョンのセクション](#python-and-agent-versions)を確認してください。このオプションを変更するには、スラグを再コンパイルする必要があります。詳細については、[アップグレードとスラグの再コンパイルのセクション](#upgrading-and-slug-recompilation)を確認してください。 |
| `DD_HEROKU_CONF_FOLDER`    | *オプション。* デフォルトで、ビルドパックは含めたいコンフィギュレーションファイルのためにアプリケーションのルートでファイル `/datadog` を探します (例: [prerun.sh script](#prerun-script))。このロケーションは、これを希望のパスに設定することで上書きできます。 |

その他のドキュメントについては、[Datadog Agent のドキュメント][12]を参照してください。

## ホスト名

Heroku dyno はエフェメラルです。新しいコードのデプロイ、構成に対する変更、リソースの必要性/可用性の変化などが発生した場合はいつでも 、dyno を別のホストマシンに移動できます。Heroku はこれによって高い柔軟性と応答性を実現していますが、Datadog に報告されるホスト数が非常に多くなる可能性があります。Datadog の課金はホスト単位で行われ、ビルドパックのデフォルトでは実際のホスト数が報告されるため、コストが予想以上に高額になる可能性があります。

使用状況によっては、ホスト名を設定してホストを集約し、報告される数を減らしたい場合があります。このような場合は、`DD_DYNO_HOST` を `true` に設定します。これにより、Agent は、アプリケーション名と dyno 名を組み合わせたもの (`appname.web.1`、`appname.run.1234` など) をホスト名として報告するようになり、ホスト数が dyno の使用状況とほぼ一致します。この欠点の 1 つは、dyno が再利用されるたびにメトリクスの連続性エラーが発生することです。

これを適切に機能させるには、`HEROKU_APP_NAME` を設定する必要がありますが、その最も簡単な方法は、[dyno メタデータの有効化][13]です。**注**: プライベート空間では dyno メタデータはまだ使用できません。この場合、`HEROKU_APP_NAME` を手動で設定する必要があります。

## システムメトリクス 

ビルドパックは、デフォルトで、dyno を実行しているホストマシンのシステムメトリクスを収集します。システムメトリクスは、このビルドパックを使用している個別の dyno では使用できません。ホストシステムメトリクスの収集を無効にするには、`DD_DISABLE_HOST_METRICS` 環境変数を `true` に設定します。

dyno のシステムメトリクスを収集するには、以下を行う必要があります。

1. [Heroku Labs: log-runtime-metrics][14] を有効にします。
2. [Datadog ログドレイン][15]を使用して、Heroku Logplex からメトリクスログを収集し、Datadog に転送します。
3. 収集されたログに対して[ログベースのメトリクス][16]を生成します。

## ファイルの場所

* Datadog Agent は、`/app/.apt/opt/datadog-agent` にインストールされます
* Datadog Agent の構成ファイルは、`/app/.apt/etc/datadog-agent` にあります
* Datadog Agent のログは、`/app/.apt/var/log/datadog` にあります

## インテグレーションの有効化

[Datadog-<INTEGRATION_NAME> インテグレーション][17]を有効にするには、アプリケーション内に Datadog のコンフィギュレーションフォルダーにファイルを作成します。dyno 起動時、この YAML ファイルは該当する Datadog Agent コンフィギュレーションディレクトリにコピーされます。

たとえば、[Datadog-Redis インテグレーション][18]を有効にする場合、アプリケーションのルートにファイル `/datadog/conf.d/redisdb.yaml` (この[コンフィギュレーションオプション](#configuration) を変更した場合は `/$DD_HEROKU_CONF_FOLDER/conf.d/redisdb.yaml`) を追加します。

```yaml
init_config:

instances:

    ## @param host - 文字列 - 必須
    ## 接続するホストを入力します。
    #
  - host: <REDIS_ホスト>

    ## @param port - 整数 - 必須
    ## 接続するホストのポートを入力します。
    #
    port: 6379
```

**注**: 使用可能なすべての構成オプションの詳細については、サンプル [redisdb.d/conf.yaml][19] を参照してください。

有効にするインテグレーションが[コミュニティインテグレーション][20]の一部である場合は、[事前実行スクリプト](#prerun-script)の一部としてパッケージをインストールします。

```
agent-wrapper integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

たとえば [Ping インテグレーション][21]をインストールするには、コンフィギュレーションファイル `datadog/conf.d/ping.yaml` を作成し、以下の行を事前実行スクリプトに追加します。

```
agent-wrapper integration install -t datadog-ping==1.0.0
```

## 事前実行スクリプト

上述したすべてのコンフィギュレーションに加えて、事前実行スクリプト `/datadog/prerun.sh` をアプリケーションに含めることができます。事前実行スクリプトは、すべての標準コンフィギュレーションアクションの実行後、Datadog Agent の起動直前に実行されます。これにより、環境変数の変更 (DD_TAGS または DD_VERSION) や追加構成の実行、コミュニティインテグレーションのインストール、さらには Datadog Agent をプログラムで無効にすることもできます。

以下に、`prerun.sh` スクリプトで実行できるいくつかの例を示します。

```shell
#!/usr/bin/env bash

# dyno タイプに基づいて Datadog Agent を無効化 
if [ "$DYNOTYPE" == "run" ]; then
  DISABLE_DATADOG_AGENT="true"
fi

# HEROKU_SLUG_COMMIT に基づきアプリのバージョンを設定 
if [ -n "$HEROKU_SLUG_COMMIT" ]; then
  DD_VERSION=$HEROKU_SLUG_COMMIT
fi

# Heroku アプリケーションの環境変数を使用して、Postgres のコンフィギュレーションを上記の設定から更新
if [ -n "$DATABASE_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $DATABASE_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<YOUR HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR DBNAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi

# "ping" コミュニティインテグレーションをインストール
agent-wrapper integration install -t datadog-ping==1.0.0
```

## Datadog のコンソール出力の制限

Datadog ビルドパックがコンソールに書き込むログの量を制限したい場合があります。

ビルドパックのログ出力を制限するには、`DD_LOG_LEVEL` 環境変数を次の値のいずれかに設定します。`TRACE`、`DEBUG`、`INFO`、`WARN`、`ERROR`、`CRITICAL`、`OFF`。

```shell
heroku config:add DD_LOG_LEVEL=ERROR
```

## オプションバイナリ

`DD_APM_ENABLED` が `false` に設定されている場合、または `DD_PROCESS_AGENT` が設定されていないか `false` に設定されている場合、あるいはその両方の場合は、スラグスペースを節約するために、コンパイル時に `trace-agent` および `process-agent` オプションバイナリが削除されます。

スラグサイズを削減するには、APM 機能を使用していない場合は `DD_APM_ENABLED` を `false` に設定し、プロセスモニタリングを使用していない場合は `DD_PROCESS_AGENT` を `true` に設定します。

## デバッグ作業

[Agent のドキュメント][22]にリストされている情報/デバッグコマンドのいずれかを実行するには、`agent-wrapper` コマンドを使用します。

たとえば、Datadog Agent と有効なインテグレーションのステータスを表示するには、以下を実行します。

```shell
agent-wrapper status
```

## Python と Agent のバージョン

バージョン `6.14` より前の Datadog v6 Agent には、Python バージョン `2` が組み込まれていました。`6.14` 以降、2020 年 1 月に発表された Python バージョン `2` のサポート終了に合わせて、Datadog v6 Agent には Python バージョン `2` と `3` の両方が付属しています。これは、お客様にカスタムチェックを Pythonバージョン `3` に移行する十分な時間を提供するためです。Heroku ビルドパックは、いずれかのバージョンのみを保持します。`DD_PYTHON_VERSION` を `2` または `3` に設定して、Agent が保持する Python バージョンを選択します。設定しない場合、ビルドパックは Python バージョン `2` を保持します。Python バージョン `2` でのみ動作するカスタムチェックを使用している場合、サポート終了の前にバージョン `3` に移行することをお勧めします。

Agent v7 には、Python バージョン `3` のみが付属しています。カスタムチェックを使用していない場合、またはカスタムチェックがすでにバージョン `3` に移行されている場合は、できるだけ早く Agent 7 に移行することをお勧めします。`6.15` 以降、同じマイナーバージョンの v7 リリースは同じ機能セットを共有するため、これら 2 つの間を安全に移動できます。たとえば、`6.16` を実行していて、Python バージョン `2` が必要ない場合、`7.16` にジャンプしても安全です。

## Heroku ログの収集

Datadog ビルドパックは、Heroku プラットフォームからログを収集しません。Heroku のログ収集を設定するには、[専用ガイド][15]をご覧ください。

## Docker イメージと共に Heroku を使用する

このビルドパックは、[Heroku の Slug Compiler][23] を使用する Heroku のデプロイメントにのみ利用できます。Docker コンテナを使用して Heroku にアプリケーションをデプロイするには、 Datadog Agent を Docker イメージの一部として追加し、Agent をコンテナ内の異なるプロセスとして起動します。

たとえば、Debian ベースの OS を使用して Docker イメージをビルドする場合は、以下の行を `Dockerfile` に追加します。

```
# GPG 依存関係をインストール
RUN apt-get update \
 && apt-get install -y gnupg apt-transport-https gpg-agent curl ca-certificates

# Datadog リポジトリおよび署名キーを追加
ENV DATADOG_APT_KEYRING="/usr/share/keyrings/datadog-archive-keyring.gpg"
ENV DATADOG_APT_KEYS_URL="https://keys.datadoghq.com"
RUN sh -c "echo 'deb [signed-by=${DATADOG_APT_KEYRING}] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
RUN touch ${DATADOG_APT_KEYRING}
RUN curl -o /tmp/DATADOG_APT_KEY_CURRENT.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_CURRENT.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_CURRENT.public
RUN curl -o /tmp/DATADOG_APT_KEY_F14F620E.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_F14F620E.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_F14F620E.public
RUN curl -o /tmp/DATADOG_APT_KEY_382E94DE.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_382E94DE.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_382E94DE.public


# Datadog Agent をインストール
RUN apt-get update && apt-get -y --force-yes install --reinstall datadog-agent

# エンドポイントをコピー
COPY entrypoint.sh /

# DogStatsD および trace-agent ポートを公開
EXPOSE 8125/udp 8126/tcp

# Datadog コンフィギュレーションをコピー
COPY datadog-config/ /etc/datadog-agent/

CMD ["/entrypoint.sh"]
```

Docker コンテナのエントリポイントで Datadog Agent、Datadog APM Agent、Datadog プロセス Agentを起動させます。

```
#!/bin/bash

datadog-agent run &
/opt/datadog-agent/embedded/bin/trace-agent --config=/etc/datadog-agent/datadog.yaml &
/opt/datadog-agent/embedded/bin/process-agent --config=/etc/datadog-agent/datadog.yaml
```

Docker イメージに関する詳細については、[Datadog Agent の Docker ファイル][24]を参照してください。

## 寄稿

[Heroku-buildpack-datadog リポジトリ][25]で問題またはプルリクエストを投稿する方法については、[ドキュメントの寄稿][26]を参照してください。

## 履歴

このプロジェクトの以前のバージョンは、[miketheman heroku-buildpack-datadog プロジェクト][27]から分岐したものです。その後、Datadog の Agent バージョン 6 向けに書き換えが行われました。変更内容と詳細は、[changelog][28] にあります。

## トラブルシューティング

### Agent ステータスの取得

ビルドパックをセットアップ済みで、期待するデータの一部を Datadog で取得していない場合、Datadog Agent にステータスコマンドを実行して原因を探ることができます。

```shell
# Heroku アプリケーション名を環境変数としてエクスポート
export APPNAME=your-application-name

heroku ps:exec -a $APPNAME

# 認証情報を確立中... 完了
#  ⬢ ruby-heroku-datadog で web.1 に接続中...
# DD_API_KEY 環境変数が設定されていません。実行: heroku config:add DD_API_KEY=<your API key>
# Datadog Agent が無効です。DISABLE_DATADOG_AGENT を未設定にするか、不足している環境変数を設定します。

~ $
```

DD_API_KEY が設定されていないという警告は無視できます。[Heroku では SSH セッション自体のコンフィギュレーション変数は設定されません](https://devcenter.heroku.com/articles/exec#environment-variables)が、Datadog Agent プロセスによりアクセス可能です。

SSH セッション内で Datadog ステータスコマンドを実行します。

```shell
~ $ agent-wrapper status

Getting the status from the agent.

===============
Agent (v7.27.0)
===============

[...]

```

試行するデバッグに基づき、重点を置くべきセクションをハイライトします。

#### Datadog でデータを取得していない

`status` コマンドが正常に実行していることと、出力のこのセクションに、使用している API キーが有効であると表示されることを確認します。

```
  API Keys status
  ===============
    API key ending with 68306: API Key valid
```

#### インテグレーションのチェック

有効にしたインテグレーションが正常に実行されていることを確認するには、`Collector` セクションに注目し、チェックが正常に実行されていることを確認します。

```
=========
Collector
=========

  Running Checks
  ==============

[...]
    postgres (5.4.0)
    ----------------
      Instance ID: postgres:e07ef94b907fe733 [OK]
      Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 4,282
      Metric Samples: Last Run: 15, Total: 64,230
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 4,282
      Average Execution Time : 43ms
      Last Execution Date : 2021-05-13 08:15:46 UTC (1620893746000)
      Last Successful Execution Date : 2021-05-13 08:15:46 UTC (1620893746000)
      metadata:
        version.major: 13
        version.minor: 2
        version.patch: 0
        version.raw: 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
        version.scheme: semver
```

#### APM Agent の確認

APM にアプリケーションをインスツルメントし、Datadog でトレースを取得していない場合は、APM Agent が正常に実行しトレースを収集していることを確認します。

```
[...]
=========
APM Agent
=========
  Status: Running
  Pid: 63
  Uptime: 64702 seconds
  Mem alloc: 10,331,128 bytes
  Hostname: ruby-heroku-datadog.web.1
  Receiver: localhost:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    From ruby 2.6.6 (ruby-x86_64-linux), client 0.48.0
      Traces received: 11 (14,181 bytes)
      Spans received: 33

    Default priority sampling rate: 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:': 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:development': 100.0%

[...]
```

### Datadog から報告される Agent 数が dynos 数を超えています

`DD_DYNO_HOST` が `true` に設定され、`HEROKU_APP_NAME` にすべての Heroku アプリケーションの値が設定されていることを確認してください。詳細は、[ホスト名のセクション](#hostname)を参照してください。

### ビルドパックまたは Agent をアップグレードした後、Agent が起動時にエラーをレポートしている

ビルドパックまたは Agent のアップグレード後は、アプリケーションのスラグを再コンパイルする必要があります。詳細については、[アップグレードとスラグの再コンパイルのセクション](#upgrading-and-slug-recompilation)を確認してください。

[1]: https://devcenter.heroku.com/articles/buildpacks
[2]: https://docs.datadoghq.com/ja/libraries
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app#viewing-buildpacks
[5]: https://github.com/heroku/heroku-buildpack-apt
[6]: https://github.com/jontewks/puppeteer-heroku-buildpack
[7]: https://github.com/lstoll/heroku-buildpack-monorepo
[8]: https://github.com/DataDog/heroku-buildpack-datadog/releases
[9]: https://app.datadoghq.com/account/settings#api
[10]: https://docs.datadoghq.com/ja/tagging/
[11]: https://docs.datadoghq.com/ja/dashboards/guide/how-to-graph-percentiles-in-datadog/
[12]: https://docs.datadoghq.com/ja/agent
[13]: https://devcenter.heroku.com/articles/dyno-metadata
[14]: https://devcenter.heroku.com/articles/log-runtime-metrics
[15]: https://docs.datadoghq.com/ja/logs/guide/collect-heroku-logs
[16]: https://docs.datadoghq.com/ja/logs/logs_to_metrics/
[17]: https://docs.datadoghq.com/ja/integrations/
[18]: https://docs.datadoghq.com/ja/integrations/redisdb/
[19]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[20]: https://github.com/DataDog/integrations-extras/
[21]: https://github.com/DataDog/integrations-extras/tree/master/ping
[22]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[23]: https://devcenter.heroku.com/articles/slug-compiler
[24]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles
[25]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CONTRIBUTING.md
[26]: https://github.com/DataDog/heroku-buildpack-datadog
[27]: https://github.com/miketheman/heroku-buildpack-datadog
[28]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CHANGELOG.md