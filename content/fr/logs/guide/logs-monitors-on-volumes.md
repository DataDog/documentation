---
title: Configurer des log monitors sur des volumes
kind: guide
disable_toc: true
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
---
Recevez une notification dès que les volumes de votre infrastructure grandissent de manière imprévue, peu importe leur contexte (`service`, `availability-zone`, etc.) :

1. Accédez à la vue [Log Explorer de Datadog][1]
2. Créez une [requête de recherche][2] qui correspond au volume à surveiller.
3. Cliquez sur **Export to monitor**.
4. Déterminez le taux de votre choix pour un *warning* ou une *error*.
5. Indiquez une notification explicite : `Le volume de ce service vient d'atteindre un niveau trop élevé. Définissez un filtre d'exclusion supplémentaire ou augmentez le taux d'échantillonnage pour revenir à des valeurs normales.`

{{< img src="logs/guide/example_notification.png" alt=" exemple de notification" style="width:70%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /fr/logs/explorer/search