---
description: Utilisez l'Agent Datadog pour recueillir vos logs et envoyez-les à Datadog
further_reading:
- link: agent/logs/advanced_log_collection/#filtrer-les-logs
  tag: Documentation
  text: Filtrer les logs envoyés à Datadog
- link: agent/logs/advanced_log_collection/#nettoyer-les-donnees-sensibles-de-vos-logs
  tag: Documentation
  text: Nettoyer les données sensibles de vos logs
- link: agent/logs/advanced_log_collection/#agregation-multiligne
  tag: Documentation
  text: Agrégation de logs multiligne
- link: agent/logs/advanced_log_collection/#suivre-des-repertoires-a-l-aide-de-wildcards
  tag: Documentation
  text: Suivre des répertoires à l'aide de wildcards
- link: agent/logs/advanced_log_collection/#regles-globales-de-traitement
  tag: Documentation
  text: Règles globales de traitement
title: Collecte de logs de l'Agent de host
---

La collecte de logs nécessite la version 6.0+ de l'Agent. Les anciennes versions de l'Agent n'incluent pas l'interface `log collection`. Si vous n'utilisez pas encore l'Agent, suivez les [instructions d'installation de l'Agent][1].

Consultez la section relative aux [pipelines dʼobservabilité][2] si vous souhaitez envoyer des logs en utilisant Collector ou Forwarder d'un autre fournisseur, ou si vous souhaitez prétraiter les données de vos logs dans votre environnement avant de les envoyer.

## Activer la collecte de logs

La collecte de logs est **désactivée** par défaut dans l'Agent Datadog. Si vous exécutez l'Agent au sein d'un environnement Kubernetes ou Docker, consultez la section [Collecte de logs Kubernetes][3] ou [Collecte de logs  Docker][4].

Pour activer la collecte de logs avec un Agent s'exécutant sur votre host, remplacez `logs_enabled: false` par `logs_enabled: true` dans le [fichier de configuration principal][5] (`datadog.yaml`) de l'Agent.

{{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

Depuis la version 6.19/7.19 de l'Agent, le transport HTTPS est utilisé par défaut. Pour découvrir comment imposer le transport HTTPS/TCP, consultez la section relative au [transport de l'Agent][6].

Pour envoyer des logs avec des variables d'environnement, configurez ce qui suit :

* `DD_LOGS_ENABLED=true`

Une fois la collecte de logs activée, l'Agent est prêt à envoyer ses logs à Datadog. Configurez ensuite l'Agent afin de définir les sources de collecte des logs.

## Collecte de logs personnalisée

L'Agent Datadog v6 peut recueillir des logs et les transférer à Datadog à partir de fichiers, du réseau (TCP ou UDP), de journald et des canaux Windows :

1. Dans le répertoire `conf.d/` à la racine du [répertoire de configuration de votre Agent][5], créez un nouveau dossier `<CUSTOM_LOG_SOURCE>.d/` auquel l'utilisateur Datadog peut accéder.
2. Créez un fichier `conf.yaml` dans ce nouveau dossier.
3. Ajoutez un groupe de configuration de collecte de logs personnalisée avec les paramètres ci-dessous.
4. [Redémarrez votre Agent][7] pour appliquer cette nouvelle configuration.
5. Lancez la [sous-commande status de l'Agent][8] et cherchez `<SOURCE_LOGS_PERSONNALISÉE>` dans la section Checks.

Si vous rencontrez des erreurs liées aux autorisations, consultez la rubrique [Problèmes d’autorisation lors du suivi de fichiers de log][9] pour les résoudre.

Voici des exemples de configurations de collecte de logs personnalisée ci-dessous :

{{< tabs >}}
{{% tab "Suivre des fichiers" %}}

Pour recueillir les logs de votre application `<NOM_APP>` stockés dans `<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log`, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: file
    path: "<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log"
    service: "<NOM_APP>"
    source: "<SOURCE>"
```

Sous **Windows**, utilisez le chemin `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` et vérifiez que l'utilisateur `ddagentuser` est autorisé à lire et modifier le fichier de log.

**Remarque** : une ligne de log doit se terminer par un caractère de retour à la ligne, `\n` ou `\r\n`. Autrement, lʼAgent attend indéfiniment et n'envoie pas la ligne de log.

[1]: /fr/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

Pour recueillir les logs de votre application `<NOM_APP>` qui transfert ses logs via TCP sur le port **10518**, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<NOM_APP>"
    source: "<SOURCE_PERSONNALISÉE>"
```

Si vous utilisez Serilog, vous disposez de l'option `Serilog.Sinks.Network` pour une connexion via UDP.

Depuis la version 7.31.0 de l'Agent, la connexion TCP reste ouverte indéfiniment même en cas d'inactivité.

**Remarques** :
- LʼAgent prend en charge les logs aux formats brut, JSON et Syslog. Si vous envoyez des logs en lot, séparez vos logs par des caractères de saut de ligne.
- Une ligne de log doit se terminer par un caractère de retour à la ligne, `\n` ou `\r\n`. Autrement, lʼAgent attend indéfiniment et n'envoie pas la ligne de log.

[1]: /fr/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

Pour recueillir les logs depuis journald, créez un fichier `journald.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consultez la documentation relative à l'[intégration journald][2] pour obtenir des instructions de configuration spécifiques aux environnements conteneurisés et en savoir plus sur le filtrage des unités.

[1]: /fr/agent/configuration/agent-configuration-files/
[2]: /fr/integrations/journald/
{{% /tab %}}
{{% tab "Événements Windows" %}}

Pour envoyer des événements Windows à Datadog en tant que logs, ajoutez des canaux au fichier `conf.d/win32_event_log.d/conf.yaml` manuellement ou via Datadog Agent Manager.

Pour consulter la liste de vos canaux, exécutez la commande suivante dans PowerShell :

```text
Get-WinEvent -ListLog *
```

Pour découvrir les canaux les plus actifs, exécutez la commande suivante dans PowerShell :

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Ajoutez ensuite les canaux dans votre fichier de configuration `win32_event_log.d/conf.yaml` :

```yaml
logs:
  - type: windows_event
    channel_path: "<CANAL_1>"
    source: "<CANAL_1>"
    service: "<SERVICE>"
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: "<CANAL_2>"
    source: "<CANAL_2>"
    service: "<SERVICE>"
    sourcecategory: windowsevent
```

Remplacez les paramètres `<CANAL_X>` par le nom du canal Windows pour lequel vous souhaitez recueillir des événements.
Définissez le même nom de canal pour le paramètre `source` correspondant afin de bénéficier de la [configuration de pipeline de traitement d'intégration automatique][1].

Pour terminer, [redémarrez l'Agent][2].

[1]: /fr/logs/log_configuration/pipelines/#integration-pipelines
[2]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

Liste complète des paramètres disponibles pour la collecte de logs :

| Paramètre        | Obligatoire | Rôle                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Oui      | Le type de source d'entrée de log. Valeurs autorisées : `tcp`, `udp`, `file`, `windows_event`, `docker` ou `journald`.                                                                                                                                                                                                                                          |
| `port`           | Oui      | Si `type` est défini sur **tcp** ou **udp**, configurez le port sur lequel l'écoute des logs est effectuée.                                                                                                                                                                                                                                                                                     |
| `path`           | Oui      | Si `type` est défini sur **file** ou **journald**, configurez le chemin du fichier à partir duquel les logs sont recueillis.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Oui      | Si `type` est défini sur **windows_event**, énumérez les canaux d'événements Windows à partir desquels les logs doivent être recueillis.                                                                                                                                                                                                                                                                     |
| `service`        | Oui      | Le nom du service propriétaire du log. Si vous avez instrumenté votre service avec l'[APM Datadog][10], ce paramètre doit correspondre au même nom de service. Consultez les instructions relatives au [tagging de service unifié][11] si vous configurez `service` pour plusieurs types de données.                                                                                                          |
| `source`         | Oui      | Un attribut qui définit l'intégration qui envoie les logs. Si les logs ne viennent pas d'une intégration existante, vous pouvez spécifier le nom d'une source personnalisée. Toutefois, il est conseillé d'utiliser la valeur de l'espace de nommage des [métriques custom][12] recueillies. Exemple : `myapp` pour `myapp.request.count`. |
| `include_units`  | Non       | Si `type` est défini sur **journald**, il s'agit de la liste des unités journald spécifiques à inclure.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | Non       | Si `type` est défini sur **file**, et si `path` contient un caractère wildcard, permet de définir les fichiers qui doivent être exclus de la collecte de logs. Disponible depuis la version 6.18 de l'Agent.                                                                                                                                                                            |
| `exclude_units`  | Non       | Si `type` est défini sur **journald**, il s'agit de la liste des unités journald spécifiques à exclure.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | Non       | L'attribut utilisé pour définir la catégorie à laquelle appartient un attribut source, par exemple : `source:postgres, sourcecategory:database` ou `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | Non       | Référez-vous à la section relative à la [position de départ](#position-de-depart) pour en savoir plus.|
| `encoding`       | Non       | Si `type` est défini sur **file**, ce paramètre permet de définir le format d'encodage que l'Agent doit utiliser pour lire le fichier. Définissez sa valeur sur `utf-16-le` pour UTF-16 Little Endian et sur `utf-16-be` pour UTF-16 Big Endian, ou sur `shift-jis` pour Shift JIS. Si vous définissez une autre valeur, l'Agent lit le fichier au format UTF-8. _Les valeurs `utf-16-le` et `utf-16be` sont disponibles depuis les versions v6.23/v7.23 de l'Agent, et la valeur `shift-jis` est disponible depuis les versions v6.34/v7.34 de l'Agent._                                                                                      |
| `tags`           | Non       | La liste des tags à ajouter à chaque log recueilli ([en savoir plus sur le tagging][13]).                                                                                                                                                                                                                                                                             |

### Position de départ

Le paramètre `start_position` est pris en charge par les types de tailer **file** et **journald**. Le paramètre `start_position` est toujours `beginning` lors du suivi dʼun conteneur.

Compatibilité :
- **File** : Agent version 6.19/7.19 ou ultérieur
- **Journald** : Agent version 6.38/7.38 ou ultérieur

Si `type` est **file** :
- Définissez la position à laquelle lʼAgent doit commencer à lire le fichier.
- Les valeurs valables sont `beginning`, `end`, `forceBeginning` et `forceEnd` (valeur par défaut : `end`).
- La position `beginning` ne prend pas en charge les chemins d'accès contenant des caractères génériques.

Si `type` est **journald** :
- Définissez la position à laquelle lʼAgent doit commencer à lire le journal.
- Les valeurs valables sont `beginning`, `end`, `forceBeginning` et `forceEnd` (valeur par défaut : `end`).

#### Priorité

Pour les types de tailer file et journald, si une position `end` ou `beginning` est spécifiée, mais qu'un décalage est stocké, ce dernier est prioritaire. L'utilisation de `forceBeginning` ou de `forceEnd` oblige lʼAgent à utiliser la valeur spécifiée, même si un décalage est stocké.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/fr/observability_pipelines/
[3]: /fr/agent/kubernetes/log/
[4]: /fr/agent/docker/log/
[5]: /fr/agent/configuration/agent-configuration-files/
[6]: /fr/agent/logs/log_transport/
[7]: /fr/agent/configuration/agent-commands/#restart-the-agent
[8]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[9]: /fr/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files'
[10]: /fr/tracing/
[11]: /fr/getting_started/tagging/unified_service_tagging
[12]: /fr/metrics/custom_metrics/#overview
[13]: /fr/getting_started/tagging/