---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: Utiliser la solution RUM et Session Replay pour l'analyse des produits
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: Alertes avec des taux de conversion
kind: guide
title: Activer la solution RUM pour votre boutique Shopify
---

## Présentation

Comprendre comment les clients interagissent avec vos pages web est crucial pour le succès de votre boutique en ligne.

Ce guide explique comment vous pouvez mettre en place le Real User Monitoring (la surveillance des utilisateurs réels) pour votre boutique Shopify.

## Implémentation

1. Connectez-vous à votre volet d'administration Shopify.
2. Sous **Sales channels**, cliquez sur **Online Store**.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Activer la solution RUM pour votre boutique Shopify" style="width:30%;">}}

3. Un nouveau menu s'ouvre, cliquez sur **Themes**.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Activer la solution RUM pour votre boutique Shopify" style="width:30%;">}}

4. Cliquez sur le bouton **Edit code** de votre thème actuel.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Activer la solution RUM pour votre boutique Shopify" >}}

5. Sous le répertoire **Layout**, trouvez le fichier principal de votre thème **theme.liquid**. Cliquez sur le fichier pour le modifier.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Activer la solution RUM pour votre boutique Shopify" style="width:30%;">}}

6. Initialisez le SDK RUM Browser en ajoutant l'extrait de code du SDK dans le tag `<head>`. Pour en savoir plus sur la méthode d'installation à choisir, consultez la [documentation relative la surveillance Browser avec RUM][1].

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Activer la solution RUM pour votre boutique Shopify" >}}

7. Cliquez sur le bouton **Save** pour enregistrer vos modifications.

La mise à jour ressemble à ce qui suit dans l'IU de Shopify :

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Activer la solution RUM pour votre boutique Shopify" style="width:50%;">}}

Pour plus d'informations sur l'édition du code du thème, consultez la [documentation de Shopify][2].

## Commencer à explorer

Une fois que vous avez initialisé le SDK RUM Browser, vous pouvez commencer à utiliser le Real User Monitoring avec votre boutique Shopify.

Vous pouvez par exemple :

- Obtenir des informations précieuses sur le comportement de vos clients en
prenant des décisions fondées sur des données pour améliorer votre magasin
- Augmenter la conversion en observant les sessions enrichies des enregistrements des navigateurs avec [Session Replay][3].
- Utiliser [l'analyse d'entonnoir][4] pour mieux comprendre le parcours du client, ou
- [Générer des métriques][5] à partir de ces sessions nouvellement capturées

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /fr/real_user_monitoring/session_replay/browser/
[4]: /fr/product_analytics/journeys/funnel_analysis
[5]: /fr/real_user_monitoring/platform/generate_metrics/