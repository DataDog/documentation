---
aliases:
- /fr/real_user_monitoring/setup
- /fr/real_user_monitoring/browser/setup/client
description: Configurez le SDK RUM Browser en utilisant l'instrumentation côté client
  avec NPM ou CDN pour surveiller l'expérience utilisateur, la performance et les
  erreurs dans les applications web.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/advanced_configuration/
  tag: Documentation
  text: Configuration avancée
- link: /session_replay/browser/
  tag: Documentation
  text: Configurer la relecture de session
- link: /real_user_monitoring/error_tracking/browser/
  tag: Documentation
  text: Configurer le suivi des erreurs
- link: /real_user_monitoring/correlate_with_other_telemetry/
  tag: Documentation
  text: Corréler les événements RUM avec d'autres données de télémétrie
title: Configuration du suivi du navigateur côté client
---
## Aperçu {% #overview %}

Le Datadog Browser SDK permet la surveillance des utilisateurs réels (RUM) pour vos applications web, offrant une visibilité complète sur l'expérience utilisateur et la performance de l'application. Avec RUM, vous pouvez surveiller les temps de chargement des pages, les interactions des utilisateurs, le chargement des ressources et les erreurs d'application en temps réel.

RUM vous aide à :

- Surveiller l'expérience utilisateur avec des métriques de performance détaillées pour les chargements de pages, les actions des utilisateurs et les requêtes de ressources
- Suivre les parcours des utilisateurs à travers votre application avec les capacités de Relecture de Session
- Identifier les goulets d'étranglement de performance et corréler la performance frontend et backend avec les traces APM

Le Browser SDK prend en charge tous les navigateurs modernes de bureau et mobiles et fournit une collecte automatique des métriques de performance clés, des interactions des utilisateurs et des erreurs d'application. Après la configuration, vous pouvez gérer vos configurations RUM par application dans Datadog et visualiser les données collectées dans des tableaux de bord et l'Explorateur RUM.

{% partial file="sdk/setup/browser.mdoc.md" /%}

#### Définir les taux d'échantillonnage de session {% #set-session-sampling-rates %}

Pour contrôler les données que votre application envoie à Datadog RUM, vous pouvez spécifier un taux d'échantillonnage pour les sessions RUM lors de l'initialisation du Browser SDK. Par exemple, pour échantillonner 80 % des sessions, définissez `sessionSampleRate` à 80 :

```javascript
datadogRum.init({
  applicationId: '<APP_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  sessionSampleRate: 80,
  sessionReplaySampleRate: 20,
  // ... other configuration options
});
```

Pour plus d'informations, consultez [Échantillonnage RUM du Navigateur et Relecture de Session][1].

## Commencez à surveiller votre application {% #start-monitoring-your-application %}

Maintenant que vous avez terminé la configuration de base pour RUM, votre application collecte les erreurs du navigateur et vous pouvez commencer à surveiller et à déboguer les problèmes en temps réel.

Visualisez les [données collectées][2] dans des [tableaux de bord][3] ou créez une requête de recherche dans le [RUM Explorer][4].

Votre application apparaît comme en attente sur la page des Applications jusqu'à ce que Datadog commence à recevoir des données.

## Prochaines étapes {% #next-steps %}

Voir [Configuration avancée][5].


[1]: /fr/real_user_monitoring/guide/sampling-browser-plans/
[2]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/
[3]: /fr/real_user_monitoring/platform/dashboards/
[4]: https://app.datadoghq.com/rum/explorer
[5]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/