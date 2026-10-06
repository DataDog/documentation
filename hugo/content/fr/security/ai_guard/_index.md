---
further_reading:
- link: /security/ai_guard/onboarding/
  tag: Documentation
  text: Commencez avec AI Guard
- link: /security/ai_guard/signals/
  tag: Documentation
  text: Signaux de sécurité AI Guard
- link: https://www.datadoghq.com/blog/ai-guard/
  tag: Blog
  text: Protégez les applications d'IA agentique avec Datadog AI Guard
- link: https://www.datadoghq.com/blog/llm-guardrails-best-practices/
  tag: Blog
  text: 'Garde-fous LLM : meilleures pratiques pour déployer des applications LLM
    en toute sécurité'
- link: https://www.datadoghq.com/blog/securing-ai-agents-guardrail-placement/
  tag: Blog
  text: 'Sécurisation des agents IA : pourquoi le placement des garde-fous est une
    décision de conception clé'
title: AI Guard
---
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">AI Guard n'est pas disponible dans le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< callout url="" btn_hidden="true" header="Obtenez l'accès à AI Guard !">}}
Utilisez l'un de ces formulaires pour demander l'accès aux fonctionnalités d'AI Guard :
- <a href="https://www.datadoghq.com/product-preview/ai-security/">Protection de l'exécution des agents personnalisés</a> (accès limité) : sécurisez vos agents IA personnalisés contre les attaques à l'exécution.
- <a href="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/">Protection de l'exécution des agents de codage</a> (aperçu) : sécurisez vos agents de codage dans les workflows des développeurs, afin de pouvoir déployer du code généré par IA en toute sécurité.
{{< /callout >}}

Datadog AI Guard est un produit de défense en profondeur conçu pour **inspecter**, **bloquer** et **gouverner** le comportement de l'IA en temps réel. AI Guard est conçu pour s'intégrer directement aux workflows de traçage et d'observabilité existants de Datadog afin de sécuriser les systèmes d'IA agentique en production. Il se place **en ligne avec votre application/agent IA** et s'ajoute aux modèles de prompt, aux garde-fous et aux contrôles de politique existants, pour **sécuriser vos workflows LLM sur le chemin critique**.

AI Guard protège contre l'injection de prompt, le jailbreaking et les attaques d'exfiltration de données sensibles grâce à la protection des prompts, la protection des outils et la protection des données sensibles. Ensemble, ces capacités protègent contre le [trio létal agentique][3] :
- Accès système privilégié
- Exposition à des données non fiables
- Communication sortante

AI Guard détecte également les données sensibles telles que les informations personnellement identifiables (PII) et les secrets dans les entrées et sorties des LLM. Ces protections fonctionnent pour tout modèle d'IA cible, y compris OpenAI, Anthropic, Bedrock, VertexAI et Azure. Pour voir vos agents et services d'IA cartographiés, y compris la manière dont ils interagissent entre eux et ceux qu'AI Guard protège, accédez à la page [{{< ui >}}Discover{{< /ui >}}][5].

Pour évaluer rapidement une conversation sans code ni configuration, utilisez [{{< ui >}}AI Guard Playground{{< /ui >}}][4] pour soumettre les entrées utilisateur, les sorties de l'assistant et les appels d'outils, et voir le résultat de l'évaluation en temps réel.

Pour plus d'informations sur la configuration d'AI Guard, consultez [Get Started with AI Guard][1].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/ai_guard/onboarding/
[2]: https://genai.owasp.org/llm-top-10/
[3]: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
[4]: /fr/security/ai_guard/onboarding/#playground
[5]: https://app.datadoghq.com/security/ai-guard/discover