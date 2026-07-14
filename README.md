# Sistema de Gestión de Deportes para Clientes de Gimnasio
## Descripción
Este sistema de gestión de deportes para clientes de gimnasio es una aplicación web que permite a los administradores del gimnasio gestionar los deportes, clientes y asignaciones de deportes a clientes.

## Stack
* Node.js como servidor
* Express.js como framework
* MongoDB como base de datos
* Mongoose como ORM

## Instalación
1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Configurar la variable de entorno `MONGO_URI` con la conexión a la base de datos de MongoDB
4. Iniciar el servidor con `npm start`

## Docker
1. Construir la imagen con `docker build -t sistema-deportes .`
2. Iniciar el contenedor con `docker run -p 5000:5000 sistema-deportes`

## Endpoints
La aplicación tiene los siguientes endpoints:
### Autenticación
* `POST /api/auth/register`: Registrar un nuevo usuario
* `POST /api/auth/login`: Iniciar sesión

### Deportes
* `GET /api/deportes`: Listar deportes (requiere autenticación)
* `POST /api/deportes`: Crear deporte (requiere autenticación)
* `GET /api/deportes/:id`: Obtener deporte por ID (requiere autenticación)
* `PUT /api/deportes/:id`: Actualizar deporte (requiere autenticación)
* `DELETE /api/deportes/:id`: Eliminar deporte (requiere autenticación)

### Clientes
* `GET /api/clientes`: Listar clientes (requiere autenticación)
* `POST /api/clientes`: Crear cliente (requiere autenticación)
* `GET /api/clientes/:id`: Obtener cliente por ID (requiere autenticación)
* `PUT /api/clientes/:id`: Actualizar cliente (requiere autenticación)
* `DELETE /api/clientes/:id`: Eliminar cliente (requiere autenticación)

### Asignaciones
* `GET /api/asignaciones`: Listar asignaciones de deportes a clientes (requiere autenticación)
* `POST /api/asignaciones`: Asignar deporte a cliente (requiere autenticación)
* `GET /api/asignaciones/:id`: Obtener asignación por ID (requiere autenticación)
* `PUT /api/asignaciones/:id`: Actualizar asignación (requiere autenticación)
* `DELETE /api/asignaciones/:id`: Eliminar asignación (requiere autenticación)

## Modelo Principal
El modelo principal es `Deporte`, que tiene los siguientes campos:
* `nombre`: String
* `descripcion`: String

## Seguridad
La aplicación tiene las siguientes medidas de seguridad:
* Autenticación con tokens JSON Web Tokens (JWT)
* Autorización con middleware de autenticación
* Validación de entrada de datos con Joi
* Protección contra ataques de inyección SQL y cross-site scripting (XSS)
* Uso de HTTPS para cifrar la comunicación entre el cliente y el servidor
* Configuración de seguridad de MongoDB para evitar accesos no autorizados a la base de datos.