---
last_modified: 2015/06/30
translation_status: complete
language: ja
title: Datadog-etcd Integration
integration_title: etcd
kind: integration
doclevel:
---

<!-- ### Overview
{:#int-overview}

Capture etcd metrics in Datadog to:

- Monitor the health of your etcd cluster.
- Know when host configurations may be out of sync.
- Correlate the performance of etcd with the rest of your applications. -->

### 概要
{:#int-overview}

次の目的で、etcdのメトリクスをDatadogへ送信します:

- etcdクラスターの動作状況を監視する
- ホストコンフィグレーションが同期状態から外れたことを知るため
- etcdのパフォーマンス情報を他のアプリケーションの状態と関連付けて把握する


<!-- From the open-source Agent:

* [etcd YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/etcd.yaml.example)
* [etcd checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/etcd.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス収取プログラム:

* [etcd インテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/etcd.yaml.example)
* [etcd インテグレーションのchecks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/etcd.py)


<!-- The following metrics are collected by default with the etcd integration:

    etcd.store.gets.success
    etcd.store.gets.fail
    etcd.store.sets.success
    etcd.store.sets.fail
    etcd.store.delete.success
    etcd.store.delete.fail
    etcd.store.update.success
    etcd.store.update.fail
    etcd.store.create.success
    etcd.store.create.fail
    etcd.store.compareandswap.success
    etcd.store.compareandswap.fail
    etcd.store.compareanddelete.success
    etcd.store.compareanddelete.fail
    etcd.store.expire.count
    etcd.store.watchers
    etcd.self.recv.appendrequest.count
    etcd.self.send.appendrequest.count

Plus the following metrics for leader nodes (note that these values will be undefined for single-member clusters):

    etcd.self.send.pkgrate
    etcd.self.send.bandwidthrate

And these metrics for follower nodes:

    etcd.self.recv.pkgrate
    etcd.self.recv.bandwidthrate

Furthermore, etcd metrics are tagged with `etcd_state:leader` or `etcd_state:follower`, depending on the node status, so you can easily aggregate metrics by status. -->

etcdインテグレーションがデフォルトで収集しているメトリクス:

    etcd.store.gets.success
    etcd.store.gets.fail
    etcd.store.sets.success
    etcd.store.sets.fail
    etcd.store.delete.success
    etcd.store.delete.fail
    etcd.store.update.success
    etcd.store.update.fail
    etcd.store.create.success
    etcd.store.create.fail
    etcd.store.compareandswap.success
    etcd.store.compareandswap.fail
    etcd.store.compareanddelete.success
    etcd.store.compareanddelete.fail
    etcd.store.expire.count
    etcd.store.watchers
    etcd.self.recv.appendrequest.count
    etcd.self.send.appendrequest.count

更に、リーダーノードに関しては、次のメトリクスも収集しています(注:シングルメンバークラスターでは、これらは、定義されていません。):

    etcd.self.send.pkgrate
    etcd.self.send.bandwidthrate

フォロワーノードに関しては、次のメトリクスを収集しています:

    etcd.self.recv.pkgrate
    etcd.self.recv.bandwidthrate

etcdのメトリクスは、ノードのステータスによって`etcd_state:leader`や`etcd_state:follower`のタグが付与されています。このタグによって、ノードステータスごとの集計ができるようになっています。
