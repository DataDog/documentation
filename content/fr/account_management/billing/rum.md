---
title: Facturation de la solution Real User Monitoring
kind: documentation
---

## Comment est définie une session ?

Une session correspond à une visite de votre application Web ou mobile par un utilisateur. Elle inclut généralement plusieurs consultations de pages et les données de télémétrie associées.

## Quel est le délai d'expiration d'une session ?

Une session expire au bout de 15 minutes d'inactivité, et est limitée à 4 heures au total. Au bout de 4 heures, une nouvelle session est automatiquement créée.

## Quelles sont les données recueillies par le service Real User Monitoring (RUM) de Datadog ?

Datadog recueille toutes les pages visitées par vos utilisateurs finaux ainsi que les données de télémétrie pertinentes : chargement des ressources (XHR, images, fichiers CSS, scripts JS, etc.), erreurs frontend, rapports de crash et tâches longues. Pour la solution Session Replay, Datadog crée un iframe basé sur les snapshots du DOM. La facturation est calculée en fonction du nombre de milliers de sessions ingérées par le service Real User Monitoring (RUM) Datadog.

## Les applications monopages sont-elles prises en charge ?

Oui, et aucune configuration n'est nécessaire de votre côté. Le service RUM de Datadog effectue automatiquement le suivi des modifications de la page.

## Comment faire pour consulter les requêtes d'endpoint de bout en bout ?

Grâce à l'intégration APM prête à l'emploi, vous pouvez lier n'importe quelle requête XHR/Fetch à sa trace backend correspondante.

## Comment faire pour consulter les logs du collecteur de logs de navigateur dans l'interface RUM ?

Les logs de navigateur sont automatiquement liés à la session RUM correspondante, ce qui vous permet d'identifier à quelle étape du parcours utilisateur ils ont été recueillis.

## Est-ce que Datadog recueille des cookies ?

Oui. Datadog utilise des cookies pour relier les différentes actions effectuées par vos utilisateurs au cours d'une session. Ce processus n'implique aucun transfert de cookies d'un domaine à un autre et n'effectue pas le suivi des actions de vos utilisateurs en dehors de vos applications.

## Des replays de session s'affichent sur la page Usage alors que Session Replay n'a pas été configuré dans l'environnement

Session Replay inclut des replays, des tâches longues et des ressources. Si vous recueillez l'un de ces trois éléments, vous encourez des frais relatifs à Session Replay.
