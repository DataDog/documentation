---
aliases:
- /fr/security/application_security/policies/inapp_waf_rules/
- /fr/security_platform/application_security/event_rules
- /fr/security/application_security/event_rules
- /fr/security/application_security/threats/inapp_waf_rules
title: Règles WAF dans l'application
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

## Présentation {#overview}

Lorsque la protection des applications et des API (AAP) est activée, le SDK Datadog surveille activement tous les services web et les requêtes API à la recherche d'activités de sécurité suspectes.

Une _règle WAF In-App_ spécifie des conditions sur la requête entrante pour définir ce que la bibliothèque considère comme suspect. Le SDK Datadog inclut des centaines de règles AAP In-App WAF prêtes à l'emploi, qui sont utilisées pour afficher les traces de sécurité dans l'explorateur de traces et dans les règles de signal par défaut.

Vous pouvez ajouter aux règles AAP In-App WAF sans mettre à niveau le SDK.

## Structure d'une règle AAP WAF In-App {#structure-of-an-aap-in-app-waf-rule}

Une règle AAP In-App WAF est un objet JSON composé d'une catégorie, d'un nom, de tags et de conditions. Lorsqu'une trace de sécurité est détectée, les tags des règles sont propagés sur la trace de sécurité et peuvent être utilisés pour créer des [règles de détection][1].

### Conditions {#conditions}
Les conditions définissent quand la règle marque une requête entrante. Les conditions sont composées de _entrées_ et d'_opérateurs_.

#### Entrées {#inputs}
Une entrée représente la partie de la requête à laquelle l'opérateur est appliqué. Les entrées suivantes sont utilisées dans les règles AAP In-App WAF :

| Nom | Description | Exemple |
|------|-------------|---------|
| `server.request.uri.raw` | L'URI complète de la requête reçue par le service d'application | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | Les paramètres de chemin analysés (mappage clé/valeur) | `userId => 1234` |
| `server.request.query` | Les paramètres de requête analysés (mappage clé/valeur) | `clientId => 234` |
| `server.request.headers.no_cookies` | Les en-têtes des requêtes HTTP entrantes, à l'exclusion de l'en-tête cookie (mappage clé/valeur) | `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | Le message gRPC analysé (mappage clé/valeur) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | Le corps HTTP analysé (mappage clé/valeur) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | Le code d'état HTTP | `200` |

#### Opérateurs {#operators}

| Nom | Description |
|------|-------------|
| `match_regex` | Effectuer une correspondance d'expression régulière sur les entrées |
| `phrase_match` | Effectuer une correspondance rapide de liste de mots-clés |
| `is_xss` | Opérateur spécial pour vérifier les charges utiles de cross-site scripting (XSS) |
| `is_sqli` | Opérateur spécial pour vérifier les charges utiles d'injection SQL (SQLI) |

## Règles AAP In-App WAF personnalisées {#custom-in-app-waf-rules}

Les règles AAP In-App WAF personnalisées permettent aux utilisateurs de journaliser ou de bloquer des types spécifiques de requêtes vers leurs applications. Par exemple, vous pouvez utiliser des règles personnalisées pour surveiller la réussite ou l'échec des connexions. Pour commencer, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [{{< ui >}}Custom Rules{{< /ui >}}][4].

**Remarque :** Les règles par défaut de l'AAP In-App WAF sont en lecture seule. Pour affiner le comportement de votre AAP In-App WAF, modifiez les règles AAP In-App WAF. Les règles par défaut de l'AAP In-App WAF ne peuvent pas être modifiées ; cependant, vous pouvez créer une règle personnalisée à partir de l'une de ces règles par défaut et modifier les conditions de correspondance selon vos besoins. Assurez-vous de désactiver la règle par défaut afin de ne pas avoir deux règles similaires évaluant les mêmes requêtes.

## Règles suggérées {#suggested-rules}

La fonctionnalité [Règles suggérées][5] de la protection des applications et des API de Datadog analyse automatiquement le trafic des applications et propose des règles pour aider à surveiller et à protéger les flux de connexion et d'API. Les règles sont prédéfinies autour de modèles d'authentification courants tels que `users.login.success` ou `users.login.failure`, qui sont les signaux les plus critiques pour détecter un comportement de connexion suspect.

Les avantages des règles suggérées incluent :

- Réduire la configuration manuelle en offrant une couverture de base pour les endpoints d'authentification. 
- Améliorer la vitesse de déploiement des protections sur les services et les environnements pour se protéger contre les vecteurs d'attaque courants tels que les attaques par force brute, le credential stuffing et les abus de connexion automatisés.
- Fournir une télémétrie haute fidélité sur les tentatives de connexion pouvant être corrélées avec des modèles anormaux tels que des pics soudains d'échecs de connexion, des tentatives répétées depuis la même adresse IP ou une activité de connexion depuis des zones géographiques inhabituelles. 
- Assurer une visibilité pour la [protection contre la prise de contrôle de compte (ATO)][6], où la plupart des campagnes ATO sont détectées en premier lieu par une activité d'authentification anormale. 
- Détecter et répondre aux abus d'identifiants avant que les comptes ne soient compromis.

Les cas d'utilisation des règles suggérées incluent :

  * Déployer rapidement des protections contre les attaques par force brute, le credential stuffing et les abus de connexion pilotés par des bots.
  * Utiliser les règles suggérées comme bases pour la protection ATO en suivant les tentatives de connexion réussies et échouées et en ajustant les conditions (par exemple, la méthode POST plus les échecs 401/403).
  * Appliquer une logique de détection cohérente sur tous les services pour rendre plus difficile le contournement des défenses par les attaquants dans les environnements moins surveillés.
  * Détecter les signes de **tentatives de prise de contrôle de compte** en surveillant l'activité de connexion anormale (par exemple, des pics d'échecs, des taux de réussite de connexion inhabituels après des échecs répétés).

Pour utiliser une règle suggérée, effectuez l'une des opérations suivantes :
- Créer une règle personnalisée à partir d'une règle suggérée :
  1. Dans [Suggested Rules][5], sélectionnez une ou plusieurs règles et cliquez sur {{< ui >}}Create Selected Suggested Rules{{< /ui >}}.
  2. Dans {{< ui >}}Create suggested custom In-App WAF rules{{< /ui >}}, cliquez sur {{< ui >}}Create rules{{< /ui >}}. Cela crée des règles AAP In-App WAF personnalisées pour surveiller les activités de sécurité des règles que vous avez sélectionnées.
- Modifier une règle suggérée pour créer une règle personnalisée :
  1. Dans [Suggested Rules][5], identifiez une règle que vous souhaitez utiliser et cliquez sur {{< ui >}}View suggested rule{{< /ui >}}.
  2. Dans {{< ui >}}Add a new Business Logic{{< /ui >}}, modifiez la règle selon vos besoins.
  3. Cliquez sur {{< ui >}}Continue in In-App WAF{{< /ui >}}.
  4. Dans {{< ui >}}Define your custom rule{{< /ui >}}, effectuez d'autres modifications.
  5. Cliquez sur {{< ui >}}Save Rule{{< /ui >}}.


## Configurer une règle AAP In-App WAF {#configure-an-aap-in-app-waf-rule}

Le blocage sur un service est défini par les règles de politique. Trois politiques par défaut de Datadog sont incluses dans l'AAP In-App WAF : *Datadog Recommended*, *Datadog Monitoring-only*, qui surveille uniquement les attaques, et *Datadog Block Attack tools*, qui bloque les outils d'attaque et surveille toutes les autres attaques.

Les services utilisant une politique sont visibles directement sur la page de gestion des politiques.

1. Dans Datadog, accédez à [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}}][2].

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="Page de configuration de l'AAP In-App WAF, montrant deux politiques par défaut." style="width:100%;" >}}

2. Cliquez sur les trois points à droite de l'une des politiques et sélectionnez {{< ui >}}Download Configuration of this Policy{{< /ui >}} pour télécharger le fichier de configuration sur votre machine locale.
3. Optionnellement, sélectionnez {{< ui >}}Apply this Policy to Services{{< /ui >}} pour appliquer une politique par défaut à un ou plusieurs de vos services AAP avec protection activée.

   **Remarque :** Une politique peut être appliquée à un ou plusieurs services, mais un service ne peut contenir qu'une seule _politique_.

3. Mettez à jour le fichier pour inclure la définition JSON de votre nouvelle règle, en suivant la spécification ci-dessus. Exemple :

   {{< code-block lang="json" collapsible="true" >}}
    {
        "id": "id-123",
        "name": "My In-App WAF rule",
        "tags": {
            "category": "attack_attempt",
            "crs_id": "920260",
            "type": "http_protocol_violation"
        },
        "conditions": [
            {
                "operator": "match_regex",
                "parameters": {
                    "inputs": [
                        {
                            "address": "server.request.uri.raw"
                        }
                    ],
                    "options": {
                        "case_sensitive": true,
                        "min_length": 6
                    },
                    "regex": "\\%u[fF]{2}[0-9a-fA-F]{2}"
                }
            }
        ],
        "transformers": []
    },
   {{< /code-block >}}

4. À l'aide d'un utilitaire tel que SCP ou FTP, copiez le fichier `appsec-rules.json` sur votre serveur d'application, par exemple `/home/asm/appsec-rules.json`.

5. En suivant les instructions de [Enabling AAP][3] pour ajouter des variables d'application dans votre environnement, ajoutez la variable d'environnement `DD_APPSEC_RULES` à votre service avec le chemin complet vers le fichier :
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. Redémarrez votre service.

## Étapes suivantes {#what-to-do-next}

Ensuite, [configurez des règles de détection pour créer des signaux de sécurité][1] basés sur ces traces de sécurité définies par les règles AAP In-App WAF que vous avez créées. Vous pouvez modifier les règles de détection AAP prêtes à l'emploi ou en créer de nouvelles.

[1]: /fr/security/application_security/threat_protection/policies/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /fr/security/application_security/setup/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules
[5]: https://app.datadoghq.com/security/appsec/policies/in-app-waf?config_by=suggested-rules
[6]: /fr/security/application_security/threat_protection/account_takeover_protection/