---
aliases:
- /ja/agent/docker/data_collected
kind: documentation
title: Docker の収集データ
---

## メトリクス

Docker コンテナにデプロイされた Agent が収集するメトリクス:

{{< get-metrics-from-git "docker_daemon" >}}

## イベント

Docker Agent は以下のイベントを生成します。

- Delete Image
- Die
- エラー
- Fail
- Kill
- Out of memory (oom)
- Pause
- Restart container
- Restart Daemon
- Update

## サービスチェック

{{< get-service-checks-from-git "docker" >}}