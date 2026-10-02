---
aliases:
- /fr/real_user_monitoring/browser/
description: Surveillez les données réelles des utilisateurs et les performances frontend
  avec le SDK Datadog RUM Browser pour optimiser les expériences web et identifier
  les problèmes sur l'ensemble de la pile.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: /logs/log_collection/javascript/
  tag: Documentation
  text: Découvrir comment utiliser le SDK Browser Datadog pour les logs
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centre d'apprentissage
  text: Introduction au Real User Monitoring (RUM)
title: Surveillance Browser avec RUM
---
## Présentation {#overview}

Datadog Real User Monitoring (RUM) vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

{{< skill-callout
    title="Configurez RUM avec un agent"
    text="Copy this prompt into your AI coding agent to use the `dd-orchestrator` skill for guided RUM setup."
    action_name="copy_dd_orchestrator_rum_setup_prompt"
    lang="text" >}}
En utilisant skill à https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md, configurez Datadog RUM dans votre projet.
{{< /skill-callout >}}

## Commencez à surveiller les applications browser {#start-monitoring-browser-applications}

Pour commencer avec RUM pour Browser, créez une application et configurez le SDK Browser.

{{< whatsnext desc="Cette section comprend les sujets suivants :" >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Côté client</u> : Instrumentez chacune de vos applications web basées sur un navigateur, déployez l'application, puis configurez les paramètres d'initialisation que vous souhaitez suivre, et utilisez la configuration avancée pour gérer davantage les données et le contexte collectés par RUM.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Auto-instrumentation</u> : Injectez un scriptlet JavaScript du SDK RUM dans les réponses HTML de vos applications web servies via un serveur web ou un proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring">}}<u>Agentic Onboarding</u> : (En préversion) Effectuez une configuration guidée par IA qui détecte le framework de votre projet et ajoute le SDK RUM avec un seul prompt. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/advanced_configuration">}}<u>Configuration avancée</u> : Configurez le SDK RUM Browser pour modifier la collecte de données, remplacer les noms de vue, gérer les sessions utilisateur et contrôler l'échantillonnage selon les besoins de votre application.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins">}}<u>Plugins de build</u> : Intégrez les plugins de build Datadog à votre bundler JavaScript pour automatiser le téléchargement des maps source, la désobfuscation des noms d'actions et d'autres tâches RUM au moment de la compilation.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/data_collected">}}<u>Données collectées</u> : Examinez les données collectées par le SDK Browser.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_page_performance">}}<u>Surveillance des performances des pages</u> : Surveillez les temps de chargement des vues pour comprendre les performances de votre application du point de vue de l'utilisateur. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/optimizing_performance">}}<u>Optimisation des performances</u> : Utilisez la page d'optimisation RUM pour identifier et résoudre les problèmes de performance du navigateur grâce à l'analyse des Core Web Vitals et à la visualisation de l'expérience utilisateur.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance">}}<u>Surveillance des performances des ressources</u> : Surveillez les performances des ressources du navigateur et liez les données RUM aux traces backend pour une visibilité complète de bout en bout.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/collecting_browser_errors">}}<u>Collecte des erreurs du navigateur</u> : Apprenez à collecter et à suivre les erreurs frontend provenant de sources multiples à l'aide du SDK RUM Browser, y compris la collecte manuelle d'erreurs et l'utilisation des limites d'erreur React.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/tracking_user_actions">}}<u>Suivi des actions des utilisateurs</u> : Suivez et analysez les interactions des utilisateurs dans votre application browser grâce à la détection automatique des clics et aux informations sur les performances des actions.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/frustration_signals">}}<u>Signaux de frustration</u> : Identifiez les points de friction des utilisateurs grâce aux signaux de frustration RUM (notamment les clics de rage, les clics sans effet et les clics d'erreur) afin d'améliorer l'expérience utilisateur et de réduire le taux d'abandon.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/troubleshooting">}}<u>Dépannage</u> : Problèmes courants liés au SDK Browser.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}