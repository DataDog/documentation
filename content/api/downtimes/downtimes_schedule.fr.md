---
title: Planifier le downtime d'un monitor
type: apicontent
order: 9.1
external_redirect: /api/#schedule-monitor-downtime
---

## Planifier le downtime d'un monitor

##### ARGUMENTS

* **`scope`** [*obligatoire*]:  
    Le(s) contexte(s) auquel (auxquels) s'applique le downtime, ex. `host:app2`. Fournissez plusieurs contextes sous la forme d'une liste séparée par des virgules, par ex. `env:dev, env:prod`. Le downtime qui en résulte s'applique aux sources qui correspondent à TOUS les contextes fournies (c'est-à-dire `env: dev` **ET**` env: prod`), PAS à certaines d'entre elles.
* **`monitor_id`** [*optionnel*, *défaut*=**None**]:  
    Un seul monitor auquel le downtime s'applique. Si non fourni, le downtime s'applique à tous les monitors.
* **`start`** [*optionnel*, *défaut*=**None**]:  
    POSIX timestamp pour démarrer le downtime. S'il n'est pas fourni, le downtime commence au moment où il est créé.
* **`end`** [*optionnel*, *défaut*=**None**]:  
    POSIX timestamp pour arrêter le downtime. S'il n'est pas fourni, le downtime continue indéfiniment (c'est-à-dire jusqu'à ce que vous l'annuliez).
* **`message`** [*optionnel*, *défaut*=**None**]:  
    Un message à inclure avec les notifications pour ce downtime. Les notifications par e-mail peuvent être envoyées à des utilisateurs spécifiques en utilisant la même notation "@username" que les événements.
* **`timezone`** [*optionnel*, *défaut* = **UTC**]:  
    La timezone pour le downtime.
* **`recurrence`** [*optionnel*, *défaut*=**None**]: 
    Un objet définissant la récurrence du downtime avec une variété de paramètres:
    *   **`type`** le type de récurrence. A choisir parmis: `days`, `weeks`, `months`, `years`.
    *   **`period`** à quelle fréquence le répéter (multiple d'un entier). Par exemple, pour répéter tous les 3 jours, sélectionnez un type de «day» et une period de «3».
    *   **`week_days`** (optionnel) une liste des jours de la semaine à répéter. Choisissez parmi:`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat` or `Sun`. Seulement applicable quand le `type` est `weeks`. **La première lettre doit être en majuscule.**
    *   **`until_occurrences`** (optionnel) combien de fois le downtime est replanifié. **`until_occurences` et` until_date`** sont mutuellement exclusifs.
    *   **`until_date`** (optionnel) la date à laquelle la récurrence doit se terminer en tant que Timestmap POSIX. **`until_occurences` et` until_date`** sont mutuellement exclusifs.

