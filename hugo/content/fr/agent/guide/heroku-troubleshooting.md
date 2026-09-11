---
aliases:
- /fr/agent/faq/heroku-troubleshooting/
title: Dépannage du buildpack Datadog-Heroku
---

Pour commencer à dépanner Heroku, utilisez la commande `agent-wrapper` avec les commandes dʼinformation et de debugging indiquées dans [la documentation relative à lʼAgent][1].

Par exemple, pour afficher le statut de votre Agent Datadog et des intégrations activées, exécutez :

```shell
agent-wrapper status
```

Vérifiez ensuite que lʼAgent Datadog effectue son écoute en envoyant une métrique personnalisée. Depuis le répertoire de votre projet, exécutez :

```shell
heroku run bash

# Une fois que votre Dyno est lancé et que vous êtes au niveau de la ligne de commande
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

Après quelques instants, utilisez lʼexplorateur de métriques pour confirmer la bonne réception de la métrique.

Il peut également se révéler utile dʼobtenir les logs de lʼAgent et de lʼAgent de trace de votre Dyno en cours dʼexécution.

Télécharger les logs de lʼAgent Datadog :

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog.log --dyno=<YOUR DYNO NAME>
```

Télécharger les logs de lʼAgent de trace Datadog :

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog-apm.log --dyno=<YOUR DYNO NAME>
```

## Envoyer un flare

Générer un flare en exécutant la [commande `agent-wrapper`][1] :

```shell
agent-wrapper flare
```

[1]: /fr/agent/configuration/agent-commands/#agent-status-and-information