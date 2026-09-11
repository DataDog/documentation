---
further_reading:
- link: /security/threats/workload_security_rules
  tag: Documentation
  text: Gérer des règles de CSM Threats
- link: /security/threats/agent_expressions
  tag: Documentation
  text: Syntaxe des expressions de lʼAgent
title: Instructions pour la rédaction de règles personnalisées pour CSM Threats
---

À un moment donné, vous voudrez certainement rédiger vos propres [règles personnalisées de lʼAgent pour Cloud Security Management Threats (CSM Threats)][1]. Certaines stratégies vous permettront dʼoptimiser l'efficacité des règles que vous créerez.

## Attributs

Pour garantir que votre stratégie est évaluée dans le noyau afin dʼêtre la plus efficace possible, utilisez toujours l'un des attributs suivants pour les règles relatives à l'activité du processus ou des fichiers :

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**Remarque** : les valeurs possibles pour `[event_type]` sont `open` ou `exec`.

## Wildcards

Utilisez les wildcards (`*`) avec précaution. Par exemple, n'utilisez jamais `open.file.path =~ "*/myfile"`. Si vous devez utiliser des wildcards pour préfixer des répertoires, deux niveaux au moins sont nécessaires : `open.file.path =~ "*/mydir/myfile")`. 

**Remarque** : vous devez ajouter un tilde (`~`) à lʼ[opérateur][2] lorsque vous utilisez des wildcards.

## Approbateurs et rejeteurs

CSM Threats utilise le concept dʼ« approvers » et de « discarders » (approbateurs et rejeteurs) pour filtrer les événements qui ne sont pas censés déclencher de règles dans une stratégie. Les approvers et les discarders autorisent ou refusent des événements au niveau de la stratégie uniquement. Ils n'agissent pas sur les règles individuelles.

Les approbateurs font office de liste dʼautorisations au niveau du noyau dans lʼAgent Datadog. Par exemple, l'ouverture d'un fichier spécifique pourrait être un approbateur sur lʼévénement `open`, tandis que les événements `open` sur des fichiers sans approbateurs seraient filtrés. De même, les rejets agissent comme une liste de restrictions dans lʼAgent. Les rejeteurs filtrent intentionnellement les événements qui ne peuvent jamais correspondre à une règle. LʼAgent apprend quels événements filtrer avec les rejeteurs pendant l'exécution.

Les approbateurs et les rejeteurs sont générés sur la base de l'ensemble de votre stratégie. De ce fait, si une règle unique n'utilise pas les approbateurs pour un événement donné (par exemple, `open` ou `exec`), les approbateurs ne peuvent pas être utilisés pour cet événement pour l'ensemble de la stratégie, ce qui rend toutes les règles qui utilisent cet événement moins efficaces.

Par exemple, si vous utilisez des noms de fichiers explicites pour évaluer les événements `open` pour chaque règle sauf une (`open.file.path == "/etc/shadow"`, `open.file.path == "/etc/secret"` et ainsi de suite), et si vous utilisez un wildcard dans cet événement (`open.file.path == "/etc/*"`), lʼévénement `open` ne générera pas d'approbateur, mais pourra générer des rejeteurs pendant l'exécution.

Les approbateurs sont généralement plus puissants et privilégiés. En utilisant les approbateurs, lʼAgent peut traiter uniquement ce qu'il a besoin de voir au lieu d'apprendre ce qu'il faut filtrer de façon dynamique.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/threats/workload_security_rules
[2]: /fr/security/threats/agent_expressions/#operators