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
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions de la solution RUM Datadog (connexion à l'application
    requise).
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
  text: Analyser les problèmes affectant vos applications avec la solution Error Tracking
    de Datadog
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: Blog
  text: Unifier les données RUM et APM pour optimiser votre visibilité sur l'ensemble
    de votre stack
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utiliser les geomaps pour visualiser les données de votre application par
    région
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
- link: /real_user_monitoring/browser/data_collected/
  tag: Documentation
  text: Données RUM recueillies (Browser)
- link: https://www.datadoghq.com/blog/progressive-web-application-monitoring/
  tag: Blog
  text: Meilleures pratiques pour la surveillance des applications web progressives
title: RUM et Session Replay
---


{{< learning-center-callout header="Participez à un webinar de formation" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  Découvrez comment créer des actions utilisateur personnalisées adaptées à des besoins métier spécifiques, afin de permettre un suivi précis du comportement des utilisateurs.
{{< /learning-center-callout >}}

## En quoi consiste la solution Real User Monitoring ?

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="Dashboard RUM" >}}

Le service *Real User Monitoring (RUM)* de Datadog vous offre une visibilité de bout en bout sur les activités et l'expérience en temps réel de chaque utilisateur. Cette solution de surveillance d'applications Web et mobiles répond à quatre besoins différents : 

* **Mesure des performances** : suivez les performances des pages Web, des écrans d'applications mobiles, des actions utilisateur, des requêtes réseau, ainsi que de votre code frontend.
* **Gestion des erreurs** : surveillez les bugs et problèmes en cours et suivez leur évolution et leurs versions.
* **Analyses/Utilisation** : analysez le profil des utilisateurs de votre application (pays, appareil, système d'exploitation), surveillez des parcours utilisateur individuels et examinez les interactions des utilisateurs avec votre application (pages couramment consultées, clics, interactions et utilisation des fonctionnalités).
* **Assistance** : récupérez toutes les informations associées à une session utilisateur (durée de session, pages consultées, interactions, ressources chargées et erreurs) afin de diagnostiquer un problème.

Une session utilisateur désigne une visite de votre application Web ou mobile par un utilisateur. Elle peut durer jusqu'à 4 heures. Une session inclut généralement la consultation de plusieurs pages ainsi que les données de télémétrie associées. Si un utilisateur n'interagit pas avec une application pendant 15 minutes, la session prend fin. Une nouvelle session démarre lorsque l'utilisateur interagit à nouveau avec l'application.

## En quoi consiste la solution Session Replay ?

La solution *Session Replay* de Datadog vous permet d'enregistrer et de revoir l'expérience de navigation de vos utilisateurs.

Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs, et vous fournit des informations utiles sur les tendances d'utilisation et les défauts de conception de votre application Web.

## Prise en main

Sélectionnez un type d'application pour commencer à recueillir des données RUM :

{{< partial name="rum/rum-getting-started.html" >}}

</br>

### Prise en charge des différentes fonctionnalités selon la plateforme

**Remarque** : le SDK Flutter Datadog n'est pas compatible avec macOS, Windows et Linux.

Le tableau suivant répertorie les fonctionnalités RUM qui sont prises en charge sur chaque plateforme :

| Fonctionnalité                               | Navigateur | Android | iOS |   Flutter   | React Native | Roku | Remarques |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-------|
| Envoi de logs à Datadog  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Tracing distribué de requêtes réseau | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | Le **SDK Roku Datadog** peut uniquement suivre certains types de requêtes HTTP. |
| Suivi de vues et d'actions (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | - Toutes les actions suivies avec **Flutter Web** possèdent le statut `custom`. <br> - **Roku** prend uniquement en charge le suivi manuel des actions. |
| Suivi des feature flags et versions | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Suivi des erreurs et mappage source | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Prise en charge partielle, uniquement pour **React Native** |
| Suivi des crashs, décodage et désobfuscation | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Arrêt de sessions (surveillance d'application kiosque) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Suivi d'événements dans des vues Web |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Surveillance des signaux propres à la plateforme | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Suivi du contexte global et des attributs dans les logs  | {{< X >}} |  |  |  |  |  |  |
| Tracing côté client |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Signaux de frustration | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Prise en charge partielle, pour tous les appareils **mobiles** et **Roku** |

## Endpoints pris en charge pour les domaines de SDK

Tout le trafic des SDK Datadog est transmis via SSL (par défaut, sur le port 443) aux domaines suivants :

| Site | URL du site                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |

## Explorer la solution RUM de Datadog

Accédez au RUM en accédant à [**Digital Experience > Performance Summary**][1].

Sélectionnez une application dans la barre de navigation supérieure, ou suivez les instructions de configuration pour le [navigateur][15] ou le [mobile][16] afin d'ajouter votre première application.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="Sélectionner une application RUM" >}}

**Astuce** : pour ouvrir le RUM à partir de la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `real user monitoring`.

## Résumé du suivi des performances

| Résumé des performances du navigateur | Résumé des performances mobiles |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="Page de résumé du monitoring des performances RUM pour une application sur navigateur" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="Page de résumé du monitoring des performances RUM pour une application sur mobile" >}} | 

La page de [résumé du monitoring des performances RUM][1] fournit des informations pertinentes et exploitables pour les applications web et mobiles. Vous bénéficiez d'une expérience adaptée à chaque plateforme, qui vous aide à :

- **Se concentrer sur les points de données clés** par plateforme, tels que la latence de l'interface utilisateur pour les crashs web ou mobiles.
- **Surveiller la santé de l'application** à l'aide d'indicateurs clés familiers, comme les Core Web Vitals pour les applications web ou le taux de blocage pour iOS, afin d'évaluer la fiabilité de l'application
- **Lancer directement vos investigations** depuis les widgets interactifs sans quitter la page

Pour les **applications web**, utilisez la barre de recherche pour filtrer les données, identifier les pages lentes et suivre l'interface jusqu'à la page [RUM Optimization Inspect][17].

Pour les **applications mobiles**, consultez les pannes récentes en bas de la page et utilisez le panneau latéral [Error Tracking][6] pour le diagnostic.

### Dashboards prêts à l'emploi

Consultez les [dashboards RUM prêts à l'emploi][2] pour analyser les informations recueillies automatiquement sur vos sessions utilisateur, performances, applications mobiles, signaux de frustration, ressources réseau et erreurs.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="Dashboard RUM" >}}

### RUM Explorer et visualisations

Vous pouvez segmenter vos sessions utilisateur. Utilisez par exemple des [visualisations][3] pour vérifier les niveaux de latence ayant un impact sur vos clients les plus importants. Explorez vos données, enregistrez des vues et créez des [monitors][4] basés sur vos recherches personnalisées.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="Analyses RUM" video=true >}}

### Intégration aux logs, à l'APM et au profileur

Plongez au cœur de vos [métriques d'infrastructure, logs et traces backend][5] jusqu'à identifier la ligne de code précise qui nuit aux performances de votre application, afin d'améliorer l'expérience de vos utilisateurs et résoudre les problèmes signalés.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM and APM" >}}

### Suivi des erreurs et rapports de crash

Recevez des alertes automatisées en cas d'anomalies, de groupes d'erreurs, d'expirations et de crashs pour réduire considérablement votre MTTR avec le [suivi des erreurs][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="Suivi des erreurs RUM" video=true >}}

### Signaux mobiles et Web

Consultez les scores et données télémétriques de performance de vos [applications Browser][7], comme les signaux Web essentiels et signaux mobiles pour les applications [iOS et tvOS][8] ou [Android et Android TV][9].

### Suivi des vues Web

Recueillez des informations à propos de vos applications Web natives et consultez des vues hybrides grâce au suivi des vues Web pour [iOS et tvOS][10] ou [Android et Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Vues Web enregistrées lors une session utilisateur et affichées dans le RUM Explorer" >}}

## Explorer les enregistrements Session Replay Datadog

### Session replays

Visionnez des [enregistrements du navigateur][12] d'utilisateurs réels qui interagissent avec votre site Web et définissez des [options de confidentialité][13] pour votre organisation.

### Outils de développement

Les [outils de développement Browser][14] vous permettent de consulter les logs et les erreurs générés, ainsi que des données de performance, pendant que vous résolvez les problèmes de vos applications.


## Autorisations

Par défaut, tous les utilisateurs peuvent modifier la configuration RUM d'une application.

Utilisez des contrôles d'accès granulaires pour limiter les [rôles][18] autorisés à modifier la configuration RUM d'une application donnée :
1. Lorsque vous consultez la configuration RUM d'une application, cliquez sur le bouton **Edit application** en haut de l'écran. Un menu déroulant apparaît.
1. Sélectionnez **Manage App Permissions**.
1. Cliquez sur **Restrict Access**.
1. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Depuis la liste déroulante, sélectionnez les rôles, équipes ou utilisateurs autorisés à modifier le notebook.
1. Cliquez sur **Add**.
1. La boîte de dialogue indique alors que le rôle sélectionné possède l'autorisation **Editor**.
1. Cliquez sur **Save**.

**Remarque :** Pour conserver vos droits de modification sur l'application, le système exige que vous incluiez au moins un rôle dont vous êtes membre avant d'enregistrer.

Vous devez disposer des droits de modification pour rétablir l'accès général à une application restreinte. Suivez les étapes ci-dessous :
1. Lorsque vous consultez la configuration RUM d'une application, cliquez sur le bouton **Edit application** en haut de l'écran. Un menu déroulant apparaît.
1. Sélectionnez **Manage App Permissions**.
1. Cliquez sur **Restore Full Access**.
1. Cliquez sur **Save**.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /fr/real_user_monitoring/platform/dashboards/
[3]: /fr/real_user_monitoring/explorer/visualize/
[4]: /fr/monitors/types/real_user_monitoring/
[5]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[6]: /fr/real_user_monitoring/error_tracking/
[7]: /fr/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /fr/real_user_monitoring/ios/mobile_vitals/
[9]: /fr/real_user_monitoring/android/mobile_vitals/
[10]: /fr/real_user_monitoring/ios/web_view_tracking/
[11]: /fr/real_user_monitoring/android/web_view_tracking/
[12]: /fr/real_user_monitoring/session_replay/browser/
[13]: /fr/real_user_monitoring/session_replay/browser/privacy_options/
[14]: /fr/real_user_monitoring/session_replay/browser/developer_tools/
[15]: /fr/real_user_monitoring/browser/setup/
[16]: /fr/real_user_monitoring/mobile_and_tv_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /fr/account_management/rbac/