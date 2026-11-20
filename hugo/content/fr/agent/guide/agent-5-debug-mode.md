---
private: true
title: Mode débogage de l'Agent 5
---

## Section Overview

Par défaut, le niveau de log de l'Agent est défini sur `INFO`. Pour obtenir plus d'informations à partir de vos logs, définissez le niveau de log sur `DEBUG`.

**Remarque** : le mode debug doit uniquement être utilisé à des fins de debugging. Datadog vous recommande d'activer uniquement `DEBUG` pendant une certaine période, car cela entraîne une hausse du nombre de logs indexés. Redéfinissez le niveau de log sur `INFO` une fois votre debugging terminé.

Pour activer le mode debugging complet de l'Agent :

1. Modifiez votre fichier `datadog.conf` local. Consultez la section [Fichier de configuration principal de l'Agent][1] pour obtenir des détails propres à votre système d'exploitation.
2. Remplacez `# log_level: INFO` par `log_level: DEBUG` (effacez le caractère `#` pour supprimer la mise en commentaire de la ligne).
3. Redémarrez l'Agent Datadog. Consultez la section [Commandes de l'Agent][2] pour obtenir des détails propres à votre système d'exploitation.
4. Attendez quelques minutes pour générer quelques logs. Consultez la section [Fichiers de log de l'Agent][3] pour obtenir des détails propres à votre système d'exploitation.

## Agent conteneurisé

Lorsqu'il est exécuté dans un conteneur, l'Agent ne peut pas être redémarré avec `service datadog-agent restart` (ou similaire), ce qui entraîne l'arrêt du conteneur par Docker. Utilisez supervisor pour redémarrer un Agent conteneurisé :

```text
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

Avec les commandes suivantes, activez la journalisation de débogage, redémarrez l'Agent, attendez 60 secondes, puis envoyez un flare, dans cet ordre :

```shell
sed -i '/\[Main\]/a LOG_LEVEL=DEBUG' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
sleep 60
/etc/init.d/datadog-agent flare <ID_TICKET>
```

Les logs de debugging peuvent être désactivés avec :

```shell
sed -i '/LOG_LEVEL=DEBUG/d' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

Le conteneur peut également être redémarré.

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

**Remarque** : lors de la définition du niveau de log sur `'OFF'` dans le fichier de configuration, les guillemets sont obligatoires pour éviter que la valeur ne soit mal analysée. Les guillemets sont facultatifs pour les autres niveaux de log.

[1]: /fr/agent/guide/agent-5-configuration-files/
[2]: /fr/agent/guide/agent-5-commands/
[3]: /fr/agent/guide/agent-5-log-files/