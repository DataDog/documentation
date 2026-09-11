---
description: Apprenez à enregistrer des sessions de terminal, à créer des shims pour
  l'enregistrement automatique et à configurer CoTerm pour vous protéger contre les
  commandes dangereuses.
further_reading:
- link: /coterm
  tag: Documentation
  text: Datadog CoTerm
- link: /coterm/install
  tag: Documentation
  text: Installer Datadog CoTerm
- link: /coterm/rules
  tag: Documentation
  text: Règles de configuration de CoTerm
title: Utilisation de Datadog CoTerm
---
## Afficher les sessions de terminal enregistrées {#view-recorded-terminal-sessions}
Au début et à la fin de chaque session de terminal enregistrée, CoTerm affiche un lien pour afficher la session dans Datadog. Vous pouvez également [afficher toutes les sessions de terminal enregistrées][7].

## Structure de commande de l'interface de ligne de commande CoTerm {#coterm-cli-command-structure}

```shell
ddcoterm [OPTIONS] [-- <COMMAND>...] [COMMAND]
```

Exécutez `ddcoterm --help` pour afficher toutes les options et commandes.

## Enregistrer une session de terminal {#record-a-terminal-session}

CoTerm enregistre les sessions de terminal que vous pouvez lire et examiner dans Datadog. Pour votre sécurité, les données sensibles (telles que les mots de passe et les clés d'API) sont [automatiquement masquées][1]. Tous les processus lancés dans la session de terminal sont enregistrés en tant qu'[événements][2].

### Lancer et enregistrer une session de terminal interactive {#launch-and-record-an-interactive-terminal-session}
Pour lancer manuellement Datadog CoTerm et enregistrer l'intégralité de votre session de terminal :

```shell
ddcoterm
```

Lorsque vous terminez la session, CoTerm arrête l'enregistrement et envoie les données de processus capturées à Datadog.

### Enregistrer la sortie d'une commande {#record-the-output-of-a-command}
Pour exécuter une commande individuelle et enregistrer sa sortie :

```shell
ddcoterm -- datadog-agent status
```

Ceci lance CoTerm et exécute `datadog-agent status`. Une fois le processus terminé, CoTerm arrête l'enregistrement et envoie les données de processus capturées à Datadog.

## Enregistrer automatiquement une commande {#automatically-record-a-command}

Pour configurer CoTerm afin d'enregistrer automatiquement toutes les futures invocations d'une commande particulière, créez un shim :

```shell
ddcoterm shim create datadog-agent
```

Après avoir créé un shim, redémarrez votre terminal ou sourcez votre profil. (Par exemple, exécutez `source ~/.bashrc`.) Si vous utilisez un shell autre que Bash ou Zsh, ajoutez `path/to/.ddcoterm/overrides` à votre PATH manuellement.

## Protéger contre les commandes de terminal dangereuses {#protect-against-dangerous-terminal-commands}

Pour empêcher l'exécution accidentelle de commandes de terminal désignées, vous pouvez configurer CoTerm pour agir comme un linter. Pour plus de contrôle, vous pouvez utiliser CoTerm avec [Datadog Work Management][3] pour exiger une approbation pour les commandes désignées.

### Analyser une commande {#lint-a-command}

Lorsque vous essayez d'exécuter une commande désignée (par exemple, `kubectl scale`), CoTerm peut afficher des avertissements et vous demander une confirmation.

1. Créer un shim pour votre commande : `ddcoterm shim create kubectl`

1. Configurer une règle de linting dans votre fichier `.ddcoterm/config.yaml`. Pour plus de détails sur la configuration du linting dans CoTerm, consultez [Règles de configuration de CoTerm][4].

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("No kubectl context specified (effective context: '%s'). It is recommended to always explicitly specify the context when running `kubectl scale`.", k8s_context)
          end
   {{< /code-block >}}

Avec cette configuration, CoTerm intercepte toute commande `kubectl scale` sans le flag `--context`.

{{< img src="coterm/linter-warning.png" alt="Interface de ligne de commande. L'utilisateur a exécuté 'kubectl scale foo'. La sortie indique « Avertissement de CoTerm : Aucun contexte kubectl spécifié (contexte effectif : 'minikube') ». Il est recommandé de toujours spécifier explicitement le contexte lors de l'exécution de kubectl scale. Souhaitez-vous continuer ? (o/n)" style="width:70%;" >}}

### Exiger une approbation pour les commandes {#require-approval-for-commands}

Pour les commandes encore plus dangereuses, CoTerm peut exiger une approbation explicite par un autre membre de l'équipe (via Work Management) avant d'exécuter la commande.

1. Créer un shim pour votre commande : `ddcoterm shim create kubectl`

2. Configurer l'exigence d'approbation dans votre fichier `.ddcoterm/config.yaml`. Pour plus de détails, consultez les [Règles de configuration de CoTerm][4].

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # Record and require approval for all executions of `kubectl scale` in a production context
        - rule: |
            local applicable = has_arg("scale") and k8s_context:match("prod")
            local user_message = "Proceed with caution. This command may disrupt your Kubernetes cluster setup."
            local approver_message = "Ensure that the user has documented a rollback plan before approving."
            return applicable, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
   {{< /code-block >}}

Avec cette configuration, lorsque vous exécutez une commande `kubectl scale --context prod`, CoTerm crée une demande d'approbation dans [Work Management][3]. Si vous choisissez d'associer la demande d'approbation à un [incident][5] actif, les autres intervenants d'incident sont automatiquement ajoutés en tant qu'approbateurs. Une fois cette demande approuvée, votre commande s'exécute. Vous pouvez également configurer des [règles d'automatisation des éléments de travail][8] pour déclencher des workflows basés sur des demandes d'approbation.

#### Exiger manuellement une approbation {#manually-require-approval}

Pour créer manuellement une demande d'approbation, exécutez :

```shell
ddcoterm approve
```

#### Contourner l'approbation {#bypass-approval}

Pour contourner l'approbation et exécuter votre commande, définissez la variable d'environnement `COTERM_BREAK_GLASS`.

Exemple :

```shell
COTERM_BREAK_GLASS=true kubectl delete foo
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/sensitive_data_scanner/
[2]: /fr/events/
[3]: /fr/incident_response/work_management/
[4]: /fr/coterm/rules
[5]: /fr/incident_response/incident_management/
[6]: /fr/coterm/install
[7]: https://app.datadoghq.com/terminal-streams
[8]: /fr/incident_response/work_management/automation_rules/