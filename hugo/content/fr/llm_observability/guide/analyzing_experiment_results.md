---
aliases:
- /fr/llm_observability/improve/experiments/analyzing_results/
- /fr/llm_observability/experiments/analyzing_results/
description: Comment analyser les résultats d'Agent Observability Offline Experiments.
title: Analysez les résultats de vos Offline Experiments
---
Cette page décrit comment analyser les résultats d'Agent Observability Offline Experiments dans l'interface Offline Experiments et les widgets de Datadog.

Après avoir exécuté un Experiment, vous pouvez analyser les résultats pour comprendre les tendances de performance et étudier les enregistrements problématiques.

## Utilisation de la page Experiment dans Datadog {#using-the-experiment-page-in-datadog}

Sur la page Offline Experiments, cliquez sur une expérience pour voir ses détails.

La section {{< ui >}}Summary{{< /ui >}} contient les évaluations, les évaluations récapitulatives et les métriques enregistrées pendant l'exécution de votre Experiment.

Chaque valeur est agrégée en fonction de son type :
- **Booléen** : agrégé sous forme de ratio de `True` sur toutes les valeurs enregistrées.
- **Score** : agrégé sous forme de moyenne sur toutes les valeurs enregistrées.
- **Catégoriel** : agrégé sous forme de mode (valeur la plus fréquente dans la distribution).

La section {{< ui >}}Records{{< /ui >}} contient les traces liées à l'exécution de votre tâche sur les entrées du jeu de données. Chaque trace contient la liste des spans montrant le flux d'informations à travers votre agent.

Vous pouvez utiliser les facettes (sur le côté gauche) pour filtrer les enregistrements en fonction de leurs résultats d'évaluation afin de dégager des tendances.

### Personnalisation du tableau des résultats {#customizing-the-results-table}

Vous pouvez personnaliser le tableau des résultats de l'expérience pour faire apparaître les champs qui vous importent le plus sans ouvrir chaque trace individuellement.

#### Sélecteur de colonnes {#column-picker}

Utilisez le sélecteur de colonnes pour activer ou désactiver des colonnes et faites-les glisser pour les réorganiser. Par défaut, les colonnes contenant des blobs JSON bruts (Input, Output, Expected Output) sont masquées pour que le tableau reste lisible. Vous pouvez les réactiver à tout moment.

Le tableau inclut une colonne {{< ui >}}Record ID{{< /ui >}} qui indique l'enregistrement de jeu de données sur lequel chaque exécution d'expérience a été effectuée. Pour les expériences hors ligne avec plusieurs exécutions par enregistrement, développez un enregistrement pour voir toutes les exécutions en dessous.

#### Colonnes personnalisées {#custom-columns}

Extrayez des champs spécifiques du span de premier niveau de votre expérience, tels qu'une clé d'entrée, une clé de sortie ou une clé de métadonnées, et affichez-les dans des colonnes dédiées du tableau. Cela vous permet de comparer les propriétés clés entre les enregistrements en un coup d'œil.

Pour ajouter une colonne personnalisée, saisissez un chemin de champ dans le champ de saisie {{< ui >}}Add Column{{< /ui >}} en haut du tableau :

| Source          | Format de chemin                    | Exemple                          |
| --------------- | ------------------------------ | -------------------------------- |
| Input           | `@meta.input.<key>`           | `@meta.input.user_query`        |
| Output          | `@meta.output.<key>`          | `@meta.output.result.status`    |
| Expected output | `@meta.expected_output.<key>` | `@meta.expected_output.answer`  |
| Metadata        | `@meta.metadata.<key>`        | `@meta.metadata.scenario_type`  |
| Tag             | `<tag_key>`                    | `env`                            |

Vous pouvez ajouter plusieurs colonnes personnalisées et les réorganiser par glisser-déposer. La configuration des colonnes est enregistrée dans le stockage local de votre navigateur par projet.

#### Actions rapides depuis le détail du span {#quick-actions-from-the-span-detail}

Lorsque vous consultez le span racine dans le panneau latéral de détail du span, vous pouvez agir sur les champs directement depuis le menu contextuel au lieu de saisir manuellement les chemins.

Les options suivantes sont disponibles pour les champs JSON (Input, Output, Expected Output, Metadata) :

- {{< ui >}}Copy key path{{< /ui >}} : Copie le chemin complet du champ (par exemple, `@meta.input.user_query`) afin que vous puissiez le coller dans la saisie de colonne personnalisée, la barre de recherche ou une requête de widget de dashboard.
- {{< ui >}}Add column{{< /ui >}} : Ajoute le champ en tant que colonne personnalisée dans le tableau des résultats en un clic.
- {{< ui >}}Filter by / Exclude{{< /ui >}} : Ajoute la paire clé-valeur du champ à la requête de recherche pour restreindre ou exclure les enregistrements correspondants. Disponible uniquement sur les valeurs feuilles (chaînes, nombres, booléens).

Les options suivantes sont disponibles pour les tags :

- {{< ui >}}Copy key{{< /ui >}} : Copie la clé de tag (par exemple, `env`).
- {{< ui >}}Copy to clipboard{{< /ui >}} : Copie le tag complet, y compris sa valeur (par exemple, `env:prod`).
- {{< ui >}}Add column{{< /ui >}} : Ajoute la clé de tag comme colonne personnalisée dans le tableau des résultats.
- {{< ui >}}Filter by / Exclude{{< /ui >}} : Ajoute la paire clé-valeur du tag à la requête de recherche.

<div class="alert alert-info">Ces actions sont disponibles sur le span racine d'une trace.</div>

### Recherche d'enregistrements spécifiques {#searching-for-specific-records}

Vous pouvez utiliser la barre de recherche pour trouver des enregistrements spécifiques, en fonction de leurs propriétés (données des enregistrements du jeu de données) ou du résultat de l'expérience (sorties et évaluations). La recherche est effectuée au niveau de la trace.

{{< img src="llm_observability/experiments/exp_details_search.png" alt="Agent Observability, vue détaillée d'Experiment Details. Titre : « Mise en évidence de la barre de recherche »." style="width:100%;" >}}

<div class="alert alert-info">Pour accéder au maximum de données, passez à <code>ddtrace-py >= 4.1.0</code>, car cette version apporte les changements suivants :

<ul>
<li>Les spans Offline Experiments contiennent des métadonnées provenant de l'enregistrement du jeu de données. </li>
<li>Les champs des spans Offline Experiments <code>input</code>, <code>output</code>, et <code>expected_output</code> sont stockés tels quels (c'est-à-dire sous forme de JSON interrogeable s'ils sont émis en tant que tels) </li>
<li>Les spans Offline Experiments et leurs spans enfants sont marqués avec <code>dataset_name</code>, <code>project_name</code>, <code>project_id</code>, <code>experiment_name</code> pour une recherche plus facile.</li>
</ul></div>

#### Rechercher des traces par mot-clé {#find-traces-by-keyword}
La recherche par mot-clé porte sur toutes les informations disponibles (entrée, sortie, sortie attendue, métadonnées, tags).

#### Rechercher des traces par évaluation {#find-traces-by-evaluation}

Pour rechercher une trace par évaluation, effectuez la recherche : `@evaluation.<name>.value:<criteria>`

| Type d'évaluation | Exemple de terme de recherche |
| --------------- | ----------- |
| Booléen         | `@evaluation.has_risk_pred.value:true` |
| Score           | `@evaluation.correctness.value:>=0.35` |
| Catégoriel     | `@evaluation.violation.value:(not_fun OR not_nice)` |

#### Rechercher des traces par statut d'expérience {#find-traces-by-experiment-status}

Pour rechercher une trace par statut d'expérience, effectuez la recherche : `@experiment.status:<status>`

| Statut | Exemple de terme de recherche |
| ------ | ------------------- |
| Running | `@experiment.status:running` |
| Completed | `@experiment.status:completed` |

#### Rechercher des traces par métrique {#find-traces-by-metric}

Offline Experiments collecte automatiquement les métriques de durée, de nombre de tokens et de coût.

| Métrique               | Exemple de terme de recherche |
| -------------------- | ------------------- |
| Durée             | `@duration:>=9.5s ` |
| Nombre de tokens          | `@trace.total_tokens:>10000` |
| Coût total estimé<br/> (en nanodollars ; 1 nanodollar = 10<sup>-9</sup> dollars) | `@trace.estimated_total_cost:>10000000` |


#### Rechercher des traces par tag {#find-traces-by-tag}

Pour rechercher des traces à l'aide de tags, effectuez une recherche `<tag>:<value>`. Par exemple, `dataset_record_id:84dfd2af88c6441a856031fc2e43cb65 `.

Pour voir quels tags sont disponibles, ouvrez une trace et consultez ses tags.

{{< img src="llm_observability/experiments/side-panel-tag.png" alt="Agent Observability, panneau latéral d'une trace d'Experiment. Mise en évidence de l'emplacement des tags de trace." style="width:100%;" >}}


#### Rechercher des traces par entrée, sortie, sortie attendue ou métadonnées {#find-traces-by-input-output-expected-output-or-metadata}

Pour interroger une clé spécifique dans l'entrée, la sortie, la sortie attendue ou les métadonnées, vous devez émettre la propriété au format JSON.

| Propriété | Format | Exemple de terme de recherche |
| -------- | ------ | ------------------- |
| input | `@meta.input.<key1>.<subkey1>:<value>` | `@meta.input.origin.country:"France"` |
| output | `@meta.output.<key1>.<subkey1>:<value>` | `@meta.output.result.status:"success"` |
| expected output | `@meta.expected_output.<key1>.<subkey1>:<value>` | `@meta.expected_output.answer:"correct"`|
| metadata | `@meta.metadata.<key1>.<subkey1>:<value>` | `@meta.metadata.source:generated` |


##### Interrogation de tableaux JSON {#querying-json-arrays}
Les tableaux simples sont aplatis sous forme de chaînes, et vous pouvez les interroger.

**Exemple 1** : Tableau JSON interrogeable

```
"output": {
  "action_matches": [
        "^/cases/settings$",
        "^Create Case Type$",
        "^/cases$"
    ],
}
```

Vous pouvez interroger cet exemple de tableau en effectuant une recherche : `@meta.output.action_matches:"^/cases/settings$"`.

**Exemple 2** : Tableau JSON non interrogeable

```
"output": {
  "expected_actions": [
    [
      "bonjour",
      "a_bientot"
    ],
    [
      "todobem",
      "click here"
    ]
  ],
}
```

Dans cet exemple, le tableau est imbriqué et ne peut pas être interrogé.

## Utilisation de widgets avec les données d'Offline Experiments {#using-widgets-with-offline-experiments-data}

Vous pouvez créer des widgets dans Dashboards et Notebooks à l'aide des données d'Offline Experiments.
Datadog vous suggère de :
- Renseignez les métadonnées de vos enregistrements de jeu de données avec toutes les informations supplémentaires qui pourraient vous aider à segmenter vos données (par exemple : difficulté, langue, etc.)
- Assurez-vous que vos tâches produisent un objet JSON
- Mettez à jour `ddtrace-py` vers la version >= 4.1.0


Pour créer un widget à l'aide des données d'Offline Experiments, utilisez {{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Offline Experiments{{< /ui >}} comme source de données. Ensuite, utilisez la [syntaxe de recherche sur cette page](#searching-for-specific-records) pour restreindre les événements à tracer.

Pour l'agrégation de données au niveau de l'enregistrement, utilisez {{< ui >}}Traces{{< /ui >}} ; sinon, utilisez {{< ui >}}All Spans{{< /ui >}}.

Groupez ou filtrez par `@experiment.status` pour comparer les métriques entre les expériences hors ligne en cours ou terminées.

### Exemples de widgets {#widget-examples}
#### Tracé de la performance dans le temps ventilée par un champ de métadonnées {#plotting-performance-over-time-broken-down-by-a-metadata-field}
{{< img src="llm_observability/experiments/widget-metadata.png" alt="Widget utilisant des données d'Offline Experiments. Graphique montrant la performance dans le temps ventilée par un champ de métadonnées." style="width:100%;" >}}

<div class="alert alert-info">Si vous essayez de calculer une moyenne d'une évaluation booléenne, vous devez calculer manuellement le pourcentage de <code>True</code> sur toutes les traces.</div>

#### Affichage des statistiques d'utilisation des outils {#displaying-tool-usage-stats}
Dans une situation où votre agent est censé appeler un certain outil, et que vous avez besoin de comprendre à quelle fréquence l'outil est appelé et d'obtenir des statistiques à ce sujet :

{{< img src="llm_observability/experiments/widget-tool.png" alt="Widget utilisant des données d'Offline Experiments. Graphique montrant quelques statistiques d'utilisation d'un outil dans plusieurs expériences hors ligne." style="width:100%;" >}}