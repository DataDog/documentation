---
title: Problèmes liés au site de l'Agent
kind: documentation
---
Par défaut, l'Agent envoie ses données au site américain de Datadog : `app.datadoghq.com`. Si votre organisation utilise un autre site, vous devez le spécifier en modifiant le paramètre `site` dans le [fichier de configuration principal de votre Agent][1] ou définir la variable d'environnement `DD_SITE` :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

Définissez la variable `DD_SITE` sur `datadoghq.com`ou modifiez le paramètre `site` dans votre `datadog.yaml`

```yaml
## @param site - chaîne - facultatif - défaut : datadoghq.com
## Le site de Datadog vers lequel envoyer les données de l'Agent.
## Définir sur 'datadoghq.eu' pour envoyer les données vers le site européen.
#
site: datadoghq.com
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

Définissez la variable `DD_SITE` sur `datadoghq.eu`ou modifiez le paramètre `site` dans votre `datadog.yaml`

```yaml
## @param site - chaîne - facultatif - défaut : datadoghq.com
## Le site de Datadog vers lequel envoyer les données de l'Agent.
## Définir sur 'datadoghq.eu' pour envoyer les données vers le site européen.
#
site: datadoghq.eu
```

{{% /tab %}}
{{< /tabs >}}
[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file