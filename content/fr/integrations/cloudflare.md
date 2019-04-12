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
Installez l'intégration avec le [carré d'intégration Cloudflare][3] de Datadog.

### Configuration

1. Accédez à l'onglet Configuration dans le [carré d'intégration Cloudflare][3] de Datadog.
2. Saisissez les adresses e-mail et les clés d'API des comptes que vous souhaitez surveiller. Il est conseillé de fournir une clé d'API disposant seulement des autorisations nécessaires (_#zone:read_ et _#analytics:read_). Vos clés d'API Cloudflare sont disponibles sur votre compte Cloudflare dans la section *Mon profil* (faites défiler vers le bas jusqu'à atteindre Clés API).
3. Nommez le compte. Ce nom est arbitraire. Il est utilisé dans le tag `account` de vos métriques.

## Données collectées
### Métriques
{{< get-metrics-from-git "cloudflare" >}}


### Événements
L'intégration Cloudflare n'inclut aucun événement.

### Checks de service
L'intégration Cloudflare n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[2]: https://docs.datadoghq.com/fr/help/
[3]: https://app.datadoghq.com/account/settings#integrations/cloudflare


{{< get-dependencies >}}