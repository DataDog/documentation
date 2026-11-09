---
aliases:
- /fr/graphing/metrics/explorer/
description: Plongez au cœur de l'ensemble de vos métriques et effectuez des analyses.
further_reading:
- link: /metrics/summary/
  tag: Documentation
  text: Metrics Summary
- link: /metrics/distributions/
  tag: Documentation
  text: Distributions de métriques
- link: /dashboards/guide/quick-graphs/
  tag: Documentation
  text: Quick Graphs
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Gérez le volume de métriques et les tags dans votre environnement avec Observability
    Pipelines
- link: https://www.datadoghq.com/blog/metrics-natural-language-queries/
  tag: Blog
  text: Explorer les métriques Datadog avec des requêtes en langage naturel
title: Metrics Explorer
---
## Présentation {#overview}

Le [Metrics Explorer][1] est une interface de base pour examiner vos métriques dans Datadog. Pour des options plus avancées, créez un [notebook][2] ou un dashboard ([screenboard][3] ou [timeboard][4]).

## Requêtes en langage naturel {#natural-language-queries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Les requêtes en langage naturel pour le Metrics Explorer ne sont pas disponibles pour votre site Datadog sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilisez les requêtes en langage naturel (NLQ) pour décrire ce que vous recherchez en anglais simple. Datadog traduit automatiquement votre demande en une requête métrique structurée, tenant compte du contexte tel que vos services, attributs et tags. Cela facilite l'exploration des métriques sans avoir besoin d'écrire une syntaxe complexe.

Pour accéder à cette fonctionnalité, cliquez sur {{< ui >}}Ask{{< /ui >}} dans le champ de recherche et saisissez votre requête.

{{< img src="/metrics/explorer/metrics_nlq_example_10152025.mp4" alt="Requête en langage naturel dans le Metrics Explorer montrant comment rechercher des métriques en utilisant des phrases en anglais simple" video=true >}}

Pour désactiver NLQ pour votre organisation, vous devez disposer des [autorisations de gestion d'organisation][11]. Accédez à {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Preferences{{< /ui >}} et désactivez la fonctionnalité de requêtes en langage naturel.

## Sessions {#sessions}

Le Metrics Explorer conserve automatiquement un historique de vos investigations récentes, ce qui facilite l'exploration et le partage de différentes questions sans avoir à refaire le travail précédent.

Utilisez les sessions pour :

- **Démarrer une investigation distincte :** Cliquez sur {{< ui >}}New Session{{< /ui >}} pour explorer une autre question sans perdre votre travail actuel.
- **Revenir à un travail précédent :** Sélectionnez ou recherchez une session récente pour poursuivre une investigation.
- **Préserver une investigation importante :** Épinglez et renommez une session afin qu'elle soit plus facile à reconnaître et à retrouver ultérieurement.
- **Explorer une alternative :** Dupliquez une session et modifiez la copie tout en préservant l'originale.
- **Partager une investigation :** Copiez un lien de session pour le partager avec un autre utilisateur.
- **Supprimer une session inutilisée :** Supprimez une session dont vous n'avez plus besoin.

{{< img src="metrics/explorer/09282026_metric_explorer_sessions.png" alt="Exemple de sessions du Metrics Explorer" style="width:80%;" >}}

## Graphing {#graphing}

Utilisez l'éditeur de requêtes pour personnaliser le graphique affiché sur la page du Metrics Explorer.

Vous pouvez spécifier la période dans le coin supérieur droit de la page. La valeur par défaut est {{< ui >}}Past 1 Hour{{< /ui >}}.

{{< img src="metrics/explorer/metrics_explorer.png" alt="Metrics Explorer affichant deux requêtes sur un graphique à barres" style="width:80%;" >}}

Les métriques qui ne sont pas rapportées au cours des dernières 24 heures n'apparaissent pas dans l'éditeur de requête. Vous pouvez ajouter ces métriques à vos graphiques manuellement en saisissant le nom de la métrique ou la requête complète.

### Périmètre {#scope}

Définissez un périmètre de filtrage avec la zone de texte {{< ui >}}from{{< /ui >}} en sélectionnant ou en recherchant des valeurs de tag. Par exemple, vous pouvez utiliser la zone de texte {{< ui >}}from{{< /ui >}} pour filtrer les valeurs de métriques à partir d'un host, d'un cluster, d'un environnement ou d'une région spécifique.

### Agrégation spatiale {#space-aggregation}

Définissez l'[agrégation spatiale][5] utilisée pour combiner les valeurs d'une métrique.

Les options possibles sont les suivantes :

* Moyenne des valeurs rapportées (par défaut)
* Max des valeurs rapportées
* Min des valeurs rapportées
* Somme des valeurs rapportées

**Remarque** : Les options peuvent différer selon le type de métrique sélectionné.

### Fonctions et formules {#functions-and-formulas}

Vous pouvez éventuellement ajouter des fonctions à votre requête en utilisant le bouton de fonction. Toutes les fonctions ne sont pas disponibles pour tous les types de métriques. Pour plus d'informations, consultez la documentation [querying][6]. 

### Graphique scindé {#split-graph}

Utilisez le bouton {{< ui >}}Split Graph{{< /ui >}} pour afficher les données fractionnées en graphiques individuels par valeurs pour des tags tels que la région, le service ou l'environnement.

### Exporter {#export}

Utilisez le bouton {{< ui >}}Export{{< /ui >}} (<i class="icon-export"></i>) pour exporter votre graphique :

- Copier un lien vers le graphique pour le partager
- Ajoutez-le à un [incident][8]
- Créez un [monitor][9]
- Enregistrez-le dans un [dashboard][10]
- Enregistrez-le dans un [notebook][2] 

### Quick Graphs {#quick-graphs}

Avec Quick Graphs, vous disposez de plus d'options pour visualiser vos données, sans avoir besoin de créer un [Dashboard][4] ou un [Notebook][2]. Ces graphiques sont utiles pour comprendre et résoudre les problèmes sans créer de dashboards permanents ou de configurations de visualisation complexes.

Pour plus d'informations, consultez la documentation sur les [Quick Graphs][7].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /fr/notebooks/
[3]: /fr/dashboards/#screenboards
[4]: /fr/dashboards/#get-started
[5]: /fr/metrics/introduction/#space-aggregation
[6]: /fr/dashboards/querying/#advanced-graphing
[7]: /fr/dashboards/guide/quick-graphs/
[8]: /fr/incident_response/incident_management/
[9]: /fr/monitors/
[10]: /fr/dashboards/
[11]: /fr/account_management/rbac/permissions/#access-management