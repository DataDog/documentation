---
aliases:
- /fr/integrations/faq/issues-getting-integrations-working
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Dépannage de l'Agent
  text: Mode debugging de l'Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Dépannage de l'Agent
  text: Envoyer un flare de l'Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Dépannage de l'Agent
  text: Obtenir le statut d'un check de l'Agent
title: Rendre les intégrations fonctionnelles
---

Les intégrations Datadog sont configurées via l'Agent Datadog à l'aide de fichiers de configuration YAML.

Si une intégration que vous avez configurée ne s'affiche pas dans Datadog, exécutez la [commande CLI `status`][2] et recherchez l'intégration sous l'en-tête *Running Checks*.

**Remarque**: les intégrations de la communauté, des partenaires et du Marketplace ne sont pas conservées après la mise à niveau de l'Agent. Ces intégrations doivent être réinstallées après ce processus.

Si l'intégration se trouve sous **Running Checks**, mais n'est pas visible dans l'app Datadog :
1. Assurez-vous que qu'aucune erreur ni aucun avertissement ne s'affiche sous l'entrée de l'intégration dans le résultat de `status`.
1. Consultez le [Metrics Explorer][3] pour savoir si des métriques du système du host s'affichent. Par exemple, dans le host où vous avez configuré l'intégration, recherchez `system.cpu.user`.
1. Si cela ne permet toujours pas d'afficher les métriques, recherchez des erreurs dans les [logs Datadog][4] et envoyez-les avec le résultat de la commande `status` à [l'assistance Datadog][5].

Si vous ne voyez pas l'intégration sous **Running Checks** :
1. Assurez-vous que le fichier de configuration de l'intégration se trouve au bon endroit et qu'il est nommé correctement.
1. Vérifiez que vous avez bien configuré l'intégration en [consultant la documentation][6] à son sujet.
1. Vérifiez le fichier de configuration à l'aide d'un [parser YAML][7] pour vous assurer que le YAML est valide.
1. Chaque fois que vous déplacez ou modifiez le fichier, [redémarrez l'Agent][8] et exécutez de nouveau la commande `status` pour vérifier la présence de changements.
1. Si l'intégration ne s'affiche toujours pas dans `status`, recherchez des erreurs dans les [logs Datadog][4] et envoyez-les à [l'assistance Datadog][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: /fr/agent/configuration/agent-commands/#agent-information
[3]: https://app.datadoghq.com/metric/explorer
[4]: /fr/agent/configuration/agent-log-files/
[5]: /fr/help/
[6]: /fr/integrations/
[7]: https://codebeautify.org/yaml-parser-online
[8]: /fr/agent/configuration/agent-commands/#start-stop-restart-the-agent