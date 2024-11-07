---
aliases: []
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques clés d'Azure Arc.
doc_link: https://docs.datadoghq.com/integrations/azure_arc/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-arc-integration/
  tag: Blog
  text: Surveillez votre infrastructure hybride Azure Arc avec Datadog
git_integration_title: azure_arc
has_logo: true
integration_id: azure-arc
integration_title: Microsoft Azure Arc
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_arc
public_title: Intégration Datadog/Microsoft Azure Arc
short_description: Surveillez des métriques clés d'Azure Arc.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Arc est un pont qui étend la plateforme Azure pour vous permettre de créer des applications et des services exécutables dans des centres de données, en périphérie et dans des environnements multicloud.

Utilisez l'intégration Azure Arc pour :

- Recueillir le statut de connectivité, les tags et d'autres informations sur vos clusters Kubernetes et serveurs Azure Arc
- Pour les serveurs gérés avec Arc et surveillés avec l'Agent Datadog, propager les tags Azure Arc vers le host dans Datadog ainsi que ses métriques et logs associés
- Pour les serveurs gérés avec Arc et surveillés avec l'intégration AWS ou GCP, propager les tags Azure Arc vers le host dans Datadog ainsi que ses métriques cloud et logs associés
- Obtenir instantanément des analyses et des synthèses des données ci-dessus grâce au dashboard prêt à l'emploi pour Azure Arc

Vous pouvez également utiliser l'extension Datadog pour configurer et déployer l'Agent Datadog sur des serveurs Arc. Pour en savoir plus sur cette possibilité, consultez la page [Extension Virtual Machine Datadog][1].

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][2]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_arc" >}}


### Aide

L'intégration Azure Arc n'inclut aucun événement.

### Aide

L'intégration Azure Arc n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/guide/powershell-command-to-install-azure-datadog-extension/#install-on-azure-arc
[2]: https://docs.datadoghq.com/fr/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/