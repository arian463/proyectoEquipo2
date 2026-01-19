# Gestión de Citas para Diversos Establecimientos

Este proyecto consiste en el desarrollo de una aplicación web diseñada para modernizar la gestión de agendas en pequeñas y medianas empresas (PYMES) que aún dependen de métodos manuales o tradicionales.

## Problemática
Actualmente, muchas PYMES como consultorios médicos, centros de estética y talleres mecánicos gestionan sus citas mediante agendas físicas, hojas de cálculo o atención telefónica/WhatsApp. Esto genera los siguientes desafíos:

* **Disponibilidad limitada:** El cliente solo puede agendar en horarios de apertura, perdiendo oportunidades de negocio fuera de jornada.
* **Saturación de canales:** El personal pierde tiempo valioso en llamadas y mensajes repetitivos sobre disponibilidad.
* **Errores humanos:** El agendamiento manual es propenso a duplicidad de citas o registros incorrectos de datos.
* **Dificultad en gestión de recursos:** Falta de visibilidad sobre qué empleados o servicios tienen mayor demanda.

## Identificación de Usuarios
* **Dueños de negocios:** Propietarios de PYMES que dependen de métodos manuales para su operación diaria.
* **Clientes finales:** Personas que buscan adquirir un servicio de forma rápida y sencilla.
## Alcance del Proyecto

### Módulo de Gestión para el Negocio (Admin)
El sistema permitirá a los administradores mitigar errores humanos y mejorar la planificación mediante:
* **Configuración de servicios:** Definición de servicios ofrecidos, duración y precios.
* **Gestión de horarios y turnos:** Control de apertura y turnos de empleados para prevenir duplicidades.
* **Panel de visualización (Calendario):** Herramienta para que el dueño tenga visibilidad clara de la demanda.
* **Bloqueo de horarios:** Inhabilitación de fechas por festivos, mantenimiento o emergencias.
* **Reportes y estadísticas:** Generación de datos sobre servicios demandados y desempeño de empleados.
* **Gestión de citas:** Posibilidad de visualizar, modificar o borrar citas agendadas.

### Módulo de Reservas para el Cliente
Interfaz diseñada para optimizar la experiencia de reserva:
* **Disponibilidad 24/7:** Interfaz pública para ver disponibilidad real sin necesidad de llamar.
* **Registro estandarizado:** Formulario de datos básicos para evitar errores en la información.
* **Selección inteligente:** Selección directa del servicio y el día deseado a través de un calendario.

## Justificación
La implementación de esta plataforma digital ofrece ventajas competitivas frente a los sistemas tradicionales:
1. **Mayor disponibilidad:** Acceso desde cualquier dispositivo con internet en cualquier momento.
2. **Optimización del tiempo:** El sistema asume la carga de gestión de turnos, liberando al personal de tareas repetitivas.
3. **Integridad de información:** Uso de una base de datos centralizada que actualiza la disponibilidad en tiempo real.

## Tecnologías
El proyecto se desarrollará utilizando las siguientes tecnologías:
* **Frontend:** Next.js, React.js, Tailwind CSS, TypeScript
* **Backend:** Node.js, Express.js, TypeScript, MySQL