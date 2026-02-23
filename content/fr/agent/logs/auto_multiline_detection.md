---
algolia:
  tags:
  - advanced log filter
description: Utiliser l'Agent Datadog pour détecter et agréger automatiquement les
  logs à lignes multiples
further_reading:
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: Collecte de logs avancée
- link: /agent/logs/auto_multiline_detection_legacy
  tag: Documentation
  text: Détection et agrégation automatiques des lignes multiples (obsolète)
title: Détection et agrégation automatiques des lignes multiples
---

<div class="alert alert-danger">Cette fonctionnalité est disponible à partir de la version <strong>7.65.0</strong> de l'Agent. Pour les versions antérieures de l'Agent, ou pour activer explicitement l'ancienne implémentation, consultez la section <a href="/agent/logs/auto_multiline_detection_legacy">Détection et agrégation automatiques des lignes multiples (obsolète)</a>.</div>

## Présentation

La détection automatique des lignes multiples permet à l'Agent d'identifier et d'agréger automatiquement les logs à lignes multiples.

## Prise en main

Pour activer la fonctionnalité de détection automatique des lignes multiples dans la configuration de votre Agent, définissez `auto_multi_line_detection` sur `true` dans votre fichier de configuration, ou définissez la variable d'environnement `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true` :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}
```yaml
logs_config:
  auto_multi_line_detection: true
```
{{% /tab %}}
{{% tab "Variable d'environnement" %}}
```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
```
{{% /tab %}}
{{< /tabs >}}

### Paramètres par défaut
Par défaut, les fonctionnalités suivantes sont activées :

- `enable_datetime_detection` : cette option permet de configurer l'agrégation automatique des dates et heures. Les logs commençant par un format de date et d'heure sont alors utilisés pour l'agrégation.
- `enable_json_detection`:  cette option permet de configurer la détection et le rejet des logs JSON. Les logs avec une structure JSON ne sont alors jamais agrégés.

Vous pouvez désactiver ces fonctionnalités en définissant ce qui suit sur `false` dans votre fichier de configuration ou dans votre variable d'environnement :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}
```yaml
logs_config:
  auto_multi_line:
    enable_datetime_detection: false
    enable_json_detection: false

```
{{% /tab %}}

{{% tab "Variables d'environnement" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_ENABLE_DATETIME_DETECTION=false
DD_LOGS_CONFIG_AUTO_MULTI_LINE_ENABLE_JSON_DETECTION=false
```
{{% /tab %}}
{{< /tabs >}}


### Activer l'agrégation des lignes multiples pour des intégrations spécifiques

Vous pouvez activer ou désactiver l'agrégation des lignes multiples pour la collecte de logs d'une intégration spécifique :

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: false
```

#### Réglages propres à chaque intégration pour les lignes multiples

Vous pouvez définir des réglages de détection automatique des lignes multiples pour chaque intégration spécifique. L'intégration accepte les mêmes réglages que le fichier `datadog.yaml` standard :

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
    auto_multi_line_detection_custom_samples:
      - sample: "ERROR [DatabaseService]"
    auto_multi_line:
        enable_json_detection: true
        enable_datetime_detection: true
        tokenizer_max_input_bytes: 50
```

### Formats de date et d'heure pris en charge

La détection automatique des lignes multiples utilise un algorithme pour détecter *tous* les formats de date et d'heure qui figurent dans les 60 premiers bytes d'une ligne de log. Pour éviter les faux positifs, l'algorithme a besoin de suffisamment de contexte pour faire correspondre un format de date et d'heure.

Pour être détecté, votre format de date et d'heure doit comporter à la fois un composant _date_ et un composant _heure_.

Exemples de formats valides qui contiennent suffisamment de contexte pour être détectés :
 - `2021-03-28 13:45:30`
 - `2023-03-28T14:33:53.743350Z`
 - `Jun 14 15:16:01`
 - `2024/05/16 19:46:15`

Exemples de formats qui ne contiennent pas suffisamment de contexte pour être détectés :
- `12:30:2017`
- `12:30:20`
- `2024/05/16`


## Configuration de patterns personnalisés

Si l'agrégation des dates et des heures est insuffisante, ou si votre format est trop court pour être détecté automatiquement, il existe deux façons de personnaliser la fonctionnalité :
- [Échantillons personnalisés](#echantillons-personnalises)
- [Patterns d'expression régulière](#patterns-d-expression-reguliere)

### Échantillons personnalisés

Un échantillon personnalisé correspond à un échantillon de log à partir duquel vous souhaitez agréger des logs. Par exemple, si vous souhaitez agréger une stack trace, sa première ligne constitue un excellent échantillon. Pour l'agrégation de logs, il est plus simple d'utiliser des échantillons personnalisés plutôt que des patterns d'expression régulière.

Pour configurer des échantillons personnalisés, vous pouvez utiliser la configuration `logs_config` dans votre fichier `datadog.yaml` ou définir une variable d'environnement. Dans l'exemple suivant, la fonctionnalité de détection des lignes multiples recherche l'échantillon `"SEVERE Main main Exception occurred"` :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - sample: "SEVERE Main main Exception occurred"
```

{{% /tab %}}
{{% tab "Variables d'environnement" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[{"sample": "SEVERE Main main Exception occurred"}]'
```

{{% /tab %}}
{{< /tabs >}}

Cela permet d'agréger les logs qui comportent `"SEVERE Main main Exception occurred"` dans la première ligne. Exemple :

```text
SEVERE Main main Exception occurred
java.lang.Exception: Something bad happened!
    at Main.funcd(Main.java:50)
    at Main.funcc(Main.java:49)
    at Main.funcb(Main.java:48)
    at Main.funca(Main.java:47)
    at Main.main(Main.java:29)
```

#### Fonctionnement des échantillons personnalisés

Les échantillons personnalisés « tokenisent » les 60 premiers bytes d'une ligne de log, ainsi que l'échantillon fourni.
Les jetons générés comprennent :
- les mots et leur longueur ;
- les espaces ;
- les nombres et leur longueur ;
- les caractères spéciaux ;
- les composants d'heure et de date.

Chaque jeton de log est comparé à chaque jeton de l'échantillon. Si 75 % des jetons du log correspondent à ceux de l'échantillon, le log est agrégé.
Datadog recommande d'utiliser les échantillons si le format de vos logs est stable. Pour une flexibilité accrue, utilisez plutôt des expressions régulières.

### Patterns d'expression régulière

Les patterns d'expression régulière fonctionnent de la même manière qu'une règle `multi_line`. Si le pattern correspond au log, celui-ci est agrégé.

Pour configurer des patterns d'expression régulière personnalisés, vous pouvez utiliser la configuration `logs_config` dans votre fichier `datadog.yaml` ou définir une variable d'environnement.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - regex: "\\[\\w+\\] Main main Exception occurred"
```

{{% /tab %}}
{{% tab "Variables d'environnement" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[{"regex": "\\[\\w+\\] Main main Exception occurred"}]'
```

{{% /tab %}}
{{< /tabs >}}

Vous pouvez utiliser à la fois des échantillons et des patterns d'expression régulière afin de gérer plusieurs formats de log :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - sample: "CORE | INFO | (pkg/logs/"
    - regex: "\\d{4}dog.\\s\\w+"
    - sample: "[ERR] Exception"
      label: no_aggregate
```

{{% /tab %}}
{{% tab "Variables d'environnement" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[
  {"sample": "CORE | INFO | (pkg/logs/"},
  {"regex": "\\d{4}dog.\\s\\w+"},
  {"sample": "[ERR] Exception", "label": "no_aggregate"}
]'
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : les configurations `auto_multi_line_extra_patterns` existantes sont automatiquement prises en charge [lors de la migration depuis la version 1][2].

## Agrégation JSON

Depuis la version 7.67 de l'Agent Datadog, le contenu JSON formaté de manière lisible ou à lignes multiples est automatiquement détecté et agrégé au sein d'une seule ligne.

Par exemple, le log suivant…

```
2024-08-13 17:15:17 INFO My log message 1
2024-08-13 17:15:17 INFO My log message 2
{
    "id": "565290f7-6ce0-4d3d-be7f-685905c27f04",
    "clusters": 6,
    "samples": 1301,
    "top_match": {
        "score": 1317,
        "weight": 1.108
    }
}
2024-08-13 17:15:17 INFO My log message 3
2024-08-13 17:15:17 INFO My log message 4
```

est automatiquement converti en ce suit suit :

```
2024-08-13 17:15:17 INFO My log message 1
2024-08-13 17:15:17 INFO My log message 2
{"id":"565290f7-6ce0-4d3d-be7f-685905c27f04","clusters":6,"samples": 1301,"top_match":{"score":1317,"weight":1.108}}
2024-08-13 17:15:17 INFO My log message 3
2024-08-13 17:15:17 INFO My log message 4
```

Ainsi, Datadog identifie le contenu JSON en tant que log structuré, et vous pouvez interroger ses attributs.

Vous pouvez utiliser ce qui suit pour désactiver l'agrégation JSON :

```yaml
logs_config:
  auto_multi_line:
    enable_json_aggregation: false
```


## Personnalisation avancée

La détection automatique des lignes multiples utilise un système d'agrégation reposant sur des étiquettes pour agréger les logs. Lors de la détection, une étiquette est attribuée à chaque log. Les logs sont agrégés en fonction de ces étiquettes.

### Étiquettes
`start_group`
: Définit le _début d'un log à lignes multiples_<br> - Vide tout log à lignes multiples en mémoire tampon, le cas échéant<br> - Commence un nouveau log à lignes multiples<br> - Un seul log à lignes multiples à la fois peut être stocké en mémoire tampon

`aggregate`
: Est _ajouté à un log à lignes multiples existant_<br> - S'il n'y a pas de log à lignes multiples, le processus de vidage commence immédiatement <br> - Étiquette par défaut en l'absence de correspondance

`no_aggregate`
: Déclare les logs qui ne _seront jamais agrégés_<br> - Vide le log à lignes multiples stocké en mémoire tampon, le cas échéant<br> - Vide immédiatement l'échantillon<br> - Sert pour les logs JSON


### Configuration des étiquettes

Vous pouvez spécifier des étiquettes personnalisées pour chaque expression régulière ou chaque échantillon, afin de modifier le comportement d'agrégation en fonction des règles des étiquettes. Cela s'avère utile lorsque vous souhaitez inclure ou exclure explicitement certains formats de log pour l'agrégation des lignes multiples.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    # Ne jamais agréger ces formats
    - sample: "un service à ne pas agréger"
      label: no_aggregate
    - regex: \w*\s(data|dog)
      label: no_aggregate
```

{{% /tab %}}
{{% tab "Variables d'environnement" %}}

``shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[
  {"sample" : "un service à ne pas agréger", "label" : "no_aggregate"},
  {"regex" : "\\w*\s(data|dog)", "label" : "no_aggregate"}
]'
```

{{% /tab %}}
{{< /tabs >}}

## Surveillance et debugging

Vous pouvez rechercher des logs à lignes multiples ou des logs tronqués en activant les paramètres suivants :

```yaml
logs_config:
  tag_multi_line_logs: true
  tag_truncated_logs: true
```

Ces paramètres ajoutent les _tags_ suivants à vos logs, ce qui vous permet de les rechercher dans le Logs Explorer :

- `multiline` : indique la source de l'agrégation (par exemple, `auto_multiline` ou `multiline_regex`)
- `truncated` : Indique la source de la troncature (par exemple, `single_line` ou `multi_line`)

**Remarque :** l'Agent tronque les logs qui sont trop longs à traiter. Si une ligne est trop longue avant l'agrégation des lignes multiples, l'Agent lui attribue le tag `single_line`. Si un pattern incorrect provoque le dépassement du tampon d'agrégation pour un log, l'Agent applique le tag `multi_line`.


Vous pouvez également appliquer un tag aux logs JSON agrégés.

```yaml
logs_config:
  auto_multi_line:
    tag_aggregated_json: true
```

Vous pouvez rechercher ce tag en spécifiant `aggregated_json:true` dans une requête du Logs Explorer.

## Référence de configuration

| Paramètre | Type | Valeur par défaut | Description |
|---------|------|---------|-------------|
| `logs_config.auto_multi_line_detection_custom_samples` | Objet | Vide | Échantillons ou patterns d'expression régulière personnalisés |
| `logs_config.auto_multi_line.enable_json_detection` | Booléen | True | Active la détection et le rejet des logs JSON |
| `logs_config.auto_multi_line.enable_datetime_detection` | Booléen | True | Active la détection des dates et heures |
| `logs_config.auto_multi_line.timestamp_detector_match_threshold` | Valeur flottante | 0.5 | Seuil de correspondance des horodatages |
| `logs_config.auto_multi_line.tokenizer_max_input_bytes` | Nombre entier | 60 | Bytes à tokeniser |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/logs/auto_multiline_detection
[2]: /fr/agent/logs/auto_multiline_detection_legacy