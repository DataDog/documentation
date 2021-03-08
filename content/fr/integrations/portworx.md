---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md'
display_name: Portworx
draft: false
git_integration_title: portworx
guid: 858a4b03-3f75-4019-8ba8-46b00d5aeb46
integration_id: portworx
integration_title: Portworx
is_public: true
kind: integration
maintainer: paul@portworx.com
manifest_version: 1.0.0
metric_prefix: portworx.
name: portworx
public_title: Intégration Datadog/Portworx
short_description: Recueillez des métriques runtime à partir d'une instance Portworx.
support: contrib
supported_os:
  - linux
---
## Présentation

Recueillez des métriques à partir du service Portworx en temps réel pour :

- Surveiller les performances et la santé de votre cluster Portworx
- Suivre l'utilisation du disque, la latence et le débit de volumes Portworx

## Configuration

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Portworx sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. [Téléchargez et lancez l'Agent Datadog][4].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-portworx==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `portworx.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#metriques) Portworx. Consultez le [fichier d'exemple portworx.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_endpoint: http://localhost:9001/metrics
    ```

2. [Redémarrez l'Agent][8].

### Validation

Lorsque vous [exécutez la sous-commande `info` de l'Agent][9], voici ce qui s'affiche :

## Compatibilité

Le check Portworx est compatible avec Portworx 1.4.0 et les versions antérieures existantes.

## Données collectées

### Métriques
{{< get-metrics-from-git "portworx" >}}


### Événements

Le check Portworx n'inclut aucun événement.

## Dépannage

### Connexion de l'Agent impossible

```text
    portworx
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Vérifiez que le paramètre `url` dans `portworx.yaml` est correctement configuré.

## Pour aller plus loin

Consultez [notre blog][11] pour en savoir plus sur la surveillance d'infrastructure et sur toutes nos intégrations.

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/faq/agent-status-and-information/
[10]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[11]: https://www.datadoghq.com/blog