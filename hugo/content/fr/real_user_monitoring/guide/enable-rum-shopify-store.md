---
description: Configurez la surveillance RUM sur les boutiques Shopify pour suivre
  les interactions des clients, les performances et les taux de conversion pour l'optimisation
  du commerce électronique.
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: Utiliser la solution RUM et Session Replay pour Product Analytics
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: Alertes avec des taux de conversion
private: true
title: Activer la solution RUM pour votre boutique Shopify
---
<div class="alert alert-danger">
<a href="https://www.shopify.com/plus/upgrading-to-checkout-extensibility">Shopify's Checkout Extensibility</a> n'est pas prise en charge avec le suivi RUM. Si cette fonctionnalité est essentielle pour les besoins de votre entreprise, créez un ticket auprès du <a href="https://docs.datadoghq.com/help/">Datadog Support</a>.
</div>

## Présentation {#overview}

Comprendre comment les clients interagissent avec vos pages web est crucial pour le succès de votre boutique en ligne.

Ce guide explique comment vous pouvez mettre en place le Real User Monitoring (la surveillance des utilisateurs réels) pour votre boutique Shopify.

## Configuration {#setup}

1. Connectez-vous à votre panneau d'administration Shopify.
2. Sous {{< ui >}}Sales channels{{< /ui >}}, cliquez sur {{< ui >}}Online Store{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Activez RUM sur votre boutique Shopify" style="width:30%;">}}

3. Cela ouvre un nouveau menu ; cliquez sur {{< ui >}}Themes{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Activez RUM sur votre boutique Shopify" style="width:30%;">}}

4. Cliquez sur le bouton {{< ui >}}Edit code{{< /ui >}} pour votre thème actuel.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Activez RUM sur votre boutique Shopify" >}}

5. Sous le répertoire {{< ui >}}Layout{{< /ui >}}, recherchez le fichier principal de votre thème `theme.liquid`. Cliquez sur le fichier pour le modifier.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Activez RUM sur votre boutique Shopify" style="width:30%;">}}

6. Initialisez le Browser RUM SDK en ajoutant l'extrait de code du SDK à l'intérieur du tag `<head>`. Pour plus d'informations sur la méthode d'installation à choisir, consultez la [documentation RUM Browser Monitoring][1].

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Activez RUM sur votre boutique Shopify" >}}

7. Cliquez sur le bouton {{< ui >}}Save{{< /ui >}} pour enregistrer vos modifications.

La mise à jour ressemble à ce qui suit dans l'IU de Shopify :

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Activez RUM sur votre boutique Shopify" style="width:50%;">}}

Pour plus d'informations sur l'édition du code du thème, consultez la [documentation de Shopify][2].

## Commencez à explorer {#start-exploring}

Une fois que vous avez initialisé le SDK RUM Browser, vous pouvez commencer à utiliser le Real User Monitoring avec votre boutique Shopify.

Vous pouvez par exemple :

- Obtenez des informations précieuses sur le comportement de vos clients en
prenant des décisions fondées sur des données pour améliorer votre magasin
- Augmentez le taux de conversion en visionnant les sessions enrichies d'enregistrements de navigateur grâce à [Session Replay][3].
- [Générez des métriques][5] à partir des sessions nouvellement capturées

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/application_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /fr/session_replay/
[5]: /fr/real_user_monitoring/platform/generate_metrics/