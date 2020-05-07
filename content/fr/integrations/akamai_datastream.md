---
aliases:
  - /fr/integrations/akamai/
categories:
  - cloud
ddtype: crawler
dependencies: []
description: "Intégrez votre Akamai\_DataStream à Datadog."
doc_link: 'https://docs.datadoghq.com/integrations/akamai_datastream/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/akamai-cdn-performance/'
    tag: Blog
    text: Intégrez Akamai à Datadog pour surveiller les performances de vos CDN
git_integration_title: akamai_datastream
has_logo: true
integration_title: "Akamai\_DataStream"
is_public: true
kind: integration
manifest_version: '1.0'
name: akamai_datastream
public_title: "Datadog/Akamai\_DataStream"
short_description: "Intégrez votre Akamai\_DataStream à Datadog."
version: '1.0'
---
## Présentation

Associez Datadog à Akamai DataStream pour recueillir les métriques d'état, de latence, de déchargement et d'erreurs relatives à vos CDN.

## Implémentation

### Installation

Installez l'intégration avec le [carré d'intégration Akamai][1] de Datadog.

### Configuration

Commencez par ajouter un compte Akamai :

1. Dans le Luna Control Center, accédez à Configure > Organization > Manage APIs et créez un client avec au moins un accès en lecture seule « READ-ONLY » à l'API « DataStream ».
2. Sélectionnez l'API que vous venez de créer dans la liste « Users and API Clients ». Sous « Credentials », créez un token Client. Copiez les informations fournies dans le [carré d'intégration Akamai][1] de Datadog. Mettez à jour la configuration en appuyant sur « Update Configuration ».

Ajoutez la liste de flux à surveiller :

1. Dans DataStream (accessible via Configure > Performance Analytics > DataStream), sélectionnez un flux de type « Aggregated metrics », puis copiez son ID dans la liste des flux du carré d'intégration Akamai.

Vous pouvez configurer plusieurs comptes (ou hosts), mais chaque flux doit être associé à un compte.

<div class="alert alert-warning">
Seuls les flux présentant le type « Aggregated metrics » sont pris en charge.
</div>

## Données collectées

### Métriques
{{< get-metrics-from-git "akamai_datastream" >}}


### Événements

L'intégration Akamai n'inclut aucun événement.

### Checks de service

L'intégration Akamai n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/akamai-datastream
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_datastream/akamai_datastream_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/