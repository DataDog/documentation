---
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/check_references.md
title: Références pour les ressources d'intégration
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

### Spécification `@param`

En pratique, la seule commande est `@param`, qui est utilisée pour décrire les blocs de configuration, principalement à des fins de documentation. `@param` doit être implémentée en respectant l'un des formats suivants :

```text
@param <nom> - <type> - requis
@param <nom> - <type> - facultatif
@param <nom> - <type> - facultatif - valeur par défaut : <valeur_defaut>
```

Arguments :

- `nom` : le nom du paramètre, par exemple `search_string` (obligatoire).
- `type` : le type de données de la valeur du paramètre (obligatoire). Valeurs autorisées :
  - _boolean_
  - _string_
  - _Nombre entier_
  - _double_
  - _float_
  - _dictionary_
  - _list\*_
  - _object_
- `valeur_defaut` : la valeur par défaut pour le paramètre ; peut être laissé vide (facultatif).

Les variables `list` et `object` couvrent plusieurs lignes et font l'objet de règles spéciales.

- Dans une `list`, les éléments individuels ne sont pas documentés via la spécification `@param`
- Dans un `object`, vous avez la possibilité de documenter les éléments individuellement avec la spécification `@param` ou de spécifier une description commune au niveau supérieur juste après la spécification de l'objet.

### Paramètres facultatifs

Un paramètre facultatif doit être mis en commentaire par défaut. Au début de chaque ligne couverte par le paramètre, ajoutez `#` en appliquant la même indentation que pour la spécification `@param`.

### Commentaires de bloc

Vous pouvez ajouter un commentaire de bloc n'importe où dans le fichier de configuration. Les règles suivantes doivent être appliquées :

- Les commentaires commencent par `##`
- Les commentaires doivent être indentés comme les variables (le trait d'union ne compte pas).

Pour en savoir plus sur la syntaxe YAML, consultez l'article [Wikipedia][2]. Et n'hésitez pas à faire bon usage du parser en ligne [Online YAML Parser][3] !

## Fichier manifest

Chaque intégration contient un fichier `manifest.json` qui décrit les paramètres de fonctionnement de l'intégration, sa place dans l'écosystème d'intégrations global de Datadog, et d'autres informations semblables.

Il existe deux versions du fichier `manifest.json`. Bien que la version 1 du manifeste soit toujours prise en charge par les intégrations existantes, toutes les **nouvelles** intégrations, à savoir les Apps Datadog et les offres du Marketplace, doivent utiliser la version 2 du manifeste.

Si la ligne suivante figure en haut de votre fichier `manifest.json`, cela signifie qu'il s'agit de la version 2 :

```"manifest_version": "2.0.0"```

Si ce n'est pas le cas, vous utilisez la version 1 du manifeste.

Ces deux versions proposent différents attributs et différentes structures. Le tableau ci-dessous répertorie tous les attributs obligatoires et facultatifs des deux versions du fichier `manifest.json` :

{{< tabs >}}
{{% tab "Version 2 du manifeste" %}}

| Attribut                                            | Type                        | Obligatoire/Facultatif                        | Description                                                                                                                                                                                                                                 |
|------------------------------------------------------|-----------------------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `manifest_version`                                   | Énumération de chaînes                 | Obligatoire                                 | Version du schéma du manifeste. Valeurs autorisées : `1.0.0` et `2.0.0`.                                                                                                                                                               |
| `app_id`                                             | Chaîne                      | Obligatoire                                 | L'identifiant unique de l'offre. Il s'agit généralement du titre de l'application au format kebab. Par exemple, pour une application du nom de « Offre Marketplace », l'attribut `app_id` peut prendre pour valeur `offre-marketeplace`.                                              |
| `app_uuid`                                           | UUID                        | Obligatoire                                 | UUID global et unique de l'application.                                                                                                                                                                                                  |
| `assets`                                             | Dictionnaire                  | Obligatoire                                 | Objet contenant des entités installables sur Datadog.                                                                                                                                                                                           |
| `assets[dashboards]`                                 | Dictionnaire                  | Facultatif                                  | Dashboards prêts à l'emploi associés à l'offre.                                                                                                                                                                                    |
| `assets[dashboards["dashboard_short_name"]]`         | Chaîne                      | Obligatoire                                 | Paires key/value pour les dashboards prêts à l'emploi. La clé correspond au nom raccourci unique et global du dashboard, tandis que la valeur correspond au chemin relatif de la définition JSON du dashboard par rapport au manifeste.                            |
| `assets[integration]`                                | Dictionnaire                  | Facultatif                                  | Objet contenant des informations à propos de l'intégration.                                                                                                                                                                                        |
| `assets[integration[configuration]]`                 | Dictionnaire                  | Obligatoire, mais peut être défini sur `{ }`                   | Objet représentant la spécification de la configuration de l'intégration.                                                                                                                                                                   |
| `assets[integration[configuration[spec]]]`           | Chaîne                      | Obligatoire                                 | Chemin relatif de la spécification de la configuration par rapport au manifeste.                                                                                                                                                           |
| `assets[integration[events]]`                        | Dictionnaire                  | Obligatoire                                 | Informations à propos des événements générés par l'intégration.                                                                                                                                                                                       |
| `assets[integration[events[creates_events]]]`        | Booléen                     | Obligatoire                                 | Indique si cette intégration transmet des événements à Datadog.                                                                                                                                                                                    |
| `assets[integration[metrics]]`                       | Dictionnaire                  | Obligatoire                                 | Informations à propos des métriques générées par l'intégration.                                                                                                                                                                                       |
| `assets[integration[metrics[check]]]`                | Chaîne ou liste de chaînes    | Obligatoire                                 | Chaîne ou liste de chaînes représentant la ou les métriques systématiquement générées par l'intégration à chaque exécution.                                                                                                                                                     |
| `assets[integration[metrics[metadata_path]]]`        | Chaîne                      | Obligatoire                                 | Chemin relatif des métadonnées des métriques par rapport au manifeste.                                                                                                                                                             |
| `assets[integration[metrics[prefix]]]`               | Chaîne                      | Obligatoire                                 | Préfixe des métriques générées par l'intégration.                                                                                                                                                                                         |
| `assets[integration[service_checks]]`                | Dictionnaire                  | Obligatoire, mais peut-être défini sur `{ }`               | Informations à propos des checks de service générés par l'intégration.                                                                                                                                                                               |
| `assets[integration[service_checks[metadata_path]]]` | Chaîne                      | Obligatoire                                 | Chemin relatif des métadonnées des checks de service par rapport au manifeste.                                                                                                                                                       |
| `assets[integration[source_type_name]]`              | Chaîne                      | Obligatoire                                 | Nom public de l'intégration.                                                                                                                                                                                                       |
| `assets[monitors]`                                   | Dictionnaire                  | Facultatif                                  | Monitors recommandés.                                                                                                                                                                                                                       |
| `assets[monitors["monitor_short_name"]]`             | Chaîne                      | Obligatoire                                 | Paires key/value pour les monitors recommandés. La clé correspond au nom raccourci unique et global du monitor, tandis que la valeur correspond au chemin relatif de la définition JSON du monitor par rapport au manifeste.                                   |
| `author`                                            | Dictionnaire                  | Obligatoire                                 | Informations à propos de l'auteur de l'application.                                                                                                                                                                                                   |
| `author[homepage]`                                  | Chaîne (URL)                | Obligatoire                                 | L'URL Web de la page d'accueil de l'auteur.                                                                                                                                                                                                  |
| `author[name]`                                       | Chaîne                      | Obligatoire                                 | Nom lisible de l'entreprise.                                                                                                                                                                                                   |
| `author[sales_email]`                                | Chaîne (adresse e-mail)              | Obligatoire                                 | Adresse e-mail de la personne à contacter pour les événements liés à l'abonnement.                                                                                                                                                                                     |
| `author[support_email]`                              | Chaîne (adresse e-mail)              | Obligatoire                                 | Adresse e-mail de la personne à contacter pour les demandes d'assistance et d'entretien.                                                                                                                                                                               |
| `author[vendor_id]`                                  | Chaîne                      | Obligatoire                                 | ID du fournisseur à utiliser à des fins d'abonnement. Cet attribut doit être globalement unique et ne peut pas être modifié. Vous devez impérativement suivre les règles de `app_id` et n'utiliser que des caractères alphabétiques et des traits d'union. Cette valeur est spécifiée par les fournisseurs.       |
| `classifier_tags`                                    | Tableau de chaînes             | Obligatoire, mais peut être défini sur `{ }`                   | Quelques informations de classification à propos de l'application, notamment `supported_os` et `available_offerings`.                                                                                                                     |
| `display_on_public_website `                         | Booléen                     | Obligatoire                                 | Indique si l'offre doit être présentée sur le site de la documentation publique Datadog. Si vous définissez la valeur True, il n'est plus possible de modifier votre choix.                                                                                                 |
| `legal_terms`                                       | Dictionnaire                  | Obligatoire                                 | Documentation juridique que l'utilisateur doit accepter pour pouvoir utiliser l'application.                                                                                                                                                             |
| `legal_terms[eula]`                                 | Chaîne                      | Obligatoire                                 | Chemin relatif du PDF des CGU (conditions générales d'utilisation) par rapport au manifeste.                                                                                                                                                    |
| `pricing`                                            | Tableau de dictionnaires       | Obligatoire                                 | Liste d'objets représentant le modèle de tarification de l'intégration. Accédez au [référentiel GitHub Marketplace][1] pour en savoir plus sur les tarifs. Ce référentiel est privé : vous devez donc envoyer un e-mail à marketplace@datadog.com pour pouvoir y accéder.                      |
| `tile`                                               | Dictionnaire                  | Obligatoire                                 | Informations à propos de l'offre.                                                                                                                                                                                                             |
| `tile[media]`                                        | Tableau de dictionnaires       | Obligatoire, mais peut être défini sur `{ }`                   | Informations à propos des différents objets d'image et de vidéo présentés dans la galerie multimédia sur la page de l'offre.                                                                                                               |
| `tile[media[media_type]]`                            | Chaîne ou énumération              | Obligatoire                                 | Type du fichier multimédia. Valeurs autorisées : `image` et `video`.                                                                                                                                                                          |
| `tile[media[caption]]`                               | Chaîne                      | Obligatoire                                 | Légende de l'image.                                                                                                                                                                                                                  |
| `tile[media[image_url]]`                             | Chaîne                      | Obligatoire                                 | Chemin relatif de l'image par rapport au fichier du manifeste.                                                                                                                                                                          |
| `tile[description]`                                  | Chaîne\[80\]                | Obligatoire                                 | Courte description des caractéristiques de l'offre. 80 caractères maximum.                                                                                                                                                               |
| `tile[title]`                                        | Chaîne\[50\]                | Obligatoire                                 | Title public de l'application.                                                                                                                                                                                                       |

[1]: https://github.com/DataDog/marketplace#faq


{{% /tab %}}

{{% tab "Version 1 du manifeste" %}}


| Attribut                   | Type            | Obligatoire/Facultatif | Description                                                                                                                                                                                                              |
| --------------------------- | --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `integration_id`            | Chaîne          | Obligatoire          | Le nom d'identification unique de cette intégration. Généralement, il s'agit de la version kebab case du nom d'affichage.                                                                                                                                  |
| `categories`                | Tableau de chaînes | Obligatoire          | Les catégories d'intégration utilisées sur la page [Intégrations][1] de la documentation publique.                                                                                                                                          |
| `creates_events`            | Booléen         | Obligatoire          | Définit si l'intégration est en mesure de créer des événements. Si cet attribut est défini sur `false`, une erreur se produit lorsque l'intégration tente de créer un événement.                                                                   |
| `display_name`              | Chaîne          | Obligatoire          | Le titre affiché sur le carré d'intégration correspondant sur le site Datadog et sur la [page Intégrations][1].                                                                                                            |
| `guid`                      | Chaîne          | Obligatoire          | L'ID unique de l'intégration. Cliquez [ici][2] pour générer un UUID.                                                                                                                                                                      |
| `is_public`                 | Booléen         | Obligatoire          | Si cet attribut est défini sur `false`, le contenu du fichier `README.md` de l'intégration n'est pas inclus dans la documentation publique de Datadog.                                                                                                               |
| `maintainer`                | Chaîne          | Obligatoire          | L'adresse e-mail du propriétaire de l'intégration.                                                                                                                                                                                   |
| `manifest_version`          | Chaîne          | Obligatoire          | La version du manifeste actuel.                                                                                                                                                                                         |
| `name`                      | Chaîne          | Obligatoire          | Le nom unique de l'intégration. Utilisez le nom du répertoire pour ce paramètre.                                                                                                                                                 |
| `public_title`              | Chaîne          | Obligatoire          | Le titre de l'intégration affiché dans la documentation. Doit respecter le format : `<NOM_INTÉGRATION>`.                                                                                                       |
| `short_description`         | Chaîne          | Obligatoire          | Ce texte s'affiche en haut du carré d'intégration ainsi qu'au passage de la souris sur la page Intégrations. 80 caractères maximum.                                                                         |
| `support`                   | Chaîne          | Obligatoire          | Le propriétaire de l'intégration.                                                                                                                                                                                                |
| `supported_os`              | Tableau de chaînes | Obligatoire          | La liste des systèmes d'exploitation pris en charge. Valeurs autorisées : `linux`, `mac_os` ou `windows`.                                                                                                                                                     |
| `type`                      | Chaîne          | Obligatoire          | Le type d'intégration, doit être défini sur `check`.                                                                                                                                                                       |
| `aliases`                   | Tableau de chaînes | Facultatif           | Une liste d'alias d'URL pour la documentation Datadog.                                                                                                                                                                     |
| `description`               | Chaîne          | Facultatif           | Ce texte s'affiche lorsque quelqu'un partage un lien vers la documentation de l'intégration.                                                                                                                                                        |
| `is_beta`                   | Booléen         | Facultatif           | `false` par défaut. Lorsque cet attribut est défini sur `true`, le contenu du fichier `README.md` de l'intégration ne s'affiche pas dans la documentation publique de Datadog.                                                                                              |
| `metric_to_check`           | Chaîne          | Facultatif           | La présence de cette métrique indique que l'intégration fonctionne correctement. Si cette métrique n'est pas reçue une fois l'intégration installée, l'intégration est signalée comme non fonctionnelle sur le site Datadog.        |
| `metric_prefix`             | Chaîne          | Facultatif           | L'espace de nommage des métriques de cette intégration. Cette valeur est ajoutée en préfixe pour chaque métrique envoyée par cette intégration.                                                                                                    |
| `process_signatures`        | Tableau de chaînes | Facultatif           | Une liste de signatures qui correspond à la ligne de commande de cette intégration.                                                                                                                                                  |
| `assets`                    | Dictionnaire      | Obligatoire          | L'emplacement relatif où se trouvent certains fichiers ressources et leurs noms respectifs.                                                                                                                                          |
| `assets`-> `dashboards`     | Dictionnaire      | Obligatoire          | Le dictionnaire dont la clé est le nom du dashboard (doit être unique dans l'ensemble des intégrations) et la valeur est le chemin relatif du fichier où se trouve la définition du dashboard.                                        |
| `assets`-> `monitors`       | Dictionnaire      | Obligatoire          | Le dictionnaire dont la clé est le nom du monitor (doit être unique dans l'ensemble des intégrations) et la valeur est le chemin relatif du fichier où se trouve la définition du dashboard.                                          |
| `assets`-> `service_checks` | Chaîne          | Obligatoire          | L'emplacement relatif où se trouve le fichier `service_checks.json`.                                                                                                                                                         |

[1]: https://docs.datadoghq.com/fr/integrations/
[2]: https://www.uuidgenerator.net


{{% /tab %}}
{{< /tabs >}}


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
| `integration`   | Obligatoire          | Nom de l'intégration qui envoie la métrique. Doit correspondre à la version normalisée du `display_name` dans le fichier `manifest.json`. Les caractères autres que les lettres, underscores, tirets et nombres sont convertis en underscores. Exemples : `Openstack Controller` -> `openstack_controller`, `ASP.NET` -> `asp_net` et `CRI-o` -> `cri-o`. |
| `short_name`    | Obligatoire          | Identifiant unique et explicite de la métrique.                                                                                                                                                                                                                                                                                                      |
| `curated_metric`| Facultatif           | Indique que la métrique est pertinente pour un type donné. Types acceptés : `cpu` et `memory`.


[1]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
[2]: https://en.wikipedia.org/wiki/YAML
[3]: http://yaml-online-parser.appspot.com/
[4]: https://docs.datadoghq.com/fr/integrations/
[5]: https://www.uuidgenerator.net
[6]: https://docs.datadoghq.com/fr/developers/metrics/metrics_type/
[7]: https://docs.datadoghq.com/fr/developers/metrics/metrics_units/
[8]: https://docs.datadoghq.com/fr/getting_started/tagging/
[9]: https://docs.datadoghq.com/fr/developers/marketplace/
[10]: https://docs.datadoghq.com/fr/developers/datadog_apps/