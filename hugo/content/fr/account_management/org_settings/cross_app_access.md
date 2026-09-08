---
algolia:
  tags:
  - cross-app access
  - XAA
  - Okta
  - AI agent
  - MCP
  - ID-JAG
description: Configurez l'accès inter-applications Okta afin que les agents IA puissent
  appeler la Datadog API au nom des utilisateurs autorisés dans Okta.
further_reading:
- link: /mcp_server/setup/
  tag: Documentation
  text: Configurez le Datadog MCP Server
- link: /account_management/org_settings/mobile_third_party_access/
  tag: Documentation
  text: Accès mobile et tiers
- link: /account_management/saml/
  tag: Documentation
  text: Configurez l'authentification unique SAML
title: Accès inter-applications
---
{{< callout url="#" btn_hidden="true" header="faux">}}
  L'accès inter-applications est en version préliminaire. Okta contrôle l'accès à la version préliminaire et l'active pour votre tenant, et les fonctionnalités Okta dont dépend cette configuration ne sont pas encore généralement disponibles. Toute organisation Datadog peut activer l'accès inter-applications du côté de Datadog dès aujourd'hui.
{{< /callout >}}

## Présentation {#overview}

L'accès inter-applications (XAA) permet aux agents IA d'appeler la Datadog API au nom des utilisateurs que votre organisation a déjà autorisés dans Okta. Sans cela, chaque utilisateur autorise l'agent individuellement via un écran de consentement dans le navigateur. Avec cela, votre administrateur Okta accorde cet accès une fois, de manière centralisée, et les utilisateurs ignorent l'étape de consentement par utilisateur.

Okta émet pour l'agent un jeton à courte durée de vie appelé ID-JAG (Identity Assertion JWT Authorization Grant). L'agent présente ce jeton à Datadog, et Datadog l'échange contre un jeton d'accès appartenant à l'utilisateur qui a initié l'appel. Comme Okta génère le jeton, vos administrateurs accordent et révoquent l'accès Datadog pour les agents IA depuis Okta.

En version préliminaire, l'accès inter-applications prend en charge Okta comme seul fournisseur d'identité et Claude comme seul agent.

## Valeurs que vous échangez {#values-you-exchange}

La configuration déplace les valeurs dans les deux sens entre Datadog et Okta. Deux d'entre elles sont des URL d'émetteur qui nomment des systèmes différents, assurez-vous donc de saisir chacune au bon endroit.

| Valeur                               | Direction       | Où vous la saisissez                                                                        |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| UUID de l'organisation Datadog           | Datadog vers Okta | Application Datadog dans Okta : {{< ui >}}Resource Server{{< /ui >}} onglet > {{< ui >}}Audience/tenant ID{{< /ui >}}              |
| ID de l'agent client                     | Datadog vers Okta | Agent IA Okta : {{< ui >}}Resource Connection{{< /ui >}} > {{< ui >}}Client ID at resource{{< /ui >}}                         |
| URL de la ressource Datadog et URL de l'émetteur | Datadog vers Okta | Application Datadog dans Okta : {{< ui >}}Resource Server{{< /ui >}} onglet > {{< ui >}}Resource URL{{< /ui >}} et {{< ui >}}Issuer URL{{< /ui >}} |
| URL de l'émetteur du tenant Okta              | Okta vers Datadog | Datadog : {{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}, {{< ui >}}Issuer URL{{< /ui >}}                      |

## Prérequis {#prerequisites}

- Votre organisation utilise Okta pour l'authentification unique SAML vers Datadog. L'accès inter-applications résout les utilisateurs via votre connexion SAML existante ; il ne fonctionne donc pas sans celle-ci. Voir [Configurer l'authentification unique SAML](/account_management/saml/).
- Chaque utilisateur qui utilise Claude existe dans votre organisation Datadog et est affecté à la fois à l'application Claude et à l'application Datadog dans Okta.
- Vous disposez de l'autorisation `org_management` dans Datadog. Pour configurer l'accès inter-applications via l'API au lieu de l'interface utilisateur, vous avez également besoin d'un [jeton d'accès personnel](/account_management/personal-access-tokens/) (PAT), utilisé comme `DD_TOKEN` dans les exemples.
- Votre tenant Okta a les fonctionnalités en accès anticipé {{< ui >}}AI Agent Identity Assertion{{< /ui >}} et {{< ui >}}Agent to Agent Connections{{< /ui >}} activées, et vous disposez d'un accès Super Administrateur Okta.

## Configurer l'accès inter-applications dans Datadog {#configure-cross-app-access-in-datadog}

Effectuez les étapes Datadog avant les étapes Okta. Datadog rejette les jetons pour les organisations qui n'ont pas activé l'accès inter-applications ; configurer Okta en premier entraînera donc des échecs jusqu'à ce que vous ayez terminé ici.

Accédez à [{{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/cross-app-access).

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="Page Accès inter-applications dans les paramètres de l'organisation, affichant le statut d'activation, le champ URL de l'émetteur, l'UUID de l'organisation et le tableau des ID client enregistrés" style="width:100%;">}}

### Activer l'accès inter-applications {#enable-cross-app-access}

Cliquez sur {{< ui >}}Enable{{< /ui >}}. Ceci s'applique à l'ensemble de votre organisation. Cliquez sur {{< ui >}}Disable{{< /ui >}} pour désactiver l'accès inter-applications plus tard.

### Définissez votre URL d'émetteur Okta {#set-your-okta-issuer-url}

Dans le champ {{< ui >}}Issuer URL{{< /ui >}}, saisissez l'URL de l'émetteur de votre propre tenant Okta, puis cliquez sur {{< ui >}}Save{{< /ui >}}. Datadog déduit l'emplacement des clés de signature de jeton à partir de cette valeur, elle doit donc être exacte.

L'URL de l'émetteur doit répondre à toutes les conditions suivantes, sinon Datadog la rejette:

- Utilisez `https`.
- Utilisez un sous-domaine de `.okta.com`, `.oktapreview.com` ou `.okta-emea.com`. Datadog rejette le domaine apex, donc `example.okta.com` fonctionne et `okta.com` ne fonctionne pas.

Cliquez sur {{< ui >}}Remove{{< /ui >}} pour annuler la définition de l'émetteur. Datadog cesse d'accepter les jetons une fois que vous l'avez supprimé.

### Copiez l'UUID de votre organisation {#copy-your-organization-uuid}

Copiez la valeur dans le champ {{< ui >}}Org UUID{{< /ui >}}. Okta envoie cette valeur en tant que revendication `aud_tenant`, qui indique à Datadog quelle organisation est ciblée par un jeton lorsque plusieurs organisations partagent un même tenant Okta. Ce n'est pas la même chose que l'ID d'entreprise qu'Okta demande ailleurs.

### Copiez l'ID client de l'agent {#copy-the-agent-client-id}

Le tableau {{< ui >}}Registered client IDs{{< /ui >}} répertorie tous les agents pris en charge par Datadog pour l'accès inter-applications et l'ID client OAuth que chacun utilise. Copiez l'ID client de l'agent que vous configurez. Vous le saisirez dans Okta en tant que {{< ui >}}Client ID at resource{{< /ui >}}.

Datadog ajoute des agents à ce tableau au fur et à mesure qu'il les prend en charge ; vérifiez donc le tableau plutôt que de réutiliser un ID client provenant d'une autre source.

Cliquez sur {{< ui >}}Manage app{{< /ui >}} sur une ligne pour ouvrir les paramètres de périmètre de cet agent. Voir [Contrôler les portées dans Datadog](#control-scopes-in-datadog).

{{% collapse-content title="Facultatif : configurer avec l'API" level="h3" expanded=false %}}

Utilisez ces appels pour scripter la configuration. Ils effectuent la même action que le bouton {{< ui >}}Enable{{< /ui >}} et le champ {{< ui >}}Issuer URL{{< /ui >}}. Les deux nécessitent un PAT avec l'autorisation `org_management`.

Activez l'accès inter-applications en définissant la configuration d'organisation `mcp_cross_app_access_enabled` sur `true`. Pour le désactiver plus tard, envoyez la même requête avec `"value": false`.

```shell
curl -X PATCH "{{< region-param key="dd_api" >}}/api/v2/org_configs/mcp_cross_app_access_enabled" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_configs",
      "attributes": {
        "value": true
      }
    }
  }'
```

Définissez l'URL de l'émetteur Okta. Les mêmes règles de validation s'appliquent, et une valeur qui ne les respecte pas renvoie `400`. L'envoi d'une chaîne vide supprime l'émetteur.

```shell
curl -X PUT "{{< region-param key="dd_api" >}}/api/v2/login/org_configs/mcp_cross_app_access_issuer_url" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_config",
      "attributes": {
        "issuer_url": "https://<YOUR_OKTA_SUBDOMAIN>.okta.com"
      }
    }
  }'
```

Pour lire l'UUID de votre organisation depuis l'API , appelez [{{< region-param key="dd_api" >}}/api/v2/current_user](https://app.datadoghq.com/api/v2/current_user) avec une session active dans l'organisation cible. L'UUID est le `id` de l'entrée `orgs` dans le tableau `included`.

{{% /collapse-content %}}

## Terminez la configuration dans Okta {#finish-the-setup-in-okta}

Terminez la configuration dans Okta Admin Console en tant que super administrateur. Cette section répertorie les valeurs attendues par Datadog et les champs Okta correspondants. Consultez [la documentation sur l'accès inter-applications d'Okta](https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm) pour plus de détails. 

### Configurez l'application Datadog en tant que serveur de ressources {#configure-the-datadog-application-as-a-resource-server}

Dans votre application Datadog, ouvrez l'onglet {{< ui >}}Resource Server{{< /ui >}} et activez {{< ui >}}Cross-app access (XAA){{< /ui >}}. Définissez les champs suivants.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<p>Les valeurs ci-dessous correspondent au <a href="/getting_started/site/">site Datadog</a> que vous avez sélectionné ({{< region-param key="dd_site_name" >}}). Pour voir les valeurs d'un autre site, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page.</p>
<table>
<thead><tr><th>Champ Okta</th><th>Valeur</th></tr></thead>
<tbody>
<tr><td>{{< ui >}}Resource URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_resource_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Issuer URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_issuer_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Audience/tenant ID{{< /ui >}}</td><td>UUID de votre organisation Datadog</td></tr>
</tbody>
</table>
{{< /site-region >}}

L'URL de l'émetteur identifie le serveur d'autorisation Datadog, et non l'endpoint de jeton. Okta l'inscrit dans la revendication `aud` des jetons qu'il émet, et Datadog n'accepte un jeton que lorsque cette revendication correspond.

**Remarque** : Modifier l'URL de l'émetteur ultérieurement nécessite de supprimer et de recréer la connexion de ressource décrite dans [Connect Claude à l'application Datadog](#connect-claude-to-the-datadog-application).

### Enregistrez Claude en tant qu'agent IA {#register-claude-as-an-ai-agent}

Créez une entrée d'agent IA pour Claude dans Okta, puis échangez les clés avec Anthropic. Anthropic signe les requêtes qu'Okta reçoit, donc Okta a besoin de la clé publique d'Anthropic avant d'émettre un jeton.

1. Créez l'entrée d'agent IA pour Claude.
2. Attribuez des propriétaires à l'agent. Okta exige un propriétaire avant que vous puissiez l'activer.
3. Envoyez l'ID d'agent IA généré par Okta à Anthropic.
4. Ajoutez la clé publique renvoyée par Anthropic à l'entrée de l'agent IA, sous l'onglet {{< ui >}}Credentials{{< /ui >}}.

Tant que la clé publique n'est pas en place, l'échange de jetons échoue même si toutes les autres valeurs sont correctes. Cet échange est manuel, commencez donc tôt.

### Connectez Claude à l'application Datadog {#connect-claude-to-the-datadog-application}

Sur l'agent IA Claude, ajoutez l'application SAML Claude en tant qu'appelant délégué, puis connectez l'agent à votre application Datadog.

1. Dans l'onglet {{< ui >}}Delegations{{< /ui >}}, ajoutez l'application Claude SAML en tant qu'appelant.
2. Dans l'onglet {{< ui >}}Resource connections{{< /ui >}}, ajoutez une connexion de ressource. Sélectionnez {{< ui >}}Application{{< /ui >}} comme type de ressource, puis sélectionnez votre application Datadog.
3. Définissez les champs suivants.

   | Champ Okta                | Valeur                                                                                                |
   | ------------------------- | ---------------------------------------------------------------------------------------------------- |
   | {{< ui >}}Client ID at resource{{< /ui >}} | L'ID client Claude que vous avez copié depuis [{{< ui >}}Registered client IDs{{< /ui >}}](#copy-the-agent-client-id)          |
   | {{< ui >}}Scope Condition{{< /ui >}}       | {{< ui >}}Allow all{{< /ui >}}, la seule valeur prise en charge. Voir [Contrôler les portées dans Datadog](#control-scopes-in-datadog) |

4. Activez l'agent depuis le menu {{< ui >}}Actions{{< /ui >}}.

## Contrôler les portées dans Datadog {#control-scopes-in-datadog}

{{< ui >}}Allow all{{< /ui >}} est la seule {{< ui >}}Scope Condition{{< /ui >}} prise en charge pour l'accès inter-applications. Définissez-le dans Okta, puis restreignez ce à quoi Claude accède depuis Datadog.

Okta ne filtre pas les portées. Avec {{< ui >}}Allow all{{< /ui >}}, Okta copie tout ce que Claude demande dans le jeton, ce qui fait de Datadog le point d'application.

<div class="alert alert-warning">Ne saisissez pas de liste de portées dans Okta. Okta rejette toute demande de jeton contenant un périmètre en dehors de la liste, de sorte que l'intégration échoue avec une erreur au lieu de revenir à un accès plus restreint.</div>

Pour définir les portées autorisées pour Claude :

1. Accédez à [{{< ui >}}Organization Settings > Mobile and Third-Party Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/mobile-third-party-access). Vous pouvez également cliquer sur {{< ui >}}Manage app{{< /ui >}} à côté de Claude dans le tableau {{< ui >}}Registered client IDs{{< /ui >}} sur la page Accès inter-applications.
2. Sélectionnez l'application Claude, puis sélectionnez l'onglet {{< ui >}}Scopes{{< /ui >}}.
3. Utilisez la case à cocher {{< ui >}}Allowed{{< /ui >}} pour chaque périmètre afin de contrôler ce à quoi Claude a accès.
4. Cliquez sur {{< ui >}}Enable{{< /ui >}} pour enregistrer.

L'ajout ou la suppression d'un périmètre affecte tous les utilisateurs de votre organisation, et la suppression d'un périmètre révoque les autorisations existantes qui en dépendent. Voir [Gestion des périmètres d'application](/account_management/org_settings/mobile_third_party_access/#application-scope-management).

Un périmètre qui n'est pas autorisé dans Datadog n'est jamais accordé, indépendamment de ce que demande le jeton.

## Ajoutez Datadog en tant que connecteur dans Claude {#add-datadog-as-a-connector-in-claude}

1. Dans Claude, cliquez sur l'icône {{< ui >}}+{{< /ui >}} en bas de n'importe quelle invite, puis cliquez sur {{< ui >}}Add Connector{{< /ui >}}.
2. Recherchez **Datadog** dans le répertoire et activez le connecteur.
3. Terminez le flux de connexion lorsque vous y êtes invité.

Utilisez le connecteur Datadog du répertoire, et non un connecteur personnalisé.

## Vérifiez la configuration {#verify-the-configuration}

Connectez-vous à Claude en tant qu'utilisateur affecté aux deux applications Okta, puis exécutez une requête qui appelle Datadog. Un appel réussi confirme le chemin complet : Okta émet le jeton, Datadog l'accepte et Datadog identifie l'utilisateur.

Si un utilisateur s'est connecté avant que vous n'activiez l'accès inter-applications, demandez-lui de se déconnecter de Claude et de se reconnecter via Okta. Les sessions établies précédemment ne disposent pas du jeton d'identité dont l'agent a besoin.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}