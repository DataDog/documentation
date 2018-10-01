---
title: Collecte de logs & Intégrations
kind: Documentation
description: >-
  Configurez votre Agent Datadog pour rassembler les logs de votre hôte, de vos
  conteneurs et de vos services.
aliases:
  - /fr/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /fr/logs/languages
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/live_tail
    tag: Documentation
    text: Fonctionnalité Live Tail de Datadog
  - link: logs/explorer
    tag: Documentation
    text: Apprenez à explorer vos logs
  - link: logs/logging_without_limits
    tag: Documentation
    text: Collecter des logs sans limites
---
## Commencer avec l'Agent

La collecte de logs nécessite une version de l'agent >= 6.0. Les anciennes versions de l'agent n'incluent pas l'interface `Log collection` qui est utilisée pour la collecte de logs.

Si vous ne l'utilisez pas déjà, veuillez suivre [les instructions d'installation de l'Agent][1].

La collecte des logs est **désactivée** par défaut dans l'Agent Datadog, vous devez l'activer dans `datadog.yaml`:

```
logs_enabled: true
```

L'Agent Datadog envoie ses logs à Datadog via TLS-encrypted TCP. Cela nécessite une communication sortante sur le port `10516`.

## Activation de la collecte de logs à partir d'intégrations
Pour commencer à collecter des logs pour une intégration donnée, supprimez la mise en commentaire de la section logs du fichier yaml de cette intégration et configurez-la pour votre environnement.

<div class="alert alert-warning">
Toutes les intégrations n'incluent pas les configurations pour la collecte de logs.  <a href="https://docs.datadoghq.com/integrations/#cat-log-collection">Consultez la liste actuelle des intégrations prenant en charge la collecte de logs.</a>.
</div>

Si une intégration ne prend pas en charge les logs par défaut, utilisez la configuration de fichier personnalisée ci-dessous.

## Collecte de logs custom

Datadog Agent v6 peut collecter des logs à partir de fichiers ou du réseau (TCP ou UDP) et les transférer vers Datadog. Pour le configurer, créez un nouveau répertoire et un fichier yaml nommé d'après votre source de log dans le répertoire **conf.d** de l'Agent (`conf.d/python.d/conf.yaml` pour les logs pythons, ...)  et définissez ces options:

* `type` : (obligatoire) type de la source d'entrée des logs (**tcp** / **udp** / **file**)
* `port` / `path` : (obligatoire) mettez `port` si `type` est **tcp** ou **udp**. mettez `path` si `type` est **file**.
* `service` : (obligatoire) nom du service propriétaire des logs
* `source` : (obligatoire) attribut qui définit l'intégration qui envoie les logs. "Si les logs ne proviennent pas d'une intégration existante, ce champ peut inclure un nom source personnalisé, mais nous vous recommandons de faire correspondre cette valeur au nommage du nom de toutes les [métriques custom][2] que vous collectez, par exemple `myapp` de` myapp.request.count`) "
* `sourcecategory`: (optionnel) Attribut à valeurs multiples. Peut être utilisé pour affiner l'attribut source. Exemple: source: mongodb, sourcecategory: db_slow_logs.
* `tags`: (optionnel) ajouter des tags à chaque log collecté.

## Tail les fichiers existants
Définissez `type` sur **file**, puis indiquez le `path` du fichier de log que vous voulez tail.

Exemple:
Pour collected les logs d'une application python stockés dans **/var/log/myapp1.log** et **/var/log/python.log** créez un fichier `python.d/conf.yaml` comme suit:

```yaml
##Log section
logs:

  - type: file
    path: /var/log/myapp1.log
    service: myapp1
    source: python
    sourcecategory: sourcecode
    tags: env:prod

  - type: file
    path: /var/log/python.log
    service: myapplication
    source: python
    sourcecategory: sourcecode
```
* [Redémarrez votre Agent][3]


**Note** : Si vous utilisez l'Agent Windows v6 et le suivi de fichiers de logs - assurez-vous que ces fichiers ont un encodage UTF8.

## Envoyer des logs via TCP/UDP
Définissez `type` sur **tcp** ou **udp** en fonction de votre protocole, puis spécifiez le `port` de votre connexion entrante.

Exemple:
Si votre application PHP ne se connecte pas à un fichier, mais transmet ses logs via TCP, créez un fichier de configuration qui spécifie le port à recevoir comme dans l'exemple ci-dessous:

```yaml

##Log section
logs:
  - type: tcp
    port: 10518
    service: webapp
    source: php
    sourcecategory: front

```
* [Redémarrez votre Agent][3]

L'Agent prend en charge des logs contenant des chaines de caractères brutes ou formatées en JSON ou Syslog. Si vous envoyez plusieurs logs d'un coup, utilisez le caractère de séparation de ligne pour séparer vos logs.

## Fonctions avancées de collecte de logs

### Filtrer les logs

Tous les logs ne sont pas égaux et vous pouvez envoyer uniquement un sous-ensemble spécifique de logs à Datadog.
Pour ce faire, utilisez le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **exclude_at_match** or **include_at_match**

* **exclude_at_match**: Si le pattern est contenu dans le message, le logs est exclu et n'est pas envoyé à Datadog.
  Exemple: Filtrage des logs contenant un e-mail Datadog

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

* **include_at_match**: Seuls les logs contenant un message incluant le pattern est envoyé à Datadog.
  Exemple: Envoie des logs contenant seulement un e-mail Datadog

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

**Note**: Si vous configurez plusieurs règles de processing, elles seront appliquées de façon séquentielle.
Chaque règle s'appliquera sur le résultat de la précédente.

### Scruber les données sensibles dans vos logs

Si vos logs contiennent des informations sensibles que vous souhaitez supprimer, configurez l'agent Datadog pour parcourir les séquences sensibles en utilisant le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **mask_sequences**.

Cela remplace tous les groupes correspondants par la valeur du paramètre `replace_placeholder`.
Exemple: Remplacer des numéros de cartes de crédit

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

### Agrégation multiligne

Si vos logs ne sont pas envoyés en JSON et que vous souhaitez regrouper plusieurs lignes en une seule entrée, configurez l'Agent Datadog pour détecter un nouveau logs à l'aide d'un pattern d'expression régulière spécifique au lieu d'avoir un logs par ligne.

Ceci est accompli en utilisant le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **multi_line**.

Cela agrège toutes les lignes en une seule entrée jusqu'à ce que le pattern donné soit à nouveau détecté. Ceci est particulièrement utile pour les logs de base de données et les stacktraces.
Exemple: Chaque ligne de logs java commence par un timestamp avec le format `yyyy-dd-mm`. Les lignes ci-dessous, y compris une stack trace, seront envoyées sous la forme de deux logs.

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz

```

Pour ce faire, vous devez utiliser les `log_processing_rules` suivantes:

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

Plus d'exemples:

| **Chaîne brute**           | **Pattern**                                |
| :---                     | :----                                      |
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                        |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                      |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}` |
| 20180228                 | `\d{8}`                                    |

### Suivez plusieurs répertoires ou un répertoire entier en utilisant des wildcards

Si vos logs sont étiquetés par date ou tous stockés dans le même répertoire, configurez votre agent Datadog pour les monitorer tous en même temps et en détecter automatiquement de nouveaux en utilisant des wildcards dans l'attribut `path`.

* Utiliser `path: /var/log/myapp/*.log`:
  * Correspond à tous les fichiers `.log` dans le dossier: `/var/log/myapp/`. 
  * Ne correspond pas à `/var/log/myapp/myapp.conf`.

* Utiliser `path: /var/log/myapp/*/*.log`:
  * Correspond à `/var/log/myapp/log/myfile.log`.
  * Correspond à `/var/log/myapp/errorLog/myerrorfile.log` 
  * Ne correspond pas à `/var/log/myapp/mylogfile.log`.

Exemple de configuration:

```yaml

logs:
 - type: file
   path: /var/log/myapp/*.log
   service: mywebapp
   source: go
```

**Note**: l'Agent requiert l'autorisation de lecture et d'exécution (5) sur le répertoire pour pouvoir lister tous les fichiers disponibles.

### Utilisation d'un proxy pour les logs

Les logs utilisent un ensemble de paramètres proxy différent des autres types de données transmises par l'Agent Datadog. Ceci est dû au fait que les logs sont actuellement envoyé via TCP/SSL, tandis que les autres fonctionnalités soumettent leurs données via HTTPS.

Pour configurer votre Agent Datadog pour envoyer des logs via un serveur proxy, ajoutez ces paramètres au fichier de configuration `datadog.yaml` :"

```
logs_config:
  dd_url: <MY_PROXY_URL>
  dd_port: <MY_PROXY_PORT>
  dev_mode_no_ssl: true
```

Configurez ensuite votre proxy pour transférer les logs à l'endpoint `agent-intake.logs.datadoghq.com` sur le port `10516` avec SSL activé. 

[Reportez-vous à notre page de documentation sur les proxy avec l'Agent pour découvrir comment envoyer vos métriques avec un proxy][8].

## Comment tirer le meilleur parti de vos logs

Lors du logging des stack traces, il existe des attributs spécifiques dotés d'une interface utilisateur dédiée dans votre application Datadog, tels que le nom du logger, le thread en cours, le type d'erreur et bien sûr la stack trace.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Stack trace" responsive="true" >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants:

* `logger.name`: Nom du logger
* `logger.thread_name`: Nom du thread courrant
* `error.stack`: La stack trace
* `error.message`: Message d'erreur contenu dans la stack trace
* `error.kind`: Le type ou "kind" d'une erreur (i.e "Exception", "OSError", ...)

**Note**: Par défaut, les pipelines d'intégration tentent de remapper les paramètres par défaut de la bibliothèque de logging sur ces attributs spécifiques et analysent les traces ou traceback pour extraire automatiquement les erreurs `error.message` et `error.kind`.

## Envoyez vos logs en JSON

Pour les frameworks d'intégration, nous fournissons des instructions sur la façon de logger en JSON dans un fichier. Les logs au format JSON permettent de mieux gérer les logs d'application multilignes et sont automatiquement analysés par Datadog.

##### L'avantage de la collecte de logs au format JSON

Datadog analyse automatiquement les logs au format JSON. Pour cette raison, lorsque vous contrôlez le format des logs que vous envoyez à Datadog, nous vous encourageons à les formater en JSON pour éviter d'avoir à utiliser des règles de parsing sur la plateforme.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /developers/metrics/custom_metrics
[3]: /agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: /logs/processing/#log-date-remapper
[5]: /logs/explorer/?tab=logstream#visualization
[6]: /logs/explorer/search/
[7]: /logs/processing/#log-status-remapper
[8]: /agent/proxy
