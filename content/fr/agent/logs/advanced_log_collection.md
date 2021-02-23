---
title: Collecte de logs avancée
kind: documentation
description: Utiliser l'Agent Datadog pour recueillir vos logs et les envoyer à Datadog
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: /logs/processing/parsing/
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: /logs/live_tail/
    tag: Documentation
    text: "Fonctionnalité Live\_Tail de Datadog"
  - link: /logs/explorer/
    tag: Documentation
    text: Découvrir comment explorer vos logs
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: Logging without Limits*
---
Appliquez des règles de traitement de logs aux configurations de collecte de logs spécifiques pour :

* [Filtrer les logs](#filter-logs)
* [Nettoyer les données sensibles de vos logs](#scrub-sensitive-data-from-your-logs)
* [Effectuer l'agrégation multiligne](#multi-line-aggregation)
* [Suivre des répertoires à l'aide de wildcards](#tail-directories-by-using-wildcards)
* [Encoder des logs au format UTF-16](#encode-utf-16-format-logs)

**Remarque** : si vous configurez plusieurs règles de traitement, celles-ci sont appliquées de façon séquentielle et chaque règle est appliquée au résultat de la précédente.

Pour appliquer une règle de traitement à tous les logs recueillis par un Agent Datadog, consultez la section [Règles globales de traitement](#regles-globales-de-traitement).

## Filtrer les logs

Pour envoyer uniquement un sous-ensemble spécifique de logs à Datadog, utilisez le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **exclude_at_match** ou **include_at_match**.

### exclude_at_match

| Paramètre          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | Si l'expression spécifiée est incluse dans le message, le log est exclu et n'est pas envoyé à Datadog. |

Par exemple, pour **exclure** les logs qui contiennent une adresse e-mail Datadog, utilisez les paramètres `log_processing_rules` suivants :

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
      name: exclure_utilisateurs_datadog
      ## L'expression régulière peut varier
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "Docker" %}}

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour indiquer les `log_processing_rules`, par exemple :

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

**Remarque** : échappez les caractères regex dans vos patterns lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`, etc.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour indiquer les `log_processing_rules`, par exemple :

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**Remarque** : échappez les caractères regex dans vos patterns lorsque vous utilisez des annotations. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`, etc.

{{% /tab %}}
{{< /tabs >}}

### include_at_match

| Paramètre          | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Seuls les logs avec un message qui contient l'expression spécifiée sont envoyés à Datadog. |


Par exemple, pour **inclure** les logs qui contiennent une adresse e-mail Datadog, utilisez les paramètres `log_processing_rules` suivants :

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
      name: inclure_utilisateurs_datadog
      ## L'expression régulière peut varier
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "Docker" %}}

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour indiquer les `log_processing_rules`, par exemple :

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

**Remarque** : échappez les caractères regex dans vos patterns lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`, etc.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour indiquer les `log_processing_rules`, par exemple :

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**Remarque** : échappez les caractères regex dans vos patterns lorsque vous utilisez des annotations. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`, etc.

{{% /tab %}}
{{< /tabs >}}

## Nettoyer les données sensibles de vos logs

Si vos logs contiennent des informations confidentielles que vous souhaitez censurer, configurez l'Agent Datadog pour nettoyer les séquences sensibles en utilisant le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **mask_sequences**.

Cette action remplace tous les groupes correspondants par la valeur du paramètre `replace_placeholder`.

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
        name: masquer_cartes_bancaires
        replace_placeholder: "[numéro_carte_masqué]"
        ##Une expression qui contient des groupes d'enregistrement
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

{{% /tab %}}
{{% tab "Docker" %}}

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour indiquer les `log_processing_rules`, par exemple :

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

**Remarque** : échappez les caractères regex dans vos patterns lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`, etc.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour indiquer les `log_processing_rules`, par exemple :

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**Remarque** : échappez les caractères regex dans vos patterns lorsque vous utilisez des annotations. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`, etc.

{{% /tab %}}
{{< /tabs >}}

À partir des versions 7.17+ de l'Agent, la chaîne `replace_placeholder` peut développer les références à des groupes de capture telles que `$1`, `$2`, etc. Pour faire en sorte qu'une chaîne suive le groupe de capture sans aucune espace entre les deux, utilisez le format `${<NUMÉRO_GROUPE>}`.

Par exemple, pour supprimer les informations personnelles du log `User email: foo.bar@example.com`, utilisez :

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

Le log suivant est alors envoyé à Datadog : `User email: masked_user@example.com`

## Agrégation multiligne

Si vos logs ne sont pas envoyés au format JSON et que vous souhaitez agréger plusieurs lignes en une seule entrée, configurez l'Agent Datadog de façon à détecter un nouveau log avec une expression régulière spécifique, au lieu de compter un seul log par ligne. Pour ce faire, utilisez le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **multi_line** qui agrège toutes les lignes en une seule entrée jusqu'à ce que l'expression indiquée soit à nouveau détectée.

Par exemple, chaque ligne de log Java commence avec un timestamp au format `aaaa-jj-mm`. Ces lignes comprennent une stack trace qui peut être envoyée sous forme de deux logs :

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Pour envoyer les logs d'exemple mentionnés ci-dessus avec un fichier de configuration, utilisez les paramètres `log_processing_rules` suivants :

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

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour indiquer les `log_processing_rules`, par exemple :

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

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour indiquer les `log_processing_rules`, par exemple :

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/postgres.logs: >-
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
        - name: postgres
          image: postgres:latest
```

**Remarque** : échappez les caractères regex dans vos patterns lorsque vous effectuez une agrégation multiligne avec des annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`, etc.

{{% /tab %}}
{{< /tabs >}}

Exemples supplémentaires :

| **Chaîne brute**           | **Pattern**                                   |
|--------------------------|-----------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                           |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                         |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}`    |
| 20180228                 | `\d{8}`                                       |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}` |

**Remarque** : les expressions régulières pour les logs multiligne doivent commencer au **début** d'un log. Les expressions ne peuvent pas être recherchées en milieu de ligne.

## Règles de traitement des logs couramment utilisées

Consultez la section [FAQ sur les règles de traitement des logs couramment utilisées][1] pour obtenir une liste d'exemples.

## Suivre des répertoires à l'aide de wildcards

Si vos fichiers de log sont étiquetés par date ou tous stockés au sein d'un même répertoire, configurez votre Agent Datadog pour tous les surveiller et détecter automatiquement de nouveaux logs à l'aide de wildcards dans l'attribut `path`. Si vous souhaitez exclure les fichiers correspondant à un certain `path`, énumérez-les dans l'attribut `exclude_paths`.

* Utiliser `path: /var/log/myapp/*.log` :
  * Pour surveiller tous les fichiers `.log` dans le répertoire `/var/log/myapp/`
  * Ne pas surveiller `/var/log/myapp/myapp.conf`

* Utiliser `path: /var/log/myapp/*/*.log` :
  * Pour surveiller `/var/log/myapp/log/myfile.log`
  * Pour surveiller `/var/log/myapp/errorLog/myerrorfile.log`
  * Ne pas surveiller `/var/log/myapp/mylogfile.log`

Exemple de configuration :

```yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    exclude_paths:
      - /var/log/myapp/debug.log
      - /var/log/myapp/trace.log
    service: mywebapp
    source: go
```

L'exemple ci-dessus permet de surveiller `/var/log/myapp/log/myfile.log`, mais `/var/log/myapp/log/debug.log` et `/var/log/myapp/log/trace.log` seront toujours exclus.

**Remarque** : l'Agent nécessite les autorisations de lecture et d'exécution pour un répertoire afin d'énumérer tous les fichiers qui y figurent.

## Encoder des logs au format UTF-16

Si des logs d'applications sont rédigés au format UTF-16, depuis l'Agent Datadog **v6.23/v7.23**, les utilisateurs peuvent les encoder afin qu'ils soient parsés comme prévu dans le [Log Explorer][2]. Utilisez le paramètre `encoding` dans la section de configuration des logs. Définissez-le sur `utf-16-le` pour le format little-endian UTF16 et sur `utf-16-be` pour le format big-endian UTF16. Toutes les autres valeurs seront ignorées et l'Agent lira le fichier en assumant un format UTF8.

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

**Remarque** : le paramètre `encoding` est uniquement applicable lorsque le paramètre `type` est défini sur `file`.

## Règles globales de traitement

Depuis la version 6.10 de l'Agent Datadog, les règles de traitement `exclude_at_match`, `include_at_match` et `mask_sequences` peuvent être définies de façon globale dans le [fichier de configuration principal][3] de l'Agent, ou à l'aide d'une variable d'environnement :

{{< tabs >}}
{{% tab "Fichiers de configuration" %}}

Dans le fichier `datadog.yaml` : 

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_healthcheck
      pattern: healthcheck
    - type: mask_sequences
      name: mask_user_email
      pattern: \w+@datadoghq.com
      replace_placeholder: "EMAIL_MASQUÉ"
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

Utilisez la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` pour configurer les règles globales de traitement. Exemple :

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

Utilisez le paramètre `env` dans le chart Helm pour définir la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` afin de configurer les règles globales de traitement. Par exemple :

```yaml
env:
  - name: DD_LOGS_CONFIG_PROCESSING_RULES
    value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Ces règles globales de traitement s'appliquent à tous les logs recueillis par l'Agent Datadog.

**Remarque** : l'Agent Datadog n'initie pas le processus de collecte de logs en cas de problème de format dans les règles globales de traitement. Exécutez la [sous-commande status][4] pour diagnostiquer les éventuels problèmes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.


[1]: /fr/agent/faq/commonly-used-log-processing-rules
[2]: https://docs.datadoghq.com/fr/logs/explorer/#overview
[3]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: /fr/agent/guide/agent-commands/#agent-information