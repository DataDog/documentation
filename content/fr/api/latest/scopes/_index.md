---
disable_sidebar: true
title: Contextes d'autorisation
type: api
---
## Portées d'autorisation pour les clients OAuth

Les portées sont un mécanisme d'autorisation qui permet de contrôler et de restreindre précisément l'accès des applications aux données d'une organisation dans Datadog. Lorsqu'une application est autorisée à accéder aux données pour le compte d'un utilisateur ou d'un compte de service, elle ne peut consulter que les informations explicitement permises par les portées qui lui sont assignées.

<div class="alert alert-danger">Cette page répertorie uniquement les portées d'autorisation pouvant être attribuées aux clients OAuth. Pour consulter la liste complète des autorisations attribuables aux clés d'application avec portée, consultez la page <a href="/account_management/rbac/permissions/#permissions-list">Autorisations des rôles Datadog</a>

<ul>
  <li><strong>Clients OAuth</strong> → Peuvent uniquement se voir attribuer des portées d'autorisation (ensemble limité).</li>
  <li><strong>Clés d'application avec portée</strong> → Peuvent se voir attribuer n'importe quelle autorisation Datadog.</li>
</ul>
</div>

La meilleure pratique pour définir la portée des applications consiste à suivre le principe du moindre privilège. Attribuez uniquement les portées minimales nécessaires au bon fonctionnement de l'application. Cela renforce la sécurité et permet de mieux comprendre comment les applications interagissent avec les données de votre organisation. Par exemple, une application tierce qui se contente de lire des dashboards n'a pas besoin d'autorisations pour supprimer ou gérer des utilisateurs.

Vous pouvez utiliser les portées d'autorisation avec des clients OAuth2 pour vos [applications Datadog][1].

{{< api-scopes >}}

[1]: https://docs.datadoghq.com/fr/developers/datadog_apps/#oauth-api-access
