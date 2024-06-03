---
aliases:
- /fr/logs/languages/go
further_reading:
- link: https://www.datadoghq.com/blog/go-logging/
  tag: Blog
  text: Comment recueillir, standardiser et centraliser des logs Golang
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guide de dépannage pour la collecte de logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail »
kind: documentation
title: Collecte de logs Go
---

Pour envoyer vos logs Go à Datadog, activez la journalisation au sein d'un fichier et [suivez][11] ce fichier avec votre Agent Datadog. Vous pouvez utiliser la configuration suivante avec[logrus][1], une bibliothèque de journalisation open source.

Datadog vous recommande fortement de configurer votre bibliothèque de journalisation de façon à générer vos logs au format JSON. Vous n'aurez ainsi pas besoin de créer de [règles de parsing personnalisées][2].

## Configurer votre logger

Pour une configuration Go classique, ouvrez un fichier `main.go` et collez le code suivant :

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // utiliser le JSONFormatteur
    log.SetFormatter(&log.JSONFormatter{})

    // enregistrer comme d'habitude un événement avec logrus
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("Mon premier événement de golang à stdout")
}
```

Vous pouvez ajouter des métadonnées à un log en fournissant l'objet JSON à afficher dans l'événement de log.

Ces métadonnées peuvent correspondre à `hostname`, `username`, `customers`, `metric` ou à toute autre information facilitant de dépannage et la compréhension du fonctionnement de votre application Go.

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // utiliser JSONFormatter
    log.SetFormatter(&log.JSONFormatter{})

    // enregistrer un événement avec logrus 
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("Mon premier événement de golang à stdout")

  // Pour les métadonnées, un schéma récurrent consiste à réutiliser les champs entre les déclarations de journalisation en réutilisant
  contextualizedLog := log.WithFields(log.Fields{
    "hostname": "staging-1",
    "appname": "foo-app",
    "session": "1ce3f6v"
  })

  contextualizedLog.Info("Événement simple avec des métadonnées globales")

}
```

## Configurer votre Agent Datadog

Une fois la [collecte de logs activée][3], configurez la [collecte de logs personnalisée][4] afin de suivre vos fichiers de log et envoyer les nouveaux logs à Datadog.

1. Créez un dossier `go.d/` dans le [répertoire de configuration de l'Agent][5] `conf.d/`.
2. Créez un fichier `conf.yaml` dans votre dossier `go.d/` avec le contenu suivant :

    ```yaml
    ##Log section
    logs:

      - type: file
        path: "<path_to_your_go_log>.log"
        service: <service_name>
        source: go
        sourcecategory: sourcecode
    ```

3. [Redémarrez l'Agent][6].
4. Lancez la [sous-commande status de l'Agent][7] et cherchez `go` dans la section `Checks` pour vérifier que les logs sont bien transmis à Datadog.

Si les logs sont au format JSON, Datadog [parse automatiquement les messages de log][8] pour extraire les attributs. Utilisez le [Log Explorer][9] pour visualiser et dépanner vos logs.

## Associer vos logs à vos traces

Si la solution APM est activée pour cette application, vous pouvez améliorer la corrélation entre vos logs et vos traces d'application en suivant la [documentation relative à la journalisation Go pour APM][10]. Cela vous permet d'ajouter automatiquement des identifiants de trace et de span à vos logs.

## Meilleures pratiques

* Nommez le logger avec un nom qui correspond à la fonctionnalité ou au service concerné.
* Utilisez les niveaux de log `DEBUG`, `INFO`, `WARNING` et `FATAL`. Dans Datadog, l'adresse `FATAL` de Go correspond à un niveau de gravité de `Emergency`.
* Commencez par enregistrer les informations les plus importantes. Développez l'exhaustivité de votre journalisation au fur et à mesure des itérations.
* Utilisez des métadonnées pour ajouter du contexte à tous vos logs. Cela vous permet de rapidement filtrer les utilisateurs, les clients ou les attributs métiers capitaux.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/sirupsen/logrus
[2]: /fr/logs/log_configuration/parsing
[3]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[4]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: /fr/logs/log_configuration/parsing/?tab=matchers
[9]: /fr/logs/explorer/#overview
[10]: /fr/tracing/other_telemetry/connect_logs_and_traces/go/
[11]: /fr/glossary/#tail