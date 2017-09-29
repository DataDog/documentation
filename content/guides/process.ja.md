---
last_modified: 2017/09/28
translation_status: completed
language: ja
title: Datadog Process & Container モニタリング
kind: guide
listorder: 16
beta: true
---

<!--
## Introduction

Datadog Process and Container Monitoring allows for real-time visibility of the most granular elements in a deployment.  Taking inspiration from bedrock tools like `htop`, this centralized view, combined with existing tagging capabilities, allows you to understand what is going on at any level of your system and drill all the way down into the most fine details.

{{< img src="process/live_process_preview.png" >}}

## Searching, Filtering, and Pivoting
-->
## はじめに

Datadog Process / Container モニタリング を使用すると、デプロイメントの中で最も微細な要素をリアルタイムで視覚化することができます。`htop`ような基盤ツールからインスピレーションを得たこの集中ビューは、Datadogで活用されてきたタグの能力と組み合わせることでシステムのあらゆるレベルで何が起こっているのかを理解し、最も深い詳細に至るまで掘り下げることができます。

{{< img src="process/live_process_preview.png" >}}

## 検索, フィルタリング, そしてピボット

<!--
### String Search

Processes and containers are by their nature extremely high cardinality objects.  Our fuzzy string search gives you a view into exactly what you want.  Below is our Demo environment, filtered with the string `postgres /9.`.  Note that `/9.` has matched in the command path, and that `postgres` matches the command itself.

{{< img src="process/postgres.png" >}}
-->
### 文字列の検索

プロセスとコンテナはその性質上、非常にカーディナリティの高いオブジェクトです。 Datadogのファジィ文字列検索は、望むビューを正確に得ることができます。以下は、 `postgres /9.`という文字列でフィルタリングされたDatadogのデモ環境のビューです。注目すべきは、`/9.`はコマンドのパス内でマッチしており、`postgres`はコマンドそのものにマッチしてます。

{{< img src="process/postgres.png" >}}

<!--
### Tagging

Processes and containers are tagged with all existing host-level tags.  Additionally, we tag with metadata associated with individual processes and containers.

*Processes* are tagged by `#user`

*Containers* are tagged by `#container_image`

Additionally, we include integrations with popular orchestrators, such as ECS and Kubernetes, which provide further container-level tags.  We also decorate each container with Docker, ECS, or Kubernetes icons so you can tell which are being orchestrated at a glance.

ECS Containers are tagged by `#task_name`, `#task_version`, and `#ecs_cluster`

Kubernetes Containers are tagged by `#pod`, `#pod_ip`, `#service`, `#namespace`, `#cluster-name`, `#replica_set`, `#daemon_set`, `#job`, and `#deployment`.
-->
### Tagging

プロセスとコンテナには、既存のすべてのホストレベルのタグがタグ付けされています。さらに個々のプロセスとコンテナに関連付けられたメタデータもタグ付けします。

*プロセス* は `#user` によって、

*コンテナ* は `#container_image` によってタグ付けされます。

さらに、コンテナレベルのタグを追加で提供できるECSやKubernetesといったオーケストレータとのインテグレーションも実装されています。Docker、ECS、あるいはKubernetesの各アイコンを使用して各コンテナが装飾されるので、どのオーケストレーターによって管理されているものかひと目で知ることができます。

ECSコンテナは、`#task_name`, `#task_version`, `#ecs_cluster` タグが付けられ、

Kubernetesコンテナには、`#pod`, `#pod_ip`, `#service`, `#namespace`, `#cluster-name`, `#replica_set`, `#daemon_set`, `#job`, `#deployment`　タグが付けられます。

<!--
### Filtering and Pivoting

Making sense of hundreds of thousands or millions of processes and containers can seem overwhelming!  Using tagging, described in the previous section, makes navigation easy.

In the below, we have filtered down to a Kubernetes cluster of 9 nodes.  RSS and CPU utilization on containers is reported compared to the limits set on the containers, when they exist.  Here, we see that the containers in this cluster are way overprovisioned, and that we could use tighter limits and bin packing to acheive better utilization of resources.

{{< img src="process/overprovisioned.png" >}}

Container environments are dynamic and can be hard to follow.  Here, we pivot by `#service` and `#host`, and to reduce system noise, filter to `#namespace:default`, and we can see what services are running where, and how saturated key metrics are.

{{< img src="process/hostxservice.png" >}}

It would be easy to pivot by ECS `#task_name` and `#task_version` and understand changes to resource utilization between updates.

{{< img src="process/tasksxversion.png" >}}

Below, we have searched for ssh processes and pivoted by `#user` to understand who is logged into which hosts.

{{< img src="process/sshusers.png" >}}

Ok, so I guess that last one is less exciting after redaction!
-->
### フィルタリングとピボット

数十万あるいは数百万のプロセスとコンテナを理解しようとすることに圧倒されてしまうかもしれません！ しかし、前のセクションで説明したタグ付けを使用することで探索はとても簡単になります。

以下の例では、9ノードのKubernetesクラスタをフィルタリングしました。コンテナのRSSとCPU使用率は、コンテナに設定されている上限値と比較したものがレポートされます。ここでは、このクラスタ内のコンテナが過剰にプロビジョニングされていることがわかります。そこからリソースの有効活用を進めるために、より厳密な上限値とビンパッキング(キャパシティの最適化)を検討することができます。

{{< img src="process/overprovisioned.png" >}}

コンテナ環境は動的なため、追跡が難しくなりがちです。ここでは、`#service` と `#host` でピボットし、システムノイズを減らすために `#namespace:default` でフィルタしています。これにより実行中のサービスについて、どこで、どのように、キーメトリクスが飽和しているかを知ることができます。

{{< img src="process/hostxservice.png" >}}

ECS `#task_name` と `#task_version` で簡単にピボットできることで、アップデート間のリソース使用率の変化を理解することができます。

{{< img src="process/tasksxversion.png" >}}

以下の例では、sshプロセスを検索してどのユーザーがどのホストにログインしているかを知るために `#user` でピボットしています。

{{< img src="process/sshusers.png" >}}

<!--
## Broad Inspection, Deep Inspection

Everyone's workflow differs.  Initially the table is displayed at the finest grain, but with the group-by field, you should start your investigation where it's appropriate for you: Grouping by Availability Zone, Host, Cluster, Pod, or wherever.

From there, you can dig down into finer grains, or inspect each group to see individual processes or containers.  In the below screenshot, you can see an investigation that started by indexing by pod and service, dug into one pod to see the containers, and then expanded a container to see the process tree inside.  In the container inspect tray, we also have some recent context for these metrics.

{{< img src="process/containerinspect.png" >}}
-->
## 広く、深く、調査する

誰もが異なるワークフローを持つものです。このモニタリングテーブルは最初は最も細かい粒度で表示がされているため、まずは"Group by tag"欄を使って、アベイラビリティゾーン、ホスト、クラスタ、ポッドなどと、必要とするグループにおける調査を開始していく必要があります。

そこから、細かい要素に掘り下げたり、個々のプロセスやコンテナを調べるために各グループを見ていきます。下のスクリーンショットでは、ポッドとサービスによるインデックス作成から始まり、特定のポッドについて掘り下げてそこにあるコンテナを見て、そして1つのコンテナを展開して内部のプロセスツリーを確認する調査を見ることができます。このコンテナ調査のトレイには、これらのメトリクスの最新のコンテキストをいくつか見ることができます。

{{< img src="process/containerinspect.png" >}}

<!--
## Real-time monitoring

While actively working with the Process and Containers page, metrics are collected at 2s resolution.  This is very important for highly volatile metrics such as CPU.  In the background, for historical context, metrics are collected at 10s resolution.
-->
## リアルタイムなモニタリング

Process / Container モニタリングのページでアクティブに調査している間は、メトリクスは2秒の解像度で収集されます。これは、CPUなど非常に揮発性の高いメトリクスにとって非常に重要です。バックグラウンドではメトリクスは10秒の解像度で収集され、ヒストリカルなコンテキストとして保存されます。

<!--
## Installation

### Standard Agent Configuration

Live Processes has been introduced in Datadog Agent version 5.16.0.  Please refer to the instructions for standard [Agent installation](https://app.datadoghq.com/account/settings#agent) for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the config file at

    /etc/dd-agent/datadog.conf

and adding the following line to the `[Main]` section

    process_agent_enabled: true

After configuration is complete, restart the Agent.  Note that for collecting Container information in the standard install, the dd-agent user will need to have permissions to access docker.sock.
-->
## インストール

### 通常のDatadogエージェントでの設定

ライブプロセスモニタリングは Datadogエージェントのバージョン5.17以上で使用できます。各プラットフォームにおける詳細は、[Datadog Agentのインストール](https://app.datadoghq.com/account/settings#agent) 画面での指示に従って下さい。

Datadog Agentがインストールされたら、次の場所にあるconfigファイルを編集してライブプロセスの収集を有効化します。

    /etc/dd-agent/datadog.conf

そして `[Main]` セクションに次の行を追加します

    process_agent_enabled: true

設定が完了したら、エージェントを再起動します。なお、この通常のDatadogエージェントでコンテナ情報を収集するためには、"dd-agent" ユーザーは docker.sock にアクセスするための許可が必要です。

<!--
### Docker container

Update to the Datadog Agent image version 5.16.0 or above:

    $ docker pull datadog/docker-dd-agent

Follow the instructions for [docker-dd-agent](https://github.com/DataDog/docker-dd-agent), passing in the following attributes, in additon to any other custom settings as appropriate:

    -v /etc/passwd:/etc/passwd:ro
    -e DD_PROCESS_AGENT_ENABLED=true
    -e HOST_PROC=/host/proc
    -e HOST_SYS=/host/sys
-->
### Dockerコンテナでの設定

Datadogエージェントイメージのバージョンを5.17以上にアップデートします:

    $ docker pull datadog/docker-dd-agent

[docker-dd-agent](https://github.com/DataDog/docker-dd-agent) に記載されている指示に従って次の属性を追加し、必要に応じて他のカスタム設定を追加します:

    -v /etc/passwd:/etc/passwd:ro
    -e DD_PROCESS_AGENT_ENABLED=true
    -e HOST_PROC=/host/proc
    -e HOST_SYS=/host/sys

<!--
### Kubernetes Daemonset

In the [dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

    env:
      - name: DD_PROCESS_AGENT_ENABLED
        value: "true"
      - name: HOST_PROC
        value: /host/proc
      - name: HOST_SYS
        value: /host/sys
    volumeMount:
      - name: passwd
        mountPath: /etc/passwd
        readOnly: true
    volume:
      - hostPath:
          path: /etc/passwd
        name: passwd

Refer to the standard [daemonset installation](http://docs.datadoghq.com/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110) and the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) information pages for further documentation.
-->
### Kubernetes Daemonset での設定

Daemonsetを構成するために使用される[dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) マニフェストに、次の環境変数とボリュームマウント、およびボリュームを追加します:

    env:
      - name: DD_PROCESS_AGENT_ENABLED
        value: "true"
      - name: HOST_PROC
        value: /host/proc
      - name: HOST_SYS
        value: /host/sys
    volumeMount:
      - name: passwd
        mountPath: /etc/passwd
        readOnly: true
    volume:
      - hostPath:
          path: /etc/passwd
        name: passwd

詳細なドキュメントについては、[daemonset installation](http://docs.datadoghq.com/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110) また、 [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) ページを参照して下さい。

<!--
### Proxy Configuration

Live Processes supports a web proxy as [configured on the Agent](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration).  For configuring a web proxy in a container, refer to the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) documentation.
-->
### プロキシ設定

ライブプロセスモニタリングは[Datadogエージェントで設定されたWebプロキシ](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration) をサポートしています。コンテナでのWebプロキシを設定する場合は、[docker-dd-agent](https://github.com/DataDog/docker-dd-agent) ドキュメントを参照して下さい。

<!--
## Notes/known issues

- Requires Linux.

- Collection of open files and current working directory is limited based on the level of privilege of the user running dd-process-agent. In the event that dd-process-agent is able to access these fields, they will be collected automatically.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.

- The Process Agent is available for the default Debian docker-dd-agent image only.  It is not included in the Alpine image.
-->
## 注釈と既知の問題

- 現状はLinuxをサポートしています。

- オープンファイルとカレントワーキングディレクトリの収集は、dd-process-agentを実行しているユーザの特権レベルに基づいて制限されます。 dd-process-agentがこれらのフィールドにアクセスできる場合、それらは自動的に収集されます。

- リアルタイム(2秒)データの収集は30分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。

- Process Agentは、デフォルトのDebian docker-dd-agentイメージでのみ利用できます。アルパインイメージには含まれていません。
