---
description: Implémentez la surveillance RUM sur les boutiques Squarespace pour comprendre
  le comportement des clients, suivre les performances et optimiser l'expérience utilisateur.
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: Utiliser la solution RUM et Session Replay pour Product Analytics
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: Alerting avec des taux de conversion
title: Activer la solution RUM pour votre boutique Squarespace
---
## Présentation {#overview}

Comprendre comment les clients interagissent avec vos pages web est crucial pour le succès de votre boutique en ligne.

Ce guide explique comment vous pouvez mettre en place le Real User Monitoring (la surveillance des utilisateurs réels) pour votre boutique Squarespace.

## Configuration {#setup}

1. Connectez-vous à votre panneau d'administration Squarespace et cliquez sur {{< ui >}}Settings{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Activez le RUM sur votre boutique Squarespace" style="width:30%;">}}

2. Sous {{< ui >}}Settings{{< /ui >}}, cliquez sur {{< ui >}}Advanced{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Activez le RUM sur votre boutique Squarespace" style="width:30%;">}}

3. Dans le menu ouvert, cliquez sur {{< ui >}}Code Injection{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Activez le RUM sur votre boutique Squarespace" style="width:30%;">}}

4. Initialisez le SDK RUM pour navigateur en ajoutant l'extrait de code du SDK dans la section {{< ui >}}Header{{< /ui >}}. Consultez plus d'informations sur la méthode d'installation à choisir dans la [documentation RUM Browser Monitoring][1].

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Activez le RUM sur votre boutique Squarespace" >}}

5. Cliquez sur le bouton {{< ui >}}Save{{< /ui >}} pour enregistrer vos modifications.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Activez le RUM sur votre boutique Squarespace" style="width:50%;">}}

Pour obtenir plus d'informations sur l'injection de code, consultez la [documentation de Squarespace][2].

## Commencez à explorer {#start-exploring}

Une fois que vous avez initialisé le SDK RUM Browser, vous pouvez commencer à utiliser le Real User Monitoring avec votre boutique Squarespace.

Vous pouvez par exemple :

- Obtenez des informations précieuses sur le comportement de vos clients en
prenant des décisions fondées sur des données pour améliorer votre magasin
- Augmentez le taux de conversion en visionnant les sessions enrichies d'enregistrements de navigateur grâce à [Session Replay][3].
- Utilisez l'[analyse d'entonnoir][4] pour mieux comprendre le parcours client, ou
- [Générez des métriques][5] à partir de ces sessions nouvellement capturées

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/application_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /fr/session_replay/
[4]: /fr/product_analytics/journeys/funnel_analysis/
[5]: /fr/real_user_monitoring/generate_metrics/