---
description: Présentation de la navigation dans l'interface utilisateur de Datadog,
  des fonctionnalités clés, notamment les tableaux de bord, les monitors, les intégrations
  et les capacités principales de la plateforme.
further_reading:
- link: https://learn.datadoghq.com/bundles/frontend-engineer-learning-path
  tag: Centre d'apprentissage
  text: Parcours d'apprentissage pour ingénieur frontend
- link: https://learn.datadoghq.com/bundles/backend-engineer-learning-path
  tag: Centre d'apprentissage
  text: Parcours d'apprentissage pour ingénieur backend
- link: https://learn.datadoghq.com/bundles/site-reliability-engineer-learning-path
  tag: Centre d'apprentissage
  text: Parcours d'apprentissage pour ingénieurs en fiabilité des sites (SRE).
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour comprendre les principes fondamentaux
    de Datadog
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: Blog
  text: Présentation du menu de navigation rapide Datadog
title: Débuter avec Datadog
---
{{< learning-center-callout header="Essayez les compétences fondamentales de Datadog dans le centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/bundles/core-skills-learning-path">}}
  Apprenez gratuitement sur une capacité de calcul cloud réelle et un compte d'essai Datadog. Démarrez ces laboratoires pratiques pour vous familiariser avec les tags, les métriques, les Monitors et les tableaux de bord.
{{< /learning-center-callout >}}

## Présentation {#overview}

Cette page fournit un aperçu général des fonctionnalités disponibles sur le [site Datadog][1].

<div class="alert alert-info">
  La navigation sur le site Datadog varie en fonction de la largeur de votre navigateur. Vous pouvez avoir jusqu'à trois types de navigation. Pour changer de type de navigation, modifiez la largeur de votre navigateur.
  <br><br>
  Vous pouvez appuyer sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> pour rechercher des pages et des entités, comme des tableaux de bord et des monitors, dans tout Datadog.
</div>

## Infrastructure {#infrastructure}

La [liste d'infrastructure][2] sert de vue centrale pour toutes vos ressources d'infrastructure (hôtes, conteneurs, processus, etc.) et leurs métadonnées associées. 

**Fonctionnalités clés :**

- Étudiez les performances de l'infrastructure.
- Organisez, filtrez et visualisez les hôtes en fonction des tags et des métriques.
- Inspectez les hôtes pour examiner leurs tags, leurs performances, leur état de santé, et plus encore.

Accédez à [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}][3] dans l'application pour commencer. Pour en savoir plus, lisez la [documentation sur la liste d'infrastructure][2].

## Hostmaps et cartes de conteneurs {#host-and-container-maps}

{{< img src="getting_started/application/host_map_2025.png" alt="Présentation de la hostmap avec regroupement par zone de disponibilité." >}}

Les [hostmaps et cartes de conteneurs][4] vous offrent une vue d'ensemble visuelle de tous vos hôtes et conteneurs, en utilisant un code couleur basé sur des métriques clés comme l'utilisation du processeur afin que vous puissiez identifier les problèmes.

**Fonctionnalités clés** :

- Visualisez l'ensemble de votre infrastructure en une seule fois sous forme de carte.
- Utilisez un code couleur basé sur diverses métriques pour repérer les problèmes de performance, et filtrez ou regroupez par tags et métadonnées.
- Approfondissez l'analyse au niveau de chaque hôte ou conteneur pour résoudre les problèmes.

Accédez à [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Host Map{{< /ui >}}][5] dans l'application pour commencer. Pour en savoir plus, consultez la [documentation sur les cartes d'hôtes et de conteneurs][4].

## Log Management {#log-management}

[Datadog Log Management][6] vous permet d'envoyer et de traiter tous les logs produits par vos applications et votre infrastructure. Vous pouvez observer vos logs en temps réel grâce au [Live Tail][7], sans avoir à les indexer.

**Fonctionnalités clés** :

- Collectez automatiquement les logs de tous les services, applications et plateformes.
- Visualisez et recherchez les logs en temps réel et filtrez-les par service, hôte et type d'erreur.
- Choisissez les logs à conserver et pour combien de temps, afin de réduire les coûts de stockage.

Accédez à [{{< ui >}}Logs{{< /ui >}}][8] dans l'application pour commencer. Pour en savoir plus, consultez la [documentation sur Log Management][6].

## APM {#apm}

[Datadog Application Performance Monitoring][9] (APM ou tracing) vous offre une visibilité approfondie sur les performances de votre application, parallèlement à vos logs et à la surveillance de votre infrastructure.

**Fonctionnalités clés** :

- Tracez les requêtes adressées à une application de bout en bout à travers un système distribué.
- Identifiez les goulots d'étranglement en visualisant le temps passé à chaque étape de la requête.
- Visualisez les dépendances entre services et les flux de données avec la Service Map.
- Corrélez les traces avec les logs, les métriques et les sessions utilisateur correspondants pour obtenir un contexte full-stack.

Accédez à [{{< ui >}}APM{{< /ui >}}][10] dans l'application pour commencer. Pour en savoir plus, lisez la [documentation sur l'APM][9].

## RUM & Session Replay {#rum-session-replay}

Datadog [Real User Monitoring][11] (RUM) vous permet de visualiser et d'analyser les activités et expériences réelles des utilisateurs sur les applications web et mobiles. Avec [Session Replay][12], vous pouvez capturer et visualiser les sessions utilisateur pour mieux comprendre leur comportement.

**Fonctionnalités clés** :
- Surveillez les performances sur les navigateurs web et les plateformes mobiles (iOS, Android, React Native, Flutter, et plus) avec Core Web Vitals et Mobile Vitals.
- Suivez et dépannez les erreurs grâce au regroupement automatisé, au rapport de plantage et à l'identification des commits suspects.
- Détectez les signaux de frustration des utilisateurs tels que les clics de rage et les clics d'erreur pour identifier les problèmes d'UX.
- Surveillez les performances et l'adoption des feature flags.
- Corrélez les problèmes frontend avec les traces backend, les logs et les métriques d'infrastructure pour une visibilité full-stack.

Accédez à [{{< ui >}}RUM explorer{{< /ui >}}][13] dans l'application pour commencer. Pour en savoir plus, lisez la [documentation RUM][11].

## Synthetic Monitoring {#synthetic-monitoring}

Datadog [Synthetic Monitoring][14] vous permet de créer et d'exécuter des tests d'API, de navigateur, mobiles et Network Path qui surveillent de manière proactive les requêtes et actions simulées à travers le monde. Ces tests surveillent vos applications et API pour détecter les problèmes de performance et les temps d'arrêt avant qu'ils n'affectent les utilisateurs.

**Fonctionnalités clés** :

- Testez les endpoints d'API et les parcours utilisateur critiques pour l'entreprise.
- Détectez les erreurs, identifiez les régressions et automatisez les rollbacks afin d'empêcher l'apparition des problèmes en production.
- Identifiez les problèmes de performance affectant les utilisateurs dans divers emplacements et déclenchez des alertes.

Accédez à [{{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}][15] dans l'application pour commencer. Pour en savoir plus, lisez la [documentation sur le Synthetic Monitoring][14].

## Intégrations {#integrations}

Utilisez les {{< translate key="integration_count" >}} [integrations][16] de Datadog pour rassembler toutes les métriques et les logs de votre infrastructure et obtenir des informations sur l'ensemble de votre système d'observabilité.

{{< img src="getting_started/application/integrations-2025.png" alt="Integrations" >}}

**Fonctionnalités clés** :

- Les intégrations disponibles couvrent les technologies cloud, la réponse aux incidents, les couches de données, la sécurité, l'IA, et plus encore.
- Une fois les intégrations configurées, toutes les données sont traitées de la même manière dans Datadog, qu'elles résident dans un centre de données ou dans un service en ligne.
- Créez votre propre intégration en utilisant la [documentation développeur][17].

Accédez à [{{< ui >}}Integrations{{< /ui >}}][18] dans l'application pour commencer, ou parcourez la liste des intégrations dans la [documentation][19].

## Dashboards {#dashboards}

[Dashboards][20] contiennent des graphiques avec des métriques de performance en temps réel, unifiant votre vue des données à travers les métriques, les logs, les traces, et plus encore.

**Fonctionnalités clés** :

- Commencez avec des tableaux de bord prêts à l'emploi ou créez les vôtres pour répondre à vos questions spécifiques.
- Personnalisez les tableaux de bord avec des widgets par glisser-déposer, des requêtes personnalisées et des mises en page flexibles.
- Combinez plusieurs types de données (y compris les métriques, les logs, l'APM et le RUM) en un seul endroit et visualisez les données en temps réel.
- Annotez vos graphiques avec des commentaires ou des événements pour le contexte de votre équipe.

Accédez à [{{< ui >}}Dashboard List{{< /ui >}}][21] dans l'application pour commencer. Pour en savoir plus, lisez la [documentation sur les Dashboards][20].

## Monitors {#monitors}

[Monitors][22] fournissent des alertes et des notifications basées sur des seuils de métriques, la disponibilité des intégrations, les endpoints réseau, et plus encore.

- Créez des monitors en utilisant n'importe quelle métrique rapportée à Datadog.
- Créez une logique d'alerte complexe en utilisant plusieurs conditions de déclenchement.
- Envoyez des alertes vers Slack, par e-mail, PagerDuty et plus encore, en ajoutant`@` dans les messages d'alerte pour diriger les notifications vers les bonnes personnes.
- Planifiez des périodes d'indisponibilité pour suspendre les notifications lors des arrêts du système, de la maintenance hors ligne, et bien plus encore.

Accédez à [{{< ui >}}Monitors List{{< /ui >}}][23] dans l'application pour commencer. Pour en savoir plus, lisez la [documentation sur les monitors][22].

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: /fr/infrastructure/list/
[3]: https://app.datadoghq.com/infrastructure
[4]: /fr/infrastructure/hostmap/
[5]: https://app.datadoghq.com/infrastructure/map
[6]: /fr/logs/
[7]: /fr/logs/explorer/live_tail/
[8]: https://app.datadoghq.com/logs
[9]: /fr/tracing/
[10]: https://app.datadoghq.com/apm/home
[11]: /fr/real_user_monitoring/
[12]: /fr/session_replay/
[13]: https://app.datadoghq.com/rum/sessions
[14]: /fr/synthetics/
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://www.datadoghq.com/product/platform/integrations/
[17]: /fr/extend/integrations/
[18]: https://app.datadoghq.com/integrations
[19]: /fr/integrations/
[20]: /fr/dashboards/
[21]: https://app.datadoghq.com/dashboard/lists
[22]: /fr/monitors/
[23]: https://app.datadoghq.com/monitors/manage