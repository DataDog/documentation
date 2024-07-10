---
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Dépannage de l'Agent
  text: Mode debugging de l'Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Dépannage de l'Agent
  text: Envoyer un flare avec l'Agent
title: Statut d'un check de l'Agent
---

En cas de problème avec l'un des checks de l'Agent, utilisez ces commandes pour votre système d'exploitation pour obtenir plus d'informations de dépannage :

- [Linux](#linux)
- [Windows](#windows)
- [Systemd](#systemd)
- [Pour aller plus loin](#pour-aller-plus-loin)

**Remarque** : remplacez `<NOM_CHECK>` dans les exemples ci-dessous par n'importe quel check de l'Agent. Par exemple : `activemq`, `ceph` ou `elastic`. Consultez la [documentation de l'intégration][1] pour vérifier le nom du check de l'Agent.

**Remarque** : pour désactiver temporairement un check de service lors du dépannage, renommez `/conf.d/<NOM_CHECK>.d/conf.yaml` de façon à utiliser une extension de fichier autre `.yaml` ou `.yml`, par exemple `conf.yaml.disable`.

## Linux

Pour tester un check de l'Agent, exécutez :

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

```shell
sudo -u dd-agent datadog-agent check <NOM_CHECK>
```

Si vous souhaitez inclure des métriques rate, ajoutez `--check-rate` à votre commande. Par exemple, pour l'Agent v6.x, exécutez :

```shell
sudo -u dd-agent datadog-agent check <NOM_CHECK> --check-rate
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo -u dd-agent dd-agent check <NOM_CHECK>
```

Remplacez `<NOM_CHECK>` par n'importe quel check de l'Agent. Par exemple : `activemq`, `ceph` ou `elastic`. Consultez la [documentation de l'intégration][4] pour vérifier le nom du check de l'Agent.

Si vous souhaitez inclure des métriques rate, ajoutez `--check-rate` à votre commande. Par exemple, pour l'Agent v6.x, exécutez :

```shell
sudo -u dd-agent dd-agent check <NOM_CHECK> --check-rate
```

{{% /tab %}}
{{< /tabs >}}

Si le problème persiste, [contactez l'équipe d'assistance Datadog][1] en envoyant un [flare][2].

## Windows

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

Exécutez le script suivant depuis une ligne de commande PowerShell avec **élévation des privilèges** (en tant qu'administrateur), en utilisant le `<NOM_CHECK>` approprié :

Pour les versions >= 6.12 de l'Agent :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check <NOM_CHECK>
```

Pour les versions <= 6.11 de l'Agent :
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\agent.exe" check <NOM_CHECK>
```

{{% /tab %}}
{{% tab "Agent v<=5.11" %}}

L'installation de l'Agent inclut un fichier appelé `shell.exe` dans votre répertoire `Program Files` pour l'Agent Datadog. Ce fichier peut être utilisé pour exécuter Python dans l'environnement de l'Agent. Une fois que votre check (appelé `<NOM_CHECK>`) est écrit et que les fichiers `.py` et `.yaml` sont aux emplacements appropriés, exécutez la commande shell.exe suivante :

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

Pour les [systèmes qui utilisent systemd][3], utilisez `journalctl` pour faciliter le debugging.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
La commande suivante affiche le statut de l'Agent Datadog.

```shell
sudo systemctl status datadog-agent
```

Si l'Agent ne parvient pas à démarrer et qu'aucune information supplémentaire n'est fournie, utilisez la commande suivante pour afficher l'ensemble des logs associés au service de l'Agent Datadog. Utilisez `-r` pour afficher les logs dans l'ordre inverse si vous le souhaitez.

```shell
sudo journalctl -u datadog-agent.service
```

{{% /tab %}}
{{% tab "Agent v5" %}}
La commande suivante affiche le statut de l'Agent Datadog.

```shell
sudo systemctl status dd-agent
```

Si l'Agent ne parvient pas à démarrer et qu'aucune information supplémentaire n'est fournie, utilisez la commande suivante pour afficher l'ensemble des logs associés au service de l'Agent Datadog. Utilisez `-r` pour afficher les logs dans l'ordre inverse si vous le souhaitez.

```shell
sudo journalctl -u dd-agent.service
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: /fr/agent/troubleshooting/send_a_flare/
[3]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands