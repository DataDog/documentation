---
title: Nombre de hosts
type: apicontent
order: 14.2
external_redirect: /api/#nombre-de-hosts
---

## Nombre de hosts

Cet endpoint renvoie le nombre total de hosts actifs et disponibles dans votre compte Datadog. Un host est considéré comme actif lorsqu'il a transmis des données au cours de la dernière heure et disponible lorsque sa dernière transmission de données a été effectuée au cours des deux dernières heures.

**ARGUMENTS**:

* **`from`** [*facultatif*, *défaut*=**now - 2 hours**] :
    Le nombre de secondes depuis l'epoch UNIX à partir duquel vous souhaitez obtenir le nombre total de hots actifs et disponibles.
