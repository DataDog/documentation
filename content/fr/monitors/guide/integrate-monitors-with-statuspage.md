---
description: Découvrez comment intégrer les monitors Datadog avec Atlassian Statuspage.
further_reading:
- link: /integrations/statuspage
  tag: Documentation
  text: En savoir plus sur lʼintégration Statuspage
- link: /synthetics/guide/synthetic-test-monitors/
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic

title: Intégrer des monitors avec Statuspage
---

## Présentation

[Atlassian Statuspage][1] est un outil de gestion de l'état et des incidents qui offre une visibilité sur le temps de fonctionnement de vos applications et de vos services. Une page d'état peut afficher des métriques personnalisées et des événements de Datadog, et vous pouvez mettre à jour l'état de vos systèmes avec les notifications de monitor de Datadog.

## Ajouter les alertes de Statuspage en tant quʼévénements Datadog

Vous pouvez configurer [lʼintégration Statuspage][2] pour suivre les alertes de Statuspage dans l'[Events Explorer][3].

1. Accédez aux [intégrations][4] et recherchez `statuspage` dans la liste des intégrations.
2. Sélectionnez le carré de lʼintégration StatusPage et cliquez sur **Add New**.
3. Ajoutez l'URL d'état et les tags personnalisés que vous souhaitez surveiller, par exemple : `https://status.datadoghq.com` ou `https://datadogintegrations.statuspage.io/` avec les tags `datadog`, `test` et `test1`. Vous devez inclure au moins un tag personnalisé par page.
3. Cliquez sur l'icône **Save**. 

Au bout de cinq minutes, des alertes de monitor de Statuspage doivent sʼafficher dans l'[Events Explorer][5]. Définissez un [délai][6] en haut à droite et sélectionnez **Statuspage** dans la liste des sources, sous **Core**.

{{< img src="monitors/guide/statuspage_integration_configuration.png" alt="Configurer lʼintégration Statuspage dans Datadog" style="width:90%;" >}}

Cliquez sur une alerte pour afficher un volet latéral contenant le message, les tags et les attributs de lʼévénement.

{{< img src="monitors/guide/statuspage_side_panel.png" alt="Un volet latéral de lʼévénement contenant la source, le message, les tags et les attributs de lʼévénement" style="width:90%;" >}}

## Ajouter des alertes Statuspage dans les monitors Datadog

### Générer une adresse électronique Statuspage

Référez-vous à la [documentation de Statuspage][7] pour générer une adresse électronique spécifique à un composant.

### Créer un monitor de métrique

Pour créer un [monitor de métrique][8] qui se déclenche sur les alertes de Statuspage :

1. Accédez à [**Monitors** > **New Monitor**][9] et cliquez sur **Metric**.
2. Consultez la [documentation relative au monitor de métrique][8] pour sélectionner une méthode de détection, définir votre ou vos métriques, définir des alertes de conditions et configurer les options avancées du monitor. 
3. Personnalisez le nom du monitor pour qu'il renvoie `UP` ou `DOWN` en fonction de l'état du test. Par exemple, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. Dans la section **Notify your team**, ajoutez l'adresse électronique générée dans le message, comme `@custom-statuspage-email@notifications.statuspage.io`. Cela remplit automatiquement le champ `Notify your services and your team members` au-dessus de **Renotification**.
5. Remplissez la section relatives aux notifications du monitor et ajoutez un résumé dans le nom du monitor, comme `Shopist Checkout Functionality`.
6. Définissez les conditions de renotification du monitor et ajoutez des tags, comme `service:status-page`.
7. Sélectionnez une équipe et attribuez une priorité au monitor.
8. Définissez les autorisations d'édition et les conditions de notification du monitor.
9. Une fois que vous avez configuré votre monitor, cliquez sur **Create**. 

{{< img src="monitors/guide/statuspage_alerts_metric_monitor.png" alt="Créer un monitor de métrique contenant des alertes de Statuspage" style="width:90%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: /fr/integrations/statuspage
[3]: /fr/service_management/events/explorer/
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/event/explorer
[6]: /fr/dashboards/guide/custom_time_frames/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /fr/monitors/types/metric/
[9]: https://app.datadoghq.com/monitors/create/metric