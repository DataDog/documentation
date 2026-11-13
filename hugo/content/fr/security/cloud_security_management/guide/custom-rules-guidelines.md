---
further_reading:
- link: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
  tag: Documentation
  text: Gestion des règles Workload Protection
- link: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
  tag: Documentation
  text: Guide SecL
title: Directives pour la rédaction de règles Workload Protection personnalisées
---
À un moment donné, vous souhaiterez peut-être rédiger vos propres [règles personnalisées Workload Protection de Datadog Agent][1]. Lors de la rédaction de vos propres règles, il existe quelques stratégies que vous pouvez utiliser pour optimiser l'efficacité.

## Attributs {#attributes}

Pour garantir que votre stratégie est évaluée dans le noyau afin dʼêtre la plus efficace possible, utilisez toujours l'un des attributs suivants pour les règles relatives à l'activité du processus ou des fichiers :

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**Remarque** : Les valeurs possibles pour `[event_type]` incluent `open` ou `exec`.

## Wildcards {#wildcards}

Utilisez les caractères génériques (`*`) avec précaution. Par exemple, n'utilisez jamais `open.file.path =~ "*/myfile"`. Si vous devez utiliser des caractères génériques en préfixe de répertoires, au moins deux niveaux sont requis : `open.file.path =~ "*/mydir/myfile")`. 

**Remarque** : Vous devez ajouter un tilde (`~`) à l'[opérateur][2] lors de l'utilisation de caractères génériques.

## Approbateurs et suppresseurs {#approvers-and-discarders}

Workload Protection utilise le concept d'approbateurs et de suppresseurs pour filtrer les événements qui ne devraient déclencher aucune règle dans une politique. Les approbateurs et les suppresseurs autorisent ou refusent les événements uniquement au niveau de la politique. Ils n'agissent pas sur les règles individuelles.

Les approbateurs agissent comme une liste d'autorisation au niveau du noyau dans le Datadog Agent. Par exemple, l'ouverture d'un fichier spécifique pourrait être un approbateur pour l'événement `open`, tandis que les événements `open` sur des fichiers sans approbateurs seraient filtrés. De même, les suppresseurs agissent comme une liste de refus dans Datadog Agent. Les suppresseurs filtrent intentionnellement les événements qui ne peuvent jamais correspondre à une règle. Datadog Agent apprend quels événements filtrer avec les suppresseurs pendant l'exécution.

Les approbateurs et les suppresseurs sont générés en fonction de l'ensemble de votre politique. Par conséquent, si une seule règle n'utilise pas d'approbateurs pour un événement donné (par exemple, `open` ou `exec`), les approbateurs ne peuvent pas être utilisés pour cet événement pour l'ensemble de la politique, ce qui rend chaque règle utilisant cet événement moins efficace.

Par exemple, si vous utilisiez des noms de fichiers explicites pour évaluer les événements `open` pour chaque règle sauf une (`open.file.path == "/etc/shadow"`, `open.file.path == "/etc/secret"` et ainsi de suite), et utilisiez un caractère générique dans cet événement (`open.file.path == "/etc/*"`), l'événement `open` ne générerait pas d'approbateur, mais pourrait générer des suppresseurs pendant l'exécution.

Les approbateurs sont généralement plus puissants et préférés. En utilisant des approbateurs, Datadog Agent peut traiter uniquement ce qu'il doit voir, plutôt que d'apprendre dynamiquement ce qu'il doit filtrer.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/workload_protection/detect_and_monitor/agent_rules/policy_management/#create-a-custom-agent-rule
[2]: /fr/security/workload_protection/detect_and_monitor/agent_rules/secl_guide/#operators