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
Un flare vous permet d'envoyer les informations de dépannage nécessaires à l'équipe de support de Datadog.

Cette page couvre :
- [Envoyer un flare en utilisant la commande `flare`](#send-a-flare-using-the-flare-command).
- [Envoyer un flare depuis le site Datadog](#send-a-flare-from-the-datadog-site) en utilisant Remote Configuration.
- [Soumission manuelle](#manual-submission).

Une flare rassemble tous les fichiers de configuration et journaux de l'Agent dans un fichier d'archive. Elle supprime les informations sensibles, y compris les mots de passe, les clés API, les identifiants de proxy et les chaînes de communauté SNMP. Si APM est activé, le flare inclut [les journaux de débogage du traceur][4] lorsqu'ils sont disponibles.

L'Agent Datadog est entièrement open source, ce qui vous permet de [vérifier le comportement du code][1]. Si nécessaire, le flare peut être examiné avant l'envoi, car le flare demande une confirmation avant de le téléverser.

Lorsque vous contactez Datadog Support avec Remote Configuration activée pour un Agent, l'équipe de support peut initier un flare depuis votre environnement afin de mieux vous aider dans les meilleurs délais. Les flares fournissent des informations de dépannage au support Datadog pour vous aider à résoudre votre problème. 

## Envoyer un flare depuis le site Datadog {#send-a-flare-from-the-datadog-site}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">L'envoi d'un flare d'Agent depuis Fleet Automation n'est pas pris en charge pour votre site Datadog sélectionné ({{< region-param key="dd_datacenter" >}}). Utilisez <a href="#manual-submission">la soumission manuelle de flare</a> à la place.</div>
{{< /site-region >}}

Pour envoyer un flare depuis le site Datadog, assurez-vous d'avoir activé [Fleet Automation][2] et [Remote Configuration][3] sur l'Agent.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Le bouton Envoyer un ticket lance un formulaire pour envoyer un flare pour un ticket de support existant ou nouveau." style="width:70%;" >}}

## Envoyer un flare en utilisant la commande `flare` {#send-a-flare-using-the-flare-command}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Envoyer un flare d'Agent en utilisant le <code>flare</code> la sous-commande n'est pas prise en charge pour votre site Datadog sélectionné ({{< region-param key="dd_datacenter" >}}). Utilisez <a href="#manual-submission">la soumission manuelle de flare</a> à la place.</div>
{{< /site-region >}}

Utilisez la sous-commande `flare` pour envoyer un flare. Dans les commandes ci-dessous, remplacez `<CASE_ID>` par votre identifiant de cas de support Datadog si vous en avez un, puis entrez l'adresse e-mail associée.

Si vous n'avez pas d'identifiant de cas, entrez votre adresse e-mail utilisée pour vous connecter à Datadog afin de créer un nouveau cas de support.

**Confirmez le téléversement de l'archive pour l'envoyer immédiatement au support Datadog**.

{{< tabs >}}
{{% tab "Agent" %}}

| Plateforme   | Commande                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` ou via le [web GUI][1] |
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes | `kubectl exec -it <AGENT_POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| Source     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | `& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>`       |
| Heroku     | Consultez la [Heroku documentation][3]         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## Conteneurs dédiés {#dedicated-containers}

Lors de l'utilisation de l'Agent v7.19+ et du Datadog Helm Chart avec la [dernière version][4] ou d'un DaemonSet où l'Agent Datadog et le Trace Agent se trouvent dans des conteneurs séparés, vous déployez un Pod Agent contenant :

* Un conteneur avec le processus de l'Agent (Agent + Log Agent)
* Un conteneur avec le processus process-agent
* Un conteneur avec le processus trace-agent
* Un conteneur avec le processus system-probe

Pour obtenir un flare de chaque container, exécutez les commandes suivantes :

### Agent {#agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c agent -- agent flare <CASE_ID>
```

### Process Agent {#process-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### Agent de Trace {#trace-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```

### Security Agent {#security-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c security-agent -- security-agent flare <CASE_ID>
```

### System probe {#system-probe}

Le conteneur system-probe ne peut pas envoyer de flare. Vous devez donc récupérer les logs de conteneur :

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

## ECS Fargate {#ecs-fargate}

Lors de l'utilisation de la plateforme ECS Fargate v1.4.0, les tâches et services ECS peuvent être configurés pour permettre l'accès aux conteneurs Linux en cours d'exécution en activant [Amazon ECS Exec][5]. Après avoir activé Amazon ECS Exec, exécutez la commande suivante pour envoyer un flare:

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

**Remarque :** ECS Exec ne peut être activé que pour de nouvelles tâches. Vous devez recréer les tâches existantes pour utiliser ECS Exec.

[1]: /fr/agent/basic_agent_usage/#gui
[2]: /fr/agent/basic_agent_usage/windows/#agent-v6
[3]: /fr/agent/guide/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}

{{% tab "Cluster Agent" %}}

| Plateforme      | Commande                                                                     |
|---------------|-----------------------------------------------------------------------------|
| Kubernetes    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## Soumission manuelle {#manual-submission}

Le protocole de flare de l'Agent collecte les configurations et les journaux dans un fichier d'archive situé d'abord dans le répertoire local `/tmp`.
Obtenez ce fichier manuellement et fournissez-le au support s'il y a des problèmes de connectivité avec l'Agent.

### Kubernetes {#kubernetes}
Pour obtenir le fichier d'archive dans Kubernetes, utilisez la commande kubectl :

```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /fr/agent/fleet_automation/
[3]: /fr/agent/guide/setup_remote_config
[4]: /fr/tracing/troubleshooting/tracer_debug_logs/?code-lang=dotnet#data-collected