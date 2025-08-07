---
algolia:
  tags:
  - advanced log filter
description: Utiliser l'Agent Datadog pour recueillir vos logs et les envoyer à Datadog
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: Documentation
  text: Démarrer avec Logging without LimitsTM
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
  text: Fonctionnalité Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail » (suivi)
title: Configurations avancées pour la collecte de logs
---

Après avoir configuré [la collecte de logs][1], vous pouvez personnaliser la configuration de votre collection :
- [Filtrer les logs](#filtrer-les-logs)
  - [Exclusion par correspondance](#exclusion-par-correspondance)
  - [Inclusion par correspondance](#Inclusion-par-correspondance)
- [Nettoyer les données sensibles de vos logs](#nettoyer-les-donnees-sensibles-de-vos-logs)
- [Agrégation multilignes](#manually-aggregate-multi-line-logs)
- [Agréger automatiquement les logs multilignes](#agreger-automatiquement-les-logs-multi-lignes)
- [Règles de traitement des logs couramment utilisées] (#regles-de-traitement-des-logs-couramment-utilisees)
- [Suivre des répertoires avec des wildcards](#surveiller-des-repertoires-avec-des-wildcards)
  - [Suivre en priorité les fichiers récemment modifiés](#suivre-en-priorité-les-fichiers-recemment-modifies)
- [Encodages des fichiers de log](#encodages-des-fichiers-de-log)
- [Règles globales de traitement](#regles-globales-de-traitement)
- [Pour aller plus loin](#pour-aller-plus-loin)

Pour appliquer une règle de traitement à tous les logs recueillis par un Agent Datadog, consultez la section [Règles globales de traitement](#regles-globales-de-traitement).

**Remarques** :
- Si vous configurez plusieurs règles de traitement, celles-ci sont appliquées de façon séquentielle et chaque règle est appliquée au résultat de la précédente.
- Les expressions des règles de traitement doivent respecter la [syntaxe des expressions régulières Golang][1].
- Le paramètre `log_processing_rules` est utilisé dans les configurations dʼintégration pour personnaliser votre configuration de collecte de logs. Dans la [configuration principale][5] de lʼAgent, le paramètre `processing_rules` est utilisé pour définir les règles globales de traitement.

## Filtrer les logs

Pour envoyer uniquement un sous-ensemble spécifique de logs à Datadog, utilisez le paramètre `log_processing_rules` dans votre fichier de configuration avec le type `exclude_at_match` ou `include_at_match`.

### Exclude at match

| Paramètre          | Rôle                                                                                        |
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

<div class="alert alert-info">
Pour plus d'informations sur la configuration de l'Agent, consultez <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Gestion de la détection de conteneurs</a>.
</div>

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre **conteneur envoyant les logs à filtrer** afin de spécifier les `log_processing_rules`, par exemple :

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

**Remarque** : échappez les caractères regex dans vos expressions lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.

**Remarque** : la valeur de l'étiquette doit respecter la syntaxe JSON. Ainsi, vous devez éviter toute virgule finale ou tout commentaire.

{{% /tab %}}
{{% tab "Kubernetes" %}}

<div class="alert alert-info">
Pour plus d'informations sur la configuration de l'Agent, consultez <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Gestion de la détection de conteneurs</a>.
</div>

Pour configurer la collecte des logs d'un conteneur donné (nommé `CONTAINER_NAME`) dans votre pod à l'aide d'Autodiscovery, ajoutez les annotations suivantes à la propriété `log_processing_rules` de votre pod :

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

**Remarque** : échappez les caractères regex dans vos expressions lorsque vous utilisez des annotations. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.

**Remarque** : la valeur de l'annotation doit respecter la syntaxe JSON. Ainsi, vous devez éviter toute virgule finale ou tout commentaire.

{{% /tab %}}
{{< /tabs >}}

### Include at match

| Paramètre          | Rôle                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Seuls les logs avec un message qui contient l'expression spécifiée sont envoyés à Datadog. Si plusieurs règles `include_at_match` sont définies, toutes les expressions doivent être présentes dans le log pour que ce dernier soit inclus. |


Par exemple, utilisez la configuration `log_processing_rules` suivante pour **inclure** les logs qui contiennent une adresse électronique Datadog :

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

Si vous souhaitez rechercher une ou plusieurs expressions, vous devez les définir dans une seule expression :

```yaml
logs:
  - type: file
    path: /mon/fichier/test.log
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
    path: /mon/fichier/test.log
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

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur envoyant les logs à filtrer, afin de spécifier les `log_processing_rules`, par exemple :

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

**Remarque** : échappez les caractères regex dans vos expressions lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.

**Remarque** : la valeur de l'étiquette doit respecter la syntaxe JSON. Ainsi, vous devez éviter toute virgule finale ou tout commentaire.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour indiquer les `log_processing_rules`. Par exemple :

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

**Remarque** : échappez les caractères regex dans vos expressions lorsque vous utilisez des annotations. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.

**Remarque** : la valeur de l'annotation doit respecter la syntaxe JSON. Ainsi, vous devez éviter toute virgule finale ou tout commentaire.

{{% /tab %}}
{{< /tabs >}}

## Nettoyer les données sensibles de vos logs

Si vos logs contiennent des informations confidentielles que vous souhaitez censurer, configurez l'Agent Datadog pour nettoyer les séquences sensibles en utilisant le paramètre `log_processing_rules` dans votre fichier de configuration avec le type `mask_sequences`.

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

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour indiquer les `log_processing_rules`. Par exemple :

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

**Remarque** : échappez les caractères regex dans vos expressions lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.

**Remarque** : la valeur de l'étiquette doit respecter la syntaxe JSON. Ainsi, vous devez éviter toute virgule finale ou tout commentaire.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour indiquer les `log_processing_rules`. Par exemple :

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

**Remarque** : échappez les caractères regex dans vos expressions lorsque vous utilisez des annotations. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.

**Remarque** : la valeur de l'annotation doit respecter la syntaxe JSON. Ainsi, vous devez éviter toute virgule finale ou tout commentaire.

{{% /tab %}}
{{< /tabs >}}

À partir des versions 7.17+ de l'Agent, la chaîne `replace_placeholder` peut développer les références à des groupes de capture telles que `$1`, `$2`, etc. Pour faire en sorte qu'une chaîne suive le groupe de capture sans aucune espace entre les deux, utilisez le format `${<NUMÉRO_GROUPE>}`.

Par exemple, pour supprimer les informations personnelles du log `User email: foo.bar@example.com`, utilisez :

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

Le log suivant est alors envoyé à Datadog : `User email: masked_user@example.com`

## Agrégation automatique des logs multilignes

La détection automatique des logs multilignes est utile lorsque vous avez de nombreuses sources de logs avec des formats complexes ou lorsque vous n'avez pas le temps de configurer chaque source manuellement. Cette fonctionnalité détecte et regroupe automatiquement les logs multi-lignes sans nécessiter de motifs regex personnalisés.

Consultez la documentation [Auto Multi-line Detection and Aggregation][7] (en anglais).

Pour la prise en charge héritée de cette fonctionnalité, consultez la documentation [Automatic Multi-line Detection and Aggregation (Legacy)][8] (en anglais).

## Agrégation manuelle des logs multilignes

Les règles d'agrégation manuelle vous permettent de contrôler avec précision le regroupement des logs si vous connaissez le format de vos logs. Cette méthode est idéale pour garantir un traitement cohérent à l'aide de motifs regex personnalisés adaptés à votre structure de log.

Si vos logs ne sont pas envoyés au format JSON et que vous souhaitez agréger plusieurs lignes en une seule entrée, configurez l'Agent Datadog de façon à détecter un nouveau log avec une expression régulière spécifique, au lieu de compter un seul log par ligne. Utilisez le type `multi_line` dans le paramètre `log_processing_rules` pour agréger toutes les lignes en une seule entrée jusqu'à ce que l'expression indiquée soit à nouveau détectée.

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

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour indiquer les `log_processing_rules`. Par exemple :

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

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour indiquer les `log_processing_rules`. Par exemple :

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

**Remarque** : échappez les caractères regex dans vos expressions lorsque vous effectuez une agrégation multiligne avec des annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.

**Remarque** : la valeur de l'annotation doit respecter la syntaxe JSON. Ainsi, vous devez éviter toute virgule finale ou tout commentaire.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>Important</strong> : les motifs regex pour les logs multi-lignes doivent commencer au <em>début</em> d'une ligne de log. Aucun motif ne peut être apparié en milieu de ligne. <em>Un motif qui ne correspond jamais peut entraîner la perte de lignes de log.</em> <br><br>La collecte de logs fonctionne avec une précision allant jusqu'à la milliseconde. Les logs avec une précision supérieure ne sont pas envoyés, même s’ils correspondent au motif.</div>

Exemples supplémentaires :

| **Chaîne brute**           | **Pattern**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## Règles de traitement de log couramment utilisées

Consultez la section [FAQ sur les règles de traitement des logs couramment utilisées][4] pour obtenir une liste d'exemples.

## Suivre des répertoires à l'aide de wildcards

Si vos fichiers de log sont étiquetés par date ou tous stockés au sein d'un même répertoire, configurez votre Agent Datadog pour tous les surveiller et détecter automatiquement de nouveaux logs à l'aide de wildcards dans l'attribut `path`. Si vous souhaitez exclure les fichiers correspondant à un certain `path`, énumérez-les dans l'attribut `exclude_paths`.

* Utiliser `path: /var/log/myapp/*.log` :
  * Pour surveiller tous les fichiers `.log` dans le répertoire `/var/log/myapp/`
  * Ne pas surveiller `/var/log/myapp/myapp.conf`

* Utiliser `path: /var/log/myapp/*/*.log` :
  * Pour surveiller `/var/log/myapp/log/myfile.log`
  * Pour surveiller `/var/log/myapp/errorLog/myerrorfile.log`
  * Ne pas surveiller `/var/log/myapp/mylogfile.log`

Exemple de configuration pour Linux :

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

L'exemple ci-dessus permet de surveiller `/var/log/myapp/log/myfile.log` et d'exclure `/var/log/myapp/log/debug.log` et `/var/log/myapp/log/trace.log`.

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

**Remarque** : l'Agent nécessite les autorisations de lecture et d'exécution pour un répertoire afin d'énumérer tous les fichiers qui y figurent.

**Remarque** : Les valeurs `path` et `exclude_paths` sont sensibles à la casse.

### Suivre en priorité les fichiers les plus récemment modifiés

L'Agent limite le nombre de fichiers qu'il peut suivre simultanément, tel que défini par le paramètre `logs_config.open_files_limit`.
Par défaut, lorsque plus de fichiers correspondent au motif que cette limite, l'Agent les trie par ordre lexicographique inverse. Cela fonctionne bien pour les fichiers nommés avec des timestamps ou une numérotation séquentielle, car les logs les plus récents sont traités en priorité.

Cependant, si les noms de fichiers de log ne suivent pas de schéma clair, le comportement par défaut peut ne pas être optimal. Pour prioriser les fichiers selon leur date de modification, définissez le paramètre `logs_config.file_wildcard_selection_mode` sur `by_modification_time`. Avec ce réglage, l'Agent trie en continu les fichiers selon leur date de modification. Il suit toujours en priorité les fichiers les plus récemment modifiés et cesse de suivre les fichiers les moins récents si nécessaire.

Pour revenir au comportement par défaut, supprimez l'entrée `logs_config.file_wildcard_selection_mode` ou définissez-la sur `by_name`.

Cette fonctionnalité nécessite la version 7.40.0 ou une version ultérieure de l'Agent.

## Encodages de fichiers de log

Par défaut, l'Agent Datadog part du principe que les logs sont basés sur un encodage UTF-8. Si les logs de votre application utiliser un autre encodage, définissez le paramètre `encoding` dans la configuration de vos logs.

La liste suivante répertorie les valeurs d'encodage prises en charge. Si vous définissez une valeur non prise en charge, l'Agent l'ignore et lit le fichier comme s'il était encodé en UTF-8.
 * `utf-16-le` :  UTF-16 little-endian (Agent Datadog **v6.23/v7.23**)
 * `utf-16-be` : UTF-16 big-endian (Agent Datadog **v6.23/v7.23**)
 * `shift-jis` : Shift-JIS (Agent Datadog **v6.34/v7.34**)

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

Depuis la version 6.10 de l'Agent Datadog, les règles de traitement `exclude_at_match`, `include_at_match` et `mask_sequences` peuvent être définies de façon globale dans le [fichier de configuration principal][5] de l'Agent, ou à l'aide d'une variable d'environnement :

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
{{% tab "Operator Datadog" %}}

Utilisez le paramètre `spec.override.[key].env` dans le manifeste de l'Operator Datadog pour définir la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` et ainsi configurer les règles de traitement globales, `[key]` devant être défini sur `nodeAgent`, `clusterAgent` ou `clusterChecksRunner`. Par exemple :

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

Utilisez le paramètre `datadog.env` dans le chart Helm pour définir la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` et ainsi configurer les règles globales de traitement. Par exemple :

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Ces règles globales de traitement s'appliquent à tous les logs recueillis par l'Agent Datadog.

**Remarque** : l'Agent Datadog n'initie pas le processus de collecte de logs en cas de problème de format dans les règles globales de traitement. Lancez la [sous-commande status][6] pour diagnostiquer les éventuels problèmes.

## Agrégation multiligne log FAQ

**1. Quand dois-je utiliser des règles multilignes manuelles plutôt qu'une détection multiligne automatique ?

Si vous connaissez le format de vos log, vous devriez utiliser des règles multilignes manuelles pour un contrôle précis. 
Si vous envoyez beaucoup de logs multilignes et que vous n'êtes pas sûr de leur format ou que vous n'avez pas les moyens de configurer toutes les sources individuellement, vous devriez utiliser la détection multiligne automatique.

**2. Que se passe-t-il lorsqu'un motif à plusieurs lignes ne correspond à aucune logs?** ?

Toutes les lignes log non JSON sont traitées individuellement comme des entrées log distinctes.
Toutes les lignes log au format JSON sont traitées comme une seule ligne de log, et seul le premier format JSON valide entre dans l'entrée ; les autres sont abandonnés.

**3. Que se passe-t-il lorsqu'il existe à la fois des règles globales et des règles spécifiques à l'intégration ?
Les règles spécifiques à l'intégration remplacent complètement les règles globales pour l'intégration en question.

## Pour aller plus loin

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