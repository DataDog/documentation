---
description: Découvrez comment utiliser les facettes par défaut pour rechercher vos
  exécutions de pipeline dans le CI Visibility Explorer.
further_reading:
- link: continuous_integration/search/
  tag: Documentation
  text: Découvrir comment rechercher vos pipelines
- link: continuous_integration/explorer/
  tag: Documentation
  text: En savoir plus sur le CI Visibility Explorer
title: Facettes pour les exécutions de pipeline
---

## Présentation

Les facettes correspondent à des tags définis par l'utilisateur et à des attributs issus de vos pipelines. Elles servent à effectuer des analyses de données à la fois [qualitatives](#facettes-qualitatives) et [quantitatives](#mesures-quantitatives). Elles vous permettent de manipuler vos pipelines dans vos [monitors de pipeline de CI][1] ainsi que dans les requêtes de recherche qui figurent dans les [dashboards][2] et les [notebooks][3].

Il n'est **pas nécessaire** de [créer des facettes] (#creer-des-facettes) pour [rechercher des exécutions de pipeline][5]. La fonctionnalité de remplissage automatique utilise les facettes existantes, mais toute entrée correspondant à des exécutions de pipeline entrantes s'applique également.

## Facettes communes

Naviguez jusqu'à [**Software Delivery** > **CI Visibility** > **Executions**][7] pour accéder à la liste des facettes située à gauche de la liste des exécutions de pipeline.

{{< img src="/continuous_integration/facets-pipelines.png" text="Liste des facettes sur la page Pipeline Executions du CI Visibility Explorer" style="width:100%" >}}

Le [CI Visibility Explorer][4] inclut les facettes par défaut suivantes :

| Facette | Description |
|---|---|
| CI Provider | Le nom du fournisseur de CI (GitHub, GitLab, etc.). |
| Pipeline Name | Le nom du pipeline de CI. |
| Node Name | Le nom du nœud de CI qui a exécuté le pipeline, le stage ou le job. |
| Node Labels | Les étiquettes associées au nœud de CI qui a exécuté le pipeline, le stage ou le job. |
| Pipeline URL | L'URL du fournisseur pour une exécution de pipeline. |
| Pipeline ID | L'ID du pipeline. |
| Pipeline Number | Le numéro d'exécution d'un pipeline de CI, qui est défini par le fournisseur de CI. Cette valeur augmente en cas de nouvelle tentative partielle d'exécution d'un pipeline. |
| Job URL | L'URL du fournisseur pour une exécution de job. |
| Stage Name | Le nom du stage de CI. |
| Job Name | Le nom du job de CI. |
| Kubernetes Namespace | L'espace de nommage dans lequel le pod Kubernetes s'exécute. |
| Kubernetes pod Nom | Le nom du pod Kubernetes. |
| Image Tag | Le tag d'image du conteneur Kubernetes. |
| Container Name | Le tag de nom du conteneur Kubernetes. |
| Image Name | Le tag de nom de l'image du conteneur Kubernetes. |
| Container ID | L'ID du conteneur Kubernetes. |
| Kubernetes Container Name | Le nom du conteneur Kubernetes. |
| Kubernetes Deployment | Le déploiement Kubernetes auquel le pod appartient. |
| Kubernetes Stateful Set | Le StatefulSet Kubernet auquel le pod appartient. |
| Repository URL | L'URL du référentiel Git. |
| Repository ID | L'ID unique qui identifie un référentiel Git. |
| Commit SHA | Le SHA du commit Git. |
| Branch | La branche Git. |
| Tag | Le tag Git. |
| Author Email | L'adresse e-mail de l'auteur Git. |
| Committer Email | L'adresse e-mail de l'auteur du commit Git. |
| Committer Date | La date de l'auteur du commit Git. |
| Author Date | La date de l'auteur Git. |
| Env | L'environnement dans lequel le pipeline de CI s'exécute. |
| Resource | La ressource utilisée par le pipeline de CI. |
| Operation Name | L'opération réalisée au sein du pipeline de CI. |
| Error Type | Le type d'erreur rencontrée lors de l'exécution du CI. |
| Type | Le type de l'exécution ou de l'entité de CI. |
| Complete Trace | La trace complète de l'exécution de pipeline de CI. |
| Duration | La durée de l'exécution, en secondes. |
| Version | La version du pipeline de CI ou de l'outil utilisé. |
| Is Default Branch | Indique si l'exécution s'applique ou non à la branche par défaut du référentiel Git. |

Vous pouvez utiliser des facettes dans le CI Visibility Explorer pour accomplir ce qui suit :

- [Rechercher et filtrer des exécutions de pipeline][5]
- Analyser des pipelines
- Commencer à dépanner vos problèmes après l'exécution de vos pipelines


### Facettes qualitatives

Les facettes qualitatives vous permettent d'accomplir les tâches suivantes :

- **Obtenir des insights relatives** sur les valeurs
- **Compter des valeurs uniques**
- **Filtrer** régulièrement vos exécutions de pipeline selon des valeurs données ; vous pouvez par exemple créer une facette sur le tag environment pour réduire vos recherches aux environnements de production, de développement et intermédiaires.<br>

**Remarque :** bien que vous n'ayez pas besoin de créer des facettes pour appliquer un filtre sur des tags, vous pouvez accélérer la résolution des problèmes en définissant des facettes sur les tags que vous utilisez régulièrement.

### Mesures quantitatives

Utilisez des mesures quantitatives pour accomplir ce qui suit :

- **Agréger** des valeurs provenant de plusieurs exécutions de pipeline
- **Appliquer un filtre** à vos exécutions de pipeline basé sur des plages de valeurs
- **Trier** vos exécutions de pipeline en fonction de ces valeurs

#### Types

Les mesures disposent d'un nombre entier (long) ou d'une double valeur. Ces deux types de valeurs proposent des fonctionnalités équivalentes.

#### Unités

Les mesures ont une unité (de **temps** en secondes ou de **taille** en octets) afin de gérer les ordres de grandeur au moment de la requête et de l'affichage. L'unité est une propriété de la mesure, et non du champ.

Prenons l'exemple d'une mesure `duration` en nanosecondes. Imaginons que les exécutions de pipeline du service `service:A` aient comme durée `duration:10000000`, soit `10 milliseconds`, et que les exécutions de pipeline du service `service:B` aient comme durée `duration:5000000`, soit `5 milliseconds`. Utilisez `duration:>2ms` pour interroger de manière cohérente les tags des exécutions de pipeline dans les deux services. Pour en savoir plus sur les requêtes de recherche, consultez la section [Syntaxe de recherche][6].

## Volet des facettes

La barre de recherche fournit un grand nombre de fonctionnalités interactives vous permettant de filtrer et regrouper vos données. Toutefois, dans de nombreuses situations, il est plus simple d'utiliser le volet des facettes pour parcourir vos données. Ouvrez une facette pour consulter une synthèse de son contenu en fonction du contexte de la requête actuellement appliquée.

La barre de recherche et l'URL s'adaptent automatiquement à vos sélections dans le volet des facettes.

- L'interface des **facettes (qualitatives)** propose une top list des valeurs uniques et indique le nombre d'exécutions de pipeline correspondant à chacune de ces valeurs.
- L'interface des **mesures (quantitatives)* comprend un curseur vous permettant de définir une valeur maximale ainsi qu'une valeur minimale. Utilisez le curseur, ou saisissez des valeurs numériques, pour restreindre la requête de recherche.


### Regrouper des facettes

Dans la liste des facettes, ces dernières sont regroupées selon différents thèmes pertinents. Les opérations d'attribution ou de réattribution d'une facette à un groupe affectent uniquement la liste des facettes et n'ont aucune incidence sur les fonctionnalités de recherche et d'analyse.

### Filtrer des facettes

Utilisez la zone de recherche du volet des facettes afin d'affiner la liste des facettes et d'accéder à celles dont vous avez besoin. La recherche de facette réduit le nombre de résultats affichés en se basant sur le nom d'affichage des facettes et sur le nom de leur champ.

## Créer des facettes

Il n'est pas nécessaire de créer une facette sur un attribut ou un tag d'exécution de pipeline pour rechercher des exécutions de pipeline. Les facettes s'avèrent utiles lorsque vous souhaitez ajouter une description pertinente à un attribut d'exécution de pipeline spécifique, ou lorsque vous souhaitez que les valeurs de l'attribut apparaissent dans la liste des facettes.

### Créer des facettes à partir du volet latéral des exécutions de pipeline

Pour créer une facette, la méthode la plus simple consiste à l'ajouter depuis le volet latéral des exécutions de pipeline. Ainsi, la majorité des détails de la facette sont préremplis.

{{< img src="continuous_integration/create_facet.png" alt="Créer une facette à partir du volet latéral d'une exécution de pipeline de CI" style="width:100%;">}}

1. Naviguez jusqu'à l'exécution de pipeline qui vous intéresse dans le [CI Visibility Explorer][4] et qui contient le champ à partir duquel vous souhaitez créer une facette.
2. Ouvrez le volet latéral des exécutions de pipeline en sélectionnant l'exécution de pipeline dans la liste.
3. Cliquez sur le champ de votre choix (dans l'onglet **Info** pour la span d'une exécution de pipeline) et créez une facette à partir des informations affichées :

   - Si la valeur du champ correspond à un nombre, vous pouvez créer une facette ou une mesure.
   - Si la valeur du champ correspond à une chaîne, vous pouvez uniquement créer une facette.

### Créer des facettes à partir de la liste des facettes

Si vous ne trouvez pas d'exécution de pipeline contenant le champ souhaité, créez une facette directement à partir du volet des facettes en cliquant sur **+ Add**.

{{< img src="continuous_integration/add_facet.png" alt="Ajouter une facette à partir du volet latéral des facettes" style="width:30%;">}}

Définissez le nom (à savoir la clé) du champ sous-jacent de votre facette.

- Utilisez le nom de la clé du tag pour les tags d'infrastructure.
- Utilisez le chemin d'attribut pour les attributs d'exécution de pipeline, en ajoutant le préfixe `@`.

Grâce à la fonctionnalité de remplissage automatique, qui se base sur le contenu des exécutions de pipeline des vues actuelles, vous pouvez définir facilement un nom de champ adéquat. Toutefois, sachez que vous pouvez indiquer n'importe quelle valeur, surtout si aucune exécution de pipeline correspondante n'a été transmise à Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/ci
[2]: /fr/dashboards/
[3]: /fr/notebooks/
[4]: /fr/continuous_integration/explorer
[5]: /fr/continuous_integration/search
[6]: /fr/continuous_integration/explorer/search_syntax/
[7]: https://app.datadoghq.com/ci/pipeline-executions