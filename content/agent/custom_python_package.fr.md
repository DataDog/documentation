---
title: Ajouter d'un package python personnalisé à l'agent
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collectez vos logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collectez vos processus
- link: "tracing"
  tag: "Documentation"
  text: Collectez vos traces
---


### Linux

La version python intégrée à l'agent se trouve ici: `/opt/datadog-agent/embedded/bin/python`.
L'agent vient également avec pip, installer les bibliothèques python en utilisant:

```bash
sudo /opt/datadog-agent/embedded/bin/pip install <package_name>
```

### Windows

Les packages python custom peuvent être installés à l'aide de l'Agent avec la commande suivante dans Powershell:

```
C:\"Program Files"\Datadog\"Datadog Agent"\embedded\python -m install <package_name>
```

Ou le package peut être ajouté dans le dossier compressé de la bibliothèque qui peut être trouvé à
```
C:\Program Files (x86)\Datadog\Datadog Agent\files
```
puis [redémarrez votre Agent](/agent/basic_agent_usage/windows).

{{< img src="agent/windows_python_package.png" alt="windows python package" responsive="true" popup="true">}}

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}