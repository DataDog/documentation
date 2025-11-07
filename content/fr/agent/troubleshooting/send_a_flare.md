---
algolia:
  tags:
  - agent flare
aliases:
- /fr/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentation
  text: Mode debugging de l'Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentation
  text: Obtenir le statut d'un check de l'Agent
title: Commande flare de l'Agent
---

Un flare vous permet d'envoyer les informations nécessaires au dépannage à l'équipe de support Datadog.

Cette page explique comment :
- [Envoyer un flare avec la commande `flare`](#envoyer-un-flare-avec-la-commande-flare).
- [Envoyer un flare depuis le site Datadog](#envoyer-un-flare-depuis-le-site-datadog) en utilisant la configuration à distance.
- [Effectuer une soumission manuelle] (#fffectuer-une-soumission-manuelle).

Un flare rassemble tous les fichiers de configuration et les logs de l'Agent Datadog dans un fichier d'archive. Il supprime les informations sensibles, y compris les mots de passe, clés d'API, identifiants Proxy et chaînes de communauté SNMP. Si la solution APM de Datadog est activée, le flare inclut les [logs de débogage du traceur][4] lorsqu'ils sont disponibles.

L'Agent Datadog est entièrement open source, ce qui vous permet de [vérifier le comportement du code][1]. Une demande de confirmation s'affiche avant l'envoi des informations, ce qui signifie que vous pouvez les passer en revue si vous le souhaitez.

Lorsque vous contactez l'assistance Datadog avec la configuration à distance activée pour un Agent, l'équipe d'assistance peut initier un flare depuis votre environnement afin de mieux vous aider dans les plus brefs délais. Les flares fournissent à l'assistance Datadog des informations de diagnostic pour vous aider à résoudre votre problème.

## Envoyer un flare depuis le site Datadog

{{< site-region region="gov" >}}
<div class='alert alert-warning'>L'envoi d'un flare d'Agent depuis Fleet Automation n'est pas pris en charge pour ce site.</div>
{{< /site-region >}}

Pour envoyer un flare depuis le site Datadog, assurez-vous d'avoir activé [Fleet Automation][2] et la [configuration à distance][3] sur l'Agent.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Le bouton Send Ticket ouvre un formulaire pour envoyer un flare dans le cadre d'un ticket d'assistance existant ou nouveau" style="width:70%;" >}}

## Envoyer un flare à l'aide de la commande `flare`

Utilisez la sous-commande `flare` pour envoyer un flare. Dans les commandes ci-dessous, remplacez `<CASE_ID>` par l'identifiant de votre ticket d'assistance Datadog si vous en avez un, puis saisissez l'adresse e-mail associée.

Si vous ne disposez pas d'un identifiant de ticket, saisissez l'adresse e-mail utilisée pour vous connecter à Datadog afin de créer un nouveau ticket d'assistance.

**Confirmez le téléversement de l'archive pour l'envoyer immédiatement à l'assistance Datadog**.

{{< tabs >}}
{{% tab "Agent" %}}

| Plateforme   | Commande                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <ID_TICKET>`                         |
| Docker     | `docker exec -it dd-agent agent flare <ID_TICKET>`        |
| macOS      | `datadog-agent flare <ID_TICKET>` ou via l'[interface Web][1] |
| CentOS     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Debian     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Kubernetes | `kubectl exec -it <AGENT_POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Redhat     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Suse       | `sudo datadog-agent flare <ID_TICKET>`                    |
| Source     | `sudo datadog-agent flare <ID_TICKET>`                    |
| Windows    | `& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>`       |
| Heroku     | Consultez la [documentation relative à Heroku][3]         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <ID_TICKET>`             |

## Conteneurs dédiés

Si vous utilisez l'Agent v7.19 ou version ultérieure ainsi que le chart Helm Datadog avec la [dernière version][4], ou un DaemonSet dans lequel l'Agent Datadog et l'Agent de trace sont dans des conteneurs séparés, vous déployez un pod de l'Agent qui contient :

* Un conteneur avec le processus Agent (Agent + Agent de log)
* Un conteneur avec le processus process-agent
* Un conteneur avec le processus trace-agent
* Un conteneur avec le processus system-probe

Pour obtenir un flare de chaque container, exécutez les commandes suivantes :

### Agent

```bash
kubectl exec -it <NOM_POD_AGENT> -c agent -- agent flare <ID_TICKET>
```

### Agent de processus

```bash
kubectl exec -it <NOM_POD_AGENT> -c process-agent -- agent flare <ID_TICKET> --local
```

### Agent de trace

```bash
kubectl exec -it <NOM_POD_AGENT> -c trace-agent -- agent flare <ID_TICKET> --local
```

### Agent de sécurité

```bash
kubectl exec -it <NOM_POD_AGENT> -c security-agent -- security-agent flare <ID_TICKET>
```

### System probe

Le conteneur system-probe ne peut pas envoyer de flare. Vous devez donc récupérer les logs de conteneur :

```bash
kubectl logs <NOM_POD_AGENT> -c system-probe > system-probe.log
```

## ECS Fargate

Si vous utilisez la plateforme ECS Fargate v1.4.0, vous pouvez configurer les tâches et services ECS afin d'autoriser l'accès aux conteneurs Linux en cours d'exécution en activant [Amazon ECS Exec][5]. Une fois Amazon ECS Exec activé, exécutez la commande suivante pour envoyer un flare :

```bash
aws ecs execute-command --cluster <NOM_CLUSTER> \
    --task <ID_TÂCHE> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <ID_TICKET>"
```

**Remarque :** ECS Exec ne peut être activé que pour de nouvelles tâches. Vous devez recréer les tâches existantes pour utiliser ECS Exec.

[1]: /fr/agent/basic_agent_usage/#gui
[2]: /fr/agent/basic_agent_usage/windows/#agent-v6
[3]: /fr/agent/guide/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}

{{% tab "Agent de cluster" %}}

| Plateforme      | Commande                                                                     |
|---------------|-----------------------------------------------------------------------------|
| Kubernetes    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <ID_TICKET>` |

{{% /tab %}}
{{< /tabs >}}

## Envoi manuel

Le protocole flare de l'Agent recueille les configurations et les logs dans un fichier d'archive situé dans le répertoire `/tmp` local.
Récupérez manuellement ce fichier et envoyez-le à l'équipe d'assistance si l'Agent rencontre des problèmes de connectivité.

### Kubernetes
Pour récupérer le fichier d'archive dans Kubernetes, utilisez la commande kubectl :
```
kubectl cp datadog-<nom-pod>:tmp/datadog-agent-<date-du-flare>.zip flare.zip -c agent
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /fr/agent/fleet_automation/
[3]: /fr/agent/guide/setup_remote_config
[4]: /fr/tracing/troubleshooting/tracer_debug_logs/?code-lang=dotnet#data-collected