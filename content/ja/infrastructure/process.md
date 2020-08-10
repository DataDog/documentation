---
title: ライブプロセス
kind: documentation
aliases:
  - /ja/guides/process
  - /ja/graphing/infrastructure/process/
further_reading:
  - link: /infrastructure/hostmap
    tag: グラフ
    text: ホストマップを使用してすべてのホストを 1 画面に表示
  - link: /infrastructure/livecontainers
    tag: グラフ
    text: 環境内のすべてのコンテナのリアルタイム表示
---
## はじめに

Datadog のプロセスモニタリングを使用すると、デプロイに含まれる最も粒度の細かい要素をリアルタイムに可視化できます。

{{< img src="infrastructure/process/live_process_preview.png" alt="ライブプロセスプレビュー"  >}}

## インストール

以下のインストール手順は、[Agent 6 と 7][1] を対象としています。Agent 5 を使用している場合は、[こちらのバージョン固有のインストール手順][2]に従ってください。

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

## 検索、フィルタリング、ピボット

### 検索構文

プロセスとコンテナは、本質的に極めてカーディナリティの高いオブジェクトです。関連情報を表示するには、あいまい文字列検索を使用すると便利です。2 文字以上の文字列を入力すると結果が表示されます。下の例では、Datadog のデモ環境を文字列 `postgres /9.` でフィルタリングしています。

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

### タグ付け

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

### フィルタリングとピボット

最初に、検索範囲を絞り込むために、Datadog のフロントエンドのクエリサービス `role:McNulty-Query` にフィルターダウンできます。次に、NGINX マスタープロセスを検索し、テーブルをアベイラビリティーゾーンでピボットして、サービスが高い可用性を維持していることを確認できます。

{{< img src="infrastructure/process/mcnultynginx.png" alt="mcnulty nginx"  style="width:80%;">}}

次の図では、特定の機能チームの Elasticsearch プロセスをチェックしています。自発的および非自発的コンテキストスイッチに対するメトリクスも追加されています。これは、テーブルの右上にある歯車アイコンのメニューにあります。

{{< img src="infrastructure/process/burritoelasticsearch.png" alt="burrito elasticsearch"  style="width:80%;">}}

以下では、だれがどのホストにログインしているかを把握するために、SSH プロセスを検索し、`user` でピボットしています。

{{< img src="infrastructure/process/sshusers.png" alt="ssh ユーザー"  style="width:80%;">}}

改訂後は面白い例でなくなるかもしれません。

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

## 強化されたライブコンテナビュー

ライブプロセスは、コンテナデプロイの可視化をさらに強化しています。[ライブコンテナ][6]機能は、コンテナとオーケストレーターの環境を同様に総合的に表示します。ライブプロセスが有効になっている場合は、各コンテナのプロセスツリーがページのコンテナ調査パネルに表示されます。

{{< img src="infrastructure/process/containerinspect.png" alt="コンテナ検査"  style="width:80%;">}}

## リアルタイムの監視

ライブプロセスをアクティブに使用している間、メトリクスは 2 秒の解像度で収集されます。これは、CPU などの揮発性が高いメトリクスでは重要です。バックグラウンドでは、履歴を目的として 10 秒の解像度でメトリクスが収集されます。

## 注意事項とよくある質問

- 開かれているファイルと現在の作業ディレクトリの収集は、`dd-process-agent` を実行しているユーザーの権限レベルに基づいて制限されます。`dd-process-agent` がこれらのフィールドにアクセスすることができる場合は、自動的に収集されます。
- リアルタイム (2 秒) データ収集は 30 分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。
- コンテナのデプロイで、各プロセスのユーザー名を収集するには、`docker-dd-agent` にマウントされた `/etc/passwd` ファイルが必要です。これは公開ファイルですが、プロセス Agent はユーザー名以外のフィールドを使用しません。`user` メタデータフィールド以外のすべての機能は、このファイルにアクセスせずに機能します。**注**: ライブプロセスは、ホストの `passwd` ファイルのみを使用し、コンテナ内に作成されたユーザーのユーザー名解決は実行しません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/agent/faq/agent-5-process-collection/
[3]: /ja/getting_started/tagging/
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /ja/infrastructure/livecontainers/