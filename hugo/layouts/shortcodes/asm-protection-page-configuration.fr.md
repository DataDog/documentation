Les requêtes bloquées incluent du contenu JSON ou HTML. Si l'[en-tête HTTP `Accept`][103] pointe vers HTML, par exemple `text/html`, le contenu HTML est utilisé. Dans le cas contraire, le contenu JSON est utilisé.

Les deux ensembles de contenu sont intégrés au package de la bibliothèque du traceur Datadog et chargés localement. Consultez des exemples de template pour [HTML][101] et [JSON][102] dans le code source du traceur Java de Datadog sur GitHub.

Le contenu HTML et JSON peut être modifié à l'aide des variables d'environnement `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML` et `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON` au sein du fichier de déploiement de votre application.

Exemple :

```
DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML=<chemin_vers_fichier.html>
```


Si vous le souhaitez, vous pouvez également utiliser l'entrée de configuration.

Pour Java, ajoutez ce qui suit :

```java
dd.appsec.http.blocked.template.html = '<chemin_vers_fichier.html>'
dd.appsec.http.blocked.template.json = '<chemin_vers_fichier.json>'
```

Pour Ruby, ajoutez ce qui suit :

```ruby
# config/initializers/datadog.rb

Datadog.configure do |c|
  # Pour configurer la page de blocage text/html
  c.appsec.block.templates.html = '<chemin_vers_fichier.html>'
  # Pour configurer la page de blocage application/json
  c.appsec.block.templates.json = '<chemin_vers_fichier.json>'
end
```

Pour PHP, ajoutez ce qui suit :

```dosini
; 98-ddtrace.ini

; Permet de personnaliser la sortie HTML fournie sur une requête bloquée
datadog.appsec.http_blocked_template_html = <chemin_vers_fichier.html>

; Permet de personnaliser la sortie JSON fournie sur une requête bloquée
datadog.appsec.http_blocked_template_json = <chemin_vers_fichier.json>
```

Pour Node.js, ajoutez ce qui suit :


```javascript
require('dd-trace').init({
  appsec: {
    blockedTemplateHtml: '<chemin_vers_fichier.html>',
    blockedTemplateJson: '<chemin_vers_fichier.json>'
  }
})
```

Par défaut, voici ce à quoi ressemble une page lorsqu'une action est bloquée :

[101]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.html
[102]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.json
[103]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
