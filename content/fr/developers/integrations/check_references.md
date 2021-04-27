---
title: Références pour les ressources d'intégration
kind: documentation
---
## Fichier de configuration

Lorsque vous préparez une nouvelle intégration, vous devez inclure un exemple de configuration contenant les options requises et des valeurs par défaut appropriées. L'exemple de fichier de configuration, ici situé dans `<NOM_CHECK>/datadog_checks/<NOM_CHECK>/data/conf.yaml.example`, comprend deux éléments de premier niveau : `init_config` et `instances`. La configuration sous `init_config` est appliquée à l'ensemble de l'intégration et utilisée à chaque instanciation de l'intégration, tandis que ce qui trouve sous `instances` est spécifique à une instanciation donnée.

Les blocs de configuration sous chaque section prennent le format suivant :

```yaml
## @<COMMANDE> [- <ARGUMENTS>]
## <LIGNE DESCRIPTION 1>
## <LIGNE DESCRIPTION 2>
#
<KEY>: <VALUE>
```

Les blocs de configuration doivent respecter quelques principes :

- La description ne doit pas être vide.
- Les placeholders doivent toujours respecter ce format :
`<CECI_EST_UN_PLACEHOLDER>`, conformément aux [règles de contribution][1] à la documentation.
- Par défaut, tous les paramètres requis ne sont **pas** mis en commentaire.
- Par défaut, tous les paramètres facultatifs sont mis en commentaire.
- Si un placeholder présente une valeur par défaut pour une intégration (comme l'endpoint de statut d'une intégration), celle-ci peut être utilisée à la place d'un placeholder générique.

### Spécification @param

En pratique, la seule commande est `@param`, qui est utilisée pour décrire les blocs de configuration, principalement à des fins de documentation. `@param` doit être implémentée en respectant l'un des formats suivants :

```text
@param <nom> - <type> - requis
@param <nom> - <type> - facultatif
@param <nom> - <type> - facultatif - valeur par défaut : <valeur_defaut>
```

Arguments :

- `nom` : le nom du paramètre, p. ex. `search_string` (obligatoire).
- `type` : le type de données de la valeur du paramètre (obligatoire). Valeurs autorisées :
  - _boolean_
  - _string_
  - _integer_
  - _double_
  - _float_
  - _dictionary_
  - _list\*_
  - _object_
- `valeur_defaut` : valeur par défaut pour le paramètre ; peut être laissé vide (facultatif).

Les variables `list` et `object` couvrent plusieurs lignes et font l'objet de règles spéciales.

- Dans une `list`, les éléments individuels ne sont pas documentés via la spécification `@param`
- Dans un `object`, vous avez la possibilité de documenter les éléments individuellement avec la spécification `@param` ou de spécifier une description commune au niveau supérieur juste après la spécification de l'objet.

### Paramètres facultatifs

Un paramètre facultatif doit être mis en commentaire par défaut. Au début de chaque ligne couverte par le paramètre, ajoutez `#` en appliquant la même indentation que pour la spécification `@param`.

### Commentaires de bloc

Vous pouvez ajouter un commentaire de bloc n'importe où dans le fichier de configuration. Les règles suivantes doivent être appliquées :

- Les commentaires doivent commencer par `##`.
- Les commentaires doivent être indentés comme les variables (le trait d'union ne compte pas).

Pour en savoir plus sur la syntaxe YAML, consultez l'article [Wikipedia][2]. Et n'hésitez pas à faire bon usage du parser en ligne [Online YAML Parser][3] !

## Fichier manifest

Chaque intégration contient un fichier `manifest.json` qui décrit les paramètres de fonctionnement de l'intégration, sa place dans l'écosystème d'intégrations global de Datadog, et d'autres informations semblables.

Voici la liste complète des attributs obligatoires et facultatifs pour le fichier `manifest.json` :

| Attribut                   | Type            | Obligatoire/Facultatif | Description                                                                                                                                                                                                              |
| --------------------------- | --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `integration_id`            | Chaîne          | Obligatoire          | Le nom d'identification unique de cette intégration. Généralement, il s'agit de la version kebab case du nom d'affichage                                                                                                                                  |
| `categories`                | Tableau de chaînes | Obligatoire          | Les catégories d'intégration utilisées sur la [page Intégrations de la documentation publique][4].                                                                                                                                          |
| `creates_events`            | Booléen         | Obligatoire          | Définit si l'intégration est en mesure de créer des événements. Si cet attribut est défini sur `false`, une erreur se produit lorsque l'intégration tente de créer un événement.                                                                   |
| `display_name`              | Chaîne          | Obligatoire          | Le titre affiché sur le carré d'intégration correspondant dans l'application Datadog et sur la [page Intégrations de la documentation publique][4].                                                                                  |
| `guid`                      | Chaîne          | Obligatoire          | L'ID unique de l'intégration. Cliquez [ici][5] pour générer un UUID.                                                                                                                                                                      |
| `is_public`                 | Booléen         | Obligatoire          | Si cet attribut est défini sur `false`, le contenu du fichier `README.md` de l'intégration n'est pas indexé par les robots dans la documentation publique de Datadog.                                                                                                        |
| `maintainer`                | Chaîne          | Obligatoire          | L'adresse e-mail du propriétaire de l'intégration.                                                                                                                                                                                   |
| `manifest_version`          | Chaîne          | Obligatoire          | La version du manifeste actuel.                                                                                                                                                                                         |
| `name`                      | Chaîne          | Obligatoire          | Le nom unique de l'intégration. Utilisez le nom du répertoire pour ce paramètre.                                                                                                                                                 |
| `public_title`              | Chaîne          | Obligatoire          | Le titre de l'intégration affiché dans la documentation. Doit respecter le format : `<NOM_INTÉGRATION>`.                                                                                   |
| `short_description`         | Chaîne          | Obligatoire          | Ce texte s'affiche en haut du carré d'intégration ainsi qu'au passage de la souris sur la page Intégrations. 80 caractères maximum.                                                                         |
| `support`                   | Chaîne          | Obligatoire          | Le propriétaire de l'intégration.                                                                                                                                                                                                |
| `supported_os`              | Tableau de chaînes | Obligatoire          | La liste des systèmes d'exploitation pris en charge. Valeurs autorisées : `linux`, `mac_os` ou `windows`.                                                                                                                                                     |
| `type`                      | Chaîne          | Obligatoire          | Le type d'intégration, doit être défini sur `check`.                                                                                                                                                                       |
| `aliases`                   | Tableau de chaînes | Facultatif           | Une liste d'alias d'URL pour la documentation Datadog.                                                                                                                                                                     |
| `description`               | Chaîne          | Facultatif           | Ce texte s'affiche lorsque quelqu'un partage un lien vers la documentation de l'intégration.                                                                                                                                                        |
| `is_beta`                   | Booléen         | Facultatif           | `false` par défaut. Lorsque cet attribut est défini sur `true`, le contenu du fichier `README.md` de l'intégration ne s'affiche pas dans la documentation publique de Datadog.                                                                                              |
| `metric_to_check`           | Chaîne          | Facultatif           | La présence de cette métrique indique que l'intégration fonctionne correctement. Si cette métrique n'est pas reçue une fois l'intégration installée, l'intégration est signalée comme non fonctionnelle dans l'application Datadog. |
| `metric_prefix`             | Chaîne          | Facultatif           | L'espace de nommage des métriques de cette intégration. Cette valeur sera ajoutée en préfixe pour chaque métrique envoyée par cette intégration.                                                                                               |
| `process_signatures`        | Tableau de chaînes | Facultatif           | Une liste de signatures qui correspond à la ligne de commande de cette intégration.                                                                                                                                                  |
| `assets`                    | Dictionnaire      | Obligatoire          | L'emplacement relatif où se trouvent certains fichiers ressources et leurs noms respectifs.                                                                                                                                          |
| `assets`-> `dashboards`     | Dictionnaire      | Obligatoire          | Le dictionnaire dont la clé est le nom du dashboard (doit être unique dans l'ensemble des intégrations) et la valeur est le chemin relatif du fichier où se trouve la définition du dashboard.                                        |
| `assets`-> `monitors`       | Dictionnaire      | Obligatoire          | Le dictionnaire dont la clé est le nom du monitor (doit être unique dans l'ensemble des intégrations) et la valeur est le chemin relatif du fichier où se trouve la définition du dashboard.                                          |
| `assets`-> `service_checks` | Chaîne          | Obligatoire          | L'emplacement relatif où se trouve le fichier `service_checks.json`.                                                                                                                                                         |

## Fichier metadata des métriques

Le fichier `metadata.csv` décrit toutes les métriques pouvant être recueillies par l'intégration.

Description de chaque colonne du fichier `metadata.csv` :

| Nom de la colonne     | Obligatoire/Facultatif | Description                                                                                                                                                                                                                                                                                                                             |
| --------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric_name`   | Obligatoire          | Nom de la métrique.                                                                                                                                                                                                                                                                                                                     |
| `metric_type`   | Obligatoire          | [Type de la métrique][6].                                                                                                                                                                                                                                                                                                                |
| `interval`      | Facultatif           | Intervalle de collecte de la métrique en secondes.                                                                                                                                                                                                                                                                                            |
| `unit_name`     | Facultatif           | Unité de la métrique. Voir la [liste complète des unités prises en charge][7].                                                                                                                                                                                                                                                                              |
| `per_unit_name` | Facultatif           | En cas de sous-division de l'unité, p. ex. `requêtes par seconde`                                                                                                                                                                                                                                                                               |
| `description`   | Facultatif           | Description de la métrique.                                                                                                                                                                                                                                                                                                              |
| `orientation`   | Obligatoire          | Définir sur `1` si la métrique doit augmenter, p. ex. `myapp.turnover`. Définir sur `0` si les variations ne la métrique n'importent pas. Définir sur `-1` si la métrique doit diminuer, p. ex. `myapp.latency`.                                                                                                                                                         |
| `integration`   | Obligatoire          | Nom de l'intégration qui envoie la métrique. Doit correspondre à la version normalisée du `display_name` dans le fichier `manifest.json`. Les caractères autres que les lettres, underscores, tirets et nombres sont convertis en underscores. Par exemple, `Openstack Controller` -> `openstack_controller`, `ASP.NET` -> `asp_net` et `CRI-o` -> `cri-o`. |
| `short_name`    | Obligatoire          | Identifiant unique et explicite de la métrique.                                                                                                                                                                                                                                                                                                      |

## Fichier service_check

Le fichier `service_check.json` décrit les checks de service effectués par l'intégration.

Le fichier `service_checks.json` contient les attributs obligatoires suivants :

| Attribut       | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `agent_version` | La version minimale prise en charge de l'Agent.                                                                                           |
| `integration`   | Le nom de l'intégration qui envoie le check de service. Doit correspondre au `display_name` non normalisé de `manifest.json`. |
| `check`         | Le nom du check de service. Doit être unique.                                                                              |
| `statuses`      | La liste des différents statuts du check. Valeurs autorisées : `ok`, `warning`, `critical` ou `unknown`.   |
| `groups`        | Les [tags][8] envoyés avec le check de service.                                                                                     |
| `name`          | Le nom d'affichage du check de service. Le nom d'affichage doit être clair et unique dans l'ensemble des intégrations.       |
| `description`   | Description du check de service                                                                                           |

[1]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
[2]: https://en.wikipedia.org/wiki/YAML
[3]: http://yaml-online-parser.appspot.com/
[4]: https://docs.datadoghq.com/fr/integrations/
[5]: https://www.uuidgenerator.net
[6]: https://docs.datadoghq.com/fr/developers/metrics/metrics_type/
[7]: https://docs.datadoghq.com/fr/developers/metrics/metrics_units/
[8]: https://docs.datadoghq.com/fr/getting_started/tagging/