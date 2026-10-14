---
aliases:
- /fr/observability_pipelines/search_syntax/
code_lang: logs
description: Apprenez à utiliser la syntaxe de recherche de logs pour les requêtes
  de filtre de vos processeurs Observability Pipelines.
disable_toc: false
title: Syntaxe de recherche de logs
type: multi-code-lang
weight: 1
---
## Présentation {#overview}

Lorsque vous ajoutez un processeur à un pipeline, vous pouvez filtrer les logs pour ne traiter qu'un sous-ensemble défini. Ce document aborde les informations suivantes :

- [Recherche en texte libre](#free-text-search): pour effectuer une recherche dans le champ `message`
- [Recherche par attribut](#attribute-search): pour effectuer une recherche sur les clés et les valeurs d'attribut
- [Tableaux](#arrays): pour effectuer une recherche au sein d'un tableau de valeurs imbriquées
- [Opérateurs booléens](#boolean-operators)
- [Caractères spéciaux et espaces devant être échappés](#escape-special-characters-and-spaces)
- [Caractères génériques](#wildcards)

**Remarque**: La version 2.11 et ultérieure du Worker utilise une syntaxe de recherche améliorée. Après avoir mis à niveau le Worker vers la version 2.11, vous devrez peut-être mettre à jour vos requêtes de filtrage pour qu'elles correspondent à la nouvelle syntaxe. Consultez [Mettre à niveau vos requêtes de filtrage vers la nouvelle syntaxe de recherche][1] pour plus d'informations.

## Syntaxe de recherche {#search-syntax}

Il existe deux types de requêtes de filtrage que vous pouvez utiliser :

- [Texte libre](#free-text-search)
- [Attribut](#attribute-search)

### Recherche en texte libre {#free-text-search}

La recherche en texte libre ne porte que sur le champ `message` et ne tient pas compte de la casse. Elle est composée de termes et d'opérateurs. Il existe deux types de termes :

- Un terme unique est un mot seul tel que `test` ou `hello`.
- Une séquence est un groupe de mots entouré de guillemets doubles, tel que `"hello dolly"`.

Voici des exemples de recherche en texte libre :

`hello`
: Recherche la chaîne exacte `hello`. Par exemple, `{"message": \"hello world\"}` est un log correspondant.

`Hello world`
: Recherche `hello` et `world`. Par exemple, `"hello beautiful world"` est une correspondance.
: Cette requête peut également être écrite comme `Hello AND world`.
: **Remarque**: Le message doit contenir à la fois `hello` et `world` pour correspondre.

`"hello world"`
: Recherche une séquence de mots. Par exemple, `"hello world"`, `"hello-world"` et `"Hello, world"` sont toutes des correspondances.

### Recherche par attribut {#attribute-search}

Vous pouvez effectuer des recherches sur les clés et les valeurs d'attribut. Par exemple, si votre clé d'attribut est `url` et que vous souhaitez filtrer sur la valeur `url` `www.datadoghq.com`, saisissez : `url:www.datadoghq.com`.

**Remarque**: Les recherches d'attributs sont sensibles à la casse.

#### Filtrer les événements avec une clé d'attribut spécifique {#filter-for-events-with-a-specific-attribute-key}

Pour filtrer les événements qui possèdent une clé d'attribut spécifique, utilisez la syntaxe `_exists_`. Par exemple, si vous utilisez la requête `_exists_:service`, l'événement `{"service": \"postgres\"}` correspond à la requête, mais l'événement `{"env": \"prod\"}` ne correspond pas.

#### Filtrer les événements qui ne possèdent pas une clé d'attribut spécifique {#filter-for-events-that-do-not-have-a-specific-attribute-key}

Pour filtrer les événements qui ne possèdent pas une clé d'attribut spécifique, utilisez la syntaxe `_missing_`. Par exemple, si vous utilisez la requête `_missing_:service`, l'événement `{"env": \"prod\"}` correspond à la requête, mais l'événement `{"service": \"postgres\"}` ne correspond pas.

#### Exemples de syntaxe de recherche d'attributs {#attribute-search-syntax-examples}

Voici quelques exemples de syntaxe de recherche d'attributs et des logs qui correspondent :

`status:ok service:flask-web-app`
: Correspond aux logs avec le statut `ok` de votre service `flask-web-app`.
: Cette requête peut également être écrite comme suit : `status:ok AND service:flask-web-app`.

`user.status:inactive`
: Correspond aux logs avec le statut `inactive` imbriqué sous l'attribut `user`.

`http.url:/api-v1/*`
: Correspond aux logs contenant une valeur dans l'attribut `http.url` qui commence par `/api-v1/`.

`http.status:[200 TO 299]`
: Correspond aux logs contenant une valeur `http.status` supérieure ou égale à `200` et inférieure ou égale à `299`.
: **Notes** :<br>- `[..]` Les crochets signifient que les plages sont inclusives.<br>- Les plages peuvent être utilisées sur n'importe quel attribut.

`http.status:{200 TO 299}`
: Correspond aux logs contenant une valeur `http.status` supérieure à `200` ou inférieure à `299`.
: **Notes** :<br>- `{..}` Les accolades signifient que les plages sont exclusives.<br>- Les plages peuvent être utilisées sur n'importe quel attribut.

`http.status_code:[200 TO 299] http.url_details.path:/api-v1/*`
: Correspond aux logs contenant à la fois :<br>- Une valeur `http.status_code` supérieure ou égale à `200` et inférieure ou égale à `299`<br>- Une valeur dans l'attribut `http.url_details.path` qui commence par `/api-v1/`.

`"service.status":disabled`
: Correspond aux logs avec `"service.status": "disabled"`. Cette syntaxe de filtre recherche un `.` littéral dans la clé d'attribut.
: Voir [Notation de chemin](#path-notation) pour plus d'informations.

`_exists_:service`
: Correspond aux logs avec la clé d'attribut `service`. Par exemple, la requête correspond à `{"service": "postgres"}`, mais ne correspond pas à `{"env": "prod"}`.

`_missing_:service`
: Correspond aux logs qui n'ont pas la clé d'attribut `service`. Par exemple, la requête correspond à `{"env": "prod"}`, mais ne correspond pas à `{"service": "postgres"}`.

#### Notation de chemin {#path-notation}

{{% observability_pipelines/path_notation %}}

Si vous souhaitez que la requête recherche un `.` littéral dans la clé d'attribut, entourez la clé de guillemets échappés dans la requête de recherche. Par exemple, la requête de recherche `"service.status":disabled` correspond à l'événement `{"service.status": "disabled"}`.

#### `ddsource` et `ddtags` {#ddsource-and-ddtags}

Les sources Datadog Agent, Datadog Lambda Forwarder et Datadog Lambda Extension envoient des logs et des métriques marqués avec `ddsource` et `ddtags`, et non `source` et `tags`. Lorsque vous définissez des requêtes de processeur ou des filtres pour les événements provenant de ces sources, utilisez `ddsource` et `ddtags` à la place.

### Tableaux {#arrays}

Dans l'exemple suivant, les logs CloudWatch pour Windows contiennent un tableau d'objets JSON sous `Event.EventData.Data`.

```
Event
{
EventData {
    Data [
        {"Name":"SubjectUserID1", "value":"12345"},
        {"Name":"SubjectUserID2", "value":"Admin"},
        {"Name":"ObjectServer", "value":"Security"}
	]
    }
}
```

Si vous utilisez la requête de filtre `Event.EventData.Data.Name:ObjectServer`, l'événement de log ci-dessus est mis en correspondance car il contient un objet imbriqué avec la clé d'attribut `Name` et la valeur `ObjectServer`.

### Opérateurs booléens {#boolean-operators}

Vous pouvez utiliser les opérateurs booléens suivants, sensibles à la casse, pour combiner plusieurs termes dans une requête de recherche.

| Opérateur     | Description                                            |
|--------------|--------------------------------------------------------|
| `AND`        | Intersection: les deux termes sont présents dans l'événement.             |
| `OR`         | Union: l'un ou l'autre terme est contenu dans l'événement.          |
| `-` ou `NOT` | Exclusion: le terme suivant **n'est pas** présent dans l'événement. |

Voici des exemples de requêtes utilisant des opérateurs booléens :

`NOT (status:debug)`
: Correspond aux logs qui n'ont pas le statut `DEBUG`.

`host:COMP-A9JNGYK OR host:COMP-J58KAS`
: Correspond uniquement aux logs provenant de ces hosts spécifiques.

`Hello AND World`
: Recherche `hello` et `world`. Par exemple, `"hello beautiful world"` est une correspondance.
: Cette requête peut également être écrite comme suit : : `Hello world`.
: **Remarque**: Le message doit contenir à la fois `hello` et `world` pour correspondre.

`hello AND status:info`
: Correspond aux logs avec un champ de message qui contient `hello` et `status:info`.

`-http.status_code:200`
: Correspond aux logs où http.status_code n'est pas égal à 200

`service:(postgres OR datadog_agent)`
: Correspond aux logs avec les valeurs `postgres` ou `datadog_agent` pour l'attribut `service`. Cette requête peut également être écrite comme : `service:postgres OR service:datadog_agent`

## Échapper les caractères spéciaux et les espaces {#escape-special-characters-and-spaces}

Les caractères suivants sont considérés comme spéciaux et doivent être échappés avec une barre oblique inverse (`\`): 

`-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `#`, et les espaces.

**Remarques** :

- `/` n'est pas considéré comme un caractère spécial et n'a pas besoin d'être échappé.
- Vous pouvez rechercher des caractères spéciaux à l'intérieur d'un attribut. Voir [Rechercher un attribut contenant des caractères spéciaux](#search-an-attribute-that-contains-special-characters).
- Si vous souhaitez faire correspondre des logs contenant le caractère spécial `!` dans le champ `message`, utilisez la syntaxe de recherche d'attribut : `message:*!*`.
    - **Remarque**: Vous ne pouvez pas utiliser de requêtes de recherche en texte libre pour filtrer les messages de log contenant des caractères spéciaux.

### Rechercher un attribut contenant des caractères spéciaux {#search-an-attribute-that-contains-special-characters}

Lorsque vous recherchez une valeur d'attribut qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets. Par exemple, pour rechercher un attribut `my_app` avec la valeur `hello:world`, utilisez la syntaxe : `my_app:hello\:world` ou `my_app:"hello:world"`.

### Correspond à un seul caractère spécial ou espace {#match-a-single-special-character-or-space}

Pour faire correspondre un seul caractère spécial ou espace, utilisez le caractère générique `?`. Par exemple, pour rechercher un attribut `my_app` avec la valeur `hello world again`, utilisez la syntaxe : `my_app:hello?world?again`.

### Exemples {#examples}

Pour savoir comment échapper les caractères spéciaux et les espaces dans une recherche, examinons un exemple de log :

```
{
    "service": "postgres",
    "status": "INFO",
    "tags": [
        "env:prod",
        "namespace:something",
        "reader:logs",
        "my_app:hello world again"
    ]
}
```

Voici des exemples de syntaxe de recherche qui échappent les caractères spéciaux et les espaces dans l'exemple de log :

`tags:env*`
: Correspond aux logs avec une valeur d'attribut `tag` de `env`.

`tags:(env\:prod OR env\:test)`
: Correspond aux logs avec le tag `env:prod` ou `env:test` dans le tableau `tags`.
: Cette requête peut également être écrite comme `tags:("env:prod" OR "env:test")`.

`tags:env\:prod AND -tags:version\:beta`
: Correspond aux logs qui ont `env:prod` et n'ont pas `version:beta` dans le tableau `tag`.
: Cette requête peut également être écrite comme `tags:"env:prod" AND -tags:"version:beta"`.

`my_app:hello\:world`
: Correspond aux logs qui contiennent `my_app:hello:world`.
: Cette requête peut également être écrite comme `my_app:"hello:world"`.

`my_app:hello?world?again`
: Correspond aux logs qui contiennent `"my_app":"hello world again"`.

## Wildcards {#wildcards}

Vous pouvez utiliser `*` pour effectuer des recherches par caractères génériques. Voici des exemples de recherches par caractères génériques :

`*network*`
: Correspond aux logs avec une valeur de champ `message` qui contient `network`.

`web*`
: Correspond aux logs avec une valeur de champ `message` qui commence par `web`.

`*web`
: Correspond aux logs avec une valeur de champ `message` qui se termine par `web`.

`service:*mongo`
: Correspond aux logs avec des valeurs d'attribut `service` qui se terminent par `mongo`.

`service:web*`
: Correspond aux logs qui ont une valeur d'attribut `service` qui commence par `web`.

**Remarques** :
- Vous ne pouvez pas utiliser de caractères génériques pour rechercher des clés d'attribut, telles que `*:app` ou `service*:app`.
- Les caractères génériques ne fonctionnent comme tels qu'en dehors des guillemets.
    - Par exemple, `"*test*"` correspond à un log qui contient la chaîne `*test*` dans son champ `message`, tandis que `*test*` correspond à un log qui contient la chaîne `test` n'importe où dans le champ `message`.

#### Rechercher des caractères spéciaux ou des caractères d'échappement {#search-for-special-characters-or-escaped-characters}

Lors de la recherche d'un attribut qui contient des caractères spéciaux ou nécessite un échappement ou des guillemets, utilisez le caractère générique `?` pour faire correspondre un seul caractère spécial ou un espace. Par exemple, pour rechercher un attribut `my_attribute` avec la valeur `hello world`, utilisez la syntaxe : `my_attribute:hello?world`.

[1]: /fr/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/