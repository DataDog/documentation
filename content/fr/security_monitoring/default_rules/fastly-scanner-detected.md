---
aliases:
  - /fr/216-b0c-f83
disable_edit: true
kind: documentation
rule_category:
  - Log Detection
scope: fastly
security: attack
source: fastly
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: Requêtes HTTP Fastly depuis un scanner de vulnérabilités
type: security_rules
---
## Présentation

### Objectif
Détectez quand quelqu'un utilise un scanner de vulnérabilités sur une application web. Cette règle permet d'identifier les adresses IP des personnes malveillantes qui n'essayent pas de masquer leur tentative d'attaque de votre système. Les hackers plus expérimentés utiliseront un faux user-agent.

### Stratégie
Le user-agent dans les en-têtes HTTP est inspecté pour déterminer si une adresse IP effectue un scan de votre application et générer un signal `INFO`.

### Triage et réponse
1. Déterminez si cette adresse IP effectue des requêtes authentifiées vers l'application.
2. Si l'adresse IP effectue des requêtes authentifiées vers l'application :
 * Analysez les logs HTTP et déterminez si l'utilisateur attaque votre application.

Les en-têtes HTTP de la requête proviennent du [gist][2] de [darkqusar][1].

[1]: https://gist.github.com/darkquasar
[2]: https://gist.github.com/darkquasar/84fb2cec6cc1668795bd97c02302d380