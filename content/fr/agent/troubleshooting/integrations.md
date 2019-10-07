---
title: Rendre les intégrations fonctionnelles
kind: documentation
aliases:
  - /fr/integrations/faq/issues-getting-integrations-working
---
[Une partie des intégrations][1] de Datadog doivent être configurées via un fichier YAML dans l'Agent.

Voici un guide de dépannage rapide pour l'installation des intégrations :

1. Exécutez la [commande info][2].
2. L'intégration apparaît-elle dans la [commande info][2] ?
    * Non, elle n'apparaît pas.
        1. Vérifiez que le fichier de configuration se trouve au bon endroit et qu'il est nommé correctement.
        2. Utilisez un parseur YAML pour vérifier que le fichier ne contient pas d'erreur de syntaxe. Vous trouverez des exemples de fichier ici.
        3. Si vous avez déplacé ou modifié le fichier, [redémarrez l'Agent][3] puis exécutez à nouveau la commande info pour vérifier si l'intégration est désormais visible.
    * Oui, elle apparaît normalement.
        1. Accédez à Metrics Explorer et vérifiez que les métriques système du host sont bien recueillies. Par exemple, recherchez les métriques `system.cpu.user` en provenance du host qui exécute l'Agent et pour lequel l'intégration est configurée.
        2. Si les métriques n'apparaissent toujours pas, recherchez les erreurs enregistrées dans les logs et envoyez-les à [l'assistance Datadog][4] avec la sortie de la commande info.

[1]: /fr/integrations
[2]: /fr/agent/guide/agent-commands/#agent-status-and-information
[3]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: /fr/help