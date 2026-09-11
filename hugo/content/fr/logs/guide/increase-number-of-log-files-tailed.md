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
Le paramètre `logs_config.open_files_limit` dans le fichier de configuration de l'Agent (`/etc/datadog-agent/datadog.yaml`) détermine le nombre maximal de fichiers logs dont l'Agent peut effectuer le suivi simultanément. Cette limite est définie pour éviter des problèmes de performance lorsque des caractères génériques sont utilisés sur d'immenses répertoires. Vous pouvez augmenter la limite en ajustant ce paramètre.

```yaml
logs_config:
  open_files_limit: 500
```

Pour les environnements conteneurisés, vous pouvez définir la variable d'environnement `DD_LOGS_CONFIG_OPEN_FILES_LIMIT`.

La valeur par défaut varie en fonction de la version de l'Agent et du système d'exploitation. Pour vérifier la valeur par défaut de votre version de l'Agent, consultez les [exemples de fichiers de configuration de l'Agent][1] dans le dépôt Datadog Agent. Ouvrez le fichier correspondant à votre système d'exploitation. Assurez-vous de sélectionner le tag correspondant à votre version de l'Agent pour voir les valeurs par défaut correctes.

**Remarque** : L'augmentation de la limite de fichiers logs suivis peut accroître la consommation de ressources de l'Agent.

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example