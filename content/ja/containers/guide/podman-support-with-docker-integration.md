---
aliases:
- /ja/agent/guide/podman-support-with-docker-integration
title: Podman コンテナランタイムとの Docker インテグレーションの使用
---

Podman は、Linux システムで OCI コンテナを開発、管理、実行するためのデーモンレスコンテナエンジンです。詳細については、[https://podman.io/][1] をご覧ください。

Podman は、Docker と互換性のある CLI インターフェイスとソケットを提供する、Docker の代替製品です。この特異性により、Podman コンテナで Datadog Agent Docker インテグレーションを使用できます。

## 要件

* Podman バージョン >= 3.2.0
* [通信ソケット][2]を公開するように構成された Podman。
* Datadog Agent バージョン >= 7.30.0

## podman コンテナとしての Agent のデプロイ

Agent を Podman コンテナとしてデプロイするために実行するコマンドは、[Docker][3] で使用されるコマンドと似ています。

```
$ podman run -d --name dd-agent \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    --privileged \
    gcr.io/datadoghq/agent:latest
```

次のとおり 2 つの重要な違いがあります。
* `-v /run/podman/podman.sock:/run/podman/podman.sock:ro` を使用して、Docker ソケットの代わりに Podman ソケットをマウントします。
* `-e DOCKER_HOST=unix:///run/podman/podman.sock` を使用して、Podman ソケットとの Agent 通信を構成します。

Podman をデーモンレスモードで動かす場合、これらのオプションの代わりに、Podman のデータベースがあるディレクトリをマウントする必要があります、デフォルトでは `/var/lib/containers` になります。
* `-v /var/lib/containers/:/var/lib/containers/`.

## 既知の制限

* Podman ソケットのアクティブ化は、セットアップに応じてオプションにすることができます。有効にする必要がある場合があります。


[1]: https://podman.io/
[2]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/index
[3]: /ja/agent/docker