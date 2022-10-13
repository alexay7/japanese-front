# TESTS
- [ ] El generador de test predeterminados coge el número de preguntas que habría en un examen real sobre el nivel elegido.
- [ ] El generador de tests personalizados hará un test con los parámetros que diga el usuario.
- [ ] Independientemente del tipo de test, aparecerá pantalla cuando le da que le pregunta si quiere que sea cronometrado o no.
- [ ] En la opción de tests por nivel que haya opción de recuperación donde salen preguntas complicadas.
- [ ] Opción de marcar pregunta como complicada cuando aparezca en el test.
- [ ] Opción de sugerir explicaciones en preguntas que no las tengan

# STATS
- [ ] Recoger porcentajes por niveles (media de notas del N5, N4...)
- [ ] Recoger procentajes por categorías dentro de niveles (25% de acertadas en kanjis, 33% de acertadas en gramática)
- [ ] Recomendar tests según los porcentajes por categorías (Mensaje si no se han hecho tests sobre ese nivel)

# CHUMINADAS
- [ ] Botón de compartir puntuación al acabar un examen predeterminado


test component
se entra al componente y se genera un test con los parámetros indicados (al entrar se ejecuta generateTest)
se van mostrando las preguntas creadas por generate test
cuando se responde a una pregunta aparece botón para marcarla como dificil, esto lo que hace es guardar el id de la pregunta en las cookies
cuando se responde a una pregunta se van añadiendo estadísticas a una variable local, al terminar un test estas estadísticas van a las cookies para verlas luego

TIPOS DE TEST

- TEST NORMAL
Cuando le das al botón de NX, se genera un test con un % de preguntas de cada sección acorde con el examen real.
En el backend se ejecuta una función que ya tiene los porcentajes hardcodeados y devuelve las preguntas bien.
Los únicos parámetros que funcionan son el timer y el número de preguntas.

- TEST PERSONALIZADO
El usuario elige primero el nivel y ahí le salen las categorías/tipos de preguntas a elegir
se envían los parámetros al backend y este envía las preguntas

- EJERCICIOS
Página como el juego de la nintendo donde puedes elegir un nivel y te salen los ejercicios que hay y el progreso que llevas, hacer un test de estos será
como hacer un personalizado pero con valores predefinidos

- EXAMEN REAL
Se manda el nivel, año y periodo al backend y este manda todos los ejercicios de este en orden
