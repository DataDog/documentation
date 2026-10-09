---
aliases:
- /fr/llm_observability/evaluations/sensitive_data_scanner
- /fr/llm_observability/configure/evaluations/sensitive_data_scanner
- /fr/llm_observability/evaluations/managed_evaluations/security_and_safety_evaluations/
- /fr/llm_observability/configure/evaluations/managed_evaluations/security_and_safety_evaluations/
description: Apprenez à configurer des évaluations gérées pour vos applications LLM.
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: Documentation
  text: En savoir plus sur les termes et concepts d'Agent Observability.
- link: /llm_observability/setup
  tag: Documentation
  text: Apprenez à configurer Agent Observability.
title: Sensitive Data Scanner
---
Ce check garantit que les informations sensibles sont traitées de manière appropriée et sécurisée, réduisant ainsi le risque de violation de données ou d'accès non autorisé.

{{< img src="llm_observability/evaluations/sensitive_data_scanning_4.png" alt="Une évaluation de la sécurité et de la sûreté détectée par le Sensitive Data Scanner dans Agent Observability" style="width:100%;" >}}

| Phase d'évaluation | Méthode d'évaluation | Définition de l'évaluation |
|---|---|---|
| Évalué sur l'entrée et la sortie | Sensitive Data Scanner | Propulsé par le [Sensitive Data Scanner][1], Agent Observability analyse, identifie et masque les informations sensibles au sein des paires invite-réponse de chaque application LLM. Cela inclut les informations personnelles, les données financières, les dossiers de santé ou toute autre donnée nécessitant une protection en raison de préoccupations liées à la confidentialité ou à la sécurité. |

[1]: /fr/security/sensitive_data_scanner/