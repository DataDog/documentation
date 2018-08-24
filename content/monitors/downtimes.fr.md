---
title: Downtimes
kind: documentation
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: Apprenez à créer un monitor
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configurez les notifications de votre monitor
- link: "monitors/manage_monitor"
  tag: "Documentation"
  text: Managez vos monitors
---

Vous pouvez parfois devoir fermer les systèmes ou les mettre hors ligne pour effectuer des opérations de maintenance ou des mises à niveau. La planification des downtimes vous permet de le faire sans déclencher de monitors.

## Qu'arrive-t-il à un monitor quand il est coupé (ou a un downtime) ?

Vous pouvez planifier des downtime et/ou mettre en sourdine vos monitors Datadog afin qu'ils ne vous alertent pas à des moments précis.

Les moniteurs se déclenchent et émettent des événements lorsqu'ils changent d'état entre ALERT, WARNING (si activé), RESOLVED et NO DATA (si activé). Mais si un moniteur a été mis au silence par un downtime ou une mise en sourdine, toute transition de RÉSOLU vers un autre état ne déclenchera pas le monitor (ni les canaux de notification que cet événement aurait déclenchés).

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime on alert" responsive="true" style="width:80%;">}}

Si un moniteur passe d'un état à l'autre (par exemple, de OK à ALERT, WARNING ou NO DATA) et reste dans cet état une fois que le downtime programmé s'expire, il NE déclenchera PAS de notification. Néamoins, il déclenchera un évènement de récupération une fois que les données seront retournées pour cette étendue ou si le moniteur reviendra dans un état OK.

Cela peut sembler contre intuitif, mais c'est le comportement attendu aujourd'hui, et il a été fait de cette façon pour se protéger contre des alertes potentiellement « pourriel » lors de l'utilisation de la fonction « Autoresolve ». Si, dans ces circonstances, vous préférez que le monitor déclenche un événement NO DATA au moment de l'expiration du downtime, il existe une fonctionnalité que vous pouvez activer pour votre compte afin d'activer ce comportement. Pour que cela soit activé, vous pouvez contacter [l'équipe de support][5] pour le demander.

## Gérer les downtime

Accédez à la page [Gérer les temps d'arrêt][1] en sélectionnant l'onglet "Monitors" dans le menu principal et en sélectionnant le lien "Manage Downtime". Vous pouvez également accéder à la page "Manage Downtime" en cliquant sur le lien en haut de la page d'un monitor.

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" responsive="true" >}}

La page Manage Downtime affiche une liste des downtimes actifs et programmés. Sélectionnez un downtime pour afficher plus de détails sur l'host et les monitors concernés.

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-manage" responsive="true" style="width:80%;">}}

## Planifier un downtime

Pour planifier les downtimes, cliquez sur le bouton "Schedule Downtime" dans le coin supérieur droit.

1. Choisissez quoi mettre en sourdine
  {{< img src="monitors/downtimes/downtime-silence.png" alt="downtime-silence" responsive="true" style="width:80%;">}}
  Vous pouvez sélectionner un monitor spécifique pour le rendre silencieux ou laisser ce champ vide pour désactiver tous les monitors. Vous pouvez également sélectionner un context pour limiter votre downtime à un host, un périphérique ou un tag spécifique.
  Reportez-vous à la section [context][2] du Graphing Primer en utilisant JSON pour plus d'informations sur le context.
  Si vous choisissez de rendre silencieux tous les monitors contenu dans un context, cliquez sur "Preview affected monitors" pour voir quels moniteurs sont actuellement affectés. Tous les monitors de votre context créés ou modifiés après la date de downtime seront également désactivés.
  Notez que si une alerte multiple est incluse, elle est uniquement désactivée pour les systèmes couverts par le context. Par exemple, si un downtime est définie pour `host:X` et qu'une alerte multiple est déclenchée à la fois sur `host:X` et `host:Y`, Datadog génère une notification pour` host:Y`, mais pas `host:X`.

2. Définir un calendrier
  {{< img src="monitors/downtimes/downtime-schedule.png" alt="downtime-schedule" responsive="true" style="width:80%;">}}
  Vous pouvez définir une date et une heure de début ou laisser le champ vide pour démarrer immédiatement le downtime. Vous pouvez également définir un calendrier récurrent pour prendre en charge les downtimes programmés régulièrement.

3. Ajouter un message pour avertir votre équipe
  {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notify" responsive="true" style="width:80%;">}}
  Entrez un message pour informer votre équipe de ce downtime. Le champ message supporte la mise en forme standard [markdown formatting][3] ainsi que la syntaxe @ -notification de Datadog. Le champ "Notify your team" vous permet de spécifier les membres de l'équipe ou d'envoyer le message à un service [d'intégration][4].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadog.com/monitors#/downtime
[2]: /graphing/graphing_json/#scope
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: /help
