---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /fr/logs/processing/processors/
description: Analyser vos logs à l'aide du processeur Grok
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Découvrir les pipelines de Datadog
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: Video
  text: 'Trucs et astuces: Ajouter des données commerciales aux journaux des points
    de terminaison de détail'
title: Processeurs
---
## Aperçu

<div class="alert alert-info">Les processeurs décrits dans cette documentation sont spécifiques aux environnements de journalisation basés sur le cloud. Pour analyser, structurer et enrichir les journaux sur site, voir <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a>.</div>

Un processeur s'exécute dans un [Pipeline][1] pour effectuer une action de structuration de données et générer des attributs afin d'enrichir vos logs.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Processeurs" style="width:100%" >}}

Dans les [paramètres de configuration des logs][1], vous pouvez configurer des processeurs, tels qu'un [parser Grok](#grok-parser) ou un [remappeur de dates](#remapper) pour faciliter l'extraction, la création et le remappage d'attributs afin d'enrichir vos logs et d'améliorer les recherches basées sur des facettes.

**Remarques**:

-  Les logs structurés doivent être livrés dans un format valide. Si la structure contient des caractères non valides pour l'analyse, ceux-ci doivent être supprimés au niveau de l'Agent en utilisant la fonctionnalité [mask_sequences][2].

- Comme meilleure pratique, il est recommandé d'utiliser au plus 20 processeurs par pipeline.

## Grok parser

Créez des règles grok personnalisées pour analyser l'intégralité du message ou un attribut spécifique de votre événement brut. Comme meilleure pratique, limitez votre analyseur grok à 10 règles d'analyse. Pour plus d'informations sur la syntaxe Grok et les règles d'analyse, voir [Analyse][10].

{{< img src="/logs/processing/processors/define_parsing_rules_syntax_suggestions.png" alt="Suggestions syntaxiques d'analyseur Grok dans l'interface utilisateur" style="width:90%;" >}}

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur Grok depuis la [page **Pipelines**][1]. Pour configurer les règles d'analyse Grok :

1. Cliquez sur **Analyser mes journaux** pour générer automatiquement un ensemble de trois règles d'analyse basées sur les journaux circulant dans le pipeline.
   **Remarque** : cette fonctionnalité nécessite que les journaux correspondants soient indexés et qu'ils circulent activement. Vous pouvez désactiver temporairement ou échantillonner les filtres d'exclusion pour permettre à la fonctionnalité de détecter les journaux.
1. **Échantillons de journaux** : Ajoutez jusqu'à cinq exemples de journaux (jusqu'à 5 000 caractères chacun) pour tester vos règles d'analyse.
1. **Définir les règles** d'analyse : Écrivez vos règles d'analyse dans l'éditeur de règles. Lorsque vous définissez des règles, l'analyseur Grok fournit une assistance syntaxique :
   - **Suggestions de correspondance** : tapez un nom de règle suivi d''`%{`. Une liste déroulante apparaît avec les appariements disponibles (tels que `word`, `integer`, `ip`, `date`). Sélectionnez un matcher dans la liste pour l'insérer dans votre règle.<br>
     ```
     MyParsingRule %{
     ```
   - **Suggestions de filtres** : Lorsque vous ajoutez un filtre avec `:`, une liste déroulante affiche les filtres compatibles pour le correspondant sélectionné.
1. **Testez vos règles** : Sélectionnez un échantillon en cliquant dessus pour déclencher son évaluation par rapport à la règle d'analyse et afficher le résultat en bas de l'écran. Tous les échantillons montrent un statut (`match` ou `no match`), qui indique si l'une des règles d'analyse de l'analyseur grok correspond à l'échantillon.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez le [endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser Grok :

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| Paramètre            | Type             | Requis | Description                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | Chaîne           | Oui      | Type du processeur.                                  |
| `name`               | Chaîne           | Non       |  Nom du processeur.                                  |
| `is_enabled`         | Booléen          | Non       | Si le processeur est activé ou non. Valeur par défaut : `false`.  |
| `source`             | String           | Oui      | Nom de l'attribut de log à parser. Par défaut : `message`. |
| `samples`            | Tableau de chaînes | Aucun       |  exemple de journal (jusqu'à 5) pour cet analyseur grok.     |
| `grok.support_rules` | Chaîne           | Oui      | Liste des règles de support pour votre analyseur grok.             |
| `grok.match_rules`   | Chaîne           | Oui      | Liste des règles de correspondance pour votre analyseur grok.               |


[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de dates de log

Lorsque Datadog reçoit des journaux, il les horodate en utilisant la ou les valeurs de l'un de ces attributs par défaut :

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si vos journaux ont des dates dans un attribut qui ne figurent pas dans cette liste, utilisez le processeur de remappage de la date des journaux pour définir leur attribut date comme horodatage officiel des journaux :

<div class="alert alert-info">
Les formats de date reconnus sont: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (format millisecondes EPOCH)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

Si vos logs n'incluent pas de timestamp dans l'un des formats ci-dessus, utilisez le processeur grok pour extraire l'heure epoch depuis le timestamp et l'ajouter dans un nouvel attribut. Le remappeur de date utilise l'attribut nouvellement défini.

Pour voir comment un format de date et d'heure personnalisé peut être analysé dans Datadog, consultez [Dates d'analyse][3].

**Remarques**:

* Les événements journaux peuvent être soumis jusqu'à 18 heures dans le passé et deux heures dans le futur.
* À partir de la norme ISO 86011:2019, le format de base est `T[hh][mm][ss]` et le format étendu est `T[hh]:[mm]:[ss]`. Les versions antérieures omettaient le T (représentant le temps) dans les deux formats.
* Si vos journaux ne contiennent aucun des attributs par défaut et que vous n'avez pas défini votre propre attribut date, Datadog horodate les journaux avec la date à laquelle il les a reçus.
* Si plusieurs processeurs de remappage de date de journal sont appliqués à un journal donné dans le pipeline, le dernier (selon l'ordre du pipeline) est pris en compte.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de dates de log depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Définir un attribut date" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="Date et heure dans le panneau latéral de l'Explorateur de journaux" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de dates de log :

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| Paramètre    | Type             | Requis | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                |
| `name`       | Chaîne           | non       |  Nom du processeur.                                |
| `is_enabled` | Boolean          | non       | Si le processeur est activé ou non. Par défaut: `false`. |
| `sources`    | Tableau de chaînes | Oui      | Tableau d'attributs source.                           |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de statuts de log

Utilisez le processeur de remappage d'état pour affecter des attributs en tant que statut officiel à vos journaux. Par exemple, ajoutez un niveau de gravité de journal à vos journaux avec le remappeur d'état.

Chaque valeur d'état entrante est mappée comme suit :Ch

* aînes entières de 0 à 7 map à la [normes de sévérité Syslog][4]Ch
* aînes commençant par em **erg o** u f **(** insensible à la casse) map à em **erg (0)Ch**
* **
* aînes commençant par un **e c** arte (insensible à la casse) map à al **erter (1)Ch**
* aînes commençant par c **(** insensible à la casse) map à cr **itique (2)Ch**
* **
* aînes commençant par er **r (** insensible à la casse) map à er **ror (3)Ch**
* aînes commençant par w **(** insensible à la casse) map à wa **rning (4)Ch**
* aînes commençant par n **(** insensible à la casse) map à no **tice (5)Ch**
* aînes commençant par i **(** insensible à la casse) map à in **fo (6)Chaînes commençant par d, ****t, ****v, ****tr **ace o**u ve **rbose (** insensible à la casse) map à de **bug (7)Chaînes commençant par o **o** u s, ****ou faisant correspondre OK **o** u Su **ccess (** insensible à la casse) map à OK **Toutes l**
* es autres map à in **fo (6)Re**

**marque :** Si plusieurs processeurs de remappage d'état de log sont appliqués à un log dans un pipeline, seul le premier dans l'ordre du pipeline est considéré. De plus, pour tous les pipelines qui correspondent au journal, seul le premier remappeur d'état rencontré (de tous les pipelines applicables) est appliqué.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de services de log depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Remapping de la gravité des logs" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de statuts de log :

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Paramètre    | Type             | Requis | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                |
| `is_enabled` | Booléen          | Non       | Si le processeur est activé ou non. Par défaut: `false`. |
| `sources`    | Tableau de chaînes | Oui      | Tableau d'attributs source.                           |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de services

Le processeur de remappage de service attribue un ou plusieurs attributs à vos journaux en tant que service officiel.

**Remarque** : Si plusieurs processeurs de remappage de service sont appliqués à un journal donné dans le pipeline, seul le premier (selon l'ordre du pipeline) est pris en compte.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de services de log depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="Service remapper processeur" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de services de log :

```json
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Paramètre    | Type             | Requis | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                |
| `is_enabled` | Booléen          | Non       | Si le processeur est activé ou non. Par défaut: `false`. |
| `sources`    | Tableau de chaînes | Oui      | Tableau d'attributs source.                           |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Log message remapper

`message` est un attribut clé dans Datadog. Sa valeur est affichée dans la colonne **Contenu** de l'Explorateur de journaux pour fournir un contexte sur le journal. Vous pouvez utiliser la barre de recherche pour trouver un journal par le message journal.

Utilisez le processeur de remappage des messages journaux pour définir un ou plusieurs attributs comme message journal officiel. Définissez plus d'un attribut pour les cas où les attributs pourraient ne pas exister et où une alternative est disponible. Par exemple, si les attributs de message définis sont `attribute1`, `attribute2` et `attribute3`, et que `attribute1` n'existe pas, alors `attribute2` est utilisé. De même, si `attribute2` n'existe pas, alors `attribute3` est utilisé.

Pour définir les attributs de message, utilisez d'abord le [processeur de générateur](#string-builder-processor) de chaînes pour créer un nouvel attribut de chaîne pour chacun des attributs que vous souhaitez utiliser. Ensuite, utilisez le remappeur de message journal pour remapper les attributs de chaîne en tant que message.

**Remarque** : Si plusieurs processeurs de remappage de message journal sont appliqués à un journal donné dans le pipeline, seul le premier (selon l'ordre du pipeline) est pris en compte.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de messages de log depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/message_processor.png" alt="Processeur de messages" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de messages de log :

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| Paramètre    | Type             | Requis | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                |
| `is_enabled` | Booléen          | Non       | Si le processeur est activé ou non. Par défaut: `false`. |
| `sources`    | Tableau de chaînes | Oui      | Tableau d'attributs source. Par défaut: `msg`.            |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur

Le processeur remapper remappe un ou plusieurs attributs source ou balises vers un attribut ou balise cible différent. Par exemple, vous pouvez remapper l'attribut `user` sur `firstname` pour normaliser les données de journalisation dans l'Explorateur de journaux.

Si la cible remapper est un attribut, le processeur peut également essayer de lancer la valeur vers un nouveau type (`String`, `Integer` ou `Double`). Si le casting échoue, la valeur et le type d'origine sont préservés.

**Remarque** : Le séparateur décimal pour les valeurs de `Double` doit être `.`.

### Contraintes de nommage

Les caractères `:` et `,` ne sont pas autorisés dans les noms d'attributs ou de balises cibles. De plus, les noms de balises et d'attributs doivent suivre les conventions décrites dans [Attributs et aliasing][5].

### Attributs réservés

Le processeur Remapper ne **peut pas être utilisé pour remapper les attributs réservés Datadog**. 
- L'attribut `host` ne peut pas être remappé.
- Les attributs suivants nécessitent des processeurs remapper dédiés et ne peuvent pas être remappés avec le Remapper générique. Pour remapper l'un des attributs, utilisez plutôt le remappeur ou le processeur spécialisé correspondant.
   - `message`: Remappeur
   - `service` de messages journaux: Remappeur de services
   - `status`: Remappeur
   - `date` d'états journaux: Remappeur
   - `trace_id` de dates journaux: Remappeur de traces
   - `span_id`: Remappeur de travées

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage sur la [page **Pipelines**][1]. Par exemple, remapper `user` en `user.firstname`.

{{< img src="logs/log_configuration/processor/remapper.png" alt="Processeur remapper d'attributs" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur :

```json
{
  "type": "attribute-remapper",
  "name": "Remap <SOURCE_ATTRIBUTE> to <TARGET_ATTRIBUTE>",
  "is_enabled": true,
  "source_type": "attribute",
  "sources": ["<SOURCE_ATTRIBUTE>"],
  "target": "<TARGET_ATTRIBUTE>",
  "target_type": "tag",
  "target_format": "integer",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| Paramètre              | Type             | Requis | Description                                                                    |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | Chaîne           | Oui      | Type du processeur.                                                         |
| `name`                 | Chaîne           | Non      |  Nom du processeur.                                                         |
| `is_enabled`           | Booléen          | Non      | Si le processeur est activé ou non. Default: `false`.                          |
| `source_type`          | String           | No      | Définit si les sources proviennent de `attribute` ou de `tag` journaux. Par défaut : `attribute`. |
| `sources`              | Tableau de chaînes | Oui      | Tableau d'attributs ou de balises source                                             |
| `target`               | Chaîne           | Oui      | Nom d'attribut ou de balise final vers lequel remapper les sources.                           |
| `target_type`          | Chaîne           | Non      | Définit si la cible est un `attribute` de log ou un `tag`. Default: `attribute`.    |
| `target_format`        | String           | No      | Définit si la valeur de l'attribut doit être coulée à un autre type. Valeurs autorisées : `auto`, `string` ou `integer` Par défaut : `auto`. Lorsqu'il est défini sur `auto`, aucun cast n'est appliqué.  |
| `preserve_source`      | Boolean          | No      | Supprimer ou préserver l'élément source remappé. Valeur par défaut : `false`.               |
| `override_on_conflict` | Boolean          | No      |  Override ou non si celui-ci est déjà défini. Par défaut: `false`.            |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## URL parser

Le processeur d'analyse d'URL extrait les paramètres de requête et d'autres paramètres importants d'une URL. Lors de la configuration, les attributs suivants sont produits:

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor" style="width:80%;" >}}

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de parsing d'URL depuis la [page **Pipelines**][1] :

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor Tile" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "url-parser",
  "name": "Parse the URL from http.url attribute.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

| Paramètre    | Type             | Requis | Description                                                                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                                                                               |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                                                                               |
| `is_enabled` | Booléen          | Non       | Si le processeur est activé ou non. Par défaut: `false`.                                                                |
| `sources`    | Tableau de chaînes | Aucun       |  tableau d'attributs source. Le nom de l'attribut parent qui contient tous les détails extraits des `sources``http.url`.                                                                      |
| `target`     | String           | Yes      | . Valeur par défaut : `http.url_details`. Par défaut : `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## UserAgent parser

Le processeur d'analyse useragent prend un attribut `useragent` et extrait l'OS, le navigateur, l'appareil et d'autres données utilisateur. Une fois configuré, les attributs suivants sont produits:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent Processor" style="width:80%;">}}

**Remarque** : si vos logs comprennent des user-agents encodés (c'est par exemple le cas des logs IIS), configurez ce processeur de façon à ce qu'il **décode l'URL** avant son parsing.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de useragent depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Tuile Useragent Processor" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser de useragent :

```json
{
  "type": "user-agent-parser",
  "name": "Parses <SOURCE_ATTRIBUTE> to extract all its User-Agent information",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

| Paramètre    | Type             | Requis | Description                                                                                                                 |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                                                                                      |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                                                                                      |
| `is_enabled` | Booléen          | Non       | Si le processeur est activé ou non. Par défaut: `false`.                                                                      |
| `sources`    | Tableau de chaînes | Aucun       |  tableau d'attributs source. Le nom de l'attribut parent qui contient tous les détails extraits des `sources``http.useragent`.                                                                      |
| `target`     | String           | Yes      | . Valeur par défaut : `http.url_details`. Default: `http.useragent_details`. |
| `is_encoded` | Boolean          | No       | Définit si l'attribut source est encodé dans une URL ou non. Par défaut: `false`.                                                     |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Processeur de catégories

<div class="alert alert-danger">Pour mettre à jour une catégorie, vous devez supprimer la catégorie originale et la recréer. Vous ne pouvez pas utiliser le processeur Catégorie pour mettre à jour une catégorie existante.</div>

Utilisez le processeur de catégorie pour ajouter un nouvel attribut (sans espace ni caractères spéciaux dans le nouveau nom d'attribut) à un journal correspondant à une requête de recherche fournie. Ensuite, utilisez des catégories pour créer des groupes pour une vue analytique (par exemple, les groupes d'URL, les groupes de machines, les environnements et les jeux de temps de réponse).

**Remarques** :

* La syntaxe de la requête est celle de la barre de recherche [Explorateur de journaux][6]. Cette requête peut se faire sur n'importe quel attribut ou balise log, qu'il s'agisse d'une facette ou non. Les caractères génériques peuvent également être utilisés à l'intérieur de votre requête.
* Une fois que le journal a correspondu à une des requêtes du processeur, il s'arrête. Assurez-vous qu'ils sont correctement ordonnés au cas où un journal pourrait correspondre à plusieurs requêtes.
* Les noms des catégories doivent être uniques.
* Une fois défini dans le processeur de catégorie, vous pouvez mapper les catégories à l'état du journal à l'aide du [remappeur d'état](#log-status-remapper) du journal.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de catégorie depuis la [page **Pipelines**][1] : Par exemple, pour catégoriser vos journaux d'accès Web en fonction de la valeur de plage de code d'état (`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`) ajoutez ce processeur:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="Processeur de catégories" style="width:80%;" >}}

Vous obtenez alors le résultat suivant :

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="Processeur de catégories" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de catégories :

```json
{
  "type": "category-processor",
  "name": "Assign a custom value to the <TARGET_ATTRIBUTE> attribute",
  "is_enabled": true,
  "categories": [
    {"filter": {"query": "<QUERY_1>"}, "name": "<VALUE_TO_ASSIGN_1>"},
    {"filter": {"query": "<QUERY_2>"}, "name": "<VALUE_TO_ASSIGN_2>"}
  ],
  "target": "<TARGET_ATTRIBUTE>"
}
```

| Paramètre    | Type            | Requis | Description                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | Chaîne          | Oui      | Type du processeur.                                                                                     |
| `name`       | Chaîne          | Non       |  Nom du processeur.                                                                                     |
| `is_enabled` | Booléen         | Non       | Si le processeur est activé ou non. Par défaut: `false`                                                      |
| `categories` | Tableau d'objets | Oui      | Tableau de filtres pour correspondre ou non à un journal et leurs `name` correspondantes pour affecter une valeur personnalisée au journal. |
| `target`     | Chaîne          | Oui      | Nom de l'attribut cible dont la valeur est définie par la catégorie correspondante.                              |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Processeur arithmétique

Utilisez le processeur arithmétique pour ajouter un nouvel attribut (sans espace ni caractères spéciaux dans le nouveau nom d'attribut) à un journal avec le résultat de la formule fournie. Cela permet de remapper différents attributs temporels avec différentes unités en un seul attribut, ou de calculer des opérations sur des attributs dans le même journal.

La formule du processeur arithmétique peut inclure des parenthèses et les opérateurs arithmétiques de base : `-`, `+`, `*`, `/`.

Par défaut, un calcul est sauté si un attribut est manquant. Sélectionnez *Remplacer l'attribut manquant par 0* pour remplir automatiquement les valeurs d'attribut manquantes par 0 afin de s'assurer que le calcul est effectué.

**Remarques**:

* Un attribut peut être répertorié comme manquant s'il n'est pas trouvé dans les attributs du journal, ou s'il ne peut pas être converti en nombre.
* Lorsque vous utilisez l''`-` opérateur, ajoutez des espaces autour car les noms d'attributs comme `start-time` peuvent contenir des tirets. Par exemple, la formule suivante doit inclure des espaces autour de l'opérateur `-` : `(end-time - start-time) / 1000`.
* Si l'attribut cible existe déjà, il est écrasé par le résultat de la formule.
* Les résultats sont arrondis à la 9ème décimale. Par exemple, si le résultat de la formule est `0.1234567891`, la valeur réelle stockée pour l'attribut est `0.123456789`.
* Si vous devez mettre à l'échelle une unité de mesure, utilisez le filtre d'échelle.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur arithmétique depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="Processeur arithmétique" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur arithmétique :

```json
{
  "type": "arithmetic-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "expression": "<ARITHMETIC_OPERATION>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": false
}
```

| Paramètre            | Type    | Requis | Description                                                                                                                                  |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | Chaîne  | Oui      | Type du processeur.                                                                                                                       |
| `name`               | Chaîne  | Non       |  Nom du processeur.                                                                                                                       |
| `is_enabled`         | Booléen | Non       | Si le processeur est activé ou non. Par défaut : `false`.                                                                                       |
| `expression`         | String  | Oui      | Opération arithmétique entre un ou plusieurs attributs log.                                                                                     |
| `target`             | String  | Oui      | Nom de l'attribut qui contient le résultat de l'opération arithmétique.                                                                  |
| `is_replace_missing` | Boolean | Non       | Si `true`, il remplace tous les attributs manquants de `expression` par 0, les `false` sautent l'opération si un attribut est manquant. Par défaut: `false`. |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Processeur de générateur de chaînes

Utilisez le processeur du générateur de chaînes pour ajouter un nouvel attribut (sans espace ni caractères spéciaux) à un journal avec le résultat du modèle fourni. Cela permet l'agrégation de différents attributs ou chaînes brutes en un seul attribut.

Le modèle est défini à la fois par du texte brut et des blocs avec la syntaxe `%{attribute_path}`.

**Remarques**:

* Ce processeur n'accepte que les attributs avec des valeurs ou un tableau de valeurs dans le bloc (voir exemples dans la section UI ci-dessous.
* Si un attribut ne peut pas être utilisé (objet ou tableau d'objet), il est remplacé par une chaîne vide ou l'opération entière est sautée en fonction de votre sélection.
* Si un attribut cible existe déjà, il est écrasé par le résultat du modèle.
* Résultats d'un modèle ne peut pas dépasser 256 caractères.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de générateur de chaînes depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="Processeur de générateur de chaînes" style="width:80%;">}}

Avec le journal suivant, utilisez le `Request %{http.method} %{http.url} was answered with response %{http.status_code}` de modèle pour retourner un résultat. Exemple :


```json
{
  "http": {
    "method": "GET",
    "status_code": 200,
    "url": "https://app.datadoghq.com/users"
  },
  "array_ids": [123, 456, 789],
  "array_users": [
    {"first_name": "John", "last_name": "Doe"},
    {"first_name": "Jack", "last_name": "London"}
  ]
}
```

Retourne ce qui suit:

```text
Request GET https://app.datadoghq.com/users was answered with response 200
```

**Remarque** : `http` est un objet et ne peut pas être utilisé dans un bloc (`%{http}` échoue), alors que `%{http.method}`, `%{http.status_code}` ou `%{http.url}` renvoie la valeur correspondante. Des blocs peuvent être utilisés dans des tableaux de valeurs ou un attribut spécifique d'un tableau.

*  Pour notre exemple de log, l'ajout du bloc `%{array_ids}` renvoie ce qui suit :

   ```text
   123,456,789
   ```

* `%{array_users}` ne retourne rien car c'est une liste d'objets. Cependant, `%{array_users.first_name}` retourne une liste de `first_name` contenues dans le tableau:

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de générateur de chaînes :

```json
{
  "type": "string-builder-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "template": "<STRING_BUILDER_TEMPLATE>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": true
}
```

| Paramètre            | Type    | Requis | Description                                                                                                                                       |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | Chaîne  | Oui      | Type du processeur.                                                                                                                            |
| `name`               | Chaîne  | Non       | Nom du processeur.                                                                                                                            |
| `is_enabled`         | Boolean | Non       | Si le processeur est activé ou non, par défaut `false`.                                                                                          |
| `template`           | Chaîne  | Oui      | Formule avec un ou plusieurs attributs et texte brut.                                                                                               |
| `target`             | Chaîne  | Oui      | Nom de l'attribut qui contient le résultat du modèle.                                                                               |
| `is_replace_missing` | Boolean | Non       | If `true`, il remplace tous les attributs manquants de `template` par une chaîne vide. Si `false`, saute l'opération pour les attributs manquants. Par défaut: `false`. |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## GeoIP parser

Le parser GeoIP reçoit un attribut d'adresse IP et extrait des informations sur le continent, le pays, la sous-division ou la ville (le cas échéant) dans le chemin de l'attribut cible.

{{< tabs >}}
{{% tab "IU" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="Processeur GeoIP" style="width:80%;">}}

La plupart des éléments contiennent un attribut `name` et `iso_code` (ou `code` pour continent). `subdivision` est le premier niveau de subdivision que le pays utilise comme "États" pour les États-Unis ou "Départements" pour la France.

Par exemple, l'analyseur geoIP extrait l'emplacement de l'attribut `network.client.ip` et le stocke dans l'attribut `network.client.geoip` :

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="Exemple GeoIP" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser GeoIP :

```json
{
  "type": "geo-ip-parser",
  "name": "Parse the geolocation elements from network.client.ip attribute.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

| Paramètre    | Type             | Requis | Description                                                                                                               |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                                                                                    |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                                                                                    |
| `is_enabled` | Booléen          | Non       | Si le processeur est activé ou non. Par défaut: `false`.                                                                     |
| `sources`    | Tableau de chaînes | Aucun       |  tableau d'attributs source. Le nom de l'attribut parent qui contient tous les détails extraits des `sources``network.client.ip`.                                                                  |
| `target`     | String           | Yes      | . Valeur par défaut : `http.url_details`. Par défaut: `network.client.geoip`.  |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Processeur de correspondances

Utilisez le processeur de correspondances pour définir un mappage entre un attribut de log et une valeur lisible. Ce mappage est enregistré dans une [table de référence][7] ou dans le tableau de mappage des processeurs.

Par exemple, vous pouvez utiliser le processeur de correspondances pour mapper un ID de service interne avec un nom de service lisible. Il est également possible d'utiliser ce processeur pour vérifier si une adresse MAC qui vient d'essayer de se connecter à un environnement de production fait partie d'une liste de machines volées.

{{< tabs >}}
{{% tab "IU" %}}

Le processeur de recherche effectue les actions suivantes :

* Recherche si le journal actuel contient l'attribut source.
* Vérifie si la valeur de l'attribut source existe dans la table de correspondance.
  * Si c'est le cas, crée l'attribut cible avec la valeur correspondante dans la table.
  * Optionnellement, s'il ne trouve pas la valeur dans la table de correspondance, il crée un attribut cible avec la valeur de repli par défaut définie dans le champ `fallbackValue`. Vous pouvez entrer manuellement une liste de paires de `source_key,target_value` ou télécharger un fichier CSV dans l'onglet **Mapping manuel**.

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Processeur de correspondances" style="width:80%;">}}

    The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

  * Optionnellement, s'il ne trouve pas la valeur dans la table de mappage, il crée un attribut cible avec la valeur de la table de référence. Vous pouvez sélectionner une valeur pour un [Tableau de référence][101] dans l'onglet **Tableau de référence** .

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Processeur de correspondances"
    style="width:80%;">}}


[101]: /fr/integrations/guide/reference-tables/

{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de correspondances :

```json
{
  "type": "lookup-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "source": "<SOURCE_ATTRIBUTE>",
  "target": "<TARGET_ATTRIBUTE>",
  "lookup_table": ["key1,value1", "key2,value2"],
  "default_lookup": "<DEFAULT_TARGET_VALUE>"
}
```

| Paramètre        | Type             | Requis | Description                                                                                                                                                              |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Chaîne           | Oui      | Type du processeur.                                                                                                                                                   |
| `name`           | Chaîne           | Non       |  Nom du processeur.                                                                                                                                                   |
| `is_enabled`     | Booléen          | Oui      | Si le processeur est activé ou non. Par défaut : `false`.                                                                                                                     |
| `source`         | Chaîne           | Oui      |  Attribut source utilisé pour effectuer la recherche.                                                                                                                             |
| `target`         | Chaîne           | Oui      | Nom de l'attribut qui contient la valeur correspondante dans la liste de mappage ou le `default_lookup` s'il n'est pas trouvé dans la liste de mappage.                                |
| `lookup_table`   | Tableau de chaînes | Oui      | Tableau de mappage des valeurs pour l'attribut source et leurs valeurs d'attribut cible associées, formaté en [ "source_key1,target_value1", "source_key2,target_value2" ]. |
| `default_lookup` | Chaîne           | Non       | Valeur pour définir l'attribut cible si la valeur source n'est pas trouvée dans la liste.                                                                                          |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de traces

Il existe deux façons de définir la corrélation entre les traces d'application et les journaux :

1. Suivez la documentation sur [comment injecter un ID de trace dans les journaux d'application][8]. Les intégrations de journaux gèrent automatiquement toutes les étapes de configuration restantes par défaut.

2. Utilisez le processeur de remappage de traces pour définir un attribut journal comme son ID de trace associé.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de traces sur la [page **Pipelines**][1]. Entrez le chemin de l'attribut Trace ID dans la tuile processeur comme suit :

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="Trace ID processeur" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de traces :

```json
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| Paramètre    | Type             | Requis | Description                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                 |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                 |
| `is_enabled` | Booléen          | Non       | Si le processeur est activé ou non. Par défaut: `false`. |
| `sources`    | Tableau de chaînes | Aucun       |  tableau d'attributs source. Par défaut: `dd.trace_id`.    |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les ID de trace et les ID de span ne sont pas affichés dans vos journaux ou attributs de journal dans l'interface utilisateur.

## Span remapper

Il existe deux façons de définir la corrélation entre les étendues d'application et les journaux :

1. Suivez la documentation sur [comment injecter un identifiant d'étendue dans les journaux d'application][8]. Les intégrations de journaux gèrent automatiquement toutes les étapes de configuration restantes par défaut.

2. Utilisez le processeur span remapper pour définir un attribut log comme son ID span associé.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de span sur la [page **Pipelines**][1]. Entrez le chemin de l'attribut Span ID dans la tuile processeur comme suit :

{{< img src="logs/log_configuration/processor/span_id_remapper.png" alt="Processeur Span ID" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur :

```json
{
  "type": "span-id-remapper",
  "name": "Define dd.span_id as the official span id associate to this log",
  "is_enabled": true,
  "sources": ["dd.span_id"]
}
```

| Paramètre    | Type             | Requis | Description                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                 |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                 |
| `is_enabled` | Booléen          | Non       | Indique si le processeur est activé. Par défaut: `false`. |
| `sources`    | Tableau de chaînes | Aucun       |  tableau d'attributs source. Par défaut: `dd.trace_id`.    |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les ID de trace et les ID de span ne sont pas affichés dans vos journaux ou attributs de journal dans l'interface utilisateur.

## Processeur de tableau

Utilisez le processeur de tableau pour extraire, agréger ou transformer des valeurs de tableaux JSON dans vos journaux.

Les opérations prises en charge incluent :

- **Sélectionner une valeur dans un élément correspondant**
- **Computer la longueur d'un tableau**
- **Ajouter une valeur à un tableau**

Chaque opération est configurée via un processeur dédié.

Définissez le processeur du tableau sur la page [**Pipelines**][1].


### Sélectionnez la valeur de l'élément correspondant

Extraire une valeur spécifique d'un objet à l'intérieur d'un tableau lorsqu'elle correspond à une condition.

{{< tabs >}}
{{% tab "IU" %}}

{{< img src="logs/log_configuration/processor/array_processor_select_value.png" alt="Processeur de tableau Sélectionner une valeur dans l'élément" style="width:80%;" >}}

**Exemple d'entrée :**

```json
{
  "httpRequest": {
    "headers": [
      {"name": "Referrer", "value": "https://example.com"},
      {"name": "Accept", "value": "application/json"}
    ]
  }
}
```

**Étapes de configuration :**

- **Chemin du tableau** : `httpRequest.headers`
- **Condition** : `name:Referrer`
- **Extraire la valeur** : `value`
- **Attribut cible** : `referrer`

**Résultat :**

```json
{
  "httpRequest": {
    "headers": [...]
  },
  "referrer": "https://example.com"
}
```

{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de tableaux :

```json
{
  "type": "array-processor",
  "name": "Extract Referrer URL",
  "is_enabled": true,
  "operation" : {
    "type" : "select",
    "source": "httpRequest.headers",
    "target": "referrer",
    "filter": "name:Referrer",
    "value_to_extract": "value"
  }
}
```

| Paramètre    | Type             | Requis | Description                                                   |
|--------------|------------------|----------|---------------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Type du processeur.                                        |
| `name`       | Chaîne           | Non       |  Nom du processeur.                                        |
| `is_enabled` | Booléen          | Non       |  Si le processeur est activé. Par défaut : `false`.        |
| `operation.type`  | Chaîne      | Oui      | Type d'opération du processeur de tableau.                            |
| `operation.source`  | Chaîne    | Oui      | Chemin du tableau à sélectionner.                    |
| `operation.target`  | Chaîne    | Oui      | Attribut cible.                                             |
| `operation.filter`  | Chaîne    | Oui      | Expression pour correspondre à un élément de tableau. Le premier élément correspondant est sélectionné. |
| `operation.value_to_extract`  | Chaîne |  Oui | Attribut à lire dans l'élément sélectionné.                  |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Longueur du tableau

Calculer le nombre d'éléments d'un tableau.

{{< tabs >}}
{{% tab "IU" %}}

{{< img src="logs/log_configuration/processor/array_processor_length.png" alt="Processeur de tableau Longueur" style="width:80%;" >}}

**Exemple d'entrée :**

```json
{
  "tags": ["prod", "internal", "critical"]
}
```

**Étapes de configuration :**

- **Attribut tableau** : `tags`
- **Attribut cible** : `tagCount`

**Résultat :**

```json
{
  "tags": ["prod", "internal", "critical"],
  "tagCount": 3
}
```
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de tableaux :

```json
{
  "type": "array-processor",
  "name": "Compute number of tags",
  "is_enabled": true,
  "operation" : {
    "type" : "length",
    "source": "tags",
    "target": "tagCount"
  }
}
```

| Paramètre           | Type      | Requis | Description                                                   |
|---------------------|-----------|----------|---------------------------------------------------------------|
| `type`              | Chaîne    | Oui      | Type du processeur.                                        |
| `name`              | Chaîne    | Non       |  Nom du processeur.                                        |
| `is_enabled`        | Booléen   | Non       |  Si le processeur est activé. Par défaut : `false`.        |
| `operation.type`    | String    | Oui      | Type d'opération du processeur tableau.                            |
| `operation.source`  | String    | Oui      | Chemin du tableau pour extraire la longueur de.                   |
| `operation.target`  | String    | Oui      | Attribut cible.                                             |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Ajouter au tableau

Ajoutez une valeur d'attribut à la fin d'un attribut de tableau cible dans le journal.

**Remarque** : Si l'attribut de tableau cible n'existe pas dans le journal, il est automatiquement créé.


{{< tabs >}}
{{% tab "IU" %}}

{{< img src="logs/log_configuration/processor/array_processor_append.png" alt="Processeur de tableau Ajouter" style="width:80%;" >}}

**Exemple d'entrée :**

```json
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1"]
}

```
**Étapes de configuration :**

- **Attribut to append** : `"network.client.ip"`
- **Attribut tableau auquel ajouter** : `sourceIps`

**Résultat :**

```json
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1", "198.51.100.23"]
}
```
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de tableaux :

```json
{
  "type": "array-processor",
  "name": "Append client IP to sourceIps",
  "is_enabled": true,
  "operation" : {
    "type" : "append",
    "source": "network.client.ip",
    "target": "sourceIps"
  }
}
```

| Paramètre                    | Type       | Requis | Description                                                        |
|------------------------------|------------|----------|--------------------------------------------------------------------|
| `type`                       | Chaîne     | Oui      | Type du processeur.                                             |
| `name`                       | Chaîne     | Non       |  Nom du processeur.                                             |
| `is_enabled`                 | Booléen    | Non       |  Si le processeur est activé. Par défaut : `false`.             |
| `operation.type`             | String     | Oui      | Type d'opération du processeur tableau.                                 |
| `operation.source`           | String     | Oui      | Attribut à append.                                               |
| `operation.target`           | String     | Oui      | Attribut tableau à append.                                      |
| `operation.preserve_source`  | Boolean    | Non      |  Préserver ou non la source originale après remappage. Par défaut: `false`.   |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}Processeur 

## de décodeur

Le processeur Decoder traduit les champs de chaînes encodés binarytotext (tels que Base64 ou Hex/Base16) dans leur représentation originale. Cela permet d'interpréter les données dans leur contexte natif, que ce soit comme une chaîne UTF8, une commande ASCII ou une valeur numérique (par exemple, un entier dérivé d'une chaîne hexagonale). Le processeur Décodeur est particulièrement utile pour analyser les commandes codées, les journaux de systèmes spécifiques ou les techniques d'évasion utilisées par les acteurs de la menace.

**Remarques**:

- Chaînes tronquées: Le processeur gère les chaînes Base64/Base16 partiellement tronquées avec grâce en rognant ou en remplissant au besoin.

- Format hexadécimal: L'entrée hexadécimale peut être décodée en chaîne (UTF8) ou en entier.

- Gestion des échecs: Si le décodage échoue (à cause d'une entrée invalide), le processeur saute la transformation et le journal reste inchangé

{{< tabs >}}
{{% tab "IU" %}}

1. Définissez l'attribut source : fournissez le chemin d'attribut qui contient la chaîne codée, tel que `encoded.base64`.
2. Sélectionnez l'encodage source : choisissez l'encodage binarytotext de la source : `base64` ou `base16/hex`.
2. Par `Base16/Hex` : choisissez le format de sortie : `string (UTF-8)` ou `integer`.
3. Définissez l'attribut cible : entrez le chemin d'attribut pour stocker le résultat décodé.

{{< img src="logs/log_configuration/processor/decoder-processor.png" alt="Processeur décodeur Ajouter" style="width:80%;" >}}

{{% /tab %}}
{{< /tabs >}}Processeur 

## intel de menace

Ajoutez le processeur Intel Threat pour évaluer les journaux par rapport à la table à l'aide d'une clé IoC (Indicateur de compromission) spécifique, telle qu'une adresse IP. Si une correspondance est trouvée, le journal est enrichi avec les attributs pertinents du Threat Intelligence (TI) de la table, ce qui améliore la détection, l'enquête et la réponse.

Pour plus d'informations, voir [Intelligence des menaces][9].

## Processeur OCSF

Utilisez le processeur OCSF pour normaliser vos journaux de sécurité selon le [Open Cybersecurity Schema Framework (OCSF)][11]. Le processeur OCSF vous permet de créer des mappages personnalisés qui remappent vos attributs de log vers les classes de schéma OCSF et leurs attributs correspondants, y compris les attributs énumérés (ENUM).

Le processeur vous permet de :

- Mapper les attributs du journal source aux attributs cibles OCSF
- Configurer les attributs ENUM avec des valeurs numériques spécifiques
- Créer des sous-pipelines pour différentes classes d'événements cibles OCSF
- Prétraiter les journaux avant de remapper OCSF

Pour des instructions de configuration détaillées, des exemples de configuration et des conseils de dépannage, voir [Processeur OCSF][12].

## 

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/log_configuration/pipelines/
[2]: /fr/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[3]: /fr/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /fr/logs/log_configuration/attributes_naming_convention/
[6]: /fr/logs/search_syntax/
[7]: /fr/integrations/guide/reference-tables/
[8]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[9]: /fr/security/threat_intelligence/
[10]: /fr/logs/log_configuration/parsing/?tab=matchers
[11]: /fr/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[12]: /fr/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/