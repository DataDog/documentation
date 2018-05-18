---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/stardog/
git_integration_title: stardog
guid: 1b32f0d4-49ef-40fb-aec3-365e4e7cd6ee
has_logo: false
integration_title: Stardog
is_public: true
kind: integration
maintainer: support@stardog.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: stardog
public_title: Intégration Datadog-Stardog
short_description: Un collecteur de données Stardog pour Datadog.
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 0.1.0
---



## Aperçu

Obtenir les métriques du service Stardog en temps réel pour:

* Visualiser et surveiller les états de Stardog
* Être informé des basculements et des évènements de Stardog.

## Implémentation

### Configuration

Modifiez le fichier `stardog.yaml` afin d'indiquer votre serveur et définissez l'utilisateur et mot de passe administratif.

### Validation

[Exécutez le sous-commande `status` de l'Agent][1] et cherchez `stardog` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "stardog" >}}


### Évènements
Le check Stardog n'inclut aucun événement pour le moment.

### Checks de Service
Le check Stardog n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][3].

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][4].

[1]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/integrations-extras/blob/master/stardog/metadata.csv
[3]: http://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/

