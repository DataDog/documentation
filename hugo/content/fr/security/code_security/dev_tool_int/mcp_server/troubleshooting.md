---
description: Problèmes courants et solutions pour le Datadog Code Security MCP Server.
further_reading:
- link: /security/code_security/dev_tool_int/mcp_server/
  tag: Documentation
  text: Vue d'ensemble et configuration de Datadog Code Security MCP Server.
- link: /security/code_security/dev_tool_int/mcp_server/tools_reference/
  tag: Documentation
  text: Référence des outils
is_beta: true
title: Dépannage
---
Si vous rencontrez des problèmes avec le [Datadog Code Security MCP Server][3], utilisez les solutions suivantes pour diagnostiquer et résoudre les problèmes courants.

<div class="alert alert-info">Ce Datadog Code Security MCP Server est distinct du <a href="/mcp_server">Datadog MCP Server</a>, qui fournit un accès basé sur le cloud aux fonctionnalités et aux données Datadog. Le serveur MCP Code Security s'exécute localement et se concentre sur l'analyse de sécurité au niveau du code.</div>

## Binaire introuvable {#binary-not-found}

Si une analyse renvoie une erreur concernant un binaire manquant, listez tous les scanners requis :

```shell
datadog-code-security-mcp version --detailed
```

Installez un binaire manquant en suivant les instructions dans [Installer les binaires de sécurité][1]. Après avoir installé les compétences de l'agent, `dd-codesec-setup-toolchain` installe, met à jour et diagnostique les mêmes binaires. Consultez [Install agent skills][4].

## Erreurs d'authentification {#authentication-errors}

Les clés définies dans la configuration du serveur MCP ne sont pas exportées vers votre shell. `echo $DD_API_KEY` affiche uniquement une clé exportée dans ce shell, ce qu'utilise une commande CLI directe.

- Pour le serveur MCP, confirmez que `DD_API_KEY` et `DD_APP_KEY` sont définis dans la configuration du client sur la page [Code Security MCP Server][3].
- Pour une commande CLI directe, exportez `DD_API_KEY` et `DD_APP_KEY` dans le même shell. Exportez éventuellement `DD_SITE`.

Si les valeurs sont définies mais que les analyses échouent toujours, vérifiez que vos clés disposent des autorisations appropriées. Consultez [API and Application Keys][2] pour plus de détails.

## Serveur MCP ne répond pas {#mcp-server-not-responding}

1. Vérifiez que le binaire est installé et accessible :

    ```shell
    datadog-code-security-mcp version
    ```

2. Vérifiez les logs du serveur MCP :

    ```shell
    tail -f ~/Library/Logs/Claude/mcp*.log
    tail -f ~/.claude/logs/mcp*.log
    ```

3. Vérifiez que votre configuration client pointe vers le chemin binaire correct. Si vous l'avez installé via Homebrew, le binaire devrait se trouver sur votre `PATH`. Sinon, utilisez un chemin absolu dans votre configuration.

## Résultats partiels {#partial-results}

Lors de l'exécution d'une analyse complète, certains types d'analyse peuvent réussir tandis que d'autres échouent (par exemple, si seuls certains binaires sont installés). Le serveur renvoie :

- Résultats de tous les scanners ayant réussi.
- Messages d'erreur avec les instructions d'installation pour tous les scanners ayant échoué.

C'est un comportement attendu. Installez les binaires manquants et relancez pour obtenir des résultats complets.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/dev_tool_int/mcp_server/#install-security-binaries
[2]: /fr/account_management/api-app-keys/
[3]: /fr/security/code_security/dev_tool_int/mcp_server/
[4]: /fr/security/code_security/dev_tool_int/mcp_server/#install-agent-skills