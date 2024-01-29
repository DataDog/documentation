---
title: Enabling CSM Cloud Workload Security on ECS EC2
kind: documentation
code_lang: ecs_ec2
type: multi-code-lang
code_lang_weight: 70 # a number that represents relative weight. 
---

To enable CSM Threats on your [Amazon ECS EC2 instances][1], add the following environment variables to your `datadog-agent` container definition:

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

[1]: /containers/amazon_ecs/?tab=awscli#setup