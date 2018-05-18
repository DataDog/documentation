---
categories:
- processing
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/storm/
git_integration_title: storm
guid: 5a9ec2c3-8ea0-4337-8c45-a6b8a36b8721
has_logo: false
integration_title: Storm
is_public: true
kind: integration
maintainer: cody.lee@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 7.0.0
min_agent_version: 5.6.3
name: storm
public_title: Intégration Datadog-Storm
short_description: Statistiques d'exécution de la topologie Apache Storm 1.x.x
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---



## Aperçu

Obtenir les métriques du service Storm en temps réel pour:

* Visualiser et monitorer les performances du cluster storm et les métriques de topology.
* Être informé des failovers et des événements Storm

## Implémentation

### Configuration

Modifiez le fichier `storm.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer.

### Validation

[Exécutez le sous-commande `status` de l'Agent][1] et cherchez `storm` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "storm" >}}


### Évènements
Le check Storm n'inclut aucun événement pour le moment.

### Checks de Service
Le check Storm n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][3].

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][4].

[1]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[3]: http://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/

