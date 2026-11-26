---
algolia:
  tags:
  - advanced log filter
description: Utilisez le Datadog Agent pour recueillir vos logs et envoyez-les à Datadog
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: Documentation
  text: Bien démarrer avec Logging without Limits™
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentation
  text: Utilisez le Datadog Agent uniquement pour la Log Collection
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Découvrez comment traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/live_tail/
  tag: Documentation
  text: Fonctionnalité de suivi en temps réel de Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée de glossaire pour « suivi »
title: Configurations avancées de la Log Collection
---
Une fois la [Log Collection][1] configurée, vous pouvez personnaliser votre configuration de collecte :
- [Filtrer les logs](#filter-logs)
  - [Exclure en cas de correspondance](#exclude-at-match)
  - [Inclure lors d'une correspondance](#include-at-match)
  - [Exclure les logs tronqués](#exclude-truncated)
- [Masquer les données sensibles dans vos logs](#scrub-sensitive-data-from-your-logs)
- [Agrégation multiligne](#manually-aggregate-multi-line-logs)
- [Agréger automatiquement les logs multilignes](#automatically-aggregate-multi-line-logs)
- [Règles de traitement de logs courantes](#commonly-used-log-processing-rules)
- [Effectuer le suivi des répertoires à l'aide de caractères génériques](#tail-directories-using-wildcards)
  - [Prioriser les fichiers suivis selon leur date de modification](#prioritize-tailed-files-by-modification-time)
- [Encodages des fichiers de logs](#log-file-encodings)
- [Règles de traitement globales](#global-processing-rules)
- [Lectures complémentaires](#further-reading)

Pour appliquer une règle de traitement à tous les logs collectés par un Datadog Agent, consultez la section [Règles de traitement globales](#global-processing-rules).

**Remarques** :
- Si vous configurez plusieurs règles de traitement, elles sont appliquées séquentiellement et chaque règle est appliquée au résultat de la précédente.
- Les motifs des règles de traitement doivent être conformes à la [syntaxe regexp Golang][2].
- Le paramètre `log_processing_rules` est utilisé dans les configurations d'intégration pour personnaliser votre configuration de Log Collection. Dans la [configuration principale][5] de l'Agent, en revanche, le paramètre `processing_rules` est utilisé pour définir des règles de traitement globales.

## Filtrer les logs {#filter-logs}

Pour envoyer uniquement un sous-ensemble spécifique de logs à Datadog, utilisez le paramètre `log_processing_rules` dans votre fichier de configuration avec le type `exclude_at_match` ou `include_at_match`.

### Exclure en cas de correspondance {#exclude-at-match}

| Paramètre          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | Si le motif spécifié est contenu dans le message, le log est exclu et n'est pas envoyé à Datadog. |

Par exemple, pour **exclure** les logs qui contiennent une adresse e-mail Datadog, utilisez le `log_processing_rules` suivant :

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
Pour plus d'informations sur la configuration de l'Agent, consultez <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Container Discovery Management</a>.
</div>

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur le **conteneur envoyant les logs que vous souhaitez filtrer** afin de spécifier le `log_processing_rules`, par exemple :

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

**Note** :
- Échappez les caractères spéciaux des expressions régulières dans vos motifs lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'étiquette doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{% tab "CRD DatadogInstrumentation" %}}

Une fois la [configuration `DatadogInstrumentation`][10] terminée, appliquez la ressource suivante au Deployment `cardpayment` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: cardpayment-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cardpayment
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: java
        service: cardpayment
        log_processing_rules:
          - type: exclude_at_match
            name: exclude_datadoghq_users
            pattern: '\w+@datadoghq.com'
```

[10]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Annotations" %}}

<div class="alert alert-info">
Pour plus d'informations sur la configuration de l'Agent, consultez <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Container Discovery Management</a>.
</div>

Pour configurer Autodiscovery afin de collecter les logs d'un conteneur donné (portant le nom `CONTAINER_NAME`) au sein de votre pod, ajoutez les annotations suivantes au `log_processing_rules` de votre pod :

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

**Note** :
- Échappez les caractères spéciaux des expressions régulières dans vos motifs lorsque vous utilisez des annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'annotation doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{< /tabs >}}

### Inclure en cas de correspondance {#include-at-match}

| Paramètre          | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Seuls les logs dont le message inclut le motif spécifié sont envoyés à Datadog. Si plusieurs règles `include_at_match` sont définies, les motifs de toutes ces règles doivent correspondre pour que le log soit inclus. |


Par exemple, utilisez la configuration `log_processing_rules` suivante pour **inclure** les logs qui contiennent une adresse e-mail Datadog :

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

Si vous souhaitez faire correspondre un ou plusieurs motifs, vous devez les définir dans une seule expression :

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

Si les motifs sont trop longs pour tenir lisiblement sur une seule ligne, vous pouvez les diviser en plusieurs lignes :

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

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur le conteneur qui envoie les logs que vous souhaitez filtrer pour spécifier le `log_processing_rules`. Par exemple :

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

**Note** :
- Échappez les caractères spéciaux des expressions régulières dans vos motifs lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'étiquette doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{% tab "CRD DatadogInstrumentation" %}}

Une fois la [configuration `DatadogInstrumentation`][10] terminée, appliquez la ressource suivante au Deployment `cardpayment` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: cardpayment-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cardpayment
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: java
        service: cardpayment
        log_processing_rules:
          - type: include_at_match
            name: include_datadoghq_users
            pattern: '\w+@datadoghq.com'
```

[10]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Annotations" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour spécifier le `log_processing_rules`. Par exemple :

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

**Note** :
- Échappez les caractères spéciaux des expressions régulières dans vos motifs lorsque vous utilisez des annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'annotation doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{< /tabs >}}

### Exclure les logs tronqués {#exclude-truncated}

| Paramètre           | Description                                                        |
|---------------------|--------------------------------------------------------------------|
| `exclude_truncated` | Lorsqu'il est présent, il exclut les logs tronqués et ne les envoie pas à Datadog. La règle `exclude_truncated` est disponible à partir de l'Agent v7.69. |

Par exemple, pour **exclure** les logs tronqués :

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

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur le conteneur qui envoie les logs que vous souhaitez filtrer pour spécifier le `log_processing_rules`. Par exemple :

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

**Remarque** : La valeur de l'étiquette doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{% tab "CRD DatadogInstrumentation" %}}

Une fois la [configuration `DatadogInstrumentation`][10] terminée, appliquez la ressource suivante au Deployment `cardpayment` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: cardpayment-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cardpayment
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: java
        service: cardpayment
        log_processing_rules:
          - type: exclude_truncated
```

[10]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Annotations" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour spécifier le `log_processing_rules`. Par exemple :

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

**Remarque** : La valeur de l'annotation doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{< /tabs >}}

## Masquer les données sensibles dans vos logs {#scrub-sensitive-data-from-your-logs}

Si vos logs contiennent des informations sensibles qui doivent être masquées, configurez le Datadog Agent pour masquer les séquences sensibles en utilisant le paramètre `log_processing_rules` dans votre fichier de configuration avec le type `mask_sequences`.

Cela remplace tous les groupes correspondants par la valeur du paramètre `replace_placeholder`.

Par exemple, pour masquer les numéros de carte de crédit :

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

Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour spécifier le `log_processing_rules`. Par exemple :

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

**Note** :
- Échappez les caractères spéciaux des expressions régulières dans vos motifs lorsque vous utilisez des étiquettes. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'étiquette doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{% tab "CRD DatadogInstrumentation" %}}

Une fois la [configuration de `DatadogInstrumentation`][10] terminée, appliquez la ressource suivante au Deployment `cardpayment` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: cardpayment-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cardpayment
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: java
        service: cardpayment
        log_processing_rules:
          - type: mask_sequences
            name: mask_credit_cards
            replace_placeholder: "[masked_credit_card]"
            pattern: '(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})'
```

[10]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Annotations" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour spécifier le `log_processing_rules`. Par exemple :

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

**Note** :
- Échappez les caractères spéciaux des expressions régulières dans vos modèles lorsque vous utilisez des annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'annotation doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{< /tabs >}}

Avec la version 7.17+ de l'Agent, la chaîne `replace_placeholder` peut développer des références vers des groupes de capture tels que `$1`, `$2`, etc. Si vous souhaitez qu'une chaîne suive le groupe de capture sans espace entre les deux, utilisez le format `${<GROUP_NUMBER>}`.

Par exemple, pour masquer les informations utilisateur dans le log `User email: foo.bar@example.com`, utilisez :

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

Cela envoie le log suivant à Datadog : `User email: masked_user@example.com`

## Agréguez automatiquement les logs multilignes {#automatically-aggregate-multi-line-logs}

La détection automatique multiligne est utile lorsque vous avez de nombreuses sources de logs avec des formats complexes ou lorsque vous n'avez pas le temps de configurer chaque source individuellement. Cette fonctionnalité détecte et agrège automatiquement les logs multilignes sans que vous ayez à écrire de modèles regex personnalisés.

Consultez la documentation [Auto Multi-line Detection and Aggregation][7].

Pour la prise en charge héritée de la fonctionnalité, consultez la documentation [Automatic Multi-line Detection and Aggregation (Legacy)][8].

## Agréguez manuellement les logs multilignes {#manually-aggregate-multi-line-logs}

Les règles multilignes manuelles vous offrent un contrôle précis sur l'agrégation des logs lorsque vous connaissez vos formats de logs. Cette approche est idéale pour garantir un traitement cohérent des logs avec des modèles regex personnalisés adaptés à votre structure de log spécifique.

Si vos logs ne sont pas envoyés au format JSON et que vous souhaitez agréger plusieurs lignes en une seule entrée, configurez le Datadog Agent pour détecter un nouveau log à l'aide d'un modèle regex spécifique au lieu d'avoir un log par ligne. Utilisez le type `multi_line` dans le paramètre `log_processing_rules` pour agréger toutes les lignes en une seule entrée jusqu'à ce que le modèle donné soit détecté à nouveau.

Par exemple, chaque ligne de log Java commence par un horodatage au format `yyyy-dd-mm`. Ces lignes incluent une trace de pile qui peut être envoyée sous forme de deux logs :

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Pour envoyer les exemples de logs ci-dessus avec un fichier de configuration, utilisez le `log_processing_rules` suivant :

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

Dans un environnement Docker, utilisez le label `com.datadoghq.ad.logs` sur votre conteneur pour spécifier le `log_processing_rules`. Par exemple :

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
{{% tab "CRD DatadogInstrumentation" %}}

Une fois la [configuration de `DatadogInstrumentation`][10] terminée, appliquez la ressource suivante au déploiement `postgres` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: postgres-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: postgres
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: postgresql
        service: database
        log_processing_rules:
          - type: multi_line
            name: log_start_with_date
            pattern: '\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])'
```

[10]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Annotations" %}}

Dans un environnement Kubernetes, utilisez l'annotation de pod `ad.datadoghq.com` sur votre pod pour spécifier le `log_processing_rules`. Par exemple :

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

**Note** :
- Échappez les caractères spéciaux des expressions régulières dans vos modèles lorsque vous effectuez une agrégation multiligne avec des annotations de pod. Par exemple, `\d` devient `\\d`, `\w` devient `\\w`.
- La valeur de l'annotation doit respecter la syntaxe JSON, ce qui signifie que vous ne devez inclure aucune virgule finale ni aucun commentaire.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>Important !</strong> Les modèles regex pour les logs multilignes doivent commencer au <em>début</em> d'un log. Les modèles ne peuvent pas correspondre au milieu d'une ligne. <em>Un modèle qui ne correspond jamais peut entraîner la perte de lignes de log.</em> <br><br>La collecte des logs fonctionne avec une précision allant jusqu'à la milliseconde. Les logs dont la précision est supérieure ne sont pas envoyés, même s'ils correspondent au modèle.</div>

Plus d'exemples :

| **Chaîne brute**           | **Modèle**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## Règles de traitement des logs couramment utilisées {#commonly-used-log-processing-rules}

Consultez la [FAQ sur les règles de traitement des logs couramment utilisées][4] pour voir une liste d'exemples.

## Effectuez le suivi des répertoires à l'aide de caractères génériques {#tail-directories-using-wildcards}

Si vos fichiers de log sont étiquetés par date ou tous stockés dans le même répertoire, configurez votre Datadog Agent pour les surveiller tous et détecter automatiquement les nouveaux à l'aide de caractères génériques dans l'attribut `path`. Si vous souhaitez exclure certains fichiers correspondant au `path` choisi, listez-les dans l'attribut `exclude_paths`.

* L'utilisation de `path: /var/log/myapp/*.log` :
  * Correspond à tous les fichiers `.log` contenus dans le répertoire `/var/log/myapp/`.
  * Ne correspond pas à `/var/log/myapp/myapp.conf`.

* L'utilisation de `path: /var/log/myapp/*/*.log` :
  * Correspond à `/var/log/myapp/log/myfile.log`.
  * Correspond à `/var/log/myapp/errorLog/myerrorfile.log`
  * Ne correspond pas à `/var/log/myapp/mylogfile.log`.

Exemple de configuration pour Linux :

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

Exemple de configuration pour Windows :

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

**Note** :
- L'Agent nécessite des autorisations de lecture et d'exécution sur un répertoire pour lister tous les fichiers disponibles qu'il contient.
- Les valeurs path et exclude_paths sont sensibles à la casse.
- À partir de la version 7.76.0 de l'Agent, les globs récursifs (`**`) sont pris en charge dans `path` et `exclude_paths` lorsque vous définissez `logs_config.enable_recursive_glob: true` dans `datadog.yaml`. Cette fonctionnalité est désactivée par défaut.

### Prioriser les fichiers suivis selon leur date de modification {#prioritize-tailed-files-by-modification-time}

Cette fonctionnalité nécessite l'Agent version 7.40.0 ou ultérieure.

L'Agent limite le nombre de fichiers qu'il peut suivre simultanément avec le paramètre `logs_config.open_files_limit`. Si le nombre de fichiers correspondant à vos sources de logs configurées (telles que les caractères génériques) ne dépasse pas la limite, l'Agent les suit tous. Si plus de fichiers correspondent que la limite ne le permet, l'Agent établit des priorités en triant les noms de fichiers par ordre lexicographique inverse, de sorte que les fichiers avec des horodatages plus récents ou des numéros plus élevés soient suivis en premier.

Si les noms de fichiers ne suivent pas de modèles séquentiels ou horodatés, l'ordre par défaut peut ne pas être idéal. Pour donner plutôt la priorité aux fichiers selon leur date de modification, définissez `logs_config.file_wildcard_selection_mode` sur `by_modification_time`. Avec ce paramètre, l'Agent suit les fichiers modifiés le plus récemment en premier.

**Exemple** :
- `open_files_limit` = 500
- Votre modèle de caractère générique correspond à 700 fichiers.
- Avec `by_name` : l'Agent suit les 500 fichiers avec les noms les plus élevés par ordre lexicographique inverse (par exemple, app.log.700 à app.log.201).
- Avec `by_modification_time` : l'Agent suit les 500 fichiers sur lesquels une écriture a été effectuée le plus récemment, indépendamment de leurs noms.

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

Pour restaurer le comportement par défaut, supprimez l'entrée `logs_config.file_wildcard_selection_mode` ou définissez-la explicitement sur `by_name`.

## Encodages des fichiers de log {#log-file-encodings}

Par défaut, le Datadog Agent suppose que les logs utilisent l'encodage UTF-8. Si vos logs d'application utilisent un encodage différent, spécifiez le paramètre `encoding` dans la configuration des logs.

La liste ci-dessous indique les valeurs d'encodage prises en charge. Si vous fournissez une valeur non prise en charge, l'Agent ignore la valeur et lit le fichier en tant qu'UTF-8.
 * `utf-16-le` - UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Datadog Agent **v6.34/v7.34**)

<div class="alert alert-warning">Si vous modifiez le <code>encoding</code> d'un fichier que l'Agent <em>suit déjà</em>, cela peut produire des caractères corrompus (mojibake). L'Agent reprend à partir du décalage d'octet précédent, qui peut ne pas s'aligner sur les limites de caractères après un changement d'encodage. Pour corriger cela, effectuez une rotation du fichier de log, remplacez-le ou redémarrez le suivi depuis le début d'un fichier qui utilise le nouvel encodage. Ces actions aident l'Agent à démarrer avec le bon encodage.</div>

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

**Note** : le paramètre `encoding` n'est applicable que lorsque le paramètre `type` est défini sur `file`.

## Règles globales de traitement {#global-processing-rules}

Pour le Datadog Agent v6.10+, les règles de traitement `exclude_at_match`, `include_at_match` et `mask_sequences` peuvent être définies globalement dans le [fichier de configuration principal][5] de l'Agent ou via une variable d'environnement. La règle `exclude_truncated` est disponible à partir de l'Agent v7.69.

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
      replace_placeholder: "MASKED_EMAIL"
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

Utilisez la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` pour configurer des règles globales de traitement, par exemple :

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Utilisez le paramètre `spec.override.[key].env` dans votre manifeste Datadog Operator pour définir la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` afin de configurer des règles globales de traitement, où `[key]` est `nodeAgent`, `clusterAgent` ou `clusterChecksRunner`. Par exemple :

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

Utilisez le paramètre `datadog.env` dans le chart Helm pour définir la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` afin de configurer des règles globales de traitement. Par exemple :

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Tous les logs collectés par le Datadog Agent sont impactés par les règles globales de traitement.

**Note** : Le Datadog Agent ne démarre pas le collecteur de logs s'il existe un problème de format dans les règles globales de traitement. Exécutez la [sous-commande status][6] de l'Agent pour résoudre tout problème.

## FAQ sur l'agrégation de logs multiligne {#multi-line-log-aggregation-faq}

**1. Quand devez-vous utiliser des règles multiligne manuelles plutôt que la détection multiligne automatique ?**

Si vous connaissez le format de vos logs, vous devez utiliser des règles multiligne manuelles pour un contrôle précis.
Si vous envoyez un grand nombre de logs multiligne et que vous n'êtes pas sûr de leur format ou que vous n'avez pas les moyens de configurer toutes les sources individuellement, vous devez utiliser la détection multiligne automatique.

**2. Que se passe-t-il lorsqu'un modèle multiligne ne correspond à aucun log ?**

Toutes les lignes de logs non-JSON sont traitées individuellement en tant qu'entrées de logs distinctes.
Toutes les lignes de logs au format JSON sont traitées comme une seule ligne de logs, et seul le premier log au format JSON valide est transmis au système d'ingestion ; les autres sont ignorés.

**3. Que se passe-t-il lorsqu'il existe à la fois des règles globales et des règles spécifiques à une intégration ?**
Les règles spécifiques à une intégration remplacent complètement les règles globales pour cette intégration particulière.

## Pour aller plus loin {#further-reading}

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