---
description: Compatibilidad de Datadog con Azure App Services
title: Compatibilidad con Azure App Services
---

| Abreviatura | Función |
| ------------ | ------- |
| IM | Métricas de integración |
| IL | Logs de integración de Azure |
| T | Rastreo |
| CM | Métricas personalizadas |
| P | Elaboración de perfiles |
| DL | Registro directo |

### Windows

<table>
    <tr>
        <th>Tipo de aplicación</th>
        <th>Plan</th>
        <th>.NET</th>
        <th>Java</th>
        <th>Node.js</th>
        <th>PHP</th>
        <th>Contenedor</th>
    </tr>
    <tr>
        <td rowspan="3">
            Aplicación web/API
        </td>
        <td>
            Estándar + Premium
        </td>
        <td>IM, IL, T, CM, P</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Consumo
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Entorno de servicio de aplicación (aislado)
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td rowspan="3">
            Aplicación de función
        </td>
        <td>
            Estándar + Premium
        </td>
        <td>IM, IL, T, CM, P</td>
        <td>IM, IL, T+, CM+</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Consumo
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Entorno de servicio de aplicación (aislado)
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td rowspan="3">
            Trabajos web
        </td>
        <td>
            Estándar + Premium
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Consumo
        </td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
        <td>IM, IL</td>
    </tr>
    <tr>
        <td>
            Entorno de servicio de aplicación (aislado)
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
        <th>Tipo de aplicación</th>
        <th>Plan</th>
        <th>.NET</th>
        <th>Java</th>
        <th>Node.js</th>
        <th>Python</th>
        <th>Ruby</th>
        <th>PHP</th>
        <th>Contenedor</th>
    </tr>
    <tr>
        <td rowspan="3">
            Aplicación web/API
        </td>
        <td>
            Estándar + Premium
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
            Consumo
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
            Entorno de servicio de aplicación (aislado)
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
            Aplicación de función
        </td>
        <td>
            Estándar + Premium
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
            Consumo
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
            Entorno de servicio de aplicación (aislado
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