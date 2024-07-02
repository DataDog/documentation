---
title: Using the Docker integration with Podman container runtime
aliases:
 - /agent/guide/podman-support-with-docker-integration
---

Podman は、Linux システムで OCI コンテナを開発、管理、実行するためのデーモンレスコンテナエンジンです。詳細については、[https://podman.io/][1] をご覧ください。

Podman では、ルートレスコンテナやルートフルコンテナをデプロイできます。ルートレスコンテナは管理者権限を持たないユーザーでも実行でき、ルートフルコンテナは root 権限で実行するコンテナです。
ルートレスコンテナが提供する主な利点は、コンテナが侵害されたときに潜在的な攻撃者がホストの root 権限を取得できないことです。
Datadog Agent は、ルートレスコンテナとルートフルコンテナの両方で動作します。

## 要件

* Podman バージョン >= 3.2.0
* Datadog Agent バージョン >= 7.30.0

## Podman ルートレスコンテナとしての Agent デプロイ

Agent をルートレス Podman コンテナとしてデプロイするために実行するコマンドは、[Docker][2] で使用されるコマンドと似ています。

主な違いは、Agent はランタイムソケットにアクセスできないため、必要なコンテナ情報を抽出するために Podman DBに依存することです。そのため、Docker ソケットをマウントして `DOCKER_HOST` を設定する代わりに、Podman DB をマウントする必要があります (以下のコマンドでは `<PODMAN_DB_PATH>`)。
システムによっては Podman DB のパスは `$HOME/.local/share/containers/storage/libpod/bolt_state.db` ですが、お使いのシステムでは違うかもしれません。以下のコマンドで `<PODMAN_DB_PATH>` を適宜設定してください。

```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v <PODMAN_DB_PATH>:/var/lib/containers/storage/libpod/bolt_state.db:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    gcr.io/datadoghq/agent:latest
```

Agent は、Podman コマンドを実行した非管理ユーザーが管理するコンテナをすべて検出し、すべてのコンテナに対して `container.*` メトリクスを発行する必要があります。

## Podman ルートフルコンテナとしての Agent デプロイ

ルートフルコンテナを実行する場合、上記のルートレスコンテナの例のように Podman DB に依存するか、Podman ソケットを使うかの 2 つの選択肢があります。

### Podman DB の使用

DB を使って実行するコマンドは上述のものと同一ですが、DB のパスはユーザーごとに異なることに注意してください (root を含む)。root の場合、通常は `/var/lib/containers/storage/libpod/bolt_state.db` ですが、お使いのシステムでは異なるかもしれませんので、`<PODMAN_DB_PATH>` を適宜設定してください。

### Podman ソケットの使用

Podman ソケットは Docker ソケットと互換性があります。そのため、この場合、Datadog Agent は Docker 上で動作しているかのようにすべてを実行します。これは、例えば `docker.*` メトリクスを発行することを意味します。

Podman ソケットに依存する Agent をデプロイするには、root で以下を実行します。
```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    gcr.io/datadoghq/agent:latest
```

どちらの場合も、Agent は root が管理するすべてのコンテナを検出し、すべてのコンテナに対して `container.*` メトリクスを出力する必要があります。

[1]: https://podman.io/
[2]: /agent/docker
