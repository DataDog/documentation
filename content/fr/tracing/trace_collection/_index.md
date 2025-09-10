---
aliases:
- /fr/tracing/setup
- /fr/tracing/send_traces/
- /fr/tracing/setup/
- /fr/tracing/environments/
- /fr/tracing/setup/environment
- /fr/tracing/setup/first_class_dimensions
- /fr/tracing/getting_further/first_class_dimensions/
- /fr/agent/apm/
- /fr/tracing/setup_overview/
- /fr/tracing/trace_collection/library_injection_remote
description: Débuter avec l'APM Datadog
further_reading:
- link: tracing/trace_collection/compatibilité
  tag: Documentation
  text: Exigences de compatibilité
title: Instrumentation de lʼapplication
---

## Section Overview

Pour commencer avec Datadog APM, suivez les étapes clés suivantes : 

1. Installez et configurez l'Agent Datadog.  
2. Instrumentez votre application.

<div class="alert alert-info"><strong>Simplifiez votre configuration !</strong> Installez l'Agent et instrumentez votre application en une seule étape grâce à la <a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a>.</div>

L'instrumentation de votre application permet d'envoyer des données d'observabilité à l'Agent, qui les transmet ensuite à l'interface Datadog.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="Le pipeline de l'APM">}}

## Types d'instrumentation 

Il existe principalement deux approches pour instrumenter votre application : automatique ou personnalisée {{< tooltip glossary="instrumentation" >}}.

### Instrumentation automatique

Créez des {{< tooltip glossary="span" >}} dans votre application avec un minimum d'étapes manuelles. Pour instrumenter automatiquement votre application, vous pouvez utiliser l'une des options suivantes : 

- [L'instrumentation en une seule étape][7] : Exécutez une commande d'installation en une ligne pour installer l'Agent Datadog, activer l'APM et instrumenter tous vos services sur votre host Linux, votre machine virtuelle ou votre conteneur.
- [Bibliothèques Datadog][8] : Ajoutez les bibliothèques de tracing Datadog à votre application.

Pour en savoir plus, consultez la page [instrumentation automatique][5].

### Instrumentation personnalisée

Capturez les données d'observabilité issues de votre propre code ou de fonctions complexes non prises en charge par l'instrumentation automatique. Pour instrumenter votre application manuellement, vous pouvez utiliser l'une des options suivantes :

- [Bibliothèques Datadog][9] : utilisez les bibliothèques de tracing Datadog pour ajouter et personnaliser la collecte de données dans Datadog.
- [API OpenTelemetry][10] : Utilisez les API OpenTelemetry prises en charge par les bibliothèques Datadog pour une instrumentation neutre vis-à-vis des fournisseurs.

Pour en savoir plus, consultez la page [instrumentation personnalisée][6].

{{< callout url="https://www.datadoghq.com/product-preview/service-discovery/" btn_hidden="false" header="La découverte de services est disponible en Preview" >}}
La découverte de services offre une visibilité complète sur l'état actuel de la supervision de vos applications, en mettant en évidence les lacunes majeures ou les traces rompues dans votre système.
{{< /callout >}}


## Tutoriels de configuration APM

Les tutoriels suivants vous guident dans la mise en place du tracing distribué pour une application exemple dans différents scénarios d'infrastructure, avec instrumentation automatique ou personnalisée, en utilisant les bibliothèques de tracing Datadog :

{{< whatsnext desc="Choisissez le tutoriel correspondant à votre langage et votre environnement :" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Python sur le même host que l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" />Activer le tracing d'une application Python et de l'Agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Python dans un conteneur et d'un Agent sur un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Java sur le même host que l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" />Activer le tracing d'une application Java et de l'Agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Java dans un conteneur et d'un Agent sur un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" />Activer le tracing d'une application Java dans GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" />Activer le tracing d'une application Java dans AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" />Activer le tracing d'une application Java dans Amazon ECS avec EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" />Activer le tracing d'une application Java dans Amazon ECS avec Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" />Activer le tracing d'une application Java avec le contrôleur d'admission{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Go sur le même host que l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" />Activer le tracing d'une application Go  et de l'Agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" />Activer le tracing d'une application Go dans Amazon ECS avec EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" />Activer le tracing d'une application Go dans Amazon ECS avec Fargate{{< /nextlink >}}

{{< /whatsnext >}}
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/community/libraries/#apm-tracing-client-libraries
[2]: /fr/tracing/trace_collection/library_injection_local/
[4]: /fr/tracing/trace_collection/dd_libraries/
[5]: /fr/tracing/trace_collection/automatic_instrumentation/
[6]: /fr/tracing/trace_collection/custom_instrumentation/
[7]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[8]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/
[10]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/