---
aliases:
- /fr/monitors/monitor_types/
- /fr/monitors/create/types/
description: Créer des monitors
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Notifications des monitors
- link: /monitors/manage/
  tag: Documentation
  text: Gérer les monitors
kind: documentation
title: Créer des monitors
---

## Présentation

Pour créer un monitor dans Datadog, procédez comme suit :

1. Accédez à **Monitors** > **New Monitor**.
2. Sélectionnez un [type de monitor](#types-de-monitors) correspondant aux données de télémétrie pour lesquelles vous souhaitez recevoir des alertes.
3. [Configurez le monitor][1].

Pour créer un monitor par programmation, consultez la documentation relative à l'[API Datadog][2] ou aux [bibliothèques gérées par la communauté][3].

## Exporter et importer des monitors

Vous pouvez télécharger un fichier JSON contenant la définition d'un monitor depuis la page de statut de ce monitor. Cliquez sur l'icône des paramètres en forme d'engrenage (en haut à droite) et sélectionnez **Export** dans le menu.

Pour [importer une définition de monitor au format JSON][4] dans Datadog, accédez à *Monitors --> New Monitor --> Import* dans la navigation principale.

## Types de monitors

{{< whatsnext desc="Choisissez votre type de monitor :">}}
{{< nextlink href="/monitors/create/types/host" >}}<u>Host</u> : vérifiez si un ou plusieurs hosts transmettent des données à Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/metric" >}}<u>Métrique</u> : comparez les valeurs d'une métrique avec un seuil défini par un utilisateur.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/anomaly" >}}<u>Anomalie</u> : détectez les comportements anormaux pour une métrique en fonction des données historiques.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/apm" >}}<u>APM</u> : surveillez des métriques APM ou des requêtes de trace.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/audit_logs" >}}<u>Logs d'audit</u> :  recevez des alertes lorsqu'un type de log d'audit spécifique dépasse un seuil défini par un utilisateur sur une période donnée.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/ci" >}}<u>CI</u> : surveillez des pipelines de CI et des données de test recueillies par Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/composite" >}}<u>Composite</u> : recevez des alertes pour une expression combinant plusieurs monitors.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/custom_check" >}}<u>Check custom</u> : surveillez le statut de checks custom arbitraires.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/error_tracking" >}}<u>Suivi des erreurs</u> : surveillez les problèmes de vos applications recueillis par Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/event" >}}<u>Événement</u> : surveillés des événements recueillis par Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/forecasts" >}}<u>Prévision</u> : recevez des alertes lorsque Datadog prédit qu'une métrique s'apprête à franchir un seuil.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/integration" >}}<u>Intégration</u> : surveillez les valeurs de métriques ou des statuts de santé à partir d'une intégration spécifique.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process" >}}<u>Live Processus</u> : vérifiez si un ou plusieurs processus sont en cours d'exécution sur un host.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/log" >}}<u>Logs</u> : recevez des alertes lorsqu'un type de log spécifique dépasse un seuil défini par un utilisateur au cours d'une période donnée.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/network" >}}<u>Réseau</u> : vérifiez le statut des endpoints TCP/HTTP.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/outlier" >}}<u>Outlier</u> : recevez des alertes lorsque des membres d'un groupe se comportent différemment des autres.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process_check" >}}<u>Check de processus</u> : observez le statut généré par le check de service process.up.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/real_user_monitoring" >}}<u>Real User Monitoring</u> : surveillez les données d'utilisateurs réels recueillies par Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/slo" >}}<u>Alertes SLO</u> : surveillez la marge d'erreur et le taux d'utilisation de votre SLO.{{< /nextlink >}}
{{< nextlink href="/synthetics/guide/synthetic-test-monitors" >}}<u>Surveillance Synthetic</u> : surveillez des valeurs de métrique ou des statuts de test provenant d'exécutions de tests Synthetic.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/watchdog" >}}<u>Watchdog</u> : recevez une notification lorsque détecte un comportement anormal.{{< /nextlink >}}
{{< /whatsnext >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/create/configuration
[2]: /fr/api/v1/monitors/
[3]: /fr/developers/community/libraries/#managing-monitors
[4]: https://app.datadoghq.com/monitors#create/import