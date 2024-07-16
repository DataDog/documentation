---
description: Découvrez les monitors Synthetic créés à partir de vos tests Synthetic.
further_reading:
- link: /monitors/manage/
  tag: Documentation
  text: Apprendre à générer les monitors
- link: /monitors/guide/integrate-monitors-with-statuspage/
  tag: Documentation
  text: Découvrez comment intégrer les monitors avec Statuspage.
- link: /synthetics/metrics/
  tag: Documentation
  text: En savoir plus sur les métriques de la surveillance Synthetic
kind: guide
title: Utiliser des monitors de test Synthetic
---

## Présentation

Lorsque vous créez un test Synthetic, Datadog crée automatiquement un monitor associé. Vous pouvez configurer des notifications lorsque le monitor du test Synthetic envoie une alerte.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Monitor de test Synthetic" style="width:100%;">}}

## Créer un monitor de test Synthetic

<div class="alert alert-info">Vous ne pouvez pas créer ni importer de monitor de test Synthetic dans <a href="/monitors/">Monitors</a>.</div>

Créez un monitor dans la section **Configure the monitor for this test** pour envoyer des notifications lorsqu'un test Synthetic échoue. Les monitors sont associés au test Synthetic que vous créez et sont liés aux conditions dʼalertes définies dans votre configuration de test Synthetic. Pour utiliser l'attribut du monitor et des variables de tags, créez un [monitor de métriques][1].

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test.png" alt="Créer un monitor dans votre test Synthetic" style="width:90%;">}}

Renommez le monitor pour le rechercher sur la page [**Manage Monitors**][2]. Pour trouver un monitor de test Synthetic, filtrez par `type:synthetics` dans la barre de recherche. Vous pouvez utiliser des [variables conditionnelles][3] de monitor pour caractériser le message de notification en fonction de l'état du test. 

Le monitor de test Synthetic s'intègre aux canaux de notification tels que les e-mails, Slack, Pagerduty et Microsoft Teams. Pour en savoir plus, référez-vous à la section [<txprotected>Notifications</txprotected>][4].

Si vous avez plusieurs couches de notifications (par exemple, vous notifiez un plus grand nombre d'équipes si un test Synthetic envoie une alerte plus longue), Datadog recommande d'activer la [renotification][5] sur vos monitors Synthetic.

## Affiner les notifications d'un monitor

En fonction de votre stratégie en matière de gestion des incidents, il se peut que vous souhaitiez impliquer plusieurs équipes lorsqu'un test Synthetic donne lieu à des alertes. Pour notifier l'équipe B uniquement en cas d'alertes ultérieures à la première, entourez le message de notification destiné à l'équipe B par `{{#is_renotify}}` et `{{/is_renotify}`. Utilisez les [variables conditionnelles][3] pour caractériser davantage le message de notification en fonction des attributs du monitor. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle.png" alt="Sélectionnez la période dʼattente pendant entre deux alertes du monitor" style="width:90%;">}}

Pour permettre au monitor donnant lʼalerte de renotifier, cliquez sur la bascule à gauche de `If this monitor stays in alert status renotify every` et sélectionnez une option temporelle dans le menu déroulant.

## Intégrez votre monitor de test Synthetic à Statuspage

Si vous utilisez [Atlassian Statuspage][6] pour avoir une visibilité sur le temps de fonctionnement de vos applications et services, vous pouvez mettre à jour l'état de vos systèmes avec les notifications de monitor de test Synthetic.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Ajouter une adresse e-mail Statuspage et un état au nom du monitor dans votre test Synthetic" style="width:95%;">}}

1. Référez-vous à la [documentation de Statuspage][7] pour générer une adresse électronique spécifique à un composant.
2. Ajoutez l'adresse électronique générée dans le message de notification de votre test. Par exemple, `@custom-statuspage-email@notifications.statuspage.io`.
3. Personnalisez le nom du monitor pour qu'il renvoie `UP` ou `DOWN` en fonction de l'état du test. Par exemple, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. Remplissez la section relatives aux notifications du monitor et ajoutez un résumé dans le nom du monitor. Par exemple, `Shopist Checkout Functionality`.
5. Une fois que vous avez configuré votre monitor, cliquez sur **Save & Exit**.

Pour en savoir plus, consultez la section [Intégrer des monitors avec Statuspage][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/metric/
[2]: /fr/monitors/manage/
[3]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /fr/monitors/notify/#integrations/
[5]: /fr/monitors/notify/#renotify
[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /fr/monitors/guide/integrate-monitors-with-statuspage/