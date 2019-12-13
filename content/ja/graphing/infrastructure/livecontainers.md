---
title: ライブコンテナ
kind: documentation
aliases:
  - /ja/guides/livecontainers
  - /ja/infrastructure/livecontainers/
further_reading:
  - link: graphing/infrastructure/hostmap
    tag: グラフの作成方法
    text: ホストマップを使用してすべてのホストを 1 画面に表示
  - link: graphing/infrastructure/process
    tag: グラフの作成方法
    text: システムのあらゆるレベルの事象の把握
---
## はじめに

[Datadog ライブコンテナ][1]は、環境内のすべてのコンテナをリアルタイムに表示できるようにします。

htop、ctop、kubectl などの基盤ツールを手本として、ライブコンテナはユーザーのコンテナインフラストラクチャーを完全にカバーしつつ、解像度 2 秒のリソースメトリクス、ファセット検索、コンテナログストリーミングでテーブルを継続的に更新します。

ライブコンテナビューは、[Docker][2]、[Kubernetes][3]、[ECS][4] などのコンテナ技術のインテグレーションと連動し、動的コンポーネントのタグ付けも組み込まれて、コンテナの健全性、リソース消費、ログ、デプロイなどの詳細な全体像をリアルタイムに提供します。

{{< img src="graphing/infrastructure/livecontainers/livecontainerssummaries.png" alt="Live containers with summaries" responsive="true" >}}

## インストール
[Docker Agent][5] をデプロイしたら、追加設定なしでコンテナメトリクスを利用できます。ログ収集を有効にするには、以下の手順に従います。

{{< tabs >}}

{{% tab "Linux/Windows" %}}
[Datadog Agent][1] をインストールしたら、ログ収集を有効にします。[Agent のメイン構成ファイル][2]を編集して、以下のパラメーターを更新します。

```
logs_enabled: true
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```
**注**:

* [Docker Agent][1] ではなく標準インストールでコンテナ情報を収集するには、``dd-agent` ユーザーが **docker.sock** へのアクセス許可を持つ必要があります。
* ログはデフォルトでインデックス化されますが、[除外フィルター][2]を設定して、インデックスや独自の Live Tail データ受信を細かく制御することができます。


[1]: /ja/agent/docker/log/?tab=hostinstallation
[2]: /ja/agent/guide/agent-configuration-files/
{{% /tab %}}

{{% tab "Docker" %}}

[Docker Agent][1] の手順に従い、必要に応じて他のカスタム設定に加えて、以下の属性を渡します。

```
-e DD_LOGS_ENABLED=true
-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

**注**: ログはデフォルトでインデックス化されますが、[除外フィルター][2]を設定して、インデックスや独自の Live Tail データ受信を細かく制御することができます。

[1]: /ja/agent/docker/log/?tab=containerinstallation
[2]: /ja/logs/indexes/#exclusion-filters
{{% /tab %}}

{{% tab "Kubernetes" %}}
[DaemonSet][1] の作成に使用された `dd-agent.yaml` マニフェスト内に、以下の環境変数、ボリュームマウント、およびボリュームを追加します。

```
  env:
    - name: DD_LOGS_ENABLED
        value: "true"
    - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
        value: "true"

  volumeMounts:
    - name: pointerdir
        mountPath: /opt/datadog-agent/run

volumes:
  - hostPath:
      path: /opt/datadog-agent/run
      name: pointerdir

```

**注**:

* ログはデフォルトでインデックス化されますが、[除外フィルター][2]を設定して、インデックスや独自の Live Tail データを細かく制御することができます。

[1]: /ja/agent/kubernetes/daemonset_setup
[2]: /ja/logs/indexes/#exclusion-filters
{{% /tab %}}
{{< /tabs >}}

ログのインテグレーションの有効化については、[ログ収集のドキュメント][6]を参照してください。

## コンテナログ

`docker logs -f` や `kubectl logs -f` などのコンテナのストリーミングログを Datadog で表示します。テーブル内のコンテナをクリックして調べることができます。Logs タブをクリックすると、[Live Tail][7] からのリアルタイムデータや過去の任意の時間のインデックス化されたログが表示されます。

### Live Tail
Live Tail を使用すると、すべてのコンテナログがストリーミングされます。ストリームを一時停止すると、高速に書き込まれているログを簡単に読むことができます。一時停止を解除すると、ストリーミングが継続されます。

簡単な文字列マッチングでストリーミングログを検索できます。Live Tail の詳細については、[Live Tail のドキュメント][7]を参照してください。

**注**: ストリーミングログは永続化されません。新しい検索を入力するか、ページをリフレッシュすると、ストリームはクリアされます。

{{< img src="graphing/infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="Preview Logs Sidepanel" video="true" responsive="true" >}}

### インデックス化されたログ

対応するタイムフレームを選択することで、インデックス化して永続化するように選択したログを表示できます。インデックス化を使用すると、タグやファセットを使用してログをフィルタリングできます。たとえば、`Error` 状態のログを検索するには、検索ボックスに `status:error` と入力します。オートコンプリートによって目的のタグが見つけやすくなります。ログの重要な属性が既にタグに保存されているため、必要に応じて検索、フィルタリング、集計を行うことができます。

{{< img src="graphing/infrastructure/livecontainers/errorlogs.png" alt="Preview Logs Sidepanel" responsive="true" style="width:100%;">}}

## 検索、フィルタリング、ピボット

### 文字列検索

コンテナは、本質的に極めてカーディナリティの高いオブジェクトです。Datadog の柔軟な文字列検索は、コンテナ名、ID、またはイメージフィールドから一致する部分文字列を見つけます。

複合クエリで複数の文字列検索を組み合わせるには、以下のブール演算子を使用します。

|              |                                                                                                                                  |                                                                 |
| :----        | :----                                                                                                                            | :----                                                           |
| **演算子** | **説明**                                                                                                                  | **例**                                                     |
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。                           | java AND elasticsearch                                          |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                                                       | java OR python                                                  |
| `NOT` / `!`  | **排他**: 後続の条件はイベントに含まれません。単語 `NOT` と文字 `!` のどちらを使用しても、同じ演算を行うことができます。 | java NOT elasticsearch <br> java !elasticsearch でも**同じ** |

演算子をグループ化するには括弧を使用します。例: `(NOT (elasticsearch OR kafka) java) OR python`。


### タグ付け

コンテナは、すべての既存のホストレベルのタグおよび個別のコンテナに関連付けられたメタデータを使用して[タグ付け][8]されます。

よく使用されるオーケストレーターとのインテグレーションを含め、すべてのコンテナは `image_name` でタグ付けされます。[ECS][4] と [Kubernetes][3] には、さらにいくつかのコンテナレベルのタグが提供されます。また、各コンテナには Docker、ECS、または Kubernetes のアイコンが付くため、どれがオーケストレーション中であるかが一目でわかります。

ECS コンテナは以下でタグ付けされます。

*  `task_name`
*  `task_version`
*  `ecs_cluster`

Kubernetes コンテナは以下でタグ付けされます。

* `pod_name`
* `kube_pod_ip`
* `kube_service`
* `kube_namespace`
* `kube_replica_set`
* `kube_daemon_set`
* `kube_job`
* `kube_deployment`
* `kube_cluster`

### フィルタリングとピボット

下のスクリーンショットは、あるシステムがフィルタリングによって 9 つのノードからなる 1 つの Kubernetes クラスターに絞り込まれたところを示しています。コンテナの RSS および CPU 使用率をレポートする際に、コンテナに制限がプロビジョニングされている場合は、制限との比較が示されます。ここでは、このクラスターのコンテナがオーバープロビジョニングになっていることは明らかです。制限とビンパッキングを厳しくすれば、リソースの使用率を改善できます。

{{< img src="graphing/infrastructure/livecontainers/overprovisioned.png" alt="Over Provisioned" responsive="true" style="width:80%;">}}

コンテナ環境は動的であり、追跡が困難な場合があります。下のスクリーンショットは、`kube_service` と `host` によってピボットされたビューです。システムノイズを減らすために、`kube_namespace:default` に絞り込まれています。どのサービスがどこで実行されているか、キーメトリクスの飽和状態などがわかります。

{{< img src="graphing/infrastructure/livecontainers/hostxservice.png" alt="Host x services" responsive="true" style="width:80%;">}}

ECS の `ecs_task_name` や `ecs_task_version` でピボットすると、更新時のリソース使用率の変化を把握できます。

{{< img src="graphing/infrastructure/livecontainers/tasksxversion.png" alt="Tasks x version" responsive="true" style="width:80%;">}}

## 散布図

散布図分析を使用すると、2 つのメトリクスを比較してコンテナのパフォーマンスをより的確に把握できます。

[Containers ページ][1]で散布図分析にアクセスするには、Show Summary graph ボタンをクリックし、"Scatter Plot" タブを選択します。

{{< img src="graphing/infrastructure/livecontainers/scatterplot_selection.png" alt="scatterplot selection" responsive="true" style="width:60%;">}}

デフォルトでは、グラフは `short_image` タグキーでグループ化されます。ドットのサイズは、各グループ内のコンテナの数を表します。ドットをクリックすると、グループに参加しているすべてのコンテナとホストが表示されます。

散布図分析の上部にあるクエリを使用して、散布図分析を制御できます。

* 表示するメトリクスの選択。
* 2 つのメトリクスの集計方法の選択。
* X 軸と Y 軸の目盛の選択 (Linear/Log)。

{{< img src="graphing/infrastructure/livecontainers/scatterplot.png" alt="scatterplot" responsive="true" style="width:80%;">}}


## リアルタイムの監視

コンテナページをアクティブに使用している間、メトリクスは 2 秒の解像度で収集されます。これは、CPU などの揮発性が高いメトリクスで重要です。バックグラウンドでは、履歴を目的として、10 秒の解像度でメトリクスが収集されます。

## コンテナを対象に入れる/除外する

ライブコンテナは従量制ではありません。コンテナを対象に入れたり除外しても、課金には影響しません。

コンテナは、リアルタイム収集の対象に入れたり、除外したりすることができます。

- メイン構成ファイル `datadog.yaml` に環境変数 `DD_AC_EXCLUDE` を渡すか、`ac_exclude:` を追加することで、コンテナを対象から除外することができます。
- メイン構成ファイル `datadog.yaml` に環境変数 `DD_AC_INCLUDE` を渡すか、`ac_include:` を追加することで、コンテナを対象に入れることができます。

どちらの引数も値は**イメージ名**になります。正規表現もサポートされています。

たとえば、名前が frontend で始まるコンテナ以外のすべての Debian イメージを除外するには、`datadog.yaml` ファイルに次の 2 つの構成行を追加します。

```
ac_exclude: ["image:debian"]
ac_include: ["name:frontend.*"]
```

**注**: Agent 5 の場合は、これをメインの `datadog.conf` 構成ファイルに追加する代わりに、`datadog.yaml` ファイルを明示的に `/etc/datadog-agent/` に追加してください。プロセス Agent は、ここにすべての構成オプションがあることを前提とするためです。この構成は、コンテナをリアルタイム収集から除外するだけで、オートディスカバリーからは**除外しません**。

## 注意事項/既知の問題

- この機能は、現時点で Windows コンテナをサポートしていません。

- リアルタイム (2 秒) データ収集は 30 分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。

- RBAC 設定によって Kubernetes のメタデータ収集を制限できます。[Datadog Agent の RBAC エンティティ][9]を参照してください。

- Kubernetes の `health` 値は、コンテナの readiness プローブです。liveness プローブではありません。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/containers
[2]: /ja/integrations/docker_daemon
[3]: /ja/integrations/kubernetes
[4]: /ja/integrations/amazon_ecs
[5]: /ja/agent/docker/#run-the-docker-agent
[6]: /ja/agent/docker/log/?tab=hostinstallation#activate-log-integrations
[7]: /ja/logs/live_tail
[8]: /ja/tagging
[9]: https://gist.github.com/hkaj/404385619e5908f16ea3134218648237