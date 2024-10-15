---
title: Widget iframe
description: Ajoutez un iframe à vos dashboards Datadog.
aliases:
  - /fr/graphing/widgets/iframe/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget iframe vous permet d'intégrer une partie de n'importe quelle autre page web à votre dashboard.

## Configuration

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="Configuration du widget iframe" style="width:80%;">}}

Saisissez l'URL de la page que vous souhaitez afficher à l'intérieur de l'iframe. Si vous n'utilisez pas une URL HTTPS, vous devrez peut-être configurer votre navigateur afin d'autoriser le contenu non sécurisé.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][1] pour en savoir plus.

Le [schéma JSON][2] utilisé pour le widget iframe est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/