---
aliases:
- /fr/logs/faq/how-to-increase-the-number-of-log-files-tailed-by-the-agent
further_reading:
- link: /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/
  tag: FAQ
  text: Comment transmettre des logs à Datadog en utilisant des log shippers externes ?
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: Comment étudier un problème de parsing de log ?

title: Augmenter le nombre de fichiers de log suivis par l'Agent
---

Par défaut, l'Agent peut suivre jusqu'à 200 fichiers de log sur Windows et MacOS, et jusqu'à 500 fichiers sur les autres systèmes d'exploitation. Cette limite est appliquée pour éviter les problèmes de performances lorsque des wildcards sont utilisés sur des répertoires très volumineux.

Pour augmenter cette limite, modifiez la valeur du paramètre `open_files_limit` dans la section `logs_config` du fichier de configuration de l'Agent (`/etc/datadog-agent/datadog.yaml`) :

```yaml
logs_config:
  open_files_limit: 500
```

Pour les environnements conteneurisés, vous pouvez définir la variable d'environnement `DD_LOGS_CONFIG_OPEN_FILES_LIMIT`.

**Remarque** : l'augmentation du nombre de fichiers de log suivis est susceptible d'augmenter la charge système de l'Agent.