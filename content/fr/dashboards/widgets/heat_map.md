---
aliases:
- /fr/graphing/widgets/heat_map/
description: Générez une carte thermique temporelle pour une métrique donnée.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
kind: documentation
title: Widget Carte thermique
widget_type: heatmap
---

Les cartes thermiques illustrent les métriques agrégées en fonction de nombreux tags, tels que des *hosts*. Plus le nombre de hosts partageant une valeur donnée est élevé, plus le carré est foncé.

Cette visualisation affiche une seule requête de métrique. Les requêtes supplémentaires sont ignorées.

**Remarque** : la détection des singularités n'est pas possible avec cette visualisation.

{{< img src="dashboards/widgets/heat_map/heat_map.png" alt="Carte thermique" >}}

## Configuration

{{< img src="dashboards/widgets/heat_map/heat_map_setup.png" alt="Configuration d'une carte thermique" style="width:80%;">}}

### Configuration

Configurez votre requête de métrique comme d'habitude. **Remarque** : ce type de visualisation est uniquement utile lorsque les métriques sont agrégées en fonction de clés de tag, par exemple pour chaque `host`.

Utilisez les réglages `avg`/`max`/`min`/`sum by`/etc. pour visualiser vos données en fonction des tags associés.

### Options

#### Superposition d'événements

Intégrez des événements de systèmes associés pour ajouter plus de contexte à votre graphique. Par exemple, vous pouvez ajouter des commits Github, des événements de votre environnement staging ou des événements de vos conteneurs qui possèdent un certain préfixe. Développez la section **Event Overlays** et saisissez une requête pour afficher ces événements. Utilisez le même format de requête que pour l'[Events Explorer][1]. Le tableau ci-dessous répertorie des exemples de requête :

| Requête                     | Description                                                      |
|---------------------------|------------------------------------------------------------------|
| `source:(github OR chef)` | Affiche les événements provenant de GitHub ou de Chef.                                 |
| `env:staging`             | Affiche les événements avec le tag `env:staging`.                          |
| `container_id:foo*`       | Affiche les événements provenant de tous les conteneurs dont l'ID commence par `foo`. |

#### Commandes de l'axe des ordonnées

Les commandes de l'axe des ordonnées sont disponibles dans l'interface ainsi que dans l'éditeur JSON.

Elles vous permettent d'accomplir les actions suivantes :

* Régler l'axe des ordonnées sur un intervalle donné.
* Changer automatiquement les limites de l'axe des ordonnées en définissant une limite en pourcentage ou en valeur absolue ; cette limite peut être appliquée à l'une des deux extrémités du graphique (inférieure ou supérieure) pour supprimer les singularités
* Changer l'échelle de l'axe des ordonnées afin de passer d'une échelle linéaire à une échelle logarithmique, racine carrée ou puissance

Changer l'échelle de l'axe des ordonnées en développant le bouton *Y-Axis Controls*.

Les options de configuration suivantes sont disponibles :

| Option                | Obligatoire | Description                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | Non       | Spécifie la valeur minimale (et/ou maximale) à afficher sur l'axe des ordonnées. Indiquez un nombre ou `Auto` (la valeur par défaut).                                                                                                   |
| `Scale`               | Non       | Spécifie le type d'échelle. Valeurs autorisées :<br>- *linear* : une échelle linéaire (échelle par défaut).<br>- *log* : une échelle logarithmique<br>- *pow* : une échelle basée sur une puissance de 2. La valeur par défaut est 2, mais celle-ci peut être modifiée dans l'éditeur JSON.<br>- *sqrt* : une échelle basée sur la racine carrée. |
| `Always include zero` | Non       | Indique s'il faut toujours inclure le zéro ou ajuster l'axe à la plage de données. Par défaut, le zéro est toujours inclus.                                                                                                                     |

**Remarque** : comme la fonction log mathématique n'accepte pas les valeurs négatives, notre échelle log ne fonctionne que si les valeurs ont le même signe (tout > 0 ou tout < 0). Si ce n'est pas le cas, un graphique vide s'affiche.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la section [Dashboards][2] pour en savoir plus.

Consultez le tableau ci-dessous pour découvrir le [schéma JSON][3] utilisé pour le widget Carte thermique :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/events/explorer/#search-syntax
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/