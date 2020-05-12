---
title: Dogwrap
description: Dogwrap を使用してコマンドを呼び出し、その結果からイベントを生成する
kind: ガイド
aliases:
  - /ja/developers/faq/can-i-call-scripts-and-generate-events-from-their-results
---
Dogwrap コマンドラインツールを使用すると、コマンドを呼び出して、その結果からイベントを生成できます。Dogwrap を使用するには、[Datadog Python ライブラリ][1]をインストールします。

pip からインストールする場合

```text
pip install datadog
```

ソースからインストールする場合

1. [DataDog/datadogpy][1] リポジトリを複製します。
2. ルートフォルダーで `python setup.py install` を実行します。

有効な最小限の `dogwrap` コマンドは、以下のレイアウトを持ちます。

```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> "<COMMAND>"
```

次のプレースホルダーと組み合わせます。

* `<EVENT_TITLE>`: Datadog に表示するイベントのタイトル。
* `<DATADOG_API_KEY>`: [オーガニゼーションに関連付けられた Datadog API キー][2]。
* `<COMMAND>`: ラップしてイベントを生成するコマンド。呼び出されるコマンドは引用符で囲みます。これは、Python がこのコマンドラインの引数を、ラップされたコマンドの引数ではなく Python コマンドの引数と見なさないようにするためです。

**注**: Dogwrap のヘルプコマンド `dogwrap help` を使用すると、使用可能なすべてのオプションが表示されます。

実際の `dogwrap` の例として、`cron` を考えます。次のように、Postgres テーブルを毎日バキュームする cron スクリプトがあるとします。

```bash
0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1
```

バキュームは特にリソースを集中的に使用します。そこで、バキュームを実行するたびに、メトリクスやイベントをバキュームに関連付ける Datadog イベントを生成できます。

```bash
dogwrap -n "Vacuuming mytable" -k $DATADOG_API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log"
```

これは、スクリプトの最後にあるコマンドを呼び出し、コマンドが 0 以外の終了コード (つまりエラー) で終了すると、Datadog イベントを送信します。`--submit_mode all` を使用すると、このコマンドを実行するたびに、イベントが送信されます。

[1]: https://github.com/DataDog/datadogpy
[2]: https://app.datadoghq.com/account/settings#api