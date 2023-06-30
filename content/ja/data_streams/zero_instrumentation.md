---
kind: documentation
title: コードインスツルメンテーションなしで Data Streams Monitoring をセットアップ
---

{{< callout url="#" btn_hidden="true" >}}
  このインスツルメンテーションの方法はベータ版です。組織で有効にするには、<a href="/help">サポート</a>にご連絡ください。
{{< /callout >}}

## 概要

Data Streams Monitoring は、コードをインスツルメンテーションすることなく、Kafka クライアントとサーバーのメトリクスをスタック全体にわたって視覚化するオプションをサポートしています。このオプションは、Datadog Agent と[統合サービスタグ付け][1]に依存し、インスツルメンテーションされていない Kafka サービスに関するパフォーマンスデータを提供します。

## セットアップ

### 前提条件

- Datadog Agent 6.44+ または 7.44+
- コンテナ化されたサービスは、Linux Kernel 4.14+、または CentOS、RHEL 8.0+ で稼働している
- [統合サービスタグ付け][1]で、`env` タグがデプロイに適用されている

## 有効化

サービスのデプロイ方法と Agent の構成に応じて、以下のいずれかの方法を使用して、Agent で Data Stream Monitoring を有効にします。

{{< tabs >}}
{{% tab "Helm" %}}

Datadog チャート v3.30.0+ を使用して、以下を values ファイルに追加します。

```
datadog:
  ...
  dataStreamsMonitoring:
    enabled: true
```

クラスターで Google Container-Optimized OS (COS) が動作している場合は、values ファイルに以下も追加してください。

```
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{% tab "Docker" %}}

`docker run` コマンドに以下を追加します。

```
docker run --cgroupns host \
  --pid host \
  -e DD_API_KEY="<DATADOG_API_KEY>" \
  -e DD_SYSTEM_PROBE_DATA_STREAMS_ENABLED=true \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /lib/modules:/lib/modules:ro \
  -v /usr/src:/usr/src:ro \
  -v /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build \
  -v /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers \
  -v /etc/apt:/host/etc/apt:ro \
  -v /etc/yum.repos.d:/host/etc/yum.repos.d:ro \
  -v /etc/zypp:/host/etc/zypp:ro \
  -v /etc/pki:/host/etc/pki:ro \
  -v /etc/yum/vars:/host/etc/yum/vars:ro \
  -v /etc/dnf/vars:/host/etc/dnf/vars:ro \
  -v /etc/rhsm:/host/etc/rhsm:ro \
  --security-opt apparmor:unconfined \
  --cap-add=SYS_ADMIN \
  --cap-add=SYS_RESOURCE \
  --cap-add=SYS_PTRACE \
  --cap-add=NET_ADMIN \
  --cap-add=NET_BROADCAST \
  --cap-add=NET_RAW \
  --cap-add=IPC_LOCK \
  --cap-add=CHOWN \
  gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

以下を `docker-compose.yml` ファイルに追加します。

```
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED='true'
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock:ro
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
     - /sys/kernel/debug:/sys/kernel/debug
     - /lib/modules:/lib/modules
     - /usr/src:/usr/src
     - /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build
     - /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers
     - /etc/apt:/host/etc/apt
     - /etc/yum.repos.d:/host/etc/yum.repos.d
     - /etc/zypp:/host/etc/zypp
     - /etc/pki:/host/etc/pki
     - /etc/yum/vars:/host/etc/yum/vars
     - /etc/dnf/vars:/host/etc/dnf/vars
     - /etc/rhsm:/host/etc/rhsm
    cap_add:
     - SYS_ADMIN
     - SYS_RESOURCE
     - SYS_PTRACE
     - NET_ADMIN
     - NET_BROADCAST
     - NET_RAW
     - IPC_LOCK
     - CHOWN
    security_opt:
     - apparmor:unconfined
```

{{% /tab %}}
{{% tab "コンフィギュレーションファイル (Linux)" %}}

Helm Charts や環境変数を使用しない場合は、`system-probe.yaml` ファイルに以下を設定します。

```
data_streams_config:
  enabled: true
```

{{% /tab %}}
{{% tab "環境変数 (Linux)" %}}

Docker や ECS のインストールでよくあるように、`system-probe` を環境変数で構成する場合、以下の環境変数を `system-probe` に渡します。

```
DD_SYSTEM_PROBE_DATA_STREAMS_ENABLED=true
```

{{% /tab %}}
{{% tab "ECS" %}}

ECS の場合、以下の JSON タスク定義で DSM サポートとシステムプローブを有効にします。タスク定義を[デーモンサービス][1]としてデプロイします。

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:7",
      "cpu": 500,
      "memory": 1024,
      "essential": true,
      "mountPoints": [
        ...
        {
          "containerPath": "/sys/kernel/debug",
          "sourceVolume": "sys_kernel_debug"
        },
        {
          "containerPath": "/host/proc",
          "sourceVolume": "proc"
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "var_run_docker_sock"
        },
        {
          "containerPath": "/host/sys/fs/cgroup",
          "sourceVolume": "sys_fs_cgroup"
        },
        {
          "readOnly": true,
          "containerPath": "/var/lib/docker/containers",
          "sourceVolume": "var_lib_docker_containers"
        },
        {
          "containerPath": "/lib/modules",
          "sourceVolume": "lib_modules"
        },
        {
          "containerPath": "/usr/src",
          "sourceVolume": "usr_src"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/build",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_build"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/kernel-headers",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_kernel_headers"
        },
        {
          "containerPath": "/host/etc/apt",
          "sourceVolume": "etc_apt"
        },
        {
          "containerPath": "/host/etc/yum.repos.d",
          "sourceVolume": "etc_yum_repos_d"
        },
        {
          "containerPath": "/host/etc/zypp",
          "sourceVolume": "etc_zypp"
        },
        {
          "containerPath": "/host/etc/pki",
          "sourceVolume": "etc_pki"
        },
        {
          "containerPath": "/host/etc/yum/vars",
          "sourceVolume": "etc_yum_vars"
        },
        {
          "containerPath": "/host/etc/dnf/vars",
          "sourceVolume": "etc_dnf_vars"
        },
        {
          "containerPath": "/host/etc/rhsm",
          "sourceVolume": "etc_rhsm"
        }
      ],
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_DATADOG_API_KEY>"
        },
        ...
        {
          "name": "DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED",
          "value": "true"
        }
      ],
      "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
          ]
        }
      }
    }
  ],
  "requiresCompatibilities": [
    "EC2"
  ],
  "volumes": [
    ...
    {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "sys_kernel_debug"
    },
    {
      "host": {
        "sourcePath": "/proc/"
      },
      "name": "proc"
    },
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "var_run_docker_sock"
    },
    {
      "host": {
        "sourcePath": "/sys/fs/cgroup/"
      },
      "name": "sys_fs_cgroup"
    },
    {
      "host": {
        "sourcePath": "/var/lib/docker/containers/"
      },
      "name": "var_lib_docker_containers"
    },
    {
      "host": {
        "sourcePath": "/lib/modules"
      },
      "name": "lib_modules"
    },
    {
      "host": {
        "sourcePath": "/usr/src"
      },
      "name": "usr_src"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/build"
      },
      "name": "var_tmp_datadog_agent_system_probe_build"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/kernel-headers"
      },
      "name": "var_tmp_datadog_agent_system_probe_kernel_headers"
    },
    {
      "host": {
        "sourcePath": "/etc/apt"
      },
      "name": "etc_apt"
    },
    {
      "host": {
        "sourcePath": "/etc/yum.repos.d"
      },
      "name": "etc_yum_repos_d"
    },
    {
      "host": {
        "sourcePath": "/etc/zypp"
      },
      "name": "etc_zypp"
    },
    {
      "host": {
        "sourcePath": "/etc/pki"
      },
      "name": "etc_pki"
    },
    {
      "host": {
        "sourcePath": "/etc/yum/vars"
      },
      "name": "etc_yum_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/dnf/vars"
      },
      "name": "etc_dnf_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/rhsm"
      },
      "name": "etc_rhsm"
    }
  ],
  "family": "datadog-agent-task"
}
```

OS のイメージが Ubuntu や Debian の場合は、`environment` の後に以下を追加してください。

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

サービスでロードバランサーを使用している場合、Data Streams Monitoring がクラウド管理されたエンティティを検出できるように、追加のクラウドインテグレーションを有効にしてください。AWS Load Balancer で視覚化するために、[AWS インテグレーション][2]をインストールします。また、ENI と EC2 のメトリクス収集も有効にする必要があります。

次に、各ロードバランサーに以下のタグを追加します。
```conf
ENV=<env>
SERVICE=<service>
```

[1]: /ja/containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
[2]: /ja/integrations/amazon_web_services/
{{% /tab %}}
{{< /tabs >}}

[1]: /ja/getting_started/tagging/unified_service_tagging