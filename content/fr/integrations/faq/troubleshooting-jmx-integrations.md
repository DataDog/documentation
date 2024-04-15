---
further_reading:
- link: /integrations/java/
  tag: Documentation
  text: Intégration de Java

title: Dépannage pour les intégrations JMX
---

Pour vérifier que vous avez bien accès à JMX, effectuez un test à lʼaide de JConsole ou équivalent, si possible. Si vous nʼêtes pas en mesure de vous connecter à lʼaide de JConsole, [cet article][1] peut vous venir en aide. Aussi, si les métriques indiquées dans votre YAML ne correspondent pas exactement à celles indiquées dans JConsole, vous devrez corriger ce problème.

<div class="alert alert-warning">
Pour toutes les versions de <strong>Agent v5.32.8 ou ultérieur</strong>, le JAR <code>jmxterm</code> nʼest pas fourni avec lʼagent. Pour télécharger et utiliser <code>jmxterm</code>, consultez le <a href="https://github.com/jiaqi/jmxterm">projet upstream</a>. Modifiez <code>/opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar</code> dans les exemples ci-dessous en le remplaçant par le chemin JAR <code>jmxterm</code>que vous avez téléchargé depuis le projet upstream.
</div>

Si vous êtes en mesure de vous connecter à lʼaide de JConsole, exécutez la commande suivante :

```text
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <UTILISATEUR> -p <MOT_DE_PASSE>
```

Si vous êtes en mesure de vous connecter à lʼaide de la commande ci-dessus, exécutez `beans` et envoyez une copie des résultats à [lʼéquipe dʼassistance de Datadog][2] avec les informations suivantes :

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

* [Flare de lʼAgent][1],qui comprend :
  * Résultat de la [commande status][2].
  * Contenu de `/var/log/datadog/agent.log`
  * Contenu de `/var/log/datadog/jmxfetch.log`
  * Une copie de lʼintégration YAML.
* Résultat de : `ps aux | grep jmxfetch`
* Résultat de : `sudo -u dd-agent datadog-agent jmx list everything -l debug` (lʼajout de `--flare` permet dʼinclure le résultat dans le flare pour la version 6.26.x/7.26.x)

[1]: /fr/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[2]: /fr/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

* [Flare de lʼAgent][1],qui comprend :
  * Résultat de la [commande info][2].
  * Contenu de `/var/log/datadog/jmxfetch.log`
  * Une copie de lʼintégration integration.
* Résultat de : `ps aux | grep jmxfetch`
* Résultat de : `sudo /etc/init.d/datadog-agent jmx list_everything`

[1]: /fr/agent/troubleshooting/send_a_flare/?tab=agentv5
[2]: /fr/agent/guide/agent-commands/?tab=agentv5#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous êtes en mesure de consulter des métriques (comme `jvm.heap_memory` ou `jvm.non_heap_memory`, entre autres), cela signifie que JMXFetch fonctionne correctement. Si vous ciblez une autre application et si vous ne voyez pas les métriques associées, cela veut certainement dire que votre YAML est mal configuré.

## Dépannage de lʼAgent

{{< tabs >}}
{{% tab "Agent >= v6.2" %}}

Ces commandes ont été introduites avec la version v6.2.0 :

| Commande                                                | Description                                                                                                                                                             |
|:-------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo -u dd-agent datadog-agent jmx list matching`     | Énumère les attributs qui correspondent au moins à l'une de vos configurations d'instance.                                                                                                |
| `sudo -u dd-agent datadog-agent jmx list limited`      | Énumère les attributs qui correspondent à l'une de vos configurations d'instance, mais qui ne sont pas recueillis afin de ne pas dépasser le nombre maximum de métriques pouvant être recueillies. |
| `sudo -u dd-agent datadog-agent jmx list collected`    | Indiquez des attributs qui sont vraiment recueillis par la configuration actuelle de vos instances.                                                                                    |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | Énumère les attributs qui ne correspondent à aucune de vos configurations d'instance.                                                                                                   |
| `sudo -u dd-agent datadog-agent jmx list everything`   | Énumère l'ensemble des attributs disponibles dont le type est pris en charge par JMXFetch.                                                                                                  |
| `sudo -u dd-agent datadog-agent jmx collect`           | Démarrer la collecte de métriques en fonction de votre configuration actuelle et les afficher dans la console.                                                                    |

**Remarques** :

- Par défaut, ces commandes sʼexécutent pour tous les checks JMX configurés. Pour restreindre lʼutilisation des commandes à certains checks, utilisez le flag `--checks`, par exemple :

  ```shell
  sudo -u dd-agent datadog-agent jmx list collected --checks tomcat
  ```

- Pour lʼAgent v6.26.+/v7.26+, lʼajout de `--flare` writes the output of the above commands under `/var/log/datadog/jmxinfo/`, inclus dans le flare.

  ```shell
  sudo -u dd-agent datadog-agent jmx list everything -l debug --flare
  ```

{{% /tab %}}
{{% tab "Agent v6.0 et v6.1" %}}

LʼAgent 6 transmet JMXFetch et prend en charge lʼensemble de ses fonctionnalités, à lʼexception de celles qui sont indiquées ci-dessous.

Lʼinterface de lʼAgent ne dispose pas des toutes les fonctionnalités nécessaires à JMXFetch. Vous devrez donc peut-être exécuter certaines commandes manuellement pour débuguer la liste des éléments recueillis, les JVM, etc. Un appel manuel standard prendra la forme suivante :

```shell
/usr/bin/java -Xmx200m -Xms50m -classpath /usr/lib/jvm/java-8-oracle/lib/tools.jar:/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch-0.18.2-jar-with-dependencies.jar org.datadog.jmxfetch.App --check <CHECK_LIST> --conf_directory /etc/datadog-agent/conf.d --log_level INFO --log_location /var/log/datadog/jmxfetch.log --reporter console <COMMAND>
```

où `<COMMAND>` est un des éléments suivants :

* `list_everything`
* `list_collected_attributes`
* `list_matching_attributes`
* `list_not_matching_attributes`
* `list_limited_attributes`
* `list_jvms`

et `<CHECK_LIST>` correspond à une liste de configurations `yaml` valides dans `/etc/datadog-agent/conf.d/`. Par exemple :

* `cassandra.d/conf.yaml`
* `kafka.d/conf.yaml`
* `jmx.d/conf.yaml`

Exemple :

```text
/usr/bin/java -Xmx200m -Xms50m -classpath /usr/lib/jvm/java-8-oracle/lib/tools.jar:/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch-0.18.2-jar-with-dependencies.jar org.datadog.jmxfetch.App --check cassandra.d/conf.yaml jmx.d/conf.yaml --conf_directory /etc/datadog-agent/conf.d --log_level INFO --log_location /var/log/datadog/jmxfetch.log --reporter console list_everything
```

**Remarques** :

- Lʼemplacement de lʼélément tools.jar de JRE (`/usr/lib/jvm/java-8-oracle/lib/tools.jar` dans lʼexemple) peut se trouver ailleurs dans votre système. La commande `sudo find / -type f -name 'tools.jar'` devrait vous permettre de le retrouver.
- Il est recommandé dʼindiquer des paramètres alternatifs pour le tas JVM `-Xmx`, `-Xms`. Les valeurs utilisées dans lʼexemple correspondent aux valeurs par défaut de JMXFetch.

{{% /tab %}}
{{% tab "Agent v5" %}}

| Commande                                                           | Description                                                                                                                                                             |
|:------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo /etc/init.d/datadog-agent jmx list_matching_attributes`     | Énumérer les attributs qui correspondent à au moins l'une de vos configurations d'instance.                                                                                                |
| `sudo /etc/init.d/datadog-agent jmx list_limited_attributes`      | Énumère les attributs qui correspondent à l'une de vos configurations d'instance, mais qui ne sont pas recueillis afin de ne pas dépasser le nombre maximum de métriques pouvant être recueillies. |
| `sudo /etc/init.d/datadog-agent jmx list_collected_attributes`    | Énumère les attributs qui sont véritablement recueillis par vos configurations d'instance actuelles.                                                                                    |
| `sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes` | Énumère les attributs qui ne correspondent à aucune de vos configurations d'instance.                                                                                                   |
| `sudo /etc/init.d/datadog-agent jmx list_everything`              | Énumère l'ensemble des attributs disponibles dont le type est pris en charge par JMXFetch.                                                                                                  |
| `sudo /etc/init.d/datadog-agent jmx collect`                      | Démarrer la collecte de métriques en fonction de votre configuration actuelle et les afficher dans la console.                                                                    |

{{% /tab %}}
{{% tab "Agent Docker" %}}

Pour vérifier qu'Autodiscovery charge les checks basés sur JMX :

```shell
$ docker exec -it <AGENT_CONTAINER_NAME> agent configcheck
```

Pour consulter lʼétat des checks basés sur JMX depuis lʼAgent :

```shell
$ docker exec -it <AGENT_CONTAINER_NAME> agent status
```

{{% /tab %}}
{{< /tabs >}}

## FAQ

### Limite de 350 métriques

Datadog permet lʼutilisation dʼun maximum de 350 métriques.
Il est recommandé de se limiter pour ne pas atteindre ce seuil, en affinant les métriques recueillies à lʼaide de filtres. Toutefois, si vous avez besoin de plus de 350 métriques, vous pouvez augmenter cette limite en modifiant un paramètre dans votre fichier de configuration JMX.

[Veuillez contacter lʼéquipe dʼassistance de Datadog si vous souhaitez augmenter cette limite.][2]

### Chemin Java

Aucune JVM nʼest fournie lors de lʼinstallation par défaut de lʼAgent. Celle qui est installée sur votre système est utilisée. Vous devez donc vous assurer que le chemin de lʼutilisateur qui exécute lʼAgent inclut le répertoire principal de Java.

**Remarques** :

- Lʼimage `gcr.io/datadoghq/agent:latest-jmx` du Docker comprend une JVM, dont lʼAgent a besoin pour exécuter jmxfetch. Vous pouvez aussi indiquer le chemin de la JVM dans le fichier de configuration de lʼintégration avec le paramètre `java_bin_path`.
- Un seul chemin Java valide doit être indiqué pour JMXFetch.

### Métriques JVM

La bibliothèque Java APM de Datadog est en mesure de recueillir des métriques JVM sans lʼintégration JMX. Consultez la section [Métriques runtime][3] pour en savoir plus.

### Surveillance des applications JBoss ou WildFly

Les instructions suivantes fonctionnent sur la version 5.6.0+ de l'Agent.

Les applications JBoss/WildFly exposent JMX avec un protocole spécifique (JMX à distance) qui n'est pas par défaut groupé avec JMXFetch. Pour que JMXFetch se connecte à ces applications, suivez les étapes suivantes :

* Naviguez jusqu'au fichier `jboss-cli-client.jar` sur votre serveur JBoss/WildFly (par défaut, son chemin est  `$JBOSS_HOME/bin/client/jboss-cli-client.jar`).
* Si JMXFetch s'exécute sur un host autre que l'application JBoss/WildFly, copiez `jboss-cli-client.jar` à un emplacement du host sur lequel JMXFetch s'exécute.
* Ajoutez le chemin du fichier jar dans la section `init_config` de votre configuration :

```yaml
  # Datadog Agent >= 5.6.0

  init_config:
    custom_jar_paths:
      - /chemin/vers/client-cli-jboss.jar
```

* Indiquez une URL personnalisée à laquelle JMXFetch doit se connecter dans la section `instances` de votre configuration :

```yaml
  # Agent Datadog >= 5.6.0

  # jmx_url peut être différent en fonction de la version de JBoss/WildFly que vous utilisez
  # et de la façon dont vous avez configuré la JMX sur votre serveur
  # Consultez la documentation correspondante de JBoss/WildFly pour en savoir plus
  instances:
    - jmx_url: "service:jmx:remote://localhost:4447"
      name: jboss-application  # Obligatoire, mais nʼimporte quelle valeur peut être utilisée,
                               # sert à appliquer un tag aux métriques extraites de cette instance
 ```

* [Redémarrez l'Agent][4].

**Remarque** : si un message dʼerreur similaire à `Unable to instantiate or initialize instance <instance_name> for an unknown reason.Parameter 'name' may not be null` sʼaffiche, il se peut que vous deviez définir un utilisateur wildfly avec `$WILDFLY_HOME/bin/add-user.sh -a -u <user> -p <password>` et indiquer une valeur pour `user` et `password` dans la section `instances` de votre configuration :
```yaml
instances:
  - jmx_url: <jmx_url>
    name: <instance_name>
    user: <username>
    password: <password>
```

### Surveillance de Tomcat via lʼactivation de lʼécouteur de cycle de vie distant JMX

Les instructions suivantes fonctionnent sur la version 5.6.0+ de l'Agent.

Si vous avez activé lʼécouteur de cycle de vie distant JMX lors de votre utilisation de Tomcat (consultez la [documentation de Tomcat][5] pour en savoir plus), JMXFetch a besoin dʼune configuration supplémentaire pour pouvoir se connecter à votre application Tomcat.

* Naviguez jusqu'au fichier `catalina-jmx-remote.jar` sur votre serveur Tomcat (par défaut, son chemin est `$CATALINA_HOME/lib`).
* Si JMXFetch s'exécute sur un host autre que l'application Tomcat, copiez `catalina-jmx-remote.jar` à un emplacement du host sur lequel JMXFetch s'exécute.
* Ajoutez le chemin du fichier jar dans la section `init_config` de votre configuration :

```yaml
# Agent Datadog >= 5.6.0

init_config:
  custom_jar_paths:
    - /chemin/vers/catalina-jmx-remote.jar
```

* Indiquez une URL personnalisée à laquelle JMXFetch doit se connecter dans la section `instances` de votre configuration :

```yaml
# Agent Datadog >= 5.6.0

# Le jmx_url peut varier en fonction de votre configuration de JMX sur votre serveur Tomcat.
instances:
  - jmx_url: "service:jmx:rmi://:10002/jndi/rmi://:10001/jmxrmi"
    name: tomcat-application  # Requis, mais peut être défini sur n'importe quelle valeur arbitraire,
                              # est utilisé pour taguer les métriques récupérées à partir de cette instance
```

* [Redémarrez l'Agent][4].

### Dépannage du SSL

Une fois que lʼAPI JMX est activée et que le check de votre Agent envoie correctement des métriques à Datadog, vous pouvez sécuriser la connexion à distance via un socket SSL.

**Remarque** : vous ne pouvez pas sécuriser JMX via SSL sans lʼaide des fichiers dʼauthentification distants de lʼutilisateur ou du mot de passe de JMX. Si vous exécutez votre application par le biais dʼautorisations au niveau du système, ajoutez ces fichiers et exécutez-les au démarrage.

Cet exemple illustre la configuration de Datadog pour [lʼintégration de Tomcat][6].

* Établissez un certificat et une clé à appliquer au [keystore de votre app Java][7].
* Mettez à jour votre fichier Tomcat Datadog `conf.yaml`, situé dans `conf.d/tomcat.d` :

```yaml
instances:
  - host: localhost
    port: 9000
    user: tomcat
    password: tomcat
    name: tomcat_webapp
    trust_store_path: <KEYSTORE_PATH>
    trust_store_password: <KEY_PASSWORD>
```

* [Redémarrez l'Agent][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html
[2]: /fr/help/
[3]: /fr/tracing/metrics/runtime_metrics/java/
[4]: /fr/agent/guide/agent-commands/#restart-the-agent
[5]: https://tomcat.apache.org/tomcat-7.0-doc/config/listeners.html#JMX_Remote_Lifecycle_Listener_-_org.apache.catalina.mbeans.JmxRemoteLifecycleListener
[6]: https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html#SSL_and_Tomcat
[7]: http://docs.oracle.com/javase/1.5.0/docs/guide/management/agent.html
