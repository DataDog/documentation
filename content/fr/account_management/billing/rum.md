---
title: "Real User Monitoring : FAQ sur la facturation"
kind: faq
---

## Comment est définie une session ?

Une session correspond à une visite de votre application Web par un utilisateur. Elle inclut généralement plusieurs consultations de pages et les données de télémétrie associées.

## Quel est le délai d'expiration d'une session ?

Une session expire au bout de 15 minutes d'inactivité, et est limitée à 4 heures au total. Au bout de 4 heures, une nouvelle session est automatiquement créée.

## Quelles sont les données recueillies par le service Real User Monitoring (RUM) de Datadog ?

Datadog collecte toutes les pages consultées par vos utilisateurs finaux avec les données de télémétrie pertinentes : chargement des ressources (XHR, images, fichiers CSS, scripts JS, etc.), erreurs frontend et tâches longues. Tous ces éléments sont inclus dans la session utilisateur. Le prix facturé par Datadog est calculé par tranche de dix mille (10 000) sessions ingérées dans le service Real User Monitoring (RUM) de Datadog.

## Les applications monopages sont-elles prises en charge ?

Oui, et aucune configuration n'est nécessaire de votre côté. Le service RUM de Datadog effectue automatiquement le suivi des modifications de la page.

## Est-il possible de consulter les requêtes d'endpoint de bout en bout ?

Oui. Par défaut, l'intégration APM permet de lier n'importe quelle requête XHR/Fetch à sa trace backend correspondante.

## Est-il possible de consulter les logs du collecteur de logs de navigateur dans l'interface RUM ?

Oui. Les logs de navigateur sont automatiquement liés à la session RUM correspondante, ce qui vous permet d'identifier à quelle étape du parcours utilisateur ils ont été recueillis.

## Utilisez-vous des cookies ?

Oui. Datadog utilise des cookies pour relier les différentes actions effectuées par vos utilisateurs au cours d'une session. Ce processus n'implique aucun transfert de cookies d'un domaine à un autre et n'effectue pas le suivi des actions de vos utilisateurs en dehors de vos applications.
