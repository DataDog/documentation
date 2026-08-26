---
aliases:
- /ja/security/workload_protection/setup/agent/ecs_ec2
description: EC2コンピューティングオプションを使用して、Amazon ECSでWorkload Protectionを有効にします。
disable_toc: false
title: ECSでのWorkload Protectionのセットアップ
---
Workload Protectionを有効にするには、以下の手順に従ってください。

<div class="alert alert-info">Fargateコンピューティングオプションで構成されたECSにWorkload Protectionをデプロイするには、<a href="/security/workload_protection/setup/fargate/">Fargateデプロイメントページ</a>を参照してください。</div>

{{< partial name="security-platform/WP-billing-note.html" >}}

## 前提条件 {#prerequisites}

- Datadog Agentバージョン`7.46`以降。
- このページでは、ECSのAmazon EC2コンピューティングオプションについて説明します。

## インストール {#installation}

`datadog-agent`コンテナ定義に以下の環境変数を追加します。

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
        ...
        "mountPoints": [
          {
            "sourceVolume": "docker_sock",
            "containerPath": "/var/run/docker.sock",
            "readOnly": true
          },
          {
            "sourceVolume": "proc",
            "containerPath": "/host/proc/",
            "readOnly": true
          },
          {
            "sourceVolume": "cgroup",
            "containerPath": "/host/sys/fs/cgroup",
            "readOnly": true
          },
          {
            "sourceVolume": "passwd",
            "containerPath": "/etc/passwd",
            "readOnly": true
          },
          {
            "sourceVolume": "os_release",
            "containerPath": "/host/etc/os-release",
            "readOnly": true
          },
          {
            "sourceVolume": "kernel_debug",
            "containerPath": "/sys/kernel/debug"
          },
          {
            "sourceVolume": "root",
            "containerPath": "/host/root",
            "readOnly": true
          }
        ],
        ...
        "environment": [
          ...
          {
            "name": "DD_COMPLIANCE_CONFIG_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_SYSTEM_PROBE_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_SBOM_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_CONTAINER_IMAGE_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_SBOM_HOST_ENABLED",
            "value": "true"
          }
        ]
    }
  ],
  ...
  "volumes": [
    {
      "name": "docker_sock",
      "host": {
        "sourcePath": "/var/run/docker.sock"
      }
    },
    {
      "name": "proc",
      "host": {
        "sourcePath": "/proc/"
      }
    },
    {
      "name": "cgroup",
      "host": {
        "sourcePath": "/sys/fs/cgroup/"
      }
    },
    {
      "name": "passwd",
      "host": {
        "sourcePath": "/etc/passwd"
      }
    },
    {
      "name": "os_release",
      "host": {
        "sourcePath": "/etc/os-release"
      }
    },
    {
      "name": "kernel_debug",
      "host": {
        "sourcePath": "/sys/kernel/debug"
      }
    },
    {
      "name": "root",
      "host": {
        "sourcePath": "/"
      }
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
  },
  "requiresCompatibilities": [
    "EC2"
  ]
}
```

AgentがコンテナイメージからSBOMを抽出できない場合は、コンテナ定義でAgentのメモリを増やしてください。

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "memory": 256,
            ...
        }
     ]
    ...
}
```