---
title: Collecte de logs de l'Agent
kind: documentation
description: Utilisez l'Agent Datadog pour recueillir vos logs et envoyez-les à Datadog
further_reading:
  - link: 'agent/logs/advanced_log_collection/#filtrer-les-logs'
    tag: Documentation
    text: Filtrer les logs envoyés à Datadog
  - link: 'agent/logs/advanced_log_collection/#nettoyer-les-donnees-sensibles-de-vos-logs'
    tag: Documentation
    text: Nettoyer les données sensibles de vos logs
  - link: 'agent/logs/advanced_log_collection/#agregation-multiligne'
    tag: Documentation
    text: Agrégation de logs multiligne
  - link: 'agent/logs/advanced_log_collection/#suivre-des-repertoires-a-l-aide-de-wildcards'
    tag: Documentation
    text: Suivre des répertoires à l'aide de wildcards
  - link: 'agent/logs/advanced_log_collection/#regles-globales-de-traitement'
    tag: Documentation
    text: Règles globales de traitement
---
La collecte de logs nécessite la version 6.0+ de l'Agent. Les anciennes versions de l'Agent n'incluent pas l'interface `log collection`. Si vous n'utilisez pas encore l'Agent, suivez les [instructions d'installation de l'Agent][1].

La collecte de logs est **désactivée** par défaut dans l'Agent Datadog. Vous devez l'activer dans le [fichier de configuration principal][2] de l'Agent (`datadog.yaml`) :

```
logs_enabled: true
```

L'Agent Datadog envoie ses logs à Datadog via le protocole TCP chiffré par TLS. Cela nécessite une communication sortante sur le port `10516`.

**Remarque** : si vous utilisez Kubernetes, assurez-vous d'[activer la collecte de logs dans votre configuration DaemonSet][3]. Si vous utilisez Docker, [activez la collecte de logs pour l'Agent conteneurisé][4].

## Activation de la collecte de logs à partir d'intégrations

Pour recueillir des logs pour une intégration donnée, supprimez la mise en commentaire de la section logs du fichier `conf.yaml` de cette intégration et configurez-la pour votre environnement.

<div class="alert alert-warning">
Consultez la liste <a href="/integrations/#collecte-de-log-cat">des intégrations prises en charge disponibles</a>  qui comprennent des configurations de log par défaut.
</div>

Si une intégration ne prend pas en charge les logs par défaut, utilisez la collecte de logs personnalisée.

## Collecte de logs personnalisée

L'Agent Datadog v6 peut recueillir des logs et les transférer à Datadog à partir des fichiers, du réseau (TCP ou UDP), de journald et des canaux Windows :

1. Créez un dossier `<SOURCE_LOG_PERSONNALISEE>.d/` dans le répertoire `conf.d/` à la racine du [répertoire de configuration de votre Agent][2].
2. Créez un fichier `conf.yaml` dans ce nouveau dossier.
3. Ajoutez un groupe de configuration de collecte de logs personnalisée avec les paramètres ci-dessous.
4. [Redémarrez votre Agent][5] pour prendre en compte cette nouvelle configuration.
5. Lancez la [sous-commande status de l'Agent][6] et cherchez `<SOURCE_LOG_PERSONNALISEE>` dans la section Checks.

Voici des exemples de configurations de collecte de logs personnalisée ci-dessous :

{{< tabs >}}
{{% tab "Suivre des fichiers existants" %}}

Pour rassembler les logs de votre application `<NOM_APP>` stockés dans `<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log`, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```
logs:
  - type: file
    path: <CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log
    service: <NOM_APP>
    source: <SOURCE>
```

**Remarque** : si vous utilisez **Windows** avec l'Agent v6 de Datadog et que vous suivez des fichiers pour des logs, vérifiez que ces fichiers sont encodés en langage UTF8.


[1]: /fr/agent/guide/agent-configuration-files
{{% /tab %}}

{{% tab "Flux de logs de TCP/UDP" %}}

Pour rassembler les logs de votre application `<NOM_APP>` qui transfert ses logs via TCP sur le port **10518**, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```
logs:
  - type: tcp
    port: 10518
    service: <NOM_APP>
    source: <SOURCE_PERSONNALISEE>
```

Si vous utilisez Serilog, vous disposez de l'option `Serilog.Sinks.Network` pour une connexion via UDP.

**Remarque** : l'Agent prend en charge les logs au format de chaîne brute, JSON et Syslog. Si vous envoyez des logs en lot, séparez vos logs par des caractères de saut de ligne.

[1]: /fr/agent/guide/agent-configuration-files
{{% /tab %}}
{{% tab "Flux de logs de journald" %}}

Pour rassembler les logs depuis journald, créez un fichier `journald.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consultez la documentation relative à l'[intégration de journald][2] pour en savoir plus sur la configuration des environnements conteneurisés et du filtrage des unités.

[1]: /fr/agent/guide/agent-configuration-files
[2]: /fr/integrations/journald
{{% /tab %}}
{{% tab "Événements Windows" %}}

Pour envoyer des événements Windows à Datadog en tant que log, ajoutez manuellement des canaux au fichier `conf.d/win32_event_log.d/conf.yaml` ou via le gestionnaire de l'Agent Datadog.

Pour consulter votre liste de canaux, exécutez la commande suivante dans PowerShell :

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
    service: <SERVICE>
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: <CANAL_2>
    source: <CANAL_2>
    service: <SERVICE>
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
| `type`           | Oui      | Le type de source d'entrée de log. Valeurs autorisées : `tcp`, `udp`, `file`, `windows_event`, `docker`, ou `journald`.                                                                                                                                                                                                                             |
| `port`           | Oui      | Si `type` est défini sur **tcp** ou **udp**, configurez le port pour pouvoir écouter des logs.                                                                                                                                                                                                                                                                                           |
| `path`           | Oui      | Si `type` est défini sur **file** ou **journald**, configurez le chemin du fichier pour pouvoir regrouper les logs.                                                                                                                                                                                                                                                                        |
| `channel_path`   | Oui      | Si `type` est défini sur **windows_event**, listez les canaux d'événements Windows pour pouvoir recueillir les logs.                                                                                                                                                                                                                                                                 |
| `service`        | Oui      | Le nom du service propriétaire du log. Si vous avez instrumenté votre service avec l'[APM Datadog][7], ce paramètre doit correspondre au même nom de service.                                                                                                                                                                                                                    |
| `source`         | Oui      | Un attribut qui définit l'intégration qui envoie les logs. Si les logs ne viennent pas d'une intégration existante, ce champ peut inclure le nom d'une source personnalisée. Cependant, nous vous recommandons d'associer cette valeur à l'espace de nommage des [métriques custom][8] recueillies, par exemple : `myapp` pour `myapp.request.count`. |
| `include_units`  | Non       | Si `type` est défini sur **journald**, il s'agit de la liste des unités journald spécifiques à inclure.                                                                                                                                                                                                                                                                              |
| `exclude_units`  | Non       | Si `type` est défini sur **journald**, il s'agit de la liste des unités journald spécifiques à exclure.                                                                                                                                                                                                                                                                              |
| `sourcecategory` | Non       | Un attribut à valeur multiple utilisé pour préciser l'attribut source, par exemple : `source:mongodb, sourcecategory:db_slow_logs`.                                                                                                                                                                                                                         |
| `tags`           | Non       | Une liste de tags ajoutés à chaque log recueilli ([en savoir plus sur le tagging][9]).                                                                                                                                                                                                                                                                                    |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/agent/guide/agent-configuration-files
[3]: /fr/agent/kubernetes/daemonset_setup/#log-collection
[4]: /fr/agent/docker/log
[5]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: /fr/agent/guide/agent-commands/#agent-status-and-information
[7]: /fr/tracing
[8]: /fr/developers/metrics/custom_metrics
[9]: /fr/tagging