---
description: Découvrez les facettes pour filtrer et regrouper vos exécutions de déploiement.
further_reading:
- link: continuous_delivery/explorer/
  tag: Documentation
  text: Découvrez comment interroger et visualiser les déploiements
title: Facettes d'exécution de déploiement
---
{{< callout btn_hidden="true" header="faux" >}}
CD Visibility est en préversion. L'accès est limité aux organisations déjà inscrites.
{{< /callout >}}

## Présentation {#overview}

Les facettes sont des tags et des attributs définis par l'utilisateur provenant de vos pipelines. Elles sont utiles pour l'analyse de données [qualitatives](#qualitative-facets) et [quantitatives](#quantitative-measures). Les facettes vous permettent de manipuler vos déploiements dans les requêtes de recherche qui apparaissent sur les [dashboards][2] et dans les [notebooks][3].

[La création de facettes](#creating-facets) n'est **pas requise** pour [rechercher des exécutions de déploiement][5]. Les capacités de saisie semi-automatique utilisent les facettes existantes, mais toute entrée correspondant aux exécutions de déploiement entrantes est également prise en compte.

La [page Deployment Executions][4] inclut des facettes prêtes à l'emploi telles que `Environment`, `Deployment Status` et `Deployment Provider`. Vous pouvez utiliser des facettes dans CD Visibility Explorer pour :

- [Rechercher et filtrer les exécutions de déploiement][5].
- Effectuer des analyses de déploiement ou d'environnement.
- Commencer le dépannage une fois vos déploiements terminés.

Accédez à [**Software Delivery** > **CD Visibility** > **Executions**][4] pour accéder à la liste des facettes à gauche de la liste des exécutions de déploiement.

{{< img src="/continuous_delivery/explorer/facets.png" text="Facets list on the Deployment Executions page of the CD Visibility Explorer" style="width:100%" >}}

### Facettes qualitatives {#qualitative-facets}

Les facettes qualitatives vous permettent d'accomplir les tâches suivantes :

- **Obtenir des informations relatives** pour les valeurs.
- **Compter les valeurs uniques**.
- Utilisez fréquemment des **filtres** sur vos exécutions de déploiement selon des valeurs particulières. Par exemple, utilisez la facette du tag d'environnement pour limiter le dépannage aux environnements de développement, de pré-production ou de production.<br>

**Remarque :** Bien que les facettes ne soient pas nécessaires pour filtrer par tags, définir des facettes pour les tags que vous utilisez lors des investigations peut réduire votre temps de résolution.

### Mesures quantitatives {#quantitative-measures}

Utilisez des mesures quantitatives lorsque vous devez :

- **Agrégez** les valeurs de plusieurs exécutions de déploiement.
- **Filtrez par plage** vos exécutions de déploiement.
- **Triez** vos exécutions de déploiement par rapport à cette valeur.

#### Types {#types}

Les mesures ont soit une valeur entière longue, soit une valeur double pour des capacités équivalentes.

#### Unités {#units}

Les mesures prennent en charge des unités (**temps** en secondes ou **taille** en octets) pour gérer les ordres de grandeur au moment de la requête et de l'affichage. L'unité est une propriété de la mesure elle-même, et non du champ.

Par exemple, considérez une `duration` mesure en nanosecondes. Supposons que les déploiements de `env:staging` aient `duration:10000000`, ce qui signifie `10 milliseconds`. Supposons que les déploiements de `env:qa` aient `duration:5000000`, ce qui signifie `5 milliseconds`. Utilisez `duration:>2ms` pour interroger de manière cohérente les tags d'exécution de déploiement des deux environnements à la fois. Pour plus d'informations sur les requêtes de recherche, consultez [Search Syntax][6].

## Panneau de facettes {#facet-panel}

La barre de recherche offre l'ensemble d'interactions le plus complet pour filtrer et regrouper vos données. Cependant, dans de nombreux cas, le panneau des facettes est un moyen simple de naviguer dans vos données. Ouvrez une facette pour voir un résumé de son contenu pour le périmètre de la requête actuelle.

La barre de recherche et l'URL s'adaptent automatiquement à vos sélections dans le volet des facettes.

- **Les facettes (qualitatives)** sont accompagnées d'une top list de valeurs uniques et du nombre d'exécutions de déploiement correspondant à chacune d'elles.
- **Les mesures (quantitatives)** sont accompagnées d'un curseur indiquant les valeurs minimale et maximale. Utilisez le curseur, ou saisissez des valeurs numériques, pour limiter la requête de recherche à différentes bornes.

### Regroupement des facettes {#grouping-facets}

Les facettes sont regroupées en thèmes significatifs dans la liste des facettes. L'attribution ou la réattribution d'un groupe pour une facette n'affecte que la liste des facettes et n'a aucun impact sur la recherche ou l'analyse.

### Filtrage des facettes {#filtering-facets}

Utilisez la zone de recherche des facettes sur le panneau des facettes pour limiter toute la liste des facettes et naviguer vers la facette avec laquelle vous devez interagir. *Search facets* utilise le nom d'affichage de la facette et le nom du champ pour délimiter les résultats.

## Création de facettes {#creating-facets}

La création d'une facette sur un attribut ou un tag d'exécution de déploiement n'est pas requise pour rechercher des exécutions de déploiement. Les facettes sont utiles si vous souhaitez ajouter une description significative à un attribut d'exécution de déploiement spécifique, ou si vous voulez que les valeurs d'attribut apparaissent dans la liste des facettes.

### Création de facettes depuis le panneau latéral Deployment Details {#creating-facets-from-the-deployment-details-side-panel}

Créez une facette depuis le panneau latéral Deployment Details afin que la plupart des détails de la facette soient préremplis.

{{< img src="continuous_delivery/explorer/create_facet.png" alt="Créer une facette depuis le panneau latéral Deployment Details" style="width:100%;">}}

1. Accédez à une exécution de déploiement qui vous intéresse sur la [page Deployment Executions][4] et qui contient le champ sur lequel créer une facette.
2. Ouvrez le panneau latéral Deployment Details en sélectionnant l'exécution de déploiement dans la liste.
3. Cliquez sur le champ souhaité et créez une facette à partir de là :

   - Si le champ a une valeur numérique, vous pouvez créer soit une facette, soit une mesure.
   - Si le champ a une valeur de chaîne, seule la création de facette est disponible.

### Création de facettes à partir de la liste des facettes {#creating-facets-from-the-facet-list}

S'il n'est pas possible de trouver une exécution de déploiement possédant le champ souhaité, créez une facette directement depuis le panneau des facettes en cliquant sur **+ Add**.

{{< img src="continuous_delivery/explorer/add_facet.png" alt="Ajoutez une facette depuis le panneau latéral des facettes" style="width:30%;">}}

Définissez le nom (à savoir, la clé) du champ sous-jacent de votre facette.

- Utilisez le nom de la clé de tag pour les tags d'environnement.
- Utilisez le chemin d'attribut pour les attributs d'exécution de déploiement, avec le préfixe `@`.

La saisie semi-automatique basée sur le contenu des exécutions de déploiement des vues actuelles vous aide à définir le nom de champ approprié. Mais vous pouvez utiliser pratiquement n'importe quelle valeur ici, notamment si Datadog n'a pas encore reçu d'exécutions de déploiement correspondantes.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/ci
[2]: /fr/dashboards/
[3]: /fr/notebooks/
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /fr/continuous_delivery/explorer#deployment-executions
[6]: /fr/continuous_delivery/explorer/search_syntax