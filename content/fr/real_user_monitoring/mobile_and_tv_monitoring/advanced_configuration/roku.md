---
aliases:
- /fr/real_user_monitoring/roku/advanced_configuration/
code_lang: roku
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: GitHub
  text: Code source dd-sdk-roku
- link: /real_user_monitoring
  tag: Documentation
  text: Explorer la solution RUM de Datadog
title: Configuration avancée de RUM pour Roku
type: multi-code-lang
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">La fonctionnalité RUM pour Roku n'est pas disponible pour le site US1-FED de Datadog.</div>
{{< /site-region >}}

## Présentation

Si vous n'avez pas encore configuré le SDK, consultez les [instructions de configuration intégrées à l'application][1] ou reportez-vous à la [documentation sur la configuration de RUM pour Roku][2].

## Suivre les ressources RUM

### `roUrlTransfer`

Les requêtes réseau effectuées directement avec un nœud `roUrlTransfer` doivent être suivies. 

Pour les *requêtes synchrones*, utilisez le wrapper `datadogroku_DdUrlTransfer` de Datadog afin de suivre automatiquement la ressource. Ce wrapper prend en charge la plupart des fonctionnalités du composant `roUrlTransfer`, mais aucun élément lié aux appels réseau asynchrones.

Vous pouvez par exemple effectuer un appel `GetToString` comme suit :

```brightscript
    ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
    ddUrlTransfer.SetUrl(url)
    ddUrlTransfer.EnablePeerVerification(false)
    ddUrlTransfer.EnableHostVerification(false)
    result = ddUrlTransfer.GetToString()
```

Pour les *requêtes asynchrones*, l'instrumentation automatique n'est pas prise en charge. Vous devez suivre la ressource manuellement. L'extrait de code suivant indique comment signaler la requête comme ressource RUM :

```brightscript
sub performRequest()

    m.port = CreateObject("roMessagePort")
    request = CreateObject("roUrlTransfer")
    ' setup the node url, headers, ...

    timer = CreateObject("roTimespan")
    timer.Mark()
    request.AsyncGetToString()

    while (true)
        msg = wait(1000, m.port)
        if (msg <> invalid)
            msgType = type(msg)
            if (msgType = "roUrlEvent")
                if (msg.GetInt() = 1) ' transfer complete
                    durationMs& = timer.TotalMilliseconds()
                    transferTime# = datadogroku_millisToSec(durationMs&)
                    httpCode = msg.GetResponseCode()
                    status = "ok"
                    if (httpCode < 0)
                        status = msg.GetFailureReason()
                    end if
                    resource = {
                        url: requestUrl
                        method: "GET"
                        transferTime: transferTime#
                        httpCode: httpCode
                        status: status
                    }
                    m.global.datadogRumAgent.callfunc("addResource", resource)
                end if
            end if
        end if
    end while
end sub
```

### Diffuser des ressources

Lorsque vous utilisez un nœud  `Video` ou `Audio` pour diffuser du contenu multimédia, vous pouvez transmettre à Datadog tous les `roSystemLogEvent` que vous recevez comme suit :

```brightscript 
    sysLog = CreateObject("roSystemLog")
    sysLog.setMessagePort(m.port)
    sysLog.enableType("http.error")
    sysLog.enableType("http.complete")

    while(true)
        msg = wait(0, m.port)
        if (type(msg) = "roSystemLogEvent")
            m.global.datadogRumAgent.callfunc("addResource", msg.getInfo())
        end if
    end while
```

## Enrichir des sessions utilisateur

Une fois votre canal Roku instrumenté avec RUM, vous pouvez enrichir les informations sur les sessions utilisateur et contrôler plus précisément les attributs recueillis en suivant des événements personnalisés.

En plus des attributs RUM par défaut recueillis automatiquement par le SDK RUM Roku, vous pouvez ajouter des informations contextuelles supplémentaires, comme des attributs personnalisés, à vos événements RUM afin d'enrichir la visibilité dans Datadog. Les attributs personnalisés permettent de filtrer et de regrouper les informations sur le comportement utilisateur observé (comme la valeur d'un panier, le niveau du marchand ou la campagne publicitaire) en fonction d'informations au niveau du code (comme les services backend, la chronologie de session, les logs d'erreur ou la santé du réseau).

### Identifier vos utilisateurs

L'ajout des informations utilisateur à vos sessions RUM facilite :
* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

Les attributs suivants sont **facultatifs**, mais nous vous conseillons d'en spécifier **au moins un** :

| Attribut | Type   | Description                                                                                              |
| --------- | ------ | -------------------------------------------------------------------------------------------------------- |
| id        | Chaîne | Identifiant d'utilisateur unique.                                                                                  |
| name      | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| email     | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'est pas connu. Elle sert également à récupérer des Gravatars. |

Pour identifier des sessions utilisateur, utilisez le champ global `datadogUserInfo` après avoir initialisé le SDK, par exemple :

```brightscript
    m.global.setField("datadogUserInfo", { id: 42, name: "Abcd Efg", email: "abcd.efg@example.com"})
```

### Suivi d'attributs globaux personnalisés

En plus des attributs par défaut recueillis automatiquement par le SDK, vous pouvez ajouter des informations contextuelles supplémentaires, comme des attributs personnalisés, à vos logs et événements RUM afin d'enrichir la visibilité dans Datadog. Les attributs personnalisés permettent de filtrer et de regrouper les informations sur le comportement utilisateur observé (selon la valeur d'un panier, le niveau du marchand ou la campagne publicitaire, par exemple) en fonction d'informations au niveau du code (comme les services backend, la chronologie de session, les logs d'erreur et la santé du réseau).

```brightscript
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/roku


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}