---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- network
- monitoring
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zabbix/README.md
display_name: Zabbix
draft: false
git_integration_title: zabbix
guid: bf1fa08e-3df3-40b7-ab1d-1ba685c3057d
integration_id: zabbix
integration_title: zabbix
integration_version: 1.1.0
is_public: true
kind: integration
maintainer: KosukeKamiya@users.noreply.github.com
manifest_version: 1.0.0
metric_prefix: zabbix.
metric_to_check: zabbix.system.uptime
name: zabbix
public_title: zabbix
short_description: Recueillez l'historique des éléments via l'API Zabbix et envoyez-les
  à Datadog en tant que métriques.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Connectez-vous à Zabbix pour :

- Surveiller [Zabbix][1] via l'Agent Datadog
- Envoyer des alertes Zabbix à Datadog sous la forme d'événements dans le flux d'événements

## Configuration

Le check Zabbix n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Zabbix sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-zabbix==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `zabbix.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Zabbix. Consultez le [fichier d'exemple zabbix.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

#### Collecte d'événements

##### Créer un type de support Datadog

1. Accédez à *Administration > Media Types > Create Media Type*.
2. Ajoutez la clé d'API Datadog en tant que paramètre, puis les template variables Zabbix suivantes en tant que paramètres : {ALERT.MESSAGE}, {ALERT.SUBJECT}, {EVENT.DATE}, {EVENT.NAME}, {EVENT.NSEVERITY}, {EVENT.TAGSJSON}, {EVENT.TIME}, {EVENT.VALUE}, {ITEM.NAME}.
3. Définissez **Name** sur `Datadog`, **Type** sur `Webhook` et **Script** sur le code suivant :
``` 
    try {
        Zabbix.Log(4, '[datadog webhook] received value=' + value);

        var params = JSON.parse(value);
        var req = new CurlHttpRequest();
        req.AddHeader('Content-Type: application/json');
        var webhook_url = 'https://app.datadoghq.com/intake/webhook/zabbix?api_key=' + params.api_key;
        var webhook_data = value;
        var resp = req.Post(webhook_url, webhook_data);
        if (req.Status() != 202) {
            throw 'Response code: '+req.Status();
        }
        Zabbix.Log(4, '[datadog webhook] received response with status code ' + req.Status() + '\n' + resp);
    } catch (error) {
        Zabbix.Log(4, '[datadog webhook] event creation failed json : ' + webhook_data)
        Zabbix.Log(4, '[datadog webhook] event creation failed : ' + error);
    }
    return JSON.stringify({});

```
4. Vérifiez que le webhook fonctionne correctement à l'aide du bouton Test.

##### Attribuer le support de webhook à un utilisateur existant

1. Après avoir configuré le type de support du webhook, accédez à *Administration > Users* et créez un utilisateur Zabbix dédié pour représenter le webhook. Par exemple, utilisez l'alias `Datadog` pour le webhook Datadog. À l'exception du support, vous pouvez conserver les valeurs par défaut de tous les paramètres, car cet utilisateur ne se connecte pas à Zabbix.
2. Dans le profil de l'utilisateur, accédez à l'onglet **Media** et ajoutez un webhook avec les informations requises. Si le webhook n'utilise pas le champ Send to, saisissez une combinaison de caractères pris en charge pour contourner les critères de validation.
3. Accordez à cet utilisateur des autorisations de lecture (au minimum) pour tous les hosts pour lesquels des alertes doivent être envoyées.

##### Configurer une action d'alerte pour le webhook

1. Accédez à *Configuration > Actions*.
2. Dans la liste déroulante du titre de page, sélectionnez le type d'action requis.
3. Cliquez sur **Create Action**.
4. Attribuez un nom à l'action.
5. Choisissez les conditions à remplir pour effectuer les opérations.
6. Choisissez les opérations à effectuer.

### Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `zabbix` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "zabbix" >}}


### Événements

Les alertes Zabbix sont recueillies en tant qu'événements dans le flux d'événements Datadog.

### Checks de service
{{< get-service-checks-from-git "zabbix" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://www.zabbix.com/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/datadog_checks/zabbix/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/