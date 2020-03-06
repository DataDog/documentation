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

このビルドパックをプロジェクトに追加し、かつ必要な環境変数を設定するには、以下を参照してください。

```shell
cd <HEROKU_プロジェクトルートフォルダー>

# これが新しい Heroku プロジェクトの場合
heroku create

# 適切な言語固有のビルドパックを追加します。例:
heroku buildpacks:add heroku/ruby

# Heroku Labs Dyno メタデータを有効にします
heroku labs:enable runtime-dyno-metadata -a $(heroku apps:info|grep ===|cut -d' ' -f2)

# このビルドパックを追加して、Datadog API キーを設定します
heroku buildpacks:add https://github.com/DataDog/heroku-buildpack-datadog.git#<DATADOG_ビルドパックリリース>
heroku config:add DD_API_KEY=<DATADOG_API_キー>

# Heroku にデプロイします
git push heroku master
```

**警告**: apt パッケージをインストールするビルドパック（[apt][3]、[puppeteer 依存関係][4]など）または `/app` フォルダーを変更するビルドパック（[monorepo][5] など）は Datadog ビルドパックの*前*に追加される必要があります。たとえば、アプリケーションが `ruby`、`datadog`、`apt` ビルドパックを使用している場合、これは正しい `heroku buildpacks` 出力になります。

```text
1. heroku/ruby
2. https://github.com/heroku/heroku-buildpack-apt.git
3. https://github.com/DataDog/heroku-buildpack-datadog.git
```

`<DATADOG_API_キー>` は、現在の [Datadog API キー][6]に置き換えてください。
また、`<DATADOG_ビルドパックリリース>` は、使用する[ビルドパックのリリース][7]に置き換えてください。

完了すると、各 dyno の起動時に Datadog Agent が自動的に起動します。

Datadog Agent は、statsd/dogstatsd のメトリクスおよびイベント用に `8125` でリスニングポートを提供します。トレースは、ポート `8126` で収集されます。

## アップグレードとスラグの再コンパイル

このビルドパックをアップグレードするか、特定のビルドパックオプションを変更するには、アプリケーションのビルドキャッシュをクリアし、スラグを再コンパイルする必要があります。

次のオプションでは、スラグの再コンパイルが必要です。

* `DD_AGENT_VERSION`
* `DD_AGENT_MAJOR_VERSION`
* `DD_PYTHON_VERSION`
* `DD_APM_ENABLED`
* `DD_PROCESS_AGENT`

このビルドパックをアップグレードしたり、これらのオプションのいずれか、たとえば `DD_AGENT_VERSION` を変更するには、次の手順が必要です。

```shell
# Heroku リポジトリプラグインをインストールします
heroku plugins:install heroku-repo

# Agent の新しいバージョンを設定します
heroku config:set DD_AGENT_VERSION=<新しい_AGENT_バージョン> -a appname

# "appname" アプリケーションの Heroku のビルドキャッシュをクリアします
heroku repo:purge_cache -a appname

# 新しい Agent バージョンでスラグを再構築します:
git commit --allow-empty -m "Purge cache"
git push heroku master
```

## コンフィギュレーション

上で示した環境変数のほかにも、いくつか設定できる変数があります。

| 設定                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | *必須。*API キーは、[Datadog API インテグレーション][6]のページにあります。これは、アプリケーションキーではなく API キーであることに注意してください。                                                                                                                                                                                                                                                                                                                                                                                |
| `DD_HOSTNAME`              | オプション。**警告**: ホスト名を手動で設定すると、メトリクスの連続性エラーが発生する可能性があります。この変数は設定しないことをお勧めします。dyno のホストはエフェメラルであるため、タグ `dynoname` または `appname` に基づいて監視することをお勧めします。                                                                                                                                                                                                                                                       |
| `DD_DYNO_HOST`             | オプション。dyno 名 (例: `web.1`、`run.1234` など) をホスト名として使用する場合は `true` に設定します。詳細は、以下の[ホスト名のセクション](#hostname)を参照してください。デフォルトは `false` です。                                                                                                                                                                                                                                                                                                                                          |
| `DD_TAGS`                  | *オプション。*追加のタグをカンマ区切りの文字列として設定します。例: `heroku config:set DD_TAGS=&quot;simple-tag-0, tag-key-1:tag-value-1&quot;`。ビルドパックは、タグ `dyno` を自動的に追加します。タグは dyno 名 (例: web.1) と `dynotype` (dyno タイプ。例: `run`、`web` など) を表します。詳細は、[「タグの概要」][8]を参照してください。                                                                                                                                                             |
| `DD_HISTOGRAM_PERCENTILES` | *オプション。*オプションで、ヒストグラムメトリクスの追加のパーセンタイルを設定します。[パーセンタイルグラフを作成する方法][9]を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                            |
| `DISABLE_DATADOG_AGENT`    | オプション。設定した場合、Datadog Agent は実行されません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DD_APM_ENABLED`           | オプション。トレースの収集はデフォルトで有効になっています。これを `false` に設定すると、トレースの収集が無効になります。このオプションを変更した場合は、スラグを再コンパイルする必要があります。                                                                                                                                                                                                                                                          |
| `DD_PROCESS_AGENT`         | オプション。Datadog Process Agent は、デフォルトでは無効になっています。Process Agent を有効にするには、これを `true` に設定します。このオプションを変更した場合は、スラグを再コンパイルする必要があります。                                                                                                                                                                                                                                                 |
| `DD_SITE`                  | オプション。app.datadoghq.eu サービスを使用する場合は、これを `datadoghq.eu` に設定します。デフォルトは `datadoghq.com` です。                                                                                                                                                                                                                                                                                                                                                                                                               |
| `DD_AGENT_VERSION`         | *オプション。*ビルドパックは、デフォルトで、パッケージリポジトリから入手できる最新バージョンの Datadog Agent をインストールします。この変数を使用すると、Datadog Agent の以前のバージョンをインストールできます (Agent のすべてのバージョンをインストールできるわけではありません)。このオプションは `DD_AGENT_MAJOR_VERSION` よりも優先されます。このオプションを変更するには、スラグを再コンパイルする必要があります。詳細については、[アップグレードとスラグの再コンパイルのセクション](#upgrading-and-slug-recompilation)を確認してください。                                           |
| `DD_AGENT_MAJOR_VERSION`   | *オプション。*ビルドパックは、デフォルトで、パッケージリポジトリから入手できる最新の 6.x バージョンの Datadog Agent をインストールします。最新の 7.x バージョンの Datadog Agent をインストールするには、この変数を `7` に設定します。Agent バージョンと Python バージョンの関係の詳細については、[Python バージョンのセクション](#python-and-agent-versions)を確認してください。このオプションを変更するには、スラグを再コンパイルする必要があります。詳細については、[アップグレードとスラグの再コンパイルのセクション](#upgrading-and-slug-recompilation)を確認してください。     |
| `DD_DISABLE_HOST_METRICS`  | *オプション。* ビルドパックは、デフォルトで、dyno を実行しているホストマシンのシステムメトリクスを報告します。システムメトリクスの収集を無効にするには、これを `true` に設定します。詳細は、以下の[システムメトリクスのセクション](#system-metrics)を参照してください。                                                                                                                                                                                                                                                                                  |
| `DD_PYTHON_VERSION`        | *オプション。*バージョン `6.14.0` 以降の Datadog Agent には、Python バージョン `2` および `3` が付属しています。ビルドパックは、いずれかのバージョンのみを維持します。この変数を `2` または `3` に設定して、Agent が維持する Python バージョンを選択してください。設定しない場合、ビルドパックは `2` を維持します。詳細については、[Python バージョンのセクション](#python-and-agent-versions)を確認してください。このオプションを変更するには、スラグを再コンパイルする必要があります。詳細については、[アップグレードとスラグの再コンパイルのセクション](#upgrading-and-slug-recompilation)を確認してください。 |

その他のドキュメントについては、[Datadog Agent のドキュメント][10]を参照してください。

## ホスト名

Heroku dyno はエフェメラルです。新しいコードのデプロイ、構成に対する変更、リソースの必要性/可用性の変化などが発生した場合はいつでも 、dyno を別のホストマシンに移動できます。Heroku はこれによって高い柔軟性と応答性を実現していますが、Datadog に報告されるホスト数が非常に多くなる可能性があります。Datadog の課金はホスト単位で行われ、ビルドパックのデフォルトでは実際のホスト数が報告されるため、コストが予想以上に高額になる可能性があります。

使用状況によっては、ホスト名を設定してホストを集約し、報告される数を減らしたい場合があります。このような場合は、`DD_DYNO_HOST` を `true` に設定します。これにより、Agent は、アプリケーション名と dyno 名を組み合わせたもの (例: `appname.web.1`、`appname.run.1234`) をホスト名として報告するようになり、ホスト数が dyno の使用状況とほぼ一致します。この欠点の 1 つは、dyno が再利用されるたびにメトリクスの連続性エラーが発生することです。

これを適切に機能させるには、`HEROKU_APP_NAME` を設定する必要がありますが、その最も簡単な方法は、[dyno メタデータの有効化][11]です。プライベート空間では、dyno メタデータはまだ使用できないことを考慮してください。この場合、`HEROKU_APP_NAME` を手動で設定する必要があります。

## システムメトリクス 

ビルドパックは、デフォルトで、dyno を実行しているホストマシンのシステムメトリクスを収集します。システムメトリクスは、このビルドパックを使用している個別の dyno では使用できません。ホストシステムメトリクスの収集を無効にするには、`DD_DISABLE_HOST_METRICS` 環境変数を `true` に設定します。

dyno のシステムメトリクスを収集するには、以下を行う必要があります。

1. [Heroku Labs: log-runtime-metrics][12] を有効にします。
2. [Datadog ログドレイン][13]を使用して、Heroku Logplex からメトリクスログを収集し、Datadog に転送します。
3. 収集されたログに対して[ログベースのメトリクス][14]を生成します。

## ファイルの場所

* Datadog Agent は、`/app/.apt/opt/datadog-agent` にインストールされます
* Datadog Agent の構成ファイルは、`/app/.apt/etc/datadog-agent` にあります
* Datadog Agent のログは、`/app/.apt/var/log/datadog` にあります

## インテグレーションの有効化

[Datadog-<インテグレーション名> インテグレーション][15]を有効にするには、アプリケーションのルートにファイル `/datadog/conf.d/<インテグレーション名>.yaml` を作成します。dyno の起動中に、YAML ファイルが適切な Datadog Agent 構成ディレクトリにコピーされます。

たとえば、[Datadog-Redis インテグレーション][16]を有効にするには、アプリケーションのルートにファイル `/datadog/conf.d/redis.yaml` を作成します。

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

**注**: 使用可能なすべての構成オプションの詳細については、サンプル [redisdb.d/conf.yaml][17] を参照してください。

## 事前実行スクリプト

上述したすべての構成に加えて、事前実行スクリプト `/datadog/prerun.sh` をアプリケーションに含めることができます。事前実行スクリプトは、すべての標準構成アクションの実行後、Datadog Agent の起動直前に実行されます。これにより、環境変数を変更することや追加の構成を実行すること、さらには Datadog Agent をプログラムで無効にすることもできます。

以下に、`prerun.sh` スクリプトで実行できるいくつかの例を示します。

```shell
#!/usr/bin/env bash

# dyno タイプに基づいて Datadog Agent を無効にします
if [ "$DYNOTYPE" == "run" ]; then
  DISABLE_DATADOG_AGENT="true"
fi

# Heroku アプリケーションの環境変数を使用して、Postgres の構成を上記の設定から更新します
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

## デバッグ

[Agent のドキュメント][18]にリストされている情報/デバッグコマンドのいずれかを実行するには、`agent-wrapper` コマンドを使用します。

たとえば、Datadog Agent と有効なインテグレーションのステータスを表示するには、以下を実行します。

```shell
agent-wrapper status
```

## Python と Agent のバージョン

バージョン `6.14` より前の Datadog v6 Agent には、Python バージョン `2` が組み込まれていました。`6.14` 以降、2020 年 1 月に発表された Python バージョン `2` のサポート終了に合わせて、Datadog v6 Agent には Python バージョン `2` と `3` の両方が付属しています。これは、お客様にカスタムチェックを Pythonバージョン `3` に移行する十分な時間を提供するためです。Heroku ビルドパックは、いずれかのバージョンのみを保持します。`DD_PYTHON_VERSION` を `2` または `3` に設定して、Agent が保持する Python バージョンを選択します。設定しない場合、ビルドパックは Python バージョン `2` を保持します。Python バージョン `2` でのみ動作するカスタムチェックを使用している場合、サポート終了の前にバージョン `3` に移行することをお勧めします。

Agent v7 には、Python バージョン `3` のみが付属しています。カスタムチェックを使用していない場合、またはカスタムチェックがすでにバージョン `3` に移行されている場合は、できるだけ早く Agent 7 に移行することをお勧めします。`6.15` 以降、同じマイナーバージョンの v7 リリースは同じ機能セットを共有するため、これら 2 つの間を安全に移動できます。たとえば、`6.16` を実行していて、Python バージョン `2` が必要ない場合、`7.16` にジャンプしても安全です。

## Heroku ログの収集

Datadog ビルドパックは、Heroku プラットフォームからログを収集しません。Heroku のログ収集を設定するには、[専用ガイド][13]をご覧ください。

## 非サポート

Heroku ビルドパックは Docker イメージと共に使用することはできません。Datadog を使用して Docker イメージを構築する方法については、[Datadog Agent の Docker ファイル][19]を参照してください。

## 寄稿

[Heroku-buildpack-datadog リポジトリ][21]で問題またはプルリクエストを投稿する方法については、[ドキュメントの寄稿][20]を参照してください。

## 履歴

このプロジェクトの以前のバージョンは、[miketheman heroku-buildpack-datadog プロジェクト][22]から分岐したものです。その後、Datadog の Agent バージョン 6 向けに書き換えが行われました。変更内容と詳細は、[changelog][23] にあります。

## FAQ/トラブルシューティング

### Datadog から報告される Agent 数が dynos 数を超えています

`DD_DYNO_HOST` が `true` に設定され、`HEROKU_APP_NAME` にすべての Heroku アプリケーションの値が設定されていることを確認してください。詳細は、[ホスト名のセクション](#hostname)を参照してください。

### ビルドパックまたは Agent をアップグレードした後、Agent が起動時にエラーをレポートしている

ビルドパックまたは Agent のアップグレード後は、ビルドキャッシュをクリアし、アプリケーションのスラグを再コンパイルする必要があります。詳細については、[アップグレードとスラグの再コンパイルのセクション](#upgrading-and-slug-recompilation)を確認してください。

[1]: https://devcenter.heroku.com/articles/buildpacks
[2]: https://docs.datadoghq.com/ja/libraries
[3]: https://github.com/heroku/heroku-buildpack-apt
[4]: https://github.com/jontewks/puppeteer-heroku-buildpack
[5]: https://github.com/lstoll/heroku-buildpack-monorepo
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/DataDog/heroku-buildpack-datadog/releases
[8]: https://docs.datadoghq.com/ja/tagging/
[9]: https://docs.datadoghq.com/ja/dashboards/guide/how-to-graph-percentiles-in-datadog/
[10]: https://docs.datadoghq.com/ja/agent
[11]: https://devcenter.heroku.com/articles/dyno-metadata
[12]: https://devcenter.heroku.com/articles/log-runtime-metrics
[13]: https://docs.datadoghq.com/ja/logs/guide/collect-heroku-logs
[14]: https://docs.datadoghq.com/ja/logs/logs_to_metrics/
[15]: https://docs.datadoghq.com/ja/integrations/
[16]: https://docs.datadoghq.com/ja/integrations/redisdb/
[17]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[18]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[19]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles
[20]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CONTRIBUTING.md
[21]: https://github.com/DataDog/heroku-buildpack-datadog
[22]: https://github.com/miketheman/heroku-buildpack-datadog
[23]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CHANGELOG.md