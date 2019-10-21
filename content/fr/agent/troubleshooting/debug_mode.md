---
title: Mode debugging
kind: documentation
disable_toc: true
aliases:
  - /fr/agent/faq/how-to-get-more-logging-from-the-agent
  - /fr/agent/faq/agent-5-container-more-log
further_reading:
  - link: /agent/troubleshooting/send_a_flare
    tag: Dépannage de l'Agent
    text: Envoyer un flare de l'Agent
  - link: /agent/troubleshooting/agent_check_status
    tag: Dépannage de l'Agent
    text: Obtenir le statut d'un check de l'Agent
---
## Agent

Pour activer le mode debugging complet de l'Agent :

{{< tabs >}}
{{% tab "Agent v6" %}}

1. Modifiez votre fichier `datadog.yaml` local. Consultez la section [Fichier de configuration principal de l'Agent][1] pour obtenir des détails propres à votre système d'exploitation.

2. Remplacez `# log_level: INFO` par `log_level: DEBUG` (effacez le caractère `#` pour supprimer la mise en commentaire de la ligne).

3. Redémarrez l'Agent Datadog. Consultez la section [Commandes de l'Agent][2] pour obtenir des détails propres à votre système d'exploitation.

4. Attendez quelques minutes pour générer quelques logs. Consultez la section [Fichiers de log de l'Agent][3] pour obtenir des détails propres à votre système d'exploitation.

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[3]: /fr/agent/guide/agent-log-files/?tab=agentv6
{{% /tab %}}
{{% tab "Agent v5" %}}

1. Modifiez votre fichier `datadog.conf` local. Consultez la section [Fichier de configuration principal de l'Agent][1] pour obtenir des détails propres à votre système d'exploitation.

2. Remplacez `# log_level: INFO` par `log_level: DEBUG` (effacez le caractère `#` pour supprimer la mise en commentaire de la ligne).

3. Redémarrez l'Agent Datadog. Consultez la section [Commandes de l'Agent][2] pour obtenir des détails propres à votre système d'exploitation.

4. Attendez quelques minutes pour générer quelques logs. Consultez la section [Fichiers de log de l'Agent][3] pour obtenir des détails propres à votre système d'exploitation.

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv5#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/?tab=agentv5#restart-the-agent
[3]: /fr/agent/guide/agent-log-files/?tab=agentv5
{{% /tab %}}
{{< /tabs >}}

## Agent conteneurisé

{{< tabs >}}
{{% tab "Agent v6" %}}

**Définissez la variable d'environnement `DD_LOG_LEVEL=debug` lors du démarrage de votre Agent.**

Si votre conteneur s'exécute déjà :

1. Pour empêcher le redémarrage de votre processus par S6, exécutez :

    `rm /var/run/s6/services/agent/finish`

2. Puis arrêtez l'Agent :

    ```
    s6-svc -d /var/run/s6/services/agent/
    ```

3. Redémarrez alors l'Agent en mode debugging en exécutant :

    ```
    DD_LOG_LEVEL=debug agent start
    ```

{{% /tab %}}
{{% tab "Agent v5" %}}

Lorsqu'il s'exécute dans un conteneur, l'Agent ne peut pas redémarrer via `service datadog-agent restart` (ou semblable), ce qui entraîne l'arrêt du conteneur par Docker. Utilisez supervisor pour redémarrer un Agent conteneurisé :

```
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

Les commandes suivantes permettent d'activer les logs de debugging, de redémarrer l'Agent, d'attendre 60 secondes puis d'envoyer un flare, dans cet ordre :

```
sed -i '/\[Main\]/a LOG_LEVEL=DEBUG' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
sleep 60
/etc/init.d/datadog-agent flare <ID_TICKET>
```

Les logs de debugging peuvent être désactivés avec :

```
sed -i '/LOG_LEVEL=DEBUG/d' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

Le conteneur peut également être redémarré.

{{% /tab %}}
{{< /tabs >}}

## Niveau de log de l'Agent

Les niveaux de log de l'Agent suivants sont disponibles pour `log_level` ou `DD_LOG_LEVEL` :

| Option  | Logs critiques | Logs d'erreur | Logs d'avertissement | Logs d'information | Logs de debugging | Logs de trace | Tous les logs  |
|---------|------------|------------|-----------|-----------|------------|------------|-----------|
| `OFF`   |            |            |           |           |            |            |           |
| `FATAL` | {{< X >}}  |            |           |           |            |            |           |
| `ERROR` | {{< X >}}  | {{< X >}}  |           |           |            |            |           |
| `WARN`  | {{< X >}}  | {{< X >}}  | {{< X >}} |           |            |            |           |
| `INFO`  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |            |            |           |
| `DEBUG` | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  |            |           |
| `TRACE` | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  |           |
| `ALL`   | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}