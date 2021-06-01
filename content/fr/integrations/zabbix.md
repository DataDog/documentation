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
  - 'https://github.com/DataDog/integrations-extras/blob/master/zabbix/README.md'
display_name: Zabbix
draft: false
git_integration_title: zabbix
guid: bf1fa08e-3df3-40b7-ab1d-1ba685c3057d
integration_id: zabbix
integration_title: zabbix
is_public: true
kind: integration
maintainer: KosukeKamiya@users.noreply.github.com
manifest_version: 1.0.0
metric_prefix: zabbix.
metric_to_check: zabbix.system.uptime
name: zabbix
public_title: zabbix
short_description: Recueillez l'historique des éléments via l'API Zabbix et envoyez-les à Datadog en tant que métriques.
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

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Zabbix sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][5].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-zabbix==<INTEGRATION_VERSION>
   ```
3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].


### Configuration

1. Modifiez le fichier `zabbix.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Zabbix. Consultez le [fichier d'exemple zabbix.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

#### Envoyer des alertes Zabbix dans le flux d'événements

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

[Lancez la sous-commande status de l'Agent][8] et cherchez `zabbix` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "zabbix" >}}


### Checks de service

`zabbix.can_connect` : renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'API Zabbix. Si ce n'est pas le cas, renvoie OK.

### Événements

Les alertes Zabbix sont recueillies en tant qu'événements dans le flux d'événements Datadog.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://www.zabbix.com/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/datadog_checks/zabbix/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/metadata.csv
[10]: https://docs.datadoghq.com/fr/help/