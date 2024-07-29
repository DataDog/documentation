---
aliases:
- /fr/guides/templating/
- /fr/graphing/dashboards/
- /fr/guides/graphing
- /fr/graphing/miscellaneous/metrics_arithmetic
- /fr/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
- /fr/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
- /fr/graphing/
- /fr/dashboards/dashboards/
- /fr/dashboards/screenboards/
- /fr/dashboards/timeboards/
cascade:
  algolia:
    rank: 70
    tags:
    - snapshot
    - serverless_aws_lambda
description: Visualiser vos données pour mieux les comprendre
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: Notes de version
  text: Découvrez les dernières versions des dashboards Datadog (connexion à l'application
    requise).
- link: /dashboards/sharing/
  tag: Documentation
  text: Partager vos graphiques en dehors de Datadog
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajouter des widgets de dashboard à votre presse-papiers
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: Blog
  text: Des dashboards Datadog encore plus efficaces
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: Documentation pour développeurs
  text: Créer des dashboards d'intégration efficaces
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur l'amélioration des visualisations
    avec des dashboards
title: Dashboards
---

## Présentation

Les dashboards fournissent des informations en temps réel sur les performances et la santé des systèmes et des applications au sein d'une organisation. Ils permettent aux utilisateurs d'analyser visuellement les données, de suivre les indicateurs clés de performance (KPI) et de surveiller les tendances de manière efficace. Avec les dashboards, les équipes peuvent identifier les anomalies, hiérarchiser les problèmes, les détecter de manière proactive, diagnostiquer leurs causes profondes et s'assurer que les objectifs de fiabilité sont atteints. Donnez à vos équipes les moyens de prendre des décisions éclairées, d'optimiser le fonctionnement des systèmes et de favoriser la réussite de l'entreprise en fournissant une interface centralisée et conviviale pour surveiller et analyser les indicateurs de performance et les métriques critiques.

{{< whatsnext desc="Fonctionnalités des dashboards :">}}
    {{< nextlink href="/dashboards/configure" >}}Configurer : présentation des options de configuration pour les dashboards{{< /nextlink >}}
    {{< nextlink href="/dashboards/configure" >}}Liste de dashboards : recherchez, consultez ou créez des dashboards et des listes{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}Template variables : filtrez des widgets de façon dynamique dans un dashboard{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/datadog_clipboard/" >}}Datadog Clipboard (en anglais){{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API : gérez des dashboards par programmation{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Fonctionnalités des graphiques :">}}
    {{< nextlink href="/dashboards/widgets" >}}Widgets : apprenez à configurer les différentes visualisations{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}Requêtes : découvrez les options de mise en forme des requêtes de graphique{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}Fonctions : modifiez des requêtes de métrique et les graphiques générés{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}Overlays: Automatically overlay change events on graphs (en anglais){{< /nextlink >}}
{{< /whatsnext >}}

## Prise en main

{{< whatsnext desc="Consultez les ressources suivantes :" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}Débuter avec les dashboards{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Learning Course: Introduction to Dashboards (en anglais){{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}Learning Course: Building Better Dashboards (en anglais){{< /nextlink >}}
{{< /whatsnext >}}

Pour créer un dashboard, cliquez sur **+New Dashboard** sur la page [Dashboard List][4] ou sur **New Dashboard** depuis le menu de navigation. Attribuez un nom à votre dashboard, puis choisissez une disposition.

{{< img src="dashboards/create-dashboard.png" alt="Ajout d'un nouveau dashboard" style="width:70%;">}}

Dashboards 
: ils sont disposés au sein d'une grille qui peut inclure un vaste choix d'objets, tels que des images, des graphiques et des logs. Ils servent généralement à visualiser les statuts de vos services et à mettre en récit vos données. Ils peuvent être mis à jour en temps réel et représenter des points fixes historiques. Leur grille peut inclure jusqu'à 12 carrés. Ils s'avèrent également très utiles pour le debugging.

Timeboards
: ils sont automatiquement mis en forme et représentent un point unique (fixe ou mis à jour en temps réel) sur l'ensemble du dashboard. Ils sont généralement utilisés pour dépanner, mettre en corrélation et explorer les données.

Screenboards
: dashboards qui vous permettent de représenter librement de nombreux objets tels que des images, des graphiques ou des logs. Généralement utilisés pour visualiser les statuts de vos services et pour mettre en récit vos données, ils peuvent être mis à jour en temps réel ou représenter des points fixes historiques.

## Taux d'actualisation

Le taux d'actualisation d'un dashboard privé dépend de l'intervalle affiché. Plus l'intervalle est court, plus les données sont actualisées régulièrement. Les dashboards publics s'actualisent toutes les 30 secondes, peu importe l'intervalle sélectionné.

| Intervalle   | Taux d'actualisation |
|--------------|--------------|
| 1 minute     | 10 secondes   |
| 2 minutes    | 10 secondes   |
| 5 minutes    | 10 secondes   |
| 10 minutes   | 10 secondes   |
| 30 minutes   | 20 secondes   |
| 1 heure       | 20 secondes   |
| 3 heures      | 1 minute     |
| 4 heures      | 1 minute     |
| 1 jour        | 3 minutes     |
| 2 jours       | 10 minutes    |
| 1 semaine       | 1 heure       |
| 1 mois      | 1 heure       |
| 3 mois     | 1 heure       |
| 6 mois     | 1 heure       |
| 1 an       | 1 heure       |

## Consulter des dashboards sur des appareils mobiles

Consultez vos dashboards dans un format compatible avec les appareil mobiles avec l'application mobile Datadog, qui est disponible sur l'[App Store d'Apple][2] et le [Google Play Store][3]. Lʼapplication mobile propose des widgets sur l'écran d'accueil de votre appareil mobile. Grâce à ces widgets, vous pouvez surveiller l'intégrité de vos services et votre infrastructure sans avoir à ouvrir l'application mobile.

**Remarque** : pour configurer ou modifier un dashboard, vous devez vous connecter à l'interface utilisateur du navigateur Datadog. Pour plus d'informations sur l'installation de l'application, voir la documentation [Datadog Mobile App][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_management/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists