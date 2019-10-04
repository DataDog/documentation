---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md'
display_name: Portworx
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
short_description: Recueillez des métriques de runtime à partir d'une instance Portworx.
support: contrib
supported_os:
  - linux
---
## Présentation

Recueillez des métriques à partir du service Portworx en temps réel pour :

- Surveiller les performances et la santé de votre cluster Portworx
- Suivre l'utilisation du disque, la latence et le débit de volumes Portworx

## Implémentation

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Portworx sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. Installez le [kit de développement][4].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `portworx`, exécutez :

    ```
    ddev -e release build portworx
    ```

5. [Téléchargez et lancez l'Agent Datadog][5].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_PORTWORX_ARTIFACT_>/<PORTWORX_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `portworx.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#collecte-de-metriques) Portworx.
  Consultez le [fichier d'exemple portworx.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

#### Collecte de métriques

- Ajoutez cette configuration à votre fichier `portworx.yaml` pour commencer à recueillir vos métriques portworx :

```
init_config:

instances:
 # url de l'endpoint des métriques de prometheus
 - prometheus_endpoint: http://localhost:9001/metrics
```

Configurez-la de façon à spécifier votre serveur et votre port.

Consultez le [fichier d'exemple portworx.yaml][10] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][11] pour commencer à envoyer vos métriques Portworx à Datadog.

### Validation

Lorsque vous [exécutez la sous-commande `info` de l'Agent][12], voici ce qui s'affiche :

## Compatibilité

Le check Portworx est compatible avec Portworx 1.4.0 et les versions antérieures existantes.

## Données collectées

### Métriques
{{< get-metrics-from-git "portworx" >}}


### Événements

Le check Portworx n'inclut aucun événement.

## Dépannage

### Connexion impossible de l'Agent

```
    portworx
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Vérifiez que le paramètre `url` dans `portworx.yaml` est correctement configuré.

## Pour aller plus loin

Consultez [notre blog][14] pour en savoir plus sur la surveillance d'infrastructure et sur toutes les autres intégrations disponibles.

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[11]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[12]: https://docs.datadoghq.com/fr/agent/faq/agent-status-and-information
[13]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[14]: https://www.datadoghq.com/blog


{{< get-dependencies >}}