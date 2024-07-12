---
title: Être alerté en cas de latence au 99e centile anormale pour un service de base de données

further_reading:
  - link: /tracing/guide/week_over_week_p50_comparison/
    tag: "2\_minutes"
    text: Comparer la latence d'un service avec celle de la semaine précédente
  - link: /tracing/guide/slowest_request_daily/
    tag: "3\_minutes"
    text: Débuguer la trace la plus lente sur l'endpoint le plus lent d'un service web
  - link: /tracing/guide/apm_dashboard/
    tag: "4\_minutes"
    text: Créer un dashboard pour suivre et corréler les métriques APM
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: "7\_minutes"
    text: Ajouter des tags de span et filtrer ou regrouper les données de performance de votre application
  - link: /tracing/guide/
    tag: ''
    text: Tous les guides
---
_Temps de lecture : 3 minutes_

{{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_full.mp4" video="true" alt="Vue de monitor avec alerte en cours" style="width:90%;">}}

Datadog vous permet de configurer des monitors pour surveiller la santé de vos services avec l'APM, vous évitant ainsi de devoir constamment la surveiller manuellement. La [détection d'anomalies][1] est une fonction algorithmique qui vous permet d'identifier un comportement anormal d'une métrique en fonction de ses données historiques, comme les tendances et les variations saisonnières en fonction du jour de la semaine ou de l'heure. Cette fonctionnalité est idéale pour les métriques qui affichent des tendances marquées et des patterns récurrents, qui seraient difficiles (voire impossibles) à surveiller avec des alertes de seuil.

1. **Ouvrez la [page New Monitor][2] et sélectionnez [APM][3]**
2. **Choisissez votre environnement** sous Primary Tags et **choisissez la base de données à surveiller** sous Service.

    L'option [Resource][4] vous permet de surveiller des requêtes spécifiques exécutées dans la base de données. Cet exemple s'intéressant toutefois uniquement aux performances générales, nous laissons `*`.

    Une fois le [service][5] choisi, l'étape suivante peut alors être définie. Un graphique s'affiche en haut de la page pour illustrer les performances de la métrique surveillée par le nouveau monitor.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_2.png" alt="Vue de monitor avec alerte en cours" style="width:90%;">}}

3. **Sélectionnez l'option *Anomaly Alert***, puis choisissez p99 latency (latence au 99e centile) pour l'option *For*.

    Une fois l'option Anomaly Alert choisie, le graphique affiche également le comportement normal attendu pour la métrique choisie, ici la latence au 99e centile.

4. **Définissez le champ *Alert when* sur 100%**.

    Cela signifie que l'alerte se déclenchera uniquement si tous les événements de la période sélectionnée sont anormaux, ce qui est préférable lorsque vous débutez avec la détection d'anomalies. Plus tard, vous pourrez définir une valeur mieux adaptée à votre situation. Consultez la [FAQ][6] pour en savoir plus sur les monitors de détection d'anomalies.

5. **Changez la notification d'alerte**.

    Dans cet exemple, vous pouvez laisser le contenu de notification par défaut ou choisir les membres de l'équipe à taguer dans l'alerte.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_3.png" alt="Vue de monitor avec alerte en cours" style="width:90%;">}}

    Consultez la [présentation des notifications][7] pour en savoir plus sur l'utilisation du markdown dans le texte de notification et sur les valeurs et les conditions pouvant y être définies.

6. **Assurez-vous que votre nom d'utilisateur apparaît dans la case *Notify your team*** et ajoutez les autres membres de l'équipe à notifier en cas de latence anormale.
   **Remarque** : pour ajouter un autre utilisateur, commencez par taper `@`. **Cliquez sur *Save***.

    Votre alerte est bien définie. Vous pouvez ajuster les paramètres depuis cet écran et suivre les performances de la métrique.

7. **Passez de l'onglet *Edit* à l'onglet *Status***.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_4.png" alt="Vue de monitor avec alerte en cours" style="width:90%;">}}

    Depuis cette page, vous pouvez désactiver votre monitor, afficher son statut actuel ou visualiser plus en détail une alerte déclenchée.

8. **Revenez à la [page Services][8]** et recherchez le service surveillé par votre nouveau monitor. **Cliquez sur la page Service**, puis **cliquez sur la barre du monitor** sous l'en-tête.

    **Votre nouveau monitor devrait alors s'afficher**, ainsi que les autres monitors définis pour le service et les monitors que Datadog vous conseille d'ajouter.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_5.png" alt="Vue de monitor avec alerte en cours" style="width:90%;">}}

    Plus vos créerez de monitors, plus vous trouverez de services, métriques et événements à inclure et plus vous serez à même de définir des conditions complexes. Chaque monitor est connecté à un service et peut être consulté depuis la page Service ainsi que depuis la [Service Map][9].

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_6.png" alt="Service Map"  style="width:90%;">}}

    Pour chaque service sur la carte, un cercle vert signifie que tous les monitors sont silencieux ; un cercle jaune signifie qu'au moins un monitor envoie des avertissements mais qu'aucun monitor n'émet d'alerte ; un cercle rouge signifie qu'au moins un monitor émet une alerte ; et un cercle gris signifie qu'aucun monitor n'est défini pour le service.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/create/types/anomaly/
[2]: https://app.datadoghq.com/monitors#/create
[3]: https://app.datadoghq.com/monitors#create/apm
[4]: /fr/tracing/visualization/#resources
[5]: /fr/tracing/visualization/#services
[6]: /fr/monitors/create/types/anomaly/#faq
[7]: /fr/monitors/notify/?tab=is_alertis_warning
[8]: https://app.datadoghq.com/apm/services
[9]: https://app.datadoghq.com/service/map