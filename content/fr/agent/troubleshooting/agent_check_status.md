---
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentation
  text: Mode debugging de l'Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentation
  text: Envoyer un flare avec l'Agent
title: Résoudre un problème lié à un check de l'Agent
---

Si vous rencontrez des problèmes avec un check de l'Agent, utilisez les commandes suivantes pour obtenir davantage d'informations de diagnostic.

**Remarque** : remplacez `<NOM_CHECK>` dans les exemples ci-dessous par n'importe quel check de l'Agent. Par exemple : `activemq`, `ceph` ou `elastic`. Consultez la [documentation de l'intégration][1] pour vérifier le nom du check de l'Agent.

**Remarque** : pour désactiver temporairement un check de service lors du dépannage, renommez `/conf.d/<NOM_CHECK>.d/conf.yaml` de façon à utiliser une extension de fichier autre `.yaml` ou `.yml`, par exemple `conf.yaml.disable`.

## Linux

Pour tester un check de l'Agent, exécutez :

```shell
sudo -u dd-agent datadog-agent check <NOM_CHECK>
```

Si vous souhaitez inclure des métriques rate, ajoutez `--check-rate` à votre commande. Par exemple, pour l'Agent v6.x, exécutez :

```shell
sudo -u dd-agent datadog-agent check <NOM_CHECK> --check-rate
```

Si le problème persiste, [contactez l'équipe d'assistance Datadog][3] avec un [flare][2].

## Windows

Exécutez le script suivant depuis une ligne de commande PowerShell avec **élévation des privilèges** (en tant qu'administrateur), en utilisant le `<NOM_CHECK>` approprié :

Pour les versions >= 6.12 de l'Agent :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check <NOM_CHECK>
```

Pour les versions <= 6.11 de l'Agent :
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\agent.exe" check <NOM_CHECK>
```

## Systemd

Pour les systèmes utilisant `systemd`, utilisez `journalctl` pour faciliter le débogage.

La commande suivante affiche le statut de l'Agent Datadog.

```shell
sudo systemctl status datadog-agent
```

Si l'Agent ne parvient pas à démarrer et qu'aucune information supplémentaire n'est fournie, utilisez la commande suivante pour afficher l'ensemble des logs associés au service de l'Agent Datadog. Utilisez `-r` pour afficher les logs dans l'ordre inverse si vous le souhaitez.

```shell
sudo journalctl -u datadog-agent.service
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: /fr/agent/troubleshooting/send_a_flare/
[3]: /fr/help