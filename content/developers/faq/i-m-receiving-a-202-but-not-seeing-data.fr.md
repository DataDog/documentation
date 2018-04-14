---
title: Je reçois un code d'état 202 mais je ne vois pas les données
kind: faq
---

Nous effectuons une vérification d'erreur très minime l'API frontend, car nous mettons en file d'attente toutes les données pour le traitement asynchrone (le but étant de toujours accepter vos données dans des situations de production et découpler nos systèmes des vôtres).

Par conséquent, il est possible que vous puissiez recevoir une réponse 202 « succès », mais de ne pas avoir une visualisation de vos données dans Datadog. La cause la plus probable est :

* Problèmes avec le timestamp (soit pas en secondes ou dans le passé, etc.)
* Utilisation de la clé d'application au lieu de la clé API
* Les événements réussissent, mais comme les événements de réussite sont de faible priorité, ils n'apparaissent pas dans le flux d'événements tant qu'il n'est pas passé à la priorité "all".

Pour vérifier votre timestamp, exécutez correctement:
```
date -u && curl -s --head https://app.datadoghq.com 2>&1 | grep Date
```

Cela affichera la date du système actuel, puis enverra une demande à notre point de terminaison pour saisir la date selon notre perspective. Si celles-ci ont un écart de plus de quelques minutes, vous devriez vérifier les paramètres d'horloge dans votre serveur.

Certains champs qui ne sont pas obligatoires pour un requête nécessitent néanmoins une valeur valide. Par exemple, en envoyant un évènement, le champ de priorité doit être l'une des quatre options fournit. Tout autre texte entraînera un 202 « succès », mais aucun évènement n'apparaîtra de suite. Un invalid_source_type n'empêchera pas la visualisation de l'évènement, mais ce champ est supprimé lors du traitement de la requête.

