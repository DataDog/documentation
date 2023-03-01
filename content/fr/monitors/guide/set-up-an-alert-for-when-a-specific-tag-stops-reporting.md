---
aliases:
- /fr/monitors/faq/how-can-i-setup-an-alert-for-when-a-specific-tag-stops-reporting
further_reading:
- link: /monitors/
  tag: Documentation
  text: Apprendre à créer un monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
kind: guide
title: Recevoir une alerte lorsqu'un tag spécifique ne transmet plus de données
---

Dans certains cas, il est possible que vous ayez besoin d'être prévenu lorsque l'un de vos tags disparaît de systèmes spécifiques. Datadog vous offre la possibilité de configurer un [monitor][1] pour ce type d'alerte :

1. Configurez un [monitor de métrique][2] standard, puis spécifiez la métrique et le tag pour lesquels vous souhaitez être alerté en cas d'absence de données.
1. Sélectionnez une condition d'alerte qui ne pourrait jamais se déclencher. Par exemple, `a < -1` pour une métrique positive telle que `system.cpu.user`.
1. Activez l'option _Notify if data is missing_ comme dans l'exemple suivant :

{{< img src="monitors/guide/tag_stop_reporting.png" alt="Un tag ne transmet plus de données"  >}}

Votre alerte se déclenchera si le tag cesse de transmettre des données.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/
[2]: /fr/monitors/create/types/metric/