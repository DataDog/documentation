---
description: Prise en charge par Datadog d'Azure App Services

title: Prise en charge d'Azure App Services
---

| Abréviation | Fonctionnalité |
| ------------ | ------- |
| MI | Métriques d'intégration |
| LI | Logs d'intégration Azure |
| T | Tracing |
| MC | Métriques custom |
| P | Profiling |
| JL | Journalisation directe |

### Windows

<table>
    <tr>
        <th>Type d'application</th>
        <th>Offre</th>
        <th>.NET</th>
        <th>Java</th>
        <th>Node</th>
        <th>PHP</th>
        <th>Conteneur</th>
    </tr>
    <tr>
        <td rowspan="3">
            Application Web/API
        </td>
        <td>
            Standard et Premium
        </td>
        <td>MI, LI, T, MC, P</td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            Consommation
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            App Service Environment (isolé)
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td rowspan="3">
            Application de fonction
        </td>
        <td>
            Standard et Premium
        </td>
        <td>MI, LI, T, MC, P</td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            Consommation
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            App Service Environment (isolé)
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td rowspan="3">
            WebJobs
        </td>
        <td>
            Standard et Premium
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            Consommation
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            App Service Environment (isolé)
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
</table>

### Linux 

<table>
    <tr>
        <th>Type d'application</th>
        <th>Offre</th>
        <th>.NET</th>
        <th>Java</th>
        <th>Node</th>
        <th>Python</th>
        <th>Ruby</th>
        <th>PHP</th>
        <th>Conteneur</th>
    </tr>
    <tr>
        <td rowspan="3">
            Application Web/API
        </td>
        <td>
            Standard et Premium
        </td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI, T+, MC+</td>
    </tr>
    <tr>
        <td>
            Consommation
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            App Service Environment (isolé)
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td rowspan="3">
            Application de fonction
        </td>
        <td>
            Standard + Premium
        </td>
        <td>MI, LI, T, MC, P</td>
        <td>MI, LI, T+, MC+</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            Consommation
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
    <tr>
        <td>
            App Service Environment (isolé)
        </td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
        <td>MI, LI</td>
    </tr>
</table>