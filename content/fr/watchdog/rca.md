---
further_reading:
- link: /watchdog/faq/root-cause-not-showing/
  tag: Documentation
  text: Absence de cause fondamentale
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: Blog
  text: Analyse automatisée des causes fondamentales
title: Watchdog RCA
---

## Présentation

La solution Watchdog Root Cause Analysis (RCA) vous permet de réduire votre temps moyen de réparation (MTTR) grâce à l'automatisation des étapes d'enquête préliminaire lors du triage de l'incident. Le moteur d'IA Watchdog identifie les interdépendances entre les anomalies de l'application en matière de performances et les composants associés, afin d'établir des relations de cause à effet entre les symptômes. Lorsque Watchdog détecte une anomalie APM, une analyse des causes fondamentales est initiée afin d'obtenir des informations exploitables sur la cause et/ou les effets de l'anomalie.

Vous devez utiliser la solution [APM][1] pour tirer profit de Watchdog RCA. De plus, pour pouvoir exploiter pleinement toutes les données de télémétrie Datadog pertinentes concernant les services touchés, Datadog vous conseille de configurer le [tagging unifié][2].

Pour ses analyses, Watchdog RCA se base sur les sources de données suivantes :

* Les métriques APM relatives au taux d'erreur, à la latence et au taux de hit
* Le suivi de déploiements APM
* Les traces APM
* Les métriques d'infrastructure basées sur l'Agent, notamment sur la charge CPU, la charge mémoire et l'utilisation du disque
* Les métriques sur les checks de statut des instances AWS
* Les anomalies dans les patterns de logs

## Composants d'une analyse de causes fondamentales Watchdog

{{< img src="watchdog/rca/root_cause.png" alt="Analyse de causes fondamentales Watchdog avec les sections Root Cause, Critical Failure et Impact">}}

Les analyses de causes fondamentales Watchdog comprennent trois sections : Root Cause (cause fondamentale), Critical Failure (Échec critique) et Impact.

### Root cause

Une cause fondamentale est identifiée lorsqu'un changement d'état entraîne un problème de performance pour une application. Le changement d'état peut se manifester sous la forme d'une modification de la disponibilité au niveau de l'infrastructure, d'une hausse du trafic ou encore d'un déploiement de code.

Watchdog prend en charge quatre types de causes fondamentales :

* Les changements de version, qui sont détectés par la surveillance des déploiements APM
* Les augmentations du trafic, qui sont détectées par les métriques sur le taux de hit de vos services instrumentés par APM
* Les échecs des instances AWS, qui sont détectés par les métriques sur l'intégration AWS EC2
* Les problèmes d'espace disque insuffisant, qui sont détectés par les métriques système de l'Agent Datadog

Watchdog ne considère jamais qu'une dégradation des performances d'une application (par exemple, une latence élevée ou de nouvelles erreurs) constitue la cause fondamentale d'un incident. Dans Datadog, le premier symptôme d'une dégradation des performances correspond à un échec critique (ou **critical failure**). Ce concept est défini ci-dessous.

### Critical failure

La section Critical Failure affiche les aspects de votre application qui ont été touchés en premier (et le plus directement) par la dégradation des performances, et détaille l'ampleur des dégâts. Les échecs critiques sont systématiquement caractérisés par une hausse de la latence ou du taux d'erreur.

### Impact

Watchdog RCA identifie également les services qui sont touchés indirectement par la cause fondamentale. Les dégradations de performances qui sont répertoriées dans la section Impact sont normalement corrigées une fois l'échec critique résolu. Pour la solution RUM, Watchdog associe aussi automatiquement les chemins de vue et les utilisateurs concernés par les anomalies de performances.

{{< img src="watchdog/rca/views_impacted.png" alt="Capture d'écran d'une fenêtre contextuelle de la solution Watchdog RCA affichant des détails sur les vues concernées">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/getting_started/tagging/unified_service_tagging