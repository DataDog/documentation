---
description: Utilisez l'Agent Datadog pour recueillir vos logs et envoyez-les à Datadog
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
  text: Suivre des répertoires à l'aide de wildcards
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: Documentation
  text: Règles globales de traitement
title: Collecte de logs de l'Agent de host
---
La collecte des journaux nécessite l'Agent Datadog v6.0+. Les versions antérieures de l'Agent n'incluent pas l'interface `log collection`. Si vous n'utilisez pas déjà l'Agent, suivez les [instructions d'installation de l'Agent][1] .

Consultez la section relative aux [pipelines dʼobservabilité][2] si vous souhaitez envoyer des logs en utilisant Collector ou Forwarder d'un autre fournisseur, ou si vous souhaitez prétraiter les données de vos logs dans votre environnement avant de les envoyer.

## Activez la collecte des journaux {#activate-log-collection}

La collecte des journaux n'est **pas activée** par défaut dans l'Agent Datadog. Si vous exécutez l'Agent dans un environnement Kubernetes ou Docker, consultez la documentation dédiée à la [Collecte des journaux Kubernetes][3] ou à la [Collecte des journaux Docker][4].

Pour activer la collecte des journaux avec un Agent fonctionnant sur votre hôte, changez `logs_enabled: false` en `logs_enabled: true` dans le [fichier de configuration principal de l'Agent][5] (`datadog.yaml`).

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="false" collapsible="true" >}}
logs_enabled: true
logs_config:
    auto_multi_line_detection: true
    force_use_http: true
{{< /code-block >}}

Consultez le [fichier config_template.yaml d'exemple][6] pour toutes les options de configuration disponibles.

<div class="alert alert-info">À partir de l'Agent v6.19+/v7.19+, le transport HTTPS est le transport par défaut utilisé. Pour plus de détails, voir <a href="/agent/logs/log_transport/">Transport de l'Agent</a>.</div>

Pour envoyer des journaux avec **des variables d'environnement**, configurez ce qui suit :

```
DD_LOGS_ENABLED=true
```

Après avoir activé la collecte des journaux, l'Agent est prêt à transférer les journaux vers Datadog. Ensuite, configurez l'Agent pour indiquer d'où collecter les journaux.

## Collecte de journaux personnalisée {#custom-log-collection}

L'Agent Datadog v6 peut recueillir des logs et les transférer à Datadog à partir des fichiers, du réseau (TCP ou UDP), de journald et des canaux Windows :

1. Dans le répertoire `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][5], créez un nouveau dossier `<CUSTOM_LOG_SOURCE>.d/` accessible par l'utilisateur Datadog.
2. Créez un nouveau fichier `conf.yaml` dans ce nouveau dossier.
3. Ajoutez un groupe de configuration de collecte de journaux personnalisé avec les paramètres ci-dessous.
4. [Redémarrez votre Agent][8] pour prendre en compte cette nouvelle configuration.
5. Exécutez la [sous-commande d'état de l'Agent][9] et recherchez `<CUSTOM_LOG_SOURCE>` dans la section Vérifications.

S'il y a des erreurs de permission, consultez [Problèmes de permission lors de la lecture des fichiers journaux][10] pour résoudre les problèmes.

Voici des exemples de configuration de collecte de logs personnalisée ci-dessous :

{{< tabs >}}
{{% tab "Fichiers de suivi" %}}

Pour rassembler les journaux de votre application `<APP_NAME>` stockée dans `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`, créez un fichier `<APP_NAME>.d/conf.yaml` à la racine de votre [répertoire de configuration de l'Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

Sur **Windows**, utilisez le chemin `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` et vérifiez que l'utilisateur `ddagentuser` a accès en lecture au fichier journal.

**Remarque** : Une ligne de journal doit se terminer par un caractère de nouvelle ligne, `\n` ou `\r\n`, sinon l'Agent attend indéfiniment et ne transmet pas la ligne de journal.

[1]: /fr/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

Pour capturer l'adresse IP de l'expéditeur et l'inclure dans la charge utile du message journal, ajoutez la configuration suivante à votre fichier `datadog.yaml` :

```yaml
 logs_config:
   use_sourcehost_tag: true
```
Pour rassembler les journaux de votre application `<APP_NAME>` qui transfère ses journaux vers le port TCP **10518**, créez un fichier `<APP_NAME>.d/conf.yaml` à la racine de votre [répertoire de configuration de l'Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

Si vous utilisez Serilog, `Serilog.Sinks.Network` est une option pour se connecter avec UDP.

Depuis la version 7.31.0 de l'Agent, la connexion TCP reste ouverte indéfiniment même en cas d'inactivité.

**Remarques** :
- L'Agent prend en charge les journaux au format brut, JSON et Syslog. Si vous envoyez des journaux par lots, utilisez des caractères de saut de ligne pour séparer vos journaux.
- Une ligne de journal doit se terminer par un caractère de nouvelle ligne, `\n` ou `\r\n`, sinon l'Agent attend indéfiniment et ne transmet pas la ligne de journal.

[1]: /fr/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

Pour rassembler les journaux de journald, créez un fichier `journald.d/conf.yaml` à la racine de votre [répertoire de configuration de l'Agent][1] avec le contenu suivant :

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

Pour envoyer des événements Windows en tant que journaux à Datadog, ajoutez les canaux à `conf.d/win32_event_log.d/conf.yaml` manuellement ou utilisez le Gestionnaire d'Agent Datadog.

Pour consulter votre liste de canaux, exécutez la commande suivante dans PowerShell :

```text
Get-WinEvent -ListLog *
```

Pour connaître les canaux les plus actifs, exécutez la commande suivante dans PowerShell :

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Ajoutez ensuite les canaux à votre fichier de configuration `win32_event_log.d/conf.yaml` :

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

Modifiez les paramètres `<CHANNEL_X>` avec le nom du canal Windows à partir duquel vous souhaitez collecter des événements.
Définissez le paramètre `source` correspondant au même nom de canal pour bénéficier de la [configuration automatique du pipeline de traitement d'intégration][1].

Pour terminer, [redémarrez l'Agent][2].

[1]: /fr/logs/log_configuration/pipelines/#integration-pipelines
[2]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Emplacement privé Windows" %}}
Suivez les étapes de ces sections pour envoyer les journaux de l'emplacement privé Windows à Datadog :

### Configurer l'Agent {#configure-the-agent}

1. Activez la collecte des journaux de l'Agent en définissant `logs_enabled: true` dans le fichier de configuration de l'Agent.
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

Étant donné que le dossier d'installation de l'emplacement privé est restreint à l'accès administrateur, l'Agent Datadog a besoin de l'autorisation d'accéder au fichier journal. Suivez ces étapes pour vérifier l'utilisateur exécutant l'Agent Datadog :

1. Appuyez sur la touche Windows et `R`, puis recherchez {{< ui >}}Run{{< /ui >}}.
2. Trouvez l'Agent Datadog, faites un clic droit dessus et sélectionnez {{< ui >}}Properties{{< /ui >}}.
3. Dans l'onglet {{< ui >}}Log On{{< /ui >}}, vérifiez le compte (le défaut est `ddagentuser`).
4. Fermez la fenêtre.

### Accordez l'autorisation à l'utilisateur exécutant l'Agent {#grant-permission-to-the-user-running-the-agent}

1. Allez à `C:\Program Files` et trouvez le dossier `synthetics_worker.d`.
2. Faites un clic droit sur le dossier `synthetics_worker.d` et sélectionnez {{< ui >}}Properties{{< /ui >}}.
3. Allez à l'onglet {{< ui >}}Security{{< /ui >}}.
4. Cliquez sur {{< ui >}}Edit{{< /ui >}} et ajoutez `ddagentuser`.
5. Accordez les autorisations nécessaires.
6. Redémarrez l'Agent Datadog via l'écran des Services ou la ligne de commande pour appliquer les modifications et commencer à envoyer des journaux à Datadog.
{{% /tab %}}
{{< /tabs >}}

Liste complète des paramètres disponibles pour la collection de logs :

| Paramètre        | Requis | Description                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Oui      | Le type de source d'entrée de journal. Les valeurs valides sont : `tcp`, `udp`, `file`, `windows_event`, `docker` ou `journald`.                                                                                                                                                                                                                                          |
| `port`           | Oui      | Si `type` est **tcp** ou **udp**, définissez le port pour écouter les journaux.                                                                                                                                                                                                                                                                                     |
| `path`           | Oui      | Si `type` est **file** ou **journald**, définissez le chemin du fichier pour rassembler les journaux.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Oui      | Si `type` est **windows_event**, listez les canaux d'événements Windows pour collecter les journaux.                                                                                                                                                                                                                                                                     |
| `service`        | Oui      | Le nom du service possédant le journal. Si vous avez instrumenté votre service avec [Datadog APM][11], cela doit être le même nom de service. Vérifiez les instructions de [tagging de service unifié][12] lors de la configuration de `service` à travers plusieurs types de données.                                                                                                          |
| `source`         | Oui      | L'attribut qui définit quelle intégration envoie les journaux. Si les journaux ne proviennent pas d'une intégration existante, ce champ peut inclure un nom de source personnalisé. Cependant, il est recommandé d'aligner cette valeur sur l'espace de noms de toutes les [métriques personnalisées][13] que vous collectez, par exemple : `myapp` de `myapp.request.count`. |
| `include_units`  | Non       | Si `type` est **journald**, liste des unités journald spécifiques à inclure.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | Non       | Si `type` est **file**, et `path` contient un caractère générique, listez le fichier ou les fichiers correspondants à exclure de la collecte de journaux. Ceci est disponible pour la version de l'Agent >= 6.18.                                                                                                                                                                            |
| `exclude_units`  | Non       | Si `type` est **journald**, liste des unités journald spécifiques à exclure.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | Non       | L'attribut utilisé pour définir la catégorie à laquelle appartient un attribut source, par exemple : `source:postgres, sourcecategory:database` ou `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | Non       | Voir [Position de départ](#start-position) pour plus d'informations.|
| `encoding`       | Non       | Si `type` est **file**, définissez l'encodage pour que l'Agent puisse lire le fichier. Définissez-le sur `utf-16-le` pour UTF-16 little-endian, `utf-16-be` pour UTF-16 big-endian, ou `shift-jis` pour Shift JIS. Si défini sur toute autre valeur, l'Agent lit le fichier comme UTF-8.  _Ajouté `utf-16-le` et `utf-16be` dans l'Agent v6.23/v7.23, `shift-jis` dans l'Agent v6.34/v7.34_                                                                                      |
| `tags`           | Non       | Une liste de balises ajoutées à chaque journal collecté ([en savoir plus sur le tagging][14]).                                                                                                                                                                                                                                                                             |

### Position de départ {#start-position}

Le paramètre `start_position` est pris en charge par les tailers de type **file** et **journald**. Le `start_position` est toujours `beginning` lors de la surveillance d'un conteneur.

Compatibilité :
- **Fichier**: Agent 6.19+/7.19+
- **Journald**: Agent 6.38+/7.38+

Si `type` est **fichier** :
- Définissez la position à partir de laquelle l'Agent commence à lire le fichier.
- Les valeurs valides sont `beginning`, `end`, `forceBeginning` et `forceEnd` (par défaut : `end`).
- La position `beginning` ne prend pas en charge les chemins avec des caractères génériques.

Si `type` est **journald** :
- Définissez la position à partir de laquelle l'Agent commence à lire le journal.
- Les valeurs valides sont `beginning`, `end`, `forceBeginning` et `forceEnd` (par défaut : `end`).

#### Précédence {#precedence}

Pour les types de fichiers et de journald tailer, si une position `end` ou `beginning` est spécifiée, mais qu'un décalage est stocké, le décalage prend la priorité. L'utilisation de `forceBeginning` ou `forceEnd` oblige l'Agent à utiliser la valeur spécifiée même s'il y a un décalage stocké.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/fr/observability_pipelines/
[3]: /fr/containers/kubernetes/log/
[4]: /fr/containers/docker/log/
[5]: /fr/agent/configuration/agent-configuration-files/
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[7]: /fr/agent/logs/log_transport/
[8]: /fr/agent/configuration/agent-commands/#restart-the-agent
[9]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[10]: /fr/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[11]: /fr/tracing/
[12]: /fr/getting_started/tagging/unified_service_tagging
[13]: /fr/metrics/custom_metrics/#overview
[14]: /fr/getting_started/tagging/