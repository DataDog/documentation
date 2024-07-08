---
title: Surveiller la disponibilité d'un site Web avec un SLO

aliases:
  - /fr/graphing/guide/uptime-percentage-widget
  - /fr/dashboards/guide/uptime-percentage-widget
further_reading:
  - link: /monitors/monitor_uptime_widget/
    tag: Documentation
    text: Widget Disponibilité des monitors
  - link: /synthetics/
    tag: Documentation
    text: Surveillance Synthetic
---
## Présentation

Pour respecter les accords de service avec les clients externes ou internes, il est souvent nécessaire de mesurer le pourcentage de disponibilité. Ce guide vous explique comment y parvenir avec le service de [surveillance Synthetic][1] de Datadog et le [widget SLO][2]. Le site `http://example.com/` sera utilisé comme exemple.

## Création d'un test Synthetic

Créez un [test API Synthetic][3] pour `http://example.com/` :

1. [Accédez à la page de création de test API Synthetic][4].
2. Saisissez `http://example.com/` dans le champ **URL**.
3. Cliquez sur **Test URL** pour ajouter automatiquement les assertions concernant la santé de votre site Web :

    {{< img src="synthetics/guide/uptime_slo/synthetics_test_config.png" alt="Configuration d'un test Synthetic" >}}

4. Ajustez ces assertions en fonction de votre SLI, puis définissez votre politique concernant les nouvelles tentatives de test. Dans cet exemple, lorsqu'au moins la moitié des emplacements renvoient une erreur même après une seconde tentative, le site est considéré comme indisponible :

    {{< img src="synthetics/guide/uptime_slo/synthetics_test_assertions.png" alt="Assertions de test Synthetic" >}}

5. (Facultatif) [Définissez un message de notification détaillé][5] :

    {{< img src="synthetics/guide/uptime_slo/synthetics_message.png" alt="Message de test Synthetic" >}}

## Configuration du widget SLO

### Créer votre SLO

1. [Créez un SLO][6] pour suivre la disponibilité de votre site Web en fonction des résultats de votre test Synthetic.
2. Sélectionnez **Monitor based** et saisissez le nom de votre test Synthetic :

    {{< img src="synthetics/guide/uptime_slo/slo_config.png" alt="Configuration du SLO" >}}

3. Définissez l'objectif que vous souhaitez atteindre :

    {{< img src="synthetics/guide/uptime_slo/slo_target.png" alt="Objectif du SLO" >}}

4. Terminez la configuration de votre SLO en définissant un titre et un message pour le décrire plus en détail :

    {{< img src="synthetics/guide/uptime_slo/slo_notif.png" alt="Notification du SLO" >}}

5. Cliquez sur Save.

### Importer votre SLO dans votre dashboard

1. [Créez un dashboard][7] pour héberger votre widget SLO :
2. Faites glisser le widget SLO et déposez-le sur votre dashboard.
3. Sélectionnez le SLO que vous venez de définir ci-dessus :

    {{< img src="synthetics/guide/uptime_slo/slo_selection.png" alt="Sélection du widget SLO" >}}

4. Personnalisez votre widget SLO en fonction de vos besoins :

    {{< img src="synthetics/guide/uptime_slo/slo_widget_configs.png" alt="Configuration du widget SLO" >}}

5. Pour finir, saisissez un titre décrivant votre widget, puis cliquez simplement sur **Done** :

    {{< img src="synthetics/guide/uptime_slo/final_dashboard.png" alt="Dashboard final" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/
[2]: /fr/dashboards/widgets/slo/
[3]: https://app.datadoghq.com/synthetics/list
[4]: https://dd-corpsite.datadoghq.com/synthetics/create
[5]: /fr/monitors/notify/
[6]: https://app.datadoghq.com/slo/new
[7]: https://app.datadoghq.com/dashboard/lists