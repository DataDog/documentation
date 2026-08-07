---
description: Découvrez comment utiliser des facettes pour filtrer et regrouper vos
  exécutions de déploiement.
further_reading:
- link: continuous_delivery/explorer/
  tag: Documentation
  text: Découvrir comment interroger et visualiser les déploiements
title: Facettes pour les exécutions de déploiement
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation

Les facettes correspondent à des tags définis par l'utilisateur et à des attributs issus de vos pipelines. Elles servent à effectuer des analyses de données à la fois [qualitatives](#facettes-qualitatives) et [quantitatives](#mesures-quantitatives). Elles vous permettent de manipuler vos déploiements dans les requêtes de recherche qui figurent dans les [dashboards][2] et les [notebooks][3].

Il n'est **pas nécessaire** de [créer des facettes] (#creation-de-facettes) pour [rechercher des exécutions de déploiement][5]. La fonctionnalité de remplissage automatique utilise les facettes existantes, mais toute entrée correspondant à des exécutions de déploiement entrantes s'applique également.

La [page Deployment Executions][4] inclut des facettes par défaut comme `Environment`, `Deployment Status` et `Deployment Provider`. Vous pouvez utiliser des facettes dans le CD Visibility Explorer pour effectuer les opérations suivantes :

- [Rechercher et filtrer des exécutions de déploiement][5]
- Effectuer des analyses de déploiement ou d'environnement
- Commencer à dépanner vos problèmes après l'exécution de vos déploiements

Accédez à [**Software Delivery** > **CD Visibility** > **Executions**][4] pour accéder à la liste des facettes située à gauche de la liste des exécutions de déploiement.

{{< img src="/continuous_delivery/explorer/facets.png" text="Liste des facette sur la page Deployment Executions du CD Visibility Explorer" style="width:100%" >}}

### Facettes qualitatives

Les facettes qualitatives vous permettent d'accomplir les tâches suivantes :

- **Obtenir des insights relatives** sur les valeurs
- **Compter des valeurs uniques**
- **Filtrer** régulièrement vos exécutions de déploiements selon des valeurs données ; vous pouvez par exemple utiliser la facette sur le tag environment pour réduire vos recherches aux environnements de production, de développement et intermédiaires.<br>

**Remarque :** bien que vous n'ayez pas besoin d'utiliser des facettes pour appliquer un filtre aux tags, vous pouvez accélérer la résolution des problèmes en définissant des facettes sur les tags que vous utilisez.

### Mesures quantitatives

Utilisez des mesures quantitatives pour accomplir ce qui suit :

- **Agréger** des valeurs provenant de plusieurs exécutions de déploiement
- **Appliquer un filtre** à vos exécutions de déploiement basé sur des plages de valeurs
- **Trier** vos exécutions de déploiement en fonction de ces valeurs

#### Types

Les mesures disposent d'un nombre entier (long) ou d'une double valeur. Ces deux types de valeurs proposent des fonctionnalités équivalentes.

#### Unités

Les mesures ont une unité (de **temps** en secondes ou de **taille** en octets) afin de gérer les ordres de grandeur au moment de la requête et de l'affichage. L'unité est une propriété de la mesure, et non du champ.

Prenons l'exemple d'une mesure `duration` en nanosecondes. Imaginons que les déploiements de `env:staging` aient comme durée `duration:10000000`, soit `10 milliseconds`, et que les déploiements de `env:qa` aient comme durée `duration:5000000`, soit `5 milliseconds`. Utilisez `duration:>2ms` pour interroger de manière cohérente les tags des exécutions de déploiement dans les deux environnements. Pour en savoir plus sur les requêtes de recherche, consultez la section [Syntaxe de recherche][6].

## Volet des facettes

La barre de recherche fournit un grand nombre de fonctionnalités interactives vous permettant de filtrer et regrouper vos données. Toutefois, dans de nombreuses situations, il est plus simple d'utiliser le volet des facettes pour parcourir vos données. Ouvrez une facette pour consulter une synthèse de son contenu en fonction du contexte de la requête actuellement appliquée.

La barre de recherche et l'URL s'adaptent automatiquement à vos sélections dans le volet des facettes.

- L'interface des **facettes (qualitatives)** propose une top list des valeurs uniques et indique le nombre d'exécutions de déploiement correspondant à chacune de ces valeurs.
- L'interface des **mesures (quantitatives)* comprend un curseur vous permettant de définir une valeur maximale ainsi qu'une valeur minimale. Utilisez le curseur, ou saisissez des valeurs numériques, pour restreindre la requête de recherche.

### Regrouper des facettes

Dans la liste des facettes, ces dernières sont regroupées selon différents thèmes pertinents. Les opérations d'attribution ou de réattribution d'une facette à un groupe affectent uniquement la liste des facettes et n'ont aucune incidence sur les fonctionnalités de recherche et d'analyse.

### Filtrer des facettes

Utilisez la zone de recherche du volet des facettes afin d'affiner la liste des facettes et d'accéder à celles dont vous avez besoin. La *recherche de facette* réduit le nombre de résultats affichés en se basant sur le nom d'affichage des facettes et sur le nom de leur champ.

## Créer des facettes

Il n'est pas nécessaire de créer une facette sur un attribut ou un tag d'exécution de déploiement pour rechercher des exécutions de déploiement. Les facettes s'avèrent utiles lorsque vous souhaitez ajouter une description pertinente à un attribut d'exécution de déploiement spécifique, ou lorsque vous souhaitez que les valeurs de l'attribut apparaissent dans la liste des facettes.

### Créer des facettes à partir du volet latéral des détails d'un déploiement

Pour préremplir la majorité des détails d'une facette, créez-la à partir du volet latéral des détails d'un déploiement.

{{< img src="continuous_delivery/explorer/create_facet.png" alt="Créer une facette à partir du volet latéral des détails d'un déploiement" style="width:100%;">}}

1. Naviguez jusqu'à l'exécution de déploiement qui vous intéresse sur la [page Deployment Executions][4] et qui contient le champ à partir duquel vous souhaitez créer une facette.
2. Ouvrez le volet latéral des détails du déploiement en sélectionnant l'exécution de déploiement dans la liste.
3. Cliquez sur le champ pertinent et créez une facette à partir de celui-ci :

   - Si la valeur du champ correspond à un nombre, vous pouvez créer une facette ou une mesure.
   - Si la valeur du champ correspond à une chaîne, vous pouvez uniquement créer une facette.

### Créer des facettes à partir de la liste des facettes

Si vous ne trouvez pas d'exécution de déploiement contenant le champ souhaité, créez une facette directement à partir du volet des facettes en cliquant sur **+ Add**.

{{< img src="continuous_delivery/explorer/add_facet.png" alt="Ajouter une facette à partir du volet latéral des facettes" style="width:30%;">}}

Définissez le nom (à savoir la clé) du champ sous-jacent de votre facette.

- Utilisez le nom de la clé du tag pour les tags d'environnement.
- Utilisez le chemin d'attribut pour les attributs d'exécution de déploiement, en ajoutant le préfixe `@`.

Grâce à la fonctionnalité de remplissage automatique, qui se base sur le contenu des déploiements d'exécution des vues actuelles, vous pouvez définir facilement un nom de champ adéquat. Toutefois, sachez que vous pouvez indiquer n'importe quelle valeur, surtout si aucune exécution de déploiement correspondante n'a été transmise à Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/ci
[2]: /fr/dashboards/
[3]: /fr/notebooks/
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /fr/continuous_delivery/explorer#deployment-executions
[6]: /fr/continuous_delivery/explorer/search_syntax