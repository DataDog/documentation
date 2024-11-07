---
description: Azure App Services の Datadog サポート
title: Azure App Services のサポート
---

| 略語 | 機能 |
| ------------ | ------- |
| IM | インテグレーションメトリクス |
| IL | Azure インテグレーションログ |
| T | トレーシング |
| CM | カスタムメトリクス |
| P | プロファイリング |
| DL | 直接ロギング |

### Windows

<table>
    <tr>
        <th>App Type</th>
        <th>Plan</th>
        <th>.NET</th>
        <th>Java</th>
        <th>Node.js</th>
        <th>PHP</th>
        <th>Container</th>
    </tr>
    <tr>
        <td rowspan="3">
            Web/API App
        </td>
        <td>
            Standard + Premium
        </td>
        <td>IM, IL, T, CM, P</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Consumption
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            App Service Environment (Isolated)
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td rowspan="3">
            Function App
        </td>
        <td>
            Standard + Premium
        </td>
        <td>IM, IL, T, CM, P</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Consumption
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            App Service Environment (Isolated)
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td rowspan="3">
            Web Jobs
        </td>
        <td>
            Standard + Premium
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Consumption
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            App Service Environment (Isolated)
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
</table>

### Linux 

<table>
    <tr>
        <th>App Type</th>
        <th>Plan</th>
        <th>.NET</th>
        <th>Java</th>
        <th>Node.js</th>
        <th>Python</th>
        <th>Ruby</th>
        <th>PHP</th>
        <th>Container</th>
    </tr>
    <tr>
        <td rowspan="3">
            Web/API App
        </td>
        <td>
            Standard + Premium
        </td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL, T+, CM+</td>
    </tr>
    <tr>
        <td>
            Consumption
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            App Service Environment (Isolated)
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td rowspan="3">
            Function App
        </td>
        <td>
            Standard + Premium
        </td>
        <td>IM, IL, T, CM, P</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Consumption
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            App Service Environment (Isolated)
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
</table>