---
title: Comment puis-je ajouter un hostname aux titres d'événements et aux messages envoyés par mes check d'Agent custom?
kind: faq
---

Lorsque vous envoyez des événements à votre compte Datadog à partir d'un [check d'Agent custom][1], ils reçoivent par défaut un tag d'host . Mais il peut parfois être utile d'inclure le nom d'host dans le titre ou le contenu de l'événement. Cela peut être réalisé si, dans le code de votre check custom, vous importez "get_hostname" à partir de "util", puis que vous indiquez "self.agentConfig" comme argument de "get_hostname", comme dans cet exemple:

```python

import time
from checks import AgentCheck
from utils import get_hostname

hostname = get_hostname(self.agentConfig)

class TestCheck(AgentCheck):
    def check(self, instance):
        hostname = get_hostname(self.agentConfig)
        self.event({
            'timestamp': int(time.time()),
            'event_type': 'test',
            'msg_title': 'a test event occurred on host %s' % (hostname,),
            'msg_text': 'test message content for host %s' % (hostname,),
            'aggregation_key': "test1234"
        })
```

Un tel check d'agent créerait l'événement suivant dans votre flux d'événements:
{{< img src="graphing/faq/event_example.png" alt="event_example" responsive="true" popup="true">}}

Dans cet exemple, le tag d'host aurait été appliquée même sans référence à get_hostname (self.agentConfig), mais cette référence a ajouté le nom d'host au titre et au contenu de l'événement.

[1]: /agent/agent_checks
