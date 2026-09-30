---
aliases:
- /fr/real_user_monitoring/faq/session_replay_service_worker/
description: Configurez les autorisations de service worker tiers pour Session Replay
  afin de garantir des performances optimales et la sécurité des données.
further_reading:
- link: /session_replay/
  tag: Documentation
  text: En savoir plus sur Session Replay
title: Autoriser les workers de services tiers pour Session Replay
---
## Présentation {#overview}

Session Replay utilise un service worker dans un autre domaine `session-replay-datadoghq.com` pour offrir la meilleure expérience possible tout en protégeant votre vie privée et en garantissant la sécurité de vos données.

Si vous avez bloqué les cookies tiers dans les paramètres de votre navigateur, ou si votre navigateur les bloque par défaut, le worker de service ne peut pas s'enregistrer correctement.

### Autoriser une exception {#allow-an-exception}

Datadog vous recommande d'ajouter une exception à votre liste de blocage des cookies tiers, afin que le worker de service de Session Replay puisse fonctionner correctement.

Si vous utilisez Google Chrome, suivez les instructions ci-dessous. Ce workflow d'exception s'applique également à Firefox et aux autres navigateurs de bureau, notamment Brave et Edge.

1. Dans votre navigateur web, cliquez sur l'icône {{< ui >}}Lock{{< /ui >}} à gauche de l'URL de la page.
2. Cliquez sur {{< ui >}}Cookies{{< /ui >}}. Une fenêtre modale contextuelle apparaît.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="Autoriser le service worker tiers de Session Replay" >}}

3. Accédez à l'onglet {{< ui >}}Blocked{{< /ui >}} et sélectionnez `session-replay-datadoghq.com` dans la liste des pages.
4. Cliquez sur {{< ui >}}Allow{{< /ui >}} et {{< ui >}}Done{{< /ui >}}.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="Autoriser le service worker tiers de Session Replay" >}}

Après avoir modifié vos paramètres de cookies, actualisez la page.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}