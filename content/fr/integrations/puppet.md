---
categories:
- provisioning
- configuration & deployment
dependencies: []
description: 'Surveillez les exécutions de Puppet : soyez informé en cas d''échec,
  de réussite ou de changement majeur.'
doc_link: https://docs.datadoghq.com/integrations/puppet/
draft: false
git_integration_title: puppet
has_logo: true
integration_id: puppet
integration_title: Puppet
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: puppet
public_title: Intégration Datadog/Puppet
short_description: 'Surveillez les exécutions de Puppet : soyez informé en cas d''échec,
  de réussite ou de changement majeur.'
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Associez Puppet à Datadog pour :

- Obtenir des rapports en temps réel sur les exécutions de l'Agent avec Puppet
- Surveillez des métriques clés de performance de Puppet sur tous vos serveurs.
- Identifier rapidement les exécutions Puppet ayant échoué et en discuter avec votre équipe

## Formule et utilisation

### Liste des infrastructures

Pour installer l'Agent Datadog avec Puppet, consultez le [répertoire de l'Agent Datadog avec Puppet][1] sur GitHub.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "puppet" >}}


### Aide

L'intégration Puppet comprend des événements de statuts pour les ressources d'echecs, de réussite, avec des modifications et sans des modifications.

### Aide

L'intégration Puppet n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://github.com/datadog/puppet-datadog-agent
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/puppet/puppet_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/