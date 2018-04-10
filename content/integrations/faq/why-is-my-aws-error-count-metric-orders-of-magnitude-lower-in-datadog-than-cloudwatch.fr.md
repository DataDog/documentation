---
title: Pourquoi ma métrique de nombre d'erreurs AWS compte-t-elle des ordres de grandeur inférieurs à ceux de Cloudwatch dans Datadog?
kind: faq
---

Un indicateur de nombre d'erreurs fourni à Datadog à partir de Cloudwatch est un nombre d'erreurs par minute. Étant donné que toutes les métriques Datadog sont stockées à une résolution de 1 seconde, nous divisons cela par 60 lors de notre post-traitement.

Pour vous rapprocher de la valeur attendue, vous pouvez ajouter .as_count() 60 à votre requête. Notez que vous ne pouvez pas voir les chiffres exacts sur Cloudwatch, car Cloudwatch ne rend les données disponibles que toutes les 5-10 minutes, et notre robot d'exploration AWS s'exécute toutes les 5 minutes.