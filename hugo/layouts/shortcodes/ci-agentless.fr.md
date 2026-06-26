Si vous utilisez un fournisseur de CI sur le cloud sans accès aux nœuds de worker sous-jacents, comme GitHub Actions ou CircleCI, configurez la bibliothèque pour utiliser le mode sans Agent. Pour cela, définissez les variables d'environnement suivantes :

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (requis)
: Active ou désactive le mode sans Agent.<br/>
**Valeur par défaut** : `false`

`DD_API_KEY` (requis)
: La [clé d'API Datadog][101] utilisée pour importer les résultats de test.<br/>
**Valeur par défaut**: `(empty)`

Configurez aussi le [site Datadog][102] vers lequel vous souhaitez envoyer des données.

`DD_SITE` (requis)
: Le [site Datadog][102] vers lequel importer les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>


[101]: https://app.datadoghq.com/organization-settings/api-keys
[102]: /getting_started/site/
