---
categories:
  - security
ddtype: crawler
dependencies: []
description: Recueillez des données d'Immunio pour visualiser et surveiller les schémas d'attaque.
doc_link: 'https://docs.datadoghq.com/integrations/immunio/'
draft: false
git_integration_title: immunio
has_logo: true
integration_title: Immunio
is_public: true
kind: integration
manifest_version: '1.0'
name: immunio
public_title: Intégration Datadog/Immunio
short_description: Recueillez des données d'Immunio pour visualiser et surveiller les schémas d'attaque.
version: '1.0'
---
{{< img src="integrations/immunio/immunio_dash.png" alt="Dashboard Immunio" popup="true">}}

## Présentation

Associez le service de surveillance avancée de la sécurité des applications d'IMMUNIO à Datadog pour visualiser l'impact que les attaques ont sur votre application Web et surveiller la protection automatique d'IMMUNIO.

IMMUNIO surveille vos applications afin de détecter les attaques suivantes et de vous défendre contre celles-ci :

- Les attaques de prise de contrôle de compte telles que force brute, credential stuffing, etc.
- Les attaques au niveau du code, telles que le XSS, l'injection SQL et l'exécution de commandes à distance
- Les attaques personnalisées ciblant l'entreprise comme la fraude par carte de crédit et d'autres abus
- Les mauvais comportements généraux, comme le balayage et le scraping.

## Configuration

### Installation

1. Connectez-vous à votre [compte IMMUNIO][1].
2. Accédez à la [page de configuration des intégrations][2].
    {{< img src="integrations/immunio/immuniosetup1.png" alt="Page de configuration des intégrations" popup="true">}}
3. Cliquez sur « Add an API Key ».
    {{< img src="integrations/immunio/immuniosetup2.png" alt="Ajouter une clé d'API" popup="true">}}
4. Ajoutez votre clé d'API.

### Configuration

Aucune étape de configuration n'est requise pour cette intégration.

### Validation

Pour valider votre installation et votre configuration, redémarrez l'Agent et exécutez la commande info. La sortie doit contenir une section similaire à ce qui suit :

```shell
Checks
======
  [...]
  immunio
  -----
      - instance #0 [OK]
      - Collected 4 metrics & 0 events
```

## Données collectées

### Métriques
{{< get-metrics-from-git "immunio" >}}


### Événements

L'intégration IMMUNIO n'inclut aucun événement.

### Checks de service

L'intégration IMMUNIO n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: http://www.immun.io
[2]: https://dashboard.immun.io/#/settings/integrations
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/immunio/immunio_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/