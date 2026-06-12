---
aliases:
- /fr/agent/guide/windows-flare-agent-5
disable_toc: false
private: true
title: Envoyer un flare de l'Agent 5
---

Cette page couvre les ports utilisés par l'Agent 5. Pour plus d'informations sur la dernière version de l'Agent, consultez la section [Envoyer un flare][1].

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
| Windows    | Consultez la [section Windows](#windows)                                             |

**Remarque** : si vous utilisez un système basé sur Linux et que la commande wrapper `service` n'est pas disponible, [consultez la liste des alternatives][3].

## Windows

Pour envoyer une copie de vos configurations et logs Windows à l'assistance Datadog, suivez les étapes suivantes :

* Ouvrez Datadog Agent Manager.

* Sélectionnez Actions.

* Sélectionnez Flare.

* Saisissez votre numéro de ticket (si vous n'en avez aucun, laissez la valeur 0).

* Saisissez l'adresse e-mail que vous utilisez pour vous connecter à Datadog.

{{< img src="agent/faq/windows_flare.jpg" alt="Flare Windows" style="width:70%;">}}

La commande flare est disponible pour PowerShell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

ou cmd.exe :

```
"%ProgramFiles%\N-Datadog\N" "%ProgramFiles%\N- \N-Datadog Agent\N-embedded\Npython.exe" "%ProgramFiles%\N-Datadog\N-embedded\Npython.exe" "%ProgramFiles%\N- Datadog Agent\N-agent\N-agent.py" flare <CASE_ID>
```

#### Échec de l'envoi du flare

La sortie de la commande flare vous indique où l'archive flare compressée est enregistrée. Si l'envoi du fichier à Datadog échoue, vous pouvez le récupérer dans ce dossier et l'ajouter manuellement comme pièce jointe à un e-mail. Les fichiers flare sont généralement stockés aux emplacements suivants :
- Linux : `\tmp\`
- macOS : `$TMPDIR`
- Windows: `C:\Users\<UTILISATEUR_AGENT_DD>\AppData\Local\Temp\`

Pour les versions antérieures de l'Agent sous Windows, vous pouvez trouver l'emplacement de ce fichier en exécutant la commande suivante dans l'invite de commandes Python de l'Agent :

**Étape 1** :

* Version 5.12+ de l'Agent :
    `"%ProgramFiles%\Datadog\Datadog Agent\dist\shell.exe" since`

* Versions antérieures de l'Agent :
    `"%ProgramFiles%\Datadog\Datadog Agent\files\shell.exe"`

**Étape 2** :

```python
import tempfile
print tempfile.gettempdir()
```

Exemple :

{{< img src="agent/faq/flare_fail.png" alt="Échec de l'envoi du flare" style="width:70%;">}}

Pour plus d'informations sur la dernière version de l'Agent, consultez la [documentation Windows][2].

[1]: /fr/agent/troubleshooting/send_a_flare
[2]: /fr/agent/basic_agent_usage/windows/#agent-v5
[3]: /fr/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands