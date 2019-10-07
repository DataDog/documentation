---
title: Mettre à jour le downtime d'un monitor
type: apicontent
order: 10.2
external_redirect: /api/#mettre-a-jour-le-downtime-d-un-monitor
---

## Mettre à jour le downtime d'un monitor

**ARGUMENTS**:

* **`id`** [*obligatoire*] :
    L'ID entier du downtime à mettre à jour.
* **`scope`** [*obligatoire*] :
    Le contexte auquel s'applique le downtime, p. ex. `host:app2`. Vous pouvez fournir plusieurs contextes sous la forme d'une liste séparée par des virgules, p. ex. `env:dev,env:prod`. Le downtime obtenu s'applique aux sources qui correspondent à TOUS les contextes fournis (à savoir, `env:dev` ET `env:prod`), et PAS seulement à certains d'entre eux.
* **`monitor_tags`** [*facultatif*, *défaut*=**no monitor tag filter**] :
    La liste de tags de monitor séparés par des virgules. Il s'agit des tags directement appliqués aux monitors, et *non* des tags utilisés dans les requêtes de monitor (qui sont filtrés par le paramètre `scope`), auxquels le downtime s'applique. Le downtime obtenu s'applique aux monitors qui correspondent à TOUS les tags de monitor fournis (à savoir, `service:postgres` **ET** `team:frontend`) et PAS seulement à certains d'entre eux.
* **`monitor_id`** [*facultatif*, *défaut*=**None**] :
    Un monitor unique auquel le downtime s'applique. S'il n'est pas fourni, le downtime s'applique à tous les monitors.
* **`start`** [*facultatif*, *défaut*=**original start**] :
    Timestamp POSIX utilisé pour démarrer le downtime.
* **`end`** [*facultatif*, *défaut*=**original end**] :
    Timestamp POSIX utilisé pour arrêter le downtime. S'il n'est pas fourni, le downtime continue indéfiniment (c'est-à-dire, jusqu'à ce que vous l'annuliez).
* **`message`** [*obligatoire*, *défaut*=**original message**] :
    Un message à inclure avec les notifications pour ce downtime. Les notifications par e-mail peuvent être envoyées à des utilisateurs spécifiques en utilisant la même notation « @nomutilisateur » que les événements.
* **`timezone`** [*facultatif*, défaut=**original timezone** ] :
    Le fuseau horaire du downtime.
* **`recurrence`** [*facultatif*, *défaut*=**original recurrence**] :
    Un objet définissant la récurrence du downtime avec une variété de paramètres :
    *   **`type`** : le type de récurrence. Valeurs autorisées : `days`, `weeks`, `months`, `years`.
    *   **`period`** : fréquence de répétition d'un entier. Par exemple, pour répéter tous les 3 jours, sélectionnez le type `days` et la période `3`.
    *   **`week_days`** (facultatif) : la liste des jours de la semaine pour laquelle la répétition est activée. Valeurs autorisées : `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat` or `Sun`. Seulement applicable lorsque la variable `type` a pour valeur `weeks`. **La première lettre doit être en majuscule.**
    *   **`until_occurrences`** (facultatif) ; nombre de récurrences du downtime. **`until_occurences` et `until_date`** sont mutuellement exclusifs.
    *   **`until_date`** (facultatif) : timestamp POSIX correspondant à la date à laquelle la récurrence doit se terminer. **`until_occurences` et` until_date`** sont mutuellement exclusifs.
