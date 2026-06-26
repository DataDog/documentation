---
aliases:
- /fr/graphing/widgets/iframe/
description: Ajoutez un iframe à vos dashboards Datadog.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget iframe
widget_type: iframe
---

Un inline frame (iframe) est un élément HTML qui charge une autre page HTML dans le document. Le widget iframe vous permet d'intégrer une partie de n'importe quelle autre page Web dans votre dashboard.

## Configuration

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="Configuration du widget iframe" style="width:80%;">}}

Saisissez l'URL de la page que vous souhaitez afficher à l'intérieur de l'iframe. Si vous n'utilisez pas une URL HTTPS, vous devrez peut-être configurer votre navigateur afin d'autoriser le contenu non sécurisé.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][1]**. Le tableau ci-dessous définit le [schéma JSON du widget][2] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/