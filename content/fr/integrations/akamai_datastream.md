---
aliases:
- /fr/integrations/akamai/
categories:
- caching
- cloud
dependencies: []
description: Intégrez votre Akamai DataStream à Datadog.
doc_link: https://docs.datadoghq.com/integrations/akamai_datastream/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/akamai-cdn-performance/
  tag: Blog
  text: Intégrez Akamai à Datadog pour surveiller les performances de vos CDN
git_integration_title: akamai_datastream
has_logo: true
integration_id: ''
integration_title: Akamai DataStream
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: akamai_datastream
public_title: Datadog/Akamai DataStream
short_description: Intégrez votre Akamai DataStream à Datadog.
team: web-integrations
version: '1.0'
---

## Présentation

Associez Datadog à Akamai DataStream pour recueillir les métriques d'état, de latence, de déchargement et d'erreurs relatives à vos CDN.

## Implémentation

### Installation

Installez l'intégration avec le [carré d'intégration Akamai][1] de Datadog.

### Configuration

#### Collecte de métriques

Commencez par ajouter un compte Akamai :

1. Dans le Luna Control Center, accédez à Configure > Organization > Manage APIs et créez un client avec au moins un accès en lecture seule « READ-ONLY » à l'API « DataStream ».
2. Sélectionnez l'API que vous venez de créer dans la liste « Users and API Clients ». Sous « Credentials », créez un token Client. Copiez les informations fournies dans le [carré d'intégration Akamai][1] de Datadog. Mettez à jour la configuration en appuyant sur « Update Configuration ».

Ajoutez la liste de flux à surveiller :

1. Dans DataStream (accessible via Configure > Performance Analytics > DataStream), sélectionnez un flux de type « Aggregated metrics », puis copiez son ID dans la liste des flux du carré d'intégration Akamai.

Vous pouvez configurer plusieurs comptes (ou hosts), mais chaque flux doit être associé à un compte.

<div class="alert alert-warning">
Seuls les flux présentant le type « Aggregated metrics » sont pris en charge.
</div>

#### Collecte de logs

{{< site-region region="us3" >}}

La collecte de logs n'est plus prise en charge pour ce site.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Akamai DataStream 1.0 et 2.0 prennent en charge l'envoi de logs à Datadog via les endpoints HTTP(s) dans un fichier compressé gzip. Pour envoyer les logs à Datadog, remplissez ces champs dans Akamai :

1. **Name** : saisissez une description lisible de l'endpoint.

2. **Endpoint** : saisissez l'endpoint Datadog pour l'envoi et le stockage des logs : {{< region-param key="http_endpoint" code="true" >}}`/v1/input`.

3. **Tags** (facultatif) : saisissez une liste de tags séparés par des virgules, par exemple `env:staging,team:web`, pour filtrer et regrouper vos logs dans Datadog.

4. **Source** : saisissez le nom de source `akamai`.

5. **Service** (facultatif) : saisissez le nom de l'application ou du service qui génère les événements de log associés à votre compte Datadog.

6. **API key** : saisissez votre [clé d'API Datadog][1].

7. **Send compressed data** (facultatif) : cochez cette case pour compresser au format gzip les logs envoyés à la destination.

8. **Validate & Save** : cliquez sur ce champ pour valider la connexion avec la destination et enregistrer les informations que vous avez fournies.

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< /site-region >}}

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