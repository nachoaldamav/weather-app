
Debido a las limitaciones que Google Chrome tiene para el "periodic sync", he escrito este pequeño tutorial comprobar que las notificaciones funcionan.

# **Engagement score**

Chromium tiene una tabla en la que se explica que el navegador limitará el "periodic sync" dependiendo de cuanto visite el usuario la página.

| Engagement Score | Periodic Sync  |
|--|--|
| NONE |  NEVER|
| MINIMAL |  36|
| LOW |  24|
| MEDIUM |  24|
| HIGH |  12|
| MAX |  12|

Como se necesita un uso muy habitual para llegar al nivel HIGH, aun así es imposible probarlo en tiempo real, salvo que se usen las herramientas de desarrollo de Chrome.

### *Paso 1*
Primero hay que instalar la PWA, es necesario para que se active el "periodic sync", ya que solo funciona en PWA's

### *Paso 2*
Comprobar que el Service Worker se ha instalado y activado correctamente, también, al refrescar la PWA se pedirán permisos para las notificaciones, también necesarios.

### *Paso 3*
Abrir las herramientas de desarrollo y acceder al apartado de *Aplication o Aplicación*.

A la izquierda, en el apartado de Service Worker, tendremos que escribir "get-forecast" en el input de *Periodic Sync*.

Al darle al botón se enviará una notificación con la temperatura de hoy o mañana en la localización que esté guardada en la configuración.

## **Aviso para W11**

El nuevo centro de notificaciones esconde algunas notificaciones si detecta que es una notificación parecida o que viene de la misma página.

![Tutorial](https://i.gyazo.com/a0b9a196981851a0f31794de27033fbe.gif)
