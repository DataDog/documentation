---
description: Découvrez les facettes par défaut que vous pouvez utiliser pour rechercher
  vos exécutions de pipeline dans CI Visibility Explorer.
further_reading:
- link: continuous_integration/search/
  tag: Documentation
  text: Découvrez comment effectuer une recherche sur vos pipelines.
- link: continuous_integration/explorer/
  tag: Documentation
  text: Découvrez CI Visibility Explorer.
title: Facettes d'exécution de pipeline
---
## Présentation {#overview}

Les facettes sont des tags et des attributs définis par l'utilisateur provenant de vos pipelines. Elles sont utiles pour l'analyse de données [qualitatives](#qualitative-facets) et [quantitatives](#quantitative-measures). Les facettes vous permettent de manipuler vos pipelines dans vos [monitors de pipeline CI][1], ainsi que dans les requêtes de recherche qui apparaissent sur les [tableaux de bord][2] et dans les [notebooks][3].

[La création de facettes](#creating-facets) n'est **pas requise** pour [rechercher des exécutions de pipeline][5]. Les fonctionnalités de saisie semi-automatique utilisent les facettes existantes, mais toute entrée correspondant aux exécutions de pipeline entrantes s'applique également.

## Facettes courantes {#common-facets}

Accédez à [**Software Delivery** > **CI Visibility** > **Executions**][7] pour accéder à la liste des facettes à gauche de la liste des exécutions de pipeline.

{{< img src="/continuous_integration/facets-pipelines.png" text="Facets list on the Pipeline Executions page of the CI Visibility Explorer" style="width:100%" >}}

[CI Vsibility Explorer][4] inclut les facettes prêtes à l'emploi suivantes :

| Facette | Description |
|---|---|
| Fournisseur CI | Nom du fournisseur CI (GitHub, GitLab, et plus). |
| Nom du pipeline | Nom du pipeline CI. |
| Nom du nœud | Nom du nœud CI qui a exécuté le pipeline, l'étape ou le job. |
| Libellés du nœud | Libellés associés au nœud CI qui a exécuté le pipeline, l'étape ou le job. |
| URL du pipeline | URL du fournisseur pour une exécution de pipeline. |
| ID du pipeline | ID du pipeline. |
| Numéro du pipeline | Numéro d'exécution d'un pipeline CI, fourni par le fournisseur CI. Ceci augmente lors d'une nouvelle tentative partielle d'un pipeline. |
| URL du job | URL du fournisseur pour une exécution de job. |
| Nom de l'étape | Nom de l'étape CI. |
| Nom du job | Nom du job CI. |
| Espace de noms Kubernetes | L'espace de noms dans lequel le pod Kubernetes est en cours d'exécution. |
| Nom du pod Kubernetes | Nom du pod Kubernetes. |
| Tag d'image | Tag d'image de conteneur Kubernetes. |
| Nom du conteneur | Tag de nom de conteneur Kubernetes. |
| Nom de l'image | Tag de nom d'image de conteneur Kubernetes. |
| ID de conteneur | ID de conteneur Kubernetes. |
| Nom du conteneur Kubernetes | Nom du conteneur Kubernetes. |
| Déploiement Kubernetes | Le déploiement Kubernetes auquel appartient un pod. |
| StatefulSet Kubernetes | Le StatefulSet Kubernetes auquel appartient un pod. |
| URL du dépôt | URL du dépôt Git. |
| ID du dépôt | ID qui identifie de manière unique un dépôt Git. |
| SHA de commit | SHA de commit Git. |
| Branche | Branche Git. |
| Tag | Tag Git. |
| E-mail de l'auteur | E-mail de l'auteur Git. |
| E-mail du committer | E-mail du committer Git. |
| Date du committer | Date du committer Git. |
| Date de l'auteur | Date de l'auteur Git. |
| Env | L'environnement dans lequel le pipeline CI est en cours d'exécution. |
| Ressource | La ressource utilisée par le pipeline CI. |
| Nom de l'opération | L'opération effectuée au sein du pipeline CI. |
| Type d'erreur | Type d'erreur rencontrée lors de l'exécution du CI. |
| Type | Type de l'exécution ou de l'entité CI. |
| Trace complète | Trace complète de l'exécution du pipeline CI. |
| Durée | La durée de l'exécution en secondes. |
| Version | Version du pipeline CI ou de l'outil utilisé. |
| Est la branche par défaut | Indique si l'exécution a été effectuée sur la branche par défaut du dépôt Git. |

Vous pouvez utiliser des facettes dans CI Visibility Explorer pour :

- [Rechercher et filtrer les exécutions de pipeline][5]
- Effectuer des analyses de pipeline
- Commencer le dépannage une fois vos pipelines terminés


### Facettes qualitatives {#qualitative-facets}

Les facettes qualitatives vous permettent d'accomplir les tâches suivantes :

- **Obtenir des informations relatives** pour les valeurs.
- **Compter les valeurs uniques**.
- Filtrer**fréquemment** vos exécutions de pipeline par rapport à des valeurs particulières. Par exemple, créez une facette sur un tag d'environnement pour limiter le dépannage aux environnements de développement, de staging ou de production.<br>

**Remarque&nbsp;:** Bien que les facettes ne soient pas nécessaires pour filtrer les tags, définir des facettes pour les tags que vous utilisez souvent lors de vos investigations peut vous aider à réduire votre temps de résolution.

### Mesures quantitatives {#quantitative-measures}

Utilisez des mesures quantitatives lorsque vous devez :

- **Agréger** des valeurs provenant de plusieurs exécutions de pipeline.
- **Filtrer par plage** vos exécutions de pipeline.
- **Trier** vos exécutions de pipeline par rapport à cette valeur.

#### Types {#types}

Les mesures ont soit une valeur entière longue, soit une valeur double pour des capacités équivalentes.

#### Unités {#units}

Les mesures prennent en charge des unités (**temps** en secondes ou **taille** en octets) pour la gestion des ordres de grandeur au moment de la requête et de l'affichage. L'unité est une propriété de la mesure elle-même, et non du champ.

Par exemple, considérez une `duration` mesure en nanosecondes. Supposons que les exécutions de pipeline de `service:A` aient `duration:10000000`, ce qui signifie `10 milliseconds`. Supposons que les exécutions de pipeline de `service:B` aient `duration:5000000`, ce qui signifie `5 milliseconds`. Utilisez `duration:>2ms` pour interroger systématiquement les tags d'exécution de pipeline des deux services à la fois. Pour plus d'informations sur les requêtes de recherche, consultez [Search Syntax][6].

## Panneau de facettes {#facet-panel}

La barre de recherche offre l'ensemble d'interactions le plus complet pour filtrer et regrouper vos données. Cependant, dans de nombreux cas, le panneau des facettes est un moyen simple de naviguer dans vos données. Ouvrez une facette pour voir un résumé de son contenu pour la portée de la requête actuelle.

La barre de recherche et l'URL s'adaptent automatiquement à vos sélections dans le volet des facettes.

- **Les facettes (qualitatives)** sont accompagnées d'une top list des valeurs uniques et d'un décompte des exécutions de pipeline correspondant à chacune d'elles.
- **Les mesures (quantitatives)** sont accompagnées d'un curseur indiquant les valeurs minimale et maximale. Utilisez le curseur, ou saisissez des valeurs numériques, pour limiter la requête de recherche à différentes bornes.


### Regroupement des facettes {#grouping-facets}

Les facettes sont regroupées en thèmes significatifs dans la liste des facettes. L'attribution ou la réattribution d'un groupe pour une facette n'affecte que la liste des facettes et n'a aucun impact sur la recherche ou l'analyse.

### Filtrage des facettes {#filtering-facets}

Utilisez la zone de recherche des facettes sur le panneau des facettes pour limiter toute la liste des facettes et naviguer vers la facette avec laquelle vous devez interagir. La recherche de facettes utilise le nom d'affichage de la facette et le nom du champ pour limiter les résultats.

## Création de facettes {#creating-facets}

La création d'une facette sur un attribut ou un tag d'exécution de pipeline n'est pas une étape obligatoire pour rechercher des exécutions de pipeline. Les facettes sont utiles si vous souhaitez ajouter une description significative à un attribut d'exécution de pipeline spécifique, ou si vous voulez que les valeurs d'attribut apparaissent dans la liste des facettes.

### Création de facettes à partir des panneaux latéraux des exécutions de pipeline {#creating-facets-from-the-pipeline-executions-side-panels}

Le moyen le plus simple de créer une facette consiste à l'ajouter depuis le panneau latéral des exécutions de pipeline afin que la plupart des détails de la facette soient pré-remplis.

{{< img src="continuous_integration/create_facet.png" alt="Créer une facette à partir du panneau latéral d'exécution de pipeline CI" style="width:100%;">}}

1. Accédez à une exécution de pipeline d'intérêt dans [CI Visibility Explorer][4] qui contient le champ sur lequel créer une facette.
2. Ouvrez le panneau latéral des exécutions de pipeline en sélectionnant l'exécution de pipeline dans la liste.
3. Cliquez sur le champ souhaité (dans l'onglet **Info** pour l'étendue d'une exécution de pipeline) et créez une facette à partir de là:

   - Si le champ a une valeur numérique, vous pouvez créer soit une facette, soit une mesure.
   - Si le champ a une valeur de chaîne, seule la création de facette est disponible.

### Création de facettes à partir de la liste des facettes {#creating-facets-from-the-facet-list}

S'il n'est pas possible de trouver une exécution de pipeline possédant le champ souhaité, créez une facette directement depuis le panneau des facettes en cliquant sur {{< ui >}}\+ Add{{< /ui >}}.

{{< img src="continuous_integration/add_facet.png" alt="Ajoutez une facette depuis le panneau latéral des facettes" style="width:30%;">}}

Définissez le nom (à savoir, la clé) du champ sous-jacent de votre facette.

- Utilisez le nom de la clé de tag pour les tags d'infrastructure.
- Utilisez le chemin d'attribut pour les attributs d'exécution de pipeline, avec le préfixe `@`.

La saisie semi-automatique basée sur le contenu des exécutions de pipeline des vues actuelles vous aide à définir le nom de champ approprié. Mais vous pouvez utiliser pratiquement n'importe quelle valeur ici, notamment dans le cas où vous n'avez pas encore reçu d'exécutions de pipeline correspondantes dans Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/ci
[2]: /fr/dashboards/
[3]: /fr/notebooks/
[4]: /fr/continuous_integration/explorer
[5]: /fr/continuous_integration/search
[6]: /fr/continuous_integration/explorer/search_syntax/
[7]: https://app.datadoghq.com/ci/pipeline-executions