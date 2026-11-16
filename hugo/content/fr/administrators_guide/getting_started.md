---
description: Apprenez des stratégies pour bien démarrer avec votre nouvelle installation
  Datadog.
further_reading:
- link: /getting_started/support/
  tag: Documentation
  text: Premiers pas avec le support Datadog
title: Débuter
---
## Présentation {#overview}

Ce guide de démarrage propose des stratégies pour mettre en œuvre efficacement Datadog dans votre organisation. Explorez les ressources d'assistance, les cours du Learning Center pour approfondir vos connaissances et les instructions pour configurer un environnement de test.

## Obtenir de l'aide {#getting-help}

### Ressources en libre-service {#self-service-resources}

Au fil de ce guide, vous pouvez vous référer aux ressources en libre-service suivantes :

* [Datadog training](#learn-datadog-basics) courses.
* La [documentation][16] Datadog, en particulier les pages [Démarrage][17], pour vous familiariser davantage avec la plateforme.  
* [Datadog UI][18], qui fournit une aide contextuelle, des informations sur des champs de configuration spécifiques, des notes de version et d'autres ressources ; cliquez sur l'icône <kbd>?</kbd> présente dans toute l'application ou en bas de la navigation du produit.

{{< img src="/administrators_guide/help_center.png" alt="Capture d'écran du centre d'aide dans Datadog UI" style="width:90%;">}} 

### Ouvrir un ticket de support {#file-a-support-ticket}

Pour obtenir de l'aide lorsque vous rencontrez un problème :

* [**Datadog Support**][20] : Disponible pour vous aider avec des problèmes complexes, guider votre installation, traduire les problèmes en conditions locales, identifier les bugs et enregistrer les demandes de fonctionnalités.
* [**Datadog Agent flare**][21] : Cet outil CLI crée automatiquement un nouveau ticket de support et envoie un fichier compressé contenant les logs pertinents expurgés, les paramètres de niveau de débogage et les configurations locales au support Datadog, sans connexion requise. Pour plus d'informations sur la façon d'utiliser et d'envoyer le flare à Datadog support, consultez [Envoyer un flare][21].  
* [**Fleet Automation**][5] : Permet la génération de flare à distance depuis le Platform UI.

## Apprendre les bases de Datadog {#learn-datadog-basics}

Familiarisez-vous rapidement avec les parties de Datadog les plus importantes pour votre cas d'utilisation. Commencez par vous inscrire à nos cours gratuits du [Learning Center][1]. Intégrez les cours suivants à vos workflows d'intégration :

**Mise en route** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Fondamentaux de Datadog{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}Bonnes pratiques de tagging{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-software-catalog" >}}Gestion du catalogue{{< /nextlink >}}
{{< /whatsnext >}}

**Administrateurs** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}L'Agent sur un host{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Surveillance d'un cluster Kubernetes{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}Datadog API : automatisation et infrastructure en tant que code{{< /nextlink >}}
{{< /whatsnext >}} 

**Interface utilisateur** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Introduction aux dashboards{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}Découverte des Graph Widgets{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}Utilisation des dashboards et des SLO{{< /nextlink >}}
{{< /whatsnext >}}

**Ingénieurs de fiabilité de site** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Datadog 101 : Ingénieur en fiabilité de site{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}Monitors et alertes APM{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}Utilisation de Datadog RUM pour suivre les indicateurs Web essentiels{{< /nextlink >}}
{{< /whatsnext >}}

**Développeurs** :
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Configuration de l'APM pour les applications Java{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog 101 : Développeur{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}Suivi des erreurs avec RUM pour les applications web JavaScript{{< /nextlink >}}
{{< /whatsnext >}}

## Créez un environnement de test {#create-a-test-environment}

Après avoir suivi certains cours, appliquez ce que vous avez appris à vos conditions locales. Installez et expérimentez Datadog dans un bac à sable à faible risque, afin de vous familiariser avec l'environnement. Créez un environnement simple et accessible pour développer votre configuration de monitoring avant une installation plus large. 

### Configuration de votre environnement de test {#configuring-your-test-environment}

#### Dans l'application {#in-app}

L'[interface utilisateur Datadog][18] est le meilleur endroit pour commencer à construire votre environnement de test. La plateforme fournit une assistance à la configuration, des analyseurs automatiques de données en temps réel, des suggestions contextuelles et de nombreux autres outils. L'interface utilisateur Datadog fournit des ressources utiles pour accomplir certaines de ces tâches. 

Voici quelques exemples :

* Créez un [Synthetic Monitoring test][14] pour commencer à tester les transactions métier critiques sur vos applications.
* Créez quelques [Service Level Objectives][15] (SLOs) pour définir des cibles de performance applicative.
* Consultez la page [APM Service Setup][9] et suivez les instructions étape par étape pour commencer à instrumenter vos services.
* Configurez et testez des [Log Pipelines][8] pour déterminer comment vous souhaitez ingérer différents ensembles de logs provenant de l'infrastructure et des applications.
* Consultez la page [Monitor Templates][10] pour commencer à ajouter des alertes sur votre environnement de test.

#### Host Agent Config Templates {#host-agent-config-templates}

Le [Datadog Agent][2] est open source et publié sur GitHub. Le dépôt GitHub du [Datadog Agent] est une ressource utile pour consulter les modèles de configuration et les spécifications afin de vous aider à construire votre environnement. 

Voici quelques exemples :

* [Agent Config Examples][3]
* [Integration Config Specs][4]   
* [Fleet Automation][5]

## Prochaines étapes {#next-steps}

Pour réussir la création d'une nouvelle installation Datadog, consultez la page [plan][11]. Vous apprendrez à créer un exercice de définition de périmètre, à configurer le [tagging de ressource][12], à découvrir les meilleures pratiques produit, à ajouter d'autres produits et à optimiser votre collecte de données pour garantir une installation fluide.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.datadoghq.com/
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
[4]: https://github.com/DataDog/integrations-core
[5]: https://app.datadoghq.com/fleet
[6]: /fr/getting_started/tagging/unified_service_tagging/
[7]: /fr/getting_started/tagging/
[8]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[9]: https://app.datadoghq.com/apm/service-setup
[10]: https://app.datadoghq.com/monitors/templates
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