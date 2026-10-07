---
aliases:
- /fr/agent/faq/how-to-get-more-logging-from-the-agent
- /fr/agent/faq/agent-5-container-more-log
further_reading:
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentation
  text: Envoyer un flare de l'Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentation
  text: Obtenir le statut d'un check de l'Agent
title: Mode debugging
---

## Section Overview

Par défaut, le niveau de log de l'Agent est défini sur `INFO`. Pour obtenir plus d'informations à partir de vos logs, définissez le niveau de log sur `DEBUG`.

**Remarque** : le mode debug doit uniquement être utilisé à des fins de debugging. Datadog vous recommande d'activer uniquement `DEBUG` pendant une certaine période, car cela entraîne une hausse du nombre de logs indexés. Redéfinissez le niveau de log sur `INFO` une fois votre debugging terminé.

Pour activer le mode debugging complet de l'Agent :

1. Modifiez votre fichier `datadog.yaml` local. Consultez la section [Fichier de configuration principal de l'Agent][1] pour obtenir des détails propres à votre système d'exploitation.

2. Remplacez `# log_level: INFO` par `log_level: DEBUG` (effacez le caractère `#` pour supprimer la mise en commentaire de la ligne).

3. Redémarrez l'Agent Datadog. Consultez la section [Commandes de l'Agent][2] pour obtenir des détails propres à votre système d'exploitation.

4. Attendez quelques minutes pour générer quelques logs. Consultez la section [Fichiers de log de l'Agent][3] pour obtenir des détails propres à votre système d'exploitation.

## Agent conteneurisé

Pour activer le mode debugging pour l'Agent de conteneur, utilisez `DD_LOG_LEVEL=debug` lors du démarrage de l'Agent.

À partir des versions 6.19/7.19 de l'Agent, définissez le niveau de journalisation de l'Agent pendant son exécution, à l'aide de la commande suivante :

``shell
agent config set log_level debug
```

Vous **ne pouvez pas** modifier le niveau de log du conteneur `trace-agent` à l'exécution, contrairement au conteneur `agent`. Un redéploiement reste nécessaire après avoir défini la variable `DD_LOG_LEVEL` sur `debug` pour le conteneur `trace-agent` dédié.

Si vous utilisez [**Helm**][4], remplacez `logLevel: INFO` par `logLevel: DEBUG` dans votre fichier `datadog-values.yaml`, puis redéployez.

## Niveau de journalisation de l'Agent

Les niveaux de journalisation de l'Agent suivants sont disponibles pour `log_level` ou `DD_LOG_LEVEL` :

| Option     | Logs critiques | Logs d'erreur | Logs d'avertissement | Logs d'information | Logs de debugging | Logs de trace |
|------------|---------------|------------|-----------|-----------|------------|------------|
| `'OFF'`      |               |            |           |           |            |            |
| `'CRITICAL'` | {{< X >}}     |            |           |           |            |            |
| `'ERROR'`    | {{< X >}}     | {{< X >}}  |           |           |            |            |
| `'WARN'`     | {{< X >}}     | {{< X >}}  | {{< X >}} |           |            |            |
| `'INFO'`     | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} |            |            |
| `'DEBUG'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  |            |
| `'TRACE'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  |

**Remarque** : lorsque vous paramétrez le niveau du log sur `'OFF'` dans le fichier de configuration, vous devez ajouter des guillemets pour éviter que la valeur ne soit analysée de façon incorrecte. Les guillemets sont facultatifs pour les autres niveaux de log.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
[3]: /fr/agent/configuration/agent-log-files/
[4]: https://github.com/DataDog/helm-charts/blob/637472f105f42e8b444981ea2a38e955161c8e3a/charts/datadog/values.yaml#L125