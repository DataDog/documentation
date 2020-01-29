---
title: Démarrage rapide - APM
kind: documentation
further_reading:
  - link: /tracing/visualization/
    tag: Documentation
    text: Utiliser l'UI de l'APM
  - link: 'https://learn.datadoghq.com/enrol/index.php?id=4'
    tag: Centre d'apprentissage
    text: Découvrez la surveillance des performances des applications avec Docker
---
## Présentation

La surveillance des performances des applications (APM) Datadog sert à recueillir des [traces][1] à partir de votre code d'application en backend. Ce guide de démarrage rapide vous montre comment obtenir votre première trace dans Datadog. Suivez les sections ci-dessous :

* [Création d'un compte Datadog](#create-a-datadog-account)
* [Installation de l'Agent](#install-the-agent)
* [Configuration de l'Agent d'APM](#apm-agent-setup)
* [Configuration de l'application APM](#apm-application-setup)

## Création d'un compte Datadog

Si vous ne l'avez pas encore fait, créez un [compte Datadog][2].

## Installation de l'Agent

Avant d'installer l'Agent, configurez une [machine virtuelle Vagrant Ubuntu 16.04][3] en utilisant les commandes suivantes. Pour en savoir plus sur Vagrant, consultez leur page [Débuter][4].

```text
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

Pour installer l'Agent Datadog sur un host, utilisez la [commande d'installation en une ligne][5] mise à jour avec votre [clé d'API Datadog][6] :

```shell
DD_API_KEY=<VOTRE_CLÉ_D_API_DD> bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Validation

Vérifiez que l'Agent est en cours d'exécution avec la [commande de statut][7] :

```shell
sudo datadog-agent status
```

Attendez quelques minutes et vérifiez que l'Agent est connecté à votre compte en consultant la [liste d'infrastructure][8] dans Datadog.

## Configuration de l'Agent d'APM

### Activer l'APM

Sur la dernière version de l'Agent v6, l'APM est activée par défaut. Pour pouvez la voir dans le [fichier de configuration][9] de l'Agent :

```text
# /etc/datadog-agent/datadog.yaml:
# apm_config:
#   Spécifie si l'Agent APM doit être exécuté ou non
#   enabled: true
```

Et dans `trace-agent.log` :

```shell
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-xenial
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### Nom d'environnement

(Facultatif) Nommez votre environnement en mettant à jour `datadog.yaml` pour définir `env` sous `apm_config`, par exemple :

```yaml
apm_config:
  enabled: true
  env: hello_world
```

Ensuite, [redémarrez][10] l'Agent Datadog :

```shell
sudo service datadog-agent restart
```

## Configuration de l'application APM

### Installation

Avant de configurer l'application, installez `pip` puis `flask` et `ddtrace` sur votre machine virtuelle Ubuntu :

```shell
sudo apt-get install python-pip
pip install flask
pip install ddtrace
```

### Création

Sur la machine virtuelle Ubuntu, créez l'application `hello.py` avec le contenu suivant :

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'hello world'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
```

### Exécution

Lancez `hello.py` avec `ddtrace` qui instrumente automatiquement votre application dans Datadog :

```shell
ddtrace-run python hello.py
```

Vous devriez voir une sortie semblable à :

```shell
* Serving Flask app "hello" (lazy loading)
  ...
* Running on http://0.0.0.0:5050/ (Press CTRL+C to quit)
```

### Test

Testez votre application et envoyez vos traces à Datadog avec `curl`. Votre application devrait fonctionner (comme indiqué ci-dessus). Dans une invite de commande distincte, exécutez :

```text
vagrant ssh
curl http://0.0.0.0:5050/
```

Cela donne :

```text
hello world
```

Après quelques minutes, votre trace s'affiche dans Datadog sous le service `flask`. Vérifiez la [page de services][11] ou la [liste de traces][12].

{{< img src="getting_started/tracing-services-list.png" alt="Liste des services de tracing" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/#terminology
[2]: https://www.datadoghq.com
[3]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[4]: https://www.vagrantup.com/intro/getting-started/index.html
[5]: https://app.datadoghq.com/account/settings#agent/ubuntu
[6]: https://app.datadoghq.com/account/settings#api
[7]: /fr/agent/guide/agent-commands/#agent-information
[8]: https://app.datadoghq.com/infrastructure
[9]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: /fr/agent/guide/agent-commands/#restart-the-agent
[11]: https://app.datadoghq.com/apm/services
[12]: https://app.datadoghq.com/apm/traces