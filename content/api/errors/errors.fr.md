---
title: Succès et erreurs
type: apicontent
order: 3
external_redirect: /api/#success-and-errors
---
## Succès et erreurs
L'API Datadog utilise des codes d'état HTTP pour indiquer le succès ou l'échec d'une demande.

Une erreur indique que le service n'a pas géré votre demande avec succès. En plus du code d'état, la réponse peut contenir un objet JSON avec un tableau d'erreurs contenant des messages d'erreur plus détaillés. Remarque: Lors de l'utilisation de bibliothèques, certaines erreurs peuvent générer des exceptions plutôt que de renvoyer des objets JSON.

Si le service est capable de traiter votre requête, mais que certains problèmes sont présents (par exemple, utilisation d'une API ou d'une version d'API obsolète), le code d'état HTTP indique le succès et le corps de la réponse contient le résultat attendu, avec l'ajout d'un tableau d'avertissements contenant des messages d'avertissement détaillés.


