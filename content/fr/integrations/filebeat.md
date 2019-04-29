---
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/filebeat/README.md'
display_name: Filebeat
git_integration_title: filebeat
guid: 3bb6a789-d1e3-465c-9bff-ea2a43ae2f59
integration_id: filebeat
integration_title: Filebeat
is_public: true
kind: intégration
maintainer: jean@tripping.com
manifest_version: 1.0.0
metric_prefix: filebeat.
name: filebeat
public_title: Intégration Datadog/Filebeat
short_description: Agent de transfert léger conçu pour les logs
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Filebeat en temps réel pour :

* Visualiser et surveiller les états de Filebeat
* Être informé des failovers et des événements de Filebeat

## Implémentation

Le check Filebeat n'est **PAS** inclus avec le paquet de l'[Agent Datadog][1].

### Installation

Pour installer le check Filebeat sur votre host :

1. Installez le [kit de développement][7] sur n'importe quelle machine.
2. Exécutez `ddev release build filebeat` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][1].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w path/to/filebeat/dist/<NOM_ARTEFACT>.whl`.

### Configuration

Pour configurer le check Filebeat :

1. Créez un dossier `filebeat.d/` dans le dossier `conf.d/` à la racine du répertoire de votre Agent.
2. Créez un fichier `conf.yaml` dans le dossier `filebeat.d/` précédemment créé.
3. Consultez le [fichier d'exemple filebeat.yaml][2] et copiez son contenu dans le fichier `conf.yaml`.
4. Modifiez le fichier `conf.yaml` afin qu'il redirige vers votre serveur et votre port. Définissez ensuite les masters à surveiller.
5. [Redémarrez l'Agent][3].

## Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `filebeat` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "filebeat" >}}


### Événements
Le check Filebeat n'inclut aucun événement.

### Checks de service
Le check Filebeat n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[6]: http://docs.datadoghq.com/help/
[7]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit


{{< get-dependencies >}}