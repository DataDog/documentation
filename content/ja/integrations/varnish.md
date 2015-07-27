---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-Varnish Integration
integration_title: Varnish
kind: integration
doclevel: basic
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/ja/integrations/"
---

<!-- ### Overview
{:#int-overview}

Connect Varnish to Datadog in order to:

- Visualize your cache performance in real-time.
- Correlate the performance of Varnish with the rest of your applications. -->

### 概要
{:#int-overview}

次の目的で、VarnishのメトリクスをDatadogに送信します:

- キャッシュシステムのパフォーマンスを可視化します
- Varnishのパフォーマンス情報と他のアプリケーションの情報を連携し状況を把握する


<!-- From the open-source Agent:

* [Varnish YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/varnish.yaml.example)
* [Varnish checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/varnish.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [Varnishインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/varnish.yaml.example)
* [Varnishインテグレーション  checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/varnish.py)
*

<!-- The following metrics are collected by default with the Varnish integration:

    varnish.accept_fail
    varnish.backend_busy
    varnish.backend_conn
    varnish.backend_fail
    varnish.backend_recycle
    varnish.backend_req
    varnish.backend_reuse
    varnish.backend_toolate
    varnish.backend_unhealthy
    varnish.backend_unused
    varnish.cache_hit
    varnish.cache_hitpass
    varnish.cache_miss
    varnish.client_conn
    varnish.client_drop
    varnish.client_drop_late
    varnish.client_req
    varnish.esi_errors
    varnish.esi_parse
    varnish.fetch_bad
    varnish.fetch_chunked
    varnish.fetch_close
    varnish.fetch_eof
    varnish.fetch_failed
    varnish.fetch_head
    varnish.fetch_length
    varnish.fetch_oldhttp
    varnish.fetch_zero
    varnish.hcb_insert
    varnish.hcb_lock
    varnish.hcb_nolock
    varnish.losthdr
    varnish.n_backend
    varnish.n_deathrow
    varnish.n_expired
    varnish.n_lru_moved
    varnish.n_lru_nuked
    varnish.n_lru_saved
    varnish.n_object
    varnish.n_objectcore
    varnish.n_objecthead
    varnish.n_objoverflow
    varnish.n_objsendfile
    varnish.n_objwrite
    varnish.n_purge
    varnish.n_purge_add
    varnish.n_purge_dups
    varnish.n_purge_obj_test
    varnish.n_purge_re_test
    varnish.n_purge_retire
    varnish.n_sess
    varnish.n_sess_mem
    varnish.n_smf
    varnish.n_smf_frag
    varnish.n_smf_large
    varnish.n_vampireobject
    varnish.n_vbe_conn
    varnish.n_vcl
    varnish.n_vcl_avail
    varnish.n_vcl_discard
    varnish.n_wrk
    varnish.n_wrk_create
    varnish.n_wrk_drop
    varnish.n_wrk_failed
    varnish.n_wrk_max
    varnish.n_wrk_overflow
    varnish.n_wrk_queue
    varnish.s_bodybytes
    varnish.s_fetch
    varnish.s_hdrbytes
    varnish.s_pass
    varnish.s_pipe
    varnish.s_req
    varnish.s_sess
    varnish.sess_closed
    varnish.sess_herd
    varnish.sess_linger
    varnish.sess_pipeline
    varnish.sess_readahead
    varnish.shm_cont
    varnish.shm_cycles
    varnish.shm_flushes
    varnish.shm_records
    varnish.shm_writes
    varnish.sm_balloc
    varnish.sm_bfree
    varnish.sm_nobj
    varnish.sm_nreq
    varnish.sma_balloc
    varnish.sma_bfree
    varnish.sma_nbytes
    varnish.sma_nobj
    varnish.sma_nreq
    varnish.sms_balloc
    varnish.sms_bfree
    varnish.sms_nbytes
    varnish.sms_nobj
    varnish.sms_nreq
    varnish.uptime -->


Varnishインテグレーションがデフォルトで取得しているメトリクス:

    varnish.accept_fail
    varnish.backend_busy
    varnish.backend_conn
    varnish.backend_fail
    varnish.backend_recycle
    varnish.backend_req
    varnish.backend_reuse
    varnish.backend_toolate
    varnish.backend_unhealthy
    varnish.backend_unused
    varnish.cache_hit
    varnish.cache_hitpass
    varnish.cache_miss
    varnish.client_conn
    varnish.client_drop
    varnish.client_drop_late
    varnish.client_req
    varnish.esi_errors
    varnish.esi_parse
    varnish.fetch_bad
    varnish.fetch_chunked
    varnish.fetch_close
    varnish.fetch_eof
    varnish.fetch_failed
    varnish.fetch_head
    varnish.fetch_length
    varnish.fetch_oldhttp
    varnish.fetch_zero
    varnish.hcb_insert
    varnish.hcb_lock
    varnish.hcb_nolock
    varnish.losthdr
    varnish.n_backend
    varnish.n_deathrow
    varnish.n_expired
    varnish.n_lru_moved
    varnish.n_lru_nuked
    varnish.n_lru_saved
    varnish.n_object
    varnish.n_objectcore
    varnish.n_objecthead
    varnish.n_objoverflow
    varnish.n_objsendfile
    varnish.n_objwrite
    varnish.n_purge
    varnish.n_purge_add
    varnish.n_purge_dups
    varnish.n_purge_obj_test
    varnish.n_purge_re_test
    varnish.n_purge_retire
    varnish.n_sess
    varnish.n_sess_mem
    varnish.n_smf
    varnish.n_smf_frag
    varnish.n_smf_large
    varnish.n_vampireobject
    varnish.n_vbe_conn
    varnish.n_vcl
    varnish.n_vcl_avail
    varnish.n_vcl_discard
    varnish.n_wrk
    varnish.n_wrk_create
    varnish.n_wrk_drop
    varnish.n_wrk_failed
    varnish.n_wrk_max
    varnish.n_wrk_overflow
    varnish.n_wrk_queue
    varnish.s_bodybytes
    varnish.s_fetch
    varnish.s_hdrbytes
    varnish.s_pass
    varnish.s_pipe
    varnish.s_req
    varnish.s_sess
    varnish.sess_closed
    varnish.sess_herd
    varnish.sess_linger
    varnish.sess_pipeline
    varnish.sess_readahead
    varnish.shm_cont
    varnish.shm_cycles
    varnish.shm_flushes
    varnish.shm_records
    varnish.shm_writes
    varnish.sm_balloc
    varnish.sm_bfree
    varnish.sm_nobj
    varnish.sm_nreq
    varnish.sma_balloc
    varnish.sma_bfree
    varnish.sma_nbytes
    varnish.sma_nobj
    varnish.sma_nreq
    varnish.sms_balloc
    varnish.sms_bfree
    varnish.sms_nbytes
    varnish.sms_nobj
    varnish.sms_nreq
    varnish.uptime
