---
description: Envoyez des événements personnalisés depuis votre serveur pour compléter
  les données côté client dans Product Analytics.
further_reading:
- link: /api/latest/product-analytics/#send-server-side-events
  tag: Référence API
  text: API Product Analytics
- link: /product_analytics/
  tag: Documentation
  text: Product Analytics
- link: /product_analytics/data_collected/
  tag: Documentation
  text: Données Product Analytics collectées
title: Suivre les événements côté serveur
---
## Présentation {#overview}

Les événements côté serveur sont des événements personnalisés envoyés via l'[API Product Analytics][1] depuis votre serveur. Contrairement aux événements côté client capturés par le SDK RUM, tels que les pages vues ou les clics sur des boutons, les événements côté serveur suivent les actions qui se produisent dans votre backend, telles qu'un paiement finalisé ou un paiement traité.

Utilisez les événements côté serveur pour :

- Capturer les événements à la source de vérité sur le serveur, indépendamment du comportement côté client
- Suivre les actions backend sans équivalent côté client, telles qu'une confirmation de paiement ou un renouvellement d'abonnement
- Compléter les données côté client avec un contexte côté serveur

## Prérequis {#prerequisites}

Avant d'envoyer des événements côté serveur, [configurez le SDK Datadog][2] pour votre application et [activez Product Analytics][3].

## Envoyer des événements côté serveur {#send-server-side-events}

Utilisez l'[API Product Analytics][1] pour envoyer des événements depuis votre serveur. Pour associer un événement côté serveur à une session client, incluez le `session_id` de la session RUM active du client. L'inclusion de l'ID de session lie les événements côté serveur aux données côté client pour une vue complète du parcours utilisateur.

Pour la référence complète de l'API, incluant l'authentification, les champs requis et les paramètres de requête, consultez [Envoyer des événements côté serveur][1].

## Analyser les événements côté serveur {#analyze-server-side-events}

Une fois que vous avez envoyé des événements côté serveur, ils sont disponibles dans n'importe quel graphique Product Analytics. Dans le sélecteur d'événements, sélectionnez **Server Events** pour limiter votre analyse aux données côté serveur.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/product-analytics/#send-server-side-events
[2]: /fr/product_analytics/#track-client-side-events-sdk
[3]: /fr/product_analytics/#enable-product-analytics