---
aliases:
- /fr/developers/integrations/create-an-integration-recommended-monitor
description: Découvrez comment créer un monitor pour votre intégration.
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: Documentation
  text: Configurer des monitors
title: Créer un modèle de monitor
---
## Présentation

Cette page guide les partenaires technologiques tout au long de la création et du packaging des modèles de monitor pour leur intégration Datadog officielle.

[Les monitors Datadog][1] évaluent en continu les données (telles que les métriques, les logs et les événements) pour détecter les conditions indiquant des problèmes de performance et des risques de disponibilité. Ils servent d'outils d'alerte proactifs qui notifient automatiquement les utilisateurs lorsque le comportement s'écarte des seuils attendus, permettant aux équipes d'agir avant que les incidents n'affectent les clients.

Pour les partenaires technologiques, les monitors transforment les données de télémétrie collectées par votre intégration en informations exploitables. Lorsque vous packagez des modèles de monitor, les utilisateurs peuvent les activer directement depuis la page [**Monitors > Templates**][2] pour une configuration plus rapide et une mise en valeur accélérée.

Au moins un modèle de monitor est requis si votre intégration collecte des métriques.

## Créer un modèle de monitor
Ces étapes supposent que vous avez [rejoint le réseau de partenaires Datadog][3], que vous avez accès à une organisation de développement partenaire et que vous avez déjà [créé une fiche dans la plateforme de développement][4].

1. [Déterminez les données de télémétrie que vous souhaitez surveiller](#déterminer-les-données-de-télémétrie-à-surveiller).
2. [Créez et configurez un monitor](#créer-votre-monitor) dans votre organisation de développement partenaire.
3. [Testez votre monitor](#tester-votre-monitor).
4. [Ajoutez votre monitor à votre intégration](#ajouter-votre-monitor-à-votre-intégration).

### Déterminer les données de télémétrie à surveiller
Commencez par consulter la [liste complète des types de monitors][6] pour comprendre les types de données de télémétrie sur lesquels vous pouvez définir des alertes. Déterminez les informations les plus importantes pour vos utilisateurs. Reportez-vous aux exemples ci-dessous pour découvrir des cas d'utilisation et des exemples courants.

#### Surveiller les métriques RED (rate, errors, duration) de votre service 
- **Rate** : surveillez le nombre de requêtes reçues par votre service.
- **Errors** : suivez le nombre de requêtes ayant échoué.
- **Duration** : mesurez la durée de traitement de ces requêtes (latence).

#### Surveiller votre infrastructure
- **CPU utilization** : suivez l'utilisation du CPU pour vous assurer qu'il n'est ni sous-utilisé ni surutilisé, afin de prévenir les ralentissements du système ou les défaillances des applications.
- **Memory utilization** : surveillez la quantité de mémoire système utilisée pour détecter et prévenir des problèmes tels que les fuites de mémoire ou les plantages.
- **Storage** : surveillez l'espace disque pour prévenir des problèmes tels que la perte de données, les interruptions de service ou les échecs d'écriture.

#### Surveiller vos logs
- **Error spikes** : déclenchez une alerte lorsque les logs d'erreur dépassent un seuil, par exemple en cas de messages `connection refused` ou `timeout` répétés sur une courte période.
- **Missing activity** : détectez l'absence de logs attendus, ce qui peut indiquer un processus bloqué ou un service défaillant.

### Créer votre monitor

[Créez et configurez votre monitor][5] dans votre organisation de développement partenaire. Ces monitors servent de modèles réutilisables que les utilisateurs de l'intégration peuvent activer directement dans leurs propres organisations Datadog.

### Tester votre monitor

1. Ingérez des données de télémétrie qui déclenchent votre monitor.
2. Accédez à la page [Liste des monitors][7] et sélectionnez votre monitor.
3. Confirmez que votre monitor se déclenche comme prévu. Utilisez les [Status Events][8] pour voir quand votre monitor a été déclenché et consultez les détails de chaque événement.

## Ajouter votre monitor à votre intégration
Une fois votre monitor créé et testé, ajoutez-le à votre fiche dans la plateforme de développement. Lorsque votre intégration est publiée, le monitor devient un modèle consultable lié à votre intégration.

{{< img src="developers/integrations/content_tab.png" alt="L'onglet Content dans la plateforme de développement d'intégrations" style="width:100%;" >}}

1. Dans la plateforme de développement, accédez à l'onglet **Content**.
2. Cliquez sur **Import Monitor**.
3. Recherchez et sélectionnez le monitor que vous avez créé. Vous pouvez inclure jusqu'à 10 monitors par intégration.
4. Pour chaque monitor, renseignez un **Display Name** et une **Description**. Ces informations apparaissent sur la page [**Monitors > Templates**][2] :
    - **Display Name** : un titre concis décrivant clairement ce que l'alerte couvre. Utilisez la voix active (par exemple, `Database latency exceeds threshold`).
    - **Description** : une brève explication qui aide les utilisateurs à déterminer si le monitor est pertinent pour eux. Décrivez l'importance de cette alerte et l'impact auquel elle répond.
5. Cliquez sur **Import**, puis sur **Save Changes**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/
[2]: https://app.datadoghq.com/monitors/templates
[3]: /fr/developers/integrations/?tab=integrations#join-the-datadog-partner-network
[4]: /fr/developers/integrations/build_integration/#create-a-listing
[5]: /fr/getting_started/monitors/#create-a-monitor
[6]: /fr/monitors/types/
[7]: https://app.datadoghq.com/monitors/manage
[8]: /fr/monitors/status/events/