---
aliases:
- /fr/security_platform/cloud_workload_security/getting_started
- /fr/security/cloud_workload_security/getting_started
description: Suivez ces instructions de configuration et d'installation pour commencer
  à utiliser Cloud Workload Security.
further_reading:
- link: /getting_started/cloud_security_management
  tag: Documentation
  text: Débuter avec Cloud Security Management
- link: https://www.datadoghq.com/blog/datadog-runtime-security/
  tag: Blog
  text: En savoir plus sur la solution Cloud Runtime Security de Datadog
- link: https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/
  tag: Blog
  text: Comment détecter les menaces de sécurité à l'encontre des processus Linux
    de vos systèmes
- link: https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/
  tag: Blog
  text: Présentation de la vulnérabilité PwnKit, méthodes de détection et remédiation
- link: https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/
  tag: Blog
  text: Présentation de la vulnérabilité Dirty Pipe, méthodes de détection et remédiation
- link: https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/
  tag: Blog
  text: Utiliser la vulnérabilité Dirty Pipe pour sortir de conteneurs
- link: https://www.datadoghq.com/blog/dns-based-threat-detection/
  tag: Blog
  text: Intercepter les attaques au niveau de la couche réseau grâce à la détection
    des menaces basées sur le DNS
kind: documentation
title: Configurer Cloud Workload Security
---

## Présentation

Dans le cadre de la solution Cloud Workload Security, l'Agent Datadog procède à quatre types de surveillance :

1. **Surveillance de l'exécution des processus** : permet d'observer l'exécution des processus afin de détecter en temps réel des activités malveillantes sur les hosts et conteneurs.
2. **Surveillance de l'intégrité des fichiers** : permet d'observer en temps en réel les modifications apportées à certains fichiers et répertoires essentiels sur des hosts et conteneurs.
3. **Surveillance de l'activité DNS** : permet d'observer le trafic réseau afin de détecter en temps réel des activités malveillantes sur les hosts et conteneurs.
4. **Surveillance de l'activité du kernel** : permet d'observer en temps réel les attaques au niveau du kernel, comme les hijacking de processus, le breakout de conteneurs, etc.

## Prérequis

* Agent Datadog 7.27.0+
* La collecte de données étant basée sur eBPF, votre plateforme doit utiliser la version 4.15.0 du kernel Linux au minimum, ou les fonctionnalités eBPF doivent avoir été backportées. CWS prend en charge les distributions Linux suivantes :
  * Ubuntu 18.04+
  * Debian 10+
  * Amazon Linux 2
  * Fedora 26 et versions ultérieures
  * SUSE 15+
  * CentOS/RHEL 7.6+
  * Les builds de kernel personnalisés ne sont pas pris en charge.
* Pour vérifier la compatibilité d'un plug-in réseau Kubernetes personnalisé, comme Cilium ou Calico, consultez la [page relative au dépannage][3].

## Installation

{{< tabs >}}
{{% tab "Kubernetes" %}}

1. Si vous ne l'avez pas déjà fait, installez l'[Agent Datadog][1] (version 7.27+).

2. Ajoutez ce qui suit à la section `datadog` de votre fichier `values.yaml` :

    ```yaml
    # values.yaml file
    datadog:

    # Add this to enable Cloud Workload Security
      securityAgent:
        runtime:
          enabled: true

    # Add this to enable the collection of CWS network events, only for Datadog Agent version 7.36
          network:
            enabled: true
    ```

3. Redémarrez l'Agent.
4. **Facultatif, si Cloud SIEM est activé** : suivez [ces instructions][2] afin de recueillir des logs d'audit pour Kubernetes.


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://docs.datadoghq.com/fr/integrations/kubernetes_audit_logs/
{{% /tab %}}

{{% tab "Docker" %}}

La commande suivante permet de lancer l'Agent Runtime Security ainsi que `system-probe` dans un environnement Docker :

{{< code-block lang="shell" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=true \ # to enable the collection of CWS network events
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<CLÉ_API> \
  gcr.io/datadoghq/agent:7

{{< /code-block >}}

{{% /tab %}}

{{% tab "Debian" %}}

Pour les déploiements basés sur des packages, le package Datadog doit être déployé : exécutez `dkpg -i datadog-agent_7....deb`.

Par défaut, la solution Runtime Security est désactivée. Pour l'activer, les fichiers `security-agent.yaml` et `system-probe.yaml` doivent être modifiés. Exécutez les commandes suivantes pour activer ces configurations :

{{< code-block lang="shell" filename="debian-runtime-security.sh" >}}

echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml

systemctl restart datadog-agent

{{< /code-block >}}

Version 7.36 de l'[Agent Datadog][1] uniquement : pour activer la collecte d'événements réseau CWS, utilisez ce qui suit :

```shell
echo "runtime_security_config.network.enabled: true" >> /etc/datadog-agent/system-probe.yaml
```

Une fois vos modifications appliquées, redémarrez l'Agent Security et le system-probe.

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
{{% /tab %}}

{{% tab "Fedora/CentOS" %}}

Pour les déploiements basés sur des packages, le package Datadog doit être déployé : exécutez `yum/dnf install datadog-agent_7....rpm`.

Par défaut, la solution Runtime Security est désactivée. Pour l'activer, les fichiers `security-agent.yaml` et `system-probe.yaml` doivent être modifiés. Exécutez les commandes suivantes pour activer ces configurations :

{{< code-block lang="shell" filename="fedora-centos-runtime-security.sh" >}}
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml
systemctl restart datadog-agent
{{< /code-block >}}

Version 7.36 de l'[Agent Datadog][1] uniquement : pour activer la collecte d'événements réseau CWS, utilisez ce qui suit :

```shell
echo "runtime_security_config.network.enabled: true" >> /etc/datadog-agent/system-probe.yaml
```

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
{{% /tab %}}

{{% tab "Host (autres)" %}}

Pour les déploiements basés sur des packages, le package Datadog doit être déployé. Installez le package à l'aide de votre gestionnaire de packages.

Par défaut, la solution Runtime Security est désactivée. Pour l'activer, les fichiers `security-agent.yaml` et `system-probe.yaml` doivent être modifiés. Exécutez les commandes suivantes pour activer ces configurations :

{{< code-block lang="shell" filename="host-runtime-security.sh" >}}
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml
systemctl restart datadog-agent
{{< /code-block >}}

Version 7.36 de l'[Agent Datadog][1] uniquement : pour activer la collecte d'événements réseau CWS, utilisez ce qui suit :

```shell
echo "runtime_security_config.network.enabled: true" >> /etc/datadog-agent/system-probe.yaml
```

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
{{% /tab %}}

{{% tab "Amazon Elastic Beanstalk" %}}

Le déploiement suivant vous permet de lancer l'Agent Runtime Security ainsi que `system-probe` dans un environnement Amazon Elastic Beanstalk doté de plusieurs conteneurs Docker :

```json
{
    "AWSEBDockerrunVersion": 2,
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
                "sourcePath": "/cgroup/"
            }
        },
        {
            "name": "debug",
            "host": {
                "sourcePath": "/sys/kernel/debug"
            }
        },
        {
           "name": "os_release",
           "host": {
                "sourcePath": "/etc/os-release"
        }
        },
        {
           "name": "etc_passwd",
           "host": {
             "sourcePath": "/etc/passwd"
           }
        },
        {
           "name": "etc_group",
           "host": {
             "sourcePath": "/etc/group"
           }
        }
    ],
    "containerDefinitions": [
        {
            "image": "gcr.io/datadoghq/agent:7",
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<VOTRE_CLÉ_API_DD>"
                },
                {
                    "name": "DD_SITE",
                    "value": "<VOTRE_SITE_DD>"
                },
                {
                    "name": "DD_TAGS",
                    "value": "<TAG_SIMPLE>, <KEY:VALUE_TAG>"
                },
                {
                   "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
                   "value": "true"
                }
            ],
            "memory": 256,
            "dockerSecurityOptions": ["apparmor:unconfined"],
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
            "mountPoints": [
                {
                    "sourceVolume": "docker_sock",
                    "containerPath": "/var/run/docker.sock",
                    "readOnly": false
                },
                {
                    "sourceVolume": "proc",
                    "containerPath": "/host/proc",
                    "readOnly": true
                },
                {
                    "sourceVolume": "cgroup",
                    "containerPath": "/host/sys/fs/cgroup",
                    "readOnly": true
                },
                {
                    "containerPath": "/sys/kernel/debug",
                    "sourceVolume": "debug"
                },
                {
                    "sourceVolume": "os_release",
                    "containerPath": "/host/etc/os-release",
                    "readOnly": false
                },
                {
                    "sourceVolume": "etc_passwd",
                    "containerPath": "/etc/passwd",
                    "readOnly": false
                },
                {
                    "sourceVolume": "etc_group",
                    "containerPath": "/etc/group",
                    "readOnly": false
                }
            ]
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[3]: /fr/security/cloud_security_management/troubleshooting