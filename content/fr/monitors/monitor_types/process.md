---
title: Monitor de processus
kind: documentation
description: Vérifier si un processus est en cours d'exécution sur un host
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: monitors/monitor_status
    tag: Documentation
    text: Consulter le statut de votre monitor
---
## Présentation

Les monitors de processus sont configurés pour vérifier le statut d'un ou de plusieurs processus. Les monitors de processus sont évalués toutes les minutes.

## Monitors de live processes

{{< img src="monitors/monitor_types/process/live_process_monitor_select.png" alt="monitor de live processes" responsive="true" style="width:35%;">}}

Les monitors de live processes tirent parti des données collectées par l'[Agent de processus][1], qui vous permet de créer des monitors de manière centralisée. Ces monitors envoient des états d'alerte ou d'avertissement en fonction du comportement des groupes de processus associés à un host ou un tag.

### Configuration

1. **Recherchez le processus à surveiller.**  
  Il peut s'agir d'une liste de chaînes séparées par des espaces. Cette option effectue une recherche approximative de correspondance partielle dans l'ensemble des processus de votre infrastructure.
  Les processus et le nombre de processus qui correspondent à la recherche sont affichés dans le tableau ci-dessous :

    {{< img src="monitors/monitor_types/process/search_process.png" alt="Rechercher des processus" responsive="true" style="width:80%;">}}

2. **Utilisez des tags pour préciser le contexte spécifique de votre monitor.**  
  Seuls les tags ou les hosts qui renvoient un statut pour le processus sélectionné sont affichés.

    {{< img src="monitors/monitor_types/process/selecting_scope.png" alt="Sélectionner le contexte" responsive="true" style="width:80%;">}}

    **Remarque** : le graphique affichant l'évolution du nombre de processus dans le contexte pour le monitor au fil du temps se trouve au-dessus de la section *Select process*.  
    La sélection de `multi-alert` permet de fractionner ce graphique afin d'afficher une ligne par groupe.

3. **Sélectionnez les options d'alerte.**

    {{< img src="monitors/monitor_types/process/set_alert_conditions.png" alt="Définir les conditions d'alerte" responsive="true" style="width:80%;">}}

4. **Configurez vos options de notification**.  
  Reportez-vous à la page de la documentation dédiée aux [notifications][2] pour en savoir plus.

## Check de processus

{{< img src="monitors/monitor_types/process/process_check_select.png" alt="check de processus" responsive="true" style="width:35%;">}}

Un monitor de check de processus surveille le statut généré par le check de service `process.up`, qui est transmis par le check dans l'Agent. Au niveau de l'Agent, vous pouvez configurer des seuils en fonction du nombre de processus correspondants.

Consultez la page [Check de processus][3] pour obtenir davantage d'informations sur la configuration.

Pour chaque processus, un statut de check de service unique est généré. Via cette interface de création, vous pouvez choisir les checks à surveiller ainsi que les conditions de notification.

### Configuration

1. **Choisissez le processus à surveiller.**  
  Les noms configurés dans les Agents présentant un check de processus actif s'affichent.
    {{< img src="monitors/monitor_types/process/process_monitor_pick.png" alt="sélectionner le monitor de processus" responsive="true" style="width:80%;">}}

2. **Choisissez le contexte du monitor**.
  Seuls les tags ou les hosts qui renvoient un statut pour le processus sélectionné sont affichés.
    {{< img src="monitors/monitor_types/process/process_monitor_scope.png" alt="contexte du monitor de processus" responsive="true" style="width:80%;">}}

3. **Sélectionnez les options d'alerte** :

    Le monitor est évalué toutes les minutes. Par conséquent, si vous définissez un seuil de `X consecutive failures`, cela signifie que le processus était indisponible pendant `X consecutive minutes`.
    {{< img src="monitors/monitor_types/process/process_check_alert_conditions.png" alt="conditions d'alerte du monitor de processus" responsive="true" style="width:80%;">}}

4. **Configurez vos options de notification** :  
    Reportez-vous à la page de la documentation relative aux [notifications][4] pour découvrir les différentes options de base des notifications.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/infrastructure/process
[2]: /fr/monitors/notifications
[3]: /fr/integrations/process
[4]: /fr/monitors/notifications