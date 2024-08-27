---
categories:
- cloud
dependencies: []
description: Intégrez Akamai mPulse à Datadog.
doc_link: https://docs.datadoghq.com/integrations/akamai_mpulse/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/integrate-akamai-mpulse-real-user-monitoring-with-datadog/
  tag: Blog
  text: Intégrer la solution de real user monitoring Akamai mPulse à Datadog
git_integration_title: akamai_mpulse
has_logo: true
integration_id: akamai-mpulse
integration_title: Akamai mPulse
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: akamai_mpulse
public_title: Datadog/Akamai mPulse
short_description: Intégrez Akamai mPulse à Datadog.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Connectez Datadog avec Akamai mPulse pour collecter des métriques de real user monitoring (RUM) et obtenir une visibilité sur la façon dont les utilisateurs finaux perçoivent les performances d'un site web. Bénéficiez d'une visibilité complète sur l'ensemble de votre stack web en analysant et en mettant en corrélation les métriques du RUM métriques avec les données de performance de votre CDN et de lʼinfrastructure de votre backend.

Utilisez les monitors et le dashboard prêts à l'emploi de Datadog pour :
- Obtenir une vue d'ensemble des métriques clés telles que le taux de rebond, les sessions d'utilisateurs et le temps de chargement des pages.
- Rechercher la source du ralentissement auquel l'utilisateur est confronté, qu'elle concerne le frontend ou le backend.
- Surveiller le temps de chargement des pages et des groupes de pages

Mettre en corrélation des métriques avec des données en temps réel provenant de [Akamai DataStream 2][1], [NGINX][2], [MYSQL][3] et plus de 600 autres technologies pour obtenir une vue frontend et backend de votre stack web.

## Formule et utilisation

### Liste des infrastructures

Installez l'intégration avec le [carré d'intégration Akamai mPulse][4] de Datadog.

### Dépannage de la solution Browser

Une `apiKey` et un `apiToken` sont nécessaires pour configurer lʼintégration de Akamai mPulse. 

#### Générer une clé d'API

La `apiKey` est une valeur générée automatiquement qui identifie de manière unique les données (balises) de votre site qui se trouvent dans votre portail mPulse. 

<div class="alert alert-warning">
Seuls les administrateurs d'application peuvent accéder à l'option Apps et à l'attribut `apiKey`.
</div>

1. Trouvez votre `apiKey` en accédant à la page « Central »
2. Cliquez sur **Apps** dans le volet de gauche.
3. Sélectionnez le nom de l'application que vous souhaitez surveiller pour ouvrir une page de configuration contenant votre `apiKey`.

#### Générer un token d'API

Consultez la [documentation Akamai sur les tokens d'API][5], puis :

1. Connectez-vous à `mpulse.soasta.com`.
2. Accédez à My Settings dans le volet de gauche.
3. Cliquez sur Generate dans la zone API token.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "akamai_mpulse" >}}


### Aide

L'intégration Akamai mPulse n'inclut aucun événement.

### Aide

L'intégration Akamai mPulse n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/akamai_datastream_2/
[2]: https://docs.datadoghq.com/fr/integrations/nginx/
[3]: https://docs.datadoghq.com/fr/integrations/mysql/
[4]: https://app.datadoghq.com/integrations/akamai-mpulse
[5]: https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_mpulse/akamai_mpulse_metadata.csv
[7]: https://docs.datadoghq.com/fr/help/