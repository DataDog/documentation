---
aliases:
  - /fr/logs/log_collection/logstash
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/logstash/README.md'
display_name: Logstash
git_integration_title: logstash
guid: 9d110885-cbdf-44e5-83b8-7a6514724e98
integration_id: logstash
integration_title: Logstash
is_public: true
kind: integration
maintainer: ervansetiawan@gmail.com
manifest_version: 1.0.0
metric_prefix: logstash.
metric_to_check: logstash.process.cpu.percent
name: logstash
public_title: Intégration Datadog/Logstash
short_description: Surveiller et recueillir des métriques de runtime à partir d'une instance Logstash
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Logstash en temps réel pour :

* Visualiser et surveiller les états de Logstash
* Être informé des événements Logstash

## Implémentation

Le check Logstash n'est **PAS** inclus avec le paquet de l'[Agent Datadog][1].

### Installation

Pour installer le check Logstash sur votre host :

1. Installez le [kit de développement][2] sur n'importe quelle machine.
2. Exécutez `ddev release build logstash` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][1].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/logstash/dist/<NOM_ARTEFACT>.whl`.

### Configuration

Pour configurer le check Logstash :

1. Créez un dossier `logstash.d/` dans le dossier `conf.d/` à la racine du répertoire de votre Agent.
2. Créez un fichier `conf.yaml` dans le dossier `logstash.d/` précédemment créé.
3. Consultez le [fichier d'exemple logstash.yaml][3] et copiez son contenu dans le fichier `conf.yaml`.
4. Modifiez le fichier `conf.yaml` pour commencer à recueillir vos [métriques][4] ou [logs][5].
5. [Redémarrez l'Agent][6].

#### Collecte de métriques

* Ajoutez cette configuration à votre fichier `conf.yaml` pour commencer à recueillir vos [métriques Logstash][7] :

```
init_config:

instances:
  #   L'URL sur laquelle Logstash fournit son API de surveillance. Celle-ci sera utilisée pour récupérer diverses métriques de runtime concernant Logstash.
  #
  - url: http://localhost:9600
```

Configurez-la de façon à spécifier votre serveur et votre port.

Consultez le [fichier d'exemple conf.yaml][3] pour découvrir toutes les options de configuration disponibles.
* [Redémarrez l'Agent][6] pour commencer à envoyer vos métriques Logstash à Datadog.

#### Collecte de logs

Datadog possède [un plug-in de sortie][8] pour Logstash qui s'occupe de l'envoi de vos logs à votre plateforme Datadog.

Pour installer ce plugin, exécutez la commande suivante :

* `logstash-plugin install logstash-output-datadog_logs`

Configurez ensuite le plug-in `datadog_logs` avec votre [clé d'API Datadog][9] :

```
output {
    datadog_logs {
        api_key => "<CLÉ_API_DATADOG>"
    }
}
```

Il est possible d'utiliser des paramètres supplémentaires pour changer l'endpoint utilisé afin de passer par un [proxy][10] :

* `host` : endpoint proxy lorsque des logs ne sont pas directement transmis à Datadog (valeur par défaut : `intake.logs.datadoghq.com`).
* `port` : port proxy lorsque des logs ne sont pas directement transmis à Datadog (valeur par défaut : `10516`)
* `use_ssl` : si ce paramètre est défini sur `true`, l'Agent initialise une connexion TCP/SSL sécurisée vers Datadog (valeur par défaut : `true`)

Il peut également être utilisé pour l'envoi de logs au **site européen de Datadog** en définissant :

 ```
output {
    datadog_logs {
        api_key => "<CLÉ_API_DATADOG>"
        host => "tcp-intake.logs.datadoghq.eu"
        port => "443"
    }
}
```

##### Ajouter des métadonnées à vos logs

Pour tirer pleinement parti de vos logs dans Datadog, il est important de leur associer les métadonnées appropriées, y compris le hostname et la source. Par défaut, le hostname et le timestamp sont normalement remappés comme il se doit grâce au [remappage pour les attributs réservés][11] de Datadog. Pour vous assurer que le service est correctement remappé, ajoutez la valeur de son attribut à la liste de remappage du service.

##### Source

Configurez un filtre Logstash pour définir la source (nom d'intégration Datadog) sur vos logs. 

```
filter {
  mutate {
    add_field => {
 "ddsource" => "<MA_VALEUR_SOURCE>"
       }
    }
 }
```

Cela déclenche la [configuration automatique de l'intégration][12] dans Datadog.

##### Tags personnalisés

Les [tags de host][13] sont automatiquement configurés sur vos logs s'il existe un hostname correspondant dans votre [liste d'infrastructures][14]. Utilisez l'attribut `ddtags` pour ajouter des tags personnalisés à vos logs :

```
filter {
  mutate {
    add_field => {
        "ddtags" => "env:test,<KEY:VALUE>"
       }
    }
 }
```


### Validation

[Lancez la sous-commande `status` de l'Agent][15] et cherchez `logstash` dans la section Checks.

## Compatibilité

Le check Logstash est compatible avec les versions 5.x, 6.x et 7.x de Logstash. Il prend également en charge les nouvelles métriques multipipeline ajoutées dans la version de Logstash 6.0. 
Testé avec les versions 5.6.15, 6.3.0 et 7.0.0 de Logstash.

## Données collectées
### Métriques
{{< get-metrics-from-git "logstash" >}}


### Événements
Le check Logstash n'inclut aucun événement.

### Checks de service

`logstash.can_connect` :

Renvoie `Critical` si l'Agent n'est pas capable de se connecter à Logstash pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

### Connexion impossible de l'Agent
```
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Vérifiez que le paramètre `url` dans `conf.yaml` est correctement configuré.

Si vous avez besoin d'aide supplémentaire, contactez [l'assistance Datadog][16].



{{< get-dependencies >}}
[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[3]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[4]: #metric-collection
[5]: #log-collection
[6]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[7]: #metrics
[8]: https://github.com/DataDog/logstash-output-datadog_logs
[9]: https://app.datadoghq.com/account/settings#api
[10]: https://docs.datadoghq.com/fr/agent/logs/proxy
[11]: /fr/logs/#edit-reserved-attributes
[12]: /fr/logs/processing/#integration-pipelines
[13]: /fr/getting_started/tagging/assigning_tags
[14]: https://app.datadoghq.com/infrastructure
[15]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[16]: http://docs.datadoghq.com/help
