---
description: Découvrir des stratégies pour débuter avec votre nouvelle installation
  Datadog.
further_reading:
- link: /getting_started/support/
  tag: Documentation
  text: Débuter avec l'assistance Datadog
title: Prise en main
---

## Section Overview

Ce guide de démarrage propose des stratégies pour implémenter efficacement Datadog dans votre organisation. Explorez les ressources d'assistance, les cours du centre d'apprentissage pour approfondir vos connaissances et les instructions pour configurer un environnement de test.

## Obtenir de l'aide

### Ressources en libre-service

Au fur et à mesure que vous progressez dans ce guide, vous pouvez consulter les ressources en libre-service suivantes :

* Les cours de [formation Datadog](#decouvrir-les-bases-de-datadog).
* La [documentation][16] Datadog, en particulier les pages [Débuter][17], pour vous familiariser davantage avec la plateforme.  
* L'[interface utilisateur Datadog][18], qui fournit une aide contextuelle, des informations sur des champs de configuration spécifiques, des notes de version et d'autres ressources. Cliquez sur l'icône <kbd>?</kbd> dans toute l'application ou en bas de la navigation des produits.

{{< img src="/administrators_guide/help_center.png" alt="Capture d'écran du centre d'aide dans l'interface utilisateur Datadog" style="width:90%;">}}

### Créer un ticket d'assistance

Pour obtenir de l'assistance lorsque vous rencontrez un problème :

* [**Assistance Datadog**][20] : disponible pour vous aider avec des problèmes difficiles, guider votre installation, traduire les problèmes en conditions locales, identifier les bugs et consigner les demandes de fonctionnalités.
* [**Flare de l'Agent Datadog**][21] : cet outil CLI crée automatiquement un nouveau ticket d'assistance et envoie un fichier compressé de fichiers logs pertinents expurgés, de paramètres de niveau de débogage et de configurations locales à l'assistance Datadog, sans connexion requise. Pour plus d'informations sur l'utilisation et l'envoi du flare à l'assistance Datadog, consultez la section [envoi d'un flare][21]. 
* [**Fleet Automation**][5] : permet la génération de flare à distance depuis l'interface utilisateur de la plateforme.

## Découvrir les bases de Datadog

Familiarisez-vous avec les éléments de Datadog qui sont les plus importants pour votre cas d'usage. Commencez par vous inscrire à nos cours gratuits du [centre d'apprentissage][1]. Intégrez les cours suivants dans vos workflows d'onboarding :

**Débuter** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Datadog Foundation{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}Tagging Best Practices{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-software-catalog" >}}Managing the Software Catalog{{< /nextlink >}}
{{< /whatsnext >}}

**Administrateurs** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}The Agent on a Host{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Monitoring a Kubernetes Cluster{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}Datadog API: Automation and Infrastructure as Code{{< /nextlink >}}
{{< /whatsnext >}} 

**Interface utilisateur** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Introduction to Dashboards{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}Discovering Graph Widgets{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}Using Dashboards and SLOs{{< /nextlink >}}
{{< /whatsnext >}}

**Ingénieurs de fiabilité des sites** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Datadog 101: Site Reliability Engineer{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}APM Monitors and Alerting{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}Using Datadog RUM to track core web vitals{{< /nextlink >}}
{{< /whatsnext >}}

**Développeurs** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Setup APM for Java applications{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog 101: Developer{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}Tracking errors with RUM for javascript web applications{{< /nextlink >}}
{{< /whatsnext >}}

## Créer un environnement de test

Après avoir terminé quelques cours, appliquez ce que vous avez appris à vos conditions locales. Installez et expérimentez Datadog dans un bac à sable à faible risque pour vous familiariser avec l'environnement. Créez un environnement simple et accessible pour développer votre configuration de surveillance avant une installation plus large.

### Configuration de votre environnement de test

#### Dans l'application

L'[interface utilisateur Datadog][18] est le meilleur endroit pour commencer à créer votre environnement de test. La plateforme fournit une assistance à la configuration, des analyseurs automatiques de données en direct, des suggestions contextuelles et de nombreux autres outils. L'interface utilisateur Datadog fournit des ressources utiles pour accomplir certaines de ces tâches.

Voici quelques exemples :

* Créer un [test Synthetic Monitoring][14] pour commencer à tester des transactions commerciales critiques sur vos applications.
* Créer quelques [Service Level Objectives][15] (SLO) pour définir des cibles de performance d'application.
* Consulter la page [Configuration du service APM][9] et suivre les instructions étape par étape pour commencer à instrumenter vos services.
* Configurer et tester les [pipelines de logs][8] pour déterminer comment vous souhaitez ingérer différents ensembles de logs provenant de l'infrastructure et des applications.
* Consulter la page [Modèles de monitors][10] pour commencer à ajouter des alertes sur votre environnement de test.

#### Modèles de configuration du host de l'Agent

L'[Agent Datadog][2] est open source et publié sur GitHub. Le référentiel GitHub de l'Agent est une ressource utile pour consulter les modèles de configuration et les spécifications afin de vous aider à créer votre environnement.

Voici quelques exemples :

* [Modèle de configuration de l'Agent][3]   
* [Spécifications de configuration d'intégration][4]   
* [Fleet Automation][5]

## Étapes suivantes

Pour créer avec succès une nouvelle installation Datadog, consultez la page de [planification][11]. Vous apprendrez à créer un exercice de cadrage, à configurer le [tagging de ressources][12], à découvrir les meilleures pratiques des produits, à ajouter d'autres produits et à optimiser votre collecte de données pour assurer une installation fluide.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.datadoghq.com/
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/integrations-core
[5]: https://app.datadoghq.com/fleet
[6]: /fr/getting_started/tagging/unified_service_tagging/
[7]: /fr/getting_started/tagging/
[8]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[9]: https://app.datadoghq.com/apm/service-setup
[10]: https://app.datadoghq.com/monitors/recommended
[11]: /fr/administrators_guide/plan
[12]: /fr/administrators_guide/plan/#resource-tagging
[13]: https://github.com/DataDog/datadog-agent/tree/main/examples
[14]: https://app.datadoghq.com/synthetics/tests
[15]: https://app.datadoghq.com/slo/manage
[16]: https://docs.datadoghq.com
[17]: /fr/getting_started
[18]: https://app.datadoghq.com
[19]: /fr/bits_ai/
[20]: /fr/help
[21]: /fr/agent/troubleshooting/send_a_flare/?tab=agent