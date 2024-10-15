---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: Utiliser la solution RUM et Session Replay pour l'analyse des produits
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: Alertes avec des taux de conversion
title: Activer la solution RUM pour votre boutique Squarespace
---

## Présentation

Comprendre comment les clients interagissent avec vos pages web est crucial pour le succès de votre boutique en ligne.

Ce guide explique comment vous pouvez mettre en place le Real User Monitoring (la surveillance des utilisateurs réels) pour votre boutique Squarespace.

## Implémentation

1. Connectez-vous à votre volet d'administration Squarespace et cliquez sur **Settings**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Activer la solution RUM pour votre boutique Squarespace" style="width:30%;">}}

2. Sous **Settings**, cliquez sur **Advanced**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Activer la solution RUM pour votre boutique Squarespace" style="width:30%;">}}

3. Dans le menu ouvert, cliquez sur **Code Injection**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Activer la solution RUM pour votre boutique Squarespace" style="width:30%;">}}

4. Initialisez le SDK RUM Browser en ajoutant l'extrait de code du SDK dans la section **Header**. Pour en savoir plus sur la méthode d'installation à choisir, consultez la [documentation relative la surveillance Browser avec RUM][1].

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Activer la solution RUM pour votre boutique Squarespace" >}}

5. Cliquez sur le bouton **Save** pour enregistrer vos modifications.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Activer la solution RUM pour votre boutique Squarespace" style="width:50%;">}}

Pour obtenir plus d'informations sur l'injection de code, consultez la [documentation de Squarespace][2].

## Commencer à explorer

Une fois que vous avez initialisé le SDK RUM Browser, vous pouvez commencer à utiliser le Real User Monitoring avec votre boutique Squarespace.

Vous pouvez par exemple :

- Obtenir des informations précieuses sur le comportement de vos clients en
prenant des décisions fondées sur des données pour améliorer votre magasin
- Augmenter la conversion en observant les sessions enrichies des enregistrements des navigateurs avec [Session Replay][3].
- Utiliser [l'analyse d'entonnoir][4] pour mieux comprendre le parcours du client, ou
- [Générer des métriques][5] à partir de ces sessions nouvellement capturées

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /fr/real_user_monitoring/session_replay/browser/
[4]: /fr/product_analytics/journeys/funnel_analysis/
[5]: /fr/real_user_monitoring/generate_metrics/