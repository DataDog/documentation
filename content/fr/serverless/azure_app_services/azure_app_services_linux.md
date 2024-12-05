---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Surveiller vos applications Web Linux sur Azure App Service avec Datadog
title: Azure App Service - Code Linux
---
## Présentation

Cette méthode d'instrumentation permet d'ajouter les fonctionnalités de surveillance suivantes aux charges de travail Azure App Service sous Linux :

- Tracing APM entièrement distribué via l'instrumentation automatique
- Vues service et trace personnalisées affichant les métriques et métadonnées Azure App Service pertinentes
- Prise en charge de l'instrumentation APM manuelle pour personnaliser les spans
- Injection des `Trace_ID` dans les logs d'application
- Prise en charge de l'envoi de métriques custom à l'aide de [DogStatsD][1]

Cette solution tire parti de la commande de lancement et des paramètres d'application Azure App Service pour Linux afin d'instrumenter l'application et de gérer sa configuration. Java, Node, .NET, PHP et Python sont pris en charge.

### Implémentation
#### Définir les paramètres d'application
Pour instrumenter votre application, commencez par ajouter les paires key/value suivantes sous **Application Settings** dans vos paramètres de configuration Azure.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Configuration d'Azure App Service : les paramètres d'application dans la section Configuration des paramètres au sein de l'interface Azure. Trois paramètres sont visibles : DD_API_KEY, DD_SERVICE et DD_START_APP." style="width:80%;" >}}

- `DD_API_KEY` correspond à votre clé d'API Datadog.
- `DD_CUSTOM_METRICS_ENABLED` (facultatif) permet d'activer les [métriques custom](#metriques-custom).
- `DD_SITE` correspond au [paramètre][2] du site Datadog. Votre site est {{< region-param key="dd_site" code="true" >}}. Valeur par défaut : `datadoghq.com`.
- `DD_SERVICE` est le nom du service utilisé pour ce programme. Par défaut, sa valeur correspond à la valeur du champ name dans `package.json`.
- `DD_START_APP` est la commande utilisée pour lancer votre application. Par exemple, `node ./bin/www` (non requis pour les applications exécutées dans Tomcat).

### Identifier votre commande de lancement

Les applications web Azure App Service pour Linux créées à l'aide de l'option de déploiement de code sur des runtimes intégrés dépendent d'une commande de lancement qui varie d'un langage à l'autre. Les valeurs par défaut sont indiquées dans la [documentation Azure][7]. Vous trouverez des exemples ci-dessous.

Définissez ces valeurs dans la variable d'environnement `DD_START_APP`. Les exemples ci-dessous sont donnés pour une application nommée `datadog-demo`, lorsque cela s'avère pertinent.

| Runtime   | Exemple de valeur pour `DD_START_APP`                                                               | Description                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | Exécute le [fichier de configuration Node PM2][12] ou votre fichier de script.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Exécute un fichier `.dll` qui utilise le nom de votre application Web par défaut. <br /><br /> **Remarque** : le nom de fichier `.dll` dans la commande doit correspondre au nom de fichier de votre fichier `.dll`. Dans certains cas, ce nom peut ne pas correspondre à votre application Web.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copie le script vers l'emplacement adéquat et lance l'application.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | [Script de lancement][13] personnalisé. Cet exemple indique une commande Gunicorn pour lancer une application Django.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | La commande de lancement de votre application. Non requise pour les applications exécutées dans Tomcat.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**Remarque :** l'application redémarre lorsque de nouveaux paramètres sont enregistrés.

#### Définir les paramètres généraux

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Accédez à **General settings** et ajoutez ce qui suit dans le champ **Startup Command** :

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.7.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Configuration d'Azure App Service : les paramètres du stack, sous la section Configuration des paramètres au sein de l'interface Azure. Sous les champs du stack, de la version majeure et de la version mineure se trouve un champ Startup Command qui affiche la commande curl ci-dessus." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Téléchargez le fichier [`datadog_wrapper`][8] à partir des versions publiées et importez-le dans votre application avec la commande Azure CLI :

```
  az webapp deploy --resource-group <nom-groupe> --name <nom-application> --src-path <chemin-vers-wrapper-datadog> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}

### Visualiser les traces

Lorsque de nouveaux paramètres d'application sont enregistrés, Azure redémarre l'application. Toutefois, si une commande de lancement est ajoutée et enregistrée, un redémarrage manuel peut être nécessaire.

Après le redémarrage de l'application, vous pouvez consulter les traces en recherchant le nom du service (`DD_SERVICE`) sur la [page Service de la solution APM][4] de Datadog.

### Métriques custom

Pour activer des métriques custom pour votre application avec DogStatsD, ajoutez le paramètre `DD_CUSTOM_METRICS_ENABLED` et définissez-le sur `true` dans vos paramètres d'application.

Pour configurer l'envoi de métriques par votre application, suivez les étapes indiquées pour votre runtime.

- [Java][9]
- [Node][5]
- [.NET][6]
- [PHP][10]
- [Python][11]

## Dépannage

Si vous ne recevez pas les traces ou les métriques custom prévues, activez l'option **App Service logs** pour recevoir les logs de debugging.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Configuration d'Azure App Service : option App Service logs dans la section Monitoring des paramètres au sein de l'interface Azure. L'option Application logging est définie sur File System." style="width:100%;" >}}

Partagez le contenu du **Log stream** avec l'[assistance Datadog][14].
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/dogstatsd
[2]: /fr/getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /fr/tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /fr/developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
[9]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=hostagent&code-lang=java
[10]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=hostagent&code-lang=php
[11]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=hostagent&code-lang=python
[14]: /fr/help