# S -1. Definición del problema y arranque profesional
# Angel Romero Barragán
# 11/01/2026
 
## 1.	¿En qué se diferencia la web app de una página web?

La web app necesita que el usuario interactúe con ella, sin embargo, la página web proporciona información y aunque dispone de elementos para la interacción no la precisa. Además, las páginas web son más sencillas y fáciles de crear, estas se construyen con HTML, CSS, y tal vez un poco de JavaScript. La web app también necesita de estos lenguajes de programación, además de PHP, Ruby o Python, y marcos como Rails, Django y Scriptcase. Las web apps son más complicadas de desarrollar.

Pero la diferencia más notoria es que las páginas web son estáticas, no hay cambios frecuentes en ellas. Con la web app sucede todo lo contrario, están constantemente actualizándose por lo que el contenido es más novedoso, además son más dinámicas.

Algunas de las web apps más famosas mundialmente son Facebook, Telegram, Pinterest, AliExpress, Reddit o Google Maps.

## 2.	Ejemplos reales de aplicaciones web profesionales

### Google Workspace

* Es una suite SaaS hospedada en la nube, diseñada para alta disponibilidad, escalabilidad global y colaboración en tiempo real.

* Está distribuido sobre infraestructura de Google Cloud, con servicios como Google Compute Engine, Kubernetes, balanceadores globales, almacenamiento distribuido y caches CDN para baja latencia y replicación global.

* La arquitectura general usa un modelo cliente-servidor distribuido, APIs REST/HTTP/GRPC, sincronización en tiempo real y mecanismos de caché a nivel mundial. 

* Usan JavaScript/TypeScript (incluyendo APIs y frontends web) para interfaces y servicios frontend.

* Internamente también se usan múltiples lenguajes según el servicio: Java, Go, C++, Python, etc. (Google es poli-lingüístico).

* Para extensiones y automatizaciones ofrecen Google Apps Script (similar a JavaScript) para personalizar Docs, Sheets, etc. 

* Google usa ingeniería de software industrial a gran escala:

  * Repositorios monolíticos con herramientas como Bazel para compilación y pruebas altamente paralelizables a nivel mundial.

  * CI/CD avanzados, revisiones de código obligatorias, pruebas automáticas y despliegue continuo global.

  * Prácticas de DevOps fuertemente integradas, incluyendo infraestructura provista como código y telemetría operativa.

  * Enfoque en seguridad por diseño y automatización del control de calidad.

### Notion
* Notion es una aplicación web colaborativa en tiempo real con sincronización de datos entre clientes (web/desktop/mobile).

* Aunque los detalles internos no son públicos al 100 %, su diseño se basa en aplicaciones web SPA (Single Page App) con APIs backend distribuidas.

* Usa mecanismos para colaboración simultánea (similar a CRDT/OT pero propietarios), almacenamiento de datos en la nube y sincronización en tiempo real.

* La app de escritorio se basa en Electron, lo que permite usar tecnologías web empaquetadas para escritorio. 

* Frontend web: construido con React (JavaScript/TypeScript).

* Backend: múltiples referencias de posiciones de ingeniería mencionan Node.js y TypeScript/JavaScript como lenguajes centrales, con bases de datos relacionales (ej. PostgreSQL) y servicios orquestados

## 3. ¿Qué problemas resuelven las aplicaciones web?

**Problemas que dan las aplicaciones de escritorio o locales:**

* El software tradicional solo funciona en una computadora específica.
* Difícil trabajar fuera de la oficina.
* Instalar software en cada equipo.
* Versiones distintas entre usuarios.
* Fallos por software desactualizado.
* Trabajar en archivos locales causa duplicados y conflictos.
* Las aplicaciones locales no escalan fácilmente.
* Riesgo de pérdida de información.
* Licencias costosas por equipo.
* Hardware potente requerido.
* Sistemas aislados que no se comunican.
* Falta de control de accesos.
* Crear y distribuir software es lento.
* Errores humanos y falta de control.

**Soluciones que dan las aplicaione web:**

* Acceso desde navegador (PC, laptop, tablet, celular).
* Solo necesitas internet y credenciales.
* Actualizaciones centralizadas en el servidor.
* Todos usan la misma versión automáticamente.
* Edición simultánea.
* Control de permisos.
* Historial de cambios.
* Escalado automático en la nube.
* Soportan miles o millones de usuarios.
* Datos almacenados en servidores centralizados.
* Respaldos automáticos y replicación.
* Modelo SaaS (pago por uso o suscripción).
* Menor dependencia de hardware local.
* APIs REST / GraphQL.
* Automatización e integración con otros servicios.
* Autenticación centralizada.
* Roles, permisos y auditorías.
* Cifrado y monitoreo.
* Despliegues continuos.
* Flujos definidos.
* Formularios, validaciones y reglas de negocio.

## 4. Arquitectura general de aplicaciones web (frontend, backend, entornos)

Una aplicación web se construye normalmente bajo un modelo cliente–servidor, dividido en capas, donde cada una tiene responsabilidades bien definidas.

### 1. Frontend (Capa de presentación)
Es la parte visible de la aplicación web. Es lo que el usuario ve y con lo que interactúa desde el navegador. Se ejecuta en el navegador del usuario (Chrome, Edge, Firefox, etc.).

**¿Qué hace?**

* Muestra interfaces (pantallas, formularios, botones).
* Captura acciones del usuario (clics, textos, eventos).
* Envía solicitudes al backend.
* Muestra los datos recibidos del servidor.

**Tecnologías comunes**

* HTML → estructura
* CSS → estilos y diseño
* JavaScript / TypeScript → lógica
* Frameworks:
  * React
  * Angular
  * Vue
  * Svelte

### 2. Backend (Capa de lógica de negocio)
Es el cerebro de la aplicación. Procesa las solicitudes del frontend y aplica las reglas del negocio. Se ejecuta en un servidor (local, VPS o nube).

**¿Qué hace?**

* Autenticación y autorización de usuarios.
* Validaciones.
* Procesamiento de datos.
* Comunicación con la base de datos.
* Exposición de APIs.

**Tecnologías comunes**

* JavaScript (Node.js)
* Python
* Java
* PHP
* C#
* Go
* Frameworks:
  * Express / NestJS
  * Django / Flask
  * Spring Boot
  * Laravel
  * ASP.NET

### 3. Base de datos (Capa de persistencia)
Es donde se almacena la información de forma permanente.

**¿Qué guarda?**

* Usuarios
* Productos
* Registros
* Historiales
* Configuraciones

**Tipos de bases de datos**

* Relacionales (SQL)
  * MySQL
  * PostgreSQL
  * SQL Server
* No relacionales (NoSQL)
  * MongoDB
  * Firebase
  * Redis

### 4. Comunicación entre capas
Flujo típico:

    1.	Usuario interactúa con el frontend
    2.	Frontend envía petición HTTP/HTTPS al backend
    3.	Backend procesa la solicitud
    4.	Backend consulta o guarda datos
    5.	Backend responde al frontend (JSON)
    6.	Frontend actualiza la interfaz 

Protocolos usados:

* HTTP / HTTPS
* WebSockets (para tiempo real)

### 5. Infraestructura y despliegue
Entornos de ejecución
Las apps web suelen tener múltiples entornos:
* Desarrollo -> Programar y probar localmente
* Pruebas / QA ->	Validación antes de producción
* Producción -> Usuarios reales

**Componentes de infraestructura**

* Servidor web (Nginx, Apache)
* Servidor de aplicaciones
* Balanceadores de carga
* CDN (Cloudflare)
* Servicios en la nube
  * AWS
  * Google Cloud
  * Azure

### 6. Seguridad

**¿Qué se protege?**

* Datos del usuario
* Acceso al sistema
* Comunicación

**Medidas comunes** 

* HTTPS (SSL/TLS)
* Autenticación (JWT, OAuth)
* Roles y permisos
* Validaciones en backend
* Protección contra ataques (XSS, SQL Injection)

## Analiza 2 plataformas reales similares a tu idea

### 1. Zocdoc

**Problema que resuelve:**

Permite a pacientes buscar doctores y agendar citas médicas online de forma rápida y sencilla, sin llamadas ni horarios de oficina. 

**Qué hace:**

* Búsqueda de médicos por especialidad y ubicación. 
* Muestra disponibilidad en tiempo real para agendar cita. 
* Permite reservar la cita directamente desde el navegador. 

Es una plataforma muy usada en EE. UU. y otros países para facilitar que los pacientes agenden citas médicas sin la complejidad de sistemas tradicionales manuales. 


### 2. Calendly

**Problema que resuelve:**

Muestra la disponibilidad y permite que otros reserven automáticamente en un horario libre, usada tanto para reuniones profesionales como citas de servicios, consultas y agendas comerciales.


**Qué hace:**

* Permite crear páginas de reserva para que clientes/agentes reserven horarios según su disponibilidad.
* Sincroniza con calendarios (Google, Outlook).
* Conflictos de agenda y reuniones mal coordinadas.