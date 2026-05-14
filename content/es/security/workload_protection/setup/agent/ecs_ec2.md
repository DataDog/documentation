---
code_lang: ecs_ec2
code_lang_weight: 70
title: Configuración de la protección de la carga de trabajo en ECS EC2
type: multi-code-lang
---

Sigue estas instrucciones para activar la Protección de la carga de trabajo.

{{< partial name="security-platform/WP-billing-note.html" >}}


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