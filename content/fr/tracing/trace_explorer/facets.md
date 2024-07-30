---
description: Facettes de trace et volet des facettes
further_reading:
- link: tracing/trace_explorer/
  tag: Documentation
  text: En savoir plus sur le Trace Explorer
title: Facettes de spans
---

## Présentation

Les facettes sont des tags et des attributs issus de vos spans et définis par les utilisateurs. Elles servent à effectuer des analyses de données à la fois [qualitatives](#facettes-qualitatives) et [quantitatives](#mesures-facettes-quantitatives). Elles vous permettent de manipuler vos spans dans vos [monitors d'analyse de traces][3] ainsi que dans les requêtes APM qui apparaissent sur les [dashboards][4] et dans les [notebooks][5].

Le [Trace Explorer][6] inclut des facettes par défaut telles que `Status` et `Service`. Vous pouvez utiliser les facettes dans le Trace Explorer pour effectuer les opérations suivantes :

- [Rechercher des spans et les filtrer][1]
- Effectuer des analyses de traces
- Commencer le dépannage après l'ingestion de vos spans

{{< img src="tracing/trace_explorer/facets/facet_panel.png" alt="Le volet des facettes dans le Trace Explorer" style="width:90%;">}}

{{< site-region region="us,eu,us3,us5,ap1" >}}

Vous **ne devez pas nécessairement** [créer des facettes](#creer-des-facettes) pour [rechercher des spans][1], [générer des métriques à partir de spans][2] ou [indexer des spans avec des filtres de rétention][3]. Dans ces cas précis, même si les fonctionnalités de remplissage automatique affichent les facettes existantes, vous avez également la possibilité de saisir n'importe quelle valeur correspondant à des spans entrantes.

[1]: /fr/tracing/trace_explorer/search
[2]: /fr/tracing/trace_pipeline/generate_metrics
[3]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters

{{< /site-region >}}

### Facettes qualitatives

Les facettes qualitatives vous permettent d'accomplir les tâches suivantes :

- **Obtenir des informations relatives** pour certaines valeurs. Vous pouvez par exemple créer une facette sur un tag de span `datacenter` pour limiter votre enquête à une région spécifique en cas de détection de requêtes lentes.
- **Compter le nombre de valeurs uniques**. Vous pouvez par exemple créer une facette sur `user.email` pour déterminer le nombre d'utilisateurs distincts qui rencontrent des erreurs lorsqu'ils chargent une ressource spécifique.
- **Filter** régulièrement vos spans selon des valeurs données. Vous pouvez par exemple créer une facette sur un tag d'environnement pour limiter vos recherches aux environnements de développement, de staging et de production.<br>

**Remarque :** bien que vous n'ayez pas besoin de créer des facettes pour appliquer un filtre sur des tags, vous pouvez accélérer la résolution des problèmes en définissant des facettes sur les tags que vous utilisez régulièrement.

### Facettes quantitatives (mesures)

Les mesures vous permettent d'accomplir les tâches suivantes :
- **Agréger** des valeurs à partir de plusieurs traces. Vous pouvez par exemple créer une mesure sur le nombre de lignes dans Cassandra et visualiser le 95e centile ou les principaux référents selon la somme des tailles de fichiers demandée.
- Calculer les **services avec la plus forte latence** (pour les paniers dépassant 1 000 €, par exemple).
- **Filtrer des valeurs continues**, par exemple la taille en octets de chaque bloc de charge utile d'un flux vidéo.

#### Types de mesure

Les mesures disposent d'un nombre entier (long) ou d'une double valeur. Ces deux types de valeurs proposent des fonctionnalités équivalentes.

#### Unités

Les mesures ont une unité (de **temps** en secondes ou de **taille** en octets) afin de gérer les ordres de grandeur au moment de la requête et de l'affichage. L'unité est une propriété de la mesure, et non du champ.

Prenons l'exemple d'une mesure `duration` exprimée en nanosecondes. Imaginons que les spans du service `service:A` ont la valeur de temps `duration:1000`, c'est-à-dire une durée de `1000 milliseconds`. Imaginons également que les spans du service `service:B` ont la valeur de temps `duration:500`, c'est-à-dire une durée de `500 microseconds`. Appliquez le filtre `duration:>20ms` pour interroger systématiquement les tags de span des deux services simultanément. Consultez la section [Syntaxe de requête][1] pour en savoir plus sur les requêtes.

## Volet des facettes

La barre de recherche fournit un grand nombre de fonctionnalités interactives vous permettant de filtrer et regrouper vos données. Toutefois, dans de nombreuses  situations, il est plus simple d'utiliser le volet des facettes pour parcourir vos données. Ouvrez une facette pour consulter une synthèse de son contenu en fonction du contexte de la requête actuellement appliquée.

La barre de recherche et l'URL s'adaptent automatiquement à vos sélections dans le volet des facettes.

- L'interface des **facettes (qualitatives)** propose une top list des valeurs uniques et indique le nombre de spans correspondant à chacune de ces valeurs.
- L'interface des **mesures (quantitatives)* comprend un curseur vous permettant de définir une valeur maximale ainsi qu'une valeur minimale. Utilisez le curseur, ou saisissez des valeurs numériques, pour restreindre la requête de recherche.

### Masquer des facettes

Votre organisation dispose de toute une série de facettes pour répondre aux différents besoins des équipes qui utilisent les traces. Toutefois, vous n'utiliserez probablement qu'une petite partie de ces facettes pour résoudre une situation donnée.

Vous pouvez donc **masquer les facettes** dont vous ne vous servez pas régulièrement, afin de conserver uniquement les facettes pertinentes qui vous aideront à parvenir à vos fins.

{{< img src="tracing/trace_explorer/facets/hide_facets.png" alt="Masquer une facette" style="width:30%;">}}

Les facettes masquées peuvent toujours être utilisées en cas de besoin (voir la section [Filtrer des facettes](#filtrer-des-facettes)). Il est possible de les rendre à nouveau visibles depuis la fonctionnalité de recherche de facettes.

{{< img src="logs/explorer/facet/unhide_facet.png" alt="Afficher de nouveau une facette" style="width:30%;">}}

#### Facettes masquées pour les membres d'équipe

Lorsque vous masquez des facettes, vous les retirez de votre contexte de dépannage. Cela n'a donc aucune incidence sur la vue des autres membres de votre équipe, sauf si vous mettez à jour une vue enregistrée. En effet, les facettes masquées font partie du contexte capturé au sein d'une vue enregistrée.

### Regrouper des facettes

Dans la liste des facettes, ces dernières sont regroupées selon différents thèmes pertinents. Les opérations d'attribution ou de réattribution d'une facette à un groupe affectent uniquement la liste des facettes et n'ont aucune incidence sur les fonctionnalités de recherche et d'analyse.

{{< img src="tracing/trace_explorer/facets/group_facets.png" alt="Regrouper des facettes" style="width:30%;">}}

### Filtrer des facettes

Utilisez la zone de recherche sur le volet des facettes afin d'affiner la liste des facettes et d'accéder plus facilement à celles dont vous avez besoin. La recherche de facette réduit le nombre de résultats affichés en se basant sur le nom d'affichage des facettes et sur le nom de leur champ.

{{< img src="tracing/trace_explorer/facets/filter_facets.png" alt="Rechercher une facette" style="width:30%;">}}

## Créer des facettes

Il n'est pas forcément nécessaire de créer une facette sur un attribut/tag de span pour rechercher des spans. Les facettes sont utiles si vous souhaitez ajouter une description claire à un attribut de span spécifique, ou si vous souhaitez que les valeurs d'attribut de span apparaissent dans la liste des facettes située à gauche de la liste des spans.

### Créer des facettes à partir du volet latéral des traces

La façon la plus simple de créer une facette consiste à l'ajouter à partir du volet latéral des traces. En procédant de la sorte, la plupart des détails de la facette (tels que le chemin du champ et le type sous-jacent) seront pré-renseignés. Dans le [Trace Explorer][1], accédez à une span de votre choix qui contient le champ sur lequel vous souhaitez créer une facette. Ouvrez le volet latéral des traces de cette span en sélectionnant cette dernière dans la liste. Cliquez sur le champ souhaité (dans les tags de span ou dans les tags d'infrastructure) et créez une facette :

- Si la valeur du champ correspond à un nombre, vous pouvez créer une facette ou une mesure.
- Si la valeur du champ correspond à une chaîne, vous pouvez uniquement créer une facette.

{{< img src="tracing/trace_explorer/facets/create_facet.png" alt="Ajouter une facette à partir de tags" style="width:50%;">}}

### Créer des facettes à partir de la liste des facettes

Si vous ne trouvez pas de span contenant le champ souhaité, créez une facette directement à partir du volet des facettes en cliquant sur **+ Add**.

Définissez le nom (à savoir la clé) du champ sous-jacent de votre facette.

- Utilisez le nom de la clé du tag pour les tags d'infrastructure.
- Utilisez le chemin d'attribut pour les attributs de span, en ajoutant le préfixe `@`.

Grâce à la fonctionnalité de remplissage automatique, qui se base sur le contenu des spans des vues actuelles, vous pouvez définir facilement un nom de champ adéquat. Toutefois, sachez que vous pouvez indiquer n'importe quelle valeur, surtout si aucune span correspondante n'a été transmise par Datadog.

{{< img src="tracing/trace_explorer/facets/create_facet_from_scratch.png" alt="Créer une facette de toute pièce" style="width:30%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_explorer/query_syntax/
[2]: /fr/tracing/trace_explorer/group/
[3]: /fr/monitors/types/apm/?tab=analytics
[4]: /fr/dashboards/widgets/
[5]: /fr/notebooks/
[6]: /fr/tracing/trace_explorer/