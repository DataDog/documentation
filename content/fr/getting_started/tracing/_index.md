---
aliases:
- /fr/getting_started/tracing/distributed-tracing
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Sélectionner le langage de votre application
- link: /tracing/glossary/
  tag: Documentation
  text: Utiliser l'UI de l'APM
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Centre d'apprentissage
  text: Présentation d'Application Performance Monitoring
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour maîtriser la solution APM
title: Débuter avec le tracing
---

## Présentation

La solution Application Performance Monitoring (APM ou tracing) Datadog sert à recueillir des [traces][1] à partir de votre code d'application en backend. Ce guide de prise en main vous explique comment obtenir votre première trace dans Datadog.

**Remarque** : l'APM Datadog est disponible pour de nombreux langages et frameworks. Consultez la documentation relative à l'[instrumentation de votre application][2].

## Compte Datadog

Si vous ne l'avez pas encore fait, créez un [compte Datadog][3].

## Agent Datadog

Avant d'installer l'Agent Datadog, configurez une [machine virtuelle Vagrant Ubuntu 22.04][4] en utilisant les commandes suivantes. Pour en savoir plus sur Vagrant, consultez leur page [Débuter][5].

```text
vagrant init ubuntu/jammy64
vagrant up
vagrant ssh
```

Pour installer l'Agent Datadog sur un host, utilisez la [commande d'installation d'une ligne][6] en indiquant votre [clé d'API Datadog][7] :

```shell
DD_API_KEY=<CLÉ_API_DATADOG> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

### Validation

Vérifiez que l'Agent est en cours d'exécution avec la [commande status][8] :

```shell
sudo datadog-agent status
```

Attendez quelques minutes et vérifiez que l'Agent est connecté à votre compte en consultant la [liste d'infrastructures][9] dans Datadog.

## APM Datadog

### Suivre la documentation dans l'application (conseillé)

Pour les étapes restantes, suivez les [instructions de démarrage rapide][10] fournies sur le site Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (dans cet exemple, un déploiement basé sur un host) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer le profileur en continu, l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.


### Activer l'APM

Avec les dernières versions de l'Agent 6 et 7, la solution APM est activée par défaut. Pour vérifier cela, consultez le [fichier de configuration `datadog.yaml`][11] de l'Agent :

```yaml
# apm_config:
##   Spécifie si l'Agent APM doit être exécuté ou non
#   enabled: true
```

Et `trace-agent.log` :

```bash
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-jammy
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### Nom de l'environnement

Pour une expérience optimale, il est conseillé d'utiliser la variable d'environnement `DD_ENV` pour configurer `env` via le traceur de votre service.

En outre, si l'injection de logs est activée pour votre traceur, le tag `env` est cohérent dans les différents logs et traces. Pour en savoir plus, consultez la section [Tagging de service unifié][12].

Sinon, nommez votre environnement en mettant à jour `datadog.yaml` de façon à définir `env` sous `apm_config`. Pour savoir comment définir `env` pour l'APM, consultez le [guide de configuration des tags primaires][13].

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

```bash
* Serving Flask app "hello" (lazy loading)
  ...
* Running on http://0.0.0.0:5050/ (Press CTRL+C to quit)
```

### Test

Testez votre application et envoyez vos traces à Datadog avec `curl`. Votre application doit être en cours d'exécution (comme indiqué ci-dessus). Dans une invite de commande distincte, exécutez :

```text
vagrant ssh
curl http://0.0.0.0:5050/
```

On obtient ce qui suit :

```text
hello world
```

Après quelques minutes, votre trace s'affiche dans Datadog sous le service `hello`. Consultez le [catalogue des services][14] ou la [liste des traces][15] pour visualiser votre trace.

{{< img src="getting_started/tracing-services-list.png" alt="Liste des services de tracing" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/#terminology
[2]: https://docs.datadoghq.com/fr/tracing/setup/
[3]: https://www.datadoghq.com
[4]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[5]: https://www.vagrantup.com/intro/getting-started
[6]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /fr/agent/configuration/agent-commands/#agent-information
[9]: https://app.datadoghq.com/infrastructure
[10]: https://app.datadoghq.com/apm/service-setup
[11]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[12]: /fr/getting_started/tagging/unified_service_tagging
[13]: /fr/tracing/guide/setting_primary_tags_to_scope/
[14]: https://app.datadoghq.com/services
[15]: https://app.datadoghq.com/apm/traces