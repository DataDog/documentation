---
algolia:
  tags:
  - advanced log filter
description: Utilisez l'Agent Datadog pour recueillir vos logs et envoyez-les à Datadog
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: Documentation
  text: Commencer avec Logging without Limits™
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentation
  text: Utiliser l'Agent Datadog pour la collecte de logs uniquement
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Découvrir comment traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/live_tail/
  tag: Documentation
  text: Fonctionnalité Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail » (suivi)
title: Configurations avancées pour la collecte de logs
---
Après avoir configuré [la collecte de logs][1], vous pouvez personnaliser la configuration de votre collection :
- [Filtrer les journaux](#filter-logs)
  - [Exclure en cas de correspondance](#exclude-at-match)
  - [Inclure en cas de correspondance](#include-at-match)
  - [Exclure les journaux tronqués](#exclude-truncated)
- [Masquer les données sensibles de vos journaux](#scrub-sensitive-data-from-your-logs)
- [Agrégation multi-lignes](#manually-aggregate-multi-line-logs)
- [Agrégation automatique des journaux multi-lignes](#automatically-aggregate-multi-line-logs)
- [Règles de traitement des journaux couramment utilisées](#commonly-used-log-processing-rules)
- [Suivre les répertoires en utilisant des jokers](#tail-directories-using-wildcards)
  - [Prioriser les fichiers suivis par date de modification](#prioritize-tailed-files-by-modification-time)
- [Encodages des fichiers journaux](#log-file-encodings)
- [Règles de traitement globales](#global-processing-rules)
- [Lectures complémentaires](#further-reading)

Pour appliquer une règle de traitement à tous les journaux collectés par un agent Datadog, voir la section [Règles de traitement globales](#global-processing-rules).

**Notes** :
- Si vous configurez plusieurs règles de traitement, elles sont appliquées séquentiellement et chaque règle est appliquée sur le résultat de la précédente.
- Les motifs de règles de traitement doivent être conformes à la [syntaxe regexp de Golang][2].
- Le paramètre `log_processing_rules` est utilisé dans les configurations d'intégration pour personnaliser votre configuration de collecte de journaux. Lors de la configuration [principale de l'Agent][5], le paramètre `processing_rules` est utilisé pour définir des règles de traitement globales.

## Filtrer les journaux {#filter-logs}

Pour envoyer uniquement un sous-ensemble spécifique de journaux à Datadog, utilisez le paramètre `log_processing_rules` dans votre fichier de configuration avec le type `exclude_at_match` ou `include_at_match`.

### Exclure en cas de correspondance {#exclude-at-match}

| Paramètre          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | Si le motif spécifié est contenu dans le message, le journal est exclu et n'est pas envoyé à Datadog. |

Par exemple, pour **filtrer** les journaux contenant une adresse e-mail Datadog, utilisez le `log_processing_rules` suivant :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "Docker" %}}

<div class="alert alert-info">
Pour plus d'informations sur la configuration de l'Agent, consultez <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Gestion de la découverte des conteneurs</a>.
</div>

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur le **conteneur envoyant les journaux que vous souhaitez filtrer** afin de spécifier le `log_processing_rules`, par exemple :

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "exclude_at_match",
          "name": "exclude_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**Remarque** :
- Échapper les caractères regex dans vos motifs lors de l'utilisation d'étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'étiquette doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{% tab "Kubernetes" %}}

<div class="alert alert-info">
Pour plus d'informations sur la configuration de l'Agent, consultez <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Gestion de la découverte des conteneurs</a>.
</div>

Pour configurer l'utilisation de l'Autodécouverte pour collecter les journaux de conteneurs sur un conteneur donné (avec le nom `CONTAINER_NAME`) dans votre pod, ajoutez les annotations suivantes à votre `log_processing_rules` de pod :

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_at_match",
              "name": "exclude_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Remarque** :
- Échapper les caractères regex dans vos motifs lors de l'utilisation d'annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'annotation doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{< /tabs >}}

### Inclure en cas de correspondance {#include-at-match}

| Paramètre          | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Seuls les journaux avec un message incluant le motif spécifié sont envoyés à Datadog. Si plusieurs `include_at_match` règles sont définies, tous les motifs de règles doivent correspondre pour que le journal soit inclus. |


Par exemple, utilisez la `log_processing_rules` configuration suivante pour **filtrer** les journaux contenant une adresse e-mail Datadog :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

Si vous souhaitez rechercher une ou plusieurs expressions, vous devez les définir dans une seule expression :

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: abc|123
```

Si les expressions sont trop longues pour rentrer sur une seule ligne, vous pouvez les séparer en plusieurs lignes :

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: "abc\
|123\
|\\w+@datadoghq.com"
```

{{% /tab %}}
{{% tab "Docker" %}}

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur le conteneur qui envoie les journaux que vous souhaitez filtrer, pour spécifier le `log_processing_rules`. Exemple :

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "include_at_match",
          "name": "include_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**Remarque** :
- Échapper les caractères regex dans vos motifs lors de l'utilisation d'étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'étiquette doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour spécifier le `log_processing_rules`. Exemple :

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "include_at_match",
              "name": "include_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Remarque** :
- Échapper les caractères regex dans vos motifs lors de l'utilisation d'annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'annotation doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{< /tabs >}}

### Exclure les journaux tronqués{#exclude-truncated}

| Paramètre           | Description                                                        |
|---------------------|--------------------------------------------------------------------|
| `exclude_truncated` | Lorsqu'il est présent, il exclut les journaux tronqués et ne les envoie pas à Datadog. La règle `exclude_truncated` est disponible à partir de l'Agent v7.69. |

Par exemple, pour **filtrer** les journaux tronqués :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_truncated
```

{{% /tab %}}
{{% tab "Docker" %}}

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur le conteneur qui envoie les journaux que vous souhaitez filtrer, pour spécifier le `log_processing_rules`. Exemple :

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "exclude_truncated"
        }]
      }]
```

**Remarque** : La valeur de l'étiquette doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour spécifier le `log_processing_rules`. Exemple :

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_truncated"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Remarque** : La valeur de l'annotation doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{< /tabs >}}

## Masquer les données sensibles de vos journaux {#scrub-sensitive-data-from-your-logs}

Si vos journaux contiennent des informations sensibles à masquer, configurez l'Agent Datadog pour masquer les séquences sensibles en utilisant le paramètre `log_processing_rules` dans votre fichier de configuration avec le type `mask_sequences`.

Cela remplace tous les groupes correspondants par la valeur du paramètre `replace_placeholder`.

Par exemple, pour effacer un numéro de carte bancaire :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

```yaml
logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[masked_credit_card]"
        ##One pattern that contains capture groups
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

{{% /tab %}}
{{% tab "Docker" %}}

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour spécifier le `log_processing_rules`. Exemple :

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "mask_credit_cards",
          "replace_placeholder": "[masked_credit_card]",
          "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
        }]
      }]
```

**Remarque** :
- Échapper les caractères regex dans vos motifs lors de l'utilisation d'étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'étiquette doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour spécifier le `log_processing_rules`. Exemple :

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "mask_sequences",
              "name": "mask_credit_cards",
              "replace_placeholder": "[masked_credit_card]",
              "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Remarque** :
- Échapper les caractères regex dans vos motifs lors de l'utilisation d'annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'annotation doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{< /tabs >}}

Avec la version 7.17+ de l'Agent, la chaîne `replace_placeholder` peut étendre les références aux groupes de capture tels que `$1`, `$2` et ainsi de suite. Si vous souhaitez qu'une chaîne suive le groupe de capture sans espace entre les deux, utilisez le format `${<GROUP_NUMBER>}`.

Par exemple, pour masquer les informations utilisateur du journal `User email: foo.bar@example.com`, utilisez :

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

Cela envoie le journal suivant à Datadog : `User email: masked_user@example.com`

## Agrégation automatique des journaux multi-lignes {#automatically-aggregate-multi-line-logs}

La détection automatique des journaux multi-lignes est utile lorsque vous avez de nombreuses sources de journaux avec des formats complexes ou lorsque vous n'avez pas le temps de configurer chaque source individuellement. Cette fonctionnalité détecte et agrège automatiquement les journaux multi-lignes sans nécessiter que vous écriviez des motifs regex personnalisés.

Consultez la documentation [Auto Multi-line Detection and Aggregation][7] (en anglais).

Pour la prise en charge héritée de cette fonctionnalité, consultez la documentation [Automatic Multi-line Detection and Aggregation (Legacy)][8] (en anglais).

## Agrégation manuelle des journaux multi-lignes {#manually-aggregate-multi-line-logs}

Les règles manuelles multi-lignes vous donnent un contrôle précis sur l'agrégation des journaux lorsque vous connaissez vos formats de journaux. Cette approche est idéale pour garantir un traitement cohérent des journaux avec des motifs regex personnalisés adaptés à votre structure de journaux spécifique.

Si vos journaux ne sont pas envoyés en JSON et que vous souhaitez agréger plusieurs lignes en une seule entrée, configurez l'Agent Datadog pour détecter un nouveau journal à l'aide d'un motif regex spécifique au lieu d'avoir un journal par ligne. Utilisez le type `multi_line` dans le paramètre `log_processing_rules` pour agréger toutes les lignes en une seule entrée jusqu'à ce que le motif donné soit détecté à nouveau.

Par exemple, chaque ligne de journal Java commence par un horodatage au format `yyyy-dd-mm`. Ces lignes incluent une trace de pile qui peut être envoyée sous forme de deux journaux :

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Pour envoyer les journaux d'exemple ci-dessus avec un fichier de configuration, utilisez le `log_processing_rules` suivant :

```yaml
logs:
 - type: file
   path: /var/log/pg_log.log
   service: database
   source: postgresql
   log_processing_rules:
      - type: multi_line
        name: new_log_start_with_date
        pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

{{% /tab %}}
{{% tab "Docker" %}}

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour spécifier le `log_processing_rules`. Exemple :

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "postgresql",
        "service": "database",
        "log_processing_rules": [{
          "type": "multi_line",
          "name": "log_start_with_date",
          "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
        }]
      }]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour spécifier le `log_processing_rules`. Exemple :

```yaml
apiVersion: apps/v1
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "postgresql",
            "service": "database",
            "log_processing_rules": [{
              "type": "multi_line",
              "name": "log_start_with_date",
              "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
            }]
          }]
      labels:
        app: database
      name: postgres
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: postgres:latest
```

**Remarque** :
- Échappez les caractères regex dans vos motifs lors de l'agrégation multi-lignes avec des annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'annotation doit suivre la syntaxe JSON, ce qui signifie que vous ne devez pas inclure de virgules ou de commentaires à la fin.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>Important !</strong> Les motifs regex pour les journaux multi-lignes doivent commencer au <em>début</em> d'un journal. Les motifs ne peuvent pas correspondre en milieu de ligne. <em>Un motif qui ne correspond jamais peut entraîner des pertes de lignes de journal.</em> <br><br>La collecte des journaux fonctionne avec une précision allant jusqu'à la milliseconde. Les journaux avec une précision supérieure ne sont pas envoyés même s'ils correspondent au motif.</div>

Exemples supplémentaires :

| **Chaîne brute**           | **Motif**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Jeu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## Règles de traitement des journaux couramment utilisées {#commonly-used-log-processing-rules}

Consultez la section [FAQ sur les règles de traitement des logs couramment utilisées][4] pour obtenir une liste d'exemples.

## Suivre les répertoires en utilisant des caractères génériques {#tail-directories-using-wildcards}

Si vos fichiers journaux sont étiquetés par date ou tous stockés dans le même répertoire, configurez votre Agent Datadog pour les surveiller tous et détecter automatiquement les nouveaux en utilisant des caractères génériques dans l'attribut `path`. Si vous souhaitez exclure certains fichiers correspondant au `path` choisi, listez-les dans l'attribut `exclude_paths`.

* Utilisation de `path: /var/log/myapp/*.log` :
  * Correspond à tous les fichiers `.log` contenus dans le répertoire `/var/log/myapp/`.
  * Ne correspond pas à `/var/log/myapp/myapp.conf`.

* Utilisation de `path: /var/log/myapp/*/*.log` :
  * Correspond à `/var/log/myapp/log/myfile.log`.
  * Correspond à `/var/log/myapp/errorLog/myerrorfile.log`
  * Ne correspond pas à `/var/log/myapp/mylogfile.log`.

Exemple de configuration pour Linux :

```yaml
logs:
  - type: file
    path: /var/log/myapp/log/*.log
    exclude_paths:
      - /var/log/myapp/log/debug.log
      - /var/log/myapp/log/trace.log
    service: mywebapp
    source: go
```

L'exemple ci-dessus correspond à `/var/log/myapp/log/myfile.log` et exclut `/var/log/myapp/log/debug.log` et `/var/log/myapp/log/trace.log`.

Exemple de configuration pour Windows :

```yaml
logs:
  - type: file
    path: C:\\MyApp\\*.log
    exclude_paths:
      - C:\\MyApp\\MyLog.*.log
    service: mywebapp
    source: csharp
```

L'exemple ci-dessus correspond à `C:\\MyApp\\MyLog.log` et exclut `C:\\MyApp\\MyLog.20230101.log` et `C:\\MyApp\\MyLog.20230102.log`.

**Remarque** :
- L'Agent nécessite des autorisations de lecture et d'exécution sur un répertoire pour lister tous les fichiers disponibles dans celui-ci.
- Les valeurs de path et exclude_paths sont sensibles à la casse.

### Prioriser les fichiers suivis par date de modification {#prioritize-tailed-files-by-modification-time}

Cette fonctionnalité nécessite la version 7.40.0 ou une version ultérieure de l'Agent.

L'Agent limite le nombre de fichiers qu'il peut suivre simultanément avec le paramètre `logs_config.open_files_limit`. Si le nombre de fichiers correspondant à vos sources de journaux configurées (comme les caractères génériques) est dans la limite, l'Agent suit tous ces fichiers. Si plus de fichiers correspondent à la limite autorisée, l'Agent priorise en triant les noms de fichiers dans l'ordre lexicographique inverse, de sorte que les fichiers avec des horodatages plus récents ou des numéros plus élevés soient suivis en premier.

Si les noms de fichiers ne suivent pas des modèles séquentiels ou horodatés, l'ordre par défaut peut ne pas être idéal. Pour prioriser par date de modification à la place, définissez `logs_config.file_wildcard_selection_mode` sur `by_modification_time`. Avec ce paramètre, l'Agent suit en premier les fichiers les plus récemment modifiés.

**Exemple** :
- `open_files_limit` = 500
- Votre motif générique correspond à 700 fichiers.
- Avec `by_name` : l'Agent suit les 500 fichiers dont les noms sont les plus élevés dans l'ordre lexicographique inverse (par exemple, app.log.700 à app.log.201).
- Avec `by_modification_time` : l'Agent suit les 500 fichiers les plus récemment écrits, indépendamment de leurs noms.

```yaml
logs_enabled: true
logs_config:
 [...]
  open_files_limit: 500

  ## @param file_wildcard_selection_mode - string - optional - default: by_name
  ## The strategy used to prioritize wildcard matches if they exceed open_files_limit.
  ## Choices:
  ##   - by_name: files are sorted in reverse lexicographic order (default).
  ##   - by_modification_time: files are sorted by modification time, with the most recent first.
  ## WARNING: by_modification_time is less performant and increases disk I/O.
  file_wildcard_selection_mode: by_modification_time
```

Pour restaurer le comportement par défaut, retirez l'entrée `logs_config.file_wildcard_selection_mode` ou définissez-la explicitement sur `by_name`.

## Encodages des fichiers journaux {#log-file-encodings}

Par défaut, l'Agent Datadog suppose que les journaux utilisent l'encodage UTF-8. Si vos journaux d'application utilisent un encodage différent, spécifiez le paramètre `encoding` dans le paramètre de configuration des journaux.

La liste ci-dessous donne les valeurs d'encodage prises en charge. Si vous fournissez une valeur non prise en charge, l'Agent ignore la valeur et lit le fichier en tant qu'UTF-8.
 * `utf-16-le` - UTF-16 little-endian (Agent Datadog **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Agent Datadog **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Agent Datadog **v6.34/v7.34**)

<div class="alert alert-warning">Si vous changez le <code>encoding</code> <em>Si vous modifiez un fichier que l'Agent est déjà en train de suivre, cela peut produire des caractères brouillés (mojibake).</em> L'Agent reprend à partir du décalage d'octet précédent, qui peut ne pas s'aligner avec les limites de caractères après un changement d'encodage. Pour corriger cela, effectuez une rotation du fichier journal, remplacez-le ou redémarrez la surveillance depuis le début d'un fichier qui utilise le nouvel encodage. Ces actions aident l'Agent à commencer avec le bon encodage.</div>

Exemple de configuration :

```yaml
logs:
  - type: file
    path: /test/log/hello-world.log
    tags: key:value
    service: utf-16-logs
    source: mysql
    encoding: utf-16-be
```

**Remarque** : Le paramètre `encoding` n'est applicable que lorsque le paramètre `type` est défini sur `file`.

## Règles de traitement globales {#global-processing-rules}

Pour l'Agent Datadog v6.10+, les règles de traitement `exclude_at_match`, `include_at_match` et `mask_sequences` peuvent être définies globalement dans le [fichier de configuration principal de l'Agent][5] ou via une variable d'environnement. La règle `exclude_truncated` est disponible à partir de l'Agent v7.69.

{{< tabs >}}
{{% tab "Fichiers de configuration" %}}

Dans le fichier `datadog.yaml` :

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_healthcheck
      pattern: healthcheck
    - type: mask_sequences
      name: mask_user_email
      pattern: \w+@datadoghq.com
      replace_placeholder: "MASKED_EMAIL"
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

Utilisez la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` pour configurer les règles de traitement globales, par exemple :

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Operator Datadog" %}}

Utilisez le paramètre `spec.override.[key].env` dans votre manifeste Datadog Operator pour définir la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` afin de configurer les règles de traitement globales, où `[key]` est `nodeAgent`, `clusterAgent` ou `clusterChecksRunner`. Exemple :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

Utilisez le paramètre `datadog.env` dans le graphique Helm pour définir la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` afin de configurer les règles de traitement globales. Exemple :

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Tous les journaux collectés par l'Agent Datadog sont impactés par les règles de traitement globales.

**Remarque** : L'Agent Datadog ne démarre pas le collecteur de journaux s'il y a un problème de format dans les règles de traitement globales. Exécutez la [sous-commande d'état de l'Agent][6] pour résoudre tout problème.

## FAQ sur l'agrégation de journaux multi-lignes {#multi-line-log-aggregation-faq}

**1. Quand devrais-je utiliser des règles multi-lignes manuelles plutôt que la détection automatique des multi-lignes ?**

Si vous connaissez le format de vos journaux, vous devriez utiliser des règles multi-lignes manuelles pour un contrôle précis.
Si vous envoyez beaucoup de journaux multi-lignes, et que vous n'êtes pas sûr de leur format ou que vous n'avez pas les moyens de configurer toutes les sources individuellement, vous devriez utiliser la détection automatique des multi-lignes.

**2. Que se passe-t-il lorsqu'un motif multi-lignes ne correspond à aucun journal ?**

Toutes les lignes de journal non-JSON sont traitées individuellement comme des entrées de journal séparées.
Toutes les lignes de journal au format JSON sont traitées comme une seule ligne, et seul le premier format JSON valide est pris en compte ; les autres sont rejetées.

**3. Que se passe-t-il lorsqu'il y a à la fois des règles globales et des règles spécifiques à l'intégration ?**
Les règles spécifiques à l'intégration remplacent complètement les règles globales pour l'intégration particulière.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /fr/agent/faq/commonly-used-log-processing-rules
[5]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /fr/agent/configuration/agent-commands/#agent-information
[7]: /fr/agent/logs/auto_multiline_detection
[8]: /fr/agent/logs/auto_multiline_detection_legacy