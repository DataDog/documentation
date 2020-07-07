---
title: Débuter avec le tracing
kind: documentation
aliases:
  - /fr/getting_started/tracing/distributed-tracing
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: Sélectionner le langage de votre application
  - link: /tracing/visualization/
    tag: Documentation
    text: Utiliser l'UI de l'APM
  - link: 'https://learn.datadoghq.com/enrol/index.php?id=4'
    tag: Centre d'apprentissage
    text: Découvrir la solution Application Performance Monitoring avec Docker
---
## Présentation

La solution Application Performance Monitoring (APM ou tracing) Datadog sert à recueillir des [traces][1] à partir de votre code d'application en backend. Ce guide de prise en main vous explique comment obtenir votre première trace dans Datadog.

**Remarque** : l'APM Datadog est disponible pour de nombreux langages et frameworks. Consultez la documentation relative à l'[instrumentation de votre application][2].

## Compte Datadog

Si vous ne l'avez pas encore fait, créez un [compte Datadog][3].

## Agent Datadog

Avant d'installer l'Agent Datadog, configurez une [machine virtuelle Vagrant Ubuntu 16.04][4] en utilisant les commandes suivantes. Pour en savoir plus sur Vagrant, consultez leur page [Débuter][5].

```text
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

Pour installer l'Agent Datadog sur un host, utilisez la [commande d'installation d'une ligne][6] en indiquant votre [clé d'API Datadog][7] :

```shell
DD_API_KEY=<CLÉ_API_DATADOG> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

### Validation

Vérifiez que l'Agent est en cours d'exécution avec la [commande status][8] :

```shell
sudo datadog-agent status
```

Attendez quelques minutes et vérifiez que l'Agent est connecté à votre compte en consultant la [liste d'infrastructures][9] dans Datadog.

## APM Datadog

### Activer l'APM

Pour les dernières versions de l'Agent 6 et 7, l'APM est activée par défaut. Pour vérifier cela, consultez le [fichier de configuration `datadog.yaml`][10] de l'Agent :

```yaml
# apm_config:
#   Spécifie si l'Agent APM doit être exécuté ou non
#   enabled: true
```

Et `trace-agent.log` :

```shell
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-xenial
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### Nom d'environnement

Pour obtenir la meilleure expérience possible, il est conseillé d'utiliser la variable d'environnement `DD_ENV` pour configurer `env` via le traceur de votre service.

En outre, si l'injection de logs est activée pour votre traceur, l'élément `env` sera cohérent dans les différents logs et traces. Pour en savoir plus, consultez la section [Tagging de service unifié][11].

Sinon, nommez votre environnement en mettant à jour `datadog.yaml` de façon à définir `env` sous `apm_config`. Pour savoir comment définir `env` pour l'APM, consultez le [guide de configuration des tags primaires][12].

## Application APM

### Installation

Avant de configurer l'application, installez `pip`, puis `flask` et `ddtrace`, sur votre machine virtuelle Ubuntu :

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

Lancez `hello.py` avec `ddtrace`, qui instrumente automatiquement votre application dans Datadog :

```shell
export DD_SERVICE=hello
ddtrace-run python hello.py
```

La réponse devrait ressembler à ce qui suit :

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

Après quelques minutes, votre trace s'affiche dans Datadog sous le service `hello`. Consultez la [page de services][13] ou la [liste de traces][14] pour visualiser votre trace.

{{< img src="getting_started/tracing-services-list.png" alt="Liste des services de tracing" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/#terminology
[2]: https://docs.datadoghq.com/fr/tracing/setup/
[3]: https://www.datadoghq.com
[4]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[5]: https://www.vagrantup.com/intro/getting-started/index.html
[6]: https://app.datadoghq.com/account/settings#agent/ubuntu
[7]: https://app.datadoghq.com/account/settings#api
[8]: /fr/agent/guide/agent-commands/#agent-information
[9]: https://app.datadoghq.com/infrastructure
[10]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /fr/getting_started/tagging/unified_service_tagging
[12]: /fr/tracing/guide/setting_primary_tags_to_scope/
[13]: https://app.datadoghq.com/apm/services
[14]: https://app.datadoghq.com/apm/traces