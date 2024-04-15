---

title: Mon bean correspond à mon intégration JMX, mais aucune donnée n'est collectée !
---

Vous ne parvenez pas à configurer votre intégration JMX ? Voici quelques articles utiles pour vous aider :

* [Dépannage de l'intégration JMX][1]
* [Afficher les données JMX dans jConsole et configurer votre jmx.yaml pour les recueillir][2]
* [Erreur jmx.yaml : section Include][3]
* [Recueillir des attributs JMX composites][4]
* [Exécuter des commandes JMX dans Windows][5]

Si vous avez tout configuré correctement en suivant les instructions dans les articles ci-dessus *et* que votre métrique apparaît dans le [fichier de log de l'Agent][6] (mais *pas* dans la [commande status][1]), alors le problème concerne probablement le `metric_type` que vous utilisez.

Voici la sortie du fichier `list_matching_attributes.log` :

```text
Matching: 0/350. Bean name: Hadoop:service=HBase,name=Master,sub=Server - Attribute name: tag.isActiveMaster  - Attribute type: java.lang.String
```

## Comment résoudre ce problème ?

Ouvrez le [fichier de log de votre Agent][6] et vérifiez la présence d'erreurs semblables à celle-ci :

```text
2016-12-05 03:08:33,261 | WARN | JMXAttribute | Unable to get metrics from Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster
java.lang.NumberFormatException: For input string: "false"
 [...]
```

Cela signifie que votre `Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster` renvoie des valeurs sous forme de chaînes.

Ouvrez votre fichier `jmx.yaml` et vérifiez que son contenu ressemble à l'extrait suivant :

```yaml
init_config:
instances:
  - name: hbase_master
    host: localhost
    port: xxx
    tags:
      application: hbase
      service: master
    conf:
      - include:
          bean: "Hadoop:service=HBase,name=Master,sub=Server"
          [...]
            tag.isActiveMaster:
              alias: jmx.hadoop.hbase.master.server.tag.isActiveMaster
              metric_type: java.lang.String
```

La valeur `java.lang.String` comme metric_type confirme le problème constaté dans les logs.

Pour résoudre ce problème, modifiez le metric_type associé et assurez-vous que votre fichier `jmx.yaml` comprend la configuration suivante (notez les modifications au niveau des quatre dernières lignes) :

```yaml
init_config:
instances:
  - name: hbase_master
    host: localhost
    port: xxx
    tags:
      application: hbase
      service: master
    conf:
      - include:
          bean: "Hadoop:service=HBase,name=Master,sub=Server"
          [...]
            tag.isActiveMaster:
              alias: jmx.hadoop.hbase.master.server.tag.isActiveMaster
              metric_type: gauge
              values:
                true: 1
                false: 0
              # Remarque : si vous utilisez l'Agent 6, les clés booléennes doivent être entourées de guillemets : {"true": 1, "false": 0, default: 0}
```

Jmxfetch saura ainsi qu'il s'agit d'une chaîne et utilisera cette règle pour la transformer en métrique numérique.

Contactez l'[assistance Datadog][7] si vous avez encore besoin d'aide.

[1]: /fr/integrations/faq/troubleshooting-jmx-integrations/
[2]: /fr/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[3]: /fr/integrations/faq/jmx-yaml-error-include-section/
[4]: /fr/integrations/guide/collecting-composite-type-jmx-attributes/
[5]: /fr/integrations/faq/how-to-run-jmx-commands-in-windows/
[6]: /fr/agent/guide/agent-log-files/
[7]: /fr/help/
