---
aliases:
- /fr/real_user_monitoring/browser/
description: Surveillez les données réelles des utilisateurs et les performances du
  frontend avec le SDK Datadog RUM Browser pour optimiser les expériences web et identifier
  les problèmes à travers la pile.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: /logs/log_collection/javascript/
  tag: Documentation
  text: Découvrir comment utiliser le SDK Browser Datadog pour les logs
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centre d'apprentissage
  text: Introduction à la surveillance des utilisateurs réels (RUM)
title: Surveillance Browser avec RUM
---
## Aperçu {#overview}

La solution Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

## Commencez à surveiller les applications Browser {#start-monitoring-browser-applications}

Pour commencer avec RUM pour Browser, créez une application et configurez le Browser SDK.

{{< whatsnext desc="Cette section comprend les sujets suivants :" >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Côté client</u> : Instrumentez chacune de vos applications web basées sur le navigateur, déployez l'application, puis configurez les paramètres d'initialisation que vous souhaitez suivre, et utilisez la configuration avancée pour gérer davantage les données et le contexte que RUM collecte.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Auto-instrumentation</u> : Injectez un script JavaScript SDK RUM dans les réponses HTML de vos applications web servies par un serveur web ou un proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring">}}<u>Intégration agentique</u> : (En aperçu) Effectuez une configuration guidée par l'IA qui détecte le framework de votre projet et ajoute le SDK RUM avec une seule invite. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/advanced_configuration">}}<u>Configuration avancée</u> : Configurez le SDK RUM Browser pour modifier la collecte de données, remplacer les noms de vue, gérer les sessions utilisateur et contrôler l'échantillonnage selon les besoins de votre application.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins">}}<u>Plugins de build</u> : Intégrez les plugins de construction Datadog avec votre empaqueteur JavaScript pour automatiser les téléchargements de cartes sources, la déobfuscation des noms d'action et d'autres tâches RUM au moment de la construction.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/data_collected">}}<u>Données collectées</u> : Examinez les données que le Browser SDK collecte.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_page_performance">}}<u>Surveillance des performances des pages</u> : Surveillez les temps de vue pour comprendre les performances de votre application du point de vue de l'utilisateur. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/optimizing_performance">}}<u>Optimisation des performances</u> : Utilisez la page d'optimisation RUM pour identifier et résoudre les problèmes de performance du navigateur avec l'analyse des Core Web Vitals et la visualisation de l'expérience utilisateur.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance">}}<u>Surveillance des performances des ressources</u> : Surveillez les performances des ressources du navigateur et reliez les données RUM avec les traces backend pour une visibilité complète de bout en bout.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/collecting_browser_errors">}}<u>Collecte des erreurs du navigateur</u> : Apprenez à collecter et à suivre les erreurs frontend provenant de plusieurs sources en utilisant le SDK RUM Browser, y compris la collecte manuelle d'erreurs et les limites d'erreur React.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/tracking_user_actions">}}<u>Suivi des actions utilisateur</u> : Suivez et analysez les interactions des utilisateurs dans votre application Browser grâce à la détection automatique des clics et aux informations sur les performances des actions.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/frustration_signals">}}<u>Signaux de frustration</u> : Identifiez les points de friction des utilisateurs avec les signaux de frustration RUM (y compris les clics de rage, les clics morts et les clics d'erreur) pour améliorer l'expérience utilisateur et réduire l'abandon.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/troubleshooting">}}<u>Dépannage</u> : Problèmes courants du SDK Browser.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}