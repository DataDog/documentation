---
title: Problèmes liés au site de l'Agent
kind: documentation
---
Par défaut, l'Agent envoie ses données au site américain de Datadog : `app.datadoghq.com`. Si votre organisation utilise un autre site, vous devez le spécifier en modifiant le paramètre `site` dans le [fichier de configuration principal de votre Agent][1] ou définir la variable d'environnement `DD_SITE`:

Pour adapter la documentation Datadog à votre site, utilisez l'outil de sélection à droite de la page. Vous consultez actuellement la documentation pour le site {{< region-param key="dd_full_site" code="true" >}}.

Définissez la variable `DD_SITE` sur {{< region-param key="dd_site" code="true" >}}ou modifiez le paramètre `site` dans votre fichier `datadog.yaml`.

```yaml
## @param site - chaîne, facultatif, valeur par défaut : datadoghq.com
## Le site de Datadog vers lequel envoyer les données de l'Agent.
#
site: {{< region-param key="dd_site" >}}
```


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file