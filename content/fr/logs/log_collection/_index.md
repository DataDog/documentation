---
title: Collecte de logs et intégrations
kind: Documentation
description: 'Configurez votre Agent Datadog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
aliases:
  - /fr/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /fr/logs/languages
  - /fr/integrations/windows_event_log/
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
    text: Découvrir comment explorer vos logs
  - link: logs/logging_without_limits
    tag: Documentation
    text: Collecte illimitée de logs
---
## Débuter avec l'Agent

La collecte de logs nécessite la version >= 6.0. Les anciennes versions de l'Agent n'incluent pas l'interface `Log collection`.

Si vous n'utilisez pas encore l'Agent, suivez les [instructions d'installation de l'Agent][1].

La collecte des logs est **désactivée** par défaut dans l'agent Datadog. Vous devez l'activer dans `datadog.yaml` :

```
logs_enabled: true
```

L'Agent Datadog envoie ses logs à Datadog via le protocole TCP chiffré par TLS. Cela nécessite une communication sortante sur le port `10516`.

## Activation de la collecte de logs à partir d'intégrations

Pour commencer à recueillir des logs pour une intégration donnée, supprimez la mise en commentaire de la section logs du fichier yaml de cette intégration et configurez-la pour votre environnement.

<div class="alert alert-warning">
Les intégrations ne comprennent pas toutes des configurations de log par défaut. <a href="/integrations/#cat-log-collection">Consultez la liste actuelle des intégrations prises en charge disponibles</a>.
</div>

Si une intégration ne prend pas en charge les logs par défaut, utilisez la configuration de fichier personnalisée ci-dessous.

## Collecte de logs personnalisée

L'Agent Datadog v6 peut recueillir des logs et les transférer à Datadog à partir des fichiers, du réseau (TCP ou UDP), de journald et des canaux Windows :

1. Créez un dossier dans le répertoire `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] qui porte le nom de la source de votre log.
2. Créez un fichier `conf.yaml` dans ce nouveau dossier.
3. Ajoutez un groupe de configuration de collecte de logs personnalisée avec les paramètres ci-dessous.
4. [Redémarrez votre Agent][3] pour prendre en compte cette nouvelle configuration.
5. [Lancez la sous-commande status de l'Agent][4] pour vérifier si votre configuration personnalisée est correcte.

Voici des exemples de configuration de collecte de logs personnalisée ci-dessous :

{{< tabs >}}
{{% tab "Suivre des fichiers existants" %}}

Pour rassembler les logs de votre application `<NOM_APP>` stockés dans `<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log`, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```
logs:
  - type: file
    path: <CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log
    service: <NOM_APP>
    source: custom
```

**Remarque** : si vous utilisez Windows avec l'Agent v6 et que vous suivez des fichiers pour des logs, vérifiez que ces fichiers sont encodés en langage UTF8.


[1]: /fr/agent/faq/agent-configuration-files
{{% /tab %}}

{{% tab "Flux de logs de TCP/UDP" %}}

Pour rassembler les logs de votre application `<NOM_APP>` qui transfert ses logs via TCP sur le port **10518**, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```
logs:
  - type: tcp
    port: 10518
    service: <NOM_APP>
    source: custom
```

Si vous utilisez Serilog, vous disposez de l'option `Serilog.Sinks.Network` pour une connexion via UDP.

**Remarque** : l'Agent prend en charge les logs au format de chaîne brute, JSON et Syslog. Si vous envoyez des logs en lot, séparez vos logs par des caractères de saut de ligne.


[1]: /fr/agent/faq/agent-configuration-files
{{% /tab %}}
{{% tab "Flux de logs de journald" %}}

Pour rassembler les logs depuis journald, créez un fichier `journald.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consultez la documentation relative à l'[intégration de journald][2] pour en savoir plus sur la configuration des environnements conteneurisés et du filtrage des unités.




[1]: /fr/agent/faq/agent-configuration-files
[2]: /fr/integrations/journald
{{% /tab %}}
{{% tab "Événements Windows" %}}

Ajoutez manuellement les canaux (à partir desquels vous souhaitez envoyer des événements Windows à Datadog en tant que log) au fichier `conf.d/win32_event_log.d/conf.yaml` ou via le gestionnaire de l'Agent Datadog.

Pour consulter la liste des canaux, exécutez la commande suivante dans PowerShell :

```
Get-WinEvent -ListLog *
```

Pour connaître les canaux les plus actifs, exécutez la commande suivante dans PowerShell :

```
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Ajoutez ensuite les canaux de votre fichier de configuration `win32_event_log.d/conf.yaml` :

```
logs:
  - type: windows_event
    channel_path: <CANAL_1>
    source: <CANAL_1>
    service: myservice
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: <CANAL_2>
    source: <CANAL_2>
    service: myservice
    sourcecategory: windowsevent
```

Remplacez les paramètres `<CANAL_X>` par le nom du canal Windows pour lequel vous souhaitez recueillir des événements.
Définissez le même nom de canal pour le paramètre `source` correspondant afin de bénéficier de la [configuration de pipeline de traitement d'intégration automatique][1].

Pour terminer, [redémarrez l'Agent][2].


[1]: /fr/logs/processing/pipelines/#integration-pipelines
[2]: /fr/agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

Liste complète des paramètres disponibles pour la collecte de logs :

| Paramètre        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                         |
|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Oui      | Le type de source d'entrée de log. Valeurs autorisées : **tcp**, **udp**, **file**, **windows_event**, **docker** ou **journald**.                                                                                                                                                                                                                             |
| `port`           | Oui      | Si `type` est défini sur **tcp** ou **udp**, il s'agit du port sur lequel l'écoute de logs est effectuée.                                                                                                                                                                                                                                                                                           |
| `path`           | Oui      | Si `type` est défini sur **file** ou **journald**, il s'agit du chemin du fichier à partir duquel les logs sont regroupés.                                                                                                                                                                                                                                                                        |
| `channel_path`   | Oui      | Si `type` est défini sur **windows_event**, il s'agit de la liste des canaux d'événements Windows à partir desquels les logs sont recueillis.                                                                                                                                                                                                                                                                 |
| `service`        | Oui      | Le nom du service propriétaire du log. Si vous avez instrumenté votre service avec l'[APM Datadog][5], ce paramètre doit correspondre au même nom de service.                                                                                                                                                                                                                    |
| `source`         | Oui      | Un attribut qui définit l'intégration qui envoie les logs. Si les logs ne viennent pas d'une intégration existante, ce champ peut inclure le nom d'une source personnalisée. Cependant, nous vous recommandons d'associer cette valeur à l'espace de nommage des [métriques custom][6] recueillies, par exemple : `myapp` pour `myapp.request.count`. |
| `include_units`  | Non       | Si `type` est défini sur **journald**, il s'agit de la liste des unités journald spécifiques à inclure.                                                                                                                                                                                                                                                                              |
| `exclude_units`  | Non       | Si `type` est défini sur **journald**, il s'agit de la liste des unités journald spécifiques à exclure.                                                                                                                                                                                                                                                                              |
| `sourcecategory` | Non       | Un attribut à valeur multiple utilisé pour préciser l'attribut source, par exemple : `source:mongodb, sourcecategory:db_slow_logs`.                                                                                                                                                                                                                         |
| `tags`           | Non       | Ajoutez des tags à chaque log recueilli ([en savoir plus sur le tagging][7]).                                                                                                                                                                                                                                                                                    |

## Fonctions avancées de collecte de logs
### Filtrer les logs

Pour envoyer uniquement un sous-ensemble spécifique de logs à Datadog, utilisez le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **exclude_at_match** ou **include_at_match**.

{{< tabs >}}
{{% tab "exclude_at_match" %}}

| Paramètre          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | Si l'expression spécifiée est incluse dans le message, le log est exclu et n'est pas envoyé à Datadog. |

Par exemple, pour exclure les logs qui contiennent une adresse e-mail Datadog :

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## L'expression régulière peut varier
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "include_at_match" %}}

| Paramètre          | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Seuls les logs avec un message qui contient l'expression spécifiée sont envoyés à Datadog. |

Par exemple, pour envoyer uniquement les logs qui contiennent une adresse e-mail Datadog :

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## L'expression régulière peut varier
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous configurez plusieurs règles de traitement, celles-ci sont appliquées de façon séquentielle. Chaque règle est appliquée au résultat de la précédente.

### Nettoyer les données sensibles de vos logs

Si vos logs contiennent des informations sensibles que vous souhaitez effacer, configurez l'Agent Datadog pour nettoyer les séquences sensibles en utilisant le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **mask_sequences**.

Cette action remplace tous les groupes correspondants par la valeur du paramètre `replace_placeholder`.

Par exemple, pour effacer un numéro de carte bancaire :

```yaml
logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[numéro_carte_masqué]"
        ##Une expression qui contient des groupes d'enregistrement
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

### Agrégation multilignes

Si vos logs ne sont pas envoyés au format JSON et que vous souhaitez agréger plusieurs lignes en une seule entrée, configurez l'Agent Datadog pour détecter un nouveau log avec une expression régulière spécifique au lieu de compter un seul log par ligne. Pour ce faire, utilisez le paramètre `log_processing_rules` dans votre fichier de configuration avec le `type` **multi_line** qui agrège toutes les lignes en une seule entrée jusqu'à ce que l'expression indiquée soit à nouveau détectée.

Par exemple, chaque ligne de log Java commence avec un timestamp au format `aaaa-jj-mm`. Ces lignes comprennent une trace de pile qui peut être envoyée sous forme de deux logs :

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

Pour ce faire, vous devez utiliser les règles `log_processing_rules` suivantes :

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

Exemples supplémentaires :

| **Chaîne brute**           | **Expression**                                |
|--------------------------|--------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                        |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                      |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}` |
| 20180228                 | `\d{8}`                                    |

**Remarque** : les expressions régulières pour les logs multilignes doivent commencer au **début** d'un log. Les expressions ne peuvent pas être recherchées en milieu de ligne.

### Suivre plusieurs répertoires ou un répertoire entier à l'aide de wildcards

Si vos fichiers de log sont étiquetés par date ou tous stockés au sein d'un même répertoire, configurez votre Agent Datadog pour tous les surveiller et détecter automatiquement de nouveaux logs à l'aide de wildcards dans l'attribut `path`.

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
   service: mywebapp
   source: go
```

**Remarque** : l'Agent nécessite les autorisations de lecture et d'exécution pour un répertoire afin d'énumérer tous les fichiers qui y figurent.

### Utilisation d'un proxy pour les logs

[Consultez la documentation relative au proxy de l'Agent][8] pour apprendre à transférer vos logs avec un proxy.

### Règles globales de traitement

Depuis la version 6.10 de l'Agent Datadog, les règles `exclude_at_match`, `include_at_match` et `mask_sequences` peuvent être définies de façon globale.

{{< tabs >}}
{{% tab "Fichiers de configuration" %}}

Dans le fichier `datadog.yaml` : 

```
logs_config:
  processing_rules:
     - type: exclude_at_match
       name: exclude_healthcheck
       pattern: healtcheck
     - type: mask_sequences
       name: mask_user_email
       pattern: \w+@datadoghq.com
       replace_placeholder: "EMAIL_MASQUÉ"
```
{{% /tab %}}
{{% tab "Variable d'environnement" %}}

Le paramètre `DD_LOGS_CONFIG_PROCESSING_RULES` peut être utilisé pour configurer des règles globales de traitement :

```
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "EMAIL_MASQUÉ", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Ces règles de traitement s'appliquent à tous les logs recueillis par l'Agent Datadog.

**Remarque** : l'Agent Datadog n'initie pas le processus de collecte de logs en cas de problème de format dans les règles globales de traitement. Exécutez la [commande status][9] pour diagnostiquer un problème.

## Comment tirer le meilleur parti de vos logs d'application

Lorsque vous enregistrez des traces de pile, des attributs spécifiques disposent d'un affichage de l'interface utilisateur dédié au sein de votre application Datadog, comme le nom de l'enregistreur, le thread actuel, le type d'erreur et la trace de pile.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Trace de pile" responsive="true" >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants :

| Attribut            | Description                                                      |
|----------------------|------------------------------------------------------------------|
| `logger.name`        | Le nom de l'enregistreur                                               |
| `logger.thread_name` | Le nom du thread actuel                                       |
| `error.stack`        | La trace de pile actuelle                                               |
| `error.message`      | Le message d'erreur contenu dans la trace de pile                       |
| `error.kind`         | Le type d'erreur (comme « Exception », « OSError », etc.) |

**Remarque** : par défaut, les pipelines des intégrations tentent de remapper les paramètres par défaut de la bibliothèque de journalisation sur ces attributs spécifiques et analysent les traces ou tracebacks de pile afin d'extraire automatiquement `error.message` et `error.kind`.

## Envoyer vos logs d'application au format JSON

Pour les frameworks d'intégration, Datadog apporte des recommandations sur l'enregistrement de logs au format JSON dans un fichier. L'enregistrement au format JSON permet de gérer les logs d'application multilignes et est automatiquement analysé par Datadog.

##### Avantages de la collecte de logs au format JSON

Datadog analyse automatiquement les logs au format JSON. C'est pour cela que si vous pouvez choisir le format de log envoyé à Datadog, nous vous recommandons d'opter pour le format JSON afin d'éviter de créer des règles de parsing personnalisées.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/agent
[2]: /fr/agent/faq/agent-configuration-files
[3]: /fr/agent/faq/agent-commands/#start-stop-and-restart-the-agent
[4]: /fr/agent/faq/agent-commands/#agent-status-and-information
[5]: /fr/tracing
[6]: /fr/developers/metrics/custom_metrics
[7]: /fr/tagging
[8]: /fr/agent/proxy/#proxy-for-logs
[9]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/windows/?tab=agentv6#agent-commands