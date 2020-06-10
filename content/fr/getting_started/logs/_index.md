---
title: Envoyer des logs à Datadog
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/enrol/index.php?id=15'
    tag: Centre d'apprentissage
    text: Présentation des logs dans Datadog
  - link: /logs/log_collection/
    tag: Documentation
    text: 'Recueillir des logs en provenance de vos applications, conteneurs et fournisseurs de solutions cloud'
---
## Présentation

La solution Log Management de Datadog permet de recueillir des logs en provenance de votre application. Cette page décrit la marche à suivre pour recevoir vos premiers logs dans Datadog. Avant de poursuivre :

1. Si vous ne l'avez pas déjà fait, créez un [compte Datadog][1] et [activez Datadog Log Management][2].
2. Configurez une [machine virtuelle Vagrant Ubuntu 16.04][3] en utilisant les commandes suivantes. Pour en savoir plus sur Vagrant, consultez leur page [Getting Started][4] (en anglais) :

    ```text
    vagrant init ubuntu/xenial64
    vagrant up
    vagrant ssh
    ```

Une fois cette opération terminée, lisez les sections ci-dessous pour découvrir comment :

- [Envoyer des logs manuellement](#sending-logs-manually)
- [Utiliser l'Agent Datadog pour envoyer des logs à partir d'un fichier](#send-logs-from-a-file)

## Envoyer des logs manuellement

Pour envoyer des logs manuellement, utilisez la commande `telnet` avec votre [clé d'API Datadog][5] dans machine virtuelle Vagrant.

Les logs peuvent prendre la forme d'un message en texte intégral :

{{< site-region region="us" >}}

L'endpoint TCP sécurisé est {{< region-param key="tcp_endpoint" code="true" >}} (ou le port {{< region-param key="tcp_endpoint_port" code="true" >}} pour les connexions non sécurisées).

{{< code-block lang="text" >}}
telnet intake.logs.datadoghq.com 10514

<CLÉ_API_DATADOG> Log en texte brut envoyé via TCP
{{< /code-block >}}

{{< /site-region >}}

{{< site-region region="eu" >}}

L'endpoint TCP sécurisé est {{< region-param key="tcp_endpoint" code="true" >}} (ou le port {{< region-param key="tcp_endpoint_port" code="true" >}} pour les connexions non sécurisées).

{{< code-block lang="text" >}}
telnet tcp-intake.logs.datadoghq.eu 1883

<CLÉ_API_DATADOG> Log en texte brut envoyé via TCP
{{< /code-block >}}

{{< /site-region >}}

On obtient alors ce qui suit sur la [page Log Explorer][2] :

{{< img src="getting_started/logs/plain_text_log.png" alt="Telnet personnalisé" >}}

ou un objet JSON qui est automatiquement parsé par Datadog :

{{< site-region region="us" >}}

```text
telnet intake.logs.datadoghq.com 10514

<CLÉ_API_DATADOG> {"message":"Log au format JSON envoyé via TCP", "ddtags":"env:dev", "ddsource":"terminal", "hostname":"gs-hostname", "service":"user"}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```text
telnet tcp-intake.logs.datadoghq.eu 1883

<CLÉ_API_DATADOG> {"message":"Log au format JSON envoyé via TCP", "ddtags":"env:dev", "ddsource":"terminal", "hostname":"gs-hostame", "service":"user"}
```

{{< /site-region >}}

On obtient alors ce qui suit sur la [page Log Explorer][2] :

{{< img src="getting_started/logs/json_log.png" alt="Logs JSON" >}}

## Envoyer des logs à partir d'un fichier

### Installation de l'Agent

Pour installer l'Agent Datadog sur votre host Vagrant, utilisez la [commande d'installation en une étape][6] en spécifiant votre [clé d'API Datadog][5] :

{{< site-region region="us" >}}

```text
DD_API_KEY=<CLÉ_API_DATADOG>  bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```text
DD_API_KEY=<CLÉ_API_DATADOG> DD_SITE="datadoghq.eu" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

{{< /site-region >}}

#### Validation

Vérifiez que l'Agent est lancé avec la [commande status][7] `sudo datadog-agent status`. Puisque vous n'avez pas encore activé la collecte de logs, vous devriez voir :

```text
==========
Logs Agent
==========

  Logs Agent is not running
```

**Remarque** : patientez quelques minutes et vérifiez que l'Agent est connecté à votre compte en consultant la [liste d'infrastructures][8] dans Datadog.

### Activer la collecte de logs

Pour activer la collecte de logs avec l'Agent, modifiez le [fichier de configuration][9] `datadog.yaml` qui se trouve dans `/etc/datadog-agent/datadog.yaml` et définissez le paramètre `logs_enabled:true` :

```yaml
## @param logs_enabled - booléen - facultatif - par défaut : false
## Activez la collecte de logs avec l'Agent Datadog en définissant logs_enabled sur true.
#
logs_enabled: true
```

### Surveiller un fichier personnalisé

#### Créer le fichier de log

Pour recueillir des logs à partir d'un fichier personnalisé, créez le fichier puis ajoutez-y une ligne de log :

```shell
$ touch fichier_log_à_surveiller.log

$ echo "Première ligne de log" >> fichier_log_à_surveiller.log
```

#### Configurer l'Agent

Pour indiquer à l'Agent de surveiller ce fichier de log :

1. Créez un dossier de configuration dans le [répertoire de configuration de l'Agent][10] :

    ```shell
    sudo mkdir /etc/datadog-agent/conf.d/custom_log_collection.d/
    ```

2. Créez votre fichier de configuration dans ce nouveau dossier de configuration :

    ```shell
    sudo touch /etc/datadog-agent/conf.d/custom_log_collection.d/conf.yaml
    ```

3. Copiez le contenu suivant et collez-le dans ce fichier `conf.yaml` :

    ```yaml
    logs:
        - type: file
          path: /home/ubuntu/log_file_to_monitor.log
          source: custom
          service: user
    ```

4. Redémarrez l'Agent : `sudo service datadog-agent restart`

##### Validation

Si la configuration du logging est correcte, la [commande status][7] `sudo datadog-agent status` renvoie ce qui suit :

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0

  custom_log_collection
  ---------------------
    Type: file
    Path: /home/ubuntu/fichier_log_à_surveiller.log
    Status: OK
    Inputs: /home/ubuntu/fichier_log_à_surveiller.log
```

### Ajouter des logs dans le fichier

Maintenant que tout est correctement configuré, ajoutez des entrées dans votre fichier de logs pour les consulter dans Datadog :

```shell
$ echo "Nouvelle ligne de log dans le fichier de log" >> fichier_log_à_surveiller.log
```

On obtient alors ce qui suit sur la [page Log Explorer][2] :

{{< img src="getting_started/logs/file_log_example.png" alt="Exemple de fichier de logs" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com
[2]: https://app.datadoghq.com/logs
[3]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[4]: https://www.vagrantup.com/intro/getting-started
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://app.datadoghq.com/account/settings#agent/ubuntu
[7]: /fr/agent/guide/agent-commands/#agent-information
[8]: https://app.datadoghq.com/infrastructure
[9]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory