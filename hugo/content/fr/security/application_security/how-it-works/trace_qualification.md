---
aliases:
- /fr/security/application_security/threats/trace_qualification
title: Qualification des traces
---
## Présentation {#overview}

App and API Protection (AAP) offre une observabilité des attaques au niveau des applications et évalue les conditions dans lesquelles chaque trace a été générée. La qualification des traces AAP attribue ensuite un label à chaque attaque — malveillante ou sûre — afin de vous aider à agir sur celles ayant le plus d'impact.

Filtrez par la facette **Qualification** dans le [Trace Explorer][1] AAP pour afficher les résultats de qualification possibles :


## Résultats de qualification {#qualification-outcomes}

AAP exécute des règles de qualification (à source fermée) sur chaque trace. Il existe quatre résultats de qualification possibles, tels qu'indiqués dans le menu des facettes :

| Résultat de la qualification | Description |
|------|-------------|
| Inconnu | AAP dispose de règles de qualification pour cette attaque, mais n'a pas eu suffisamment d'informations pour prendre une décision de qualification. |
| Aucune attaque réussie | AAP a déterminé qu'aucune attaque dans cette trace n'a réussi. |
| Malveillante | Au moins une attaque dans la trace a réussi. |
| Aucune valeur | AAP ne dispose pas de règles de qualification pour ce type d'attaque. |

### Volet latéral de la trace {#trace-sidepanel}

Le résultat de la qualification peut également être consulté lors de l'affichage des détails d'une trace individuelle.


[1]: https://app.datadoghq.com/security/appsec/traces