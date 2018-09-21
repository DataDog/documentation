---
title: Troubleshooting
type: apicontent
order: 5
external_redirect: /api/#troubleshooting
---

## Troubleshooting

Nous effectuons une vérification d'erreur très minime l'API frontend, car nous mettons en file d'attente toutes les données pour le traitement asynchrone (le but étant de toujours accepter vos données dans des situations de production et découpler nos systèmes des vôtres).

Ainsi, il est possible que vous puissiez recevoir une réponse de 202 'succès' mais vous ne voyez pas vos données dans Datadog. La cause la plus probable est:

*   Des problèmes avec le timestamp (soit pas en secondes ou dans le passé, etc.)
*   Une utilisation de la clé d'application au lieu de la clé API
*   Les événements réussissent, mais comme les événements de réussite sont de faible priorité, ils n'apparaissent pas dans le flux d'événements tant qu'il n'est pas passé à la priorité "all".

Pour vérifier votre timestamp, exécutez correctement:

`date -u && curl -s -v https://app.datadoghq.com 2>&1 | grep Date`

Cela affiche la date du système actuel, puis fait une requête à notre endpoint et récupère la data de notre coté. Si celles-ci sont espacées de plus de quelques minutes, vous devriez consulter les paramètres d'heure sur votre serveur.

Certains champs ne sont pas obligatoires pour la requête, mais nécessitent une entrée valide. Par exemple, en soumettant un événement, le champ `priority` doit être l'une des quatre options données.

Tout autre texte entraîne un succès 202, mais aucun événement n'apparaît. Avoir un `source_type_name` invalide n'empêche pas l'événement d'apparaître, mais ce champ est supprimé lors de la soumission.

**Note**: Nos clés API sont sensibles aux majuscules. Tous vos attributs JSON pour les endpoint POST doivent être en minuscules.
