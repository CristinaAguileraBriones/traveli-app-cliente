# Traveli App

## [Mira la APP!](https://traveli-app.netlify.app/)

## Descripción

Traveli es una plataforma en línea diseñada para facilitar la reserva de estancias en hoteles de forma rápida y sencilla. Los usuarios pueden buscar alojamiento en diferentes destinos, comparar precios, y leer descripciones y opiniones de otros viajeros para elegir la opción que mejor se adapte a sus necesidades. Traveli ofrece una interfaz intuitiva, permitiendo a los usuarios filtrar opciones según categoría, ubicación y comodidades.

#### [Client Repo here](https://github.com/CristinaAguileraBriones/traveli-app-cliente.git)

#### [Server Repo here](https://github.com/CristinaAguileraBriones/traveli-app.git)

## Tecnologías y Librerías usadas

##### HTML

##### CSS

##### JAVASCRIPT

##### REACT

##### BOOTSTRAP

##### AXIOS

##### React Context

## Funcionalidades pendientes

- Blog de opiniones.
- Panel de atención al cliente.
- Confirmación de las reservas.
- Eliminar usuarios.
- Eliminar reservas.

# Estructura del Client

## Navegación de Usuario

- **404** - El usuario puede ver una página 404 cuando navega a una página que no existe.
- **500** - El usuario puede ver una página 500 cuando ha habido un error en la App.
- **homepage** - El usuario puede acceder a la página HOME para ver de forma general la App e interactuar con ella.
- **User register** - El usuario se puede registrar como usuario.
- **User login** - El usuario puede hacer login para disfrutar de la experiencia en la web.
- **User Edit** - El usuario puede editar su perfil.
- **Reservation** - El usuario puede hacer reservas.

## Client Routes

## React Router Routes (React App)

| Path                        | Page              | Components              | Behavior                              |
| --------------------------- | ----------------- | ----------------------- | ------------------------------------- |
| `/`                         | Home              | Navbar, Footer          | Home page                             |
| `/contact`                  | Contact           |                         | Formulario de contacto                |
| `/reservas`                 | Reservas          |                         | Vista de reservas realizadas          |
| `/error`                    | Error             |                         | Vista de errores                      |
| `*`                         | Not Found         |                         | Vista de página no encontrada         |
| `/login`                    | Login             |                         | Vista de página para el login         |
| `/hotels`                   | Hotel             |                         | Vista de página ver hoteles           |
| `/signup`                   | Signup            |                         | Registro de nuevo usuario             |
| `/user-profile`             | UserProfile       |                         | Perfil del usuario                    |
| `/private-page-example`     | PrivatePageExample|                         | Solo usuarios con credenciales        |

## Otros Componentes

- Navbar
- Private

## Servicios

- auth.login(usuario)
- auth.signup(usuario)
- autenticación.verificar()
- Base de datos de alojamientos

## Links

### Collaborators

- [Developer 1 Miguel Ponte](https://github.com/Miguelitoo2421)
- [Developer 2 Cristina Aguilera](https://github.com/CristinaAguileraBriones)

### Project

- [Repository Link Client](https://github.com/CristinaAguileraBriones/traveli-app-cliente.git)
- [Repository Link Server](https://github.com/CristinaAguileraBriones/traveli-app.git)
- [Deploy Link](https://traveli-app.netlify.app/)

### Slides

- [Slides Link](https://traveli-app.netlify.app/)