---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Twistlock: assets/dashboards/overview.json
  logs:
    source: twistlock
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/twistlock/README.md'
display_name: Twistlock
draft: false
git_integration_title: twistlock
guid: 59082b73-62f4-48d4-83f8-af3d5576eae1
integration_id: twistlock
integration_title: Prisma Cloud Compute Edition
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: twistlock.
metric_to_check: twistlock.images.cve.details
name: twistlock
public_title: Intégration Datadog/Prisma Cloud Compute Edition
short_description: Twistlock est un scanner de sécurité pour conteneur.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[Prisma Cloud Compute Edition][1] est un scanner de sécurité. Il peut analyser des conteneurs, des hosts et des packages afin de détecter les vulnérabilités et les problèmes de conformité.

## Configuration

### Installation

Le check Prisma Cloud Compute Edition est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `twistlock.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Twistlock. Consultez le [fichier d'exemple twistlock.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/twistlock/datadog_checks/twistlock/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                               |
| -------------------- | ----------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `twistlock`                                                                         |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                       |
| `<CONFIG_INSTANCE>`  | `{"url":"http://%%host%%:8083", "username":"<NOMUTILISATEUR>", "password": "<MOTDEPASSE>"}` |

###### Kubernetes

Si vous utilisez Kubernetes, ajoutez la configuration à la section replication controller de twistlock_console.yaml avant le déploiement :

```yaml
---
apiVersion: v1
kind: ReplicationController
metadata:
  name: twistlock-console
  namespace: twistlock
spec:
  replicas: 1
  selector:
    name: twistlock-console
  template:
    metadata:
      annotations:
        ad.datadoghq.com/twistlock-console.check_names: '["twistlock"]'
        ad.datadoghq.com/twistlock-console.init_configs: "[{}]"
        ad.datadoghq.com/twistlock-console.instances: '[{"url":"http://%%host%%:8083", "username":"<NOMUTILISATEUR>", "password": "<MOTDEPASSE>"}]'
        ad.datadoghq.com/twistlock-console.logs: '[{"source": "twistlock", "service": "twistlock"}]'
      name: twistlock-console
      namespace: twistlock
      labels:
        name: twistlock-console
```

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                             |
| -------------- | ------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "twistlock", "service": "twistlock"}` |

###### Kubernetes

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre [configuration DaemonSet][3] :

   ```yaml
     #(...)
       env:
         #(...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     #(...)
   ```

2. Assurez-vous que le socket Docker est monté sur l'Agent Datadog, comme dans [ce manifeste][4].

3. Assurez-vous que la section de log est comprise dans l'annotation de pod relative au defender, où l'on peut trouver le nom du conteneur dans les spécifications de pod ci-dessous :

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

4. [Redémarrez l'Agent][5].

###### Docker

1. La collecte des logs est désactivée par défaut dans l'Agent Datadog. Activez-la avec la variable d'environnement suivante :

   ```shell
   DD_LOGS_ENABLED=true
   ```

2. Ajoutez une étiquette sur le conteneur du defender :

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

3. Assurez-vous que le socket Docker est monté sur l'Agent Datadog. Vous trouverez davantage d'informations concernant la configuration requise pour recueillir des logs via l'Agent Datadog dans la [documentation relative à Docker][6].

4. [Redémarrez l'Agent][5].

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#log-collection
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#create-manifest
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `twistlock` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "twistlock" >}}


### Événements

Prisma Cloud Compute Edition envoie un événement lorsqu'une nouvelle vulnérabilité ou un nouveau problème de sécurité est détecté.

### Checks de service

Prisma Cloud Compute Edition envoie des checks de service en cas d'échec d'une analyse.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].


[1]: https://www.paloaltonetworks.com/prisma/cloud
[2]: https://github.com/DataDog/integrations-core/blob/master/twistlock/datadog_checks/twistlock/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/