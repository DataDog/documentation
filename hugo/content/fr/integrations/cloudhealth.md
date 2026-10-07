---
categories:
- Cost Management
- security
- configuration & deployment
- cloud
ddtype: crawler
dependencies: []
description: 'Optimisez CloudHealth : offrez-lui les métriques propres à chaque instance
  depuis Datadog.'
doc_link: https://docs.datadoghq.com/integrations/cloudhealth/
draft: false
git_integration_title: cloudhealth
has_logo: true
integration_id: cloudhealth
integration_title: Cloudhealth
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: cloudhealth
public_title: Intégration Datadog/CloudHealth
short_description: 'Optimisez CloudHealth : offrez-lui les métriques propres à chaque
  instance depuis Datadog.'
team: web-integrations
version: '1.0'
---

## Présentation

Si vous utilisez CloudHealth et Datadog, vous pouvez configurer votre compte CloudHealth afin de recueillir des métriques relatives à l'utilisation de ressources pour chaque instance depuis Datadog. Ces métriques permettent à CloudHealth de fournir des recommandations plus précises afin d'ajuster au mieux vos ressources cloud.

Cette intégration n'envoie **AUCUNE** donnée depuis CloudHealth vers Datadog. Elle permet simplement à CloudHealth de récupérer les métriques de votre compte Datadog.

## Configuration

### Procédure à suivre

Si vous n'avez pas encore optimisé votre cloud avec CloudHealth, inscrivez-vous pour bénéficier d'[un essai gratuit de 14 jours][1]. Pour les clients de CloudHealth, il vous suffit de suivre ces quatre étapes simples pour configurer votre intégration Datadog dans CloudHealth. Vous bénéficierez ainsi d'une visibilité améliorée sur l'ensemble de votre environnement cloud.

1. Dans la plateforme CloudHealth, accédez à Setup -> Accounts -> Datadog, puis cliquez sur le bouton New Account dans le coin supérieur droit.
   {{< img src="integrations/cloudhealth/cloudhealth_config_2.png" alt="Config CloudHealth 2" popup="true">}}

2. Remplissez le formulaire avec les informations du compte Datadog que vous souhaitez intégrer :

    - **Name** : nom convivial, qui peut être modifié à tout moment.
    - **API Key** : les clés d'API sont spécifiques à votre organisation.
    - **Application Key** : les clés d'application, utilisées conjointement avec la clé d'API de votre organisation, donnent accès à l'API de Datadog. La plateforme CloudHealth interroge uniquement Datadog pour obtenir des informations sur des métriques et des hosts. Elle n'écrit rien dans Datadog.
    - **Import Tags** : permet d'importer des tags Datadog dans la plateforme.

3. Allowed tags : si l'option « Import tags » est activée, les tags sont recueillis de façon active. Ce champ supplémentaire vous permet ainsi de spécifier les tags que vous souhaitez importer dans CloudHealth. Sélectionnez les tags de votre choix.
   {{< img src="integrations/cloudhealth/cloudhealth_config_1.png" alt="Config CloudHealth 1" popup="true">}}

## Données collectées

### Métriques

L'intégration CloudHealth n'inclut aucune métrique.

### Événements

L'intégration CloudHealth envoie les événements Catchpoint à votre flux d'événements Datadog.

### Checks de service

L'intégration CloudHealth n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://www.cloudhealthtech.com
[2]: https://docs.datadoghq.com/fr/help/