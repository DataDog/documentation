---
title: Commande flare de l'Agent
kind: documentation
aliases:
  - /fr/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
  - link: /agent/troubleshooting/debug_mode/
    tag: Dépannage de l'Agent
    text: Mode debugging de l'Agent
  - link: /agent/troubleshooting/agent_check_status/
    tag: Dépannage de l'Agent
    text: Obtenir le statut d'un check de l'Agent
---
Si vous utilisez l'Agent 5.3+, vous pouvez envoyer les informations de dépannage nécessaires à l'équipe d'assistance Datadog avec une seule commande flare.

La commande `flare` rassemble tous les fichiers de configuration et tous les logs de l'Agent dans un fichier d'archive. Elle supprime les informations sensibles, y compris les mots de passe, les clés d'API, les authentifiants de proxy et les chaînes de communauté SNMP. **Confirmez l'importation de l'archive pour l'envoyer immédiatement à l'assistance Datadog**.

L'Agent Datadog est entièrement open source, ce qui vous permet de [vérifier le comportement du code][1]. Une demande de confirmation s'affiche avant l'envoi des informations, ce qui signifie que vous pouvez les passer en revue si vous le souhaitez.

Dans les commandes ci-dessous, remplacez `<ID_TICKET>` par l'ID de votre ticket d'assistance Datadog (le cas échéant), puis saisissez l'adresse e-mail associée.

Si vous ne disposez pas d'un ID de ticket, saisissez simplement l'adresse e-mail que vous utilisez pour vous connecter à Datadog afin de créer un ticket d'assistance.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plateforme   | Commande                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <ID_TICKET>`                         |
| Docker     | `docker exec -it datadog-agent agent flare <ID_TICKET>`   |
| macOS      | `datadog-agent flare <ID_TICKET>` ou via l'[interface Web][1] |
| CentOS     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Debian     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Kubernetes | `kubectl exec <NOM_POD> -it agent flare <ID_TICKET>`     |
| Fedora     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Redhat     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Suse       | `sudo datadog-agent flare <ID_TICKET>`                    |
| Source     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Windows    | Consultez la [documentation relative à Windows][2]        |
| Heroku     | Consultez la [documentation relative à Heroku][3]         |

## Conteneurs dédiés

Si vous utilisez l'Agent v7.19 ou version ultérieure ainsi que le chart Helm Datadog avec la [dernière version][4], ou un DaemonSet dans lequel l'Agent Datadog et l'Agent de trace sont dans des conteneurs séparés, vous déploierez un pod de l'Agent qui contient :

* Un conteneur avec le processus Agent (Agent + Agent de log)
* Un conteneur avec le processus process-agent
* Un conteneur avec le processus trace-agent
* Un conteneur avec le processus system-probe

Pour obtenir un flare de chaque container, exécutez les commandes suivantes :

### Agent

```bash
kubectl exec -it <agent-pod-name> -c agent -- agent flare <case-id>
```

### Agent de processus

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### Agent de trace

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```

### System probe

Le conteneur system-probe ne peut pas envoyer de flare. Vous devez donc récupérer les logs de conteneur :

```bash
kubectl logs <NOM_POD_AGENT> -c system-probe > system-probe.log
```

[1]: /fr/agent/basic_agent_usage/#gui
[2]: /fr/agent/basic_agent_usage/windows/#agent-v6
[3]: /fr/agent/faq/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme   | Commande                                                                 |
|------------|-------------------------------------------------------------------------|
| Docker     | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <ID_TICKET>`    |
| macOS      | `datadog-agent flare <ID_TICKET>`                                         |
| CentOS     | `sudo service datadog-agent flare <ID_TICKET>`                            |
| Debian     | `sudo service datadog-agent flare <ID_TICKET>`                            |
| Kubernetes | `kubectl exec <NOM_POD> -it /etc/init.d/datadog-agent flare <ID_TICKET>` |
| Fedora     | `sudo service datadog-agent flare <ID_TICKET>`                            |
| Redhat     | `sudo service datadog-agent flare <ID_TICKET>`                            |
| SUSE       | `sudo service datadog-agent flare <ID_TICKET>`                            |
| Source     | `sudo ~/.datadog-agent/bin/agent flare <ID_TICKET>`                       |
| Windows    | Consultez la [documentation relative à Windows][1]                        |

**Remarque** : si vous utilisez un système basé sur Linux et que la commande `service` wrapper n'est pas disponible, [consultez la liste des alternatives][2].

[1]: /fr/agent/basic_agent_usage/windows/#agent-v5
[2]: /fr/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
{{% /tab %}}

{{% tab "Agent de cluster" %}}

| Plateforme   | Commande                                                             |
|------------|---------------------------------------------------------------------|
| Kubernetes | `kubectl exec <NOM_POD> -it datadog-cluster-agent flare <ID_TICKET>` |

{{% /tab %}}
{{< /tabs >}}

## Envoi manuel

Le protocole flare de l'Agent recueille les configurations et les logs dans un fichier d'archive situé dans le répertoire `/tmp` local.
Récupérez manuellement ce fichier et envoyez-le à l'équipe d'assistance si l'Agent rencontre des problèmes de connectivité.

### Kubernetes
Pour récupérer le fichier d'archive dans Kubernetes, utilisez la commande kubectl :
```
kubectl cp datadog-<nom-pod>:/tmp/datadog-agent-<date-du-flare>.zip flare.zip
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-agent/blob/master/utils/flare.py