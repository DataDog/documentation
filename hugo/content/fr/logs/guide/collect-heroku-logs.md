---

title: Recueillir des logs Heroku
---

**Cette intégration de logs est actuellement disponible en version bêta publique**

Heroku propose trois types de logs :

* `App Logs` : logs issus de l'application exécutée sur la plateforme.
* `System Logs` : messages concernant les actions prises par l'infrastructure de la plateforme Heroku au nom de votre application.
* `API Logs` : actions d'administration effectuées par vous et par les autres développeurs travaillant sur votre application

Les [drains HTTP/S de Heroku][1] mettent en mémoire tampon les messages de log et envoient ces messages par lots vers un endpoint HTTPS via une requête POST.  
Le corps POST comprend les messages au format Syslog, tramés selon la méthode de comptage d'octets du protocole TCP Syslog.
L'API HTTP Datadog implémente et interprète le standard Logplex défini par l'en-tête de contenu `application/logplex-1`.

Pour envoyer tous ces logs à Datadog :

* Connectez-vous à votre projet Heroku.
* Configurez le drain HTTPS avec la commande suivante :

```text
heroku drains:add 'https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs/?dd-api-key=<CLÉ_API_DD>&ddsource=heroku&env=<ENVIRONNEMENT>&service=<SERVICE>&host=<HOST>' -a <NOM_APPLICATION>
```

* Remplacez `<CLÉ_API_DD>` par votre [clé d'API Datadog][2].
* Remplacez `<ENVIRONNEMENT>` par l'[environnement][3] de votre application.
* Remplacez `<NOM_APPLICATION>` et `<SERVICE>`par le nom de votre application.
* Remplacez `<HOST>` par le hostname souhaité. **Remarque** : comme indiqué dans la [section Hostname][4], les métriques et les traces appliquent le nom du dyno comme hostname par défaut. Il n'est pas encore possible de définir dynamiquement le nom du dyno en tant que hostname des logs. Utilisez les tags `dyno` et `dynotype` pour le moment afin de corréler des métriques, des traces et des logs.

### Attributs personnalisés

Ajoutez des attributs personnalisés aux logs depuis votre application en remplaçant l'URL dans le drain comme suit :

```text
https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs/?dd-api-key=<CLÉ_API_DD>&ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALEUR>
```

[1]: https://devcenter.heroku.com/articles/log-drains#https-drains
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /fr/getting_started/tagging/#introduction
[4]: /fr/agent/basic_agent_usage/heroku/#hostname