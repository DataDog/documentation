---
title: OpenTracing Python
kind: documentation
description: 'Appliquez la norme OpenTracing au traceur de l''APM Python de Datadog.'
further_reading:
    - link: tracing/connect_logs_and_traces
      tag: Documentation
      text: Associer vos logs à vos traces
    - link: tracing/manual_instrumentation
      tag: Documentation
      text: Instrumenter vos applications manuellement pour créer des traces
    - link: tracing/visualization/
      tag: Documentation
      text: Explorer vos services, ressources et traces
---

## Configuration

La prise en charge d'OpenTracing est incluse dans le paquet `ddtrace`. Utilisez `pip` pour installer le paquet `opentracing` requis :

```sh
pip install ddtrace[opentracing]
```

## Utilisation

Pour initialiser un traceur, OpenTracing définit une méthode d'initialisation qui configure et instancie un nouveau traceur et remplace la référence `opentracing.tracer` globale :

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      'agent_hostname': 'localhost',
      'agent_port': 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span('<NOM_OPÉRATION>')
  span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  time.sleep(0.05)
  span.finish()

init_tracer('<NOM_SERVICE>')
my_operation()
```

Pour consulter des informations sur une configuration et une utilisation plus avancées, consultez [la documentation relative à l'API OpenTracing Python de Datadog][1] et le [référentiel OpenTracing Python][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#opentracing
[2]: https://github.com/opentracing/opentracing-python
