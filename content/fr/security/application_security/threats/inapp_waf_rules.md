---
aliases:
- /fr/security_platform/application_security/event_rules
- /fr/security/application_security/event_rules
- /fr/security/application_security/threats/event_rules
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Se protéger des menaces avec la solution Application Security Management de
    Datadog
- link: /security/application_security/custom_rules/
  tag: Documentation
  text: Écrire des règles de détection personnalisées
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Résoudre les problèmes courants rencontrés avec la solution Application Security
    Management de Datadog
title: Règles WAF In-App
---

## Présentation

Lorsque la solution Application Security Management (ASM) est activée, la bibliothèque de tracing Datadog surveille en permanence l'ensemble des services Web et des requêtes API afin de détecter toute activité suspecte.

Une _règle WAF In-App_ permet de spécifier des conditions afin de définir ce que la bibliothèque doit considérer comme une activité suspecte lors d'une requête entrante. La bibliothèque de tracing Datadog intègre des centaines de règles WAF In-App ASM prêtes à l'emploi, qui sont utilisées pour afficher les requêtes suspectes dans le Trace Explorer et dans les règles de détection par défaut. 

Vous pouvez ajouter d'autres règles WAF In-App sans mettre à jour la bibliothèque de tracing. 

## Structure d'une règle WAF In-App ASM

Une règle WAF In-App est un objet JSON composé d'une catégorie, d'un nom, de tags et de conditions. Lorsqu'une requête suspecte est détectée, les tags des règles sont appliqués à la requête suspecte et peuvent être utilisés pour créer des [règles de détection][1].

### Conditions
Les conditions définissent dans quels cas la règle applique des tags à une requête entrante. Elles sont composées d'_entrées_ et d'_opérateurs_.

#### Paramètres
Une entrée représente la partie de la requête à laquelle l'opérateur est appliqué. Les entrées suivantes sont utilisées dans les règles WAF In-App :

| Nom | Description | Exemple |
|------|-------------|---------|
| `server.request.uri.raw` | L'URI complet de la requête reçu par le service de l'application | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | Les paramètres du chemin parsés (mappage clé/valeur) | `userId => 1234` |
| `server.request.query` | Les paramètres de la requête parsés (mappage clé/valeur) | `clientId => 234` |
| `server.request.headers.no_cookies` | Les en-têtes des requêtes HTTP entrantes, à l'exception de l'en-tête de cookie (mappage clé/valeur) | `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | Le message gRPC parsé (mappage clé/valeur) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | Le corps HTTP parsé (mappage clé/valeur) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | Le code de statut HTTP | `200` |

#### Opérateurs

| Nom | Description |
|------|-------------|
| `match_regex` | Filtrer les entrées en fonction d'une expression régulière |
| `phrase_match` | Effectuer un filtrage rapide en fonction d'une liste de mots-clés |
| `is_xss` | Opérateur spécial pour vérifier la présence de charges utiles XSS (Cross-Site Scripting) |
| `is_sqli` | Opérateur spécial pour vérifier la présence de charges utiles d'injection SQL (SQLI) |

## Configurer une règle WAF In-App ASM dans votre service

1. Dans Datadog, accédez à la [page In-App WAF depuis la section de configuration d'ASM][2].

2. Cliquez sur **Download Configuration** pour télécharger le fichier de configuration `appsec-rules.json` sur votre machine locale.

3. Modifiez le fichier pour ajouter la définition JSON de votre nouvelle règle en respectant les spécifications ci-dessus. Par exemple :

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

4. Via SCP ou FTP, copiez le fichier `appsec-rules.json` sur le serveur de votre application, par exemple `/home/asm/appsec-rules.json`.

5. Suivez les instructions de la section [Activer ASM][3] pour ajouter des variables d'application dans votre environnement, puis ajoutez la variable d'environnement `DD_APPSEC_RULES` pour votre service en spécifiant le chemin complet vers le fichier :
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. Redémarrez votre service.

## Et ensuite ?

[Configurez des règles de détection pour créer des signaux de sécurité][1] en fonction des requêtes suspectes définies dans les règles WAF In-App que vous avez créées. Vous pouvez modifier les règles de détection ASM déjà fournies ou en créer d'autres.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?group_by=NONE
[3]: /fr/security/application_security/enabling/