---
algolia:
  tags:
  - apm automatic instrumentation
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
- /fr/tracing/trace_collection/automatic_instrumentation
description: Débuter avec l'APM Datadog
further_reading:
- link: tracing/trace_collection/compatibility
  tag: Documentation
  text: Exigences de compatibilité
- link: /tracing/glossary/
  tag: Documentation
  text: Termes et concepts de la solution APM
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Architecture Center
  text: Instrumentez votre application en utilisant l'Opérateur Datadog et le Contrôleur
    d'admission
title: Instrumentation de lʼapplication
---

## Présentation

Pour commencer avec Datadog APM, suivez les étapes clés suivantes : 

1. Installez et configurez l'Agent Datadog.  
2. Instrumentez votre application.

<div class="alert alert-info"><strong>Simplifiez votre configuration !</strong> Installez l'Agent et instrumentez votre application en une seule étape avec <a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">Instrumentation en une seule étape</a>.</div>

L'instrumentation de votre application permet d'envoyer des données d'observabilité à l'Agent, qui les transmet ensuite à l'interface Datadog.

...


## Types d'instrumentation 

Il existe deux approches principales pour {{< tooltip glossary="instrument" >}} votre application :

**Instrumentation automatique** crée des {{< tooltip glossary="span" >}}s pour votre application avec un minimum d'étapes manuelles, capturant des données d'observabilité essentielles à travers des bibliothèques et des langages courants avec une configuration minimale.

**Instrumentation personnalisée** capture des données d'observabilité à partir de code interne ou de fonctions complexes qui ne sont pas capturées par l'instrumentation automatique, fournissant une visibilité et un contexte plus profonds sur les spans lorsque vous avez besoin d'un contrôle granulaire.

Le tableau suivant compare les différentes méthodes d'instrumentation disponibles.

<div class="alert alert-info">
Si vous préférez une instrumentation neutre vis-à-vis des fournisseurs, consultez la <a href="https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">documentation OpenTelemetry</a> pour utiliser le support de l'API OpenTelemetry dans les bibliothèques Datadog.
</div>

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  ...
  <tr style="background-color:#d4d4e8;">
    <th style="border:1px solid #ccc; background-color:#d4d4e8;"></th>
    <th colspan="2" style="border:1px solid #ccc; border-right:2px solid #999; text-align:center; background-color:#d4d4e8; font-weight:bold; text-transform:uppercase; font-size:1.15em; padding:12px 8px;">
      Instrumentation automatique
    </th>
    <th colspan="2" style="border:1px solid #ccc; text-align:center; background-color:#d4d4e8; font-weight:bold; text-transform:uppercase; font-size:1.15em; padding:12px 8px;">
      Instrumentation personnalisée
    </th>
  </tr>
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/tracing/trace_collection/automatic_instrumentation/single-step-apm/">Instrumentation par étape unique</a></th>
    <th style="border:1px solid #ccc; border-right:2px solid #999; text-transform:uppercase; font-weight:bold;"><a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/">SDKs gérés manuellement</a></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/tracing/trace_collection/custom_instrumentation/">Instrumentation personnalisée basée sur le code</a></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/tracing/dynamic_instrumentation/">Instrumentation dynamique</a><br>(Instrumentation personnalisée basée sur l'UI)</th>
  </tr>

  <!-- Body rows -->
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Description</td>
    <td style="border:1px solid #ccc;">Avec une seule commande, Datadog charge automatiquement les SDKs de langage dans vos processus d'application. Vous pouvez également contrôler quels processus instrumenter.</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Ajoutez les SDKs de langage Datadog à vos applications. Le SDK gère l'instrumentation automatiquement.</td>
    <td style="border:1px solid #ccc;">Ajoutez des appels d'API de traçage explicites ou une logique de span dans votre code d'application.</td>
    <td style="border:1px solid #ccc;">Ajoutez des règles d'instrumentation dans l'UI de Datadog. Les règles sont appliquées dynamiquement à l'exécution et ne nécessitent pas de modifications de code.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Modifications de code ?</td>
    <td style="border:1px solid #ccc;">Non</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Non</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">Non</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Modifications de configuration de l'environnement ?</td>
    <td style="border:1px solid #ccc;">Non</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Yes</td>
    <td style="border:1px solid #ccc;">Yes</td>
    <td style="border:1px solid #ccc;">Non</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Complexité de configuration</td>
    <td style="border:1px solid #ccc;">Léger</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Modéré</td>
    <td style="border:1px solid #ccc;">Élevé</td>
    <td style="border:1px solid #ccc;">Léger</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Meilleur pour</td>
    <td style="border:1px solid #ccc;">SRE, administrateurs ou équipes centrales qui souhaitent un traçage entre les services sans intervention des développeurs.</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Équipes de développement d'applications qui souhaitent instrumenter les applications individuellement avec un contrôle granulaire sur la configuration via des variables d'environnement.</td>
    <td style="border:1px solid #ccc;">Équipes ayant besoin de logique personnalisée, de spans spécialisés ou de visibilité sur des chemins de code personnalisés.</td>
    <td style="border:1px solid #ccc;">Équipes souhaitant ajouter des spans, des journaux ou des métriques à des emplacements de code spécifiques à l'exécution sans redéployer ou modifier le code source. La configuration est gérée via l'interface utilisateur de Datadog.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Cas d'utilisation</td>
    <td colspan="2" style="border:1px solid #ccc; border-right:2px solid #999;">
      <ul style="margin:0; padding-left:20px; font-size:inherit;">
        <li style="font-size:inherit;">Pour capturer des données d'observabilité essentielles avec les bibliothèques et les langages courants, le tout sans configuration complexe.</li>
        <li style="font-size:inherit;">Pour activer la surveillance en temps réel avec des paramètres pré-configurés et ainsi analyser sans attendre les performances de votre application.</li>
        <li style="font-size:inherit;">Simplifier la configuration de l'observabilité pour les projets où l'instrumentation personnalisée n'est pas requise.</li>
      </ul>
    </td>
    <td colspan="2" style="border:1px solid #ccc;">
      <ul style="margin:0; padding-left:20px; font-size:inherit;">
        <li style="font-size:inherit;">Collecter des données d'observabilité à partir de code personnalisé avec une logique métier unique ou complexe.</li>
        <li style="font-size:inherit;">Fournir une visibilité et un contexte plus profonds sur les spans, y compris l'ajout d'étiquettes de span.</li>
        <li style="font-size:inherit;">Surveiller précisément des séquences spécifiques d'opérations ou d'interactions utilisateur nécessitant un contrôle granulaire.</li>
        <li style="font-size:inherit;">Supprimer les spans indésirables des traces.</li>
      </ul>
    </td>
  </tr>
</table>


## Tutoriels de configuration APM

Les tutoriels suivants vous guident dans la mise en place du tracing distribué pour une application exemple dans différents scénarios d'infrastructure, avec instrumentation automatique ou personnalisée, en utilisant les bibliothèques de tracing Datadog :

{{< whatsnext desc="Choose your language and environment:" >}} {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage sur une application Python sur le même hôte que l'agent Datadog{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Activation du traçage sur une application Python et l'agent Datadog dans des conteneurs{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage pour une application Python dans un conteneur et un agent sur un hôte{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage sur une application Java sur le même hôte que l'agent Datadog{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Activation du traçage sur une application Java et l'agent Datadog dans des conteneurs{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage pour une application Java dans un conteneur et un agent sur un hôte{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Activation du traçage pour une application Java sur GKE{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Activation du traçage pour une application Java sur AWS EKS{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Activation du traçage pour une application Java dans Amazon ECS avec EC2{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Activation du traçage pour une application Java dans Amazon ECS avec Fargate{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Activation du traçage pour une application Java avec le contrôleur d'admission{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage sur une application Go sur le même hôte que l'agent Datadog{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Activation du traçage sur une application Go et l'agent Datadog dans des conteneurs{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Activation du traçage pour une application Go dans Amazon ECS avec EC2{{< /nextlink >}} {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Activation du traçage pour une application Go dans Amazon ECS avec Fargate{{< /nextlink >}}

...
## Pour aller plus loin

...