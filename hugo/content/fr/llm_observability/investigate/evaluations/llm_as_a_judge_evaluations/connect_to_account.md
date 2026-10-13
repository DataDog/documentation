---
aliases:
- /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
- /fr/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/connect_to_account/
description: Comment connecter votre compte de fournisseur LLM afin de prendre en
  charge des évaluations reposant sur un LLM servant de juge.
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: Documentation
  text: En savoir plus sur les évaluations personnalisées « LLM-as-a-judge ».
title: Connectez votre compte de fournisseur LLM
---
## Connectez votre compte de fournisseur LLM {#connect-your-llm-provider-account}

Configurez le fournisseur LLM que vous souhaitez utiliser pour les évaluations avec votre propre clé (BYOK). Vous n'avez à effectuer cette étape qu'une seule fois.

{{< tabs >}}
{{% tab "OpenAI" %}}

<div class="alert alert-danger">Si vous êtes soumis à la loi HIPAA, il vous incombe de vous assurer que vous vous connectez uniquement à un compte OpenAI soumis à un accord d'association commerciale (BAA) et répondant à toutes les exigences de conformité HIPAA.</div>

Connectez votre compte OpenAI à Agent Observability avec votre clé d'API OpenAI.

1. Dans Datadog, accédez à [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Sélectionnez {{< ui >}}Connect{{< /ui >}} sur la tuile OpenAI.
1. Suivez les instructions sur la tuile.
   - Fournissez votre clé d'API OpenAI. Assurez-vous que cette clé dispose de l'autorisation {{< ui >}}write{{< /ui >}} pour {{< ui >}}model capabilities{{< /ui >}}.
1. Activez {{< ui >}}Use this API key to evaluate your LLM applications{{< /ui >}}.
1. Agent Observability nécessite que l'endpoint de l'API `complete/chat` soit disponible pour le modèle sélectionné. Consultez la [page de présentation des modèles d'OpenAI][3] pour plus de détails sur les modèles prenant en charge cet endpoint.

{{< img src="llm_observability/configuration/openai-tile.png" alt="La tuile de configuration OpenAI dans Agent Observability. Liste les instructions pour configurer OpenAI et fournir votre clé d'API OpenAI." style="width:100%;" >}}

Agent Observability ne prend pas en charge la [résidence des données][2] pour OpenAI.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/guides/your-data#which-models-and-features-are-eligible-for-data-residency
[3]: https://developers.openai.com/api/docs/models
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-danger">Si vous êtes soumis à la loi HIPAA, il vous incombe de vous assurer que vous vous connectez uniquement à un compte Azure OpenAI soumis à un accord d'association commerciale (BAA) et répondant à toutes les exigences de conformité HIPAA.</div>

Connectez votre compte Azure OpenAI à Agent Observability avec votre clé d'API OpenAI. Datadog recommande vivement d'utiliser le modèle `GPT-4o mini` pour les évaluations. La version du modèle sélectionnée doit prendre en charge la [sortie structurée][8], et l'API Chat Completions doit être disponible. Consultez la [liste complète des modèles compatibles][9].

1. Dans Datadog, accédez à [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Sélectionnez {{< ui >}}Connect{{< /ui >}} sur la tuile Azure OpenAI.
1. Suivez les instructions sur la tuile.
   - Fournissez votre clé d'API Azure OpenAI. Assurez-vous que cette clé dispose de l'autorisation {{< ui >}}write{{< /ui >}} pour {{< ui >}}model capabilities{{< /ui >}}.
   - Fournissez le nom de la ressource, l'ID de déploiement et la version de l'API pour terminer l'intégration.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="La tuile de configuration Azure OpenAI dans Agent Observability. Répertorie les instructions pour configurer Azure OpenAI et fournir votre clé d'API, le nom de la ressource, l'ID de déploiement et la version de l'API." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[8]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/structured-outputs
[9]: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?tabs=global-standard-aoai%2Cglobal-standard&pivots=azure-openai
{{% /tab %}}
{{% tab "Anthropic" %}}

<div class="alert alert-danger">Si vous êtes soumis à la loi HIPAA, il vous incombe de vous assurer que vous vous connectez uniquement à un compte Anthropic soumis à un accord d'association commerciale (BAA) et répondant à toutes les exigences de conformité HIPAA.</div>

Connectez votre compte Anthropic à Agent Observability avec votre clé d'API Anthropic.

1. Dans Datadog, accédez à [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Sélectionnez {{< ui >}}Connect{{< /ui >}} sur la tuile Anthropic.
1. Suivez les instructions sur la tuile.
   - Fournissez votre clé d'API Anthropic. Assurez-vous que cette clé dispose de l'autorisation {{< ui >}}write{{< /ui >}} pour {{< ui >}}model capabilities{{< /ui >}}.

{{< img src="llm_observability/configuration/anthropic-tile.png" alt="La tuile de configuration Anthropic dans Agent Observability. Répertorie les instructions pour configurer Anthropic et fournir votre clé d'API Anthropic." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Amazon Bedrock" %}}

<div class="alert alert-danger">Si vous êtes soumis à la loi HIPAA, il vous incombe de vous assurer que vous vous connectez uniquement à un compte Amazon Bedrock soumis à un accord d'association commerciale (BAA) et répondant à toutes les exigences de conformité HIPAA.</div>

Connectez votre compte Amazon Bedrock à Agent Observability avec votre compte AWS.

1. Dans Datadog, accédez à [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Sélectionnez {{< ui >}}Connect{{< /ui >}} sur la tuile Amazon Bedrock.
1. Suivez les instructions sur la tuile.

   {{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="La tuile de configuration Amazon Bedrock dans Agent Observability. Liste les instructions pour configurer Amazon Bedrock." style="width:100%;" >}}

4. Assurez-vous de configurer le rôle {{< ui >}}Invoke models from Amazon Bedrock{{< /ui >}} pour exécuter les évaluations. Plus de détails sur l'action InvokeModel sont disponibles dans la [documentation de référence de l'API Amazon Bedrock][2].


   {{< img src="llm_observability/configuration/amazon-bedrock-tile-step-2.png" alt="La deuxième étape de la configuration d'Amazon Bedrock consiste à ajouter des autorisations au compte d'intégration." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
{{% /tab %}}

{{% tab "GCP Vertex AI" %}}

<div class="alert alert-danger">Si vous êtes soumis à la loi HIPAA, il vous incombe de vous assurer que vous vous connectez uniquement à un compte Google Cloud Platform soumis à un accord d'association commerciale (BAA) et répondant à toutes les exigences de conformité HIPAA.</div>

Connectez Vertex AI à Agent Observability avec votre compte Google Cloud Platform.

1. Dans Datadog, accédez à [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Sur la tuile Google Cloud Vertex AI, cliquez sur {{< ui >}}Connect{{< /ui >}} pour ajouter un nouveau compte GCP, ou cliquez sur {{< ui >}}Configure{{< /ui >}} à côté de la liste de vos comptes existants pour commencer le processus d'intégration.
   - Vous verrez tous les comptes GCP connectés à Datadog sur cette page. Cependant, vous devez toujours suivre le processus d'intégration pour qu'un compte puisse être utilisé dans Agent Observability.
1. Suivez les instructions d'intégration pour configurer votre compte.
   - Ajoutez le rôle [{{< ui >}}Vertex AI User{{< /ui >}}][2] à votre compte et activez le [{{< ui >}}Vertex AI API{{< /ui >}}][3].

{{< img src="llm_observability/configuration/vertex-ai-pint.png" alt="Le workflow d'intégration de Vertex AI. Suivez les étapes pour configurer votre compte de service GCP avec les autorisations Vertex AI appropriées pour une utilisation avec Agent Observability." style="width:100%;" >}}

**Remarque** : Lorsque vous exécutez des évaluations, le sélecteur d'emplacement propose des options pour une région unique, plusieurs régions et une option globale. Pour plus de détails sur chaque option, consultez la [documentation sur les emplacements Vertex AI de Google][4].

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user
[3]: https://console.cloud.google.com/apis/library/aiplatform.googleapis.com
[4]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations
{{% /tab %}}

{{% tab "Passerelle IA" %}}
<div class="alert alert-danger">Si vous êtes soumis à la loi HIPAA, il vous incombe de vous assurer que vous vous connectez uniquement à une passerelle IA soumise à un accord d'association commerciale (BAA) et répondant à toutes les exigences de conformité HIPAA.</div>

Votre passerelle IA doit être compatible avec la [spécification de l'API OpenAI][2].

Connectez votre passerelle IA à Agent Observability avec votre URL de base, votre clé d'API et vos en-têtes.

1. Dans Datadog, accédez à [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Cliquez sur l'onglet {{< ui >}}Configure{{< /ui >}}, puis cliquez sur {{< ui >}}New{{< /ui >}} pour créer une nouvelle passerelle.
1. Suivez les instructions sur la tuile.
   - Indiquez un nom pour votre passerelle.
   - Sélectionnez votre fournisseur.
   - Indiquez votre URL de base.
   - Fournissez votre clé d'API et, éventuellement, tous les en-têtes.

{{< img src="llm_observability/configuration/ai-gateway-tile-3.png" alt="La tuile de configuration de la passerelle IA dans Agent Observability. Liste les instructions pour configurer une passerelle IA" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/api-reference/introduction
{{% /tab %}}
{{< /tabs >}}

Si votre fournisseur de LLM restreint les adresses IP, vous pouvez obtenir les plages IP requises en consultant la [documentation sur les plages IP de Datadog][2], en sélectionnant votre `Datadog Site`, en collant l'URL `GET` dans votre navigateur et en copiant la section `webhooks`.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: /fr/api/latest/ip-ranges/