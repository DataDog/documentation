---
description: Cloud SIEM est disponible dans les produits Standalone, Add-on with Flex
  Logs et Legacy. Suivez ce guide pour déterminer quel produit votre organisation
  utilise et comparer les fonctionnalités disponibles dans chacun.
title: Déterminez le produit Cloud SIEM utilisé par votre organisation
---
## Présentation {#overview}
Cloud SIEM est disponible sous les produits suivants :
- Standalone
  - 12 mois (365 jours, utilisation mesurée en Go)
  - 15 mois (450 jours, utilisation mesurée en millions d'événements)
  <div class="alert alert-info">Les organisations qui ont adopté Standalone avant l'introduction de la rétention de 12 mois ont une période de rétention de 15 mois. La documentation fait référence aux deux en tant que Standalone, car ils offrent les mêmes fonctionnalités.</div>
- Add-on with Flex Logs
- Legacy

Standalone 12 mois est le produit par défaut pour les nouvelles organisations Cloud SIEM. Dans Standalone :
- L'utilisation est mesurée en gigaoctets de logs analysés, plutôt qu'en millions d'événements analysés.
- L'ingestion des logs indexés dans l'index Cloud SIEM est incluse dans le coût des logs analysés, plutôt que facturée séparément.
- Les données sont conservées pendant 365 jours (12 mois), plutôt que pendant 15 mois.

Il existe deux façons de savoir quel produit Cloud SIEM votre organisation utilise :
- [Vérifiez la page Plan & Usage](#plan-usage)
- [Vérifiez la page des paramètres Cloud SIEM](#settings)

Pour comparer ce que chaque produit inclut, consultez [Fonctionnalités par produit Cloud SIEM](#features).

## Vérifiez la page Plan & Usage{#plan-usage}

<div class="alert alert-info">Il est possible que vous ne puissiez pas utiliser cette option si :
  <ul>
    <li>Vous n'avez pas accès à cette page</li>
    <li>Votre organisation a configuré le multi-org ; la page Plan & Usage regroupe toutes les sous-organisations, ce qui peut faire apparaître plusieurs tuiles de produit Cloud SIEM</li>
  </ul>
  Dans les deux cas, suivez les instructions de la section <a href="#settings">Vérifiez la page des paramètres de Cloud SIEM</a> pour déterminer quel produit votre organisation utilise.
</div>

1. Dans Datadog, accédez à la page {{< ui >}}Plan & Usage{{< /ui >}} > [**Usage & Cost**][1].
1. Faites défiler jusqu'à la section **Usage Summary** et cliquez sur l'onglet {{< ui >}}Security{{< /ui >}}.
1. Trouvez la tuile qui indique quel produit Cloud SIEM votre organisation utilise :
   <table>
     <thead>
       <tr>
         <th style="width:60%">Tuile</th>
         <th style="width:40%">Produit</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>Logs analysés et indexés de sécurité</strong><br />
           {{< img src="security/cloud_siem/guide/tile_security_analyzed_indexed_logs.png" alt="Tuile étiquetée « Security Analyzed and Indexed Logs », en plus d'un montant d'utilisation et d'une indication précisant si cette utilisation était à la demande" width="50%">}}
         </td>
         <td>Standalone</td>
       </tr>
       <tr>
         <td><strong>Cloud SIEM - Analyzed Logs (Add-On)</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs_add_on.png" alt="Tuile étiquetée « Cloud SIEM - Analyzed Logs (Add-On) », en plus d'un montant d'utilisation et d'une indication précisant si cette utilisation était à la demande" width="50%">}}
         </td>
         <td>Add-on with Flex Logs</td>
       </tr>
       <tr>
         <td><strong>SIEM - Analyzed Logs</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs.png" alt="Tuile étiquetée « SIEM - Analyzed Logs », en plus d'un montant d'utilisation et d'une indication précisant si cette utilisation était à la demande" width="50%">}}
         </td>
         <td>Legacy</td>
       </tr>
     </tbody>
   </table>

## Vérifiez la page des paramètres de Cloud SIEM{#settings}

Dans Datadog, accédez à la page [Cloud SIEM settings][2]. La page affiche soit une section {{< ui >}}Core Configuration{{< /ui >}}, soit une section {{< ui >}}Settings{{< /ui >}}, ce qui indique le produit Cloud SIEM que votre organisation utilise.
<table>
  <thead>
    <tr>
      <th style="width:80%">Section Settings</th>
      <th style="width:20%">Produit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Section <strong>Core Configuration</strong> avec <strong>Index Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_index.png" alt="Paramètres de configuration incluant un en-tête Configuration principale, qui contient une section Configuration de l'index" width="80%">}}
      </td>
      <td>Standalone</td>
    </tr>
    <tr>
      <td><strong>Core Configuration</strong> section with <strong>Security Filters Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_security_filters.png" alt="Paramètres de configuration incluant un en-tête Core Configuration, qui contient une section Security Filters Configuration." width="80%">}}
      </td>
      <td>Add-on with Flex Logs</td>
    </tr>
    <tr>
      <td><strong>Sources</strong> table<br />
        {{< img src="security/cloud_siem/guide/config_sources.png" alt="Paramètres de configuration incluant un tableau Sources" width="80%">}}
      </td>
      <td>Legacy</td>
    </tr>
  </tbody>
</table>

## Fonctionnalités par produit Cloud SIEM{#features}

Le tableau suivant liste les fonctionnalités Cloud SIEM disponibles dans chaque produit.

| Fonctionnalité | Standalone | Add-on with Flex Logs | Legacy |
|---------|:----------:|:---------------------:|:------:|
| [Packs de contenu][4] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Modification des règles de détection par défaut][5] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Carte MITRE ATT&CK][6] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Filtres de sécurité][7] | | {{< X >}} | {{< X >}} |
| [Filtres d'index de logs][8] | {{< X >}} | | |
| [Vue compacte de la carte MITRE ATT&CK][6] | {{< X >}} | {{< X >}} | |
| [Règles planifiées][9] | {{< X >}} | {{< X >}} | |
| [Détections de séquences][10] | {{< X >}} | {{< X >}} | |
| [Jobs historiques][11] | {{< X >}} | {{< X >}} | |
| [Risk Insights][12] | {{< X >}} | {{< X >}} | |
| [Gravité dynamique][13] | {{< X >}} | {{< X >}} | |
| [Open Cybersecurity Schema Framework (OCSF)][14] | {{< X >}} | {{< X >}} | |
| [Threat intelligence][15] | {{< X >}} | {{< X >}} | |

Pour obtenir de l'aide pour identifier votre produit ou pour utiliser une fonctionnalité non incluse dans votre produit, contactez l'équipe en charge de votre compte Datadog ou le [support Datadog][3].

[1]: https://app.datadoghq.com/billing/usage
[2]: https://app.datadoghq.com/security/configuration/siem/setup
[3]: /fr/help/
[4]: /fr/security/cloud_siem/ingest_and_enrich/content_packs/
[5]: /fr/security/detection_rules/
[6]: /fr/security/cloud_siem/detect_and_monitor/mitre_attack_map/
[7]: /fr/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#how-security-filters-work
[8]: /fr/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#cloud-siem-standalone-filter-the-cloud-siem-index
[9]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[10]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/sequence/
[11]: /fr/security/cloud_siem/detect_and_monitor/historical_jobs/
[12]: /fr/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[13]: /fr/security/cloud_siem/detect_and_monitor/dynamic_severity/
[14]: /fr/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[15]: /fr/security/cloud_siem/ingest_and_enrich/threat_intelligence/