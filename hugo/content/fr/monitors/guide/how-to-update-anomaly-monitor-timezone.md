---
aliases:
- /fr/monitors/faq/how-to-update-anomaly-monitor-timezone
further_reading:
- link: /monitors/types/anomaly/
  tag: Documentation
  text: Créer un monitor dʼanomalies
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications du monitor

title: Comment mettre à jour un monitor de détection des anomalies pour quʼil prenne
  en compte le fuseau horaire
---

Les monitors de Datadog utilisent le fuseau horaire UTC (temps universel coordonné), qui ne suit pas les fuseaux horaires locaux par défaut. En fonction de votre type de système, il se peut que vos données soient affectées par une activité locale survenant sur votre fuseau horaire. Par exemple, un sursaut dʼactivité lors du déjeuner peut entraîner un pic au milieu de la journée, et cette hausse peut être détectée comme étant une anomalie imprévue. Si vous recevez des anomalies imprévues causées par de lʼactivité locale, mettez à jour votre monitor de détection des anomalies afin quʼil tienne compte de votre fuseau horaire.

Si vous utilisez les algorithmes de détection dʼanomalies agiles ou robustes avec une fréquence saisonnière hebdomadaire ou quotidienne, vous pouvez mettre à jour votre monitor de détection des anomalies afin quʼil tienne compte dʼun fuseau horaire local à lʼaide de lʼAPI et de lʼIU.

Voici un exemple de monitor avant quʼil ne soit configuré de façon à tenir compte dʼun fuseau horaire local :

{{< img src="monitors/guide/dst-off.png" alt="Suivi DST désactivé" >}}

Voici un exemple de monitor lorsque lʼheure dʼété est prise en compte :

{{< img src="monitors/guide/dst-on.png" alt="Suivi DST activé" >}}

## Interface

Pour mettre à jour un monitor de détection des anomalies de façon à tenir compte dʼun fuseau horaire local dans lʼIU, accédez à la section [Create a new monitor][1] > [Anomaly monitor][2] dans l'IU. Dans la section 3, configurez Alert Conditions, ouvrez le volet Advanced et activez le bouton permettant de tenir compte de l'heure d'été lors de l'évaluation du monitor. Choisissez ensuite le fuseau horaire que vous souhaitez suivre dans le menu déroulant.

{{< img src="monitors/guide/anomaly_monitor_timezone_ui.png" alt="Suivi DST dans l'IU" >}}

## API

1. Vous avez besoin des informations suivantes pour faire la requête de mise à jour via l'API de monitor :
  - Votre [clé d'API Datadog et d'application][3] pour l'authentification
  - L'ID de monitor et la requête de votre monitor de détection des anomalies :
    {{< img src="monitors/guide/anomaly_monitor_timezone.png" alt="ID de monitor et requête" >}}
  - La chaîne d'identification TZ pour le fuseau horaire associé à votre métrique, comme `America/New_York` ou `Europe/Paris`. Identifiez votre fuseau horaire préféré dans la colonne TZ de la [liste de fuseaux horaires de la base de données tz][4] (format canonique recommandé).<br><br>
2. Créez une version mise à jour de la requête du moniteur en ajoutant un argument `timezone` à l'appel de fonction anomalies().
  - Par exemple, si vous souhaitez modifier la requête affichée ci-dessus pour utiliser l'heure locale de New York, la requête est modifiée ainsi :

    ```
    avg(last_4h):anomalies(avg:system.cpu.user{role:trace-cassandra} by {host}, 'basic', 2, direction='both', alert_window='last_15m', interval=60, count_default_zero='true', timezone='America/New_York') >= 1
    ```

3. Utilisez l'API [Edit a Monitor][5] pour mettre à jour la définition du monitor.
  - Des exemples sont disponibles dans Python, Ruby et cURL.
  - N'ajoutez que l'ID et la requête dans la demande pour éviter de remplacer les paramètres. Le nom, le message, les options et les tags ne sont pas requis.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: https://app.datadoghq.com/monitors#create/anomaly
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[5]: /fr/api/v1/monitors/#edit-a-monitor