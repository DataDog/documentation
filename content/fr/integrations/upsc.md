---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/upsc/README.md'
display_name: UPSC
git_integration_title: upsc
guid: f14607ca-0e30-4c7f-9564-fbdb46ca3030
integration_id: upsc
integration_title: UPSC
is_public: true
kind: integration
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: upsc.
name: upsc
public_title: Intégration Datadog/UPSC
short_description: Collecteur de statistiques UPSC pour les batteries d'onduleur
support: contrib
supported_os:
  - linux
---
## Présentation

Recueillez des métriques du service UPSD via UPSC en temps réel pour :

* Visualiser et surveiller la santé et l'état des batteries d'onduleur
* Être informé des failovers et des événements des onduleurs

## Implémentation

Le check UPSC n'est **PAS** inclus avec le paquet de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check UPSD sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `upsc`, exécutez :

    ```
    ddev -e release build upsc
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_UPSC_ARTIFACT_>/<UPSC_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `upsc.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#collecte-de-metriques) UPSC.
  Consultez le [fichier d'exemple upsc.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

## Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `upsc` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "upsc" >}}


### Événements
Le check UPSC n'inclut aucun événement.

### Checks de service
Le check UPSC n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/upsc/datadog_checks/upsc/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/upsc/metadata.csv
[13]: http://docs.datadoghq.com/help


{{< get-dependencies >}}