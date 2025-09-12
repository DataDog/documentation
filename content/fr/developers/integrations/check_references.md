---
description: Découvrez les différentes ressources à inclure lors de la préparation
  d'une intégration Datadog.
further_reading:
- link: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
  tag: Code source
  text: Règles de contribution pour le site de documentation
- link: /developers/integrations/
  tag: Documentation
  text: En savoir plus sur la création d'une intégration basée sur l'Agent ou l'API
- link: /developers/integrations/api_integration/
  tag: Documentation
  text: En savoir plus sur l'utilisation d'OAuth pour les intégrations basées sur
    l'API
title: Références pour les ressources d'intégration
---
## Présentation

Cette page vous présente les fichiers à renseigner pour créer une offre sur la page [**Integrations**][12] ou la page [**Marketplace**][9]. 

<div class="alert alert-info">Certains fichiers s'appliquent uniquement aux intégrations héritées qui <em>n'ont pas</em> été créées avec la plateforme de développement d'intégrations.</div>

## Fichier de configuration

Lors de la préparation d'une nouvelle intégration, vous devez inclure un exemple de configuration contenant les options nécessaires et des valeurs par défaut raisonnables. Le fichier de configuration d'exemple, situé dans `<CHECK_NAME>/datadog_checks/<CHECK_NAME>/data/conf.yaml.example`, comporte deux éléments principaux : `init_config` et `instances`. 

La configuration sous `init_config` s'applique globalement à l'intégration, et est utilisée pour chaque instance de l'intégration, tandis que tout ce qui figure dans `instances` est propre à une instance donnée.

Les blocs de configuration sous chaque section prennent le format suivant :

```yaml
## @<COMMANDE> [- <ARGUMENTS>]
## <LIGNE DESCRIPTION 1>
## <LIGNE DESCRIPTION 2>
#
<KEY>: <VALUE>
```

Les blocs de configuration doivent respecter quelques principes :

- Les descriptions ne doivent pas être vides.
- Suivez toujours ce format : `<THIS_IS_A_PLACEHOLDER>` pour les placeholders. Pour plus d'informations, consultez la [les règles de contribution pour le site de documentation][1]. 
- Par défaut, tous les paramètres requis ne sont **pas** mis en commentaire.
- Par défaut, tous les paramètres facultatifs sont mis en commentaire.
- Si un placeholder présente une valeur par défaut pour une intégration (comme l'endpoint de statut d'une intégration), celle-ci peut être utilisée à la place d'un placeholder générique.

### Spécification `@param`

Vous pouvez utiliser la commande `@param` pour décrire les blocs de configuration et fournir une documentation pour votre configuration. 

`@param` est implémenté selon l'une des formes suivantes :

```text
@param <nom> - <type> - requis
@param <nom> - <type> - facultatif
@param <nom> - <type> - facultatif - valeur par défaut : <valeur_defaut>
```

**Arguments** :

- `nom` : le nom du paramètre, par exemple `search_string` (obligatoire).
- `type` : le type de données pour la valeur du paramètre (obligatoire).
          Les valeurs possibles incluent : _boolean_, _string_, _integer_, _double_, _float_, _dictionary_, _list\*_ et _object\*_.
- `valeur_defaut` : la valeur par défaut pour le paramètre ; peut être laissé vide (facultatif).

Les variables `list` et `object` couvrent plusieurs lignes et font l'objet de règles spéciales.

- Dans une `list`, les éléments individuels ne sont pas documentés via la spécification `@param`.
- Dans un `object`, vous avez la possibilité de documenter les éléments individuellement avec la spécification `@param` ou de spécifier une description commune au niveau supérieur juste après la spécification de l'objet.

### Paramètres facultatifs

Un paramètre facultatif doit être mis en commentaire par défaut. Au début de chaque ligne couverte par le paramètre, ajoutez `#` en appliquant la même indentation que pour la spécification `@param`.

### Commentaires de bloc

Vous pouvez ajouter un commentaire de bloc n'importe où dans le fichier de configuration. Les règles suivantes doivent être appliquées :

- Les commentaires commencent par `##`.
- Les commentaires doivent être indentés comme les variables (le trait d'union ne compte pas).

Pour en savoir plus sur la syntaxe YAML, consultez l'[article Wikipédia sur YAML][2]. Vous pouvez aussi utiliser le [parser YAML en ligne][3].

## Fichier manifest

Chaque offre de la page [**Integrations**][4] ou de la page [**Marketplace**][11] contient un fichier `manifest.json` qui définit les paramètres de fonctionnement, le positionnement dans l'écosystème des intégrations Datadog, et des métadonnées supplémentaires.

{{% integration-assets-reference %}}

### Tags de classification

Vous pouvez définir plusieurs catégories et spécifier les types de données envoyées ou interrogées pour l'intégration à l'aide du paramètre `classifier_tags`.

Vous trouverez ci-dessous la liste complète des tags de classification pour le fichier `manifest.json` : 

{{% integration_categories %}}

## Fichier service_check

Le fichier `service_check.json` décrit les checks de service effectués par l'intégration.

Vous trouverez ci-dessous la liste complète des attributs obligatoires pour le fichier `service_checks.json` : 

| Attribut       | Rôle                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `agent_version` | La version minimale prise en charge de l'Agent.                                                                                           |
| `integration`   | Le nom de l'intégration qui envoie le check de service. Doit correspondre au `tile.title` non normalisé de `manifest.json`.   |
| `check`         | Nom du check de service. Il doit être unique.                                                                              |
| `statuses`      | La liste des différents statuts du check. Valeurs autorisées : `ok`, `warning`, `critical` ou `unknown`.   |
| `groups`        | [Tags][8] envoyés avec le check de service.                                                                                     |
| `name`          | Le nom d'affichage du check de service. Le nom d'affichage doit être clair et unique dans l'ensemble des intégrations.       |
| `description`   | Description du check de service.                                                                                           |


## Fichier metadata des métriques

Le fichier `metadata.csv` décrit toutes les métriques pouvant être recueillies par l'intégration.

Vous trouverez ci-dessous la liste complète des attributs obligatoires et facultatifs pour le fichier `metadata.csv` : 

| Nom de la colonne     | Obligatoire ou facultatif | Rôle                                                                                                                                                                                                                                                                                                                             |
| --------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric_name`   | Obligatoire          | Nom de la métrique.                                                                                                                                                                                                                                                                                                                     |
| `metric_type`   | Obligatoire          | Type de la métrique. Pour une liste des types d'envoi de métriques disponibles, consultez la section [Types de métriques][6].                                                                                                                                                                                                                                                                                                                |
| `interval`      | Facultatif           | Intervalle de collecte de la métrique en secondes.                                                                                                                                                                                                                                                                                            |
| `unit_name`     | Facultatif           | Unité de la métrique. Pour une liste complète des unités prises en charge, consultez la section [Unités de métriques][7].                                                                                                                                                                                                                                                                              |
| `per_unit_name` | Facultatif           | S'il existe une sous-unité, comme `request per second`.                                                                                                                                                                                                                                                                               |
| `description`   | Facultatif           | Description de la métrique.                                                                                                                                                                                                                                                                                                              |
| `orientation`   | Obligatoire          | Définissez sur `1` si la métrique doit augmenter, comme `myapp.turnover`. Définissez sur `0` si les variations de la métrique sont sans importance. Définissez sur `-1` si la métrique doit diminuer, comme `myapp.latency`.                                                                                                                                                         |
| `integration`   | Obligatoire          | Nom de l'intégration qui envoie la métrique. Doit correspondre à la version normalisée du `tile.title` dans le fichier `manifest.json`. Les caractères autres que les lettres, underscores, tirets et nombres sont convertis en underscores. Exemples : `Openstack Controller` -> `openstack_controller`, `ASP.NET` -> `asp_net` et `CRI-o` -> `cri-o`. |
| `short_name`    | Obligatoire          | Version abrégée et lisible du nom de la métrique. Ne répétez pas le nom de l'intégration. Par exemple, `postgresql.index_blocks_hit` doit être abrégé en `idx blks hit`.                                                                                                                                                                                                                                                                                                     |
| `curated_metric`| Facultatif           | Indique quelles métriques d'une intégration sont remarquables pour un type donné (`cpu` et `memory` sont acceptés). Ces métriques sont affichées dans l'interface utilisateur au-dessus des autres métriques de l'intégration. |
| `sample_tags` | Facultatif           | Liste d'exemples de tags associés à la métrique, séparés par des virgules sans espaces. Par exemple : `host,region,deployment`. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md#code-substitution
[2]: https://en.wikipedia.org/wiki/YAML
[3]: http://yaml-online-parser.appspot.com/
[4]: https://docs.datadoghq.com/fr/integrations/
[5]: https://www.uuidgenerator.net
[6]: https://docs.datadoghq.com/fr/metrics/types/#metric-types
[7]: https://docs.datadoghq.com/fr/metrics/units/#unit-list
[8]: https://docs.datadoghq.com/fr/getting_started/tagging/
[9]: https://app.datadoghq.com/marketplace/
[10]: https://docs.datadoghq.com/fr/developers/datadog_apps/
[11]: https://docs.datadoghq.com/fr/developers/integrations/marketplace_offering
[12]: https://app.datadoghq.com/integrations