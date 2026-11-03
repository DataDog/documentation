---
build:
  list: never
  render: never
---
{{% collapse-content title="Attributs principaux" level="h3" id="core-attributes" %}}

Ces attributs sont présents sur toutes les constatations de sécurité et décrivent la nature fondamentale et le statut de la constatation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>additional_resources</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@additional_resources</code><br>Ressources supplémentaires. Par exemple, une instance AWS EC2 peut avoir des groupes de sécurité et des groupes Auto Scaling comme ressources supplémentaires.</td>
    </tr>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@base_severity</code><br>Niveau de gravité de base de la constatation avant tout ajustement. Valeurs valides : <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@description</code><br>Explication lisible par l'homme de la constatation. Peut inclure un formatage Markdown.</td>
    </tr>
    <tr>
      <td><code>detection_changed_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@detection_changed_at</code><br>Horodatage en millisecondes (UTC) auquel l'état d'évaluation ou de détection de la constatation a changé pour la dernière fois.</td>
    </tr>
    <tr>
      <td><code>exposure_time_seconds</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@exposure_time_seconds</code><br>Indique le temps écoulé, en secondes, entre la dernière fermeture de la constatation et sa première détection.</td>
    </tr>
    <tr>
      <td><code>finding_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@finding_id</code><br>Identifiant unique de la constatation.</td>
    </tr>
    <tr>
      <td><code>finding_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@finding_type</code><br>Catégorie de la constatation. Valeurs valides : <code>api_security</code>, <code>attack_path</code>, <code>runtime_code_vulnerability</code>, <code>static_code_vulnerability</code>, <code>host_and_container_vulnerability</code>, <code>iac_misconfiguration</code>, <code>identity_risk</code>, <code>library_vulnerability</code>, <code>misconfiguration</code>, <code>secret</code>, <code>workload_activity</code>, <code>sensitive_data</code>, <code>code_quality</code>.</td>
    </tr>
    <tr>
      <td><code>first_seen_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@first_seen_at</code><br>Horodatage en millisecondes (UTC) auquel la constatation a été détectée pour la première fois.</td>
    </tr>
    <tr>
      <td><code>is_in_security_inbox</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@is_in_security_inbox</code><br><code>true</code> si la constatation apparaît dans la boîte de réception Security ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>last_detected_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@last_detected_at</code><br>Horodatage de découverte en millisecondes (UTC) auquel la dernière détection a été reçue par la plateforme de constatations.</td>
    </tr>
    <tr>
      <td><code>last_seen_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@last_seen_at</code><br>Horodatage en millisecondes (UTC) auquel la constatation a été détectée le plus récemment.</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@origin</code><br>Origines de détection ayant produit la constatation, telles que les analyses sans agent, APM, SCA (Software Composition Analysis) ou CI (Continuous Integration).</td>
    </tr>
    <tr>
      <td><code>related_services</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@related_services</code><br>Services déduits de l'intégration du code source (par exemple, pour les constatations SAST).</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@resource_id</code><br>Identifiant unique de la ressource affectée par la constatation.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@resource_name</code><br>Nom lisible par l'humain de la ressource affectée par le résultat.</td>
    </tr>
    <tr>
      <td><code>resource_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@resource_type</code><br>Type de la ressource.</td>
    </tr>
    <tr>
      <td><code>severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@severity</code><br>Niveau de gravité final de la constatation, après les ajustements de Datadog et toute modification de gravité définie par l'utilisateur. Valeurs valides : <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>source_finding_raw_data</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@source_finding_raw_data</code><br>Données brutes provenant d'intégrations tierces ayant généré le résultat.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@status</code><br>État du workflow du résultat. Valeurs valides : <code>open</code>, <code>muted</code>, <code>auto_closed</code>, <code>resolved</code>, <code>in-progress</code>.</td>
    </tr>
    <tr>
      <td><code>time_to_acknowledge</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@time_to_acknowledge</code><br>Temps en secondes entre la première détection de la constatation et sa prise en compte par attribution ou création de ticket.</td>
    </tr>
    <tr>
      <td><code>time_to_resolution</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@time_to_resolution</code><br>Temps en secondes entre la première détection de la constatation et sa résolution.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@title</code><br>Titre lisible par l'humain pour la constatation.</td>
    </tr>
  </tbody>
</table>

### Ressources supplémentaires {#additional-resources}

Ressources supplémentaires. Par exemple, une instance AWS EC2 peut avoir des groupes de sécurité et des groupes Auto Scaling comme ressources supplémentaires.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>category</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@additional_resources.category</code><br>Catégorie de la ressource supplémentaire. Valeurs valides : <code>cloud_resource</code>, <code>k8s</code>, <code>host</code>, <code>service</code>, <code>git</code>, <code>iac_resource</code>, <code>serverless_function</code>.</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@additional_resources.configuration</code><br>Configuration de la ressource supplémentaire.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@additional_resources.key</code><br>Identifiant de ressource cloud canonique (CCRID) de la ressource supplémentaire lorsque la ressource est prise en charge par le cloud (par exemple, lorsque <code>category</code> est <code>cloud_resource</code>). Ce champ peut être omis pour les catégories non liées au cloud telles que <code>k8s</code>, <code>host</code>, <code>service</code>, ou <code>git</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Avis" level="h3" id="advisory" %}}

Associe une vulnérabilité à un ensemble de versions logicielles spécifiques. Les résultats de vulnérabilité avec des avis indiquent qu'une version vulnérable du logiciel a été détectée (généralement via des SBOM).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>aliases</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@advisory.aliases</code><br>Identifiants supplémentaires faisant référence à la même vulnérabilité, créés par d'autres entités.</td>
    </tr>
    <tr>
      <td><code>cve</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@advisory.cve</code><br>Identifiant principal mondialement reconnu pour une vulnérabilité de sécurité, suivant le <code>CVE-YYYY-NNNN</code> format.</td>
    </tr>
    <tr>
      <td><code>first_remediation_available_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@advisory.first_remediation_available_at</code><br>Horodatage en millisecondes (UTC) auquel la première correction pour l'avis est devenue disponible.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@advisory.id</code><br>Identifiant interne de l'avis :</td>
    </tr>
    <tr>
      <td><code>modified_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@advisory.modified_at</code><br>Horodatage en millisecondes (UTC) auquel l'avis a été mis à jour pour la dernière fois :</td>
    </tr>
    <tr>
      <td><code>published_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@advisory.published_at</code><br>Horodatage en millisecondes (UTC) auquel l'avis a été publié.</td>
    </tr>
    <tr>
      <td><code>summary</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@advisory.summary</code><br>Bref résumé de l'avis.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@advisory.type</code><br>Type de l'avis. Valeurs valides : <code>component_with_known_vulnerability</code>, <code>unmaintained</code>, <code>end_of_life</code>, <code>dangerous_workflows</code>, <code>risky_license</code>, <code>malicious_package</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Endpoint d'API" level="h3" id="api-endpoint" %}}

Représentation de l'endpoint HTTP.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>method</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@api_endpoint.method</code><br>Méthode de l'endpoint (verbe HTTP ou méthode gRPC).</td>
    </tr>
    <tr>
      <td><code>operation_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@api_endpoint.operation_name</code><br>Nom du point d'entrée dans un service (par exemple, <code>http.request</code>, <code>grpc.server</code>).</td>
    </tr>
    <tr>
      <td><code>path</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@api_endpoint.path</code><br>Chemin relatif modélisé de l'endpoint.</td>
    </tr>
    <tr>
      <td><code>request_path</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@api_endpoint.request_path</code><br>Chemin relatif de l'endpoint.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@api_endpoint.resource_name</code><br>Identification interne de l'endpoint au format <code>&lt;method&gt; &lt;path&gt;</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Ressource cloud" level="h3" id="cloud-resource" %}}

Attributs identifiant la ressource cloud affectée par la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.account</code><br>Compte cloud qui possède la ressource cloud (par exemple, compte AWS, abonnement Azure, projet GCP, location OCI).</td>
    </tr>
    <tr>
      <td><code>account_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.account_name</code><br>Nom lisible par l'homme du compte cloud possédant la ressource.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.category</code><br>Catégorie à laquelle appartient le type de ressource.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.cloud_provider</code><br>Fournisseur cloud hébergeant la ressource. Valeurs valides : <code>aws</code>, <code>azure</code>, <code>gcp</code>, <code>oci</code>.</td>
    </tr>
    <tr>
      <td><code>cloud_provider_url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.cloud_provider_url</code><br>Lien vers la ressource dans la console du fournisseur cloud.</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.configuration</code><br>Configuration de la ressource cloud, telle que renvoyée par le fournisseur cloud.</td>
    </tr>
    <tr>
      <td><code>context</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.context</code><br>Contexte de la ressource cloud.</td>
    </tr>
    <tr>
      <td><code>display_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.display_name</code><br>Nom d'affichage de la ressource.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.key</code><br>Identifiant de ressource cloud canonique (CCRID).</td>
    </tr>
    <tr>
      <td><code>public_accessibility_paths</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.public_accessibility_paths</code><br>Chemins réseau par lesquels la ressource est accessible depuis l'internet public.</td>
    </tr>
    <tr>
      <td><code>public_port_ranges</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.public_port_ranges</code><br>Plages de ports sur la ressource qui sont exposées à l'internet public.</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.region</code><br>Région cloud où se trouve la ressource.</td>
    </tr>
  </tbody>
</table>

### Plages de ports publics {#public-port-ranges}

Plages de ports sur la ressource qui sont exposées à l'internet public.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>from_port</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.public_port_ranges.from_port</code><br>Numéro de port de début de la plage exposée.</td>
    </tr>
    <tr>
      <td><code>to_port</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@cloud_resource.public_port_ranges.to_port</code><br>Numéro de port de fin de la plage exposée.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Emplacement du code" level="h3" id="code-location" %}}

Attributs identifiant le fichier spécifique et les numéros de ligne où se trouve la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@code_location.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@code_location.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@code_location.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@code_location.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@code_location.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@code_location.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@code_location.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@code_location.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Compliance" level="h3" id="compliance" %}}

Informations spécifiques aux résultats de conformité, telles que la règle de conformité ou l'évaluation (`pass`/`fail`).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>agent</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@compliance.agent</code><br>Métadonnées concernant l'agent de conformité qui a produit le résultat.</td>
    </tr>
    <tr>
      <td><code>evaluation</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.evaluation</code><br>Résultat de l'évaluation de conformité. Valeurs valides : <code>pass</code> (la ressource est correctement configurée), <code>fail</code> (la ressource est mal configurée).</td>
    </tr>
    <tr>
      <td><code>frameworks</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@compliance.frameworks</code><br>Cadres de conformité associés au résultat.</td>
    </tr>
  </tbody>
</table>

### Agent {#agent}

Métadonnées concernant l'agent de conformité qui a produit le résultat.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>agent_framework_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.agent.agent_framework_id</code><br>Identifiant du cadre de conformité utilisé par l'agent.</td>
    </tr>
    <tr>
      <td><code>agent_rule_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.agent.agent_rule_id</code><br>Identifiant de la règle d'agent qui a déclenché le résultat.</td>
    </tr>
    <tr>
      <td><code>agent_version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.agent.agent_version</code><br>Version de l'agent de conformité qui a produit le résultat.</td>
    </tr>
    <tr>
      <td><code>data</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@compliance.agent.data</code><br>Données supplémentaires produites par l'évaluation de l'agent de conformité.</td>
    </tr>
    <tr>
      <td><code>evaluator</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.agent.evaluator</code><br>Nom de l'évaluateur qui a évalué le résultat de conformité.</td>
    </tr>
  </tbody>
</table>

### Cadres {#frameworks}

Cadres de conformité associés au résultat.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>control</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.frameworks.control</code><br>Identifiant du contrôle au sein du cadre de conformité.</td>
    </tr>
    <tr>
      <td><code>framework</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.frameworks.framework</code><br>Identifiant du cadre de conformité (par ex., <code>cis</code>, <code>pci-dss</code>).</td>
    </tr>
    <tr>
      <td><code>is_default</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@compliance.frameworks.is_default</code><br><code>true</code> si ceci est le mappage de cadre par défaut pour le résultat, <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>requirement</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.frameworks.requirement</code><br>Identifiant de l'exigence au sein du contrôle.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@compliance.frameworks.version</code><br>Version du cadre de conformité.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Image de conteneur" level="h3" id="container-image" %}}

Image de conteneur où le résultat a été détecté, incluant les informations de registre, de référentiel et de condensé.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>architectures</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@container_image.architectures</code><br>Architectures associées à l'image de conteneur.</td>
    </tr>
    <tr>
      <td><code>base_image</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@container_image.base_image</code><br>Image de base sur laquelle cette image de conteneur est construite. Une image de base est elle-même une image de conteneur et peut avoir son propre <code>base_image</code>. Absent lorsqu'aucune image de base n'est identifiée.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@container_image.git_repository_url</code><br>URL du référentiel Git pour le code utilisé pour construire l'image de conteneur. Disponible uniquement lorsque l'intégration du code source est configurée.</td>
    </tr>
    <tr>
      <td><code>image_layer_diff_ids</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@container_image.image_layer_diff_ids</code><br>ID de diff des couches d'image, dans l'ordre où elles ont été appliquées. Chaque ID de diff est le SHA256 du contenu de la couche non compressée.</td>
    </tr>
    <tr>
      <td><code>image_layer_digests</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@container_image.image_layer_digests</code><br>Empreintes des couches d'image, dans l'ordre où elles ont été appliquées. Chaque empreinte est le SHA256 de l'objet blob de la couche compressée.</td>
    </tr>
    <tr>
      <td><code>is_running_as_serverless_function</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@container_image.is_running_as_serverless_function</code><br><code>true</code> si l'image de conteneur s'exécute en tant que fonction serverless ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@container_image.name</code><br>Nom complet de l'image de conteneur.</td>
    </tr>
    <tr>
      <td><code>oses</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@container_image.oses</code><br>Systèmes d'exploitation associés à l'image de conteneur.</td>
    </tr>
    <tr>
      <td><code>registries</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@container_image.registries</code><br>Registre de conteneurs où l'image est stockée ou depuis lequel elle a été extraite.</td>
    </tr>
    <tr>
      <td><code>repo_digests</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@container_image.repo_digests</code><br>Empreintes du référentiel de l'image de conteneur dans lequel le constat a été détecté.</td>
    </tr>
    <tr>
      <td><code>repository</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@container_image.repository</code><br>Référentiel de l'image de conteneur.</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@container_image.tags</code><br>La partie tag du nom de l'image de conteneur (par exemple, <code>latest</code> ou <code>1.2.3</code>).</td>
    </tr>
    <tr>
      <td><code>versions</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@container_image.versions</code><br>Versions de l'image de conteneur of9 le constat a e9te9 de9tecte9.</td>
    </tr>
  </tbody>
</table>

### Systèmes d'exploitation {#operating-systems}

Systèmes d'exploitation associés à l'image de conteneur.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@container_image.oses.name</code><br>Nom du système d'exploitation.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@container_image.oses.version</code><br>Version du système d'exploitation.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Outil de détection" level="h3" id="detection-tool" %}}

Informations sur l'outil ou le moteur responsable de la détection du constat.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@detection_tool.name</code><br>Nom de l'outil ou du moteur de détection ayant généré le résultat.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@detection_tool.version</code><br>Version de l'outil ou du moteur de détection ayant généré le résultat.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Git" level="h3" id="git" %}}

Métadonnées Git reliant un résultat au contexte du code source. Inclut des informations sur le dépôt, la branche, le commit, l'auteur et le contributeur (committer).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@git.author</code><br>Contient des détails sur l'auteur original du commit, notamment le nom, l'adresse e-mail et l'horodatage de création. Reste inchangé lorsque le commit est rebasé, sélectionné (cherry-picked) ou réappliqué.</td>
    </tr>
    <tr>
      <td><code>branch</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.branch</code><br>Nom de la branche Git liée au résultat.</td>
    </tr>
    <tr>
      <td><code>codeowners</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@git.codeowners</code><br>Équipes propriétaires du code extraites du fichier CODEOWNERS du fournisseur SCM (gestion de contrôle de source) sur des plateformes comme GitHub.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@git.committer</code><br>Contient des détails sur la personne ayant appliqué le commit au dépôt en dernier, notamment le nom, l'adresse e-mail et l'horodatage du commit. Peut différer de l'auteur lorsque le commit est rebasé, modifié ou appliqué avec <code>git am</code>.</td>
    </tr>
    <tr>
      <td><code>default_branch</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.default_branch</code><br>Branche par défaut définie pour le dépôt Git.</td>
    </tr>
    <tr>
      <td><code>is_default_branch</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@git.is_default_branch</code><br><code>true</code> si la branche actuelle est la branche par défaut du dépôt; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>repository_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.repository_id</code><br>Identifiant normalisé du dépôt Git.</td>
    </tr>
    <tr>
      <td><code>repository_url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.repository_url</code><br>URL du dépôt Git lié au résultat.</td>
    </tr>
    <tr>
      <td><code>repository_visibility</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.repository_visibility</code><br>Visibilité du dépôt. Valeurs valides : <code>public</code>, <code>private</code>, <code>not_detected</code>.</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.sha</code><br>Identifiant de commit Git (SHA).</td>
    </tr>
  </tbody>
</table>

### Auteur {#author}

Contient des détails sur l'auteur original du commit, notamment le nom, l'adresse e-mail et l'horodatage de création. Reste inchangé lorsque le commit est rebasé, cherry-picked ou réappliqué.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@git.author.authored_at</code><br>Horodatage en millisecondes (UTC) auquel les modifications d'origine ont été effectuées.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.author.email</code><br>Adresse e-mail de l'auteur du commit.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.author.name</code><br>Nom de l'auteur du commit.</td>
    </tr>
  </tbody>
</table>

### Committer {#committer}

Contient des détails sur la personne qui a appliqué le commit au dépôt en dernier, notamment son nom, son adresse e-mail et l'horodatage du commit. Peut différer de l'auteur lorsque le commit est rebasé, modifié ou appliqué avec `git am`.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@git.committer.committed_at</code><br>Horodatage en millisecondes (UTC) de la dernière modification significative des changements (par exemple, lors d'une opération de rebase ou d'amendement).</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.committer.email</code><br>Adresse e-mail du contributeur.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@git.committer.name</code><br>Nom du contributeur.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Host" level="h3" id="host" %}}

Informations sur la machine de host où la découverte a été détectée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>architectures</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@host.architectures</code><br>Architectures associées au host.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@host.cloud_provider</code><br>Fournisseur cloud auquel appartient le host.</td>
    </tr>
    <tr>
      <td><code>image</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@host.image</code><br>Nom de l'image de host utilisée pour construire le host (par exemple, <code>ami-1234</code>).</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@host.key</code><br>Identifiant de ressource cloud canonique (CCRID).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@host.name</code><br>Nom de host.</td>
    </tr>
    <tr>
      <td><code>os</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@host.os</code><br>Attributs du système d'exploitation exécuté sur le host.</td>
    </tr>
  </tbody>
</table>

### Système d'exploitation {#operating-system}

Attributs du système d'exploitation exécuté sur le host.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@host.os.name</code><br>Nom du système d'exploitation.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@host.os.version</code><br>Version du système d'exploitation.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Ressource IaC" level="h3" id="iac-resource" %}}

Attributs identifiant la ressource Infrastructure as Code (IaC) liée à la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>module</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module</code><br>Module Terraform qui déclare la ressource affectée.</td>
    </tr>
    <tr>
      <td><code>platform</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.platform</code><br>Plateforme IaC (Infrastructure as Code) sur laquelle la vulnérabilité a été trouvée (par exemple, <code>terraform</code>, <code>kubernetes</code>).</td>
    </tr>
    <tr>
      <td><code>provider</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.provider</code><br>Fournisseur IaC (Infrastructure as Code) où la ressource est définie (par exemple, <code>aws</code>, <code>gcp</code>, <code>azure</code>).</td>
    </tr>
  </tbody>
</table>

### Module {#module}

Module Terraform qui déclare la ressource affectée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code_location</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location</code><br>Emplacement de la ressource affectée par rapport à la racine du module feuille.</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.dependency_type</code><br>Indique comment le module racine atteint le module feuille. Valeurs valides : <code>direct</code>, <code>transitive</code>.</td>
    </tr>
    <tr>
      <td><code>module_path</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path</code><br>Chaîne d'appel de module ordonnée depuis la déclaration dans votre dépôt jusqu'au module feuille. Omis pour les modules appelés directement.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.name</code><br>Étiquette Terraform du module feuille.</td>
    </tr>
    <tr>
      <td><code>source</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.source</code><br>Adresse source normalisée du module feuille, avec les identifiants supprimés.</td>
    </tr>
    <tr>
      <td><code>source_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.source_type</code><br>Type de source utilisé par le module feuille. Valeurs valides : <code>registry</code>, <code>git</code>, <code>local</code>.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.version</code><br>Version de registre résolue ou référence Git du module feuille.</td>
    </tr>
  </tbody>
</table>

### Emplacement du code {#code-location}

Emplacement de la ressource affectée par rapport à la racine du module feuille.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.code_location.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

### Chemin du module {#module-path}

Chaîne d'appel de module ordonnée depuis la déclaration dans votre dépôt jusqu'au module terminal. Omis pour les modules appelés directement.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code_location</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location</code><br>Emplacement de la déclaration du module par rapport à son appelant.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.name</code><br>Étiquette Terraform de l'appel de module.</td>
    </tr>
    <tr>
      <td><code>source</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.source</code><br>Source normalisée et sans identifiants du module appelé.</td>
    </tr>
    <tr>
      <td><code>source_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.source_type</code><br>Type de source utilisé par le module appelé. Valeurs valides : <code>registry</code>, <code>git</code>, <code>local</code>.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.version</code><br>Version de registre résolue ou référence Git du module appelé.</td>
    </tr>
  </tbody>
</table>

### Emplacement du code {#code-location-1}

Emplacement de la déclaration du module par rapport à son appelant.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@iac_resource.module.module_path.code_location.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Kubernetes" level="h3" id="k8s" %}}

Informations Kubernetes pour les constats générés à partir des ressources Kubernetes.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cluster_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@k8s.cluster_id</code><br>Identifiant du cluster Kubernetes.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Métadonnées" level="h3" id="metadata" %}}

Métadonnées supplémentaires concernant le constat, telles que la version du schéma ou le contexte de la source.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>schema_version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@metadata.schema_version</code><br>Indique la version du schéma des constats utilisée pour le constat.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Package" level="h3" id="package" %}}

Informations sur le gestionnaire de paquets. Un gestionnaire de paquets automatise l'installation, la mise à niveau, la configuration et la suppression de paquets logiciels.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>additional_names</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@package.additional_names</code><br>Noms de paquets affectés supplémentaires, si la vulnérabilité cloud a impacté plusieurs paquets dérivés du même paquet source.</td>
    </tr>
    <tr>
      <td><code>declaration</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@package.declaration</code><br>Emplacements du code de la définition du paquet.</td>
    </tr>
    <tr>
      <td><code>dependency_location_text</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.dependency_location_text</code><br>(obsolète) Représentation textuelle de l'emplacement de la dépendance, telle que le chemin du fichier où le paquet vulnérable est déclaré. Utilisation <code>custom.package.disk_locations</code> pour les chemins de fichiers sur le disque, ou <code>custom.package.declaration</code> pour l'emplacement du code où le paquet est déclaré.</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.dependency_type</code><br>Indique si le paquet est une dépendance directe, une dépendance transitive, ou non pris en charge si l'information ne peut pas être récupérée.</td>
    </tr>
    <tr>
      <td><code>disk_locations</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@package.disk_locations</code><br>Emplacements sur le disque où le paquet a été trouvé.</td>
    </tr>
    <tr>
      <td><code>has_suid</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.has_suid</code><br><code>true</code> si le paquet a le bit SUID défini ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_running</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.is_running</code><br><code>true</code> si le paquet est actuellement en cours d'exécution ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_running_as_root</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.is_running_as_root</code><br><code>true</code> si le paquet est actuellement en cours d'exécution en tant que root ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>loading_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.loading_type</code><br>Indique si le composant est toujours chargé et en cours d'exécution (<code>hot</code>), s'exécutant rarement (<code>cold</code>), ou chargé à la demande (<code>lazy</code>).</td>
    </tr>
    <tr>
      <td><code>manager</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.manager</code><br>Écosystème de gestion de paquets ou registre source dont provient le composant vulnérable.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.name</code><br>Nom du paquet ou de la bibliothèque où la vulnérabilité a été identifiée.</td>
    </tr>
    <tr>
      <td><code>normalized_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.normalized_name</code><br>Nom normalisé selon l'écosystème du paquet ou de la bibliothèque où la vulnérabilité a été identifiée.</td>
    </tr>
    <tr>
      <td><code>purl</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.purl</code><br>URL de paquet (PURL), un format standardisé qui identifie le type, l'espace de noms, le nom et la version du paquet.</td>
    </tr>
    <tr>
      <td><code>root_parents</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents</code><br>Liste des dépendances pour lesquelles le paquet est une dépendance transitive.</td>
    </tr>
    <tr>
      <td><code>scope</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.scope</code><br>Périmètre d'utilisation prévu du paquet (<code>production</code> ou <code>development</code>).</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.type</code><br>Indique la catégorie du paquet. Valeurs valides : <code>application</code> (paquet géré par un gestionnaire de paquets au niveau de l'application, tel que npm, PyPI ou Maven) et <code>os</code> (paquet géré par un gestionnaire de paquets au niveau du système d'exploitation, tel que apt, apk ou yum).</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.version</code><br>Version du paquet ou de la bibliothèque où la vulnérabilité a été identifiée.</td>
    </tr>
  </tbody>
</table>

### Déclaration {#declaration}

Emplacements de code de la définition du paquet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block</code><br>Emplacement du code qui déclare l'intégralité de la déclaration de dépendance.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name</code><br>Emplacement du code qui déclare le nom de la dépendance.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version</code><br>Version déclarée pour le parent racine.</td>
    </tr>
  </tbody>
</table>

### Bloc {#block}

Emplacement du code qui déclare l'intégralité de la déclaration de dépendance.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.block.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

### Nom {#name}

Emplacement du code qui déclare le nom de la dépendance.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.name.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

### Version {#version}

Version déclarée pour le parent racine.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.declaration.version.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

### Emplacements sur le disque {#disk-locations}

Contient les emplacements sur le disque où ce paquet a été trouvé.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.disk_locations.filename</code><br>Chemin d'accès au fichier sur le disque où le paquet a été trouvé.</td>
    </tr>
  </tbody>
</table>

### Parents racines {#root-parents}

Liste des dépendances pour lesquelles le paquet est une dépendance transitive.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>declaration</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration</code><br>Emplacement du code qui déclare la version d'un parent racine.</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.language</code><br>Langage de la dépendance pour lequel le paquet est une dépendance transitive.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.name</code><br>Nom de la dépendance pour lequel le paquet est une dépendance transitive.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.version</code><br>Version de la dépendance pour laquelle le paquet est une dépendance transitive.</td>
    </tr>
  </tbody>
</table>

### Déclaration {#declaration-1}

Emplacement du code qui déclare la version d'un parent racine.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block</code><br>Emplacement du code qui déclare l'intégralité de la déclaration de dépendance.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name</code><br>Emplacement du code qui déclare le nom de la dépendance.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version</code><br>Version déclarée pour le parent racine.</td>
    </tr>
  </tbody>
</table>

### Bloc {#block-1}

Emplacement du code qui déclare l'intégralité de la déclaration de dépendance.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.block.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

### Nom {#name-1}

Emplacement du code qui déclare le nom de la dépendance.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.name.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

### Version {#version-1}

Version déclarée pour le parent racine.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version.column_end</code><br>Position de la colonne de fin.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version.column_start</code><br>Position de la colonne de début.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version.is_test_file</code><br><code>true</code> si le fichier de code est un fichier de test ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version.line_end</code><br>Numéro de la ligne de fin.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@package.root_parents.declaration.version.url</code><br>URL pour consulter le fichier en ligne (par exemple, sur GitHub), en mettant en surbrillance l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Étapes à suivre" level="h3" id="remediation" %}}

Informations sur la remédiation de la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_image</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.base_image</code><br>Mise à niveau de l'image de base publique susceptible de remédier à la vulnérabilité héritée.</td>
    </tr>
    <tr>
      <td><code>code_update</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.code_update</code><br>Modifications de code à appliquer pour remédier à la découverte.</td>
    </tr>
    <tr>
      <td><code>codegen</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.codegen</code><br>Statut de la découverte pour la plateforme de génération de code.</td>
    </tr>
    <tr>
      <td><code>container_image</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.container_image</code><br>Version d'image de conteneur plus récente susceptible de remédier à la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.description</code><br>Description de la remédiation.</td>
    </tr>
    <tr>
      <td><code>host_image</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.host_image</code><br>Dernière version d'image de host susceptible de remédier à la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>is_available</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.is_available</code><br><code>true</code> si une remédiation est actuellement disponible pour la découverte ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>microsoft_kb</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.microsoft_kb</code><br>Stratégie de remédiation utilisant un article de la Base de connaissances Microsoft (KB).</td>
    </tr>
    <tr>
      <td><code>package</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.package</code><br>Informations sur le paquet de remédiation.</td>
    </tr>
    <tr>
      <td><code>recommended</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.recommended</code><br>Détails de la remédiation recommandée.</td>
    </tr>
    <tr>
      <td><code>recommended_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.recommended_type</code><br>Type de remédiation recommandé pour la découverte.</td>
    </tr>
    <tr>
      <td><code>root_package</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package</code><br>Informations sur le paquet racine de remédiation.</td>
    </tr>
  </tbody>
</table>

### Image de base {#base-image}

Mise à niveau de l'image de base publique susceptible de remédier à la vulnérabilité héritée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.base_image.latest_major</code><br>Dernière version majeure de l'image de base publique susceptible de remédier à la vulnérabilité héritée.</td>
    </tr>
  </tbody>
</table>

### Dernière version majeure {#latest-major}

Dernière version majeure de l'image de base publique susceptible de remédier à la vulnérabilité héritée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>image_url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.base_image.latest_major.image_url</code><br>URL de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.base_image.latest_major.name</code><br>Nom de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>repo_digest</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.base_image.latest_major.repo_digest</code><br>Empreinte du manifeste (<code>sha256:...</code>) de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.base_image.latest_major.tag</code><br>Tag de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
  </tbody>
</table>

### Mise à jour du code {#code-update}

Modifications de code à appliquer pour remédier à la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>edits</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.code_update.edits</code><br>Modifications de code requises pour remédier à la découverte.</td>
    </tr>
  </tbody>
</table>

### Modifications {#edits}

Modifications de code requises pour remédier à la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@remediation.code_update.edits.column_end</code><br>Position de la colonne de fin de la modification de code.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@remediation.code_update.edits.column_start</code><br>Position de la colonne de début de la modification de code.</td>
    </tr>
    <tr>
      <td><code>content</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.code_update.edits.content</code><br>Contenu de la modification de code.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@remediation.code_update.edits.line_end</code><br>Numéro de ligne de fin de la modification de code.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@remediation.code_update.edits.line_start</code><br>Numéro de ligne de début de la modification de code.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.code_update.edits.type</code><br>Nature de la modification de code.</td>
    </tr>
  </tbody>
</table>

### Génération de code {#codegen}

Statut de la découverte pour la plateforme de génération de code.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.codegen.id</code><br>Identifiant utilisé pour suivre la remédiation dans le backend de génération de code.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.codegen.status</code><br>Statut de la génération de correctif automatisée. Valeurs valides : <code>generated</code>, <code>not_available_non_default_branch</code>, <code>not_available_unsupported_tool</code>, <code>not_available_unsupported_rule</code>, <code>not_available_disabled</code>, <code>not_available_git_provider_not_supported</code>, <code>not_available_confidence_too_low</code>, <code>error</code>, <code>not_available_has_deterministic_fixes</code>, <code>not_available_unknown_reason</code>, <code>not_available_org_not_onboarded</code>, <code>not_available_repository_disabled</code>, <code>not_available_unsupported_resource_type</code>, <code>not_available_unsupported_ecosystem</code>, <code>not_available_severity_too_low</code>, <code>not_available_transitive_library</code>, <code>not_available_no_remediation</code>, <code>not_available_unsupported_vulnerability_type</code>.</td>
    </tr>
  </tbody>
</table>

### Image de conteneur {#container-image}

Version d'image de conteneur plus récente susceptible de remédier à la vulnérabilité.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.container_image.latest_major</code><br>Dernière version majeure de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
  </tbody>
</table>

### Dernière version majeure {#latest-major-1}

Dernière version majeure de l'image de conteneur susceptible de remédier à la vulnérabilité.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>image_url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.container_image.latest_major.image_url</code><br>URL de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.container_image.latest_major.name</code><br>Nom de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>repo_digest</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.container_image.latest_major.repo_digest</code><br>Empreinte du manifeste (<code>sha256:...</code>) de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.container_image.latest_major.tag</code><br>Tag de l'image de conteneur susceptible de remédier à la vulnérabilité.</td>
    </tr>
  </tbody>
</table>

### Image de host {#host-image}

Dernière version de l'image de host susceptible de corriger la vulnérabilité.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.host_image.latest_major</code><br>Informations sur la dernière Amazon Machine Image (AMI) susceptible de remédier à la vulnérabilité.</td>
    </tr>
  </tbody>
</table>

### Dernière version majeure {#latest-major-2}

Informations sur la dernière Amazon Machine Image (AMI) susceptible de remédier à la vulnérabilité.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.host_image.latest_major.name</code><br>Nom de la dernière Amazon Machine Image (par exemple, <code>ami-12345678</code>) susceptible de remédier à la vulnérabilité.</td>
    </tr>
  </tbody>
</table>

### Microsoft KB {#microsoft-kb}

Stratégie de remédiation utilisant un article de la Base de connaissances (KB) Microsoft.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_fix_advisory</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@remediation.microsoft_kb.closest_fix_advisory</code><br>Le correctif le plus proche disponible pour traiter l'avis actuel.</td>
    </tr>
  </tbody>
</table>

### Avis de correctif le plus proche {#closest-fix-advisory}

Le correctif le plus proche disponible pour traiter l'avis actuel.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>article</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.microsoft_kb.closest_fix_advisory.article</code><br>Nom de l'article pour le correctif le plus proche.</td>
    </tr>
  </tbody>
</table>

### Paquet {#package}

Informations sur le paquet de remédiation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base</code><br>Version actuelle du package sur laquelle la découverte a été détectée, avant l'application de toute remédiation.</td>
    </tr>
    <tr>
      <td><code>closest_minimum_risk_only_no_fix_vulnerabilities</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities</code><br>Version de package la plus proche qui ne contient que des vulnérabilités pour lesquelles aucun correctif n'est disponible, minimisant ainsi l'exposition aux risques.</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical</code><br>Version de package la plus proche sans vulnérabilités critiques (basée sur le score de base).</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities</code><br>Version de paquet la plus proche sans vulnérabilités.</td>
    </tr>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical</code><br>La version du package de remédiation la plus récente sans vulnérabilités critiques (basée sur le score de base).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities</code><br>Version de package la plus récente sans vulnérabilités.</td>
    </tr>
  </tbody>
</table>

### Base {#base}

Version actuelle du package sur laquelle la découverte a été détectée, avant l'application de toute remédiation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.base.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Vulnérabilités sans correctif – Risque minimal le plus proche uniquement {#closest-minimum-risk-only-no-fix-vulnerabilities}

Version de paquet la plus proche ne contenant que des vulnérabilités pour lesquelles aucun correctif n'est disponible, minimisant ainsi l'exposition au risque.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-1}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-1}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-1}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Le plus proche sans vulnérabilité critique {#closest-no-critical}

Version de paquet la plus proche sans vulnérabilités critiques (basée sur le score de base).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-2}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-2}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-2}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_critical.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Version sans vulnérabilités la plus proche {#closest-no-vulnerabilities}

Version du paquet la plus proche sans vulnérabilités.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-3}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-3}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-3}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Dernière version sans vulnérabilité critique {#latest-no-critical}

La dernière version du paquet de remédiation sans vulnérabilités critiques (basée sur le score de base).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-4}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-4}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-4}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_critical.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Dernière version sans vulnérabilités {#latest-no-vulnerabilities}

Dernière version du paquet sans vulnérabilités.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-5}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-5}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-5}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Paquet racine {#root-package}

Informations sur le paquet racine de remédiation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base</code><br>Version actuelle du package sur laquelle la découverte a été détectée, avant l'application de toute remédiation.</td>
    </tr>
    <tr>
      <td><code>closest_minimum_risk_only_no_fix_vulnerabilities</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities</code><br>Version de package la plus proche qui ne contient que des vulnérabilités pour lesquelles aucun correctif n'est disponible, minimisant ainsi l'exposition aux risques.</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical</code><br>Version de package la plus proche sans vulnérabilités critiques (basée sur le score de base).</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities</code><br>Version de paquet la plus proche sans vulnérabilités.</td>
    </tr>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical</code><br>La version du package de remédiation la plus récente sans vulnérabilités critiques (basée sur le score de base).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities</code><br>Version de package la plus récente sans vulnérabilités.</td>
    </tr>
  </tbody>
</table>

### Base {#base-1}

Version actuelle du package sur laquelle la découverte a été détectée, avant l'application de toute remédiation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-6}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-6}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-6}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.base.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Vulnérabilités sans correctif – Risque minimal le plus proche uniquement {#closest-minimum-risk-only-no-fix-vulnerabilities-1}

Version de paquet la plus proche ne contenant que des vulnérabilités pour lesquelles aucun correctif n'est disponible, minimisant ainsi l'exposition au risque.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-7}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-7}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-7}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Le plus proche sans vulnérabilité critique {#closest-no-critical-1}

Version de paquet la plus proche sans vulnérabilités critiques (basée sur le score de base).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-8}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-8}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-8}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Version sans vulnérabilités la plus proche {#closest-no-vulnerabilities-1}

Version du paquet la plus proche sans vulnérabilités.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-9}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-9}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-9}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Dernière version sans vulnérabilité critique {#latest-no-critical-1}

La dernière version du paquet de remédiation sans vulnérabilités critiques (basée sur le score de base).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-10}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-10}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-10}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Dernière version sans vulnérabilités {#latest-no-vulnerabilities-1}

Dernière version du paquet sans vulnérabilités.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories</code><br>Avis que la remédiation corrigera.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.has_incomplete_data</code><br>Indicateur permettant de savoir si la remédiation peut avoir des données de dépendance incomplètes et peut donc ne pas être précise à 100 %.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.is_auto_solvable</code><br>Indicateur permettant de savoir si la remédiation est auto-résolvable (seule une recompilation est nécessaire).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.name</code><br>Nom du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories</code><br>Avis qui apparaîtront si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.original_name</code><br>Nom original du paquet recommandé qui corrige la découverte.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories</code><br>Avis qui resteront non corrigés si la remédiation est appliquée.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.version</code><br>Version du paquet recommandée qui corrige la découverte.</td>
    </tr>
  </tbody>
</table>

### Avis corrigés {#fixed-advisories-11}

Avis que la remédiation corrigera.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Nouveaux avis {#new-advisories-11}

Avis qui apparaîtront si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

### Avis restants {#remaining-advisories-11}

Avis qui resteront non corrigés si la remédiation est appliquée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Gravité de base de l'avis.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories.id</code><br>Identifiant de l'avis.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Risque" level="h3" id="risk" %}}

Attributs liés au risque pour la découverte. Chaque clé doit avoir une clé correspondante dans l'espace de noms `risk_details`.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.has_exploit_available</code><br><code>true</code> si des exploits connus existent pour la découverte ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.has_high_exploitability_chance</code><br><code>true</code> si le score EPSS (Exploit Prediction Scoring System) est supérieur à 1 %; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.has_privileged_access</code><br><code>true</code> si la ressource de la découverte s'exécute avec des privilèges élevés ou a la capacité d'assumer un rôle privilégié ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.has_sensitive_data</code><br><code>true</code> si la découverte a accès à une ressource qui contient des données sensibles ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_authenticated</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_authenticated</code><br><code>true</code> si l'endpoint de l'API nécessite une authentification pour y accéder ; <code>false</code> si l'endpoint ne nécessite pas d'authentification. Omis si le statut d'authentification est inconnu.</td>
    </tr>
    <tr>
      <td><code>is_crown_jewel</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_crown_jewel</code><br><code>true</code> si la ressource affectée est critique pour votre entreprise ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_emerging</code><br><code>true</code> si la vulnérabilité est liée à un avis classé comme vulnérabilité émergente ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_exposed_to_attacks</code><br><code>true</code> si des attaques ont déjà été détectées sur la ressource ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_function_reachable</code><br><code>true</code> si la fonction vulnérable peut être exécutée ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_image_running</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_image_running</code><br><code>true</code> si l'image de la ressource de la découverte contient des conteneurs ou des hosts en cours d'exécution ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_kernel_running</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_kernel_running</code><br><code>true</code> si la vulnérabilité affecte le noyau actuellement en cours d'exécution sur le host ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_package_running</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_package_running</code><br><code>true</code> si le paquet de la ressource de la découverte est en cours d'exécution ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_production</code><br><code>true</code> si la ressource de la découverte est en cours d'exécution en production ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_publicly_accessible</code><br><code>true</code> si la ressource de la découverte est accessible publiquement ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_tainted_from_database</code><br><code>true</code> si la chaîne est polluée car elle provient d'une source de base de données non fiable ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_tainted_from_query_string</code><br><code>true</code> si la chaîne est polluée par des éléments dérivés d'une chaîne de requête HTTP ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_tainted_from_request_url</code><br><code>true</code> si l'URL finale contient des parties polluées provenant de l'URL de la requête ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk.is_using_sha1</code><br><code>true</code> si SHA1 est utilisé dans un hachage faible ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Détails du risque" level="h3" id="risk-details" %}}

Facteurs de risque contextuels qui aident à évaluer l'impact potentiel d'une découverte. Ces champs décrivent des caractéristiques telles que l'exposition, la sensibilité et les signes d'exploitation active.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_exploit_available</code><br>Information permettant de savoir si un exploit connu existe pour l'avis de découverte.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_high_exploitability_chance</code><br>Preuves et indicateurs permettant de savoir si la vulnérabilité est susceptible d'être exploitée sur la base de l'EPSS (Exploit Prediction Scoring System).</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_privileged_access</code><br>Preuves et indicateurs permettant de savoir si la ressource dispose d'un accès privilégié.</td>
    </tr>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_sensitive_data</code><br>Preuves et indicateurs permettant de savoir si la ressource affectée contient des données sensibles.</td>
    </tr>
    <tr>
      <td><code>is_authenticated</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_authenticated</code><br>Preuves et indicateurs permettant de savoir si l'endpoint de l'API nécessite une authentification.</td>
    </tr>
    <tr>
      <td><code>is_crown_jewel</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_crown_jewel</code><br>Preuves et indicateurs permettant de savoir si la ressource affectée est critique.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_emerging</code><br>Preuves et indicateurs permettant de savoir si la vulnérabilité est classée comme une vulnérabilité émergente.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_exposed_to_attacks</code><br>Preuves et indicateurs permettant de savoir si le service où la découverte a été détectée est exposé aux attaques.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable</code><br>Preuves et indicateurs permettant de savoir si la fonction ou le module vulnérable est utilisé dans le code.</td>
    </tr>
    <tr>
      <td><code>is_image_running</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_image_running</code><br>Preuves et indicateurs permettant de savoir si l'image affectée possède des conteneurs ou des hosts en cours d'exécution.</td>
    </tr>
    <tr>
      <td><code>is_kernel_running</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_kernel_running</code><br>Preuves et indicateurs permettant de savoir si la vulnérabilité affecte le noyau actuellement en cours d'exécution sur le host.</td>
    </tr>
    <tr>
      <td><code>is_package_running</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_package_running</code><br>Preuves et indicateurs permettant de savoir si le paquet affecté est en cours d'exécution.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_production</code><br>Preuves et indicateurs permettant de savoir si la ressource associée à la découverte est en cours d'exécution dans un environnement de production.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_publicly_accessible</code><br>Informations permettant de savoir si la ressource affectée est accessible depuis l'Internet public.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_database</code><br>Informations indiquant si les parties corrompues proviennent d'une base de données.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_query_string</code><br>Informations indiquant si les parties corrompues proviennent d'une chaîne de requête.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_request_url</code><br>Informations indiquant si les parties corrompues proviennent de l'URL de la requête.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_using_sha1</code><br>Informations indiquant si SHA1 est utilisé dans un hachage faible.</td>
    </tr>
  </tbody>
</table>

### Possède un exploit disponible {#has-exploit-available}

Informations indiquant si un exploit connu existe pour la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_exploit_available.evidence</code><br>Preuve de la disponibilité d'un exploit.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_exploit_available.impact_cvss</code><br>Comment la disponibilité d'exploits connus modifie le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_exploit_available.value</code><br><code>true</code> si des exploits connus existent pour la découverte ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence}

Preuve de la disponibilité d'un exploit.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>exploit_sources</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_exploit_available.evidence.exploit_sources</code><br>Sources d'exploit associées à la découverte (par exemple, <code>NIST</code>, <code>CISA</code>, <code>Exploit-DB</code>).</td>
    </tr>
    <tr>
      <td><code>exploit_urls</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_exploit_available.evidence.exploit_urls</code><br>URL d'exploit associées à la découverte.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_exploit_available.evidence.type</code><br>Type de preuve de disponibilité d'un exploit. Valeurs valides : <code>production_ready</code>, <code>poc</code>, <code>unavailable</code>.</td>
    </tr>
  </tbody>
</table>

### Possède une forte probabilité d'exploitabilité {#has-high-exploitability-chance}

Preuves et indicateurs sur la probabilité d'exploitation de la vulnérabilité basés sur l'EPSS (Exploit Prediction Scoring System).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_high_exploitability_chance.evidence</code><br>Preuve pour le score EPSS.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_high_exploitability_chance.impact_cvss</code><br>Comment une probabilité d'exploitabilité élevée affecte le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_high_exploitability_chance.value</code><br><code>true</code> si le score EPSS est supérieur à 1 % ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-1}

Preuve pour le score EPSS.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>epss_score</code></td>
      <td>nombre</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_score</code><br>Score EPSS en pourcentage représentant la probabilité d'exploitation.</td>
    </tr>
    <tr>
      <td><code>epss_severity</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_severity</code><br>Niveau de gravité du score EPSS. Valeurs valides : <code>Critical</code>, <code>High</code>, <code>Medium</code>, <code>Low</code>.</td>
    </tr>
    <tr>
      <td><code>threshold</code></td>
      <td>nombre</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_high_exploitability_chance.evidence.threshold</code><br>Score EPSS minimum requis pour qu'une vulnérabilité soit considérée comme ayant une probabilité d'exploitabilité élevée.</td>
    </tr>
  </tbody>
</table>

### Possède un accès privilégié {#has-privileged-access}

Preuves et indicateurs permettant de déterminer si la ressource dispose d'un accès privilégié.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_privileged_access.evidence</code><br>Preuves démontrant un accès privilégié.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_privileged_access.impact_cvss</code><br>Comment l'accès privilégié modifie le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_privileged_access.value</code><br><code>true</code> si la ressource associée à la découverte dispose d'un accès privilégié ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-2}

Preuve attestant d'un accès privilégié.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_privileged_access.evidence.resource_key</code><br>Identifiant de ressource cloud canonique avec preuve d'accès privilégié.</td>
    </tr>
  </tbody>
</table>

### Contient des données sensibles {#has-sensitive-data}

Preuves et indicateurs permettant de déterminer si la ressource affectée contient des données sensibles.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_sensitive_data.evidence</code><br>Preuve attestant de la présence de données sensibles.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_sensitive_data.impact_cvss</code><br>Comment la présence de données sensibles modifie le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_sensitive_data.value</code><br>Identique à <code>risk.has_sensitive_data</code>.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-3}

Preuve attestant de la présence de données sensibles.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sds_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.has_sensitive_data.evidence.sds_id</code><br>Identifiant d'une entrée de données sensibles détectée par le Datadog Sensitive Data Scanner.</td>
    </tr>
  </tbody>
</table>

### Est authentifié {#is-authenticated}

Preuves et indicateurs concernant l'exigence d'authentification pour l'endpoint de l'API.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_authenticated.value</code><br>Identique à <code>risk.is_authenticated</code>.</td>
    </tr>
  </tbody>
</table>

### Est un joyau de la couronne {#is-crown-jewel}

Preuves et indicateurs concernant le caractère critique de la ressource affectée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_crown_jewel.evidence</code><br>Preuves utilisées pour identifier la ressource comme étant critique.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_crown_jewel.impact_cvss</code><br>Comment la criticité de la ressource modifie le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_crown_jewel.value</code><br><code>true</code> si la ressource est critique pour votre activité ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-4}

Preuves utilisées pour identifier la ressource comme étant critique.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>explanation</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_crown_jewel.evidence.explanation</code><br>Explication détaillant pourquoi la ressource ou la ressource associée est identifiée comme critique.</td>
    </tr>
    <tr>
      <td><code>related_resource_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_crown_jewel.evidence.related_resource_name</code><br>Nom d'un actif critique à longue durée de vie, tel qu'un service critique, qui justifie pourquoi la ressource affectée est considérée comme critique.</td>
    </tr>
    <tr>
      <td><code>related_resource_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_crown_jewel.evidence.related_resource_type</code><br>Type de l'actif critique à longue durée de vie qui justifie pourquoi la ressource affectée est considérée comme critique.</td>
    </tr>
    <tr>
      <td><code>sensitive_data</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_crown_jewel.evidence.sensitive_data</code><br>Types de données sensibles détectés sur la ressource qui contribuent à sa classification en tant qu'actif critique (par exemple, <code>visa_credit_card</code>).</td>
    </tr>
  </tbody>
</table>

### Est émergente {#is-emerging}

Preuves et indicateurs permettant de déterminer si la vulnérabilité est classée comme vulnérabilité émergente.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_emerging.impact_cvss</code><br>Comment le statut de vulnérabilité émergente affecte le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_emerging.value</code><br>Identique à <code>risk.is_emerging</code>.</td>
    </tr>
  </tbody>
</table>

### Est exposée aux attaques {#is-exposed-to-attacks}

Preuves et indicateurs permettant de déterminer si le service sur lequel la découverte a été détectée est exposé aux attaques.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_exposed_to_attacks.evidence</code><br>Preuve de la présence d'attaques.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_exposed_to_attacks.impact_cvss</code><br>Comment l'exposition de la ressource affecte le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_exposed_to_attacks.value</code><br>Identique à <code>risk.is_exposed_to_attacks</code>.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-5}

Preuve de la présence d'attaques.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>attacks_details</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_exposed_to_attacks.evidence.attacks_details</code><br>Détails sur l'une des attaques détectées.</td>
    </tr>
    <tr>
      <td><code>trace_example</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_example</code><br>Exemple de trace avec des attaques détectées sur la ressource de la découverte.</td>
    </tr>
    <tr>
      <td><code>trace_query</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_query</code><br>Requête utilisée pour trouver des traces avec des attaques liées à la ressource de la découverte.</td>
    </tr>
  </tbody>
</table>

### La fonction est-elle accessible {#is-function-reachable}

Éléments probants et indicateurs permettant de déterminer si la fonction ou le module vulnérable est utilisé dans le code.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence</code><br>Preuves utilisées pour déterminer si la fonction est accessible.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.impact_cvss</code><br>Comment l'accessibilité de la fonction modifie l'évaluation des risques CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.value</code><br><code>true</code> si la fonction est accessible ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-6}

Preuves utilisées pour déterminer si la fonction est accessible.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is_supported</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence.is_supported</code><br><code>true</code> si l'analyse d'accessibilité est prise en charge pour ce résultat, <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>locations</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence.locations</code><br>Tableau des emplacements de code où la fonction est appelée.</td>
    </tr>
    <tr>
      <td><code>not_supported_reason</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence.not_supported_reason</code><br>Raison pour laquelle l'analyse d'accessibilité n'est pas prise en charge pour ce résultat. Valeurs valides : <code>language_not_supported</code>, <code>vulnerable_symbol_not_available</code>.</td>
    </tr>
    <tr>
      <td><code>unreachable_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence.unreachable_at</code><br>Horodatage en millisecondes (UTC) auquel le résultat passe à un état inaccessible si la fonction vulnérable n'est pas appelée.</td>
    </tr>
  </tbody>
</table>

### Emplacements {#locations}

Tableau des emplacements de code où la fonction est appelée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence.locations.filename</code><br>Chemin relatif vers le fichier.</td>
    </tr>
    <tr>
      <td><code>last_detected_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence.locations.last_detected_at</code><br>Horodatage en millisecondes (UTC) de la détection la plus récente de cette fonction à l'emplacement du code.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence.locations.line_start</code><br>Numéro de la ligne de début.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_function_reachable.evidence.locations.symbol</code><br>Nom du symbole à l'emplacement du code.</td>
    </tr>
  </tbody>
</table>

### L'image est-elle en cours d'exécution {#is-image-running}

Preuves et indicateurs concernant le fait que l'image affectée possède des conteneurs ou des hosts en cours d'exécution.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_image_running.evidence</code><br>Éléments probants démontrant que des conteneurs ou des hosts sont en cours d'exécution.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_image_running.impact_cvss</code><br>Comment l'exécution de conteneurs ou de hosts affecte le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_image_running.value</code><br><code>true</code> si l'image de la ressource de la découverte contient des conteneurs ou des hosts en cours d'exécution ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-7}

Preuve démontrant l'exécution de conteneurs ou de hosts.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>detected_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_image_running.evidence.detected_at</code><br>Horodatage de la détection des conteneurs ou hosts en cours d'exécution.</td>
    </tr>
  </tbody>
</table>

### Le noyau est-il en cours d'exécution {#is-kernel-running}

Preuves et indicateurs permettant de savoir si la vulnérabilité affecte le noyau actuellement exécuté sur le host.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_kernel_running.evidence</code><br>Preuve démontrant que la vulnérabilité affecte le noyau en cours d'exécution.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_kernel_running.value</code><br><code>true</code> si la vulnérabilité affecte le noyau actuellement en cours d'exécution sur le host ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-8}

Preuve démontrant que la vulnérabilité affecte le noyau en cours d'exécution.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>kernel_version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_kernel_running.evidence.kernel_version</code><br>Version du noyau actuellement en cours d'exécution sur le host.</td>
    </tr>
  </tbody>
</table>

### Le paquet est-il en cours d'exécution {#is-package-running}

Preuves et indicateurs concernant l'exécution du paquet affecté.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_package_running.impact_cvss</code><br>Comment l'exécution d'un paquet affecte le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_package_running.value</code><br><code>true</code> si le paquet de la ressource de la découverte est en cours d'exécution ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Est en production {#is-production}

Preuves et indicateurs concernant l'exécution de la ressource associée à la découverte dans un environnement de production.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_production.evidence</code><br>La <code>env</code> valeur de tag qui détermine si la ressource est en production.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_production.impact_cvss</code><br>Comment le statut de l'environnement de production affecte le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_production.value</code><br>Identique à <code>risk.is_production</code>.</td>
    </tr>
  </tbody>
</table>

### Est accessible publiquement {#is-publicly-accessible}

Informations sur le fait que la ressource affectée est accessible depuis l'internet public.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_publicly_accessible.evidence</code><br>Preuve démontrant l'accès depuis l'internet.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_publicly_accessible.impact_cvss</code><br>Comment l'accessibilité publique affecte le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_publicly_accessible.value</code><br>Identique à <code>risk.is_publicly_accessible</code>.</td>
    </tr>
  </tbody>
</table>

### Preuve {#evidence-9}

Preuve démontrant l'accès depuis l'internet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_publicly_accessible.evidence.resource_key</code><br>Identifiant de ressource cloud canonique de la ressource accessible depuis l'internet.</td>
    </tr>
  </tbody>
</table>

### Est contaminée par une base de données {#is-tainted-from-database}

Informations sur le fait que les parties contaminées proviennent d'une base de données.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_database.impact_cvss</code><br>Comment la contamination par base de données modifie le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_database.value</code><br><code>true</code> si la chaîne est polluée car elle provient d'une source de base de données non fiable ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Est contaminée par une chaîne de requête {#is-tainted-from-query-string}

Informations sur le fait que les parties contaminées proviennent d'une chaîne de requête.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_query_string.impact_cvss</code><br>Comment la contamination par chaîne de requête modifie le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_query_string.value</code><br><code>true</code> si la chaîne contient des éléments dérivés d'une chaîne de requête HTTP ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Est contaminée par l'URL de requête {#is-tainted-from-request-url}

Informations sur le fait que les parties contaminées proviennent de l'URL de requête.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_request_url.impact_cvss</code><br>Comment la contamination par l'URL de requête modifie le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_tainted_from_request_url.value</code><br><code>true</code> si l'URL finale contient des parties polluées provenant de l'URL de la requête ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

### Utilise SHA1 {#is-using-sha1}

Informations sur l'utilisation de SHA1 dans un hachage faible.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_using_sha1.impact_cvss</code><br>Comment l'utilisation de SHA1 modifie le score CVSS. Valeurs valides : <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@risk_details.is_using_sha1.value</code><br><code>true</code> si SHA1 est utilisé dans un hachage faible ; <code>false</code> sinon.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Règle :" level="h3" id="rule" %}}

Comment découvrir une vulnérabilité. Les résultats de vulnérabilité avec des règles indiquent que la vulnérabilité a été détectée dans le code source ou le code en cours d'exécution. Les règles sont également utilisées pour les résultats non liés aux vulnérabilités, tels que les erreurs de configuration ou la sécurité des API.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default_rule_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@rule.default_rule_id</code><br>Identifiant par défaut de la règle.<p-... /> Vide s'il s'agit d'une règle personnalisée.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@rule.id</code><br>Identifiant de la règle ayant généré la découverte.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@rule.name</code><br>Nom de la règle ayant généré la découverte.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@rule.type</code><br>Type de la règle ayant généré la découverte.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@rule.version</code><br>Version de la règle ayant généré la découverte.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Contexte d'exécution" level="h3" id="runtime-context" %}}

Regroupe les attributs liés au contexte d'exécution.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>database_monitoring</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.database_monitoring</code><br>Contient le contexte de surveillance de la base de données associé à la découverte.</td>
    </tr>
    <tr>
      <td><code>span_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.span_id</code><br>Identifiant de span où la découverte a été détectée. Disponible uniquement pour l'IAST (Interactive Application Security Testing).</td>
    </tr>
    <tr>
      <td><code>stacktrace_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.stacktrace_id</code><br>Identifiant de trace de pile où la découverte a été détectée. Disponible uniquement pour l'IAST (Interactive Application Security Testing).</td>
    </tr>
    <tr>
      <td><code>trace_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.trace_id</code><br>Identifiant de trace où la découverte a été détectée. Disponible uniquement pour l'IAST (Interactive Application Security Testing).</td>
    </tr>
    <tr>
      <td><code>vulnerable_services</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.vulnerable_services</code><br>Liste les versions de service en cours d'exécution affectées par la découverte, chacune identifiée par l'environnement de déploiement, la version et le SHA de commit Git.</td>
    </tr>
  </tbody>
</table>

### Database Monitoring {#database-monitoring}

Contient le contexte de surveillance de la base de données associé à la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>database_instances</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.database_monitoring.database_instances</code><br>Identifiants des instances de base de données affectées par la découverte.</td>
    </tr>
    <tr>
      <td><code>query_signature</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.database_monitoring.query_signature</code><br>Hachage de la requête SQL normalisée associée à la découverte.</td>
    </tr>
  </tbody>
</table>

### Services vulnérables {#vulnerable-services}

Liste les versions de service en cours d'exécution affectées par la découverte, chacune identifiée par l'environnement de déploiement, la version et le SHA de commit Git.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>commit_sha</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.vulnerable_services.commit_sha</code><br>Contient le SHA de commit Git du service vulnérable.</td>
    </tr>
    <tr>
      <td><code>env</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.vulnerable_services.env</code><br>Indique l'environnement de déploiement du service vulnérable (par exemple, <code>prod</code>, <code>staging</code>).</td>
    </tr>
    <tr>
      <td><code>service_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.vulnerable_services.service_name</code><br>Contient le nom du service vulnérable.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@runtime_context.vulnerable_services.version</code><br>Contient l'identifiant de version du service vulnérable.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Secret" level="h3" id="secret" %}}

Informations spécifiques aux découvertes de secrets, telles que le statut de validation du secret.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is_git_history_only</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@secret.is_git_history_only</code><br><code>true</code> si le secret n'apparaît que dans les commits passés et non dans la branche <code>HEAD</code>; <code>false</code> si le secret est présent à <code>HEAD</code>.</td>
    </tr>
    <tr>
      <td><code>validation_status</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@secret.validation_status</code><br>Résultat de la tentative de validation si le secret est actif.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Données sensibles" level="h3" id="sensitive-data" %}}

Attributs spécifiques aux découvertes du Sensitive Data Scanner (SDS).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>match_action_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@sensitive_data.match_action_type</code><br>Indique l'action de correspondance configurée sur la règle du Sensitive Data Scanner, telle que <code>redact</code> ou <code>hash</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Service" level="h3" id="service" %}}

Informations sur le service où la découverte a été détectée, y compris son nom et les métadonnées du code source.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>git_commit_sha</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@service.git_commit_sha</code><br>SHA du commit Git du dernier commit où la découverte a été détectée pour le service. Disponible uniquement lorsque l'intégration du code source est configurée.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@service.git_repository_url</code><br>URL du dépôt Git du service associé à la découverte. Disponible uniquement lorsque l'intégration du code source est configurée.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@service.name</code><br>Nom du service où la découverte a été détectée.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Détails de la gravité" level="h3" id="severity-details" %}}

Informations détaillées sur la gravité de la découverte, y compris la gravité de base et ajustée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>adjusted</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@severity_details.adjusted</code><br>Gravité ajustée de la découverte après prise en compte des facteurs contextuels ou environnementaux.</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@severity_details.base</code><br>Gravité de base de la découverte telle que définie par la règle, l'avis ou le scanner d'origine, avant tout ajustement contextuel.</td>
    </tr>
    <tr>
      <td><code>user_adjusted</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@severity_details.user_adjusted</code><br>Gravité de la découverte après application des modifications de gravité définies par l'utilisateur.</td>
    </tr>
  </tbody>
</table>

### Ajusté {#adjusted}

Gravité ajustée de la découverte après prise en compte des facteurs contextuels ou environnementaux.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>nombre</td>
      <td><strong>Chemin :</strong> <code>@severity_details.adjusted.score</code><br>Score de gravité numérique (échelle CVSS).</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@severity_details.adjusted.value</code><br>Niveau de gravité. Valeurs valides : <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@severity_details.adjusted.value_id</code><br>Représentation numérique de la gravité. Valeurs : <code>critical</code> = <code>10</code>, <code>high</code> = <code>9</code>, <code>medium</code> = <code>7</code>, <code>low</code> = <code>4</code>, <code>none</code> = <code>0</code>.</td>
    </tr>
    <tr>
      <td><code>vector</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@severity_details.adjusted.vector</code><br>Chaîne de vecteur CVSS.</td>
    </tr>
  </tbody>
</table>

### Base {#base-2}

Gravité de base de la découverte telle que définie par la règle, l'avis ou le scanner d'origine, avant tout ajustement contextuel.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>nombre</td>
      <td><strong>Chemin :</strong> <code>@severity_details.base.score</code><br>Score de gravité numérique (échelle CVSS).</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@severity_details.base.value</code><br>Niveau de gravité. Valeurs valides : <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@severity_details.base.value_id</code><br>Représentation numérique de la gravité. Valeurs : <code>critical</code> = <code>10</code>, <code>high</code> = <code>9</code>, <code>medium</code> = <code>7</code>, <code>low</code> = <code>4</code>, <code>none</code> = <code>0</code>.</td>
    </tr>
    <tr>
      <td><code>vector</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@severity_details.base.vector</code><br>Chaîne de vecteur CVSS.</td>
    </tr>
  </tbody>
</table>

### Ajusté par l'utilisateur {#user-adjusted}

Gravité de la découverte après application des modifications de gravité définies par l'utilisateur.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>nombre</td>
      <td><strong>Chemin :</strong> <code>@severity_details.user_adjusted.score</code><br>Score de gravité numérique (échelle CVSS).</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@severity_details.user_adjusted.value</code><br>Niveau de gravité. Valeurs valides : <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@severity_details.user_adjusted.value_id</code><br>Représentation numérique de la gravité. Valeurs : <code>critical</code> = <code>10</code>, <code>high</code> = <code>9</code>, <code>medium</code> = <code>7</code>, <code>low</code> = <code>4</code>, <code>none</code> = <code>0</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Vulnérabilité" level="h3" id="vulnerability" %}}

Informations spécifiques aux vulnérabilités.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cisa</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.cisa</code><br>Métadonnées de la Cybersecurity and Infrastructure Security Agency (CISA) pour la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>cisa_bod2604_remediation_timeline</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.cisa_bod2604_remediation_timeline</code><br>(obsolète) Délai maximal, en jours calendaires, pour remédier à la vulnérabilité conformément à la directive opérationnelle contraignante (BOD) 26-04 de la CISA. Valeurs valides : <code>three_days_and_forensic_triage</code>, <code>three_days</code>, <code>fourteen_days</code>, <code>sixty_days</code>, <code>fix_on_system_upgrade</code>. Datadog recalcule cette valeur lorsque les entrées de la CISA ou d'exposition changent. Utilisation <code>@vulnerability.cisa.bod2604_remediation_timeline</code> à la place.</td>
    </tr>
    <tr>
      <td><code>confidence</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.confidence</code><br>La probabilité évaluée que la vulnérabilité soit un vrai positif.</td>
    </tr>
    <tr>
      <td><code>confidence_reason</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.confidence_reason</code><br>La justification du niveau de confiance attribué.</td>
    </tr>
    <tr>
      <td><code>cwes</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.cwes</code><br>Identifiant CWE (Common Weakness Enumeration) associé à la vulnérabilité. Chaque entrée doit utiliser le <code>CWE-&lt;id&gt;</code> format (par exemple, <code>CWE-416</code>).</td>
    </tr>
    <tr>
      <td><code>first_commit</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.first_commit</code><br>Le commit dans lequel la vulnérabilité a été introduite pour la première fois.</td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.hash</code><br>Hachage de vulnérabilité utilisé pour corréler la même vulnérabilité entre l'analyse d'exécution SCA (Software Composition Analysis) et l'analyse statique.</td>
    </tr>
    <tr>
      <td><code>introduced_at_commit</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit</code><br>Contient les détails du commit Git qui a introduit la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.is_emerging</code><br><code>true</code> si la vulnérabilité est classée comme une menace émergente ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>is_inherited_from_base_image</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.is_inherited_from_base_image</code><br><code>true</code> si la vulnérabilité provient d'une couche d'image de base, <code>false</code> si elle provient d'une couche ajoutée par l'auteur de l'image de conteneur.</td>
    </tr>
    <tr>
      <td><code>last_commit</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.last_commit</code><br>Le commit dans lequel la vulnérabilité a été corrigée.</td>
    </tr>
    <tr>
      <td><code>owasp_top10_years</code></td>
      <td>tableau (entier)</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.owasp_top10_years</code><br>Les années où la vulnérabilité est apparue dans la liste OWASP Top 10 des vulnérabilités critiques.</td>
    </tr>
    <tr>
      <td><code>removed_at_commit</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit</code><br>Contient les détails du commit Git qui a supprimé la vulnérabilité.</td>
    </tr>
    <tr>
      <td><code>stack</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.stack</code><br>La stack technologique où la vulnérabilité a été trouvée.</td>
    </tr>
  </tbody>
</table>

### CISA {#cisa}

Métadonnées de la Cybersecurity and Infrastructure Security Agency (CISA) relatives à cette vulnérabilité.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>bod2604_remediation_timeline</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.cisa.bod2604_remediation_timeline</code><br>Délai maximal, en jours calendaires, pour remédier à la vulnérabilité conformément à la directive opérationnelle contraignante (BOD) 26-04 de la CISA. Valeurs valides : <code>three_days_and_forensic_triage</code>, <code>three_days</code>, <code>fourteen_days</code>, <code>sixty_days</code>, <code>fix_on_system_upgrade</code>. Datadog recalcule cette valeur lorsque les entrées de la CISA ou d'exposition changent.</td>
    </tr>
    <tr>
      <td><code>kev_added_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.cisa.kev_added_at</code><br>Horodatage en millisecondes (UTC) auquel la vulnérabilité a été ajoutée au catalogue des vulnérabilités exploitées connues (KEV) de la CISA.</td>
    </tr>
  </tbody>
</table>

### Introduit au commit {#introduced-at-commit}

Contient les détails du commit Git qui a introduit la vulnérabilité.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.author</code><br>Contient des détails sur l'auteur original du commit.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.committer</code><br>Contient des détails sur la personne ayant appliqué le commit au dépôt.</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.message</code><br>Contient le message de commit Git.</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.sha</code><br>Identifiant de commit Git (SHA).</td>
    </tr>
  </tbody>
</table>

### Auteur {#author-1}

Contient des détails sur l'auteur original du commit.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.author.authored_at</code><br>Horodatage en millisecondes (UTC) auquel les modifications d'origine ont été effectuées.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.author.email</code><br>Adresse e-mail de l'auteur du commit.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.author.name</code><br>Nom de l'auteur du commit.</td>
    </tr>
  </tbody>
</table>

### Committer {#committer-1}

Contient des détails sur la personne qui a appliqué le commit au dépôt.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.committer.committed_at</code><br>Horodatage en millisecondes (UTC) de la dernière modification significative des changements (par exemple, lors d'une opération de rebase ou d'amendement).</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.committer.email</code><br>Adresse e-mail du contributeur.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.introduced_at_commit.committer.name</code><br>Nom du contributeur.</td>
    </tr>
  </tbody>
</table>

### Supprimé au commit {#removed-at-commit}

Contient des détails sur le commit Git qui a supprimé la vulnérabilité.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.author</code><br>Contient des détails sur l'auteur original du commit.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.committer</code><br>Contient des détails sur la personne ayant appliqué le commit au dépôt.</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.message</code><br>Contient le message de commit Git.</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.sha</code><br>Identifiant de commit Git (SHA).</td>
    </tr>
  </tbody>
</table>

### Auteur {#author-2}

Contient des détails sur l'auteur original du commit.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.author.authored_at</code><br>Horodatage en millisecondes (UTC) auquel les modifications d'origine ont été effectuées.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.author.email</code><br>Adresse e-mail de l'auteur du commit.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.author.name</code><br>Nom de l'auteur du commit.</td>
    </tr>
  </tbody>
</table>

### Committer {#committer-2}

Contient des détails sur la personne qui a appliqué le commit au dépôt.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.committer.committed_at</code><br>Horodatage en millisecondes (UTC) de la dernière modification significative des changements (par exemple, lors d'une opération de rebase ou d'amendement).</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.committer.email</code><br>Adresse e-mail du contributeur.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.removed_at_commit.committer.name</code><br>Nom du contributeur.</td>
    </tr>
  </tbody>
</table>

### Pile {#stack}

La pile technologique où la vulnérabilité a été trouvée.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ecosystem</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.stack.ecosystem</code><br>L'écosystème de gestion de paquets ou le registre source dont provient le composant vulnérable.</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@vulnerability.stack.language</code><br>Le langage dans lequel la vulnérabilité a été trouvée.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Workflow" level="h3" id="workflow" %}}

Toutes les informations modifiables relatives à la gestion d'une découverte après sa détection. Inclut des champs qui peuvent être mis à jour manuellement via l'interface utilisateur ou automatiquement via des pipelines.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>auto_closed_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@workflow.auto_closed_at</code><br>Horodatage en millisecondes (UTC) auquel la découverte a été automatiquement fermée par le système.</td>
    </tr>
    <tr>
      <td><code>automations</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@workflow.automations</code><br>Informations sur les règles d'automatisation qui s'appliquent à la découverte.</td>
    </tr>
    <tr>
      <td><code>due_date</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.due_date</code><br>Règle de date d'échéance appliquée à la découverte.</td>
    </tr>
    <tr>
      <td><code>integrations</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations</code><br>Intégrations telles que Jira, Case Management ou ServiceNow utilisées pour trier et corriger la découverte.</td>
    </tr>
    <tr>
      <td><code>mute</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute</code><br>Informations de mise en sourdine et métadonnées.</td>
    </tr>
    <tr>
      <td><code>severity_override</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.severity_override</code><br>Métadonnées sur les modifications de gravité définies par l'utilisateur appliquées à la découverte.</td>
    </tr>
    <tr>
      <td><code>triage</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.triage</code><br>Informations sur l'affectation et le statut. L'affectation peut être synchronisée avec les informations de cas ou de Jira.</td>
    </tr>
  </tbody>
</table>

### Automations {#automations}

Informations sur les règles d'automatisation qui s'appliquent à la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>rule_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.automations.rule_id</code><br>Identifiant unique de la règle d'automatisation.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.automations.rule_name</code><br>Nom lisible par l'humain de la règle d'automatisation s'appliquant à la découverte.</td>
    </tr>
    <tr>
      <td><code>rule_type</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.automations.rule_type</code><br>Type de la règle d'automatisation s'appliquant au constat. Valeurs valides : <code>due_date</code>, <code>mute</code>, <code>security_inbox</code>, <code>severity_modifier</code>, <code>ticket_creation</code>.</td>
    </tr>
  </tbody>
</table>

### Date d'échéance {#due-date}

Règle de date d'échéance appliquée au constat.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>due_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@workflow.due_date.due_at</code><br>Horodatage en millisecondes (UTC) pour la date d'échéance du constat.</td>
    </tr>
    <tr>
      <td><code>is_overdue</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@workflow.due_date.is_overdue</code><br><code>true</code> si la date d'échéance a été atteinte ; <code>false</code> sinon.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.due_date.rule_id</code><br>Identifiant unique de la règle de date d'échéance appliquée au constat.</td>
    </tr>
  </tbody>
</table>

### Integrations {#integrations}

Intégrations telles que Jira, Case Management ou ServiceNow utilisées pour trier et corriger le constat.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cases</code></td>
      <td>tableau (objet)</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases</code><br>Tableau des cas associés au constat.</td>
    </tr>
    <tr>
      <td><code>jira</code></td>
      <td>tableau (chaîne)</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.jira</code><br>Clés de ticket Jira associées au constat au format <code>&lt;PROJECT&gt;-&lt;NUMBER&gt;</code> (par exemple, <code>PROJ-123</code>).</td>
    </tr>
  </tbody>
</table>

### Cas {#cases}

Tableau des cas associés au constat.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.assignee</code><br>Utilisateur affecté au cas.</td>
    </tr>
    <tr>
      <td><code>created_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.created_at</code><br>Horodatage en millisecondes (UTC) de la création du cas.</td>
    </tr>
    <tr>
      <td><code>created_by</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.created_by</code><br>Utilisateur ayant créé le cas.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.id</code><br>Identifiant unique du cas au format UUID.</td>
    </tr>
    <tr>
      <td><code>jira_issue</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.jira_issue</code><br>Ticket Jira associé au cas.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.key</code><br>Identifiant lisible par l'humain pour le cas au format <code>PROJECT-NUMBER</code> (par exemple, <code>CSMINV-66</code>).</td>
    </tr>
    <tr>
      <td><code>linear_issue</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.linear_issue</code><br>Ticket Linear associé au cas.</td>
    </tr>
    <tr>
      <td><code>servicenow_ticket</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.servicenow_ticket</code><br>Ticket ServiceNow associé au cas.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.status</code><br>Statut du cas.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.title</code><br>Titre du cas.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.updated_at</code><br>Horodatage en millisecondes (UTC) de la dernière mise à jour du cas.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.updated_by</code><br>Utilisateur ayant mis à jour le cas en dernier.</td>
    </tr>
  </tbody>
</table>

### Assigné {#assignee}

Utilisateur assigné au cas.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.assignee.id</code><br>Identifiant unique de l'utilisateur au format UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.assignee.name</code><br>Nom d'affichage de l'utilisateur.</td>
    </tr>
  </tbody>
</table>

### Créé par {#created-by}

Utilisateur ayant créé le cas.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.created_by.id</code><br>Identifiant unique de l'utilisateur au format UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.created_by.name</code><br>Nom d'affichage de l'utilisateur.</td>
    </tr>
  </tbody>
</table>

### Ticket Jira {#jira-issue}

Ticket Jira associé au cas.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>key</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.jira_issue.key</code><br>Identifiant de ticket Jira au format <code>PROJECT-NUMBER</code> (par exemple, <code>CSMSEC-103991</code>).</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.jira_issue.status</code><br>Statut actuel du ticket Jira.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.jira_issue.url</code><br>URL complète du ticket Jira.</td>
    </tr>
  </tbody>
</table>

### Ticket Linear {#linear-issue}

Ticket Linear associé au cas.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>key</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.linear_issue.key</code><br>Identifiant de ticket Linear au format <code>TEAM-NUMBER</code> (par exemple, <code>SEC-42</code>).</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.linear_issue.status</code><br>Statut actuel du ticket Linear.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.linear_issue.url</code><br>URL complète du ticket Linear.</td>
    </tr>
  </tbody>
</table>

### Ticket ServiceNow {#servicenow-ticket}

Ticket ServiceNow associé au cas.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>state</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.servicenow_ticket.state</code><br>État actuel du ticket ServiceNow.</td>
    </tr>
    <tr>
      <td><code>sys_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.servicenow_ticket.sys_id</code><br>Identifiant de ticket hexadécimal ServiceNow de 32 caractères (par exemple, 9f8c7e2d3b4a5c6d7e8f9a0b1c2d3e4f).</td>
    </tr>
    <tr>
      <td><code>table_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.servicenow_ticket.table_name</code><br>Le nom de la table où le ticket est stocké. Valeurs valides : <code>incident</code>, <code>em_event</code>.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.servicenow_ticket.url</code><br>URL directe vers le ticket ServiceNow.</td>
    </tr>
  </tbody>
</table>

### Mis à jour par {#updated-by}

Utilisateur ayant mis à jour le cas en dernier.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.updated_by.id</code><br>Identifiant unique de l'utilisateur au format UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.integrations.cases.updated_by.name</code><br>Nom d'affichage de l'utilisateur.</td>
    </tr>
  </tbody>
</table>

### Mettre en sourdine {#mute}

Informations et métadonnées de mise en sourdine.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>description</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.description</code><br>Explication en texte libre de la raison pour laquelle la découverte a été mise en sourdine.</td>
    </tr>
    <tr>
      <td><code>expire_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.expire_at</code><br>Horodatage en millisecondes (UTC) auquel la mise en sourdine expire. Si non défini, la mise en sourdine est permanente.</td>
    </tr>
    <tr>
      <td><code>is_muted</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.is_muted</code><br><code>true</code> si la découverte est mise en sourdine&nbsp;; <code>false</code> s'il est actif.</td>
    </tr>
    <tr>
      <td><code>is_muted_by_rule</code></td>
      <td>booléen</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.is_muted_by_rule</code><br><code>true</code> si la découverte est mise en sourdine par une règle d'automatisation&nbsp;; <code>false</code> sinon. Si <code>true</code>, la règle d'automatisation pertinente est référencée dans la section workflow.automations.</td>
    </tr>
    <tr>
      <td><code>muted_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.muted_at</code><br>Horodatage en millisecondes (UTC) auquel la découverte a été mise en sourdine.</td>
    </tr>
    <tr>
      <td><code>muted_by</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.muted_by</code><br>Utilisateur qui a mis en sourdine la découverte.</td>
    </tr>
    <tr>
      <td><code>reason</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.reason</code><br>Raison fournie pour la mise en sourdine de la découverte. Valeurs valides : <code>none</code>, <code>no_pending_fix</code>, <code>human_error</code>, <code>no_longer_accepted_risk</code>, <code>other</code>, <code>pending_fix</code>, <code>false_positive</code>, <code>accepted_risk</code>, <code>no_fix</code>, <code>duplicate</code>, <code>risk_accepted</code>, <code>muted_in_code</code>.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.rule_id</code><br>Identifiant unique de la règle d'automatisation ayant mis la découverte en sourdine. Uniquement défini lorsque <code>is_muted_by_rule</code> est <code>true</code>.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.rule_name</code><br>Nom lisible par l'humain de la règle d'automatisation qui a mis en sourdine la découverte. Uniquement défini lorsque <code>is_muted_by_rule</code> est <code>true</code>.</td>
    </tr>
  </tbody>
</table>

### Mis en sourdine par {#muted-by}

Utilisateur qui a mis en sourdine la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.muted_by.id</code><br>Identifiant unique de l'utilisateur au format UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.mute.muted_by.name</code><br>Nom d'affichage de l'utilisateur.</td>
    </tr>
  </tbody>
</table>

### Remplacement de la gravité {#severity-override}

Métadonnées concernant les modifications de gravité définies par l'utilisateur appliquées à la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>description</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.severity_override.description</code><br>Description de la modification de gravité définie par l'utilisateur appliquée à la découverte.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.severity_override.rule_id</code><br>Identifiant de la règle d'automatisation de modification de la gravité qui a appliqué ce remplacement de gravité. Défini uniquement lorsque la modification a été appliquée par une règle d'automatisation.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.severity_override.rule_name</code><br>Nom de la règle d'automatisation qui a appliqué la modification de la gravité. Défini uniquement lorsque la modification a été appliquée par une règle d'automatisation.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@workflow.severity_override.updated_at</code><br>Horodatage en millisecondes (UTC) auquel la modification manuelle de la gravité a été appliquée.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.severity_override.updated_by</code><br>Utilisateur ayant appliqué la modification manuelle de la gravité.</td>
    </tr>
  </tbody>
</table>

### Mis à jour par {#updated-by-1}

Utilisateur ayant appliqué la modification manuelle de la gravité.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.severity_override.updated_by.id</code><br>Identifiant unique de l'utilisateur au format UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.severity_override.updated_by.name</code><br>Nom d'affichage de l'utilisateur.</td>
    </tr>
  </tbody>
</table>

### Triage {#triage}

Informations sur l'affectation et le statut. L'affectation peut être synchronisée avec les informations de cas ou de Jira.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.triage.assignee</code><br>Utilisateur affecté à la découverte.</td>
    </tr>
  </tbody>
</table>

### Assigné {#assignee-1}

Utilisateur affecté à la découverte.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.triage.assignee.id</code><br>Identifiant unique au format UUID pour l'assigné.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.triage.assignee.name</code><br>Nom d'affichage de l'assigné.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>entier</td>
      <td><strong>Chemin :</strong> <code>@workflow.triage.assignee.updated_at</code><br>Horodatage en millisecondes (UTC) de la dernière modification de l'assigné.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>objet</td>
      <td><strong>Chemin :</strong> <code>@workflow.triage.assignee.updated_by</code><br>Utilisateur ayant modifié l'assigné en dernier.</td>
    </tr>
  </tbody>
</table>

### Mis à jour par {#updated-by-2}

Utilisateur ayant modifié l'assigné en dernier.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nom de l'attribut</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.triage.assignee.updated_by.id</code><br>Identifiant unique de l'utilisateur au format UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>chaîne</td>
      <td><strong>Chemin :</strong> <code>@workflow.triage.assignee.updated_by.name</code><br>Nom d'affichage de l'utilisateur.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}