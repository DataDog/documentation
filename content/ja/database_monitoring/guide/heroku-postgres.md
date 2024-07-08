---
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: ドキュメント
  text: Datadog Heroku ビルドパック
private: true
title: Heroku Postgres のデータベースモニタリングのためのセットアップ
---

このガイドでは、アプリケーション dyno に [Datadog Heroku ビルドパック][1]を構成したことを前提に説明します。

[Datadog データベースモニタリング][2]は、すべてのデータベースのクエリメトリクスと実行計画を一箇所で見ることができます。このガイドでは、[Heroku Postgres マネージドデータベース][3]に対するデータベースモニタリングのセットアップ方法を説明します。

*注*: [Standard プランと Premium プラン][4]のデータベースのみ、インテグレーションで使用されるメトリクスを公開します。Hobby プランの Postgres インスタンスで使用する場合、データベースモニタリングのすべての機能が利用できるわけではありません。

まず、データベースに `datadog` ユーザーを作成します。

```shell
# アプリケーションのルートディレクトリにいることを確認します
heroku pg:credentials:create --name datadog

# 新しい資格情報をアプリケーションにアタッチします
heroku addons:attach <database-name> --credential datadog
```

新しい資格情報をアプリケーションにアタッチすると、アプリケーションに接続 URL を含む新しい環境変数が作成されます。この環境変数は後で使うことになるので、書き留めてください。

デフォルトの資格情報を使って Postgres データベースにログインし、`datadog` という資格情報に正しい権限を与えます。

```shell
heroku pg:psql
```

psql のターミナルに入ったら、以下のスキーマを作成します。

```
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

データベースに以下の関数を作成します。

```
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```

最後に、新しい資格情報を使って Postgres のチェックを有効にするために、Datadog Agent を構成します。

```shell
# アプリケーションのルートディレクトリにいることを確認
# アプリケーションコードで、インテグレーションコンフィギュレーションのフォルダーを作成
mkdir -p datadog/conf.d/
```

以下の内容で `postgres.yaml` というコンフィギュレーションファイルを作成します (prerun スクリプトの一部として実行されるため、資格情報に置き換えないでください)。

```yaml
init_config:

instances:
  - dbm: true
    host: <YOUR HOSTNAME>
    port: <YOUR PORT>
    username: <YOUR USERNAME>
    password: <YOUR PASSWORD>
    dbname: <YOUR DBNAME>
    ssl: True
```

アプリケーションに `datadog` 資格情報をアタッチしたときに作成された環境変数 (以下の例では `HEROKU_POSTGRESQL_PINK_URL` と仮定) を使用して、Datadog Agent の起動前にこれらの値を置き換えるために[事前実行スクリプト][5]に以下を追加してください。

```bash
#!/usr/bin/env bash

# Heroku アプリケーションの環境変数を使用して、Postgres の構成を上記の設定から更新します
if [ -n "$HEROKU_POSTGRESQL_PINK_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $HEROKU_POSTGRESQL_PINK_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<YOUR HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR DBNAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Heroku へのデプロイ:

```shell
# Heroku にデプロイ
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

[1]: /ja/agent/basic_agent_usage/heroku/
[2]: https://www.datadoghq.com/product/database-monitoring/
[3]: https://devcenter.heroku.com/articles/heroku-postgresql
[4]: https://devcenter.heroku.com/articles/heroku-postgres-plans
[5]: /ja/agent/basic_agent_usage/heroku/#prerun-script