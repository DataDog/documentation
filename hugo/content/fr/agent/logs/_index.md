---
description: Utilisez le Datadog Agent pour recueillir vos logs et envoyez-les à Datadog
further_reading:
- link: agent/logs/agent_tags/
  tag: Documentation
  text: Tags de l'Agent ajoutés automatiquement aux logs
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: Documentation
  text: Filtrer les logs envoyés à Datadog
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: Documentation
  text: Nettoyer les données sensibles de vos logs
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: Documentation
  text: Agrégation de logs multiligne
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: Documentation
  text: Effectuer le suivi des répertoires à l'aide de wildcards
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: Documentation
  text: Règles globales de traitement
title: Collecte de logs de l'Agent de host
---
La collecte de logs nécessite le Datadog Agent v6.0+. Les versions antérieures de l'Agent n'incluent pas l'interface `log collection`. Si vous n'utilisez pas encore l'Agent, suivez les [instructions d'installation de l'Agent][1].

Consultez la section [Observability Pipelines][2] si vous souhaitez envoyer des logs en utilisant Collector ou Forwarder d'un autre fournisseur, ou si vous souhaitez prétraiter les données de vos logs dans votre environnement avant de les envoyer.

## Activer la collecte de logs {#activate-log-collection}

La collecte de logs n'est **pas activée** par défaut dans le Datadog Agent. Si vous exécutez l'Agent dans un environnement Kubernetes ou Docker, consultez la documentation dédiée [Collecte de logs Kubernetes][3] ou [Collecte de logs Docker][4].

Pour activer la collecte de logs avec un Agent exécuté sur votre host, remplacez `logs_enabled: false` par `logs_enabled: true` dans le [fichier de configuration principal][5] de l'Agent (`datadog.yaml`).

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="false" collapsible="true" >}}
logs_enabled: true
logs_config:
    auto_multi_line_detection: true
    force_use_http: true
{{< /code-block >}}

Pour toutes les options de configuration disponibles, consultez les [exemples de fichiers de configuration de l'Agent][6] pour votre système d'exploitation.

<div class="alert alert-info">À partir de l'Agent v6.19+/v7.19+, le transport HTTPS est le transport par défaut utilisé. Pour plus de détails, consultez <a href="/agent/logs/log_transport/">le transport de l'Agent</a>.</div>

Pour envoyer des logs avec des **variables d'environnement**, configurez ce qui suit :

```
DD_LOGS_ENABLED=true
```

Après avoir activé la collecte de logs, l'Agent est prêt à transférer les logs vers Datadog. Ensuite, configurez l'Agent pour définir l'emplacement de collecte des logs.

## Collecte de logs personnalisée {#custom-log-collection}

Le Datadog Agent v6 peut recueillir des logs et les transférer à Datadog à partir des fichiers, du réseau (TCP ou UDP), de journald et des canaux Windows :

1. Dans le répertoire `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][5], créez un nouveau dossier `<CUSTOM_LOG_SOURCE>.d/` accessible par l'utilisateur Datadog.
2. Créez un nouveau fichier `conf.yaml` dans ce nouveau dossier.
3. Ajoutez un groupe de configuration de collecte de logs personnalisée avec les paramètres ci-dessous.
4. [Redémarrez votre Agent][8] pour prendre en compte cette nouvelle configuration.
5. Exécutez la [sous-commande de statut de l'Agent][9] et recherchez `<CUSTOM_LOG_SOURCE>` dans la section Checks.

En cas d'erreurs de permission, consultez [Problèmes de permission lors du suivi des fichiers de log][10] pour résoudre le problème.

Pour déployer une configuration de collecte de logs personnalisée sur plusieurs Agents à la fois sans modifier les fichiers sur chaque host, consultez [Configure Custom Logs][15] avec Fleet Automation.

Voici des exemples de configuration de collecte de logs personnalisée ci-dessous :

{{< tabs >}}
{{% tab "Effectuer le suivi les fichiers" %}}

Pour collecter des logs depuis votre application `<APP_NAME>` stockée dans `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`, créez un fichier `<APP_NAME>.d/conf.yaml` à la racine de votre [répertoire de configuration de l'Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

Sur **Windows**, utilisez le chemin `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` et vérifiez que l'utilisateur `ddagentuser` dispose d'un accès en lecture au fichier de log.

**Remarque** : Une ligne de log doit se terminer par un caractère de saut de ligne, `\n` ou `\r\n`, sinon l'Agent attend indéfiniment et n'envoie pas la ligne de log.

[1]: /fr/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

Pour capturer l'adresse IP de l'expéditeur et l'inclure dans la charge utile du message de log, ajoutez la configuration suivante à votre fichier `datadog.yaml` :

```yaml
 logs_config:
   use_sourcehost_tag: true
```
Pour collecter des logs depuis votre application `<APP_NAME>` qui transfère ses logs vers le port TCP **10518**, créez un fichier `<APP_NAME>.d/conf.yaml` à la racine de votre [répertoire de configuration de l'Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

Si vous utilisez Serilog, `Serilog.Sinks.Network` est une option pour la connexion via UDP.

Depuis la version 7.31.0 de l'Agent, la connexion TCP reste ouverte indéfiniment même en cas d'inactivité.

**Remarques** :
- L'Agent prend en charge les logs au format chaîne brute, JSON et Syslog. Si vous envoyez des logs par lots, utilisez des caractères de saut de ligne pour séparer vos logs.
- Une ligne de log doit se terminer par un caractère de saut de ligne, `\n` ou `\r\n`, sinon l'Agent attend indéfiniment et n'envoie pas la ligne de log.

[1]: /fr/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

Pour collecter des logs depuis journald, créez un fichier `journald.d/conf.yaml` à la racine de votre [répertoire de configuration de l'Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consultez la documentation relative à l'[intégration journald][2] pour en savoir plus sur la configuration des environnements conteneurisés et du filtrage des unités.

[1]: /fr/agent/configuration/agent-configuration-files/
[2]: /fr/integrations/journald/
{{% /tab %}}
{{% tab "Événements Windows" %}}

Pour envoyer des événements Windows en tant que logs à Datadog, ajoutez manuellement les canaux à `conf.d/win32_event_log.d/conf.yaml` ou utilisez le Datadog Agent Manager.

Pour consulter votre liste de canaux, exécutez la commande suivante dans PowerShell :

```text
Get-WinEvent -ListLog *
```

Pour connaître les canaux les plus actifs, exécutez la commande suivante dans PowerShell :

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Ajoutez ensuite les canaux à votre fichier de configuration `win32_event_log.d/conf.yaml` :

```yaml
logs:
  - type: windows_event
    channel_path: "<CHANNEL_1>"
    source: "<CHANNEL_1>"
    service: "<SERVICE>"
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: "<CHANNEL_2>"
    service: "<SERVICE>"
    sourcecategory: windowsevent
```

Modifiez les paramètres `<CHANNEL_X>` avec le nom du canal Windows dont vous souhaitez collecter les événements.
Définissez le paramètre `source` correspondant sur le même nom de canal pour bénéficier de la [configuration automatique du pipeline de traitement de l'intégration][1].

Pour terminer, [redémarrez l'Agent][2].

[1]: /fr/logs/log_configuration/pipelines/#integration-pipelines
[2]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Emplacement privé Windows" %}}
Suivez les étapes de ces sections pour envoyer les logs de l'emplacement privé Windows à Datadog :

### Configurez l'Agent {#configure-the-agent}

1. Activez la collecte des logs de l'Agent en définissant `logs_enabled: true` dans le fichier de configuration de l'Agent.
2. Accédez à `C:\ProgramData\Datadog\conf.d` et créez un dossier nommé `synthetics_worker.d`.
3. Dans le dossier `synthetics_worker.d`, créez un fichier nommé `conf.yaml` en utilisant l'exemple suivant comme modèle :

```yaml
logs:
  - type: file
    path: "C:\\Program Files\\Datadog-Synthetics\\Synthetics\\private-location-service.out.log"
    service: <YOUR_SERVICE>
    source: synthetics
    tags: # Defined per user preference
      - env:<YOUR_ENV>
      - private_location:<YOUR_PRIVATE_LOCATION>
```

### Vérifiez l'utilisateur exécutant l'Agent {#verify-the-user-running-the-agent}

Comme le dossier d'installation de l'emplacement privé est restreint à l'accès administrateur, le Datadog Agent a besoin d'une autorisation pour accéder au fichier de log. Suivez ces étapes pour vérifier l'utilisateur exécutant le Datadog Agent :

1. Appuyez sur la touche Windows et `R`, puis recherchez {{< ui >}}Run{{< /ui >}}.
2. Recherchez le Datadog Agent, faites un clic droit dessus et sélectionnez {{< ui >}}Properties{{< /ui >}}.
3. Dans l'onglet {{< ui >}}Log On{{< /ui >}}, vérifiez le compte (la valeur par défaut est `ddagentuser`).
4. Fermez la fenêtre.

### Accordez l'autorisation à l'utilisateur exécutant l'Agent {#grant-permission-to-the-user-running-the-agent}

1. Accédez à `C:\Program Files` et recherchez le dossier `synthetics_worker.d`.
2. Faites un clic droit sur le dossier `synthetics_worker.d` et sélectionnez {{< ui >}}Properties{{< /ui >}}.
3. Accédez à l'onglet {{< ui >}}Security{{< /ui >}}.
4. Cliquez sur {{< ui >}}Edit{{< /ui >}} et ajoutez `ddagentuser`.
5. Accordez les autorisations nécessaires.
6. Redémarrez le Datadog Agent via l'écran Services ou la ligne de commande pour appliquer les modifications et commencer à envoyer des logs à Datadog.
{{% /tab %}}
{{< /tabs >}}

Liste complète des paramètres disponibles pour la collection de logs :

| Paramètre        | Requis | Description                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Oui      | Le type de source d'entrée de log. Les valeurs valides sont : `tcp`, `udp`, `file`, `windows_event`, `docker` ou `journald`.                                                                                                                                                                                                                                          |
| `port`           | Oui      | Si `type` est **tcp** ou **udp**, définissez le port d'écoute des logs.                                                                                                                                                                                                                                                                                     |
| `path`           | Oui      | Si `type` est **file** ou **journald**, définissez le chemin du fichier pour la collecte des logs.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Oui      | Si `type` est **windows_event**, listez les canaux d'événements Windows pour la collecte des logs.                                                                                                                                                                                                                                                                     |
| `service`        | Oui      | Le nom du service propriétaire du log. Si vous avez instrumenté votre service avec [Datadog APM][11], il doit s'agir du même nom de service. Vérifiez les instructions de [unified service tagging][12] lors de la configuration de `service` pour plusieurs types de données.                                                                                                          |
| `source`         | Oui      | L'attribut qui définit quelle intégration envoie les logs. Si les logs ne proviennent pas d'une intégration existante, ce champ peut inclure un nom de source personnalisé. Cependant, il est recommandé de faire correspondre cette valeur à l'espace de nommage de toutes les [métriques personnalisées][13] associées que vous collectez, par exemple : `myapp` depuis `myapp.request.count`. |
| `include_units`  | Non       | Si `type` est **journald**, liste des unités journald spécifiques à inclure.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | Non       | Si `type` est **file** et que `path` contient un caractère générique, listez le ou les fichiers correspondants à exclure de la collecte de logs. Ceci est disponible pour la version de l'Agent >= 6.18.                                                                                                                                                                            |
| `exclude_units`  | Non       | Si `type` est **journald**, liste des unités journald spécifiques à exclure.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | Non       | L'attribut utilisé pour définir la catégorie à laquelle appartient un attribut source, par exemple : `source:postgres, sourcecategory:database` ou `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | Non       | Consultez [Position de départ](#start-position) pour plus d'informations.|
| `encoding`       | Non       | Si `type` est **file**, définissez l'encodage pour que l'Agent puisse lire le fichier. Définissez-le sur `utf-16-le` pour UTF-16 little-endian, `utf-16-be` pour UTF-16 big-endian ou `shift-jis` pour Shift JIS. Si une autre valeur est définie, l'Agent lit le fichier en tant qu'UTF-8.  _Ajout de `utf-16-le` et `utf-16be` dans l'Agent v6.23/v7.23, `shift-jis` dans l'Agent v6.34/v7.34_                                                                                      |
| `tags`           | Non       | Une liste de tags ajoutés à chaque log collecté ([en savoir plus sur le tagging][14]).                                                                                                                                                                                                                                                                             |

### Position de départ {#start-position}

Le paramètre `start_position` est pris en charge par les types de suivi **file** et **journald**. Le `start_position` est toujours `beginning` lors du suivi d'un conteneur.

Compatibilité :
- **File** : Agent 6.19+/7.19+
- **Journald** : Agent 6.38+/7.38+

Si `type` est **file** :
- Définissez la position à partir de laquelle l'Agent commence à lire le fichier.
- Les valeurs valides sont `beginning`, `end`, `forceBeginning` et `forceEnd` (par défaut : `end`).
- La position `beginning` ne prend pas en charge les chemins avec des caractères génériques.

Si `type` est **journald** :
- Définissez la position à partir de laquelle l'Agent commence à lire le journal.
- Les valeurs valides sont `beginning`, `end`, `forceBeginning` et `forceEnd` (par défaut : `end`).

#### Priorité {#precedence}

Pour les types de suivi file et journald, si une position `end` ou `beginning` est spécifiée, mais qu'un décalage est enregistré, le décalage est prioritaire. L'utilisation de `forceBeginning` ou `forceEnd` force l'Agent à utiliser la valeur spécifiée même s'il existe un décalage enregistré.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/fr/observability_pipelines/
[3]: /fr/containers/kubernetes/log/
[4]: /fr/containers/docker/log/
[5]: /fr/agent/configuration/agent-configuration-files/
[6]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
[7]: /fr/agent/logs/log_transport/
[8]: /fr/agent/configuration/agent-commands/#restart-the-agent
[9]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[10]: /fr/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[11]: /fr/tracing/
[12]: /fr/getting_started/tagging/unified_service_tagging
[13]: /fr/metrics/custom_metrics/#overview
[14]: /fr/getting_started/tagging/
[15]: /fr/agent/fleet_automation/configure_logs/