---
disable_toc: false
private: true
title: Dépanner un check de l'Agent sur l'Agent 5
---

Cette page couvre le dépannage d'un check de l'Agent sur l'Agent 5. Pour obtenir des informations sur la dernière version de l'Agent, consultez la section [Dépanner un check de l'Agent][4].

Si vous rencontrez des problèmes avec un check de l'Agent, utilisez ces commandes pour obtenir plus d'informations de dépannage.

**Remarques** : 
- Remplacez `<CHECK_NAME>` dans les exemples ci-dessous par n'importe quel check de l'Agent. Par exemple : `activemq`, `ceph` ou `elastic`. Consultez la [documentation d'une intégration][1] pour confirmer le nom du check de l'Agent.
- Pour désactiver temporairement un check de service pendant le dépannage, renommez `/conf.d/<CHECK_NAME>.d/conf.yaml` en quelque chose d'autre que l'extension de fichier `.yaml` ou `.yml`, comme `conf.yaml.disable`.

## Linux

Pour tester un check de l'Agent, exécutez :

```shell
sudo -u dd-agent dd-agent check <NOM_CHECK>
```

Remplacez `<NOM_CHECK>` par n'importe quel check de l'Agent. Par exemple : `activemq`, `ceph` ou `elastic`. Consultez la [documentation de l'intégration][1] pour vérifier le nom du check de l'Agent.

Si vous souhaitez inclure des métriques rate, ajoutez `--check-rate` à votre commande. Par exemple, pour l'Agent v6.x, exécutez :

```shell
sudo -u dd-agent dd-agent check <NOM_CHECK> --check-rate
```

Si votre problème persiste, [contactez l'équipe d'assistance Datadog][2] avec un [flare][3].

## Windows

{{< tabs >}}
{{% tab "Agent v<=5.11" %}}

L'installation de l'Agent inclut un fichier appelé `shell.exe` dans votre répertoire `Program Files` pour l'Agent Datadog. Ce fichier peut être utilisé pour exécuter Python dans l'environnement de l'Agent. Une fois votre check (appelé `<CHECK_NAME>`) écrit et les fichiers `.py` et `.yaml` aux bons emplacements, exécutez la commande suivante dans shell.exe :

```python
from checks import run_check
run_check('<NOM_CHECK>')
```

Cela permet d'afficher toutes les métriques ou tous les événements que le check renvoie.

{{% /tab %}}
{{% tab "Agent v>=5.12" %}}

Exécutez le script suivant depuis une ligne de commande PowerShell avec **élévation des privilèges** (en tant qu'administrateur), en utilisant le `<NOM_CHECK>` approprié :

`<RÉPERTOIRE_INSTALLATION>/embedded/python.exe <RÉPERTOIRE_INSTALLATION>agent/agent.py check <NOM_CHECK>`

Par exemple, pour exécuter le check Disk :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" check disk
```

{{% /tab %}}
{{< /tabs >}}

## Systemd

Pour les systèmes utilisant `systemd`, utilisez `journalctl` pour faciliter le débogage.

La commande suivante affiche le statut de l'Agent Datadog.

```shell
sudo systemctl status dd-agent
```

Si l'Agent ne parvient pas à démarrer et qu'aucune information supplémentaire n'est fournie, utilisez la commande suivante pour afficher tous les logs du service de l'Agent Datadog. Si nécessaire, utilisez `-r` pour imprimer les logs dans l'ordre inverse.

```shell
sudo journalctl -u dd-agent.service
```

[1]: /fr/integrations/
[2]: /fr/help
[3]: /fr/agent/guide/agent-5-flare/
[4]: /fr/agent/troubleshooting/agent_check_status