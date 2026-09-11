---
categories:
- log collection
- security
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/content_security_policy_logs.md
description: Détectez et agrégez les violations de CSP avec Datadog
doc_link: /integrations/content_security_policy_logs/
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: En savoir plus sur le tagging de service unifié
has_logo: true
integration_id: content_security_policy_logs
integration_title: Logs de CSP
is_public: true
custom_kind: integration
name: content_security_policy_logs
public_title: Intégration Datadog/Logs de CSP
short_description: Détectez les violations de CSP
version: '1.0'
---

## Présentation

L'intégration CSP (stratégie de sécurité du contenu) de Datadog permet de transmettre des logs à Datadog lorsque les navigateurs Web interprètent votre CSP et détectent des violations. Lorsque vous utilisez l'intégration CSP, vous n'avez pas besoin d'héberger ou de gérer un endpoint dédié pour agréger vos données CSP.

Pour en savoir plus sur les CSP, consultez l'[article de Google sur web.dev][1].

## Prérequis

Avant d'ajouter une directive à un en-tête CSP, [générez un token client dans votre compte Datadog][2].

<div class="alert alert-info">Pour des raisons de sécurité, vous devez utiliser un token client pour recueillir les logs des navigateurs Web. Vous ne pouvez pas utiliser les clés d'API Datadog pour configurer le SDK Datadog de collecte de logs à partir des navigateurs, car elles risqueraient d'être exposées côté client. Pour en savoir plus, consultez la <a href="https://docs.datadoghq.com/logs/log_collection/?tab=host#setup">documentation dédiée aux tokens client</a>.</div>

## Préparer une URL pour la CSP

Vous devez mettre en place une URL qui permettra aux navigateurs d'envoyer les violations de CSP détectées. L'URL doit respecter le format suivant :

```
https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<token-client>&dd-evp-origin=content-security-policy&ddsource=csp-report
```

Si vous le souhaitez, ajoutez la clé `ddtags` (nom du service, environnement et version du service) à l'URL pour configurer le [tagging de service unifié][3] :
- `env` : l'environnement de votre application.
- `service` : le nom de service de votre application.
- `version` : la version de votre application.

Pour bien formater les valeurs `ddtags`, vous devez :
- Regrouper les clés et les valeurs avec un deux-points (`:`)
- Concaténer les clés et les valeurs avec une virgule (`,`)
- Encodage de l'URL

Par exemple, avec les paires key/value `{"service": "billingService", "env": "production"}`, la chaîne d'URL encodée ressemblera à ceci :

```
service%3AbillingService%2Cenv%3Aproduction
```

Et l'URL finale avec les tags sera la suivante :

```
https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<token-client>&dd-evp-origin=content-security-policy&ddsource=csp-report&ddtags=service%3AbillingService%2Cenv%3Aproduction
```

## Ajouter l'URL à la CSP

Vous pouvez intégrer l'URL dans un en-tête HTTP (méthode recommandée) ou dans une balise HTML `<meta>`.

### Intégrer la CSP dans un en-tête HTTP

Datadog vous conseille d'intégrer la CSP dans un en-tête HTTP. Vous pouvez utiliser la directive `report-uri` ou la directive `report-to`. La directive `report-to` est amenée à remplacer `report-uri`, mais elle n'est pas encore prise en charge par tous les navigateurs.

- Si vous utilisez la directive `report-uri` :
  ```bash
  Content-Security-Policy: ...; report-uri https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report
  ```

- Si vous utilisez la directive `report-to` :
  ```json
  Content-Security-Policy: ...; report-to browser-intake-datadoghq
  Report-To: { "group": "browser-intake-datadoghq",
              "max_age": 10886400,
              "endpoints": [
                  { "url": " https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report" }
              ] }
  ```

### Intégrer la CSP dans une balise HTML `<meta>`

Vous pouvez également intégrer l'URL dans une balise HTML `<meta>`.

```html
<meta http-equiv="Content-Security-Policy"
    content="...; report-uri 'https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<token-client>&dd-evp-origin=content-security-policy&ddsource=csp-report'">
```
## Exemples de signalements de violations

Chaque navigateur interprète le format de signalement différemment :

{{< tabs >}}
{{% tab "Firefox" %}}
```json
{
  'csp-report': {
    'blocked-uri': 'https://evil.com/malicious.js',
    'document-uri': 'http://localhost:8000/',
    'original-policy': 'script-src http://good.com; report-uri http://127.0.0.1:8000/csp_reports',
    referrer: '',
    'violated-directive': 'script-src'
  }
}
```
{{% /tab %}}

{{% tab "Chrome" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src-elem',
    'effective-directive': 'script-src-elem',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    disposition: 'enforce',
    'blocked-uri': 'https://evil.com/malicious.js',
    'status-code': 200,
    'script-sample': ''
  }
}
```
{{% /tab %}}

{{% tab "Safari" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src good.com',
    'effective-directive': 'script-src',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    'blocked-uri': 'https://evil.com',
    'status-code': 200
  }
}
```
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/csp/
[2]: https://app.datadoghq.com/organization-settings/client-tokens
[3]: /fr/getting_started/tagging/unified_service_tagging