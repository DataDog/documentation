---
aliases:
- /ja/observability_pipelines/install_the_worker/worker_commands/
description: Observability Pipelines Worker コマンドラインインターフェースの実行、tap、および top コマンドとオプションを見つけます。
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/install_the_worker/
  tag: ドキュメント
  text: Worker をインストールする
title: Worker CLI コマンド
---
## Worker を実行、tap、または top する {#run-tap-or-top-the-worker}

使用例: `observability-pipelines-worker <COMMAND>`

コンテナ化された環境を使用している場合は、`docker exec` または `kubectl exec` コマンドを使用してコンテナにシェルを取得し、コマンドを実行します。例:

- Kubernetes の場合: `kubectl exec -it <pod_name> -- observability-pipelines-worker <opw_command>`
- Docker の場合: `docker exec -it <container_name> observability-pipelines-worker <opw_command>`

| コマンド   | 説明                                                                                                           |
|-----------|-----------------------------------------------------------------------------------------------------------------------|
| `run`     | Observability Pipelines Worker を実行します。                                                                               |
| `tap`     | パイプラインを tap して、ソースまたは変換コンポーネントからイベントを監視します。[tap オプション](#tap-options)を参照してください。               |
| `top`     | パイプラインのコンポーネントを一覧表示し、各コンポーネントの入力および出力データレートなどの統計情報を提供します。利用可能なすべてのキーバインドを確認するには、`?` と入力します。 |

### tap オプション {#tap-options}

使用例: `observability-pipelines-worker tap <OPTIONS> <COMPONENT_ID>`

[`top` コマンド](#run-tap-or-top-the-worker)を使用して、`tap` するコンポーネントの ID を見つけます。

| オプション                          | 説明                                                                                                   |
|----------------------------------|----------------------------------------------------------------------------------------------------------------|
| `-i`、`--interval <INTERVAL>`    | イベントをサンプリングする間隔、ミリ秒単位 (デフォルト: `500`)。                                                |
| `-u`、`--url <URL>`              | GraphQL API サーバーのエンドポイント。                                                                                   |
| `-l`、`--limit <LIMIT>`          | 各間隔でサンプリングするイベントの最大数 (デフォルト: `100`)。                                             |
| `-f`、`--format <FORMAT>`        | 画面に出力されるイベントのエンコーディング形式。<br>デフォルト: `json`<br>使用可能な値: `json`、`yaml`、`logfmt`  |
| `--outputs-of <OUTPUTS_OF>`      | 出力を監視するソースまたはプロセッサの ID (カンマ区切り。glob パターンも使用可能)。           |
| `--inputs-of <INPUTS_OF>`        | 入力を監視するプロセッサまたは送信先の ID (カンマ区切り。glob パターンも使用可能)。        |
| `-q`, `--quiet`                  | Quiet 出力にはイベントのみが含まれます。                                                                             |
| `-m`、`--meta`                   | イベントに関連付けられたコンポーネント ID などのメタデータを含めます。                                                  |
| `-n`、`--no-reconnect`           | 基盤となる API 接続が切断された場合に再接続するかどうか。デフォルトでは、`tap` はコネクションが切断された場合に再接続を試みます。|
| `-d`、`--duration-ms <DURATION_MS>` | ログをサンプリングする期間 (ミリ秒単位) を指定します (例: `10000` を指定すると、10 秒間ログをサンプリングした後に終了します)。|

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}