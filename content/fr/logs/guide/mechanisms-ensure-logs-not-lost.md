---
aliases:
- /fr/logs/faq/log-collection-is-the-datadog-agent-losing-logs
further_reading:
- link: /logs/log_collection/
  tag: Documentation
  text: Apprendre à recueillir vos logs
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail »

title: Mécanismes permettant d'éviter toute perte de log
---

**L'Agent Datadog est doté de plusieurs mécanismes permettant d'éviter toute perte de log**.

## Rotation des logs

Lorsqu'un fichier fait l'objet d'une rotation, l'Agent continue à [suivre][1] l'ancien fichier tout en commençant le suivi du nouveau fichier créé en parallèle. Bien que l'ancien fichier soit toujours suivi, un délai d'expiration de 60 secondes est défini après la rotation du log. Il permet à l'Agent de focaliser ses ressources sur le suivi des fichiers les plus récents.

## Problèmes réseau

### Suivi de fichiers

L'Agent stocke un pointeur pour chaque fichier suivi. En cas de problème relatif à la connexion réseau, l'Agent interrompt l'envoi des logs, jusqu'au rétablissement de la connexion. Il reprend alors automatiquement là où il s'était arrêté : aucun log n'est donc perdu.

### Écoute de ports

Si l'Agent effectue une écoute sur un port TCP ou UDP et qu'il rencontre un problème réseau, les logs sont stockés dans un buffer local, jusqu'à ce que le réseau soit à nouveau disponible. Dans le but d'éviter tout problème de mémoire, certaines limites s'appliquent néanmoins à ce buffer. Lorsqu'il est rempli, les nouveaux logs sont perdus.

### Logs de conteneur

Comme pour les fichiers, Datadog stocke un pointeur pour chaque conteneur suivi. Ainsi, en cas de problème réseau, l'Agent peut identifier les logs qui n'ont pas encore été envoyés. Toutefois, si le conteneur suivi est supprimé avant que le réseau ne soit à nouveau disponible, les logs sont perdus.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/glossary/#tail