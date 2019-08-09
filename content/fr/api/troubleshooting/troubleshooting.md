---
title: Dépannage
type: apicontent
order: 5
external_redirect: /api/#depannage
---

## Dépannage

Seule une vérification très minimale des erreurs est effectuée pour le côté frontal de l'API, car toutes les données sont mises en file d'attente afin de les traiter de façon asynchrone (l'objectif étant de toujours accepter vos données en situation de production et de dissocier les systèmes Datadog des vôtres).

Ainsi, il est possible que vous receviez une « réussite » 202, mais que vos données n'apparaissent pas dans Datadog. Ce problème survient probablement à cause d'un des points suivants :

*   Le timestamp est erroné (il n'est pas exprimé en secondes, correspond à une date antérieure, etc.).
*   Vous utilisez une clé d'application au lieu d'une clé d'API
*   Les événements se produisent, mais comme les réussites d'événement ont une faible priorité, elles n'apparaissent pas dans le flux d'événements tant que la priorité « all » ne leur est pas attribuée.

Pour vérifier que votre timestamp est exécuté correctement :

`date -u && curl -s -v https://app.datadoghq.com 2>&1 | grep -i '< date'`

Cette commande récupère la date actuelle du système, puis envoie une requête à l'endpoint d'une API pour récupérer la date du côté de Datadog. Si l'écart entre les deux dates est supérieur à quelques minutes, nous vous conseillons de vérifier les paramètres de date/heure sur votre serveur.

Certains champs ne sont pas obligatoires pour la requête, mais nécessitent une entrée valide. Par exemple, lorsque vous soumettez un événement, le champ `priority` doit avoir pour valeur l'une des quatre options données.

Tout autre texte renvoie une « réussite » 202, mais aucun événement n'apparaît. Un `source_type_name` non valide n'empêche pas l'événement d'apparaître, mais ce champ est supprimé lors de la soumission.

**Remarque** : les clés de l'API Datadog sont sensibles à la casse. Tous vos attributs JSON pour les endpoints POST doivent être en minuscule.
