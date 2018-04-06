---
title: Comment augmenter le nombre de fichiers de logs suivis par l'agent
kind: faq
further_reading:
- link: "/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers"
  tag: "FAQ"
  text: Comment envoyer des logs à Datadog via des Log Shippers externes
- link: "/logs/parsing"
  tag: "Documentation"
  text: En savoir plus sur le parsing
- link: "/logs/faq/how-to-investigate-a-log-parsing-issue"
  tag: "FAQ"
  text: Comment étudier un problème de traitement de log?
---

Par défaut, l'agent peut tracker jusqu'à 100 fichiers de logs. Cette limite est définie pour éviter des problèmes de performances lorsque les wildcards sont définies dans un répertoire important.

Pour augmenter cette limite, changez la valeur de `open_files_limit` dans le fichier de configuration de l'Agent (`/etc/datadog-agent/datadog.yaml`) dans la section `logs_config`:

```
logs_config:
  open_files_limit: 100
```

**Note**: L'augmentation de la limite du nombre de fichiers de log à tracker peut augmenter la consommation de ressources de l'agent.

