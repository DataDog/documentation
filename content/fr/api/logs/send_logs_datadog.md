---
title: Envoyer des logs via HTTP
type: apicontent
order: 22.1
external_redirect: "/api/#send-logs-over-http"
---

## Envoyer des logs via HTTP

| Élément             | Description                                                                                                           |
| ------           | ---------                                                                                                             |
| Protocole         | http : 80<br>https : 443                                                                                                |
| Host             | Pour le site Datadog américain : `http-intake.logs.datadoghq.com` <br> Pour le site Datadog européen : `http-intake.logs.datadoghq.eu`                 |
| Chemin             | `/v1/input/<CLÉ_API_DATADOG>`                                                                                         |
| Paramètres de la requête | Les paramètres de requête disponibles sont l'attribut de log réservé. `?ddtags=<TAGS>&ddsource=<SOURCE>&service=<SERVICE>&hostname=<HOSTNAME>` |
| Méthode           | `POST`                                                                                                                |
| Type de contenu     | Les types de contenu suivants sont disponibles : `text/plain`, `application/json`, `application/logplex-1`                                 |
