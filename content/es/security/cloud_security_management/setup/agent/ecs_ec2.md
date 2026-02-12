---
aliases:
- /es/security/cloud_security_management/setup/csm_cloud_workload_security/agent/ecs_ec2
- /es/security/cloud_security_management/setup/csm_pro/agent/ecs_ec2/
- /es/security/cloud_security_management/setup/csm_enterprise/agent/ecs_ec2/
code_lang: ecs_ec2
code_lang_weight: 70
title: Configuración de Cloud Security en ECS EC2
type: multi-code-lang
---

Sigue las siguientes instrucciones para activar Misconfigurations y Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}


## Requisitos previos

- Datadog Agent versión `7.46` o posterior.

## Instalación

Añade las siguientes variables de entorno a tu definición de contenedor de `datadog-agent`:

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
          "name": "DD_SYSTEM_PROBE_ENABLED",
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
  "requiresCompatibilities": [
    "EC2"
  ]
}
```

Si el Agent no puede extraer la SBOM de las imágenes de contenedor, aumenta la memoria del Agent en la definición del contenedor:

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

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/threats
[3]: /es/security/cloud_security_management/vulnerabilities
[4]: /es/security/cloud_security_management/setup#supported-deployment-types-and-features