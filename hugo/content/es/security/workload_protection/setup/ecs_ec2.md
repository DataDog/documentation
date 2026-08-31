---
aliases:
- /es/security/workload_protection/setup/agent/ecs_ec2
description: Habilite Workload Protection en Amazon ECS con la opción de cómputo EC2.
disable_toc: false
title: Configuración de Workload Protection en ECS
---
Utilice las siguientes instrucciones para habilitar Workload Protection.

<div class="alert alert-info">Para implementar Workload Protection en ECS configurado con la opción de cómputo Fargate, consulte <a href="/security/workload_protection/setup/fargate/">la página de implementación de Fargate</a>.</div>

{{< partial name="security-platform/WP-billing-note.html" >}}

## Requisitos previos {#prerequisites}

- Datadog Agent versión `7.46` o posterior.
- Esta página cubre la opción de cómputo Amazon EC2 para ECS.

## Instalación {#installation}

Agregue las siguientes variables de entorno a la definición de su contenedor `datadog-agent`:

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

Si el Agent no logra extraer el SBOM de la imagen del contenedor, aumente la memoria del Agent en la definición del contenedor:

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