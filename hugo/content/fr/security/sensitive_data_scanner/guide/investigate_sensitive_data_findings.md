---
aliases:
- /fr/sensitive_data_scanner/investigate_sensitive_data_issues/
- /fr/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
- /fr/security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
description: Triez et examinez les résultats du Sensitive Data Scanner sur la page
  Findings, y compris l'analyse du rayon d'impact (Blast Radius), les services impactés,
  ainsi que l'intégration avec Case Management et Incident Management.
further_reading:
- link: sensitive_data_scanner/setup/telemetry_data/
  tag: Documentation
  text: Configurez Sensitive Data Scanner pour les données de télémétrie.
- link: sensitive_data_scanner/setup/cloud_storage/
  tag: Documentation
  text: Configurer le Sensitive Data Scanner pour Cloud Storage
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Découvrez, triez et remédiez aux problèmes de données sensibles à grande échelle
    avec Sensitive Data Scanner
title: Examiner les résultats de données sensibles
---
## Présentation {#overview}

Le Sensitive Data Scanner de Datadog peut aider à prévenir les fuites de données sensibles et à limiter les risques de non-conformité en identifiant, classant et, éventuellement, en masquant les données sensibles. Lorsqu'un résultat de données sensibles est trouvé, vous pourriez vous poser les questions suivantes :

- Quelles données sensibles ont été exposées ?
- Quelle est la priorité de l'exposition des données sensibles ?
- Quelle est la gravité du résultat en termes de propagation et de volume ?
- D'où proviennent les données sensibles ?

La page [Findings][1] du Sensitive Data Scanner catégorise et hiérarchise les résultats de données sensibles afin que vous puissiez examiner, collaborer, documenter vos résultats et répondre à ces questions.

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="Sensitive Data Scanner Findings Explorer regroupé par règle, avec la règle US Passport Scanner développée pour afficher les résultats critiques, le nombre de correspondances et les graphiques de tendance hebdomadaires." style="width:100%;" >}}

## Triez les résultats de données sensibles {#triage-sensitive-data-findings}

Accédez à la page [Findings][1] pour voir tous les résultats de données sensibles dans la période sélectionnée et commencez à les examiner.

{{< tabs >}}
{{% tab "Logs" %}}

Le Logs Findings Explorer est une expérience mise à jour pour l'examen des résultats de logs. Si vous avez au moins un résultat de log, cet Explorer s'ouvre par défaut. Les résultats APM, RUM et Events ne sont pas disponibles dans cet Explorer. Pour voir ces résultats, cliquez sur {{< ui >}}Go back{{< /ui >}} dans la bannière en haut de la page.

Pour examiner un résultat de log :

1. Utilisez {{< ui >}}Group by{{< /ui >}} pour organiser les résultats par {{< ui >}}Rule{{< /ui >}}, {{< ui >}}Logs Pattern{{< /ui >}} ou {{< ui >}}Service{{< /ui >}}. Pour faire apparaître les résultats où des données sensibles sont activement exposées, filtrez par {{< ui >}}Leaking{{< /ui >}} dans la facette {{< ui >}}Match State{{< /ui >}}.
2. Cliquez sur un résultat pour ouvrir le panneau de détails.
3. En haut du panneau, vérifiez {{< ui >}}First Detected{{< /ui >}} et {{< ui >}}Last Detected{{< /ui >}} pour comprendre depuis combien de temps l'exposition est active.
4. Dans la section récapitulative, examinez {{< ui >}}Match State{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Environment{{< /ui >}} et {{< ui >}}Total matches{{< /ui >}} pour comprendre l'étendue de l'exposition.
5. Examinez le {{< ui >}}Logs Pattern{{< /ui >}} pour comprendre le format de la ligne de log où des données sensibles ont été détectées.
6. Dans la section {{< ui >}}Example Logs{{< /ui >}}, examinez jusqu'à cinq exemples représentatifs de logs affectés. Lorsqu'un log d'exemple expire, il est remplacé par l'événement correspondant suivant. Cliquez sur {{< ui >}}Show log{{< /ui >}} pour développer un exemple et inspecter son message de log, ses champs et ses attributs en ligne. Par défaut, les logs d'exemple sont conservés pendant 7 jours et sont accessibles à tous les utilisateurs disposant de l'autorisation de lecture Data Scanner. Pour conserver ces logs représentatifs pendant une période différente, contactez le [Support][1].
7. Examinez {{< ui >}}Matches Trend{{< /ui >}} pour voir comment le volume de correspondances a évolué au cours de la semaine dernière. Utilisez {{< ui >}}Related Access and Configuration Events{{< /ui >}} pour vérifier si des événements d'accès récents ou des modifications apportées au groupe d'analyse ou à la règle d'analyse correspondent aux changements du volume de correspondances.

De plus, vous pouvez :
- Utilisez {{< ui >}}Apply Targeted Obfuscation{{< /ui >}} pour masquer les futures correspondances de données sensibles dans les nouveaux logs pour cette découverte, ou étendre le masquage à l'ensemble du service. Si le masquage est déjà activé, utilisez cette section pour vérifier comment les logs correspondants sont masqués.
- Utilisez {{< ui >}}Tune Detection Logic{{< /ui >}} pour modifier les mots-clés de la règle d'analyse ou appliquer des suppressions pour les faux positifs ou les données dont le risque est accepté.
- Utilisez {{< ui >}}Generate Code Fix{{< /ui >}} pour lancer une session [Bits Code][2] qui identifie le modèle de log à l'origine de la fuite et propose une correction. Examinez la correction et créez un pull request directement depuis la session. Le dépôt source doit déjà être intégré à Bits Code.

[1]: /fr/help
[2]: /fr/bits_ai/bits_code/

{{% /tab %}}
{{% tab "APM, RUM et Events" %}}

Dans l'onglet {{< ui >}}Sensitive Data Rule Findings{{< /ui >}}, vous pouvez filtrer vos résultats de données sensibles par statut de priorité, statut de cas et domaine.

Pour examiner un résultat :

1. Cliquez sur le résultat dans la liste.
2. Dans le panneau de résultats, cliquez sur {{< ui >}}View Recent Changes{{< /ui >}} pour accéder à [Audit Trail][3] et vérifier s'il y a eu des modifications de configuration récentes à l'origine du résultat de données sensibles.
3. Utilisez les options suivantes pour explorer différents types de données correspondant à la requête :
   1. Pour afficher tous les logs liés à la requête dans le Log Explorer, cliquez sur {{< ui >}}View All Logs{{< /ui >}}.
   1. Pour afficher toutes les traces correspondant à la requête dans Trace Explorer, cliquez sur {{< ui >}}View All APM Spans{{< /ui >}}.
   1. Pour afficher tous les événements RUM correspondant à la requête, cliquez sur {{< ui >}}View All RUM Events{{< /ui >}}.
   1. Pour afficher tous les événements correspondant à la requête, cliquez sur {{< ui >}}View All Events{{< /ui >}}.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/findings_panel_20251015.png" alt="Le panneau des découvertes affichant une découverte critique de scanner de carte Visa" style="width:50%;">}}
4. Dans la section {{< ui >}}Blast Radius{{< /ui >}} :
   1. Affichez les 10 principaux services, hosts et environnements impactés par ces résultats de données sensibles.
   1. Cliquez sur un service pour voir plus d'informations sur le service dans le {{< ui >}}Catalog{{< /ui >}}.
   1. Cliquez sur un host pour voir plus d'informations sur le host dans la page Infrastructure List.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="Le panneau des résultats affichant les 10 principaux services impactés" style="width:50%;">}}

   Pour modifier la [Scanning Rule] utilisée pour détecter le résultat de données sensibles, cliquez sur {{< ui >}}Modify Rule{{< /ui >}} en haut du panneau.

De plus, vous pouvez également :
- Utilisez [Case Management][1] pour suivre, trier et examiner le résultat. Cliquez sur {{< ui >}}Create Case{{< /ui >}} en haut du panneau. Les cas associés sont affichés sur la page [Findings].
- Utilisez [Incident Management][2] pour créer un incident. Vous pouvez ajouter le résultat à un incident existant ou déclarer un nouvel incident. Cliquez sur le menu déroulant {{< ui >}}Declare Incident{{< /ui >}} pour ajouter le résultat à un incident existant. Cliquez sur {{< ui >}}Declare Incident{{< /ui >}} pour déclarer un nouvel incident.
- Utilisez [Audit Trail][3] pour voir qui a pu accéder à ces données sensibles dans Datadog, {{< ui >}}View in Audit Trail{{< /ui >}} dans la section {{< ui >}}Users who accessed these events{{< /ui >}}.

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="La page de cas affichant des informations sur le résultat de sécurité, le responsable et le créateur du cas, ainsi qu'une chronologie des événements" style="width:60%;">}}

[1]: /fr/incident_response/work_management/
[2]: /fr/incident_response/incident_management/
[3]: /fr/account_management/audit_trail

{{% /tab %}}
{{% tab "Cloud Storage" %}}

Cliquez sur l'onglet {{< ui >}}Datastores with Sensitive Data{{< /ui >}} pour voir tous les résultats de données sensibles pour Cloud Storage.

Pour enquêter sur un datastore :

1. Cliquez sur un datastore.
1. Vous pouvez afficher les fichiers où des données sensibles ont été trouvées, puis cliquer sur un fichier pour l'inspecter dans AWS.
  Datadog recommande d'effectuer les actions suivantes :
    - Examinez quelques fichiers pour vous faire une idée de la précision de la classification.
    - Faites un suivi auprès de l'équipe ou du responsable du service indiqué dans le panneau latéral pour confirmer si les données sensibles doivent se trouver dans le bucket.
      - Si les fichiers ne sont pas censés se trouver dans le bucket, supprimez-les ou déplacez-les vers un bucket approprié.
      - Si les fichiers doivent se trouver dans le bucket, effectuez les étapes suivantes pour améliorer votre posture de sécurité :
        1. Cliquez sur l'onglet {{< ui >}}Security{{< /ui >}} dans le panneau latéral et examinez la section {{< ui >}}Misconfigurations{{< /ui >}}.
        1. Cliquez sur une mauvaise configuration pour voir les détails dans Cloud Security.
        1. Dans la section {{< ui >}}Next Steps{{< /ui >}} :
            1. Sous {{< ui >}}Triage{{< /ui >}}, cliquez sur le menu déroulant pour modifier le statut de triage du signal. Le statut par défaut est `OPEN`.
            1. Cliquez sur {{< ui >}}Assign Signal{{< /ui >}} pour vous assigner un signal ou l'assigner à un autre utilisateur Datadog.
            1. Cliquez sur {{< ui >}}See remediation{{< /ui >}} pour voir plus d'informations sur la façon de corriger le signalement.
            1. Sous {{< ui >}}More Actions{{< /ui >}}, vous pouvez ajouter un ticket Jira, exécuter des workflows ou ajouter un commentaire.
        Pour exécuter un workflow, sélectionnez {{< ui >}}Run Workflow{{< /ui >}} puis, dans le navigateur de workflow, recherchez et sélectionnez un workflow à exécuter. Consultez [Automate Security Workflows with Workflow Automation][1] pour plus d'informations.
          1. Cliquez sur les différents onglets pour voir la répartition de la gravité, les logs associés et la chronologie du résultat.

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="Le panneau latéral du datastore affichant les compartiments S3 devrait signaler une mauvaise configuration liée à l'activation de Block Public Access." style="width:90%;">}}

[1]: /fr/security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/telemetry