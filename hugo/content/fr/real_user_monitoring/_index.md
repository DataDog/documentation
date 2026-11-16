---
algolia:
  tags:
  - rum
  - real user monitoring
aliases:
- /fr/real_user_monitoring/installation
- /fr/real_user_monitoring/faq/
cascade:
  algolia:
    rank: 70
description: Visualisez, observez et analysez les performances de vos applications
  frontend, telles qu'elles sont perçues par vos utilisateurs.
disable_sidebar: true
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: Documentation
  text: Données RUM Browser recueillies
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centre d'apprentissage
  text: Introduction au Real User Monitoring (RUM)
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour obtenir des informations exploitables
    grâce à la solution Real User Monitoring
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: Blog
  text: Comprenez plus rapidement les replays de session grâce aux résumés générés
    par IA et aux chapitres intelligents.
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Présentation du service Datadog Real User Monitoring
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Améliorer l'expérience utilisateur sur mobile avec Datadog Mobile Real User
    Monitoring
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: Blog
  text: Recommandations pour la surveillance des performances des applications mobiles
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Analyser les problèmes affectant vos applications avec Datadog Error Tracking
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: Blog
  text: Unifier les données RUM et APM pour optimiser votre visibilité sur l'ensemble
    de votre stack
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utilisez des coordonnées Geomap pour visualiser les données de votre application
    par localisation
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: Blog
  text: Bénéficier de données RUM plus utiles grâce à nos composants React personnalisés
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: Blog
  text: Surveiller vos applications mobiles hybrides avec Datadog
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: Blog
  text: Comment l'équipe Technical Solutions de Datadog utilise les solutions RUM,
    Session Replay et Error Tracking pour résoudre les problèmes rencontrés par les
    clients
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Meilleures pratiques pour la surveillance des applications Web statiques
- link: https://www.datadoghq.com/blog/progressive-web-application-monitoring/
  tag: Blog
  text: Meilleures pratiques pour la surveillance des applications web progressives
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des dashboards exécutifs efficaces avec Datadog
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De la performance à l''impact : rapprocher les équipes frontend grâce à un
    contexte partagé'
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions de Datadog RUM ! (Connexion à l'application
    requise)
title: RUM et Session Replay
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  Découvrez comment créer des actions utilisateur personnalisées adaptées à des besoins métier spécifiques, permettant un suivi précis du comportement des utilisateurs.
{{< /learning-center-callout >}}

## Qu'est-ce que le Real User Monitoring ? {#what-is-real-user-monitoring}

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="Dashboard RUM" >}}

Le *Real User Monitoring (RUM)* de Datadog vous offre une visibilité de bout en bout sur l'activité et l'expérience en temps réel des utilisateurs individuels. Le RUM répond à quatre types de cas d'utilisation pour la surveillance des applications web et mobiles :

* **Performance** : Suivez les performances des pages web, des écrans d'applications mobiles, des actions utilisateur, des requêtes réseau et de votre code frontend.
* **Gestion des erreurs** : Surveillez les bugs et les problèmes en cours et suivez-les au fil du temps et des versions.
* **Analytique / Utilisation** : Comprenez qui utilise votre application (pays, appareil, OS), surveillez les parcours des utilisateurs individuels et analysez comment ces derniers interagissent avec votre application (page la plus visitée, clics, interactions et utilisation des fonctionnalités).
* **Support** : Récupérez toutes les informations relatives à une session utilisateur pour résoudre un problème (durée de la session, pages visitées, interactions, ressources chargées et erreurs).

### Définition de session {#session-definition}

Une session utilisateur est un parcours utilisateur sur votre application web ou mobile. Une session inclut tous les événements de navigation associés (vues RUM), les actions utilisateur (actions RUM), les requêtes réseau (ressources RUM), les plantages et erreurs (erreurs RUM), ainsi que d'autres événements et signaux qui produisent collectivement une représentation fidèle de l'expérience utilisateur.

Une session RUM peut durer jusqu'à 4 heures et expire après 15 minutes d'inactivité. Si l'utilisateur interagit avec l'application après l'une ou l'autre de ces limites, une nouvelle session démarre automatiquement.

### Limitations techniques {#technical-limitations}

| Propriété                                   | Limitation               |
| ------------------------------------------ | ------------------------ |
| Durée maximale d'une session              | 4 heures                  |
| Délai d'expiration d'une session                       | 15 minutes d'inactivité |
| Nombre maximal d'événements par session       | 10 millions              |
| Nombre maximal d'attributs par événement     | 1 000                    |
| Profondeur maximale des attributs par événement          | 20                       |
| Taille maximale d'un événement                         | 1 Mo                     |
| Taille maximale de la charge utile d'ingestion                | 5 Mo                     |
| Taille maximale des maps source et des fichiers de mappage | 500 Mo par fichier          |
| Taille maximale des fichiers dSYM                    | 2 Go par fichier            |
| Délai maximal lors de l'ingestion                 | 24 heures                 |

Si un événement dépasse l'une des limitations techniques énumérées ci-dessus, il est rejeté par l'ingestion Datadog.

## Qu'est-ce que Session Replay ? {#what-is-session-replay}

*Session Replay* de Datadog vous permet de capturer et de rejouer visuellement l'expérience de navigation web de vos utilisateurs.

Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs, et vous fournit des informations utiles sur les tendances d'utilisation et les défauts de conception de votre application Web.

## Démarrez {#get-started}

Sélectionnez un type d'application pour commencer à recueillir des données RUM :

{{< card-grid card_width="210" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/ios_large.svg" alt="ios" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup" src="integrations_logos/react-native_large.svg" alt="react native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup" src="integrations_logos/flutter_large.svg" alt="flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="android tv" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/tv_os_large.svg" alt="tv OS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup" src="integrations_logos/kotlin-multiplatform_large.svg" alt="Kotlin Multiplatform" >}}
{{< /card-grid >}}

### Fonctionnalités et prise en charge des plateformes {#capabilities-and-platform-support}

**Remarque** : Le SDK Flutter de Datadog n'est pas pris en charge pour MacOS, Windows ou Linux.

Le tableau suivant répertorie les fonctionnalités RUM qui sont prises en charge sur chaque plateforme :

| Fonctionnalité                               | Navigateur | Android | iOS |   Flutter   | React Native | Roku | KMP | Unity |  Notes |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-----|-------|--------|
| Envoyer les logs à Datadog  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Traçage distribué des requêtes réseau | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku** est uniquement capable de suivre certains types de requêtes HTTP.<br> - **Unity** utilise un wrapper autour de `UnityWebRequest` pour effectuer le suivi des requêtes. |
| Suivi des vues et des actions (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - Toutes les actions suivies dans **Flutter Web** sont enregistrées en tant que `custom`. <br> - **Roku** et **Unity** prennent uniquement en charge le suivi manuel des actions. |
| Suivi des Feature Flags et suivi des versions | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Suivi des erreurs et mappage des sources | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Suivi des plantages, symbolisation et désobfuscation | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |  |
| Arrêt des sessions (surveillance de kiosque) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}}  |  |
| Suivi des événements dans les WebViews |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Surveillance des indicateurs vitaux spécifiques à la plateforme | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Suivi du contexte/des attributs globaux dans les logs  | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Suivi côté client |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | **Flutter** Session Replay est en préversion. |
| Signaux de frustration | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | Uniquement partiellement pris en charge pour tous les appareils **mobile** et **Roku**. |

## Endpoints pris en charge pour les domaines SDK {#supported-endpoints-for-sdk-domains}

Tout le trafic des SDK Datadog est transmis via SSL (par défaut, sur le port 443) aux domaines suivants :

| Site | URL du site                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| US2-FED  | `https://browser-intake-us2-ddog-gov.com` |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |
| UK1  | `https://browser-intake-uk1-datadoghq.com`    |

### Endpoints supplémentaires pour le profilage de navigateur {#additional-endpoints-for-browser-profiling}

Lorsque le [Browser Profiling][19] est activé, le SDK contacte également une API de quota pour déterminer si le profilage est autorisé pour la session en cours. Ceci utilise un `quota.` sous-domaine de l'origine d'ingestion standard :

| Site | Quota API URL |
|------|-----------------------------------------------------------|
| US1  | `https://quota.browser-intake-datadoghq.com`             |
| US3  | `https://quota.browser-intake-us3-datadoghq.com`         |
| US5  | `https://quota.browser-intake-us5-datadoghq.com`         |
| EU1  | `https://quota.browser-intake-datadoghq.eu`              |
| US1-FED  | `https://quota.browser-intake-ddog-gov.com`          |
| US2-FED  | `https://quota.browser-intake-us2-ddog-gov.com`      |
| AP1  | `https://quota.browser-intake-ap1-datadoghq.com`         |
| AP2  | `https://quota.browser-intake-ap2-datadoghq.com`         |
| UK1  | `https://quota.browser-intake-uk1-datadoghq.com`         |

Si vous utilisez un [proxy][20] ou avez une [Content Security Policy (CSP)][21], assurez-vous que ces domaines `quota.` sont également autorisés. Consultez la page [Configuration du profilage de navigateur][19] pour plus de détails.

## Explorer Datadog RUM {#explore-datadog-rum}

Accédez à RUM en naviguant vers [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}}][1].

Sélectionnez une application dans la barre de navigation supérieure, ou suivez les instructions de configuration pour le [navigateur][15] ou le [mobile][16] afin d'ajouter votre première application.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="Sélectionnez une application RUM" >}}

**Astuce** : Pour ouvrir RUM depuis la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `real user monitoring`.

## Résumé de la surveillance des performances {#performance-monitoring-summary}

| Résumé des performances du navigateur | Résumé des performances mobiles |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="Page de résumé de la surveillance des performances RUM pour une application de navigateur" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="Page de résumé de la surveillance des performances RUM pour une application mobile" >}} | 

La page [Résumé de la surveillance des performances RUM][1] fournit des informations pertinentes et exploitables pour les applications web et mobiles. Vous disposez d'une expérience adaptée à chaque plateforme qui vous aide à :

- **Concentrez-vous sur des points de données clés** par plateforme, tels que la latence de l'interface utilisateur pour le web ou les plantages mobiles.
- **Surveillez la santé de l'application** via des indicateurs clés de performance (KPI) familiers, tels que les Core Web Vitals pour les applications web ou le taux de blocage pour iOS, afin d'évaluer la fiabilité de l'application
- **Plongez directement dans les investigations** depuis des widgets interactifs sans quitter la page

Pour les **applications web**, utilisez la barre de recherche pour filtrer les données, identifier les pages lentes et suivre l'interface utilisateur jusqu'à la page [RUM Optimization Inspect][17].

Pour les **applications mobiles**, examinez les plantages récents en bas de la page et utilisez le panneau latéral [Error Tracking][6] pour le dépannage.

### Dashboards prêts à l'emploi {#out-of-the-box-dashboards}

Consultez les [dashboards RUM prêts à l'emploi][2] pour analyser les informations recueillies automatiquement sur vos sessions utilisateur, performances, applications mobiles, signaux de frustration, ressources réseau et erreurs.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="Dashboard RUM" >}}

### RUM Explorer et visualisations {#rum-explorer-and-visualizations}

Affichez les sessions utilisateur par segments, par exemple pour vérifier quand la latence affecte vos clients premium, avec les [visualisations][3]. Explorez les données, enregistrez des vues et créez des [monitors][4] sur vos recherches personnalisées.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM Analytics" video=true >}}

### Intégration avec les logs, APM et le profiler {#integration-with-logs-apm-and-profiler}

Plongez au cœur de vos [métriques d'infrastructure, logs et traces backend][5] jusqu'à identifier la ligne de code précise qui nuit aux performances de votre application, afin d'améliorer l'expérience de vos utilisateurs et résoudre les problèmes signalés.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM et APM" >}}

### Suivi des erreurs et rapports de crash {#error-tracking-and-crash-reporting}

Recevez des alertes automatisées en cas d'anomalies, de groupes d'erreurs, d'expirations et de crashs pour réduire considérablement votre MTTR avec [Error Tracking][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="Suivi des erreurs RUM" video=true >}}

### Indicateurs vitaux web et mobiles {#web-and-mobile-vitals}

Consultez les scores de performance et la télémétrie pour les [applications de navigateur][7] telles que Core Web Vitals et Mobile Vitals pour [iOS, iPadOS, tvOS et visionOS][8] ou les [applications Android et Android TV][9].

### Suivi des Web Views {#web-view-tracking}

Collectez des informations depuis vos applications web natives et explorez les vues hybrides avec Web View Tracking pour [iOS, iPadOS et visionOS][10] ou [Android et Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Web Views capturées lors d'une session utilisateur dans le RUM Explorer" >}}

## Explorez Datadog Session Replay {#explore-datadog-session-replay}

### Session replays {#session-replays}

Visionnez des [enregistrements du navigateur][12] d'utilisateurs réels qui interagissent avec votre site Web et définissez des [options de confidentialité][13] pour votre organisation.

### Outils de développement {#developer-tools}

Les [outils de développement Browser][14] vous permettent de consulter les logs et les erreurs générés, ainsi que des données de performance, pendant que vous résolvez les problèmes de vos applications.


## Autorisations {#permissions}

Par défaut, tous les utilisateurs peuvent modifier la configuration RUM d'une application.

Utilisez des contrôles d'accès granulaires pour limiter les [rôles][18] autorisés à modifier la configuration RUM d'une application donnée :
1. Tout en consultant la configuration RUM d'une application, cliquez sur le bouton {{< ui >}}Edit application{{< /ui >}} en haut de l'écran. Une liste déroulante apparaît.
1. Sélectionnez {{< ui >}}Manage App Permissions{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que les membres de votre organisation ont un accès {{< ui >}}Viewer{{< /ui >}} par défaut.
1. Utilisez la liste déroulante pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs pouvant modifier le notebook.
1. Cliquez sur {{< ui >}}Add{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que le rôle que vous avez sélectionné dispose de l'autorisation {{< ui >}}Editor{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque :** Pour conserver votre accès en modification à l'application, le système exige que vous incluiez au moins un rôle dont vous êtes membre avant d'enregistrer.

Vous devez disposer d'un accès en modification pour rétablir l'accès général à une application restreinte. Effectuez les étapes suivantes :
1. Tout en consultant la configuration RUM d'une application, cliquez sur le bouton {{< ui >}}Edit application{{< /ui >}} en haut de l'écran. Une liste déroulante apparaît.
1. Sélectionnez {{< ui >}}Manage App Permissions{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restore Full Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /fr/real_user_monitoring/platform/dashboards/
[3]: /fr/real_user_monitoring/explorer/visualize/
[4]: /fr/monitors/types/real_user_monitoring/
[5]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[6]: /fr/real_user_monitoring/error_tracking/
[7]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /fr/real_user_monitoring/application_monitoring/ios/mobile_vitals/
[9]: /fr/real_user_monitoring/application_monitoring/android/mobile_vitals/
[10]: /fr/real_user_monitoring/application_monitoring/ios/web_view_tracking/
[11]: /fr/real_user_monitoring/application_monitoring/android/web_view_tracking/
[12]: /fr/session_replay/browser/
[13]: /fr/session_replay/privacy_options?platform=browser
[14]: /fr/session_replay/dev_tools
[15]: /fr/real_user_monitoring/application_monitoring/browser/setup/
[16]: /fr/real_user_monitoring/application_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /fr/account_management/rbac/
[19]: /fr/real_user_monitoring/correlate_with_other_telemetry/profiling
[20]: /fr/real_user_monitoring/guide/proxy-rum-data
[21]: /fr/integrations/content_security_policy_logs