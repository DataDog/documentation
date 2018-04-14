---
title: Puis-je utiliser un proxy pour connecter mes serveurs à Datadog?
kind: faq
---

Si votre configuration réseau restreint le trafic sortant, [proxy tout le trafic d'Agent][1] via un ou plusieurs host qui ont des stratégies sortantes plus permissives.

Quelques options sont disponibles pour envoyer du trafic vers Datadog via SSL/TLS pour des hosts qui ne sont pas directement connectés à Internet.

* [Utilisation de l'agent comme proxy][2] (pour **jusqu'à 16 agents** par proxy)
* [Utilisation d'un proxy Web][3] (par exemple, Squid, Microsoft Web Proxy) déjà déployé sur votre réseau
* [Using HAProxy][4] (High volume solution. A single HAProxy instance can accommodate traffic from ~1000 Datadog Agents)

Voici un scénario courant avec un VPC Amazon:
{{< img src="account_management/faq/Datadog_Amazon_VPC.jpg" alt="Datadog Amazon VPC" responsive="true" popup="true">}}

In the above, the six EC2 instances in the VPC aren't Internet facing, however, they have communication to a single instance that is and are using it to route local traffic to Datadog via 443 TCP.
{{< img src="account_management/faq/Datadog_Physical.jpg" alt="Datadog Physical" responsive="true" popup="true">}}

In the above, the six physical servers in the data center aren't Internet facing, however, they have communication to a single instance acting as a proxy that is open and may be used to route local traffic (one way) from the hosts out to Datadog via 443 TCP/HTTPS for external communication.

[1]: /agent/proxy
[2]: /agent/proxy/#using-the-agent-as-a-proxy
[3]: /agent/proxy/#using-a-web-proxy-as-proxy
[4]: /agent/proxy/#using-haproxy-as-a-proxy