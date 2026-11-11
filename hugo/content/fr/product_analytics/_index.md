---
aliases:
- /fr/real_user_monitoring/product_analytics
- /fr/real_user_monitoring/guide/rum-for-product-analytics
description: Product Analytics vous aide à comprendre l'utilisation de votre application
  en un coup d'œil.
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: Documentation
  text: Analytics Explorer
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centre d'apprentissage
  text: Bien démarrer avec Product Analytics
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: Centre d'apprentissage
  text: Définir le comportement utilisateur avec des actions labellisées dans Product
    Analytics
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: Blog
  text: L'écart de latence du signal produit qui ralentit votre croissance
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: Blog
  text: Comprenez plus rapidement les Session Replays grâce aux résumés IA et aux
    chapitres intelligents
- link: https://www.datadoghq.com/blog/product-data-best-practices
  tag: Blog
  text: Ce que disent réellement vos données de produit
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: Blog
  text: Utilisez des métriques de garde-fou et cessez de microgérer vos déploiements.
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: Blog
  text: Prenez des décisions produit plus rapides et plus pertinentes avec Datadog
    Product Analytics
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De la performance à l''impact : rapprocher les équipes frontend grâce à un
    contexte partagé'
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Prenez des décisions de conception basées sur les données avec Product Analytics
title: Product Analytics
---
{{< learning-center-callout header="Essayez la prise en main de Product Analytics dans le Learning Center" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/getting-started-product-analytics">}}
  Apprenez à définir des métriques de produit numérique significatives et à les visualiser dans Product Analytics avec un compte d'essai Datadog. Inscrivez-vous gratuitement dès aujourd'hui !
{{< /learning-center-callout >}}

## Présentation {#overview}

Product Analytics vous aide à mieux comprendre le comportement des utilisateurs et à prendre des décisions fondées sur les données. Il prend en charge les cas d'utilisation suivants dans votre application :

- [Comprenez l'adoption du produit](#understand-product-adoption)
- [Suivez les taux de conversion et leur évolution au fil du temps](#track-conversion-rates-and-their-evolution-over-time)
- [Suivez les modèles de comportement clés des utilisateurs](#track-key-user-behavior-patterns)
- [Visualisez les interactions des utilisateurs](#visualize-user-interactions)

## Instrumentez votre application {#instrument-your-application}

Product Analytics collecte les données d'activité des utilisateurs côté client via le SDK Datadog. Vous pouvez également envoyer des événements côté serveur via l'API pour compléter vos données côté client.

Pour commencer, [ajoutez le SDK Datadog](#track-client-side-events-sdk) à votre application et [activez Product Analytics](#enable-product-analytics) dans Datadog. Vous pouvez également [envoyer des événements côté serveur via l'API](#track-server-side-events-api).

<div class="alert alert-info">Product Analytics utilise les mêmes SDK et la même configuration que <a href="/real_user_monitoring/#what-is-real-user-monitoring">Real User Monitoring (RUM)</a>, et conserve les données pendant 15 mois par défaut. Consultez <a href="/data_security/data_retention_periods/">les périodes de rétention des données de Datadog</a> pour plus d'informations.</div>

### Suivez les événements côté client (SDK) {#track-client-side-events-sdk}

Collectez des événements, tels que des pages vues ou des clics sur des boutons, depuis les appareils de vos utilisateurs et envoyez-les à Datadog.

Ajoutez le SDK Datadog à votre application pour commencer à collecter des données sur l'activité des utilisateurs. Si vous avez déjà configuré RUM, vous n'avez pas besoin d'instrumenter à nouveau votre application pour Product Analytics.

Si vous n'avez pas encore configuré d'application dans Datadog, suivez les instructions correspondant à votre plateforme :

- [Browser][14]
- [iOS][15]
- [Android][16]

Pour configurer votre application avec un assistant de codage, consultez [Onboarding assisté par agent][17].

### Suivez les événements côté serveur (API) {#track-server-side-events-api}

Une fois la collecte côté client configurée, vous pouvez utiliser l'[API Product Analytics][21] pour envoyer des événements personnalisés depuis votre serveur, tels que des checkouts finalisés ou des paiements traités. Pour plus d'informations, consultez [Suivre les événements côté serveur][22].

<div class="alert alert-warning">Datadog facture les événements côté serveur séparément. Consultez la <a href="https://www.datadoghq.com/pricing/?product=product-analytics#products">page de tarification</a> pour plus de détails et contactez votre Customer Success Manager pour toute question supplémentaire.</div>

## Activez Product Analytics {#enable-product-analytics}

Pour chaque application dont vous souhaitez surveiller le comportement des utilisateurs, activez Product Analytics :

1. Dans Datadog, accédez à {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > [{{< ui >}}Manage Applications{{< /ui >}}][9]. Dans la liste des applications sous {{< ui >}}Active{{< /ui >}}, sélectionnez l'application que vous souhaitez surveiller.
2. Sous {{< ui >}}PRODUCT SETTINGS{{< /ui >}}, cliquez sur {{< ui >}}Product Analytics{{< /ui >}}.
3. Cliquez sur le bouton {{< ui >}}Enable{{< /ui >}}.

{{< img src="product_analytics/enable-product-analytics.png" alt="Activez Product Analytics depuis la page de gestion des applications.">}}

## Comprenez vos données {#understand-your-data}
Le SDK Datadog collecte automatiquement trois niveaux de données utilisateur côté client: Sessions, Vues et Actions. Pour une ventilation complète des types d'événements RUM, consultez [Understanding the RUM Event Hierarchy][19]. Après avoir configuré le SDK, vous pouvez également envoyer des événements côté serveur via la [Product Analytics API][21].

**Sessions**
: Une session est le parcours complet d'un utilisateur unique dans votre application, du moment où il l'ouvre jusqu'à ce qu'il la quitte.

**Vues**
: Une vue représente chaque page ou écran qu'un utilisateur visite au cours d'une session.

**Actions**
: Une action est une interaction de l'utilisateur sur une page, comme un clic, un appui ou un défilement. Les actions sont automatiquement collectées par le SDK RUM. Lors de la configuration de fonctionnalités telles que [Funnels][4] et [Segments][6], vous pouvez sélectionner des actions spécifiques comme étapes ou filtres. Pour voir quelles actions sont disponibles, ouvrez le [RUM Explorer][20] et filtrez par {{< ui >}}Actions{{< /ui >}}.

**Événements côté serveur**
: Un événement côté serveur est un événement personnalisé envoyé via la [Product Analytics API][21], tel qu'une commande finalisée ou un paiement traité. Dans le sélecteur d'événements, sélectionnez {{< ui >}}Server Events{{< /ui >}} pour limiter votre analyse aux données côté serveur.

## Naviguez dans l'interface utilisateur de Product Analytics {#navigate-the-product-analytics-ui}
Chaque fonctionnalité de Product Analytics fournit un contexte sur les parcours de vos utilisateurs.

### Comprenez l'adoption du produit {#understand-product-adoption}
La page [Home][3] vous donne une vue d'ensemble de l'activité de vos utilisateurs et de l'adoption de votre produit. C'est ici que vous arrivez le plus souvent lorsque vous accédez à Product Analytics.

{{< img src="/product_analytics/pana_home_page.png" alt="Comprenez les conversions de bout en bout avec Funnel Analysis.">}}

Par défaut, cette page affiche les graphiques `active users`, `page views` et `average time spent by user`, mais vous pouvez ajouter des graphiques supplémentaires ou un dashboard. La page d'accueil comprend également les sous-sections prêtes à l'emploi suivantes qui fournissent un contexte supplémentaire sur les utilisateurs et l'utilisation de votre produit :

[Utilisateurs](https://app.datadoghq.com/product-analytics/user-trends)
: En un coup d'œil, voyez qui utilise votre produit.

[Application & Appareils](https://app.datadoghq.com/product-analytics/app-and-devices)
: Visualisez la répartition entre l'utilisation sur ordinateur et sur mobile, repérez les versions utilisées et identifiez ce qui peut être obsolète.

[Engagement](https://app.datadoghq.com/product-analytics/engagement-and-features)
: Comprenez comment les utilisateurs interagissent avec votre produit, en répondant à des questions telles que la durée pendant laquelle les utilisateurs restent sur les pages et quelles sont leurs principales actions. 

[Trafic](https://app.datadoghq.com/product-analytics/traffic-and-acquisition)
: Consultez les taux de rebond, les principales sources de trafic et l'origine réelle de votre croissance.

[Performance](https://app.datadoghq.com/product-analytics/performance)
: Affichez les erreurs et frustrations les plus courantes, et voyez exactement quelles vues elles impactent.

<br>


### Suivez les taux de conversion et leur évolution dans le temps {#track-conversion-rates-and-their-evolution-over-time}
Les graphiques de Product Analytics vous aident à visualiser les parcours de vos utilisateurs lorsqu'ils utilisent votre produit.

{{< img src="/product_analytics/pana_charts_video.mp4" alt="Visualisez le parcours de vos utilisateurs avec des graphiques." video="true">}}

Chaque type de graphique offre une vue différente du parcours utilisateur :

[Parcours][5]
: Visualisez tous les parcours utilisateurs dans votre application pour analyser le chemin critique.

[Entonnoir][4]
: Suivez les taux de conversion sur les workflows clés pour identifier et résoudre les goulots d'étranglement dans les parcours utilisateurs de bout en bout. <br> Par exemple, vous pouvez voir si les clients abandonnent à un certain point en raison de mauvaises performances du site web, ou mesurer comment l'ajout de nouvelles étapes à un workflow affecte le taux d'abandon.

[Rétention][2]
: Mesurez la fréquence à laquelle les utilisateurs reviennent avec succès sur une page ou une action pour obtenir des informations sur la satisfaction globale des utilisateurs.

[Analytics][13]
: Agrège les données d'utilisation pour montrer comment les utilisateurs interagissent avec votre produit.

<br>

### Suivez les modèles de comportement clés des utilisateurs {#track-key-user-behavior-patterns}
Utilisez [Users & Segments][6] pour regrouper vos utilisateurs selon des caractéristiques communes. Par exemple, si vous remarquez que les utilisateurs ajoutent des articles à leur panier mais ne finalisent pas leur commande, créez un segment pour ces utilisateurs et envoyez-leur un e-mail de rappel pour finaliser leur achat.

{{< img src="/product_analytics/segmentation/userprofiles_pana-ga.png" alt="Consultez les profils individuels des utilisateurs et créez un segment à partir de ces profils.">}}

### Visualisez les interactions des utilisateurs {#visualize-user-interactions}
Utilisez les fonctionnalités suivantes pour éclairer vos décisions de modification de produit, telles que les changements apportés à l'interface utilisateur de votre application, en observant comment les utilisateurs naviguent sur vos pages, s'il existe un chemin qu'ils empruntent plus que d'autres, ou où les actions et les flux pourraient être plus fluides.

{{< img src="/product_analytics/pana_session_replay_page.png" alt="Capturez et rejouez l'expérience de navigation de vos utilisateurs pour éclairer vos décisions de conception de produit.">}}

[Session replay][11] 
: Capturez et rejouez l'expérience de navigation web ou d'application mobile de vos utilisateurs.<br><br>Ceci est bénéfique pour l'identification, la reproduction et la résolution des erreurs, et fournit des informations sur les modèles d'utilisation et les pièges de conception de votre application.

[Cartes de chaleur][10]
: Visualisez les interactions de vos utilisateurs superposées aux données de Session Replay. Product Analytics propose trois types de cartes de chaleur : Click maps, Top elements et Scroll maps. <br><br> Utilisez les cartes de chaleur pour examiner des données complexes en un coup d'œil, afin d'obtenir des informations pour optimiser votre expérience utilisateur.

[Playlist][12]
: Créez une playlist de Session Replays pour les organiser selon les modèles que vous remarquez. En savoir plus sur les [Playlists de Session Replay][12].
<br>


## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/product_analytics/charts/retention_analysis
[3]: https://app.datadoghq.com/product-analytics
[4]: /fr/product_analytics/charts/funnel_analysis
[5]: /fr/product_analytics/charts/pathways
[6]: /fr/product_analytics/segmentation/
[9]: https://app.datadoghq.com/rum/list
[10]: /fr/session_replay/heatmaps
[11]: /fr/session_replay/
[12]: /fr/session_replay/playlists
[13]: /fr/product_analytics/charts/analytics_explorer
[14]: /fr/real_user_monitoring/application_monitoring/browser
[15]: /fr/real_user_monitoring/application_monitoring/ios
[16]: /fr/real_user_monitoring/application_monitoring/android
[17]: /fr/product_analytics/agentic_onboarding
[19]: /fr/real_user_monitoring/guide/understanding-the-rum-event-hierarchy
[20]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aaction
[21]: /fr/api/latest/product-analytics/#send-server-side-events
[22]: /fr/product_analytics/data_collected/server_side_events/