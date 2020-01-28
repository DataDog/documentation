---
categories:
  - cloud
ddtype: crawler
dependencies: []
description: "Intégrez Akamai\_mPulse à Datadog."
doc_link: 'https://docs.datadoghq.com/integrations/akamai_mpulse/'
git_integration_title: akamai_mpulse
has_logo: true
integration_title: Akamai mPulse
is_public: true
kind: integration
manifest_version: 1
name: akamai_mpulse
public_title: Datadog/Akamai mPulse
short_description: "Intégrez Akamai\_mPulse à Datadog."
version: 1
---
## Présentation

Connectez Datadog à Akamai mPulse pour recueillir des métriques RUM (Real-User Monitoring) et bénéficier d'une visibilité sur la manière dont les utilisateurs finaux perçoivent les performances d'un site Web.

## Implémentation
### Installation

Installez l'intégration avec le [carré d'intégration Akamai mPulse][1] de Datadog.

### Configuration

Pour configurer l'intégration Akamai mPulse, une `apiKey` et un `apiToken` sont requis.

La `apiKey` est une valeur générée automatiquement qui identifie de manière unique les données (balises) de votre site qui se trouvent dans votre portail mPulse.

#### Générer un [apiToken][2]
1. Connectez-vous à `mpulse.soasta.com`.
2. Accédez à My Settings dans le volet de gauche.
3. Cliquez sur « Generate » dans la zone API Token.

## Données collectées
### Métriques
{{< get-metrics-from-git "akamai_mpulse" >}}


### Événements

L'intégration Akamai mPulse n'inclut aucun événement.

### Checks de service

L'intégration Akamai mPulse n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.datadoghq.com/account/settings#integrations/akamai-mpulse
[2]: https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_mpulse/akamai_mpulse_metadata.csv
[4]: https://docs.datadoghq.com/fr/help