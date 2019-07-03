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

Le check Portworx n'est **PAS** inclus avec le paquet de l'[Agent Datadog][1].

Pour installer le check Portworx sur votre host :

1. Installez le [kit de développement][2] sur n'importe quelle machine.
2. Exécutez `ddev release build portworx` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][2].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/portworx/dist/<NOM_ARTEFACT>.whl`.

### Configuration

Créez un fichier `portworx.yaml` dans le répertoire `conf.d` de l'Agent.

#### Collecte de métriques

- Ajoutez cette configuration à votre fichier `portworx.yaml` pour commencer à recueillir vos métriques portworx :

```
init_config:

instances:
 # url de l'endpoint des métriques de prometheus
 - prometheus_endpoint: http://localhost:9001/metrics
```

Configurez-la de façon à spécifier votre serveur et votre port.

Consultez le [fichier d'exemple portworx.yaml][3] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][4] pour commencer à envoyer vos métriques Portworx à Datadog.

### Validation

Lorsque vous [exécutez la sous-commande `info` de l'Agent][5], voici ce qui s'affiche :

    Checks
    ======

      portworx
      -----------------
        - instance #0 [OK]
        - Collected 60 metrics, 0 events & 0 service check

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

Consultez [notre blog][7] pour en savoir plus sur la surveillance d'infrastructures et sur toutes les autres intégrations disponibles.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[3]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/faq/agent-status-and-information/
[6]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[7]: https://www.datadoghq.com/blog/


{{< get-dependencies >}}