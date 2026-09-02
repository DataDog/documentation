1. En el campo **Detectar anomalía**, especifica los campos cuyos valores quieres analizar.
1. En el campo **agrupar por**, especifica los campos por los que desees agrupar.
    - El `group by` definido genera una señal para cada valor `group by`.
    - Normalmente, `group by` es una entidad (como un usuario o una IP). `group by` también puede unir las consultas.
    - La unión de logs que cubren un período de tiempo puede aumentar la confianza o la gravedad de la señal de seguridad. Por ejemplo, para detectar un ataque de fuerza bruta exitoso, se deben correlacionar los registros de autenticación exitosos y no exitosos de un usuario.
1. En el menú desplegable **Aprender durante**, selecciona el número de días del periodo de aprendizaje. Durante el periodo de aprendizaje, la regla define una línea base de valores de campo normales y no genera ninguna señal.
    - **Nota**: Si se modifica la regla de detección, el periodo de aprendizaje se reinicia en el día `0`.