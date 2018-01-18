---
last_modified: 2017/09/29
translation_status: completed
autotocdepth: 2
language: ja
title: ライブコンテナ モニタリング
kind: documentation
customnav: infrastructurenav
---

<!--
## Introduction

Datadog Live Containers allows for real-time visibility of all of the containers across your environment.  Taking inspiration from bedrock tools like `htop` and `ctop`, this centralized view, combined with existing tagging capabilities, allows you to understand what is going on at any level of your system and drill all the way down into the most fine details.

{{< img src="process/LiveContainersWithSummaries.png" >}}

## Searching, Filtering, and Pivoting
-->
## はじめに

Datadog ライブコンテナ モニタリング を使用すると、システムにおけるすべてのコンテナをリアルタイムで視覚化することができます。`htop`や`ctop`のような基盤ツールからインスピレーションを得たこの集中ビューは、Datadogで活用されてきたタグの能力と組み合わせることでシステムのあらゆるレベルで何が起こっているのかを理解し、最も深い詳細に至るまで掘り下げることができます。

{{< img src="infrastructure/livecontainers/LiveContainersWithSummaries.png" >}}

## 検索, フィルタリング, そしてピボット

<!--
### String Search

Containers are by their nature extremely high cardinality objects.  Our flexible string search will match substrings in the container name, ID, or image fields.

-->
### 文字列の検索

コンテナはその性質上、非常にカーディナリティの高いオブジェクトです。 Datadogの柔軟な文字列検索は、コンテナ名、ID、イメージフィールドの部分文字列とマッチするので、望むビューを正確に得ることができます。

<!--
### Tagging

Containers are tagged with all existing host-level tags.  We also tag with metadata associated with individual containers.

All containers are tagged by `image_name`, and additionally, we include integrations with popular orchestrators, such as ECS and Kubernetes, which provide further container-level tags.  We also decorate each container with Docker, ECS, or Kubernetes icons so you can tell which are being orchestrated at a glance.

ECS Containers are tagged by `task_name`, `task_version`, and `ecs_cluster`

Kubernetes Containers are tagged by `pod_name`, `kube_pod_ip`, `kube_service`, `kube_namespace`, `kube_replica_set`, `kube_daemon_set`, `kube_job`, `kube_deployment`, and `kube_cluster`.
-->
### タグ付け

コンテナには、既存のすべてのホストレベルのタグがタグ付けされています。さらに個々のコンテナに関連付けられたメタデータもタグ付けします。

すべてのコンテナは `image_name` によってタグ付けされます。さらに、コンテナレベルのタグを追加で提供できるECSやKubernetesといったオーケストレータとのインテグレーションも実装されています。Docker、ECS、あるいはKubernetesの各アイコンを使用して各コンテナが装飾されるので、どのオーケストレーターによって管理されているものかひと目で知ることができます。

ECSコンテナは、`task_name`, `task_version`, `ecs_cluster` タグが付けられ、

Kubernetesコンテナには、`pod_name`, `kube_pod_ip`, `kube_service`, `kube_namespace`, `kube_replica_set`, `kube_daemon_set`, `kube_job`, `kube_deployment`, `kube_cluster`.　タグが付けられます。

<!--
### Filtering and Pivoting

Making sense of thousands or tens of thousands of containers can seem overwhelming!  Using tagging, described in the previous section, makes navigation easy.

In the below, we have filtered down to a Kubernetes cluster of 9 nodes.  RSS and CPU utilization on containers is reported compared to the provisioned limits on the containers, when they exist.  Here, we see that the containers in this cluster are way overprovisioned, and that we could use tighter limits and bin packing to achieve better utilization of resources.

{{< img src="process/overprovisioned.png" >}}

Container environments are dynamic and can be hard to follow.  Here, we pivot by `kube_service` and `host`, and to reduce system noise, filter to `kube_namespace:default`, and we can see what services are running where, and how saturated key metrics are.

{{< img src="process/hostxservice.png" >}}

It would be easy to pivot by ECS `ecs_task_name` and `ecs_task_version` and understand changes to resource utilization between updates.

{{< img src="process/tasksxversion.png" >}}
-->
### フィルタリングとピボット

数千あるいは数万のコンテナを理解しようとすることに圧倒されてしまうかもしれません！ しかし、前のセクションで説明したタグ付けを使用することで探索はとても簡単になります。

以下の例では、9ノードのKubernetesクラスタをフィルタリングしました。コンテナのRSSとCPU使用率は、コンテナに割当てられてた上限値と比較したものがレポートされます。ここでは、このクラスタ内のコンテナが過剰にプロビジョニングされていることがわかります。そこからリソースの有効活用を進めるために、より厳密な上限値とビンパッキング(キャパシティの最適化)を検討することができます。

{{< img src="infrastructure/livecontainers/overprovisioned.png" >}}

コンテナ環境は動的なため、追跡が難しくなりがちです。ここでは、`kube_service` と `host` でピボットし、システムノイズを減らすために `kube_namespace:default` でフィルタしています。これにより実行中のサービスについて、どこで、どのように、キーメトリクスが飽和しているかを知ることができます。

{{< img src="infrastructure/livecontainers/hostxservice.png" >}}

ECSの `ecs_task_name` と `ecs_task_version` で簡単にピボットできることで、アップデート間のリソース使用率の変化を理解することができます。

{{< img src="infrastructure/livecontainers/tasksxversion.png" >}}

<!--
## Real-time monitoring

While actively working with the Containers page, metrics are collected at 2s resolution.  This is very important for highly volatile metrics such as CPU.  In the background, for historical context, metrics are collected at 10s resolution.
-->
## リアルタイムなモニタリング

Containers モニタリングのページでアクティブに調査している間は、メトリクスは2秒の解像度で収集されます。これは、CPUなど非常に揮発性の高いメトリクスにとって非常に重要です。バックグラウンドではメトリクスは10秒の解像度で収集され、ヒストリカルなコンテキストとして保存されます。

<!--
## Installation

Live Containers has been introduced in Datadog Agent version 5.17.2.  After updating to a recent version of the Agent, no other configuration is necessary.

Note that for collecting Container information in the standard install rather than with the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent), the dd-agent user will need to have permissions to access docker.sock.

-->
## インストール

ライブコンテナ モニタリングは Datadogエージェントのバージョン5.17.2 以上で使用できます。最新のエージェントへ更新した後は、他の設定は必要ありません。

[docker-dd-agent](https://github.com/DataDog/docker-dd-agent) ではなく、スタンダードなDatadog Agentを使用してコンテナの情報を収集する場合は、"dd-agent"ユーザーが docker.sock にアクセス可能である必要があります。

<!--
### Proxy Configuration

Live Containers supports a web proxy as [configured on the Agent](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration).  For configuring a web proxy in a container, refer to the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) documentation.
-->
### プロキシ設定

ライブコンテナ モニタリングは [Datadogエージェントで設定されたWebプロキシ](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration) をサポートしています。コンテナでのWebプロキシを設定する場合は、[docker-dd-agent](https://github.com/DataDog/docker-dd-agent) ドキュメントを参照して下さい。

<!--
## Notes/known issues

- This feature does not support Windows containers at this time.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.

- Live Containers is available for the default Debian docker-dd-agent image only.  It is not included in the Alpine image.

- RBAC settings can restrict Kubernetes metadata collection.  Please refer to the [RBAC entites for the Datadog Agent]( https://gist.github.com/hkaj/404385619e5908f16ea3134218648237).
-->
## 注釈と既知の問題

- 現在は、ライブコンテナ モニタリングはWindowsコンテナをサポートしていません。

- リアルタイム(2秒)データの収集は30分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。

- ライブコンテナ モニタリングは、デフォルトのDebian docker-dd-agentイメージでのみ利用できます。アルパインイメージには含まれていません。

- RBACの設定によって、Kubernetesのメタデータ取得を制限できます。詳しくは、[RBAC entites for the Datadog Agent](https://gist.github.com/hkaj/404385619e5908f16ea3134218648237) を参照してください。
