---
aliases:
- /fr/llm_observability/evaluations/quality_evaluations
- /fr/llm_observability/configure/evaluations/quality_evaluations
- /fr/llm_observability/evaluations/managed_evaluations/quality_evaluations
- /fr/llm_observability/configure/evaluations/managed_evaluations/quality_evaluations
- /fr/llm_observability/evaluations/managed_evaluations/language_mismatch/
description: Découvrez l'évaluation de la discordance linguistique de Datadog.
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: Documentation
  text: En savoir plus sur les termes et concepts d'Agent Observability.
- link: /llm_observability/setup
  tag: Documentation
  text: Apprenez à configurer Agent Observability.
title: Discordance linguistique
---
Ce check identifie les cas où le LLM génère des réponses dans une langue ou un dialecte différent de celui utilisé par l'utilisateur, ce qui peut entraîner une confusion ou une mauvaise communication. Ce check garantit que les réponses du LLM sont claires, pertinentes et adaptées aux préférences et aux besoins linguistiques de l'utilisateur.

La discordance linguistique n'est prise en charge que pour les invites en langage naturel. Les paires d'entrée et de sortie qui consistent principalement en des données structurées telles que du JSON, des extraits de code ou des caractères spéciaux ne sont pas signalées comme une discordance linguistique.

{{% collapse-content title="Langues prises en charge" level="h5" %}}
Afrikaans, Albanais, Arabe, Arménien, Azerbaïdjanais, Biélorusse, Bengali, Bokmål norvégien, Bosniaque, Bulgare, Chinois, Croate, Tchèque, Danois, Néerlandais, Anglais, Estonien, Finnois, Français, Géorgien, Allemand, Grec, Gujarati, Hébreu, Hindi, Hongrois, Islandais, Indonésien, Irlandais, Italien, Japonais, Kazakh, Coréen, Letton, Lituanien, Macédonien, Malais, Marathi, Mongol, Nynorsk norvégien, Persan, Polonais, Portugais, Pendjabi, Roumain, Russe, Serbe, Slovaque, Slovène, Espagnol, Swahili, Suédois, Tamoul, Télougou, Thaï, Turc, Ukrainien, Ourdou, Vietnamien, Yoruba, Zoulou
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/language_mismatch_4.png" alt="Une évaluation de la discordance linguistique détectée par un modèle open source dans Agent Observability" style="width:100%;" >}}

| Phase d'évaluation | Méthode d'évaluation | Définition de l'évaluation |
|---|---|---|
| Évalué sur l'entrée et la sortie | Évalué à l'aide d'un modèle open source | La discordance linguistique signale si chaque paire invite-réponse démontre que l'application LLM a répondu à la question de l'utilisateur dans la même langue que celle utilisée par l'utilisateur. |