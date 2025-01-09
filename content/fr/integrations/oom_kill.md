---
app_id: oom-kill
app_uuid: 7546b270-2efe-4a59-8f94-3447df2db801
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: oom_kill.oom_process.count
      metadata_path: metadata.csv
      prefix: oom_kill.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10293
    source_type_name: OOM Kill
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oom_kill/README.md
display_on_public_website: true
draft: false
git_integration_title: oom_kill
integration_id: oom-kill
integration_title: OOM Kill
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: oom_kill
public_title: OOM Kill
short_description: Surveillez les éliminations de processus OOM (Out of Memory) effectuées
  par le système ou un cgroup.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & System
  configuration: README.md#Setup
  description: Surveillez les éliminations de processus OOM (Out of Memory) effectuées
    par le système ou un cgroup.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OOM Kill
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Ce check permet de surveiller les processus tués par le mécanisme OOM Killer (Out of Memory Killer) du kernel par l'intermédiaire de l'Agent Datadog et du system probe.

## Formule et utilisation

### Liste des infrastructures

Le check OOM Kill est inclus avec le package de l'[Agent Datadog][1]. Il repose sur un programme eBPF intégré au system probe.

Le programme eBPF utilisé par le system probe est compilé au runtime. Vous devez avoir accès aux en-têtes de kernel appropriés.

Sur les distributions dérivées de Debian, installez les en-têtes de kernel à l'aide de la commande suivante :
```sh
apt install -y linux-headers-$(uname -r)
```

Sur les distributions dérivées de RHEL, installez les en-têtes de kernel à l'aide de la commande suivante :
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**Remarque** : pour que le check OOM Kill fonctionne, vous devez utiliser la version 4.11 ou une version ultérieure du kernel. De plus, seules les versions 8 et ultérieures de Windows et CentOS/RHEL sont prises en charge.

### Dépannage de la solution Browser

1. Dans le fichier `system-probe.yaml` situé à la racine du répertoire de configuration de votre Agent, ajoutez la configuration suivante :

    ```yaml
    system_probe_config:
        enable_oom_kill: true
    ```

2. Vérifiez que le fichier `oom_kill.d/conf.yaml` figure bien dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos métriques OOM Kill. Consultez le [fichier d'exemple oom_kill.d/conf.yaml][2] découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

### Configuration avec Docker

En plus de monter `system-probe.yaml` et `oom_kill.d/conf.yaml` tel qu'indiqué ci-dessus, vous devez procéder comme suit :

1. Montez les volumes suivants sur le conteneur de l'Agent :

    ```
    -v /sys/kernel/debug:/sys/kernel/debug 
    -v /lib/modules:/lib/modules 
    -v /usr/src:/usr/src
    ```

2. Ajoutez l'autorisation suivante pour activer les opérations BPF :

    ```
    --privileged
    ```

    À partir de la version 5.8 du kernel, le paramètre `--privileged` peut être remplacé par `--cap-add CAP_BPF`.

**Remarque** : le mode `--privileged` n'est pas pris en charge dans Docker Swarm.


### Configuration avec Helm

À l'aide du [chart Helm Datadog][4], vérifiez que les paramètres `datadog.systemProbe` et `datadog.systemProbe.enableOOMKill` sont activés dans le fichier `values.yaml`.

### Configuration avec l'Operator (v1.0.0+)

Définissez le paramètre `features.oomKill.enabled` dans le manifeste DatadogAgent :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
```

**Remarque** : si vous utilisez COS (Container Optimized OS), remplacez le volume `src` dans l'Agent de nœud :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
  override:
    nodeAgent:
      volumes: 
      - emptyDir: {}
        name: src
```

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `oom_kill` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "oom_kill" >}}


### Aide

Le check OOM Kill n'inclut aucun check de service.

### Aide

Le check OOM Kill envoie un événement pour chaque OOM Kill. Celui-ci inclut l'ID et le nom du processus éliminé, ainsi que l'ID et le nom du processus à l'origine du déclenchement.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/oom_kill.d/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/helm-charts
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/oom_kill/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/