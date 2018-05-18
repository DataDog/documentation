---
categories:
- monitoring
- notification
- network
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/snmpwalk/
git_integration_title: snmpwalk
guid: a2864821-994c-4ebb-8532-b6879ea9a9ab
has_logo: false
integration_title: SNMP walk
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: snmpwalk
public_title: Intégration Datadog-SNMP walk
short_description: snmpwalk description.
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 0.1.0
---



## Aperçu

Obtenir les métriques du service SNMP walk en temps réel pour:

* Visualiser et surveiller les états de SNMP walk 
* Être informé des failovers et des événements SNMP walk.

## Implémentation

### Configuration

Modifiez le fichier `snmpwalk.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer

### Validation

[Exécutez le sous-commande `status` de l'Agent][1] et cherchez `snmpwalk` dans la section Checks.

## Données collectées
### Métriques

Le check SNMP walk n'inclut aucune métrique pour le moment.

### Évènements
Le check SNMP walk n'inclut aucun événement pour le moment.

### Checks de Service
Le check SNMP walk n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide ? Contactez [l'équipe support de Datadog][2].

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][3].

[1]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[2]: http://docs.datadoghq.com/help/
[3]: https://www.datadoghq.com/blog/

