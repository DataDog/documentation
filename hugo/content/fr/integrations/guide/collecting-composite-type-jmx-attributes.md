---
aliases:
- /fr/integrations/faq/collecting-composite-type-jmx-attributes/

title: Recueillir des attributs JMX composites
---

## JMXFetch

Dans l'Agent, les fichiers yaml des intégrations suivantes sont tous lus par JMXFetch :

* [Active MQ][1]
* [Cassandra][2]
* [Java][3]
* [Solr][4]
* [Tomcat][5]

## Attributs JMXFetch

JMXFetch peut recueillir deux types d'attributs JMX (simples et composites).

### Attributs simples

Il s'agit des attributs `integer`, `float`, `double`, `long`, `boolean`, etc.

**Remarque** : pour les valeurs booléennes, 1 correspond à « true » et 0 correspond à « false ». [Consultez la liste des types pris en charge][6].

Vous pouvez utiliser les commandes `list` pour obtenir un aperçu de ce que votre intégration JMX actuelle recueille. Voici un extrait de sortie pour un attribut simple :

```text
Matching: x/350. Bean name: java.lang - Attribute name: attribute_1 - Attribute type: java.lang.Integer
```

Cela correspond à la configuration suivante :

```yaml
- include:
     domain: java.lang
     attribute:
       attribute_1:
         metric_type: counter
         alias: java.lang.Integer
```

JMXFetch extrait directement la valeur de l'attribut et l'utilise comme valeur de métrique. Consultez la [documentation relative à JMX][3] pour savoir comment la recueillir.

### Attributs composites

Ces attributs peuvent être vus comme un tableau, une table de hachage ou encore un objet composé d'attributs « simples ».

```text
Matching: x/350. Bean name: java.lang - Attribute name: HeapMemoryUsage - Attribute type: javax.management.openmbean.CompositeData
```

Dans ce cas, vous devez fournir plus de détails à JMXFetch pour indiquer comment utiliser cet attribut « composite » en vue de créer une valeur numérique pour une métrique.

Pour ce faire, utilisez un `.` pour spécifier le composant :

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

### Comment afficher le niveau suivant de ces attributs composites ?

Le meilleur moyen d'afficher le niveau suivant consiste à utiliser JMXterm (voir ci-dessous).

```text
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <UTILISATEUR> -p <MOT_DE_PASSE>
```

Remarque : pour les versions **5.32.8 et ultérieures de l'Agent**, le JAR `jmxterm` n'est pas intégré à l'Agent. Pour télécharger et utiliser `jmxterm`, référez-vous au [projet upstream][7].

Utilisez ensuite la commande get pour extraire une métrique précise.

[1]: /fr/integrations/activemq/
[2]: /fr/integrations/cassandra/
[3]: /fr/integrations/java/
[4]: /fr/integrations/solr/
[5]: /fr/integrations/tomcat/
[6]: https://github.com/DataDog/jmxfetch/blob/master/src/main/java/org/datadog/jmxfetch/Instance.java#L23-L27
[7]: https://github.com/jiaqi/jmxterm