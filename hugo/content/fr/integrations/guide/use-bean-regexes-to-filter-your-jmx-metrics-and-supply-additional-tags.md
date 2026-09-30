---
aliases:
- /fr/integrations/faq/how-to-use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags
further_reading:
- link: /integrations/java/
  tag: Documentation
  text: Intégration de Java
- link: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
  tag: Documentation
  text: Afficher les données JMX dans jConsole et configurer votre jmx.yaml pour les
    recueillir

title: Utiliser les expressions régulières Bean pour filtrer vos métriques JMX et
  spécifier des tags supplémentaires
---

Datadog prend en charge les expressions régulières pour faire correspondre les noms et les noms de domaine JMX Mbean afin de configurer vos filtres `include` et `exclude`. Les expressions régulières doivent être conformes au [format d'expression régulière de Java][1]. Notez que ces filtres ont été ajoutés dans la version 5.5.0.

Les groupes de capture des expressions regex fournies peuvent être utilisés pour fournir des valeurs de tags supplémentaires pour vos métriques.

Cet article fournit un exemple d'utilisation de `bean_regex` à partir de [lʼintégration Java][2], et de référencement de ces groupes de capture pour définir des tags supplémentaires.

Supposons que vous ayez le nom Mbean suivant : `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`. Vous pouvez utiliser certaines informations en tant que tags une fois que lʼAgent a collecté la métrique. Par exemple, vous pouvez exporter une métrique avec les tags suivants :

* `env` : `dev`
* `region` : `eu-central-1`
* `method` : `GET`
* `status` : `200`

Les expressions régulières Bean peuvent être fournies sous la forme d'une seule expression régulière ou sous forme de liste. Dans ce dernier cas, seule la première entrée de la liste qui correspond sera prise en compte. Voici un exemple de fichier de configuration pour exporter vos métriques personnalisées avec quelques tags supplémentaires :

```yaml
init_config:
  is_jmx: true

instances:
  - host: "<JMX_ENDPOINT>"
    port: "<JMX_PORT>"

    conf:
      - include:
          domain: domain.example.com
          bean_regex:
            - "domain.example.com:name=my.metric.name.*(?:\\.env\\.)([a-z]+)(?:.*\\.region\\.)([a-z-]+[0-9])(?:.*\\.method\\.)([A-Z]+)(?:.*\\.status\\.)([0-9]+)(?:.*)"
          attribute:
            attribute1:
              metric_type: gauge
              alias: "my.jmx.metric"
          tags:
              env: $1
              region: $2
              method: $3
              status_code: $4
              optional: tag
```

Chaque groupe de capture est stocké dans une carte Java. Le premier groupe de capture commence à la position `0`. Après avoir déterminé le groupe de capture que vous souhaitez exporter en tant que tag, vous devez y faire référence dans la section `tags` de votre filtre `include` ou `exclude`, ainsi qu'au numéro du groupe (par exemple, la position à l'intérieur de la carte).

Pour l'exemple fourni à l'adresse `bean_regex`, les groupes de capture sont les suivants :

* `$0` : `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`
* `$1` : `dev`
* `$2` : `eu-central-1`
* `$3` : `GET`
* `$4` : `200`

Le [Metrics Explorer][3] vous permet dʼinterroger vos métriques et de les filtrer en fonction des tags que vous venez de créer.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[2]: /fr/integrations/java/
[3]: /fr/metrics/explorer/