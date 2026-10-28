---
description: Configurez des plannings de monitor personnalisés avec des intervalles
  quotidiens, hebdomadaires ou mensuels pour les jobs critiques en utilisant des modèles
  RRULE pour une planification avancée.
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency
  tag: Documentation
  text: En savoir plus sur la fréquence d'évaluation des monitors
- link: /monitors/downtimes
  tag: Documentation
  text: Downtimes
- link: /monitors/configuration/?tab=thresholdalert#evaluation-window
  tag: Documentation
  text: Périodes cumulées
title: Personnalisez les fréquences d'évaluation des monitors
---
## Présentation {#overview}

Définissez une heure d'évaluation spécifique et contrôlez la fréquence d'évaluation des monitors pour suivre l'exécution des jobs critiques s'exécutant dans votre environnement. Les plannings personnalisés de monitor vous permettent d'alerter sur des systèmes et des processus qui n'ont pas besoin d'être surveillés en continu, tels que les jobs cron.

Les plannings personnalisés de monitor sont pris en charge sur les monitors d'événements, de logs et de métriques avec des intervalles de planification quotidiens, hebdomadaires et mensuels.

## Configuration {#configuration}

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="Bouton pour ajouter un planning personnalisé dans la configuration du monitor" style="width:100%;" >}}

Cliquez sur {{< ui >}}Add Custom Schedule{{< /ui >}} pour configurer votre fréquence d'évaluation.

<div class="alert alert-danger">Lorsqu'un planning personnalisé est activé sur un monitor, il ne peut pas être désactivé. Les plannings personnalisés ne peuvent être ajoutés ou supprimés que lors de la création du monitor. Le paramètre {{< ui >}}Remove non-reporting groups{{< /ui >}} est indisponible. Pour contourner ce problème, créez un nouveau monitor sans plannings personnalisés.
</div>

{{< tabs >}}
{{% tab "Jour" %}}
Sélectionnez l'heure de la journée à laquelle vous souhaitez que le monitor effectue l'évaluation.

Par exemple, le monitor suivant vérifie chaque jour à 20h00 que le job de sauvegarde quotidienne a généré un événement de réussite pour chaque instance de base de données.

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="Configuration du monitor pour vérifier chaque jour à 20h qu'un événement de réussite a été généré pour chaque instance de base de données suite au job de sauvegarde quotidienne" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Semaine" %}}
Sélectionnez les jours de la semaine ainsi que l'heure de la journée à laquelle vous souhaitez que le monitor effectue l'évaluation.

Par exemple, le monitor suivant vérifie chaque semaine le mardi et le samedi à 6h00 que les e-mails marketing ont été envoyés pour chaque campagne individuelle.

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="Configuration du monitor pour vérifier chaque semaine le mardi et le samedi à 6h que les e-mails marketing ont été envoyés pour chaque campagne individuelle" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Mois" %}}
Sélectionnez le jour du mois ainsi que l'heure de la journée à laquelle vous souhaitez que le monitor effectue son évaluation.

Par exemple, le monitor suivant vérifie le premier jour de chaque mois si le job cron générant les factures clients s'est exécuté avec succès.

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="Configuration du monitor pour vérifier le premier jour de chaque mois si le job cron générant les factures clients s'est exécuté avec succès." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULES {#rrules}

La règle de récurrence (RRULE) est un nom de propriété issu de la [RFC iCalendar][1], qui est la norme pour définir des événements récurrents. Utilisez le [générateur RRULE officiel][2] pour générer des règles récurrentes. Tirez parti des RRULE pour couvrir des cas d'utilisation de planification plus avancés.

Pour rédiger une RRULE personnalisée pour votre monitor, cliquez sur {{< ui >}}Use RRULE{{< /ui >}}.

**Remarques** :
- Les attributs spécifiant la durée dans une règle RRULE ne sont pas pris en charge (par exemple, DTSTART, DTEND, DURATION).
- Les fréquences d'évaluation doivent être d'un jour ou plus. Pour des fréquences d'évaluation plus courtes, utilisez les plannings de monitor par défaut.

#### Exemple : Le monitor s'évalue le dernier jour du mois {#example-monitor-evaluates-on-the-last-day-of-the-month}

```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="Syntaxe RRULE utilisée dans l'interface utilisateur pour évaluer le dernier jour du mois" style="width:90%;" >}}

#### Exemple : Le monitor s'évalue un mois sur deux le premier et le dernier dimanche du mois : {#example-monitor-evaluates-every-other-month-on-the-first-and-last-sunday-of-the-month}

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="Syntaxe RRULE utilisée dans l'interface utilisateur pour évaluer un mois sur deux le premier et le dernier dimanche du mois" style="width:90%;" >}}

## Comportement d'alerte des monitors avec des plannings personnalisés {#alerting-behavior-of-monitors-with-custom-schedules}

Les monitors utilisant la planification par défaut exécutent la requête avec la fréquence d'évaluation par défaut et envoient des alertes en fonction des transitions d'état du monitor (par exemple, lorsqu'un monitor passe de WARN à OK ou de OK à ALERT).

La chronologie ci-dessous illustre le comportement d'un monitor avec une planification par défaut. Le monitor envoie des alertes correspondant aux changements d'état.

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="Diagramme visuel montrant quand un monitor envoie une alerte en fonction des transitions d'état du monitor pour le planning par défaut avec une fréquence d'évaluation de trente minutes" style="width:100%;" >}}

Les monitors avec des plannings personnalisés, en revanche, s'évaluent sur une base quotidienne, hebdomadaire ou mensuelle et envoient des alertes en fonction des résultats des évaluations individuelles. Chaque évaluation est indépendante de la précédente et envoie une notification lorsque le résultat n'est pas OK.

La chronologie ci-dessous illustre le comportement d'un monitor fonctionnant sur un planning personnalisé. Contrairement au monitor à planning par défaut, le monitor à planning personnalisé envoie une alerte pendant son temps d'évaluation en fonction de l'état du monitor.
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="Diagramme visuel montrant quand un monitor envoie une alerte en fonction de l'état du monitor pour le planning personnalisé avec une fréquence d'évaluation quotidienne" style="width:100%;" >}}

## Rétention de groupe {#group-retention}

Par défaut, [les groupes sont conservés][3] pendant 24 ou 48 heures après qu'un groupe a cessé de rapporter des données, puis sont supprimés du monitor. Les monitors avec des plannings personnalisés conservent les groupes beaucoup plus longtemps, et leur rétention s'adapte à la fréquence d'évaluation que vous configurez :
| Fréquence d'évaluation | Rétention de groupe |
|-----------------------|------------------|
| Quotidienne                 | 30 jours          |
| Hebdomadaire                | 90 jours          |
| Mensuelle               | 180 jours         |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[3]: https://docs.datadoghq.com/fr/monitors/configuration/?tab=thresholdalert#group-retention-time