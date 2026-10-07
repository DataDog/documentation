---
description: Configurez CoTerm avec des lints et des règles basés sur Lua pour valider
  les commandes, exiger des approbations et contrôler les actions pour des commandes
  de terminal spécifiques.
further_reading:
- link: /coterm
  tag: documentation
  text: Datadog CoTerm
- link: /coterm/install
  tag: documentation
  text: Installer Datadog CoTerm
- link: /coterm/usage
  tag: documentation
  text: Utiliser CoTerm
title: Règles de configuration CoTerm
---

Vous pouvez configurer CoTerm pour qu'il prenne des actions spécifiques lorsqu'il intercepte certaines commandes en ajoutant des lints et des règles à votre fichier `.ddcoterm/config.yaml` sous `process_config`.

Ces lints et règles sont écrits en [Lua][1]. Pour la syntaxe et plus de détails, consultez la section [Documentation de Lua][2].

## Lints

{{< highlight yaml "hl_lines=5-8" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("No kubectl context specified (effective context: '%s'). It is recommended to always explicitly specify the context when running `kubectl scale`.", k8s_context)
          end
{{< /highlight >}}

Chaque élément sous `lints` est un snippet Lua qui peut renvoyer une chaîne de caractères. Les lints sont évalués dans l'ordre. Si un lint renvoie une chaîne de caractères, cette chaîne est affichée à l'utilisateur sous forme d'invite d'avertissement :

{{< img src="coterm/linter-warning.png" alt="Interface de ligne de commande. L'utilisateur a exécuté 'kubectl scale foo'. La sortie indique 'Warning from CoTerm: No kubectl context specified (effective context: 'minikube'). It is recommended to always explicitly specify the context when running kubectl scale. Do you want to continue? (y/n)'" style="width:70%;" >}}

L'utilisateur a alors la possibilité de continuer ou d'annuler.

## Règles

{{< highlight yaml "hl_lines=5-18" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # Enregistrer et exiger une approbation pour toutes les exécutions de `kubectl scale` dans un contexte de production
        - rule: |
            local k8s_context = flags.context or k8s_current_context or "unknown"
            local matches = has_arg("scale") and k8s_context:match("prod")
            local user_message = "Proceed with caution. This command may disrupt your Kubernetes cluster setup."
            local approver_message = "Ensure that the user has documented a rollback plan before approving."
            return matches, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
        # Enregistrer toutes les autres exécutions de kubectl scale, mais ne pas exiger d'approbation et ne pas utiliser de messages pour les utilisateurs+approbateurs
        - rule: has_arg("scale")
          actions: ["record", "logs", "process_info"]
        # Pour toutes les autres commandes kubectl, exécuter simplement la commande avec une surcharge quasi nulle ; pas d'enregistrement, pas d'exigence d'approbation
        - rule: true
          actions: []
{{< / highlight >}}

Les règles sont plus puissantes que les lints. Pour chaque élément sous `rules`, définissez `rule`, un snippet Lua qui renvoie 1 à 3 valeurs ; et `actions`, une liste d'actions que CoTerm doit prendre.

### Valeurs de retour des règles

Chaque `rule` renvoie 1 à 3 valeurs : `boolean, [string], [string]`.

1. (requis) Un booléen, indiquant si la règle correspond.
2. (facultatif) Une chaîne de caractères, contenant un message pour l'utilisateur. Cette chaîne fournit un contexte à l'utilisateur. Elle n'est affichée que si la première valeur de retour est `true`.
3. (facultatif) Une chaîne de caractères, contenant un message pour l'approbateur. Si la première valeur de retour est `true` et que le champ `actions` correspondant contient `approval`, cette chaîne est affichée dans la demande d'approbation dans Datadog.

### Actions

CoTerm peut prendre les actions suivantes lorsque `rule` renvoie `true` :

- `record` : enregistrer la session de terminal et l'envoyer à Datadog.
- `logs` : générer des logs Datadog, contenant des snapshots consultables de la sortie du terminal.
- `process_info` : enregistrer tous les processus lancés dans la session de terminal et générer un événement pour chaque processus.
- `approval` : exiger une approbation avant d'exécuter la commande.
- `incidents` : associer l'enregistrement à l'[incident Datadog][6] auquel l'utilisateur répond, le cas échéant. Si l'utilisateur répond à plusieurs incidents, il est invité à en choisir un.

Pour ne prendre aucune action (autre que l'exécution de la commande) lorsque `rule` renvoie `true`, définissez `actions: []`.

### Évaluation des règles

Les règles sont évaluées dans l'ordre. CoTerm exécute les actions spécifiées pour la première règle qui s'évalue à `true`, et n'évalue aucune autre règle.

## Hiérarchie des actions

Vous pouvez spécifier des actions que CoTerm doit prendre de plusieurs manières différentes. CoTerm décide quelles actions prendre selon la hiérarchie suivante :

1. **Flags CLI** : si vous spécifiez des actions dans les flags CLI (tels que `--save-level`, `--approval`), CoTerm ne prend que les actions spécifiées via ces flags CLI. Cela remplace toutes les autres configurations.
2. **Fichier de configuration Lua** : si aucun flag CLI ne spécifie d'actions, mais qu'une règle Lua dans `.ddcoterm/config.yaml` s'évalue à `true`, CoTerm prend les actions spécifiées avec la première règle qui s'évalue à `true`. Remplace toutes les configurations autres que les flags CLI.
3. **`process_config.default_actions`** : si aucun flag CLI ne spécifie d'actions et qu'aucune règle Lua ne correspond, CoTerm prend les actions spécifiées dans `process_config.default_actions` dans `.ddcoterm/config.yaml`, le cas échéant.
4. **Actions par défaut** : si aucun flag CLI ne spécifie d'actions, qu'aucune règle Lua ne correspond et que `process_config.default_actions` n'est pas défini, CoTerm prend les actions suivantes : `["record", "logs", "process_info"]`.

## Environnement Lua et fonctions d'aide

Tous les snippets Lua sont exécutés dans un environnement d'exécution [Luau][3] en bac à sable. CoTerm injecte les variables et fonctions suivantes dans l'environnement d'exécution :

### Variables globales

`executable` - string
: L'exécutable dans votre commande. <br/>Pour `kubectl foo bar`, `executable` est `kubectl`.

`args` - array&lt;string&gt;
: Les arguments dans votre commande. <br/>Pour `kubectl foo --bar=baz`, `args` est `["foo", "--bar=baz"]`.

`flags` - table
: Une [table][4] de tous les flags clé-valeur `--` dans votre commande. <br/>Pour `command foo --bar baz` ou `command foo --bar=baz`, `flags` a une entrée où `key` est `bar` et `value` est `baz`. Autrement dit, `flags.bar = baz`.

`k8s_current_context` - string
: La valeur `current-context` de `~./kube/config`. Si cette valeur n'est pas trouvée, `k8s_current_context` est [nil][5].

### Fonctions d'assistance

`has_arg(<string>)`
: Renvoie `true` si l'argument est présent. <br/>Pour `kubectl foo bar`, `has_arg("bar")` renvoie `true`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Lua_(programming_language)
[2]: https://lua.org/docs.html
[3]: https://luau.org/
[4]: https://www.lua.org/pil/2.5.html
[5]: https://www.lua.org/pil/2.1.html
[6]: /fr/incident_response/incident_management/