---
description: Affichez des informations détaillées sur les événements RUM individuels,
  notamment le contexte, les cascades, les séries temporelles de performance et les
  données de performance dans le panneau latéral.
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Rechercher des événements
- link: /real_user_monitoring/application_monitoring/mobile_vitals/#performance-timeseries
  tag: Documentation
  text: Indicateurs vitaux mobiles et séries temporelles de performance
title: Volet latéral des événements
---
## Présentation {#overview}

Le Real User Monitoring (RUM) Explorer affiche les événements individuels dans un panneau latéral. Pour ouvrir le panneau latéral de l'événement dans l'[RUM Explorer][1], cliquez sur une ligne de tableau dans le type de visualisation {{< ui >}}List{{< /ui >}}.

Utilisez l'en-tête du panneau latéral pour afficher des informations contextuelles sur vos utilisateurs (environnement, pays) et des détails spécifiques à l'événement comme le chemin de vue et le type de chargement. Pour les exécutions de tests Synthetic, cliquez sur l'ID du test pour afficher le résultat.

La visualisation de la distribution en haut vous aide à comprendre si la vue actuelle est proche de la médiane ou s'il s'agit d'une singularité. Utilisez le menu déroulant pour basculer entre {{< tooltip text="Loading Time" tooltip="Temps jusqu'à ce que la page soit prête et qu'aucune requête réseau ou mutation DOM ne se produise. Les applications mobiles ont un temps de chargement différent, signalé manuellement. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>En savoir plus</a>" >}}, ou les indicateurs vitaux web et mobiles tels que {{< tooltip text="Time To First Byte" tooltip="Temps écoulé jusqu'à la réception du premier octet de la vue. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>En savoir plus</a>" >}}, {{< tooltip text="FCP" tooltip="First Contentful Paint : moment où le navigateur affiche pour la première fois du texte, une image ou un SVG. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>En savoir plus</a>" >}}, {{< tooltip text="LCP" tooltip="Largest Contentful Paint : moment où le plus grand objet DOM dans la fenêtre d'affichage est rendu. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>En savoir plus</a>" >}}, {{< tooltip text="CLS" tooltip="Cumulative Layout Shift : quantifie les mouvements de page inattendus dus au contenu chargé dynamiquement. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>En savoir plus</a>" >}}, {{< tooltip text="INP" tooltip="Interaction to Next Paint : durée la plus longue entre l'interaction d'un utilisateur et l'affichage suivant. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>En savoir plus</a>" >}}, taux de rafraîchissement et moyenne de la mémoire. Ajustez la plage temporelle pour afficher les données par jour, semaine ou mois.

{{< img src="real_user_monitoring/explorer/events/side-panel-overview-2.png" alt="Panneau latéral du RUM Explorer affichant la visualisation de la distribution, la chronologie en cascade et les options de filtrage." width="100%" >}}

Cliquez sur n'importe quel onglet pour afficher ses détails correspondants et étudier des aspects spécifiques de l'événement. Consultez [Onglets supplémentaires](#additional-tabs) pour obtenir une liste complète.

## Naviguez entre les sessions utilisateur {#navigate-between-user-sessions}

Lorsque `@usr.id` est défini dans le SDK RUM et que vous filtrez l'Explorer par une valeur `@usr.id` spécifique, les boutons {{< ui >}}Previous{{< /ui >}} et {{< ui >}}Next{{< /ui >}} apparaissent dans le panneau latéral de la session. Utilisez ces boutons pour naviguer entre les sessions de cet utilisateur sans revenir à la liste de l'Explorer.

Seules les sessions conservées par les [filtres de rétention][5] apparaissent dans la navigation. Les sessions non conservées sont ignorées. Par exemple, si un utilisateur a eu trois sessions et que seules la première et la troisième ont été conservées, les boutons permettent de passer directement de l'une à l'autre sans indication qu'une session a eu lieu entre les deux.

Pour définir `@usr.id`, consultez [Configuration avancée][6].

{{< img src="real_user_monitoring/explorer/events/rum-explorer-session-continuity.png" alt="Panneau latéral de session du RUM Explorer avec les boutons de navigation Précédent et Suivant mis en surbrillance, affichant une info-bulle avec l'écran de début de session et la raison de fin." style="width:100%;" >}}

## Onglet Waterfall{#waterfall-tab}

L'onglet {{< ui >}}Waterfall{{< /ui >}} affiche une chronologie interactive des événements associés à cette vue. Les superpositions affichent des indicateurs de performance clés, notamment les [Core Web Vitals][3] ou les timings mobiles, avec des indicateurs de réussite ou d'échec.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-3.mp4" alt="Interaction avec la chronologie waterfall dans l'onglet Waterfall" video="true" width="80%" >}}

### Filtrage du waterfall{#filtering-the-waterfall}

Contrôlez les événements qui apparaissent dans le waterfall :

- **Par chemin critique** : Cliquez sur le bouton {{< ui >}}Critical Events{{< /ui >}} pour ne voir que les événements ayant un impact direct sur vos timings de performance clés.
- **Par attribut** : Utilisez les boutons de filtre au-dessus du waterfall. Cliquez sur un filtre pour accéder à des options supplémentaires telles que l'URL de la ressource, le nom de l'action, le message d'erreur, et plus encore.
- **Par plage temporelle** : Faites glisser les sélecteurs de temps dans la mini-carte, ou développez la barre latérale gauche et cliquez sur un timing pour filtrer les événements avant ce point.

La barre latérale gauche révèle des timings clés, y compris les timings personnalisés de l'[API addTiming][4].

### Inspection des événements {#inspecting-events}

Survolez n'importe quel événement dans le waterfall pour voir son horodatage, sa durée et les facteurs contributifs (scripts, style/mise en page ou autre traitement). Survolez un Core Web Vital pour voir sa définition, son seuil et comment il se compare à votre p75.

{{< img src="real_user_monitoring/explorer/events/specific-times-1.png" alt="La fenêtre contextuelle Temps de chargement affichant les détails de performance, les indicateurs de seuil et la comparaison avec la performance p75" width="100%" >}}

### Télémétrie connectée {#connected-telemetry}

Cliquez sur les événements dans le waterfall pour accéder aux données associées :

- {{< ui >}}Resources{{< /ui >}} : Affichez les traces backend connectées.
- {{< ui >}}Long Animation Frames{{< /ui >}} : Accédez aux profils associés pour l'analyse des performances.

## Séries temporelles de performance {#performance-timeseries}

{{< callout url="https://www.datadoghq.com/product-preview/rum-timeseries/" btn_hidden="false" header="Rejoignez la Preview !">}}
Les séries temporelles de performance sont en version préliminaire et la collecte est désactivée par défaut. Pour l'activer, rejoignez la version préliminaire. Datadog envoie des instructions de configuration aux clients participants.
{{< /callout >}}

{{< img src="real_user_monitoring/mobile_vitals/timeseries-panel.png" alt="La section Séries temporelles de performance d'un panneau latéral RUM, affichant un graphique interactif de la mémoire et du processeur sur la durée d'une session." style="width:100%;" >}}

Pour les sessions provenant des SDK iOS et Android, la section {{< ui >}}Performance Timeseries{{< /ui >}} affiche un graphique {{< ui >}}Memory & CPU{{< /ui >}} de l'utilisation des ressources de votre application, capturé chaque seconde tout au long de la session. Il est disponible dans les panneaux latéraux de session, de vue et d'opération.

Le graphique couvre l'intégralité de la session. Lorsque vous l'ouvrez depuis une vue ou une opération, des marqueurs indiquent où celle-ci commence et se termine, afin que vous puissiez lire son utilisation des ressources par rapport à tout ce qui s'est exécuté autour d'elle. Les périodes pendant lesquelles l'application était en arrière-plan sont grisées.

Pour savoir ce que mesure chaque série, consultez [Mobile Vitals][7].

## Onglets supplémentaires {#additional-tabs}

Utilisez les autres onglets pour explorer les données associées :

{{< ui >}}Replay{{< /ui >}}
: Regardez une relecture visuelle de la session de l'utilisateur.

{{< ui >}}Errors{{< /ui >}}
: Affichez les erreurs associées à l'événement.

{{< ui >}}Resources{{< /ui >}}
: Inspectez toutes les ressources chargées pendant l'événement.

{{< ui >}}Traces{{< /ui >}}
: Consultez les traces backend liées à l'événement.

{{< ui >}}Feature Flags{{< /ui >}}
: Affichez les feature flags évalués pendant l'événement.

{{< ui >}}Actions{{< /ui >}}
: Examinez les actions utilisateur capturées pendant la session.

{{< ui >}}Logs{{< /ui >}}
: Accédez aux logs associés à l'événement.

{{< ui >}}Attributes{{< /ui >}}
: Affichez les attributs de contexte collectés. Ajoutez des attributs personnalisés avec l'[API de contexte global][2].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[4]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#track-additional-performance-timings
[5]: /fr/real_user_monitoring/rum_without_limits/retention_filters
[6]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[7]: /fr/real_user_monitoring/application_monitoring/mobile_vitals/#performance-timeseries