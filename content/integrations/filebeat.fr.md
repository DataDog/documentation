---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/filebeat/
git_integration_title: filebeat
has_logo: false
integration_title: Filebeat
is_public: true
kind: integration
maintainer: jean@tripping.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: filebeat
public_title: Intégration Datadog-Filebeat
short_description: filebeat description.
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 0.1.0
---



## Aperçu

Obtenir les métriques du service filebeat en temps réel pour:

* Visualiser et monitorer les états de filebeat.
* Être informé des basculements et des événements de filebeat.

## Implémentation

### Configuration

Modifiez le fichier `filebeat.yaml` afin d'indiquer votre serveur et votre port, définissez les masters à surveiller.

### Validation

[Exécutez le sous-commande `status` de l'Agent][1] et cherchez  `filebeat` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "filebeat" >}}


### Évènements
Le check Filebeat n'inclut aucun événement pour le moment.

### Checks de Service
Le check Filebeat n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][3].

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][4].

[1]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[3]: http://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/

