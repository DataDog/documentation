---
categories:
  - web
ddtype: crawler
dependencies: []
description: Surveillez vos métriques Cloudfare relatives au DNS et au trafic Web.
doc_link: 'https://docs.datadoghq.com/integrations/cloudflare/'
git_integration_title: cloudflare
has_logo: true
integration_title: Cloudflare
is_public: true
kind: integration
manifest_version: 1
name: cloudflare
public_title: Intégration Datadog/Cloudflare
short_description: Surveillez vos métriques Cloudfare relatives au DNS et au trafic Web.
version: 1
---
## Présentation

Associez Datadog à votre compte Cloudflare pour consulter vos métriques relatives au DNS et au trafic Web.

## Implémentation
### Installation
Installez l'intégration avec le [carré d'intégration Cloudflare][1] de Datadog.

### Configuration

1. Accédez à l'onglet Configuration dans le [carré d'intégration Cloudflare][1] de Datadog.
2. Saisissez les adresses e-mail et les clés ou tokens d'API des comptes que vous souhaitez surveiller. Vos clés et tokens d'API Cloudfare sont disponibles sur votre compte Cloudflare, dans *My profile > API Tokens*.
3. Nommez le compte. Ce nom est arbitraire. Il est utilisé dans le tag `account` de vos métriques.

Lorsque vous utilisez un token d'API, assurez-vous qu'il dispose des autorisations suivantes :
* *Zone* > *Zone* > *Read*
* *Zone* > *Analytics* > *Read*

## Données collectées
### Métriques
{{< get-metrics-from-git "cloudflare" >}}


### Événements
L'intégration Cloudflare n'inclut aucun événement.

### Checks de service
L'intégration Cloudflare n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}