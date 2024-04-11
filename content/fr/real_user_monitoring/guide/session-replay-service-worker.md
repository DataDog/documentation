---
aliases:
- /fr/real_user_monitoring/faq/session_replay_service_worker/
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentation
  text: En savoir plus sur Session Replay
kind: guide
title: Autoriser les workers de services tiers pour Session Replay
---

## Présentation

La solution Session Replay a recours à un worker de service sur le domaine `session-replay-datadoghq.com` pour optimiser votre expérience ainsi que protéger votre confidentialité et vos données.

Si vous avez bloqué les cookies tiers dans les paramètres de votre navigateur, ou si votre navigateur les bloque par défaut, le worker de service ne peut pas s'enregistrer correctement.

### Ajouter une exception

Datadog vous recommande d'ajouter une exception à votre liste de blocage des cookies tiers, afin que le worker de service de Session Replay puisse fonctionner correctement.

Si vous utilisez Google Chrome, suivez les instructions ci-dessous. Le processus est similaire pour Firefox et les autres navigateurs de bureau, notamment Brave et Edge.

1. Dans votre navigateur Web, cliquez sur l'icône en forme de **cadenas** à gauche de l'URL de la page.
2. Cliquez sur **Cookies**. Une fenêtre contextuelle s'affiche alors.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="Autoriser le worker de service tiers pour Session Replay" >}}

3. Accédez à l'onglet **Blocked** et sélectionnez `session-replay-datadoghq.com` dans la liste des pages.
4. Cliquez sur **Allow** et sur **Done**.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="Autoriser le worker de service tiers pour Session Replay" >}}

Après avoir modifié vos paramètres de cookies, actualisez la page.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}