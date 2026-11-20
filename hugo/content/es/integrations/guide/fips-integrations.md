---
algolia:
  rank: 80
  tags:
  - fips
  - conformidad
  - fedramp
  - govcloud
further_reading:
- link: /agent/configuration/fips-compliance
  tag: Documentación
  text: Conformidad de Datadog con los estándares FIPS
title: Integraciones del Agent verificadas por FIPS
---

## Información general

Como parte del esfuerzo de FedRAMP, se ha verificado la conformidad de varias integraciones con **FIPS 140-2**. Las integraciones que no se mencionan a continuación pueden funcionar de conformidad con FIPS 140-2, pero no se han probado internamente.

Esta guía está dirigida a los clientes que requieren servicios conformes con FIPS y utilizan las integraciones de Datadog.

## Activación del modo de FIPS para una integración compatible

Para garantizar el cumplimiento, asegúrate de utilizar un endpoint HTTPS siempre que sea posible y sigue las instrucciones específicas de la integración que se indican a continuación.

Las integraciones marcadas como predefinidas ("OOTB") no requieren ninguna configuración adicional.

| Integración             | Configuración                                                                                                                                         |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon MSK              | OOTB                                                                                                                                                  |
| Apache                  | OOTB                                                                                                                                                  |
| ArgoCD                  | OOTB                                                                                                                                                  |
| Azure Active Directory  | OOTB                                                                                                                                                  |
| CoreDNS                 | OOTB                                                                                                                                                  |
| Elasticsearch           | OOTB                                                                                                                                                  |
| Envoy                   | OOTB                                                                                                                                                  |
| Haproxy                 | OOTB                                                                                                                                                  |
| Istio                   | OOTB                                                                                                                                                  |
| Kafka                   | Para activar TLS asegúrate de seguir la guía del [modo JMXFetch FIPS-140][1].                                                                                                         |
| MongoDB                 | La opción `tls` debe establecerse en `true` en la configuración de la integración.                                                                                  |
| MySQL                   | La opción `ssl` debe establecerse en la configuración de la integración.                                                                                          |
| Nginx                   | OOTB                                                                                                                                                  |
| Php-fpm                 | Aunque la integración de `php_fpm` utiliza el módulo aleatorio, ese uso se limita a aleatorizar el retraso de reintento.                                  |
| Postfix                 | OOTB                                                                                                                                                  |
| RabbitMQ                | OOTB                                                                                                                                                  |
| Redis                   | La opción `ssl` debe activarse en la configuración de la integración.                                                                                      |
| SSH                     | OOTB                                                                                                                                                  |
| TLS                     | OOTB                                                                                                                                                  |
| Tomcat                  | Para activar TLS asegúrate de seguir la guía del [modo JMXFetch FIPS-140][1].                                                                                                         |
| Vault                   | OOTB                                                                                                                                                  |
| vSphere                 | Tanto `ssl_verify` como `rest_api_options > tls_verify` deben establecerse en `true` si se utiliza la API REST de vSphere para obtener etiquetas (`collect_tags: true`).        |
| Windows Service         | OOTB                                                                                                                                                  |
| Zookeeper               | La opción `use_tls` debe activarse en la configuración de la integración.                                                                                  |


<div class="alert alert-danger">
Se desaconseja configurar la <strong>integración de IIS (Internet Information Services)<strong> para consultar sistemas remotos. Depende de una API de Windows para la criptografía, que Datadog no puede controlar.
</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/guide/jmxfetch-fips