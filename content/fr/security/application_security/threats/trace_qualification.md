---
aliases: null
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Se protéger des menaces avec la solution Application Security Management de
    Datadog
- link: /security/application_security/how-appsec-works//
  tag: Documentation
  text: Fonctionnement d'Application Security Management
title: Qualification des traces
---

## Présentation

La solution Application Security Management (ASM) vous apporte de la visibilité sur les attaques ciblant vos applications et évalue les conditions dans lesquelles chaque trace a été générée. La qualification des traces d'ASM permet de déterminer si chaque attaque est dangereuse ou inoffensive, afin de vous aider à réagir aux attaques ayant le plus de répercussions.

Depuis le [Traces Explorer][1] d'ASM, appliquez un filtre basé sur la facette **Qualification** pour afficher les différents résultats de qualification possibles :

{{< img src="security/application_security/threats/trace_qualification/trace-qualification-traces_2.png" alt="Liste de traces d'ASM avec la facette Qualification affichant les différents résultats de qualification possibles">}}

## Résultats de qualification

ASM exécute des règles de qualification (à source fermée) sur chaque trace. Les quatre résultats de qualification possibles sont indiqués dans le menu de la facette :

| Résultat de qualification | Description |
|------|-------------|
| Unknown | ASM dispose de règles de qualification pour cette attaque, mais en raison d'un manque d'informations, la qualification n'a pas pu être déterminée. |
| None successful | ASM a déterminé que les attaques dans cette trace n'étaient pas dangereuses. |
| Harmful | Au moins une attaque dans cette trace a abouti. |
| No value | ASM ne dispose pas de règle de qualification pour ce type d'attaque. |

### Volet latéral des traces

Le résultat de qualification s'affiche également lorsque vous consultez les détails d'une trace spécifique. </br>
Exemple d'une trace qualifiée par ASM comme inoffensive :

{{< img src="security/application_security/threats/trace_qualification/trace-none-successful_3.png" alt="Trace qualifiée par ASM comme inoffensive">}}

Exemple d'une trace qualifiée par ASM comme dangereuse :

{{< img src="security/application_security/threats/trace_qualification/trace-harmful_2.png" alt="Trace qualifiée par ASM comme dangereuse">}}

[1]: https://app.datadoghq.com/security/appsec/traces
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}