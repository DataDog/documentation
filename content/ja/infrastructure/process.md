---
title: ライブプロセス
kind: documentation
aliases:
  - /ja/guides/process
  - /ja/graphing/infrastructure/process/
further_reading:
  - link: 'https://www.datadoghq.com/blog/live-process-monitoring/'
    tag: ブログ
    text: Datadog でのプロセスのモニタリング
  - link: /infrastructure/process/generate_process_metrics/
    tag: Documentation
    text: メトリクスでプロセスデータの保持期間を高めます
  - link: /infrastructure/livecontainers
    tag: グラフ
    text: 環境内のすべてのコンテナのリアルタイム表示
---
## はじめに

Datadog のライブプロセスにより、インフラストラクチャー上で実行中のプロセスをリアルタイムで可視化できます。ライブプロセスを使用すると、以下のことができます。

* 実行中のプロセスを１か所で表示する
* ホストやコンテナのリソース消費をプロセスレベルで分類します
* 特定のホストや特定のゾーンで実行中のプロセスや、特定のワークロードを実行するプロセスのクエリ
* システムメトリクスを使用して、実行する内部およびサードパーティーソフトウェアのパフォーマンスを 2 秒の粒度でモニターします
* ダッシュボードとノートブックにコンテキストを追加します

{{< img src="infrastructure/process/live_processes_main.png" alt="ライブプロセスの概要"  >}}

## インストール

Agent 5 の場合は、[こちらのバージョン固有のインストール手順に従ってください][1]。Agent 6 または 7 をご利用の場合は、[以下の手順を参照してください][2]。 

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Datadog Agent をインストールしたら、[Agent のメイン構成ファイル][1]を編集し、次のパラメーターを `true` に設定して、ライブプロセスの収集を有効にします。

```yaml
process_config:
    enabled: 'true'
```

`enabled` の値は文字列で、以下のオプションがあります。

- `"true"`: プロセス Agent を有効にして、プロセスとコンテナを収集します。
- `"false"` (デフォルト): コンテナがあれば、コンテナのみを収集します。
- `"disabled"`: プロセス Agent をまったく実行しません。

さらに、いくつかの構成オプションを環境変数として設定できます。

**注**: 環境変数として設定されたオプションは、構成ファイルで定義されている設定を上書きします。

設定が完了したら、[Agent を再起動][2]します。


[1]: /ja/agent/guide/agent-configuration-files/
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

[Docker Agent][1] の手順に従って、必要に応じて他のカスタム設定に加えて、以下の属性を渡します。

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

**注**:

- 標準インストールでコンテナ情報を収集するには、`dd-agent` ユーザーが `docker.sock` へのアクセス許可を持つ必要があります。
- 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。


[1]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Daemonset の作成に使用された [dd-agent.yaml][1] マニフェスト内に、以下の環境変数、ボリュームマウント、およびボリュームを追加します。

```yaml
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

詳細については、標準の [Daemonset インストール][2]のページおよび [Docker Agent][3] の情報ページを参照してください。

**注**: 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: /ja/agent/kubernetes/
[3]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

次のプロセス収集コンフィギュレーションで [datadog-values.yaml][1] ファイルを更新してから、Datadog Helm チャートをアップグレードします。

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}

{{< /tabs >}}

### プロセス引数のスクラビング

ライブプロセスページに機密データが表示されないように、Agent はプロセスコマンドラインからの機密性の高い引数をスクラビングします。この機能はデフォルトで有効になっており、以下の語のいずれかと一致するプロセス引数は、値が表示されません。

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**注**: この一致では、**大文字と小文字は区別されません**。

`datadog.yaml` ファイルの `process_config` セクションの下にある `custom_sensitive_words` フィールドを使用すると、独自のリストを定義して、デフォルトのリストと統合することができます。ワイルドカード (`*`) を使用して、一致の範囲を独自に定義できます。ただし、ワイルドカード (`'*'`) 単独の使用は、機密語としてサポートされていません。

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**注**: `custom_sensitive_words` 内の語には、英数字、アンダースコア、およびワイルドカード (`'*'`) のみを使用できます。ワイルドカードのみの機密語はサポートされていません。

次の図に、ライブプロセスページに表示されたプロセスの一例を示します。上の構成を使用して、プロセス引数が非表示にされています。

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="プロセス引数のスクラビング"  style="width:100%;">}}

`scrub_args` を `false` に設定すると、プロセス引数のスクラビングを完全に無効化できます。

`datadog.yaml` 構成ファイルで `strip_proc_arguments` フラグを有効にすることで、プロセスの**すべての**引数をスクラビングすることもできます。

```yaml
process_config:
    strip_proc_arguments: true
```

## クエリ

### プロセスのスコーピング

プロセスは、本質的に極めてカーディナリティの高いオブジェクトです。関連するプロセスを表示するようにスコープを絞り込むには、テキストフィルターやタグフィルターを使用します。

#### テキストフィルター

検索バーにテキスト文字列を入力すると、コマンドラインやパスにそのテキスト文字列を含むプロセスの照会に、あいまい検索が使用されます。2 文字以上の文字列を入力すると結果が表示されます。下の例では、Datadog のデモ環境を文字列 `postgres /9.` でフィルタリングしています。

**注**: `/9.` はコマンドパスの一部と一致し、`postgres` はコマンド自体と一致しています。

{{< img src="infrastructure/process/postgres.png" alt="Postgres"  style="width:80%;">}}

複合クエリで複数の文字列検索を組み合わせるには、以下のブール演算子を使用します。

|              |                                                                                                                                  |                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| **演算子** | **説明**                                                                                                                  | **例**                                                     |
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。                           | java AND elasticsearch                                          |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                                                       | java OR python                                                  |
| `NOT` / `!`  | **排他**: 後続の条件はイベントに含まれません。単語 `NOT` と文字 `!` のどちらを使用しても、同じ演算を行うことができます。 | java NOT elasticsearch <br> java !elasticsearch でも**同じ** |

演算子をグループ化するには括弧を使用します。例: `(NOT (elasticsearch OR kafka) java) OR python`。

#### タグフィルター

プロセスのフィルタリングには、`host`、`pod`、`user`、`service` などの Datadog [タグ][3]を使用することもできます。検索バーに直接タグフィルターを入力するか、ページ左側のファセットパネルで選択します。

Datadog は自動的に `command` タグを生成するので、以下をフィルタリングできます。
* サードパーティソフトウェア（例、`command:mongod`、`command:nginx`）
* コンテナ管理ソフトウェア（例、`command:docker`、`command:kubelet`）
* 一般的なワークロード（例、`command:ssh`、`command:CRON`）

### プロセスの集約

[タグ付け][3]はナビゲーションを強化します。すべての既存のホストレベルのタグに加えて、プロセスは `user` でもタグ付けされます。

さらに、ECS コンテナ内のプロセスは、以下でもタグ付けされます。

- `task_name`
- `task_version`
- `ecs_cluster`

Kubernetes コンテナ内のプロセスは、以下でタグ付けされます。

- `pod_name`
- `kube_pod_ip`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `Kube_cluster`

[統合サービスタグ付け][4]のコンフィギュレーションがある場合、`env`、`service`、`version` も自動的に取得されます。
上記のタグが利用できることで、APM、ログ、メトリクス、プロセスデータを結びつけることができます。
このセットアップはコンテナ化環境にのみ適用されます。

## 散布図

散布図分析を使用すると、2 つのメトリクスを比較してコンテナのパフォーマンスをより的確に把握できます。

[Processes ページ][5]で散布図分析にアクセスするには、_Show Summary graph_ ボタンをクリックし、"Scatter Plot" タブを選択します。

{{< img src="infrastructure/process/scatterplot_selection.png" alt="scatterplot 選択"  style="width:60%;">}}

デフォルトでは、グラフは `command` タグキーでグループ化されます。ドットのサイズは、各グループ内のプロセスの数を表します。ドットをクリックすると、グループに参加しているすべてのポッドとコンテナが表示されます。

散布図分析の上部にあるクエリを使用して、散布図分析を制御できます。

- 表示するメトリクスの選択。
- 2 つのメトリクスの集計方法の選択。
- X 軸と Y 軸の目盛の選択 (_Linear_/_Log_)。

{{< img src="infrastructure/process/scatterplot.png" alt="コンテナ検査"  style="width:80%;">}}

## プロセスモニター

複数のホストまたはタグにまたがるプロセスグループのカウントに基づいてアラートを生成するには、[ライブプロセスモニター][6]を使用します。プロセスアラートは、[モニターページ][7]で構成できます。詳細は、[ライブプロセスモニターのドキュメント][6]を参照してください。

{{< img src="infrastructure/process/process_monitor.png" alt="プロセスモニター"  style="width:80%;">}}

## ダッシュボードおよびノートブックでのプロセス

ダッシュボードやノートブックでプロセスメトリクスをグラフ化するには、[時系列ウィジェット][8]を使用します。構成するには、
1. ライブプロセスをデータソースとして選択
2. 検索バーのテキスト文字列を使用してフィルタリング
3. グラフ化するプロセスメトリクスを選択
4. `From` フィールドのタグを使用してフィルタリング

{{< img src="infrastructure/process/process_widget.png" alt="プロセスウィジェット"  style="width:80%;">}}

## 自動検出インテグレーション

Datadog ではプロセス収集を使用して、ホストで実行されているテクノロジーを自動検出します。これにより、こうしたテクノロジーの監視に役立つ Datadog インテグレーションが識別されます。この自動検出されたインテグレーションは、[インテグレーション検索][1]に表示されます。

{{< img src="getting_started/integrations/ad_integrations.png" alt="自動検出されたインテグレーション" >}}

各インテグレーションには、次の 2 つのステータスタイプのいずれかがあります。

- **+ Detected**: このインテグレーションは、それを実行しているホストでは有効になっていません。
- **✓ Partial Visibility**: このインテグレーションは、一部で有効になっていますが、すべての関連ホストで実行されているわけではありません。

インテグレーションを実行しているが、インテグレーションが有効になっていないホストは、インテグレーションタイルの **Hosts** タブにあります。

## プラットフォームにおけるプロセス

{{< img src="infrastructure/process/process_platform.gif" alt="プラットフォームにおけるプロセス" >}}

### ライブコンテナ

ライブプロセスは、それぞれのコンテナで実行中のプロセスを監視することで、コンテナデプロイの可視化をさらに強化しています。[ライブコンテナ][9]ページでコンテナをクリックすると、実行中のコマンドやリソース消費量を含むプロセスツリーが表示されます。コンテナメトリクスと共にこのデータを使用し、コンテナやデプロイの不具合の根本的な原因を探ります。

### APM

[APM トレース][10]でサービスのスパンをクリックすると、基礎インフラストラクチャーで実行中のプロセスを確認できます。サービスのスパンプロセスは、リクエスト時にサービスが実行されているホストまたはポッドと相関関係にあります。CPU および RSS メモリなどのプロセスメトリクスをコードレベルのエラーとともに分析することで、アプリケーション特有の問題かインフラストラクチャーの問題かを見分けることができます。プロセスをクリックすると、ライブプロセス ページが開きます。現在、関連するプロセスはサーバーレスおよびブラウザのトレースでサポートされていません。

### ネットワークパフォーマンスモニタリング

[ネットワークの概要][11]で依存関係を調べる際、相互に通信するエンドポイント（サービスなど）の基底のインフラストラクチャーで実行されるプロセスを確認できます。プロセスメタデータを使用して、ネットワークの接続の悪さ（TCP の再送信数が多いことから）やネットワークの呼び出し遅延の高さ（TCP ラウンドトリップタイムが長いことから）の原因が、エンドポイントのリソースを消費する重いワークロードであり、結果、通信の健全性や効率性に影響を与えているかを判断できます。

## リアルタイムの監視

ライブプロセスをアクティブに使用している間、メトリクスは 2 秒の解像度で収集されます。これは、CPU などの揮発性が高いメトリクスでは重要です。バックグラウンドでは、履歴を目的として 10 秒の解像度でメトリクスが収集されます。

## 追加情報

- 開かれているファイルと現在の作業ディレクトリの収集は、`dd-process-agent` を実行しているユーザーの権限レベルに基づいて制限されます。`dd-process-agent` がこれらのフィールドにアクセスすることができる場合は、自動的に収集されます。
- リアルタイム (2 秒) データ収集は 30 分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。
- コンテナのデプロイで、各プロセスのユーザー名を収集するには、`docker-dd-agent` にマウントされた `/etc/passwd` ファイルが必要です。これは公開ファイルですが、プロセス Agent はユーザー名以外のフィールドを使用しません。`user` メタデータフィールド以外のすべての機能は、このファイルにアクセスせずに機能します。**注**: ライブプロセスは、ホストの `passwd` ファイルのみを使用し、コンテナ内に作成されたユーザーのユーザー名解決は実行しません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/agent-5-process-collection/
[2]: /ja/agent/
[3]: /ja/getting_started/tagging/
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /ja/monitors/monitor_types/process/
[7]: https://app.datadoghq.com/monitors#create/live_process
[8]: /ja/dashboards/widgets/timeseries/#pagetitle
[9]: /ja/infrastructure/livecontainers/
[10]: /ja/tracing/
[11]: /ja/network_monitoring/performance/network_page