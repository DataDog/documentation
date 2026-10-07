---
aliases:
- /fr/tracing/faq/trace-agent-from-source/

title: Installer l'Agent de trace depuis les sources
---

## Installation depuis les sources

1. Installez `Go 1.11+`. Pour en savoir plus, suivez le guide détaillé disponible sur le [site Web officiel de Go][1] (en anglais).
2. Dupliquez le [référentiel de l'Agent Datadog][2].
3. Exécutez la commande suivante à la racine du référentiel `datadog-agent` :
    ```bash
    go install ./cmd/trace-agent
    ```

4. Exécutez l'Agent à l'aide de `trace-agent` (en supposant que le chemin `$GOPATH/bin` se trouve dans le `$PATH` de votre système).

### Dépannage

Consultez la sortie de l'Agent ou ses logs (`/var/log/datadog/trace-agent.log` sous Linux) pour vérifier que les traces ne comportent pas d'erreur et qu'elles parviennent à communiquer avec l'API Datadog.

[1]: https://golang.org/dl
[2]: https://github.com/DataDog/datadog-agent