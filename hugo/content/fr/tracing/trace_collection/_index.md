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
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: Blog
  text: Activez la visibilité de bout en bout de vos applications Java avec une seule
    commande
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centre d'Architecture
  text: Instrumentez votre application en utilisant le Datadog Operator et l'Admission
    Controller
title: Instrumentation de lʼapplication
---
## Aperçu {#overview}
Application {{< tooltip glossary="instrumentation" >}} avec Datadog APM implique :

1. **Configuration du SDK** : Ajout d'un SDK Datadog à votre application.
2. **Création de spans** : Capturer des données d'observabilité sous forme de {{< tooltip glossary="span" >}}s.

   Les spans sont générés automatiquement par défaut dès que le SDK est chargé. Ceci est connu sous le nom de **auto-instrumentation** et fournit une visibilité suffisante pour la plupart des utilisateurs. Si vous avez besoin de plus de contrôle, vous pouvez ajouter des spans personnalisés en option.

**Remarque** : Ces étapes supposent que vous avez un [Agent Datadog][5] installé et configuré pour recevoir des traces.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="Le pipeline APM">}}

## Commencer {#getting-started}

<div class="alert alert-info">
<strong>Préférez-vous une instrumentation neutre vis-à-vis des fournisseurs ?</strong> Consultez la <a href="/opentelemetry/">documentation OpenTelemetry</a> pour utiliser OpenTelemetry avec Datadog.
</div>

### Instrumentation en une seule étape (recommandée) {#single-step-instrumentation-recommended}

[Instrumentation en une seule étape][1] (SSI) installe et configure automatiquement les SDK Datadog avec une seule commande. L'auto-instrumentation commence alors immédiatement à capturer des traces de vos frameworks et bibliothèques pris en charge, sans nécessiter de modifications de code.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/" >}}Commencez avec l'instrumentation en une seule étape.{{< /nextlink >}}
{{< /whatsnext >}}

### Configuration manuelle et spans personnalisés {#manual-setup-and-custom-spans}

À mesure que vos besoins en matière d'observabilité augmentent, vous pouvez ajouter plus de contrôle et de personnalisation :

**Pour un contrôle complet de la configuration du SDK :** Utilisez [les SDK Datadog gérés manuellement][2] si vous avez besoin d'un contrôle granulaire sur le comportement et la configuration du SDK.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dd_libraries/" >}}Utilisez des SDK Datadog gérés manuellement.{{< /nextlink >}}
{{< /whatsnext >}}

**Pour des spans personnalisés sans modifications de code :** Utilisez [l'instrumentation dynamique][4] pour créer des spans personnalisés depuis l'interface utilisateur de Datadog sans redéployer votre application.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dynamic_instrumentation/" >}}Ajoutez des spans personnalisés avec l'instrumentation dynamique.{{< /nextlink >}}
{{< /whatsnext >}}

**Pour des spans personnalisés dans le code :** Ajoutez [une instrumentation personnalisée basée sur le code][3] pour instrumenter la logique métier personnalisée ou ajouter des métadonnées spécifiques à l'application aux spans.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/" >}}Ajoutez des spans personnalisés avec une instrumentation basée sur le code.{{< /nextlink >}}
{{< /whatsnext >}}

Ces options peuvent être combinées. Par exemple, vous pouvez commencer avec l'instrumentation en une seule étape et ajouter une instrumentation personnalisée basée sur le code pour des spans spécifiques, ou utiliser des SDK Datadog gérés manuellement avec l'instrumentation dynamique pour ajouter des spans sans déploiement.

## Comparaison détaillée {#detailed-comparison}

### Configuration du SDK {#sdk-setup}

L'instrumentation en une seule étape est le point de départ recommandé pour la plupart des utilisateurs. Si vous avez besoin de plus de contrôle sur la configuration du SDK, vous pouvez utiliser des SDK gérés manuellement à la place :

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/single-step-apm/">L'instrumentation en une seule étape</a> (recommandée)</th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dd_libraries/">SDK gérés manuellement</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Comment cela fonctionne</td>
    <td style="border:1px solid #ccc;">Datadog installe et charge automatiquement les SDK dans vos processus d'application, au moment de l'exécution, avec une seule commande.</td>
    <td style="border:1px solid #ccc;">Vous installez et configurez les SDK directement dans votre code d'application ou votre processus de construction.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Changements de code ?</td>
    <td style="border:1px solid #ccc;">Non</td>
    <td style="border:1px solid #ccc;">Oui</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Complexité de configuration</td>
    <td style="border:1px solid #ccc;">Faible - configuration minimale requise</td>
    <td style="border:1px solid #ccc;">Moyenne - nécessite une configuration d'environnement et de construction</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Contrôle de configuration</td>
    <td style="border:1px solid #ccc;">Valeurs par défaut standard avec options de remplacement</td>
    <td style="border:1px solid #ccc;">Contrôle total via des variables d'environnement et du code</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Quand utiliser</td>
    <td style="border:1px solid #ccc;">Commencez ici pour une instrumentation rapide et cohérente à travers les services sans nécessiter de modifications de code.</td>
    <td style="border:1px solid #ccc;">Progressez vers cela lorsque vous avez besoin d'un contrôle granulaire sur le comportement et la configuration des SDK.</td>
  </tr>
</table>

### Personnalisation des spans {#span-customization}

L'auto-instrumentation crée automatiquement des spans pour les frameworks et bibliothèques pris en charge, fournissant une observabilité essentielle sans travail supplémentaire. Lorsque vous avez besoin de visibilité sur des chemins de code personnalisés ou que vous souhaitez enrichir les traces avec des données spécifiques à l'application, vous pouvez ajouter des spans personnalisés en utilisant soit l'instrumentation dynamique, soit l'instrumentation personnalisée basée sur le code :

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dynamic_instrumentation/">Instrumentation dynamique</a></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/custom_instrumentation/">Instrumentation personnalisée basée sur le code</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Comment cela fonctionne</td>
    <td style="border:1px solid #ccc;">Configurez les règles d'instrumentation dans l'interface utilisateur de Datadog ; les règles sont appliquées au moment de l'exécution.</td>
    <td style="border:1px solid #ccc;">Ajoutez des appels d'API de traçage explicites dans le code de votre application.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Changements de code ?</td>
    <td style="border:1px solid #ccc;">Non</td>
    <td style="border:1px solid #ccc;">Oui</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Déploiement requis</td>
    <td style="border:1px solid #ccc;">Non</td>
    <td style="border:1px solid #ccc;">Oui (pour ajouter ou modifier des spans)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Quand utiliser</td>
    <td style="border:1px solid #ccc;">Ajoutez des spans personnalisés sans modifications de code ni redéploiements.</td>
    <td style="border:1px solid #ccc;">Progressez vers cela lorsque vous avez besoin d'une logique d'instrumentation complexe ou souhaitez que les spans soient définis de manière permanente dans le code.</td>
  </tr>
</table>

## Tutoriels de configuration APM {#apm-setup-tutorials}

Les tutoriels suivants vous guident à travers la configuration du traçage distribué pour une application d'exemple dans divers scénarios d'infrastructure, avec à la fois une instrumentation automatique et personnalisée :

{{< whatsnext desc="Choisissez votre langue et votre environnement :" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage sur une application Python sur le même hôte que l'agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Activation du traçage sur une application Python et l'agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage pour une application Python dans un conteneur et un agent sur un hôte{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage sur une application Java sur le même hôte que l'agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Activation du traçage sur une application Java et l'agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage pour une application Java dans un conteneur et un agent sur un hôte{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Activation du traçage pour une application Java sur GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Activation du traçage pour une application Java sur Amazon EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Activation du traçage pour une application Java dans Amazon ECS avec EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Activation du traçage pour une application Java dans Amazon ECS avec Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Activation du traçage pour une application Java avec le contrôleur d'admission{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Activation du traçage sur une application Go sur le même hôte que l'agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Activation du traçage sur une application Go et l'agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Activation du traçage pour une application Go dans Amazon ECS avec EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Activation du traçage pour une application Go dans Amazon ECS avec Fargate{{< /nextlink >}}

{{< /whatsnext >}}

##  Lecture complémentaire {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/single-step-apm/
[2]: /fr/tracing/trace_collection/dd_libraries/
[3]: /fr/tracing/trace_collection/custom_instrumentation/
[4]: /fr/tracing/trace_collection/dynamic_instrumentation/
[5]: /fr/agent/