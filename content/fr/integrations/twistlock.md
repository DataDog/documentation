---
assets:
  dashboards: {}
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
git_integration_title: twistlock
guid: 59082b73-62f4-48d4-83f8-af3d5576eae1
integration_id: twistlock
integration_title: Twistlock
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: twistlock.
metric_to_check: twistlock.images.cve.details
name: twistlock
public_title: Intégration Datadog/Twistlock
short_description: Twistlock est un scanner de sécurité pour conteneur.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[Twistlock][1] est un scanner de sécurité. Il peut scanner des conteneurs, des hosts et des paquets afin de détecter des vulnérabilités et des problèmes de conformité.

## Configuration
### Installation

Le check Twistlock est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `twistlock.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Twistlock. Consultez le [fichier d'exemple twistlock.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

#### Environnement conteneurisé
Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                               |
|----------------------|-------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `twistlock`                                                                         |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                       |
| `<CONFIG_INSTANCE>`  | `{"url":"http://%%host%%:8083", "username":"<NOMUTILISATEUR>", "password": "<MOTDEPASSE>"}` |

###### Kubernetes

Si vous utilisez Kubernetes, ajoutez la configuration à la section replication controller de twistlock_console.yaml avant le déploiement :

```yaml
...
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
        ad.datadoghq.com/twistlock-console.init_configs: '[{}]'
        ad.datadoghq.com/twistlock-console.instances: '[{"url":"http://%%host%%:8083", "username":"<NOMUTILISATEUR>", "password": "<MOTDEPASSE>"}]'
        ad.datadoghq.com/twistlock-console.logs: '[{"source": "twistlock", "service": "twistlock"}]'
      name: twistlock-console
      namespace: twistlock
      labels:
        name: twistlock-console
...
```

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][8].

| Paramètre      | Valeur                                             |
|----------------|---------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "twistlock", "service": "twistlock"}` |

###### Kubernetes

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre [configuration DaemonSet][6] :

    ```
      (...)
        env:
          (...)
          - name: DD_LOGS_ENABLED
              value: "true"
          - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
              value: "true"
      (...)
    ```

2. Assurez-vous que le socket Docker est monté sur l'Agent Datadog comme dans [ce manifeste][7].

3. Assurez-vous que la section de log est comprise dans l'annotation de pod relative au defender, où l'on peut trouver le nom du conteneur dans les spécifications de pod ci-dessous :

    ```yaml
      ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
    ```

4. [Redémarrez l'Agent][4].

###### Docker

1. La collecte des logs est désactivée par défaut dans l'Agent Datadog. Activez-la avec la variable d'environnement suivante :

    ```
      DD_LOGS_ENABLED=true
    ```

2. Ajoutez une étiquette sur le conteneur defender :

    ```yaml
      ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
    ```

3. Assurez-vous que le socket Docker est monté sur l'Agent Datadog. Vous trouverez davantage d'informations concernant la configuration requise pour recueillir des logs via l'Agent Datadog dans la [documentation relative à Docker][8]

4. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `twistlock` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "twistlock" >}}


### Événements

Twistlock envoie un événement lorsque de nouvelles vulnérabilités et problèmes de sécurité.

### Checks de service

Twistlock envoie des checks de service en cas d'échec d'un scan.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://www.twistlock.com
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/twistlock/datadog_checks/twistlock/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#log-collection
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#create-manifest
[8]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#setup
[9]: https://github.com/DataDog/integrations-core/blob/master/twistlock/metadata.csv
[10]: https://docs.datadoghq.com/fr/help


