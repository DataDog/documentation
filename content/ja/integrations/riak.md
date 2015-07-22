---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-Riak Integration
integration_title: Riak
doclevel: basic
kind: integration
---

<!-- ### Overview
{:#int-overview}

Connect Riak to Datadog in order to:

- Visualize Riak performance and utilization.
- Correlate the performance of Riak with the rest of your applications. -->

### 概要
{:#int-overview}

次の目的の為に、RiakのメトリクスをDatadogに送信します:

- Riakのパフォーマンスの可視化する
- Riakのパフォーマンス情報と他のアプリケーションの情報を連携し状況を把握する


<!-- From the open-source Agent:

* [Riak YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/riak.yaml.example)
* [Riak checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/riak.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [Riakインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/riak.yaml.example)
* [Riakインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/riak.py)


<!-- The following metrics are collected by default with the Riak integration:

    riak.memory_atom
    riak.memory_atom_used
    riak.memory_binary
    riak.memory_code
    riak.memory_ets
    riak.memory_processes
    riak.memory_processes_used
    riak.memory_total
    riak.node_get_fsm_objsize
    riak.node_get_fsm_siblings
    riak.node_get_fsm_time
    riak.node_gets
    riak.node_put_fsm_time
    riak.node_puts
    riak.pbc_active
    riak.pbc_connects
    riak.read_repairs
    riak.vnode_gets
    riak.vnode_index_deletes
    riak.vnode_index_reads
    riak.vnode_index_writes
    riak.vnode_puts -->

Raik インテグレーションがデフォルトで取得しているメトリクス:

    riak.memory_atom
    riak.memory_atom_used
    riak.memory_binary
    riak.memory_code
    riak.memory_ets
    riak.memory_processes
    riak.memory_processes_used
    riak.memory_total
    riak.node_get_fsm_objsize
    riak.node_get_fsm_siblings
    riak.node_get_fsm_time
    riak.node_gets
    riak.node_put_fsm_time
    riak.node_puts
    riak.pbc_active
    riak.pbc_connects
    riak.read_repairs
    riak.vnode_gets
    riak.vnode_index_deletes
    riak.vnode_index_reads
    riak.vnode_index_writes
    riak.vnode_puts
