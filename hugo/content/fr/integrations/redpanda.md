---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Redpanda Overview: assets/dashboards/overview.json
  logs:
    source: redpanda
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- processing
- messaging
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redpanda/README.md
display_name: Redpanda
draft: false
git_integration_title: redpanda
guid: 7aa73d69-b635-4973-8b7c-b0bb325d407b
integration_id: redpanda
integration_title: Redpanda
integration_version: 1.1.0
is_public: true
custom_kind: integration
maintainer: support@vectorized.io
manifest_version: 1.0.0
metric_prefix: redpanda.
metric_to_check: redpanda.application.uptime
name: redpanda
public_title: Redpanda
short_description: Surveillez les performances et la santé globales de vos clusters
  Redpanda.
support: contrib
supported_os:
- linux
- mac_os
- windows
---


## Présentation

Redpanda est une plateforme de diffusion compatible avec l'API Kafka permettant de gérer des workloads essentiels.

Associez Datadog à [Redpanda][1] pour consulter vos métriques clés et ajouter des groupes de métriques supplémentaires basés sur des besoins spécifiques des utilisateurs.

## Configuration

### Installation

1. [Téléchargez et lancez l'Agent Datadog][2].
2. Installez manuellement l'intégration Redpanda. Consultez la section [Utiliser les intégrations de la communauté][3] pour découvrir plus de détails en fonction de votre environnement.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check pour un Agent en cours d'exécution sur un host, exécutez la commande `datadog-agent integration install -t datadog-redpanda==<VERSION_INTÉGRATION>`.

{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Pour utiliser au mieux cette intégration avec l'Agent Docker dans des environnements conteneurisés, générez une image de l'Agent avec l'intégration Redpanda installée.

Pour générer une image à jour de l'Agent, procédez comme suit :

1. Utilisez le Dockerfile suivant :

```dockerfile
FROM gcr.io/datadoghq/agent:latest

ARG INTEGRATION_VERSION=1.0.0

RUN agent integration install -r -t datadog-redpanda==${INTEGRATION_VERSION}
```

2. Créez l'image et envoyez-la vers votre registre Docker privé.

3. Mettez à niveau l'image du conteneur de l'Agent Datadog. Si vous utilisez un chart Helm, modifiez la section `agents.image` du fichier `values.yaml` afin de remplacer l'image de l'Agent par défaut :

```yaml
agents:
  enabled: true
  image:
    tag: <NOUVEAU_TAG>
    repository: <VOTRE_RÉFÉRENTIEL_PRIVÉ>/<NOM_AGENT>
```

4. Utilisez le nouveau fichier `values.yaml` pour mettre à niveau l'Agent :

```shell
helm upgrade -f values.yaml <NOM_VERSION> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Collecte de métriques

Pour commencer à recueillir vos données de performance Redpanda, procédez comme suit :

1. Modifiez le fichier `redpanda.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple redpanda.d/conf.yaml.example][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

Par défaut, la collecte de logs est désactivée dans l'Agent Datadog. Elle est disponible à partir de la version 6.0 de l'Agent.

1. Pour activer les logs, ajoutez ce qui suit à votre fichier `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez les lignes suivantes à votre fichier `redpanda.d/conf.yaml` pour commencer à recueillir vos logs Redpanda :

   ```yaml
    logs:
    - type: journald
      source: redpanda
    ```

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/redpanda/datadog_checks/redpanda/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

##### Collecte de métriques

Dans les environnements conteneurisés, Autodiscovery est configuré par défaut après l'intégration du check Redpanda à l'image de l'Agent Datadog.

Les métriques sont automatiquement recueillies sur le serveur de Datadog. Pour en savoir plus, consultez la section relative aux [modèles d'intégration Autodiscovery][1].

##### Collecte de logs

Par défaut, la collecte de logs est désactivée dans l'Agent Datadog. Elle est disponible à partir de la version 6.0 de l'Agent.

Pour activer les logs, consultez la [section relative à la collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                                  |
| -------------- | ------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "redpanda", "service": "redpanda_cluster"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings#agent
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `redpanda` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "redpanda" >}}


### Événements

L'intégration Redpanda n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "redpanda" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].


[1]: https://vectorized.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help/