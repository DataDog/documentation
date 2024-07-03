---
aliases:
- /ja/agent/docker/data_collected
title: Docker Data Collected
---

## Docker インテグレーション

### メトリクス

Docker コンテナにデプロイされた Agent が収集するメトリクス:

{{< get-metrics-from-git "docker_daemon" >}}

### イベント

Docker Agent は以下のイベントを生成します。

- Delete Image
- Die
- Error
- Fail
- Kill
- Out of memory (oom)
- Pause
- Restart container
- Restart Daemon
- Update

### サービスチェック

{{< get-service-checks-from-git "docker" >}}

**注**: `docker.exit` を使用するには、Docker `conf.yaml` ファイルに `collect_exit_codes: true` を追加し、Agent を再起動します。

## コンテナインテグレーション

### メトリクス
{{< get-metrics-from-git "コンテナ" >}}

## Containerd インテグレーション

### メトリクス

{{< get-metrics-from-git "containerd" >}}

### イベント

containerd チェックは、イベントを収集できます。`filters` を使用して関連イベントを選択します。詳細については、サンプル [`containerd.d/conf.yaml`][1] を参照してください。

### サービスチェック

{{< get-service-checks-from-git "containerd" >}}

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default