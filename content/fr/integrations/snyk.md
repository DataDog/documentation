---
categories:
  - profiling
  - security
description: Profil et signalement des vulnérabilités avec Snyk
doc_link: https://docs.datadoghq.com/integrations/snyk/
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/snyk.md
has_logo: true
integration_title: Snyk
is_public: true
kind: integration
name: snyk
public_title: Intégration Datadog/Snyk
short_description: Profil et signalement des vulnérabilités avec Snyk
version: '1.0'
integration_id: snyk
further_reading:
  - link: https://www.datadoghq.com/partner/snyk/
    tag: Page des partenaires
    text: Surveillance Snyk avec Datadog
---
## Présentation

L'intégration Snyk permet au [profileur en continu de Datadog][1] de transmettre des informations sur les vulnérabilités de vos bibliothèques Java. L'analyse des vulnérabilités et expositions de base (CVE) est effectuée à l'aide de la [base de données d'informations sur les vulnérabilités de Snyk][2].

## Configuration

### Installation

1. Créez un [compte Snyk][3].

2. Activez le [profileur en continu de Datadog][1] en suivant le [guide de configuration][4]. Seuls les clients Datadog bénéficiant du service Profileur en continu peuvent utiliser de cette intégration.

3. Installez [`datadog-ci`][5] et [`snyk`][6] :

{{< code-block lang="bash" >}}
npm install --save-dev @datadog/datadog-ci snyk
{{< /code-block >}}

4. Dans votre build, [authentifier l'interface de ligne de commande Snyk][7] :

{{< code-block lang="bash" >}}
snyk auth ”$VOTRE_TOKEN_SNYK”
{{< /code-block >}}

### Configuration

1. Dans votre build, [générez un fichier de graphique de dépendance][8] :

{{< code-block lang="bash" >}}
snyk test --print-deps --json > deps.json
{{< /code-block >}}

Si votre référentiel contient plusieurs projets, ajoutez `--file=<fichier du package>` à la commande Snyk. Exemple : `--file=<pom.xml>`. Consultez la [documentation Snyk][9] (en anglais) pour en savoir plus.

2. Pour optimiser la précision des analyses, ajoutez des tags de version et de service à votre déploiement. Consultez la rubrique [Tagging de service unifié]{10] pour en savoir plus.

3. Enfin, importez le graphique de dépendance sur Datadog :

{{< code-block lang="bash" >}}
datadog-ci dependencies upload deps.json --source snyk --service <SERVICE> --release-version <VERSION>
{{< /code-block >}}

Par défaut, cette commande envoie des requêtes à la version américaine de Datadog. Pour la version européenne, configurez la variable `DATADOG_SITE` sur `datadoghq.eu`.

Une ou deux minutes après avoir déployé votre service, la colonne « Vulnerability » de la page [Profiles][11] commence à se remplir avec le plus haut niveau de vulnérabilité du service. Pour consulter des informations détaillées sur les vulnérabilités détectées du service, accédez à l'onglet Analysis de la barre latérale (vue détaillée du service).

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/tracing/profiler/
[2]: https://snyk.io/product/vulnerability-database/
[3]: https://snyk.io/signup?utm_medium=Partner&utm_source=Datadog&utm_campaign=Datadog-Profiler-2020
[4]: https://docs.datadoghq.com/fr/tracing/profiler/#getting-started
[5]: https://github.com/DataDog/datadog-ci
[6]: https://support.snyk.io/hc/en-us/articles/360003812538-Install-the-Snyk-CLI
[7]: https://support.snyk.io/hc/en-us/articles/360004008258
[8]: https://support.snyk.io/hc/en-us/articles/360003817357-Snyk-for-Java-Gradle-Maven-#UUID-95b4d4f4-3959-49fe-fffb-d6c9e8160c5a
[9]: https://support.snyk.io/hc/en-us/articles/360003812578-CLI-reference
[10]: https://docs.datadoghq.com/fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[11]: https://app.datadoghq.com/profiling
[12]: /fr/help/