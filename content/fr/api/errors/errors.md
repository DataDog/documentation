---
title: Réussites et erreurs
type: apicontent
order: 3
external_redirect: /api/#reussites-et-erreurs
---

## Réussites et erreurs

L'API Datadog utilise des codes de statut HTTP pour indiquer la réussite ou l'échec d'une requête.

Une erreur indique que le service n'a pas pu gérer votre requête. En plus du code de statut, la réponse peut contenir un objet JSON avec un tableau d'erreurs contenant des messages d'erreur plus détaillés. Remarque : lors de l'utilisation de bibliothèques, certaines erreurs peuvent générer des exceptions plutôt que de renvoyer des objets JSON.

Si le service est capable de traiter votre requête, mais que certains problèmes surviennent (par exemple, en raison de l'utilisation d'une API ou d'une version d'API obsolète), le code de statut HTTP indique que la requête est réussite tandis que le corps de la réponse contient le résultat attendu. En outre, un tableau d'avertissements contient des messages d'avertissement détaillés.
