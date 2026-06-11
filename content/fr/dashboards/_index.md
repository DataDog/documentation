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
    - dashboards
description: Visualiser vos données pour mieux les comprendre
further_reading:
- link: /dashboards/sharing/
  tag: Documentation
  text: Partager vos graphiques en dehors de Datadog
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: Meilleures pratiques
  text: Créer des dashboards d'intégration efficaces
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur l'amélioration des visualisations
    avec des dashboards
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajouter des widgets Dashbard à votre presse-papiers
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: Blog
  text: Des dashboards Datadog encore plus efficaces
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des tableaux de bord exécutifs efficaces avec Datadog
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: Notes de version
  text: Découvrez les dernières versions des tableaux de bord Datadog ! (Connexion
    à l'application requise).
title: Dashboards
---
## Aperçu {#overview}

Les tableaux de bord fournissent des informations en temps réel sur la performance et la santé des systèmes et des applications au sein d'une organisation. Ils permettent aux utilisateurs d'analyser visuellement les données, de suivre les indicateurs clés de performance (KPIs) et de surveiller les tendances de manière efficace. Avec les tableaux de bord, les équipes peuvent identifier des anomalies, prioriser les problèmes, détecter proactivement les problèmes, diagnostiquer les causes profondes et s'assurer que les objectifs de fiabilité sont atteints. Donnez à vos équipes les moyens de prendre des décisions éclairées, d'optimiser les opérations système et de favoriser le succès commercial en fournissant une interface centralisée et conviviale pour surveiller et analyser les métriques critiques et les indicateurs de performance.

{{< whatsnext desc="Fonctionnalités des tableaux de bord :">}}
    {{< nextlink href="/dashboards/configure" >}}Configurer : Aperçu des options de configuration pour les tableaux de bord{{< /nextlink >}}
    {{< nextlink href="/dashboards/list" >}}Liste des tableaux de bord : Rechercher, afficher ou créer des tableaux de bord et des listes{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}Variable de modèle : Filtrer dynamiquement les widgets dans un tableau de bord{{< /nextlink >}}
    {{< nextlink href="/dashboards/guide/datadog_clipboard/" >}}Presse-papiers Datadog{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API : Gérer les tableaux de bord par programmation{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Fonctionnalités des graphiques :">}}
    {{< nextlink href="/dashboards/widgets" >}}Widgets : Apprenez la configuration pour différentes visualisations{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}Interrogation : Voir les options de mise en forme pour les requêtes de graphiques{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}Fonctions : Modifier les requêtes de métriques et les graphiques résultants{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}Superpositions : Superposer automatiquement les événements de changement sur les graphiques{{< /nextlink >}}
{{< /whatsnext >}}

## Commencer {#get-started}

Pour créer un tableau de bord : 
1. Cliquez sur **+Nouveau tableau de bord** sur la page [Liste des tableaux de bord][4] ou sur **Nouveau tableau de bord** dans le menu de navigation.
2. Entrez un nom de tableau de bord et choisissez une option de mise en page.

{{< img src="dashboards/create-dashboard.png" alt="Ajout d'un nouveau tableau de bord" style="width:70%;">}}

Dashboards 
: Une mise en page basée sur une grille, qui peut inclure une variété d'objets tels que des images, des graphiques et des journaux. Ils sont couramment utilisés comme tableaux de statut ou vues narratives qui se mettent à jour en temps réel et peuvent représenter des points fixes dans le passé. Ils ont une largeur maximale de 12 cases de grille et fonctionnent également bien pour le débogage.

Timeboards
: Mises en page automatiques qui représentent un seul point dans le temps—soit fixe soit en temps réel—sur l'ensemble du tableau de bord. Ils sont couramment utilisés pour le dépannage, la corrélation et l'exploration générale des données.

Screenboards
: Tableaux de bord avec des mises en page libres qui peuvent inclure une variété d'objets tels que des images, des graphiques et des journaux. Ils sont couramment utilisés comme tableaux de statut ou vues narratives qui se mettent à jour en temps réel ou représentent des points fixes dans le passé.

{{< whatsnext desc="Voir les ressources suivantes :" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}Débuter avec les dashboards{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Cours d'apprentissage : Introduction aux tableaux de bord{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}Cours d'apprentissage : Construire de meilleurs tableaux de bord{{< /nextlink >}}
{{< /whatsnext >}}

## Taux de rafraîchissement {#refresh-rate}

Le taux de rafraîchissement d'un tableau de bord privé dépend de la période que vous consultez. Plus la période est courte, plus les données sont rafraîchies fréquemment. Les tableaux de bord partagés publiquement se rafraîchissent toutes les trente secondes, quelle que soit la période sélectionnée.

| Période   | Taux de rafraîchissement |
|--------------|--------------|
| 1 minute     | 10 secondes   |
| 2 minutes    | 10 secondes   |
| 5 minutes    | 10 secondes   |
| 10 minutes   | 10 secondes   |
| 30 minutes   | 20 secondes   |
| 1 heure       | 20 secondes   |
| 3 heures      | 1 minute     |
| 4 heures      | 1 minute     |
| 1 jour        | 3 minutes     |
| 2 jours       | 10 minutes    |
| 1 semaine     | 1 heure       |
| 1 mois       | 1 heure       |
| 3 mois       | 1 heure       |
| 6 mois       | 1 heure       |
| 1 an         | 1 heure       |

## Voir les tableaux de bord sur les appareils mobiles {#view-dashboards-on-mobile-devices}

Visualisez vos tableaux de bord dans un format adapté aux mobiles avec l'application mobile Datadog, disponible sur l'[Apple App Store][2] et le [Google Play Store][3]. L'application mobile est équipée de widgets d'écran d'accueil qui vous permettent de surveiller la santé des services et l'infrastructure sans ouvrir l'application mobile.

**Remarque** : Pour configurer ou modifier un tableau de bord, vous devez vous connecter à l'interface utilisateur du navigateur Datadog. Pour plus d'informations sur l'installation de l'application, consultez la documentation de l'[application mobile Datadog][1].

## Lectures complémentaires {#further-reading}

{{< learning-center-callout header="Essayez de créer des widgets graphiques dans le centre d'apprentissage Datadog" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/dashboard-graph-widgets">}} Explorez les widgets de séries temporelles, de valeur de requête, de liste principale, de tableau, de distribution et de graphique circulaire. Découvrez comment configurer les widgets et quand utiliser chaque type. {{< /learning-center-callout >}}

{{< learning-center-callout header="Essayez de créer des widgets de tableau, de liste, de SLO et d'architecture dans le Centre d'apprentissage Datadog." btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/discovering-table-list-widgets">}} Explorez les widgets de tableau, de liste, de SLO et d'architecture. Apprenez à suivre les métriques et la performance d'une application web et découvrez comment présenter des données importantes. {{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists