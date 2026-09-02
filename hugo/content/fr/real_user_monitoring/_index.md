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
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour obtenir des informations exploitables
    grâce à la solution Real User Monitoring
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Présentation du service Real User Monitoring (RUM) de Datadog
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Améliorer l'expérience utilisateur sur mobile avec le service Mobile Real
    User Monitoring de Datadog
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: Blog
  text: Recommandations pour la surveillance des performances des applications mobiles
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Analyser les problèmes affectant vos applications avec le suivi des erreurs
    Datadog
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
  text: Concevez des tableaux de bord exécutifs efficaces avec Datadog
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De la performance à l''impact : Relier les équipes frontend grâce à un contexte
    partagé'
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions de Datadog RUM ! (Connexion à l'application
    requise)
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centre d'apprentissage
  text: Introduction à la surveillance des utilisateurs réels (RUM)
title: RUM et Session Replay
---
{{< learning-center-callout header="Participez à une session de webinaire de formation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  Découvrez comment créer des actions utilisateur personnalisées adaptées à des besoins commerciaux spécifiques, permettant un suivi précis du comportement des utilisateurs.
{{< /learning-center-callout >}}

## Qu'est-ce que la surveillance des utilisateurs réels ? {#what-is-real-user-monitoring}

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="Tableau de bord RUM" >}}

La *surveillance des utilisateurs réels (RUM)* de Datadog vous offre une visibilité de bout en bout sur l'activité et l'expérience en temps réel des utilisateurs individuels. RUM résout quatre types de cas d'utilisation pour la surveillance des applications web et mobiles :

* **Performance** : Suivez la performance des pages web, des écrans d'applications mobiles, des actions des utilisateurs, des requêtes réseau et de votre code frontend.
* **Gestion des erreurs** : Surveillez les bugs et problèmes en cours et suivez-les au fil du temps et des versions.
* **Analyse / Utilisation** : Comprenez qui utilise votre application (pays, appareil, OS), suivez les parcours des utilisateurs individuels et analysez comment les utilisateurs interagissent avec votre application (page la plus visitée, clics, interactions et utilisation des fonctionnalités).
* **Support** : Récupérez toutes les informations liées à une session utilisateur pour résoudre un problème (durée de la session, pages visitées, interactions, ressources chargées et erreurs).

### Définition de session {#session-definition}

Une session utilisateur est un parcours utilisateur sur votre application web ou mobile. Une session inclut tous les événements de navigation associés (Vues RUM), les actions des utilisateurs (Actions RUM), les requêtes réseau (Ressources RUM), les plantages et erreurs (Erreurs RUM), ainsi que d'autres événements et signaux qui produisent collectivement une représentation fidèle de l'expérience utilisateur.

Une session RUM peut durer jusqu'à 4 heures et expire après 15 minutes d'inactivité. Si l'utilisateur interagit avec l'application après l'une des limites, une nouvelle session commence automatiquement.

### Limitations techniques {#technical-limitations}

| Propriété                                   | Limitation               |
| ------------------------------------------ | ------------------------ |
| Durée maximale d'une session              | 4 heures                  |
| Délai d'une session                       | 15 minutes d'inactivité |
| Nombre maximum d'événements par session       | 10 millions d'événements              |
| Nombre maximum d'attributs par événement     | 1 000                    |
| Profondeur maximale des attributs par événement          | 20                       |
| Taille maximale d'un événement                         | 1 Mo                     |
| Taille maximale de la charge utile d'entrée                | 5 Mo                     |
| Taille maximale des fichiers de carte source et de mappage | 500 Mo par fichier          |
| Taille maximale des fichiers dSYM                    | 2 Go par fichier            |
| Délai maximal à l'ingestion                 | 24 heures                 |

Si un événement dépasse l'une des limitations techniques énumérées ci-dessus, il est rejeté par l'entrée de Datadog.

## What is Session Replay? {#what-is-session-replay}

Datadog's *Session Replay* allows you to capture and visually replay the web browsing experience of your users.

Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs, et vous fournit des informations utiles sur les tendances d'utilisation et les défauts de conception de votre application Web.

## Commencer {#get-started}

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

</br>

### Capabilities and platform support {#capabilities-and-platform-support} → ### Fonctionnalités et prise en charge de la plateforme {#capabilities-and-platform-support}

**Remarque** : Le SDK Flutter de Datadog n'est pas pris en charge pour MacOS, Windows ou Linux.

Le tableau suivant répertorie les fonctionnalités RUM qui sont prises en charge sur chaque plateforme :

| Feature                               | Browser | Android | iOS |   Flutter   | React Native | Roku | KMP | Unity |  Notes |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-----|-------|--------|
| Envoyer les journaux à Datadog | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Traçage distribué des requêtes réseau | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku** ne peut suivre que certains types de requêtes HTTP.<br> - **Unity** utilise un wrapper autour de `UnityWebRequest` pour effectuer le suivi des requêtes. |
| Suivre les vues et les actions (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - Toutes les actions suivies dans **Flutter Web** sont enregistrées en tant que `custom`. <br> - **Roku** et **Unity** ne prennent en charge que le suivi manuel des actions. |
| Suivi des Feature Flags et suivi des versions | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Suivi des erreurs et mappage des sources | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Seulement partiellement pris en charge pour **React Native**. |
| Suivi des plantages, symbolisation et déobfuscation | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |  |
| Stop sessions (Kiosk Monitoring) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}}  |  |
| Suivre les événements dans les WebViews |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Surveiller les indicateurs spécifiques à la plateforme | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Suivi global des contextes/attributs dans les journaux | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Traçage côté client |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | **Flutter** Session Replay est en préversion. |
| Signaux de frustration | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | Partiellement pris en charge pour tous les appareils **mobiles** et **Roku**. |

## Points de terminaison pris en charge pour les domaines SDK {#supported-endpoints-for-sdk-domains}

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

## Explorer Datadog RUM {#explore-datadog-rum}

Accédez à RUM en naviguant vers [**Expérience numérique > Résumé des performances**][1].

Sélectionnez une application dans la barre de navigation supérieure, ou suivez les instructions de configuration pour le [navigateur][15] ou le [mobile][16] afin d'ajouter votre première application.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="Sélectionnez une application RUM" >}}

**Astuce** : Pour ouvrir RUM à partir de la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `real user monitoring`.

## Résumé de la surveillance des performances {#performance-monitoring-summary}

| Résumé des performances du navigateur | Résumé des performances mobiles |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="Page de résumé de la surveillance des performances RUM pour une application de navigateur" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="Page de résumé de la surveillance des performances RUM pour une application mobile" >}} | 

La page de [résumé de la surveillance des performances RUM][1] fournit des informations pertinentes et exploitables pour les applications web et mobiles. Vous avez une expérience personnalisée pour chaque plateforme qui vous aide à :

- **Concentrez-vous sur les points de données clés** par plateforme, tels que la latence de l'interface utilisateur pour les applications web ou les plantages mobiles
- **Surveillez la santé de l'application** à l'aide d'indicateurs clés de performance familiers, tels que les Core Web Vitals pour les applications web ou le taux de blocage pour iOS, afin d'évaluer la fiabilité de l'application
- **Plongez directement dans les investigations** à partir de widgets interactifs sans quitter la page

Pour **les applications web**, utilisez la barre de recherche pour filtrer les données, identifier les pages lentes et suivre l'interface utilisateur jusqu'à la page [RUM Optimization Inspect][17].

Pour **les applications mobiles**, examinez les plantages récents en bas de la page et utilisez le panneau latéral [Error Tracking][6] pour le dépannage.

### Tableaux de bord prêts à l'emploi {#out-of-the-box-dashboards}

Consultez les [dashboards RUM prêts à l'emploi][2] pour analyser les informations recueillies automatiquement sur vos sessions utilisateur, performances, applications mobiles, signaux de frustration, ressources réseau et erreurs.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="Tableau de bord RUM" >}}

### RUM Explorer and visualizations {#rum-explorer-and-visualizations}

Visualisez les sessions des utilisateurs en segments, par exemple en vérifiant quand la latence impacte vos clients premium, avec [visualisations][3]. Explorez les données, enregistrez des vues et créez des [moniteurs][4] sur vos recherches personnalisées.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM Analytics" video=true >}}

### Intégration avec les journaux, APM et profileur {#integration-with-logs-apm-and-profiler}

Plongez au cœur de vos [métriques d'infrastructure, logs et traces backend][5] jusqu'à identifier la ligne de code précise qui nuit aux performances de votre application, afin d'améliorer l'expérience de vos utilisateurs et résoudre les problèmes signalés.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM et APM" >}}

### Suivi des erreurs et rapport de plantage {#error-tracking-and-crash-reporting}

Recevez des alertes automatisées en cas d'anomalies, de groupes d'erreurs, d'expirations et de crashs pour réduire considérablement votre MTTR avec le [suivi des erreurs][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="Suivi des erreurs RUM" video=true >}}

### Indicateurs vitaux web et mobiles {#web-and-mobile-vitals}

Consultez les scores et données télémétriques de performance de vos [applications Browser][7], comme les signaux Web essentiels et signaux mobiles pour les applications [iOS et tvOS][8] ou [Android et Android TV][9].

### Suivi de la vue web {#web-view-tracking}

Recueillez des informations à propos de vos applications Web natives et consultez des vues hybrides grâce au suivi des vues Web pour [iOS et tvOS][10] ou [Android et Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Vues Web capturées lors d'une session utilisateur dans l'Explorateur RUM" >}}

## Explore Datadog Session Replay {#explore-datadog-session-replay}

### Session Replays {#session-replays}

Visionnez des [enregistrements du navigateur][12] d'utilisateurs réels qui interagissent avec votre site Web et définissez des [options de confidentialité][13] pour votre organisation.

### Outils de développement {#developer-tools}

Les [outils de développement Browser][14] vous permettent de consulter les logs et les erreurs générés, ainsi que des données de performance, pendant que vous résolvez les problèmes de vos applications.


## Permissions {#permissions}

Par défaut, tous les utilisateurs peuvent modifier la configuration RUM d'une application.

Utilisez des contrôles d'accès granulaires pour limiter les [rôles][18] autorisés à modifier la configuration RUM d'une application donnée :
1. While viewing an application's RUM configuration, click on the **Edit application** button at the top of the screen. Un menu déroulant apparaît.
1. Sélectionnez **Gérer les autorisations de l’application**.
1. Cliquez sur **Restreindre l'Accès**.
1. La boîte de dialogue se met à jour pour indiquer que les membres de votre organisation disposent, par défaut, de l’accès **Lecteur**.
1. Utilisez le menu déroulant pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs qui peuvent modifier le notebook.
1. Cliquez sur **Ajouter**.
1. La boîte de dialogue se met à jour pour indiquer que le rôle que vous avez sélectionné possède l’autorisation **Éditeur**.
1. Cliquez sur **Enregistrer**.

**Remarque :** Pour maintenir votre accès d'édition à l'application, le système exige que vous incluiez au moins un rôle dont vous êtes membre avant d'enregistrer.

Vous devez avoir un accès d'édition pour restaurer l'accès général à une application restreinte. Complétez les étapes suivantes :
1. Lors de la visualisation de la configuration RUM d'une application, cliquez sur le bouton **Modifier l'application** en haut de l'écran. Un menu déroulant apparaît.
1. Sélectionnez **Gérer les autorisations de l’application**.
1. Cliquez sur **Restaurer l'Accès Complet**.
1. Cliquez sur **Enregistrer**.


## Lectures complémentaires {#further-reading}

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
[13]: /fr/session_replay/browser/privacy_options/
[14]: /fr/session_replay/browser/dev_tools/
[15]: /fr/real_user_monitoring/application_monitoring/browser/setup/
[16]: /fr/real_user_monitoring/application_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /fr/account_management/rbac/