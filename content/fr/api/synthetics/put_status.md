---
title: Démarrer ou interrompre un test
type: apicontent
order: 30.2
external_redirect: "/api/#test-de-statut"
---

## Démarrer ou interrompre un test

Utilisez cette méthode pour démarrer ou interrompre un test Synthetics existant.

**ARGUMENTS**:

*   **`new_status`** - _obligatoire_ - Une paire clé-valeur dans laquelle vous définissez si vous souhaitez démarrer ou interrompre un test. Les valeurs valides sont `live` et `paused`. Renvoie `true` si le statut a été modifié et` false` si le statut est resté identique.
