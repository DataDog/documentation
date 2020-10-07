---
title: Docker の収集データ
kind: documentation
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

- **docker.service_up**:
    Agent が Docker デーモンからコンテナのリストを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

- **docker.container_health**:
  このサービスチェックは、Agent v5 でのみ使用できます。コンテナが正常でない場合は `CRITICAL`、健全性が不明な場合は `UNKNOWN`、それ以外の場合は `OK` を返します。

- **docker.exit**:
    コンテナが 0 以外の終了コードで終了した場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

