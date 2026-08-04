---
description: Découvrir comment enregistrer des sessions de terminal, créer des shims
  pour l'enregistrement automatique et configurer CoTerm pour se protéger contre les
  commandes dangereuses.
further_reading:
- link: /coterm
  tag: documentation
  text: Datadog CoTerm
- link: /coterm/install
  tag: documentation
  text: Installer Datadog CoTerm
- link: /coterm/rules
  tag: documentation
  text: Règles de configuration CoTerm
title: Utiliser Datadog CoTerm
---

## Consulter les sessions de terminal enregistrées
Au début et à la fin de chaque session de terminal enregistrée, CoTerm affiche un lien pour consulter la session dans Datadog. Vous pouvez également [consulter toutes les sessions de terminal enregistrées][7].

## Structure de commande de la CLI CoTerm

```shell
ddcoterm [OPTIONS] [-- <COMMAND>...] [COMMAND]
```

Exécutez `ddcoterm --help` pour toutes les options et commandes.

## Enregistrer une session de terminal

CoTerm enregistre des sessions de terminal que vous pouvez relire et consulter dans Datadog. Pour votre sécurité, les données sensibles (telles que les mots de passe et les clés d'API) sont [automatiquement supprimées][1]. Tous les processus lancés dans la session de terminal sont enregistrés en tant qu'[événements][2].

### Lancer et enregistrer une session de terminal interactive
Pour lancer manuellement Datadog CoTerm et enregistrer l'intégralité de votre session de terminal :

```shell
ddcoterm
```

Lorsque vous terminez la session, CoTerm arrête l'enregistrement et envoie les données de processus capturées à Datadog.

### Enregistrer la sortie d'une commande
Pour exécuter une commande individuelle et enregistrer sa sortie :

```shell
ddcoterm -- datadog-agent status
```

Cela lance CoTerm et exécute `datadog-agent status`. Lorsque le processus se termine, CoTerm arrête l'enregistrement et envoie les données de processus capturées à Datadog.

## Enregistrer automatiquement une commande

Pour configurer CoTerm afin d'enregistrer automatiquement toutes les invocations futures d'une commande particulière, créez un shim :

```shell
ddcoterm shim create datadog-agent
```

Après avoir créé un shim, redémarrez votre terminal ou sourcez votre profil. (Par exemple, exécutez `source ~/.bashrc`.) Si vous utilisez un shell autre que Bash ou Zsh, ajoutez `path/to/.ddcoterm/overrides` à votre PATH manuellement.

## Protéger contre les commandes de terminal dangereuses

Pour éviter l'exécution accidentelle de commandes de terminal désignées, vous pouvez configurer CoTerm pour qu'il agisse comme un linter. Pour plus de contrôle, vous pouvez utiliser CoTerm avec la [gestion des cas Datadog][3] pour exiger une approbation pour les commandes désignées.

### Linter une commande

Lorsque vous essayez d'exécuter une commande désignée (par exemple, `kubectl scale`), CoTerm peut afficher des avertissements et vous inviter à confirmer.

1. Créez un shim pour votre commande : `ddcoterm shim create kubectl`

1. Configurez une règle de linting dans votre fichier `.ddcoterm/config.yaml`. Pour plus de détails sur la configuration du linting dans CoTerm, consultez la section [Règles de configuration CoTerm][4].

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

Avec cette configuration, CoTerm intercepte toute commande `kubectl scale` sans flag `--context`.

{{< img src="coterm/linter-warning.png" alt="Interface de ligne de commande. L'utilisateur a exécuté 'kubectl scale foo'. La sortie indique 'Warning from CoTerm: No kubectl context specified (effective context: 'minikube'). It is recommended to always explicitly specify the context when running kubectl scale. Do you want to continue? (y/n)'" style="width:70%;" >}}

### Exiger une approbation pour les commandes

Pour les commandes encore plus dangereuses, CoTerm peut exiger une approbation explicite d'un autre membre de l'équipe (via la gestion des cas) avant d'exécuter la commande.

1. Créez un shim pour votre commande : `ddcoterm shim create kubectl`

2. Configurez l'exigence d'approbation dans votre fichier `.ddcoterm/config.yaml`. Pour plus de détails, consultez la section [Règles de configuration CoTerm][4].

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # Enregistrer et exiger une approbation pour toutes les exécutions de `kubectl scale` dans un contexte de production
        - rule: |
            local applicable = has_arg("scale") and k8s_context:match("prod")
            local user_message = "Proceed with caution. This command may disrupt your Kubernetes cluster setup."
            local approver_message = "Ensure that the user has documented a rollback plan before approving."
            return applicable, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
   {{< /code-block >}}

Avec cette configuration, lorsque vous exécutez une commande `kubectl scale --context prod`, CoTerm crée une demande d'approbation dans la [gestion des cas][3]. Si vous choisissez d'associer la demande d'approbation à un [incident][5] actif, les autres intervenants en cas d'incident sont automatiquement ajoutés en tant qu'approbateurs. Une fois cette demande approuvée, votre commande s'exécute. Vous pouvez également configurer des [règles d'automatisation de cas][8] pour déclencher des workflows en fonction des demandes d'approbation.

#### Exiger manuellement une approbation

Pour créer une demande d'approbation manuellement, exécutez :

```shell
ddcoterm approve
```

#### Contourner l'approbation

Pour contourner l'approbation et exécuter votre commande, définissez la variable d'environnement `COTERM_BREAK_GLASS`.

Exemple :

```shell
COTERM_BREAK_GLASS=true kubectl delete foo
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/sensitive_data_scanner/
[2]: /fr/events/
[3]: /fr/incident_response/case_management/
[4]: /fr/coterm/rules
[5]: /fr/incident_response/incident_management/
[6]: /fr/coterm/install
[7]: https://app.datadoghq.com/terminal-streams
[8]: /fr/incident_response/case_management/automation_rules/