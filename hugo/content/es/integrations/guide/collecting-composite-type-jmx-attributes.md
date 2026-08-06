---
aliases:
- /es/integrations/faq/collecting-composite-type-jmx-attributes/
title: Recopilación de atributos JMX de tipo compuesto
---

## JMXFetch

En el Agent, JMXFetch lee todos los archivos yaml de las siguientes integraciones:

* [Active MQ][1]
* [Cassandra][2]
* [Java][3]
* [Solr][4]
* [Tomcat][5]

## Atributos JMXFetch

Existen dos tipos de atributos JMX que JMXFetch puede recopilar (simples y compuestos).

### Atributos simples

Se trata de `integer`, `float`, `double`, `long`, `boolean` etc...

**Nota**: Los valores booleanos de true dan como resultado 1 y false en 0. [Consulta la lista de tipos compatibles][6]

Puedes utilizar los comandos `list` para hacerte una idea de lo que recopila tu integración JMX actual. El siguiente es un fragmento de ese resultado que muestra un atributo simple:

```text
Matching: x/350. Bean name: java.lang - Attribute name: attribute_1 - Attribute type: java.lang.Integer
```

Esto te proporcionaría la siguiente configuración:

```yaml
- include:
     domain: java.lang
     attribute:
       attribute_1:
         metric_type: counter
         alias: java.lang.Integer
```

JMXFetch extrae directamente el valor del atributo y lo utiliza como valor de la métrica. Para saber cómo recopilarlo, consulta [la documentación de JMX][3].

### Atributos compuestos

Pueden verse como una matriz, un hashmap o un objeto compuesto de atributos "simples".

```text
Matching: x/350. Bean name: java.lang - Attribute name: HeapMemoryUsage - Attribute type: javax.management.openmbean.CompositeData
```

En este caso, es necesario añadir más información a JMXFetch sobre cómo utilizar este atributo "compuesto" para crear un valor numérico para una métrica.

Para ello, utiliza `.` para especificar el componente:

```yaml
- include:
    domain: java.lang
    type: Memory
    attribute:
      HeapMemoryUsage.used:
        alias: jvm.heap_memory
        metric_type: gauge
      HeapMemoryUsage.committed:
        alias: jvm.heap_memory_committed
        metric_type: gauge

      # (...)
```

### ¿Cómo puedo ver el siguiente nivel de estos atributos compuestos?

La mejor forma de conseguirlo sería utilizando JMXterm (consulta más abajo).

```text
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <USER> -p <PASSWORD>
```

Nota: Para todas las versiones del **Agent v5.32.8 o posteriores**, el JAR `jmxterm` no se envía con el Agent. Para descargar y utilizar `jmxterm`, consulta el [proyecto anterior][7].

A continuación, utiliza el comando get para extraer una métrica específica.

[1]: /es/integrations/activemq/
[2]: /es/integrations/cassandra/
[3]: /es/integrations/java/
[4]: /es/integrations/solr/
[5]: /es/integrations/tomcat/
[6]: https://github.com/DataDog/jmxfetch/blob/master/src/main/java/org/datadog/jmxfetch/Instance.java#L23-L27
[7]: https://github.com/jiaqi/jmxterm