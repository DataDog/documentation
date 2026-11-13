---
description: Comment créer des évaluations personnalisées LLM-as-a-judge et utiliser
  ces résultats d'évaluation dans Agent Observability.
further_reading:
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Stimuler le retour sur investissement de l''IA : comment Datadog connecte
    les coûts, les performances et l''infrastructure pour vous permettre d''évoluer
    de manière responsable'
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenez une visibilité sur les flux de travail des agents Strands avec Datadog
    LLM Observability.
- link: https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/
  tag: Blog
  text: 'Construire un cadre d''évaluation LLM : meilleures pratiques'
- link: /llm_observability/terms/
  tag: Documentation
  text: En savoir plus sur les termes et concepts d'Agent Observability.
- link: /llm_observability/setup
  tag: Documentation
  text: Apprenez à configurer Agent Observability.
- link: /llm_observability/evaluations/managed_evaluations
  tag: Documentation
  text: En savoir plus sur les évaluations gérées
- link: https://huggingface.co/learn/cookbook/llm_judge
  tag: Hugging Face
  text: Utiliser LLM-as-a-judge pour une évaluation automatisée et polyvalente
title: Évaluations personnalisées LLM-as-a-judge
---
Les évaluations personnalisées LLM-as-a-judge utilisent un LLM pour juger les performances d'un autre LLM. Définissez la logique d'évaluation avec des prompts en langage naturel, capturez des critères subjectifs ou objectifs (comme le ton, l'utilité ou la véracité), et exécutez les évaluations à grande échelle sur :

- **Périmètre du span**—évaluez l'entrée et la sortie d'un appel LLM, d'une étape d'agent ou d'un appel d'outil de manière isolée.
- **Périmètre de la trace**—fournissez chaque span d'une trace au juge LLM dans un seul prompt, afin que l'évaluation puisse raisonner sur plusieurs étapes. Consultez [Évaluations au niveau de la trace][16] pour obtenir la procédure complète, les cas d'utilisation et des exemples de prompts.
- **Périmètre de la session**—fournissez chaque trace d'une session utilisateur (et chaque span de ces traces) au juge LLM dans un seul prompt, afin que l'évaluation puisse raisonner sur une interaction complète à plusieurs tours. Consultez [Évaluations au niveau de la session][17] pour obtenir la procédure complète, les cas d'utilisation et des exemples de prompts.

## Créer une évaluation personnalisée LLM-as-a-judge {#create-a-custom-llm-as-a-judge-evaluation}

Vous pouvez créer et gérer des évaluations personnalisées depuis la [Evaluations page][1] dans Agent Observability. Vous pouvez fournir une description d'évaluation pour générer une évaluation, utiliser et développer des [évaluations modèles LLM-as-a-judge][7] que nous fournissons, ou partir de zéro. Vous pouvez activer le traçage pour voir les traces de vos évaluations.

<div class="alert alert-info">Si vous avez déjà un <code>LLMJudge</code> défini dans le SDK, vous pouvez le publier directement sur Datadog sans reconstruire la configuration dans l'interface utilisateur. Voir <a href="/llm_observability/guide/evaluation_developer_guide/#publishing-an-llmjudge-as-a-datadog-managed-evaluation">Publier un LLMJudge en tant qu'évaluation gérée par Datadog</a>.</div>

En savoir plus sur les [exigences de compatibilité][6].

### Configurez l'invite {#configure-the-prompt}

1. Dans Datadog, accédez à la [Evaluations page][1] d'Agent Observability. Sélectionnez {{< ui >}}Create Evaluation{{< /ui >}}, puis sélectionnez {{< ui >}}Create your own{{< /ui >}}.
   {{< img src="llm_observability/evaluations/EvalConfig_LLMO_1.png" alt="La page Evaluations d'Agent Observability après avoir sélectionné Create Evaluation." style="width:100%;" >}}
1. Pour activer le traçage des évaluations, cliquez sur le bouton {{< ui >}}Tracing Disabled{{< /ui >}}, puis sélectionnez le commutateur {{< ui >}}Trace Evaluations{{< /ui >}} pour activer le traçage. Lorsque cette évaluation s'exécute, ses traces apparaissent sous `datadog-evaluations`, vous offrant une meilleure visibilité sur vos évaluations. **Remarque** : L'activation du traçage augmente le nombre de spans facturés envoyés à Datadog.
    {{< img src="llm_observability/evaluations/evaluation_tracing_enabled.png" alt="Évaluations de traces activées après la sélection du commutateur pour activer le traçage des évaluations." >}}
1. Fournissez un {{< ui >}}evaluation name{{< /ui >}} clair et descriptif (par exemple, `factuality-check` ou `tone-eval`). Vous pouvez utiliser ce nom lors de l'interrogation des résultats d'évaluation. Le nom doit être unique au sein de votre application.
1. Configurez le modèle :
    1. Sélectionnez le menu déroulant {{< ui >}}Account{{< /ui >}} pour choisir le fournisseur LLM et le compte correspondant à utiliser pour votre juge LLM. Pour connecter un nouveau compte, consultez [connecter un fournisseur LLM][2].
        - Si vous sélectionnez un compte {{< ui >}}Amazon Bedrock{{< /ui >}}, choisissez une région pour laquelle le compte est configuré. Vous pouvez ensuite sélectionner un nom de modèle ou fournir l'ARN du profil d'inférence.
        - Si vous sélectionnez un compte {{< ui >}}Vertex{{< /ui >}}, choisissez un projet et un emplacement. Le menu déroulant {{< ui >}}Location{{< /ui >}} inclut des options mono-région, multi-région et globale. Pour plus de détails sur chaque option, consultez la [documentation sur les emplacements de Vertex AI de Google][18].
    1. Utilisez le menu déroulant {{< ui >}}Model{{< /ui >}} pour sélectionner un modèle.
1. Dans {{< ui >}}Runs On{{< /ui >}}, sélectionnez l'application que vous souhaitez évaluer, ce que vous souhaitez évaluer (span, trace ou session) et le taux d'échantillonnage. Vous pouvez ajouter d'autres critères de filtrage en sélectionnant le bouton à droite du taux d'échantillonnage.
1. Dans la section {{< ui >}}Template{{< /ui >}}, utilisez le menu déroulant :
   - {{< ui >}}Create from scratch{{< /ui >}} : Utilisez votre propre prompt personnalisé (défini à l'étape suivante).
   - {{< ui >}}Failure to Answer{{< /ui >}}, {{< ui >}}Prompt Injection{{< /ui >}}, {{< ui >}}Sentiment{{< /ui >}}, etc. : Remplissez un modèle de prompt préexistant. Vous pouvez utiliser ces modèles tels quels ou les modifier pour qu'ils correspondent à votre logique d'évaluation spécifique.
1. Dans le champ {{< ui >}}System Prompt{{< /ui >}}, saisissez votre prompt personnalisé ou modifiez un modèle de prompt.
   Pour les prompts personnalisés, fournissez des instructions claires décrivant ce que l'évaluateur doit évaluer.
   - Concentrez-vous sur un seul objectif d'évaluation
   - Incluez 2 à 3 exemples few-shot montrant des paires entrée/sortie, les résultats attendus et le raisonnement.

{{% collapse-content title="Exemple de prompt personnalisé" level="h4" expanded=false id="custom-prompt-example" %}}
**Prompt système**

```
You will be looking at interactions between a user and a budgeting AI agent. Your job is to classify the user's intent when it comes to using the budgeting AI agent.

You will be given a Span Input, which represents the user's message to the agent, which you will then classify. Here are some examples.

Span Input: What are the core things I should know about budgeting?
Classification: general_financial_advice

Span Input: Did I go over budget with my grocery bills last month?
Classification: budgeting_question

Span Input: What is the category for which I have the highest budget?
Classification: budgeting_question

Span Input: Based on my past months, what is my ideal budget for subscriptions?
Classification: budgeting_advice

Span Input: Raise my restaurant budget by $50
Classification: budgeting_request

Span Input: Help me plan a trip to the Maldives
Classification: unrelated
```

**Utilisateur**

```
Span Input: {{span_input}}
```
{{% /collapse-content %}}

8. Dans le champ {{< ui >}}User Prompt{{< /ui >}}, spécifiez les parties du span, de la trace ou de la session à évaluer en ajoutant des variables. Vous pouvez ajouter n'importe quel attribut de span, tel que Span Input (`{{span_input}}`), Output (`{{span_output}}`), or any other span field. For trace-scoped evaluations, use `{{spans...}}` paths to read across spans; for session-scoped evaluations, use `{{traces...}}` chemins à lire à travers les traces. Consultez [Modèles d'invite][15] pour la référence complète. Pour modifier directement l'invite utilisateur, sélectionnez-la et modifiez le texte.

   Vous pouvez également utiliser le panneau sur la droite ({{< ui >}}Filtered Spans{{< /ui >}} dans le périmètre du span, {{< ui >}}Filtered Traces{{< /ui >}} dans le périmètre de la trace, {{< ui >}}Filtered Sessions{{< /ui >}} dans le périmètre de la session) pour ajouter des données de span en tant que variable :
   1. Choisissez un compte et une application afin que les spans, les traces ou les sessions s'affichent sur la droite.
   2. Sélectionnez l'un des spans sur la droite pour afficher son JSON.
   3. Sélectionnez {{< ui >}}+{{< /ui >}} pour ajouter le JSON à votre invite utilisateur.

{{< img src="llm_observability/evaluations/custom_llm_judge_2-5.png" alt="Le contenu du menu de la vue JSON dans le volet droit de configuration de l'évaluation personnalisée, affichant l'option Add variable to message." style="width:40%;" >}}

### Définissez la sortie d'évaluation {#define-the-evaluation-output}

Pour les modèles OpenAI, Azure OpenAI, Vertex AI, Anthropic ou Amazon Bedrock, configurez [Structured Output](#structured-output).

Pour les modèles Anthropic ou Amazon Bedrock, vous pouvez également configurer [Keyword Search Output](#keyword-search-output).

Pour AI Gateway, [Structured Output](#structured-output) et [Keyword Search Output](#keyword-search-output) sont toutes deux prises en charge. Datadog recommande d'utiliser Structured Output lorsque votre modèle la prend en charge, et de recourir à Keyword Search Output dans le cas contraire.

{{% collapse-content title="Structured Output (OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, AI Gateway, Vertex AI)" level="h4" expanded="true" id="structured-output" %}}
1. Sélectionnez un type de sortie d'évaluation :

   - {{< ui >}}Boolean{{< /ui >}} : Résultats vrai/faux (par exemple, « Le modèle a-t-il suivi les instructions ? »)
   - {{< ui >}}Score{{< /ui >}} : Évaluations numériques (par exemple, une échelle de 1 à 5 pour l'utilité)
   - {{< ui >}}Categorical{{< /ui >}} : Étiquettes discrètes (par exemple, « Good », « Bad », « Neutral »)
   - {{< ui >}}JSON{{< /ui >}} : JSON permet des schémas de forme libre

2. Optionnellement, sélectionnez {{< ui >}}Enable Reasoning{{< /ui >}}. Ceci configure le juge LLM pour fournir une courte justification de sa décision (par exemple, pourquoi un score de 8 a été attribué). Le raisonnement vous aide à comprendre comment et pourquoi les évaluations sont effectuées, et est particulièrement utile pour auditer des métriques subjectives comme le ton, l'empathie ou l'utilité. L'ajout d'un raisonnement peut également [rendre le juge LLM plus précis](https://arxiv.org/abs/2504.00050).

3. Modifiez un schéma JSON qui définit le type de sortie de vos évaluations :

{{< tabs >}}
{{% tab "Booléen" %}}
Pour le type de sortie **Boolean**, modifiez le champ `description` pour expliquer plus en détail ce que signifient true et false dans votre cas d'utilisation.
{{% /tab %}}

{{% tab "Score" %}}
Pour le type de sortie **Score** :
- Définissez un score `min` et `max` pour votre évaluation.
- Modifiez le champ `description` pour expliquer plus en détail l'échelle de votre évaluation.
{{% /tab %}}
{{% tab "Categorical" %}}
Pour le type de sortie **Categorical** :
- Ajoutez ou supprimez des catégories en modifiant le schéma JSON.
- Modifiez les noms des catégories.
- Modifiez le champ `description` des catégories pour expliquer plus en détail ce qu'elles signifient dans le contexte de votre évaluation.


Un exemple de schéma pour une évaluation catégorielle :

```
{
    "name": "categorical_eval",
    "schema": {
        "type": "object",
        "required": [
            "categorical_eval",
            "reasoning"
        ],
        "properties": {
            "categorical_eval": {
                "type": "string",
                "anyOf": [
                    {
                        "const": "budgeting_question",
                        "description": "The user is asking a question about their budget. The answer can be directly determined by looking at their budget and spending."
                    },
                    {
                        "const": "budgeting_request",
                        "description": "The user is asking to change something about their budget. This should involve an action that changes their budget."
                    },
                    {
                        "const": "budgeting_advice",
                        "description": "The user is asking for advice on their budget. This should not require a change to their budget, but it should require an analysis of their budget and spending."
                    },
                    {
                        "const": "general_financial_advice",
                        "description": "The user is asking for general financial advice which is not directly related to their specific budget. However, this can include advice about budgeting in general."
                    },
                    {
                        "const": "unrelated",
                        "description": "This is a catch-all category for things not related to budgeting or financial advice."
                    }
                ]
            },
            "reasoning": {
                "type": "string",
                "description": "Describe how you decided the category"
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```
{{% /tab %}}
{{% tab "JSON" %}}
Pour le type de sortie **JSON**, définissez un schéma JSON libre pour capturer des résultats d'évaluation complexes et structurés.

Un exemple de schéma pour une évaluation JSON :

```
{
    "name": "json_eval",
    "schema": {
        "type": "object",
        "required": [
            "result",
            "reasoning"
        ],
        "properties": {
            "result": {
                "type": "object",
                "description": "The structured evaluation result",
                "properties": {
                    "is_compliant": {
                        "type": "boolean",
                        "description": "Whether the response meets compliance requirements"
                    },
                    "confidence_score": {
                        "type": "number",
                        "description": "Confidence level of the evaluation from 0 to 1"
                    },
                    "issue_count": {
                        "type": "integer",
                        "description": "Number of issues identified in the response"
                    }
                },
                "required": ["is_compliant", "confidence_score", "issue_count"],
                "additionalProperties": false
            },
            "reasoning": {
                "type": "string",
                "description": "Describe the reasoning behind your evaluation"
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```
{{% /tab %}}
{{< /tabs >}}


4. Configurez {{< ui >}}Assessment Criteria{{< /ui >}}.
   Cette flexibilité vous permet d'aligner les résultats de l'évaluation sur les critères de qualité de votre équipe. Le pass/fail mapping alimente également l'automatisation dans Datadog Agent Observability, permettant aux monitors et dashboards de signaler les régressions ou de suivre la santé globale.

{{< tabs >}}
{{% tab "Booléen" %}}
Sélectionnez {{< ui >}}True{{< /ui >}} pour marquer un résultat comme « Pass », ou {{< ui >}}False{{< /ui >}} pour marquer un résultat comme « Fail ».
{{% /tab %}}

{{% tab "Score" %}}
Définissez des seuils numériques pour déterminer les performances de réussite.
{{% /tab %}}
{{% tab "Categorical" %}}
Sélectionnez les catégories qui doivent correspondre à un état « pass ». Par exemple, si vous avez les catégories `Excellent`, `Good` et `Poor`, dont seule `Poor` doit correspondre à un état « fail », sélectionnez `Excellent` et `Good`.
{{% /tab %}}
{{% tab "JSON" %}}
Fournissez une fonction JavaScript pour attribuer une évaluation basée sur la sortie de l'évaluateur LLM-as-a-Judge. La fonction doit renvoyer un objet json au format suivant

```
{
    assessment: "pass", // "pass" | "fail" [REQUIRED],
    value: "evaluation_label" // string [OPTIONAL],
    reasoning: "explanation behind the assessment" // string [OPTIONAL]

}
```
et la signature de la fonction doit être `function __evalPostProcessing(input)` et `input` est le JSON provenant de l'évaluateur. La fonction ci-dessous est un exemple de fonction de post-traitement :

```
function __evalPostProcessing(input) {
    /*
     * Expected input shape (from LLM evaluator [this depends on the JSON Structured Output]):
     * {
     *   criteria: {
     *     quality_score: { score: number (0–1), category: "excellent"|"good"|"poor", reasoning: string },
     *     toxicity:      { score: number (0–1), category: "safe"|"unsafe",           reasoning: string },
     *     completeness:  { score: number (0–1), category: "complete"|"incomplete",   reasoning: string },
     *     relevance:     { score: number (0–1), category: "relevant"|"irrelevant",   reasoning: string },
     *   },
     *   overall_reasoning: string  // (optional) top-level summary from LLM evaluator
     * }
     */

    const SCORE_THRESHOLD = 0.7;

    // Category → pass/fail mappings per criterion
    const CATEGORY_PASS_MAP = {
        quality_score: ["excellent", "good"],
        toxicity:      ["safe"],
        completeness:  ["complete"],
        relevance:     ["relevant"],
    };

    const criteriaResults = {};
    const failures = [];
    const passes = [];

    for (const [criterionName, passCategories] of Object.entries(CATEGORY_PASS_MAP)) {
        const criterion = input?.criteria?.[criterionName];

        if (!criterion) {
            failures.push(`[${criterionName}] Missing from evaluator output.`);
            criteriaResults[criterionName] = false;
            continue;
        }

        const { score, category, reasoning } = criterion;

        const scorePass    = typeof score === "number" && score >= SCORE_THRESHOLD;
        const categoryPass = typeof category === "string" && passCategories.includes(category.toLowerCase());

        // Both score AND category must pass
        const criterionPass = scorePass && categoryPass;
        criteriaResults[criterionName] = criterionPass;

        if (criterionPass) {
            passes.push(`[${criterionName}] PASS — score: ${score.toFixed(2)}, category: "${category}". ${reasoning ?? ""}`);
        } else {
            const reasons = [];
            if (!scorePass)    reasons.push(`score ${score?.toFixed(2) ?? "N/A"} below threshold (≥${SCORE_THRESHOLD})`);
            if (!categoryPass) reasons.push(`category "${category}" not in acceptable set [${passCategories.join(", ")}]`);
            failures.push(`[${criterionName}] FAIL — ${reasons.join("; ")}. ${reasoning ?? ""}`);
        }
    }

    // Determine overall assessment
    const passed = Object.values(criteriaResults).every(Boolean);
    const failCount = failures.length;

    const assessment = passed ? "pass" : "fail";

    const label = passed
        ? "high_quality_response"
        : failCount === 1
            ? "minor_quality_issue"
            : failCount === 2
                ? "moderate_quality_issue"
                : "low_quality_response";

    const reasoningParts = [
        passed
            ? "All criteria passed."
            : `${failCount} criterion/criteria failed.`,
        ...failures,
        ...passes,
        input?.overall_reasoning ? `Evaluator summary: ${input.overall_reasoning}` : ""
    ].filter(Boolean);

    return {
        assessment: assessment,
        value: label,
        reasoning: reasoningParts.join(" | ")
    };
}
```
{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="Post-traitement (OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, AI Gateway, Vertex AI)" level="h4" expanded="true" id="post-processing" %}}
1. Sélectionnez le type de sortie {{< ui >}}JSON{{< /ui >}}.

2. Fournissez une fonction JavaScript pour identifier l'évaluation, la valeur et le raisonnement de l'évaluateur. Le post-traitement vous permet de mener une évaluation plus complexe que la simple utilisation d'une sortie structurée Boolean, Score ou Categorical.

    La fonction de post-traitement doit renvoyer un objet contenant une **assessment** avec la valeur « pass » ou « fail » et, éventuellement, des chaînes de valeur ou de raisonnement. La fonction doit renvoyer un objet json au format suivant :
    ```
    {
        assessment: "pass", // "pass" | "fail" [REQUIRED],
        value: "evaluation_label" // string [OPTIONAL],
        reasoning: "explanation behind the assessment" // string [OPTIONAL]

    }
    ```
    and the function signature must be `function __evalPostProcessing(input)` and the `input` is the json from the evaluator. The function below is an example of a post processing function:
    ```
    function __evalPostProcessing(input) {
        /*
        * Expected input shape (from LLM evaluator [this depends on the JSON Structured Output]):
        * {
        *   criteria: {
        *     quality_score: { score: number (0–1), category: "excellent"|"good"|"poor", reasoning: string },
        *     toxicity:      { score: number (0–1), category: "safe"|"unsafe",           reasoning: string },
        *     completeness:  { score: number (0–1), category: "complete"|"incomplete",   reasoning: string },
        *     relevance:     { score: number (0–1), category: "relevant"|"irrelevant",   reasoning: string },
        *   },
        *   overall_reasoning: string  // (optional) top-level summary from LLM evaluator
        * }
        */

        const SCORE_THRESHOLD = 0.7;

        // Category → pass/fail mappings per criterion
        const CATEGORY_PASS_MAP = {
            quality_score: ["excellent", "good"],
            toxicity:      ["safe"],
            completeness:  ["complete"],
            relevance:     ["relevant"],
        };

        const criteriaResults = {};
        const failures = [];
        const passes = [];

        for (const [criterionName, passCategories] of Object.entries(CATEGORY_PASS_MAP)) {
            const criterion = input?.criteria?.[criterionName];

            if (!criterion) {
                failures.push(`[${criterionName}] Missing from evaluator output.`);
                criteriaResults[criterionName] = false;
                continue;
            }

            const { score, category, reasoning } = criterion;

            const scorePass    = typeof score === "number" && score >= SCORE_THRESHOLD;
            const categoryPass = typeof category === "string" && passCategories.includes(category.toLowerCase());

            // Both score AND category must pass
            const criterionPass = scorePass && categoryPass;
            criteriaResults[criterionName] = criterionPass;

            if (criterionPass) {
                passes.push(`[${criterionName}] PASS — score: ${score.toFixed(2)}, category: "${category}". ${reasoning ?? ""}`);
            } else {
                const reasons = [];
                if (!scorePass)    reasons.push(`score ${score?.toFixed(2) ?? "N/A"} below threshold (≥${SCORE_THRESHOLD})`);
                if (!categoryPass) reasons.push(`category "${category}" not in acceptable set [${passCategories.join(", ")}]`);
                failures.push(`[${criterionName}] FAIL — ${reasons.join("; ")}. ${reasoning ?? ""}`);
            }
        }

        // Determine overall assessment
        const passed = Object.values(criteriaResults).every(Boolean);
        const failCount = failures.length;

        const assessment = passed ? "pass" : "fail";

        const label = passed
            ? "high_quality_response"
            : failCount === 1
                ? "minor_quality_issue"
                : failCount === 2
                    ? "moderate_quality_issue"
                    : "low_quality_response";

        const reasoningParts = [
            passed
                ? "All criteria passed."
                : `${failCount} criterion/criteria failed.`,
            ...failures,
            ...passes,
            input?.overall_reasoning ? `Evaluator summary: ${input.overall_reasoning}` : ""
        ].filter(Boolean);

        return {
            assessment: assessment,
            value: label,
            reasoning: reasoningParts.join(" | ")
        };
    }
    ```
{{% /collapse-content %}}


{{% collapse-content title="Keyword Search Output (Anthropic, Amazon Bedrock, AI Gateway)" level="h4" expanded="true" id="keyword-search-output" %}}
1. Sélectionnez le type de sortie {{< ui >}}Boolean{{< /ui >}}.
   <div class="alert alert-info">Pour Keyword Search Output, seul le type de sortie <strong>Boolean</strong> est disponible.</div>

Fournissez 2. , {{< ui >}}True keywords{{< /ui >}} et {{< ui >}}False keywords{{< /ui >}} qui définissent, respectivement, quand le résultat de l'évaluation est vrai ou faux.

   Datadog recherche dans le texte de réponse de l'évaluateur LLM vos mots-clés définis et fournit les résultats appropriés pour l'évaluation. Pour cette raison, vous devez demander au LLM de répondre avec les mots-clés que vous avez choisis.

   Par exemple, si vous définissez :

   - {{< ui >}}True keywords{{< /ui >}} : Oui, oui
   - {{< ui >}}False keywords{{< /ui >}} : Non, non

   Alors votre invite système devrait inclure quelque chose comme `Respond with "yes" or "no"`.

3. Pour {{< ui >}}Assessment Criteria{{< /ui >}} :
   - Sélectionnez {{< ui >}}True{{< /ui >}} pour marquer un résultat comme « Pass »
   - Sélectionnez {{< ui >}}False{{< /ui >}} pour marquer un résultat comme « Fail »

   Cette flexibilité vous permet d'aligner les résultats de l'évaluation sur les critères de qualité de votre équipe. Le pass/fail mapping alimente également l'automatisation dans Datadog Agent Observability, permettant aux monitors et dashboards de signaler les régressions ou de suivre la santé globale.
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/custom_llm_judge_5-2.png" alt="Configurer la sortie d'évaluation personnalisée sous Structured Output, incluant le raisonnement et les critères d'évaluation." style="width:100%;" >}}

### Définissez le périmètre de l'évaluation : Filtrage et échantillonnage {#define-the-evaluation-scope-filtering-and-sampling}

<div class="alert alert-info">Les champs de span utilisés dans les évaluations sont limités à 250 Ko chacun. Les champs dépassant cette taille sont tronqués avant d'être envoyés à LLM-as-a-Judge.</div>

Sous {{< ui >}}Evaluation Scope{{< /ui >}}, définissez où et comment votre évaluation s'exécute. Cela permet de contrôler la couverture (quels spans ou traces sont inclus) et le coût (combien sont échantillonnés).
   - {{< ui >}}Application{{< /ui >}} : Sélectionnez l'application que vous souhaitez évaluer.
   - {{< ui >}}Evaluate On{{< /ui >}} : Choisissez l'une des options suivantes :
      - {{< ui >}}Trace{{< /ui >}} : Évaluez la trace complète, y compris tous ses spans, comme une unité unique. Utilisez ceci lorsque la réponse dépend du contexte à travers plusieurs spans (achèvement de l'objectif de l'agent, chaînes d'utilisation d'outils, fidélité RAG). Consultez [Trace-Level Evaluations][16] pour des exemples et des détails sur la façon dont l'achèvement de la trace est déterminé.
      - {{< ui >}}Span{{< /ui >}} : Évaluez les spans correspondants individuellement. Utilisez le champ {{< ui >}}Query{{< /ui >}} pour limiter le périmètre à des spans spécifiques (par exemple, uniquement les root spans, uniquement les spans `llm`, ou les spans avec un tag spécifique).
      - {{< ui >}}Session{{< /ui >}} : Évaluez une session utilisateur entière, y compris chaque trace et ses spans, comme une unité unique. Utilisez ceci lorsque la réponse dépend du contexte à travers plusieurs traces dans la même session (satisfaction utilisateur, cohérence multi-tours, ou comportement utilisateur au fil du temps). Nécessite des spans marqués avec un `session_id`. Consultez [Session-Level Evaluations][17] pour des exemples et des détails sur la façon dont la complétion de la session est déterminée.
   - {{< ui >}}Query{{< /ui >}} : (Facultatif) Saisissez une requête en utilisant la syntaxe de requête Datadog pour filtrer les spans ou les traces évalués. Exemple :
      - `@name:agent.workflow` pour filtrer par nom de span
      - `env:prod` pour filtrer par tag
      - `@parent_id:undefined` pour évaluer uniquement les root spans (lorsque {{< ui >}}Evaluate On{{< /ui >}} est défini sur {{< ui >}}Span{{< /ui >}})
      - `@name:agent.workflow AND env:prod` pour filtrer par nom de span et par tag
   - {{< ui >}}Sampling Rate{{< /ui >}} : (Facultatif) Appliquez un échantillonnage (par exemple, 10 %) pour contrôler le coût de l'évaluation.

{{< img src="llm_observability/evaluations/evaluation_scope_1.png" alt="Configurer le périmètre de l'évaluation." style="width:100%;" >}}

### Tester et prévisualiser {#test-and-preview}

Le volet de droite affiche les {{< ui >}}Filtered Spans{{< /ui >}} (ou traces) correspondant au périmètre de l'évaluation configurée.

Sélectionnez un span pour afficher les données JSON disponibles pour une utilisation dans une évaluation. Ensuite, cliquez sur {{< ui >}}Test Evaluation{{< /ui >}} pour pré-remplir les entrées de votre évaluation avec les données du span, et cliquez sur {{< ui >}}Run{{< /ui >}} pour tester.

## Visualisation et utilisation des résultats {#viewing-and-using-results}

Après avoir {{< ui >}}Save and Publish{{< /ui >}} votre évaluation, Datadog exécute automatiquement votre évaluation sur les spans ciblés. Alternativement, vous pouvez {{< ui >}}Save as Draft{{< /ui >}} et modifier ou activer votre évaluation plus tard.

Les résultats sont disponibles dans l'ensemble d'Agent Observability en temps quasi réel pour les évaluations publiées. Vous pouvez trouver vos résultats personnalisés de LLM-as-a-judge pour un span spécifique dans l'onglet {{< ui >}}Evaluations{{< /ui >}}, aux côtés d'autres évaluations.

{{< img src="llm_observability/evaluations/custom_llm_judge_3-2.png" alt="L'onglet Évaluations d'une trace, affichant les résultats d'évaluation personnalisés aux côtés des évaluations gérées." style="width:100%;" >}}

Chaque résultat d'évaluation comprend :

- La valeur évaluée (par exemple `True`, `9` ou `Neutral`)
- Le raisonnement (lorsqu'il est activé)
- L'indicateur pass/fail (basé sur vos critères d'évaluation)

Utilisez la syntaxe `@evaluation.<evaluation_name>.value` pour interroger ou visualiser les résultats.

Exemple :

```
@evaluation.helpfulness-check.value
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="La vue Agent Observability Traces. Dans la zone de recherche, l'utilisateur a saisi `@evaluation.budget-guru-intent-classifier.value:budgeting_question` et les résultats sont renseignés ci-dessous." style="width:100%;" >}}


Vous pouvez effectuer les opérations suivantes :
- Filtrer les traces par résultats d'évaluation (exemple, `@evaluation.helpfulness-check.value`)
- Filtrer par statut d'évaluation pass/fail (exemple, `@evaluation.helpfulness-check.assessment:fail`)
- Utilisez les résultats d'évaluation comme [facets][3]
- Afficher les résultats agrégés dans la section Evaluation de la page Agent Observability Overview
- Créez [monitors][4] pour alerter sur les changements de performance ou sur les régressions

## Utilisation dans des expériences {#using-in-experiments}

Pour réutiliser une évaluation personnalisée LLM-as-a-judge dans un [LLM Experiment][8] local, référencez-la par son nom en utilisant `RemoteEvaluator` depuis le SDK :

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, RemoteEvaluator

evaluator = RemoteEvaluator(eval_name="quality-assessment")

experiment = LLMObs.experiment(
    name="my-experiment",
    task=my_task,
    dataset=dataset,
    evaluators=[evaluator],
)
experiment.run()
{{< /code-block >}}

Vous pouvez combiner `RemoteEvaluator` avec d'autres évaluateurs locaux dans la même expérience. Pour le mappage d'entrée personnalisé, la gestion des erreurs et plus d'options, consultez [RemoteEvaluator][9] dans le Guide du développeur d'évaluation.

## Meilleures pratiques pour des évaluations personnalisées fiables {#best-practices-for-reliable-custom-evaluations}

- **Commencez petit** : Ciblez un mode de défaillance unique et bien défini avant de passer à l'échelle.
- **Activez le raisonnement** lorsque vous avez besoin de décisions explicables et pour améliorer la précision sur des tâches de raisonnement complexes.
- **Itérez** : exécutez, inspectez les sorties et affinez votre prompt.
- **Validez** : vérifiez périodiquement la précision de l'évaluateur en utilisant des traces échantillonnées.
- **Documentez votre grille d'évaluation** : définissez clairement ce que signifient « pass » et « fail » pour éviter toute dérive au fil du temps.
- **Réalignez votre évaluateur** : réévaluez le prompt et les exemples few-shot lorsque le LLM sous-jacent est mis à jour.

## Utilisation estimée des jetons {#estimated-token-usage}

Vous pouvez surveiller l'utilisation des jetons de vos évaluations LLM à l'aide du [LLM Evaluations Token Usage dashboard][10].

Si vous avez besoin de plus de détails, les métriques suivantes vous permettent de suivre les ressources LLM consommées pour alimenter les évaluations :

- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

Chacune de ces métriques possède des tags `ml_app`, `model_server`, `model_provider`, `model_name` et `evaluation_name`, vous permettant d'identifier précisément les applications, les modèles et les évaluations qui contribuent à votre utilisation.

## Configurez les évaluations LLM-as-a-judge depuis l'API {#configure-llm-as-a-judge-evaluations-from-the-api}

Vous pouvez utiliser des opérations CRUD de base pour manipuler les configurations d'évaluation gérées, une fois que vous avez la `DD_API_KEY` [clé d'API][14] spécifiée dans votre environnement.

 - [GET][11] les configurations d'évaluation existantes
 - [PUT][12] les configurations d'évaluation existantes
 - [DELETE][13] les configurations d'évaluation existantes

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account
[3]: /fr/events/explorer/facets/
[4]: /fr/monitors/
[5]: https://arxiv.org/abs/2504.00050
[6]: /fr/llm_observability/evaluations/evaluation_compatibility
[7]: /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations/
[8]: /fr/llm_observability/experiments
[9]: /fr/llm_observability/guide/evaluation_developer_guide/#using-managed-evaluators
[10]: https://app.datadoghq.com/dash/integration/llm_evaluations_token_usage
[11]: /fr/api/latest/agent-observability/#get-a-custom-evaluator-configuration
[12]: /fr/api/latest/agent-observability/#create-or-update-a-custom-evaluator-configuration
[13]: /fr/api/latest/agent-observability/#delete-a-custom-evaluator-configuration
[14]: /fr/account_management/api-app-keys
[15]: /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating
[16]: /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations
[17]: /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations
[18]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations