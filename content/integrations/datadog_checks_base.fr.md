---
{'kind': 'integration'}
---



## Aperçu

This package provides the Python bits needed by the [Datadog Agent](https://github.com/DataDog/datadog-agent)
to run Agent-based Integrations (also known as _Checks_).

This _Check toolkit_ is used in two scenarios:

 1. When used from within the Python interpreter embedded in the Agent, it
 provides all the base classes and utilities needed by any Check.

 2. When installed in a local environment with a regular Python interpreter, it
 mocks the presence of a running Agent so checks can work in standalone mode,
 mostly useful for testing and development.

## Installation

Checks from [integrations-core](https://github.com/DataDog/integrations-core) already
use the toolkit in a transparent way when you run the tests with Tox but you can
install the toolkit locally and play with it:
```
pip install git+https://github.com/DataDog/datadog-agent-tk.git
```

## Développement

Create a dedicated virtualenv and follow the instructions in this paragraph
to work with the check.

Pour installer le check en mode dev:
```
pip install -e .[dev]
```

To build the wheel package:
```
python setup.py bdist_wheel
```

To run the tests, [install tox](http://tox.readthedocs.io/en/latest/install.html) and just run:
```
tox
```

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

