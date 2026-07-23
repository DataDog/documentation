---
description: Résoudre les problèmes de configuration de Database Monitoring pour Oracle
title: Résoudre les problèmes de configuration DBM pour Oracle
---

Cette page détaille les problèmes courants liés à la configuration et à l'utilisation de Database Monitoring avec Oracle, ainsi que leur résolution. Datadog recommande d'utiliser la dernière version stable de l'Agent et de suivre la dernière [documentation de configuration][1], car celle-ci peut évoluer avec les nouvelles versions de l'Agent.

## Problèmes courants

### Erreur "Connection refused"
Vérifiez la connectivité entre l'Agent et la base de données surveillée en exécutant l'une de ces commandes sur la machine où l'Agent s'exécute, puis examinez les erreurs éventuelles :

- `nc -v <DB_SERVER> <PORT>`
- `curl <DB_SERVER>:<PORT>`
- `telnet <DB_SERVER> <PORT>`

Il est important de spécifier les valeurs exactes de `<DB_SERVER>` et `<PORT>` configurées pour cette instance dans le fichier de configuration `oracle`.

En prenant la commande `telnet` comme exemple, la sortie attendue pour une connexion correctement configurée est la suivante :

{{< code-block lang="text" disable_copy="true" collapsible="true" >}}
Trying <DB_SERVER_IP_ADDRESS>...
Connected to <DB_SERVER_NAME>.
Escape character is '^]'.
{{< /code-block >}}

### Les requêtes custom ne fonctionnent pas correctement
Vérifiez que la [version de l'Agent recommandée][2] pour votre type d'hébergement est installée.

### La requête de plan d'exécution prend plusieurs secondes
Vérifiez que la [version de l'Agent recommandée][2] pour votre type d'hébergement est installée.

### Fuite de mémoire PGA ou de tablespace temporaire
Vérifiez que la [version de l'Agent recommandée][2] pour votre type d'hébergement est installée.

### Erreur "Table or view does not exist" dans `agent.log`
Exécutez les instructions d'octroi d'autorisations indiquées à l'étape **Accorder les autorisations** des [instructions de configuration][3] pour votre type d'hébergement.

### Aucun nom d'hôte Oracle DB signalé

L'Agent Datadog détecte le nom d'hôte Oracle DB en exécutant une commande SQL contre [V$INSTANCE][4].
Lorsqu'une base de données Oracle renvoie `null` pour la colonne `HOST_NAME`, l'Agent Datadog signale le nom d'hôte Oracle DB comme vide. Ce comportement a été confirmé avec Oracle Autonomous Database.
Dans ce cas, Datadog recommande de définir le paramètre `reported_hostname` dans le fichier `conf.yaml`.

[1]: /fr/database_monitoring/setup_oracle/
[2]: /fr/database_monitoring/setup_oracle#recommended-agent-version
[3]: /fr/database_monitoring/setup_oracle#setup
[4]: https://docs.oracle.com/en/database/oracle/oracle-database/23/refrn/V-INSTANCE.html